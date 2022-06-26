const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const ajustes = require("../../../config"); const token = ajustes.cliente.token;
const fs = require('fs');

const Discord = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');


// PENDIENTE FSREDIR && MSGS
module.exports = {
	data: new SlashCommandBuilder()
		.setName('actualizar')
		.setDescription('Refresca los comandos del bot manualmente.')
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(client, interaction) {
		

	}
};