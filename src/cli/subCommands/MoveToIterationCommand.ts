import { Command, Option, Usage } from 'clipanion'
import * as t from 'typanion'
import { getEnv, octokit } from '../../libs/index.js'

/**
 * The accepted values are "1" OR "2".
 */
const iterationKeyValidator = t.isOneOf([
  t.isEnum(['@previous', '@current', '@next']), // "1" Which one
  // @ts-ignore
  t.matchesRegExp(/Iteration \d/), // "2" `Iteration <digit>`
])

export class MoveToIterationCommand extends Command {
  static paths = [[`move-to-iteration`], [`moti`]]

  static usage = this.Usage({
    examples: [
      [
        `move-to-iteration example`,
        `$0 move-to-iteration https://github.com/users/1natsu172/projects/2/views/1 --from @current --to @next`,
      ],
      [
        `moti example with 'is'`,
        `$0 moti https://github.com/users/1natsu172/projects/2/views/1 --is open --from @current --to @next`,
      ],
    ],
  })

  // example: https://github.com/users/1natsu172/projects/2/views/1
  projectViewUrl = Option.String({ required: true })

  // GitHub issue query that `is`
  is = Option.String(`--is`, 'open', {})

  from = Option.String(`--from`, {
    required: true,
    validator: iterationKeyValidator,
  })

  to = Option.String(`--to`, {
    required: true,
    validator: iterationKeyValidator,
  })

  async execute() {
    this.context.stdout.write(
      `Hello ${this.projectViewUrl} ${this.is} ${this.from} ${this.to}!\n`,
    )
  }
}
