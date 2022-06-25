
const { Intents } = require("discord.js");

const ajustes = {

    cliente: {

        token: "OTg1OTgzMTczMTQzOTgyMDkx.G_InAW.U5MV6yDDtEK70i_CiUvfzT1KL6MtQxTTSIIZwc",
        guildId: "892748318587879454", //
        clientId: "985983173143982091",
        rolId: "892751141421584445"

    },
    intents: {

        cargados: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_WEBHOOKS]

    }

}

module.exports = ajustes;