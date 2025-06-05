const fs = require('fs');
const path = require('path');
const JSON5 = require('json5');

let config = fs.readFileSync('./config.json', 'utf8');
config = config.replace(/"([A-Z]:\\[^"]*)"/gi, (match, p1) => {
  const fixedPath = p1.replace(/\\/g, '\\\\');
  return `"${fixedPath}"`;
});
config = JSON5.parse(config);
console.log(`Config loaded: ${JSON.stringify(config.pathGame)}`);
// Chuẩn hóa đường dẫn game
if (config.pathGame) {
  

    const nonConvertedPathGame = config.pathGame.replace(/\\/g, '\\\\'); // Chuyển đổi dấu gạch chéo xuôi thành dấu gạch chéo ngược
  const normalizedSlashes = path.resolve(path.normalize(nonConvertedPathGame));
    // Chuyển đổi dấu gạch chéo ngược thành dấu gạch chéo xuôi
  const convertedPathGame = normalizedSlashes.replace(/\\\\/g, '/');


  config.pathGame = convertedPathGame;

  console.log(`normalizedSlashes: ${normalizedSlashes}`);
  console.log(`nonConvertedPathGame: ${nonConvertedPathGame}`);
  console.log(`Converted pathGame: ${convertedPathGame}`);
}
console.log(`Path game: ${config.pathGame}`);

var settings = {
    "data": {
        "prefix": config.prefix,
        "cmdConnect": {
            "link": "link",
            "unlink": "unlink",
            "cmdLink": function () { return `${settings.data.prefix}${this.link}` },
            "cmdUnlink": function () { return `${settings.data.prefix}${this.unlink}` }
        },
        "pathGame": config.pathGame,
        "token": config.token,
        "admin": config.admin,
        "idChannel": config.idChannel,
        "pathFile": {
            "type": "",
            "pathIn": function () {
                return path.join(settings.data.pathGame, 'data', 'unsafedata', `sendtogame${this.type}.json`);
            },
            "pathOut": function () {
                return path.join(settings.data.pathGame, 'data', 'unsafedata', `sendtodiscord${this.type}.json`);
            }
        }
    },
    "steamMarket": {
        "currency": "VND",
        "success": false,
        "lowest_price": 0,
        "median_price": 0,
        "currencies": {
            "USD": 1, "GBP": 2, "EUR": 3, "CHF": 4, "RUB": 5, "PLN": 6, "BRL": 7, "JPY": 8,
            "SEK": 9, "IDR": 10, "MYR": 11, "BWP": 12, "SGD": 13, "THB": 14, "VND": 15,
            "KRW": 16, "TRY": 17, "UAH": 18, "MXN": 19, "CAD": 20, "AUD": 21, "NZD": 22,
            "CNY": 23, "INR": 24, "CLP": 25, "PEN": 26, "COP": 27, "ZAR": 28, "HKD": 29,
            "TWD": 30, "SAR": 31, "AED": 32
        },
        "fnCurrency": function () {
            return `${settings.steamMarket.currencies[`${this.currency}`]}`;
        }
    },
    "notify": {
        "default": {
            "color": 0xFFFFFF,
            "icon": "https://cdn.discordapp.com/attachments/932233908458758204/932233992713936926/Announce_x48.png",
            "image": "https://cdn.forums.klei.com/monthly_2017_10/klei.thumb.png.aba30c9eb1f32633dc5a53506a0b7250.png"
        },
        "server": {
            "color": 0xC67E29,
            "icon": "https://cdn.discordapp.com/attachments/932335658838659154/932336311526883368/KleiServer.png"
        },
        "chat": {
            "color": 0xc0cfb2,
            "icon": ""
        },
        "announce": {
            "color": 0xFFFFFF,
            "icon": "https://cdn.discordapp.com/attachments/932233908458758204/932233992713936926/Announce_x48.png"
        },
        "death": {
            "color": 0xC6C7BD,
            "icon": "https://cdn.discordapp.com/attachments/932236314659676172/933968829736955975/Death-3_x48.png"
        },
        "join_game": {
            "color": 0x005F00,
            "icon": "https://cdn.discordapp.com/attachments/932237423365210152/938750951362269285/join_x48.png"
        },
        "leave_game": {
            "color": 0x000000,
            "icon": "https://cdn.discordapp.com/attachments/932237535642550313/932237631662743552/Leave_x48.png"
        },
        "resurrect": {
            "color": 0xF24848,
            "icon": "https://cdn.discordapp.com/attachments/932237918708334602/941718065706590248/Res.png"
        },
        "kicked_from_game": {
            "color": 0x5A3D1F,
            "icon": "https://cdn.discordapp.com/attachments/932237736314802216/932237787715997726/Kick_x48.png"
        },
        "banned_from_game": {
            "color": 0x000000,
            "icon": "https://cdn.discordapp.com/attachments/932236093292703754/932236213102997504/Ban_x48.png"
        },
        "item_drop": {
            "color": 0xB20000,
            "icon": "https://cdn.discordapp.com/attachments/932237830183338046/932237886001147924/Kill_x48.png"
        },
        "vote": {
            "color": 0x2A4985,
            "icon": "https://cdn.discordapp.com/attachments/932238623775027223/932238664434601984/Vote_x48.png"
        },
        "dice_roll": {
            "color": 0xCFCEC6,
            "icon": "https://cdn.discordapp.com/attachments/932238004381179905/932238060001853550/Random_x48.png"
        },
        "mod": {
            "color": 0x636156,
            "icon": "https://cdn.discordapp.com/attachments/932238540690055168/932238578136801322/Mod_x48.png"
        },
        "skin": {
            "color": 0x7B392E,
            "icon": "https://haruhikawaii.ddns.net/dstpng/gift.png"
        }
    }
};

module.exports = settings;
