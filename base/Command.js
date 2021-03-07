const config = require("../config.js");

module.exports = class Command {
	constructor(client, {
		name = null,
		description = (language) => language.get("NO_DESCRIPTION_PROVIDED"),
		usage = (language) => language.get("NO_USAGE_PROVIDED"),
		examples = (language) => language.get("NO_EXAMPLES_PROVIDED"),
		dirname = false,
		enabled = true,
		guildOnly = false,
		aliases = [],
		permLevel = "User",
		botPermissions = [],
		nsfw = false,
		adminOnly = false,
		cooldown = 3000,
	}) {
		const category = (dirname ? dirname.split("/")[parseInt(dirname.split("/").length - 1, 10)] : "Other");
		this.client = client;
		this.conf = { enabled, guildOnly, aliases, botPermissions, nsfw, adminOnly, cooldown, permLevel };
		this.help = { name, description, category, usage, examples };
	}
};