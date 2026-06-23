**! Tento projekt slouží pouze jako ukázková verze projektu pro prezentaci a bez příslušných tokenů a id nebude fungovat! !**

# Krvesajka_ChatBot Demo

Demo projekt chatbota napsaného v TypeScriptu, který propojuje Discord a Twitch.
Projekt ukazuje základní práci s Discord botem, Twitch chat botem, příkazovým systémem, přeposíláním zpráv mezi platformami, logováním a správou oprávnění.

---

## Hlavní funkce

* Připojení Discord bota na server
* Připojení Twitch bota do chatu
* Reakce na příkazy na Discordu i Twitchi
* Automatické přeposílání zpráv z Twitche na Discord
* Systém pro načítání a správu příkazů
* Oddělení běžných příkazů a administračních/moderátorských příkazů
* Kontrola oprávnění pro vybrané příkazy
* Cooldown systém pro omezení opakovaného použití
* Logování příkazů
* Archivace Discord kanálu na příkaz
* Přesun zpráv do jiného Discord kanálu
* Mazání zpráv pomocí administračního příkazu
* Konfigurace pomocí `.env` souboru

---

## Použité technologie

* TypeScript
* Node.js
* discord.js
* tmi.js
* dotenv
* ts-node

---

## Struktura projektu

```txt
src/
  core/
    bridge.ts
    links.ts

  discord/
    archiver/
      archiver.ts
    commands/
      help.ts
      info.ts
    commandsAdmin/
      archive.ts
      delete.ts
      move.ts
    handlers/
      commandLoader.ts
      insufficientPermission.ts
      messageHandler.ts
      unknownCommand.ts
    helperFunctions/
      messages.ts
    discordClient.ts

  interfaces/
    default.ts

  logger/
    logger.ts

  services/
    CooldownService.ts

  twitch/
    commands/
      help.ts
      ping.ts
    commandsModerator/
    handlers/
      commandLoader.ts
      insufficientPermission.ts
      messageHandler.ts
      unknownCommand.ts
    twitchClient.ts

  types/
    default.ts
    discord.ts
    twitch.ts

  config.ts
  index.ts
```

---

## Popis vybraných částí projektu

### `core/`

Obsahuje logiku pro propojení Discordu a Twitche.
Soubor `bridge.ts` řeší přeposílání zpráv mezi platformami a `links.ts` obsahuje konfiguraci propojení mezi konkrétními kanály.

### `discord/`

Obsahuje Discord část aplikace:

* vytvoření Discord klienta
* načítání příkazů
* zpracování zpráv
* administrační příkazy
* pomocné funkce pro práci se zprávami
* archivaci kanálu

### `twitch/`

Obsahuje Twitch část aplikace:

* vytvoření Twitch klienta
* načítání příkazů
* zpracování zpráv
* běžné a moderátorské příkazy

### `services/`

Obsahuje sdílené služby, například `CooldownService`, který hlídá opakované používání příkazů nebo akcí.

### `logger/`

Obsahuje vlastní logger pro ukládání informací o použitých příkazech a důležitých událostech.

### `types/` a `interfaces/`

Obsahují společné typy a rozhraní používané napříč projektem.

---

## Instalace

Nejdříve je potřeba nainstalovat závislosti:

npm install

---

## Konfigurace prostředí

Projekt používá `.env` soubor pro citlivé údaje a konfiguraci.

V repozitáři je připravený soubor `.env.example`:

```txt
DISCORD_TOKEN=My_Token

TWITCH_TOKEN=oauth:My_Token
TWITCH_BOT_USERNAME=Bot_Username
TWITCH_CHANNELS=My_Channel
```

Pro spuštění projektu je potřeba vytvořit vlastní `.env` soubor podle `.env.example` a doplnit skutečné hodnoty tokenů.

---

## Spuštění projektu

Projekt se spouští pomocí npm scriptu:

npm start

Interně se používá:

ts-node src/index.ts

---

## Ukázkové příkazy

Projekt obsahuje příkazy pro Discord i Twitch.

Příklady funkcí:

* výpis nápovědy
* informační příkaz
* smazání zprávy
* přesun zprávy do jiného kanálu
* archivace Discord kanálu
* Twitch příkaz `ping`

Konkrétní dostupnost příkazů závisí na platformě a oprávnění uživatele.

---

## Co projekt ukazuje

Tento projekt ukazuje:

* práci s externími knihovnami `discord.js` a `tmi.js`
* rozdělení aplikace na menší části podle odpovědnosti
* zpracování uživatelských zpráv
* vlastní command systém
* práci s oprávněními
* sdílení logiky mezi Discordem a Twitchem
* konfiguraci aplikace přes proměnné prostředí
* základní logování
* návrh projektu, který lze dále rozšiřovat

---

## Stav projektu

Tento repozitář je demo verze většího projektu.
Cílem není ukázat kompletní produkční aplikaci, ale přehledně představit hlavní funkcionalitu, strukturu kódu a způsob přemýšlení nad návrhem aplikace.

---

## Licence

Projekt je dostupný pod licencí MIT.
