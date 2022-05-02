import { Router } from "express";
import user from "./user";
import twitter from "./twitter";

/**
 * @Todo Remove index file
 */
export default () => {
  const app = Router();
  user(app);
  twitter(app);

  return app;
};
