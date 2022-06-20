// == Node Basics ==
const fs = require("fs");
const path = require("path");

// == Interacciones con la API ==
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");


// === IMPORTACIÓN DE CONFIGURACIÓN ===
const ajustes = require("./config");

const cmds = [];
const directorioCmds = path.join(__dirname, 'cmds');
const archivosCmds = fs.readdirSync(directorioCmds).filter(file => file.endsWith(".js"));

for (const file of archivosCmds) {
    const dirArchivos = path.join(directorioCmds, file);
    const comando = require(dirArchivos);
    cmds.push(comando.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(ajustes.cliente.token);
    rest.put(Routes.applicationGuildCommands(ajustes.cliente.clientId, ajustes.cliente.guildId), { body: cmds }).then(() => console.log('Comandos registrados correctamente.')).catch(console.error);
