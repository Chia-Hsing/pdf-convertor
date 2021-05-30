const fs = require('fs')
var path = require('path')
const chokidar = require('chokidar')
var PDFImage = require('pdf-image').PDFImage

exports.convertor = (req, res) => {
    console.log(req.body)
    console.log(req.files)

    const watcher = chokidar.watch('../pdf', {
        ignored: /(^|[\/\\])\../,
        persistent: false,
    })

    watcher.on('ready', (event, path) => {
        getPDF()
    })

    const getPDF = () => {
        const dirPath = path.join(__dirname, '../pdf')
        console.log(__dirname)
        fs.readdir(dirPath, { encoding: 'utf8' }, (err, doc) => {
            if (err) {
                console.log(err)
                return
            }

            doc.forEach(file => {
                const pdfFile = path.join(__dirname, '../pdf', file)
                const imgPath = path.join(__dirname, '../img')

                var pdfImage = new PDFImage(pdfFile, {
                    combinedImage: true,
                    outputDirectory: imgPath,
                    convertExtension: 'jpg',
                })

                pdfImage.convertFile().then(function (imagePaths) {
                    console.log(`PDF conversion is done, please check the following file path ${imagePaths}`)
                })
            })
        })
    }
}

/* config options */

// pdfFilePath
// pdfFileBaseName
// convertExtension,
// useGM (default false)
// combinedImage
// outputDirectory
