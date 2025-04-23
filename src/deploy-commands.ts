import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import 'dotenv/config';
import { REST, Routes } from "discord.js";

// TODO: Actuellement il mets les SlashCommands en mode développement. Il existe un autre moyen pour mettre en prod (mais peut avoir plusieurs heures à chaque update de la command)
if (!process.env.TOKEN || !process.env.GUILD_ID || !process.env.CLIENT_ID) {
    console.log(`[FATAL] Please complete .env file!`);
}

// @ts-ignore
const commands = [];

const foldersPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "commands");
const commandFolder = fs.readdirSync(foldersPath);

for (const folder of commandFolder) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = (await import(filePath)).default;

        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
        }
        else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// @ts-ignore
const rest = new REST().setToken(process.env.TOKEN);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            // @ts-ignore
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {
                // @ts-ignore
                body: commands
            }
        )
    }
    catch (error) {
        console.error(error);
    }
})();
