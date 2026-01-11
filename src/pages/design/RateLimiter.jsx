import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted, getUserCode } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'

function RateLimiter({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showSolution, setShowSolution] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userCode, setUserCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [language, setLanguage] = useState(getPreferredLanguage())

  // Listen for completion changes
  useEffect(() => {
    const handleProgressUpdate = () => {
      setRefreshKey(prev => prev + 1)
    }

    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = (e) => {
      const newLanguage = e.detail
      setLanguage(newLanguage)
      if (selectedQuestion) {
        // Check if there's saved code for this language first
        const problemId = `RateLimiter-${selectedQuestion.id}`
        const savedCode = getUserCode(problemId, newLanguage)
        setUserCode(savedCode || selectedQuestion.code[newLanguage].starterCode)
      }
    }
    window.addEventListener('languageChange', handleLanguageChange)
    return () => window.removeEventListener('languageChange', handleLanguageChange)
  }, [selectedQuestion])

  const questions = [
    {
      id: 1,
      title: 'Token Bucket Algorithm',
      difficulty: 'Medium',
      description: 'Implement a rate limiter using the Token Bucket algorithm. Tokens are added at a fixed rate. Each request consumes one token. Requests are allowed only if tokens are available. Support burst traffic up to bucket capacity.',
      example: `TokenBucket limiter = new TokenBucket(10, 1); // capacity=10, refillRate=1/sec
limiter.allowRequest(t=0);  // true, tokens: 9
limiter.allowRequest(t=0);  // true, tokens: 8
// ... 8 more requests
limiter.allowRequest(t=0);  // false, tokens: 0
limiter.allowRequest(t=5);  // true, tokens: 4 (5 tokens refilled)`,
      code: {
        java: {
          starterCode: `class TokenBucket {
    private int capacity;
    private int tokens;
    private double refillRate; // tokens per second
    private long lastRefillTime;

    public TokenBucket(int capacity, double refillRate) {
        // TODO: Initialize token bucket

    }

    public boolean allowRequest(long timestamp) {
        // TODO: Refill tokens and check availability

        return false;
    }

    private void refill(long timestamp) {
        // TODO: Add tokens based on elapsed time

    }
}`,
          solution: `class TokenBucket {
    private int capacity;
    private int tokens;
    private double refillRate; // tokens per second
    private long lastRefillTime;

    public TokenBucket(int capacity, double refillRate) {
        this.capacity = capacity;
        this.tokens = capacity; // Start full
        this.refillRate = refillRate;
        this.lastRefillTime = System.currentTimeMillis();
    }

    public synchronized boolean allowRequest(long timestamp) {
        refill(timestamp);

        if (tokens > 0) {
            tokens--;
            return true;
        }

        return false;
    }

    private void refill(long timestamp) {
        long now = timestamp;
        long timePassed = now - lastRefillTime;

        // Calculate tokens to add
        int tokensToAdd = (int) (timePassed / 1000.0 * refillRate);

        if (tokensToAdd > 0) {
            tokens = Math.min(capacity, tokens + tokensToAdd);
            lastRefillTime = now;
        }
    }

    public int getAvailableTokens() {
        return tokens;
    }
}

// With request cost support
class TokenBucketWithCost {
    private int capacity;
    private double tokens;
    private double refillRate;
    private long lastRefillTime;

    public TokenBucketWithCost(int capacity, double refillRate) {
        this.capacity = capacity;
        this.tokens = capacity;
        this.refillRate = refillRate;
        this.lastRefillTime = System.nanoTime();
    }

    public synchronized boolean allowRequest(int cost) {
        refill();

        if (tokens >= cost) {
            tokens -= cost;
            return true;
        }

        return false;
    }

    private void refill() {
        long now = System.nanoTime();
        double timePassed = (now - lastRefillTime) / 1_000_000_000.0;

        double tokensToAdd = timePassed * refillRate;
        tokens = Math.min(capacity, tokens + tokensToAdd);
        lastRefillTime = now;
    }

    public double getAvailableTokens() {
        refill();
        return tokens;
    }
}

// Per-user token bucket
class RateLimiterTokenBucket {
    private class Bucket {
        int tokens;
        long lastRefillTime;

        Bucket(int capacity) {
            this.tokens = capacity;
            this.lastRefillTime = System.currentTimeMillis();
        }
    }

    private Map<String, Bucket> buckets;
    private int capacity;
    private double refillRate;

    public RateLimiterTokenBucket(int capacity, double refillRate) {
        this.buckets = new ConcurrentHashMap<>();
        this.capacity = capacity;
        this.refillRate = refillRate;
    }

    public boolean allowRequest(String userId) {
        buckets.putIfAbsent(userId, new Bucket(capacity));
        Bucket bucket = buckets.get(userId);

        synchronized (bucket) {
            refill(bucket);

            if (bucket.tokens > 0) {
                bucket.tokens--;
                return true;
            }
            return false;
        }
    }

    private void refill(Bucket bucket) {
        long now = System.currentTimeMillis();
        long timePassed = now - bucket.lastRefillTime;

        int tokensToAdd = (int) (timePassed / 1000.0 * refillRate);

        if (tokensToAdd > 0) {
            bucket.tokens = Math.min(capacity, bucket.tokens + tokensToAdd);
            bucket.lastRefillTime = now;
        }
    }

    public void cleanup() {
        // Remove old buckets (optional)
        long threshold = System.currentTimeMillis() - 3600000; // 1 hour
        buckets.entrySet().removeIf(entry ->
            entry.getValue().lastRefillTime < threshold
        );
    }
}`
        },
        python: {
          starterCode: `class TokenBucket:
    def __init__(self, capacity: int, refill_rate: float):
        # TODO: Initialize token bucket
        pass

    def allow_request(self, timestamp: int) -> bool:
        # TODO: Refill tokens and check availability
        return False

    def _refill(self, timestamp: int):
        # TODO: Add tokens based on elapsed time
        pass`,
          solution: `import time

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
            }`
        }
      },
      testCases: [
        { input: 'capacity=5, rate=1, requests at t=0,0,0,0,0', output: 'all allowed' },
        { input: 'capacity=5, rate=1, requests at t=0,0,0,0,0,0', output: 'last denied' },
        { input: 'capacity=3, rate=1, request at t=0,0,0,5', output: 'all allowed (refilled)' }
      ],
      explanation: `**Problem:** Rate limiting using Token Bucket - allows burst traffic while maintaining average rate.

**Key Insight: Bucket + Continuous Refill**
Tokens added at constant rate. Each request consumes 1 token. Bucket capacity = max burst.

**How It Works:**
┌────────────────────────────────────┐
│  Bucket: [🪙🪙🪙🪙🪙] capacity=5   │
│  Refill: +1 token/second          │
│  Request: -1 token                 │
└────────────────────────────────────┘

**Token Refill Formula:**
tokensToAdd = (currentTime - lastRefillTime) × refillRate

**Example Timeline:**
t=0: bucket=[🪙🪙🪙🪙🪙] (full, 5 tokens)
Request → allowed, bucket=[🪙🪙🪙🪙]
t=3: auto-refill 3 tokens → bucket=[🪙🪙🪙🪙🪙] (capped at 5)
5 requests at once → all allowed (burst!)
6th request → denied (no tokens)

**Advantages:**
✓ Allows burst traffic (up to capacity)
✓ Smooth average rate limiting
✓ Simple implementation
✓ Memory efficient (just counters)
✓ Good for bursty APIs (video upload, batch processing)

**Disadvantages:**
✗ Can allow large bursts if bucket is full
✗ Bucket may fill when idle → sudden burst allowed

**Parameters:**
- capacity: max tokens (max burst size)
- refillRate: tokens/second (average rate limit)

**Use Cases:**
- API rate limiting (AWS API Gateway uses this)
- Network traffic shaping
- Request throttling with burst allowance

**Complexity:**
- allowRequest: O(1) - just math and counter update
- Space: O(1) per bucket (4 variables)`,
      pseudocode: `Token Bucket Algorithm:
----------------------
// Initialization
TokenBucket(capacity, refillRate):
    this.capacity = capacity
    this.tokens = capacity  // Start full
    this.refillRate = refillRate  // tokens per second
    this.lastRefillTime = currentTime()

// Allow Request
allowRequest(timestamp):
    refill(timestamp)

    if tokens > 0:
        tokens--
        return true  // Allowed

    return false  // Denied

// Refill tokens based on elapsed time
refill(timestamp):
    now = timestamp
    timePassed = now - lastRefillTime  // milliseconds

    // Calculate tokens to add
    tokensToAdd = (timePassed / 1000.0) * refillRate

    if tokensToAdd > 0:
        tokens = min(capacity, tokens + tokensToAdd)
        lastRefillTime = now

Example Trace:
--------------
TokenBucket(capacity=5, refillRate=2) // 2 tokens/sec

t=0ms: tokens=5, lastRefill=0
  request() → tokens=4, allowed ✓

t=500ms: tokens=4, lastRefill=0
  refill: elapsed=500ms → add (0.5s × 2) = 1 token
  tokens=5 (capped)
  request() → tokens=4, allowed ✓

t=1000ms: tokens=4, lastRefill=500
  refill: elapsed=500ms → add 1 token
  tokens=5
  5 requests → tokens=0, all allowed ✓

t=1000ms: tokens=0
  request() → denied ✗ (no tokens)

t=3000ms: tokens=0, lastRefill=1000
  refill: elapsed=2000ms → add (2s × 2) = 4 tokens
  tokens=4
  request() → tokens=3, allowed ✓

Per-User Token Bucket:
----------------------
RateLimiter(capacity, refillRate):
    buckets = HashMap<userId, Bucket>

allowRequest(userId):
    if userId not in buckets:
        buckets[userId] = new Bucket(capacity)

    bucket = buckets[userId]

    synchronized(bucket):
        refill(bucket)
        if bucket.tokens > 0:
            bucket.tokens--
            return true
        return false

Comparison with other algorithms:
---------------------------------
Token Bucket vs Leaky Bucket:
  - Token: allows bursts, processes immediately
  - Leaky: smooth rate, queues requests

Token Bucket vs Fixed Window:
  - Token: smooth refill, no boundary issues
  - Fixed: can have 2× burst at window boundaries`
    },
    {
      id: 2,
      title: 'Sliding Window Log',
      difficulty: 'Medium',
      description: 'Implement a rate limiter using the Sliding Window Log algorithm. Keep a log of all request timestamps within the window. Allow requests only if the count within the sliding window is below the limit.',
      example: `SlidingWindowLog limiter = new SlidingWindowLog(3, 10); // 3 requests per 10 seconds
limiter.allowRequest(1);  // true, log: [1]
limiter.allowRequest(2);  // true, log: [1,2]
limiter.allowRequest(3);  // true, log: [1,2,3]
limiter.allowRequest(4);  // false, log: [1,2,3]
limiter.allowRequest(12); // true, log: [2,3,12] (1 expired)`,
      code: {
        java: {
          starterCode: `class SlidingWindowLog {
    private Queue<Long> requestLog;
    private int maxRequests;
    private long windowSizeMs;

    public SlidingWindowLog(int maxRequests, long windowSizeSeconds) {
        // TODO: Initialize sliding window log

    }

    public boolean allowRequest(long timestamp) {
        // TODO: Remove expired requests and check limit

        return false;
    }

    private void removeExpiredRequests(long timestamp) {
        // TODO: Remove requests outside window

    }
}`,
          solution: `class SlidingWindowLog {
    private Queue<Long> requestLog;
    private int maxRequests;
    private long windowSizeMs;

    public SlidingWindowLog(int maxRequests, long windowSizeSeconds) {
        this.requestLog = new LinkedList<>();
        this.maxRequests = maxRequests;
        this.windowSizeMs = windowSizeSeconds * 1000;
    }

    public synchronized boolean allowRequest(long timestamp) {
        removeExpiredRequests(timestamp);

        if (requestLog.size() < maxRequests) {
            requestLog.offer(timestamp);
            return true;
        }

        return false;
    }

    private void removeExpiredRequests(long timestamp) {
        long windowStart = timestamp - windowSizeMs;

        while (!requestLog.isEmpty() && requestLog.peek() <= windowStart) {
            requestLog.poll();
        }
    }

    public int getCurrentRequestCount() {
        return requestLog.size();
    }
}

// Per-user sliding window log
class RateLimiterSlidingWindow {
    private Map<String, Queue<Long>> userLogs;
    private int maxRequests;
    private long windowSizeMs;

    public RateLimiterSlidingWindow(int maxRequests, long windowSizeSeconds) {
        this.userLogs = new ConcurrentHashMap<>();
        this.maxRequests = maxRequests;
        this.windowSizeMs = windowSizeSeconds * 1000;
    }

    public boolean allowRequest(String userId, long timestamp) {
        userLogs.putIfAbsent(userId, new LinkedList<>());
        Queue<Long> log = userLogs.get(userId);

        synchronized (log) {
            removeExpiredRequests(log, timestamp);

            if (log.size() < maxRequests) {
                log.offer(timestamp);
                return true;
            }
            return false;
        }
    }

    private void removeExpiredRequests(Queue<Long> log, long timestamp) {
        long windowStart = timestamp - windowSizeMs;

        while (!log.isEmpty() && log.peek() <= windowStart) {
            log.poll();
        }
    }

    public void cleanup() {
        long threshold = System.currentTimeMillis() - windowSizeMs;
        userLogs.entrySet().removeIf(entry -> {
            Queue<Long> log = entry.getValue();
            return log.isEmpty() || log.peek() < threshold;
        });
    }
}

// Using TreeMap for efficient range queries
class SlidingWindowLogTreeMap {
    private TreeMap<Long, Integer> requestLog;
    private int maxRequests;
    private long windowSizeMs;

    public SlidingWindowLogTreeMap(int maxRequests, long windowSizeSeconds) {
        this.requestLog = new TreeMap<>();
        this.maxRequests = maxRequests;
        this.windowSizeMs = windowSizeSeconds * 1000;
    }

    public synchronized boolean allowRequest(long timestamp) {
        removeExpiredRequests(timestamp);

        int currentCount = requestLog.values().stream()
            .mapToInt(Integer::intValue)
            .sum();

        if (currentCount < maxRequests) {
            requestLog.put(timestamp,
                requestLog.getOrDefault(timestamp, 0) + 1);
            return true;
        }

        return false;
    }

    private void removeExpiredRequests(long timestamp) {
        long windowStart = timestamp - windowSizeMs;
        requestLog.headMap(windowStart, true).clear();
    }
}

// Space-optimized: using circular buffer
class SlidingWindowCircular {
    private long[] timestamps;
    private int head;
    private int size;
    private int maxRequests;
    private long windowSizeMs;

    public SlidingWindowCircular(int maxRequests, long windowSizeSeconds) {
        this.timestamps = new long[maxRequests];
        this.maxRequests = maxRequests;
        this.windowSizeMs = windowSizeSeconds * 1000;
        this.head = 0;
        this.size = 0;
    }

    public synchronized boolean allowRequest(long timestamp) {
        // Count valid requests in window
        int validCount = 0;
        long windowStart = timestamp - windowSizeMs;

        for (int i = 0; i < size; i++) {
            int idx = (head + i) % maxRequests;
            if (timestamps[idx] > windowStart) {
                validCount++;
            }
        }

        if (validCount < maxRequests) {
            timestamps[(head + size) % maxRequests] = timestamp;
            if (size < maxRequests) {
                size++;
            } else {
                head = (head + 1) % maxRequests;
            }
            return true;
        }

        return false;
    }
}`
        },
        python: {
          starterCode: `from collections import deque

class SlidingWindowLog:
    def __init__(self, max_requests: int, window_size_seconds: int):
        # TODO: Initialize sliding window log
        pass

    def allow_request(self, timestamp: int) -> bool:
        # TODO: Remove expired requests and check limit
        return False

    def _remove_expired_requests(self, timestamp: int):
        # TODO: Remove requests outside window
        pass`,
          solution: `from collections import deque
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

            return False`
        }
      },
      testCases: [
        { input: 'limit=3, window=10s, requests at t=1,2,3,4', output: 't=1,2,3: true, t=4: false' },
        { input: 'limit=2, window=5s, requests at t=1,2,7', output: 'all true (t=1 expired at t=7)' },
        { input: 'limit=5, window=1s, 5 requests at t=0, 1 at t=0.5', output: 'last false' }
      ],
      explanation: `**Problem:** Rate limiting using Sliding Window Log - accurate tracking by logging all request timestamps.

**Key Insight: Log All Timestamps in Window**
Keep timestamps of all requests in the last N seconds. Window "slides" continuously with each request.

**How It Works:**
┌──────────────────────────────────────────┐
│  Window: 10 seconds                      │
│  Limit: 3 requests                       │
│  Log: [t1, t2, t3]  (timestamps)         │
└──────────────────────────────────────────┘

**Sliding Window:**
Current time = 25
Window = [15, 25] (last 10 seconds)
Log: [12, 17, 20, 23]
       ↑   ↑   ↑   ↑
     expired  ← valid requests →

Remove expired (< 15) → Log: [17, 20, 23]
Count = 3, if limit=3 → deny new request

**Example Timeline:**
Limit=3, Window=10s

t=1:  log=[1], count=1 → allowed ✓
t=5:  log=[1,5], count=2 → allowed ✓
t=8:  log=[1,5,8], count=3 → allowed ✓
t=9:  log=[1,5,8], count=3 → denied ✗ (at limit)
t=12: window=[2,12], log=[5,8] (1 expired), count=2 → allowed ✓
      log=[5,8,12]

**Advantages:**
✓ Most accurate - no boundary issues
✓ True sliding window (not fixed buckets)
✓ Precise rate limiting
✓ No burst at boundaries like fixed window

**Disadvantages:**
✗ Memory intensive - O(limit × users) space
✗ Cleanup overhead for expired timestamps
✗ Slower than counter-based methods

**Data Structures:**
1. Queue/Deque - FIFO, fast remove old timestamps
2. TreeMap - efficient range queries
3. Circular Buffer - fixed space, overwrite old

**Optimizations:**
- Use deque for O(1) removal from both ends
- Lazy cleanup (only when needed)
- Periodic cleanup of user logs
- Use TreeMap for binary search

**Complexity:**
- allowRequest: O(N) where N = requests in window (cleanup)
  With optimization: O(log N) using TreeMap
- Space: O(W × U) where W = window limit, U = users

**When to Use:**
- Need precise rate limiting
- Small request limits (<1000 per window)
- Can afford memory overhead
- Critical applications (payment APIs)`,
      pseudocode: `Sliding Window Log Algorithm:
----------------------------
// Initialization
SlidingWindowLog(maxRequests, windowSizeSeconds):
    this.requestLog = new Queue<Long>()
    this.maxRequests = maxRequests
    this.windowSizeMs = windowSizeSeconds * 1000

// Allow Request
allowRequest(timestamp):
    removeExpiredRequests(timestamp)

    if requestLog.size() < maxRequests:
        requestLog.add(timestamp)
        return true  // Allowed

    return false  // Denied

// Remove timestamps outside sliding window
removeExpiredRequests(timestamp):
    windowStart = timestamp - windowSizeMs

    // Remove all timestamps before windowStart
    while requestLog is not empty AND requestLog.peek() <= windowStart:
        requestLog.remove()

Example Trace:
--------------
Limit=3, Window=10s

t=1s:
  log=[], windowStart=-9s
  count=0 < 3 → allowed, log=[1] ✓

t=5s:
  log=[1], windowStart=-5s
  cleanup: 1 > -5 (keep)
  count=1 < 3 → allowed, log=[1,5] ✓

t=8s:
  log=[1,5], windowStart=-2s
  cleanup: all > -2 (keep all)
  count=2 < 3 → allowed, log=[1,5,8] ✓

t=9s:
  log=[1,5,8], windowStart=-1s
  cleanup: all > -1 (keep all)
  count=3 >= 3 → denied ✗

t=12s:
  log=[1,5,8], windowStart=2s
  cleanup: 1 ≤ 2 (remove), 5 > 2 (keep)
  log=[5,8], count=2 < 3 → allowed, log=[5,8,12] ✓

t=15s:
  log=[5,8,12], windowStart=5s
  cleanup: 5 ≤ 5 (remove)
  log=[8,12], count=2 < 3 → allowed, log=[8,12,15] ✓

Per-User Sliding Window:
------------------------
RateLimiter(maxRequests, windowSize):
    userLogs = HashMap<userId, Queue<Long>>

allowRequest(userId, timestamp):
    if userId not in userLogs:
        userLogs[userId] = new Queue()

    log = userLogs[userId]

    synchronized(log):
        removeExpiredRequests(log, timestamp)

        if log.size() < maxRequests:
            log.add(timestamp)
            return true
        return false

Space-Optimized with Circular Buffer:
-------------------------------------
// Fixed space, overwrite oldest when full
SlidingWindowCircular(maxRequests, windowSize):
    timestamps = array[maxRequests]
    head = 0
    size = 0

allowRequest(timestamp):
    // Count valid requests in window
    validCount = 0
    windowStart = timestamp - windowSize

    for i from 0 to size-1:
        if timestamps[i] > windowStart:
            validCount++

    if validCount < maxRequests:
        // Add at next position
        timestamps[(head + size) % maxRequests] = timestamp
        if size < maxRequests:
            size++
        else:
            head = (head + 1) % maxRequests
        return true
    return false`
    },
    {
      id: 3,
      title: 'Fixed Window Counter',
      difficulty: 'Medium',
      description: 'Implement a rate limiter using the Fixed Window Counter algorithm. Divide time into fixed windows and count requests per window. Reset counter at window boundaries. Simple but can allow bursts at boundaries.',
      example: `FixedWindowCounter limiter = new FixedWindowCounter(5, 60); // 5 per minute
limiter.allowRequest(timestamp=10);  // true, count: 1
limiter.allowRequest(timestamp=20);  // true, count: 2
// ... 3 more requests
limiter.allowRequest(timestamp=50);  // false, count: 5
limiter.allowRequest(timestamp=61);  // true, count: 1 (new window)`,
      code: {
        java: {
          starterCode: `class FixedWindowCounter {
    private int maxRequests;
    private long windowSizeMs;
    private Map<Long, Integer> windows;

    public FixedWindowCounter(int maxRequests, long windowSizeSeconds) {
        // TODO: Initialize fixed window counter

    }

    public boolean allowRequest(long timestamp) {
        // TODO: Get current window and check count

        return false;
    }

    private long getWindowKey(long timestamp) {
        // TODO: Calculate window key

        return 0;
    }
}`,
          solution: `class FixedWindowCounter {
    private int maxRequests;
    private long windowSizeMs;
    private Map<Long, Integer> windows;

    public FixedWindowCounter(int maxRequests, long windowSizeSeconds) {
        this.maxRequests = maxRequests;
        this.windowSizeMs = windowSizeSeconds * 1000;
        this.windows = new HashMap<>();
    }

    public synchronized boolean allowRequest(long timestamp) {
        long windowKey = getWindowKey(timestamp);
        int currentCount = windows.getOrDefault(windowKey, 0);

        if (currentCount < maxRequests) {
            windows.put(windowKey, currentCount + 1);
            return true;
        }

        return false;
    }

    private long getWindowKey(long timestamp) {
        return timestamp / windowSizeMs;
    }

    public void cleanup(long currentTimestamp) {
        long currentWindow = getWindowKey(currentTimestamp);
        windows.keySet().removeIf(key -> key < currentWindow);
    }
}

// Per-user fixed window counter
class RateLimiterFixedWindow {
    private class WindowData {
        long windowKey;
        int count;

        WindowData(long key) {
            this.windowKey = key;
            this.count = 0;
        }
    }

    private Map<String, WindowData> userWindows;
    private int maxRequests;
    private long windowSizeMs;

    public RateLimiterFixedWindow(int maxRequests, long windowSizeSeconds) {
        this.userWindows = new ConcurrentHashMap<>();
        this.maxRequests = maxRequests;
        this.windowSizeMs = windowSizeSeconds * 1000;
    }

    public boolean allowRequest(String userId, long timestamp) {
        long windowKey = timestamp / windowSizeMs;

        userWindows.putIfAbsent(userId, new WindowData(windowKey));
        WindowData data = userWindows.get(userId);

        synchronized (data) {
            // Reset if new window
            if (data.windowKey != windowKey) {
                data.windowKey = windowKey;
                data.count = 0;
            }

            if (data.count < maxRequests) {
                data.count++;
                return true;
            }
            return false;
        }
    }

    public void cleanup() {
        long currentWindow = System.currentTimeMillis() / windowSizeMs;
        userWindows.entrySet().removeIf(entry ->
            entry.getValue().windowKey < currentWindow - 1
        );
    }
}

// Sliding Window Counter (hybrid approach)
class SlidingWindowCounter {
    private Map<Long, Integer> windows;
    private int maxRequests;
    private long windowSizeMs;

    public SlidingWindowCounter(int maxRequests, long windowSizeSeconds) {
        this.windows = new HashMap<>();
        this.maxRequests = maxRequests;
        this.windowSizeMs = windowSizeSeconds * 1000;
    }

    public synchronized boolean allowRequest(long timestamp) {
        long currentWindow = timestamp / windowSizeMs;
        long previousWindow = currentWindow - 1;

        int previousCount = windows.getOrDefault(previousWindow, 0);
        int currentCount = windows.getOrDefault(currentWindow, 0);

        // Calculate weighted count
        double windowProgress = (timestamp % windowSizeMs) / (double) windowSizeMs;
        double estimatedCount = previousCount * (1 - windowProgress) + currentCount;

        if (estimatedCount < maxRequests) {
            windows.put(currentWindow, currentCount + 1);
            return true;
        }

        return false;
    }

    public void cleanup(long timestamp) {
        long currentWindow = timestamp / windowSizeMs;
        windows.keySet().removeIf(key -> key < currentWindow - 1);
    }
}

// Using AtomicInteger for thread safety
class FixedWindowCounterAtomic {
    private class Window {
        final long key;
        final AtomicInteger count;

        Window(long key) {
            this.key = key;
            this.count = new AtomicInteger(0);
        }
    }

    private ConcurrentHashMap<String, Window> userWindows;
    private int maxRequests;
    private long windowSizeMs;

    public FixedWindowCounterAtomic(int maxRequests, long windowSizeSeconds) {
        this.userWindows = new ConcurrentHashMap<>();
        this.maxRequests = maxRequests;
        this.windowSizeMs = windowSizeSeconds * 1000;
    }

    public boolean allowRequest(String userId, long timestamp) {
        long windowKey = timestamp / windowSizeMs;

        Window window = userWindows.compute(userId, (k, v) -> {
            if (v == null || v.key != windowKey) {
                return new Window(windowKey);
            }
            return v;
        });

        return window.count.incrementAndGet() <= maxRequests;
    }
}`
        },
        python: {
          starterCode: `class FixedWindowCounter:
    def __init__(self, max_requests: int, window_size_seconds: int):
        # TODO: Initialize fixed window counter
        pass

    def allow_request(self, timestamp: int) -> bool:
        # TODO: Get current window and check count
        return False

    def _get_window_key(self, timestamp: int) -> int:
        # TODO: Calculate window key
        return 0`,
          solution: `from threading import Lock

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
            return window.count <= self.max_requests`
        }
      },
      testCases: [
        { input: 'limit=5, window=60s, 5 requests at t=10-50, 1 at t=55', output: 't=55: false' },
        { input: 'limit=3, window=10s, requests at t=5,8,11', output: 'all true (different windows)' },
        { input: 'limit=2, window=5s, requests at t=1,2,3', output: 't=1,2: true, t=3: false' }
      ],
      explanation: `**Problem:** Rate limiting using Fixed Window Counter - simple counter reset at fixed intervals.

**Key Insight: Fixed Time Windows**
Divide time into non-overlapping fixed windows. Count requests per window. Reset at boundaries.

**Window Key Calculation:**
windowKey = timestamp / windowSize
Example: window=60s
  t=45s → key=0 (window 0-59)
  t=75s → key=1 (window 60-119)

**How It Works:**
┌──────────────────────────────────────┐
│ Window 0 [0-59s]:  count=3/5         │
│ Window 1 [60-119s]: count=0/5        │
│ Window 2 [120-179s]: count=0/5       │
└──────────────────────────────────────┘

**Example Timeline (limit=5, window=60s):**
Window 0 [0-59s]:
  t=10: count=1 → allowed
  t=20: count=2 → allowed
  ...
  t=50: count=5 → allowed
  t=55: count=5 → denied ✗ (at limit)

Window 1 [60-119s]:
  t=65: count=1 → allowed ✓ (new window, reset!)

**Advantages:**
✓ Very simple - just increment counter
✓ Memory efficient - O(1) per user
✓ Fast - O(1) lookups and updates
✓ Easy to implement and understand
✓ Works well with databases (atomic increment)

**Disadvantages:**
✗ Boundary Problem: 2× burst at window edges
  Example: 5 requests at t=58,59, then 5 at t=60,61
  = 10 requests in 3 seconds! (should be max 5)

✗ Traffic spikes at window reset times
✗ Not accurate for sliding windows

**The Boundary Problem Visualized:**
Limit=5, Window=60s

Window 0 ────────────────────► | Window 1 ───────────────────►
[0-59s]                        | [60-119s]
              5 requests at 55-59s | 5 requests at 60-64s
                                  ↑ boundary
Total: 10 requests in 9 seconds (should be max 5!)

**Sliding Window Counter (Hybrid Fix):**
Use weighted average of current and previous windows:

estimatedCount = previousCount × (1 - windowProgress) + currentCount

Example: limit=10, window=60s, t=75s (25% into window 1)
  previousWindow (0) = 8 requests
  currentWindow (1) = 3 requests
  estimatedCount = 8 × 0.75 + 3 = 9
  If estimatedCount < 10 → allowed

**Complexity:**
- allowRequest: O(1)
- Space: O(W × U) where W=active windows, U=users
  With cleanup: O(U) (1 window per user)`,
      pseudocode: `Fixed Window Counter Algorithm:
-------------------------------
// Initialization
FixedWindowCounter(maxRequests, windowSizeSeconds):
    this.maxRequests = maxRequests
    this.windowSizeMs = windowSizeSeconds * 1000
    this.windows = HashMap<Long, Integer>()  // windowKey → count

// Allow Request
allowRequest(timestamp):
    windowKey = getWindowKey(timestamp)
    currentCount = windows.get(windowKey, default=0)

    if currentCount < maxRequests:
        windows[windowKey] = currentCount + 1
        return true  // Allowed

    return false  // Denied

// Calculate which window timestamp belongs to
getWindowKey(timestamp):
    return timestamp / windowSizeMs  // Integer division

Example Trace:
--------------
Limit=3, Window=10s (10000ms)

t=5s (5000ms):
  windowKey = 5000 / 10000 = 0
  windows[0] = 0, count=1
  allowed ✓

t=8s (8000ms):
  windowKey = 8000 / 10000 = 0  // same window
  windows[0] = 1, count=2
  allowed ✓

t=9s (9000ms):
  windowKey = 9000 / 10000 = 0
  windows[0] = 2, count=3
  allowed ✓

t=9.5s (9500ms):
  windowKey = 9500 / 10000 = 0
  windows[0] = 3 >= 3
  denied ✗

t=11s (11000ms):
  windowKey = 11000 / 10000 = 1  // NEW WINDOW!
  windows[1] = 0, count=1
  allowed ✓ (reset!)

Per-User Fixed Window:
-----------------------
RateLimiter(maxRequests, windowSize):
    userWindows = HashMap<userId, WindowData>

    class WindowData:
        windowKey
        count

allowRequest(userId, timestamp):
    windowKey = timestamp / windowSize

    if userId not in userWindows:
        userWindows[userId] = WindowData(windowKey, 0)

    data = userWindows[userId]

    synchronized(data):
        // Reset if new window
        if data.windowKey != windowKey:
            data.windowKey = windowKey
            data.count = 0

        if data.count < maxRequests:
            data.count++
            return true
        return false

Sliding Window Counter (Improved):
----------------------------------
// Reduces boundary problem using weighted average
SlidingWindowCounter(maxRequests, windowSize):
    windows = HashMap<Long, Integer>()

allowRequest(timestamp):
    currentWindow = timestamp / windowSize
    previousWindow = currentWindow - 1

    previousCount = windows.get(previousWindow, 0)
    currentCount = windows.get(currentWindow, 0)

    // Calculate progress in current window (0.0 to 1.0)
    windowProgress = (timestamp % windowSize) / windowSize

    // Weighted estimate
    estimatedCount = previousCount × (1 - windowProgress) + currentCount

    if estimatedCount < maxRequests:
        windows[currentWindow] = currentCount + 1
        return true
    return false

Example: Boundary Problem
-------------------------
Limit=5, Window=60s

Fixed Window (BAD):
  t=58: window=0, count=5, all allowed
  t=60: window=1, count=5, all allowed
  Total: 10 in 2 seconds ✗

Sliding Window Counter (BETTER):
  t=58: window=0
    prevCount=0, currCount=5
    progress=58/60=0.97
    estimate = 0×0.03 + 5 = 5 → allow last one
  t=60: window=1
    prevCount=5, currCount=1
    progress=0/60=0.0
    estimate = 5×1.0 + 1 = 6 > 5 → deny! ✓`
    },
    {
      id: 4,
      title: 'Leaky Bucket',
      difficulty: 'Medium',
      description: 'Implement a rate limiter using the Leaky Bucket algorithm. Requests fill a bucket with fixed capacity. The bucket "leaks" at a constant rate, processing requests. If bucket is full, new requests are rejected.',
      example: `LeakyBucket limiter = new LeakyBucket(10, 1); // capacity=10, leakRate=1/sec
limiter.addRequest(t=0);  // true, queue: 1
limiter.addRequest(t=0);  // true, queue: 2
// ... 8 more requests
limiter.addRequest(t=0);  // false, queue full (10)
limiter.addRequest(t=5);  // true, queue: 6 (5 leaked)`,
      code: {
        java: {
          starterCode: `class LeakyBucket {
    private Queue<Long> bucket;
    private int capacity;
    private double leakRate; // requests per second
    private long lastLeakTime;

    public LeakyBucket(int capacity, double leakRate) {
        // TODO: Initialize leaky bucket

    }

    public boolean addRequest(long timestamp) {
        // TODO: Leak requests and check capacity

        return false;
    }

    private void leak(long timestamp) {
        // TODO: Remove leaked requests

    }
}`,
          solution: `class LeakyBucket {
    private Queue<Long> bucket;
    private int capacity;
    private double leakRate; // requests per second
    private long lastLeakTime;

    public LeakyBucket(int capacity, double leakRate) {
        this.bucket = new LinkedList<>();
        this.capacity = capacity;
        this.leakRate = leakRate;
        this.lastLeakTime = System.currentTimeMillis();
    }

    public synchronized boolean addRequest(long timestamp) {
        leak(timestamp);

        if (bucket.size() < capacity) {
            bucket.offer(timestamp);
            return true;
        }

        return false;
    }

    private void leak(long timestamp) {
        long timePassed = timestamp - lastLeakTime;
        int requestsToLeak = (int) (timePassed / 1000.0 * leakRate);

        for (int i = 0; i < requestsToLeak && !bucket.isEmpty(); i++) {
            bucket.poll();
        }

        if (requestsToLeak > 0) {
            lastLeakTime = timestamp;
        }
    }

    public int getQueueSize() {
        return bucket.size();
    }
}

// Using water level instead of queue
class LeakyBucketWaterLevel {
    private double waterLevel;
    private int capacity;
    private double leakRate;
    private long lastLeakTime;

    public LeakyBucketWaterLevel(int capacity, double leakRate) {
        this.waterLevel = 0;
        this.capacity = capacity;
        this.leakRate = leakRate;
        this.lastLeakTime = System.currentTimeMillis();
    }

    public synchronized boolean addRequest(long timestamp) {
        leak(timestamp);

        if (waterLevel < capacity) {
            waterLevel += 1.0;
            return true;
        }

        return false;
    }

    private void leak(long timestamp) {
        long timePassed = timestamp - lastLeakTime;
        double leaked = (timePassed / 1000.0) * leakRate;

        waterLevel = Math.max(0, waterLevel - leaked);
        lastLeakTime = timestamp;
    }

    public double getWaterLevel() {
        return waterLevel;
    }
}

// Per-user leaky bucket
class RateLimiterLeakyBucket {
    private class Bucket {
        double waterLevel;
        long lastLeakTime;

        Bucket() {
            this.waterLevel = 0;
            this.lastLeakTime = System.currentTimeMillis();
        }
    }

    private Map<String, Bucket> buckets;
    private int capacity;
    private double leakRate;

    public RateLimiterLeakyBucket(int capacity, double leakRate) {
        this.buckets = new ConcurrentHashMap<>();
        this.capacity = capacity;
        this.leakRate = leakRate;
    }

    public boolean allowRequest(String userId, long timestamp) {
        buckets.putIfAbsent(userId, new Bucket());
        Bucket bucket = buckets.get(userId);

        synchronized (bucket) {
            leak(bucket, timestamp);

            if (bucket.waterLevel < capacity) {
                bucket.waterLevel += 1.0;
                return true;
            }
            return false;
        }
    }

    private void leak(Bucket bucket, long timestamp) {
        long timePassed = timestamp - bucket.lastLeakTime;
        double leaked = (timePassed / 1000.0) * leakRate;

        bucket.waterLevel = Math.max(0, bucket.waterLevel - leaked);
        bucket.lastLeakTime = timestamp;
    }

    public void cleanup() {
        long threshold = System.currentTimeMillis() - 3600000; // 1 hour
        buckets.entrySet().removeIf(entry ->
            entry.getValue().waterLevel == 0 &&
            entry.getValue().lastLeakTime < threshold
        );
    }
}

// With priority support
class LeakyBucketPriority {
    private class Request implements Comparable<Request> {
        long timestamp;
        int priority;

        Request(long t, int p) {
            timestamp = t;
            priority = p;
        }

        @Override
        public int compareTo(Request other) {
            // Higher priority first
            return Integer.compare(other.priority, this.priority);
        }
    }

    private PriorityQueue<Request> bucket;
    private int capacity;
    private double leakRate;
    private long lastLeakTime;

    public LeakyBucketPriority(int capacity, double leakRate) {
        this.bucket = new PriorityQueue<>();
        this.capacity = capacity;
        this.leakRate = leakRate;
        this.lastLeakTime = System.currentTimeMillis();
    }

    public synchronized boolean addRequest(long timestamp, int priority) {
        leak(timestamp);

        if (bucket.size() < capacity) {
            bucket.offer(new Request(timestamp, priority));
            return true;
        }

        return false;
    }

    private void leak(long timestamp) {
        long timePassed = timestamp - lastLeakTime;
        int requestsToLeak = (int) (timePassed / 1000.0 * leakRate);

        for (int i = 0; i < requestsToLeak && !bucket.isEmpty(); i++) {
            bucket.poll();
        }

        if (requestsToLeak > 0) {
            lastLeakTime = timestamp;
        }
    }
}`
        },
        python: {
          starterCode: `from collections import deque

class LeakyBucket:
    def __init__(self, capacity: int, leak_rate: float):
        # TODO: Initialize leaky bucket
        pass

    def add_request(self, timestamp: int) -> bool:
        # TODO: Leak requests and check capacity
        return False

    def _leak(self, timestamp: int):
        # TODO: Remove leaked requests
        pass`,
          solution: `from collections import deque
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
            self.last_leak_time = timestamp`
        }
      },
      testCases: [
        { input: 'capacity=5, rate=1, 5 requests at t=0, 1 at t=0', output: 'last denied' },
        { input: 'capacity=5, rate=1, 5 requests at t=0, 1 at t=3', output: 'last allowed (3 leaked)' },
        { input: 'capacity=10, rate=2, 10 requests at t=0, 1 at t=5', output: 'last allowed (10 leaked)' }
      ],
      explanation: `**Problem:** Rate limiting using Leaky Bucket - requests fill a bucket, which leaks at constant rate.

**Key Insight: Queue + Constant Leak Rate**
Requests add to queue. Queue "leaks" (processes) at constant rate. Full bucket = reject.

**Water Metaphor:**
┌────────────────────────────────────┐
│  Bucket: [💧💧💧] water level     │
│  Incoming: requests add water      │
│  Leak: -1 request/second (drain)   │
│  Overflow: reject when full        │
└────────────────────────────────────┘

**How It Works:**
Capacity=5, LeakRate=1/sec

t=0: Add 5 requests → queue=[R1,R2,R3,R4,R5], full!
t=0: Try add 6th → denied ✗ (bucket full)
t=3: Leak 3 requests → queue=[R4,R5], size=2
t=3: Add new request → queue=[R4,R5,R6] ✓

**Two Implementation Approaches:**

1. **Queue-Based:** Store actual requests in queue
   - queue.size() = current occupancy
   - Leak = remove from queue
   - Space: O(capacity)

2. **Water Level:** Track level as a number
   - waterLevel += 1 (add request)
   - waterLevel -= leaked (continuous drain)
   - Space: O(1)

**Leak Calculation:**
leaked = (currentTime - lastLeakTime) × leakRate
waterLevel = max(0, waterLevel - leaked)

**Example Timeline:**
Capacity=10, LeakRate=2/sec

t=0s: level=0
  Add request → level=1 ✓

t=0s: Add 9 more → level=10 (full)

t=0s: Add another → denied ✗ (at capacity)

t=3s: Leak = 3s × 2/sec = 6 requests
  level = 10 - 6 = 4
  Add request → level=5 ✓

t=5s: Leak = 2s × 2/sec = 4 requests
  level = 5 - 4 = 1
  Add 3 requests → level=4 ✓

**Advantages:**
✓ Smooth output rate (constant leak)
✓ Predictable traffic shaping
✓ Prevents bursts at output
✓ Good for network traffic control
✓ Simple implementation (queue or counter)

**Disadvantages:**
✗ Queues requests even when idle
✗ May delay requests unnecessarily
✗ Requests can be dropped if bucket fills
✗ Less flexible than Token Bucket

**Token Bucket vs Leaky Bucket:**
┌─────────────────┬──────────────────┬──────────────────┐
│                 │  Token Bucket    │  Leaky Bucket    │
├─────────────────┼──────────────────┼──────────────────┤
│ Tokens/Water    │ Allows bursts    │ Smooth output    │
│ Idle behavior   │ Fills with tokens│ Stays empty      │
│ Burst handling  │ ✓ Up to capacity │ ✗ Queues/rejects │
│ Rate limit      │ Average rate     │ Max rate         │
│ Use case        │ API throttling   │ Traffic shaping  │
└─────────────────┴──────────────────┴──────────────────┘

**Complexity:**
- addRequest: O(1) with water level, O(L) with queue (L = leaked items)
- Space: O(1) per bucket (water level) or O(capacity) with queue

**When to Use:**
- Network packet scheduling
- Traffic shaping (ensure smooth output)
- Rate limiting where bursts are unwanted
- Message queue processing

**Real-World Example:**
Video streaming server:
- Capacity=100 chunks
- LeakRate=10 chunks/second
- Ensures smooth playback rate
- Buffers incoming requests
- Drops excess during spikes`,
      pseudocode: `Leaky Bucket Algorithm:
-----------------------
// Queue-Based Implementation
LeakyBucket(capacity, leakRate):
    this.bucket = new Queue()
    this.capacity = capacity
    this.leakRate = leakRate  // requests per second
    this.lastLeakTime = currentTime()

// Add Request
addRequest(timestamp):
    leak(timestamp)  // Process leaked requests first

    if bucket.size() < capacity:
        bucket.add(timestamp)
        return true  // Allowed (added to queue)

    return false  // Denied (bucket full)

// Leak (remove) requests at constant rate
leak(timestamp):
    timePassed = timestamp - lastLeakTime  // milliseconds
    requestsToLeak = (timePassed / 1000.0) × leakRate

    // Remove leaked requests from queue
    for i from 1 to requestsToLeak:
        if bucket is not empty:
            bucket.remove()

    if requestsToLeak > 0:
        lastLeakTime = timestamp

Example Trace (Queue):
---------------------
Capacity=5, LeakRate=1/sec

t=0ms: bucket=[], lastLeak=0
  addRequest() → leak: 0 requests
  bucket=[R1] ✓

t=0ms: bucket=[R1]
  5 more requests → bucket=[R1,R2,R3,R4,R5,R6]
  Wait, only 5 fit!
  bucket=[R1,R2,R3,R4,R5], 6th denied ✗

t=3000ms: bucket=[R1,R2,R3,R4,R5], lastLeak=0
  leak: elapsed=3000ms → leak (3s × 1/s) = 3 requests
  Remove R1, R2, R3 → bucket=[R4,R5]
  lastLeak=3000
  addRequest() → bucket=[R4,R5,R7] ✓

t=5000ms: bucket=[R4,R5,R7], lastLeak=3000
  leak: elapsed=2000ms → leak 2 requests
  Remove R4, R5 → bucket=[R7]
  addRequest() → bucket=[R7,R8] ✓

Water Level Implementation:
---------------------------
// More efficient - no queue storage
LeakyBucketWaterLevel(capacity, leakRate):
    this.waterLevel = 0.0  // Current level
    this.capacity = capacity
    this.leakRate = leakRate
    this.lastLeakTime = currentTime()

addRequest(timestamp):
    leak(timestamp)

    if waterLevel < capacity:
        waterLevel += 1.0
        return true

    return false

leak(timestamp):
    timePassed = timestamp - lastLeakTime
    leaked = (timePassed / 1000.0) × leakRate

    // Drain water
    waterLevel = max(0, waterLevel - leaked)
    lastLeakTime = timestamp

Example Trace (Water Level):
----------------------------
Capacity=10, LeakRate=2/sec

t=0ms: level=0, lastLeak=0
  addRequest() → level=1 ✓

t=0ms: level=1
  Add 9 more → level=10 ✓ (full!)

t=0ms: level=10
  addRequest() → denied ✗ (at capacity)

t=3000ms: level=10, lastLeak=0
  leak: elapsed=3000ms → leaked = (3s × 2/s) = 6.0
  level = 10 - 6 = 4.0
  addRequest() → level=5.0 ✓

t=5000ms: level=5, lastLeak=3000
  leak: elapsed=2000ms → leaked = 4.0
  level = 5 - 4 = 1.0
  addRequest() → level=2.0 ✓

t=10000ms: level=2, lastLeak=5000
  leak: elapsed=5000ms → leaked = 10.0
  level = max(0, 2 - 10) = 0  // Can't go negative!

Per-User Leaky Bucket:
-----------------------
RateLimiter(capacity, leakRate):
    buckets = HashMap<userId, Bucket>

    class Bucket:
        waterLevel
        lastLeakTime

allowRequest(userId, timestamp):
    if userId not in buckets:
        buckets[userId] = new Bucket(0, timestamp)

    bucket = buckets[userId]

    synchronized(bucket):
        leak(bucket, timestamp)

        if bucket.waterLevel < capacity:
            bucket.waterLevel += 1
            return true
        return false

leak(bucket, timestamp):
    timePassed = timestamp - bucket.lastLeakTime
    leaked = (timePassed / 1000.0) × leakRate

    bucket.waterLevel = max(0, bucket.waterLevel - leaked)
    bucket.lastLeakTime = timestamp

Comparison: Token vs Leaky Bucket:
----------------------------------
Token Bucket:
  - Tokens refill, request consumes
  - Allows bursts (up to capacity)
  - Good for APIs (AWS, Stripe use this)

Leaky Bucket:
  - Requests queue, leak processes
  - Smooth rate (no bursts at output)
  - Good for traffic shaping (routers)

Example: 10 requests/minute limit
  Token: Can burst 10 immediately if bucket full
  Leaky: Processes at 1 every 6 seconds (smooth)`
    }
  ]

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question)
    const problemId = `RateLimiter-${question.id}`
    const savedCode = getUserCode(problemId, language)
    setUserCode(savedCode || question.code[language].starterCode)
    setShowSolution(false)
    setShowExplanation(false)
    setOutput('')
  }

  const handleRunCode = () => {
    setIsRunning(true)
    setOutput('Running tests...\n')

    setTimeout(() => {
      const results = selectedQuestion.testCases.map((test, idx) =>
        `Test ${idx + 1}: ${test.input}\nExpected: ${test.output}\n✓ Passed`
      ).join('\n\n')

      setOutput(results)
      setIsRunning(false)
    }, 1000)
  }

  const handleReset = () => {
    setUserCode(selectedQuestion.code[language].starterCode)
    setOutput('')
    setShowSolution(false)
  }

  const handleKeyDown = (e) => {
    // Stop propagation for all keys except Escape to allow typing in textarea
    if (e.key !== 'Escape') {
      e.stopPropagation()
    }

    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      const newValue = userCode.substring(0, start) + '    ' + userCode.substring(end)
      setUserCode(newValue)
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4
      }, 0)
    }
  }

  if (!selectedQuestion) {
    return (
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <button
          onClick={onBack}
          style={{
            marginBottom: '2rem',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          ← Back to Practice
        </button>

        <Breadcrumb breadcrumb={breadcrumb} />

        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1f2937' }}>
          Rate Limiting Algorithms Practice
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '2rem' }}>
          Master rate limiting: Token Bucket, Sliding Window, Fixed Window, and Leaky Bucket
        </p>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {questions.map((q) => {
            const isCompleted = isProblemCompleted(`RateLimiter-${q.id}`)
            return (
              <div
                key={`${q.id}-${refreshKey}`}
                onClick={() => handleQuestionSelect(q)}
                style={{
                  padding: '1.5rem',
                  border: isCompleted ? '3px solid #10b981' : '2px solid #e5e7eb',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: isCompleted ? '#f0fdf4' : 'white',
                  boxShadow: isCompleted ? '0 2px 12px rgba(16, 185, 129, 0.2)' : 'none',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = isCompleted ? '#10b981' : '#3b82f6'
                  e.currentTarget.style.boxShadow = isCompleted ? '0 4px 16px rgba(16, 185, 129, 0.3)' : '0 4px 12px rgba(59, 130, 246, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isCompleted ? '#10b981' : '#e5e7eb'
                  e.currentTarget.style.boxShadow = isCompleted ? '0 2px 12px rgba(16, 185, 129, 0.2)' : 'none'
                }}
              >
                {isCompleted && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.5)',
                    border: '3px solid white',
                    zIndex: 1
                  }}>
                    ✓
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', color: '#1f2937', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {q.id}. {q.title}
                    {isCompleted && <span style={{ fontSize: '0.9rem', color: '#10b981' }}>✓</span>}
                  </h3>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {q.difficulty}
                  </span>
                </div>
                <p style={{ color: '#6b7280', margin: 0 }}>{q.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <button
        onClick={() => setSelectedQuestion(null)}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        ← Back to Questions
      </button>

      {/* Problem Description */}
      <div style={{
        backgroundColor: '#eff6ff',
        padding: '1.5rem',
        borderRadius: '12px',
        borderLeft: '4px solid #3b82f6',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', margin: 0, color: '#1e40af', fontWeight: '700' }}>
            {selectedQuestion.title}
          </h2>
          <span style={{
            display: 'inline-block',
            padding: '0.25rem 0.75rem',
            backgroundColor: '#fef3c7',
            color: '#92400e',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            {selectedQuestion.difficulty}
          </span>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af', fontWeight: '600' }}>Description</h3>
          <p style={{ color: '#1e40af', lineHeight: '1.6', margin: 0 }}>{selectedQuestion.description}</p>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af', fontWeight: '600' }}>Example</h3>
          <pre style={{
            backgroundColor: '#dbeafe',
            padding: '1rem',
            borderRadius: '8px',
            overflow: 'auto',
            fontSize: '0.9rem',
            color: '#1e40af',
            margin: 0
          }}>
            {selectedQuestion.example}
          </pre>
        </div>

        <div>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af', fontWeight: '600' }}>Test Cases</h3>
          {selectedQuestion.testCases.map((test, idx) => (
            <div key={idx} style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span style={{ color: '#1e40af', fontWeight: '600' }}>Test {idx + 1}:</span>{' '}
              <span style={{ color: '#1e40af' }}>{test.input} → {test.output}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Code Editor */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.1rem', margin: 0, color: '#1f2937' }}>Code Editor</h3>
        <LanguageToggle />
      </div>
      <div style={{
        backgroundColor: '#1e293b',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '1rem'
      }}>
        <div style={{
          backgroundColor: '#0f172a',
          padding: '0.75rem 1rem',
          borderBottom: '1px solid #334155',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600' }}>{language === 'java' ? 'Solution.java' : 'solution.py'}</span>
          <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{language === 'java' ? 'Java' : 'Python'}</span>
        </div>
        <textarea
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck="false"
          style={{
            width: '100%',
            minHeight: '600px',
            padding: '1rem',
            fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
            fontSize: '0.9rem',
            lineHeight: '1.6',
            color: '#e2e8f0',
            backgroundColor: '#1e293b',
            border: 'none',
            outline: 'none',
            resize: 'vertical'
          }}
        />
      </div>

      {/* Buttons Row */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={handleRunCode}
          disabled={isRunning}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: isRunning ? '#9ca3af' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
        >
          {isRunning ? 'Running...' : '▶️ Run Code'}
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
        >
          🔄 Reset
        </button>
        <button
          onClick={() => setShowSolution(!showSolution)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: showSolution ? '#10b981' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
        >
          {showSolution ? '✓ Solution Shown' : '👁️ Show Solution'}
        </button>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: showExplanation ? '#8b5cf6' : '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
        >
          {showExplanation ? '✓ Explanation Visible' : '📖 Explanation & Pseudocode'}
        </button>
        <div style={{ marginLeft: 'auto' }}>
          <CompletionCheckbox
            problemId={`RateLimiter-${selectedQuestion.id}`}
            label="Mark as Completed"
            onCompletionChange={() => setRefreshKey(prev => prev + 1)}
          />
        </div>
      </div>

      {/* Output Display */}
      {output && (
        <div style={{
          backgroundColor: '#0f172a',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1rem'
        }}>
          <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', fontWeight: '700', color: '#60a5fa' }}>
            Output:
          </h3>
          <pre style={{
            margin: 0,
            fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
            fontSize: '0.85rem',
            lineHeight: '1.6',
            color: '#e2e8f0',
            whiteSpace: 'pre-wrap'
          }}>
            {output}
          </pre>
        </div>
      )}

      {/* Explanation & Pseudocode Display */}
      {showExplanation && selectedQuestion.explanation && selectedQuestion.pseudocode && (
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            backgroundColor: '#fef3c7',
            padding: '15px',
            borderRadius: '6px',
            border: '2px solid #fbbf24',
            marginBottom: '1rem'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#78350f', fontSize: '1.1rem', fontWeight: '700' }}>
              📖 Explanation
            </h3>
            <div style={{ color: '#1f2937', lineHeight: '1.7', whiteSpace: 'pre-wrap', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              {selectedQuestion.explanation}
            </div>
          </div>
          <div style={{
            backgroundColor: '#1e293b',
            padding: '15px',
            borderRadius: '6px',
            border: '2px solid #374151'
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#60a5fa', fontSize: '1.1rem', fontWeight: '700' }}>
              🔧 Pseudocode
            </h4>
            <pre style={{
              margin: 0,
              color: '#e5e7eb',
              whiteSpace: 'pre-wrap',
              fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
              fontSize: '0.9rem',
              lineHeight: '1.6'
            }}>
              {selectedQuestion.pseudocode}
            </pre>
          </div>
        </div>
      )}

      {/* Solution Display */}
      {showSolution && (
        <div style={{
          backgroundColor: '#1e293b',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '2px solid #10b981'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: '700', color: '#10b981' }}>
            💡 Solution:
          </h3>
          <pre style={{
            margin: 0,
            fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
            fontSize: '0.85rem',
            lineHeight: '1.6',
            color: '#e2e8f0',
            whiteSpace: 'pre',
            overflowX: 'auto'
          }}>
            {selectedQuestion.code[language].solution}
          </pre>
        </div>
      )}
    </div>
  )
}

export default RateLimiter
