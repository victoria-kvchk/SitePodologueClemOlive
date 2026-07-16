/* =========================================================
   Générateur de la maquette — Clémentine Olive
   Source unique -> pages HTML statiques (en-tête/pied partagés)
   Lancer : node build.mjs
   (Outil de maquette uniquement — le socle final sera choisi
    une fois la maquette validée.)
   ========================================================= */
import { writeFileSync } from 'node:fs';

const TEL_PODO = { txt: '06 52 86 09 96', tel: '+33652860996' };
const TEL_REFLEX = { txt: '06 88 41 93 79', tel: '+33688419379' };

// TODO : remplacer par le vrai lien Doctolib du cabinet
const DOCTOLIB = 'https://www.doctolib.fr/pedicure-podologue/fosses/clementine-olive';

const ADRESSE = { rue: '5 place Denis Papin', cp: '95470', ville: 'Fosses' };
const GEO = { lat: '49.0994058', lng: '2.5233593' };
const MAPS_EMBED = 'https://www.google.fr/maps/embed?pb=!1m18!1m12!1m3!1d1132.3976116027156!2d2.5233593!3d49.0994058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e639a7517a79b9%3A0x2a8a210e8c90f8fb!2sOLIVE%20Cl%C3%A9mentine%20Cabinet%20de%20p%C3%A9dicurie-podologie!5e0!3m2!1sfr!2sfr!4v1694123456789!5m2!1sfr!2sfr';
const MAPS_LINK = 'https://www.google.fr/maps/place/OLIVE+Cl%C3%A9mentine+Cabinet+de+p%C3%A9dicurie-podologie/@49.0994058,2.5233593,17z';

// Horaires du cabinet (consultations sur rendez-vous)
const HORAIRES = [
  { jour: 'Lundi',    creneaux: '09h00 – 12h30  ·  13h00 – 18h30', spec: ['Mo 09:00-12:30', 'Mo 13:00-18:30'] },
  { jour: 'Mardi',    creneaux: '09h30 – 12h30  ·  13h00 – 17h00', spec: ['Tu 09:30-12:30', 'Tu 13:00-17:00'] },
  { jour: 'Mercredi', creneaux: '09h00 – 12h30  ·  13h00 – 18h30', spec: ['We 09:00-12:30', 'We 13:00-18:30'] },
  { jour: 'Jeudi',    creneaux: '09h00 – 12h30  ·  13h00 – 19h00', spec: ['Th 09:00-12:30', 'Th 13:00-19:00'] },
  { jour: 'Vendredi', creneaux: '09h00 – 12h30  ·  13h00 – 18h00', spec: ['Fr 09:00-12:30', 'Fr 13:00-18:00'] },
  { jour: 'Samedi',   creneaux: null },
  { jour: 'Dimanche', creneaux: null },
];

