import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

function LeetCodePatterns({ onBack }) {
  const [selectedPattern, setSelectedPattern] = useState(null)

  const patterns = [
    {
      id: 'two-pointers',
      name: 'Two Pointers',
      icon: '👉👈',
      color: '#3b82f6',
      category: 'Array & String',
      description: 'Use two pointers moving toward each other or in the same direction',
      whenToUse: [
        'Sorted array problems',
        'Finding pairs with a target sum',
        'Reversing arrays/strings',
        'Removing duplicates',
        'Palindrome checking'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      codeExample: `# Pattern: Two pointers from both ends
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1

    while left < right:
        current_sum = arr[left] + arr[right]

        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum

    return [-1, -1]

# Pattern: Two pointers same direction (fast & slow)
def remove_duplicates(arr):
    if not arr:
        return 0

    slow = 0  # Position for next unique element

    for fast in range(1, len(arr)):
        if arr[fast] != arr[slow]:
            slow += 1
            arr[slow] = arr[fast]

    return slow + 1  # Length of unique elements

# Pattern: Palindrome check
def is_palindrome(s):
    left, right = 0, len(s) - 1

    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1

    return True

# Example: 3Sum problem
def three_sum(nums):
    nums.sort()
    result = []

    for i in range(len(nums) - 2):
        # Skip duplicates for first number
        if i > 0 and nums[i] == nums[i-1]:
            continue

        left, right = i + 1, len(nums) - 1

        while left < right:
            total = nums[i] + nums[left] + nums[right]

            if total == 0:
                result.append([nums[i], nums[left], nums[right]])

                # Skip duplicates
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1

                left += 1
                right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1

    return result`,
      commonProblems: [
        'Two Sum II (sorted array)',
        'Three Sum',
        'Remove Duplicates from Sorted Array',
        'Valid Palindrome',
        'Container With Most Water',
        'Trapping Rain Water'
      ]
    },
    {
      id: 'sliding-window',
      name: 'Sliding Window',
      icon: '🪟',
      color: '#10b981',
      category: 'Array & String',
      description: 'Maintain a window of elements and slide it through the array',
      whenToUse: [
        'Contiguous subarrays/substrings',
        'Fixed or dynamic window size',
        'Maximum/minimum in window',
        'Longest/shortest substring problems',
        'Finding all anagrams'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(k) where k is window size',
      codeExample: `# Pattern: Fixed size window
def max_sum_subarray(arr, k):
    """Maximum sum of k consecutive elements"""
    window_sum = sum(arr[:k])
    max_sum = window_sum

    for i in range(k, len(arr)):
        # Slide window: remove left, add right
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)

    return max_sum

# Pattern: Dynamic window (expand/contract)
def longest_substring_k_distinct(s, k):
    """Longest substring with at most k distinct chars"""
    char_count = {}
    left = 0
    max_length = 0

    for right in range(len(s)):
        # Expand window
        char_count[s[right]] = char_count.get(s[right], 0) + 1

        # Contract window if needed
        while len(char_count) > k:
            char_count[s[left]] -= 1
            if char_count[s[left]] == 0:
                del char_count[s[left]]
            left += 1

        max_length = max(max_length, right - left + 1)

    return max_length

# Pattern: Find all anagrams
def find_anagrams(s, p):
    """Find all start indices of p's anagrams in s"""
    from collections import Counter

    result = []
    p_count = Counter(p)
    window_count = Counter()

    for i in range(len(s)):
        # Add right character
        window_count[s[i]] += 1

        # Remove left character if window too large
        if i >= len(p):
            if window_count[s[i - len(p)]] == 1:
                del window_count[s[i - len(p)]]
            else:
                window_count[s[i - len(p)]] -= 1

        # Check if window matches
        if window_count == p_count:
            result.append(i - len(p) + 1)

    return result

# Pattern: Longest substring without repeating chars
def length_longest_substring(s):
    char_index = {}
    left = 0
    max_length = 0

    for right in range(len(s)):
        if s[right] in char_index:
            # Move left pointer past the duplicate
            left = max(left, char_index[s[right]] + 1)

        char_index[s[right]] = right
        max_length = max(max_length, right - left + 1)

    return max_length`,
      commonProblems: [
        'Maximum Sum Subarray of Size K',
        'Longest Substring Without Repeating Characters',
        'Minimum Window Substring',
        'Find All Anagrams in a String',
        'Longest Substring with K Distinct Characters',
        'Sliding Window Maximum'
      ]
    },
    {
      id: 'fast-slow-pointers',
      name: 'Fast & Slow Pointers',
      icon: '🐢🐇',
      color: '#f59e0b',
      category: 'Linked List',
      description: 'Two pointers moving at different speeds (Floyd\'s Cycle Detection)',
      whenToUse: [
        'Detecting cycles in linked lists',
        'Finding middle of linked list',
        'Finding cycle start position',
        'Palindrome linked list',
        'Happy Number problem'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      codeExample: `# Pattern: Cycle detection
def has_cycle(head):
    """Detect if linked list has a cycle"""
    slow = fast = head

    while fast and fast.next:
        slow = slow.next       # Move 1 step
        fast = fast.next.next  # Move 2 steps

        if slow == fast:
            return True  # Cycle detected

    return False

# Pattern: Find cycle start
def detect_cycle_start(head):
    """Find the node where cycle begins"""
    slow = fast = head

    # Detect if cycle exists
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            break
    else:
        return None  # No cycle

    # Find cycle start
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next

    return slow

# Pattern: Find middle of linked list
def find_middle(head):
    """Find middle node (for even length, return 2nd middle)"""
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    return slow

# Pattern: Palindrome linked list
def is_palindrome(head):
    """Check if linked list is palindrome"""
    if not head or not head.next:
        return True

    # Find middle
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    # Reverse second half
    prev = None
    while slow:
        next_node = slow.next
        slow.next = prev
        prev = slow
        slow = next_node

    # Compare both halves
    left, right = head, prev
    while right:  # Only check second half
        if left.val != right.val:
            return False
        left = left.next
        right = right.next

    return True

# Pattern: Happy Number
def is_happy(n):
    """Check if number is happy"""
    def get_next(num):
        total = 0
        while num > 0:
            digit = num % 10
            total += digit * digit
            num //= 10
        return total

    slow = fast = n

    while True:
        slow = get_next(slow)
        fast = get_next(get_next(fast))

        if fast == 1:
            return True
        if slow == fast:
            return False  # Cycle detected`,
      commonProblems: [
        'Linked List Cycle',
        'Linked List Cycle II',
        'Middle of the Linked List',
        'Palindrome Linked List',
        'Happy Number',
        'Reorder List'
      ]
    },
    {
      id: 'merge-intervals',
      name: 'Merge Intervals',
      icon: '📊',
      color: '#8b5cf6',
      category: 'Array',
      description: 'Merge overlapping intervals or find conflicts',
      whenToUse: [
        'Overlapping intervals',
        'Meeting room problems',
        'Interval conflicts',
        'Minimum platforms needed',
        'Insert new interval'
      ],
      timeComplexity: 'O(n log n) for sorting',
      spaceComplexity: 'O(n)',
      codeExample: `# Pattern: Merge overlapping intervals
def merge(intervals):
    """Merge all overlapping intervals"""
    if not intervals:
        return []

    # Sort by start time
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for current in intervals[1:]:
        last = merged[-1]

        if current[0] <= last[1]:  # Overlap
            # Merge intervals
            last[1] = max(last[1], current[1])
        else:
            # No overlap, add new interval
            merged.append(current)

    return merged

# Pattern: Insert interval
def insert(intervals, newInterval):
    """Insert and merge a new interval"""
    result = []
    i = 0
    n = len(intervals)

    # Add all intervals before newInterval
    while i < n and intervals[i][1] < newInterval[0]:
        result.append(intervals[i])
        i += 1

    # Merge overlapping intervals
    while i < n and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1

    result.append(newInterval)

    # Add remaining intervals
    while i < n:
        result.append(intervals[i])
        i += 1

    return result

# Pattern: Meeting rooms
def can_attend_meetings(intervals):
    """Check if person can attend all meetings"""
    intervals.sort(key=lambda x: x[0])

    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i-1][1]:
            return False  # Overlap found

    return True

# Pattern: Minimum meeting rooms
def min_meeting_rooms(intervals):
    """Minimum number of meeting rooms needed"""
    if not intervals:
        return 0

    start_times = sorted([i[0] for i in intervals])
    end_times = sorted([i[1] for i in intervals])

    rooms = 0
    max_rooms = 0
    start_ptr = end_ptr = 0

    while start_ptr < len(intervals):
        if start_times[start_ptr] < end_times[end_ptr]:
            rooms += 1  # Need new room
            max_rooms = max(max_rooms, rooms)
            start_ptr += 1
        else:
            rooms -= 1  # Room freed
            end_ptr += 1

    return max_rooms

# Pattern: Interval intersection
def interval_intersection(A, B):
    """Find intersection of two interval lists"""
    result = []
    i = j = 0

    while i < len(A) and j < len(B):
        # Find intersection
        start = max(A[i][0], B[j][0])
        end = min(A[i][1], B[j][1])

        if start <= end:  # Valid intersection
            result.append([start, end])

        # Move pointer of interval that ends first
        if A[i][1] < B[j][1]:
            i += 1
        else:
            j += 1

    return result`,
      commonProblems: [
        'Merge Intervals',
        'Insert Interval',
        'Meeting Rooms',
        'Meeting Rooms II',
        'Interval List Intersections',
        'Non-overlapping Intervals'
      ]
    },
    {
      id: 'cyclic-sort',
      name: 'Cyclic Sort',
      icon: '🔄',
      color: '#ec4899',
      category: 'Array',
      description: 'Sort array by placing each element at its correct index',
      whenToUse: [
        'Array contains numbers in range [1, n]',
        'Finding missing numbers',
        'Finding duplicate numbers',
        'First missing positive',
        'Numbers in continuous range'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      codeExample: `# Pattern: Cyclic sort
def cyclic_sort(nums):
    """Sort array where nums[i] should be at index nums[i] - 1"""
    i = 0
    while i < len(nums):
        correct_idx = nums[i] - 1

        # If number is not at correct position, swap
        if nums[i] != nums[correct_idx]:
            nums[i], nums[correct_idx] = nums[correct_idx], nums[i]
        else:
            i += 1

    return nums

# Pattern: Find missing number
def find_missing_number(nums):
    """Find missing number in range [0, n]"""
    i = 0
    n = len(nums)

    # Cyclic sort (place each number at its index)
    while i < n:
        correct_idx = nums[i]
        if nums[i] < n and nums[i] != nums[correct_idx]:
            nums[i], nums[correct_idx] = nums[correct_idx], nums[i]
        else:
            i += 1

    # Find first index where number doesn't match
    for i in range(n):
        if nums[i] != i:
            return i

    return n  # All numbers present, missing is n

# Pattern: Find all missing numbers
def find_disappeared_numbers(nums):
    """Find all numbers missing from [1, n]"""
    i = 0

    # Cyclic sort
    while i < len(nums):
        correct_idx = nums[i] - 1
        if nums[i] != nums[correct_idx]:
            nums[i], nums[correct_idx] = nums[correct_idx], nums[i]
        else:
            i += 1

    # Collect missing numbers
    missing = []
    for i in range(len(nums)):
        if nums[i] != i + 1:
            missing.append(i + 1)

    return missing

# Pattern: Find duplicate number
def find_duplicate(nums):
    """Find the duplicate number (array has n+1 elements in range [1, n])"""
    i = 0

    while i < len(nums):
        correct_idx = nums[i] - 1

        if nums[i] != nums[correct_idx]:
            nums[i], nums[correct_idx] = nums[correct_idx], nums[i]
        else:
            i += 1

    # The duplicate will be at an incorrect position
    for i in range(len(nums)):
        if nums[i] != i + 1:
            return nums[i]

# Pattern: First missing positive
def first_missing_positive(nums):
    """Find smallest missing positive integer"""
    n = len(nums)

    # Place each positive number at its correct index
    for i in range(n):
        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
            correct_idx = nums[i] - 1
            nums[i], nums[correct_idx] = nums[correct_idx], nums[i]

    # Find first missing positive
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1

    return n + 1  # All [1, n] present`,
      commonProblems: [
        'Missing Number',
        'Find All Numbers Disappeared in an Array',
        'Find the Duplicate Number',
        'Find All Duplicates in an Array',
        'First Missing Positive',
        'Set Mismatch'
      ]
    },
    {
      id: 'top-k-elements',
      name: 'Top K Elements',
      icon: '🏆',
      color: '#ef4444',
      category: 'Heap',
      description: 'Use heap to efficiently find top/bottom K elements',
      whenToUse: [
        'Finding K largest/smallest elements',
        'K most frequent elements',
        'Kth largest element',
        'K closest points',
        'Top K frequent words'
      ],
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(k)',
      codeExample: `import heapq

# Pattern: K largest elements (use min heap of size k)
def find_k_largest(nums, k):
    """Find k largest elements"""
    # Maintain min heap of size k
    min_heap = []

    for num in nums:
        heapq.heappush(min_heap, num)

        if len(min_heap) > k:
            heapq.heappop(min_heap)  # Remove smallest

    return list(min_heap)

# Pattern: Kth largest element
def find_kth_largest(nums, k):
    """Find kth largest element"""
    min_heap = []

    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)

    return min_heap[0]  # Root is kth largest

# Pattern: K closest points to origin
def k_closest(points, k):
    """Find k closest points to origin"""
    # Use max heap (negate distances)
    max_heap = []

    for x, y in points:
        dist = -(x*x + y*y)  # Negate for max heap

        if len(max_heap) < k:
            heapq.heappush(max_heap, (dist, [x, y]))
        elif dist > max_heap[0][0]:
            heapq.heapreplace(max_heap, (dist, [x, y]))

    return [point for _, point in max_heap]

# Pattern: Top K frequent elements
def top_k_frequent(nums, k):
    """Find k most frequent elements"""
    from collections import Counter

    count = Counter(nums)

    # Use min heap with frequency
    return heapq.nlargest(k, count.keys(), key=count.get)

# Alternative: Using bucket sort for O(n) time
def top_k_frequent_bucket(nums, k):
    from collections import Counter

    count = Counter(nums)
    # bucket[i] contains elements with frequency i
    bucket = [[] for _ in range(len(nums) + 1)]

    for num, freq in count.items():
        bucket[freq].append(num)

    result = []
    # Iterate from highest frequency
    for i in range(len(bucket) - 1, 0, -1):
        result.extend(bucket[i])
        if len(result) >= k:
            return result[:k]

    return result

# Pattern: K closest numbers to target
def find_k_closest(arr, k, x):
    """Find k numbers closest to x in sorted array"""
    # Use max heap storing absolute differences
    max_heap = []

    for num in arr:
        diff = -abs(num - x)  # Negate for max heap

        if len(max_heap) < k:
            heapq.heappush(max_heap, (diff, num))
        elif diff > max_heap[0][0]:
            heapq.heapreplace(max_heap, (diff, num))

    return sorted([num for _, num in max_heap])

# Pattern: Kth smallest element in sorted matrix
def kth_smallest_matrix(matrix, k):
    """Find kth smallest in row and column sorted matrix"""
    n = len(matrix)
    min_heap = []

    # Add first element of each row
    for r in range(min(k, n)):
        heapq.heappush(min_heap, (matrix[r][0], r, 0))

    count = 0
    result = 0

    while min_heap:
        result, r, c = heapq.heappop(min_heap)
        count += 1

        if count == k:
            return result

        # Add next element in same row
        if c + 1 < len(matrix[r]):
            heapq.heappush(min_heap, (matrix[r][c+1], r, c+1))

    return result`,
      commonProblems: [
        'Kth Largest Element in Array',
        'Top K Frequent Elements',
        'K Closest Points to Origin',
        'Kth Smallest Element in Sorted Matrix',
        'Find K Closest Elements',
        'Top K Frequent Words'
      ]
    },
    {
      id: 'binary-search',
      name: 'Modified Binary Search',
      icon: '🔍',
      color: '#06b6d4',
      category: 'Array',
      description: 'Binary search variations for different scenarios',
      whenToUse: [
        'Sorted arrays',
        'Finding target or closest value',
        'Rotated sorted arrays',
        'First/last occurrence',
        'Search in 2D matrix'
      ],
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      codeExample: `# Pattern: Standard binary search
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

# Pattern: First occurrence
def find_first(arr, target):
    left, right = 0, len(arr) - 1
    result = -1

    while left <= right:
        mid = left + (right - left) // 2

        if arr[mid] == target:
            result = mid
            right = mid - 1  # Continue searching left
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return result

# Pattern: Search in rotated sorted array
def search_rotated(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if nums[mid] == target:
            return mid

        # Determine which half is sorted
        if nums[left] <= nums[mid]:  # Left half sorted
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:  # Right half sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1

# Pattern: Find peak element
def find_peak_element(nums):
    left, right = 0, len(nums) - 1

    while left < right:
        mid = left + (right - left) // 2

        if nums[mid] > nums[mid + 1]:
            # Peak is on left side (including mid)
            right = mid
        else:
            # Peak is on right side
            left = mid + 1

    return left

# Pattern: Search 2D matrix (row & col sorted)
def search_matrix(matrix, target):
    if not matrix or not matrix[0]:
        return False

    # Start from top-right corner
    row, col = 0, len(matrix[0]) - 1

    while row < len(matrix) and col >= 0:
        if matrix[row][col] == target:
            return True
        elif matrix[row][col] > target:
            col -= 1  # Move left
        else:
            row += 1  # Move down

    return False

# Pattern: Find minimum in rotated sorted array
def find_min_rotated(nums):
    left, right = 0, len(nums) - 1

    while left < right:
        mid = left + (right - left) // 2

        if nums[mid] > nums[right]:
            # Minimum is in right half
            left = mid + 1
        else:
            # Minimum is in left half (including mid)
            right = mid

    return nums[left]

# Pattern: Find square root (binary search on answer)
def my_sqrt(x):
    if x < 2:
        return x

    left, right = 1, x // 2

    while left <= right:
        mid = left + (right - left) // 2
        square = mid * mid

        if square == x:
            return mid
        elif square < x:
            left = mid + 1
        else:
            right = mid - 1

    return right  # Floor value`,
      commonProblems: [
        'Binary Search',
        'Search in Rotated Sorted Array',
        'Find First and Last Position in Sorted Array',
        'Search a 2D Matrix',
        'Find Minimum in Rotated Sorted Array',
        'Peak Index in Mountain Array'
      ]
    },
    {
      id: 'tree-dfs',
      name: 'Tree DFS',
      icon: '🌳',
      color: '#22c55e',
      category: 'Tree',
      description: 'Depth-First Search for tree problems',
      whenToUse: [
        'Tree traversal (inorder, preorder, postorder)',
        'Path sum problems',
        'Maximum depth',
        'Tree diameter',
        'Validate BST'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h) where h is height',
      codeExample: `# Pattern: Preorder traversal (Root -> Left -> Right)
def preorder_traversal(root):
    result = []

    def dfs(node):
        if not node:
            return
        result.append(node.val)  # Visit root first
        dfs(node.left)
        dfs(node.right)

    dfs(root)
    return result

# Pattern: Inorder traversal (Left -> Root -> Right)
def inorder_traversal(root):
    result = []

    def dfs(node):
        if not node:
            return
        dfs(node.left)
        result.append(node.val)  # Visit root in middle
        dfs(node.right)

    dfs(root)
    return result

# Pattern: Postorder traversal (Left -> Right -> Root)
def postorder_traversal(root):
    result = []

    def dfs(node):
        if not node:
            return
        dfs(node.left)
        dfs(node.right)
        result.append(node.val)  # Visit root last

    dfs(root)
    return result

# Pattern: Maximum depth
def max_depth(root):
    if not root:
        return 0

    left_depth = max_depth(root.left)
    right_depth = max_depth(root.right)

    return 1 + max(left_depth, right_depth)

# Pattern: Path sum
def has_path_sum(root, target_sum):
    if not root:
        return False

    # Leaf node
    if not root.left and not root.right:
        return root.val == target_sum

    remaining = target_sum - root.val
    return (has_path_sum(root.left, remaining) or
            has_path_sum(root.right, remaining))

# Pattern: All root-to-leaf paths
def binary_tree_paths(root):
    if not root:
        return []

    paths = []

    def dfs(node, path):
        if not node.left and not node.right:  # Leaf
            paths.append(path + str(node.val))
            return

        if node.left:
            dfs(node.left, path + str(node.val) + "->")
        if node.right:
            dfs(node.right, path + str(node.val) + "->")

    dfs(root, "")
    return paths

# Pattern: Diameter of tree
def diameter_of_tree(root):
    diameter = 0

    def height(node):
        nonlocal diameter
        if not node:
            return 0

        left = height(node.left)
        right = height(node.right)

        # Update diameter (path through this node)
        diameter = max(diameter, left + right)

        return 1 + max(left, right)

    height(root)
    return diameter

# Pattern: Validate BST
def is_valid_bst(root):
    def validate(node, min_val, max_val):
        if not node:
            return True

        if node.val <= min_val or node.val >= max_val:
            return False

        return (validate(node.left, min_val, node.val) and
                validate(node.right, node.val, max_val))

    return validate(root, float('-inf'), float('inf'))

# Pattern: Lowest Common Ancestor
def lowest_common_ancestor(root, p, q):
    if not root or root == p or root == q:
        return root

    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)

    if left and right:
        return root  # Found both in different subtrees

    return left if left else right`,
      commonProblems: [
        'Binary Tree Paths',
        'Maximum Depth of Binary Tree',
        'Path Sum',
        'Diameter of Binary Tree',
        'Validate Binary Search Tree',
        'Lowest Common Ancestor'
      ]
    },
    {
      id: 'tree-bfs',
      name: 'Tree BFS',
      icon: '🌊',
      color: '#0ea5e9',
      category: 'Tree',
      description: 'Breadth-First Search for level-order tree problems',
      whenToUse: [
        'Level-order traversal',
        'Find level with max sum',
        'Right/left side view',
        'Level averages',
        'Zigzag traversal'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(w) where w is max width',
      codeExample: `from collections import deque

# Pattern: Level order traversal
def level_order(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        current_level = []

        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(current_level)

    return result

# Pattern: Right side view
def right_side_view(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)

        for i in range(level_size):
            node = queue.popleft()

            # Add rightmost node of each level
            if i == level_size - 1:
                result.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return result

# Pattern: Zigzag level order
def zigzag_level_order(root):
    if not root:
        return []

    result = []
    queue = deque([root])
    left_to_right = True

    while queue:
        level_size = len(queue)
        current_level = deque()

        for _ in range(level_size):
            node = queue.popleft()

            # Add to appropriate end based on direction
            if left_to_right:
                current_level.append(node.val)
            else:
                current_level.appendleft(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(list(current_level))
        left_to_right = not left_to_right

    return result

# Pattern: Average of levels
def average_of_levels(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        level_sum = 0

        for _ in range(level_size):
            node = queue.popleft()
            level_sum += node.val

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level_sum / level_size)

    return result

# Pattern: Minimum depth
def min_depth(root):
    if not root:
        return 0

    queue = deque([(root, 1)])

    while queue:
        node, depth = queue.popleft()

        # First leaf node found
        if not node.left and not node.right:
            return depth

        if node.left:
            queue.append((node.left, depth + 1))
        if node.right:
            queue.append((node.right, depth + 1))

    return 0

# Pattern: Connect level order siblings
def connect_siblings(root):
    if not root:
        return root

    queue = deque([root])

    while queue:
        level_size = len(queue)
        prev = None

        for _ in range(level_size):
            node = queue.popleft()

            if prev:
                prev.next = node
            prev = node

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return root`,
      commonProblems: [
        'Binary Tree Level Order Traversal',
        'Binary Tree Zigzag Level Order',
        'Average of Levels in Binary Tree',
        'Binary Tree Right Side View',
        'Minimum Depth of Binary Tree',
        'Populating Next Right Pointers'
      ]
    },
    {
      id: 'backtracking',
      name: 'Backtracking',
      icon: '🔙',
      color: '#f97316',
      category: 'Recursion',
      description: 'Explore all possibilities by trying and backtracking',
      whenToUse: [
        'Generate all combinations/permutations',
        'Subsets problems',
        'N-Queens, Sudoku',
        'Word search in grid',
        'Generate parentheses'
      ],
      timeComplexity: 'Exponential O(2^n) or O(n!)',
      spaceComplexity: 'O(n) for recursion stack',
      codeExample: `# Pattern: Subsets (power set)
def subsets(nums):
    result = []

    def backtrack(start, path):
        result.append(path[:])  # Add current subset

        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)  # Recurse
            path.pop()  # Backtrack

    backtrack(0, [])
    return result

# Pattern: Permutations
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        result = []

        def backtrack(current):
            # Base case: if current permutation is complete
            if len(current) == len(nums):
                result.append(current[:])  # Add a copy
                return

            # Try adding each number that's not already used
            for num in nums:
                if num not in current:
                    current.append(num)
                    backtrack(current)
                    current.pop()  # Backtrack

        backtrack([])
        return result

# Example:
# nums = [1,2,3]
# Output: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]

# Alternative with visited set (faster):
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        result = []
        visited = set()

        def backtrack(current):
            if len(current) == len(nums):
                result.append(current[:])
                return

            for num in nums:
                if num not in visited:
                    current.append(num)
                    visited.add(num)
                    backtrack(current)
                    current.pop()
                    visited.remove(num)

        backtrack([])
        return result

# Using swap (in-place):
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        result = []

        def backtrack(i):
            if i == len(nums):
                result.append(nums[:])
                return

            for j in range(i, len(nums)):
                # Swap
                nums[i], nums[j] = nums[j], nums[i]
                backtrack(i + 1)
                # Swap back
                nums[i], nums[j] = nums[j], nums[i]

        backtrack(0)
        return result

# Which one to use:
# First: Simple, easy to understand
# Second: Faster (O(1) set operations)
# Third: Most efficient in-place swapping

# Pattern: Combination sum
def combination_sum(candidates, target):
    result = []

    def backtrack(start, path, remaining):
        if remaining == 0:
            result.append(path[:])
            return
        if remaining < 0:
            return

        for i in range(start, len(candidates)):
            path.append(candidates[i])
            # Can reuse same element
            backtrack(i, path, remaining - candidates[i])
            path.pop()

    backtrack(0, [], target)
    return result

# Pattern: Generate parentheses
def generate_parentheses(n):
    result = []

    def backtrack(path, open_count, close_count):
        if len(path) == 2 * n:
            result.append(path)
            return

        # Can add open paren if haven't used all
        if open_count < n:
            backtrack(path + '(', open_count + 1, close_count)

        # Can add close paren if it matches an open
        if close_count < open_count:
            backtrack(path + ')', open_count, close_count + 1)

    backtrack('', 0, 0)
    return result

# Pattern: Word search in grid
def exist(board, word):
    rows, cols = len(board), len(board[0])

    def backtrack(r, c, index):
        if index == len(word):
            return True

        if (r < 0 or r >= rows or c < 0 or c >= cols or
            board[r][c] != word[index]):
            return False

        # Mark as visited
        temp = board[r][c]
        board[r][c] = '#'

        # Explore neighbors
        found = (backtrack(r+1, c, index+1) or
                backtrack(r-1, c, index+1) or
                backtrack(r, c+1, index+1) or
                backtrack(r, c-1, index+1))

        # Restore
        board[r][c] = temp

        return found

    for r in range(rows):
        for c in range(cols):
            if backtrack(r, c, 0):
                return True

    return False

# Pattern: N-Queens
def solve_n_queens(n):
    result = []
    board = [['.'] * n for _ in range(n)]

    def is_safe(row, col):
        # Check column
        for i in range(row):
            if board[i][col] == 'Q':
                return False

        # Check diagonal
        i, j = row - 1, col - 1
        while i >= 0 and j >= 0:
            if board[i][j] == 'Q':
                return False
            i -= 1
            j -= 1

        # Check anti-diagonal
        i, j = row - 1, col + 1
        while i >= 0 and j < n:
            if board[i][j] == 'Q':
                return False
            i -= 1
            j += 1

        return True

    def backtrack(row):
        if row == n:
            result.append([''.join(row) for row in board])
            return

        for col in range(n):
            if is_safe(row, col):
                board[row][col] = 'Q'
                backtrack(row + 1)
                board[row][col] = '.'

    backtrack(0)
    return result`,
      commonProblems: [
        'Subsets',
        'Permutations',
        'Combination Sum',
        'Generate Parentheses',
        'Word Search',
        'N-Queens'
      ]
    },
    {
      id: 'dynamic-programming',
      name: 'Dynamic Programming',
      icon: '📈',
      color: '#a855f7',
      category: 'DP',
      description: 'Break down problems using memoization or tabulation',
      whenToUse: [
        'Optimization problems (max/min)',
        'Counting problems',
        'Overlapping subproblems',
        'Optimal substructure',
        'Decision-making at each step'
      ],
      timeComplexity: 'Varies (often O(n²))',
      spaceComplexity: 'O(n) or O(n²)',
      codeExample: `# Pattern: 1D DP (Fibonacci)
def fib(n):
    if n <= 1:
        return n

    dp = [0] * (n + 1)
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]

    return dp[n]

# Space optimized
def fib_optimized(n):
    if n <= 1:
        return n

    prev2, prev1 = 0, 1

    for _ in range(2, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current

    return prev1

# Pattern: Climbing stairs
def climb_stairs(n):
    """Ways to climb n stairs (1 or 2 steps at a time)"""
    if n <= 2:
        return n

    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2

    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]

    return dp[n]

# Pattern: House Robber
def rob(nums):
    """Max money robbing non-adjacent houses"""
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]

    prev2 = 0  # dp[i-2]
    prev1 = nums[0]  # dp[i-1]

    for i in range(1, len(nums)):
        # Either rob current + prev2, or skip current
        current = max(nums[i] + prev2, prev1)
        prev2 = prev1
        prev1 = current

    return prev1

# Pattern: Coin Change (unbounded knapsack)
def coin_change(coins, amount):
    """Minimum coins needed to make amount"""
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1

# Pattern: Longest Increasing Subsequence
def length_of_lis(nums):
    """Length of longest increasing subsequence"""
    if not nums:
        return 0

    dp = [1] * len(nums)

    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)

# Pattern: 0/1 Knapsack
def knapsack(weights, values, capacity):
    """Maximum value with weight capacity"""
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            if weights[i-1] <= w:
                # Max of: include item or exclude item
                dp[i][w] = max(
                    values[i-1] + dp[i-1][w - weights[i-1]],
                    dp[i-1][w]
                )
            else:
                dp[i][w] = dp[i-1][w]

    return dp[n][capacity]

# Pattern: Longest Common Subsequence
def longest_common_subsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]

# Pattern: Edit Distance
def min_distance(word1, word2):
    """Minimum operations to convert word1 to word2"""
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Base cases
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],    # Delete
                    dp[i][j-1],    # Insert
                    dp[i-1][j-1]   # Replace
                )

    return dp[m][n]

# Pattern: Maximum Subarray (Kadane's)
def max_subarray(nums):
    """Maximum sum of contiguous subarray"""
    max_current = max_global = nums[0]

    for num in nums[1:]:
        max_current = max(num, max_current + num)
        max_global = max(max_global, max_current)

    return max_global`,
      commonProblems: [
        'Climbing Stairs',
        'House Robber',
        'Coin Change',
        'Longest Increasing Subsequence',
        '0/1 Knapsack',
        'Longest Common Subsequence',
        'Edit Distance'
      ]
    },
    {
      id: 'monotonic-stack',
      name: 'Monotonic Stack',
      icon: '📚',
      color: '#64748b',
      category: 'Stack',
      description: 'Stack maintaining monotonic order for next greater/smaller',
      whenToUse: [
        'Next greater/smaller element',
        'Largest rectangle in histogram',
        'Trapping rain water',
        'Stock span problems',
        'Daily temperatures'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      codeExample: `# Pattern: Next greater element
def next_greater_element(nums):
    """Find next greater element for each element"""
    result = [-1] * len(nums)
    stack = []  # Store indices

    for i in range(len(nums)):
        # While current is greater than stack top
        while stack and nums[i] > nums[stack[-1]]:
            idx = stack.pop()
            result[idx] = nums[i]

        stack.append(i)

    return result

# Pattern: Daily temperatures
def daily_temperatures(temperatures):
    """Days until warmer temperature"""
    result = [0] * len(temperatures)
    stack = []  # Monotonic decreasing stack

    for i, temp in enumerate(temperatures):
        while stack and temp > temperatures[stack[-1]]:
            prev_idx = stack.pop()
            result[prev_idx] = i - prev_idx

        stack.append(i)

    return result

# Pattern: Largest rectangle in histogram
def largest_rectangle_area(heights):
    """Largest rectangle area in histogram"""
    stack = []
    max_area = 0

    for i, h in enumerate(heights):
        start = i

        # Pop taller bars and calculate area
        while stack and stack[-1][1] > h:
            idx, height = stack.pop()
            area = height * (i - idx)
            max_area = max(max_area, area)
            start = idx

        stack.append((start, h))

    # Process remaining bars
    for i, h in stack:
        area = h * (len(heights) - i)
        max_area = max(max_area, area)

    return max_area

# Pattern: Trapping rain water (monotonic stack approach)
def trap(height):
    """Amount of water trapped after rain"""
    stack = []
    water = 0

    for i, h in enumerate(height):
        while stack and h > height[stack[-1]]:
            bottom = stack.pop()

            if not stack:
                break

            # Calculate trapped water
            left = stack[-1]
            width = i - left - 1
            bounded_height = min(h, height[left]) - height[bottom]
            water += width * bounded_height

        stack.append(i)

    return water

# Pattern: Remove k digits
def remove_k_digits(num, k):
    """Remove k digits to get smallest number"""
    stack = []

    for digit in num:
        # Remove larger digits
        while k > 0 and stack and stack[-1] > digit:
            stack.pop()
            k -= 1

        stack.append(digit)

    # Remove remaining k digits from end
    stack = stack[:-k] if k > 0 else stack

    # Remove leading zeros and return
    return ''.join(stack).lstrip('0') or '0'

# Pattern: Stock span
def calculate_span(prices):
    """Stock span for each day"""
    span = [1] * len(prices)
    stack = []  # Monotonic decreasing stack

    for i, price in enumerate(prices):
        # Pop prices smaller or equal
        while stack and prices[stack[-1]] <= price:
            stack.pop()

        # Span is distance to previous greater
        span[i] = i + 1 if not stack else i - stack[-1]
        stack.append(i)

    return span

# Pattern: Sum of subarray minimums
def sum_subarray_mins(arr):
    """Sum of minimum of all subarrays"""
    MOD = 10**9 + 7
    n = len(arr)

    # Find previous and next smaller elements
    left = [0] * n  # Distance to previous smaller
    right = [0] * n  # Distance to next smaller

    stack = []

    # Previous smaller
    for i in range(n):
        while stack and arr[stack[-1]] > arr[i]:
            stack.pop()
        left[i] = i + 1 if not stack else i - stack[-1]
        stack.append(i)

    stack = []

    # Next smaller
    for i in range(n - 1, -1, -1):
        while stack and arr[stack[-1]] >= arr[i]:
            stack.pop()
        right[i] = n - i if not stack else stack[-1] - i
        stack.append(i)

    # Calculate sum
    result = 0
    for i in range(n):
        result = (result + arr[i] * left[i] * right[i]) % MOD

    return result`,
      commonProblems: [
        'Next Greater Element',
        'Daily Temperatures',
        'Largest Rectangle in Histogram',
        'Trapping Rain Water',
        'Remove K Digits',
        'Sum of Subarray Minimums'
      ]
    },
    {
      id: 'graph-traversal',
      name: 'Graph Traversal',
      icon: '🕸️',
      color: '#84cc16',
      category: 'Graph',
      description: 'BFS/DFS for graph problems',
      whenToUse: [
        'Connected components',
        'Shortest path (BFS)',
        'Cycle detection',
        'Island problems',
        'Course schedule'
      ],
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      codeExample: `from collections import deque, defaultdict

# Pattern: DFS on graph
def dfs_graph(graph, start):
    """DFS traversal of graph"""
    visited = set()
    result = []

    def dfs(node):
        visited.add(node)
        result.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)

    dfs(start)
    return result

# Pattern: BFS on graph
def bfs_graph(graph, start):
    """BFS traversal of graph"""
    visited = {start}
    queue = deque([start])
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return result

# Pattern: Number of islands (DFS)
def num_islands(grid):
    """Count number of islands in grid"""
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if (r < 0 or r >= rows or c < 0 or c >= cols or
            grid[r][c] == '0'):
            return

        grid[r][c] = '0'  # Mark as visited

        # Explore neighbors
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                dfs(r, c)
                count += 1

    return count

# Pattern: Course schedule (cycle detection)
def can_finish(num_courses, prerequisites):
    """Can finish all courses (detect cycle)"""
    graph = defaultdict(list)
    for course, prereq in prerequisites:
        graph[prereq].append(course)

    # 0 = unvisited, 1 = visiting, 2 = visited
    state = [0] * num_courses

    def has_cycle(course):
        if state[course] == 1:  # Currently visiting
            return True
        if state[course] == 2:  # Already visited
            return False

        state[course] = 1  # Mark as visiting

        for neighbor in graph[course]:
            if has_cycle(neighbor):
                return True

        state[course] = 2  # Mark as visited
        return False

    for course in range(num_courses):
        if has_cycle(course):
            return False

    return True

# Pattern: Clone graph
def clone_graph(node):
    """Deep copy of graph"""
    if not node:
        return None

    clones = {}  # old_node -> new_node

    def dfs(node):
        if node in clones:
            return clones[node]

        clone = Node(node.val)
        clones[node] = clone

        for neighbor in node.neighbors:
            clone.neighbors.append(dfs(neighbor))

        return clone

    return dfs(node)

# Pattern: Shortest path in grid (BFS)
def shortest_path_binary_matrix(grid):
    """Shortest path from top-left to bottom-right"""
    n = len(grid)

    if grid[0][0] == 1 or grid[n-1][n-1] == 1:
        return -1

    directions = [(-1,-1),(-1,0),(-1,1),(0,-1),
                  (0,1),(1,-1),(1,0),(1,1)]

    queue = deque([(0, 0, 1)])  # (row, col, distance)
    grid[0][0] = 1  # Mark as visited

    while queue:
        r, c, dist = queue.popleft()

        if r == n - 1 and c == n - 1:
            return dist

        for dr, dc in directions:
            nr, nc = r + dr, c + dc

            if (0 <= nr < n and 0 <= nc < n and
                grid[nr][nc] == 0):
                grid[nr][nc] = 1  # Mark visited
                queue.append((nr, nc, dist + 1))

    return -1

# Pattern: Word ladder (BFS shortest transformation)
def ladder_length(begin_word, end_word, word_list):
    """Minimum transformations from begin to end word"""
    word_set = set(word_list)

    if end_word not in word_set:
        return 0

    queue = deque([(begin_word, 1)])

    while queue:
        word, steps = queue.popleft()

        if word == end_word:
            return steps

        # Try all possible transformations
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                next_word = word[:i] + c + word[i+1:]

                if next_word in word_set:
                    word_set.remove(next_word)
                    queue.append((next_word, steps + 1))

    return 0`,
      commonProblems: [
        'Number of Islands',
        'Clone Graph',
        'Course Schedule',
        'Pacific Atlantic Water Flow',
        'Shortest Path in Binary Matrix',
        'Word Ladder'
      ]
    },
    {
      id: 'union-find',
      name: 'Union Find',
      icon: '🔗',
      color: '#fb923c',
      category: 'Graph',
      description: 'Disjoint Set Union (DSU) for connectivity problems',
      whenToUse: [
        'Connected components',
        'Cycle detection in undirected graph',
        'Network connectivity',
        'Redundant connections',
        'Number of provinces'
      ],
      timeComplexity: 'O(α(n)) ≈ O(1) with path compression',
      spaceComplexity: 'O(n)',
      codeExample: `# Pattern: Union Find data structure
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n  # Number of components

    def find(self, x):
        """Find with path compression"""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        """Union by rank"""
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False  # Already connected

        # Attach smaller tree under larger tree
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1

        self.count -= 1
        return True

    def connected(self, x, y):
        """Check if two nodes are connected"""
        return self.find(x) == self.find(y)

# Pattern: Number of connected components
def count_components(n, edges):
    """Count connected components in undirected graph"""
    uf = UnionFind(n)

    for u, v in edges:
        uf.union(u, v)

    return uf.count

# Pattern: Redundant connection (detect cycle)
def find_redundant_connection(edges):
    """Find edge that creates cycle"""
    n = len(edges)
    uf = UnionFind(n + 1)

    for u, v in edges:
        if not uf.union(u, v):
            return [u, v]  # This edge creates cycle

    return []

# Pattern: Number of provinces
def find_circle_num(is_connected):
    """Number of provinces in adjacency matrix"""
    n = len(is_connected)
    uf = UnionFind(n)

    for i in range(n):
        for j in range(i + 1, n):
            if is_connected[i][j]:
                uf.union(i, j)

    return uf.count

# Pattern: Accounts merge
def accounts_merge(accounts):
    """Merge accounts belonging to same person"""
    from collections import defaultdict

    email_to_id = {}
    email_to_name = {}

    uf = UnionFind(len(accounts))

    # Build graph
    for i, account in enumerate(accounts):
        name = account[0]

        for email in account[1:]:
            email_to_name[email] = name

            if email in email_to_id:
                uf.union(i, email_to_id[email])
            else:
                email_to_id[email] = i

    # Group emails by component
    components = defaultdict(list)
    for email, idx in email_to_id.items():
        root = uf.find(idx)
        components[root].append(email)

    # Build result
    result = []
    for emails in components.values():
        name = email_to_name[emails[0]]
        result.append([name] + sorted(emails))

    return result

# Pattern: Earliest friends
def earliest_friends(logs, n):
    """Find earliest moment when everyone becomes friends"""
    logs.sort()  # Sort by timestamp
    uf = UnionFind(n)

    for timestamp, x, y in logs:
        uf.union(x, y)

        if uf.count == 1:  # All connected
            return timestamp

    return -1  # Not all connected

# Pattern: Number of operations to make connected
def make_connected(n, connections):
    """Min operations to make network connected"""
    if len(connections) < n - 1:
        return -1  # Not enough cables

    uf = UnionFind(n)

    for u, v in connections:
        uf.union(u, v)

    # Need (components - 1) operations
    return uf.count - 1

# Pattern: Graph Valid Tree
def valid_tree(n, edges):
    """Check if edges form a valid tree"""
    # Tree has exactly n-1 edges and no cycles
    if len(edges) != n - 1:
        return False

    uf = UnionFind(n)

    for u, v in edges:
        if not uf.union(u, v):
            return False  # Cycle detected

    return uf.count == 1  # All connected`,
      commonProblems: [
        'Number of Connected Components',
        'Redundant Connection',
        'Number of Provinces',
        'Accounts Merge',
        'Graph Valid Tree',
        'Satisfiability of Equality Equations'
      ]
    },
    {
      id: 'dp-linear',
      name: 'DP Pattern 1: Linear DP (1D)',
      icon: '📈',
      color: '#3b82f6',
      category: 'Dynamic Programming',
      description: 'Foundation of DP - breaking problems into subproblems',
      whenToUse: [
        'Single sequence problems',
        'Decisions at each step affect future',
        'Overlapping subproblems',
        'Can solve smaller version first'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n) or O(1) optimized',
      codeExample: `# Classic: Climbing Stairs
def climbStairs(n):
    if n <= 2:
        return n

    # dp[i] = ways to reach step i
    prev2, prev1 = 1, 2

    for i in range(3, n + 1):
        current = prev1 + prev2
        prev2, prev1 = prev1, current

    return prev1

# House Robber
def rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]

    # dp[i] = max money up to house i
    prev2, prev1 = nums[0], max(nums[0], nums[1])

    for i in range(2, len(nums)):
        current = max(prev1, prev2 + nums[i])
        prev2, prev1 = prev1, current

    return prev1

# Word Break
def wordBreak(s, wordDict):
    word_set = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True  # Empty string

    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break

    return dp[len(s)]`,
      commonProblems: [
        'Climbing Stairs',
        'House Robber',
        'Min Cost Climbing Stairs',
        'Word Break',
        'Decode Ways',
        'House Robber II'
      ]
    },
    {
      id: 'dp-lis',
      name: 'DP Pattern 2: Longest Increasing Subsequence',
      icon: '📊',
      color: '#10b981',
      category: 'Dynamic Programming',
      description: 'Finding longest increasing subsequence with O(n log n) optimization',
      whenToUse: [
        'Increasing/decreasing sequence problems',
        'Box stacking problems',
        'Version control applications',
        'Patience sorting'
      ],
      timeComplexity: 'O(n²) or O(n log n) with binary search',
      spaceComplexity: 'O(n)',
      codeExample: `# LIS - O(n²) solution
def lengthOfLIS(nums):
    if not nums:
        return 0

    n = len(nums)
    dp = [1] * n  # dp[i] = LIS ending at i

    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)

# LIS - O(n log n) with binary search
def lengthOfLIS_optimized(nums):
    from bisect import bisect_left

    tails = []  # tails[i] = smallest tail of LIS of length i+1

    for num in nums:
        pos = bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num

    return len(tails)

# Number of LIS
def findNumberOfLIS(nums):
    n = len(nums)
    lengths = [1] * n  # Length of LIS ending at i
    counts = [1] * n   # Number of LIS ending at i

    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                if lengths[j] + 1 > lengths[i]:
                    lengths[i] = lengths[j] + 1
                    counts[i] = counts[j]
                elif lengths[j] + 1 == lengths[i]:
                    counts[i] += counts[j]

    max_len = max(lengths)
    return sum(c for l, c in zip(lengths, counts) if l == max_len)`,
      commonProblems: [
        'Longest Increasing Subsequence',
        'Number of Longest Increasing Subsequence',
        'Russian Doll Envelopes',
        'Maximum Length of Pair Chain'
      ]
    },
    {
      id: 'dp-knapsack',
      name: 'DP Pattern 3: Knapsack',
      icon: '🎒',
      color: '#8b5cf6',
      category: 'Dynamic Programming',
      description: '0/1 and Unbounded Knapsack patterns',
      whenToUse: [
        'Subset selection with constraints',
        'Resource allocation',
        'Partitioning problems',
        'Combination/coin change'
      ],
      timeComplexity: 'O(n * target)',
      spaceComplexity: 'O(target)',
      codeExample: `# 0/1 Knapsack - Partition Equal Subset Sum
def canPartition(nums):
    total = sum(nums)
    if total % 2:
        return False

    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True

    for num in nums:
        # Traverse backwards for 0/1 knapsack
        for j in range(target, num - 1, -1):
            dp[j] = dp[j] or dp[j - num]

    return dp[target]

# Unbounded Knapsack - Coin Change
def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    # Traverse forwards for unbounded
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1

# Coin Change 2 - Number of combinations
def change(amount, coins):
    dp = [0] * (amount + 1)
    dp[0] = 1

    # Order matters: iterate coins first for combinations
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] += dp[i - coin]

    return dp[amount]

# Target Sum (0/1 variant)
def findTargetSumWays(nums, target):
    total = sum(nums)
    if abs(target) > total or (total + target) % 2:
        return 0

    # Transform to subset sum problem
    subset_sum = (total + target) // 2
    dp = [0] * (subset_sum + 1)
    dp[0] = 1

    for num in nums:
        for j in range(subset_sum, num - 1, -1):
            dp[j] += dp[j - num]

    return dp[subset_sum]`,
      commonProblems: [
        'Partition Equal Subset Sum',
        'Target Sum',
        'Coin Change',
        'Coin Change 2',
        'Combination Sum IV',
        'Perfect Squares',
        'Ones and Zeroes'
      ]
    },
    {
      id: 'dp-grid',
      name: 'DP Pattern 4: Grid DP',
      icon: '🔲',
      color: '#f59e0b',
      category: 'Dynamic Programming',
      description: '2D grid traversal with DP',
      whenToUse: [
        'Matrix path problems',
        'Robot movement',
        'Square/rectangle problems',
        '2D optimization'
      ],
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n) or O(n) optimized',
      codeExample: `# Unique Paths
def uniquePaths(m, n):
    dp = [[1] * n for _ in range(m)]

    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]

    return dp[m-1][n-1]

# Space optimized O(n)
def uniquePaths_optimized(m, n):
    dp = [1] * n

    for i in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j-1]

    return dp[n-1]

# Minimum Path Sum
def minPathSum(grid):
    m, n = len(grid), len(grid[0])

    for i in range(m):
        for j in range(n):
            if i == 0 and j == 0:
                continue
            elif i == 0:
                grid[i][j] += grid[i][j-1]
            elif j == 0:
                grid[i][j] += grid[i-1][j]
            else:
                grid[i][j] += min(grid[i-1][j], grid[i][j-1])

    return grid[m-1][n-1]

# Maximal Square
def maximalSquare(matrix):
    if not matrix:
        return 0

    m, n = len(matrix), len(matrix[0])
    dp = [[0] * n for _ in range(m)]
    max_side = 0

    for i in range(m):
        for j in range(n):
            if matrix[i][j] == '1':
                if i == 0 or j == 0:
                    dp[i][j] = 1
                else:
                    dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
                max_side = max(max_side, dp[i][j])

    return max_side * max_side`,
      commonProblems: [
        'Unique Paths',
        'Unique Paths II',
        'Minimum Path Sum',
        'Maximal Square',
        'Maximal Rectangle',
        'Triangle'
      ]
    },
    {
      id: 'dp-string',
      name: 'DP Pattern 5: String DP',
      icon: '📝',
      color: '#ef4444',
      category: 'Dynamic Programming',
      description: 'String matching and manipulation with DP',
      whenToUse: [
        'Two string comparison',
        'Edit distance problems',
        'Palindrome problems',
        'Pattern matching'
      ],
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n)',
      codeExample: `# Longest Common Subsequence
def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]

# Edit Distance
def minDistance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Base cases
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],    # Delete
                    dp[i][j-1],    # Insert
                    dp[i-1][j-1]   # Replace
                )

    return dp[m][n]

# Longest Palindromic Substring
def longestPalindrome(s):
    n = len(s)
    if n < 2:
        return s

    dp = [[False] * n for _ in range(n)]
    start, max_len = 0, 1

    # Every single character is palindrome
    for i in range(n):
        dp[i][i] = True

    # Check length 2
    for i in range(n - 1):
        if s[i] == s[i + 1]:
            dp[i][i + 1] = True
            start, max_len = i, 2

    # Check length 3+
    for length in range(3, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j] and dp[i + 1][j - 1]:
                dp[i][j] = True
                start, max_len = i, length

    return s[start:start + max_len]

# Wildcard Matching
def isMatch(s, p):
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True

    # Handle leading '*'
    for j in range(1, n + 1):
        if p[j-1] == '*':
            dp[0][j] = dp[0][j-1]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j-1] == '*':
                dp[i][j] = dp[i-1][j] or dp[i][j-1]
            elif p[j-1] == '?' or s[i-1] == p[j-1]:
                dp[i][j] = dp[i-1][j-1]

    return dp[m][n]`,
      commonProblems: [
        'Longest Common Subsequence',
        'Edit Distance',
        'Longest Palindromic Substring',
        'Palindromic Substrings',
        'Regular Expression Matching',
        'Wildcard Matching'
      ]
    },
    {
      id: 'dp-interval',
      name: 'DP Pattern 6: Interval DP',
      icon: '⏱️',
      color: '#ec4899',
      category: 'Dynamic Programming',
      description: 'Solving problems on ranges/intervals',
      whenToUse: [
        'Range optimization',
        'Matrix chain multiplication',
        'Palindrome partitioning',
        'Merge operations'
      ],
      timeComplexity: 'O(n³)',
      spaceComplexity: 'O(n²)',
      codeExample: `# Burst Balloons
def maxCoins(nums):
    nums = [1] + nums + [1]  # Add boundaries
    n = len(nums)
    dp = [[0] * n for _ in range(n)]

    # length is the gap between left and right
    for length in range(2, n):
        for left in range(n - length):
            right = left + length
            # Try bursting each balloon in (left, right)
            for i in range(left + 1, right):
                coins = nums[left] * nums[i] * nums[right]
                coins += dp[left][i] + dp[i][right]
                dp[left][right] = max(dp[left][right], coins)

    return dp[0][n-1]

# Minimum Cost Tree From Leaf Values
def mctFromLeafValues(arr):
    n = len(arr)
    dp = [[float('inf')] * n for _ in range(n)]
    max_val = [[0] * n for _ in range(n)]

    # Precompute max in each range
    for i in range(n):
        max_val[i][i] = arr[i]
        dp[i][i] = 0
        for j in range(i + 1, n):
            max_val[i][j] = max(max_val[i][j-1], arr[j])

    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            for k in range(i, j):
                dp[i][j] = min(
                    dp[i][j],
                    dp[i][k] + dp[k+1][j] + max_val[i][k] * max_val[k+1][j]
                )

    return dp[0][n-1]

# Palindrome Partitioning II
def minCut(s):
    n = len(s)
    # is_pal[i][j] = is s[i:j+1] palindrome
    is_pal = [[False] * n for _ in range(n)]

    for i in range(n):
        is_pal[i][i] = True

    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                is_pal[i][j] = (length == 2) or is_pal[i+1][j-1]

    # dp[i] = min cuts for s[0:i+1]
    dp = [i for i in range(n)]

    for i in range(n):
        if is_pal[0][i]:
            dp[i] = 0
        else:
            for j in range(i):
                if is_pal[j+1][i]:
                    dp[i] = min(dp[i], dp[j] + 1)

    return dp[n-1]`,
      commonProblems: [
        'Burst Balloons',
        'Minimum Score Triangulation of Polygon',
        'Minimum Cost Tree From Leaf Values',
        'Guess Number Higher or Lower II',
        'Palindrome Partitioning II'
      ]
    },
    {
      id: 'dp-state-machine',
      name: 'DP Pattern 7: State Machine DP',
      icon: '🔄',
      color: '#06b6d4',
      category: 'Dynamic Programming',
      description: 'Problems with state transitions',
      whenToUse: [
        'Stock trading problems',
        'State-based decisions',
        'Transaction limits',
        'Cooldown periods'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      codeExample: `# Best Time to Buy and Sell Stock
def maxProfit(prices):
    min_price = float('inf')
    max_profit = 0

    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)

    return max_profit

# Best Time to Buy and Sell Stock II (Unlimited)
def maxProfit_II(prices):
    profit = 0
    for i in range(1, len(prices)):
        if prices[i] > prices[i-1]:
            profit += prices[i] - prices[i-1]
    return profit

# Best Time to Buy and Sell Stock with Cooldown
def maxProfit_cooldown(prices):
    if not prices:
        return 0

    # States: hold, sold, rest
    hold = -prices[0]  # Holding stock
    sold = 0           # Just sold
    rest = 0           # Resting (can buy)

    for i in range(1, len(prices)):
        prev_hold, prev_sold, prev_rest = hold, sold, rest

        hold = max(prev_hold, prev_rest - prices[i])
        sold = prev_hold + prices[i]
        rest = max(prev_rest, prev_sold)

    return max(sold, rest)

# Best Time to Buy and Sell Stock IV (k transactions)
def maxProfit_k(k, prices):
    if not prices or k == 0:
        return 0

    n = len(prices)
    if k >= n // 2:  # Unlimited transactions
        return sum(max(0, prices[i+1] - prices[i]) for i in range(n-1))

    # buy[i][j] = max profit after at most i trans, on day j, holding
    # sell[i][j] = max profit after at most i trans, on day j, not holding
    buy = [[float('-inf')] * n for _ in range(k + 1)]
    sell = [[0] * n for _ in range(k + 1)]

    for i in range(1, k + 1):
        buy[i][0] = -prices[0]
        for j in range(1, n):
            buy[i][j] = max(buy[i][j-1], sell[i-1][j-1] - prices[j])
            sell[i][j] = max(sell[i][j-1], buy[i][j-1] + prices[j])

    return sell[k][n-1]`,
      commonProblems: [
        'Best Time to Buy and Sell Stock',
        'Best Time to Buy and Sell Stock II',
        'Best Time to Buy and Sell Stock III',
        'Best Time to Buy and Sell Stock IV',
        'Best Time to Buy and Sell Stock with Cooldown',
        'Best Time to Buy and Sell Stock with Transaction Fee'
      ]
    },
    {
      id: 'dp-tree',
      name: 'DP Pattern 8: Tree DP',
      icon: '🌳',
      color: '#22c55e',
      category: 'Dynamic Programming',
      description: 'DP on tree structures',
      whenToUse: [
        'Tree optimization',
        'Path problems in trees',
        'Subtree computations',
        'Parent-child decisions'
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h) where h is height',
      codeExample: `# House Robber III
def rob(root):
    def dfs(node):
        if not node:
            return (0, 0)

        left = dfs(node.left)
        right = dfs(node.right)

        # Rob this node: can't rob children
        rob_current = node.val + left[1] + right[1]

        # Don't rob: take max of children
        not_rob = max(left) + max(right)

        return (rob_current, not_rob)

    return max(dfs(root))

# Binary Tree Maximum Path Sum
def maxPathSum(root):
    max_sum = float('-inf')

    def dfs(node):
        nonlocal max_sum
        if not node:
            return 0

        # Only take positive contributions
        left = max(0, dfs(node.left))
        right = max(0, dfs(node.right))

        # Path through this node
        max_sum = max(max_sum, node.val + left + right)

        # Return max path going down
        return node.val + max(left, right)

    dfs(root)
    return max_sum

# Diameter of Binary Tree
def diameterOfBinaryTree(root):
    diameter = 0

    def dfs(node):
        nonlocal diameter
        if not node:
            return 0

        left_height = dfs(node.left)
        right_height = dfs(node.right)

        # Update diameter
        diameter = max(diameter, left_height + right_height)

        # Return height
        return 1 + max(left_height, right_height)

    dfs(root)
    return diameter

# Binary Tree Cameras
def minCameraCover(root):
    # States: 0 = needs cover, 1 = has camera, 2 = covered
    cameras = 0

    def dfs(node):
        nonlocal cameras
        if not node:
            return 2  # Null is covered

        left = dfs(node.left)
        right = dfs(node.right)

        # If either child needs cover, put camera here
        if left == 0 or right == 0:
            cameras += 1
            return 1

        # If either child has camera, this is covered
        if left == 1 or right == 1:
            return 2

        # Both children covered, this needs cover
        return 0

    # If root needs cover, add camera
    return cameras + (1 if dfs(root) == 0 else 0)`,
      commonProblems: [
        'House Robber III',
        'Binary Tree Maximum Path Sum',
        'Diameter of Binary Tree',
        'Binary Tree Cameras',
        'Maximum Sum BST in Binary Tree'
      ]
    },
    {
      id: 'dp-digit',
      name: 'DP Pattern 9: Digit DP',
      icon: '🔢',
      color: '#a855f7',
      category: 'Dynamic Programming',
      description: 'Counting numbers with specific digit properties',
      whenToUse: [
        'Count numbers in range',
        'Digit constraints',
        'Number properties',
        'Combinatorial counting'
      ],
      timeComplexity: 'O(log N * digits)',
      spaceComplexity: 'O(log N)',
      codeExample: `# Count Numbers with Unique Digits
def countNumbersWithUniqueDigits(n):
    if n == 0:
        return 1
    if n == 1:
        return 10

    # First digit: 9 choices (1-9)
    # Second digit: 9 choices (0-9 except first)
    # Third digit: 8 choices, etc.
    result = 10
    unique_digits = 9
    available_digits = 9

    for i in range(2, n + 1):
        unique_digits *= available_digits
        result += unique_digits
        available_digits -= 1

    return result

# Numbers At Most N Given Digit Set
def atMostNGivenDigitSet(digits, n):
    s = str(n)
    k = len(s)
    d = len(digits)

    # Count numbers with fewer digits
    result = sum(d ** i for i in range(1, k))

    # Count numbers with same number of digits
    for i, char in enumerate(s):
        # Count valid digits less than current digit
        count = sum(1 for digit in digits if digit < char)
        result += count * (d ** (k - i - 1))

        # If no exact match, break
        if char not in digits:
            break
    else:
        # All digits matched
        result += 1

    return result

# Count Special Integers (no repeated digits)
def countSpecialNumbers(n):
    def count_up_to_digits(d, tight, used, s):
        if d == len(s):
            return 1

        result = 0
        limit = int(s[d]) if tight else 9

        for digit in range(0, limit + 1):
            if used & (1 << digit):  # Digit already used
                continue

            # Skip leading zeros
            if used == 0 and digit == 0 and d > 0:
                result += count_up_to_digits(
                    d + 1, False, 0, s
                )
            else:
                result += count_up_to_digits(
                    d + 1,
                    tight and (digit == limit),
                    used | (1 << digit),
                    s
                )

        return result

    s = str(n)
    total = count_up_to_digits(0, True, 0, s)

    # Add numbers with fewer digits
    for length in range(1, len(s)):
        if length == 1:
            total += 9
        else:
            # First digit: 1-9, rest: 0-9 except used
            result = 9
            for i in range(1, length):
                result *= (10 - i)
            total += result

    return total - 1  # Exclude 0`,
      commonProblems: [
        'Number of Digit One',
        'Count Numbers with Unique Digits',
        'Numbers At Most N Given Digit Set',
        'Count Special Integers',
        'Numbers With Repeated Digits'
      ]
    },
    {
      id: 'dp-game-theory',
      name: 'DP Pattern 10: Game Theory (Minimax)',
      icon: '🎮',
      color: '#f97316',
      category: 'Dynamic Programming',
      description: 'Two-player games with optimal play',
      whenToUse: [
        'Two-player games',
        'Optimal strategies',
        'Min-max decisions',
        'Adversarial scenarios'
      ],
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n²)',
      codeExample: `# Stone Game
def stoneGame(piles):
    n = len(piles)
    # dp[i][j] = max stones first player gets more than second
    # in piles[i:j+1]
    dp = [[0] * n for _ in range(n)]

    # Base case: single pile
    for i in range(n):
        dp[i][i] = piles[i]

    # Fill diagonally
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            # Take left or right
            dp[i][j] = max(
                piles[i] - dp[i+1][j],  # Take left
                piles[j] - dp[i][j-1]   # Take right
            )

    return dp[0][n-1] > 0

# Predict the Winner
def predictTheWinner(nums):
    n = len(nums)
    dp = [[0] * n for _ in range(n)]

    for i in range(n):
        dp[i][i] = nums[i]

    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = max(
                nums[i] - dp[i+1][j],
                nums[j] - dp[i][j-1]
            )

    return dp[0][n-1] >= 0

# Stone Game II
def stoneGameII(piles):
    n = len(piles)
    # Suffix sum
    suffix = [0] * n
    suffix[-1] = piles[-1]
    for i in range(n-2, -1, -1):
        suffix[i] = suffix[i+1] + piles[i]

    # dp[i][m] = max stones starting at i with M=m
    from functools import lru_cache

    @lru_cache(None)
    def dp(i, m):
        if i >= n:
            return 0
        if i + 2 * m >= n:
            return suffix[i]

        max_stones = 0
        for x in range(1, 2 * m + 1):
            # Opponent gets dp(i+x, max(m, x))
            # We get total - opponent
            opponent = dp(i + x, max(m, x))
            max_stones = max(max_stones, suffix[i] - opponent)

        return max_stones

    return dp(0, 1)

# Can I Win
def canIWin(maxChoosableInteger, desiredTotal):
    if desiredTotal <= 0:
        return True
    if maxChoosableInteger * (maxChoosableInteger + 1) // 2 < desiredTotal:
        return False

    from functools import lru_cache

    @lru_cache(None)
    def can_win(used, total):
        if total <= 0:
            return False

        for i in range(1, maxChoosableInteger + 1):
            if used & (1 << i):
                continue

            # If opponent can't win after our move, we win
            if not can_win(used | (1 << i), total - i):
                return True

        return False

    return can_win(0, desiredTotal)`,
      commonProblems: [
        'Stone Game',
        'Stone Game II',
        'Stone Game III',
        'Predict the Winner',
        'Can I Win',
        'Stone Game IV'
      ]
    },
    {
      id: 'dp-bitmask',
      name: 'DP Pattern 11: Bitmask DP',
      icon: '🔣',
      color: '#6366f1',
      category: 'Dynamic Programming',
      description: 'Using bitmasks to track subsets',
      whenToUse: [
        'Small set problems (n ≤ 20)',
        'Subset tracking',
        'TSP variants',
        'Assignment problems'
      ],
      timeComplexity: 'O(n * 2^n)',
      spaceComplexity: 'O(2^n)',
      codeExample: `# Shortest Path Visiting All Nodes
def shortestPathLength(graph):
    n = len(graph)
    target = (1 << n) - 1

    # BFS with state (node, visited_mask)
    from collections import deque
    queue = deque([(i, 1 << i, 0) for i in range(n)])
    visited = {(i, 1 << i) for i in range(n)}

    while queue:
        node, mask, dist = queue.popleft()

        if mask == target:
            return dist

        for neighbor in graph[node]:
            new_mask = mask | (1 << neighbor)
            if (neighbor, new_mask) not in visited:
                visited.add((neighbor, new_mask))
                queue.append((neighbor, new_mask, dist + 1))

    return -1

# Partition to K Equal Sum Subsets
def canPartitionKSubsets(nums, k):
    total = sum(nums)
    if total % k:
        return False

    target = total // k
    nums.sort(reverse=True)

    if nums[0] > target:
        return False

    n = len(nums)
    dp = {}

    def dfs(mask, subset_sum):
        if mask == (1 << n) - 1:
            return True

        if mask in dp:
            return dp[mask]

        if subset_sum == target:
            # Start new subset
            result = dfs(mask, 0)
        else:
            result = False
            for i in range(n):
                if mask & (1 << i):
                    continue
                if subset_sum + nums[i] <= target:
                    if dfs(mask | (1 << i), subset_sum + nums[i]):
                        result = True
                        break

        dp[mask] = result
        return result

    return dfs(0, 0)

# TSP - Traveling Salesman Problem
def tsp(dist):
    n = len(dist)
    ALL = (1 << n) - 1

    # dp[mask][i] = min cost visiting cities in mask, ending at i
    dp = [[float('inf')] * n for _ in range(1 << n)]
    dp[1][0] = 0  # Start at city 0

    for mask in range(1 << n):
        for last in range(n):
            if not (mask & (1 << last)):
                continue
            if dp[mask][last] == float('inf'):
                continue

            for next_city in range(n):
                if mask & (1 << next_city):
                    continue

                new_mask = mask | (1 << next_city)
                dp[new_mask][next_city] = min(
                    dp[new_mask][next_city],
                    dp[mask][last] + dist[last][next_city]
                )

    # Return to start
    return min(dp[ALL][i] + dist[i][0] for i in range(1, n))

# Smallest Sufficient Team
def smallestSufficientTeam(req_skills, people):
    n = len(req_skills)
    skill_to_id = {skill: i for i, skill in enumerate(req_skills)}

    # Convert people skills to bitmask
    people_masks = []
    for person_skills in people:
        mask = 0
        for skill in person_skills:
            if skill in skill_to_id:
                mask |= (1 << skill_to_id[skill])
        people_masks.append(mask)

    target = (1 << n) - 1
    dp = {0: []}

    for i, mask in enumerate(people_masks):
        for prev_mask, team in list(dp.items()):
            new_mask = prev_mask | mask
            if new_mask not in dp or len(team) + 1 < len(dp[new_mask]):
                dp[new_mask] = team + [i]

    return dp[target]`,
      commonProblems: [
        'Shortest Path Visiting All Nodes',
        'Partition to K Equal Sum Subsets',
        'Find the Shortest Superstring',
        'Smallest Sufficient Team',
        'Number of Ways to Wear Different Hats to Each Other'
      ]
    },
    {
      id: 'dp-subsequence',
      name: 'DP Pattern 12: DP on Subsequences',
      icon: '📐',
      color: '#14b8a6',
      category: 'Dynamic Programming',
      description: 'Counting and finding subsequences',
      whenToUse: [
        'Subsequence counting',
        'Distinct subsequences',
        'Arithmetic sequences',
        'Pattern matching'
      ],
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n)',
      codeExample: `# Distinct Subsequences
def numDistinct(s, t):
    m, n = len(s), len(t)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Empty t can be formed by any prefix of s
    for i in range(m + 1):
        dp[i][0] = 1

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            # Don't use s[i-1]
            dp[i][j] = dp[i-1][j]

            # Use s[i-1] if it matches t[j-1]
            if s[i-1] == t[j-1]:
                dp[i][j] += dp[i-1][j-1]

    return dp[m][n]

# Distinct Subsequences II (all distinct)
def distinctSubseqII(s):
    MOD = 10**9 + 7
    n = len(s)

    # dp[i] = number of distinct subsequences ending at i
    dp = [0] * n
    last = {}

    for i in range(n):
        # New subsequences: all previous + this char alone
        dp[i] = (sum(dp) + 1) % MOD

        # Subtract duplicates from last occurrence
        if s[i] in last:
            dp[i] = (dp[i] - dp[last[s[i]]] - 1) % MOD

        last[s[i]] = i

    return sum(dp) % MOD

# Arithmetic Slices II - Subsequence
def numberOfArithmeticSlices(nums):
    n = len(nums)
    total = 0

    # dp[i] = {diff: count of subsequences ending at i with diff}
    dp = [defaultdict(int) for _ in range(n)]

    for i in range(n):
        for j in range(i):
            diff = nums[i] - nums[j]

            # Extend sequences ending at j
            dp[i][diff] += dp[j][diff] + 1

            # Count valid sequences (length >= 3)
            total += dp[j][diff]

    return total

from collections import defaultdict

# Longest Arithmetic Subsequence
def longestArithSeqLength(nums):
    n = len(nums)
    if n <= 2:
        return n

    # dp[i][diff] = length of LAS ending at i with diff
    dp = [defaultdict(lambda: 1) for _ in range(n)]
    max_length = 2

    for i in range(1, n):
        for j in range(i):
            diff = nums[i] - nums[j]
            dp[i][diff] = dp[j][diff] + 1
            max_length = max(max_length, dp[i][diff])

    return max_length

# Number of Unique Good Subsequences
def numberOfUniqueGoodSubsequences(binary):
    MOD = 10**9 + 7
    has_zero = '0' in binary

    # dp = number of unique subsequences ending with 0/1
    ends_with_0 = 0
    ends_with_1 = 0

    for char in binary:
        if char == '0':
            # New subseq: all prev + "0"
            ends_with_0 = (ends_with_0 + ends_with_1) % MOD
        else:
            # New subseq: all prev + "1"
            ends_with_1 = (ends_with_0 + ends_with_1 + 1) % MOD

    result = (ends_with_0 + ends_with_1) % MOD
    return (result + has_zero) % MOD`,
      commonProblems: [
        'Distinct Subsequences',
        'Distinct Subsequences II',
        'Arithmetic Slices II - Subsequence',
        'Number of Unique Good Subsequences',
        'Constrained Subsequence Sum'
      ]
    },
    {
      id: 'dp-probability',
      name: 'DP Pattern 13: Probability DP',
      icon: '🎲',
      color: '#84cc16',
      category: 'Dynamic Programming',
      description: 'Computing probabilities with DP',
      whenToUse: [
        'Expected value problems',
        'Probability calculations',
        'Random walk',
        'Game simulations'
      ],
      timeComplexity: 'O(n * k)',
      spaceComplexity: 'O(n * k)',
      codeExample: `# Knight Probability in Chessboard
def knightProbability(n, k, row, column):
    directions = [
        (2, 1), (2, -1), (-2, 1), (-2, -1),
        (1, 2), (1, -2), (-1, 2), (-1, -2)
    ]

    # dp[r][c] = probability of being at (r, c)
    dp = [[0] * n for _ in range(n)]
    dp[row][column] = 1

    for _ in range(k):
        new_dp = [[0] * n for _ in range(n)]

        for r in range(n):
            for c in range(n):
                if dp[r][c] > 0:
                    for dr, dc in directions:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < n and 0 <= nc < n:
                            new_dp[nr][nc] += dp[r][c] / 8

        dp = new_dp

    return sum(sum(row) for row in dp)

# New 21 Game
def new21Game(n, k, maxPts):
    if k == 0 or n >= k + maxPts:
        return 1.0

    # dp[i] = probability of getting exactly i points
    dp = [0.0] * (n + 1)
    dp[0] = 1.0

    window_sum = 1.0  # Sum of probabilities we can draw from
    result = 0.0

    for i in range(1, n + 1):
        dp[i] = window_sum / maxPts

        if i < k:
            window_sum += dp[i]
        else:
            result += dp[i]

        # Slide window
        if i - maxPts >= 0:
            window_sum -= dp[i - maxPts]

    return result

# Soup Servings
def soupServings(n):
    if n >= 5000:
        return 1.0

    # Round up to multiples of 25
    n = (n + 24) // 25

    from functools import lru_cache

    @lru_cache(None)
    def dp(a, b):
        # Base cases
        if a <= 0 and b <= 0:
            return 0.5
        if a <= 0:
            return 1.0
        if b <= 0:
            return 0.0

        # Four operations with equal probability
        return 0.25 * (
            dp(a - 4, b) +      # Serve 100ml A
            dp(a - 3, b - 1) +  # Serve 75ml A, 25ml B
            dp(a - 2, b - 2) +  # Serve 50ml A, 50ml B
            dp(a - 1, b - 3)    # Serve 25ml A, 75ml B
        )

    return dp(n, n)

# Toss Strange Coins
def probabilityOfHeads(prob, target):
    n = len(prob)
    # dp[i][j] = prob of j heads using first i coins
    dp = [[0.0] * (target + 1) for _ in range(n + 1)]
    dp[0][0] = 1.0

    for i in range(1, n + 1):
        for j in range(target + 1):
            # Tails
            dp[i][j] = dp[i-1][j] * (1 - prob[i-1])

            # Heads
            if j > 0:
                dp[i][j] += dp[i-1][j-1] * prob[i-1]

    return dp[n][target]`,
      commonProblems: [
        'Knight Probability in Chessboard',
        'New 21 Game',
        'Soup Servings',
        'Toss Strange Coins',
        'Probability of a Two Boxes Having The Same Number of Distinct Balls'
      ]
    }
  ]

  if (selectedPattern) {
    const pattern = patterns.find(p => p.id === selectedPattern)

    return (
      <div style={{
        position: 'fixed',
        inset: '0',
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: '50',
        overflowY: 'auto'
      }}>
        <div style={{
          background: 'linear-gradient(to bottom right, #111827, #1f2937)',
          borderRadius: '0.75rem',
          maxWidth: '72rem',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          border: '2px solid #3b82f6',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          <div style={{
            position: 'sticky',
            top: '0',
            background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
            padding: '1.5rem',
            borderTopLeftRadius: '0.75rem',
            borderTopRightRadius: '0.75rem',
            borderBottom: '2px solid #60a5fa',
            zIndex: '10'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <span style={{ fontSize: '3rem' }}>{pattern.icon}</span>
                <div>
                  <h2 style={{
                    fontSize: '1.875rem',
                    fontWeight: 'bold',
                    color: 'white',
                    margin: 0
                  }}>
                    {pattern.name}
                  </h2>
                  <div style={{
                    display: 'inline-block',
                    marginTop: '0.5rem',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {pattern.category}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedPattern(null)}
                style={{
                  background: '#dc2626',
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
                  e.currentTarget.style.background = '#b91c1c'
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#dc2626'
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              >
                Close
              </button>
            </div>
          </div>

          <div style={{ padding: '2rem' }}>

          {/* Description */}
          <div style={{
            background: '#1f2937',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            border: '1px solid #3b82f6'
          }}>
            <p style={{ fontSize: '1.2rem', color: '#d1d5db', margin: 0, fontWeight: '500', lineHeight: '1.625' }}>
              {pattern.description}
            </p>
          </div>

          {/* Complexity */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              padding: '1rem',
              background: '#1f2937',
              borderRadius: '0.5rem',
              border: '1px solid #3b82f6'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#9ca3af', fontWeight: '600', marginBottom: '0.25rem' }}>
                Time Complexity
              </div>
              <div style={{ fontSize: '1.1rem', color: '#93c5fd', fontWeight: '700' }}>
                {pattern.timeComplexity}
              </div>
            </div>
            <div style={{
              padding: '1rem',
              background: '#1f2937',
              borderRadius: '0.5rem',
              border: '1px solid #3b82f6'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#9ca3af', fontWeight: '600', marginBottom: '0.25rem' }}>
                Space Complexity
              </div>
              <div style={{ fontSize: '1.1rem', color: '#93c5fd', fontWeight: '700' }}>
                {pattern.spaceComplexity}
              </div>
            </div>
          </div>

          {/* When to Use */}
          <div style={{
            background: '#1f2937',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            border: '1px solid #3b82f6'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#93c5fd'
            }}>
              When to Use This Pattern
            </h3>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.625', color: '#d1d5db' }}>
              {pattern.whenToUse.map((use, idx) => (
                <li key={idx} style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                  {use}
                </li>
              ))}
            </ul>
          </div>

          {/* Code Examples */}
          <div style={{
            background: '#1f2937',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            border: '1px solid #3b82f6'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#93c5fd'
            }}>
              Implementation Examples
            </h3>
            <div style={{
              backgroundColor: '#1f2937',
              borderRadius: '0.5rem',
              overflow: 'auto',
              border: '1px solid #3b82f6'
            }}>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: '8px',
                  padding: '1rem',
                  fontSize: '0.9rem'
                }}
              >
                {pattern.codeExample}
              </SyntaxHighlighter>
            </div>
          </div>

          {/* Common Problems */}
          <div style={{
            background: '#1f2937',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            border: '1px solid #3b82f6'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#93c5fd'
            }}>
              Common LeetCode Problems
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {pattern.commonProblems.map((problem, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1rem 1.5rem',
                    background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                    border: '1px solid #3b82f6',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    color: '#d1d5db',
                    fontWeight: '500'
                  }}
                >
                  {problem}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={onBack}
              style={{
                background: '#2563eb',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1d4ed8'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2563eb'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              ← Back to Python Topics
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🎯 LeetCode Patterns
            </h1>
          </div>
        </div>

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'center',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          Master common problem-solving patterns to tackle any coding interview question with confidence.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
        {patterns.map(pattern => (
          <button
            key={pattern.id}
            onClick={() => setSelectedPattern(pattern.id)}
            style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              border: '2px solid #3b82f6',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textAlign: 'left',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#60a5fa'
              e.currentTarget.style.transform = 'translateY(-0.5rem)'
              e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(59, 130, 246, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#3b82f6'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              {pattern.icon}
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '0.75rem',
              color: '#93c5fd'
            }}>
              {pattern.name}
            </h3>
            <div style={{
              textAlign: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                backgroundColor: '#2563eb',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: '600',
                borderRadius: '0.375rem'
              }}>
                {pattern.category}
              </span>
            </div>

            <p style={{
              fontSize: '0.95rem',
              color: '#d1d5db',
              lineHeight: '1.6',
              margin: '1rem 0',
              textAlign: 'center'
            }}>
              {pattern.description}
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid #374151'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: '600' }}>Time</div>
                <div style={{ fontSize: '0.9rem', color: '#93c5fd', fontWeight: '600' }}>{pattern.timeComplexity}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: '600' }}>Space</div>
                <div style={{ fontSize: '0.9rem', color: '#93c5fd', fontWeight: '600' }}>{pattern.spaceComplexity}</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              color: '#60a5fa',
              fontWeight: '600',
              marginTop: '1rem'
            }}>
              <span>View Pattern</span>
              <span>→</span>
            </div>
          </button>
        ))}
        </div>
      </div>
    </div>
  )
}

export default LeetCodePatterns
