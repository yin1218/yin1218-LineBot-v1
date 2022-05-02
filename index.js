'use strict';
// import someName from "./some/path/to/your/file.json";
// import {getInfo} from './message/Document.js'

const line = require('@line/bot-sdk');
const express = require('express');

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

const client = new line.Client(config);

const app = express();

app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  let msg = event.message.text
  let echo = {
    "type": "text",
    "text": msg
  }
  //first
  // if(msg == "拿拿資料就走"){
  //   //傳送想要拿什麼資訊的選單
  //   echo = getInfo()
  // } 
  // else if(msg == "更深入的了解我是誰"){
  //   //傳送訊息
  //   echo = {
  //     "type": "sticker",
  //     "packageId": "446",
  //     "stickerId": "1988"
  //   }
  // }
  // else{
  //   echo = {
  //     "type": "text",
  //     "text": "我不知道你在說什麼QQ 但你可以輸入 \"start\" 來了解我是誰!"
  //   }
  //   return client.replyMessage(event.replyToken, echo);
  // }
  return client.replyMessage(event.replyToken, echo);
}









// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
