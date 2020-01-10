const Command = require("../../base/Command.js");
const ms = require('ms');

class mute extends Command {
    constructor(client) {
        super(client, {
            name: "mute",
            description: (language) => language.get("MUTE_DESCRIPTION"),
            usage: (language, prefix) => language.get("MUTE_USAGE", prefix),
            examples: (language, prefix) => language.get("MUTE_EXAMPLE", prefix),
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
            }
            else {
                let member;
                if (message.mentions.members.size > 0) {
                    member = message.mentions.members.first();
                } else if (searchArgs) {
                    member = message.bot.functions.fetchMembers(message.guild, searchArgs);
                    if (member.size === 0) return message.channel.send(message.language.get("ERROR_NOUSER_FOUND"));
                    else if (member.size === 1) member = member.first();
                    else return message.channel.send(message.language.get("ERROR_MUCH_USER_FOUND"));
                }
                let muteTime = args[1];
                if (!muteTime) return await message.channel.send(message.language.get("MUTE_NO_MUTETIME"));

                let reason = args.slice(2).join(" ");
                if (!reason) return message.channel.send(message.language.get("MUTE_NOREASON"));

                let muteRole = message.guild.roles.find(m => m.name === 'muted');
                if(!muteRole){
                    await message.guild.createRole({
                        name: 'muted',
                    }).catch(message.language.get("ERROR_CREATING_ROLE"));
                    muteRole = message.guild.roles.find(m => m.name === 'muted')
                }
                if (member.roles.find(r => r.name === 'muted')) return await message.channel.send(message.language.get("MUTE_USER_ALREADY_MUTES"));

                if (!member.bannable) return message.channel.send(message.language.get("MUTE_UNMUTABLE"));

                await member.addRole(muteRole.id)
                        .then(member.send(message.language.get("MUTE_USER_MESSAGE", message, muteTime, reason)))
                        .catch((error) => message.channel.send(`<:false:470303149077299231> ${message.author} ${message.language.get("MUTE_ERROR")} ${error}`));
                    setTimeout(function () {
                        member.removeRole(muteRole.id)
                    }, ms(muteTime));
                return message.channel.send(message.language.get("MUTE_INFO", member, message))
            }
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = mute;