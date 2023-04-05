import { Configuration, App, Inject } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import * as dotenv from 'dotenv';
import { AzureKeyVaultService } from './service/azure.service';
import * as jwt from '@midwayjs/jwt';


// load .env file in process.cwd
dotenv.config();

@Configuration({
  imports: [
    koa,
    jwt,
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

  @Inject()
  azureSecretsClient: AzureKeyVaultService;

  async onConfigLoad() {
    console.log(this.app.getEnv());
    const sendgridApiKey = await this.azureSecretsClient.getSecret(
      'SENDGRID-API-KEY'
    );
    const sendgridSender = await this.azureSecretsClient.getSecret(
      'SENDGRID-SENDER'
    );
    const emailSecret = await this.azureSecretsClient.getSecret('VERIFICATION-JWT-SECRET');
    return {
      sendgrid: {
        apiKey: sendgridApiKey,
        sender: sendgridSender,
      },
      jwt: {
        secret: emailSecret,
      }
    };
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
