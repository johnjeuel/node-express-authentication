import { Router, Request, Response } from "express";
import { get_challenge_response } from "../api/twitter/helpers/security";
import { config } from "../config/config";

const route = Router();

export default (app: Router) => {
  app.use("/twitter", route);

  route.get("/health", (req: Request, res: Response) => {
    return res.sendStatus(200);
  });

  /**
   * @Todo Fix route, add error handling / loggers
   */

  route.get("/integration", async (req: Request, res: Response) => {
    var crc_token = req.query.crc_token;
    console.log("YESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS ", {
      crc_token,
    });
    if (crc_token) {
      var hash = get_challenge_response(
        crc_token,
        config.twitter.twitterOauth.consumer_secret,
      );
      res.status(200);
      return res.send({
        response_token: "sha256=" + hash,
      });
    } else {
      res.status(400);
      return res.send("Error: crc_token missing from request.");
    }
  });

  route.post("/integration", async (req: Request, res: Response) => {
    console.log("twitter integration success", req.body);
    return res.sendStatus(200);
  });
};
