import React, { useState, useEffect, useRef } from 'react';

// Problem definitions
const PROBLEMS = [
  {
    id: "lru_cache",
    title: "LRU Cache with TTL",
    difficulty: "Medium",
    company: "Meta",
    description: `## Problem Description

You're given a partially implemented LRU (Least Recently Used) Cache with some bugs. Your task is to fix the bugs and extend the functionality.

## Current Implementation

The cache should support:
- \`get(key)\` - Return the value if key exists, otherwise return -1
- \`put(key, value)\` - Insert or update the value. Evict LRU item if at capacity.

## Your Tasks

**Part 1:** Fix the bug in the \`get\` method (not updating access order correctly)

**Part 2:** Fix the \`put\` method (not handling capacity eviction properly)

**Part 3:** Add TTL (Time To Live) support - entries expire after a configurable duration

**Part 4:** Add a \`get_stats()\` method that returns hit/miss ratio

## Constraints

- 1 ≤ capacity ≤ 3000
- 0 ≤ key ≤ 10^4
- 0 ≤ value ≤ 10^5
- TTL is in seconds (0 means no expiration)

## Example

\`\`\`
cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
cache.get(1)      # returns 1
cache.put(3, 3)   # evicts key 2 (LRU)
cache.get(2)      # returns -1 (not found)
cache.get(3)      # returns 3
\`\`\``,
    files: {
      "lru_cache.py": `from collections import OrderedDict
import time

class LRUCache:
    def __init__(self, capacity: int, ttl: int = 0):
        self.capacity = capacity
        self.ttl = ttl  # Time to live in seconds (0 = no expiration)
        self.cache = OrderedDict()
        self.timestamps = {}  # For TTL tracking
        self.hits = 0
        self.misses = 0

    def get(self, key: int) -> int:
        """
        Get value by key. Returns -1 if not found.
        BUG: Not updating the access order correctly!
        """
        if key not in self.cache:
            self.misses += 1
            return -1

        # BUG: Should move to end to mark as recently used
        # Currently not updating order at all!
        self.hits += 1
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        """
        Insert or update key-value pair.
        BUG: Not handling eviction correctly!
        """
        if key in self.cache:
            # Update existing key
            self.cache[key] = value
            # BUG: Should move to end after update
            return

        # BUG: Should check capacity BEFORE adding new item
        self.cache[key] = value

        if len(self.cache) > self.capacity:
            # Evict least recently used (first item)
            # BUG: Using wrong method to remove first item
            del self.cache[key]  # Wrong! This deletes the new item!

    def _is_expired(self, key: int) -> bool:
        """Check if a key has expired based on TTL"""
        # TODO: Implement TTL expiration check
        pass

    def get_stats(self) -> dict:
        """
        Return cache statistics including hit/miss ratio.
        TODO: Implement this method
        """
        pass
`,
      "test_lru.py": `import unittest
import time
from lru_cache import LRUCache

class TestLRUCache(unittest.TestCase):

    def test_basic_operations(self):
        """Test basic get and put operations"""
        cache = LRUCache(2)
        cache.put(1, 1)
        cache.put(2, 2)

        self.assertEqual(cache.get(1), 1)

    def test_lru_eviction(self):
        """Test that LRU item is evicted when at capacity"""
        cache = LRUCache(2)
        cache.put(1, 1)
        cache.put(2, 2)
        cache.get(1)      # Access key 1, making key 2 the LRU
        cache.put(3, 3)   # Should evict key 2

        self.assertEqual(cache.get(2), -1)  # Key 2 should be evicted
        self.assertEqual(cache.get(1), 1)   # Key 1 should still exist
        self.assertEqual(cache.get(3), 3)   # Key 3 should exist

    def test_update_existing(self):
        """Test updating an existing key"""
        cache = LRUCache(2)
        cache.put(1, 1)
        cache.put(2, 2)
        cache.put(1, 10)  # Update key 1

        self.assertEqual(cache.get(1), 10)

        cache.put(3, 3)   # Should evict key 2, not key 1
        self.assertEqual(cache.get(2), -1)
        self.assertEqual(cache.get(1), 10)

    def test_capacity_one(self):
        """Test cache with capacity of 1"""
        cache = LRUCache(1)
        cache.put(1, 1)
        cache.put(2, 2)

        self.assertEqual(cache.get(1), -1)
        self.assertEqual(cache.get(2), 2)

if __name__ == '__main__':
    unittest.main()
`,
      "main.py": `from lru_cache import LRUCache

def main():
    print("=== LRU Cache Test ===\\n")

    # Basic test
    cache = LRUCache(2)

    print("Creating cache with capacity 2")
    print("put(1, 1)")
    cache.put(1, 1)

    print("put(2, 2)")
    cache.put(2, 2)

    print(f"get(1) = {cache.get(1)}")  # Should return 1

    print("put(3, 3)  # Should evict key 2")
    cache.put(3, 3)

    print(f"get(2) = {cache.get(2)}")  # Should return -1
    print(f"get(3) = {cache.get(3)}")  # Should return 3

    print("\\n--- Current cache state ---")
    print(f"Cache contents: {dict(cache.cache)}")

if __name__ == "__main__":
    main()
`
    },
    testOutput: `=== Running Tests ===

test_basic_operations ... PASSED

test_lru_eviction ... FAILED
  AssertionError: -1 != 1
  Key 1 was incorrectly evicted instead of key 2

test_update_existing ... FAILED
  AssertionError: -1 != 10
  Updated key was evicted due to incorrect order tracking

test_capacity_one ... FAILED
  KeyError: 2
  Eviction logic error when cache is full

----------------------------------------------------------------------
Ran 4 tests in 0.003s

FAILED (failures=3)`,
    hints: [
      "In get(): Use cache.move_to_end(key) to mark the key as recently used",
      "In put(): When updating, also call move_to_end() to update access order",
      "In put(): Check capacity and evict BEFORE adding new item, use cache.popitem(last=False)",
      "For TTL: Store timestamps in a separate dict, check expiration in get()",
    ],
  },
  {
    id: "rate_limiter",
    title: "API Rate Limiter",
    difficulty: "Medium",
    company: "Meta",
    description: `## Problem Description

You're implementing a rate limiter for an API gateway. The current implementation uses a sliding window algorithm but has several bugs.

## Requirements

- Limit requests per user per time window
- Support multiple rate limit tiers (free, premium, enterprise)
- Track and return remaining quota
- Handle concurrent requests safely

## Your Tasks

**Part 1:** Fix the sliding window calculation (currently allows too many requests)

**Part 2:** Fix the \`is_allowed\` return value (should return remaining quota info)

**Part 3:** Implement \`get_wait_time()\` - how long until user can make another request

**Part 4:** Add support for burst allowance (allow short bursts above limit)

## Constraints

- Window size: 1 second to 1 hour
- Max requests per window: 1 to 10,000
- User IDs are strings up to 64 characters

## Example

\`\`\`python
limiter = RateLimiter(max_requests=100, window_seconds=60)

result = limiter.is_allowed("user123")
# Returns: {"allowed": True, "remaining": 99, "reset_at": 1705312345}

# After 100 requests...
result = limiter.is_allowed("user123")
# Returns: {"allowed": False, "remaining": 0, "retry_after": 45}
\`\`\``,
    files: {
      "rate_limiter.py": `import time
from collections import defaultdict
from typing import Dict, List
from dataclasses import dataclass

@dataclass
class RateLimitConfig:
    max_requests: int
    window_seconds: int
    burst_allowance: int = 0


class RateLimiter:
    def __init__(self, max_requests: int = 100, window_seconds: int = 60):
        self.config = RateLimitConfig(max_requests, window_seconds)
        self.requests: Dict[str, List[float]] = defaultdict(list)

    def _get_current_time(self) -> float:
        return time.time()

    def _clean_old_requests(self, user_id: str) -> None:
        current_time = self._get_current_time()
        window_start = current_time - self.config.window_seconds

        # BUG: Wrong comparison - keeps old instead of recent!
        self.requests[user_id] = [
            ts for ts in self.requests[user_id]
            if ts < window_start  # Should be >= to keep recent
        ]

    def is_allowed(self, user_id: str) -> bool:
        # BUG: Not cleaning old requests before checking!
        current_requests = len(self.requests[user_id])

        if current_requests >= self.config.max_requests:
            return False

        self.requests[user_id].append(self._get_current_time())
        return True

    def get_remaining(self, user_id: str) -> int:
        self._clean_old_requests(user_id)
        current = len(self.requests[user_id])
        return max(0, self.config.max_requests - current)

    def get_wait_time(self, user_id: str) -> float:
        # TODO: Implement this
        pass
`,
      "test_rate_limiter.py": `import unittest
from rate_limiter import RateLimiter

class TestRateLimiter(unittest.TestCase):

    def test_allows_under_limit(self):
        limiter = RateLimiter(max_requests=5, window_seconds=60)
        for i in range(5):
            self.assertTrue(limiter.is_allowed("user1"))

    def test_blocks_over_limit(self):
        limiter = RateLimiter(max_requests=3, window_seconds=60)
        for i in range(3):
            limiter.is_allowed("user1")
        self.assertFalse(limiter.is_allowed("user1"))

if __name__ == '__main__':
    unittest.main()
`,
      "main.py": `from rate_limiter import RateLimiter

def main():
    print("=== Rate Limiter Test ===\\n")
    limiter = RateLimiter(max_requests=5, window_seconds=60)

    for i in range(7):
        result = limiter.is_allowed("user123")
        remaining = limiter.get_remaining("user123")
        print(f"Request {i+1}: {'ALLOWED' if result else 'BLOCKED'} (remaining: {remaining})")

if __name__ == "__main__":
    main()
`
    },
    testOutput: `=== Running Tests ===

test_allows_under_limit ... PASSED

test_blocks_over_limit ... FAILED
  AssertionError: True is not False
  Request was allowed when it should have been blocked

----------------------------------------------------------------------
Ran 2 tests in 0.002s

FAILED (failures=1)`,
    hints: [
      "In _clean_old_requests: Change 'ts < window_start' to 'ts >= window_start'",
      "In is_allowed: Call _clean_old_requests(user_id) before checking count",
      "For get_wait_time: Find oldest request, calculate when it expires",
    ],
  },
  {
    id: "maze",
    title: "Maze Solver with Keys",
    difficulty: "Medium",
    company: "Meta",
    description: `## Problem Description

You're given a maze solver with bugs. Fix the BFS algorithm and add key collection.

## Your Tasks

**Part 1:** Fix visited tracking (duplicates being added to queue)

**Part 2:** Add key collection to BFS

**Part 3:** Handle locked doors (need matching key)

## Example

\`\`\`
S . . # .
# # . # .
. a . . .
. # # # A
. . . . E
\`\`\``,
    files: {
      "maze_solver.py": `from collections import deque

class MazeSolver:
    def __init__(self, maze):
        self.maze = maze
        self.rows = len(maze)
        self.cols = len(maze[0]) if maze else 0
        self.start = self._find_char('S')
        self.end = self._find_char('E')

    def _find_char(self, char):
        for r in range(self.rows):
            for c in range(self.cols):
                if self.maze[r][c] == char:
                    return (r, c)
        return None

    def solve_bfs(self):
        if not self.start or not self.end:
            return None

        queue = deque([(self.start, [self.start])])
        visited = set()

        while queue:
            (r, c), path = queue.popleft()

            if (r, c) == self.end:
                return path

            for dr, dc in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
                nr, nc = r + dr, c + dc

                if 0 <= nr < self.rows and 0 <= nc < self.cols:
                    if self.maze[nr][nc] != '#':
                        # BUG: Adding to visited AFTER adding to queue
                        # causes duplicates!
                        visited.add((nr, nc))
                        queue.append(((nr, nc), path + [(nr, nc)]))

        return None
`,
      "main.py": `from maze_solver import MazeSolver

maze = [
    ['S', '.', '.', '#', '.'],
    ['#', '#', '.', '#', '.'],
    ['.', '.', '.', '.', '.'],
    ['.', '#', '#', '#', '.'],
    ['.', '.', '.', '.', 'E']
]

solver = MazeSolver(maze)
path = solver.solve_bfs()
print(f"Path length: {len(path) if path else 'No path'}")
`
    },
    testOutput: `=== Running Tests ===

test_simple_maze ... FAILED
  Path contains duplicate nodes

test_visited_tracking ... FAILED
  Path length 12 > expected max 5

----------------------------------------------------------------------
FAILED (failures=2)`,
    hints: [
      "Check visited BEFORE adding to queue, not after",
      "Add starting position to visited initially",
      "For keys, track state as (position, collected_keys)",
    ],
  },
  {
    id: "text_parser",
    title: "Log Parser & Analyzer",
    difficulty: "Medium",
    company: "Meta",
    description: `## Problem Description

You're given a log file parser that processes server logs. The current implementation has bugs and missing features.

## Log Format

Each log entry follows this format:
\`\`\`
[TIMESTAMP] [LEVEL] [SERVICE] MESSAGE
\`\`\`

Example:
\`\`\`
[2024-01-15 10:30:45] [ERROR] [auth-service] Failed login attempt for user123
[2024-01-15 10:30:46] [INFO] [api-gateway] Request processed in 45ms
\`\`\`

## Your Tasks

**Part 1:** Fix the regex pattern that parses log entries (currently missing some valid logs)

**Part 2:** Fix the \`filter_by_level\` method (case sensitivity issue)

**Part 3:** Implement \`get_error_summary()\` - group errors by service with count

**Part 4:** Add \`find_slow_requests(threshold_ms)\` - find requests exceeding threshold

## Constraints

- Log files can be up to 100MB
- Timestamps are in ISO format
- Log levels: DEBUG, INFO, WARN, ERROR, FATAL
- Service names are alphanumeric with hyphens

## Example

\`\`\`python
parser = LogParser()
parser.parse_file("server.log")
parser.get_error_summary()
# Returns: {'auth-service': 5, 'api-gateway': 2}
\`\`\``,
    files: {
      "log_parser.py": `import re
from datetime import datetime
from collections import defaultdict
from typing import List, Dict, Optional

class LogEntry:
    def __init__(self, timestamp: str, level: str, service: str, message: str):
        self.timestamp = datetime.fromisoformat(timestamp)
        self.level = level.upper()
        self.service = service
        self.message = message

    def __repr__(self):
        return f"LogEntry({self.level}, {self.service}, {self.message[:30]}...)"


class LogParser:
    # BUG: Regex pattern is too strict - missing some valid formats
    LOG_PATTERN = re.compile(
        r'\\[(\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2})\\] '
        r'\\[(\\w+)\\] '  # BUG: Doesn't match service names with hyphens!
        r'\\[(\\w+)\\] '
        r'(.+)'
    )

    def __init__(self):
        self.entries: List[LogEntry] = []
        self.parse_errors: List[str] = []

    def parse_line(self, line: str) -> Optional[LogEntry]:
        """Parse a single log line into a LogEntry object."""
        line = line.strip()
        if not line:
            return None

        match = self.LOG_PATTERN.match(line)
        if not match:
            self.parse_errors.append(line)
            return None

        timestamp, level, service, message = match.groups()
        return LogEntry(timestamp, level, service, message)

    def parse_file(self, filepath: str) -> int:
        """Parse a log file and return number of entries parsed."""
        count = 0
        with open(filepath, 'r') as f:
            for line in f:
                entry = self.parse_line(line)
                if entry:
                    self.entries.append(entry)
                    count += 1
        return count

    def parse_lines(self, lines: List[str]) -> int:
        """Parse a list of log lines."""
        count = 0
        for line in lines:
            entry = self.parse_line(line)
            if entry:
                self.entries.append(entry)
                count += 1
        return count

    def filter_by_level(self, level: str) -> List[LogEntry]:
        """
        Filter entries by log level.
        BUG: Case sensitivity issue - 'error' doesn't match 'ERROR'
        """
        # BUG: Not handling case properly
        return [e for e in self.entries if e.level == level]

    def filter_by_service(self, service: str) -> List[LogEntry]:
        """Filter entries by service name."""
        return [e for e in self.entries if e.service == service]

    def filter_by_time_range(self, start: datetime, end: datetime) -> List[LogEntry]:
        """Filter entries within a time range."""
        return [e for e in self.entries if start <= e.timestamp <= end]

    def get_error_summary(self) -> Dict[str, int]:
        """
        Get count of ERROR and FATAL entries grouped by service.
        TODO: Implement this method
        """
        pass

    def find_slow_requests(self, threshold_ms: int) -> List[LogEntry]:
        """
        Find log entries mentioning response times above threshold.
        Look for patterns like "processed in Xms" or "took Xms"
        TODO: Implement this method
        """
        pass

    def get_stats(self) -> Dict:
        """Get parsing statistics."""
        level_counts = defaultdict(int)
        for entry in self.entries:
            level_counts[entry.level] += 1

        return {
            'total_entries': len(self.entries),
            'parse_errors': len(self.parse_errors),
            'by_level': dict(level_counts)
        }
`,
      "test_parser.py": `import unittest
from log_parser import LogParser, LogEntry

class TestLogParser(unittest.TestCase):

    def setUp(self):
        self.parser = LogParser()
        self.sample_logs = [
            "[2024-01-15 10:30:45] [ERROR] [auth-service] Failed login attempt",
            "[2024-01-15 10:30:46] [INFO] [api-gateway] Request processed in 45ms",
            "[2024-01-15 10:30:47] [WARN] [user-service] High memory usage detected",
            "[2024-01-15 10:30:48] [ERROR] [auth-service] Connection timeout",
            "[2024-01-15 10:30:49] [INFO] [api-gateway] Request processed in 250ms",
            "[2024-01-15 10:30:50] [FATAL] [db-connector] Database connection lost",
        ]

    def test_parse_basic_log(self):
        """Test parsing a basic log entry"""
        line = "[2024-01-15 10:30:45] [INFO] [api] Request processed"
        entry = self.parser.parse_line(line)

        self.assertIsNotNone(entry)
        self.assertEqual(entry.level, "INFO")

    def test_parse_hyphenated_service(self):
        """Test parsing log with hyphenated service name"""
        line = "[2024-01-15 10:30:45] [ERROR] [auth-service] Failed login"
        entry = self.parser.parse_line(line)

        self.assertIsNotNone(entry)
        self.assertEqual(entry.service, "auth-service")

    def test_filter_by_level_case_insensitive(self):
        """Test that level filtering is case-insensitive"""
        self.parser.parse_lines(self.sample_logs)

        errors_upper = self.parser.filter_by_level("ERROR")
        errors_lower = self.parser.filter_by_level("error")

        self.assertEqual(len(errors_upper), len(errors_lower))
        self.assertEqual(len(errors_upper), 2)

    def test_error_summary(self):
        """Test error summary by service"""
        self.parser.parse_lines(self.sample_logs)
        summary = self.parser.get_error_summary()

        self.assertIsNotNone(summary)
        self.assertEqual(summary.get('auth-service'), 2)
        self.assertEqual(summary.get('db-connector'), 1)

if __name__ == '__main__':
    unittest.main()
`,
      "main.py": `from log_parser import LogParser

def main():
    print("=== Log Parser Test ===\\n")

    sample_logs = [
        "[2024-01-15 10:30:45] [ERROR] [auth-service] Failed login attempt for user123",
        "[2024-01-15 10:30:46] [INFO] [api-gateway] Request processed in 45ms",
        "[2024-01-15 10:30:47] [WARN] [user-service] High memory usage detected",
        "[2024-01-15 10:30:48] [ERROR] [auth-service] Connection timeout after 30s",
        "[2024-01-15 10:30:49] [INFO] [api-gateway] Request processed in 250ms",
        "[2024-01-15 10:30:50] [FATAL] [db-connector] Database connection lost",
        "[2024-01-15 10:30:51] [DEBUG] [cache-layer] Cache miss for key: user_123",
    ]

    parser = LogParser()
    count = parser.parse_lines(sample_logs)

    print(f"Parsed {count} log entries")
    print(f"Parse errors: {len(parser.parse_errors)}")

    if parser.parse_errors:
        print("\\nFailed to parse:")
        for err in parser.parse_errors:
            print(f"  - {err[:50]}...")

    print("\\n--- Statistics ---")
    stats = parser.get_stats()
    print(f"Total entries: {stats['total_entries']}")
    print(f"By level: {stats['by_level']}")

    print("\\n--- Filter by ERROR level ---")
    errors = parser.filter_by_level("ERROR")
    for e in errors:
        print(f"  {e}")

if __name__ == "__main__":
    main()
`,
      "sample.log": `[2024-01-15 10:30:45] [ERROR] [auth-service] Failed login attempt for user123
[2024-01-15 10:30:46] [INFO] [api-gateway] Request processed in 45ms
[2024-01-15 10:30:47] [WARN] [user-service] High memory usage detected
[2024-01-15 10:30:48] [ERROR] [auth-service] Connection timeout after 30s
[2024-01-15 10:30:49] [INFO] [api-gateway] Request processed in 250ms
[2024-01-15 10:30:50] [FATAL] [db-connector] Database connection lost
[2024-01-15 10:30:51] [DEBUG] [cache-layer] Cache miss for key: user_123
`
    },
    testOutput: `=== Running Tests ===

test_parse_basic_log ... PASSED

test_parse_hyphenated_service ... FAILED
  AssertionError: None is not None
  Regex failed to match service name with hyphen

test_filter_by_level_case_insensitive ... FAILED
  AssertionError: 2 != 0
  filter_by_level("error") returned empty list

test_error_summary ... FAILED
  TypeError: 'NoneType' object is not subscriptable
  get_error_summary() not implemented

----------------------------------------------------------------------
Ran 4 tests in 0.002s

FAILED (failures=3)`,
    hints: [
      "Fix regex: Change \\w+ to [\\w-]+ to match hyphens in service names",
      "Fix filter_by_level: Compare level.upper() with e.level (or normalize both)",
      "For get_error_summary: Use defaultdict(int), filter for ERROR/FATAL levels",
      "For find_slow_requests: Use regex to find 'in (\\d+)ms' or 'took (\\d+)ms' patterns",
    ],
  },
  {
    id: "cards",
    title: "Card Game: Three Sum to 15",
    difficulty: "Medium",
    company: "Meta",
    description: `## Problem Description

You have a deck of cards numbered 1-9. Find all unique combinations of 3 cards that sum to a target value (default: 15).

## Your Tasks

**Part 1:** Debug the combination generator (currently missing some combinations)

**Part 2:** Optimize to avoid duplicate combinations

**Part 3:** Add support for custom target sums

**Part 4:** Handle edge cases (empty deck, insufficient cards, duplicates in deck)

## Constraints

- Card values: 1 ≤ card ≤ 9
- Each card can only be used once per combination
- Return all unique combinations

## Example

\`\`\`
Input: cards = [1,2,3,4,5,6,7,8,9], target = 15

Output:
  [1, 5, 9] = 15
  [1, 6, 8] = 15
  [2, 4, 9] = 15
  [2, 5, 8] = 15
  [2, 6, 7] = 15
  [3, 4, 8] = 15
  [3, 5, 7] = 15
  [4, 5, 6] = 15

Total: 8 combinations
\`\`\``,
    files: {
      "card_game.py": `def find_three_sum(cards, target=15):
    """
    Find all unique combinations of 3 cards that sum to target.
    Each card can only be used once.

    BUG: Currently missing some valid combinations
    """
    result = []
    cards = sorted(cards)
    n = len(cards)

    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j, n):  # BUG: Should start from j + 1
                if cards[i] + cards[j] + cards[k] == target:
                    result.append([cards[i], cards[j], cards[k]])

    return result


def find_three_sum_optimized(cards, target=15):
    """
    Optimized version using two-pointer technique.
    Time: O(n^2), Space: O(1) excluding output

    TODO: Implement this
    """
    pass


def validate_input(cards):
    """
    Validate input cards.
    TODO: Implement edge case handling
    """
    pass
`,
      "test_cards.py": `import unittest
from card_game import find_three_sum, find_three_sum_optimized

class TestCardGame(unittest.TestCase):

    def test_standard_deck(self):
        """Test with standard 1-9 deck"""
        deck = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        result = find_three_sum(deck, 15)

        expected = [
            [1, 5, 9], [1, 6, 8], [2, 4, 9], [2, 5, 8],
            [2, 6, 7], [3, 4, 8], [3, 5, 7], [4, 5, 6]
        ]
        self.assertEqual(len(result), 8)

    def test_no_duplicates(self):
        """Ensure no duplicate combinations"""
        deck = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        result = find_three_sum(deck, 15)

        unique = set(tuple(c) for c in result)
        self.assertEqual(len(unique), len(result))

    def test_custom_target(self):
        """Test with custom target sum"""
        deck = [1, 2, 3, 4, 5]
        result = find_three_sum(deck, 6)

        self.assertEqual(result, [[1, 2, 3]])

if __name__ == '__main__':
    unittest.main()
`,
      "main.py": `from card_game import find_three_sum

def main():
    deck = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    print("=== Card Game: Find Three Cards Summing to 15 ===")
    print(f"Deck: {deck}")
    print()

    combos = find_three_sum(deck)

    print("Combinations found:")
    for combo in combos:
        print(f"  {combo} = {sum(combo)}")

    print(f"\\nTotal combinations: {len(combos)}")

if __name__ == "__main__":
    main()
`
    },
    testOutput: `=== Running Tests ===

test_standard_deck ... FAILED
  AssertionError: 12 != 8 (found duplicates due to k starting at j)

test_no_duplicates ... FAILED
  AssertionError: 8 != 12

test_custom_target ... PASSED

----------------------------------------------------------------------
Ran 3 tests in 0.001s

FAILED (failures=2)`,
    hints: [
      "The bug is in the inner loop starting index - k should start from j + 1, not j",
      "This causes cards[j] to potentially be used twice when k == j",
      "For optimization, fix first element and use two pointers on remainder",
      "Skip duplicates by checking if current == previous",
    ],
  },
];

