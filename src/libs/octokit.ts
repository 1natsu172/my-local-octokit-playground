import { Octokit } from '@octokit/core'
import { getEnv } from './getEnv.js'

const { GH_TOKEN } = getEnv()

export const octokit = new Octokit({ auth: GH_TOKEN })
