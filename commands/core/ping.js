const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Pong!'),
	async execute(interaction, client) {
		await interaction.reply({
			embeds: [
				{
					title: 'Ping Pong!',
					timestamp: new Date(),
					color: client.config.settings.color,
					fields: [
						{ name: 'Bot Latency', value: `${Date.now() - interaction.createdTimestamp}ms` },
						{ name: 'API Latency', value: `${Math.round(client.ws.ping)}ms` },
					],
				},
			],
		});
	},
};
