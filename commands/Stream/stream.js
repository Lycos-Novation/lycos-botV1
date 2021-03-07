const Command = require('../../base/Command');
const fetch = require("node-fetch");
const TwitchClient = require('twitch').default;
const config = require('../../config')
const twitchClient = TwitchClient.withClientCredentials(config.twitch.clientID, config.twitch.secret);
class stream extends Command {
    constructor(client) {
        super(client, {
            name: 'stream',
            description: (language) => language.get("STREAM_DESCRIPTION"),
            usage: (language, prefix) => language.get("STREAM_USAGE", prefix),
            examples: (language, prefix) => language.get("STREAM_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "Server Admin",
            botPermissions: ["SEND_MESSAGES"],
            aliases: [],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000
        });
    }

    async run(message, args) {
        try {
            var sql = `SELECT *
		FROM Guilds
		WHERE guild_id="${message.guild.id}"`;
            var g;
            mysqlcon.query(sql, async function (err, result, fields) {
                if (err) throw err;
                g = result[0];
                var ar = g.streamers_ids, ids = [];
                sql = `SELECT *
		FROM Guilds
        WHERE guild_id="697368051405815860"`;
                var stock_guild;
                mysqlcon.query(sql, async function (err, result, fields) {
                    if (err) throw err;
                    stock_guild = result[0];
                    var stock_array = stock_guild.stream_check;
                    var method = args[0];
                    if (!method) {
                        await message.channel.send(message.language.get("STREAM_NO_METHOD")+"\n"+message.language.get("COMMAND_CANCEL"));
                        method = await message.bot.functions.awaitResponse(message);
                    }
                    if (method.startsWith(g.prefix)) return;
                    if (method.toLowerCase() === "stop" || method.toLowerCase() === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
                    if (method.toLowerCase() !== "add" && method.toLowerCase() !== "remove" && method.toLowerCase() !== "list") return message.channel.send(message.language.get("STREAM_BAD_METHOD"));
                    if (method.toLowerCase() === "list") {
                        var text = "";
                        if (ar === ""){
                            text = message.language.get("STREAM_NO_STREAMER_IN");
                        } else if (ar.split("/").length < 1){
                            var user = await twitchClient.helix.users.getUserById(ar);
                            text = `**•** ${user._data.display_name} (${user._data.login} - ${user._data.id})`;
                        } else {
                            const ar_ids = ar.split("/");
                            for (var i = 0; i < ar.split("/").length; i++) {
                                var user = await twitchClient.helix.users.getUserById(ar_ids[i]);
                                if (text === ""){
                                    text = `**•** ${user._data.display_name} (${user._data.login} - ${user._data.id})`;
                                } else {
                                    text = text + `\n**•** ${user._data.display_name} (${user._data.login} - ${user._data.id})`
                                }
                            }
                        }
                        return message.channel.send({
                            embed: {
                                title: message.language.get("STREAM_LIST_TITLE"),
                                description: text,
                                color: 0x6441a5,
                            }
                        })
                    }
                    if (g.twitch_channel === null) return message.channel.send(message.language.get("STREAM_NO_CHANNEL"));
                    var user = args.slice(1).join(" ");
                    if (!user) {
                        await message.channel.send(message.language.get("STREAM_NO_STREAMER")+"\n"+message.language.get("COMMAND_CANCEL"));
                        user = await message.bot.functions.awaitResponse(message);
                    }
                    if (user.startsWith(g.prefix)) return;
                    if (user.toLowerCase() === "stop" || user.toLowerCase() === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
                    const url = `https://api.twitch.tv/kraken/users?login=${user.toLowerCase()}`;
                    const options = {
                        headers: {
                            "Accept": "application/vnd.twitchtv.v5+json",
                            "Client-ID": clientId
                        }
                    };
                    fetch(url, options)
                        .then(res => res.json())
                        .then(data => {
                            try {
                                if (data._total === 0) return message.channel.send(message.language.get("STREAM_NO_STREAMER_FOUND"));
                                if (method.toLowerCase() === 'add') {
                                    if (ar.split("/").length === 4) return message.channel.send(message.language.get("STREAM_LIMIT_REACHED"));
                                    if (ar.split("/").indexOf(data.users[0]._id) !== -1) return message.channel.send(message.language.get("STREAM_STREAMER_ALREADY_IN"));
                                    if (ar.split("/").length > 1 || ar !== "") {
                                        mysqlcon.query("UPDATE Guilds SET streamers_ids = ? WHERE guild_id = ?", [g.streamers_ids + "/" + data.users[0]._id, message.guild.id]);
                                    } else {
                                        mysqlcon.query("UPDATE Guilds SET streamers_ids = ? WHERE guild_id = ?", [g.streamers_ids + data.users[0]._id, message.guild.id]);
                                    }
                                    if (stock_array.split("/").length > 1 || stock_array !== "") {
                                        if (stock_array.split("/").indexOf(data.users[0]._id) === -1) {
                                            mysqlcon.query("UPDATE Guilds SET stream_check = ? WHERE guild_id = ?", [stock_array + "/" + data.users[0]._id, "697368051405815860"]);
                                        }
                                        mysqlcon.query(`INSERT INTO Streams (streamer, title, game) VALUES (${data.users[0]._id}, null, null)`);
                                    } else {
                                        mysqlcon.query("UPDATE Guilds SET stream_check = ? WHERE guild_id = ?", [stock_array + data.users[0]._id, "697368051405815860"]);
                                        mysqlcon.query(`INSERT INTO Streams (streamer, title, game) VALUES (${data.users[0]._id}, null, null)`);
                                    }
                                    return message.channel.send(message.language.get("STREAM_ADDED", data.users[0].display_name, data.users[0].name, data.users[0]._id));
                                } else if (method.toLowerCase() === 'remove') {
                                    if (ar.split("/").indexOf(data.users[0]._id) === -1) return message.channel.send(message.language.get("STREAM_STREAMER_NOT_IN"));
                                    if (ar.split("/").length > 1) {
                                        for (var i = 0; i < ar.split("/").length; i++) {
                                            if (ar.split("/")[i] !== data.users[0]._id) {
                                                ids.push(ar.split("/")[i])
                                            }
                                        }
                                        let envoi = ids.join("/");
                                        mysqlcon.query(`UPDATE Guilds SET streamers_ids = ? WHERE guild_id = ?`, [envoi, message.guild.id]);
                                    } else {
                                        mysqlcon.query("UPDATE Guilds SET streamers_ids = ? WHERE guild_id = ?", ["", message.guild.id]);
                                    }
                                    return message.channel.send(message.language.get("STREAM_REMOVED", data.users[0].display_name, data.users[0].name, data.users[0]._id));
                                } 
                            } catch (error) {
                                console.error(error);
                                return message.channel.send(message.language.get("ERROR", error));
                            }
                            
                        });
                });
            });
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}
module.exports = stream;