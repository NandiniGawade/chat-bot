import axios from "axios";
import logger from "../logger";

//#region Register User.
/**
 * This will register user to chat-bot.
 * @param req  name and email are required paramater to register user.
 * @param res  It will return status and registered user_id
 */
export const createUser = async (req: any) => {
    try {
        const config = {
            headers: {
              "Content-Type": "application/json"
            },
        };
        return await axios
        .post(process.env.BASE_URL + "/challenge-register", {
                    name: req.name,
	                email: req.email
            }, config)
        .then((response: any) => {
            return {
                status: response.status,
                data: response.data
            };
        })
        .catch((error: any) => {
            console.log(error)
            return error;
        });
    } catch (error: any) {
        logger.error(error);
        console.log(error)
        throw new Error(error);
    }
}
//#endregion

