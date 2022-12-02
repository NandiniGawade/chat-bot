import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";
import logger from "../logger";

//#region Validate middleware
/**
 * This will validate each request with required parameter.
 * @param schema 
 * @returns 
 */
const validate = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
  
      return next();
    } catch (e: any) {
      logger.error(e);
      return res.status(400).send(e.errors);
    }
};
//#endregion 
  
export default validate;