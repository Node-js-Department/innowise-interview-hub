import { TDictionary } from '@packages/shared';

export class ConfigService {
  private readonly envConfig: TDictionary | null = null;

  constructor() {
    this.envConfig = {
      port: process.env.CORE_SERVICE_PORT,
    };
    this.envConfig.baseUri = process.env.API_GATEWAY_URI;
    this.envConfig.gatewayPort = process.env.API_GATEWAY_PORT;
  }

  get(key: string): symbol | TDictionary {
    return this.envConfig?.[key];
  }
}
