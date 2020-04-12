const Command = require("../../base/Command.js");

class memberCount extends Command {
    constructor(client) {
        super(client, {
            name: "membercount",
            description: (language) => language.get("MEMBERCOUNT_DESCRIPTION"),
            usage: (language, prefix) => language.get("MEMBERCOUNT_USAGE", prefix),
            examples: (language, prefix) => language.get("MEMBERCOUNT_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildonly: true,
            permLevel: "Server Admin",
            botPermissions: ["MANAGE_CHANNELS"],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000,
        });
    }

    run(message, args) {
        try {
            let method = args[0];
            let salon = message.guild.channels.cache.find(c => c.name === `${message.guild.memberCount} ${message.language.get("MEMBERCOUNT_MEMBERS")}`);
            if (!method) {
                if (salon) {
                    salon.delete("Membercount")
                        .then()
                        .catch(console.error);
                } else {
                    return message.channel.send(message.language.get("MEMBERCOUNT_NO_METHOD"))
                }
            } else {
                if (salon) return message.channel.send(message.language.get("MEMBERCOUNT_CHANNEL_EXISTS", salon));
                if (method === "category") {
                    message.guild.channels.create(`${message.guild.memberCount} ${message.language.get("MEMBERCOUNT_MEMBERS")}`, {
                        type: 'category',
                        reason: "Membercount"
                    })
                        .then(c => message.guild.channels.cache.get(c.id).setPosition(0))
                        .catch(console.error)
                } else if (method === "channel") {
                    message.guild.channels.create(`${message.guild.memberCount} ${message.language.get("MEMBERCOUNT_MEMBERS")}`, {
                        type: 'voice',
                        position: 0,
                        reason: "Membercount"
                    })
                        .then()
                        .catch(console.error)
                } else {
                    message.channel.send(message.language.get("MEMBERCOUNT_UNVALID_METHOD"))
                }
            }
        } catch (error){
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error))
        }
    }
}

module.exports = memberCount;