import { Command, OptionValues } from '@commander-js/extra-typings'

export const registerSubCommands = <
  Args extends any[] = [],
  Opts extends OptionValues = {},
>(
  program: Command<Args, Opts>,
  commandDefs: Command<Args, Opts>[],
) => {
  for (const command of commandDefs) {
    program.addCommand(command).copyInheritedSettings(program)
  }

  return program
}
