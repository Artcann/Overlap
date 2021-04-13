const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

exports.fetchRanking = async () => {
    try {
        const res = await fetch('https://api.overlap-bde.fr/game/ranking', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwt.sign(
                    { userId: 'overBot' },
                    process.env.JWT_TOKEN
                )}`
            }
        });
        const data = await res.json();
        return data;
    } catch (err) {
        return console.log(err);
    }
}

exports.prettifyRanking = (ranking) => {
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