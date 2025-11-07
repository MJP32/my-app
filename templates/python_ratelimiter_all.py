#!/usr/bin/env python3
"""
Complete Python implementations for all Rate Limiter questions
"""

# ============================================
# Question 1: Token Bucket Algorithm
# ============================================

q1_python_starter = '''class TokenBucket:
    def __init__(self, capacity: int, refill_rate: float):
        # TODO: Initialize token bucket
        pass

    def allow_request(self, timestamp: int) -> bool:
        # TODO: Refill tokens and check availability
        return False

    def _refill(self, timestamp: int):
        # TODO: Add tokens based on elapsed time
        pass'''

q1_python_solution = '''import time

class TokenBucket:
    def __init__(self, capacity: int, refill_rate: float):
        self.capacity = capacity
        self.tokens = capacity  # Start full
        self.refill_rate = refill_rate  # tokens per second
        self.last_refill_time = time.time() * 1000  # milliseconds

    def allow_request(self, timestamp: int) -> bool:
        self._refill(timestamp)

        if self.tokens > 0:
            self.tokens -= 1
            return True

        return False

    def _refill(self, timestamp: int):
        now = timestamp
        time_passed = now - self.last_refill_time

        # Calculate tokens to add
        tokens_to_add = int(time_passed / 1000.0 * self.refill_rate)

        if tokens_to_add > 0:
            self.tokens = min(self.capacity, self.tokens + tokens_to_add)
            self.last_refill_time = now

    def get_available_tokens(self) -> int:
        return self.tokens


# With request cost support
class TokenBucketWithCost:
    def __init__(self, capacity: int, refill_rate: float):
        self.capacity = capacity
        self.tokens = float(capacity)
        self.refill_rate = refill_rate
        self.last_refill_time = time.time()

    def allow_request(self, cost: int) -> bool:
        self._refill()

        if self.tokens >= cost:
            self.tokens -= cost
            return True

        return False

    def _refill(self):
        now = time.time()
        time_passed = now - self.last_refill_time

        tokens_to_add = time_passed * self.refill_rate
        self.tokens = min(self.capacity, self.tokens + tokens_to_add)
        self.last_refill_time = now

    def get_available_tokens(self) -> float:
        self._refill()
        return self.tokens


# Per-user token bucket
from threading import Lock

class RateLimiterTokenBucket:
    class Bucket:
        def __init__(self, capacity: int):
            self.tokens = capacity
            self.last_refill_time = time.time() * 1000
            self.lock = Lock()

    def __init__(self, capacity: int, refill_rate: float):
        self.buckets = {}
        self.capacity = capacity
        self.refill_rate = refill_rate
        self.buckets_lock = Lock()

    def allow_request(self, user_id: str) -> bool:
        with self.buckets_lock:
            if user_id not in self.buckets:
                self.buckets[user_id] = self.Bucket(self.capacity)

        bucket = self.buckets[user_id]

        with bucket.lock:
            self._refill(bucket)

            if bucket.tokens > 0:
                bucket.tokens -= 1
                return True
            return False

    def _refill(self, bucket):
        now = time.time() * 1000
        time_passed = now - bucket.last_refill_time

        tokens_to_add = int(time_passed / 1000.0 * self.refill_rate)

        if tokens_to_add > 0:
            bucket.tokens = min(self.capacity, bucket.tokens + tokens_to_add)
            bucket.last_refill_time = now

    def cleanup(self):
        threshold = time.time() * 1000 - 3600000  # 1 hour
        with self.buckets_lock:
            self.buckets = {
                user_id: bucket
                for user_id, bucket in self.buckets.items()
                if bucket.last_refill_time >= threshold
            }'''

# ============================================
# Question 2: Sliding Window Log
# ============================================

q2_python_starter = '''from collections import deque

class SlidingWindowLog:
    def __init__(self, max_requests: int, window_size_seconds: int):
        # TODO: Initialize sliding window log
        pass

    def allow_request(self, timestamp: int) -> bool:
        # TODO: Remove expired requests and check limit
        return False

    def _remove_expired_requests(self, timestamp: int):
        # TODO: Remove requests outside window
        pass'''

