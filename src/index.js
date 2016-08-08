import { resolve, relative } from 'path'
import fs from 'fs'
import crypto from 'crypto'
import recurse from 'recursive-readdir'

function checksum (str, algorithm, encoding) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex')
}
const default_options = { layout: false, layoutDir: './layouts' }

export default function(opts) {
  const options = Object.assign({}, default_options, opts)

  return (files, metalsmith, done) => {
    const configPath = resolve(metalsmith._directory, '.revision')
    const hash_table = { layouts: {}, src: {} }
    const layoutDirectory = resolve(metalsmith._directory, options.layoutDir)
    const revision = fs.existsSync(configPath)
      ? JSON.parse(fs.readFileSync(configPath, 'utf-8'))
      : null
    if(options.layout){
      recurse(
        layoutDirectory
      , (err, layouts) => {
          if(err) throw(err)
          layouts.map(l => {
            const path = relative(layoutDirectory, l)
            const content = fs.readFileSync(l, 'utf-8')
            const hash = checksum(content)
            hash_table.layouts[path] = hash
        })
    }
      Object.keys(files).forEach(file => {
        const hash = checksum(files[file].contents)
        hash_table.src[file] = hash
        if(
          (revision !== null && revision.src[file] === hash) &&
          ( (!options.layout) ||
            (options.layout && revision.layouts[files[file].layout] === hash_table.layouts[files[file].layout]) ) )
          delete files[file]
      })
      fs.writeFileSync(configPath, JSON.stringify(hash_table), 'utf-8')
      done()
    })
  }
}
