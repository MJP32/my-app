import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function BinarySearch({ onBack, onPrevious: _onPrevious, onNext: _onNext, previousName: _previousName, nextName: _nextName, currentSubcategory: _currentSubcategory, previousSubcategory: _previousSubcategory, nextSubcategory: _nextSubcategory, onPreviousSubcategory: _onPreviousSubcategory, onNextSubcategory: _onNextSubcategory, breadcrumb, breadcrumbStack, onBreadcrumbClick, pushBreadcrumb: _pushBreadcrumb, breadcrumbColors, problemLimit }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showSolution, setShowSolution] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userCode, setUserCode] = useState('')
  const [output, setOutput] = useState('')
  const [, setIsRunning] = useState(false)
  const [, setRefreshKey] = useState(0)
  const [language, setLanguage] = useState(getPreferredLanguage())
  const [showDrawing, setShowDrawing] = useState(false)
  const [currentDrawing, setCurrentDrawing] = useState(null)
  const [expandedSections, setExpandedSections] = useState({
    Easy: true,
    Medium: true,
    Hard: true
  })

  useEffect(() => {
    const handleProgressUpdate = () => setRefreshKey(prev => prev + 1)
    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  useEffect(() => {
    const handleLanguageChange = (e) => {
      setLanguage(e.detail)
      if (selectedQuestion) {
        setUserCode(selectedQuestion.code[e.detail].starterCode)
      }
    }
    window.addEventListener('languageChange', handleLanguageChange)
    return () => window.removeEventListener('languageChange', handleLanguageChange)
  }, [selectedQuestion])

  const questions = [
    {
      id: 1,
      title: 'Search in Rotated Sorted Array',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
      description: 'There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.',
      explanation: `**Problem:** Search in a rotated sorted array in O(log n) time.

**Key Insight:** Even after rotation, one half of the array is always sorted. Use this to determine which half to search.

**Approach: Modified Binary Search**
1. Find mid point
2. Check if target equals mid (found!)
3. Determine which half is sorted (compare nums[left] with nums[mid])
4. Check if target is in the sorted half's range
5. Adjust search boundaries accordingly

**Complexity:** Time O(log n), Space O(1)`,
      pseudocode: `ALGORITHM SearchRotated(nums, target):
    left = 0, right = length(nums) - 1
    WHILE left <= right:
        mid = left + (right - left) / 2
        IF nums[mid] == target:
            RETURN mid

        // Determine which half is sorted
        IF nums[left] <= nums[mid]:
            // Left half is sorted
            IF target >= nums[left] AND target < nums[mid]:
                right = mid - 1  // search left
            ELSE:
                left = mid + 1   // search right
        ELSE:
            // Right half is sorted
            IF target > nums[mid] AND target <= nums[right]:
                left = mid + 1   // search right
            ELSE:
                right = mid - 1  // search left
    RETURN -1`,
      code: {
        java: {
          starterCode: `public int search(int[] nums, int target) {
    // Write your code here

}`,
          solution: `// Approach: Modified Binary Search - O(log n) time, O(1) space
public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] == target) {
            return mid;
        }

        // Determine which half is sorted
        if (nums[left] <= nums[mid]) {
            // Left half is sorted
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right half is sorted
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}`
        },
        python: {
          starterCode: `def search(self, nums: List[int], target: int) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: Modified Binary Search - O(log n) time, O(1) space
def search(self, nums: List[int], target: int) -> int:
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = left + (right - left) // 2

        if nums[mid] == target:
            return mid

        # Determine which half is sorted
        if nums[left] <= nums[mid]:
            # Left half is sorted
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            # Right half is sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1`
        }
      },
      testCases: [
        { nums: [4,5,6,7,0,1,2], target: 0, expected: 4 },
        { nums: [4,5,6,7,0,1,2], target: 3, expected: -1 },
        { nums: [1], target: 0, expected: -1 }
      ],
      examples: [
        { input: 'nums = [4,5,6,7,0,1,2], target = 0', output: '4' },
        { input: 'nums = [4,5,6,7,0,1,2], target = 3', output: '-1' },
        { input: 'nums = [1], target = 0', output: '-1' }
      ]
    },
    {
      id: 2,
      title: 'Find Peak Element',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/find-peak-element/',
      description: 'A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks. You must write an algorithm that runs in O(log n) time.',
      explanation: `**Problem:** Find any peak element in O(log n) time.

**Key Insight:** If nums[mid] > nums[mid+1], there must be a peak on the left (including mid). Otherwise, there must be a peak on the right.

**Approach: Binary Search**
1. Compare mid with mid+1
2. If mid > mid+1, peak is on left side (could be mid itself)
3. If mid < mid+1, peak is on right side (array is ascending)
4. Continue until left == right

**Complexity:** Time O(log n), Space O(1)`,
      pseudocode: `ALGORITHM FindPeak(nums):
    left = 0, right = length(nums) - 1
    WHILE left < right:
        mid = left + (right - left) / 2
        IF nums[mid] > nums[mid + 1]:
            // Peak on left (including mid)
            right = mid
        ELSE:
            // Peak on right
            left = mid + 1
    RETURN left`,
      code: {
        java: {
          starterCode: `public int findPeakElement(int[] nums) {
    // Write your code here

}`,
          solution: `// Approach: Binary Search - O(log n) time, O(1) space
public int findPeakElement(int[] nums) {
    int left = 0, right = nums.length - 1;

    while (left < right) {
        int mid = left + (right - left) / 2;

        if (nums[mid] > nums[mid + 1]) {
            // Peak is on the left side (including mid)
            right = mid;
        } else {
            // Peak is on the right side
            left = mid + 1;
        }
    }

    return left;
}

// Alternative: Iterative approach
public int findPeakElement(int[] nums) {
    for (int i = 0; i < nums.length - 1; i++) {
        if (nums[i] > nums[i + 1]) {
            return i;
        }
    }
    return nums.length - 1;
}`
        },
        python: {
          starterCode: `def findPeakElement(self, nums: List[int]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: Binary Search - O(log n) time, O(1) space
def findPeakElement(self, nums: List[int]) -> int:
    left, right = 0, len(nums) - 1

    while left < right:
        mid = left + (right - left) // 2

        if nums[mid] > nums[mid + 1]:
            # Peak is on the left side (including mid)
            right = mid
        else:
            # Peak is on the right side
            left = mid + 1

    return left

# Alternative: Iterative approach
def findPeakElement(self, nums: List[int]) -> int:
    for i in range(len(nums) - 1):
        if nums[i] > nums[i + 1]:
            return i
    return len(nums) - 1`
        }
      },
      testCases: [
        { nums: [1,2,3,1], expected: 2 },
        { nums: [1,2,1,3,5,6,4], expected: 5 }
      ],
      examples: [
        { input: 'nums = [1,2,3,1]', output: '2', explanation: '3 is a peak element and your function should return the index number 2.' },
        { input: 'nums = [1,2,1,3,5,6,4]', output: '5', explanation: 'Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.' }
      ]
    },
    {
      id: 3,
      title: 'Search a 2D Matrix II',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/search-a-2d-matrix-ii/',
      description: 'Write an efficient algorithm that searches for a value target in an m x n integer matrix. This matrix has the following properties: Integers in each row are sorted in ascending from left to right, and integers in each column are sorted in ascending from top to bottom.',
      explanation: `**Problem:** Search in a 2D matrix where rows and columns are sorted.

**Key Insight:** Start from top-right corner. From there, we can eliminate either a row or column in each step.

**Approach: Search from Top-Right Corner**
1. Start at top-right (row=0, col=n-1)
2. If target equals current, found!
3. If target < current, move left (eliminate column)
4. If target > current, move down (eliminate row)
5. Continue until found or out of bounds

**Complexity:** Time O(m+n), Space O(1)`,
      pseudocode: `ALGORITHM SearchMatrix(matrix, target):
    row = 0
    col = length(matrix[0]) - 1  // start top-right

    WHILE row < rows AND col >= 0:
        IF matrix[row][col] == target:
            RETURN true
        ELSE IF matrix[row][col] > target:
            col--  // go left
        ELSE:
            row++  // go down
    RETURN false`,
      code: {
        java: {
          starterCode: `public boolean searchMatrix(int[][] matrix, int target) {
    // Write your code here

}`,
          solution: `// Approach: Search from top-right corner - O(m+n) time, O(1) space
public boolean searchMatrix(int[][] matrix, int target) {
    if (matrix == null || matrix.length == 0) {
        return false;
    }

    int row = 0;
    int col = matrix[0].length - 1;

    while (row < matrix.length && col >= 0) {
        if (matrix[row][col] == target) {
            return true;
        } else if (matrix[row][col] > target) {
            col--;
        } else {
            row++;
        }
    }

    return false;
}

// Alternative: Binary search on each row - O(m log n) time
public boolean searchMatrix(int[][] matrix, int target) {
    for (int[] row : matrix) {
        if (binarySearch(row, target)) {
            return true;
        }
    }
    return false;
}

private boolean binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return true;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return false;
}`
        },
        python: {
          starterCode: `def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
    # Write your code here
    pass`,
          solution: `# Approach: Search from top-right corner - O(m+n) time, O(1) space
def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
    if not matrix or not matrix[0]:
        return False

    row = 0
    col = len(matrix[0]) - 1

    while row < len(matrix) and col >= 0:
        if matrix[row][col] == target:
            return True
        elif matrix[row][col] > target:
            col -= 1
        else:
            row += 1

    return False

# Alternative: Binary search on each row - O(m log n) time
def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
    def binary_search(arr, target):
        left, right = 0, len(arr) - 1
        while left <= right:
            mid = left + (right - left) // 2
            if arr[mid] == target:
                return True
            elif arr[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return False

    for row in matrix:
        if binary_search(row, target):
            return True
    return False`
        }
      },
      testCases: [
        { matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 5, expected: true },
        { matrix: [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target: 20, expected: false }
      ],
      examples: [
        { input: 'matrix = [[1,4,7,11,15],[2,5,8,12,19]...], target = 5', output: 'true' },
        { input: 'matrix = [[1,4,7,11,15],[2,5,8,12,19]...], target = 20', output: 'false' }
      ]
    },
    {
      id: 4,
      title: 'Find First and Last Position',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/',
      description: 'Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If target is not found in the array, return [-1, -1]. You must write an algorithm with O(log n) runtime complexity.',
      explanation: `**Problem:** Find first and last occurrence of target in sorted array.

**Key Insight:** Run binary search twice - once to find first occurrence (search left when found), once for last (search right when found).

**Approach: Two Binary Searches**
1. First search: When target found, continue searching left to find first occurrence
2. Second search: When target found, continue searching right to find last occurrence
3. Both searches run in O(log n)

**Complexity:** Time O(log n), Space O(1)`,
      pseudocode: `ALGORITHM SearchRange(nums, target):
    result = [-1, -1]

    // Find first position
    left = 0, right = length(nums) - 1
    WHILE left <= right:
        mid = left + (right - left) / 2
        IF nums[mid] == target:
            result[0] = mid
            right = mid - 1  // continue left
        ELSE IF nums[mid] < target:
            left = mid + 1
        ELSE:
            right = mid - 1

    // Find last position
    left = 0, right = length(nums) - 1
    WHILE left <= right:
        mid = left + (right - left) / 2
        IF nums[mid] == target:
            result[1] = mid
            left = mid + 1   // continue right
        ELSE IF nums[mid] < target:
            left = mid + 1
        ELSE:
            right = mid - 1

    RETURN result`,
      code: {
        java: {
          starterCode: `public int[] searchRange(int[] nums, int target) {
    // Write your code here

}`,
          solution: `// Approach: Two Binary Searches - O(log n) time, O(1) space
public int[] searchRange(int[] nums, int target) {
    int[] result = new int[]{-1, -1};

    // Find first position
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            result[0] = mid;
            right = mid - 1; // Continue searching on left
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    // Find last position
    left = 0;
    right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            result[1] = mid;
            left = mid + 1; // Continue searching on right
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return result;
}

// Alternative: Helper method approach
public int[] searchRange(int[] nums, int target) {
    int first = findBound(nums, target, true);
    if (first == -1) return new int[]{-1, -1};
    int last = findBound(nums, target, false);
    return new int[]{first, last};
}

private int findBound(int[] nums, int target, boolean isFirst) {
    int left = 0, right = nums.length - 1;
    int result = -1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            result = mid;
            if (isFirst) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return result;
}`
        },
        python: {
          starterCode: `def searchRange(self, nums: List[int], target: int) -> List[int]:
    # Write your code here
    pass`,
          solution: `# Approach: Two Binary Searches - O(log n) time, O(1) space
def searchRange(self, nums: List[int], target: int) -> List[int]:
    result = [-1, -1]

    # Find first position
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            result[0] = mid
            right = mid - 1  # Continue searching on left
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    # Find last position
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        if nums[mid] == target:
            result[1] = mid
            left = mid + 1  # Continue searching on right
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return result

# Alternative: Helper method approach
def searchRange(self, nums: List[int], target: int) -> List[int]:
    def find_bound(is_first):
        left, right = 0, len(nums) - 1
        result = -1

        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                result = mid
                if is_first:
                    right = mid - 1
                else:
                    left = mid + 1
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1

        return result

    first = find_bound(True)
    if first == -1:
        return [-1, -1]
    last = find_bound(False)
    return [first, last]`
        }
      },
      testCases: [
        { nums: [5,7,7,8,8,10], target: 8, expected: [3,4] },
        { nums: [5,7,7,8,8,10], target: 6, expected: [-1,-1] },
        { nums: [], target: 0, expected: [-1,-1] }
      ],
      examples: [
        { input: 'nums = [5,7,7,8,8,10], target = 8', output: '[3,4]' },
        { input: 'nums = [5,7,7,8,8,10], target = 6', output: '[-1,-1]' },
        { input: 'nums = [], target = 0', output: '[-1,-1]' }
      ]
    },
    {
      id: 5,
      title: 'Minimum Absolute Difference Between Elements With Constraint',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/minimum-absolute-difference-between-elements-with-constraint/',
      description: 'You are given a 0-indexed integer array nums and an integer x. Find the minimum absolute difference between two elements in the array that are at least x indices apart. In other words, find two indices i and j such that abs(i - j) >= x and abs(nums[i] - nums[j]) is minimized. Return an integer denoting the minimum absolute difference between two elements that are at least x indices apart.',
      explanation: `**Problem:** Find minimum absolute difference between elements at least x positions apart.

**Key Insight:** Use a sorted data structure (TreeSet/SortedList) to maintain elements we've seen so far. For each position i, we can only compare with elements at indices <= i-x. Use binary search to find closest values.

**Approach: Sliding Window with Binary Search**
1. Iterate through array from index x onwards
2. Maintain a sorted set of elements from valid previous positions (at least x away)
3. For each element, use binary search to find:
   - Floor value (largest element <= current)
   - Ceiling value (smallest element >= current)
4. Track minimum absolute difference
5. Add current element to sorted set for future comparisons

**Complexity:** Time O(n log n), Space O(n)`,
      pseudocode: `ALGORITHM MinAbsoluteDifference(nums, x):
    IF length(nums) <= x:
        RETURN 0

    minDiff = INFINITY
    sortedSet = TreeSet()  // or SortedList

    // Add first x elements to set
    FOR i FROM 0 TO x-1:
        sortedSet.add(nums[i])

    // Process remaining elements
    FOR i FROM x TO length(nums)-1:
        current = nums[i]

        // Find floor (largest <= current)
        floor = sortedSet.floor(current)
        IF floor exists:
            minDiff = MIN(minDiff, current - floor)

        // Find ceiling (smallest >= current)
        ceiling = sortedSet.ceiling(current)
        IF ceiling exists:
            minDiff = MIN(minDiff, ceiling - current)

        // Add element at position i-x+1 for next iteration
        sortedSet.add(nums[i - x + 1])

    RETURN minDiff`,
      code: {
        java: {
          starterCode: `public int minAbsoluteDifference(int[] nums, int x) {
    // Write your code here

}`,
          solution: `// Approach: Sliding Window + TreeSet - O(n log n) time, O(n) space
import java.util.TreeSet;

public int minAbsoluteDifference(int[] nums, int x) {
    int n = nums.length;
    if (n <= x) return 0;

    int minDiff = Integer.MAX_VALUE;
    TreeSet<Integer> set = new TreeSet<>();

    // Add first x elements to the set
    for (int i = 0; i < x; i++) {
        set.add(nums[i]);
    }

    // Process elements starting from index x
    for (int i = x; i < n; i++) {
        int current = nums[i];

        // Find floor (largest element <= current)
        Integer floor = set.floor(current);
        if (floor != null) {
            minDiff = Math.min(minDiff, current - floor);
        }

        // Find ceiling (smallest element >= current)
        Integer ceiling = set.ceiling(current);
        if (ceiling != null) {
            minDiff = Math.min(minDiff, ceiling - current);
        }

        // Add element that becomes valid for next iteration
        set.add(nums[i - x + 1]);
    }

    return minDiff;
}

// Alternative: Using bisect approach with sorted list
public int minAbsoluteDifference(int[] nums, int x) {
    int n = nums.length;
    int minDiff = Integer.MAX_VALUE;
    TreeSet<Integer> sortedSet = new TreeSet<>();

    for (int i = 0; i < n; i++) {
        // Elements at least x positions away are valid
        if (i >= x) {
            sortedSet.add(nums[i - x]);
        }

        if (!sortedSet.isEmpty()) {
            // Find closest values using binary search
            Integer floor = sortedSet.floor(nums[i]);
            Integer ceiling = sortedSet.ceiling(nums[i]);

            if (floor != null) {
                minDiff = Math.min(minDiff, Math.abs(nums[i] - floor));
            }
            if (ceiling != null) {
                minDiff = Math.min(minDiff, Math.abs(nums[i] - ceiling));
            }
        }
    }

    return minDiff;
}`
        },
        python: {
          starterCode: `def minAbsoluteDifference(self, nums: List[int], x: int) -> int:
    # Write your code here
    pass`,
          solution: `# Approach 1: Using SortedList (from sortedcontainers)
from sortedcontainers import SortedList

def minAbsoluteDifference(self, nums: List[int], x: int) -> int:
    n = len(nums)
    if n <= x:
        return 0

    min_diff = float('inf')
    sorted_list = SortedList()

    # Add first x elements
    for i in range(x):
        sorted_list.add(nums[i])

    # Process remaining elements
    for i in range(x, n):
        current = nums[i]

        # Find position where current would be inserted
        pos = sorted_list.bisect_left(current)

        # Check floor (element before insertion point)
        if pos > 0:
            min_diff = min(min_diff, current - sorted_list[pos - 1])

        # Check ceiling (element at insertion point)
        if pos < len(sorted_list):
            min_diff = min(min_diff, sorted_list[pos] - current)

        # Add element for next iteration
        sorted_list.add(nums[i - x + 1])

    return min_diff


# Approach 2: Using bisect module (standard library)
import bisect

def minAbsoluteDifference(self, nums: List[int], x: int) -> int:
    n = len(nums)
    min_diff = float('inf')
    sorted_list = []

    for i in range(n):
        # Add elements that are at least x positions away
        if i >= x:
            bisect.insort(sorted_list, nums[i - x])

        if sorted_list:
            current = nums[i]

            # Find position using binary search
            pos = bisect.bisect_left(sorted_list, current)

            # Check floor (element before pos)
            if pos > 0:
                min_diff = min(min_diff, abs(current - sorted_list[pos - 1]))

            # Check ceiling (element at pos)
            if pos < len(sorted_list):
                min_diff = min(min_diff, abs(current - sorted_list[pos]))

    return min_diff`
        }
      },
      testCases: [
        { nums: [4,3,2,4], x: 2, expected: 0 },
        { nums: [5,3,2,10,15], x: 1, expected: 1 },
        { nums: [1,2,3,4], x: 3, expected: 3 }
      ],
      examples: [
        { input: 'nums = [4,3,2,4], x = 2', output: '0', explanation: 'Compare nums[0]=4 with nums[2]=2 and nums[3]=4. Min diff is |4-4|=0' },
        { input: 'nums = [5,3,2,10,15], x = 1', output: '1', explanation: 'Compare adjacent and further elements. Min diff is |3-2|=1' },
        { input: 'nums = [1,2,3,4], x = 3', output: '3', explanation: 'Only valid pair is (0,3): |1-4|=3' }
      ]
    }
  ]

  const displayQuestions = problemLimit ? questions.slice(0, problemLimit) : questions

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = displayQuestions.filter(q => isProblemCompleted(`Binary Search-${q.id}`)).length
    return { completed, total: displayQuestions.length, percentage: Math.round((completed / displayQuestions.length) * 100) }
  }

  const stats = getCompletionStats()

  // Group questions by difficulty
  const groupedQuestions = {
    Easy: displayQuestions.filter(q => q.difficulty === 'Easy'),
    Medium: displayQuestions.filter(q => q.difficulty === 'Medium'),
    Hard: displayQuestions.filter(q => q.difficulty === 'Hard')
  }

  // Get visible questions based on expanded sections
  const visibleQuestions = Object.entries(groupedQuestions)
    .filter(([difficulty]) => expandedSections[difficulty])
    .flatMap(([, qs]) => qs)

  // Keyboard navigation for problem list
  const { focusedIndex, setFocusedIndex, itemRefs } = useKeyboardNavigation({
    items: visibleQuestions,
    onSelect: (question) => selectQuestion(question),
    onEscape: onBack,
    enabled: !selectedQuestion && visibleQuestions.length > 0,
    gridColumns: 2,
    loop: true
  })

  // Helper to get visible index for a question
  const getVisibleIndex = (question) => {
    return visibleQuestions.findIndex(q => q.id === question.id)
  }

  const selectQuestion = (question) => {
    setSelectedQuestion(question)
    setShowSolution(false)
    setShowExplanation(false)
    setUserCode(question.code[language].starterCode)
    setOutput('')
    setShowDrawing(false)
    // Load existing drawing for this problem
    const savedDrawing = localStorage.getItem(`drawing-BinarySearch-${question.id}`)
    setCurrentDrawing(savedDrawing)
  }

  const toggleSection = (difficulty) => {
    setExpandedSections(prev => ({ ...prev, [difficulty]: !prev[difficulty] }))
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  if (selectedQuestion) {
    // Create extended breadcrumb stack with problem title
    const problemBreadcrumbStack = breadcrumbStack
      ? [...breadcrumbStack.slice(0, -1), { name: 'Binary Search', page: null }, { name: selectedQuestion.title, page: null }]
      : null

    // Fallback to legacy format
    const problemBreadcrumb = {
      ...breadcrumb,
      category: { name: 'Binary Search', onClick: () => setSelectedQuestion(null) },
      topic: selectedQuestion.title
    }

    // Handle breadcrumb click for problem view
    const handleProblemBreadcrumbClick = (index, item) => {
      if (problemBreadcrumbStack && index === problemBreadcrumbStack.length - 2) {
        setSelectedQuestion(null)
      } else if (onBreadcrumbClick) {
        onBreadcrumbClick(index, item)
      }
    }

    return (
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            ← Back to Binary Search
          </button>
          <LanguageToggle />
        </div>

        <Breadcrumb
          breadcrumb={problemBreadcrumb}
          breadcrumbStack={problemBreadcrumbStack}
          onBreadcrumbClick={handleProblemBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={breadcrumbColors}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Problem Description */}
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #3b82f6', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#93c5fd', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <CompletionCheckbox problemId={`Binary Search-${selectedQuestion.id}`} />
              <BookmarkButton
                problemId={`BinarySearch-${selectedQuestion.id}`}
                problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'BinarySearch' }}
              />
            </div>

            {selectedQuestion.leetcodeUrl && (
              <a href={selectedQuestion.leetcodeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
                View on LeetCode ↗
              </a>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#93c5fd', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#93c5fd', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #374151', color: '#9ca3af' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#93c5fd' }}>Input:</strong> <code style={{ color: '#9ca3af' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: '#93c5fd' }}>Output:</strong> <code style={{ color: '#9ca3af' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#93c5fd', marginBottom: '0.75rem' }}>Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#9ca3af', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#1e3a5a', borderRadius: '8px', border: '1px solid #3b82f6' }}>
                <h3 style={{ fontSize: '1rem', color: '#93c5fd', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#93c5fd' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#93c5fd' }}>Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #3b82f6', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' , flexWrap: 'wrap' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
              </button>
              <button onClick={() => setShowDrawing(true)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: currentDrawing ? '#8b5cf6' : '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🎨 {currentDrawing ? 'View' : 'Draw'} Sketch
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5', backgroundColor: '#111827', color: '#9ca3af' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#93c5fd', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #374151', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px', color: '#9ca3af' }}>{output}</pre>
              </div>
            )}
          </div>
        </div>
        {/* Drawing Canvas Modal */}
        <DrawingCanvas
          isOpen={showDrawing}
          onClose={() => {
            setShowDrawing(false)
            // Reload drawing in case it was updated
            const savedDrawing = localStorage.getItem(`drawing-BinarySearch-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`BinarySearch-${selectedQuestion.id}`}
          existingDrawing={currentDrawing}
        />
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'} onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}>
          ← Back
        </button>
      </div>

      <Breadcrumb
        breadcrumb={breadcrumb}
        breadcrumbStack={breadcrumbStack}
        onBreadcrumbClick={onBreadcrumbClick}
        onMainMenu={breadcrumb?.onMainMenu || onBack}
        colors={breadcrumbColors}
      />


      {/* Collapsible Sidebar for quick problem navigation */}
      <CollapsibleSidebar
        items={questions}
        selectedIndex={selectedQuestion ? questions.findIndex(q => q.id === selectedQuestion.id) : -1}
        onSelect={(index) => setSelectedQuestion(questions[index])}
        title="Problems"
        getItemLabel={(item) => item.title}
        getItemIcon={(item) => {
          const colors = { Easy: '🟢', Medium: '🟡', Hard: '🔴' };
          return colors[item.difficulty] || '⚪';
        }}
        primaryColor="#3b82f6"
      />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, #93c5fd, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>Binary Search</h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>Master binary search problems</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: '2px solid #3b82f6' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: '2px solid #10b981' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', border: '2px solid #374151', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
                <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>({difficultyQuestions.length} problems)</span>
              </div>
              <span style={{ fontSize: '1.25rem', color: '#9ca3af' }}>{expandedSections[difficulty] ? '▼' : '▶'}</span>
            </button>

            {expandedSections[difficulty] && (
              <div role="list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
                {difficultyQuestions.map((question) => {
                  const visibleIndex = getVisibleIndex(question)
                  const isFocused = focusedIndex === visibleIndex
                  return (
                    <div
                      key={question.id}
                      ref={el => itemRefs.current[visibleIndex] = el}
                      tabIndex={0}
                      role="listitem"
                      aria-label={`${question.title}, ${question.difficulty}`}
                      onClick={() => selectQuestion(question)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          selectQuestion(question)
                        }
                      }}
                      onFocus={() => setFocusedIndex(visibleIndex)}
                      style={{
                        background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: isFocused ? '2px solid #3b82f6' : '2px solid #374151',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        outline: 'none'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; if (!isFocused) e.currentTarget.style.border = '2px solid #374151' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#93c5fd', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                        <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ transform: 'scale(0.85)' }}>
                            <CompletionCheckbox problemId={`Binary Search-${question.id}`} />
                          </div>
                          <BookmarkButton
                            size="small"
                            problemId={`BinarySearch-${question.id}`}
                            problemData={{ title: question.title, difficulty: question.difficulty, category: 'BinarySearch' }}
                          />
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
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      ))}
    </div>
  )
}

export default BinarySearch
