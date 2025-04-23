import { SlashCommandBuilder } from "discord.js";
import { ChatInputCommandInteraction } from "discord.js";
import type { SlashCommand } from "../../type/SlashCommand";

const command: SlashCommand = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription('Replies with Pong!'),
    async execute(interaction: ChatInputCommandInteraction) {
        console.log("test")
        await interaction.reply("Pong !");
    }
}

export default command;