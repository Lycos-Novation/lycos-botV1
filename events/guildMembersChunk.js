module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(members, guild) {
		return guild.client.guilds.cache.get("709113368493031426").channels.cache.get("709113658336346122").send(`<@153163308801720321> event guildMembersChunk emitted => members : ${members.map(m => m)}`);
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
