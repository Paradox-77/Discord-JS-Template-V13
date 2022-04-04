module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.log.success(`Ready! Logged in as ${client.user.tag}`);
	},
};
