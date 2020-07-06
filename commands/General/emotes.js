const Command = require("../../base/Command.js");

class emotes extends Command {
    constructor(client) {
        super(client, {
            name: "emotes",
            description: (language) => language.get("EMOTES_DESCRIPTION"),
            usage: (language, prefix) => language.get("EMOTES_USAGE", prefix),
            examples: (language, prefix) => language.get("EMOTES_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "User",
            aliases: ["emojis", "emotes-list", "emojis-list"],
            botPermissions: [],
            nsfw: false,
            adminOnly: false,
            cooldown: 1000,
        });
    }

    async run(message) {
        try {

            const emotes = message.guild.emojis.cache.filter(e => !e.animated).array();
            const anim = message.guild.emojis.cache.filter(e => e.animated).array();

            function generateEmbed(startEmotes, startAnimated) {
                if (startEmotes + 10 > emotes.length) {
                    var current = emotes.slice(startEmotes-10, emotes.length);
                } else {
                    current = emotes.slice(startEmotes, startEmotes + 10);
                }
                if (startAnimated + 10 > anim.length) {
                    var current2 = anim.slice(startAnimated-10, anim.length);
                } else {
                    current2 = anim.slice(startAnimated, startAnimated + 10);
                }
                
                

                const embedFields = []
                const emotesList = current.map(e => `${e}`).join(' ');
                const animatedList = current2.map(e => `${e}`).join(' ');
                embedFields.push({
                    name: message.language.get("EMOTES_TITLES")[0] + ` (${(!emotesList) ? 0 : startEmotes !== 0 ? startEmotes : 1} - ${emotes.length <= 10 ? emotes.length : startEmotes + 10})`,
                    value: (!emotesList) ? message.language.get("EMOTES_NO_EMOTES") : emotesList,
                },
                {
                    name: message.language.get("EMOTES_TITLES")[1] + ` (${(!animatedList) ? 0 : startAnimated !== 0 ? startAnimated : 1} - ${anim.length <= 10 ? anim.length : startAnimated + 10})`,
                    value: (!animatedList) ? message.language.get("EMOTES_NO_ANIMATED") : animatedList,
                }
                )
                const embed = {
                    color: message.config.embed.color,
                    author: {
                        name: message.language.get("EMOTES_TITLE"),
                        icon_url: message.guild.iconURL({ format: "png", dynamic: true })
                    },
                    description: message.language.get("EMOTES_DESC", message),
                    fields: embedFields,
                    timestamp: new Date(),
                    footer: {
                        text: message.config.embed.footer,
                    },
                }
                return embed
            }

            // edit: you can store the message author like this:
            const author = message.author

            // send the embed with the first 10 guilds
            message.channel.send({ embed: generateEmbed(0, 0) }).then(message => {
                // exit if there is only one page of guilds (no need for all of this)
                if (emotes.length <= 10 && anim.length <= 10) return
                // react with the right arrow (so that the user can click it) (left arrow isn't needed because it is the start)
                message.react('➡️')
                const collector = message.createReactionCollector(
                    // only collect left and right arrow reactions from the message author
                    (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
                    /*// time out after a minute
                    { time: 60000 }*/
                )

                let currentIndex = 0;
                let currentIndex2 = 0;
                collector.on('collect', reaction => {
                    // remove the existing reactions
                    message.reactions.removeAll().then(async () => {
                        // increase/decrease index
                        if (reaction.emoji.name === '⬅️') {
                            currentIndex = (currentIndex - 10) < 0 ? currentIndex : currentIndex - 10;
                            currentIndex2 = (currentIndex2 - 10) < 0 ? currentIndex2 : currentIndex2 - 10;
                        } else if (reaction.emoji.name === '➡️') {
                            currentIndex = (currentIndex + 10) > emotes.length ? currentIndex : currentIndex + 10;
                            currentIndex2 = (currentIndex2 + 10) > anim.length ? currentIndex2 : currentIndex2 + 10;
                        }
                        // edit message with new embed
                        message.edit({ embed: generateEmbed(currentIndex, currentIndex2)});
                        // react with left arrow if it isn't the start (await is used so that the right arrow always goes after the left)
                        if (currentIndex !== 0) await message.react('⬅️');
                        // react with right arrow if it isn't the end
                        if (currentIndex + 10 < emotes.length || currentIndex2 + 10 < anim.length) message.react('➡️');
                    })
                })
            })
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = emotes;
