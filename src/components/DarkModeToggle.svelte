<script>
    import { onMount } from 'svelte';
  
    let isDark = false;
  
    function toggleDarkMode() {
      isDark = !isDark;
      updateDOM();
      localStorage.setItem('darkMode', isDark ? 'true' : 'false');
    }
  
    function updateDOM() {
      const html = document.documentElement;
      html.classList.toggle('dark', isDark);
    }
  
    onMount(() => {
      isDark = localStorage.getItem('darkMode') === 'true';
      updateDOM();
    });
  </script>
  
  <button
    on:click={toggleDarkMode}
    class="text-xl p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    title="Toggle dark mode"
  >
    {#if isDark}
      🌙
    {:else}
      🌞
    {/if}
  </button>
  