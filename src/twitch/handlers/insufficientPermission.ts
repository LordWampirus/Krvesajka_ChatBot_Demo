import { CooldownTime } from "../../config";
import { cooldownService } from "../../services/CooldownService";
import type { TwitchDestination } from "../../types/twitch";

export function handleInsufficientPermission(level: string, input: TwitchDestination) {
    if (!cooldownService.canRun("twitch:insufficient", CooldownTime.DEFAULT)) {
        return;
    }

    if (level === "broadcaster") {
        input.client.say(input.channel, `🚫 Tento příkaz mohou použít jen vlastníci kanálu.`);
    }

    if (level === "moderator") {
        input.client.say(input.channel, `🚫 Tento příkaz mohou použít jen moderátoři.`);
    }
};