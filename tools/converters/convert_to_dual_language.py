#!/usr/bin/env python3
"""
Helper script to add Python versions of LRU Cache problems
"""

# Question 1: Basic LRU Cache - Python version
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

print("Python code generated for LRU Cache Question 1")
print("\nStarter code length:", len(q1_python_starter))
print("Solution code length:", len(q1_python_solution))
