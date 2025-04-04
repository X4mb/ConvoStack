const fs = require('fs-extra');
const path = require('path');

const logFile = path.join(__dirname, '../config/messages.json');

fs.ensureFileSync(logFile);

const loadMessages = async () => {
    try {
        const data = await fs.readFile(logFile, 'utf-8');
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error('Failed to load messages:', err.message);
        return [];
    }
};

const saveMessage = async (message) => {
    try {
        const messages = await loadMessages();
        messages.push(message);
        await fs.writeJson(logFile, messages, { spaces: 2 });
    } catch (err) {
        console.error('Failed to save message:', err.message);
    }
};

const getLastMessages = async (count = 5) => {
    const messages = await loadMessages();
    return messages.slice(-count);
};

module.exports = { saveMessage, getLastMessages };
