import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function Queues({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb, breadcrumbStack, onBreadcrumbClick, pushBreadcrumb, breadcrumbColors }) {
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
      title: 'Implement Queue using Stacks',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/implement-queue-using-stacks/',
      description: 'Implement a queue data structure using two stacks. Support push (enqueue), pop (dequeue), peek, and empty operations. Ensure FIFO behavior using LIFO stacks.',
      explanation: `**Problem:** Implement a FIFO (First-In-First-Out) queue using only LIFO (Last-In-First-Out) stacks.

**Challenge:** How do we convert LIFO behavior into FIFO behavior?

**Key Data Structures:**
- Queue: FIFO → elements removed in order they were added [1,2,3] → remove 1 first
- Stack: LIFO → elements removed in reverse order [1,2,3] → remove 3 first

**Core Insight: Two-Stack Technique**
Use TWO stacks to reverse the reversal!
- **input stack**: receives all new elements (push operations)
- **output stack**: provides elements for removal (pop/peek operations)

**Why This Works:**
When we transfer elements from input to output stack, they get reversed twice → back to original order!

**Example:**
Push 1, 2, 3:
  input: [1, 2, 3]  (top at 3)
  output: []

Transfer to output (for pop/peek):
  Pop from input, push to output:
    3 → output: [3]
    2 → output: [3, 2]
    1 → output: [3, 2, 1]  (top at 1)
  input: []
  output: [1, 2, 3]  (top at 1) ← Now FIFO order!

Pop():
  output.pop() → returns 1 ✓ (correct FIFO behavior)

**Algorithm:**

**push(x)** - O(1):
- Simply push to input stack
- No need to touch output stack

**pop()** - Amortized O(1):
- If output stack is empty:
  - Transfer ALL elements from input to output
  - This reverses the order → FIFO
- Pop from output stack

**peek()** - Amortized O(1):
- Same as pop(), but use peek() instead
- If output empty, transfer from input
- Return output.peek()

**empty()** - O(1):
- Queue is empty when BOTH stacks are empty

**Complexity Analysis:**

Time Complexity:
- push(): O(1) - always just one push operation
- pop()/peek(): **Amortized O(1)**
  - Worst case: O(n) when transferring n elements
  - But each element transferred only once in its lifetime
  - Total: n operations over n elements → O(1) amortized
- empty(): O(1)

Space: O(n) - store n elements across two stacks

**Why Amortized O(1)?**
Example: push 1, 2, 3, pop, pop, pop
- push(1): O(1)
- push(2): O(1)
- push(3): O(1)
- pop(): O(3) - transfer all 3 elements, then pop
- pop(): O(1) - output stack already has elements
- pop(): O(1) - output stack already has elements
Total: 3 + 3 + 1 + 1 = 8 operations for 6 calls → constant per operation

**Follow-up: Single Stack Solution**
Use recursion to simulate second stack (trades space for stack frames):
- More elegant but less efficient: O(n) per pop/peek
- Not recommended for production

**Alternative Approaches:**
1. Single stack + recursion: O(n) per pop, cleaner code
2. Array with two pointers: simpler but requires fixed size`,
      pseudocode: `Data Structure:
-----------------------
class MyQueue:
    input: Stack (for push operations)
    output: Stack (for pop/peek operations)

Initialize:
-----------------------
MyQueue():
    input = new Stack()
    output = new Stack()

Push Operation - O(1):
-----------------------
push(x):
    input.push(x)  // Always push to input stack

Pop Operation - Amortized O(1):
-----------------------
pop():
    peek()  // Ensure output has elements
    return output.pop()

Peek Operation - Amortized O(1):
-----------------------
peek():
    if output.isEmpty():
        // Transfer all elements from input to output
        while not input.isEmpty():
            output.push(input.pop())
    return output.peek()

Empty Check - O(1):
-----------------------
empty():
    return input.isEmpty() AND output.isEmpty()

Example Walkthrough:
-----------------------
Initial: input=[], output=[]

push(1):
  input.push(1)
  State: input=[1], output=[]

push(2):
  input.push(2)
  State: input=[1,2], output=[]

push(3):
  input.push(3)
  State: input=[1,2,3], output=[]

peek():
  output is empty, so transfer:
    input.pop() → 3, output.push(3) → output=[3]
    input.pop() → 2, output.push(2) → output=[3,2]
    input.pop() → 1, output.push(1) → output=[3,2,1]
  State: input=[], output=[3,2,1]
  Return output.peek() → 1

pop():
  output not empty
  Return output.pop() → 1
  State: input=[], output=[3,2]

push(4):
  input.push(4)
  State: input=[4], output=[3,2]

pop():
  output not empty
  Return output.pop() → 2
  State: input=[4], output=[3]

pop():
  output not empty
  Return output.pop() → 3
  State: input=[4], output=[]

pop():
  output is empty, so transfer:
    input.pop() → 4, output.push(4) → output=[4]
  State: input=[], output=[]
  Return output.pop() → 4

empty():
  input.isEmpty() AND output.isEmpty() → true

Visual Representation:
-----------------------
Queue operations: push(1), push(2), push(3), pop()

Step 1: push(1,2,3)
  input: [1 2 3]    output: []
         ↑ top

Step 2: pop() needs transfer
  Transfer:
    input: []         output: [3 2 1]
                              ↑ top

Step 3: pop()
  Return 1 (FIFO order!) ✓
  input: []         output: [3 2]
                            ↑ top`,
      examples: [
        { input: 'push(1), push(2), peek(), pop(), empty(), pop(), empty()', output: 'null, null, 1, 1, false, 2, true' }
      ],
      starterCode: `class MyQueue {
    private Stack<Integer> input;
    private Stack<Integer> output;

    public MyQueue() {
        input = new Stack<>();
        output = new Stack<>();
    }

    // Push element to back of queue
    public void push(int x) {
        // TODO: Add element to queue

    }

    // Remove element from front of queue
    public int pop() {
        // TODO: Remove and return front element

        return -1;
    }

    // Get front element
    public int peek() {
        // TODO: Return front element without removing

        return -1;
    }

    // Check if queue is empty
    public boolean empty() {
        // TODO: Check if both stacks are empty

        return false;
    }
}`,
      solution: `class MyQueue {
    private Stack<Integer> input;
    private Stack<Integer> output;

    public MyQueue() {
        input = new Stack<>();
        output = new Stack<>();
    }

    // Push element to back of queue - O(1)
    public void push(int x) {
        input.push(x);
    }

    // Remove element from front of queue - Amortized O(1)
    public int pop() {
        peek(); // Ensure output stack has elements
        return output.pop();
    }

    // Get front element - Amortized O(1)
    public int peek() {
        if (output.isEmpty()) {
            // Transfer all elements from input to output
            while (!input.isEmpty()) {
                output.push(input.pop());
            }
        }
        return output.peek();
    }

    // Check if queue is empty - O(1)
    public boolean empty() {
        return input.isEmpty() && output.isEmpty();
    }

    // Get size
    public int size() {
        return input.size() + output.size();
    }
}

// Alternative: Single stack with recursion
class MyQueueRecursive {
    private Stack<Integer> stack;

    public MyQueueRecursive() {
        stack = new Stack<>();
    }

    public void push(int x) {
        stack.push(x);
    }

    public int pop() {
        if (stack.size() == 1) {
            return stack.pop();
        }

        int temp = stack.pop();
        int result = pop();
        stack.push(temp);
        return result;
    }

    public int peek() {
        if (stack.size() == 1) {
            return stack.peek();
        }

        int temp = stack.pop();
        int result = peek();
        stack.push(temp);
        return result;
    }

    public boolean empty() {
        return stack.isEmpty();
    }
}

// Implement Stack using Queues (reverse problem)
class MyStack {
    private Queue<Integer> queue1;
    private Queue<Integer> queue2;

    public MyStack() {
        queue1 = new LinkedList<>();
        queue2 = new LinkedList<>();
    }

    // Push element to top - O(n)
    public void push(int x) {
        queue2.offer(x);

        // Move all elements from queue1 to queue2
        while (!queue1.isEmpty()) {
            queue2.offer(queue1.poll());
        }

        // Swap queues
        Queue<Integer> temp = queue1;
        queue1 = queue2;
        queue2 = temp;
    }

    // Pop element from top - O(1)
    public int pop() {
        return queue1.poll();
    }

    // Get top element - O(1)
    public int top() {
        return queue1.peek();
    }

    // Check if empty - O(1)
    public boolean empty() {
        return queue1.isEmpty();
    }
}`,
      testCases: [
        { input: 'push(1), push(2), peek(), pop()', output: 'peek: 1, pop: 1' },
        { input: 'push(1), pop(), empty()', output: 'pop: 1, empty: true' },
        { input: 'push(1), push(2), push(3), pop(), pop()', output: 'pop: 1, pop: 2' }
      ]
    },
    {
      id: 2,
      title: 'Circular Queue',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/design-circular-queue/',
      description: 'Design a circular queue (ring buffer) with a fixed size. Support enQueue, deQueue, Front, Rear, isEmpty, and isFull operations. Use an array with front and rear pointers.',
      explanation: `**Problem:** Implement a fixed-size circular queue (also called ring buffer) with efficient O(1) operations.

**Why Circular Queue?**
- Efficient memory utilization: reuse array space after dequeue
- O(1) operations without shifting elements
- Fixed size prevents unbounded growth
- Used in: buffers, producer-consumer systems, streaming data

**Linear vs Circular Queue:**

**Linear Queue Problem:**
After dequeuing, front space is wasted:
  [_,_,3,4,5] after dequeue first 2 elements
  Cannot use freed space without expensive shifting

**Circular Queue Solution:**
Wrap around using modulo operator:
  [4,5,_,_,3] → rear wraps to index 0
  Reuses freed space efficiently!

**Key Insight: Modulo Arithmetic**
Use (index + 1) % capacity to wrap around:
- index 0,1,2,3 with capacity 4
- After index 3: (3 + 1) % 4 = 0 (wraps to start)

**Data Structure:**
- array[capacity]: store elements
- front: index of first element
- rear: index of last element
- size: current number of elements (OR use capacity+1 trick)

**Two Implementation Approaches:**

**Approach 1: Track Size Variable**
Pros: Simpler logic, exact capacity
Cons: Extra variable

Initialize: front=0, rear=-1, size=0

enQueue(x):
  if full: return false
  rear = (rear + 1) % capacity
  array[rear] = x
  size++

deQueue():
  if empty: return false
  front = (front + 1) % capacity
  size--

isEmpty(): size == 0
isFull(): size == capacity

**Approach 2: Sacrifice One Space (No Size Variable)**
Use capacity+1 space, waste one slot to distinguish full/empty

Initialize: front=0, rear=0, capacity=k+1

enQueue(x):
  if (rear + 1) % capacity == front: return false (full)
  array[rear] = x
  rear = (rear + 1) % capacity

deQueue():
  if front == rear: return false (empty)
  front = (front + 1) % capacity

isEmpty(): front == rear
isFull(): (rear + 1) % capacity == front

**Why Sacrifice Space Works:**
- Empty: front == rear
- Full: (rear + 1) % capacity == front
- Without extra space, can't distinguish full from empty when front==rear

**Complexity Analysis:**
- Time: O(1) for all operations (enQueue, deQueue, Front, Rear, isEmpty, isFull)
- Space: O(k) where k is capacity

**Real-World Applications:**
1. CPU scheduling (round-robin)
2. Network packet buffering
3. Keyboard/mouse input buffers
4. Audio/video streaming buffers
5. Producer-consumer queues`,
      pseudocode: `Approach 1: With Size Variable
-----------------------
class MyCircularQueue:
    array[capacity]
    front: int
    rear: int
    size: int
    capacity: int

Initialize(k):
-----------------------
    array = new int[k]
    capacity = k
    front = 0
    rear = -1
    size = 0

enQueue(value):
-----------------------
    if isFull():
        return false

    rear = (rear + 1) % capacity  // Wrap around
    array[rear] = value
    size++
    return true

deQueue():
-----------------------
    if isEmpty():
        return false

    front = (front + 1) % capacity  // Wrap around
    size--
    return true

Front():
-----------------------
    if isEmpty():
        return -1
    return array[front]

Rear():
-----------------------
    if isEmpty():
        return -1
    return array[rear]

isEmpty():
-----------------------
    return size == 0

isFull():
-----------------------
    return size == capacity

Example Walkthrough (capacity = 3):
-----------------------
Initial: array=[_,_,_], front=0, rear=-1, size=0

enQueue(1):
  rear = (−1 + 1) % 3 = 0
  array[0] = 1
  State: [1,_,_], front=0, rear=0, size=1

enQueue(2):
  rear = (0 + 1) % 3 = 1
  array[1] = 2
  State: [1,2,_], front=0, rear=1, size=2

enQueue(3):
  rear = (1 + 1) % 3 = 2
  array[2] = 3
  State: [1,2,3], front=0, rear=2, size=3

isFull(): size == 3 → true

enQueue(4):
  isFull() → return false ✗

deQueue():
  front = (0 + 1) % 3 = 1
  State: [_,2,3], front=1, rear=2, size=2

enQueue(4):
  rear = (2 + 1) % 3 = 0  ← Wraps around!
  array[0] = 4
  State: [4,2,3], front=1, rear=0, size=3

Visual representation:
  Index:  0  1  2
  Array: [4][2][3]
          ↑     ↑
        rear  front
  Order: 2 → 3 → 4 (FIFO)

deQueue():
  front = (1 + 1) % 3 = 2
  State: [4,_,3], front=2, rear=0, size=2

Front(): array[2] = 3
Rear(): array[0] = 4

Approach 2: Without Size (capacity+1 trick):
-----------------------
class MyCircularQueue:
    array[capacity]
    front: int
    rear: int
    capacity: int

Initialize(k):
    array = new int[k + 1]  // Extra space
    capacity = k + 1
    front = 0
    rear = 0

enQueue(value):
    if (rear + 1) % capacity == front:
        return false  // Full

    array[rear] = value
    rear = (rear + 1) % capacity
    return true

deQueue():
    if front == rear:
        return false  // Empty

    front = (front + 1) % capacity
    return true

isEmpty():
    return front == rear

isFull():
    return (rear + 1) % capacity == front`,
      examples: [
        { input: 'MyCircularQueue(3), enQueue(1), enQueue(2), enQueue(3), isFull(), deQueue(), enQueue(4)', output: 'null, true, true, true, true, true, true' }
      ],
      starterCode: `class MyCircularQueue {
    private int[] queue;
    private int front;
    private int rear;
    private int size;
    private int capacity;

    public MyCircularQueue(int k) {
        // TODO: Initialize circular queue

    }

    public boolean enQueue(int value) {
        // TODO: Add element if not full

        return false;
    }

    public boolean deQueue() {
        // TODO: Remove element if not empty

        return false;
    }

    public int Front() {
        // TODO: Get front element

        return -1;
    }

    public int Rear() {
        // TODO: Get rear element

        return -1;
    }

    public boolean isEmpty() {
        // TODO: Check if empty

        return false;
    }

    public boolean isFull() {
        // TODO: Check if full

        return false;
    }
}`,
      solution: `class MyCircularQueue {
    private int[] queue;
    private int front;
    private int rear;
    private int size;
    private int capacity;

    public MyCircularQueue(int k) {
        queue = new int[k];
        capacity = k;
        front = 0;
        rear = -1;
        size = 0;
    }

    public boolean enQueue(int value) {
        if (isFull()) {
            return false;
        }

        rear = (rear + 1) % capacity;
        queue[rear] = value;
        size++;
        return true;
    }

    public boolean deQueue() {
        if (isEmpty()) {
            return false;
        }

        front = (front + 1) % capacity;
        size--;
        return true;
    }

    public int Front() {
        if (isEmpty()) {
            return -1;
        }
        return queue[front];
    }

    public int Rear() {
        if (isEmpty()) {
            return -1;
        }
        return queue[rear];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public boolean isFull() {
        return size == capacity;
    }
}

// Alternative: Without size variable
class MyCircularQueueAlt {
    private int[] queue;
    private int front;
    private int rear;
    private int capacity;

    public MyCircularQueueAlt(int k) {
        queue = new int[k + 1]; // Extra space to distinguish full/empty
        capacity = k + 1;
        front = 0;
        rear = 0;
    }

    public boolean enQueue(int value) {
        if (isFull()) {
            return false;
        }

        queue[rear] = value;
        rear = (rear + 1) % capacity;
        return true;
    }

    public boolean deQueue() {
        if (isEmpty()) {
            return false;
        }

        front = (front + 1) % capacity;
        return true;
    }

    public int Front() {
        if (isEmpty()) {
            return -1;
        }
        return queue[front];
    }

    public int Rear() {
        if (isEmpty()) {
            return -1;
        }
        return queue[(rear - 1 + capacity) % capacity];
    }

    public boolean isEmpty() {
        return front == rear;
    }

    public boolean isFull() {
        return (rear + 1) % capacity == front;
    }
}

// Generic version with resizing
class CircularQueue<T> {
    private Object[] queue;
    private int front;
    private int rear;
    private int size;
    private int capacity;

    public CircularQueue(int k) {
        queue = new Object[k];
        capacity = k;
        front = 0;
        rear = -1;
        size = 0;
    }

    public boolean enQueue(T value) {
        if (isFull()) {
            resize();
        }

        rear = (rear + 1) % capacity;
        queue[rear] = value;
        size++;
        return true;
    }

    public T deQueue() {
        if (isEmpty()) {
            return null;
        }

        @SuppressWarnings("unchecked")
        T value = (T) queue[front];
        front = (front + 1) % capacity;
        size--;
        return value;
    }

    @SuppressWarnings("unchecked")
    public T front() {
        if (isEmpty()) {
            return null;
        }
        return (T) queue[front];
    }

    @SuppressWarnings("unchecked")
    public T rear() {
        if (isEmpty()) {
            return null;
        }
        return (T) queue[rear];
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public boolean isFull() {
        return size == capacity;
    }

    private void resize() {
        int newCapacity = capacity * 2;
        Object[] newQueue = new Object[newCapacity];

        for (int i = 0; i < size; i++) {
            newQueue[i] = queue[(front + i) % capacity];
        }

        queue = newQueue;
        front = 0;
        rear = size - 1;
        capacity = newCapacity;
    }
}`,
      testCases: [
        { input: 'k=3: enQueue(1), enQueue(2), enQueue(3), enQueue(4)', output: 'last enQueue: false' },
        { input: 'k=3: enQueue(1), deQueue(), enQueue(4)', output: 'all succeed' },
        { input: 'k=2: enQueue(1), enQueue(2), deQueue(), deQueue(), isEmpty()', output: 'isEmpty: true' }
      ]
    },
    {
      id: 3,
      title: 'Sliding Window Maximum',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/sliding-window-maximum/',
      description: 'Find the maximum element in each sliding window of size k as it moves through an array. Use a deque to efficiently track potential maximum elements.',
      explanation: `**Problem:** Find the maximum value in each sliding window of size k as it moves through an array from left to right.

**Brute Force:** Check all k elements in each window → O(n*k) time ✗

**Optimal Solution: Monotonic Decreasing Deque** → O(n) time ✓

**Key Insight:**
Use a deque to maintain potential maximum elements in decreasing order:
- Store indices (not values) in deque
- Keep deque in decreasing order of values
- Front of deque always has the maximum for current window

**Why Deque (Double-Ended Queue)?**
Need to:
1. Remove elements from front (when they leave window)
2. Remove elements from back (when new element is larger)
→ Deque supports O(1) operations on both ends!

**Algorithm:**

**Maintain Decreasing Order:**
When adding new element nums[i]:
- Remove all smaller elements from back (they'll never be maximum)
- Add i to back
- Result: deque stores indices in decreasing order of their values

**Remove Out-of-Window Elements:**
- If front index < i - k + 1, remove from front
- Ensures deque only contains indices within current window

**Why This Works:**

Example: [1,3,-1,-3,5,3,6,7], k=3

When we see 3 after 1:
- 1 can NEVER be maximum while 3 is in window (3 > 1)
- Remove 1 from deque → saves unnecessary comparisons

When we see 5:
- 5 > all previous elements (-1, -3)
- Remove all of them → only keep 5

**Complexity:**
- Time: O(n) - each element added/removed from deque at most once
- Space: O(k) - deque stores at most k indices

**Why O(n) not O(n*k)?**
- Each of n elements is pushed once and popped once
- Total operations: 2n → O(n)

**Common Mistakes:**
1. ❌ Storing values instead of indices → can't check if in window
2. ❌ Not removing smaller elements from back → deque grows too large
3. ❌ Checking all deque elements → defeats purpose of O(n)`,
      pseudocode: `Algorithm:
-----------------------
maxSlidingWindow(nums, k):
    if nums is empty: return []

    deque = empty deque  // Stores indices
    result = empty array

    for i from 0 to n-1:
        // Step 1: Remove indices outside window
        while deque not empty AND deque.front() < i - k + 1:
            deque.pollFront()

        // Step 2: Remove smaller elements from back
        // (they can't be maximum while current element exists)
        while deque not empty AND nums[deque.back()] < nums[i]:
            deque.pollBack()

        // Step 3: Add current index
        deque.addBack(i)

        // Step 4: Record maximum (front of deque)
        if i >= k - 1:  // Window is full
            result.add(nums[deque.front()])

    return result

Example Walkthrough:
-----------------------
nums = [1,3,-1,-3,5,3,6,7], k = 3

i=0, nums[0]=1:
  deque: [0]
  window not full yet

i=1, nums[1]=3:
  3 > 1 → remove index 0
  deque: [1]
  window not full yet

i=2, nums[2]=-1:
  -1 < 3 → keep both
  deque: [1,2] (values: [3,-1])
  window full! result = [3]

i=3, nums[3]=-3:
  Remove index 1? (3-3+1=1) No
  -3 < -1 → keep both
  deque: [1,2,3] (values: [3,-1,-3])
  result = [3,3]

i=4, nums[4]=5:
  Remove indices 1,2,3? (4-3+1=2)
    1 < 2 → remove 1
  deque: [2,3]
  5 > -1 → remove 2
  5 > -3 → remove 3
  deque: [4] (values: [5])
  result = [3,3,5]

i=5, nums[5]=3:
  3 < 5 → keep both
  deque: [4,5] (values: [5,3])
  result = [3,3,5,5]

i=6, nums[6]=6:
  Remove index 4? (6-3+1=4) No
  6 > 3 → remove 5
  6 > 5 → remove 4
  deque: [6] (values: [6])
  result = [3,3,5,5,6]

i=7, nums[7]=7:
  Remove index 6? (7-3+1=5) No
  7 > 6 → remove 6
  deque: [7] (values: [7])
  result = [3,3,5,5,6,7]

Final result: [3,3,5,5,6,7] ✓

Visual Representation:
-----------------------
Window [1,3,-1]:
  Deque maintains: 3 > -1 (decreasing)
  Max = 3 (front)

Window [3,-1,-3]:
  Deque maintains: 3 > -1 > -3 (decreasing)
  Max = 3 (front)

Window [-1,-3,5]:
  5 arrives → removes all smaller (-1, -3)
  Deque: [5]
  Max = 5 (front)`,
      examples: [
        { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' }
      ],
      starterCode: `class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        // TODO: Use deque to track window maximums

        return new int[0];
    }
}`,
      solution: `class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || nums.length == 0 || k <= 0) {
            return new int[0];
        }

        int n = nums.length;
        int[] result = new int[n - k + 1];
        Deque<Integer> deque = new ArrayDeque<>(); // Store indices

        for (int i = 0; i < n; i++) {
            // Remove indices outside current window
            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }

            // Remove smaller elements (they won't be max)
            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }

            deque.offerLast(i);

            // Add to result once we have a full window
            if (i >= k - 1) {
                result[i - k + 1] = nums[deque.peekFirst()];
            }
        }

        return result;
    }
}

// Alternative: Using PriorityQueue (less efficient)
class SolutionPriorityQueue {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] result = new int[n - k + 1];

        // Max heap: [value, index]
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> b[0] - a[0]);

        for (int i = 0; i < n; i++) {
            pq.offer(new int[]{nums[i], i});

            // Remove elements outside window
            while (!pq.isEmpty() && pq.peek()[1] <= i - k) {
                pq.poll();
            }

            // Add to result once we have a full window
            if (i >= k - 1) {
                result[i - k + 1] = pq.peek()[0];
            }
        }

        return result;
    }
}

// Brute force approach (O(nk))
class SolutionBruteForce {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] result = new int[n - k + 1];

        for (int i = 0; i <= n - k; i++) {
            int max = nums[i];
            for (int j = i; j < i + k; j++) {
                max = Math.max(max, nums[j]);
            }
            result[i] = max;
        }

        return result;
    }
}

// Similar problem: Sliding Window Minimum
class SlidingWindowMinimum {
    public int[] minSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] result = new int[n - k + 1];
        Deque<Integer> deque = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {
            // Remove indices outside window
            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }

            // Remove larger elements (we want minimum)
            while (!deque.isEmpty() && nums[deque.peekLast()] > nums[i]) {
                deque.pollLast();
            }

            deque.offerLast(i);

            if (i >= k - 1) {
                result[i - k + 1] = nums[deque.peekFirst()];
            }
        }

        return result;
    }
}`,
      testCases: [
        { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' },
        { input: 'nums = [1], k = 1', output: '[1]' },
        { input: 'nums = [1,-1], k = 1', output: '[1,-1]' }
      ]
    },
    {
      id: 4,
      title: 'Design Hit Counter',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/design-hit-counter/',
      description: 'Design a hit counter that counts the number of hits received in the past 5 minutes (300 seconds). Implement hit(timestamp) and getHits(timestamp) methods efficiently.',
      explanation: `**Problem:** Count hits in the past 300 seconds efficiently.

**Operations:**
- hit(timestamp): Record a hit at given time
- getHits(timestamp): Return count of hits in [timestamp - 299, timestamp]

**Challenge:** Handle potentially millions of hits efficiently!

**Approach 1: Queue (Simple)**
Store all hit timestamps in queue:

**hit(timestamp):**
- Add timestamp to queue → O(1)

**getHits(timestamp):**
- Remove timestamps older than (timestamp - 300) from front → O(n) worst case
- Return queue size → O(1)

**Pros:** Simple, handles any traffic pattern
**Cons:** Space O(n) for n total hits, getHits can be O(n)

**Approach 2: Buckets (Optimized)**
Use circular buffer with 300 buckets (one per second):

**Data Structure:**
- times[300]: stores timestamp for each bucket
- hits[300]: stores hit count for each bucket
- Use index = timestamp % 300 to map time to bucket

**Why This Works:**
300-second window → at most 300 different seconds
Map each timestamp to bucket using modulo
Reuse buckets as time advances (circular)

**hit(timestamp):**
  idx = timestamp % 300
  if times[idx] != timestamp:
    // New time period, reset bucket
    times[idx] = timestamp
    hits[idx] = 1
  else:
    // Same second, increment
    hits[idx]++

**getHits(timestamp):**
  total = 0
  for each bucket:
    if timestamp - times[bucket] < 300:
      total += hits[bucket]
  return total

**Complexity:**
- hit(): O(1)
- getHits(): O(300) = O(1) constant time!
- Space: O(300) = O(1) constant space!

**Trade-offs:**

Queue Approach:
+ Simple implementation
+ Exact hit removal
- O(n) space for n hits
- getHits() can be O(n)

Bucket Approach:
+ O(1) space
+ O(1) getHits()
- Iterates 300 buckets every call
- Less intuitive

**When to use each:**
- Low hit rate: Queue (simpler)
- High hit rate: Buckets (better performance)

**Follow-up: Thread Safety**
Add synchronized keyword to methods:
public synchronized void hit(int timestamp)
public synchronized int getHits(int timestamp)

**Real-World Applications:**
1. Rate limiting (API throttling)
2. Traffic analytics (requests per minute)
3. DDoS detection (spike detection)
4. System monitoring (error rate tracking)`,
      pseudocode: `Approach 1: Queue
-----------------------
class HitCounter:
    queue: Queue<Integer>

Initialize:
    queue = new LinkedList()

hit(timestamp):
    queue.offer(timestamp)

getHits(timestamp):
    // Remove expired hits
    while not queue.isEmpty() AND queue.peek() <= timestamp - 300:
        queue.poll()
    return queue.size()

Example Walkthrough (Queue):
-----------------------
hit(1): queue = [1]
hit(2): queue = [1,2]
hit(3): queue = [1,2,3]
getHits(4):
  All within [−296, 4] → return 3

hit(300): queue = [1,2,3,300]
getHits(300):
  All within [1, 300] → return 4

getHits(301):
  Remove 1 (301 - 1 = 300, not within 299)
  queue = [2,3,300]
  return 3

Approach 2: Buckets (Optimized)
-----------------------
class HitCounter:
    times[300]
    hits[300]

Initialize:
    times = new int[300]  // All 0
    hits = new int[300]   // All 0

hit(timestamp):
    idx = timestamp % 300

    if times[idx] != timestamp:
        // Different time period, reset bucket
        times[idx] = timestamp
        hits[idx] = 1
    else:
        // Same second, increment counter
        hits[idx]++

getHits(timestamp):
    total = 0

    for i from 0 to 299:
        // Check if bucket is within 300-second window
        if timestamp - times[i] < 300:
            total += hits[i]

    return total

Example Walkthrough (Buckets):
-----------------------
hit(1):
  idx = 1 % 300 = 1
  times[1] = 1, hits[1] = 1

hit(2):
  idx = 2 % 300 = 2
  times[2] = 2, hits[2] = 1

hit(2):  // Same second
  idx = 2 % 300 = 2
  times[2] == 2 → hits[2]++ → hits[2] = 2

getHits(4):
  Loop through all 300 buckets:
    Bucket 1: 4 - 1 = 3 < 300 → add hits[1] = 1
    Bucket 2: 4 - 2 = 2 < 300 → add hits[2] = 2
    Others: times[i] = 0, skip
  total = 3

hit(301):
  idx = 301 % 300 = 1  ← Reuses bucket 1!
  times[1] != 301 → reset
  times[1] = 301, hits[1] = 1

getHits(301):
  Loop through all 300 buckets:
    Bucket 1: 301 - 301 = 0 < 300 → add 1
    Bucket 2: 301 - 2 = 299 < 300 → add 2
    total = 3

getHits(302):
  Bucket 1: 302 - 301 = 1 < 300 → add 1
  Bucket 2: 302 - 2 = 300 NOT < 300 → skip
  total = 1

Visual Representation (Buckets):
-----------------------
Time window: [t-299, t]

Circular buffer (capacity 300):
Index:  0   1   2  ...  299
Times: [0] [1] [2] ... [0]
Hits:  [0] [1] [2] ... [0]

At timestamp 301:
Index 1 gets reused (301 % 300 = 1)
Old value (timestamp 1) overwritten by 301

Complexity Comparison:
-----------------------
              Queue      Buckets
hit():        O(1)       O(1)
getHits():    O(n)       O(300) = O(1)
Space:        O(n)       O(300) = O(1)`,
      examples: [
        { input: 'hit(1), hit(2), hit(3), getHits(4), hit(300), getHits(300), getHits(301)', output: 'null, null, null, 3, null, 4, 3' }
      ],
      starterCode: `class HitCounter {
    public HitCounter() {
        // TODO: Initialize data structures

    }

    // Record a hit at timestamp
    public void hit(int timestamp) {
        // TODO: Record hit

    }

    // Get number of hits in past 300 seconds
    public int getHits(int timestamp) {
        // TODO: Count valid hits

        return 0;
    }
}`,
      solution: `class HitCounter {
    private Queue<Integer> hits;

    public HitCounter() {
        hits = new LinkedList<>();
    }

    // Record a hit at timestamp - O(1)
    public void hit(int timestamp) {
        hits.offer(timestamp);
    }

    // Get number of hits in past 300 seconds - O(n)
    public int getHits(int timestamp) {
        // Remove expired hits
        while (!hits.isEmpty() && hits.peek() <= timestamp - 300) {
            hits.poll();
        }
        return hits.size();
    }
}

// Optimized: Using buckets for O(1) operations
class HitCounterBuckets {
    private int[] times;
    private int[] hits;

    public HitCounterBuckets() {
        times = new int[300];
        hits = new int[300];
    }

    // Record a hit at timestamp - O(1)
    public void hit(int timestamp) {
        int idx = timestamp % 300;

        if (times[idx] != timestamp) {
            // New time slot, reset
            times[idx] = timestamp;
            hits[idx] = 1;
        } else {
            // Same time slot, increment
            hits[idx]++;
        }
    }

    // Get number of hits in past 300 seconds - O(300) = O(1)
    public int getHits(int timestamp) {
        int total = 0;

        for (int i = 0; i < 300; i++) {
            if (timestamp - times[i] < 300) {
                total += hits[i];
            }
        }

        return total;
    }
}

// Using TreeMap for range queries
class HitCounterTreeMap {
    private TreeMap<Integer, Integer> map;

    public HitCounterTreeMap() {
        map = new TreeMap<>();
    }

    public void hit(int timestamp) {
        map.put(timestamp, map.getOrDefault(timestamp, 0) + 1);
    }

    public int getHits(int timestamp) {
        // Get all entries in range [timestamp - 299, timestamp]
        int total = 0;
        int startTime = timestamp - 299;

        for (Map.Entry<Integer, Integer> entry :
             map.subMap(startTime, true, timestamp, true).entrySet()) {
            total += entry.getValue();
        }

        // Clean up old entries
        map.headMap(startTime, false).clear();

        return total;
    }
}

// Follow-up: Thread-safe version
class HitCounterThreadSafe {
    private Queue<Integer> hits;

    public HitCounterThreadSafe() {
        hits = new LinkedList<>();
    }

    public synchronized void hit(int timestamp) {
        hits.offer(timestamp);
    }

    public synchronized int getHits(int timestamp) {
        while (!hits.isEmpty() && hits.peek() <= timestamp - 300) {
            hits.poll();
        }
        return hits.size();
    }
}

// Follow-up: Handle concurrent hits at same timestamp
class HitCounterWithCount {
    private class Hit {
        int timestamp;
        int count;

        Hit(int t, int c) {
            timestamp = t;
            count = c;
        }
    }

    private Queue<Hit> hits;

    public HitCounterWithCount() {
        hits = new LinkedList<>();
    }

    public void hit(int timestamp) {
        if (!hits.isEmpty() && hits.peek().timestamp == timestamp) {
            hits.peek().count++;
        } else {
            hits.offer(new Hit(timestamp, 1));
        }
    }

    public int getHits(int timestamp) {
        while (!hits.isEmpty() && hits.peek().timestamp <= timestamp - 300) {
            hits.poll();
        }

        int total = 0;
        for (Hit hit : hits) {
            total += hit.count;
        }
        return total;
    }
}`,
      testCases: [
        { input: 'hit(1), hit(2), hit(3), getHits(4)', output: '3' },
        { input: 'hit(1), hit(2), getHits(300), getHits(301)', output: 'getHits(300): 2, getHits(301): 1' },
        { input: 'hit(1), getHits(300), getHits(301)', output: 'getHits(300): 1, getHits(301): 0' }
      ]
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Queues-${q.id}`)).length
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
    const savedDrawing = localStorage.getItem(`drawing-Queues-${question.id}`)
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
    // Create extended breadcrumb stack with problem title
    const problemBreadcrumbStack = breadcrumbStack
      ? [...breadcrumbStack.slice(0, -1), { name: 'Queues', page: null }, { name: selectedQuestion.title, page: null }]
      : null

    // Fallback to legacy format
    const problemBreadcrumb = {
      ...breadcrumb,
      category: { name: 'Queues', onClick: () => setSelectedQuestion(null) },
      topic: selectedQuestion.title
    }

    // Handle breadcrumb click for problem view
    const handleProblemBreadcrumbClick = (index, item) => {
      if (problemBreadcrumbStack && index === problemBreadcrumbStack.length - 2) {
        setSelectedQuestion(null)
      } else if (onBreadcrumbClick) {
        onBreadcrumbClick(index, item)
      }
    }

    return (
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            ← Back to Queues
          </button>
          <LanguageToggle />
        </div>

        <Breadcrumb
          breadcrumb={problemBreadcrumb}
          breadcrumbStack={problemBreadcrumbStack}
          onBreadcrumbClick={handleProblemBreadcrumbClick}
          colors={breadcrumbColors}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Problem Description */}
          <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', border: '2px solid #3b82f6', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#93c5fd', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <CompletionCheckbox problemId={`Queues-${selectedQuestion.id}`} />
              <BookmarkButton problemId={`Queues-${selectedQuestion.id}`} problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'Queues' }} />
            </div>

            {selectedQuestion.leetcodeUrl && (
              <a href={selectedQuestion.leetcodeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
                View on LeetCode ↗
              </a>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#93c5fd', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#93c5fd', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ backgroundColor: '#374151', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #4b5563', color: '#e2e8f0' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#e2e8f0' }}>Input:</strong> <code style={{ color: '#e2e8f0' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: '#e2e8f0' }}>Output:</strong> <code style={{ color: '#e2e8f0' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#93c5fd', marginBottom: '0.75rem' }}>Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#374151', borderRadius: '8px', border: '1px solid #4b5563' }}>
                <h3 style={{ fontSize: '1rem', color: '#93c5fd', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Space: {selectedQuestion.spaceComplexity}</div>}
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
                {currentDrawing ? 'View' : 'Draw'} Sketch
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5', backgroundColor: '#1e293b', color: '#e2e8f0' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#93c5fd', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#374151', padding: '1rem', borderRadius: '8px', border: '1px solid #4b5563', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px', color: '#e2e8f0' }}>{output}</pre>
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
            const savedDrawing = localStorage.getItem(`drawing-Queues-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`Queues-${selectedQuestion.id}`}
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

      <Breadcrumb
        breadcrumb={breadcrumb}
        breadcrumbStack={breadcrumbStack}
        onBreadcrumbClick={onBreadcrumbClick}
        colors={breadcrumbColors}
      />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, #93c5fd, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>Queues</h1>
        <p style={{ fontSize: '1.2rem', color: '#d1d5db' }}>Master queues problems</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '2px solid #3b82f6' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '2px solid #10b981' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: '#1f2937', border: '2px solid #374151', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
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
                        backgroundColor: '#1f2937',
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
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#93c5fd', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#d1d5db', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                        <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ transform: 'scale(0.85)' }}>
                            <CompletionCheckbox problemId={`Queues-${question.id}`} />
                          </div>
                          <BookmarkButton size="small" problemId={`Queues-${question.id}`} problemData={{ title: question.title, difficulty: question.difficulty, category: 'Queues' }} />
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

export default Queues
