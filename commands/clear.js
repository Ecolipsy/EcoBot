module.exports = {
	api: {
		name: "clear",
		description: "Clears out a bunch of messages.",
		options: [
			{
				name: "count",
				description: "Amount of messages to clear.",
				type: 4,
				min_value: 1,
				max_value: 100
			}
		]
	},
	run: (int, client, index) => {
		var messageCount = int.options.getInteger("count");
		int.reply("Clearing messages...");
		int.channel.bulkDelete(messageCount).then(yes => {
			int.followUp("Done.");
		}).catch(e => {
			int.followUp("Smth happened: " + e.message);
		});
	}
}