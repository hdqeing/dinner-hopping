import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1678359833647_1017',
  koa: {
    port: 4365,
  },
  oauth2: {
    user: process.env.OAUTH2_USER,
    clientId: process.env.OAUTH2_CLIENT_ID,
    clientSecret: process.env.OAUTH2_CLIENT_SECRET,
    refreshToken: process.env.OAUTH2_REFRESH_TOKEN,
    accessToken: process.env.OAUTH2_ACCESS_TOKEN,
  },
} as MidwayConfig;
