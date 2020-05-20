const Command = require("../../base/Command.js");

class roleMention extends Command {
    constructor(client) {
        super(client, {
            name: "rolemention",
            description: (language) => language.get("ROLEMENTION_DESCRIPTION"),
            usage: (language, prefix) => language.get("ROLEMENTION_USAGE", prefix),
            examples: (language, prefix) => language.get("ROLEMENTION_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "Server Admin",
            botPermissions: ["MANAGE_ROLES", "MENTION_EVERYONE"],
            nsfw: false,
            adminOnly: false,
            cooldown: 1000,
        });
    }

    async run(message, args) {
        try {
            var toMention = args.slice(0).join(" ");
            if (!toMention) {
                message.channel.send(message.language.get("ROLEMENTION_NOARGS"));
                toMention = await message.bot.functions.awaitResponse(message);
            }
            if (toMention.startsWith(".")) return;
            if (toMention === "everyone" || toMention === "@everyone") {
                return message.channel.send(`@everyone`);
            } else if (toMention === "here" || toMention === "@here") {
                return message.channel.send("@here");
            } else {
                let r = message.guild.roles.resolve(toMention) || message.guild.roles.resolveID(toMention);
                let rid = r.toString().slice(3, r.toString().length - 1) || r.id;
                if (!rid) return message.channel.send(message.language.get("ROLEMENTION_ROLE_NOT_FOUND"));
                return message.channel.send(`<@&${rid}>`);
            }
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = roleMention;
