<script>
    import DarkModeToggle from './DarkModeToggle.svelte';
  </script>
  
  <div class="min-h-screen bg-nord-6 dark:bg-nord-0 text-nord-0 dark:text-nord-4 transition-colors duration-300">
    <header class="flex justify-end p-4">
      <DarkModeToggle />
    </header>
  
    <main class="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <slot />
    </main>
  </div>
  