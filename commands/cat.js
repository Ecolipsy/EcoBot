module.exports = {
	api: {
		name: "cat",
		description: "Sends a random image of a cat"
	},
	run: (int, client, index) => {
		const axios = require("axios").default;
		axios("https://api.thecatapi.com/v1/images/search").then(res => {
			int.reply({embeds: [{title: "Cat", image: {url: res.data[0].url}, color: 0xFFC0CB}]});
		});
	}
}