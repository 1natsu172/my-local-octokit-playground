import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/)
})

test('2fa', async ({ page }, testInfo) => {
  await page.goto('https://github.com/login')

  // Expect a title "to contain" a substring.
  await page.screenshot({
    path: `${testInfo.outputDir}/screenshots/${testInfo.title}-${testInfo.line}.png`,
  })
})

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/')

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click()

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/)
})
