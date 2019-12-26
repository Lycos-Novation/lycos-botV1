module.exports = {
	/**
	 * Gets channel settings
	 * @returns The guild data
	 * @param message
	 */
	getData(message) {
		if (message.channel.guild) {
			if (message.bot.guildsData.get(message.guild.id)) {
				return ({ ...message.bot.guildsData.get("default-data"), ...message.bot.guildsData.get(message.guild.id) });
			}
			else if (!message.bot.guildsData.get(message.guild.id)) {
				message.bot.guildsData.ensure("default-data", {
					language: message.bot.config.defaultLanguage,
					prefix: message.bot.config.prefix,
					channels: {
						welcome: null,
						leave: null,
						logs: null,
						modlogs: null,
						suggestions: null,
					},
					modules: {
						welcome: false,
						leave: false,
						games: false,
						nsfw: false,
						nsfwHentai: false,
					},
				});
				return message.bot.guildsData.get("default-data");
			}
		}
		else {
			return ({
				language: message.bot.config.defaultLanguage,
				prefix: "",
				modules: {
					games: false,
					nsfw: false,
					nsfwHentai: false,
				},
			});
		}
	},

	getUser(message, id) {
		return message.bot.usersData.get(id);
	},

	getSupport(message, args) {
		if(message.channel.guild) {
			if (message.bot.supportsData.get(`${args}`)) {
				return ({ ...message.bot.supportsData.get(`${args}`) });
			}
			else {return false;}
		}
	},

	/**
     * Gets message prefix
     * @param {object} message The Discord message
     * @returns boolean prefix
     */
	getPrefix(message) {
		if(message.channel.type !== "dm") {
			const prefixes = [
				`<@${message.client.user.id}>`,
				"Denver",
				message.settings.prefix,
			];
			let prefix = null;
			prefixes.forEach((p) => {
				if(message.content.startsWith(p)) {
					prefix = p;
				}
			});
			return prefix;
		}
		else {
			return true;
		}
	},

	/**
     * Fetch user by their ID or their username
     * @returns A map of users found with search arguments
     * @param {object} guild
     * @param {object} args
     */
	fetchMembers(guild, args) {
		const search = args.toLowerCase();
		return guild.members.filter((member) => member.id === search || member.displayName.toLowerCase().includes(search));
	},

	/**
	 * Fetch user by their ID or their username
	 * @returns A map of users found with search arguments
	 * @param date
	 */
	checkDays(date) {
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const days = Math.floor(diff / 86400000);
		return days + (days === 1 ? " day" : " days") + " ago)";
	},
};
