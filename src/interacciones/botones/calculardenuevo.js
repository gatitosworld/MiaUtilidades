const { ButtonBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const ajustes = require("../../../config");
const manager = require("../../../manager.ts");

module.exports = {
  data: {
    name: 'calculardenuevo_btn'
  },
  async execute(interaction) {
    let member = interaction.member;
    const members = manager.get("mem");
    const interaction1 = manager.get("interaction1");

    const embed1 = new MessageEmbed()
      .setTitle("¡No tienes permiso para ejecutar eso!")
      .setColor("#da745e");

    if (!member.roles.cache.some(role => role.id === ajustes.cliente.rolId)) return interaction.reply({ embeds: [embed1], ephemeral: true });

    let result = members.voice.channel;
    let calculardenuevo = manager.get("calculardenuevo");
    let button2 = manager.get("button2");
  
    let embedno = new MessageEmbed()
      .setTitle("Vaya...")
      .setDescription("<a:no:859503242421338152> **El usuario no se encuentra en ningún canal de voz.**")
      .setColor("#da745e")
    

    if (result == null) return await interaction1.editReply({ embeds: [embedno], components: [button2] });
    let vcinvite = await result.createInvite({ unique: true });
    let link = `https://discord.gg/${vcinvite.code}`
    let unirseavc = new MessageButton()
    .setStyle("LINK")
    .setLabel("Unirse al vc")
    .setURL(link)
    
    let button = new MessageActionRow()
    .addComponents(calculardenuevo)
    .addComponents(unirseavc)

    let embedyes = new MessageEmbed()
      .setTitle("¡Hecho!")
      .setDescription(`**He detectado que ${members} está actualmente en ${result}**`)
      .setColor("#57cc26")


    await interaction1.editReply({ embeds: [embedyes] });
    await interaction.update({ embeds: [embedyes], components: [button] });

  }
}
