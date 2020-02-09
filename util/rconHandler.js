const rconConnection = require("srcds-rcon");

global.bot.rcon = {};


//creating games
global.bot.rcon.csgo = {};

//creating csgo game modes
global.bot.rcon.csgo.aim = {};
global.bot.rcon.csgo.surf = {};

//creating csgo aim game modes/servers
global.bot.rcon.csgo.aim.warmup = {
    name: "warmup",
    rconConnection: rconConnection({
        address: global.bot.config.servers.warmup.host + ":" + global.bot.config.servers.warmup.port,
        password: global.bot.config.servers.warmup.rcon
    })
};
global.bot.rcon.csgo.aim.arena = {
    name: "arena",
    rconConnection: rconConnection({
        address: global.bot.config.servers["1v1"].host + ":" + global.bot.config.servers["1v1"].port,
        password: global.bot.config.servers["1v1"].rcon
    })
};

//creating csgo surf servers
global.bot.rcon.csgo.surf.beginner = {
    name: "beginner",
    rconConnection: rconConnection({
        address: global.bot.config.servers.beginner.host + ":" + global.bot.config.servers.beginner.port,
        password: global.bot.config.servers.beginner.rcon
    })
};
global.bot.rcon.csgo.surf.pro = {
    name: "pro",
    rconConnection: rconConnection({
        address: global.bot.config.servers.pro.host + ":" + global.bot.config.servers.pro.port,
        password: global.bot.config.servers.pro.rcon
    })
};
global.bot.rcon.csgo.surf.vip = {
    name: "vip",
    rconConnection: rconConnection({
        address: global.bot.config.servers["vip-surf"].host + ":" + global.bot.config.servers["vip-surf"].port,
        password: global.bot.config.servers["vip-surf"].rcon
    })
};
global.bot.rcon.csgo.surf.dev = {
    name: "dev",
    rconConnection: rconConnection({
        address: global.bot.config.servers.dev.host + ":" + global.bot.config.servers.dev.port,
        password: global.bot.config.servers.dev.rcon
    })
};

//groups
global.bot.rcon.groups = {};
global.bot.rcon.groups.surf = [];

Object.keys(global.bot.rcon.csgo.surf).forEach(server => {
    global.bot.rcon.groups.surf.push(global.bot.rcon.csgo.surf[server]);
});

global.bot.rcon.groups.aim = [];

Object.keys(global.bot.rcon.csgo.aim).forEach(server => {
    global.bot.rcon.groups.aim.push(global.bot.rcon.csgo.aim[server]);
});

global.bot.rcon.groups.all = [];

Object.keys(global.bot.rcon.csgo.surf).forEach(server => {
    global.bot.rcon.groups.all.push(global.bot.rcon.csgo.surf[server]);
});

Object.keys(global.bot.rcon.csgo.aim).forEach(server => {
    global.bot.rcon.groups.all.push(global.bot.rcon.csgo.aim[server]);
});