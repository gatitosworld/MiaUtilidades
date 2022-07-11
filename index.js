const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const settings = require("./config");
const path = require("path");

const { QuickDB } = require('quick.db');
const db = new QuickDB();

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_WEBHOOKS]
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
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.name, (...args) => event.execute(client, db, ...args));
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
const buttonFolders = fs.readdirSync('./src/interacciones/botones');

for (const folder of buttonFolders) {
    const buttonFiles = fs.readdirSync(`./src/interacciones/botones/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of buttonFiles) {
        const button = require(`./src/interacciones/botones/${folder}/${file}`);
        client.buttons.set(button.data.name, button);
    }
}

/* ===== SETUP DE LA BASE DE DATOS ===== */
async function configurar(){
	let database = await db.get('wl');
	let blacklist_db = await db.get('blacklist');

	if(database != null) {
		console.log("Ya existe una base de datos para 'whitelist'. Skipeando.");
	} else {
		await db.push('wl', ['discord.com', 'discord.gift']);
		console.log("Base de datos para 'whitelist' creada satisfactoriamente.");
	}

	/* if(blacklist_db != null) {
		console.log("Ya existe una base de datos para 'blacklist'. Skipeando.");
	} else {
		await db.set('blacklist', { datos: { usuario: "id-ejemplo", razon: "id-razon", id_razon: 0 } });
		console.log("Base de datos para 'blacklist' creada correctamente.");
	} */

}

try {
	configurar();
} catch (e) {
	console.log("Ha ocurrido un error al configurar la base de datos.")
}



client.login(settings.cliente.token);