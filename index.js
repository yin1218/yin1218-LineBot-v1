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


//return message storage
const documents = require('./message/Document.json');
const knowmore = require('./message/Knowmore.json');
const exception = require('./message/Exception.json');
const firstMsg = require('./message/Init.json')
const collegeLoca = require('./message/CollegeLoco.json')
const motivation = require('./message/Motivation.json')
const advantage = require('./message/Advantage.json')
const contact = require('./message/Contact.json')

// event handler
function handleEvent(event) {
  if (event.type !== 'message') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  else if(event.message.type !== 'text'){
    echo = {
      "type": "text",
      "text": "我...我只看得懂文字QQ"
    }
    return client.replyMessage(event.replyToken, echo);
  }

  let msg = event.message.text
  let echo = {}
  // first
  if(msg == "開始了解"){
    echo = firstMsg
  }
  else if(msg == "拿拿資料就走"){
    echo = documents
  }

  else if(msg == "更深入的了解我是誰"){
    //傳送訊息
    let multireply = [
      {
        "type": "sticker",
        "packageId": "446",
        "stickerId": "1988"  
      },
      knowmore
    ]
    return client.replyMessage(event.replyToken, multireply);
  }

  else if(msg == "大學位置"){
    let multireply = []
    multireply.push(collegeLoca)
    multireply = multireply.concat(knowmore)
    return client.replyMessage(event.replyToken, multireply)
  }

  else if(msg == "申請動機"){
    let multireply = motivation
    multireply = multireply.concat(knowmore)
    return client.replyMessage(event.replyToken, multireply)
  }

  else if(msg == "優勢簡述"){
    let multireply = advantage
    multireply = multireply.concat(knowmore)
    return client.replyMessage(event.replyToken, multireply)
  }

  else if(msg == "聯繫方式"){
    let multireply = contact
    multireply = multireply.concat(knowmore)
    return client.replyMessage(event.replyToken, multireply)

  }

  else{
    echo = exception
  }
  return client.replyMessage(event.replyToken, echo);
}










// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
