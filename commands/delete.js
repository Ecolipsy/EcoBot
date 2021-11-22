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
		name: "delete",
		description: "Sends a DELETE request to URL provided through arguments and sends response.",
		options: [
			{
				name: "url",
				description: "URL to request.",
				type: 3,
				required: true
			},
			{
				name: "body",
				description: "The data to DELETE.",
				type: 3,
				required: false
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
		int.reply("Sending a DELETE request to " + int.options.getString("url"));
		try{
			axios.request({method: "DELETE", url: int.options.getString("url"), data: int.options.getString("body"), headers: JSON.parse(int.options.getString("headers"))}).then(res => {
				int.followUp(first2k(stringify(res.data)));
			}).catch(e => {
				int.followUp("Error: " + e.stack);
			});
		} catch(e){
			int.followUp("Error: " + e.stack);
		}
	}
}