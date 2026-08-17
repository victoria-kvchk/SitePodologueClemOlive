/* =========================================================
   Générateur du site oliveclem.fr — Clémentine Olive
   Source unique -> pages HTML statiques (en-tête/pied partagés)
   Lancer : node build.mjs  (régénère toutes les pages + sitemap/robots)
   ========================================================= */
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

/* ---------------- Anti-cache des fichiers statiques ----------------
   styles.css et menu.js sont servis par GitHub Pages avec une durée de cache
   longue : sans repère de version, un visiteur déjà venu garde les anciens
   fichiers après une mise en production. On suffixe donc leur URL par une
   empreinte de leur contenu. Elle ne change que si le fichier change, donc le
   cache n'est invalidé qu'au moment utile — contrairement à une date de build,
   qui le viderait à chaque déploiement même sans modification. */
const empreintes = new Map();
function v(nom) {
  if (!empreintes.has(nom)) {
    const contenu = readFileSync(new URL(`./${nom}`, import.meta.url));
    empreintes.set(nom, createHash('sha256').update(contenu).digest('hex').slice(0, 8));
  }
  return `${nom}?v=${empreintes.get(nom)}`;
}

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
    { slug: 'affections-ongle-peau', title: "Affections de l'ongle et de la peau",
      teaser: "Ongle incarné, mycoses, cors, durillons, affections de la peau : je prends soin de tout cela.",
      blocks: [
        ['En quelques mots', "C'est un acte paramédical qui permet de traiter et de soulager, en douceur, les principales affections de l'ongle et de la peau du pied — avec des conseils personnalisés pour éviter qu'elles ne reviennent."],
        ['Ce que je prends en charge', ["Prise en charge et conseils de l'ongle incarné", "Prise en charge et conseils des ongles épais et/ou mycosés", "Prise en charge et conseils des ongles traumatisés et décollés", "Prise en charge et conseils des cors et durillons", "Prise en charge et conseils des affections de la peau (mycose, hypersudation, …)"]],
        ['En toute douceur', "Les soins sont réalisés avec des instruments adaptés et se font sans douleur. Le plus souvent, on ressent un vrai soulagement dès la fin de la séance."],
      ] },
    { slug: 'patients-diabetiques', title: 'Patients diabétiques',
      teaser: "Un suivi régulier pour prévenir les complications du pied diabétique.",
      blocks: [
        ['En quelques mots', "Une consultation régulière chez un pédicure-podologue permet de prévenir les risques de complication des pieds diabétiques liés à une neuropathie."],
        ['Une prise en charge par la Sécurité sociale', "Toute personne diabétique bénéficie d'au moins une séance par an prise en charge par la Sécurité sociale. Selon l'atteinte des membres inférieurs (gradation), cette prise en charge peut aller jusqu'à 8 séances par an, sur ordonnance."],
        // Une entrée par grade, pour être rendues en liste à coches séparées
        // d'un filet tiretté, comme la boîte des grades en regard.
        ['Tarifs & prise en charge', [
          "<strong>Grade 0 et 1</strong> — Prise en charge : 1 séance par an prise en charge à 100 % par la Sécurité sociale, soit 30 € (pensez à demander votre bilan).<br />Les séances suivantes sont à 38 €.",
          "<strong>Grade 2 et 3</strong> — prise en charge à 100 %, sur ordonnance : 1ʳᵉ séance 35,70 €, puis 30 € les séances suivantes.<br />Une gradation est réalisée à chaque nouvelle ordonnance.",
        ]],
        ['Les grades de prise en charge', ["<strong>Grade 0</strong> — absence de neuropathie sensitive (1 séance/an).", "<strong>Grade 1</strong> — neuropathie sensitive isolée, légère perte de sensibilité (1 séance/an).", "<strong>Grade 2</strong> — neuropathie sensitive associée à une artériopathie des membres inférieurs et/ou une déformation des pieds (5 séances/an).", "<strong>Grade 3</strong> — antécédent d'ulcération ou d'amputation, ou plaie ne cicatrisant pas depuis plus de 3 mois (8 séances/an)."]],
        ['Syndrome main-pied', "Une prise en charge du syndrome main-pied est également possible pour les patients sous traitement anti-cancéreux : 2 séances remboursées par la Sécurité sociale, sur prescription de votre oncologue."],
      ] },
    { slug: 'verrue-plantaire', title: 'Soin des verrues plantaires par cryothérapie',
      teaser: "Un traitement par le froid, sans douleur, sans saignement et sans anesthésie.",
      blocks: [
        ['En quelques mots', "Le traitement des verrues plantaires utilise le Freezpen, un instrument de cryochirurgie précis. On vient « geler » la verrue : c'est sans douleur, sans saignement et sans anesthésie."],
        // Les trois phrases de la cliente, découpées telles quelles pour être
        // rendues en liste : aucun mot n'est modifié, seule la ponctuation de
        // fin de phrase disparaît.
        ['Comment ça fonctionne', [
          "Le Freezpen utilise l'oxyde nitreux, un gaz cryogénique qui agit à -85 °C",
          "Cette basse température produit un choc thermique très rapide qui congèle les cellules de la verrue en toute sécurité",
          "Grâce à trois embouts de diamètres différents, le geste est précis et protège les tissus sains autour de la lésion",
        ]],
        ['Prise en charge', "Le soin est pris en charge par la Sécurité sociale : jusqu'à 5 séances, à hauteur de 20 € par consultation."],
      ] },
  ],
  faq: [
    ['Comment soignez-vous un ongle incarné ?', "Le soin consiste à retirer délicatement la partie responsable de la douleur, désinfecter la zone et donner des conseils afin d'éviter les récidives."],
    ['Les soins sont-ils douloureux ?', "Non. Les soins de pédicurie sont réalisés avec des instruments adaptés et se font sans douleur. Le plus souvent, on ressent un vrai soulagement dès la fin de la séance."],
    ['Comment enlever un cor au pied ?', "Le cor est retiré normalement sans douleur à l'aide d'instruments spécifiques."],
    ['Traitez-vous les verrues plantaires ?', "Oui. Une prise en charge est proposée avec des conseils adaptés afin de favoriser leur disparition et limiter leur propagation."],
    ['À quelle fréquence faut-il faire un soin de pédicurie ?', "Pour la majorité des patients, un entretien tous les 2 à 4 mois est suffisant. Pour les personnes diabétiques, un suivi régulier permet de prévenir les plaies et d'éviter les complications."],
    ['Les soins pour les patients diabétiques sont-ils pris en charge ?', "Dans certaines situations, notamment pour les patients présentant un risque podologique identifié, des séances peuvent être prises en charge selon les critères en vigueur."],
    ['Comment bien couper ses ongles ?', "Coupez l'ongle le plus droit possible, sans toucher aux coins. Il faut éviter de couper les ongles trop courts : cela évite les ongles incarnés, les petites blessures et peut causer un épaississement des ongles par la suite. Préférez une lime pour arrondir les bords plutôt que d'arracher les petites peaux. Pensez également à bien sécher entre les orteils après la toilette pour limiter les risques de macération et de mycose.<br /><br />Si la coupe est difficile pour vous ou pour un proche — vue, souplesse, diabète —, je peux m'en occuper en toute sécurité, au cabinet ou à domicile."],
  ],
  tarifs: [
    ['Soin de pédicurie', '38 €'],
    ['Soin à domicile (selon la localisation)', '45 – 47 €'],
    ['Soin à domicile pour deux personnes', '83 €'],
    ['Verrue plantaire par cryothérapie (la séance)', '20 – 38 €'],
    ['Soins pour patients diabétiques', '<a href="pedicurie.html#patients-diabetiques">voir le détail</a>'],
  ],
  tarifNote: "Paiement : carte bancaire, chèque, espèces.",
};

