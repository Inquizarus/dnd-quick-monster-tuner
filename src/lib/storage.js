const MONSTERS_STORAGE_KEY = 'savedMonsters';
const BASELINES_STORAGE_KEY = 'customBaselines';
const DEFAULT_BASELINES_CONTENT = '[]';

export function saveMonster(monster) {
  const monsters = getMonsters();
  monsters.push({ ...monster, id: Date.now(), favorite: false });
  localStorage.setItem(MONSTERS_STORAGE_KEY, JSON.stringify(monsters));
}

export function getMonsters() {
  const raw = localStorage.getItem(MONSTERS_STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function deleteMonster(id) {
  const updated = getMonsters().filter(m => m.id !== id);
  localStorage.setItem(MONSTERS_STORAGE_KEY, JSON.stringify(updated));
}

export function toggleFavorite(id) {
  const monsters = getMonsters().map(m => m.id === id ? { ...m, favorite: !m.favorite } : m);
  localStorage.setItem(MONSTERS_STORAGE_KEY, JSON.stringify(monsters));
}

export function overwriteLibrary(newLibrary) {
  const withIds = newLibrary.map(m => ({ ...m, id: Date.now() + Math.random() }));
  localStorage.setItem(MONSTERS_STORAGE_KEY, JSON.stringify(withIds));
}

export function appendToLibrary(monstersToAdd) {
  const current = getMonsters();
  const withIds = monstersToAdd.map(m => ({ ...m, id: Date.now() + Math.random() }));
  const updated = [...current, ...withIds];
  localStorage.setItem(MONSTERS_STORAGE_KEY, JSON.stringify(updated));
}

export const saveCustomBaseline = baseline => {

  let baselines = getCustomBaselines()

  if (baselines.length < 1) {
    baselines.push(baseline)
  } else {
    baselines = baselines.map( curr => curr.name == baseline.name ? baseline : curr )
  }

  localStorage.setItem(
    BASELINES_STORAGE_KEY, 
    JSON.stringify(baselines)
  );
} 

export const deleteCustomBaseline = baseline => {
  localStorage.setItem(
    BASELINES_STORAGE_KEY, 
    JSON.stringify(
      getCustomBaselines().filter( item => item.name != baseline.name )
    )
  );
}

export function getCustomBaselines() {
  return JSON.parse(localStorage.getItem(BASELINES_STORAGE_KEY) || DEFAULT_BASELINES_CONTENT);
}