import { Seeder } from 'mongo-seeding'
import * as path from 'path'

export default async function seed(uri) {
  const config = {
    database: uri,
    dropCollections: true,
  }
  const seeder = new Seeder(config)
  const collections = seeder.readCollectionsFromPath(path.join(process.cwd(), '/seeds'), {
    extensions: ['json'],
  })
  return seeder.import(collections)
}
