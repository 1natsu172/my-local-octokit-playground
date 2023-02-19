import { BaseContext, Cli, CommandClass } from 'clipanion'

export const registerSubCommands = <Context extends BaseContext>(
  cli: Cli,
  commandDefs: CommandClass<Context>[],
) => {
  for (const command of commandDefs) {
    cli.register(command)
  }

  return cli
}
