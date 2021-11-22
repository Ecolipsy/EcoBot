function addMessage(message){
	var color;
	if(message.type == "LOG"){
		color = "#000000";
	} else if(message.type == "ERROR"){
		color = "#FF0000";
	} else if(message.type == "WARN"){
		color = "#FFFF00";
	}
	var el = document.createElement("p");
	el.innerHTML = "<strong>" + message.type + "</strong> " + message.text;
	var messageDiv = document.getElementById("logs");
	el.style.color = color;
	messageDiv.appendChild(messageDiv);
}

var maintenence = false;
window.onload = function(){
	if(!localStorage.token) window.location.replace("/login");
	const ws = new WebSocket("wss://EcoBotv2.ecolipsy.repl.co");
	ws.addEventListener("message", (msg) => {
		var data = JSON.parse(msg.data);
		var msg = {
			text: data.message
		}
		if(data.op == "LOG"){
			msg.type = "LOG";
			addMessage(msg);
		} else if(data.op == "ERROR"){
			msg.type = "ERROR";
			addMessage(msg);
		} else if(data.op == "WARN"){
			msg.type = "WARN";
			addMessage(msg);
		}
	});
	ws.addEventListener("open", () => {
		console.log("Connected.");
	});
}