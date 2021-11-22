function first2k(string){
	var sp = string.split("");
	var end = [];
	for(i=0;i<2000;i++){
		if(sp[i] != undefined){
			end.push(sp[i]);
		}
	}
	return end.join("");
}

function stringify(res){
	var end;
	if(typeof(res) == "object"){
		end = JSON.stringify(res);
	} else{
		end = res.toString();
	}
	return end;
}

module.exports = {
	api: {
		name: "get",
		description: "Sends a GET request to URL provided through arguments and sends response.",
		options: [
			{
				name: "url",
				description: "URL to request.",
				type: 3,
				required: true
			},
			{
				name: "headers",
				description: "The headers to use.",
				type: 3,
				required: false
			}
		]
	}, 
	run: (int, client, index) => {
		const axios = require("axios").default;
		int.reply("Sending a GET request to " + int.options.getString("url"));
		try{
			axios.request({url: int.options.getString("url"), headers: JSON.parse(int.options.getString("headers"))}).then(res => {
				int.followUp(first2k(stringify(res.data)));
			}).catch(e => {
				int.followUp("Error: " + e.stack);
			});
		} catch(e){
			int.followUp("Error: " + e.stack);
		}
	}
}