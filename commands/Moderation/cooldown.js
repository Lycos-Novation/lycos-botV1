const Command = require("../../base/Command.js");
const ms = require("ms");
class Cooldown extends Command {
    constructor(client) {
        super(client, {
            name: "cooldown",
            description: (language) => language.get("GIVEAWAY_DESCRIPTION"),
            usage: (language, prefix) => language.get("GIVEAWAY_USAGE", prefix),
            examples: (language, prefix) => language.get("GIVEAWAY_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "Server Moderator",
            botPermissions: ["MANAGE_MESSAGES"],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000,
        });
    }

    async run(message) {
        try {
            let cooldown = new Collection();
            if (!cooldown.has(cmd.help.name)){
				cooldown.set(cmd.help.name, new Collection());
            }
            const now = Date.now();
			const timestamps = client.cooldowns.get(cmd.help.name);
			const cooldownAmount = cmd.conf.cooldown;

            if (timestamps.has(message.author.id)){
				const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
				if (now < expirationTime){
					const timeLeft = (expirationTime - now) / 1000;
					return client.errors.inCooldown(timeLeft, cmd.help.name, message);
				}
			}

			if (permLevel < 4) {
				timestamps.set(message.author.id, now);
				setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
			}
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = Cooldown;
