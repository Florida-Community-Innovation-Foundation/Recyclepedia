import cookieParser from "cookie-parser";
import express from "express";
import createError from "http-errors";

import indexRouter from "./routes/index.js";

import { middleware } from "./server.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "pug");

app.use("/", indexRouter);

app.get('/itemData', async (req, res, next) => {
  console.log("Time: ", Date.now());

  let accessToken = await middleware(req);

  if (accessToken) {
    console.log("Access Token acquired: ", accesstoken.access_token);
    return next();
  }
  else {
    return res.status(500).json({ message: 'No access token' });
  }
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Error" });
});

export default app;
