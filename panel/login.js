function createMessage(text, type){
	var messages = document.getElementById("msgs");
	var color;
	if(type === 0){
		color = "#00FF00";
	} else if(type === 1){
		color = "#FF0000";
	} else if(type === 2){
		color = "#FFFF00";
	}
	var msg = document.createElement("p");
	msg.innerHTML = text;
	msg.style.backgroundColor = color;
	msg.style.color = "#FFFFFF";
	messages.appendChild(msg);
}

window.onload = function(){
	document.getElementById("login").addEventListener("click", (ev) => {
		var key = document.getElementById("key");
		key.files[0].text().then(token => {
		fetch("/api/login", {method: "POST", headers: {"content-type": "text/plain"}, body: token}).then(results => {
			results.json().then(res => {
				if(res.success){
					localStorage.token = token;
					localStorage.username = res.user.user;
					window.location.replace("/");
				} else{
					createMessage("Incorrect key.", 1);
				}
			});
		}).catch(console.error);
		});
	});
}