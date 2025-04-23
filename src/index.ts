import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { Client, Collection, GatewayIntentBits } from "discord.js";
import type { Event } from "./type/Event";
import 'dotenv/config';


const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// ---------- Commands -----------------------------------------------------------------------
client.commands = new Collection();


const foldersPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "commands");
const commandFolder = fs.readdirSync(foldersPath);

for (const folder of commandFolder) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = (await import(filePath)).default;

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        }
        else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// ---------- Events -----------------------------------------------------------------------
const eventsPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "events");
const eventFolder = fs.readdirSync(eventsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

for (const eventFile of eventFolder) {
    const eventPath = path.join(eventsPath, eventFile);
    const event = (await import(eventPath)).default as Event;

    if (event.once) {
        client.once(event.type, event.function);
    }
    else {
        client.on(event.type, event.function);
    }
}

// ---------- Log in to Discord with client's token -----------------------------------------------------------------------
client.login(process.env.TOKEN);