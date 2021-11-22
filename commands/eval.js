module.exports = {
	api: {
		name: "eval",
		description: "Evaluates code",
		options: [
			{
				name: "code",
				description: "Code to evaluate.",
				type: 3,
				required: false
			}
		]
	},
	run: (int, client, index) => {
		if(!process.worthy.get("codeExec").includes(int.user.id)) return int.reply("You are not worthy of wielding the power of the eval.");
		var args = int.options.getString("code");
		try{
			int.reply({content: new String(eval(args)).valueOf(), ephemeral: true}).catch(e => {int.reply({content: e.stack, ephemeral: true})});
		} catch(e){
			int.reply({content: e.stack, ephemeral: true});
		}
	}
}