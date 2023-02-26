import { flight, IterationKey } from '../e2e-flight/moveToIteration.js'

type Options = {
  projectViewUrl: string
  is: string
  from: IterationKey
  to: IterationKey
}

export const moveToIteration = async (options: Options) => {
  const { projectViewUrl, is, from, to } = options

  const url = createUrl({ projectViewUrl, is, from })

  await flight({ url, nextIteration: to })
}

function createUrl(options: Omit<Options, 'to'>) {
  const { projectViewUrl, is, from } = options

  /**
   * decode style is: '?filterQuery=is:open+iteration:@current'
   */
  const queryString = `?filterQuery=is:${is}+iteration:${from}`

  return projectViewUrl + encodeURIComponent(queryString)
}
