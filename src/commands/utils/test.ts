import { ChannelType, SlashCommandBuilder, VoiceChannel } from 'discord.js';
import { ChatInputCommandInteraction } from 'discord.js';
import type { SlashCommand } from '../../types/SlashCommand';
import { kickVocal } from '../../utils/kickVocal';

const command: SlashCommand = {
    data: new SlashCommandBuilder().setName('test').setDescription('test!'),
    async execute(interaction: ChatInputCommandInteraction) {
        if (interaction.guild) {
            await interaction.reply('Test de Ciotti');
            kickVocal(interaction.guild);
            return;
        }

        await interaction.reply('Euuuh ca marche pas');
    },
};

export default command;
