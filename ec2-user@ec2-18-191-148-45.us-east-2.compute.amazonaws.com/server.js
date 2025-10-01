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

let accesstoken;

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

    // const urls = [
    //   /*Index cards*/"https://media.officedepot.com/images/f_auto,q_auto,e_sharpen,h_450/products/186348/186348_p_062315/186348",
    //   /*Flou lights*/"https://m.media-amazon.com/images/I/41BsdrShi3L.jpg",
    //   /*Trash*/"https://m.media-amazon.com/images/I/71dtgkMrjqL._UF350,350_QL80_.jpg",
    //   /*Misc plasti*/"https://cdn.recyclopedia.sg/strapi-assets/small_Clear_plastic_bottle_2dc92dc39c.png",
    //   /*Glass*/"https://www.thecarycompany.com/media/catalog/product/1/2/12_oz_355_ml_amber_glass_long_neck_beer_bottle_pry-off_crown_30wapl_1.jpg",
    //   /*Aluminium*/"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPcrbzHCihjROqKdi6m8Lh4Zz-dMp0JRIvXA&s",
    //   /*Paper board*/"https://pakfactory-blog-media.s3.ca-central-1.amazonaws.com/blog1/wp-content/uploads/2023/09/uncategorized/2023_09_kraft-cardboard.jpg",
    //   /*Medicalwast*/"https://m.media-amazon.com/images/I/61S58vdWWTL._UF894,1000_QL80_.jpg",
    //   /*Wood*/"https://d22ln6br8tx7dh.cloudfront.net/public/p_1000100158.jpg",
    //   /*Fiberboard*/"https://cdn.shopify.com/s/files/1/0786/6341/8157/files/s-l1600_2_df5ccd8f-3860-4f13-8b2f-c65404bbf085_1024x1024.jpg?v=1724321445",
    //   /*Glass nonre*/"https://i.ebayimg.com/00/s/MTYwMFgxNjAw/z/MbEAAOSwaI9kdz4~/$_1.JPG?set_id=880000500F",
    //   /*X-max tree*/"https://www.kingofchristmas.com/cdn/shop/files/TribecaSpruce_9435ba0f-6c63-4ca1-97ab-5e2cdca47270.jpg?v=1722014341",
    //   /*leather*/"https://m.media-amazon.com/images/I/61H0wkNio1L._UF1000,1000_QL80_.jpg",
    //   /*cork*/"https://media.allure.com/photos/603ab8eeab82b91fd3b5f2cb/16:9/w_3104,h_1746,c_limit/cork-lede.jpg",
    //   /*styrofoam*/"https://www.fortworthtexas.gov/files/assets/public/v/1/parks-and-recreation/images/test/styrofoam.jpg?w=1080",
    //   /*misc metal*/"https://www.cohenusa.com/wp-content/uploads/2021/01/Busheling-1-1024x768-1.jpg",
    //   /*ceramics*/"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdMNWEvoY6eDurCQ5cEdOh7NbDpNoxtr11vg&s",
    //   /*cardboard*/"https://www.uhaul.com/MovingSupplies/Image/GetMedia/?id=2793&media=35620",
    //   /*ewaste*/"https://m.media-amazon.com/images/I/71l+6pcdRoL._UF1000,1000_QL80_.jpg",
    // ];

    accesstoken = await fetch('https://www.nyckel.com/connect/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    //body: 'grant_type=client_credentials&client_id=nrvimk7lzfxquhfz82gar5zrmthbqm39&client_secret=p9qr9sgy3vrn76rdfh2c3o7ir3vt3wucco1kqopfli6vdcjf23v9kq5018z6wnu6'
    body: `grant_type=client_credentials&client_id=${process.env.N_CLIENT_ID}&client_secret=${process.env.N_CLIENT_SECRET}`
});
// .then(response => response.json())
// .then(data => console.log(data));

    // Start server listening on PORT env var
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => logger.info(`Listening on port ${PORT}`));
  } catch (err) {
    logger.error(err.message);
  }
};

const middleware = (req, res, next) => {
  console.log("Time: ", Date.now());

  if (accesstoken) {
    req.accesstoken = accesstoken.access_token;
  }
  else {
    return res.status(500).json({ message: 'No access token' });
  }

  next();
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
