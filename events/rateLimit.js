module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(rateLimitInfo) {
		return console.log(rateLimitInfo);
	}
};
