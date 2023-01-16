const IS_PROD = process.env.IS_PROD === 'true';

const DEV_CONFIG = {
  api_key: process.env.DISCORD_API_KEY,
  client_id: '1064538581177225246',
  isDev: true,
};

const PROD_CONFIG = {
  api_key: process.env.DISCORD_API_KEY,
  client_id: '1064524462004899961',
  isDev: false,
};

export const CONFIG = IS_PROD ? PROD_CONFIG : DEV_CONFIG;
