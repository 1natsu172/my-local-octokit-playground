import { Command, Option } from 'clipanion'
import { getEnv, octokit } from '../../libs'

export class IterationCommand extends Command {
  static paths = [[`iteration`]]

  name = Option.String()
  async execute() {
    this.context.stdout.write(`Hello ${this.name}!\n`)
  }
}

export const command = IterationCommand
