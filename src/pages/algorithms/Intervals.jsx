import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'

function Intervals({ onBack }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showSolution, setShowSolution] = useState(false)
  const [userCode, setUserCode] = useState('')
  const [output, setOutput] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)
  const [language, setLanguage] = useState(getPreferredLanguage())
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
      title: 'Insert Interval',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/insert-interval/',
      description: 'You are given an array of non-overlapping intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval. Insert newInterval into intervals such that intervals is still sorted and has no overlapping intervals.',
      examples: [
        { input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]', output: '[[1,5],[6,9]]' },
        { input: 'intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]', output: '[[1,2],[3,10],[12,16]]' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {

    }
}`,
          solution: `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0;
        int n = intervals.length;

        // Add all intervals that end before newInterval starts
        while (i < n && intervals[i][1] < newInterval[0]) {
            result.add(intervals[i]);
            i++;
        }

        // Merge overlapping intervals
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.add(newInterval);

        // Add remaining intervals
        while (i < n) {
            result.add(intervals[i]);
            i++;
        }

        return result.toArray(new int[result.size()][]);
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        pass`,
          solution: `class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        result = []
        i = 0
        n = len(intervals)

        # Add all intervals that end before newInterval starts
        while i < n and intervals[i][1] < newInterval[0]:
            result.append(intervals[i])
            i += 1

        # Merge overlapping intervals
        while i < n and intervals[i][0] <= newInterval[1]:
            newInterval[0] = min(newInterval[0], intervals[i][0])
            newInterval[1] = max(newInterval[1], intervals[i][1])
            i += 1

        result.append(newInterval)

        # Add remaining intervals
        while i < n:
            result.append(intervals[i])
            i += 1

        return result`
        }
      },
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 2,
      title: 'Merge Intervals',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/',
      description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
      examples: [
        { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' },
        { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public int[][] merge(int[][] intervals) {

    }
}`,
          solution: `class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;

        // Sort by start time
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        List<int[]> result = new ArrayList<>();
        int[] current = intervals[0];
        result.add(current);

        for (int[] interval : intervals) {
            if (interval[0] <= current[1]) {
                // Overlapping intervals, merge them
                current[1] = Math.max(current[1], interval[1]);
            } else {
                // Non-overlapping interval, add it
                current = interval;
                result.add(current);
            }
        }

        return result.toArray(new int[result.size()][]);
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        pass`,
          solution: `class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        if not intervals:
            return []

        # Sort by start time
        intervals.sort(key=lambda x: x[0])

        result = [intervals[0]]

        for interval in intervals[1:]:
            if interval[0] <= result[-1][1]:
                # Overlapping intervals, merge them
                result[-1][1] = max(result[-1][1], interval[1])
            else:
                # Non-overlapping interval, add it
                result.append(interval)

        return result`
        }
      },
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 3,
      title: 'Non-overlapping Intervals',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals/',
      description: 'Given an array of intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.',
      examples: [
        { input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', output: '1' },
        { input: 'intervals = [[1,2],[1,2],[1,2]]', output: '2' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {

    }
}`,
          solution: `class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) return 0;

        // Sort by end time
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));

        int count = 0;
        int end = intervals[0][1];

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < end) {
                // Overlapping, remove this interval
                count++;
            } else {
                // Non-overlapping, update end
                end = intervals[i][1];
            }
        }

        return count;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        pass`,
          solution: `class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        if not intervals:
            return 0

        # Sort by end time
        intervals.sort(key=lambda x: x[1])

        count = 0
        end = intervals[0][1]

        for i in range(1, len(intervals)):
            if intervals[i][0] < end:
                # Overlapping, remove this interval
                count += 1
            else:
                # Non-overlapping, update end
                end = intervals[i][1]

        return count`
        }
      },
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 4,
      title: 'Meeting Rooms',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms/',
      description: 'Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.',
      examples: [
        { input: 'intervals = [[0,30],[5,10],[15,20]]', output: 'false' },
        { input: 'intervals = [[7,10],[2,4]]', output: 'true' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public boolean canAttendMeetings(int[][] intervals) {

    }
}`,
          solution: `class Solution {
    public boolean canAttendMeetings(int[][] intervals) {
        // Sort by start time
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < intervals[i - 1][1]) {
                // Current meeting starts before previous ends
                return false;
            }
        }

        return true;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
        pass`,
          solution: `class Solution:
    def canAttendMeetings(self, intervals: List[List[int]]) -> bool:
        # Sort by start time
        intervals.sort(key=lambda x: x[0])

        for i in range(1, len(intervals)):
            if intervals[i][0] < intervals[i - 1][1]:
                # Current meeting starts before previous ends
                return False

        return True`
        }
      },
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 5,
      title: 'Meeting Rooms II',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms-ii/',
      description: 'Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.',
      examples: [
        { input: 'intervals = [[0,30],[5,10],[15,20]]', output: '2' },
        { input: 'intervals = [[7,10],[2,4]]', output: '1' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public int minMeetingRooms(int[][] intervals) {

    }
}`,
          solution: `class Solution {
    public int minMeetingRooms(int[][] intervals) {
        if (intervals.length == 0) return 0;

        // Separate start and end times
        int[] starts = new int[intervals.length];
        int[] ends = new int[intervals.length];

        for (int i = 0; i < intervals.length; i++) {
            starts[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }

        Arrays.sort(starts);
        Arrays.sort(ends);

        int rooms = 0;
        int endPointer = 0;

        for (int i = 0; i < starts.length; i++) {
            if (starts[i] < ends[endPointer]) {
                // Need a new room
                rooms++;
            } else {
                // A room is freed up
                endPointer++;
            }
        }

        return rooms;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        pass`,
          solution: `class Solution:
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        if not intervals:
            return 0

        # Separate start and end times
        starts = sorted([i[0] for i in intervals])
        ends = sorted([i[1] for i in intervals])

        rooms = 0
        end_pointer = 0

        for start in starts:
            if start < ends[end_pointer]:
                # Need a new room
                rooms += 1
            else:
                # A room is freed up
                end_pointer += 1

        return rooms`
        }
      },
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 6,
      title: 'Meeting Rooms III',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms-iii/',
      description: 'You are given an integer n representing n meeting rooms numbered from 0 to n - 1. You are given a 2D integer array meetings where meetings[i] = [starti, endi] means a meeting will be held from starti to endi.',
      examples: [
        { input: 'n = 2, meetings = [[0,10],[1,5],[2,7],[3,4]]', output: '0' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public int mostBooked(int n, int[][] meetings) {

    }
}`,
          solution: `class Solution {
    public int mostBooked(int n, int[][] meetings) {
        int[] count = new int[n];
        long[] roomAvailable = new long[n];

        Arrays.sort(meetings, (a, b) -> Integer.compare(a[0], b[0]));

        for (int[] meeting : meetings) {
            int start = meeting[0];
            int end = meeting[1];
            int duration = end - start;

            boolean found = false;
            long minAvailableTime = Long.MAX_VALUE;
            int minRoom = 0;

            // Find earliest available room
            for (int i = 0; i < n; i++) {
                if (roomAvailable[i] <= start) {
                    // Room is available now
                    roomAvailable[i] = end;
                    count[i]++;
                    found = true;
                    break;
                }

                if (roomAvailable[i] < minAvailableTime) {
                    minAvailableTime = roomAvailable[i];
                    minRoom = i;
                }
            }

            if (!found) {
                // Use the room that becomes available earliest
                roomAvailable[minRoom] += duration;
                count[minRoom]++;
            }
        }

        int maxCount = 0;
        int result = 0;
        for (int i = 0; i < n; i++) {
            if (count[i] > maxCount) {
                maxCount = count[i];
                result = i;
            }
        }

        return result;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def mostBooked(self, n: int, meetings: List[List[int]]) -> int:
        pass`,
          solution: `class Solution:
    def mostBooked(self, n: int, meetings: List[List[int]]) -> int:
        count = [0] * n
        room_available = [0] * n

        meetings.sort()

        for start, end in meetings:
            duration = end - start
            found = False
            min_available_time = float('inf')
            min_room = 0

            # Find earliest available room
            for i in range(n):
                if room_available[i] <= start:
                    # Room is available now
                    room_available[i] = end
                    count[i] += 1
                    found = True
                    break

                if room_available[i] < min_available_time:
                    min_available_time = room_available[i]
                    min_room = i

            if not found:
                # Use the room that becomes available earliest
                room_available[min_room] += duration
                count[min_room] += 1

        return count.index(max(count))`
        }
      },
      timeComplexity: 'O(m * n) where m is meetings',
      spaceComplexity: 'O(n)'
    },
    {
      id: 7,
      title: 'Minimum Interval to Include Each Query',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/minimum-interval-to-include-each-query/',
      description: 'You are given a 2D integer array intervals and an integer array queries. For each query, find the length of the smallest interval that contains query. Return an array containing the answers to the queries.',
      examples: [
        { input: 'intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]', output: '[3,3,1,4]' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public int[] minInterval(int[][] intervals, int[] queries) {

    }
}`,
          solution: `class Solution {
    public int[] minInterval(int[][] intervals, int[] queries) {
        // Sort intervals by start time
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        // Create indexed queries and sort
        int[][] indexedQueries = new int[queries.length][2];
        for (int i = 0; i < queries.length; i++) {
            indexedQueries[i] = new int[]{queries[i], i};
        }
        Arrays.sort(indexedQueries, (a, b) -> Integer.compare(a[0], b[0]));

        int[] result = new int[queries.length];
        Arrays.fill(result, -1);

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> {
            if (a[0] != b[0]) return Integer.compare(a[0], b[0]);
            return Integer.compare(a[1], b[1]);
        });

        int i = 0;
        for (int[] query : indexedQueries) {
            int q = query[0];
            int idx = query[1];

            // Add all intervals that start before or at query
            while (i < intervals.length && intervals[i][0] <= q) {
                int size = intervals[i][1] - intervals[i][0] + 1;
                pq.offer(new int[]{size, intervals[i][1]});
                i++;
            }

            // Remove intervals that end before query
            while (!pq.isEmpty() && pq.peek()[1] < q) {
                pq.poll();
            }

            if (!pq.isEmpty()) {
                result[idx] = pq.peek()[0];
            }
        }

        return result;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def minInterval(self, intervals: List[List[int]], queries: List[int]) -> List[int]:
        pass`,
          solution: `class Solution:
    def minInterval(self, intervals: List[List[int]], queries: List[int]) -> List[int]:
        import heapq

        # Sort intervals by start time
        intervals.sort()

        # Create indexed queries and sort
        indexed_queries = sorted((q, i) for i, q in enumerate(queries))

        result = [-1] * len(queries)
        heap = []
        i = 0

        for q, idx in indexed_queries:
            # Add all intervals that start before or at query
            while i < len(intervals) and intervals[i][0] <= q:
                left, right = intervals[i]
                size = right - left + 1
                heapq.heappush(heap, (size, right))
                i += 1

            # Remove intervals that end before query
            while heap and heap[0][1] < q:
                heapq.heappop(heap)

            if heap:
                result[idx] = heap[0][0]

        return result`
        }
      },
      timeComplexity: 'O((n + q) log n)',
      spaceComplexity: 'O(n + q)'
    }
  ]

  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Intervals-${q.id}`)).length
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
    setOutput('')
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
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #e5e7eb', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#1f2937', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`Intervals-${selectedQuestion.id}`} />
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

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #dbeafe' }}>
                <h3 style={{ fontSize: '1rem', color: '#1e40af', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#1e40af' }}>⏱️ Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#1e40af' }}>💾 Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #e5e7eb', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #e5e7eb', borderRadius: '8px', resize: 'none', lineHeight: '1.5' }} spellCheck={false} />
          </div>
        </div>
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
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>📅 Intervals</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Master interval-based problems: merging, overlapping, and scheduling</p>

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
                          <CompletionCheckbox problemId={`Intervals-${question.id}`} />
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

export default Intervals
