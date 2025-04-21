<script>
  export let onLoad = () => {};
  export let onDelete = () => {};
  export let onToggleFavorite = () => {}
  export let monsters = [];

  let search = '';

  $: filtered = monsters
    .filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0)); // favoriter först
</script>

<div class="mt-8 p-4 border border-nord-3 dark:border-nord-2 rounded">
  <h2 class="text-lg font-semibold mb-2">Monster library</h2>

  <input
    type="text"
    bind:value={search}
    placeholder="Search for monster by name..."
    class="mb-4 w-full p-2 border rounded bg-nord-6 text-nord-0 dark:bg-nord-1 dark:text-nord-4 border-nord-3 dark:border-nord-2 rounded px-2 py-1"
  />

  {#if filtered.length === 0}
  <p class="text-nord-3 dark:text-nord-5 italic">No monsters found.</p>
{:else}
  <ul class="space-y-2">
    {#each filtered as m}
      <li class="flex justify-between items-center bg-white dark:bg-nord-2 text-nord-0 dark:text-nord-4 border border-nord-3 dark:border-nord-2 rounded shadow p-2">
        <div class="flex items-center gap-2">
          <button
            on:click={() => onToggleFavorite(m.id)}
            class="text-yellow-500 text-xl leading-none"
            title="Favorit"
          >
            {m.favorite ? '⭐' : '☆'}
          </button>
          <div>
            <strong>{m.name}</strong> <span class="text-sm text-nord-3 dark:text-nord-5">(CR {m.cr})</span>
          </div>
        </div>

        <div class="flex gap-2">
          <button
            class="bg-nord-10 hover:bg-nord-9 text-nord-6 dark:bg-nord-7 dark:hover:bg-nord-8 dark:text-nord-0 px-2 py-1 rounded"
            on:click={() => onLoad(m)}
          >
            Load
          </button>
          <button
            class="bg-nord-10 hover:bg-nord-9 text-nord-6 dark:bg-nord-7 dark:hover:bg-nord-8 dark:text-nord-0 px-2 py-1 rounded"
            on:click={() => onDelete(m.id)}
          >
            Remove
          </button>
        </div>
      </li>
    {/each}
  </ul>
{/if}
</div>
