const functions = require('../utils/functions');
const config = require('../config');
module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(member) {
		const g = await functions.getDataGuild(member.guild);
		const lang = new (require(`../languages/${g.language}.js`));
		if(g.channels.welcome === null) return;
		return member.guild.channels.cache.find(c => c.id === g.channels.welcome).send({
			embed: {
				title: lang.get(`LOGS_GUILD_MEMBER_ADD_TITLE`),
				description : lang.get('LOGS_GUILD_MEMBER_ADD_DESC', member),
				footer: {
					text: config.embed.footer,
				},
				color: 0x21E61B,
				thumbnail: member.user.displayAvatarURL,
			}
		});
	}
};
