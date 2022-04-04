const chalk = require('chalk');
const fs = require('fs')

function getTime() {
	let time = new Date();
	let hours = time.getHours();
	let minutes = time.getMinutes();
	let seconds = time.getSeconds();
	let ampm;

	ampm = hours > 12 ? (ampm = 'PM') : 'AM';

	hours = hours > 12 ? hours - 12 : hours;

	hours = hours < 10 ? `0${hours}` : hours;

	seconds = seconds < 10 ? `0${seconds}` : seconds;

	time = `${hours}:${minutes}:${seconds} ${ampm}`;

	return time;
}

function success(log) {
	return console.log(`${getTime()} | ${chalk.hex('#8cc265')('[Success]')} | ${log}`);
}

function warn(log) {
	return console.log(`${getTime()} | ${chalk.hex('#d18f52')('[Warning]')} | ${log}`);
}

function error(log) {
	return console.log(`${getTime()} |  ${chalk.hex('#ff616e')('[Error]')}  | ${log}`);
}

function notif(log) {
	return console.log(`${getTime()} |  ${chalk.hex('#4aa5f0')('[Notif]')}  | ${log}`);
}

function discord(log) {
	return console.log(`${getTime()} | ${chalk.hex('#5865F2')('[Discord]')} | ${log}`);
}

module.exports = {
	success: success,
	warn: warn,
	error: error,
	notif: notif,
	discord: discord,
};
