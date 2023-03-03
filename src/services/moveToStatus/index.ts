import { flight, StatusKey } from './e2e-flight.js'

type Options = {
  projectViewUrl: string
  is: string
  from: StatusKey
  to: StatusKey
}

export const moveToStatus = async (options: Options) => {
  const { projectViewUrl, is, from, to } = options

  const url = createUrl({ projectViewUrl, is, from })

  await flight({ url, fromStatus: from, nextStatus: to })
}

function createUrl(options: Omit<Options, 'to'>) {
  const { projectViewUrl, is, from } = options

  /**
   * decode style is: 'is:open+status:"Status+1"'
   */
  const queryString = `is:${is}+status:"${from}"`

  // layout=table view is must.
  return projectViewUrl + '?layout=table&filterQuery=' + encodeURI(queryString)
}
