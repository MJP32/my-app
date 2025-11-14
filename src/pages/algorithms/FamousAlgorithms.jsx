import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function FamousAlgorithms({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory }) {
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
      title: 'Maximum Subarray (Kadane\'s Algorithm)',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/',
      description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum. A subarray is a contiguous non-empty sequence of elements within an array.',
      explanation: `**Problem Understanding:**
Find the contiguous subarray with the maximum sum using Kadane's Algorithm - one of the most famous algorithms in computer science.

**Key Insights - Kadane's Algorithm:**
1. At each position, decide whether to extend the current subarray or start a new one
2. Keep track of the maximum sum seen so far
3. If current sum becomes negative, reset to 0 (or start fresh from next element)
4. This greedy approach works because a negative prefix can never help maximize the sum

**Approaches:**

**Approach 1: Kadane's Algorithm**
- Time: O(n) - Single pass
- Space: O(1) - Constant space
- Core idea: maxEndingHere = max(num, maxEndingHere + num)
- Track maximum sum seen so far

**Approach 2: Divide and Conquer**
- Time: O(n log n) - Recursive division
- Space: O(log n) - Recursion stack
- Divide array, find max in left, right, and crossing middle

**Approach 3: Dynamic Programming**
- Time: O(n) - Single pass
- Space: O(n) - DP array (can be optimized to O(1))
- Similar to Kadane's but explicitly store DP states

**Edge Cases:**
- All negative numbers
- Single element
- All positive numbers
- Mixed positive and negative`,
      pseudocode: `ALGORITHM MaxSubArray(nums):
    maxSoFar = nums[0]
    maxEndingHere = nums[0]

    FOR i = 1 TO length(nums) - 1:
        // Either extend existing subarray or start new one
        maxEndingHere = MAX(nums[i], maxEndingHere + nums[i])

        // Update global maximum
        maxSoFar = MAX(maxSoFar, maxEndingHere)

    RETURN maxSoFar

KADANE'S ALGORITHM INTUITION:
- At each step, we ask: "Should I add this element to my current sum,
  or start fresh from this element?"
- We choose whichever gives a larger value

TIME COMPLEXITY: O(n) - Single pass
SPACE COMPLEXITY: O(1) - Constant space`,
      code: {
        java: {
          starterCode: `public int maxSubArray(int[] nums) {
    // Write your code here

}`,
          solution: `// Approach 1: Kadane's Algorithm - O(n) time, O(1) space
public int maxSubArray(int[] nums) {
    int maxSoFar = nums[0];
    int maxEndingHere = nums[0];

    for (int i = 1; i < nums.length; i++) {
        // Either extend the existing subarray or start a new one
        maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);

        // Update the global maximum
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }

    return maxSoFar;
}

// Approach 2: Kadane's Algorithm (Alternative Implementation)
public int maxSubArrayAlt(int[] nums) {
    int maxSum = Integer.MIN_VALUE;
    int currentSum = 0;

    for (int num : nums) {
        currentSum += num;
        maxSum = Math.max(maxSum, currentSum);

        // If current sum becomes negative, reset to 0
        if (currentSum < 0) {
            currentSum = 0;
        }
    }

    return maxSum;
}

// Approach 3: Divide and Conquer - O(n log n) time, O(log n) space
public int maxSubArrayDivideConquer(int[] nums) {
    return maxSubArrayHelper(nums, 0, nums.length - 1);
}

private int maxSubArrayHelper(int[] nums, int left, int right) {
    if (left == right) {
        return nums[left];
    }

    int mid = left + (right - left) / 2;

    // Maximum in left half
    int leftMax = maxSubArrayHelper(nums, left, mid);

    // Maximum in right half
    int rightMax = maxSubArrayHelper(nums, mid + 1, right);

    // Maximum crossing the middle
    int crossMax = maxCrossingSum(nums, left, mid, right);

    return Math.max(Math.max(leftMax, rightMax), crossMax);
}

private int maxCrossingSum(int[] nums, int left, int mid, int right) {
    // Max sum in left half ending at mid
    int leftSum = Integer.MIN_VALUE;
    int sum = 0;
    for (int i = mid; i >= left; i--) {
        sum += nums[i];
        leftSum = Math.max(leftSum, sum);
    }

    // Max sum in right half starting from mid+1
    int rightSum = Integer.MIN_VALUE;
    sum = 0;
    for (int i = mid + 1; i <= right; i++) {
        sum += nums[i];
        rightSum = Math.max(rightSum, sum);
    }

    return leftSum + rightSum;
}

// Approach 4: Dynamic Programming (Explicit DP Array)
public int maxSubArrayDP(int[] nums) {
    int n = nums.length;
    int[] dp = new int[n];
    dp[0] = nums[0];
    int maxSum = dp[0];

    for (int i = 1; i < n; i++) {
        dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
        maxSum = Math.max(maxSum, dp[i]);
    }

    return maxSum;
}`
        },
        python: {
          starterCode: `def maxSubArray(self, nums: List[int]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach 1: Kadane's Algorithm - O(n) time, O(1) space
def maxSubArray(self, nums: List[int]) -> int:
    max_so_far = nums[0]
    max_ending_here = nums[0]

    for i in range(1, len(nums)):
        # Either extend the existing subarray or start a new one
        max_ending_here = max(nums[i], max_ending_here + nums[i])

        # Update the global maximum
        max_so_far = max(max_so_far, max_ending_here)

    return max_so_far

# Approach 2: Kadane's Algorithm (Alternative Implementation)
def max_sub_array_alt(self, nums: List[int]) -> int:
    max_sum = float('-inf')
    current_sum = 0

    for num in nums:
        current_sum += num
        max_sum = max(max_sum, current_sum)

        # If current sum becomes negative, reset to 0
        if current_sum < 0:
            current_sum = 0

    return max_sum

# Approach 3: Divide and Conquer - O(n log n) time, O(log n) space
def max_sub_array_divide_conquer(self, nums: List[int]) -> int:
    def max_crossing_sum(left, mid, right):
        # Max sum in left half ending at mid
        left_sum = float('-inf')
        total = 0
        for i in range(mid, left - 1, -1):
            total += nums[i]
            left_sum = max(left_sum, total)

        # Max sum in right half starting from mid+1
        right_sum = float('-inf')
        total = 0
        for i in range(mid + 1, right + 1):
            total += nums[i]
            right_sum = max(right_sum, total)

        return left_sum + right_sum

    def helper(left, right):
        if left == right:
            return nums[left]

        mid = (left + right) // 2

        left_max = helper(left, mid)
        right_max = helper(mid + 1, right)
        cross_max = max_crossing_sum(left, mid, right)

        return max(left_max, right_max, cross_max)

    return helper(0, len(nums) - 1)

# Approach 4: Dynamic Programming (Explicit DP Array)
def max_sub_array_dp(self, nums: List[int]) -> int:
    n = len(nums)
    dp = [0] * n
    dp[0] = nums[0]
    max_sum = dp[0]

    for i in range(1, n):
        dp[i] = max(nums[i], dp[i - 1] + nums[i])
        max_sum = max(max_sum, dp[i])

    return max_sum

# Pythonic one-liner (Kadane's)
def max_sub_array_oneliner(self, nums: List[int]) -> int:
    return max(accumulate(nums, lambda max_so_far, num: max(num, max_so_far + num)))
    # Note: requires from itertools import accumulate`
        }
      },
      testCases: [
        { nums: [-2,1,-3,4,-1,2,1,-5,4], expected: 6 },
        { nums: [1], expected: 1 },
        { nums: [5,4,-1,7,8], expected: 23 },
        { nums: [-1], expected: -1 },
        { nums: [-2,-1], expected: -1 }
      ],
      examples: [
        {
          input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
          output: '6',
          explanation: 'The subarray [4,-1,2,1] has the largest sum 6.'
        },
        {
          input: 'nums = [1]',
          output: '1',
          explanation: 'The subarray [1] has the largest sum 1.'
        }
      ]
    },
    {
      id: 2,
      title: 'Linked List Cycle (Floyd\'s Cycle Detection)',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/',
      description: 'Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Return true if there is a cycle in the linked list. Otherwise, return false.',
      explanation: `**Problem Understanding:**
Detect if a linked list has a cycle using Floyd's Cycle Detection Algorithm (Tortoise and Hare).

**Key Insights - Floyd's Algorithm:**
1. Use two pointers: slow (moves 1 step) and fast (moves 2 steps)
2. If there's a cycle, fast will eventually catch up to slow
3. If there's no cycle, fast will reach the end (null)
4. This is also called the "Tortoise and Hare" algorithm

**Why It Works:**
- In a cycle, the fast pointer gains on the slow pointer by 1 position per iteration
- Eventually, they will meet inside the cycle
- If no cycle exists, fast reaches null

**Approaches:**

**Approach 1: Floyd's Cycle Detection (Two Pointers)**
- Time: O(n) - At most 2n steps
- Space: O(1) - Constant space
- Most optimal solution

**Approach 2: Hash Set**
- Time: O(n) - Visit each node once
- Space: O(n) - Store visited nodes
- Straightforward but uses extra space

**Edge Cases:**
- Empty list (no cycle)
- Single node (no cycle)
- Two nodes with cycle
- Cycle at the beginning vs middle`,
      pseudocode: `ALGORITHM HasCycle(head):
    IF head is NULL OR head.next is NULL:
        RETURN false

    slow = head
    fast = head

    WHILE fast != NULL AND fast.next != NULL:
        slow = slow.next           // Move 1 step
        fast = fast.next.next      // Move 2 steps

        IF slow == fast:           // They met - cycle exists
            RETURN true

    RETURN false                    // Fast reached end - no cycle

FLOYD'S ALGORITHM INTUITION:
- Think of it like a race track
- If there's a loop, the faster runner will eventually lap the slower one
- If there's no loop, the faster runner reaches the finish line

TIME COMPLEXITY: O(n) - At most 2n steps
SPACE COMPLEXITY: O(1) - Only two pointers`,
      code: {
        java: {
          starterCode: `/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public boolean hasCycle(ListNode head) {
    // Write your code here

}`,
          solution: `// Approach 1: Floyd's Cycle Detection - O(n) time, O(1) space
public boolean hasCycle(ListNode head) {
    if (head == null || head.next == null) {
        return false;
    }

    ListNode slow = head;
    ListNode fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;           // Move 1 step
        fast = fast.next.next;      // Move 2 steps

        if (slow == fast) {         // Cycle detected
            return true;
        }
    }

    return false;  // No cycle - fast reached the end
}

// Approach 2: Hash Set - O(n) time, O(n) space
public boolean hasCycleHashSet(ListNode head) {
    Set<ListNode> visited = new HashSet<>();

    ListNode current = head;
    while (current != null) {
        if (visited.contains(current)) {
            return true;  // Found a cycle
        }
        visited.add(current);
        current = current.next;
    }

    return false;  // No cycle found
}

// Approach 3: Floyd's with Clear Variable Names
public boolean hasCycleClear(ListNode head) {
    if (head == null) return false;

    ListNode tortoise = head;
    ListNode hare = head;

    while (hare != null && hare.next != null) {
        tortoise = tortoise.next;        // Slow: 1 step
        hare = hare.next.next;           // Fast: 2 steps

        if (tortoise == hare) {
            return true;  // They met - cycle exists
        }
    }

    return false;  // Hare reached the end - no cycle
}`
        },
        python: {
          starterCode: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

def hasCycle(self, head: Optional[ListNode]) -> bool:
    # Write your code here
    pass`,
          solution: `# Approach 1: Floyd's Cycle Detection - O(n) time, O(1) space
def hasCycle(self, head: Optional[ListNode]) -> bool:
    if not head or not head.next:
        return False

    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next           # Move 1 step
        fast = fast.next.next      # Move 2 steps

        if slow == fast:           # Cycle detected
            return True

    return False  # No cycle - fast reached the end

# Approach 2: Hash Set - O(n) time, O(n) space
def has_cycle_hashset(self, head: Optional[ListNode]) -> bool:
    visited = set()

    current = head
    while current:
        if current in visited:
            return True  # Found a cycle
        visited.add(current)
        current = current.next

    return False  # No cycle found

# Approach 3: Floyd's with Clear Variable Names
def has_cycle_clear(self, head: Optional[ListNode]) -> bool:
    if not head:
        return False

    tortoise = head
    hare = head

    while hare and hare.next:
        tortoise = tortoise.next        # Slow: 1 step
        hare = hare.next.next           # Fast: 2 steps

        if tortoise == hare:
            return True  # They met - cycle exists

    return False  # Hare reached the end - no cycle

# Approach 4: Pythonic with walrus operator (Python 3.8+)
def has_cycle_pythonic(self, head: Optional[ListNode]) -> bool:
    slow = fast = head
    while fast and (fast := fast.next):
        slow = slow.next
        if slow == (fast := fast.next):
            return True
    return False`
        }
      },
      testCases: [
        { description: 'List: [3,2,0,-4], pos = 1 (cycle)', expected: true },
        { description: 'List: [1,2], pos = 0 (cycle)', expected: true },
        { description: 'List: [1], pos = -1 (no cycle)', expected: false },
        { description: 'List: [], pos = -1 (empty list)', expected: false }
      ],
      examples: [
        {
          input: 'head = [3,2,0,-4], pos = 1',
          output: 'true',
          explanation: 'There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).'
        },
        {
          input: 'head = [1], pos = -1',
          output: 'false',
          explanation: 'There is no cycle in the linked list.'
        }
      ]
    },
    {
      id: 3,
      title: 'Majority Element (Boyer-Moore Voting)',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/majority-element/',
      description: 'Given an array nums of size n, return the majority element. The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.',
      explanation: `**Problem Understanding:**
Find the majority element (appears more than n/2 times) using Boyer-Moore Voting Algorithm.

**Key Insights - Boyer-Moore Voting:**
1. The majority element appears more than n/2 times
2. If we cancel out different elements, majority element will remain
3. Use a candidate and count approach
4. When count reaches 0, switch to a new candidate
5. The final candidate is guaranteed to be the majority element

**Why It Works:**
- Even in the worst case, the majority element appears more than all other elements combined
- Canceling different elements leaves the majority element

**Approaches:**

**Approach 1: Boyer-Moore Voting Algorithm**
- Time: O(n) - Single pass
- Space: O(1) - Constant space
- Optimal solution

**Approach 2: Hash Map**
- Time: O(n) - Count occurrences
- Space: O(n) - Store counts
- Straightforward but uses extra space

**Approach 3: Sorting**
- Time: O(n log n) - Sort the array
- Space: O(1) - In-place sort
- Middle element will be majority after sorting

**Edge Cases:**
- Single element
- All elements are the same
- Majority element at the beginning vs end`,
      pseudocode: `ALGORITHM FindMajorityElement(nums):
    candidate = NULL
    count = 0

    // Phase 1: Find candidate
    FOR each num IN nums:
        IF count == 0:
            candidate = num

        IF num == candidate:
            count = count + 1
        ELSE:
            count = count - 1

    // Phase 2: Verify candidate (optional if majority guaranteed)
    // In this problem, majority element always exists, so return candidate
    RETURN candidate

BOYER-MOORE INTUITION:
- Think of it as a voting process where different votes cancel out
- The majority candidate will always have votes remaining
- Like a battle where the majority side wins even when paired against all others

TIME COMPLEXITY: O(n) - Single pass
SPACE COMPLEXITY: O(1) - Only two variables`,
      code: {
        java: {
          starterCode: `public int majorityElement(int[] nums) {
    // Write your code here

}`,
          solution: `// Approach 1: Boyer-Moore Voting Algorithm - O(n) time, O(1) space
public int majorityElement(int[] nums) {
    int candidate = 0;
    int count = 0;

    // Phase 1: Find candidate
    for (int num : nums) {
        if (count == 0) {
            candidate = num;
        }

        if (num == candidate) {
            count++;
        } else {
            count--;
        }
    }

    // Phase 2: Verify (optional - problem guarantees majority exists)
    // In this problem, we can directly return candidate
    return candidate;
}

// Approach 2: Boyer-Moore with Verification
public int majorityElementWithVerify(int[] nums) {
    int candidate = 0;
    int count = 0;

    // Find candidate
    for (int num : nums) {
        if (count == 0) {
            candidate = num;
        }
        count += (num == candidate) ? 1 : -1;
    }

    // Verify candidate (if majority not guaranteed)
    count = 0;
    for (int num : nums) {
        if (num == candidate) {
            count++;
        }
    }

    return count > nums.length / 2 ? candidate : -1;
}

// Approach 3: Hash Map - O(n) time, O(n) space
public int majorityElementHashMap(int[] nums) {
    Map<Integer, Integer> counts = new HashMap<>();

    for (int num : nums) {
        counts.put(num, counts.getOrDefault(num, 0) + 1);
        if (counts.get(num) > nums.length / 2) {
            return num;
        }
    }

    return -1;  // Should never reach here if majority exists
}

// Approach 4: Sorting - O(n log n) time, O(1) space
public int majorityElementSort(int[] nums) {
    Arrays.sort(nums);
    // The middle element is guaranteed to be the majority
    return nums[nums.length / 2];
}

// Approach 5: Bit Manipulation - O(32n) time, O(1) space
public int majorityElementBit(int[] nums) {
    int majority = 0;
    int n = nums.length;

    // Check each bit position
    for (int i = 0; i < 32; i++) {
        int bit = 1 << i;
        int count = 0;

        for (int num : nums) {
            if ((num & bit) != 0) {
                count++;
            }
        }

        // If more than half have this bit set
        if (count > n / 2) {
            majority |= bit;
        }
    }

    return majority;
}`
        },
        python: {
          starterCode: `def majorityElement(self, nums: List[int]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach 1: Boyer-Moore Voting Algorithm - O(n) time, O(1) space
def majorityElement(self, nums: List[int]) -> int:
    candidate = None
    count = 0

    # Phase 1: Find candidate
    for num in nums:
        if count == 0:
            candidate = num

        count += 1 if num == candidate else -1

    # Phase 2: Return candidate (majority guaranteed in problem)
    return candidate

# Approach 2: Boyer-Moore with Verification
def majority_element_with_verify(self, nums: List[int]) -> int:
    # Find candidate
    candidate = None
    count = 0

    for num in nums:
        if count == 0:
            candidate = num
        count += 1 if num == candidate else -1

    # Verify candidate (if majority not guaranteed)
    if nums.count(candidate) > len(nums) // 2:
        return candidate
    return -1

# Approach 3: Hash Map (Counter) - O(n) time, O(n) space
def majority_element_counter(self, nums: List[int]) -> int:
    from collections import Counter
    counts = Counter(nums)
    return counts.most_common(1)[0][0]

# Approach 4: Sorting - O(n log n) time, O(1) space
def majority_element_sort(self, nums: List[int]) -> int:
    nums.sort()
    return nums[len(nums) // 2]

# Approach 5: Pythonic One-liner
def majority_element_oneliner(self, nums: List[int]) -> int:
    from collections import Counter
    return Counter(nums).most_common(1)[0][0]

# Approach 6: Bit Manipulation - O(32n) time, O(1) space
def majority_element_bit(self, nums: List[int]) -> int:
    majority = 0
    n = len(nums)

    for i in range(32):
        bit = 1 << i
        count = sum(1 for num in nums if num & bit)

        if count > n // 2:
            majority |= bit

    return majority`
        }
      },
      testCases: [
        { nums: [3,2,3], expected: 3 },
        { nums: [2,2,1,1,1,2,2], expected: 2 },
        { nums: [1], expected: 1 },
        { nums: [6,5,5], expected: 5 }
      ],
      examples: [
        {
          input: 'nums = [3,2,3]',
          output: '3',
          explanation: 'The majority element is 3, which appears 2 times (> 3/2).'
        },
        {
          input: 'nums = [2,2,1,1,1,2,2]',
          output: '2',
          explanation: 'The majority element is 2, which appears 4 times (> 7/2).'
        }
      ]
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Famous Algorithms-${q.id}`)).length
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
    const savedDrawing = localStorage.getItem(`drawing-FamousAlgorithms-${question.id}`)
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
              <CompletionCheckbox problemId={`Famous Algorithms-${selectedQuestion.id}`} />
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
            const savedDrawing = localStorage.getItem(`drawing-FamousAlgorithms-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`FamousAlgorithms-${selectedQuestion.id}`}
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
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>⭐ Famous Algorithms</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Master famous algorithms problems</p>

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
                          <CompletionCheckbox problemId={`Famous Algorithms-${question.id}`} />
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

export default FamousAlgorithms
