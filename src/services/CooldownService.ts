class CooldownService {
    private cooldowns = new Map<string, number>();

    canRun(key: string, cooldownTime: number): boolean {
        const now = Date.now();
        const lastRun = this.cooldowns.get(key);

        if (lastRun && now - lastRun < cooldownTime) {
            return false;
        }

        this.cooldowns.set(key, now);
        return true;
    }
}

export const cooldownService = new CooldownService();