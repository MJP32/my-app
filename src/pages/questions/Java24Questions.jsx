import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

function Java24Questions({ onBack, breadcrumb }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
    let colorIndex = 0
    const result = []
    let inCodeBlock = false
    let codeLines = []
    let codeLanguage = 'java'

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex]

      // Check for code block start/end
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true
          codeLanguage = line.trim().substring(3) || 'java'
          codeLines = []
        } else {
          // End of code block
          inCodeBlock = false
          const codeString = codeLines.join('\n')
          result.push(
            <div key={`code-${lineIndex}`} style={{ margin: '1.5rem 0', textAlign: 'left' }}>
              <SyntaxHighlighter
                language={codeLanguage}
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  padding: '1rem',
                  textAlign: 'left',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                }}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          )
          codeLines = []
        }
        continue
      }

      if (inCodeBlock) {
        codeLines.push(line)
        continue
      }

      // Empty lines for spacing
      if (line.trim() === '') {
        result.push(<div key={lineIndex} style={{ height: '0.5rem' }}></div>)
        continue
      }

      // Bullet points (lines starting with -)
      const bulletMatch = line.match(/^(\s*)-\s+(.+)$/)
      if (bulletMatch) {
        const indentLevel = bulletMatch[1].length
        const bulletContent = bulletMatch[2]
        result.push(
          <div
            key={lineIndex}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginLeft: `${indentLevel * 0.5 + 1}rem`,
              marginTop: '0.5rem',
              textAlign: 'left',
              lineHeight: '1.6'
            }}
          >
            <span style={{
              color: '#3b82f6',
              marginRight: '0.5rem',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              lineHeight: '1.4'
            }}>
              •
            </span>
            <span style={{ flex: 1 }}>{bulletContent}</span>
          </div>
        )
        continue
      }

      // Bold section headers (e.g., **What is RFQ?**)
      const boldMatch = line.match(/^\*\*(.+?):\*\*/)
      if (boldMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
          <div
            key={lineIndex}
            style={{
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              textAlign: 'left',
              paddingBottom: '0.25rem',
              borderBottom: `2px solid ${color}33`
            }}
          >
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.1rem',
              letterSpacing: '0.02em'
            }}>
              {boldMatch[1]}:
            </span>
            {line.substring(boldMatch[0].length)}
          </div>
        )
        continue
      }

      // Numbered section headers (e.g., **1. Client Initiates:**)
      const numberedMatch = line.match(/^\*\*(\d+\.\s+.+?):\*\*/)
      if (numberedMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
          <div
            key={lineIndex}
            style={{
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              textAlign: 'left',
              paddingBottom: '0.25rem',
              borderBottom: `2px solid ${color}33`
            }}
          >
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.1rem',
              letterSpacing: '0.02em'
            }}>
              {numberedMatch[1]}:
            </span>
            {line.substring(numberedMatch[0].length)}
          </div>
        )
        continue
      }

      // Regular text with subtle left padding
      result.push(
        <div
          key={lineIndex}
          style={{
            textAlign: 'left',
            marginTop: '0.25rem',
            paddingLeft: '0.5rem',
            lineHeight: '1.6',
            color: '#e5e7eb'
          }}
        >
          {line}
        </div>
      )
    }

    return result
  }

  const questions = [
    {
      id: 1,
      category: 'Stream Gatherers',
      question: 'What are Stream Gatherers in Java 24 and how do they extend Stream API?',
      answer: `**Stream Gatherers (JEP 473):**
- New intermediate operation for custom stream transformations
- More flexible than traditional map/filter/reduce
- Stateful processing with ability to emit multiple elements
- Combines mapping, filtering, and aggregating in one operation
- Standard feature in Java 24

**Why Gatherers?**

**Problem with Existing Stream Operations:**
\`\`\`java
// Want to window elements - awkward with existing API
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8);

// Sliding window of size 3 - no easy way!
// Would need external state, collectors, or custom spliterator
\`\`\`

**Gatherer Solution:**
\`\`\`java
// Built-in gatherers for common patterns
List<List<Integer>> windows = numbers.stream()
    .gather(Gatherers.windowSliding(3))
    .toList();
// [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8]]
\`\`\`

**Built-in Gatherers:**

**1. fold() - Custom Aggregation:**
\`\`\`java
// Running sum
List<Integer> numbers = List.of(1, 2, 3, 4, 5);
List<Integer> runningSum = numbers.stream()
    .gather(Gatherers.fold(
        () -> 0,                    // Initial value
        (sum, num) -> sum + num     // Accumulator
    ))
    .toList();
// [0, 1, 3, 6, 10, 15]
\`\`\`

**2. scan() - Stateful Transformation:**
\`\`\`java
// Running maximum
List<Integer> numbers = List.of(3, 1, 4, 1, 5, 9, 2, 6);
List<Integer> runningMax = numbers.stream()
    .gather(Gatherers.scan(
        () -> Integer.MIN_VALUE,
        (max, num) -> Math.max(max, num)
    ))
    .toList();
// [3, 3, 4, 4, 5, 9, 9, 9]
\`\`\`

**3. windowFixed() - Fixed Size Windows:**
\`\`\`java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);
List<List<Integer>> fixedWindows = numbers.stream()
    .gather(Gatherers.windowFixed(2))
    .toList();
// [[1, 2], [3, 4], [5, 6]]
\`\`\`

**4. windowSliding() - Sliding Windows:**
\`\`\`java
List<Integer> numbers = List.of(1, 2, 3, 4, 5);
List<List<Integer>> slidingWindows = numbers.stream()
    .gather(Gatherers.windowSliding(3))
    .toList();
// [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
\`\`\`

**Custom Gatherers:**

**Creating Custom Gatherer:**
\`\`\`java
// Custom gatherer to emit only increasing elements
Gatherer<Integer, ?, Integer> increasing() {
    return Gatherer.ofSequential(
        () -> new int[]{Integer.MIN_VALUE},  // State: last value
        (state, element, downstream) -> {
            if (element > state[0]) {
                state[0] = element;
                return downstream.push(element);
            }
            return true;  // Skip this element
        }
    );
}

// Usage
List<Integer> numbers = List.of(1, 3, 2, 5, 4, 8, 7, 9);
List<Integer> increasing = numbers.stream()
    .gather(increasing())
    .toList();
// [1, 3, 5, 8, 9]
\`\`\`

**Real-World Examples:**

**1. Rate Limiting:**
\`\`\`java
// Emit at most N elements per second
Gatherer<T, ?, T> rateLimit(int maxPerSecond) {
    return Gatherer.ofSequential(
        () -> new long[]{System.currentTimeMillis(), 0},
        (state, element, downstream) -> {
            long currentTime = System.currentTimeMillis();
            long elapsedSeconds = (currentTime - state[0]) / 1000;

            if (elapsedSeconds > 0) {
                state[0] = currentTime;
                state[1] = 0;
            }

            if (state[1] < maxPerSecond) {
                state[1]++;
                return downstream.push(element);
            }

            // Rate limit exceeded - wait
            try {
                Thread.sleep(1000 - (currentTime - state[0]));
            } catch (InterruptedException e) {
                return false;
            }

            state[0] = System.currentTimeMillis();
            state[1] = 1;
            return downstream.push(element);
        }
    );
}
\`\`\`

**2. Batching:**
\`\`\`java
// Batch elements until condition met
Gatherer<T, ?, List<T>> batchUntil(Predicate<T> condition) {
    return Gatherer.ofSequential(
        ArrayList::new,
        (batch, element, downstream) -> {
            batch.add(element);
            if (condition.test(element)) {
                boolean result = downstream.push(new ArrayList<>(batch));
                batch.clear();
                return result;
            }
            return true;
        },
        (batch, downstream) -> {
            if (!batch.isEmpty()) {
                downstream.push(batch);
            }
        }
    );
}

// Usage: Batch lines until empty line
List<String> lines = List.of("line1", "line2", "", "line3", "");
List<List<String>> batches = lines.stream()
    .gather(batchUntil(String::isEmpty))
    .toList();
\`\`\`

**3. Deduplication:**
\`\`\`java
// Deduplicate consecutive elements
Gatherer<T, ?, T> dedupeConsecutive() {
    return Gatherer.ofSequential(
        () -> new Object[]{null},
        (state, element, downstream) -> {
            if (!element.equals(state[0])) {
                state[0] = element;
                return downstream.push(element);
            }
            return true;  // Skip duplicate
        }
    );
}

// Usage
List<Integer> numbers = List.of(1, 1, 2, 2, 2, 3, 1, 1);
List<Integer> deduped = numbers.stream()
    .gather(dedupeConsecutive())
    .toList();
// [1, 2, 3, 1]
\`\`\`

**4. Moving Average:**
\`\`\`java
// Calculate moving average over window
Gatherer<Double, ?, Double> movingAverage(int windowSize) {
    return Gatherer.ofSequential(
        () -> new ArrayDeque<Double>(windowSize),
        (window, element, downstream) -> {
            window.add(element);
            if (window.size() > windowSize) {
                window.remove();
            }

            double avg = window.stream()
                .mapToDouble(Double::doubleValue)
                .average()
                .orElse(0.0);

            return downstream.push(avg);
        }
    );
}

// Usage
List<Double> prices = List.of(10.0, 12.0, 15.0, 13.0, 11.0);
List<Double> movingAvg = prices.stream()
    .gather(movingAverage(3))
    .toList();
\`\`\`

**Combining Gatherers:**

**Chaining Multiple Gatherers:**
\`\`\`java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9);

List<Integer> result = numbers.stream()
    .gather(Gatherers.windowSliding(3))    // Create windows
    .map(window -> window.stream()
        .mapToInt(Integer::intValue)
        .sum())                              // Sum each window
    .gather(dedupeConsecutive())            // Remove consecutive duplicates
    .toList();
\`\`\`

**Performance Considerations:**

**Efficient State Management:**
\`\`\`java
// Good - Mutable state
Gatherer<T, ?, T> efficient() {
    return Gatherer.ofSequential(
        () -> new int[1],  // Array for mutable state
        (state, element, downstream) -> {
            state[0]++;
            return downstream.push(element);
        }
    );
}

// Bad - Immutable state (boxing overhead)
Gatherer<T, ?, T> inefficient() {
    return Gatherer.ofSequential(
        () -> 0,  // Autoboxing for each update
        (state, element, downstream) -> {
            state++;  // Creates new Integer
            return downstream.push(element);
        }
    );
}
\`\`\`

**Parallel Gatherers:**
\`\`\`java
// Parallel-safe gatherer
Gatherer<T, ?, T> parallelSafe() {
    return Gatherer.of(
        ConcurrentHashMap::newKeySet,  // Thread-safe state
        (state, element, downstream) -> {
            if (state.add(element)) {  // Thread-safe operation
                return downstream.push(element);
            }
            return true;
        },
        (left, right) -> {  // Combiner for parallel streams
            left.addAll(right);
            return left;
        },
        (state, downstream) -> {  // Finisher
            state.forEach(downstream::push);
        }
    );
}
\`\`\`

**Benefits:**

**1. Expressiveness:**
- Complex transformations in single operation
- Custom stateful processing
- Better than external loops

**2. Composability:**
- Chain with other stream operations
- Reusable components
- Clean API

**3. Performance:**
- Single pass processing
- Lazy evaluation
- Efficient state management

**4. Flexibility:**
- Emit 0, 1, or many elements per input
- Maintain arbitrary state
- Custom finalization logic

**Comparison with Collectors:**

**Gatherer (Intermediate Operation):**
\`\`\`java
// Returns Stream - can continue processing
Stream<List<Integer>> windows = stream
    .gather(Gatherers.windowSliding(3));

windows.filter(w -> w.size() == 3)
    .map(Window::process)
    .toList();
\`\`\`

**Collector (Terminal Operation):**
\`\`\`java
// Returns final result - no more stream operations
List<Integer> result = stream
    .collect(Collectors.toList());
// Stream is consumed
\`\`\``
    },
    {
      id: 2,
      category: 'Class-File API',
      question: 'What is the Class-File API (second preview) in Java 24?',
      answer: `**Class-File API (JEP 484 - Second Preview):**
- Standard API for parsing, generating, and transforming Java class files
- Replaces need for libraries like ASM or BCEL
- Maintains compatibility with JVM class file format
- Immutable, strongly-typed API
- Second preview in Java 24

**Why Class-File API?**

**Before (Using ASM):**
\`\`\`java
// Complex, version-dependent, easy to create invalid bytecode
ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_MAXS);
cw.visit(V17, ACC_PUBLIC, "MyClass", null, "java/lang/Object", null);

MethodVisitor mv = cw.visitMethod(ACC_PUBLIC, "<init>", "()V", null, null);
mv.visitCode();
mv.visitVarInsn(ALOAD, 0);
mv.visitMethodInsn(INVOKESPECIAL, "java/lang/Object", "<init>", "()V", false);
mv.visitInsn(RETURN);
mv.visitMaxs(1, 1);
mv.visitEnd();
\`\`\`

**After (Class-File API):**
\`\`\`java
// Type-safe, version-independent, hard to create invalid bytecode
ClassFile cf = ClassFile.of();
byte[] bytes = cf.build(
    ClassDesc.of("MyClass"),
    clb -> clb
        .withVersion(61, 0)  // Java 17
        .withSuperclass(CD_Object)
        .withMethod("<init>", MethodTypeDesc.of(CD_void),
            ACC_PUBLIC,
            mb -> mb.withCode(
                cb -> cb
                    .aload(0)
                    .invokespecial(CD_Object, "<init>",
                        MethodTypeDesc.of(CD_void))
                    .return_()
            )
        )
);
\`\`\`

**Basic Class Generation:**

**Simple Class:**
\`\`\`java
ClassFile cf = ClassFile.of();

byte[] bytes = cf.build(
    ClassDesc.of("com.example", "HelloWorld"),
    clb -> clb
        .withVersion(61, 0)
        .withFlags(ACC_PUBLIC)
        .withSuperclass(CD_Object)
        .withMethod(
            "sayHello",
            MethodTypeDesc.of(CD_void),
            ACC_PUBLIC | ACC_STATIC,
            mb -> mb.withCode(cb -> cb
                .getstatic(ClassDesc.of("java.lang.System"), "out",
                    ClassDesc.of("java.io.PrintStream"))
                .ldc("Hello, World!")
                .invokevirtual(
                    ClassDesc.of("java.io.PrintStream"),
                    "println",
                    MethodTypeDesc.of(CD_void, CD_String)
                )
                .return_()
            )
        )
);

// Load and use the class
Class<?> helloClass = new ByteArrayClassLoader()
    .defineClass("com.example.HelloWorld", bytes);
helloClass.getMethod("sayHello").invoke(null);
\`\`\`

**Reading Class Files:**

**Parse Existing Class:**
\`\`\`java
ClassFile cf = ClassFile.of();
ClassModel cm = cf.parse(classBytes);

// Access class information
System.out.println("Class: " + cm.thisClass().asInternalName());
System.out.println("Superclass: " + cm.superclass().orElse(null));
System.out.println("Version: " + cm.majorVersion());

// List methods
for (MethodModel mm : cm.methods()) {
    System.out.println("Method: " + mm.methodName().stringValue());
    System.out.println("  Descriptor: " + mm.methodType().stringValue());
    System.out.println("  Flags: " + mm.flags().flags());
}

// List fields
for (FieldModel fm : cm.fields()) {
    System.out.println("Field: " + fm.fieldName().stringValue());
    System.out.println("  Type: " + fm.fieldType().stringValue());
}
\`\`\`

**Transforming Classes:**

**Add Logging to Methods:**
\`\`\`java
ClassFile cf = ClassFile.of();

byte[] original = Files.readAllBytes(Path.of("MyClass.class"));
byte[] transformed = cf.transform(
    cf.parse(original),
    ClassTransform.transformingMethodBodies(
        (cob, coe) -> {
            // Add logging at method entry
            if (coe instanceof Instruction.InvokeInstruction invoke) {
                cob.getstatic(
                    ClassDesc.of("java.lang.System"),
                    "out",
                    ClassDesc.of("java.io.PrintStream")
                );
                cob.ldc("Calling: " + invoke.method().name());
                cob.invokevirtual(
                    ClassDesc.of("java.io.PrintStream"),
                    "println",
                    MethodTypeDesc.of(CD_void, CD_String)
                );
            }
            // Pass through original instruction
            cob.with(coe);
        }
    )
);
\`\`\`

**Remove Methods:**
\`\`\`java
byte[] transformed = cf.transform(
    cf.parse(original),
    (clb, cle) -> {
        if (cle instanceof MethodModel mm) {
            // Filter out deprecated methods
            if (!mm.findAttribute(Attributes.deprecated()).isPresent()) {
                clb.with(cle);
            }
        } else {
            clb.with(cle);
        }
    }
);
\`\`\`

**Real-World Use Cases:**

**1. Bytecode Instrumentation:**
\`\`\`java
// Add timing to all public methods
ClassTransform addTiming = (clb, cle) -> {
    if (cle instanceof MethodModel mm &&
        mm.flags().has(AccessFlag.PUBLIC)) {

        clb.transformMethod(mm, (mb, me) -> {
            if (me instanceof CodeModel code) {
                mb.withCode(cb -> {
                    // long start = System.currentTimeMillis();
                    cb.invokestatic(
                        ClassDesc.of("java.lang.System"),
                        "currentTimeMillis",
                        MethodTypeDesc.of(CD_long)
                    );
                    LocalVariable start = cb.allocateLocal(TypeKind.LongType);
                    cb.lstore(start);

                    // Original method body
                    for (CodeElement ce : code) {
                        if (ce instanceof ReturnInstruction) {
                            // Log elapsed time before return
                            cb.invokestatic(
                                ClassDesc.of("java.lang.System"),
                                "currentTimeMillis",
                                MethodTypeDesc.of(CD_long)
                            );
                            cb.lload(start);
                            cb.lsub();
                            // Log the time
                            cb.getstatic(CD_System, "out", CD_PrintStream);
                            cb.ldc("Method took: ");
                            cb.invokevirtual(CD_PrintStream, "print",
                                MethodTypeDesc.of(CD_void, CD_String));
                            // ... print time
                        }
                        cb.with(ce);
                    }
                });
            } else {
                mb.with(me);
            }
        });
    } else {
        clb.with(cle);
    }
};
\`\`\`

**2. Code Analysis:**
\`\`\`java
// Find all method calls
ClassModel cm = cf.parse(classBytes);

for (MethodModel mm : cm.methods()) {
    mm.code().ifPresent(code -> {
        for (CodeElement ce : code) {
            if (ce instanceof Instruction.InvokeInstruction invoke) {
                System.out.println(
                    mm.methodName() + " calls " +
                    invoke.owner().displayName() + "." +
                    invoke.name()
                );
            }
        }
    });
}
\`\`\`

**3. Proxy Generation:**
\`\`\`java
// Generate proxy class
byte[] proxyBytes = cf.build(
    ClassDesc.of("com.example", "ServiceProxy"),
    clb -> clb
        .withVersion(61, 0)
        .withFlags(ACC_PUBLIC)
        .withInterfaceSymbols(ClassDesc.of("com.example.Service"))
        .withField("target",
            ClassDesc.of("com.example.Service"),
            ACC_PRIVATE | ACC_FINAL)
        .withMethodBody(
            "<init>",
            MethodTypeDesc.of(CD_void,
                ClassDesc.of("com.example.Service")),
            ACC_PUBLIC,
            cb -> cb
                .aload(0)
                .invokespecial(CD_Object, "<init>",
                    MethodTypeDesc.of(CD_void))
                .aload(0)
                .aload(1)
                .putfield(
                    ClassDesc.of("com.example", "ServiceProxy"),
                    "target",
                    ClassDesc.of("com.example.Service")
                )
                .return_()
        )
        .withMethodBody(
            "doSomething",
            MethodTypeDesc.of(CD_void),
            ACC_PUBLIC,
            cb -> cb
                // Logging before
                .getstatic(CD_System, "out", CD_PrintStream)
                .ldc("Before doSomething")
                .invokevirtual(CD_PrintStream, "println",
                    MethodTypeDesc.of(CD_void, CD_String))
                // Delegate to target
                .aload(0)
                .getfield(
                    ClassDesc.of("com.example", "ServiceProxy"),
                    "target",
                    ClassDesc.of("com.example.Service")
                )
                .invokeinterface(
                    ClassDesc.of("com.example.Service"),
                    "doSomething",
                    MethodTypeDesc.of(CD_void)
                )
                // Logging after
                .getstatic(CD_System, "out", CD_PrintStream)
                .ldc("After doSomething")
                .invokevirtual(CD_PrintStream, "println",
                    MethodTypeDesc.of(CD_void, CD_String))
                .return_()
        )
);
\`\`\`

**Benefits:**

**1. Type Safety:**
- Compile-time checking
- No runtime surprises
- Clear API

**2. Maintainability:**
- Immutable models
- Functional transformations
- Easy to understand

**3. Version Independence:**
- API abstracts class file version
- Forward compatible
- Backward compatible

**4. Performance:**
- No intermediate representations
- Direct bytecode manipulation
- Efficient transformations

**Migration from ASM:**

**ASM:**
\`\`\`java
ClassWriter cw = new ClassWriter(0);
cw.visit(V17, ACC_PUBLIC, "MyClass", null, "java/lang/Object", null);
MethodVisitor mv = cw.visitMethod(ACC_PUBLIC, "test", "()V", null, null);
mv.visitCode();
// ... complex visitor pattern
\`\`\`

**Class-File API:**
\`\`\`java
ClassFile cf = ClassFile.of();
byte[] bytes = cf.build(
    ClassDesc.of("MyClass"),
    clb -> clb
        .withMethod("test", MethodTypeDesc.of(CD_void),
            ACC_PUBLIC,
            mb -> mb.withCode(cb -> {
                // ... fluent builder pattern
            })
        )
);
\`\`\``
    },
    {
      id: 3,
      category: 'Scoped Values',
      question: 'Explain Scoped Values (third preview) in Java 24',
      answer: `**Scoped Values (JEP 487 - Third Preview):**
- Better alternative to ThreadLocal for sharing immutable data
- Bounded lifetime - automatically cleaned up
- More efficient than ThreadLocal
- Works well with Virtual Threads (Project Loom)
- Third preview in Java 24

**Why Scoped Values?**

**Problems with ThreadLocal:**
\`\`\`java
// ThreadLocal issues:
// 1. Memory leaks - must manually remove
// 2. Mutable - can be changed anywhere
// 3. Expensive with virtual threads
// 4. Unbounded lifetime

ThreadLocal<User> currentUser = new ThreadLocal<>();

void processRequest(Request req) {
    try {
        currentUser.set(req.getUser());
        doWork();
    } finally {
        currentUser.remove();  // Must remember to clean up!
    }
}
\`\`\`

**With Scoped Values:**
\`\`\`java
// Scoped Value benefits:
// 1. Automatic cleanup
// 2. Immutable
// 3. Efficient with virtual threads
// 4. Bounded lifetime

ScopedValue<User> CURRENT_USER = ScopedValue.newInstance();

void processRequest(Request req) {
    ScopedValue.where(CURRENT_USER, req.getUser())
        .run(() -> doWork());
    // Automatically cleaned up - no finally needed!
}
\`\`\`

**Basic Usage:**

**Defining Scoped Value:**
\`\`\`java
public class RequestContext {
    public static final ScopedValue<User> CURRENT_USER =
        ScopedValue.newInstance();

    public static final ScopedValue<String> REQUEST_ID =
        ScopedValue.newInstance();

    public static final ScopedValue<Locale> LOCALE =
        ScopedValue.newInstance();
}
\`\`\`

**Setting and Reading Values:**
\`\`\`java
// Set single value
ScopedValue.where(CURRENT_USER, user)
    .run(() -> {
        User u = CURRENT_USER.get();  // Read value
        System.out.println("User: " + u.getName());
    });

// Outside scope - value not available
// CURRENT_USER.get();  // Throws NoSuchElementException

// Set multiple values
ScopedValue.where(CURRENT_USER, user)
    .where(REQUEST_ID, "req-123")
    .where(LOCALE, Locale.US)
    .run(() -> {
        // All values available here
        User u = CURRENT_USER.get();
        String id = REQUEST_ID.get();
        Locale loc = LOCALE.get();
    });
\`\`\`

**Returning Values:**
\`\`\`java
// Use call() instead of run() to return value
String result = ScopedValue.where(CURRENT_USER, user)
    .call(() -> {
        return "Processing for " + CURRENT_USER.get().getName();
    });

System.out.println(result);
\`\`\`

**Nested Scopes:**

**Rebinding Values:**
\`\`\`java
User admin = new User("admin");
User guest = new User("guest");

ScopedValue.where(CURRENT_USER, admin)
    .run(() -> {
        System.out.println(CURRENT_USER.get().getName());  // admin

        // Inner scope rebinds value
        ScopedValue.where(CURRENT_USER, guest)
            .run(() -> {
                System.out.println(CURRENT_USER.get().getName());  // guest
            });

        // Outer value restored
        System.out.println(CURRENT_USER.get().getName());  // admin
    });

// Value not available outside
\`\`\`

**Real-World Examples:**

**1. Web Request Processing:**
\`\`\`java
public class WebServer {
    private static final ScopedValue<User> CURRENT_USER =
        ScopedValue.newInstance();
    private static final ScopedValue<String> REQUEST_ID =
        ScopedValue.newInstance();
    private static final ScopedValue<Instant> REQUEST_START =
        ScopedValue.newInstance();

    void handleRequest(HttpRequest request) {
        User user = authenticate(request);
        String requestId = generateRequestId();

        ScopedValue.where(CURRENT_USER, user)
            .where(REQUEST_ID, requestId)
            .where(REQUEST_START, Instant.now())
            .run(() -> {
                try {
                    // Process request
                    Response response = processRequest(request);

                    // Log with context
                    logRequest(response);

                    sendResponse(response);
                } catch (Exception e) {
                    logError(e);  // Has access to user, requestId, etc.
                    sendError(e);
                }
            });
    }

    void logRequest(Response response) {
        // Automatically has access to scoped values
        System.out.printf(
            "[%s] User: %s, Status: %d, Duration: %dms%n",
            REQUEST_ID.get(),
            CURRENT_USER.get().getName(),
            response.getStatus(),
            Duration.between(REQUEST_START.get(), Instant.now()).toMillis()
        );
    }
}
\`\`\`

**2. Database Transaction Context:**
\`\`\`java
public class DatabaseService {
    private static final ScopedValue<Connection> CURRENT_CONNECTION =
        ScopedValue.newInstance();
    private static final ScopedValue<Boolean> IN_TRANSACTION =
        ScopedValue.newInstance();

    public <T> T inTransaction(Callable<T> work) throws Exception {
        Connection conn = dataSource.getConnection();

        return ScopedValue.where(CURRENT_CONNECTION, conn)
            .where(IN_TRANSACTION, true)
            .call(() -> {
                try {
                    conn.setAutoCommit(false);
                    T result = work.call();
                    conn.commit();
                    return result;
                } catch (Exception e) {
                    conn.rollback();
                    throw e;
                } finally {
                    conn.close();
                }
            });
    }

    public User findUser(int id) {
        // Automatically uses connection from scope
        Connection conn = CURRENT_CONNECTION.get();
        // ... query database
    }

    public void saveUser(User user) {
        if (!IN_TRANSACTION.isBound() || !IN_TRANSACTION.get()) {
            throw new IllegalStateException("Must be in transaction");
        }
        Connection conn = CURRENT_CONNECTION.get();
        // ... save to database
    }
}

// Usage
T result = dbService.inTransaction(() -> {
    User user = dbService.findUser(123);
    user.setEmail("new@example.com");
    dbService.saveUser(user);  // Uses same connection
    return user;
});
\`\`\`

**3. Security Context:**
\`\`\`java
public class SecurityService {
    private static final ScopedValue<Set<Permission>> PERMISSIONS =
        ScopedValue.newInstance();

    public void runWithPermissions(
        Set<Permission> permissions,
        Runnable action
    ) {
        ScopedValue.where(PERMISSIONS, Collections.unmodifiableSet(permissions))
            .run(action);
    }

    public void checkPermission(Permission required) {
        if (!PERMISSIONS.get().contains(required)) {
            throw new SecurityException(
                "Missing permission: " + required
            );
        }
    }

    public boolean hasPermission(Permission permission) {
        return PERMISSIONS.get().contains(permission);
    }
}

// Usage
securityService.runWithPermissions(
    Set.of(Permission.READ, Permission.WRITE),
    () -> {
        // Check permission before sensitive operation
        securityService.checkPermission(Permission.WRITE);

        // Perform operation
        writeToDatabase();
    }
);
\`\`\`

**Optional Values:**

**Checking if Bound:**
\`\`\`java
if (CURRENT_USER.isBound()) {
    User user = CURRENT_USER.get();
    System.out.println("Current user: " + user.getName());
} else {
    System.out.println("No user in context");
}

// Or use orElse
User user = CURRENT_USER.orElse(DEFAULT_USER);

// Or orElseThrow with custom exception
User user = CURRENT_USER.orElseThrow(
    () -> new IllegalStateException("No user in context")
);
\`\`\`

**Performance Characteristics:**

**ThreadLocal vs Scoped Values:**
\`\`\`java
// ThreadLocal - per-thread storage
ThreadLocal<User> tl = new ThreadLocal<>();
tl.set(user);  // Stored in thread
User u = tl.get();  // Retrieved from thread
tl.remove();  // Must manually clean up

// ScopedValue - stack-based storage
ScopedValue<User> sv = ScopedValue.newInstance();
ScopedValue.where(sv, user)  // Stored on call stack
    .run(() -> {
        User u = sv.get();  // Retrieved from call stack
    });  // Automatically cleaned up
\`\`\`

**Benefits with Virtual Threads:**
\`\`\`java
// Bad with virtual threads - memory overhead
ThreadLocal<User> currentUser = new ThreadLocal<>();

Executors.newVirtualThreadPerTaskExecutor().submit(() -> {
    currentUser.set(user);  // Allocates memory per virtual thread
    doWork();
    currentUser.remove();  // Must cleanup
});

// Good with virtual threads - no per-thread overhead
ScopedValue<User> CURRENT_USER = ScopedValue.newInstance();

Executors.newVirtualThreadPerTaskExecutor().submit(() -> {
    ScopedValue.where(CURRENT_USER, user)  // Stack-based, no allocation
        .run(() -> doWork());  // Auto cleanup
});
\`\`\`

**Best Practices:**

**1. Immutability:**
\`\`\`java
// Good - immutable value
record UserContext(String userId, Set<String> roles) {
    public UserContext {
        roles = Set.copyOf(roles);  // Defensive copy
    }
}

ScopedValue<UserContext> CONTEXT = ScopedValue.newInstance();

// Bad - mutable value (don't do this)
class MutableContext {
    private String userId;
    public void setUserId(String id) { this.userId = id; }
}
\`\`\`

**2. Constants:**
\`\`\`java
// Good - public static final
public static final ScopedValue<User> CURRENT_USER =
    ScopedValue.newInstance();

// Bad - non-constant
public ScopedValue<User> getCurrentUser() {
    return ScopedValue.newInstance();  // Creates new instance!
}
\`\`\`

**3. Naming:**
\`\`\`java
// Good - descriptive names
ScopedValue<User> CURRENT_USER = ScopedValue.newInstance();
ScopedValue<Transaction> ACTIVE_TRANSACTION = ScopedValue.newInstance();

// Bad - generic names
ScopedValue<Object> DATA = ScopedValue.newInstance();
\`\`\``
    },
    {
      id: 4,
      category: 'Primitive Patterns',
      question: 'What are Primitive Patterns in Pattern Matching (preview) in Java 24?',
      answer: `**Primitive Patterns (JEP 488 - Preview):**
- Pattern matching extended to primitive types
- Enables switching on primitives with patterns
- Range checks and comparisons in patterns
- Works with int, long, float, double, etc.
- Preview feature in Java 24

**Why Primitive Patterns?**

**Before (Traditional Approach):**
\`\`\`java
int score = getScore();

String grade;
if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else if (score >= 60) {
    grade = "D";
} else {
    grade = "F";
}
\`\`\`

**With Primitive Patterns:**
\`\`\`java
String grade = switch (score) {
    case int s when s >= 90 -> "A";
    case int s when s >= 80 -> "B";
    case int s when s >= 70 -> "C";
    case int s when s >= 60 -> "D";
    default -> "F";
};
\`\`\`

**Basic Patterns:**

**Exact Match:**
\`\`\`java
int value = getValue();

String result = switch (value) {
    case 0 -> "Zero";
    case 1 -> "One";
    case 2 -> "Two";
    default -> "Other: " + value;
};
\`\`\`

**Range Patterns:**
\`\`\`java
int temperature = getTemperature();

String description = switch (temperature) {
    case int t when t < 0 -> "Freezing";
    case int t when t < 10 -> "Cold";
    case int t when t < 20 -> "Cool";
    case int t when t < 30 -> "Warm";
    default -> "Hot";
};
\`\`\`

**Multiple Conditions:**
\`\`\`java
int age = getAge();

String category = switch (age) {
    case int a when a < 0 -> "Invalid";
    case int a when a < 13 -> "Child";
    case int a when a >= 13 && a < 20 -> "Teenager";
    case int a when a >= 20 && a < 65 -> "Adult";
    case int a when a >= 65 -> "Senior";
    default -> "Unknown";
};
\`\`\`

**Floating Point Patterns:**

**With Ranges:**
\`\`\`java
double price = getPrice();

String tier = switch (price) {
    case double p when p <= 0 -> "Invalid";
    case double p when p < 10.0 -> "Budget";
    case double p when p < 50.0 -> "Standard";
    case double p when p < 100.0 -> "Premium";
    case double p when Double.isInfinite(p) -> "Infinity";
    case double p when Double.isNaN(p) -> "Not a Number";
    default -> "Luxury";
};
\`\`\`

**Precision Comparisons:**
\`\`\`java
double value = calculate();

boolean isValid = switch (value) {
    case double v when Math.abs(v - 0.0) < 0.0001 -> true;  // Near zero
    case double v when v > 0.0 -> true;
    case double v when v < 0.0 -> false;
    default -> false;
};
\`\`\`

**Combining with Other Patterns:**

**Numeric Ranges with Object Patterns:**
\`\`\`java
Object obj = getValue();

String description = switch (obj) {
    case Integer i when i < 0 -> "Negative integer";
    case Integer i when i == 0 -> "Zero";
    case Integer i when i > 0 -> "Positive integer";
    case Double d when d < 0.0 -> "Negative double";
    case Double d when d > 0.0 -> "Positive double";
    case String s when s.matches("\\\\d+") -> "Numeric string";
    case String s -> "Non-numeric string";
    case null -> "Null value";
    default -> "Other type";
};
\`\`\`

**With Records:**
\`\`\`java
record Point(int x, int y) {}

String quadrant = switch (point) {
    case Point(int x, int y) when x > 0 && y > 0 -> "Q1";
    case Point(int x, int y) when x < 0 && y > 0 -> "Q2";
    case Point(int x, int y) when x < 0 && y < 0 -> "Q3";
    case Point(int x, int y) when x > 0 && y < 0 -> "Q4";
    case Point(0, int y) when y != 0 -> "Y-axis";
    case Point(int x, 0) when x != 0 -> "X-axis";
    case Point(0, 0) -> "Origin";
};
\`\`\`

**Real-World Examples:**

**1. HTTP Status Code Handling:**
\`\`\`java
int statusCode = response.getStatusCode();

String message = switch (statusCode) {
    case int s when s >= 200 && s < 300 -> "Success";
    case int s when s >= 300 && s < 400 -> "Redirection";
    case int s when s >= 400 && s < 500 -> {
        yield switch (s) {
            case 400 -> "Bad Request";
            case 401 -> "Unauthorized";
            case 403 -> "Forbidden";
            case 404 -> "Not Found";
            default -> "Client Error";
        };
    }
    case int s when s >= 500 && s < 600 -> {
        yield switch (s) {
            case 500 -> "Internal Server Error";
            case 502 -> "Bad Gateway";
            case 503 -> "Service Unavailable";
            default -> "Server Error";
        };
    }
    default -> "Unknown Status";
};
\`\`\`

**2. Financial Calculations:**
\`\`\`java
double amount = transaction.getAmount();

double fee = switch (amount) {
    case double a when a <= 0 -> 0.0;  // No fee for invalid
    case double a when a < 100.0 -> 2.50;  // Flat fee
    case double a when a < 1000.0 -> a * 0.025;  // 2.5%
    case double a when a < 10000.0 -> a * 0.020;  // 2.0%
    default -> amount * 0.015;  // 1.5% for large amounts
};
\`\`\`

**3. Temperature Conversion:**
\`\`\`java
double celsius = getCelsius();

String warning = switch (celsius) {
    case double c when c < -273.15 -> "Below absolute zero!";
    case double c when c < -40 -> "Extreme cold warning";
    case double c when c < 0 -> "Freezing";
    case double c when c >= 0 && c < 25 -> "Comfortable";
    case double c when c >= 25 && c < 35 -> "Warm";
    case double c when c >= 35 && c < 45 -> "Hot";
    case double c when c >= 45 -> "Extreme heat warning";
    case double c when Double.isNaN(c) -> "Invalid temperature";
    default -> "Unknown";
};
\`\`\`

**4. Score Grading with Special Cases:**
\`\`\`java
int score = getScore();
boolean extraCredit = hasExtraCredit();

String grade = switch (score) {
    case int s when s < 0 -> "Invalid";
    case int s when s > 100 && !extraCredit -> "Invalid";
    case int s when s >= 97 -> "A+";
    case int s when s >= 93 -> "A";
    case int s when s >= 90 -> "A-";
    case int s when s >= 87 -> "B+";
    case int s when s >= 83 -> "B";
    case int s when s >= 80 -> "B-";
    case int s when s >= 77 -> "C+";
    case int s when s >= 73 -> "C";
    case int s when s >= 70 -> "C-";
    case int s when s >= 67 -> "D+";
    case int s when s >= 65 -> "D";
    default -> "F";
};
\`\`\`

**Performance Optimization:**

**Range Tables:**
\`\`\`java
// Compiler can optimize range checks into jump tables
int value = getValue();

String result = switch (value) {
    case int v when v >= 0 && v < 10 -> "Single digit";
    case int v when v >= 10 && v < 100 -> "Double digit";
    case int v when v >= 100 && v < 1000 -> "Triple digit";
    default -> "Large number";
};

// May be compiled to efficient range comparisons
// instead of sequential if-else chain
\`\`\`

**Common Patterns:**

**Clamping:**
\`\`\`java
int clamp(int value, int min, int max) {
    return switch (value) {
        case int v when v < min -> min;
        case int v when v > max -> max;
        default -> value;
    };
}
\`\`\`

**Sign Function:**
\`\`\`java
int signum(double value) {
    return switch (value) {
        case double v when v > 0 -> 1;
        case double v when v < 0 -> -1;
        case double v when v == 0 -> 0;
        case double v when Double.isNaN(v) ->
            throw new IllegalArgumentException("NaN");
        default -> 0;
    };
}
\`\`\`

**Rounding Mode:**
\`\`\`java
double round(double value, String mode) {
    return switch (value) {
        case double v when mode.equals("up") && v > 0 ->
            Math.ceil(v);
        case double v when mode.equals("down") && v > 0 ->
            Math.floor(v);
        case double v when mode.equals("nearest") ->
            Math.round(v);
        default -> value;
    };
}
\`\`\`

**Benefits:**

**1. Readability:**
- Clear intent with when clauses
- More expressive than if-else chains
- Self-documenting code

**2. Type Safety:**
- Compiler checks patterns
- No ClassCastException
- Exhaustiveness checking

**3. Performance:**
- Optimized by compiler
- Jump tables for ranges
- Efficient branch prediction

**4. Maintainability:**
- Easy to add new cases
- Clear structure
- Less error-prone than if-else

**Best Practices:**

**Order Patterns Carefully:**
\`\`\`java
// Good - specific before general
case int i when i == 0 -> "Zero";
case int i when i > 0 -> "Positive";

// Bad - unreachable pattern
case int i when i > 0 -> "Positive";
case int i when i == 1 -> "One";  // Never reached!
\`\`\`

**Use Guards for Complex Logic:**
\`\`\`java
// Good - guard makes intent clear
case int score when score >= 90 && isPassing(score) -> "A";

// Less good - complex condition hidden
case int score when checkScore(score) -> "A";
\`\`\``
    }
  ]

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Stream Gatherers': '#f59e0b',
      'Class-File API': '#3b82f6',
      'Scoped Values': '#8b5cf6',
      'Primitive Patterns': '#10b981'
    }
    return colors[category] || '#6b7280'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={onBack}
          style={{
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
          ← Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#f9fafb',
          margin: 0
        }}>
          Java 24 Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Java 24 interview questions covering the latest features and enhancements in this release.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {questions.map((q) => (
          <div
            key={q.id}
            style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              borderRadius: '12px',
              border: `3px solid ${expandedQuestion === q.id ? getCategoryColor(q.category) : '#374151'}`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: expandedQuestion === q.id
                ? '0 8px 16px rgba(0,0,0,0.3)'
                : '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <button
              onClick={() => toggleQuestion(q.id)}
              style={{
                width: '100%',
                padding: '1.5rem',
                backgroundColor: expandedQuestion === q.id
                  ? `${getCategoryColor(q.category)}15`
                  : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = '#374151'
                }
              }}
              onMouseLeave={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'inline-block',
                  padding: '0.25rem 0.75rem',
                  backgroundColor: getCategoryColor(q.category),
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  {q.category}
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  color: '#e2e8f0',
                  margin: 0
                }}>
                  Q{q.id}. {q.question}
                </h3>
              </div>
              <div style={{
                fontSize: '1.5rem',
                color: getCategoryColor(q.category),
                fontWeight: 'bold',
                marginLeft: '1rem',
                transform: expandedQuestion === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>
                ▼
              </div>
            </button>

            {expandedQuestion === q.id && (
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#1e293b',
                borderTop: `2px solid ${getCategoryColor(q.category)}40`
              }}>
                <div style={{
                  fontSize: '1rem',
                  lineHeight: '1.8',
                  color: '#d1d5db',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  textAlign: 'left'
                }}>
                  {renderFormattedAnswer(q.answer)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: 'rgba(249, 115, 22, 0.15)',
        borderRadius: '12px',
        border: '2px solid #f97316'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fb923c', marginBottom: '0.5rem' }}>
          Java 24 Key Features
        </h3>
        <ul style={{ color: '#fdba74', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Stream Gatherers - Custom intermediate stream operations</li>
          <li>Class-File API (Second Preview) - Parse and generate class files</li>
          <li>Scoped Values (Third Preview) - Better alternative to ThreadLocal</li>
          <li>Primitive Patterns (Preview) - Pattern matching on primitive types</li>
          <li>Structured Concurrency (Second Preview) - Simplified concurrent programming</li>
          <li>Foreign Function & Memory API - Native interop improvements</li>
        </ul>
      </div>
    </div>
  )
}

export default Java24Questions
