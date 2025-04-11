import { MongoMemoryReplSet } from 'mongodb-memory-server-core'
import seed from './seed'

export const LoadSeed = async () => {
  const replSet2 = await MongoMemoryReplSet.create()
  const uri = replSet2.getUri()

  await seed(uri)

  return { uri, replSet2 }
}
