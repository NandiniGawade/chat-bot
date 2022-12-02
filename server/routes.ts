import { Express} from "express";
import { createAccount } from "../controllers/user/user.controller";
import validateRequest from "../middleware/validateRequest";
import { createUserSchema } from "../schema/user.schema";

export default function (app: Express) { 
  
  // Register user
  app.post("/api/challenge-register", validateRequest(createUserSchema), createAccount);

  
  /**
   * For the Unhandled Routes 
   */
  app.all('*', (req, res, next) => {
    res.status(404).json({
      status: 'fail',
      message: `Can't find ${req.originalUrl} on this server!`
    });
  });
  
}