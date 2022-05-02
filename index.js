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
  // first
  if(msg == "拿拿資料就走"){
    echo = {
      "type": "flex",
      "altText": "this is a flex message",
      "contents": {
        "type": "bubble",
        "hero": {
          "type": "image",
          "size": "full",
          "aspectRatio": "20:13",
          "aspectMode": "cover",
          "url": "https://live.staticflickr.com/65535/51940460694_a624490579_b.jpg"
        },
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "看點東西再走吧！",
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
                "type": "uri",
                "label": "Website",
                "uri": "https://wpbag.vercel.app/"
              }
            },
            {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "uri",
                "label": "Github",
                "uri": "https://github.com/yin1218"
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
        "type": "text",
        "text": "傳送兩則訊息"
      }
    ]
    return client.replyMessage(event.replyToken, multireply);
  }
  else{
    echo = {
      "type": "text",
      "text": "我不知道你在說什麼QQ 但你可以輸入 \"start\" 來了解我是誰!"
    }
  }
  return client.replyMessage(event.replyToken, echo);
}










// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
