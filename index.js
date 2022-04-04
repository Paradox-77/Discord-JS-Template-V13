require('dotenv').config()
const Discord = require('discord.js')

const config = require('./config.json')
const log = require('./utils/logger')

const token = process.env.DISCORD_TOKEN;

const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_PRESENCES'] });

client.config = config
client.log = log

var handlers = ['command_handler', 'event_handler'];
handlers.forEach((handler) => {
	require(`./handlers/${handler}`)(client, Discord);
});

console.clear();

client.login(token);