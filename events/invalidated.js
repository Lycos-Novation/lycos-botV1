module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run() {
		await this.client.guilds.cache.get("697368051405815860").channels.cache.get("697379467689066558").send("<@!153163308801720321> <@!169146903462805504> | Event invalidated emitted, bot shutdowned, please check logs and restart bot");
		this.client.destroy();
	}
};
