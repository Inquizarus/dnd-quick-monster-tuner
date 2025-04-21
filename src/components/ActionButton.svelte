<script>
    export let label = '';
    export let icon = '';
    export let onClick = () => {};
    export let fullWidth = true;
  </script>
  
  <button
    on:click={onClick}
    class={`${
      fullWidth ? 'w-full sm:w-auto' : ''
    } flex items-center justify-center gap-2 text-white px-4 py-2 rounded bg-nord-10 hover:bg-nord-9 text-nord-6 dark:bg-nord-7 dark:hover:bg-nord-8 dark:text-nord-0 text-sm`}
  >
    {#if typeof icon === 'string'}
      <span>{icon}</span>
    {:else}
      <svelte:component this={icon} class="w-4 h-4" />
    {/if}
    {label}
  </button>
  