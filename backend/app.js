import cookieParser from "cookie-parser";
import express from "express";
import createError from "http-errors";
import cors from "cors";
import compression from "compression";

import indexRouter from "./routes/index.js";
import { logger, pinoHttp } from "./utils/logging.js";

var app = express();

app.use(pinoHttp);
// gzip JSON responses — /dropOffData and /itemsData are hundreds of KB and
// were taking 20s+ to download on mobile uncompressed
app.use(compression());
app.use(cors());
// POST /itemData receives base64 camera photos in the JSON body, which far
// exceed express.json's default 100kb limit
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('trust proxy', 1);  // [note]: maybe delete if running backend locally?

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler — JSON only (this is an API), never leak stack traces outside dev
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  if (status >= 500) {
    logger.error(err);
  }
  const body = { error: status >= 500 ? "Internal server error" : err.message };
  if (process.env.NODE_ENV !== "production") {
    body.detail = err.message;
    body.stack = err.stack;
  }
  res.status(status).json(body);
});

export default app;
