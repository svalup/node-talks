import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ApiConfig {
  @Expose()
  dbType?: string;

  @Expose()
  dbHost?: string;

  @Expose()
  dbPort?: number;

  @Expose()
  dbUsername?: string;

  @Expose()
  dbPassword?: string;

  @Expose()
  dbDatabase?: string;

  @Expose()
  oauthClientId?: string;

  @Expose()
  oauthClientSecret?: string;

  @Expose()
  oauthCallbackUrl?: string;
}
