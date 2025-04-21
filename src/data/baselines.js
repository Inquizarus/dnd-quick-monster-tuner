

function normalizeFormula(input) {
  if (typeof input === 'number') {
    return `${input} * CR`;
  }
  return input;
}

export function evaluateFormula(formula, vars = {}) {
  try {
    formula = normalizeFormula(formula)
    const keys = Object.keys(vars);
    const values = Object.values(vars);
    const fn = new Function(...keys, `return ${formula}`);
    return fn(...values);
  } catch (e) {
    console.warn("Formula error:", formula, e);
    return 0;
  }
}

export function applyBaselineToMonster(monster, baseline) {
  const CR = monster.cr;

  const hp = Math.round(evaluateFormula(baseline.hpFormula, { CR }));
  const ac = Math.round(evaluateFormula(baseline.acFormula, { CR }));
  const pb = Math.round(evaluateFormula(baseline.pbFormula, { CR }));
  const dpr = Math.round(evaluateFormula(baseline.dprFormula, { CR }));

  const noa = Math.max(1, Math.round(evaluateFormula(baseline.noaFormula, { CR, dpr })));
  const dpa = Math.round(evaluateFormula(baseline.dpaFormula, { CR, dpr, noa }));

  return {
    ...monster,
    hp,
    ac,
    pb,
    dpr,
    noa,
    dpa
  };
}

const slyFlourishFOFBaseline = {
  name: "Standard baseline WIP",
  description: `Baseline inspired by "Building a quick monster" in https://slyflourish.com/lazy_5e_monster_building_resource_document.html`,
  hpFormula: `
    CR == 0 ? 3 :
    CR < 1 ? 48 * CR :
    CR < 5 ? 17 + ( CR * 4 ) + (CR * 12) :
    CR <= 10 ? 17 + ( CR * 5 ) + (CR * 10) :
    CR <= 16 ? 17 + ( CR * 6 ) + (CR * 7.25) :
    CR <= 20 ? (CR * 15) + CR * 0.1 : 
    CR * 18
  `.trim(),
  acFormula: `
    CR < 5 ? 12 + (CR / 4.66) :
    CR <= 10 ? 14 + (CR / 5) :
    CR <= 16 ? 15 + (CR / 4.66) :
    17 + CR * 0.33
  `.trim(),
  pbFormula: `
  CR * 2 + 2
  `.trim(),
  dprFormula: `
    CR < 5 ? 5 + 5 * CR :
    CR <= 10 ? 30 + (CR - 5) * 6 :
    CR <= 16 ? 60 + (CR - 10) * 7 :
    100 + (CR - 16) * 9
  `.trim(),
  noaFormula: `
    CR < 1 ? 1 :
    CR < 5 ? 2 :
    CR < 10 ? 2 + (CR - 5) * 0.2 :
    CR < 17 ? 3 :
    4
  `.trim(),
  dpaFormula: "dpr / noa"
};

const slyFlourishQuickBaseline = {
  name: "Sly Flourish quick monster stats",
  description: `Based on quick monster stat formula created by Sly Flourish`,
  hpFormula: `CR >= 1 ? 17.5 * CR : 3 + CR * 5`.trim(),
  acFormula: `CR >= 1 ? 12 + CR / 2 : 10 + CR * 4`.trim(),
  pbFormula: `CR >= 1 ? 4 + CR / 2 : 2 + CR / 2`.trim(),
  dprFormula: `CR >= 1 ? CR * 7 : 2 + Math.floor(CR * 9.5)`.trim(),
  noaFormula: `CR >= 1 ? 1 + CR : 1 + CR / 2`.trim(),
  dpaFormula: "dpr / noa"
}

export const baselines = [
  slyFlourishFOFBaseline,
  slyFlourishQuickBaseline
]

/*
    Choose a CR between 1 and 30 (monsters below CR 1 have proportionally fewer hp)
    AC / DC = 12 + 1/2 CR
    Attack / Primary Stat = 4 + 1/2 CR
    HP = 15 to 20 x CR
    Damage = 7 x CR
*/