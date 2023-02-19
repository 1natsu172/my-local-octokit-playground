import { Command, Option } from 'clipanion'
import { getEnv, octokit } from '../../libs'

export class SearchCommand extends Command {
  static paths = [[`search`]]

  name = Option.String()

  id = Option.String()

  async execute() {
    this.context.stdout.write(`Hello ${this.name}! your id is ${this.id}\n`)
  }
}

export const command = SearchCommand
