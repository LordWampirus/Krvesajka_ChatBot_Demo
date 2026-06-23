import * as fs from "fs";
import * as path from "path";
import { TwitchCommand } from "../../types/twitch";

const commands = new Map<string, TwitchCommand>();

function loadTwitchCommands() {
    const base = path.dirname(__dirname);
    const dirs = ["commands", "commandsModerator"];

    for(const dir of dirs) {
        const dirPath = path.join(base, dir);
        if(!fs.existsSync(dirPath)) continue;

        const commandFiles = fs.readdirSync(dirPath).filter(file => 
            file.endsWith(".ts") || 
            file.endsWith(".js")
        );

        for(const file of commandFiles) {
            try {
                const cmd: TwitchCommand = require(path.join(dirPath, file)).default;
                if (dir === "commandsModerator") cmd.permissions = ["moderator"];
                commands.set(cmd.name, cmd);
            } catch (err) {
                console.error(`Chyba při načítání příkazu ${file}:`, err);
            }
        }
    }
    console.log(`✅ Načteno ${commands.size} twitch příkazů`);
}

export { commands, loadTwitchCommands };