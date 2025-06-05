var emoji = {
    "game": [
		"󰀅󰀅",
		//
        "󰀗", "󰀯",
        "󰀪", "󰀕", "󰀫", "󰀖", "󰀛", "󰀬", "󰀭", "󰀮",
        "󰀑", "󰀒", "󰀧", "󰀨", "󰀓", "󰀔", "󰀩",
        "󰀋", "󰀌", "󰀍", "󰀥", "󰀎", "󰀏", "󰀦", "󰀐",
        "󰀆", "󰀇", "󰀈", "󰀤", "󰀙", "󰀉", "󰀚", "󰀊",
        "󰀠", "󰀡", "󰀂", "󰀃", "󰀄", "󰀢", "󰀅", "󰀣",
        "󰀜", "󰀝", "󰀀", "󰀞", "󰀘", "󰀁", "󰀟",
		//
		"", "",
		// °C
		"�", 
    ],
    "discord": [
		"👀",
		//
        "🕸", "🕳",
        "⛏", "💀", "👍🏻", "🎩", "🔦", "🥅", "🏆", "👋🏻",
        "💩", "💎", "💎", "🧂", "🧠", "🔬", "🔬",
        "🍖","🔨","❤️","📯", "😋", "💡", "🥩", "🐷",
        "🦷", "👩🏻‍🌾", "🔥", "🪔", "💪🏻", "👻", "🟨", "⚰",
        "🍓", "🥕", "🧰", "🧰", "🍳", "🥚", "👁", "👁",
        "🌸", "🔬2️⃣", "👿", "🎒", "⚔️", "🐄", "🐝",
		//
		"🖱️", "🖱️",
		// °C
		"°", 
    ]
}

function emojiTransfer(message, type){
    let value = String(message)
	if (type == 1) {
		for (let key in emoji.game) {
			value = value.replace(new RegExp(emoji.game[key], 'g'), emoji.discord[key])
		}
	} else if (type == 2) {
		for (let key in emoji.game) {
			value = value.replace(new RegExp(emoji.discord[key], 'g'), emoji.game[key])
		}
	}
    
    return value
}

module.exports = emojiTransfer;