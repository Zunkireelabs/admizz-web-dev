'use client';
import { useEffect } from 'react';

const UNIVERSITIES: Record<string, { name: string; logo: string }[]> = {
  UK: [
    { name: 'Buckinghamshire New University', logo: 'https://admizzeducation.com/images/universities/uk/Buckinghamshire-New-University.jpg' },
    { name: 'BPP University', logo: 'https://admizzeducation.com/images/universities/uk/BPP-University.jpg' },
    { name: 'Coventry University', logo: 'https://admizzeducation.com/images/universities/uk/Coventry-University.jpg' },
    { name: 'Health Sciences University', logo: 'https://admizzeducation.com/images/universities/uk/Health-Sciences-University.jpg' },
    { name: 'Ravensbourne University London', logo: 'https://admizzeducation.com/images/universities/uk/Ravensbourne-University-London.jpg' },
    { name: 'University of Sunderland', logo: 'https://admizzeducation.com/images/universities/uk/University-of-Sunderland.jpg' },
    { name: 'University of East London', logo: 'https://admizzeducation.com/images/universities/uk/University-of-East-London.jpg' },
    { name: 'Ulster University', logo: 'https://admizzeducation.com/images/universities/uk/Ulster-University.jpg' },
    { name: 'University of Greenwich', logo: 'https://admizzeducation.com/images/universities/uk/University-of-Greenwich.jpg' },
    { name: 'The University of Law', logo: 'https://admizzeducation.com/images/universities/uk/The-University-of-Law.jpg' },
    { name: 'University of Roehampton', logo: 'https://admizzeducation.com/images/universities/uk/University-of-Roehampton.jpg' },
    { name: 'University of Worcester', logo: 'https://admizzeducation.com/images/universities/uk/University-of-Worcester.jpg' },
    { name: 'University of West London', logo: 'https://admizzeducation.com/images/universities/uk/University-of-West-London.jpg' },
    { name: 'University of the West of Scotland', logo: 'https://admizzeducation.com/images/universities/uk/University-of-the-West-of-Scotland.jpg' },
    { name: 'York St John University', logo: 'https://admizzeducation.com/images/universities/uk/York-St-John-University.jpg' },
  ],
  USA: [
    { name: 'Colorado State University', logo: 'https://admizzeducation.com/images/universities/usa/COLORADO.jpeg' },
    { name: 'Webster University', logo: 'https://admizzeducation.com/images/universities/usa/webster-1.jpeg' },
    { name: 'Avila University', logo: 'https://admizzeducation.com/images/universities/usa/AVILA.jpeg' },
    { name: 'Concordia University', logo: 'https://admizzeducation.com/images/universities/usa/CONCORDIA.jpeg' },
    { name: 'Southeast Missouri State', logo: 'https://admizzeducation.com/images/universities/usa/SOUTHEAST-MISSOURI.jpeg' },
    { name: 'Herzing University', logo: 'https://admizzeducation.com/images/universities/usa/HERZING.jpeg' },
    { name: 'Wright State University', logo: 'https://admizzeducation.com/images/universities/usa/WRIGHT-STATE.jpeg' },
    { name: 'Washington University', logo: 'https://admizzeducation.com/images/universities/usa/WASHINGTON.jpeg' },
    { name: 'Texas State University', logo: 'https://admizzeducation.com/images/universities/usa/TEXAS.jpeg' },
    { name: 'Murray State University', logo: 'https://admizzeducation.com/images/universities/usa/MURRAY.jpeg' },
  ],
  Australia: [
    { name: 'Western Sydney University', logo: 'https://admizzeducation.com/images/universities/australia/western-sydney-university.png' },
    { name: 'La Trobe University', logo: 'https://admizzeducation.com/images/universities/australia/la-trobe-university.jpg' },
    { name: 'Victoria University', logo: 'https://admizzeducation.com/images/universities/australia/victoria-university.png' },
    { name: 'University of Queensland', logo: 'https://admizzeducation.com/images/universities/australia/university-of-queensland.png' },
    { name: 'Monash University', logo: 'https://admizzeducation.com/images/universities/australia/monash-university.png' },
    { name: 'RMIT University', logo: 'https://admizzeducation.com/images/universities/australia/rmit-university.png' },
  ],
  Canada: [
    { name: 'University of Toronto', logo: 'https://admizzeducation.com/images/universities/canada/university-of-toronto.png' },
    { name: 'University of British Columbia', logo: 'https://admizzeducation.com/images/universities/canada/university-of-british-columbia.png' },
    { name: 'McGill University', logo: 'https://admizzeducation.com/images/universities/canada/mcgill-university.png' },
    { name: 'McMaster University', logo: 'https://admizzeducation.com/images/universities/canada/mcmaster-university.png' },
    { name: 'University of Waterloo', logo: 'https://admizzeducation.com/images/universities/canada/university-of-waterloo.png' },
  ],
  India: [
    { name: 'VIT', logo: 'https://admizzeducation.com/images/universities/india/vit.jpg' },
    { name: 'University of Delhi', logo: 'https://admizzeducation.com/images/universities/india/university-of-delhi.png' },
    { name: 'JNU', logo: 'https://admizzeducation.com/images/universities/india/jawaharlal-nehru-university.png' },
    { name: 'Anna University', logo: 'https://admizzeducation.com/images/universities/india/anna-university.png' },
    { name: 'IISc Bangalore', logo: 'https://admizzeducation.com/images/universities/india/iisc-bangalore.png' },
  ],
  'New Zealand': [
    { name: 'University of Auckland', logo: 'https://admizzeducation.com/images/universities/newzealand/university-of-auckland.png' },
    { name: 'University of Otago', logo: 'https://admizzeducation.com/images/universities/newzealand/university-of-otago.png' },
    { name: 'Victoria University of Wellington', logo: 'https://admizzeducation.com/images/universities/newzealand/victoria-university-of-wellington.png' },
    { name: 'Massey University', logo: 'https://admizzeducation.com/images/universities/newzealand/massey-university.jpg' },
    { name: 'Lincoln University', logo: 'https://admizzeducation.com/images/universities/newzealand/lincoln-university.png' },
  ],
  Finland: [
    { name: 'Haaga-Helia', logo: 'https://admizzeducation.com/images/universities/finland/haaga-helia.png' },
    { name: 'Lab University', logo: 'https://admizzeducation.com/images/universities/finland/lab-university.png' },
    { name: 'Satakunta University', logo: 'https://admizzeducation.com/images/universities/finland/satakunta-university.png' },
    { name: 'Vaasa University', logo: 'https://admizzeducation.com/images/universities/finland/vaasa-university.png' },
  ],
  Germany: [
    { name: 'TU Munich', logo: 'https://admizzeducation.com/images/universities/germany/technical-university-of-munich.png' },
    { name: 'LMU München', logo: 'https://admizzeducation.com/images/universities/germany/ludwig-maximilians-universitat.png' },
    { name: 'Heidelberg University', logo: 'https://admizzeducation.com/images/universities/germany/heidelberg-university.png' },
    { name: 'RWTH Aachen', logo: 'https://admizzeducation.com/images/universities/germany/rwth-aachen-university.jpg' },
    { name: 'TU Berlin', logo: 'https://admizzeducation.com/images/universities/germany/technische-universitat-berlin.png' },
  ],
  France: [
    { name: 'Sorbonne University', logo: 'https://admizzeducation.com/images/universities/france/sorbonne-university.png' },
    { name: 'Sciences Po', logo: 'https://admizzeducation.com/images/universities/france/sciences-po.png' },
    { name: 'Ecole Polytechnique', logo: 'https://admizzeducation.com/images/universities/france/ecole-polytechnique.png' },
    { name: 'Université de Bordeaux', logo: 'https://admizzeducation.com/images/universities/france/universite-de-bordeaux.png' },
  ],
};

