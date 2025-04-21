export const attributes = [
  {
    name: "Hit Points",
    abbreviation: "hp",
    description: "Total hitpoints of the monster",
    getValue: (m) => m.hp ?? 0,
    setValue: (m, val) => ({ ...m, hp: val })
  },
  {
    name: "Armor Class",
    abbreviation: "ac",
    description: "How hard the monster is to hit",
    getValue: (m) => m.ac ?? 0,
    setValue: (m, val) => ({ ...m, ac: val })
  },
  {
    name: "Proficiency Bonus",
    abbreviation: "pb",
    description: "Used for attack rolls, etc.",
    getValue: (m) => m.pb ?? 0,
    setValue: (m, val) => ({ ...m, pb: val })
  },
  {
    name: "Damage per round",
    abbreviation: "dpr",
    description: "Defines how much damage the monster should do per round.",
    getValue: (m) => m.dpr ?? 0,
    setValue: (m, val) => ({ ...m, dpr: val })
  },
  {
    name: "Number of attacks",
    abbreviation: "noa",
    description: "Defines the number of attacks that the monster can do per round.",
    getValue: (m) => m.noa ?? 0,
    setValue: (m, val) => ({ ...m, noa: val })
  },
  {
    name: "Damage per attack",
    abbreviation: "dpa",
    description: "Rough estimate of what each attack should be doing in damage, following this blindly will probably ensure that monster damage is increased!",
    getValue: (m) => m.dpa ?? 0,
    setValue: (m, val) => ({ ...m, dpa: val })
  },
];

export const getFormulaKey = attr => attr.abbreviation + "Formula"

export const defaultAttributes = {
  hp: 0,
  ac: 0,
  pb: 0,
  dpr: 0,
  noa: 0,
  dpa: 0
}