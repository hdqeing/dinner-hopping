import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1678359833647_1017',
  koa: {
    port: 4365,
  },
  cors: {
    origin: (ctx) => {
      const allowCors = [
        'https://www.dinnerhoppinggoettingen.de',
        'http://localhost:5173',
        'http://localhost:4365'
      ];
      return allowCors.indexOf(ctx.header.origin) > -1 ? ctx.header.origin : '';
    },
    credentials: true
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    sender: process.env.SENDGRID_SENDER,
  },
  azure: {
    keyVaultURI: "https://dinnerhoppingsecret.vault.azure.net/",
  },
  jwt: {
    secret: 'xxx', // fs.readFileSync('xxxxx.key')
  },

} as MidwayConfig;
