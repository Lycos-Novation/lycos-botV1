const Command = require("../../base/Command.js");

class clear extends Command {
    constructor(client) {
        super(client, {
            name: "clear",
            description: (language) => language.get("CLEAR_DESCRIPTION"),
            usage: (language, prefix) => language.get("CLEAR_USAGE", prefix),
            examples: (language, prefix) => language.get("CLEAR_EXAMPLE", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "Server Moderator",
            botPermissions: ["MANAGE_CHANNELS"],
            nsfw: false,
            adminOnly: false,
            cooldown: 1000,
        });
    }

    async run(message) {
        try {
            const position = message.channel.position;
			const newChannel = await message.channel.clone();
			await message.channel.delete();
			newChannel.setPosition(position);
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = clear;
