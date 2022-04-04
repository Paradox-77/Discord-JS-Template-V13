require('dotenv').config();
const fs = require('fs');
const chalk = require('chalk');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { slashCommand } = require('../config.json');
const log = require('../utils/logger.js');
const token = process.env.DISCORD_TOKEN;
const rest = new REST({ version: '9' }).setToken(token);

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

console.clear();

log.warn('Are you sure you want to proceed and deploy all commands globally? Note: May take up to 1 Hour.');
log.warn('Commands in the "dev" folder will NOT be deployed.');
log.warn('Type "Global" in the command terminal to proceed.');
rl.question('> ', function (answer) {
	if (answer.toLowerCase() == 'global') {
		console.clear();
		log.notif('Deploying all commands globally. DO NOT ABORT MANUALLY.');

		const commands = [];
		const catagories = fs.readdirSync('./commands/');
		for (const catagory of catagories) {
			if (catagory !== 'dev') {
				const commandFiles = fs.readdirSync(`./commands/${catagory}`);
				for (const file of commandFiles) {
					const command = require(`../commands/${catagory}/${file}`);

					commands.push(command.data.toJSON());
					log.discord(`Interpreting ${command.data.name} command.`);
				}
			}
		}

		(async () => {
			try {
				await rest.put(Routes.applicationCommands(slashCommand.clientId, slashCommand.guildId), { body: commands });

				log.warn('Commands might take up to 1 hour to deploy to all servers.');
				log.success('Successfully registered application commands globally.');
				process.exit(42);
			} catch (error) {
				console.error(error);
			}
		})();
	} else {
		log.notif('Aborting global deploy script.');
	}
});
