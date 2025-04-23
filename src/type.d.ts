import { Collection } from "discord.js";
import { SlashCommand } from "./type/SlashCommand.ts";

declare module 'discord.js' {
    interface Client {
        commands: Collection<string, SlashCommand>
    }
}