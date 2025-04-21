<script>
    import { createEventDispatcher, onMount } from 'svelte';
    import { getFormulaKey } from '../data/attributes';
    import BaselineHelperModal from './BaselineHelperModal.svelte';
    import { HelpCircle } from 'lucide-svelte';

    const dispatch = createEventDispatcher();
  
    export let initial = null;
    export let attributes = [];
  
    let showHelp = false
    let name = initial?.name || '';
    let description = initial?.description || '';
  
    let formulas = {};

    onMount(() => {
      for (const attr of attributes) {
        formulas[getFormulaKey(attr)] = initial?.[getFormulaKey(attr)] || '';
      }
    });
  
    function save() {

      // Setup base object
      const baseline = {
        name,
        description,
      };
  
      // Iterate over each registered formula and record this in the base
      
      for (const key in formulas) {
        baseline[key] = formulas[key]
      }

      dispatch('save', { baseline });
    }
  </script>

  <div class="bg-nord-6 dark:bg-nord-0 text-nord-0 dark:text-nord-4 p-6 rounded-2xl  max-w-full mx-auto">
    <h2 class="text-xl font-semibold mb-6 text-nord-3 dark:text-nord-5">
      {initial ? 'Editing' : 'New'} baseline <em>{name}</em> <button
      on:click={() => (showHelp = true)}
      class="text-nord-10 hover:text-nord-9 transition"
      title="Show helptext for baselines"
    >
      <HelpCircle class="w-5 h-5" />
    </button>
    </h2>
  
    <label class="block mb-4 text-sm">
      <span class="block mb-1 font-medium text-nord-3 dark:text-nord-5">Description</span>
      <input
        class="w-full border border-nord-4 dark:border-nord-2 bg-white dark:bg-nord-2 text-sm rounded p-2 focus:outline-none focus:ring-2 focus:ring-nord-10 dark:focus:ring-nord-9"
        bind:value={description}
      />
    </label>
  
    {#each attributes as attr}
      <label class="block mb-4 text-sm">
        <span class="block mb-1 font-medium text-nord-3 dark:text-nord-5">{attr.abbreviation} formula</span>
        <input
          class="w-full border border-nord-4 dark:border-nord-2 bg-white dark:bg-nord-2 text-sm rounded p-2 focus:outline-none focus:ring-2 focus:ring-nord-10 dark:focus:ring-nord-9"
          bind:value={formulas[getFormulaKey(attr)]}
          placeholder="e.g. 17.5 * CR"
        />
      </label>
    {/each}
  
    <div class="mt-6 flex justify-end gap-3">
      <button
        on:click={save}
        class="bg-nord-14 hover:bg-nord-13 text-nord-0 px-4 py-2 rounded transition-colors"
      >
        Save baseline
      </button>
  
      <button
        on:click={() => dispatch('cancel')}
        class="bg-nord-3 hover:bg-nord-4 text-nord-0 dark:text-nord-6 px-4 py-2 rounded transition-colors"
      >
        Cancel
      </button>
    </div>
    <BaselineHelperModal show={showHelp}  onClose={ () => { showHelp = false } } />
  </div>
  
  