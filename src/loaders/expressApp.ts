import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "../routes";

export const expressApp = ({ app }: { app: express.Application }) => {
  app.get("/health", async (req, res) => {
    res.sendStatus(200);
  });

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.use(routes());
};
