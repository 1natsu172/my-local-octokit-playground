import { Cli } from 'clipanion'

export const registerSubCommands = async (cli: Cli) => {
  const subCommands = await Promise.all([
    import('../subCommands/iteration.js').then(({ command }) => command),
    import('../subCommands/search.js').then(({ command }) => command),
  ])

  for (const command of subCommands) {
    cli.register(command)
  }

  return cli
}
