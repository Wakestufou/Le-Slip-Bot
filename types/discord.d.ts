import { Collection } from 'discord.js';
import { SlashCommand } from '../src/types/SlashCommand.js';

declare module 'discord.js' {
    interface Client {
        commands: Collection<string, SlashCommand>;
    }
}
