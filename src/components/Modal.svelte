<script>
  import { fade } from "svelte/transition";
  import { onMount, onDestroy } from "svelte";
  import Portal from "svelte-portal";

  export let onClose = () => {};

  let overlay;
  let modal;

  function lockScroll() {
    document.body.style.overflow = "hidden";
  }

  function unlockScroll() {
    document.body.style.overflow = "";
  }

  function handleKey(e) {
    if (e.key === "Escape") {
      onClose();
    }

    if (e.key === "Tab") {
      const focusables = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  onMount(() => {
    overlay?.focus();
    modal?.addEventListener("keydown", handleKey);
    lockScroll();
  });

  onDestroy(() => {
  unlockScroll();
});
</script>

<Portal>
  <div
    bind:this={overlay}
    tabindex="-1"
    class="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
    role="dialog"
    aria-modal="true"
    on:click|self={onClose}
    on:keydown={handleKey}
    transition:fade
  >
    <div
      bind:this={modal}
      class="bg-nord-6 dark:bg-nord-1 text-nord-0 dark:text-nord-4 max-w-md w-full p-6 rounded-lg shadow-xl relative transition-colors"
      transition:fade={{ duration: 150 }}
    >
      <button
        class="absolute top-2 right-2 text-nord-3 dark:text-nord-5 hover:text-nord-0 dark:hover:text-white text-xl"
        on:click={onClose}
        title="Close"
      >
        ✖
      </button>

      <slot />
    </div>
  </div>
</Portal>
