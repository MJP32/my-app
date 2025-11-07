#!/usr/bin/env python3
"""
Complete Python implementations for all Design Problems questions
"""

# ============================================
# Question 1: Design HashMap
# ============================================

q1_python_starter = '''class MyHashMap:
    class Node:
        def __init__(self, k, v):
            self.key = k
            self.value = v
            self.next = None

    def __init__(self):
        # TODO: Initialize hash map
        pass

    def put(self, key: int, value: int) -> None:
        # TODO: Add or update key-value pair
        pass

    def get(self, key: int) -> int:
        # TODO: Get value for key
        return -1

    def remove(self, key: int) -> None:
        # TODO: Remove key-value pair
        pass

    def _hash(self, key: int) -> int:
        # TODO: Calculate bucket index
        return 0

    def _resize(self):
        # TODO: Resize when load factor exceeded
        pass'''

q1_python_solution = '''class MyHashMap:
    class Node:
        def __init__(self, k, v):
            self.key = k
            self.value = v
            self.next = None

    INITIAL_CAPACITY = 16
    LOAD_FACTOR = 0.75

    def __init__(self):
        self.capacity = self.INITIAL_CAPACITY
        self.buckets = [None] * self.capacity
        self.size = 0

    def put(self, key: int, value: int) -> None:
        if self.size >= self.capacity * self.LOAD_FACTOR:
            self._resize()

        index = self._hash(key)
        head = self.buckets[index]

        # Check if key exists
        curr = head
        while curr:
            if curr.key == key:
                curr.value = value
                return
            curr = curr.next

        # Add new node at head
        new_node = self.Node(key, value)
        new_node.next = head
        self.buckets[index] = new_node
        self.size += 1

    def get(self, key: int) -> int:
        index = self._hash(key)
        curr = self.buckets[index]

        while curr:
            if curr.key == key:
                return curr.value
            curr = curr.next

        return -1  # Not found

    def remove(self, key: int) -> None:
        index = self._hash(key)
        curr = self.buckets[index]
        prev = None

        while curr:
            if curr.key == key:
                if prev is None:
                    self.buckets[index] = curr.next
                else:
                    prev.next = curr.next
                self.size -= 1
                return
            prev = curr
            curr = curr.next

    def _hash(self, key: int) -> int:
        return abs(key) % self.capacity

    def _resize(self):
        new_capacity = self.capacity * 2
        new_buckets = [None] * new_capacity

        # Rehash all entries
        for head in self.buckets:
            curr = head
            while curr:
                next_node = curr.next

                new_index = abs(curr.key) % new_capacity
                curr.next = new_buckets[new_index]
                new_buckets[new_index] = curr

                curr = next_node

        self.buckets = new_buckets
        self.capacity = new_capacity

    def get_size(self) -> int:
        return self.size

    def contains_key(self, key: int) -> bool:
        return self.get(key) != -1


# Generic version using Python's built-in hash
class HashMap:
    class Node:
        def __init__(self, k, v):
            self.key = k
            self.value = v
            self.next = None

    INITIAL_CAPACITY = 16
    LOAD_FACTOR = 0.75

    def __init__(self):
        self.capacity = self.INITIAL_CAPACITY
        self.buckets = [None] * self.capacity
        self.size = 0

    def put(self, key, value) -> None:
        if self.size >= self.capacity * self.LOAD_FACTOR:
            self._resize()

        index = self._hash(key)
        head = self.buckets[index]

        curr = head
        while curr:
            if curr.key == key:
                curr.value = value
                return
            curr = curr.next

        new_node = self.Node(key, value)
        new_node.next = head
        self.buckets[index] = new_node
        self.size += 1

    def get(self, key):
        index = self._hash(key)
        curr = self.buckets[index]

        while curr:
            if curr.key == key:
                return curr.value
            curr = curr.next

        return None

    def remove(self, key) -> None:
        index = self._hash(key)
        curr = self.buckets[index]
        prev = None

        while curr:
            if curr.key == key:
                if prev is None:
                    self.buckets[index] = curr.next
                else:
                    prev.next = curr.next
                self.size -= 1
                return
            prev = curr
            curr = curr.next

    def _hash(self, key) -> int:
        return abs(hash(key)) % self.capacity

    def _resize(self):
        new_capacity = self.capacity * 2
        new_buckets = [None] * new_capacity

        for head in self.buckets:
            curr = head
            while curr:
                next_node = curr.next

                new_index = abs(hash(curr.key)) % new_capacity
                curr.next = new_buckets[new_index]
                new_buckets[new_index] = curr

                curr = next_node

        self.buckets = new_buckets
        self.capacity = new_capacity

    def get_size(self) -> int:
        return self.size

    def contains_key(self, key) -> bool:
        return self.get(key) is not None'''

