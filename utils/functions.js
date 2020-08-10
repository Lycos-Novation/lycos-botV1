const { Collection } = require("discord.js");
module.exports = {

	async messageEvent(client, message, settings) {
		message.settings = settings;
		// Gets language
		const language = new (require(`../languages/${settings.language}.js`));
		message.language = language;

		if (!message.guild && message.content.toLowerCase().indexOf("discord")) {
			const cmd = client.commands.get("invite");
			return cmd.run(message);
		}
		// Gets message level
		const permLevel = await client.getLevel(message);
		message.permLevel = permLevel;
		// Check if the bot was mentioned
		const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
		if (message.content.match(prefixMention)) {
			return await message.channel.send(language.get("BOT_MENTION", settings.prefix));
		}

		// Gets prefix
		const prefix = client.functions.getPrefix(message);
		if (!prefix) return;
		message.prefix = prefix;

		const args = message.content.slice((typeof prefix === "string" ? prefix.length : 0)).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
		if (!cmd) return;

		if (cmd && !message.guild && cmd.conf.guildOnly) {
			return message.channel.send(language.get("ERROR_COMMAND_GUILDONLY"));
		}

		if (!client.cooldowns.has(cmd.help.name)) {
			client.cooldowns.set(cmd.help.name, new Collection());
		}

		const now = Date.now();
		const timestamps = client.cooldowns.get(cmd.help.name);
		const cooldownAmount = cmd.conf.cooldown;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return client.errors.inCooldown(timeLeft, cmd.help.name, message);
			}
		}

		if (permLevel < 4) {
			timestamps.set(message.author.id, now);
			setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		}

		if (message.guild) {
			const neededPermission = [];
			if (!cmd.conf.botPermissions.includes("EMBED_LINKS")) {
				cmd.conf.botPermissions.push("EMBED_LINKS");
			}
			cmd.conf.botPermissions.forEach((permission) => {
				if (!message.channel.permissionsFor(message.guild.me).has(permission)) {
					neededPermission.push(permission);
				}
			});
			if (neededPermission.length > 0) {
				return client.errors.botPermissions(neededPermission.map((p) => `\`${p}\``).join(", "), message);
			}
		}

		if (message.guild && !message.member.hasPermission("MENTION_EVERYONE") && message.mentions.everyone) {
			return client.errors.everyone(message);
		}

		if (permLevel < client.levelCache[cmd.conf.permLevel]) {
			return client.errors.perm(client.config.permLevels.find((l) => l.level === permLevel).name, cmd.conf.permLevel, message);
		}

		if (message.channel.type === "text" && !message.channel.nsfw && cmd.conf.nsfw) {
			return client.errors.nsfw(message);
		}

		if (!cmd.conf.enabled && permLevel < 4) {
			return client.errors.disabled(message);
		}
		client.logger.log(`[Permission: ${message.permLevel}] ${message.author.tag} (${message.author.id}) ran command ${cmd.help.name}`, "cmd");
		cmd.run(message, args);
	},

	getPrefix(message) {
		const prefixes = [
			`<@!${message.client.user.id}>`,
			`<@${message.client.user.id}>`,
			"Lycos",
			message.settings.prefix,
		];
		let prefix = null;
		prefixes.forEach((p) => {
			if (message.content.startsWith(p)) {
				prefix = p;
			}
		});
		return prefix;
	},

	/**
     * Fetch user by their ID or their username
     * @returns A map of users found with search arguments
     * @param {object} guild
     * @param {object} args
     */
	fetchMembers(guild, args) {
		const search = args.toLowerCase();
		return guild.members.cache.filter((member) => member.id === search || member.displayName.toLowerCase().includes(search));
	},

	async awaitResponse(message) {
		const responseFilter = m => m.author.id === message.author.id;
		const response = await message.channel.awaitMessages(responseFilter, { max: 1 });
		const rescontent = response.first().content;
		return rescontent;
	},

	checkDays(date, message) {
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const days = Math.floor(diff / 86400000);
		if (message.language === "english") {
			return days + (days === 1 ? ` ${message.language.get("DATE_DAY")}` : ` ${message.language.get("DATE_DAYS")}`) + ` ${message.language.get("DATE_AGO")}`;
		} else {
			return message.language.get("DATE_AGO") + days + (days === 1 ? ` ${message.language.get("DATE_DAY")}` : ` ${message.language.get("DATE_DAYS")}`);
		}
	},

	makeid(length) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	},
	/*
		async createProject(settings){
			let merged = Object.assign({_id: mongoose.Types.ObjectId() }, settings);
	
			const newProject = await new Project(merged);
			return newProject.save()
				.then(p => {
					console.log(`Nouveau projet ${p.name} créé avec succès.`)
				});
		},
	
		async delProject(project){
			console.log(`Projet ${project} supprimé.`);
			return Project.deleteOne({name : project})
		},
	
		async getProject(project){
			var data = await Project.findOne({ name: project});
			if(!data){
				data = config.defaultSettingsProject;
			}
			return data;
		},
	
		async updateProject(message, project, settings){
			let data = await message.bot.functions.getProject(project);
	
			if (typeof data !== 'object') data = {};
			for (const key in settings) {
				if (settings.hasOwnProperty(key)) {
					if (data[key] !== settings[key]) data[key] = settings[key];
					else return;
				}
			}
			console.log(`Projet ${data.name} - Modifications : ${Object.keys(settings)}`);
			return await data.updateOne(settings);
		},
	*/

};
