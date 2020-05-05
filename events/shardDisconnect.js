module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(event, id) {
		this.client.guilds.cache.get("697368051405815860").channels.cache.get("697379467689066558").send("Event shardDisconnect")
		this.client.guilds.cache.get("697368051405815860").channels.cache.get("697379467689066558").send(`<@!153163308801720321> <@!169146903462805504> | Shard ${id} disconnected - ${event}`);
		this.client.users.cache.get("153163308801720321").send(`Shard ${id} disconnected - ${event}`);
		this.client.users.cache.get("169146903462805504").send(`Shard ${id} disconnected - ${event}`);
	}
};
