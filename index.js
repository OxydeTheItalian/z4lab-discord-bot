const Discord = require("discord.js");
const timestamp = require(__dirname+"/util/timeStamp");

const config = require(__dirname+"/config/bot.json");
const dbs = require(__dirname+"/config/dbs.json");
const channels = require(__dirname+"/config/channels.json");
const servers = require(__dirname+"/config/servers.json");
const whitelist = require(__dirname+"/config/whitelist.json");


const bot = new Discord.Client();
bot.commands = new Discord.Collection();

require(__dirname+"/util/modules")(bot);

bot.config = {};
bot.config.main = config;
bot.config.dbs = dbs;
bot.config.channels = channels;
bot.config.servers = servers;
bot.config.whitelist = whitelist;

bot.sleep = function (ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms*1000);
    });
};

bot.modifiedDate = function (file) {  
    let { mtime } = bot.modules.file.fs.statSync(file);
    return mtime;
};
bot.loadCommands = function() {
    bot.modules.file.fs.readdir(__dirname+"/commands", (err, file) => { // gets content of /commands folder
        if (err) console.log(err); // err handling

        let jsfile = file.filter(f => f.split(".").pop() === "js"); // checks for .js files
        if (jsfile.length <= 0) { // checks if no file exist
            console.log(bot.modules.util.colors.yellow("[WARNING] Couldn't find any commands!")); // no file err
            return; // leave
        }
        jsfile.forEach((f, i) => { // gets all files
            delete require.cache[require.resolve(__dirname+`/commands/${f}`)];
            let props = require(__dirname+`/commands/${f}`); // from /commands folder
            //let date = bot.modifiedDate(__dirname+`/commands/${f}`);
            //console.log(bot.modules.util.colors.white(timestamp(date)) + bot.modules.util.colors.grey(`[Command] ${f} loaded!`)); // console log print form module
            bot.commands.set(props.help.name, props); // set files as command
        });
        console.log(bot.modules.util.colors.grey(`[Events] ${jsfile.length} commands loaded!`));
    });
};

bot.loadEvents = function() {

    bot.modules.file.fs.readdir(__dirname+"/events", (err, file) => { // gets content of /events folder
        if (err) console.log(err); // err handling

        let jsfile = file.filter(f => f.split(".").pop() === "js"); // checks for .js files
        if (jsfile.length <= 0) { // checks if no file exist
            console.log(bot.modules.util.colors.yellow("[WARNING] Couldn't find any events!")); // no file err
            return; // leave
        }
        jsfile.forEach((f, i) => { // gets all files
            delete require.cache[require.resolve(__dirname+`/events/${f}`)];
            require(__dirname+`/events/${f}`); // from /events folder
            //let date = bot.modifiedDate(__dirname+`/events/${f}`);
            //console.log(bot.modules.util.colors.white(timestamp(date)) + bot.modules.util.colors.grey(`[Event] ${f} loaded!`)); // console log print form module
        });
        console.log(bot.modules.util.colors.grey(`[Events] ${jsfile.length} events loaded!`));
    });

};

bot.loadCommands();
bot.loadEvents();

global.bot = bot;
/*
require(__dirname+"/events/error");
require(__dirname+"/events/guildBanAdd");
require(__dirname+"/events/guildBanRemove");
require(__dirname+"/events/guildMemberAdd");
require(__dirname+"/events/guildMemberRemove");
require(__dirname+"/events/message");
require(__dirname+"/events/ready");
*/

require(__dirname+"/util/console");
require(__dirname+"/util/rconHandler");

bot.login(config.token);