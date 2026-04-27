import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

const customTheme = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: '#1e1e1e',
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: 'transparent',
  },
}

function GraphAlgorithms({ onBack, breadcrumb }) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null)

  const parseCodeSections = (codeString) => {
    const sections = codeString.split('\n\n')
    return sections.map((section, index) => ({
      id: index,
      code: section.trim()
    }))
  }

  const algorithms = [
    {
      id: 'bfs',
      name: 'Breadth-First Search',
      icon: '\u{1F30A}',
      color: '#3b82f6',
      category: 'Traversal',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      description: 'Explores all neighbors at the current depth before moving to nodes at the next depth level. Guarantees shortest path in unweighted graphs.',
      whenToUse: [
        'Finding shortest path in unweighted graphs',
        'Level-order traversal of trees/graphs',
        'Finding all nodes within a connected component',
        'Web crawling and social network analysis',
        'Solving puzzles with minimum number of moves'
      ],
      codeExample: `# BFS - Level-order traversal using adjacency list
from collections import deque, defaultdict

def bfs(graph, start):
    """Traverse graph level by level from start node."""
    visited = set([start])
    queue = deque([start])
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return order

# BFS with level tracking
def bfs_levels(graph, start):
    """BFS that tracks which level each node is at."""
    visited = set([start])
    queue = deque([start])
    levels = {start: 0}

    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                levels[neighbor] = levels[node] + 1
                queue.append(neighbor)

    return levels

# BFS Shortest Path in unweighted graph
def bfs_shortest_path(graph, start, end):
    """Find shortest path between start and end nodes."""
    if start == end:
        return [start]

    visited = set([start])
    queue = deque([(start, [start])])

    while queue:
        node, path = queue.popleft()

        for neighbor in graph[node]:
            if neighbor == end:
                return path + [neighbor]
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))

    return None  # No path found

# Example usage
graph = defaultdict(list)
edges = [(0, 1), (0, 2), (1, 3), (1, 4), (2, 5), (3, 5)]
for u, v in edges:
    graph[u].append(v)
    graph[v].append(u)

print(bfs(graph, 0))                    # [0, 1, 2, 3, 4, 5]
print(bfs_levels(graph, 0))             # {0: 0, 1: 1, 2: 1, 3: 2, 4: 2, 5: 2}
print(bfs_shortest_path(graph, 0, 5))   # [0, 2, 5]`,
      visualization: `Graph:  0 --- 1 --- 3
        |       |       |
        2       4       5
         \\             /
          +--- 5 ----+

BFS from node 0:
Queue: [0]              Visit: 0
Queue: [1, 2]           Visit: 1, 2
Queue: [3, 4, 5]        Visit: 3, 4, 5

Level 0: [0]
Level 1: [1, 2]
Level 2: [3, 4, 5]

Shortest path 0 -> 5: 0 -> 2 -> 5 (2 edges)
(BFS guarantees shortest path in unweighted graphs)`
    },
    {
      id: 'dfs',
      name: 'Depth-First Search',
      icon: '\u{1F50D}',
      color: '#8b5cf6',
      category: 'Traversal',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      description: 'Explores as far as possible along each branch before backtracking. Useful for path finding, cycle detection, and topological sorting.',
      whenToUse: [
        'Detecting cycles in directed or undirected graphs',
        'Path finding and maze solving',
        'Topological sorting',
        'Finding connected/strongly connected components',
        'Generating permutations and combinations'
      ],
      codeExample: `# DFS - Recursive approach
from collections import defaultdict

def dfs_recursive(graph, node, visited=None):
    """Traverse graph depth-first using recursion."""
    if visited is None:
        visited = set()

    visited.add(node)
    result = [node]

    for neighbor in graph[node]:
        if neighbor not in visited:
            result.extend(dfs_recursive(graph, neighbor, visited))

    return result

# DFS - Iterative approach using explicit stack
def dfs_iterative(graph, start):
    """Traverse graph depth-first using a stack."""
    visited = set()
    stack = [start]
    order = []

    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            order.append(node)
            # Add neighbors in reverse for consistent ordering
            for neighbor in reversed(graph[node]):
                if neighbor not in visited:
                    stack.append(neighbor)

    return order

# DFS Path Finding - find all paths between two nodes
def dfs_all_paths(graph, start, end, path=None):
    """Find all paths from start to end."""
    if path is None:
        path = []

    path = path + [start]

    if start == end:
        return [path]

    paths = []
    for neighbor in graph[start]:
        if neighbor not in path:
            new_paths = dfs_all_paths(graph, neighbor, end, path)
            paths.extend(new_paths)

    return paths

# Cycle detection in directed graph using coloring
def has_cycle_directed(graph, num_vertices):
    """Detect cycle using DFS with WHITE/GRAY/BLACK coloring."""
    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * num_vertices

    def dfs(node):
        color[node] = GRAY
        for neighbor in graph[node]:
            if color[neighbor] == GRAY:
                return True  # Back edge = cycle
            if color[neighbor] == WHITE and dfs(neighbor):
                return True
        color[node] = BLACK
        return False

    return any(color[v] == WHITE and dfs(v) for v in range(num_vertices))

# Example usage
graph = defaultdict(list)
edges = [(0, 1), (0, 2), (1, 3), (2, 4), (3, 4), (4, 5)]
for u, v in edges:
    graph[u].append(v)

print(dfs_recursive(graph, 0))          # [0, 1, 3, 4, 5, 2]
print(dfs_iterative(graph, 0))          # [0, 1, 3, 4, 5, 2]
print(dfs_all_paths(graph, 0, 5))       # [[0, 1, 3, 4, 5], [0, 2, 4, 5]]`,
      visualization: `Graph:  0 --> 1 --> 3
        |             |
        v             v
        2 --> 4 <-----+
              |
              v
              5

DFS from 0 (recursive):
Stack: [0]                 Visit: 0 -> go deeper
Stack: [0, 1]              Visit: 1 -> go deeper
Stack: [0, 1, 3]           Visit: 3 -> go deeper
Stack: [0, 1, 3, 4]       Visit: 4 -> go deeper
Stack: [0, 1, 3, 4, 5]   Visit: 5 -> backtrack
Stack: [0, 2]              Visit: 2 -> (4 already visited)

Order: 0 -> 1 -> 3 -> 4 -> 5 -> 2

All paths from 0 to 5:
  Path 1: 0 -> 1 -> 3 -> 4 -> 5
  Path 2: 0 -> 2 -> 4 -> 5`
    },
    {
      id: 'dijkstra',
      name: "Dijkstra's Algorithm",
      icon: '\u{1F6E4}\u{FE0F}',
      color: '#10b981',
      category: 'Shortest Path',
      timeComplexity: 'O((V + E) log V)',
      spaceComplexity: 'O(V)',
      description: 'Finds the shortest path from a source to all other vertices in a weighted graph with non-negative edge weights using a priority queue.',
      whenToUse: [
        'Shortest path in weighted graphs (non-negative weights)',
        'GPS navigation and route planning',
        'Network routing protocols (OSPF)',
        'Finding closest facilities',
        'Game pathfinding on weighted maps'
      ],
      codeExample: `# Dijkstra's Algorithm using heapq
import heapq
from collections import defaultdict

def dijkstra(graph, start):
    """Find shortest distances from start to all nodes.
    graph: {node: [(neighbor, weight), ...]}
    """
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    predecessors = {node: None for node in graph}
    priority_queue = [(0, start)]
    visited = set()

    while priority_queue:
        current_dist, current_node = heapq.heappop(priority_queue)

        if current_node in visited:
            continue
        visited.add(current_node)

        for neighbor, weight in graph[current_node]:
            distance = current_dist + weight

            if distance < distances[neighbor]:
                distances[neighbor] = distance
                predecessors[neighbor] = current_node
                heapq.heappush(priority_queue, (distance, neighbor))

    return distances, predecessors

def reconstruct_path(predecessors, start, end):
    """Reconstruct shortest path from predecessors dict."""
    path = []
    current = end

    while current is not None:
        path.append(current)
        current = predecessors[current]

    path.reverse()
    return path if path[0] == start else []

# Example usage
graph = defaultdict(list)
weighted_edges = [
    ('A', 'B', 4), ('A', 'C', 2),
    ('B', 'D', 3), ('B', 'E', 1),
    ('C', 'D', 5), ('C', 'F', 6),
    ('D', 'E', 2),
    ('E', 'F', 4)
]
for u, v, w in weighted_edges:
    graph[u].append((v, w))
    graph[v].append((u, w))

distances, predecessors = dijkstra(graph, 'A')
print(f"Distances: {distances}")
# {'A': 0, 'B': 4, 'C': 2, 'D': 7, 'E': 5, 'F': 8}

path = reconstruct_path(predecessors, 'A', 'F')
print(f"Shortest path A->F: {path}")  # ['A', 'B', 'E', 'F']
print(f"Distance: {distances['F']}")   # 9`,
      visualization: `Graph (weighted):
A --4-- B --1-- E
|       |       |
2       3       4
|       |       |
C --5-- D --2--+F

Dijkstra from A:
Step 1: dist = {A:0, B:inf, C:inf, D:inf, E:inf, F:inf}
        Process A: update B=4, C=2

Step 2: dist = {A:0, B:4, C:2, D:inf, E:inf, F:inf}
        Process C (dist=2): update D=7, F=8

Step 3: dist = {A:0, B:4, C:2, D:7, E:inf, F:8}
        Process B (dist=4): update D=7(no change), E=5

Step 4: dist = {A:0, B:4, C:2, D:7, E:5, F:8}
        Process E (dist=5): update F=9(no, 8<9)

Step 5: dist = {A:0, B:4, C:2, D:7, E:5, F:8}
        Process D (dist=7): no improvements

Final:  {A:0, B:4, C:2, D:7, E:5, F:8}`
    },
    {
      id: 'bellman-ford',
      name: 'Bellman-Ford',
      icon: '\u{2696}\u{FE0F}',
      color: '#f59e0b',
      category: 'Shortest Path',
      timeComplexity: 'O(V \u00D7 E)',
      spaceComplexity: 'O(V)',
      description: 'Finds shortest paths from a source vertex to all other vertices, handling negative edge weights and detecting negative cycles.',
      whenToUse: [
        'Graphs with negative edge weights',
        'Detecting negative weight cycles',
        'When Dijkstra cannot be used (negative weights)',
        'Currency exchange arbitrage detection',
        'Network routing with variable costs'
      ],
      codeExample: `# Bellman-Ford Algorithm
def bellman_ford(vertices, edges, start):
    """Find shortest paths handling negative weights.
    vertices: list of vertex labels
    edges: list of (source, dest, weight) tuples
    Returns: (distances, predecessors) or raises ValueError
    """
    distances = {v: float('inf') for v in vertices}
    distances[start] = 0
    predecessors = {v: None for v in vertices}

    # Relax all edges V-1 times
    for _ in range(len(vertices) - 1):
        for u, v, weight in edges:
            if distances[u] != float('inf') and distances[u] + weight < distances[v]:
                distances[v] = distances[u] + weight
                predecessors[v] = u

    # Check for negative weight cycles (Vth iteration)
    for u, v, weight in edges:
        if distances[u] != float('inf') and distances[u] + weight < distances[v]:
            raise ValueError("Graph contains a negative weight cycle")

    return distances, predecessors

# Negative cycle detection standalone
def detect_negative_cycle(vertices, edges):
    """Returns True if a negative weight cycle exists."""
    dist = {v: 0 for v in vertices}  # Start all at 0

    for _ in range(len(vertices) - 1):
        for u, v, weight in edges:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight

    # If we can still relax, negative cycle exists
    for u, v, weight in edges:
        if dist[u] + weight < dist[v]:
            return True
    return False

# Practical: Currency arbitrage detection
def detect_arbitrage(exchange_rates):
    """Detect arbitrage in currency exchange.
    exchange_rates: {(from, to): rate}
    """
    import math
    currencies = list(set(c for pair in exchange_rates for c in pair))
    edges = [(src, dst, -math.log(rate))
             for (src, dst), rate in exchange_rates.items()]

    try:
        bellman_ford(currencies, edges, currencies[0])
        return False  # No arbitrage
    except ValueError:
        return True   # Arbitrage exists!

# Example usage
vertices = ['A', 'B', 'C', 'D', 'E']
edges = [
    ('A', 'B', -1), ('A', 'C', 4),
    ('B', 'C', 3), ('B', 'D', 2), ('B', 'E', 2),
    ('D', 'B', 1), ('D', 'C', 5), ('E', 'D', -3)
]

distances, preds = bellman_ford(vertices, edges, 'A')
print(f"Distances: {distances}")
# {'A': 0, 'B': -1, 'C': 2, 'D': -2, 'E': 1}`,
      visualization: `Vertices: A, B, C, D, E
Edges with weights (including negative):
A->B(-1), A->C(4), B->C(3), B->D(2), B->E(2), D->B(1), E->D(-3)

Initial: dist = {A:0, B:inf, C:inf, D:inf, E:inf}

Pass 1 (relax all edges):
  A->B: dist[B] = min(inf, 0+(-1)) = -1
  A->C: dist[C] = min(inf, 0+4) = 4
  B->C: dist[C] = min(4, -1+3) = 2
  B->D: dist[D] = min(inf, -1+2) = 1
  B->E: dist[E] = min(inf, -1+2) = 1

Pass 2 (relax all edges):
  E->D: dist[D] = min(1, 1+(-3)) = -2
  D->B: dist[B] = min(-1, -2+1) = -1 (no change)

Pass 3:
  No more improvements

Pass 4 (V-1 = 4): Final check
  No negative cycle detected

Final: {A:0, B:-1, C:2, D:-2, E:1}`
    },
    {
      id: 'topological-sort',
      name: 'Topological Sort',
      icon: '\u{1F4CA}',
      color: '#ec4899',
      category: 'DAG',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      description: 'Linear ordering of vertices in a directed acyclic graph (DAG) such that for every edge (u, v), u comes before v in the ordering.',
      whenToUse: [
        'Task scheduling with dependencies',
        'Build systems (Makefile, webpack)',
        'Course prerequisite ordering',
        'Package dependency resolution',
        'Data pipeline orchestration'
      ],
      codeExample: `# Topological Sort - DFS-based approach
from collections import defaultdict, deque

def topological_sort_dfs(graph):
    """Topological sort using DFS and post-order reversal."""
    visited = set()
    stack = []

    def dfs(node):
        visited.add(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                dfs(neighbor)
        stack.append(node)  # Post-order: add after all descendants

    for node in graph:
        if node not in visited:
            dfs(node)

    return stack[::-1]  # Reverse post-order = topological order

# Topological Sort - Kahn's Algorithm (BFS with in-degree)
def topological_sort_kahn(graph):
    """Topological sort using BFS and in-degree counting."""
    # Calculate in-degrees
    in_degree = {node: 0 for node in graph}
    for node in graph:
        for neighbor in graph[node]:
            in_degree[neighbor] = in_degree.get(neighbor, 0) + 1

    # Start with nodes having in-degree 0
    queue = deque([n for n in in_degree if in_degree[n] == 0])
    result = []

    while queue:
        node = queue.popleft()
        result.append(node)

        for neighbor in graph.get(node, []):
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    if len(result) != len(graph):
        raise ValueError("Graph has a cycle - topological sort impossible")

    return result

# Practical: Course prerequisite ordering
courses = {
    'Calc I': ['Calc II'],
    'Calc II': ['Linear Algebra', 'Diff Eq'],
    'Linear Algebra': ['Machine Learning'],
    'Diff Eq': [],
    'Programming': ['Data Structures'],
    'Data Structures': ['Algorithms', 'Machine Learning'],
    'Algorithms': [],
    'Machine Learning': []
}

order = topological_sort_dfs(courses)
print(f"Course order (DFS): {order}")

order = topological_sort_kahn(courses)
print(f"Course order (Kahn): {order}")
# Valid ordering respects all prerequisites`,
      visualization: `DAG (course prerequisites):
Calc I -> Calc II -> Linear Algebra -> ML
                 \\                    /
                  -> Diff Eq       /
Programming -> Data Structures -> Algorithms
                           \\-> ML

Kahn's Algorithm (BFS with in-degree):
In-degrees: {Calc I:0, Programming:0, Calc II:1, ...}
Queue: [Calc I, Programming]

Step 1: Remove Calc I      -> Queue: [Programming, Calc II]
Step 2: Remove Programming -> Queue: [Calc II, Data Structures]
Step 3: Remove Calc II     -> Queue: [Data Structures, Lin Alg, Diff Eq]
Step 4: Remove Data Struct -> Queue: [Lin Alg, Diff Eq, Algorithms]
Step 5: Remove Lin Alg     -> Queue: [Diff Eq, Algorithms, ML]
Step 6: Remove Diff Eq     -> Queue: [Algorithms, ML]
Step 7: Remove Algorithms  -> Queue: [ML]
Step 8: Remove ML          -> Queue: []

Result: Calc I, Programming, Calc II, Data Structures,
        Linear Algebra, Diff Eq, Algorithms, ML`
    },
    {
      id: 'union-find',
      name: 'Union-Find (Disjoint Set)',
      icon: '\u{1F517}',
      color: '#14b8a6',
      category: 'Data Structure',
      timeComplexity: 'O(\u03B1(n)) \u2248 O(1)',
      spaceComplexity: 'O(V)',
      description: 'Data structure that tracks elements partitioned into disjoint sets. Supports near-constant time union and find operations with path compression and union by rank.',
      whenToUse: [
        'Detecting cycles in undirected graphs',
        "Kruskal's MST algorithm",
        'Finding connected components dynamically',
        'Network connectivity queries',
        'Image segmentation and clustering'
      ],
      codeExample: `# Union-Find with Path Compression and Union by Rank
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n  # Number of connected components

    def find(self, x):
        """Find root with path compression."""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        """Union by rank - attach smaller tree under larger."""
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False  # Already connected

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
        """Check if two nodes are in the same component."""
        return self.find(x) == self.find(y)

# Count connected components
def count_components(n, edges):
    """Count connected components in undirected graph."""
    uf = UnionFind(n)
    for u, v in edges:
        uf.union(u, v)
    return uf.count

# Detect cycle in undirected graph
def has_cycle(n, edges):
    """Return True if undirected graph has a cycle."""
    uf = UnionFind(n)
    for u, v in edges:
        if uf.connected(u, v):
            return True  # Both already in same set = cycle
        uf.union(u, v)
    return False

# Example usage
uf = UnionFind(7)
uf.union(0, 1)
uf.union(1, 2)
uf.union(3, 4)
uf.union(5, 6)

print(uf.connected(0, 2))   # True (0-1-2 connected)
print(uf.connected(0, 3))   # False (different components)
print(uf.count)              # 3 components: {0,1,2}, {3,4}, {5,6}

edges = [(0, 1), (1, 2), (3, 4)]
print(count_components(5, edges))            # 2
print(has_cycle(3, [(0,1),(1,2),(2,0)]))     # True`,
      visualization: `Initial: [0] [1] [2] [3] [4]  (5 components)

Union(0, 1):
  0        [2] [3] [4]
  |
  1

Union(1, 2):
  0        [3] [4]
  |\\
  1  2

Union(3, 4):
  0        3
  |\\       |
  1  2     4

Find(2) with path compression:
  Before: 0 -> 1 -> 2 (tree chain)
  After:  0 -> 2  (2 now points directly to root 0)
          |
          1

Connected(0, 2)? find(0)=0, find(2)=0 -> Yes!
Connected(0, 3)? find(0)=0, find(3)=3 -> No!

Cycle detection: edges (0,1), (1,2), (2,0)
  Union(0,1): OK
  Union(1,2): OK
  Union(2,0): find(2)=0, find(0)=0 -> CYCLE!`
    },
    {
      id: 'kruskal',
      name: "Kruskal's Algorithm",
      icon: '\u{1F332}',
      color: '#84cc16',
      category: 'MST',
      timeComplexity: 'O(E log E)',
      spaceComplexity: 'O(V)',
      description: 'Finds the Minimum Spanning Tree by greedily selecting the smallest edge that does not form a cycle, using Union-Find for cycle detection.',
      whenToUse: [
        'Finding minimum spanning tree',
        'Network design (minimum cost wiring)',
        'Sparse graphs (fewer edges than vertices squared)',
        'Clustering (stop before fully connected)',
        'Approximation algorithms for NP-hard problems'
      ],
      codeExample: `# Kruskal's Algorithm using sorted edges + Union-Find
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            return False
        if self.rank[rx] < self.rank[ry]:
            self.parent[rx] = ry
        elif self.rank[rx] > self.rank[ry]:
            self.parent[ry] = rx
        else:
            self.parent[ry] = rx
            self.rank[rx] += 1
        return True

def kruskal(num_vertices, edges):
    """Find MST using Kruskal's algorithm.
    edges: list of (weight, u, v) tuples
    Returns: (mst_edges, total_weight)
    """
    # Sort all edges by weight (greedy choice)
    edges.sort()
    uf = UnionFind(num_vertices)
    mst = []
    total_weight = 0

    for weight, u, v in edges:
        if uf.union(u, v):  # No cycle formed
            mst.append((u, v, weight))
            total_weight += weight

        if len(mst) == num_vertices - 1:
            break  # MST complete (V-1 edges)

    return mst, total_weight

# Example usage
num_vertices = 6
edges = [
    (1, 0, 1), (4, 0, 2), (2, 1, 2),
    (6, 1, 3), (3, 2, 3), (5, 3, 4),
    (7, 4, 5), (8, 2, 5)
]

mst, total = kruskal(num_vertices, edges)
print(f"MST edges: {mst}")
# [(0, 1, 1), (1, 2, 2), (2, 3, 3), (0, 2, 4), (3, 4, 5)]
print(f"Total MST weight: {total}")  # 15`,
      visualization: `Graph:
    0 --1-- 1
    |      /|
    4    2  6
    |  /    |
    2 --3-- 3 --5-- 4
    |               |
    8               7
    |               |
    5 -----.--------+

Sorted edges: (1,0-1), (2,1-2), (3,2-3), (4,0-2), (5,3-4), (6,1-3), (7,4-5), (8,2-5)

Step 1: Edge 0-1 (w=1) -> No cycle, ADD    MST: {0-1}
Step 2: Edge 1-2 (w=2) -> No cycle, ADD    MST: {0-1, 1-2}
Step 3: Edge 2-3 (w=3) -> No cycle, ADD    MST: {0-1, 1-2, 2-3}
Step 4: Edge 0-2 (w=4) -> CYCLE (0-1-2), SKIP
Step 5: Edge 3-4 (w=5) -> No cycle, ADD    MST: {0-1, 1-2, 2-3, 3-4}
Step 6: Edge 4-5 (w=7) -> No cycle, ADD    MST complete! (V-1=5 edges)

Total weight: 1 + 2 + 3 + 5 + 7 = 18`
    },
    {
      id: 'prim',
      name: "Prim's Algorithm",
      icon: '\u{1F33F}',
      color: '#22c55e',
      category: 'MST',
      timeComplexity: 'O((V + E) log V)',
      spaceComplexity: 'O(V)',
      description: 'Builds the Minimum Spanning Tree by starting from a vertex and greedily adding the cheapest edge connecting the tree to a new vertex.',
      whenToUse: [
        'Finding minimum spanning tree',
        'Dense graphs (many edges)',
        'When starting from a specific vertex',
        'Real-time MST construction',
        'Network expansion planning'
      ],
      codeExample: `# Prim's Algorithm using heapq priority queue
import heapq
from collections import defaultdict

def prim(graph, start=0):
    """Find MST using Prim's algorithm.
    graph: {node: [(neighbor, weight), ...]}
    Returns: (mst_edges, total_weight)
    """
    visited = set()
    mst = []
    total_weight = 0
    # Priority queue: (weight, current_node, from_node)
    min_heap = [(0, start, -1)]

    while min_heap and len(visited) < len(graph):
        weight, node, from_node = heapq.heappop(min_heap)

        if node in visited:
            continue

        visited.add(node)
        if from_node != -1:
            mst.append((from_node, node, weight))
            total_weight += weight

        for neighbor, edge_weight in graph[node]:
            if neighbor not in visited:
                heapq.heappush(min_heap, (edge_weight, neighbor, node))

    return mst, total_weight

# Example usage
graph = defaultdict(list)
edges = [
    (0, 1, 2), (0, 3, 6),
    (1, 2, 3), (1, 3, 8), (1, 4, 5),
    (2, 4, 7), (3, 4, 9)
]
for u, v, w in edges:
    graph[u].append((v, w))
    graph[v].append((u, w))

mst, total = prim(graph, start=0)
print(f"MST edges: {mst}")
# [(0, 1, 2), (1, 2, 3), (1, 4, 5), (0, 3, 6)]
print(f"Total MST weight: {total}")  # 16

# Verify: MST has exactly V-1 edges
assert len(mst) == len(graph) - 1
print(f"Vertices: {len(graph)}, MST edges: {len(mst)}")`,
      visualization: `Graph:
    0 --2-- 1 --3-- 2
    |       |       |
    6       8       7
    |       |       |
    3 --9-- + --5-- 4

Prim's starting from vertex 0:
Heap: [(0, 0, -1)]          Tree: {}

Step 1: Visit 0, add its edges to heap
  Heap: [(2, 1, 0), (6, 3, 0)]
  Tree: {0}

Step 2: Pop (2, 1, 0) -> Visit 1, add edge 0-1
  Heap: [(3, 2, 1), (5, 4, 1), (6, 3, 0), (8, 3, 1)]
  Tree: {0, 1}  MST: [(0,1,2)]

Step 3: Pop (3, 2, 1) -> Visit 2, add edge 1-2
  Heap: [(5, 4, 1), (6, 3, 0), (7, 4, 2), (8, 3, 1)]
  Tree: {0, 1, 2}  MST: [(0,1,2), (1,2,3)]

Step 4: Pop (5, 4, 1) -> Visit 4, add edge 1-4
  Tree: {0, 1, 2, 4}  MST: [(0,1,2), (1,2,3), (1,4,5)]

Step 5: Pop (6, 3, 0) -> Visit 3, add edge 0-3
  Tree: {0, 1, 2, 3, 4}  MST complete!

Total: 2 + 3 + 5 + 6 = 16`
    },
    {
      id: 'floyd-warshall',
      name: 'Floyd-Warshall',
      icon: '\u{1F5FA}\u{FE0F}',
      color: '#6366f1',
      category: 'All-Pairs Shortest Path',
      timeComplexity: 'O(V\u00B3)',
      spaceComplexity: 'O(V\u00B2)',
      description: 'Computes shortest paths between all pairs of vertices using dynamic programming with three nested loops over intermediate vertices.',
      whenToUse: [
        'All-pairs shortest path needed',
        'Dense graphs where all distances needed',
        'Detecting negative cycles',
        'Transitive closure of a graph',
        'Small to medium graphs (V < 500)'
      ],
      codeExample: `# Floyd-Warshall Algorithm
def floyd_warshall(num_vertices, edges):
    """Find shortest paths between all pairs of vertices.
    Returns: (distance_matrix, next_vertex_matrix)
    """
    INF = float('inf')

    # Initialize distance matrix
    dist = [[INF] * num_vertices for _ in range(num_vertices)]
    next_v = [[None] * num_vertices for _ in range(num_vertices)]

    # Distance from vertex to itself is 0
    for i in range(num_vertices):
        dist[i][i] = 0

    # Set direct edge weights
    for u, v, weight in edges:
        dist[u][v] = weight
        next_v[u][v] = v

    # DP: consider each vertex k as intermediate
    for k in range(num_vertices):
        for i in range(num_vertices):
            for j in range(num_vertices):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
                    next_v[i][j] = next_v[i][k]

    return dist, next_v

def reconstruct_path(next_v, start, end):
    """Reconstruct shortest path from next_vertex matrix."""
    if next_v[start][end] is None:
        return []  # No path
    path = [start]
    current = start
    while current != end:
        current = next_v[current][end]
        path.append(current)
    return path

def has_negative_cycle(dist, n):
    """Check diagonal for negative cycles."""
    return any(dist[i][i] < 0 for i in range(n))

# Example usage
num_vertices = 4
edges = [
    (0, 1, 3), (0, 3, 7),
    (1, 0, 8), (1, 2, 2),
    (2, 0, 5), (2, 3, 1),
    (3, 0, 2)
]

dist, next_v = floyd_warshall(num_vertices, edges)

print("Distance matrix:")
for row in dist:
    print([x if x != float('inf') else 'INF' for x in row])
# [0, 3, 5, 6]
# [7, 0, 2, 3]
# [3, 6, 0, 1]
# [2, 5, 7, 0]

path = reconstruct_path(next_v, 1, 3)
print(f"Path 1->3: {path}, dist={dist[1][3]}")  # [1, 2, 3], dist=3`,
      visualization: `Initial distance matrix (direct edges only):
     0    1    2    3
0 [  0,   3, INF,   7]
1 [  8,   0,   2, INF]
2 [  5, INF,   0,   1]
3 [  2, INF, INF,   0]

After k=0 (paths through vertex 0):
     0    1    2    3
1 [  8,   0,   2, INF]  (1->0->3 = 8+7=15, no improvement)

After k=1 (paths through vertex 1):
     0    1    2    3
0 [  0,   3,   5,   7]  <- 0->1->2 = 3+2 = 5!

After k=2 (paths through vertex 2):
     0    1    2    3
0 [  0,   3,   5,   6]  <- 0->1->2->3 = 5+1 = 6!
1 [  7,   0,   2,   3]  <- 1->2->0 = 2+5 = 7, 1->2->3 = 3

After k=3 (paths through vertex 3):
     0    1    2    3
0 [  0,   3,   5,   6]
1 [  5,   0,   2,   3]  <- 1->2->3->0 = 3+2 = 5
2 [  3,   6,   0,   1]  <- 2->3->0 = 1+2 = 3
3 [  2,   5,   7,   0]  <- 3->0->1 = 2+3 = 5`
    },
    {
      id: 'a-star',
      name: 'A* Search',
      icon: '\u{2B50}',
      color: '#f97316',
      category: 'Shortest Path',
      timeComplexity: 'O(E log V)',
      spaceComplexity: 'O(V)',
      description: 'Informed search algorithm that uses a heuristic to guide the search toward the goal, combining actual cost (g) with estimated remaining cost (h).',
      whenToUse: [
        'Pathfinding in games and robotics',
        'Grid-based navigation with obstacles',
        'When a good heuristic is available',
        'GPS navigation systems',
        "Puzzle solving (15-puzzle, Rubik's cube)"
      ],
      codeExample: `# A* Search Algorithm on a 2D grid
import heapq

def a_star(grid, start, end):
    """A* pathfinding on a 2D grid.
    grid: 2D list where 0=walkable, 1=obstacle
    start/end: (row, col) tuples
    """
    rows, cols = len(grid), len(grid[0])

    def heuristic(pos):
        """Manhattan distance heuristic (admissible for 4-dir grid)."""
        return abs(pos[0] - end[0]) + abs(pos[1] - end[1])

    def get_neighbors(pos):
        """Get valid 4-directional neighbors."""
        r, c = pos
        neighbors = []
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 0:
                neighbors.append((nr, nc))
        return neighbors

    # Priority queue: (f_score, counter, position)
    counter = 0
    open_set = [(heuristic(start), counter, start)]
    came_from = {}
    g_score = {start: 0}

    while open_set:
        f, _, current = heapq.heappop(open_set)

        if current == end:
            # Reconstruct path
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            return path[::-1]

        for neighbor in get_neighbors(current):
            tentative_g = g_score[current] + 1  # Each step costs 1

            if tentative_g < g_score.get(neighbor, float('inf')):
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                f_score = tentative_g + heuristic(neighbor)
                counter += 1
                heapq.heappush(open_set, (f_score, counter, neighbor))

    return None  # No path found

# Example usage
grid = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 1],
    [0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0]
]

path = a_star(grid, (0, 0), (4, 4))
print(f"Path: {path}")
print(f"Steps: {len(path) - 1}")
# Path navigates around obstacles using fewest steps`,
      visualization: `Grid (S=start, E=end, #=wall, .=open):
S . . . .
. # # . .
. . . . #
. # # . .
. . . . E

A* explores using f = g + h:
  g = actual distance from start (steps taken)
  h = Manhattan distance to end (heuristic)

Exploring from S=(0,0), target E=(4,4):
  (0,0): g=0, h=8, f=8
  (0,1): g=1, h=7, f=8
  (1,0): g=1, h=7, f=8
  (0,2): g=2, h=6, f=8  <- heuristic guides toward goal
  (0,3): g=3, h=5, f=8
  (1,3): g=4, h=4, f=8
  (2,3): g=5, h=3, f=8  <- going around walls
  (3,3): g=6, h=2, f=8
  (4,3): g=7, h=1, f=8
  (4,4): g=8, h=0, f=8  <- GOAL REACHED!

Path: S->(0,1)->(0,2)->(0,3)->(1,3)->(2,3)->(3,3)->(4,3)->E
A* explores fewer nodes than Dijkstra because
the heuristic guides search toward the goal.`
    },
    {
      id: 'tarjan-scc',
      name: "Tarjan's SCC",
      icon: '\u{1F504}',
      color: '#dc2626',
      category: 'Connected Components',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      description: 'Finds all Strongly Connected Components in a directed graph in a single DFS pass using discovery times and low-link values.',
      whenToUse: [
        'Finding strongly connected components',
        'Solving 2-SAT problems',
        'Detecting deadlocks in systems',
        'Analyzing dependency graphs',
        'Simplifying directed graphs (condensation)'
      ],
      codeExample: `# Tarjan's Strongly Connected Components Algorithm
from collections import defaultdict

def tarjan_scc(graph):
    """Find all SCCs in a directed graph.
    graph: {node: [neighbors]}
    Returns: list of SCCs (each SCC is a list of nodes)
    """
    index_counter = [0]
    stack = []
    on_stack = set()
    index = {}       # Discovery time
    low_link = {}    # Lowest reachable index
    sccs = []

    def strongconnect(node):
        index[node] = index_counter[0]
        low_link[node] = index_counter[0]
        index_counter[0] += 1
        stack.append(node)
        on_stack.add(node)

        for neighbor in graph.get(node, []):
            if neighbor not in index:
                # Neighbor not yet visited - recurse
                strongconnect(neighbor)
                low_link[node] = min(low_link[node], low_link[neighbor])
            elif neighbor in on_stack:
                # Neighbor on stack -> part of current SCC
                low_link[node] = min(low_link[node], index[neighbor])

        # If node is root of an SCC (low_link == index)
        if low_link[node] == index[node]:
            scc = []
            while True:
                w = stack.pop()
                on_stack.remove(w)
                scc.append(w)
                if w == node:
                    break
            sccs.append(scc)

    for node in graph:
        if node not in index:
            strongconnect(node)

    return sccs

# Build condensation graph (DAG of SCCs)
def condensation(graph, sccs):
    """Create DAG where each SCC becomes a single node."""
    node_to_scc = {}
    for i, scc in enumerate(sccs):
        for node in scc:
            node_to_scc[node] = i

    dag = defaultdict(set)
    for node in graph:
        for neighbor in graph[node]:
            if node_to_scc[node] != node_to_scc[neighbor]:
                dag[node_to_scc[node]].add(node_to_scc[neighbor])

    return dict(dag)

# Example usage
graph = {
    'A': ['B'],
    'B': ['C', 'E'],
    'C': ['A', 'D'],
    'D': ['C'],
    'E': ['F'],
    'F': ['E']
}

sccs = tarjan_scc(graph)
print(f"SCCs: {sccs}")
# [['F', 'E'], ['D', 'C', 'B', 'A']] or similar groupings
# SCC 1: {A, B, C, D} (A->B->C->A and C<->D)
# SCC 2: {E, F} (E->F->E)`,
      visualization: `Directed Graph:
A -> B -> C <-> D
^    |
|    v
+--- C    E <-> F
(A<-C<-B, A->B)

DFS from A:
Node A: index=0, low=0, push to stack [A]
Node B: index=1, low=1, push to stack [A,B]
Node C: index=2, low=2, push to stack [A,B,C]
  C -> A: A on stack, low[C] = min(2, 0) = 0
Node D: index=3, low=3, push to stack [A,B,C,D]
  D -> C: C on stack, low[D] = min(3, 2) = 2
  Back: low[C] = min(0, 2) = 0
  Back: low[B] = min(1, 0) = 0
Node E: index=4, low=4, push to stack [...,E]
Node F: index=5, low=5, push to stack [...,E,F]
  F -> E: E on stack, low[F] = min(5, 4) = 4
  Back: low[E] = min(4, 4) = 4
  E is root (low==index=4): POP SCC = {E, F}
  Back: low[A] = 0
  A is root (low==index=0): POP SCC = {A, B, C, D}

Result: [{E, F}, {A, B, C, D}]`
    },
    {
      id: 'bipartite',
      name: 'Bipartite Check',
      icon: '\u{1F3A8}',
      color: '#a855f7',
      category: 'Graph Coloring',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      description: 'Determines if a graph can be 2-colored (vertices split into two sets where no two adjacent vertices share the same color) using BFS coloring.',
      whenToUse: [
        'Checking if a graph is bipartite/2-colorable',
        'Two-team assignment problems',
        'Job scheduling (workers vs tasks)',
        'Detecting odd-length cycles',
        'Matching problems (Hungarian algorithm prereq)'
      ],
      codeExample: `# Bipartite Check using BFS 2-coloring
from collections import deque, defaultdict

def is_bipartite(graph):
    """Check if undirected graph is bipartite using BFS.
    graph: {node: [neighbors]}
    Returns: (is_bipartite, coloring_dict)
    """
    color = {}

    for start in graph:
        if start in color:
            continue

        # BFS from unvisited node
        queue = deque([start])
        color[start] = 0

        while queue:
            node = queue.popleft()

            for neighbor in graph[node]:
                if neighbor not in color:
                    # Color with opposite color
                    color[neighbor] = 1 - color[node]
                    queue.append(neighbor)
                elif color[neighbor] == color[node]:
                    # Same color as neighbor -> not bipartite
                    return False, {}

    return True, color

def get_bipartite_sets(graph):
    """Get the two vertex sets of a bipartite graph."""
    is_bip, coloring = is_bipartite(graph)
    if not is_bip:
        return None, None

    set_a = [node for node, c in coloring.items() if c == 0]
    set_b = [node for node, c in coloring.items() if c == 1]
    return set_a, set_b

# Example: Bipartite graph (workers and jobs)
bipartite_graph = defaultdict(list)
worker_job_edges = [
    ('W1', 'J1'), ('W1', 'J2'),
    ('W2', 'J2'), ('W2', 'J3'),
    ('W3', 'J1'), ('W3', 'J3')
]
for u, v in worker_job_edges:
    bipartite_graph[u].append(v)
    bipartite_graph[v].append(u)

result, coloring = is_bipartite(bipartite_graph)
print(f"Is bipartite: {result}")   # True
set_a, set_b = get_bipartite_sets(bipartite_graph)
print(f"Set A (workers): {set_a}")
print(f"Set B (jobs): {set_b}")

# Non-bipartite graph (odd cycle: triangle)
triangle = defaultdict(list)
for u, v in [('A', 'B'), ('B', 'C'), ('C', 'A')]:
    triangle[u].append(v)
    triangle[v].append(u)

result, _ = is_bipartite(triangle)
print(f"Triangle is bipartite: {result}")  # False`,
      visualization: `Bipartite Graph (2-colorable):
  W1 --- J1
  W1 --- J2
  W2 --- J2
  W2 --- J3
  W3 --- J1
  W3 --- J3

BFS Coloring from W1:
  W1 -> color 0
  J1 -> color 1 (neighbor of W1, opposite color)
  J2 -> color 1 (neighbor of W1, opposite color)
  W3 -> color 0 (neighbor of J1, opposite of 1)
  W2 -> color 0 (neighbor of J2, opposite of 1)
  J3 -> color 1 (neighbor of W2, opposite of 0)

Set A (color 0): {W1, W2, W3}  <- Workers
Set B (color 1): {J1, J2, J3}  <- Jobs
No conflicts! Graph IS bipartite.

Non-bipartite example (triangle A-B-C):
  A -> color 0
  B -> color 1 (neighbor of A)
  C -> color ?
    neighbor of A (needs 1)
    neighbor of B (needs 0)
    CONFLICT! Cannot satisfy both.
  Graph is NOT bipartite (contains odd cycle).`
    }
  ]

  // Render algorithm detail view
  if (selectedAlgorithm) {
    const algorithm = algorithms.find(a => a.id === selectedAlgorithm)
    if (!algorithm) return null

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
        color: 'white',
        padding: '1.5rem'
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          {/* Header */}
          <div style={{
            background: `linear-gradient(135deg, ${algorithm.color}20, ${algorithm.color}40)`,
            borderRadius: '1rem',
            padding: '2rem',
            marginBottom: '2rem',
            border: `2px solid ${algorithm.color}`
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ fontSize: '4rem' }}>{algorithm.icon}</span>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {algorithm.name}
                  </h2>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: algorithm.color,
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      {algorithm.category}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedAlgorithm(null)}
                style={{
                  background: '#dc2626',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '1rem'
                }}
              >
                Close
              </button>
            </div>
          </div>

          {/* Description */}
          <p style={{
            fontSize: '1.1rem',
            color: '#d1d5db',
            lineHeight: '1.8',
            marginBottom: '2rem'
          }}>
            {algorithm.description}
          </p>

          {/* Complexity & When to Use */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Complexity */}
            <div style={{
              background: '#1f2937',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              border: '1px solid #3b82f6'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#93c5fd' }}>
                Complexity
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div>
                  <span style={{ color: '#9ca3af' }}>Time: </span>
                  <span style={{ color: '#10b981', fontWeight: '600' }}>{algorithm.timeComplexity}</span>
                </div>
                <div>
                  <span style={{ color: '#9ca3af' }}>Space: </span>
                  <span style={{ color: '#f59e0b', fontWeight: '600' }}>{algorithm.spaceComplexity}</span>
                </div>
              </div>
            </div>

            {/* When to Use */}
            <div style={{
              background: '#1f2937',
              borderRadius: '0.5rem',
              padding: '1.5rem',
              border: '1px solid #3b82f6'
            }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: '#93c5fd' }}>
                When to Use
              </h3>
              <ul style={{ paddingLeft: '1.25rem', lineHeight: '1.6', color: '#d1d5db', margin: 0 }}>
                {algorithm.whenToUse.map((use, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>{use}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visualization */}
          <div style={{
            background: '#1f2937',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            marginBottom: '2rem',
            border: '1px solid #3b82f6'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#93c5fd' }}>
              How It Works
            </h3>
            <SyntaxHighlighter
              language="text"
              style={customTheme}
              customStyle={{
                margin: 0,
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                background: 'none',
                backgroundColor: 'transparent',
                padding: 0
              }}
            >
              {algorithm.visualization}
            </SyntaxHighlighter>
          </div>

          {/* Code Implementation */}
          <div style={{
            background: '#1f2937',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            border: '1px solid #3b82f6'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#93c5fd' }}>
              Python Implementation
            </h3>
            {parseCodeSections(algorithm.codeExample).map(
              (section, idx) => (
                <div key={section.id} style={{ marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '100%',
                      background: '#2563eb',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      marginBottom: '0.5rem',
                      textAlign: 'left',
                      fontWeight: '500',
                      fontSize: '1rem'
                    }}
                  >
                    Example {idx + 1}
                  </div>
                  <SyntaxHighlighter
                    language="python"
                    style={customTheme}
                    customStyle={{
                      margin: 0,
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      background: 'none',
                      backgroundColor: 'transparent',
                      padding: 0
                    }}
                  >
                    {section.code}
                  </SyntaxHighlighter>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    )
  }

  // Main view - algorithm cards
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onBack}
              style={{
                background: '#2563eb',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1d4ed8'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2563eb'
              }}
            >
              &larr; Back
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Graph Algorithms
            </h1>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        <p style={{
          fontSize: '1.2rem',
          color: '#d1d5db',
          textAlign: 'left',
          marginBottom: '3rem',
          lineHeight: '1.8'
        }}>
          Master essential graph algorithms with Python implementations, complexity analysis, and step-by-step visualizations.
        </p>

        {/* Quick Comparison Table */}
        <div style={{
          background: '#1f2937',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          border: '1px solid #3b82f6',
          overflowX: 'auto'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#93c5fd' }}>
            Quick Comparison
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #374151' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: '#9ca3af' }}>Algorithm</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: '#9ca3af' }}>Time</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: '#9ca3af' }}>Space</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', color: '#9ca3af' }}>Category</th>
              </tr>
            </thead>
            <tbody>
              {algorithms.map((algo, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #374151' }}>
                  <td style={{ padding: '0.75rem', color: '#d1d5db', fontWeight: '500' }}>{algo.name}</td>
                  <td style={{ padding: '0.75rem', color: '#10b981' }}>{algo.timeComplexity}</td>
                  <td style={{ padding: '0.75rem', color: '#f59e0b' }}>{algo.spaceComplexity}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{
                      padding: '0.2rem 0.5rem',
                      backgroundColor: algo.color,
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      color: 'white'
                    }}>
                      {algo.category}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Algorithm Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {algorithms.map(algorithm => (
            <button
              key={algorithm.id}
              onClick={() => setSelectedAlgorithm(algorithm.id)}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                border: `2px solid ${algorithm.color}`,
                cursor: 'pointer',
                transition: 'all 0.3s',
                textAlign: 'left',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = `0 25px 50px -12px ${algorithm.color}40`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1rem'
              }}>
                <span style={{ fontSize: '2.5rem' }}>{algorithm.icon}</span>
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: '#93c5fd',
                    marginBottom: '0.25rem'
                  }}>
                    {algorithm.name}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={{
                      padding: '0.15rem 0.5rem',
                      backgroundColor: algorithm.color,
                      borderRadius: '0.25rem',
                      fontSize: '0.7rem',
                      color: 'white'
                    }}>
                      {algorithm.category}
                    </span>
                  </div>
                </div>
              </div>
              <p style={{
                fontSize: '0.9rem',
                color: '#d1d5db',
                lineHeight: '1.5',
                marginBottom: '1rem'
              }}>
                {algorithm.description}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '0.75rem',
                borderTop: '1px solid #374151',
                fontSize: '0.8rem'
              }}>
                <div>
                  <span style={{ color: '#9ca3af' }}>Time: </span>
                  <span style={{ color: '#10b981' }}>{algorithm.timeComplexity}</span>
                </div>
                <div>
                  <span style={{ color: '#9ca3af' }}>Space: </span>
                  <span style={{ color: '#f59e0b' }}>{algorithm.spaceComplexity}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GraphAlgorithms
