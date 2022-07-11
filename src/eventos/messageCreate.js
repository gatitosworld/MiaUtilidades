const { MessageEmbed } = require("discord.js");
const gw = require("gatitosworld-api");
const ajustes = require("../../config");

module.exports = {
    name: 'messageCreate',
    async execute(client, db, message) {

        if (message.author.bot) return;
        if (message.member.permissions.has("ADMINISTRATOR")) return;

        let mods_twitch = "868256143938564136"
        let ticket_parent = "827214252787499050";
        let staff_parent = "849284765554442270";
        if (message.channel.id == mods_twitch) return;
        if (message.channel.parentId == ticket_parent) return;
        if (message.channel.parentId == staff_parent) return;


        const embed_links = new MessageEmbed()
            .setTitle("¡No se permiten links externos en GatitosWorld!")
            .setColor(ajustes.colores.incorrecto)

        const embed_waltext = new MessageEmbed()
            .setTitle("¡Trata de no mandar mensajes con tantas líneas que puedan saturar la pantalla!")
            .setColor(ajustes.colores.incorrecto)

        let link = gw.links(message.content);
        let arr = await db.get('wl'); // Array  
        let whl = gw.whitelist(message.content, arr);
        let walltext = gw.walltext(message.content);
        let wltxflood = gw.wltxflood(message.content);
        if (walltext && message.channel.id == "851869089639301211" || wltxflood && message.channel.id == "851869089639301211") return console.log("[AntiLinks] El mensaje se ha enviado en un canal autorizado."); // Roleplay

        if (whl) return;

        if (link) {
            message.reply({ embeds: [embed_links] })
                .then(msg => {
                    setTimeout(() => msg.delete().catch(error => {
                        console.error("No se ha podido eliminar el mensaje:", error);
                    }), 3000)
                });
            setTimeout(() => message.delete().catch(error => {
                console.error("No se ha podido eliminar el mensaje:", error);
            }), 3000)
        };


        if (walltext) {
            message.reply({ embeds: [embed_waltext] })
                .then(msg => {
                    setTimeout(() => msg.delete().catch(error => {
                        console.error("No se ha podido eliminar el mensaje:", error);
                    }), 3000)
                });
            setTimeout(() => message.delete().catch(error => {
                console.error("No se ha podido eliminar el mensaje:", error);
            }), 3000)
        }

        if (wltxflood && message.content.length > 200) {
            message.reply({ embeds: [embed_waltext] })
                .then(msg => {
                    setTimeout(() => msg.delete().catch(error => {
                        console.error("No se ha podido eliminar el mensaje:", error);
                    }), 3000)
                });
            setTimeout(() => message.delete().catch(error => {
                console.error("No se ha podido eliminar el mensaje:", error);
            }), 3000)
        }

    }

}