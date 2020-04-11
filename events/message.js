module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(message) {
		if(message.author.bot) {return;}

		const client = this.client;

		if(message.guild && !message.member) {
			await message.guild.members.fetch(message.author.id);
		}

		if (message.guild && !message.guild.member(client.user).hasPermission("SEND_MESSAGES")) {return;}

		message.config = client.config;
		message.bot = client;

		// Gets settings
		const settings = await client.functions.getDataGuild(message.guild);
		message.settings = settings;

		// Gets language
		const language = new (require(`../languages/${settings.language}.js`));
		message.language = language;

		// Gets message level
		const permLevel = await client.getLevel(message);
		message.permLevel = permLevel;

		// Check if the bot was mentioned
		const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
		if (message.content.match(prefixMention)) {
			return message.channel.send(language.get("PREFIX_INFO", settings.prefix));
		}

		const prefix = client.functions.getPrefix(message);
		if(!prefix) {return;}

		const args = message.content.slice((typeof prefix === "string" ? prefix.length : 0)).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
		if(!cmd) {return;}

		if(cmd && !message.guild && cmd.conf.guildOnly) {
			return message.channel.send(language.get("ERROR_COMMAND_GUILDONLY"));
		}

		if(message.guild) {
			const neededPermission = [];
			if(!cmd.conf.botPermissions.includes("EMBED_LINKS")) {
				cmd.conf.botPermissions.push("EMBED_LINKS");
			}
			cmd.conf.botPermissions.forEach((permission) => {
				if(!message.channel.permissionsFor(message.guild.me).has(permission)) {
					neededPermission.push(permission);
				}
			});
			if(neededPermission.length > 0) {
				return client.errors.botPermissions(neededPermission.map((p) => `\`${p}\``).join(", "), message);
			}
		}

		if(message.guild && !message.member.hasPermission("MENTION_EVERYONE") && message.mentions.everyone) {
			return client.errors.everyone(message);
		}

		if(permLevel < client.levelCache[cmd.conf.permLevel]) {
			return client.errors.perm(client.config.permLevels.find((l) => l.level === permLevel).name, cmd.conf.permLevel, message);
		}

		if(message.channel.type === "text" && !message.channel.nsfw && cmd.conf.nsfw) {
			return client.errors.nsfw(message);
		}

		if(!cmd.conf.enabled && permLevel < 4) {
			return client.errors.disabled(message);
		}
		client.logger.log(`[Permission: ${message.permLevel}] ${message.author.tag} (${message.author.id}) ran command ${cmd.help.name}`, "cmd");
		cmd.run(message, args);
	}
};
