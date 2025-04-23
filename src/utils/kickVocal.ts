import {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    entersState,
    VoiceConnectionStatus,
    VoiceConnection
} from "@discordjs/voice";
import { Guild, ChannelType, Collection, GuildMember } from "discord.js";
import path from "path";
import { fileURLToPath } from "url";

export function kickVocal(guild: Guild) {
    const player = createAudioPlayer();
    let connection: VoiceConnection | null = null;

    const voiceChannels = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice);
    const voiceChannelsArray = Array.from(voiceChannels.values());

    const soundPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../audio/nuit2.mp3");

    if (voiceChannelsArray.length === 0) {
        console.log("Aucun salon vocal trouvé.");
        return;
    }

    let currentIndex = 0;

    async function switchToChannel(channelId: string) {
        if (connection && connection.state.status !== VoiceConnectionStatus.Destroyed) {
            connection.destroy();
        }

        connection = joinVoiceChannel({
            channelId,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
        });

        connection.on("error", (err) => {
            console.error("Erreur sur la connexion :", err);
        });

        connection.on("stateChange", (oldState, newState) => {
            console.log(`Connexion vocale : ${oldState.status} → ${newState.status}`);
        });

        try {
            await entersState(connection, VoiceConnectionStatus.Ready, 5000);
            console.log(`Connecté au salon ${channelId}`);
        } catch (err) {
            console.error("Échec de la connexion vocale :", err);
            connection.destroy();
            connection = null;
        }
    }

    async function playNext() {
        if (currentIndex >= voiceChannelsArray.length) {
            console.log("Fini !");
            return;
        }

        const channel = voiceChannelsArray[currentIndex];
        await switchToChannel(channel.id);

        if (!connection) {
            currentIndex++;
            playNext(); // sauter au suivant si la connexion a échoué
            return;
        }

        const resource = createAudioResource(soundPath, { inlineVolume: true });
        player.play(resource);
        connection.subscribe(player);

        console.log(`Lecture dans ${channel.name}`);

        player.once(AudioPlayerStatus.Idle, () => {
            console.log("Lecture terminée, déconnexion...");
            connection?.destroy();

            // Déconnecter les membres
            (channel.members as Collection<string, GuildMember>).forEach(member => {
                if (member.voice.channel) {
                    member.voice.disconnect();
                }
            });

            currentIndex++;
            setTimeout(() => playNext(), 500); // Petite pause avant de passer au suivant
        });
    }

    playNext();
}