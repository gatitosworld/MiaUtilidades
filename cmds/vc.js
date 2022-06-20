const { PermissionFlagsBits } = require('discord-api-types/v10');
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("comprobarvoice")
        .setDescription("Comprueba el canal de voz en el que está un usuario.")
        .addUserOption(option => option.setName("usuario").setDescription("Nombre del usuario."))
        .setDMPermission(false)
        .setDefaultMemberPermissions( PermissionFlagsBits.ManageMessages ), // Si puede gestionar mensajes ->
    async execute(interaction) { 
        const mem = interaction.options.getMember("usuario");
        let member = interaction.member;

        const embed1 = new MessageEmbed()
        .setTitle("¡No tienes permiso para ejecutar eso!")
        .setColor("#da745e");
  
      
      if(!member.roles.cache.some(role => role.id === "988417077566132244")) return interaction.reply({ embeds: [embed1], ephemeral: true});

        const embedno = new MessageEmbed()
        .setTitle("<a:no:859503242421338152> El usuario no se encuentra en ningún canal de voz.")
        .setColor("#da745e")
        
        const calculardenuevo = new MessageButton()
        .setCustomId("calculardenuevo_btn")
        .setLabel("Comprobar")
        .setStyle("DANGER")
           const button = new MessageActionRow()
        .addComponents(calculardenuevo)

        let result = mem.voice.channel;  
      if(result == null) return interaction.reply({ embeds: [embedno], components: [button]}); 
      
          const embedyes = new MessageEmbed()
          .setDescription(`**He detectado que ${mem} está actualmente en ${result}**`)
          .setColor("#da745e")
  
          interaction.reply({ embeds: [embedyes], components: [button] }); 
  
      },
       
}
