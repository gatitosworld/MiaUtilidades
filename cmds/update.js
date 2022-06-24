const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const ajustes = require("../config"); const token = ajustes.cliente.token;
const fs = require('fs');

const Discord = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');


// PENDIENTE FSREDIR && MSGS
module.exports = {
	data: new SlashCommandBuilder()
		.setName('actualizar')
		.setDescription('Aqwed')
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(client, interaction) {
		try {
			var respuesta
			await interaction.reply({ embeds: [new Discord.MessageEmbed().setDescription("").setColor("")], ephemeral: true });
			const commands = [];
			const commandFiles = fs.readdirSync(' ').filter(file => file.endsWith('.js'));

			for (const file of commandFiles) {
				const command = require(`./cmds/${file}`);
			
				commands.push(command.data.toJSON());
			}

			const rest = new REST({ version: '9' }).setToken(token);

			(async () => {
				try {
					await rest.put(
						Routes.applicationCommands(ajustes.cliente.clientId),
						{ body: commands },
					);
				} catch (e) {
					console.error(e);
				}
			})();
			await interaction.editReply({ embeds: [new Discord.MessageEmbed().setDescription("").setColor("")], ephemeral: true })
		} catch (e) {
			// catch 
		}
	},
};