export function diffClass(current, expected) {
  if (current === expected) return '';
  return 'bg-nord-5/60 dark:bg-nord-2/60';
}

export function getDiffColor(current, expected) {
  if (typeof expected !== 'number' || isNaN(expected)) {
    console.warn('Invalid expected:', expected);
    return 'transparent';
  }

  const diff = current - expected;
  const abs = Math.abs(diff);

  if (abs < 5) return 'rgba(229, 233, 240, 0.5)'; // nord-5
  if (diff > 0) return 'rgba(163, 190, 140, 0.3)'; // nord-14
  return 'rgba(191, 97, 106, 0.3)'; // nord-11
}

  export function diffTextColor(current, expected) {
    if (current > expected) return 'text-green-600';
    if (current < expected) return 'text-red-600';
    return '';
  }
  
  export function diffTooltip(current, expected, unit = '') {
    const diff = current - expected;
    if (diff === 0) return '';
    const sign = diff > 0 ? '+' : '';
    return `${sign}${diff}${unit}`;
  }

  export function isOutlier(current, expected, threshold = 3) {
    return Math.abs(current - expected) >= threshold;
  }

  export function outlierClass(current, expected) {
    if (isOutlier(current, expected)) {
      return current > expected
        ? 'bg-nord-14/40 dark:bg-nord-14/30'
        : 'bg-nord-11/40 dark:bg-nord-11/30';
    }
    return '';
  }

  export function getDiffClass(current, expected) {
    if (typeof expected !== 'number' || isNaN(expected)) {
      return 'bg-white dark:bg-nord-2'; // neutral standard
    }
  
    const diff = current - expected;
    const abs = Math.abs(diff);
  
    if (abs < 5) return 'bg-nord-5/60 dark:bg-nord-2/60';
    if (diff > 0) return 'bg-nord-14/40 dark:bg-nord-14/30';
    return 'bg-nord-11/40 dark:bg-nord-11/30';
  }
  
  