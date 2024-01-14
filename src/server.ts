import express from "express";
import { verifyToken } from "./core/middleware/verify-token";

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
server.get("/", verifyToken, (req, res) => {
  return res.json({
    message: "Welcome to Node Express Api made by Wagner de Araujo.",
  });
});

export default server;
