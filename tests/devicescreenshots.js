const puppeteer = require('puppeteer')

const siteUrl = ''

;(siteUrl.length === 0 ? test.skip : test)(
  'Generate screenshots for all devices',
  async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const devices = await puppeteer.devices

    for (let device of devices) {
      await page.emulate(device)
      await page.goto(siteUrl)
      await page.screenshot({ path: `./images/${device.name}.png` })
    }

    await browser.close()
  }
)
