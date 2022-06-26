const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const manager = require("./manager.ts");

const ajustes = require("./config");
const path = require("path");

const client = new Client({
    intents: ajustes.intents.cargados
});

// === Colecciones ===
client.commands = new Collection();
client.buttons = new Collection();

/* ===== EVENTOS ===== */
const eventsPath = path.join(__dirname, 'src/eventos');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file1 of eventFiles) {
	const filePath1 = path.join(eventsPath, file1);
	const event = require(filePath1);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

/* ===== COMANDOS ===== */
const commandsPath = path.join(__dirname, 'src/interacciones/cmds');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file2 of commandFiles) {
	const filePath2 = path.join(commandsPath, file2);
	const command = require(filePath2);
	client.commands.set(command.data.name, command);
}

/* ===== BOTONES ===== */
const botonesPath = path.join(__dirname, 'src/interacciones/botones');
const botonesFiles = fs.readdirSync(botonesPath).filter(file => file.endsWith('.js'));

for (const file3 of botonesFiles) {
	const filePath3 = path.join(botonesPath, file3);
	const boton = require(filePath3);
	client.buttons.set(boton.data.name, boton);
}


client.login(ajustes.cliente.token);