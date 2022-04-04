const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bans a user from the server.')
    .addUserOption(option => option.setName('user').setDescription('The user you want to ban')),
	async execute(interaction, client) {
        const user = interaction.options.getUser('user')
        const guildMember = await interaction.guild.members.fetch(user.id)
        // guildMember.ban({reason: 'Test'})
		interaction.reply({
			embeds: [
				{
					title: `Successfully banned ${user.username}#${user.discriminator}.`,
					timestamp: new Date(),
					color: client.config.settings.color,
				},
			],
		});
	},
};
