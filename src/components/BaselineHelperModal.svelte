<script>
    import Modal from './Modal.svelte';
    
    export let onClose = () => {}
    export let show = false;
  
  </script>
  
  {#if show}
    <Modal {onClose}>
      <h2 class="text-2xl font-semibold mb-4 text-nord-10 dark:text-nord-7">
        Baselines explained
      </h2>
      <div class="bg-nord-6 dark:bg-nord-1 text-nord-0 dark:text-nord-4 p-4 rounded mb-6">
        <h3 class="text-lg font-semibold mb-2">How to Write Formulas</h3>
        <p class="mb-2 text-sm">Each attribute is calculated using a formula based on the monster's <strong>CR</strong> (Challenge Rating).</p>
        <ul class="list-disc list-inside text-sm mb-4">
          <li><strong>CR</strong> — the challenge rating (e.g. 1, 2, 5)</li>
          <li><strong>DPR</strong> — used in <code>dpaFormula</code>, damage per round</li>
          <li><strong>DPR</strong> — used in <code>dpaFormula</code>, number of attacks</li>
        </ul>
        <h4 class="font-semibold mb-1">Examples:</h4>
        <ul class="text-sm mb-4">
          <li>HP: <code>17.5 * CR</code></li>
          <li>AC: <code>12 + 0.5 * CR</code></li>
          <li>PB: <code>4 + 0.5 * CR</code></li>
          <li>DPR: <code>7 * CR</code></li>
          <li>NOA: <code>CR &lt; 0.5 ? 1 : 2 + (CR - 0.5) * (2 / 9.5)</code></li>
          <li>DPA: <code>dpr / noa</code></li>
        </ul>
        <p class="text-sm mb-2">You can use math operators and <code>Math.</code> functions:</p>
        <ul class="list-disc list-inside text-sm">
          <li><code>Math.floor()</code>, <code>Math.ceil()</code>, <code>Math.round()</code></li>
          <li><code>Math.max()</code>, <code>Math.min()</code></li>
        </ul>
        <div class="mt-6 border-l-4 border-nord-11 bg-nord-11/10 dark:bg-nord-11/20 p-4 rounded text-sm text-nord-11 dark:text-nord-12">
            ⚠️ <strong>Warning:</strong> Make sure your formula returns a number. 
            Avoid using undefined variables or dividing by zero. For example, 
            <code>dpr / noa</code> is fine, but make sure <code>noa</code> is not 0.
          </div>
      </div>
    </Modal>
  {/if}
  