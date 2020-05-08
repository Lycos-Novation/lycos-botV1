const functions = require('../utils/functions');
const config = require('../config');
module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(member) {
		try {
			const sql = `SELECT autorole, welcome_channel, language
		FROM Guilds
		WHERE guild_id="${member.guild.id}"`;
			var g;
			mysqlcon.query(sql, async function (err, result, fields) {
				if (err) throw err;
				g = result[0];
				if (g.autorole !== "") {
					member.roles.add(g.autorole.split("/"), "Autorole")
				}
				const lang = new (require(`../languages/${g.language}.js`));
				if (g.welcome_channel === null) return;
				return member.guild.channels.cache.find(c => c.id === g.welcome_channel).send({
					embed: {
						title: lang.get(`LOGS_GUILD_MEMBER_ADD_TITLE`),
						description: lang.get('LOGS_GUILD_MEMBER_ADD_DESC', member),
						footer: {
							text: config.embed.footer,
						},
						color: 0x21E61B,
						thumbnail: member.user.displayAvatarURL({format: "png",dynamic: true})
					}
				});
			});
		} catch (error) {
			console.error(error);
			return member.guild.channels.cache.find(c => c.id === g.leave_channel).send(message.language.get("ERROR", error));
		}
	}
};
