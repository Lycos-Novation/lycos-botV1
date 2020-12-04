const e = require("../config.js").emotes;
const moment = require("moment");
moment.locale("en");

module.exports = class {
	constructor(...args) {
		this.language = {
			/* General error */
			NO_DESCRIPTION_PROVIDED: "No description defined.",
			NO_USAGE_PROVIDED: "No use defined.",
			NO_EXAMPLES_PROVIDED: "No example defined.",
			COMMAND_CANCEL: "Reply with `stop` or `cancel` to stop the command.",
			COMMAND_CANCELLED: "Command stopped",
			ERROR: (error) => `Something went wrong. Try Again.\n\`\`\`\n${error}\`\`\``,
			ERROR_PERMISSIONS_TITLE: `<:lycosX:631854509798326322> Insufficient permissions`,
			ERROR_PERMISSIONS_CONTENT: (lvl, rlvl) => `This command requires the authorization level \`${rlvl}\` and you only have the level \`${lvl}\` !`,
			ERROR_COMMAND_GUILDONLY: `<:lycosX:631854509798326322> | This command is not available in private messages !`,
			ERROR_NSFW_TITLE: `${e.nsfw} NSFW command`,
			ERROR_NSFW_CONTENT: "This command must be launched in an NSFW channel (+18).",
			ERROR_DISABLED_TITLE: `<:lycosX:631854509798326322> Command disabled`,
			ERROR_DISABLED_CONTENT: "This command is temporarily disabled, only administrators currently have access to it.",
			ERROR_COOLDOWN: "<:lycosX:631854509798326322> __Cooldown running__",
			ERROR_COOLDOWN_CONTENT: (timeLeft, command) => `You must wait ${timeLeft} more second(s) before reusing the \`${command}\` command.`,
			ERROR_EVERYONE_TITLE: `<:lycosX:631854509798326322> Security`,
			ERROR_EVERYONE_CONTENT: "We detected an @everyone in your message, but you don't have permission to mention @everyone in orders.",
			ERROR_BOTPERMISSIONS_TITLE: `<:lycosX:631854509798326322> __Missing permissions__`,
			ERROR_BOTPERMISSIONS_CONTENT: (perm) => `The following permissions are required for this command to work properly: ${perm}.`,
			ERROR_SPECIFY_USER: "Please specify a user.",
			ERROR_ROLE_INVALID: "Invalid role.",
			ERROR_NOUSER_FOUND: "No user was found.",
			ERROR_MUCH_USERS_FOUND: "There are so many users found, be more specific.",
			ERROR_NSFW_DEACTIVATED: "This command is not available because the module ``NSFW`` is not available on this server.\nAsk a server administrator to activate it.",
			ERROR_FORTNITE_PLATFORM: "Please enter a valid platform (pc, xbox, psn).",
			ERROR_FORTNITE_PLATFORM_USER_NOT_FOUND: "This user was not found on the specified platform.",
			BOT_MENTION: (prefix) => `>>> My prefix is \`\`${prefix}\`\` on this server.\nYou can see my commands with \`\`${prefix}help\`\`.\nIf you have any issue, please join the official Lycos' server (discord.gg/64zRC73) or contact LePtitMetalleux#1604 or BaptisteGT#0123 in direct messages.`,
			/* Giveaway */
			GIVEAWAY_DESCRIPTION: "Allows you to manage giveaways easily !",
			GIVEAWAY_USAGE: (prefix) => `${prefix}giveaway [start/edit/reroll/end/delete]`,
			GIVEAWAY_EXAMPLES: (prefix) => `${prefix}giveaway start 2h 5 Discord Nitro\n${prefix}giveaway edit 665556886732668949 1 -1h Discord Nitro\n${prefix}giveaway reroll 665556886732668949 2\n${prefix}giveaway end 665556886732668949\n${prefix}giveaway delete 665556886732668949`,
			GIVEAWAY_NO_METHOD: (prefix) => `Please indicate what you want to do :\n${prefix}giveaway start [Duration] [Number of winners] [Prizes to be won]\n${prefix}giveaway edit [messageID] [Number of winners] [Duration] [Prizes to be won]\n${prefix}giveaway end [messageID] [Number of winners to be raised]\n${prefix}giveaway delete [messageID]`,
			GIVEAWAY_NO_TIME: "Please indicate a duration !",
			GIVEAWAY_NO_WINNERCOUNT: "Please indicate the number of winners !",
			GIVEAWAY_NO_PRIZE: "Please indicate something to win !",
			GIVEAWAY_ERR_NO_ID: "You must enter the giveaway message ID !",
			GIVEAWAY_WINNERS_NOT_POSITIVE: "Winner's number can't be negative or equal to 0!",
			GIVEAWAY_TOO_LONG: "Given duration is too long. You can't give a date after Tuesday, April 20th, 271,821.",
			GIVEAWAY_TIME_NOT_POSITIVE: "The giveaway's duration can't be negative or equal to 0!",
			GIVEAWAY_ERR_REROLL_MSG_ENDED: (messageID) => `No giveaway **ended** found with message ID \`${messageID}\`.`,
			GIVEAWAY_ERR_MESSAGE_NOT_FOUND: (messageID) => `No giveaway found with message ID \`${messageID}\`.`,
			GIVEAWAY_REROLL_NO_WINNERSCOUNT: "Please indicate the number of winners to be drawn !",
			GIVEAWAY_NO_NEWTIME: "Please indicate time modification.",
			GIVEAWAY_CREATE_MESSAGES: {
				timeRemaining: "Remaining time : **{duration}** !",
				inviteToParticipate: "React with 🎉 to participate !",
				winMessage: "Well done {winners} ! You have won **{prize}** !",
				embedFooter: "Giveaways",
				noWinner: "Giveaway canceled, no valid participation.",
				winners: "Winner(s)",
				endedAt: "Finishes at",
				units: {
					seconds: "seconds",
					minutes: "minutes",
					hours: "hours",
					days: "days"
				},
			},
			GIVEAWAY_REROLL_MESSAGES: {
				congrat: "New winner(s) : {winners}! Congratulations !",
				error: "No valid registration, no winner can be chosen !",
			},
			/* Language */
			LANGUAGE_DESCRIPTION: "Translate Lycos into other languages.",
			LANGUAGE_USAGE: (prefix) => `${prefix}language [set/list]`,
			LANGUAGE_EXAMPLES: (prefix) => `${prefix}lang list\n${prefix}language set english\n${prefix}language set fr`,
			LANGUAGE_INFO: (language) => `My language on this server is \`${language}\` !\n> To change the language, reply with \`\`set\`\`\n> To see the different languages, reply with \`\`list\`\``,
			LANGUAGE_LIST: `Lycos' languages`,
			LANGUAGE_NAMES: ["English", "French"],
			LANGAUGE_LIST_DESC: (prefix) => `Here are Lycos' languages.\nType the command \`\`${prefix}lang set [language]\`\` by replacing \`\`[language]\`\` with one of the following options.`,
			LANGUAGE_SUPPLY: "Reply with the language you want to put the bot in.",
			LANGUAGE_ALREADY_SET: (lang) => `I'm already in \`${lang}\`.`,
			LANGUAGE_GUILD_INFO: (lang) => `I'm now in \`${lang}\` on this server.`,
			ERROR_LANGUAGE_INCORRECT: "I don't think I know this language. Can you help me learn it ?",
			LANGUAGE_METHOD_ERROR: "I didin't understand what you asked for. Please retry.",
			LANGUAGE_HELP_TRAD_TITLE: "Tranlsation help",
			LANGUAGE_HELP_TRAD_MSG: "If you want to help us for the bot's translation, [click here](https://discord.gg/64zRC73).",
			/* Modules */
			MODULES_DESCRIPTION: "Not available.",
			MODULES_USAGE: (prefix) => `${prefix}modules set <module> <on/off>`,
			MODULES_EXAMPLES: (prefix) => `${prefix}modules set games on`,
			MODULES_INFO: (prefix) => `Certains modules ne sont pas disponibles par défaut sur Lycos.\n> Pour activer faites \`${prefix}modules set <module> <on/off>\`\n> Pour voir combien de modules j'ai, faire \`${prefix}modules list\``,
			MODULES_LIST: (modules) => `Voici la liste des modules disponibles :\n> \`${modules.join("\`, \`")}\``,
			MODULES_NULL: "Vous devez indiquer le module que vous souhaitez modifier.",
			MODULES_ALREADY_ACTIVATED: "Ce module est déjà activé.",
			MODULES_ALREADY_DEACTIVATED: "Ce module est déjà désactivé.",
			MODULES_ACTIVATED: (args) => `Le module ${args[1]} est maintenant activé sur ce serveur.`,
			MODULES_DEACTIVATED: (args) => `Le module ${args[1]} est maintenant désactivé sur ce serveur.`,
			ERROR_MODULES_INCORRECT: (prefix) => `Je ne pense pas que je connaisse ce module. Faites \`${prefix}modules list\``,
			/* Poll */
			POLL_DESCRIPTION: "Make a poll for the members of your server.",
			POLL_USAGE: (prefix) => `${prefix}poll [Question]`,
			POLL_EXAMPLES: (prefix) => `${prefix}poll Is Lycos a good bot ? (Answer no and you will be banned c:)`,
			POLL_TEXT_NULL: "You must insert a text to make a poll.",
			POLL_REACT: "React with the reactions below to enter the poll.",
			/* Prefix */
			PREFIX_DESCRIPTION: "Manage the bot prefix on the server.",
			PREFIX_USAGE: ".prefix set <prefix>\n.prefix reset",
			PREFIX_EXAMPLES: ".prefix set d.\n.prefix reset",
			PREFIX_INFO: (prefix) => `My prefix on this server is \`${prefix}\` ! \n> To change this prefix respond with \`set\`\n> To reset this prefix, answer with \`reset\`.`,
			PREFIX_NULL: "Respond with the prefix you want to assign to the bot.",
			PREFIX_CHANGE: (pref) => `The prefix is ​​now \`${pref}\`.`,
			PREFIX_RESET: "The prefix has been reset. It is now `.`",
			PREFIX_TOO_LONG: (prefix) => `The prefix \`${prefix}\` is too long! Bot's prefix can't be more than 15 characters in lenght.`,
			/* Role */
			ROLE_DESCRIPTION: "Manage roles easily.",
			ROLE_USAGE: ".role <add/remove> <user> <role>",
			ROLE_EXAMPLES: ".role add Lycos @Role/ID",
			ROLE_INFO: (prefix) => `> To add a role to a user, do \`${prefix}role add <user> <role>\` \n> To delete a role from a user, do \`${prefix}role remove <user> <role>\`.`,
			ROLE_NOUSER_FOUND: "No user was found.",
			ROLE_GIVE: (member, role) => `${member.user.username} now has the role <@&${role}>.`,
			ROLE_REMOVE: (member, role) => `${member.user.username} no longer has the role <@&${role}>.`,
			/* Bot */
			BOT_DESCRIPTION: "View information about Lycos.",
			BOT_USAGE: (prefix) => `${prefix}bot`,
			BOT_EXAMPLES: (prefix) => `${prefix}bot`,
			BOT_FIELDS: [
				"General informations",
				"General statistics",
				"Other informations",
				"\u200B",
			],
			BOT_FIELDS_CONTENT_GENERALINFO: (message, version) => `**Creator :** [\`${message.bot.users.cache.get("169146903462805504").tag}\`](https://dsc.bio/baptistegt)\n**Developers :** [\`${message.bot.users.cache.get("153163308801720321").tag}\`](https://dsc.bio/LePtitMetalleux) and [\`${message.bot.users.cache.get("169146903462805504").tag}\`](https://dsc.bio/baptistegt)\nCreated on the \`22/05/2020\`, the bot is currently running on the version \`${version}\`.`,
			BOT_FIELDS_CONTENT_GENERALSTATS: (guilds, users, channels) => `**Number of servers :** \`${guilds}\`.\n**Users :** \`${users}\` in memory.\n**Number of channels :** \`${channels}\`.`,
			BOT_FIELDS_CONTENT_OTHERINFO: (process, moment, message) => `**Machine :** \`${process.platform}\` - \`(${process.arch})\` \n**TAS :** \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\`\n**Bot connection time :** \`${moment.duration(message.bot.uptime).format("M[m] W[w] D[d] H[h] m[m] s[s]")}\``,
			BOT_FIELDS_CONTENT_LINKS: "[Invitation](https://discordapp.com/oauth2/authorize?client_id=628186022991233025&scope=bot&permissions=0) - [Server](https://discord.gg/64zRC73) - [Donations](https://utip.io/lycosnovation) - [Utip](https://utip.io/lycosnovation) - [Website](https://lycos-novation.fr/) - [Twitch](https://www.twitch.tv/lycostv) - [Instagram](https://www.instagram.com/lycosnovation/) - [Twitter](https://twitter.com/LycosNovation)",
			/* Help */
			HELP_DESCRIPTION: "Displays the list of commands.",
			HELP_USAGE: (prefix) => `${prefix}help (commande)`,
			HELP_EXAMPLES: (prefix) => `${prefix}help\n${prefix}help ping`,
			HELP_NOT_FOUND: (args) => `${e.error} | The command \`${args}\` does not exist !`,
			HELP_COMING_SOON: "Coming soon...",
			HELP_TITLE: (command) => `Help : ${command}`,
			HELP_TITLE1: (category) => `Category : ${category}`,
			HELP_EMBED_DESCRIPTION: (prefix) => `Hello, here is the Lycos documentation.\nTo get more informations about a command, do \`\`${prefix}help [Command]\`\``,//Certaines commandes ne sont pas disponible sur la documentation parce qu'elles doivent être activer.\nPour voir ce que vous pouvez activer faites \`${message.settings.prefix}modules\`.
			HELP_FIELDS: [
				"Description",
				"Use",
				"Examples",
				"Required level",
			],
			HELPGLOBAL_FIELDS: [
				"Administration",
				"Moderation",
				"General",
				"Fun",
				"Stream",
				"Game statistics",
				"Music",
			],
			HELPGLOBAL_TITLE: "Help menu",
			/*Bug report*/
			BUGREPORT_DESCRIPTION: "Reports a bug with the bot.",
			BUGREPORT_USAGE: (prefix) => `${prefix}bugreport [Message] (Follow the folowing exmaple)`,
			BUGREPORT_EXAMPLES: (prefix) => `${prefix}bugreport Command: role-info
			Erorr: TypeError: role.createdTimestamp.toUTCString is not a function
			Context: I just typed the .role-info Blurple command and I got this error.`,
			BUGREPORT_NO_ARGS: "Please describe the issue with at least 10 characters and a maximum of 1900.",
			BUGREPORT_REPORT_SEND: "The bug has been reported successfully, it will be processed as fast as possible et will be fixed in a future update.\nTo be aware of next updates, join Lycos' Discord (discord.gg/64zRC73)",
			/* Invitation */
			INVITE_DESCRIPTION: "Give the invitation to add the bot on a server.",
			INVITE_USAGE: (prefix) => `${prefix}invite`,
			INVITE_EXAMPLES: (prefix) => `${prefix}invite`,
			INVITE_TITLE: "Lycos' invite links",
			INVITE_DESC: `**⛓ How can I add Lycos on my server ?**

			Here are various links to add Lycos according to the permissions
			📌 To add Lycos with the **Admin permission**, you only need to [click here](https://discordapp.com/api/oauth2/authorize?client_id=628186022991233025&permissions=8&scope=bot).
			⚙️ To add Lycos and **configure its permissions**, you only need to [click here](https://discordapp.com/api/oauth2/authorize?client_id=628186022991233025&permissions=2146958583&scope=bot).
			▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
			⚠️ **__WARNING__**
			Permissions required by Lycos may change at any time. 
			To know about it, it's recommended to you to join the [official server of Lycos](https://discord.gg/64zRC73).`,
			//⚖️ To add Spyer with **required permissions**, you only need to [click here](https://discordapp.com/api/oauth2/authorize?client_id=628186022991233025&permissions=41282630&scope=bot).
			/* Vote */
			VOTE_DESCRIPTION: "Lycos' vote links",
			VOTE_USAGE: (prefix) => `${prefix}vote`,
			VOTE_EXAMPLES: (prefix) => `${prefix}vote`,
			VOTE_TITLE: "Lycos' vote links",
			VOTE_DESC: (bdb, dbl, bls, bfd, vb) => `<:botdatabase:728338548138442903> [Vote on BotsDataBase](https://botsdatabase.com/bot/628186022991233025) (**${bdb}** votes - Vote every 12H)
<:DiscordBotList:735786997569814579> [Vote on Disord Bot List](https://top.gg/bot/628186022991233025) (**${dbl}** votes - Vote every 12H)
<:botsfordiscord:739412747099570186> [Vote on Bots For Discord](https://botsfordiscord.com/bot/628186022991233025) (**${bfd}** votes - Vote every 12H)
<:botlistspace:738454241110392853> [Vote on botlist.space](https://botlist.space/bot/628186022991233025) (**${bls}** votes - Vote every 24H)
<:void_bots:738451886147108925> [Vote on VoidBots](https://voidbots.net/bots/628186022991233025) (**${vb}** votes - Vote every 12H)`,
			/* Ping */
			PING_DESCRIPTION: "Gives latency of the Discord API.",
			PING_USAGE: (prefix) => `${prefix}ping`,
			PING_EXAMPLES: (prefix) => `${prefix}ping`,
			PING_PONG: "Pong !",
			PING_APILATENCY: "API's latency",
			PING_CLIENTLATENCY: "Lycos' latency",
			/* Cat */
			CAT_DESCRIPTION: "Have fun watching cat pictures.",
			CAT_USAGE: (prefix) => `${prefix}cat`,
			CAT_EXAMPLES: (prefix) => `${prefix}cat`,
			/* Chrono */
			CHRONO_DESCRIPTION: "Creates a stopwatch",
			CHRONO_USAGE: (prefix) => `${prefix}chrono [start/stop]`,
			CHRONO_EXAMPLES: (prefix) => `${prefix}chrono start\n${prefix}chrono stop`,
			CHRONO_METHODS: "Do `chrono start` to start the stopwatch and `chrono stop` to stop it.",
			CHRONO_RUNNING: "You have already started a stopwatch!",
			CHRONO_STARTED: "Stopwatch started! Do `chrono stop` to stop it.",
			CHRONO_NOT_RUNNING: "You didn't started any stopwatch!",
			CHRONO_STOPPED: (result) => `Stopwatch stopped at ${result}`,
			/* Dog */
			DOG_DESCRIPTION: "Have fun watching dog pictures.",
			DOG_USAGE: (prefix) => `${prefix}dog`,
			DOG_EXAMPLES: (prefix) => `${prefix}dog`,
			/* Avatar */
			AVATAR_DESCRIPTION: "Gives the avatar of the requested user.",
			AVATAR_USAGE: (prefix) => `${prefix}avatar (@user/ID)`,
			AVATAR_EXAMPLES: (prefix) => `${prefix}avatar @Lycos\n ${prefix}avatar 628186022991233025`,
			AVATAR_TITLE: (looked) => `Avatar of ${looked.user.username}`,
			/* Serverinfos */
			SERVERINFO_PROFIL: (guild) => `Server information | ${guild}`,
			SERVERINFO_DESCRIPTION: "Displays server information.",
			SERVERINFO_USAGE: (prefix) => `${prefix}serverinfo`,
			SERVERINFO_EXAMPLES: (prefix) => `${prefix}serverinfo`,
			SERVERINFO_REGIONS: [
				":flag_br: Brazil",
				":flag_eu: Central Europe",
				":flag_sg: Singapore",
				":flag_us: USA - Center",
				":flag_au: Sydney",
				":flag_us: USA - East",
				":flag_us: USA - Sud",
				":flag_us: USA - West",
				":flag_eu: Western Europe",
				":flag_us: USA - East VIP",
				":flag_gb: London",
				":flag_nl: Amsterdam",
				":flag_hk: Hong Kong",
				":flag_ru: Russia",
				":flag_za: South Africa",
				":flag_eu: Europe",
				":flag_in: India",
				":flag_jp: Japan"
			],
			SERVERINFO_TITLES: [
				"Name",
				"Creation",
				"Total | Humans | Bots",
				"Channel",
				"ID",
				"Owner",
				"Region",
				"Verification level",
				"Roles",
			],
			SERVERINFO_CDATE: (message) => `${moment(message.channel.guild.createdAt.toUTCString()).format("LLLL").charAt(0).toUpperCase() + moment(message.channel.guild.createdAt.toUTCString()).format("LLLL").slice(1)} (${message.bot.functions.checkDays(message.channel.guild.createdAt, message)})`,
			SERVERINFO_NOROLES: "No role is present on this server.",
			SERVERINFO_ROLELIST: (guild) => `and ${guild.roles.cache.size - 10} ${guild.roles.cache.size - 10 === 1 ? "other role" : "other roles"}.`,
			/* Date */
			DATE_AGO: "There is ",
			DATE_DAY: " day",
			DATE_DAYS: " days",
			/* Userinfos */
			USERINFO_DESCRIPTION: "Displays user information.",
			USERINFO_USAGE: (prefix) => `${prefix}userinfo (@user)`,
			USERINFO_EXAMPLES: (prefix) => `${prefix}userinfo @Lycos`,
			USERINFO_TITLES: [
				"Userame",
				"ID",
				"Status",
				"Account created at",
				"Joined the guild at",
				"Roles",
			],
			USERINFO_TITLES_BADGE: (badge) => `${badge.length > 1 ? "Badges" : "Badge"}`,
			USERINFO_TITLES_ACTIVITY: (activity) => `${activity.length > 1 ? "Activities" : "Activity"}`,
			USERINFO_CREATEACCOUNT: (createAccount) => `${moment(createAccount).format('LLLL')}`,
			USERINFO_JOINGUILD: (joinGuild) => `${moment(joinGuild).format('LLLL')}`,
			USERINFO_STATUS: [
				"Online",
				"Offline",
				"Idle",
				"Do not disturb",
			],
			USERINFO_NO_BADGES: "This member has no badge",
			USERINFO_NO_ACTIVITY: "This member has no ongoing activity",
			USERINFO_ACTIVITY_NUMBER: (activity) => `This member has ${activity.length === 1 ? "1 ongoing activity" : `${activity.length} ongoing activities`}:\n`,
			USERINFO_ACTIVITY_NUM: (index) => `**__Activity ${index + 1}:__**\n`,
			USERINFO_ACTIVITY_NAME: (activity) => `**Name:** ${activity.name}`,
			USERINFO_ACTIVITY_TYPE: (activity) => `**Type:** ${activity.type}`,
			USERINFO_ACTIVITY_URL: (activity) => `**URL:** ${activity.url}`,
			USERINFO_ACTIVITY_DETAILS: (activity) => `**Details:** ${activity.details}`,
			USERINFO_ACTIVITY_STATE: (activity) => `**State:** ${activity.state}`,
			USERINFO_ACTIVITY_TIMESTAMPS: (activity) => `${activity.start ? `**Activity started at** ${moment(activity.start).format("LLLL")}` : `**No detected start.**`} - ${activity.end ? `**Activity will ends at** ${moment(activity.end).format("LLLL")}` : `**No planned end.**`}`,
			USERINFO_ACTIVITY_PARTY: (activity) => `**Party:** ${activity.id}`,
			USERINFO_ACTIVITY_ASSETS: (activity) => `**Assets:** ${activity.largeText ? activity.largeText : "No text."} - ${activity.smallText ? activity.smallText : "No text."}`,
			USERINFO_SPOTIFY_LISTENING: "Listening music on Spotify",
			USERINFO_SPOTIFY_TITLE: "Title:",
			USERINFO_SPOTIFY_ARTIST: "Artist:",
			USERINFO_SPOTIFY_ALBUM: "Album:",
			USERINFO_SPOTIFY_DURATION: `Music duration:`,
			USERINFO_SPOTIFY_TIMEREMAINING: "Time remaining:",
			USERINFO_TWITCH_STREAMING: "Streaming on Twitch",
			USERINFO_TWITCH_TITLE: "Title:",
			USERINFO_TWITCH_CATEGORY: "Category:",
			USERINFO_TWITCH_JOIN: "Join stream",
			USERINFO_GAME_PLAYING: "Playing",
			USERINFO_GAME_NAME: "Name:",
			USERINFO_GAME_SINCE: "Playing since",
			USERINFO_CS: "Custom Status:",
			USERINFO_CS_NAME: (activity) => `${activity.emoji ? activity.emoji.id ? `<${activity.emoji.animated ? `a` : ``}:${activity.emoji.name}:${activity.emoji.id}>` : `${activity.emoji.name}` : ``} ${activity.state}`,
			USERINFO_PROFIL: "Profile of ",
			USERINFO_UNKNOWN_STATUS: "I didin't find this member's status",
			USERINFO_NOROLES: "This member has no role.",
			USERINFO_ROLELIST: (member) => `and ${member.roles.cache.size - 10} ${member.roles.cache.size - 10 === 1 ? "other role" : "other roles"}.`,
			/* Massagedelete */
			MESSADEDELETE_DESC: "Message deleted",
			MESSADEDELETE_FIELD: [
				"Channel",
				"Content",
				"ID",
				"User",
				"Message",
			],
			MESSAGEUPDATE_DESC: "Message updated.",
			MESSAGEUPDATE_FIELD: [
				"Channel",
				"Go to message",
				"Now",
				"New",
				"ID",
				"User",
				"Message",
			],
			/* Partners */
			PARTNERS_DESCRIPTION: "Displays Lycos partners.",
			PARTNERS_USAGE: (prefix) => `${prefix}partners`,
			PARTNERS_EXAMPLES: (prefix) => `${prefix}partners`,
			PARTNERS_TITLE: "Lycos partners.",
			PARTNERS_EMBED_DESC: "Here are listed Lycos partners with a brief description.",
			PARTNERS_NAMES: ["Lycos currently has no partners."],
			PARTNERS_VALUES: ["For any partnership request, please contact our team [Marketing](https://discord.gg/7UwmMA3)."],
			/* Sponsors */
			SPONSORS_DESCRIPTION: "Displays Lycos sponsors.",
			SPONSORS_USAGE: (prefix) => `${prefix}sponsors`,
			SPONSORS_EXAMPLES: (prefix) => `${prefix}sponsors`,
			SPONSORS_TITLE: "Lycos sponsors.",
			SPONSORS_EMBED_DESC: "Here are listed Lycos sponsors.",
			SPONSORS_NAMES: ["Lycos currently has no sponsor."],
			SPONSORS_VALUES: ["To become a sponsor, please contact <@!169146903462805504>."],
			/* Anime */
			ANIME_DESCRIPTION: "Find the best anime.",
			ANIME_USAGE: (prefix) => `${prefix}anime [animeName]`,
			ANIME_EXAMPLES: (prefix) => `${prefix}anime Dragon Ball`,
			ANIME_NOTFOUND: "You must include an anime name.",
			ANIME_TITLES: [
				"Synopsis",
				"Characters",
				"Staff",
				"General infomations",
			],
			ANIME_INFOS: [
				"Synonyms",
				"Episodes",
				"Status",
				"Aired",
				"Premiered",
				"Broadcast",
				"Producers",
				"Duration",
				"Rating",
				"Rank",
				"Popularity",
				"Members",
				"Favorite",
			],
			ANIME_UNKNOWN: "Unkonwn",
			ANIME_VOICE: "Voice:",
			ANIME_STAFF_ROLE: (staff_role) => staff_role,
			ANIME_ROLE: (role) => `${role}`,
			ANIME_RATING: (rating) => `${rating}`,
			ANIME_TRAILER: (trailer) => `[Click here](${trailer})`,
			/* Fortnite */
			FORTNITE_DESCRIPTION: "Watch your Fortnite stats to be competitive.",
			FORTNITE_USAGE: (prefix) => `${prefix}fortnite [platforme] [username]`,
			FORTNITE_EXAMPLES: (prefix) => `${prefix}fortnite pc Ninja`,
			FORTNITE_PLATFORM: "Please enter the name of your platform (pc, xbox, psn).",
			FORTNITE_USERNAME_NULL: "Please enter a username.",
			FORTNITE_PLAYER_NOT_FOUND: "Player not found.",
			FORTNITE_PLAYER_STATS: (data) => `Statistics of ${data.username}`,
			FORTNITE_FIELDS: [
				"Kills",
				"Games played",
				"Victories",
				"Kill ratio per game",
			],
			FORTNITE_FIELDS_CONTENT_KILL: (data) => `${data.stats.lifetime.kills} (${data.stats.squad ? `${data.stats.squad.kills}` : "0"} in squad, ${data.stats.duo ? `${data.stats.duo.kills}` : "0"} in duo, ${data.stats.solo ? `${data.stats.solo.kills}` : "0"} alone)`,
			FORTNITE_FIELDS_CONTENT_MATCHSPLAYED: (data) => `${data.stats.lifetime.matches} (${data.stats.squad ? `${data.stats.squad.matches}` : "0"} in squad, ${data.stats.duo ? `${data.stats.duo.matches}` : "0"} in duo, ${data.stats.solo ? `${data.stats.solo.matches}` : "0"} alone)`,
			FORTNITE_FIELDS_CONTENT_VICTORIES: (data) => `${data.stats.lifetime.wins} (${data.stats.squad ? `${data.stats.squad.wins}` : "0"} in squad, ${data.stats.duo ? `${data.stats.duo.wins}` : "0"} in duo, ${data.stats.solo ? `${data.stats.solo.wins}` : "0"} alone)`,
			/* Apex */
			APEX_PLATFORM: "Please enter the name of your platform (pc, xbox, ps4).",
			APEX_ERROR_PLATFORM: "Please enter a valid platform (pc, xbox, ps4).",
			APEX_USERNAME_NULL: "Please enter a username.",
			/* OSU */
			OSU_DESCRIPTION: "Look at your statistics Osu!.",
			OSU_USAGE: (prefix) => `${prefix}osu [Username]`,
			OSU_EXAMPLES: (prefix) => `${prefix}osu WhiteCat`,
			OSU_SUPPLY_PLAYER: "Respond with a username.",
			OSU_USER_NOT_FOUND: "I couldn't find this player.",
			OSU_EMBED_AUTHOR: (user) => `Profile Osu! of ${user.name} (ID: ${user.id}) | ${user.country}`,
			OSU_FIELDS: [
				"Started playing on",
				"Level",
				"Precision",
				"Performance points",
				"Score",
				"Notes",
				"Number of games played"
			],
			OSU_JOINED_DATE: (user) => `${moment(user.raw_joinedDate).format("LLLL")} and played for `,
			OSU_PP: (user) => `Total points classified : ${user.pp.raw} - World rank : ${user.pp.rank} - National rank : ${user.pp.countryRank}`,
			OSU_SCORES: (user) => `Ranked : ${user.scores.ranked} points - Total : ${user.scores.total} points`,
			OSU_COUNTS: (user) => `50 : ${user.counts['50']} - 100 : ${user.counts['100']} - 300 : ${user.counts['300']} A : ${user.counts.A} - S : ${user.counts.S} - SH : ${user.counts.SH} - SS : ${user.counts.SS} - SSH :${user.counts.SSH}`,
			/* QRCODE */
			QRCODE_DESCRIPTION: "Generates a QRCode containing the specified text",
			QRCODE_USAGE: (prefix) => `${prefix}qrcode [text]`,
			QRCODE_EXAMPLES: (prefix) => `${prefix}qrcode Secret code`,
			QRCODE_MESSAGE: "You must include something to convert to a QR Code.",
			/* Reminder */
			REMINDER_DESCRIPTION: "Creates a reminder",
			REMINDER_USAGE: (prefix) => `${prefix}reminder [time] [toRemind]`,
			REMINDER_EXAMPLES: (prefix) => `${prefix}reminder 12h Upvote Lycos`,
			REMINDER_NO_TIME: "You must provide how long I must remind you.",
			REMINDER_TIME_LIMIT: "You cant set a reminder superior to 24 days.",
			REMINDER_NO_REMIND: "You must provide what I have to remind to you.",
			REMINDER_TOO_LONG: "Wow... I'll never remember all that ! Please give me somethis shorter to remember.",
			REMINDER_TITLE: "Reminder",
			REMINDER_STARTED: (toRemind, time) => `Perfect, I'll remind you to ${toRemind} in ${time}.`,
			REMINDER_ENDED: (author, toRemind) => `<@!${author}>, it's time to ${toRemind} !`,
			/* Role */
			ROLE_INFO_DESCRIPTION: "Displays information for the specified role.",
			ROLE_INFO_USAGE: (prefix) => `${prefix}role-info [@Role/ID]`,
			ROLE_INFO_EXAMPLES: (prefix) => `${prefix}role-info @Members\ ${prefix}role-info 699011821654507572`,
			ROLE_INFO_SPECIFY: "Please specify a role.",
			ROLE_INFO_NOT_FOUND: "I can't find this role.",
			ROLE_INFO_FIELDS: [
				"Color",
				"Position",
				"Mentionable",
				"Creation date",
			],
			ROLE_INFO_CDATE: (role, message) => `${moment(role.createdAt.toUTCString()).format("LLLL").charAt(0).toUpperCase() + moment(role.createdAt.toUTCString()).format("LLLL").slice(1)} (${message.bot.functions.checkDays(role.createdAt, message)})`,
			ROLE_INFO_ID: (role) => `ID of the role : ${role.id}`,
			ROLE_INFO_EMBED_NAME: (role) => `Information about the role ${role.name}`,
			/* Flip */
			FLIP_DESCRIPTION: "Have fun playing with the flip.",
			FLIP_USAGE: (prefix) => `${prefix}flip`,
			FLIP_EXAMPLES: (prefix) => `${prefix}flip`,
			FLIP_HEADS: ":game_die: | It's **heads** !",
			FLIP_TAILS: ":game_die: | It's **tails** !",
			/* Permissions */
			PERMISSIONS_DESCRIPTION: "Displays the permissions of a member in the channel.",
			PERMISSIONS_USAGE: (prefix) => `${prefix}permissions (@member)`,
			PERMISSIONS_EXAMPLES: (prefix) => `${prefix}permissions\n${prefix}permissions @user#1234`,
			PERMISSIONS_TITLE: (username, channel) => `Permissions of ${username} in #${channel}`,
			/* Purge */
			PURGE_DESCRIPTION: "Delete multiple messages at once.",
			PURGE_USAGE: (prefix) => `${prefix}purge [NamebreDeMessage]`,
			PURGE_EXAMPLES: (prefix) => `${prefix}purge 28`,
			PURGE_NEGATIVE_OR_NULL: "You can't purge a negative or null amout of messages!",
			PURGE_SPECIFY_AMOUNT: "You must specify an amount of messages to delete!",
			PURGE_TOO_MUCH_AMOUNT: "I cannot delete more than 100 messages at once.",
			/* Ban */
			BAN_DESCRIPTION: "Ban the mentioned user.",
			BAN_USAGE: (prefix) => `${prefix}ban (remove) [@user] (reason)`,
			BAN_EXAMPLES: (prefix) => `${prefix}ban @Lycos Spam\n ${prefix}ban remove `,
			BAN_ERRORARGS: "Please indicate a user to ban !",
			BAN_ALREADY: "This user is already banned !",
			BAN_BANNABLE: "I cannot ban this user, please check their roles and permissions.",
			BAN_NOREASON: "Please indicate a reason.",
			BAN_ERROR: "I can't ban because : ",
			BAN_INFO: (member, message) => `${member} was banned by ${message.author}`,
			/* Unban */
			UNBAN_INFO: (member, message) => `${member} was unbanned by ${message.author}`,
			UNBAN_ERROR: "I can't ban because : ",
			UNBAN_NOT_BANNED: "This user is not banned !",
			UNBAN_DESCRIPTION: "Unban the specified user.",
			UNBAN_USAGE: (prefix) => `${prefix}unban [UserID]`,
			UNBAN_EXAMPLES: (prefix) => `${prefix}unban 628186022991233025`,
			UNBAN_ERRORARGS: "Please indicate a user to unban !",
			/* Kick */
			KICK_DESCRIPTION: "Kick the mentioned user.",
			KICK_USAGE: (prefix) => `${prefix}kick [@user] (reason)`,
			KICK_EXAMPLES: (prefix) => `${prefix}kick @Lycos Spam`,
			KICK_ERRORARGS: "Please indicate a user !",
			KICK_KICKABLE: "I can't kick this user out, please check their roles and permissions.",
			KICK_NOREASON: "Please indicate a reason",
			KICK_ERROR: "I could not kick the user because : ",
			KICK_INFO: (member, message) => `${member} was kicked out by ${message.author}`,
			KICK_EMBED_TITLE: "A member has been kicked from the server!",
			KIKC_EMBED_DESC: (member, reason, message) => `**Kicked member:** ${member.displayName} - ${member.user.id}
**Kicked by:** ${message.member.displayName} - ${message.author} - ${message.author.id}
**Reason:** ${reason}
**Date:** ${moment(new Date()).format("LLLL")}`,
			/* FML */
			FUCKMYLIFE_DESCRIPTION: "Funny stories about everyday life.",
			FUCKMYLIFE_USAGE: (prefix) => `${prefix}fuck-my-life | ${prefix}fml`,
			FUCKMYLIFE_EXAMPLES: (prefix) => `${prefix}fuck-my-life | ${prefix}fml`,
			/* NSFW */
			NSFW_URL: "If the image does not appear click here.",
			/* Weather */
			WEATHERINFO_DESCRIPTION: "Displays the requested city weather.",
			WEATHERINFO_USAGE: (prefix) => `${prefix}weather-info [Name/Postal Code]`,
			WEATHERINFO_EXAMPLES: (prefix) => `${prefix}weather-info Paris`,
			WEATHERINFO_NO_CITY: "Please enter a city name or postal code.",
			WEATHERINFO_NOT_FOUND: "Unable to find weather data for this city.",
			WEATHER_LANGUAGE: "en-UK",
			WEATHERINFO_EMBED_TITLE_TODAY: (result) => `Weather in ${result[0].location.name} the ${result[0].current.day} ${date(result[0].current.date)} at ${result[0].current.observationtime}`,
			WEATHERINFO_EMBED_DESCRIPTION_TODAY: (result) => `**Weather:** ${result[0].current.skytext}
**Temperature:** ${result[0].current.temperature}°C
**Feeling:** ${result[0].current.feelslike}°C
**Humidity:** ${result[0].current.humidity}%
**Wind:** ${result[0].current.winddisplay}`,
			WEATHERINFO_EMBED_TITLE_YESTERDAY: (result) => `Weather in ${result[0].location.name} the ${result[0].forecast[0].day} ${date(result[0].forecast[0].date)}.`,
			WEATHERINFO_EMBED_DESCRIPTION_YESTERDAY: (result) => `**Température Max/Min** : ${result[0].forecast[0].high}°C/${result[0].forecast[0].low}°C
**Météo :** ${result[0].forecast[0].skytextday}
**Précipitations :** ${result[0].forecast[0].precip !== "" ? `${result[0].forecast[0].precip}` : `0`}%`,
			WEATHERINFO_EMBED_TITLE_TOMORROW: (result) => `Météo de ${result[0].location.name} the ${result[0].forecast[1].day} ${date(result[0].forecast[1].date)}.`,
			WEATHERINFO_EMBED_DESCRIPTION_TOMORROW: (result) => `**Temperature Max/Min:** ${result[0].forecast[1].high}°C/${result[0].forecast[1].low}°C
**Weather:** ${result[0].forecast[1].skytextday}
**Précipitations :** ${result[0].forecast[1].precip}%`,
			WEATHERINFO_EMBED_TITLE_J2: (result) => `Météo de ${result[0].location.name} the ${result[0].forecast[2].day} ${date(result[0].forecast[2].date)}.`,
			WEATHERINFO_EMBED_DESCRIPTION_J2: (result) => `**Température Max/Min:** ${result[0].forecast[2].high}°C/${result[0].forecast[2].low}°C
**Météo :** ${result[0].forecast[2].skytextday}
**Précipitations :** ${result[0].forecast[2].precip}%`,
			WEATHERINFO_EMBED_TITLE_J3: (result) => `Météo de ${result[0].location.name} the ${result[0].forecast[3].day} ${date(result[0].forecast[3].date)}.`,
			WEATHERINFO_EMBED_DESCRIPTION_J3: (result) => `**Température Max/Min** : ${result[0].forecast[3].high}°C/${result[0].forecast[3].low}°C
**Météo :** ${result[0].forecast[3].skytextday}
**Précipitations :** ${result[0].forecast[3].precip}%`,
			WEATHERINFO_EMBED_TITLE_J4: (result) => `Météo de ${result[0].location.name} the ${result[0].forecast[4].day} ${date(result[0].forecast[4].date)}.`,
			WEATHERINFO_EMBED_DESCRIPTION_J4: (result) => `**Température Max/Min** : ${result[0].forecast[4].high}°C/${result[0].forecast[4].low}°C
**Météo :** ${result[0].forecast[4].skytextday}
**Précipitations :** ${result[0].forecast[4].precip}%`,
			WEATHERINFO_EMBED_FOOTER: (result) => `Coordonnées - Longitude : ${result[0].location.long} - Latitude : ${result[0].location.lat} | Zone horaire : UTC${result[0].location.timezone >= 0 ? `+${result[0].location.timezone}` : `${result[0].location.timezone}`}`,
			WEATHERINFO_EMBED_TITLE: (result) => `Weather in ${result[0].location.name} the ${result[0].current.day} ${date(result[0].current.date)} at ${result[0].current.observationtime}`,
			WEATHERINFO_EMBED_DESCRIPTION: (result) => `**Coordinates** - __Longitude:__ ${result[0].location.long} - __Latitude:__ ${result[0].location.lat}
**Weather:** ${result[0].current.skytext}
**Temperature:** ${result[0].current.temperature}°C
**Feeling:** ${result[0].current.feelslike}°C
**Humidity:** ${result[0].current.humidity}%
**Wind:** ${result[0].current.winddisplay}
**Timezone:** UTC${result[0].location.timezone >= 0 ? `+${result[0].location.timezone}` : `${result[0].location.timezone}`}

**__Forecast for ${result[0].forecast[0].day} ${date(result[0].forecast[0].date)}__**

**Temperature Max/Min**: ${result[0].forecast[0].high}°C/${result[0].forecast[0].low}°C
**Weather:** ${result[0].forecast[0].skytextday}
**Precipitation:** ${result[0].forecast[0].precip !== "" ? `${result[0].forecast[0].precip}` : `0`}%

**__Forecast for ${result[0].forecast[1].day} ${date(result[0].forecast[1].date)}__**

**Temperature Max/Min**: ${result[0].forecast[1].high}°C/${result[0].forecast[1].low}°C
**Weather:** ${result[0].forecast[1].skytextday}
**Precipitation:** ${result[0].forecast[1].precip}%

**__Forecast for ${result[0].forecast[2].day} ${date(result[0].forecast[2].date)}__**

**Temperature Max/Min**: ${result[0].forecast[2].high}°C/${result[0].forecast[2].low}°C
**Weather:** ${result[0].forecast[2].skytextday}
**Precipitation:** ${result[0].forecast[2].precip}%

**__Forecast for ${result[0].forecast[3].day} ${date(result[0].forecast[3].date)}__**

**Temperature Max/Min**: ${result[0].forecast[3].high}°C/${result[0].forecast[3].low}°C
**Weather:** ${result[0].forecast[3].skytextday}
**Precipitation:** ${result[0].forecast[3].precip}%

**__Forecast for ${result[0].forecast[4].day} ${date(result[0].forecast[0].date)}__**

**Temperature Max/Min**: ${result[0].forecast[4].high}°C/${result[0].forecast[4].low}°C
**Weather:** ${result[0].forecast[4].skytextday}
**Precipitation:** ${result[0].forecast[4].precip}%`,
			/* WIKIPEDIA */
			WIKIPEDIA_DESCRIPTION: "Seaches a wikipeda page",
			WIKIPEDIA_USAGE: (prefix) => `${prefix}wikipedia [Name]`,
			WIKIPEDIA_EXAMPLES: (prefix) => `${prefix}wikipedia Batman`,
			WIKI_NO_SEARCH: "You must provide the name of the page to search!",
			WIKI_ERROR: (e) => `${e}`,
			/* RPS */
			RPS_DESCRIPTION: "Game of rock, paper, scissors",
			RPS_USAGE: (prefix) => `${prefix}rps [rock/paper/scissors]`,
			RPS_EXAMPLES: (prefix) => `${prefix}rps stone`,
			RPS_LYCOS_CHOICE: (choixO) => `Lycos's choice: ${choixO}`,
			RPS_MATCH_EQUAL: `:flag_white: | Draw!`,
			RPS_PLAYER_WIN: (message) => `:dagger: | Victory of ${message.author.username} !`,
			RPS_LYCOS_WIN: `:skull_crossbones: | Victory of Lycos !`,
			RPS_CHOICES: "Choose between `rock`, `paper` and `scissors`",
			RPS_CHOICES_ARRAY: ["rock", "paper", "scissors"],
			RPS_ROCK: "rock",
			RPS_PAPER: "paper",
			RPS_SCISSORS: "scissors",
			/* Support */
			SUPPORT_DESCRIPTION: "Allows you to contact bot support in case of a problem.",
			SUPPORT_USAGE: (prefix) => `${prefix}support [Problem]`,
			SUPPORT_EXAMPLES: (prefix) => `${prefix}support Hello, I thought I found a bug in your bot.`,
			SUPPORT_NO_ARGS: "Please describe your problem with at least 10 characters and a maximum of 1900.",
			SUPPORT_QUESTION_SEND: "Your question has been sent to support. Please wait for a response.",
			/* Update */
			UPDATE_DESCRIPTION: "Shows last dev logs.",
			UPDATE_USAGE: (prefix) => `${prefix}update`,
			UPDATE_EXAMPLES: (prefix) => `${prefix}update`,
			UPDATE_TITLE: (version) => `Dev logs | Version ${version}`,
			UPDATE_ADD: `**•** Added \`lycos-suggestion\` command.
			**•** Added \`setsuggestions\` command.`,
			UPDATE_UPDATE: `**•** Updated \`suggestion\` command : It send the suggestion in the suggestions channel of the server.
			**•** Corrected translation and writing errors.
			**•** Fixed a bug that allows a channel to be locked or unlocked when it already was.
			**•** Fixed a bug in the \`giveaway\` command, which allows to set a negative amount of winners. 
			**•** Fixed a bug in the \`giveaway\` command, where the bots didn't responds when setting anything as a duration or a too long duration.`,
			UPDATE_REMOVE: "",
			/* Suggestion */
			SUGGESTION_DESCRIPTION: "Allows you to send a suggestion about the bot",
			SUGGESTION_USAGE: (prefix) => `${prefix}suggestion [Suggestion]`,
			SUGGESTION_EXAMPLES: (prefix) => `${prefix}suggestion hi, you could make a suggestion commande witch sends the suggestion in a channel in the server Lycos novation - Support.`,
			SUGGESTION_NO_ARGS: "Please describe your suggestion with at least 10 characters and a maximum of 1900.",
			SUGGESTION_QUESTION_SEND: "Your suggestion has been sent! The for your advice!",
			/* Number */
			NUMBER_DESCRIPTION: "Draw a random number in a given interval (Min and max included: [min;max])",
			NUMBER_USAGE: (prefix) => `${prefix}number [min] [max] [time]`,
			NUMBER_EXAMPLES: (prefix) => `${prefix}number 1 50 1[d/h/m/s]`,
			NUMBER_MIN: "You must indicate the minimum number of the search interval. This cannot be 0.",
			NUMBER_MAX: "You must specify the maximum number of the search interval. This cannot be 0.",
			NUMBER_MIN_LOWER: "The minimum number of the search interval cannot be less than the maximum number !",
			NUMBER_TIME: "You must indicate the duration of the research.",
			NUMBER_START: (min, max, time) => `Let's go ! You have ${time} to find an (integer) number between ${min} and ${max} ([${min};${max}]).`,
			NUMBER_INTERVAL: (min, max) => `This number is not in the search range, the number to find is between ${min} and ${max} ([${min};${max}]).`,
			NUMBET_HIGHER: "It is more !",
			NUMBER_LOWER: "It is less !",
			NUMBER_WINNER: (author) => `Congratulations to ${author} who found the right number !`,
			NUMBER_END: (collected) => `It's over ! There have been ${collected.size} attempts during this game.`,
			NUMBER_ANSWER: (toFind) => `The number to find is **${toFind}**.`,
			/* Blague */
			BLAGUE_DESCRIPTION: "Tell a joke",
			BLAGUE_USAGE: (prefix) => `${prefix}blague`,
			BLAGUE_EXAMPLES: (prefix) => `${prefix}blague`,
			BLAGUE_NOT_AVALIABLE: "This command is not yet available in your language.",
			BLAGUE_QUESTION: "Question",
			BLAGUE_ANSWER: "Answer",
			BLAGUE_FOOTER: (type, id) => `Type : ${type}, ID : ${id}`,
			/* Morse */
			MORSE_DESCRIPTION: "Translate a message in morse code",
			MORSE_USAGE: (prefix) => `${prefix}morse [Message]`,
			MORSE_EXAMPLES: (prefix) => `${prefix}morse [Message]`,
			MORSE_NO_TEXT: "You must specify a message to translate ! You can reply with it or reply with the commande ans your message.",
			MORSE_CANT_TRANSLATE: "Sorry, I can't translate your message. Make sure your message don't have special characters.",
			MORSE_TRANSLATE_ESPACE: "Sorry, there are more than 2000 characters that follow each other without space, so I can't send the translation without corrupt it...",
			/* Même */
			MEME_DESCRIPTION: "Sends a meme",
			MEME_USAGE: (prefix) => `${prefix}meme`,
			MEME_EXAMPLES: (prefix) => `${prefix}meme`,
			/* Say */
			SAY_DESCRIPTION: "Make the bot speak.",
			SAY_USAGE: (prefix) => `${prefix}say [text]`,
			SAY_EXAMPLES: (prefix) => `${prefix}say Hello my name is Lycos!`,
			SAY_NO_ARGS: "You must write a message to send!",
			SAY_TOO_LONG: "Your message is too long !",
			SAY_EVERYONE: "You cannot mention `everyone`!",
			SAY_EMBED_DESCRIPTION: "Make the bot speak in an embed",
			SAY_EMBED_USAGE: (prefix) => `${prefix}sayembed [text]`,
			SAY_EMBED_EXAMPLES: (prefix) => `${prefix}sayembed Hello my name is Lycos!`,
			/* Report */
			REPORT_DESCRIPTION: "Allows you to report a member.",
			REPORT_USAGE: (prefix) => `${prefix}report [@User/ID] [Raison]`,
			REPORT_EXAMPLES: (prefix) => `${prefix}report @Lycos This member has fun spamming in salons.`,
			REPORT_NOT_SET: "The reception channel for reports has not been defined, the command is therefore deactivated.",
			REPORT_NOREASON: "You must indicate a reason for your report.",
			REPORT_SAMEUSER: "You cannot report yourself.",
			REPORT_TITLE: "Reporting of ",
			REPORT_NAME: (member) => `${member.user.tag} has been reported for:`,
			REPORT_ERRORARGS: "You must indicate a person to report!",
			REPORT_SEND: "Your report has been sent!",
			/* Global music*/
			NOT_PLAYING: "No music playing.",
			/* Play */
			PLAY_DESCRIPTION: "Plays requested music. (Supporting song names, YouTube links & Playlists and Spotify links)",
			PLAY_USAGE: ".play [Music/Link]",
			PLAY_EXAMPLES: ".play Our Last Night - Younger Dreams\n.play https://www.youtube.com/watch?v=EM7CJcfZbpM\n.play https://open.spotify.com/track/3YU9WNqpBjG3uI59NEQUH5?si=MVwzgB8DSDye9abZ5gihCw",
			PLAY_NO_VOICECHANNEL: "You must be in a voice channel to play music.",
			PLAY_NO_ARGS: "Please provide a music to play.",
			PLAY_NO_TRACK_FOUND: "Sorry, I couldn't find anything ont YouTube corresponding to",
			PLAY_CHOICE: "Send the number of the track you want to play!",
			PLAY_INVALID_NUMBER: "You must send a valid number between 1 and",
			PLAY_INVALID_ANSWER: 'You did not provide a valid response... Please send the command again!',
			PLAY_SONGS_ADDED: "songs added to the queue!",
			PLAY_SONG_ADDED: "added to the queue!",
			PLAY_END: "There is no more music in the queue",
			PLAY_SKIPPED: (track) => `Skipped \`${track}\``,
			PLAY_AGAIN: (track) => `Playing \`${track}\`... AGAIN!`,
			PLAY_NEWPLAY: (track) => `Now playing \`${track}\`.`,
			PLAY_CHANNEL_EMPTY: "Stop playing, there is no more member in the voice channel",
			PLAY_MISSING_PERMS: "I am not able to join your voice channel, please check my permissions!",
			/* Spotify */
			SPOTIFY_DESCRIPTION: "Plays requested music, album or playlist (Only Spotify links)",
			SPOTIFY_USAGE: (prefix) => `${prefix}spotify [Link]`,
			SPOTIFY_EXAMPLES: (prefix) => `${prefix}spotify https://open.spotify.com/track/5v6rYV1jE6xHY3yzpu0m1H?si=4bLL6cF8TK6MQJKNrl5oZQ\n${prefix}spotify https://open.spotify.com/album/50uuwku9CNQJBPE26OoaUL?si=PeooA4Q3SBCf9zNIwVJQxw\n${prefix}spotify https://open.spotify.com/playlist/2tBoC3sUhNdWK1hsGGoU9y?si=Y-yRSGBaR_yQXQtjv45NcA`,
			SPOTIFY_NO_ARGS: "Please provide a Spotify link to play. (Music, Album or Playlist)",
			SPOTIFY_ALBUM_ADDING: "Adding album... This operation might take a few minutes.",
			SPOTIFY_PLAYLIST_ADDING: "Adding playlist... This operation might take a few minutes.",
			NOT_SPOTIFY: "This isn't a Spotify link!",
			/* Music-youtube */
			MUSIC_YOUTUBE_DESCRIPTION: "Plays requested music or playlist (Only YouTube links)",
			MUSIC_YOUTUBE_USAGE: (prefix) => `${prefix}musicyt [Link]`,
			MUSIC_YOUTUBE_EXAMPLES: (prefix) => `${prefix}musicyt https://www.youtube.com/watch?v=YIAlVDLZJ_k\n${prefix}musicyt https://www.youtube.com/playlist?list=PL179D9EEB47465C35`,
			MUSIC_YOUTUBE_NO_ARGS: "Please provide a YouTube link to play. (Music or Playlist)",
			NOT_MUSIC_YOUTUBE: "This isn't a YouTube link!",
			/* Now-Playing*/
			NOWPLAYING_DESCRIPTION: "Shows currently played music",
			NOWPLAYING_USAGE: (prefix) => `${prefix}now-playing`,
			NOWPLAYING_EXAMPLES: (prefix) => `${prefix}now-playing`,
			NOWPLAYING: "Now playing",
			NOWPLAYING_MUSIC_NAME: "Music's name",
			NOWPLAYING_ARTIST: "Artist",
			NOWPLAYING_MUSIC_DURATION: "Music's duration",
			NOWPLAYING_PROGRESS_BAR: "Progress bar",
			/* Clearqueue*/
			NOWPLAYING_DESCRIPTION: "Deleted server's queue",
			NOWPLAYING_USAGE: (prefix) => `${prefix}clear-queue`,
			NOWPLAYING_EXAMPLES: (prefix) => `${prefix}clear-queue`,
			CLEARQUEUE_CLEARED: "Queue cleared!",
			/* Filters */
			FILTERS_DESCRIPTION: "Allows you to manage music filters.",
			FILTERS_USAGE: (prefix) => `${prefix}filters [list/filter]`,
			FILTERS_EXAMPLES: (prefix) => `${prefix}filters list\n ${prefix}filters bassboost`,
			FILTERS_NO_ARGS: "You need to provide a filter to apply.\nHere's the list:",
			FILTERS_FILTERS: "Server's filters",
			FILTERS_NOT_EXISTS: "This filter doesn't exists!\nHere's the list:",
			FILTERS_ADDING: "I'm adding the filter to the music, please wait... Note : the longer the music is, the longer the wait will be",
			FILTERS_REMOVING: "I'm disabling the filter on the music, please wait... Note : the longer the music is playing, the longer the wait will be",
			/* Stop */
			STOP_DESCRIPTION: "Stops the music and disconnects the bot.",
			STOP_USAGE: (prefix) => `${prefix}stop`,
			STOP_EXAMPLES: (prefix) => `${prefix}stop`,
			STOPPED: "Music stopped!",
			/* Loop */
			LOOP_DESCRIPTION: "Enables or diables repeat mode.",
			LOOP_USAGE: (prefix) => `${prefix}loop`,
			LOOP_EXAMPLES: (prefix) => `${prefix}loop\n${prefix}repeat`,
			LOOP_UNLOOPING: "Mode boulce déactivé ! La musique actuelle ne sera plus jouée encore et encore...",
			LOOP_LOOPING: "Repeat mode enabled! The current song will be played again and again until you run the command again!",
			/* Pause */
			PAUSE_DESCRIPTION: "Pauses current music.",
			PAUSE_USAGE: (prefix) => `${prefix}pause`,
			PAUSE_EXAMPLES: (prefix) => `${prefix}pause`,
			PAUSED: "paused!",
			/* Queue */
			QUEUE_DESCRIPTION: "Shows server's queue.",
			QUEUE_USAGE: (prefix) => `${prefix}queue`,
			QUEUE_EXAMPLES: (prefix) => `${prefix}queue`,
			QUEUE_ACTUAL: "Server's queue",
			QUEUE_EMPTY: "There is no track in the queue",
			/* Remove */
			REMOVE_DESCRIPTION: "Removes a track from queue.",
			REMOVE_USAGE: (prefix) => `${prefix}remove [Number]`,
			REMOVE_EXAMPLES: (prefix) => `${prefix}remove 1`,
			REMOVE_NO_ARGS: "Please provide the number of the music you want to remove ! You can get it with the `queue` command.",
			REMOVE_REMOVED: "Removed track!",
			/* Resume */
			RESUME_DESCRIPTION: "Resumes paused track",
			RESUME_USAGE: (prefix) => `${prefix}resume`,
			RESUME_EXAMPLES: (prefix) => `${prefix}resume`,
			RESUMED: "resumed.",
			/* Shuffle */
			SHUFFLE_DESCRIPTION: "Shuffles queue",
			SHUFFLE_USAGE: (prefix) => `${prefix}shuffle`,
			SHUFFLE_EXAMPLES: (prefix) => `${prefix}shuffle`,
			SHUFFLED: "Queue shuffled!",
			/* Skip */
			SKIP_DESCRIPTION: "Skips current track",
			SKIP_USAGE: (prefix) => `${prefix}skip`,
			SKIP_EXAMPLES: (prefix) => `${prefix}skip`,
			/* Volume */
			VOLUME_DESCRIPTION: "Allows you tu changes bot's volume",
			VOLUME_USAGE: (prefix) => `${prefix}volume [Volume]`,
			VOLUME_EXAMPLES: (prefix) => `${prefix}volume 50`,
			VOLUME_BETWEEN: "The volume must be between 1 and 100%.",
			VOLUME_SETTED: "🔊 Volume has been set to",
			/* Answer */
			ANSWER_UNKNOWN_ID: (args) => `Support request with ID \`${args}\` is not found.`,
			ANSWER_SENT: `Your response has been sent successfully.`,
			/* Reload */
			RELOAD_NO_COMMAND: "You must indicate a command to reload.",
			RELOAD_ERROR_UNLOADING: (response) => `Unloading error: ${response}`,
			RELOAD_ERROR_LOADING: (response) => `Loading error: ${response}`,
			RELOAD_COMMAND_RELOADED: (commandName) => `The command \`${commandName}\` has been reloaded.`,
			RELOAD_COMMAND_DOESNT_EXIST: (args) => `The command \`${args[0]}\` doesn't seem to exist. Try again!`,
			/* Mute */
			ERROR_CREATING_ROLE: "I couldn't create the role ``muted``. Check that I have the required permission!",
			MUTE_DESCRIPTION: "Mute the selected member.",
			MUTE_USAGE: (prefix) => `${prefix}mute [@User or UserID] [Duration] [Reason]`,
			MUTE_EXAMPLE: (prefix) => `${prefix}mute @Lycos 1[d/h/m/s] Spam emotes`,
			MUTE_ERRORARGS: "Please provide a user to mute!",
			MUTE_NO_MUTETIME: "You did not specify a time!",
			MUTE_USER_ALREADY_MUTED: "This user is already muted!",
			MUTE_UNMUTABLE: "This user cannot be mute!",
			MUTE_NOREASON: "You did not provide a reason for the muted!",
			MUTE_ERROR: "I couldn't mute because:",
			MUTE_INFO: (member, message) => `${member} was muted by ${message.author}`,
			MUTE_USER_MESSAGE: (message, muteTime, reason) => `You are now muted on **${message.guild.name}** for **${reason}** while **${muteTime}**.`,
			MUTE_EMBED_TITLE: "A member has been muted!",
			MUTE_EMBED_DESC: (member, message, muteTime, reason) => `**Muted member:** ${member.displayName} - ${member} - ${member.user.id}
**Muted by:** ${message.member.displayName} - ${message.author} - ${message.author.id}
**Reason:** ${reason}
**Mute duration:** ${muteTime}
**Date:** ${moment(new Date()).format("LLLL")}`,
			MUTE_REMOVE_EMBED_DESC: (member, message) => `**Unmuted member:** ${member.displayName} - ${member} - ${member.user.id}
**Unmuted by:** ${message.member.displayName} - ${message.author} - ${message.author.id}
**Date:** ${moment(new Date()).format("LLLL")}`,
			/* Unmute */
			UNMUTE_DESCRIPTION: "Unmute the selected member.",
			UNMUTE_USAGE: (prefix) => `${prefix}unmute [@User or UserID]`,
			UNMUTE_EXAMPLE: (prefix) => `${prefix}unmute @Lycos`,
			UNMUTE_ERRORARGS: "Please provide a user to unmute!",
			UNMUTE_USER_NOT_MUTED: "This member is not muted!",
			UNMUTE_SUCCESS: (member) => `${member} was successfully unmuted!`,
			UNMUTE_USER_SUCCESS: (message) => `You were unmute of **${message.guild.name}**, sorry for inconvenience!`,
			UNMUTE_ERROR: "I couldn't unmute because:",
			UNMUTE_EMBED_TITLE: "A member has been unmuted!",
			UNMUTE_REMOVE_EMBED_DESC: (member) => `**Unmuted member:** ${member.displayName} - ${member} - ${member.user.id}
**Unmuted automatically**`,
			/* Voicemute */
			MUTE_DESCRIPTION: "Voicemute the selected member.",
			MUTE_USAGE: (prefix) => `${prefix}mute [@User or UserID] [Duration] [Reason]`,
			MUTE_EXAMPLE: (prefix) => `${prefix}mute @Lycos 1[d/h/m/s] Spam emotes`,
			/* Unvoicemute */
			UNVOICEMUTE_DESCRIPTION: "Unvoicemute the selected member.",
			UNVOICEMUTE_USAGE: (prefix) => `${prefix}unmute [@User or UserID]`,
			UNVOICEMUTE_EXAMPLE: (prefix) => `${prefix}unmute @Lycos`,
			/* Clear */
			CLEAR_DESCRIPTION: "Clears the channel.",
			CLEAR_USAGE: (prefix) => `${prefix}clear`,
			CLEAR_EXAMPLE: (prefix) => `${prefix}clear`,
			/* Lock */
			LOCK_DESCRIPTION: "Locks the channel",
			LOCK_USAGE: (prefix) => `${prefix}lock`,
			LOCK_EXAMPLE: (prefix) => `${prefix}lock`,
			ALREADY_LOCKED: "This channel is already locked.",
			LOCKED: "**⚠️ __WARNING__ | The channel is locked, you can't send messages in it for the moment.**",
			/* Unlock */
			UNLOCK_DESCRIPTION: "Dérverouille le salon",
			UNLOCK_USAGE: (prefix) => `${prefix}lock`,
			UNLOCK_EXAMPLE: (prefix) => `${prefix}lock`,
			NOT_LOCKED: "The channel isn't locked.",
			UNLOCKED: "The channel has been unlocked, you can now speak here.",
			/* Rolemention */
			ROLEMENTION_DESCRIPTION: "Mention the requested role.",
			ROLEMENTION_USAGE: (prefix) => `${prefix}rolemention [ID/Name]`,
			ROLEMENTION_EXAMPLES: (prefix) => `${prefix}rolemention 627956962008629279\n${prefix}rolemention Developers`,
			ROLEMENTION_ROLE_NOT_FOUND: "No role found.",
			ROLEMENTION_ROLE_HIGHEST: "This role is superior to mine, so I can't mention it.",
			ROLEMENTION_NOARGS: "Respond with the id of the role to be mentioned (If everyone or here, just respond with everyone or here).",
			/* Emotes */
			EMOTES_DESCRIPTION: "Server's emojis list",
			EMOTES_USAGE: (prefix) => `${prefix}emotes`,
			EMOTES_EXAMPLES: (prefix) => `${prefix}emotes`,
			EMOTES_TITLE: "Server's emojis list",
			EMOTES_TITLES: [
				"Emojis",
				"Animated emojis"
			],
			EMOTES_DESC: (message) => `The server currently has **${message.guild.emojis.cache.size}** emojis:`,
			EMOTES_NO_EMOTES: "There are no emojis on this server.",
			EMOTES_NO_ANIMATED: "There is no animated emoji on this server.",
			/* Membercount */
			MEMBERCOUNT_DESCRIPTION: "Create a membercount channel or category",
			MEMBERCOUNT_USAGE: (prefix) => `${prefix}membercount [channel/category/delete] (Name)`,
			MEMBERCOUNT_EXAMPLES: (prefix) => `${prefix}membercount channel\n ${prefix}membercount category Lycos Novation : {membercount} members`,
			MEMBERCOUNT_NO_METHOD: "Please indicate the type of the membercount you want: channel/category. You can add the name you want to give to the channel using ``{membercount}`` where you want the number of member to be in your channel's name.",
			MEMBERCOUNT_MEMBERS: "members",
			MEMBERCOUNT_UNVALID_METHOD: "I did not understand the type you asked: channel/category",
			MEMBERCOUNT_CREATED: "The membercount has been created!",
			MEMBERCOUNT_DELETED: "The membercount has been deleted!",
			MEMBERCOUNT_NOT_EXISTS: "There is no membercount created on the server!",
			MEMBERCOUNT_TOO_MUCH_CHANNELS: "The limit of channels in this server has been reached! Please delete a channel for the membercount's creation.",
			/* Config */
			CONFIG_DESCRIPTION: "Displays the bot configuration on the server.",
			CONFIG_USAGE: (prefix) => `${prefix}config`,
			CONFIG_EXAMPLES: (prefix) => `${prefix}config`,
			CONFIG_TITLE: (g) => `Lycos configuration on ${g.guild_name}`,
			CONFIG_FIELDS: [
				"Bot language",
				"Bot prefix",
				"Autorole",
				"Arrivals channel",
				"Departures channel",
				"Log display channel",
				"Moderation logs display channel",
				"Reports display channel",
				"Streams announcement channel",
				"Server's followed streamers' list"
			],
			CONFIG_VALUES: (g) => [
				`${g.welcome_channel === null ? "No channel has been defined" : `<#${g.welcome_channel}>`}`,
				`${g.leave_channel === null ? "No channel has been defined" : `<#${g.leave_channel}>`}`,
				`${g.logs_channel === null ? "No channel has been defined" : `<#${g.logs_channel}>`}`,
				`${g.modlogs_channel === null ? "No channel has been defined" : `<#${g.modlogs_channel}>`}`,
				`${g.reports_channel === null ? "No channel has been defined" : `<#${g.reports_channel}>`}`,
				`${g.twitch_channel === null ? "Aucun salon n'a été défini" : `<#${g.twitch_channel}>`}`,
			],
			/* Autorole */
			AUTOROLE_DESCRIPTION: "Allows management of roles added when a new member arrives.",
			AUTOROLE_USAGE: (prefix) => `${prefix}autorole [add/remove] [@Role/ID]`,
			AUTOROLE_EXAMPLES: (prefix) => `${prefix}autorole add @Role\n${prefix}autorole remove 699011821654507572`,
			AUTOROLE_NO_ARGS: (g, text) => `${JSON.parse(g.autorole).length === 0 ? `There is currently no role assigned to members when they arrive on the server.` : `There are currently ${JSON.parse(g.autorole).length} ${JSON.parse(g.autorole).length === 1 ? `assigned role` : `assigned roles`} to members upon their arrival :\n${text}`}\nAnswer with \`\`add\`\` to add an autorole role.\nAnswer with \`\`remove\`\` to remove a role from the autorole.`,
			AUTOROLE_SUPPLY_METHOD: "Answer with \`\`add\`\` to add an autorole role.\nAnswer with \`\`remove\`\` to remove a role from the autorole.",
			AUTOROLE_SUPPLY_ROLE: "Answer with ID of the role, or by mentioning it.",
			AUTOROLE_BAD_METHOD: (g) => `I did not understand what you wanted to do.\nPlease try again.`,
			AUTOROLE_NO_ROLE: "Please specify a role to add or remove !",
			AUTOROLE_ALREADY_IN: "This role is already part of the autorole !",
			AUTOROLE_NOT_IN: "This role is not part of the autorole !",
			AUTOROLE_ROLE_NOT_FOUND: "I did not find the role you asked for.",
			AUTOROLE_ROLE_ADDED: (r) => `The role <@&${r}> has been added to the autorole !`,
			AUTOROLE_ROLE_REMOVED: (r) => `The role <@&${r}> has been removed from the autorole !`,
			AUTOROLE_LIMIT: "You have reached the limit of assignable roles in self-employment. Please remove it if you want to add new ones.",//Ajouter "Vous pouvez augmentez cette limite en passant sur la version premium du bot"
			AUTOROLE_ROLE_BOT: "You can't use a bot's role in the autorole!",
			/* RR */
			RR_DESCRIPTION: "Configure the rolereaction.",
			RR_USAGE: (prefix) => `${prefix}rolereaction [launch/add/remove] [emote] [Role]`,
			RR_EXAMPLES: (prefix) => `${prefix}rolereaction add :lycos: @LycosRole\n ${prefix}rolereaction remove :lycos: @LycosRole\n ${prefix}rolereaction launch`,
			RR_SUPPLY_METHOD: "Please specify what you want to do. Answer with launch, add ou remove.",
			RR_EMPTY: "The role reaction is empty, please add roles to be able to initialize it.",
			RR_SUPPLY_EMOTE: "Please indicate the emote to add.",
			RR_SUPPLY_NAME: "Please indicate the role to associate with the emote.",
			RR_EMOTE_ALREADY_IN: "This emote is already in the role reaction.",
			RR_ROLE_ALREADY_IN: "This role is already in the role reaction.",
			RR_LIMIT: "You have reached the limit of 30 roles in the role reaction.",
			RR_NOT_IN: "This role or emote is not in the role reaction.",
			RR_BAD_METHOD: "I did not understand what you wanted to do. Please try again.",
			RR_ROLE_ADDED: "Role added in the role reaction.",
			RR_ROLE_REMOVED: "The role has been removed from the role reaction",
			RR_NO_CHANNEL: "Please set up a channel for the rolereaction beforehand. (See setnotif)",
			RR_SUPPLY_DESCRIPTION: "Please provide a short description of the role. You cannot use the `/` character in your description.",
			RR_ERROR_DESC: "The use of the character `/` is reserved for system use. Please try again.",
			RR_EMBED_FOOTER: "Click on the reactions below.",
			RR_EMBED_TITLE: "Role Reaction",
			RR_EMBED_DESC: "Click on the reaction corresponding to the role you wish to have.",
			RR_EMBED_FIELD: "List of roles :",
			RR_ADD_USER: (g, r) => `> <:lycosV:631854492173991947> ${g.name} | Given role: ${r.name}`,
			RR_REMOVE_USER: (g, r) => `> <:lycosX:631854509798326322> ${g.name} | Role removed: ${r.name}`,
			RR_ROLE_BOT: "You can't use a bot's role in the rolereaction!",
			/* Setsuggestion */
			SETSUGGESTION_DESCRIPTION: "Allows the selection of the suggestion display channel.",
			SETSUGGESTION_USAGE: (prefix) => `${prefix}setlogs [#channel/ID]`,
			SETSUGGESTION_EXAMPLES: (prefix) => `${prefix}setlogs #suggestion`,
			SETSUGGESTION_NO_ARGS: (g) => `${g.suggestions_channel === null || g.suggestions_channel === "" ? `There is currently no suggestion channel.` : `The suggestion channel is currently <#${g.suggestions_channel}>.`}\nAnswer by mentioning the channel or by indicating its ID in order to make it the channel for posting suggestions.`,
			SETSUGGESTION_SAME: (c) => `<#${c}> is already the channel for posting suggestions.`,
			SETSUGGESTION_SUCCESS: (c) => `Suggestions will now be displayed in the channel <#${c}>.`,
			SETSUGGESTION_NOT_TEXT: "Supplied channel isn't a text channel!",
			SUGGESTION_NOT_SET: "Suggestions channel isn't defined, I can't send you suggestion.",
			/* Setlogs */
			SETLOGS_DESCRIPTION: "Allows the selection of the log display channel.",
			SETLOGS_USAGE: (prefix) => `${prefix}setlogs [#channel/ID]`,
			SETLOGS_EXAMPLES: (prefix) => `${prefix}setlogs #logs`,
			SETLOGS_NO_ARGS: (g) => `${g.logs_channel === null || g.logs_channel === "" ? `There is currently no log channel.` : `The log channel is currently <#${g.logs_channel}>.`}\nAnswer by mentioning the channel or by indicating its ID in order to make it the log channel.`,
			SETLOGS_SAME: (c) => `<#${c}> is already the log display channel.`,
			SETLOGS_SUCCESS: (c) => `The logs will now be displayed in the channel <#${c}>.`,
			SETLOGS_ERROR_CHANNEL: "I could not find the requested channel, please try again.",
			/* Setjoin */
			SETJOIN_DESCRIPTION: "Allows the selection of the channel for announcing the arrival of a new member.",
			SETJOIN_USAGE: (prefix) => `${prefix}setjoin [#channel/ID]`,
			SETJOIN_EXAMPLES: (prefix) => `${prefix}setjoin #arrivées`,
			SETJOIN_NO_ARGS: (g) => `${g.welcome_channel === null || g.welcome_channel === "" ? `There is currently no arrivals channel.` : `The arrivals channel is currently <#${g.welcome_channel}>.`}\nAnswer by mentioning the channel or by indicating its ID in order to make it the channel for arrivals.`,
			SETJOIN_SAME: (c) => `<#${c}> is already the arrivals channel.`,
			SETJOIN_SUCCESS: (c) => `Arrivals will now be displayed in the channel <#${c}>.`,
			/* Setleave */
			SETLEAVE_DESCRIPTION: "Allows the selection of the channel for announcing the departure of a member.",
			SETLEAVE_USAGE: (prefix) => `${prefix}setleave [#channel/ID]`,
			SETLEAVE_EXAMPLES: (prefix) => `${prefix}setleave #join`,
			SETLEAVE_SUPPLY: (g) => `${g.leave_channel === null || g.leave_channel === "" ? `There is currently no departure channel.` : `The departure channel is currently <#${g.leave_channel}>.`}\Answer by mentioning the channel or by indicating its ID in order to make it the departure channel.`,
			SETLEAVE_SAME: (c) => `<#${c}> is already the departure display channel.`,
			SETLEAVE_SUCCESS: (c) => `Departures will now be displayed in the channel <#${c}>.`,
			/*Setreports */
			SETREPORTS_DESCRIPTION: "Allows the selection of the channel for alerts.",
			SETREPORTS_USAGE: (prefix) => `${prefix}setreports [#channel/ID]`,
			SETREPORTS_EXAMPLES: (prefix) => `${prefix}setreports #reports`,
			SETREPORTS_NO_ARGS: (g) => `${g.reports_channel === null || g.reports_channel === "" ? `There is currently no reporting channel.` : `The report channel is currently <#${g.reports_channel}>.`}\nAnswer by mentioning the channel or by indicating its ID in order to make it the channel for posting reports.`,
			SETREPORTS_SAME: (c) => `<#${c}> is already the channel for posting reports.`,
			SETREPORTS_SUCCESS: (c) => `Reports will now be displayed in the channel <#${c}>.`,
			SETREPORTS_NOT_TEXT: "Supplied channel isn't a text channel!",
			/* Setnotif */
			SETNOTIF_DESCRIPTION: "Allows the selection of the reaction role channel.",
			SETNOTIF_USAGE: (prefix) => `${prefix}setnotif [#channel/ID]`,
			SETNOTIF_EXAMPLES: (prefix) => `${prefix}setnotif #rolereaction`,
			SETNOTIF_NO_ARGS: (g) => `${g.rolereaction_channel === null || g.rolereaction_channel === "" ? `There is currently no channel for the RoleReaction.` : `The RoleReaction channel is currently <#${g.rolereaction_channel}>.`}\nAnswer by mentioning the channel or by indicating its ID to make it the role reaction channel.`,
			SETNOTIF_SAME: (c) => `<#${c}> is already the RoleReaction channel.`,
			SETNOTIF_SUCCESS: (c) => `The RoleReaction will be in the channel <#${c}>.`,
			/* Setmodlogs */
			SETMODLOGS_DESCRIPTION: "Allows the selection of the moderation log channel",
			SETMODLOGS_USAGE: (prefix) => `${prefix}setmodlogs [#channel/ID]`,
			SETMODLOGS_EXAMPLES: (prefix) => `${prefix}setmodlogs #mod-logs`,
			SETMODLOGS_NO_ARGS: (g) => `${g.modlogs_channel === null || g.modlogs_channel === "" ? `There is currently no moderation log channel.` : `The moderation log channel is currently <#${g.modlogs_channel}>.`}\nAnswer by mentioning the channel or by indicating its ID to make it the channel for moderation logs.`,
			SETMODLOGS_SAME: (c) => `<#${c}> is already the moderation log channel.`,
			SETMODLOGS_SUCCESS: (c) => `Moderation logs will now be displayed in the channel <#${c}>.`,
			/* Settwitch */
			SETTWITCH_DESCRIPTION: "Allows you to manage stream announcements, `channel` for annoucements' channel and `message` for annoucements' message.",
			SETTWITCH_USAGE: (prefix) => `${prefix}settwitch [channel/message]. Use \`{streamer}\` where you want the steamer name to be.`,
			SETTWITCH_EXAMPLES: (prefix) => `${prefix}settwitch channel #streams\n${prefix}settwitch message Hey @everyone ! {streamer} just strted a new stream!`,
			SETTWITCH_NO_ARGS: (g) => `${g.twitch_channel === null || g.twitch_channel === "" ? `There is currently no Twitch live channel.` : `The Twitch live Announcement channel is currently <#${g.twitch_channel}>.`}\nAnswer by mentioning the channel or specifying its ID to make it the Twitch live channel.`,
			SETTWITCH_SAME: (c) => `<#${c}> is already the channel for announcing twitch lives.`,
			SETTWITCH_SUCCESS: (c) => `Twitch lives will now be announced in the channel <#${c}>.`,
			SETTWITCH_NO_MODIFY: "Please provide the element you want to modify: ``channel`` or ``message``.",
			SETTWITCH_BAD_MODIFY: "I didn't understand what you want to modify. Please retry.",
			SETTWTICH_NO_MSG: "Please provide the message you want to send for stream announcements. Use `{streamer}` where you want the steamer name to be.",
			SETTWITCH_MSG_LENGHT: "The stream announcement must have at least 1 character and 1500 at maximum.",
			SETTWITCH_SAME_MSG: "The current announcement message is the same.",
			SETTWITCH_NEW_MSG: (annonce) => `The new stream announcement message is: \`${annonce}\`.`,
			SETTWITCH_ERROR_MODIFY: "Error : No corrsponding modification found (Neither of ``channel`` and ``message``).",
			/* Stream */
			STREAM_DESCRIPTION: "Allows you to manage announced streams on the server.",
			STREAM_USAGE: (prefix) => `${prefix}stream [add/remove/list]`,
			STREAM_EXAMPLES: (prefix) => `${prefix}stream add lycostv\n${prefix}stream remove lycostv\n${prefix}stream list`,
			STREAM_LIST_TITLE: "Server's followed streamers' list",
			STREAM_NO_CHANNEL: "Stream announcements channel is not defined.",
			STREAM_NO_METHOD: "Please provide what you want to do: `add`, `remove` or `list`.",
			STREAM_NO_STREAMER_IN: "There isn't any followed streamer on the server.",
			STREAM_NO_STREAMER_FOUND: "I cant found provided streamer.",
			STREAM_BAD_METHOD: "I didn't understand what you want to do. Please retry.",
			STREAM_NO_STREAMER: "Please provide the streamer's name you want the stream announcements.",
			STREAM_LIMIT_REACHED: "You have reached the limit of 4 streamers.",
			STREAM_STREAMER_ALREADY_IN: "This streamer is already in the annoucements list of the server!",
			STREAM_STREAMER_NOT_IN: "This streamer isn't in the annoucements list of the server!",
			STREAM_ADDED: (displayName, name, id) => `The nexts streams of ${displayName} (${name} - ${id}) will be announced on the server!`,
			STREAM_REMOVED: (displayName, name, id) => `The streams of ${displayName} (${name} - ${id}) will not be announced anymore on the server.`,
			STREAM_EMBED_TITLES: [
				"Game",
				"Viewers",
				"Started At"
			],
			STREAM_STARTEDAT: (startedat) => moment(startedat).format("LLLL").charAt(0).toUpperCase() + moment(startedat).format("LLLL").slice(1),
			STREAM_NO_GAME: "No game defined",
			STREAM_ENDED: (streamer) => `**${streamer}**'s stream had ended.`,
			STREAM_TITLE_CHANGED: (streamer, newTitle) => `**${streamer}** has changed his stream name: **${newTitle}**`,
			STREAM_GAME_CHANGED: (streamer, oldGame, newGame) => `**${streamer}** stopped playing to **${oldGame}** and started playing to **${newGame}** !`,
			/* Streamer-info */
			STREAMERINFO_DESCRIPTION: "Gives informations about the provided Twitch streamer.",
			STREAMERINFO_USAGE: (prefix) => `${prefix}streamer-info [Channel]`,
			STREAMERINFO_EXAMPLES: (prefix) => `${prefix}streamer-info LycosTV`,
			STREAMERINFO_NO_REQUEST: "Please provide a streamer's name!",
			STREAMERINFO_EMBED_TITLE: (name, type) => `${name}'s profile${type !== "" ? type === "affiliate" ? " (Twitch Affiliate)" : " (Twitch Partner)" : ""}`,
			STREAMERINFO_EMBED_TITLES: [
				"View count"
			],
			/* Clip-get */
			CLIPGET_DESCRIPTION: "Finds a requested or random clip.",
			CLIPGET_USAGE: (prefix) => `${prefix}clip-get [id/streamer/game/top] (Amount)`,
			CLIPGET_EXAMPLES: (prefix) => `${prefix}clip-get id ImpartialGlutenFreePineappleWholeWheat\n${prefix}clip-get streamer LycosTV 5\n${prefix}clip-get game Minecraft Dungeons 5\n${prefix}clip-get top 10`,
			CLIPGET_NO_METHOD: "Please provide the clip's origin: `id`, `streamer`, `game` `top`, or `trending`",
			CLIPGET_BAD_METHOD: "I didn't understand the origin of the clip you asked for: `id`, `streamer`, `game`, `top` or `trending`",
			CLIPGET_NO_CLIPID: "Please give the clip's ID to find.",
			CLIPGET_ID_EMBED_TITLES: [
				"Channel",
				"Language",
				"View count",
				"Created at"
			],
			CLIPGET_ID_CREATION_DATE: (startedat) => moment(startedat).format("LLLL").charAt(0).toUpperCase() + moment(startedat).format("LLLL").slice(1),
			CLIPGET_NO_STREAMER: "Please provide the streamer of your choice.",
			CLIPGET_NO_GAME: "Please provide the game of your choice.",
			CLIPGET_STREAMER_NOT_FOUND: "I didn't find the streamer you asked for.",
			CLIPGET_GAME_NOT_FOUND: "I didn't find the game you asked for.",
			CLIPGET_STREAMER_NUMBER: "The amount of clips to show must be between 1 and 10. (Included values).",
			CLIPGET_STREAMER_EMBED_TITLE: (num, user) => `${num === 1 ? "Last clip of" : `List of the ${num} last clips`} of ${user}`,
			CLIPGET_STREAMER_EMBED_CREATEDBY: "Created by",
			CLIPGET_STREAMER_EMBED_CREATEDAT: (createdat) => `at ${moment(createdat).format("LLLL")}`,
			CLIPGET_STREAMER_EMBED_CREATEDCHANNEL: (channel) => `on ${channel}'s channel`,
			CLIPGET_TOP_NO_PERIOD: "You must provide the period wich you want clips to come from : `day`, `week`, `month` ou `all`",
			CLIPGET_TOP_EMBED_VIEWS: "views",
			CLIPGET_STREAMER_EMBED_CREATEDAT: (createdat) => `Created at ${moment(createdat).format("LLLL")}`,
			CLIPGET_TOP_EMBED_TITLE: (period) => `Top 5 of clips the most viewed ${period === "day" ? "of the day" : period === "week" ? "of the week" : period === "month" ? "of the month" : "ever"}`,
			CLIPGET_TRENDING_EMBED_TITLE: (period) => `Top 5 of clips the most popular ${period === "day" ? "of the day" : period === "week" ? "of the week" : period === "month" ? "of the month" : "ever"}`,
			/* Gametop */
			GAMETOP_DESCRIPTION: "Shows a list of the 10 most viewed games at the moment",
			GAMETOP_USAGE: (prefix) => `${prefix}game-top`,
			GAMETOP_EXAMPLES: (prefix) => `${prefix}game-top`,
			GAMETOP_EMBED_TITLE: "Top 10 of most viewed games on Twitch",
			GAMETOP_EMBED_ON: "on",
			GAMETOP_EMBED_CHANNELS: "channels",
			/* Clip-create */
			CLIPCREATE_DESCRIPTION: "Creates a clip on resquested channel.",
			CLIPCREATE_USAGE: (prefix) => `${prefix}clip-create [channel]`,
			CLIPCREATE_EXAMPLES: (prefix) => `${prefix}clip-create LycosTV`,
			CLIPCREATE_NO_CHANNEL: "Please provide the name of a streaming channel.",
			CLIPCREATE_NO_LIVE: "This channel isn't streaming!",
			CLIPCREATE_CREATED: (clip, name) => `A new clip has been created on \`${name}\`'s channel!
You can find it here: https://clips.twitch.tv/${clip}`,
			/* Logs */
			LOGS_CHANNEL_CREATE_TITLE: `A new channel has been created !`,
			LOGS_CHANNEL_CREATE_DESC: (c) => `**${c.name}** - ${c} (${c.id})
**Created the :** ${moment(c.createdAt.toUTCString()).format("LLLL")}${c.parent ? `\n**In the category :** ${c.parent} (${c.parent.id})` : ``}
**Type of channel :** ${c.type}
**Position in the category :** ${c.position}
**Position in the server :** ${c.rawPosition}`,
			LOGS_CHANNEL_DELETE_TITLE: "A channel has been deleted !",
			LOGS_CHANNEL_DELETE_DESC: (c) => `**${c.name}** - (${c.id})
**Created the :** ${moment(c.createdAt.toUTCString()).format("LLLL")}
**Deleted the :** ${moment(new Date()).format("LLLL")}${c.parent ? `\n**In the category :** ${c.parent} (${c.parent.id})` : ``}
**Type of channel :** ${c.type}
**Position in the category :** ${c.position}
**Position in the server :** ${c.rawPosition}`,
			LOGS_GUILD_MEMBER_ADD_TITLE: "Arrival of a new member!",
			LOGS_GUILD_MEMBER_ADD_DESC: (m) => `${m} - **${m.user.tag}** joined **__${m.guild.name}__**!
There are now **${m.guild.memberCount}** members on the server!`,
			LOGS_GUILD_MEMBER_REMOVE_TITLE: "Departure of member!",
			LOGS_GUILD_MEMBER_REMOVE_DESC: (m) => `${m} - **${m.user.tag}** left **__${m.guild.name}__**!
There are now **${m.guild.memberCount}** members on the server!`,
			LOGS_CHANNEL_PINS_UPDATE_TITLE: "Modification of messages pinned in a channel!",
			LOGS_CHANNEL_PINS_UPDATE_DESC: (channel, time) => `**Salon :** ${channel.name} - ${channel} - ${channel.id}
**Modification to** ${moment(time).format("LLLL")}`,
			LOGS_CHANNEL_UPDATE_TITLE: "Modification of a channel!",
			LOGS_CHANNEL_UPDATE_DESC: (oldChannel, newChannel) => `**__Old channel :__**

**Name:** ${oldChannel.name}
**ID: ** ${oldChannel.id}
**Type of channel:** ${oldChannel.type}
**Subject of the channel ** ${oldChannel.topic ? `${oldChannel.topic}` : `No subject has been defined.`}

**__New channel:__**

**Name:** ${newChannel.name}
**ID: ** ${newChannel.id}
**Type of channel:** ${newChannel.type}
**Subject of the channel:** ${newChannel.topic ? `${newChannel.topic}` : `No subject has been defined.`}`,
			LOGS_EMOJI_CREATE_TITLE: "A new emoji has been added!",
			LOGS_EMOJI_CREATE_DESC: (emoji) => `**Name of emoji :** ${emoji.name}
**ID:** ${emoji.id}
**Type:** ${emoji.animated === true ? `Animated` : `Not animated`}
**Overview:** ${emoji}
**Date Added:** ${moment(emoji.createdAt.toUTCString()).format("LLLL")}
**Identify:** ${emoji.identifier}
**URL:** ${emoji.url}`,
			LOGS_EMOJI_DELETE_TITLE: "An emoji has been deleted!",
			LOGS_EMOJI_DELETE_DESC: (emoji) => `**Name of emoji :** ${emoji.name}
**ID:** ${emoji.id}
**Type:** ${emoji.animated === true ? `Animated` : `Not animated`}
**Date Added:** ${moment(emoji.createdAt.toUTCString()).format("LLLL")}
**Date of deletion:** ${moment(new Date()).format("LLLL")}
**Identify:** ${emoji.identifier}
**URL:** ${emoji.url}`,
			LOGS_EMOJI_UPDATE_TITLE: "Editing an emoji!",
			LOGS_EMOJI_UPDATE_DESC: (oldEmoji, newEmoji) => `**__Old emoji:__**

**Name:** ${oldEmoji.name}
**ID: ** ${oldEmoji.id}
**Date Added:** ${moment(oldEmoji.createdAt.toUTCString()).format("LLLL")}
**Identify:** ${oldEmoji.identifier}
**URL:** ${oldEmoji.url}

**__New emoji:__**

**Name:** ${newEmoji.name}
**ID: ** ${newEmoji.id}
**Overview:** ${newEmoji}
**Date Added:** ${moment(newEmoji.createdAt.toUTCString()).format("LLLL")}
**Date of modification:** ${moment(new Date()).format("LLLL")}
**Identify:** ${newEmoji.identifier}
**URL:** ${newEmoji.url}`,
			LOGS_GUILD_BAN_ADD_TITLE: "Someone has been banned from the server!",
			LOGS_GUILD_BAN_ADD_DESC: (user) => `**Username:** ${user.username}
**ID:** ${user.id}
**Bot:** ${user.bot ? "Affirmative" : "Negative, it's a human (Or a selfbot)"}
**Account creation:** ${moment(user.createdAt.toUTCString()).format("LLLL")}
**Banishment date:** ${moment(new Date()).format("LLLL")}`,
			LOGS_GUILD_BAN_REMOVE_TITLE: "Someone was unbanned from the server!",
			LOGS_GUILD_BAN_REMOVE_DESC: (user) => `**Username:** ${user.username}
**ID:** ${user.id}
**Bot:** ${user.bot ? "Affirmative" : "Negative, it's a human (Or a selfbot)"}
**Account creation:** ${moment(user.createdAt.toUTCString()).format("LLLL")}
**Unbanishment date:** ${moment(new Date()).format("LLLL")}`,
			LOGS_GUILD_CREATE_TITLE: (guild) => `Lycos has been added to ${guild.name}!`,
			LOGS_GUILD_CREATE_DESC: (guild, vl, r) => `**ID:** ${guild.id}
**Members:** ${guild.members.cache.filter(m => !m.user.bot).size}
**Owner:** ${guild.owner.user.tag} - ${guild.ownerID}
**Created the:** ${moment(guild.createdAt.toUTCString()).format("LLLL")}
**Verification level:** ${vl}
**Server location:** ${r}`,
			LOGS_GUILD_CREATE_FOOTER: (guilds) => ` - Currently on ${guilds} servers`,
			LOGS_GUILD_DELETE_TITLE: (guild) => `Lycos has been removed from ${guild.name}!`,
			LOGS_GUILD_DELETE_DESC: (guild, vl, r) => `**ID:** ${guild.id}
**Members:** ${guild.members.cache.filter(m => !m.user.bot).size}
**Owner:** ${guild.owner.user.tag} - ${guild.ownerID}
**Created the:** ${moment(guild.createdAt.toUTCString()).format("LLLL")}
**Verification level:** ${vl}
**Server location:** ${r}`,
			LOGS_GUILD_DELETE_FOOTER: (guilds) => ` - Currently on ${guilds} servers`,
			LOGS_GUILD_MEMBER_CHUNK_TITLE: "A whole regiment of members has just arrived from the same server!",
			LOGS_GUILD_MEMBER_CHUNK_DESC: (members, guild) => ``,
			LOGS_GUILD_MEMBER_UPDATE_TITLE: "A server member has undergone changes!",
			LOGS_GUILD_MEMBER_UPDATE_DESC: (oldMember, newMember) => `**__Before modifications of ${moment(new Date()).format("LLLL")}:__**
			
**Name:** ${oldMember.user.tag}
**ID:** ${oldMember.id}
**Account creation:** ${moment(oldMember.user.createdAt.toUTCString()).format("LLLL")}
**Joined the server the:** ${moment(oldMember.joinedAt.toUTCString()).format("LLLL")}
**Bannable**: ${oldMember.bannable === true ? "Yes" : "No"}
**Expulsable:** ${oldMember.kickable === true ? "Yes" : "No"}
**Nickname:** ${oldMember.nickname ? `${oldMember.displayName}` : "No surName"}
**Avatar:** ${oldMember.user.displayAvatarURL({ format: "png", dynamic: true })}
**Roles:** ${oldMember.roles.cache.size > 10 ? `${oldMember.roles.cache.map((r) => r).slice(0, 9).join(", ")} and ${oldMember.roles.cache.size - 10} other roles.` : (oldMember.roles.cache.size < 1) ? `No role` : `${oldMember.roles.cache.map((r) => r).join(", ")}`}

**__After modifications of the ${moment(new Date()).format("LLLL")}:__**
			
**Name:** ${newMember.user.tag}
**ID:** ${newMember.id}
**Account creation:** ${moment(newMember.user.createdAt.toUTCString()).format("LLLL")}
**Joined the server the:** ${moment(newMember.joinedAt.toUTCString()).format("LLLL")}
**Bannable:** ${newMember.bannable === true ? "Yes" : "No"}
**Expulsable:** ${newMember.kickable === true ? "Yes" : "No"}
**Nickname:** ${newMember.nickname ? `${newMember.displayName}` : "No surName"}
**Avatar:** ${newMember.user.displayAvatarURL({ format: "png", dynamic: true })}
**Roles:** ${newMember.roles.cache.size > 10 ? `${newMember.roles.cache.map((r) => r).slice(0, 9).join(", ")} and ${newMember.roles.cache.size - 10} other Roles.` : (newMember.roles.cache.size < 1) ? `No role` : `${newMember.roles.cache.map((r) => r).join(", ")}`}`,
			LOGS_MESSAGE_DELETE_DELETED_BY: "**Deleted by:**",
			LOGS_MESSAGE_DELETE_DELETED_BY_UNKNOWN: "I'm sorry, I didn't found who deleted the message...",
			LOGS_MESSAGE_DELETE_TITLE: "A message has been deleted!",
			LOGS_MESSAGE_DELETE_DESC: (message, deletedBy) => `**Message author :** ${message.author.tag} - ${message.author} - ${message.author.id}
${deletedBy}
**Message deleted in:** ${message.channel.name} - ${message.channel} - ${message.channel.id}
**Message deleted the:** ${moment(new Date()).format("LLLL")}
**Content of the message:** \`\`${message.content.length > 150 ? message.content.substring(0, 150) + "..." : message.content}\`\``,
			LOGS_MESSAGE_DELETE_BULK_TITLE: "Several messages have been deleted !",
			LOGS_MESSAGE_DELETE_BULK_DESC: () => ``,
			LOGS_MESSAGE_UPDATE_TITLE: "A message has been changed!",
			LOGS_MESSAGE_UPDATE_DESC: (oldMessage, newMessage) => `**Post author :** ${newMessage.author.tag} - ${newMessage.author} - ${newMessage.author.id}
**Channel:** ${newMessage.channel.name} - ${newMessage.channel} - ${newMessage.channel.id}
**Old message:** \`\`${oldMessage.content}\`\`
**New message:** \`\`${newMessage.content}\`\``,
			LOGS_ROLE_CREATE_TITLE: "A new role has been created!",
			LOGS_ROLE_CREATE_DESC: (role) => `**Name of the role:** ${role.name} - ${role}
**ID :** ${role.id}
**Created the:** ${moment(role.createdAt.toUTCString()).format("LLLL")}`,
			LOGS_ROLE_DELETE_TITLE: "A role has been deleted!",
			LOGS_ROLE_DELETE_DESC: (role) => `**Name of the role:** ${role.name}
**ID:** ${role.id}
**Created the:** ${moment(role.createdAt.toUTCString()).format("LLLL")}
**Deleted the:** ${moment(new Date()).format("LLLL")}`,
			LOGS_ROLE_UPDATE_TITLE: "A role has been changed!",
			LOGS_ROLE_UPDATE_DESC: (oldRole, newRole) => `**__Before modifications of ${moment(new Date()).format("LLLL")}:__**
			
**Name of the role:** ${oldRole.name}
**ID:** ${oldRole.id}
**Created the:** ${moment(oldRole.createdAt.toUTCString()).format("LLLL")}
**Position:** ${oldRole.position}
**Color:** ${oldRole.hexColor}
**Appears separately:** ${oldRole.hoist ? `Yes` : `No`}
**Mentionable:** ${oldRole.mentionable ? `Yes` : `No`}
**Permissions:** ${oldRole.permissions.toArray().length > 10 ? `${oldRole.permissions.toArray().map((r) => r).slice(0, 9).join(", ")} and ${oldRole.permissions.toArray().length - 10} other permissions.` : (oldRole.permissions.toArray().length < 1) ? `No permission` : `${oldRole.permissions.toArray().map((r) => r).join(", ")}`}

**__Après modifications du ${moment(new Date()).format("LLLL")}:__**
			
**Name of the role:** ${newRole.name} - ${newRole}
**ID:** ${newRole.id}
**Created the:** ${moment(newRole.createdAt.toUTCString()).format("LLLL")}
**Position:** ${newRole.position}
**Color:** ${newRole.hexColor}
**Appears separately:** ${newRole.hoist ? `Yes` : `No`}
**Mentionable:** ${newRole.mentionable ? `Yes` : `No`}
**Permissions:** ${newRole.permissions.toArray().length > 10 ? `${newRole.permissions.toArray().map((r) => r).slice(0, 9).join(", ")} and ${newRole.permissions.toArray().length - 10} other permissions.` : (newRole.permissions.toArray().length < 1) ? `No permission` : `${newRole.permissions.toArray().map((r) => r).join(", ")}`}`,
			LOGS_WEBHOOK_UPDATE_TITLE: `A webhook has been modified!`,
			LOGS_WEBHOOK_UPDATE_DESC: (channel) => `**Name of the channel:** ${channel.name} - ${channel}
**ID:** ${channel.id}`,
		};
		function date(date1) {
			let d = date1.split("-");
			let an = d[0];
			let mois = d[1];
			let jour = d[2];
			return `${jour}/${mois}/${an}`;
		}
	}

	/**
	 * The method to get language strings
	 * @param {string} term The string or function to look up
	 * @param {...*} args Any arguments to pass to the lookup
	 * @returns {string|Function}
	 */
	get(term, ...args) {
		const value = this.language[term];
		if (typeof value === "function") {
			return value(...args);
		}
		else {
			return value;
		}
	}
};