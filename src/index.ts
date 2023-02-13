import { getEnv } from './libs'

console.log('is dry?', getEnv().DRY_RUN)
console.log('token?', getEnv().GH_TOKEN)
