module.exports = {
	api: {
		name: "bonk",
		description: "Bonks someone",
		options: [
			{
				name: "user",
				description: "Who to bonk?",
				type: 6,
				required: true
			}
		]
	},
	run: (int, client, index) => {
		int.reply(`<@!${int.options.getUser("user").id}> <a:bonk:912288114238693406>`);
	}
}