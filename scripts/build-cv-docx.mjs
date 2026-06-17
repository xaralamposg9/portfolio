/* Builds an editable Word CV (public/Charalampos-Photiou-CV.docx) with the
   same content as cv/cv.html. Open it in Word to edit by hand any time.
   Run with:  npm run cv:docx                                            */
import {
  Document, Packer, Paragraph, TextRun, ExternalHyperlink,
  AlignmentType, BorderStyle, TabStopType, TabStopPosition,
} from 'docx'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'Charalampos-Photiou-CV.docx')

const INK = '11161F'
const MUTED = '5B6573'
const ACCENT = '1F63D6'
const BODY = '2B313B'

// ---- small builders -------------------------------------------------------
const sectionTitle = (text) =>
  new Paragraph({
    spacing: { before: 260, after: 90 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'D9DEE6', space: 4 } },
    children: [new TextRun({ text: text.toUpperCase(), bold: true, color: ACCENT, size: 18 })],
  })

// role on the left, date right-aligned via a right tab stop
const jobHead = (role, date) =>
  new Paragraph({
    spacing: { before: 120, after: 0 },
    tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
    children: [
      new TextRun({ text: role, bold: true, size: 21, color: INK }),
      new TextRun({ text: `\t${date}`, size: 17, color: MUTED }),
    ],
  })

const org = (text) =>
  new Paragraph({
    spacing: { after: 40 },
    children: [new TextRun({ text, size: 18, color: ACCENT, italics: true })],
  })

const bullet = (text) =>
  new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 30 },
    children: [new TextRun({ text, size: 19, color: BODY })],
  })

const body = (runs, opts = {}) =>
  new Paragraph({ spacing: { after: 60, ...opts.spacing }, children: runs })

const t = (text, o = {}) => new TextRun({ text, size: 19, color: BODY, ...o })

