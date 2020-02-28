const puppeteer = require('puppeteer')

let browser
let page

beforeEach(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
  await page.goto('https://the-internet.herokuapp.com')
})

afterEach(async () => {
  await browser.close()
})

test('Page title', async () => {
  const title = await page.title()
  expect(title).toBe('The Internet')
})

test('Page heading 1 text is correct', async () => {
  const heading = await page.$eval('h1', h1 => h1.textContent)
  expect(heading).toBe('Welcome to the-internet')
})

test('Page heading 2 text is correct', async () => {
  const heading = await page.$eval('h2', h2 => h2.textContent)
  expect(heading).toBe('Available Examples')
})

test('Footer text is correct', async () => {
  const footer = await page.$eval('#page-footer', div => div.textContent)
  expect(footer).toMatch(/Powered by Elemental Selenium/)
})

test('Footer link is correct', async () => {
  const link = await page.$eval('div[id="page-footer"] a', a => a.href)
  expect(link).toBe('http://elementalselenium.com/')
})