// Timer Component
function Timer({ isRunning, seconds, setSeconds }) {
  useEffect(() => {
    let interval;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds, setSeconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const isLow = seconds < 600;
  const isCritical = seconds < 300;

  return (
    <div style={{
      fontFamily: 'monospace',
      fontSize: '1.125rem',
      padding: '0.25rem 0.75rem',
      borderRadius: '0.5rem',
      backgroundColor: isCritical ? 'rgba(239, 68, 68, 0.2)' : isLow ? 'rgba(245, 158, 11, 0.2)' : 'rgba(51, 65, 85, 0.5)',
      color: isCritical ? '#f87171' : isLow ? '#fbbf24' : '#34d399'
    }}>
      {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
    </div>
  );
}

// File Explorer Component
function FileExplorer({ files, activeFile, onFileSelect, colors }) {
  return (
    <div style={{
      backgroundColor: colors.bgSecondary,
      borderRight: `1px solid ${colors.border}`,
      width: '12rem',
      flexShrink: 0,
      overflowY: 'auto'
    }}>
      <div style={{
        padding: '0.5rem',
        fontSize: '0.75rem',
        fontWeight: '500',
        color: colors.textMuted,
        textTransform: 'uppercase',
        borderBottom: `1px solid ${colors.border}`
      }}>
        Explorer
      </div>
      <div style={{ padding: '0.25rem' }}>
        {Object.keys(files).map(filename => (
          <button
            key={filename}
            onClick={() => onFileSelect(filename)}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '0.375rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: activeFile === filename ? colors.bgTertiary : 'transparent',
              color: activeFile === filename ? colors.textPrimary : colors.textSecondary,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <span style={{ color: '#facc15' }}>📄</span>
            {filename}
          </button>
        ))}
      </div>
    </div>
  );
}

// Code Editor Component
function CodeEditor({ code, onChange, filename, colors }) {
  const lineNumbers = code.split('\n').map((_, i) => i + 1);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: colors.bgPrimary, overflow: 'hidden' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: colors.bgSecondary,
        borderBottom: `1px solid ${colors.border}`
      }}>
        <div style={{ display: 'flex', gap: '0.375rem' }}>
          <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
          <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#facc15' }}></div>
          <div style={{ width: '0.75rem', height: '0.75rem', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
        </div>
        <span style={{ fontSize: '0.875rem', color: colors.textMuted, fontFamily: 'monospace', marginLeft: '0.5rem' }}>{filename}</span>
      </div>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex' }}>
        <div style={{
          padding: '1rem 0.5rem',
          textAlign: 'right',
          userSelect: 'none',
          backgroundColor: 'rgba(15, 23, 42, 0.5)',
          borderRight: `1px solid ${colors.border}`
        }}>
          {lineNumbers.map(n => (
            <div key={n} style={{ color: colors.textMuted, fontSize: '0.75rem', fontFamily: 'monospace', lineHeight: '1.5rem', paddingRight: '0.5rem' }}>{n}</div>
          ))}
        </div>
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            color: colors.textPrimary,
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            padding: '1rem',
            outline: 'none',
            resize: 'none',
            lineHeight: '1.5rem',
            border: 'none',
            tabSize: 4
          }}
        />
      </div>
    </div>
  );
}

