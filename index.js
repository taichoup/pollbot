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
    if (message.indexOf("pollbot") > -1) {
        var spl = message.split("\"");
        var l = spl.length;
        var spl2 = [];
        for (var i = 1; i < l; i += 2) {
            spl2.push(spl[i]);
        }
        // console.log(spl2);
        sendPoll(spl2);
    }
}

const numberemojis = {
    1: ":one:",
    2: ":two:",
    3: ":three:",
    4: ":four:",
    5: ":five:",
    6: ":six:",
    7: ":seven:",
    8: ":eight:",
    9: ":nine:"
}

function sendPoll(arr) {
    var poll = "*" + arr[0] + "*";
    for (i = 1; i < arr.length; i++) {
        poll += "\n" + numberemojis[i] + " " + arr[i];
    }

    bot.postMessageToChannel(channel, poll);
};