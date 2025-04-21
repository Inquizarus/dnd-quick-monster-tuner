<script>
  import { CR_SCALE } from "../data/cr-scale.js";
  import { evaluateFormula } from "../data/baselines.js"

  export let baseline;
  export let baseMonster;
  export let onApply = () => {};

  const range = 3;

  // Returnerar CR-värden inom range från ett center-värde
  function getCRRange(center, range = 2) {
    const index = CR_SCALE.findIndex((c) => c.value === center);
    const start = Math.max(0, index - range);
    const end = Math.min(CR_SCALE.length - 1, index + range);
    return CR_SCALE.slice(start, end + 1);
  }

  // Precalculera vilka CR-värden som ska visas
  $: crRange = getCRRange(baseMonster?.cr, range);

  // Räkna ut hur mycket monsteret avviker från baseline (faktorer)
  $: factors = {
    hp: baseMonster.hp / (baseMonster.cr * baseline.hpPerCr),
    ac: baseMonster.ac / baseline.acPerCr,
    pb: baseMonster.pb / baseline.pbPerCr,
    dpr: baseMonster.dpr / (baseMonster.cr * baseline.dprPerCr),
    noa: baseMonster.noa / baseline.noaPerCr,
    dpa: baseMonster.dpa / baseline.dpaPerCr
  };

  let scaled;

  $: if (baseline && baseMonster) {
  const CR = baseMonster.cr;


  const factors = {
    hp: baseMonster.hp / evaluateFormula(baseline.hpFormula, { CR }),
    ac: baseMonster.ac / evaluateFormula(baseline.acFormula, { CR }),
    pb: baseMonster.pb / evaluateFormula(baseline.pbFormula, { CR }),
    dpr: baseMonster.dpr / evaluateFormula(baseline.dprFormula, { CR }),
    noa: baseMonster.noa / evaluateFormula(baseline.noaFormula, { CR, dpr: baseMonster.dpr }),
    dpa: baseMonster.dpa / evaluateFormula(baseline.dpaFormula, {
      CR,
      dpr: baseMonster.dpr,
      noa: baseMonster.noa,
    }),
  };

  scaled = crRange.map(({ value: cr, label }) => {
    return {
      cr,
      label,
      hp: Math.round(evaluateFormula(baseline.hpFormula, { CR: cr }) * factors.hp),
      ac: Math.round(evaluateFormula(baseline.acFormula, { CR: cr }) * factors.ac),
      pb: Math.round(evaluateFormula(baseline.pbFormula, { CR: cr }) * factors.pb),
      dpr: Math.round(evaluateFormula(baseline.dprFormula, { CR: cr }) * factors.dpr),
      noa: Math.max(1, Math.round(evaluateFormula(baseline.noaFormula, { CR: cr }) * factors.noa)),
      dpa: Math.round(evaluateFormula(baseline.dpaFormula, {
        CR: cr,
        dpr: evaluateFormula(baseline.dprFormula, { CR: cr }),
        noa: evaluateFormula(baseline.noaFormula, { CR: cr }),
      }) * factors.dpa),
    };
  });
}
</script>

<div class="mt-8 overflow-x-auto">
  <h2 class="text-lg font-semibold mb-2">
    Scaled versions of {baseMonster.name || "monster"}
  </h2>

  <table class="min-w-full border-collapse text-sm text-center">
    <thead class="bg-nord-5 dark:bg-nord-2 text-nord-0 dark:text-nord-4">
      <tr>
        <th class="border border-nord-4 dark:border-nord-2 p-2" title="Challenge Rating">CR</th>
        <th class="border border-nord-4 dark:border-nord-2 p-2" title="Hitpoints">HP</th>
        <th class="border border-nord-4 dark:border-nord-2 p-2" title="Armor Class">AC</th>
        <th class="border border-nord-4 dark:border-nord-2 p-2" title="Proficiency Bonus">PB</th>
        <th class="border border-nord-4 dark:border-nord-2 p-2" title="Damage per round">DPR</th>
        <th class="border border-nord-4 dark:border-nord-2 p-2" title="Number of attacks">NOA</th>
        <th class="border border-nord-4 dark:border-nord-2 p-2" title="Damage per attack">DPA</th>
        <th class="border border-nord-4 dark:border-nord-2 p-2"></th>
      </tr>
    </thead>
    <tbody>
      {#each scaled as row}
        <tr class="even:bg-nord-6 dark:even:bg-nord-1 transition-colors">
          <td class="border border-nord-4 dark:border-nord-2 p-2">{row.label}</td>
          <td class="border border-nord-4 dark:border-nord-2 p-2">{row.hp}</td>
          <td class="border border-nord-4 dark:border-nord-2 p-2">{row.ac}</td>
          <td class="border border-nord-4 dark:border-nord-2 p-2">{row.pb}</td>
          <td class="border border-nord-4 dark:border-nord-2 p-2">{row.dpr}</td>
          <td class="border border-nord-4 dark:border-nord-2 p-2">{row.noa}</td>
          <td class="border border-nord-4 dark:border-nord-2 p-2">{row.dpa}</td>
          <td class="border border-nord-4 dark:border-nord-2 p-2">
            {#if row.cr !== baseMonster.cr}
              <button
                class="px-2 py-1 rounded bg-nord-10 hover:bg-nord-9 text-nord-6 dark:bg-nord-7 dark:hover:bg-nord-8 dark:text-nord-0 text-xs"
                on:click={() => onApply(row)}
              >
                Apply
              </button>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
  
</div>