const config = require('../config');
module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(oldChannel, newChannel) {
		if (oldChannel.type === "dm" || newChannel.type === 'dm') return;
		var sql = `SELECT *
		FROM Guilds
		WHERE guild_id="${newChannel.guild.id}"`;
		var g;
		mysqlcon.query(sql, async function (err, result, fields) {
			g = result[0];
			if (g.logs_channel === null) return;
			const lang = new (require(`../languages/${g.language}.js`));
			return newChannel.guild.channels.cache.find(c => c.id === g.logs_channel).send({
				embed: {
					title: lang.get(`LOGS_CHANNEL_UPDATE_TITLE`),
					description: lang.get('LOGS_CHANNEL_UPDATE_DESC', oldChannel, newChannel),
					footer: {
						text: config.embed.footer,
					},
					color: 0xDC9017,
				}
			});
		});
	}
};
