import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { SentryService } from '@ntegral/nestjs-sentry'
import { Response } from 'express'
import { MongoError } from 'mongodb'

@Catch(MongoError)
export class MongoDuplicateUserEmailExceptionFilter implements ExceptionFilter {
  constructor(private readonly sentry: SentryService) {}

  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const code = exception.code
    let status = 500
    let errorMessage = ''

    if (code.toString() === '11000') {
      errorMessage = 'User email alredy exist'
      status = 400
    } else {
      errorMessage = 'Interno Error'
      status = 500
      this.sentry.instance().captureException(exception)
    }

    response.status(status).send({
      error: errorMessage,
    })
  }
}
