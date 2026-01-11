import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function LinkedLists({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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
      title: 'Reverse Linked List',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
      description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
      explanation: `**Problem:** Reverse a singly linked list in-place.

**Key Insight: Iterative Pointer Reversal**
Traverse once, reversing pointers as you go.

**Why Iterative?**
- O(1) space vs O(n) recursive stack
- Simple three-pointer technique
- Reverse direction of each link one by one

**Algorithm:**
1. Three pointers: prev, current, next
2. Initialize: prev=null, current=head
3. While current exists:
   - Save next node (before breaking link)
   - Reverse link: current.next = prev
   - Move pointers forward: prev=current, current=next
4. Return prev (new head)

**Example: 1→2→3→null**
Initial: prev=null, curr=1→2→3

Step 1: next=2, 1→null, prev=1, curr=2
Step 2: next=3, 2→1→null, prev=2, curr=3
Step 3: next=null, 3→2→1→null, prev=3, curr=null

Result: 3→2→1→null

**Complexity:**
- Time: O(n) - single pass
- Space: O(1) - only pointers

**Recursive Approach:**
More elegant but O(n) space for call stack.`,
      pseudocode: `Iterative Approach:
-----------------------
reverseList(head):
    prev = null
    current = head

    while current != null:
        next = current.next    // Save next
        current.next = prev    // Reverse link
        prev = current         // Move prev
        current = next         // Move current

    return prev  // New head

Visual Example: 1→2→3→null
-----------------------
Initial:
  prev=null, curr=1→2→3

Iteration 1:
  next=2
  1.next=null → 1→null
  prev=1, curr=2→3

Iteration 2:
  next=3
  2.next=1 → 2→1→null
  prev=2, curr=3

Iteration 3:
  next=null
  3.next=2 → 3→2→1→null
  prev=3, curr=null

Return prev=3 (new head)

Recursive Approach:
-----------------------
reverseList(head):
    if head == null OR head.next == null:
        return head

    // Recursively reverse rest
    reversed = reverseList(head.next)

    // Reverse current link
    head.next.next = head
    head.next = null

    return reversed`,
      code: {
        java: {
          starterCode: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

public ListNode reverseList(ListNode head) {
    // Write your code here

}`,
          solution: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

// Approach 1: Iterative - O(n) time, O(1) space
public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode current = head;

    while (current != null) {
        ListNode next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    return prev;
}

// Approach 2: Recursive - O(n) time, O(n) space
public ListNode reverseList(ListNode head) {
    if (head == null || head.next == null) {
        return head;
    }

    ListNode reversed = reverseList(head.next);
    head.next.next = head;
    head.next = null;

    return reversed;
}`
        },
        python: {
          starterCode: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
    # Write your code here
    pass`,
          solution: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

# Approach 1: Iterative - O(n) time, O(1) space
def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
    prev = None
    current = head

    while current:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node

    return prev

# Approach 2: Recursive - O(n) time, O(n) space
def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
    if not head or not head.next:
        return head

    reversed_list = self.reverseList(head.next)
    head.next.next = head
    head.next = None

    return reversed_list`
        }
      },
      testCases: [
        { input: '[1,2,3,4,5]', expected: '[5,4,3,2,1]' },
        { input: '[1,2]', expected: '[2,1]' },
        { input: '[]', expected: '[]' }
      ],
      examples: [
        { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]' },
        { input: 'head = [1,2]', output: '[2,1]' },
        { input: 'head = []', output: '[]' }
      ]
    },
    {
      id: 2,
      title: 'Add Two Numbers',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/add-two-numbers/',
      description: 'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.',
      explanation: `**Problem:** Add two numbers represented as reversed linked lists.

**Key Insight: Simulate Elementary Addition**
Just like adding on paper, process digit by digit with carry!

**Why Reversed Order Helps:**
Least significant digit first → perfect for addition with carry!
Example: 342 + 465 = 807
Lists: [2,4,3] + [5,6,4] = [7,0,8]

**Algorithm:**
1. Use dummy node to simplify result building
2. Track carry (0 or 1)
3. While lists exist OR carry exists:
   - Sum = carry + l1.val + l2.val
   - New digit = sum % 10
   - New carry = sum / 10
   - Advance pointers

**Example: [2,4,3] + [5,6,4]**
Step 1: 2+5=7, carry=0 → [7]
Step 2: 4+6=10, carry=1 → [7,0]
Step 3: 3+4+1=8, carry=0 → [7,0,8]

**Edge Cases:**
- Different lengths: [9,9] + [1] = [0,0,1]
- Final carry: [5] + [5] = [0,1]

**Complexity:**
- Time: O(max(m,n))
- Space: O(max(m,n))`,
      pseudocode: `Algorithm:
-----------------------
addTwoNumbers(l1, l2):
    dummy = new ListNode(0)
    current = dummy
    carry = 0

    while l1 != null OR l2 != null OR carry != 0:
        sum = carry

        if l1 != null:
            sum += l1.val
            l1 = l1.next

        if l2 != null:
            sum += l2.val
            l2 = l2.next

        carry = sum / 10
        current.next = new ListNode(sum % 10)
        current = current.next

    return dummy.next

Example: [2,4,3] + [5,6,4]
-----------------------
Represents: 342 + 465 = 807

Step 1: 2+5+0=7, carry=0
  Result: [7]

Step 2: 4+6+0=10, carry=1
  Result: [7,0]

Step 3: 3+4+1=8, carry=0
  Result: [7,0,8]

Final: [7,0,8] = 807 ✓`,
      code: {
        java: {
          starterCode: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    // Write your code here

}`,
          solution: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

// Approach: Simulate addition - O(max(m,n)) time, O(max(m,n)) space
public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode current = dummy;
    int carry = 0;

    while (l1 != null || l2 != null || carry != 0) {
        int sum = carry;

        if (l1 != null) {
            sum += l1.val;
            l1 = l1.next;
        }

        if (l2 != null) {
            sum += l2.val;
            l2 = l2.next;
        }

        carry = sum / 10;
        current.next = new ListNode(sum % 10);
        current = current.next;
    }

    return dummy.next;
}`
        },
        python: {
          starterCode: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
    # Write your code here
    pass`,
          solution: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

# Approach: Simulate addition - O(max(m,n)) time, O(max(m,n)) space
def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
    dummy = ListNode(0)
    current = dummy
    carry = 0

    while l1 or l2 or carry:
        total = carry

        if l1:
            total += l1.val
            l1 = l1.next

        if l2:
            total += l2.val
            l2 = l2.next

        carry = total // 10
        current.next = ListNode(total % 10)
        current = current.next

    return dummy.next`
        }
      },
      testCases: [
        { l1: '[2,4,3]', l2: '[5,6,4]', expected: '[7,0,8]' },
        { l1: '[0]', l2: '[0]', expected: '[0]' },
        { l1: '[9,9,9,9,9,9,9]', l2: '[9,9,9,9]', expected: '[8,9,9,9,0,0,0,1]' }
      ],
      examples: [
        { input: 'l1 = [2,4,3], l2 = [5,6,4]', output: '[7,0,8]', explanation: '342 + 465 = 807' },
        { input: 'l1 = [0], l2 = [0]', output: '[0]' },
        { input: 'l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]', output: '[8,9,9,9,0,0,0,1]' }
      ]
    },
    {
      id: 3,
      title: 'Remove Nth Node From End',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
      description: 'Given the head of a linked list, remove the nth node from the end of the list and return its head.',
      explanation: `**Problem:** Remove nth node from end in ONE pass.

**Key Insight: Two Pointers with Gap**
Create n-node gap between fast and slow pointers!

**Why This Works:**
When fast reaches end, slow is exactly n nodes before end!

**Algorithm:**
1. Use dummy node (handles edge case: removing head)
2. Fast pointer: move n+1 steps ahead
3. Move both until fast reaches end
4. slow.next = slow.next.next (remove node)

**Example: Remove 2nd from end in [1,2,3,4,5]**
Dummy→1→2→3→4→5→null

Step 1: Fast moves n+1=3 steps
  Slow: Dummy, Fast: 3

Step 2: Move both until fast=null
  Slow: 3, Fast: null

Step 3: slow.next = 5
  Result: 1→2→3→5

**Why n+1 Steps?**
Need slow to stop BEFORE the node to delete!

**Complexity:**
- Time: O(n) - one pass
- Space: O(1)`,
      pseudocode: `Algorithm:
-----------------------
removeNthFromEnd(head, n):
    dummy = new ListNode(0)
    dummy.next = head
    fast = dummy
    slow = dummy

    // Move fast n+1 steps ahead
    for i from 0 to n:
        fast = fast.next

    // Move both until fast reaches end
    while fast != null:
        fast = fast.next
        slow = slow.next

    // Remove node
    slow.next = slow.next.next

    return dummy.next

Example: [1,2,3,4,5], n=2
-----------------------
Remove 4 (2nd from end)

Initial: D→1→2→3→4→5→null
         ↑
      slow,fast

After n+1 steps:
  D→1→2→3→4→5→null
  ↑     ↑
slow   fast

Move both:
  D→1→2→3→4→5→null
        ↑       ↑
      slow    fast(null)

Remove: slow.next = 5
Result: [1,2,3,5]`,
      code: {
        java: {
          starterCode: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

public ListNode removeNthFromEnd(ListNode head, int n) {
    // Write your code here

}`,
          solution: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

// Approach: Two Pointers - O(n) time, O(1) space
public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode fast = dummy;
    ListNode slow = dummy;

    // Move fast n+1 steps ahead
    for (int i = 0; i <= n; i++) {
        fast = fast.next;
    }

    // Move both pointers until fast reaches end
    while (fast != null) {
        fast = fast.next;
        slow = slow.next;
    }

    // Remove the node
    slow.next = slow.next.next;

    return dummy.next;
}`
        },
        python: {
          starterCode: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
    # Write your code here
    pass`,
          solution: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

# Approach: Two Pointers - O(n) time, O(1) space
def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
    dummy = ListNode(0)
    dummy.next = head
    fast = dummy
    slow = dummy

    # Move fast n+1 steps ahead
    for _ in range(n + 1):
        fast = fast.next

    # Move both pointers until fast reaches end
    while fast:
        fast = fast.next
        slow = slow.next

    # Remove the node
    slow.next = slow.next.next

    return dummy.next`
        }
      },
      testCases: [
        { head: '[1,2,3,4,5]', n: 2, expected: '[1,2,3,5]' },
        { head: '[1]', n: 1, expected: '[]' },
        { head: '[1,2]', n: 1, expected: '[1]' }
      ],
      examples: [
        { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]' },
        { input: 'head = [1], n = 1', output: '[]' },
        { input: 'head = [1,2], n = 1', output: '[1]' }
      ]
    },
    {
      id: 4,
      title: 'Linked List Cycle',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/',
      description: 'Given head, the head of a linked list, determine if the linked list has a cycle in it. Return true if there is a cycle, otherwise return false.',
      explanation: `**Problem:** Detect if linked list has a cycle.

**Key Insight: Floyd's Cycle Detection (Tortoise & Hare)**
Two pointers at different speeds will meet if there's a cycle!

**Why It Works:**
Think of a circular race track:
- Slow runner: 1 step/turn
- Fast runner: 2 steps/turn
- If track is circular, fast will eventually lap slow!

**Algorithm:**
1. Slow pointer: moves 1 step
2. Fast pointer: moves 2 steps
3. If they meet → cycle exists
4. If fast reaches null → no cycle

**Why They Must Meet?**
Once both in cycle:
- Gap decreases by 1 each step
- Eventually gap = 0 → they meet!

**Example with Cycle:**
1→2→3→4→5
      ↑___↓

Slow: 1→2→3→4→5→3...
Fast: 1→3→5→4→3...
They meet at node 3!

**Complexity:**
- Time: O(n)
- Space: O(1)

**Alternative:** HashSet O(n) space`,
      pseudocode: `Floyd's Algorithm:
-----------------------
hasCycle(head):
    if head == null OR head.next == null:
        return false

    slow = head
    fast = head.next

    while slow != fast:
        if fast == null OR fast.next == null:
            return false
        slow = slow.next
        fast = fast.next.next

    return true

Why It Works:
-----------------------
No cycle:
  Fast reaches end → false

With cycle:
  Both enter cycle eventually
  Fast catches up to slow
  Gap reduces by 1 each iteration
  Eventually meet → true

Example:
-----------------------
List: 1→2→3→4→5→3 (cycle)

Step 1: slow=1, fast=2
Step 2: slow=2, fast=4
Step 3: slow=3, fast=3 ✓ MEET!`,
      code: {
        java: {
          starterCode: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

public boolean hasCycle(ListNode head) {
    // Write your code here

}`,
          solution: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

// Approach: Floyd's Cycle Detection (Tortoise and Hare) - O(n) time, O(1) space
public boolean hasCycle(ListNode head) {
    if (head == null || head.next == null) {
        return false;
    }

    ListNode slow = head;
    ListNode fast = head.next;

    while (slow != fast) {
        if (fast == null || fast.next == null) {
            return false;
        }
        slow = slow.next;
        fast = fast.next.next;
    }

    return true;
}

// Alternative: HashSet approach - O(n) time, O(n) space
public boolean hasCycle(ListNode head) {
    Set<ListNode> seen = new HashSet<>();

    while (head != null) {
        if (seen.contains(head)) {
            return true;
        }
        seen.add(head);
        head = head.next;
    }

    return false;
}`
        },
        python: {
          starterCode: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def hasCycle(self, head: Optional[ListNode]) -> bool:
    # Write your code here
    pass`,
          solution: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

# Approach: Floyd's Cycle Detection (Tortoise and Hare) - O(n) time, O(1) space
def hasCycle(self, head: Optional[ListNode]) -> bool:
    if not head or not head.next:
        return False

    slow = head
    fast = head.next

    while slow != fast:
        if not fast or not fast.next:
            return False
        slow = slow.next
        fast = fast.next.next

    return True

# Alternative: HashSet approach - O(n) time, O(n) space
def hasCycle(self, head: Optional[ListNode]) -> bool:
    seen = set()

    while head:
        if head in seen:
            return True
        seen.add(head)
        head = head.next

    return False`
        }
      },
      testCases: [
        { description: 'Cycle at position 1', expected: true },
        { description: 'Cycle at position 0', expected: true },
        { description: 'No cycle', expected: false }
      ],
      examples: [
        { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).' },
        { input: 'head = [1,2], pos = 0', output: 'true' },
        { input: 'head = [1], pos = -1', output: 'false' }
      ]
    },
    {
      id: 5,
      title: 'Merge Two Sorted Lists',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/',
      description: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.',
      explanation: `**Problem:** Merge two sorted linked lists into one sorted list.

**Key Insight: Like Merging Sorted Arrays**
Compare heads, take smaller, advance that pointer!

**Algorithm:**
1. Use dummy node to simplify result building
2. Compare list1.val vs list2.val
3. Attach smaller node to result
4. Advance pointer of list with smaller value
5. When one list exhausted, attach remaining list

**Example: [1,2,4] + [1,3,4]**
Compare 1 vs 1: take list1[1]
Compare 2 vs 1: take list2[1]
Compare 2 vs 3: take list1[2]
Compare 4 vs 3: take list2[3]
Compare 4 vs 4: take list1[4]
Attach list2[4]
Result: [1,1,2,3,4,4]

**Why Dummy Node?**
Avoids special case for empty result!

**Complexity:**
- Time: O(m+n)
- Space: O(1) iterative, O(m+n) recursive

**Recursive Approach:**
More elegant, picks smaller and recurses!`,
      pseudocode: `Iterative:
-----------------------
mergeTwoLists(list1, list2):
    dummy = new ListNode(0)
    current = dummy

    while list1 != null AND list2 != null:
        if list1.val <= list2.val:
            current.next = list1
            list1 = list1.next
        else:
            current.next = list2
            list2 = list2.next
        current = current.next

    // Attach remaining
    current.next = list1 if list1 else list2

    return dummy.next

Recursive:
-----------------------
mergeTwoLists(list1, list2):
    if list1 == null: return list2
    if list2 == null: return list1

    if list1.val <= list2.val:
        list1.next = mergeTwoLists(list1.next, list2)
        return list1
    else:
        list2.next = mergeTwoLists(list1, list2.next)
        return list2

Example: [1,2,4] + [1,3,4]
-----------------------
Step 1: 1≤1, take list1[1]
  Result: 1→...

Step 2: 2>1, take list2[1]
  Result: 1→1→...

Step 3: 2≤3, take list1[2]
  Result: 1→1→2→...

Step 4: 4>3, take list2[3]
  Result: 1→1→2→3→...

Step 5: 4≤4, take list1[4]
  Result: 1→1→2→3→4→...

Step 6: Attach list2[4]
  Result: 1→1→2→3→4→4`,
      code: {
        java: {
          starterCode: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    // Write your code here

}`,
          solution: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

// Approach 1: Iterative - O(m+n) time, O(1) space
public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    ListNode dummy = new ListNode(0);
    ListNode current = dummy;

    while (list1 != null && list2 != null) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    current.next = (list1 != null) ? list1 : list2;

    return dummy.next;
}

// Approach 2: Recursive - O(m+n) time, O(m+n) space
public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
    if (list1 == null) return list2;
    if (list2 == null) return list1;

    if (list1.val <= list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
}`
        },
        python: {
          starterCode: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    # Write your code here
    pass`,
          solution: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

# Approach 1: Iterative - O(m+n) time, O(1) space
def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    dummy = ListNode(0)
    current = dummy

    while list1 and list2:
        if list1.val <= list2.val:
            current.next = list1
            list1 = list1.next
        else:
            current.next = list2
            list2 = list2.next
        current = current.next

    current.next = list1 if list1 else list2

    return dummy.next

# Approach 2: Recursive - O(m+n) time, O(m+n) space
def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    if not list1:
        return list2
    if not list2:
        return list1

    if list1.val <= list2.val:
        list1.next = self.mergeTwoLists(list1.next, list2)
        return list1
    else:
        list2.next = self.mergeTwoLists(list1, list2.next)
        return list2`
        }
      },
      testCases: [
        { list1: '[1,2,4]', list2: '[1,3,4]', expected: '[1,1,2,3,4,4]' },
        { list1: '[]', list2: '[]', expected: '[]' },
        { list1: '[]', list2: '[0]', expected: '[0]' }
      ],
      examples: [
        { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
        { input: 'list1 = [], list2 = []', output: '[]' },
        { input: 'list1 = [], list2 = [0]', output: '[0]' }
      ]
    },
    {
      id: 6,
      title: 'Copy List with Random Pointer',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/copy-list-with-random-pointer/',
      description: 'A linked list is given such that each node contains an additional random pointer which could point to any node in the list or null. Return a deep copy of the list.',
      explanation: `**Problem:** Deep copy a linked list with random pointers.

**Key Insight: Two Approaches**
1. HashMap: Map original → copy
2. Interweaving: Weave copies between originals

**Approach 1: HashMap (Cleaner)**
Store mapping of original nodes to copied nodes!

**Algorithm:**
1. First pass: Create all nodes, map original → copy
2. Second pass: Set next and random using map
3. Return copied head

**Example:**
Original: 1→2→3 (with random pointers)
HashMap: {1:1', 2:2', 3:3'}
Copy: 1'→2'→3' (with random pointers)

**Approach 2: Interweaving (O(1) space)**
More clever but complex!

**Algorithm:**
1. Interweave: 1→1'→2→2'→3→3'
2. Set random: node.next.random = node.random.next
3. Separate lists: restore original, return copy

**Why Interweaving Works:**
Original node's copy is always node.next!
node.random.next is the copy of node.random!

**Complexity:**
- HashMap: O(n) time, O(n) space
- Interweaving: O(n) time, O(1) space

**Most interviews accept HashMap approach!**`,
      pseudocode: `HashMap Approach:
-----------------------
copyRandomList(head):
    if head == null: return null

    // First pass: create all nodes
    map = new HashMap()
    current = head
    while current != null:
        map[current] = new Node(current.val)
        current = current.next

    // Second pass: connect pointers
    current = head
    while current != null:
        map[current].next = map[current.next]
        map[current].random = map[current.random]
        current = current.next

    return map[head]

Interweaving Approach:
-----------------------
copyRandomList(head):
    if head == null: return null

    // Step 1: Interweave nodes
    current = head
    while current != null:
        copy = new Node(current.val)
        copy.next = current.next
        current.next = copy
        current = copy.next

    // Step 2: Set random pointers
    current = head
    while current != null:
        if current.random != null:
            current.next.random = current.random.next
        current = current.next.next

    // Step 3: Separate lists
    dummy = new Node(0)
    copyCurrent = dummy
    current = head
    while current != null:
        copy = current.next
        current.next = copy.next
        copyCurrent.next = copy
        copyCurrent = copy
        current = current.next

    return dummy.next

Visual Example (Interweaving):
-----------------------
Original: 1→2→3

After interweaving:
1→1'→2→2'→3→3'→null

Random pointers:
If 1.random = 3:
  1'.random = 1.random.next = 3'

Separate:
Original: 1→2→3
Copy: 1'→2'→3'`,
      code: {
        java: {
          starterCode: `// class Node {
//     int val;
//     Node next;
//     Node random;
//     Node(int val) { this.val = val; }
// }

public Node copyRandomList(Node head) {
    // Write your code here

}`,
          solution: `// class Node {
//     int val;
//     Node next;
//     Node random;
//     Node(int val) { this.val = val; }
// }

// Approach 1: HashMap - O(n) time, O(n) space
public Node copyRandomList(Node head) {
    if (head == null) return null;

    // First pass: create all nodes and map them
    Map<Node, Node> map = new HashMap<>();
    Node current = head;
    while (current != null) {
        map.put(current, new Node(current.val));
        current = current.next;
    }

    // Second pass: connect next and random pointers
    current = head;
    while (current != null) {
        map.get(current).next = map.get(current.next);
        map.get(current).random = map.get(current.random);
        current = current.next;
    }

    return map.get(head);
}

// Approach 2: Interweaving - O(n) time, O(1) space
public Node copyRandomList(Node head) {
    if (head == null) return null;

    // Step 1: Create interweaved list (A→A'→B→B'→C→C')
    Node current = head;
    while (current != null) {
        Node copy = new Node(current.val);
        copy.next = current.next;
        current.next = copy;
        current = copy.next;
    }

    // Step 2: Set random pointers for copied nodes
    current = head;
    while (current != null) {
        if (current.random != null) {
            current.next.random = current.random.next;
        }
        current = current.next.next;
    }

    // Step 3: Separate the two lists
    Node dummy = new Node(0);
    Node copyCurrent = dummy;
    current = head;
    while (current != null) {
        Node copy = current.next;
        current.next = copy.next;
        copyCurrent.next = copy;
        copyCurrent = copy;
        current = current.next;
    }

    return dummy.next;
}`
        },
        python: {
          starterCode: `# class Node:
#     def __init__(self, val=0, next=None, random=None):
#         self.val = val
#         self.next = next
#         self.random = random

def copyRandomList(self, head: Optional[Node]) -> Optional[Node]:
    # Write your code here
    pass`,
          solution: `# class Node:
#     def __init__(self, val=0, next=None, random=None):
#         self.val = val
#         self.next = next
#         self.random = random

# Approach 1: HashMap - O(n) time, O(n) space
def copyRandomList(self, head: Optional[Node]) -> Optional[Node]:
    if not head:
        return None

    # First pass: create all nodes and map them
    old_to_new = {}
    current = head
    while current:
        old_to_new[current] = Node(current.val)
        current = current.next

    # Second pass: connect next and random pointers
    current = head
    while current:
        if current.next:
            old_to_new[current].next = old_to_new[current.next]
        if current.random:
            old_to_new[current].random = old_to_new[current.random]
        current = current.next

    return old_to_new[head]

# Approach 2: Interweaving - O(n) time, O(1) space
def copyRandomList(self, head: Optional[Node]) -> Optional[Node]:
    if not head:
        return None

    # Step 1: Create interweaved list
    current = head
    while current:
        copy = Node(current.val)
        copy.next = current.next
        current.next = copy
        current = copy.next

    # Step 2: Set random pointers
    current = head
    while current:
        if current.random:
            current.next.random = current.random.next
        current = current.next.next

    # Step 3: Separate lists
    dummy = Node(0)
    copy_current = dummy
    current = head
    while current:
        copy = current.next
        current.next = copy.next
        copy_current.next = copy
        copy_current = copy
        current = current.next

    return dummy.next`
        }
      },
      testCases: [
        { description: 'List with random pointers', expected: 'Deep copy with all pointers' },
        { description: 'Empty list', expected: 'null' },
        { description: 'Single node', expected: 'Single node copy' }
      ],
      examples: [
        { input: 'head = [[7,null],[13,0],[11,4],[10,2],[1,0]]', output: '[[7,null],[13,0],[11,4],[10,2],[1,0]]' },
        { input: 'head = [[1,1],[2,1]]', output: '[[1,1],[2,1]]' },
        { input: 'head = [[3,null],[3,0],[3,null]]', output: '[[3,null],[3,0],[3,null]]' }
      ]
    },
    {
      id: 7,
      title: 'Reverse Linked List II',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list-ii/',
      description: 'Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.',
      explanation: `**Problem:** Reverse only a portion of linked list (positions left to right).

**Key Insight: Partial Reversal with Reconnection**
Need to track 4 key nodes for reconnection!

**Critical Nodes:**
1. beforeLeft: node before reversal starts
2. leftNode: first node to reverse
3. rightNode: last node to reverse
4. afterRight: node after reversal ends

**Algorithm:**
1. Find position left (track beforeLeft)
2. Reverse from left to right
3. Reconnect: beforeLeft → rightNode
4. Reconnect: leftNode → afterRight

**Example: Reverse positions 2-4 in [1,2,3,4,5]**
Original: 1→2→3→4→5

beforeLeft=1, leftNode=2, rightNode=4, afterRight=5

Reverse 2→3→4 to 4→3→2:
  1→4→3→2→5

**Why Dummy Node?**
Handles edge case when left=1 (reversing from head)!

**Visual Steps:**
Original: 1→2→3→4→5 (reverse 2-4)

Step 1: beforeLeft=1, start reversing
Step 2: Reverse links: 2←3←4
Step 3: Connect: 1→4, 2→5
Result: 1→4→3→2→5

**Complexity:**
- Time: O(n)
- Space: O(1)`,
      pseudocode: `Algorithm:
-----------------------
reverseBetween(head, left, right):
    dummy = new ListNode(0)
    dummy.next = head
    beforeLeft = dummy

    // Move to position before left
    for i from 1 to left-1:
        beforeLeft = beforeLeft.next

    // Start of reversal
    current = beforeLeft.next

    // Reverse from left to right
    prev = null
    for i from 0 to (right-left):
        next = current.next
        current.next = prev
        prev = current
        current = next

    // Reconnect
    beforeLeft.next.next = current  // leftNode → afterRight
    beforeLeft.next = prev          // beforeLeft → rightNode

    return dummy.next

Visual Example: [1,2,3,4,5], left=2, right=4
-----------------------
Initial: D→1→2→3→4→5

Find beforeLeft (position 1):
  D→1→2→3→4→5
     ↑
  beforeLeft

Reverse 2→3→4:
Before: 2→3→4→5
After:  4→3→2  5
        ↑     ↑
     rightNode afterRight

Reconnect:
1. beforeLeft.next.next = afterRight
   2→5
2. beforeLeft.next = rightNode
   1→4

Result: D→1→4→3→2→5`,
      code: {
        java: {
          starterCode: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

public ListNode reverseBetween(ListNode head, int left, int right) {
    // Write your code here

}`,
          solution: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

// Approach: One-pass reversal - O(n) time, O(1) space
public ListNode reverseBetween(ListNode head, int left, int right) {
    if (head == null || left == right) return head;

    // Use dummy to handle edge case where left = 1
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode beforeLeft = dummy;

    // Move to node before left position
    for (int i = 1; i < left; i++) {
        beforeLeft = beforeLeft.next;
    }

    // Start reversing from left position
    ListNode current = beforeLeft.next;
    ListNode prev = null;

    // Reverse nodes from left to right
    for (int i = 0; i <= right - left; i++) {
        ListNode next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    // Reconnect the reversed portion
    // beforeLeft.next is leftNode (now tail of reversed portion)
    beforeLeft.next.next = current;  // Connect to afterRight
    beforeLeft.next = prev;          // Connect to rightNode (new head of reversed)

    return dummy.next;
}`
        },
        python: {
          starterCode: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
    # Write your code here
    pass`,
          solution: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

# Approach: One-pass reversal - O(n) time, O(1) space
def reverseBetween(self, head: Optional[ListNode], left: int, right: int) -> Optional[ListNode]:
    if not head or left == right:
        return head

    # Use dummy to handle edge case where left = 1
    dummy = ListNode(0)
    dummy.next = head
    before_left = dummy

    # Move to node before left position
    for _ in range(left - 1):
        before_left = before_left.next

    # Start reversing from left position
    current = before_left.next
    prev = None

    # Reverse nodes from left to right
    for _ in range(right - left + 1):
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node

    # Reconnect the reversed portion
    before_left.next.next = current  # leftNode → afterRight
    before_left.next = prev          # beforeLeft → rightNode

    return dummy.next`
        }
      },
      testCases: [
        { input: 'head = [1,2,3,4,5], left = 2, right = 4', expected: '[1,4,3,2,5]' },
        { input: 'head = [5], left = 1, right = 1', expected: '[5]' },
        { input: 'head = [3,5], left = 1, right = 2', expected: '[5,3]' }
      ],
      examples: [
        { input: 'head = [1,2,3,4,5], left = 2, right = 4', output: '[1,4,3,2,5]' },
        { input: 'head = [5], left = 1, right = 1', output: '[5]' }
      ]
    },
    {
      id: 8,
      title: 'Reverse Nodes in k-Group',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/reverse-nodes-in-k-group/',
      description: 'Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as is.',
      explanation: `**Problem:** Reverse every k nodes in groups. Leave remainder unchanged.

**Key Insight: Reverse in Chunks**
Process the list in groups of k nodes!

**Algorithm:**
1. Count if we have k nodes ahead
2. If yes: reverse those k nodes
3. Connect reversed group to previous
4. Move to next group
5. If no: leave remaining nodes as is

**Critical Steps:**
1. Check if k nodes exist (avoid reversing incomplete group)
2. Reverse exactly k nodes
3. Track connections between groups

**Example: k=3 in [1,2,3,4,5]**
Group 1: Reverse 1,2,3 → 3,2,1
Group 2: Only 2 nodes (4,5) → Keep as is
Result: 3→2→1→4→5

**Why Hard?**
- Multiple reversals with reconnections
- Edge cases: k=1, k>length, incomplete groups
- Tracking prev group's tail for connection

**Two Approaches:**
1. Iterative: More complex but O(1) space
2. Recursive: Cleaner but O(n/k) space

**Complexity:**
- Time: O(n)
- Space: O(1) iterative, O(n/k) recursive`,
      pseudocode: `Iterative Approach:
-----------------------
reverseKGroup(head, k):
    dummy = new ListNode(0)
    dummy.next = head
    groupPrev = dummy

    while true:
        // Check if k nodes exist
        kth = getKth(groupPrev, k)
        if kth == null: break

        groupNext = kth.next

        // Reverse k nodes
        prev = kth.next
        current = groupPrev.next

        while current != groupNext:
            next = current.next
            current.next = prev
            prev = current
            current = next

        // Connect reversed group
        temp = groupPrev.next  // Save old head (new tail)
        groupPrev.next = kth   // Connect to new head
        groupPrev = temp       // Move to next group

    return dummy.next

getKth(current, k):
    while current and k > 0:
        current = current.next
        k -= 1
    return current

Visual Example: k=2 in [1,2,3,4,5]
-----------------------
Initial: D→1→2→3→4→5

Group 1 (reverse 1,2):
  Before: D→1→2→3
  After:  D→2→1→3

Group 2 (reverse 3,4):
  Before: D→2→1→3→4→5
  After:  D→2→1→4→3→5

Group 3 (only 1 node):
  Keep as is: 5

Result: 2→1→4→3→5

Recursive Approach:
-----------------------
reverseKGroup(head, k):
    // Check if k nodes exist
    count = 0
    current = head
    while current and count < k:
        current = current.next
        count += 1

    if count < k: return head

    // Reverse k nodes
    prev = reverseKGroup(current, k)
    while count > 0:
        next = head.next
        head.next = prev
        prev = head
        head = next
        count -= 1

    return prev`,
      code: {
        java: {
          starterCode: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

public ListNode reverseKGroup(ListNode head, int k) {
    // Write your code here

}`,
          solution: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

// Approach 1: Iterative - O(n) time, O(1) space
public ListNode reverseKGroup(ListNode head, int k) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode groupPrev = dummy;

    while (true) {
        // Check if k nodes exist
        ListNode kth = getKth(groupPrev, k);
        if (kth == null) break;

        ListNode groupNext = kth.next;

        // Reverse k nodes
        ListNode prev = kth.next;
        ListNode current = groupPrev.next;

        while (current != groupNext) {
            ListNode next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        // Connect reversed group
        ListNode temp = groupPrev.next;  // Old head, now tail
        groupPrev.next = kth;            // Connect to new head
        groupPrev = temp;                // Move to next group
    }

    return dummy.next;
}

private ListNode getKth(ListNode current, int k) {
    while (current != null && k > 0) {
        current = current.next;
        k--;
    }
    return current;
}

// Approach 2: Recursive - O(n) time, O(n/k) space
public ListNode reverseKGroup(ListNode head, int k) {
    // Check if k nodes exist
    ListNode current = head;
    int count = 0;
    while (current != null && count < k) {
        current = current.next;
        count++;
    }

    if (count < k) return head;

    // Reverse k nodes
    ListNode prev = reverseKGroup(current, k);
    while (count > 0) {
        ListNode next = head.next;
        head.next = prev;
        prev = head;
        head = next;
        count--;
    }

    return prev;
}`
        },
        python: {
          starterCode: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
    # Write your code here
    pass`,
          solution: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

# Approach 1: Iterative - O(n) time, O(1) space
def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
    def get_kth(current, k):
        while current and k > 0:
            current = current.next
            k -= 1
        return current

    dummy = ListNode(0)
    dummy.next = head
    group_prev = dummy

    while True:
        # Check if k nodes exist
        kth = get_kth(group_prev, k)
        if not kth:
            break

        group_next = kth.next

        # Reverse k nodes
        prev = kth.next
        current = group_prev.next

        while current != group_next:
            next_node = current.next
            current.next = prev
            prev = current
            current = next_node

        # Connect reversed group
        temp = group_prev.next  # Old head, now tail
        group_prev.next = kth   # Connect to new head
        group_prev = temp       # Move to next group

    return dummy.next

# Approach 2: Recursive - O(n) time, O(n/k) space
def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
    # Check if k nodes exist
    current = head
    count = 0
    while current and count < k:
        current = current.next
        count += 1

    if count < k:
        return head

    # Reverse k nodes
    prev = self.reverseKGroup(current, k)
    while count > 0:
        next_node = head.next
        head.next = prev
        prev = head
        head = next_node
        count -= 1

    return prev`
        }
      },
      testCases: [
        { input: 'head = [1,2,3,4,5], k = 2', expected: '[2,1,4,3,5]' },
        { input: 'head = [1,2,3,4,5], k = 3', expected: '[3,2,1,4,5]' },
        { input: 'head = [1,2,3,4,5], k = 1', expected: '[1,2,3,4,5]' }
      ],
      examples: [
        { input: 'head = [1,2,3,4,5], k = 2', output: '[2,1,4,3,5]' },
        { input: 'head = [1,2,3,4,5], k = 3', output: '[3,2,1,4,5]' }
      ]
    },
    {
      id: 9,
      title: 'Remove Duplicates from Sorted List II',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/',
      description: 'Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.',
      explanation: `**Problem:** Remove ALL occurrences of duplicate values (not just extras).

**Key Difference from "Remove Duplicates I":**
- Remove Duplicates I: Keep ONE copy → [1,1,2] becomes [1,2]
- Remove Duplicates II: Remove ALL → [1,1,2] becomes [2]

**Key Insight: Look Ahead Pattern**
Check if current.next.val equals current.next.next.val!

**Algorithm:**
1. Use dummy node (head might be removed)
2. For each node, check if next values duplicate
3. If duplicate: skip ALL nodes with that value
4. If unique: keep it and move forward

**Example: [1,2,3,3,4,4,5]**
- 1: unique → keep
- 2: unique → keep
- 3,3: duplicate → remove both
- 4,4: duplicate → remove both
- 5: unique → keep
Result: [1,2,5]

**Why Dummy Node Critical?**
Head could be duplicate! [1,1,2] → head is removed!

**Visual Process:**
Original: 1→2→3→3→4→4→5

Check 1: unique, keep
Check 2: unique, keep
Check 3: duplicate (3=3), skip both
Check 4: duplicate (4=4), skip both
Check 5: unique, keep

Result: 1→2→5

**Complexity:**
- Time: O(n)
- Space: O(1)`,
      pseudocode: `Algorithm:
-----------------------
deleteDuplicates(head):
    dummy = new ListNode(0)
    dummy.next = head
    prev = dummy

    while head != null:
        // Check if current is duplicate
        if head.next != null AND head.val == head.next.val:
            // Skip all nodes with this value
            while head.next != null AND head.val == head.next.val:
                head = head.next
            prev.next = head.next  // Skip entire duplicate sequence
        else:
            // Unique value, keep it
            prev = prev.next

        head = head.next

    return dummy.next

Visual Example: [1,2,3,3,4,4,5]
-----------------------
Initial: D→1→2→3→3→4→4→5

Step 1: Check 1
  No duplicate → keep
  D→1→2→3→3→4→4→5
     ↑
    prev

Step 2: Check 2
  No duplicate → keep
  D→1→2→3→3→4→4→5
        ↑
       prev

Step 3: Check 3
  Duplicate found (3=3)
  Skip both: prev.next = 4
  D→1→2→4→4→5

Step 4: Check 4
  Duplicate found (4=4)
  Skip both: prev.next = 5
  D→1→2→5

Step 5: Check 5
  No duplicate → keep

Result: [1,2,5]

Key Pattern:
-----------------------
To detect duplicates in sorted list:
  current.val == current.next.val

To skip all duplicates:
  while current.next and current.val == current.next.val:
      current = current.next`,
      code: {
        java: {
          starterCode: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

public ListNode deleteDuplicates(ListNode head) {
    // Write your code here

}`,
          solution: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

// Approach: Look-ahead with dummy node - O(n) time, O(1) space
public ListNode deleteDuplicates(ListNode head) {
    // Dummy node handles case where head is duplicate
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode prev = dummy;

    while (head != null) {
        // Check if current value is duplicate
        if (head.next != null && head.val == head.next.val) {
            // Skip all nodes with this duplicate value
            while (head.next != null && head.val == head.next.val) {
                head = head.next;
            }
            // Connect prev to node after duplicates
            prev.next = head.next;
        } else {
            // No duplicate, move prev forward
            prev = prev.next;
        }

        // Move to next node
        head = head.next;
    }

    return dummy.next;
}`
        },
        python: {
          starterCode: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
    # Write your code here
    pass`,
          solution: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

# Approach: Look-ahead with dummy node - O(n) time, O(1) space
def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
    # Dummy node handles case where head is duplicate
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy

    while head:
        # Check if current value is duplicate
        if head.next and head.val == head.next.val:
            # Skip all nodes with this duplicate value
            while head.next and head.val == head.next.val:
                head = head.next
            # Connect prev to node after duplicates
            prev.next = head.next
        else:
            # No duplicate, move prev forward
            prev = prev.next

        # Move to next node
        head = head.next

    return dummy.next`
        }
      },
      testCases: [
        { input: 'head = [1,2,3,3,4,4,5]', expected: '[1,2,5]' },
        { input: 'head = [1,1,1,2,3]', expected: '[2,3]' },
        { input: 'head = [1,1,2,2]', expected: '[]' }
      ],
      examples: [
        { input: 'head = [1,2,3,3,4,4,5]', output: '[1,2,5]' },
        { input: 'head = [1,1,1,2,3]', output: '[2,3]' }
      ]
    },
    {
      id: 10,
      title: 'Rotate List',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/rotate-list/',
      description: 'Given the head of a linked list, rotate the list to the right by k places.',
      explanation: `**Problem:** Rotate linked list right by k positions.

**Key Insight: Connect into Circle, Break at Right Spot**
1. Make list circular
2. Find new tail (at position length-k-1)
3. Break circle there

**Why This Works:**
Rotating right by k = moving last k nodes to front!

**Algorithm:**
1. Find length and last node
2. Connect last to head (make circular)
3. Calculate new tail position: length - k % length - 1
4. Move to new tail
5. Break circle: newHead = newTail.next, newTail.next = null

**Example: [1,2,3,4,5], k=2**
Rotate right 2 → Move last 2 to front
Result: [4,5,1,2,3]

Process:
1. Length = 5
2. Make circular: 5→1
3. New tail at position 5-2-1=2 (node 3)
4. Break: newHead=4, 3→null
5. Result: 4→5→1→2→3

**Edge Cases:**
- k > length: Use k % length
- k = 0 or k = length: No change
- Empty list: Return null

**Complexity:**
- Time: O(n)
- Space: O(1)`,
      pseudocode: `Algorithm:
-----------------------
rotateRight(head, k):
    if head == null OR k == 0: return head

    // Find length and last node
    length = 1
    tail = head
    while tail.next != null:
        tail = tail.next
        length += 1

    // Make circular
    tail.next = head

    // Find new tail position
    k = k % length
    if k == 0:
        tail.next = null  // Restore original
        return head

    stepsToNewTail = length - k
    newTail = head
    for i from 1 to stepsToNewTail-1:
        newTail = newTail.next

    // Break circle
    newHead = newTail.next
    newTail.next = null

    return newHead

Visual Example: [1,2,3,4,5], k=2
-----------------------
Original: 1→2→3→4→5

Step 1: Make circular
  1→2→3→4→5→1 (circular)

Step 2: Find new tail
  length=5, k=2
  stepsToNewTail = 5-2 = 3
  New tail at position 3 (node 3)

Step 3: Break circle
  1→2→3  4→5→...
        ↓
      newHead=4
      newTail=3

  Set newTail.next = null

Result: 4→5→1→2→3

Why k % length?
-----------------------
If k=7, length=5:
  k % 5 = 2
  Rotating 7 times = rotating 2 times!`,
      code: {
        java: {
          starterCode: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

public ListNode rotateRight(ListNode head, int k) {
    // Write your code here

}`,
          solution: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

// Approach: Circular connection - O(n) time, O(1) space
public ListNode rotateRight(ListNode head, int k) {
    if (head == null || head.next == null || k == 0) {
        return head;
    }

    // Find length and last node
    int length = 1;
    ListNode tail = head;
    while (tail.next != null) {
        tail = tail.next;
        length++;
    }

    // Make list circular
    tail.next = head;

    // Find new tail position
    k = k % length;
    if (k == 0) {
        tail.next = null;  // Restore original list
        return head;
    }

    // Move to new tail (length - k - 1 steps from head)
    int stepsToNewTail = length - k;
    ListNode newTail = head;
    for (int i = 1; i < stepsToNewTail; i++) {
        newTail = newTail.next;
    }

    // Break the circle
    ListNode newHead = newTail.next;
    newTail.next = null;

    return newHead;
}`
        },
        python: {
          starterCode: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
    # Write your code here
    pass`,
          solution: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

# Approach: Circular connection - O(n) time, O(1) space
def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
    if not head or not head.next or k == 0:
        return head

    # Find length and last node
    length = 1
    tail = head
    while tail.next:
        tail = tail.next
        length += 1

    # Make list circular
    tail.next = head

    # Find new tail position
    k = k % length
    if k == 0:
        tail.next = None  # Restore original list
        return head

    # Move to new tail
    steps_to_new_tail = length - k
    new_tail = head
    for _ in range(steps_to_new_tail - 1):
        new_tail = new_tail.next

    # Break the circle
    new_head = new_tail.next
    new_tail.next = None

    return new_head`
        }
      },
      testCases: [
        { input: 'head = [1,2,3,4,5], k = 2', expected: '[4,5,1,2,3]' },
        { input: 'head = [0,1,2], k = 4', expected: '[2,0,1]' },
        { input: 'head = [1,2], k = 1', expected: '[2,1]' }
      ],
      examples: [
        { input: 'head = [1,2,3,4,5], k = 2', output: '[4,5,1,2,3]' },
        { input: 'head = [0,1,2], k = 4', output: '[2,0,1]' }
      ]
    },
    {
      id: 11,
      title: 'Partition List',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/partition-list/',
      description: 'Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x. You should preserve the original relative order of the nodes in each of the two partitions.',
      explanation: `**Problem:** Split list into two parts: values < x and values >= x.

**Key Insight: Two Separate Lists**
Build two lists, then connect them!

**Algorithm:**
1. Create two dummy nodes: "less" and "greater"
2. Traverse original list
3. If node.val < x: add to "less" list
4. If node.val >= x: add to "greater" list
5. Connect less list to greater list
6. Return less.next

**Example: [1,4,3,2,5,2], x=3**
Less list: 1→2→2
Greater list: 4→3→5
Result: 1→2→2→4→3→5

**Why Two Lists?**
- Preserves relative order in each partition
- Simple pointer manipulation
- O(1) space (just pointers, not new nodes)

**Critical Step:**
Set greaterTail.next = null (avoid cycle!)

**Visual Process:**
Original: 1→4→3→2→5→2, x=3

Build less: 1→2→2
Build greater: 4→3→5

Connect: 1→2→2→4→3→5

**Complexity:**
- Time: O(n)
- Space: O(1)`,
      pseudocode: `Algorithm:
-----------------------
partition(head, x):
    lessDummy = new ListNode(0)
    greaterDummy = new ListNode(0)
    less = lessDummy
    greater = greaterDummy

    while head != null:
        if head.val < x:
            less.next = head
            less = less.next
        else:
            greater.next = head
            greater = greater.next
        head = head.next

    // Connect two lists
    greater.next = null  // Avoid cycle
    less.next = greaterDummy.next

    return lessDummy.next

Visual Example: [1,4,3,2,5,2], x=3
-----------------------
Original: 1→4→3→2→5→2

Process each node:

1 < 3: add to less
  less: 1
  greater: (empty)

4 >= 3: add to greater
  less: 1
  greater: 4

3 >= 3: add to greater
  less: 1
  greater: 4→3

2 < 3: add to less
  less: 1→2
  greater: 4→3

5 >= 3: add to greater
  less: 1→2
  greater: 4→3→5

2 < 3: add to less
  less: 1→2→2
  greater: 4→3→5

Connect:
  less.next = greater.next
  Result: 1→2→2→4→3→5

Important: greater.next = null
-----------------------
Without this, if original list was:
  1→4→2 (x=3)
Greater list would still point to 2:
  4→2 (cycle!)

Setting greater.next = null breaks any cycle.`,
      code: {
        java: {
          starterCode: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

public ListNode partition(ListNode head, int x) {
    // Write your code here

}`,
          solution: `// class ListNode {
//     int val;
//     ListNode next;
//     ListNode(int x) { val = x; }
// }

// Approach: Two separate lists - O(n) time, O(1) space
public ListNode partition(ListNode head, int x) {
    // Create two dummy nodes for two lists
    ListNode lessDummy = new ListNode(0);
    ListNode greaterDummy = new ListNode(0);
    ListNode less = lessDummy;
    ListNode greater = greaterDummy;

    // Partition nodes into two lists
    while (head != null) {
        if (head.val < x) {
            less.next = head;
            less = less.next;
        } else {
            greater.next = head;
            greater = greater.next;
        }
        head = head.next;
    }

    // Connect the two lists
    greater.next = null;  // Important: avoid cycle
    less.next = greaterDummy.next;

    return lessDummy.next;
}`
        },
        python: {
          starterCode: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:
    # Write your code here
    pass`,
          solution: `# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

# Approach: Two separate lists - O(n) time, O(1) space
def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:
    # Create two dummy nodes for two lists
    less_dummy = ListNode(0)
    greater_dummy = ListNode(0)
    less = less_dummy
    greater = greater_dummy

    # Partition nodes into two lists
    while head:
        if head.val < x:
            less.next = head
            less = less.next
        else:
            greater.next = head
            greater = greater.next
        head = head.next

    # Connect the two lists
    greater.next = None  # Important: avoid cycle
    less.next = greater_dummy.next

    return less_dummy.next`
        }
      },
      testCases: [
        { input: 'head = [1,4,3,2,5,2], x = 3', expected: '[1,2,2,4,3,5]' },
        { input: 'head = [2,1], x = 2', expected: '[1,2]' },
        { input: 'head = [1], x = 0', expected: '[1]' }
      ],
      examples: [
        { input: 'head = [1,4,3,2,5,2], x = 3', output: '[1,2,2,4,3,5]' },
        { input: 'head = [2,1], x = 2', output: '[1,2]' }
      ]
    },
    {
      id: 12,
      title: 'LRU Cache',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/lru-cache/',
      description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get(key) and put(key, value) methods, both in O(1) time.',
      explanation: `**Problem:** Design LRU cache with O(1) get and put operations.

**Key Insight: HashMap + Doubly Linked List**
Combine two data structures for O(1) time!

**Why This Combination?**
- HashMap: O(1) key lookup
- Doubly Linked List: O(1) insertion/deletion
- List order: Most recent (head) → Least recent (tail)

**Data Structures:**
1. HashMap<Key, Node>: Fast lookup
2. Doubly Linked List: Maintain LRU order
   - Head: Most recently used
   - Tail: Least recently used (remove this when capacity full)

**Operations:**

**get(key):**
1. If not in cache: return -1
2. If in cache:
   - Get value
   - Move node to head (mark as recently used)
   - Return value

**put(key, value):**
1. If key exists:
   - Update value
   - Move to head
2. If key doesn't exist:
   - If at capacity: remove tail (LRU)
   - Add new node at head
   - Update HashMap

**Why Doubly Linked List?**
Need to remove node from middle → requires prev pointer!

**Visual Example:**
Cache capacity = 2

put(1, 1): [1]
put(2, 2): [2, 1]
get(1):    [1, 2] → moves 1 to front
put(3, 3): [3, 1] → removes 2 (LRU)

**Complexity:**
- Time: O(1) for both get and put
- Space: O(capacity)`,
      pseudocode: `Data Structure:
-----------------------
class Node:
    key, value, prev, next

class LRUCache:
    capacity
    cache = HashMap<key, Node>
    head = Node()  // Dummy head
    tail = Node()  // Dummy tail

    init(capacity):
        this.capacity = capacity
        head.next = tail
        tail.prev = head

Helper Methods:
-----------------------
addToHead(node):
    // Add node right after head
    node.prev = head
    node.next = head.next
    head.next.prev = node
    head.next = node

removeNode(node):
    // Remove node from list
    prev = node.prev
    next = node.next
    prev.next = next
    next.prev = prev

moveToHead(node):
    removeNode(node)
    addToHead(node)

removeTail():
    // Remove least recently used
    lru = tail.prev
    removeNode(lru)
    return lru

Main Methods:
-----------------------
get(key):
    if key not in cache:
        return -1
    node = cache[key]
    moveToHead(node)
    return node.value

put(key, value):
    if key in cache:
        node = cache[key]
        node.value = value
        moveToHead(node)
    else:
        if cache.size >= capacity:
            lru = removeTail()
            delete cache[lru.key]

        newNode = new Node(key, value)
        cache[key] = newNode
        addToHead(newNode)

Visual Example:
-----------------------
Capacity = 2

Initial: H ⟷ T

put(1, 1):
  H ⟷ [1:1] ⟷ T

put(2, 2):
  H ⟷ [2:2] ⟷ [1:1] ⟷ T
       (MRU)      (LRU)

get(1): Move 1 to head
  H ⟷ [1:1] ⟷ [2:2] ⟷ T
       (MRU)      (LRU)

put(3, 3): Capacity full, remove LRU (2)
  H ⟷ [3:3] ⟷ [1:1] ⟷ T
       (MRU)      (LRU)`,
      code: {
        java: {
          starterCode: `class LRUCache {

    public LRUCache(int capacity) {
        // Initialize your data structure here
    }

    public int get(int key) {
        // Write your code here

    }

    public void put(int key, int value) {
        // Write your code here

    }
}`,
          solution: `class LRUCache {
    class Node {
        int key, value;
        Node prev, next;

        Node(int key, int value) {
            this.key = key;
            this.value = value;
        }
    }

    private int capacity;
    private Map<Integer, Node> cache;
    private Node head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.cache = new HashMap<>();

        // Create dummy head and tail
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }

    // Add node right after head (most recently used position)
    private void addToHead(Node node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    // Remove node from its current position
    private void removeNode(Node node) {
        Node prev = node.prev;
        Node next = node.next;
        prev.next = next;
        next.prev = prev;
    }

    // Move node to head (mark as recently used)
    private void moveToHead(Node node) {
        removeNode(node);
        addToHead(node);
    }

    // Remove least recently used node (tail.prev)
    private Node removeTail() {
        Node lru = tail.prev;
        removeNode(lru);
        return lru;
    }

    public int get(int key) {
        if (!cache.containsKey(key)) {
            return -1;
        }

        Node node = cache.get(key);
        moveToHead(node);  // Mark as recently used
        return node.value;
    }

    public void put(int key, int value) {
        if (cache.containsKey(key)) {
            // Update existing node
            Node node = cache.get(key);
            node.value = value;
            moveToHead(node);
        } else {
            // Add new node
            Node newNode = new Node(key, value);
            cache.put(key, newNode);
            addToHead(newNode);

            // Check capacity
            if (cache.size() > capacity) {
                Node lru = removeTail();
                cache.remove(lru.key);
            }
        }
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache obj = new LRUCache(capacity);
 * int param_1 = obj.get(key);
 * obj.put(key,value);
 */`
        },
        python: {
          starterCode: `class LRUCache:

    def __init__(self, capacity: int):
        # Initialize your data structure here
        pass

    def get(self, key: int) -> int:
        # Write your code here
        pass

    def put(self, key: int, value: int) -> None:
        # Write your code here
        pass`,
          solution: `class Node:
    def __init__(self, key=0, value=0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}  # key -> Node

        # Create dummy head and tail
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _add_to_head(self, node):
        """Add node right after head (most recently used position)"""
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node):
        """Remove node from its current position"""
        prev_node = node.prev
        next_node = node.next
        prev_node.next = next_node
        next_node.prev = prev_node

    def _move_to_head(self, node):
        """Move node to head (mark as recently used)"""
        self._remove_node(node)
        self._add_to_head(node)

    def _remove_tail(self):
        """Remove least recently used node (tail.prev)"""
        lru = self.tail.prev
        self._remove_node(lru)
        return lru

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        node = self.cache[key]
        self._move_to_head(node)  # Mark as recently used
        return node.value

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            # Update existing node
            node = self.cache[key]
            node.value = value
            self._move_to_head(node)
        else:
            # Add new node
            new_node = Node(key, value)
            self.cache[key] = new_node
            self._add_to_head(new_node)

            # Check capacity
            if len(self.cache) > self.capacity:
                lru = self._remove_tail()
                del self.cache[lru.key]

# Your LRUCache object will be instantiated and called as such:
# obj = LRUCache(capacity)
# param_1 = obj.get(key)
# obj.put(key,value)`
        }
      },
      testCases: [
        { description: 'LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2)', expected: 'Returns 1, -1' },
        { description: 'Testing LRU eviction policy', expected: 'Least recently used is evicted' }
      ],
      examples: [
        {
          input: 'LRUCache lru = new LRUCache(2); lru.put(1, 1); lru.put(2, 2); lru.get(1); lru.put(3, 3); lru.get(2);',
          output: '[null, null, null, 1, null, -1]',
          explanation: 'get(2) returns -1 because key 2 was evicted when putting 3'
        },
        {
          input: 'LRUCache lru = new LRUCache(2); lru.put(2, 1); lru.put(2, 2); lru.get(2); lru.put(1, 1); lru.put(4, 1); lru.get(2);',
          output: '[null, null, null, 2, null, null, -1]'
        }
      ]
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Linked Lists-${q.id}`)).length
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
    const savedDrawing = localStorage.getItem(`drawing-LinkedLists-${question.id}`)
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`Linked Lists-${selectedQuestion.id}`} />
              <BookmarkButton problemId={`LinkedLists-${selectedQuestion.id}`} problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'LinkedLists' }} />
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
            const savedDrawing = localStorage.getItem(`drawing-LinkedLists-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`LinkedLists-${selectedQuestion.id}`}
          existingDrawing={currentDrawing}
        />
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'} onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}>
          ← Back
        </button>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>🔗 Linked Lists</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Master linked lists problems</p>

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
                          <CompletionCheckbox problemId={`Linked Lists-${question.id}`} />
                        </div>
                        <BookmarkButton size="small" problemId={`LinkedLists-${question.id}`} problemData={{ title: question.title, difficulty: question.difficulty, category: 'LinkedLists' }} />
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

export default LinkedLists
