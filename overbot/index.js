const Discord = require('discord.js');
const jwt = require('jsonwebtoken');
const path = require('path');
const fetch = require('node-fetch');
const bot = new Discord.Client();
require('dotenv').config({path: path.join(__dirname, '.env')});

function fetchRanking() {
    return fetch('http://localhost:3000/game/ranking', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt.sign(
            { userId: 'overBot' },
            process.env.JWT_TOKEN
            )}`
        }
    })
    .then( res => {
        return res.json();
    })
    .then( data => {
        return data;  
    })
    .catch(err => console.log( err ));
}

function prettifyRanking(ranking) {
    let string = "";
    for(let i=0; i < 25; i++) {
        if(i === 0) {
            string += `🥇 | ${ranking[i]["pseudo"]} (${ranking[i]["score"]} points)\n`;
        } else if(i === 1) {
            string += `🥈 | ${ranking[i]["pseudo"]} (${ranking[i]["score"]} points)\n`;
        } else if(i === 2) {
            string += `🥉 | ${ranking[i]["pseudo"]} (${ranking[i]["score"]} points)\n`;
        } else {
            string += `#${i+1} | ${ranking[i]["pseudo"]} (${ranking[i]["score"]} points)\n`;
        }
        
    }
    return string;
}

bot.on('ready', async () => {
    console.log("Je suis connecté !");

    bot.channels.fetch("830805431463051285")
    .then(channel => channel.messages.fetch("830811600176545822")
        .then(message => message.edit("Test 4"))
        .catch(err => console.log(err)))
    .catch(console.error);

    const rawRanking = await fetchRanking();
    const prettyRanking = prettifyRanking(rawRanking);

    bot.channels.fetch("830805431463051285")
    .then(channel => channel.send(prettyRanking))
    .catch(err => console.log(err));
});

bot.login(process.env.DISCORD_TOKEN);