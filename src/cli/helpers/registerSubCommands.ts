import { Cli } from 'clipanion'

export const registerSubCommands = async (cli: Cli) => {
  const subCommands = await Promise.all([
    (await import('../subCommands/iteration.js')).IterationCommand,
    (await import('../subCommands/search.js')).SearchCommand,
  ])

  for (const command of subCommands) {
    cli.register(command)
  }

  return cli
}
