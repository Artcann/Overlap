const Discord = require('discord.js');
const path = require('path');
const cron = require('node-cron');
const bot = new Discord.Client();
require('dotenv').config({path: path.join(__dirname, '.env')});

const ranking = require('./utils/ranking');

bot.once('ready', async () => {

    const rawRanking = await ranking.fetchRanking();
    const prettyRanking = ranking.prettifyRanking(rawRanking);

    cron.schedule('* 15 * * *', () => {
        bot.channels.fetch("831162103162994778")
        .then(channel => channel.messages.fetch("831175547047641158")
            .then(message => message.edit(prettyRanking))
            .catch(err => console.log(err)))
        .catch(console.error);
    })
});

bot.login(process.env.DISCORD_TOKEN);