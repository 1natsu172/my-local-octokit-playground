#!/usr/bin/env node -r dotenv/config --loader tsx
// FIXME: tsxつかってsrc読まずtsupで吐いたdistを本当は読みたいが、directory structure維持されずアプリケーションが壊れるので、一旦srcのほうを読む
// #!/usr/bin/env node -r dotenv/config

import { main } from './cli/main.js'

try {
  console.log('welcome')
  await main()
} catch (error) {
  console.error('main error', error)
}
