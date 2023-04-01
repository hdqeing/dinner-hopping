import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1678359833647_1017',
  koa: {
    port: 4365,
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    sender: process.env.SENDGRID_SENDER,
  },
  azure: {
    keyVaultURI: process.env.AZURE_KEY_VAULT_URI,
  },
} as MidwayConfig;
