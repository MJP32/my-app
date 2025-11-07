import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function LambdasAdvanced({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory }) {
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
      title: 'Function Composition',
      difficulty: 'Medium',
      description: 'Create a pipeline of functions that transforms a string: trim → uppercase → add prefix "PROCESSED: ". Use Function.andThen() to compose the operations.',
      examples: [
        { input: '"  hello  "', output: '"PROCESSED: HELLO"' },
        { input: '"  world  "', output: '"PROCESSED: WORLD"' },
        { input: '"  java lambdas  "', output: '"PROCESSED: JAVA LAMBDAS"' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.function.*;

public class FunctionComposition {
    public static void main(String[] args) {
        List<String> inputs = Arrays.asList(
            "  hello  ",
            "  world  ",
            "  java lambdas  "
        );

        // TODO: Create composed function: trim -> uppercase -> add prefix
        Function<String, String> pipeline = s -> s;

        inputs.forEach(input ->
            System.out.println(pipeline.apply(input))
        );
    }
}`,
          solution: `import java.util.*;
import java.util.function.*;

public class FunctionComposition {
    public static void main(String[] args) {
        List<String> inputs = Arrays.asList(
            "  hello  ",
            "  world  ",
            "  java lambdas  "
        );

        // Create composed function: trim -> uppercase -> add prefix
        Function<String, String> trim = String::trim;
        Function<String, String> uppercase = String::toUpperCase;
        Function<String, String> addPrefix = s -> "PROCESSED: " + s;

        Function<String, String> pipeline = trim
            .andThen(uppercase)
            .andThen(addPrefix);

        inputs.forEach(input ->
            System.out.println(pipeline.apply(input))
        );
    }
}

// Output:
// PROCESSED: HELLO
// PROCESSED: WORLD
// PROCESSED: JAVA LAMBDAS`
        },
        python: {
          starterCode: `# Function composition in Python
from typing import Callable

inputs = ["  hello  ", "  world  ", "  java lambdas  "]

# TODO: Create composed function: trim -> uppercase -> add prefix
def pipeline(s: str) -> str:
    return s

for input_str in inputs:
    print(pipeline(input_str))`,
          solution: `# Function composition in Python
from typing import Callable

inputs = ["  hello  ", "  world  ", "  java lambdas  "]

# Create composed function: trim -> uppercase -> add prefix
def compose(*functions):
    def composed(x):
        result = x
        for f in functions:
            result = f(result)
        return result
    return composed

trim = lambda s: s.strip()
uppercase = lambda s: s.upper()
add_prefix = lambda s: "PROCESSED: " + s

pipeline = compose(trim, uppercase, add_prefix)

for input_str in inputs:
    print(pipeline(input_str))

# Output:
# PROCESSED: HELLO
# PROCESSED: WORLD
# PROCESSED: JAVA LAMBDAS`
        }
      },
      explanation: 'Function composition chains operations using andThen() or compose(). f.andThen(g) applies f first, then g. This creates reusable transformation pipelines.',
      timeComplexity: 'O(n) where n is string length',
      spaceComplexity: 'O(n)'
    },
    {
      id: 2,
      title: 'Predicate Chaining',
      difficulty: 'Medium',
      description: 'Filter a list of integers using chained predicates: must be positive AND even AND greater than 10. Combine using Predicate.and().',
      examples: [
        { input: 'numbers = [-5, 8, 15, 22, -10, 4, 18, 30, 7, 12]', output: '[22, 18, 30, 12]' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class PredicateChaining {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(
            -5, 8, 15, 22, -10, 4, 18, 30, 7, 12
        );

        // TODO: Chain predicates: positive AND even AND > 10
        Predicate<Integer> combinedPredicate = n -> true;

        List<Integer> filtered = numbers.stream()
            .filter(combinedPredicate)
            .collect(Collectors.toList());

        System.out.println(filtered);
    }
}`,
          solution: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class PredicateChaining {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(
            -5, 8, 15, 22, -10, 4, 18, 30, 7, 12
        );

        // Chain predicates: positive AND even AND > 10
        Predicate<Integer> isPositive = n -> n > 0;
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Predicate<Integer> greaterThan10 = n -> n > 10;

        Predicate<Integer> combinedPredicate = isPositive
            .and(isEven)
            .and(greaterThan10);

        List<Integer> filtered = numbers.stream()
            .filter(combinedPredicate)
            .collect(Collectors.toList());

        System.out.println(filtered);
    }
}

// Output: [22, 18, 30, 12]`
        },
        python: {
          starterCode: `# Predicate chaining in Python
numbers = [-5, 8, 15, 22, -10, 4, 18, 30, 7, 12]

# TODO: Chain predicates: positive AND even AND > 10
filtered = [n for n in numbers if True]

print(filtered)`,
          solution: `# Predicate chaining in Python
numbers = [-5, 8, 15, 22, -10, 4, 18, 30, 7, 12]

# Chain predicates: positive AND even AND > 10
is_positive = lambda n: n > 0
is_even = lambda n: n % 2 == 0
greater_than_10 = lambda n: n > 10

# Combine with all()
combined_predicate = lambda n: all([
    is_positive(n),
    is_even(n),
    greater_than_10(n)
])

filtered = [n for n in numbers if combined_predicate(n)]
print(filtered)

# Or using filter
filtered2 = list(filter(combined_predicate, numbers))
print(filtered2)

# Output: [22, 18, 30, 12]`
        }
      },
      explanation: 'Predicate chaining uses and(), or(), and negate() to combine boolean conditions. Each predicate is testable and reusable independently.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 3,
      title: 'Custom Functional Interface',
      difficulty: 'Hard',
      description: 'Create a custom functional interface TriFunction<T,U,V,R> that takes 3 parameters and returns a result. Use it to calculate area of a triangle using Heron\'s formula.',
      examples: [
        { input: 'sides: 3.0, 4.0, 5.0', output: '6.00' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;

public class CustomFunctionalInterface {
    // TODO: Define TriFunction interface with @FunctionalInterface annotation

    public static void main(String[] args) {
        // TODO: Create lambda that calculates triangle area: (base * height) / 2
        // But you need all 3 sides to validate it's a valid triangle first

        double result = 0.0; // Replace with actual calculation

        System.out.printf("%.2f%n", result);
    }
}`,
          solution: `import java.util.*;

public class CustomFunctionalInterface {
    @FunctionalInterface
    interface TriFunction<T, U, V, R> {
        R apply(T t, U u, V v);
    }

    public static void main(String[] args) {
        // Calculate triangle area using Heron's formula
        TriFunction<Double, Double, Double, Double> triangleArea =
            (a, b, c) -> {
                double s = (a + b + c) / 2.0;
                return Math.sqrt(s * (s - a) * (s - b) * (s - c));
            };

        double result = triangleArea.apply(3.0, 4.0, 5.0);

        System.out.printf("%.2f%n", result);
    }
}

// Output: 6.00`
        },
        python: {
          starterCode: `# Custom functional interface in Python
import math

# TODO: Create a function that takes 3 parameters and calculates triangle area

def calculate_area(a, b, c):
    # TODO: Use Heron's formula
    return 0.0

result = calculate_area(3.0, 4.0, 5.0)
print(f"{result:.2f}")`,
          solution: `# Custom functional interface in Python
import math
from typing import Callable, TypeVar

T = TypeVar('T')
U = TypeVar('U')
V = TypeVar('V')
R = TypeVar('R')

# Type alias for TriFunction
TriFunction = Callable[[T, U, V], R]

# Calculate triangle area using Heron's formula
triangle_area: TriFunction[float, float, float, float] = (
    lambda a, b, c: math.sqrt((s := (a + b + c) / 2) * (s - a) * (s - b) * (s - c))
)

result = triangle_area(3.0, 4.0, 5.0)
print(f"{result:.2f}")

# Output: 6.00`
        }
      },
      explanation: 'Custom functional interfaces extend beyond built-in Function/BiFunction. Annotate with @FunctionalInterface for compile-time validation. Must have exactly one abstract method.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 4,
      title: 'Method References',
      difficulty: 'Medium',
      description: 'Use all 4 types of method references: static, instance on particular object, instance on arbitrary object, and constructor reference.',
      examples: [
        { input: 'names = ["Alice", "Bob", "Charlie"]', output: '[Bob:25, Alice:30, Charlie:35]' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.stream.*;

public class MethodReferences {
    static class Person {
        String name;
        int age;

        Person(String name) {
            this.name = name;
            this.age = 0;
        }

        Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        static int compareByAge(Person a, Person b) {
            return Integer.compare(a.age, b.age);
        }

        public String toString() {
            return name + ":" + age;
        }
    }

    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // TODO: Use constructor reference to create Person objects
        List<Person> people = names.stream()
            .map(s -> new Person(s))
            .collect(Collectors.toList());

        // Set ages
        people.get(0).age = 30;
        people.get(1).age = 25;
        people.get(2).age = 35;

        // TODO: Use static method reference to sort
        people.sort(null);

        // TODO: Use instance method reference on arbitrary object to get names
        List<String> sortedNames = people.stream()
            .map(p -> p.toString())
            .collect(Collectors.toList());

        System.out.println(sortedNames);
    }
}`,
          solution: `import java.util.*;
import java.util.stream.*;

public class MethodReferences {
    static class Person {
        String name;
        int age;

        Person(String name) {
            this.name = name;
            this.age = 0;
        }

        Person(String name, int age) {
            this.name = name;
            this.age = age;
        }

        static int compareByAge(Person a, Person b) {
            return Integer.compare(a.age, b.age);
        }

        public String toString() {
            return name + ":" + age;
        }
    }

    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

        // Constructor reference
        List<Person> people = names.stream()
            .map(Person::new)
            .collect(Collectors.toList());

        // Set ages
        people.get(0).age = 30;
        people.get(1).age = 25;
        people.get(2).age = 35;

        // Static method reference
        people.sort(Person::compareByAge);

        // Instance method reference on arbitrary object
        List<String> sortedNames = people.stream()
            .map(Person::toString)
            .collect(Collectors.toList());

        System.out.println(sortedNames);
    }
}