const SECONDS_PER_CARD = 120 / Math.ceil(22 / 2);
const MIN_CARDS_PER_SET = 8;

function buildCards(list: { name: string; logo: string }[]) {
  return list
    .map(u => `<div class="partner-card"><img src="${u.logo}" alt="${u.name}" loading="lazy"><span>${u.name}</span></div>`)
    .join('');
}

function fillRow(row: { name: string; logo: string }[]) {
  if (row.length === 0) return [];
  const repeats = Math.ceil(MIN_CARDS_PER_SET / row.length);
  let set: typeof row = [];
  for (let r = 0; r < repeats; r++) set = set.concat(row);
  return set.concat(set);
}

function renderPartners(country: string) {
  const list = country === 'all'
    ? Object.values(UNIVERSITIES).flat()
    : (UNIVERSITIES[country] || []);
  const half = Math.ceil(list.length / 2);
  const row1 = fillRow(list.slice(0, half));
  const row2 = fillRow(list.slice(half));
  const dur1 = Math.max((row1.length / 2) * SECONDS_PER_CARD, 20);
  const dur2 = Math.max((row2.length / 2) * SECONDS_PER_CARD, 20);
  const el1 = document.getElementById('partnersRow1');
  const el2 = document.getElementById('partnersRow2');
  if (el1) { el1.innerHTML = buildCards(row1); el1.style.animation = `marquee-scroll-right ${dur1}s linear infinite`; }
  if (el2) { el2.innerHTML = buildCards(row2); el2.style.animation = `marquee-scroll-left ${dur2}s linear infinite`; }
}

export default function UKAdmissionsInit() {
  useEffect(() => {
    // Init partners marquee
    renderPartners('UK');
    const btns = document.querySelectorAll<HTMLButtonElement>('.partners-filter-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', function () {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderPartners(btn.getAttribute('data-country') || 'all');
      });
    });

    const scripts: HTMLScriptElement[] = [];
    function loadScript(src: string) {
      const s = document.createElement('script');
      s.src = src;
      s.async = false;
      document.body.appendChild(s);
      scripts.push(s);
    }

    loadScript('/events/js/countdown.js');
    loadScript('/events/js/register-panel.js');
    loadScript('/events/js/event-form.js');
    loadScript('/events/js/spin-wheel-event.js');

    return () => {
      scripts.forEach(s => {
        if (document.body.contains(s)) document.body.removeChild(s);
      });
    };
  }, []);

  return null;
}
