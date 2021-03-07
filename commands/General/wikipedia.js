const Command = require("../../base/Command.js");
const wiki = require('wikijs').default;
const fetch = require("node-fetch");
class Wikipedia extends Command {
    constructor(client) {
        super(client, {
            name: "wikipedia",
            description: (language) => language.get("WIKIPEDIA_DESCRIPTION"),
            usage: (language, prefix) => language.get("WIKIPEDIA_USAGE", prefix),
            examples: (language, prefix) => language.get("WIKIPEDIA_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            permLevel: "User",
            botPermissions: ["SEND_MESSAGES"],
            aliases: ["wiki", "wikipédia"],
            nsfw: false,
            adminOnly: false,
            cooldown: 5000,
        });
    }

    run(message, args) {
        try {
            let search = args.slice(0).join(" ");//!wiki La langue française => args = [La,langue,française] => search = La langue française
            if (!search) return message.channel.send(message.language.get("WIKI_NO_SEARCH"));
            const lang = message.settings.language === "english" ? "en" : "fr";
                fetch(`https://${lang}.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${encodeURIComponent(search)}`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.query.search[0] === undefined) return message.channel.send(message.language.get('WIKI_NOT_FOUND'));
                        wiki({ apiUrl: `http://${lang}.wikipedia.org/w/api.php` })
                            .page(data.query.search[0].title)
                            .then(async (page) => {
                                const info = page;
                                const p = await page.rawContent();
                                return message.channel.send({
                                    embed: {
                                        title: info.raw.title,
                                        url: info.raw.fullurl,
                                        description: (p.indexOf("=") || p.length) > 2047 ? p.substring(0, p.indexOf("=") > 2044 ? 2044 : p.indexOf("=")) + "..." : p.substring(0, p.indexOf("=")),
                                        footer: {
                                            text: `ID : ${info.raw.pageid}`
                                        },
                                    }
                                })
                            })
                            .catch(e => {
                                return message.channel.send(message.language.get("WIKI_ERROR", e));
                            });
                    })
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = Wikipedia;