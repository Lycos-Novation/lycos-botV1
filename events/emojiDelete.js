const config = require('../config');
module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(emoji) {
		var sql = `SELECT *
		FROM Guilds
		WHERE guild_id="${emoji.guild.id}"`;
		var g;
		mysqlcon.query(sql, async function (err, result, fields) {
			g = result[0];
			if (g.logs_channel === null) return;
			const lang = new (require(`../languages/${g.language}.js`));
			return emoji.guild.channels.cache.find(c => c.id === g.logs_channel).send({
				embed: {
					title: lang.get(`LOGS_EMOJI_DELETE_TITLE`),
					description: lang.get('LOGS_EMOJI_DELETE_DESC', emoji),
					footer: {
						text: config.embed.footer,
					},
					thumbnail: {
						url: emoji.url,
					},
					color: 0xDB0808,
				}
			});
		});
	}
};
