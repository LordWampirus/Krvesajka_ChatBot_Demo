import { LogLevel } from "../types/default";

// Logger

export interface LogEntry {
    level?: LogLevel;
    platform: "discord" | "twitch" | "system";
    user?: string;
    command?: string;
    args?: string[];
    channel?: string;
    message?: string;
    error?: unknown;
}

// Links

export interface BridgeLink {
    twitchChannel: string;
    discordGuildId: string;
    discordChannelId: string;
}

export interface AdminLink {
    discordGuildId: string;
    discordChannelId: string;
}
