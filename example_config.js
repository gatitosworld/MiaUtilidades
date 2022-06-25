
const { Intents } = require("discord.js"); // Para prevenir errores -> realmente no es necesario.

const ajustes = {

    cliente: {

        token: "", // Código de autorización del bot
        guildId: "", // Id del servidor en el que se van a emplear las interaccione s
        clientId: "", // Id de la aplicación con la que se está trabajando -> bot
        rolId: "" // Para permisos -> Id del rol que pueda ejecutar determinados comandos o interacciones

    },
    intents: {
    // Listado de intents requeridos para que se hagan con éxito las interacciones y para futuras actualizaciones
        cargados: []

    }

}

module.exports = ajustes;