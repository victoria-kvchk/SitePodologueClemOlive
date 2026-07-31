/* =========================================================
   Générateur du site oliveclem.fr — Clémentine Olive
   Source unique -> pages HTML statiques (en-tête/pied partagés)
   Lancer : node build.mjs  (régénère toutes les pages + sitemap/robots)
   ========================================================= */
import { writeFileSync } from 'node:fs';

const TEL_PODO = { txt: '06 52 86 09 96', tel: '+33652860996' };

const DOCTOLIB = 'https://www.doctolib.fr/pedicure-podologue/fosses/clementine-olive';

const ADRESSE = { rue: '5 place Denis Papin', cp: '95470', ville: 'Fosses' };
const GEO = { lat: '49.0994058', lng: '2.5233593' };
const MAPS_EMBED = 'https://www.google.fr/maps/embed?pb=!1m18!1m12!1m3!1d1132.3976116027156!2d2.5233593!3d49.0994058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e639a7517a79b9%3A0x2a8a210e8c90f8fb!2sOLIVE%20Cl%C3%A9mentine%20Cabinet%20de%20p%C3%A9dicurie-podologie!5e0!3m2!1sfr!2sfr!4v1694123456789!5m2!1sfr!2sfr';
const MAPS_LINK = 'https://www.google.fr/maps/place/OLIVE+Cl%C3%A9mentine+Cabinet+de+p%C3%A9dicurie-podologie/@49.0994058,2.5233593,17z';

/* ---------------- Données des activités ---------------- */
const pedicurie = {
  slug: 'pedicurie', label: 'Pédicurie', color: 'vert',
  lead: "Diplômée d'État, je prends soin de vos pieds avec douceur et précision, au cabinet comme à votre domicile.",
  subpages: [
    { slug: 'affections-ongle-peau', title: "Affections de l'ongle et de la peau", ico: '🦶',
      teaser: "Ongle incarné, mycoses, cors, durillons, affections de la peau : je prends soin de tout cela.",
      blocks: [
        ['En quelques mots', "C'est un acte paramédical qui permet de traiter et de soulager, en douceur, les principales affections de l'ongle et de la peau du pied — avec des conseils personnalisés pour éviter qu'elles ne reviennent."],
        ['Ce que je prends en charge', ["Prise en charge et conseils de l'ongle incarné", "Prise en charge et conseils des ongles épais et/ou mycosés", "Prise en charge et conseils des ongles traumatisés et décollés", "Prise en charge et conseils des cors et durillons", "Prise en charge et conseils des affections de la peau (mycose, hypersudation, …)"]],
        ['En toute douceur', "Les soins sont réalisés avec des instruments adaptés et se font sans douleur. Le plus souvent, on ressent un vrai soulagement dès la fin de la séance."],
      ] },
    { slug: 'patients-diabetiques', title: 'Patients diabétiques', ico: '🩺',
      teaser: "Un suivi régulier pour prévenir les complications du pied diabétique.",
      blocks: [
        ['En quelques mots', "Une consultation régulière chez un pédicure-podologue permet de prévenir les risques de complication des pieds diabétiques liés à une neuropathie."],
        ['Une prise en charge par la Sécurité sociale', "Toute personne diabétique bénéficie d'au moins une séance par an prise en charge par la Sécurité sociale. Selon l'atteinte des membres inférieurs (gradation), cette prise en charge peut aller jusqu'à 8 séances par an, sur ordonnance."],
        ['Tarifs & prise en charge', "<strong>Grade 0 et 1</strong> — 38 € la séance.<br />Prise en charge : 1 séance par an à hauteur de 30 € par la Sécurité sociale (pensez à demander votre bilan).<br /><br /><strong>Grade 2 et 3</strong> — prise en charge à 100 %, sur ordonnance : 1ʳᵉ séance 35,70 €, puis 30 € les séances suivantes.<br />Une gradation est réalisée à chaque nouvelle ordonnance."],
        ['Les grades de prise en charge', ["<strong>Grade 0</strong> — absence de neuropathie sensitive (1 séance/an).", "<strong>Grade 1</strong> — neuropathie sensitive isolée, légère perte de sensibilité (1 séance/an).", "<strong>Grade 2</strong> — neuropathie sensitive associée à une artériopathie des membres inférieurs et/ou une déformation des pieds (5 séances/an).", "<strong>Grade 3</strong> — antécédent d'ulcération ou d'amputation, ou plaie ne cicatrisant pas depuis plus de 3 mois (8 séances/an)."]],
        ['Syndrome main-pied', "Une prise en charge du syndrome main-pied est également possible pour les patients sous traitement anti-cancéreux : 2 séances remboursées par la Sécurité sociale, sur prescription de votre oncologue."],
      ] },
    { slug: 'verrue-plantaire', title: 'Soin des verrues plantaires par cryothérapie', ico: '❄️',
      teaser: "Un traitement par le froid, sans douleur, sans saignement et sans anesthésie.",
      blocks: [
        ['En quelques mots', "Le traitement des verrues plantaires utilise le Freezpen, un instrument de cryochirurgie précis. On vient « geler » la verrue : c'est sans douleur, sans saignement et sans anesthésie."],
        ['Comment ça fonctionne', "Le Freezpen utilise l'oxyde nitreux, un gaz cryogénique qui agit à -85 °C. Cette basse température produit un choc thermique très rapide qui congèle les cellules de la verrue en toute sécurité. Grâce à trois embouts de diamètres différents, le geste est précis et protège les tissus sains autour de la lésion."],
        ['Prise en charge', "Le soin est pris en charge par la Sécurité sociale : jusqu'à 5 séances, à hauteur de 20 € par consultation."],
      ] },
  ],
  faq: [
    ['Le soin est-il douloureux ?', "Non. Les soins de pédicurie sont réalisés avec des instruments adaptés et se font sans douleur. Le plus souvent, on ressent un vrai soulagement dès la fin de la séance."],
    ['À quelle fréquence consulter ?', "Cela dépend de vos besoins. À titre indicatif, un soin tous les 1 à 3 mois convient à beaucoup de personnes. Je vous conseille selon votre situation."],
    ['Comment bien couper ses ongles ?', "Coupez l'ongle droit, sans creuser les coins et pas trop court : cela évite les ongles incarnés et les petites blessures. Préférez une lime pour adoucir les bords plutôt que d'arracher les petites peaux, et séchez bien entre les orteils après la toilette. Si la coupe est difficile pour vous ou pour un proche — vue, souplesse, diabète —, je peux m'en occuper en toute sécurité, au cabinet ou à domicile."],
    ['Puis-je être soigné(e) à domicile ?', "Oui, je me déplace à domicile, en particulier si vous avez des difficultés à vous déplacer. Contactez-moi pour organiser le rendez-vous."],
    ['Faut-il une ordonnance ?', "Pour les soins diabétiques, les semelles orthopédiques et les verrues plantaires, vous pouvez consulter directement, sans ordonnance : je peux la rédiger moi-même si nécessaire."],
  ],
  tarifs: [
    ['Soin de pédicurie', '38 €'],
    ['Soin à domicile (selon la localisation)', '45 – 47 €'],
    ['Soin à domicile pour deux personnes', '83 €'],
    ['Verrue plantaire par cryothérapie (la séance)', '20 – 38 €'],
    ['Soins pour patients diabétiques', '<a href="pedicurie-patients-diabetiques.html">voir le détail</a>'],
  ],
  tarifNote: "Paiement : carte bancaire, chèque, espèces.",
};

