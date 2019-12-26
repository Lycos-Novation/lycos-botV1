const Command = require("../../base/Command.js");
const { toFile } = require("qrcode");
const { file } = require("tempy");

const qrOutput = file({
	extension: "png",
});

class QRCode extends Command {
	constructor(client) {
		super(client, {
			name: "qrcode",
			description: (language) => language.get("QRCODE_DESCRIPTION"),
			usage: (language, prefix) => language.get("QRCODE_USAGE", prefix),
			examples: (language, prefix) => language.get("QRCODE_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			permLevel: "User",
			botPermissions: ["EMBED_LINKS"],
			nsfw: false,
			adminOnly: false,
			cooldown: 1000,
		});
	}

	run(message, args) {
		try {
			if (args[0]) {
				message.channel.startTyping();
				toFile(qrOutput, args.join(" "), {
					margin: 3,
				}, (error) => {
					if (error) throw new Error(error);
					message.channel.send({
						files: [{
							attachment: qrOutput,
							name: "QRCode.png",
						}],
					});
					message.channel.stopTyping();
				});
			}
			else {
				return message.channel.send(message.language.get("QRCODE_MESSAGE"));
			}
		}
		catch (error) {
			console.error(error);
			message.channel.stopTyping();
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = QRCode;
