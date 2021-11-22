module.exports = {
	api: {
		name: "fox",
		description: "Sends a random image of a fox"
	},
	run: (int, client, index) => {
		const axios = require("axios").default;
		axios("https://randomfox.ca/floof/").then(res => {
			console.log(res.data.image);
			int.reply({embeds: [{title: "Fox", image: {url: res.data.image}, color: 0xFFA500}]});
		});
	}
}