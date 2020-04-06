const fs = require('fs')
const path = require('path')
const sass = require('sass')
const postcss = require('postcss')

// the file name as an entry point for postcss compilation
// also used to define the output filename in our output /css folder.
const fileName = 'main.scss'

module.exports = class {
  async data () {
    const rawFilepath = path.join(__dirname, `${fileName}`)
    console.log(rawFilepath)
    return {
      permalink: `styles/${fileName.replace('scss', 'css')}`,
      rawFilepath
    }
  }

  async render ({ rawFilepath }) {
    const sassToCss = sass.renderSync({
      file: rawFilepath
    })

    return await postcss([
      require('postcss-image-inliner')({
        assetPaths: [
          path.join(__dirname, `../_includes/img`)
        ],
        maxFileSize: 0
      }),
      require('autoprefixer'),
      require('cssnano')
    ])
    .process(sassToCss.css.toString())
    .then(result => result.css)
  }
}
