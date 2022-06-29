const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const ajustes = require("../../../config");
const manager = require("../../../manager.ts");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ir")
        .setDescription("Ir al canal de voz de un usuario determinado.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages, PermissionFlagsBits.MuteMembers)
        .addUserOption(option => option.setName("usuario").setDescription("Te mueve al canal en el que se encuentra un usuario.").setRequired(true))
        .setDMPermission(false),

    async execute(db, interaction) {

        let miembro = interaction.options.getMember("usuario");
        let yo = interaction.member;
        const embed_incorrecto = new MessageEmbed()
            .setTitle("El usuario no está en ningún canal de voz.")
            .setColor(ajustes.colores.incorrecto);

        if(miembro.voice.channel == undefined) return interaction.reply({ embeds: [embed_incorrecto], ephemeral: true });
        let vc_volver = yo.voice.channel; // Canal de voz en el que estaba antes de ser movido
        let vc_volver_m = miembro.voice.chanel;
        manager.post("vc_volver", vc_volver); // ^ se guarda en la base de datos temporal
        manager.post("Sps!hQ2GJ9^4", vc_volver_m); // Guarda en el canal en el que se encontraba el usuario al ejecutar la interacción
        manager.post("miembro_ir", miembro); // Se guarda el miembro mencionado en la interacción para actuar con él en los botones

        const embed = new MessageEmbed()
            .setTitle("¿Está realmente seguro de que quiere hacer esto?")
            .setColor("#4373d1");
        const ir_btn = new MessageButton()
            .setCustomId("ir_btn")
            .setStyle("PRIMARY")
            .setEmoji("845983633134059520")
            .setLabel("Ir")
        const volver_btn = new MessageButton()
            .setCustomId("volver_btn")
            .setStyle("SECONDARY")
            .setEmoji("↩️")
        const ir_soporte1 = new MessageButton()
            .setCustomId("ir_soporte1")
            .setStyle("DANGER")
            .setEmoji("990780011298566174")
            .setLabel("Soporte 1")
        const ir_soporte2 = new MessageButton()
            .setCustomId("ir_soporte2")
            .setStyle("DANGER")
            .setEmoji("990780011298566174")
            .setLabel("Soporte 2")
  /*      const devolver_btn = new MessageButton()
            .setCustomId("devolver_btn")
            .setStyle("SUCCESS")
            .setEmoji("991022821750763571")
            .setLabel("Devolver") */

        const ir_row = new MessageActionRow()
            .addComponents(ir_btn)
            .addComponents(volver_btn)
            .addComponents(ir_soporte1)
            .addComponents(ir_soporte2)
      //      .addComponents(devolver_btn)

        interaction.reply({ embeds: [embed], components: [ir_row], ephemeral: true });

    }

}