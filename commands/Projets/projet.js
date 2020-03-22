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
                           name: "Gestionnaire de projet",
                           icon_url: message.bot.user.displayAvatarURL
                       },
                       footer: {
                           text: message.config.embed.footer
                       },
                       description: `\`\`${message.config.prefix}projet create\`\` : Crée un projet.
                       \`\`${message.config.prefix}projet delete\`\` : Supprime un projet.
                       \`\`${message.config.prefix}projet member\`\` : Permet de gérer les membres d'un projet.
                       \`\`${message.config.prefix}projet task\`\` : Permet de gérer les tâches du projet.
                       \`\`${message.config.prefix}projet [NomDeProjet]\`\` : Affiche un récap du projet.
                       \`\`${message.config.prefix}projet change\`\` : Permet de modifier les éléments du projet.
                       \`\`${message.config.prefix}projet list\`\` : Affiche la liste des projets.`,
                   }
               })
            }
            let projet = await message.bot.functions.getProject(args.slice(0).join(" "));
            if(projet.name === args.slice(0).join(" ")){
                /*return message.channel.send({
                    embed: {
                        color: message.config.embed.color,
                        author: {
                            name: `Fiche du projet ${project.name}`,
                            icon_url: message.bot.user.displayAvatarURL
                        },
                        footer: {
                            text: message.config.embed.footer
                        },
                        description: ``,
                    }
                })*/
                //Faire système de pages avec réactions.
            }
            if(args[0] === 'create'){
                return await create(message);
            }
            if(args[0] === 'delete'){
                return await del(message)
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
            if(name.toLowerCase() === "create" || name.toLowerCase() === "delete" || name.toLowerCase() === "member" || name.toLowerCase() === "task" || name.toLowerCase() === "[nomdeprojet]" || name.toLowerCase() === "change" || name.toLowerCase() === "list"){
                return message.channel.send("Vous ne pouvez pas nommer votre projet ainsi. Veuillez en choisir un autre.")
            }
            message.channel.send(`Vous avez choisi \`\`${name}\`\` comme nom de projet. Validez ce nom avec les réactions ci dessous.`)
                .then(async (msg) => {
                    await msg.react("✅");
                    await msg.react("❌");
                    // On attend que la personne réagisse
                    const filter = (reaction, user) => user.id === mID;
                    const collector = msg.createReactionCollector(filter, {
                        max: 1,
                        maxUsers: 1
                    });
                    collector.on('collect', async(r) => {
                        console.log(r.emoji.name);
                        if (r.emoji.name === "✅"){
                            await message.channel.send(`Projet \`\`${name}\`\` créé.`);
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

        async function del(message){
            await message.channel.send("Répondez avec le nom du projet à supprimer");
            const responseFilter = m => m.author.id === mID;
            const response = await message.channel.awaitMessages(responseFilter, {max: 1})
                .then();
            const name = response.first().content;
            if(name === "stop"){
                return message.channel.send("Commande annulée");
            }
            let projet = message.bot.functions.getProject(name);
            if(name !== projet.name){
                return message.channel.send("Projet introuvable, vérifiez le nom du projet et réessayez");
            }
            if(message.author !== projet.lead){
                return message.channel.send("Vous n'êtes pas le Lead Project de ce projet !");
            }
            message.channel.send(`Vous avez choisi le projet \`\`${name}\`\`. Êtes-vous sûr de vouloir supprimer ce projet ?
            ⚠️ **__Cette action est définitive et irréversible ! En cliquant sur ✅, vous supprimerez ce projet, il sera impossible de le récupérer.__**
            Pour annuler la commande cliquez sur ❌.`)
            .then(async (msg) => {
                await msg.react("✅");
                await msg.react("❌");
                // On attend que la personne réagisse
                const filter = (reaction, user) => user.id === mID;
                const collector = msg.createReactionCollector(filter, {
                    max: 1,
                    maxUsers: 1
                });
                collector.on('collect', async(r) => {
                    console.log(r.emoji.name);
                    if (r.emoji.name === "✅"){
                        await message.channel.send(`Projet \`\`${name}\`\` supprimé.`);
                        const newProject = {
                            name: name,
                            lead: mess.author.tag
                        };
                        await message.bot.functions.createProject(newProject);
                    }
                    if (r.emoji.name === "❌"){
                        return message.channel.send("Commande annulée");
                    }
                });
            });
        }
    }
}
module.exports = Projet;