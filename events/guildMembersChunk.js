module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(members, guild) {
		return guild.client.guilds.cache.get("697368051405815860").channels.cache.get("697379467689066558").send(`<@153163308801720321> event guildMembersChunk emitted => members : ${members}`);
		/*var sql = `SELECT *
		FROM Guilds
		WHERE guild_id="${members.guild.id}"`;
		var g;
		mysqlcon.query(sql, async function (err, result, fields) {
			g = result[0];
			if (g.logs_channel === null) return;
			const lang = new (require(`../languages/${g.language}.js`));
			return emoji.guild.channels.cache.find(c => c.id === g.logs_channel).send({
				embed: {
					title: lang.get(`LOGS_GUILD_MEMBER_CHUNK_TITLE`),
					description: lang.get('LOGS_GUILD_MEMBER_CHUNK_DESC', members, guild),
					footer: {
						text: config.embed.footer,
					},
					thumbnail: {
						url: guild.iconURL({ format: "png", dynamic: true }),
					},
					color: 0x21E61B,
				}
			});
		});*/
	}
};
