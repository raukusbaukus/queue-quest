const abilityarr = [{
  name: 'Attack',
  type: 'Untyped',
  tier: 0,
  bonushp: 0,
  bonusenergy: 0,
  bonusarmor: 0,
  bonusward: 0,
  bonusvariance: 0,
  bonusbase: 0,
  energycost: 0,
  roundreq: 0,
  typereq: false,
  successreq: false,
  offense: true,
  defense: false,
  condapply: [],
  condremove: [],
  evade: false,
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: 1,
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 0,
}, {
  name: 'Armor-Break',
  type: 'Physical',
  tier: 1,
  bonushp: 1,
  bonusenergy: 1,
  bonusarmor: 0,
  bonusward: 0,
  bonusvariance: 1,
  bonusbase: 0,
  energycost: 2,
  roundreq: 0,
  typereq: false,
  successreq: false,
  offense: true,
  defense: false,
  condapply: [],
  condremove: [],
  evade: false,
  hpboost: 0,
  abreak: 3,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: .5,
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 0,
}, {
  name: 'Block',
  type: 'Physical',
  tier: 0,
  bonushp: 2,
  bonusenergy: 0,
  bonusarmor: .5,
  bonusward: 0,
  bonusvariance: 0,
  bonusbase: 0,
  energycost: 0,
  roundreq: 0,
  typereq: false,
  successreq: false,
  offense: false,
  defense: true,
  condapply: [],
  condremove: [],
  evade: false,
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: 1,
  forwardbonus: 0,
  pmitigate: 0.6,
  mmitigate: 0.3,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 0,
}, {
  name: 'Cleanse',
  type: 'Magical',
  tier: 2,
  bonushp: 2,
  bonusenergy: 0,
  bonusarmor: 0,
  bonusward: .5,
  bonusvariance: 0,
  bonusbase: 0,
  energycost: 3,
  roundreq: 0,
  typereq: false,
  successreq: false,
  offense: false,
  defense: true,
  condapply: [],
  condremove: ['Poisoned', 'Burning', 'Cursed', 'Silenced', 'Turned'],
  evade: false,
  hpboost: 0,
  hpboost: 3,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 1,
  dmgmultiplier: 1,
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 0,
}, {
  name: 'Cold-Snap',
  type: 'Magical',
  tier: 1,
  bonushp: 1,
  bonusenergy: 0,
  bonusarmor: 0,
  bonusward: .5,
  bonusvariance: 1,
  bonusbase: 0,
  energycost: 2,
  roundreq: 0,
  typereq: false,
  successreq: false,
  offense: true,
  defense: true,
  condapply: ['Cold'],
  condremove: ['Burning'],
  evade: false,
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: 1.5,
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 0,
}, {
  name: 'Combo',
  type: 'Physical',
  tier: 1,
  bonushp: 1,
  bonusenergy: 1,
  bonusarmor: 0,
  bonusward: 0,
  bonusvariance: 1,
  bonusbase: 0,
  energycost: 1,
  roundreq: 0,
  typereq: true,
  successreq: true,
  offense: true,
  defense: false,
  condapply: [],
  condremove: [],
  evade: false,
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: 1.5,
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 1,
}, {
  name: 'Counter-Attack',
  type: 'Physical',
  tier: 2,
  bonushp: 0,
  bonusenergy: 0,
  bonusarmor: 0,
  bonusward: 0,
  bonusvariance: 0,
  bonusbase: 0,
  energycost: 0,
  roundreq: 0,
  typereq: true,
  prevreq: 'Block',
  successreq: true,
  offense: true,
  defense: true,
  condapply: [],
  condremove: [],
  evade: false,
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: 1.5,
  forwardbonus: 0,
  pmitigate: 0.3,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 0,
}, {
  name: 'Curse',
  type: 'Magical',
  tier: 2,
  bonushp: 2,
  bonusenergy: 0,
  bonusarmor: 0,
  bonusward: 0,
  bonusvariance: 1,
  bonusbase: 0,
  energycost: 3,
  roundreq: 0,
  typereq: false,
  successreq: false,
  offense: true,
  defense: false,
  condapply: ['Cursed'],
  condremove: [],
  evade: false,
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: .5,
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 0,
}, {
  name: 'Dodge',
  type: 'Physical',
  tier: 2,
  bonushp: 1,
  bonusenergy: 1,
  bonusarmor: .5,
  bonusward: 0,
  bonusvariance: 0,
  bonusbase: 0,
  energycost: 4,
  roundreq: 0,
  typereq: false,
  successreq: false,
  offense: false,
  defense: true,
  condapply: [],
  condremove: [],
  evade: true,
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: 1,
  forwardbonus: 0,
  pmitigate: 1,
  mmitigate: 1,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 0,
}, {
  name: 'Doom',
  type: 'Magical',
  tier: 4,
  bonushp: 0,
  bonusenergy: 1,
  bonusarmor: 0,
  bonusward: 0,
  bonusvariance: 2,
  bonusbase: 0,
  energycost: 5,
  roundreq: 0,
  typereq: false,
  successreq: false,
  offense: true,
  defense: false,
  condapply: ['Burning', 'Cursed', 'Poisoned', 'Silenced', 'Turned'],
  condremove: [],
  evade: false,
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: .5,
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 1,
}, {
  name: 'Drain-Life',
  type: 'Magical',
  tier: 3,
  bonushp: 1,
  bonusenergy: 1,
  bonusarmor: 0,
  bonusward: 0,
  bonusvariance: 0,
  bonusbase: 1,
  energycost: 5,
  roundreq: 0,
  typereq: false,
  successreq: false,
  offense: true,
  defense: true,
  condapply: [],
  condremove: [],
  evade: false,
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: 1,
  drain: true, //special property
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 1,
}, {
  name: 'Feint',
  type: 'Physical',
  tier: 2,
  bonushp: 1,
  bonusenergy: 1,
  bonusarmor: 0,
  bonusward: 0,
  bonusvariance: 1,
  bonusbase: 0,
  energycost: 3,
  roundreq: 0,
  typereq: false,
  successreq: false,
  offense: true,
  defense: true,
  condapply: [],
  condremove: [],
  evade: false,
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: 1,
  forwardbonus: .8,
  pmitigate: 0.3,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 0,
}, {
  name: 'Finisher',
  type: 'Physical',
  tier: 4,
  bonushp: 1,
  bonusenergy: 1,
  bonusarmor: 0,
  bonusward: 0,
  bonusvariance: 0,
  bonusbase: 1,
  energycost: 4,
  roundreq: 5,
  typereq: true,
  successreq: false,
  offense: true,
  defense: false,
  condapply: [],
  condremove: [],
  evade: false,
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: 2.5,
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 0,
}, {
  name: 'Flame-Wave',
  type: 'Magical',
  tier: 2,
  bonushp: 0,
  bonusenergy: 1,
  bonusarmor: 0,
  bonusward: 0,
  bonusvariance: 1,
  bonusbase: 1,
  energycost: 3,
  roundreq: 0,
  typereq: true,
  prevreq: 'Mote-of-Fire',
  successreq: false,
  offense: true,
  defense: false,
  condapply: ['Burning'],
  condremove: [],
  evade: false,
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: 1.5,
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 0,
}, {
  name: 'Lightning-Bolt',
  type: 'Magical',
  tier: 1,
  bonushp: 0,
  bonusenergy: 1,
  bonusarmor: 0,
  bonusward: 0.5,
  bonusvariance: 0,
  bonusbase: 0,
  energycost: 3,
  roundreq: 0,
  typereq: false,
  successreq: false,
  offense: true,
  defense: false,
  condapply: [],
  condremove: [],
  evade: false,
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: 1.5,
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 0,
}, {
  name: 'Mote-of-Fire',
  type: 'Magical',
  tier: 0,
  bonushp: 1,
  bonusenergy: 1,
  bonusarmor: 0,
  bonusward: 0,
  bonusvariance: 1,
  bonusbase: 0,
  energycost: 2,
  roundreq: 0,
  typereq: false,
  successreq: false,
  offense: true,
  defense: false,
  condapply: ['Burning'],
  condremove: [],
  evade: false,
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: .8,
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 0,
}, {
  name: 'Opening-Volley',
  type: 'Physical',
  tier: 1,
  bonushp: 0,
  bonusenergy: 1,
  bonusarmor: 0,
  bonusward: 0,
  bonusvariance: 2,
  bonusbase: 0,
  energycost: 1,
  roundreq: 1,
  typereq: false,
  successreq: false,
  offense: false,
  defense: false,
  condapply: [],
  condremove: [],
  evade: false,
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: 1.25,
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 0,
}, {
  name: 'Overpower',
  type: 'Physical',
  tier: 3,
  bonushp: 1,
  bonusenergy: 0,
  bonusarmor: .5,
  bonusward: 0,
  bonusvariance: 0,
  bonusbase: 0,
  energycost: 2,
  roundreq: 0,
  typereq: false,
  successreq: false,
  offense: true,
  defense: true,
  condapply: ['Silenced'],
  condremove: [],
  evade: false,
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: 1,
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0.5,
  usagelimit: 0,
}, {
  name: 'Piercing-Strike',
  type: 'Physical',
  tier: 3,
  bonushp: 0,
  bonusenergy: 1,
  bonusarmor: 0,
  bonusward: 0,
  bonusvariance: 1,
  bonusbase: 1,
  energycost: 3,
  roundreq: 0,
  typereq: false,
  successreq: false,
  offense: true,
  defense: false,
  condapply: [],
  condremove: [],
  evade: false,
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: 1.25,
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 0,
  ignoremit: true,
  preflect: 0,
  mreflect: 0,
  usagelimit: 0,
}, {
  name: 'Silence',
  type: 'Magical',
  tier: 2,
  bonushp: 0,
  bonusenergy: 2,
  bonusarmor: 0,
  bonusward: .5,
  bonusvariance: 0,
  bonusbase: 0,
  energycost: 3,
  roundreq: 0,
  typereq: false,
  successreq: false,
  offense: true,
  defense: false,
  condapply: ['Silenced'],
  condremove: [],
  evade: true,
  fumble: 'Magical',
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: 1,
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 1,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 0,
}, {
  name: 'Spell-Break',
  type: 'Magical',
  tier: 2,
  bonushp: 1,
  bonusenergy: 0,
  bonusarmor: 0,
  bonusward: .5,
  bonusvariance: 0,
  bonusbase: 1,
  energycost: 3,
  roundreq: 0,
  typereq: false,
  successreq: false,
  offense: true,
  defense: false,
  condapply: [],
  condremove: [],
  evade: false,
  hpboost: 0,
  abreak: 0,
  wbreak: 3,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: .5,
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 0,
}, {
  name: 'Turn',
  type: 'Magical',
  tier: 2,
  bonushp: 1,
  bonusenergy: 1,
  bonusarmor: 0,
  bonusward: .5,
  bonusvariance: 0,
  bonusbase: 0,
  energycost: 4,
  roundreq: 0,
  typereq: false,
  successreq: false,
  offense: true,
  defense: false,
  condapply: ['Turned'],
  condremove: [],
  evade: false,
  fumble: 'Evil',
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: 1,
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 1,
}, {
  name: 'Venom-Strike',
  type: 'Physical',
  tier: 2,
  bonushp: 0,
  bonusenergy: 2,
  bonusarmor: 0,
  bonusward: 0,
  bonusvariance: 0,
  bonusbase: 1,
  energycost: 3,
  roundreq: 0,
  typereq: false,
  successreq: false,
  offense: true,
  defense: false,
  condapply: ['Poisoned'],
  condremove: [],
  evade: false,
  hpboost: 0,
  abreak: 0,
  wbreak: 0,
  aboost: 0,
  wboost: 0,
  dmgmultiplier: 1.25,
  forwardbonus: 0,
  pmitigate: 0,
  mmitigate: 0,
  ignoremit: false,
  preflect: 0,
  mreflect: 0,
  usagelimit: 0,
}];

