const TelegramBot = require('node-telegram-bot-api');
const { token } = require('../config/telegram-config.json');
const { saveMessage, getLastMessages } = require('../utils/messageLogger');

let bot;

try {
    bot = new TelegramBot(token, { polling: true });
} catch (err) {
    console.error("❌ Failed to initialize bot:", err);
}

bot.on('polling_error', (err) => {
    console.error("❌ Polling error:", err);
});

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

    if (msg.text === '/log') {
        const lastMessages = await getLastMessages(5);
        const formatted = lastMessages.map(m =>
            `🧾 [${m.timestamp.split('T')[0]}] ${m.user}: ${m.text}`
        ).join('\n');

        bot.sendMessage(chatId, `🗂️ Last 5 messages:\n\n${formatted || 'No messages yet.'}`);
    } else {
        bot.sendMessage(chatId, "✅ ConvoStack received and saved your message!");
    }

    console.log(`From ${user} (${chatId}): ${msg.text}`);
});

module.exports = bot;
