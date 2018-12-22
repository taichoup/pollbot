require('dotenv').config();
var Slackbot = require("slackbots");
var channel = "general";

var bot = new Slackbot({
    token: process.env.API_KEY,
    name: "testpollbot"
});

bot.on("start", function() {
    bot.postMessageToChannel(channel, "Hello world!");
    console.log("Hello, world!");
});

// a "message" according to the Slack API isn't necessarily a message of text sent. A "message" is more like a generic event that could be basically anything.
bot.on("message", function(data) {
    if (data.type !== "message") { // so we need to check that the message is of type message
        return;
    }

    handleMessage(data.text);
});

function handleMessage(message) {
    switch(message) {
        case "hi":
        case "hello":
            sendGreeting();
            break;
        default:
            return;
    }
}

function sendGreeting() {
    var greeting = getGreeting();
    bot.postMessageToChannel(channel, greeting);
}

function getGreeting() {
    var greetings = [
        "hello!",
        "hi there!",
        "cheerio!",
        "how do you do!",
        "coucou!"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
}