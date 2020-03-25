const Command = require("../../base/Command.js");
const ms = require("ms");
class giveaway extends Command {
    constructor(client) {
        super(client, {
            name: "giveaway",
            description: (language) => language.get("GIVEAWAY_DESCRIPTION"),
            usage: (language, prefix) => language.get("GIVEAWAY_USAGE", prefix),
            examples: (language, prefix) => language.get("GIVEAWAY_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            permLevel: "Server Admin",
            botPermissions: ["EMBED_LINKS"],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000,
        });
    }

    async run(message, args) {
        try {
            let method = args[0].toLowerCase();
            if (!method) return message.channel.send(message.language.get("GIVEAWAY_NO_METHOD", message.settings.prefix));
            if (method === "start"){
                let time = args[1];
                if (!time) return message.channel.send(message.language.get("GIVEAWAY_NO_TIME"));
                let winnersCount = parseInt(args[2]);
                if (!winnersCount) return message.channel.send(message.language.get("GIVEAWAY_NO_WINNERCOUNT"));
                let prize = args.slice(3).join(" ");
                if (!prize) return message.channel.send(message.language.get("GIVEAWAY_NO_PRIZE"));
                message.bot.gManager.start(message.channel, {
                    time: ms(time),
                    prize: prize,
                    winnerCount: winnersCount,
                    messages: message.language.get("GIVEAWAY_CREATE_MESSAGES")
                }).then((gData) => {
                    console.log(gData);
                });
            } else if (method === "edit"){
                let messageID = args[1];
                if (!messageID) return message.channel.send(message.language.get("GIVEAWAY_ERR_NO_ID"));
                let newWinners = parseInt(args[2]);
                if (!newWinners) return message.channel.send(message.language.get("GIVEAWAY_NO_WINNERCOUNT"));
                let newTime = args[3];
                if (!newTime) return message.channel.send(message.channel.get("GIVEAWAY_NO_NEWTIME"));
                let newPrize = args.slice(4).join(" ");
                message.bot.gManager.edit(messageID, {
                    newWinnerCount: newWinners,
                    newPrize: newPrize,
                    addTime: ms(newTime)
                }).catch((err) => {
                    message.channel.send(message.language.get("GIVEAWAY_ERR_MESSAGE_NOT_FOUND"));
                });
            } else if (method === "reroll"){
                let messageID = args[1];
                if (!messageID) return message.channel.send(message.language.get("GIVEAWAY_ERR_NO_ID"));
                let winnersCount = parseInt(args[2]);
                if (!winnersCount) return message.channel.send(message.language.get("GIVEAWAY_REROLL_NO_WINNERSCOUNT"));
                message.bot.gManager.reroll(messageID, {
                    winnerCount: winnersCount,
                    messages: message.language.get("GIVEAWAY_REROLL_MESSAGES")
                }).catch((err) => {
                    message.channel.send(message.language.get("GIVEAWAY_ERR_REROLL_MSG_ENDED", messageID));
                });
            } else if (method === "end"){
                let messageID = args[1];
                if (!messageID) return message.channel.send(message.language.get("GIVEAWAY_ERR_NO_ID"));
                message.bot.gManager.end(messageID)
                    .catch((err) => {
                        message.channel.send(message.language.get("GIVEAWAY_ERR_MESSAGE_NOT_FOUND", messageID));
                    });
            } else if (method === "delete"){
                let messageID = args[1];
                if (!messageID) return message.channel.send(message.language.get("GIVEAWAY_ERR_NO_ID"));
                message.bot.gManager.delete(messageID)
                    .catch((err) => {
                        message.channel.send(message.language.get("GIVEAWAY_ERR_MESSAGE_NOT_FOUND", messageID));
                });
            }

        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = giveaway;
