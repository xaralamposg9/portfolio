/* Dev-only helper: screenshot the local site for visual QA.
   Usage: node scripts/shot.mjs <url> <outName> [width] [full]
   e.g.   node scripts/shot.mjs http://localhost:3000 home 1440 full */
import puppeteer from 'puppeteer'
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const [
  ,
  ,
  url = 'http://localhost:3000',
  name = 'shot',
  width = '1440',
  full = '',
  selector = '',
] = process.argv

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find((p) => existsSync(p))

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars'],
  defaultViewport: { width: Number(width), height: 900, deviceScaleFactor: 1.5 },
})
const page = await browser.newPage()
await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 1800)) // let intro animation settle

// For full-page shots, scroll through the page so scroll-triggered reveals
// fire (they use play-once, so they stay visible), then return to top.
if (full === 'full') {
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    const total = document.body.scrollHeight
    for (let y = 0; y <= total; y += 400) {
      window.scrollTo(0, y)
      await sleep(120)
    }
    await sleep(500)
    window.scrollTo(0, 0)
    await sleep(400)
  })
  await new Promise((r) => setTimeout(r, 600))
}

// Focus a specific section (viewport-only capture) after reveals fired.
if (selector) {
  await page.evaluate(async (sel) => {
    const el = document.querySelector(sel)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo(0, y)
    }
    await new Promise((r) => setTimeout(r, 600))
  }, selector)
  await new Promise((r) => setTimeout(r, 500))
}

const out = join(__dirname, '..', 'qa', `${name}.png`)
await page.screenshot({ path: out, fullPage: full === 'full' && !selector })
console.log('saved', out)
await browser.close()
