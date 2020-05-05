module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(oldGuild, newGuild) {
		if (oldGuild.id !== newGuild.id || oldGuild.name !== newGuild.name || oldGuild.owner.user.tag !== newGuild.owner.user.tag){
			return mysqlcon.query("UPDATE Guilds SET guild_id = ?, guild_name = ?, guild_owner = ? WHERE guild_id = ?", [newGuild.id, newGuild.name, newGuild.owner.user.tag, oldGuild.id]);
		}
	}
};
