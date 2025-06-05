const { Client, GatewayIntentBits, EmbedBuilder, ActivityType } = require('discord.js');
const fs = require('fs');
const moment = require('moment');
const util = require('util');
var dt = require('./src/settings.js');
var adminFn = require('./src/adminFn.js');
var sendFn = require('./src/sendFn.js');
var emojiTransfer = require('./src/emoji.js');

let Prefix = dt.data.prefix;
let pathGame = dt.data.pathGame;
let pathIn = dt.data.pathFile.pathIn();
let pathOut = dt.data.pathFile.pathOut();
let cmdLink = dt.data.cmdConnect.cmdLink();
let cmdUnlink = dt.data.cmdConnect.cmdUnlink();
let lastModified = 0;

var Admins = dt.data.admin;
var idChannels = dt.data.idChannel;
var channelHooks = [];
var channel;
var version = "v3.5"
const logFile = fs.createWriteStream('log.txt', { flags: 'a' });
console.log = function (...args) {
  const message = util.format(...args);
  logFile.write(`[${new Date().toISOString()}] ${message}\n`);
  process.stdout.write(message + '\n');
};
console.log(pathIn);
console.log(pathOut);

// Create a new client with required intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
        activities: [{
            name: "Don't Starve Together",
            type: ActivityType.Playing
        }],
        status: 'online'
    });

    try {
        setInterval(() => {
            let activities = [
                `Prefix: ${Prefix}`,
                `${Prefix}help for help`,
                `${cmdLink} for link channel Bot`,
                `${cmdUnlink} for unlink channel Bot`,
                `${Prefix}adlist for list admin`,
                `${Prefix}adadd for add admin`,
                `${Prefix}adrm for remove admin`,
                `Bot version ${version}`,
                "Setup at \nhttps://github.com/hominhtri135/DoNot-Starve-Together",
                `on ${client.guilds.cache.size} servers`,
            ];
            const randomIndex = Math.floor(Math.random() * activities.length);
            const newActivity = activities[randomIndex];
            client.user.setActivity(newActivity);
        }, 10000);

        console.log("===== Liên kết kênh ====")
        for (const idChannel of idChannels) {
            if (isNumeric(idChannel)) {
                if (client.channels.cache.get(idChannel)) {
                    channel = client.channels.cache.get(idChannel)
                    if (channelHooks.includes(channel)) {
                        console.log(`Kênh [${channel.guild.name}][${channel.name}][${idChannel}] đã tồn tại`)
                    } else {
                        channelHooks.push(channel);
                        console.log(`Đã thêm kênh [${channel.guild.name}][${channel.name}][${idChannel}] vào danh sách kênh`)
                    }
                } else {
                    console.log(`Id Channel: [${idChannel}] không hợp lệ`)
                }
            }
        }
        console.log("========================")
    } catch (error) {
        console.log(error);
    }

    try {
        if (!fs.existsSync(`${pathGame}/data`)) {
            fs.mkdir(`${pathGame}/data`, function (err) {
                if (err) {
                    return console.error(err);
                }
                console.log("Thư mục được tạo thành công!");
            });
        }

        if (!fs.existsSync(pathOut)) {
            var str = { message: "", time: Date.now() };
            fs.writeFileSync(pathOut, JSON.stringify(str));
        }

        if (!fs.existsSync(pathIn)) {
            fs.writeFileSync(pathIn, "");
        }

        fd = fs.openSync(pathOut, 'r');
        fs.closeSync(fd);

        var data = fs.statSync(pathOut);
        lastModified = data.mtime.toISOString();
        console.log("last modified changed to " + lastModified);
    } catch (err) {
        console.log(err);
    }

    try {
        if (channelHooks.length !== 0) {
            SendToDiscord(channelHooks);
        }
    } catch (error) {
        console.log(error)
    }
});

client.on('messageCreate', message => {
    try {
        if (message.author.bot) return;
        updateData()
        connect(message, channelHooks);

        if (channelHooks.length !== 0) {
            SendToDiscord(channelHooks);
            for (const channelHook of channelHooks) {
                if (message.channel == channelHook) {
                    message.content = emojiTransfer(message.content, 2)
                    if (message.content.startsWith(Prefix)) {
                        adminFn(message, channelHook);
                    } else {
                        sendFn.SendToDontStarve(message.author.displayName, message.content.replace("/", ""));
                    }
                }
            }
        }
    } catch (error) {
        console.log(error)
    }
});

function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
}

function updateData() {
    Prefix = dt.data.prefix;
    cmdLink = dt.data.cmdConnect.cmdLink();
    cmdUnlink = dt.data.cmdConnect.cmdUnlink();
    Admins = dt.data.admin;
}

function SendToDiscord(channelHooks) {
    setInterval(() => {
        fs.open(pathOut, 'r', (err, fd) => {
            if (err) {
                console.log(err);
                return;
            }

            fs.stat(pathOut, async (err, data) => {
                let previousLMM = moment(lastModified);
                let rightNow = data.mtime.toISOString();
                let folderLMM = moment(rightNow);
                let res = !(folderLMM.isSame(previousLMM, 'second')); //seconds granularity
                if (res) {
                    try {
                        let data = JSON.parse(fs.readFileSync(pathOut, 'utf8'));
                        data.message = emojiTransfer(data.message, 1)
                        data.name = emojiTransfer(data.name, 1)
                        console.log("data: ", data);
                        for (const channelHook of channelHooks) {
                            if (data.title == "chat") {
                                sendFn.SendChatToDiscord(data, channelHook);
                            } else if (data.title == "skin") {
                                sendFn.SendSkinToDiscord(data, channelHook);
                            } else {
                                sendFn.SendOtherToDiscord(data, channelHook);
                            }
                        }

                    } catch (err) {
                        console.error(err);
                    }
                    lastModified = rightNow;
                }
                fs.closeSync(fd);
            });

        });
    }, 500);
}

