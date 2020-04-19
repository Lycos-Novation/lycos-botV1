const config = require("./config.js"),
	{ ShardingManager } = require("discord.js");
const sharder = new ShardingManager("./lycos.js", {
	totalShards: "auto",
	respawn: true,
	token: config.token,
	autoSpawn: true,
});

sharder.on("shardCreate", shard => console.log(`[ShardingManager] - Launching shard ${shard.id + 1}/${shard.manager.totalShards}`));
sharder.spawn();
