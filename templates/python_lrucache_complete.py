#!/usr/bin/env python3
"""
Complete Python implementations for all LRU Cache questions
"""

# ============================================
# Question 1: Basic LRU Cache
# ============================================

q1_python_starter = '''class LRUCache:
    class Node:
        def __init__(self, k, v):
            self.key = k
            self.value = v
            self.prev = None
            self.next = None

    def __init__(self, capacity: int):
        # TODO: Initialize cache and dummy nodes
        pass

    def get(self, key: int) -> int:
        # TODO: Get value and move to front
        return -1

    def put(self, key: int, value: int) -> None:
        # TODO: Add/update and evict if needed
        pass

    # Helper methods
    def _move_to_head(self, node):
        # TODO: Move node to front (most recently used)
        pass

    def _remove_node(self, node):
        # TODO: Remove node from list
        pass

    def _remove_tail(self):
        # TODO: Remove least recently used node
        return None'''

q1_python_solution = '''class LRUCache:
    class Node:
        def __init__(self, k, v):
            self.key = k
            self.value = v
            self.prev = None
            self.next = None

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}

        # Create dummy head and tail
        self.head = self.Node(0, 0)
        self.tail = self.Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        node = self.cache[key]
        # Move to head (most recently used)
        self._move_to_head(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            # Update existing node
            node = self.cache[key]
            node.value = value
            self._move_to_head(node)
        else:
            # Create new node
            new_node = self.Node(key, value)
            self.cache[key] = new_node
            self._add_to_head(new_node)

            # Check capacity
            if len(self.cache) > self.capacity:
                removed = self._remove_tail()
                del self.cache[removed.key]

    # Add node right after head
    def _add_to_head(self, node):
        node.prev = self.head
        node.next = self.head.next

        self.head.next.prev = node
        self.head.next = node

    # Remove node from list
    def _remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    # Move existing node to head
    def _move_to_head(self, node):
        self._remove_node(node)
        self._add_to_head(node)

    # Remove least recently used node (before tail)
    def _remove_tail(self):
        node = self.tail.prev
        self._remove_node(node)
        return node


# Using OrderedDict (Python built-in)
from collections import OrderedDict

class LRUCacheSimple(OrderedDict):
    def __init__(self, capacity: int):
        super().__init__()
        self.capacity = capacity

    def get(self, key: int) -> int:
        if key not in self:
            return -1
        # Move to end (most recently used)
        self.move_to_end(key)
        return self[key]

    def put(self, key: int, value: int) -> None:
        if key in self:
            # Move to end
            self.move_to_end(key)
        self[key] = value
        if len(self) > self.capacity:
            # Remove oldest (first item)
            self.popitem(last=False)


# With additional size tracking
class LRUCacheWithSize:
    class Node:
        def __init__(self, k, v, s):
            self.key = k
            self.value = v
            self.size = s
            self.prev = None
            self.next = None

    def __init__(self, max_size: int):
        self.max_size = max_size
        self.current_size = 0
        self.cache = {}

        self.head = self.Node(0, 0, 0)
        self.tail = self.Node(0, 0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        node = self.cache[key]
        self._move_to_head(node)
        return node.value

    def put(self, key: int, value: int, size: int) -> None:
        if key in self.cache:
            # Update existing
            node = self.cache[key]
            self.current_size -= node.size
            node.value = value
            node.size = size
            self.current_size += size
            self._move_to_head(node)
        else:
            # Add new
            new_node = self.Node(key, value, size)
            self.cache[key] = new_node
            self._add_to_head(new_node)
            self.current_size += size

            # Evict until within capacity
            while self.current_size > self.max_size:
                removed = self._remove_tail()
                del self.cache[removed.key]
                self.current_size -= removed.size

    def _add_to_head(self, node):
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _move_to_head(self, node):
        self._remove_node(node)
        self._add_to_head(node)

    def _remove_tail(self):
        node = self.tail.prev
        self._remove_node(node)
        return node'''

# ============================================
# Question 2: LRU Cache with Expiry
# ============================================

