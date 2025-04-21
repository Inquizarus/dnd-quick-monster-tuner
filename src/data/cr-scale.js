export const CR_SCALE = [
    { label: '1/8', value: 0.125 },
    { label: '1/4', value: 0.25 },
    { label: '1/2', value: 0.5 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
    { label: '8', value: 8 },
    { label: '9', value: 9 },
    { label: '10', value: 10 },
    { label: '11', value: 11 },
    { label: '12', value: 12 },
    { label: '13', value: 13 },
    { label: '14', value: 14 },
    { label: '15', value: 15 },
    { label: '16', value: 16 },
    { label: '17', value: 17 },
    { label: '18', value: 18 },
    { label: '19', value: 19 },
    { label: '20', value: 20 },
    { label: '21', value: 21 },
    { label: '22', value: 22 },
    { label: '23', value: 23 },
    { label: '24', value: 24 },
    { label: '25', value: 25 },
    { label: '26', value: 26 },
    { label: '27', value: 27 },
    { label: '28', value: 28 },
    { label: '29', value: 29 },
    { label: '30', value: 30 }
];
  
export function crToLabel(value) {
    const found = CR_SCALE.find(c => c.value === value);
    return found ? found.label : value;
  }
  
  export function crFromLabel(label) {
    const found = CR_SCALE.find(c => c.label === label);
    return found ? found.value : parseFloat(label);
  }
  
  export function getCRRange(centerValue, range = 2) {
    const index = CR_SCALE.findIndex(c => c.value === centerValue);
    const start = Math.max(0, index - range);
    const end = Math.min(CR_SCALE.length - 1, index + range);
    return CR_SCALE.slice(start, end + 1);
  }