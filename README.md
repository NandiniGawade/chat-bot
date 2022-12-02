# Chatbot Challenge 🤖


I have implemented a repository design pattern for this application. I have added middleware to validate the request.
A logger is used to store the error logs. Added unit test using jest.

I am using my own utility to perform the question processing and answer. This can be done using natural processing language.
But I thought is to have its own language processing utilities for a chatbot. The reason code is not dependent on other libraries.
When you are using your own processing language, there is more chance to enhance it.
You can add more validation to it.
This utility correctly processes questions related to those asked in the chatbot.


Follow below steps to run the application:

   - npm i
   - npm run dev //To start the application.
   - npm run test // To run the test cases.


## API

Please run this application. Using postman you can run the chat-bot API.

The chatbot exposes an HTTPS endpoint at localhost:8080/api/challenge-register. 
## `POST localhost:8080/api/challenge-register` - Chat bot


Request:

POST localhost:8080/api/challenge-register.
Pass user details in body from postman like this:

{
    "name": "Nandini Gawade",
    "email": "nandinigawade@gmail.com"
}

Response: 

 {
      message: 'Thank you for taking the Rival Chatbot Challenge'
      userName: name of the user,
      chatHistory: [{}] 
 }

message: last chat-bot message.
userName: entered user name. This can be used by client to show username on chat.
chatHistory: It will contain question, answer and the time. Time can be used by client to show when this question is answered.

Thanks for the chat-bot application. I enjoyed it. 

Let me know if you face any issues running the application.

Looking forward to hearing from you.

Thanks