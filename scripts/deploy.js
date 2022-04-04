require('dotenv').config();
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { slashCommand } = require('../config.json');
const log = require('../utils/logger.js');
const token = process.env.DISCORD_TOKEN;
const rest = new REST({ version: '9' }).setToken(token);

console.clear();

const commands = [];
const catagories = fs.readdirSync('./commands/');
for (const catagory of catagories) {
	const commandFiles = fs.readdirSync(`./commands/${catagory}`);
	for (const file of commandFiles) {
		const command = require(`../commands/${catagory}/${file}`);
		commands.push(command.data.toJSON());
		log.discord(`Interpreting ${command.data.name} command.`);
	}
}
(async () => {
	try {
		await rest.put(Routes.applicationGuildCommands(slashCommand.clientId, slashCommand.guildId), { body: commands });

		log.success('Successfully registered application commands.');
		process.exit(42);
	} catch (error) {
		console.error(error);
	}
})();
