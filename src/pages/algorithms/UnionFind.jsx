import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function UnionFind({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory }) {
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
      title: 'Implement Union Find (Disjoint Set Union)',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/number-of-provinces/',
      description: 'Implement Union Find data structure with path compression and union by rank. Support find() to get the root parent and union() to merge two sets.',
      example: `Operations:
union(1, 2) → connects 1 and 2
union(2, 3) → connects 2 and 3
find(1) → returns root (same as find(3))
union(4, 5) → connects 4 and 5
connected(1, 3) → true
connected(1, 4) → false`,
      explanation: `**Problem:** Implement Union Find (Disjoint Set Union) data structure to efficiently manage disjoint sets and support quick union/find operations.

**What is Union Find?**
Union Find is a data structure that tracks elements partitioned into disjoint (non-overlapping) sets. It provides near-constant time operations to:
- Find which set an element belongs to (find operation)
- Merge two sets together (union operation)

**Key Use Cases:**
- Connected components in graphs
- Cycle detection in undirected graphs
- Network connectivity
- Percolation problems
- Kruskal's Minimum Spanning Tree algorithm

**Core Data Structure:**
1. **parent array**: parent[i] stores the parent of element i. If parent[i] = i, then i is a root/representative of its set.
2. **rank array**: Approximates the tree height for optimization (or size array tracks set size)
3. **count**: Tracks number of disjoint sets

**Optimization 1: Path Compression**
During find operation, flatten the tree by making every node point directly to the root.
- Without: find() might traverse O(n) nodes in a chain
- With: find() becomes nearly O(1) amortized

**Optimization 2: Union by Rank**
When merging sets, attach the smaller tree under the larger tree's root.
- Keeps trees balanced
- Prevents degeneration into long chains
- Ensures O(log n) tree height

**Why Both Optimizations?**
With both path compression + union by rank:
- Time complexity: O(α(n)) per operation where α is inverse Ackermann function (grows extremely slowly, effectively constant < 5 for any practical n)
- Without optimizations: O(n) per operation in worst case

**Implementation Details:**

**Find Operation:**
- Start at element x
- Follow parent pointers until reaching root (parent[x] == x)
- Path compression: Make all nodes on path point directly to root
- Return root

**Union Operation:**
- Find root of both elements
- If same root → already connected, return false
- If different roots → merge by rank:
  - Attach smaller rank tree under larger rank tree
  - If ranks equal, arbitrarily choose one and increment its rank
  - Decrement count
  - Return true

**Complexity:**
- Space: O(n) for parent and rank arrays
- Time: O(α(n)) ≈ O(1) per operation with both optimizations
- α(n) < 5 for any n up to 2^(2^(2^(2^16)))`,
      pseudocode: `Initialization:
-----------------------
parent = [0, 1, 2, 3, ..., n-1]  // Each element is its own parent
rank = [1, 1, 1, 1, ..., 1]      // All trees have rank 1 initially
count = n  // n disjoint sets initially

Find(x):  // With path compression
-----------------------
if parent[x] != x:
    parent[x] = find(parent[x])  // Recursively find root and compress path
return parent[x]

Union(x, y):  // With union by rank
-----------------------
rootX = find(x)
rootY = find(y)

if rootX == rootY:
    return false  // Already in same set

// Union by rank: attach smaller tree under larger
if rank[rootX] < rank[rootY]:
    parent[rootX] = rootY
elif rank[rootX] > rank[rootY]:
    parent[rootY] = rootX
else:
    parent[rootY] = rootX
    rank[rootX]++  // Increase rank when equal

count--
return true

Connected(x, y):
-----------------------
return find(x) == find(y)

Example Walkthrough:
-----------------------
Initial: n = 5
parent = [0, 1, 2, 3, 4]
rank = [1, 1, 1, 1, 1]
count = 5

union(0, 1):
- find(0) = 0, find(1) = 1
- rank[0] == rank[1], so parent[1] = 0, rank[0] = 2
- parent = [0, 0, 2, 3, 4], rank = [2, 1, 1, 1, 1], count = 4

union(1, 2):
- find(1) = 0 (with path compression), find(2) = 2
- rank[0] > rank[2], so parent[2] = 0
- parent = [0, 0, 0, 3, 4], rank = [2, 1, 1, 1, 1], count = 3

connected(0, 2):
- find(0) = 0, find(2) = 0
- return true

union(3, 4):
- find(3) = 3, find(4) = 4
- parent[4] = 3, rank[3] = 2
- parent = [0, 0, 0, 3, 3], rank = [2, 1, 1, 2, 1], count = 2

connected(0, 3):
- find(0) = 0, find(3) = 3
- return false  // Different sets

Path Compression Visualization:
-----------------------
Before path compression on find(d):
        a
       / \\
      b   ...
     /
    c
   /
  d

After find(d) with path compression:
        a
      / | \\
     b  c  ...
        |
        d

All nodes now point directly to root!`,
      code: {
        java: {
          starterCode: `class UnionFind {
    private int[] parent;
    private int[] rank;

    public UnionFind(int n) {
        // TODO: Initialize parent and rank arrays

    }

    public int find(int x) {
        // TODO: Find root with path compression

        return -1;
    }

    public boolean union(int x, int y) {
        // TODO: Union by rank

        return false;
    }

    public boolean connected(int x, int y) {
        // TODO: Check if x and y are in same set

        return false;
    }
}`,
          solution: `class UnionFind {
    private int[] parent;
    private int[] rank;
    private int count; // Number of disjoint sets

    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        count = n;

        // Each element is its own parent initially
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 1;
        }
    }

    // Find with path compression
    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }

    // Union by rank
    public boolean union(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);

        if (rootX == rootY) {
            return false; // Already in same set
        }

        // Union by rank: attach smaller tree under larger tree
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }

        count--;
        return true;
    }

    // Check if two elements are connected
    public boolean connected(int x, int y) {
        return find(x) == find(y);
    }

    // Get number of disjoint sets
    public int getCount() {
        return count;
    }
}

// Alternative: With size tracking instead of rank
class UnionFindWithSize {
    private int[] parent;
    private int[] size;

    public UnionFindWithSize(int n) {
        parent = new int[n];
        size = new int[n];

        for (int i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
        }
    }

    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    public boolean union(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);

        if (rootX == rootY) return false;

        // Attach smaller tree under larger tree
        if (size[rootX] < size[rootY]) {
            parent[rootX] = rootY;
            size[rootY] += size[rootX];
        } else {
            parent[rootY] = rootX;
            size[rootX] += size[rootY];
        }

        return true;
    }

    public int getSize(int x) {
        return size[find(x)];
    }
}`
        },
        python: {
          starterCode: `class UnionFind:
    def __init__(self, n):
        # TODO: Initialize parent and rank arrays
        pass

    def find(self, x):
        # TODO: Find root with path compression
        pass

    def union(self, x, y):
        # TODO: Union by rank
        pass

    def connected(self, x, y):
        # TODO: Check if x and y are in same set
        pass`,
          solution: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [1] * n
        self.count = n

    def find(self, x):
        """Find with path compression"""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        """Union by rank"""
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False

        # Union by rank: attach smaller tree under larger
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1

        self.count -= 1
        return True

    def connected(self, x, y):
        """Check if two elements are in same set"""
        return self.find(x) == self.find(y)

    def get_count(self):
        """Get number of disjoint sets"""
        return self.count


# Alternative: With size tracking
class UnionFindWithSize:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False

        # Attach smaller tree under larger
        if self.size[root_x] < self.size[root_y]:
            self.parent[root_x] = root_y
            self.size[root_y] += self.size[root_x]
        else:
            self.parent[root_y] = root_x
            self.size[root_x] += self.size[root_y]

        return True

    def get_size(self, x):
        return self.size[self.find(x)]`
        }
      },
      testCases: [
        { input: 'n=5, union(0,1), union(1,2), connected(0,2)', output: 'true' },
        { input: 'n=5, union(0,1), union(2,3), connected(0,3)', output: 'false' },
        { input: 'n=5, operations count', output: '5 initially, 3 after unions' }
      ]
    },
    {
      id: 2,
      title: 'Number of Provinces',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/number-of-provinces/',
      description: 'Find the number of provinces (connected components). There are n cities, and isConnected[i][j] = 1 if city i and city j are directly connected.',
      example: `Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
Explanation: Cities 0 and 1 form one province, city 2 forms another.

Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3`,
      explanation: `**Problem:** Count the number of provinces (connected components) in a graph where cities are nodes and edges represent direct connections.

**Input Format:**
- isConnected[i][j] = 1 if city i and city j are directly connected
- isConnected[i][j] = 0 otherwise
- isConnected[i][i] = 1 (city is connected to itself)
- Matrix is symmetric: isConnected[i][j] = isConnected[j][i]

**Key Insight:** This is a classic connected components problem, perfect for Union Find!

**Why Union Find?**
- Each province is a disjoint set
- When two cities are connected, they belong to the same province → union them
- Count of disjoint sets = count of provinces
- Time: O(n²) to read matrix + O(n² * α(n)) for unions ≈ O(n²)
- Space: O(n) for Union Find structure

**Alternative: DFS/BFS**
- Can also solve with DFS/BFS to find connected components
- Time: O(n²) to explore all connections
- Space: O(n) for visited array + O(n) recursion stack
- Similar complexity but Union Find is more elegant

**Approach with Union Find:**

**Step 1: Initialize Union Find**
- Create Union Find with n cities
- Initially, each city is its own province (count = n)

**Step 2: Process Connections**
- Iterate through upper triangle of matrix (avoid duplicates)
- For each isConnected[i][j] == 1:
  - Union city i and city j
  - This merges their provinces
  - Count decrements automatically in union operation

**Step 3: Return Count**
- After all unions, uf.getCount() gives number of provinces
- Each remaining disjoint set is one province

**Why Upper Triangle Only?**
Since matrix is symmetric, isConnected[i][j] = isConnected[j][i]:
- Only need to check i < j (upper triangle)
- Avoids processing same edge twice
- Skip diagonal (i == i) since city always connected to itself

**Example Walkthrough:**
isConnected = [[1,1,0],[1,1,0],[0,0,1]]

Visual representation:
0 — 1    2

Step-by-step unions:
- i=0, j=1: isConnected[0][1] = 1 → union(0,1), count = 2
- i=0, j=2: isConnected[0][2] = 0 → skip
- i=1, j=2: isConnected[1][2] = 0 → skip
Final count = 2 provinces

**Complexity:**
- Time: O(n²) to iterate matrix, O(α(n)) per union ≈ O(n²) total
- Space: O(n) for Union Find arrays`,
      pseudocode: `Main Algorithm:
-----------------------
n = isConnected.length
uf = new UnionFind(n)  // Initially count = n

// Process upper triangle of adjacency matrix
for i = 0 to n-1:
    for j = i+1 to n-1:
        if isConnected[i][j] == 1:
            uf.union(i, j)  // Merge provinces

return uf.getCount()

Example 1: [[1,1,0],[1,1,0],[0,0,1]]
-----------------------
Initial:
parent = [0, 1, 2]
count = 3

i=0, j=1: isConnected[0][1] = 1
- union(0, 1) → parent = [0, 0, 2], count = 2

i=0, j=2: isConnected[0][2] = 0 → skip

i=1, j=2: isConnected[1][2] = 0 → skip

Return count = 2
Provinces: {0, 1} and {2}

Example 2: [[1,0,0],[0,1,0],[0,0,1]]
-----------------------
Initial:
parent = [0, 1, 2]
count = 3

i=0, j=1: isConnected[0][1] = 0 → skip
i=0, j=2: isConnected[0][2] = 0 → skip
i=1, j=2: isConnected[1][2] = 0 → skip

Return count = 3
Provinces: {0}, {1}, {2}

Alternative DFS Approach:
-----------------------
visited = [false] * n
provinces = 0

for i = 0 to n-1:
    if not visited[i]:
        dfs(i)  // Mark all cities in this province as visited
        provinces++

return provinces

dfs(city):
    visited[city] = true
    for other = 0 to n-1:
        if isConnected[city][other] == 1 and not visited[other]:
            dfs(other)

Comparison:
-----------------------
Union Find:
- Pro: More elegant, natural fit for disjoint sets
- Pro: Can easily query if two cities are in same province
- Pro: Amortized O(1) per operation
- Con: Requires extra code for Union Find implementation

DFS:
- Pro: Simpler to understand conceptually
- Pro: No extra data structure needed
- Con: O(n²) worst case for dense graphs
- Con: Recursion stack space

Both have O(n²) time, O(n) space. Union Find preferred for extensibility.`,
      code: {
        java: {
          starterCode: `public int findCircleNum(int[][] isConnected) {
    // TODO: Use Union Find to count provinces

    return 0;
}`,
          solution: `class Solution {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        UnionFind uf = new UnionFind(n);

        // Union connected cities
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (isConnected[i][j] == 1) {
                    uf.union(i, j);
                }
            }
        }

        return uf.getCount();
    }

    class UnionFind {
        private int[] parent;
        private int[] rank;
        private int count;

        public UnionFind(int n) {
            parent = new int[n];
            rank = new int[n];
            count = n;

            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 1;
            }
        }

        public int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        }

        public boolean union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);

            if (rootX == rootY) return false;

            if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }

            count--;
            return true;
        }

        public int getCount() {
            return count;
        }
    }
}

