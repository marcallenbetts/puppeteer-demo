const puppeteer = require('puppeteer')

let browser
let page

beforeEach(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
  await page.goto('https://the-internet.herokuapp.com')
  await page.click('a[href="/status_codes"]')
})

afterEach(async () => {
  await browser.close()
})

test('Page has correct title', async () => {
  const title = await page.title()

  expect(title).toBe('The Internet')
})

test('Heading has correct text', async () => {
  const heading = await page.$eval('h3', h3 => h3.textContent)
  expect(heading).toBe('Status Codes')
})

test('200 link returns status code 200', async () => {
  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click('a[href="status_codes/200"]')
  ])

  expect(response._status).toBe(200)
})

test('301 link returns status code 301', async () => {
  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click('a[href="status_codes/301"]')
  ])

  expect(response._status).toBe(301)
})

test('404 link returns status code 404', async () => {
  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click('a[href="status_codes/404"]')
  ])

  expect(response._status).toBe(404)
})

test('500 link returns status code 500', async () => {
  const [response] = await Promise.all([
    page.waitForNavigation(),
    page.click('a[href="status_codes/500"]')
  ])

  expect(response._status).toBe(500)
})

test('Footer text is correct', async () => {
  const footer = await page.$eval('#page-footer', div => div.textContent)
  expect(footer).toMatch(/Powered by Elemental Selenium/)
})

test('Footer link is correct', async () => {
  const link = await page.$eval('div[id="page-footer"] a', a => a.href)
  expect(link).toBe('http://elementalselenium.com/')
})
