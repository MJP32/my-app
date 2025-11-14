import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function Arrays({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showSolution, setShowSolution] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userCode, setUserCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
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
      title: 'Product of Array Except Self',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/',
      description: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. You must write an algorithm that runs in O(n) time and without using the division operation.',
      explanation: `**Problem Understanding:**
For each position i, we need the product of all elements except nums[i]. The constraint is we cannot use division and must achieve O(n) time complexity.

**Key Insight:**
The product at position i equals:
- Product of all elements to the left of i × Product of all elements to the right of i

**Approach: Left and Right Products**
1. First pass (left to right): Calculate cumulative product of all elements to the left
2. Second pass (right to left): Multiply by cumulative product of all elements to the right
3. This gives us the product of all elements except the current one

**Example:** nums = [1, 2, 3, 4]
- Left products:  [1, 1, 2, 6]   (product of elements before each position)
- Right products: [24, 12, 4, 1] (product of elements after each position)
- Final result:   [24, 12, 8, 6] (left × right)

**Complexity:**
- Time: O(n) - two passes through array
- Space: O(1) - only output array (not counted as extra space per problem statement)`,
      pseudocode: `ALGORITHM ProductExceptSelf(nums):
    n = length(nums)
    result = new array of size n

    // Step 1: Calculate left products
    result[0] = 1  // no elements to the left
    FOR i = 1 TO n-1:
        result[i] = result[i-1] * nums[i-1]

    // Step 2: Calculate right products and combine
    rightProduct = 1
    FOR i = n-1 DOWN TO 0:
        result[i] = result[i] * rightProduct
        rightProduct = rightProduct * nums[i]

    RETURN result

Example Walkthrough:
nums = [1, 2, 3, 4]

After Step 1 (left products):
result = [1, 1, 2, 6]

Step 2 (right products):
i=3: result[3] = 6 * 1 = 6, rightProduct = 1 * 4 = 4
i=2: result[2] = 2 * 4 = 8, rightProduct = 4 * 3 = 12
i=1: result[1] = 1 * 12 = 12, rightProduct = 12 * 2 = 24
i=0: result[0] = 1 * 24 = 24, rightProduct = 24 * 1 = 24

Final: [24, 12, 8, 6]`,
      code: {
        java: {
          starterCode: `public int[] productExceptSelf(int[] nums) {
    // Write your code here

}`,
          solution: `// Approach: Left and Right Products - O(n) time, O(1) space (excluding output)
public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];

    // Calculate left products
    result[0] = 1;
    for (int i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }

    // Calculate right products and combine
    int rightProduct = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] = result[i] * rightProduct;
        rightProduct *= nums[i];
    }

    return result;
}`
        },
        python: {
          starterCode: `def productExceptSelf(self, nums: List[int]) -> List[int]:
    # Write your code here
    pass`,
          solution: `# Approach: Left and Right Products - O(n) time, O(1) space (excluding output)
def productExceptSelf(self, nums: List[int]) -> List[int]:
    n = len(nums)
    result = [1] * n

    # Calculate left products
    for i in range(1, n):
        result[i] = result[i - 1] * nums[i - 1]

    # Calculate right products and combine
    right_product = 1
    for i in range(n - 1, -1, -1):
        result[i] = result[i] * right_product
        right_product *= nums[i]

    return result`
        }
      },
      examples: [
        { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]' },
        { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]' }
      ]
    },
    {
      id: 2,
      title: 'Container With Most Water',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/',
      description: 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.',
      explanation: `**Problem Understanding:**
We need to find two vertical lines that can hold the maximum amount of water. The area is calculated as: width × min(height1, height2).

**Key Insight:**
The area is limited by the shorter of the two lines. To maximize area, we use the two-pointer technique starting from the widest possible container and moving inward strategically.

**Approach: Two Pointers**
1. Start with pointers at both ends (maximum width)
2. Calculate current area
3. Move the pointer with the smaller height inward (keeping the taller line gives us the best chance for larger area)
4. Repeat until pointers meet

**Why move the shorter pointer?**
Moving the taller pointer can only decrease area (width decreases, height can't increase). Moving the shorter pointer might find a taller line, potentially increasing area.

**Complexity:**
- Time: O(n) - single pass with two pointers
- Space: O(1) - only variables needed`,
      pseudocode: `ALGORITHM MaxArea(height):
    left = 0
    right = length(height) - 1
    maxArea = 0

    WHILE left < right:
        width = right - left
        currentHeight = min(height[left], height[right])
        currentArea = width * currentHeight
        maxArea = max(maxArea, currentArea)

        // Move pointer with smaller height
        IF height[left] < height[right]:
            left++
        ELSE:
            right--

    RETURN maxArea

Example: height = [1,8,6,2,5,4,8,3,7]
Initial: left=0, right=8, area = 8 * min(1,7) = 8
Move left (height[0]=1 is smaller)
Next: left=1, right=8, area = 7 * min(8,7) = 49 (best!)
Continue moving pointers...`,
      code: {
        java: {
          starterCode: `public int maxArea(int[] height) {
    // Write your code here

}`,
          solution: `// Approach: Two Pointers - O(n) time, O(1) space
public int maxArea(int[] height) {
    int left = 0, right = height.length - 1;
    int maxArea = 0;

    while (left < right) {
        int width = right - left;
        int currentHeight = Math.min(height[left], height[right]);
        maxArea = Math.max(maxArea, width * currentHeight);

        // Move the pointer with smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }

    return maxArea;
}`
        },
        python: {
          starterCode: `def maxArea(self, height: List[int]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: Two Pointers - O(n) time, O(1) space
def maxArea(self, height: List[int]) -> int:
    left, right = 0, len(height) - 1
    max_area = 0

    while left < right:
        width = right - left
        current_height = min(height[left], height[right])
        max_area = max(max_area, width * current_height)

        # Move the pointer with smaller height
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_area`
        }
      },
      examples: [
        { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'The max area is between index 1 and 8: min(8,7) * (8-1) = 49' },
        { input: 'height = [1,1]', output: '1' }
      ]
    },
    {
      id: 3,
      title: '3Sum',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/3sum/',
      description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.',
      explanation: `**Problem Understanding:**
Find all unique triplets that sum to zero. The challenge is avoiding duplicate triplets while maintaining efficiency.

**Approach: Sort + Two Pointers**
1. Sort the array first (enables duplicate handling and two-pointer technique)
2. Fix one number at a time (outer loop)
3. Use two pointers to find pairs that sum to negative of fixed number
4. Skip duplicates at all levels

**Key Techniques:**
- Sorting enables: O(n) pair finding and easy duplicate skipping
- For each fixed number, problem reduces to Two Sum
- Skip duplicates: if nums[i] == nums[i-1], skip to avoid duplicate triplets

**Complexity:**
- Time: O(n²) - O(n) outer loop × O(n) two-pointer search
- Space: O(1) or O(n) depending on sort implementation`,
      pseudocode: `ALGORITHM ThreeSum(nums):
    result = []
    nums.sort()  // Sort array

    FOR i = 0 TO length(nums) - 3:
        // Skip duplicate first numbers
        IF i > 0 AND nums[i] == nums[i-1]:
            CONTINUE

        left = i + 1
        right = length(nums) - 1
        target = -nums[i]

        WHILE left < right:
            sum = nums[left] + nums[right]

            IF sum == target:
                result.add([nums[i], nums[left], nums[right]])

                // Skip duplicates
                WHILE left < right AND nums[left] == nums[left+1]:
                    left++
                WHILE left < right AND nums[right] == nums[right-1]:
                    right--

                left++
                right--
            ELSE IF sum < target:
                left++
            ELSE:
                right--

    RETURN result`,
      code: {
        java: {
          starterCode: `public List<List<Integer>> threeSum(int[] nums) {
    // Write your code here

}`,
          solution: `// Approach: Sort + Two Pointers - O(n²) time, O(n) space
public List<List<Integer>> threeSum(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    Arrays.sort(nums);

    for (int i = 0; i < nums.length - 2; i++) {
        // Skip duplicates for first number
        if (i > 0 && nums[i] == nums[i - 1]) continue;

        int left = i + 1, right = nums.length - 1;
        int target = -nums[i];

        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) {
                result.add(Arrays.asList(nums[i], nums[left], nums[right]));

                // Skip duplicates
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;

                left++;
                right--;
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}`
        },
        python: {
          starterCode: `def threeSum(self, nums: List[int]) -> List[List[int]]:
    # Write your code here
    pass`,
          solution: `# Approach: Sort + Two Pointers - O(n²) time, O(n) space
def threeSum(self, nums: List[int]) -> List[List[int]]:
    result = []
    nums.sort()

    for i in range(len(nums) - 2):
        # Skip duplicates for first number
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        left, right = i + 1, len(nums) - 1
        target = -nums[i]

        while left < right:
            total = nums[left] + nums[right]
            if total == target:
                result.append([nums[i], nums[left], nums[right]])

                # Skip duplicates
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1

                left += 1
                right -= 1
            elif total < target:
                left += 1
            else:
                right -= 1

    return result`
        }
      },
      examples: [
        { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
        { input: 'nums = [0,1,1]', output: '[]' },
        { input: 'nums = [0,0,0]', output: '[[0,0,0]]' }
      ]
    },
    {
      id: 4,
      title: 'Maximum Subarray',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/',
      description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
      explanation: `**Problem:** Find contiguous subarray with maximum sum.

**Approach: Kadane's Algorithm**
At each position, decide: extend current subarray or start new one?
- If currentSum + num > num, extend
- Otherwise, start fresh from current element

**Complexity:** Time O(n), Space O(1)`,
      pseudocode: `ALGORITHM MaxSubArray(nums):
    maxSum = nums[0]
    currentSum = nums[0]
    FOR i = 1 TO length(nums) - 1:
        currentSum = max(nums[i], currentSum + nums[i])
        maxSum = max(maxSum, currentSum)
    RETURN maxSum`,
      code: {
        java: {
          starterCode: `public int maxSubArray(int[] nums) {
    // Write your code here

}`,
          solution: `// Approach: Kadane's Algorithm - O(n) time, O(1) space
public int maxSubArray(int[] nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];

    for (int i = 1; i < nums.length; i++) {
        // Either extend current subarray or start new one
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
}

// Alternative with detailed tracking
public int maxSubArray(int[] nums) {
    int maxSum = Integer.MIN_VALUE;
    int currentSum = 0;

    for (int num : nums) {
        currentSum += num;
        maxSum = Math.max(maxSum, currentSum);

        // Reset if sum becomes negative
        if (currentSum < 0) {
            currentSum = 0;
        }
    }

    return maxSum;
}`
        },
        python: {
          starterCode: `def maxSubArray(self, nums: List[int]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: Kadane's Algorithm - O(n) time, O(1) space
def maxSubArray(self, nums: List[int]) -> int:
    max_sum = nums[0]
    current_sum = nums[0]

    for i in range(1, len(nums)):
        # Either extend current subarray or start new one
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)

    return max_sum

# Alternative with detailed tracking
def maxSubArray(self, nums: List[int]) -> int:
    max_sum = float('-inf')
    current_sum = 0

    for num in nums:
        current_sum += num
        max_sum = max(max_sum, current_sum)

        # Reset if sum becomes negative
        if current_sum < 0:
            current_sum = 0

    return max_sum`
        }
      },
      examples: [
        { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
        { input: 'nums = [1]', output: '1' },
        { input: 'nums = [5,4,-1,7,8]', output: '23' }
      ]
    },
    {
      id: 5,
      title: 'Merge Intervals',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/',
      description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
      explanation: `**Problem:** Merge overlapping intervals.

**Approach: Sort and Merge**
1. Sort intervals by start time
2. Iterate through sorted intervals
3. If current overlaps with previous (start <= previous.end), merge them
4. Otherwise, add as new interval

**Complexity:** Time O(n log n) for sorting, Space O(n)`,
      pseudocode: `ALGORITHM MergeIntervals(intervals):
    intervals.sort(by start time)
    merged = [intervals[0]]
    FOR each interval in intervals[1:]:
        IF interval.start <= merged.last.end:
            merged.last.end = max(merged.last.end, interval.end)
        ELSE:
            merged.add(interval)
    RETURN merged`,
      code: {
        java: {
          starterCode: `public int[][] merge(int[][] intervals) {
    // Write your code here

}`,
          solution: `// Approach: Sort and Merge - O(n log n) time, O(n) space
public int[][] merge(int[][] intervals) {
    if (intervals.length <= 1) return intervals;

    // Sort by start time
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

    List<int[]> merged = new ArrayList<>();
    int[] current = intervals[0];
    merged.add(current);

    for (int[] interval : intervals) {
        int currentEnd = current[1];
        int nextStart = interval[0];
        int nextEnd = interval[1];

        if (currentEnd >= nextStart) {
            // Overlapping intervals, merge
            current[1] = Math.max(currentEnd, nextEnd);
        } else {
            // Non-overlapping, add new interval
            current = interval;
            merged.add(current);
        }
    }

    return merged.toArray(new int[merged.size()][]);
}`
        },
        python: {
          starterCode: `def merge(self, intervals: List[List[int]]) -> List[List[int]]:
    # Write your code here
    pass`,
          solution: `# Approach: Sort and Merge - O(n log n) time, O(n) space
def merge(self, intervals: List[List[int]]) -> List[List[int]]:
    if len(intervals) <= 1:
        return intervals

    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    merged = []
    current = intervals[0]
    merged.append(current)

    for interval in intervals[1:]:
        current_end = current[1]
        next_start = interval[0]
        next_end = interval[1]

        if current_end >= next_start:
            # Overlapping intervals, merge
            current[1] = max(current_end, next_end)
        else:
            # Non-overlapping, add new interval
            current = interval
            merged.append(current)

    return merged`
        }
      },
      examples: [
        { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].' },
        { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]' }
      ]
    },
    {
      id: 6,
      title: 'Rotate Array',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/rotate-array/',
      description: 'Given an integer array nums, rotate the array to the right by k steps, where k is non-negative. Try to solve it in-place with O(1) extra space.',
      explanation: `**Problem:** Rotate array right by k steps in-place.

**Approach: Three Reversals**
1. Reverse entire array
2. Reverse first k elements
3. Reverse remaining elements
Result: Array rotated right by k positions!

**Example:** [1,2,3,4,5,6,7], k=3
Step 1: [7,6,5,4,3,2,1]
Step 2: [5,6,7,4,3,2,1]
Step 3: [5,6,7,1,2,3,4]

**Complexity:** Time O(n), Space O(1)`,
      pseudocode: `ALGORITHM RotateArray(nums, k):
    k = k % length(nums)
    reverse(nums, 0, length(nums) - 1)
    reverse(nums, 0, k - 1)
    reverse(nums, k, length(nums) - 1)

FUNCTION reverse(nums, start, end):
    WHILE start < end:
        swap(nums[start], nums[end])
        start++
        end--`,
      code: {
        java: {
          starterCode: `public void rotate(int[] nums, int k) {
    // Write your code here

}`,
          solution: `// Approach 1: Reverse Three Times - O(n) time, O(1) space
public void rotate(int[] nums, int k) {
    k = k % nums.length; // Handle k > nums.length

    // Reverse entire array
    reverse(nums, 0, nums.length - 1);
    // Reverse first k elements
    reverse(nums, 0, k - 1);
    // Reverse remaining elements
    reverse(nums, k, nums.length - 1);
}

private void reverse(int[] nums, int start, int end) {
    while (start < end) {
        int temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
}

// Approach 2: Using Extra Array - O(n) time, O(n) space
public void rotate(int[] nums, int k) {
    int n = nums.length;
    k = k % n;
    int[] result = new int[n];

    for (int i = 0; i < n; i++) {
        result[(i + k) % n] = nums[i];
    }

    System.arraycopy(result, 0, nums, 0, n);
}`
        },
        python: {
          starterCode: `def rotate(self, nums: List[int], k: int) -> None:
    """
    Do not return anything, modify nums in-place instead.
    """
    # Write your code here
    pass`,
          solution: `# Approach 1: Reverse Three Times - O(n) time, O(1) space
def rotate(self, nums: List[int], k: int) -> None:
    """
    Do not return anything, modify nums in-place instead.
    """
    k = k % len(nums)  # Handle k > len(nums)

    # Reverse entire array
    self._reverse(nums, 0, len(nums) - 1)
    # Reverse first k elements
    self._reverse(nums, 0, k - 1)
    # Reverse remaining elements
    self._reverse(nums, k, len(nums) - 1)

def _reverse(self, nums, start, end):
    while start < end:
        nums[start], nums[end] = nums[end], nums[start]
        start += 1
        end -= 1

# Approach 2: Using Extra Array - O(n) time, O(n) space
def rotate(self, nums: List[int], k: int) -> None:
    n = len(nums)
    k = k % n
    result = [0] * n

    for i in range(n):
        result[(i + k) % n] = nums[i]

    nums[:] = result`
        }
      },
      examples: [
        { input: 'nums = [1,2,3,4,5,6,7], k = 3', output: '[5,6,7,1,2,3,4]' },
        { input: 'nums = [-1,-100,3,99], k = 2', output: '[3,99,-1,-100]' }
      ]
    },
    {
      id: 7,
      title: 'Rotating the Box',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/rotating-the-box/',
      description: 'You are given an m x n matrix of characters box representing a side-view of a box. Each cell of the box is one of the following: A stone \'#\', A stationary obstacle \'*\', Empty \'.\'  The box is rotated 90 degrees clockwise, causing some of the stones to fall due to gravity. Return the box after rotating it 90 degrees clockwise.',
      explanation: `**Problem Understanding:**
We have a 2D box with stones (#), obstacles (*), and empty spaces (.). After rotating 90° clockwise, stones fall down due to gravity until they hit an obstacle or another stone.

**Key Steps:**
1. **Apply gravity** to each row: Move stones to the right (future bottom after rotation)
2. **Rotate 90° clockwise**: Transform rows into columns (first row becomes last column)

**Approach:**
1. For each row, simulate gravity by moving stones right until they hit obstacle/another stone
2. Rotate the matrix 90° clockwise: result[j][m-1-i] = box[i][j]
   - First row → Last column
   - Last row → First column
   - Top-left → Top-right

**Example:** box = [["#",".","*","."],["#","#","*","."]]
Step 1 (Apply gravity to rows):
  Row 0: ["#",".",".","*"] → [".","#","#","*"] (stones move right)
  Row 1: ["#","#",".","."] → [".",".","#","#"]

Step 2 (Rotate 90° clockwise):
  Result[0][1] = box[0][0], Result[1][1] = box[0][1], etc.
  Final: [["#","."],["#","#"],["*","*"],["#","."]]

**Complexity:**
- Time: O(m × n) - process each cell twice (gravity + rotation)
- Space: O(m × n) - result matrix`,
      pseudocode: `ALGORITHM RotateTheBox(box):
    m = number of rows
    n = number of columns

    // Step 1: Apply gravity to each row (move stones right)
    FOR each row i from 0 to m-1:
        empty = n - 1  // rightmost position
        FOR j from n-1 down to 0:
            IF box[i][j] == '*':  // obstacle
                empty = j - 1     // reset empty position
            ELSE IF box[i][j] == '#':  // stone
                box[i][j] = '.'
                box[i][empty] = '#'
                empty--

    // Step 2: Rotate 90 degrees clockwise
    result = new matrix of size n × m
    FOR i from 0 to m-1:
        FOR j from 0 to n-1:
            result[j][m - 1 - i] = box[i][j]

    RETURN result

Example Walkthrough:
box = [["#",".","#"]]

After gravity:
[["#",".",".","#","."]] → [[".",".","#","#","#"]]

After rotation (1×5 becomes 5×1):
[["."],
 ["."],
 ["#"],
 ["#"],
 ["#"]]`,
      code: {
        java: {
          starterCode: `public char[][] rotateTheBox(char[][] box) {
    // Write your code here

}`,
          solution: `// Approach: Apply Gravity + Rotate 90° - O(m*n) time, O(m*n) space
public char[][] rotateTheBox(char[][] box) {
    int m = box.length;
    int n = box[0].length;

    // Step 1: Apply gravity to each row (move stones to the right)
    for (int i = 0; i < m; i++) {
        int empty = n - 1;  // Start from rightmost position
        for (int j = n - 1; j >= 0; j--) {
            if (box[i][j] == '*') {
                // Obstacle: reset empty position
                empty = j - 1;
            } else if (box[i][j] == '#') {
                // Stone: move it to empty position
                box[i][j] = '.';
                box[i][empty] = '#';
                empty--;
            }
        }
    }

    // Step 2: Rotate 90 degrees clockwise
    // After rotation: result[j][m-1-i] = box[i][j]
    char[][] result = new char[n][m];
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            result[j][m - 1 - i] = box[i][j];
        }
    }

    return result;
}`
        },
        python: {
          starterCode: `def rotateTheBox(self, box: List[List[str]]) -> List[List[str]]:
    # Write your code here
    pass`,
          solution: `# Approach: Apply Gravity + Rotate 90° - O(m*n) time, O(m*n) space
def rotateTheBox(self, box: List[List[str]]) -> List[List[str]]:
    m, n = len(box), len(box[0])

    # Step 1: Apply gravity to each row (move stones to the right)
    for i in range(m):
        empty = n - 1  # Start from rightmost position
        for j in range(n - 1, -1, -1):
            if box[i][j] == '*':
                # Obstacle: reset empty position
                empty = j - 1
            elif box[i][j] == '#':
                # Stone: move it to empty position
                box[i][j] = '.'
                box[i][empty] = '#'
                empty -= 1

    # Step 2: Rotate 90 degrees clockwise
    # After rotation: result[j][m-1-i] = box[i][j]
    result = [['' for _ in range(m)] for _ in range(n)]
    for i in range(m):
        for j in range(n):
            result[j][m - 1 - i] = box[i][j]

    return result`
        }
      },
      examples: [
        {
          input: 'box = [["#",".","#"]]',
          output: '[["."],["#"],["#"]]',
          explanation: 'After applying gravity, stones move right. After rotating, the row becomes a column with stones at bottom.'
        },
        {
          input: 'box = [["#",".","*","."],["#","#","*","."]]',
          output: '[["#","."],["#","#"],["*","*"],["#","."]]'
        },
        {
          input: 'box = [["#","#","*",".","*","."],["#","#","#","*",".","."],["#","#","#",".","#","."]]',
          output: '[[".","#","#"],[".","#","#"],["#","#","*"],["#","*","."],["#",".","*"],["#",".","."]]'
        }
      ]
    },
    {
      id: 8,
      title: 'Merge Sorted Array',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/merge-sorted-array/',
      description: 'You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively. Merge nums1 and nums2 into a single array sorted in non-decreasing order.',
      explanation: `**Problem:** Merge two sorted arrays into one sorted array in-place.

**Key Insight: Work Backwards**
Instead of merging from the beginning (which requires shifting), merge from the end where there's space!

**Why Backwards?**
- nums1 has extra space at the end
- Largest elements go at the end
- No need to shift elements
- Compare from end of both arrays, place larger element at end

**Approach:**
1. Start from the end of both arrays (m-1 and n-1)
2. Place larger element at the end of nums1 (position m+n-1)
3. Move the pointer of the array that contributed the element
4. Continue until all elements from nums2 are placed

**Complexity:**
- Time: O(m + n) - single pass through both arrays
- Space: O(1) - in-place modification`,
      pseudocode: `ALGORITHM Merge(nums1, m, nums2, n):
    p1 = m - 1  // pointer for nums1
    p2 = n - 1  // pointer for nums2
    p = m + n - 1  // pointer for merged position

    WHILE p2 >= 0:
        IF p1 >= 0 AND nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1--
        ELSE:
            nums1[p] = nums2[p2]
            p2--
        p--

Example: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Step 1: Compare 3 vs 6 → 6 larger, place at index 5
  [1,2,3,0,0,6], p1=2, p2=1, p=4
Step 2: Compare 3 vs 5 → 5 larger, place at index 4
  [1,2,3,0,5,6], p1=2, p2=0, p=3
Step 3: Compare 3 vs 2 → 3 larger, place at index 3
  [1,2,3,3,5,6], p1=1, p2=0, p=2
Step 4: Compare 2 vs 2 → equal, place nums2[2] at index 2
  [1,2,2,3,5,6], p1=1, p2=-1
Result: [1,2,2,3,5,6]`,
      code: {
        java: {
          starterCode: `public void merge(int[] nums1, int m, int[] nums2, int n) {
    // Write your code here

}`,
          solution: `// Approach: Two Pointers (Backwards) - O(m+n) time, O(1) space
public void merge(int[] nums1, int m, int[] nums2, int n) {
    int p1 = m - 1;  // pointer for nums1
    int p2 = n - 1;  // pointer for nums2
    int p = m + n - 1;  // pointer for merged position

    // Merge from the end
    while (p2 >= 0) {
        if (p1 >= 0 && nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            p1--;
        } else {
            nums1[p] = nums2[p2];
            p2--;
        }
        p--;
    }
}`
        },
        python: {
          starterCode: `def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
    """
    Do not return anything, modify nums1 in-place instead.
    """
    # Write your code here
    pass`,
          solution: `# Approach: Two Pointers (Backwards) - O(m+n) time, O(1) space
def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
    """
    Do not return anything, modify nums1 in-place instead.
    """
    p1 = m - 1  # pointer for nums1
    p2 = n - 1  # pointer for nums2
    p = m + n - 1  # pointer for merged position

    # Merge from the end
    while p2 >= 0:
        if p1 >= 0 and nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1 -= 1
        else:
            nums1[p] = nums2[p2]
            p2 -= 1
        p -= 1`
        }
      },
      testCases: [
        { nums1: [1,2,3,0,0,0], m: 3, nums2: [2,5,6], n: 3, expected: [1,2,2,3,5,6] },
        { nums1: [1], m: 1, nums2: [], n: 0, expected: [1] },
        { nums1: [0], m: 0, nums2: [1], n: 1, expected: [1] }
      ],
      examples: [
        { input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3', output: '[1,2,2,3,5,6]' },
        { input: 'nums1 = [1], m = 1, nums2 = [], n = 0', output: '[1]' }
      ]
    },
    {
      id: 9,
      title: 'Remove Element',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/remove-element/',
      description: 'Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The order of the elements may be changed. Return the number of elements in nums which are not equal to val.',
      explanation: `**Problem:** Remove all occurrences of a value from array in-place.

**Key Insight: Two Pointers**
Use one pointer to iterate, another to track where to place non-val elements.

**Approach:**
1. Use pointer k to track position for next non-val element
2. Iterate through array with i
3. When nums[i] != val, copy it to nums[k] and increment k
4. Return k (number of non-val elements)

**Why This Works:**
- Elements not equal to val are collected at the start
- Order doesn't need to be preserved perfectly
- Only need to return the count

**Complexity:**
- Time: O(n) - single pass
- Space: O(1) - in-place`,
      pseudocode: `ALGORITHM RemoveElement(nums, val):
    k = 0  // pointer for non-val elements

    FOR i = 0 TO length(nums) - 1:
        IF nums[i] != val:
            nums[k] = nums[i]
            k++

    RETURN k

Example: nums = [3,2,2,3], val = 3
i=0: nums[0]=3 equals val, skip
i=1: nums[1]=2 != val, nums[0]=2, k=1
i=2: nums[2]=2 != val, nums[1]=2, k=2
i=3: nums[3]=3 equals val, skip
Result: k=2, nums=[2,2,_,_]`,
      code: {
        java: {
          starterCode: `public int removeElement(int[] nums, int val) {
    // Write your code here

}`,
          solution: `// Approach: Two Pointers - O(n) time, O(1) space
public int removeElement(int[] nums, int val) {
    int k = 0;  // pointer for non-val elements

    for (int i = 0; i < nums.length; i++) {
        if (nums[i] != val) {
            nums[k] = nums[i];
            k++;
        }
    }

    return k;
}`
        },
        python: {
          starterCode: `def removeElement(self, nums: List[int], val: int) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: Two Pointers - O(n) time, O(1) space
def removeElement(self, nums: List[int], val: int) -> int:
    k = 0  # pointer for non-val elements

    for i in range(len(nums)):
        if nums[i] != val:
            nums[k] = nums[i]
            k += 1

    return k`
        }
      },
      testCases: [
        { nums: [3,2,2,3], val: 3, expected: 2 },
        { nums: [0,1,2,2,3,0,4,2], val: 2, expected: 5 }
      ],
      examples: [
        { input: 'nums = [3,2,2,3], val = 3', output: '2', explanation: 'Return 2, first 2 elements are [2,2]' },
        { input: 'nums = [0,1,2,2,3,0,4,2], val = 2', output: '5', explanation: 'Return 5, first 5 elements are [0,1,3,0,4]' }
      ]
    },
    {
      id: 10,
      title: 'Remove Duplicates from Sorted Array',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/',
      description: 'Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. Return the number of unique elements.',
      explanation: `**Problem:** Remove duplicates from sorted array in-place, keeping only unique elements.

**Key Insight: Two Pointers**
Since array is sorted, duplicates are adjacent. Use slow pointer for unique position, fast pointer to scan.

**Approach:**
1. If array is empty or has one element, return its length
2. Use slow pointer (k) starting at 1 (first element is always unique)
3. Use fast pointer (i) to scan from index 1
4. When nums[i] != nums[i-1], it's a new unique element
5. Copy it to position k and increment k

**Complexity:**
- Time: O(n) - single pass
- Space: O(1) - in-place`,
      pseudocode: `ALGORITHM RemoveDuplicates(nums):
    IF length(nums) == 0:
        RETURN 0

    k = 1  // pointer for unique elements

    FOR i = 1 TO length(nums) - 1:
        IF nums[i] != nums[i-1]:
            nums[k] = nums[i]
            k++

    RETURN k

Example: nums = [1,1,2,2,3]
i=1: nums[1]=1 equals nums[0]=1, skip
i=2: nums[2]=2 != nums[1]=1, nums[1]=2, k=2
i=3: nums[3]=2 equals nums[2]=2, skip
i=4: nums[4]=3 != nums[3]=2, nums[2]=3, k=3
Result: k=3, nums=[1,2,3,_,_]`,
      code: {
        java: {
          starterCode: `public int removeDuplicates(int[] nums) {
    // Write your code here

}`,
          solution: `// Approach: Two Pointers - O(n) time, O(1) space
public int removeDuplicates(int[] nums) {
    if (nums.length == 0) return 0;

    int k = 1;  // pointer for unique elements

    for (int i = 1; i < nums.length; i++) {
        if (nums[i] != nums[i - 1]) {
            nums[k] = nums[i];
            k++;
        }
    }

    return k;
}`
        },
        python: {
          starterCode: `def removeDuplicates(self, nums: List[int]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: Two Pointers - O(n) time, O(1) space
def removeDuplicates(self, nums: List[int]) -> int:
    if not nums:
        return 0

    k = 1  # pointer for unique elements

    for i in range(1, len(nums)):
        if nums[i] != nums[i - 1]:
            nums[k] = nums[i]
            k += 1

    return k`
        }
      },
      testCases: [
        { nums: [1,1,2], expected: 2 },
        { nums: [0,0,1,1,1,2,2,3,3,4], expected: 5 }
      ],
      examples: [
        { input: 'nums = [1,1,2]', output: '2', explanation: 'Return 2, first 2 elements are [1,2]' },
        { input: 'nums = [0,0,1,1,1,2,2,3,3,4]', output: '5', explanation: 'Return 5, first 5 elements are [0,1,2,3,4]' }
      ]
    },
    {
      id: 11,
      title: 'Remove Duplicates from Sorted Array II',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/',
      description: 'Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. Return the number of elements after removing duplicates.',
      explanation: `**Problem:** Remove duplicates but allow each element to appear at most twice.

**Key Insight: Two Pointers with Count**
Similar to Remove Duplicates I, but track count of current element.

**Approach:**
1. Use pointer k for position of next element (start at 0)
2. For each element:
   - If it's new (k < 2 or different from element at k-2), add it
   - This allows at most 2 occurrences
3. Key: nums[k-2] tells us if adding current would make 3+ occurrences

**Why nums[k-2]?**
- If nums[i] == nums[k-2], then nums[k-1] is also same (sorted array)
- This would create 3 consecutive same elements
- So skip it

**Complexity:**
- Time: O(n) - single pass
- Space: O(1) - in-place`,
      pseudocode: `ALGORITHM RemoveDuplicates(nums):
    k = 0

    FOR each num in nums:
        IF k < 2 OR num != nums[k-2]:
            nums[k] = num
            k++

    RETURN k

Example: nums = [1,1,1,2,2,3]
i=0: k=0 < 2, nums[0]=1, k=1
i=1: k=1 < 2, nums[1]=1, k=2
i=2: k=2, nums[2]=1 equals nums[0]=1, skip (would be 3rd)
i=3: k=2, nums[3]=2 != nums[0]=1, nums[2]=2, k=3
i=4: k=3, nums[4]=2 != nums[1]=1, nums[3]=2, k=4
i=5: k=4, nums[5]=3 != nums[2]=2, nums[4]=3, k=5
Result: k=5, nums=[1,1,2,2,3,_]`,
      code: {
        java: {
          starterCode: `public int removeDuplicates(int[] nums) {
    // Write your code here

}`,
          solution: `// Approach: Two Pointers - O(n) time, O(1) space
public int removeDuplicates(int[] nums) {
    int k = 0;

    for (int num : nums) {
        if (k < 2 || num != nums[k - 2]) {
            nums[k] = num;
            k++;
        }
    }

    return k;
}`
        },
        python: {
          starterCode: `def removeDuplicates(self, nums: List[int]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: Two Pointers - O(n) time, O(1) space
def removeDuplicates(self, nums: List[int]) -> int:
    k = 0

    for num in nums:
        if k < 2 or num != nums[k - 2]:
            nums[k] = num
            k += 1

    return k`
        }
      },
      testCases: [
        { nums: [1,1,1,2,2,3], expected: 5 },
        { nums: [0,0,1,1,1,1,2,3,3], expected: 7 }
      ],
      examples: [
        { input: 'nums = [1,1,1,2,2,3]', output: '5', explanation: 'Return 5, first 5 elements are [1,1,2,2,3]' },
        { input: 'nums = [0,0,1,1,1,1,2,3,3]', output: '7', explanation: 'Return 7, first 7 elements are [0,0,1,1,2,3,3]' }
      ]
    },
    {
      id: 12,
      title: 'Majority Element',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/majority-element/',
      description: 'Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists.',
      explanation: `**Problem:** Find element that appears more than n/2 times.

**Key Insight: Boyer-Moore Voting Algorithm**
Majority element will always "survive" if we cancel out pairs of different elements.

**Why This Works:**
- Majority element appears > n/2 times
- Even if all other elements team up to cancel it, majority still remains
- Think of it as voting: majority candidate survives cancellations

**Approach:**
1. Use candidate variable and count
2. When count is 0, pick current element as candidate
3. If current equals candidate, increment count
4. If different, decrement count
5. Candidate at end is the majority element

**Complexity:**
- Time: O(n) - single pass
- Space: O(1) - only two variables`,
      pseudocode: `ALGORITHM MajorityElement(nums):
    candidate = null
    count = 0

    FOR each num in nums:
        IF count == 0:
            candidate = num
            count = 1
        ELSE IF num == candidate:
            count++
        ELSE:
            count--

    RETURN candidate

Example: nums = [2,2,1,1,1,2,2]
i=0: count=0, candidate=2, count=1
i=1: 2==2, count=2
i=2: 1!=2, count=1
i=3: 1!=2, count=0
i=4: count=0, candidate=1, count=1
i=5: 2!=1, count=0
i=6: count=0, candidate=2, count=1
Result: 2 (appears 4 times > 7/2)`,
      code: {
        java: {
          starterCode: `public int majorityElement(int[] nums) {
    // Write your code here

}`,
          solution: `// Approach: Boyer-Moore Voting - O(n) time, O(1) space
public int majorityElement(int[] nums) {
    int candidate = 0;
    int count = 0;

    for (int num : nums) {
        if (count == 0) {
            candidate = num;
            count = 1;
        } else if (num == candidate) {
            count++;
        } else {
            count--;
        }
    }

    return candidate;
}`
        },
        python: {
          starterCode: `def majorityElement(self, nums: List[int]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: Boyer-Moore Voting - O(n) time, O(1) space
def majorityElement(self, nums: List[int]) -> int:
    candidate = None
    count = 0

    for num in nums:
        if count == 0:
            candidate = num
            count = 1
        elif num == candidate:
            count += 1
        else:
            count -= 1

    return candidate`
        }
      },
      testCases: [
        { nums: [3,2,3], expected: 3 },
        { nums: [2,2,1,1,1,2,2], expected: 2 }
      ],
      examples: [
        { input: 'nums = [3,2,3]', output: '3' },
        { input: 'nums = [2,2,1,1,1,2,2]', output: '2' }
      ]
    },
    {
      id: 13,
      title: 'Best Time to Buy and Sell Stock',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
      description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve. If you cannot achieve any profit, return 0.',
      explanation: `**Problem:** Buy once, sell once, maximize profit.

**Key Insight: Track Minimum Price**
Max profit = sell price - buy price. To maximize, buy at lowest price seen so far.

**Approach:**
1. Track minimum price seen so far
2. For each day, calculate profit if we sell today
3. Update max profit if current profit is higher
4. Update minimum price if today's price is lower

**Complexity:**
- Time: O(n) - single pass
- Space: O(1) - only variables`,
      pseudocode: `ALGORITHM MaxProfit(prices):
    minPrice = infinity
    maxProfit = 0

    FOR each price in prices:
        minPrice = min(minPrice, price)
        profit = price - minPrice
        maxProfit = max(maxProfit, profit)

    RETURN maxProfit

Example: prices = [7,1,5,3,6,4]
Day 0: price=7, minPrice=7, profit=0, maxProfit=0
Day 1: price=1, minPrice=1, profit=0, maxProfit=0
Day 2: price=5, minPrice=1, profit=4, maxProfit=4
Day 3: price=3, minPrice=1, profit=2, maxProfit=4
Day 4: price=6, minPrice=1, profit=5, maxProfit=5
Result: 5 (buy at 1, sell at 6)`,
      code: {
        java: {
          starterCode: `public int maxProfit(int[] prices) {
    // Write your code here

}`,
          solution: `// Approach: One Pass - O(n) time, O(1) space
public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int maxProfit = 0;

    for (int price : prices) {
        minPrice = Math.min(minPrice, price);
        int profit = price - minPrice;
        maxProfit = Math.max(maxProfit, profit);
    }

    return maxProfit;
}`
        },
        python: {
          starterCode: `def maxProfit(self, prices: List[int]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: One Pass - O(n) time, O(1) space
def maxProfit(self, prices: List[int]) -> int:
    min_price = float('inf')
    max_profit = 0

    for price in prices:
        min_price = min(min_price, price)
        profit = price - min_price
        max_profit = max(max_profit, profit)

    return max_profit`
        }
      },
      testCases: [
        { prices: [7,1,5,3,6,4], expected: 5 },
        { prices: [7,6,4,3,1], expected: 0 }
      ],
      examples: [
        { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price=1), sell on day 5 (price=6), profit=5' },
        { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'No profit possible, prices only decrease' }
      ]
    },
    {
      id: 14,
      title: 'Best Time to Buy and Sell Stock II',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/',
      description: 'You are given an integer array prices where prices[i] is the price of a given stock on the ith day. On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day. Find and return the maximum profit you can achieve.',
      explanation: `**Problem:** Multiple buy-sell transactions allowed. Maximize total profit.

**Key Insight: Capture All Upward Slopes**
Profit is sum of all positive price differences between consecutive days.

**Why This Works:**
- If price increases from day i to i+1, we profit by buying at i and selling at i+1
- Multiple small transactions = one large transaction (no transaction fee)
- We only add positive differences

**Approach:**
1. Iterate through prices
2. If price[i] > price[i-1], add difference to profit
3. This captures all upward movements

**Complexity:**
- Time: O(n) - single pass
- Space: O(1)`,
      pseudocode: `ALGORITHM MaxProfit(prices):
    profit = 0

    FOR i = 1 TO length(prices) - 1:
        IF prices[i] > prices[i-1]:
            profit += prices[i] - prices[i-1]

    RETURN profit

Example: prices = [7,1,5,3,6,4]
Day 1→2: 1→5, profit += 4, total=4
Day 2→3: 5→3, no profit (skip)
Day 3→4: 3→6, profit += 3, total=7
Day 4→5: 6→4, no profit (skip)
Result: 7 (buy at 1 sell at 5, buy at 3 sell at 6)`,
      code: {
        java: {
          starterCode: `public int maxProfit(int[] prices) {
    // Write your code here

}`,
          solution: `// Approach: Greedy - O(n) time, O(1) space
public int maxProfit(int[] prices) {
    int profit = 0;

    for (int i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }

    return profit;
}`
        },
        python: {
          starterCode: `def maxProfit(self, prices: List[int]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: Greedy - O(n) time, O(1) space
def maxProfit(self, prices: List[int]) -> int:
    profit = 0

    for i in range(1, len(prices)):
        if prices[i] > prices[i - 1]:
            profit += prices[i] - prices[i - 1]

    return profit`
        }
      },
      testCases: [
        { prices: [7,1,5,3,6,4], expected: 7 },
        { prices: [1,2,3,4,5], expected: 4 },
        { prices: [7,6,4,3,1], expected: 0 }
      ],
      examples: [
        { input: 'prices = [7,1,5,3,6,4]', output: '7', explanation: 'Buy at 1 sell at 5 (+4), buy at 3 sell at 6 (+3), total=7' },
        { input: 'prices = [1,2,3,4,5]', output: '4', explanation: 'Buy at 1 sell at 5, profit=4' }
      ]
    },
    {
      id: 15,
      title: 'Jump Game II',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/jump-game-ii/',
      description: 'You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0]. Each element nums[i] represents the maximum length of a forward jump from index i. Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].',
      explanation: `**Problem:** Find minimum number of jumps to reach end.

**Key Insight: BFS-like Greedy**
Think of it as levels. Each jump takes us to next level. Find farthest we can reach in current level.

**Approach:**
1. Track current level's end and farthest reach in next level
2. When we reach current level's end, increment jumps
3. Move to next level (current end = farthest)

**Complexity:**
- Time: O(n) - single pass
- Space: O(1)`,
      pseudocode: `ALGORITHM Jump(nums):
    jumps = 0
    currentEnd = 0
    farthest = 0

    FOR i = 0 TO length(nums) - 2:
        farthest = max(farthest, i + nums[i])

        IF i == currentEnd:
            jumps++
            currentEnd = farthest

    RETURN jumps

Example: nums = [2,3,1,1,4]
i=0: farthest=2, i==0 so jumps=1, currentEnd=2
i=1: farthest=max(2,4)=4
i=2: farthest=4, i==2 so jumps=2, currentEnd=4
Result: 2 jumps`,
      code: {
        java: {
          starterCode: `public int jump(int[] nums) {
    // Write your code here

}`,
          solution: `// Approach: Greedy BFS - O(n) time, O(1) space
public int jump(int[] nums) {
    int jumps = 0;
    int currentEnd = 0;
    int farthest = 0;

    for (int i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);

        if (i == currentEnd) {
            jumps++;
            currentEnd = farthest;
        }
    }

    return jumps;
}`
        },
        python: {
          starterCode: `def jump(self, nums: List[int]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: Greedy BFS - O(n) time, O(1) space
def jump(self, nums: List[int]) -> int:
    jumps = 0
    current_end = 0
    farthest = 0

    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])

        if i == current_end:
            jumps += 1
            current_end = farthest

    return jumps`
        }
      },
      testCases: [
        { nums: [2,3,1,1,4], expected: 2 },
        { nums: [2,3,0,1,4], expected: 2 }
      ],
      examples: [
        { input: 'nums = [2,3,1,1,4]', output: '2', explanation: 'Jump to index 1, then to last index' },
        { input: 'nums = [2,3,0,1,4]', output: '2' }
      ]
    },
    {
      id: 16,
      title: 'H-Index',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/h-index/',
      description: 'Given an array of integers citations where citations[i] is the number of citations a researcher received for their ith paper, return the researcher\'s h-index. The h-index is defined as the maximum value of h such that the given researcher has published at least h papers that have each been cited at least h times.',
      explanation: `**Problem:** Find h-index - maximum h where researcher has h papers with at least h citations.

**Key Insight: Sort and Compare**
After sorting citations in descending order, h-index is the point where the number of papers (index + 1) equals or exceeds the citation count.

**Why This Works:**
- Sort citations in descending order: [10, 8, 5, 4, 3]
- For each position i, we have (i+1) papers with at least citations[i] citations
- h-index is largest i+1 where citations[i] >= i+1

**Algorithm:**
1. Sort citations in descending order
2. Iterate through sorted array
3. At each position i, check if citations[i] >= i+1
4. h-index is the last position where this holds

**Example: citations = [3,0,6,1,5]**
Sorted: [6,5,3,1,0]
i=0: 6 >= 1 ✓ (1 paper with 1+ citations)
i=1: 5 >= 2 ✓ (2 papers with 2+ citations)
i=2: 3 >= 3 ✓ (3 papers with 3+ citations)
i=3: 1 >= 4 ✗ (not 4 papers with 4+ citations)
h-index = 3

**Complexity:**
- Time: O(n log n) - sorting dominates
- Space: O(1) - in-place sort`,
      pseudocode: `Approach: Sort and Compare
-----------------------
hIndex(citations):
    sort citations in descending order
    h = 0

    for i from 0 to n-1:
        if citations[i] >= i + 1:
            h = i + 1
        else:
            break

    return h

Example: [3,0,6,1,5]
-----------------------
Sorted: [6,5,3,1,0]
i=0: citations[0]=6 >= 1 → h=1
i=1: citations[1]=5 >= 2 → h=2
i=2: citations[2]=3 >= 3 → h=3
i=3: citations[3]=1 < 4 → break
Result: h-index = 3

Alternative Approach: Counting Sort O(n)
-----------------------
hIndex(citations):
    n = length(citations)
    count = array of size n+1

    // Count papers with k citations
    for each citation in citations:
        if citation >= n:
            count[n]++
        else:
            count[citation]++

    // Find h-index from right
    total = 0
    for i from n down to 0:
        total += count[i]
        if total >= i:
            return i

    return 0`,
      code: {
        java: {
          starterCode: `public int hIndex(int[] citations) {
    // Write your code here

}`,
          solution: `// Approach 1: Sort - O(n log n) time, O(1) space
public int hIndex(int[] citations) {
    Arrays.sort(citations);
    int n = citations.length;

    for (int i = 0; i < n; i++) {
        int h = n - i;  // Number of papers with at least this many citations
        if (citations[i] >= h) {
            return h;
        }
    }

    return 0;
}

// Approach 2: Counting Sort - O(n) time, O(n) space
public int hIndex(int[] citations) {
    int n = citations.length;
    int[] count = new int[n + 1];

    // Count papers
    for (int c : citations) {
        if (c >= n) {
            count[n]++;
        } else {
            count[c]++;
        }
    }

    // Find h-index
    int total = 0;
    for (int i = n; i >= 0; i--) {
        total += count[i];
        if (total >= i) {
            return i;
        }
    }

    return 0;
}`
        },
        python: {
          starterCode: `def hIndex(self, citations: List[int]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach 1: Sort - O(n log n) time, O(1) space
def hIndex(self, citations: List[int]) -> int:
    citations.sort(reverse=True)
    h = 0

    for i, c in enumerate(citations):
        if c >= i + 1:
            h = i + 1
        else:
            break

    return h

# Approach 2: Counting Sort - O(n) time, O(n) space
def hIndex(self, citations: List[int]) -> int:
    n = len(citations)
    count = [0] * (n + 1)

    # Count papers
    for c in citations:
        if c >= n:
            count[n] += 1
        else:
            count[c] += 1

    # Find h-index
    total = 0
    for i in range(n, -1, -1):
        total += count[i]
        if total >= i:
            return i

    return 0`
        }
      },
      testCases: [
        { citations: [3,0,6,1,5], expected: 3 },
        { citations: [1,3,1], expected: 1 }
      ],
      examples: [
        { input: 'citations = [3,0,6,1,5]', output: '3', explanation: 'The researcher has 3 papers with at least 3 citations each' },
        { input: 'citations = [1,3,1]', output: '1', explanation: 'The researcher has 1 paper with at least 1 citation' }
      ]
    },
    {
      id: 17,
      title: 'Insert Delete GetRandom O(1)',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/insert-delete-getrandom-o1/',
      description: 'Implement the RandomizedSet class: RandomizedSet() initializes the object. bool insert(int val) inserts an item val into the set if not present. Returns true if the item was not present, false otherwise. bool remove(int val) removes an item val from the set if present. Returns true if the item was present, false otherwise. int getRandom() returns a random element from the current set of elements. Each element must have the same probability of being returned.',
      explanation: `**Problem:** Design a data structure that supports insert, delete, and getRandom all in O(1).

**Key Insight: HashMap + ArrayList**
Combine two data structures:
- HashMap: O(1) insert/delete lookup
- ArrayList: O(1) random access

**Why Both?**
- HashMap alone: can't get random element efficiently
- ArrayList alone: can't delete in O(1) (would need to search)
- Together: HashMap stores value→index, ArrayList stores values

**Delete in O(1) Trick:**
Instead of removing from middle (O(n)), swap with last element and remove last (O(1))
1. Find index of element to delete (HashMap)
2. Swap with last element in ArrayList
3. Update HashMap index for swapped element
4. Remove last element from ArrayList
5. Remove from HashMap

**Example: [1,2,3,4] remove 2**
Step 1: Find index of 2 → index=1
Step 2: Swap 2 with last (4) → [1,4,3,2]
Step 3: Update map: 4→1
Step 4: Remove last → [1,4,3]
Step 5: Remove 2 from map

**Complexity:**
- Insert: O(1)
- Remove: O(1)
- GetRandom: O(1)
- Space: O(n)`,
      pseudocode: `Class RandomizedSet:
-----------------------
    map: HashMap<value, index>
    list: ArrayList<value>

    insert(val):
        if val in map:
            return false

        list.add(val)
        map[val] = list.size() - 1
        return true

    remove(val):
        if val not in map:
            return false

        // Swap with last element
        index = map[val]
        lastElement = list[list.size() - 1]

        list[index] = lastElement
        map[lastElement] = index

        // Remove last
        list.removeLast()
        map.remove(val)

        return true

    getRandom():
        randomIndex = random(0, list.size() - 1)
        return list[randomIndex]

Example Operations:
-----------------------
insert(1): list=[1], map={1:0} → true
insert(2): list=[1,2], map={1:0, 2:1} → true
getRandom(): randomly return 1 or 2
remove(1):
  - swap 1 and 2: list=[2,1]
  - update map: {2:0, 1:1}
  - remove last: list=[2], map={2:0}
  → true
insert(3): list=[2,3], map={2:0, 3:1} → true`,
      code: {
        java: {
          starterCode: `class RandomizedSet {

    public RandomizedSet() {

    }

    public boolean insert(int val) {

    }

    public boolean remove(int val) {

    }

    public int getRandom() {

    }
}`,
          solution: `// Approach: HashMap + ArrayList - O(1) all operations
class RandomizedSet {
    private Map<Integer, Integer> map;  // value -> index
    private List<Integer> list;
    private Random rand;

    public RandomizedSet() {
        map = new HashMap<>();
        list = new ArrayList<>();
        rand = new Random();
    }

    public boolean insert(int val) {
        if (map.containsKey(val)) {
            return false;
        }

        list.add(val);
        map.put(val, list.size() - 1);
        return true;
    }

    public boolean remove(int val) {
        if (!map.containsKey(val)) {
            return false;
        }

        // Swap with last element
        int index = map.get(val);
        int lastElement = list.get(list.size() - 1);

        list.set(index, lastElement);
        map.put(lastElement, index);

        // Remove last
        list.remove(list.size() - 1);
        map.remove(val);

        return true;
    }

    public int getRandom() {
        return list.get(rand.nextInt(list.size()));
    }
}`
        },
        python: {
          starterCode: `class RandomizedSet:

    def __init__(self):


    def insert(self, val: int) -> bool:


    def remove(self, val: int) -> bool:


    def getRandom(self) -> int:
        `,
          solution: `# Approach: Dict + List - O(1) all operations
import random

class RandomizedSet:
    def __init__(self):
        self.map = {}  # value -> index
        self.list = []

    def insert(self, val: int) -> bool:
        if val in self.map:
            return False

        self.list.append(val)
        self.map[val] = len(self.list) - 1
        return True

    def remove(self, val: int) -> bool:
        if val not in self.map:
            return False

        # Swap with last element
        index = self.map[val]
        last_element = self.list[-1]

        self.list[index] = last_element
        self.map[last_element] = index

        # Remove last
        self.list.pop()
        del self.map[val]

        return True

    def getRandom(self) -> int:
        return random.choice(self.list)`
        }
      },
      testCases: [
        { operations: ['insert', 'remove', 'insert', 'getRandom', 'remove', 'insert', 'getRandom'], values: [1, 2, 2, null, 1, 2, null], expected: [true, false, true, 2, true, false, 2] }
      ],
      examples: [
        {
          input: '["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]\n[[], [1], [2], [2], [], [1], [2], []]',
          output: '[null, true, false, true, 2, true, false, 2]',
          explanation: 'insert(1) returns true. remove(2) returns false. insert(2) returns true. getRandom() returns 2. remove(1) returns true. insert(2) returns false. getRandom() returns 2.'
        }
      ]
    },
    {
      id: 18,
      title: 'Candy',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/candy/',
      description: 'There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings. You are giving candies to these children subjected to the following requirements: Each child must have at least one candy. Children with a higher rating get more candies than their neighbors. Return the minimum number of candies you need to have to distribute to the children.',
      explanation: `**Problem:** Give candies to children where higher rated child gets more than neighbors.

**Key Insight: Two Pass Greedy**
Two constraints:
1. If ratings[i] > ratings[i-1], then candies[i] > candies[i-1]
2. If ratings[i] > ratings[i+1], then candies[i] > candies[i+1]

Solve separately then combine!

**Algorithm:**
Pass 1 (Left to Right): Handle left neighbor constraint
- If current > left neighbor, give one more candy
Pass 2 (Right to Left): Handle right neighbor constraint
- If current > right neighbor, ensure current has more
- Take max of both passes to satisfy both constraints

**Example: ratings = [1,0,2]**
Initialize: candies = [1,1,1]
Pass 1 (→):
  - i=1: 0 < 1, no change → [1,1,1]
  - i=2: 2 > 0, give more → [1,1,2]
Pass 2 (←):
  - i=1: 0 < 2, no change → [1,1,2]
  - i=0: 1 > 0, need more → [2,1,2]
Total: 2+1+2 = 5

**Why Two Passes?**
Single pass can't handle cases like:
[1,3,2,1] → child at index 1 needs to satisfy both neighbors
Left pass: [1,2,1,1]
Right pass: [1,3,2,1]
Combined: max of both → [1,3,2,1]

**Complexity:**
- Time: O(n) - two passes
- Space: O(n) - candies array`,
      pseudocode: `Algorithm:
-----------------------
candy(ratings):
    n = length(ratings)
    candies = array of n filled with 1

    // Left to right pass
    for i from 1 to n-1:
        if ratings[i] > ratings[i-1]:
            candies[i] = candies[i-1] + 1

    // Right to left pass
    for i from n-2 down to 0:
        if ratings[i] > ratings[i+1]:
            candies[i] = max(candies[i], candies[i+1] + 1)

    return sum(candies)

Example: ratings = [1,2,87,87,87,2,1]
-----------------------
Initial: [1,1,1,1,1,1,1]

Left→Right:
i=1: 2>1 → [1,2,1,1,1,1,1]
i=2: 87>2 → [1,2,3,1,1,1,1]
i=3: 87=87 → [1,2,3,1,1,1,1]
i=4: 87=87 → [1,2,3,1,1,1,1]
i=5: 2<87 → [1,2,3,1,1,1,1]
i=6: 1<2 → [1,2,3,1,1,1,1]

Right←Left:
i=5: 2>1 → [1,2,3,1,1,2,1]
i=4: 87>2 → [1,2,3,1,3,2,1]
i=3: 87>87 no → [1,2,3,1,3,2,1]
i=2: 87>87 no → [1,2,3,1,3,2,1]
i=1: 2<87 → [1,2,3,1,3,2,1]
i=0: 1<2 → [1,2,3,1,3,2,1]

Total: 1+2+3+1+3+2+1 = 13`,
      code: {
        java: {
          starterCode: `public int candy(int[] ratings) {
    // Write your code here

}`,
          solution: `// Approach: Two Pass Greedy - O(n) time, O(n) space
public int candy(int[] ratings) {
    int n = ratings.length;
    int[] candies = new int[n];
    Arrays.fill(candies, 1);

    // Left to right: ensure higher rated child has more than left neighbor
    for (int i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }

    // Right to left: ensure higher rated child has more than right neighbor
    for (int i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }

    // Sum total candies
    int total = 0;
    for (int c : candies) {
        total += c;
    }

    return total;
}`
        },
        python: {
          starterCode: `def candy(self, ratings: List[int]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: Two Pass Greedy - O(n) time, O(n) space
def candy(self, ratings: List[int]) -> int:
    n = len(ratings)
    candies = [1] * n

    # Left to right: ensure higher rated child has more than left neighbor
    for i in range(1, n):
        if ratings[i] > ratings[i - 1]:
            candies[i] = candies[i - 1] + 1

    # Right to left: ensure higher rated child has more than right neighbor
    for i in range(n - 2, -1, -1):
        if ratings[i] > ratings[i + 1]:
            candies[i] = max(candies[i], candies[i + 1] + 1)

    return sum(candies)`
        }
      },
      testCases: [
        { ratings: [1,0,2], expected: 5 },
        { ratings: [1,2,2], expected: 4 }
      ],
      examples: [
        { input: 'ratings = [1,0,2]', output: '5', explanation: 'You can give candies [2,1,2]' },
        { input: 'ratings = [1,2,2]', output: '4', explanation: 'You can give candies [1,2,1]' }
      ]
    },
    {
      id: 19,
      title: 'Trapping Rain Water',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water/',
      description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
      explanation: `**Problem:** Calculate total water trapped between elevation bars.

**Key Insight: Water Level = min(leftMax, rightMax)**
Water at position i = min(max height to left, max height to right) - height[i]

**Why?**
Water fills to the level of the shorter boundary wall.
Think of each position as a container - water level determined by shorter of left/right walls.

**Approach 1: Two Arrays (O(n) space)**
Precompute leftMax and rightMax for each position:
1. leftMax[i] = max height from 0 to i
2. rightMax[i] = max height from i to n-1
3. water[i] = min(leftMax[i], rightMax[i]) - height[i]

**Approach 2: Two Pointers (O(1) space)**
Use two pointers to avoid extra space:
- Process from both ends inward
- Track leftMax and rightMax as we go
- Move pointer with smaller max (that's the limiting factor)
- Add water if current height < limiting max

**Example: [0,1,0,2,1,0,1,3,2,1,2,1]**

    3    #
2   #    #    #
1   #    # # #
  # # # # # # # # # # #
0 1 0 2 1 0 1 3 2 1 2 1

Water at index 2: min(1,3) - 0 = 1
Water at index 4: min(2,3) - 1 = 1
Water at index 5: min(2,3) - 0 = 2

**Complexity:**
- Time: O(n)
- Space: O(1) with two pointers, O(n) with arrays`,
      pseudocode: `Approach 1: Precompute Arrays
-----------------------
trap(height):
    n = length(height)
    leftMax = array[n]
    rightMax = array[n]

    // Compute leftMax
    leftMax[0] = height[0]
    for i from 1 to n-1:
        leftMax[i] = max(leftMax[i-1], height[i])

    // Compute rightMax
    rightMax[n-1] = height[n-1]
    for i from n-2 down to 0:
        rightMax[i] = max(rightMax[i+1], height[i])

    // Calculate water
    water = 0
    for i from 0 to n-1:
        water += min(leftMax[i], rightMax[i]) - height[i]

    return water

Approach 2: Two Pointers (Optimal)
-----------------------
trap(height):
    left = 0, right = n - 1
    leftMax = 0, rightMax = 0
    water = 0

    while left < right:
        if height[left] < height[right]:
            if height[left] >= leftMax:
                leftMax = height[left]
            else:
                water += leftMax - height[left]
            left++
        else:
            if height[right] >= rightMax:
                rightMax = height[right]
            else:
                water += rightMax - height[right]
            right--

    return water

Example: [0,1,0,2,1,0,1,3,2,1,2,1]
-----------------------
left=0, right=11, leftMax=0, rightMax=0, water=0
height[0]=0 < height[11]=1:
  leftMax=0, left=1

left=1, right=11, leftMax=0, rightMax=0
height[1]=1 = height[11]=1:
  rightMax=1, right=10

... continues...
Result: water = 6`,
      code: {
        java: {
          starterCode: `public int trap(int[] height) {
    // Write your code here

}`,
          solution: `// Approach: Two Pointers - O(n) time, O(1) space
public int trap(int[] height) {
    if (height == null || height.length == 0) return 0;

    int left = 0, right = height.length - 1;
    int leftMax = 0, rightMax = 0;
    int water = 0;

    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }

    return water;
}

// Approach 2: Precompute Arrays - O(n) time, O(n) space
public int trap(int[] height) {
    if (height == null || height.length == 0) return 0;

    int n = height.length;
    int[] leftMax = new int[n];
    int[] rightMax = new int[n];

    leftMax[0] = height[0];
    for (int i = 1; i < n; i++) {
        leftMax[i] = Math.max(leftMax[i - 1], height[i]);
    }

    rightMax[n - 1] = height[n - 1];
    for (int i = n - 2; i >= 0; i--) {
        rightMax[i] = Math.max(rightMax[i + 1], height[i]);
    }

    int water = 0;
    for (int i = 0; i < n; i++) {
        water += Math.min(leftMax[i], rightMax[i]) - height[i];
    }

    return water;
}`
        },
        python: {
          starterCode: `def trap(self, height: List[int]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: Two Pointers - O(n) time, O(1) space
def trap(self, height: List[int]) -> int:
    if not height:
        return 0

    left, right = 0, len(height) - 1
    left_max, right_max = 0, 0
    water = 0

    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1

    return water

# Approach 2: Precompute Arrays - O(n) time, O(n) space
def trap(self, height: List[int]) -> int:
    if not height:
        return 0

    n = len(height)
    left_max = [0] * n
    right_max = [0] * n

    left_max[0] = height[0]
    for i in range(1, n):
        left_max[i] = max(left_max[i - 1], height[i])

    right_max[n - 1] = height[n - 1]
    for i in range(n - 2, -1, -1):
        right_max[i] = max(right_max[i + 1], height[i])

    water = 0
    for i in range(n):
        water += min(left_max[i], right_max[i]) - height[i]

    return water`
        }
      },
      testCases: [
        { height: [0,1,0,2,1,0,1,3,2,1,2,1], expected: 6 },
        { height: [4,2,0,3,2,5], expected: 9 }
      ],
      examples: [
        { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explanation: 'The elevation map traps 6 units of rain water' },
        { input: 'height = [4,2,0,3,2,5]', output: '9', explanation: 'Trapped water: 0+2+4+1+2+0 = 9' }
      ]
    },
    {
      id: 20,
      title: 'Is Subsequence',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/is-subsequence/',
      description: 'Given two strings s and t, return true if s is a subsequence of t, or false otherwise. A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters.',
      explanation: `**Problem:** Check if string s is subsequence of string t.

**Key Insight: Two Pointers**
Walk through t looking for characters of s in order.

**What is a Subsequence?**
"ace" is subsequence of "abcde" - pick 'a', skip 'b', pick 'c', skip 'd', pick 'e'
Order must be preserved, but characters don't have to be consecutive.

**Algorithm:**
1. Two pointers: i for s, j for t
2. Walk through t with j
3. When t[j] matches s[i], increment i
4. If i reaches end of s, all characters found → true
5. If j reaches end of t but i < len(s) → false

**Example: s="abc", t="ahbgdc"**
i=0, j=0: 'a'=='a' → i=1, j=1
i=1, j=1: 'h'!='b' → j=2
i=1, j=2: 'b'=='b' → i=2, j=3
i=2, j=3: 'g'!='c' → j=4
i=2, j=4: 'd'!='c' → j=5
i=2, j=5: 'c'=='c' → i=3
i=3 == len(s) → true

**Complexity:**
- Time: O(n) where n = len(t)
- Space: O(1)`,
      pseudocode: `Algorithm:
-----------------------
isSubsequence(s, t):
    i = 0  // pointer for s
    j = 0  // pointer for t

    while i < len(s) AND j < len(t):
        if s[i] == t[j]:
            i++  // found match, move to next char in s
        j++  // always move forward in t

    return i == len(s)  // true if all of s was found

Example: s="abc", t="ahbgdc"
-----------------------
i=0, j=0: s[0]='a', t[0]='a' → match, i=1, j=1
i=1, j=1: s[1]='b', t[1]='h' → no match, j=2
i=1, j=2: s[1]='b', t[2]='b' → match, i=2, j=3
i=2, j=3: s[2]='c', t[3]='g' → no match, j=4
i=2, j=4: s[2]='c', t[4]='d' → no match, j=5
i=2, j=5: s[2]='c', t[5]='c' → match, i=3, j=6
i=3 == len("abc") → return true

Example: s="axc", t="ahbgdc"
-----------------------
i=0, j=0: s[0]='a', t[0]='a' → match, i=1, j=1
i=1, j=1: s[1]='x', t[1]='h' → no match, j=2
i=1, j=2: s[1]='x', t[2]='b' → no match, j=3
... j reaches end, i=1 < 3
i != len("axc") → return false`,
      code: {
        java: {
          starterCode: `public boolean isSubsequence(String s, String t) {
    // Write your code here

}`,
          solution: `// Approach: Two Pointers - O(n) time, O(1) space
public boolean isSubsequence(String s, String t) {
    int i = 0, j = 0;

    while (i < s.length() && j < t.length()) {
        if (s.charAt(i) == t.charAt(j)) {
            i++;
        }
        j++;
    }

    return i == s.length();
}`
        },
        python: {
          starterCode: `def isSubsequence(self, s: str, t: str) -> bool:
    # Write your code here
    pass`,
          solution: `# Approach: Two Pointers - O(n) time, O(1) space
def isSubsequence(self, s: str, t: str) -> bool:
    i, j = 0, 0

    while i < len(s) and j < len(t):
        if s[i] == t[j]:
            i += 1
        j += 1

    return i == len(s)`
        }
      },
      testCases: [
        { s: 'abc', t: 'ahbgdc', expected: true },
        { s: 'axc', t: 'ahbgdc', expected: false }
      ],
      examples: [
        { input: 's = "abc", t = "ahbgdc"', output: 'true', explanation: 's is a subsequence of t' },
        { input: 's = "axc", t = "ahbgdc"', output: 'false', explanation: 's is not a subsequence of t' }
      ]
    },
    {
      id: 21,
      title: 'Two Sum II - Input Array Is Sorted',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
      description: 'Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Return the indices of the two numbers (index1 and index2) where 1 <= index1 < index2 <= numbers.length. The tests are generated such that there is exactly one solution. You may not use the same element twice.',
      explanation: `**Problem:** Find two numbers in sorted array that sum to target. Return 1-indexed positions.

**Key Insight: Two Pointers**
Since array is sorted, use two pointers from both ends.

**Why Two Pointers Works:**
- If sum too small → move left pointer right (increase sum)
- If sum too large → move right pointer left (decrease sum)
- Guaranteed to find solution if it exists

**Algorithm:**
1. Left pointer at start, right pointer at end
2. Calculate sum = numbers[left] + numbers[right]
3. If sum == target → found! Return [left+1, right+1] (1-indexed)
4. If sum < target → left++ (need larger sum)
5. If sum > target → right-- (need smaller sum)

**Example: numbers=[2,7,11,15], target=9**
left=0, right=3: 2+15=17 > 9 → right=2
left=0, right=2: 2+11=13 > 9 → right=1
left=0, right=1: 2+7=9 ✓ → return [1,2]

**Why Better than HashMap?**
- Two Sum I: Unsorted → HashMap O(n) time, O(n) space
- Two Sum II: Sorted → Two Pointers O(n) time, O(1) space
- Take advantage of sorted property!

**Complexity:**
- Time: O(n) - single pass
- Space: O(1) - only two pointers`,
      pseudocode: `Algorithm:
-----------------------
twoSum(numbers, target):
    left = 0
    right = numbers.length - 1

    while left < right:
        sum = numbers[left] + numbers[right]

        if sum == target:
            return [left + 1, right + 1]  // 1-indexed
        else if sum < target:
            left++  // need larger sum
        else:
            right--  // need smaller sum

    return []  // no solution (won't happen per problem)

Example: numbers=[2,7,11,15], target=9
-----------------------
left=0, right=3
sum = 2 + 15 = 17 > 9 → right=2

left=0, right=2
sum = 2 + 11 = 13 > 9 → right=1

left=0, right=1
sum = 2 + 7 = 9 == 9 → return [1, 2]

Example: numbers=[2,3,4], target=6
-----------------------
left=0, right=2
sum = 2 + 4 = 6 == 6 → return [1, 3]

Why This Works:
-----------------------
Array is sorted: [a, b, c, d, e]
If a + e > target:
  - No point checking a + (anything >= e)
  - Move right pointer left
If a + e < target:
  - No point checking (anything <= a) + e
  - Move left pointer right`,
      code: {
        java: {
          starterCode: `public int[] twoSum(int[] numbers, int target) {
    // Write your code here

}`,
          solution: `// Approach: Two Pointers - O(n) time, O(1) space
public int[] twoSum(int[] numbers, int target) {
    int left = 0, right = numbers.length - 1;

    while (left < right) {
        int sum = numbers[left] + numbers[right];

        if (sum == target) {
            return new int[]{left + 1, right + 1};  // 1-indexed
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }

    return new int[]{};  // No solution (won't happen per problem)
}`
        },
        python: {
          starterCode: `def twoSum(self, numbers: List[int], target: int) -> List[int]:
    # Write your code here
    pass`,
          solution: `# Approach: Two Pointers - O(n) time, O(1) space
def twoSum(self, numbers: List[int], target: int) -> List[int]:
    left, right = 0, len(numbers) - 1

    while left < right:
        current_sum = numbers[left] + numbers[right]

        if current_sum == target:
            return [left + 1, right + 1]  # 1-indexed
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return []  # No solution (won't happen per problem)`
        }
      },
      testCases: [
        { numbers: [2,7,11,15], target: 9, expected: [1,2] },
        { numbers: [2,3,4], target: 6, expected: [1,3] },
        { numbers: [-1,0], target: -1, expected: [1,2] }
      ],
      examples: [
        { input: 'numbers = [2,7,11,15], target = 9', output: '[1,2]', explanation: '2 + 7 = 9, return indices [1,2] (1-indexed)' },
        { input: 'numbers = [2,3,4], target = 6', output: '[1,3]', explanation: '2 + 4 = 6, return indices [1,3]' },
        { input: 'numbers = [-1,0], target = -1', output: '[1,2]', explanation: '-1 + 0 = -1, return indices [1,2]' }
      ]
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Arrays-${q.id}`)).length
    return { completed, total: questions.length, percentage: Math.round((completed / questions.length) * 100) }
  }

  const stats = getCompletionStats()

  // Group questions by difficulty
  const groupedQuestions = {
    Easy: questions.filter(q => q.difficulty === 'Easy'),
    Medium: questions.filter(q => q.difficulty === 'Medium'),
    Hard: questions.filter(q => q.difficulty === 'Hard')
  }

  const selectQuestion = (question) => {
    setSelectedQuestion(question)
    setShowSolution(false)
    setShowExplanation(false)
    setUserCode(question.code[language].starterCode)
    setOutput('')
    setShowDrawing(false)
    // Load existing drawing for this problem
    const savedDrawing = localStorage.getItem(`drawing-Arrays-${question.id}`)
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
    return (
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto', backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            ← Back to Problems
          </button>
          <LanguageToggle />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Problem Description */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #e5e7eb', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#1f2937', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`Arrays-${selectedQuestion.id}`} />
            </div>

            {selectedQuestion.leetcodeUrl && (
              <a href={selectedQuestion.leetcodeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
                View on LeetCode ↗
              </a>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#6b7280', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #e5e7eb', color: '#1f2937' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#1f2937' }}>Input:</strong> <code style={{ color: '#1f2937' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: '#1f2937' }}>Output:</strong> <code style={{ color: '#1f2937' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>💡 Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #dbeafe' }}>
                <h3 style={{ fontSize: '1rem', color: '#1e40af', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#1e40af' }}>⏱️ Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#1e40af' }}>💾 Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #e5e7eb', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
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

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #e5e7eb', borderRadius: '8px', resize: 'none', lineHeight: '1.5' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#374151', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px' }}>{output}</pre>
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
            const savedDrawing = localStorage.getItem(`drawing-Arrays-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`Arrays-${selectedQuestion.id}`}
          existingDrawing={currentDrawing}
        />
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>🔢 Arrays</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Master arrays problems</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', backgroundColor: 'white', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', backgroundColor: 'white', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: 'white', border: '2px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>({difficultyQuestions.length} problems)</span>
              </div>
              <span style={{ fontSize: '1.25rem', color: '#6b7280' }}>{expandedSections[difficulty] ? '▼' : '▶'}</span>
            </button>

            {expandedSections[difficulty] && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
                {difficultyQuestions.map((question) => (
                  <div key={question.id} onClick={() => selectQuestion(question)} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', border: '2px solid #e5e7eb', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`Arrays-${question.id}`} />
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
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      ))}
    </div>
  )
}

export default Arrays
