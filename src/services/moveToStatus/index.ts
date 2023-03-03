import { flight, StatusKey } from './e2e-flight.js'

type Options = {
  projectViewUrl: string
  from: StatusKey
  to: StatusKey
}

export const moveToStatus = async (options: Options) => {
  const { projectViewUrl, from, to } = options

  await flight({ url: projectViewUrl, fromStatus: from, nextStatus: to })
}
