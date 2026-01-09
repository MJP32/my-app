import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

const customTheme = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: '#1e1e1e',
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: 'transparent',
  },
}

function SortingAlgorithms({ onBack, breadcrumb }) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null)

  const algorithms = [
    {
      id: 'bubble-sort',
      name: 'Bubble Sort',
      icon: '🫧',
      color: '#3b82f6',
      category: 'Comparison',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      stable: true,
      description: 'Repeatedly swaps adjacent elements if they are in wrong order. Simple but inefficient for large datasets.',
      whenToUse: [
        'Educational purposes',
        'Very small datasets',
        'Nearly sorted data (with optimization)',
        'When simplicity is preferred over efficiency'
      ],
      codeExample: `# Basic Bubble Sort
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Optimized Bubble Sort (stops early if sorted)
def bubble_sort_optimized(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # If no swapping occurred, array is sorted
        if not swapped:
            break
    return arr

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(arr.copy()))  # [11, 12, 22, 25, 34, 64, 90]`,
      visualization: `Pass 1: [64, 34, 25, 12, 22, 11, 90]
        64 > 34? Yes, swap → [34, 64, 25, 12, 22, 11, 90]
        64 > 25? Yes, swap → [34, 25, 64, 12, 22, 11, 90]
        ...continues until largest bubbles to end

Pass 2: [34, 25, 12, 22, 11, 64, 90]
        Second largest bubbles up...

Each pass places one element in final position.`
    },
    {
      id: 'selection-sort',
      name: 'Selection Sort',
      icon: '👆',
      color: '#8b5cf6',
      category: 'Comparison',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      stable: false,
      description: 'Finds minimum element and places it at the beginning. Continues for remaining unsorted portion.',
      whenToUse: [
        'Small datasets',
        'When memory writes are expensive',
        'When simplicity is needed',
        'Minimum number of swaps required'
      ],
      codeExample: `# Selection Sort
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        # Find minimum element in unsorted portion
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j

        # Swap minimum with first unsorted element
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# Example usage
arr = [64, 25, 12, 22, 11]
print(selection_sort(arr))  # [11, 12, 22, 25, 64]

# Selection sort always makes O(n²) comparisons
# but only O(n) swaps - useful when swaps are costly`,
      visualization: `[64, 25, 12, 22, 11]
 ↓ Find min (11), swap with 64
[11, 25, 12, 22, 64]
     ↓ Find min (12), swap with 25
[11, 12, 25, 22, 64]
         ↓ Find min (22), swap with 25
[11, 12, 22, 25, 64]
             ↓ Already minimum
[11, 12, 22, 25, 64] ✓ Sorted`
    },
    {
      id: 'insertion-sort',
      name: 'Insertion Sort',
      icon: '📥',
      color: '#10b981',
      category: 'Comparison',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      stable: true,
      description: 'Builds sorted array one element at a time by inserting each element into its correct position.',
      whenToUse: [
        'Small datasets',
        'Nearly sorted data (O(n) best case)',
        'Online sorting (data arrives in stream)',
        'As part of hybrid algorithms (TimSort)'
      ],
      codeExample: `# Insertion Sort
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1

        # Move elements greater than key one position ahead
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1

        arr[j + 1] = key
    return arr

# Binary Insertion Sort (fewer comparisons)
def binary_insertion_sort(arr):
    from bisect import bisect_left, insort_left

    result = []
    for item in arr:
        insort_left(result, item)
    return result

# Example usage
arr = [12, 11, 13, 5, 6]
print(insertion_sort(arr))  # [5, 6, 11, 12, 13]

# Best case: O(n) when array is already sorted
# Adaptive: efficient for partially sorted arrays`,
      visualization: `[12, 11, 13, 5, 6]
     ↓ Insert 11: shift 12 right
[11, 12, 13, 5, 6]
         ↓ Insert 13: already in place
[11, 12, 13, 5, 6]
             ↓ Insert 5: shift 13,12,11 right
[5, 11, 12, 13, 6]
                 ↓ Insert 6: shift 13,12,11 right
[5, 6, 11, 12, 13] ✓ Sorted`
    },
    {
      id: 'merge-sort',
      name: 'Merge Sort',
      icon: '🔀',
      color: '#f59e0b',
      category: 'Divide & Conquer',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      stable: true,
      description: 'Divides array into halves, recursively sorts them, then merges the sorted halves.',
      whenToUse: [
        'Large datasets requiring guaranteed O(n log n)',
        'When stability is required',
        'External sorting (files too large for memory)',
        'Linked list sorting (O(1) extra space)'
      ],
      codeExample: `# Merge Sort
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result

# In-place merge sort (reduces space to O(1) but complex)
def merge_sort_inplace(arr, left=0, right=None):
    if right is None:
        right = len(arr) - 1

    if left < right:
        mid = (left + right) // 2
        merge_sort_inplace(arr, left, mid)
        merge_sort_inplace(arr, mid + 1, right)
        merge_inplace(arr, left, mid, right)

# Example usage
arr = [38, 27, 43, 3, 9, 82, 10]
print(merge_sort(arr))  # [3, 9, 10, 27, 38, 43, 82]`,
      visualization: `[38, 27, 43, 3, 9, 82, 10]
        ↙           ↘
[38, 27, 43]    [3, 9, 82, 10]
   ↙    ↘          ↙      ↘
[38] [27,43]    [3,9]  [82,10]
        ↓           ↓       ↓
[38] [27][43]   [3][9] [10][82]
        ↓           ↓       ↓
     [27,43]      [3,9]  [10,82]
   ↘    ↙          ↘      ↙
 [27,38,43]      [3,9,10,82]
        ↘          ↙
   [3, 9, 10, 27, 38, 43, 82]`
    },
    {
      id: 'quick-sort',
      name: 'Quick Sort',
      icon: '⚡',
      color: '#ef4444',
      category: 'Divide & Conquer',
      timeComplexity: 'O(n log n) avg, O(n²) worst',
      spaceComplexity: 'O(log n)',
      stable: false,
      description: 'Picks a pivot, partitions array around it, then recursively sorts the partitions.',
      whenToUse: [
        'General-purpose sorting',
        'When average case performance matters',
        'In-place sorting needed',
        'Arrays (not linked lists)'
      ],
      codeExample: `# Quick Sort (Lomuto partition)
def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1

    if low < high:
        pivot_idx = partition(arr, low, high)
        quick_sort(arr, low, pivot_idx - 1)
        quick_sort(arr, pivot_idx + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]  # Choose last element as pivot
    i = low - 1

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Quick Sort with random pivot (avoids worst case)
import random

def quick_sort_random(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1

    if low < high:
        # Random pivot selection
        rand_idx = random.randint(low, high)
        arr[rand_idx], arr[high] = arr[high], arr[rand_idx]

        pivot_idx = partition(arr, low, high)
        quick_sort_random(arr, low, pivot_idx - 1)
        quick_sort_random(arr, pivot_idx + 1, high)
    return arr

# 3-way Quick Sort (handles duplicates efficiently)
def quick_sort_3way(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1

    if low >= high:
        return

    pivot = arr[low]
    lt, gt = low, high
    i = low + 1

    while i <= gt:
        if arr[i] < pivot:
            arr[lt], arr[i] = arr[i], arr[lt]
            lt += 1
            i += 1
        elif arr[i] > pivot:
            arr[gt], arr[i] = arr[i], arr[gt]
            gt -= 1
        else:
            i += 1

    quick_sort_3way(arr, low, lt - 1)
    quick_sort_3way(arr, gt + 1, high)
    return arr

# Example usage
arr = [10, 7, 8, 9, 1, 5]
print(quick_sort(arr.copy()))  # [1, 5, 7, 8, 9, 10]`,
      visualization: `[10, 7, 8, 9, 1, 5] pivot=5
        partition around 5
[1] [5] [10, 7, 8, 9]
 ↓       ↓ pivot=9
[1] [5] [7, 8] [9] [10]
         ↓ pivot=8
[1] [5] [7] [8] [9] [10]
= [1, 5, 7, 8, 9, 10]`
    },
    {
      id: 'heap-sort',
      name: 'Heap Sort',
      icon: '🏔️',
      color: '#06b6d4',
      category: 'Comparison',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      stable: false,
      description: 'Builds a max heap, then repeatedly extracts the maximum element to sort.',
      whenToUse: [
        'Guaranteed O(n log n) performance',
        'Memory-constrained environments',
        'Finding k largest/smallest elements',
        'Priority queue operations'
      ],
      codeExample: `# Heap Sort
def heap_sort(arr):
    n = len(arr)

    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)

    # Extract elements from heap one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]  # Move max to end
        heapify(arr, i, 0)  # Restore heap property

    return arr

def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2

    if left < n and arr[left] > arr[largest]:
        largest = left

    if right < n and arr[right] > arr[largest]:
        largest = right

    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

# Using Python's heapq module
import heapq

def heap_sort_builtin(arr):
    heapq.heapify(arr)  # Min heap
    return [heapq.heappop(arr) for _ in range(len(arr))]

# Example usage
arr = [12, 11, 13, 5, 6, 7]
print(heap_sort(arr.copy()))  # [5, 6, 7, 11, 12, 13]`,
      visualization: `Array: [12, 11, 13, 5, 6, 7]

Build Max Heap:
        13
       /  \\
     11    12
    / \\   /
   5   6  7

Extract max (13), heapify:
        12
       /  \\
     11    7
    / \\
   5   6

Continue until sorted...`
    },
    {
      id: 'counting-sort',
      name: 'Counting Sort',
      icon: '🔢',
      color: '#ec4899',
      category: 'Non-Comparison',
      timeComplexity: 'O(n + k)',
      spaceComplexity: 'O(k)',
      stable: true,
      description: 'Counts occurrences of each element, then calculates positions. Works for integers in a known range.',
      whenToUse: [
        'Integers in a known, limited range',
        'When k (range) is O(n)',
        'As subroutine in Radix Sort',
        'Counting frequencies'
      ],
      codeExample: `# Counting Sort (for non-negative integers)
def counting_sort(arr):
    if not arr:
        return arr

    max_val = max(arr)
    count = [0] * (max_val + 1)

    # Count occurrences
    for num in arr:
        count[num] += 1

    # Reconstruct sorted array
    result = []
    for i, c in enumerate(count):
        result.extend([i] * c)

    return result

# Stable Counting Sort (preserves order of equal elements)
def counting_sort_stable(arr):
    if not arr:
        return arr

    max_val = max(arr)
    min_val = min(arr)
    range_size = max_val - min_val + 1

    count = [0] * range_size
    output = [0] * len(arr)

    # Count occurrences
    for num in arr:
        count[num - min_val] += 1

    # Calculate cumulative count (positions)
    for i in range(1, range_size):
        count[i] += count[i - 1]

    # Build output array (traverse in reverse for stability)
    for num in reversed(arr):
        idx = count[num - min_val] - 1
        output[idx] = num
        count[num - min_val] -= 1

    return output

# Example usage
arr = [4, 2, 2, 8, 3, 3, 1]
print(counting_sort(arr))  # [1, 2, 2, 3, 3, 4, 8]`,
      visualization: `Array: [4, 2, 2, 8, 3, 3, 1]

Count array (index = value):
[0, 1, 2, 2, 1, 0, 0, 0, 1]
 0  1  2  3  4  5  6  7  8

Cumulative count (positions):
[0, 1, 3, 5, 6, 6, 6, 6, 7]

Result: [1, 2, 2, 3, 3, 4, 8]`
    },
    {
      id: 'radix-sort',
      name: 'Radix Sort',
      icon: '🔟',
      color: '#84cc16',
      category: 'Non-Comparison',
      timeComplexity: 'O(d × (n + k))',
      spaceComplexity: 'O(n + k)',
      stable: true,
      description: 'Sorts numbers digit by digit, from least significant to most significant.',
      whenToUse: [
        'Integers or strings with fixed length',
        'When d (digits) is small relative to n',
        'Large datasets of numbers',
        'Sorting strings lexicographically'
      ],
      codeExample: `# Radix Sort (LSD - Least Significant Digit first)
def radix_sort(arr):
    if not arr:
        return arr

    max_val = max(arr)
    exp = 1  # Current digit position

    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10

    return arr

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10

    # Count occurrences of each digit
    for num in arr:
        digit = (num // exp) % 10
        count[digit] += 1

    # Cumulative count
    for i in range(1, 10):
        count[i] += count[i - 1]

    # Build output (reverse for stability)
    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % 10
        output[count[digit] - 1] = arr[i]
        count[digit] -= 1

    # Copy back to original
    for i in range(n):
        arr[i] = output[i]

# Radix Sort for strings
def radix_sort_strings(arr):
    if not arr:
        return arr

    max_len = max(len(s) for s in arr)

    # Pad strings to same length
    padded = [s.ljust(max_len) for s in arr]

    # Sort from rightmost character
    for i in range(max_len - 1, -1, -1):
        padded.sort(key=lambda x: x[i])

    return [s.strip() for s in padded]

# Example usage
arr = [170, 45, 75, 90, 802, 24, 2, 66]
print(radix_sort(arr))  # [2, 24, 45, 66, 75, 90, 170, 802]`,
      visualization: `Array: [170, 45, 75, 90, 802, 24, 2, 66]

Sort by 1s digit:
[170, 90, 802, 2, 24, 45, 75, 66]

Sort by 10s digit:
[802, 2, 24, 45, 66, 170, 75, 90]

Sort by 100s digit:
[2, 24, 45, 66, 75, 90, 170, 802]`
    },
    {
      id: 'bucket-sort',
      name: 'Bucket Sort',
      icon: '🪣',
      color: '#a855f7',
      category: 'Non-Comparison',
      timeComplexity: 'O(n + k) avg',
      spaceComplexity: 'O(n)',
      stable: true,
      description: 'Distributes elements into buckets, sorts each bucket, then concatenates.',
      whenToUse: [
        'Uniformly distributed data',
        'Floating-point numbers in range [0, 1)',
        'When input is uniformly distributed',
        'External sorting'
      ],
      codeExample: `# Bucket Sort
def bucket_sort(arr, num_buckets=10):
    if not arr:
        return arr

    min_val, max_val = min(arr), max(arr)
    bucket_range = (max_val - min_val) / num_buckets + 1

    # Create buckets
    buckets = [[] for _ in range(num_buckets)]

    # Distribute elements into buckets
    for num in arr:
        idx = int((num - min_val) / bucket_range)
        buckets[idx].append(num)

    # Sort each bucket and concatenate
    result = []
    for bucket in buckets:
        bucket.sort()  # Can use insertion sort for small buckets
        result.extend(bucket)

    return result

# Bucket Sort for floats in [0, 1)
def bucket_sort_floats(arr):
    n = len(arr)
    buckets = [[] for _ in range(n)]

    # Put elements in buckets
    for num in arr:
        idx = int(n * num)
        buckets[idx].append(num)

    # Sort buckets using insertion sort
    for bucket in buckets:
        insertion_sort(bucket)

    # Concatenate buckets
    result = []
    for bucket in buckets:
        result.extend(bucket)
    return result

def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

# Example usage
arr = [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51]
print(bucket_sort_floats(arr))`,
      visualization: `Array: [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51]

Buckets (for floats 0-1):
Bucket 3: [0.32, 0.33, 0.37]
Bucket 4: [0.42, 0.47]
Bucket 5: [0.52, 0.51]

After sorting each bucket:
Bucket 3: [0.32, 0.33, 0.37]
Bucket 4: [0.42, 0.47]
Bucket 5: [0.51, 0.52]

Concatenate: [0.32, 0.33, 0.37, 0.42, 0.47, 0.51, 0.52]`
    },
    {
      id: 'tim-sort',
      name: 'Tim Sort',
      icon: '🐍',
      color: '#3776ab',
      category: 'Hybrid',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      stable: true,
      description: "Python's built-in sort. Hybrid of merge sort and insertion sort, optimized for real-world data.",
      whenToUse: [
        'Default choice for Python (built-in)',
        'Real-world data with natural runs',
        'When stability is required',
        'General-purpose sorting'
      ],
      codeExample: `# Tim Sort is Python's built-in sorting algorithm
# It's what sorted() and list.sort() use

# Basic usage
arr = [5, 2, 9, 1, 5, 6]
sorted_arr = sorted(arr)  # Uses Tim Sort
print(sorted_arr)  # [1, 2, 5, 5, 6, 9]

# In-place sorting
arr.sort()  # Uses Tim Sort
print(arr)  # [1, 2, 5, 5, 6, 9]

# Tim Sort key features:
# 1. Identifies natural "runs" (sorted subsequences)
# 2. Uses insertion sort for small runs (< 64 elements)
# 3. Merges runs using merge sort technique
# 4. Optimized for partially sorted data

# Simplified Tim Sort implementation
def tim_sort(arr):
    MIN_RUN = 32
    n = len(arr)

    # Sort small runs using insertion sort
    for start in range(0, n, MIN_RUN):
        end = min(start + MIN_RUN - 1, n - 1)
        insertion_sort_range(arr, start, end)

    # Merge runs
    size = MIN_RUN
    while size < n:
        for left in range(0, n, 2 * size):
            mid = min(left + size - 1, n - 1)
            right = min(left + 2 * size - 1, n - 1)
            if mid < right:
                merge(arr, left, mid, right)
        size *= 2

    return arr

def insertion_sort_range(arr, left, right):
    for i in range(left + 1, right + 1):
        key = arr[i]
        j = i - 1
        while j >= left and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

def merge(arr, left, mid, right):
    left_arr = arr[left:mid + 1]
    right_arr = arr[mid + 1:right + 1]

    i = j = 0
    k = left

    while i < len(left_arr) and j < len(right_arr):
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1

    while i < len(left_arr):
        arr[k] = left_arr[i]
        i += 1
        k += 1

    while j < len(right_arr):
        arr[k] = right_arr[j]
        j += 1
        k += 1

# Example
arr = [5, 21, 7, 23, 19]
print(tim_sort(arr))  # [5, 7, 19, 21, 23]`,
      visualization: `Array: [5, 1, 4, 2, 8, 9, 3, 7, 6]

Step 1: Find natural runs
Run 1: [5] → [1, 5] → [1, 4, 5]
Run 2: [2, 8, 9]
Run 3: [3, 7] → [3, 6, 7]

Step 2: Extend small runs with insertion sort
Step 3: Merge runs using merge sort

Key insight: Real data often has "runs" of
sorted elements, Tim Sort exploits this!`
    },
    {
      id: 'shell-sort',
      name: 'Shell Sort',
      icon: '🐚',
      color: '#64748b',
      category: 'Comparison',
      timeComplexity: 'O(n log² n) to O(n²)',
      spaceComplexity: 'O(1)',
      stable: false,
      description: 'Generalization of insertion sort that allows exchange of far-apart elements.',
      whenToUse: [
        'Medium-sized arrays',
        'When quick implementation needed',
        'Embedded systems with limited memory',
        'Better than insertion sort for larger arrays'
      ],
      codeExample: `# Shell Sort
def shell_sort(arr):
    n = len(arr)
    gap = n // 2

    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i

            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap

            arr[j] = temp

        gap //= 2

    return arr

# Shell Sort with different gap sequences
def shell_sort_knuth(arr):
    """Uses Knuth's gap sequence: 1, 4, 13, 40, 121..."""
    n = len(arr)

    # Generate gap sequence
    gap = 1
    while gap < n // 3:
        gap = 3 * gap + 1

    while gap >= 1:
        for i in range(gap, n):
            temp = arr[i]
            j = i

            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap

            arr[j] = temp

        gap //= 3

    return arr

# Example usage
arr = [12, 34, 54, 2, 3]
print(shell_sort(arr))  # [2, 3, 12, 34, 54]`,
      visualization: `Array: [8, 9, 1, 7, 2, 3, 5, 4, 6, 0]

Gap = 5:
Compare (8,3), (9,5), (1,4), (7,6), (2,0)
[3, 5, 1, 6, 0, 8, 9, 4, 7, 2]

Gap = 2:
Compare elements 2 apart...
[0, 2, 1, 4, 3, 6, 5, 8, 7, 9]

Gap = 1:
Regular insertion sort
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`
    }
  ]

  // Render algorithm detail view
  if (selectedAlgorithm) {
    const algorithm = algorithms.find(a => a.id === selectedAlgorithm)
    if (!algorithm) return null

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
        color: 'white',
        padding: '1.5rem'
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          {/* Header */}
          <div style={{
            background: `linear-gradient(135deg, ${algorithm.color}20, ${algorithm.color}40)`,
            borderRadius: '1rem',
            padding: '2rem',
            marginBottom: '2rem',
            border: `2px solid ${algorithm.color}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ fontSize: '4rem' }}>{algorithm.icon}</span>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {algorithm.name}
                  </h2>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: algorithm.color,
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      {algorithm.category}
                    </span>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: algorithm.stable ? '#10b981' : '#f59e0b',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      {algorithm.stable ? 'Stable' : 'Unstable'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedAlgorithm(null)}
                style={{
                  background: '#dc2626',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '1rem'
                }}
              >
                Close
              </button>
            </div>
          </div>

          {/* Description */}
          <p style={{
            fontSize: '1.1rem',
            color: '#d1d5db',
            lineHeight: '1.8',
            marginBottom: '2rem'
          }}>
            {algorithm.description}
          </p>

          {/* Complexity & When to Use */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Complexity */}
            <div style={{
              background: '#1f2937',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              border: '1px solid #3b82f6'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#93c5fd' }}>
                Complexity
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <span style={{ color: '#9ca3af' }}>Time: </span>
                  <span style={{ color: '#10b981', fontWeight: '600' }}>{algorithm.timeComplexity}</span>
                </div>
                <div>
                  <span style={{ color: '#9ca3af' }}>Space: </span>
                  <span style={{ color: '#f59e0b', fontWeight: '600' }}>{algorithm.spaceComplexity}</span>
                </div>
              </div>
            </div>

            {/* When to Use */}
            <div style={{
              background: '#1f2937',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              border: '1px solid #3b82f6'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#93c5fd' }}>
                When to Use
              </h3>
              <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.6', color: '#d1d5db', margin: 0 }}>
                {algorithm.whenToUse.map((use, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>{use}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visualization */}
          <div style={{
            background: '#1f2937',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            border: '1px solid #3b82f6'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#93c5fd' }}>
              How It Works
            </h3>
            <pre style={{
              backgroundColor: '#111827',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
              fontSize: '0.85rem',
              lineHeight: '1.6',
              color: '#d1d5db',
              fontFamily: 'monospace'
            }}>
              {algorithm.visualization}
            </pre>
          </div>

          {/* Code Implementation */}
          <div style={{
            background: '#1f2937',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            border: '1px solid #3b82f6'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#93c5fd' }}>
              Python Implementation
            </h3>
            <div style={{
              backgroundColor: '#1e1e1e',
              borderRadius: '0.5rem',
              overflow: 'auto',
              border: '1px solid #3b82f6'
            }}>
              <SyntaxHighlighter
                language="python"
                style={customTheme}
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  background: '#1e1e1e'
                }}
              >
                {algorithm.codeExample}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main view - algorithm cards
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onBack}
              style={{
                background: '#2563eb',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1d4ed8'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2563eb'
              }}
            >
              ← Back
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Sorting Algorithms
            </h1>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} />

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'center',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          Master the fundamental sorting algorithms with Python implementations, complexity analysis, and visualizations.
        </p>

        {/* Comparison Table */}
        <div style={{
          background: '#1f2937',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid #3b82f6',
          overflowX: 'auto'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#93c5fd' }}>
            Quick Comparison
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #374151' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: '#9ca3af' }}>Algorithm</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: '#9ca3af' }}>Time (Best)</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: '#9ca3af' }}>Time (Avg)</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: '#9ca3af' }}>Time (Worst)</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: '#9ca3af' }}>Space</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: '#9ca3af' }}>Stable</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Bubble Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', true],
                ['Selection Sort', 'O(n²)', 'O(n²)', 'O(n²)', 'O(1)', false],
                ['Insertion Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', true],
                ['Merge Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(n)', true],
                ['Quick Sort', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n)', false],
                ['Heap Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(1)', false],
                ['Counting Sort', 'O(n+k)', 'O(n+k)', 'O(n+k)', 'O(k)', true],
                ['Radix Sort', 'O(nk)', 'O(nk)', 'O(nk)', 'O(n+k)', true],
                ['Tim Sort', 'O(n)', 'O(n log n)', 'O(n log n)', 'O(n)', true],
              ].map(([name, best, avg, worst, space, stable], idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #374151' }}>
                  <td style={{ padding: '0.75rem', color: '#d1d5db', fontWeight: '500' }}>{name}</td>
                  <td style={{ padding: '0.75rem', color: '#10b981' }}>{best}</td>
                  <td style={{ padding: '0.75rem', color: '#f59e0b' }}>{avg}</td>
                  <td style={{ padding: '0.75rem', color: '#ef4444' }}>{worst}</td>
                  <td style={{ padding: '0.75rem', color: '#60a5fa' }}>{space}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{ color: stable ? '#10b981' : '#f59e0b' }}>
                      {stable ? '✓' : '✗'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Algorithm Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {algorithms.map(algorithm => (
            <button
              key={algorithm.id}
              onClick={() => setSelectedAlgorithm(algorithm.id)}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                border: `2px solid ${algorithm.color}`,
                cursor: 'pointer',
                transition: 'all 0.3s',
                textAlign: 'left',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = `0 25px 50px -12px ${algorithm.color}40`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '2.5rem' }}>{algorithm.icon}</span>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#93c5fd',
                    marginBottom: '0.25rem'
                  }}>
                    {algorithm.name}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={{
                      padding: '0.15rem 0.5rem',
                      backgroundColor: algorithm.color,
                      borderRadius: '0.25rem',
                      fontSize: '0.7rem',
                      color: 'white'
                    }}>
                      {algorithm.category}
                    </span>
                    <span style={{
                      padding: '0.15rem 0.5rem',
                      backgroundColor: algorithm.stable ? '#10b981' : '#f59e0b',
                      borderRadius: '0.25rem',
                      fontSize: '0.7rem',
                      color: 'white'
                    }}>
                      {algorithm.stable ? 'Stable' : 'Unstable'}
                    </span>
                  </div>
                </div>
              </div>
              <p style={{
                fontSize: '0.9rem',
                color: '#d1d5db',
                lineHeight: '1.5',
                marginBottom: '1rem'
              }}>
                {algorithm.description}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '0.75rem',
                borderTop: '1px solid #374151',
                fontSize: '0.8rem'
              }}>
                <div>
                  <span style={{ color: '#9ca3af' }}>Time: </span>
                  <span style={{ color: '#10b981' }}>{algorithm.timeComplexity}</span>
                </div>
                <div>
                  <span style={{ color: '#9ca3af' }}>Space: </span>
                  <span style={{ color: '#f59e0b' }}>{algorithm.spaceComplexity}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SortingAlgorithms
