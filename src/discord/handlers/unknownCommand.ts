import { Message } from "discord.js";
import { cooldownService } from "../../services/CooldownService";
import { CooldownTime, prefix } from "../../config";

export function handleUnknownCommand(message: Message) {
    if(!cooldownService.canRun("discord:unknown", CooldownTime.SHORT)) {
        return;
    }

    message.reply(`❓ Neznámý příkaz. Zkus ${prefix}help`);
}
