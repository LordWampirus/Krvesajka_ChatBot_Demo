import { Message } from "discord.js";
import { prefix } from "../../config";
import { Logger } from "../../logger/logger";
import { cooldownService } from "../../services/CooldownService";
import { handleInsufficientPermission } from "./insufficientPermission";
import { handleUnknownCommand } from "./unknownCommand";
import { commands, loadDiscordCommands } from "./commandLoader";

loadDiscordCommands();

const platform = "discord";

export function handleDiscordMessage(message: Message) {
    if(message.author.bot ||
        !message.content.startsWith(prefix) || 
        !message.guild)
        return;
    
    console.log(`📩 Zpráva od ${message.author.tag}: ${message.content}`);

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();
    const command = commandName ? commands.get(commandName) : undefined;

    Logger.log({
        platform: platform,
        user: message.author.tag,
        command: command?.name ?? commandName + " -> Unknown command",
        args,
        channel: message.channel.isTextBased() 
        ? `#${(message.channel as any).name}`
        : undefined,
    });

    if(!command) {
        handleUnknownCommand(message);
        return;
    }

    if(command.cooldown) {
        const cooldownKey = `${platform}:${commandName}`;
        if(!cooldownService.canRun(cooldownKey, command.cooldown)) {
            return;
        }
    }

    if(command.adminOnly && !message.member?.permissions.has("Administrator")) {
        handleInsufficientPermission(message);
        return;
    }

    try {
        command.run(message, args);
    } catch (err) {
    Logger.log({
        level: "ERROR",
        platform: platform,
        user: message.author.tag,
        command: command.name,
        channel: message.channel.isTextBased()
        ? `#${(message.channel as any).name}`
        : undefined,
        error: err,
    });
    message.reply(`⚠️ Nastala chyba při vykonávání příkazu.`);
    }
}
