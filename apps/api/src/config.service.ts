import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string | undefined {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT') as string),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      autoLoadEntities: true,
      logging: !this.isProduction(),

      entities: [__dirname + '**/*.entity{.ts,.js}'],

      synchronize: !this.isProduction(),
    };
  }

  public getJwtSecret(): string {
    return this.getValue('JWT_SECRET') as string;
  }

  public getJwtExpiresIn(): string {
    return this.getValue('JWT_EXPIRES_IN', false) || '1d';
  }

  public getAdminUsername(): string {
    return this.getValue('ADMIN_USERNAME') as string;
  }

  public getAdminPasswordHash(): string {
    return this.getValue('ADMIN_PASSWORD_HASH') as string;
  }

  public getCorsOrigins(): string[] {
    const origins = this.getValue('CORS_ORIGINS', false);
    if (!origins) {
      return ['http://localhost:3000', 'http://localhost:3001'];
    }
    return origins.split(',').map((origin) => origin.trim());
  }

  public getRateLimitTtl(): number {
    const ttl = this.getValue('RATE_LIMIT_TTL', false);
    return ttl ? parseInt(ttl) : 60000;
  }

  public getRateLimitMax(): number {
    const max = this.getValue('RATE_LIMIT_MAX', false);
    return max ? parseInt(max) : 100;
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };
