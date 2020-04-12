const functions = require('../utils/functions');
const config = require('../config');
module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(member) {
		const g = await functions.getDataGuild(member.guild);
		const lang = new (require(`../languages/${g.language}.js`));
		if(g.channels.leave === null) return;
		return member.guild.channels.cache.find(c => c.id === g.channels.leave).send({
			embed: {
				title: lang.get(`LOGS_GUILD_MEMBER_REMOVE_TITLE`),
				description : lang.get('LOGS_GUILD_MEMBER_REMOVE_DESC', member),
				footer: {
					text: config.embed.footer,
				},
				color: 0xDB0808,
				thumbnail: member.user.displayAvatarURL,
			}
		});
	}
};
