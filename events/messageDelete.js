const config = require('../config');
module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(message) {
		if (message.channel.type === 'dm' || message.author.bot || message.content.indexOf('.') === 0) return;
		var sql = `SELECT *
		FROM Guilds
		WHERE guild_id="${message.guild.id}"`;
		var g;
		mysqlcon.query(sql, async function (err, result, fields) {
			g = result[0];
			if (g.logs_channel === null) return;
			const lang = new (require(`../languages/${g.language}.js`));
			const fetchedLogs = await message.guild.fetchAuditLogs({
				limit: 1,
				type: 'MESSAGE_DELETE',
			});
			// Since we only have 1 audit log entry in this collection, we can simply grab the first one
			const deletionLog = fetchedLogs.entries.first();

			// Let's perform a sanity check here and make sure we got *something*
			if (!deletionLog) {
				var deletedBy = lang.get("LOGS_MESSAGE_DELETE_DELETED_BY_UNKNOWN");
			}

			// We now grab the user object of the person who deleted the message
			// Let us also grab the target of this action to double check things
			const { executor, target } = deletionLog;


			// And now we can update our output with a bit more information
			// We will also run a check to make sure the log we got was for the same author's message
			if (target.id === message.author.id) {
				deletedBy = `${lang.get("LOGS_MESSAGE_DELETE_DELETED_BY")} ${executor.tag} - ${executor} - ${executor.id}`;
			} else {
				deletedBy = lang.get("LOGS_MESSAGE_DELETE_DELETED_BY_UNKNOWN");
			}
			return message.guild.channels.cache.find(c => c.id === g.logs_channel).send({
				embed: {
					title: lang.get(`LOGS_MESSAGE_DELETE_TITLE`),
					description: lang.get('LOGS_MESSAGE_DELETE_DESC', message, deletedBy),
					footer: {
						text: config.embed.footer,
					},
					/*image: {
						url: message.attachments.size <= 0 ? message.attachments.first().url : null
					},*/
					color: 0xDB0808,
				}
			});
		});
	}
};
