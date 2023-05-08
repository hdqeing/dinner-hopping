import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import * as dotenv from 'dotenv';
import * as jwt from '@midwayjs/jwt';
import * as crossDomain from '@midwayjs/cross-domain';
import * as orm from '@midwayjs/typeorm';

// load .env file in process.cwd
dotenv.config();

console.log(process.env.DATABASE_URL)
console.log(process.env.SENDGRID_SENDER)
console.log(process.env.SENDGRID_API_KEY)

@Configuration({
  imports: [
    crossDomain,
    koa,
    jwt,
    orm,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onConfigLoad() {
    console.log(this.app.getEnv());
  }

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }

  async onServerReady() {
    console.log('onServerReady');
  }
}
