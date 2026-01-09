import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

const CorePython = ({ onBack, breadcrumb }) => {
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (conceptIndex, sectionIndex) => {
    const key = `${conceptIndex}-${sectionIndex}`
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const parseCodeSections = (codeString) => {
    const sections = codeString.split('\n\n')
    return sections.map((section, index) => ({
      id: index,
      code: section.trim()
    }))
  }

  const concepts = [
    {
      name: 'Data Types & Variables',
      icon: '📦',
      explanation: `Python's core data types and variable handling:

• **Variables**: Dynamic typing, no declaration needed
  - Assignment: name = value
  - Multiple assignment: a, b = 1, 2
  - Variable naming: snake_case convention

• **Basic Types**:
  - int: Unlimited precision integers
  - float: Floating-point numbers
  - str: Immutable text sequences
  - bool: True/False values

• **Collections**:
  - list: Mutable ordered sequences
  - tuple: Immutable ordered sequences
  - dict: Key-value mappings
  - set: Unordered unique elements

• **Type Conversion**: int(), float(), str(), list(), tuple(), dict(), set()
• **Type Checking**: type(), isinstance()`,
      codeExample: `# Variables and Basic Types
x = 42                    # int
y = 3.14                  # float
name = "Python"           # str
is_active = True          # bool

# Multiple assignment
a, b, c = 1, 2, 3
x = y = z = 0            # Same value

# Type conversion
num_str = "123"
num = int(num_str)       # 123
pi_str = str(3.14159)    # "3.14159"

# Lists - Mutable ordered collections
fruits = ["apple", "banana", "cherry"]
fruits.append("orange")   # Add item
fruits[0] = "mango"      # Modify item
fruits.pop()             # Remove last item
print(fruits)            # ['mango', 'banana', 'cherry']

# Tuples - Immutable ordered collections
coordinates = (10, 20)
point = 5, 10            # Parentheses optional
x, y = coordinates       # Unpacking

# Dictionaries - Key-value pairs
person = {
    "name": "Alice",
    "age": 30,
    "city": "NYC"
}
person["age"] = 31       # Update value
person["email"] = "alice@example.com"  # Add new key
name = person.get("name", "Unknown")   # Safe access
print(person.keys())     # dict_keys(['name', 'age', 'city', 'email'])
print(person.values())   # dict_values(['Alice', 31, 'NYC', 'alice@example.com'])

# Sets - Unordered unique elements
numbers = {1, 2, 3, 4, 5}
numbers.add(6)           # Add element
numbers.remove(3)        # Remove element
primes = {2, 3, 5, 7}
print(numbers & primes)  # Intersection: {2, 5, 7}
print(numbers | primes)  # Union: {1, 2, 4, 5, 6, 7}
print(numbers - primes)  # Difference: {1, 4, 6}

# Type checking
print(type(42))          # <class 'int'>
print(isinstance(3.14, float))  # True
print(isinstance("hi", (str, int)))  # True (checks multiple types)`
    },
    {
      name: 'Control Flow',
      icon: '🔀',
      explanation: `Control structures for program flow:

• **Conditional Statements**:
  - if/elif/else for branching logic
  - Inline if: value_if_true if condition else value_if_false
  - Truthy/Falsy values: 0, None, "", [], {} are False

• **Loops**:
  - for loop: Iterate over sequences (range, lists, strings)
  - while loop: Continue while condition is True
  - break: Exit loop early
  - continue: Skip to next iteration
  - else clause: Executes if loop completes normally

• **Range Function**:
  - range(stop): 0 to stop-1
  - range(start, stop): start to stop-1
  - range(start, stop, step): with step increment

• **Iteration Tools**:
  - enumerate(): Get index and value
  - zip(): Iterate multiple sequences together
  - reversed(): Iterate in reverse`,
      codeExample: `# If/Elif/Else
age = 25
if age < 18:
    status = "minor"
elif age < 65:
    status = "adult"
else:
    status = "senior"
print(status)  # "adult"

# Inline if (ternary operator)
min_value = a if a < b else b
parity = "even" if num % 2 == 0 else "odd"

# Truthy/Falsy
values = [0, "", None, [], {}, False]
if not values:  # Empty list is falsy
    print("List is empty")

# For loops with range
for i in range(5):
    print(i, end=" ")  # 0 1 2 3 4

for i in range(2, 10, 2):  # start, stop, step
    print(i, end=" ")      # 2 4 6 8

# For loops with collections
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit.upper())

# Enumerate for index + value
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Zip for parallel iteration
names = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 78]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# While loop
count = 0
while count < 5:
    print(count)
    count += 1

# Break and continue
for i in range(10):
    if i == 3:
        continue  # Skip 3
    if i == 7:
        break     # Stop at 7
    print(i, end=" ")  # 0 1 2 4 5 6

# For-else (else runs if no break)
for num in range(2, 10):
    for divisor in range(2, num):
        if num % divisor == 0:
            print(f"{num} = {divisor} * {num//divisor}")
            break
    else:
        print(f"{num} is prime")

# Match-Case (Python 3.10+)
def http_status(code):
    match code:
        case 200:
            return "OK"
        case 404:
            return "Not Found"
        case 500 | 503:  # Multiple patterns
            return "Server Error"
        case _:  # Default
            return "Unknown"`
    },
    {
      name: 'Functions & Scope',
      icon: '⚡',
      explanation: `Functions and variable scope in Python:

• **Function Definition**:
  - def keyword to define functions
  - Parameters: positional, keyword, default values
  - return statement (returns None if omitted)
  - Docstrings for documentation

• **Parameter Types**:
  - Positional: Required in order
  - Keyword: Named arguments
  - Default: Parameters with default values
  - *args: Variable positional arguments (tuple)
  - **kwargs: Variable keyword arguments (dict)

• **Scope Rules (LEGB)**:
  - L: Local (function)
  - E: Enclosing (nested functions)
  - G: Global (module level)
  - B: Built-in (Python's built-in namespace)

• **Special Features**:
  - First-class functions (assign to variables)
  - Nested functions (closures)
  - global/nonlocal keywords for scope modification`,
      codeExample: `# Basic function
def greet(name):
    """Return a greeting message."""
    return f"Hello, {name}!"

message = greet("Alice")  # "Hello, Alice!"

# Default parameters
def power(base, exponent=2):
    return base ** exponent

print(power(5))      # 25 (uses default exponent=2)
print(power(5, 3))   # 125

# Keyword arguments
def describe_person(name, age, city):
    return f"{name} is {age} years old and lives in {city}"

# Can call with keywords in any order
print(describe_person(age=30, city="NYC", name="Bob"))

# *args - Variable positional arguments
def sum_all(*numbers):
    """Sum any number of arguments."""
    total = 0
    for num in numbers:
        total += num
    return total

print(sum_all(1, 2, 3))        # 6
print(sum_all(10, 20, 30, 40)) # 100

# **kwargs - Variable keyword arguments
def create_profile(**info):
    """Create a profile from keyword arguments."""
    profile = {}
    for key, value in info.items():
        profile[key] = value
    return profile

user = create_profile(name="Alice", age=25, city="Boston")
print(user)  # {'name': 'Alice', 'age': 25, 'city': 'Boston'}

# Combining all parameter types
def complex_function(pos1, pos2, *args, default="value", **kwargs):
    print(f"Positional: {pos1}, {pos2}")
    print(f"Extra positional: {args}")
    print(f"Default: {default}")
    print(f"Keyword args: {kwargs}")

complex_function(1, 2, 3, 4, default="custom", key1="a", key2="b")

# Scope - LEGB Rule
x = "global"  # Global scope

def outer():
    x = "enclosing"  # Enclosing scope

    def inner():
        x = "local"  # Local scope
        print(f"Local: {x}")

    inner()
    print(f"Enclosing: {x}")

outer()
print(f"Global: {x}")

# Global and nonlocal keywords
counter = 0  # Global variable

def increment_global():
    global counter
    counter += 1

increment_global()
print(counter)  # 1

def outer_func():
    count = 0

    def inner_func():
        nonlocal count  # Modify enclosing scope
        count += 1
        return count

    return inner_func

counter_func = outer_func()
print(counter_func())  # 1
print(counter_func())  # 2

# First-class functions
def square(x):
    return x * x

def cube(x):
    return x * x * x

# Assign function to variable
operation = square
print(operation(5))  # 25

# Pass function as argument
def apply_operation(func, value):
    return func(value)

print(apply_operation(cube, 3))  # 27`
    },
    {
      name: 'Classes & OOP',
      icon: '🏗️',
      explanation: `Object-Oriented Programming in Python:

• **Class Basics**:
  - class keyword to define classes
  - __init__() constructor method
  - self parameter references instance
  - Instance attributes vs class attributes

• **Methods**:
  - Instance methods: Take self as first parameter
  - Class methods: Use @classmethod, take cls parameter
  - Static methods: Use @staticmethod, no special first parameter
  - Special methods: __str__, __repr__, __len__, etc.

• **Inheritance**:
  - Single inheritance: class Child(Parent)
  - Multiple inheritance: class Child(Parent1, Parent2)
  - super() to call parent methods
  - Method overriding

• **Encapsulation**:
  - Public: name
  - Protected: _name (convention)
  - Private: __name (name mangling)
  - Properties: @property decorator`,
      codeExample: `# Basic class definition
class Dog:
    """A simple Dog class."""

    # Class attribute (shared by all instances)
    species = "Canis familiaris"

    def __init__(self, name, age):
        """Initialize dog with name and age."""
        self.name = name  # Instance attribute
        self.age = age

    def bark(self):
        """Make the dog bark."""
        return f"{self.name} says Woof!"

    def description(self):
        """Return description of the dog."""
        return f"{self.name} is {self.age} years old"

# Create instances
buddy = Dog("Buddy", 3)
max_dog = Dog("Max", 5)

print(buddy.bark())          # "Buddy says Woof!"
print(buddy.description())   # "Buddy is 3 years old"
print(Dog.species)           # "Canis familiaris"

# Special methods (magic methods)
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages

    def __str__(self):
        """String representation for users."""
        return f"{self.title} by {self.author}"

    def __repr__(self):
        """String representation for developers."""
        return f"Book('{self.title}', '{self.author}', {self.pages})"

    def __len__(self):
        """Return number of pages."""
        return self.pages

    def __eq__(self, other):
        """Check equality based on title and author."""
        return self.title == other.title and self.author == other.author

book1 = Book("Python Basics", "John Doe", 250)
print(str(book1))   # "Python Basics by John Doe"
print(len(book1))   # 250

# Inheritance
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError("Subclass must implement speak()")

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

class Duck(Animal):
    def speak(self):
        return f"{self.name} says Quack!"

# Using inheritance
animals = [Cat("Whiskers"), Duck("Donald")]
for animal in animals:
    print(animal.speak())

# Using super() for parent methods
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def get_details(self):
        return f"{self.name}: ${self.salary}"

class Manager(Employee):
    def __init__(self, name, salary, department):
        super().__init__(name, salary)  # Call parent constructor
        self.department = department

    def get_details(self):
        parent_details = super().get_details()
        return f"{parent_details} (Dept: {self.department})"

mgr = Manager("Alice", 80000, "Engineering")
print(mgr.get_details())  # "Alice: $80000 (Dept: Engineering)"

# Class methods and static methods
class Pizza:
    def __init__(self, ingredients):
        self.ingredients = ingredients

    @classmethod
    def margherita(cls):
        """Factory method for margherita pizza."""
        return cls(["mozzarella", "tomatoes", "basil"])

    @classmethod
    def pepperoni(cls):
        """Factory method for pepperoni pizza."""
        return cls(["mozzarella", "tomatoes", "pepperoni"])

    @staticmethod
    def mix_ingredients(ingredients):
        """Static helper method."""
        return ", ".join(ingredients)

    def __str__(self):
        return f"Pizza with {Pizza.mix_ingredients(self.ingredients)}"

# Use class methods as factory methods
pizza1 = Pizza.margherita()
pizza2 = Pizza.pepperoni()
print(pizza1)  # "Pizza with mozzarella, tomatoes, basil"

# Properties and encapsulation
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius  # Protected attribute

    @property
    def celsius(self):
        """Get temperature in Celsius."""
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        """Set temperature in Celsius with validation."""
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self):
        """Get temperature in Fahrenheit."""
        return (self._celsius * 9/5) + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        """Set temperature using Fahrenheit."""
        self.celsius = (value - 32) * 5/9

temp = Temperature(25)
print(temp.celsius)      # 25
print(temp.fahrenheit)   # 77.0
temp.fahrenheit = 100
print(temp.celsius)      # 37.77...`
    },
    {
      name: 'Exception Handling',
      icon: '⚠️',
      explanation: `Error handling with exceptions:

• **Try-Except-Finally**:
  - try: Code that might raise exceptions
  - except: Handle specific or general exceptions
  - else: Runs if no exception occurred
  - finally: Always runs (cleanup code)

• **Common Exception Types**:
  - ValueError: Invalid value
  - TypeError: Wrong type
  - KeyError: Missing dictionary key
  - IndexError: Invalid list index
  - FileNotFoundError: File doesn't exist
  - ZeroDivisionError: Division by zero

• **Raising Exceptions**:
  - raise keyword to throw exceptions
  - Custom exception classes (inherit from Exception)
  - Exception chaining with from

• **Best Practices**:
  - Catch specific exceptions, not all
  - Use finally for cleanup (files, connections)
  - Provide meaningful error messages
  - Don't catch exceptions you can't handle`,
      codeExample: `# Basic try-except
def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Error: Cannot divide by zero!")
        return None
    else:
        print("Division successful")
        return result
    finally:
        print("Division operation completed")

print(divide(10, 2))  # Division successful, then "completed", then 5.0
print(divide(10, 0))  # Error message, then "completed", then None

# Multiple exception types
def process_data(data, index):
    try:
        value = int(data[index])
        return 100 / value
    except IndexError:
        print("Error: Index out of range")
    except ValueError:
        print("Error: Cannot convert to integer")
    except ZeroDivisionError:
        print("Error: Value is zero")
    except Exception as e:
        print(f"Unexpected error: {e}")

# Catching multiple exceptions together
def safe_convert(value):
    try:
        return int(value)
    except (ValueError, TypeError) as e:
        print(f"Conversion failed: {e}")
        return None

# Exception information
try:
    x = int("not a number")
except ValueError as e:
    print(f"Error type: {type(e).__name__}")
    print(f"Error message: {e}")
    print(f"Error args: {e.args}")

# Raising exceptions
def validate_age(age):
    if not isinstance(age, int):
        raise TypeError("Age must be an integer")
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age seems unrealistic")
    return age

try:
    validate_age(-5)
except ValueError as e:
    print(f"Validation error: {e}")

# Custom exception classes
class InsufficientFundsError(Exception):
    """Raised when account has insufficient funds."""
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        super().__init__(
            f"Insufficient funds: \${balance} available, \${amount} required"
        )

class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount
        return self.balance

account = BankAccount(100)
try:
    account.withdraw(150)
except InsufficientFundsError as e:
    print(f"Error: {e}")
    print(f"Available: \${e.balance}")
    print(f"Requested: \${e.amount}")

# Exception chaining (preserving original exception)
def process_file(filename):
    try:
        with open(filename, 'r') as f:
            data = f.read()
            return int(data)
    except FileNotFoundError as e:
        raise ValueError(f"Configuration file missing: {filename}") from e
    except ValueError as e:
        raise ValueError(f"Invalid data in {filename}") from e

# Using else clause
def read_config(filename):
    try:
        with open(filename, 'r') as f:
            config = f.read()
    except FileNotFoundError:
        print("Config file not found, using defaults")
        config = "default_config"
    else:
        print("Config file loaded successfully")
    finally:
        print("Config loading completed")

    return config

# Context managers automatically handle cleanup
try:
    with open('data.txt', 'r') as f:
        content = f.read()
    # File is automatically closed even if exception occurs
except FileNotFoundError:
    print("File not found")

# Assert for debugging (raises AssertionError)
def calculate_average(numbers):
    assert len(numbers) > 0, "List cannot be empty"
    assert all(isinstance(n, (int, float)) for n in numbers), "All items must be numbers"
    return sum(numbers) / len(numbers)

try:
    calculate_average([])
except AssertionError as e:
    print(f"Assertion failed: {e}")`
    },
    {
      name: 'File I/O & Modules',
      icon: '📁',
      explanation: `File operations and module system:

• **File Operations**:
  - open() function: Opens files
  - Modes: 'r' (read), 'w' (write), 'a' (append), 'b' (binary)
  - Methods: read(), readline(), readlines(), write()
  - with statement: Automatic file closing (context manager)

• **File Paths**:
  - Relative paths: './file.txt', '../parent/file.txt'
  - Absolute paths: '/home/user/file.txt', 'C:\\\\Users\\\\file.txt'
  - pathlib module for path operations

• **Module System**:
  - import: Import entire module
  - from module import name: Import specific items
  - import module as alias: Create alias
  - __name__ == '__main__': Check if script is main

• **Module Types**:
  - Standard library: Built-in modules (os, sys, json, etc.)
  - Third-party: Installed via pip (requests, numpy, etc.)
  - Custom: Your own .py files

• **Packages**:
  - Directory with __init__.py file
  - Organize related modules
  - Import with dot notation: from package.module import function`,
      codeExample: `# Writing to a file
with open('output.txt', 'w') as f:
    f.write("Hello, World!\\n")
    f.write("Python File I/O\\n")
# File automatically closed after with block

# Reading entire file
with open('output.txt', 'r') as f:
    content = f.read()
    print(content)

# Reading line by line
with open('output.txt', 'r') as f:
    for line in f:
        print(line.strip())  # strip() removes newline

# Reading all lines into a list
with open('output.txt', 'r') as f:
    lines = f.readlines()
    print(lines)  # ['Hello, World!\\n', 'Python File I/O\\n']

# Appending to a file
with open('output.txt', 'a') as f:
    f.write("Appended line\\n")

# Binary file operations
data = b"\\x00\\x01\\x02\\x03"
with open('binary.dat', 'wb') as f:
    f.write(data)

with open('binary.dat', 'rb') as f:
    binary_data = f.read()
    print(binary_data)  # b'\\x00\\x01\\x02\\x03'

# Working with JSON
import json

# Write JSON to file
data = {
    "name": "Alice",
    "age": 30,
    "skills": ["Python", "JavaScript", "SQL"]
}

with open('data.json', 'w') as f:
    json.dump(data, f, indent=2)

# Read JSON from file
with open('data.json', 'r') as f:
    loaded_data = json.load(f)
    print(loaded_data['name'])  # "Alice"

# File path operations with pathlib
from pathlib import Path

# Create Path object
file_path = Path('data') / 'config.txt'
print(file_path)  # data/config.txt

# Check if file exists
if file_path.exists():
    print("File exists")

# Get file info
print(file_path.name)       # 'config.txt'
print(file_path.suffix)     # '.txt'
print(file_path.parent)     # 'data'

# Create directory
Path('logs').mkdir(exist_ok=True)

# List files in directory
for file in Path('.').glob('*.py'):
    print(file)

# Module imports - Different styles
import math
print(math.sqrt(16))  # 4.0

from math import pi, sqrt
print(pi)             # 3.14159...
print(sqrt(25))       # 5.0

from math import *    # Import all (not recommended)
print(cos(0))         # 1.0

import math as m      # Create alias
print(m.ceil(4.2))    # 5

# Importing from standard library
import os
import sys
from datetime import datetime, timedelta

# Get current directory
current_dir = os.getcwd()
print(f"Current directory: {current_dir}")

# Environment variables
home_dir = os.environ.get('HOME', '/default/path')

# System information
print(f"Python version: {sys.version}")
print(f"Platform: {sys.platform}")

# Date and time
now = datetime.now()
tomorrow = now + timedelta(days=1)
print(f"Now: {now}")
print(f"Tomorrow: {tomorrow}")

# Creating a module (save as mymodule.py)
# mymodule.py content:
# def greet(name):
#     return f"Hello, {name}!"
#
# PI = 3.14159
#
# class Calculator:
#     @staticmethod
#     def add(a, b):
#         return a + b

# Using custom module
# import mymodule
# print(mymodule.greet("Alice"))
# print(mymodule.PI)
# calc = mymodule.Calculator()
# print(calc.add(5, 3))

# Main guard pattern
def main():
    """Main function of the script."""
    print("Running as main program")
    # Your code here

if __name__ == '__main__':
    # This only runs when script is executed directly
    # Not when imported as a module
    main()

# Package structure example:
# mypackage/
#   __init__.py
#   module1.py
#   module2.py
#   subpackage/
#     __init__.py
#     module3.py

# Importing from packages
# from mypackage import module1
# from mypackage.subpackage import module3
# from mypackage.module1 import some_function

# Working with CSV files
import csv

# Write CSV
data = [
    ['Name', 'Age', 'City'],
    ['Alice', 30, 'NYC'],
    ['Bob', 25, 'LA']
]

with open('people.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerows(data)

# Read CSV
with open('people.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)

# CSV with dictionaries
with open('people.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"{row['Name']} is {row['Age']} years old")`
    }
  ]

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
              onClick={onBack}
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
              ← Back to Python Topics
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🐍 Core Python
            </h1>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {concepts.map((concept, index) => (
            <div
              key={index}
              onClick={() => setSelectedConcept(concept)}
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
                textAlign: 'center',
                fontSize: '0.875rem'
              }}>
                Click to explore fundamental Python concepts
              </p>
            </div>
          ))}
        </div>

        {selectedConcept && (
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
              maxWidth: '72rem',
              width: '100%',
              maxHeight: '90vh',
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
                    <span style={{ fontSize: '3rem' }}>{selectedConcept.icon}</span>
                    <h2 style={{
                      fontSize: '1.875rem',
                      fontWeight: 'bold',
                      color: 'white'
                    }}>
                      {selectedConcept.name}
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
                    color: '#d1d5db',
                    whiteSpace: 'pre-line',
                    lineHeight: '1.625'
                  }}>
                    {selectedConcept.explanation}
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
                  {parseCodeSections(selectedConcept.codeExample).map(
                    (section, idx) => (
                      <div key={section.id} style={{ marginBottom: '1rem' }}>
                        <button
                          onClick={() =>
                            toggleSection(
                              concepts.indexOf(selectedConcept),
                              idx
                            )
                          }
                          style={{
                            width: '100%',
                            background: '#2563eb',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            marginBottom: '0.5rem',
                            textAlign: 'left',
                            fontWeight: '500',
                            fontSize: '1rem'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#1d4ed8'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#2563eb'
                          }}
                        >
                          {expandedSections[
                            `${concepts.indexOf(selectedConcept)}-${idx}`
                          ]
                            ? '▼'
                            : '▶'}{' '}
                          Code Block {idx + 1}
                        </button>
                        {expandedSections[
                          `${concepts.indexOf(selectedConcept)}-${idx}`
                        ] && (
                          <SyntaxHighlighter
                            language="python"
                            style={vscDarkPlus}
                            customStyle={{
                              padding: '1.5rem',
                              borderRadius: '0.5rem',
                              fontSize: '0.9rem',
                              border: '1px solid #3b82f6'
                            }}
                          >
                            {section.code}
                          </SyntaxHighlighter>
                        )}
                      </div>
                    )
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

export default CorePython
