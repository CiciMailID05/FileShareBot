var lib = require("tele-bot-api")
var option = {
    "bot_path": "/",
    "port": "8080"
}

var tg = new lib.telegram(process.env.TOKEN_BOT, option)
tg.on(function (request, respons) {
    if (request.body) {
        var update = request.body
        if (update) {
            try {
                require("./bot/bot").bot(update)
            } catch (e) {
                if (update.message) {
                    var data = {
                        "chat_id": update.message.chat.id,
                        "text": e.message
                    }
                    return tg.request("sendMessage", data)
                }
            }
        }
    }
})

console.log("run bot")
tg.start()

module.exports = {
    tg
}