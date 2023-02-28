import { chromium, Locator, Page } from 'playwright'

export type IterationKey = `Iteration ${number}`

export type FlightContext = {
  url: string
  fromIteration: IterationKey
  nextIteration: IterationKey
}

export const flight = async (flightContext: FlightContext) => {
  const browser = await chromium.launch({
    headless: false,
  })
  const context = await browser.newContext({
    storageState: 'playwright/.auth/user.json',
  })
  const page = await context.newPage()
  // set default waitFor time.
  page.setDefaultTimeout(10000)

  // ---------------------

  await fly(page, flightContext)

  // ---------------------
  await context.close()
  await browser.close()
}

/**
 * @description flight course.
 */
async function fly(page: Page, flightContext: FlightContext) {
  const { url, fromIteration, nextIteration } = flightContext

  await page.goto(url)

  const iterationCellsSelector = '[data-test-id*="column: Iteration"]'

  while (true) {
    const { targetFromIterations, fromIterationCount } = await getTargetElement(
      page,
    )

    if (!fromIterationCount) {
      break
    }

    console.log('targets iteration count is: ', fromIterationCount)

    for (let index = 1; index <= fromIterationCount; index++) {
      console.log(`processing…… ${index}/${fromIterationCount}`)
      await selectCellAndChange(targetFromIterations)
    }
  }

  console.log('DONE! Landing!')

  //------------------------------------------------------------------
  /**
   * @description flight locator
   */
  async function getTargetElement(page: Page) {
    const iterationCells = page.locator(iterationCellsSelector)
    // waiting……first rendered.
    await iterationCells.count()

    const targetFromIterations = await iterationCells.getByText(fromIteration)
    const fromIterationCount = await targetFromIterations.count()

    return {
      targetFromIterations,
      fromIterationCount,
    }
  }

  /**
   * @description mission executor
   */
  async function selectCellAndChange(targetCells: Locator) {
    const targetCell = await targetCells.nth(0)

    await targetCell.click()
    await targetCell.press('Enter')

    const dropdownOption = page.locator('[data-test-id*="TableCellEditor"]')
    await dropdownOption.waitFor()
    await dropdownOption.getByText(nextIteration).click()
  }
}
