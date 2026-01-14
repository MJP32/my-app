import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function FunctionalInterfaces({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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
      title: 'Master Built-in Functional Interfaces',
      difficulty: 'Medium',
      description: 'Learn the core functional interfaces in java.util.function: Function, Consumer, Supplier, Predicate, BiFunction, BiConsumer, BiPredicate, UnaryOperator, and BinaryOperator. Understand when to use each and how they work with lambdas.',
      examples: [
        { input: 'Function<String, Integer> length = String::length', output: 'Transforms String to Integer' },
        { input: 'Consumer<String> print = s -> System.out.println(s)', output: 'Accepts String, returns void' },
        { input: 'Supplier<Double> random = () -> Math.random()', output: 'No input, returns Double' }
      ],
      code: {
        java: {
          starterCode: `import java.util.function.*;

public class BuiltInFunctionalInterfaces {
    // Function<T, R>: T -> R
    public static void functionExample() {
        Function<String, Integer> length = // TODO: s -> s.length()
        // TODO: Apply function
    }

    // Consumer<T>: T -> void
    public static void consumerExample() {
        Consumer<String> printer = // TODO: s -> System.out.println(s)
        // TODO: Accept consumer
    }

    // Supplier<T>: () -> T
    public static void supplierExample() {
        Supplier<Double> random = // TODO: () -> Math.random()
        // TODO: Get value
    }

    // Predicate<T>: T -> boolean
    public static void predicateExample() {
        Predicate<Integer> isEven = // TODO: n -> n % 2 == 0
        // TODO: Test predicate
    }
}`,
          solution: `import java.util.*;
import java.util.function.*;

public class BuiltInFunctionalInterfaces {
    // Function<T, R>: Takes T, returns R
    public static void functionExample() {
        Function<String, Integer> length = s -> s.length();
        Function<Integer, Integer> square = n -> n * n;

        System.out.println("Length of 'hello': " + length.apply("hello"));
        System.out.println("Square of 5: " + square.apply(5));

        // Chaining
        Function<String, Integer> lengthSquared =
            length.andThen(square);
        System.out.println("Length squared: " +
            lengthSquared.apply("hello"));  // 25
    }

    // Consumer<T>: Takes T, returns void
    public static void consumerExample() {
        Consumer<String> printer = s -> System.out.println(s);
        Consumer<String> upperPrinter = s -> System.out.println(s.toUpperCase());

        printer.accept("hello");
        upperPrinter.accept("hello");

        // Chaining
        Consumer<String> both = printer.andThen(upperPrinter);
        both.accept("test");
    }

    // Supplier<T>: Takes nothing, returns T
    public static void supplierExample() {
        Supplier<Double> random = () -> Math.random();
        Supplier<UUID> uuidGenerator = UUID::randomUUID;
        Supplier<List<String>> listFactory = ArrayList::new;

        System.out.println("Random: " + random.get());
        System.out.println("UUID: " + uuidGenerator.get());
        System.out.println("List: " + listFactory.get());
    }

    // Predicate<T>: Takes T, returns boolean
    public static void predicateExample() {
        Predicate<Integer> isEven = n -> n % 2 == 0;
        Predicate<Integer> isPositive = n -> n > 0;
        Predicate<String> isEmpty = String::isEmpty;

        System.out.println("4 is even? " + isEven.test(4));
        System.out.println("3 is even? " + isEven.test(3));

        // Combining predicates
        Predicate<Integer> isEvenAndPositive = isEven.and(isPositive);
        System.out.println("-4 even and positive? " +
            isEvenAndPositive.test(-4));  // false
    }

    // BiFunction<T, U, R>: Takes T and U, returns R
    public static void biFunctionExample() {
        BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
        BiFunction<String, String, String> concat = (s1, s2) -> s1 + s2;

        System.out.println("5 + 3 = " + add.apply(5, 3));
        System.out.println("Concat: " + concat.apply("Hello", "World"));
    }

    // UnaryOperator<T>: T -> T (special case of Function)
    public static void unaryOperatorExample() {
        UnaryOperator<Integer> square = n -> n * n;
        UnaryOperator<String> upper = String::toUpperCase;

        System.out.println("Square 5: " + square.apply(5));
        System.out.println("Upper 'hello': " + upper.apply("hello"));

        // Used in List.replaceAll
        List<Integer> numbers = new ArrayList<>(Arrays.asList(1, 2, 3));
        numbers.replaceAll(square);
        System.out.println("Squared list: " + numbers);
    }

    // BinaryOperator<T>: (T, T) -> T (special case of BiFunction)
    public static void binaryOperatorExample() {
        BinaryOperator<Integer> max = (a, b) -> a > b ? a : b;
        BinaryOperator<String> concat = (s1, s2) -> s1 + s2;

        System.out.println("Max of 5 and 3: " + max.apply(5, 3));

        // Used in Stream.reduce
        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
        int sum = nums.stream().reduce(0, Integer::sum);
        System.out.println("Sum: " + sum);
    }

    public static void main(String[] args) {
        System.out.println("=== Function ===");
        functionExample();

        System.out.println("\\n=== Consumer ===");
        consumerExample();

        System.out.println("\\n=== Supplier ===");
        supplierExample();

        System.out.println("\\n=== Predicate ===");
        predicateExample();

        System.out.println("\\n=== BiFunction ===");
        biFunctionExample();

        System.out.println("\\n=== UnaryOperator ===");
        unaryOperatorExample();

        System.out.println("\\n=== BinaryOperator ===");
        binaryOperatorExample();
    }
}`
        },
        python: {
          starterCode: `# Python equivalent of functional interfaces
from typing import Callable, TypeVar

T = TypeVar('T')
R = TypeVar('R')

# Function: T -> R (use regular functions or lambdas)
def function_example():
    length = lambda s: len(s)
    # TODO: Apply function
    pass

# Consumer: T -> None (use functions with no return)
def consumer_example():
    printer = lambda s: print(s)
    # TODO: Use consumer
    pass

# Supplier: () -> T (use functions with no parameters)
def supplier_example():
    import random
    random_supplier = lambda: random.random()
    # TODO: Get value
    pass

# Predicate: T -> bool
def predicate_example():
    is_even = lambda n: n % 2 == 0
    # TODO: Test predicate
    pass`,
          solution: `# Python equivalent of functional interfaces
from typing import Callable, TypeVar
import random

T = TypeVar('T')
R = TypeVar('R')

# Function: T -> R
def function_example():
    length = lambda s: len(s)
    square = lambda n: n * n

    print(f"Length of 'hello': {length('hello')}")
    print(f"Square of 5: {square(5)}")

    # Chaining (compose functions)
    length_squared = lambda s: square(length(s))
    print(f"Length squared: {length_squared('hello')}")

# Consumer: T -> None
def consumer_example():
    printer = lambda s: print(s)
    upper_printer = lambda s: print(s.upper())

    printer("hello")
    upper_printer("hello")

    # Chaining
    both = lambda s: (printer(s), upper_printer(s))
    both("test")

# Supplier: () -> T
def supplier_example():
    random_supplier = lambda: random.random()
    list_factory = lambda: []

    print(f"Random: {random_supplier()}")
    print(f"List: {list_factory()}")

# Predicate: T -> bool
def predicate_example():
    is_even = lambda n: n % 2 == 0
    is_positive = lambda n: n > 0
    is_empty = lambda s: len(s) == 0

    print(f"4 is even? {is_even(4)}")
    print(f"3 is even? {is_even(3)}")

    # Combining predicates
    is_even_and_positive = lambda n: is_even(n) and is_positive(n)
    print(f"-4 even and positive? {is_even_and_positive(-4)}")

# BiFunction: (T, U) -> R
def bifunction_example():
    add = lambda a, b: a + b
    concat = lambda s1, s2: s1 + s2

    print(f"5 + 3 = {add(5, 3)}")
    print(f"Concat: {concat('Hello', 'World')}")

if __name__ == "__main__":
    print("=== Function ===")
    function_example()

    print("\\n=== Consumer ===")
    consumer_example()

    print("\\n=== Supplier ===")
    supplier_example()

    print("\\n=== Predicate ===")
    predicate_example()

    print("\\n=== BiFunction ===")
    bifunction_example()`
        }
      },
      explanation: `**Key Insight: Each Interface Has Specific Purpose**
Choose the right functional interface based on input/output!

**Core Interfaces (0-1 argument):**
1. **Function<T,R>**: T → R (transform)
2. **Consumer<T>**: T → void (side effect)
3. **Supplier<T>**: () → T (factory)
4. **Predicate<T>**: T → boolean (test)
5. **UnaryOperator<T>**: T → T (same-type transform)

**Core Interfaces (2 arguments):**
6. **BiFunction<T,U,R>**: (T,U) → R
7. **BiConsumer<T,U>**: (T,U) → void
8. **BiPredicate<T,U>**: (T,U) → boolean
9. **BinaryOperator<T>**: (T,T) → T

**Composition:**
- Function: compose(), andThen()
- Predicate: and(), or(), negate()
- Consumer: andThen()`,
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 2,
      title: 'Create Custom Functional Interfaces',
      difficulty: 'Medium',
      description: 'Design custom functional interfaces with @FunctionalInterface annotation. Understand the single abstract method (SAM) requirement, default methods, static methods, and when to create custom interfaces vs. using built-in ones.',
      examples: [
        { input: '@FunctionalInterface interface Calculator { int calculate(int a, int b); }', output: 'Custom functional interface for calculations' },
        { input: 'Calculator calc = (a, b) -> a * b', output: 'Lambda implementation of custom interface' }
      ],
      code: {
        java: {
          starterCode: `@FunctionalInterface
interface Calculator {
    // TODO: Add single abstract method

    // TODO: Add default method

    // TODO: Add static method
}

@FunctionalInterface
interface TriFunction<T, U, V, R> {
    // TODO: Define three-argument function
}

public class CustomFunctionalInterfaces {
    public static void main(String[] args) {
        // TODO: Use custom interfaces with lambdas
    }
}`,
          solution: `import java.util.*;

// Custom functional interface
@FunctionalInterface
interface Calculator {
    // Single abstract method (SAM)
    int calculate(int a, int b);

    // Default methods are allowed
    default int square(int n) {
        return calculate(n, n);
    }

    // Static methods are allowed
    static Calculator adder() {
        return (a, b) -> a + b;
    }

    static Calculator multiplier() {
        return (a, b) -> a * b;
    }
}

// Three-argument function (not in java.util.function)
@FunctionalInterface
interface TriFunction<T, U, V, R> {
    R apply(T t, U u, V v);
}

// Validator interface
@FunctionalInterface
interface Validator<T> {
    boolean validate(T value);

    default Validator<T> and(Validator<T> other) {
        return value -> this.validate(value) && other.validate(value);
    }

    default Validator<T> or(Validator<T> other) {
        return value -> this.validate(value) || other.validate(value);
    }

    static <T> Validator<T> alwaysTrue() {
        return value -> true;
    }
}

// Parser interface
@FunctionalInterface
interface Parser<T> {
    T parse(String input) throws ParseException;

    default T parseOrDefault(String input, T defaultValue) {
        try {
            return parse(input);
        } catch (ParseException e) {
            return defaultValue;
        }
    }
}

class ParseException extends Exception {
    public ParseException(String message) {
        super(message);
    }
}

public class CustomFunctionalInterfaces {
    // Using custom Calculator
    public static void calculatorExample() {
        Calculator adder = (a, b) -> a + b;
        Calculator multiplier = (a, b) -> a * b;

        System.out.println("5 + 3 = " + adder.calculate(5, 3));
        System.out.println("5 * 3 = " + multiplier.calculate(5, 3));

        // Using default method
        System.out.println("Square of 5: " + multiplier.square(5));

        // Using static factory
        Calculator calc = Calculator.adder();
        System.out.println("From factory: " + calc.calculate(10, 20));
    }

    // Using TriFunction
    public static void triFunctionExample() {
        TriFunction<Integer, Integer, Integer, Integer> sumOfThree =
            (a, b, c) -> a + b + c;

        System.out.println("Sum of 1, 2, 3: " +
            sumOfThree.apply(1, 2, 3));
    }

    // Using Validator
    public static void validatorExample() {
        Validator<String> notNull = s -> s != null;
        Validator<String> notEmpty = s -> !s.isEmpty();
        Validator<String> longerThan5 = s -> s.length() > 5;

        // Combining validators
        Validator<String> validString =
            notNull.and(notEmpty).and(longerThan5);

        System.out.println("Validate 'Hello World': " +
            validString.validate("Hello World"));  // true
        System.out.println("Validate 'Hi': " +
            validString.validate("Hi"));  // false
    }

    public static void main(String[] args) {
        System.out.println("=== Calculator ===");
        calculatorExample();

        System.out.println("\\n=== TriFunction ===");
        triFunctionExample();

        System.out.println("\\n=== Validator ===");
        validatorExample();
    }
}`
        },
        python: {
          starterCode: `# Python doesn't have @FunctionalInterface annotation
# But we can create similar callable classes or use typing.Callable

from typing import Callable, TypeVar, Generic

T = TypeVar('T')
R = TypeVar('R')

# Custom functional interface equivalent
class Calculator:
    # TODO: Define __call__ method for single abstract method
    pass

# Three-argument function type
TriFunction = Callable[[T, T, T], R]

# TODO: Implement examples`,
          solution: `# Python doesn't have @FunctionalInterface annotation
# But we can create similar callable classes or use typing.Callable

from typing import Callable, TypeVar, Generic, Protocol

T = TypeVar('T')
R = TypeVar('R')

# Custom functional interface using Protocol (Python 3.8+)
class Calculator(Protocol):
    def calculate(self, a: int, b: int) -> int:
        ...

# Or use class with __call__
class CalculatorImpl:
    def __init__(self, operation):
        self.operation = operation

    def calculate(self, a: int, b: int) -> int:
        return self.operation(a, b)

    def square(self, n: int) -> int:
        return self.calculate(n, n)

# Three-argument function type
def calculator_example():
    # Using lambda
    adder = lambda a, b: a + b
    multiplier = lambda a, b: a * b

    print(f"5 + 3 = {adder(5, 3)}")
    print(f"5 * 3 = {multiplier(5, 3)}")

    # Using class
    calc = CalculatorImpl(lambda a, b: a * b)
    print(f"Square of 5: {calc.square(5)}")

# Three-argument function
def trifunction_example():
    sum_of_three = lambda a, b, c: a + b + c
    print(f"Sum of 1, 2, 3: {sum_of_three(1, 2, 3)}")

# Validator
class Validator:
    def __init__(self, validate_func):
        self.validate_func = validate_func

    def validate(self, value):
        return self.validate_func(value)

    def and_(self, other):
        return Validator(lambda v: self.validate(v) and other.validate(v))

    def or_(self, other):
        return Validator(lambda v: self.validate(v) or other.validate(v))

def validator_example():
    not_null = Validator(lambda s: s is not None)
    not_empty = Validator(lambda s: len(s) > 0)
    longer_than_5 = Validator(lambda s: len(s) > 5)

    valid_string = not_null.and_(not_empty).and_(longer_than_5)

    print(f"Validate 'Hello World': {valid_string.validate('Hello World')}")
    print(f"Validate 'Hi': {valid_string.validate('Hi')}")

if __name__ == "__main__":
    print("=== Calculator ===")
    calculator_example()

    print("\\n=== TriFunction ===")
    trifunction_example()

    print("\\n=== Validator ===")
    validator_example()`
        }
      },
      explanation: `**Key Insight: Single Abstract Method (SAM) Rule**
Exactly ONE abstract method, but unlimited default/static methods!

**@FunctionalInterface Rules:**
1. Exactly ONE abstract method (SAM)
2. Can have multiple default methods
3. Can have multiple static methods
4. Can override Object methods
5. Annotation is optional but recommended

**When to Create Custom:**
✓ Need >2 parameters (no BiFunction for 3+ params)
✓ Want descriptive method name (calculate vs apply)
✓ Domain-specific abstraction (Parser, Validator)
✓ Need default/static helper methods

**When to Use Built-in:**
✓ Generic operations (transform, test, consume)
✓ 0-2 parameters
✓ Common patterns`,
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 3,
      title: 'Understand Optional with Functional Interfaces',
      difficulty: 'Medium',
      description: 'Master Optional API with functional programming. Learn map, flatMap, filter, ifPresent, orElse, orElseGet, orElseThrow. Understand how to avoid null checks and work functionally with potentially absent values.',
      examples: [
        { input: 'Optional<String> name = Optional.of("Alice")', output: 'name.map(String::toUpperCase).orElse("Unknown")' },
        { input: 'Optional.empty().orElseGet(() -> "Default")', output: 'Lazy evaluation with Supplier' }
      ],
      code: {
        java: {
          starterCode: `import java.util.Optional;

public class OptionalWithFunctions {
    // Map: transform value if present
    public static Optional<Integer> getLength(String s) {
        // TODO: Return Optional with string length, or empty if null
        return null;
    }

    // FlatMap: avoid nested Optionals
    public static Optional<String> findUser(int id) {
        // TODO: Return Optional<String> username
        return null;
    }

    // Filter: conditional presence
    public static Optional<Integer> getEvenNumber(int n) {
        // TODO: Return Optional with n if even, empty otherwise
        return null;
    }

    // Chaining operations
    public static String processUser(Integer userId) {
        // TODO: Find user, get email, uppercase, or "NO EMAIL"
        return null;
    }
}`,
          solution: `import java.util.*;
import java.util.function.*;

public class OptionalWithFunctions {
    // Creating Optionals
    public static void creatingOptionals() {
        Optional<String> opt1 = Optional.of("Hello");
        Optional<String> opt2 = Optional.ofNullable(null);  // empty
        Optional<String> opt3 = Optional.empty();

        System.out.println("opt1: " + opt1);
        System.out.println("opt2: " + opt2);
    }

    // map: transform value if present
    public static void mapExample() {
        Optional<String> name = Optional.of("alice");

        Optional<String> upper = name.map(String::toUpperCase);
        System.out.println(upper.get());  // ALICE

        // Chain multiple maps
        Optional<Integer> length = name
            .map(String::trim)
            .map(String::toUpperCase)
            .map(String::length);

        System.out.println("Length: " + length.get());
    }

    // flatMap: avoid Optional<Optional<T>>
    public static void flatMapExample() {
        Optional<String> name = Optional.of("Alice");

        Optional<String> email = name.flatMap(s -> findEmail(s));
        System.out.println("Email: " + email.orElse("NO EMAIL"));

        // Chaining flatMaps
        Optional<String> result = findUser(1)
            .flatMap(user -> findEmail(user))
            .flatMap(email2 -> findDomain(email2));

        System.out.println("Domain: " + result.orElse("NO DOMAIN"));
    }

    // filter: conditional presence
    public static void filterExample() {
        Optional<Integer> number = Optional.of(42);

        Optional<Integer> even = number.filter(n -> n % 2 == 0);
        System.out.println("Even: " + even);  // Optional[42]

        Optional<Integer> odd = number.filter(n -> n % 2 == 1);
        System.out.println("Odd: " + odd);  // Optional.empty
    }

    // ifPresent: execute action if present
    public static void ifPresentExample() {
        Optional<String> name = Optional.of("Alice");

        // Old way
        if (name.isPresent()) {
            System.out.println(name.get());
        }

        // New way with ifPresent
        name.ifPresent(System.out::println);
    }

    // orElse vs orElseGet vs orElseThrow
    public static void orElseExample() {
        Optional<String> name = Optional.ofNullable(null);

        // orElse: return default value
        String result1 = name.orElse("Unknown");
        System.out.println(result1);

        // orElseGet: lazy evaluation with Supplier
        String result2 = name.orElseGet(() -> {
            System.out.println("Computing default...");
            return "Computed Default";
        });

        // Difference: orElse ALWAYS evaluates, orElseGet is lazy
        Optional<String> hasValue = Optional.of("Alice");
        String eager = hasValue.orElse(expensiveDefault());  // Called!
        String lazy = hasValue.orElseGet(() -> expensiveDefault());  // Not called
    }

    // Helper methods
    private static Optional<String> findUser(int id) {
        return id == 1 ? Optional.of("Alice") : Optional.empty();
    }

    private static Optional<String> findEmail(String user) {
        return Optional.ofNullable(
            "Alice".equals(user) ? "alice@example.com" : null
        );
    }

    private static Optional<String> findDomain(String email) {
        int index = email.indexOf('@');
        return index > 0
            ? Optional.of(email.substring(index + 1))
            : Optional.empty();
    }

    private static String expensiveDefault() {
        System.out.println("Computing expensive default...");
        return "Expensive";
    }

    public static void main(String[] args) {
        System.out.println("=== Creating Optionals ===");
        creatingOptionals();

        System.out.println("\\n=== map ===");
        mapExample();

        System.out.println("\\n=== flatMap ===");
        flatMapExample();

        System.out.println("\\n=== filter ===");
        filterExample();

        System.out.println("\\n=== ifPresent ===");
        ifPresentExample();

        System.out.println("\\n=== orElse vs orElseGet ===");
        orElseExample();
    }
}`
        },
        python: {
          starterCode: `# Python doesn't have Optional built-in
# Use None and check, or use typing.Optional

from typing import Optional

def get_length(s: Optional[str]) -> Optional[int]:
    # TODO: Return length if s is not None
    pass

def find_user(user_id: int) -> Optional[str]:
    # TODO: Return username or None
    pass

def process_user(user_id: int) -> str:
    # TODO: Find user, get email, uppercase, or "NO EMAIL"
    pass`,
          solution: `# Python doesn't have Optional built-in like Java
# Use None and check, or use typing.Optional

from typing import Optional, Callable, TypeVar

T = TypeVar('T')
R = TypeVar('R')

# Simple Optional-like class
class Maybe:
    def __init__(self, value):
        self._value = value

    @staticmethod
    def of(value):
        if value is None:
            raise ValueError("Value cannot be None")
        return Maybe(value)

    @staticmethod
    def of_nullable(value):
        return Maybe(value)

    @staticmethod
    def empty():
        return Maybe(None)

    def map(self, func: Callable):
        if self._value is None:
            return Maybe.empty()
        return Maybe(func(self._value))

    def flat_map(self, func: Callable):
        if self._value is None:
            return Maybe.empty()
        return func(self._value)

    def filter(self, predicate: Callable):
        if self._value is None or not predicate(self._value):
            return Maybe.empty()
        return self

    def or_else(self, default):
        return self._value if self._value is not None else default

    def or_else_get(self, supplier: Callable):
        return self._value if self._value is not None else supplier()

    def is_present(self):
        return self._value is not None

    def if_present(self, consumer: Callable):
        if self._value is not None:
            consumer(self._value)

# Examples
def creating_optionals():
    opt1 = Maybe.of("Hello")
    opt2 = Maybe.of_nullable(None)  # empty
    opt3 = Maybe.empty()

    print(f"opt1: {opt1._value}")
    print(f"opt2 is present: {opt2.is_present()}")

def map_example():
    name = Maybe.of("alice")

    upper = name.map(str.upper)
    print(f"Upper: {upper._value}")

    # Chain multiple maps
    length = name.map(str.strip).map(str.upper).map(len)
    print(f"Length: {length._value}")

def filter_example():
    number = Maybe.of(42)

    even = number.filter(lambda n: n % 2 == 0)
    print(f"Even: {even._value}")

    odd = number.filter(lambda n: n % 2 == 1)
    print(f"Odd is present: {odd.is_present()}")

def or_else_example():
    name = Maybe.of_nullable(None)

    result1 = name.or_else("Unknown")
    print(f"Result: {result1}")

    result2 = name.or_else_get(lambda: "Computed Default")
    print(f"Result: {result2}")

if __name__ == "__main__":
    print("=== Creating Optionals ===")
    creating_optionals()

    print("\\n=== map ===")
    map_example()

    print("\\n=== filter ===")
    filter_example()

    print("\\n=== orElse ===")
    or_else_example()`
        }
      },
      explanation: `**Key Insight: Functional Operations on Optional Values**
Chain transformations on values that may or may not exist!

**Optional Creation:**
- of(value): Non-null value (throws if null)
- ofNullable(value): Nullable value
- empty(): Explicitly empty

**Transformation (Functional Interfaces):**
1. **map(Function)**: Transform value if present
2. **flatMap(Function)**: Transform to Optional (avoids nesting)
3. **filter(Predicate)**: Keep only if matches condition

**Retrieval:**
- orElse(T): Default value (eager - always evaluated!)
- orElseGet(Supplier): Lazy default (only if empty)
- orElseThrow(Supplier): Throw exception
- ifPresent(Consumer): Execute if present`,
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 4,
      title: 'Implement Composable APIs with Functional Interfaces',
      difficulty: 'Medium',
      description: 'Design fluent, composable APIs using functional interfaces. Build DSLs (Domain-Specific Languages), method chaining, builder patterns, and pipeline-style APIs. Learn how functional interfaces enable expressive, declarative code.',
      examples: [
        { input: 'Query.select("name").from("users").where(age > 18)', output: 'Fluent API using functional interfaces' },
        { input: 'Pipeline.add(trim).add(toLowerCase).execute(text)', output: 'Composable pipeline' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;
import java.util.function.*;

class QueryBuilder {
    // TODO: Build fluent API for database queries
    public QueryBuilder select(String... fields) {
        // TODO
        return this;
    }

    public QueryBuilder from(String table) {
        // TODO
        return this;
    }

    public QueryBuilder where(Predicate<Map<String, Object>> condition) {
        // TODO
        return this;
    }

    public List<Map<String, Object>> execute() {
        // TODO
        return null;
    }
}`,
          solution: `import java.util.*;
import java.util.function.*;
import java.util.stream.*;

// Fluent Query Builder
class QueryBuilder {
    private List<String> selectFields = new ArrayList<>();
    private String fromTable;
    private List<Predicate<Map<String, Object>>> conditions = new ArrayList<>();
    private List<Map<String, Object>> data;

    public QueryBuilder(List<Map<String, Object>> data) {
        this.data = data;
    }

    public QueryBuilder select(String... fields) {
        selectFields.addAll(Arrays.asList(fields));
        return this;
    }

    public QueryBuilder from(String table) {
        this.fromTable = table;
        return this;
    }

    public QueryBuilder where(Predicate<Map<String, Object>> condition) {
        conditions.add(condition);
        return this;
    }

    public List<Map<String, Object>> execute() {
        Predicate<Map<String, Object>> combinedCondition =
            conditions.stream()
                .reduce(Predicate::and)
                .orElse(row -> true);

        return data.stream()
            .filter(combinedCondition)
            .map(row -> {
                if (selectFields.isEmpty()) return row;
                Map<String, Object> filtered = new HashMap<>();
                selectFields.forEach(field ->
                    filtered.put(field, row.get(field))
                );
                return filtered;
            })
            .collect(Collectors.toList());
    }
}

// Validation DSL
class Validator<T> {
    private T value;
    private List<Predicate<T>> rules = new ArrayList<>();

    private Validator(T value) {
        this.value = value;
    }

    public static <T> Validator<T> of(T value) {
        return new Validator<>(value);
    }

    public Validator<T> ensure(Predicate<T> rule, String message) {
        rules.add(rule);
        return this;
    }

    public Validator<T> isNotNull() {
        return ensure(v -> v != null, "Value cannot be null");
    }

    public Validator<T> matches(Predicate<T> predicate) {
        return ensure(predicate, "Value doesn't match condition");
    }

    public boolean isValid() {
        return rules.stream().allMatch(rule -> rule.test(value));
    }
}

// Pipeline Builder
class Pipeline<T> {
    private List<Function<T, T>> operations = new ArrayList<>();

    public Pipeline<T> add(Function<T, T> operation) {
        operations.add(operation);
        return this;
    }

    public Pipeline<T> addIf(boolean condition, Function<T, T> operation) {
        if (condition) {
            operations.add(operation);
        }
        return this;
    }

    public T execute(T input) {
        T result = input;
        for (Function<T, T> op : operations) {
            result = op.apply(result);
        }
        return result;
    }
}

// Event Stream Builder
class EventStream<T> {
    private List<Consumer<T>> handlers = new ArrayList<>();

    public EventStream<T> on(Predicate<T> condition, Consumer<T> handler) {
        handlers.add(event -> {
            if (condition.test(event)) {
                handler.accept(event);
            }
        });
        return this;
    }

    public EventStream<T> onAll(Consumer<T> handler) {
        handlers.add(handler);
        return this;
    }

    public void emit(T event) {
        handlers.forEach(handler -> handler.accept(event));
    }
}

public class ComposableAPIs {
    public static void main(String[] args) {
        System.out.println("=== Query Builder ===");
        List<Map<String, Object>> data = Arrays.asList(
            Map.of("name", "Alice", "age", 30),
            Map.of("name", "Bob", "age", 25),
            Map.of("name", "Charlie", "age", 35)
        );

        QueryBuilder query = new QueryBuilder(data);
        List<Map<String, Object>> results = query
            .select("name", "age")
            .from("users")
            .where(row -> (Integer)row.get("age") > 25)
            .execute();

        System.out.println("Results: " + results);

        System.out.println("\\n=== Validator ===");
        String email = "user@example.com";

        boolean valid = Validator.of(email)
            .isNotNull()
            .matches(s -> s.contains("@"))
            .matches(s -> s.length() > 5)
            .isValid();

        System.out.println("Email valid: " + valid);

        System.out.println("\\n=== Pipeline ===");
        Pipeline<String> textPipeline = new Pipeline<String>()
            .add(String::trim)
            .add(String::toLowerCase)
            .add(s -> s.replaceAll("\\\\s+", "-"))
            .addIf(true, s -> s + ".txt");

        String result = textPipeline.execute("  Hello World  ");
        System.out.println("Processed: " + result);

        System.out.println("\\n=== Event Stream ===");
        EventStream<Integer> stream = new EventStream<Integer>()
            .on(n -> n % 2 == 0, n -> System.out.println("Even: " + n))
            .on(n -> n > 5, n -> System.out.println("Large: " + n))
            .onAll(n -> System.out.println("All: " + n));

        stream.emit(6);
    }
}`
        },
        python: {
          starterCode: `# Composable APIs in Python
from typing import List, Dict, Callable, TypeVar

T = TypeVar('T')

class QueryBuilder:
    def __init__(self, data: List[Dict]):
        self.data = data
        # TODO: Implement fluent API

    def select(self, *fields):
        # TODO
        return self

    def where(self, condition: Callable):
        # TODO
        return self

    def execute(self):
        # TODO
        pass`,
          solution: `# Composable APIs in Python
from typing import List, Dict, Callable, TypeVar, Any

T = TypeVar('T')

class QueryBuilder:
    def __init__(self, data: List[Dict]):
        self.data = data
        self.select_fields = []
        self.conditions = []

    def select(self, *fields):
        self.select_fields.extend(fields)
        return self

    def where(self, condition: Callable[[Dict], bool]):
        self.conditions.append(condition)
        return self

    def execute(self) -> List[Dict]:
        # Apply all conditions
        filtered = self.data
        for condition in self.conditions:
            filtered = [row for row in filtered if condition(row)]

        # Select specific fields
        if self.select_fields:
            filtered = [
                {k: v for k, v in row.items() if k in self.select_fields}
                for row in filtered
            ]

        return filtered

class Validator:
    def __init__(self, value):
        self.value = value
        self.rules = []

    @staticmethod
    def of(value):
        return Validator(value)

    def is_not_none(self):
        self.rules.append(lambda v: v is not None)
        return self

    def matches(self, predicate):
        self.rules.append(predicate)
        return self

    def is_valid(self) -> bool:
        return all(rule(self.value) for rule in self.rules)

class Pipeline:
    def __init__(self):
        self.operations = []

    def add(self, operation: Callable[[T], T]):
        self.operations.append(operation)
        return self

    def add_if(self, condition: bool, operation: Callable[[T], T]):
        if condition:
            self.operations.append(operation)
        return self

    def execute(self, input_value: T) -> T:
        result = input_value
        for operation in self.operations:
            result = operation(result)
        return result

# Examples
def main():
    print("=== Query Builder ===")
    data = [
        {"name": "Alice", "age": 30},
        {"name": "Bob", "age": 25},
        {"name": "Charlie", "age": 35}
    ]

    query = QueryBuilder(data)
    results = query.select("name", "age") \\
                   .where(lambda row: row["age"] > 25) \\
                   .execute()

    print(f"Results: {results}")

    print("\\n=== Validator ===")
    email = "user@example.com"

    valid = Validator.of(email) \\
                     .is_not_none() \\
                     .matches(lambda s: "@" in s) \\
                     .matches(lambda s: len(s) > 5) \\
                     .is_valid()

    print(f"Email valid: {valid}")

    print("\\n=== Pipeline ===")
    text_pipeline = Pipeline() \\
                        .add(str.strip) \\
                        .add(str.lower) \\
                        .add(lambda s: s.replace(" ", "-")) \\
                        .add_if(True, lambda s: s + ".txt")

    result = text_pipeline.execute("  Hello World  ")
    print(f"Processed: {result}")

if __name__ == "__main__":
    main()`
        }
      },
      explanation: `**Key Insight: Method Chaining + Functional Interfaces = Powerful DSLs**
Enable declarative, readable code that flows naturally!

**Composable API Patterns:**
1. **Query Builder**: Fluent database queries
2. **Validator**: Chain validation rules
3. **Pipeline**: Sequential transformations
4. **Event Stream**: Conditional event handlers
5. **Builder Pattern**: Functional setters

**Design Principles:**
- Return this for chaining
- Accept functional interfaces for flexibility
- Use Predicate for conditions
- Use Function for transformations
- Use Consumer for actions`,
      timeComplexity: 'Varies by operation',
      spaceComplexity: 'O(1) to O(n)'
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`FunctionalInterfaces-${q.id}`)).length
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
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}>
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
              <CompletionCheckbox problemId={`FunctionalInterfaces-${selectedQuestion.id}`} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ backgroundColor: '#374151', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #374151', color: '#d1d5db' }}>
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
                <pre style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: '1.6', whiteSpace: 'pre-wrap', fontFamily: 'system-ui' }}>{selectedQuestion.explanation}</pre>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#374151', borderRadius: '8px', border: '1px solid #4b5563' }}>
                <h3 style={{ fontSize: '1rem', color: '#fbbf24', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5', backgroundColor: '#1f2937', color: '#d1d5db' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#fbbf24', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#374151', padding: '1rem', borderRadius: '8px', border: '1px solid #4b5563', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px', color: '#d1d5db' }}>{output}</pre>
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
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fbbf24', marginBottom: '0.5rem' }}>Functional Interfaces</h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>Master functional interfaces for lambda expressions and functional programming</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: '2px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: '2px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', border: '2px solid #374151', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
                <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>({difficultyQuestions.length} problems)</span>
              </div>
              <span style={{ fontSize: '1.25rem', color: '#9ca3af' }}>{expandedSections[difficulty] ? '▼' : '▶'}</span>
            </button>

            {expandedSections[difficulty] && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
                {difficultyQuestions.map((question) => (
                  <div key={question.id} onClick={() => selectQuestion(question)} style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '1.5rem', borderRadius: '12px', border: '2px solid #374151', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#fbbf24', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`FunctionalInterfaces-${question.id}`} />
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

export default FunctionalInterfaces
