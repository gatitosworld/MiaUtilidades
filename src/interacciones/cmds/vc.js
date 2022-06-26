const { PermissionFlagsBits } = require('discord-api-types/v10');
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageButton, MessageActionRow, Invite } = require("discord.js");
const ajustes = require("../../../config");
const manager = require("../../../manager.ts");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("comprobarvoice")
        .setDescription("Comprueba el canal de voz en el que está un usuario.")
        .addUserOption(option => option.setName("usuario").setDescription("Nombre del usuario."))
        .setDMPermission(false)
        .setDefaultMemberPermissions( PermissionFlagsBits.ManageMessages ), // Si puede gestionar mensajes ->
    async execute(interaction) { 
      let mem = interaction.options.getMember("usuario");
      manager.post("mem", mem); // Almacena localmente el usuario de la interacción.
      manager.post("interaction1", interaction);
        let member = interaction.member;

        const embed1 = new MessageEmbed()
        .setTitle("¡No tienes permiso para ejecutar eso!")
        .setColor("#da745e");
  
      
      if(!member.roles.cache.some(role => role.id === ajustes.cliente.rolId)) return interaction.reply({ embeds: [embed1], ephemeral: true});

      const embedno = new MessageEmbed()
      .setTitle("Vaya...")
      .setDescription("<a:no:859503242421338152> **El usuario no se encuentra en ningún canal de voz.**")
      .setColor("#da745e")
      
        let result = mem.voice.channel; 

        const calculardenuevo = new MessageButton()
        .setCustomId("calculardenuevo_btn")
        .setLabel("Comprobar")
        .setStyle("DANGER")
        
        const button2 = new MessageActionRow()
        .addComponents(calculardenuevo)
        manager.post("button2", button2);
        manager.post("calculardenuevo", calculardenuevo); 

        if(result == null) return interaction.reply({ embeds: [embedno], components: [button2]}); 
        let vcinvite = await result.createInvite({ unique: true });
        let link = `https://discord.gg/${vcinvite.code}`;

        const unirseavc = new MessageButton()
        .setStyle("LINK")
        .setLabel("Unirse al vc")
        .setURL(link)
        
           const button = new MessageActionRow()
        .addComponents(calculardenuevo)
        .addComponents(unirseavc)


        manager.post("button", button);

       
      
     const embedyes = new MessageEmbed()
         .setTitle("¡Hecho!")
         .setDescription(`**He detectado que ${mem} está actualmente en ${result}**`)
         .setColor("#57cc26")
  
          interaction.reply({ embeds: [embedyes], components: [button] }); 
  
      },
       
}
