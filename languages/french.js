const e = require("../config.js").emotes;
const moment = require("moment-timezone");
moment.locale('fr');

module.exports = class {
	constructor(...args) {
		this.language = {
			NO_DESCRIPTION_PROVIDED: "Aucune description définie",
			NO_USAGE_PROVIDED: "Aucune utilisation définie",
			NO_EXAMPLES_PROVIDED: "Aucun exemple défini",
			ERROR: (error) => `Quelque chose s'est mal passé. Veuillez réessayer.\n\`\`\`\n${error}\`\`\``,
			ERROR_PERMISSIONS_TITLE: `${e.error} Permissions insuffisantes`,
			ERROR_PERMISSIONS_CONTENT: (lvl, rlvl) => `Cette commande nécessite le niveau d'autorisation \`${rlvl}\` et vous avez seulement le niveau \`${lvl}\` !`,
			ERROR_COMMAND_GUILDONLY: `${e.error} | Cette commande n'est pas disponible dans les messages privés!`,
			ERROR_NSFW_TITLE: `${e.nsfw} Commande NSFW`,
			ERROR_NSFW_CONTENT: "Cette commande doit être lancée dans un channel NSFW (+18)",
			ERROR_DISABLED_TITLE: `${e.error} Commande désactivée`,
			ERROR_DISABLED_CONTENT: "Cette commande est temporairement désactivée, seuls les administrateurs y ont actuellement accès..",
			ERROR_EVERYONE_TITLE: `${e.error} Sécurité`,
			ERROR_EVERYONE_CONTENT: "Nous avons détecté un @everyone dans votre message, mais vous n'avez pas la permission de mentionner @everyone dans les commandes.",
			ERROR_BOTPERMISSIONS_TITLE: `${e.error} Permissions manquantes`,
			ERROR_BOTPERMISSIONS_CONTENT: (perm) => `Les permissions suivantes sont requises pour que cette commande fonctionne correctement: ${perm}`,
			ERROR_SPECIFY_USER: "S'il vous plaît spécifier un utilisateur.",
			ERROR_ROLE_INVALID: "Rôle invalide.",
			ERROR_NOUSER_FOUND: "Aucun utilisateur n'a été trouvé.",
			ERROR_MUCH_USERS_FOUND: "Il y a tellement d'utilisateurs trouvés, soyez plus précis.",
			ERROR_NSFW_DEACTIVATED: "Cette commande n'est pas disponible car le module ``NSFW`` n'est pas disponible sur ce serveur.\nDemandez à un administrateur du serveur de l'activer.",
			ERROR_FORTNITE_PLATFORM: "S'il vous plaît entrer une plateforme valide (pc, xbox, psn).",
			ERROR_FORTNITE_PLATFORM_USER_NOT_FOUND: "Cet utilisateur n'a pas été trouvé sur la plate-forme spécifiée.",
			GIVEAWAY_DESCRIPTION: "Permet de gérer les giveaways facilement !",
			GIVEAWAY_USAGE: (prefix) => `${prefix}giveaway [start/edit/reroll/end/delete]`,
			GIVEAWAY_EXAMPLES: (prefix) => `${prefix}giveaway start 2h 5 5 Discord Nitro\n${prefix}giveaway edit 665556886732668949 -1h 1 1 Discord Nitro\n${prefix}giveaway reroll 665556886732668949 2\n${prefix}giveaway end 665556886732668949\n${prefix}giveaway delete 665556886732668949`,
			GIVEAWAY_NO_METHOD: (prefix) => `Merci d'indiquer ce que vous voulez faire :\n${prefix}giveaway start (Durée) (Nombre de gagants) (Prix à gagner)\n${prefix}giveaway edit (messageID) (Durée) (Nombre de gagants) (Prix à gagner)\n${prefix}giveaway end (messageID) (Nombre de gagants à relancer)\n${prefix}giveaway delete (messageID)`,
			GIVEAWAY_NO_TIME: "Merci d'indiquer une durée !",
			GIVEAWAY_NO_WINNERCOUNT: "Merci d'indiquer le nombre de gagnants !",
			GIVEAWAY_NO_PRIZE: "Merci d'indiquer quelque chose à gagner !",
			GIVEAWAY_ERR_NO_ID: "Vous devez entrer l'ID du message du giveaway!",
			GIVEAWAY_ERR_REROLL_MSG_ENDED: (messageID) => `Aucun giveaway **terminé** trouvé avec l'ID de message \`${messageID}\``,
			GIVEAWAY_ERR_MESSAGE_NOT_FOUND: (messageID) => `Aucun giveaway trouvé avec l'ID de message \`${messageID}\``,
			GIVEAWAY_REROLL_NO_WINNERSCOUNT: "Veuillez indiquer le nombre de gagants à tirer !",
			GIVEAWAY_NO_NEWTIME: "Veuillez indiquer la modification de temps",
			GIVEAWAY_CREATE_MESSAGES: {
				timeRemaining: "Temps restant : **{duration}** !",
				inviteToParticipate: "Réagis avec 🎉 pour participer !",
				winMessage: "Bravo {winners} ! Vous avez gagné **{prize}** !",
				embedFooter: "Giveaways",
				noWinner: "Giveaway annulé, aucune participation valide.",
				winners: "gagnant(s)",
				endedAt: "Se termine à",
				units: {
					seconds: "secondes",
					minutes: "minutes",
					hours: "heures",
					days: "jours"
				},
			},
			GIVEAWAY_REROLL_MESSAGES: {
				congrat: "Nouveau(x) gagnant(s) : {winners}! Félicitations!",
				error: "Aucune inscription valide, aucun gagnant ne peut être choisi!",
			},
			LANGUAGE_DESCRIPTION: "Change la langue de Lycos.",
			LANGUAGE_USAGE: ".language <language>",
			LANGUAGE_EXAMPLES: ".language french",
			LANGUAGE_INFO: (language, prefix) => `Ma langue sur ce serveur est \`${language}\` !\n> Pour changer la langue, répondez avec \`\`set\`\`\n> Pour voir mes différentes langues, répondez par \`\`list\`\``,
			LANGUAGE_LIST: (languages) => `Je suis disponible en \`${languages.join("\`, \`")}\`.`,
			LANGUAGE_SUPPLY: "Répondez avec la langue dans laquelle vous voulez mettre le bot",
			LANGUAGE_ALREADY_SET: (lang) => `Je suis déjà en \`${lang.toLowerCase()}\`.`,
			LANGUAGE_GUILD_INFO: (lang) => `La langue sur ce serveur est maintenant \`${lang.toLowerCase()}\`.`,
			ERROR_LANGUAGE_INCORRECT: "Je ne pense pas que je connaisse cette langue. Pouvez-vous m'aider à l'apprendre ?",
			MODULES_DESCRIPTION: "Traduire Lycos dans une autre langue.",
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
			POLL_DESCRIPTION: "Faire un sondage pour les membres de votre serveur.",
			POLL_USAGE: (prefix) => `${prefix}poll [Question]`,
			POLL_EXAMPLES: (prefix) => `${prefix}poll Lycos est-il un bon bot ? (Répondez non et vous serez banni c:)`,
			POLL_TEXT_NULL: "Vous devez insérer un texte pour faire un sondage.",
			POLL_REACT: "Réagissez avec les réactions en bas pour entrer dans le sondage.",
			PREFIX_DESCRIPTION: "Gérer le préfixe de bot sur le serveur.",
			PREFIX_USAGE: ".prefix set <prefix>\n.prefix reset",
			PREFIX_EXAMPLES: ".prefix set d.\n.prefix reset",
			PREFIX_INFO: (prefix) => `Mon préfixe sur ce serveur est \`${prefix}\` ! \n> Pour changer ce préfixe répondez avec \`set\`\n> Pour réinitialiser ce préfixe, répondez avec \`reset\``,
			PREFIX_NULL: "Répondez avec le préfixe que vous voulez attribuer au bot",
			PREFIX_CHANGE: (pref) => `Le préfixe est maintenant \`${pref}\`.`,
			PREFIX_RESET: "Le préfixe a été réinitialisé. Il est maintenant `.`",
			ROLE_DESCRIPTION: "Gérer les rôles facilement.",
			ROLE_USAGE: ".role <add/remove> <user> <role>",
			ROLE_EXAMPLES: ".role add Lycos @Role/ID",
			ROLE_INFO: (prefix) => `> Pour ajouter un rôle à un utilisateur, faites \`${prefix}role add <user> <role>\` \n> Pour supprimer un rôle à un utilisateur, faites \`${prefix}role remove <user> <role>\``,
			ROLE_NOUSER_FOUND: "Aucun utilisateur n'a été trouvé.",
			ROLE_GIVE: (member, role) => `${member.user.username} a maintenant le rôle <@&${role}>.`,
			ROLE_REMOVE: (member, role) => `${member.user.username} n'a plus le rôle <@&${role}>.`,
			BOT_DESCRIPTION: "Afficher des informations sur Lycos.",
			BOT_USAGE: (prefix) => `${prefix}bot`,
			BOT_EXAMPLES: (prefix) => `${prefix}bot`,
			BOT_FIELDS: [
				"Informations générales",
				"Statistiques générales",
				"Autres renseignements",
				"\u200B",
			],
			BOT_FIELDS_CONTENT_GENERALINFO: (message, version) => `**Créateur :** \`${message.bot.users.cache.get("169146903462805504").tag}\`\n**Développeurs :** \`${message.bot.users.cache.get("153163308801720321").tag}\`\nCréé le \`12/12/2017\`, le bot tourne actuellement sur la version \`${version}\`.`,
			BOT_FIELDS_CONTENT_GENERALSTATS: (guilds, users, channels) => `** Nombre de serveurs :** \`${guilds}\`.\n**Utilisateurs :** \`${users}\` en mémoire.\n**Nombre de salons :** \`${channels}\`.`,
			BOT_FIELDS_CONTENT_OTHERINFO: (process, moment, message) => `**Machine :** \`${process.platform}\` - \`(${process.arch})\` \n**TAS :** \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\`\n**Durée de connection du bot :** \`${moment.duration(message.bot.uptime).format("M[m] W[w] D[d] H[h] m[m] s[s]")}\``,
			BOT_FIELDS_CONTENT_LINKS: "[Invitation](https://discordapp.com/oauth2/authorize?client_id=390231727554953216&scope=bot&permissions=0) - [Server](https://discord.gg/ZvJpUpt) - [Dons](https://paypal.me/denverbot) - [Site](https://denverbot.fr/) - [Vote](https://discordbots.org/bot/390231727554953216) - [Twitter](https://twitter.com/BOT_Denver)",
			HELP_DESCRIPTION: "Affiche la liste des commandes",
			HELP_USAGE: (prefix) => `${prefix}help (commande)`,
			HELP_EXAMPLES: (prefix) => `${prefix}help\n${prefix}help ping`,
			HELP_NOT_FOUND: (args) => `${e.error} | La commande \`${args}\` n'existe pas!`,
			HELP_TITLE: (command) => `Help : ${command}`,
			HELP_TITLE1: (category) => `Catégorie : ${category}`,
			HELP_EMBED_DESCRIPTION: (message) => `Bonjour, voici la documentation de Lycos.`,//Certaines commandes ne sont pas disponible sur la documentation parce qu'elles doivent être activer.\nPour voir ce que vous pouvez activer faites \`${message.settings.prefix}modules\`.
			HELP_FIELDS: [
				"Description",
				"Usage",
				"Exemples",
				"Niveau requis",
			],
			HELPGLOBAL_FIELDS: [
				"Administration",
				"Modération",
				"Général",
				"Divertissement",
				"Stream",
				"Statistiques de jeux",
				"Musique",
			],
			HELPGLOBAL_TITLE: "Help Menu",
			INVITE_DESCRIPTION: "Donne l'invitation pour ajouter le bot sur un serveur",
			INVITE_USAGE: (prefix) => `${prefix}invite`,
			INVITE_EXAMPLES: (prefix) => `${prefix}invite`,
			INVITE_TITLE: "Invitation",
			INVITE_FIELD: "[Clique ici](https://discordapp.com/oauth2/authorize?client_id=628186022991233025&scope=bot&permissions=8) pour inviter le bot sur ton serveur.",
			PING_DESCRIPTION: "Donne la latence de l'API Discord",
			PING_USAGE: (prefix) => `${prefix}ping`,
			PING_EXAMPLES: (prefix) => `${prefix}ping`,
			PING_PONG: "Pong !",
			PING_APILATENCY: "Latence API",
			CAT_DESCRIPTION: "Amusez-vous en regardant des images de chat.",
			CAT_USAGE: (prefix) => `${prefix}cat`,
			CAT_EXAMPLES: (prefix) => `${prefix}cat`,
			DOG_DESCRIPTION: "Amusez-vous en regardant des images de chien.",
			DOG_USAGE: (prefix) => `${prefix}dog`,
			DOG_EXAMPLES: (prefix) => `${prefix}dog`,
			AVATAR_DESCRIPTION: "Donne l'avatar de l'utilisateur demandé.",
			AVATAR_USAGE: (prefix) => `${prefix}avatar (@user/ID)`,
			AVATAR_EXAMPLES: (prefix) => `${prefix}avatar @Lycos\n ${prefix}avatar 628186022991233025`,
			AVATAR_TITLE: (looked) => `Avatar de ${looked.user.username}`,
			SERVERINFO_PROFIL: (guild) => `Informations sur le serveur | ${guild}`,
			SERVERINFO_DESCRIPTION: "Affiche les informations du serveur.",
			SERVERINFO_USAGE: (prefix) => `${prefix}serverinfo`,
			SERVERINFO_EXAMPLES: (prefix) => `${prefix}serverinfo`,
			SERVERINFO_REGIONS: [
				":flag_br: Brésil",
				":flag_eu: Europe Centrale",
				":flag_sg: Singapour",
				":flag_us: USA - Centre",
				":flag_au: Sydney",
				":flag_us: USA - Est",
				":flag_us: USA - Sud",
				":flag_us: USA - Ouest",
				":flag_eu: Europe de l'Ouest",
				":flag_us: USA - Est VIP",
				":flag_gb: Londres",
				":flag_nl: Amsterdam",
				":flag_hk: Hong Kong",
				":flag_ru: Russie",
				":flag_za: Afrique du Sud",
				":flag_eu: Europe"
			],
			SERVERINFO_TITLES: [
				"Nom",
				"Création",
				"Total | Humains | Bots",
				"Salons",
				"ID",
				"Propriétaire",
				"Région",
				"Niveau de vérification",
			],
			USERINFO_DESCRIPTION: "Affiche les informations sur l'utilisateur.",
			USERINFO_USAGE: (prefix) => `${prefix}userinfo (@user)`,
			USERINFO_EXAMPLES: (prefix) => `${prefix}userinfo @Lycos`,
			USERINFO_TITLES: [
				"Nom",
				"En train de jouer",
				"ID",
				"Statut",
				"Rôles",
			],
			USERINFO_STATUS: [
				"En ligne",
				"Hors ligne",
				"Idle",
				"Ne pas déranger",
			],
			USERINFO_NOPLAY: "Aucun jeu",
			USERINFO_PROFIL: "Profil de ",
			MESSADEDELETE_DESC: "Message effacé",
			MESSADEDELETE_FIELD: [
				"Channel",
				"Contenu",
				"ID",
				"Utilisateur",
				"Message",
			],
			MESSAGEUPDATE_DESC: "Message mis à jour",
			MESSAGEUPDATE_FIELD: [
				"Channel",
				"Aller au message",
				"À présent",
				"Nouveau",
				"ID",
				"Utilisateur",
				"Message",
			],
			PARTNERS_DESCRIPTION: "Affiche les partenaires de Lycos.",
			PARTNERS_USAGE: (prefix) => `${prefix}partners`,
			PARTNERS_EXAMPLES: (prefix) => `${prefix}partners`,
			PARTNERS_TITLE: "Partenaires de lycos",
			PARTNERS_EMBED_DESC: "Ici sont listés les partenaires de Lycos accompagné d'une brève description.",
			PARTNERS_NAMES: ["Lycos n'a actuellement aucun partenaire."],
			PARTNERS_VALUES: ["Pour toute demande de partenariat, veuillez contacter notre équipe [Marketing](https://discord.gg/7UwmMA3)."],
			SPONSORS_DESCRIPTION: "Affiche les sponsors de Lycos",
			SPONSORS_USAGE: (prefix) => `${prefix}sponsors`,
			SPONSORS_EXAMPLES: (prefix) => `${prefix}sponsors`,
			SPONSORS_TITLE: "Sponsors de lycos",
			SPONSORS_EMBED_DESC: "Ici sont listés les sponsors de Lycos.",
			SPONSORS_NAMES: ["Lycos n'a actuellement aucun sponsors."],
			SPONSORS_VALUES: ["Pour devenir sponsor, veuillez référer à [...](https://discord.gg/7UwmMA3)."],
			ANIME_DESCRIPTION: "Cherchez les meilleurs animes.",
			ANIME_USAGE: (prefix) => `${prefix}anime [animeName]`,
			ANIME_EXAMPLES: (prefix) => `${prefix}anime Dragon Ball`,
			ANIME_NOTFOUND: "Vous devez inclure un nom d'anime.",
			ANIME_TITLES: [
				"Nom Anglais",
				"Nom Japonais",
				"Type",
				"Episodes",
				"Genre",
				"Popularité",
				"Score",
			],
			FORTNITE_DESCRIPTION: "Regardez vos statistiques Fortnite pour être compétitif.",
			FORTNITE_USAGE: (prefix) => `${prefix}fortnite [platforme] [pseudo]`,
			FORTNITE_EXAMPLES: (prefix) => `${prefix}fortnite pc Ninja`,
			FORTNITE_PLATFORM: "S'il vous plaît entrer le nom de votre plate-forme (pc, xbox, psn).",
			FORTNITE_USERNAME_NULL: "Merci d'entrer un nom d'utilisateur.",
			FORTNITE_PLAYER_NOT_FOUND: "Joueur non trouvé.",
			FORTNITE_PLAYER_STATS: (data) => `Statistiques de ${data.username}`,
			FORTNITE_FIELDS: [
				"Kills",
				"Parties jouées",
				"Victoires",
				"Ratio de kills par partie",
			],
			FORTNITE_FIELDS_CONTENT_KILL: (data) => `${data.stats.lifetime.kills} (${data.stats.squad["kills"]} dans la section, ${data.stats.duo["kills"]} en duo, ${data.stats.solo["kills"]} en solo)`,
			FORTNITE_FIELDS_CONTENT_MATCHSPLAYED: (data) => `${data.stats.lifetime.matches} (${data.stats.squad["matches"]} dans la section, ${data.stats.duo["matches"]} en duo, ${data.stats.solo["matches"]} en solo)`,
			FORTNITE_FIELDS_CONTENT_VICTORIES: (data) => `${data.stats.lifetime.wins} (${data.stats.squad["wins"]} dans la section, ${data.stats.duo["wins"]} en duo, ${data.stats.solo["wins"]} en solo)`,
			APEX_PLATFORM: "S'il vous plaît entrer le nom de votre plate-forme (pc, xbox, ps4).",
			APEX_ERROR_PLATFORM: "S'il vous plaît entrer une plate-forme valide (pc, xbox, ps4).",
			APEX_USERNAME_NULL: "Merci d'entrer un nom d'utilisateur.",
			OSU_DESCRIPTION: "Regardez vos statistiques Osu!.",
			OSU_USAGE: (prefix) => `${prefix}osu [pseudo]`,
			OSU_EXAMPLES: (prefix) => `${prefix}osu LavaPower`,
			OSU_SUPPLY_PLAYER: "Répondez avec un nom d'utilisateur.",
			OSU_USER_NOT_FOUND: "Je n'ai pas pu trouver ce joueur.",
			OSU_EMBED_AUTHOR: (user) => `Profil Osu! de ${user.name} (ID: ${user.id}) | ${user.country}`,
			OSU_FIELDS: [
				"A commencé à jouer le",
				"Niveau",
				"Précision",
				"Points de performance",
				"Score",
				"Notes",
				"Nombre de parties jouées"
			],
			OSU_JOINED_DATE: (user) => `${moment(user.raw_joinedDate).format("LLLL")} et à joué pendant`,
			OSU_PP: (user) => `Points total en classé : ${user.pp.raw} - Rang mondial : ${user.pp.rank} - Rang national : ${user.pp.countryRank}`,
			OSU_SCORES: (user) => `Classé : ${user.scores.ranked} points - Total : ${user.scores.total} points`,
			OSU_COUNTS: (user) => `50 : ${user.counts['50']} - 100 : ${user.counts['100']} - 300 : ${user.counts['300']}
A : ${user.counts.A} - S : ${user.counts.S} - SH : ${user.counts.SH} - SS : ${user.counts.SS} - SSH :${user.counts.SSH}`,
			QRCODE_DESCRIPTION: "Génère un QRCode contenant le texte indiqué",
			QRCODE_USAGE: (prefix) => `${prefix}qrcode [text]`,
			QRCODE_EXAMPLES: (prefix) => `${prefix}qrcode Code secret`,
			QRCODE_MESSAGE: "Vous devez inclure quelque chose à convertir en un QR Code.",
			ROLE_INFO_DESCRIPTION: "Affiche les informations du rôle indiqué.",
			ROLE_INFO_USAGE: (prefix) => `${prefix}role-info [@Role/ID]`,
			ROLE_INFO_EXAMPLES: (prefix) => `${prefix}role-info @Membres\ ${prefix}role-info 699011821654507572`,
			ROLE_INFO_SPECIFY: "Veuillez spécifier un rôle.",
			ROLE_INFO_NOT_FOUND: "Je ne trouve pas ce rôle.",
			ROLE_INFO_FIELDS: [
				"Couleur",
				"Position",
				"Mentionnable",
				"Date de création",
			],
			ROLE_INFO_ID: (role) => `ID du rôle : ${role.id}`,
			ROLE_INFO_EMBED_NAME: (role) => `Informations à propos du role ${role.name}`,
			FLIP_DESCRIPTION: "Amusez-vous à jouer avec le flip.",
			FLIP_USAGE: (prefix) => `${prefix}flip`,
			FLIP_EXAMPLES: (prefix) => `${prefix}flip`,
			FLIP_HEADS: ":game_die: | C'est **face** !",
			FLIP_TAILS: ":game_die: | C'est **pile** !",
			PERMISSIONS_DESCRIPTION: "Affiche les permissions d'un membre dans le salon",
			PERMISSIONS_USAGE: (prefix) => `${prefix}permissions (@member)`,
			PERMISSIONS_EXAMPLES: (prefix) => `${prefix}permissions\n${prefix}permissions @user#1234`,
			PERMISSIONS_TITLE: (username, channel) => `Permissions de ${username} dans #${channel}`,
			PURGE_DESCRIPTION: "Permet de supprimer plusieurs messages à la fois.",
			PURGE_USAGE: (prefix) => `${prefix}purge [NombreDeMessage]`,
			PURGE_EXAMPLES: (prefix) => `${prefix}purge 28`,
			PURGE_SPECIFY_AMOUNT: "Tu dois spécifier un montant à supprimer!",
			PURGE_TOO_MUCH_AMOUNT: "Je ne peux pas supprimer plus de 100 messages.",
			BAN_DESCRIPTION: "Bannit l'utilisateur mentionné",
			BAN_USAGE: (prefix) => `${prefix}ban [@user] (reason)`,
			BAN_EXAMPLES: (prefix) => `${prefix}ban @Lycos Spam`,
			BAN_ERRORARGS: "Merci d'indiquer un utilisateur à bannir !",
			BAN_ALREADY: "Cet utilisateur est déjà banni !",
			BAN_BANNABLE: "Je ne peux pas bannir cet utilisateur, veuillez vérifier ses rôles et ses permissions",
			BAN_NOREASON: "Merci d'indiquer une raison",
			BAN_ERROR: "Je ne peux ban car : ",
			BAN_INFO: (member, message) => `${member} a été banni(e) par ${message.author}`,
			UNBAN_INFO: (member, message) => `${member} a été débanni(e) par ${message.author}`,
			UNBAN_ERROR: "Je ne peux ban car : ",
			UNBAN_NOT_BANNED: "Cet utilisateur n'est banni !",
			UNBAN_DESCRIPTION: "Débannit l'utilisateur indiqué",
			UNBAN_USAGE: (prefix) => `${prefix}unban [UserID]`,
			UNBAN_EXAMPLES: (prefix) => `${prefix}unban 628186022991233025`,
			UNBAN_ERRORARGS: "Merci d'indiquer un utilisateur à débannir !",
			KICK_DESCRIPTION: "Expulse l'utilisateur mentionné",
			KICK_USAGE: (prefix) => `${prefix}kick [@user] (reason)`,
			KICK_EXAMPLES: (prefix) => `${prefix}kick @Lycos Spam`,
			KICK_ERRORARGS: "Merci d'indiquer un utilisateur!",
			KICK_BANNABLE: "Je ne peux pas expulser cet utilisateur, veuillez vérifier ses rôles et ses permissions",
			KICK_NOREASON: "Merci d'indiquer une raison",
			KICK_ERROR: "Je n'ai pas pu expulser l'utilisateur car: ",
			KICK_INFO: (member, message) => `${member} a été expulsé(e) par ${message.author}`,
			FUCKMYLIFE_DESCRIPTION: "Histoires marrantes sur la vie de tous les jours",
			FUCKMYLIFE_USAGE: (prefix) => `${prefix}fuck-my-life | ${prefix}fml`,
			FUCKMYLIFE_EXAMPLES: (prefix) => `${prefix}fuck-my-life | ${prefix}fml`,
			NSFW_URL: "Si l'image ne s'affiche pas cliquez ici.",
			WEATHERINFO_DESCRIPTION: "Affiche la météo de la ville demandée",
			WEATHERINFO_USAGE: (prefix) => `${prefix}weather-info [Nom/Code Postal]`,
			WEATHERINFO_EXAMPLES: (prefix) => `${prefix}weather-info Paris`,
			WEATHERINFO_NO_CITY: "merci d'indiquer un nom de ville ou un code postal.",
			WEATHERINFO_NOT_FOUND: "Impossible de trouver les données météo pour cette ville.",
			WEATHER_LANGUAGE: "fr-FR",
			WEATHERINFO_EMBED_TITLE: (result) => `Météo de ${result[0].location.name} le ${result[0].current.day} ${date(result[0].current.date)} à ${result[0].current.observationtime}`,
			WEATHERINFO_EMBED_DESCRIPTION: (result) => `**Coordonnées** - __Longitude :__ ${result[0].location.long} - __Latitude :__ ${result[0].location.lat}
**Météo :** ${result[0].current.skytext}
**Température :** ${result[0].current.temperature}°C
**Ressenti :** ${result[0].current.feelslike}°C
**Humidité :** ${result[0].current.humidity}%
**Vent :** ${result[0].current.winddisplay}
**Zone horaire :** UTC${result[0].location.timezone >= 0 ? `+${result[0].location.timezone}` : `${result[0].location.timezone}`}

**__Prévisions du ${result[0].forecast[0].day} ${date(result[0].forecast[0].date)}__**

**Température Max/Min** : ${result[0].forecast[0].high}°C/${result[0].forecast[0].low}°C
**Météo :** ${result[0].forecast[0].skytextday}
**Précipitaitons :** ${result[0].forecast[0].precip !== "" ? `${result[0].forecast[0].precip}` : `0`}%

**__Prévisions du ${result[0].forecast[1].day} ${date(result[0].forecast[1].date)}__**

**Température Max/Min** : ${result[0].forecast[1].high}°C/${result[0].forecast[1].low}°C
**Météo :** ${result[0].forecast[1].skytextday}
**Précipitations :** ${result[0].forecast[1].precip}%

**__Prévisions du ${result[0].forecast[2].day} ${date(result[0].forecast[2].date)}__**

**Température Max/Min** : ${result[0].forecast[2].high}°C/${result[0].forecast[2].low}°C
**Météo :** ${result[0].forecast[2].skytextday}
**Précipitations :** ${result[0].forecast[2].precip}%

**__Prévisions du ${result[0].forecast[3].day} ${date(result[0].forecast[3].date)}__**

**Température Max/Min** : ${result[0].forecast[3].high}°C/${result[0].forecast[3].low}°C
**Météo :** ${result[0].forecast[3].skytextday}
**Précipitations :** ${result[0].forecast[3].precip}%

**__Prévisions du ${result[0].forecast[4].day} ${date(result[0].forecast[0].date)}__**

**Température Max/Min** : ${result[0].forecast[4].high}°C/${result[0].forecast[4].low}°C
**Météo :** ${result[0].forecast[4].skytextday}
**Précipitations :** ${result[0].forecast[4].precip}%`,
			RPS_DESCRIPTION: "Jeu de pierre, feuille, ciseaux",
			RPS_USAGE: (prefix) => `${prefix}rps [pierre/feuille/ciseaux]`,
			RPS_EXAMPLES: (prefix) => `${prefix}rps pierre`,
			RPS_LYCOS_CHOICE: (choixO) => `Choix de Lycos : ${choixO}`,
			RPS_MATCH_EQUAL: `:flag_white: | Match nul !`,
			RPS_PLAYER_WIN: (message) => `:dagger: | Victoire de ${message.author.username} !`,
			RPS_LYCOS_WIN: `:skull_crossbones: | Victoire de Lycos !`,
			RPS_CHOICES: "Choisissez entre `pierre`, `feuille` et `ciseaux`",
			SUPPORT_DESCRIPTION: "Permet de contacter le support du bot en cas de problème",
			SUPPORT_USAGE: (prefix) => `${prefix}support [Problème]`,
			SUPPORT_EXAMPLES: (prefix) => `${prefix}support Bonjour, j'ai cru trouver un bug dans votre bot. `,
			SUPPORT_NO_ARGS: "Veuillez décrire votre problème avec au moins 10 cractères et 1900 au maximum.",
			SUPPORT_QUESTION_SEND: "Votre question a été envoyée au support. Veuillez attendre une réponse.",
			NUMBER_DESCRIPTION: "Tire un nombre aléatoire dans un intervalle donné (Min et max inculs : [min;max])",
			NUMBER_USAGE: (prefix) => `${prefix}number [min] [max] [temps]`,
			NUMBER_EXAMPLES: (prefix) => `${prefix}number 1 50 1m`,
			NUMBER_MIN: "Vous devez indiquer le nombre minimal de l'intervalle de recherche. Celui-ci ne peut pas être 0",
			NUMBER_MAX: "Vous devez indiquer le nombre maximal de l'intervalle de recherche. Celui-ci ne peut pas être 0",
			NUMBER_MIN_LOWER: "Le nombre minimal de l'intervalle de recherche ne peut pas être plus petit que le nombre maximal !",
			NUMBER_TIME: "Vous devez indiquer la durée de la recherche.",
			NUMBER_START: (min, max, time) => `C'est parti ! Vous avez ${time} pour trouver un nombre (entier) entre ${min} et ${max} ([${min};${max}]).`,
			NUMBER_INTERVAL: (min, max) => `Ce nombre n'est pas dans l'intervalle de recherche, le nombre à trouver est entre ${min} et ${max} ([${min};${max}]).`,
			NUMBET_HIGHER: "C'est plus !",
			NUMBER_LOWER: "C'est moins !",
			NUMBER_WINNER: (author) => `Bravo à ${author} qui a touvé le bon nombre !`,
			NUMBER_END: (collected) => `C'est terminé ! Il y a eu ${collected.size} tentatives lors de cette partie.`,
			BLAGUE_DESCRIPTION: "Raconte une blague",
			BLAGUE_USAGE: (prefix) => `${prefix}blague`,
			BLAGUE_EXAMPLES: (prefix) => `${prefix}blague`,
			BLAGUE_NOT_AVALIABLE: "Cette commande n'est pas encore disponible dans votre langue, désolé...",
			BLAGUE_QUESTION: "Question",
			BLAGUE_ANSWER: "Réponse",
			BLAGUE_FOOTER: (type, id) => `Type : ${type}, ID : ${id}`,
			SAY_DESCRIPTION: "Fait parler le bot",
			SAY_USAGE: (prefix) => `${prefix}say [Texte]`,
			SAY_EXAMPLES: (prefix) => `${prefix}say Bonjour je m'appelle Lycos !`,
			SAY_NO_ARGS: "Vous devez écrire un message à envoyer !",
			SAY_TOO_LONG: "Votre message est trop long !",
			SAY_EVERYONE: "Vous ne pouvez pas mentionner ``everyone`` !",
			SAY_EMBED_DESCRIPTION: "Fait parler le bot dans un embed",
			SAY_EMBED_USAGE: (prefix) => `${prefix}say [Texte]`,
			SAY_EMBED_EXAMPLES: (prefix) => `${prefix}say Bonjour je m'appelle Lycos !`,
			REPORT_DESCRIPTION: "Permet de signaler un membre",
			REPORT_USAGE: (prefix) => `${prefix}report [@User/ID] [Raison]`,
			REPORT_EXAMPLES: (prefix) => `${prefix}report @Lycos Ce membre s'amuse à spam dans les salons`,
			REPORT_NOT_SET: "Le salon de réception des signalements n'a pas été défini, la commande est donc désactivée.",
			REPORT_NOREASON: "Vous devez indiquer une raison à votre signalement.",
			REPORT_SAMEUSER: "Vous ne pouvez pas vous signaler vous-même.",
			REPORT_TITLE: "Signalement de ",
			REPORT_NAME: (member) => `${member.user.tag} a été signalé pour :`,
			REPORT_ERRORARGS: "Vous devez indiquer une personne à signaler !",
			PLAY_DESCRIPTION: "Joue la musique demandée",
			PLAY_USAGE: ".play [Musique/Lien]",
			PLAY_EXAMPLES: ".play Our Last Night - Younger Dreams",
			PLAY_NO_VOICECHANNEL: "Vous devez être dans un salon vocal pour jouer de la musique",
			PLAY_BOT_CANT_CONNECT: "Je ne peux pas me connecter au salon, vérifiez que j'aie la permission requise !",
			PLAY_BOT_CANT_SPEAK: "Je ne peux pas parler dans ce salon, vérifiez que j'aie la permission requise !",
			PLAY_NO_ARGS: "Veuillez indiquer une musique à jouer",
			ANSWER_UNKNOWN_ID: (args) => `La demande de support avec l'ID \`${args}\` est introuvable.`,
			ANSWER_SENT: `Votre réponse a été envoyée avec succès.`,
			RELOAD_NO_COMMAND: "Vous devez indiquer une commande a reload",
			RELOAD_ERROR_UNLOADING: (response) => `Erreur déchargement : ${response}`,
			RELOAD_ERROR_LOADING: (response) => `Erreur chargement : ${response}`,
			RELOAD_COMMAND_RELOADED: (commandName) => `The command \`${commandName}\` has been reloaded`,
			RELOAD_COMMAND_DOESNT_EXIST: (args) => `The command \`${args[0]}\` doesn't seem to exist. Try again!`,
			ERROR_CREATING_ROLE: "Je n'ai pas pu créer le rôle ``muted``. Vérifiez que j'aie la permission requise !",
			MUTE_DESCRIPTION: "Mute le membre choisi",
			MUTE_USAGE: (prefix) => `${prefix}mute [@User ou UserID] [Durée] [Raison]`,
			MUTE_EXAMPLE: (prefix) => `${prefix}mute @Lycos 1d Spam emotes`,
			MUTE_ERRORARGS: "Merci d'indiquer un utilisateur à mute !",
			MUTE_NO_MUTETIME: "Tu n'as pas spécifié de temps !",
			MUTE_USER_ALREADY_MUTED: "Cet utilisateur est déjà mute !",
			MUTE_UNMUTABLE: "Cet utilisateur ne peut pas être mute !",
			MUTE_NOREASON: "Tu n'as pas indiqué de raison au mute !",
			MUTE_ERROR: "Je n'ai pas pu mute car :",
			MUTE_INFO: (member, message) => `${member} a été mute par ${message.author}`,
			MUTE_USER_MESSAGE: (message, muteTime, reason) => `Yo ! Tu es désormais mute sur **${message.guild.name}** pour **${reason}** pendant **${muteTime}**.`,
			UNMUTE_DESCRIPTION: "Unmute le membre choisi",
			UNMUTE_USAGE: (prefix) => `${prefix}unmute [@User ou UserID]`,
			UNMUTE_EXAMPLE: (prefix) => `${prefix}unmute @Lycos`,
			UNMUTE_USER_NOT_MUTED: "Ce membre n'est pas mute !",
			UNMUTE_SUCCESS: (member) => `${member} a été unmute avec succès !`,
			UNMUTE_USER_SUCCESS: (message) => `Tu as été unmute de **${message.guild.name}**, désolé du dérangement !`,
			UNMUTE_ERROR: "Je n'ai pas pu unmute car :",
			CLEAR_DESCRIPTION: "Supprime tous les message visibles dans le salon",
			CLEAR_USAGE: (prefix) => `${prefix}clear`,
			CLEAR_EXAMPLE: (prefix) => `${prefix}clear`,
			ROLEMENTION_DESCRIPTION: "Mentionne le rôle demandé",
			ROLEMENTION_USAGE: (prefix) => `${prefix}rolemention [ID/Nom]`,
			ROLEMENTION_EXAMPLES: (prefix) => `${prefix}rolemention 627956962008629279\n${prefix}rolemention Developers`,
			ROLEMENTION_ROLE_NOT_FOUND: "Aucun rôle trouvé",
			ROLEMENTION_ROLE_HIGHEST: "Ce rôle est supérieur au mien, je ne peux donc pas le mentionner.",
			EMOTES_DESCRIPTION: "Donne la liste des emojis du serveur",
			EMOTES_USAGE: (prefix) => `${prefix}emotes`,
			EMOTES_EXAMPLES: (prefix) => `${prefix}emotes`,
			EMOTES_TITLE: "Liste des émojis du serveur",
			EMOTES_TITLES: [
				"Émojis",
				"Émojis animés"
			],
			EMOTES_DESC: (message) => `Le serveur possède actuellement **${message.guild.emojis.cache.size}** émojis :`,
			EMOTES_NO_EMOTES: "Il n'y a pas d'émojis sur ce serveur",
			EMOTES_NO_ANIMATED: "Il n'y a pas d'émoji animé sur ce serveur",
			MEMBERCOUNT_DESCRIPTION: "Créé un un compteur de membres",
			MEMBERCOUNT_USAGE: (prefix) => `${prefix}membercount [channel/category]`,
			MEMBERCOUNT_EXAMPLES: (prefix) => `${prefix}membercount channel\n ${prefix}membercount category`,
			MEMBERCOUNT_NO_METHOD: "Veuillez indiquer dans quoi voulez-vous faire apparaître votre compteur : channel/category",
			MEMBERCOUNT_MEMBERS: "membres",
			MEMBERCOUNT_UNVALID_METHOD: "Je n'ai pas compris dans quoi vous souhaitez faire apparaître votre compteur : channel/category",
			MEMBERCOUNT_CHANNEL_EXISTS: (salon) => `Le compteur de membres est déjà présent sur le serveur : ${salon.type === "category" ? `catégorie ${salon.name}` : `<#${salon.id}>`}`,
			AUTOROLE_DESCRIPTION: "Permet la gestion des rôles ajoutés lors de l'arrivée d'un nouveau membre",
			AUTOROLE_USAGE: (prefix) => `${prefix}autorole [add/remove] [@Role/ID]`,
			AUTOROLE_EXAMPLES: (prefix) => `${prefix}autorole add @Role\n${prefix}autorole remove 699011821654507572`,
			AUTOROLE_NO_ARGS: (g, text) => `${JSON.parse(g.autorole).length === 0 ? `Il n'y a actuellement aucun rôle d'attirbué aux membres lors de leur arrivée sur le serveur.` : `Il y a actuellement ${JSON.parse(g.autorole).length} ${JSON.parse(g.autorole).length === 1 ? `rôle attribué` : `rôles attribués`} aux membres lors de leur arrivée :\n${text}`}\nRépondez par \`\`add\`\` pour ajouter un rôle de l'autorole.\nRépondez par \`\`remove\`\` pour retirer un rôle de l'autorole`,
			AUTOROLE_SUPPLY_METHOD: "Répondez par \`\`add\`\` pour ajouter un rôle de l'autorole.\nRépondez par \`\`remove\`\` pour retirer un rôle de l'autorole",
			AUTOROLE_SUPPLY_ROLE: "Répondez par l'ID du rôle, ou en le mentionnant.",
			AUTOROLE_BAD_METHOD: (g) => `Je n'ai pas compris ce que vous vouliez faire.\nVeuillez recommencer la commande.`,
			AUTOROLE_NO_ROLE: "Veuillez préciser un rôle à ajouter ou retirer !",
			AUTOROLE_ALREADY_IN: "Ce rôle fait déjà parti de l'autorole !",
			AUTOROLE_NOT_IN: "Ce rôle ne fait pas parti de l'autorole !",
			AUTOROLE_ROLE_ADDED: (r) => `Le rôle <@&${r}> a été ajouté à l'autorole !`,
			AUTOROLE_ROLE_REMOVED: (r) => `Le rôle <@&${r}> a été retiré de l'autorole !`,
			AUTOROLE_LIMIT: "Vous avez atteint la limite de rôles attribuables dans l'autorôle. Veuillez en retirer si vous voulez en mettre de nouveaux.",//Ajouter "Vous pouvez augmentez cette limite en passant sur la version premium du bot"
			SETLOGS_DESCRIPTION: "Permet la sélection du salon d'affichage des logs.",
			SETLOGS_USAGE: (prefix) => `${prefix}setlogs [#channel/ID]`,
			SETLOGS_EXAMPLES: (prefix) => `${prefix}setlogs #logs`,
			SETLOGS_NO_ARGS: (g) => `${g.logs_channel === null || g.logs_channel === "" ? `Il n'y a actuellement aucun salon d'affichage des logs` : `Le salon d'affichage des logs est actuellement <#${g.logs_channel}>`}\nRépondez en mentionnant le salon ou en indiquant son ID afin d'en faire le salon d'affichage des logs.`,
			SETLOGS_SAME: (c) => `<#${c}> est déjà le salon d'affichage des logs.`,
			SETLOGS_SUCCESS: (c) => `Les logs seront désormais affichées dans le salon <#${c}>`,
			SETJOIN_DESCRIPTION: "Permet la sélection du salon d'annonce de l'arrivée d'un nouveau membre",
			SETJOIN_USAGE: (prefix) => `${prefix}setjoin [#channel/ID]`,
			SETJOIN_EXAMPLES: (prefix) => `${prefix}setjoin #arrivées`,
			SETJOIN_NO_ARGS: (g) => `${g.welcome_channel === null || g.welcome_channel === "" ? `Il n'y a actuellement aucun salon d'affichage des arrivées.` : `Le salon d'affichage des arrivées est actuellement <#${g.welcome_channel}>`}\nRépondez en mentionnant le salon ou en indiquant son ID afin d'en faire le salon d'affichage des arrivées.`,
			SETJOIN_SAME: (c) => `<#${c}> est déjà le salon d'affichage des arrivées.`,
			SETJOIN_SUCCESS: (c) => `Les arrivées seront désormais affichées dans le salon <#${c}>`,
			SETLEAVE_DESCRIPTION: "Permet la sélection du salon d'annonce du départ d'un membre",
			SETLEAVE_USAGE: (prefix) => `${prefix}setleave [#channel/ID]`,
			SETLEAVE_EXAMPLES: (prefix) => `${prefix}setleave #départs`,
			SETLEAVE_SUPPLY: (g) => `${g.leave_channel === null || g.leave_channel === "" ? `Il n'y a actuellement aucun salon d'affichage des départs.` : `Le salon d'affichage des départs est actuellement <#${g.leave_channel}>`}\nRépondez en mentionnant le salon ou en indiquant son ID afin d'en faire le salon d'affichage des départs.`,
			SETLEAVE_SAME: (c) => `<#${c}> est déjà le salon d'affichage des départs.`,
			SETLEAVE_SUCCESS: (c) => `Les départs seront désormais affichées dans le salon <#${c}>`,
			SETREPORTS_DESCRIPTION: "Permet la sélection du salon d'affichage des signalements.",
			SETREPORTS_USAGE: (prefix) => `${prefix}setreports [#channel/ID]`,
			SETREPORTS_EXAMPLES: (prefix) => `${prefix}setreports #reports`,
			SETREPORTS_NO_ARGS: (g) => `${g.reports_channel === null || g.reports_channel === "" ? `Il n'y a actuellement aucun salon d'affichage des signalements.` : `Le salon d'affichage des signalements est actuellement <#${g.reports_channel}>`}\nRépondez en mentionnant le salon ou en indiquant son ID afin d'en faire le salon d'affichage des signalements.`,
			SETREPORTS_SAME: (c) => `<#${c}> est déjà le salon d'affichage des signalements.`,
			SETREPORTS_SUCCESS: (c) => `Les signalements seront désormais affichées dans le salon <#${c}>`,
			SETNOTIF_DESCRIPTION: "Permet la sélection du salon du reaction role.",
			SETNOTIF_USAGE: (prefix) => `${prefix}setnotif [#channel/ID]`,
			SETNOTIF_EXAMPLES: (prefix) => `${prefix}setnotif #rolereaction`,
			SETNOTIF_NO_ARGS: (g) => `${g.rolereaction_channel === null || g.rolereaction_channel === "" ? `Il n'y a actuellement aucun salon pour le RoleReaction.` : `Le salon du RoleReaction est actuellement <#${g.rolereaction_channel}>`}\nRépondez en mentionnant le salon ou en indiquant son ID afin d'en faire le salon du role reaction.`,
			SETNOTIF_SAME: (c) => `<#${c}> est déjà le salon du RoleReaction.`,
			SETNOTIF_SUCCESS: (c) => `Le RoleReaction sera dans le salon <#${c}>`,
			SETMODLOGS_DESCRIPTION: "Permet la sélection du salon d'affichage des logs de modération.",
			SETMODLOGS_USAGE: (prefix) => `${prefix}setmodlogs [#channel/ID]`,
			SETMODLOGS_EXAMPLES: (prefix) => `${prefix}setmodlogs #mod-logs`,
			SETMODLOGS_NO_ARGS: (g) => `${g.modlogs_channel === null || g.modlogs_channel === "" ? `Il n'y a actuellement aucun salon d'affichage des logs de modération.` : `Le salon d'affichage des logs de modération est actuellement <#${g.modlogs_channel}>`}\nRépondez en mentionnant le salon ou en indiquant son ID afin d'en faire le salon d'affichage des logs de modération.`,
			SETMODLOGS_SAME: (c) => `<#${c}> est déjà le salon d'affichage des logs de modération.`,
			SETMODLOGS_SUCCESS: (c) => `Les logs de modération seront désormais affichées dans le salon <#${c}>`,
			SETTWITCH_NO_ARGS: (g) => `${g.twitch_channel === null || g.twitch_channel === "" ? `Il n'y a actuellement aucun salon d'annonce des lives Twitch` : `Le salon d'annonce des lives Twitch est actuellement <#${g.twitch_channel}>`}\nRépondez en mentionnant le salon ou en indiquant son ID afin d'en faire le salon d'annonce des lives Twitch.`,
			SETTWITCH_SAME: (c) => `<#${c}> est déjà le salon d'annonce des lives twitch.`,
			SETTWITCH_SUCCESS: (c) => `Les lives Twitch seront désormais annoncés dans le salon <#${c}>`,
			LOGS_CHANNEL_CREATE_TITLE: `Un nouveau salon a été créé !`,
			LOGS_CHANNEL_CREATE_DESC: (c) => `**${c.name}** - ${c} (${c.id})
**Créé le :** ${moment(c.createdAt.toUTCString()).format("LLLL")}${c.parent ? `\n**Dans la catégorie :** ${c.parent} (${c.parent.id})` : ``}
**Type de salon :** ${c.type}
**Position dans la catégorie :** ${c.position}
**Position dans le serveur :** ${c.rawPosition}`,
			LOGS_CHANNEL_DELETE_TITLE: "Un salon a été supprimé !",
			LOGS_CHANNEL_DELETE_DESC: (c) => `**${c.name}** - (${c.id})
**Créé le :** ${moment(c.createdAt.toUTCString()).format("LLLL")}
**Supprimé le :** ${moment(new Date()).format("LLLL")}${c.parent ? `\n**Dans la catégorie :** ${c.parent} (${c.parent.id})` : ``}
**Type de salon :** ${c.type}
**Position dans la catégorie :** ${c.position}
**Position dans le serveur :** ${c.rawPosition}`,
			LOGS_GUILD_MEMBER_ADD_TITLE: "Arrivée d'un nouveau membre !",
			LOGS_GUILD_MEMBER_ADD_DESC: (m) => `${m} - **${m.user.tag}** est arrivé sur **__${m.guild.name}__** !
Il y a désormais **${m.guild.memberCount}** personnes sur le serveur !`,
			LOGS_GUILD_MEMBER_REMOVE_TITLE: "Départ d'un membre !",
			LOGS_GUILD_MEMBER_REMOVE_DESC: (m) => `${m} - **${m.user.tag}** est parti de **__${m.guild.name}__** !
Il y a désormais **${m.guild.memberCount}** personnes sur le serveur !`,
			LOGS_CHANNEL_PINS_UPDATE_TITLE: "Modification des messages épinglés dans un salon !",
			LOGS_CHANNEL_PINS_UPDATE_DESC: (channel, time) => `**Salon :** ${channel.name} - ${channel} - ${channel.id}
**Modification à** ${moment(time).format("LLLL")}`,
			LOGS_CHANNEL_UPDATE_TITLE: "Modification d'un salon !",
			LOGS_CHANNEL_UPDATE_DESC: (oldChannel, newChannel) => `**__Ancien salon :__**

**Nom :** ${oldChannel.name}
**ID : ** ${oldChannel.id}
**Type de salon :** ${oldChannel.type}
**Sujet du salon :** ${oldChannel.topic ? `${oldChannel.topic}` : `Aucun sujet n'a été défini`}

**__Nouveau salon :__**

**Nom :** ${newChannel.name}
**ID : ** ${newChannel.id}
**Type de salon :** ${newChannel.type}
**Sujet du salon :** ${newChannel.topic ? `${newChannel.topic}` : `Aucun sujet n'a été défini`}`,
			LOGS_EMOJI_CREATE_TITLE: "Un nouvel émoji a été ajouté !",
			LOGS_EMOJI_CREATE_DESC: (emoji) => `**Nom de l'émoji :** ${emoji.name}
**ID :** ${emoji.id}
**Type :** ${emoji.animated === true ? `Animé` : `Non animé`}
**Aperçu :** ${emoji}
**Date d'ajout :** ${moment(emoji.createdAt.toUTCString()).format("LLLL")}
**Identifier :** ${emoji.identifier}
**URL :** ${emoji.url}`,
			LOGS_EMOJI_DELETE_TITLE: "Un émoji a été supprimé !",
			LOGS_EMOJI_DELETE_DESC: (emoji) => `**Nom de l'émoji :** ${emoji.name}
**ID :** ${emoji.id}
**Type :** ${emoji.animated === true ? `Animé` : `Non animé`}
**Date d'ajout :** ${moment(emoji.createdAt.toUTCString()).format("LLLL")}
**Date de suppression :** ${moment(new Date()).format("LLLL")}
**Identifier :** ${emoji.identifier}
**URL :** ${emoji.url}`,
			LOGS_EMOJI_UPDATE_TITLE: "Modification d'un émoji !",
			LOGS_EMOJI_UPDATE_DESC: (oldEmoji, newEmoji) => `**__Ancien émoji :__**

**Nom :** ${oldEmoji.name}
**ID : ** ${oldEmoji.id}
**Date d'ajout :** ${moment(oldEmoji.createdAt.toUTCString()).format("LLLL")}
**Identifier :** ${oldEmoji.identifier}
**URL :** ${oldEmoji.url}

**__Nouvel émoji :__**

**Nom :** ${newEmoji.name}
**ID : ** ${newEmoji.id}
**Aperçu :** ${newEmoji}
**Date d'ajout :** ${moment(newEmoji.createdAt.toUTCString()).format("LLLL")}
**Date de modification :** ${moment(new Date()).format("LLLL")}
**Identifier :** ${newEmoji.identifier}
**URL :** ${newEmoji.url}`,
			LOGS_GUILD_BAN_ADD_TITLE: "Quelqu'un a été banni du serveur !",
			LOGS_GUILD_BAN_ADD_DESC: (user) => `**Pseudo :** ${user.username}
**ID :** ${user.id}
**Bot :** ${user.bot ? "Affirmatif" : "Négatif, c'est un humain (Ou un selfbot)"}
**Création du compte :** ${moment(user.createdAt.toUTCString()).format("LLLL")}
**Date du banissement :** ${moment(new Date()).format("LLLL")}`,
			LOGS_GUILD_BAN_REMOVE_TITLE: "Quelqu'un a été débanni du serveur !",
			LOGS_GUILD_BAN_REMOVE_DESC: (user) => `**Pseudo :** ${user.username}
**ID :** ${user.id}
**Bot :** ${user.bot ? "Affirmatif" : "Négatif, c'est un humain (Ou un selfbot)"}
**Création du compte :** ${moment(user.createdAt.toUTCString()).format("LLLL")}
**Date du débanissement :** ${moment(new Date()).format("LLLL")}`,
			LOGS_GUILD_CREATE_TITLE: (guild) => `Lycos a été ajouté sur ${guild.name} !`,
			LOGS_GUILD_CREATE_DESC: (guild, vl, r) => `**ID :** ${guild.id}
**Membres :** ${guild.members.cache.filter(m => !m.user.bot).size}
**Propriétaire :** ${guild.owner.user.tag} - ${guild.ownerID}
**Créé le :** ${moment(guild.createdAt.toUTCString()).format("LLLL")}
**Niveau de vérification :** : ${vl}
**Localisation du serveur :** ${r}`,
			LOGS_GUILD_DELETE_TITLE: (guild) => `Lycos a été enlevé de ${guild.name} !`,
			LOGS_GUILD_DELETE_DESC: (guild, vl, r) => `**ID :** ${guild.id}
**Membres :** ${guild.members.cache.filter(m => !m.user.bot).size}
**Propriétaire :** ${guild.owner.user.tag} - ${guild.ownerID}
**Créé le :** ${moment(guild.createdAt.toUTCString()).format("LLLL")}
**Niveau de vérification :** : ${vl}
**Localisation du serveur :** ${r}`,
			LOGS_GUILD_MEMBER_CHUNK_TITLE: "Tout un régiment de membres viennent d'arriver d'un même serveur !",
			LOGS_GUILD_MEMBER_CHUNK_DESC: (members, guild) => ``,
			LOGS_GUILD_MEMBER_UPDATE_TITLE: "Un membre du serveur a subi des modifications !",
			LOGS_GUILD_MEMBER_UPDATE_DESC: (oldMember, newMember) => `**__Avant modifications du ${moment(new Date()).format("LLLL")} :__**
			
**Nom :** ${oldMember.user.tag}
**ID :** ${oldMember.id}
**Création du compte :** ${moment(oldMember.user.createdAt.toUTCString()).format("LLLL")}
**A rejoint le serveur le :** ${moment(oldMember.joinedAt.toUTCString()).format("LLLL")}
**Bannissable** : ${oldMember.bannable === true ? "Oui" : "Non"}
**Expulsable :** ${oldMember.kickable === true ? "Oui" : "Non"}
**Surnom :** ${oldMember.nickname ? `${oldMember.displayName}` : "Aucun surnom"}
**Avatar :** ${oldMember.user.displayAvatarURL({ format: "png", dynamic: true, size: 256 })}
**Rôles :** ${oldMember.roles.cache.size > 10 ? `${oldMember.roles.cache.map((r) => r).slice(0, 9).join(", ")} et ${oldMember.roles.cache.size - 10} autres rôles.` : (oldMember.roles.cache.size < 1) ? `Aucun rôle` : `${oldMember.roles.cache.map((r) => r).join(", ")}`}

**__Après modifications du ${moment(new Date()).format("LLLL")} :__**
			
**Nom :** ${newMember.user.tag}
**ID :** ${newMember.id}
**Création du compte :** ${moment(newMember.user.createdAt.toUTCString()).format("LLLL")}
**A rejoint le serveur le :** ${moment(newMember.joinedAt.toUTCString()).format("LLLL")}
**Bannissable** : ${newMember.bannable === true ? "Oui" : "Non"}
**Expulsable :** ${newMember.kickable === true ? "Oui" : "Non"}
**Surnom :** ${newMember.nickname ? `${newMember.displayName}` : "Aucun surnom"}
**Avatar :** ${newMember.user.displayAvatarURL({ format: "png", dynamic: true, size: 256 })}
**Rôles :** ${newMember.roles.cache.size > 10 ? `${newMember.roles.cache.map((r) => r).slice(0, 9).join(", ")} et ${newMember.roles.cache.size - 10} autres rôles.` : (newMember.roles.cache.size < 1) ? `Aucun rôle` : `${newMember.roles.cache.map((r) => r).join(", ")}`}`,
			LOGS_MESSAGE_DELETE_TITLE: "Un message a été supprimé !",
			LOGS_MESSAGE_DELETE_DESC: (message) => `**Auteur du message :** ${message.author.tag} - ${message.author} - ${message.author.id}
**Message supprimé dans :** ${message.channel.name} - ${message.channel} - ${message.channel.id}
**Message supprimé le :** ${moment(new Date()).format("LLLL")}
**Contenu du message :** \`\`${message.content}\`\``,
			LOGS_MESSAGE_DELETE_BULK_TITLE: "Plusieurs messages ont été supprimés !",
			LOGS_MESSAGE_DELETE_BULK_DESC: () => ``,
			LOGS_MESSAGE_UPDATE_TITLE: "Un message a été modifié !",
			LOGS_MESSAGE_UPDATE_DESC: (oldMessage, newMessage) => `**Auteur du message :** ${newMessage.author.tag} - ${newMessage.author} - ${newMessage.author.id}
**Salon :** ${newMessage.channel.name} - ${newMessage.channel} - ${newMessage.channel.id}
**Ancien message :** \`\`${oldMessage.content}\`\`
**Nouveau message :** \`\`${newMessage.content}\`\``,
			LOGS_ROLE_CREATE_TITLE: "Un nouveau rôle a été créé !",
			LOGS_ROLE_CREATE_DESC: (role) => `**Nom du rôle :** ${role.name} - ${role}
**ID :** ${role.id}
**Créé le :** ${moment(role.createdAt.toUTCString()).format("LLLL")}`,
			LOGS_ROLE_DELETE_TITLE: "Un nouveau rôle a été créé !",
			LOGS_ROLE_DELETE_DESC: (role) => `**Nom du rôle :** ${role.name}
**ID :** ${role.id}
**Créé le :** ${moment(role.createdAt.toUTCString()).format("LLLL")}
**Supprimé le :** ${moment(new Date()).format("LLLL")}`,
			LOGS_ROLE_UPDATE_TITLE: "Un rôle a été modifié !",
			LOGS_ROLE_UPDATE_DESC: (oldRole, newRole) => `**__Avant modifications du ${moment(new Date()).format("LLLL")} :__**
			
**Nom du rôle :** ${oldRole.name}
**ID :** ${oldRole.id}
**Créé le :** ${moment(oldRole.createdAt.toUTCString()).format("LLLL")}
**Position :** ${oldRole.position}
**Couleur :** ${oldRole.hexColor}
**Apparaît séparemment :** ${oldRole.hoist ? `Oui` : `Non`}
**Mentionnable :** ${oldRole.mentionable ? `Oui` : `Non`}
**Permissions :** ${oldRole.permissions.toArray().length > 10 ? `${oldRole.permissions.toArray().map((r) => r).slice(0, 9).join(", ")} et ${oldRole.permissions.toArray().length - 10} autres permissions.` : (oldRole.permissions.toArray().length < 1) ? `Aucune permission` : `${oldRole.permissions.toArray().map((r) => r).join(", ")}`}

**__Après modifications du ${moment(new Date()).format("LLLL")} :__**
			
**Nom du rôle :** ${newRole.name} - ${newRole}
**ID :** ${newRole.id}
**Créé le :** ${moment(newRole.createdAt.toUTCString()).format("LLLL")}
**Position :** ${newRole.position}
**Couleur :** ${newRole.hexColor}
**Apparaît séparemment :** ${newRole.hoist ? `Oui` : `Non`}
**Mentionnable :** ${newRole.mentionable ? `Oui` : `Non`}
**Permissions :** ${newRole.permissions.toArray().length > 10 ? `${newRole.permissions.toArray().map((r) => r).slice(0, 9).join(", ")} et ${newRole.permissions.toArray().length - 10} autres permissions.` : (newRole.permissions.toArray().length < 1) ? `Aucune permission` : `${newRole.permissions.toArray().map((r) => r).join(", ")}`}`,
			LOGS_WEBHOOK_UPDATE_TITLE: `Un webhook a été modifié !`,
			LOGS_WEBHOOK_UPDATE_DESC: (channel) => `**Nom du salon :** ${channel.name} - ${channel}
**ID :** ${channel.id}`,
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
