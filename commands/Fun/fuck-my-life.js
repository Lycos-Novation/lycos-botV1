const Command = require("../../base/Command.js");
const cheerio = require("cheerio");
const { get } = require("axios");

const vdm = [];

class FuckMyLife extends Command {
	constructor(client) {
		super(client, {
			name: "fuck-my-life",
			description: (language) => language.get("FUCKMYLIFE_DESCRIPTION"),
			usage: (language, prefix) => language.get("FUCKMYLIFE_USAGE", prefix),
			examples: (language, prefix) => language.get("FUCKMYLIFE_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: ["fml", "vie-de-merde", "vdm"],
			botPermissions: ["SEND_MESSAGES"],
			permLevel: "User",
			nsfw: false,
			adminOnly: false,
			cooldown: 5000,
		});
	}

	update(url) {
		return new Promise((resolve, reject) => {
			get(url)
				.then((res) => {
					const $ = cheerio.load(res.data);
					$("a[class=\"article-link\"]")
						.text()
						.split("\n")
						.map((item) => (item.trim() !== "" ? vdm.push(item) : null));
					resolve(vdm);
				})
				.catch(reject);
		});
	}

	send(message) {
		return new Promise((resolve, reject) => {
			const random = Math.floor(Math.random() * vdm.length);
			resolve(message.channel.send(vdm[random]));
		});
	}

	run(message) {
		try {
			const language = message.settings.language;
			let url;
			switch (language) {
			case "french":
				url = "https://www.viedemerde.fr/aleatoire";
				break;
			case "english":
				url = "https://www.fmylife.com/random";
				break;
			}
			this.update(url)
				.then(() => this.send(message))
				.catch(console.error);
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = FuckMyLife;
