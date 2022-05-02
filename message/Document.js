export const getInfo = () => {
    return {
        "type": "flex", 
        "altText": "幫你的flex message取一個名字",
        "content": {
            "type": "bubble",
            "hero": {
              "type": "image",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover",
              "action": {
                "type": "uri",
                "uri": "http://linecorp.com/"
              },
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