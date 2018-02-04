const makeCommands = io => telegram => {
  const subscribe = recipientId => {
    telegram.sendMessage(recipientId, "subscried");
    io.emit("new chat message", recipientId);
  };
  const unsubscribe = recipientId =>
    telegram.sendMessage(recipientId, "unsubscribe");

  return {
    subscribe,
    unsubscribe
  };
};

module.exports = makeCommands;
