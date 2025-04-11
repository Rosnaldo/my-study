import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Response } from 'express'

interface HttpExceptionResponse {
  message: string
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const status = exception.getStatus()
    const errorResponse = exception.getResponse()
    const errorMessage = (errorResponse as HttpExceptionResponse).message || exception.message

    response.status(status).send({
      error: errorMessage,
    })
  }
}
