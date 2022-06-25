const Discord = require("discord.js");
const { Client, Intents, Collection } = require("discord.js");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

// == Node Basics ==
const fs = require("fs");
const path = require("path");

// === IMPORTACIÓN DE CONFIGURACIÓN ===
const ajustes = require("./config.js");
const manager = require("./manager");

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
            const members = manager.get("mem");
            const interaction1 = manager.get("interaction1");

            const embed1 = new MessageEmbed()
            .setTitle("¡No tienes permiso para ejecutar eso!")
              .setColor("#da745e");
          
          if(!member.roles.cache.some(role => role.id === ajustes.cliente.rolId)) return interaction.reply({ embeds: [embed1], ephemeral: true});

          let result = members.voice.channel;  
          let vcinvite = await result.createInvite({ unique: true });
          let link = `https://discord.gg/${vcinvite.code}`  
          let calculardenuevo = manager.get("calculardenuevo");

        let unirseavc = new MessageButton()
            .setStyle("LINK")
            .setLabel("Unirse al vc")
            .setURL(link)

        let button = new MessageActionRow()
        .addComponents(calculardenuevo)
        .addComponents(unirseavc)
          
        

        let embedno = new MessageEmbed()
        .setTitle("Vaya...")
        .setDescription("<a:no:859503242421338152> **El usuario no se encuentra en ningún canal de voz.**")
        .setColor("#da745e")

    
        if(result == null) return await interaction1.editReply({ embeds: [embedno] }); 
        
        let embedyes = new MessageEmbed()
        .setTitle("¡Hecho!")
        .setDescription(`**He detectado que ${members} está actualmente en ${result}**`)
        .setColor("#57cc26")
            
          
            await interaction1.editReply({ embeds: [embedyes] }); 
            await interaction.update({ embeds: [embedyes], components: [button] });


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

client.on("messageCreate", async (message) =>{

    // Evento

});


client.login(ajustes.cliente.token);