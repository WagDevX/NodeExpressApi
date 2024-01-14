import express from "express";
import config from "./core/config/auth-config";
import { verifyToken } from "./core/middleware/verify-token";
var cors = require("cors");
var jwt = require("jsonwebtoken");

const server = express();

server.use(cors());
server.options("*", cors());
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
