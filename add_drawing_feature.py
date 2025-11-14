#!/usr/bin/env python3
"""
Add drawing canvas feature to all algorithm practice pages.
This script adds:
1. Drawing load logic in selectQuestion function
2. Draw Sketch button
3. DrawingCanvas component rendering
"""

import os
import re

# Directory containing algorithm files
ALGO_DIR = "src/pages/algorithms"

# Get the category name from filename (e.g., "Arrays" from "Arrays.jsx")
def get_category_name(filename):
    return filename.replace('.jsx', '')

def process_file(filepath):
    category = get_category_name(os.path.basename(filepath))

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if DrawingCanvas is imported
    if 'import DrawingCanvas' not in content:
        print(f"⏭️  Skipping {category} - DrawingCanvas not imported")
        return False

    # Check if drawing feature already added (check for "Draw Sketch" button)
    if '🎨' in content and 'Draw' in content and 'Sketch' in content:
        print(f"✅ {category} - Already has drawing feature")
        return False

    modified = False

    # 1. Add drawing load logic to selectQuestion function
    select_question_pattern = r'(const selectQuestion = \(question\) => \{[^\}]*setShowDrawing\(false\))'
    if re.search(select_question_pattern, content, re.DOTALL):
        replacement = r'''\1
    // Load existing drawing for this problem
    const savedDrawing = localStorage.getItem(`drawing-''' + category + r'''-${question.id}`)
    setCurrentDrawing(savedDrawing)'''
        content = re.sub(select_question_pattern, replacement, content, count=1, flags=re.DOTALL)
        modified = True

    # 2. Add Draw Sketch button (find the Reset Code button and add after it)
    reset_button_pattern = r'(<button onClick=\{\(\) => setUserCode\(selectedQuestion\.code\[language\]\.starterCode\)\}[^>]*>[\s\S]*?Reset Code[\s\S]*?</button>)'

    draw_button = r'''\1
              <button onClick={() => setShowDrawing(true)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: currentDrawing ? '#8b5cf6' : '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🎨 {currentDrawing ? 'View' : 'Draw'} Sketch
              </button>'''

    if re.search(reset_button_pattern, content):
        content = re.sub(reset_button_pattern, draw_button, content, count=1)
        # Also add flexWrap to the button container
        content = re.sub(
            r'(<div style=\{\{ display: \'flex\', gap: \'1rem\', marginBottom: \'1rem\' )\}\}>',
            r"\1, flexWrap: 'wrap' }}>",
            content,
            count=1
        )
        modified = True

    # 3. Add DrawingCanvas component rendering before the closing of selectedQuestion view
    # Find the pattern: closing div tags before closing the selectedQuestion conditional
    # Look for the end of the grid/content area
    canvas_component = f'''
        {{/* Drawing Canvas Modal */}}
        <DrawingCanvas
          isOpen={{showDrawing}}
          onClose={{() => {{
            setShowDrawing(false)
            // Reload drawing in case it was updated
            const savedDrawing = localStorage.getItem(`drawing-{category}-${{selectedQuestion.id}}`)
            setCurrentDrawing(savedDrawing)
          }}}}
          problemId={{`{category}-${{selectedQuestion.id}}`}}
          existingDrawing={{currentDrawing}}
        />'''

    # Find the pattern right before the closing of the selectedQuestion conditional
    # This is typically right before "  )\n}\n\nreturn ("
    closing_pattern = r'(</div>\s+</div>\s+</div>\s+\)\s+\}\s+return \()'
    if re.search(closing_pattern, content):
        content = re.sub(closing_pattern, r'</div>\n        </div>' + canvas_component + r'\n      </div>\n    )\n  }\n\n  return (', content, count=1)
        modified = True

    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✨ {category} - Added drawing feature")
        return True
    else:
        print(f"⚠️  {category} - Could not add feature (pattern not found)")
        return False

def main():
    files_processed = 0
    files_modified = 0

    # Get all .jsx files in the algorithms directory
    for filename in sorted(os.listdir(ALGO_DIR)):
        if filename.endswith('.jsx'):
            filepath = os.path.join(ALGO_DIR, filename)
            files_processed += 1
            if process_file(filepath):
                files_modified += 1

    print(f"\n{'='*60}")
    print(f"📊 Summary:")
    print(f"   Files processed: {files_processed}")
    print(f"   Files modified: {files_modified}")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
