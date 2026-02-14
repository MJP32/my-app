import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

function MathFunctions({ onBack, breadcrumb }) {
  const [selectedConcept, setSelectedConcept] = useState(null)

  const activeBreadcrumb = selectedConcept ? {
    onMainMenu: breadcrumb?.onMainMenu,
    section: breadcrumb.section,
    category: breadcrumb.category,
    subcategory: {
      name: breadcrumb.topic,
      onClick: () => setSelectedConcept(null)
    },
    topic: selectedConcept.name,
    colors: breadcrumb.colors
  } : breadcrumb

  const parseCodeSections = (code) => {
    const sections = []
    const lines = code.split('\n')
    let currentSection = null
    let currentContent = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.includes('# ═══════════════════════════════════════════════════════════════')) {
        if (currentSection) {
          sections.push({ title: currentSection, code: currentContent.join('\n') })
          currentContent = []
        }

        if (i + 1 < lines.length && lines[i + 1].includes('# ✦')) {
          currentSection = lines[i + 1].replace('# ✦', '').trim()
          i += 2
          continue
        }
      }

      if (currentSection) {
        currentContent.push(line)
      }
    }

    if (currentSection && currentContent.length > 0) {
      sections.push({ title: currentSection, code: currentContent.join('\n') })
    }

    return sections
  }

  const concepts = [
    {
      name: 'Math Module Overview',
      icon: '🔢',
      explanation: `**Core Concept:**
• Python's built-in math module for mathematical operations
• Provides constants (pi, e, inf, nan, tau) and functions
• Works with integers and floats (not complex numbers)
• Use cmath module for complex number math
• Available without installation (standard library)

**Key Categories:**
• Number Theory: gcd, lcm, factorial, comb, perm
• Power & Logarithms: pow, sqrt, log, log2, log10, exp
• Trigonometry: sin, cos, tan, asin, acos, atan, atan2
• Rounding: floor, ceil, trunc, remainder
• Special: inf, nan, isfinite, isinf, isnan, isclose

**Constants:**
• math.pi = 3.141592653589793
• math.e = 2.718281828459045
• math.tau = 6.283185307179586 (2π)
• math.inf = positive infinity
• math.nan = Not a Number

**When to Use:**
• Precise mathematical calculations
• Number theory problems (GCD, LCM, factorials)
• Geometry and trigonometry
• Logarithmic computations
• Rounding with specific behavior`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Import and constants
# ═══════════════════════════════════════════════════════════════
import math

# Mathematical constants
print(f"pi:  {math.pi}")        # 3.141592653589793
print(f"e:   {math.e}")         # 2.718281828459045
print(f"tau: {math.tau}")       # 6.283185307179586 (2 * pi)
print(f"inf: {math.inf}")       # inf (positive infinity)
print(f"nan: {math.nan}")       # nan


# ═══════════════════════════════════════════════════════════════
# ✦ Checking special values
# ═══════════════════════════════════════════════════════════════
print(math.isinf(math.inf))     # True
print(math.isinf(100))          # False
print(math.isnan(math.nan))     # True
print(math.isnan(0))            # False
print(math.isfinite(100))       # True
print(math.isfinite(math.inf))  # False
print(math.isfinite(math.nan))  # False

# Comparing floats with tolerance (avoid == for floats)
print(math.isclose(0.1 + 0.2, 0.3))              # True
print(math.isclose(0.1 + 0.2, 0.3, rel_tol=1e-9)) # True
print(0.1 + 0.2 == 0.3)                            # False!


# ═══════════════════════════════════════════════════════════════
# ✦ Using inf for algorithm initialization
# ═══════════════════════════════════════════════════════════════
# Common pattern: initialize minimum/maximum tracking
min_val = math.inf
max_val = -math.inf
nums = [3, 1, 4, 1, 5, 9, 2, 6]
for n in nums:
    min_val = min(min_val, n)
    max_val = max(max_val, n)
print(f"min={min_val}, max={max_val}")  # min=1, max=9

# Also works with float('inf')
print(math.inf == float('inf'))  # True`
    },
    {
      name: 'Number Theory Functions',
      icon: '🧮',
      explanation: `**Core Functions:**
• math.gcd(a, b): Greatest Common Divisor
• math.lcm(a, b): Least Common Multiple (Python 3.9+)
• math.factorial(n): n! (n factorial)
• math.comb(n, k): Combinations C(n,k) = n! / (k!(n-k)!)
• math.perm(n, k): Permutations P(n,k) = n! / (n-k)!

**GCD / LCM:**
• gcd(0, n) = n for any n
• gcd supports multiple arguments in Python 3.9+
• lcm = (a * b) // gcd(a, b)

**Combinatorics:**
• comb(n, k) returns integer (exact, no overflow)
• perm(n, k) returns integer
• factorial grows very fast (20! ≈ 2.4 × 10^18)

**Use Cases:**
• Fraction simplification (GCD)
• Scheduling problems (LCM)
• Probability calculations (comb, perm)
• Counting arrangements
• Modular arithmetic problems`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ GCD - Greatest Common Divisor
# ═══════════════════════════════════════════════════════════════
import math

# Basic GCD
print(math.gcd(12, 8))     # 4
print(math.gcd(48, 18))    # 6
print(math.gcd(100, 75))   # 25
print(math.gcd(17, 13))    # 1 (coprime)
print(math.gcd(0, 5))      # 5

# Multiple arguments (Python 3.9+)
print(math.gcd(12, 18, 24))  # 6

# GCD of a list
nums = [36, 48, 60, 72]
from functools import reduce
result = reduce(math.gcd, nums)
print(f"GCD of {nums}: {result}")  # 12

# Simplify fraction using GCD
def simplify(num, den):
    g = math.gcd(abs(num), abs(den))
    return num // g, den // g

print(simplify(48, 36))  # (4, 3)
print(simplify(100, 75)) # (4, 3)


# ═══════════════════════════════════════════════════════════════
# ✦ LCM - Least Common Multiple
# ═══════════════════════════════════════════════════════════════
# Python 3.9+
print(math.lcm(4, 6))      # 12
print(math.lcm(3, 5))      # 15
print(math.lcm(12, 18))    # 36
print(math.lcm(4, 6, 10))  # 60

# For older Python versions
def lcm(a, b):
    return abs(a * b) // math.gcd(a, b)

print(lcm(4, 6))   # 12
print(lcm(12, 18))  # 36

# LCM of a list
nums = [4, 6, 10, 15]
result = reduce(lcm, nums)
print(f"LCM of {nums}: {result}")  # 60


# ═══════════════════════════════════════════════════════════════
# ✦ Factorial
# ═══════════════════════════════════════════════════════════════
print(math.factorial(0))   # 1
print(math.factorial(1))   # 1
print(math.factorial(5))   # 120
print(math.factorial(10))  # 3628800
print(math.factorial(20))  # 2432902008176640000

# Count trailing zeros in n!
def trailing_zeros(n):
    """Count trailing zeros in n! (count factors of 5)"""
    count = 0
    power_of_5 = 5
    while power_of_5 <= n:
        count += n // power_of_5
        power_of_5 *= 5
    return count

print(f"Trailing zeros in 100!: {trailing_zeros(100)}")  # 24


# ═══════════════════════════════════════════════════════════════
# ✦ Combinations and Permutations
# ═══════════════════════════════════════════════════════════════
# C(n, k) = n! / (k! * (n-k)!)
print(math.comb(5, 2))   # 10 (choose 2 from 5)
print(math.comb(10, 3))  # 120
print(math.comb(52, 5))  # 2598960 (poker hands)

# P(n, k) = n! / (n-k)!
print(math.perm(5, 2))   # 20 (arrange 2 from 5)
print(math.perm(10, 3))  # 720

# Pascal's triangle row
def pascal_row(n):
    return [math.comb(n, k) for k in range(n + 1)]

for i in range(6):
    print(f"Row {i}: {pascal_row(i)}")

# Probability: 5-card poker hand with exactly 2 aces
# C(4,2) * C(48,3) / C(52,5)
prob = math.comb(4, 2) * math.comb(48, 3) / math.comb(52, 5)
print(f"Probability of 2 aces: {prob:.4f}")  # 0.0399`
    },
    {
      name: 'Power, Root & Log Functions',
      icon: '📐',
      explanation: `**Power Functions:**
• math.pow(x, y): x raised to power y (returns float)
• math.sqrt(x): Square root of x
• math.isqrt(x): Integer square root (Python 3.8+)
• math.cbrt(x): Cube root (Python 3.11+)

**Logarithmic Functions:**
• math.log(x): Natural logarithm (ln x, base e)
• math.log(x, base): Logarithm with custom base
• math.log2(x): Base-2 logarithm (more precise)
• math.log10(x): Base-10 logarithm (more precise)
• math.log1p(x): log(1 + x) for small x (more precise)

**Exponential Functions:**
• math.exp(x): e raised to power x
• math.expm1(x): e^x - 1 for small x (more precise)

**Key Properties:**
• log(a*b) = log(a) + log(b)
• log(a/b) = log(a) - log(b)
• log(a^n) = n * log(a)
• log_b(x) = log(x) / log(b)

**Common Use Cases:**
• Binary search depth: log2(n)
• Digit count: floor(log10(n)) + 1
• Compound interest: principal * (1 + rate)^time
• Entropy calculations
• Checking if number is a power of 2`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Power and root functions
# ═══════════════════════════════════════════════════════════════
import math

# math.pow vs ** operator
print(math.pow(2, 10))     # 1024.0 (always returns float)
print(2 ** 10)             # 1024 (returns int for int operands)
print(math.pow(2, 0.5))   # 1.4142... (same as sqrt)

# Square root
print(math.sqrt(16))      # 4.0
print(math.sqrt(2))       # 1.4142135623730951

# Integer square root (Python 3.8+) - floor of sqrt
print(math.isqrt(16))     # 4
print(math.isqrt(20))     # 4 (floor of 4.47...)
print(math.isqrt(99))     # 9

# Check if perfect square
def is_perfect_square(n):
    s = math.isqrt(n)
    return s * s == n

print(is_perfect_square(16))  # True
print(is_perfect_square(20))  # False
print(is_perfect_square(49))  # True


# ═══════════════════════════════════════════════════════════════
# ✦ Logarithmic functions
# ═══════════════════════════════════════════════════════════════
# Natural log (base e)
print(math.log(math.e))    # 1.0
print(math.log(1))         # 0.0
print(math.log(10))        # 2.302585...

# Log with custom base
print(math.log(8, 2))      # 3.0 (2^3 = 8)
print(math.log(100, 10))   # 2.0 (10^2 = 100)
print(math.log(27, 3))     # 3.0 (3^3 = 27)

# More precise base-2 and base-10 logs
print(math.log2(1024))     # 10.0
print(math.log2(1))        # 0.0
print(math.log10(1000))    # 3.0
print(math.log10(0.01))    # -2.0

# log1p for values near zero (more precise than log(1+x))
print(math.log1p(1e-15))           # 1e-15
print(math.log(1 + 1e-15))        # 1.1102...e-15 (less precise!)


# ═══════════════════════════════════════════════════════════════
# ✦ Exponential functions
# ═══════════════════════════════════════════════════════════════
print(math.exp(0))         # 1.0
print(math.exp(1))         # 2.718281828459045 (e)
print(math.exp(2))         # 7.38905609893065
print(math.exp(-1))        # 0.36787944117144233

# expm1 for values near zero
print(math.expm1(1e-15))          # 1e-15
print(math.exp(1e-15) - 1)       # 1.1102...e-15 (less precise!)


# ═══════════════════════════════════════════════════════════════
# ✦ Practical applications
# ═══════════════════════════════════════════════════════════════
# Count digits in a number
def digit_count(n):
    if n == 0: return 1
    return math.floor(math.log10(abs(n))) + 1

print(digit_count(12345))   # 5
print(digit_count(1000000)) # 7

# Check if power of 2
def is_power_of_2(n):
    if n <= 0: return False
    log_val = math.log2(n)
    return log_val == int(log_val)

print(is_power_of_2(64))    # True
print(is_power_of_2(100))   # False

# Binary search depth
n = 1_000_000
depth = math.ceil(math.log2(n))
print(f"Binary search on {n} items: max {depth} steps")  # 20

# Compound interest
principal = 1000
rate = 0.05
years = 10
amount = principal * math.pow(1 + rate, years)
print(f"\${principal} at {rate*100}% for {years}yr = \${amount:.2f}")`
    },
    {
      name: 'Rounding & Precision',
      icon: '🎯',
      explanation: `**Rounding Functions:**
• math.floor(x): Round down to nearest integer (toward -inf)
• math.ceil(x): Round up to nearest integer (toward +inf)
• math.trunc(x): Truncate toward zero (drop decimal)
• round(x, n): Built-in rounding to n digits (banker's rounding)

**Key Differences:**
• floor(-3.7) = -4 (toward negative infinity)
• ceil(-3.7) = -3 (toward positive infinity)
• trunc(-3.7) = -3 (toward zero)
• round(-3.5) = -4 (banker's rounding)

**Precision Functions:**
• math.fsum(iterable): Precise float summation
• math.prod(iterable): Product of all elements (Python 3.8+)
• math.remainder(x, y): IEEE 754 remainder
• math.fmod(x, y): C-style float modulo

**Integer Conversion:**
• math.floor returns int
• math.ceil returns int
• math.trunc returns int
• int() truncates toward zero (same as trunc)

**Common Patterns:**
• Ceiling division: math.ceil(a / b) or -(-a // b)
• Round to nearest multiple: round(x / n) * n
• Significant figures: round(x, -int(floor(log10(abs(x))))`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ floor, ceil, trunc comparison
# ═══════════════════════════════════════════════════════════════
import math

# Positive numbers
x = 3.7
print(f"floor({x}) = {math.floor(x)}")   # 3
print(f"ceil({x})  = {math.ceil(x)}")     # 4
print(f"trunc({x}) = {math.trunc(x)}")    # 3
print(f"round({x}) = {round(x)}")          # 4

# Negative numbers — this is where they differ!
x = -3.7
print(f"floor({x}) = {math.floor(x)}")   # -4 (toward -inf)
print(f"ceil({x})  = {math.ceil(x)}")     # -3 (toward +inf)
print(f"trunc({x}) = {math.trunc(x)}")    # -3 (toward zero)
print(f"round({x}) = {round(x)}")          # -4

# At .5 boundaries — banker's rounding
print(f"round(0.5)  = {round(0.5)}")     # 0 (rounds to even)
print(f"round(1.5)  = {round(1.5)}")     # 2 (rounds to even)
print(f"round(2.5)  = {round(2.5)}")     # 2 (rounds to even)
print(f"round(3.5)  = {round(3.5)}")     # 4 (rounds to even)


# ═══════════════════════════════════════════════════════════════
# ✦ Ceiling division (divide and round up)
# ═══════════════════════════════════════════════════════════════
# Common patterns for ceiling division
a, b = 17, 5
print(math.ceil(a / b))     # 4 (17/5 = 3.4, ceil = 4)
print(-(-a // b))            # 4 (trick using negative floor division)

# Use case: number of pages/batches needed
items = 103
page_size = 10
pages = math.ceil(items / page_size)
print(f"{items} items, {page_size}/page = {pages} pages")  # 11


# ═══════════════════════════════════════════════════════════════
# ✦ Precise summation with fsum
# ═══════════════════════════════════════════════════════════════
# Regular sum can accumulate floating-point errors
values = [0.1] * 10
print(f"sum():       {sum(values)}")         # 0.9999999999999999
print(f"math.fsum(): {math.fsum(values)}")   # 1.0

# Larger example with more error accumulation
import random
random.seed(42)
data = [random.uniform(-1000, 1000) for _ in range(100000)]
print(f"sum():       {sum(data)}")
print(f"math.fsum(): {math.fsum(data)}")  # More precise


# ═══════════════════════════════════════════════════════════════
# ✦ Product of elements with math.prod
# ═══════════════════════════════════════════════════════════════
# Python 3.8+
print(math.prod([1, 2, 3, 4, 5]))    # 120
print(math.prod([2, 3, 7]))          # 42
print(math.prod([]))                  # 1 (empty = identity)

# With start value
print(math.prod([2, 3], start=10))   # 60 (10 * 2 * 3)

# Use case: probability calculation
probs = [0.9, 0.95, 0.8, 0.99]
total_prob = math.prod(probs)
print(f"Combined probability: {total_prob:.4f}")  # 0.6812


# ═══════════════════════════════════════════════════════════════
# ✦ remainder vs fmod vs %
# ═══════════════════════════════════════════════════════════════
# Three different modulo behaviors:
x, y = -7, 3

# Python % operator: result has sign of divisor
print(f"-7 % 3 = {x % y}")                     # 2

# math.fmod: result has sign of dividend (C behavior)
print(f"fmod(-7, 3) = {math.fmod(x, y)}")      # -1.0

# math.remainder: IEEE 754 (nearest to zero)
print(f"remainder(-7, 3) = {math.remainder(x, y)}")  # -1.0

# Round to nearest multiple
def round_to_multiple(x, multiple):
    return round(x / multiple) * multiple

print(round_to_multiple(17, 5))   # 15
print(round_to_multiple(18, 5))   # 20
print(round_to_multiple(123, 10)) # 120`
    },
    {
      name: 'Trigonometry',
      icon: '📏',
      explanation: `**Trigonometric Functions (radians):**
• math.sin(x), math.cos(x), math.tan(x)
• math.asin(x), math.acos(x), math.atan(x)
• math.atan2(y, x): Two-argument arctangent

**Conversion:**
• math.radians(degrees): Convert degrees to radians
• math.degrees(radians): Convert radians to degrees

**Hyperbolic Functions:**
• math.sinh(x), math.cosh(x), math.tanh(x)
• math.asinh(x), math.acosh(x), math.atanh(x)

**Key Values:**
• sin(0) = 0, cos(0) = 1
• sin(π/2) = 1, cos(π/2) = 0
• sin(π) = 0, cos(π) = -1
• sin²(x) + cos²(x) = 1

**Geometry Use Cases:**
• Distance between points
• Angle calculations
• Rotation transformations
• Area and perimeter formulas
• Navigation and GPS calculations`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Basic trigonometry
# ═══════════════════════════════════════════════════════════════
import math

# Trig functions take radians (not degrees!)
print(f"sin(0)      = {math.sin(0)}")           # 0.0
print(f"sin(π/2)    = {math.sin(math.pi/2)}")   # 1.0
print(f"cos(0)      = {math.cos(0)}")           # 1.0
print(f"cos(π)      = {math.cos(math.pi)}")     # -1.0
print(f"tan(π/4)    = {math.tan(math.pi/4)}")   # 1.0


# ═══════════════════════════════════════════════════════════════
# ✦ Degree/Radian conversion
# ═══════════════════════════════════════════════════════════════
# Convert degrees to radians
angle_deg = 45
angle_rad = math.radians(angle_deg)
print(f"{angle_deg}° = {angle_rad:.4f} radians")  # 0.7854

# Convert radians to degrees
print(f"π radians = {math.degrees(math.pi)}°")    # 180.0

# Common angles
for deg in [0, 30, 45, 60, 90, 180, 270, 360]:
    rad = math.radians(deg)
    print(f"{deg:>3}° | sin={math.sin(rad):>7.4f} | cos={math.cos(rad):>7.4f}")


# ═══════════════════════════════════════════════════════════════
# ✦ Inverse trig functions
# ═══════════════════════════════════════════════════════════════
# asin, acos return radians
print(f"asin(1) = {math.degrees(math.asin(1))}°")    # 90.0°
print(f"acos(0) = {math.degrees(math.acos(0))}°")     # 90.0°
print(f"atan(1) = {math.degrees(math.atan(1))}°")     # 45.0°

# atan2(y, x) — angle from positive x-axis to point (x, y)
# Handles all quadrants correctly (unlike atan)
print(f"atan2(1, 1)   = {math.degrees(math.atan2(1, 1))}°")     # 45.0°
print(f"atan2(1, -1)  = {math.degrees(math.atan2(1, -1))}°")    # 135.0°
print(f"atan2(-1, -1) = {math.degrees(math.atan2(-1, -1))}°")   # -135.0°


# ═══════════════════════════════════════════════════════════════
# ✦ Distance and geometry calculations
# ═══════════════════════════════════════════════════════════════
# Euclidean distance
def distance(x1, y1, x2, y2):
    return math.sqrt((x2-x1)**2 + (y2-y1)**2)

# Or use math.dist (Python 3.8+)
print(math.dist((0, 0), (3, 4)))       # 5.0
print(math.dist((1, 2), (4, 6)))       # 5.0
print(math.dist((0, 0, 0), (1, 1, 1))) # 1.732... (3D)

# math.hypot — Euclidean norm (same as distance from origin)
print(math.hypot(3, 4))        # 5.0
print(math.hypot(1, 1, 1))    # 1.732... (3D, Python 3.8+)

# Angle between two points
def angle_between(x1, y1, x2, y2):
    return math.degrees(math.atan2(y2 - y1, x2 - x1))

print(f"Angle: {angle_between(0, 0, 1, 1)}°")   # 45.0°
print(f"Angle: {angle_between(0, 0, 0, 1)}°")    # 90.0°

# Triangle area given 3 sides (Heron's formula)
def triangle_area(a, b, c):
    s = (a + b + c) / 2  # semi-perimeter
    return math.sqrt(s * (s-a) * (s-b) * (s-c))

print(f"Area of 3-4-5 triangle: {triangle_area(3, 4, 5)}")  # 6.0


# ═══════════════════════════════════════════════════════════════
# ✦ Rotation transformation
# ═══════════════════════════════════════════════════════════════
def rotate_point(x, y, angle_deg, cx=0, cy=0):
    """Rotate point (x,y) around center (cx,cy) by angle_deg"""
    rad = math.radians(angle_deg)
    dx, dy = x - cx, y - cy
    new_x = dx * math.cos(rad) - dy * math.sin(rad) + cx
    new_y = dx * math.sin(rad) + dy * math.cos(rad) + cy
    return round(new_x, 6), round(new_y, 6)

# Rotate (1, 0) by 90° around origin
print(rotate_point(1, 0, 90))    # (0.0, 1.0)
print(rotate_point(1, 0, 180))   # (-1.0, 0.0)
print(rotate_point(1, 0, 45))    # (0.707107, 0.707107)`
    },
    {
      name: 'Algorithm Patterns with Math',
      icon: '💡',
      explanation: `**Common LeetCode / Interview Patterns:**

**1. Integer Arithmetic:**
• Digit extraction with % and //
• Reverse integer, palindrome number
• Power of 2/3/4 checks

**2. GCD/LCM Problems:**
• Fraction simplification
• Array GCD/LCM
• Coprime checking

**3. Geometry:**
• Point distance and collinearity
• Polygon area (Shoelace formula)
• Convex hull problems

**4. Number Properties:**
• Prime checking with sqrt optimization
• Sieve of Eratosthenes
• Perfect square/cube detection

**5. Overflow Prevention:**
• Use math.log for comparison instead of pow
• Use math.isqrt for integer square root
• Use math.comb for safe combinatorics

**6. Precision:**
• Use math.isclose for float comparison
• Use math.fsum for precise summation
• Avoid floating-point equality checks`,
      codeExample: `# ═══════════════════════════════════════════════════════════════
# ✦ Prime number checking
# ═══════════════════════════════════════════════════════════════
import math

def is_prime(n):
    if n < 2: return False
    if n < 4: return True
    if n % 2 == 0 or n % 3 == 0: return False
    # Only check up to sqrt(n), skip multiples of 2 and 3
    for i in range(5, math.isqrt(n) + 1, 6):
        if n % i == 0 or n % (i + 2) == 0:
            return False
    return True

print([n for n in range(30) if is_prime(n)])
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]


# ═══════════════════════════════════════════════════════════════
# ✦ Sieve of Eratosthenes
# ═══════════════════════════════════════════════════════════════
def sieve(limit):
    """Find all primes up to limit"""
    is_prime = [True] * (limit + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, math.isqrt(limit) + 1):
        if is_prime[i]:
            for j in range(i*i, limit + 1, i):
                is_prime[j] = False
    return [i for i, p in enumerate(is_prime) if p]

print(sieve(50))
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]


# ═══════════════════════════════════════════════════════════════
# ✦ Power of 2/3 checks
# ═══════════════════════════════════════════════════════════════
def is_power_of_2(n):
    """Bit trick: powers of 2 have exactly one bit set"""
    return n > 0 and (n & (n - 1)) == 0

# Using math.log2
def is_power_of_2_log(n):
    if n <= 0: return False
    log_val = math.log2(n)
    return math.isclose(log_val, round(log_val))

def is_power_of_3(n):
    if n <= 0: return False
    # 3^19 = 1162261467 is largest power of 3 in 32-bit int
    return 1162261467 % n == 0

print(is_power_of_2(64))   # True
print(is_power_of_2(100))  # False
print(is_power_of_3(27))   # True
print(is_power_of_3(45))   # False


# ═══════════════════════════════════════════════════════════════
# ✦ Polygon area (Shoelace formula)
# ═══════════════════════════════════════════════════════════════
def polygon_area(points):
    """Calculate area using Shoelace formula"""
    n = len(points)
    area = 0
    for i in range(n):
        j = (i + 1) % n
        area += points[i][0] * points[j][1]
        area -= points[j][0] * points[i][1]
    return abs(area) / 2

# Triangle with vertices (0,0), (4,0), (0,3)
triangle = [(0, 0), (4, 0), (0, 3)]
print(f"Triangle area: {polygon_area(triangle)}")  # 6.0

# Rectangle
rect = [(0, 0), (5, 0), (5, 3), (0, 3)]
print(f"Rectangle area: {polygon_area(rect)}")  # 15.0


# ═══════════════════════════════════════════════════════════════
# ✦ GCD-based problems
# ═══════════════════════════════════════════════════════════════
# Check if two numbers are coprime
def are_coprime(a, b):
    return math.gcd(a, b) == 1

print(are_coprime(14, 15))  # True
print(are_coprime(14, 21))  # False

# Count unique fractions in range [0, 1] with denominator {'<'}= n
def count_unique_fractions(n):
    """Count irreducible fractions p/q where 0 < p < q <= n"""
    count = 0
    for q in range(2, n + 1):
        for p in range(1, q):
            if math.gcd(p, q) == 1:
                count += 1
    return count

print(f"Unique fractions (denom<=5): {count_unique_fractions(5)}")  # 9


# ═══════════════════════════════════════════════════════════════
# ✦ Safe overflow comparisons using log
# ═══════════════════════════════════════════════════════════════
# Instead of computing huge numbers, compare logs
# Is 2^1000 > 3^600?
log_a = 1000 * math.log(2)  # log(2^1000)
log_b = 600 * math.log(3)   # log(3^600)
print(f"2^1000 > 3^600? {log_a > log_b}")  # True

# Count digits in a huge number without computing it
def digit_count_of_power(base, exp):
    return math.floor(exp * math.log10(base)) + 1

print(f"Digits in 2^100: {digit_count_of_power(2, 100)}")    # 31
print(f"Digits in 10^6:  {digit_count_of_power(10, 6)}")     # 7`
    }
  ]

  const codeSections = selectedConcept ? parseCodeSections(concepts[selectedConcept].codeExample) : []

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={() => {
                if (selectedConcept !== null) {
                  setSelectedConcept(null)
                } else {
                  onBack()
                }
              }}
              style={{
                background: '#2563eb',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '500',
                fontSize: '1rem',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1d4ed8'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2563eb'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              ← {selectedConcept !== null ? 'Back to Concepts' : 'Back to Python Topics'}
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🔢 Math Functions
            </h1>
          </div>
        </div>

        <Breadcrumb breadcrumb={activeBreadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

        <CollapsibleSidebar
          items={concepts}
          selectedIndex={selectedConcept !== null ? selectedConcept : -1}
          onSelect={(index) => setSelectedConcept(index)}
          title="Concepts"
          getItemLabel={(item) => item.name}
          getItemIcon={(item) => item.icon}
          primaryColor={'#3b82f6'}
        />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {concepts.map((concept, index) => (
            <div
              key={index}
              onClick={() => setSelectedConcept(index)}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                padding: '1.5rem',
                borderRadius: '0.75rem',
                border: '2px solid #3b82f6',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#60a5fa'
                e.currentTarget.style.transform = 'translateY(-0.5rem)'
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(59, 130, 246, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#3b82f6'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {concept.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '0.75rem',
                color: '#93c5fd'
              }}>
                {concept.name}
              </h3>
              <p style={{
                color: '#d1d5db',
                textAlign: 'left',
                fontSize: '0.875rem'
              }}>
                Click to explore math module concepts
              </p>
            </div>
          ))}
        </div>

        {selectedConcept !== null && (
          <div style={{
            position: 'fixed',
            inset: '0',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: '50',
            overflowY: 'auto'
          }}>
            <div style={{
              background: 'linear-gradient(to bottom right, #111827, #1f2937)',
              borderRadius: '0.75rem',
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflowY: 'auto',
              border: '2px solid #3b82f6',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <div style={{
                position: 'sticky',
                top: '0',
                background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
                padding: '1.5rem',
                borderTopLeftRadius: '0.75rem',
                borderTopRightRadius: '0.75rem',
                borderBottom: '2px solid #60a5fa',
                zIndex: '10'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <span style={{ fontSize: '3rem' }}>{concepts[selectedConcept].icon}</span>
                    <h2 style={{
                      fontSize: '1.875rem',
                      fontWeight: 'bold',
                      color: 'white'
                    }}>
                      {concepts[selectedConcept].name}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedConcept(null)}
                    style={{
                      background: '#dc2626',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '500',
                      fontSize: '1rem',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#b91c1c'
                      e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#dc2626'
                      e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>

              <div style={{ padding: '2rem' }}>
                <div style={{
                  background: '#1f2937',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  border: '1px solid #3b82f6'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#93c5fd'
                  }}>
                    Overview
                  </h3>
                  <div style={{
                    whiteSpace: 'pre-line',
                    color: '#d1d5db',
                    lineHeight: '1.8'
                  }}>
                    {concepts[selectedConcept].explanation.split('\n').map((line, i) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        const text = line.slice(2, -2)
                        return <div key={i} style={{ fontWeight: '700', color: '#93c5fd', marginTop: i > 0 ? '1rem' : 0, marginBottom: '0.5rem' }}>{text}</div>
                      }
                      if (line.startsWith('•')) {
                        return <div key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.25rem' }}>{line}</div>
                      }
                      return <div key={i} style={{ marginBottom: '0.5rem' }}>{line}</div>
                    })}
                  </div>
                </div>

                <div style={{
                  background: '#1f2937',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  border: '1px solid #3b82f6'
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#93c5fd'
                  }}>
                    Code Examples
                  </h3>

                  {codeSections.length > 0 ? (
                    codeSections.map((section, idx) => (
                      <div key={idx} style={{ marginBottom: '1.5rem' }}>
                        <div
                          style={{
                            width: '100%',
                            padding: '1rem',
                            background: '#2563eb',
                            color: 'white',
                            borderRadius: '8px 8px 0 0',
                            fontSize: '1rem',
                            fontWeight: '600',
                            textAlign: 'left'
                          }}
                        >
                          {section.title}
                        </div>
                        <div style={{
                          backgroundColor: '#1e293b',
                          borderRadius: '0 0 8px 8px',
                          overflow: 'hidden'
                        }}>
                          <SyntaxHighlighter
                            language="python"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              borderRadius: '0.375rem',
                              fontSize: '0.875rem',
                              background: 'none',
                              backgroundColor: 'transparent',
                              padding: 0
                            }}
                          >
                            {section.code}
                          </SyntaxHighlighter>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{
                      backgroundColor: '#1e293b',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}>
                      <SyntaxHighlighter
                        language="python"
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          background: 'none',
                          backgroundColor: 'transparent',
                          padding: 0
                        }}
                      >
                        {concepts[selectedConcept].codeExample}
                      </SyntaxHighlighter>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MathFunctions