/* ---------------- Données des activités ---------------- */
const pedicurie = {
  slug: 'pedicurie', label: 'Pédicurie', color: 'vert', phone: TEL_PODO, booking: 'doctolib',
  lead: "Diplômée d'État, je prends soin de vos pieds avec douceur et précision, au cabinet comme à votre domicile.",
  subpages: [
    { slug: 'cors-durillons', title: 'Cors & durillons', ico: '🦶',
      teaser: "Ces épaississements de la peau, souvent douloureux, se traitent simplement.",
      blocks: [
        ['En quelques mots', "Le cor et le durillon sont des épaississements de la peau qui se forment sous l'effet de frottements ou de pressions répétées (chaussures, appui, déformation du pied). Ils peuvent devenir douloureux à la marche."],
        ['Les signes qui doivent alerter', ['Une zone dure et sensible sous le pied ou sur un orteil', "Une douleur à l'appui ou dans certaines chaussures", 'Une peau qui s\'épaissit et jaunit']],
        ['Comment je vous accompagne', "Je retire la corne en excès de façon indolore, je soulage la zone et je recherche la cause (appui, chaussage) pour éviter la récidive. Des conseils personnalisés et, si besoin, un petit appareillage ou des semelles complètent le soin."],
      ] },
    { slug: 'mycoses', title: 'Mycoses des pieds et des ongles', ico: '🍄',
      teaser: "Ongles jaunis ou épaissis, peau qui pèle : la mycose se soigne et se prévient.",
      blocks: [
        ['En quelques mots', "La mycose est une infection due à un champignon. Elle touche la peau (entre les orteils) ou les ongles, qui s'épaississent et changent de couleur. Elle est fréquente et contagieuse, mais se traite bien."],
        ['Les signes qui doivent alerter', ['Un ongle jauni, épaissi ou qui s\'effrite', 'Des démangeaisons ou une peau qui pèle entre les orteils', 'Une gêne ou une odeur inhabituelle']],
        ['Comment je vous accompagne', "J'assainis l'ongle ou la peau, je réduis l'épaisseur pour améliorer le confort et l'efficacité des soins, et je vous conseille sur l'hygiène et la prévention au quotidien."],
      ] },
    { slug: 'ongle-incarne', title: 'Ongle incarné', ico: '💅',
      teaser: "Un ongle qui pénètre dans la peau, ça fait mal — mais il existe des solutions douces.",
      blocks: [
        ['En quelques mots', "L'ongle incarné se produit lorsqu'un bord de l'ongle s'enfonce dans la peau, provoquant douleur, rougeur et parfois inflammation. Une coupe inadaptée ou des chaussures serrées en sont souvent la cause."],
        ['Les signes qui doivent alerter', ['Une douleur au bord de l\'ongle, surtout au gros orteil', 'Une rougeur ou un gonflement', 'Un écoulement ou une chaleur locale']],
        ['Comment je vous accompagne', "Je dégage délicatement l'ongle, je soulage la douleur et je vous montre la bonne façon de couper vos ongles pour éviter que cela ne revienne. En cas d'infection, je vous oriente si nécessaire vers votre médecin."],
      ] },
    { slug: 'verrue-plantaire', title: 'Verrue plantaire', ico: '🔎',
      teaser: "Une petite lésion sous le pied qui peut gêner à la marche.",
      blocks: [
        ['En quelques mots', "La verrue plantaire est une lésion bénigne causée par un virus. Située sous le pied, elle peut être douloureuse à l'appui. Elle est fréquente, notamment après une fréquentation de piscines ou de vestiaires."],
        ['Les signes qui doivent alerter', ['Une petite excroissance rugueuse sous le pied', 'Une douleur en marchant ou en pinçant la zone', 'De petits points noirs au centre de la lésion']],
        ['Comment je vous accompagne', "J'évalue la lésion, je réduis la corne qui la recouvre pour diminuer la douleur et je vous conseille sur la prise en charge la plus adaptée, en lien avec votre médecin si besoin."],
      ] },
    { slug: 'coupe-ongles', title: 'Bien couper ses ongles', ico: '✂️',
      teaser: "Quelques gestes simples pour éviter ongles incarnés et petites blessures.",
      blocks: [
        ['Pourquoi c\'est important', "Une coupe adaptée prévient les ongles incarnés, les blessures et les infections — surtout si votre vue ou votre souplesse rendent l'exercice difficile."],
        ['Mes conseils', ['Couper l\'ongle droit, sans creuser les coins', 'Ne pas couper trop court', 'Utiliser une lime plutôt que d\'arracher les petites peaux', 'Bien sécher entre les orteils après la toilette']],
        ['Un accompagnement si besoin', "Si la coupe est compliquée pour vous ou un proche, je propose un soin régulier, au cabinet ou à domicile, en toute sécurité."],
      ] },
  ],
  faq: [
    ['Le soin est-il douloureux ?', "Non. Les soins de pédicurie sont réalisés avec des instruments adaptés et se font sans douleur. Le plus souvent, on ressent un vrai soulagement dès la fin de la séance."],
    ['À quelle fréquence consulter ?', "Cela dépend de vos besoins. À titre indicatif, un soin tous les 1 à 3 mois convient à beaucoup de personnes. Je vous conseille selon votre situation."],
    ['Puis-je être soigné(e) à domicile ?', "Oui, je me déplace à domicile, en particulier si vous avez des difficultés à vous déplacer. Contactez-moi pour organiser le rendez-vous."],
    ['Faut-il une ordonnance ?', "Non, vous pouvez consulter directement, sans ordonnance."],
  ],
  tarifs: [
    ['Soin de pédicurie', 'à partir de 35 €'],
    ['Soin à domicile', 'sur devis'],
    ['Petit appareillage (orthoplastie)', 'sur devis'],
  ],
  tarifNote: "Tarifs indicatifs, à confirmer lors de la prise de rendez-vous. Paiement : carte bancaire, chèque, espèces.",
};

