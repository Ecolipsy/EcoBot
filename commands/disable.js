module.exports = {
	addables: {},
	api: {
		name: "disable",
		description: "Disable command specified.",
		options: [
			{
				name: "command",
				description: "Command to disable.",
				type: 3
			}
		]
	},
	run: (int, client, index) => {
		var command = int.options.getString("command");
		var commandObj = null;
		int.guild.commands.cache.forEach(cmd => {
			console.log(cmd.options.name);
			if(cmd.options.name !== command);
			commandObj = cmd;
		});
		if(commandObj === null) return int.reply("This command does not exist.");
		var currDisabled = process.options.get("disabledCommands");
		if(currDisabled.includes(command)) return int.reply("Ths command is already disabled.");
		currDisabled.push(command);
		process.options.set("disabledCommands",currDisabled);
		int.reply("Disabled command \"" + command + "\".");
	}
}