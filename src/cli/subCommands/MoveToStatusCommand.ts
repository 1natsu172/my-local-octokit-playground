import { Command, Option } from 'clipanion'
import * as t from 'typanion'
import { moveToStatus } from '../../services/moveToStatus/index.js'
import { getEnv } from '../../libs/index.js'

const statusKeyValidator = t.isString()

export class MoveToStatusCommand extends Command {
  static paths = [[`move-to-status`], [`motus`]]

  static usage = this.Usage({
    examples: [
      [
        `move-to-status example`,
        `$0 move-to-status https://github.com/users/1natsu172/projects/2/views/1 --from "Todo" --to "Done"`,
      ],
      [
        `moti example with 'is'`,
        `$0 bin/cli moti https://github.com/users/1natsu172/projects/2 --is open --from "Todo" --to "Done"`,
      ],
    ],
  })

  // example: https://github.com/users/1natsu172/projects/2/views/2?layout=table&filterQuery=is%3Aclosed+no%3Astatus+no%3Astatus
  // @ts-ignore
  projectViewUrl = Option.String({
    required: true,
    validator: t.matchesRegExp(/filterQuery=/),
  }) as string

  from = Option.String(`--from`, {
    required: true,
    validator: statusKeyValidator,
  })

  to = Option.String(`--to`, {
    required: true,
    validator: statusKeyValidator,
  })

  async execute() {
    const { projectViewUrl, from, to } = this
    this.context.stdout.write(
      `Hello your request = url=${projectViewUrl}, from=${from}, to=${to}!\n`,
    )

    if (!getEnv().DRY_RUN) {
      await moveToStatus({ projectViewUrl, from, to })
    }
  }
}
