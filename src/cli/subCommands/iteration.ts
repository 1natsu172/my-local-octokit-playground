import { program } from '@commander-js/extra-typings'
import { getEnv, octokit } from '../../libs'

export const command = program
  .command('iteration')
  .description('iteration it')
  .argument('<username>', 'user to login')
  .action((argv, command) => {
    console.log('iteration', argv)

    // await octokit.graphql(`
    //   {}
    // `)
  })

// @ts-expect-error not defined type but exist in property.
export const actionHandler = command._actionHandler
