import { Client, Events } from 'discord.js';
import { Event } from '../types/Event';
import cron from 'node-cron';
import Holidays from 'date-holidays';
import { kickVocal } from '../utils/kickVocal';

/**
 * Renvoie true si c'est un jour où il faut dodo
 * @returns
 */
function isItCiottiDay() {
    const hd = new Holidays('FR', '67');

    // Obtenir la date de demain
    const today = new Date();

    const dayOfWeek = today.getDay(); // 0 = dimanche, 6 = samedi
    const isHoliday = hd.isHoliday(today);
    const isWeekExcluded = dayOfWeek === 0 || dayOfWeek === 6; // dimanche = 0, samedi = 6

    return !(isHoliday || isWeekExcluded);
}

const event: Event = {
    once: true,
    type: Events.ClientReady,
    function: (readyClient: Client<true>) => {
        cron.schedule('0 0 * * *', () => {
            console.log('Début de la cron');
            if (!isItCiottiDay()) {
                console.log("Ah c'est un jour chill !");
                return;
            }

            console.log('Au revoir les petits');
            readyClient.guilds.cache.forEach((guild) => {
                kickVocal(guild);
            });
        });
    },
};

export default event;