const podologie = {
  slug: 'podologie', label: 'Podologie', color: 'vert', phone: TEL_PODO, booking: 'doctolib',
  lead: "J'analyse votre posture et votre marche pour soulager les douleurs et prévenir les troubles du pied et du corps.",
  subpages: [
    { slug: 'bilan-podologique', title: 'Bilan podologique', ico: '🩺',
      teaser: "Un examen complet du pied, de la posture et de la marche.",
      blocks: [
        ['En quelques mots', "Le bilan podologique est un examen complet qui permet de comprendre l'origine de vos douleurs ou de votre gêne. J'observe la posture, la marche, les appuis et l'état de vos pieds."],
        ['Dans quels cas ?', ['Douleurs aux pieds, aux genoux, aux hanches ou au dos', 'Gêne à la marche ou déséquilibre', 'Suivi de croissance chez l\'enfant', 'Contrôle chez le sportif']],
        ['Comment ça se passe', "Le bilan est indolore. À l'issue, je vous explique clairement mes constats et, si nécessaire, je vous propose des semelles sur mesure ou des conseils adaptés."],
      ] },
    { slug: 'semelles', title: 'Semelles orthopédiques', ico: '👣',
      teaser: "Des semelles sur mesure pour corriger l'appui et soulager durablement.",
      blocks: [
        ['En quelques mots', "Les semelles orthopédiques (orthèses plantaires) sont conçues sur mesure à partir de votre bilan. Elles corrigent l'appui, soulagent les douleurs et améliorent le confort au quotidien."],
        ['Les bénéfices', ['Soulagement des douleurs à l\'appui', 'Meilleur équilibre à la marche', 'Prévention des déformations et de l\'usure', 'Confort dans la plupart des chaussures']],
        ['De la prise d\'empreinte au suivi', "Je réalise la prise d'empreinte, je conçois vos semelles, puis nous faisons un essayage. Un suivi permet de les ajuster dans le temps pour un confort durable."],
      ] },
  ],
  faq: [
    ['Qu\'est-ce qu\'un bilan podologique ?', "C'est un examen complet et indolore de vos pieds, de votre posture et de votre marche, qui permet de trouver l'origine d'une douleur et de proposer la solution adaptée."],
    ['Les semelles sont-elles remboursées ?', "Une prise en charge partielle est parfois possible selon votre situation et votre mutuelle. Je vous informe au cas par cas ; le détail est à confirmer avec votre organisme."],
    ['Combien de temps durent des semelles ?', "En général un à deux ans, selon l'usage. Un contrôle régulier permet de les ajuster ou de les renouveler au bon moment."],
  ],
  tarifs: [
    ['Bilan podologique', 'sur devis'],
    ['Semelles orthopédiques sur mesure', '135 – 150 €'],
    ['Orthoplasties / petits appareillages', 'sur devis'],
  ],
  tarifNote: "Tarifs indicatifs, à confirmer lors du rendez-vous. Une prise en charge partielle est parfois possible selon votre mutuelle.",
};

const reflexologie = {
  slug: 'reflexologie', label: 'Réflexologie', color: 'rose', phone: TEL_REFLEX, booking: 'phone',
  lead: "Certifiée par l'école E.T.R.E, je vous propose un vrai moment de détente et d'apaisement.",
  subpages: [
    { slug: 'presentation', title: "Qu'est-ce que la réflexologie ?", ico: '🌸',
      teaser: "Une pratique de bien-être douce, par des pressions sur des zones du pied.",
      blocks: [
        ['En quelques mots', "La réflexologie est une pratique de bien-être qui consiste à exercer des pressions douces sur des zones précises des pieds. L'objectif : favoriser la détente, aider à relâcher les tensions et procurer un sentiment d'apaisement."],
        ['Ce qu\'elle peut apporter', ['Un moment de relaxation profonde', 'Un relâchement des tensions du quotidien', 'Une sensation de bien-être général']],
        ['Bon à savoir', "La réflexologie est une pratique de bien-être. Elle ne pose pas de diagnostic et ne se substitue pas à un suivi ou à un traitement médical."],
      ] },
    { slug: 'types-seances', title: 'Les types de séances', ico: '🕊️',
      teaser: "Des séances adaptées à votre besoin : détente, réconfort, accompagnement.",
      blocks: [
        ['Des séances sur mesure', "Chaque séance s'adapte à vous. Après un court échange, je choisis les gestes les plus appropriés pour un moment qui vous corresponde."],
        ['Quelques formules', ['Séance découverte, pour un premier moment de détente', 'Séance bien-être, pour relâcher les tensions', 'Accompagnement en plusieurs séances, dans la durée']],
        ['Le déroulé', "Vous restez habillé(e), confortablement installé(e). Une séance dure environ 45 à 60 minutes, dans un cadre calme et bienveillant."],
      ] },
  ],
  faq: [
    ['La réflexologie remplace-t-elle un médecin ?', "Non. C'est une pratique de bien-être qui ne pose pas de diagnostic et ne remplace ni une consultation, ni un traitement médical. Elle vient en complément, pour votre détente."],
    ['Combien de temps dure une séance ?', "Environ 45 à 60 minutes, échange compris. Vous restez habillé(e) et confortablement installé(e)."],
    ['Est-ce adapté à tout le monde ?', "La réflexologie s'adresse à la plupart des personnes en recherche de détente. En cas de situation particulière (grossesse, problème de santé), n'hésitez pas à m'en parler avant la séance."],
  ],
  tarifs: [
    ['Séance de réflexologie (env. 45–60 min)', 'à préciser'],
    ['Forfait plusieurs séances', 'sur devis'],
  ],
  tarifNote: "Pratique de bien-être, non remboursée par l'Assurance Maladie. Tarifs à confirmer lors de la prise de rendez-vous.",
};

