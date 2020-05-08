const Command = require('../../base/Command');

class Unban extends Command {
    constructor(client) {
		super(client, {
			name: "unban",
			description: (language) => language.get("UNBAN_DESCRIPTION"),
			usage: (language, prefix) => language.get("UNBAN_USAGE", prefix),
			examples: (language, prefix) => language.get("UNBAN_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			permLevel: "Server Moderator",
			botPermissions: ["EMBED_LINKS", "BAN_MEMBERS"],
			nsfw: false,
			adminOnly: false,
			cooldown: 1000,
		});
    }
    
    async run(message, args){
        try {
            const searchArgs = args.slice(1).join(" ");
				if (!searchArgs) {
					return message.reply(`<:false:470303149077299231> ${message.language.get("UNBAN_ERRORARGS")}`)
				}
				const guildBans = await message.guild.fetchBans();
				if (!guildBans.some((u) => u.user.id === searchArgs)) {
					return message.channel.send(message.language.get("UNBAN_NOT_BANNED"));
				}
				await message.guild.members.unban(searchArgs)
					.then(u => {message.channel.send(message.language.get("UNBAN_INFO", u.username, message))})
					.catch((error) => message.channel.send(`<:false:470303149077299231> ${message.author} ${message.language.get("UNBAN_ERROR")} ${error}`));
				return;
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}
module.exports = Unban;