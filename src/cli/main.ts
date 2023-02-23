import { Cli } from 'clipanion'
import { registerSubCommands } from './helpers/index.js'
import { subCommands } from './subCommands/index.js'

export async function main() {
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
}
