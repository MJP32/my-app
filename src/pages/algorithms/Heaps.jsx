import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function Heaps({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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
      title: 'Implement Min Heap',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-a-stream/',
      description: 'Implement a Min Heap data structure that supports insert, extractMin, peek, and heapify operations. A min heap is a complete binary tree where each parent node is smaller than its children.',
      examples: [
        { input: 'insert(3), insert(1), insert(6), insert(5), insert(2)', output: 'heap: [1,2,6,5,3]' },
        { input: 'extractMin()', output: 'returns 1, heap: [2,3,6,5]' },
        { input: 'peek()', output: 'returns 2' }
      ],
      code: {
        java: {
          starterCode: `class MinHeap {
    private List<Integer> heap;

    public MinHeap() {
        heap = new ArrayList<>();
    }

    // Insert element into heap
    public void insert(int val) {
        // TODO: Add element and bubble up

    }

    // Extract minimum element
    public int extractMin() {
        // TODO: Remove and return min, then bubble down

        return -1;
    }

    // Get minimum without removing
    public int peek() {
        // TODO: Return root element

        return -1;
    }

    // Helper methods
    private void bubbleUp(int index) {
        // TODO: Move element up to maintain heap property

    }

    private void bubbleDown(int index) {
        // TODO: Move element down to maintain heap property

    }
}`,
          solution: `class MinHeap {
    private List<Integer> heap;

    public MinHeap() {
        heap = new ArrayList<>();
    }

    // Insert element into heap
    public void insert(int val) {
        heap.add(val);
        bubbleUp(heap.size() - 1);
    }

    // Extract minimum element
    public int extractMin() {
        if (heap.isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }

        int min = heap.get(0);
        int last = heap.remove(heap.size() - 1);

        if (!heap.isEmpty()) {
            heap.set(0, last);
            bubbleDown(0);
        }

        return min;
    }

    // Get minimum without removing
    public int peek() {
        if (heap.isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }
        return heap.get(0);
    }

    // Get size
    public int size() {
        return heap.size();
    }

    // Check if empty
    public boolean isEmpty() {
        return heap.isEmpty();
    }

    // Helper: Move element up to maintain heap property
    private void bubbleUp(int index) {
        while (index > 0) {
            int parentIndex = (index - 1) / 2;

            if (heap.get(index) >= heap.get(parentIndex)) {
                break;
            }

            // Swap with parent
            swap(index, parentIndex);
            index = parentIndex;
        }
    }

    // Helper: Move element down to maintain heap property
    private void bubbleDown(int index) {
        while (true) {
            int smallest = index;
            int leftChild = 2 * index + 1;
            int rightChild = 2 * index + 2;

            // Compare with left child
            if (leftChild < heap.size() &&
                heap.get(leftChild) < heap.get(smallest)) {
                smallest = leftChild;
            }

            // Compare with right child
            if (rightChild < heap.size() &&
                heap.get(rightChild) < heap.get(smallest)) {
                smallest = rightChild;
            }

            // If no swap needed, done
            if (smallest == index) {
                break;
            }

            // Swap and continue
            swap(index, smallest);
            index = smallest;
        }
    }

    // Helper: Swap two elements
    private void swap(int i, int j) {
        int temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }

    // Build heap from array (heapify)
    public static MinHeap heapify(int[] arr) {
        MinHeap heap = new MinHeap();
        heap.heap = new ArrayList<>();

        for (int num : arr) {
            heap.heap.add(num);
        }

        // Start from last non-leaf node
        for (int i = arr.length / 2 - 1; i >= 0; i--) {
            heap.bubbleDown(i);
        }

        return heap;
    }
}

// Max Heap variant
class MaxHeap {
    private List<Integer> heap;

    public MaxHeap() {
        heap = new ArrayList<>();
    }

    public void insert(int val) {
        heap.add(val);
        bubbleUp(heap.size() - 1);
    }

    public int extractMax() {
        if (heap.isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }

        int max = heap.get(0);
        int last = heap.remove(heap.size() - 1);

        if (!heap.isEmpty()) {
            heap.set(0, last);
            bubbleDown(0);
        }

        return max;
    }

    public int peek() {
        if (heap.isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }
        return heap.get(0);
    }

    private void bubbleUp(int index) {
        while (index > 0) {
            int parentIndex = (index - 1) / 2;

            if (heap.get(index) <= heap.get(parentIndex)) {
                break;
            }

            swap(index, parentIndex);
            index = parentIndex;
        }
    }

    private void bubbleDown(int index) {
        while (true) {
            int largest = index;
            int leftChild = 2 * index + 1;
            int rightChild = 2 * index + 2;

            if (leftChild < heap.size() &&
                heap.get(leftChild) > heap.get(largest)) {
                largest = leftChild;
            }

            if (rightChild < heap.size() &&
                heap.get(rightChild) > heap.get(largest)) {
                largest = rightChild;
            }

            if (largest == index) {
                break;
            }

            swap(index, largest);
            index = largest;
        }
    }

    private void swap(int i, int j) {
        int temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }
}`
        },
        python: {
          starterCode: `class MinHeap:
    def __init__(self):
        self.heap = []

    # Insert element into heap
    def insert(self, val):
        # TODO: Add element and bubble up
        pass

    # Extract minimum element
    def extract_min(self):
        # TODO: Remove and return min, then bubble down
        pass

    # Get minimum without removing
    def peek(self):
        # TODO: Return root element
        pass

    # Helper methods
    def _bubble_up(self, index):
        # TODO: Move element up to maintain heap property
        pass

    def _bubble_down(self, index):
        # TODO: Move element down to maintain heap property
        pass`,
          solution: `import heapq

class MinHeap:
    def __init__(self):
        self.heap = []

    # Insert element into heap
    def insert(self, val):
        self.heap.append(val)
        self._bubble_up(len(self.heap) - 1)

    # Extract minimum element
    def extract_min(self):
        if not self.heap:
            raise IndexError("Heap is empty")

        min_val = self.heap[0]
        last = self.heap.pop()

        if self.heap:
            self.heap[0] = last
            self._bubble_down(0)

        return min_val

    # Get minimum without removing
    def peek(self):
        if not self.heap:
            raise IndexError("Heap is empty")
        return self.heap[0]

    # Get size
    def size(self):
        return len(self.heap)

    # Check if empty
    def is_empty(self):
        return len(self.heap) == 0

    # Helper: Move element up to maintain heap property
    def _bubble_up(self, index):
        while index > 0:
            parent_index = (index - 1) // 2

            if self.heap[index] >= self.heap[parent_index]:
                break

            # Swap with parent
            self.heap[index], self.heap[parent_index] = \\
                self.heap[parent_index], self.heap[index]
            index = parent_index

    # Helper: Move element down to maintain heap property
    def _bubble_down(self, index):
        while True:
            smallest = index
            left_child = 2 * index + 1
            right_child = 2 * index + 2

            # Compare with left child
            if (left_child < len(self.heap) and
                self.heap[left_child] < self.heap[smallest]):
                smallest = left_child

            # Compare with right child
            if (right_child < len(self.heap) and
                self.heap[right_child] < self.heap[smallest]):
                smallest = right_child

            # If no swap needed, done
            if smallest == index:
                break

            # Swap and continue
            self.heap[index], self.heap[smallest] = \\
                self.heap[smallest], self.heap[index]
            index = smallest

    # Build heap from array (heapify)
    @staticmethod
    def heapify(arr):
        heap = MinHeap()
        heap.heap = arr.copy()

        # Start from last non-leaf node
        for i in range(len(arr) // 2 - 1, -1, -1):
            heap._bubble_down(i)

        return heap


# Max Heap variant
class MaxHeap:
    def __init__(self):
        self.heap = []

    def insert(self, val):
        self.heap.append(val)
        self._bubble_up(len(self.heap) - 1)

    def extract_max(self):
        if not self.heap:
            raise IndexError("Heap is empty")

        max_val = self.heap[0]
        last = self.heap.pop()

        if self.heap:
            self.heap[0] = last
            self._bubble_down(0)

        return max_val

    def peek(self):
        if not self.heap:
            raise IndexError("Heap is empty")
        return self.heap[0]

    def _bubble_up(self, index):
        while index > 0:
            parent_index = (index - 1) // 2

            if self.heap[index] <= self.heap[parent_index]:
                break

            self.heap[index], self.heap[parent_index] = \\
                self.heap[parent_index], self.heap[index]
            index = parent_index

    def _bubble_down(self, index):
        while True:
            largest = index
            left_child = 2 * index + 1
            right_child = 2 * index + 2

            if (left_child < len(self.heap) and
                self.heap[left_child] > self.heap[largest]):
                largest = left_child

            if (right_child < len(self.heap) and
                self.heap[right_child] > self.heap[largest]):
                largest = right_child

            if largest == index:
                break

            self.heap[index], self.heap[largest] = \\
                self.heap[largest], self.heap[index]
            index = largest


# Using Python's built-in heapq module (min heap by default)
class MinHeapBuiltIn:
    def __init__(self):
        self.heap = []

    def insert(self, val):
        heapq.heappush(self.heap, val)

    def extract_min(self):
        if not self.heap:
            raise IndexError("Heap is empty")
        return heapq.heappop(self.heap)

    def peek(self):
        if not self.heap:
            raise IndexError("Heap is empty")
        return self.heap[0]

    @staticmethod
    def heapify(arr):
        heap = MinHeapBuiltIn()
        heap.heap = arr.copy()
        heapq.heapify(heap.heap)
        return heap`
        }
      },
      testCases: [
        { input: 'insert(3,1,6,5,2), extractMin()', output: '1' },
        { input: 'insert(5,3,7,1), peek()', output: '1' },
        { input: 'heapify([3,2,1,5,4])', output: 'Min heap created' }
      ],
      explanation: `**Problem:** Implement a Min Heap (binary min-heap) with insert, extractMin, and peek operations.

**Key Insight:** A heap is a complete binary tree stored in an array where parent is smaller than children. For any index i:
- Parent index: (i-1)/2
- Left child: 2*i+1
- Right child: 2*i+2

**Operations:**

**1. Insert (bubbleUp)**
- Add element to end of array
- Bubble up: Compare with parent, swap if smaller
- Continue until heap property restored
- Time: O(log n)

**2. ExtractMin (bubbleDown)**
- Save root (minimum element)
- Move last element to root
- Bubble down: Compare with children, swap with smaller child
- Continue until heap property restored
- Time: O(log n)

**3. Peek**
- Return root element (index 0)
- Time: O(1)

**4. Heapify (Build Heap from Array)**
- Start from last non-leaf node (n/2-1)
- Bubble down each node
- Time: O(n) - faster than n insertions!

**Why Heaps?** Efficient for finding min/max, priority queues, and heap sort.

**Complexity:** Insert/Extract O(log n), Peek O(1), Heapify O(n), Space O(n)`,
      pseudocode: `class MinHeap:
    heap = []

    function insert(val):
        heap.add(val)
        bubbleUp(heap.length - 1)

    function extractMin():
        if heap is empty: throw error

        min = heap[0]
        last = heap.removeLast()

        if heap is not empty:
            heap[0] = last
            bubbleDown(0)

        return min

    function peek():
        if heap is empty: throw error
        return heap[0]

    function bubbleUp(index):
        while index > 0:
            parent = (index - 1) / 2
            if heap[index] >= heap[parent]:
                break
            swap(index, parent)
            index = parent

    function bubbleDown(index):
        while true:
            smallest = index
            left = 2 * index + 1
            right = 2 * index + 2

            if left < size and heap[left] < heap[smallest]:
                smallest = left
            if right < size and heap[right] < heap[smallest]:
                smallest = right

            if smallest == index:
                break

            swap(index, smallest)
            index = smallest

Example: insert(3,1,6,5,2)
- After insert(3): [3]
- After insert(1): [1,3] (bubbled up)
- After insert(6): [1,3,6]
- After insert(5): [1,3,6,5]
- After insert(2): [1,2,6,5,3] (2 bubbled to index 1)
- extractMin(): returns 1, heap becomes [2,3,6,5]`
    },
    {
      id: 2,
      title: 'Kth Largest Element',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
      description: 'Find the kth largest element in an unsorted array. Use a min heap of size k to efficiently track the k largest elements.',
      examples: [
        { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
        { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    // Find kth largest using min heap
    public int findKthLargest(int[] nums, int k) {
        // TODO: Use min heap of size k

        return -1;
    }
}`,
          solution: `class Solution {
    // Find kth largest using min heap
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        for (int num : nums) {
            minHeap.offer(num);

            // Keep heap size at k
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

        // Root of min heap is kth largest
        return minHeap.peek();
    }
}

// Alternative: Using max heap
class SolutionMaxHeap {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);

        for (int num : nums) {
            maxHeap.offer(num);
        }

        // Extract max k-1 times
        for (int i = 0; i < k - 1; i++) {
            maxHeap.poll();
        }

        return maxHeap.peek();
    }
}

// Using QuickSelect (average O(n))
class SolutionQuickSelect {
    public int findKthLargest(int[] nums, int k) {
        // Convert to kth smallest problem
        return quickSelect(nums, 0, nums.length - 1, nums.length - k);
    }

    private int quickSelect(int[] nums, int left, int right, int k) {
        if (left == right) {
            return nums[left];
        }

        int pivotIndex = partition(nums, left, right);

        if (pivotIndex == k) {
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
            if (nums[j] < pivot) {
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
    }
}

// Using Arrays.sort (O(n log n))
class SolutionSort {
    public int findKthLargest(int[] nums, int k) {
        Arrays.sort(nums);
        return nums[nums.length - k];
    }
}`
        },
        python: {
          starterCode: `def findKthLargest(self, nums: List[int], k: int) -> int:
    # TODO: Use min heap of size k
    pass`,
          solution: `import heapq

class Solution:
    # Find kth largest using min heap
    def findKthLargest(self, nums: List[int], k: int) -> int:
        min_heap = []

        for num in nums:
            heapq.heappush(min_heap, num)

            # Keep heap size at k
            if len(min_heap) > k:
                heapq.heappop(min_heap)

        # Root of min heap is kth largest
        return min_heap[0]


# Alternative: Using max heap (negate values)
class SolutionMaxHeap:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        max_heap = [-num for num in nums]
        heapq.heapify(max_heap)

        # Extract max k-1 times
        for _ in range(k - 1):
            heapq.heappop(max_heap)

        return -max_heap[0]


# Using heapq.nlargest (most Pythonic)
class SolutionNLargest:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        return heapq.nlargest(k, nums)[-1]


# Using QuickSelect (average O(n))
class SolutionQuickSelect:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        # Convert to kth smallest problem
        return self.quick_select(nums, 0, len(nums) - 1, len(nums) - k)

    def quick_select(self, nums, left, right, k):
        if left == right:
            return nums[left]

        pivot_index = self.partition(nums, left, right)

        if pivot_index == k:
            return nums[k]
        elif k < pivot_index:
            return self.quick_select(nums, left, pivot_index - 1, k)
        else:
            return self.quick_select(nums, pivot_index + 1, right, k)

    def partition(self, nums, left, right):
        pivot = nums[right]
        i = left

        for j in range(left, right):
            if nums[j] < pivot:
                nums[i], nums[j] = nums[j], nums[i]
                i += 1

        nums[i], nums[right] = nums[right], nums[i]
        return i


# Using sorting (O(n log n))
class SolutionSort:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        nums.sort()
        return nums[len(nums) - k]`
        }
      },
      testCases: [
        { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5' },
        { input: 'nums = [3,2,3,1,2,4,5,5,6], k = 4', output: '4' },
        { input: 'nums = [1], k = 1', output: '1' }
      ],
      explanation: `**Problem:** Find the kth largest element in an unsorted array.

**Key Insight:** We don't need to sort the entire array. Maintain a min heap of size k containing the k largest elements seen so far. The root of this heap is the kth largest.

**Approach 1: Min Heap of Size K** (Best for streaming data)
1. Create a min heap
2. For each number:
   - Add to heap
   - If heap size > k, remove minimum
3. After processing all numbers, heap root is kth largest
4. Why? Heap keeps k largest elements, root is the smallest among them

**Approach 2: Max Heap**
1. Add all elements to max heap
2. Extract max k-1 times
3. The next max is kth largest
4. Less efficient: O(n log n + k log n)

**Approach 3: QuickSelect** (Average O(n))
1. Use partitioning like QuickSort
2. Partition finds pivot's final position
3. If position is kth largest, done
4. Otherwise recurse on appropriate half
5. Average O(n), worst O(n²)

**Approach 4: Sorting** (O(n log n))
Simple but less efficient: sort array, return nums[n-k]

**Best Choice:** Min heap of size k is ideal for streaming/online scenarios. QuickSelect is fastest for static arrays.

**Complexity:** Min Heap O(n log k), QuickSelect avg O(n), Space O(k)`,
      pseudocode: `Min Heap Approach:
function findKthLargest(nums, k):
    minHeap = new MinHeap()

    for num in nums:
        minHeap.insert(num)

        // Keep only k largest elements
        if minHeap.size() > k:
            minHeap.extractMin()

    // Root is kth largest
    return minHeap.peek()

Example: nums = [3,2,1,5,6,4], k = 2
- Process 3: heap = [3]
- Process 2: heap = [2,3], size > 2, remove 2, heap = [3]
- Process 1: heap = [1,3], size > 2, remove 1, heap = [3]
- Process 5: heap = [3,5], size = 2 ✓
- Process 6: heap = [3,5,6], size > 2, remove 3, heap = [5,6]
- Process 4: heap = [4,5,6], size > 2, remove 4, heap = [5,6]
- Result: heap.peek() = 5 (2nd largest)

QuickSelect Approach:
function findKthLargest(nums, k):
    // Convert to kth smallest: n-k
    return quickSelect(nums, 0, n-1, n-k)

function quickSelect(nums, left, right, k):
    if left == right:
        return nums[left]

    pivotIndex = partition(nums, left, right)

    if pivotIndex == k:
        return nums[k]
    elif k < pivotIndex:
        return quickSelect(nums, left, pivotIndex-1, k)
    else:
        return quickSelect(nums, pivotIndex+1, right, k)`
    },
    {
      id: 3,
      title: 'Merge K Sorted Lists',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/',
      description: 'Merge k sorted linked lists into one sorted linked list. Use a min heap to efficiently find the next smallest element among all list heads.',
      examples: [
        { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' }
      ],
      code: {
        java: {
          starterCode: `class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        // TODO: Use min heap to merge k sorted lists

        return null;
    }
}`,
          solution: `class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) {
            return null;
        }

        // Min heap based on node values
        PriorityQueue<ListNode> minHeap = new PriorityQueue<>(
            (a, b) -> a.val - b.val
        );

        // Add first node from each list
        for (ListNode list : lists) {
            if (list != null) {
                minHeap.offer(list);
            }
        }

        ListNode dummy = new ListNode(0);
        ListNode current = dummy;

        while (!minHeap.isEmpty()) {
            // Get smallest node
            ListNode smallest = minHeap.poll();
            current.next = smallest;
            current = current.next;

            // Add next node from same list
            if (smallest.next != null) {
                minHeap.offer(smallest.next);
            }
        }

        return dummy.next;
    }
}

