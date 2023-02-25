import { Cli, Builtins } from 'clipanion'
import { registerSubCommands } from './helpers/index.js'

export async function main() {
  const [node, app, ...args] = process.argv

  const cli = new Cli({
    binaryLabel: `My Application`,
    binaryName: `${node} ${app}`,
    binaryVersion: `0.0.1`,
  })

  try {
    await registerSubCommands(cli).then((cli) =>
      cli.register(Builtins.HelpCommand),
    )
    await cli.runExit(args)
  } catch (error) {
    throw error
  }
}
