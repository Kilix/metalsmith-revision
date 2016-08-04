const Metalsmith = require('metalsmith')
const revision = require('../lib').default
const layouts = require('metalsmith-layouts')
const markdown = require('metalsmith-markdown')

Metalsmith(__dirname)
  .clean(false)
  .use(markdown())
  .use(layouts({
    engine: 'jade'
  }))
  .use(revision())
  .build(function(err) {
    if (err) throw err
    console.log('Build finished!')
  })
