/*
COMANDO SE PARA REPRODUCCION DE SONIDOS
*/

const sounds = require("../assets/sound_effect.json");
const url = "https://www.myinstants.com/media/sounds";
const  {
	joinVoiceChannel,
	createAudioPlayer,
	createAudioResource,
	entersState,
	StreamType,
	AudioPlayerStatus,
	VoiceConnectionStatus,
} =require('@discordjs/voice');

const player = createAudioPlayer();
function playSong(url) {
    const resource = createAudioResource(url, {
        inputType: StreamType.Arbitrary,
    });

    player.play(resource);

    return entersState(player, AudioPlayerStatus.Playing, 5e3);
}

async function connectToChannel(channel) {
    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });
    try {
        await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
        return connection;
    } catch (error) {
        connection.destroy();
        throw error;
    }
}

module.exports = async (client, message, args) => {
  if (sounds.hasOwnProperty(args[0])) {
   const channel = message.member?.voice.channel;

        if (channel) {
            try {
                const connection = await connectToChannel(channel);
                connection.subscribe(player);
                message.reply('Playing now!');
				await playSong(`${url}/${sounds[args[0]]}`);

            } catch (error) {
                console.error(error);
            }
        } else {
            message.reply('Join a voice channel then try again!');
        }

   
    //console.log(`${voiceChannel}`);
    message.channel.send(`${url}/${sounds[args[0]]}`);
  } else {
    message.channel.send("commands dosnt exist");
  }

};
