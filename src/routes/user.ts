import { Router, Request, Response } from "express";
import { createUser, loginUser } from "../controllers/user";

const route = Router();
export default (app: Router) => {
  app.use("/users", route);

  route.get("/health", (req: Request, res: Response) => {
    return res.sendStatus(200);
  });

  /**
   * @Todo Fix route, add error handling / loggers
   */
  route.post("/signup", createUser);

  route.post("/login", loginUser);
};
