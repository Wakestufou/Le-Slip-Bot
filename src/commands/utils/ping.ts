import { SlashCommandBuilder } from 'discord.js';
import { ChatInputCommandInteraction } from 'discord.js';
import { SlashCommand } from '../../types/SlashCommand';

const command: SlashCommand = {
    data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply('Pong !');
    },
};

export default command;
