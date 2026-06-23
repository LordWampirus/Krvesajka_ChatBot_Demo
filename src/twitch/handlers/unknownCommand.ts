import { CooldownTime, prefix } from "../../config";
import { cooldownService } from "../../services/CooldownService";
import type { TwitchDestination } from "../../types/twitch";

export function handleUnknownCommand(input: TwitchDestination) {
    if (!cooldownService.canRun("twitch:unknown", CooldownTime.SHORT)) {
        return;
    }

    input.client.say(input.channel, `❓ Neznámý příkaz. Zkus použít ${prefix}help!`);
}