module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(id) {
		this.client.guilds.cache.get("697368051405815860").channels.cache.get("697379467689066558").send(`Shard ${id} | Tentative de reconnexion`)
		
	}
};
