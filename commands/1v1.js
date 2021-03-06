const { RichEmbed } = require("discord.js");
const gamedig = require('gamedig');


module.exports.run = async function (bot, message) {

    message.channel.startTyping();

    let serverDetails = bot.config.servers["1v1"];
    delete serverDetails.rcon;

    let embed;

    await gamedig.query(serverDetails).then(state => {

        // server hostname
        let serverName = state.name;

        // map
        let mapArray = state.map.split('/');
        let map = mapArray[2] || mapArray[0];

        // players
        let playerCount = state.raw.numplayers;
        let maxPlayers = state.maxplayers;

        //connection
        let connectLink = `steam://connect/${state.connect}`;

        embed = new RichEmbed()
            .setTitle(serverName)
            .setThumbnail(bot.user.avatarURL)
            .addField(`Current Map`, map, true)
            .addField(`Current Players`, playerCount + '/' + maxPlayers, true)
            .addField(`Steam Connect Link`, connectLink, false);

    }).catch(error => {

        embed = new RichEmbed()
            .setTitle("[ARENA] z4lab Multi 1v1 | PRIME | 128 Tick // z4lab.com")
            .setThumbnail(bot.user.avatarURL)
            .addField(`Server currently unavailable`, "check again soon", false);

    });

    message.channel.stopTyping();

    return message.channel.send(embed);

};

module.exports.help = {
    name: "1v1",
    category: "servers",
    usage: false,
    description: false,
    permissionLvl: 0
};