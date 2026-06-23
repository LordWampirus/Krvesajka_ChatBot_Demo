import * as fs from "fs";
import * as path from "path";
import { DiscordCommand } from "../../types/discord";

const commands = new Map<string, DiscordCommand>();

function loadDiscordCommands() {
    const base = path.dirname(__dirname);
    const dirs = ["commands", "commandsAdmin"];

    for(const dir of dirs) {
        const dirPath = path.join(base, dir);
        if(!fs.existsSync(dirPath)) continue;

        const commandFiles = fs.readdirSync(dirPath).filter(file => 
            file.endsWith(".ts") || 
            file.endsWith(".js")
        );

        for(const file of commandFiles) {
            try {
                const cmd: DiscordCommand = require(path.join(dirPath, file)).default;
                if(dir === "commandsAdmin") cmd.adminOnly = true;
                commands.set(cmd.name, cmd);
            } catch(err) {
                console.error(`Chyba při načítání příkazu ${file}:`, err);
            }
        }
    }
    console.log(`✅ Načteno ${commands.size} Discord příkazů.`);
}

export { commands, loadDiscordCommands };