<script>
  import { CirclePlus, Upload } from "lucide-svelte";
  import BaselineEditor from "./BaselineEditor.svelte";
  import ActionButton from "./ActionButton.svelte";

  let showEditor = false;
  let editingBaseline = null;

  export let attributes = [];
  export let baselines = [];
  export let onSave = () => {};
  export let onDelete = () => {};

  let baselineFileInput;

  function triggerBaselineFileInput() {
    baselineFileInput.click();
  }

  function importBaselineFromJSON(e) {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        handleSave({detail: { baseline: data }})
      } catch (err) {
        alert("Error during import: Malformed JSON");
        console.error(err);
      }
    };
    reader.readAsText(file);

  }

  function exportBaselineAsJSON(baseline) {
    const data = JSON.stringify(baseline, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseline.name || ""}_baseline.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleSave(event) {
    onSave(event);
    showEditor = false;
    editingBaseline = null;
  }

  function edit(baseline) {
    editingBaseline = baseline;
    showEditor = true;
  }
</script>

<div class="mb-6">
  <h2 class="text-xl font-semibold mb-4 text-nord-3 dark:text-nord-5">
    Baselines
  </h2>

  <div class="grid sm:grid-cols-2 gap-4">
    {#each baselines as b}
      <div
        class="bg-nord-6 dark:bg-nord-1 p-4 rounded-xl shadow transition hover:shadow-md"
      >
        <h3 class="font-semibold text-nord-0 dark:text-nord-5 mb-1">
          {b.name}
        </h3>
        <p class="text-sm text-nord-3 dark:text-nord-4 mb-3">{b.description}</p>

        <button
          class="text-sm text-nord-10 hover:text-nord-9 underline transition"
          on:click={() => edit(b)}
        >
          Edit
        </button>
        <button
        class="text-sm text-nord-10 hover:text-nord-9 underline transition"
        on:click={exportBaselineAsJSON(b)}
      >
        Export
      </button>
        <button
          class="text-sm text-red-600 hover:text-red-500 underline transition"
          on:click={(e) => onDelete({ ...e, detail: { baseline: b } })}
        >
          Delete
        </button>

      </div>
    {/each}
  </div>
  <div class="flex flex-wrap gap-2 mt-2">
    <ActionButton
      label="New baseline"
      icon={CirclePlus}
      onClick={() => {
        editingBaseline = null;
        showEditor = true;
      }}
    />
    <ActionButton
      label="Import baseline"
      icon={Upload}
      onClick={triggerBaselineFileInput}
    />
  </div>
</div>
<input
  type="file"
  accept=".json"
  class="hidden"
  bind:this={baselineFileInput}
  on:change={importBaselineFromJSON}
/>

{#if showEditor}
  <BaselineEditor
    {attributes}
    initial={baselines.length > 0
      ? baselines.reduce((b) =>
          b != null || b.name == editingBaseline ? b : null,
        )
      : null}
    on:save={handleSave}
    on:cancel={() => (showEditor = false)}
  />
{/if}
