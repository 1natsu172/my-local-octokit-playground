#!/usr/bin/env node -r dotenv/config
import { main } from './cli/main.js'
import { getEnv } from './libs/index.js'

try {
  console.log('welcome')
  console.log('is dry?', getEnv().DRY_RUN)
  await main()
} catch (error) {
  console.error('main error', error)
}