const ACTIVITIES = [pedicurie, podologie, reflexologie];
const byslug = Object.fromEntries(ACTIVITIES.map(a => [a.slug, a]));

/* ---------------- Chrome partagé (en-tête / pied) ---------------- */
const NAV = [
  ['index.html', 'Accueil'],
  ['pedicurie.html', 'Pédicurie'],
  ['podologie.html', 'Podologie'],
  ['reflexologie.html', 'Réflexologie'],
  ['apropos.html', 'À propos'],
  ['contact.html', 'Contact'],
];

function header(active) {
  const links = NAV.map(([href, label]) =>
    `<a href="${href}"${href === active ? ' aria-current="page" class="is-active"' : ''}>${label}</a>`
  ).join('\n        ');
  return `  <header class="site-header">
    <div class="container header-inner">
      <a href="index.html" class="brand">
        <span class="brand-name">Clémentine Olive</span>
        <span class="brand-sub">Pédicure-Podologue · Réflexologue</span>
      </a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="menu" aria-label="Ouvrir le menu">
        <span></span><span></span><span></span>
      </button>
      <nav id="menu" class="nav" aria-label="Navigation principale">
        ${links}
        <a href="contact.html#rendez-vous" class="nav-cta">Rendez-vous</a>
      </nav>
    </div>
  </header>
  <div class="aquarelle" aria-hidden="true"></div>`;
}

function footer() {
  const cols = ACTIVITIES.map(a => `
      <div class="footer-col">
        <a class="footer-title" href="${a.slug}.html">${a.label}</a>
        ${a.subpages.map(s => `<a href="${a.slug}-${s.slug}.html">${s.title}</a>`).join('\n        ')}
      </div>`).join('');
  return `  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand-col">
        <p class="footer-brand">Clémentine Olive</p>
        <p>Pédicure-Podologue D.E · Réflexologue certifiée</p>
        <p>5 place Denis Papin, 95470 Fosses</p>
        <p><a href="tel:${TEL_PODO.tel}">${TEL_PODO.txt}</a> · <a href="tel:${TEL_REFLEX.tel}">${TEL_REFLEX.txt}</a></p>
      </div>${cols}
    </div>
    <p class="footer-copy">
      © 2026 Clémentine Olive · La réflexologie est une pratique de bien-être qui ne se substitue pas à un suivi médical.
    </p>
    <nav class="footer-legal" aria-label="Liens légaux">
      <a href="mentions-legales.html">Mentions légales</a>
      <a href="confidentialite.html">Politique de confidentialité</a>
      <a href="contact.html">Contact</a>
    </nav>
  </footer>`;
}

const SITE = 'https://www.clementine-olive.fr'; // TODO : nom de domaine définitif

function jsonLd() {
  const SCHEDULE = [
    ['Monday', '09:00', '12:30'], ['Monday', '13:00', '18:30'],
    ['Tuesday', '09:30', '12:30'], ['Tuesday', '13:00', '17:00'],
    ['Wednesday', '09:00', '12:30'], ['Wednesday', '13:00', '18:30'],
    ['Thursday', '09:00', '12:30'], ['Thursday', '13:00', '19:00'],
    ['Friday', '09:00', '12:30'], ['Friday', '13:00', '18:00'],
  ];
  const data = {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'LocalBusiness'],
    name: 'Clémentine Olive — Pédicure-Podologue & Réflexologue',
    description: "Pédicure-podologue diplômée d'État et réflexologue certifiée à Fosses (95). Soins de pédicurie, podologie, semelles orthopédiques et réflexologie, au cabinet et à domicile.",
    address: { '@type': 'PostalAddress', streetAddress: ADRESSE.rue, postalCode: ADRESSE.cp, addressLocality: ADRESSE.ville, addressCountry: 'FR' },
    geo: { '@type': 'GeoCoordinates', latitude: GEO.lat, longitude: GEO.lng },
    telephone: TEL_PODO.tel,
    url: SITE,
    priceRange: '€€',
    openingHoursSpecification: SCHEDULE.map(([d, o, c]) => ({
      '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${d}`, opens: o, closes: c,
    })),
  };
  return `  <script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n  </script>`;
}

