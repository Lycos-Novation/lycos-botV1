const config = require('../config');
module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(guild, user) {
		var sql = `SELECT *
		FROM Guilds
		WHERE guild_id="${guild.id}"`;
		var g;
		mysqlcon.query(sql, async function (err, result, fields) {
			g = result[0];
			if (g.modlogs_channel === null) return;
			const lang = new (require(`../languages/${g.language}.js`));
			return guild.channels.cache.find(c => c.id === g.modlogs_channel).send({
				embed: {
					title: lang.get(`LOGS_GUILD_BAN_ADD_TITLE`),
					description: lang.get('LOGS_GUILD_BAN_ADD_DESC', user),
					footer: {
						text: config.embed.footer,
					},
					thumbnail: {
						url: user.displayAvatarURL({format: "png",dynamic: true}),
					},
					color: 0x21E61B,
				}
			});
		});
	}
};
