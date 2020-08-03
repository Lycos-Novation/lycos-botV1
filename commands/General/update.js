const Command = require("../../base/Command.js");
const {version} = require("../../package.json");

class Update extends Command {
    constructor(client) {
        super(client, {
            name: "update",
            description: (language) => language.get("GIVEAWAY_DESCRIPTION"),
            usage: (language, prefix) => language.get("GIVEAWAY_USAGE", prefix),
            examples: (language, prefix) => language.get("GIVEAWAY_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "User",
            botPermissions: ["SEND_MESSAGES"],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000,
        });
    }

    async run(message) {
        try {
            //add : 0x1EF121 | update : 0xF5870A | remove : 0xF40C0C
            message.channel.send({
                embed: {
                        color: 0x1EF121,
                        footer: {
                            text: message.config.embed.footer
                        },
                        title: `Notes de mise à jour | Version ${version}`,
                        description: `**•** Ajout de sites dans la commande \`vote\`.
**•** Ajout de la compatibilité du système de musique avec les albums et playlists Spotify.
**•** Ajout de la commande \`spotify\` et \`music-youtube\`.
**•** Ajout de la commande \`update\`.
**•** Ajout des commandes \`lock\` et \`unlock\`.
**•** Ajout des commandes \`voicemute\` et \`unvoicemute\`.`,
                    }
            })
            return message.channel.send({
                embed: {
                        color: 0xF5870A,
                        footer: {
                            text: message.config.embed.footer
                        },
                        title: `Notes de mise à jour | Version ${version}`,
                        description: `**•** Modification des badges dans la commande \`user-info\`.
                        **•** "Correction" du bug sur certains serveurs avec les commandes \`anime\`, \`emotes\` et \`weather\` (Le bot requiert la permission \`MANAGE_MESSAGES\` pour ces commandes).
                        **•** Permissions requises pour chaque commande revues.
                        **•** Amélioration de la précision des recherches de la commande \`wiki\`.
                        **•** Correction des commandes de musique qui pouvaient être effectuées sans être dans le salon vocal où est le bot`,
                    }
            })
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = Update;