q2_python_starter = '''class LRUCacheWithExpiry:
    class Node:
        def __init__(self, k, v, t):
            self.key = k
            self.value = v
            self.timestamp = t
            self.prev = None
            self.next = None

    def __init__(self, capacity: int, ttl: int):
        # TODO: Initialize with TTL support
        pass

    def get(self, key: int, timestamp: int) -> int:
        # TODO: Get value and check expiry
        return -1

    def put(self, key: int, value: int, timestamp: int) -> None:
        # TODO: Add/update with timestamp
        pass

    def _is_expired(self, node, current_time: int) -> bool:
        # TODO: Check if node is expired
        return False'''

q2_python_solution = '''class LRUCacheWithExpiry:
    class Node:
        def __init__(self, k, v, t):
            self.key = k
            self.value = v
            self.timestamp = t
            self.prev = None
            self.next = None

    def __init__(self, capacity: int, ttl: int):
        self.capacity = capacity
        self.ttl = ttl  # Time to live in seconds
        self.cache = {}

        self.head = self.Node(0, 0, 0)
        self.tail = self.Node(0, 0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int, timestamp: int) -> int:
        if key not in self.cache:
            return -1

        node = self.cache[key]

        # Check if expired
        if self._is_expired(node, timestamp):
            self._remove_node(node)
            del self.cache[key]
            return -1

        # Move to head (most recently used)
        self._move_to_head(node)
        return node.value

    def put(self, key: int, value: int, timestamp: int) -> None:
        # Clean expired entries
        self._clean_expired(timestamp)

        if key in self.cache:
            # Update existing node
            node = self.cache[key]
            node.value = value
            node.timestamp = timestamp
            self._move_to_head(node)
        else:
            # Create new node
            new_node = self.Node(key, value, timestamp)
            self.cache[key] = new_node
            self._add_to_head(new_node)

            # Check capacity
            if len(self.cache) > self.capacity:
                removed = self._remove_tail()
                del self.cache[removed.key]

    def _is_expired(self, node, current_time: int) -> bool:
        return (current_time - node.timestamp) > self.ttl

    def _clean_expired(self, current_time: int):
        # Remove expired entries from tail (oldest)
        while self.tail.prev != self.head and self._is_expired(self.tail.prev, current_time):
            expired = self._remove_tail()
            del self.cache[expired.key]

    def _add_to_head(self, node):
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _move_to_head(self, node):
        self._remove_node(node)
        self._add_to_head(node)

    def _remove_tail(self):
        node = self.tail.prev
        self._remove_node(node)
        return node


# With scheduled cleanup using heap
import heapq

class LRUCacheWithExpiryScheduled:
    class Node:
        def __init__(self, k, v, exp):
            self.key = k
            self.value = v
            self.expiry_time = exp
            self.prev = None
            self.next = None

    def __init__(self, capacity: int, ttl: int):
        self.capacity = capacity
        self.ttl = ttl
        self.cache = {}
        self.expiry_queue = []  # Min heap by expiry time

        self.head = self.Node(0, 0, 0)
        self.tail = self.Node(0, 0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int, timestamp: int) -> int:
        self._clean_expired(timestamp)

        if key not in self.cache:
            return -1

        node = self.cache[key]
        if node.expiry_time <= timestamp:
            return -1

        self._move_to_head(node)
        return node.value

    def put(self, key: int, value: int, timestamp: int) -> None:
        self._clean_expired(timestamp)

        expiry_time = timestamp + self.ttl

        if key in self.cache:
            node = self.cache[key]
            node.value = value
            node.expiry_time = expiry_time
            self._move_to_head(node)
        else:
            new_node = self.Node(key, value, expiry_time)
            self.cache[key] = new_node
            self._add_to_head(new_node)
            heapq.heappush(self.expiry_queue, (expiry_time, key))

            if len(self.cache) > self.capacity:
                removed = self._remove_tail()
                del self.cache[removed.key]

    def _clean_expired(self, current_time: int):
        while self.expiry_queue and self.expiry_queue[0][0] <= current_time:
            _, key = heapq.heappop(self.expiry_queue)
            if key in self.cache:
                node = self.cache[key]
                self._remove_node(node)
                del self.cache[key]

    def _add_to_head(self, node):
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _move_to_head(self, node):
        self._remove_node(node)
        self._add_to_head(node)

    def _remove_tail(self):
        node = self.tail.prev
        self._remove_node(node)
        return node'''

