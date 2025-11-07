#!/usr/bin/env python3
"""
Update all remaining category files to show CompletionCheckbox and LeetCode link on question cards.
"""

import os
import re

def update_card_interface(file_path, category_name):
    """Update a single file's card interface to match Arrays.jsx pattern."""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the problemId prefix
    problem_id_match = re.search(r'problemId=\{`([^`]+)-\$\{', content)
    if not problem_id_match:
        print(f"  ⚠️  Could not find problemId pattern in {category_name}")
        return False

    problem_id_prefix = problem_id_match.group(1)

    # Old pattern in the title section (line with checkmark):
    old_title_pattern = r'(<h3 style=\{\{ fontSize: \'1\.1rem\', fontWeight: \'600\', color: \'#1f2937\', margin: 0, flex: 1 \}\}>\{question\.id\}\. \{question\.title\}</h3>)\s*\{isProblemCompleted\([^)]+\) && <span style=\{\{ fontSize: \'1\.25rem\' \}\}>✅</span>\}'

    # New title pattern (without checkmark):
    new_title_pattern = r'\1'

    # Replace the title section to remove checkmark
    content = re.sub(old_title_pattern, new_title_pattern, content)

    # Old pattern for bottom section (just difficulty badge):
    old_bottom_pattern = r'<div style=\{\{ display: \'flex\', gap: \'0\.5rem\', flexWrap: \'wrap\' \}\}>\s*<span style=\{\{ padding: \'0\.25rem 0\.75rem\', borderRadius: \'12px\', fontSize: \'0\.75rem\', fontWeight: \'600\', backgroundColor: getDifficultyColor\(question\.difficulty\) \+ \'20\', color: getDifficultyColor\(question\.difficulty\) \}\}>\{question\.difficulty\}</span>\s*</div>'

    # New bottom pattern (with CompletionCheckbox and LeetCode link):
    new_bottom_pattern = '''<div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`''' + problem_id_prefix + '''-${question.id}`} />
                        </div>
                        {question.leetcodeUrl && (
                          <a
                            href={question.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ padding: '0.25rem 0.75rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.75rem', fontWeight: '600', display: 'inline-block' }}
                          >
                            LeetCode ↗
                          </a>
                        )}
                      </div>
                    </div>'''

    # Replace the bottom section
    content = re.sub(old_bottom_pattern, new_bottom_pattern, content, flags=re.DOTALL)

    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    return True

def main():
    base_path = '/mnt/c/Users/micha/Documents/dev/oct/my-app'

    # Java Features (6 files)
    java_features_files = [
        'src/pages/java/Streams.jsx',
        'src/pages/java/StreamsAdvanced.jsx',
        'src/pages/java/Lambdas.jsx',
        'src/pages/java/LambdasAdvanced.jsx',
        'src/pages/java/FunctionalInterfaces.jsx',
        'src/pages/java/CollectionsFramework.jsx',
    ]

    # Concurrency (2 files)
    concurrency_files = [
        'src/pages/java/Concurrency.jsx',
        'src/pages/java/Multithreading.jsx',
    ]

    # Core Java Fundamentals (6 files)
    core_java_files = [
        'src/pages/java/ExceptionHandling.jsx',
        'src/pages/java/FileIO.jsx',
        'src/pages/java/ObjectOrientedProgramming.jsx',
        'src/pages/practice/JVMInternals.jsx',
        'src/pages/java/MemoryManagement.jsx',
        'src/pages/java/Generics.jsx',
    ]

    # System Design (1 file)
    system_design_files = [
        'src/pages/design/SystemDesign.jsx',
    ]

    # Python Operations (2 files)
    python_files = [
        'src/pages/practice/SetOperations.jsx',
        'src/pages/practice/MapOperations.jsx',
    ]

    # Process all categories
    all_categories = [
        ("Java Features", java_features_files),
        ("Concurrency", concurrency_files),
        ("Core Java Fundamentals", core_java_files),
        ("System Design", system_design_files),
        ("Python Operations", python_files),
    ]

    for category_name, files in all_categories:
        print(f"\n{category_name}:")
        for file in files:
            file_path = os.path.join(base_path, file)
            file_name = os.path.basename(file).replace('.jsx', '')
            print(f"  Processing {file_name}...", end=' ')

            if update_card_interface(file_path, file_name):
                print("✅")
            else:
                print("❌")

    print("\n✅ All files updated!")

if __name__ == '__main__':
    main()
