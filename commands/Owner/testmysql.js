const Command = require("../../base/Command.js");

class testMySQL extends Command {
	constructor(client) {
		super(client, {
			name: "testmysql",
			description: (language) => language.get("ANSWER_DESCRIPTION"),
			usage: (language, prefix) => language.get("ANSWER_USAGE", prefix),
			examples: (language, prefix) => language.get("ANSWER_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "Bot Admin",
			aliases: ['test'],
			botPermissions: ["EMBED_LINKS"],
			nsfw: false,
			cooldown: 30000,
		});
	}

	async run(message, args) {
		try {
            /*var sql = `CREATE TABLE Users (
    			user_name VARCHAR(32) NOT NULL,
				user_id UNSIGNED BIGINT NOT NULL,
				user_discriminator CHAR(4) NOT NULL,
				user_verified BOOLEAN NOT NULL,
				user_email TEXT,
				user_locale VARCHAR(32),
				user_createdAt DATETIME
			)
			ENGINE=INNODB;`;*/
			var sql = `SELECT *
					   FROM Guilds
					   WHERE guild_id="${message.guild.id}"`;
			var g;
			mysqlcon.query(sql, async function (err, result, fields) {
				g = result[0];
				var emote = args[0];
				message.channel.send(`${g.test} | ${emote}`);
				if (emote === `${g.test}`) return message.channel.send("Oui");
				else return message.channel.send("Non");
			});
            /*return mysqlcon.query(sql, function (err, result) {
                if (err) throw err;
                console.log("Table created");
			});*/
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = testMySQL;