// Alternative: DFS solution
class SolutionDFS {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        boolean[] visited = new boolean[n];
        int provinces = 0;

        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                dfs(isConnected, visited, i);
                provinces++;
            }
        }

        return provinces;
    }

    private void dfs(int[][] isConnected, boolean[] visited, int city) {
        visited[city] = true;

        for (int other = 0; other < isConnected.length; other++) {
            if (isConnected[city][other] == 1 && !visited[other]) {
                dfs(isConnected, visited, other);
            }
        }
    }
}`
        },
        python: {
          starterCode: `def findCircleNum(self, isConnected: List[List[int]]) -> int:
    # TODO: Use Union Find to count provinces
    pass`,
          solution: `class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        uf = UnionFind(n)

        # Union connected cities
        for i in range(n):
            for j in range(i + 1, n):
                if isConnected[i][j] == 1:
                    uf.union(i, j)

        return uf.get_count()


class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [1] * n
        self.count = n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False

        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1

        self.count -= 1
        return True

    def get_count(self):
        return self.count


# Alternative: DFS solution
class SolutionDFS:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        visited = [False] * n
        provinces = 0

        def dfs(city):
            visited[city] = True
            for other in range(n):
                if isConnected[city][other] == 1 and not visited[other]:
                    dfs(other)

        for i in range(n):
            if not visited[i]:
                dfs(i)
                provinces += 1

        return provinces`
        }
      },
      testCases: [
        { input: 'isConnected = [[1,1,0],[1,1,0],[0,0,1]]', output: '2' },
        { input: 'isConnected = [[1,0,0],[0,1,0],[0,0,1]]', output: '3' },
        { input: 'isConnected = [[1,1,1],[1,1,1],[1,1,1]]', output: '1' }
      ]
    },
    {
      id: 3,
      title: 'Graph Valid Tree',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/graph-valid-tree/',
      description: 'Given n nodes and edges, determine if they form a valid tree. A valid tree has exactly n-1 edges, no cycles, and is fully connected.',
      example: `Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
