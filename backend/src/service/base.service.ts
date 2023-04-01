import { Inject, Init } from '@midwayjs/core';
import { PrismaClient } from '@prisma/client';
import { AzureKeyVaultService } from './azure.service';


export class BaseService {
  protected prisma: PrismaClient

  @Inject()
  private keyVaultService: AzureKeyVaultService

  @Init()
  async init() {
    let dbUrl : string = await this.keyVaultService.getSecret('DATABASE-URL')
    console.log(dbUrl)
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: dbUrl,
        }
      },
    });
  }
}