function shell({ title, description, active, body, bodyClass = '' }) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:locale" content="fr_FR" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Nunito+Sans:wght@400;600;700;800&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
${jsonLd()}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
  <a href="#contenu" class="skip-link">Aller au contenu</a>
${header(active)}
  <main id="contenu">
${body}
  </main>
${footer()}
  <script src="menu.js"></script>
</body>
</html>
`;
}

/* ---------------- Composants réutilisables ---------------- */
const telBtn = (a, cls = 'btn-ghost') =>
  `<a href="tel:${a.phone.tel}" class="btn ${cls}">${a.phone.txt}</a>`;

// Bouton de réservation adapté : Doctolib (pédicurie/podologie) ou téléphone (réflexologie)
function bookBtn(a) {
  if (a.booking === 'doctolib') {
    return `<a href="${DOCTOLIB}" target="_blank" rel="noopener" class="btn btn-primary">Rendez-vous sur Doctolib</a>`;
  }
  return `<a href="tel:${a.phone.tel}" class="btn btn-rose">Rendez-vous par téléphone</a>`;
}
// Boutons combinés pour les encarts d'action (réservation + rappel téléphone)
function bookActions(a) {
  const secondary = a.booking === 'doctolib' ? '\n            ' + telBtn(a) : '';
  return bookBtn(a) + secondary;
}

function faqBlock(a) {
  const items = a.faq.map(([q, ans]) =>
    `        <details>
          <summary>${q}</summary>
          <div class="faq-body">${ans}</div>
        </details>`).join('\n');
  return `    <section class="section ${a.color === 'rose' ? 'section-rose' : ''}">
      <div class="container">
        <div class="section-head">
          <p class="section-eyebrow">Questions fréquentes</p>
          <h2>Vous vous posez peut-être ces questions</h2>
        </div>
        <div class="faq">
${items}
        </div>
      </div>
    </section>`;
}

function tarifBlock(a) {
  const rose = a.color === 'rose';
  const rows = a.tarifs.map(([label, prix]) =>
    `          <li><span>${label}</span><span class="prix">${prix}</span></li>`).join('\n');
  return `    <section id="tarifs" class="section section-creme">
      <div class="container">
        <p class="section-eyebrow" style="text-align:center">Tarifs</p>
        <div class="tarif-bloc${rose ? ' accent-rose' : ''}">
          <h2>Tarifs ${a.label.toLowerCase()}</h2>
          <ul class="tarif-liste">
${rows}
          </ul>
          <div class="bloc-actions" style="justify-content:center">
            ${bookActions(a)}
          </div>
        </div>
        <p class="tarif-note">${a.tarifNote}</p>
      </div>
    </section>`;
}

/* ---------------- Pages ---------------- */
function activityLanding(a) {
  const rose = a.color === 'rose';
  const cards = a.subpages.map(s =>
    `          <a class="card-link${rose ? ' accent-rose' : ''}" href="${a.slug}-${s.slug}.html">
            <span class="ico" aria-hidden="true">${s.ico}</span>
            <h3>${s.title}</h3>
            <p>${s.teaser}</p>
            <span class="go">En savoir plus →</span>
          </a>`).join('\n');
  const body = `    <section class="page-hero${rose ? ' hero-rose' : ''}">
      <div class="container">
        <h1>${a.label}</h1>
        <p class="lead">${a.lead}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <p class="section-eyebrow">${a.label}</p>
          <h2>Ce que je peux faire pour vous</h2>
          <p>Choisissez le sujet qui vous concerne pour en savoir plus.</p>
        </div>
        <div class="card-grid">
${cards}
        </div>
      </div>
    </section>

${faqBlock(a)}

${tarifBlock(a)}`;
  return shell({
    title: `${a.label} — Clémentine Olive à Fosses (95)`,
    description: `${a.label} par Clémentine Olive à Fosses (95470). ${a.lead}`,
    active: `${a.slug}.html`, body,
  });
}

function subPage(a, s) {
  const rose = a.color === 'rose';
  const blocks = s.blocks.map(([h, content]) => {
    if (Array.isArray(content)) {
      return `        <h2>${h}</h2>\n        <ul>${content.map(li => `\n          <li>${li}</li>`).join('')}\n        </ul>`;
    }
    return `        <h2>${h}</h2>\n        <p>${content}</p>`;
  }).join('\n');
  const body = `    <section class="page-hero${rose ? ' hero-rose' : ''}">
      <div class="container">
        <h1>${s.title}</h1>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="article">
          <p class="breadcrumb">
            <a href="index.html">Accueil</a><span class="sep">›</span>
            <a href="${a.slug}.html">${a.label}</a><span class="sep">›</span>
            ${s.title}
          </p>
