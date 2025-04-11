import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import { MongooseModule } from '@nestjs/mongoose'
import { ThrottlerModule } from '@nestjs/throttler'
import { SentryModule } from '@ntegral/nestjs-sentry'
import { LogLevel } from '@sentry/types'

import databaseConfig from './config/database.config'
import local from './config/local.config'
import all from './config/all.config'
import { UserModule } from './module/user/user.module'
import { AccessCountModule } from './module/access-count/access-count.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [databaseConfig, local, all],
    }),
    LoggerModule.forRoot(),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL', 1000),
        limit: config.get('THROTTLE_LIMIT', 30),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('database').uri,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        dsn: config.get('sentry.dsn'),
        debug: process.env.NODE_ENV !== 'production',
        enabled: ['production', 'development'].includes(process.env.NODE_ENV),
        environment: process.env.NODE_ENV,
        release: '0.0.1',
        logLevel: LogLevel.Debug,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AccessCountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
