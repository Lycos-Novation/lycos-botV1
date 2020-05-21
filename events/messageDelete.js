const config = require('../config');
module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(message) {
		if (message.channel.type === 'dm' || message.author.bot || message.content.indexOf('.') === 0) return;
		var sql = `SELECT *
		FROM Guilds
		WHERE guild_id="${message.guild.id}"`;
		var g;
		mysqlcon.query(sql, async function (err, result, fields) {
			g = result[0];
			if (g.logs_channel === null) return;
			const lang = new (require(`../languages/${g.language}.js`));
			return message.guild.channels.cache.find(c => c.id === g.logs_channel).send({
				embed: {
					title: lang.get(`LOGS_MESSAGE_DELETE_TITLE`),
					description: lang.get('LOGS_MESSAGE_DELETE_DESC', message),
					footer: {
						text: config.embed.footer,
					},
					/*image: {
						url: message.attachments.size <= 0 ? message.attachments.first().url : null
					},*/
					color: 0xDB0808,
				}
			});
		});
	}
};