Output: true

Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
Output: false (has cycle)`,
      explanation: `**Problem:** Determine if a graph with n nodes and given edges forms a valid tree.

**Tree Properties:**
A valid tree MUST satisfy ALL three conditions:
1. **Exactly n-1 edges** (no more, no less)
2. **No cycles** (acyclic)
3. **Fully connected** (all nodes reachable from any node)

**Key Insight:** These three properties are interconnected!

If we have n-1 edges:
- If no cycle → must be fully connected (it's a tree!)
- If cycle exists → can't be a tree
- If disconnected → would need more edges to connect

**Why Union Find is Perfect:**

**Cycle Detection:**
- When trying to union(x, y):
  - If find(x) == find(y) → they're already in same set → adding edge creates cycle!
  - If find(x) != find(y) → they're in different sets → safe to union

**Connectivity Check:**
- After all unions, check if count == 1
- count == 1 means all nodes in one connected component

**Approach:**

**Step 1: Early Exit**
- Check if edges.length == n-1
- If not, immediately return false
- Trees MUST have exactly n-1 edges

**Step 2: Cycle Detection with Union Find**
- Initialize Union Find with n nodes
- For each edge [x, y]:
  - Try to union(x, y)
  - If union returns false → nodes already connected → cycle detected!
  - Return false immediately

**Step 3: Connectivity Check**
- After processing all edges, check uf.getCount()
- If count == 1 → all nodes connected → valid tree
- If count > 1 → disconnected components → not a tree

**Why This Works:**

With n-1 edges and no cycles:
- Start with n disjoint sets
- Each successful union decreases count by 1
- n-1 successful unions → count becomes n - (n-1) = 1
- If any union fails (cycle) → return false before count check

**Edge Cases:**

- n=1, edges=[] → true (single node is a tree)
- n=2, edges=[[0,1]] → true (two nodes connected)
- n=3, edges=[[0,1],[0,2],[1,2]] → false (3 edges but n=3, has cycle)
- n=3, edges=[[0,1]] → false (only 2 edges, disconnected)

**Complexity:**
- Time: O(E * α(n)) where E = edges.length ≈ O(n) since E = n-1
- Space: O(n) for Union Find arrays`,
      pseudocode: `Main Algorithm:
-----------------------
// Early exit: tree must have exactly n-1 edges
if edges.length != n - 1:
    return false

uf = new UnionFind(n)

// Try to union all edges, detect cycles
for each edge [x, y] in edges:
    if not uf.union(x, y):
        return false  // Cycle detected!

// Check if fully connected
return uf.getCount() == 1

Example 1: n=5, edges=[[0,1],[0,2],[0,3],[1,4]]
-----------------------
Step 1: edges.length = 4 = n-1 ✓

Step 2: Process edges
Initial: parent = [0,1,2,3,4], count = 5

edge [0,1]: union(0,1) succeeds
  parent = [0,0,2,3,4], count = 4

edge [0,2]: union(0,2) succeeds
  parent = [0,0,0,3,4], count = 3

edge [0,3]: union(0,3) succeeds
  parent = [0,0,0,0,4], count = 2

edge [1,4]: union(1,4) succeeds
  (find(1)=0, find(4)=4, union them)
  parent = [0,0,0,0,0], count = 1

Step 3: count == 1 ✓
Return true

Visual:
    0
   /|\\
  1 2 3
  |
  4

Example 2: n=5, edges=[[0,1],[1,2],[2,3],[1,3],[1,4]]
-----------------------
Step 1: edges.length = 5 != n-1 (5 != 4)
Return false immediately

Note: If we didn't check, we'd find cycle:
- union(0,1) ✓
- union(1,2) ✓
- union(2,3) ✓
- union(1,3) ✗ → cycle! (1 and 3 already connected via 1→2→3)

Visual:
    0
    |
    1
   /|\\
  2 3 4
   \\|
    cycle!

Example 3: n=3, edges=[[0,1]]
-----------------------
Step 1: edges.length = 1 != n-1 (1 != 2)
Return false

This graph is disconnected:
0 — 1    2

Alternative DFS Approach:
-----------------------
// Check edge count
if edges.length != n - 1:
    return false

// Build adjacency list
graph = buildGraph(edges)

visited = [false] * n

// DFS from node 0, check for cycle
if hasCycle(graph, visited, 0, -1):
    return false

// Check if all nodes visited (fully connected)
return all(visited)

hasCycle(graph, visited, node, parent):
    visited[node] = true

    for neighbor in graph[node]:
        if not visited[neighbor]:
            if hasCycle(graph, visited, neighbor, node):
                return true
        elif neighbor != parent:
            return true  // Visited node that's not parent = cycle

    return false

Union Find vs DFS:
-----------------------
Union Find:
- Cleaner, more elegant
- Natural for disjoint sets
- O(n * α(n)) ≈ O(n)

DFS:
- Requires building adjacency list
- Must track parent to avoid false cycle detection
- O(n + E) = O(n) for trees`,
      code: {
        java: {
          starterCode: `public boolean validTree(int n, int[][] edges) {
    // TODO: Use Union Find to detect cycles

    return false;
}`,
          solution: `class Solution {
    public boolean validTree(int n, int[][] edges) {
        // A tree must have exactly n-1 edges
        if (edges.length != n - 1) {
            return false;
        }

        UnionFind uf = new UnionFind(n);

        // Try to union all edges
        for (int[] edge : edges) {
            // If union returns false, there's a cycle
            if (!uf.union(edge[0], edge[1])) {
                return false;
            }
        }

        // Should have exactly 1 connected component
        return uf.getCount() == 1;
    }

    class UnionFind {
        private int[] parent;
        private int[] rank;
        private int count;

        public UnionFind(int n) {
            parent = new int[n];
            rank = new int[n];
            count = n;

            for (int i = 0; i < n; i++) {
                parent[i] = i;
                rank[i] = 1;
            }
        }

        public int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        }

        public boolean union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);

            if (rootX == rootY) return false;

            if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }

            count--;
            return true;
        }

        public int getCount() {
            return count;
        }
    }
}

