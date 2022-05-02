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
const exception = require('./message/Exception.json')

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
  if(msg == "拿拿資料就走"){
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
      {
        "type": "flex",
        "altText": "know more about me",
        "contents": {
            "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                "type": "text",
                "text": "你想要問那些問題呢！",
                "weight": "bold",
                "size": "xl"
                }
            ]
            },
            "footer": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [
                {
                "type": "button",
                "style": "link",
                "height": "sm",
                "action": {
                    "type": "message",
                    "label": "你的大學在哪裡",
                    "text": "大學位置"
                }
                },
                {
                "type": "button",
                "style": "link",
                "height": "sm",
                "action": {
                    "type": "message",
                    "label": "為什麼想要申請這個計畫呢",
                    "uri": "申請動機"
                }
                },
                {
                "type": "button",
                "action": {
                    "type": "uri",
                    "label": "Album",
                    "uri": "https://www.flickr.com/photos/195209755@N02/albums"
                },
                "height": "sm",
                "style": "link"
                }
            ],
            "flex": 0
            }
        }
        }
    
    ]
    return client.replyMessage(event.replyToken, multireply);
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
