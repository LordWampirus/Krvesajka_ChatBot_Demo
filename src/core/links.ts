import { DiscordChannelID, DiscordServerID } from "../config";
import { BridgeLink, AdminLink } from "../interfaces/default";

export const bridgeLinks: BridgeLink[] = [
    {
        twitchChannel: "my_twitch_channel",
        discordGuildId: DiscordServerID.MY_DiscordServer,
        discordChannelId: DiscordChannelID.STREAMCHAT,
    }
];

export const adminLinks: AdminLink[] = [
    {
        discordGuildId: DiscordServerID.MY_DiscordServer,
        discordChannelId: DiscordChannelID.ADMIN,
    }
];