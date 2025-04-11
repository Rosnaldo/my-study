import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import * as countapi from 'countapi-js'
import type { Result } from 'countapi-js'

@Injectable()
export class CountApiVisitsService {
  private readonly namespace: string
  private readonly key: string

  constructor(private readonly config: ConfigService) {
    this.namespace = this.config.get('namespace')
    this.key = this.config.get('key')
  }

  async get(): Promise<Result> {
    return countapi.get(this.namespace, this.key)
  }

  async hit(): Promise<Result> {
    return countapi.hit(this.namespace, this.key)
  }
}