# ============================================
# Question 2: Design ArrayList
# ============================================

q2_python_starter = '''class MyArrayList:
    def __init__(self):
        # TODO: Initialize array list
        pass

    def add(self, val: int) -> None:
        # TODO: Add element, resize if needed
        pass

    def get(self, index: int) -> int:
        # TODO: Get element at index
        return -1

    def remove(self, index: int) -> None:
        # TODO: Remove element and shift
        pass

    def set(self, index: int, val: int) -> None:
        # TODO: Update element at index
        pass

    def size(self) -> int:
        return 0

    def _resize(self, new_capacity: int):
        # TODO: Resize internal array
        pass'''

q2_python_solution = '''class MyArrayList:
    INITIAL_CAPACITY = 10

    def __init__(self):
        self.capacity = self.INITIAL_CAPACITY
        self.data = [0] * self.capacity
        self._size = 0

    def add(self, val: int) -> None:
        if self._size == self.capacity:
            self._resize(self.capacity * 2)

        self.data[self._size] = val
        self._size += 1

    def get(self, index: int) -> int:
        if index < 0 or index >= self._size:
            raise IndexError(f"Index: {index}")
        return self.data[index]

    def remove(self, index: int) -> None:
        if index < 0 or index >= self._size:
            raise IndexError(f"Index: {index}")

        # Shift elements left
        for i in range(index, self._size - 1):
            self.data[i] = self.data[i + 1]

        self._size -= 1

        # Shrink if needed (optional)
        if self._size > 0 and self._size == self.capacity // 4:
            self._resize(self.capacity // 2)

    def set(self, index: int, val: int) -> None:
        if index < 0 or index >= self._size:
            raise IndexError(f"Index: {index}")
        self.data[index] = val

    def size(self) -> int:
        return self._size

    def _resize(self, new_capacity: int):
        new_data = [0] * new_capacity
        for i in range(self._size):
            new_data[i] = self.data[i]
        self.data = new_data
        self.capacity = new_capacity

    def add_at(self, index: int, val: int) -> None:
        if index < 0 or index > self._size:
            raise IndexError(f"Index: {index}")

        if self._size == self.capacity:
            self._resize(self.capacity * 2)

        # Shift elements right
        for i in range(self._size, index, -1):
            self.data[i] = self.data[i - 1]

        self.data[index] = val
        self._size += 1

    def contains(self, val: int) -> bool:
        return self.index_of(val) != -1

    def index_of(self, val: int) -> int:
        for i in range(self._size):
            if self.data[i] == val:
                return i
        return -1

    def clear(self):
        self._size = 0
        self.capacity = self.INITIAL_CAPACITY
        self.data = [0] * self.capacity


# Generic version
class ArrayList:
    INITIAL_CAPACITY = 10

    def __init__(self):
        self.capacity = self.INITIAL_CAPACITY
        self.data = [None] * self.capacity
        self._size = 0

    def add(self, val) -> None:
        if self._size == self.capacity:
            self._resize(self.capacity * 2)
        self.data[self._size] = val
        self._size += 1

    def get(self, index: int):
        if index < 0 or index >= self._size:
            raise IndexError(f"Index: {index}")
        return self.data[index]

    def remove(self, index: int) -> None:
        if index < 0 or index >= self._size:
            raise IndexError(f"Index: {index}")

        for i in range(index, self._size - 1):
            self.data[i] = self.data[i + 1]

        self.data[self._size - 1] = None  # Help GC
        self._size -= 1

        if self._size > 0 and self._size == self.capacity // 4:
            self._resize(self.capacity // 2)

    def set(self, index: int, val) -> None:
        if index < 0 or index >= self._size:
            raise IndexError(f"Index: {index}")
        self.data[index] = val

    def size(self) -> int:
        return self._size

    def _resize(self, new_capacity: int):
        new_data = [None] * new_capacity
        for i in range(self._size):
            new_data[i] = self.data[i]
        self.data = new_data
        self.capacity = new_capacity

    def add_at(self, index: int, val) -> None:
        if index < 0 or index > self._size:
            raise IndexError(f"Index: {index}")

        if self._size == self.capacity:
            self._resize(self.capacity * 2)

        for i in range(self._size, index, -1):
            self.data[i] = self.data[i - 1]

        self.data[index] = val
        self._size += 1

    def contains(self, val) -> bool:
        return self.index_of(val) != -1

    def index_of(self, val) -> int:
        for i in range(self._size):
            if self.data[i] == val:
                return i
        return -1'''

