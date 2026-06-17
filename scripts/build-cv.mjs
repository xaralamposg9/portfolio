/* Renders cv/cv.html to public/Charalampos-Photiou-CV.pdf using system Chrome.
   Run with:  npm run cv
   Re-run any time you edit cv/cv.html so the downloadable PDF stays in sync. */
import puppeteer from 'puppeteer'
import { existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = join(__dirname, '..', 'cv', 'cv.html')
const OUT = join(__dirname, '..', 'public', 'Charalampos-Photiou-CV.pdf')

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
].find((p) => existsSync(p))

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()
// Load from a file:// URL so the Google Fonts <link> resolves over the network.
await page.goto(pathToFileURL(SRC).href, { waitUntil: 'networkidle0', timeout: 30000 })
// Give the web fonts a beat to finish painting.
await new Promise((r) => setTimeout(r, 800))

await page.pdf({
  path: OUT,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
})

await browser.close()
console.log('saved', OUT)
