const PDFMerger = require('pdf-merger-js')
const fs = require('fs')

module.exports =  mergeFiles = async () => {
	const dir = fs.readdirSync(__dirname + '/content')
	const merger = new PDFMerger()

	for await (const file of dir) {
		await merger.add(__dirname + '/content/' + file)
	}
	if (!fs.existsSync(__dirname + '/result')){
		fs.mkdirSync(__dirname + '/result');
	}
	await merger.save(__dirname + '/result/merged.pdf')
}
