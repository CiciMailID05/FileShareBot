var tg = require("../index").tg
var config_env = process.env

var admins = [1233349557]
admins.push(Number(config_env.id_admin))
var config = {
  "username_bot": config_env.username_bot,
  "name_bot": `[${config_env.name_bot}](tg://user?id=${Number(config_env.TOKEN_BOT.replace(/(:.*)/ig, ""))})`,
  "developer_bot": `[${config_env.name_admin}](tg://user?id=${Number(config_env.id_admin)})`,
  "username_channel": config_env.username_channel,
  "title_channel": config_env.title_channel,
  "subscribe_username_channel": config_env.subscribe_username_channel,
  "subscribe_id_channel": Number(config_env.subscribe_id_channel),
  "photo_id_bot": config_env.photo_id_bot,
  "owner": [1233349557]
}
config.list_admin = admins


function bot(update) {
  if (update.callback_query) {
    var cb = update.callback_query;
    var cbm = cb.message;
    var cbuserid = cb.from.id;
    var cbnama = cb.from.first_name;

    if (/^(CLOSE)$/i.exec(cb.data)) {
      var pesan = {
        'chat_id': cbm.chat.id,
        "message_id": cbm.message_id
      };
      return tg.request('deleteMessage', pesan);
    }


    if (/^(About)$/i.exec(cb.data)) {
      var caption = `My Details:\n🤖 𝐌𝐲 𝐍𝐚𝐦𝐞: ${config.name_bot}\n    \n💻 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫: ${config.developer_bot}\n📢 𝐂𝐡𝐚𝐧𝐧𝐞𝐥: [${config.title_channel}](http://t.me/${config.username_channel})`;
      var pesan = {
        'chat_id': cbm.chat.id,
        "message_id": cbm.message_id,
        'caption': caption,
        'parse_mode': "Markdown",
        "reply_markup": {
          "inline_keyboard": [
            [
              { "text": "️Join Channel", "url": `https://t.me/${config.username_channel}` }
            ],
            [
              { "text": "Help 💡", "callback_data": "Help" },
              { "text": "Home 🏠", "callback_data": "Home" }
            ],
            [
              { "text": "Close", "callback_data": "Close" }
            ]
          ]
        }
      };
      return tg.request('editMessageCaption', pesan);
    }

    if (/^(help)$/i.exec(cb.data)) {
      var caption = `You need Help?? 🧐\n★ Just send me the files i will store file and give you share able link\nYou can use me in channel too 😉\n★ Make me admin in your channel with edit permission. Thats enough now continue uploading files in channel i will edit all posts and add share able link url buttons`;
      var pesan = {
        'chat_id': cbm.chat.id,
        "message_id": cbm.message_id,
        'caption': caption,
        'parse_mode': "Markdown",
        "reply_markup": {
          "inline_keyboard": [
            [
              { "text": "️Join Channel", "url": `https://t.me/${config.username_channel}` }
            ],
            [
              { "text": "Home 🏠", "callback_data": "Home" },
              { "text": "About 📙", "callback_data": "About" }
            ],
            [
              { "text": "❌  Close ❌", "callback_data": "Close" }
            ]
          ]
        }
      };
      return tg.request('editMessageCaption', pesan);
    }

    if (/^(Home)$/i.exec(cb.data)) {
      var caption = `Hey! [${cb.from.first_name}](tg://user?id=${cb.from.id})\n💡  I am ${config.name_bot} Bot\nYou can store your Telegram Media for permanent Link!\n👲 Maintained By: ${config.developer_bot}`;
      var pesan = {
        'chat_id': cbm.chat.id,
        "message_id": cbm.message_id,
        'caption': caption,
        'parse_mode': "Markdown",
        "reply_markup": {
          "inline_keyboard": [
            [
              { "text": "️Join Channel", "url": `https://t.me/${config.username_channel}` }
            ],
            [
              { "text": "Help 💡", "callback_data": "Help" },
              { "text": "About 📙", "callback_data": "About" }
            ]
          ]
        }
      };
      return tg.request('editMessageCaption', pesan);
    }

  }

  if (update.message) {
    var msg = update.message;

    if (new RegExp("^\/ping$", "i").exec(msg.text)) {
      var time = (Date.now() / 1000) - msg.date
      var data = {
        'chat_id': msg.chat.id,
        "text": `Pong ${time.toFixed(3)}`,
        'parse_mode': "Markdown",
        "disable_notification": false,
        'reply_to_message_id': msg.message_id,
        "allow_sending_without_reply": true
      };
      return tg.request('sendMessage', data);
    }

    if (msg && !msg.text) {
      if (array_list_admin_bot(config.list_admin, msg.from.id)) {
        try {
          var text = `${check_file(msg)}**${config.title_channel}:**\n\n__Untuk menonton silahkan Klik download lalu klik **start** untuk menonton video atau file__\n\n__=============__\n🏩 __Channel:__ @${config.username_channel}`;
          var share = `${text}\n\nFile Link 👉 https://t.me/${config.username_bot}?start=${msg.from.id}_${msg.message_id}`;
          var data = {
            'chat_id': msg.chat.id,
            "text": text,
            'parse_mode': "Markdown",
            "disable_notification": false,
            'reply_to_message_id': msg.message_id,
            "allow_sending_without_reply": true,
            "reply_markup": {
              "inline_keyboard": [
                [
                  { "text": "️Download File", "url": `https://t.me/${config.username_bot}?start=${msg.from.id}_${msg.message_id}` },
                  { "text": "️Share Link", "url": `tg://share?url=${share}` }
                ]
              ]
            }
          };
          tg.request('sendMessage', data);
        } catch (e) {
          var data = {
            'chat_id': msg.chat.id,
            "text": `ERROR\n${e.message}`,
            'parse_mode': "Markdown",
            "disable_notification": false,
            'reply_to_message_id': msg.message_id,
            "allow_sending_without_reply": true
          };
          return tg.request('sendMessage', data);
        }
      }
      
    }

    if (new RegExp("^\/start .*_.*", "i").exec(msg.text)) {
      var checks = checksubscribe(config.subscribe_id_channel, msg, "all")
      if (checks) {
        var caption = `**${config.title_channel}:**\n\nUntuk menonton video silahkan Klik download lalu klik start untuk menonton video atau file\n\n==================\n🏩 Channel: @${config.username_channel}`;
        var data = {
          'chat_id': msg.chat.id,
          "from_chat_id": msg.text.replace(/(\/start )/ig, "").replace(/(_.*)/ig, ""),
          "message_id": msg.text.replace(/(.*_)/ig, ""),
          "caption": caption,
          'parse_mode': "Markdown",
          "disable_notification": false,
          "allow_sending_without_reply": true
        };
        return tg.request('copyMessage', data);
      } else {
        return sendSusbcribe(msg, checks, `[Try Again](https://t.me/${config.username_bot}?start=${msg.text.replace(/(\/start )/ig, "").replace(/(_.*)/ig, "")}_${msg.text.replace(/(.*_)/ig, "")})`)
      }
    }

    if (new RegExp(`^\/start|\/start@${config.username_bot} start$`, "i").exec(msg.text)) {
      var checks = checksubscribe(config.subscribe_id_channel, msg, "all")
      if (checks) {
        var caption = `Hey! [${msg.from.first_name}](tg://user?id=${msg.from.id})\n💡  I am **${config.title_channel}** Bot\nYou can store your Telegram Media for permanent Link!\n👲 Maintained By: ${config.developer_bot}`;
        var data = {
          'chat_id': msg.chat.id,
          "photo": config.photo_id_bot,
          "caption": caption,
          'parse_mode': "Markdown",
          "disable_notification": false,
          'reply_to_message_id': msg.message_id,
          "allow_sending_without_reply": true,
          "reply_markup": {
            "inline_keyboard": [
              [
                { "text": "➕ ️Tambahkan ke group ➕", "url": `https://t.me/${config.username_bot}?startgroup=start` }
              ],
              [
                { "text": "️Join Channel", "url": `https://t.me/${config.username_channel}` },
                { "text": "Help 💡", "callback_data": "help" }
              ]
            ]
          }
        };
        return tg.request('sendPhoto', data);
      } else {
        return sendSusbcribe(msg, checks)
      }
    }



    if (new RegExp("^\/help$", "i").exec(msg.text)) {
      var checks = checksubscribe(config.subscribe_id_channel, msg, "all")
      if (checks) {
        var caption = `Hey! [${msg.from.first_name}](tg://user?id=${msg.from.id})\n💡  I am **${config.title_channel}** Bot\nYou can store your Telegram Media for permanent Link!\n👲 Maintained By: ${config.developer_bot}`;
        var data = {
          'chat_id': msg.chat.id,
          "text": caption,
          'parse_mode': "Markdown",
          "disable_notification": false,
          'reply_to_message_id': msg.message_id,
          "allow_sending_without_reply": true,
          "reply_markup": {
            "inline_keyboard": [
              [
                { "text": "➕ ️Tambahkan ke group ➕", "url": `https://t.me/${config.username_bot}?startgroup=start` }
              ],
              [
                { "text": "️Join Channel", "url": `https://t.me/${config.username_channel}` },
                { "text": "Help 💡", "callback_data": "help" }
              ],
              [
                { "text": "INFORMATION BOT", "callback_data": "informationbot" }
              ]
            ]
          }
        };
        return tg.request('sendMessage', data);
      } else {
        return sendSusbcribe(msg, checks)
      }
    }

  }
}


