module.exports = {
	api: {
		name: "getwholepercent",
		description: "Get a whole percentage from and to something.",
		options: [
			{
				name: "from",
				description: "Number from",
				type: 4,
				required: true
			},
			{
				name: "to",
				description: "Number to",
				type: 4,
				required: true
			}
		]
	},
	run: (int, client, index) => {
		var fromNum = int.options.getInteger("from");
		var toNum = int.options.getInteger("to");
		int.reply(`Final number: ${Math.round(fromNum/toNum*100)}.`);
	}
}