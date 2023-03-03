import { chromium, Locator, Page } from 'playwright'

export type StatusKey = string

export type FlightContext = {
  url: string
  fromStatus: StatusKey
  nextStatus: StatusKey
}

export const flight = async (flightContext: FlightContext) => {
  const browser = await chromium.launch({
    headless: false,
  })
  const context = await browser.newContext({
    storageState: 'playwright/.auth/user.json',
  })
  const page = await context.newPage()
  // set default count time.
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
  const { url, nextStatus } = flightContext

  await page.goto(url)

  while (true) {
    const { targetFromStatuss, fromStatusCount } = await getTargetElement(page)

    if (!fromStatusCount) {
      console.log(`target that --from= is ${fromStatusCount}!`)
      break
    }

    console.log('targets status count is: ', fromStatusCount)

    for (let index = 1; index <= fromStatusCount; index++) {
      console.log(`processing…… ${index}/${fromStatusCount}`)
      await selectCellAndChange(targetFromStatuss)
    }
  }

  console.log('DONE! Landing!')

  //------------------------------------------------------------------
  /**
   * @description flight locator
   */
  async function getTargetElement(page: Page) {
    const statusCellsSelectorRegExp = /column: Status/

    const statusCells = page.getByTestId(statusCellsSelectorRegExp)
    // waiting……first rendered.
    await statusCells.count()

    const targetFromStatuss = await statusCells.getByRole('button', {
      name: 'Dropdown button',
    })
    const fromStatusCount = await targetFromStatuss.count()

    return {
      targetFromStatuss,
      fromStatusCount,
    }
  }

  /**
   * @description mission executor
   */
  async function selectCellAndChange(targetCells: Locator) {
    const targetCell = await targetCells.nth(0)
    await targetCell.click()

    await page.getByPlaceholder('Filter options').click()
    await page.getByPlaceholder('Filter options').fill(nextStatus)

    const dropdownOption = page.getByTestId('table-cell-editor-row')
    await dropdownOption.count()
    await dropdownOption.getByText(nextStatus).click()
  }
}
