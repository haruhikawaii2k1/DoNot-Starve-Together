const { Client } = require('discord.js');

async function checkDiscordToken(token) {
    const client = new Client({ intents: [] });
    
    try {
        await client.login(token);
        const user = await client.users.fetch(client.user.id);
        client.destroy();
        
        return {
            valid: true,
            username: user.tag,
            id: user.id
        };
    } catch (error) {
        if (client.user) client.destroy();
        return {
            valid: false,
            error: error.message
        };
    }
}

// Xuất hàm để sử dụng ở file khác
module.exports = { checkDiscordToken };