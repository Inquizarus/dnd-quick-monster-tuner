<script>
  import Modal from './Modal.svelte';
  
  export let onClose = () => {}
  export let attributes = [];
  export let show = false;

</script>

{#if show}
  <Modal {onClose}>
    <h2 class="text-2xl font-semibold mb-4 text-nord-10 dark:text-nord-7">
      Help
    </h2>

    <ul class="space-y-4 text-sm leading-relaxed">
      {#each attributes as attr}
        <li>
          <strong class="text-nord-10 dark:text-nord-7">{attr.abbreviation}</strong> –
          <em class="text-nord-3 dark:text-nord-5">{attr.name}</em><br />
          <span class="text-nord-3 dark:text-nord-5">{attr.description}</span>
        </li>
      {/each}
    </ul>
  </Modal>
{/if}
