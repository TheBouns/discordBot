module.exports = (client) => {
  client.user.setPresence({
    status: "online",
    game: {
      name: "Sounds",
      url: null,
      type: "PLAYING",
    },
  });
};