q2_python_solution = '''from collections import deque
from threading import Lock

class SlidingWindowLog:
    def __init__(self, max_requests: int, window_size_seconds: int):
        self.request_log = deque()
        self.max_requests = max_requests
        self.window_size_ms = window_size_seconds * 1000
        self.lock = Lock()

    def allow_request(self, timestamp: int) -> bool:
        with self.lock:
            self._remove_expired_requests(timestamp)

            if len(self.request_log) < self.max_requests:
                self.request_log.append(timestamp)
                return True

            return False

    def _remove_expired_requests(self, timestamp: int):
        window_start = timestamp - self.window_size_ms

        while self.request_log and self.request_log[0] <= window_start:
            self.request_log.popleft()

    def get_current_request_count(self) -> int:
        return len(self.request_log)


# Per-user sliding window log
class RateLimiterSlidingWindow:
    def __init__(self, max_requests: int, window_size_seconds: int):
        self.user_logs = {}
        self.max_requests = max_requests
        self.window_size_ms = window_size_seconds * 1000
        self.locks = {}
        self.global_lock = Lock()

    def allow_request(self, user_id: str, timestamp: int) -> bool:
        with self.global_lock:
            if user_id not in self.user_logs:
                self.user_logs[user_id] = deque()
                self.locks[user_id] = Lock()

        log = self.user_logs[user_id]
        lock = self.locks[user_id]

        with lock:
            self._remove_expired_requests(log, timestamp)

            if len(log) < self.max_requests:
                log.append(timestamp)
                return True
            return False

    def _remove_expired_requests(self, log: deque, timestamp: int):
        window_start = timestamp - self.window_size_ms

        while log and log[0] <= window_start:
            log.popleft()

    def cleanup(self):
        import time
        threshold = time.time() * 1000 - self.window_size_ms
        with self.global_lock:
            self.user_logs = {
                user_id: log
                for user_id, log in self.user_logs.items()
                if log and log[0] >= threshold
            }


# Using list with binary search for efficient range queries
import bisect

class SlidingWindowLogBisect:
    def __init__(self, max_requests: int, window_size_seconds: int):
        self.request_log = []
        self.max_requests = max_requests
        self.window_size_ms = window_size_seconds * 1000
        self.lock = Lock()

    def allow_request(self, timestamp: int) -> bool:
        with self.lock:
            self._remove_expired_requests(timestamp)

            if len(self.request_log) < self.max_requests:
                bisect.insort(self.request_log, timestamp)
                return True

            return False

    def _remove_expired_requests(self, timestamp: int):
        window_start = timestamp - self.window_size_ms
        # Find first index that should be kept
        idx = bisect.bisect_right(self.request_log, window_start)
        self.request_log = self.request_log[idx:]


# Space-optimized: using circular buffer
class SlidingWindowCircular:
    def __init__(self, max_requests: int, window_size_seconds: int):
        self.timestamps = [0] * max_requests
        self.max_requests = max_requests
        self.window_size_ms = window_size_seconds * 1000
        self.head = 0
        self.size = 0
        self.lock = Lock()

    def allow_request(self, timestamp: int) -> bool:
        with self.lock:
            # Count valid requests in window
            valid_count = 0
            window_start = timestamp - self.window_size_ms

            for i in range(self.size):
                idx = (self.head + i) % self.max_requests
                if self.timestamps[idx] > window_start:
                    valid_count += 1

            if valid_count < self.max_requests:
                self.timestamps[(self.head + self.size) % self.max_requests] = timestamp
                if self.size < self.max_requests:
                    self.size += 1
                else:
                    self.head = (self.head + 1) % self.max_requests
                return True

            return False'''

# ============================================
# Question 3: Fixed Window Counter
# ============================================

q3_python_starter = '''class FixedWindowCounter:
    def __init__(self, max_requests: int, window_size_seconds: int):
        # TODO: Initialize fixed window counter
        pass

    def allow_request(self, timestamp: int) -> bool:
        # TODO: Get current window and check count
        return False

    def _get_window_key(self, timestamp: int) -> int:
        # TODO: Calculate window key
        return 0'''

