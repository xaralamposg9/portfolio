/**
 * Captures a clean screenshot of each of the 12 live project sites and
 * saves them to public/projects/<slug>.jpg so the portfolio can show a
 * real thumbnail for every card.
 *
 * Uses the system Chrome (no bundled Chromium download needed).
 * Run with:  npm run shots
 */
import puppeteer from 'puppeteer'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { mkdir } from 'node:fs/promises'
import { PROJECTS, PROFILE } from '../src/data.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'public', 'projects')

// Common locations for system Chrome / Edge on Windows.
const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
]

async function findChrome() {
  const { existsSync } = await import('node:fs')
  return CHROME_CANDIDATES.find((p) => existsSync(p))
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true })

  const executablePath = await findChrome()
  if (!executablePath) {
    console.error('No system Chrome/Edge found. Update CHROME_CANDIDATES.')
    process.exit(1)
  }
  console.log('Using browser:', executablePath)

  const browser = await puppeteer.launch({
    executablePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars'],
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1.5 },
  })

  for (const project of PROJECTS) {
    const page = await browser.newPage()
    const out = join(OUT_DIR, `${project.slug}.jpg`)
    try {
      console.log(`→ ${project.name}  (${project.url})`)
      await page.goto(project.url, {
        waitUntil: 'networkidle2',
        timeout: 45000,
      })
      // Give lazy hero images / fonts a moment to settle.
      await new Promise((r) => setTimeout(r, 2500))
      // Dismiss obvious cookie banners that block the hero, if present.
      await page
        .evaluate(() => {
          const sels = [
            '[id*="cookie" i] button',
            '[class*="cookie" i] button',
            'button[aria-label*="accept" i]',
          ]
          for (const s of sels) {
            const el = document.querySelector(s)
            if (el) {
              el.click()
              break
            }
          }
        })
        .catch(() => {})
      await new Promise((r) => setTimeout(r, 600))
      await page.screenshot({
        path: out,
        type: 'jpeg',
        quality: 82,
        clip: { x: 0, y: 0, width: 1440, height: 900 },
      })
      console.log(`  ✓ saved ${project.slug}.jpg`)
    } catch (err) {
      console.warn(`  ✗ failed: ${err.message} — card will use styled fallback`)
    } finally {
      await page.close()
    }
  }

  // Best-effort: try to grab the LinkedIn public OG image for a headshot.
  // LinkedIn usually gates this; failure is fine — a styled slot is used.
  try {
    const page = await browser.newPage()
    await page.goto(PROFILE.linkedin, { waitUntil: 'networkidle2', timeout: 30000 })
    const og = await page.evaluate(
      () => document.querySelector('meta[property="og:image"]')?.content || null
    )
    console.log('LinkedIn og:image:', og || '(not accessible — using fallback)')
    await page.close()
  } catch {
    console.log('LinkedIn headshot not accessible — using styled fallback.')
  }

  await browser.close()
  console.log('Done.')
}

run()
