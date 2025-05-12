import cookieParser from "cookie-parser";
import express from "express";
import createError from "http-errors";
import logger from "morgan";

import indexRouter from "./routes/index.js";

var server = express();

server.use(logger("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static("public"));
server.set("view engine", "pug");

server.use("/", indexRouter);

// catch 404 and forward to error handler
server.use(function (req, res, next) {
  next(createError(404));
});

// error handler
server.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Error" });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

export default server;