${blocks}
          <div class="article-cta${rose ? ' accent-rose' : ''}">
            <p>Une question ou envie de prendre rendez-vous ?</p>
            <div class="bloc-actions" style="justify-content:center">
              ${bookActions(a)}
            </div>
          </div>
          <a class="back-link" href="${a.slug}.html">← Retour à ${a.label}</a>
        </div>
      </div>
    </section>`;
  return shell({
    title: `${s.title} — ${a.label} — Clémentine Olive (Fosses 95)`,
    description: `${s.title} : ${s.teaser} Clémentine Olive, ${a.label.toLowerCase()} à Fosses (95470).`,
    active: `${a.slug}.html`, body,
  });
}

function homePage() {
  const cards = ACTIVITIES.map(a => {
    const rose = a.color === 'rose';
    return `          <a class="card-link activity-card${rose ? ' accent-rose' : ''}" href="${a.slug}.html">
            <span class="ico" aria-hidden="true">${rose ? '🌸' : (a.slug === 'podologie' ? '👣' : '🦶')}</span>
            <h3>${a.label}</h3>
            <p>${a.lead}</p>
            <span class="go">Découvrir →</span>
          </a>`;
  }).join('\n');
  const body = `    <section id="accueil" class="hero">
      <div class="container">
        <p class="hero-eyebrow">À Fosses (95) · Au cabinet et à domicile</p>
        <h1>Prendre soin de vos pieds,<br />en douceur et en confiance</h1>
        <p class="hero-lead">
          Je suis <strong>Clémentine Olive</strong>, pédicure-podologue diplômée d'État
          et réflexologue certifiée. Je vous accompagne pour la santé de vos pieds
          et votre bien-être, dans un cadre calme et rassurant.
        </p>
        <div class="hero-actions">
          <a href="contact.html#rendez-vous" class="btn btn-primary">Prendre rendez-vous</a>
          <a href="#activites" class="btn btn-ghost">Découvrir mes soins</a>
        </div>
      </div>
    </section>

    <section id="activites" class="section section-creme">
      <div class="container">
        <div class="section-head">
          <p class="section-eyebrow">Mes activités</p>
          <h2>Trois manières de prendre soin de vous</h2>
          <p>Choisissez le domaine qui vous concerne.</p>
        </div>
        <div class="card-grid">
