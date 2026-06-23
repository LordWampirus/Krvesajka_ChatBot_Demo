import { Message } from "discord.js";
import { cooldownService } from "../../services/CooldownService";
import { CooldownTime } from "../../config";

export function handleInsufficientPermission(message: Message) {
    if(!cooldownService.canRun("discord:insufficient", CooldownTime.SHORT)) {
        return;
    }
     
    message.reply("⛔ Tento příkaz mohou používat pouze administrátoři!");
}