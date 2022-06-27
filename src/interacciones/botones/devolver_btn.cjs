const manager = require("../../../manager.ts");
const ajustes = require("../../../config");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: {
        name: 'devolver_btn'
    },
    async execute(interaction) {
// miembro -> undefined
        let mi = interaction.member;
        let miembro = manager.get("miembro_ir");
        let vc_volver_miembro = manager.get("Sps!hQ2GJ9^4"); // Canal de voz en el que estaba el miembro antes.
        let vc_volver_yo = manager.get("vc_volver"); // Canal de voz en el que estaba el staff antes.

        const embed_incorrecto = new MessageEmbed()
            .setTitle("Ha ocurrido un error.")
            .setDescription(`\`${vc_volver_miembro}\` y \`${vc_volver_yo}\``)
            .setColor(ajustes.colores.incorrecto)
        const embed_nohayvc = new MessageEmbed()
            .setTitle("No se ha encontrado el canal de voz del usuario.")
            .setColor(ajustes.colores.incorrecto)
        const embed_noestasenvc = new MessageEmbed()
            .setTitle("¡No estás en un canal de voz!")
            .setColor(ajustes.colores.incorrecto)

        const embed_correcto = new MessageEmbed()
            .setTitle("Se ha vuelto hacia atrás, tú y el usuario estáis en el punto de inicio.")
            .setColor(ajustes.colores.correcto);

        mi.voice.setChannel(vc_volver_yo, 'problema solventado.');
        miembro.voice.setChannel(vc_volver_miembro, 'problema solventado.');

        interaction.update({
            embeds: [embed_correcto],
            // components: []
        });


    }
}