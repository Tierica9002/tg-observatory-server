const recipientId = 28005770;

var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var TelegramBot = require("node-telegram-bot-api"),
  telegram = new TelegramBot("474316167:AAGuQZF5FCtKR-CqYerhJo9B6b70YGNRKjA", {
    polling: true
  });

const commands = require("./commands")(io)(telegram);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function (socket) {
  socket.on("chat message", function (msg) {
    io.emit("chat message", msg);
  });
});

http.listen(5000, function () {
  console.log("listening on *:5000");
});

telegram.on("polling_error", error => {
  console.log(error);
});

const isCommand = messageText =>
  messageText.indexOf("/") === 0 &&
  commands.hasOwnProperty(messageText.substring(1));

const messageHandler = message => {
  if (isCommand(message.text)) {
    commands[message.text.substring(1)](message.from.id);
  } else {
    io.emit("new_message", message.from.id);
  }
};

telegram.on("text", messageHandler);
