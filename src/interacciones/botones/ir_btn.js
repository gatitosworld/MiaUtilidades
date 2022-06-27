const manager = require("../../../manager.ts");
const ajustes = require("../../../config")

module.exports = {
    data: {
        name: 'ir_btn'
    },
    async execute(interaction) {

        let miembro = manager.get("miembro_ir");
        let vc_ir = miembro.voice.channel;
        let yo = interaction.member;

        const embed = new MessageEmbed()
            .setTitle("¿Está realmente seguro de que quiere hacer esto?")
            .setColor();


        interaction.update({ 
            embeds: [],
            components: []
        });


    }

}