// Output: [Bob:25, Alice:30, Charlie:35]`
        },
        python: {
          starterCode: `# Method references in Python
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int = 0

    def __str__(self):
        return f"{self.name}:{self.age}"

names = ["Alice", "Bob", "Charlie"]

# TODO: Create Person objects
# TODO: Sort by age
# TODO: Convert to strings`,
          solution: `# Method references in Python
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int = 0

    @staticmethod
    def compare_by_age(a, b):
        return (a.age > b.age) - (a.age < b.age)

    def __str__(self):
        return f"{self.name}:{self.age}"

names = ["Alice", "Bob", "Charlie"]

# Constructor reference (class as callable)
people = [Person(name) for name in names]

# Set ages
people[0].age = 30
people[1].age = 25
people[2].age = 35

# Sort by age (using key function)
people.sort(key=lambda p: p.age)

# Instance method reference on arbitrary object
sorted_names = [str(p) for p in people]
# Or using map
sorted_names2 = list(map(str, people))

print(sorted_names)

# Output: ['Bob:25', 'Alice:30', 'Charlie:35']`
        }
      },
      explanation: 'Four types: Class::staticMethod, instance::method, Class::instanceMethod, Class::new. Use when lambda just calls one method with same parameters.',
      timeComplexity: 'O(n log n) for sorting',
      spaceComplexity: 'O(n)'
    },
    {
      id: 5,
      title: 'Exception Handling in Lambdas',
      difficulty: 'Hard',
      description: 'Create a wrapper to handle checked exceptions in lambda expressions. Parse integers from strings, handling NumberFormatException.',
      examples: [
        { input: 'numbers = ["10", "20", "abc", "30", "xyz", "40"]', output: '100' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class LambdaExceptionHandling {
    // TODO: Create a wrapper function that converts checked exceptions to unchecked

    public static void main(String[] args) {
        List<String> numbers = Arrays.asList("10", "20", "abc", "30", "xyz", "40");

        // TODO: Parse integers, skip invalid ones, sum the valid ones
        int sum = numbers.stream()
            .mapToInt(s -> Integer.parseInt(s))
            .sum();

        System.out.println(sum);
    }
}`,
          solution: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

public class LambdaExceptionHandling {
    @FunctionalInterface
    interface ThrowingFunction<T, R> {
        R apply(T t) throws Exception;
    }

    static <T, R> Function<T, Optional<R>> wrap(ThrowingFunction<T, R> f) {
        return t -> {
            try {
                return Optional.of(f.apply(t));
            } catch (Exception e) {
                return Optional.empty();
            }
        };
    }

    public static void main(String[] args) {
        List<String> numbers = Arrays.asList("10", "20", "abc", "30", "xyz", "40");

        // Parse integers, skip invalid ones, sum the valid ones
        int sum = numbers.stream()
            .map(wrap(Integer::parseInt))
            .filter(Optional::isPresent)
            .mapToInt(opt -> opt.get())
            .sum();

        System.out.println(sum);
    }
}

// Output: 100`
        },
        python: {
          starterCode: `# Exception handling in lambdas
numbers = ["10", "20", "abc", "30", "xyz", "40"]

# TODO: Parse integers, skip invalid ones, sum the valid ones
total = 0

print(total)`,
          solution: `# Exception handling in lambdas
from typing import Optional, Callable, TypeVar

T = TypeVar('T')
R = TypeVar('R')

def wrap(func: Callable[[T], R]) -> Callable[[T], Optional[R]]:
    """Wrap a function to catch exceptions and return Optional"""
    def wrapper(value: T) -> Optional[R]:
        try:
            return func(value)
        except Exception:
            return None
    return wrapper

numbers = ["10", "20", "abc", "30", "xyz", "40"]

# Parse integers, skip invalid ones, sum the valid ones
safe_parse = wrap(int)
parsed = [safe_parse(s) for s in numbers]
valid = [x for x in parsed if x is not None]
total = sum(valid)

print(total)

# Or more concise
total2 = sum(x for s in numbers if (x := safe_parse(s)) is not None)
print(total2)

# Output: 100`
        }
      },
      explanation: 'Lambdas cannot throw checked exceptions. Wrap in try-catch and return Optional or RuntimeException. Use custom functional interface with throws declaration.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)'
    },
    {
      id: 6,
      title: 'Consumer and Supplier Patterns',
      difficulty: 'Medium',
      description: 'Use Consumer to process data with side effects and Supplier for lazy initialization. Create a logger that uses Consumer chaining.',
      examples: [
        { input: 'messages = ["ERROR: File not found", "INFO: Process started", "WARN: Low memory"]', output: 'Logged with timestamps' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.function.*;

public class ConsumerSupplierPatterns {
    public static void main(String[] args) {
        List<String> messages = Arrays.asList("ERROR: File not found", "INFO: Process started", "WARN: Low memory");

        // TODO: Create consumers for logging with timestamp and level extraction
        Consumer<String> logger = msg -> {};

        messages.forEach(logger);

        // TODO: Use Supplier for lazy computation of expensive value
        Supplier<Double> expensiveCalculation = () -> 0.0;

        System.out.println("Result: " + expensiveCalculation.get());
    }
}`,
          solution: `import java.util.*;
import java.util.function.*;
import java.time.*;

public class ConsumerSupplierPatterns {
    public static void main(String[] args) {
        List<String> messages = Arrays.asList("ERROR: File not found", "INFO: Process started", "WARN: Low memory");

        // Create consumers for logging with timestamp and level extraction
        Consumer<String> addTimestamp = msg ->
            System.out.print("[" + LocalTime.now().toString().substring(0, 8) + "] ");

        Consumer<String> printMessage = System.out::println;

        Consumer<String> logger = addTimestamp.andThen(printMessage);

        messages.forEach(logger);

        // Use Supplier for lazy computation of expensive value
        Supplier<Double> expensiveCalculation = () -> {
            double result = 0;
            for (int i = 1; i <= 1000; i++) {
                result += Math.sqrt(i);
            }
            return result;
        };

        System.out.println("Result: " + String.format("%.2f", expensiveCalculation.get()));
    }
}

// Output (timestamps will vary):
// [HH:MM:SS] ERROR: File not found
// [HH:MM:SS] INFO: Process started
// [HH:MM:SS] WARN: Low memory
// Result: 21097.46`
        },
        python: {
          starterCode: `# Consumer and Supplier patterns in Python
from datetime import datetime

messages = ["ERROR: File not found", "INFO: Process started", "WARN: Low memory"]

# TODO: Create logger function
# TODO: Create lazy computation`,
          solution: `# Consumer and Supplier patterns in Python
from datetime import datetime
from typing import Callable
import math

messages = ["ERROR: File not found", "INFO: Process started", "WARN: Low memory"]

# Consumer pattern (functions with side effects)
def add_timestamp(msg: str) -> None:
    print(f"[{datetime.now().strftime('%H:%M:%S')}] ", end='')

def print_message(msg: str) -> None:
    print(msg)

# Chain consumers
def logger(msg: str) -> None:
    add_timestamp(msg)
    print_message(msg)

for msg in messages:
    logger(msg)

# Supplier pattern (lazy computation)
def expensive_calculation() -> float:
    result = 0
    for i in range(1, 1001):
        result += math.sqrt(i)
    return result

# Only computed when called
result = expensive_calculation()
print(f"Result: {result:.2f}")

# Output:
# [HH:MM:SS] ERROR: File not found
# [HH:MM:SS] INFO: Process started
# [HH:MM:SS] WARN: Low memory
# Result: 21097.46`
        }
      },
      explanation: 'Consumer accepts input, returns void (side effects). Use andThen() to chain. Supplier takes no input, returns value (lazy initialization). Useful for deferred computation.',
      timeComplexity: 'O(n) for consumer chain, O(1) for supplier creation',
      spaceComplexity: 'O(1)'
    },
    {
      id: 7,
      title: 'BiFunction and Higher-Order Functions',
      difficulty: 'Hard',
      description: 'Create functions that return other functions. Implement a function factory that creates specialized math operations.',
      examples: [
        { input: 'makeOperator("double").apply(5)', output: '10' },
        { input: 'makeOperator("square").apply(5)', output: '25' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.function.*;

public class HigherOrderFunctions {
    public static void main(String[] args) {
        // TODO: Create a function that returns a function
        // makeOperator should return different operations based on the operator string

        Function<Integer, Integer> double = null;
        Function<Integer, Integer> square = null;
        Function<Integer, Integer> negate = null;

        System.out.println(double.apply(5));
        System.out.println(square.apply(5));
        System.out.println(negate.apply(5));

        // TODO: Use BiFunction to create a calculator
        BiFunction<Integer, Integer, Integer> calculator = null;

        System.out.println(calculator.apply(10, 3));
    }
}`,
          solution: `import java.util.*;
import java.util.function.*;

public class HigherOrderFunctions {
    static Function<Integer, Integer> makeOperator(String op) {
        return switch(op) {
            case "double" -> x -> x * 2;
            case "square" -> x -> x * x;
            case "negate" -> x -> -x;
            default -> x -> x;
        };
    }

    public static void main(String[] args) {
        // Create functions that return functions
        Function<Integer, Integer> doubleOp = makeOperator("double");
        Function<Integer, Integer> square = makeOperator("square");
        Function<Integer, Integer> negate = makeOperator("negate");

        System.out.println(doubleOp.apply(5));
        System.out.println(square.apply(5));
        System.out.println(negate.apply(5));

        // Use BiFunction to create a calculator
        BiFunction<Integer, Integer, Integer> calculator = (a, b) -> a * a + b * b;

        System.out.println(calculator.apply(10, 3));
    }
}

// Output:
// 10
// 25
// -5
// 109`
        },
        python: {
          starterCode: `# Higher-order functions in Python

def make_operator(op):
    # TODO: Return different operations based on op
    pass

# TODO: Test the function factory`,
          solution: `# Higher-order functions in Python
from typing import Callable

def make_operator(op: str) -> Callable[[int], int]:
    """Function factory that returns different operations"""
    operations = {
        "double": lambda x: x * 2,
        "square": lambda x: x * x,
        "negate": lambda x: -x
    }
    return operations.get(op, lambda x: x)

# Create functions from factory
double_op = make_operator("double")
square = make_operator("square")
negate = make_operator("negate")

print(double_op(5))
print(square(5))
print(negate(5))

# BiFunction equivalent (function with 2 parameters)
calculator = lambda a, b: a * a + b * b

print(calculator(10, 3))

# Output:
# 10
# 25
# -5
# 109`
        }
      },
      explanation: 'Higher-order functions accept or return functions. BiFunction takes 2 parameters. Useful for creating configurable operations, strategies, and function factories.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 8,
      title: 'Lambda Variable Capture and Closures',
      difficulty: 'Hard',
      description: 'Demonstrate variable capture in lambdas. Create a counter factory that maintains state across invocations using closures.',
      examples: [
        { input: 'counter1.get() // counter2.get()', output: '0, 1, 100, 2, 110' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.function.*;

public class VariableCapture {
    // TODO: Create a method that returns a Supplier that maintains internal state

    public static void main(String[] args) {
        // TODO: Create multiple counter instances, each maintains its own state

        Supplier<Integer> counter1 = null;
        Supplier<Integer> counter2 = null;

        System.out.println(counter1.get());
        System.out.println(counter1.get());
        System.out.println(counter2.get());
        System.out.println(counter1.get());
        System.out.println(counter2.get());
    }
}`,
          solution: `import java.util.*;
import java.util.function.*;

public class VariableCapture {
    static Supplier<Integer> createCounter(int start, int step) {
        // Using array to work around "effectively final" requirement
        int[] count = {start};

        return () -> {
            int current = count[0];
            count[0] += step;
            return current;
        };
    }

    public static void main(String[] args) {
        // Create multiple counter instances, each maintains its own state
        Supplier<Integer> counter1 = createCounter(0, 1);
        Supplier<Integer> counter2 = createCounter(100, 10);

        System.out.println(counter1.get());
        System.out.println(counter1.get());
        System.out.println(counter2.get());
        System.out.println(counter1.get());
        System.out.println(counter2.get());
    }
}

// Output:
// 0
// 1
// 100
// 2
// 110`
        },
        python: {
          starterCode: `# Variable capture and closures in Python

def create_counter(start, step):
    # TODO: Create closure that maintains state
    pass

# TODO: Test multiple counter instances`,
          solution: `# Variable capture and closures in Python
from typing import Callable

def create_counter(start: int, step: int) -> Callable[[], int]:
    """Create a counter closure that maintains state"""
    count = [start]  # Use list for mutability

    def counter():
        current = count[0]
        count[0] += step
        return current

    return counter

# Create multiple counter instances, each maintains its own state
counter1 = create_counter(0, 1)
counter2 = create_counter(100, 10)

print(counter1())
print(counter1())
print(counter2())
print(counter1())
print(counter2())

# Output:
# 0
# 1
# 100
# 2
# 110

# Alternative using nonlocal (Python 3+)
def create_counter_v2(start: int, step: int) -> Callable[[], int]:
    count = start

    def counter():
        nonlocal count
        current = count
        count += step
        return current

    return counter`
        }
      },
      explanation: 'Lambdas capture variables from enclosing scope. Captured variables must be effectively final. Use array/object to modify captured state. Each closure maintains independent state.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1) per closure'
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`LambdasAdvanced-${q.id}`)).length
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

            <div style={{ marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`LambdasAdvanced-${selectedQuestion.id}`} />
            </div>

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
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
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
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>λ Advanced Lambda Expressions</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Master advanced functional programming patterns in Java</p>

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
                          <CompletionCheckbox problemId={`LambdasAdvanced-${question.id}`} />
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

export default LambdasAdvanced
