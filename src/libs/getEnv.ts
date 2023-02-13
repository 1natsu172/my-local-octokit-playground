export const getEnv = () => {
  const { DRY_RUN, GH_TOKEN } = process.env
  if (!DRY_RUN) {
    throw new Error('not found DRY_RUN')
  }

  const bool_DRY_RUN = DRY_RUN === 'true' ? true : false

  return { DRY_RUN: bool_DRY_RUN, GH_TOKEN }
}
