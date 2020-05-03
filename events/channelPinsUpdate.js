const config = require('../config');
module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(channel, time) {
		if (channel.type === 'dm') return;
		var sql = `SELECT *
		FROM Guilds
		WHERE guild_id="${channel.guild.id}"`;
		var g;
		mysqlcon.query(sql, async function (err, result, fields) {
			g = result[0];
			if (g.logs_channel === null) return;
			const lang = new (require(`../languages/${g.language}.js`));
			return channel.guild.channels.cache.find(c => c.id === g.logs_channel).send({
				embed: {
					title: lang.get(`LOGS_CHANNEL_PINS_UPDATE_TITLE`),
					description: lang.get('LOGS_CHANNEL_PINS_UPDATE_DESC', channel, time),
					footer: {
						text: config.embed.footer,
					},
					color: 0xDC9017,
				}
			});
		});
	}
};