function connect(message, channelHooks) {
    const args = message.content.trim().split(" ");
    const cmd = args.shift().toLowerCase();

    if (cmd.startsWith(Prefix)) {

        if (cmd == `${Prefix}adlist`) {
            txtAdmin = ""
            num = 1
            for (const Admin of Admins) {
                txtAdmin = txtAdmin + `[${num++}] <@${Admin}>\n`
            }
            const embed = new EmbedBuilder()
                .setTitle("Danh sách Admin")
                .setColor(dt.notify.server.color)
                .setDescription(txtAdmin)
                .setThumbnail(dt.notify.server.icon)
                .setTimestamp();
            message.react('👌🏻');
            message.channel.send({ embeds: [embed] });
        } else if (!Admins.includes(message.author.id)) {
            message.react('❌');
            message.channel.send(`Bạn cần có quyền Admin để dùng lệnh này!\nDùng lệnh \`${Prefix}adlist\` để xem danh sách Admin!`);
            return
        }

        switch (cmd) {
            case cmdLink:
                if (channelHooks.includes(message.channel)) {
                    if (message.channel.type != "DM") {
                        message.react('❌');
                        message.channel.send("Bạn đã liên kết với kênh này rồi!");
                        console.log(`Kênh [${message.channel.guild.name}][${message.channel.name}][${message.channel.id}] đã tồn tại`)
                    } else {
                        message.react('❌');
                        message.channel.send("Bạn đã liên kết với kênh này rồi!");
                        console.log(`Kênh người dùng [${message.channel.recipient.username}#${message.channel.recipient.discriminator}][${message.channel.id}] đã tồn tại`)
                    }
                } else {
                    if (message.channel.type != "DM") {
                        channelHooks.push(message.channel);
                        message.react('👌🏻');
                        message.channel.send("Thiết lập liên kết thành công!");
                        console.log(`Đã thêm kênh [${message.channel.guild.name}][${message.channel.name}][${message.channel.id}] vào danh sách kênh`)
                    } else {
                        channelHooks.push(message.channel);
                        message.react('👌🏻');
                        message.channel.send("Thiết lập liên kết thành công!");
                        console.log(`Đã thêm kênh người dùng [${message.channel.recipient.username}#${message.channel.recipient.discriminator}][${message.channel.id}] vào danh sách kênh`)
                    }
                }
                break;
            case cmdUnlink:
                if (channelHooks.length !== 0) {
                    var index = channelHooks.indexOf(message.channel);
                    if (index > -1) {
                        channelHooks.splice(index, 1);
                        message.react('👌🏻');
                        message.channel.send("Đã xoá kênh ra khỏi danh sách!");
                        if (message.channel.type != "DM") {
                            console.log(`Đã xoá kênh: [${message.channel.guild.name}][${message.channel.name}][${message.channel.id}] ra khỏi danh sách`)
                        } else {
                            console.log(`Đã xoá kênh người dùng [${message.channel.recipient.username}#${message.channel.recipient.discriminator}][${message.channel.id}] ra khỏi danh sách`)
                        }
                    } else {
                        message.react('❌');
                        message.channel.send("Kênh không tồn tại trong danh sách!");
                    }
                }
                break;
            case `${Prefix}adadd`:
                if (args[0]) {
                    args[0] = args[0].replace(/[<@>]/g, '')
                    user = client.users.cache.find(user => user.id === args[0])
                    if (user) {
                        if (dt.data.admin.includes(args[0])) {
                            message.react('❌');
                            message.reply(`Người dùng ${user.username} đã là admin`);
                        } else {
                            dt.data.admin.push(args[0]);
                            message.react('👌🏻');
                            message.reply(`Đã thêm người dùng ${user.username} làm admin`);
                        }
                    } else {
                        message.react('❌');
                        message.reply(`Người dùng không hợp lệ`);
                    }

                } else {
                    message.react('❌');
                    message.reply("Bạn nhập thiếu User");
                }
                break;
            case `${Prefix}adrm`:
                if (args[0]) {
                    if (dt.data.admin.length !== 0) {
                        args[0] = args[0].replace(/[<@>]/g, '')
                        var index = dt.data.admin.indexOf(args[0]);
                        if (index > -1) {
                            dt.data.admin.splice(index, 1);
                            message.react('👌🏻');
                            message.reply(`Đã xoá người dùng <@${args[0]}> khỏi danh sách admin`);
                        } else {
                            message.react('❌');
                            message.reply(`Người dùng <@${args[0]}> không có trong danh sách admin`);
                        }
                    }
                } else {
                    message.react('❌');
                    message.reply("Bạn nhập thiếu User");
                }
                break;
        }
    }
}

client.login(dt.data.token);