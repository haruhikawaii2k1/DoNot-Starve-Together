const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
let fs = require('fs');
var dt = require('./settings.js');

let pathIn = dt.data.pathFile.pathIn(); 

var steamMarket = dt.steamMarket;
var currency = steamMarket.fnCurrency();
var color = dt.notify.default.color;
var icon = dt.notify.default.icon;
var urlImage = dt.notify.default.image;

var sendFn = {
    SendChatToDiscord: function(data, channelHook){
        const embed = new EmbedBuilder()
            .setAuthor({ 
                name: String(data.name) + ": " + String(data.message),
                iconURL: data.character 
            });
        channelHook.send({ embeds: [embed] });
    },
    SendSkinToDiscord: async function(data, channelHook){
        urlImage = `https://items.kleientertainment.com/images/DST/${ String(data.skin_name).toUpperCase() }/large`;
        
        color = dt.notify.skin.color;
        icon = dt.notify.skin.icon;
        try {
            await axios
            .get(`https://steamcommunity.com/market/priceoverview/?appid=322330&currency=${ currency }&market_hash_name=` + String(data.skin_name).toUpperCase())
            .then(async (res) => {
                console.log("skin: ", res.data)
                steamMarket.success = res.data.success
                steamMarket.lowest_price = res.data.lowest_price 
                steamMarket.median_price = res.data.median_price 
            })
            .catch((err) => {
                console.error('ERR:', err)
            })
        } catch (error) {
            console.error('ERR:', error)
        }
        
        const embed = new EmbedBuilder()
            .setTitle(String(data.name))
            .setColor(color)
            .setDescription(String(data.message))
            .setThumbnail(icon)
            .setImage(urlImage)
            .setTimestamp();

        if (steamMarket.success === true) {
            embed.setDescription(String(data.message) + '\n\n [Steam Market](https://steamcommunity.com/market/listings/322330/'+ String(data.skin_name).toUpperCase() +')')
                .setFooter({ 
                    text: 'Steam Market',
                    iconURL: 'https://emoji.discord.st/emojis/0667fdf7-2b46-4165-b56f-6a8fa5ae64d4.png'
                });
            
            if (steamMarket.lowest_price) {
                embed.addFields({ name: "Lowest Price", value: String(steamMarket.lowest_price), inline: true });
            }
            if (steamMarket.median_price) {
                embed.addFields({ name: "Median Price", value: String(steamMarket.median_price), inline: true });
            }
        }
        
        channelHook.send({ embeds: [embed] });
        steamMarket.success = false;
    },
    SendOtherToDiscord: function(data, channelHook){
        if (data.title == "join_game") {
            setTimeout(() => {
                this.SendToDontStarve("Server","/str = '' for i, v in ipairs(AllPlayers) do str = str..string.format('[%d] (%s) %s <%s>', i, v.userid, v.name, v.prefab).. '\\n' end SendToDiscord('server','announce','[Server]',str,nil)");
            }, 3000)
        }
        if (dt.notify[data.title]) {
            color = dt.notify[data.title].color;
            icon = dt.notify[data.title].icon;
        } else {
            color = dt.notify.default.color;
            icon = dt.notify.default.icon;
        }
        const embed = new EmbedBuilder()
            .setTitle(String(data.name))
            .setColor(color)
            .setDescription(String(data.message))
            .setThumbnail(icon)
            .setTimestamp();
        channelHook.send({ embeds: [embed] });
    },
    SendToDontStarve: function(_name, _message){
        const str = { time: Date.now(), name: _name, message: _message };
        fs.writeFile(pathIn, JSON.stringify(str), (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`${_name} gửi tin nhắn:  ${_message}`);
            }
        });
    }
}

module.exports = sendFn;