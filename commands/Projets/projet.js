const Command = require("../../base/Command.js");
class Projet extends Command {
    constructor(client) {
        super(client, {
            name: "projet",
            description: (language) => language.get("PROJET_DESCRIPTION"),
            usage: (language, prefix) => language.get("PROJET_USAGE", prefix),
            examples: (language, prefix) => language.get("PROJET_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: [],
            permLevel: "Bot Support",
            botPermissions: ["SEND_MESSAGE"],
            cooldown: 1000,
        });
    }

    async run(message, args) {
        try {
            if(!args[0]){
               return message.channel.send({
                   embed: {
                       color: message.config.embed.color,
                       author: {
                           name: message.language.get("PROJECT_TITLE", message.author.tag),
                           icon_url: message.bot.user.displayAvatarURL
                       },
                       footer: {
                           text: message.config.embed.footer
                       },
                       description: message.language.get("PROJECT_DESC", message.settings.prefix),
                   }
               })
            }
            if(args[0] === 'create'){
                await create(message);
            }

        } catch(error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error))

        }


        async function create(message) {
            let mID = message.author.id;
            let mess = message;
            await message.channel.send("Répondez avec le nom de votre projet");
            const responseFilter = m => m.author.id === mID;
            const response = await message.channel.awaitMessages(responseFilter, {max: 1})
                .then();
            const name = response.first().content;
            if(name.toLowerCase() === "stop"){
                return message.channel.send("Création de projet annulée.");
            }
            await message.channel.send(`Vous avez choisi \`\`${name}\`\` comme nom de projet. Validez ce nom avec les réactions ci dessous.`)
                .then(async (msg) => {
                    await msg.react("✅");
                    await msg.react("❌");
                    // On attend que la personne réagisse
                    const filter = (reaction, user) => user.id === mID;//const filter = (reaction, user) => reaction.emoji.name === "✅" || reaction.emoji.name === "❌" && user.id === mID;
                    const collector = msg.createReactionCollector(filter, {
                        max: 1,
                        maxUsers: 1
                    });
                    collector.on('collect', async(r) => {
                        console.log(r.emoji.name);
                        if (r.emoji.name === "✅"){
                            await message.channel.send(`Nom confirmé : ${name}`);
                            const newProject = {
                                name: name,
                                lead: mess.author.tag
                            };
                            await message.bot.functions.createProject(newProject);
                        }
                        if (r.emoji.name === "❌"){
                            await message.channel.send("Annulation...");
                            return create(mess)
                        }
                    });
                });
        }
    }
}
module.exports = Projet;