// Alternative: DFS solution
class SolutionDFS {
    public boolean validTree(int n, int[][] edges) {
        if (edges.length != n - 1) return false;

        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }

        for (int[] edge : edges) {
            graph.get(edge[0]).add(edge[1]);
            graph.get(edge[1]).add(edge[0]);
        }

        boolean[] visited = new boolean[n];
        if (hasCycle(graph, visited, 0, -1)) {
            return false;
        }

        // Check if all nodes are visited (fully connected)
        for (boolean v : visited) {
            if (!v) return false;
        }

        return true;
    }

    private boolean hasCycle(List<List<Integer>> graph, boolean[] visited, int node, int parent) {
        visited[node] = true;

        for (int neighbor : graph.get(node)) {
            if (!visited[neighbor]) {
                if (hasCycle(graph, visited, neighbor, node)) {
                    return true;
                }
            } else if (neighbor != parent) {
                return true; // Found cycle
            }
        }

        return false;
    }
}`
        },
        python: {
          starterCode: `def validTree(self, n: int, edges: List[List[int]]) -> bool:
    # TODO: Use Union Find to detect cycles
    pass`,
          solution: `class Solution:
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        # A tree must have exactly n-1 edges
        if len(edges) != n - 1:
            return False

        uf = UnionFind(n)

        # Try to union all edges
        for x, y in edges:
            # If union returns False, there's a cycle
            if not uf.union(x, y):
                return False

        # Should have exactly 1 connected component
        return uf.get_count() == 1


