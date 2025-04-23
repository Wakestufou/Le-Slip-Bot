import { AudioPlayerStatus, createAudioPlayer, createAudioResource, joinVoiceChannel } from "@discordjs/voice";
import { fileURLToPath } from 'url';
import path from "path";
import { ChannelType, Collection, Guild, GuildMember } from "discord.js";

export function kickVocal(guild: Guild) {
    const player = createAudioPlayer();
    console.log("Player")

    // @ts-ignore
    let connection = null;
    let i = 1;

    function sendAudio(channelId: string) {
        console.log("joined")
        connection = joinVoiceChannel({
            // @ts-ignore
            channelId: channelId,
            // @ts-ignore
            guildId: guild.id,
            // @ts-ignore
            adapterCreator: guild.voiceAdapterCreator
        });

        console.log("Before sound")
        const sound = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../audio/nuit2.mp3");
        console.log("After sound")
        const resource = createAudioResource(sound, {
            inlineVolume: true
        });
        console.log("After resource")

        player.play(resource);
        connection.subscribe(player);
        console.log("start")
    }

    const voiceChannels = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice);

    if (voiceChannels.size === 0) {
        return;
    }

    const voiceChannelsArray = Array.from(voiceChannels.values());

    sendAudio(voiceChannelsArray[0].id);

    player.on(AudioPlayerStatus.Idle, () => {
        // @ts-ignore
        if (connection) {
            connection.destroy();
            console.log("detroy");
            (voiceChannelsArray[i - 1].members as Collection<string, GuildMember>).forEach(member => {
                if (member.voice.channel) {
                    member.voice.disconnect();
                }
            });
        }

        if (voiceChannels.size > i) {
            // @ts-ignore
            sendAudio(voiceChannelsArray[i].id);
            i++;
        }
        console.log('Lecture terminée et déconnexion.');
    });
}
