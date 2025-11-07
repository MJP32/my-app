#!/usr/bin/env python3
"""
Fix broken onClick handlers in algorithm components
"""

import re
import glob

files = glob.glob('src/pages/algorithms/*.jsx')

def fix_onclick(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"❌ Error reading {file_path}: {e}")
        return False

    # Pattern to match broken onClick
    # Find: onClick={() =\n  tabIndex
    # And the matching end: }}> shouldCollapse && setExpandedSections...
    pattern = r'<h2\s*\n\s*onClick=\{\(\) =\s*\n\s*tabIndex=\{shouldCollapse \? 0 : -1\}\s*\n\s*role=\{shouldCollapse \? "button" : undefined\}\s*\n\s*aria-expanded=\{shouldCollapse \? isExpanded : undefined\}\s*\n\s*onKeyDown=\{\(e\) => \{\s*\n\s*if \(shouldCollapse && \(e\.key === "Enter" \|\| e\.key === " "\)\) \{\s*\n\s*e\.preventDefault\(\)\s*\n\s*setExpandedSections\(prev => \(\{ \.\.\.prev, (Easy|Medium|Hard): !prev\.\1 \}\)\)\s*\n\s*\}\s*\n\s*\}\}\s*> shouldCollapse && setExpandedSections\(prev => \(\{ \.\.\.prev, \1: !prev\.\1 \}\)\)\}\s*\n\s*style=\{\{'

    def replacement(match):
        difficulty = match.group(1)
        return f'''<h2
                  onClick={{() => shouldCollapse && setExpandedSections(prev => ({{ ...prev, {difficulty}: !prev.{difficulty} }}))}}
                  tabIndex={{shouldCollapse ? 0 : -1}}
                  role={{shouldCollapse ? "button" : undefined}}
                  aria-expanded={{shouldCollapse ? isExpanded : undefined}}
                  onKeyDown={{(e) => {{
                    if (shouldCollapse && (e.key === "Enter" || e.key === " ")) {{
                      e.preventDefault()
                      setExpandedSections(prev => ({{ ...prev, {difficulty}: !prev.{difficulty} }}))
                    }}
                  }}}}
                  style={{{{'''

    modified = False
    count = 0
    content_new = content

    for match in re.finditer(pattern, content, re.MULTILINE | re.DOTALL):
        content_new = re.sub(pattern, replacement, content_new, count=1)
        count += 1
        modified = True

    if modified:
        try:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content_new)
            print(f"✅ Fixed {count} issues in {file_path}")
            return True
        except Exception as e:
            print(f"❌ Error writing {file_path}: {e}")
            return False

    return False

print("="*60)
print("Fixing onClick handlers")
print("="*60)

success_count = 0
for file_path in files:
    if fix_onclick(file_path):
        success_count += 1

print(f"\n{'='*60}")
print(f"✅ Fixed {success_count} files")
print(f"{'='*60}")
