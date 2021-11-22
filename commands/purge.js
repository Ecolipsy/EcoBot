const request = require("axios").default;
module.exports = {
	api: {
		name: "purge",
		description: "Purges the first 100 messages in a channel."
	},
	run: (int, client, index) => {
		request(
			{
				url: "https://discord.com/api/v9/channels/" + int.channel.id + "/messages?limit=100",
				headers: {
					Authorization: "Bot " + client.token
				}
			}
		).then(res => {
			request(
					{
						url: "https://discord.com/api/v9/channels/" + int.channel.id + "/messages/",
						method: "DELETE",
						headers: {
							Authorization: "Bot " + client.token
						}
					}
			);
		});
	}
}