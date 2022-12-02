import axios from "axios";
import logger from "../logger";

//#region inititalize conversation with chat-bot.
/**
 * This inititalize conversation with chat-bot.
 * @param req  user_id.
 * @param res  coversation_id will return in response
 */
export const initConversation = async (req: any) => {
    const config = {
        headers: {
          "Content-Type": "application/json"
        },
    };
    try {
        return await axios
        .post(process.env.BASE_URL + "/challenge-conversation", {
                user_id: req.user_id,
            },config)
        .then((response: any) => {
            return {
                status: response.status,
                data: response.data
            };
        })
        .catch((error: any) => {
            return error;
        });
    } catch (error: any) {
        logger.error(error);  
        throw new Error(error);
    }
}
//#endregion

//#region API to start conversation with chat-bot
/**
 * Start the conversation with chat-bot. Conversation_id need to pass to start the conversation.
 * @param req conversation_id.
 * @param res It will return status and data.
 */
export const startConversation = async (req: any) => {
    const config = {
        headers: {
          "Content-Type": "application/json"
        },
    };
    try {
        return await axios
        .get(process.env.BASE_URL + "/challenge-behaviour/" + req.conversation_id, config)
        .then((response: any) => {
            return {
                status: response.status,
                data: response.data
            };
        })
        .catch((error: any) => {
            return error;
        });
    } catch (error: any) {
        logger.error(error); 
        throw new Error(error);
    }
}
//#endregion

//#region API to send reply to the chat-bot.
/**
 * Send reply to the chatbot.
 * @param req content and conversation_id
 * @param res status and data.
 */
export const replayChat = async (req: any) => {
    const config = {
        headers: {
          "Content-Type": "application/json"
        },
    };
    try {
        return await axios
        .post(process.env.BASE_URL + "/challenge-behaviour/"+req.conversation_id, {
                content: req.content
            }, config)
        .then((response: any) => {
            return {
                status: response.status,
                data: response.data
            };
        })
        .catch((error: any) => {
            return error;
        });
    } catch (error: any) {
        logger.error(error); 
        throw new Error(error);
    }
}
//#endregion