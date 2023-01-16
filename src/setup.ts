import crypto from 'crypto';
import { ActivityType, Client, GatewayIntentBits, REST } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';
import { CONFIG } from './settings';
import { Command } from './types';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});
export const rest = new REST({ version: '10' }).setToken(CONFIG.api_key);
client.login(CONFIG.api_key);

const getMap = <T>(subPath: string, nameExtractor: (item: T) => string) => {
  const joinedPath = path.join(__dirname, subPath);
  const items = readdirSync(joinedPath).map(
    f => require(path.join(joinedPath, f)) as T
  );
  return items.reduce<Record<string, T>>(
    (acc, c) => ({ ...acc, [nameExtractor(c)]: c }),
    {}
  );
};

export const commandsMap = getMap<Command>('commands', c => c.command.name);

client.once('ready', () => {
  client.user.setActivity(
    CONFIG.isDev
      ? {
          type: ActivityType.Streaming,
          name: ` ${crypto.randomBytes(20).toString('hex')}`,
        }
      : undefined
  );
});
