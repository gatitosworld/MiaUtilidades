const { MessageEmbed } = require("discord.js");
const gw = require("gatitosworld-api");
const ajustes = require("../../config");

module.exports = {
    name: 'messageCreate',
    async execute(client, db, message) {

        const embed_links = new MessageEmbed()
            .setTitle("¡No se permiten links externos en GatitosWorld!")
            .setColor(ajustes.colores.incorrecto)

        let link = gw.links(message.content);   
        let arr = await db.get('wl'); // Array  
        let whl = gw.whitelist(message.content, arr);

        let matt = "216746923070062593";
        let cap = "408728483808673792";
        let ticket_parent = "827214252787499050";
        let staff_parent = "849284765554442270";

        if (link && message.channel.parentId == ticket_parent) return console.log("[AntiLinks] Se ha enviado en un ticket. Autorizado.");
        if (link && message.channel.parentId == staff_parent) return console.log("[AntiLinks] Se ha enviado en un canal de staff. Autorizado.")
        if (link && message.author.id === cap) return console.log("[AntiLinks] El/los usuario/s está/n autorizado/s.");
        if (link && message.author.id === matt) return console.log("[AntiLinks] El/los usuario/s está/n autorizado/s.");
        if (whl) return;

        if (link) {

            message.reply({ embeds: [embed_links] })
                .then(msg => {
                    setTimeout(() => msg.delete(), 3000)
                });

            setTimeout(() => message.delete(), 3000)

        };

    }

}