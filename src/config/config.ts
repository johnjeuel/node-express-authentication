import dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️⚠️  Couldn't find .env file.  ⚠️⚠️");
}

export const config =  {
  nodeEnv: process.env.NODE_ENV || "dev",
  port: parseInt(process.env.PORT, 10),
  databaseURL: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  twitter: {
    twitterOauth: {
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      token: process.env.TWITTER_ACCESS_TOKEN,
      token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    },
    twitterEnv: process.env.TWITTER_DEV_ENV,
    tweetUrl: 'https://api.twitter.com/1.1/statuses/update.json',
    webhookUrl: process.env.TWITTER_WEBHOOK_URL,
  }
};
