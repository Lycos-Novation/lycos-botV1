const config = require('../config');
module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(oldEmoji, newEmoji) {
		var sql = `SELECT *
		FROM Guilds
		WHERE guild_id="${newEmoji.guild.id}"`;
		var g;
		mysqlcon.query(sql, async function (err, result, fields) {
			g = result[0];
			if (g.logs_channel === null) return;
			const lang = new (require(`../languages/${g.language}.js`));
			return newEmoji.guild.channels.cache.find(c => c.id === g.logs_channel).send({
				embed: {
					title: lang.get(`LOGS_EMOJI_UPDATE_TITLE`),
					description: lang.get('LOGS_EMOJI_UPDATE_DESC', oldEmoji, newEmoji),
					footer: {
						text: config.embed.footer,
					},
					thumbnail: {
						url: oldEmoji.url,
					},
					color: 0xDC9017,
				}
			});
		});
	}
};