const initabilityarr = [{
    name: 'Analyze',
    type: 'Untyped',
    tier: 0,
    bonushp: 0,
    bonusenergy: 0,
    bonusarmor: 0,
    bonusward: 0,
    bonusvariance: 0,
    bonusbase: 0,
    energycost: 2,
    analyze: true,
    hpbump: 0,
    energybump: 0,
    abump: 0,
    wbump: 0,
    mdamagemultiplier: 1,
    menergymultiplier: 1,
    mbaseshrink: 0,
    mvarianceshrink: 0
  }, {
    name: 'Energize',
    type: 'Untyped',
    tier: 2,
    bonushp: 0,
    bonusenergy: 3,
    bonusarmor: 0,
    bonusward: 0,
    bonusvariance: 0,
    bonusbase: 0,
    energycost: 0,
    analyze: false,
    hpbump: 0,
    energybump: 12,
    abump: 0,
    wbump: 0,
    mdamagemultiplier: 1,
    menergymultiplier: 1,
    mbaseshrink: 0,
    mvarianceshrink: 0
  }, {
    name: 'Exhaust',
    type: 'Magical',
    tier: 3,
    bonushp: 1,
    bonusenergy: 1,
    bonusarmor: 0,
    bonusward: 0,
    bonusvariance: 1,
    bonusbase: 0,
    energycost: 2,
    analyze: false,
    hpbump: 0,
    energybump: 0,
    abump: 0,
    wbump: 0,
    mdamagemultiplier: 1,
    menergymultiplier: 0.6,
    mbaseshrink: 0,
    mvarianceshrink: 0
  }, {
    name: 'Heal',
    type: 'Untyped',
    tier: 0,
    bonushp: 0,
    bonusenergy: 0,
    bonusarmor: 0,
    bonusward: 0,
    bonusvariance: 0,
    bonusbase: 0,
    energycost: 2,
    analyze: false,
    hpbump: 15,
    energybump: 0,
    abump: 0,
    wbump: 0,
    mdamagemultiplier: 1,
    menergymultiplier: 1,
    mbaseshrink: 0,
    mvarianceshrink: 0
  }, {
    name: 'Intimidate',
    type: 'Physical',
    tier: 3,
    bonushp: 0,
    bonusenergy: 0,
    bonusarmor: 0,
    bonusward: 0,
    bonusvariance: 2,
    bonusbase: 1,
    energycost: 0,
    analyze: false,
    hpbump: 0,
    energybump: 0,
    abump: 0,
    wbump: 0,
    mdamagemultiplier: 0.8,
    menergymultiplier: 1,
    mbaseshrink: 0,
    mvarianceshrink: 0
  }, {
    name: 'Protect',
    type: 'Magical',
    tier: 2,
    bonushp: 1,
    bonusenergy: 0,
    bonusarmor: 0,
    bonusward: 1,
    bonusvariance: 0,
    bonusbase: 0,
    energycost: 0,
    analyze: false,
    hpbump: 0,
    energybump: 0,
    abump: 0,
    wbump: 3,
    mdamagemultiplier: 1,
    menergymultiplier: 1,
    mbaseshrink: 0,
    mvarianceshrink: 0
  }, {
    name: 'Repair',
    type: 'Physical',
    tier: 2,
    bonushp: 1,
    bonusenergy: 0,
    bonusarmor: 1,
    bonusward: 0,
    bonusvariance: 0,
    bonusbase: 0,
    energycost: 0,
    analyze: false,
    hpbump: 0,
    energybump: 0,
    abump: 3,
    wbump: 0,
    mdamagemultiplier: 1,
    menergymultiplier: 1,
    mbaseshrink: 0,
    mvarianceshrink: 0
  }, {
    name: 'Weaken',
    type: 'Magical',
    tier: 0,
    bonushp: 0,
    bonusenergy: 1,
    bonusarmor: 0,
    bonusward: 0,
    bonusvariance: 1,
    bonusbase: 1,
    energycost: 2,
    analyze: false,
    hpbump: 0,
    energybump: 0,
    abump: 0,
    wbump: 0,
    mdamagemultiplier: 1,
    menergymultiplier: 1,
    mbaseshrink: 1,
    mvarianceshrink: 1
  },

];
