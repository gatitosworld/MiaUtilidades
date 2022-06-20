const Discord = require("discord.js");
const { Client, Intents, Collection } = require("discord.js");
import { mem } from './cmds/vc.js';

// == Node Basics ==
const fs = require("fs");
const path = require("path");

// === IMPORTACIÓN DE CONFIGURACIÓN ===
const ajustes = require("./config.js");

const client = new Client({

    intents: ajustes.intents.cargados

});

client.commands = new Collection();
const directorioCmds = path.join(__dirname, 'cmds');
const archivosCmds = fs.readdirSync(directorioCmds).filter(file => file.endsWith(".js"));

for (const file of archivosCmds) {

    const dirArchivos = path.join(directorioCmds, file);
    const comando = require(dirArchivos);
    client.commands.set(comando.data.name, comando);

}

client.on('ready', () => {

    console.log("Cliente iniciado correctamente.");

});

client.on('interactionCreate', async interaction => {

    if(interaction.isButton()) {
    if(interaction.customId.includes("_btn")) {

        if(interaction.customId.includes("calculardenuevo")) {

          let member = interaction.member;
          let result = mem.voice.channel;  // Canal de voz en el que se encuentra el usuario (si es que se encuentra en uno)

          if(!member.roles.cache.some(role => role.id === "988417077566132244")) return interaction.reply({ embeds: [embed1], ephemeral: true});
               const novc = new MessageEmbed()
                   .setTitle("<a:no:859503242421338152> El usuario no se encuentra en ningún canal de voz.")
                   .setColor("#da745e");
          if(result === null) return interaction.editReply({ embeds: [novc] }); // Si no se encuentra en ningún canal de voz.
               const sivc = new MessageEmbed()
                   .setDescription(`**He detectado que ${mem} está actualmente en ${result}**`)
                   .setColor("#da745e");
          interaction.editReply({ embeds: [sivc] });


        }

  }

}

	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: '¡Ha ocurrido un error al ejecutar este comando!', ephemeral: true });
	}
});


client.login(ajustes.cliente.token);