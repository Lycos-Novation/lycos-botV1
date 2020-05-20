const config = require('../config');
module.exports = {
	getPrefix(message) {
		if (message.channel.type !== "dm") {
			const prefixes = [
				`<@${message.client.user.id}>`,
				"Lycos",
				message.settings.prefix,
			];
			let prefix = null;
			prefixes.forEach((p) => {
				if (message.content.startsWith(p)) {
					prefix = p;
				}
			});
			return prefix;
		}
		else {
			return true;
		}
	},

	/**
     * Fetch user by their ID or their username
     * @returns A map of users found with search arguments
     * @param {object} guild
     * @param {object} args
     */
	fetchMembers(guild, args) {
		const search = args.toLowerCase();
		return guild.members.cache.filter((member) => member.id === search || member.displayName.toLowerCase().includes(search));
	},

	async awaitResponse(message) {
		const responseFilter = m => m.author.id === message.author.id;
		const response = await message.channel.awaitMessages(responseFilter, { max: 1 });
		const rescontent = response.first().content;
		return rescontent;
	},

	checkDays(date, message) {
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const days = Math.floor(diff / 86400000);
		if (message.language === "english") {
			return days + (days === 1 ? ` ${message.language.get("DATE_DAY")}` : ` ${message.language.get("DATE_DAYS")}`) + ` ${message.language.get("DATE_AGO")}`;
		} else {
			return message.language.get("DATE_AGO") + days + (days === 1 ? ` ${message.language.get("DATE_DAY")}` : ` ${message.language.get("DATE_DAYS")}`);
		}
	},

	makeid(length) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	},
	/*
		async createProject(settings){
			let merged = Object.assign({_id: mongoose.Types.ObjectId() }, settings);
	
			const newProject = await new Project(merged);
			return newProject.save()
				.then(p => {
					console.log(`Nouveau projet ${p.name} créé avec succès.`)
				});
		},
	
		async delProject(project){
			console.log(`Projet ${project} supprimé.`);
			return Project.deleteOne({name : project})
		},
	
		async getProject(project){
			var data = await Project.findOne({ name: project});
			if(!data){
				data = config.defaultSettingsProject;
			}
			return data;
		},
	
		async updateProject(message, project, settings){
			let data = await message.bot.functions.getProject(project);
	
			if (typeof data !== 'object') data = {};
			for (const key in settings) {
				if (settings.hasOwnProperty(key)) {
					if (data[key] !== settings[key]) data[key] = settings[key];
					else return;
				}
			}
			console.log(`Projet ${data.name} - Modifications : ${Object.keys(settings)}`);
			return await data.updateOne(settings);
		},
	*/

};
