<script>
  import { createEventDispatcher } from 'svelte';
  import { getDiffClass } from '../lib/diff-utils.js';

  export let label = '';
  export let value;
  export let description = '';
  export let expected;
  export let readonly = false;

  const dispatch = createEventDispatcher();

  function handleInput(e) {
    const newValue = +e.target.value;
    dispatch('change', newValue);
  }

  $: diffText = (typeof expected === 'number' && !isNaN(expected) && value !== expected)
    ? `${value > expected ? '+' : ''}${value - expected}`
    : null;

  $: diffClass = getDiffClass(value, expected);

</script>

<div class="text-center text-sm">
  <label class="block text-xs font-semibold mb-1 uppercase" title={description}>{label}</label>
  {#if readonly}
    <div class={`border p-1 rounded w-full text-center ${diffClass}`}>
      {value}
    </div>
    <div class="text-xs mt-1 text-nord-4 italic">(auto value)</div>
  {:else}
    <input
      type="number"
      bind:value
      on:input={handleInput}
      class={`border p-1 rounded w-full text-center text-sm transition-colors duration-200 ${diffClass}`}
    />
    {#if diffText}
      <div class="text-xs mt-1 text-nord-3 dark:text-nord-5 italic">
        {diffText}
      </div>
    {/if}
  {/if}
</div>
