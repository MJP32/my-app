#!/usr/bin/env python3

# Topics in Practice - Algorithms
topics = [
    'Advanced Graphs',
    'Arrays',
    'Backtracking',
    'Binary Search',
    'Binary Search Trees',
    'Binary Trees',
    'Bit Manipulation',
    'Dynamic Programming',
    'Famous Algorithms',
    'Graphs',
    'Greedy Algorithms',
    'Hash Tables',
    'Heaps',
    'Intervals',
    'Linked Lists',
    'Math & Geometry',
    'Queues',
    'Recursion',
    'Searching',
    'Sliding Window',
    'Sorting',
    'Stacks',
    'Strings',
    'Trees',
    'Trie',
    'Two Pointers',
    'Union Find'
]

# Counts from getAllPracticeProblems
counts = {
    'Advanced Graphs': 5,
    'Arrays': 21,
    'Backtracking': 11,
    'Binary Search': 5,
    'Binary Search Trees': 3,
    'Binary Trees': 17,
    'Bit Manipulation': 7,
    'Graphs': 9,
    'Greedy Algorithms': 4,
    'Hash Tables': 11,
    'Heaps': 6,
    'Intervals': 7,
    'Linked Lists': 12,
    'Math & Geometry': 9,
    'Queues': 4,
    'Recursion': 8,
    'Searching': 2,
    'Sliding Window': 9,
    'Sorting': 4,
    'Stacks': 8,
    'Strings': 11,
    'Trees': 6,
    'Trie': 5,
    'Two Pointers': 5,
    'Union Find': 4,
    'Dynamic Programming': 17,
    'Famous Algorithms': 3,
}

total = 0
for topic in topics:
    count = counts.get(topic, 0)
    print(f"{topic}: {count}")
    total += count

print(f"\nTotal: {total}")
