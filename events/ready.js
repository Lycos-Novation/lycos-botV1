module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run() {
        try {
            const TwitchClient = require('twitch').default;
            const clientId = 'TwitchClientID';
            const clientSecret = 'TwitchClientSecret';
            const twitchClient = TwitchClient.withClientCredentials(clientId, clientSecret);
            const client = this.client;
            // If the token isn't a bot token the bot will logout.
            if (!client.user.bot) {
                return process.exit(1);
            }
            // Logs some information using the logger file
            console.log(`[Commands] - Loading a total of ${client.commands.size} command(s).`);
            var guilds = client.shard ? await client.shard.broadcastEval("this.guilds.cache.size") : client.guilds.cache.size;
            if (guilds instanceof Array) {
                guilds = guilds.reduce((sum, val) => sum + val, 0);
            }
            client.logger.log(`${client.user.tag}. On ${guilds} server(s) divided in ${client.shard.count} shards.`, "ready");

            // Update the game every 20s
            const games = [
                {
                    name: `${client.config.prefix}help`,
                    type: "STREAMING",
                },
                {
                    name: `add me with ${client.config.prefix}invite!`,
                    type: "STREAMING",
                },
            ];
            let i = 0;

            setInterval(async function () {
                try {
                    await client.user.setPresence({
                        activity: {
                            name: games[parseInt(i, 10)].name,
                            type: games[parseInt(i, 10)].type,
                        }, status: "dnd",
                    });
                    if (games[parseInt(i + 1)]) { i++; }
                    else { i = 0; }
                } catch (error) {
                    return console.log(error);
                }

            }, 35000);
            client.connection_mysql = require('../utils/connectmysql');
            client.connection_mysql.init();

            async function isStreamLive(id) {
                const user = await twitchClient.helix.users.getUserById(id);
                if (!user) {
                    return false;
                }
                const s = await user.getStream();
                if (s !== null) return s;
                else return false;
            }

            setInterval(async () => {
                try {
                    var sql = `SELECT *
                               FROM Guilds
                               WHERE guild_id="697368051405815860"`;
                    mysqlcon.query(sql, async function (err, res, fields) {
                        if (err) throw err;
                        var ids = res[0].stream_check.split("/");
                        for (let i = 0; i < ids.length; i++) {
                            const userId = ids[i];
                            const stream = await isStreamLive(userId);
                            if (stream !== false) {
                                var user = await twitchClient.helix.users.getUserById(userId);
                                var game = await twitchClient.helix.games.getGameById(stream._data.game_id);
                                sql = `SELECT *
						       FROM Streams
							   WHERE streamer='${userId}'`;
                                mysqlcon.query(sql, async function (err, r) {
                                    if (err) throw err;
                                    if ((r[0].title === null ? r[0].title : r[0].title.toString()) !== stream._data.title) {
                                        await mysqlcon.query("UPDATE Streams SET title = ? WHERE streamer = ?", [stream._data.title, userId]);
                                        if (r[0].state !== 0) {
                                            sql = `SELECT *
									               FROM Guilds
									               WHERE streamers_ids LIKE '%${userId}%'`;
                                            mysqlcon.query(sql, async function (err, result) {
                                                if (err) throw err;
                                                for (let index = 0; index < result.length; index++) {
                                                    var element = result[index].twitch_channel;
                                                    var language = new (require(`../languages/${result[index].language}.js`));
                                                    if (element !== null) {
                                                        client.channels.cache.get(element).send(language.get("STREAM_TITLE_CHANGED", stream._data.user_name, stream._data.title));
                                                    }
                                                }
                                            });
                                        }
                                        return;
                                    }
                                    if (r[0].game !== game._data.id) {
                                        await mysqlcon.query("UPDATE Streams SET game = ? WHERE streamer = ?", [game._data.id, userId]);
                                        if (r[0].state !== 0) {
                                            var oldGame = await twitchClient.helix.games.getGameById(r[0].game);
                                            sql = `SELECT *
									               FROM Guilds
									               WHERE streamers_ids LIKE '%${userId}%'`;
                                            mysqlcon.query(sql, async function (err, result) {
                                                if (err) throw err;
                                                for (let index = 0; index < result.length; index++) {
                                                    var element = result[index].twitch_channel;
                                                    var language = new (require(`../languages/${result[index].language}.js`));
                                                    if (element !== null) {
                                                        client.channels.cache.get(element).send(language.get("STREAM_GAME_CHANGED", stream._data.user_name, oldGame._data.name, game._data.name));
                                                    }
                                                }
                                            });
                                        }
                                        return;
                                    }
                                    if (r[0].state === 0) {
                                        mysqlcon.query("UPDATE Streams SET state = ? WHERE streamer = ?", [true, userId]);
                                        sql = `SELECT *
									   FROM Guilds
									   WHERE streamers_ids LIKE '%${userId}%'`;
                                        mysqlcon.query(sql, async function (err, result) {
                                            if (err) throw err;
                                            for (let index = 0; index < result.length; index++) {
                                                var element = result[index].twitch_channel;
                                                if (element !== null) {
                                                    var language = new (require(`../languages/${result[index].language}.js`));
                                                    client.channels.cache.get(element).send(result[index].stream_annonce.toString('utf-8').replace("{streamer}", `${stream._data.user_name}`));
                                                    client.channels.cache.get(element).send({
                                                        embed: {
                                                            author: {
                                                                name: stream._data.user_name,
                                                                icon_url: user._data.profile_image_url,
                                                            },
                                                            title: stream._data.title,
                                                            url: `https://twitch.tv/${stream._data.user_name.toLowerCase()}`,
                                                            fields: [
                                                                {
                                                                    name: language.get("STREAM_EMBED_TITLES")[0],
                                                                    value: game === null ? language.get("STREAM_NO_GAME") : game._data.name,
                                                                    inline: true
                                                                },
                                                                {
                                                                    name: language.get("STREAM_EMBED_TITLES")[1],
                                                                    value: stream._data.viewer_count,
                                                                    inline: true
                                                                },
                                                                {
                                                                    name: language.get("STREAM_EMBED_TITLES")[2],
                                                                    value: language.get("STREAM_STARTEDAT", stream._data.started_at),
                                                                },
                                                            ],
                                                            /*video: {
                                                                height: 378,
                                                                url: `https://player.twitch.tv/?channel=leptitmetalleux&player=facebook&autoplay=true&parent=meta.tag`,
                                                                width: 620,
                                                            },*/
                                                            image: {
                                                                url: stream._data.thumbnail_url.toString().replace("{width}", "1980").replace("{height}", "1080"),
                                                                width: 1920,
                                                                height: 1080,
                                                            },
                                                            color: 0x6441a5,
                                                            thumbnail: {
                                                                url: game === null ? null : game._data.box_art_url.toString().replace("{width}", "188").replace("{height}", "250"),
                                                                width: 188,
                                                                height: 250,
                                                            },
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                });
                            } else {
                                sql = `SELECT *
							   FROM Streams
							   WHERE streamer='${userId}'`;
                                mysqlcon.query(sql, async function (err, res) {
                                    if (err) throw err;
                                    if (res[0].state === 1) {
                                        mysqlcon.query("UPDATE Streams SET state = ? WHERE streamer = ?", [false, userId]);
                                        var user = await twitchClient.helix.users.getUserById(userId);
                                        sql = `SELECT *
									   FROM Guilds
									   WHERE streamers_ids LIKE '%${userId}%'`;
                                        mysqlcon.query(sql, async function (err, result) {
                                            if (err) throw err;
                                            for (let index = 0; index < result.length; index++) {
                                                var element = result[index].twitch_channel;
                                                var language = new (require(`../languages/${result[index].language}.js`));
                                                if (element !== null) client.channels.cache.get(element).send(language.get("STREAM_ENDED", user._data.display_name));
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    })
                } catch (error) {
                    return console.error(error);
                }

            }, 60000);

        } catch (error) {
            return console.log(error);
        }

    }
};