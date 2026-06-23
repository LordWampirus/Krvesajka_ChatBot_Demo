import { prefix } from "../../config";
import { commands, loadTwitchCommands } from "./commandLoader";
import { handleInsufficientPermission } from "./insufficientPermission";
import { handleUnknownCommand } from "./unknownCommand";
import { cooldownService } from "../../services/CooldownService";
import { Logger } from "../../logger/logger";

import type { TwitchMessageInput } from "../../types/twitch";
import { sendToDiscord } from "../../core/bridge";

loadTwitchCommands();

const platform = "twitch";

export function handleTwitchMessage({client, channel, user, message,}: TwitchMessageInput) {
    if(!message) return;

    sendToDiscord({
        twitchChannel: channel,
        username: user["display-name"] ?? "UNKNOWN_USER",
        message,
    });

    if(!message.startsWith(prefix)) return;
    console.log(`[${user["display-name"]}]: ${message}`);

    const args = message.slice(prefix.length).trim().split(/\s+/);
    const commandName = args.shift()?.toLowerCase();
    const command = commandName ? commands.get(commandName) : undefined;

    Logger.log({
        platform: platform,
        user: user["display-name"] ?? "UNKNOWN_USER",
        command: commandName ?? "UNKNOWN_COMMAND",
        args,
        channel,
    });

    if(!command) {
        handleUnknownCommand({client, channel});
        return;
    }

    if(command.cooldown) {
        const cooldownKey = `${platform}:${commandName}`;
        if(!cooldownService.canRun(cooldownKey, command.cooldown)) {
            return;
        }
    }

    if(command.permissions) {
        const isBroadcaster = user.badges?.broadcaster === "1";
        const isModerator = user.mod || isBroadcaster;
    
        if(command.permissions.includes("moderator") && !isModerator) {
            handleInsufficientPermission("moderator", {client, channel});
            return;
        }

        if(command.permissions.includes("broadcaster") && !isBroadcaster) {
            handleInsufficientPermission("broadcaster", {client, channel});
            return;
        }
    }

    try {
        command.run(client, channel, user, args);
    } catch (err) {
        console.error(err);
        Logger.log({
            level: "ERROR",
            platform: platform,
            user: user["display-name"] ?? "UNKNOWN_USER",
            command: commandName ?? "UNKNOWN_COMMAND",
            channel,
            error: err,
        });
       client.say(channel, `⚠️ Nastala chyba při vykonávání příkazu.`);
    }
}