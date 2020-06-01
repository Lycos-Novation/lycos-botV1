const { Emoji, MessageReaction } = require('discord.js');

const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove'
};

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(event) {
        try {
            if (!Object.hasOwnProperty.call(events, event.t)) return;

            const { d: data } = event;
            const lycos_id = this.client.user.id;
            const user = this.client.users.cache.get(data.user_id);
            const channel = this.client.channels.cache.get(data.channel_id);

            const message = await channel.messages.fetch(data.message_id);
            const member = message.guild.members.cache.get(user.id);

            var sql = `SELECT *
        FROM Guilds
        WHERE guild_id="${message.guild.id}"`;
            var g;
            mysqlcon.query(sql, async function (err, result, fields) {
                g = result[0];
                const lang = new (require(`../languages/${g.language}.js`));
                if (member.id !== lycos_id) {
                    var rre = `${g.rolereaction_emotes}`;
                    if (event.t === 'MESSAGE_REACTION_ADD') {
                        if (channel.id !== g.rolereaction_channel) return;
                        if (rre.indexOf(data.emoji.id) !== -1 || rre.indexOf(data.emoji.name) !== -1 ) {
                            const emotes_split = rre.split("/");
                            var number = emotes_split.indexOf(`${data.emoji.name}`);
                            if (number === -1) {
                                number = emotes_split.indexOf(`<:${data.emoji.name}:${data.emoji.id}>`) !== -1 ? emotes_split.indexOf(`<:${data.emoji.name}:${data.emoji.id}>`) : emotes_split.indexOf(`<a:${data.emoji.name}:${data.emoji.id}>`);
                            }
                            const role_id = g.rolereaction_roles.split("/")[number];
                            const role = message.guild.roles.cache.get(role_id);
                            member.roles.add(role, 'Reaction role').catch((error) => console.error(error));
                            member.send(lang.get(`RR_ADD_USER`, message.guild, role)).catch((error) => console.error(error));
                        }
                    }
                    if (event.t === 'MESSAGE_REACTION_REMOVE') {
                        if (channel.id !== g.rolereaction_channel) return;
                        if (rre.indexOf(data.emoji.id) !== -1 || rre.indexOf(data.emoji.name) !== -1 ) {
                            const emotes_split = rre.split("/");
                            var number = emotes_split.indexOf(`${data.emoji.name}`);
                            if (number === -1) {
                                number = emotes_split.indexOf(`<:${data.emoji.name}:${data.emoji.id}>`) !== -1 ? emotes_split.indexOf(`<:${data.emoji.name}:${data.emoji.id}>`) : emotes_split.indexOf(`<a:${data.emoji.name}:${data.emoji.id}>`);
                            }
                            const role_id = g.rolereaction_roles.split("/")[number];
                            const role = message.guild.roles.cache.get(role_id);
                            member.roles.remove(role, 'Reaction Role').catch((error) => console.error(error));
                            member.send(lang.get(`RR_REMOVE_USER`, message.guild, role)).catch((error) => console.error(error));
                        }
                    }
                }
            });
        } catch (error) {
            console.error(error);
        }

    }
};