import { useState } from 'react'

// Simple syntax highlighter for Python code
const SyntaxHighlighter = ({ code }) => {
  const highlightPython = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    // Protect comments
    highlighted = highlighted.replace(/(#.*$)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    // Protect strings
    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    // Highlight keywords and built-ins
    highlighted = highlighted
      .replace(/\b(def|class|if|elif|else|for|while|in|not|and|or|is|return|yield|import|from|as|try|except|finally|with|lambda|None|pass|break|continue|nonlocal|global)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(True|False|None)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(print|len|range|enumerate|zip|map|filter|sorted|sum|max|min|list|dict|set|tuple|sort|reverse|key|append|pop|extend|remove|insert|index|count|heapq|heappush|heappop|heapreplace|nlargest|nsmallest|deque|defaultdict|Counter|popleft|appendleft)\b/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>')

    // Restore protected content
    protectedContent.forEach(({ id, replacement }) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      margin: 0,
      fontFamily: '"Fira Code", "Consolas", "Monaco", "Courier New", monospace',
      fontSize: '0.9rem',
      lineHeight: '1.7',
      color: '#e2e8f0',
      whiteSpace: 'pre',
      overflowX: 'auto',
      padding: '1.5rem'
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightPython(code) }} />
    </pre>
  )
}

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
def permute(nums):
    result = []

    def backtrack(path, remaining):
        if not remaining:
            result.append(path[:])
            return

        for i in range(len(remaining)):
            backtrack(path + [remaining[i]],
                     remaining[:i] + remaining[i+1:])

    backtrack([], nums)
    return result

# Alternative: Using swap for permutations
def permute_swap(nums):
    result = []

    def backtrack(start):
        if start == len(nums):
            result.append(nums[:])
            return

        for i in range(start, len(nums)):
            nums[start], nums[i] = nums[i], nums[start]  # Swap
            backtrack(start + 1)
            nums[start], nums[i] = nums[i], nums[start]  # Backtrack

    backtrack(0)
    return result

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
    }
  ]

  if (selectedPattern) {
    const pattern = patterns.find(p => p.id === selectedPattern)

    return (
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
        <button
          onClick={() => setSelectedPattern(null)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '2rem'
          }}
        >
          ← Back to Patterns
        </button>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '3rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ fontSize: '4rem' }}>{pattern.icon}</div>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', margin: 0 }}>
                {pattern.name}
              </h1>
              <div style={{
                display: 'inline-block',
                marginTop: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: pattern.color,
                color: 'white',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '600'
              }}>
                {pattern.category}
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#f0f9ff',
            borderLeft: `4px solid ${pattern.color}`,
            borderRadius: '8px',
            marginBottom: '2rem'
          }}>
            <p style={{ fontSize: '1.2rem', color: '#1e40af', margin: 0, fontWeight: '500' }}>
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
              backgroundColor: '#fef3c7',
              borderRadius: '8px',
              border: '2px solid #fbbf24'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#92400e', fontWeight: '600', marginBottom: '0.25rem' }}>
                Time Complexity
              </div>
              <div style={{ fontSize: '1.1rem', color: '#78350f', fontWeight: '700' }}>
                {pattern.timeComplexity}
              </div>
            </div>
            <div style={{
              padding: '1rem',
              backgroundColor: '#dbeafe',
              borderRadius: '8px',
              border: '2px solid #3b82f6'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#1e3a8a', fontWeight: '600', marginBottom: '0.25rem' }}>
                Space Complexity
              </div>
              <div style={{ fontSize: '1.1rem', color: '#1e40af', fontWeight: '700' }}>
                {pattern.spaceComplexity}
              </div>
            </div>
          </div>

          {/* When to Use */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
              When to Use This Pattern
            </h2>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2' }}>
              {pattern.whenToUse.map((use, idx) => (
                <li key={idx} style={{ fontSize: '1.05rem', color: '#4b5563', marginBottom: '0.5rem' }}>
                  {use}
                </li>
              ))}
            </ul>
          </div>

          {/* Code Examples */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
              Implementation Examples
            </h2>
            <div style={{
              backgroundColor: '#1f2937',
              borderRadius: '12px',
              overflow: 'auto',
              border: `3px solid ${pattern.color}`
            }}>
              <SyntaxHighlighter code={pattern.codeExample} />
            </div>
          </div>

          {/* Common Problems */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
              Common LeetCode Problems
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {pattern.commonProblems.map((problem, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '1rem 1.5rem',
                    backgroundColor: '#f9fafb',
                    border: `2px solid ${pattern.color}`,
                    borderRadius: '8px',
                    fontSize: '1rem',
                    color: '#374151',
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
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          ← Back to Python
        </button>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', margin: 0 }}>
          🎯 LeetCode Patterns
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <p style={{
        fontSize: '1.2rem',
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: '3rem',
        lineHeight: '1.8'
      }}>
        Master common problem-solving patterns to tackle any coding interview question with confidence.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: '2rem'
      }}>
        {patterns.map(pattern => (
          <button
            key={pattern.id}
            onClick={() => setSelectedPattern(pattern.id)}
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '12px',
              border: `3px solid ${pattern.color}`,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'left',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = `0 0 0 4px ${pattern.color}40, 0 12px 24px rgba(0,0,0,0.2)`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '3rem' }}>{pattern.icon}</div>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                  {pattern.name}
                </h3>
                <div style={{
                  display: 'inline-block',
                  marginTop: '0.5rem',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: pattern.color,
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  borderRadius: '6px'
                }}>
                  {pattern.category}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.6', margin: '1rem 0' }}>
              {pattern.description}
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid #e5e7eb'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: '600' }}>Time</div>
                <div style={{ fontSize: '0.9rem', color: '#374151', fontWeight: '600' }}>{pattern.timeComplexity}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: '600' }}>Space</div>
                <div style={{ fontSize: '0.9rem', color: '#374151', fontWeight: '600' }}>{pattern.spaceComplexity}</div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.5rem',
              fontSize: '0.9rem',
              color: pattern.color,
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
  )
}

export default LeetCodePatterns