const podologie = {
  slug: 'podologie', label: 'Podologie', color: 'vert',
  lead: "J'analyse votre posture et votre marche pour soulager les douleurs et prévenir les troubles du pied et du corps.",
  subpages: [
    { slug: 'bilan-podologique', title: 'Bilan podologique',
      teaser: "Une évaluation détaillée de la posture et de la marche, à tout âge.",
      blocks: [
        ['En quelques mots', "Le bilan podologique est une évaluation détaillée de la posture et de la marche, à tout âge et pour tout le monde. Il permet de comprendre l'origine de vos douleurs ou de votre gêne : j'observe la posture, la marche, les appuis et l'état de vos pieds, et je vous conseille sur le chaussant."],
        ['Dans quels cas ?', ['Douleurs aux pieds, aux genoux, aux hanches ou au dos', 'Gêne à la marche ou déséquilibre', 'Suivi de croissance chez l\'enfant', 'Contrôle chez le sportif']],
        ['Comment ça se passe', "Le bilan est indolore. À l'issue, je vous explique clairement mes constats et, si nécessaire, je vous propose des semelles sur mesure ou des conseils adaptés."],
      ] },
    { slug: 'semelles', title: 'Semelles orthopédiques',
      teaser: "Des semelles sur mesure pour corriger l'appui et soulager durablement.",
      blocks: [
        ['En quelques mots', "Les semelles orthopédiques (orthèses plantaires) sont conçues sur mesure à partir de votre bilan. Elles corrigent l'appui, soulagent les douleurs et améliorent le confort au quotidien."],
        ['Les bénéfices', ['Soulagement des douleurs à l\'appui', 'Meilleur équilibre à la marche', 'Prévention des déformations et de l\'usure', 'Confort dans la plupart des chaussures']],
        ['De la prise d\'empreinte au suivi', "Je réalise la prise d'empreinte, je conçois vos semelles, puis nous faisons un essayage. Un suivi permet de les ajuster dans le temps pour un confort durable."],
      ] },
  ],
  faq: [
    ['Faut-il une ordonnance pour consulter ?', "Non. Vous pouvez consulter directement un pédicure-podologue sans prescription médicale."],
    ['Combien dure une consultation ?', "Selon le motif de consultation, comptez entre 30 et 45 minutes."],
    ['Comment se déroule un bilan podologique ?', "Le bilan comprend un entretien, l'étude de vos antécédents, l'examen de vos pieds, de votre posture et de votre marche afin de déterminer l'origine de vos douleurs et d'évaluer l'intérêt de semelles orthopédiques."],
    ['Quand faut-il porter des semelles orthopédiques ?', "Les semelles sont indiquées lorsque les douleurs proviennent d'un mauvais appui ou d'un déséquilibre biomécanique. Elles peuvent soulager les douleurs du pied, du talon, du genou, de la hanche ou du dos."],
    ['Les semelles sont-elles fabriquées sur mesure ?', "Oui. Chaque paire est entièrement réalisée selon votre morphologie, vos activités et les résultats du bilan podologique."],
    ['Combien de temps faut-il pour s\'habituer aux semelles ?', "Une période d'adaptation de quelques jours à trois semaines est généralement nécessaire. Les semelles sont introduites progressivement afin de permettre au corps de s'adapter."],
    ['Combien de temps durent des semelles orthopédiques ?', "En moyenne entre 12 et 24 mois, selon leur utilisation, votre activité physique et l'évolution de votre posture."],
    ['Les semelles sont-elles remboursées ?', "Une partie peut être prise en charge par l'Assurance Maladie sur prescription médicale. De nombreuses mutuelles complètent ce remboursement, n'hésitez pas à vous renseigner."],
    ['Peut-on mettre les semelles dans toutes les chaussures ?', "Elles sont conçues pour s'adapter au type de chaussures que vous portez le plus souvent. Si nécessaire, des ajustements peuvent être réalisés."],
    ['Mon enfant a les pieds plats, faut-il consulter ?', "Chez le jeune enfant, les pieds plats sont souvent physiologiques. En revanche, si cela s'accompagne de douleurs, de chutes fréquentes ou d'une gêne à la marche, un bilan est recommandé."],
    ['À partir de quel âge un enfant peut-il porter des semelles ?', "Il n'existe pas d'âge fixe. La décision dépend uniquement du bilan clinique et des besoins de l'enfant (généralement vers 5 – 6 ans)."],
    ['Comment choisir de bonnes chaussures ?', "Des chaussures adaptées doivent respecter la largeur du pied, offrir un bon maintien du talon et présenter une semelle suffisamment souple. Vos orteils doivent pouvoir s'étaler les uns à coté des autres."],
    ['Les douleurs de dos peuvent-elles venir des pieds ?', "Oui. Un mauvais appui peut modifier la posture et entraîner des douleurs au niveau des genoux, des hanches ou du dos."],
    ['Que dois-je apporter lors de mon premier rendez-vous ?', "Pensez à apporter vos anciennes semelles si vous en possédez, vos chaussures les plus utilisées (ville ou sport), vos examens médicaux récents si vous en avez et éventuellement votre ordonnance si vous en avez une."],
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
    { slug: 'presentation', title: "Qu'est-ce que la réflexologie ?",
      teaser: "Une pratique de bien-être douce, par des pressions sur des zones du pied.",
      blocks: [
        ['En quelques mots', "La réflexologie plantaire est une technique manuelle qui consiste à exercer des pressions rythmées sur des zones réflexes de vos pieds. Ces zones sont reliées, par l'intermédiaire de terminaisons nerveuses, à différents organes, glandes ou parties du corps."],
        ["L'objectif", "Aider le corps à retrouver son équilibre naturel par auto-régulation, soulager les tensions et favoriser le bien-être global."],
        ['Bon à savoir', "La réflexologie plantaire est une pratique de bien-être complémentaire à la pédicurie-podologie. Elle ne se substitue en aucun cas à un suivi médical. Le bilan n'est pas un diagnostic, mais il sert au praticien à établir un protocole de massage adapté. Le réflexologue ne soigne pas, ne guérit pas."],
      ] },
    { slug: 'dans-quel-cas', title: 'Dans quel cas ?',
      teaser: "Les indications et les contre-indications d'une séance.",
      blocks: [
        ['Indications', ["En cas de stress : chronique, à l'approche d'un examen, à la suite d'un événement marquant…", "En cas de déséquilibre ou de troubles d'un système : respiratoire, digestif, sommeil…", "En cas de douleurs musculaires et/ou articulaires : arthrose, troubles inflammatoires, tendinite", "Au début du printemps, avant l'arrivée des pollens, en cas d'allergie", "En cas de problèmes cutanés : psoriasis, eczéma…", "Si vous ressentez une sensation de jambes lourdes"]],
        ['Contre-indications', "Il n'est pas recommandé de faire une séance si :"],
        ['', ["Vous êtes malade ou avez de la fièvre", "Vous êtes enceinte de moins de 3 mois", "Vous avez une phlébite", "Vous avez eu une entorse à une cheville il y a moins de 3 mois"]],
      ] },
    { slug: 'bienfaits', title: 'Le déroulé et les bienfaits',
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
    ['Dois-je prévoir un temps de repos après la séance ?', "Ce n'est pas indispensable, mais si votre emploi du temps le permet, prendre quelques minutes pour prolonger l'état de détente est souvent apprécié."],
    ['Puis-je conduire après une séance ?', "Oui. La réflexologie n'empêche pas de conduire. Si vous vous sentez particulièrement détendu(e), prenez simplement quelques minutes avant de reprendre la route."],
    ['Puis-je venir si je suis très stressé(e) ou anxieux(se) ?', "Oui. De nombreuses personnes consultent justement pendant une période de stress professionnel, familial ou émotionnel afin de s'accorder un moment de détente."],
    ['Y a-t-il des effets secondaires possibles ?', "La réflexologie est bien tolérée. Après une séance, on peut parfois ressentir une grande détente, une fatigue passagère. Cela est souvent lié au lâcher-prise. On peut également avoir une envie d'uriner plus fréquente. D'autres, au contraire, se sentent plus dynamiques. Chaque organisme réagit différemment. Ce sont des réactions bénignes et temporaires. Pensez à bien vous hydrater."],
    ['La réflexologie est-elle adaptée aux sportifs ?', "Oui. Les sportifs apprécient la réflexologie pour favoriser la récupération, relâcher les tensions et s'offrir un moment de récupération entre deux entraînements."],
    ['Peut-on offrir une séance de réflexologie ?', "Oui. Une séance constitue un cadeau apprécié pour un anniversaire, la fête des Mères, Noël ou simplement pour offrir un moment de détente."],
    ['Faut-il prendre rendez-vous à l\'avance ?', "Oui, les séances se font uniquement sur rendez-vous, en ligne sur Doctolib. Cela me permet de vous accueillir dans les meilleures conditions et de vous consacrer tout le temps nécessaire."],
    ['Dois-je retirer mes bijoux ou ma montre ?', "Ce n'est généralement pas nécessaire, sauf s'ils gênent votre confort pendant la séance."],
    ['Puis-je venir si j\'ai des chatouilles aux pieds ?', "Oui. Les mouvements utilisés en réflexologie sont des pressions précises, très différentes d'un simple effleurement. Les personnes sensibles aux chatouilles sont souvent surprises de constater que cette sensation disparaît rapidement."],
    ['Combien de temps durent les effets d\'une séance ?', "Les ressentis varient d'une personne à l'autre. Certaines personnes se sentent détendues pendant plusieurs jours, d'autres apprécient surtout le moment de relaxation vécu pendant la séance."],
    ['La réflexologie est-elle adaptée pendant les périodes de changements de vie ?', "Oui. Beaucoup de personnes choisissent la réflexologie lors d'un changement professionnel, d'un examen, d'un déménagement ou d'une période de fatigue afin de prendre un temps pour elles."],
    ['Puis-je venir simplement pour prendre soin de moi ?', "Absolument. Il n'est pas nécessaire d'attendre d'être fatigué(e) ou stressé(e). Beaucoup de personnes intègrent la réflexologie dans leur routine bien-être."],
    ['Faut-il réserver plusieurs séances dès le départ ?', "Non. La première séance permet d'échanger sur vos attentes. Vous décidez ensuite librement si vous souhaitez poursuivre l'accompagnement."],
    ['Combien de séances sont nécessaires pour ressentir des effets ?', "Cela varie d'une personne à l'autre. Beaucoup ressentent une détente dès la première séance. Pour un réel bénéfice dans la durée, 3 à 5 séances sont généralement recommandées. Nous en parlons ensemble selon votre ressenti."],
    ['La réflexologie aide-t-elle à gérer le stress et l\'anxiété ?', "La réflexologie est avant tout une pratique de détente. En favorisant un relâchement profond, elle peut aider à apaiser les tensions liées au stress et à retrouver un sentiment de calme. C'est un accompagnement du bien-être, qui ne remplace pas un suivi médical ou psychologique si celui-ci est nécessaire."],
    ['La réflexologie peut-elle agir sur les douleurs chroniques ?', "La réflexologie n'est pas un traitement de la douleur et ne se substitue pas à une prise en charge médicale. En procurant un moment de détente et en aidant à relâcher les tensions, elle peut toutefois être un complément agréable au bien-être. En cas de douleur, parlez-en d'abord à votre médecin."],
    ['Comment se préparer avant une séance ?', "Aucune préparation particulière n'est nécessaire. Prévoyez simplement une tenue confortable, évitez un repas trop lourd juste avant, et venez avec des pieds propres. Pour le reste, vous n'avez qu'à vous détendre."],
    ['Est-ce que c\'est douloureux ?', "Non. Les pressions sont douces et adaptées à votre sensibilité. La séance doit rester un moment agréable : n'hésitez jamais à me signaler une gêne, j'ajuste aussitôt."],
    ['La réflexologie est-elle sans danger ?', "Pratiquée dans le respect de quelques précautions, la réflexologie est douce et non invasive. Elle reste une pratique de bien-être : en cas de problème de santé, elle vient en complément d'un suivi médical, jamais à sa place. Si vous êtes suivi par un médecin spécialiste, n'hésitez pas à lui demander son avis."],
    ['Peut-on pratiquer la réflexologie sur les femmes enceintes ?', "La réflexologie peut être envisagée pendant la grossesse, avec précautions et généralement pas durant le premier trimestre. Prévenez-moi si vous êtes enceinte : j'adapte la séance, et l'accord de votre médecin ou de votre sage-femme est recommandé."],
    ['Est-ce adapté aux enfants et aux personnes âgées ?', "Oui. La douceur de la pratique convient aussi bien aux enfants qu'aux personnes âgées. La séance est simplement adaptée (durée, intensité des pressions) à chacun."],
    ['La réflexologie est-elle remboursée par la sécurité sociale ou les mutuelles ?', "La réflexologie est une pratique de bien-être : elle n'est pas remboursée par l'Assurance Maladie. Certaines mutuelles proposent toutefois une prise en charge partielle des médecines douces — renseignez-vous auprès de la vôtre."],
  ],
  tarifs: [
    ["Séance découverte ou relaxation<span class='tarif-sub'>De 20 à 30 min · pour découvrir la réflexologie ou simplement se détendre.</span>", '30 €'],
    ["Séance longue sur-mesure :<span class='tarif-sub'>De 45 min à 1h15 · bilan complet et suivi personnalisé.</span>", ''],
    ['1ʳᵉ séance', '60 €', 'sub'],
    ['Séances de suivi', '55 €', 'sub'],
    ['Pour les plus jeunes :', ''],
    ["Séance enfant<span class='tarif-sub'>De 15 à 30 min</span>", '30 €', 'sub'],
    ["Séance étudiante<span class='tarif-sub'>De 30 à 45 min · sur présentation d'un justificatif</span>", '40 €', 'sub'],
  ],
  tarifNote: "Pensez à demander une facture pour votre mutuelle. Paiement accepté : carte bancaire et espèces.",
};

const ACTIVITIES = [pedicurie, podologie, reflexologie];

/* ---------------- Chrome partagé (en-tête / pied) ---------------- */
const NAV = [
  // sansSurlignage : pas de pastille verte « page courante » sur l'accueil
  // (l'attribut aria-current reste posé pour les lecteurs d'écran)
  { href: 'index.html', label: 'Accueil', sansSurlignage: true },
  { href: 'index.html#apropos', label: 'À propos' },
  { label: 'Pédicurie & Podologie', children: [
    { href: 'pedicurie.html', label: 'Soins de pédicurie' },
    { href: 'podologie.html', label: 'La Podologie' },
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
  const navLink = (href, label, sansSurlignage) =>
    `<a href="${href}"${href === active ? ` aria-current="page"${sansSurlignage ? '' : ' class="is-active"'}` : ''}>${label}</a>`;
  // Page seule, sans l'ancre : « reflexologie.html#bienfaits » -> « reflexologie.html »
  const page = href => href.split('#')[0];
  // Si la page courante est déjà une entrée de premier niveau (Accueil, Tarifs…),
  // aucun groupe ne doit s'allumer — même si un sous-lien pointe vers une ancre
  // de cette page (ex. « La Podologie » = index.html#podologie sur l'accueil).
  const dejaTopNiveau = NAV.some(i => i.href && i.href === active);
  const items = NAV.map(item => {
    if (!item.children) return navLink(item.href, item.label, item.sansSurlignage);
    const childActive = !dejaTopNiveau && active !== '' &&
      item.children.some(c => page(c.href) === page(active));
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
        <span class="brand-sub">Pédicure-Podologue<br />Réflexologue</span>
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
        <p class="footer-brand-sub">Pédicure-Podologue D.E<br />Réflexologue</p>
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
    // « à domicile » est rattaché à la pédicurie seule : la réflexologie ne
    // se pratique qu'au cabinet depuis le retrait de la séance à domicile.
    description: "Pédicure-podologue diplômée d'État et réflexologue certifiée à Fosses (95). Pédicurie au cabinet et à domicile, podologie, semelles orthopédiques et réflexologie.",
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
  <link rel="stylesheet" href="${v('styles.css')}" />
  <link rel="icon" href="${v('favicon.svg')}" type="image/svg+xml" />
${jsonLd()}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
  <a href="#contenu" class="skip-link">Aller au contenu</a>
${header(active)}
  <main id="contenu">
${body}
  </main>
${footer()}
  <script src="${v('menu.js')}"></script>
  <script src="${v('footprints.js')}"></script>
</body>
</html>
`;
}

/* ---------------- Composants réutilisables ---------------- */
// Bouton de réservation : toutes les activités passent par Doctolib.
const bookActions = () =>
  `<a href="${DOCTOLIB}" target="_blank" rel="noopener" class="btn btn-primary">Rendez-vous sur Doctolib</a>`;

/* Questions réparties en deux colonnes réellement indépendantes, et non en
   grille : dans une grille, une ligne prend la hauteur de sa plus haute carte,
   et une question courte face à une question sur deux lignes creuse un vide
   sous elle. Deux colonnes séparées gardent un espacement régulier. */
function faqColonnes(qr) {
  const item = ([q, ans]) =>
    `            <details>
              <summary>${q}</summary>
              <div class="faq-body">${ans}</div>
            </details>`;
  const moitie = Math.ceil(qr.length / 2);
  const colonne = liste => `          <div class="faq-colonne">
${liste.map(item).join('\n')}
          </div>`;
  return `${colonne(qr.slice(0, moitie))}
${colonne(qr.slice(moitie))}`;
}

function faqBlock(a, id = '') {
  return `    <section${id ? ` id="${id}"` : ''} class="section">
      <div class="container">
        <div class="section-head">
          <h2>Questions fréquentes</h2>
        </div>
        <div class="faq">
${faqColonnes(a.faq)}
        </div>
      </div>
    </section>`;
}

// Carte Google Maps en chargement au clic (RGPD)
function mapEmbed() {
  return `        <div class="map-embed" id="map-embed" data-src="${MAPS_EMBED}">
          <div class="map-consent">
            <svg class="ico" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.7 7-12A7 7 0 0 0 5 9c0 5.3 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>
            <p>La carte est fournie par Google Maps. En l'affichant, vous acceptez le dépôt de cookies par Google.</p>
            <button type="button" id="map-load" class="btn btn-primary">Afficher la carte</button>
            <p><a href="${MAPS_LINK}" target="_blank" rel="noopener">Ouvrir dans Google Maps</a></p>
          </div>
        </div>`;
}

/* ---------------- Pages ---------------- */
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
        { label: "Affections de l'ongle et de la peau", href: 'pedicurie.html#affections-ongle-peau', img: 'ico-ongle.webp' },
        { label: 'Suivi des patients diabétiques', href: 'pedicurie.html#patients-diabetiques', ico: 'diabete' },
        { label: 'Verrues plantaires par cryothérapie', href: 'pedicurie.html#verrue-plantaire', img: 'ico-verrue.webp' },
      ],
    },
    podologie: {
      intro: "Analyser votre posture et votre marche pour soulager et prévenir durablement.",
      items: [
        { label: 'Bilan podologique', href: 'podologie.html#bilan-podologique', ico: 'bilan' },
        { label: 'Semelles orthopédiques sur mesure', href: 'podologie.html#semelles', img: 'ico-semelle.webp' },
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

    <section id="apropos" class="section section-apropos">
      <div class="container apropos">
        <div class="apropos-photo">
          <img src="assets/portrait-clementine.jpg" alt="Clémentine Olive, pédicure-podologue et réflexologue à Fosses" width="720" height="960" loading="lazy" />
        </div>
        <div>
          <h2>À propos de moi</h2>
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

    <section id="cabinet" class="section section-blanc">
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
    description: "Clémentine Olive, pédicure-podologue et réflexologue à Fosses (95470). Pédicurie au cabinet et à domicile, podologie, semelles orthopédiques et réflexologie.",
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
  const body = `        <p>Cette page décrit comment vos données sont traitées lors de votre visite.</p>
        <h2>Responsable du traitement</h2>
        <p>Clémentine Olive, ${ADRESSE.rue}, ${ADRESSE.cp} ${ADRESSE.ville}.</p>
        <h2>Données collectées</h2>
        <p>Ce site vitrine ne collecte pas de compte ni de formulaire. La prise de rendez-vous en ligne est réalisée via <strong>Doctolib</strong>, sur son propre site, soumis à sa politique de confidentialité.</p>
        <h2>Cookies et services tiers</h2>
        <ul>
          <li><strong>Google Maps</strong> : la carte n'est chargée qu'après votre clic explicite (« Afficher la carte »). Aucun cookie Google n'est déposé tant que vous ne l'affichez pas.</li>
          <li><strong>Doctolib</strong> : la réservation vous redirige vers le site de Doctolib.</li>
          <li><strong>Google Fonts</strong> : les polices sont chargées depuis les serveurs de Google.</li>
        </ul>
        <h2>Vos droits</h2>
        <p>Vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer, contactez le cabinet au ${TEL_PODO.txt}.</p>`;
  return legalPage({ heading: 'Politique de confidentialité', body });
}

/* ---------- Page Tarifs (regroupe les trois activités) ---------- */
function tarifsPage() {
  const blocs = ACTIVITIES.map(a => {
    const rows = a.tarifs.map(([label, prix, mod]) =>
      !prix
        ? `            <li class="tarif-head"><span>${label}</span></li>`
        : `            <li${mod === 'sub' ? ' class="tarif-indent"' : ''}><span>${label}</span><span class="prix">${prix}</span></li>`).join('\n');
    // Les trois blocs sont traités à l'identique : même titre vert, sans accent
    // propre à l'activité.
    return `        <div class="tarif-bloc">
          <img class="card-hero" src="assets/${a.slug}.webp" alt="" width="132" height="132" loading="lazy" />
          <h2>${a.label}</h2>
          <span class="gold-line" aria-hidden="true"></span>
          <ul class="tarif-liste">
${rows}
          </ul>
          ${a.tarifNote ? `<p class="tarif-note">${a.tarifNote}</p>` : ''}
        </div>`;
  });
  // L'encart domicile suit le bloc Pédicurie : il ne concerne que ces soins,
  // le matériel évoqué étant celui de la pédicurie.
  const encartDomicile = `        <div class="tarifs-info">
          <p><strong>Consultation à domicile</strong> — je me déplace avec mon matériel de pédicurie ; prévoyez simplement une serviette de toilette de taille moyenne.</p>
          <p><strong>Zone d'action :</strong> Fosses, Marly-la-Ville, Survilliers, La Chapelle-en-Serval, Bellefontaine.</p>
        </div>`;
  const iPedicurie = ACTIVITIES.findIndex(a => a.slug === 'pedicurie');
  blocs.splice(iPedicurie + 1, 0, encartDomicile);
  const body = `    <section class="page-hero">
      <div class="container">
        <h1>Tarifs</h1>
        <p class="lead">Les tarifs de la pédicurie, de la podologie et de la réflexologie.</p>
      </div>
    </section>

    <section class="section section-blanc">
      <div class="container tarifs-page">
${blocs.join('\n')}
      </div>
    </section>`;
  return shell({
    title: "Tarifs — Clémentine Olive (Fosses 95)",
    description: "Tarifs de pédicurie, podologie et réflexologie de Clémentine Olive à Fosses (95470). Paiement : carte bancaire, chèque, espèces.",
    active: 'tarifs.html', body,
  });
}

/* Questions communes aux deux disciplines, affichées en tête de faq.html. */
const FAQ_GENERALE = [
  ['Quand consulter un pédicure-podologue ?', "Il est conseillé de consulter dès l'apparition d'une douleur au pied, d'un inconfort à la marche ou à la course, d'un ongle incarné, de cors, de callosités ou de verrues plantaires. Une consultation peut également être indiquée en cas de douleurs aux genoux, aux hanches ou au dos lorsqu'elles sont liées à un trouble de l'appui ou de la posture. Un bilan permet d'identifier la cause du problème et de proposer une prise en charge adaptée."],
  ['Quelle est la différence entre un pédicure et un podologue ?', "Le pédicure-podologue est un professionnel de santé diplômé d'État. Il prend en charge les soins des pieds (ongles incarnés, cors, callosités, crevasses…) mais réalise également des bilans biomécaniques, des analyses de la marche et confectionne des semelles orthopédiques sur mesure pour corriger certains troubles fonctionnels."],
  ['Comment prendre rendez-vous ?', "Vous pouvez prendre rendez-vous directement via le bouton de réservation présent sur le site ou contacter le cabinet par téléphone."],
];

/* ---------- Page FAQ (pédicurie & podologie) ---------- */
function faqPage() {
  const groupe = (titre, qr) => `        <h2 class="faq-groupe">${titre}</h2>
        <div class="faq">
${faqColonnes(qr)}
        </div>`;
  const sections = [
    groupe('Questions générales', FAQ_GENERALE),
    ...[pedicurie, podologie].map(a => groupe(a.label, a.faq)),
  ].join('\n');
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

/* ---------- Page Réflexologie (page unique, sections à ancres) ----------
   Même système de cartes que Pédicurie et Podologie : une .soin-card par
   section, en-tête centré, et deux colonnes là où le contenu s'y prête. */
function reflexologiePage() {
  const a = reflexologie;
  const pres = a.subpages.find(s => s.slug === 'presentation');
  const cas = a.subpages.find(s => s.slug === 'dans-quel-cas');
  const bienfaits = a.subpages.find(s => s.slug === 'bienfaits');
  const bloc = (blocks, titre) => (blocks.find(x => x[0] === titre) || [null, ''])[1];
  // Paragraphes qui suivent un intitulé, jusqu'au prochain intitulé.
  const suite = (blocks, titre) => {
    const i = blocks.findIndex(x => x[0] === titre);
    const out = [];
    for (let k = i + 1; k < blocks.length && blocks[k][0] === ''; k++) out.push(blocks[k][1]);
    return out;
  };
  const paras = t => t.map(p => `              <p>${p}</p>`).join('\n');
  const carte = (id, entete, contenu, cls = '') => `    <section${id ? ` id="${id}"` : ''} class="soin-sec">
      <div class="container">
        <article class="soin-card${cls ? ' ' + cls : ''}">
${entete ? entete + '\n' : ''}${contenu}
        </article>
      </div>
    </section>`;
  const enteteCentre = titre => `          <header class="carte-head">
            <h2>${titre}</h2>
            <span class="gold-line" aria-hidden="true"></span>
          </header>`;

  // 1 — Présentation : les trois blocs empilés dans une carte.
  const presentation = carte('', '', pres.blocks.map(([h, texte]) =>
    `          <h3 class="soin-sub">${h}</h3>
          <p>${texte}</p>`).join('\n'));

  // 2 — La cartographie, dans sa propre carte.
  const cartographie = carte('', '', `          <figure class="illustration">
            <a href="assets/reflexologie-cartographie.jpg" target="_blank" rel="noopener">
              <img src="assets/reflexologie-cartographie.jpg" alt="Cartographie de réflexologie plantaire : zones réflexes des pieds correspondant aux organes et systèmes du corps" width="1600" height="2264" loading="lazy" />
            </a>
            <figcaption>Cartographie de réflexologie plantaire — © École Être, <a href="https://www.reflexos.fr" target="_blank" rel="noopener">reflexos.fr</a>. Reproduite avec leur autorisation.</figcaption>
          </figure>`);

  // 3 — Indications à gauche, contre-indications à droite.
  const dansQuelCas = carte('dans-quel-cas', enteteCentre('Dans quel cas ?'), `          <div class="soin-grid">
            <div class="soin-main">
              <h3 class="soin-sub">Indications</h3>
              ${iconList(ico.check, bloc(cas.blocks, 'Indications'))}
            </div>
            <div class="soin-side">
              <h3 class="soin-sub">Contre-indications</h3>
              <p>${bloc(cas.blocks, 'Contre-indications')}</p>
              ${iconList(ico.alerte, suite(cas.blocks, 'Contre-indications')[0])}
            </div>
          </div>`, 'soin-card--teinte');

  // 4 — Déroulé à gauche, bienfaits à droite, effets secondaires dessous.
  const deroule = carte('bienfaits', enteteCentre('Le déroulé et les bienfaits'), `          <div class="soin-grid">
            <div class="soin-main">
              <h3 class="soin-sub">Déroulé d'une séance</h3>
              <p>${bloc(bienfaits.blocks, "Déroulé d'une séance")}</p>
${paras(suite(bienfaits.blocks, "Déroulé d'une séance"))}
            </div>
            <div class="soin-side">
              <h3 class="soin-sub">Les bienfaits</h3>
              ${iconList(ico.check, bloc(bienfaits.blocks, 'Les bienfaits'))}
${mint(null, 'Effets secondaires possibles', [bloc(bienfaits.blocks, 'Effets secondaires possibles'), ...suite(bienfaits.blocks, 'Effets secondaires possibles')].join(' '))}
            </div>
          </div>`);

  const body = `    <section id="presentation" class="page-hero hero-rose">
      <div class="container">
        <h1>Qu'est-ce que la réflexologie ?</h1>
        <p class="lead">7 200 terminaisons nerveuses dans chaque pied.</p>
      </div>
    </section>

${presentation}

${cartographie}

${dansQuelCas}

${deroule}

${faqBlock(a, 'faq')}

    <section class="section">
      <div class="container">
        <div class="article-cta">
          <p>Une question ou envie de prendre rendez-vous ?</p>
          <div class="bloc-actions" style="justify-content:center">
            ${bookActions()}
          </div>
        </div>
      </div>
    </section>`;
  return shell({
    title: "Réflexologie — Clémentine Olive à Fosses (95)",
    description: `Réflexologie plantaire par Clémentine Olive à Fosses (95470). ${a.lead}`,
    active: 'reflexologie.html', bodyClass: 'page-reflexologie', body,
  });
}

/* ---------- Briques partagées des pages de soins ----------
   Une carte .soin-card par soin : pastille, colonne principale, colonne
   latérale, plus un bloc pleine largeur optionnel. Communes à Pédicurie et
   Podologie pour que les deux pages aient rigoureusement la même allure. */

// Récupère le contenu d'un bloc de données par son intitulé.
const B = (blocks, h) => (blocks.find(b => b[0] === h) || [null, ''])[1];

const ico = {
  ongle:   '<img src="assets/ico-ongle.webp" alt="" width="120" height="120" loading="lazy" />',
  semelle: '<img src="assets/ico-semelle.webp" alt="" width="120" height="120" loading="lazy" />',
  bilan:   '<svg viewBox="0 0 40 40"><path d="M11 8h18v25H11z"/><path d="M16 8V5h8v3M15 15l2 2 4-5M15 23l2 2 4-5"/></svg>',
  drop:    '<svg viewBox="0 0 40 40"><path d="M20 7c4 6 9 12 9 18a9 9 0 1 1-18 0c0-6 5-12 9-18z"/><path d="M20 15c2 4 5 8 5 11"/></svg>',
  snow:    '<svg viewBox="0 0 40 40"><path d="M20 5v30M5 20h30M9 9l22 22M31 9L9 31"/></svg>',
  check:   '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
  heart:   '<svg viewBox="0 0 24 24"><path d="M12 20s-6.5-4.2-6.5-9A3.4 3.4 0 0 1 12 8a3.4 3.4 0 0 1 6.5 3c0 4.8-6.5 9-6.5 9z"/></svg>',
  ribbon:  '<svg viewBox="0 0 24 24"><path d="M9 13l-3 8 6-4 6 4-3-8"/><path d="M12 3c-2.4 2-2.4 6 0 9 2.4-3 2.4-7 0-9z"/></svg>',
  shield:  '<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 5-3.5 8-7 9.5C8.5 19 5 16 5 11V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  // Triangle d'attention : marque les contre-indications, par opposition à la coche.
  alerte:  '<svg viewBox="0 0 24 24"><path d="M12 4.5 21 19.5H3z"/><path d="M12 10v4"/><circle cx="12" cy="16.6" r=".7"/></svg>',
};

const pLg = i => `<span class="pastille pastille-lg" aria-hidden="true">${i}</span>`;
const pSm = i => `<span class="pastille pastille-sm" aria-hidden="true">${i}</span>`;
const iconList = (icon, items) => `<ul class="icon-list">\n${items.map(t => `                ${'<li>' + pSm(icon) + '<span>' + t + '</span></li>'}`).join('\n')}\n              </ul>`;
const gradeList = items => `<ul class="grade-list">\n${items.map((t, i) => `                <li><span class="grade-num">${i}</span><span>${t}</span></li>`).join('\n')}\n              </ul>`;
// icon peut être null : l'encart est alors rendu sans pastille.
const mint = (icon, title, text) => `              <div class="mint-callout${icon ? '' : ' mint-callout--nu'}">${icon ? pSm(icon) : ''}<div><h4>${title}</h4><p>${text}</p></div></div>`;
const box = (title, inner) => `                <div class="info-box"><h4>${title}</h4>${inner}</div>`;
const card = ({ id, icon, title, main, side, full = '', cls = '' }) => `    <section id="${id}" class="soin-sec">
      <div class="container">
        <article class="soin-card${cls ? ' ' + cls : ''}">
          <header class="soin-head">${pLg(icon)}<div><h2>${title}</h2><span class="gold-line" aria-hidden="true"></span></div></header>
          <div class="soin-grid">
            <div class="soin-main">
${main}
            </div>
            <div class="soin-side">
${side}
            </div>
          </div>${full ? `\n          <div class="soin-full">\n${full}\n          </div>` : ''}
        </article>
      </div>
    </section>`;

/* ---------- Page Pédicurie (3 soins en sections ancrées) ---------- */
function pedicuriePage() {
  const a = pedicurie;
  const s1 = a.subpages.find(s => s.slug === 'affections-ongle-peau');
  const s2 = a.subpages.find(s => s.slug === 'patients-diabetiques');
  const s3 = a.subpages.find(s => s.slug === 'verrue-plantaire');
  const sprig = '<svg class="pedi-sprig" aria-hidden="true" viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 54C30 50 72 40 116 6"/><path d="M96 10c-11 2-17 8-18 19 11-1 17-8 18-19z" fill="currentColor" fill-opacity=".22" stroke="none"/><path d="M72 20c-10 3-15 9-15 19 10-2 15-9 15-19z" fill="currentColor" fill-opacity=".22" stroke="none"/><path d="M50 31c-9 3-13 9-13 18 9-2 13-9 13-18z" fill="currentColor" fill-opacity=".22" stroke="none"/></svg>';

  const card1 = card({
    id: 'affections-ongle-peau', icon: ico.ongle, title: "Affections de l'ongle et de la peau",
    main: `              <h3 class="soin-sub">En quelques mots</h3>
              <p>${B(s1.blocks, 'En quelques mots')}</p>
${mint(ico.heart, 'En toute douceur', B(s1.blocks, 'En toute douceur'))}`,
    side: `              <h3 class="soin-sub">Ce que je prends en charge</h3>
              ${iconList(ico.check, B(s1.blocks, 'Ce que je prends en charge'))}`,
  });

  const card2 = card({
    id: 'patients-diabetiques', icon: ico.drop, title: 'Suivi des patients diabétiques',
    main: `              <h3 class="soin-sub">En quelques mots</h3>
              <p>${B(s2.blocks, 'En quelques mots')}</p>`,
    side: `              <h3 class="soin-sub">Une prise en charge par la Sécurité sociale</h3>
              <p>${B(s2.blocks, 'Une prise en charge par la Sécurité sociale')}</p>`,
    full: `            <div class="box-duo">
${box('Tarifs &amp; prise en charge', iconList(ico.check, B(s2.blocks, 'Tarifs & prise en charge')))}
${box('Les grades de prise en charge', gradeList(B(s2.blocks, 'Les grades de prise en charge')))}
            </div>`,
  });

  const cardSyndrome = card({
    id: 'syndrome-main-pied', icon: ico.ribbon, title: 'Syndrome main-pied', cls: 'soin-card--center',
    main: `              <h3 class="soin-sub">En quelques mots</h3>
              <p>Le syndrome main-pied (ou érythrodysesthésie palmo-plantaire) est un effet secondaire de certaines chimiothérapies. Il se manifeste par des rougeurs, un gonflement, des picotements ou une sensibilité au niveau de la paume des mains et de la plante des pieds, parfois jusqu'à une desquamation de la peau.</p>`,
    side: `${mint(ico.shield, 'Prise en charge', 'Dans le cadre de votre traitement, deux séances peuvent être prises en charge par la Sécurité sociale, sur prescription de votre oncologue.')}`,
  });

  const card3 = card({
    id: 'verrue-plantaire', icon: ico.snow, title: 'Verrues plantaires par cryothérapie',
    // L'encart est dans la colonne de gauche, et non en pleine largeur dessous :
    // il comble le creux sous le paragraphe, comme sur la carte « Affections ».
    main: `              <h3 class="soin-sub">En quelques mots</h3>
              <p>${B(s3.blocks, 'En quelques mots')}</p>
${mint(ico.shield, 'Prise en charge', B(s3.blocks, 'Prise en charge'))}`,
    side: `              <h3 class="soin-sub">Comment ça fonctionne</h3>
              ${iconList(ico.check, B(s3.blocks, 'Comment ça fonctionne'))}`,
  });

  const body = `    <section class="pedi-hero">
      <div class="container">
        <div class="pedi-hero-text">
          <h1>Soin de pédicurie ${sprig}</h1>
        </div>
        <div class="pedi-hero-media"><img src="assets/pedicurie-soin.jpg" alt="Soin de pédicurie : soin des pieds au cabinet" width="1536" height="1024" loading="lazy" /></div>
      </div>
    </section>

${card1}

${card2}

${cardSyndrome}

${card3}`;
  return shell({
    title: "Soins de pédicurie — Clémentine Olive à Fosses (95)",
    description: "Soins de pédicurie à Fosses (95470) : je prends soin de vos pieds avec douceur, au cabinet comme à votre domicile. Clémentine Olive, pédicure-podologue.",
    active: 'pedicurie.html', body,
  });
}

/* ---------- Page Podologie (bilan + semelles en sections ancrées) ----------
   Même gabarit que la page Pédicurie. Le hero est en texte seul faute de
   photographie de podologie : le jour où il y en a une, reprendre le bloc
   .pedi-hero de pedicuriePage(). */
function podologiePage() {
  const a = podologie;
  const s1 = a.subpages.find(s => s.slug === 'bilan-podologique');
  const s2 = a.subpages.find(s => s.slug === 'semelles');

  const card1 = card({
    id: 'bilan-podologique', icon: ico.bilan, title: 'Bilan podologique',
    main: `              <h3 class="soin-sub">En quelques mots</h3>
              <p>${B(s1.blocks, 'En quelques mots')}</p>`,
    side: `              <h3 class="soin-sub">Dans quels cas ?</h3>
              ${iconList(ico.check, B(s1.blocks, 'Dans quels cas ?'))}`,
    // Encart en pleine largeur : ici la colonne de droite est longue, les deux
    // colonnes sont déjà proches (−32 px). Le déplacer à gauche porterait
    // l'écart à +136 px — mesuré.
    full: `${mint(ico.heart, 'Comment ça se passe', B(s1.blocks, 'Comment ça se passe'))}`,
  });

  const card2 = card({
    id: 'semelles', icon: ico.semelle, title: 'Semelles orthopédiques sur mesure',
    // Encart dans la colonne de gauche : il comble le creux de 83 px laissé
    // sous ce paragraphe court, comme sur la carte « Affections de l'ongle ».
    main: `              <h3 class="soin-sub">En quelques mots</h3>
              <p>${B(s2.blocks, 'En quelques mots')}</p>
${mint(ico.heart, "De la prise d'empreinte au suivi", B(s2.blocks, "De la prise d'empreinte au suivi"))}`,
    side: `              <h3 class="soin-sub">Les bénéfices</h3>
              ${iconList(ico.check, B(s2.blocks, 'Les bénéfices'))}`,
  });

  const body = `    <section class="page-hero">
      <div class="container">
        <h1>La Podologie</h1>
        <p class="lead">${a.lead}</p>
      </div>
    </section>

${card1}

${card2}`;
  return shell({
    title: "Podologie : bilan et semelles orthopédiques — Clémentine Olive à Fosses (95)",
    description: "Bilan podologique et semelles orthopédiques sur mesure à Fosses (95470). J'analyse votre posture et votre marche pour soulager vos douleurs.",
    active: 'podologie.html', body,
  });
}

/* ---------- Redirection des anciennes URL ----------
   Les deux anciennes pages podologie-*.html étaient indexées : on les conserve
   sous forme de page de renvoi vers la nouvelle section correspondante, pour ne
   casser ni les liens partagés ni les résultats de recherche. */
function redirectPage(vers, titre) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${titre} — Clémentine Olive</title>
  <link rel="canonical" href="${SITE}/${vers}" />
  <meta http-equiv="refresh" content="0; url=${vers}" />
</head>
<body>
  <p>Cette page a été regroupée avec les autres soins de podologie.
     <a href="${vers}">Voir « ${titre} »</a>.</p>
</body>
</html>
`;
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
  const staticFiles = new Set(['favicon.svg', 'styles.css', 'menu.js', 'footprints.js', 'robots.txt', 'sitemap.xml']);
  const idsByPage = {};
  for (const [name, html] of Object.entries(pages))
    idsByPage[name] = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  const problems = [];
  for (const [name, html] of Object.entries(pages)) {
    for (const m of html.matchAll(/href="([^"]+)"/g)) {
      const href = m[1];
      if (/^(https?:|tel:|mailto:)/.test(href) || href === '/' || href === '') continue;
      const [chemin, anchor] = href.split('#');
      const file = chemin.split('?')[0];   // ignore le suffixe anti-cache ?v=…
      // Fichier d'assets : on vérifie sa présence réelle sur le disque, ce qui
      // rattrape aussi les chemins d'images mal orthographiés.
      if (file.startsWith('assets/')) {
        if (!existsSync(new URL(`./${file}`, import.meta.url)))
          problems.push(`${name} → ${file} (fichier absent de assets/)`);
        continue;
      }
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
// Une redirection est écrite sur le disque et vérifiée comme les autres pages,
// mais elle reste hors du sitemap : ce n'est pas une page de contenu.
const writeRedirect = (name, vers, titre) => {
  const html = redirectPage(vers, titre);
  writeFileSync(new URL(`./${name}`, import.meta.url), html);
  pages[name] = html;
};

write('index.html', homePage());
write('tarifs.html', tarifsPage());
write('faq.html', faqPage());
write('mentions-legales.html', mentionsLegales());
write('confidentialite.html', confidentialite());
// Les trois activités ont chacune une page unique, soins en sections ancrées.
write('pedicurie.html', pedicuriePage());
write('podologie.html', podologiePage());
write('reflexologie.html', reflexologiePage());
// Anciennes URL de podologie, conservées en redirection (voir redirectPage).
writeRedirect('podologie-bilan-podologique.html', 'podologie.html#bilan-podologique', 'Bilan podologique');
writeRedirect('podologie-semelles.html', 'podologie.html#semelles', 'Semelles orthopédiques sur mesure');
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
