const { EmbedBuilder } = require('discord.js');
const dt = require('./settings.js');
const sendFn = require('./sendFn.js');

let Prefix = dt.data.prefix;
let cmdLink = dt.data.cmdConnect.cmdLink();
let cmdUnlink = dt.data.cmdConnect.cmdUnlink();

var Admins = dt.data.admin;

function updateData() {
    Prefix = dt.data.prefix;
    cmdLink = dt.data.cmdConnect.cmdLink();
    cmdUnlink = dt.data.cmdConnect.cmdUnlink();
    Admins = dt.data.admin;
}

var adminFn = function (message, channelHook){
    if(!Admins.includes(message.author.id)) return
    
    updateData()
    const args = message.content.trim().split(" ");
    const cmd = args.shift().toLowerCase();

    if (cmd.startsWith(Prefix) && message.channel == channelHook) {
        switch(cmd) {
            case `${Prefix}ban`:
                if (args[0]) {
                    message.react('👌🏻');
                    message.reply("Đã Ban User: " + args[0]);
                    sendFn.SendToDontStarve(message.author.username,"/TheNet:Ban('" + args[0] + "')");
                } else {
                    message.react('❌');
                    message.reply("Bạn nhập thiếu Klei_ID");
                }
                break;
            case `${Prefix}kick`:
                if (args[0]) {
                    message.react('👌🏻');
                    message.reply("Đã Kick User: " + args[0]);
                    sendFn.SendToDontStarve(message.author.username,"/TheNet:Kick('" + args[0] + "')");
                } else {
                    message.react('❌');
                    message.reply("Bạn nhập thiếu Klei_ID");
                }
                break;
            case `${Prefix}regen`:
                message.react('👌🏻');
                message.reply("Đã tái tạo lại thế giới");
                sendFn.SendToDontStarve(message.author.username,"/c_regenerateworld()");
                break;
            case `${Prefix}rollback`:
                if (args[0]) {
                    if(parseInt(args[0]) > 0){
                        message.react('👌🏻');
                        message.reply("Đã rollback " + args[0] + " lần");
                        sendFn.SendToDontStarve(message.author.username,"/c_rollback("+args[0]+")");
                    } else {
                        message.react('❌');
                        message.reply("Nhập số dương");
                    }
                        
                } else {
                    message.react('❌');
                    message.reply("Bạn nhập thiếu số lần rollback");
                }
                break;
            case `${Prefix}drop`:
                if (args[0]) {
                    message.react('👌🏻');
                    message.reply("Đã Drop đồ trên người chơi được chỉ định");
                    sendFn.SendToDontStarve(message.author.username,"/UserToPlayer('"+args[0]+"').components.inventory:DropEverything()");
                } else {
                    message.react('❌');
                    message.reply("Bạn nhập thiếu Klei_ID");
                }
                break;
            case `${Prefix}despawn`:
                if (args[0]) {
                    message.react('👌🏻');
                    message.reply("Đã khôi phục người chơi được chỉ định");
                    sendFn.SendToDontStarve(message.author.username,"/c_despawn(UserToPlayer('"+args[0]+"'))");
                } else {
                    message.react('❌');
                    message.reply("Bạn nhập thiếu Klei_ID");
                }
                break;
            case `${Prefix}kill`:
                if (args[0]) {
                    message.react('👌🏻');
                    if (args[0] == "all") {
                        message.reply("Đã giết tất cả người chơi");
                        sendFn.SendToDontStarve(message.author.username,"/for i, v in ipairs(AllPlayers) do AllPlayers[i]:PushEvent('death') end");
                    } else {
                        message.reply("Đã giết người chơi được chỉ định");
                        sendFn.SendToDontStarve(message.author.username,"/UserToPlayer('"+args[0]+"'):PushEvent('death')");
                    }
                } else {
                    message.react('❌');
                    message.reply("Bạn nhập thiếu Klei_ID");
                }
                break;
            case `${Prefix}res`:
                if (args[0]) {
                    message.react('👌🏻');
                    if (args[0] == "all") {
                        message.reply("Đã cứu tất cả người chơi");
                        sendFn.SendToDontStarve(message.author.username,"/for i, v in ipairs(AllPlayers) do AllPlayers[i]:PushEvent('respawnfromghost') end");
                    } else {
                        message.reply("Đã cứu người chơi được chỉ định");
                        sendFn.SendToDontStarve(message.author.username,"/UserToPlayer('"+args[0]+"'):PushEvent('respawnfromghost')");
                    }
                } else {
                    message.react('❌');
                    message.reply("Bạn nhập thiếu Klei_ID");
                }
                break;
            case `${Prefix}list`:
                message.react('👌🏻');
                message.reply("Danh sách người chơi trong thế giới");
                sendFn.SendToDontStarve(message.author.username,"/str = '' for i, v in ipairs(AllPlayers) do str = str..string.format('[%d] (%s) %s <%s>', i, v.userid, v.name, v.prefab).. '\\n' end SendToDiscord('server','announce','[Server]',str,nil)");
                break;
            case `${Prefix}announce`:
                message.react('👌🏻');
                message.reply("Đã gửi thông báo");
                sendFn.SendToDontStarve(message.author.username,"/c_announce('" + args.join(' ') + "')");
                break;
            case `${Prefix}save`:
                message.react('👌🏻');
                message.reply("Đã gửi lệnh lưu game");
                sendFn.SendToDontStarve(message.author.username,"/c_save()");
                break;
            case `${Prefix}reset`:
                message.react('👌🏻');
                message.reply("Đã gửi lệnh khởi động lại");
                sendFn.SendToDontStarve(message.author.username,"/c_reset()");
                break;
            case `${Prefix}shutdown`:
                message.react('👌🏻');
                message.reply("Đã gửi lệnh tắt máy chủ");
                sendFn.SendToDontStarve(message.author.username,"/c_shutdown(true)");
                break;
            case `${Prefix}stopvote`:
                message.react('👌🏻');
                message.reply("Đã gửi lệnh dừng vote");
                sendFn.SendToDontStarve(message.author.username,"/c_stopvote()");
                break;
            case `${Prefix}lock`:
                message.react('👌🏻');
                message.reply("Đã khoá máy chủ");
                sendFn.SendToDontStarve(message.author.username,"/TheNet:SetAllowIncomingConnections(false)");
                break;
            case `${Prefix}unlock`:
                message.react('👌🏻');
                message.reply("Đã mở khoá máy chủ");
                sendFn.SendToDontStarve(message.author.username,"/TheNet:SetAllowIncomingConnections(true)");
                break;
            case `${Prefix}removeall`:
                if (args[0]) {
                    message.react('👌🏻');
                    message.reply("Đã xoá toàn bộ [" + args[0] + "]");
                    sendFn.SendToDontStarve(message.author.username,"/c_removeall('" + args[0] + "')");
                } else {
                    message.react('❌');
                    message.reply("Bạn nhập thiếu đối tượng cần xoá");
                }
                break;
            case `${Prefix}clean`:
                if (args[0]) {
                    if (args[0] == "event") {
                        message.react('👌🏻');
                        message.reply("Đã dọn dẹp các item từ event trên mặt đất");
                        sendFn.SendToDontStarve(message.author.username,"/clean_event()");
                    } else {
                        message.react('👌🏻');
                        message.reply("Đã gửi lệnh xoá tất cả [" + args[0] + "] trên mặt đất");
                        sendFn.SendToDontStarve(message.author.username,"/c_cleanall('" + args[0] + "')");
                    }
                    
                } else {
                    message.react('❌');
                    message.reply("Bạn nhập thiếu đối tượng cần xoá");
                }
                break;
            case `${Prefix}give`:
                if (args[0] && args[1]) {
                    if (args[0] == "all") {
                        if (args[2] && (args[2] > 0)) {
                            sendFn.SendToDontStarve(message.author.username,"/for k,v in pairs(AllPlayers) do for i = 1, "+ args[2] +" do UserToPlayer(k).components.inventory:GiveItem(SpawnPrefab('"+ args[1] +"')) end end c_announce('Tất cả người chơi đã nhận được "+ args[2] +" "+ args[1] +"')");
                            message.react('👌🏻');
                            message.reply("Đã gửi ["+ args[2] +"]["+ args[1] +"] cho tất cả người chơi");
                        } else {
                            sendFn.SendToDontStarve(message.author.username,"/for k,v in pairs(AllPlayers) do UserToPlayer(k).components.inventory:GiveItem(SpawnPrefab('"+ args[1] +"')) end c_announce('Tất cả người chơi đã nhận được "+ args[1] +"')");
                            message.react('👌🏻');
                            message.reply("Đã gửi [" + args[1] + "] cho tất cả người chơi");
                        }
                    } else {
                        if (args[2] && (args[2] > 0)) {
                            sendFn.SendToDontStarve(message.author.username,"/for i = 1, "+ args[2] +" do UserToPlayer('"+ args[0] +"').components.inventory:GiveItem(SpawnPrefab('"+ args[1] +"')) end");
                            message.react('👌🏻');
                            message.reply("Đã gửi ["+args[2]+"][" + args[1] + "] cho người chơi [" + args[0] + "]");
                        } else {
                            sendFn.SendToDontStarve(message.author.username,"/UserToPlayer('"+ args[0] +"').components.inventory:GiveItem(SpawnPrefab('"+ args[1] +"'))");
                            message.react('👌🏻');
                            message.reply("Đã gửi [" + args[1] + "] cho người chơi [" + args[0] + "]");
                        }
                    }
                } else {
                    message.react('❌');
                    message.reply("Bạn nhập thiếu User hoặc Item");
                }
                break;
            case `${Prefix}spawn`:
                if (args[0] && args[1]) {
                    if (args[0] == "all") {
                        if (args[2] && (args[2] > 0)) {
                            if (args[1] == "thunder") {
                                sendFn.SendToDontStarve(message.author.username,"/for k,v in pairs(AllPlayers) do for i = 1, "+ args[2] +" do TheWorld:PushEvent('ms_sendlightningstrike', UserToPlayer(k):GetPosition()) end end c_announce('"+ args[2] +" tia sét đã đánh xuống vị trí của tất cả người chơi')");
                            } else {
                                sendFn.SendToDontStarve(message.author.username,"/for k,v in pairs(AllPlayers) do for i = 1, "+ args[2] +" do DebugSpawn('"+ args[1] +"').Transform:SetPosition(UserToPlayer(k):GetPosition():Get()) end end c_announce('"+ args[2] +" "+ args[1] +" đã xuất hiện tại vị trí của tất cả người chơi')");
                            }
                            message.react('👌🏻');
                            message.reply("Đã gửi [" + args[2] + "][" + args[1] + "] đến vị trí tất cả người chơi");
                        } else {
                            if (args[1] == "thunder") {
                                sendFn.SendToDontStarve(message.author.username,"/for k,v in pairs(AllPlayers) do TheWorld:PushEvent('ms_sendlightningstrike', UserToPlayer(k):GetPosition()) end c_announce('Sét đã đánh xuống vị trí của tất cả người chơi')");
                            } else {
                                sendFn.SendToDontStarve(message.author.username,"/for k,v in pairs(AllPlayers) do DebugSpawn('"+ args[1] +"').Transform:SetPosition(UserToPlayer(k):GetPosition():Get()) end c_announce('"+ args[1] +" đã xuất hiện tại vị trí của tất cả người chơi')");
                            }
                            message.react('👌🏻');
                            message.reply("Đã gửi [" + args[1] + "] đến vị trí tất cả người chơi");
                        }
                    } else {
                        if (args[2] && (args[2] > 0)) {
                            if (args[1] == "thunder") {
                                sendFn.SendToDontStarve(message.author.username,"/for i = 1, "+ args[2] +" do TheWorld:PushEvent('ms_sendlightningstrike', UserToPlayer('"+ args[0] +"'):GetPosition()) end");
                            } else {
                                sendFn.SendToDontStarve(message.author.username,"/for i = 1, "+ args[2] +" do DebugSpawn('"+ args[1] +"').Transform:SetPosition(UserToPlayer('"+ args[0] +"'):GetPosition():Get()) end");
                            }
                            message.react('👌🏻');
                            message.reply("Đã gửi ["+ args[2] +"]["+ args[1] +"] đến vị trí người chơi ["+ args[0] +"]");
                        } else {
                            if (args[1] == "thunder") {
                                sendFn.SendToDontStarve(message.author.username,"/TheWorld:PushEvent('ms_sendlightningstrike', UserToPlayer('"+ args[0] +"'):GetPosition())");
                            } else {
                                sendFn.SendToDontStarve(message.author.username,"/DebugSpawn('"+ args[1] +"').Transform:SetPosition(UserToPlayer('"+ args[0] +"'):GetPosition():Get())");
                            }
                            message.react('👌🏻');
                            message.reply("Đã gửi ["+ args[1] +"] đến vị trí người chơi ["+ args[0]+ "]");
                        }
                    }
                } else {
                    message.react('❌');
                    message.reply("Bạn nhập thiếu User hoặc Prefab");
                }
                break;
            case `${Prefix}talk`:
                if (args[0] && args[1]) {
                    user = args[0]
                    args.shift()
                    if (user == "all") {
                        sendFn.SendToDontStarve(message.author.username,"/for k,v in pairs(AllPlayers) do v.components.talker:Say('"+ args.join(' ') +"') end");
                        message.react('👌🏻');
                        message.reply("Đã gửi [" + args.join(' ') + "] cho tất cả người chơi");
                    } else {
                        sendFn.SendToDontStarve(message.author.username,"/UserToPlayer('"+ user +"').components.talker:Say('"+ args.join(' ') +"')");
                        message.react('👌🏻');
                        message.reply("Đã gửi [" + args.join(' ') + "] cho người chơi [" + user + "]");
                    }
                } else {
                    message.react('❌');
                    message.reply("Bạn nhập thiếu User hoặc nội dung");
                }
                break;
            case `${Prefix}cmd`:
                if (args[0]) {
                    message.react('👌🏻');
                    message.reply("Đã gửi lệnh đến máy chủ");
                    sendFn.SendToDontStarve(message.author.username,"/"+args[0]);
                } else {
                    message.react('❌');
                    message.reply("Bạn nhập thiếu CMD");
                }
                break;
            case `${Prefix}setprefix`:
                if (args[0]) {
                    dt.data.prefix = args[0]
                    message.react('👌🏻');
                    message.reply(`Đã thay đổi Prefix thành ${args[0]}`);
                } else {
                    message.react('❌');
                    message.reply("Bạn nhập thiếu Prefix");
                }
                break;
            case `${Prefix}prefix`:
                message.react('👌🏻');
                message.reply(`Prefix hiện tại là: ${Prefix}`);
                break;
        }
    
        if(cmd == `${Prefix}help`){
            if (args[0] && args[0] != "1") {
                switch(args[0]) {
                    case "2":
                        const embed_2 = new EmbedBuilder()
                            .setTitle("Các lệnh của BOT (trang 2/2)")
                            .setColor(0xEB8AF3)
                            .setAuthor({
                                name: "Minh Trí",
                                iconURL: "https://media.discordapp.net/attachments/932210360520429579/997100506491138118/discord_circle.png",
                                url: "https://discord.com/invite/7uSYZD4uyW"
                            })
                            .addFields(
                                { 
                                    name: "Give đồ cho người chơi",
                                    value: "`"+Prefix+"give <[klei_id or num_user] or all> <code_prefab> [amount]`\n*- Gửi **10 Vàng** cho người chơi có **klei_id** là **KU_123ABC*** ```"+Prefix+"give KU_123ABC goldnugget 10``` *- Gửi **10 Vàng** cho **tất cả người chơi*** ```"+Prefix+"give all goldnugget 10```"
                                },
                                {
                                    name: "Spawn đối tượng đến người chơi",
                                    value: "`"+Prefix+"spawn <[klei_id or num_user] or all> <code_prefab> [amount]`\n*- Đặt **5 con bò** tại vị trí người chơi có **num_user** là **1*** ```"+Prefix+"spawn 1 beefalo 5```  *- Đặt **Gấu Lửng** tại vị trí **tất cả người chơi*** ```"+Prefix+"spawn all bearger``` *- prefab: shadowmeteor **(Thiên thạch)**; thunder **(Sấm Sét)**;*"
                                },
                                {
                                    name: "Talk làm cho nhân vật người chơi nói chuyện",
                                    value: "`"+Prefix+"talk <[klei_id or num_user] or all> <nội dung>`\n*- Làm cho nhân vật của **tất cả người chơi** nói **xin chào*** ```"+Prefix+"talk all xin chào``` "
                                },
                                {
                                    name: "Xóa toàn bộ đối tượng chỉ định",
                                    value: "*- Xoá toàn bộ **Que*** ```"+Prefix+"removeall twigs```"
                                },
                                {
                                    name: "Dọn dẹp toàn bộ đối tượng chỉ định có trên mặt đất",
                                    value: "*- Xoá toàn bộ **Que** trên mặt đất* ```"+Prefix+"clean twigs``` *- Dọn dẹp toàn bộ **Item** từ Event [**Winter, Halloween**] có trên mặt đất* ```"+Prefix+"clean event```"
                                }
                            )
                            .setFooter({ 
                                text: "Trang 2/2", 
                                iconURL: "https://media.discordapp.net/attachments/932210360520429579/997100506491138118/discord_circle.png"
                            });
                        message.channel.send({ embeds: [embed_2] });
                        break;
                    default: 
                        break;
                }
            } else {
                message.react('👌🏻');
                const embed_1 = new EmbedBuilder()
                    .setTitle("Các lệnh của BOT (trang 1/2)")
                    .setColor(0xEB8AF3)
                    .setAuthor({
                        name: "Minh Trí",
                        iconURL: "https://media.discordapp.net/attachments/932210360520429579/997100506491138118/discord_circle.png",
                        url: "https://discord.com/invite/7uSYZD4uyW"
                    })
                    .addFields(
                        { 
                            name: ":warning:**Đặt kênh chat cho BOT (có thể dùng ở nhiều kênh)**:warning:",
                            value: "```"+cmdLink+"```"
                        },
                        {
                            name: "Huỷ kênh nhận thông báo từ BOT",
                            value: "```"+cmdUnlink+"```"
                        },
                        {
                            name: "Thay đổi Prefix BOT",
                            value: "```"+Prefix+"setprefix <new_prefix>```"
                        },
                        {
                            name: "Add Admin",
                            value: "```"+Prefix+"adadd```",
                            inline: true
                        },
                        {
                            name: "Remove Admin",
                            value: "```"+Prefix+"adrm```",
                            inline: true
                        },
                        {
                            name: "List Admin",
                            value: "```"+Prefix+"adlist```",
                            inline: true
                        },
                        {
                            name: "Ban",
                            value: "```"+Prefix+"ban KU_123ABC```",
                            inline: true
                        },
                        {
                            name: "Kick",
                            value: "```"+Prefix+"kick KU_123ABC```",
                            inline: true
                        },
                        {
                            name: "Tái tạo thế giới",
                            value: "```"+Prefix+"regen```",
                            inline: true
                        },
                        {
                            name: "Save SV",
                            value: "```"+Prefix+"save```",
                            inline: true
                        },
                        {
                            name: "Reset SV",
                            value: "```"+Prefix+"reset```",
                            inline: true
                        },
                        {
                            name: "Shutdown SV",
                            value: "```"+Prefix+"shutdown```",
                            inline: true
                        },
                        {
                            name: "Rollback",
                            value: "```"+Prefix+"rollback 1```",
                            inline: true
                        },
                        {
                            name: "Thông báo đến server",
                            value: "```"+Prefix+"announce nội dung```",
                            inline: true
                        },
                        {
                            name: "Chọn lại nhân vật cho người chơi",
                            value: "```"+Prefix+"despawn KU_123ABC```"
                        },
                        {
                            name: "Dừng vote",
                            value: "```"+Prefix+"stopvote```",
                            inline: true
                        },
                        {
                            name: "Khóa Host",
                            value: "```"+Prefix+"lock```",
                            inline: true
                        },
                        {
                            name: "Mở Host",
                            value: "```"+Prefix+"unlock```",
                            inline: true
                        },
                        {
                            name: "Danh sách người chơi",
                            value: "```"+Prefix+"list```"
                        },
                        {
                            name: "Cứu người chơi",
                            value: "```"+Prefix+"res KU_123ABC```",
                            inline: true
                        },
                        {
                            name: "Cứu tất cả",
                            value: "```"+Prefix+"res all```",
                            inline: true
                        },
                        {
                            name: "Drop mọi vật phẩm trong kho của người chơi",
                            value: "```"+Prefix+"drop KU_123ABC```"
                        },
                        {
                            name: "Giết người chơi",
                            value: "```"+Prefix+"kill KU_123ABC```",
                            inline: true
                        },
                        {
                            name: "Giết tất cả",
                            value: "```"+Prefix+"kill all```",
                            inline: true
                        }
                    )
                    .setFooter({ 
                        text: "Trang 1/2", 
                        iconURL: "https://media.discordapp.net/attachments/932210360520429579/997100506491138118/discord_circle.png"
                    });
                message.channel.send({ embeds: [embed_1] });
            }
        }
    }
}

module.exports = adminFn;