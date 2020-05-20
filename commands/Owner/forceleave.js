const Command = require("../../base/Command.js"), util = require("util");

class forceLeave extends Command {
    constructor(client) {
        super(client, {
            name: "forceleave",
            description: (language) => language.get("AUTONICK_DESCRIPTION"),
            usage: (language, prefix) => language.get("AUTONICK_USAGE", prefix),
            examples: (language, prefix) => language.get("AUTONICK_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            permLevel: "Bot Admin",
            botPermissions: ["EMBED_LINKS"],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000,
        });
    }

    run(message, args) {
        try {
            var toLeave = args[0];
            if (!toLeave) {
                message.channel.send("Indique l'id du serveur à quitter.");
                toLeave = message.bot.functions.awaitResponse(message);
            }
            this.client.shard.broadcastEval(`this.guilds.cache.get("${toLeave}").leave();`)
                .then(results => message.channel.send("Serveur quitté !"))
                .catch(console.error);
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = forceLeave;
