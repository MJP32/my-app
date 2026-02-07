// Quick verification of progressService.js mappings
const fs = require('fs');
const content = fs.readFileSync('src/services/progressService.js', 'utf8');

// Extract getAllPracticeProblems keys
const problemsMatch = content.match(/export const getAllPracticeProblems[\s\S]*?return \{([\s\S]*?)\n {2}\}/);
const problemsKeys = [...problemsMatch[1].matchAll(/'([^']+)':\s*\d+/g)].map(m => m[1]);

// Extract getCategoryGroupings values
const groupingsMatch = content.match(/export const getCategoryGroupings[\s\S]*?return \{([\s\S]*?)\n {2}\}/);
const groupingsValues = [...groupingsMatch[1].matchAll(/'([^']+)'/g)]
  .map(m => m[1])
  .filter(v => !v.startsWith('Practice - ')); // Remove category names

// Find mismatches
const missing = groupingsValues.filter(v => !problemsKeys.includes(v));
const unused = problemsKeys.filter(k => !groupingsValues.includes(k));

console.log('=== Verification Results ===\n');
console.log(`Total problem types defined: ${problemsKeys.length}`);
console.log(`Total problem types referenced: ${groupingsValues.length}\n`);

if (missing.length > 0) {
  console.log('❌ Referenced in getCategoryGroupings but NOT in getAllPracticeProblems:');
  missing.forEach(m => console.log(`   - '${m}'`));
} else {
  console.log('✅ All getCategoryGroupings entries exist in getAllPracticeProblems');
}

if (unused.length > 0) {
  console.log('\n⚠️  Defined in getAllPracticeProblems but NOT referenced in any category:');
  unused.forEach(u => console.log(`   - '${u}'`));
} else {
  console.log('\n✅ All getAllPracticeProblems entries are referenced in categories');
}
