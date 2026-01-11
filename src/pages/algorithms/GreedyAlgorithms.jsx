import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function GreedyAlgorithms({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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
      title: 'Jump Game',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/jump-game/',
      description: 'You are given an integer array nums. You are initially positioned at the array\'s first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index, or false otherwise.',
      explanation: `**Problem Understanding:**
Determine if you can reach the last index by jumping from position to position, where each element indicates the maximum jump length from that position.

**Key Insights:**
1. Greedy approach: Track the farthest position reachable at any point
2. If current position exceeds farthest reachable, we can't proceed
3. Update farthest reachable position as we iterate
4. If farthest reaches or exceeds last index, return true

**Approaches:**

**Approach 1: Greedy - Track Farthest Reachable**
- Time: O(n) - Single pass
- Space: O(1) - Constant space
- Maintain maximum reachable index
- At each position, update max reachable
- Return true if we can reach the end

**Approach 2: Work Backwards**
- Time: O(n) - Single pass
- Space: O(1) - Constant space
- Start from the end and work backwards
- Track the leftmost good position
- Check if we can reach index 0

**Approach 3: Dynamic Programming**
- Time: O(n²) - Check all jumps
- Space: O(n) - DP array
- Less efficient than greedy

**Edge Cases:**
- Single element array (already at end)
- All zeros except first element
- Maximum jump at each position
- Cannot reach end`,
      pseudocode: `ALGORITHM CanJump(nums):
    maxReach = 0

    FOR i = 0 TO length(nums) - 1:
        // If current position is beyond max reachable
        IF i > maxReach:
            RETURN false

        // Update max reachable position
        maxReach = MAX(maxReach, i + nums[i])

        // Early return if we can reach the end
        IF maxReach >= length(nums) - 1:
            RETURN true

    RETURN true

TIME COMPLEXITY: O(n) - Single pass
SPACE COMPLEXITY: O(1) - Constant space`,
      code: {
        java: {
          starterCode: `public boolean canJump(int[] nums) {
    // Write your code here

}`,
          solution: `// Approach 1: Greedy - Track Farthest Reachable - O(n) time, O(1) space
public boolean canJump(int[] nums) {
    int maxReach = 0;

    for (int i = 0; i < nums.length; i++) {
        // If current position is beyond what we can reach
        if (i > maxReach) {
            return false;
        }

        // Update the farthest position we can reach
        maxReach = Math.max(maxReach, i + nums[i]);

        // Early return if we can already reach the end
        if (maxReach >= nums.length - 1) {
            return true;
        }
    }

    return true;
}

// Approach 2: Work Backwards - O(n) time, O(1) space
public boolean canJumpBackwards(int[] nums) {
    int lastGoodIndex = nums.length - 1;

    for (int i = nums.length - 2; i >= 0; i--) {
        // Check if we can reach the last good index from current position
        if (i + nums[i] >= lastGoodIndex) {
            lastGoodIndex = i;
        }
    }

    return lastGoodIndex == 0;
}

// Approach 3: Dynamic Programming - O(n²) time, O(n) space (Not optimal)
public boolean canJumpDP(int[] nums) {
    int n = nums.length;
    boolean[] dp = new boolean[n];
    dp[0] = true;

    for (int i = 0; i < n; i++) {
        if (!dp[i]) continue;

        for (int j = 1; j <= nums[i] && i + j < n; j++) {
            dp[i + j] = true;
        }
    }

    return dp[n - 1];
}`
        },
        python: {
          starterCode: `def canJump(self, nums: List[int]) -> bool:
    # Write your code here
    pass`,
          solution: `# Approach 1: Greedy - Track Farthest Reachable - O(n) time, O(1) space
def canJump(self, nums: List[int]) -> bool:
    max_reach = 0

    for i in range(len(nums)):
        # If current position is beyond what we can reach
        if i > max_reach:
            return False

        # Update the farthest position we can reach
        max_reach = max(max_reach, i + nums[i])

        # Early return if we can already reach the end
        if max_reach >= len(nums) - 1:
            return True

    return True

# Approach 2: Work Backwards - O(n) time, O(1) space
def can_jump_backwards(self, nums: List[int]) -> bool:
    last_good_index = len(nums) - 1

    for i in range(len(nums) - 2, -1, -1):
        # Check if we can reach the last good index from current position
        if i + nums[i] >= last_good_index:
            last_good_index = i

    return last_good_index == 0

# Approach 3: Dynamic Programming - O(n²) time, O(n) space (Not optimal)
def can_jump_dp(self, nums: List[int]) -> bool:
    n = len(nums)
    dp = [False] * n
    dp[0] = True

    for i in range(n):
        if not dp[i]:
            continue

        for j in range(1, nums[i] + 1):
            if i + j < n:
                dp[i + j] = True

    return dp[n - 1]`
        }
      },
      testCases: [
        { nums: [2,3,1,1,4], expected: true },
        { nums: [3,2,1,0,4], expected: false },
        { nums: [0], expected: true },
        { nums: [1,1,1,1], expected: true },
        { nums: [1,0,1,0], expected: false }
      ],
      examples: [
        {
          input: 'nums = [2,3,1,1,4]',
          output: 'true',
          explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.'
        },
        {
          input: 'nums = [3,2,1,0,4]',
          output: 'false',
          explanation: 'You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.'
        }
      ]
    },
    {
      id: 2,
      title: 'Gas Station',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/gas-station/',
      description: 'There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i]. You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations. Given two integer arrays gas and cost, return the starting gas station\'s index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.',
      explanation: `**Problem Understanding:**
Find the starting gas station from which you can complete a full circuit around the circular route.

**Key Insights:**
1. If total gas < total cost, impossible to complete circuit
2. If a solution exists, it's guaranteed to be unique
3. Greedy: If we can't reach station j from station i, then we can't reach j from any station between i and j
4. Start from next station after failure point

**Approaches:**

**Approach 1: Greedy Single Pass**
- Time: O(n) - Single pass
- Space: O(1) - Constant space
- Track current tank and total gas/cost
- If tank becomes negative, reset start position
- Check if total gas >= total cost at the end

**Approach 2: Try Each Station**
- Time: O(n²) - Try from each station
- Space: O(1) - Constant space
- Brute force approach
- Not optimal

**Edge Cases:**
- Only one station
- Total gas equals total cost exactly
- Impossible to complete (total gas < total cost)
- Start position is the last station`,
      pseudocode: `ALGORITHM CanCompleteCircuit(gas, cost):
    totalGas = 0
    totalCost = 0
    currentTank = 0
    startStation = 0

    FOR i = 0 TO length(gas) - 1:
        totalGas = totalGas + gas[i]
        totalCost = totalCost + cost[i]
        currentTank = currentTank + gas[i] - cost[i]

        // If we can't reach next station
        IF currentTank < 0:
            startStation = i + 1  // Try starting from next station
            currentTank = 0       // Reset tank

    // If total gas < total cost, impossible
    IF totalGas < totalCost:
        RETURN -1

    RETURN startStation

TIME COMPLEXITY: O(n) - Single pass
SPACE COMPLEXITY: O(1) - Constant space`,
      code: {
        java: {
          starterCode: `public int canCompleteCircuit(int[] gas, int[] cost) {
    // Write your code here

}`,
          solution: `// Approach 1: Greedy Single Pass - O(n) time, O(1) space
public int canCompleteCircuit(int[] gas, int[] cost) {
    int totalGas = 0;
    int totalCost = 0;
    int currentTank = 0;
    int startStation = 0;

    for (int i = 0; i < gas.length; i++) {
        totalGas += gas[i];
        totalCost += cost[i];
        currentTank += gas[i] - cost[i];

        // If we can't reach the next station from current start
        if (currentTank < 0) {
            // Start from the next station
            startStation = i + 1;
            currentTank = 0;
        }
    }

    // If total gas is less than total cost, impossible to complete
    return totalGas < totalCost ? -1 : startStation;
}

// Approach 2: Try Each Station - O(n²) time, O(1) space (Brute Force)
public int canCompleteCircuitBruteForce(int[] gas, int[] cost) {
    int n = gas.length;

    for (int start = 0; start < n; start++) {
        int tank = 0;
        int stationsPassed = 0;

        for (int i = start; stationsPassed < n; i = (i + 1) % n) {
            tank += gas[i] - cost[i];
            if (tank < 0) break;
            stationsPassed++;
        }

        if (stationsPassed == n && tank >= 0) {
            return start;
        }
    }

    return -1;
}

// Approach 3: With Detailed Tracking
public int canCompleteCircuitDetailed(int[] gas, int[] cost) {
    int n = gas.length;
    int totalSurplus = 0;
    int currentSurplus = 0;
    int start = 0;

    for (int i = 0; i < n; i++) {
        int surplus = gas[i] - cost[i];
        totalSurplus += surplus;
        currentSurplus += surplus;

        if (currentSurplus < 0) {
            start = i + 1;
            currentSurplus = 0;
        }
    }

    return totalSurplus >= 0 ? start : -1;
}`
        },
        python: {
          starterCode: `def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach 1: Greedy Single Pass - O(n) time, O(1) space
def canCompleteCircuit(self, gas: List[int], cost: List[int]) -> int:
    total_gas = 0
    total_cost = 0
    current_tank = 0
    start_station = 0

    for i in range(len(gas)):
        total_gas += gas[i]
        total_cost += cost[i]
        current_tank += gas[i] - cost[i]

        # If we can't reach the next station from current start
        if current_tank < 0:
            # Start from the next station
            start_station = i + 1
            current_tank = 0

    # If total gas is less than total cost, impossible to complete
    return -1 if total_gas < total_cost else start_station

# Approach 2: Try Each Station - O(n²) time, O(1) space (Brute Force)
def can_complete_circuit_brute_force(self, gas: List[int], cost: List[int]) -> int:
    n = len(gas)

    for start in range(n):
        tank = 0
        stations_passed = 0

        i = start
        while stations_passed < n:
            tank += gas[i] - cost[i]
            if tank < 0:
                break
            stations_passed += 1
            i = (i + 1) % n

        if stations_passed == n and tank >= 0:
            return start

    return -1

# Approach 3: With Detailed Tracking
def can_complete_circuit_detailed(self, gas: List[int], cost: List[int]) -> int:
    total_surplus = 0
    current_surplus = 0
    start = 0

    for i in range(len(gas)):
        surplus = gas[i] - cost[i]
        total_surplus += surplus
        current_surplus += surplus

        if current_surplus < 0:
            start = i + 1
            current_surplus = 0

    return start if total_surplus >= 0 else -1`
        }
      },
      testCases: [
        { gas: [1,2,3,4,5], cost: [3,4,5,1,2], expected: 3 },
        { gas: [2,3,4], cost: [3,4,3], expected: -1 },
        { gas: [5,1,2,3,4], cost: [4,4,1,5,1], expected: 4 },
        { gas: [1,2], cost: [2,1], expected: 1 }
      ],
      examples: [
        {
          input: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]',
          output: '3',
          explanation: 'Start at station 3 (index 3) and fill up with 4 units. Travel to station 4 (cost 1, tank=3). Fill up with 5 units (tank=8). Travel to station 0 (cost 2, tank=6). Continue until completing the circuit.'
        },
        {
          input: 'gas = [2,3,4], cost = [3,4,3]',
          output: '-1',
          explanation: 'You can\'t start at any station and complete the circuit.'
        }
      ]
    },
    {
      id: 3,
      title: 'Partition Labels',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/partition-labels/',
      description: 'You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part. Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s. Return a list of integers representing the size of these parts.',
      explanation: `**Problem Understanding:**
Partition a string into maximum number of parts where each character appears in at most one part.

**Key Insights:**
1. Track the last occurrence of each character
2. Extend current partition to include last occurrence of all characters seen so far
3. When current index reaches the end of current partition, create a new partition
4. Greedy approach: Maximize number of partitions

**Approaches:**

**Approach 1: Greedy with Last Occurrence**
- Time: O(n) - Two passes (one to find last occurrence, one to partition)
- Space: O(1) - Only 26 letters, constant space
- Store last index of each character
- Extend partition to include all characters' last occurrences
- Create new partition when current index equals partition end

**Approach 2: Interval Merging**
- Time: O(n) - Similar to approach 1
- Space: O(1) - Constant space for 26 letters
- Treat each character's first and last occurrence as an interval
- Merge overlapping intervals

**Edge Cases:**
- All same character
- All different characters
- Single character string
- Characters appearing multiple times`,
      pseudocode: `ALGORITHM PartitionLabels(s):
    // Store last occurrence of each character
    lastOccurrence = MAP()
    FOR i = 0 TO length(s) - 1:
        lastOccurrence[s[i]] = i

    partitions = []
    start = 0
    end = 0

    FOR i = 0 TO length(s) - 1:
        // Extend partition to include last occurrence of current char
        end = MAX(end, lastOccurrence[s[i]])

        // If we've reached the end of current partition
        IF i == end:
            partitions.ADD(end - start + 1)
            start = i + 1

    RETURN partitions

TIME COMPLEXITY: O(n) - Two passes through string
SPACE COMPLEXITY: O(1) - Only 26 letters, constant space`,
      code: {
        java: {
          starterCode: `public List<Integer> partitionLabels(String s) {
    // Write your code here

}`,
          solution: `// Approach 1: Greedy with Last Occurrence - O(n) time, O(1) space
public List<Integer> partitionLabels(String s) {
    // Store last occurrence of each character
    int[] lastOccurrence = new int[26];
    for (int i = 0; i < s.length(); i++) {
        lastOccurrence[s.charAt(i) - 'a'] = i;
    }

    List<Integer> partitions = new ArrayList<>();
    int start = 0;
    int end = 0;

    for (int i = 0; i < s.length(); i++) {
        // Extend partition to include last occurrence of current character
        end = Math.max(end, lastOccurrence[s.charAt(i) - 'a']);

        // If we've reached the end of the current partition
        if (i == end) {
            partitions.add(end - start + 1);
            start = i + 1;
        }
    }

    return partitions;
}

// Approach 2: Using HashMap (More readable) - O(n) time, O(1) space
public List<Integer> partitionLabelsHashMap(String s) {
    Map<Character, Integer> lastIndex = new HashMap<>();

    // Record last occurrence of each character
    for (int i = 0; i < s.length(); i++) {
        lastIndex.put(s.charAt(i), i);
    }

    List<Integer> result = new ArrayList<>();
    int partitionStart = 0;
    int partitionEnd = 0;

    for (int i = 0; i < s.length(); i++) {
        partitionEnd = Math.max(partitionEnd, lastIndex.get(s.charAt(i)));

        if (i == partitionEnd) {
            result.add(partitionEnd - partitionStart + 1);
            partitionStart = i + 1;
        }
    }

    return result;
}

// Approach 3: With Detailed Comments
public List<Integer> partitionLabelsDetailed(String s) {
    int[] last = new int[26];
    int n = s.length();

    // Find the last occurrence of each character
    for (int i = 0; i < n; i++) {
        last[s.charAt(i) - 'a'] = i;
    }

    List<Integer> partitions = new ArrayList<>();
    int anchor = 0;  // Start of current partition
    int maxReach = 0;  // Farthest we need to go for current partition

    for (int i = 0; i < n; i++) {
        maxReach = Math.max(maxReach, last[s.charAt(i) - 'a']);

        // Current position reached the max, create partition
        if (i == maxReach) {
            partitions.add(i - anchor + 1);
            anchor = i + 1;
        }
    }

    return partitions;
}`
        },
        python: {
          starterCode: `def partitionLabels(self, s: str) -> List[int]:
    # Write your code here
    pass`,
          solution: `# Approach 1: Greedy with Last Occurrence - O(n) time, O(1) space
def partitionLabels(self, s: str) -> List[int]:
    # Store last occurrence of each character
    last_occurrence = {char: i for i, char in enumerate(s)}

    partitions = []
    start = 0
    end = 0

    for i, char in enumerate(s):
        # Extend partition to include last occurrence of current character
        end = max(end, last_occurrence[char])

        # If we've reached the end of the current partition
        if i == end:
            partitions.append(end - start + 1)
            start = i + 1

    return partitions

# Approach 2: Using Array for Last Index - O(n) time, O(1) space
def partition_labels_array(self, s: str) -> List[int]:
    last = [0] * 26

    # Record last occurrence of each character
    for i, char in enumerate(s):
        last[ord(char) - ord('a')] = i

    partitions = []
    anchor = 0
    max_reach = 0

    for i, char in enumerate(s):
        max_reach = max(max_reach, last[ord(char) - ord('a')])

        if i == max_reach:
            partitions.append(i - anchor + 1)
            anchor = i + 1

    return partitions

# Approach 3: One-liner style (less readable)
def partition_labels_compact(self, s: str) -> List[int]:
    last = {c: i for i, c in enumerate(s)}
    anchor = end = 0
    result = []

    for i, c in enumerate(s):
        end = max(end, last[c])
        if i == end:
            result.append(i - anchor + 1)
            anchor = i + 1

    return result`
        }
      },
      testCases: [
        { s: "ababcbacadefegdehijhklij", expected: [9,7,8] },
        { s: "eccbbbbdec", expected: [10] },
        { s: "abcdef", expected: [1,1,1,1,1,1] },
        { s: "aaaa", expected: [4] }
      ],
      examples: [
        {
          input: 's = "ababcbacadefegdehijhklij"',
          output: '[9, 7, 8]',
          explanation: 'The partition is "ababcbaca", "defegde", "hijhklij". Each letter appears in at most one part.'
        },
        {
          input: 's = "eccbbbbdec"',
          output: '[10]',
          explanation: 'The entire string must be in one partition since all characters appear throughout.'
        }
      ]
    },
    {
      id: 4,
      title: 'Minimum Number of Arrows to Burst Balloons',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/',
      description: 'There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array points where points[i] = [xstart, xend] denotes a balloon whose horizontal diameter stretches between xstart and xend. You do not know the exact y-coordinates of the balloons. Arrows can be shot up directly vertically (in the positive y-direction) from different points along the x-axis. A balloon with xstart and xend is burst by an arrow shot at x if xstart <= x <= xend. There is no limit to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path. Given the array points, return the minimum number of arrows that must be shot to burst all balloons.',
      explanation: `**Problem Understanding:**
Find the minimum number of arrows needed to burst all balloons, where each balloon is represented as an interval [start, end].

**Key Insights:**
1. This is an interval scheduling problem
2. Sort balloons by end position
3. Shoot arrow at the end of first balloon in group
4. Greedy: Always shoot arrow at earliest possible end position
5. Count how many groups of overlapping balloons exist

**Approaches:**

**Approach 1: Greedy - Sort by End Position**
- Time: O(n log n) - Sorting
- Space: O(1) - Constant space (excluding sort)
- Sort intervals by end position
- Shoot arrow at end of first balloon
- Skip balloons that overlap with current arrow position
- Increment arrow count when finding non-overlapping balloon

**Approach 2: Interval Merging**
- Time: O(n log n) - Sorting
- Space: O(n) - Store merged intervals
- Merge overlapping intervals
- Count number of merged intervals

**Edge Cases:**
- No balloons
- Single balloon
- All balloons overlap
- No overlapping balloons
- Balloons with same start/end`,
      pseudocode: `ALGORITHM FindMinArrows(points):
    IF points is empty:
        RETURN 0

    // Sort balloons by end position
    SORT points BY end position

    arrows = 1
    currentArrowPos = points[0][1]  // End of first balloon

    FOR i = 1 TO length(points) - 1:
        // If current balloon starts after arrow position
        IF points[i][0] > currentArrowPos:
            arrows = arrows + 1
            currentArrowPos = points[i][1]  // Shoot new arrow at end

    RETURN arrows

TIME COMPLEXITY: O(n log n) - Sorting dominates
SPACE COMPLEXITY: O(1) - Constant space`,
      code: {
        java: {
          starterCode: `public int findMinArrowShots(int[][] points) {
    // Write your code here

}`,
          solution: `// Approach 1: Greedy - Sort by End Position - O(n log n) time, O(1) space
public int findMinArrowShots(int[][] points) {
    if (points == null || points.length == 0) {
        return 0;
    }

    // Sort by end position (use Integer.compare to avoid overflow)
    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));

    int arrows = 1;
    int currentArrowPos = points[0][1];

    for (int i = 1; i < points.length; i++) {
        // If current balloon starts after the arrow position
        if (points[i][0] > currentArrowPos) {
            arrows++;
            currentArrowPos = points[i][1];  // Shoot new arrow at this end
        }
    }

    return arrows;
}

// Approach 2: Track Overlap Range - O(n log n) time, O(1) space
public int findMinArrowShotsOverlap(int[][] points) {
    if (points.length == 0) return 0;

    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));

    int arrows = 1;
    int end = points[0][1];

    for (int i = 1; i < points.length; i++) {
        // No overlap with current arrow
        if (points[i][0] > end) {
            arrows++;
            end = points[i][1];
        }
        // Overlap - arrow can burst this balloon too
        // end remains the same (or could update to min(end, points[i][1]))
    }

    return arrows;
}

// Approach 3: With Detailed Comments
public int findMinArrowShotsDetailed(int[][] points) {
    if (points == null || points.length == 0) {
        return 0;
    }

    // Sort balloons by their end position
    // This greedy choice ensures we shoot as late as possible
    // to potentially cover more balloons
    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));

    int arrowCount = 1;
    int arrowPosition = points[0][1];

    for (int i = 1; i < points.length; i++) {
        // If the current balloon starts after our arrow position,
        // we need a new arrow
        if (points[i][0] > arrowPosition) {
            arrowCount++;
            arrowPosition = points[i][1];
        }
        // Otherwise, the current arrow can burst this balloon too
    }

    return arrowCount;
}`
        },
        python: {
          starterCode: `def findMinArrowShots(self, points: List[List[int]]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach 1: Greedy - Sort by End Position - O(n log n) time, O(1) space
def findMinArrowShots(self, points: List[List[int]]) -> int:
    if not points:
        return 0

    # Sort by end position
    points.sort(key=lambda x: x[1])

    arrows = 1
    current_arrow_pos = points[0][1]

    for i in range(1, len(points)):
        # If current balloon starts after the arrow position
        if points[i][0] > current_arrow_pos:
            arrows += 1
            current_arrow_pos = points[i][1]

    return arrows

# Approach 2: Track Overlap Range - O(n log n) time, O(1) space
def find_min_arrow_shots_overlap(self, points: List[List[int]]) -> int:
    if not points:
        return 0

    points.sort(key=lambda x: x[1])

    arrows = 1
    end = points[0][1]

    for start, balloon_end in points[1:]:
        # No overlap with current arrow
        if start > end:
            arrows += 1
            end = balloon_end

    return arrows

# Approach 3: More Pythonic
def find_min_arrow_shots_pythonic(self, points: List[List[int]]) -> int:
    if not points:
        return 0

    # Sort by end position
    points.sort(key=lambda x: x[1])

    arrows, end = 1, points[0][1]

    for start, balloon_end in points:
        if start > end:
            arrows += 1
            end = balloon_end

    return arrows`
        }
      },
      testCases: [
        { points: [[10,16],[2,8],[1,6],[7,12]], expected: 2 },
        { points: [[1,2],[3,4],[5,6],[7,8]], expected: 4 },
        { points: [[1,2],[2,3],[3,4],[4,5]], expected: 2 },
        { points: [[1,2]], expected: 1 },
        { points: [[-2147483646,-2147483645],[2147483646,2147483647]], expected: 2 }
      ],
      examples: [
        {
          input: 'points = [[10,16],[2,8],[1,6],[7,12]]',
          output: '2',
          explanation: 'The balloons can be burst by 2 arrows: Shoot an arrow at x = 6, bursting [2,8] and [1,6]. Shoot an arrow at x = 11, bursting [10,16] and [7,12].'
        },
        {
          input: 'points = [[1,2],[3,4],[5,6],[7,8]]',
          output: '4',
          explanation: 'One arrow needs to be shot for each balloon for a total of 4 arrows.'
        }
      ]
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Greedy Algorithms-${q.id}`)).length
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
    const savedDrawing = localStorage.getItem(`drawing-GreedyAlgorithms-${question.id}`)
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
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto', backgroundColor: '#111827', minHeight: '100vh' }}>
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

            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <CompletionCheckbox problemId={`Greedy Algorithms-${selectedQuestion.id}`} />
              <BookmarkButton problemId={`GreedyAlgorithms-${selectedQuestion.id}`} problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'GreedyAlgorithms' }} />
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
            const savedDrawing = localStorage.getItem(`drawing-GreedyAlgorithms-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`GreedyAlgorithms-${selectedQuestion.id}`}
          existingDrawing={currentDrawing}
        />
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#111827', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'} onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}>
          ← Back
        </button>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>🎯 Greedy Algorithms</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Master greedy algorithms problems</p>

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
                          <CompletionCheckbox problemId={`Greedy Algorithms-${question.id}`} />
                        </div>
                        <BookmarkButton size="small" problemId={`GreedyAlgorithms-${question.id}`} problemData={{ title: question.title, difficulty: question.difficulty, category: 'GreedyAlgorithms' }} />
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

export default GreedyAlgorithms
