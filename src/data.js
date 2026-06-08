/**
 * Single source of truth for portfolio content (pulled from the CV).
 * Kept here so the screenshot script and any future build steps can
 * reuse the exact same project list / URLs as the HTML.
 *
 * NOTE: The visible page content lives in index.html as semantic markup
 * (best for SEO + Lighthouse). This file mainly powers the screenshot
 * tooling and documents the canonical data in one place.
 */

export const PROFILE = {
  name: 'Charalampos Photiou',
  title: 'Web Developer & Digital Marketing Executive',
  location: 'Limassol, Cyprus',
  email: 'charfotiou@gmail.com',
  phone: '+357 96425378',
  linkedin: 'https://www.linkedin.com/in/charalampos-fotiou-63120a286/',
}

/** The 12 "Selected Projects" with their live URLs (from the CV hyperlinks). */
export const PROJECTS = [
  {
    slug: 'fhg',
    name: 'Fameline Holding Group',
    url: 'https://fhg.global/',
    category: 'Corporate · Maritime',
    description:
      'Corporate site for the parent maritime group — services, ESG, team, and digital-solutions showcases.',
  },
  {
    slug: 'fameline-ms',
    name: 'Fameline Mission Solutions',
    url: 'https://fameline-ms.global/',
    category: 'Government & Defence',
    description:
      'Mission-support site with animated stats, service lines, and a global-presence map.',
  },
  {
    slug: 'onenet',
    name: 'OneNet Group',
    url: 'https://onenet.group/',
    category: 'IT & Connectivity',
    description:
      'Maritime IT, connectivity & cybersecurity site with interactive platform diagrams and partner showcase.',
  },
  {
    slug: 'mie',
    name: 'MIE Group',
    url: 'https://miegroup.global/',
    category: 'Marine Equipment',
    description:
      'Marine-equipment group site with pop-up company profiles and a news/publications hub.',
  },
  {
    slug: 'navichem',
    name: 'Navichem',
    url: 'https://navi-chem.com/',
    category: 'Marine Chemicals',
    description:
      'Marine water-treatment chemicals brand site — products, news, and careers.',
  },
  {
    slug: 'volvelle',
    name: 'Volvelle',
    url: 'https://volvelle.eu/',
    category: 'Supply-Tech',
    description:
      'Maritime supply-tech site with app mockups and animated impact counters.',
  },
  {
    slug: 'globalstss',
    name: 'Global STSS',
    url: 'https://globalstss.com/',
    category: 'Sealing Solutions',
    description: 'Stern-tube sealing solutions holding-group site.',
  },
  {
    slug: 'euploia',
    name: 'Euploia Partners',
    url: 'https://euploiapartners.com/',
    category: 'Private Equity',
    description:
      'Private-equity firm site with a video hero, portfolio, and group sections.',
  },
  {
    slug: 'eliteblue',
    name: 'Elite Blue Group',
    url: 'https://eliteblue.global/',
    category: 'Spare Parts',
    description: 'Maritime stock-keeping & spare-parts group site.',
  },
  {
    slug: 'bwss',
    name: 'BWSS',
    url: 'https://bwss.global/',
    category: 'Ballast-Water',
    description: 'Ballast-water treatment support site with a video hero and news.',
  },
  {
    slug: 'northtide',
    name: 'NorthTide',
    url: 'https://northtide.global/',
    category: 'Underwater Services',
    description: 'Underwater-services site with a global ports map and team profiles.',
  },
  {
    slug: 'kozy',
    name: 'Kozy Developers',
    url: 'https://kozy.cy/',
    category: 'Real Estate',
    description:
      'Residential real-estate developer site — property features and project gallery.',
  },
]
