import { resolve } from 'path'
import fs from 'fs'
import crypto from 'crypto'

function checksum (str, algorithm, encoding) {
  return crypto
    .createHash(algorithm || 'md5')
    .update(str, 'utf8')
    .digest(encoding || 'hex')
}

export default function(opts) {
  return (files, metalsmith, done) => {
    const configPath = resolve(metalsmith._directory, '.revision')
    const hash_table = {}
    const revision = fs.existsSync(configPath)
      ? JSON.parse(fs.readFileSync(configPath, 'utf-8'))
      : null

    Object.keys(files).forEach(file => {
      const hash = checksum(files[file].contents)
      hash_table[file] = hash
      if(revision !== null && revision[file] === hash)
        delete files[file]
    })
    fs.writeFileSync(configPath, JSON.stringify(hash_table), 'utf-8')
    done()
  }
}