# ============================================
# Question 3: Design Circular Buffer
# ============================================

q3_python_starter = '''class CircularBuffer:
    def __init__(self, capacity: int):
        # TODO: Initialize circular buffer
        pass

    def write(self, value: int) -> None:
        # TODO: Write value, overwrite if full
        pass

    def read(self) -> int:
        # TODO: Read and remove oldest value
        return -1

    def is_empty(self) -> bool:
        # TODO: Check if empty
        return False

    def is_full(self) -> bool:
        # TODO: Check if full
        return False'''

q3_python_solution = '''class CircularBuffer:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.buffer = [0] * capacity
        self.write_pos = 0
        self.read_pos = 0
        self.count = 0

    def write(self, value: int) -> None:
        self.buffer[self.write_pos] = value
        self.write_pos = (self.write_pos + 1) % self.capacity

        if self.count < self.capacity:
            self.count += 1
        else:
            # Buffer full, move read position
            self.read_pos = (self.read_pos + 1) % self.capacity

    def read(self) -> int:
        if self.is_empty():
            raise Exception("Buffer is empty")

        value = self.buffer[self.read_pos]
        self.read_pos = (self.read_pos + 1) % self.capacity
        self.count -= 1

        return value

    def peek(self) -> int:
        if self.is_empty():
            raise Exception("Buffer is empty")
        return self.buffer[self.read_pos]

    def is_empty(self) -> bool:
        return self.count == 0

    def is_full(self) -> bool:
        return self.count == self.capacity

    def size(self) -> int:
        return self.count

    def clear(self):
        self.write_pos = 0
        self.read_pos = 0
        self.count = 0


# Thread-safe version
from threading import Lock

class CircularBufferThreadSafe:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.buffer = [0] * capacity
        self.write_pos = 0
        self.read_pos = 0
        self.count = 0
        self.lock = Lock()

    def write(self, value: int) -> None:
        with self.lock:
            self.buffer[self.write_pos] = value
            self.write_pos = (self.write_pos + 1) % self.capacity

            if self.count < self.capacity:
                self.count += 1
            else:
                self.read_pos = (self.read_pos + 1) % self.capacity

    def read(self) -> int:
        with self.lock:
            if self.is_empty():
                raise Exception("Buffer is empty")

            value = self.buffer[self.read_pos]
            self.read_pos = (self.read_pos + 1) % self.capacity
            self.count -= 1

            return value

    def is_empty(self) -> bool:
        with self.lock:
            return self.count == 0

    def is_full(self) -> bool:
        with self.lock:
            return self.count == self.capacity


# Generic version
class CircularBufferGeneric:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.buffer = [None] * capacity
        self.write_pos = 0
        self.read_pos = 0
        self.count = 0

    def write(self, value) -> None:
        self.buffer[self.write_pos] = value
        self.write_pos = (self.write_pos + 1) % self.capacity

        if self.count < self.capacity:
            self.count += 1
        else:
            self.read_pos = (self.read_pos + 1) % self.capacity

    def read(self):
        if self.is_empty():
            raise Exception("Buffer is empty")

        value = self.buffer[self.read_pos]
        self.buffer[self.read_pos] = None  # Help GC
        self.read_pos = (self.read_pos + 1) % self.capacity
        self.count -= 1

        return value

    def peek(self):
        if self.is_empty():
            raise Exception("Buffer is empty")
        return self.buffer[self.read_pos]

    def is_empty(self) -> bool:
        return self.count == 0

    def is_full(self) -> bool:
        return self.count == self.capacity

    def size(self) -> int:
        return self.count

    def to_list(self) -> list:
        result = []
        for i in range(self.count):
            result.append(self.buffer[(self.read_pos + i) % self.capacity])
        return result


# With blocking operations
from threading import Condition

class BlockingCircularBuffer:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.buffer = [0] * capacity
        self.write_pos = 0
        self.read_pos = 0
        self.count = 0
        self.condition = Condition()

    def write(self, value: int) -> None:
        with self.condition:
            while self.is_full():
                self.condition.wait()

            self.buffer[self.write_pos] = value
            self.write_pos = (self.write_pos + 1) % self.capacity
            self.count += 1

            self.condition.notify_all()

    def read(self) -> int:
        with self.condition:
            while self.is_empty():
                self.condition.wait()

            value = self.buffer[self.read_pos]
            self.read_pos = (self.read_pos + 1) % self.capacity
            self.count -= 1

            self.condition.notify_all()
            return value

    def is_empty(self) -> bool:
        return self.count == 0

    def is_full(self) -> bool:
        return self.count == self.capacity'''