q3_python_solution = '''from threading import Lock

class FixedWindowCounter:
    def __init__(self, max_requests: int, window_size_seconds: int):
        self.max_requests = max_requests
        self.window_size_ms = window_size_seconds * 1000
        self.windows = {}
        self.lock = Lock()

    def allow_request(self, timestamp: int) -> bool:
        with self.lock:
            window_key = self._get_window_key(timestamp)
            current_count = self.windows.get(window_key, 0)

            if current_count < self.max_requests:
                self.windows[window_key] = current_count + 1
                return True

            return False

    def _get_window_key(self, timestamp: int) -> int:
        return timestamp // self.window_size_ms

    def cleanup(self, current_timestamp: int):
        current_window = self._get_window_key(current_timestamp)
        with self.lock:
            self.windows = {
                key: count
                for key, count in self.windows.items()
                if key >= current_window
            }


# Per-user fixed window counter
class RateLimiterFixedWindow:
    class WindowData:
        def __init__(self, key: int):
            self.window_key = key
            self.count = 0
            self.lock = Lock()

    def __init__(self, max_requests: int, window_size_seconds: int):
        self.user_windows = {}
        self.max_requests = max_requests
        self.window_size_ms = window_size_seconds * 1000
        self.global_lock = Lock()

    def allow_request(self, user_id: str, timestamp: int) -> bool:
        window_key = timestamp // self.window_size_ms

        with self.global_lock:
            if user_id not in self.user_windows:
                self.user_windows[user_id] = self.WindowData(window_key)

        data = self.user_windows[user_id]

        with data.lock:
            # Reset if new window
            if data.window_key != window_key:
                data.window_key = window_key
                data.count = 0

            if data.count < self.max_requests:
                data.count += 1
                return True
            return False

    def cleanup(self):
        import time
        current_window = int(time.time() * 1000) // self.window_size_ms
        with self.global_lock:
            self.user_windows = {
                user_id: data
                for user_id, data in self.user_windows.items()
                if data.window_key >= current_window - 1
            }


# Sliding Window Counter (hybrid approach)
class SlidingWindowCounter:
    def __init__(self, max_requests: int, window_size_seconds: int):
        self.windows = {}
        self.max_requests = max_requests
        self.window_size_ms = window_size_seconds * 1000
        self.lock = Lock()

    def allow_request(self, timestamp: int) -> bool:
        with self.lock:
            current_window = timestamp // self.window_size_ms
            previous_window = current_window - 1

            previous_count = self.windows.get(previous_window, 0)
            current_count = self.windows.get(current_window, 0)

            # Calculate weighted count
            window_progress = (timestamp % self.window_size_ms) / self.window_size_ms
            estimated_count = previous_count * (1 - window_progress) + current_count

            if estimated_count < self.max_requests:
                self.windows[current_window] = current_count + 1
                return True

            return False

    def cleanup(self, timestamp: int):
        current_window = timestamp // self.window_size_ms
        with self.lock:
            self.windows = {
                key: count
                for key, count in self.windows.items()
                if key >= current_window - 1
            }


# Using atomic operations
from threading import RLock

class FixedWindowCounterAtomic:
    class Window:
        def __init__(self, key: int):
            self.key = key
            self.count = 0
            self.lock = RLock()

    def __init__(self, max_requests: int, window_size_seconds: int):
        self.user_windows = {}
        self.max_requests = max_requests
        self.window_size_ms = window_size_seconds * 1000
        self.global_lock = RLock()

    def allow_request(self, user_id: str, timestamp: int) -> bool:
        window_key = timestamp // self.window_size_ms

        with self.global_lock:
            if user_id not in self.user_windows or self.user_windows[user_id].key != window_key:
                self.user_windows[user_id] = self.Window(window_key)

            window = self.user_windows[user_id]

        with window.lock:
            window.count += 1
            return window.count <= self.max_requests'''

# ============================================
# Question 4: Leaky Bucket
# ============================================

q4_python_starter = '''from collections import deque

class LeakyBucket:
    def __init__(self, capacity: int, leak_rate: float):
        # TODO: Initialize leaky bucket
        pass

    def add_request(self, timestamp: int) -> bool:
        # TODO: Leak requests and check capacity
        return False

    def _leak(self, timestamp: int):
        # TODO: Remove leaked requests
        pass'''

