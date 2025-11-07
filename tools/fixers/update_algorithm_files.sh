#!/bin/bash

# Script to update algorithm category files to match SlidingWindow.jsx format

echo "Starting update of algorithm files..."

FILES=(
    "Arrays.jsx:🔢:Arrays:Arrays"
    "BinarySearch.jsx:🔍:Binary Search:Binary Search"
    "BinarySearchTrees.jsx:🌳:Binary Search Trees:Binary Search Trees"
    "BinaryTrees.jsx:🌲:Binary Trees:Binary Trees"
    "BitManipulation.jsx:💡:Bit Manipulation:Bit Manipulation"
    "DataStructures.jsx:📚:Data Structures:Data Structures"
    "DynamicProgramming.jsx:🧮:Dynamic Programming:Dynamic Programming"
    "FamousAlgorithms.jsx:⭐:Famous Algorithms:Famous Algorithms"
    "Graphs.jsx:🗺️:Graphs:Graphs"
    "GreedyAlgorithms.jsx:🎯:Greedy Algorithms:Greedy Algorithms"
    "HashTables.jsx:📊:Hash Tables:Hash Tables"
    "Heaps.jsx:⛰️:Heaps:Heaps"
    "LinkedLists.jsx:🔗:Linked Lists:Linked Lists"
    "Queues.jsx:📋:Queues:Queues"
    "Recursion.jsx:♻️:Recursion:Recursion"
    "Sorting.jsx:📶:Sorting:Sorting"
    "Stacks.jsx:📚:Stacks:Stacks"
    "Strings.jsx:🔤:Strings:Strings"
    "Trees.jsx:🌴:Trees:Trees"
    "Trie.jsx:🔠:Trie:Trie"
    "TwoPointers.jsx:👉👈:Two Pointers:Two Pointers"
    "UnionFind.jsx:🔗:Union Find:Union Find"
)

for entry in "${FILES[@]}"; do
    IFS=':' read -r filename emoji title problemid <<< "$entry"
    filepath="src/pages/algorithms/$filename"
    
    if [ ! -f "$filepath" ]; then
        echo "⚠️  File not found: $filename"
        continue
    fi
    
    echo "Processing: $filename"
    
    # Create backup
    cp "$filepath" "${filepath}.backup"
    
done

echo "✓ Backups created for all files"
echo "Note: Manual updates required due to file complexity"
