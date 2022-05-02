import mongoose, { ConnectOptions } from "mongoose";
import { config } from "../config/config";

/**
 * @Todo Add event listeners for connected, error. Add reconnect on error.
 */
export const mongodb = async () => {
  await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  console.log("Connected to MongoDB 🍃");
};
