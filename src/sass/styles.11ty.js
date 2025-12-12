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
    return {
      permalink: `styles/${fileName.replace('scss', 'css')}`,
      rawFilepath
    }
  }

  async render ({ rawFilepath }) {
    const sassToCss = await sass.compileAsync(rawFilepath)

    return await postcss([
      require('autoprefixer'),
      require('cssnano')
    ])
    .process(sassToCss.css, {from: undefined})
    .then(result => result.css)
  }
}
