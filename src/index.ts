import { Routes } from 'discord.js';
import { CONFIG } from './settings';
import { client, commandsMap, rest } from './setup';

client.on('interactionCreate', async interaction => {
  if (interaction.isChatInputCommand()) {
    commandsMap[interaction.commandName]?.executor(interaction);
  }
});

client.on('guildCreate', async guild => {
  // Setup messages in guild
});

rest
  .put(Routes.applicationCommands(CONFIG.client_id), {
    body: Object.values(commandsMap).map(c => c.command.toJSON()),
  })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