// Divide and Conquer approach
class SolutionDivideConquer {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) {
            return null;
        }
        return mergeKListsHelper(lists, 0, lists.length - 1);
    }

    private ListNode mergeKListsHelper(ListNode[] lists, int left, int right) {
        if (left == right) {
            return lists[left];
        }

        if (left < right) {
            int mid = left + (right - left) / 2;
            ListNode l1 = mergeKListsHelper(lists, left, mid);
            ListNode l2 = mergeKListsHelper(lists, mid + 1, right);
            return mergeTwoLists(l1, l2);
        }

        return null;
    }

    private ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        if (l1 == null) return l2;
        if (l2 == null) return l1;

        if (l1.val < l2.val) {
            l1.next = mergeTwoLists(l1.next, l2);
            return l1;
        } else {
            l2.next = mergeTwoLists(l1, l2.next);
            return l2;
        }
    }
}

// Sequential merge approach
class SolutionSequential {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) {
            return null;
        }

        ListNode result = lists[0];
        for (int i = 1; i < lists.length; i++) {
            result = mergeTwoLists(result, lists[i]);
        }

        return result;
    }

    private ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;

        while (l1 != null && l2 != null) {
            if (l1.val < l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }

        current.next = (l1 != null) ? l1 : l2;
        return dummy.next;
    }
}`
        },
        python: {
          starterCode: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
    # TODO: Use min heap to merge k sorted lists
    pass`,
          solution: `import heapq

# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        if not lists:
            return None

        # Min heap: (value, unique_id, node)
        # unique_id is needed to break ties when values are equal
        min_heap = []

        # Add first node from each list
        for i, node in enumerate(lists):
            if node:
                heapq.heappush(min_heap, (node.val, i, node))

        dummy = ListNode(0)
        current = dummy
        unique_id = len(lists)  # Counter for unique IDs

        while min_heap:
            # Get smallest node
            val, _, smallest = heapq.heappop(min_heap)
            current.next = smallest
            current = current.next

            # Add next node from same list
            if smallest.next:
                heapq.heappush(min_heap, (smallest.next.val, unique_id, smallest.next))
                unique_id += 1

        return dummy.next


# Divide and Conquer approach
class SolutionDivideConquer:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        if not lists:
            return None
        return self._merge_k_lists_helper(lists, 0, len(lists) - 1)

    def _merge_k_lists_helper(self, lists, left, right):
        if left == right:
            return lists[left]

        if left < right:
            mid = left + (right - left) // 2
            l1 = self._merge_k_lists_helper(lists, left, mid)
            l2 = self._merge_k_lists_helper(lists, mid + 1, right)
            return self._merge_two_lists(l1, l2)

        return None

    def _merge_two_lists(self, l1, l2):
        if not l1:
            return l2
        if not l2:
            return l1

        if l1.val < l2.val:
            l1.next = self._merge_two_lists(l1.next, l2)
            return l1
        else:
            l2.next = self._merge_two_lists(l1, l2.next)
            return l2


# Sequential merge approach
class SolutionSequential:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        if not lists:
            return None

        result = lists[0]
        for i in range(1, len(lists)):
            result = self._merge_two_lists(result, lists[i])

        return result

    def _merge_two_lists(self, l1, l2):
        dummy = ListNode(0)
        current = dummy

        while l1 and l2:
            if l1.val < l2.val:
                current.next = l1
                l1 = l1.next
            else:
                current.next = l2
                l2 = l2.next
            current = current.next

        current.next = l1 if l1 else l2
        return dummy.next`
        }
      },
      testCases: [
        { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
        { input: 'lists = []', output: '[]' },
        { input: 'lists = [[]]', output: '[]' }
      ],
      explanation: `**Problem:** Merge k sorted linked lists into one sorted list.

**Key Insight:** Use a min heap to efficiently find the smallest element among all list heads at each step.

**Approach 1: Min Heap** (Optimal)
1. Add first node from each list to min heap (ordered by value)
2. While heap not empty:
   - Extract minimum node
   - Add it to result list
   - If this node has a next, add next to heap
3. This ensures we always pick the global minimum

**Why Min Heap?** At each step, we need the minimum among k list heads. Min heap gives us O(log k) operations instead of O(k) linear scan.

**Approach 2: Divide and Conquer**
1. Pair up lists and merge each pair
2. Repeat until one list remains
3. Like merge sort's merge phase
4. Time: O(n log k) where n = total nodes

**Approach 3: Sequential Merge**
1. Merge list1 with list2, result with list3, etc.
2. Simple but inefficient
3. Time: O(nk) - each merge processes more nodes

**Approach 4: Merge All at Once**
Use k-way merge with pointers, but heap is cleaner

**Best Choice:** Min heap approach - clean code, optimal complexity

**Complexity:** Time O(n log k) where n=total nodes, k=number of lists. Space O(k) for heap`,
      pseudocode: `function mergeKLists(lists):
    if lists is empty:
        return null

    minHeap = new MinHeap()  // ordered by node.val

    // Add first node from each list
    for list in lists:
        if list != null:
            minHeap.insert(list)

    dummy = new ListNode(0)
    current = dummy

    while minHeap is not empty:
        // Get node with minimum value
        smallest = minHeap.extractMin()
        current.next = smallest
        current = current.next

        // Add next node from same list
        if smallest.next != null:
            minHeap.insert(smallest.next)

    return dummy.next

Example: lists = [[1,4,5],[1,3,4],[2,6]]
- Initial heap: [1(list0), 1(list1), 2(list2)]
- Extract 1 from list0: result=[1], add 4, heap=[1(list1), 2, 4]
- Extract 1 from list1: result=[1,1], add 3, heap=[2, 3, 4]
- Extract 2: result=[1,1,2], add 6, heap=[3, 4, 6]
- Extract 3: result=[1,1,2,3], add 4, heap=[4, 4, 6]
- Extract 4: result=[1,1,2,3,4], heap=[4, 6]
- Extract 4: result=[1,1,2,3,4,4], heap=[6]
- Extract 5: result=[1,1,2,3,4,4,5], heap=[6]
- Extract 6: result=[1,1,2,3,4,4,5,6], heap=[]
- Done!`
    },
    {
      id: 4,
      title: 'Find Median from Data Stream',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/',
      description: 'Design a data structure that supports adding numbers and finding the median efficiently. Use two heaps (max heap for lower half, min heap for upper half) to maintain the median.',
      examples: [
        { input: 'addNum(1)', output: 'median = 1' },
        { input: 'addNum(2)', output: 'median = 1.5' },
        { input: 'addNum(3)', output: 'median = 2' },
        { input: 'addNum(4)', output: 'median = 2.5' },
        { input: 'addNum(5)', output: 'median = 3' }
      ],
      code: {
        java: {
          starterCode: `class MedianFinder {
    // Max heap for lower half
    private PriorityQueue<Integer> maxHeap;
    // Min heap for upper half
    private PriorityQueue<Integer> minHeap;

    public MedianFinder() {
        // TODO: Initialize heaps

    }

    public void addNum(int num) {
        // TODO: Add number and rebalance heaps

    }

    public double findMedian() {
        // TODO: Calculate median from heap tops

        return 0.0;
    }
}`,
          solution: `class MedianFinder {
    // Max heap for lower half (stores smaller elements)
    private PriorityQueue<Integer> maxHeap;
    // Min heap for upper half (stores larger elements)
    private PriorityQueue<Integer> minHeap;

    public MedianFinder() {
        maxHeap = new PriorityQueue<>((a, b) -> b - a); // Max heap
        minHeap = new PriorityQueue<>(); // Min heap
    }

    public void addNum(int num) {
        // Add to max heap first
        maxHeap.offer(num);

        // Balance: move largest from maxHeap to minHeap
        minHeap.offer(maxHeap.poll());

        // Ensure maxHeap has equal or one more element
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }

    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.peek();
        } else {
            return (maxHeap.peek() + minHeap.peek()) / 2.0;
        }
    }
}

// Alternative implementation with clearer logic
class MedianFinderAlt {
    private PriorityQueue<Integer> small; // Max heap
    private PriorityQueue<Integer> large; // Min heap

    public MedianFinderAlt() {
        small = new PriorityQueue<>((a, b) -> b - a);
        large = new PriorityQueue<>();
    }

    public void addNum(int num) {
        // Add to appropriate heap
        if (small.isEmpty() || num <= small.peek()) {
            small.offer(num);
        } else {
            large.offer(num);
        }

        // Rebalance if needed
        if (small.size() > large.size() + 1) {
            large.offer(small.poll());
        } else if (large.size() > small.size()) {
            small.offer(large.poll());
        }
    }

    public double findMedian() {
        if (small.size() == large.size()) {
            return (small.peek() + large.peek()) / 2.0;
        } else {
            return small.peek();
        }
    }

    // Additional: Get count of numbers
    public int size() {
        return small.size() + large.size();
    }

    // Additional: Remove median
    public double removeMedian() {
        double median = findMedian();

        if (small.size() == large.size()) {
            small.poll();
        } else {
            small.poll();
        }

        return median;
    }
}

// Usage example
class MedianFinderTest {
    public void test() {
        MedianFinder mf = new MedianFinder();

        mf.addNum(1);
        System.out.println(mf.findMedian()); // 1.0

        mf.addNum(2);
        System.out.println(mf.findMedian()); // 1.5

        mf.addNum(3);
        System.out.println(mf.findMedian()); // 2.0

        mf.addNum(4);
        System.out.println(mf.findMedian()); // 2.5

        mf.addNum(5);
        System.out.println(mf.findMedian()); // 3.0
    }
}`
        },
        python: {
          starterCode: `class MedianFinder:
    def __init__(self):
        # TODO: Initialize heaps
        pass

    def addNum(self, num: int) -> None:
        # TODO: Add number and rebalance heaps
        pass

    def findMedian(self) -> float:
        # TODO: Calculate median from heap tops
        pass`,
          solution: `import heapq

class MedianFinder:
    def __init__(self):
        # Max heap for lower half (negate values for max heap behavior)
        self.small = []  # Max heap (stores smaller half)
        # Min heap for upper half
        self.large = []  # Min heap (stores larger half)

    def addNum(self, num: int) -> None:
        # Add to max heap first (negate for max heap)
        heapq.heappush(self.small, -num)

        # Balance: move largest from small to large
        heapq.heappush(self.large, -heapq.heappop(self.small))

        # Ensure small has equal or one more element
        if len(self.small) < len(self.large):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return -self.small[0]
        else:
            return (-self.small[0] + self.large[0]) / 2.0


# Alternative implementation with clearer logic
class MedianFinderAlt:
    def __init__(self):
        self.small = []  # Max heap
        self.large = []  # Min heap

    def addNum(self, num: int) -> None:
        # Add to appropriate heap
        if not self.small or num <= -self.small[0]:
            heapq.heappush(self.small, -num)
        else:
            heapq.heappush(self.large, num)

        # Rebalance if needed
        if len(self.small) > len(self.large) + 1:
            heapq.heappush(self.large, -heapq.heappop(self.small))
        elif len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) == len(self.large):
            return (-self.small[0] + self.large[0]) / 2.0
        else:
            return -self.small[0]

    # Additional: Get count of numbers
    def size(self) -> int:
        return len(self.small) + len(self.large)

    # Additional: Remove median
    def removeMedian(self) -> float:
        median = self.findMedian()

        if len(self.small) == len(self.large):
            heapq.heappop(self.small)
        else:
            heapq.heappop(self.small)

        return median


# Usage example
def test_median_finder():
    mf = MedianFinder()

    mf.addNum(1)
    print(mf.findMedian())  # 1.0

    mf.addNum(2)
    print(mf.findMedian())  # 1.5

    mf.addNum(3)
    print(mf.findMedian())  # 2.0

    mf.addNum(4)
    print(mf.findMedian())  # 2.5

    mf.addNum(5)
    print(mf.findMedian())  # 3.0`
        }
      },
      testCases: [
        { input: 'addNum(1), addNum(2), findMedian()', output: '1.5' },
        { input: 'addNum(1), addNum(2), addNum(3), findMedian()', output: '2.0' },
        { input: 'addNum(6), addNum(10), addNum(2), addNum(6), addNum(5), findMedian()', output: '6.0' }
      ],
      explanation: `**Problem:** Design a data structure to efficiently add numbers and find the median of all numbers added so far.

**Key Insight:** Use two heaps to split numbers into lower and upper halves. The median is at the boundary between these halves.

**Two Heap Strategy:**
1. **Max Heap (small)**: Stores smaller half of numbers, root is maximum of lower half
2. **Min Heap (large)**: Stores larger half of numbers, root is minimum of upper half
3. Keep heaps balanced: small.size() = large.size() or small.size() = large.size() + 1

**Why This Works:**
- Max heap top = largest in lower half
- Min heap top = smallest in upper half
- These two values determine the median!
- If sizes equal: median = (small.top + large.top) / 2
- If small has one more: median = small.top

**Add Number Algorithm:**
1. Always add to small (max heap) first
2. Move small's maximum to large (ensures all elements in large ≥ all in small)
3. If large has more elements, move its minimum back to small
4. This keeps heaps balanced

**Alternative Add:**
1. Compare with small.top, add to appropriate heap
2. Rebalance if size difference > 1

**Complexity:** addNum O(log n), findMedian O(1), Space O(n)

**Use Cases:** Running median, streaming data analysis, online statistics`,
      pseudocode: `class MedianFinder:
    small = MaxHeap()  // stores smaller half
    large = MinHeap()  // stores larger half

    function addNum(num):
        // Add to small first
        small.insert(num)

        // Balance: move small's max to large
        large.insert(small.extractMax())

        // Ensure small has equal or one more element
        if small.size() < large.size():
            small.insert(large.extractMin())

    function findMedian():
        if small.size() > large.size():
            return small.peek()  // odd count
        else:
            return (small.peek() + large.peek()) / 2.0  // even count

Example: addNum(1), addNum(2), addNum(3)
- Add 1:
  * small = [1], large = []
  * Move 1 to large: small = [], large = [1]
  * Rebalance: small = [1], large = []
- Add 2:
  * Add to small: small = [2,1], large = []  (max heap, so 2 at top)
  * Move 2 to large: small = [1], large = [2]
  * Sizes equal, no rebalance
  * Median = (1 + 2) / 2 = 1.5
- Add 3:
  * Add to small: small = [3,1], large = [2]
  * Move 3 to large: small = [1], large = [2,3]
  * Rebalance: small = [2,1], large = [3]
  * Median = small.peek() = 2

Invariant maintained: small.top ≤ large.top always!`
    },
    {
      id: 5,
      title: 'IPO',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/ipo/',
      description: 'Maximize capital by selecting at most k distinct projects with given profits and capital requirements.',
      examples: [
        { input: 'k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]', output: '4' }
      ],
      code: {
        java: {
          starterCode: `public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
}`,
          solution: `public int findMaximizedCapital(int k, int w, int[] profits, int[] capital) {
    int n = profits.length;
    
    // Min heap for projects by capital requirement
    PriorityQueue<int[]> minCapital = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    for (int i = 0; i < n; i++) {
        minCapital.offer(new int[]{capital[i], profits[i]});
    }
    
    // Max heap for available projects by profit
    PriorityQueue<Integer> maxProfit = new PriorityQueue<>((a, b) -> b - a);
    
    for (int i = 0; i < k; i++) {
        // Add all affordable projects to maxProfit heap
        while (!minCapital.isEmpty() && minCapital.peek()[0] <= w) {
            maxProfit.offer(minCapital.poll()[1]);
        }
        
        // If no affordable project, break
        if (maxProfit.isEmpty()) break;
        
        // Pick the most profitable project
        w += maxProfit.poll();
    }
    
    return w;
}`
        },
        python: {
          starterCode: `def findMaximizedCapital(self, k: int, w: int, profits: List[int], capital: List[int]) -> int:
    pass`,
          solution: `def findMaximizedCapital(self, k: int, w: int, profits: List[int], capital: List[int]) -> int:
    import heapq
    
    n = len(profits)
    
    # Min heap for projects by capital requirement
    projects = [(capital[i], profits[i]) for i in range(n)]
    heapq.heapify(projects)
    
    # Max heap for available projects by profit (use negative for max heap)
    available = []
    
    for _ in range(k):
        # Add all affordable projects
        while projects and projects[0][0] <= w:
            cap, prof = heapq.heappop(projects)
            heapq.heappush(available, -prof)  # Negative for max heap
        
        # If no affordable project, break
        if not available:
            break
        
        # Pick the most profitable project
        w += -heapq.heappop(available)
    
    return w`
        }
      },
      testCases: [
        { input: 'k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]', output: '4' },
        { input: 'k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]', output: '6' }
      ],
      hints: `Two heaps: min heap for capital, max heap for profit. Time O(n log n), Space O(n)`
    },
    {
      id: 6,
      title: 'Find K Pairs with Smallest Sums',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/find-k-pairs-with-smallest-sums/',
      description: 'Find k pairs (u, v) from two sorted arrays with smallest sums.',
      examples: [
        { input: 'nums1 = [1,7,11], nums2 = [2,4,6], k = 3', output: '[[1,2],[1,4],[1,6]]' }
      ],
      code: {
        java: {
          starterCode: `public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {
}`,
          solution: `public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {
    List<List<Integer>> result = new ArrayList<>();
    if (nums1.length == 0 || nums2.length == 0 || k == 0) return result;
    
    // Min heap: [sum, i, j]
    PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    
    // Initialize heap with pairs (nums1[i], nums2[0])
    for (int i = 0; i < Math.min(k, nums1.length); i++) {
        minHeap.offer(new int[]{nums1[i] + nums2[0], i, 0});
    }
    
    while (k > 0 && !minHeap.isEmpty()) {
        int[] curr = minHeap.poll();
        int i = curr[1];
        int j = curr[2];
        
        result.add(Arrays.asList(nums1[i], nums2[j]));
        
        // Add next pair from same row
        if (j + 1 < nums2.length) {
            minHeap.offer(new int[]{nums1[i] + nums2[j + 1], i, j + 1});
        }
        
        k--;
    }
    
    return result;
}`
        },
        python: {
          starterCode: `def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
    pass`,
          solution: `def kSmallestPairs(self, nums1: List[int], nums2: List[int], k: int) -> List[List[int]]:
    import heapq
    
    if not nums1 or not nums2 or k == 0:
        return []
    
    result = []
    
    # Min heap: (sum, i, j)
    heap = []
    
    # Initialize heap with pairs (nums1[i], nums2[0])
    for i in range(min(k, len(nums1))):
        heapq.heappush(heap, (nums1[i] + nums2[0], i, 0))
    
    while k > 0 and heap:
        sum_val, i, j = heapq.heappop(heap)
        result.append([nums1[i], nums2[j]])
        
        # Add next pair from same row
        if j + 1 < len(nums2):
            heapq.heappush(heap, (nums1[i] + nums2[j + 1], i, j + 1))
        
        k -= 1
    
    return result`
        }
      },
      testCases: [
        { input: 'nums1 = [1,7,11], nums2 = [2,4,6], k = 3', output: '[[1,2],[1,4],[1,6]]' },
        { input: 'nums1 = [1,1,2], nums2 = [1,2,3], k = 2', output: '[[1,1],[1,1]]' }
      ],
      hints: `Min heap with indices. Time O(k log k), Space O(k)`
    }

  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Heaps-${q.id}`)).length
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
    const savedDrawing = localStorage.getItem(`drawing-Heaps-${question.id}`)
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
      category: { name: 'Heaps', onClick: () => setSelectedQuestion(null) },
      topic: selectedQuestion.title
    }

    return (
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            ← Back to Heaps
          </button>
          <LanguageToggle />
        </div>

        <Breadcrumb breadcrumb={problemBreadcrumb} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Problem Description */}
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #3b82f6', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: 'white', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <CompletionCheckbox problemId={`Heaps-${selectedQuestion.id}`} />
              <BookmarkButton problemId={`Heaps-${selectedQuestion.id}`} problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'Heaps' }} />
            </div>

            {selectedQuestion.leetcodeUrl && (
              <a href={selectedQuestion.leetcodeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
                View on LeetCode ↗
              </a>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ backgroundColor: '#374151', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #4b5563', color: '#d1d5db' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'white' }}>Input:</strong> <code style={{ color: '#d1d5db' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: 'white' }}>Output:</strong> <code style={{ color: '#d1d5db' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem' }}>Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#1e3a5a', borderRadius: '8px', border: '1px solid #3b82f6' }}>
                <h3 style={{ fontSize: '1rem', color: 'white', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#93c5fd' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#93c5fd' }}>Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #3b82f6', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' , flexWrap: 'wrap' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
              </button>
              <button onClick={() => setShowDrawing(true)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: currentDrawing ? '#8b5cf6' : '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {currentDrawing ? 'View' : 'Draw'} Sketch
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5', backgroundColor: '#1f2937', color: '#d1d5db' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: 'white', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#374151', padding: '1rem', borderRadius: '8px', border: '1px solid #4b5563', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px', color: '#d1d5db' }}>{output}</pre>
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
            const savedDrawing = localStorage.getItem(`drawing-Heaps-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`Heaps-${selectedQuestion.id}`}
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
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem' }}>Heaps</h1>
        <p style={{ fontSize: '1.2rem', color: '#d1d5db' }}>Master heaps problems</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: '2px solid #3b82f6' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#d1d5db', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: '2px solid #10b981' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#d1d5db', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', border: '2px solid #374151', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
                <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>({difficultyQuestions.length} problems)</span>
              </div>
              <span style={{ fontSize: '1.25rem', color: '#d1d5db' }}>{expandedSections[difficulty] ? '▼' : '▶'}</span>
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
                      tabIndex={0}
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
                        background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: isFocused ? '2px solid #3b82f6' : '2px solid #374151',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        outline: 'none'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; if (!isFocused) e.currentTarget.style.border = '2px solid #374151' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#d1d5db', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                        <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ transform: 'scale(0.85)' }}>
                            <CompletionCheckbox problemId={`Heaps-${question.id}`} />
                          </div>
                          <BookmarkButton size="small" problemId={`Heaps-${question.id}`} problemData={{ title: question.title, difficulty: question.difficulty, category: 'Heaps' }} />
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

export default Heaps
