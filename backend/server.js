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


/**
 * Initialize app and start Express server
 */
const main = async () => {
  try {
    let project = process.env.GOOGLE_CLOUD_PROJECT;
    if (!project) {
      project = fetchProjectId();
    }
    initLogCorrelation(project);

    // Start server listening on PORT env var
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
  } catch (err) {
    logger.error(err.message);
  }
};

export const middleware = async (req, _) => {
  console.log("Time: ", Date.now());
  let res = await fetch('https://www.nyckel.com/connect/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${process.env.NYCKEL_CLIENT_ID}&client_secret=${process.env.NYCKEL_CLIENT_SECRET}`
  });
  return await res.json();
}

/**
 * Listen for termination signal
 */
process.on("SIGTERM", () => {
  // Clean up resources on shutdown
  logger.info("Caught SIGTERM.");
  logger.flush();
});

main();
