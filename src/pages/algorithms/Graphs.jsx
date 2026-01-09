import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function Graphs({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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
      title: 'Number of Islands',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/',
      description: 'Given an m x n 2D binary grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
      example: `Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3`,
      code: {
        java: {
          starterCode: `public int numIslands(char[][] grid) {
    // Write your code here

}`,
          solution: `class Solution {
    // Approach 1: DFS - Recursive
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) {
            return 0;
        }

        int rows = grid.length;
        int cols = grid[0].length;
        int islands = 0;

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == '1') {
                    islands++;
                    dfs(grid, i, j);
                }
            }
        }

        return islands;
    }

    private void dfs(char[][] grid, int row, int col) {
        int rows = grid.length;
        int cols = grid[0].length;

        // Base cases: out of bounds or water
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] == '0') {
            return;
        }

        // Mark as visited by changing '1' to '0'
        grid[row][col] = '0';

        // Explore all 4 directions (up, down, left, right)
        dfs(grid, row - 1, col); // up
        dfs(grid, row + 1, col); // down
        dfs(grid, row, col - 1); // left
        dfs(grid, row, col + 1); // right
    }
}

// Approach 2: BFS - Iterative using Queue
class SolutionBFS {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) {
            return 0;
        }

        int rows = grid.length;
        int cols = grid[0].length;
        int islands = 0;

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == '1') {
                    islands++;
                    bfs(grid, i, j);
                }
            }
        }

        return islands;
    }

    private void bfs(char[][] grid, int row, int col) {
        int rows = grid.length;
        int cols = grid[0].length;
        Queue<int[]> queue = new LinkedList<>();

        queue.offer(new int[]{row, col});
        grid[row][col] = '0'; // Mark as visited

        int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int r = current[0];
            int c = current[1];

            for (int[] dir : directions) {
                int newRow = r + dir[0];
                int newCol = c + dir[1];

                if (newRow >= 0 && newRow < rows && newCol >= 0 &&
                    newCol < cols && grid[newRow][newCol] == '1') {
                    queue.offer(new int[]{newRow, newCol});
                    grid[newRow][newCol] = '0'; // Mark as visited
                }
            }
        }
    }
}

// Approach 3: Union-Find (Disjoint Set Union)
class SolutionUnionFind {
    class UnionFind {
        int[] parent;
        int[] rank;
        int count; // Number of islands

        UnionFind(char[][] grid) {
            int rows = grid.length;
            int cols = grid[0].length;
            parent = new int[rows * cols];
            rank = new int[rows * cols];
            count = 0;

            for (int i = 0; i < rows; i++) {
                for (int j = 0; j < cols; j++) {
                    if (grid[i][j] == '1') {
                        int id = i * cols + j;
                        parent[id] = id;
                        count++;
                    }
                }
            }
        }

        int find(int x) {
            if (parent[x] != x) {
                parent[x] = find(parent[x]); // Path compression
            }
            return parent[x];
        }

        void union(int x, int y) {
            int rootX = find(x);
            int rootY = find(y);

            if (rootX != rootY) {
                // Union by rank
                if (rank[rootX] < rank[rootY]) {
                    parent[rootX] = rootY;
                } else if (rank[rootX] > rank[rootY]) {
                    parent[rootY] = rootX;
                } else {
                    parent[rootY] = rootX;
                    rank[rootX]++;
                }
                count--;
            }
        }

        int getCount() {
            return count;
        }
    }

    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) {
            return 0;
        }

        int rows = grid.length;
        int cols = grid[0].length;
        UnionFind uf = new UnionFind(grid);

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == '1') {
                    int id = i * cols + j;

                    // Check right neighbor
                    if (j + 1 < cols && grid[i][j + 1] == '1') {
                        uf.union(id, id + 1);
                    }

                    // Check down neighbor
                    if (i + 1 < rows && grid[i + 1][j] == '1') {
                        uf.union(id, id + cols);
                    }
                }
            }
        }

        return uf.getCount();
    }
}

/*
Time Complexity:
- DFS/BFS: O(M * N) where M = rows, N = cols
- Union-Find: O(M * N * α(M*N)) where α is inverse Ackermann function (practically O(M*N))

Space Complexity:
- DFS: O(M * N) for recursion stack in worst case
- BFS: O(min(M, N)) for queue
- Union-Find: O(M * N) for parent and rank arrays
*/`
        },
        python: {
          starterCode: `def numIslands(self, grid: List[List[str]]) -> int:
    # Write your code here
    pass`,
          solution: `from typing import List
from collections import deque

class Solution:
    # Approach 1: DFS - Recursive
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])
        islands = 0

        def dfs(row: int, col: int):
            # Base cases: out of bounds or water
            if (row < 0 or row >= rows or col < 0 or col >= cols or
                grid[row][col] == '0'):
                return

            # Mark as visited by changing '1' to '0'
            grid[row][col] = '0'

            # Explore all 4 directions (up, down, left, right)
            dfs(row - 1, col)  # up
            dfs(row + 1, col)  # down
            dfs(row, col - 1)  # left
            dfs(row, col + 1)  # right

        for i in range(rows):
            for j in range(cols):
                if grid[i][j] == '1':
                    islands += 1
                    dfs(i, j)

        return islands


# Approach 2: BFS - Iterative using Queue
class SolutionBFS:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])
        islands = 0

        def bfs(row: int, col: int):
            queue = deque([(row, col)])
            grid[row][col] = '0'  # Mark as visited

            directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

            while queue:
                r, c = queue.popleft()

                for dr, dc in directions:
                    new_row, new_col = r + dr, c + dc

                    if (0 <= new_row < rows and 0 <= new_col < cols and
                        grid[new_row][new_col] == '1'):
                        queue.append((new_row, new_col))
                        grid[new_row][new_col] = '0'  # Mark as visited

        for i in range(rows):
            for j in range(cols):
                if grid[i][j] == '1':
                    islands += 1
                    bfs(i, j)

        return islands


# Approach 3: Union-Find (Disjoint Set Union)
class SolutionUnionFind:
    class UnionFind:
        def __init__(self, grid):
            rows, cols = len(grid), len(grid[0])
            self.parent = {}
            self.rank = {}
            self.count = 0

            for i in range(rows):
                for j in range(cols):
                    if grid[i][j] == '1':
                        idx = i * cols + j
                        self.parent[idx] = idx
                        self.rank[idx] = 0
                        self.count += 1

        def find(self, x):
            if self.parent[x] != x:
                self.parent[x] = self.find(self.parent[x])  # Path compression
            return self.parent[x]

        def union(self, x, y):
            root_x = self.find(x)
            root_y = self.find(y)

            if root_x != root_y:
                # Union by rank
                if self.rank[root_x] < self.rank[root_y]:
                    self.parent[root_x] = root_y
                elif self.rank[root_x] > self.rank[root_y]:
                    self.parent[root_y] = root_x
                else:
                    self.parent[root_y] = root_x
                    self.rank[root_x] += 1
                self.count -= 1

        def get_count(self):
            return self.count

    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid or not grid[0]:
            return 0

        rows, cols = len(grid), len(grid[0])
        uf = self.UnionFind(grid)

        for i in range(rows):
            for j in range(cols):
                if grid[i][j] == '1':
                    idx = i * cols + j

                    # Check right neighbor
                    if j + 1 < cols and grid[i][j + 1] == '1':
                        uf.union(idx, idx + 1)

                    # Check down neighbor
                    if i + 1 < rows and grid[i + 1][j] == '1':
                        uf.union(idx, idx + cols)

        return uf.get_count()


"""
Time Complexity:
- DFS/BFS: O(M * N) where M = rows, N = cols
- Union-Find: O(M * N * α(M*N)) where α is inverse Ackermann function (practically O(M*N))

Space Complexity:
- DFS: O(M * N) for recursion stack in worst case
- BFS: O(min(M, N)) for queue
- Union-Find: O(M * N) for parent and rank dictionaries
"""`
        }
      },
      testCases: [
        { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1' },
        { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3' },
        { input: 'grid = [["1","0","1","0","1"],["0","1","0","1","0"],["1","0","1","0","1"]]', output: '8' }
      ],
      explanation: `**Problem:** Count number of islands (connected components of '1's) in a 2D grid.

**Key Insight:** Each island is a connected component. When we find a '1', we explore the entire island (marking visited cells) and count it as one island. The total count gives us the answer.

**Approach 1: DFS (Depth-First Search)**
1. Iterate through each cell in the grid
2. When we find a '1' (unvisited land):
   - Increment island count
   - Mark the cell as '0' (visited)
   - Recursively explore all 4 adjacent cells (up, down, left, right)
3. DFS automatically marks all connected land cells as visited

**Approach 2: BFS (Breadth-First Search)**
1. Same outer iteration through the grid
2. When we find a '1':
   - Increment island count
   - Use a queue to explore the island level by level
   - Mark cells as '0' as we visit them
3. BFS explores all connected cells using a queue

**Approach 3: Union-Find (Disjoint Set Union)**
1. Initialize each '1' cell as its own parent
2. Union adjacent '1' cells (right and down neighbors)
3. Each union operation merges two islands into one
4. Final count gives number of distinct islands

**Complexity:**
- DFS/BFS: Time O(M×N), Space O(M×N) for recursion/queue
- Union-Find: Time O(M×N×α(M×N)), Space O(M×N) where α is inverse Ackermann function`,
      pseudocode: `DFS Approach:
function numIslands(grid):
    if grid is empty: return 0

    islands = 0
    rows = grid.length
    cols = grid[0].length

    for i in 0 to rows-1:
        for j in 0 to cols-1:
            if grid[i][j] == '1':
                islands++
                dfs(grid, i, j)

    return islands

function dfs(grid, row, col):
    // Base case: out of bounds or water
    if row < 0 or row >= rows or col < 0 or col >= cols or grid[row][col] == '0':
        return

    // Mark as visited
    grid[row][col] = '0'

    // Explore all 4 directions
    dfs(grid, row-1, col)  // up
    dfs(grid, row+1, col)  // down
    dfs(grid, row, col-1)  // left
    dfs(grid, row, col+1)  // right

Example: grid = [["1","1","0"],["1","0","0"],["0","0","1"]]
- Start at (0,0): Find '1', islands=1, DFS marks (0,0), (0,1), (1,0) as '0'
- Continue scanning, find '1' at (2,2): islands=2, DFS marks (2,2) as '0'
- Result: 2 islands`
    },
    {
      id: 2,
      title: 'Detect Cycle in Graph',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/course-schedule/',
      description: 'Detect if a directed graph contains a cycle. A cycle exists if you can start at a node and follow edges to return to the same node. Implement both DFS-based and topological sort approaches.',
      example: `Input: numCourses = 2, prerequisites = [[1,0]]
Graph: 0 → 1
Output: false (no cycle)

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Graph: 0 ⇄ 1
Output: true (cycle exists)`,
      code: {
        java: {
          starterCode: `public boolean canFinish(int numCourses, int[][] prerequisites) {
    // Write your code here

}`,
          solution: `class Solution {
    // Detect cycle using DFS with recursion stack
    public boolean hasCycle(int n, int[][] edges) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }

        for (int[] edge : edges) {
            graph.get(edge[0]).add(edge[1]);
        }

        int[] state = new int[n]; // 0: unvisited, 1: visiting, 2: visited

        for (int i = 0; i < n; i++) {
            if (state[i] == 0) {
                if (dfs(graph, i, state)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean dfs(List<List<Integer>> graph, int node, int[] state) {
        if (state[node] == 1) return true;  // Found cycle
        if (state[node] == 2) return false; // Already processed

        state[node] = 1; // Mark as visiting

        for (int neighbor : graph.get(node)) {
            if (dfs(graph, neighbor, state)) {
                return true;
            }
        }

        state[node] = 2; // Mark as visited
        return false;
    }
}

// Alternative: Using Kahn's Algorithm (Topological Sort)
class SolutionKahns {
    public boolean hasCycle(int n, int[][] edges) {
        List<List<Integer>> graph = new ArrayList<>();
        int[] indegree = new int[n];

        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }

        for (int[] edge : edges) {
            graph.get(edge[0]).add(edge[1]);
            indegree[edge[1]]++;
        }

        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) {
                queue.offer(i);
            }
        }

        int processed = 0;
        while (!queue.isEmpty()) {
            int node = queue.poll();
            processed++;

            for (int neighbor : graph.get(node)) {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }

        // If not all nodes processed, there's a cycle
        return processed != n;
    }
}

// For undirected graph
class SolutionUndirected {
    public boolean hasCycleUndirected(int n, int[][] edges) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }

        for (int[] edge : edges) {
            graph.get(edge[0]).add(edge[1]);
            graph.get(edge[1]).add(edge[0]);
        }

        boolean[] visited = new boolean[n];

        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                if (dfs(graph, i, -1, visited)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean dfs(List<List<Integer>> graph, int node,
                       int parent, boolean[] visited) {
        visited[node] = true;

        for (int neighbor : graph.get(node)) {
            if (!visited[neighbor]) {
                if (dfs(graph, neighbor, node, visited)) {
                    return true;
                }
            } else if (neighbor != parent) {
                return true; // Back edge found
            }
        }
        return false;
    }
}`
        },
        python: {
          starterCode: `def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
    # Write your code here
    pass`,
          solution: `from typing import List
from collections import deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # Build adjacency list
        graph = [[] for _ in range(numCourses)]
        for course, prereq in prerequisites:
            graph[prereq].append(course)

        # 0: unvisited, 1: visiting, 2: visited
        state = [0] * numCourses

        def has_cycle(node: int) -> bool:
            if state[node] == 1:  # Found cycle
                return True
            if state[node] == 2:  # Already processed
                return False

            state[node] = 1  # Mark as visiting

            for neighbor in graph[node]:
                if has_cycle(neighbor):
                    return True

            state[node] = 2  # Mark as visited
            return False

        # Check all nodes
        for i in range(numCourses):
            if state[i] == 0:
                if has_cycle(i):
                    return False

        return True


# Alternative: Using Kahn's Algorithm (Topological Sort)
class SolutionKahns:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        graph = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses

        for course, prereq in prerequisites:
            graph[prereq].append(course)
            indegree[course] += 1

        queue = deque([i for i in range(numCourses) if indegree[i] == 0])
        processed = 0

        while queue:
            node = queue.popleft()
            processed += 1

            for neighbor in graph[node]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    queue.append(neighbor)

        # If not all nodes processed, there's a cycle
        return processed == numCourses


# For undirected graph
class SolutionUndirected:
    def has_cycle_undirected(self, n: int, edges: List[List[int]]) -> bool:
        graph = [[] for _ in range(n)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)

        visited = [False] * n

        def dfs(node: int, parent: int) -> bool:
            visited[node] = True

            for neighbor in graph[node]:
                if not visited[neighbor]:
                    if dfs(neighbor, node):
                        return True
                elif neighbor != parent:
                    return True  # Back edge found

            return False

        for i in range(n):
            if not visited[i]:
                if dfs(i, -1):
                    return True

        return False`
        }
      },
      testCases: [
        { input: 'n = 2, edges = [[1,0]]', output: 'false' },
        { input: 'n = 2, edges = [[1,0],[0,1]]', output: 'true' },
        { input: 'n = 4, edges = [[0,1],[1,2],[2,3]]', output: 'false' }
      ],
      explanation: `**Problem:** Detect if a directed graph contains a cycle.

**Key Insight:** A cycle exists when we can reach a node that's currently being visited (in our recursion stack). We need to distinguish between "currently visiting" and "already visited" nodes.

**Approach 1: DFS with 3-State Tracking**
1. Use 3 states: 0=unvisited, 1=visiting (in current DFS path), 2=visited (fully processed)
2. For each unvisited node, start DFS
3. During DFS:
   - Mark node as "visiting" (state=1)
   - Recursively visit all neighbors
   - If we encounter a "visiting" node → cycle detected!
   - After processing, mark as "visited" (state=2)
4. State 2 prevents re-processing in disconnected components

**Approach 2: Kahn's Algorithm (Topological Sort)**
1. Calculate in-degree (number of incoming edges) for each node
2. Start with all nodes having in-degree 0
3. Process nodes with in-degree 0:
   - Add to result
   - Decrease in-degree of neighbors
   - Add neighbors with in-degree 0 to queue
4. If processed count < total nodes → cycle exists!

**Why It Works:** In a DAG, we can always find a node with in-degree 0. If we can't process all nodes, there must be a cycle preventing progress.

**Complexity:**
- DFS: Time O(V+E), Space O(V) for recursion stack
- Kahn's: Time O(V+E), Space O(V) for queue and in-degree array`,
      pseudocode: `DFS with 3 States:
function hasCycle(n, edges):
    // Build adjacency list
    graph = [[] for i in 0 to n-1]
    for [u, v] in edges:
        graph[u].add(v)

    state = [0] * n  // 0: unvisited, 1: visiting, 2: visited

    for i in 0 to n-1:
        if state[i] == 0:
            if dfs(i, graph, state):
                return true  // Cycle found

    return false

function dfs(node, graph, state):
    if state[node] == 1:
        return true  // Back edge found - cycle!
    if state[node] == 2:
        return false  // Already processed

    state[node] = 1  // Mark as visiting

    for neighbor in graph[node]:
        if dfs(neighbor, graph, state):
            return true

    state[node] = 2  // Mark as visited
    return false

Example: edges = [[0,1],[1,2],[2,0]]
- Visit 0: state[0]=1, visit 1: state[1]=1, visit 2: state[2]=1
- Visit 0 again: state[0]=1 → Cycle detected!`
    },
    {
      id: 3,
      title: 'Shortest Path (Dijkstra)',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/network-delay-time/',
      description: 'Find the shortest path from a source node to all other nodes in a weighted graph using Dijkstra\'s algorithm. Works for graphs with non-negative edge weights.',
      example: `Input: n = 5, edges = [[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5],[3,4,3]], start = 0
Graph:
  0 --4-→ 1 --1-→ 3 --3-→ 4
  |       ↑           ↑
  1       2           5
  ↓                   |
  2 ------------------
Output: distances = [0,3,1,4,7]
Explanation: Shortest paths from node 0`,
      code: {
        java: {
          starterCode: `public int networkDelayTime(int[][] times, int n, int k) {
    // Write your code here

}`,
          solution: `class Solution {
    public int[] dijkstra(int n, int[][] edges, int start) {
        // Build adjacency list with weights
        List<List<int[]>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }

        for (int[] edge : edges) {
            graph.get(edge[0]).add(new int[]{edge[1], edge[2]});
        }

        int[] distances = new int[n];
        Arrays.fill(distances, Integer.MAX_VALUE);
        distances[start] = 0;

        // Priority queue: [distance, node]
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.offer(new int[]{0, start});

        while (!pq.isEmpty()) {
            int[] current = pq.poll();
            int dist = current[0];
            int node = current[1];

            // Skip if we've found a better path
            if (dist > distances[node]) continue;

            // Check all neighbors
            for (int[] neighbor : graph.get(node)) {
                int nextNode = neighbor[0];
                int weight = neighbor[1];
                int newDist = dist + weight;

                // If shorter path found
                if (newDist < distances[nextNode]) {
                    distances[nextNode] = newDist;
                    pq.offer(new int[]{newDist, nextNode});
                }
            }
        }

        return distances;
    }
}

// With path reconstruction
class SolutionWithPath {
    public class Result {
        int[] distances;
        int[] parent;

        Result(int[] d, int[] p) {
            distances = d;
            parent = p;
        }
    }

    public Result dijkstraWithPath(int n, int[][] edges, int start) {
        List<List<int[]>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }

        for (int[] edge : edges) {
            graph.get(edge[0]).add(new int[]{edge[1], edge[2]});
        }

        int[] distances = new int[n];
        int[] parent = new int[n];
        Arrays.fill(distances, Integer.MAX_VALUE);
        Arrays.fill(parent, -1);
        distances[start] = 0;

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.offer(new int[]{0, start});

        while (!pq.isEmpty()) {
            int[] current = pq.poll();
            int dist = current[0];
            int node = current[1];

            if (dist > distances[node]) continue;

            for (int[] neighbor : graph.get(node)) {
                int nextNode = neighbor[0];
                int weight = neighbor[1];
                int newDist = dist + weight;

                if (newDist < distances[nextNode]) {
                    distances[nextNode] = newDist;
                    parent[nextNode] = node;
                    pq.offer(new int[]{newDist, nextNode});
                }
            }
        }

        return new Result(distances, parent);
    }

    public List<Integer> reconstructPath(int[] parent, int target) {
        List<Integer> path = new ArrayList<>();
        for (int node = target; node != -1; node = parent[node]) {
            path.add(node);
        }
        Collections.reverse(path);
        return path;
    }
}

// Using visited set for optimization
class SolutionOptimized {
    public int[] dijkstra(int n, int[][] edges, int start) {
        List<List<int[]>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }

        for (int[] edge : edges) {
            graph.get(edge[0]).add(new int[]{edge[1], edge[2]});
        }

        int[] distances = new int[n];
        Arrays.fill(distances, Integer.MAX_VALUE);
        distances[start] = 0;

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.offer(new int[]{0, start});

        boolean[] visited = new boolean[n];

        while (!pq.isEmpty()) {
            int[] current = pq.poll();
            int node = current[1];

            if (visited[node]) continue;
            visited[node] = true;

            for (int[] neighbor : graph.get(node)) {
                int nextNode = neighbor[0];
                int weight = neighbor[1];
                int newDist = distances[node] + weight;

                if (newDist < distances[nextNode]) {
                    distances[nextNode] = newDist;
                    pq.offer(new int[]{newDist, nextNode});
                }
            }
        }

        return distances;
    }
}`
        },
        python: {
          starterCode: `def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
    # Write your code here
    pass`,
          solution: `from typing import List
import heapq

class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        # Build adjacency list with weights
        graph = [[] for _ in range(n + 1)]
        for u, v, w in times:
            graph[u].append((v, w))

        distances = [float('inf')] * (n + 1)
        distances[k] = 0

        # Priority queue: (distance, node)
        pq = [(0, k)]

        while pq:
            dist, node = heapq.heappop(pq)

            # Skip if we've found a better path
            if dist > distances[node]:
                continue

            # Check all neighbors
            for neighbor, weight in graph[node]:
                new_dist = dist + weight

                # If shorter path found
                if new_dist < distances[neighbor]:
                    distances[neighbor] = new_dist
                    heapq.heappush(pq, (new_dist, neighbor))

        # Find maximum distance (excluding index 0)
        max_dist = max(distances[1:])
        return max_dist if max_dist != float('inf') else -1


# With path reconstruction
class SolutionWithPath:
    def dijkstra_with_path(self, n: int, edges: List[List[int]], start: int) -> tuple:
        graph = [[] for _ in range(n)]
        for u, v, w in edges:
            graph[u].append((v, w))

        distances = [float('inf')] * n
        parent = [-1] * n
        distances[start] = 0

        pq = [(0, start)]

        while pq:
            dist, node = heapq.heappop(pq)

            if dist > distances[node]:
                continue

            for neighbor, weight in graph[node]:
                new_dist = dist + weight

                if new_dist < distances[neighbor]:
                    distances[neighbor] = new_dist
                    parent[neighbor] = node
                    heapq.heappush(pq, (new_dist, neighbor))

        return distances, parent

    def reconstruct_path(self, parent: List[int], target: int) -> List[int]:
        path = []
        node = target
        while node != -1:
            path.append(node)
            node = parent[node]
        return path[::-1]


# Using visited set for optimization
class SolutionOptimized:
    def dijkstra(self, n: int, edges: List[List[int]], start: int) -> List[int]:
        graph = [[] for _ in range(n)]
        for u, v, w in edges:
            graph[u].append((v, w))

        distances = [float('inf')] * n
        distances[start] = 0

        pq = [(0, start)]
        visited = set()

        while pq:
            dist, node = heapq.heappop(pq)

            if node in visited:
                continue
            visited.add(node)

            for neighbor, weight in graph[node]:
                new_dist = distances[node] + weight

                if new_dist < distances[neighbor]:
                    distances[neighbor] = new_dist
                    heapq.heappush(pq, (new_dist, neighbor))

        return distances`
        }
      },
      testCases: [
        { input: 'n = 5, edges = [[0,1,4],[0,2,1],[2,1,2]], start = 0', output: '[0,3,1,INF,INF]' },
        { input: 'n = 3, edges = [[0,1,1],[1,2,2],[0,2,4]], start = 0', output: '[0,1,3]' },
        { input: 'n = 4, edges = [[0,1,1],[0,2,4],[1,2,2],[1,3,5]], start = 0', output: '[0,1,3,6]' }
      ],
      explanation: `**Problem:** Find shortest path from source to all nodes in a weighted graph with non-negative edge weights.

**Key Insight:** Greedy approach - always expand the closest unvisited node. Once a node is processed, we've found its shortest path because all edge weights are non-negative.

**Dijkstra's Algorithm:**
1. Initialize distances: source=0, all others=infinity
2. Use a min-heap (priority queue) ordered by distance
3. Start with source node in the heap
4. While heap is not empty:
   - Extract node with minimum distance
   - For each neighbor:
     - Calculate new_distance = current_distance + edge_weight
     - If new_distance < neighbor's current distance:
       - Update neighbor's distance
       - Add neighbor to heap with new distance
5. The distances array contains shortest paths to all nodes

**Why Priority Queue?** We need to efficiently get the node with minimum distance. Priority queue gives us O(log V) operations.

**Optimization:** Use a visited set to avoid reprocessing nodes. Once a node is processed from the priority queue, its shortest path is finalized.

**Path Reconstruction:** Keep a parent array. When updating distances, also update parent[neighbor] = current_node. Trace back from target to source using parent array.

**Complexity:** Time O((V+E) log V) with binary heap, O(V²) with array. Space O(V) for distances and priority queue.`,
      pseudocode: `function dijkstra(n, edges, start):
    // Build adjacency list: graph[u] = [(v, weight), ...]
    graph = [[] for i in 0 to n-1]
    for [u, v, w] in edges:
        graph[u].add((v, w))

    distances = [infinity] * n
    distances[start] = 0

    // Priority queue: (distance, node)
    pq = MinHeap()
    pq.add((0, start))

    while pq is not empty:
        dist, node = pq.extractMin()

        // Skip if we've found a better path
        if dist > distances[node]:
            continue

        // Explore neighbors
        for (neighbor, weight) in graph[node]:
            new_dist = dist + weight

            // Relaxation step
            if new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                pq.add((new_dist, neighbor))

    return distances

Example: edges = [[0,1,4],[0,2,1],[2,1,2]], start = 0
- Initial: dist=[0,∞,∞], pq=[(0,0)]
- Process 0: dist=[0,4,1], pq=[(1,2),(4,1)]
- Process 2: dist=[0,3,1], pq=[(3,1),(4,1)]
- Process 1: dist=[0,3,1], done
- Result: [0,3,1]`
    },
    {
      id: 4,
      title: 'Topological Sort',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/course-schedule-ii/',
      description: 'Find a topological ordering of a directed acyclic graph (DAG). A topological sort orders vertices such that for every edge (u,v), u comes before v. Implement both DFS and Kahn\'s algorithm approaches.',
      example: `Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Graph:
  0 → 1 → 3
  ↓       ↑
  2 ------
Output: [0,1,2,3] or [0,2,1,3]
Explanation: Valid orderings where prerequisites come first`,
      code: {
        java: {
          starterCode: `public int[] findOrder(int numCourses, int[][] prerequisites) {
    // Write your code here

}`,
          solution: `class Solution {
    // Topological Sort using DFS
    public int[] topologicalSort(int n, int[][] edges) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }

        for (int[] edge : edges) {
            graph.get(edge[0]).add(edge[1]);
        }

        boolean[] visited = new boolean[n];
        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                dfs(graph, i, visited, stack);
            }
        }

        int[] result = new int[n];
        int idx = 0;
        while (!stack.isEmpty()) {
            result[idx++] = stack.pop();
        }

        return result;
    }

    private void dfs(List<List<Integer>> graph, int node,
                    boolean[] visited, Stack<Integer> stack) {
        visited[node] = true;

        for (int neighbor : graph.get(node)) {
            if (!visited[neighbor]) {
                dfs(graph, neighbor, visited, stack);
            }
        }

        stack.push(node);
    }
}

// Kahn's Algorithm (BFS-based)
class SolutionKahns {
    public int[] topologicalSort(int n, int[][] edges) {
        List<List<Integer>> graph = new ArrayList<>();
        int[] indegree = new int[n];

        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }

        for (int[] edge : edges) {
            graph.get(edge[0]).add(edge[1]);
            indegree[edge[1]]++;
        }

        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) {
                queue.offer(i);
            }
        }

        int[] result = new int[n];
        int idx = 0;

        while (!queue.isEmpty()) {
            int node = queue.poll();
            result[idx++] = node;

            for (int neighbor : graph.get(node)) {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }

        // If idx != n, there's a cycle
        return idx == n ? result : new int[0];
    }
}

// With cycle detection
class SolutionWithCycleDetection {
    public int[] topologicalSort(int n, int[][] edges) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }

        for (int[] edge : edges) {
            graph.get(edge[0]).add(edge[1]);
        }

        int[] state = new int[n]; // 0: unvisited, 1: visiting, 2: visited
        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < n; i++) {
            if (state[i] == 0) {
                if (hasCycle(graph, i, state, stack)) {
                    return new int[0]; // Cycle detected
                }
            }
        }

        int[] result = new int[n];
        int idx = 0;
        while (!stack.isEmpty()) {
            result[idx++] = stack.pop();
        }

        return result;
    }

    private boolean hasCycle(List<List<Integer>> graph, int node,
                            int[] state, Stack<Integer> stack) {
        if (state[node] == 1) return true;  // Cycle
        if (state[node] == 2) return false; // Already processed

        state[node] = 1;

        for (int neighbor : graph.get(node)) {
            if (hasCycle(graph, neighbor, state, stack)) {
                return true;
            }
        }

        state[node] = 2;
        stack.push(node);
        return false;
    }
}

// Course Schedule problem variant
class SolutionCourseSchedule {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> graph = new ArrayList<>();
        int[] indegree = new int[numCourses];

        for (int i = 0; i < numCourses; i++) {
            graph.add(new ArrayList<>());
        }

        for (int[] pre : prerequisites) {
            graph.get(pre[1]).add(pre[0]);
            indegree[pre[0]]++;
        }

        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                queue.offer(i);
            }
        }

        int[] result = new int[numCourses];
        int idx = 0;

        while (!queue.isEmpty()) {
            int course = queue.poll();
            result[idx++] = course;

            for (int next : graph.get(course)) {
                indegree[next]--;
                if (indegree[next] == 0) {
                    queue.offer(next);
                }
            }
        }

        return idx == numCourses ? result : new int[0];
    }
}`
        },
        python: {
          starterCode: `def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
    # Write your code here
    pass`,
          solution: `from typing import List
from collections import deque

class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        # Build adjacency list
        graph = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses

        for course, prereq in prerequisites:
            graph[prereq].append(course)
            indegree[course] += 1

        # Kahn's algorithm
        queue = deque([i for i in range(numCourses) if indegree[i] == 0])
        result = []

        while queue:
            node = queue.popleft()
            result.append(node)

            for neighbor in graph[node]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    queue.append(neighbor)

        # If not all courses processed, there's a cycle
        return result if len(result) == numCourses else []


# DFS-based approach
class SolutionDFS:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        graph = [[] for _ in range(numCourses)]
        for course, prereq in prerequisites:
            graph[prereq].append(course)

        visited = [False] * numCourses
        stack = []

        def dfs(node: int):
            visited[node] = True

            for neighbor in graph[node]:
                if not visited[neighbor]:
                    dfs(neighbor)

            stack.append(node)

        for i in range(numCourses):
            if not visited[i]:
                dfs(i)

        return stack[::-1]


# With cycle detection
class SolutionWithCycleDetection:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        graph = [[] for _ in range(numCourses)]
        for course, prereq in prerequisites:
            graph[prereq].append(course)

        # 0: unvisited, 1: visiting, 2: visited
        state = [0] * numCourses
        stack = []

        def has_cycle(node: int) -> bool:
            if state[node] == 1:  # Cycle
                return True
            if state[node] == 2:  # Already processed
                return False

            state[node] = 1

            for neighbor in graph[node]:
                if has_cycle(neighbor):
                    return True

            state[node] = 2
            stack.append(node)
            return False

        for i in range(numCourses):
            if state[i] == 0:
                if has_cycle(i):
                    return []  # Cycle detected

        return stack[::-1]`
        }
      },
      testCases: [
        { input: 'n = 4, edges = [[1,0],[2,0],[3,1],[3,2]]', output: '[0,1,2,3] or [0,2,1,3]' },
        { input: 'n = 2, edges = [[1,0]]', output: '[0,1]' },
        { input: 'n = 3, edges = [[0,1],[1,2]]', output: '[0,1,2]' }
      ],
      explanation: `**Problem:** Find a linear ordering of vertices such that for every directed edge (u,v), u comes before v in the ordering.

**Key Insight:** Topological ordering only exists for Directed Acyclic Graphs (DAGs). The ordering represents dependency order - if A depends on B, B must come before A.

**Approach 1: DFS (Depth-First Search)**
1. Perform DFS from each unvisited node
2. After processing all neighbors of a node, add it to a stack
3. The stack (when popped) gives reverse topological order
4. Why? A node is added only after all its dependencies are processed

**Approach 2: Kahn's Algorithm (BFS-based)**
1. Calculate in-degree (incoming edges) for each node
2. Start with all nodes having in-degree 0 (no dependencies)
3. Process each node:
   - Add to result
   - Decrease in-degree of all neighbors
   - Add neighbors with in-degree 0 to queue
4. If processed count != total nodes → cycle exists, no valid ordering

**DFS with Cycle Detection:**
Use 3 states (unvisited, visiting, visited) to detect back edges during DFS. If a back edge is found, the graph has a cycle and no topological ordering exists.

**Use Cases:** Course scheduling, build systems, task dependency resolution, package installation order.

**Complexity:** Both approaches - Time O(V+E), Space O(V) for recursion stack/queue and data structures.`,
      pseudocode: `Kahn's Algorithm (BFS):
function topologicalSort(n, edges):
    // Build graph and calculate in-degrees
    graph = [[] for i in 0 to n-1]
    indegree = [0] * n

    for [u, v] in edges:
        graph[u].add(v)
        indegree[v]++

    // Start with nodes having no dependencies
    queue = []
    for i in 0 to n-1:
        if indegree[i] == 0:
            queue.add(i)

    result = []

    while queue is not empty:
        node = queue.removeFirst()
        result.add(node)

        // Remove edges from this node
        for neighbor in graph[node]:
            indegree[neighbor]--
            if indegree[neighbor] == 0:
                queue.add(neighbor)

    // Check for cycle
    if result.length != n:
        return []  // Cycle exists

    return result

Example: edges = [[1,0],[2,0],[3,1],[3,2]]
- Graph: 0→1→3, 0→2→3
- indegree = [0,1,1,2]
- Start: queue=[0], process 0
- queue=[1,2], process 1, then 2
- indegree[3]=0, queue=[3], process 3
- Result: [0,1,2,3] or [0,2,1,3]`
    },
    {
      id: 5,
      title: 'Surrounded Regions',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/surrounded-regions/',
      description: 'Capture regions surrounded by X.',
      example: `Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]`,
      code: {
        java: {
          starterCode: `public void solve(char[][] board) {
}`,
          solution: `public void solve(char[][] board) {
    if (board == null || board.length == 0) return;
    int rows = board.length;
    int cols = board[0].length;
    
    for (int col = 0; col < cols; col++) {
        if (board[0][col] == 'O') dfs(board, 0, col);
        if (board[rows-1][col] == 'O') dfs(board, rows-1, col);
    }
    
    for (int row = 0; row < rows; row++) {
        if (board[row][0] == 'O') dfs(board, row, 0);
        if (board[row][cols-1] == 'O') dfs(board, row, cols-1);
    }
    
    for (int row = 0; row < rows; row++) {
        for (int col = 0; col < cols; col++) {
            if (board[row][col] == 'O') board[row][col] = 'X';
            else if (board[row][col] == 'S') board[row][col] = 'O';
        }
    }
}

private void dfs(char[][] board, int row, int col) {
    if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || board[row][col] != 'O') return;
    board[row][col] = 'S';
    dfs(board, row - 1, col);
    dfs(board, row + 1, col);
    dfs(board, row, col - 1);
    dfs(board, row, col + 1);
}`
        },
        python: {
          starterCode: `def solve(self, board: List[List[str]]) -> None:
    pass`,
          solution: `def solve(self, board: List[List[str]]) -> None:
    if not board:
        return
    
    rows, cols = len(board), len(board[0])
    
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != 'O':
            return
        board[r][c] = 'S'
        dfs(r - 1, c)
        dfs(r + 1, c)
        dfs(r, c - 1)
        dfs(r, c + 1)
    
    for col in range(cols):
        if board[0][col] == 'O': dfs(0, col)
        if board[rows-1][col] == 'O': dfs(rows-1, col)
    
    for row in range(rows):
        if board[row][0] == 'O': dfs(row, 0)
        if board[row][cols-1] == 'O': dfs(row, cols-1)
    
    for row in range(rows):
        for col in range(cols):
            if board[row][col] == 'O': board[row][col] = 'X'
            elif board[row][col] == 'S': board[row][col] = 'O'`
        }
      },
      testCases: [
        { input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]', output: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]' }
      ],
      hints: `DFS from border. Time O(mn), Space O(mn)`
    },
    {
      id: 6,
      title: 'Clone Graph',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/clone-graph/',
      description: 'Deep copy an undirected graph.',
      example: `Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]`,
      code: {
        java: {
          starterCode: `public Node cloneGraph(Node node) {
}`,
          solution: `public Node cloneGraph(Node node) {
    if (node == null) return null;
    Map<Node, Node> map = new HashMap<>();
    return dfs(node, map);
}

private Node dfs(Node node, Map<Node, Node> map) {
    if (map.containsKey(node)) return map.get(node);
    Node clone = new Node(node.val);
    map.put(node, clone);
    for (Node neighbor : node.neighbors) {
        clone.neighbors.add(dfs(neighbor, map));
    }
    return clone;
}`
        },
        python: {
          starterCode: `def cloneGraph(self, node: 'Node') -> 'Node':
    pass`,
          solution: `def cloneGraph(self, node: 'Node') -> 'Node':
    if not node:
        return None
    
    cloned = {}
    
    def dfs(n):
        if n in cloned:
            return cloned[n]
        clone = Node(n.val)
        cloned[n] = clone
        for neighbor in n.neighbors:
            clone.neighbors.append(dfs(neighbor))
        return clone
    
    return dfs(node)`
        }
      },
      testCases: [
        { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]' }
      ],
      hints: `HashMap. Time O(N+E), Space O(N)`
    },
    {
      id: 7,
      title: 'Evaluate Division',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/evaluate-division/',
      description: 'Answer division queries using equation relationships.',
      example: `Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"]]
Output: [6.0]`,
      code: {
        java: {
          starterCode: `public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
}`,
          solution: `public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
    Map<String, Map<String, Double>> graph = new HashMap<>();
    
    for (int i = 0; i < equations.size(); i++) {
        String a = equations.get(i).get(0);
        String b = equations.get(i).get(1);
        double v = values[i];
        
        graph.putIfAbsent(a, new HashMap<>());
        graph.putIfAbsent(b, new HashMap<>());
        graph.get(a).put(b, v);
        graph.get(b).put(a, 1.0 / v);
    }
    
    double[] results = new double[queries.size()];
    
    for (int i = 0; i < queries.size(); i++) {
        String c = queries.get(i).get(0);
        String d = queries.get(i).get(1);
        
        if (!graph.containsKey(c) || !graph.containsKey(d)) {
            results[i] = -1.0;
        } else if (c.equals(d)) {
            results[i] = 1.0;
        } else {
            results[i] = dfs(graph, c, d, 1.0, new HashSet<>());
        }
    }
    
    return results;
}

private double dfs(Map<String, Map<String, Double>> graph, String curr, String target, double prod, Set<String> visited) {
    if (curr.equals(target)) return prod;
    visited.add(curr);
    
    for (Map.Entry<String, Double> e : graph.get(curr).entrySet()) {
        if (!visited.contains(e.getKey())) {
            double res = dfs(graph, e.getKey(), target, prod * e.getValue(), visited);
            if (res != -1.0) return res;
        }
    }
    
    return -1.0;
}`
        },
        python: {
          starterCode: `def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:
    pass`,
          solution: `def calcEquation(self, equations, values, queries):
    from collections import defaultdict
    
    graph = defaultdict(dict)
    
    for (a, b), value in zip(equations, values):
        graph[a][b] = value
        graph[b][a] = 1.0 / value
    
    def dfs(curr, target, prod, visited):
        if curr == target:
            return prod
        visited.add(curr)
        
        for neighbor, weight in graph[curr].items():
            if neighbor not in visited:
                res = dfs(neighbor, target, prod * weight, visited)
                if res != -1.0:
                    return res
        
        return -1.0
    
    results = []
    
    for c, d in queries:
        if c not in graph or d not in graph:
            results.append(-1.0)
        elif c == d:
            results.append(1.0)
        else:
            results.append(dfs(c, d, 1.0, set()))
    
    return results`
        }
      },
      testCases: [
        { input: 'equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"]]', output: '[6.0]' }
      ],
      hints: `Weighted graph. Time O(Q*(V+E)), Space O(V+E)`
    },
    {
      id: 8,
      title: 'Minimum Genetic Mutation',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/minimum-genetic-mutation/',
      description: 'Find minimum mutations from start to end gene.',
      example: `Input: startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"]
Output: 1`,
      code: {
        java: {
          starterCode: `public int minMutation(String startGene, String endGene, String[] bank) {
}`,
          solution: `public int minMutation(String startGene, String endGene, String[] bank) {
    Set<String> bankSet = new HashSet<>(Arrays.asList(bank));
    if (!bankSet.contains(endGene)) return -1;
    
    Queue<String> queue = new LinkedList<>();
    Set<String> visited = new HashSet<>();
    char[] genes = {'A', 'C', 'G', 'T'};
    
    queue.offer(startGene);
    visited.add(startGene);
    int mutations = 0;
    
    while (!queue.isEmpty()) {
        int size = queue.size();
        
        for (int i = 0; i < size; i++) {
            String current = queue.poll();
            
            if (current.equals(endGene)) return mutations;
            
            char[] arr = current.toCharArray();
            for (int j = 0; j < 8; j++) {
                char old = arr[j];
                
                for (char g : genes) {
                    arr[j] = g;
                    String next = new String(arr);
                    
                    if (bankSet.contains(next) && !visited.contains(next)) {
                        queue.offer(next);
                        visited.add(next);
                    }
                }
                
                arr[j] = old;
            }
        }
        
        mutations++;
    }
    
    return -1;
}`
        },
        python: {
          starterCode: `def minMutation(self, startGene: str, endGene: str, bank: List[str]) -> int:
    pass`,
          solution: `def minMutation(self, startGene, endGene, bank):
    bank_set = set(bank)
    if endGene not in bank_set:
        return -1
    
    from collections import deque
    queue = deque([(startGene, 0)])
    visited = {startGene}
    genes = ['A', 'C', 'G', 'T']
    
    while queue:
        current, mutations = queue.popleft()
        
        if current == endGene:
            return mutations
        
        for i in range(8):
            for g in genes:
                next_gene = current[:i] + g + current[i+1:]
                
                if next_gene in bank_set and next_gene not in visited:
                    queue.append((next_gene, mutations + 1))
                    visited.add(next_gene)
    
    return -1`
        }
      },
      testCases: [
        { input: 'startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"]', output: '1' }
      ],
      hints: `BFS. Time O(N*8*4), Space O(N)`
    },
    {
      id: 9,
      title: 'Word Ladder',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/word-ladder/',
      description: 'Find shortest transformation sequence length.',
      example: `Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5`,
      code: {
        java: {
          starterCode: `public int ladderLength(String beginWord, String endWord, List<String> wordList) {
}`,
          solution: `public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    Set<String> wordSet = new HashSet<>(wordList);
    if (!wordSet.contains(endWord)) return 0;
    
    Queue<String> queue = new LinkedList<>();
    Set<String> visited = new HashSet<>();
    
    queue.offer(beginWord);
    visited.add(beginWord);
    int level = 1;
    
    while (!queue.isEmpty()) {
        int size = queue.size();
        
        for (int i = 0; i < size; i++) {
            String current = queue.poll();
            
            if (current.equals(endWord)) return level;
            
            char[] arr = current.toCharArray();
            for (int j = 0; j < arr.length; j++) {
                char old = arr[j];
                
                for (char c = 'a'; c <= 'z'; c++) {
                    arr[j] = c;
                    String next = new String(arr);
                    
                    if (wordSet.contains(next) && !visited.contains(next)) {
                        queue.offer(next);
                        visited.add(next);
                    }
                }
                
                arr[j] = old;
            }
        }
        
        level++;
    }
    
    return 0;
}`
        },
        python: {
          starterCode: `def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
    pass`,
          solution: `def ladderLength(self, beginWord, endWord, wordList):
    word_set = set(wordList)
    if endWord not in word_set:
        return 0
    
    from collections import deque
    queue = deque([(beginWord, 1)])
    visited = {beginWord}
    
    while queue:
        current, level = queue.popleft()
        
        if current == endWord:
            return level
        
        for i in range(len(current)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                next_word = current[:i] + c + current[i+1:]
                
                if next_word in word_set and next_word not in visited:
                    queue.append((next_word, level + 1))
                    visited.add(next_word)
    
    return 0`
        }
      },
      testCases: [
        { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5' }
      ],
      hints: `BFS. Time O(N*M*26), Space O(N)`
    }

  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Graphs-${q.id}`)).length
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
    const savedDrawing = localStorage.getItem(`drawing-Graphs-${question.id}`)
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
              <CompletionCheckbox problemId={`Graphs-${selectedQuestion.id}`} />
              <BookmarkButton problemId={`Graphs-${selectedQuestion.id}`} problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'Graphs' }} />
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
            const savedDrawing = localStorage.getItem(`drawing-Graphs-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`Graphs-${selectedQuestion.id}`}
          existingDrawing={currentDrawing}
        />
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#111827', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>🗺️ Graphs</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Master graphs problems</p>

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
                          <CompletionCheckbox problemId={`Graphs-${question.id}`} />
                        </div>
                        <BookmarkButton size="small" problemId={`Graphs-${question.id}`} problemData={{ title: question.title, difficulty: question.difficulty, category: 'Graphs' }} />
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

export default Graphs
