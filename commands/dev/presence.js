const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('presence')
		.setDescription('Allows you to set the rich presence of the bot.')
		.addStringOption((option) =>
			option
				.setName('type')
				.setDescription('Select the type of presence you want to use.')
				.setRequired(true)
				.addChoices([
					['Playing', 'PLAYING'],
					['Streaming', 'STREAMING'],
					['Listening', 'LISTENING'],
					['Watching', 'WATCHING'],
					['Competing', 'COMPETING'],
				])
		)
		.addStringOption((option) =>
			option.setName('status').setDescription('Enter the string to go with the presence type.').setRequired(true)
		),

	execute(interaction, client) {
		client.user.setPresence({
			activities: [
				{
					name: interaction.options.getString('status'),
					type: interaction.options.getString('type'),
					url: client.config.settings.streamUrl,
				},
			],
		});
		interaction.reply({
			embeds: [
				{
					title: 'Status Successfully Changed',
					color: client.config.settings.color,
					timestamp: new Date(),
					fields: [
						{ name: 'Type', value: interaction.options.getString('type'), inline: true },
						{ name: 'Status', value: interaction.options.getString('status'), inline: true },
					],
				},
			],
		});
	},
};
