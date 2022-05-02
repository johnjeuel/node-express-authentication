import express from "express";
import { config } from "./config/config";

const PORT = config.port || 6100;

async function startServer() {
  const app = express();

  await require("./loaders/mongodb").mongodb();
  await require("./loaders/expressApp").expressApp({ app });

  app
    .listen(config.port, () => {
      console.log(`Running on ${PORT} ⚡`);
    })
    .on("error", (err) => {
      console.log(`Server start failed with error`, err);
      process.exit(1);
    });
}

startServer();