# ============================================
# Question 3: LFU Cache
# ============================================

q3_python_starter = '''class LFUCache:
    class Node:
        def __init__(self, k, v):
            self.key = k
            self.value = v
            self.freq = 1
            self.prev = None
            self.next = None

    def __init__(self, capacity: int):
        # TODO: Initialize LFU cache
        pass

    def get(self, key: int) -> int:
        # TODO: Get value and update frequency
        return -1

    def put(self, key: int, value: int) -> None:
        # TODO: Add/update and evict LFU if needed
        pass

    def _update_freq(self, node):
        # TODO: Move node to higher frequency list
        pass'''

q3_python_solution = '''class LFUCache:
    class Node:
        def __init__(self, k, v):
            self.key = k
            self.value = v
            self.freq = 1
            self.prev = None
            self.next = None

    class DLList:
        def __init__(self):
            self.head = None
            self.tail = None
            self.size = 0

        def add(self, node):
            if self.head is None:
                self.head = self.Node(0, 0)
                self.tail = self.Node(0, 0)
                self.head.next = self.tail
                self.tail.prev = self.head

            node.next = self.head.next
            node.prev = self.head
            self.head.next.prev = node
            self.head.next = node
            self.size += 1

        def remove(self, node):
            node.prev.next = node.next
            node.next.prev = node.prev
            self.size -= 1

        def remove_last(self):
            if self.size > 0:
                last = self.tail.prev
                self.remove(last)
                return last
            return None

        class Node:
            def __init__(self, k, v):
                self.key = k
                self.value = v
                self.prev = None
                self.next = None

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.min_freq = 0
        self.cache = {}
        self.freq_map = {}

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        node = self.cache[key]
        self._update_freq(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if self.capacity == 0:
            return

        if key in self.cache:
            # Update existing node
            node = self.cache[key]
            node.value = value
            self._update_freq(node)
        else:
            # Add new node
            if len(self.cache) >= self.capacity:
                # Evict LFU (and LRU if tie)
                min_freq_list = self.freq_map[self.min_freq]
                removed = min_freq_list.remove_last()
                del self.cache[removed.key]

            # Add new node with frequency 1
            new_node = self.Node(key, value)
            self.cache[key] = new_node
            if 1 not in self.freq_map:
                self.freq_map[1] = self.DLList()
            self.freq_map[1].add(new_node)
            self.min_freq = 1

    def _update_freq(self, node):
        freq = node.freq
        freq_list = self.freq_map[freq]
        freq_list.remove(node)

        # Update min_freq if needed
        if freq == self.min_freq and freq_list.size == 0:
            self.min_freq += 1

        # Add to next frequency list
        node.freq += 1
        if node.freq not in self.freq_map:
            self.freq_map[node.freq] = self.DLList()
        self.freq_map[node.freq].add(node)


# Simplified version using OrderedDict
from collections import OrderedDict, defaultdict

class LFUCacheSimple:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.min_freq = 0
        self.cache = {}  # key -> (value, freq)
        self.freq_map = defaultdict(OrderedDict)  # freq -> OrderedDict of keys

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1

        value, freq = self.cache[key]
        self._update_freq(key, value, freq)
        return value

    def put(self, key: int, value: int) -> None:
        if self.capacity == 0:
            return

        if key in self.cache:
            _, freq = self.cache[key]
            self._update_freq(key, value, freq)
        else:
            if len(self.cache) >= self.capacity:
                # Evict LFU item
                evict_key, _ = self.freq_map[self.min_freq].popitem(last=False)
                del self.cache[evict_key]

            self.cache[key] = (value, 1)
            self.freq_map[1][key] = None
            self.min_freq = 1

    def _update_freq(self, key: int, value: int, freq: int):
        del self.freq_map[freq][key]

        if freq == self.min_freq and not self.freq_map[freq]:
            self.min_freq += 1

        new_freq = freq + 1
        self.cache[key] = (value, new_freq)
        self.freq_map[new_freq][key] = None'''