const podologie = {
  slug: 'podologie', label: 'Podologie', color: 'vert',
  lead: "J'analyse votre posture et votre marche pour soulager les douleurs et prévenir les troubles du pied et du corps.",
  subpages: [
    { slug: 'bilan-podologique', title: 'Bilan podologique', ico: '🩺',
      teaser: "Une évaluation détaillée de la posture et de la marche, à tout âge.",
      blocks: [
        ['En quelques mots', "Le bilan podologique est une évaluation détaillée de la posture et de la marche, à tout âge et pour tout le monde. Il permet de comprendre l'origine de vos douleurs ou de votre gêne : j'observe la posture, la marche, les appuis et l'état de vos pieds, et je vous conseille sur le chaussant."],
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
    ['Bilan podologique', '50 €'],
    ['Bilan avec confection de semelles orthopédiques :', ''],
    ["Pointures inférieures au 37<span class='tarif-sub'>Base de remboursement Sécu : 14,02 € l'unité, soit 28,04 € la paire.</span>", '135 €', 'sub'],
    ["Pointure 37 et pointures supérieures au 37<span class='tarif-sub'>Base de remboursement Sécu : 14,43 € l'unité, soit 28,86 € la paire.</span>", '140 €', 'sub'],
  ],
  tarifNote: "Une prise en charge partielle est parfois possible selon votre mutuelle. Paiement : carte bancaire, chèque, espèces.",
};

const reflexologie = {
  slug: 'reflexologie', label: 'Réflexologie', color: 'rose',
  lead: "Certifiée par l'école E.T.R.E, je vous propose un vrai moment de détente et d'apaisement.",
  subpages: [
    { slug: 'presentation', title: "Qu'est-ce que la réflexologie ?", ico: '🌸',
      teaser: "Une pratique de bien-être douce, par des pressions sur des zones du pied.",
      blocks: [
        ['En quelques mots', "La réflexologie plantaire est une technique manuelle qui consiste à exercer des pressions rythmées sur des zones réflexes de vos pieds. Ces zones sont reliées, par l'intermédiaire de terminaisons nerveuses, à différents organes, glandes ou parties du corps."],
        ["L'objectif", "Aider le corps à retrouver son équilibre naturel par auto-régulation, soulager les tensions et favoriser le bien-être global."],
        ['Bon à savoir', "La réflexologie plantaire est une pratique de bien-être complémentaire à la pédicurie-podologie. Elle ne se substitue en aucun cas à un suivi médical. Le bilan n'est pas un diagnostic, mais il sert au praticien à établir un protocole de massage adapté. Le réflexologue ne soigne pas, ne guérit pas."],
      ] },
    { slug: 'dans-quel-cas', title: 'Dans quel cas ?', ico: '🕊️',
      teaser: "Les indications et les contre-indications d'une séance.",
      blocks: [
        ['Indications', ["En cas de stress : chronique, à l'approche d'un examen, à la suite d'un événement marquant…", "En cas de déséquilibre ou de troubles d'un système : respiratoire, digestif, sommeil…", "En cas de douleurs musculaires et/ou articulaires : arthrose, troubles inflammatoires, tendinite", "Au début du printemps, avant l'arrivée des pollens, en cas d'allergie", "En cas de problèmes cutanés : psoriasis, eczéma…", "Si vous ressentez une sensation de jambes lourdes"]],
        ['Contre-indications', "Il n'est pas recommandé de faire une séance si :"],
        ['', ["Vous êtes malade ou avez de la fièvre", "Vous êtes enceinte de moins de 3 mois", "Vous avez une phlébite", "Vous avez eu une entorse à une cheville il y a moins de 3 mois"]],
      ] },
    { slug: 'bienfaits', title: 'Le déroulé et les bienfaits', ico: '🌿',
      teaser: "Comment se passe une séance et ce qu'elle peut apporter.",
      blocks: [
        ["Déroulé d'une séance", "La séance débute par un échange, afin d'évoquer les raisons de votre venue et d'estimer le degré d'inconfort ressenti au quotidien. Cela me permet d'établir un protocole adapté à vos besoins."],
        ['', "Une fois dans le fauteuil, je commence toujours par des mouvements de détente du pied, ce qui permet à mes mains de faire connaissance avec vos pieds. Je réalise ensuite le protocole complet envisagé pour vous, que j'ajuste selon vos besoins et mes ressentis."],
        ['', "Vous êtes confortablement installé(e) dans un fauteuil de soin, en position semi-allongée, centre de gravité zéro et jambes relevées. Un plaid est à votre disposition si vous le souhaitez (en vous détendant, le corps se refroidit légèrement). Il se peut que vous bâilliez, que vous vous endormiez ou que vos yeux pleurent de détente : chaque corps réagit à sa manière."],
        ['Les bienfaits', ["Réduction du stress en favorisant un état de relaxation", "Diminution de l'anxiété", "Soulagement de certaines douleurs, en complément des traitements habituels", "Amélioration du bien-être général et de la qualité de vie", "Amélioration du cycle de sommeil", "Diminution de certains troubles du quotidien"]],
        ['Effets secondaires possibles', "Ils peuvent survenir 2 à 3 semaines après la séance. La réflexologie contribuant à la détoxification du corps, ce processus peut entraîner une modification temporaire du transit, de légers maux de tête, des urines plus foncées, une faim plus importante et un regain d'énergie, une brève sensation nauséeuse… Cela varie selon la personne, son niveau de vitalité et le type de séance."],
        ['', "Il est conseillé de se reposer après la séance et de bien s'hydrater. Le nombre de séances varie selon chaque individu, la durée du trouble et la capacité du corps à évoluer."],
      ] },
  ],
  faq: [
    ['La réflexologie aide-t-elle à gérer le stress et l\'anxiété ?', "La réflexologie est avant tout une pratique de détente. En favorisant un relâchement profond, elle peut aider à apaiser les tensions liées au stress et à retrouver un sentiment de calme. C'est un accompagnement du bien-être, qui ne remplace pas un suivi médical ou psychologique si celui-ci est nécessaire."],
    ['Combien de séances sont nécessaires pour ressentir des effets ?', "Cela varie d'une personne à l'autre. Beaucoup ressentent une détente dès la première séance. Pour un réel bénéfice dans la durée, 3 à 5 séances sont généralement recommandées. Nous en parlons ensemble selon votre ressenti."],
    ['La réflexologie peut-elle agir sur les douleurs chroniques ?', "La réflexologie n'est pas un traitement de la douleur et ne se substitue pas à une prise en charge médicale. En procurant un moment de détente et en aidant à relâcher les tensions, elle peut toutefois être un complément agréable au bien-être. En cas de douleur, parlez-en d'abord à votre médecin."],
    ['Comment se préparer avant une séance ?', "Aucune préparation particulière n'est nécessaire. Prévoyez simplement une tenue confortable, évitez un repas trop lourd juste avant, et venez avec des pieds propres. Pour le reste, vous n'avez qu'à vous détendre."],
    ['Est-ce que c\'est douloureux ?', "Non. Les pressions sont douces et adaptées à votre sensibilité. La séance doit rester un moment agréable : n'hésitez jamais à me signaler une gêne, j'ajuste aussitôt."],
    ['La réflexologie est-elle sans danger ?', "Pratiquée dans le respect de quelques précautions, la réflexologie est douce et non invasive. Elle reste une pratique de bien-être : en cas de problème de santé, elle vient en complément d'un suivi médical, jamais à sa place."],
    ['Y a-t-il des contre-indications ?', "Quelques situations demandent des précautions (phlébite récente, plaies ou infections du pied, certaines pathologies…). Signalez-moi votre situation avant la séance et, en cas de doute, demandez l'avis de votre médecin. J'adapte ou je préfère reporter si nécessaire."],
    ['Peut-on pratiquer la réflexologie sur les femmes enceintes ?', "La réflexologie peut être envisagée pendant la grossesse, avec précautions et généralement pas durant le premier trimestre. Prévenez-moi si vous êtes enceinte : j'adapte la séance, et l'accord de votre médecin ou de votre sage-femme est recommandé."],
    ['Est-ce adapté aux enfants et aux personnes âgées ?', "Oui. La douceur de la pratique convient aussi bien aux enfants qu'aux personnes âgées. La séance est simplement adaptée (durée, intensité des pressions) à chacun."],
    ['Y a-t-il des effets secondaires possibles ?', "La réflexologie est bien tolérée. Après une séance, on peut parfois ressentir une grande détente, une fatigue passagère ou une envie d'uriner plus fréquente : ce sont des réactions bénignes et temporaires. Pensez à bien vous hydrater."],
    ['Faut-il prendre rendez-vous à l\'avance ?', "Oui, les séances se font uniquement sur rendez-vous, en ligne sur Doctolib. Cela me permet de vous accueillir dans les meilleures conditions et de vous consacrer tout le temps nécessaire."],
    ['Quel est le tarif d\'une séance ?', "Les tarifs vont de 30 € (séance découverte) à 70 € (séance à domicile), selon le type et la durée de la séance. Le détail complet figure dans la rubrique Tarifs."],
    ['Comment puis-je régler ma séance ?', "Le règlement se fait en fin de séance, par carte bancaire ou espèces."],
    ['La réflexologie est-elle remboursée par la sécurité sociale ou les mutuelles ?', "La réflexologie est une pratique de bien-être : elle n'est pas remboursée par l'Assurance Maladie. Certaines mutuelles proposent toutefois une prise en charge partielle des médecines douces — renseignez-vous auprès de la vôtre."],
    ['Peut-on offrir une séance en bon cadeau ?', "Oui, avec plaisir : une séance de réflexologie peut être offerte sous forme de bon cadeau. Parlez-m'en lors de votre venue au cabinet et je vous l'établis."],
  ],
  tarifs: [
    ["Séance découverte ou relaxation<span class='tarif-sub'>De 20 à 30 min · pour découvrir la réflexologie ou simplement se détendre.</span>", '30 €'],
    ["Séance longue sur-mesure :<span class='tarif-sub'>De 45 min à 1h15 · bilan complet et suivi personnalisé.</span>", ''],
    ['1ʳᵉ séance', '60 €', 'sub'],
    ['Séances de suivi', '55 €', 'sub'],
    ['Pour les plus jeunes :', ''],
    ["Séance enfant<span class='tarif-sub'>De 15 à 30 min</span>", '30 €', 'sub'],
    ["Séance étudiante<span class='tarif-sub'>De 30 à 45 min · sur présentation d'un justificatif</span>", '40 €', 'sub'],
    ["Séance à domicile<span class='tarif-sub'>Environ 1h · selon le périmètre d'action (à préciser)</span>", '70 €'],
  ],
  tarifNote: "Pensez à demander une facture pour votre mutuelle. Paiement accepté : carte bancaire et espèces.",
};

const ACTIVITIES = [pedicurie, podologie, reflexologie];

/* ---------------- Chrome partagé (en-tête / pied) ---------------- */
const NAV = [
  { href: 'index.html', label: 'Accueil' },
  { href: 'index.html#apropos', label: 'À propos' },
  { label: 'Pédicurie & Podologie', children: [
    { href: 'index.html#pedicurie', label: 'Soins de pédicurie' },
    { href: 'index.html#podologie', label: 'La Podologie' },
    { href: 'faq.html', label: 'FAQ' },
  ] },
  { label: 'Réflexologie', children: [
    { href: 'reflexologie.html#presentation', label: "Qu'est-ce que c'est ?" },
    { href: 'reflexologie.html#dans-quel-cas', label: 'Dans quel cas ?' },
    { href: 'reflexologie.html#bienfaits', label: 'Le déroulé et les bienfaits' },
    { href: 'reflexologie.html#faq', label: 'FAQ' },
  ] },
  { href: 'tarifs.html', label: 'Tarifs' },
];

function header(active) {
  const navLink = (href, label) =>
    `<a href="${href}"${href === active ? ' aria-current="page" class="is-active"' : ''}>${label}</a>`;
  const items = NAV.map(item => {
    if (!item.children) return navLink(item.href, item.label);
    const childActive = item.children.some(c => c.href === active || c.href.startsWith(active + '#'));
    const sub = item.children.map(c => navLink(c.href, c.label)).join('\n            ');
    return `<div class="nav-group${childActive ? ' is-active' : ''}">
          <button type="button" class="nav-group-trigger" aria-expanded="false" aria-haspopup="true">${item.label}<span class="caret" aria-hidden="true">▾</span></button>
          <div class="nav-submenu">
            ${sub}
          </div>
        </div>`;
  }).join('\n        ');
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
        ${items}
        <a href="${DOCTOLIB}" target="_blank" rel="noopener" class="nav-cta">Prendre rendez-vous</a>
      </nav>
    </div>
  </header>`;
}

function footer() {
  const icoCal = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/></svg>';
  const icoPin = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.5s7-6.7 7-12A7 7 0 0 0 5 9.5c0 5.3 7 12 7 12z"/><circle cx="12" cy="9.3" r="2.6"/></svg>';
  return `  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand-col">
        <p class="footer-brand">Clémentine Olive</p>
        <p class="footer-brand-sub">Pédicure-Podologue D.E · Réflexologue</p>
        <p class="footer-tagline">Prendre soin de vos pieds,<br />c'est prendre soin de vous.</p>
      </div>
      <nav class="footer-nav" aria-label="Plan du site">
        <p class="footer-col-title">Navigation</p>
        <ul>
          <li><a href="index.html">Accueil</a></li>
          <li><a href="index.html#apropos">À propos</a></li>
          <li><a href="index.html#activites">Soins &amp; prestations</a></li>
          <li><a href="reflexologie.html">Réflexologie plantaire</a></li>
          <li><a href="tarifs.html">Tarifs</a></li>
        </ul>
      </nav>
      <div class="footer-infos">
        <p class="footer-col-title">Infos pratiques</p>
        <ul class="footer-infos-list">
          <li>
            <span class="frdv-ico">${icoCal}</span>
            <span>Lundi au vendredi : 9h – 19h<br />Samedi : une fois par mois</span>
          </li>
          <li>
            <span class="frdv-ico">${icoPin}</span>
            <span>5 place Denis Papin<br />95470 Fosses · <a href="index.html#cabinet">plan d'accès</a></span>
          </li>
        </ul>
        <a class="btn btn-primary footer-doctolib" href="${DOCTOLIB}" target="_blank" rel="noopener">Prendre rendez-vous</a>
      </div>
    </div>
    <p class="footer-disclaimer">La réflexologie est une pratique de bien-être qui ne se substitue pas à un suivi médical.</p>
    <div class="container footer-legal-bar">
      <p>© 2026 Clémentine Olive · Tous droits réservés</p>
      <nav class="footer-legal" aria-label="Liens légaux">
        <a href="mentions-legales.html">Mentions légales</a>
        <a href="confidentialite.html">Politique de confidentialité</a>
      </nav>
    </div>
  </footer>`;
}

const SITE = 'https://oliveclem.fr';

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
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
  <link rel="icon" href="favicon.svg" type="image/svg+xml" />
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
  <script src="footprints.js"></script>
</body>
</html>
`;
}

/* ---------------- Composants réutilisables ---------------- */
// Bouton de réservation : toutes les activités passent par Doctolib.
const bookActions = () =>
  `<a href="${DOCTOLIB}" target="_blank" rel="noopener" class="btn btn-primary">Rendez-vous sur Doctolib</a>`;

function faqBlock(a, id = '') {
  const items = a.faq.map(([q, ans]) =>
    `        <details>
          <summary>${q}</summary>
          <div class="faq-body">${ans}</div>
        </details>`).join('\n');
  return `    <section${id ? ` id="${id}"` : ''} class="section ${a.color === 'rose' ? 'section-rose' : ''}">
      <div class="container">
        <div class="section-head">
          <h2>Questions fréquentes</h2>
        </div>
        <div class="faq">
${items}
        </div>
      </div>
    </section>`;
}

// Carte Google Maps en chargement au clic (RGPD)
function mapEmbed() {
  return `        <div class="map-embed" id="map-embed" data-src="${MAPS_EMBED}">
          <div class="map-consent">
            <span class="ico" aria-hidden="true">🗺️</span>
            <p>La carte est fournie par Google Maps. En l'affichant, vous acceptez le dépôt de cookies par Google.</p>
            <button type="button" id="map-load" class="btn btn-primary">Afficher la carte</button>
            <p><a href="${MAPS_LINK}" target="_blank" rel="noopener">Ouvrir dans Google Maps</a></p>
          </div>
        </div>`;
}

/* ---------------- Pages ---------------- */
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
${blocks}
          <div class="article-cta${rose ? ' accent-rose' : ''}">
            <p>Une question ou envie de prendre rendez-vous ?</p>
            <div class="bloc-actions" style="justify-content:center">
              ${bookActions()}
            </div>
          </div>
          <a class="back-link" href="index.html#${a.slug}">← Retour à ${a.label}</a>
        </div>
      </div>
    </section>`;
  return shell({
    title: `${s.title} — ${a.label} — Clémentine Olive (Fosses 95)`,
    description: `${s.title} : ${s.teaser} Clémentine Olive, ${a.label.toLowerCase()} à Fosses (95470).`,
    active: `${a.slug}.html`, body,
  });
}

function homeBody() {
  const ICONS = {
    diabete:   '<path d="M20 7c4 6 9 12 9 18a9 9 0 1 1-18 0c0-6 5-12 9-18z"/><path d="M20 15c2 4 5 8 5 11"/>',
    bilan:     '<path d="M11 8h18v25H11z"/><path d="M16 8V5h8v3M15 15l2 2 4-5M15 23l2 2 4-5"/>',
    question:  '<path d="M13 14a8 8 0 0 1 15 3c0 7-8 7-8 13"/><circle cx="20" cy="34" r="1"/>',
    cas:       '<path d="M31 8c-12 2-21 9-22 22 13 1 21-7 22-22z"/><path d="M11 30c5-7 10-11 17-15"/>',
    bienfaits: '<path d="M20 31c-8-3-12-8-11-15 6 1 10 4 11 10 1-6 5-9 11-10 1 7-3 12-11 15z"/><path d="M20 31V14"/>',
  };
  const HOME_CARDS = {
    pedicurie: {
      intro: "Prendre soin de vos pieds au quotidien, au cabinet comme à domicile.",
      items: [
        { label: "Affections de l'ongle et de la peau", href: 'pedicurie-affections-ongle-peau.html', img: 'ico-ongle.webp' },
        { label: 'Suivi des patients diabétiques', href: 'pedicurie-patients-diabetiques.html', ico: 'diabete' },
        { label: 'Verrues plantaires par cryothérapie', href: 'pedicurie-verrue-plantaire.html', img: 'ico-verrue.webp' },
      ],
    },
    podologie: {
      intro: "Analyser votre posture et votre marche pour soulager et prévenir durablement.",
      items: [
        { label: 'Bilan podologique', href: 'podologie-bilan-podologique.html', ico: 'bilan' },
        { label: 'Semelles orthopédiques sur mesure', href: 'podologie-semelles.html', img: 'ico-semelle.webp' },
      ],
    },
    reflexologie: {
      intro: "Un vrai moment de détente et de bien-être, par les pieds.",
      items: [
        { label: "Qu'est-ce que c'est ?", href: 'reflexologie.html#presentation', ico: 'question' },
        { label: 'Dans quel cas ?', href: 'reflexologie.html#dans-quel-cas', ico: 'cas' },
        { label: 'Le déroulé et les bienfaits', href: 'reflexologie.html#bienfaits', ico: 'bienfaits' },
      ],
    },
  };
  const cards = ACTIVITIES.map(a => {
    const c = HOME_CARDS[a.slug];
    const items = c.items.map(i => {
      const art = i.img
        ? `<img class="item-art" src="assets/${i.img}" alt="" width="30" height="30" loading="lazy" />`
        : `<svg viewBox="0 0 40 40">${ICONS[i.ico]}</svg>`;
      const inner = `<span class="item-icon" aria-hidden="true">${art}</span><span>${i.label}</span>`;
      return i.href
        ? `              <li><a href="${i.href}">${inner}</a></li>`
        : `              <li><span class="item-row">${inner}</span></li>`;
    }).join('\n');
    return `          <div class="activity-card" id="${a.slug}">
            <img class="card-hero" src="assets/${a.slug}.webp" alt="" width="132" height="132" loading="lazy" />
            <h3>${a.label}</h3>
            <span class="gold-line" aria-hidden="true"></span>
            <ul class="card-list">
${items}
            </ul>
          </div>`;
  }).join('\n');
  return `    <section id="accueil" class="hero">
      <div class="foots" aria-hidden="true"></div>
      <div class="container">
        <h1>Prenez soin de vous,<br />en commençant par vos pieds</h1>
        <div class="hero-actions">
          <a href="${DOCTOLIB}" target="_blank" rel="noopener" class="btn btn-primary">Prendre rendez-vous</a>
          <a href="#activites" class="btn btn-ghost">Découvrir mes soins</a>
        </div>
      </div>
    </section>

    <section id="activites" class="section section-blanc">
      <div class="container">
        <div class="section-head">
          <h2>Trois manières de prendre soin de vous</h2>
        </div>
        <p class="info-callout">Consulter un pédicure-podologue ne nécessite plus d'ordonnance de la part de votre médecin traitant dans le cadre des soins diabétiques, des semelles orthopédiques et des verrues plantaires. Votre praticien peut lui-même la rédiger.</p>
        <div class="card-grid">
${cards}
        </div>
      </div>
    </section>

    <section id="apropos" class="section">
      <div class="container apropos">
        <div class="apropos-photo">
          <img src="assets/portrait-clementine.jpg" alt="Clémentine Olive, pédicure-podologue et réflexologue à Fosses" width="732" height="1280" loading="lazy" />
        </div>
        <div>
          <h2>À propos de Clémentine Olive</h2>
          <p>Diplômée de pédicurie-podologie depuis juillet 2019, j'ai d'abord effectué des remplacements
             dans plusieurs cabinets et des collaborations, avant de m'installer à mon compte en avril 2023.</p>
          <p>Au cabinet, je pratique la <strong>pédicurie</strong> (coupe d'ongles, soin des mycoses,
             ongles incarnés…), la <strong>podologie</strong> (bilan podologique, confection de semelles
             orthopédiques) et la <strong>réflexologie plantaire</strong>.</p>
          <p>Je porte un intérêt particulier au bien-être de l'autre, et cela se retranscrit dans mes soins.</p>
          <h3 class="dip-titre">Diplômes</h3>
          <ul class="diplomes">
            <li><span class="dip-annee">2019</span> <span>Diplôme d'État de pédicure-podologue — École Supérieure de Masseurs-Kinésithérapeutes et Pédicures (ESMKP), Paris</span></li>
            <li><span class="dip-annee">2024</span> <span>Bilan diagnostique en podo-pédiatrie — connaissance et évolution</span></li>
            <li><span class="dip-annee">2026</span> <span>Certificat de Réflexologue — école E.T.R.E, Paris</span></li>
          </ul>
        </div>
      </div>
    </section>

    <section id="cabinet" class="section section-creme">
      <div class="container">
        <div class="section-head">
          <h2>Infos pratiques &amp; accès</h2>
          <p>Consultations uniquement sur rendez-vous.</p>
        </div>
        <div class="cabinet-top">
          <figure class="cabinet-photo">
            <img src="assets/cabinet.webp" alt="Le cabinet de Clémentine Olive à Fosses : espace lumineux et apaisant" width="933" height="700" loading="lazy" />
            <figcaption>5 place Denis Papin · 95470 Fosses</figcaption>
          </figure>
${mapEmbed()}
        </div>
      </div>
    </section>`;
}

function homePage() {
  return shell({
    title: "Clémentine Olive — Pédicure-Podologue & Réflexologue à Fosses (95)",
    description: "Clémentine Olive, pédicure-podologue diplômée d'État et réflexologue certifiée à Fosses (95470). Soins de pédicurie, podologie, semelles et réflexologie, au cabinet et à domicile.",
    active: 'index.html', body: homeBody(),
  });
}


/* ---------- Pages légales ---------- */
function legalPage({ heading, body }) {
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
  const body = `        <p>Conformément à la loi, voici les mentions légales du site.</p>
        <h2>Éditeur du site</h2>
        <p>Clémentine Olive — Pédicure-Podologue D.E, Réflexologue<br />
        ${ADRESSE.rue}, ${ADRESSE.cp} ${ADRESSE.ville}<br />
        Téléphone : ${TEL_PODO.txt}<br />
        SIRET : 852 373 281 00058<br />
        N° ADELI : 958000523 · N° RPPS : 10101834504</p>
        <h2>Directrice de la publication</h2>
        <p>Clémentine Olive</p>
        <h2>Hébergement</h2>
        <p>Ce site est hébergé par <strong>GitHub Pages</strong> — GitHub, Inc.<br />
        88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis<br />
        <a href="https://github.com" target="_blank" rel="noopener">github.com</a></p>
        <h2>Propriété intellectuelle</h2>
        <p>L'ensemble du contenu de ce site (textes, images, logo) est protégé. Toute reproduction sans autorisation est interdite.</p>
        <h2>Données personnelles</h2>
        <p>Les informations transmises via ce site sont traitées conformément à notre <a href="confidentialite.html">politique de confidentialité</a>.</p>`;
  return legalPage({ heading: 'Mentions légales', body });
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
  return legalPage({ heading: 'Politique de confidentialité', body });
}

/* ---------- Page Tarifs (regroupe les trois activités) ---------- */
function tarifsPage() {
  const blocs = ACTIVITIES.map(a => {
    const rose = a.color === 'rose';
    const rows = a.tarifs.map(([label, prix, mod]) =>
      !prix
        ? `            <li class="tarif-head"><span>${label}</span></li>`
        : `            <li${mod === 'sub' ? ' class="tarif-indent"' : ''}><span>${label}</span><span class="prix">${prix}</span></li>`).join('\n');
    return `        <div class="tarif-bloc${rose ? ' accent-rose' : ''}">
          <h2>${a.label}</h2>
          <ul class="tarif-liste">
${rows}
          </ul>
          ${a.tarifNote ? `<p class="tarif-note">${a.tarifNote}</p>` : ''}
        </div>`;
  }).join('\n');
  const body = `    <section class="page-hero">
      <div class="container">
        <h1>Tarifs</h1>
        <p class="lead">Les tarifs de la pédicurie, de la podologie et de la réflexologie.</p>
      </div>
    </section>

    <section class="section section-creme">
      <div class="container tarifs-page">
${blocs}
        <div class="tarifs-info">
          <p><strong>Consultation à domicile</strong> — je me déplace avec mon matériel de pédicurie ; prévoyez simplement une serviette de toilette de taille moyenne.</p>
          <p><strong>Zone d'action :</strong> Fosses, Marly-la-Ville, Survilliers, La Chapelle-en-Serval, Bellefontaine.</p>
        </div>
      </div>
    </section>`;
  return shell({
    title: "Tarifs — Clémentine Olive (Fosses 95)",
    description: "Tarifs de pédicurie, podologie et réflexologie de Clémentine Olive à Fosses (95470). Paiement : carte bancaire, chèque, espèces.",
    active: 'tarifs.html', body,
  });
}

/* ---------- Page FAQ (pédicurie & podologie) ---------- */
function faqPage() {
  const sections = [pedicurie, podologie].map(a => {
    const items = a.faq.map(([q, ans]) =>
      `          <details>
            <summary>${q}</summary>
            <div class="faq-body">${ans}</div>
          </details>`).join('\n');
    return `        <h2 class="faq-groupe">${a.label}</h2>
        <div class="faq">
${items}
        </div>`;
  }).join('\n');
  const body = `    <section class="page-hero">
      <div class="container">
        <h1>Questions fréquentes</h1>
        <p class="lead">Les réponses aux questions les plus courantes sur la pédicurie et la podologie.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
${sections}
      </div>
    </section>`;
  return shell({
    title: "Questions fréquentes — Clémentine Olive (Fosses 95)",
    description: "Questions fréquentes sur la pédicurie et la podologie — Clémentine Olive, pédicure-podologue à Fosses (95470).",
    active: 'faq.html', body,
  });
}

/* ---------- Page Réflexologie (page unique, sections à ancres) ---------- */
function reflexologiePage() {
  const a = reflexologie;
  const pres = a.subpages.find(s => s.slug === 'presentation');
  const cas = a.subpages.find(s => s.slug === 'dans-quel-cas');
  const bienfaits = a.subpages.find(s => s.slug === 'bienfaits');
  const renderBlocks = blocks => blocks.map(([h, content]) => {
    const head = h ? `        <h3>${h}</h3>\n` : '';
    return Array.isArray(content)
      ? `${head}        <ul>${content.map(li => `\n          <li>${li}</li>`).join('')}\n        </ul>`
      : `${head}        <p>${content}</p>`;
  }).join('\n');

  const body = `    <section id="presentation" class="page-hero hero-rose">
      <div class="container">
        <h1>Qu'est-ce que la réflexologie ?</h1>
        <p class="lead">7 200 terminaisons nerveuses dans chaque pied.</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="article">
${renderBlocks(pres.blocks)}
        </div>
      </div>
    </section>

    <section id="dans-quel-cas" class="section section-creme">
      <div class="container">
        <div class="section-head">
          <h2>Dans quel cas ?</h2>
        </div>
        <div class="article">
${renderBlocks(cas.blocks)}
        </div>
      </div>
    </section>

    <section id="bienfaits" class="section">
      <div class="container">
        <div class="section-head">
          <h2>Le déroulé et les bienfaits</h2>
        </div>
        <div class="article">
${renderBlocks(bienfaits.blocks)}
        </div>
      </div>
    </section>

${faqBlock(a, 'faq')}

    <section class="section section-creme">
      <div class="container">
        <div class="article">
          <div class="article-cta accent-rose">
            <div class="bloc-actions" style="justify-content:center">
              ${bookActions()}
            </div>
          </div>
        </div>
      </div>
    </section>`;
  return shell({
    title: "Réflexologie — Clémentine Olive à Fosses (95)",
    description: `Réflexologie plantaire par Clémentine Olive à Fosses (95470). ${a.lead}`,
    active: 'reflexologie.html', body,
  });
}

/* ---------- Page 404 (servie automatiquement par GitHub Pages) ---------- */
function notFoundPage() {
  const body = `    <section class="page-hero">
      <div class="container">
        <h1>Page introuvable</h1>
        <p class="lead">Désolée, cette page n'existe pas ou a été déplacée.</p>
        <div class="hero-actions" style="justify-content:center; margin-top:8px">
          <a href="/" class="btn btn-primary">Retour à l'accueil</a>
        </div>
      </div>
    </section>`;
  return shell({ title: "Page introuvable — Clémentine Olive", description: "Page introuvable.", active: '', body });
}

/* ---------- robots.txt & sitemap.xml ---------- */
function robotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`;
}
function sitemapXml(pages) {
  const urls = pages
    .filter(p => p.endsWith('.html') && p !== '404.html')
    .map(p => `  <url><loc>${p === 'index.html' ? SITE + '/' : SITE + '/' + p}</loc></url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/* ---------- Vérification des liens internes (garde-fou anti-lien-mort) ---------- */
function checkLinks(pages) {
  const names = new Set(Object.keys(pages));
  const staticFiles = new Set(['favicon.svg', 'styles.css', 'menu.js', 'robots.txt', 'sitemap.xml']);
  const idsByPage = {};
  for (const [name, html] of Object.entries(pages))
    idsByPage[name] = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  const problems = [];
  for (const [name, html] of Object.entries(pages)) {
    for (const m of html.matchAll(/href="([^"]+)"/g)) {
      const href = m[1];
      if (/^(https?:|tel:|mailto:)/.test(href) || href === '/' || href === '') continue;
      const [file, anchor] = href.split('#');
      if (file === '') { // ancre sur la même page
        if (anchor && !idsByPage[name].has(anchor)) problems.push(`${name} → #${anchor} (ancre absente)`);
        continue;
      }
      if (!names.has(file) && !staticFiles.has(file)) { problems.push(`${name} → ${file} (page inexistante)`); continue; }
      if (anchor && names.has(file) && !idsByPage[file].has(anchor)) problems.push(`${name} → ${href} (ancre #${anchor} absente de ${file})`);
    }
  }
  return problems;
}

