import { object, string } from "yup";

//#region createUserSchema
/**
 * It will validate the user id for /api/challenge-register API.
 * name and email are required parameter.
 */
export const createUserSchema = object({
  body: object({
    name: string().required("Name is required"),
    email: string()
      .email("Must be a valid email")
      .required("Email is required"),
  }),
});
//#endregion