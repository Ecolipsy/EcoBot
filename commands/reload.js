module.exports = {
	api: {
		name: "reload",
		description: "Command to reload all commands."
	},
	run: async (int, client, index) => {
		int.reply(`Reloading...`);
		await process.loadCommands();
		int.followUp("Reload complete.");
	}
}