import express from "express";
import * as dotenv from "dotenv";
import routes from "./routes";
import logger from "../logger";

dotenv.config();
export const app = express();

const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Assign routes
 */
routes(app);

/**
 * Unhandle rejection
 */
process.on('unhandledRejection', (err: any) => {
    logger.error(err);
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    process.exit(1);
});

/**
 * Unhandle exception
 */
process.on('uncaughtException', function(err) {
    logger.error(err);
    process.exit(1);
})

export const runningServer = app.listen(port, () => { 
    console.log(`App is running on ${port}`);
});