function check_file(msg) {

  if (msg.video) {
    var size = msg.video.file_size / (1024 ** 2);
    var duration = msg.video.duration
    return "**🗃️ File Details:**\n\n📂 __File Name:__ `" + msg.video.file_name + "`\n\n💽 __File Format:__ `" + msg.video.mime_type + "`\n\n📊 __File Size:__ `" + size.toFixed(2) + " MB`\n\n🎞 __Duration:__ `" + new Date(duration * 1000).getMinutes() + " min, " + new Date(duration * 1000).getSeconds() + " sec`\n\n";
  } else {
    return "";
  }

}


function sendSusbcribe(msg, type, text) {
  if (new RegExp("^" + type + "$", "i").exec("null")) {
    return tg.request('sendMessage', { 'chat_id': msg.chat.id, "text": "Agar check subscribe bisa berjalan dengan baik tolong masukan saya ke channel @" + config.subscribe_username_channel + " dan jadikan admin", 'parse_mode': "Markdown", "disable_notification": false, "allow_sending_without_reply": true, "reply_markup": { "inline_keyboard": [[{ "text": "Channel", "url": "https://t.me/" + config.subscribe_username_channel }]] } });
  } else if (new RegExp("^" + type + "$", "i").exec("false")) {
    var parameter = {
      'chat_id': msg.chat.id,
      "text": `Opps Anda Belum subcribe channel saya, jika anda ingin memakai bot ini silahkan subscribe channel dibawah\n\n${text}`,
      'parse_mode': "Markdown",
      "disable_notification": false,
      "allow_sending_without_reply": true,
      "reply_markup": {
        "inline_keyboard": [
          [
            { "text": "️Subscribe Channel", "url": "https://t.me/" + config.subscribe_username_channel }
          ]
        ]
      }
    };
    return tg.request('sendMessage', parameter);
  } else {
    return false
  }
}
function checksubscribe(chat_id, msg, type) {
  try {
    var check = await tg.request("getChatMember", { "chat_id": chat_id, "user_id": msg.from.id });
    if (new RegExp("^" + type + "$", "i").exec("member")) {
      if (check.ok && new RegExp("^member$", "i").exec(check.result.status)) {
        return true;
      } else {
        return false
      }
    } else if (new RegExp("^" + type + "$", "i").exec("creator")) {
      if (check.ok && new RegExp("^creator$", "i").exec(check.result.status)) {
        return true;
      } else {
        return false
      }
    } else if (new RegExp("^" + type + "$", "i").exec("administrator")) {
      if (check.ok && new RegExp("^administrator|creator$", "i").exec(check.result.status)) {
        return true;
      } else {
        return false
      }
    } else if (new RegExp("^" + type + "$", "i").exec("all")) {
      if (check.ok && new RegExp("^administrator|creator|member$", "i").exec(check.result.status)) {
        return true;
      } else {
        return false;
      }
    }
  } catch (e) {
    return null;
  }
}

function array_list_admin_bot(data, check_user) {

  if (data.indexOf(check_user) > -1) {
    return true;
  } else {
    return false;
  }

}

module.exports = {
  bot
}
