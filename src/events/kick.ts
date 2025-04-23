import { Client, Events } from "discord.js";
import type { Event } from "../type/Event.ts";
import cron from 'node-cron';
import Holidays from 'date-holidays';
import { kickVocal } from "../utils/kickVocal.js";

function isItCiottiDay() {
    const hd = new Holidays('FR', '67');

    // Obtenir la date de demain
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const dayOfWeek = tomorrow.getDay(); // 0 = dimanche, 6 = samedi
    const isHoliday = hd.isHoliday(tomorrow);
    const isWeekExcluded = dayOfWeek === 5 || dayOfWeek === 6; // vendredi = 5, samedi = 6

    return !(isHoliday || isWeekExcluded);
}

const event: Event = {
    once: true,
    type: Events.ClientReady,
    function: (readyClient: Client<true>) => {
        cron.schedule('0 0 0 * * *', () => {
            console.log("Début de la cron")
            if (!isItCiottiDay()) {
                console.log("Ah c'est un jour chill !")
                return;
            }
            
            console.log("Au revoir les petits")
            readyClient.guilds.cache.forEach(guild => {
                kickVocal(guild);
            })
        })
    }
}

export default event;