const manager = require("../../../../manager.ts");
const ajustes = require("../../../../config");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        name: 'ir_btn'
    },
    async execute(interaction) {
        let mi = interaction.member;

        let miembro = manager.get("miembro_ir");
        let vc_ir = miembro.voice.channel;
       
        const embed_incorrecto = new MessageEmbed()
        .setTitle("¡Ya estás en el canal de voz del usuario!")
        .setColor(ajustes.colores.incorrecto)

        const embed_nohayvc = new MessageEmbed()
        .setTitle("No se ha encontrado el canal de voz del usuario.")
        .setColor(ajustes.colores.incorrecto)

        const embed_noestasenvc = new MessageEmbed()
        .setTitle("¡No estás en un canal de voz!")
        .setColor(ajustes.colores.incorrecto)

        if(vc_ir == undefined) return interaction.update({ embeds: [embed_nohayvc] });
        if(vc_ir == mi.voice.channel) return interaction.update({ embeds: [embed_incorrecto] });
        if(mi.voice.channel == undefined) return interaction.update({ embeds: [embed_noestasenvc] });

        const embed_correcto = new MessageEmbed()
            .setTitle("Se te ha movido al canal del usuario seleccionado.")
            .setColor(ajustes.colores.correcto);

        mi.voice.setChannel(vc_ir, 'cuestiones de moderación.');


        interaction.update({ 
            embeds: [embed_correcto],
           // components: []
        });


    }

}