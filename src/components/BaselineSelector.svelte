<script>
  export let baselines = [];
  export let selectedKey;
  export let onSelect = () => {};
  export let onApply = () => {};
  
</script>

<div class="mb-4">
  <label class="block font-semibold mb-1">Monster baseline:
  <div class="flex gap-2">
    <select bind:value={selectedKey} on:change={() => onSelect(selectedKey)} class="bg-nord-6 text-nord-0 dark:bg-nord-1 dark:text-nord-4 border border-nord-3 dark:border-nord-2 rounded px-2 py-1 border rounded p-2 w-full">
      <option value="" disabled>-- Select baseline --</option>
      {#each baselines as baseline, key}
        <option value={key}>{baseline.name}</option>
      {/each}</select>
    <button
      class="px-3 py-1 rounded disabled:opacity-50 bg-nord-10 hover:bg-nord-9 text-nord-6 dark:bg-nord-7 dark:hover:bg-nord-8 dark:text-nord-0"
      on:click={onApply}
    >
      Apply
    </button>
  </div>
</label>
</div>
