const fs = require('fs');

module.exports = (client, Discord) => {
	client.commands = new Discord.Collection();

	const categories = fs.readdirSync('./commands/');

	for (const category of categories) {
		const commandFiles = fs.readdirSync(`./commands/${category}`).filter((file) => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`../commands/${category}/${file}`);
			if (command.data.name) {
				client.commands.set(command.data.name, command);
				console.log(command.name);
			}
		}
	}
};
