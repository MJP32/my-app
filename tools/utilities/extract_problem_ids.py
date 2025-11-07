#!/usr/bin/env python3
import os
import re
import glob

def extract_problem_ids():
    categories = {
        'Algorithms': [],
        'Java': [],
        'Practice': [],
        'Design': [],
        'Python': []
    }

    paths = {
        'Algorithms': 'src/pages/algorithms/*.jsx',
        'Java': 'src/pages/java/*.jsx',
        'Practice': 'src/pages/practice/*.jsx',
        'Design': 'src/pages/design/*.jsx',
        'Python': 'src/pages/python/*.jsx'
    }

    for category, pattern in paths.items():
        for filepath in glob.glob(pattern):
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                # Find first CompletionCheckbox with problemId
                match = re.search(r'problemId=\{`([^-`]+)', content)
                if match:
                    problem_id = match.group(1)
                    categories[category].append(problem_id)

    # Print results
    for category, ids in categories.items():
        print(f"\n{category}:")
        for pid in sorted(set(ids)):
            print(f"  '{pid}',")

if __name__ == '__main__':
    extract_problem_ids()
