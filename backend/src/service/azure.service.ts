import {
  Provide,
  MidwayConfigService,
  Init,
  Scope,
  ScopeEnum,
  Inject,
} from '@midwayjs/core';
import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';

@Scope(ScopeEnum.Singleton)
@Provide()
export class AzureKeyVaultService {
  client: SecretClient;

  @Inject()
  configService: MidwayConfigService;

  @Init()
  async init() {
    const credential = new DefaultAzureCredential();
    // Returns the properties of the currently merged configuration object
    const uri = this.configService.getConfiguration().azure.keyVaultURI;
    this.client = new SecretClient(uri, credential);
  }

  async setSecret(secretName: string, value: string) {
    const result = await this.client.setSecret(secretName, value);
    console.log(result);
  }

  async getSecret(secretName: string): Promise<string> {
    const result = await this.client.getSecret(secretName);
    return result.value;
  }

  async removeSecret(secretName: string) {
    await this.client.beginDeleteSecret(secretName);
  }

  async updateSecret(secretName: string) {
    const secret = await this.client.getSecret(secretName);
    await this.client.updateSecretProperties(
      secretName,
      secret.properties.version,
      {
        enabled: false,
      }
    );
  }
}
