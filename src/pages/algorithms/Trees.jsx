import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function Trees({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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
      title: 'N-ary Tree Level Order Traversal',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/n-ary-tree-level-order-traversal/',
      description: 'Given an n-ary tree, return the level order traversal of its nodes\' values. N-ary tree input serialization is represented in their level order traversal, each group of children is separated by the null value.',
      examples: [
        { input: 'root = [1,null,3,2,4,null,5,6]', output: '[[1],[3,2,4],[5,6]]' }
      ],
      code: {
        java: {
          starterCode: `class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, List<Node> _children) {
        val = _val;
        children = _children;
    }
}

public List<List<Integer>> levelOrder(Node root) {
    // Write your code here

}`,
          solution: `class Solution {
    public List<List<Integer>> levelOrder(Node root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Queue<Node> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();

            for (int i = 0; i < levelSize; i++) {
                Node node = queue.poll();
                currentLevel.add(node.val);

                if (node.children != null) {
                    for (Node child : node.children) {
                        queue.offer(child);
                    }
                }
            }
            result.add(currentLevel);
        }

        return result;
    }
}`
        },
        python: {
          starterCode: `class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children

def levelOrder(root):
    """
    :type root: Node
    :rtype: List[List[int]]
    """
    # Write your code here
    pass`,
          solution: `from collections import deque

def levelOrder(root):
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

            if node.children:
                queue.extend(node.children)

        result.append(current_level)

    return result`
        }
      },
      testCases: [
        { input: 'root = [1,null,3,2,4,null,5,6]', expected: '[[1],[3,2,4],[5,6]]' },
        { input: 'root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]', expected: '[[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]' }
      ],
      hints: [
        'Use BFS (breadth-first search) with a queue',
        'Process nodes level by level',
        'Track the size of each level before processing'
      ]
    },
    {
      id: 2,
      title: 'N-ary Tree Preorder Traversal',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/n-ary-tree-preorder-traversal/',
      description: 'Given the root of an n-ary tree, return the preorder traversal of its nodes\' values.',
      examples: [
        { input: 'root = [1,null,3,2,4,null,5,6]', output: '[1,3,5,6,2,4]' }
      ],
      code: {
        java: {
          starterCode: `class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, List<Node> _children) {
        val = _val;
        children = _children;
    }
}

public List<Integer> preorder(Node root) {
    // Write your code here

}`,
          solution: `class Solution {
    // Recursive approach
    public List<Integer> preorder(Node root) {
        List<Integer> result = new ArrayList<>();
        preorderHelper(root, result);
        return result;
    }

    private void preorderHelper(Node node, List<Integer> result) {
        if (node == null) return;

        result.add(node.val);  // Visit root first

        if (node.children != null) {
            for (Node child : node.children) {
                preorderHelper(child, result);
            }
        }
    }

    // Iterative approach using stack
    public List<Integer> preorderIterative(Node root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result;

        Stack<Node> stack = new Stack<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            Node node = stack.pop();
            result.add(node.val);

            if (node.children != null) {
                // Push children in reverse order
                for (int i = node.children.size() - 1; i >= 0; i--) {
                    stack.push(node.children.get(i));
                }
            }
        }

        return result;
    }
}`
        },
        python: {
          starterCode: `class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children

def preorder(root):
    """
    :type root: Node
    :rtype: List[int]
    """
    # Write your code here
    pass`,
          solution: `def preorder(root):
    # Recursive
    result = []

    def helper(node):
        if not node:
            return
        result.append(node.val)
        if node.children:
            for child in node.children:
                helper(child)

    helper(root)
    return result

def preorder_iterative(root):
    # Iterative
    if not root:
        return []

    result = []
    stack = [root]

    while stack:
        node = stack.pop()
        result.append(node.val)

        if node.children:
            # Push children in reverse order
            stack.extend(reversed(node.children))

    return result`
        }
      },
      testCases: [
        { input: 'root = [1,null,3,2,4,null,5,6]', expected: '[1,3,5,6,2,4]' },
        { input: 'root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]', expected: '[1,2,3,6,7,11,14,4,8,12,5,9,13,10]' }
      ],
      hints: [
        'Visit root first, then traverse children',
        'Recursive approach is straightforward',
        'For iterative: use a stack and push children in reverse order'
      ]
    },
    {
      id: 3,
      title: 'N-ary Tree Postorder Traversal',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/n-ary-tree-postorder-traversal/',
      description: 'Given the root of an n-ary tree, return the postorder traversal of its nodes\' values.',
      examples: [
        { input: 'root = [1,null,3,2,4,null,5,6]', output: '[5,6,3,2,4,1]' }
      ],
      code: {
        java: {
          starterCode: `class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, List<Node> _children) {
        val = _val;
        children = _children;
    }
}

public List<Integer> postorder(Node root) {
    // Write your code here

}`,
          solution: `class Solution {
    // Recursive approach
    public List<Integer> postorder(Node root) {
        List<Integer> result = new ArrayList<>();
        postorderHelper(root, result);
        return result;
    }

    private void postorderHelper(Node node, List<Integer> result) {
        if (node == null) return;

        if (node.children != null) {
            for (Node child : node.children) {
                postorderHelper(child, result);
            }
        }

        result.add(node.val);  // Visit root last
    }

    // Iterative approach
    public List<Integer> postorderIterative(Node root) {
        LinkedList<Integer> result = new LinkedList<>();
        if (root == null) return result;

        Stack<Node> stack = new Stack<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            Node node = stack.pop();
            result.addFirst(node.val);  // Add to front

            if (node.children != null) {
                for (Node child : node.children) {
                    stack.push(child);
                }
            }
        }

        return result;
    }
}`
        },
        python: {
          starterCode: `class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children

def postorder(root):
    """
    :type root: Node
    :rtype: List[int]
    """
    # Write your code here
    pass`,
          solution: `def postorder(root):
    # Recursive
    result = []

    def helper(node):
        if not node:
            return
        if node.children:
            for child in node.children:
                helper(child)
        result.append(node.val)

    helper(root)
    return result

def postorder_iterative(root):
    # Iterative
    if not root:
        return []

    result = []
    stack = [root]

    while stack:
        node = stack.pop()
        result.append(node.val)

        if node.children:
            stack.extend(node.children)

    # Reverse the result
    return result[::-1]`
        }
      },
      testCases: [
        { input: 'root = [1,null,3,2,4,null,5,6]', expected: '[5,6,3,2,4,1]' },
        { input: 'root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]', expected: '[2,6,14,11,7,3,12,8,4,13,9,10,5,1]' }
      ],
      hints: [
        'Visit children first, then root',
        'Recursive approach: traverse children then add root',
        'For iterative: reverse preorder traversal'
      ]
    },
    {
      id: 4,
      title: 'Maximum Depth of N-ary Tree',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-n-ary-tree/',
      description: 'Given an n-ary tree, find its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
      examples: [
        { input: 'root = [1,null,3,2,4,null,5,6]', output: '3' }
      ],
      code: {
        java: {
          starterCode: `class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, List<Node> _children) {
        val = _val;
        children = _children;
    }
}

public int maxDepth(Node root) {
    // Write your code here

}`,
          solution: `class Solution {
    // Recursive DFS approach
    public int maxDepth(Node root) {
        if (root == null) return 0;

        int maxChildDepth = 0;
        if (root.children != null) {
            for (Node child : root.children) {
                maxChildDepth = Math.max(maxChildDepth, maxDepth(child));
            }
        }

        return 1 + maxChildDepth;
    }

    // Iterative BFS approach
    public int maxDepthBFS(Node root) {
        if (root == null) return 0;

        Queue<Node> queue = new LinkedList<>();
        queue.offer(root);
        int depth = 0;

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            depth++;

            for (int i = 0; i < levelSize; i++) {
                Node node = queue.poll();
                if (node.children != null) {
                    for (Node child : node.children) {
                        queue.offer(child);
                    }
                }
            }
        }

        return depth;
    }
}`
        },
        python: {
          starterCode: `class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children

def maxDepth(root):
    """
    :type root: Node
    :rtype: int
    """
    # Write your code here
    pass`,
          solution: `def maxDepth(root):
    # Recursive DFS
    if not root:
        return 0

    if not root.children:
        return 1

    max_child_depth = max(maxDepth(child) for child in root.children)
    return 1 + max_child_depth

def maxDepth_bfs(root):
    # Iterative BFS
    if not root:
        return 0

    from collections import deque
    queue = deque([root])
    depth = 0

    while queue:
        level_size = len(queue)
        depth += 1

        for _ in range(level_size):
            node = queue.popleft()
            if node.children:
                queue.extend(node.children)

    return depth`
        }
      },
      testCases: [
        { input: 'root = [1,null,3,2,4,null,5,6]', expected: '3' },
        { input: 'root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]', expected: '5' }
      ],
      hints: [
        'The depth is 1 + maximum depth of all children',
        'Recursive approach is natural for this problem',
        'BFS can also be used by counting levels'
      ]
    },
    {
      id: 5,
      title: 'Find Root of N-Ary Tree',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/find-root-of-n-ary-tree/',
      description: 'You are given all the nodes of an N-ary tree as an array of Node objects, where each node has a unique value. Return the root of the N-ary tree.',
      examples: [
        { input: 'tree = [1,null,3,2,4,null,5,6]', output: 'node with value 1' }
      ],
      code: {
        java: {
          starterCode: `class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, List<Node> _children) {
        val = _val;
        children = _children;
    }
}

public Node findRoot(List<Node> tree) {
    // Write your code here

}`,
          solution: `class Solution {
    // Approach 1: Using sum difference
    // Sum of all values - Sum of all children values = root value
    public Node findRoot(List<Node> tree) {
        int totalSum = 0;
        int childrenSum = 0;

        for (Node node : tree) {
            totalSum += node.val;
            if (node.children != null) {
                for (Node child : node.children) {
                    childrenSum += child.val;
                }
            }
        }

        int rootVal = totalSum - childrenSum;

        for (Node node : tree) {
            if (node.val == rootVal) {
                return node;
            }
        }

        return null;
    }

    // Approach 2: Using HashSet
    public Node findRootSet(List<Node> tree) {
        Set<Node> children = new HashSet<>();

        for (Node node : tree) {
            if (node.children != null) {
                children.addAll(node.children);
            }
        }

        for (Node node : tree) {
            if (!children.contains(node)) {
                return node;
            }
        }

        return null;
    }
}`
        },
        python: {
          starterCode: `class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children

def findRoot(tree):
    """
    :type tree: List[Node]
    :rtype: Node
    """
    # Write your code here
    pass`,
          solution: `def findRoot(tree):
    # Approach 1: Sum difference
    total_sum = sum(node.val for node in tree)
    children_sum = sum(
        child.val
        for node in tree
        if node.children
        for child in node.children
    )

    root_val = total_sum - children_sum

    for node in tree:
        if node.val == root_val:
            return node

    return None

def findRoot_set(tree):
    # Approach 2: Using set
    children = set()

    for node in tree:
        if node.children:
            children.update(node.children)

    for node in tree:
        if node not in children:
            return node

    return None`
        }
      },
      testCases: [
        { input: 'tree = [1,null,3,2,4,null,5,6]', expected: 'Node(1)' },
        { input: 'tree = [1,null,2,3,4,5]', expected: 'Node(1)' }
      ],
      hints: [
        'Root is the only node that is never a child',
        'Sum of all nodes - Sum of all children = root value',
        'Can use HashSet to track which nodes are children'
      ]
    },
    {
      id: 6,
      title: 'Serialize and Deserialize N-ary Tree',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-n-ary-tree/',
      description: 'Design an algorithm to serialize and deserialize an N-ary tree. Serialization is the process of converting a data structure into a sequence of bits so that it can be stored or transmitted and reconstructed later.',
      examples: [
        { input: 'root = [1,null,3,2,4,null,5,6]', output: 'Serialize: "1 3 3 5 # 6 # # 2 # 4 # #", Deserialize: reconstruct the tree' }
      ],
      code: {
        java: {
          starterCode: `class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val) {
        val = _val;
        children = new ArrayList<Node>();
    }

    public Node(int _val, List<Node> _children) {
        val = _val;
        children = _children;
    }
}

class Codec {
    // Encodes a tree to a single string.
    public String serialize(Node root) {
        // Write your code here

    }

    // Decodes your encoded data to tree.
    public Node deserialize(String data) {
        // Write your code here

    }
}`,
          solution: `class Codec {
    // Encodes a tree to a single string.
    public String serialize(Node root) {
        if (root == null) return "";

        StringBuilder sb = new StringBuilder();
        serializeHelper(root, sb);
        return sb.toString();
    }

    private void serializeHelper(Node node, StringBuilder sb) {
        if (node == null) return;

        // Add node value
        sb.append(node.val).append(" ");
        // Add number of children
        sb.append(node.children.size()).append(" ");

        // Recursively serialize children
        for (Node child : node.children) {
            serializeHelper(child, sb);
        }
    }

    // Decodes your encoded data to tree.
    public Node deserialize(String data) {
        if (data == null || data.isEmpty()) return null;

        String[] tokens = data.split(" ");
        Queue<String> queue = new LinkedList<>(Arrays.asList(tokens));
        return deserializeHelper(queue);
    }

    private Node deserializeHelper(Queue<String> queue) {
        if (queue.isEmpty()) return null;

        // Get node value
        int val = Integer.parseInt(queue.poll());
        Node node = new Node(val, new ArrayList<>());

        // Get number of children
        int childCount = Integer.parseInt(queue.poll());

        // Recursively deserialize children
        for (int i = 0; i < childCount; i++) {
            node.children.add(deserializeHelper(queue));
        }

        return node;
    }
}`
        },
        python: {
          starterCode: `class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

class Codec:
    def serialize(self, root):
        """
        :type root: Node
        :rtype: str
        """
        # Write your code here
        pass

    def deserialize(self, data):
        """
        :type data: str
        :rtype: Node
        """
        # Write your code here
        pass`,
          solution: `class Codec:
    def serialize(self, root):
        if not root:
            return ""

        result = []

        def helper(node):
            if not node:
                return

            # Add node value and number of children
            result.append(str(node.val))
            result.append(str(len(node.children)))

            # Recursively serialize children
            for child in node.children:
                helper(child)

        helper(root)
        return " ".join(result)

    def deserialize(self, data):
        if not data:
            return None

        tokens = data.split()
        self.index = 0

        def helper():
            if self.index >= len(tokens):
                return None

            # Get node value
            val = int(tokens[self.index])
            self.index += 1

            # Get number of children
            child_count = int(tokens[self.index])
            self.index += 1

            node = Node(val, [])

            # Recursively deserialize children
            for _ in range(child_count):
                node.children.append(helper())

            return node

        return helper()`
        }
      },
      testCases: [
        { input: 'root = [1,null,3,2,4,null,5,6]', expected: 'original tree structure preserved' },
        { input: 'root = [1,null,2,3,4,5]', expected: 'original tree structure preserved' }
      ],
      hints: [
        'Store both node value and number of children',
        'Use preorder traversal for serialization',
        'Use a queue or index pointer for deserialization',
        'Include child count to know how many children to deserialize'
      ]
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Trees-${q.id}`)).length
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
    const savedDrawing = localStorage.getItem(`drawing-Trees-${question.id}`)
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
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            ← Back to Practice
          </button>
          <LanguageToggle />
        </div>

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
              <CompletionCheckbox problemId={`Trees-${selectedQuestion.id}`} />
              <BookmarkButton problemId={`Trees-${selectedQuestion.id}`} problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'Trees' }} />
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
            const savedDrawing = localStorage.getItem(`drawing-Trees-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`Trees-${selectedQuestion.id}`}
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
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem' }}>Trees</h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>Master trees problems</p>

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
                          <CompletionCheckbox problemId={`Trees-${question.id}`} />
                        </div>
                        <BookmarkButton size="small" problemId={`Trees-${question.id}`} problemData={{ title: question.title, difficulty: question.difficulty, category: 'Trees' }} />
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

export default Trees
