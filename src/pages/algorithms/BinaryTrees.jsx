import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function BinaryTrees({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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
      title: 'Binary Tree Inorder Traversal',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
      description: 'Implement all three depth-first traversals (in-order, pre-order, post-order) and breadth-first (level-order) traversal for a binary tree.',
      examples: [
        { input: 'root = [1,null,2,3]', output: 'Inorder: [1,3,2], Preorder: [1,2,3], Postorder: [3,2,1], Level-order: [1,2,3]' }
      ],
      code: {
        java: {
          starterCode: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

public List<Integer> inorderTraversal(TreeNode root) {
    // Write your code here

}`,
          solution: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

class Solution {
    // Inorder: Left -> Root -> Right (Recursive)
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        inorderHelper(root, result);
        return result;
    }

    private void inorderHelper(TreeNode node, List<Integer> result) {
        if (node == null) return;
        inorderHelper(node.left, result);
        result.add(node.val);
        inorderHelper(node.right, result);
    }

    // Inorder: Iterative using stack
    public List<Integer> inorderIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode curr = root;

        while (curr != null || !stack.isEmpty()) {
            while (curr != null) {
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            result.add(curr.val);
            curr = curr.right;
        }
        return result;
    }

    // Preorder: Root -> Left -> Right (Recursive)
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        preorderHelper(root, result);
        return result;
    }

    private void preorderHelper(TreeNode node, List<Integer> result) {
        if (node == null) return;
        result.add(node.val);
        preorderHelper(node.left, result);
        preorderHelper(node.right, result);
    }

    // Preorder: Iterative using stack
    public List<Integer> preorderIterative(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;

        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            result.add(node.val);
            if (node.right != null) stack.push(node.right);
            if (node.left != null) stack.push(node.left);
        }
        return result;
    }

    // Postorder: Left -> Right -> Root (Recursive)
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        postorderHelper(root, result);
        return result;
    }

    private void postorderHelper(TreeNode node, List<Integer> result) {
        if (node == null) return;
        postorderHelper(node.left, result);
        postorderHelper(node.right, result);
        result.add(node.val);
    }

    // Level-order: BFS using queue
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);

                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(currentLevel);
        }
        return result;
    }
}`
        },
        python: {
          starterCode: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
    # Write your code here
    pass`,
          solution: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    # Inorder: Left -> Root -> Right (Recursive)
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        result = []
        self._inorder_helper(root, result)
        return result

    def _inorder_helper(self, node, result):
        if not node:
            return
        self._inorder_helper(node.left, result)
        result.append(node.val)
        self._inorder_helper(node.right, result)

    # Inorder: Iterative using stack
    def inorderIterative(self, root: Optional[TreeNode]) -> List[int]:
        result = []
        stack = []
        curr = root

        while curr or stack:
            while curr:
                stack.append(curr)
                curr = curr.left
            curr = stack.pop()
            result.append(curr.val)
            curr = curr.right

        return result

    # Preorder: Root -> Left -> Right (Recursive)
    def preorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        result = []
        self._preorder_helper(root, result)
        return result

    def _preorder_helper(self, node, result):
        if not node:
            return
        result.append(node.val)
        self._preorder_helper(node.left, result)
        self._preorder_helper(node.right, result)

    # Preorder: Iterative using stack
    def preorderIterative(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []

        result = []
        stack = [root]

        while stack:
            node = stack.pop()
            result.append(node.val)
            if node.right:
                stack.append(node.right)
            if node.left:
                stack.append(node.left)

        return result

    # Postorder: Left -> Right -> Root (Recursive)
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        result = []
        self._postorder_helper(root, result)
        return result

    def _postorder_helper(self, node, result):
        if not node:
            return
        self._postorder_helper(node.left, result)
        self._postorder_helper(node.right, result)
        result.append(node.val)

    # Level-order: BFS using queue
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
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

        return result`
        }
      },
      testCases: [
        { input: 'root = [1,null,2,3]', output: 'Inorder: [1,3,2]' },
        { input: 'root = []', output: 'Inorder: []' },
        { input: 'root = [1]', output: 'Inorder: [1]' }
      ],
    },
    {
      id: 2,
      title: 'Lowest Common Ancestor',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
      description: 'Find the lowest common ancestor (LCA) of two nodes in a binary tree. The LCA is the lowest node that has both nodes as descendants.',
      examples: [
        { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1', output: '3 (LCA of 5 and 1 is 3)' }
      ],
      code: {
        java: {
          starterCode: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    // Write your code here

}`,
          solution: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // Base case
        if (root == null || root == p || root == q) {
            return root;
        }

        // Recursively search in left and right subtrees
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        // If both left and right are non-null, current node is LCA
        if (left != null && right != null) {
            return root;
        }

        // Otherwise, return the non-null side
        return left != null ? left : right;
    }
}

// For BST (more efficient)
class SolutionBST {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // Ensure p.val <= q.val
        if (p.val > q.val) {
            TreeNode temp = p;
            p = q;
            q = temp;
        }

        while (root != null) {
            // Both nodes are in left subtree
            if (root.val > q.val) {
                root = root.left;
            }
            // Both nodes are in right subtree
            else if (root.val < p.val) {
                root = root.right;
            }
            // Split point found (or one of the nodes)
            else {
                return root;
            }
        }
        return null;
    }
}

// With path tracking
class SolutionWithPath {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        List<TreeNode> pathP = new ArrayList<>();
        List<TreeNode> pathQ = new ArrayList<>();

        findPath(root, p, pathP);
        findPath(root, q, pathQ);

        TreeNode lca = null;
        for (int i = 0; i < Math.min(pathP.size(), pathQ.size()); i++) {
            if (pathP.get(i) == pathQ.get(i)) {
                lca = pathP.get(i);
            } else {
                break;
            }
        }
        return lca;
    }

    private boolean findPath(TreeNode root, TreeNode target, List<TreeNode> path) {
        if (root == null) return false;

        path.add(root);

        if (root == target) return true;

        if (findPath(root.left, target, path) ||
            findPath(root.right, target, path)) {
            return true;
        }

        path.remove(path.size() - 1);
        return false;
    }
}`
        },
        python: {
          starterCode: `def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
    # Write your code here
    pass`,
          solution: `class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        # Base case
        if not root or root == p or root == q:
            return root

        # Recursively search in left and right subtrees
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)

        # If both left and right are non-null, current node is LCA
        if left and right:
            return root

        # Otherwise, return the non-null side
        return left if left else right


# For BST (more efficient)
class SolutionBST:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        # Ensure p.val <= q.val
        if p.val > q.val:
            p, q = q, p

        while root:
            # Both nodes are in left subtree
            if root.val > q.val:
                root = root.left
            # Both nodes are in right subtree
            elif root.val < p.val:
                root = root.right
            # Split point found (or one of the nodes)
            else:
                return root

        return None


# With path tracking
class SolutionWithPath:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        path_p = []
        path_q = []

        self._find_path(root, p, path_p)
        self._find_path(root, q, path_q)

        lca = None
        for i in range(min(len(path_p), len(path_q))):
            if path_p[i] == path_q[i]:
                lca = path_p[i]
            else:
                break

        return lca

    def _find_path(self, root, target, path):
        if not root:
            return False

        path.append(root)

        if root == target:
            return True

        if (self._find_path(root.left, target, path) or
            self._find_path(root.right, target, path)):
            return True

        path.pop()
        return False`
        }
      },
      testCases: [
        { input: 'root = [3,5,1,6,2,0,8], p = 5, q = 1', output: '3' },
        { input: 'root = [3,5,1,6,2,0,8], p = 5, q = 4', output: '5' },
        { input: 'root = [1,2], p = 1, q = 2', output: '1' }
      ],
    },
    {
      id: 3,
      title: 'Maximum Depth of Binary Tree',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
      description: 'Find the maximum depth and diameter of a binary tree. Depth is the number of nodes along the longest path from root to leaf. Diameter is the length of the longest path between any two nodes.',
      examples: [
        { input: 'root = [1,2,3,4,5]', output: 'Max Depth: 3, Diameter: 3 (path: 4 -> 2 -> 1 -> 3)' }
      ],
      code: {
        java: {
          starterCode: `public int maxDepth(TreeNode root) {
    // Write your code here

}`,
          solution: `class Solution {
    // Maximum Depth (Height)
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }

    // Iterative BFS approach for depth
    public int maxDepthBFS(TreeNode root) {
        if (root == null) return 0;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int depth = 0;

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            depth++;

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
        }
        return depth;
    }

    // Diameter of Binary Tree
    private int diameter = 0;

    public int diameterOfBinaryTree(TreeNode root) {
        diameter = 0;
        height(root);
        return diameter;
    }

    private int height(TreeNode node) {
        if (node == null) return 0;

        int leftHeight = height(node.left);
        int rightHeight = height(node.right);

        // Update diameter (path through current node)
        diameter = Math.max(diameter, leftHeight + rightHeight);

        // Return height
        return 1 + Math.max(leftHeight, rightHeight);
    }
}

// Additional: Minimum Depth
class SolutionMinDepth {
    public int minDepth(TreeNode root) {
        if (root == null) return 0;

        // If one subtree is null, must go through the other
        if (root.left == null) return 1 + minDepth(root.right);
        if (root.right == null) return 1 + minDepth(root.left);

        // Both subtrees exist
        return 1 + Math.min(minDepth(root.left), minDepth(root.right));
    }

    // BFS approach (more efficient for skewed trees)
    public int minDepthBFS(TreeNode root) {
        if (root == null) return 0;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int depth = 1;

        while (!queue.isEmpty()) {
            int levelSize = queue.size();

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();

                // Found first leaf node
                if (node.left == null && node.right == null) {
                    return depth;
                }

                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            depth++;
        }
        return depth;
    }
}`
        },
        python: {
          starterCode: `def maxDepth(self, root: Optional[TreeNode]) -> int:
    # Write your code here
    pass`,
          solution: `class Solution:
    # Maximum Depth (Height)
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))

    # Iterative BFS approach for depth
    def maxDepthBFS(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0

        queue = deque([root])
        depth = 0

        while queue:
            level_size = len(queue)
            depth += 1

            for _ in range(level_size):
                node = queue.popleft()
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

        return depth

    # Diameter of Binary Tree
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        self.diameter = 0
        self._height(root)
        return self.diameter

    def _height(self, node):
        if not node:
            return 0

        left_height = self._height(node.left)
        right_height = self._height(node.right)

        # Update diameter (path through current node)
        self.diameter = max(self.diameter, left_height + right_height)

        # Return height
        return 1 + max(left_height, right_height)


# Additional: Minimum Depth
class SolutionMinDepth:
    def minDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0

        # If one subtree is null, must go through the other
        if not root.left:
            return 1 + self.minDepth(root.right)
        if not root.right:
            return 1 + self.minDepth(root.left)

        # Both subtrees exist
        return 1 + min(self.minDepth(root.left), self.minDepth(root.right))

    # BFS approach (more efficient for skewed trees)
    def minDepthBFS(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0

        queue = deque([root])
        depth = 1

        while queue:
            level_size = len(queue)

            for _ in range(level_size):
                node = queue.popleft()

                # Found first leaf node
                if not node.left and not node.right:
                    return depth

                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)

            depth += 1

        return depth`
        }
      },
      testCases: [
        { input: 'root = [1,2,3,4,5]', output: 'Max Depth: 3, Diameter: 3' },
        { input: 'root = [1,2]', output: 'Max Depth: 2, Diameter: 1' },
        { input: 'root = []', output: 'Max Depth: 0, Diameter: 0' }
      ],
    },
    {
      id: 4,
      title: 'Same Tree',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/same-tree/',
      description: 'Given the roots of two binary trees p and q, check if they are structurally identical and the nodes have the same values.',
      examples: [
        { input: 'p = [1,2,3], q = [1,2,3]', output: 'true' },
        { input: 'p = [1,2], q = [1,null,2]', output: 'false' }
      ],
      code: {
        java: {
          starterCode: `public boolean isSameTree(TreeNode p, TreeNode q) {
    // Write your code here

}`,
          solution: `class Solution {
    // Recursive approach
    public boolean isSameTree(TreeNode p, TreeNode q) {
        // Both null - trees are same
        if (p == null && q == null) {
            return true;
        }

        // One is null, other isn't - not same
        if (p == null || q == null) {
            return false;
        }

        // Values differ - not same
        if (p.val != q.val) {
            return false;
        }

        // Check both subtrees recursively
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }

    // Iterative BFS approach
    public boolean isSameTreeBFS(TreeNode p, TreeNode q) {
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(p);
        queue.offer(q);

        while (!queue.isEmpty()) {
            TreeNode node1 = queue.poll();
            TreeNode node2 = queue.poll();

            if (node1 == null && node2 == null) continue;
            if (node1 == null || node2 == null) return false;
            if (node1.val != node2.val) return false;

            queue.offer(node1.left);
            queue.offer(node2.left);
            queue.offer(node1.right);
            queue.offer(node2.right);
        }

        return true;
    }
}`
        },
        python: {
          starterCode: `def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
    # Write your code here
    pass`,
          solution: `class Solution:
    # Recursive approach
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        # Both null - trees are same
        if not p and not q:
            return True

        # One is null, other isn't - not same
        if not p or not q:
            return False

        # Values differ - not same
        if p.val != q.val:
            return False

        # Check both subtrees recursively
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)

    # Iterative BFS approach
    def isSameTreeBFS(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        queue = deque([p, q])

        while queue:
            node1 = queue.popleft()
            node2 = queue.popleft()

            if not node1 and not node2:
                continue
            if not node1 or not node2:
                return False
            if node1.val != node2.val:
                return False

            queue.append(node1.left)
            queue.append(node2.left)
            queue.append(node1.right)
            queue.append(node2.right)

        return True`
        }
      },
      testCases: [
        { input: 'p = [1,2,3], q = [1,2,3]', output: 'true' },
        { input: 'p = [1,2], q = [1,null,2]', output: 'false' },
        { input: 'p = [1,2,1], q = [1,1,2]', output: 'false' }
      ],
    },
    {
      id: 5,
      title: 'Invert Binary Tree',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/',
      description: 'Given the root of a binary tree, invert the tree by swapping the left and right children of every node, and return its root.',
      examples: [
        { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' }
      ],
      code: {
        java: {
          starterCode: `public TreeNode invertTree(TreeNode root) {
    // Write your code here

}`,
          solution: `class Solution {
    // Recursive approach - Most elegant
    public TreeNode invertTree(TreeNode root) {
        // Base case
        if (root == null) {
            return null;
        }

        // Swap left and right children
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;

        // Recursively invert subtrees
        invertTree(root.left);
        invertTree(root.right);

        return root;
    }

    // Alternative: Invert then swap (post-order style)
    public TreeNode invertTreePostOrder(TreeNode root) {
        if (root == null) return null;

        // Invert subtrees first
        TreeNode left = invertTree(root.left);
        TreeNode right = invertTree(root.right);

        // Then swap
        root.left = right;
        root.right = left;

        return root;
    }

    // Iterative BFS approach
    public TreeNode invertTreeBFS(TreeNode root) {
        if (root == null) return null;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();

            // Swap children
            TreeNode temp = node.left;
            node.left = node.right;
            node.right = temp;

            // Add children to queue
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }

        return root;
    }

    // Iterative DFS with stack
    public TreeNode invertTreeDFS(TreeNode root) {
        if (root == null) return null;

        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();

            // Swap children
            TreeNode temp = node.left;
            node.left = node.right;
            node.right = temp;

            // Add children to stack
            if (node.left != null) stack.push(node.left);
            if (node.right != null) stack.push(node.right);
        }

        return root;
    }
}`
        },
        python: {
          starterCode: `def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
    # Write your code here
    pass`,
          solution: `class Solution:
    # Recursive approach - Most elegant
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        # Base case
        if not root:
            return None

        # Swap left and right children
        root.left, root.right = root.right, root.left

        # Recursively invert subtrees
        self.invertTree(root.left)
        self.invertTree(root.right)

        return root

    # Alternative: Invert then swap (post-order style)
    def invertTreePostOrder(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None

        # Invert subtrees first
        left = self.invertTree(root.left)
        right = self.invertTree(root.right)

        # Then swap
        root.left = right
        root.right = left

        return root

    # Iterative BFS approach
    def invertTreeBFS(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None

        queue = deque([root])

        while queue:
            node = queue.popleft()

            # Swap children
            node.left, node.right = node.right, node.left

            # Add children to queue
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        return root

    # Iterative DFS with stack
    def invertTreeDFS(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None

        stack = [root]

        while stack:
            node = stack.pop()

            # Swap children
            node.left, node.right = node.right, node.left

            # Add children to stack
            if node.left:
                stack.append(node.left)
            if node.right:
                stack.append(node.right)

        return root`
        }
      },
      testCases: [
        { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
        { input: 'root = [2,1,3]', output: '[2,3,1]' },
        { input: 'root = []', output: '[]' }
      ],
    },
    {
      id: 6,
      title: 'Symmetric Tree',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/symmetric-tree/',
      description: 'Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).',
      examples: [
        { input: 'root = [1,2,2,3,4,4,3]', output: 'true' },
        { input: 'root = [1,2,2,null,3,null,3]', output: 'false' }
      ],
      code: {
        java: {
          starterCode: `public boolean isSymmetric(TreeNode root) {
    // Write your code here

}`,
          solution: `class Solution {
    // Main function
    public boolean isSymmetric(TreeNode root) {
        if (root == null) return true;
        return isMirror(root.left, root.right);
    }

    // Recursive helper: check if two trees are mirrors
    private boolean isMirror(TreeNode left, TreeNode right) {
        // Both null - symmetric
        if (left == null && right == null) {
            return true;
        }

        // One null - not symmetric
        if (left == null || right == null) {
            return false;
        }

        // Values must match and subtrees must be mirrors:
        // - left's left must mirror right's right
        // - left's right must mirror right's left
        return (left.val == right.val) &&
               isMirror(left.left, right.right) &&
               isMirror(left.right, right.left);
    }

    // Iterative approach using queue
    public boolean isSymmetricIterative(TreeNode root) {
        if (root == null) return true;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root.left);
        queue.offer(root.right);

        while (!queue.isEmpty()) {
            TreeNode left = queue.poll();
            TreeNode right = queue.poll();

            // Both null - continue
            if (left == null && right == null) continue;

            // One null or values differ - not symmetric
            if (left == null || right == null || left.val != right.val) {
                return false;
            }

            // Add mirror pairs to queue
            // left's left with right's right
            queue.offer(left.left);
            queue.offer(right.right);

            // left's right with right's left
            queue.offer(left.right);
            queue.offer(right.left);
        }

        return true;
    }
}`
        },
        python: {
          starterCode: `def isSymmetric(self, root: Optional[TreeNode]) -> bool:
    # Write your code here
    pass`,
          solution: `class Solution:
    # Main function
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        if not root:
            return True
        return self._is_mirror(root.left, root.right)

    # Recursive helper: check if two trees are mirrors
    def _is_mirror(self, left: Optional[TreeNode], right: Optional[TreeNode]) -> bool:
        # Both null - symmetric
        if not left and not right:
            return True

        # One null - not symmetric
        if not left or not right:
            return False

        # Values must match and subtrees must be mirrors:
        # - left's left must mirror right's right
        # - left's right must mirror right's left
        return (left.val == right.val and
                self._is_mirror(left.left, right.right) and
                self._is_mirror(left.right, right.left))

    # Iterative approach using queue
    def isSymmetricIterative(self, root: Optional[TreeNode]) -> bool:
        if not root:
            return True

        queue = deque([root.left, root.right])

        while queue:
            left = queue.popleft()
            right = queue.popleft()

            # Both null - continue
            if not left and not right:
                continue

            # One null or values differ - not symmetric
            if not left or not right or left.val != right.val:
                return False

            # Add mirror pairs to queue
            # left's left with right's right
            queue.append(left.left)
            queue.append(right.right)

            # left's right with right's left
            queue.append(left.right)
            queue.append(right.left)

        return True`
        }
      },
      testCases: [
        { input: 'root = [1,2,2,3,4,4,3]', output: 'true' },
        { input: 'root = [1,2,2,null,3,null,3]', output: 'false' },
        { input: 'root = [1]', output: 'true' }
      ],
    },
    {
      id: 7,
      title: 'Construct Binary Tree from Preorder and Inorder Traversal',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
      description: 'Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.',
      examples: [
        { input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', output: '[3,9,20,null,null,15,7]' },
        { input: 'preorder = [-1], inorder = [-1]', output: '[-1]' }
      ],
      code: {
        java: {
          starterCode: `public TreeNode buildTree(int[] preorder, int[] inorder) {
    // Write your code here

}`,
          solution: `class Solution {
    // Approach 1: Using HashMap for O(1) lookup
    private int preIndex = 0;
    private Map<Integer, Integer> inorderMap;

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        // Build map for O(1) lookup of inorder indices
        inorderMap = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inorderMap.put(inorder[i], i);
        }

        preIndex = 0;
        return buildTreeHelper(preorder, 0, inorder.length - 1);
    }

    private TreeNode buildTreeHelper(int[] preorder, int inStart, int inEnd) {
        // Base case
        if (inStart > inEnd) {
            return null;
        }

        // First element in preorder is always root
        int rootVal = preorder[preIndex++];
        TreeNode root = new TreeNode(rootVal);

        // If only one element, return root
        if (inStart == inEnd) {
            return root;
        }

        // Find root position in inorder
        int inIndex = inorderMap.get(rootVal);

        // Build left and right subtrees
        // Elements before inIndex are in left subtree
        root.left = buildTreeHelper(preorder, inStart, inIndex - 1);
        // Elements after inIndex are in right subtree
        root.right = buildTreeHelper(preorder, inIndex + 1, inEnd);

        return root;
    }

    // Approach 2: Without HashMap (cleaner but slower)
    public TreeNode buildTreeNoMap(int[] preorder, int[] inorder) {
        return buildHelper(preorder, inorder, 0, 0, inorder.length - 1);
    }

    private TreeNode buildHelper(int[] preorder, int[] inorder,
                                  int preStart, int inStart, int inEnd) {
        if (preStart >= preorder.length || inStart > inEnd) {
            return null;
        }

        TreeNode root = new TreeNode(preorder[preStart]);

        // Find root in inorder
        int inIndex = 0;
        for (int i = inStart; i <= inEnd; i++) {
            if (inorder[i] == root.val) {
                inIndex = i;
                break;
            }
        }

        // Number of nodes in left subtree
        int leftSize = inIndex - inStart;

        // Build subtrees
        root.left = buildHelper(preorder, inorder, preStart + 1, inStart, inIndex - 1);
        root.right = buildHelper(preorder, inorder, preStart + leftSize + 1, inIndex + 1, inEnd);

        return root;
    }
}`
        },
        python: {
          starterCode: `def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
    # Write your code here
    pass`,
          solution: `class Solution:
    # Approach 1: Using dictionary for O(1) lookup
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        # Build map for O(1) lookup of inorder indices
        inorder_map = {val: idx for idx, val in enumerate(inorder)}
        self.pre_index = 0

        def build_helper(in_start: int, in_end: int) -> Optional[TreeNode]:
            # Base case
            if in_start > in_end:
                return None

            # First element in preorder is always root
            root_val = preorder[self.pre_index]
            self.pre_index += 1
            root = TreeNode(root_val)

            # If only one element, return root
            if in_start == in_end:
                return root

            # Find root position in inorder
            in_index = inorder_map[root_val]

            # Build left and right subtrees
            # Elements before in_index are in left subtree
            root.left = build_helper(in_start, in_index - 1)
            # Elements after in_index are in right subtree
            root.right = build_helper(in_index + 1, in_end)

            return root

        return build_helper(0, len(inorder) - 1)

    # Approach 2: Without dictionary (cleaner but slower)
    def buildTreeNoMap(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        def build_helper(pre_start: int, in_start: int, in_end: int) -> Optional[TreeNode]:
            if pre_start >= len(preorder) or in_start > in_end:
                return None

            root = TreeNode(preorder[pre_start])

            # Find root in inorder
            in_index = inorder.index(root.val, in_start, in_end + 1)

            # Number of nodes in left subtree
            left_size = in_index - in_start

            # Build subtrees
            root.left = build_helper(pre_start + 1, in_start, in_index - 1)
            root.right = build_helper(pre_start + left_size + 1, in_index + 1, in_end)

            return root

        return build_helper(0, 0, len(inorder) - 1)`
        }
      },
      testCases: [
        { input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', output: '[3,9,20,null,null,15,7]' },
        { input: 'preorder = [-1], inorder = [-1]', output: '[-1]' },
        { input: 'preorder = [1,2], inorder = [2,1]', output: '[1,2]' }
      ],
      hints: `Use HashMap to map inorder values to indices. Preorder gives root, inorder divides into left/right subtrees. Time O(n), Space O(n)`
    },
    {
      id: 8,
      title: 'Construct Binary Tree from Inorder and Postorder Traversal',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/',
      description: 'Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.',
      examples: [
        { input: 'inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]', output: '[3,9,20,null,null,15,7]' },
        { input: 'inorder = [-1], postorder = [-1]', output: '[-1]' }
      ],
      code: {
        java: {
          starterCode: `public TreeNode buildTree(int[] inorder, int[] postorder) {
    // Write your code here

}`,
          solution: `class Solution {
    // Approach 1: Using HashMap for O(1) lookup
    private int postIndex;
    private Map<Integer, Integer> inorderMap;

    public TreeNode buildTree(int[] inorder, int[] postorder) {
        // Build map for O(1) lookup of inorder indices
        inorderMap = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inorderMap.put(inorder[i], i);
        }

        // Start from last element in postorder (root)
        postIndex = postorder.length - 1;
        return buildTreeHelper(postorder, 0, inorder.length - 1);
    }

    private TreeNode buildTreeHelper(int[] postorder, int inStart, int inEnd) {
        // Base case
        if (inStart > inEnd) {
            return null;
        }

        // Last element in postorder is always root
        int rootVal = postorder[postIndex--];
        TreeNode root = new TreeNode(rootVal);

        // If only one element, return root
        if (inStart == inEnd) {
            return root;
        }

        // Find root position in inorder
        int inIndex = inorderMap.get(rootVal);

        // IMPORTANT: Build RIGHT subtree first!
        // Postorder: Left → Right → Root
        // We process from end, so: Root → Right → Left
        root.right = buildTreeHelper(postorder, inIndex + 1, inEnd);
        root.left = buildTreeHelper(postorder, inStart, inIndex - 1);

        return root;
    }

    // Approach 2: Without HashMap
    public TreeNode buildTreeNoMap(int[] inorder, int[] postorder) {
        return buildHelper(inorder, postorder,
                          0, inorder.length - 1,
                          0, postorder.length - 1);
    }

    private TreeNode buildHelper(int[] inorder, int[] postorder,
                                  int inStart, int inEnd,
                                  int postStart, int postEnd) {
        if (inStart > inEnd || postStart > postEnd) {
            return null;
        }

        // Last element in postorder is root
        TreeNode root = new TreeNode(postorder[postEnd]);

        // Find root in inorder
        int inIndex = 0;
        for (int i = inStart; i <= inEnd; i++) {
            if (inorder[i] == root.val) {
                inIndex = i;
                break;
            }
        }

        // Number of nodes in left subtree
        int leftSize = inIndex - inStart;

        // Build subtrees
        root.left = buildHelper(inorder, postorder,
                               inStart, inIndex - 1,
                               postStart, postStart + leftSize - 1);
        root.right = buildHelper(inorder, postorder,
                                inIndex + 1, inEnd,
                                postStart + leftSize, postEnd - 1);

        return root;
    }
}`
        },
        python: {
          starterCode: `def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
    # Write your code here
    pass`,
          solution: `class Solution:
    # Approach 1: Using dictionary for O(1) lookup
    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        # Build map for O(1) lookup of inorder indices
        inorder_map = {val: idx for idx, val in enumerate(inorder)}
        self.post_index = len(postorder) - 1

        def build_helper(in_start: int, in_end: int) -> Optional[TreeNode]:
            # Base case
            if in_start > in_end:
                return None

            # Last element in postorder is always root
            root_val = postorder[self.post_index]
            self.post_index -= 1
            root = TreeNode(root_val)

            # If only one element, return root
            if in_start == in_end:
                return root

            # Find root position in inorder
            in_index = inorder_map[root_val]

            # IMPORTANT: Build RIGHT subtree first!
            # Postorder: Left → Right → Root
            # We process from end, so: Root → Right → Left
            root.right = build_helper(in_index + 1, in_end)
            root.left = build_helper(in_start, in_index - 1)

            return root

        return build_helper(0, len(inorder) - 1)

    # Approach 2: Without dictionary
    def buildTreeNoMap(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        def build_helper(in_start: int, in_end: int,
                        post_start: int, post_end: int) -> Optional[TreeNode]:
            if in_start > in_end or post_start > post_end:
                return None

            # Last element in postorder is root
            root = TreeNode(postorder[post_end])

            # Find root in inorder
            in_index = inorder.index(root.val, in_start, in_end + 1)

            # Number of nodes in left subtree
            left_size = in_index - in_start

            # Build subtrees
            root.left = build_helper(in_start, in_index - 1,
                                    post_start, post_start + left_size - 1)
            root.right = build_helper(in_index + 1, in_end,
                                     post_start + left_size, post_end - 1)

            return root

        return build_helper(0, len(inorder) - 1,
                          0, len(postorder) - 1)`
        }
      },
      testCases: [
        { input: 'inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]', output: '[3,9,20,null,null,15,7]' },
        { input: 'inorder = [-1], postorder = [-1]', output: '[-1]' },
        { input: 'inorder = [2,1], postorder = [2,1]', output: '[1,2]' }
      ],
      hints: `Use HashMap to map inorder values to indices. Postorder gives root (from end), inorder divides into left/right subtrees. Build RIGHT before LEFT! Time O(n), Space O(n)`
    },
    {
      id: 9,
      title: 'Populating Next Right Pointers in Each Node II',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/',
      description: 'Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL. Initially, all next pointers are set to NULL. This is the general version for any binary tree (not just perfect binary trees).',
      examples: [
        { input: 'root = [1,2,3,4,5,null,7]', output: '[1,#,2,3,#,4,5,7,#]' },
        { input: 'root = []', output: '[]' }
      ],
      code: {
        java: {
          starterCode: `// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
}

public Node connect(Node root) {
    // Write your code here

}`,
          solution: `class Solution {
    // Approach 1: Level-order BFS with Queue - O(n) space
    public Node connect(Node root) {
        if (root == null) return null;

        Queue<Node> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            Node prev = null;

            for (int i = 0; i < levelSize; i++) {
                Node curr = queue.poll();

                // Connect previous node to current
                if (prev != null) {
                    prev.next = curr;
                }
                prev = curr;

                // Add children to queue
                if (curr.left != null) queue.offer(curr.left);
                if (curr.right != null) queue.offer(curr.right);
            }

            // Last node in level points to null (already set)
        }

        return root;
    }

    // Approach 2: O(1) space using already established next pointers
    public Node connectOptimized(Node root) {
        Node leftmost = root;

        while (leftmost != null) {
            // Traverse current level and connect next level
            Node curr = leftmost;
            Node prev = null;
            Node nextLeftmost = null;

            while (curr != null) {
                // Process left child
                if (curr.left != null) {
                    if (prev != null) {
                        prev.next = curr.left;
                    } else {
                        nextLeftmost = curr.left;  // First node of next level
                    }
                    prev = curr.left;
                }

                // Process right child
                if (curr.right != null) {
                    if (prev != null) {
                        prev.next = curr.right;
                    } else {
                        nextLeftmost = curr.right;  // First node of next level
                    }
                    prev = curr.right;
                }

                // Move to next node in current level
                curr = curr.next;
            }

            // Move to next level
            leftmost = nextLeftmost;
        }

        return root;
    }

    // Approach 3: Using dummy node for cleaner O(1) space solution
    public Node connectWithDummy(Node root) {
        Node leftmost = root;

        while (leftmost != null) {
            // Dummy node to simplify next level construction
            Node dummy = new Node(0);
            Node tail = dummy;

            // Traverse current level
            Node curr = leftmost;
            while (curr != null) {
                if (curr.left != null) {
                    tail.next = curr.left;
                    tail = tail.next;
                }
                if (curr.right != null) {
                    tail.next = curr.right;
                    tail = tail.next;
                }
                curr = curr.next;
            }

            // Move to next level (first node after dummy)
            leftmost = dummy.next;
        }

        return root;
    }
}`
        },
        python: {
          starterCode: `# Definition for a Node.
class Node:
    def __init__(self, val: int = 0, left: 'Node' = None, right: 'Node' = None, next: 'Node' = None):
        self.val = val
        self.left = left
        self.right = right
        self.next = next

def connect(self, root: 'Node') -> 'Node':
    # Write your code here
    pass`,
          solution: `class Solution:
    # Approach 1: Level-order BFS with Queue - O(n) space
    def connect(self, root: 'Node') -> 'Node':
        if not root:
            return None

        queue = deque([root])

        while queue:
            level_size = len(queue)
            prev = None

            for i in range(level_size):
                curr = queue.popleft()

                # Connect previous node to current
                if prev:
                    prev.next = curr
                prev = curr

                # Add children to queue
                if curr.left:
                    queue.append(curr.left)
                if curr.right:
                    queue.append(curr.right)

            # Last node in level points to null (already set)

        return root

    # Approach 2: O(1) space using already established next pointers
    def connectOptimized(self, root: 'Node') -> 'Node':
        leftmost = root

        while leftmost:
            # Traverse current level and connect next level
            curr = leftmost
            prev = None
            next_leftmost = None

            while curr:
                # Process left child
                if curr.left:
                    if prev:
                        prev.next = curr.left
                    else:
                        next_leftmost = curr.left  # First node of next level
                    prev = curr.left

                # Process right child
                if curr.right:
                    if prev:
                        prev.next = curr.right
                    else:
                        next_leftmost = curr.right  # First node of next level
                    prev = curr.right

                # Move to next node in current level
                curr = curr.next

            # Move to next level
            leftmost = next_leftmost

        return root

    # Approach 3: Using dummy node for cleaner O(1) space solution
    def connectWithDummy(self, root: 'Node') -> 'Node':
        leftmost = root

        while leftmost:
            # Dummy node to simplify next level construction
            dummy = Node(0)
            tail = dummy

            # Traverse current level
            curr = leftmost
            while curr:
                if curr.left:
                    tail.next = curr.left
                    tail = tail.next
                if curr.right:
                    tail.next = curr.right
                    tail = tail.next
                curr = curr.next

            # Move to next level (first node after dummy)
            leftmost = dummy.next

        return root`
        }
      },
      testCases: [
        { input: 'root = [1,2,3,4,5,null,7]', output: '[1,#,2,3,#,4,5,7,#]' },
        { input: 'root = []', output: '[]' },
        { input: 'root = [1]', output: '[1,#]' }
      ],
      hints: `Use appropriate algorithm approach. Check problem constraints and optimize accordingly.`
    },
    {
      id: 10,
      title: 'Flatten Binary Tree to Linked List',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/flatten-binary-tree-to-linked-list/',
      description: 'Given the root of a binary tree, flatten the tree into a "linked list" where the right child pointer points to the next node in the list and all left child pointers are null. The order should be the same as a pre-order traversal of the binary tree.',
      examples: [
        { input: 'root = [1,2,5,3,4,null,6]', output: '[1,null,2,null,3,null,4,null,5,null,6]' },
        { input: 'root = []', output: '[]' },
        { input: 'root = [0]', output: '[0]' }
      ],
      code: {
        java: {
          starterCode: `public void flatten(TreeNode root) {
    // Write your code here

}`,
          solution: `class Solution {
    // Approach 1: Preorder Traversal + Reconstruction - O(n) space
    public void flatten(TreeNode root) {
        if (root == null) return;

        // Store preorder traversal
        List<TreeNode> nodes = new ArrayList<>();
        preorder(root, nodes);

        // Reconstruct as linked list
        for (int i = 0; i < nodes.size() - 1; i++) {
            nodes.get(i).left = null;
            nodes.get(i).right = nodes.get(i + 1);
        }
        nodes.get(nodes.size() - 1).left = null;
        nodes.get(nodes.size() - 1).right = null;
    }

    private void preorder(TreeNode node, List<TreeNode> nodes) {
        if (node == null) return;
        nodes.add(node);
        preorder(node.left, nodes);
        preorder(node.right, nodes);
    }

    // Approach 2: Recursive - O(1) space (elegant!)
    private TreeNode prev = null;

    public void flattenRecursive(TreeNode root) {
        if (root == null) return;

        // Process in REVERSE preorder: Right → Left → Root
        // This way when we process current, right side is already flattened
        flattenRecursive(root.right);
        flattenRecursive(root.left);

        // Connect current node to previously processed node
        root.right = prev;
        root.left = null;
        prev = root;
    }

    // Approach 3: Iterative Morris-like - O(1) space
    public void flattenMorris(TreeNode root) {
        TreeNode curr = root;

        while (curr != null) {
            if (curr.left != null) {
                // Find rightmost node in left subtree
                TreeNode rightmost = curr.left;
                while (rightmost.right != null) {
                    rightmost = rightmost.right;
                }

                // Connect rightmost to current's right subtree
                rightmost.right = curr.right;

                // Move left subtree to right
                curr.right = curr.left;
                curr.left = null;
            }

            // Move to next node
            curr = curr.right;
        }
    }

    // Approach 4: Iterative with Stack - O(n) space
    public void flattenStack(TreeNode root) {
        if (root == null) return;

        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            TreeNode curr = stack.pop();

            // Push right first (so left is processed first)
            if (curr.right != null) stack.push(curr.right);
            if (curr.left != null) stack.push(curr.left);

            // Connect to next node in preorder
            if (!stack.isEmpty()) {
                curr.right = stack.peek();
            }
            curr.left = null;
        }
    }

    // Approach 5: Recursive with explicit reconnection
    public void flattenExplicit(TreeNode root) {
        flattenHelper(root);
    }

    private TreeNode flattenHelper(TreeNode node) {
        if (node == null) return null;

        // Base case: leaf node
        if (node.left == null && node.right == null) {
            return node;
        }

        // Flatten left and right subtrees
        TreeNode leftTail = flattenHelper(node.left);
        TreeNode rightTail = flattenHelper(node.right);

        // If there's a left subtree, shuffle connections
        if (leftTail != null) {
            leftTail.right = node.right;
            node.right = node.left;
            node.left = null;
        }

        // Return the tail of flattened tree
        return rightTail != null ? rightTail : leftTail;
    }
}`
        },
        python: {
          starterCode: `def flatten(self, root: Optional[TreeNode]) -> None:
    """
    Do not return anything, modify root in-place instead.
    """
    # Write your code here
    pass`,
          solution: `class Solution:
    # Approach 1: Preorder Traversal + Reconstruction - O(n) space
    def flatten(self, root: Optional[TreeNode]) -> None:
        if not root:
            return

        # Store preorder traversal
        nodes = []
        self._preorder(root, nodes)

        # Reconstruct as linked list
        for i in range(len(nodes) - 1):
            nodes[i].left = None
            nodes[i].right = nodes[i + 1]
        nodes[-1].left = None
        nodes[-1].right = None

    def _preorder(self, node: Optional[TreeNode], nodes: List[TreeNode]) -> None:
        if not node:
            return
        nodes.append(node)
        self._preorder(node.left, nodes)
        self._preorder(node.right, nodes)

    # Approach 2: Recursive - O(1) space (elegant!)
    def flattenRecursive(self, root: Optional[TreeNode]) -> None:
        self.prev = None

        def flatten_helper(node):
            if not node:
                return

            # Process in REVERSE preorder: Right → Left → Root
            flatten_helper(node.right)
            flatten_helper(node.left)

            # Connect current node to previously processed node
            node.right = self.prev
            node.left = None
            self.prev = node

        flatten_helper(root)

    # Approach 3: Iterative Morris-like - O(1) space
    def flattenMorris(self, root: Optional[TreeNode]) -> None:
        curr = root

        while curr:
            if curr.left:
                # Find rightmost node in left subtree
                rightmost = curr.left
                while rightmost.right:
                    rightmost = rightmost.right

                # Connect rightmost to current's right subtree
                rightmost.right = curr.right

                # Move left subtree to right
                curr.right = curr.left
                curr.left = None

            # Move to next node
            curr = curr.right

    # Approach 4: Iterative with Stack - O(n) space
    def flattenStack(self, root: Optional[TreeNode]) -> None:
        if not root:
            return

        stack = [root]

        while stack:
            curr = stack.pop()

            # Push right first (so left is processed first)
            if curr.right:
                stack.append(curr.right)
            if curr.left:
                stack.append(curr.left)

            # Connect to next node in preorder
            if stack:
                curr.right = stack[-1]
            curr.left = None

    # Approach 5: Recursive with explicit reconnection
    def flattenExplicit(self, root: Optional[TreeNode]) -> None:
        def flatten_helper(node):
            if not node:
                return None

            # Base case: leaf node
            if not node.left and not node.right:
                return node

            # Flatten left and right subtrees
            left_tail = flatten_helper(node.left)
            right_tail = flatten_helper(node.right)

            # If there's a left subtree, shuffle connections
            if left_tail:
                left_tail.right = node.right
                node.right = node.left
                node.left = None

            # Return the tail of flattened tree
            return right_tail if right_tail else left_tail

        flatten_helper(root)`
        }
      },
      testCases: [
        { input: 'root = [1,2,5,3,4,null,6]', output: '[1,null,2,null,3,null,4,null,5,null,6]' },
        { input: 'root = []', output: '[]' },
        { input: 'root = [0]', output: '[0]' }
      ],
      hints: `Use appropriate algorithm approach. Check problem constraints and optimize accordingly.`
    },
    {
      id: 12,
      title: 'Sum Root to Leaf Numbers',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/sum-root-to-leaf-numbers/',
      description: 'You are given the root of a binary tree containing digits from 0 to 9 only. Each root-to-leaf path represents a number. Return the total sum of all root-to-leaf numbers. A leaf is a node with no children.',
      examples: [
        { input: 'root = [1,2,3]', output: '25' },
        { input: 'root = [4,9,0,5,1]', output: '1026' }
      ],
      code: {
        java: {
          starterCode: `public int sumNumbers(TreeNode root) {
    // Your code here
}`,
          solution: `// Approach 1: Recursive DFS - Most elegant
public int sumNumbers(TreeNode root) {
    return dfs(root, 0);
}

private int dfs(TreeNode node, int currentSum) {
    if (node == null) {
        return 0;
    }

    // Build the number: multiply by 10 and add current digit
    currentSum = currentSum * 10 + node.val;

    // Leaf node: return the complete number
    if (node.left == null && node.right == null) {
        return currentSum;
    }

    // Sum the results from both subtrees
    return dfs(node.left, currentSum) + dfs(node.right, currentSum);
}

// Approach 2: Iterative DFS with Stack
public int sumNumbersIterative(TreeNode root) {
    if (root == null) return 0;

    int totalSum = 0;
    Stack<TreeNode> nodeStack = new Stack<>();
    Stack<Integer> numStack = new Stack<>();

    nodeStack.push(root);
    numStack.push(root.val);

    while (!nodeStack.isEmpty()) {
        TreeNode node = nodeStack.pop();
        int num = numStack.pop();

        // Leaf node: add to total
        if (node.left == null && node.right == null) {
            totalSum += num;
            continue;
        }

        // Process right child
        if (node.right != null) {
            nodeStack.push(node.right);
            numStack.push(num * 10 + node.right.val);
        }

        // Process left child
        if (node.left != null) {
            nodeStack.push(node.left);
            numStack.push(num * 10 + node.left.val);
        }
    }

    return totalSum;
}

// Approach 3: BFS with Queue
public int sumNumbersBFS(TreeNode root) {
    if (root == null) return 0;

    int totalSum = 0;
    Queue<TreeNode> nodeQueue = new LinkedList<>();
    Queue<Integer> numQueue = new LinkedList<>();

    nodeQueue.offer(root);
    numQueue.offer(root.val);

    while (!nodeQueue.isEmpty()) {
        TreeNode node = nodeQueue.poll();
        int num = numQueue.poll();

        // Leaf node: add to total
        if (node.left == null && node.right == null) {
            totalSum += num;
            continue;
        }

        if (node.left != null) {
            nodeQueue.offer(node.left);
            numQueue.offer(num * 10 + node.left.val);
        }

        if (node.right != null) {
            nodeQueue.offer(node.right);
            numQueue.offer(num * 10 + node.right.val);
        }
    }

    return totalSum;
}

// Approach 4: Using global variable
private int totalSum = 0;

public int sumNumbersGlobal(TreeNode root) {
    totalSum = 0;
    dfsGlobal(root, 0);
    return totalSum;
}

private void dfsGlobal(TreeNode node, int currentSum) {
    if (node == null) return;

    currentSum = currentSum * 10 + node.val;

    // Leaf node
    if (node.left == null && node.right == null) {
        totalSum += currentSum;
        return;
    }

    dfsGlobal(node.left, currentSum);
    dfsGlobal(node.right, currentSum);
}`
        },
        python: {
          starterCode: `def sumNumbers(self, root: Optional[TreeNode]) -> int:
    # Your code here
    pass`,
          solution: `# Approach 1: Recursive DFS
def sumNumbers(self, root: Optional[TreeNode]) -> int:
    def dfs(node: Optional[TreeNode], current_sum: int) -> int:
        if not node:
            return 0

        # Build the number
        current_sum = current_sum * 10 + node.val

        # Leaf node: return the complete number
        if not node.left and not node.right:
            return current_sum

        # Sum from both subtrees
        return dfs(node.left, current_sum) + dfs(node.right, current_sum)

    return dfs(root, 0)

# Approach 2: Iterative DFS with Stack
def sumNumbersIterative(self, root: Optional[TreeNode]) -> int:
    if not root:
        return 0

    total_sum = 0
    stack = [(root, root.val)]

    while stack:
        node, num = stack.pop()

        # Leaf node: add to total
        if not node.left and not node.right:
            total_sum += num
            continue

        # Process children
        if node.right:
            stack.append((node.right, num * 10 + node.right.val))

        if node.left:
            stack.append((node.left, num * 10 + node.left.val))

    return total_sum

# Approach 3: BFS with Queue
def sumNumbersBFS(self, root: Optional[TreeNode]) -> int:
    if not root:
        return 0

    from collections import deque
    total_sum = 0
    queue = deque([(root, root.val)])

    while queue:
        node, num = queue.popleft()

        # Leaf node: add to total
        if not node.left and not node.right:
            total_sum += num
            continue

        if node.left:
            queue.append((node.left, num * 10 + node.left.val))

        if node.right:
            queue.append((node.right, num * 10 + node.right.val))

    return total_sum

# Approach 4: Using class variable
def sumNumbersGlobal(self, root: Optional[TreeNode]) -> int:
    self.total_sum = 0

    def dfs(node: Optional[TreeNode], current_sum: int) -> None:
        if not node:
            return

        current_sum = current_sum * 10 + node.val

        # Leaf node
        if not node.left and not node.right:
            self.total_sum += current_sum
            return

        dfs(node.left, current_sum)
        dfs(node.right, current_sum)

    dfs(root, 0)
    return self.total_sum`
        }
      },
      testCases: [
        { input: 'root = [1,2,3]', output: '25' },
        { input: 'root = [4,9,0,5,1]', output: '1026' },
        { input: 'root = [0]', output: '0' }
      ],
      hints: `Use appropriate algorithm approach. Check problem constraints and optimize accordingly.`
      },
      {
        id: 11,
        title: 'Path Sum',
        difficulty: 'Easy',
        leetcodeUrl: 'https://leetcode.com/problems/path-sum/',
        description: 'Given root and targetSum, return true if tree has root-to-leaf path that sums to targetSum.',
        examples: [
          { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22', output: 'true' }
        ],
        code: {
        java: {
          starterCode: `public int maxPathSum(TreeNode root) {
    // Your code here
}`,
          solution: `// Approach 1: Recursive with global variable
private int maxSum = Integer.MIN_VALUE;

public int maxPathSum(TreeNode root) {
    maxSum = Integer.MIN_VALUE;
    maxGain(root);
    return maxSum;
}

private int maxGain(TreeNode node) {
    if (node == null) {
        return 0;
    }

    // Max gain from left and right subtrees (ignore negative gains)
    int leftGain = Math.max(maxGain(node.left), 0);
    int rightGain = Math.max(maxGain(node.right), 0);

    // Price to "start fresh" from this node (peak path)
    // This includes current node + both subtrees
    int priceNewPath = node.val + leftGain + rightGain;

    // Update global maximum if this path is better
    maxSum = Math.max(maxSum, priceNewPath);

    // For recursion, return max gain if we continue with this node
    // Can only return one side to parent (either left or right)
    return node.val + Math.max(leftGain, rightGain);
}

// Approach 2: Using wrapper class (no global variable)
class Result {
    int maxSum;

    Result() {
        this.maxSum = Integer.MIN_VALUE;
    }
}

public int maxPathSumNoGlobal(TreeNode root) {
    Result result = new Result();
    maxGainHelper(root, result);
    return result.maxSum;
}

private int maxGainHelper(TreeNode node, Result result) {
    if (node == null) {
        return 0;
    }

    int leftGain = Math.max(maxGainHelper(node.left, result), 0);
    int rightGain = Math.max(maxGainHelper(node.right, result), 0);

    int priceNewPath = node.val + leftGain + rightGain;
    result.maxSum = Math.max(result.maxSum, priceNewPath);

    return node.val + Math.max(leftGain, rightGain);
}

// Approach 3: With detailed comments
public int maxPathSumDetailed(TreeNode root) {
    int[] maxSum = new int[]{Integer.MIN_VALUE};
    maxGainDetailed(root, maxSum);
    return maxSum[0];
}

private int maxGainDetailed(TreeNode node, int[] maxSum) {
    if (node == null) return 0;

    // Recursively get max path sum from left and right subtrees
    // Use Math.max(..., 0) to ignore negative paths (don't include them)
    int leftMax = Math.max(maxGainDetailed(node.left, maxSum), 0);
    int rightMax = Math.max(maxGainDetailed(node.right, maxSum), 0);

    // Path through current node as peak: left → node → right
    int pathThroughNode = node.val + leftMax + rightMax;

    // Update global max
    maxSum[0] = Math.max(maxSum[0], pathThroughNode);

    // Return max path going through current node to its parent
    // Can only choose one direction (left or right)
    return node.val + Math.max(leftMax, rightMax);
}`
        },
        python: {
          starterCode: `def maxPathSum(self, root: Optional[TreeNode]) -> int:
    # Your code here
    pass`,
          solution: `# Approach 1: Recursive with nonlocal variable
def maxPathSum(self, root: Optional[TreeNode]) -> int:
    max_sum = float('-inf')

    def max_gain(node: Optional[TreeNode]) -> int:
        nonlocal max_sum

        if not node:
            return 0

        # Max gain from left and right (ignore negative gains)
        left_gain = max(max_gain(node.left), 0)
        right_gain = max(max_gain(node.right), 0)

        # Price to start new path through this node (peak)
        price_new_path = node.val + left_gain + right_gain

        # Update global max
        max_sum = max(max_sum, price_new_path)

        # Return max gain for parent (can only use one side)
        return node.val + max(left_gain, right_gain)

    max_gain(root)
    return max_sum

# Approach 2: Using instance variable
def maxPathSumInstance(self, root: Optional[TreeNode]) -> int:
    self.max_sum = float('-inf')

    def max_gain(node: Optional[TreeNode]) -> int:
        if not node:
            return 0

        left_gain = max(max_gain(node.left), 0)
        right_gain = max(max_gain(node.right), 0)

        price_new_path = node.val + left_gain + right_gain
        self.max_sum = max(self.max_sum, price_new_path)

        return node.val + max(left_gain, right_gain)

    max_gain(root)
    return self.max_sum

# Approach 3: Using mutable container (list)
def maxPathSumList(self, root: Optional[TreeNode]) -> int:
    max_sum = [float('-inf')]

    def max_gain(node: Optional[TreeNode]) -> int:
        if not node:
            return 0

        left_gain = max(max_gain(node.left), 0)
        right_gain = max(max_gain(node.right), 0)

        price_new_path = node.val + left_gain + right_gain
        max_sum[0] = max(max_sum[0], price_new_path)

        return node.val + max(left_gain, right_gain)

    max_gain(root)
    return max_sum[0]`
        }
      },
      testCases: [
        { input: 'root = [1,2,3]', output: '6' },
        { input: 'root = [-10,9,20,null,null,15,7]', output: '42' },
        { input: 'root = [-3]', output: '-3' }
      ],
      hints: `Use appropriate algorithm approach. Time and space complexity vary by solution.`
    },
    {
      id: 14,
      title: 'Count Complete Tree Nodes',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/count-complete-tree-nodes/',
      description: 'Given the root of a complete binary tree, return the number of nodes in the tree. A complete binary tree is a binary tree in which every level, except possibly the last, is completely filled, and all nodes are as far left as possible.',
      examples: [
        { input: 'root = [1,2,3,4,5,6]', output: '6' },
        { input: 'root = []', output: '0' },
        { input: 'root = [1]', output: '1' }
      ],
      code: {
        java: {
          starterCode: `public int countNodes(TreeNode root) {
    // Your code here
}`,
          solution: `// Approach 1: Simple DFS - O(n) time, O(h) space
public int countNodesSimple(TreeNode root) {
    if (root == null) {
        return 0;
    }
    return 1 + countNodesSimple(root.left) + countNodesSimple(root.right);
}

// Approach 2: Optimized using complete tree property - O((log n)²) time
public int countNodes(TreeNode root) {
    if (root == null) {
        return 0;
    }

    int leftHeight = getLeftHeight(root);
    int rightHeight = getRightHeight(root);

    // If heights are equal, it's a perfect binary tree
    if (leftHeight == rightHeight) {
        return (1 << leftHeight) - 1;  // 2^h - 1
    }

    // Otherwise, recursively count
    return 1 + countNodes(root.left) + countNodes(root.right);
}

private int getLeftHeight(TreeNode node) {
    int height = 0;
    while (node != null) {
        height++;
        node = node.left;
    }
    return height;
}

private int getRightHeight(TreeNode node) {
    int height = 0;
    while (node != null) {
        height++;
        node = node.right;
    }
    return height;
}

// Approach 3: Even more optimized
public int countNodesOptimized(TreeNode root) {
    if (root == null) return 0;

    int leftDepth = getDepth(root.left);
    int rightDepth = getDepth(root.right);

    if (leftDepth == rightDepth) {
        // Left subtree is perfect (has all nodes)
        // Nodes in left: 2^leftDepth - 1, plus root = 2^leftDepth
        // Then count right subtree
        return (1 << leftDepth) + countNodesOptimized(root.right);
    } else {
        // Right subtree is perfect (one level less than left)
        // Nodes in right: 2^rightDepth - 1, plus root = 2^rightDepth
        // Then count left subtree
        return (1 << rightDepth) + countNodesOptimized(root.left);
    }
}

private int getDepth(TreeNode node) {
    int depth = 0;
    while (node != null) {
        depth++;
        node = node.left;
    }
    return depth;
}

// Approach 4: Iterative BFS - O(n) time
public int countNodesBFS(TreeNode root) {
    if (root == null) return 0;

    int count = 0;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        TreeNode node = queue.poll();
        count++;

        if (node.left != null) queue.offer(node.left);
        if (node.right != null) queue.offer(node.right);
    }

    return count;
}`
        },
        python: {
          starterCode: `def countNodes(self, root: Optional[TreeNode]) -> int:
    # Your code here
    pass`,
          solution: `# Approach 1: Simple DFS - O(n) time
def countNodesSimple(self, root: Optional[TreeNode]) -> int:
    if not root:
        return 0
    return 1 + self.countNodesSimple(root.left) + self.countNodesSimple(root.right)

# Approach 2: Optimized using complete tree property - O((log n)²)
def countNodes(self, root: Optional[TreeNode]) -> int:
    if not root:
        return 0

    def get_left_height(node: Optional[TreeNode]) -> int:
        height = 0
        while node:
            height += 1
            node = node.left
        return height

    def get_right_height(node: Optional[TreeNode]) -> int:
        height = 0
        while node:
            height += 1
            node = node.right
        return height

    left_height = get_left_height(root)
    right_height = get_right_height(root)

    # Perfect binary tree
    if left_height == right_height:
        return (1 << left_height) - 1  # 2^h - 1

    # Recursively count
    return 1 + self.countNodes(root.left) + self.countNodes(root.right)

# Approach 3: More optimized
def countNodesOptimized(self, root: Optional[TreeNode]) -> int:
    if not root:
        return 0

    def get_depth(node: Optional[TreeNode]) -> int:
        depth = 0
        while node:
            depth += 1
            node = node.left
        return depth

    left_depth = get_depth(root.left)
    right_depth = get_depth(root.right)

    if left_depth == right_depth:
        # Left subtree is perfect
        return (1 << left_depth) + self.countNodesOptimized(root.right)
    else:
        # Right subtree is perfect
        return (1 << right_depth) + self.countNodesOptimized(root.left)

# Approach 4: Iterative BFS - O(n) time
def countNodesBFS(self, root: Optional[TreeNode]) -> int:
    if not root:
        return 0

    from collections import deque
    count = 0
    queue = deque([root])

    while queue:
        node = queue.popleft()
        count += 1

        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)

    return count`
        }
      },
      testCases: [
        { input: 'root = [1,2,3,4,5,6]', output: '6' },
        { input: 'root = []', output: '0' },
        { input: 'root = [1]', output: '1' }
      ],
      hints: `Use appropriate algorithm approach. Time and space complexity vary by solution.`
    },
    {
      id: 15,
      title: 'Binary Tree Right Side View',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/binary-tree-right-side-view/',
      description: 'Given the root of a binary tree, imagine yourself standing on the right side of it. Return the values of the nodes you can see ordered from top to bottom.',
      examples: [
        { input: 'root = [1,2,3,null,5,null,4]', output: '[1,3,4]' },
        { input: 'root = [1,null,3]', output: '[1,3]' },
        { input: 'root = []', output: '[]' }
      ],
      code: {
        java: {
          starterCode: `public List<Integer> rightSideView(TreeNode root) {
    // Your code here
}`,
          solution: `// Approach 1: BFS Level Order Traversal
public List<Integer> rightSideView(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;

    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        int levelSize = queue.size();

        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();

            // Last node in the level (rightmost)
            if (i == levelSize - 1) {
                result.add(node.val);
            }

            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
    }

    return result;
}

// Approach 2: DFS with level tracking (Right first)
public List<Integer> rightSideViewDFS(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    dfs(root, 0, result);
    return result;
}

private void dfs(TreeNode node, int level, List<Integer> result) {
    if (node == null) return;

    // First time visiting this level - add to result
    if (level == result.size()) {
        result.add(node.val);
    }

    // Visit right subtree first
    dfs(node.right, level + 1, result);
    dfs(node.left, level + 1, result);
}

// Approach 3: BFS with cleaner structure
public List<Integer> rightSideViewClean(TreeNode root) {
    List<Integer> result = new ArrayList<>();
    if (root == null) return result;

    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        int size = queue.size();
        TreeNode rightmost = null;

        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            rightmost = node;  // Keep updating, last one is rightmost

            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }

        result.add(rightmost.val);
    }

    return result;
}`
        },
        python: {
          starterCode: `def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
    # Your code here
    pass`,
          solution: `# Approach 1: BFS Level Order Traversal
def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
    if not root:
        return []

    result = []
    from collections import deque
    queue = deque([root])

    while queue:
        level_size = len(queue)

        for i in range(level_size):
            node = queue.popleft()

            # Last node in the level (rightmost)
            if i == level_size - 1:
                result.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return result

# Approach 2: DFS with level tracking (Right first)
def rightSideViewDFS(self, root: Optional[TreeNode]) -> List[int]:
    result = []

    def dfs(node: Optional[TreeNode], level: int) -> None:
        if not node:
            return

        # First time visiting this level
        if level == len(result):
            result.append(node.val)

        # Visit right first
        dfs(node.right, level + 1)
        dfs(node.left, level + 1)

    dfs(root, 0)
    return result

# Approach 3: BFS with cleaner structure
def rightSideViewClean(self, root: Optional[TreeNode]) -> List[int]:
    if not root:
        return []

    result = []
    from collections import deque
    queue = deque([root])

    while queue:
        size = len(queue)
        rightmost = None

        for _ in range(size):
            node = queue.popleft()
            rightmost = node  # Keep updating

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(rightmost.val)

    return result`
        }
      },
      testCases: [
        { input: 'root = [1,2,3,null,5,null,4]', output: '[1,3,4]' },
        { input: 'root = [1,null,3]', output: '[1,3]' },
        { input: 'root = []', output: '[]' }
      ],
      hints: `Use appropriate algorithm approach. Time and space complexity vary by solution.`
    },
    {
      id: 16,
      title: 'Average of Levels in Binary Tree',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/average-of-levels-in-binary-tree/',
      description: 'Given the root of a binary tree, return the average value of the nodes on each level in the form of an array.',
      examples: [
        { input: 'root = [3,9,20,null,null,15,7]', output: '[3.0,14.5,11.0]' },
        { input: 'root = [3,9,20,15,7]', output: '[3.0,14.5,11.0]' }
      ],
      code: {
        java: {
          starterCode: `public List<Double> averageOfLevels(TreeNode root) {
    // Your code here
}`,
          solution: `// Approach 1: BFS Level Order Traversal
public List<Double> averageOfLevels(TreeNode root) {
    List<Double> result = new ArrayList<>();
    if (root == null) return result;

    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        long levelSum = 0;  // Use long to avoid overflow

        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            levelSum += node.val;

            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }

        // Calculate average using double
        result.add((double) levelSum / levelSize);
    }

    return result;
}

// Approach 2: DFS with level tracking
public List<Double> averageOfLevelsDFS(TreeNode root) {
    List<Long> sums = new ArrayList<>();
    List<Integer> counts = new ArrayList<>();

    dfs(root, 0, sums, counts);

    // Calculate averages
    List<Double> result = new ArrayList<>();
    for (int i = 0; i < sums.size(); i++) {
        result.add((double) sums.get(i) / counts.get(i));
    }

    return result;
}

private void dfs(TreeNode node, int level, List<Long> sums, List<Integer> counts) {
    if (node == null) return;

    // Initialize lists for new level
    if (level == sums.size()) {
        sums.add(0L);
        counts.add(0);
    }

    // Update sum and count for this level
    sums.set(level, sums.get(level) + node.val);
    counts.set(level, counts.get(level) + 1);

    // Recurse on children
    dfs(node.left, level + 1, sums, counts);
    dfs(node.right, level + 1, sums, counts);
}`
        },
        python: {
          starterCode: `def averageOfLevels(self, root: Optional[TreeNode]) -> List[float]:
    # Your code here
    pass`,
          solution: `# Approach 1: BFS Level Order Traversal
def averageOfLevels(self, root: Optional[TreeNode]) -> List[float]:
    if not root:
        return []

    result = []
    from collections import deque
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

        # Calculate average
        result.append(level_sum / level_size)

    return result

# Approach 2: DFS with level tracking
def averageOfLevelsDFS(self, root: Optional[TreeNode]) -> List[float]:
    sums = []
    counts = []

    def dfs(node: Optional[TreeNode], level: int) -> None:
        if not node:
            return

        # Initialize lists for new level
        if level == len(sums):
            sums.append(0)
            counts.append(0)

        # Update sum and count
        sums[level] += node.val
        counts[level] += 1

        # Recurse
        dfs(node.left, level + 1)
        dfs(node.right, level + 1)

    dfs(root, 0)

    # Calculate averages
    return [s / c for s, c in zip(sums, counts)]`
        }
      },
      testCases: [
        { input: 'root = [3,9,20,null,null,15,7]', output: '[3.0,14.5,11.0]' },
        { input: 'root = [3,9,20,15,7]', output: '[3.0,14.5,11.0]' },
        { input: 'root = [1]', output: '[1.0]' }
      ],
      hints: `Use appropriate algorithm approach. Time and space complexity vary by solution.`
    },
    {
      id: 17,
      title: 'Binary Tree Level Order Traversal',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
      description: 'Given the root of a binary tree, return the level order traversal of its nodes values (i.e., from left to right, level by level).',
      examples: [
        { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
        { input: 'root = [1]', output: '[[1]]' },
        { input: 'root = []', output: '[]' }
      ],
      code: {
        java: {
          starterCode: `public List<List<Integer>> levelOrder(TreeNode root) {
    // Your code here
}`,
          solution: `// Approach 1: BFS with Queue (Classic)
public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;

    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> currentLevel = new ArrayList<>();

        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            currentLevel.add(node.val);

            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }

        result.add(currentLevel);
    }

    return result;
}

// Approach 2: DFS with level tracking
public List<List<Integer>> levelOrderDFS(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    dfs(root, 0, result);
    return result;
}

private void dfs(TreeNode node, int level, List<List<Integer>> result) {
    if (node == null) return;

    // Create new level list if needed
    if (level == result.size()) {
        result.add(new ArrayList<>());
    }

    // Add current node to its level
    result.get(level).add(node.val);

    // Recurse on children
    dfs(node.left, level + 1, result);
    dfs(node.right, level + 1, result);
}

// Approach 3: BFS with sentinel (null marker)
public List<List<Integer>> levelOrderSentinel(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;

    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    queue.offer(null);  // Level separator

    List<Integer> currentLevel = new ArrayList<>();

    while (!queue.isEmpty()) {
        TreeNode node = queue.poll();

        if (node == null) {
            // End of level
            result.add(currentLevel);
            currentLevel = new ArrayList<>();

            // Add separator for next level if queue not empty
            if (!queue.isEmpty()) {
                queue.offer(null);
            }
        } else {
            currentLevel.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
    }

    return result;
}`
        },
        python: {
          starterCode: `def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
    # Your code here
    pass`,
          solution: `# Approach 1: BFS with Queue (Classic)
def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
    if not root:
        return []

    result = []
    from collections import deque
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

# Approach 2: DFS with level tracking
def levelOrderDFS(self, root: Optional[TreeNode]) -> List[List[int]]:
    result = []

    def dfs(node: Optional[TreeNode], level: int) -> None:
        if not node:
            return

        # Create new level list if needed
        if level == len(result):
            result.append([])

        # Add current node to its level
        result[level].append(node.val)

        # Recurse on children
        dfs(node.left, level + 1)
        dfs(node.right, level + 1)

    dfs(root, 0)
    return result

# Approach 3: BFS with sentinel (None marker)
def levelOrderSentinel(self, root: Optional[TreeNode]) -> List[List[int]]:
    if not root:
        return []

    result = []
    from collections import deque
    queue = deque([root, None])  # None as level separator
    current_level = []

    while queue:
        node = queue.popleft()

        if node is None:
            # End of level
            result.append(current_level)
            current_level = []

            # Add separator for next level if queue not empty
            if queue:
                queue.append(None)
        else:
            current_level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return result`
        }
      },
      testCases: [
        { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
        { input: 'root = [1]', output: '[[1]]' },
        { input: 'root = []', output: '[]' }
      ],
      hints: `Use appropriate algorithm approach. Time and space complexity vary by solution.`
    },
    {
      id: 18,
      title: 'Binary Tree Zigzag Level Order Traversal',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/',
      description: 'Given the root of a binary tree, return the zigzag level order traversal of its node values (i.e., from left to right, then right to left for the next level and alternate between).',
      examples: [
        { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[20,9],[15,7]]' },
        { input: 'root = [1]', output: '[[1]]' },
        { input: 'root = []', output: '[]' }
      ],
      code: {
        java: {
          starterCode: `public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
    // Your code here
}`,
          solution: `// Approach 1: BFS with Reverse Flag
public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;

    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    boolean leftToRight = true;

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> currentLevel = new ArrayList<>();

        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            currentLevel.add(node.val);

            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }

        // Reverse if right to left
        if (!leftToRight) {
            Collections.reverse(currentLevel);
        }

        result.add(currentLevel);
        leftToRight = !leftToRight;
    }

    return result;
}

// Approach 2: BFS with LinkedList (add to front/back)
public List<List<Integer>> zigzagLevelOrderLinkedList(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;

    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    boolean leftToRight = true;

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        LinkedList<Integer> currentLevel = new LinkedList<>();

        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();

            // Add to front or back based on direction
            if (leftToRight) {
                currentLevel.addLast(node.val);
            } else {
                currentLevel.addFirst(node.val);
            }

            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }

        result.add(currentLevel);
        leftToRight = !leftToRight;
    }

    return result;
}

// Approach 3: DFS with level tracking
public List<List<Integer>> zigzagLevelOrderDFS(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    dfs(root, 0, result);
    return result;
}

private void dfs(TreeNode node, int level, List<List<Integer>> result) {
    if (node == null) return;

    // Create new level list if needed
    if (level == result.size()) {
        result.add(new LinkedList<>());
    }

    // Add to front or back based on level parity
    LinkedList<Integer> levelList = (LinkedList<Integer>) result.get(level);
    if (level % 2 == 0) {
        levelList.addLast(node.val);  // Left to right
    } else {
        levelList.addFirst(node.val);  // Right to left
    }

    // Recurse
    dfs(node.left, level + 1, result);
    dfs(node.right, level + 1, result);
}`
        },
        python: {
          starterCode: `def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
    # Your code here
    pass`,
          solution: `# Approach 1: BFS with Reverse Flag
def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
    if not root:
        return []

    result = []
    from collections import deque
    queue = deque([root])
    left_to_right = True

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

        # Reverse if right to left
        if not left_to_right:
            current_level.reverse()

        result.append(current_level)
        left_to_right = not left_to_right

    return result

# Approach 2: BFS with Deque (add to front/back)
def zigzagLevelOrderDeque(self, root: Optional[TreeNode]) -> List[List[int]]:
    if not root:
        return []

    result = []
    from collections import deque
    queue = deque([root])
    left_to_right = True

    while queue:
        level_size = len(queue)
        current_level = deque()

        for _ in range(level_size):
            node = queue.popleft()

            # Add to front or back based on direction
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

# Approach 3: DFS with level tracking
def zigzagLevelOrderDFS(self, root: Optional[TreeNode]) -> List[List[int]]:
    result = []

    def dfs(node: Optional[TreeNode], level: int) -> None:
        if not node:
            return

        # Create new level list if needed
        if level == len(result):
            result.append(deque())

        # Add to front or back based on level parity
        if level % 2 == 0:
            result[level].append(node.val)  # Left to right
        else:
            result[level].appendleft(node.val)  # Right to left

        # Recurse
        dfs(node.left, level + 1)
        dfs(node.right, level + 1)

    from collections import deque
    dfs(root, 0)
    return [list(level) for level in result]`
        }
      },
      testCases: [
        { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[20,9],[15,7]]' },
        { input: 'root = [1]', output: '[[1]]' },
        { input: 'root = []', output: '[]' }
      ],
      hints: `Use appropriate algorithm approach. Time and space complexity vary by solution.`
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Binary Trees-${q.id}`)).length
    return { completed, total: questions.length, percentage: Math.round((completed / questions.length) * 100) }
  }

  const stats = getCompletionStats()

  // Group questions by difficulty
  const groupedQuestions = {
    Easy: questions.filter(q => q.difficulty === 'Easy'),
    Medium: questions.filter(q => q.difficulty === 'Medium'),
    Hard: questions.filter(q => q.difficulty === 'Hard')
  }

  const visibleQuestions = Object.entries(groupedQuestions)
    .filter(([difficulty]) => expandedSections[difficulty])
    .flatMap(([, qs]) => qs)

  const { focusedIndex, setFocusedIndex, itemRefs } = useKeyboardNavigation({
    items: visibleQuestions,
    onSelect: (question) => selectQuestion(question),
    onEscape: onBack,
    enabled: !selectedQuestion && visibleQuestions.length > 0,
    gridColumns: 2,
    loop: true
  })

  const getVisibleIndex = (question) => visibleQuestions.findIndex(q => q.id === question.id)

  const selectQuestion = (question) => {
    setSelectedQuestion(question)
    setShowSolution(false)
    setShowExplanation(false)
    setUserCode(question.code[language].starterCode)
    setOutput('')
    setShowDrawing(false)
    // Load existing drawing for this problem
    const savedDrawing = localStorage.getItem(`drawing-BinaryTrees-${question.id}`)
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
      category: { name: 'Binary Trees', onClick: () => setSelectedQuestion(null) },
      topic: selectedQuestion.title
    }

    return (
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            ← Back to Binary Trees
          </button>
          <LanguageToggle />
        </div>

        <Breadcrumb breadcrumb={problemBreadcrumb} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Problem Description */}
          <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: 'white', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`Binary Trees-${selectedQuestion.id}`} />
              <BookmarkButton problemId={`BinaryTrees-${selectedQuestion.id}`} problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'BinaryTrees' }} />
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
                🎨 {currentDrawing ? 'View' : 'Draw'} Sketch
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5', backgroundColor: '#111827', color: '#d1d5db' }} spellCheck={false} />

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
            const savedDrawing = localStorage.getItem(`drawing-BinaryTrees-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`BinaryTrees-${selectedQuestion.id}`}
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

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem' }}>Binary Trees</h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>Master binary trees problems</p>

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
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>{difficulty}</span>
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
                      tabIndex={isFocused ? 0 : -1}
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
                        backgroundColor: '#1f2937',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: isFocused ? '2px solid #3b82f6' : '2px solid #374151',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        outline: 'none'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.border = isFocused ? '2px solid #3b82f6' : '2px solid #374151' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                        <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ transform: 'scale(0.85)' }}>
                            <CompletionCheckbox problemId={`Binary Trees-${question.id}`} />
                          </div>
                          <BookmarkButton size="small" problemId={`BinaryTrees-${question.id}`} problemData={{ title: question.title, difficulty: question.difficulty, category: 'BinaryTrees' }} />
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

export default BinaryTrees