# ============================================
# Question 4: Design Thread-Safe Counter
# ============================================

q4_python_starter = '''class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        # TODO: Thread-safe increment
        pass

    def decrement(self):
        # TODO: Thread-safe decrement
        pass

    def get(self) -> int:
        # TODO: Thread-safe get
        return 0

    def reset(self):
        # TODO: Thread-safe reset
        pass'''

q4_python_solution = '''# Solution 1: Using Lock
from threading import Lock

class CounterLock:
    def __init__(self):
        self.count = 0
        self.lock = Lock()

    def increment(self):
        with self.lock:
            self.count += 1

    def decrement(self):
        with self.lock:
            self.count -= 1

    def get(self) -> int:
        with self.lock:
            return self.count

    def reset(self):
        with self.lock:
            self.count = 0

    def add(self, value: int):
        with self.lock:
            self.count += value


# Solution 2: Using RLock (Reentrant Lock)
from threading import RLock

class CounterRLock:
    def __init__(self):
        self.count = 0
        self.lock = RLock()

    def increment(self):
        with self.lock:
            self.count += 1

    def decrement(self):
        with self.lock:
            self.count -= 1

    def get(self) -> int:
        with self.lock:
            return self.count

    def reset(self):
        with self.lock:
            self.count = 0

    def add(self, value: int):
        with self.lock:
            self.count += value

    def increment_and_get(self) -> int:
        with self.lock:
            self.count += 1
            return self.count

    def get_and_increment(self) -> int:
        with self.lock:
            old_value = self.count
            self.count += 1
            return old_value


# Solution 3: Using threading.Condition for notifications
from threading import Condition

class CounterWithNotify:
    def __init__(self, threshold: int):
        self.count = 0
        self.threshold = threshold
        self.condition = Condition()

    def increment(self):
        with self.condition:
            self.count += 1
            if self.count >= self.threshold:
                self.condition.notify_all()

    def wait_for_threshold(self):
        with self.condition:
            while self.count < self.threshold:
                self.condition.wait()

    def get(self) -> int:
        with self.condition:
            return self.count


# Test for thread safety
import threading

class CounterTest:
    @staticmethod
    def test_counter(counter, num_threads: int, iterations: int):
        threads = []

        for _ in range(num_threads):
            thread = threading.Thread(target=lambda: [counter.increment() for _ in range(iterations)])
            threads.append(thread)
            thread.start()

        for thread in threads:
            thread.join()

        expected = num_threads * iterations
        actual = counter.get()
        print(f"Expected: {expected}")
        print(f"Actual: {actual}")
        print(f"Test {'PASSED' if expected == actual else 'FAILED'}")


# Solution 4: Using Semaphore for rate limiting
from threading import Semaphore

class CounterSemaphore:
    def __init__(self, max_count: int):
        self.count = 0
        self.max_count = max_count
        self.semaphore = Semaphore(max_count)
        self.lock = Lock()

    def increment(self) -> bool:
        # Try to acquire semaphore (non-blocking)
        if self.semaphore.acquire(blocking=False):
            with self.lock:
                self.count += 1
            return True
        return False

    def decrement(self):
        with self.lock:
            if self.count > 0:
                self.count -= 1
                self.semaphore.release()

    def get(self) -> int:
        with self.lock:
            return self.count


# Solution 5: Read-Write Lock (using multiple readers, single writer pattern)
from threading import Event

class CounterReadWrite:
    def __init__(self):
        self.count = 0
        self.read_count = 0
        self.write_lock = Lock()
        self.read_lock = Lock()

    def increment(self):
        with self.write_lock:
            self.count += 1

    def decrement(self):
        with self.write_lock:
            self.count -= 1

    def get(self) -> int:
        # Acquire read lock
        with self.read_lock:
            self.read_count += 1
            if self.read_count == 1:
                self.write_lock.acquire()

        # Read the value
        value = self.count

        # Release read lock
        with self.read_lock:
            self.read_count -= 1
            if self.read_count == 0:
                self.write_lock.release()

        return value'''

print("✅ All Python implementations created for Design Problems questions")
print(f"Q1 starter length: {len(q1_python_starter)}")
print(f"Q1 solution length: {len(q1_python_solution)}")
print(f"Q2 starter length: {len(q2_python_starter)}")
print(f"Q2 solution length: {len(q2_python_solution)}")
print(f"Q3 starter length: {len(q3_python_starter)}")
print(f"Q3 solution length: {len(q3_python_solution)}")
print(f"Q4 starter length: {len(q4_python_starter)}")
print(f"Q4 solution length: {len(q4_python_solution)}")
