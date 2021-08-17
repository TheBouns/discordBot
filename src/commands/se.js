/*
COMANDO SE PARA REPRODUCCION DE SONIDOS
*/

const sounds = require("../assets/sound_effect.json");
const url = "https://www.myinstants.com/media/sounds";

module.exports = (client, message, args) => {
  if (sounds.hasOwnProperty(args[0])) {
    const chanel = client.channels.cache.get("ChannelID");
    console.log(`${chanel}`);
    message.channel.send(`${url}/${sounds[args[0]]}`);
  } else {
    message.channel.send("commands dosnt exist");
  }
};
