// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { response } from "express";
import app from "./app.js";
import { initLogCorrelation, logger } from "./utils/logging.js";
import { fetchProjectId } from "./utils/metadata.js";

/**
 * Initialize app and start Express server
 */
const main = async () => {
  try {
    let project = process.env.GOOGLE_CLOUD_PROJECT;
    if (!project) {
      project = await fetchProjectId();
    }
    // Initialize request-based logger with project Id
    initLogCorrelation(project);

    // this isn't useful, but it's sorta helpful for reference
    // const items = {
    //   "Aluminum Foil": "https://shriandsam.com/cdn/shop/articles/Untitled_design_201.png?v=1633688676&width=2240",
    // };

    // const items = {
    //   "Batteries": "https://m.media-amazon.com/images/I/71a61CuYSWL._UF1000,1000_QL80_.jpg",
    //   "Phone": "https://sm.pcmag.com/pcmag_me/review/a/apple-ipho/apple-iphone-16-plus_jg5s.jpg",
    //   "Laptop": "https://i.ebayimg.com/images/g/tngAAOSwAhJmMRuJ/s-l1200.jpg",
    //   "Milk jug": "https://upload.wikimedia.org/wikipedia/commons/9/9c/Bottle_of_milk.jpg",
    //   "Paper cup": "https://www.ecowatch.com/wp-content/uploads/2021/10/1350922827-origin.jpg",
    //   "Plastic water bottle": "https://images.squarespace-cdn.com/content/v1/5fa1cd86693bf52ea57c269a/1619100232232-VYA8RDAU1CR9R6LTO1L5/IMG_1475.jpg",
    //   "Beer bottle": "https://www.dublinbottlingworks.com/wp-content/uploads/2023/12/img_8648-edit-scaled.jpg",
    //   "Ceramic coffee mug": "https://i.etsystatic.com/9923905/r/il/d55887/5438458013/il_570xN.5438458013_ir76.jpg",
    //   "Light bulb": "https://freebie.photography/concept/unlit_bulb.jpg",
    //   "Notebook paper": "https://prettyoldbooks.com/cdn/shop/files/writeright-composition-theme-ruled-book-vintage-blank-notebook-paper-no-w-1539-6159280_1500x.jpg?v=1756495092",
    //   "Styrofoam cup": "https://images.imprint.com/image/fetch/f_auto/q_100/https://imprint.com/domains/4/contents/images/landingPages/styrofoam-cups/blank_20_oz_foam_cups.jpg",
    //   "Pizza box": "https://pakoro.com/wp-content/uploads/2025/02/A-person-unpacking-a-large-pizza-box-1024x576.webp",
    //   "Styrofoam egg carton": "https://i.ebayimg.com/images/g/AyIAAOSwFExkcS3s/s-l400.jpg",
    //   "Cardboard egg carton": "https://www.treehugger.com/thmb/erKYmUKxzf19MZEeeWZL0MUfJ7c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GETTYeggcarton-99b088195a254ab7a05be53a3a4f76d6.jpg",
    //   "Clothes": "https://img.freepik.com/premium-photo/pile-multicolored-tank-tops-t-shirt-fabric-cotton-tshirts-pile-various-colored-shirts-white-table-background_100800-22532.jpg",
    //   "Soup can": "https://i.ebayimg.com/images/g/nD0AAOSwXExncIlK/s-l1200.png",
    //   "Soda can": "https://thezyqa.com/wp-content/uploads/2024/02/soda-can.webp",
    //   "Furniture": "https://www.countrycasualteak.com/media/catalog/product/f/i/fiori_9525_4861.jpg?store=default&image-type=image",
    //   "Shirt hangers": "https://i.etsystatic.com/17450500/r/il/5ad48e/3300285438/il_570xN.3300285438_31uh.jpg",
    //   "Juice pouch": "https://i.ebayimg.com/images/g/cLMAAeSwR7BoTMSr/s-l1200.jpg",
    //   "Plastic shopping bag": "https://i.ebayimg.com/images/g/NKEAAOSwle9j5nSL/s-l1200.jpg",
    //   "Plastic plate": "https://factorydirectparty.com/cdn/shop/files/7-in-neon-assorted-color-plastic-plates-60-ct-u8w.jpg?v=1713729362",
    // };

    // Start server listening on PORT env var
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
  } catch (err) {
    logger.error(err.message);
  }
};

/**
 * Listen for termination signal
 */
process.on("SIGTERM", () => {
  // Clean up resources on shutdown
  logger.info("Caught SIGTERM.");
  logger.flush();
});

main();
