<script>
  export let monster;
  export let baseline;

  $: cr = monster.cr || 1;

  $: expected = {
    hp: cr * baseline.hpPerCr,
    ac: baseline.acPerCr,
    pb: baseline.pbPerCr,
    dpr: cr * baseline.dprPerCr,
    noa: baseline.noaPerCr,
    dpa: baseline.dpaPerCr
  };

  $: diff = {
    hp: monster.hp - expected.hp,
    ac: monster.ac - expected.ac,
    pb: monster.pb - expected.pb,
    dpr: monster.dpr - expected.dpr,
    noa: monster.noa - expected.noa,
    dpa: monster.dpa - expected.dpa
  };

  function formatDiff(value) {
    return value > 0 ? `+${value}` : value;
  }

  function diffClass(value) {
    return value === 0 ? 'text-green-600' : value > 0 ? 'text-orange-600' : 'text-red-600';
  }
</script>

<div class="grid grid-cols-2 gap-2 mt-6 p-4 bg-white rounded shadow">
  {#each Object.keys(expected) as key}
    <div>
      <strong>{key.toUpperCase()}:</strong> {monster[key]} vs {expected[key]}
      <span class={diffClass(diff[key])}>
        ({formatDiff(diff[key])})
      </span>
    </div>
  {/each}
</div>
