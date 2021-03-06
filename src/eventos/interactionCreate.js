// const preventer = require("err-prevent");

module.exports = {
    name: 'interactionCreate',
    async execute(client, db, interaction) {

        if (interaction.isCommand()) {

            const comando = client.commands.get(interaction.commandName);
            if (!comando) return;

            try {
                await comando.execute(db, interaction);
            } catch (e) {
                console.error(e);
                await interaction.reply({ content: "Ha ocurrido un error al ejecutar este comando. ", ephemeral: true });
                // Sistema de prevención de errores
            }

        } else if(interaction.isButton()) {

            const boton = client.buttons.get(interaction.customId);
          if (!boton) return;
            try {
                await boton.execute(interaction);
            } catch (e) {
                console.error(e);
                await interaction.reply({ content: "Ha ocurrido un error al ejecutar este botón. ", ephemeral: true });
            } 

        }
            
    }

}


