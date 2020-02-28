const puppeteer = require('puppeteer')

let browser
let page

beforeEach(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
  await page.goto('https://the-internet.herokuapp.com')
  await page.click('a[href="/login"]')
})

afterEach(async () => {
  await browser.close()
})

test('Page has correct title', async () => {
  const title = await page.title()

  expect(title).toBe('The Internet')
})

test('Heading has correct text', async () => {
  const heading = await page.$eval('h2', h2 => h2.textContent)
  expect(heading).toBe('Login Page')
})

test('Blank username and password displays error message', async () => {
  await page.click('button')

  const message = await page.$eval('#flash', div => div.textContent)

  expect(message).toMatch(/Your username is invalid!/)
})

test('Login', async () => {
  await page.type('#username', 'tomsmith')
  await page.type('#password', 'SuperSecretPassword!')
  await page.click('button')

  const message = await page.$eval('#flash', div => div.textContent)

  expect(message).toMatch(/You logged into a secure area!/)
})

test('Footer text is correct', async () => {
  const footer = await page.$eval('#page-footer', div => div.textContent)
  expect(footer).toMatch(/Powered by Elemental Selenium/)
})

test('Footer link is correct', async () => {
  const link = await page.$eval('div[id="page-footer"] a', a => a.href)
  expect(link).toBe('http://elementalselenium.com/')
})