// ---- document -------------------------------------------------------------
const doc = new Document({
  styles: { default: { document: { run: { font: 'Calibri' } } } },
  sections: [{
    properties: { page: { margin: { top: 720, bottom: 720, left: 850, right: 850 } } },
    children: [
      // Header
      new Paragraph({
        spacing: { after: 0 },
        children: [new TextRun({ text: 'Charalampos Photiou', bold: true, size: 48, color: INK })],
      }),
      new Paragraph({
        spacing: { after: 60 },
        children: [new TextRun({ text: 'Web Developer & Digital Marketing Executive', bold: true, size: 24, color: ACCENT })],
      }),
      new Paragraph({
        spacing: { after: 40 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: INK, space: 6 } },
        children: [
          new TextRun({ text: 'Limassol, Cyprus  •  +357 96 425378  •  ', size: 17, color: MUTED }),
          new ExternalHyperlink({ link: 'mailto:charfotiou@gmail.com', children: [new TextRun({ text: 'charfotiou@gmail.com', size: 17, color: MUTED })] }),
          new TextRun({ text: '  •  ', size: 17, color: MUTED }),
          new ExternalHyperlink({ link: 'https://www.linkedin.com/in/charalampos-fotiou-63120a286/', children: [new TextRun({ text: 'LinkedIn', size: 17, color: MUTED })] }),
          new TextRun({ text: '  •  ', size: 17, color: MUTED }),
          new ExternalHyperlink({ link: 'https://xaralamposg9.github.io/portfolio/', children: [new TextRun({ text: 'Portfolio', size: 17, color: MUTED })] }),
        ],
      }),

      // Summary
      sectionTitle('Professional Summary'),
      body([t('Web developer and digital marketing executive with 3+ years at Fameline Holding Group, pairing hands-on web development with full-funnel marketing. Manages a portfolio of 50+ live websites and has designed and built 30+ sites across three stacks — WordPress (Elementor Pro, WPBakery, Divi), MODX Revolution, and custom sites hand-coded in VS Code with Git/GitHub and AI-assisted workflows. Runs paid media on Google Ads (Search to Performance Max), email marketing in Mailchimp and Brevo, SEO, and social — backed by Google and AI certifications.')]),

      // Experience
      sectionTitle('Experience'),
      jobHead('Digital Marketing Executive', 'Jan 2025 – Present'),
      org('Fameline Holding Group · Limassol, Cyprus'),
      bullet('Design, build, and maintain WordPress sites (Elementor Pro, WPBakery & other builders) and develop custom sites in VS Code with Git/GitHub and AI-assisted coding (e.g. Claude Code).'),
      bullet('Manage a portfolio of 50+ live websites — updates, performance, uptime, and security across the group’s brands.'),
      bullet('Plan and run paid campaigns on Google Ads (Search, Display, Video, Demand Gen & Performance Max), Meta & LinkedIn — 440K+ impressions and 16K+ clicks/engagements at a 3.6% average interaction rate.'),
      bullet('Schedule the group’s social media and build & send email campaigns in Mailchimp and Brevo.'),
      bullet('Grew the company’s LinkedIn audience from ~1,000 to 7,500+ targeted maritime-industry followers.'),
      bullet('Help run the group’s flagship events (East Med Marine & Offshore Exhibition, Fameline Offshore Sailing Regatta) and CSR campaigns (Movember, World Cancer Day); organise the internal table-football charity tournament.'),
      bullet('Set up tracking & analytics with Google Tag Manager and Google Analytics.'),

      jobHead('Junior Digital Marketing Officer', 'Sep 2023 – Feb 2025'),
      org('Fameline Holding Group · Limassol, Cyprus'),
      bullet('Built and updated WordPress websites and landing pages for the group’s brands.'),
      bullet('Created graphics and scheduled social media posts to support marketing campaigns.'),
      bullet('Helped with the group’s events and awareness campaigns — scheduling social posts and sending email campaigns.'),

      jobHead('Multimedia Graphic Designer (Internship)', 'Sep 2022 – Dec 2022'),
      org('MindLab · Limassol, Cyprus'),
      bullet('Developed dynamic WordPress websites end to end, from concept to launch.'),
      bullet('Curated and grew the company’s social media channels, boosting visibility and engagement.'),
      bullet('Created content and campaigns that contributed to increased sales; captured product photography.'),

      // Selected work
      sectionTitle('Selected Work'),
      body([
        new TextRun({ text: '12 · WordPress + Elementor     13 · MODX Revolution     6 · Custom-coded (VS Code)', bold: true, size: 19, color: ACCENT }),
      ]),
      body([
        new TextRun({ text: '30+ live corporate websites', bold: true, size: 19, color: BODY }),
        t(' designed and built for the Fameline Holding Group brands and beyond, including Fameline Holding Group, Fameline Mission Solutions, OneNet Group, MIE Group, Euploia Partners, NorthTide and Kozy Developers (WordPress); Fameline Energy, Sheerline, HSS Marine Safety and Euploia Drydocks (MODX); and the hand-coded Albaflux, Seaflux and Cargo Logistics brands (custom). Full list with live links on the portfolio.'),
      ]),

      // Education & certs
      sectionTitle('Education & Certifications'),
      body([
        new TextRun({ text: 'BSc in Multimedia & Graphic Arts (Specialization in Multimedia)', bold: true, size: 19, color: INK }),
        new TextRun({ text: '  — Cyprus University of Technology · Sep 2019 – Mar 2023', size: 18, color: MUTED }),
      ], { spacing: { after: 80 } }),
      bullet('Artificial Intelligence for Business Executives — Apriori Management Training Ltd (Oct 2024)'),
      bullet('Fundamentals of Digital Marketing — Google (Jun 2024)'),
      bullet('Google My Business — Google (Jun 2024)'),
      bullet('YouTube Music Assessment — Google (Jun 2024, valid to Dec 2025)'),
      bullet('21st Advertising, Marketing, Media & Communication Conference — Certificate of Attendance (Jun 2024)'),
      bullet('IGCSE English as a Second Language, Grade C — University of Cambridge'),

      // Skills
      sectionTitle('Skills'),
      body([new TextRun({ text: 'Web Development: ', bold: true, size: 19, color: INK }), t('WordPress (Elementor Pro, WPBakery, Divi), MODX Revolution, WooCommerce, HTML/CSS, JavaScript, responsive / mobile-first, page-speed optimization, Git & GitHub, VS Code, AI-assisted coding, website maintenance, cPanel / DNS.')]),
      body([new TextRun({ text: 'Marketing & SEO: ', bold: true, size: 19, color: INK }), t('Technical & on-page SEO, Google Ads, Meta & LinkedIn Ads, paid social, social media management & scheduling, email marketing (Mailchimp, Brevo), campaign management, Google Tag Manager & Analytics, Google Business / local SEO, YouTube, audience growth.')]),
      body([new TextRun({ text: 'Design & Video: ', bold: true, size: 19, color: INK }), t('Photoshop, Illustrator, Premiere Pro, After Effects, DaVinci Resolve, Figma, Adobe XD, logo design, typography, video editing, product photography.')]),
      body([new TextRun({ text: 'AI & Tools: ', bold: true, size: 19, color: INK }), t('AI strategy & integration, data-driven decisions, business intelligence; ChatGPT, Google Gemini, Claude (Code & Cowork).')]),

      // Volunteering / Languages / Interests
      sectionTitle('Volunteering, Languages & Interests'),
      body([new TextRun({ text: 'Volunteering: ', bold: true, size: 19, color: INK }), t('YoungShip Cyprus — active volunteer supporting networking & industry events for the local maritime community.')]),
      body([new TextRun({ text: 'Languages: ', bold: true, size: 19, color: INK }), t('Greek (native) · English — IGCSE, University of Cambridge.')]),
      body([new TextRun({ text: 'Interests: ', bold: true, size: 19, color: INK }), t('Playing bouzouki · Photography · PC gaming.')]),
    ],
  }],
})

const buffer = await Packer.toBuffer(doc)
await writeFile(OUT, buffer)
console.log('saved', OUT)
