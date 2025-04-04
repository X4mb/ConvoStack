const TelegramBot = require('node-telegram-bot-api');
const { token } = require('../config/telegram-config.json');
const { saveMessage } = require('../utils/messageLogger');

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const user = msg.from.username || msg.from.first_name || "Unknown";

    const messageData = {
        user,
        chatId,
        text: msg.text,
        timestamp: new Date().toISOString()
    };

    await saveMessage(messageData);

    console.log(`From ${user} (${chatId}): ${msg.text}`);
    bot.sendMessage(chatId, "✅ ConvoStack received and saved your message!");
});

module.exports = bot;
