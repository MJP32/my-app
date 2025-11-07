#!/usr/bin/env python3
import re

files_to_fix = [
    "BinarySearchTrees", "BinaryTrees", "DynamicProgramming",
    "FamousAlgorithms", "Graphs", "GreedyAlgorithms", "Heaps",
    "Queues", "Recursion", "Searching", "Sorting", "Trie", "UnionFind"
]

for component_name in files_to_fix:
    filepath = "src/pages/algorithms/" + component_name + ".jsx"

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find and replace pattern using string concatenation to avoid f-string issues
        old_pattern = '''      )}
    </div>
  )
}


      {/* Drawing Canvas Modal */}
      <DrawingCanvas
        isOpen={showDrawing}
        onClose={closeDrawingModal}
        problemId={selectedQuestion ? `''' + component_name + '''-${selectedQuestion.id}` : ''}
        existingDrawing={currentDrawing}
      />
export default ''' + component_name

        new_pattern = '''      )}

      {/* Drawing Canvas Modal */}
      <DrawingCanvas
        isOpen={showDrawing}
        onClose={closeDrawingModal}
        problemId={selectedQuestion ? `''' + component_name + '''-${selectedQuestion.id}` : ''}
        existingDrawing={currentDrawing}
      />
    </div>
  )
}

export default ''' + component_name

        fixed_content = content.replace(old_pattern, new_pattern)

        if fixed_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            print("✓ Fixed " + component_name + ".jsx")
        else:
            print("✗ No changes in " + component_name + ".jsx (pattern not found)")

    except Exception as e:
        print("Error fixing " + component_name + ".jsx: " + str(e))

print("\nDone!")
