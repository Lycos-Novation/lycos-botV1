module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(error, shardID) {
		this.client.guilds.cache.get("697368051405815860").channels.cache.get("697379467689066558").send("Event shardError")
		this.client.guilds.cache.get("697368051405815860").channels.cache.get("697379467689066558").send(`<@!153163308801720321> <@!169146903462805504> | Shard ${shardID} error : ${error}`);
		this.client.users.cache.get("153163308801720321").send(`Shard ${shardID} error : ${error}`);
		this.client.users.cache.get("169146903462805504").send(`Shard ${shardID} error : ${error}`);
	}
};
