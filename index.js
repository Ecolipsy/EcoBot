const { Client, Intents } = require('discord.js');
const express = require("express");
const crypto = require("crypto");
const app = express();
const parser = require("body-parser");
app.use(parser.json());
app.use(parser.urlencoded({extended: false}));
app.use(parser.text());
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const load = require("load-slash-commands");
const fs = require("fs");
var commands = [];
const ws = require("ws");
const server = new ws.Server({port: 443});
var connections = [];

server.on("connection", (conn) => {
	console.log("Connection.");
	connections.push(conn);
	conn.on("close", () => {
		connections.splice(connections.indexOf(conn), 1);
	});
	conn.on("error", () => {});
});

server.on("listening", () => {console.log("LIstening!!!")});

class Logger{
	log(msg){
		connections.forEach((conn) => {
			conn.send(JSON.stringify({op: "LOG", message: msg}));
		});
		console.log(msg);
	}
	warn(msg){
		connections.forEach((conn) => {
			conn.send(JSON.stringify({op: "WARN", message: msg}));
		});
		console.warn(msg);
	}
	error(msg){
		connections.forEach((conn) => {
			conn.send(JSON.stringify({op: "ERROR", message: msg}));
		});
		console.error(msg);
	}
}

async function loadCommands(guild){
	commands.forEach(cmd => {
		delete require.cache[require.resolve(cmd.path)];
	});
	commands = [];
	var api = [];
	var cmdDir = fs.readdirSync("commands");
	cmdDir.forEach(async (cmdPath) => {
		var path = "./commands/" + cmdPath;
		var cmdModule = require(path);
		if(process.options.get("disabledCommands").includes(cmdModule.name)) return;
		cmdModule.path = path;
		commands.push(cmdModule);
		api.push(cmdModule.api);
	});
	client.guilds.cache.get("733451782063390790").commands.set(api);
	console.log("Done loading all commands.");
}
process.loadCommands = loadCommands;

class ConfigApi{
	constructor(file){ 
		this.fileName = file;
		this.config = JSON.parse(fs.readFileSync(this.fileName).toString());
	}
	reload(){
		this.config = JSON.parse(fs.readFileSync(this.fileName).toString());
	}
	get(key){
		this.reload();
		return this.config[key];
	}
	set(key, value){
		this.reload();
		this.config[key] = value;
		fs.writeFileSync(file, JSON.stringify(this.config));
		this.reload();
	}
}
process.ConfigApi = ConfigApi;
process.options = new ConfigApi("config.json");
process.worthy = new ConfigApi("worthy.json");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
	loadCommands();
	/*
	client.guilds.fetch("733451782063390790").then(yes => {
		console.log(yes);
		loadCommands(yes);
	});
	*/
	app.get("/", (req, res) => {
		res.sendFile(__dirname + "/panel/index.html");
	});
	app.get("/index.js", (req, res) => {
		res.sendFile(__dirname + "/panel/index.js");
	});
	app.get("/login", (req, res) => {
		res.sendFile(__dirname + "/panel/login.html");
	});
	app.get("/login.js", (req, res) => {
		res.sendFile(__dirname + "/panel/login.js");
	});
	app.post("/api/login", (req, res) => {
		var pubHash = crypto.createHash("sha256");
		pubHash.update(req.body);
		var pub = pubHash.digest("hex");
		var auth = JSON.parse(fs.readFileSync("auth.json").toString());
		var userObj = null;
		Object.keys(auth.users).forEach(user => {
			if(auth.users[user] == pub) userObj = {user, token: auth.users[user]}
		});
		if(userObj === null){
			res.json({success: false});
		} else{
			res.json({success: true, user: userObj});
		}
	});
});

client.on('interactionCreate', async interaction => {
  if(interaction.isCommand()){
		commands.forEach(cmd => {
			if(interaction.commandName == cmd.api.name){
				try{
					cmd.run(interaction, client, this);
				} catch(e){
					console.log("An error occured whilst attempting to run a command:");
					console.log(e);
				}
			}
		});
	}
});

client.on("messageCreate", (msg) => {
	if(msg.content.startsWith(">")){
		if(!process.worthy.get("codeExec").includes(msg.author.id)) return msg.channel.send("You shall not pass.");
		const args = msg.content.replace(">", "");
		try{
			msg.channel.send(new String(eval(args)).valueOf()).catch(e => {});
		} catch(e){
			msg.channel.send(e.stack).catch(e => {});
		}
	}
});

client.login(process.env.TOKEN);
app.listen(3000);