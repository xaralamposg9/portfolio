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

/**
 * The "Selected Projects" with their live URLs (from the CV hyperlinks).
 *
 * Each project carries TWO platform fields used by the Work section:
 *   - platform: human-readable stack shown as a badge on the card.
 *   - stack:    a lowercase group key used by the filter chips
 *               ('wordpress' | 'modx' | 'custom'). Add new keys here as
 *               new platforms are introduced.
 *
 * The 12 maritime-group sites were verified live as WordPress + Elementor
 * (confirmed via each site's <meta name="generator"> tag).
 */
export const PROJECTS = [
  {
    slug: 'fhg',
    name: 'Fameline Holding Group',
    url: 'https://fhg.global/',
    category: 'Corporate · Maritime',
    platform: 'WordPress · Elementor',
    stack: 'wordpress',
    description:
      'Corporate site for the parent maritime group — services, ESG, team, and digital-solutions showcases.',
  },
  {
    slug: 'fameline-ms',
    name: 'Fameline Mission Solutions',
    url: 'https://fameline-ms.global/',
    category: 'Government & Defence',
    platform: 'WordPress · Elementor',
    stack: 'wordpress',
    description:
      'Mission-support site with animated stats, service lines, and a global-presence map.',
  },
  {
    slug: 'onenet',
    name: 'OneNet Group',
    url: 'https://onenet.group/',
    category: 'IT & Connectivity',
    platform: 'WordPress · Elementor',
    stack: 'wordpress',
    description:
      'Maritime IT, connectivity & cybersecurity site with interactive platform diagrams and partner showcase.',
  },
  {
    slug: 'mie',
    name: 'MIE Group',
    url: 'https://miegroup.global/',
    category: 'Marine Equipment',
    platform: 'WordPress · Elementor',
    stack: 'wordpress',
    description:
      'Marine-equipment group site with pop-up company profiles and a news/publications hub.',
  },
  {
    slug: 'navichem',
    name: 'Navichem',
    url: 'https://navi-chem.com/',
    category: 'Marine Chemicals',
    platform: 'WordPress · Elementor',
    stack: 'wordpress',
    description:
      'Marine water-treatment chemicals brand site — products, news, and careers.',
  },
  {
    slug: 'volvelle',
    name: 'Volvelle',
    url: 'https://volvelle.eu/',
    category: 'Supply-Tech',
    platform: 'WordPress · Elementor',
    stack: 'wordpress',
    description:
      'Maritime supply-tech site with app mockups and animated impact counters.',
  },
  {
    slug: 'globalstss',
    name: 'Global STSS',
    url: 'https://globalstss.com/',
    category: 'Sealing Solutions',
    platform: 'WordPress · Elementor',
    stack: 'wordpress',
    description: 'Stern-tube sealing solutions holding-group site.',
  },
  {
    slug: 'euploia',
    name: 'Euploia Partners',
    url: 'https://euploiapartners.com/',
    category: 'Private Equity',
    platform: 'WordPress · Elementor',
    stack: 'wordpress',
    description:
      'Private-equity firm site with a video hero, portfolio, and group sections.',
  },
  {
    slug: 'eliteblue',
    name: 'Elite Blue Group',
    url: 'https://eliteblue.global/',
    category: 'Spare Parts',
    platform: 'WordPress · Elementor',
    stack: 'wordpress',
    description: 'Maritime stock-keeping & spare-parts group site.',
  },
  {
    slug: 'bwss',
    name: 'BWSS',
    url: 'https://bwss.global/',
    category: 'Ballast-Water',
    platform: 'WordPress · Elementor',
    stack: 'wordpress',
    description: 'Ballast-water treatment support site with a video hero and news.',
  },
  {
    slug: 'northtide',
    name: 'NorthTide',
    url: 'https://northtide.global/',
    category: 'Underwater Services',
    platform: 'WordPress · Elementor',
    stack: 'wordpress',
    description: 'Underwater-services site with a global ports map and team profiles.',
  },
  {
    slug: 'kozy',
    name: 'Kozy Developers',
    url: 'https://kozy.cy/',
    category: 'Real Estate',
    platform: 'WordPress · Elementor',
    stack: 'wordpress',
    description:
      'Residential real-estate developer site — property features and project gallery.',
  },

  /* ---- MODX sites (verified live: all run MODX + the ConsentFriend extra,
     with no WordPress footprint). A few categories are left blank pending
     confirmation. ---- */
  {
    slug: 'fameline-energy',
    name: 'Fameline Energy',
    url: 'https://fameline-energy.com/',
    category: 'Energy',
    platform: 'MODX',
    stack: 'modx',
  },
  {
    slug: 'herimeheri',
    name: 'Heri Me Heri',
    url: 'https://herimeheri.com/',
    category: '',
    platform: 'MODX',
    stack: 'modx',
  },
  {
    slug: 'mieservices',
    name: 'MIE Services',
    url: 'https://mieservices.global/',
    category: 'Marine Services',
    platform: 'MODX',
    stack: 'modx',
  },
  {
    slug: 'mieoverseas',
    name: 'MIE Overseas',
    url: 'https://mieoverseas.global/',
    category: 'Marine Trading',
    platform: 'MODX',
    stack: 'modx',
  },
  {
    slug: 'sheerline',
    name: 'Sheerline',
    url: 'https://sheerline.global/',
    category: '',
    platform: 'MODX',
    stack: 'modx',
  },
  {
    slug: 'hss-marinesafety',
    name: 'HSS Marine Safety Services',
    url: 'https://hss-marinesafety.global/',
    category: 'Marine Safety',
    platform: 'MODX',
    stack: 'modx',
  },
  {
    slug: 'vesselmarine',
    name: 'Vessel Marine Services',
    url: 'https://vesselmarine.global/',
    category: 'Marine Services',
    platform: 'MODX',
    stack: 'modx',
  },
  {
    slug: 'ems-spares',
    name: 'EMS',
    url: 'https://ems-spares.de/',
    category: 'Marine Spares',
    platform: 'MODX',
    stack: 'modx',
  },
  {
    slug: 'tmservices',
    name: 'Triangle Marine Services',
    url: 'https://tmservices.eu/',
    category: 'Marine Services',
    platform: 'MODX',
    stack: 'modx',
  },
  {
    slug: 'medisera',
    name: 'Medisera Limited',
    url: 'https://medisera.eu/',
    category: '',
    platform: 'MODX',
    stack: 'modx',
  },
  {
    slug: 'euploia-drydocks',
    name: 'Euploia Drydocks & Services',
    url: 'https://euploia.eu/',
    category: 'Drydocks & Repair',
    platform: 'MODX',
    stack: 'modx',
  },
  {
    slug: 'riomar',
    name: 'Riomar Services',
    url: 'https://riomar.global/',
    category: 'Marine Services',
    platform: 'MODX',
    stack: 'modx',
  },
  {
    slug: 'armonia',
    name: 'Armonia Trading & Commercial Applications',
    url: 'https://armonia.cy/',
    category: 'Trading',
    platform: 'MODX',
    stack: 'modx',
  },
]