q4_python_solution = '''from collections import deque
from threading import Lock
import time

class LeakyBucket:
    def __init__(self, capacity: int, leak_rate: float):
        self.bucket = deque()
        self.capacity = capacity
        self.leak_rate = leak_rate  # requests per second
        self.last_leak_time = time.time() * 1000
        self.lock = Lock()

    def add_request(self, timestamp: int) -> bool:
        with self.lock:
            self._leak(timestamp)

            if len(self.bucket) < self.capacity:
                self.bucket.append(timestamp)
                return True

            return False

    def _leak(self, timestamp: int):
        time_passed = timestamp - self.last_leak_time
        requests_to_leak = int(time_passed / 1000.0 * self.leak_rate)

        for _ in range(requests_to_leak):
            if not self.bucket:
                break
            self.bucket.popleft()

        if requests_to_leak > 0:
            self.last_leak_time = timestamp

    def get_queue_size(self) -> int:
        return len(self.bucket)


# Using water level instead of queue
class LeakyBucketWaterLevel:
    def __init__(self, capacity: int, leak_rate: float):
        self.water_level = 0.0
        self.capacity = capacity
        self.leak_rate = leak_rate
        self.last_leak_time = time.time() * 1000
        self.lock = Lock()

    def add_request(self, timestamp: int) -> bool:
        with self.lock:
            self._leak(timestamp)

            if self.water_level < self.capacity:
                self.water_level += 1.0
                return True

            return False

    def _leak(self, timestamp: int):
        time_passed = timestamp - self.last_leak_time
        leaked = (time_passed / 1000.0) * self.leak_rate

        self.water_level = max(0, self.water_level - leaked)
        self.last_leak_time = timestamp

    def get_water_level(self) -> float:
        return self.water_level


# Per-user leaky bucket
class RateLimiterLeakyBucket:
    class Bucket:
        def __init__(self):
            self.water_level = 0.0
            self.last_leak_time = time.time() * 1000
            self.lock = Lock()

    def __init__(self, capacity: int, leak_rate: float):
        self.buckets = {}
        self.capacity = capacity
        self.leak_rate = leak_rate
        self.global_lock = Lock()

    def allow_request(self, user_id: str, timestamp: int) -> bool:
        with self.global_lock:
            if user_id not in self.buckets:
                self.buckets[user_id] = self.Bucket()

        bucket = self.buckets[user_id]

        with bucket.lock:
            self._leak(bucket, timestamp)

            if bucket.water_level < self.capacity:
                bucket.water_level += 1.0
                return True
            return False

    def _leak(self, bucket, timestamp: int):
        time_passed = timestamp - bucket.last_leak_time
        leaked = (time_passed / 1000.0) * self.leak_rate

        bucket.water_level = max(0, bucket.water_level - leaked)
        bucket.last_leak_time = timestamp

    def cleanup(self):
        threshold = time.time() * 1000 - 3600000  # 1 hour
        with self.global_lock:
            self.buckets = {
                user_id: bucket
                for user_id, bucket in self.buckets.items()
                if not (bucket.water_level == 0 and bucket.last_leak_time < threshold)
            }


# With priority support
import heapq

class LeakyBucketPriority:
    class Request:
        def __init__(self, timestamp: int, priority: int):
            self.timestamp = timestamp
            self.priority = priority

        def __lt__(self, other):
            # Higher priority first (reverse comparison)
            return self.priority > other.priority

    def __init__(self, capacity: int, leak_rate: float):
        self.bucket = []  # Min heap
        self.capacity = capacity
        self.leak_rate = leak_rate
        self.last_leak_time = time.time() * 1000
        self.lock = Lock()

    def add_request(self, timestamp: int, priority: int) -> bool:
        with self.lock:
            self._leak(timestamp)

            if len(self.bucket) < self.capacity:
                heapq.heappush(self.bucket, self.Request(timestamp, priority))
                return True

            return False

    def _leak(self, timestamp: int):
        time_passed = timestamp - self.last_leak_time
        requests_to_leak = int(time_passed / 1000.0 * self.leak_rate)

        for _ in range(requests_to_leak):
            if not self.bucket:
                break
            heapq.heappop(self.bucket)

        if requests_to_leak > 0:
            self.last_leak_time = timestamp'''

print("✅ All Python implementations created for Rate Limiter questions")
print(f"Q1 starter length: {len(q1_python_starter)}")
print(f"Q1 solution length: {len(q1_python_solution)}")
print(f"Q2 starter length: {len(q2_python_starter)}")
print(f"Q2 solution length: {len(q2_python_solution)}")
print(f"Q3 starter length: {len(q3_python_starter)}")
print(f"Q3 solution length: {len(q3_python_solution)}")
print(f"Q4 starter length: {len(q4_python_starter)}")
print(f"Q4 solution length: {len(q4_python_solution)}")
