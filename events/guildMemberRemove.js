const config = require('../config');
module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(member) {
		try {
			const sql = `SELECT language, leave_channel
		FROM Guilds
		WHERE guild_id="${member.guild.id}"`;
			var g;
			mysqlcon.query(sql, async function (err, result, fields) {
				if (err) throw err;
				g = result[0];
				const lang = new (require(`../languages/${g.language}.js`));
				if (g.leave_channel === null) return;
				return member.guild.channels.cache.find(c => c.id === g.leave_channel).send({
					embed: {
						title: lang.get(`LOGS_GUILD_MEMBER_REMOVE_TITLE`),
						description: lang.get('LOGS_GUILD_MEMBER_REMOVE_DESC', member),
						footer: {
							text: config.embed.footer,
						},
						color: 0xDB0808,
						thumbnail: member.user.displayAvatarURL,
					}
				});
			});
		} catch (error) {
			console.error(error);
			return member.guild.channels.cache.find(c => c.id === g.leave_channel).send(message.language.get("ERROR", error));
		}

	}
};
