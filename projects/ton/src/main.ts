import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { SentryService } from '@ntegral/nestjs-sentry'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './common/filter/all-exceptions-filter'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get<ConfigService>(ConfigService)

  app.useLogger(SentryService.SentryServiceInstance())
  app.useGlobalFilters(new AllExceptionsFilter(new SentryService()))
  app.enableCors()
  app.use(helmet())

  app.setGlobalPrefix('v1')

  const swagger = new DocumentBuilder()
    .setTitle('ton-api')
    .setDescription('Ton Challenge API')
    .setVersion('0.0.1')
    .build()
  const document = SwaggerModule.createDocument(app, swagger)
  SwaggerModule.setup('docs', app, document)

  const port = config.get('port')
  await app.listen(port, '0.0.0.0')

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }

  process.on('unhandledPromiseRejectionWarning', (reason, promise) => {
    console.error(reason)
    console.log(promise)
  })

  process.on('uncaughtException', (err) => {
    console.error(err)
  })
}
bootstrap()