class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [1] * n
        self.count = n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False

        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1

        self.count -= 1
        return True

    def get_count(self):
        return self.count


# Alternative: DFS solution
class SolutionDFS:
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        if len(edges) != n - 1:
            return False

        graph = [[] for _ in range(n)]
        for x, y in edges:
            graph[x].append(y)
            graph[y].append(x)

        visited = [False] * n

        def has_cycle(node, parent):
            visited[node] = True

            for neighbor in graph[node]:
                if not visited[neighbor]:
                    if has_cycle(neighbor, node):
                        return True
                elif neighbor != parent:
                    return True  # Found cycle

            return False

        if has_cycle(0, -1):
            return False

        # Check if all nodes visited (fully connected)
        return all(visited)`
        }
      },
      testCases: [
        { input: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]', output: 'true' },
        { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]', output: 'false' },
        { input: 'n = 1, edges = []', output: 'true' }
      ]
    },
    {
      id: 4,
      title: 'Accounts Merge',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/accounts-merge/',
      description: 'Merge accounts that share common emails. Each account has a name and list of emails. Return merged accounts sorted.',
      example: `Input: accounts = [
  ["John","john@mail.com","john_work@mail.com"],
  ["John","john@mail.com","john_home@mail.com"],
  ["Mary","mary@mail.com"]
]
Output: [
  ["John","john@mail.com","john_home@mail.com","john_work@mail.com"],
  ["Mary","mary@mail.com"]
]`,
      explanation: `**Problem:** Merge accounts that share any common email. Two accounts belong to same person if they share at least one email.

