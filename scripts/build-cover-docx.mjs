/* Builds the editable Word cover letter (assets/Charalampos-Photiou-Cover-Letter.docx).
   This is the everyday copy: open in Word, replace [PLACEHOLDERS], save-as per job.
   Run with:  npm run cover:docx */
import {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink, BorderStyle,
} from 'docx'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets', 'Charalampos-Photiou-Cover-Letter.docx')

const INK = '11161F'
const MUTED = '5B6573'
const ACCENT = '1F63D6'
const BODY = '2B313B'

const t = (text, o = {}) => new TextRun({ text, size: 21, color: BODY, ...o })
// placeholders render highlighted so none get missed before sending
const ph = (text) => new TextRun({ text, size: 21, color: BODY, highlight: 'yellow' })
const para = (children, opts = {}) => new Paragraph({ spacing: { after: 160 }, ...opts, children })

const doc = new Document({
  styles: { default: { document: { run: { font: 'Calibri' } } } },
  sections: [{
    properties: { page: { margin: { top: 850, bottom: 850, left: 1000, right: 1000 } } },
    children: [
      new Paragraph({
        spacing: { after: 0 },
        children: [new TextRun({ text: 'Charalampos Photiou', bold: true, size: 40, color: INK })],
      }),
      new Paragraph({
        spacing: { after: 60 },
        children: [new TextRun({ text: 'Digital Marketing Executive · Web Development & Paid Media', bold: true, size: 22, color: ACCENT })],
      }),
      new Paragraph({
        spacing: { after: 240 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: INK, space: 6 } },
        children: [
          new TextRun({ text: 'Limassol, Cyprus  •  +357 96 425378  •  ', size: 17, color: MUTED }),
          new ExternalHyperlink({ link: 'mailto:charfotiou@gmail.com', children: [new TextRun({ text: 'charfotiou@gmail.com', size: 17, color: MUTED })] }),
          new TextRun({ text: '  •  ', size: 17, color: MUTED }),
          new ExternalHyperlink({ link: 'https://xaralamposg9.github.io/portfolio/', children: [new TextRun({ text: 'xaralamposg9.github.io/portfolio', size: 17, color: MUTED })] }),
        ],
      }),

      para([ph('[Date]')], { spacing: { after: 60 } }),
      para([ph('[Hiring Manager’s name — or “Hiring Team”]')], { spacing: { after: 20 } }),
      para([ph('[Company name]')], { spacing: { after: 20 } }),
      para([ph('[Company address or city]')], { spacing: { after: 240 } }),

      para([new TextRun({ text: 'Re: Application for ', bold: true, size: 21, color: INK }), ph('[Job title]')]),
      para([t('Dear '), ph('[Mr/Ms Surname — or “Hiring Team”]'), t(',')]),

      para([
        t('I am writing to apply for the '), ph('[Job title]'), t(' role at '), ph('[Company]'),
        t(', which I saw on '), ph('[where you found it]'),
        t('. I am a web developer and digital marketing executive at Fameline Holding Group, where since 2023 I have run the full stack of digital for a group of maritime and trading brands — from hand-coding production websites to running the campaigns that drive traffic to them.'),
      ]),

      para([
        t('Today I manage a portfolio of 50+ live web properties: I have shipped six fully hand-coded corporate sites (no CMS) using AI-assisted development workflows, built and maintained WordPress sites that score 90+ on mobile Lighthouse, and run email marketing to B2B lists of 8,000+ contacts with top campaigns reaching ~50% open rates. I also grew the group’s LinkedIn from ~1,000 to 7,500+ targeted industry followers. The full portfolio, with live links to every site, is at xaralamposg9.github.io/portfolio.'),
      ]),

      para([
        ph('[One or two sentences about WHY THIS COMPANY — mention something specific: their product, a site of theirs you admire, their market. This sentence shows the letter is not a template.]'),
        t(' I believe the combination of hands-on development and full-funnel marketing is exactly what lets one person own a website end to end — build it, rank it, and grow its audience.'),
      ]),

      para([
        t('I would welcome the chance to discuss how I can contribute to '), ph('[Company]'),
        t('. I am available for an interview at your convenience and can be reached at +357 96 425378 or charfotiou@gmail.com.'),
      ]),

      para([t('Thank you for your time and consideration.')], { spacing: { after: 240 } }),

      para([t('Kind regards,')], { spacing: { after: 20 } }),
      para([new TextRun({ text: 'Charalampos Photiou', bold: true, size: 21, color: INK })], { spacing: { after: 0 } }),
    ],
  }],
})

const buffer = await Packer.toBuffer(doc)
await writeFile(OUT, buffer)
console.log('saved', OUT)