${cards}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container apropos">
        <div class="apropos-photo">Portrait de Clémentine ici</div>
        <div>
          <p class="section-eyebrow">La praticienne</p>
          <h2>Clémentine Olive</h2>
          <p><strong>Pédicure-podologue diplômée d'État</strong> et <strong>réflexologue certifiée</strong>,
             j'ai à cœur de prendre soin de chacun avec écoute et bienveillance, au cabinet comme à domicile.</p>
          <ul class="qualifications">
            <li><span class="q-ico" aria-hidden="true">🎓</span> Pédicure-Podologue — Diplôme d'État (D.E)</li>
            <li><span class="q-ico" aria-hidden="true">🌸</span> Réflexologue certifiée — école E.T.R.E</li>
            <li><span class="q-ico" aria-hidden="true">🏡</span> Soins possibles à domicile</li>
          </ul>
          <div class="bloc-actions"><a href="apropos.html" class="btn btn-ghost">En savoir plus</a></div>
        </div>
      </div>
    </section>

    <section class="section section-vert">
      <div class="container infos-grid">
        <div class="info-bloc">
          <h3>Adresse</h3>
          <p>5 place Denis Papin<br />95470 Fosses</p>
          <p class="info-note">Soins possibles à domicile</p>
        </div>
        <div class="info-bloc">
          <h3>Téléphone</h3>
          <p>Pédicurie / Podologie<br /><a href="tel:${TEL_PODO.tel}">${TEL_PODO.txt}</a></p>
          <p>Réflexologie<br /><a href="tel:${TEL_REFLEX.tel}">${TEL_REFLEX.txt}</a></p>
        </div>
        <div class="info-bloc">
          <h3>Sur rendez-vous</h3>
          <p>Les consultations se font uniquement sur rendez-vous, pour vous accueillir dans les meilleures conditions.</p>
          <a href="contact.html#rendez-vous">Prendre rendez-vous →</a>
        </div>
      </div>
    </section>`;
  return shell({
    title: "Clémentine Olive — Pédicure-Podologue & Réflexologue à Fosses (95)",
    description: "Clémentine Olive, pédicure-podologue diplômée d'État et réflexologue certifiée à Fosses (95470). Soins de pédicurie, podologie, semelles et réflexologie, au cabinet et à domicile.",
    active: 'index.html', body,
  });
}

function aproposPage() {
  const body = `    <section class="page-hero">
      <div class="container"><h1>La praticienne</h1></div>
    </section>
    <section class="section">
      <div class="container apropos">
        <div class="apropos-photo">Portrait de Clémentine ici</div>
        <div>
          <p class="section-eyebrow">À propos</p>
          <h2>Clémentine Olive</h2>
          <p><strong>Pédicure-podologue diplômée d'État</strong> et <strong>réflexologue certifiée</strong>,
             j'ai à cœur de prendre soin de chacun avec écoute et bienveillance. Mon approche se veut avant tout
             humaine, douce et rassurante.</p>
          <p>De la santé du pied au moment de détente, je prends le temps de vous accueillir et de m'adapter
             à vos besoins, au cabinet comme à votre domicile. Je vous reçois uniquement sur rendez-vous,
             pour vous consacrer toute mon attention.</p>
          <ul class="qualifications">
            <li><span class="q-ico" aria-hidden="true">🎓</span> Pédicure-Podologue — Diplôme d'État (D.E)</li>
            <li><span class="q-ico" aria-hidden="true">🌸</span> Réflexologue certifiée — école E.T.R.E</li>
            <li><span class="q-ico" aria-hidden="true">🏡</span> Soins possibles à domicile</li>
            <li><span class="q-ico" aria-hidden="true">👂</span> Écoute, douceur et suivi personnalisé</li>
          </ul>
          <div class="bloc-actions"><a href="contact.html#rendez-vous" class="btn btn-primary">Prendre rendez-vous</a></div>
        </div>
      </div>
    </section>`;
  return shell({
    title: "La praticienne — Clémentine Olive (Fosses 95)",
    description: "Clémentine Olive, pédicure-podologue diplômée d'État et réflexologue certifiée à Fosses. Parcours et approche.",
    active: 'apropos.html', body,
  });
}

function contactPage() {
  const horaireRows = HORAIRES.map(h =>
    h.creneaux
      ? `          <tr><td class="jour">${h.jour}</td><td>${h.creneaux}</td></tr>`
      : `          <tr><td class="jour">${h.jour}</td><td class="ferme">Fermé</td></tr>`
  ).join('\n');

  const body = `    <section class="page-hero">
      <div class="container">
        <h1>Contact, accès &amp; rendez-vous</h1>
        <p class="lead">Retrouvez ici comment prendre rendez-vous, les horaires et le plan d'accès du cabinet.</p>
      </div>
    </section>

    <!-- Réservation -->
    <section id="rendez-vous" class="section section-creme">
      <div class="container">
        <div class="section-head">
          <p class="section-eyebrow">Rendez-vous</p>
          <h2>Prendre rendez-vous</h2>
          <p>Consultations uniquement sur rendez-vous.</p>
        </div>
        <div class="booking-grid">
          <div class="booking-card">
            <span class="ico" aria-hidden="true">👣</span>
            <h3>Pédicurie &amp; Podologie</h3>
            <p>Réservez votre créneau en ligne, en quelques clics, sur Doctolib.</p>
            <a href="${DOCTOLIB}" target="_blank" rel="noopener" class="btn btn-primary">Rendez-vous sur Doctolib</a>
            <p style="margin-top:14px"><a href="tel:${TEL_PODO.tel}">ou par téléphone : ${TEL_PODO.txt}</a></p>
          </div>
          <div class="booking-card accent-rose">
            <span class="ico" aria-hidden="true">🌸</span>
            <h3>Réflexologie</h3>
            <p>Pour une séance de réflexologie, contactez-moi directement par téléphone.</p>
            <a href="tel:${TEL_REFLEX.tel}" class="btn btn-rose">Appeler le ${TEL_REFLEX.txt}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Horaires -->
    <section id="horaires" class="section">
      <div class="container">
        <div class="section-head">
          <p class="section-eyebrow">Horaires</p>
          <h2>Horaires du cabinet</h2>
        </div>
        <div class="horaires-wrap">
          <table class="horaires">
            <tbody>
