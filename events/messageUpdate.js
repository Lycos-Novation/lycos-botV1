const config = require('../config');
module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(oldMessage, newMessage) {
		if (oldMessage.channel.type === 'dm' || oldMessage.author.bot || oldMessage.content.indexOf('.') === 0) return;
		var sql = `SELECT *
		FROM Guilds
		WHERE guild_id="${newMessage.guild.id}"`;
		var g;
		mysqlcon.query(sql, async function (err, result, fields) {
			g = result[0];
			if (oldMessage.channel.type === "dm" || newMessage.channel.type === 'dm' || newMessage.author.bot || newMessage.content.indexOf(g.prefix) === 0 || oldMessage.content.indexOf(g.prefix) === 0 ) return;
			if (g.logs_channel === null) return this.client.functions.messageEvent(newMessage.bot, newMessage, g);
			const lang = new (require(`../languages/${g.language}.js`));
			newMessage.guild.channels.cache.find(c => c.id === g.logs_channel).send({
				embed: {
					title: lang.get(`LOGS_MESSAGE_UPDATE_TITLE`),
					description: lang.get('LOGS_MESSAGE_UPDATE_DESC', oldMessage, newMessage),
					footer: {
						text: config.embed.footer,
					},
					color: 0xDC9017,
				}
			});
			return this.client.functions.messageEvent(newMessage.bot, newMessage, g);
		});
	}
};
