import { test as setup } from '@playwright/test'
import { readFileSync } from 'node:fs'

const authFile = 'playwright/.auth/user.json'

setup('authenticate', async ({ page }) => {
  if (readFileSync(authFile)) {
    return
  }

  await page.goto('https://github.com/login')
  await page.getByLabel('Username or email address').fill('username')
  await page.getByLabel('Password').fill('password')
  await page.getByRole('button', { name: 'Sign in' }).click()
  // End of authentication steps.

  await page.context().storageState({ path: authFile })
})
