module.exports = {
	api: {
		name: "ping",
		description: "Simple command to show latency"
	},
	run: (int, client, index) => {
		int.reply("My ping is: " + client.ws.ping + " ms");
	}
}