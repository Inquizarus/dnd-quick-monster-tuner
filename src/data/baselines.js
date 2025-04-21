

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

const defaultBaseline = {
  name: "Standard baseline",
  hpFormula: "15 * CR + 10",
  acFormula: "12 + CR",
  pbFormula: "Math.floor(CR / 4) + 2",
  dprFormula: "15 * CR",
  noaFormula: "2",
  dpaFormula: "dpr / noa"
};

export const baselines = [
  defaultBaseline,
]