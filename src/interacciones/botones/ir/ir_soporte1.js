const manager = require("../../../../manager.ts");
const ajustes = require("../../../../config");

const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        name: 'ir_soporte1'
    },
    async execute(interaction) {
        let soporte1 = interaction.guild.channels.cache.get("991497166881308812");
        let mi = interaction.member;
        let miembro = manager.get("miembro_ir");

        const embed_yaestais = new MessageEmbed()
        .setTitle("¡Ya estáis en soporte!")
        .setColor(ajustes.colores.incorrecto)

        const embed_nohayvc = new MessageEmbed()
        .setTitle("No se ha encontrado el canal de voz del usuario.")
        .setColor(ajustes.colores.incorrecto)

        const embed_noestasenvc = new MessageEmbed()
        .setTitle("¡No estás en un canal de voz!")
        .setColor(ajustes.colores.incorrecto)

        if(mi.voice.channel == undefined) return interaction.update({ embeds: [embed_noestasenvc] });
        if(miembro.voice.channel == undefined) return interaction.update({ embeds: [embed_nohayvc] });
        if(miembro.voice.channel == soporte1 && mi.voice.channel == soporte1) return interaction.update({ embeds: [embed_yaestais] });
        

        const embed_correcto = new MessageEmbed()
            .setTitle("Se os ha movido a ambos a Soporte 1.")
            .setColor(ajustes.colores.correcto);

        mi.voice.setChannel(soporte1, 'cuestiones de moderación.');
        miembro.voice.setChannel(soporte1, 'cuestiones de moderación.');


        interaction.update({ 
            embeds: [embed_correcto],
           // components: []
        });


    }
}