# ============================================
# Question 4: Design Browser History
# ============================================

q4_python_starter = '''class BrowserHistory:
    def __init__(self, homepage: str):
        # TODO: Initialize browser history
        pass

    def visit(self, url: str) -> None:
        # TODO: Visit new page, clear forward history
        pass

    def back(self, steps: int) -> str:
        # TODO: Go back steps, return current page
        return ""

    def forward(self, steps: int) -> str:
        # TODO: Go forward steps, return current page
        return ""'''

q4_python_solution = '''class BrowserHistory:
    def __init__(self, homepage: str):
        self.history = [homepage]
        self.current = 0

    def visit(self, url: str) -> None:
        # Remove all forward history
        self.history = self.history[:self.current + 1]
        self.history.append(url)
        self.current += 1

    def back(self, steps: int) -> str:
        self.current = max(0, self.current - steps)
        return self.history[self.current]

    def forward(self, steps: int) -> str:
        self.current = min(len(self.history) - 1, self.current + steps)
        return self.history[self.current]


# Using doubly linked list
class BrowserHistoryDLL:
    class Node:
        def __init__(self, url: str):
            self.url = url
            self.prev = None
            self.next = None

    def __init__(self, homepage: str):
        self.current = self.Node(homepage)

    def visit(self, url: str) -> None:
        new_node = self.Node(url)
        self.current.next = new_node
        new_node.prev = self.current
        self.current = new_node

    def back(self, steps: int) -> str:
        while steps > 0 and self.current.prev is not None:
            self.current = self.current.prev
            steps -= 1
        return self.current.url

    def forward(self, steps: int) -> str:
        while steps > 0 and self.current.next is not None:
            self.current = self.current.next
            steps -= 1
        return self.current.url


# Using two stacks
class BrowserHistoryStacks:
    def __init__(self, homepage: str):
        self.back_stack = []
        self.forward_stack = []
        self.current = homepage

    def visit(self, url: str) -> None:
        self.back_stack.append(self.current)
        self.current = url
        self.forward_stack.clear()

    def back(self, steps: int) -> str:
        while steps > 0 and self.back_stack:
            self.forward_stack.append(self.current)
            self.current = self.back_stack.pop()
            steps -= 1
        return self.current

    def forward(self, steps: int) -> str:
        while steps > 0 and self.forward_stack:
            self.back_stack.append(self.current)
            self.current = self.forward_stack.pop()
            steps -= 1
        return self.current

    def get_current_url(self) -> str:
        return self.current

    def can_go_back(self) -> bool:
        return len(self.back_stack) > 0

    def can_go_forward(self) -> bool:
        return len(self.forward_stack) > 0


# With history limit
class BrowserHistoryLimited:
    def __init__(self, homepage: str, max_size: int):
        self.max_size = max_size
        self.history = [homepage]
        self.current = 0

    def visit(self, url: str) -> None:
        # Remove forward history
        self.history = self.history[:self.current + 1]
        self.history.append(url)
        self.current += 1

        # Maintain size limit
        if len(self.history) > self.max_size:
            self.history.pop(0)
            self.current -= 1

    def back(self, steps: int) -> str:
        self.current = max(0, self.current - steps)
        return self.history[self.current]

    def forward(self, steps: int) -> str:
        self.current = min(len(self.history) - 1, self.current + steps)
        return self.history[self.current]

    def get_history(self) -> list:
        return self.history.copy()'''

print("✅ All Python implementations created for LRU Cache questions")
print(f"Q1 starter length: {len(q1_python_starter)}")
print(f"Q1 solution length: {len(q1_python_solution)}")
print(f"Q2 starter length: {len(q2_python_starter)}")
print(f"Q2 solution length: {len(q2_python_solution)}")
print(f"Q3 starter length: {len(q3_python_starter)}")
print(f"Q3 solution length: {len(q3_python_solution)}")
print(f"Q4 starter length: {len(q4_python_starter)}")
print(f"Q4 solution length: {len(q4_python_solution)}")
