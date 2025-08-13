// CompareLogic.js
// Deeply compares multiple JS objects (parsed XMLs) and returns differences in a format suitable for frontend table rendering.

// CompareLogic.js
// Deep diff for two parsed XML objects, reporting only changed/added/removed fields for table display

function deepDiff(obj1, obj2, path = '') {
  let diffs = [];

  if (typeof obj1 !== typeof obj2) {
    diffs.push({ path, values: [obj1, obj2], status: 'Changed' });
    return diffs;
  }

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    const maxLen = Math.max(obj1.length, obj2.length);
    for (let i = 0; i < maxLen; i++) {
      const newPath = `${path}[${i}]`;
      if (i >= obj1.length) {
        diffs.push({ path: newPath, values: ['(missing)', obj2[i]], status: 'Added' });
      } else if (i >= obj2.length) {
        diffs.push({ path: newPath, values: [obj1[i], '(missing)'], status: 'Removed' });
      } else {
        diffs = diffs.concat(deepDiff(obj1[i], obj2[i], newPath));
      }
    }
    return diffs;
  }

  if (typeof obj1 === 'object' && obj1 !== null && typeof obj2 === 'object' && obj2 !== null) {
    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    for (const key of keys) {
      const newPath = path ? `${path}/${key}` : key;
      if (!(key in obj1)) {
        diffs.push({ path: newPath, values: ['(missing)', obj2[key]], status: 'Added' });
      } else if (!(key in obj2)) {
        diffs.push({ path: newPath, values: [obj1[key], '(missing)'], status: 'Removed' });
      } else {
        diffs = diffs.concat(deepDiff(obj1[key], obj2[key], newPath));
      }
    }
    return diffs;
  }

  if (obj1 !== obj2) {
    diffs.push({ path, values: [obj1, obj2], status: 'Changed' });
  }
  return diffs;
}

function compareObjects(xmlObjects) {
  // Only compare the first two objects for now
  const diffs = deepDiff(xmlObjects[0], xmlObjects[1]);
  // Format for frontend table
  return diffs.map(diff => ({
    definitionKey: diff.path,
    definitionName: diff.path.split('/').slice(-1)[0],
    values: diff.values,
    status: diff.status
  }));
}

module.exports = { compareObjects };

