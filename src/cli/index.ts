import { program } from '@commander-js/extra-typings'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const p = program

p.executableDir(__dirname)

p.name('ghp')
  .version('0.0.1')
  .command('search [query]', 'search something')
  .command('search [query]', 'search something')
  .command('search [query]', 'search something')
  .command('search [query]', 'search something')

p.parse(process.argv)
