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
            let r = message.guild.roles.resolve(args[0]) || message.guild.roles.resolveID(args[0]);
            if (!r) return message.channel.send(message.language.get("ROLEMENTION_ROLE_NOT_FOUND"));
            let rid = r.toString().slice(3, r.toString().length -1) || r.id;
            return message.channel.send(`<@&${rid}>`);
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = roleMention;
