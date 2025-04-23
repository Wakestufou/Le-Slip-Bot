import { Client, Events } from "discord.js";
import type { Event } from "../type/Event.js";

const event: Event = {
    once: true,
    type: Events.ClientReady,
    function: (readyClient: Client<true>) => {
        console.log(`Ready ! Logged in as ${readyClient.user.tag}`);
    }
}

export default event;