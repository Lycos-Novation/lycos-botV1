const config = require('../config');
module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(channel) {
		if (channel.type === 'dm') return;/////Ajouter si salon = un salon de logs ou autre alors mettre null dans le salon de logs ou autre
		var g;
		var sql = `SELECT *
		FROM Guilds
		WHERE guild_id="${channel.guild.id}"`;
		mysqlcon.query(sql, async function (err, result, fields) {
			if (err) throw err;
			g = result[0];
		g = result[0];
		if (channel.id === g.welcome_channel) {
			mysqlcon.query("UPDATE Guilds SET welcome_channel = ? WHERE guild_id = ?", [null, channel.guild.id]);
		} else if (channel.id === g.leave_channel) {
			mysqlcon.query("UPDATE Guilds SET leave_channel = ? WHERE guild_id = ?", [null, channel.guild.id]);
		} else if (channel.id === g.logs_channel) {
			mysqlcon.query("UPDATE Guilds SET logs_channel = ? WHERE guild_id = ?", [null, channel.guild.id]);
		} else if (channel.id === g.modlogs_channel) {
			mysqlcon.query("UPDATE Guilds SET modlogs_channel = ? WHERE guild_id = ?", [null, channel.guild.id]);
		} else if (channel.id === g.rolereaction_channel) {
			mysqlcon.query("UPDATE Guilds SET rolereaction_channel = ? WHERE guild_id = ?", [null, channel.guild.id]);
		} else if (channel.id === g.reports_channel) {
			mysqlcon.query("UPDATE Guilds SET reports_channel = ? WHERE guild_id = ?", [null, channel.guild.id]);
		} else if (channel.id === g.membercount_channel) {
			mysqlcon.query("UPDATE Guilds SET membercount_channel = ? WHERE guild_id = ?", [null, channel.guild.id]);
		}
		if(g.logs_channel === null) return;
		const lang = new (require(`../languages/${g.language}.js`));
		return channel.guild.channels.cache.find(c => c.id === g.logs_channel).send({
			embed: {
				title: lang.get(`LOGS_CHANNEL_DELETE_TITLE`),
				description : lang.get('LOGS_CHANNEL_DELETE_DESC', channel),
				footer: {
					text: config.embed.footer,
				},
				color: 0xDB0808,
			}
		});
	});
	}
};