// Terminal Component
function Terminal({ output, onRun, onTest, isRunning, colors }) {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div style={{
      height: '12rem',
      backgroundColor: colors.bgPrimary,
      borderTop: `1px solid ${colors.border}`,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.375rem 0.75rem',
        backgroundColor: colors.bgSecondary,
        borderBottom: `1px solid ${colors.border}`
      }}>
        <span style={{ fontSize: '0.75rem', fontWeight: '500', color: colors.textMuted }}>Terminal</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={onRun}
            disabled={isRunning}
            style={{
              padding: '0.25rem 0.75rem',
              backgroundColor: isRunning ? colors.bgTertiary : '#10b981',
              color: 'white',
              fontSize: '0.75rem',
              borderRadius: '0.25rem',
              border: 'none',
              cursor: isRunning ? 'not-allowed' : 'pointer'
            }}
          >
            ▶ Run
          </button>
          <button
            onClick={onTest}
            disabled={isRunning}
            style={{
              padding: '0.25rem 0.75rem',
              backgroundColor: isRunning ? colors.bgTertiary : '#3b82f6',
              color: 'white',
              fontSize: '0.75rem',
              borderRadius: '0.25rem',
              border: 'none',
              cursor: isRunning ? 'not-allowed' : 'pointer'
            }}
          >
            ✓ Run Tests
          </button>
        </div>
      </div>
      <div ref={terminalRef} style={{ flex: 1, overflow: 'auto', padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.75rem' }}>
        <pre style={{ color: colors.textSecondary, whiteSpace: 'pre-wrap', margin: 0 }}>{output || '$ Ready to run code...'}</pre>
      </div>
    </div>
  );
}

// Problem Panel Component
function ProblemPanel({ problem, colors }) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div style={{
      width: '24rem',
      backgroundColor: colors.bgSecondary,
      borderRight: `1px solid ${colors.border}`,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <div style={{ display: 'flex', borderBottom: `1px solid ${colors.border}` }}>
        {['description', 'hints'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '0.625rem 1rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              backgroundColor: activeTab === tab ? 'rgba(51, 65, 85, 0.5)' : 'transparent',
              color: activeTab === tab ? colors.textPrimary : colors.textMuted,
              borderBottom: activeTab === tab ? '2px solid #10b981' : '2px solid transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '1rem' }}>
        {activeTab === 'description' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{
                padding: '0.125rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                backgroundColor: 'rgba(234, 179, 8, 0.2)',
                color: '#facc15'
              }}>{problem.difficulty}</span>
              <span style={{
                padding: '0.125rem 0.5rem',
                borderRadius: '0.25rem',
                fontSize: '0.75rem',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                color: '#60a5fa'
              }}>{problem.company}</span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: colors.textPrimary, marginBottom: '1rem' }}>{problem.title}</h2>
            <div
              style={{ color: colors.textSecondary, fontSize: '0.875rem', lineHeight: '1.6' }}
              dangerouslySetInnerHTML={{
                __html: problem.description
                  .replace(/\n/g, '<br/>')
                  .replace(/`([^`]+)`/g, '<code style="background-color: rgba(51, 65, 85, 0.5); padding: 0.125rem 0.25rem; border-radius: 0.25rem; color: #34d399;">$1</code>')
                  .replace(/##\s+(.+)/g, '<h3 style="font-size: 1rem; font-weight: 600; color: #f1f5f9; margin-top: 1.5rem; margin-bottom: 0.5rem;">$1</h3>')
                  .replace(/\*\*(.+?)\*\*/g, '<strong style="color: #f1f5f9;">$1</strong>')
              }}
            />
          </div>
        )}

        {activeTab === 'hints' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ color: colors.textMuted, fontSize: '0.875rem', marginBottom: '0.5rem' }}>Click to reveal hints:</p>
            {problem.hints.map((hint, i) => (
              <HintCard key={i} number={i + 1} hint={hint} colors={colors} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Hint Card Component
function HintCard({ number, hint, colors }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      onClick={() => setRevealed(true)}
      style={{
        padding: '0.75rem',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        backgroundColor: revealed ? 'rgba(245, 158, 11, 0.1)' : colors.bgTertiary,
        border: `1px solid ${revealed ? 'rgba(245, 158, 11, 0.3)' : colors.border}`
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#fbbf24' }}>Hint {number}</span>
        {!revealed && <span style={{ fontSize: '0.75rem', color: colors.textMuted }}>Click to reveal</span>}
      </div>
      {revealed ? (
        <p style={{ fontSize: '0.875rem', color: 'rgba(253, 230, 138, 0.8)', margin: 0 }}>{hint}</p>
      ) : (
        <div style={{ height: '1rem', backgroundColor: colors.bgTertiary, borderRadius: '0.25rem' }}></div>
      )}
    </div>
  );
}

// AI Chat Panel Component
function AIChatPanel({ problem, code, colors }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "I'm your AI assistant for this interview. I can help debug, explain concepts, or suggest approaches. What do you need?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    setTimeout(() => {
      const responses = [
        "Looking at your code, the bug is in the comparison operator. You're using `<` when you should use `>=`. This keeps old requests instead of recent ones.",
        "To fix this, change `if ts < window_start` to `if ts >= window_start`. This will keep timestamps within the current window.",
        "For visited tracking, add nodes to visited BEFORE adding to the queue. This prevents duplicates.",
        "The time complexity is O(n). Space complexity is O(n) for storing the cache entries.",
      ];
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)]
      }]);
      setIsLoading(false);
    }, 1000);
  };

  const quickPrompts = ["What's the bug?", "How to fix it?", "Time complexity?", "Show solution"];

  return (
    <div style={{
      width: '20rem',
      backgroundColor: colors.bgSecondary,
      borderLeft: `1px solid ${colors.border}`,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 0.75rem',
        borderBottom: `1px solid ${colors.border}`,
        backgroundColor: 'rgba(51, 65, 85, 0.5)'
      }}>
        <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#34d399', borderRadius: '50%' }}></div>
        <span style={{ fontSize: '0.875rem', fontWeight: '500', color: colors.textPrimary }}>AI Assistant</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '90%',
              borderRadius: '0.5rem',
              padding: '0.5rem 0.75rem',
              fontSize: '0.875rem',
              backgroundColor: msg.role === 'user' ? '#10b981' : colors.bgTertiary,
              color: msg.role === 'user' ? 'white' : colors.textPrimary,
              border: msg.role === 'user' ? 'none' : `1px solid ${colors.border}`
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ backgroundColor: colors.bgTertiary, border: `1px solid ${colors.border}`, borderRadius: '0.5rem', padding: '0.5rem 0.75rem', color: colors.textMuted }}>
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: '0.5rem', borderTop: `1px solid ${colors.border}` }}>
        <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '0.5rem', overflowX: 'auto' }}>
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => setInput(prompt)}
              style={{
                flexShrink: 0,
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                backgroundColor: 'rgba(51, 65, 85, 0.5)',
                color: colors.textMuted,
                borderRadius: '0.25rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask for help..."
            style={{
              flex: 1,
              backgroundColor: colors.bgTertiary,
              border: `1px solid ${colors.border}`,
              borderRadius: '0.5rem',
              padding: '0.5rem 0.75rem',
              fontSize: '0.875rem',
              color: colors.textPrimary,
              outline: 'none'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            style={{
              padding: '0.5rem 0.75rem',
              backgroundColor: isLoading || !input.trim() ? colors.bgTertiary : '#10b981',
              color: 'white',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function AIInterview({ onBack }) {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [files, setFiles] = useState({});
  const [activeFile, setActiveFile] = useState('');
  const [terminalOutput, setTerminalOutput] = useState('');
  const [timerRunning, setTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(3600);
  const [isRunning, setIsRunning] = useState(false);

  const colors = {
    bgPrimary: '#0f172a',
    bgSecondary: '#1e293b',
    bgTertiary: '#334155',
    textPrimary: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textMuted: '#64748b',
    border: '#334155'
  };

  const problem = PROBLEMS.find(p => p.id === selectedProblem);

  const startProblem = (problemId) => {
    const p = PROBLEMS.find(prob => prob.id === problemId);
    setSelectedProblem(problemId);
    setFiles({ ...p.files });
    setActiveFile(Object.keys(p.files)[0]);
    setTerminalOutput('');
    setSeconds(3600);
    setTimerRunning(false);
  };

  const updateFile = (content) => {
    setFiles(prev => ({ ...prev, [activeFile]: content }));
  };

  const runCode = () => {
    setIsRunning(true);
    setTerminalOutput('$ python main.py\n\nRunning...\n');
    setTimeout(() => {
      setTerminalOutput(prev => prev + '\n=== Output ===\nSimulated output. Run tests for actual results.\n');
      setIsRunning(false);
    }, 800);
  };

  const runTests = () => {
    setIsRunning(true);
    setTerminalOutput('$ python -m pytest test_*.py -v\n\nCollecting tests...\n');
    setTimeout(() => {
      setTerminalOutput(prev => prev + (problem?.testOutput || 'Tests complete.'));
      setIsRunning(false);
    }, 1200);
  };

  // Problem Selection Screen
  if (!selectedProblem) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: colors.bgPrimary, color: colors.textPrimary, overflowX: 'hidden', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '2rem', boxSizing: 'border-box' }}>
          <div style={{ textAlign: 'left' }}>
            <button
              onClick={onBack}
              style={{
                marginBottom: '2rem',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              ← Back to Menu
            </button>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.75rem',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '9999px',
              color: '#60a5fa',
              fontSize: '0.875rem',
              marginBottom: '1.5rem'
            }}>
              Meta AI-Enabled Interview Simulator
            </div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              background: 'linear-gradient(90deg, #e2e8f0, #c4b5fd, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Practice Like the Real Interview
            </h1>
            <p style={{ color: colors.textMuted, maxWidth: '36rem', margin: '0 auto' }}>
              Full CoderPad-style environment with file explorer, code editor, terminal, and AI assistant.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {PROBLEMS.map(p => (
              <button
                key={p.id}
                onClick={() => startProblem(p.id)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  backgroundColor: 'rgba(51, 65, 85, 0.5)',
                  border: `1px solid ${colors.border}`,
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{
                    padding: '0.125rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    backgroundColor: 'rgba(234, 179, 8, 0.2)',
                    color: '#facc15'
                  }}>{p.difficulty}</span>
                  <span style={{
                    padding: '0.125rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    color: '#60a5fa'
                  }}>{p.company}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: colors.textPrimary, marginBottom: '0.5rem' }}>
                  {p.title}
                </h3>
                <p style={{ color: colors.textMuted, fontSize: '0.875rem' }}>
                  {Object.keys(p.files).length} files • 60 minutes
                </p>
              </button>
            ))}
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '0.75rem'
          }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem' }}>💡</span>
              <div>
                <div style={{ fontWeight: '500', color: '#fbbf24' }}>Interview Tips</div>
                <p style={{ color: 'rgba(253, 230, 138, 0.7)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  Use AI strategically—don't rely on it as a crutch. Review all AI-generated code carefully.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Interview Simulator Screen
  return (
    <div style={{ height: '100vh', width: '100vw', maxWidth: '100%', backgroundColor: colors.bgPrimary, color: colors.textPrimary, display: 'flex', flexDirection: 'column', overflow: 'hidden', boxSizing: 'border-box' }}>
      {/* Top Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        backgroundColor: colors.bgSecondary,
        borderBottom: `1px solid ${colors.border}`,
        width: '100%',
        boxSizing: 'border-box',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0, flex: 1 }}>
          <button
            onClick={() => setSelectedProblem(null)}
            style={{
              padding: '0.4rem 0.875rem',
              fontSize: '0.8rem',
              fontWeight: '600',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            ← Exit
          </button>
          <span style={{ fontSize: '0.875rem', color: colors.textSecondary, fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{problem.title}</span>
          <span style={{
            padding: '0.125rem 0.5rem',
            borderRadius: '0.25rem',
            fontSize: '0.75rem',
            backgroundColor: 'rgba(234, 179, 8, 0.2)',
            color: '#facc15',
            flexShrink: 0
          }}>{problem.difficulty}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
          <Timer isRunning={timerRunning} seconds={seconds} setSeconds={setSeconds} />
          <button
            onClick={() => setTimerRunning(!timerRunning)}
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: timerRunning ? '#dc2626' : '#10b981',
              color: 'white'
            }}
          >
            {timerRunning ? 'Pause' : 'Start'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', width: '100%', minWidth: 0 }}>
        <ProblemPanel problem={problem} colors={colors} />
        <FileExplorer files={files} activeFile={activeFile} onFileSelect={setActiveFile} colors={colors} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
          <CodeEditor code={files[activeFile] || ''} onChange={updateFile} filename={activeFile} colors={colors} />
          <Terminal output={terminalOutput} onRun={runCode} onTest={runTests} isRunning={isRunning} colors={colors} />
        </div>
        <AIChatPanel problem={problem} code={files[activeFile] || ''} colors={colors} />
      </div>
    </div>
  );
}
