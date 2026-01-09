import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function Sorting({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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
      title: 'Sort Colors',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/sort-colors/',
      description: 'Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively. You must solve this problem without using the library\'s sort function.',
      code: {
        java: {
          starterCode: `public void sortColors(int[] nums) {
    // Write your code here

}`,
          solution: `// Approach: Dutch National Flag Algorithm - O(n) time, O(1) space
public void sortColors(int[] nums) {
    int low = 0, mid = 0, high = nums.length - 1;

    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums, low, mid);
            low++;
            mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            swap(nums, mid, high);
            high--;
        }
    }
}

private void swap(int[] nums, int i, int j) {
    int temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

// Approach 2: Counting Sort - O(n) time, O(1) space
public void sortColors(int[] nums) {
    int count0 = 0, count1 = 0, count2 = 0;

    for (int num : nums) {
        if (num == 0) count0++;
        else if (num == 1) count1++;
        else count2++;
    }

    int index = 0;
    for (int i = 0; i < count0; i++) nums[index++] = 0;
    for (int i = 0; i < count1; i++) nums[index++] = 1;
    for (int i = 0; i < count2; i++) nums[index++] = 2;
}`
        },
        python: {
          starterCode: `def sortColors(self, nums: List[int]) -> None:
    """
    Do not return anything, modify nums in-place instead.
    """
    # Write your code here
    pass`,
          solution: `# Approach: Dutch National Flag Algorithm - O(n) time, O(1) space
def sortColors(self, nums: List[int]) -> None:
    """
    Do not return anything, modify nums in-place instead.
    """
    low, mid, high = 0, 0, len(nums) - 1

    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1

# Approach 2: Counting Sort - O(n) time, O(1) space
def sortColors(self, nums: List[int]) -> None:
    count0 = count1 = count2 = 0

    for num in nums:
        if num == 0:
            count0 += 1
        elif num == 1:
            count1 += 1
        else:
            count2 += 1

    index = 0
    for _ in range(count0):
        nums[index] = 0
        index += 1
    for _ in range(count1):
        nums[index] = 1
        index += 1
    for _ in range(count2):
        nums[index] = 2
        index += 1`
        }
      },
      testCases: [
        { nums: [2,0,2,1,1,0], expected: [0,0,1,1,2,2] },
        { nums: [2,0,1], expected: [0,1,2] }
      ],
      examples: [
        { input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]' },
        { input: 'nums = [2,0,1]', output: '[0,1,2]' }
      ],
      explanation: `**Problem:** Sort an array containing only 0s, 1s, and 2s in-place without using the sort library.

**Key Insight:** This is the classic Dutch National Flag problem. Use three pointers to partition the array into three sections.

**Approach 1: Dutch National Flag Algorithm**
1. Use three pointers:
   - low: boundary for 0s (everything before low is 0)
   - mid: current element being examined
   - high: boundary for 2s (everything after high is 2)
2. Process elements at mid pointer:
   - If nums[mid] == 0: swap with low, increment both low and mid
   - If nums[mid] == 1: just increment mid (already in correct position)
   - If nums[mid] == 2: swap with high, decrement high (don't increment mid, need to examine swapped element)
3. Continue until mid > high

**Why This Works:**
- Maintains invariant: [0,0,...,0][1,1,...,1][unknown][2,2,...,2]
- Single pass with constant space
- Each element examined at most twice

**Approach 2: Counting Sort**
1. Count frequency of 0s, 1s, 2s
2. Overwrite array: first count0 elements = 0, next count1 elements = 1, last count2 elements = 2

**Complexity:** Time O(n), Space O(1) for both approaches`,
      pseudocode: `Dutch National Flag:
-----------------------
low = 0, mid = 0, high = n-1

while mid <= high:
    if nums[mid] == 0:
        swap(nums[low], nums[mid])
        low++
        mid++
    elif nums[mid] == 1:
        mid++
    else:  // nums[mid] == 2
        swap(nums[mid], nums[high])
        high--

Example: [2,0,2,1,1,0]
Initial: low=0, mid=0, high=5
[2,0,2,1,1,0] mid=0, nums[0]=2, swap with high → [0,0,2,1,1,2], high=4
[0,0,2,1,1,2] mid=0, nums[0]=0, swap with low → [0,0,2,1,1,2], low=1, mid=1
[0,0,2,1,1,2] mid=1, nums[1]=0, swap with low → [0,0,2,1,1,2], low=2, mid=2
[0,0,2,1,1,2] mid=2, nums[2]=2, swap with high → [0,0,1,1,2,2], high=3
[0,0,1,1,2,2] mid=2, nums[2]=1, mid++ → mid=3
[0,0,1,1,2,2] mid=3, nums[3]=1, mid++ → mid=4
mid > high, done! Result: [0,0,1,1,2,2]

Counting Sort:
-----------------------
count0 = count1 = count2 = 0
for num in nums:
    if num == 0: count0++
    elif num == 1: count1++
    else: count2++

index = 0
fill count0 zeros, count1 ones, count2 twos`
    },
    {
      id: 2,
      title: 'Kth Largest Element in Array',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
      description: 'Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element.',
      code: {
        java: {
          starterCode: `public int findKthLargest(int[] nums, int k) {
    // Write your code here

}`,
          solution: `// Approach 1: Min Heap - O(n log k) time, O(k) space
public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();

    for (int num : nums) {
        minHeap.offer(num);
        if (minHeap.size() > k) {
            minHeap.poll();
        }
    }

    return minHeap.peek();
}

// Approach 2: QuickSelect - O(n) average time, O(1) space
public int findKthLargest(int[] nums, int k) {
    return quickSelect(nums, 0, nums.length - 1, nums.length - k);
}

private int quickSelect(int[] nums, int left, int right, int k) {
    if (left == right) return nums[left];

    int pivotIndex = partition(nums, left, right);

    if (k == pivotIndex) {
        return nums[k];
    } else if (k < pivotIndex) {
        return quickSelect(nums, left, pivotIndex - 1, k);
    } else {
        return quickSelect(nums, pivotIndex + 1, right, k);
    }
}

private int partition(int[] nums, int left, int right) {
    int pivot = nums[right];
    int i = left;

    for (int j = left; j < right; j++) {
        if (nums[j] <= pivot) {
            swap(nums, i, j);
            i++;
        }
    }

    swap(nums, i, right);
    return i;
}

private void swap(int[] nums, int i, int j) {
    int temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}`
        },
        python: {
          starterCode: `def findKthLargest(self, nums: List[int], k: int) -> int:
    # Write your code here
    pass`,
          solution: `# Approach 1: Min Heap - O(n log k) time, O(k) space
def findKthLargest(self, nums: List[int], k: int) -> int:
    import heapq
    min_heap = []

    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)

    return min_heap[0]

# Approach 2: QuickSelect - O(n) average time, O(1) space
def findKthLargest(self, nums: List[int], k: int) -> int:
    def quick_select(left: int, right: int, k_smallest: int) -> int:
        if left == right:
            return nums[left]

        pivot_index = partition(left, right)

        if k_smallest == pivot_index:
            return nums[k_smallest]
        elif k_smallest < pivot_index:
            return quick_select(left, pivot_index - 1, k_smallest)
        else:
            return quick_select(pivot_index + 1, right, k_smallest)

    def partition(left: int, right: int) -> int:
        pivot = nums[right]
        i = left

        for j in range(left, right):
            if nums[j] <= pivot:
                nums[i], nums[j] = nums[j], nums[i]
                i += 1

        nums[i], nums[right] = nums[right], nums[i]
        return i

    return quick_select(0, len(nums) - 1, len(nums) - k)`
        }
      },
      testCases: [
        { nums: [3,2,1,5,6,4], k: 2, expected: 5 },
        { nums: [3,2,3,1,2,4,5,5,6], k: 4, expected: 4 }
      ],
      examples: [
        { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
        { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' }
      ],
      explanation: `**Problem:** Find the kth largest element in an unsorted array (not kth distinct).

**Key Insight:** We don't need to sort the entire array. Use either a min heap of size k or QuickSelect for optimal performance.

**Approach 1: Min Heap (Size K)**
1. Maintain a min heap of size k
2. For each element:
   - Add to heap
   - If heap size > k, remove minimum
3. After processing all elements, heap root is kth largest

**Why This Works:**
- Heap maintains k largest elements seen so far
- Smallest of k largest elements = kth largest overall
- Space-efficient: only store k elements

**Approach 2: QuickSelect (Optimal)**
1. Similar to QuickSort partitioning
2. Pick a pivot, partition array around it
3. If pivot is at position n-k (kth largest in 0-indexed sorted array):
   - Found answer!
4. If pivot position < n-k: search right half
5. If pivot position > n-k: search left half

**Why QuickSelect?**
- Average O(n) time vs O(n log k) for heap
- No extra space needed
- Based on observation: we only need to partially sort

**Complexity:**
- Min Heap: Time O(n log k), Space O(k)
- QuickSelect: Time O(n) average, O(n²) worst, Space O(1)`,
      pseudocode: `Min Heap Approach:
-----------------------
minHeap = PriorityQueue()

for num in nums:
    minHeap.add(num)
    if minHeap.size() > k:
        minHeap.poll()  // Remove minimum

return minHeap.peek()  // kth largest

Example: nums = [3,2,1,5,6,4], k = 2
Add 3: heap = [3]
Add 2: heap = [2,3]
Add 1: heap = [1,2,3], size > 2, poll → heap = [2,3]
Add 5: heap = [2,3,5], size > 2, poll → heap = [3,5]
Add 6: heap = [3,5,6], size > 2, poll → heap = [5,6]
Add 4: heap = [4,5,6], size > 2, poll → heap = [5,6]
Result: heap.peek() = 5 (2nd largest)

QuickSelect Approach:
-----------------------
quickSelect(nums, left, right, n-k):
    if left == right:
        return nums[left]

    pivotIndex = partition(nums, left, right)

    if pivotIndex == n-k:
        return nums[pivotIndex]
    elif pivotIndex < n-k:
        return quickSelect(nums, pivotIndex+1, right, n-k)
    else:
        return quickSelect(nums, left, pivotIndex-1, n-k)

partition(nums, left, right):
    pivot = nums[right]
    i = left
    for j in [left..right-1]:
        if nums[j] <= pivot:
            swap(nums[i], nums[j])
            i++
    swap(nums[i], nums[right])
    return i`
    },
    {
      id: 3,
      title: 'Meeting Rooms II',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms-ii/',
      description: 'Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.',
      code: {
        java: {
          starterCode: `public int minMeetingRooms(int[][] intervals) {
    // Write your code here

}`,
          solution: `// Approach 1: Min Heap - O(n log n) time, O(n) space
public int minMeetingRooms(int[][] intervals) {
    if (intervals.length == 0) return 0;

    // Sort by start time
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);

    // Min heap to track end times
    PriorityQueue<Integer> heap = new PriorityQueue<>();
    heap.offer(intervals[0][1]);

    for (int i = 1; i < intervals.length; i++) {
        // If the earliest ending meeting has finished, reuse the room
        if (intervals[i][0] >= heap.peek()) {
            heap.poll();
        }
        // Add current meeting's end time
        heap.offer(intervals[i][1]);
    }

    return heap.size();
}

// Approach 2: Chronological Ordering - O(n log n) time, O(n) space
public int minMeetingRooms(int[][] intervals) {
    int n = intervals.length;
    int[] starts = new int[n];
    int[] ends = new int[n];

    for (int i = 0; i < n; i++) {
        starts[i] = intervals[i][0];
        ends[i] = intervals[i][1];
    }

    Arrays.sort(starts);
    Arrays.sort(ends);

    int rooms = 0, endPtr = 0;

    for (int i = 0; i < n; i++) {
        if (starts[i] < ends[endPtr]) {
            rooms++;
        } else {
            endPtr++;
        }
    }

    return rooms;
}`
        },
        python: {
          starterCode: `def minMeetingRooms(self, intervals: List[List[int]]) -> int:
    # Write your code here
    pass`,
          solution: `# Approach 1: Min Heap - O(n log n) time, O(n) space
def minMeetingRooms(self, intervals: List[List[int]]) -> int:
    if not intervals:
        return 0

    import heapq
    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    # Min heap to track end times
    heap = []
    heapq.heappush(heap, intervals[0][1])

    for i in range(1, len(intervals)):
        # If the earliest ending meeting has finished, reuse the room
        if intervals[i][0] >= heap[0]:
            heapq.heappop(heap)
        # Add current meeting's end time
        heapq.heappush(heap, intervals[i][1])

    return len(heap)

# Approach 2: Chronological Ordering - O(n log n) time, O(n) space
def minMeetingRooms(self, intervals: List[List[int]]) -> int:
    n = len(intervals)
    starts = sorted([interval[0] for interval in intervals])
    ends = sorted([interval[1] for interval in intervals])

    rooms = 0
    end_ptr = 0

    for i in range(n):
        if starts[i] < ends[end_ptr]:
            rooms += 1
        else:
            end_ptr += 1

    return rooms`
        }
      },
      testCases: [
        { intervals: [[0,30],[5,10],[15,20]], expected: 2 },
        { intervals: [[7,10],[2,4]], expected: 1 }
      ],
      examples: [
        { input: 'intervals = [[0,30],[5,10],[15,20]]', output: '2' },
        { input: 'intervals = [[7,10],[2,4]]', output: '1' }
      ],
      explanation: `**Problem:** Find the minimum number of conference rooms needed to schedule all meetings.

**Key Insight:** The number of rooms needed at any time = number of overlapping meetings. Track when rooms become free and reuse them.

**Approach 1: Min Heap (Track End Times)**
1. Sort meetings by start time
2. Use min heap to track end times of ongoing meetings
3. For each meeting:
   - If earliest ending meeting has finished (meeting.start >= heap.peek()), reuse that room (remove from heap)
   - Add current meeting's end time to heap
4. Heap size = number of rooms needed

**Why This Works:**
- Heap always contains end times of currently active meetings
- Heap size = number of concurrent meetings = rooms needed
- Reusing rooms when they become free minimizes total count

**Approach 2: Chronological Ordering**
1. Create separate arrays for start times and end times
2. Sort both arrays independently
3. Use two pointers:
   - If start[i] < end[j]: new meeting starts before earliest ends → need new room
   - If start[i] >= end[j]: earliest meeting ended → reuse room, move end pointer
4. Track maximum rooms needed

**Why Chronological Ordering Works:**
- We only care about relative ordering of events, not which meeting they belong to
- Each start time either reuses a freed room or requires a new one
- Maximum concurrent meetings = answer

**Complexity:** Time O(n log n), Space O(n) for both approaches`,
      pseudocode: `Min Heap Approach:
-----------------------
sort(intervals by start time)
minHeap = PriorityQueue()
minHeap.add(intervals[0].end)

for i from 1 to n-1:
    if intervals[i].start >= minHeap.peek():
        minHeap.poll()  // Reuse room
    minHeap.add(intervals[i].end)

return minHeap.size()

Example: [[0,30],[5,10],[15,20]]
Sort: [[0,30],[5,10],[15,20]] (already sorted)
Initial: heap = [30]
Meeting [5,10]: 5 < 30, don't poll, add 10 → heap = [10,30]
Meeting [15,20]: 15 >= 10, poll → heap = [30], add 20 → heap = [20,30]
Result: 2 rooms needed

Chronological Ordering:
-----------------------
starts = sort([start for each interval])
ends = sort([end for each interval])
rooms = 0, endPtr = 0

for i in range(n):
    if starts[i] < ends[endPtr]:
        rooms++
    else:
        endPtr++

return rooms

Example: [[0,30],[5,10],[15,20]]
starts = [0,5,15]
ends = [10,20,30]

i=0: starts[0]=0 < ends[0]=10 → rooms=1
i=1: starts[1]=5 < ends[0]=10 → rooms=2
i=2: starts[2]=15 >= ends[0]=10 → endPtr=1, rooms stays 2
Result: 2 rooms`
    },
    {
      id: 4,
      title: 'Top K Frequent Words',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-words/',
      description: 'Given an array of strings words and an integer k, return the k most frequent strings. Return the answer sorted by the frequency from highest to lowest. Sort the words with the same frequency by their lexicographical order.',
      code: {
        java: {
          starterCode: `public List<String> topKFrequent(String[] words, int k) {
    // Write your code here

}`,
          solution: `// Approach: HashMap + Min Heap - O(n log k) time, O(n) space
public List<String> topKFrequent(String[] words, int k) {
    Map<String, Integer> freq = new HashMap<>();
    for (String word : words) {
        freq.put(word, freq.getOrDefault(word, 0) + 1);
    }

    // Min heap with custom comparator
    PriorityQueue<String> heap = new PriorityQueue<>(
        (w1, w2) -> freq.get(w1).equals(freq.get(w2)) ?
            w2.compareTo(w1) : freq.get(w1) - freq.get(w2)
    );

    for (String word : freq.keySet()) {
        heap.offer(word);
        if (heap.size() > k) {
            heap.poll();
        }
    }

    List<String> result = new ArrayList<>();
    while (!heap.isEmpty()) {
        result.add(heap.poll());
    }

    Collections.reverse(result);
    return result;
}

// Approach 2: HashMap + Sorting - O(n log n) time, O(n) space
public List<String> topKFrequent(String[] words, int k) {
    Map<String, Integer> freq = new HashMap<>();
    for (String word : words) {
        freq.put(word, freq.getOrDefault(word, 0) + 1);
    }

    List<String> candidates = new ArrayList<>(freq.keySet());
    Collections.sort(candidates, (w1, w2) ->
        freq.get(w1).equals(freq.get(w2)) ?
            w1.compareTo(w2) : freq.get(w2) - freq.get(w1)
    );

    return candidates.subList(0, k);
}`
        },
        python: {
          starterCode: `def topKFrequent(self, words: List[str], k: int) -> List[str]:
    # Write your code here
    pass`,
          solution: `# Approach: HashMap + Min Heap - O(n log k) time, O(n) space
def topKFrequent(self, words: List[str], k: int) -> List[str]:
    from collections import Counter
    import heapq

    freq = Counter(words)

    # Min heap with custom comparator (negate frequency for max heap behavior)
    # Python heapq is min heap, so we use (-freq, word) to get max heap by freq
    # and alphabetical order as tiebreaker
    heap = []
    for word, count in freq.items():
        heapq.heappush(heap, (-count, word))

    result = []
    for _ in range(k):
        count, word = heapq.heappop(heap)
        result.append(word)

    return result

# Approach 2: HashMap + Sorting - O(n log n) time, O(n) space
def topKFrequent(self, words: List[str], k: int) -> List[str]:
    from collections import Counter

    freq = Counter(words)

    # Sort by frequency (descending) then alphabetically (ascending)
    candidates = sorted(freq.keys(), key=lambda w: (-freq[w], w))

    return candidates[:k]`
        }
      },
      testCases: [
        { words: ['i','love','leetcode','i','love','coding'], k: 2, expected: ['i','love'] },
        { words: ['the','day','is','sunny','the','the','the','sunny','is','is'], k: 4, expected: ['the','is','sunny','day'] }
      ],
      examples: [
        { input: 'words = ["i","love","leetcode","i","love","coding"], k = 2', output: '["i","love"]' },
        { input: 'words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4', output: '["the","is","sunny","day"]' }
      ],
      explanation: `**Problem:** Return the k most frequent words, sorted by frequency (descending), with ties broken alphabetically.

**Key Insight:** We need both frequency counting and a way to select top k. Combine HashMap with either heap or sorting.

**Approach 1: HashMap + Min Heap (Optimal)**
1. Use HashMap to count word frequencies
2. Use min heap of size k with custom comparator:
   - Primary: compare by frequency (lower freq at top)
   - Tiebreaker: compare alphabetically (reverse order - later word at top)
3. For each unique word:
   - Add to heap
   - If heap size > k, remove minimum (least frequent or alphabetically later if tie)
4. Extract all from heap and reverse

**Why Custom Comparator?**
- Min heap keeps k most frequent words
- For words with same frequency, we want alphabetically earlier ones
- So we use reverse alphabetical order in heap (w2.compareTo(w1))
- Extract and reverse to get correct final order

**Approach 2: HashMap + Sorting**
1. Count frequencies with HashMap
2. Sort all unique words by:
   - Frequency descending
   - Alphabetical ascending (tiebreaker)
3. Take first k words

**Trade-offs:**
- Heap: O(n log k) time, O(k) space - better when k << n
- Sorting: O(n log n) time, O(n) space - simpler implementation

**Complexity:**
- Heap: Time O(n log k), Space O(n)
- Sorting: Time O(n log n), Space O(n)`,
      pseudocode: `Min Heap Approach:
-----------------------
freq = HashMap()
for word in words:
    freq[word]++

minHeap = PriorityQueue(comparator:
    if freq[w1] == freq[w2]:
        return w2.compareTo(w1)  // Reverse alphabetical
    return freq[w1] - freq[w2]   // Min frequency
)

for word in freq.keys():
    minHeap.add(word)
    if minHeap.size() > k:
        minHeap.poll()

result = []
while !minHeap.isEmpty():
    result.add(minHeap.poll())
reverse(result)
return result

Example: words = ["i","love","leetcode","i","love","coding"], k = 2
freq = {i:2, love:2, leetcode:1, coding:1}

Add "i" (freq 2): heap = [i]
Add "love" (freq 2): heap = [love, i] (love > i alphabetically)
Add "leetcode" (freq 1): heap = [leetcode, love, i], size > 2, poll → heap = [i, love]
Add "coding" (freq 1): heap = [coding, i, love], size > 2, poll → heap = [i, love]
Result after reverse: [i, love]

Sorting Approach:
-----------------------
freq = Counter(words)
candidates = sort(freq.keys(), key=(-freq[word], word))
return candidates[:k]

Sort by:
1. -freq[word]: Descending frequency
2. word: Ascending alphabetical (tiebreaker)`
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Sorting-${q.id}`)).length
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
    const savedDrawing = localStorage.getItem(`drawing-Sorting-${question.id}`)
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
              <CompletionCheckbox problemId={`Sorting-${selectedQuestion.id}`} />
              <BookmarkButton
                problemId={`Sorting-${selectedQuestion.id}`}
                problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'Sorting' }}
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
            const savedDrawing = localStorage.getItem(`drawing-Sorting-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`Sorting-${selectedQuestion.id}`}
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
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>📶 Sorting</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Master sorting problems</p>

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
                          <CompletionCheckbox problemId={`Sorting-${question.id}`} />
                        </div>
                        <BookmarkButton
                          size="small"
                          problemId={`Sorting-${question.id}`}
                          problemData={{ title: question.title, difficulty: question.difficulty, category: 'Sorting' }}
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

export default Sorting
