const alphabeticSort = (arr) => {
  const sorted = [...arr].sort((a, b) => {
    const lowerA = (a.unitName || '').toLowerCase();
    const lowerB = (b.unitName || '').toLowerCase();
    return lowerA.localeCompare(lowerB);
  });
  return sorted;
};

const floorSort = (arr) => {
  const sorted = [...arr].sort(
    (a, b) => parseFloat(a.floor || 0) - parseFloat(b.floor || 0)
  );
  return sorted;
};

export const fullUnitSort = (arr) => {
  const alpha = alphabeticSort(arr);
  return floorSort(alpha);
};
