module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(message) {
		if (message.author.bot) { return; }

		const client = this.client;

		if (message.guild && !message.member) {
			await message.guild.members.fetch(message.author.id);
		}

		if (message.guild && !message.guild.member(client.user).hasPermission("SEND_MESSAGES")) { return; }

		message.config = client.config;
		message.bot = client;

		// Gets settings
		if (message.guild) {
			var sql = `SELECT *
			FROM Guilds
			WHERE guild_id="${message.guild.id}"`;
			var settings;
			mysqlcon.query(sql, async function (err, result, fields) {
				if (result.length === 0) {
					sql = `INSERT INTO Guilds (guild_id, guild_name, guild_owner, autorole, rolereaction_emotes, rolereaction_roles, rolereaction_descs)
						VALUES ("${message.guild.id}", "${message.guild.name}", "${message.guild.ownerID}", "", "", "", "");`;
					mysqlcon.query(sql, function (err, result) {
						if (err) throw err;
					});
					sql = `SELECT *
					FROM Guilds
					WHERE guild_id="${message.guild.id}"`;
					mysqlcon.query(sql, function (err, result) {
						if (err) throw err;
						settings = result[0];
						console.log(settings);
						return client.functions.messageEvent(client, message, settings);
					});
				} else {
					settings = result[0];
					return client.functions.messageEvent(client, message, settings);
				}
			});
		} else {
			settings = {
				prefix: "!",
				language: "english",
			};
			return client.functions.messageEvent(client, message, settings);
		}
	}
};
