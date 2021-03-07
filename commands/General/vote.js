const Command = require("../../base/Command.js");
const fetch = require("node-fetch");

class Vote extends Command {
	constructor(client) {
		super(client, {
			name: "vote",
			description: (language) => language.get("VOTE_DESCRIPTION"),
			usage: (language, prefix) => language.get("VOTE_USAGE", prefix),
			examples: (language, prefix) => language.get("VOTE_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: ["votes"],
			permLevel: "User",
			botPermissions: ["SEND_MESSAGES"],
			cooldown: 1000,
		});
	}

	run(message) {
		try {
			var dbd;
			fetch("https://api.botsdatabase.com/v1/bots/628186022991233025/votes", {
				headers: {
					"Authorization": "ec0f376c39e0daf10228c1c3f4f8ef1dd7d772048c661b9700b02d6643c97a7d78b72bbd907c31065e8feb5be346673d5b04555a1429815f",
					"Content-Type": "application/json"
				},
			})
				.then(res => res.json())
				.then(data => {
					dbd = data.length;
					var dbl;
					fetch("https://top.gg/api/bots/628186022991233025", {
						headers: {
							"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODE4NjAyMjk5MTIzMzAyNSIsImJvdCI6dHJ1ZSwiaWF0IjoxNTk1NTAzMzI2fQ.mcIyx1eAzbaXX2cY40-CIFm8dEFOOMvlEHQ4P6qBYWQ",
							"Content-Type": "application/json"
						},
					})
						.then(res => res.json())
						.then(data => {
							dbl = data.monthlyPoints;
							var bls;
							fetch("https://api.botlist.space/v1/bots/628186022991233025/upvotes", {
								headers: {
									"Authorization": "4b8ba3e105a446de8fd4cb1b15d0df7ce5d6df55d12d0277826449345a42d0c68e259e20a8dc8bab62c5b198635561e9",
									"Content-Type": "application/json"
								},
							})
								.then(res => res.json())
								.then(data => {
									bls = data.length;
									var bfd;
									fetch("https://botsfordiscord.com/api/bot/628186022991233025/votes", {
										headers: {
											"Authorization": "0a89751c18a802e9e9525a6fb7fc35840262f8953573ce46f4bfa785f3eba8af89f0267ef1c2a69de59a3b72427a641a07b214ebd7ec67cdb535ec1ad22a923b",
											"Content-Type": "application/json"
										},
									})
										.then(res => res.json())
										.then(data => {
											bfd = data.votesMonth;
											var vb;
											fetch("https://voidbots.net/api/auth/info/628186022991233025", {
										headers: {
											"Content-Type": "application/json"
										},
									})
										.then(res => res.json())
										.then(data => {
											vb = data.monthly_votes;
											return message.channel.send({
												embed: {
													color: message.config.embed.color,
													title: message.language.get("VOTE_TITLE"),
													description: message.language.get("VOTE_DESC", dbd, dbl, bls, bfd, vb),
												},
											});
										})
										})
								})
						})
				})


		} catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Vote;
