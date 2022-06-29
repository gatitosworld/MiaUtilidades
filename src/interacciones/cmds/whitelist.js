const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v10");
const { MessageEmbed, MessageButton } = require("discord.js");
const gw = require("gatitosworld-api");
const ajustes = require("../../../config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("whitelist")
        .setDescription("Agrega un enlace a la whitelist en la API.")
        .addStringOption(option =>
            option.setName("acción")
                .setDescription("La acción que deseas hacer, añadir o remover el enlace.")
                .setRequired(true)
                .addChoices(
                    { name: "añadir", value: "añadir" },
                    { name: "remover", value: "remover" }))
        .addStringOption(option =>
            option.setName("enlace")
                .setDescription("Agrega el enlace en sí: ponerlo sin HTTP o HTTPS.")
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages, PermissionFlagsBits.KickMembers)
        .setDMPermission(false),

    async execute(db, interaction) {


        const enlace = interaction.options.getString("enlace");

        const arr = await db.get('wl');

        if (interaction.options.getString("acción") == "añadir") {
            let embed_yaesta = new MessageEmbed()
                .setTitle(`Parece que el término ${enlace} ya se encuentra en la base de datos.`)
                .setColor(ajustes.colores.incorrecto)

            let embed_nolink = new MessageEmbed()
                .setTitle("Hey! Pon únicamente la página sin los HTTP(S) o //")
                .setColor(ajustes.colores.incorrecto);

            let link = gw.links(enlace);
            if (link) return interaction.reply({ embeds: [embed_nolink], ephemeral: true });

            if (arr.includes(enlace)) return interaction.reply({ embeds: [embed_yaesta], ephemeral: true });

            await db.push('wl', enlace);
            let uwu = await db.get('wl');
            let arrayastring = uwu.join(', ');

            let embed_correcto = new MessageEmbed()
                .setTitle(`Se ha añadido ${enlace} correctamente.`)
                .setDescription(`\`\`\`yaml\n${arrayastring}\`\`\``)
                .setColor(ajustes.colores.correcto);

            interaction.reply({ embeds: [embed_correcto], ephemeral: true });
        }

        if(interaction.options.getString("acción") == "remover") {

            let arrayastring = arr.join(', ');
            let embed_noesta = new MessageEmbed()
                .setTitle(`El término ${enlace} para no estar en la base de datos.`)
                .setDescription(`Listado:\n\`\`\`yaml\n${arrayastring}\`\`\``)
                .setColor(ajustes.colores.incorrecto);

            let embed_error = new MessageEmbed()
                .setTitle(`Ha ocurrido un error al eliminar ${enlace}. Ya nos hemos puesto en contacto con el desarrollador.`)
                .setColor(ajustes.colores.incorrecto);
            
            if(arr.includes(enlace)) {

                try {

                    await db.pull('wl', enlace);
                    let uwu = await db.get('wl');
                    let arrayastring = uwu.join(', ');

                    let embed_correcto = new MessageEmbed()
                    .setTitle(`Se ha eliminado correctamente ${enlace} de la base de datos.`)
                    .setDescription(`\`\`\`yaml\n${arrayastring}\`\`\``)
                    .setColor(ajustes.colores.correcto);

                    interaction.reply({ embeds: [embed_correcto], ephemeral: true });

                } catch (e) {

                    interaction.reply({ embeds: [embed_error] });
                    console.error(e);
                    // custom error handler
                } /*finally {
                    
                } */

            } else {
                return interaction.reply({ embeds: [embed_noesta], ephemeral: true });
            }

            

        }


    }
        
}