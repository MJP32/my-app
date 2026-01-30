import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function TwoPointers({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb, breadcrumbStack, onBreadcrumbClick, pushBreadcrumb, breadcrumbColors }) {
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
      title: 'Valid Palindrome',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/',
      description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.',
      explanation: `**Problem:** Check if string is a palindrome after normalizing (lowercase + only alphanumeric).

**Key Insight: Two Pointers**
Compare characters from both ends moving inward.

**Algorithm:**
1. Two pointers: left (start), right (end)
2. Move left forward, right backward
3. Skip non-alphanumeric characters
4. Compare characters (case-insensitive)
5. If mismatch → false
6. If pointers meet → true

**Why This Works:**
- Palindrome: symmetric around center
- Only need to check first half vs second half
- No need to create new string (space efficient)

**Complexity:**
- Time: O(n) - single pass
- Space: O(1) - no extra space`,
      pseudocode: `Algorithm:
-----------------------
isPalindrome(s):
    left = 0
    right = s.length - 1

    while left < right:
        // Skip non-alphanumeric from left
        while left < right AND not isAlphanumeric(s[left]):
            left++

        // Skip non-alphanumeric from right
        while left < right AND not isAlphanumeric(s[right]):
            right--

        // Compare (case-insensitive)
        if toLowerCase(s[left]) != toLowerCase(s[right]):
            return false

        left++
        right--

    return true

Example: "A man, a plan, a canal: Panama"
-----------------------
Normalize: "amanaplanacanalpanama"
left=0 'a', right=20 'a' ✓
left=1 'm', right=19 'm' ✓
...continues...
All match → true`,
      code: {
        java: {
          starterCode: `public boolean isPalindrome(String s) {
    // Write your code here

}`,
          solution: `// Approach: Two Pointers - O(n) time, O(1) space
public boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;

    while (left < right) {
        while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
            left++;
        }
        while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
            right--;
        }

        if (Character.toLowerCase(s.charAt(left)) !=
            Character.toLowerCase(s.charAt(right))) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}`
        },
        python: {
          starterCode: `def isPalindrome(self, s: str) -> bool:
    # Write your code here
    pass`,
          solution: `# Approach: Two Pointers - O(n) time, O(1) space
def isPalindrome(self, s: str) -> bool:
    left, right = 0, len(s) - 1

    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1

        if s[left].lower() != s[right].lower():
            return False

        left += 1
        right -= 1

    return True`
        }
      },
      testCases: [
        { s: 'A man, a plan, a canal: Panama', expected: true },
        { s: 'race a car', expected: false },
        { s: ' ', expected: true }
      ],
      examples: [
        { input: 's = "A man, a plan, a canal: Panama"', output: 'true' },
        { input: 's = "race a car"', output: 'false' },
        { input: 's = " "', output: 'true' }
      ]
    },
    {
      id: 2,
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
sum = 2 + 7 = 9 == 9 → return [1, 2]`,
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
      testCases: [
        { nums: [-1,0,1,2,-1,-4], expected: [[-1,-1,2],[-1,0,1]] },
        { nums: [0,1,1], expected: [] },
        { nums: [0,0,0], expected: [[0,0,0]] }
      ],
      examples: [
        { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]' },
        { input: 'nums = [0,1,1]', output: '[]' },
        { input: 'nums = [0,0,0]', output: '[[0,0,0]]' }
      ]
    },
    {
      id: 4,
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
      testCases: [
        { height: [1,8,6,2,5,4,8,3,7], expected: 49 },
        { height: [1,1], expected: 1 }
      ],
      examples: [
        { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'The max area is between index 1 and 8: min(8,7) * (8-1) = 49' },
        { input: 'height = [1,1]', output: '1' }
      ]
    },
    {
      id: 5,
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

**Complexity:**
- Time: O(n)
- Space: O(1) with two pointers, O(n) with arrays`,
      pseudocode: `Approach: Two Pointers (Optimal)
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
Water at index 2: min(1,3) - 0 = 1
Water at index 4: min(2,3) - 1 = 1
Water at index 5: min(2,3) - 0 = 2
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
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Two Pointers-${q.id}`)).length
    return { completed, total: questions.length, percentage: Math.round((completed / questions.length) * 100) }
  }

  const stats = getCompletionStats()

  // Group questions by difficulty
  const groupedQuestions = {
    Easy: questions.filter(q => q.difficulty === 'Easy'),
    Medium: questions.filter(q => q.difficulty === 'Medium'),
    Hard: questions.filter(q => q.difficulty === 'Hard')
  }

  // Flatten visible questions for keyboard navigation
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

  // Get the index of a question in the visible list
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
    const savedDrawing = localStorage.getItem(`drawing-Two Pointers-${question.id}`)
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
    // Create extended breadcrumb with problem title
    const problemBreadcrumb = {
      ...breadcrumb,
      category: { name: 'Two Pointers', onClick: () => setSelectedQuestion(null) },
      topic: selectedQuestion.title
    }

    const problemBreadcrumbStack = breadcrumbStack
      ? [...breadcrumbStack.slice(0, -1), { name: 'Two Pointers', page: null }, { name: selectedQuestion.title, page: null }]
      : null

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
            ← Back to Two Pointers
          </button>
          <LanguageToggle />
        </div>

        <Breadcrumb
          breadcrumb={problemBreadcrumb}
          breadcrumbStack={problemBreadcrumbStack}
          onBreadcrumbClick={handleProblemBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`Two Pointers-${selectedQuestion.id}`} />
              <BookmarkButton problemId={`TwoPointers-${selectedQuestion.id}`} problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'TwoPointers' }} />
            </div>

            {selectedQuestion.leetcodeUrl && (
              <a href={selectedQuestion.leetcodeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
                View on LeetCode ↗
              </a>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#93c5fd', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#93c5fd', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ backgroundColor: '#374151', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #4b5563', color: '#d1d5db' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#93c5fd' }}>Input:</strong> <code style={{ color: '#d1d5db' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: '#93c5fd' }}>Output:</strong> <code style={{ color: '#d1d5db' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#93c5fd', marginBottom: '0.75rem' }}>Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#1e3a5a', borderRadius: '8px', border: '1px solid #3b82f6' }}>
                <h3 style={{ fontSize: '1rem', color: '#93c5fd', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#60a5fa' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#60a5fa' }}>Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #3b82f6', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
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

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5', backgroundColor: '#1f2937', color: '#d1d5db' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#93c5fd', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#374151', padding: '1rem', borderRadius: '8px', border: '1px solid #4b5563', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px', color: '#d1d5db' }}>{output}</pre>
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
            const savedDrawing = localStorage.getItem(`drawing-Two Pointers-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`Two Pointers-${selectedQuestion.id}`}
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
        onMainMenu={breadcrumb?.onMainMenu}
        colors={breadcrumbColors}
      />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, #93c5fd, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>Two Pointers</h1>
        <p style={{ fontSize: '1.2rem', color: '#d1d5db' }}>Master two pointers problems</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: '2px solid #3b82f6' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#d1d5db', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: '2px solid #10b981' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#d1d5db', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', border: '2px solid #374151', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
                <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>({difficultyQuestions.length} problems)</span>
              </div>
              <span style={{ fontSize: '1.25rem', color: '#d1d5db' }}>{expandedSections[difficulty] ? '▼' : '▶'}</span>
            </button>

            {expandedSections[difficulty] && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }} role="list" aria-label={`${difficulty} problems`}>
                {difficultyQuestions.map((question) => {
                  const visibleIndex = getVisibleIndex(question)
                  const isFocused = focusedIndex === visibleIndex
                  return (
                  <div
                    key={question.id}
                    ref={(el) => { if (el) itemRefs.current[visibleIndex] = el }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${question.title}, ${question.difficulty} difficulty`}
                    className={isFocused ? 'problem-card-focused' : ''}
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
                      border: isFocused ? '2px solid #60a5fa' : '2px solid #374151',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)'; e.currentTarget.style.borderColor = '#3b82f6' }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = isFocused ? '#60a5fa' : '#374151' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#93c5fd', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#d1d5db', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`Two Pointers-${question.id}`} />
                        </div>
                        <BookmarkButton size="small" problemId={`TwoPointers-${question.id}`} problemData={{ title: question.title, difficulty: question.difficulty, category: 'TwoPointers' }} />
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

export default TwoPointers
