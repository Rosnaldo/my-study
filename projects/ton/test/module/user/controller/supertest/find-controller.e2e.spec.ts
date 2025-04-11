import { Test } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'
import request from 'supertest'
import { LoadSeed } from 'test/util/load-seed'
import { UserFindOneController } from 'src/module/user/controller/find-one.controller'
import { UserMongooseModule } from 'src/module/user/user.module'
import { UserFindOneRepository } from 'src/module/user/repository/find-one.repostiory'

let app: any
let replSet: any

describe('UserFindOneController', () => {
  beforeAll(async () => {
    const { uri, replSet2 } = await LoadSeed()
    replSet = replSet2
    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => ({
            uri,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
          }),
        }),
        UserMongooseModule,
      ],
      controllers: [UserFindOneController],
      providers: [UserFindOneRepository],
    }).compile()
    app = await moduleRef.createNestApplication().init()
  })

  afterAll(async () => {
    await app.close()
    await replSet.stop()
  })

  it(`/GET user`, () => {
    return request(app.getHttpServer())
      .get('/users/5ce5895fc312a6648e06d5f3')
      .then((result) => {
        expect(result.status).toEqual(200)
        expect(result.text).toMatchSnapshot()
      })
  })
})
