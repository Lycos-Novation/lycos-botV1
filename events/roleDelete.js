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
			var ar = result[0].autorole, ids = [];
			if (ar.split("/").length > 1) {
				for (var i = 0; i < ar.split("/").length; i++) {
					if (ar.split("/")[i] !== rid) {
						ids.push(ar.split("/")[i])
					}
				}
				ids.join("/");
				mysqlcon.query("UPDATE Guilds SET autorole = ? WHERE guild_id = ?", [ids, message.guild.id]);
				return message.channel.send(message.language.get("AUTOROLE_ROLE_REMOVED", rid));
			}
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