${horaireRows}
            </tbody>
          </table>
          <p class="horaires-note">Sur rendez-vous · Soins également possibles à domicile.</p>
        </div>
      </div>
    </section>

    <!-- Accès / carte -->
    <section id="acces" class="section section-vert">
      <div class="container">
        <div class="section-head">
          <p class="section-eyebrow">Accès</p>
          <h2>Où me trouver</h2>
          <p>${ADRESSE.rue} · ${ADRESSE.cp} ${ADRESSE.ville}</p>
        </div>
        <div class="map-embed" id="map-embed" data-src="${MAPS_EMBED}">
          <div class="map-consent">
            <span class="ico" aria-hidden="true">🗺️</span>
            <p>La carte est fournie par Google Maps. En l'affichant, vous acceptez le dépôt de cookies par Google.</p>
            <button type="button" id="map-load" class="btn btn-primary">Afficher la carte</button>
            <p><a href="${MAPS_LINK}" target="_blank" rel="noopener">Ouvrir dans Google Maps</a></p>
          </div>
        </div>
      </div>
    </section>`;
  return shell({
    title: "Contact, accès & rendez-vous — Clémentine Olive (Fosses 95)",
    description: "Contactez Clémentine Olive à Fosses (95470) : rendez-vous Doctolib (pédicurie, podologie), téléphone (réflexologie), horaires et plan d'accès.",
    active: 'contact.html', body,
  });
}

/* ---------- Pages légales ---------- */
function legalPage({ slug, title, heading, body }) {
  const content = `    <section class="page-hero">
      <div class="container"><h1>${heading}</h1></div>
    </section>
    <section class="section">
      <div class="container">
        <div class="legal">
${body}
        </div>
      </div>
    </section>`;
  return shell({ title: `${heading} — Clémentine Olive`, description: `${heading} du site de Clémentine Olive, pédicure-podologue et réflexologue à Fosses.`, active: '', body: content });
}

function mentionsLegales() {
  const body = `        <p>Conformément à la loi, voici les mentions légales du site. <span class="todo">(Éléments à compléter avec les informations réelles.)</span></p>
        <h2>Éditeur du site</h2>
        <p>Clémentine Olive — Pédicure-Podologue D.E, Réflexologue<br />
        ${ADRESSE.rue}, ${ADRESSE.cp} ${ADRESSE.ville}<br />
        Téléphone : ${TEL_PODO.txt}<br />
        <span class="todo">SIRET : à compléter</span> · <span class="todo">N° ADELI / RPPS : à compléter</span></p>
        <h2>Directrice de la publication</h2>
        <p>Clémentine Olive</p>
        <h2>Hébergement</h2>
        <p><span class="todo">Nom, adresse et téléphone de l'hébergeur à compléter.</span></p>
        <h2>Propriété intellectuelle</h2>
        <p>L'ensemble du contenu de ce site (textes, images, logo) est protégé. Toute reproduction sans autorisation est interdite.</p>
        <h2>Données personnelles</h2>
        <p>Les informations transmises via ce site sont traitées conformément à notre <a href="confidentialite.html">politique de confidentialité</a>.</p>`;
  return legalPage({ slug: 'mentions-legales', title: 'Mentions légales', heading: 'Mentions légales', body });
}

function confidentialite() {
  const body = `        <p>Cette page décrit comment vos données sont traitées lors de votre visite. <span class="todo">(À faire valider juridiquement avant mise en ligne.)</span></p>
        <h2>Responsable du traitement</h2>
        <p>Clémentine Olive, ${ADRESSE.rue}, ${ADRESSE.cp} ${ADRESSE.ville}.</p>
        <h2>Données collectées</h2>
        <p>Ce site vitrine ne collecte pas de compte ni de formulaire. La prise de rendez-vous en ligne est réalisée via <strong>Doctolib</strong>, sur son propre site, soumis à sa politique de confidentialité.</p>
        <h2>Cookies et services tiers</h2>
        <ul>
          <li><strong>Google Maps</strong> : la carte n'est chargée qu'après votre clic explicite (« Afficher la carte »). Aucun cookie Google n'est déposé tant que vous ne l'affichez pas.</li>
          <li><strong>Doctolib</strong> : la réservation vous redirige vers le site de Doctolib.</li>
          <li><strong>Google Fonts</strong> : les polices sont chargées depuis les serveurs de Google. <span class="todo">(Option : auto-héberger les polices pour éviter cet appel externe.)</span></li>
        </ul>
        <h2>Vos droits</h2>
        <p>Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, contactez le cabinet au ${TEL_PODO.txt}.</p>`;
  return legalPage({ slug: 'confidentialite', title: 'Politique de confidentialité', heading: 'Politique de confidentialité', body });
}

/* ---------------- Écriture des fichiers ---------------- */
const out = [];
const write = (name, html) => { writeFileSync(new URL(`./${name}`, import.meta.url), html); out.push(name); };

write('index.html', homePage());
write('apropos.html', aproposPage());
write('contact.html', contactPage());
write('mentions-legales.html', mentionsLegales());
write('confidentialite.html', confidentialite());
for (const a of ACTIVITIES) {
  write(`${a.slug}.html`, activityLanding(a));
  for (const s of a.subpages) write(`${a.slug}-${s.slug}.html`, subPage(a, s));
}
console.log(`✓ ${out.length} pages générées :\n  ` + out.join('\n  '));
