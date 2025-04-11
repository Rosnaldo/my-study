const fs = require('fs')
const csv = require('csvtojson')
const { Transform, pipeline } = require('stream')
const { transformOnePlanet } = require('./transform')

const inputStream = fs.createReadStream('data/planetRaw.csv')
const outputStream = fs.createWriteStream('data/outStreaming.ndjson')
const csvParser = csv()

const transformPlanetStream = new Transform({
  transform(planet, encoding, cb) {
    try {
      const planetObject = JSON.parse(planet)
      const transformedPlanet = transformOnePlanet(planetObject)
      const planetString = `${JSON.stringify(transformedPlanet)}`
      cb(null, planetString)
    } catch (err) {
      cb(err)
    }
  }
})

// inputStream.pipe(csvParser).pipe(transformPlanetStream).pipe(outputStream)
// inputStream.on('error', err => console.log(err))
// csvParser.on('error', err => console.log(err))
// transformPlanetStream.on('error', err => console.log(err))
// outputStream.on('error', err => console.log(err))

pipeline(inputStream, csvParser, transformPlanetStream, outputStream, err => {
  if (err) {
    console.log('Error occurred in pipeline', err)
  } else {
    console.log('Pipeline completed successfully')
  }
})