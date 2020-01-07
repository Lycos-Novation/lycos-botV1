const e = require("../config.js").emotes;

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
			ERROR_FORTNITE_PLATFORM: "S'il vous plaît entrer une plate-forme valide (pc, xbox, psn).",
			ERROR_FORTNITE_PLATFORM_USER_NOT_FOUND: "Cet utilisateur n'a pas été trouvé sur la plate-forme spécifiée.",
			GIVEAWAY_DESCRIPTION: "Gérez vos giveaways simplement!",
			GIVEAWAY_USAGE: (prefix) => `${prefix}giveaway [create/reroll/delete/end] (temps) (nombre de gagnant) (prix)`,
			GIVEAWAY_EXAMPLES: (prefix) => `${prefix}giveaway create 10m 2 5$ PayPal !\n giveaway reroll 597812898022031374`,
			GIVEAWAY_ERR_STATUS: "Vous devez spécifier `create`, `reroll` ou `delete`!",
			GIVEAWAY_ERR_CREATE: (prefix) => `Vous devez entrer les informations dans ce format: \n\n\`${prefix}giveaway create (temps) (nombre de gagnant) (prix)\``,
			GIVEAWAY_ERR_REROLL: "Vous devez entrer l'ID du message du giveaway!",
			GIVEAWAY_ERR_DELETE: "Vous devez entrer l'ID du message du giveaway!",
			GIVEAWAY_ERR_END: "Vous devez entrer l'ID du message du giveaway!",
			GIVEAWAY_ERR_REROLL_MSG_ENDED: (messageID) => `Aucun giveaway **terminé** trouvé avec l'ID de message \`${messageID}\``,
			GIVEAWAY_ERR_MESSAGE_NOT_FOUND: (messageID) => `Aucun giveaway trouvé avec l'ID de message \`${messageID}\``,
			GIVEAWAY_ERR_15_DAYS: "La durée maximale d'un giveaway est de 15 jours.",
			GIVEAWAY_ERR_MAX: "Un maximum de 4 giveaways peuvent être lancés sur le même serveur.",
			GIVEAWAY_CREATED: "Giveaway lancé!",
			GIVEAWAY_REROLLED: "Nouveau tirage fait!",
			GIVEAWAY_DELETED: "Giveaway supprimé!",
			GIVEAWAY_ENDED: "Giveaway en mode d'arrêt (-15 seconds)!",
			GIVEAWAY_CREATE_MESSAGES: {
				giveaway: "ðŸŽ‰ðŸŽ‰ **GIVEAWAY** ðŸŽ‰ðŸŽ‰",
				giveawayEnded: "ðŸŽ‰ðŸŽ‰ **GIVEAWAY TERMINE** ðŸŽ‰ðŸŽ‰",
				timeRemaining: "Temps restant: **{duration}** !",
				inviteToParticipate: "Réagir avec ðŸŽ‰ pour participer!",
				winMessage: "Toutes nos félicitations, {winners} ! Tu as gagné **{prize}** !",
				embedFooter: "Giveaways",
				noWinner: "Giveaway annulé, pas de participation valide.",
				winners: "winner(s)",
				endedAt: "Fin à",
				units: {
					seconds: "secondes",
					minutes: "minutes",
					hours: "heures",
					days: "jours",
				},
			},
			GIVEAWAY_REROLL_MESSAGES: {
				congrat: "ðŸŽ‰ Nouveau gagnant(s) : {winners}! Félicitations!",
				error: "Aucune inscription valide, aucun gagnant ne peut être choisi!",
			},
			LANGUAGE_DESCRIPTION: "Traduire Lycos dans une autre langue.",
			LANGUAGE_USAGE: ".language <language>",
			LANGUAGE_EXAMPLES: ".language french",
			LANGUAGE_INFO: (language, prefix) => `Ma langue sur ce serveur est \`${language}\` !\n> Pour changer la langue, faites \`${prefix}language set <value>\`\n> Pour voir combien de langues je peux parler, faites \`${prefix}language list\``,
			LANGUAGE_LIST: (languages) => `Je suis disponible en \`${languages.join("\`, \`")}\`.`,
			LANGUAGE_NULL: "La nouvelle langue ne peut pas être vide.",
			LANGUAGE_ALREADY_SET: (args) => `Je suis déjà en \`${args[1].toLowerCase()}\`.`,
			LANGUAGE_GUILD_INFO: (args) => `La langue sur ce serveur est maintenant \`${args[1].toLowerCase()}\`.`,
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
			POLL_USAGE: ".poll <text>",
			POLL_EXAMPLES: ".poll Lycos est-il bon??",
			POLL_TEXT_NULL: "Vous devez insérer un texte pour faire un sondage.",
			POLL_REACT: "Réagissez avec les réactions en bas pour entrer dans le sondage.",
			PREFIX_DESCRIPTION: "Gérer le préfixe de bot sur le serveur.",
			PREFIX_USAGE: ".prefix set <prefix>\n.prefix reset",
			PREFIX_EXAMPLES: ".prefix set d.\n.prefix reset",
			PREFIX_INFO: (prefix) => `Mon préfixe sur ce serveur est \`${prefix}\` ! \n> Pour changer ce préfixe faite \`${prefix}prefix set <value>\`\n> Pour réinitialiser ce préfixe, faites \`${prefix}prefix reset\``,
			PREFIX_NULL: "Le préfixe ne peut pas être vide.",
			PREFIX_CHANGE: (args) => `Le préfixe est maintenant \`${args[1]}\`.`,
			PREFIX_RESET: "Le préfixe a été réinitialisé. Il est maintenant `.`",
			ROLE_DESCRIPTION: "Gérer les rôles facilement.",
			ROLE_USAGE: ".role <add/remove> <user> <role>",
			ROLE_EXAMPLES: ".role add Lycos Bot",
			ROLE_INFO: (prefix) => `> Pour ajouter un rôle à un utilisateur, faites \`${prefix}role add <user> <role>\` \n> Pour supprimer un rôle à un utilisateur, faites \`${prefix}role remove <user> <role>\``,
			ROLE_NOUSER_FOUND: "Aucun utilisateur n'a été trouvé.",
			ROLE_GIVE: (member, role) => `${member.user.username} a maintenant le rôle ${role.name}.`,
			ROLE_REMOVE: (member, role) => `${member.user.username} n'a plus le rôle ${role.name}.`,
			BOT_DESCRIPTION: "Afficher des informations sur Lycos.",
			BOT_USAGE: ".bot",
			BOT_EXAMPLES: ".bot",
			BOT_FIELDS: [
				"Informations générales",
				"Statistiques générales",
				"Autres renseignements",
				"\u200B",
			],
			BOT_FIELDS_CONTENT_GENERALINFO: (message, version) => `**Créateur :** \`${message.bot.users.get("169146903462805504").tag}\`\n**Développeurs :** \`${message.bot.users.get("296693247856607263").tag}\` - \`${message.bot.users.get("291860794163855360").tag}\` - \`${message.bot.users.get("169146903462805504").tag}\`\n**Contributeurs :** \`${message.bot.users.get("422820341791064085") ? message.bot.users.get("422820341791064085").tag : "Androz"}\`\nCréé le \`12/12/2017\`, le bot tourne actuellement sur la version \`${version}\`.`,
			BOT_FIELDS_CONTENT_GENERALSTATS: (guilds, users, channels) => `** Nombre de serveurs :** \`${guilds}\`.\n**Utilisateurs :** \`${users}\` en mémoire.\n**Nombre de salons :** \`${channels}\`.`,
			BOT_FIELDS_CONTENT_OTHERINFO: (process, moment, message) => `**Machine :** \`${process.platform}\` - \`(${process.arch})\` \n**TAS :** \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\`\n**Durée de connection du bot :** \`${moment.duration(message.bot.uptime).format("M[m] W[w] D[d] H[h] m[m] s[s]")}\``,
			BOT_FIELDS_CONTENT_LINKS: "[Invitation](https://discordapp.com/oauth2/authorize?client_id=390231727554953216&scope=bot&permissions=0) - [Server](https://discord.gg/ZvJpUpt) - [Dons](https://paypal.me/denverbot) - [Site](https://denverbot.fr/) - [Vote](https://discordbots.org/bot/390231727554953216) - [Twitter](https://twitter.com/BOT_Denver)",
			HELP_DESCRIPTION: "Affiche la liste des commandes",
			HELP_USAGE: (prefix) => `${prefix}help (command)`,
			HELP_EXAMPLES: (prefix) => `${prefix}help\n${prefix}help ping`,
			HELP_NOT_FOUND: (args) => `${e.error} | La commande \`${args}\` n'existe pas!`,
			HELP_TITLE: (command) => `Help : ${command}`,
			HELP_TITLE1: (category) => `Catégorie : ${category}`,
			HELP_EMBED_DESCRIPTION: (message) => `Bonjour, voici la documentation de Lycos. Certaines commandes ne sont pas disponible sur la documentation parce qu'elles doivent être activer.\nPour voir ce que vous pouvez activer faites \`${message.settings.prefix}modules\`.`,
			HELP_FIELDS: [
				"Description",
				"Usage",
				"Exemples",
				"Niveau requis",
			],
			HELPGLOBAL_FIELDS: [
				"Administration",
				"Lycos",
				"Divertissement",
				"Générale",
				"Modération",
				"Musique",
			],
			HELPGLOBAL_TITLE: "Help Menu",
			INVITE_DESCRIPTION: "Donne l'invitation pour ajouter le bot sur un serveur",
			INVITE_USAGE: (prefix) => `${prefix}invite`,
			INVITE_EXAMPLES: (prefix) => `${prefix}invite`,
			INVITE_TITLE: "Invitation",
			INVITE_FIELD: "[Clique ici](https://discordapp.com/oauth2/authorize?client_id=390231727554953216&scope=bot&permissions=66321471) pour inviter le bot sur ton serveur.",
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
			AVATAR_USAGE: (prefix) => `${prefix}avatar (@user)`,
			AVATAR_EXAMPLES: (prefix) => `${prefix}avatar @Lycos`,
			AVATAR_TITLE: (looked) => `Avatar de ${looked.user.username}`,
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
			USERINFO_DESCRIPTION: "Affiche les informationssur l'utilisateur.",
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
			USERINFO_PROFIL: "Profil",
			/* LOGS_DESCRIPTION: "Ecrit...",
			LOGS_USAGE: "Ecrit...",
			LOGS_EXAMPLES: "Ecrit...",
			LOGSCMD_DESCRIPTION: "Commande pour configurer le channel des logs",
			LOGSCMD_USAGE: (prefix) => `${prefix}logs`,
			LOGSCMD_EXAMPLES: (prefix) => `${prefix}logs`,
			LOGSCMD_NOCHANNEL: "S'il vous plaît entrer un channel",
			LOGSCMD_INVALIDCHANNEL: "Ce channel n'existe pas",
			LOGSCMD_CHANNELSUCCES: (channel) => `Les logs de votre salon sont disponibles ${channel}`,
			LOGSCMD_LOGSOFF: "Vous venez de désactiver les logs sur votre serveur",*/
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
			PARTNERS_DESCRIPTION: "Regardez nos partenaires.",
			PARTNERS_USAGE: ".partners",
			PARTNERS_EXAMPLES: ".partners",
			PARTNERS_TITLE: "Partenaires de lycos",
			ANIME_DESCRIPTION: "Cherchez les meilleurs animes.",
			ANIME_USAGE: ".anime <animeName>",
			ANIME_EXAMPLES: ".anime Dragon Ball",
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
			FORTNITE_USAGE: ".fortnite <platform> <username>",
			FORTNITE_EXAMPLES: ".fortnite pc Ninja",
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
			QRCODE_DESCRIPTION: "Faire des sondages sur n'importe quoi.",
			QRCODE_USAGE: ".qrcode <text>",
			QRCODE_EXAMPLES: ".qrcode Code secret",
			QRCODE_MESSAGE: "Vous devez inclure quelque chose à convertir en un QR Code.",
			ROLE_INFO_DESCRIPTION: "Affiche les informations de rôle.",
			ROLE_INFO_USAGE: ".role-info <role>",
			ROLE_INFO_EXAMPLES: ".role-info Members",
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
			FLIP_USAGE: ".flip",
			FLIP_EXAMPLES: ".flip",
			FLIP_HEADS: ":game_die: | C'est **face**!",
			FLIP_TAILS: ":game_die: | C'est **pile** !",
			PERMISSIONS_DESCRIPTION: "Displays the member's permissions in the channel",
			PERMISSIONS_USAGE: (prefix) => `${prefix}permissions (@member)`,
			PERMISSIONS_EXAMPLES: (prefix) => `${prefix}permissions\n${prefix}permissions @user#1234`,
			PERMISSIONS_TITLE: (username, channel) => `Permissions of ${username} in #${channel}`,
			PURGE_DESCRIPTION: "Permet de supprimer plusieurs messages à la fois.",
			PURGE_USAGE: (prefix) => `${prefix}purge [messagesNumber]`,
			PURGE_EXAMPLES: (prefix) => `${prefix}purge 28`,
			PURGE_SPECIFY_AMOUNT: "Tu dois spécifier un montant à supprimer!",
			PURGE_TOO_MUCH_AMOUNT: "Je ne peux pas supprimer plus de 100 messages.",
			BAN_DESCRIPTION: "Banni l'utilisateur mentionné",
			BAN_USAGE: (prefix) => `${prefix}ban [@user] (reason)`,
			BAN_EXAMPLES: (prefix) => `${prefix}ban @Lycos Spam`,
			BAN_ERRORARGS : "Merci d'indiquer un utilisateur!",
			BAN_ALREADY: "Cet utilisateur est déjà banni !",
			BAN_BANNABLE: "Je ne peux pas bannir cet utilisateur, veuillez vérifier ses rôles et ses permissions",
			BAN_NOREASON: "Merci d'indiquer une raison",
			BAN_ERROR: "Je ne peux ban car : ",
			BAN_INFO: (member, message) => `${member} a été banni(e) par ${message.author}`,
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
			RPS_LYCOS_CHOICE: (choixO) => `Choix de Lycos : ${choixO}`,
			RPS_MATCH_EQUAL: `:flag_white: | Match nul !`,
			RPS_PLAYER_WIN: (message) => `:dagger: | Victoire de ${message.author.username} !`,
			RPS_LYCOS_WIN: `:skull_crossbones: | Victoire de Lycos !`,
			RPS_CHOICES: "Choisissez entre `pierre`, `feuille` et `ciseaux`",
			SUPPORT_NO_ARGS: "Veuillez décrire votre problème avec au moins 10 cractères et 1900 au maximum.",
			SUPPORT_QUESTION_SEND: "Votre question a été envoyée au support. Veuillez attendre une réponse.",
			PLAY_DESCRIPTION: "Joue la musique demandée",
			PLAY_USAGE: ".play [Musique/Lien]",
			PLAY_EXAMPLES: ".play Younger Dreams",
			PLAY_NO_VOICECHANNEL: "Vous devez être dans un salon vocal pour jouer de la musique",
			PLAY_BOT_CANT_CONNECT: "Je ne peux pas me connecter au salon, vérifiez que j'aie bien la permission requise !",
			PLAY_BOT_CANT_SPEAK: "Je ne peux pas parler dans ce salon, vérifiez que j'aie bien la permission requise !",
			PLAY_NO_ARGS: "Veuillez indiquer une musique à jouer",
			ANSWER_UNKNOWN_ID: "Cet ID de support n'est pas connu",
			ANSWER_SENT: (support) => `Votre réponse a été envoyée avec succès.(${support.id} terminé)`,
			RELOAD_NO_COMMAND: "Vous devez indiquer une commande a reload",
			RELOAD_ERROR_UNLOADING: (response) => `Erreur déchargement : ${response}`,
			RELOAD_ERROR_LOADING: (response) => `Erreur chargement : ${response}`,
			RELOAD_COMMAND_RELOADED: (commandName) => `The command \`${commandName}\` has been reloaded`,
			RELOAD_COMMAND_DOESNT_EXIST: (args) => `The command \`${args[0]}\` doesn't seem to exist. Try again!`
		};
		function date(date1){
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