**Key Insight:** If account A has email1, and account B has email1, they belong to same person. Treat this as a graph connectivity problem!

**Why Union Find?**
- Each email acts as a connection between accounts
- If two accounts share an email → they're connected → union them
- After all unions, accounts in same set belong to same person
- Perfect for Union Find!

**Challenge:** We have accounts, not emails, as the primary entities.

**Solution Approach:**

**Step 1: Map Emails to Account IDs**
- Create HashMap: email → account_id (first account that contains it)
- When processing account i:
  - For each email in account i:
    - If email seen before → union account i with previous account
    - If email not seen → map email to account i

**Step 2: Union Accounts**
- As we process emails, union accounts that share emails
- This connects all accounts belonging to same person

**Step 3: Group Emails by Root Account**
- For each email, find its root account using Union Find
- Group all emails by their root account
- Use TreeSet or sort to keep emails sorted

**Step 4: Build Result**
- For each root account, create merged account:
  - Name: accounts[root][0]
  - Emails: sorted list of all emails in that group

**Example Walkthrough:**

Input:
\`\`\`
0: ["John", "john@mail.com", "john_work@mail.com"]
1: ["John", "john@mail.com", "john_home@mail.com"]
2: ["Mary", "mary@mail.com"]
\`\`\`

**Phase 1: Map emails and union**

Process account 0:
- "john@mail.com" → not seen, map to account 0
- "john_work@mail.com" → not seen, map to account 0

Process account 1:
- "john@mail.com" → already seen in account 0!
  → union(1, 0) ← KEY STEP: merges accounts 0 and 1
- "john_home@mail.com" → not seen, map to account 1

Process account 2:
- "mary@mail.com" → not seen, map to account 2

emailToId map:
\`\`\`
"john@mail.com" → 0
"john_work@mail.com" → 0
"john_home@mail.com" → 1
"mary@mail.com" → 2
\`\`\`

After unions: find(0) = find(1) = 0, find(2) = 2

**Phase 2: Group emails by root**

For each email, find root and group:
- "john@mail.com" → root 0
- "john_work@mail.com" → root 0
- "john_home@mail.com" → root 1 → actually root 0 (via union)
- "mary@mail.com" → root 2

Groups:
\`\`\`
root 0: {"john@mail.com", "john_home@mail.com", "john_work@mail.com"}
root 2: {"mary@mail.com"}
\`\`\`

**Phase 3: Build result**
\`\`\`
Account 0: ["John", "john@mail.com", "john_home@mail.com", "john_work@mail.com"]
Account 2: ["Mary", "mary@mail.com"]
\`\`\`

**Why This Works:**
- Shared email creates transitive connection
- If A shares with B, and B shares with C → A, B, C all connected
- Union Find handles transitivity automatically

**Edge Cases:**
- Single account → no merging needed
- Multiple accounts, no overlap → each account stays separate
- Chain of connections: A-B, B-C, C-D → all merge together

**Complexity:**
- Time: O(N * M * α(N)) where N = accounts, M = max emails per account
  - Processing emails: O(N * M)
  - Union operations: O(N * α(N))
  - Grouping and sorting: O(total_emails * log(total_emails))
- Space: O(total_emails) for maps and Union Find`,
      pseudocode: `Main Algorithm:
-----------------------
n = accounts.length
uf = new UnionFind(n)
emailToId = new HashMap<String, Integer>()

// Phase 1: Map emails and union accounts
for i = 0 to n-1:
    for each email in accounts[i][1:]:  // Skip name at index 0
        if email in emailToId:
            // This email connects account i to previous account
            previousAccount = emailToId[email]
            uf.union(i, previousAccount)
        else:
            emailToId[email] = i

// Phase 2: Group emails by root account
groups = new HashMap<Integer, Set<String>>()

for each (email, accountId) in emailToId:
    root = uf.find(accountId)
    groups[root].add(email)  // Use TreeSet for auto-sorting

// Phase 3: Build result
result = []
for each (root, emails) in groups:
    account = [accounts[root][0]]  // Name
    account.addAll(sorted(emails))  // Sorted emails
    result.add(account)

return result

Example Detailed Walkthrough:
-----------------------
accounts = [
  ["John", "a@x.com", "b@x.com"],
  ["John", "c@x.com", "a@x.com"],
  ["John", "c@x.com", "d@x.com"]
]

Phase 1: Process accounts
-----------------------
Account 0: ["John", "a@x.com", "b@x.com"]
- "a@x.com" → not seen, emailToId["a@x.com"] = 0
- "b@x.com" → not seen, emailToId["b@x.com"] = 0

parent = [0, 1, 2]

Account 1: ["John", "c@x.com", "a@x.com"]
- "c@x.com" → not seen, emailToId["c@x.com"] = 1
- "a@x.com" → seen! previousAccount = 0
  → union(1, 0)
  → parent = [0, 0, 2]

Account 2: ["John", "c@x.com", "d@x.com"]
- "c@x.com" → seen! previousAccount = 1
  → union(2, 1)
  → find(1) = 0, so union(2, 0)
  → parent = [0, 0, 0]
- "d@x.com" → not seen, emailToId["d@x.com"] = 2

emailToId after processing:
{
  "a@x.com": 0,
  "b@x.com": 0,
  "c@x.com": 1,
  "d@x.com": 2
}

Phase 2: Group by root
-----------------------
For "a@x.com": accountId=0, root=find(0)=0
  → groups[0].add("a@x.com")

For "b@x.com": accountId=0, root=find(0)=0
  → groups[0].add("b@x.com")

For "c@x.com": accountId=1, root=find(1)=0
  → groups[0].add("c@x.com")

For "d@x.com": accountId=2, root=find(2)=0
  → groups[0].add("d@x.com")

groups = {
  0: {"a@x.com", "b@x.com", "c@x.com", "d@x.com"}
}

Phase 3: Build result
-----------------------
root=0:
  name = accounts[0][0] = "John"
  emails = sorted(groups[0]) = ["a@x.com", "b@x.com", "c@x.com", "d@x.com"]
  account = ["John", "a@x.com", "b@x.com", "c@x.com", "d@x.com"]

result = [["John", "a@x.com", "b@x.com", "c@x.com", "d@x.com"]]

Connection Graph:
-----------------------
Account 0 has "a@x.com" and "b@x.com"
Account 1 has "c@x.com" and "a@x.com" → shares "a@x.com" with Account 0
Account 2 has "c@x.com" and "d@x.com" → shares "c@x.com" with Account 1

Transitivity:
Account 0 ← "a@x.com" → Account 1 ← "c@x.com" → Account 2

All three accounts connected, so merge into one!`,
      code: {
        java: {
          starterCode: `public List<List<String>> accountsMerge(List<List<String>> accounts) {
    // TODO: Use Union Find to merge accounts

    return new ArrayList<>();
}`,
          solution: `class Solution {
    public List<List<String>> accountsMerge(List<List<String>> accounts) {
        int n = accounts.size();
        UnionFind uf = new UnionFind(n);
        Map<String, Integer> emailToId = new HashMap<>();

        // Map each email to first account that contains it
        for (int i = 0; i < n; i++) {
            for (int j = 1; j < accounts.get(i).size(); j++) {
                String email = accounts.get(i).get(j);

                if (emailToId.containsKey(email)) {
                    // Union with previous account that had this email
                    uf.union(i, emailToId.get(email));
                } else {
                    emailToId.put(email, i);
                }
            }
        }

        // Group emails by root account
        Map<Integer, Set<String>> groups = new HashMap<>();
        for (String email : emailToId.keySet()) {
            int id = emailToId.get(email);
            int root = uf.find(id);

            groups.putIfAbsent(root, new TreeSet<>());
            groups.get(root).add(email);
        }

        // Build result
        List<List<String>> result = new ArrayList<>();
        for (int root : groups.keySet()) {
            List<String> account = new ArrayList<>();
            account.add(accounts.get(root).get(0)); // Name
            account.addAll(groups.get(root)); // Sorted emails
            result.add(account);
        }

        return result;
    }

    class UnionFind {
        private int[] parent;

        public UnionFind(int n) {
            parent = new int[n];
            for (int i = 0; i < n; i++) {
                parent[i] = i;
            }
        }

        public int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        }

        public void union(int x, int y) {
            parent[find(x)] = find(y);
        }
    }
}`
        },
        python: {
          starterCode: `def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
    # TODO: Use Union Find to merge accounts
    pass`,
          solution: `class Solution:
    def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
        n = len(accounts)
        uf = UnionFind(n)
        email_to_id = {}

        # Map each email to first account that contains it
        for i in range(n):
            for email in accounts[i][1:]:
                if email in email_to_id:
                    # Union with previous account that had this email
                    uf.union(i, email_to_id[email])
                else:
                    email_to_id[email] = i

        # Group emails by root account
        groups = collections.defaultdict(set)
        for email, account_id in email_to_id.items():
            root = uf.find(account_id)
            groups[root].add(email)

        # Build result
        result = []
        for root, emails in groups.items():
            account = [accounts[root][0]] + sorted(emails)
            result.append(account)

        return result


class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        self.parent[self.find(x)] = self.find(y)`
        }
      },
      testCases: [
        { input: '[["John","a@x.com","b@x.com"],["John","c@x.com","a@x.com"]]', output: '[["John","a@x.com","b@x.com","c@x.com"]]' },
        { input: '[["Alice","alice@mail.com"],["Bob","bob@mail.com"]]', output: '2 separate accounts' }
      ]
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Union Find-${q.id}`)).length
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
    const savedDrawing = localStorage.getItem(`drawing-UnionFind-${question.id}`)
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
              <CompletionCheckbox problemId={`Union Find-${selectedQuestion.id}`} />
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
            const savedDrawing = localStorage.getItem(`drawing-UnionFind-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`UnionFind-${selectedQuestion.id}`}
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
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>🔗 Union Find</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Master union find problems</p>

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
                          <CompletionCheckbox problemId={`Union Find-${question.id}`} />
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

export default UnionFind
