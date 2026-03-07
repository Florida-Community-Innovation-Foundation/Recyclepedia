import * as tf from '@tensorflow/tfjs';
import jpeg from 'jpeg-js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let aluminumModel = null;
const ALUMINUM_LABELS = ['aluminum foil', 'aluminum can'];

// Load model from disk using IOHandler (pure JS, no file:// protocol needed)
export async function loadAluminumModel() {
  const modelDir = path.join(__dirname, '..', 'models', 'aluminum');
  const modelJSON = JSON.parse(fs.readFileSync(path.join(modelDir, 'model.json'), 'utf8'));

  const weightPaths = modelJSON.weightsManifest[0].paths;
  const weightBuffers = weightPaths.map(p =>
    fs.readFileSync(path.join(modelDir, p)).buffer
  );
  const weightData = new Uint8Array(
    weightBuffers.reduce((total, buf) => total + buf.byteLength, 0)
  );
  let offset = 0;
  for (const buf of weightBuffers) {
    weightData.set(new Uint8Array(buf), offset);
    offset += buf.byteLength;
  }

  aluminumModel = await tf.loadLayersModel(tf.io.fromMemory({
    modelTopology: modelJSON.modelTopology,
    weightSpecs: modelJSON.weightsManifest[0].weights,
    weightData: weightData.buffer
  }));
  console.log('Aluminum Stage 2 model loaded');
}

// Preprocess base64 JPEG image for Teachable Machine (224x224)
function preprocessImage(base64String) {
  const buffer = Buffer.from(base64String, 'base64');
  const { data, width, height } = jpeg.decode(buffer, { useTArray: true });

  // Convert RGBA to RGB tensor
  const rgbData = new Float32Array(width * height * 3);
  for (let i = 0; i < width * height; i++) {
    rgbData[i * 3]     = data[i * 4];
    rgbData[i * 3 + 1] = data[i * 4 + 1];
    rgbData[i * 3 + 2] = data[i * 4 + 2];
  }

  const tfImage = tf.tensor3d(rgbData, [height, width, 3]);
  const resized = tf.image.resizeBilinear(tfImage, [224, 224]);
  const normalized = resized.div(127.5).sub(1);
  const batched = normalized.expandDims(0);
  tfImage.dispose();
  resized.dispose();
  normalized.dispose();
  return batched;
}

// Stage 2: classify aluminum subtype from base64 string
export async function classifyAluminum(base64String) {
  const tensor = preprocessImage(base64String);
  const predictions = aluminumModel.predict(tensor);
  const scores = await predictions.data();
  tensor.dispose();
  predictions.dispose();

  const maxIndex = scores.indexOf(Math.max(...scores));
  return {
    label: ALUMINUM_LABELS[maxIndex],
    confidence: scores[maxIndex]
  };
}
