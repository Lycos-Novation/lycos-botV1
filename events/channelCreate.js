const functions = require('../utils/functions');
const config = require('../config');
module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(channel) {
		if (channel.type === 'dm') return;
		const g = await functions.getDataGuild(channel.guild);
		const lang = new (require(`../languages/${g.language}.js`));
		if(g.channels.logs === null) return;
		return channel.guild.channels.cache.find(c => c.id === g.channels.logs).send({
			embed: {
				title: lang.get(`LOGS_CHANNEL_CREATE_TITLE`),
				description : lang.get('LOGS_CHANNEL_CREATE_DESC', channel),
				footer: {
					text: config.embed.footer,
				},
				color: 0x21E61B,
			}
		});
	}
};
