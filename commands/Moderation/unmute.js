const Command = require("../../base/Command.js");

class unmute extends Command {
    constructor(client) {
        super(client, {
            name: "mute",
            description: (language) => language.get("UNMUTE_DESCRIPTION"),
            usage: (language, prefix) => language.get("UNMUTE_USAGE", prefix),
            examples: (language, prefix) => language.get("UNMUTE_EXAMPLE", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "Server Moderator",
            botPermissions: ["MANAGE_ROLES", "SEND_MESSAGES"],
            nsfw: false,
            adminOnly: false,
            cooldown: 1000,
        });
    }

    async run(message, args) {
        try {
            const searchArgs = args.join(" ");
            if (!searchArgs) {
                return message.channel.send(`<:false:470303149077299231> ${message.language.get("MUTE_ERRORARGS")}`)
            } else {
                let member;
                if (message.mentions.members.size > 0) {
                    member = message.mentions.members.first();
                } else if (searchArgs) {
                    member = message.bot.functions.fetchMembers(message.guild, searchArgs);
                    if (member.size === 0) return message.channel.send(message.language.get("ERROR_NOUSER_FOUND"));
                    else if (member.size === 1) member = member.first();
                    else return message.channel.send(message.language.get("ERROR_MUCH_USER_FOUND"));
                }
                let muteRole = message.guild.roles.find(m => m.name === 'muted');
                if(!muteRole){
                    await message.guild.createRole({
                        name: 'muted',
                    }).catch(message.language.get("ERROR_CREATING_ROLE"));
                    muteRole = message.guild.roles.find(m => m.name === 'muted')
                }
                if (!member.roles.some(r => r.name === 'muted')) return message.channel.send(message.language.get("UNMUTE_USER_NOT_MUTED"));
                await member.removeRole(muteRole.id)
                    .then(r => {
                        message.channel.send(message.language.get("UNMUTE_SUCCESS", member));
                        member.send(message.language.get("UNMUTE_USER_SUCCESS", message))
                    })
                    .catch((error) => message.channel.send(`<:false:470303149077299231> ${message.author} ${message.language.get("UNMUTE_ERROR")} ${error}`));
            }
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = unmute;