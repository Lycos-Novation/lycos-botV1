const config = require('../config');
module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(oldMember, newMember) {
		var sql = `SELECT *
		FROM Guilds
		WHERE guild_id="${newMember.guild.id}"`;
		var g;
		mysqlcon.query(sql, async function (err, result, fields) {
			g = result[0];
			if (g.logs_channel === null) return;
			const lang = new (require(`../languages/${g.language}.js`));
			return newMember.guild.channels.cache.find(c => c.id === g.logs_channel).send({
				embed: {
					title: lang.get(`LOGS_GUILD_MEMBER_UPDATE_TITLE`),
					description: lang.get('LOGS_GUILD_MEMBER_UPDATE_DESC', oldMember, newMember),
					footer: {
						text: config.embed.footer,
					},
					thumbnail: {
						url: newMember.user.displayAvatarURL({format: "png",dynamic: true}),
					},
					color: 0xDC9017,
				}
			});
		});
	}
};
