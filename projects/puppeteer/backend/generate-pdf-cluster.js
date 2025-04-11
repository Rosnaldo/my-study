const { Cluster } = require('puppeteer-cluster')
const fs = require('fs')


const render = async ({ page, data: { file } }) => {
  const html = fs.readFileSync(__dirname + '/resource/page' + file.toString() + '.html').toString()
  await page.setDefaultNavigationTimeout(0)
  await page.setContent(html, { waitUntil: 'networkidle0' })

  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    landscape: true,
    timeout: 0,
  })
  if (!fs.existsSync(__dirname + '/content')){
    fs.mkdirSync(__dirname + '/content');
  }
  fs.writeFileSync(__dirname + '/content/page' + file.toString() + '.pdf', pdf)
}

module.exports = runCluster = async () => {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 10,
  })
  
  await cluster.task(render)
  
  for (const file of [1, 2, 3, 4, 5 ,6]) {
    await cluster.queue({ file })
  }
  
  await cluster.idle()
  await cluster.close()
}
