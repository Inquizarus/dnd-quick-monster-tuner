<script>
  import NordLayout from "./components/NordLayout.svelte";
  import {
    Upload,
    Download,
    BookmarkPlus,
    FolderDown,
    FolderUp,
    HelpCircle,
  } from "lucide-svelte";
  import { crToLabel, crFromLabel } from "./data/cr-scale.js";
  import { baselines, applyBaselineToMonster } from "./data/baselines.js";
  import BaselineSelector from "./components/BaselineSelector.svelte";
  import ScalingTable from "./components/ScalingTable.svelte";
  import MonsterLibrary from "./components/MonsterLibrary.svelte";
  import {
    saveMonster,
    getMonsters,
    deleteMonster,
    toggleFavorite,
    appendToLibrary,
    overwriteLibrary,
    getCustomBaselines,
    saveCustomBaseline,
    deleteCustomBaseline,
  } from "./lib/storage.js";

  import MonsterForm from "./components/MonsterForm.svelte";
  import AttributeHelpModal from "./components/AttributeHelpModal.svelte";
  import { attributes, defaultAttributes } from "./data/attributes.js";
  import ActionButton from "./components/ActionButton.svelte";
  import { onMount } from "svelte";
  import BaselineManager from "./components/BaselineManager.svelte";

  // Used to determine if help modal is showed or not
  let showHelp = false;

  let baseline = {};

  // Determines which baseline to use on current monster being tuned
  let selectedBaselineKey = null;

  // User defined baselines, filled at onMount
  let customBaselines = [];

  $: allBaselines = [...baselines, ...customBaselines];

  // Represents the actual monster that is currently being tuned
  let monster = { name: "", cr: 1, ...defaultAttributes };

  let monsters = getMonsters();

  function selectBaseline(key) {
    selectedBaselineKey = key;
    baseline = { ...allBaselines[key] };
  }

  function handleSaveCustomBaseline(e) {
    saveCustomBaseline(e.detail.baseline)
    customBaselines = getCustomBaselines()
  }

  function handleDeleteCustomBaseline(e) {
    deleteCustomBaseline(e.detail.baseline)
    customBaselines = getCustomBaselines()
  }

  function onApplyBaselineToMonster() {
    const preset = allBaselines[selectedBaselineKey];
    if (!preset) return;

    monster = applyBaselineToMonster(monster, baseline);
  }

  function exportMonsterAsJSON() {
    const { cr, ...rest } = monster;
    const label = crToLabel(cr);
    const data = JSON.stringify({ ...rest, cr: label }, null, 2);

    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${monster.name || "monster"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Used to handle monster file upload
  let monsterFileInput;

  function triggerMonsterFileInput() {
    monsterFileInput.click();
  }

  function importMonsterFromJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        const crValue = crFromLabel(data.cr);
        monster = { ...monster, ...data, cr: crValue };
      } catch (err) {
        alert("Error during import: Malformed JSON");
        console.error(err);
      }
    };
    reader.readAsText(file);
  }

  function loadMonsterFromLibrary(data) {
    monster = { ...monster, ...data };
  }

  /* Library functionality */

  function refreshMonstersInLibrary() {
    monsters = getMonsters();
  }

  function saveMonsterToLibrary() {
    saveMonster(monster);
    refreshMonstersInLibrary();
  }

  function handleDeleteMonster(id) {
    deleteMonster(id);
    refreshMonstersInLibrary();
  }

  function handleToggleFavorite(id) {
    toggleFavorite(id);
    refreshMonstersInLibrary();
  }

  function exportLibraryAsJSON() {
    const monsters = getMonsters();
    const blob = new Blob([JSON.stringify(monsters, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "monster-library.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  // Used to handle library file upload
  let libraryFileInput;

  function triggerimportLibraryFromJSON() {
    libraryFileInput.click();
  }

  function importLibraryFromJSON(event, mode = "append") {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (!Array.isArray(imported))
          throw new Error("Not a valid monster list");

        if (mode === "replace") {
          overwriteLibrary(imported);
        } else {
          appendToLibrary(imported);
        }

        refreshMonstersInLibrary();
      } catch (err) {
        alert("Fel vid import: Ogiltig JSON");
        console.error(err);
      }
    };

    reader.readAsText(file);
  }

  /* Scaling table functionality */

  // Called whenever "apply" is pressed in scaling table
  function applyScaledVersion(stats) {
    monster = { ...monster, ...stats };
  }

  const applicationName = "Quick Monster Tuner";

  onMount(() => {
    customBaselines = getCustomBaselines();
  });
</script>

<NordLayout>
  <h1 class="text-2xl text-nord-10 dark:text-nord-8 font-bold mb-4">{applicationName}<button
    on:click={() => (showHelp = true)}
    class="text-nord-10 hover:text-nord-9 transition"
    title="Show help for attributes"
  >
    <HelpCircle class="w-5 h-5" />
  </button>
  </h1>

  <BaselineSelector
    baselines={allBaselines}
    selectedKey={selectedBaselineKey ?? ''}
    onSelect={selectBaseline}
    onApply={onApplyBaselineToMonster}
  />

  <MonsterForm
    {monster}
    {baseline}
    on:change={(e) => {
      monster = e.detail.monster;
    }}
  />

  {#if selectedBaselineKey != null }
    <ScalingTable
      baseMonster={monster}
      {baseline}
      onApply={applyScaledVersion}
    />
  {/if}

  <div class="flex flex-wrap gap-2 mt-2">
    <ActionButton
      label="Export monster"
      icon={Download}
      onClick={exportMonsterAsJSON}
    />

    <ActionButton
      label="Import monster"
      icon={Upload}
      onClick={triggerMonsterFileInput}
    />

    <ActionButton
      label="Save in library"
      icon={BookmarkPlus}
      onClick={saveMonsterToLibrary}
    />

    <ActionButton
      label="Export library"
      icon={FolderDown}
      onClick={exportLibraryAsJSON}
    />

    <ActionButton
      label="Import library"
      icon={FolderUp}
      onClick={triggerimportLibraryFromJSON}
    />
  </div>

  <input
    type="file"
    accept=".json"
    class="hidden"
    bind:this={monsterFileInput}
    on:change={importMonsterFromJSON}
  />

  <input
    type="file"
    accept=".json"
    class="hidden"
    bind:this={libraryFileInput}
    on:change={(e) => importLibraryFromJSON(e, "append")}
  />


  {#if monsters.length > 0 }
    <MonsterLibrary
      {monsters}
      onLoad={loadMonsterFromLibrary}
      onDelete={handleDeleteMonster}
      onToggleFavorite={handleToggleFavorite}
    />
  {/if}

  <BaselineManager
    {attributes}
    onSave={ handleSaveCustomBaseline }
    onDelete={ handleDeleteCustomBaseline }
    baselines={ customBaselines }
  />

  <AttributeHelpModal
    show={showHelp}
    {attributes}
    onClose={() => (showHelp = false)}
  />

</NordLayout>
