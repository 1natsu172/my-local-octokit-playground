// import { program } from '@commander-js/extra-typings'
import { Cli } from 'clipanion'
import { registerSubCommands } from './helpers'
import { subCommands } from './subCommands'

const [node, app, ...args] = process.argv

const cli = new Cli({
  binaryLabel: `My Application`,
  binaryName: `${node} ${app}`,
  binaryVersion: `0.0.1`,
})

try {
  registerSubCommands(cli, subCommands)
  await cli.runExit(args)
} catch (error) {
  throw error
}