/* ---------------- Écriture des fichiers ---------------- */
const out = [];
const pages = {};
const write = (name, html) => { writeFileSync(new URL(`./${name}`, import.meta.url), html); out.push(name); pages[name] = html; };

write('index.html', homePage());
write('tarifs.html', tarifsPage());
write('faq.html', faqPage());
write('mentions-legales.html', mentionsLegales());
write('confidentialite.html', confidentialite());
for (const a of ACTIVITIES) {
  if (a.slug === 'reflexologie') { write('reflexologie.html', reflexologiePage()); continue; }
  // Pédicurie & Podologie : plus de page d'atterrissage (les cartes de l'accueil font l'index),
  // on ne génère que les pages détaillées de chaque soin.
  for (const s of a.subpages) write(`${a.slug}-${s.slug}.html`, subPage(a, s));
}
write('404.html', notFoundPage());
// robots.txt & sitemap.xml (dérivés de la liste des pages)
writeFileSync(new URL('./robots.txt', import.meta.url), robotsTxt());
writeFileSync(new URL('./sitemap.xml', import.meta.url), sitemapXml(out));
const problems = checkLinks(pages);
if (problems.length) {
  console.error(`\n✗ ${problems.length} lien(s) interne(s) cassé(s) :\n  ` + problems.join('\n  '));
  process.exit(1);
}
console.log(`✓ ${out.length} pages générées + robots.txt + sitemap.xml · liens internes OK`);
