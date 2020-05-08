const Command = require("../../base/Command.js");
//const {Project} = require('../../models');
const moment = require("moment-timezone");
moment.locale('fr');
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
            aliases: ["project"],
            botPermissions: ["SEND_MESSAGE"],
            cooldown: 1000,
        });
    }

    async run(message, args) {/*
        try {
            if(message.guild.id !== "627946609896062986") return;
            if (args[0] === 'list'){
                const cursor = await Project.find({});
                var text = "";
                if(cursor.length === 0) {
                    text = "• Il n'y a aucun projet en cours.";
                } else {
                    text = "• " + cursor[0].name;
                    for (let index = 1; index < cursor.length; index++) {
                        const element = cursor[index].name;
                        text = text + "\n• " + element;
                    }
                }
                return message.channel.send({
                    embed: {
                        color: message.config.embed.color,
                        author: {
                            name: `Liste des projets`,
                            icon_url: message.bot.user.displayAvatarURL
                        },
                        footer: {
                            text: message.config.embed.footer
                        },
                        description: `\`\`${text}\`\``,
                    }
                });
            }
            let projet = await message.bot.functions.getProject(args.slice(0).join(" "));
            if(projet.name === args.slice(0).join(" ")){
                let projtasks = projet.tasks;
                if(projtasks.length === 1 || projet.done.lenght === 1) {
                    var per = 0;
                    var ttext = projtasks[0]
                } else {
                    per = (projet.done.length-1)/(projet.done.length + projtasks.length)*100;
                    ttext = "\n• " + projtasks[1];
                    for (let index = 2; index < projtasks.length; index++) {
                        const element = projtasks[index];
                        ttext = ttext + "\n• " + element;
                    }
                }
                let projmembers = projet.members;
                var mtext = "";
                if(projmembers.length === 1) {
                    mtext = projmembers[0];
                } else {
                    mtext = "\n• <@!" + projmembers[1] + ">";
                    for (let index = 2; index < projmembers.length; index++) {
                        const element = projmembers[index];
                        mtext = mtext + "\n• <@!" + element + ">";
                    }
                }
                return message.channel.send({
                    embed: {
                        color: message.config.embed.color,
                        footer: {
                            text: message.config.embed.footer + ` - ID du projet : ${projet._id}`
                        },
                        description: `**__Fiche de projet__** | ${projet.name}

**Chef de projet :** <@!${projet.lead}>
**Description du projet :** ${projet.desc}
**Membres du projet :** ${mtext}
**Avancement :** ${per}% (${projet.done.length - 1} tâches terminées/${projet.done.length + projet.tasks.length - 2} tâches)
**Créé le :** ${moment(projet.date.toUTCString()).format("LL")} (${message.bot.functions.checkDays(projet.date)}
**Tâches en cours :** ${ttext}`,
                    },
                    split: true
                })
            }
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
            if(args[0] === 'create'){
                return await create(message);
            }
            if(args[0] === 'delete'){
                return await del(message);
            }
            if(args[0] === 'member'){
                return await member(message);
            }
            if(args[0] === 'task'){
                return await task(message);
            }
            if(args[0] === "change"){
                return await change(message);
            }

        } catch(error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error))

        }


        async function create(message) {
            let mess = message;
            await message.channel.send("Répondez avec le nom de votre projet");
            var name = await awaitResponse(message);
            if(name.toLowerCase() === "stop"){
                return message.channel.send("Création de projet annulée.");
            }
            if(name.toLowerCase() === "create" || name.toLowerCase() === "delete" || name.toLowerCase() === "member" || name.toLowerCase() === "task" || name.toLowerCase() === "[nomdeprojet]" || name.toLowerCase() === "change" || name.toLowerCase() === "list"){
                await create(message);
                return message.channel.send("Ce nom est réservé pour autre chose. Veuillez en choisir un autre.");
            }
            let projet = await message.bot.functions.getProject(name);
            if(name === projet.name){
                await create(message);
                return message.channel.send("Ce nom est dejà utilisé par un autre projet. Veuillez en choisir un autre.");
            }
            message.channel.send(`Vous avez choisi \`\`${name}\`\` comme nom de projet. Validez ce nom avec les réactions ci dessous.`)
                .then(async (msg) => {
                    await msg.react("✅");
                    await msg.react("❌");
                    // On attend que la personne réagisse
                    const filter = (reaction, user) => user.id === message.author.id;
                    var collector = msg.createReactionCollector(filter, {
                        max: 1,
                        maxUsers: 1
                    });
                    collector.on('collect', async(r) => {
                        console.log(r.emoji.name);
                        if (r.emoji.name === "✅"){
                            let code = message.bot.functions.makeid(30);
                            message.guild.members.cache.find(m => m.id === '169146903462805504').send(`${message.author} veut créer le projet \`\`${name}\`\`. Veuillez lui transmettre le code de validation suivant : ||\`\`${code}\`\`||`);
                            //console.log(code);
                            await message.channel.send(`Un code de validation a été envoyé à ${message.guild.members.cache.find(m => m.id === '169146903462805504')}, veuillez lui demander et répondre par celui-ci.`);
                            var rcode = await awaitResponse(message);
                            if(rcode.toLowerCase() === "stop"){
                                return message.channel.send("Création de projet annulée.");
                            }
                            message.channel.send(`Vous avez saisi le code suivant : \`\`${rcode}\`\`. Validez le avec les réactions ci-dessous.`)
                            .then(async (msg) => {
                            await msg.react("✅");
                            await msg.react("❌");
                            // On attend que la personne réagisse
                            collector = msg.createReactionCollector(filter, {
                                max: 1,
                                maxUsers: 1
                            });
                            collector.on('collect', async(r) => {
                                console.log(r.emoji.name);
                                if (r.emoji.name === "✅"){
                                    if(code !== rcode) return message.channel.send("Le code entré n'est pas le bon. Veuillez réessayer.");
                                    const newProject = {
                                        name: name,
                                        lead: mess.author.id
                                    };
                                    await message.bot.functions.createProject(newProject);
                                    return message.channel.send(`Projet \`\`${name}\`\` créé.`);
                                }
                                if (r.emoji.name === "❌"){
                                    await message.channel.send("Annulation...");
                                    return create(mess)
                                }
                            });
                    });
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
            let name = await awaitResponse(message);
            if(name === "stop"){
                return message.channel.send("Commande annulée");
            }
            let projet = await message.bot.functions.getProject(name);
            if(name !== projet.name){
                return message.channel.send("Projet introuvable, vérifiez le nom du projet et réessayez");
            }
            if(message.author.id !== projet.lead && message.author.id !== '169146903462805504' && projet.members.indexOf(message.author.id) === -1){
                return message.channel.send("Vous n'êtes pas un membre du projet !");
            }
            message.channel.send(`Vous avez choisi le projet \`\`${name}\`\`. Êtes-vous sûr de vouloir supprimer ce projet ?
⚠️ **__Cette action est définitive et irréversible ! En cliquant sur ✅, vous supprimerez ce projet, il sera impossible de le récupérer.__**
Pour annuler la commande cliquez sur ❌.`)
            .then(async (msg) => {
                await msg.react("✅");
                await msg.react("❌");
                // On attend que la personne réagisse
                const filter = (reaction, user) => user.id === message.author.id;
                const collector = msg.createReactionCollector(filter, {
                    max: 1,
                    maxUsers: 1
                });
                collector.on('collect', async(r) => {
                    console.log(r.emoji.name);
                    if (r.emoji.name === "✅"){
                        message.bot.functions.delProject(name);
                        await message.channel.send(`Projet \`\`${name}\`\` supprimé.`);
                    }
                    if (r.emoji.name === "❌"){
                        return message.channel.send("Commande annulée");
                    }
                });
            });
        }

        async function member(message){
            await message.channel.send("Répondez avec le nom du projet à modifier");
            let name = await awaitResponse(message);
            if(name === "stop"){
                return message.channel.send("Commande annulée");
            }
            let projet = await message.bot.functions.getProject(name);
            if(name !== projet.name){
                return message.channel.send("Projet introuvable, vérifiez le nom du projet et réessayez");
            }
            if(message.author.id !== projet.lead && message.author.id !== '169146903462805504' && projet.members.indexOf(message.author.id) === -1){
                return message.channel.send("Vous n'êtes pas un membre du projet !");
            }
            await message.channel.send("Que voulez vous faire ? Répondez avec \`\`add\`\` ou \`\`remove\`\`");
            let method = await awaitResponse(message);
            if(method === "stop"){
                return message.channel.send("Commande annulée");
            }
            if(method === "add"){
                await message.channel.send("Quel membre voulez-vous ajouter au projet ? Répondez avec son ID.");
                let response = await awaitResponse(message);
                if(response.toLowerCase() === "stop"){
                    return message.channel.send("Création de projet annulée.");
                }
                let member = message.guild.member(message.guild.members.resolve(response) || message.guild.members.resolveID(response));
                message.channel.send(`Êtes-vous sûr de vouloir ajouter ${member} ? Confirmez avec les réactions`)
            .then(async (msg) => {
                await msg.react("✅");
                await msg.react("❌");
                // On attend que la personne réagisse
                const filter = (reaction, user) => user.id === message.author.id;
                var collector = msg.createReactionCollector(filter, {
                    max: 1,
                    maxUsers: 1
                });
                collector.on('collect', async(r) => {
                    console.log(r.emoji.name);
                    if (r.emoji.name === "✅"){
                        await message.bot.functions.updateProject(message, name, { $push: {members: member}});
                        return message.channel.send(`${member} a été ajouté au projet`);
                    }
                    if (r.emoji.name === "❌"){
                        return message.channel.send("Commande annulée");
                    }
                });
            });
            }
            if(method === "remove"){
                await message.channel.send("Quel membre voulez-vous retirer du projet ? Répondez avec son ID.");
                let response = await awaitResponse(message);
                if(response.toLowerCase() === "stop"){
                    return message.channel.send("Création de projet annulée.");
                }
                let member = message.guild.member(message.guild.members.resolve(response) || message.guild.members.resolveID(response));
                message.channel.send(`Êtes-vous sûr de vouloir enlever ${member} ? Confirmez avec les réactions`)
            .then(async (msg) => {
                await msg.react("✅");
                await msg.react("❌");
                // On attend que la personne réagisse
                const filter = (reaction, user) => user.id === message.author.id;
                var collector = msg.createReactionCollector(filter, {
                    max: 1,
                    maxUsers: 1
                });
                collector.on('collect', async(r) => {
                    console.log(r.emoji.name);
                    if (r.emoji.name === "✅"){
                        await message.bot.functions.updateProject(message, name, { $pull: {members: member}});
                        return message.channel.send(`${member} a été retiré du projet`);
                    }
                    if (r.emoji.name === "❌"){
                        return message.channel.send("Commande annulée");
                    }
                });
            });
            }
        }

        async function task(message){
            await message.channel.send('Répondez avec le nom du projet à modifier');
            let name = await awaitResponse(message);
            if(name === "stop"){
                return message.channel.send("Commande annulée");
            }
            let projet = await message.bot.functions.getProject(name);
            if(name !== projet.name){
                return message.channel.send("Projet introuvable, vérifiez le nom du projet et réessayez");
            }
            if(message.author.id !== projet.lead && message.author.id !== '169146903462805504' && projet.members.indexOf(message.author.id) === -1){
                return message.channel.send("Vous n'êtes pas un membre du projet !");
            }
            await message.channel.send("Que voulez vous faire ? Répondez avec \`\`add\`\`, \`\`done\`\`, \`\`remove\`\` ou \`\`list\`\`");
            let method = await awaitResponse(message);
            if(method === "stop"){
                return message.channel.send("Commande annulée");
            }
            if(method === "list"){
                let projtasks = projet.tasks;
                if(projtasks.length === 1) {
                    var ttext = projtasks[0]
                } else {
                    ttext = "\n• " + projtasks[1];
                    for (let index = 2; index < projtasks.length; index++) {
                        const element = projtasks[index];
                        ttext = ttext + "\n• " + element;
                    }
                }
                let projdtasks = projet.done;
                if(projdtasks.length === 1) {
                    var dttext = projdtasks[0]
                } else {
                    dttext = "\n• " + projdtasks[1];
                    for (let index = 2; index < projdtasks.length; index++) {
                        const element = projdtasks[index];
                        dttext = dttext + "\n• " + element;
                    }
                }
                return message.channel.send({
                    embed: {
                        color: message.config.embed.color,
                        footer: {
                            text: message.config.embed.footer + ` - ID du projet : ${projet._id}`
                        },
                        description: `**__Liste des tâches du projet__** | ${projet.name}

**Tâches en cours :** ${ttext}
**Tâches terminées :** ${dttext}`,
                    },
                    split: true
                })
            }
            if(method === "add"){
            await message.channel.send("Quel est le nom de la tâche à ajouter ?");
            let taskName = await awaitResponse(message);
            if(taskName === projet.tasks[0]) return message.channel.send("Ce nom est réservé à un usage système.");
            for (let index = 0; index < projet.tasks.length; index++) {
                const element = projet.tasks[index];
                if(taskName === element) return message.channel.send("Ce nom est déjà utilisé.");
            }
            if(taskName === "stop"){
                return message.channel.send("Commande annulée");
            }
            message.channel.send(`Vous avez choisi \`\`${taskName}\`\` comme nom de tâche. Validez-le avec les réactions.`)
            .then(async (msg) => {
                await msg.react("✅");
                await msg.react("❌");
                // On attend que la personne réagisse
                const filter = (reaction, user) => user.id === message.author.id;
                var collector = msg.createReactionCollector(filter, {
                    max: 1,
                    maxUsers: 1
                });
                collector.on('collect', async(r) => {
                    console.log(r.emoji.name);
                    if (r.emoji.name === "✅"){
                        await message.bot.functions.updateProject(message, name, { $push: {tasks: taskName}});
                        return message.channel.send(`La tâche ${taskName} a été ajoutée au projet !`);
                    }
                    if (r.emoji.name === "❌"){
                        await message.channel.send("Annulation...");
                        return task(message);
                    }
                });
            });
            }
            if(method === "done"){
                await message.channel.send("Quel est le nom de la tâche terminée ?");
                let taskName = await awaitResponse(message);
                if(method === "stop"){
                    return message.channel.send("Commande annulée");
                }
                if(taskName === projet.done[0]) return message.channel.send("Ce nom est réservé à un usage système.");
                message.channel.send(`Vous avez choisi la tâche \`\`${taskName}\`\`. Validez avec les réactions.`)
                .then(async (msg) => {
                    await msg.react("✅");
                    await msg.react("❌");
                    // On attend que la personne réagisse
                    const filter = (reaction, user) => user.id === message.author.id;
                    var collector = msg.createReactionCollector(filter, {
                        max: 1,
                        maxUsers: 1
                    });
                    collector.on('collect', async(r) => {
                        console.log(r.emoji.name);
                        if (r.emoji.name === "✅"){
                            await message.bot.functions.updateProject(message, name, { $pull: {tasks: taskName}});
                            await message.bot.functions.updateProject(message, name, { $push: {done: taskName}});
                            return message.channel.send(`La tâche ${taskName} a été définie comme terminée !`);
                        }
                        if (r.emoji.name === "❌"){
                            await message.channel.send("Annulation...");
                            return task(message);
                        }
                    });
                });
                }
                if(method === "remove"){
                    await message.channel.send("Quel est le nom de la tâche à retirer ?");
                    let taskName = await awaitResponse(message);
                    if(taskName === "stop"){
                        return message.channel.send("Commande annulée");
                    }
                    if(taskName === projet.tasks[0]) return message.channel.send("Ce nom est réservé à un usage système.");
                    message.channel.send(`Vous avez choisi de retirer la tâche \`\`${taskName}\`\`. Validez avec les réactions.`)
                    .then(async (msg) => {
                        await msg.react("✅");
                        await msg.react("❌");
                        // On attend que la personne réagisse
                        collector = msg.createReactionCollector(filter, {
                            max: 1,
                            maxUsers: 1
                        });
                        collector.on('collect', async(r) => {
                            console.log(r.emoji.name);
                            if (r.emoji.name === "✅"){
                                for (let index = 0; index < projet.tasks.length; index++) {
                                    const element = projet.tasks[index];
                                    if(taskName === element) return;
                                    if(index === projet.tasks.length) return message.channel.send("Tâche introuvable. Veuillez réessayer.")
                                }
                                await message.bot.functions.updateProject(message, name, { $pull: {tasks: taskName}});
                                await message.bot.functions.updateProject(message, name, { $pull: {done: taskName}});
                                return message.channel.send(`La tâche ${taskName} a été retirée du projet !`);
                            }
                            if (r.emoji.name === "❌"){
                                await message.channel.send("Annulation...");
                                return task(message);
                            }
                        });
                    });
                    }
        }
        async function change(message){
            await message.channel.send('Répondez avec le nom du projet à modifier');
            let name = await awaitResponse(message);
            if(name === "stop"){
                return message.channel.send("Commande annulée");
            }
            let projet = await message.bot.functions.getProject(name);
            if(name !== projet.name){
                return message.channel.send("Projet introuvable, vérifiez le nom du projet et réessayez");
            }
            if(message.author.id !== projet.lead && message.author.id !== '169146903462805504' && projet.members.indexOf(message.author.id) === -1){
                return message.channel.send("Vous n'êtes pas un membre du projet !");
            }
            await message.channel.send("Que voulez vous faire ? Répondez avec \`\`name\`\`, \`\`description\`\` ou \`\`task name\`\`");
            let method = await awaitResponse(message);
            if(method === "stop"){
                return message.channel.send("Commande annulée");
            }
            if(method === 'name'){
                await message.channel.send("Quel sera le nouveau nom du projet ?");
                    let newName = await awaitResponse(message);
                    if(newName === "stop"){
                        return message.channel.send("Commande annulée");
                    }
                await message.bot.functions.updateProject(message, name, { name: newName});
                return message.channel.send("Le nom du projet a été modifié !")
            }
            if(method === 'description'){
                await message.channel.send("Quelle sera la nouvelle description du projet ?");
                    let newDesc = await awaitResponse(message);
                    if(newDesc === "stop"){
                        return message.channel.send("Commande annulée");
                    }
                await message.bot.functions.updateProject(message, name, { desc: newDesc});
                return message.channel.send("La description du projet a été modifiée !")
            }
            if(method === 'task name'){
                await message.channel.send("Quel est le nom de la tâche à modifier ?");
                    let task = await awaitResponse(message);
                    if(task === "stop"){
                        return message.channel.send("Commande annulée");
                    }
                    if(task === projet.done[0]) return message.channel.send("Ce nom est réservé à un usage système.");
                    message.channel.send(`Vous avez choisi de modifier le nom de la tâche \`\`${task}\`\`. Validez avec les réactions.`)
                    .then(async (msg) => {
                        await msg.react("✅");
                        await msg.react("❌");
                        // On attend que la personne réagisse
                        const filter = (reaction, user) => user.id === message.author.id;
                        var collector = msg.createReactionCollector(filter, {
                            max: 1,
                            maxUsers: 1
                        });
                        collector.on('collect', async(r) => {
                            console.log(r.emoji.name);
                            if (r.emoji.name === "✅"){
                                await message.channel.send(`Quel sera le nouveau nom de la tâche ${task}?`);
                                let newTaskName = await awaitResponse(message);
                                if(newTaskName === "stop"){
                                    return message.channel.send("Commande annulée");
                                }
                                message.channel.send(`Vous avez choisi \`\`${newTaskName}\`\` comme nouveau nom de tâche. Validez avec les réactions.`)
                    .then(async (msg) => {
                        await msg.react("✅");
                        await msg.react("❌");
                        // On attend que la personne réagisse
                        collector = msg.createReactionCollector(filter, {
                            max: 1,
                            maxUsers: 1
                        });
                        collector.on('collect', async(r) => {
                            console.log(r.emoji.name);
                            if (r.emoji.name === "✅"){
                                await message.bot.functions.updateProject(message, name, { $pull: {task: task} });
                                await message.bot.functions.updateProject(message, name, { $push: {task: newTaskName}});
                                return message.channel.send("Nom de tâche modifiée !")
                            }
                            if (r.emoji.name === "❌"){
                                await message.channel.send("Annulation...");
                                return change(message);
                            }
                        });
                    });
                            }
                            if (r.emoji.name === "❌"){
                                await message.channel.send("Annulation...");
                                return change(message);
                            }
                        });
                    });
            }
        }
        
        async function awaitResponse(message){
            let responseFilter = m => m.author.id === message.author.id;
            let response = await message.channel.awaitMessages(responseFilter, {max: 1});
            let rescontent = response.first().content;
            return rescontent;
        }*/
    }
}
module.exports = Projet;