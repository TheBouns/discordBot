const { Client, Intents, Channel, Collection } = require("discord.js");
const db = require("dotenv").config();
const { readdirSync } = require("fs");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  partials: ["CHANNEL"],
});

client.config = require("./config");
client.commands = new Collection();

//Esto busca los diferentes archivos de comandos y lo que hacen cada uno.
for (const file of readdirSync("src/commands")) {
  if (file.endsWith(".js")) {
    let fileName = file.substring(0, file.length - 3);

    let fileContents = require(`./commands/${file}`);

    client.commands.set(fileName, fileContents);
  }
}
//hacemos el controlador de eventos

for (const file of readdirSync("src/events")) {
  if (file.endsWith(".js")) {
    //Elimina los últimos tres caracteres nombre del archivo para
    //deshacerse de la extensión .js y solo quedarnos con el nombre del evento:
    let fileName = file.substring(0, file.length - 3);

    //Define una nueva variable 'fileContents' de la exportación del evento dentro de la carpeta eventos:
    let fileContents = require(`./events/${file}`);

    // Cuando el evento se activa o es solicitada exportamos la función con
    // el nombre del evento vinculada y tambien el parametro client.
    client.on(fileName, fileContents.bind(null, client));

    // Elimina la memoria caché del archivo requerido para facilitar la recarga y no
    // tener más memoria de la necesaria.
    delete require.cache[require.resolve(`./events/${file}`)];
  }
}

client.on("ready", () => {
  console.log(`Bot is ready as:  ${client.user.tag}`);
});

client.login(process.env.TOKEN);
