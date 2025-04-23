import type { ClientEvents } from "discord.js";


export type Event = {
    once: boolean;
    type: keyof ClientEvents;
    function: (...args: any[]) => void;
}