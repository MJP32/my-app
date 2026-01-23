import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function HashTables({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb, breadcrumbStack, onBreadcrumbClick, pushBreadcrumb, breadcrumbColors }) {
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
      title: 'Group Anagrams',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/',
      description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
      explanation: `**Problem:** Group strings that are anagrams of each other.

**Key Insight:** Anagrams have the same characters in different order. If we sort the characters, all anagrams will produce the same sorted string which we can use as a HashMap key.

**Approach 1: Sorted String as Key**
1. Create a HashMap where key = sorted string, value = list of anagrams
2. For each string, sort its characters to create the key
3. Add the original string to the list mapped by that key
4. Return all values from the map

**Approach 2: Character Count as Key (Faster)**
1. Instead of sorting, count character frequencies
2. Use the count array (or tuple) as the key
3. Avoid O(k log k) sorting, achieve O(k) per string

**Complexity:** Approach 1: O(n * k log k), Approach 2: O(n * k) where n = number of strings, k = average string length. Space: O(n * k)`,
      pseudocode: `ALGORITHM GroupAnagrams(strs):
    map = HashMap<String, List<String>>()

    FOR each str in strs:
        // Approach 1: Sort as key
        key = sort(str.toCharArray())

        IF key not in map:
            map[key] = new List()
        map[key].add(str)

    RETURN map.values()

ALGORITHM GroupAnagramsOptimized(strs):
    map = HashMap<String, List<String>>()

    FOR each str in strs:
        // Approach 2: Character count as key
        count = array[26] filled with 0
        FOR each char c in str:
            count[c - 'a']++

        key = convert count array to string (e.g., "#2#1#0...")

        IF key not in map:
            map[key] = new List()
        map[key].add(str)

    RETURN map.values()

Example: ["eat", "tea", "tan", "ate", "nat", "bat"]
- "eat" → sorted = "aet" → group1
- "tea" → sorted = "aet" → group1
- "tan" → sorted = "ant" → group2
- "ate" → sorted = "aet" → group1
- "nat" → sorted = "ant" → group2
- "bat" → sorted = "abt" → group3
Result: [["eat","tea","ate"], ["tan","nat"], ["bat"]]`,
      code: {
        java: {
          starterCode: `public List<List<String>> groupAnagrams(String[] strs) {
    // Write your code here

}`,
          solution: `// Approach: Sort each string and use as key - O(n * k log k) time
public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();

    for (String str : strs) {
        char[] chars = str.toCharArray();
        Arrays.sort(chars);
        String key = String.valueOf(chars);

        map.putIfAbsent(key, new ArrayList<>());
        map.get(key).add(str);
    }

    return new ArrayList<>(map.values());
}

// Approach 2: Character count as key - O(n * k) time
public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();

    for (String str : strs) {
        int[] count = new int[26];
        for (char c : str.toCharArray()) {
            count[c - 'a']++;
        }

        StringBuilder key = new StringBuilder();
        for (int i = 0; i < 26; i++) {
            key.append('#').append(count[i]);
        }

        String keyStr = key.toString();
        map.putIfAbsent(keyStr, new ArrayList<>());
        map.get(keyStr).add(str);
    }

    return new ArrayList<>(map.values());
}`
        },
        python: {
          starterCode: `def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
    # Write your code here
    pass`,
          solution: `# Approach: Sort each string and use as key - O(n * k log k) time
def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
    groups = {}

    for s in strs:
        key = ''.join(sorted(s))

        if key not in groups:
            groups[key] = []
        groups[key].append(s)

    return list(groups.values())

# Approach 2: Character count as key - O(n * k) time
from collections import defaultdict

def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
    groups = defaultdict(list)

    for s in strs:
        count = [0] * 26
        for c in s:
            count[ord(c) - ord('a')] += 1

        key = tuple(count)
        groups[key].append(s)

    return list(groups.values())`
        }
      },
      testCases: [
        { strs: ['eat','tea','tan','ate','nat','bat'], expected: [['bat'],['nat','tan'],['ate','eat','tea']] },
        { strs: [''], expected: [['']] },
        { strs: ['a'], expected: [['a']] }
      ],
      examples: [
        { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
        { input: 'strs = [""]', output: '[[""]]' },
        { input: 'strs = ["a"]', output: '[["a"]]' }
      ]
    },
    {
      id: 2,
      title: 'Longest Consecutive Sequence',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/',
      description: 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.',
      explanation: `**Problem:** Find the length of the longest consecutive sequence in an unsorted array in O(n) time.

**Key Insight:** Use a HashSet for O(1) lookups. Only start counting from numbers that are the beginning of a sequence (i.e., num-1 is not in the set). This ensures each number is visited at most twice.

**Approach: HashSet with Smart Iteration**
1. Add all numbers to a HashSet for O(1) lookup
2. For each number, check if it's the start of a sequence (num-1 not in set)
3. If it's a start, count consecutive numbers (num+1, num+2, ...) while they exist
4. Track the maximum length found

**Why This is O(n):**
- We only start counting from sequence beginnings
- Each number is counted exactly once as part of a sequence
- HashSet operations are O(1)

**Complexity:** Time O(n), Space O(n)`,
      pseudocode: `ALGORITHM LongestConsecutive(nums):
    IF nums is empty:
        RETURN 0

    numSet = HashSet(nums)
    maxLength = 0

    FOR each num in numSet:
        // Only start if this is the beginning of a sequence
        IF (num - 1) NOT in numSet:
            currentNum = num
            currentLength = 1

            // Count consecutive numbers
            WHILE (currentNum + 1) in numSet:
                currentNum++
                currentLength++

            maxLength = max(maxLength, currentLength)

    RETURN maxLength

Example: nums = [100, 4, 200, 1, 3, 2]
Set: {100, 4, 200, 1, 3, 2}

Iteration:
- 100: (99 not in set) → start → 100 → length 1
- 4: (3 in set) → skip (not a start)
- 200: (199 not in set) → start → 200 → length 1
- 1: (0 not in set) → start → 1,2,3,4 → length 4 ✓
- 3: (2 in set) → skip
- 2: (1 in set) → skip

Result: 4 (sequence: [1,2,3,4])`,
      code: {
        java: {
          starterCode: `public int longestConsecutive(int[] nums) {
    // Write your code here

}`,
          solution: `// Approach: HashSet - O(n) time, O(n) space
public int longestConsecutive(int[] nums) {
    if (nums.length == 0) return 0;

    Set<Integer> set = new HashSet<>();
    for (int num : nums) {
        set.add(num);
    }

    int maxLength = 0;

    for (int num : set) {
        // Only start counting if this is the beginning of a sequence
        if (!set.contains(num - 1)) {
            int currentNum = num;
            int currentLength = 1;

            while (set.contains(currentNum + 1)) {
                currentNum++;
                currentLength++;
            }

            maxLength = Math.max(maxLength, currentLength);
        }
    }

    return maxLength;
}`
        },
        python: {
          starterCode: `def longestConsecutive(self, nums: List[int]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: HashSet - O(n) time, O(n) space
def longestConsecutive(self, nums: List[int]) -> int:
    if not nums:
        return 0

    num_set = set(nums)
    max_length = 0

    for num in num_set:
        # Only start counting if this is the beginning of a sequence
        if num - 1 not in num_set:
            current_num = num
            current_length = 1

            while current_num + 1 in num_set:
                current_num += 1
                current_length += 1

            max_length = max(max_length, current_length)

    return max_length`
        }
      },
      testCases: [
        { nums: [100,4,200,1,3,2], expected: 4 },
        { nums: [0,3,7,2,5,8,4,6,0,1], expected: 9 }
      ],
      examples: [
        { input: 'nums = [100,4,200,1,3,2]', output: '4', explanation: 'The longest consecutive sequence is [1, 2, 3, 4].' },
        { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9' }
      ]
    },
    {
      id: 3,
      title: 'Top K Frequent Elements',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
      description: 'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.',
      explanation: `**Problem:** Find the k most frequent elements in an array.

**Key Insight:** Two approaches - (1) Use a min-heap of size k to track top k elements, or (2) Use bucket sort where index represents frequency.

**Approach 1: HashMap + Min Heap**
1. Count frequencies using HashMap
2. Use a min-heap of size k to maintain top k frequent elements
3. For each unique number, add to heap
4. If heap size > k, remove the smallest frequency element
5. Time: O(n log k), Space: O(n)

**Approach 2: HashMap + Bucket Sort (Optimal)**
1. Count frequencies using HashMap
2. Create buckets where index i contains all numbers with frequency i
3. Iterate from highest frequency to lowest, collecting k elements
4. Time: O(n), Space: O(n)

**Complexity:** Heap approach: O(n log k), Bucket Sort: O(n)`,
      pseudocode: `ALGORITHM TopKFrequentHeap(nums, k):
    freq = HashMap<Integer, Integer>()

    // Count frequencies
    FOR each num in nums:
        freq[num] = freq.getOrDefault(num, 0) + 1

    // Min heap based on frequency
    minHeap = PriorityQueue(compare by frequency)

    FOR each num in freq.keys():
        minHeap.add(num)
        IF minHeap.size() > k:
            minHeap.poll()  // Remove least frequent

    RETURN minHeap as array

ALGORITHM TopKFrequentBucket(nums, k):
    freq = HashMap<Integer, Integer>()

    // Count frequencies
    FOR each num in nums:
        freq[num] = freq.getOrDefault(num, 0) + 1

    // Create buckets: index = frequency
    buckets = Array[nums.length + 1] of Lists

    FOR each num in freq.keys():
        frequency = freq[num]
        IF buckets[frequency] is null:
            buckets[frequency] = new List()
        buckets[frequency].add(num)

    // Collect top k from highest frequency
    result = []
    FOR i FROM buckets.length-1 DOWN TO 0:
        IF buckets[i] is not null:
            FOR each num in buckets[i]:
                result.add(num)
                IF result.size() == k:
                    RETURN result

    RETURN result

Example: nums = [1,1,1,2,2,3], k = 2
Frequencies: {1: 3, 2: 2, 3: 1}
Buckets: [empty, [3], [2], [1]]
Result: [1, 2] (most frequent elements)`,
      code: {
        java: {
          starterCode: `public int[] topKFrequent(int[] nums, int k) {
    // Write your code here

}`,
          solution: `// Approach 1: HashMap + Heap - O(n log k) time
public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> freq = new HashMap<>();
    for (int num : nums) {
        freq.put(num, freq.getOrDefault(num, 0) + 1);
    }

    PriorityQueue<Integer> heap = new PriorityQueue<>(
        (a, b) -> freq.get(a) - freq.get(b)
    );

    for (int num : freq.keySet()) {
        heap.offer(num);
        if (heap.size() > k) {
            heap.poll();
        }
    }

    int[] result = new int[k];
    for (int i = 0; i < k; i++) {
        result[i] = heap.poll();
    }

    return result;
}

// Approach 2: Bucket Sort - O(n) time
public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> freq = new HashMap<>();
    for (int num : nums) {
        freq.put(num, freq.getOrDefault(num, 0) + 1);
    }

    List<Integer>[] buckets = new List[nums.length + 1];
    for (int num : freq.keySet()) {
        int frequency = freq.get(num);
        if (buckets[frequency] == null) {
            buckets[frequency] = new ArrayList<>();
        }
        buckets[frequency].add(num);
    }

    int[] result = new int[k];
    int index = 0;

    for (int i = buckets.length - 1; i >= 0 && index < k; i--) {
        if (buckets[i] != null) {
            for (int num : buckets[i]) {
                result[index++] = num;
                if (index == k) break;
            }
        }
    }

    return result;
}`
        },
        python: {
          starterCode: `def topKFrequent(self, nums: List[int], k: int) -> List[int]:
    # Write your code here
    pass`,
          solution: `# Approach 1: Counter + Heap - O(n log k) time
from collections import Counter
import heapq

def topKFrequent(self, nums: List[int], k: int) -> List[int]:
    freq = Counter(nums)

    # Use min heap to keep track of top k elements
    heap = []
    for num, count in freq.items():
        heapq.heappush(heap, (count, num))
        if len(heap) > k:
            heapq.heappop(heap)

    return [num for count, num in heap]

# Approach 2: Bucket Sort - O(n) time
from collections import Counter

def topKFrequent(self, nums: List[int], k: int) -> List[int]:
    freq = Counter(nums)

    # Create buckets where index is frequency
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, count in freq.items():
        buckets[count].append(num)

    result = []
    # Iterate from highest frequency to lowest
    for i in range(len(buckets) - 1, -1, -1):
        if buckets[i]:
            result.extend(buckets[i])
            if len(result) >= k:
                return result[:k]

    return result`
        }
      },
      testCases: [
        { nums: [1,1,1,2,2,3], k: 2, expected: [1,2] },
        { nums: [1], k: 1, expected: [1] }
      ],
      examples: [
        { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
        { input: 'nums = [1], k = 1', output: '[1]' }
      ]
    },
    {
      id: 4,
      title: 'Valid Sudoku',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/valid-sudoku/',
      description: 'Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules: Each row must contain digits 1-9 without repetition, each column must contain digits 1-9 without repetition, and each of the nine 3 x 3 sub-boxes must contain digits 1-9 without repetition.',
      explanation: `**Problem:** Validate a partially filled 9x9 Sudoku board.

**Key Insight:** Use a HashSet to track seen numbers. Create unique keys for each position (row, column, box) and check for duplicates in a single pass.

**Approach 1: Single HashSet with Unique Keys**
1. Create one HashSet to store all seen combinations
2. For each cell (i, j) with value v:
   - Create key "v in row i"
   - Create key "v in col j"
   - Create key "v in box boxIndex" (boxIndex = (i/3)*3 + j/3)
3. If any key already exists in set, return false
4. Otherwise add all three keys to set

**Approach 2: Separate HashSets**
1. Create 9 sets for rows, 9 for columns, 9 for boxes
2. For each cell, check if number exists in respective row, col, or box set
3. If exists, return false; otherwise add to all three sets

**Complexity:** Time O(1) - constant 81 cells, Space O(1) - constant size sets`,
      pseudocode: `ALGORITHM IsValidSudoku(board):
    seen = HashSet<String>()

    FOR i FROM 0 TO 8:
        FOR j FROM 0 TO 8:
            current = board[i][j]

            IF current != '.':
                rowKey = current + " in row " + i
                colKey = current + " in col " + j
                boxKey = current + " in box " + (i/3) + "-" + (j/3)

                // Check if any key already exists
                IF rowKey in seen OR colKey in seen OR boxKey in seen:
                    RETURN false

                // Add all three keys
                seen.add(rowKey)
                seen.add(colKey)
                seen.add(boxKey)

    RETURN true

ALGORITHM IsValidSudokuSeparateSets(board):
    rows = Array[9] of HashSets
    cols = Array[9] of HashSets
    boxes = Array[9] of HashSets

    // Initialize all sets
    FOR i FROM 0 TO 8:
        rows[i] = new HashSet()
        cols[i] = new HashSet()
        boxes[i] = new HashSet()

    FOR i FROM 0 TO 8:
        FOR j FROM 0 TO 8:
            IF board[i][j] == '.':
                CONTINUE

            num = board[i][j]
            boxIndex = (i / 3) * 3 + (j / 3)

            IF num in rows[i] OR num in cols[j] OR num in boxes[boxIndex]:
                RETURN false

            rows[i].add(num)
            cols[j].add(num)
            boxes[boxIndex].add(num)

    RETURN true

Example Box Index Calculation:
- Cell (0,0): box = (0/3)*3 + 0/3 = 0
- Cell (0,5): box = (0/3)*3 + 5/3 = 1
- Cell (4,4): box = (4/3)*3 + 4/3 = 4
- Cell (8,8): box = (8/3)*3 + 8/3 = 8`,
      code: {
        java: {
          starterCode: `public boolean isValidSudoku(char[][] board) {
    // Write your code here

}`,
          solution: `// Approach: HashSet - O(1) time (constant 81 cells), O(1) space
public boolean isValidSudoku(char[][] board) {
    Set<String> seen = new HashSet<>();

    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            char current = board[i][j];

            if (current != '.') {
                // Check row, column, and box
                if (!seen.add(current + " in row " + i) ||
                    !seen.add(current + " in col " + j) ||
                    !seen.add(current + " in box " + i/3 + "-" + j/3)) {
                    return false;
                }
            }
        }
    }

    return true;
}

// Alternative approach with separate sets
public boolean isValidSudoku(char[][] board) {
    Set<Integer>[] rows = new HashSet[9];
    Set<Integer>[] cols = new HashSet[9];
    Set<Integer>[] boxes = new HashSet[9];

    for (int i = 0; i < 9; i++) {
        rows[i] = new HashSet<>();
        cols[i] = new HashSet<>();
        boxes[i] = new HashSet<>();
    }

    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            if (board[i][j] == '.') continue;

            int num = board[i][j] - '0';
            int boxIndex = (i / 3) * 3 + j / 3;

            if (rows[i].contains(num) ||
                cols[j].contains(num) ||
                boxes[boxIndex].contains(num)) {
                return false;
            }

            rows[i].add(num);
            cols[j].add(num);
            boxes[boxIndex].add(num);
        }
    }

    return true;
}`
        },
        python: {
          starterCode: `def isValidSudoku(self, board: List[List[str]]) -> bool:
    # Write your code here
    pass`,
          solution: `# Approach: HashSet - O(1) time (constant 81 cells), O(1) space
def isValidSudoku(self, board: List[List[str]]) -> bool:
    seen = set()

    for i in range(9):
        for j in range(9):
            current = board[i][j]

            if current != '.':
                # Check row, column, and box
                row_key = f"{current} in row {i}"
                col_key = f"{current} in col {j}"
                box_key = f"{current} in box {i//3}-{j//3}"

                if row_key in seen or col_key in seen or box_key in seen:
                    return False

                seen.add(row_key)
                seen.add(col_key)
                seen.add(box_key)

    return True

# Alternative approach with separate sets
def isValidSudoku(self, board: List[List[str]]) -> bool:
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]

    for i in range(9):
        for j in range(9):
            if board[i][j] == '.':
                continue

            num = int(board[i][j])
            box_index = (i // 3) * 3 + j // 3

            if num in rows[i] or num in cols[j] or num in boxes[box_index]:
                return False

            rows[i].add(num)
            cols[j].add(num)
            boxes[box_index].add(num)

    return True`
        }
      },
      testCases: [
        { board: 'example1', expected: true },
        { board: 'example2', expected: false }
      ],
      examples: [
        { input: 'board = [["5","3",".",".","7",".",".",".","."]...]', output: 'true' },
        { input: 'board = [["8","3",".",".","7",".",".",".","."]...]', output: 'false', explanation: 'Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8s in the top left 3x3 sub-box, it is invalid.' }
      ]
    },
    {
      id: 5,
      title: 'Two Sum',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
      explanation: `**Problem:** Find two numbers in an array that add up to a target value and return their indices.

**Key Insight:** Use a HashMap to store numbers we've seen and their indices. For each number, check if (target - current number) exists in the map.

**Approach: HashMap for Complement Lookup**
1. Create a HashMap to store value -> index mapping
2. For each number at index i:
   - Calculate complement = target - nums[i]
   - If complement exists in map, we found the pair
   - Return [map.get(complement), i]
3. If not found, add current number and index to map
4. Continue until pair is found

**Why This Works:**
- We need two numbers that sum to target: a + b = target
- If we've seen 'a' before, we store it in the map
- When we encounter 'b', we look for (target - b) which equals 'a'
- HashMap provides O(1) lookup time

**Complexity:** Time O(n), Space O(n)`,
      pseudocode: `ALGORITHM TwoSum(nums, target):
    map = HashMap<Integer, Integer>()  // value -> index

    FOR i FROM 0 TO nums.length - 1:
        complement = target - nums[i]

        IF complement in map:
            RETURN [map[complement], i]

        map[nums[i]] = i

    RETURN []  // No solution found (shouldn't happen per problem constraints)

Example: nums = [2, 7, 11, 15], target = 9
- i=0, num=2: complement=7, map={}, add 2 -> map={2:0}
- i=1, num=7: complement=2, found in map at index 0
- RETURN [0, 1]

Example: nums = [3, 2, 4], target = 6
- i=0, num=3: complement=3, map={}, add 3 -> map={3:0}
- i=1, num=2: complement=4, not in map, add 2 -> map={3:0, 2:1}
- i=2, num=4: complement=2, found in map at index 1
- RETURN [1, 2]`,
      code: {
        java: {
          starterCode: `public int[] twoSum(int[] nums, int target) {
    // Write your code here

}`,
          solution: `// Approach: HashMap - O(n) time, O(n) space
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();

    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];

        // Check if complement exists in map
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }

        // Store current number and its index
        map.put(nums[i], i);
    }

    return new int[] {}; // No solution found
}`
        },
        python: {
          starterCode: `def twoSum(self, nums: List[int], target: int) -> List[int]:
    # Write your code here
    pass`,
          solution: `# Approach: HashMap - O(n) time, O(n) space
def twoSum(self, nums: List[int], target: int) -> List[int]:
    num_map = {}

    for i, num in enumerate(nums):
        complement = target - num

        # Check if complement exists in map
        if complement in num_map:
            return [num_map[complement], i]

        # Store current number and its index
        num_map[num] = i

    return []  # No solution found`
        }
      },
      testCases: [
        { nums: [2,7,11,15], target: 9, expected: [0,1] },
        { nums: [3,2,4], target: 6, expected: [1,2] },
        { nums: [3,3], target: 6, expected: [0,1] }
      ],
      examples: [
        { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
        { input: 'nums = [3,2,4], target = 6', output: '[1,2]' },
        { input: 'nums = [3,3], target = 6', output: '[0,1]' }
      ]
    },
    {
      id: 6,
      title: 'Valid Anagram',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/',
      description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.',
      explanation: `**Problem:** Determine if two strings are anagrams (contain same characters with same frequencies).

**Key Insight:** Anagrams have identical character frequencies. Use a HashMap or character count array to track frequencies.

**Approach 1: HashMap for Character Counts**
1. If lengths differ, return false immediately
2. Count character frequencies in first string using HashMap
3. Decrement counts while iterating through second string
4. If any count goes negative or character not found, return false
5. If all counts reach zero, strings are anagrams

**Approach 2: Sorting (Less Efficient)**
1. Sort both strings
2. Compare if sorted strings are equal
3. Time: O(n log n) vs HashMap O(n)

**Approach 3: Character Array (For lowercase letters only)**
1. Use int[26] array for 'a'-'z'
2. Increment for first string, decrement for second
3. Check if all counts are zero

**Complexity:** HashMap: O(n) time, O(n) space; Sorting: O(n log n) time, O(1) space`,
      pseudocode: `ALGORITHM IsAnagram(s, t):
    IF s.length != t.length:
        RETURN false

    // Approach 1: HashMap
    count = HashMap<Character, Integer>()

    // Count characters in s
    FOR each char in s:
        count[char] = count.getOrDefault(char, 0) + 1

    // Decrement counts using t
    FOR each char in t:
        IF char not in count:
            RETURN false
        count[char]--
        IF count[char] < 0:
            RETURN false

    RETURN true

ALGORITHM IsAnagramArray(s, t):
    // Approach 2: For lowercase letters only
    IF s.length != t.length:
        RETURN false

    count = array[26] filled with 0

    FOR i FROM 0 TO s.length - 1:
        count[s[i] - 'a']++
        count[t[i] - 'a']--

    FOR each value in count:
        IF value != 0:
            RETURN false

    RETURN true

Example: s = "anagram", t = "nagaram"
Count for s: {a:3, n:1, g:1, r:1, m:1}
After processing t: all counts become 0
Result: true

Example: s = "rat", t = "car"
Count for s: {r:1, a:1, t:1}
After 'c': 'c' not in map
Result: false`,
      code: {
        java: {
          starterCode: `public boolean isAnagram(String s, String t) {
    // Write your code here

}`,
          solution: `// Approach 1: HashMap - O(n) time, O(n) space
public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) {
        return false;
    }

    Map<Character, Integer> count = new HashMap<>();

    // Count characters in s
    for (char c : s.toCharArray()) {
        count.put(c, count.getOrDefault(c, 0) + 1);
    }

    // Decrement counts using t
    for (char c : t.toCharArray()) {
        if (!count.containsKey(c)) {
            return false;
        }
        count.put(c, count.get(c) - 1);
        if (count.get(c) < 0) {
            return false;
        }
    }

    return true;
}

// Approach 2: Character Array (for lowercase only) - O(n) time, O(1) space
public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) {
        return false;
    }

    int[] count = new int[26];

    for (int i = 0; i < s.length(); i++) {
        count[s.charAt(i) - 'a']++;
        count[t.charAt(i) - 'a']--;
    }

    for (int c : count) {
        if (c != 0) {
            return false;
        }
    }

    return true;
}`
        },
        python: {
          starterCode: `def isAnagram(self, s: str, t: str) -> bool:
    # Write your code here
    pass`,
          solution: `# Approach 1: HashMap using Counter - O(n) time, O(n) space
from collections import Counter

def isAnagram(self, s: str, t: str) -> bool:
    return Counter(s) == Counter(t)

# Approach 2: Manual HashMap - O(n) time, O(n) space
def isAnagram(self, s: str, t: str) -> bool:
    if len(s) != len(t):
        return False

    count = {}

    # Count characters in s
    for c in s:
        count[c] = count.get(c, 0) + 1

    # Decrement counts using t
    for c in t:
        if c not in count:
            return False
        count[c] -= 1
        if count[c] < 0:
            return False

    return True

# Approach 3: Sorting - O(n log n) time, O(1) space
def isAnagram(self, s: str, t: str) -> bool:
    return sorted(s) == sorted(t)`
        }
      },
      testCases: [
        { s: 'anagram', t: 'nagaram', expected: true },
        { s: 'rat', t: 'car', expected: false }
      ],
      examples: [
        { input: 's = "anagram", t = "nagaram"', output: 'true' },
        { input: 's = "rat", t = "car"', output: 'false' }
      ]
    },
    {
      id: 7,
      title: 'Ransom Note',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/ransom-note/',
      description: 'Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise. Each letter in magazine can only be used once in ransomNote.',
      explanation: `**Problem:** Check if ransomNote can be constructed using characters from magazine (each character used at most once).

**Key Insight:** We need to verify that magazine has at least as many of each character as ransomNote requires. Use a HashMap or character array to count available characters.

**Approach 1: HashMap Character Count**
1. Count all character frequencies in magazine
2. For each character in ransomNote:
   - Check if character exists in map with count > 0
   - If not, return false
   - Decrement the count
3. If all characters found with sufficient counts, return true

**Approach 2: Character Array (For lowercase only)**
1. Use int[26] to count magazine characters
2. Decrement for each ransomNote character
3. If any count goes negative, return false

**Edge Cases:**
- Empty ransomNote: always true
- Magazine shorter than ransomNote: might still be true if all needed chars present
- Repeated characters in ransomNote

**Complexity:** Time O(m + n) where m=magazine.length, n=ransomNote.length, Space O(1) for array or O(k) for HashMap where k=unique chars`,
      pseudocode: `ALGORITHM CanConstruct(ransomNote, magazine):
    // Approach 1: Character Array
    IF ransomNote is empty:
        RETURN true

    count = array[26] filled with 0

    // Count available characters in magazine
    FOR each char in magazine:
        count[char - 'a']++

    // Check if we can construct ransomNote
    FOR each char in ransomNote:
        count[char - 'a']--
        IF count[char - 'a'] < 0:
            RETURN false

    RETURN true

ALGORITHM CanConstructHashMap(ransomNote, magazine):
    // Approach 2: HashMap
    charCount = HashMap<Character, Integer>()

    // Count magazine characters
    FOR each char in magazine:
        charCount[char] = charCount.getOrDefault(char, 0) + 1

    // Try to construct ransomNote
    FOR each char in ransomNote:
        IF char not in charCount OR charCount[char] == 0:
            RETURN false
        charCount[char]--

    RETURN true

Example: ransomNote = "aa", magazine = "aab"
Magazine count: {a:2, b:1}
- Need 'a': count=2, decrement -> 1
- Need 'a': count=1, decrement -> 0
Result: true

Example: ransomNote = "aa", magazine = "ab"
Magazine count: {a:1, b:1}
- Need 'a': count=1, decrement -> 0
- Need 'a': count=0, can't provide
Result: false`,
      code: {
        java: {
          starterCode: `public boolean canConstruct(String ransomNote, String magazine) {
    // Write your code here

}`,
          solution: `// Approach 1: Character Array - O(m + n) time, O(1) space
public boolean canConstruct(String ransomNote, String magazine) {
    if (ransomNote.length() > magazine.length()) {
        return false;
    }

    int[] count = new int[26];

    // Count available characters in magazine
    for (char c : magazine.toCharArray()) {
        count[c - 'a']++;
    }

    // Check if we can construct ransomNote
    for (char c : ransomNote.toCharArray()) {
        count[c - 'a']--;
        if (count[c - 'a'] < 0) {
            return false;
        }
    }

    return true;
}

// Approach 2: HashMap - O(m + n) time, O(k) space
public boolean canConstruct(String ransomNote, String magazine) {
    Map<Character, Integer> charCount = new HashMap<>();

    // Count magazine characters
    for (char c : magazine.toCharArray()) {
        charCount.put(c, charCount.getOrDefault(c, 0) + 1);
    }

    // Try to construct ransomNote
    for (char c : ransomNote.toCharArray()) {
        if (!charCount.containsKey(c) || charCount.get(c) == 0) {
            return false;
        }
        charCount.put(c, charCount.get(c) - 1);
    }

    return true;
}`
        },
        python: {
          starterCode: `def canConstruct(self, ransomNote: str, magazine: str) -> bool:
    # Write your code here
    pass`,
          solution: `# Approach 1: Counter - O(m + n) time, O(k) space
from collections import Counter

def canConstruct(self, ransomNote: str, magazine: str) -> bool:
    ransom_count = Counter(ransomNote)
    magazine_count = Counter(magazine)

    # Check if magazine has enough of each character
    for char, count in ransom_count.items():
        if magazine_count[char] < count:
            return False

    return True

# Approach 2: Manual counting - O(m + n) time, O(k) space
def canConstruct(self, ransomNote: str, magazine: str) -> bool:
    if len(ransomNote) > len(magazine):
        return False

    char_count = {}

    # Count magazine characters
    for c in magazine:
        char_count[c] = char_count.get(c, 0) + 1

    # Try to construct ransomNote
    for c in ransomNote:
        if c not in char_count or char_count[c] == 0:
            return False
        char_count[c] -= 1

    return True

# Approach 3: Using Counter subtraction
from collections import Counter

def canConstruct(self, ransomNote: str, magazine: str) -> bool:
    # Subtract counters and check if all values are <= 0
    return not (Counter(ransomNote) - Counter(magazine))`
        }
      },
      testCases: [
        { ransomNote: 'a', magazine: 'b', expected: false },
        { ransomNote: 'aa', magazine: 'ab', expected: false },
        { ransomNote: 'aa', magazine: 'aab', expected: true }
      ],
      examples: [
        { input: 'ransomNote = "a", magazine = "b"', output: 'false' },
        { input: 'ransomNote = "aa", magazine = "ab"', output: 'false' },
        { input: 'ransomNote = "aa", magazine = "aab"', output: 'true' }
      ]
    },
    {
      id: 8,
      title: 'Isomorphic Strings',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/isomorphic-strings/',
      description: 'Given two strings s and t, determine if they are isomorphic. Two strings s and t are isomorphic if the characters in s can be replaced to get t. All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.',
      explanation: `**Problem:** Check if two strings are isomorphic (one-to-one character mapping exists).

**Key Insight:** We need a bijective (one-to-one and onto) mapping between characters. Use two HashMaps to ensure:
1. Each character in s maps to exactly one character in t
2. Each character in t maps to exactly one character in s (prevent multiple s chars mapping to same t char)

**Approach: Two HashMaps**
1. Create map s_to_t (s character -> t character mapping)
2. Create map t_to_s (t character -> s character mapping)
3. For each position i:
   - If s[i] already mapped, check if it maps to t[i]
   - If t[i] already mapped, check if it maps to s[i]
   - If either check fails, return false
   - Otherwise, establish both mappings
4. If all checks pass, strings are isomorphic

**Why Two Maps?**
- One map alone isn't enough: "badc" and "baba" would pass with one map
- 'b'->b, 'a'->a, 'd'->b (collision! 'b' and 'd' both map to 'b')
- Second map catches this: when we see second 'b' in t, it already maps to 'b' in s, not 'd'

**Complexity:** Time O(n), Space O(k) where k = unique characters`,
      pseudocode: `ALGORITHM IsIsomorphic(s, t):
    IF s.length != t.length:
        RETURN false

    s_to_t = HashMap<Character, Character>()
    t_to_s = HashMap<Character, Character>()

    FOR i FROM 0 TO s.length - 1:
        charS = s[i]
        charT = t[i]

        // Check s -> t mapping
        IF charS in s_to_t:
            IF s_to_t[charS] != charT:
                RETURN false
        ELSE:
            s_to_t[charS] = charT

        // Check t -> s mapping
        IF charT in t_to_s:
            IF t_to_s[charT] != charS:
                RETURN false
        ELSE:
            t_to_s[charT] = charS

    RETURN true

Example: s = "egg", t = "add"
- i=0: 'e'->'a', 'a'->'e' ✓
- i=1: 'g'->'d', 'd'->'g' ✓
- i=2: 'g'->'d' (already mapped correctly) ✓
Result: true

Example: s = "foo", t = "bar"
- i=0: 'f'->'b', 'b'->'f' ✓
- i=1: 'o'->'a', 'a'->'o' ✓
- i=2: 'o' should map to 'a', but we see 'r' ✗
Result: false

Example: s = "badc", t = "baba"
- i=0: 'b'->'b', 'b'->'b' ✓
- i=1: 'a'->'a', 'a'->'a' ✓
- i=2: 'd'->'b', but 'b' already maps to 'b' in s, not 'd' ✗
Result: false`,
      code: {
        java: {
          starterCode: `public boolean isIsomorphic(String s, String t) {
    // Write your code here

}`,
          solution: `// Approach: Two HashMaps - O(n) time, O(k) space
public boolean isIsomorphic(String s, String t) {
    if (s.length() != t.length()) {
        return false;
    }

    Map<Character, Character> s_to_t = new HashMap<>();
    Map<Character, Character> t_to_s = new HashMap<>();

    for (int i = 0; i < s.length(); i++) {
        char charS = s.charAt(i);
        char charT = t.charAt(i);

        // Check s -> t mapping
        if (s_to_t.containsKey(charS)) {
            if (s_to_t.get(charS) != charT) {
                return false;
            }
        } else {
            s_to_t.put(charS, charT);
        }

        // Check t -> s mapping
        if (t_to_s.containsKey(charT)) {
            if (t_to_s.get(charT) != charS) {
                return false;
            }
        } else {
            t_to_s.put(charT, charS);
        }
    }

    return true;
}

// Alternative: Using arrays for ASCII characters - O(n) time, O(1) space
public boolean isIsomorphic(String s, String t) {
    int[] s_to_t = new int[256];
    int[] t_to_s = new int[256];
    Arrays.fill(s_to_t, -1);
    Arrays.fill(t_to_s, -1);

    for (int i = 0; i < s.length(); i++) {
        char charS = s.charAt(i);
        char charT = t.charAt(i);

        if (s_to_t[charS] == -1 && t_to_s[charT] == -1) {
            s_to_t[charS] = charT;
            t_to_s[charT] = charS;
        } else if (s_to_t[charS] != charT || t_to_s[charT] != charS) {
            return false;
        }
    }

    return true;
}`
        },
        python: {
          starterCode: `def isIsomorphic(self, s: str, t: str) -> bool:
    # Write your code here
    pass`,
          solution: `# Approach: Two HashMaps - O(n) time, O(k) space
def isIsomorphic(self, s: str, t: str) -> bool:
    if len(s) != len(t):
        return False

    s_to_t = {}
    t_to_s = {}

    for char_s, char_t in zip(s, t):
        # Check s -> t mapping
        if char_s in s_to_t:
            if s_to_t[char_s] != char_t:
                return False
        else:
            s_to_t[char_s] = char_t

        # Check t -> s mapping
        if char_t in t_to_s:
            if t_to_s[char_t] != char_s:
                return False
        else:
            t_to_s[char_t] = char_s

    return True

# Alternative: One-liner using set lengths
def isIsomorphic(self, s: str, t: str) -> bool:
    # If isomorphic, the number of unique chars, unique mappings,
    # and unique reverse mappings should all be equal
    return len(set(zip(s, t))) == len(set(s)) == len(set(t))`
        }
      },
      testCases: [
        { s: 'egg', t: 'add', expected: true },
        { s: 'foo', t: 'bar', expected: false },
        { s: 'paper', t: 'title', expected: true }
      ],
      examples: [
        { input: 's = "egg", t = "add"', output: 'true' },
        { input: 's = "foo", t = "bar"', output: 'false' },
        { input: 's = "paper", t = "title"', output: 'true' }
      ]
    },
    {
      id: 9,
      title: 'Word Pattern',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/word-pattern/',
      description: 'Given a pattern and a string s, find if s follows the same pattern. Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.',
      explanation: `**Problem:** Check if a string follows a pattern where each pattern character maps to a unique word (bijective mapping).

**Key Insight:** Similar to Isomorphic Strings, but mapping pattern characters to words. Need two HashMaps to ensure one-to-one correspondence.

**Approach: Two HashMaps**
1. Split string s into words
2. Check if number of pattern chars equals number of words (must match)
3. Create pattern_to_word map and word_to_pattern map
4. For each position i:
   - Check if pattern[i] maps to words[i] consistently
   - Check if words[i] maps to pattern[i] consistently
   - If either fails, return false
5. If all mappings valid, return true

**Key Differences from Isomorphic Strings:**
- Mapping characters to words (not char to char)
- Must handle word boundaries (split by space)
- Length check: pattern.length should equal words.length

**Edge Cases:**
- Different number of pattern chars and words: false
- Same pattern char mapping to different words: false
- Different pattern chars mapping to same word: false

**Complexity:** Time O(n + m) where n = pattern length, m = total characters in s, Space O(w) where w = number of words`,
      pseudocode: `ALGORITHM WordPattern(pattern, s):
    words = split s by spaces

    IF pattern.length != words.length:
        RETURN false

    pattern_to_word = HashMap<Character, String>()
    word_to_pattern = HashMap<String, Character>()

    FOR i FROM 0 TO pattern.length - 1:
        char = pattern[i]
        word = words[i]

        // Check pattern -> word mapping
        IF char in pattern_to_word:
            IF pattern_to_word[char] != word:
                RETURN false
        ELSE:
            pattern_to_word[char] = word

        // Check word -> pattern mapping
        IF word in word_to_pattern:
            IF word_to_pattern[word] != char:
                RETURN false
        ELSE:
            word_to_pattern[word] = char

    RETURN true

Example: pattern = "abba", s = "dog cat cat dog"
words = ["dog", "cat", "cat", "dog"]
- i=0: 'a'->'dog', 'dog'->'a' ✓
- i=1: 'b'->'cat', 'cat'->'b' ✓
- i=2: 'b'->'cat' (consistent), 'cat'->'b' (consistent) ✓
- i=3: 'a'->'dog' (consistent), 'dog'->'a' (consistent) ✓
Result: true

Example: pattern = "abba", s = "dog cat cat fish"
words = ["dog", "cat", "cat", "fish"]
- i=0: 'a'->'dog', 'dog'->'a' ✓
- i=1: 'b'->'cat', 'cat'->'b' ✓
- i=2: 'b'->'cat' (consistent) ✓
- i=3: 'a' should map to 'dog', but we see 'fish' ✗
Result: false

Example: pattern = "aaaa", s = "dog cat cat dog"
words = ["dog", "cat", "cat", "dog"]
- i=0: 'a'->'dog', 'dog'->'a' ✓
- i=1: 'a' should map to 'dog', but we see 'cat' ✗
Result: false`,
      code: {
        java: {
          starterCode: `public boolean wordPattern(String pattern, String s) {
    // Write your code here

}`,
          solution: `// Approach: Two HashMaps - O(n + m) time, O(w) space
public boolean wordPattern(String pattern, String s) {
    String[] words = s.split(" ");

    // Pattern length must equal number of words
    if (pattern.length() != words.length) {
        return false;
    }

    Map<Character, String> pattern_to_word = new HashMap<>();
    Map<String, Character> word_to_pattern = new HashMap<>();

    for (int i = 0; i < pattern.length(); i++) {
        char c = pattern.charAt(i);
        String word = words[i];

        // Check pattern -> word mapping
        if (pattern_to_word.containsKey(c)) {
            if (!pattern_to_word.get(c).equals(word)) {
                return false;
            }
        } else {
            pattern_to_word.put(c, word);
        }

        // Check word -> pattern mapping
        if (word_to_pattern.containsKey(word)) {
            if (word_to_pattern.get(word) != c) {
                return false;
            }
        } else {
            word_to_pattern.put(word, c);
        }
    }

    return true;
}`
        },
        python: {
          starterCode: `def wordPattern(self, pattern: str, s: str) -> bool:
    # Write your code here
    pass`,
          solution: `# Approach: Two HashMaps - O(n + m) time, O(w) space
def wordPattern(self, pattern: str, s: str) -> bool:
    words = s.split()

    # Pattern length must equal number of words
    if len(pattern) != len(words):
        return False

    pattern_to_word = {}
    word_to_pattern = {}

    for char, word in zip(pattern, words):
        # Check pattern -> word mapping
        if char in pattern_to_word:
            if pattern_to_word[char] != word:
                return False
        else:
            pattern_to_word[char] = word

        # Check word -> pattern mapping
        if word in word_to_pattern:
            if word_to_pattern[word] != char:
                return False
        else:
            word_to_pattern[word] = char

    return True

# Alternative: One-liner using set lengths
def wordPattern(self, pattern: str, s: str) -> bool:
    words = s.split()
    return (len(pattern) == len(words) and
            len(set(zip(pattern, words))) == len(set(pattern)) == len(set(words)))`
        }
      },
      testCases: [
        { pattern: 'abba', s: 'dog cat cat dog', expected: true },
        { pattern: 'abba', s: 'dog cat cat fish', expected: false },
        { pattern: 'aaaa', s: 'dog cat cat dog', expected: false }
      ],
      examples: [
        { input: 'pattern = "abba", s = "dog cat cat dog"', output: 'true' },
        { input: 'pattern = "abba", s = "dog cat cat fish"', output: 'false' },
        { input: 'pattern = "aaaa", s = "dog cat cat dog"', output: 'false' }
      ]
    },
    {
      id: 10,
      title: 'Happy Number',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/happy-number/',
      description: 'Write an algorithm to determine if a number n is happy. A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits. Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy.',
      explanation: `**Problem:** Determine if repeatedly summing squares of digits eventually reaches 1 or enters a cycle.

**Key Insight:** If we encounter a number we've seen before, we're in a cycle and won't reach 1. Use a HashSet to detect cycles.

**Approach 1: HashSet to Detect Cycles**
1. Use a HashSet to track numbers we've seen
2. While n != 1 and n not in seen set:
   - Add n to seen set
   - Calculate sum of squares of digits
   - Update n to this sum
3. If n == 1, it's happy; otherwise we detected a cycle

**Approach 2: Floyd's Cycle Detection (Two Pointers)**
1. Use slow and fast pointers (like linked list cycle detection)
2. Slow moves one step: getNext(slow)
3. Fast moves two steps: getNext(getNext(fast))
4. If they meet and value is 1, it's happy
5. If they meet at non-1 value, there's a cycle (not happy)
6. Space: O(1) vs HashSet's O(n)

**Helper Function:**
- getNext(n): Calculate sum of squares of digits

**Complexity:** HashSet: O(log n) time, O(log n) space; Floyd's: O(log n) time, O(1) space`,
      pseudocode: `ALGORITHM GetNext(n):
    sum = 0
    WHILE n > 0:
        digit = n % 10
        sum += digit * digit
        n = n / 10
    RETURN sum

ALGORITHM IsHappyHashSet(n):
    seen = HashSet<Integer>()

    WHILE n != 1 AND n not in seen:
        seen.add(n)
        n = GetNext(n)

    RETURN n == 1

ALGORITHM IsHappyFloyd(n):
    slow = n
    fast = GetNext(n)

    // Find cycle using Floyd's algorithm
    WHILE fast != 1 AND slow != fast:
        slow = GetNext(slow)
        fast = GetNext(GetNext(fast))

    RETURN fast == 1

Example: n = 19
- 19 → 1² + 9² = 1 + 81 = 82
- 82 → 8² + 2² = 64 + 4 = 68
- 68 → 6² + 8² = 36 + 64 = 100
- 100 → 1² + 0² + 0² = 1 ✓
Result: true

Example: n = 2
- 2 → 2² = 4
- 4 → 4² = 16
- 16 → 1² + 6² = 1 + 36 = 37
- 37 → 3² + 7² = 9 + 49 = 58
- 58 → 5² + 8² = 25 + 64 = 89
- 89 → 8² + 9² = 64 + 81 = 145
- 145 → 1² + 4² + 5² = 1 + 16 + 25 = 42
- 42 → 4² + 2² = 16 + 4 = 20
- 20 → 2² + 0² = 4 (seen before, cycle detected) ✗
Result: false`,
      code: {
        java: {
          starterCode: `public boolean isHappy(int n) {
    // Write your code here

}`,
          solution: `// Approach 1: HashSet - O(log n) time, O(log n) space
public boolean isHappy(int n) {
    Set<Integer> seen = new HashSet<>();

    while (n != 1 && !seen.contains(n)) {
        seen.add(n);
        n = getNext(n);
    }

    return n == 1;
}

private int getNext(int n) {
    int sum = 0;
    while (n > 0) {
        int digit = n % 10;
        sum += digit * digit;
        n /= 10;
    }
    return sum;
}

// Approach 2: Floyd's Cycle Detection - O(log n) time, O(1) space
public boolean isHappy(int n) {
    int slow = n;
    int fast = getNext(n);

    while (fast != 1 && slow != fast) {
        slow = getNext(slow);
        fast = getNext(getNext(fast));
    }

    return fast == 1;
}

private int getNext(int n) {
    int sum = 0;
    while (n > 0) {
        int digit = n % 10;
        sum += digit * digit;
        n /= 10;
    }
    return sum;
}`
        },
        python: {
          starterCode: `def isHappy(self, n: int) -> bool:
    # Write your code here
    pass`,
          solution: `# Approach 1: HashSet - O(log n) time, O(log n) space
def isHappy(self, n: int) -> bool:
    def get_next(num):
        total = 0
        while num > 0:
            digit = num % 10
            total += digit * digit
            num //= 10
        return total

    seen = set()

    while n != 1 and n not in seen:
        seen.add(n)
        n = get_next(n)

    return n == 1

# Approach 2: Floyd's Cycle Detection - O(log n) time, O(1) space
def isHappy(self, n: int) -> bool:
    def get_next(num):
        total = 0
        while num > 0:
            digit = num % 10
            total += digit * digit
            num //= 10
        return total

    slow = n
    fast = get_next(n)

    while fast != 1 and slow != fast:
        slow = get_next(slow)
        fast = get_next(get_next(fast))

    return fast == 1`
        }
      },
      testCases: [
        { n: 19, expected: true },
        { n: 2, expected: false }
      ],
      examples: [
        { input: 'n = 19', output: 'true', explanation: '1² + 9² = 82, 8² + 2² = 68, 6² + 8² = 100, 1² + 0² + 0² = 1' },
        { input: 'n = 2', output: 'false' }
      ]
    },
    {
      id: 11,
      title: 'Contains Duplicate II',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate-ii/',
      description: 'Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.',
      explanation: `**Problem:** Find if there exist duplicate elements within a window of size k.

**Key Insight:** Use a HashMap to track the most recent index of each number. When we see a number again, check if the distance between current index and stored index is <= k.

**Approach 1: HashMap (Value -> Last Index)**
1. Create HashMap to store number -> most recent index
2. For each element at index i:
   - If number exists in map AND (i - map[num]) <= k:
     - Found duplicate within window, return true
   - Update map[num] = i (store current index)
3. If no such pair found, return false

**Approach 2: Sliding Window with HashSet**
1. Maintain a HashSet of size at most k+1
2. For each element:
   - If element in set, found duplicate within window
   - Add element to set
   - If set size > k, remove element at index (i-k)
3. More intuitive but similar performance

**Why HashMap is Better:**
- HashMap: Store only most recent index per number
- HashSet: Need to carefully manage window boundaries
- Both are O(n) time, but HashMap is cleaner

**Complexity:** Time O(n), Space O(min(n, k))`,
      pseudocode: `ALGORITHM ContainsNearbyDuplicate(nums, k):
    // Approach 1: HashMap
    indexMap = HashMap<Integer, Integer>()

    FOR i FROM 0 TO nums.length - 1:
        num = nums[i]

        // Check if we've seen this number recently
        IF num in indexMap:
            IF i - indexMap[num] <= k:
                RETURN true

        // Update most recent index
        indexMap[num] = i

    RETURN false

ALGORITHM ContainsNearbyDuplicateSlidingWindow(nums, k):
    // Approach 2: Sliding Window with HashSet
    window = HashSet<Integer>()

    FOR i FROM 0 TO nums.length - 1:
        // If number already in window, found duplicate
        IF nums[i] in window:
            RETURN true

        // Add to window
        window.add(nums[i])

        // Maintain window size <= k
        IF window.size() > k:
            window.remove(nums[i - k])

    RETURN false

Example: nums = [1,2,3,1], k = 3
- i=0: map={1:0}
- i=1: map={1:0, 2:1}
- i=2: map={1:0, 2:1, 3:2}
- i=3: 1 seen at 0, distance=3-0=3 <= 3 ✓
Result: true

Example: nums = [1,0,1,1], k = 1
- i=0: map={1:0}
- i=1: map={1:0, 0:1}
- i=2: 1 seen at 0, distance=2-0=2 > 1 ✗, map={1:2, 0:1}
- i=3: 1 seen at 2, distance=3-2=1 <= 1 ✓
Result: true

Example: nums = [1,2,3,1,2,3], k = 2
- i=0: map={1:0}
- i=1: map={1:0, 2:1}
- i=2: map={1:0, 2:1, 3:2}
- i=3: 1 seen at 0, distance=3-0=3 > 2 ✗, map={1:3, 2:1, 3:2}
- i=4: 2 seen at 1, distance=4-1=3 > 2 ✗, map={1:3, 2:4, 3:2}
- i=5: 3 seen at 2, distance=5-2=3 > 2 ✗
Result: false`,
      code: {
        java: {
          starterCode: `public boolean containsNearbyDuplicate(int[] nums, int k) {
    // Write your code here

}`,
          solution: `// Approach 1: HashMap - O(n) time, O(min(n,k)) space
public boolean containsNearbyDuplicate(int[] nums, int k) {
    Map<Integer, Integer> indexMap = new HashMap<>();

    for (int i = 0; i < nums.length; i++) {
        int num = nums[i];

        // Check if we've seen this number recently
        if (indexMap.containsKey(num)) {
            if (i - indexMap.get(num) <= k) {
                return true;
            }
        }

        // Update most recent index
        indexMap.put(num, i);
    }

    return false;
}

// Approach 2: Sliding Window with HashSet - O(n) time, O(min(n,k)) space
public boolean containsNearbyDuplicate(int[] nums, int k) {
    Set<Integer> window = new HashSet<>();

    for (int i = 0; i < nums.length; i++) {
        // If number already in window, found duplicate
        if (window.contains(nums[i])) {
            return true;
        }

        // Add to window
        window.add(nums[i]);

        // Maintain window size <= k
        if (window.size() > k) {
            window.remove(nums[i - k]);
        }
    }

    return false;
}`
        },
        python: {
          starterCode: `def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
    # Write your code here
    pass`,
          solution: `# Approach 1: HashMap - O(n) time, O(min(n,k)) space
def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
    index_map = {}

    for i, num in enumerate(nums):
        # Check if we've seen this number recently
        if num in index_map:
            if i - index_map[num] <= k:
                return True

        # Update most recent index
        index_map[num] = i

    return False

# Approach 2: Sliding Window with Set - O(n) time, O(min(n,k)) space
def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
    window = set()

    for i, num in enumerate(nums):
        # If number already in window, found duplicate
        if num in window:
            return True

        # Add to window
        window.add(num)

        # Maintain window size <= k
        if len(window) > k:
            window.remove(nums[i - k])

    return False`
        }
      },
      testCases: [
        { nums: [1,2,3,1], k: 3, expected: true },
        { nums: [1,0,1,1], k: 1, expected: true },
        { nums: [1,2,3,1,2,3], k: 2, expected: false }
      ],
      examples: [
        { input: 'nums = [1,2,3,1], k = 3', output: 'true' },
        { input: 'nums = [1,0,1,1], k = 1', output: 'true' },
        { input: 'nums = [1,2,3,1,2,3], k = 2', output: 'false' }
      ]
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Hash Tables-${q.id}`)).length
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
    const savedDrawing = localStorage.getItem(`drawing-HashTables-${question.id}`)
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
      ? [...breadcrumbStack.slice(0, -1), { name: 'Hash Tables', page: null }, { name: selectedQuestion.title, page: null }]
      : null

    // Fallback to legacy format
    const problemBreadcrumb = {
      ...breadcrumb,
      category: { name: 'Hash Tables', onClick: () => setSelectedQuestion(null) },
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
            ← Back to Hash Tables
          </button>
          <LanguageToggle />
        </div>

        <Breadcrumb
          breadcrumb={problemBreadcrumb}
          breadcrumbStack={problemBreadcrumbStack}
          onBreadcrumbClick={handleProblemBreadcrumbClick}
          colors={breadcrumbColors}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Problem Description */}
          <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', border: '1px solid #374151', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: 'white', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <CompletionCheckbox problemId={`Hash Tables-${selectedQuestion.id}`} />
              <BookmarkButton problemId={`HashTables-${selectedQuestion.id}`} problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'HashTables' }} />
            </div>

            {selectedQuestion.leetcodeUrl && (
              <a href={selectedQuestion.leetcodeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
                View on LeetCode ↗
              </a>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ backgroundColor: '#1f2937', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #374151' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'white' }}>Input:</strong> <code style={{ color: '#9ca3af' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: 'white' }}>Output:</strong> <code style={{ color: '#9ca3af' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem' }}>Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#9ca3af', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#1f2937', borderRadius: '8px', border: '1px solid #374151' }}>
                <h3 style={{ fontSize: '1rem', color: 'white', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', border: '1px solid #374151', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
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

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5', backgroundColor: '#1e293b', color: '#e2e8f0' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: 'white', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#1f2937', padding: '1rem', borderRadius: '8px', border: '1px solid #374151', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px', color: '#9ca3af' }}>{output}</pre>
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
            const savedDrawing = localStorage.getItem(`drawing-HashTables-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`HashTables-${selectedQuestion.id}`}
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
        colors={breadcrumbColors}
      />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem' }}>Hash Tables</h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>Master hash tables problems</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '1px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'white' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '1px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'white' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>{difficulty}</span>
                <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>({difficultyQuestions.length} problems)</span>
              </div>
              <span style={{ fontSize: '1.25rem', color: '#9ca3af' }}>{expandedSections[difficulty] ? '▼' : '▶'}</span>
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
                    style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '12px', border: isFocused ? '2px solid #3b82f6' : '1px solid #374151', cursor: 'pointer', transition: 'all 0.2s', outline: 'none' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`Hash Tables-${question.id}`} />
                        </div>
                        <BookmarkButton size="small" problemId={`HashTables-${question.id}`} problemData={{ title: question.title, difficulty: question.difficulty, category: 'HashTables' }} />
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

export default HashTables
