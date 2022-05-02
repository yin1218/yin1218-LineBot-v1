'use strict';

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
  if(msg == "拿拿資料就走"){
    //傳送想要拿什麼資訊的選單
    const echo = {
      "type": "text",
      "text": "你想要什麼呢"
    }
    return client.replyMessage(event.replyToken, echo);
  } 
  else if(msg == "更深入的了解我是誰"){
    //傳送訊息
    const returnSticker = {
      "type": "sticker",
      "packageId": "446",
      "stickerId": "1988"
    }
    return client.replyMessage(event.replyToken, returnSticker);
  }
  else{
    const echo = {
      "type": "text",
      "text": "給我點具體的指示吧QAQ"
    }
    return client.replyMessage(event.replyToken, echo);
  }
}









// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
