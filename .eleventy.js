const markdownIt = require('markdown-it')
const typogr = require('typogr')

module.exports = eleventyConfig => {
  // Markdown
  eleventyConfig.setLibrary('md', markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  }))

  // Filters
  eleventyConfig.addFilter('no_orphan', (content) =>
    typogr(String(content)).chain().widont().value()
  )

  // Passthrough files
  eleventyConfig.addPassthroughCopy('src/pdf')
  eleventyConfig.addPassthroughCopy('src/_redirects')
  eleventyConfig.addPassthroughCopy('src/img')
  eleventyConfig.addPassthroughCopy('src/fonts')
  eleventyConfig.addPassthroughCopy('src/favicon.ico')
  eleventyConfig.addPassthroughCopy('src/robots.txt')
  eleventyConfig.addPassthroughCopy('src/humans.txt')
  eleventyConfig.addPassthroughCopy('src/tile-wide.png')
  eleventyConfig.addPassthroughCopy('src/tile.png')
  eleventyConfig.addPassthroughCopy('src/favicon.ico')
  eleventyConfig.addPassthroughCopy('src/favicon.ico')

  // Watch
  eleventyConfig.addWatchTarget('src/sass/**/*.scss')

  return {
    dir: {
      input: 'src',
      output: '_site'
    },
    templateFormats: ['liquid', 'md', '11ty.js'],
    passthroughFileCopy: true
  }
}
