import { program } from '@commander-js/extra-typings'
import { getEnv, octokit } from '../../libs'

export const command = program
  .command('search')
  .description('search it')
  .argument('<username>', 'user to login')
  .action((argv, command) => {
    console.log('search', argv)

    // await octokit.graphql(`
    //   {}
    // `)
  })

// @ts-expect-error not defined type but exist in property.
export const actionHandler = command._actionHandler
