import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function AdvancedGraphs({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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
      title: 'Network Delay Time',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/network-delay-time/',
      description: 'You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi). Return the minimum time it takes for all nodes to receive the signal.',
      examples: [{ input: 'times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2', output: '2' }],
      code: {
        java: {
          starterCode: `class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {

    }
}`,
          solution: `class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        // Dijkstra's Algorithm
        Map<Integer, List<int[]>> graph = new HashMap<>();
        for (int[] time : times) {
            graph.putIfAbsent(time[0], new ArrayList<>());
            graph.get(time[0]).add(new int[]{time[1], time[2]});
        }

        int[] dist = new int[n + 1];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[k] = 0;

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
        pq.offer(new int[]{k, 0});

        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int node = curr[0];
            int time = curr[1];

            if (time > dist[node]) continue;

            if (graph.containsKey(node)) {
                for (int[] edge : graph.get(node)) {
                    int neighbor = edge[0];
                    int newTime = time + edge[1];

                    if (newTime < dist[neighbor]) {
                        dist[neighbor] = newTime;
                        pq.offer(new int[]{neighbor, newTime});
                    }
                }
            }
        }

        int maxTime = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == Integer.MAX_VALUE) return -1;
            maxTime = Math.max(maxTime, dist[i]);
        }

        return maxTime;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        pass`,
          solution: `class Solution:
    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:
        import heapq
        from collections import defaultdict

        graph = defaultdict(list)
        for u, v, w in times:
            graph[u].append((v, w))

        dist = {i: float('inf') for i in range(1, n + 1)}
        dist[k] = 0

        pq = [(0, k)]

        while pq:
            time, node = heapq.heappop(pq)

            if time > dist[node]:
                continue

            for neighbor, weight in graph[node]:
                new_time = time + weight

                if new_time < dist[neighbor]:
                    dist[neighbor] = new_time
                    heapq.heappush(pq, (new_time, neighbor))

        max_time = max(dist.values())
        return max_time if max_time != float('inf') else -1`
        }
      },
      explanation: 'Use Dijkstra\'s algorithm with a priority queue. Track shortest distances to all nodes from source k. Return the maximum distance, or -1 if any node is unreachable.',
      timeComplexity: 'O((V + E) log V)',
      spaceComplexity: 'O(V + E)'
    },
    {
      id: 2,
      title: 'Min Cost to Connect All Points',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/min-cost-to-connect-all-points/',
      description: 'Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.',
      examples: [{ input: 'points = [[0,0],[2,2],[3,10],[5,2],[7,0]]', output: '20' }],
      code: {
        java: {
          starterCode: `class Solution {
    public int minCostConnectPoints(int[][] points) {

    }
}`,
          solution: `class Solution {
    public int minCostConnectPoints(int[][] points) {
        int n = points.length;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.offer(new int[]{0, 0}); // {cost, point}

        boolean[] visited = new boolean[n];
        int totalCost = 0;
        int edges = 0;

        while (!pq.isEmpty() && edges < n) {
            int[] curr = pq.poll();
            int cost = curr[0];
            int point = curr[1];

            if (visited[point]) continue;

            visited[point] = true;
            totalCost += cost;
            edges++;

            for (int i = 0; i < n; i++) {
                if (!visited[i]) {
                    int dist = Math.abs(points[point][0] - points[i][0]) +
                              Math.abs(points[point][1] - points[i][1]);
                    pq.offer(new int[]{dist, i});
                }
            }
        }

        return totalCost;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def minCostConnectPoints(self, points: List[List[int]]) -> int:
        pass`,
          solution: `class Solution:
    def minCostConnectPoints(self, points: List[List[int]]) -> int:
        import heapq

        n = len(points)
        visited = set()
        heap = [(0, 0)]  # (cost, point)
        total_cost = 0

        while len(visited) < n:
            cost, point = heapq.heappop(heap)

            if point in visited:
                continue

            visited.add(point)
            total_cost += cost

            for i in range(n):
                if i not in visited:
                    dist = abs(points[point][0] - points[i][0]) + \\
                           abs(points[point][1] - points[i][1])
                    heapq.heappush(heap, (dist, i))

        return total_cost`
        }
      },
      explanation: 'Use Prim\'s or Kruskal\'s algorithm for Minimum Spanning Tree. Priority queue tracks minimum edge weight to add to MST. Connect all points with minimum total cost.',
      timeComplexity: 'O(n^2 log n)',
      spaceComplexity: 'O(n^2)'
    },
    {
      id: 3,
      title: 'Cheapest Flights Within K Stops',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/',
      description: 'Find the cheapest price from src to dst with at most k stops.',
      examples: [{ input: 'n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1', output: '700' }],
      code: {
        java: {
          starterCode: `class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {

    }
}`,
          solution: `class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        Map<Integer, List<int[]>> graph = new HashMap<>();
        for (int[] flight : flights) {
            graph.putIfAbsent(flight[0], new ArrayList<>());
            graph.get(flight[0]).add(new int[]{flight[1], flight[2]});
        }

        int[] prices = new int[n];
        Arrays.fill(prices, Integer.MAX_VALUE);
        prices[src] = 0;

        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[]{src, 0});
        int stops = 0;

        while (!queue.isEmpty() && stops <= k) {
            int size = queue.size();

            for (int i = 0; i < size; i++) {
                int[] curr = queue.poll();
                int node = curr[0];
                int price = curr[1];

                if (!graph.containsKey(node)) continue;

                for (int[] next : graph.get(node)) {
                    int neighbor = next[0];
                    int cost = next[1];

                    if (price + cost < prices[neighbor]) {
                        prices[neighbor] = price + cost;
                        queue.offer(new int[]{neighbor, price + cost});
                    }
                }
            }
            stops++;
        }

        return prices[dst] == Integer.MAX_VALUE ? -1 : prices[dst];
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        pass`,
          solution: `class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
        from collections import defaultdict, deque

        graph = defaultdict(list)
        for u, v, price in flights:
            graph[u].append((v, price))

        prices = [float('inf')] * n
        prices[src] = 0

        queue = deque([(src, 0)])
        stops = 0

        while queue and stops <= k:
            for _ in range(len(queue)):
                node, price = queue.popleft()

                for neighbor, cost in graph[node]:
                    if price + cost < prices[neighbor]:
                        prices[neighbor] = price + cost
                        queue.append((neighbor, price + cost))

            stops += 1

        return prices[dst] if prices[dst] != float('inf') else -1`
        }
      },
      explanation: 'Modified Dijkstra with BFS that tracks remaining stops. Use queue to explore paths within k stops. Track minimum price to reach each city with given stops.',
      timeComplexity: 'O(V + E * k)',
      spaceComplexity: 'O(V + E)'
    },
    {
      id: 4,
      title: 'Swim in Rising Water',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/swim-in-rising-water/',
      description: 'You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation. Find the least time until you can reach the bottom right square (n - 1, n - 1).',
      examples: [{ input: 'grid = [[0,2],[1,3]]', output: '3' }],
      code: {
        java: {
          starterCode: `class Solution {
    public int swimInWater(int[][] grid) {

    }
}`,
          solution: `class Solution {
    public int swimInWater(int[][] grid) {
        int n = grid.length;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[2] - b[2]);
        boolean[][] visited = new boolean[n][n];

        pq.offer(new int[]{0, 0, grid[0][0]});
        int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};

        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int x = curr[0], y = curr[1], time = curr[2];

            if (x == n - 1 && y == n - 1) return time;

            if (visited[x][y]) continue;
            visited[x][y] = true;

            for (int[] dir : dirs) {
                int nx = x + dir[0];
                int ny = y + dir[1];

                if (nx >= 0 && nx < n && ny >= 0 && ny < n && !visited[nx][ny]) {
                    pq.offer(new int[]{nx, ny, Math.max(time, grid[nx][ny])});
                }
            }
        }

        return -1;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        pass`,
          solution: `class Solution:
    def swimInWater(self, grid: List[List[int]]) -> int:
        import heapq

        n = len(grid)
        visited = set()
        heap = [(grid[0][0], 0, 0)]
        directions = [(0,1),(1,0),(0,-1),(-1,0)]

        while heap:
            time, x, y = heapq.heappop(heap)

            if x == n - 1 and y == n - 1:
                return time

            if (x, y) in visited:
                continue

            visited.add((x, y))

            for dx, dy in directions:
                nx, ny = x + dx, y + dy

                if 0 <= nx < n and 0 <= ny < n and (nx, ny) not in visited:
                    heapq.heappush(heap, (max(time, grid[nx][ny]), nx, ny))

        return -1`
        }
      },
      explanation: 'Use modified Dijkstra where priority is the time (max water level on path). Always move to cell that minimizes the maximum water level encountered on the path.',
      timeComplexity: 'O(n^2 log n)',
      spaceComplexity: 'O(n^2)'
    },
    {
      id: 5,
      title: 'Path with Minimum Effort',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/path-with-minimum-effort/',
      description: 'A route\'s effort is the maximum absolute difference in heights between two consecutive cells of the route. Return the minimum effort required to travel from the top-left cell to the bottom-right cell.',
      examples: [{ input: 'heights = [[1,2,2],[3,8,2],[5,3,5]]', output: '2' }],
      code: {
        java: {
          starterCode: `class Solution {
    public int minimumEffortPath(int[][] heights) {

    }
}`,
          solution: `class Solution {
    public int minimumEffortPath(int[][] heights) {
        int m = heights.length, n = heights[0].length;
        int[][] effort = new int[m][n];

        for (int[] row : effort) Arrays.fill(row, Integer.MAX_VALUE);
        effort[0][0] = 0;

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[2] - b[2]);
        pq.offer(new int[]{0, 0, 0});
        int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};

        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int x = curr[0], y = curr[1], currEffort = curr[2];

            if (x == m - 1 && y == n - 1) return currEffort;

            for (int[] dir : dirs) {
                int nx = x + dir[0], ny = y + dir[1];

                if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
                    int newEffort = Math.max(currEffort,
                                           Math.abs(heights[nx][ny] - heights[x][y]));

                    if (newEffort < effort[nx][ny]) {
                        effort[nx][ny] = newEffort;
                        pq.offer(new int[]{nx, ny, newEffort});
                    }
                }
            }
        }

        return 0;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def minimumEffortPath(self, heights: List[List[int]]) -> int:
        pass`,
          solution: `class Solution:
    def minimumEffortPath(self, heights: List[List[int]]) -> int:
        import heapq

        m, n = len(heights), len(heights[0])
        effort = [[float('inf')] * n for _ in range(m)]
        effort[0][0] = 0

        heap = [(0, 0, 0)]
        directions = [(0,1),(1,0),(0,-1),(-1,0)]

        while heap:
            curr_effort, x, y = heapq.heappop(heap)

            if x == m - 1 and y == n - 1:
                return curr_effort

            for dx, dy in directions:
                nx, ny = x + dx, y + dy

                if 0 <= nx < m and 0 <= ny < n:
                    new_effort = max(curr_effort,
                                   abs(heights[nx][ny] - heights[x][y]))

                    if new_effort < effort[nx][ny]:
                        effort[nx][ny] = new_effort
                        heapq.heappush(heap, (new_effort, nx, ny))

        return 0`
        }
      },
      explanation: 'Binary search on the answer (maximum absolute difference). For each mid value, use BFS/DFS to check if path exists where all adjacent differences are ≤ mid.',
      timeComplexity: 'O(m * n * log(m * n))',
      spaceComplexity: 'O(m * n)'
    }
  ]

  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Advanced Graphs-${q.id}`)).length
    return { completed, total: questions.length, percentage: Math.round((completed / questions.length) * 100) }
  }

  const stats = getCompletionStats()

  const groupedQuestions = {
    Easy: questions.filter(q => q.difficulty === 'Easy'),
    Medium: questions.filter(q => q.difficulty === 'Medium'),
    Hard: questions.filter(q => q.difficulty === 'Hard')
  }

  const selectQuestion = (question) => {
    setSelectedQuestion(question)
    setShowSolution(false)
    setUserCode(question.code[language].starterCode)
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
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #e5e7eb', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#1f2937', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <CompletionCheckbox problemId={`Advanced Graphs-${selectedQuestion.id}`} />
              <BookmarkButton
                problemId={`AdvancedGraphs-${selectedQuestion.id}`}
                problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'AdvancedGraphs' }}
              />
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
                      <strong style={{ color: '#1f2937' }}>Input:</strong> <code style={{ fontSize: '0.85rem', color: '#1f2937' }}>{example.input}</code>
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
          </div>
        </div>
        {/* Drawing Canvas Modal */}
        <DrawingCanvas
          isOpen={showDrawing}
          onClose={() => {
            setShowDrawing(false)
            // Reload drawing in case it was updated
            const savedDrawing = localStorage.getItem(`drawing-AdvancedGraphs-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`AdvancedGraphs-${selectedQuestion.id}`}
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
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>🗺️ Advanced Graphs</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Master advanced graph algorithms: Dijkstra, MST, and shortest path problems</p>

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
                          <CompletionCheckbox problemId={`Advanced Graphs-${question.id}`} />
                        </div>
                        <BookmarkButton
                          size="small"
                          problemId={`AdvancedGraphs-${question.id}`}
                          problemData={{ title: question.title, difficulty: question.difficulty, category: 'AdvancedGraphs' }}
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
                ))}
              </div>
            )}
          </div>
        )
      ))}
    </div>
  )
}

export default AdvancedGraphs
