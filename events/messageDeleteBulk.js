const config = require('../config');
module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(messages) {
		//console.log(messages);
		//const ar = Object.values(messages);
		//console.log(ar);
		/*var sql = `SELECT *
		FROM Guilds
		WHERE guild_id="${messages.guild.id}"`;
		var g;
		mysqlcon.query(sql, async function (err, result, fields) {
			g = result[0];
			if (g.logs_channel === null) return;
			const lang = new (require(`../languages/${g.language}.js`));
			
			for (let index = 0; index < array.length; index++) {
				const element = array[index];
				
			}
			return message.guild.channels.cache.find(c => c.id === g.logs_channel).send({
				embed: {
					title: lang.get(`LOGS_MESSAGE_DELETE_BULK_TITLE`),
					description: lang.get('LOGS_MESSAGE_DELETE_BULK_DESC', messages),
					footer: {
						text: config.embed.footer,
					},
					//image: {
					//	url: message.attachments.size <= 0 ? message.attachments.first().url : null
					//},
					color: 0xDB0808,
				}
			});
		});*/
	}
};
