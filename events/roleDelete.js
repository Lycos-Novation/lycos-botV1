const config = require('../config');
module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(role) {
		var sql = `SELECT *
		FROM Guilds
		WHERE guild_id="${role.guild.id}"`;
		var g;
		mysqlcon.query(sql, async function (err, result, fields) {
			g = result[0];
		if(g.logs_channel === null) return;
		const lang = new (require(`../languages/${g.language}.js`));
		return role.guild.channels.cache.find(c => c.id === g.logs_channel).send({
			embed: {
				title: lang.get(`LOGS_ROLE_DELETE_TITLE`),
				description : lang.get('LOGS_ROLE_DELETE_DESC', role),
				footer: {
					text: config.embed.footer,
				},
				color: 0xDB0808,
			}
		});
	});
	}
};
