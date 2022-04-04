const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder().setName('servers').setDescription('Lists the servers the bot is currently in.'),
	execute(interaction, client) {
		let guilds = client.guilds.cache.map((g) => g.name).join('\n');
		interaction.reply({
			embeds: [
				{
					title: 'Guilds',
					timestamp: new Date(),
					color: client.config.settings.color,
					description: guilds,
				},
			],
		});
	},
};
