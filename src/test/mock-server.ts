import express from "express";

const mockserver = express();

mockserver.use(express.json());

export default mockserver;
