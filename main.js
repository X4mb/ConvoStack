console.log("Welcome to ConvoStack – Unified Messaging Platform");

const startApp = () => {
    console.log("Initializing Telegram integration...");
    require('./api/telegram');
};

startApp();
