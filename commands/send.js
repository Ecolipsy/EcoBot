module.exports = {
	api: {
		name: "send",
		description: "Sends a message in current or specificed channel.",
		options: [
			{
				name: "message",
				description: "Message to send",
				type: 3,
				required: true
			},
			{
				name: "channel",
				description: "Channel to send it in",
				type: 7,
				required: false
			}
		]
	},
	run: (int, client, index) => {
		const message = int.options.getString("message");
		const specifiedChannel = int.options.getChannel("channel");
		const channel = !!specifiedChannel ? specifiedChannel : int.channel;
		channel.send(message).then(msg => {
			int.reply({content: "Message sent!", ephemeral: true});
		});
	}
}