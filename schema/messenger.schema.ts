import { object, string } from "yup";

//#region inititalizeUserChat
/**
 * It will validate the user id for /api/challenge-conversation API.
 * user_id is required parameter.
 */
export const inititalizeUserChat = object({
  body: object({
    user_id: string().required("User id is required")
  }),
});
//#endregion

//#region validateConversationID
/**
 * It will validate the coversation id for /api/challenge-behaviour API.
 * conversation_id is required parameter.
 */
export const validateConversationID = object({
    query: object({
        conversation_id: string().required("conversation id is required")
    }),
});
//#endregion

//#region validateReplyRequest
/**
 * It will validate the coversation id for /api/challenge-behaviour Post API.
 * conversation_id is required parameter.
 */
export const validateReplyRequest = object({
  body: object({
      content: string().required("content is required"),
      conversation_id: string().required("conversation id is required")
  }),
});
//#endregion