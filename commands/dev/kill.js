const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kill')
		.setDescription('Kills the Discord instance and also the Node.js instance.'),
	execute(interaction, client) {
		interaction
			.reply({
				embeds: [
					{
						title: 'Shutting Down',
						color: client.config.settings.color,
						timestamp: new Date(),
					},
				],
			})
			.then(() => {
				client.destroy();
			})
			.then(() => {
				process.exit(42);
			});
	},
};
