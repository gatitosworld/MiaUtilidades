
const { Intents } = require("discord.js"); // Para prevenir errores -> realmente no es necesario.

const ajustes = {

    cliente: {

        token: "", // Código de autorización del bot
        guildId: "", // Id del servidor en el que se van a emplear las interaccione s
        clientId: "" // Id de la aplicación con la que se está trabajando -> bot

    },
    intents: {
    // Listado de intents requeridos para que se hagan con éxito las interacciones y para futuras actualizaciones
        cargados: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_WEBHOOKS]

    }

}

module.exports = ajustes;