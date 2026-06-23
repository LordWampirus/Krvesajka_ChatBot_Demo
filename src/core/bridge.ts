import { bridgeLinks } from "./links";
import { DiscordPayload } from "../types/discord";
import { TwitchMessage } from "../types/twitch";

let discordSender: ((payload: DiscordPayload) => void) | null = null;

export function registerDiscordSender(
    fn: (payload: DiscordPayload) => void
) {
    discordSender = fn;
    console.log("🔗 Discord sender registered.");
}

export function sendToDiscord(data: TwitchMessage) {
    if (!discordSender) {
        console.warn("⚠️ Discord sender is not registered.");
        return;
    }

    const channelName = data.twitchChannel.replace("#", "");
    const link = bridgeLinks.find(
        (l) => l.twitchChannel === channelName
    );
    if (!link) return;

    discordSender({
        discordChannelId: link.discordChannelId,
        message: `[TWITCH] **${data.username}**: ${data.message}`
    });
}