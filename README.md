# Metalsmith-revision

Metalsmith package to only rebuild the modified files.

## Install

  ``` npm install metalsmith-revision ```

## Usage

```javascript
import revision from 'metalsmith-revision'
// OR
const revision = require('metalsmith-revision').default

Metalsmith(__dirname)
  .revision()
  .markdown()
  //...your plugins
  .build()
```


If you use matealsmith-layouts, you need inform the plugin:
```javascript
import layouts from 'metalsmith-layouts'
import revision from 'metalsmith-revision'
// OR
const revision = require('metalsmith-revision').default

Metalsmith(__dirname)
  .revision({ layout: true, layoutDir: './layouts' })
  .markdown()
  .layouts({ engine: 'jade'})
  //...your plugins
  .build()
```

By default, layout are deactivated. If you do not specified a directory, the plugin will look for the default one ('./layouts').

## Benchmark

You can find some performance test here: [benchmark](https://github.com/wcastand/metalsmith-benchmark)

## Contributing

Feel free to make issues or PRs or do some test (i would love that ;) ).
