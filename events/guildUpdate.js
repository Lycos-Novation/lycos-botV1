module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(oldGuild, newGuild) {
		const oldOwner = oldGuild.members.cache.get(oldGuild.ownerID)
		const newOwner = newGuild.members.cache.get(newGuild.ownerID)
		if (oldGuild.id !== newGuild.id || oldGuild.name !== newGuild.name || oldOwner !== newOwner){
			return mysqlcon.query("UPDATE Guilds SET guild_id = ?, guild_name = ?, guild_owner = ? WHERE guild_id = ?", [newGuild.id, newGuild.name, newGuild.ownerID, oldGuild.id]);
		}
	}
};
