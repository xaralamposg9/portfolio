/* Renders cv/cv.html to public/Charalampos-Photiou-CV.pdf using system Chrome.
   Run with:  npm run cv
   Re-run any time you edit cv/cv.html so the downloadable PDF stays in sync. */
import puppeteer from 'puppeteer'
import { existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = join(__dirname, '..', 'cv', 'cv.html')
const OUT = join(__dirname, '..', 'assets', 'Charalampos-Photiou-CV.pdf')

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

const hf = 'font-family:Arial,sans-serif;font-size:8px;color:#9aa8b8;width:100%;padding:0 12mm;'
await page.pdf({
  path: OUT,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: true,
  margin: { top: '15mm', bottom: '13mm', left: '0', right: '0' },
  headerTemplate: `<div style="${hf}">Charalampos Photiou — Web Developer &amp; Digital Marketing Executive</div>`,
  footerTemplate: `<div style="${hf}text-align:right;">Page <span class="pageNumber"></span> / <span class="totalPages"></span></div>`,
})

await browser.close()
console.log('saved', OUT)
