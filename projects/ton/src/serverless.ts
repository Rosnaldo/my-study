import { NestFactory } from '@nestjs/core'
import { SentryService } from '@ntegral/nestjs-sentry'
import serverlessExpress from '@vendia/serverless-express'
import { Handler, Context, Callback } from 'aws-lambda'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './common/filter/all-exceptions-filter'

let server: Handler

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalFilters(new AllExceptionsFilter(new SentryService()))

  app.enableCors()
  app.use(helmet())

  app.setGlobalPrefix('v1')

  await app.init()
  const expressApp = app.getHttpAdapter().getInstance()
  return serverlessExpress({ app: expressApp })
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  server = server ?? (await bootstrap())
  return server(event, context, callback)
}
