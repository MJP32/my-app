import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function BinarySearchTrees({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory }) {
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
      title: 'Validate Binary Search Tree',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/',
      description: 'Determine if a binary tree is a valid Binary Search Tree. In a BST, the left subtree contains only nodes with values less than the parent, and the right subtree only nodes with values greater.',
      example: `Input: root = [2,1,3]
    2
   / \\
  1   3
Output: true

Input: root = [5,1,4,null,null,3,6]
    5
   / \\
  1   4
     / \\
    3   6
Output: false (4's subtree contains 3 which is < 5)`,
      code: {
        java: {
          starterCode: `public boolean isValidBST(TreeNode root) {
    // Write your code here

}`,
          solution: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return validate(root, null, null);
    }

    private boolean validate(TreeNode node, Integer min, Integer max) {
        if (node == null) return true;

        // Check if current node violates BST property
        if ((min != null && node.val <= min) ||
            (max != null && node.val >= max)) {
            return false;
        }

        // Recursively validate left and right subtrees
        return validate(node.left, min, node.val) &&
               validate(node.right, node.val, max);
    }
}

// Alternative: Using inorder traversal (should be sorted)
class SolutionInorder {
    private Integer prev = null;

    public boolean isValidBST(TreeNode root) {
        if (root == null) return true;

        // Check left subtree
        if (!isValidBST(root.left)) return false;

        // Check current node
        if (prev != null && root.val <= prev) return false;
        prev = root.val;

        // Check right subtree
        return isValidBST(root.right);
    }
}

// Iterative inorder approach
class SolutionIterative {
    public boolean isValidBST(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode curr = root;
        Integer prev = null;

        while (curr != null || !stack.isEmpty()) {
            while (curr != null) {
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();

            if (prev != null && curr.val <= prev) {
                return false;
            }
            prev = curr.val;
            curr = curr.right;
        }
        return true;
    }
}`
        },
        python: {
          starterCode: `def isValidBST(self, root: Optional[TreeNode]) -> bool:
    # Write your code here
    pass`,
          solution: `class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        return self._validate(root, None, None)

    def _validate(self, node, min_val, max_val):
        if not node:
            return True

        # Check if current node violates BST property
        if (min_val is not None and node.val <= min_val) or \\
           (max_val is not None and node.val >= max_val):
            return False

        # Recursively validate left and right subtrees
        return (self._validate(node.left, min_val, node.val) and
                self._validate(node.right, node.val, max_val))


# Alternative: Using inorder traversal (should be sorted)
class SolutionInorder:
    def __init__(self):
        self.prev = None

    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        if not root:
            return True

        # Check left subtree
        if not self.isValidBST(root.left):
            return False

        # Check current node
        if self.prev is not None and root.val <= self.prev:
            return False
        self.prev = root.val

        # Check right subtree
        return self.isValidBST(root.right)


# Iterative inorder approach
class SolutionIterative:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        stack = []
        curr = root
        prev = None

        while curr or stack:
            while curr:
                stack.append(curr)
                curr = curr.left
            curr = stack.pop()

            if prev is not None and curr.val <= prev:
                return False
            prev = curr.val
            curr = curr.right

        return True`
        }
      },
      testCases: [
        { input: 'root = [2,1,3]', output: 'true' },
        { input: 'root = [5,1,4,null,null,3,6]', output: 'false' },
        { input: 'root = [1,1]', output: 'false' }
      ],
      explanation: `**Problem:** Validate if a binary tree satisfies Binary Search Tree properties. **Tricky**: Must consider ALL ancestors, not just parent!

**BST Definition:**
- ALL nodes in left subtree < node.val
- ALL nodes in right subtree > node.val
- Both subtrees are also BSTs
- No duplicate values (in this problem)

**Common Mistake:**
Many try: \`node.left.val < node.val < node.right.val\`
**This is WRONG!** Only checks immediate children.

**Example of Mistake:**
    5
   / \\
  1   4
     / \\
    3   6

Checking only immediate children: looks valid
But 3 < 5, so 3 shouldn't be in right subtree → INVALID!

**Approach 1: Range Validation (Best)**
- Track valid range [min, max] for each node
- Root can be any value: range = (-∞, +∞)
- For left child: inherit min, set max = parent.val
- For right child: set min = parent.val, inherit max
- Check: min < node.val < max at each node

**Approach 2: Inorder Traversal**
- Key insight: Inorder of BST must be sorted!
- Do inorder traversal, track previous value
- If curr <= prev → invalid
- Simple but requires O(n) space or careful state management

**Approach 3: Iterative Inorder**
- Same idea, using explicit stack
- Avoids recursion state issues

**Complexity:**
- Time: O(n) - visit each node once
- Space: O(h) for recursion stack, where h = height`,
      pseudocode: `Approach 1: Range Validation
-----------------------
isValidBST(root):
    return validate(root, null, null)

validate(node, min, max):
    if node is null:
        return true

    // Check current node violates range
    if (min != null && node.val <= min) OR
       (max != null && node.val >= max):
        return false

    // Left: must be < node.val
    // Right: must be > node.val
    return validate(node.left, min, node.val) AND
           validate(node.right, node.val, max)

Example:      5
             / \\
            1   4
               / \\
              3   6

validate(5, null, null):
  Check: null < 5 < null ✓
  Left: validate(1, null, 5):
    Check: null < 1 < 5 ✓
    Both children null → true
  Right: validate(4, 5, null):
    Check: 5 < 4 < null ✗ FAILS!
    4 is not > 5!

Result: false

Approach 2: Inorder Traversal
-----------------------
prev = null

isValidBST(node):
    if node is null:
        return true

    // Check left subtree
    if not isValidBST(node.left):
        return false

    // Check current node
    if prev != null AND node.val <= prev:
        return false
    prev = node.val

    // Check right subtree
    return isValidBST(node.right)

Example: [2,1,3]
    2
   / \\
  1   3

Inorder: 1, 2, 3 → sorted ✓

Example: [5,1,4,null,null,3,6]
    5
   / \\
  1   4
     / \\
    3   6

Inorder: 1, 5, 3, 6
Compare: 1 < 5 ✓, 5 > 3 ✗ FAILS!

Result: false`
    },
    {
      id: 2,
      title: 'Minimum Absolute Difference in BST',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/minimum-absolute-difference-in-bst/',
      description: 'Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.',
      example: `Input: root = [4,2,6,1,3]
    4
   / \\
  2   6
 / \\
1   3
Output: 1
Explanation: Minimum difference is between 2 and 1, or 2 and 3

Input: root = [1,0,48,null,null,12,49]
      1
     / \\
    0   48
       / \\
      12  49
Output: 1`,
      code: {
        java: {
          starterCode: `public int getMinimumDifference(TreeNode root) {
    // Write your code here

}`,
          solution: `class Solution {
    private Integer prev = null;
    private int minDiff = Integer.MAX_VALUE;

    public int getMinimumDifference(TreeNode root) {
        // Inorder traversal of BST gives sorted sequence
        inorder(root);
        return minDiff;
    }

    private void inorder(TreeNode node) {
        if (node == null) return;

        // Left subtree
        inorder(node.left);

        // Process current node
        if (prev != null) {
            minDiff = Math.min(minDiff, node.val - prev);
        }
        prev = node.val;

        // Right subtree
        inorder(node.right);
    }
}

// Alternative: Iterative approach
class SolutionIterative {
    public int getMinimumDifference(TreeNode root) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode curr = root;
        Integer prev = null;
        int minDiff = Integer.MAX_VALUE;

        while (curr != null || !stack.isEmpty()) {
            while (curr != null) {
                stack.push(curr);
                curr = curr.left;
            }

            curr = stack.pop();

            if (prev != null) {
                minDiff = Math.min(minDiff, curr.val - prev);
            }
            prev = curr.val;

            curr = curr.right;
        }

        return minDiff;
    }
}

// Using List to store values
class SolutionWithList {
    public int getMinimumDifference(TreeNode root) {
        List<Integer> values = new ArrayList<>();
        inorder(root, values);

        int minDiff = Integer.MAX_VALUE;
        for (int i = 1; i < values.size(); i++) {
            minDiff = Math.min(minDiff, values.get(i) - values.get(i - 1));
        }

        return minDiff;
    }

    private void inorder(TreeNode node, List<Integer> values) {
        if (node == null) return;
        inorder(node.left, values);
        values.add(node.val);
        inorder(node.right, values);
    }
}`
        },
        python: {
          starterCode: `def getMinimumDifference(self, root: Optional[TreeNode]) -> int:
    # Write your code here
    pass`,
          solution: `class Solution:
    def getMinimumDifference(self, root: Optional[TreeNode]) -> int:
        self.prev = None
        self.min_diff = float('inf')

        def inorder(node):
            if not node:
                return

            # Left subtree
            inorder(node.left)

            # Process current node
            if self.prev is not None:
                self.min_diff = min(self.min_diff, node.val - self.prev)
            self.prev = node.val

            # Right subtree
            inorder(node.right)

        inorder(root)
        return self.min_diff


# Alternative: Iterative approach
class SolutionIterative:
    def getMinimumDifference(self, root: Optional[TreeNode]) -> int:
        stack = []
        curr = root
        prev = None
        min_diff = float('inf')

        while curr or stack:
            while curr:
                stack.append(curr)
                curr = curr.left

            curr = stack.pop()

            if prev is not None:
                min_diff = min(min_diff, curr.val - prev)
            prev = curr.val

            curr = curr.right

        return min_diff


# Using list to store values
class SolutionWithList:
    def getMinimumDifference(self, root: Optional[TreeNode]) -> int:
        values = []

        def inorder(node):
            if not node:
                return
            inorder(node.left)
            values.append(node.val)
            inorder(node.right)

        inorder(root)

        min_diff = float('inf')
        for i in range(1, len(values)):
            min_diff = min(min_diff, values[i] - values[i-1])

        return min_diff`
        }
      },
      testCases: [
        { input: 'root = [4,2,6,1,3]', output: '1' },
        { input: 'root = [1,0,48,null,null,12,49]', output: '1' },
        { input: 'root = [5,3,7]', output: '2' }
      ],
      explanation: `**Problem:** Find the minimum absolute difference between any two nodes in a BST.

**Key Insight:** In a BST, inorder traversal gives a sorted sequence. The minimum difference will always be between adjacent elements in this sorted sequence!

**Why Inorder?**
- Inorder of BST produces values in ascending order
- Minimum difference must be between consecutive values
- No need to compare all pairs - just adjacent pairs in sorted order

**Approach 1: Inorder with Previous Tracking**
1. Perform inorder traversal (left → root → right)
2. Track the previous node's value
3. At each node, calculate: current.val - previous.val
4. Update minimum if smaller difference found
5. Time O(n), Space O(h) for recursion

**Approach 2: Iterative Inorder**
- Same logic but using explicit stack
- Avoids recursion overhead
- Better for very deep trees

**Approach 3: Collect Values First**
- Do inorder, store all values in list
- Then iterate through list finding min difference
- Simpler but uses O(n) space

**Common Mistake:** Comparing all pairs would be O(n²). We don't need that because BST's inorder is sorted!

**Complexity:** Time O(n), Space O(h) where h = tree height`,
      pseudocode: `Inorder with Previous Tracking:
-----------------------
prev = null
minDiff = infinity

getMinimumDifference(root):
    inorder(root)
    return minDiff

inorder(node):
    if node is null:
        return

    // Process left subtree
    inorder(node.left)

    // Process current node
    if prev is not null:
        minDiff = min(minDiff, node.val - prev)
    prev = node.val

    // Process right subtree
    inorder(node.right)

Example:    4
           / \\
          2   6
         / \\
        1   3

Inorder traversal: 1, 2, 3, 4, 6
- Visit 1: prev=null, set prev=1
- Visit 2: diff=2-1=1, minDiff=1, prev=2
- Visit 3: diff=3-2=1, minDiff=1, prev=3
- Visit 4: diff=4-3=1, minDiff=1, prev=4
- Visit 6: diff=6-4=2, minDiff=1, prev=6
Result: 1

Iterative Approach:
-----------------------
stack = []
curr = root
prev = null
minDiff = infinity

while curr != null OR stack not empty:
    // Go to leftmost
    while curr != null:
        stack.push(curr)
        curr = curr.left

    curr = stack.pop()

    // Process current
    if prev != null:
        minDiff = min(minDiff, curr.val - prev)
    prev = curr.val

    // Move to right
    curr = curr.right

return minDiff`
    },
    {
      id: 3,
      title: 'Kth Smallest Element in a BST',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',
      description: 'Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.',
      example: `Input: root = [3,1,4,null,2], k = 1
   3
  / \\
 1   4
  \\
   2
Output: 1

Input: root = [5,3,6,2,4,null,null,1], k = 3
       5
      / \\
     3   6
    / \\
   2   4
  /
 1
Output: 3
Explanation: Inorder: [1,2,3,4,5,6], 3rd smallest is 3`,
      code: {
        java: {
          starterCode: `public int kthSmallest(TreeNode root, int k) {
    // Write your code here

}`,
          solution: `class Solution {
    private int count = 0;
    private int result = 0;

    public int kthSmallest(TreeNode root, int k) {
        inorder(root, k);
        return result;
    }

    private void inorder(TreeNode node, int k) {
        if (node == null) return;

        // Left subtree
        inorder(node.left, k);

        // Process current node
        count++;
        if (count == k) {
            result = node.val;
            return;
        }

        // Right subtree
        inorder(node.right, k);
    }
}

// Iterative approach with early termination
class SolutionIterative {
    public int kthSmallest(TreeNode root, int k) {
        Stack<TreeNode> stack = new Stack<>();
        TreeNode curr = root;
        int count = 0;

        while (curr != null || !stack.isEmpty()) {
            while (curr != null) {
                stack.push(curr);
                curr = curr.left;
            }

            curr = stack.pop();
            count++;

            if (count == k) {
                return curr.val;
            }

            curr = curr.right;
        }

        return -1; // Should never reach here if k is valid
    }
}

// With follow-up: What if BST is modified often?
class SolutionWithAugmentation {
    class NodeWithCount {
        int val;
        int leftCount; // Number of nodes in left subtree
        NodeWithCount left, right;

        NodeWithCount(int val) {
            this.val = val;
            this.leftCount = 0;
        }
    }

    // During insertion, maintain leftCount
    public int kthSmallest(NodeWithCount root, int k) {
        int leftCount = root.leftCount;

        if (k <= leftCount) {
            // kth element is in left subtree
            return kthSmallest(root.left, k);
        } else if (k == leftCount + 1) {
            // Current node is kth element
            return root.val;
        } else {
            // kth element is in right subtree
            return kthSmallest(root.right, k - leftCount - 1);
        }
    }
}

// Using List (simple but requires O(n) space)
class SolutionWithList {
    public int kthSmallest(TreeNode root, int k) {
        List<Integer> values = new ArrayList<>();
        inorder(root, values);
        return values.get(k - 1);
    }

    private void inorder(TreeNode node, List<Integer> values) {
        if (node == null) return;
        inorder(node.left, values);
        values.add(node.val);
        inorder(node.right, values);
    }
}`
        },
        python: {
          starterCode: `def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
    # Write your code here
    pass`,
          solution: `class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        self.count = 0
        self.result = 0

        def inorder(node):
            if not node:
                return

            # Left subtree
            inorder(node.left)

            # Process current node
            self.count += 1
            if self.count == k:
                self.result = node.val
                return

            # Right subtree
            inorder(node.right)

        inorder(root)
        return self.result


# Iterative approach with early termination
class SolutionIterative:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack = []
        curr = root
        count = 0

        while curr or stack:
            while curr:
                stack.append(curr)
                curr = curr.left

            curr = stack.pop()
            count += 1

            if count == k:
                return curr.val

            curr = curr.right

        return -1  # Should never reach here if k is valid


# Using list (simple but requires O(n) space)
class SolutionWithList:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        values = []

        def inorder(node):
            if not node:
                return
            inorder(node.left)
            values.append(node.val)
            inorder(node.right)

        inorder(root)
        return values[k - 1]


# Using generator for memory efficiency
class SolutionGenerator:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        def inorder(node):
            if not node:
                return
            yield from inorder(node.left)
            yield node.val
            yield from inorder(node.right)

        # Get kth element from generator
        for i, val in enumerate(inorder(root), 1):
            if i == k:
                return val

        return -1`
        }
      },
      testCases: [
        { input: 'root = [3,1,4,null,2], k = 1', output: '1' },
        { input: 'root = [5,3,6,2,4,null,null,1], k = 3', output: '3' },
        { input: 'root = [1,null,2], k = 2', output: '2' }
      ],
      explanation: `**Problem:** Find the kth smallest element in a BST (1-indexed).

**Key Insight:** Inorder traversal of BST gives elements in sorted order. The kth element in inorder traversal is the kth smallest!

**Approach 1: Inorder with Counter**
1. Perform inorder traversal
2. Increment counter at each node
3. When counter == k, we found our answer
4. Can terminate early (no need to visit remaining nodes)
5. Time O(k) best case, O(n) worst case, Space O(h)

**Approach 2: Iterative Inorder**
- Use explicit stack for inorder traversal
- Count nodes as we visit them
- Return when count reaches k
- Advantage: Easy to terminate early
- Time O(k) average, Space O(h)

**Approach 3: Collect All Values**
- Do complete inorder, store in list
- Return list[k-1]
- Simpler but always O(n) time and space
- Good if we need to query multiple k values

**Follow-up: Frequent BST Modifications**
If the BST is modified often, augment each node with:
- leftCount = number of nodes in left subtree
- Then: if k <= leftCount → search left
- if k == leftCount + 1 → current is answer
- if k > leftCount + 1 → search right with k' = k - leftCount - 1
- Time O(h) per query!

**Complexity:** Time O(k) to O(n), Space O(h) for recursion stack`,
      pseudocode: `Inorder with Counter:
-----------------------
count = 0
result = 0

kthSmallest(root, k):
    inorder(root, k)
    return result

inorder(node, k):
    if node is null:
        return

    // Process left subtree
    inorder(node.left, k)

    // Process current node
    count++
    if count == k:
        result = node.val
        return  // Early termination

    // Process right subtree
    inorder(node.right, k)

Example:     5
            / \\
           3   6
          / \\
         2   4
        /
       1

Find k=3:
Inorder traversal: 1, 2, 3, 4, 5, 6
- Visit 1: count=1
- Visit 2: count=2
- Visit 3: count=3 → return 3 ✓

Iterative Approach:
-----------------------
stack = []
curr = root
count = 0

while curr != null OR stack not empty:
    // Go to leftmost
    while curr != null:
        stack.push(curr)
        curr = curr.left

    curr = stack.pop()
    count++

    if count == k:
        return curr.val  // Found kth smallest

    curr = curr.right

return -1

With Augmentation (for frequent queries):
-----------------------
// Each node has: val, leftCount, left, right

kthSmallest(node, k):
    if node is null:
        return -1

    leftCount = node.leftCount

    if k <= leftCount:
        // kth is in left subtree
        return kthSmallest(node.left, k)
    elif k == leftCount + 1:
        // Current node is kth
        return node.val
    else:
        // kth is in right subtree
        return kthSmallest(node.right, k - leftCount - 1)

Time: O(h) per query!`
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Binary Search Trees-${q.id}`)).length
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
    const savedDrawing = localStorage.getItem(`drawing-BinarySearchTrees-${question.id}`)
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
              <CompletionCheckbox problemId={`Binary Search Trees-${selectedQuestion.id}`} />
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
            const savedDrawing = localStorage.getItem(`drawing-BinarySearchTrees-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`BinarySearchTrees-${selectedQuestion.id}`}
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
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>🌳 Binary Search Trees</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Master binary search trees problems</p>

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
                          <CompletionCheckbox problemId={`Binary Search Trees-${question.id}`} />
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

export default BinarySearchTrees
