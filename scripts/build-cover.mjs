/* Renders cv/cover-letter.html to assets/Charalampos-Photiou-Cover-Letter.pdf.
   Run with:  npm run cover   (after replacing the [PLACEHOLDERS]) */
import puppeteer from 'puppeteer'
import { existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SRC = join(__dirname, '..', 'cv', 'cover-letter.html')
const OUT = join(__dirname, '..', 'assets', 'Charalampos-Photiou-Cover-Letter.pdf')

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
await page.goto(pathToFileURL(SRC).href, { waitUntil: 'networkidle0', timeout: 30000 })
await new Promise((r) => setTimeout(r, 800))

await page.pdf({
  path: OUT,
  format: 'A4',
  printBackground: true,
  margin: { top: '14mm', bottom: '14mm', left: '0', right: '0' },
})

await browser.close()
console.log('saved', OUT)
