module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(id, replayedEvents) {
		this.client.guilds.cache.get("697368051405815860").channels.cache.get("697379467689066558").send(`Shard ${id} reconnectée, ${replayedEvents} évènements rejoués.`)
		
	}
};
