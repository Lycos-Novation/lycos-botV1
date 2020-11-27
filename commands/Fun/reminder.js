const Command = require("../../base/Command.js");
const ms = require("ms")

class Reminder extends Command {
    constructor(client) {
        super(client, {
            name: "reminder",
            description: (language) => language.get("REMINDER_DESCRIPTION"),
            usage: (language, prefix) => language.get("REMINDER_USAGE", prefix),
            examples: (language, prefix) => language.get("REMINDER_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            permLevel: "User",
            botPermissions: ["SEND_MESSAGES"],
            aliases: ["rappel", "remind"],
            nsfw: false,
            adminOnly: false,
            cooldown: 2000,
        });
    }

    async run(message, args) {
        try {
            const time = args[0];
            if (!time) return message.channel.send(message.language.get("REMINDER_NO_TIME"))
            const toRemind = args.slice(1).join(" ")
            if (!toRemind) return message.channel.send(message.language.get("REMINDER_NO_REMIND"))
            if (toRemind.lenght > 1900) return message.channel.send(message.language.get("REMINDER_TOO_LONG"))
            message.channel.send({
                embed: {
                    title: message.language.get("REMINDER_TITLE"),
                    description: message.language.get("REMINDER_STARTED", toRemind, ms(ms(time), { long: true })),
                    color: 0x1EF121
                }
            })
            return setTimeout(() => {
                message.channel.send({
                    embed: {
                        title: message.language.get("REMINDER_TITLE"),
                        description: message.language.get("REMINDER_ENDED", message.author.id, toRemind),
                        color: 0xF40C0C
                    }
                }).then(message.channel.send(`<@!${message.author.id}>`).then((m) => m.delete()))

            }, ms(time))
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = Reminder;
