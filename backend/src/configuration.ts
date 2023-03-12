import { Configuration, App, IMidwayContainer } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import * as dotenv from 'dotenv';
import { TokenManager } from './token.manager';

// load .env file in process.cwd
dotenv.config();

@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [
    join(__dirname, './config'),
    '/etc/dinner-hopping/config.js',
    '/usr/local/etc/dinner-hopping/config.js',
  ],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }

  async onServerReady(container: IMidwayContainer) {
    console.log('onServerReady');
    container.getAsync(TokenManager).then(ma => ma.refreshAccessToken());
  }
}
