import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';
import { ApiConfig } from '@node-talks/shared';
import { plainToInstance } from 'class-transformer';

export class EnvironmentProvider {
  public apiConfig: ApiConfig;

  static async asyncInit(): Promise<EnvironmentProvider> {
    const configuration = new this();
    return await configuration.refreshConfig();
  }

  async refreshConfig(): Promise<EnvironmentProvider> {
    if (process.env.PROJECT_ENV !== 'local') {
      // get values from Azure Keyvault and save them in process.env
      await this.injectVaultSecretValues();

      // build config to be used by the BE
      this.apiConfig = this.buildConfig();
    }
    return this
  }

  async injectVaultSecretValues (): Promise<void> {
    const keyVaultUrl = process.env.VAULT_URL
    if (!keyVaultUrl) {
      throw new Error('Vault Configuration option VAULT_URL not defined')
    }
  
    const credential = new DefaultAzureCredential()
    const client = new SecretClient(keyVaultUrl, credential)
  
    for await (const secretProperties of client.listPropertiesOfSecrets()) {
      if (secretProperties.enabled) {
        /** Azure Vault is limited to [a-z-], we need to replace - with _ for Env Vars */
        const key = secretProperties.name.replace(/-/g, '_')
        const secret = await client.getSecret(secretProperties.name)
        process.env[key] = secret.value
      }
    }
  }

  buildConfig (config = new ApiConfig()) {
    const { env } = process
    config = plainToInstance(ApiConfig, env, { excludeExtraneousValues: true })
    return config
  }
}
