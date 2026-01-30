import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function Recursion({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb, breadcrumbStack, onBreadcrumbClick, pushBreadcrumb, breadcrumbColors }) {
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
      title: 'Generate Parentheses',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/generate-parentheses/',
      description: 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
      code: {
        java: {
          starterCode: `public List<String> generateParenthesis(int n) {
    // Write your code here

}`,
          solution: `// Approach: Backtracking - O(4^n / sqrt(n)) time, O(n) space
public List<String> generateParenthesis(int n) {
    List<String> result = new ArrayList<>();
    backtrack(result, "", 0, 0, n);
    return result;
}

private void backtrack(List<String> result, String current, int open, int close, int max) {
    if (current.length() == max * 2) {
        result.add(current);
        return;
    }

    if (open < max) {
        backtrack(result, current + "(", open + 1, close, max);
    }
    if (close < open) {
        backtrack(result, current + ")", open, close + 1, max);
    }
}

// Alternative: Using StringBuilder for efficiency
public List<String> generateParenthesis(int n) {
    List<String> result = new ArrayList<>();
    backtrack(result, new StringBuilder(), 0, 0, n);
    return result;
}

private void backtrack(List<String> result, StringBuilder sb, int open, int close, int max) {
    if (sb.length() == max * 2) {
        result.add(sb.toString());
        return;
    }

    if (open < max) {
        sb.append('(');
        backtrack(result, sb, open + 1, close, max);
        sb.deleteCharAt(sb.length() - 1);
    }
    if (close < open) {
        sb.append(')');
        backtrack(result, sb, open, close + 1, max);
        sb.deleteCharAt(sb.length() - 1);
    }
}`
        },
        python: {
          starterCode: `def generateParenthesis(self, n: int) -> List[str]:
    # Write your code here
    pass`,
          solution: `# Approach: Backtracking - O(4^n / sqrt(n)) time, O(n) space
def generateParenthesis(self, n: int) -> List[str]:
    result = []
    self._backtrack(result, "", 0, 0, n)
    return result

def _backtrack(self, result: List[str], current: str, open_count: int, close_count: int, max_pairs: int) -> None:
    if len(current) == max_pairs * 2:
        result.append(current)
        return

    if open_count < max_pairs:
        self._backtrack(result, current + "(", open_count + 1, close_count, max_pairs)
    if close_count < open_count:
        self._backtrack(result, current + ")", open_count, close_count + 1, max_pairs)

# Alternative: Using list for efficiency
def generateParenthesis(self, n: int) -> List[str]:
    result = []
    self._backtrack_list(result, [], 0, 0, n)
    return result

def _backtrack_list(self, result: List[str], current: List[str], open_count: int, close_count: int, max_pairs: int) -> None:
    if len(current) == max_pairs * 2:
        result.append("".join(current))
        return

    if open_count < max_pairs:
        current.append("(")
        self._backtrack_list(result, current, open_count + 1, close_count, max_pairs)
        current.pop()
    if close_count < open_count:
        current.append(")")
        self._backtrack_list(result, current, open_count, close_count + 1, max_pairs)
        current.pop()`
        }
      },
      testCases: [
        { n: 3, expected: ['((()))','(()())','(())()','()(())','()()()'] },
        { n: 1, expected: ['()'] }
      ],
      examples: [
        { input: 'n = 3', output: '["((()))","(()())","(())()","()(())","()()()"]' },
        { input: 'n = 1', output: '["()"]' }
      ],
      explanation: `**Problem:** Generate all valid combinations of n pairs of parentheses.

**Key Insight:** Use backtracking to build valid strings character by character. At each step, we can only add '(' or ')' if certain conditions are met.

**Valid Parentheses Rules:**
1. Can add '(' if we haven't used all n opening parentheses
2. Can add ')' only if close_count < open_count (ensures we don't close before opening)

**Backtracking Strategy:**
- Build string incrementally
- Track: open_count (number of '(' used), close_count (number of ')' used)
- Base case: When string length = 2n, we have a complete valid combination
- Choice 1: Add '(' if open_count < n
- Choice 2: Add ')' if close_count < open_count
- Backtrack by removing last character

**Why It Works:** By ensuring we never add ')' before a corresponding '(', we guarantee all combinations are valid.

**Complexity:** Time O(4^n / √n) - Catalan number, Space O(n) for recursion stack`,
      pseudocode: `function generateParenthesis(n):
    result = []
    backtrack(result, "", 0, 0, n)
    return result

function backtrack(result, current, open, close, max):
    // Base case: complete string
    if current.length == max * 2:
        result.add(current)
        return

    // Choice 1: Add opening parenthesis
    if open < max:
        backtrack(result, current + "(", open + 1, close, max)

    // Choice 2: Add closing parenthesis
    if close < open:
        backtrack(result, current + ")", open, close + 1, max)

Example: n = 2
- Start: current="", open=0, close=0
- Add '(': current="(", open=1, close=0
  - Add '(': current="((", open=2, close=0
    - Add ')': current="(()", open=2, close=1
      - Add ')': current="(())", open=2, close=2 ✓ Valid
  - Add ')': current="()", open=1, close=1
    - Add '(': current="()(", open=2, close=1
      - Add ')': current="()()", open=2, close=2 ✓ Valid
- Result: ["(())", "()()"]`
    },
    {
      id: 2,
      title: 'Permutations',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/permutations/',
      description: 'Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.',
      code: {
        java: {
          starterCode: `public List<List<Integer>> permute(int[] nums) {
    // Write your code here

}`,
          solution: `// Approach: Backtracking - O(n * n!) time, O(n) space
public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(result, new ArrayList<>(), nums);
    return result;
}

private void backtrack(List<List<Integer>> result, List<Integer> current, int[] nums) {
    if (current.size() == nums.length) {
        result.add(new ArrayList<>(current));
        return;
    }

    for (int num : nums) {
        if (current.contains(num)) continue;
        current.add(num);
        backtrack(result, current, nums);
        current.remove(current.size() - 1);
    }
}

// Alternative: Using boolean array for visited tracking
public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    boolean[] used = new boolean[nums.length];
    backtrack(result, new ArrayList<>(), nums, used);
    return result;
}

private void backtrack(List<List<Integer>> result, List<Integer> current,
                       int[] nums, boolean[] used) {
    if (current.size() == nums.length) {
        result.add(new ArrayList<>(current));
        return;
    }

    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        used[i] = true;
        current.add(nums[i]);
        backtrack(result, current, nums, used);
        current.remove(current.size() - 1);
        used[i] = false;
    }
}`
        },
        python: {
          starterCode: `def permute(self, nums: List[int]) -> List[List[int]]:
    # Write your code here
    pass`,
          solution: `# Approach: Backtracking - O(n * n!) time, O(n) space
def permute(self, nums: List[int]) -> List[List[int]]:
    result = []
    self._backtrack(result, [], nums)
    return result

def _backtrack(self, result: List[List[int]], current: List[int], nums: List[int]) -> None:
    if len(current) == len(nums):
        result.append(current[:])  # Append a copy
        return

    for num in nums:
        if num in current:
            continue
        current.append(num)
        self._backtrack(result, current, nums)
        current.pop()

# Alternative: Using set for visited tracking
def permute(self, nums: List[int]) -> List[List[int]]:
    result = []
    self._backtrack_set(result, [], set(), nums)
    return result

def _backtrack_set(self, result: List[List[int]], current: List[int], used: set, nums: List[int]) -> None:
    if len(current) == len(nums):
        result.append(current[:])
        return

    for i, num in enumerate(nums):
        if i in used:
            continue
        used.add(i)
        current.append(num)
        self._backtrack_set(result, current, used, nums)
        current.pop()
        used.remove(i)`
        }
      },
      testCases: [
        { nums: [1,2,3], expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] },
        { nums: [0,1], expected: [[0,1],[1,0]] },
        { nums: [1], expected: [[1]] }
      ],
      examples: [
        { input: 'nums = [1,2,3]', output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]' },
        { input: 'nums = [0,1]', output: '[[0,1],[1,0]]' },
        { input: 'nums = [1]', output: '[[1]]' }
      ],
      explanation: `**Problem:** Generate all possible permutations of an array of distinct integers.

**Key Insight:** Use backtracking to explore all possible orderings. At each position, try every unused element.

**Permutation Properties:**
- Total permutations of n elements = n!
- Each permutation is a different ordering of the same elements
- No duplicates in input, so all permutations are unique

**Backtracking Approach:**
1. Build permutation position by position
2. Track which elements are already used (visited array or contains check)
3. Base case: When current permutation length = n, add to result
4. For each position, try all unused elements
5. Mark element as used, recurse, then unmark (backtrack)

**Optimization:** Use boolean array instead of list.contains() for O(1) lookup vs O(n).

**Complexity:** Time O(n × n!) - n! permutations, each takes O(n) to create. Space O(n) for recursion stack`,
      pseudocode: `function permute(nums):
    result = []
    used = [false] * n
    backtrack(result, [], nums, used)
    return result

function backtrack(result, current, nums, used):
    // Base case: complete permutation
    if current.length == nums.length:
        result.add(current.copy())
        return

    // Try each element at current position
    for i in 0 to nums.length-1:
        if used[i]:
            continue  // Skip if already in current permutation

        // Choose
        current.add(nums[i])
        used[i] = true

        // Explore
        backtrack(result, current, nums, used)

        // Unchoose (backtrack)
        current.removeLast()
        used[i] = false

Example: nums = [1,2,3]
- Start: current=[], used=[F,F,F]
- Try 1: current=[1], used=[T,F,F]
  - Try 2: current=[1,2], used=[T,T,F]
    - Try 3: current=[1,2,3], used=[T,T,T] ✓ Add [1,2,3]
  - Try 3: current=[1,3], used=[T,F,T]
    - Try 2: current=[1,3,2], used=[T,T,T] ✓ Add [1,3,2]
- Try 2: current=[2]... (continues)
- Result: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`
    },
    {
      id: 3,
      title: 'Subsets',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/subsets/',
      description: 'Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.',
      code: {
        java: {
          starterCode: `public List<List<Integer>> subsets(int[] nums) {
    // Write your code here

}`,
          solution: `// Approach 1: Backtracking - O(n * 2^n) time, O(n) space
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(result, new ArrayList<>(), nums, 0);
    return result;
}

private void backtrack(List<List<Integer>> result, List<Integer> current,
                       int[] nums, int start) {
    result.add(new ArrayList<>(current));

    for (int i = start; i < nums.length; i++) {
        current.add(nums[i]);
        backtrack(result, current, nums, i + 1);
        current.remove(current.size() - 1);
    }
}

// Approach 2: Iterative - O(n * 2^n) time, O(1) space
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    result.add(new ArrayList<>());

    for (int num : nums) {
        int size = result.size();
        for (int i = 0; i < size; i++) {
            List<Integer> subset = new ArrayList<>(result.get(i));
            subset.add(num);
            result.add(subset);
        }
    }

    return result;
}`
        },
        python: {
          starterCode: `def subsets(self, nums: List[int]) -> List[List[int]]:
    # Write your code here
    pass`,
          solution: `# Approach 1: Backtracking - O(n * 2^n) time, O(n) space
def subsets(self, nums: List[int]) -> List[List[int]]:
    result = []
    self._backtrack(result, [], nums, 0)
    return result

def _backtrack(self, result: List[List[int]], current: List[int], nums: List[int], start: int) -> None:
    result.append(current[:])  # Append a copy

    for i in range(start, len(nums)):
        current.append(nums[i])
        self._backtrack(result, current, nums, i + 1)
        current.pop()

# Approach 2: Iterative - O(n * 2^n) time, O(1) space
def subsets(self, nums: List[int]) -> List[List[int]]:
    result = [[]]

    for num in nums:
        size = len(result)
        for i in range(size):
            subset = result[i][:]  # Copy the subset
            subset.append(num)
            result.append(subset)

    return result

# Approach 3: Bit manipulation - O(n * 2^n) time, O(1) space
def subsets(self, nums: List[int]) -> List[List[int]]:
    n = len(nums)
    result = []

    for i in range(1 << n):  # 2^n combinations
        subset = []
        for j in range(n):
            if i & (1 << j):  # Check if jth bit is set
                subset.append(nums[j])
        result.append(subset)

    return result`
        }
      },
      testCases: [
        { nums: [1,2,3], expected: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]] },
        { nums: [0], expected: [[],[0]] }
      ],
      examples: [
        { input: 'nums = [1,2,3]', output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]' },
        { input: 'nums = [0]', output: '[[],[0]]' }
      ],
      explanation: `**Problem:** Generate all possible subsets (power set) of an array.

**Key Insight:** For each element, we have 2 choices: include it or exclude it from the subset. This creates a decision tree with 2^n total subsets.

**Approaches:**

**1. Backtracking (DFS)**
- At each index, make two recursive calls: include or exclude current element
- Add current subset to result at every step (not just leaves)
- Use start index to avoid duplicates

**2. Iterative (Build Incrementally)**
- Start with empty subset: [[]]
- For each element, double the subsets by creating copies with the new element added
- Example: [] → add 1 → [[],[1]] → add 2 → [[],[1],[2],[1,2]]

**3. Bit Manipulation**
- Each number from 0 to 2^n-1 represents a subset
- If bit i is set, include nums[i] in subset
- Example: n=3, number 5 (binary 101) → subset [nums[0], nums[2]]

**Complexity:** Time O(n × 2^n), Space O(n) for recursion stack`,
      pseudocode: `Backtracking Approach:
function subsets(nums):
    result = []
    backtrack(result, [], nums, 0)
    return result

function backtrack(result, current, nums, start):
    // Add current subset (every partial solution is valid)
    result.add(current.copy())

    // Try adding each remaining element
    for i in start to nums.length-1:
        current.add(nums[i])             // Include
        backtrack(result, current, nums, i + 1)
        current.removeLast()             // Exclude (backtrack)

Example: nums = [1,2,3]
- Add []: result = [[]]
- Try 1:
  - Add [1]: result = [[],[1]]
  - Try 2:
    - Add [1,2]: result = [[],[1],[1,2]]
    - Try 3:
      - Add [1,2,3]: result = [[],[1],[1,2],[1,2,3]]
  - Try 3:
    - Add [1,3]: result = [[],[1],[1,2],[1,2,3],[1,3]]
- Try 2:
  - Add [2]: result = [[],[1],[1,2],[1,2,3],[1,3],[2]]
  - Try 3:
    - Add [2,3]: result = [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3]]
- Try 3:
  - Add [3]: result = [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]

Iterative Approach:
result = [[]]
for num in nums:
    newSubsets = []
    for subset in result:
        newSubsets.add(subset + [num])
    result.addAll(newSubsets)`
    },
    {
      id: 4,
      title: 'Combination Sum',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/combination-sum/',
      description: 'Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order. The same number may be chosen from candidates an unlimited number of times.',
      code: {
        java: {
          starterCode: `public List<List<Integer>> combinationSum(int[] candidates, int target) {
    // Write your code here

}`,
          solution: `// Approach: Backtracking - O(2^target) time, O(target) space
public List<List<Integer>> combinationSum(int[] candidates, int target) {
    List<List<Integer>> result = new ArrayList<>();
    Arrays.sort(candidates);
    backtrack(result, new ArrayList<>(), candidates, target, 0);
    return result;
}

private void backtrack(List<List<Integer>> result, List<Integer> current,
                       int[] candidates, int remain, int start) {
    if (remain < 0) return;
    if (remain == 0) {
        result.add(new ArrayList<>(current));
        return;
    }

    for (int i = start; i < candidates.length; i++) {
        current.add(candidates[i]);
        backtrack(result, current, candidates, remain - candidates[i], i);
        current.remove(current.size() - 1);
    }
}`
        },
        python: {
          starterCode: `def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
    # Write your code here
    pass`,
          solution: `# Approach: Backtracking - O(2^target) time, O(target) space
def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
    result = []
    candidates.sort()
    self._backtrack(result, [], candidates, target, 0)
    return result

def _backtrack(self, result: List[List[int]], current: List[int], candidates: List[int], remain: int, start: int) -> None:
    if remain < 0:
        return
    if remain == 0:
        result.append(current[:])
        return

    for i in range(start, len(candidates)):
        current.append(candidates[i])
        self._backtrack(result, current, candidates, remain - candidates[i], i)
        current.pop()

# Alternative: With pruning optimization
def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
    result = []
    candidates.sort()
    self._backtrack_pruned(result, [], candidates, target, 0)
    return result

def _backtrack_pruned(self, result: List[List[int]], current: List[int], candidates: List[int], remain: int, start: int) -> None:
    if remain == 0:
        result.append(current[:])
        return

    for i in range(start, len(candidates)):
        if candidates[i] > remain:  # Pruning: no need to continue
            break
        current.append(candidates[i])
        self._backtrack_pruned(result, current, candidates, remain - candidates[i], i)
        current.pop()`
        }
      },
      testCases: [
        { candidates: [2,3,6,7], target: 7, expected: [[2,2,3],[7]] },
        { candidates: [2,3,5], target: 8, expected: [[2,2,2,2],[2,3,3],[3,5]] },
        { candidates: [2], target: 1, expected: [] }
      ],
      examples: [
        { input: 'candidates = [2,3,6,7], target = 7', output: '[[2,2,3],[7]]' },
        { input: 'candidates = [2,3,5], target = 8', output: '[[2,2,2,2],[2,3,3],[3,5]]' }
      ],
      explanation: `**Problem:** Find all unique combinations of candidates that sum to target. Numbers can be reused unlimited times.

**Key Insight:** Use backtracking with remaining target. Key difference from Subsets: we can reuse the same element multiple times.

**Strategy:**
1. Sort candidates (for pruning optimization)
2. Use backtracking with start index
3. At each step, subtract candidate from remaining target
4. Base cases:
   - remain = 0: Found valid combination
   - remain < 0: Invalid path, backtrack
5. Key: Use start index 'i' (not i+1) to allow reusing same element

**Pruning Optimization:**
- If candidate > remaining target, no need to continue (if sorted)
- Reduces unnecessary exploration

**Why start index i (not i+1)?**
- Allows reusing same element: [2,2,2,2] for target 8
- Prevents duplicates: avoids [2,3] and [3,2] as separate combinations

**Complexity:** Time O(2^target) - exponential in target value. Space O(target) for recursion depth`,
      pseudocode: `function combinationSum(candidates, target):
    result = []
    candidates.sort()  // For pruning
    backtrack(result, [], candidates, target, 0)
    return result

function backtrack(result, current, candidates, remain, start):
    // Base case: found valid combination
    if remain == 0:
        result.add(current.copy())
        return

    // Base case: exceeded target
    if remain < 0:
        return

    // Try each candidate starting from 'start'
    for i in start to candidates.length-1:
        // Pruning: if current candidate too large, stop
        if candidates[i] > remain:
            break

        current.add(candidates[i])
        // Use 'i' not 'i+1' to allow reusing same element
        backtrack(result, current, candidates, remain - candidates[i], i)
        current.removeLast()

Example: candidates = [2,3,5], target = 8
- Try 2: remain=8-2=6
  - Try 2: remain=6-2=4
    - Try 2: remain=4-2=2
      - Try 2: remain=2-2=0 ✓ Add [2,2,2,2]
    - Try 3: remain=4-3=1
      - All candidates > 1, backtrack
  - Try 3: remain=6-3=3
    - Try 3: remain=3-3=0 ✓ Add [2,3,3]
- Try 3: remain=8-3=5
  - Try 5: remain=5-5=0 ✓ Add [3,5]
- Result: [[2,2,2,2],[2,3,3],[3,5]]`
    },
    {
      id: 5,
      title: 'Letter Combinations of Phone Number',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/',
      description: 'Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order. A mapping of digits to letters (just like on the telephone buttons) is given.',
      code: {
        java: {
          starterCode: `public List<String> letterCombinations(String digits) {
    // Write your code here

}`,
          solution: `// Approach: Backtracking - O(4^n) time, O(n) space
private static final String[] KEYS = {
    "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
};

public List<String> letterCombinations(String digits) {
    List<String> result = new ArrayList<>();
    if (digits == null || digits.length() == 0) {
        return result;
    }
    backtrack(result, new StringBuilder(), digits, 0);
    return result;
}

private void backtrack(List<String> result, StringBuilder current,
                       String digits, int index) {
    if (index == digits.length()) {
        result.add(current.toString());
        return;
    }

    String letters = KEYS[digits.charAt(index) - '0'];
    for (char c : letters.toCharArray()) {
        current.append(c);
        backtrack(result, current, digits, index + 1);
        current.deleteCharAt(current.length() - 1);
    }
}`
        },
        python: {
          starterCode: `def letterCombinations(self, digits: str) -> List[str]:
    # Write your code here
    pass`,
          solution: `# Approach: Backtracking - O(4^n) time, O(n) space
def letterCombinations(self, digits: str) -> List[str]:
    if not digits:
        return []

    phone_map = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    }

    result = []
    self._backtrack(result, [], digits, 0, phone_map)
    return result

def _backtrack(self, result: List[str], current: List[str], digits: str, index: int, phone_map: dict) -> None:
    if index == len(digits):
        result.append(''.join(current))
        return

    letters = phone_map[digits[index]]
    for char in letters:
        current.append(char)
        self._backtrack(result, current, digits, index + 1, phone_map)
        current.pop()

# Alternative: Iterative approach
def letterCombinations(self, digits: str) -> List[str]:
    if not digits:
        return []

    phone_map = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    }

    result = ['']
    for digit in digits:
        temp = []
        for combination in result:
            for letter in phone_map[digit]:
                temp.append(combination + letter)
        result = temp

    return result`
        }
      },
      testCases: [
        { digits: '23', expected: ['ad','ae','af','bd','be','bf','cd','ce','cf'] },
        { digits: '', expected: [] },
        { digits: '2', expected: ['a','b','c'] }
      ],
      examples: [
        { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
        { input: 'digits = ""', output: '[]' },
        { input: 'digits = "2"', output: '["a","b","c"]' }
      ],
      explanation: `**Problem:** Generate all letter combinations for phone number digits (like old phone keyboards).

**Key Insight:** For each digit, map to its letters and explore all combinations using backtracking.

**Phone Mapping:**
- 2: abc, 3: def, 4: ghi, 5: jkl
- 6: mno, 7: pqrs, 8: tuv, 9: wxyz

**Backtracking Strategy:**
1. Process digits one by one (left to right)
2. For current digit, get its letter options
3. For each letter, add to current combination and recurse to next digit
4. Base case: When index reaches end of digits, add complete combination

**Decision Tree:**
- Each level represents one digit
- Each branch represents choosing one letter for that digit
- Leaves represent complete combinations

**Alternative: Iterative Approach:**
Start with [""], then for each digit, expand each existing combination with all letters for that digit.

**Complexity:** Time O(4^n × n) where n = digits.length, 4 is max letters per digit (7,9). Space O(n) for recursion`,
      pseudocode: `function letterCombinations(digits):
    if digits is empty:
        return []

    phone = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    }

    result = []
    backtrack(result, [], digits, 0, phone)
    return result

function backtrack(result, current, digits, index, phone):
    // Base case: processed all digits
    if index == digits.length:
        result.add(current.join(''))
        return

    // Get letters for current digit
    digit = digits[index]
    letters = phone[digit]

    // Try each letter
    for letter in letters:
        current.add(letter)
        backtrack(result, current, digits, index + 1, phone)
        current.removeLast()

Example: digits = "23"
- Index 0, digit='2', letters='abc'
  - Choose 'a':
    - Index 1, digit='3', letters='def'
      - Choose 'd': "ad" ✓
      - Choose 'e': "ae" ✓
      - Choose 'f': "af" ✓
  - Choose 'b':
    - Index 1, digit='3', letters='def'
      - Choose 'd': "bd" ✓
      - Choose 'e': "be" ✓
      - Choose 'f': "bf" ✓
  - Choose 'c':
    - Index 1, digit='3', letters='def'
      - Choose 'd': "cd" ✓
      - Choose 'e': "ce" ✓
      - Choose 'f': "cf" ✓
- Result: ["ad","ae","af","bd","be","bf","cd","ce","cf"]`
    },
    {
      id: 6,
      title: 'Combinations',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/combinations/',
      description: 'Return all possible combinations of k numbers chosen from range [1, n].',
      example: `Input: n = 4, k = 2
Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]`,
      code: {
        java: {
          starterCode: `public List<List<Integer>> combine(int n, int k) {
}`,
          solution: `public List<List<Integer>> combine(int n, int k) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(result, new ArrayList<>(), 1, n, k);
    return result;
}

private void backtrack(List<List<Integer>> result, List<Integer> current, int start, int n, int k) {
    if (current.size() == k) {
        result.add(new ArrayList<>(current));
        return;
    }
    
    for (int i = start; i <= n; i++) {
        current.add(i);
        backtrack(result, current, i + 1, n, k);
        current.remove(current.size() - 1);
    }
}`
        },
        python: {
          starterCode: `def combine(self, n: int, k: int) -> List[List[int]]:
    pass`,
          solution: `def combine(self, n: int, k: int) -> List[List[int]]:
    result = []
    
    def backtrack(start, current):
        if len(current) == k:
            result.append(current[:])
            return
        
        for i in range(start, n + 1):
            current.append(i)
            backtrack(i + 1, current)
            current.pop()
    
    backtrack(1, [])
    return result`
        }
      },
      testCases: [
        { input: 'n = 4, k = 2', output: '[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]' }
      ],
      hints: `Backtracking with start pointer. Time O(C(n,k) * k), Space O(k)`
    },
    {
      id: 7,
      title: 'N-Queens II',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/n-queens-ii/',
      description: 'Return the number of distinct solutions to the n-queens puzzle.',
      example: `Input: n = 4
Output: 2
Explanation: Two distinct solutions exist.`,
      code: {
        java: {
          starterCode: `public int totalNQueens(int n) {
}`,
          solution: `public int totalNQueens(int n) {
    return backtrack(0, new HashSet<>(), new HashSet<>(), new HashSet<>(), n);
}

private int backtrack(int row, Set<Integer> cols, Set<Integer> diag1, Set<Integer> diag2, int n) {
    if (row == n) {
        return 1;
    }
    
    int count = 0;
    
    for (int col = 0; col < n; col++) {
        int d1 = row - col;
        int d2 = row + col;
        
        if (cols.contains(col) || diag1.contains(d1) || diag2.contains(d2)) {
            continue;
        }
        
        cols.add(col);
        diag1.add(d1);
        diag2.add(d2);
        
        count += backtrack(row + 1, cols, diag1, diag2, n);
        
        cols.remove(col);
        diag1.remove(d1);
        diag2.remove(d2);
    }
    
    return count;
}`
        },
        python: {
          starterCode: `def totalNQueens(self, n: int) -> int:
    pass`,
          solution: `def totalNQueens(self, n: int) -> int:
    def backtrack(row, cols, diag1, diag2):
        if row == n:
            return 1
        
        count = 0
        
        for col in range(n):
            d1 = row - col
            d2 = row + col
            
            if col in cols or d1 in diag1 or d2 in diag2:
                continue
            
            cols.add(col)
            diag1.add(d1)
            diag2.add(d2)
            
            count += backtrack(row + 1, cols, diag1, diag2)
            
            cols.remove(col)
            diag1.remove(d1)
            diag2.remove(d2)
        
        return count
    
    return backtrack(0, set(), set(), set())`
        }
      },
      testCases: [
        { input: 'n = 4', output: '2' },
        { input: 'n = 1', output: '1' }
      ],
      hints: `Track cols, diagonals. Time O(n!), Space O(n)`
    },
    {
      id: 8,
      title: 'Word Search',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/word-search/',
      description: 'Find if word exists in grid. Word can be constructed from sequentially adjacent cells.',
      example: `Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true`,
      code: {
        java: {
          starterCode: `public boolean exist(char[][] board, String word) {
}`,
          solution: `public boolean exist(char[][] board, String word) {
    int m = board.length, n = board[0].length;
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (dfs(board, word, i, j, 0)) {
                return true;
            }
        }
    }
    
    return false;
}

private boolean dfs(char[][] board, String word, int i, int j, int idx) {
    if (idx == word.length()) {
        return true;
    }
    
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || 
        board[i][j] != word.charAt(idx)) {
        return false;
    }
    
    char temp = board[i][j];
    board[i][j] = '#';
    
    boolean found = dfs(board, word, i + 1, j, idx + 1) ||
                    dfs(board, word, i - 1, j, idx + 1) ||
                    dfs(board, word, i, j + 1, idx + 1) ||
                    dfs(board, word, i, j - 1, idx + 1);
    
    board[i][j] = temp;
    
    return found;
}`
        },
        python: {
          starterCode: `def exist(self, board: List[List[str]], word: str) -> bool:
    pass`,
          solution: `def exist(self, board: List[List[str]], word: str) -> bool:
    m, n = len(board), len(board[0])
    
    def dfs(i, j, idx):
        if idx == len(word):
            return True
        
        if i < 0 or i >= m or j < 0 or j >= n or board[i][j] != word[idx]:
            return False
        
        temp = board[i][j]
        board[i][j] = '#'
        
        found = (dfs(i + 1, j, idx + 1) or
                 dfs(i - 1, j, idx + 1) or
                 dfs(i, j + 1, idx + 1) or
                 dfs(i, j - 1, idx + 1))
        
        board[i][j] = temp
        
        return found
    
    for i in range(m):
        for j in range(n):
            if dfs(i, j, 0):
                return True
    
    return False`
        }
      },
      testCases: [
        { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' },
        { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"', output: 'true' }
      ],
      hints: `DFS with backtracking. Time O(mn * 4^L), Space O(L)`
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Recursion-${q.id}`)).length
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
    const savedDrawing = localStorage.getItem(`drawing-Recursion-${question.id}`)
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
      ? [...breadcrumbStack.slice(0, -1), { name: 'Recursion', page: null }, { name: selectedQuestion.title, page: null }]
      : null

    // Fallback to legacy format
    const problemBreadcrumb = {
      ...breadcrumb,
      category: { name: 'Recursion', onClick: () => setSelectedQuestion(null) },
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
            ← Back to Recursion
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
          <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: 'white', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <CompletionCheckbox problemId={`Recursion-${selectedQuestion.id}`} />
              <BookmarkButton
                problemId={`Recursion-${selectedQuestion.id}`}
                problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'Recursion' }}
              />
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
                  <div key={idx} style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #374151', color: '#9ca3af' }}>
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
          <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' , flexWrap: 'wrap' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
              </button>
              <button onClick={() => setShowDrawing(true)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: currentDrawing ? '#8b5cf6' : '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {currentDrawing ? 'View' : 'Draw'} Sketch
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5', backgroundColor: '#111827', color: '#9ca3af' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: 'white', marginBottom: '0.5rem' }}>Output</h3>
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
            const savedDrawing = localStorage.getItem(`drawing-Recursion-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`Recursion-${selectedQuestion.id}`}
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
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem' }}>Recursion</h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>Master recursion problems</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '2px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'white' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '2px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'white' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: '#1f2937', border: '2px solid #374151', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
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
                    style={{
                      backgroundColor: '#1f2937',
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
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`Recursion-${question.id}`} />
                        </div>
                        <BookmarkButton
                          size="small"
                          problemId={`Recursion-${question.id}`}
                          problemData={{ title: question.title, difficulty: question.difficulty, category: 'Recursion' }}
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

export default Recursion
