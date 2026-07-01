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

import app from "./app.js";
import { initLogCorrelation, logger } from "./utils/logging.js";
import { fetchProjectId } from "./utils/metadata.js";
import { loadAluminumModel } from "./utils/aluminumClassifier.js";

// store reference to server for shutdowns
let server;

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

    // Load the aluminum foil/can classifier model
    await loadAluminumModel();

    // Start server listening on PORT env var
    const PORT = process.env.PORT || 8080;

    server = app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }
};

const shutdown = async (signal) => {
  logger.info(`Caught Signal: ${signal}. Shutting down...`);

  if (server) {
    // if HTTP server is running, close it
    server.close(async () => {
      logger.info("HTTP server closed.");
      await logger.flush();
      process.exit(0);
    });
  } else {
    await logger.flush();
    process.exit(0);
  }

  setTimeout(() => {
    logger.error("Force shutdown after timeout");
    process.exit(1);
  }, 10_000);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown); // CTRL + C

// [note]: run npm stop (or sudo npm stop) if server was running when terminal disconnected, otherwise ctrl + c

main();
