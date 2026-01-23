import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function DynamicProgramming({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb, breadcrumbStack, onBreadcrumbClick, pushBreadcrumb, breadcrumbColors }) {
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
      title: 'Fibonacci with Memoization',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/fibonacci-number/',
      description: 'Implement the Fibonacci sequence using dynamic programming with memoization (top-down approach). Store computed values to avoid redundant calculations.',
      explanation: `**Problem:** Calculate Fibonacci number efficiently using dynamic programming.

**Key Insight:** Without memoization, naive recursion recalculates the same values many times (exponential time). DP reduces this to linear time.

**Approach 1: Top-Down Memoization (Recursive + Cache)**
1. Use a HashMap to store already computed Fibonacci values
2. Before computing fib(n), check if it's in the memo
3. If found, return cached value; otherwise compute and store
4. Time: O(n), Space: O(n)

**Approach 2: Bottom-Up Tabulation (Iterative)**
1. Create dp array where dp[i] = fib(i)
2. Initialize dp[0]=0, dp[1]=1
3. Fill array iteratively: dp[i] = dp[i-1] + dp[i-2]
4. Time: O(n), Space: O(n)

**Approach 3: Space-Optimized**
1. Only need previous two values, not entire array
2. Keep two variables: prev2, prev1
3. Time: O(n), Space: O(1)`,
      pseudocode: `ALGORITHM FibonacciMemoization(n):
    IF n <= 1:
        RETURN n
    memo = HashMap()
    RETURN FibHelper(n, memo)

FUNCTION FibHelper(n, memo):
    IF n <= 1:
        RETURN n

    IF n in memo:
        RETURN memo[n]  // Already computed

    result = FibHelper(n-1, memo) + FibHelper(n-2, memo)
    memo[n] = result
    RETURN result

ALGORITHM FibonacciTabulation(n):
    IF n <= 1:
        RETURN n

    dp = array[n+1]
    dp[0] = 0
    dp[1] = 1

    FOR i FROM 2 TO n:
        dp[i] = dp[i-1] + dp[i-2]

    RETURN dp[n]

ALGORITHM FibonacciOptimized(n):
    IF n <= 1:
        RETURN n

    prev2 = 0, prev1 = 1
    FOR i FROM 2 TO n:
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr

    RETURN prev1

Example: fib(5)
Without memo: fib(5) calls fib(4) and fib(3), fib(4) calls fib(3) again...
With memo: Each value computed once
0, 1, 1, 2, 3, 5`,
      code: {
        java: {
          starterCode: `public int fib(int n) {
    // Write your code here

}`,
          solution: `// Approach: Top-down Memoization - O(n) time, O(n) space
public int fib(int n) {
    if (n <= 1) return n;
    Map<Integer, Integer> memo = new HashMap<>();
    return fibHelper(n, memo);
}

private int fibHelper(int n, Map<Integer, Integer> memo) {
    if (n <= 1) return n;

    // Check if already computed
    if (memo.containsKey(n)) {
        return memo.get(n);
    }

    // Compute and store result
    int result = fibHelper(n - 1, memo) + fibHelper(n - 2, memo);
    memo.put(n, result);

    return result;
}

// Alternative: Bottom-up approach (Tabulation)
public int fibonacci(int n) {
    if (n <= 1) return n;

    int[] dp = new int[n + 1];
    dp[0] = 0;
    dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}

// Space-optimized version
public int fibonacciOptimized(int n) {
    if (n <= 1) return n;

    int prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`
        },
        python: {
          starterCode: `def fib(self, n: int) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: Top-down Memoization - O(n) time, O(n) space
def fib(self, n: int) -> int:
    if n <= 1:
        return n
    memo = {}
    return self._fib_helper(n, memo)

def _fib_helper(self, n: int, memo: dict) -> int:
    if n <= 1:
        return n

    # Check if already computed
    if n in memo:
        return memo[n]

    # Compute and store result
    result = self._fib_helper(n - 1, memo) + self._fib_helper(n - 2, memo)
    memo[n] = result

    return result


# Alternative: Bottom-up approach (Tabulation)
def fibonacci(self, n: int) -> int:
    if n <= 1:
        return n

    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1

    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]

    return dp[n]


# Space-optimized version
def fibonacci_optimized(self, n: int) -> int:
    if n <= 1:
        return n

    prev2, prev1 = 0, 1
    for i in range(2, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr

    return prev1`
        }
      },
      testCases: [
        { n: 5, expected: 5 },
        { n: 10, expected: 55 },
        { n: 0, expected: 0 }
      ],
      examples: [
        { input: 'n = 5', output: '5', explanation: 'Fib(5) = 0,1,1,2,3,5' },
        { input: 'n = 10', output: '55', explanation: 'Fib(10) = 0,1,1,2,3,5,8,13,21,34,55' },
        { input: 'n = 0', output: '0' }
      ]
    },
    {
      id: 2,
      title: 'Longest Common Subsequence',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence/',
      description: 'Find the length of the longest common subsequence (LCS) between two strings using dynamic programming. A subsequence is a sequence that appears in the same relative order but not necessarily contiguous.',
      explanation: `**Problem:** Find length of longest common subsequence between two strings.

**Key Insight:** Classic 2D DP problem. If characters match, add 1 to diagonal value. If they don't match, take max from left or top.

**Approach: 2D DP Table**
1. Create dp[m+1][n+1] where dp[i][j] = LCS length of text1[0...i-1] and text2[0...j-1]
2. Base case: dp[0][j] = dp[i][0] = 0 (empty string)
3. If text1[i-1] == text2[j-1]: dp[i][j] = dp[i-1][j-1] + 1
4. Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
5. Answer: dp[m][n]

**Complexity:** Time O(m*n), Space O(m*n)`,
      pseudocode: `ALGORITHM LongestCommonSubsequence(text1, text2):
    m = length(text1)
    n = length(text2)
    dp = 2D array[m+1][n+1] initialized to 0

    FOR i FROM 1 TO m:
        FOR j FROM 1 TO n:
            IF text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1  // Match: extend diagonal
            ELSE:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])  // No match: max

    RETURN dp[m][n]

Example: text1 = "abcde", text2 = "ace"
DP Table:
    ""  a  c  e
""   0  0  0  0
a    0  1  1  1
b    0  1  1  1
c    0  1  2  2
d    0  1  2  2
e    0  1  2  3

Result: 3 (subsequence "ace")`,
      code: {
        java: {
          starterCode: `public int longestCommonSubsequence(String text1, String text2) {
    // Write your code here

}`,
          solution: `// Approach: 2D DP - O(m*n) time, O(m*n) space
public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length();
    int n = text2.length();
    int[][] dp = new int[m + 1][n + 1];

    // Build DP table bottom-up
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                // Characters match - add 1 to diagonal
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                // Characters don't match - take max from left or top
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}

// With path reconstruction
public String findLCS(String text1, String text2) {
    int m = text1.length();
    int n = text2.length();
    int[][] dp = new int[m + 1][n + 1];

    // Fill DP table
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Reconstruct LCS
    StringBuilder lcs = new StringBuilder();
    int i = m, j = n;
    while (i > 0 && j > 0) {
        if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
            lcs.insert(0, text1.charAt(i - 1));
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return lcs.toString();
}`
        },
        python: {
          starterCode: `def longestCommonSubsequence(self, text1: str, text2: str) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: 2D DP - O(m*n) time, O(m*n) space
def longestCommonSubsequence(self, text1: str, text2: str) -> int:
    m = len(text1)
    n = len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Build DP table bottom-up
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                # Characters match - add 1 to diagonal
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                # Characters don't match - take max from left or top
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    return dp[m][n]


# With path reconstruction
def findLCS(self, text1: str, text2: str) -> str:
    m = len(text1)
    n = len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Fill DP table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    # Reconstruct LCS
    lcs = []
    i, j = m, n
    while i > 0 and j > 0:
        if text1[i - 1] == text2[j - 1]:
            lcs.insert(0, text1[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] > dp[i][j - 1]:
            i -= 1
        else:
            j -= 1

    return ''.join(lcs)`
        }
      },
      testCases: [
        { text1: 'abcde', text2: 'ace', expected: 3 },
        { text1: 'abc', text2: 'abc', expected: 3 },
        { text1: 'abc', text2: 'def', expected: 0 }
      ],
      examples: [
        { input: 'text1 = "abcde", text2 = "ace"', output: '3', explanation: 'LCS is "ace" with length 3' },
        { input: 'text1 = "abc", text2 = "abc"', output: '3' },
        { input: 'text1 = "abc", text2 = "def"', output: '0' }
      ]
    },
    {
      id: 3,
      title: '0/1 Knapsack Problem',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/partition-equal-subset-sum/',
      description: 'Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value. You cannot break items (0/1 choice for each item).',
      explanation: `**Problem:** Maximize value of items in knapsack without exceeding weight capacity W.

**Key Insight:** For each item, we have 2 choices: include it or exclude it. DP tracks max value for each (item, weight) combination.

**Approach: 2D DP**
1. Create dp[n+1][W+1] where dp[i][w] = max value using first i items with capacity w
2. Base case: dp[0][w] = 0, dp[i][0] = 0
3. For each item i and capacity w:
   - If weight[i] > w: can't include, dp[i][w] = dp[i-1][w]
   - Else: dp[i][w] = max(dp[i-1][w], value[i] + dp[i-1][w-weight[i]])
4. Answer: dp[n][W]

**Space Optimization:** Use 1D array, iterate from right to left

**Complexity:** Time O(n*W), Space O(n*W) or O(W) optimized`,
      pseudocode: `ALGORITHM Knapsack(W, weights, values, n):
    dp = 2D array[n+1][W+1] initialized to 0

    FOR i FROM 1 TO n:
        FOR w FROM 0 TO W:
            IF weights[i-1] <= w:
                // Can include: choose max of include vs exclude
                include = values[i-1] + dp[i-1][w - weights[i-1]]
                exclude = dp[i-1][w]
                dp[i][w] = max(include, exclude)
            ELSE:
                // Can't include: copy previous
                dp[i][w] = dp[i-1][w]

    RETURN dp[n][W]

ALGORITHM KnapsackOptimized(W, weights, values, n):
    dp = array[W+1] initialized to 0

    FOR i FROM 0 TO n-1:
        // Iterate backwards to avoid overwriting needed values
        FOR w FROM W DOWN TO weights[i]:
            dp[w] = max(dp[w], values[i] + dp[w - weights[i]])

    RETURN dp[W]

Example: W=50, weights=[10,20,30], values=[60,100,120]
Best: Take items 2 and 3 (weights 20+30=50, values 100+120=220)`,
      code: {
        java: {
          starterCode: `public int knapsack(int W, int[] weights, int[] values, int n) {
    // Write your code here

}`,
          solution: `// Approach: 2D DP - O(n*W) time, O(n*W) space
public int knapsack(int W, int[] weights, int[] values, int n) {
    int[][] dp = new int[n + 1][W + 1];

    // Build table dp[][] in bottom-up manner
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0) {
                dp[i][w] = 0;
            } else if (weights[i - 1] <= w) {
                // Can include this item - take max of including or excluding
                dp[i][w] = Math.max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]], // Include
                    dp[i - 1][w]  // Exclude
                );
            } else {
                // Cannot include this item (weight exceeds capacity)
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    return dp[n][W];
}

// Space-optimized version using 1D array
public int knapsackOptimized(int W, int[] weights, int[] values, int n) {
    int[] dp = new int[W + 1];

    for (int i = 0; i < n; i++) {
        // Traverse from right to left to avoid overwriting needed values
        for (int w = W; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
        }
    }

    return dp[W];
}`
        },
        python: {
          starterCode: `def knapsack(self, W: int, weights: List[int], values: List[int], n: int) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: 2D DP - O(n*W) time, O(n*W) space
def knapsack(self, W: int, weights: List[int], values: List[int], n: int) -> int:
    dp = [[0] * (W + 1) for _ in range(n + 1)]

    # Build table dp[][] in bottom-up manner
    for i in range(n + 1):
        for w in range(W + 1):
            if i == 0 or w == 0:
                dp[i][w] = 0
            elif weights[i - 1] <= w:
                # Can include this item - take max of including or excluding
                dp[i][w] = max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],  # Include
                    dp[i - 1][w]  # Exclude
                )
            else:
                # Cannot include this item (weight exceeds capacity)
                dp[i][w] = dp[i - 1][w]

    return dp[n][W]


# Space-optimized version using 1D array
def knapsack_optimized(self, W: int, weights: List[int], values: List[int], n: int) -> int:
    dp = [0] * (W + 1)

    for i in range(n):
        # Traverse from right to left to avoid overwriting needed values
        for w in range(W, weights[i] - 1, -1):
            dp[w] = max(dp[w], values[i] + dp[w - weights[i]])

    return dp[W]`
        }
      },
      testCases: [
        { W: 50, weights: [10,20,30], values: [60,100,120], expected: 220 },
        { W: 10, weights: [5,4,6], values: [10,40,30], expected: 40 }
      ],
      examples: [
        { input: 'W=50, weights=[10,20,30], values=[60,100,120]', output: '220', explanation: 'Take items with weight 20 and 30 (values 100+120)' },
        { input: 'W=10, weights=[5,4,6], values=[10,40,30]', output: '40' }
      ]
    },
    {
      id: 4,
      title: 'Coin Change - Minimum Coins',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/coin-change/',
      description: 'Given an array of coin denominations and a total amount, find the minimum number of coins needed to make up that amount. Return -1 if the amount cannot be made.',
      explanation: `**Problem:** Find minimum coins needed to make amount (or -1 if impossible).

**Key Insight:** For each amount, try all coin denominations and take minimum. Build up from amount 0 to target.

**Approach: Bottom-Up DP**
1. Create dp[amount+1] where dp[i] = min coins needed for amount i
2. Initialize: dp[0] = 0, all others = infinity (or amount+1)
3. For each amount i from 1 to target:
   - For each coin c: if c <= i, dp[i] = min(dp[i], dp[i-c] + 1)
4. If dp[amount] still infinity, return -1

**Why It Works:** We're building solutions for smaller amounts first, then using those to solve larger amounts.

**Complexity:** Time O(amount * coins.length), Space O(amount)`,
      pseudocode: `ALGORITHM CoinChange(coins, amount):
    dp = array[amount+1]
    dp[0] = 0
    FOR i FROM 1 TO amount:
        dp[i] = amount + 1  // Initialize to infinity

    FOR i FROM 1 TO amount:
        FOR each coin in coins:
            IF coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    IF dp[amount] > amount:
        RETURN -1  // Impossible to make amount
    ELSE:
        RETURN dp[amount]

Example: coins = [1,2,5], amount = 11
dp[0] = 0
dp[1] = 1 (use coin 1)
dp[2] = 1 (use coin 2)
dp[3] = 2 (use coins 2+1)
dp[4] = 2 (use coins 2+2)
dp[5] = 1 (use coin 5)
dp[6] = 2 (use coins 5+1)
...
dp[11] = 3 (use coins 5+5+1)`,
      code: {
        java: {
          starterCode: `public int coinChange(int[] coins, int amount) {
    // Write your code here

}`,
          solution: `// Approach: Bottom-up DP - O(amount * coins.length) time, O(amount) space
public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1); // Initialize with max value
    dp[0] = 0; // Base case: 0 coins needed for amount 0

    // For each amount from 1 to target
    for (int i = 1; i <= amount; i++) {
        // Try each coin denomination
        for (int coin : coins) {
            if (coin <= i) {
                // Update minimum coins needed
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    // If dp[amount] is still max value, no solution exists
    return dp[amount] > amount ? -1 : dp[amount];
}

// Top-down approach with memoization
public int coinChangeMemo(int[] coins, int amount) {
    int[] memo = new int[amount + 1];
    Arrays.fill(memo, -2); // -2 means not computed
    return helper(coins, amount, memo);
}

private int helper(int[] coins, int amount, int[] memo) {
    if (amount == 0) return 0;
    if (amount < 0) return -1;

    if (memo[amount] != -2) return memo[amount];

    int minCoins = Integer.MAX_VALUE;
    for (int coin : coins) {
        int res = helper(coins, amount - coin, memo);
        if (res >= 0) {
            minCoins = Math.min(minCoins, res + 1);
        }
    }

    memo[amount] = (minCoins == Integer.MAX_VALUE) ? -1 : minCoins;
    return memo[amount];
}`
        },
        python: {
          starterCode: `def coinChange(self, coins: List[int], amount: int) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: Bottom-up DP - O(amount * len(coins)) time, O(amount) space
def coinChange(self, coins: List[int], amount: int) -> int:
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0  # Base case: 0 coins needed for amount 0

    # For each amount from 1 to target
    for i in range(1, amount + 1):
        # Try each coin denomination
        for coin in coins:
            if coin <= i:
                # Update minimum coins needed
                dp[i] = min(dp[i], dp[i - coin] + 1)

    # If dp[amount] is still max value, no solution exists
    return dp[amount] if dp[amount] <= amount else -1


# Top-down approach with memoization
def coinChangeMemo(self, coins: List[int], amount: int) -> int:
    memo = {}
    return self._helper(coins, amount, memo)

def _helper(self, coins: List[int], amount: int, memo: dict) -> int:
    if amount == 0:
        return 0
    if amount < 0:
        return -1

    if amount in memo:
        return memo[amount]

    min_coins = float('inf')
    for coin in coins:
        res = self._helper(coins, amount - coin, memo)
        if res >= 0:
            min_coins = min(min_coins, res + 1)

    memo[amount] = -1 if min_coins == float('inf') else min_coins
    return memo[amount]`
        }
      },
      testCases: [
        { coins: [1,2,5], amount: 11, expected: 3 },
        { coins: [2], amount: 3, expected: -1 },
        { coins: [1], amount: 0, expected: 0 }
      ],
      examples: [
        { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1 (3 coins)' },
        { input: 'coins = [2], amount = 3', output: '-1', explanation: 'Cannot make amount 3 with only coin 2' },
        { input: 'coins = [1], amount = 0', output: '0' }
      ]
    },
    {
      id: 5,
      title: 'Longest Increasing Subsequence',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/',
      description: 'Given an integer array nums, return the length of the longest strictly increasing subsequence.',
      explanation: `**Problem:** Find length of longest strictly increasing subsequence in array.

**Key Insight:** Two approaches - (1) O(n²) DP where each element tracks LIS ending at that position, (2) O(n log n) using binary search on a "tails" array.

**Approach 1: DP - O(n²)**
1. Create dp[n] where dp[i] = LIS length ending at index i
2. Initialize all dp[i] = 1 (each element is a subsequence of length 1)
3. For each i, check all j < i:
   - If nums[i] > nums[j]: dp[i] = max(dp[i], dp[j] + 1)
4. Return max(dp)

**Approach 2: Binary Search + DP - O(n log n)**
1. Maintain "tails" array where tails[i] = smallest ending value of all LIS with length i+1
2. For each num, binary search position in tails
3. If position == len(tails), append; otherwise replace
4. tails array length = LIS length

**Complexity:** DP: O(n²), Binary Search: O(n log n)`,
      pseudocode: `ALGORITHM LongestIncreasingSubsequenceDP(nums):
    n = length(nums)
    dp = array[n] filled with 1
    maxLength = 1

    FOR i FROM 1 TO n-1:
        FOR j FROM 0 TO i-1:
            IF nums[i] > nums[j]:
                dp[i] = max(dp[i], dp[j] + 1)
        maxLength = max(maxLength, dp[i])

    RETURN maxLength

ALGORITHM LongestIncreasingSubsequenceOptimal(nums):
    tails = []

    FOR num in nums:
        // Binary search for position
        left = 0, right = length(tails)
        WHILE left < right:
            mid = (left + right) / 2
            IF tails[mid] < num:
                left = mid + 1
            ELSE:
                right = mid

        // Insert or replace
        IF left == length(tails):
            tails.append(num)
        ELSE:
            tails[left] = num

    RETURN length(tails)

Example: [10,9,2,5,3,7,101,18]
DP approach: dp = [1,1,1,2,2,3,4,4]
Result: 4 (subsequence [2,3,7,101] or [2,5,7,101], etc.)`,
      code: {
        java: {
          starterCode: `public int lengthOfLIS(int[] nums) {
    // Write your code here

}`,
          solution: `// Approach 1: DP - O(n²) time, O(n) space
public int lengthOfLIS(int[] nums) {
    if (nums == null || nums.length == 0) return 0;

    int n = nums.length;
    int[] dp = new int[n];
    Arrays.fill(dp, 1); // Each element is a subsequence of length 1

    int maxLength = 1;
    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        maxLength = Math.max(maxLength, dp[i]);
    }

    return maxLength;
}

// Approach 2: Binary Search + DP - O(n log n) time, O(n) space
public int lengthOfLISOptimal(int[] nums) {
    if (nums == null || nums.length == 0) return 0;

    List<Integer> tails = new ArrayList<>();

    for (int num : nums) {
        // Binary search for position to insert/replace
        int left = 0, right = tails.size();
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (tails.get(mid) < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        // If left == size, append; otherwise replace
        if (left == tails.size()) {
            tails.add(num);
        } else {
            tails.set(left, num);
        }
    }

    return tails.size();
}`
        },
        python: {
          starterCode: `def lengthOfLIS(self, nums: List[int]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach 1: DP - O(n²) time, O(n) space
def lengthOfLIS(self, nums: List[int]) -> int:
    if not nums:
        return 0

    n = len(nums)
    dp = [1] * n  # Each element is a subsequence of length 1

    max_length = 1
    for i in range(1, n):
        for j in range(i):
            if nums[i] > nums[j]:
                dp[i] = max(dp[i], dp[j] + 1)
        max_length = max(max_length, dp[i])

    return max_length


# Approach 2: Binary Search + DP - O(n log n) time, O(n) space
def lengthOfLISOptimal(self, nums: List[int]) -> int:
    if not nums:
        return 0

    tails = []

    for num in nums:
        # Binary search for position to insert/replace
        left, right = 0, len(tails)
        while left < right:
            mid = left + (right - left) // 2
            if tails[mid] < num:
                left = mid + 1
            else:
                right = mid

        # If left == len, append; otherwise replace
        if left == len(tails):
            tails.append(num)
        else:
            tails[left] = num

    return len(tails)`
        }
      },
      testCases: [
        { nums: [10,9,2,5,3,7,101,18], expected: 4 },
        { nums: [0,1,0,3,2,3], expected: 4 },
        { nums: [7,7,7,7,7,7,7], expected: 1 }
      ],
      examples: [
        { input: 'nums = [10,9,2,5,3,7,101,18]', output: '4', explanation: 'The longest increasing subsequence is [2,3,7,101], length 4' },
        { input: 'nums = [0,1,0,3,2,3]', output: '4', explanation: 'One possible LIS is [0,1,2,3]' },
        { input: 'nums = [7,7,7,7,7,7,7]', output: '1' }
      ],
      hints: `DP: dp[i] = max LIS ending at i. Or Binary Search on tails array. Time O(n²) or O(n log n), Space O(n)`
    },
    {
      id: 6,
      title: 'Climbing Stairs',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/',
      description: 'You are climbing a staircase with n steps. Each time you can climb 1 or 2 steps. How many distinct ways can you climb to the top?',
      example: `Input: n = 3
Output: 3
Explanation: Three ways: 1+1+1, 1+2, 2+1`,
      code: {
        java: {
          starterCode: `public int climbStairs(int n) {
}`,
          solution: `public int climbStairs(int n) {
    if (n <= 2) return n;
    
    int prev2 = 1, prev1 = 2;
    
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    
    return prev1;
}`
        },
        python: {
          starterCode: `def climbStairs(self, n: int) -> int:
    pass`,
          solution: `def climbStairs(self, n: int) -> int:
    if n <= 2:
        return n
    
    prev2, prev1 = 1, 2
    
    for i in range(3, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    
    return prev1`
        }
      },
      testCases: [
        { input: 'n = 2', output: '2' },
        { input: 'n = 3', output: '3' }
      ],
      hints: `Fibonacci pattern. Time O(n), Space O(1)`
    },
    {
      id: 7,
      title: 'House Robber',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/house-robber/',
      description: 'Rob houses along a street. Cannot rob two adjacent houses. Return maximum amount you can rob.',
      example: `Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (1) and house 3 (3). Total = 4.`,
      code: {
        java: {
          starterCode: `public int rob(int[] nums) {
}`,
          solution: `public int rob(int[] nums) {
    if (nums.length == 0) return 0;
    if (nums.length == 1) return nums[0];
    
    int prev2 = nums[0];
    int prev1 = Math.max(nums[0], nums[1]);
    
    for (int i = 2; i < nums.length; i++) {
        int curr = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = curr;
    }
    
    return prev1;
}`
        },
        python: {
          starterCode: `def rob(self, nums: List[int]) -> int:
    pass`,
          solution: `def rob(self, nums: List[int]) -> int:
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    
    prev2 = nums[0]
    prev1 = max(nums[0], nums[1])
    
    for i in range(2, len(nums)):
        curr = max(prev1, prev2 + nums[i])
        prev2 = prev1
        prev1 = curr
    
    return prev1`
        }
      },
      testCases: [
        { input: 'nums = [1,2,3,1]', output: '4' },
        { input: 'nums = [2,7,9,3,1]', output: '12' }
      ],
      hints: `dp[i] = max(dp[i-1], dp[i-2] + nums[i]). Time O(n), Space O(1)`
    },
    {
      id: 8,
      title: 'Word Break',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/word-break/',
      description: 'Given string s and dictionary wordDict, return true if s can be segmented into words from the dictionary.',
      example: `Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: "leetcode" can be segmented as "leet code".`,
      code: {
        java: {
          starterCode: `public boolean wordBreak(String s, List<String> wordDict) {
}`,
          solution: `public boolean wordBreak(String s, List<String> wordDict) {
    Set<String> wordSet = new HashSet<>(wordDict);
    boolean[] dp = new boolean[s.length() + 1];
    dp[0] = true;
    
    for (int i = 1; i <= s.length(); i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && wordSet.contains(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    
    return dp[s.length()];
}`
        },
        python: {
          starterCode: `def wordBreak(self, s: str, wordDict: List[str]) -> bool:
    pass`,
          solution: `def wordBreak(self, s: str, wordDict: List[str]) -> bool:
    word_set = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True
    
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    
    return dp[len(s)]`
        }
      },
      testCases: [
        { input: 's = "leetcode", wordDict = ["leet","code"]', output: 'true' },
        { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: 'true' }
      ],
      hints: `DP on string. Time O(n²m), Space O(n)`
    },
    {
      id: 9,
      title: 'Triangle',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/triangle/',
      description: 'Find minimum path sum from top to bottom of triangle. Each step can move to adjacent numbers on the row below.',
      example: `Input: triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
Output: 11
Explanation: 2 → 3 → 5 → 1 (minimum path sum = 11)`,
      code: {
        java: {
          starterCode: `public int minimumTotal(List<List<Integer>> triangle) {
}`,
          solution: `public int minimumTotal(List<List<Integer>> triangle) {
    int n = triangle.size();
    int[] dp = new int[n];
    
    // Start from bottom row
    for (int i = 0; i < n; i++) {
        dp[i] = triangle.get(n - 1).get(i);
    }
    
    // Move up
    for (int row = n - 2; row >= 0; row--) {
        for (int col = 0; col <= row; col++) {
            dp[col] = triangle.get(row).get(col) + Math.min(dp[col], dp[col + 1]);
        }
    }
    
    return dp[0];
}`
        },
        python: {
          starterCode: `def minimumTotal(self, triangle: List[List[int]]) -> int:
    pass`,
          solution: `def minimumTotal(self, triangle: List[List[int]]) -> int:
    n = len(triangle)
    dp = triangle[-1][:]
    
    for row in range(n - 2, -1, -1):
        for col in range(len(triangle[row])):
            dp[col] = triangle[row][col] + min(dp[col], dp[col + 1])
    
    return dp[0]`
        }
      },
      testCases: [
        { input: 'triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]', output: '11' }
      ],
      hints: `Bottom-up DP. Time O(n²), Space O(n)`
    },
    {
      id: 10,
      title: 'Minimum Path Sum',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/minimum-path-sum/',
      description: 'Find path from top-left to bottom-right with minimum sum. Can only move down or right.',
      example: `Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7
Explanation: Path 1→3→1→1→1 = 7`,
      code: {
        java: {
          starterCode: `public int minPathSum(int[][] grid) {
}`,
          solution: `public int minPathSum(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (i == 0 && j == 0) continue;
            else if (i == 0) grid[i][j] += grid[i][j - 1];
            else if (j == 0) grid[i][j] += grid[i - 1][j];
            else grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
        }
    }
    
    return grid[m - 1][n - 1];
}`
        },
        python: {
          starterCode: `def minPathSum(self, grid: List[List[int]]) -> int:
    pass`,
          solution: `def minPathSum(self, grid: List[List[int]]) -> int:
    m, n = len(grid), len(grid[0])
    
    for i in range(m):
        for j in range(n):
            if i == 0 and j == 0:
                continue
            elif i == 0:
                grid[i][j] += grid[i][j - 1]
            elif j == 0:
                grid[i][j] += grid[i - 1][j]
            else:
                grid[i][j] += min(grid[i - 1][j], grid[i][j - 1])
    
    return grid[m - 1][n - 1]`
        }
      },
      testCases: [
        { input: 'grid = [[1,3,1],[1,5,1],[4,2,1]]', output: '7' }
      ],
      hints: `2D DP. Time O(mn), Space O(1)`
    },
    {
      id: 11,
      title: 'Unique Paths II',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/unique-paths-ii/',
      description: 'Count unique paths from top-left to bottom-right with obstacles.',
      example: `Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: 3x3 grid with obstacle at (1,1). Two paths exist.`,
      code: {
        java: {
          starterCode: `public int uniquePathsWithObstacles(int[][] obstacleGrid) {
}`,
          solution: `public int uniquePathsWithObstacles(int[][] obstacleGrid) {
    int m = obstacleGrid.length, n = obstacleGrid[0].length;
    
    if (obstacleGrid[0][0] == 1) return 0;
    
    int[] dp = new int[n];
    dp[0] = 1;
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (obstacleGrid[i][j] == 1) {
                dp[j] = 0;
            } else if (j > 0) {
                dp[j] += dp[j - 1];
            }
        }
    }
    
    return dp[n - 1];
}`
        },
        python: {
          starterCode: `def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
    pass`,
          solution: `def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
    m, n = len(obstacleGrid), len(obstacleGrid[0])
    
    if obstacleGrid[0][0] == 1:
        return 0
    
    dp = [0] * n
    dp[0] = 1
    
    for i in range(m):
        for j in range(n):
            if obstacleGrid[i][j] == 1:
                dp[j] = 0
            elif j > 0:
                dp[j] += dp[j - 1]
    
    return dp[n - 1]`
        }
      },
      testCases: [
        { input: 'obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]', output: '2' }
      ],
      hints: `1D DP array. Time O(mn), Space O(n)`
    },
    {
      id: 12,
      title: 'Longest Palindromic Substring',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring/',
      description: 'Find longest palindromic substring in s.',
      example: `Input: s = "babad"
Output: "bab" (or "aba")`,
      code: {
        java: {
          starterCode: `public String longestPalindrome(String s) {
}`,
          solution: `public String longestPalindrome(String s) {
    if (s == null || s.length() < 1) return "";
    
    int start = 0, end = 0;
    
    for (int i = 0; i < s.length(); i++) {
        int len1 = expandAroundCenter(s, i, i);
        int len2 = expandAroundCenter(s, i, i + 1);
        int len = Math.max(len1, len2);
        
        if (len > end - start) {
            start = i - (len - 1) / 2;
            end = i + len / 2;
        }
    }
    
    return s.substring(start, end + 1);
}

private int expandAroundCenter(String s, int left, int right) {
    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
        left--;
        right++;
    }
    return right - left - 1;
}`
        },
        python: {
          starterCode: `def longestPalindrome(self, s: str) -> str:
    pass`,
          solution: `def longestPalindrome(self, s: str) -> str:
    if not s:
        return ""
    
    start = end = 0
    
    def expand_around_center(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return right - left - 1
    
    for i in range(len(s)):
        len1 = expand_around_center(i, i)
        len2 = expand_around_center(i, i + 1)
        length = max(len1, len2)
        
        if length > end - start:
            start = i - (length - 1) // 2
            end = i + length // 2
    
    return s[start:end + 1]`
        }
      },
      testCases: [
        { input: 's = "babad"', output: '"bab"' },
        { input: 's = "cbbd"', output: '"bb"' }
      ],
      hints: `Expand around center. Time O(n²), Space O(1)`
    },
    {
      id: 13,
      title: 'Interleaving String',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/interleaving-string/',
      description: 'Check if s3 is formed by interleaving s1 and s2.',
      example: `Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
Output: true`,
      code: {
        java: {
          starterCode: `public boolean isInterleave(String s1, String s2, String s3) {
}`,
          solution: `public boolean isInterleave(String s1, String s2, String s3) {
    if (s1.length() + s2.length() != s3.length()) return false;
    
    boolean[] dp = new boolean[s2.length() + 1];
    
    for (int i = 0; i <= s1.length(); i++) {
        for (int j = 0; j <= s2.length(); j++) {
            if (i == 0 && j == 0) {
                dp[j] = true;
            } else if (i == 0) {
                dp[j] = dp[j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1);
            } else if (j == 0) {
                dp[j] = dp[j] && s1.charAt(i - 1) == s3.charAt(i + j - 1);
            } else {
                dp[j] = (dp[j] && s1.charAt(i - 1) == s3.charAt(i + j - 1)) ||
                        (dp[j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1));
            }
        }
    }
    
    return dp[s2.length()];
}`
        },
        python: {
          starterCode: `def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
    pass`,
          solution: `def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
    if len(s1) + len(s2) != len(s3):
        return False
    
    dp = [False] * (len(s2) + 1)
    
    for i in range(len(s1) + 1):
        for j in range(len(s2) + 1):
            if i == 0 and j == 0:
                dp[j] = True
            elif i == 0:
                dp[j] = dp[j - 1] and s2[j - 1] == s3[i + j - 1]
            elif j == 0:
                dp[j] = dp[j] and s1[i - 1] == s3[i + j - 1]
            else:
                dp[j] = (dp[j] and s1[i - 1] == s3[i + j - 1]) or                         (dp[j - 1] and s2[j - 1] == s3[i + j - 1])
    
    return dp[len(s2)]`
        }
      },
      testCases: [
        { input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"', output: 'true' }
      ],
      hints: `2D DP. Time O(mn), Space O(n)`
    },
    {
      id: 14,
      title: 'Edit Distance',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/edit-distance/',
      description: 'Minimum operations (insert, delete, replace) to convert word1 to word2.',
      example: `Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: horse → rorse → rose → ros`,
      code: {
        java: {
          starterCode: `public int minDistance(String word1, String word2) {
}`,
          solution: `public int minDistance(String word1, String word2) {
    int m = word1.length(), n = word2.length();
    int[] dp = new int[n + 1];
    
    for (int j = 0; j <= n; j++) {
        dp[j] = j;
    }
    
    for (int i = 1; i <= m; i++) {
        int prev = dp[0];
        dp[0] = i;
        
        for (int j = 1; j <= n; j++) {
            int temp = dp[j];
            
            if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                dp[j] = prev;
            } else {
                dp[j] = 1 + Math.min(prev, Math.min(dp[j], dp[j - 1]));
            }
            
            prev = temp;
        }
    }
    
    return dp[n];
}`
        },
        python: {
          starterCode: `def minDistance(self, word1: str, word2: str) -> int:
    pass`,
          solution: `def minDistance(self, word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = list(range(n + 1))
    
    for i in range(1, m + 1):
        prev = dp[0]
        dp[0] = i
        
        for j in range(1, n + 1):
            temp = dp[j]
            
            if word1[i - 1] == word2[j - 1]:
                dp[j] = prev
            else:
                dp[j] = 1 + min(prev, dp[j], dp[j - 1])
            
            prev = temp
    
    return dp[n]`
        }
      },
      testCases: [
        { input: 'word1 = "horse", word2 = "ros"', output: '3' },
        { input: 'word1 = "intention", word2 = "execution"', output: '5' }
      ],
      hints: `2D DP optimized to 1D. Time O(mn), Space O(n)`
    },
    {
      id: 15,
      title: 'Best Time to Buy and Sell Stock III',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/',
      description: 'Maximum profit with at most 2 transactions.',
      example: `Input: prices = [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3. Buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 3.`,
      code: {
        java: {
          starterCode: `public int maxProfit(int[] prices) {
}`,
          solution: `public int maxProfit(int[] prices) {
    int buy1 = Integer.MAX_VALUE, buy2 = Integer.MAX_VALUE;
    int sell1 = 0, sell2 = 0;
    
    for (int price : prices) {
        buy1 = Math.min(buy1, price);
        sell1 = Math.max(sell1, price - buy1);
        buy2 = Math.min(buy2, price - sell1);
        sell2 = Math.max(sell2, price - buy2);
    }
    
    return sell2;
}`
        },
        python: {
          starterCode: `def maxProfit(self, prices: List[int]) -> int:
    pass`,
          solution: `def maxProfit(self, prices: List[int]) -> int:
    buy1 = buy2 = float('inf')
    sell1 = sell2 = 0
    
    for price in prices:
        buy1 = min(buy1, price)
        sell1 = max(sell1, price - buy1)
        buy2 = min(buy2, price - sell1)
        sell2 = max(sell2, price - buy2)
    
    return sell2`
        }
      },
      testCases: [
        { input: 'prices = [3,3,5,0,0,3,1,4]', output: '6' },
        { input: 'prices = [1,2,3,4,5]', output: '4' }
      ],
      hints: `Track 2 buy/sell states. Time O(n), Space O(1)`
    },
    {
      id: 16,
      title: 'Best Time to Buy and Sell Stock IV',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/',
      description: 'Maximum profit with at most k transactions.',
      example: `Input: k = 2, prices = [2,4,1]
Output: 2
Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 2.`,
      code: {
        java: {
          starterCode: `public int maxProfit(int k, int[] prices) {
}`,
          solution: `public int maxProfit(int k, int[] prices) {
    if (prices.length == 0) return 0;
    
    if (k >= prices.length / 2) {
        int profit = 0;
        for (int i = 1; i < prices.length; i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }
    
    int[] buy = new int[k];
    int[] sell = new int[k];
    
    Arrays.fill(buy, Integer.MAX_VALUE);
    
    for (int price : prices) {
        for (int i = 0; i < k; i++) {
            if (i == 0) {
                buy[i] = Math.min(buy[i], price);
                sell[i] = Math.max(sell[i], price - buy[i]);
            } else {
                buy[i] = Math.min(buy[i], price - sell[i - 1]);
                sell[i] = Math.max(sell[i], price - buy[i]);
            }
        }
    }
    
    return sell[k - 1];
}`
        },
        python: {
          starterCode: `def maxProfit(self, k: int, prices: List[int]) -> int:
    pass`,
          solution: `def maxProfit(self, k: int, prices: List[int]) -> int:
    if not prices:
        return 0
    
    if k >= len(prices) // 2:
        profit = 0
        for i in range(1, len(prices)):
            if prices[i] > prices[i - 1]:
                profit += prices[i] - prices[i - 1]
        return profit
    
    buy = [float('inf')] * k
    sell = [0] * k
    
    for price in prices:
        for i in range(k):
            if i == 0:
                buy[i] = min(buy[i], price)
                sell[i] = max(sell[i], price - buy[i])
            else:
                buy[i] = min(buy[i], price - sell[i - 1])
                sell[i] = max(sell[i], price - buy[i])
    
    return sell[k - 1]`
        }
      },
      testCases: [
        { input: 'k = 2, prices = [2,4,1]', output: '2' },
        { input: 'k = 2, prices = [3,2,6,5,0,3]', output: '7' }
      ],
      hints: `Track k buy/sell states. Time O(nk), Space O(k)`
    },
    {
      id: 17,
      title: 'Maximal Square',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/maximal-square/',
      description: 'Find largest square containing only 1s in binary matrix.',
      example: `Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 4`,
      code: {
        java: {
          starterCode: `public int maximalSquare(char[][] matrix) {
}`,
          solution: `public int maximalSquare(char[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    int[] dp = new int[n + 1];
    int maxSide = 0, prev = 0;
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            int temp = dp[j];
            
            if (matrix[i - 1][j - 1] == '1') {
                dp[j] = 1 + Math.min(prev, Math.min(dp[j], dp[j - 1]));
                maxSide = Math.max(maxSide, dp[j]);
            } else {
                dp[j] = 0;
            }
            
            prev = temp;
        }
    }
    
    return maxSide * maxSide;
}`
        },
        python: {
          starterCode: `def maximalSquare(self, matrix: List[List[str]]) -> int:
    pass`,
          solution: `def maximalSquare(self, matrix: List[List[str]]) -> int:
    m, n = len(matrix), len(matrix[0])
    dp = [0] * (n + 1)
    max_side = 0
    prev = 0
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            temp = dp[j]
            
            if matrix[i - 1][j - 1] == '1':
                dp[j] = 1 + min(prev, dp[j], dp[j - 1])
                max_side = max(max_side, dp[j])
            else:
                dp[j] = 0
            
            prev = temp
    
    return max_side * max_side`
        }
      },
      testCases: [
        { input: 'matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]', output: '4' }
      ],
      hints: `2D DP optimized to 1D. Time O(mn), Space O(n)`
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Dynamic Programming-${q.id}`)).length
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
    const savedDrawing = localStorage.getItem(`drawing-DynamicProgramming-${question.id}`)
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
      ? [...breadcrumbStack.slice(0, -1), { name: 'Dynamic Programming', page: null }, { name: selectedQuestion.title, page: null }]
      : null

    // Fallback to legacy format
    const problemBreadcrumb = {
      ...breadcrumb,
      category: { name: 'Dynamic Programming', onClick: () => setSelectedQuestion(null) },
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
            ← Back to Dynamic Programming
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
          <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: 'white', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <CompletionCheckbox problemId={`Dynamic Programming-${selectedQuestion.id}`} />
              <BookmarkButton
                problemId={`DynamicProgramming-${selectedQuestion.id}`}
                problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'DynamicProgramming' }}
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
                  <div key={idx} style={{ backgroundColor: '#1f2937', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #374151', color: '#9ca3af' }}>
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
                🎨 {currentDrawing ? 'View' : 'Draw'} Sketch
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
            const savedDrawing = localStorage.getItem(`drawing-DynamicProgramming-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`DynamicProgramming-${selectedQuestion.id}`}
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
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem' }}>Dynamic Programming</h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>Master dynamic programming problems</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '2px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: 'white' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '2px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.percentage}%</div>
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
                          <CompletionCheckbox problemId={`Dynamic Programming-${question.id}`} />
                        </div>
                        <BookmarkButton
                          size="small"
                          problemId={`DynamicProgramming-${question.id}`}
                          problemData={{ title: question.title, difficulty: question.difficulty, category: 'DynamicProgramming' }}
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

export default DynamicProgramming
