import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function Lambdas({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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
      title: 'Lambda Expression Syntax and Types',
      difficulty: 'Easy',
      description: 'Understand lambda expression syntax variations, type inference, parameter types, and when to use lambdas. Learn the difference between single-expression and block lambdas, and how the compiler infers types from context.',
      examples: [
        { input: '(x, y) -> x + y', output: 'Lambda that adds two numbers' },
        { input: '() -> System.out.println("Hello")', output: 'Lambda with no parameters' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.function.*;

public class LambdaSyntax {
    // No parameters
    public static void noParameters() {
        Runnable r = // TODO: Lambda with no parameters
        r.run();
    }

    // One parameter
    public static void oneParameter() {
        Consumer<String> c = // TODO: Lambda with one parameter
        c.accept("Hello");
    }

    // Multiple parameters
    public static void multipleParameters() {
        BiFunction<Integer, Integer, Integer> add =
            // TODO: Lambda with two parameters
        System.out.println(add.apply(5, 3));
    }

    // Block lambda
    public static void blockLambda() {
        Function<String, String> process =
            // TODO: Lambda with multiple statements
        System.out.println(process.apply("hello"));
    }
}`,
          solution: `import java.util.*;
import java.util.function.*;

public class LambdaSyntax {
    // No parameters
    public static void noParameters() {
        // Single expression
        Runnable r1 = () -> System.out.println("No params");

        // Block
        Runnable r2 = () -> {
            System.out.println("Block");
            System.out.println("Multiple statements");
        };

        r1.run();
        r2.run();
    }

    // One parameter - parentheses optional
    public static void oneParameter() {
        // Without parentheses
        Consumer<String> c1 = s -> System.out.println(s);

        // With parentheses
        Consumer<String> c2 = (s) -> System.out.println(s);

        // With type
        Consumer<String> c3 = (String s) -> System.out.println(s);

        c1.accept("Hello");
    }

    // Multiple parameters - parentheses required
    public static void multipleParameters() {
        // Without types (type inference)
        BiFunction<Integer, Integer, Integer> add1 =
            (x, y) -> x + y;

        // With types
        BiFunction<Integer, Integer, Integer> add2 =
            (Integer x, Integer y) -> x + y;

        System.out.println("Sum: " + add1.apply(5, 3));
    }

    // Block lambda - requires explicit return
    public static void blockLambda() {
        Function<String, String> process = s -> {
            String upper = s.toUpperCase();
            String reversed = new StringBuilder(upper).reverse().toString();
            return reversed;  // Explicit return needed
        };

        System.out.println(process.apply("hello"));
    }

    public static void main(String[] args) {
        System.out.println("=== No Parameters ===");
        noParameters();

        System.out.println("\\n=== One Parameter ===");
        oneParameter();

        System.out.println("\\n=== Multiple Parameters ===");
        multipleParameters();

        System.out.println("\\n=== Block Lambda ===");
        blockLambda();
    }
}

// Time: O(1) to create lambda, O(depends) to execute
// Space: O(1)
// Lambdas are instances of functional interfaces`
        },
        python: {
          starterCode: `# Lambda syntax in Python
# Python equivalent of Java lambda expressions

# No parameters
no_params = lambda: print("No params")

# One parameter
one_param = lambda s: print(s)

# Multiple parameters
add = lambda x, y: x + y

# TODO: Implement the examples above
`,
          solution: `# Lambda syntax in Python
# Python equivalent of Java lambda expressions

# No parameters
no_params = lambda: print("No params")
no_params()

# One parameter (no parens needed for single param)
one_param = lambda s: print(s)
one_param("Hello")

# Multiple parameters
add = lambda x, y: x + y
print(f"Sum: {add(5, 3)}")

# Multi-line lambda equivalent (use def for multiple statements)
def process(s):
    upper = s.upper()
    reversed_str = upper[::-1]
    return reversed_str

print(process("hello"))

# Python lambdas are always single expressions
# Use def for multiple statements`
        }
      },
      explanation: 'Lambdas are anonymous functions that replace verbose anonymous classes. Key syntax rules: () -> expression for no params, x -> expression for one param (parens optional), (x, y) -> expression for multiple params. Block lambdas require explicit return.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 2,
      title: 'Lambda Expressions with Collections',
      difficulty: 'Easy',
      description: 'Apply lambdas to common collection operations: forEach, removeIf, sort, replaceAll. Learn how lambdas make collection manipulation more concise and readable compared to traditional approaches.',
      examples: [
        { input: 'List<String> names = ["Alice", "Bob", "Charlie"]', output: 'names.forEach(name -> System.out.println(name))' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;

public class LambdasWithCollections {
    // Iterate with forEach
    public static void iterateList(List<String> list) {
        // TODO: Use forEach with lambda
    }

    // Remove elements with removeIf
    public static void removeEvens(List<Integer> list) {
        // TODO: Use removeIf with lambda
    }

    // Sort with lambda comparator
    public static void sortByLength(List<String> list) {
        // TODO: Sort by string length using lambda
    }

    // Transform with replaceAll
    public static void toUpperCase(List<String> list) {
        // TODO: Convert all to uppercase using replaceAll
    }
}`,
          solution: `import java.util.*;
import java.util.function.*;

public class LambdasWithCollections {
    // forEach - iterate elements
    public static void iterateList(List<String> list) {
        // Lambda
        list.forEach(s -> System.out.println(s));

        // Method reference
        list.forEach(System.out::println);
    }

    // removeIf - conditional removal
    public static void removeEvens(List<Integer> list) {
        list.removeIf(n -> n % 2 == 0);
        System.out.println("After removing evens: " + list);
    }

    // sort - custom comparator
    public static void sortByLength(List<String> list) {
        // Lambda comparator
        list.sort((s1, s2) -> s1.length() - s2.length());

        // Or with Comparator.comparing
        list.sort(Comparator.comparing(String::length));

        System.out.println("Sorted by length: " + list);
    }

    // replaceAll - transform in place
    public static void toUpperCase(List<String> list) {
        list.replaceAll(s -> s.toUpperCase());

        // Or method reference
        list.replaceAll(String::toUpperCase);

        System.out.println("Uppercase: " + list);
    }

    public static void main(String[] args) {
        List<String> names = new ArrayList<>(
            Arrays.asList("Alice", "Bob", "Charlie")
        );

        System.out.println("=== forEach ===");
        iterateList(names);

        System.out.println("\\n=== removeIf ===");
        List<Integer> numbers = new ArrayList<>(
            Arrays.asList(1, 2, 3, 4, 5, 6)
        );
        removeEvens(numbers);

        System.out.println("\\n=== sort ===");
        List<String> words = new ArrayList<>(
            Arrays.asList("a", "aaa", "aa", "aaaa")
        );
        sortByLength(words);

        System.out.println("\\n=== replaceAll ===");
        toUpperCase(names);
    }
}

// Time: Varies by operation (forEach: O(n), sort: O(n log n))
// Space: O(1) for in-place operations
// Lambdas make code more concise and readable`
        },
        python: {
          starterCode: `# Collection operations with lambda in Python

names = ["Alice", "Bob", "Charlie"]

# TODO: Iterate with lambda/for loop

# TODO: Remove elements

# TODO: Sort by length

# TODO: Transform to uppercase
`,
          solution: `# Collection operations with lambda in Python

names = ["Alice", "Bob", "Charlie"]

# Iterate (Python doesn't have forEach, use for or map)
for name in names:
    print(name)

# Remove elements (filter for non-evens)
numbers = [1, 2, 3, 4, 5, 6]
odds = [n for n in numbers if n % 2 != 0]
print(f"After removing evens: {odds}")

# Sort by length
words = ["a", "aaa", "aa", "aaaa"]
words.sort(key=lambda s: len(s))
print(f"Sorted by length: {words}")

# Transform to uppercase
names_upper = [s.upper() for s in names]
# Or with map
names_upper2 = list(map(str.upper, names))
print(f"Uppercase: {names_upper}")`
        }
      },
      explanation: 'Use forEach for iteration, removeIf for conditional removal (O(n)), sort for custom ordering (O(n log n)), and replaceAll for in-place transformation (O(n)). Lambdas enable concise, functional-style collection operations.',
      timeComplexity: 'O(n) for forEach/removeIf/replaceAll, O(n log n) for sort',
      spaceComplexity: 'O(1)'
    },
    {
      id: 3,
      title: 'Method References',
      difficulty: 'Medium',
      description: 'Master method references as shorthand for lambdas. Learn the four types: static method, instance method on particular object, instance method on arbitrary object, and constructor references. Understand when method references are clearer than lambdas.',
      examples: [
        { input: 'list.forEach(System.out::println)', output: 'Instance method reference' },
        { input: 'String::valueOf', output: 'Static method reference' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.function.*;

public class MethodReferences {
    // Static method reference
    public static void staticMethodRef() {
        List<String> numbers = Arrays.asList("1", "2", "3");

        // Lambda
        List<Integer> parsed1 = numbers.stream()
            .map(s -> Integer.parseInt(s))
            .toList();

        // TODO: Convert to method reference
        List<Integer> parsed2 = numbers.stream()
            .map(/* TODO */)
            .toList();
    }

    // Instance method reference
    public static void instanceMethodRef() {
        List<String> strings = Arrays.asList("a", "b", "c");

        // TODO: Use method reference to print
        strings.forEach(/* TODO */);
    }

    // Constructor reference
    public static void constructorRef() {
        List<String> strings = Arrays.asList("a", "b", "c");

        // TODO: Convert strings to ArrayList using constructor reference
    }
}`,
          solution: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class MethodReferences {
    // Type 1: Static method reference (Class::staticMethod)
    public static void staticMethodRef() {
        List<String> numbers = Arrays.asList("1", "2", "3");

        // Lambda
        numbers.stream()
            .map(s -> Integer.parseInt(s))
            .forEach(System.out::println);

        // Static method reference
        numbers.stream()
            .map(Integer::parseInt)  // Reference to static method
            .forEach(System.out::println);

        // More examples
        List<Double> doubles = Arrays.asList(1.5, 2.7, 3.2);
        doubles.stream()
            .map(Math::ceil)  // Math.ceil is static
            .forEach(System.out::println);
    }

    // Type 2: Instance method reference (instance::instanceMethod)
    public static void instanceMethodRef() {
        String prefix = "Hello, ";

        List<String> names = Arrays.asList("Alice", "Bob");

        // Lambda
        names.stream()
            .map(name -> prefix.concat(name))
            .forEach(System.out::println);

        // Instance method reference
        names.stream()
            .map(prefix::concat)  // Reference to instance method
            .forEach(System.out::println);

        // Another example
        List<String> strings = Arrays.asList("a", "b", "c");
        strings.forEach(System.out::println);  // System.out is instance
    }

    // Type 3: Instance method of arbitrary object (Class::instanceMethod)
    public static void arbitraryObjectMethodRef() {
        List<String> words = Arrays.asList("apple", "banana", "cherry");

        // Lambda
        words.stream()
            .map(s -> s.toUpperCase())
            .forEach(System.out::println);

        // Method reference on arbitrary object
        words.stream()
            .map(String::toUpperCase)  // Called on each string
            .forEach(System.out::println);

        // Sorting example
        words.sort((s1, s2) -> s1.compareToIgnoreCase(s2));  // Lambda
        words.sort(String::compareToIgnoreCase);  // Method reference
    }

    // Type 4: Constructor reference (Class::new)
    public static void constructorRef() {
        List<String> strings = Arrays.asList("a", "b", "c");

        // Lambda creating ArrayList
        Supplier<List<String>> supplier1 = () -> new ArrayList<>();

        // Constructor reference
        Supplier<List<String>> supplier2 = ArrayList::new;

        // With streams
        List<String> list = strings.stream()
            .collect(Collectors.toCollection(ArrayList::new));

        // Array constructor reference
        String[] array = strings.stream()
            .toArray(String[]::new);  // String[]::new is array constructor

        System.out.println("List: " + list);
        System.out.println("Array: " + Arrays.toString(array));
    }

    public static void main(String[] args) {
        System.out.println("=== Static Method Reference ===");
        staticMethodRef();

        System.out.println("\\n=== Instance Method Reference ===");
        instanceMethodRef();

        System.out.println("\\n=== Arbitrary Object Method Reference ===");
        arbitraryObjectMethodRef();

        System.out.println("\\n=== Constructor Reference ===");
        constructorRef();
    }
}

// Time: Same as lambda (just syntax sugar)
// Space: Same as lambda
// Method references are compiled to same bytecode as equivalent lambdas`
        },
        python: {
          starterCode: `# Python doesn't have exact method references like Java
# But we can use similar concepts with function references

numbers = ["1", "2", "3"]

# TODO: Use int function as reference
# TODO: Use str.upper as reference
`,
          solution: `# Python doesn't have exact method references like Java
# But we can use similar concepts with function references

numbers = ["1", "2", "3"]

# Function reference (similar to static method reference)
parsed = list(map(int, numbers))  # int is a function reference
print(parsed)

# Method reference on string class
words = ["apple", "banana", "cherry"]
upper_words = list(map(str.upper, words))  # str.upper as reference
print(upper_words)

# Instance method reference
prefix = "Hello, "
names = ["Alice", "Bob"]
# Python doesn't have direct instance method reference syntax
# Use lambda instead
greetings = [prefix + name for name in names]
print(greetings)

# Constructor reference (class as callable)
lists = [list(), list(), list()]  # list is constructor reference
print(lists)`
        }
      },
      explanation: 'Four types of method references: 1) Static (Class::staticMethod), 2) Instance of specific object (instance::method), 3) Instance of arbitrary object (Class::instanceMethod), 4) Constructor (Class::new). Use when lambda just calls one method with same parameters.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 4,
      title: 'Higher-Order Functions with Lambdas',
      difficulty: 'Medium',
      description: 'Build higher-order functions that accept functions as parameters or return functions. Learn function composition, currying, and building reusable functional utilities. Understand how to create flexible, composable APIs.',
      examples: [
        { input: 'Function<Integer, Integer> addTen = add(10)', output: 'Returns function that adds 10 to input' }
      ],
      code: {
        java: {
          starterCode: `import java.util.function.*;

public class HigherOrderFunctions {
    // Function that returns a function
    public static Function<Integer, Integer> add(int x) {
        // TODO: Return function that adds x to input
        return null;
    }

    // Function that accepts a function
    public static int applyTwice(Function<Integer, Integer> f, int x) {
        // TODO: Apply function twice
        return 0;
    }

    // Function composition
    public static Function<Integer, Integer> compose(
            Function<Integer, Integer> f,
            Function<Integer, Integer> g) {
        // TODO: Return f(g(x))
        return null;
    }
}`,
          solution: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class HigherOrderFunctions {
    // Function that returns a function (Currying)
    public static Function<Integer, Integer> add(int x) {
        return y -> x + y;
    }

    public static Function<Integer, Integer> multiply(int x) {
        return y -> x * y;
    }

    // Function that accepts a function
    public static int applyTwice(Function<Integer, Integer> f, int x) {
        return f.apply(f.apply(x));
    }

    public static <T> void repeat(Consumer<T> action, T value, int times) {
        for (int i = 0; i < times; i++) {
            action.accept(value);
        }
    }

    // Function composition: f(g(x))
    public static Function<Integer, Integer> compose(
            Function<Integer, Integer> f,
            Function<Integer, Integer> g) {
        return x -> f.apply(g.apply(x));
    }

    // Using built-in compose
    public static void builtInComposition() {
        Function<Integer, Integer> addTwo = x -> x + 2;
        Function<Integer, Integer> multiplyThree = x -> x * 3;

        // compose: f.compose(g) = f(g(x))
        Function<Integer, Integer> composed1 =
            addTwo.compose(multiplyThree);
        System.out.println("compose: " + composed1.apply(5));  // (5*3)+2 = 17

        // andThen: f.andThen(g) = g(f(x))
        Function<Integer, Integer> composed2 =
            addTwo.andThen(multiplyThree);
        System.out.println("andThen: " + composed2.apply(5));  // (5+2)*3 = 21
    }

    // Predicate composition
    public static void predicateComposition() {
        Predicate<Integer> isEven = x -> x % 2 == 0;
        Predicate<Integer> isPositive = x -> x > 0;

        // and: both must be true
        Predicate<Integer> isEvenAndPositive = isEven.and(isPositive);
        System.out.println("4 even and positive? " +
            isEvenAndPositive.test(4));  // true
        System.out.println("-4 even and positive? " +
            isEvenAndPositive.test(-4));  // false

        // or: at least one must be true
        Predicate<Integer> isEvenOrNegative = isEven.or(x -> x < 0);
        System.out.println("3 even or negative? " +
            isEvenOrNegative.test(3));  // false
        System.out.println("-3 even or negative? " +
            isEvenOrNegative.test(-3));  // true

        // negate: opposite
        Predicate<Integer> isOdd = isEven.negate();
        System.out.println("5 is odd? " + isOdd.test(5));  // true
    }

    public static void main(String[] args) {
        System.out.println("=== Returning Functions ===");
        Function<Integer, Integer> add5 = add(5);
        System.out.println("5 + 3 = " + add5.apply(3));

        System.out.println("\\n=== Accepting Functions ===");
        Function<Integer, Integer> double_ = x -> x * 2;
        System.out.println("Apply twice: " + applyTwice(double_, 3));

        System.out.println("\\n=== Composition ===");
        builtInComposition();

        System.out.println("\\n=== Predicate Composition ===");
        predicateComposition();
    }
}

// Time: O(1) for function creation, varies for execution
// Space: O(1) for simple functions, O(n) for memoization
// Higher-order functions enable functional programming patterns`
        },
        python: {
          starterCode: `# Higher-order functions in Python

def add(x):
    # TODO: Return function that adds x to input
    pass

def apply_twice(f, x):
    # TODO: Apply function twice
    pass

# TODO: Test the functions
`,
          solution: `# Higher-order functions in Python

# Function that returns a function (currying)
def add(x):
    return lambda y: x + y

def multiply(x):
    return lambda y: x * y

# Function that accepts a function
def apply_twice(f, x):
    return f(f(x))

# Function composition
def compose(f, g):
    return lambda x: f(g(x))

# Test
print("=== Returning Functions ===")
add5 = add(5)
print(f"5 + 3 = {add5(3)}")

print("\\n=== Accepting Functions ===")
double = lambda x: x * 2
print(f"Apply twice: {apply_twice(double, 3)}")

print("\\n=== Composition ===")
add_two = lambda x: x + 2
multiply_three = lambda x: x * 3

composed = compose(add_two, multiply_three)
print(f"compose: {composed(5)}")  # (5*3)+2 = 17

# Python also has functools.reduce for composition
from functools import reduce

def chain(*functions):
    def composed(x):
        return reduce(lambda acc, f: f(acc), functions, x)
    return composed

result = chain(multiply_three, add_two)(5)  # (5*3)+2 = 17
print(f"chain: {result}")`
        }
      },
      explanation: 'Higher-order functions accept or return functions. Currying transforms multi-param functions into chains of single-param functions. Composition combines functions: f.compose(g) = f(g(x)), f.andThen(g) = g(f(x)). Predicates support and(), or(), negate().',
      timeComplexity: 'O(1) for creation, varies for execution',
      spaceComplexity: 'O(1)'
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Lambdas-${q.id}`)).length
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
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', color: 'white', padding: '1.5rem' }}>
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            ← Back to Java
          </button>
          <LanguageToggle />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Problem Description */}
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#fbbf24', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`Lambdas-${selectedQuestion.id}`} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #374151', color: '#d1d5db' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#fbbf24' }}>Input:</strong> <code style={{ color: '#d1d5db' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: '#fbbf24' }}>Output:</strong> <code style={{ color: '#d1d5db' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '8px', border: '1px solid #374151' }}>
                <h3 style={{ fontSize: '1rem', color: '#fbbf24', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5', backgroundColor: '#111827', color: '#d1d5db' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: 'white', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #374151', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px', color: '#d1d5db' }}>{output}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', marginBottom: '0.5rem' }}>λ Lambda Expressions</h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>Master lambda expressions for functional programming in Java</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '2px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '2px solid #374151' }}>
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
                {difficultyQuestions.map((question) => (
                  <div key={question.id} onClick={() => selectQuestion(question)} style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '12px', border: '2px solid #374151', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`Lambdas-${question.id}`} />
                        </div>
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

export default Lambdas
