module.exports = {
	api: {
		name: "capybara",
		description: "Sends a random image of a capybara"
	},
	run: (int, client, index) => {
		var dir = require("fs").readdirSync("capybara");
		int.reply({content: "Capybara", files: [__dirname + "/../capybara/" + dir[Math.floor(Math.random()*dir.length)]]});
	}
}