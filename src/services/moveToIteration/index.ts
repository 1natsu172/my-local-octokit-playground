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

  await flight({ url, fromIteration: from, nextIteration: to })
}

function createUrl(options: Omit<Options, 'to'>) {
  const { projectViewUrl, is, from } = options

  /**
   * decode style is: 'is:open+iteration:"Iteration+1"'
   */
  const queryString = `is:${is}+iteration:"${from}"`

  // layout=table view is must.
  return projectViewUrl + '?layout=table&filterQuery=' + encodeURI(queryString)
}
