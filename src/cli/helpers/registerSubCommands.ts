import { Cli } from 'clipanion'

export const registerSubCommands = async (cli: Cli) => {
  const subCommands = await Promise.all([
    (
      await import('../subCommands/MoveToIterationCommand.js')
    ).MoveToIterationCommand,
    (await import('../subCommands/MoveToStatusCommand.js')).MoveToStatusCommand,
    (await import('../subCommands/search.js')).SearchCommand,
  ])

  for (const command of subCommands) {
    cli.register(command)
  }

  return cli
}
