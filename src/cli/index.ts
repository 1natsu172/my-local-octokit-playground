import { program } from '@commander-js/extra-typings'
import { registerSubCommands } from './helpers'
import { subCommands } from './subCommands'

program.name('ghp').version('0.0.1')
// .executableDir(__dirname)

try {
  // @ts-ignore FIXME: Tuple型
  registerSubCommands(program, subCommands)
  await program.parseAsync(process.argv)
} catch (error) {
  throw error
}
