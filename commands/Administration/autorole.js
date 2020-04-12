const Command = require('../../base/Command');

class Autorole extends Command {
    constructor(client) {
        super(client, {
            name: 'autorole',
            description: (language) => language.get("PREFIX_DESCRIPTION"),
			usage: (language, prefix) => language.get("PREFIX_USAGE", prefix),
			examples: (language, prefix) => language.get("PREFIX_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "Server Admin",
            botPermissions: ["SEND_MESSAGE"],
            aliases: [],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000
        });
    }

    async run(message, args){
        try {
            const g = await message.bot.functions.getDataGuild(message.guild);
            let method = args[0];
                let ar = g.autorole;
                var text = "";
                if(ar.length === 0) {
                } else {
                    text = "• <@&" + ar[0] + ">";
                    for (let index = 1; index < ar.length; index++) {
                        const element = ar[index];
                        text = text + "\n• <@&" + element + ">";
                    }
                }
            if (!method){
                return message.channel.send(message.language.get("AUTOROLE_NO_ARGS", g, text))
            }
            if(!args[1]) return message.channel.send(message.language.get("AUTOROLE_NO_ROLE"));
            let r = message.guild.roles.resolve(args[1]) || message.guild.roles.resolveID(args[1]);
            let rid = r.toString().slice(3, r.toString().length -1) || r.id;
            if(method === 'add'){
                if(ar.indexOf(rid) !== -1) return message.channel.send(message.language.get("AUTOROLE_ALREADY_IN"));
                await message.bot.functions.updateGuild(g, { $push: {autorole: rid}});
                return message.channel.send(message.language.get("AUTOROLE_ROLE_ADDED", rid));
            } else if (method === "remove"){
                if(ar.indexOf(rid) === -1) return message.channel.send(message.language.get("AUTOROLE_NOT_IN"));
                await message.bot.functions.updateGuild(g, { $pull: {autorole: rid}});
                return message.channel.send(message.language.get("AUTOROLE_ROLE_REMOVED", rid));
            } else {
                return message.channel.send(message.language.get("AUTOROLE_BAD_REASON", g))
            }
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}
module.exports = Autorole;