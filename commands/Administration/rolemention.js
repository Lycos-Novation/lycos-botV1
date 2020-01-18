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
            botPermissions: ["MANAGE_ROLES"],
            nsfw: false,
            adminOnly: false,
            cooldown: 1000,
        });
    }

    async run(message, args) {
        try {
            let role = message.guild.roles.find(r => r.id === args[0]) || message.guild.roles.find(r => r.name === args.slice(0).join(" "));
            if (!role) return message.channel.send(message.language.get("ROLEMENTION_ROLE_NOT_FOUND"));
            if (role.comparePositionTo(message.guild.roles.find(r => r.name === "LycosTests")) > 0) return message.channel.send(message.language.get("ROLEMENTION_ROLE_HIGHEST"));
            if (!role.mentionable) {
                await role.setMentionable(true);
                message.channel.send(`<@&${role.id}>`);
                await role.setMentionable(false);
            } else {
                message.channel.send(`<@&${role.id}>`)
            }
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = roleMention;
