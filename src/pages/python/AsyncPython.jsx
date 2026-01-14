import { useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import Breadcrumb from '../../components/Breadcrumb'

export default function AsyncPython({ onBack, breadcrumb }) {
  const { darkMode } = useTheme()
  const [expandedSections, setExpandedSections] = useState({
    basics: true,
    asyncio: true,
    concurrent: true,
    aiohttp: true,
    contextManagers: true,
    iterators: true,
    errorHandling: true,
    bestPractices: true
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const cardStyle = {
    backgroundColor: '#1f2937',
    border: '1px solid #374151',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    marginBottom: '1rem'
  }

  const codeBlockStyle = {
    backgroundColor: '#111827',
    border: '1px solid #374151',
    borderRadius: '0.375rem',
    padding: '1rem',
    overflowX: 'auto',
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    color: '#e5e7eb'
  }

  const sectionHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: '1rem'
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)',
      color: '#f3f4f6',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Back Button */}
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#60a5fa',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '1rem',
            fontSize: '1rem'
          }}
        >
          <span style={{ fontSize: '1.25rem' }}>&larr;</span> Back
        </button>

        {/* Breadcrumb */}
        {breadcrumb && <Breadcrumb items={breadcrumb} />}

        {/* Page Title */}
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Python Async Programming
        </h1>
        <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
          Comprehensive guide to asynchronous programming in Python using asyncio
        </p>

        {/* Async/Await Basics */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle} onClick={() => toggleSection('basics')}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa' }}>
              Async/Await Basics
            </h2>
            <span style={{ color: '#9ca3af' }}>{expandedSections.basics ? '−' : '+'}</span>
          </div>
          {expandedSections.basics && (
            <div>
              <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
                Async/await is Python's way of writing concurrent code. A coroutine is a function defined with
                <code style={{ color: '#a78bfa' }}> async def</code> that can be paused and resumed.
              </p>

              <h3 style={{ color: '#f9fafb', marginBottom: '0.5rem', fontWeight: '500' }}>Basic Coroutine</h3>
              <pre style={codeBlockStyle}>{`import asyncio

# Define a coroutine with async def
async def greet(name):
    print(f"Hello, {name}!")
    await asyncio.sleep(1)  # Non-blocking sleep
    print(f"Goodbye, {name}!")

# Run the coroutine
asyncio.run(greet("World"))`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Understanding the Event Loop</h3>
              <pre style={codeBlockStyle}>{`import asyncio

async def main():
    print("Starting...")
    await asyncio.sleep(1)
    print("Finished!")

# Method 1: Using asyncio.run() (Python 3.7+, recommended)
asyncio.run(main())

# Method 2: Getting event loop manually (older approach)
# loop = asyncio.get_event_loop()
# loop.run_until_complete(main())
# loop.close()`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Awaiting Multiple Coroutines</h3>
              <pre style={codeBlockStyle}>{`import asyncio

async def fetch_data(delay, data):
    await asyncio.sleep(delay)
    return data

async def main():
    # Sequential execution (slower)
    result1 = await fetch_data(1, "data1")
    result2 = await fetch_data(1, "data2")
    print(f"Sequential: {result1}, {result2}")  # Takes ~2 seconds

asyncio.run(main())`}</pre>
            </div>
          )}
        </div>

        {/* asyncio Module */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle} onClick={() => toggleSection('asyncio')}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa' }}>
              asyncio Module
            </h2>
            <span style={{ color: '#9ca3af' }}>{expandedSections.asyncio ? '−' : '+'}</span>
          </div>
          {expandedSections.asyncio && (
            <div>
              <h3 style={{ color: '#f9fafb', marginBottom: '0.5rem', fontWeight: '500' }}>asyncio.gather() - Run Coroutines Concurrently</h3>
              <pre style={codeBlockStyle}>{`import asyncio

async def fetch_user(user_id):
    await asyncio.sleep(1)
    return {"id": user_id, "name": f"User{user_id}"}

async def fetch_posts(user_id):
    await asyncio.sleep(1)
    return [{"id": 1, "title": "Post 1"}, {"id": 2, "title": "Post 2"}]

async def main():
    # Run both coroutines concurrently - takes ~1 second total
    user, posts = await asyncio.gather(
        fetch_user(1),
        fetch_posts(1)
    )
    print(f"User: {user}")
    print(f"Posts: {posts}")

asyncio.run(main())`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>asyncio.create_task() - Create Background Tasks</h3>
              <pre style={codeBlockStyle}>{`import asyncio

async def background_task(name, duration):
    print(f"Task {name} starting")
    await asyncio.sleep(duration)
    print(f"Task {name} completed")
    return f"Result from {name}"

async def main():
    # Create tasks - they start immediately
    task1 = asyncio.create_task(background_task("A", 2))
    task2 = asyncio.create_task(background_task("B", 1))

    print("Tasks created, doing other work...")
    await asyncio.sleep(0.5)
    print("Other work done")

    # Wait for tasks to complete
    result1 = await task1
    result2 = await task2
    print(f"Results: {result1}, {result2}")

asyncio.run(main())`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>asyncio.wait() - Wait with Conditions</h3>
              <pre style={codeBlockStyle}>{`import asyncio

async def task(name, duration):
    await asyncio.sleep(duration)
    return f"Task {name} done"

async def main():
    tasks = [
        asyncio.create_task(task("A", 1)),
        asyncio.create_task(task("B", 2)),
        asyncio.create_task(task("C", 3)),
    ]

    # Wait for first task to complete
    done, pending = await asyncio.wait(
        tasks,
        return_when=asyncio.FIRST_COMPLETED
    )

    print(f"Completed: {len(done)}, Pending: {len(pending)}")
    for t in done:
        print(f"Result: {t.result()}")

    # Cancel pending tasks
    for t in pending:
        t.cancel()

asyncio.run(main())`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>asyncio.wait_for() - Timeout</h3>
              <pre style={codeBlockStyle}>{`import asyncio

async def slow_operation():
    await asyncio.sleep(10)
    return "Completed"

async def main():
    try:
        result = await asyncio.wait_for(
            slow_operation(),
            timeout=2.0  # Wait max 2 seconds
        )
        print(result)
    except asyncio.TimeoutError:
        print("Operation timed out!")

asyncio.run(main())`}</pre>
            </div>
          )}
        </div>

        {/* Concurrent Execution */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle} onClick={() => toggleSection('concurrent')}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa' }}>
              Concurrent Execution
            </h2>
            <span style={{ color: '#9ca3af' }}>{expandedSections.concurrent ? '−' : '+'}</span>
          </div>
          {expandedSections.concurrent && (
            <div>
              <h3 style={{ color: '#f9fafb', marginBottom: '0.5rem', fontWeight: '500' }}>Running Multiple Tasks in Parallel</h3>
              <pre style={codeBlockStyle}>{`import asyncio
import time

async def download_file(filename, size):
    print(f"Starting download: {filename}")
    # Simulate download time based on file size
    await asyncio.sleep(size / 100)
    print(f"Completed download: {filename}")
    return f"{filename} ({size}KB)"

async def main():
    files = [
        ("file1.txt", 100),
        ("file2.txt", 200),
        ("file3.txt", 150),
        ("file4.txt", 300),
    ]

    start = time.time()

    # Create all download tasks
    tasks = [download_file(name, size) for name, size in files]

    # Run all tasks concurrently
    results = await asyncio.gather(*tasks)

    end = time.time()
    print(f"Downloaded: {results}")
    print(f"Total time: {end - start:.2f}s")  # ~3s instead of ~7.5s

asyncio.run(main())`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Semaphore - Limiting Concurrent Tasks</h3>
              <pre style={codeBlockStyle}>{`import asyncio

async def limited_task(semaphore, task_id):
    async with semaphore:
        print(f"Task {task_id} starting")
        await asyncio.sleep(1)
        print(f"Task {task_id} finished")

async def main():
    # Limit to 3 concurrent tasks
    semaphore = asyncio.Semaphore(3)

    tasks = [limited_task(semaphore, i) for i in range(10)]
    await asyncio.gather(*tasks)

asyncio.run(main())`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>TaskGroup (Python 3.11+)</h3>
              <pre style={codeBlockStyle}>{`import asyncio

async def fetch_data(url):
    await asyncio.sleep(1)
    return f"Data from {url}"

async def main():
    async with asyncio.TaskGroup() as tg:
        task1 = tg.create_task(fetch_data("api/users"))
        task2 = tg.create_task(fetch_data("api/posts"))
        task3 = tg.create_task(fetch_data("api/comments"))

    # All tasks completed when context exits
    print(task1.result())
    print(task2.result())
    print(task3.result())

asyncio.run(main())`}</pre>
            </div>
          )}
        </div>

        {/* aiohttp */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle} onClick={() => toggleSection('aiohttp')}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa' }}>
              aiohttp - Async HTTP Client/Server
            </h2>
            <span style={{ color: '#9ca3af' }}>{expandedSections.aiohttp ? '−' : '+'}</span>
          </div>
          {expandedSections.aiohttp && (
            <div>
              <p style={{ color: '#d1d5db', marginBottom: '1rem' }}>
                Install with: <code style={{ color: '#a78bfa' }}>pip install aiohttp</code>
              </p>

              <h3 style={{ color: '#f9fafb', marginBottom: '0.5rem', fontWeight: '500' }}>Async HTTP Client</h3>
              <pre style={codeBlockStyle}>{`import aiohttp
import asyncio

async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    async with aiohttp.ClientSession() as session:
        # Fetch single URL
        html = await fetch_url(session, "https://httpbin.org/get")
        print(f"Response length: {len(html)}")

asyncio.run(main())`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Fetching Multiple URLs Concurrently</h3>
              <pre style={codeBlockStyle}>{`import aiohttp
import asyncio

async def fetch_json(session, url):
    async with session.get(url) as response:
        return await response.json()

async def main():
    urls = [
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/posts/2",
        "https://jsonplaceholder.typicode.com/posts/3",
    ]

    async with aiohttp.ClientSession() as session:
        tasks = [fetch_json(session, url) for url in urls]
        results = await asyncio.gather(*tasks)

        for result in results:
            print(f"Post {result['id']}: {result['title'][:30]}...")

asyncio.run(main())`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>POST Request with JSON</h3>
              <pre style={codeBlockStyle}>{`import aiohttp
import asyncio

async def create_post(session, data):
    async with session.post(
        "https://jsonplaceholder.typicode.com/posts",
        json=data
    ) as response:
        return await response.json()

async def main():
    async with aiohttp.ClientSession() as session:
        new_post = {
            "title": "My Post",
            "body": "This is the content",
            "userId": 1
        }
        result = await create_post(session, new_post)
        print(f"Created post with ID: {result['id']}")

asyncio.run(main())`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Simple aiohttp Server</h3>
              <pre style={codeBlockStyle}>{`from aiohttp import web

async def handle_get(request):
    name = request.match_info.get('name', 'World')
    return web.json_response({"message": f"Hello, {name}!"})

async def handle_post(request):
    data = await request.json()
    return web.json_response({"received": data})

app = web.Application()
app.router.add_get('/', handle_get)
app.router.add_get('/{name}', handle_get)
app.router.add_post('/data', handle_post)

if __name__ == '__main__':
    web.run_app(app, port=8080)`}</pre>
            </div>
          )}
        </div>

        {/* Async Context Managers */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle} onClick={() => toggleSection('contextManagers')}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa' }}>
              Async Context Managers
            </h2>
            <span style={{ color: '#9ca3af' }}>{expandedSections.contextManagers ? '−' : '+'}</span>
          </div>
          {expandedSections.contextManagers && (
            <div>
              <h3 style={{ color: '#f9fafb', marginBottom: '0.5rem', fontWeight: '500' }}>Creating Async Context Managers</h3>
              <pre style={codeBlockStyle}>{`import asyncio

class AsyncDatabaseConnection:
    def __init__(self, db_name):
        self.db_name = db_name
        self.connected = False

    async def __aenter__(self):
        print(f"Connecting to {self.db_name}...")
        await asyncio.sleep(0.5)  # Simulate connection time
        self.connected = True
        print("Connected!")
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        print("Closing connection...")
        await asyncio.sleep(0.1)  # Simulate cleanup
        self.connected = False
        print("Connection closed")
        return False  # Don't suppress exceptions

    async def query(self, sql):
        if not self.connected:
            raise RuntimeError("Not connected")
        await asyncio.sleep(0.1)  # Simulate query
        return f"Results for: {sql}"

async def main():
    async with AsyncDatabaseConnection("mydb") as db:
        result = await db.query("SELECT * FROM users")
        print(result)

asyncio.run(main())`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Using contextlib for Async Context Managers</h3>
              <pre style={codeBlockStyle}>{`import asyncio
from contextlib import asynccontextmanager

@asynccontextmanager
async def async_timer(name):
    import time
    start = time.time()
    print(f"[{name}] Starting...")
    try:
        yield
    finally:
        elapsed = time.time() - start
        print(f"[{name}] Completed in {elapsed:.2f}s")

async def main():
    async with async_timer("Data fetch"):
        await asyncio.sleep(1)
        print("Fetching data...")

asyncio.run(main())`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Async Lock Context Manager</h3>
              <pre style={codeBlockStyle}>{`import asyncio

shared_resource = {"counter": 0}
lock = asyncio.Lock()

async def increment(task_id):
    async with lock:  # Only one task can hold the lock
        current = shared_resource["counter"]
        await asyncio.sleep(0.1)  # Simulate work
        shared_resource["counter"] = current + 1
        print(f"Task {task_id}: counter = {shared_resource['counter']}")

async def main():
    tasks = [increment(i) for i in range(5)]
    await asyncio.gather(*tasks)
    print(f"Final counter: {shared_resource['counter']}")

asyncio.run(main())`}</pre>
            </div>
          )}
        </div>

        {/* Async Iterators and Generators */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle} onClick={() => toggleSection('iterators')}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa' }}>
              Async Iterators and Generators
            </h2>
            <span style={{ color: '#9ca3af' }}>{expandedSections.iterators ? '−' : '+'}</span>
          </div>
          {expandedSections.iterators && (
            <div>
              <h3 style={{ color: '#f9fafb', marginBottom: '0.5rem', fontWeight: '500' }}>Async Generator</h3>
              <pre style={codeBlockStyle}>{`import asyncio

async def async_range(start, stop):
    """Async generator that yields numbers with delay"""
    for i in range(start, stop):
        await asyncio.sleep(0.5)
        yield i

async def main():
    async for num in async_range(1, 6):
        print(f"Got: {num}")

asyncio.run(main())`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Async Iterator Class</h3>
              <pre style={codeBlockStyle}>{`import asyncio

class AsyncPaginator:
    """Async iterator for paginated API responses"""

    def __init__(self, total_pages):
        self.total_pages = total_pages
        self.current_page = 0

    def __aiter__(self):
        return self

    async def __anext__(self):
        if self.current_page >= self.total_pages:
            raise StopAsyncIteration

        self.current_page += 1
        await asyncio.sleep(0.3)  # Simulate API call
        return {
            "page": self.current_page,
            "data": [f"item_{i}" for i in range(3)]
        }

async def main():
    paginator = AsyncPaginator(3)
    async for page in paginator:
        print(f"Page {page['page']}: {page['data']}")

asyncio.run(main())`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Async Comprehensions</h3>
              <pre style={codeBlockStyle}>{`import asyncio

async def fetch_item(item_id):
    await asyncio.sleep(0.1)
    return {"id": item_id, "value": item_id * 10}

async def async_range(n):
    for i in range(n):
        await asyncio.sleep(0.1)
        yield i

async def main():
    # Async list comprehension
    items = [await fetch_item(i) for i in range(5)]
    print(f"Items: {items}")

    # Async generator comprehension
    values = [x async for x in async_range(5)]
    print(f"Values: {values}")

asyncio.run(main())`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Streaming Data with Async Generators</h3>
              <pre style={codeBlockStyle}>{`import asyncio

async def stream_events():
    """Simulate streaming events from a server"""
    events = ["user_login", "page_view", "button_click", "purchase", "logout"]
    for event in events:
        await asyncio.sleep(0.5)
        yield {"event": event, "timestamp": asyncio.get_event_loop().time()}

async def process_stream():
    async for event in stream_events():
        print(f"Processing: {event['event']}")

asyncio.run(process_stream())`}</pre>
            </div>
          )}
        </div>

        {/* Error Handling */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle} onClick={() => toggleSection('errorHandling')}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa' }}>
              Error Handling
            </h2>
            <span style={{ color: '#9ca3af' }}>{expandedSections.errorHandling ? '−' : '+'}</span>
          </div>
          {expandedSections.errorHandling && (
            <div>
              <h3 style={{ color: '#f9fafb', marginBottom: '0.5rem', fontWeight: '500' }}>Basic Exception Handling</h3>
              <pre style={codeBlockStyle}>{`import asyncio

async def risky_operation():
    await asyncio.sleep(0.5)
    raise ValueError("Something went wrong!")

async def main():
    try:
        await risky_operation()
    except ValueError as e:
        print(f"Caught error: {e}")
    finally:
        print("Cleanup complete")

asyncio.run(main())`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Handling Errors in gather()</h3>
              <pre style={codeBlockStyle}>{`import asyncio

async def task_success():
    await asyncio.sleep(0.5)
    return "Success!"

async def task_failure():
    await asyncio.sleep(0.3)
    raise RuntimeError("Task failed!")

async def main():
    # return_exceptions=True prevents one failure from canceling others
    results = await asyncio.gather(
        task_success(),
        task_failure(),
        task_success(),
        return_exceptions=True
    )

    for i, result in enumerate(results):
        if isinstance(result, Exception):
            print(f"Task {i} failed: {result}")
        else:
            print(f"Task {i} succeeded: {result}")

asyncio.run(main())`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Cancellation Handling</h3>
              <pre style={codeBlockStyle}>{`import asyncio

async def long_running_task():
    try:
        print("Task started")
        await asyncio.sleep(10)
        print("Task completed")
    except asyncio.CancelledError:
        print("Task was cancelled!")
        # Perform cleanup here
        raise  # Re-raise to properly propagate cancellation

async def main():
    task = asyncio.create_task(long_running_task())

    await asyncio.sleep(1)
    task.cancel()

    try:
        await task
    except asyncio.CancelledError:
        print("Main: task cancellation confirmed")

asyncio.run(main())`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Exception Groups (Python 3.11+)</h3>
              <pre style={codeBlockStyle}>{`import asyncio

async def failing_task(n):
    await asyncio.sleep(0.1)
    if n % 2 == 0:
        raise ValueError(f"Task {n} failed")
    return f"Task {n} ok"

async def main():
    try:
        async with asyncio.TaskGroup() as tg:
            for i in range(5):
                tg.create_task(failing_task(i))
    except* ValueError as eg:
        print(f"Caught {len(eg.exceptions)} ValueErrors:")
        for e in eg.exceptions:
            print(f"  - {e}")

asyncio.run(main())`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Retry Pattern</h3>
              <pre style={codeBlockStyle}>{`import asyncio

async def unreliable_api():
    import random
    if random.random() < 0.7:  # 70% chance of failure
        raise ConnectionError("API unavailable")
    return {"status": "success"}

async def retry_with_backoff(coro_func, max_retries=3, base_delay=1):
    """Retry a coroutine with exponential backoff"""
    for attempt in range(max_retries):
        try:
            return await coro_func()
        except Exception as e:
            if attempt == max_retries - 1:
                raise
            delay = base_delay * (2 ** attempt)
            print(f"Attempt {attempt + 1} failed: {e}")
            print(f"Retrying in {delay}s...")
            await asyncio.sleep(delay)

async def main():
    try:
        result = await retry_with_backoff(unreliable_api)
        print(f"Result: {result}")
    except ConnectionError as e:
        print(f"All retries failed: {e}")

asyncio.run(main())`}</pre>
            </div>
          )}
        </div>

        {/* Best Practices */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle} onClick={() => toggleSection('bestPractices')}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa' }}>
              Best Practices
            </h2>
            <span style={{ color: '#9ca3af' }}>{expandedSections.bestPractices ? '−' : '+'}</span>
          </div>
          {expandedSections.bestPractices && (
            <div>
              <h3 style={{ color: '#f9fafb', marginBottom: '0.5rem', fontWeight: '500' }}>When to Use Async</h3>
              <div style={{ ...codeBlockStyle, color: '#d1d5db' }}>
                <p><strong style={{ color: '#34d399' }}>Use async for:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li>I/O-bound operations (network requests, file I/O, database queries)</li>
                  <li>Many concurrent connections (web servers, chat applications)</li>
                  <li>Real-time data processing (WebSockets, streaming)</li>
                  <li>When you need to handle thousands of concurrent operations</li>
                </ul>
                <p style={{ marginTop: '1rem' }}><strong style={{ color: '#f87171' }}>Don't use async for:</strong></p>
                <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li>CPU-bound operations (use multiprocessing instead)</li>
                  <li>Simple sequential scripts</li>
                  <li>When you're already using threads effectively</li>
                </ul>
              </div>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Avoid Blocking the Event Loop</h3>
              <pre style={codeBlockStyle}>{`import asyncio

# BAD: This blocks the event loop
async def bad_example():
    import time
    time.sleep(5)  # BLOCKING! Don't do this!
    return "done"

# GOOD: Use async-compatible functions
async def good_example():
    await asyncio.sleep(5)  # Non-blocking
    return "done"

# For CPU-bound work, use run_in_executor
async def cpu_bound_work():
    loop = asyncio.get_event_loop()

    def heavy_computation():
        return sum(i * i for i in range(10_000_000))

    # Run in thread pool to avoid blocking
    result = await loop.run_in_executor(None, heavy_computation)
    return result`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Always Clean Up Resources</h3>
              <pre style={codeBlockStyle}>{`import asyncio
import aiohttp

# BAD: Resources may not be cleaned up
async def bad_fetch():
    session = aiohttp.ClientSession()
    response = await session.get("https://example.com")
    return await response.text()
    # Session never closed!

# GOOD: Use context managers
async def good_fetch():
    async with aiohttp.ClientSession() as session:
        async with session.get("https://example.com") as response:
            return await response.text()
    # Both session and response properly closed`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Don't Mix Sync and Async Carelessly</h3>
              <pre style={codeBlockStyle}>{`import asyncio

# BAD: Calling sync code that does I/O
async def bad_mixed():
    import requests  # Sync library - blocks event loop!
    response = requests.get("https://example.com")
    return response.text

# GOOD: Use async libraries
async def good_mixed():
    import aiohttp
    async with aiohttp.ClientSession() as session:
        async with session.get("https://example.com") as response:
            return await response.text()

# ACCEPTABLE: Running sync code in executor when needed
async def acceptable_mixed():
    import requests
    loop = asyncio.get_event_loop()
    response = await loop.run_in_executor(
        None,
        lambda: requests.get("https://example.com")
    )
    return response.text`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Use TaskGroups for Structured Concurrency (3.11+)</h3>
              <pre style={codeBlockStyle}>{`import asyncio

async def fetch_all_data():
    # Preferred: TaskGroup ensures all tasks complete or fail together
    async with asyncio.TaskGroup() as tg:
        user_task = tg.create_task(fetch_user())
        posts_task = tg.create_task(fetch_posts())
        comments_task = tg.create_task(fetch_comments())

    # If any task fails, all are cancelled and exception is raised
    return {
        "user": user_task.result(),
        "posts": posts_task.result(),
        "comments": comments_task.result()
    }`}</pre>

              <h3 style={{ color: '#f9fafb', marginTop: '1rem', marginBottom: '0.5rem', fontWeight: '500' }}>Common Pitfalls to Avoid</h3>
              <div style={{ ...codeBlockStyle, color: '#d1d5db' }}>
                <ol style={{ marginLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#fbbf24' }}>Forgetting to await:</strong> Always await coroutines, otherwise they won't execute
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#fbbf24' }}>Creating tasks without awaiting:</strong> Tasks may get garbage collected before completion
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#fbbf24' }}>Using global state without locks:</strong> Race conditions can occur
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#fbbf24' }}>Ignoring CancelledError:</strong> Always handle or re-raise to ensure proper cleanup
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#fbbf24' }}>Too many concurrent connections:</strong> Use semaphores to limit concurrency
                  </li>
                </ol>
              </div>
            </div>
          )}
        </div>

        {/* Quick Reference Card */}
        <div style={{ ...cardStyle, backgroundColor: '#1e3a5f' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#60a5fa', marginBottom: '1rem' }}>
            Quick Reference
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div>
              <h4 style={{ color: '#34d399', marginBottom: '0.5rem' }}>Creating Coroutines</h4>
              <code style={{ color: '#e5e7eb', fontSize: '0.875rem' }}>async def my_func():</code>
            </div>
            <div>
              <h4 style={{ color: '#34d399', marginBottom: '0.5rem' }}>Running Coroutines</h4>
              <code style={{ color: '#e5e7eb', fontSize: '0.875rem' }}>asyncio.run(main())</code>
            </div>
            <div>
              <h4 style={{ color: '#34d399', marginBottom: '0.5rem' }}>Concurrent Execution</h4>
              <code style={{ color: '#e5e7eb', fontSize: '0.875rem' }}>await asyncio.gather(*tasks)</code>
            </div>
            <div>
              <h4 style={{ color: '#34d399', marginBottom: '0.5rem' }}>Creating Tasks</h4>
              <code style={{ color: '#e5e7eb', fontSize: '0.875rem' }}>asyncio.create_task(coro)</code>
            </div>
            <div>
              <h4 style={{ color: '#34d399', marginBottom: '0.5rem' }}>Async Sleep</h4>
              <code style={{ color: '#e5e7eb', fontSize: '0.875rem' }}>await asyncio.sleep(seconds)</code>
            </div>
            <div>
              <h4 style={{ color: '#34d399', marginBottom: '0.5rem' }}>Timeout</h4>
              <code style={{ color: '#e5e7eb', fontSize: '0.875rem' }}>await asyncio.wait_for(coro, timeout)</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
