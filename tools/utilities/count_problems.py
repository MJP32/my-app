#!/usr/bin/env python3
import os
import re
import glob

def count_problems():
    paths = {
        'Algorithms': 'src/pages/algorithms/*.jsx',
        'Java': 'src/pages/java/*.jsx',
        'Practice': 'src/pages/practice/*.jsx',
        'Design': 'src/pages/design/*.jsx',
        'Python': 'src/pages/python/*.jsx'
    }

    results = {}

    for category, pattern in paths.items():
        for filepath in glob.glob(pattern):
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                # Find first CompletionCheckbox with problemId to get the name
                match = re.search(r'problemId=\{`([^-`]+)', content)
                if match:
                    problem_id = match.group(1)
                    # Count all CompletionCheckbox occurrences
                    count = len(re.findall(r'<CompletionCheckbox', content))
                    results[problem_id] = count

    # Print results sorted by key
    for key in sorted(results.keys()):
        print(f"    '{key}': {results[key]},")

if __name__ == '__main__':
    count_problems()
