import re

with open('src/services/progressService.js', 'r') as f:
    content = f.read()

# Extract getAllPracticeProblems keys
problems_match = re.search(r'export const getAllPracticeProblems[\s\S]*?return \{([\s\S]*?)\n  \}', content)
problems_keys = [m.group(1) for m in re.finditer(r"'([^']+)':\s*\d+", problems_match.group(1))]

# Extract getCategoryGroupings values
groupings_match = re.search(r'export const getCategoryGroupings[\s\S]*?return \{([\s\S]*?)\n  \}', content)
groupings_values = [m.group(1) for m in re.finditer(r"'([^']+)'", groupings_match.group(1))]
groupings_values = [v for v in groupings_values if not v.startswith('Practice - ')]

# Find mismatches
missing = [v for v in groupings_values if v not in problems_keys]
unused = [k for k in problems_keys if k not in groupings_values]

print('=== Verification Results ===\n')
print(f'Total problem types defined: {len(problems_keys)}')
print(f'Total problem types referenced: {len(groupings_values)}\n')

if missing:
    print('❌ Referenced in getCategoryGroupings but NOT in getAllPracticeProblems:')
    for m in missing:
        print(f"   - '{m}'")
else:
    print('✅ All getCategoryGroupings entries exist in getAllPracticeProblems')

if unused:
    print('\n⚠️  Defined in getAllPracticeProblems but NOT referenced in any category:')
    for u in unused:
        print(f"   - '{u}'")
else:
    print('\n✅ All getAllPracticeProblems entries are referenced in categories')
