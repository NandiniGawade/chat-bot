import { Request, Response } from "express";
import logger from "../../logger";
import async from "async";
import { createUser } from "../../services/user.service";
import { initConversation, replayChat, startConversation } from "../../services/messenger.service";
import * as _ from "lodash";
import { THANK_YOU_MESSAGE } from "../../constants/question.constant";
import { evaluateQuestion } from "../../utilities/question-processing";
import { User } from "../../models/user";
import { ChatMessage } from "../../models/chat-message";
import { Reply } from "../../models/reply";

//#region Start communication with chat-bot.
/**
 * Start the communication with Rival chat bot.
 * @param req  name and email are required paramater to register user.
 * @param res  It will return status and registered user_id
 */

export const createAccount = async (req: Request, res: Response) => {
  try {
    async.waterfall([
      function setParam(allset: any) {
        allset(null, req.body);
      },
      registerUser,
      getConversationId,
      startChat
    ], (err, result) => {
      if (err) {
        logger.error(err);
        return res.send({
          status: 500,
          message: 'Something went wrong!!. Please try again.'
        })
      } else {
        return res.send(result)
      }
    });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
};
//#endregion

//#region Register user to chat-bot.
/**
 * This will register user to chat-bot. Start the communication with Rival chat bot.
 * @param userDetails  name and email are required paramater to register user.
 * @param res  It will return status and registered user_id
 */
const registerUser = async (userDetails: User, callback: any) => {
  if(!userDetails) {
    callback({
      status: 204,
      message: 'User details are missing.'
    })
  }
  try {
    const user = await createUser(userDetails);
    logger.info(user)
    const response = {
      user,
      userDetails
    }
    callback(null, response);
  } catch (e: any) {
    logger.error(e);
    callback(e, null);
  }
}
//#endregion

//#region API to inititalize conversation with chat-bot.
/**
 * This inititalize conversation with chat-bot.
 * @param req  user_id.
 * @param res  coversation_id will return in response
 */
const getConversationId = async (user: any, callback: any) => {
  const results: ChatMessage[] = [];
  if(!user.user) {
    callback({
      status: 204,
      message: 'User id are missing.'
    });
  }
  try {
    const response = await initConversation({ user_id: user.user.data.user_id });
    callback(null, response, results, user.userDetails);
  } catch (e: any) {
    logger.error(e);
    callback({
      status: e.status,
      message: 'Something went wrong!!. Please try again.'
    }, null);
  }
}
//#endregion

//#region API to start conversation with chat-bot
/**
 * Start the conversation with chat-bot. Conversation_id need to pass to start the conversation.
 * @param req conversation_id.
 * @param res It will return status and data.
 */
const startChat = async (botResp: any, results: ChatMessage[], userDetails: any ,callback: any) => {
  if(!botResp.data) {
    callback({
      status: 204,
      message: 'conversation id are missing.'
    })
  }
  try {
    const response = await startConversation({ conversation_id: botResp.data.conversation_id });
    if (response.status === 200 && response.data.messages.length > 0) {
      const question = response.data.messages[response.data.messages.length - 1].text;
      if (question === THANK_YOU_MESSAGE) {
        callback(null, {
          message: THANK_YOU_MESSAGE,
          name : userDetails.name,
          chatHistory: results
        });
      } else {
        const ans = evaluateQuestion(question);
        if (ans) {
          const result = await reply({
            conversation_id: botResp.data.conversation_id,
            content: ans
          });
          if (result.data.correct) {
            results.push({
              question,
              answer: ans,
              time: new Date()
            })
            await startChat(botResp, results, userDetails, callback);
          } else {
            await startChat(botResp, results, userDetails, callback);
          }
        } else {
          callback(null, results);
        }
      }
    }
  } catch (e: any) {
    logger.error(e);
    callback({
      status: e.status,
      message: 'Something went wrong!!. Please try again.'
    }, null);
  }
}
//#endregion


//#region API to send reply to the chat-bot.
/**
 * Send reply to the chatbot.
 * @param req content and conversation_id
 */
const reply = async (req: Reply) => {
  try {
    const response = await replayChat(req);
    return response;
  } catch (e: any) {
    logger.error(e);
    return e;
  }
}
//#endregion