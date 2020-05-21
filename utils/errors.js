module.exports = {
	/**
     * Send an error of permissions
     * @param {string} level The level of the user
     * @param {string} requiredLevel The permissions required
     * @param {object} message The discord message
     */
	perm(level, requiredLevel, message) {
		return message.channel.send({
			embed: {
				color: 16711680,
				author: {
					text: message.language.get("ERROR_PERMISSIONS_TITLE"),
				},
				description: message.language.get("ERROR_PERMISSIONS_CONTENT", level, requiredLevel),
				timestamp: new Date(),
				footer: {
					text: message.config.embed.footer,
				},
			},
		});
	},

	/**
     * Send an error if the channel is not NSFW
     * @param {object} message The discord message
     */
	nsfw(message) {
		return message.channel.send({
			embed: {
				color: 16711680,
				author: {
					text: message.language.get("ERROR_NSFW_TITLE"),
				},
				description: message.language.get("ERROR_NSFW_CONTENT"),
				timestamp: new Date(),
				footer: {
					text: message.config.embed.footer,
				},
			},
		});
	},

	/**
     * Send an error message if the command is disabled
     * @param {object} message The discord message
     */
	disabled(message) {
		return message.channel.send({
			embed: {
				color: 16711680,
				author: {
					text: message.language.get("ERROR_DISABLED_TITLE"),
				},
				description: message.language.get("ERROR_DISABLED_CONTENT"),
				timestamp: new Date(),
				footer: {
					text: message.config.embed.footer,
				},
			},
		});
	},

	/**
     * Send an error message if the member doesn't have the permission to mention everyone
     * @param {object} message The discord message
     */
	everyone(message) {
		return message.channel.send({
			embed: {
				color: 16711680,
				author: {
					text: message.language.get("ERROR_EVERYONE_TITLE"),
				},
				description: message.language.get("ERROR_EVERYONE_CONTENT"),
				timestamp: new Date(),
				footer: {
					text: message.config.embed.footer,
				},
			},
		});
	},

	/**
     * Send an error message if the bot doesn't have the permission
     * @param {string} permissions Needed permissions
     * @param {object} message The discord message
     */
	botPermissions(permissions, message) {
		return message.channel.send(`**${message.language.get("ERROR_BOTPERMISSIONS_TITLE")}**\n\n${message.language.get("ERROR_BOTPERMISSIONS_CONTENT", permissions)}`);
	},
};