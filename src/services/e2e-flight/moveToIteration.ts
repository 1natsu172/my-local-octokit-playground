import { chromium } from 'playwright'

export type IterationKey = `Iteration ${number}`

export type FlightContext = {
  url: string
  nextIteration: IterationKey
}

export const flight = async (flightContext: FlightContext) => {
  const { url, nextIteration } = flightContext

  const browser = await chromium.launch({
    headless: false,
  })
  const context = await browser.newContext({
    storageState: 'playwright/.auth/user.json',
  })
  const page = await context.newPage()
  // set default waitFor time.
  page.setDefaultTimeout(10000)

  await page.goto(url)

  const targetCellSelector = '[data-test-id*="column: Iteration"]'

  const selectCellAndChange = async () => {
    await page
      .locator(targetCellSelector)
      .getByRole('button', { name: 'Dropdown button' })
      .click()

    const dropdownOption = page.locator(`[title="${nextIteration}"]`)
    await dropdownOption.waitFor()
    dropdownOption.click()
    // getByText(nextIteration).click()
  }

  const checkRowAndExecute = async () => {
    const isStillExist = await page.waitForFunction(
      (selector) => !!document.querySelector(selector),
      targetCellSelector,
    )
    if (!isStillExist) {
      return
    }

    // change execute
    await selectCellAndChange()
    // recursive run.
    await checkRowAndExecute()
  }

  // wait for the target Iteration cell on first rendered.
  await page.waitForSelector(targetCellSelector)
  await checkRowAndExecute()

  // ---------------------
  await context.close()
  await browser.close()
}
