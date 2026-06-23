import { Client, GatewayIntentBits, Message, TextChannel } from "discord.js";
import { registerDiscordSender } from "../core/bridge";
import { handleDiscordMessage } from "./handlers/messageHandler";

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates
    ],
});

client.login(process.env.DISCORD_TOKEN);

export async function startDiscord() {
    client.once("clientReady", () => {
        console.log(`✅ Bot application logged in as ${client.user?.tag}!`);

        registerDiscordSender(async ({discordChannelId, message}) => {
            const channel = await client.channels.fetch(discordChannelId);
            if (channel instanceof TextChannel) {
               await channel.send(message);
            }
        });
    });

    client.on("messageCreate", (message: Message) => {
        handleDiscordMessage(message);
    });
}