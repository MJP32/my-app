import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

const PythonOOP = ({ onBack, breadcrumb }) => {
  const [selectedConcept, setSelectedConcept] = useState(null)

  // Compute extended breadcrumb when a concept is selected
  const activeBreadcrumb = selectedConcept ? {
    section: breadcrumb.section,
    category: breadcrumb.category,
    subcategory: {
      name: breadcrumb.topic,
      onClick: () => setSelectedConcept(null)
    },
    topic: selectedConcept.name,
    colors: breadcrumb.colors
  } : breadcrumb

  const parseCodeSections = (codeString) => {
    const sections = codeString.split('\n\n')
    return sections.map((section, index) => ({
      id: index,
      code: section.trim()
    }))
  }

  const concepts = [
    {
      name: 'Classes & Objects',
      icon: '🏗️',
      explanation: `Basic class definition and object instantiation:

• **Class**: Blueprint for creating objects
  - Defined using 'class' keyword
  - PascalCase naming convention
  - __init__: Constructor method
  - self: Reference to instance

• **Objects**: Instances of a class
  - Created by calling class like a function
  - Each instance has its own attributes
  - Access attributes with dot notation

• **Instance Attributes**: Data unique to each object
• **Instance Methods**: Functions that operate on instance data`,
      codeExample: `# Basic Class Definition
class Person:
    """A class representing a person"""

    def __init__(self, name, age):
        """Constructor - called when object is created"""
        self.name = name  # Instance attribute
        self.age = age

    def introduce(self):
        """Instance method"""
        return f"Hi, I'm {self.name} and I'm {self.age} years old"

    def have_birthday(self):
        """Modify instance data"""
        self.age += 1
        return f"Happy birthday! Now {self.age} years old"

# Creating objects (instances)
person1 = Person("Alice", 30)
person2 = Person("Bob", 25)

print(person1.introduce())  # Hi, I'm Alice and I'm 30 years old
print(person2.introduce())  # Hi, I'm Bob and I'm 25 years old

person1.have_birthday()
print(person1.age)  # 31

# Multiple instances with different data
class BankAccount:
    def __init__(self, account_number, owner, balance=0):
        self.account_number = account_number
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            return f"Deposited \${amount}. New balance: \${self.balance}"
        return "Invalid amount"

    def withdraw(self, amount):
        if 0 < amount <= self.balance:
            self.balance -= amount
            return f"Withdrew \${amount}. New balance: \${self.balance}"
        return "Insufficient funds"

    def get_balance(self):
        return f"Account {self.account_number}: \${self.balance}"

# Create multiple accounts
account1 = BankAccount("12345", "Alice", 1000)
account2 = BankAccount("67890", "Bob", 500)

print(account1.deposit(200))   # Deposited $200. New balance: $1200
print(account2.withdraw(100))  # Withdrew $100. New balance: $400
print(account1.get_balance())  # Account 12345: $1200
print(account2.get_balance())  # Account 67890: $400`
    },
    {
      name: 'Class vs Instance Attributes',
      icon: '🔄',
      explanation: `Understanding the difference between class and instance attributes:

• **Instance Attributes**:
  - Unique to each object
  - Defined in __init__ with self
  - Different for each instance

• **Class Attributes**:
  - Shared by all instances
  - Defined in class body (not in __init__)
  - Same value for all objects (unless overridden)
  - Can be accessed via class name or instance

• **Use Cases**:
  - Instance: Personal data (name, age, balance)
  - Class: Shared config, counters, constants`,
      codeExample: `# Class vs Instance Attributes
class Employee:
    # Class attributes - shared by all instances
    company_name = "TechCorp"
    employee_count = 0
    min_salary = 30000

    def __init__(self, name, salary):
        # Instance attributes - unique to each object
        self.name = name
        self.salary = salary
        self.employee_id = Employee.employee_count

        # Modify class attribute
        Employee.employee_count += 1

    def get_info(self):
        return f"{self.name} (ID: {self.employee_id}), \${self.salary}, {Employee.company_name}"

# Create employees
emp1 = Employee("Alice", 50000)
emp2 = Employee("Bob", 60000)
emp3 = Employee("Charlie", 55000)

# Instance attributes are different
print(emp1.name)     # Alice
print(emp2.name)     # Bob

# Class attributes are shared
print(emp1.company_name)  # TechCorp
print(emp2.company_name)  # TechCorp
print(Employee.employee_count)  # 3

# Access class attribute through class or instance
print(Employee.min_salary)  # 30000
print(emp1.min_salary)      # 30000

# Modifying class attribute affects all instances
Employee.company_name = "MegaCorp"
print(emp1.company_name)  # MegaCorp
print(emp2.company_name)  # MegaCorp

# Class with Counter Pattern
class DatabaseConnection:
    active_connections = 0
    max_connections = 100

    def __init__(self, host, port):
        if DatabaseConnection.active_connections >= DatabaseConnection.max_connections:
            raise Exception("Max connections reached")

        self.host = host
        self.port = port
        DatabaseConnection.active_connections += 1
        print(f"Connection opened. Active: {DatabaseConnection.active_connections}")

    def close(self):
        DatabaseConnection.active_connections -= 1
        print(f"Connection closed. Active: {DatabaseConnection.active_connections}")

conn1 = DatabaseConnection("localhost", 5432)  # Active: 1
conn2 = DatabaseConnection("db.example.com", 5432)  # Active: 2
conn1.close()  # Active: 1`
    },
    {
      name: 'Inheritance',
      icon: '🧬',
      explanation: `Inheritance allows classes to inherit attributes and methods from parent classes:

• **Single Inheritance**: Inherit from one parent
  - Child class extends parent class
  - Use super() to call parent methods
  - Override methods to customize behavior

• **Benefits**:
  - Code reuse and organization
  - Establish class hierarchies
  - Polymorphic behavior

• **Method Resolution Order (MRO)**:
  - Order Python searches for methods
  - View with ClassName.__mro__ or ClassName.mro()`,
      codeExample: `# Basic Inheritance
class Animal:
    """Parent/Base class"""
    def __init__(self, name, species):
        self.name = name
        self.species = species

    def make_sound(self):
        return "Some generic sound"

    def describe(self):
        return f"{self.name} is a {self.species}"

class Dog(Animal):
    """Child/Derived class inherits from Animal"""
    def __init__(self, name, breed):
        # Call parent constructor
        super().__init__(name, species="Dog")
        self.breed = breed

    # Override parent method
    def make_sound(self):
        return "Woof! Woof!"

    # Add new method specific to Dog
    def fetch(self):
        return f"{self.name} is fetching the ball!"

class Cat(Animal):
    def __init__(self, name, color):
        super().__init__(name, species="Cat")
        self.color = color

    def make_sound(self):
        return "Meow!"

    def scratch(self):
        return f"{self.name} is scratching the furniture!"

# Using inherited classes
dog = Dog("Buddy", "Golden Retriever")
cat = Cat("Whiskers", "Orange")

print(dog.describe())      # Buddy is a Dog (inherited method)
print(dog.make_sound())    # Woof! Woof! (overridden method)
print(dog.fetch())         # Buddy is fetching the ball! (new method)

print(cat.describe())      # Whiskers is a Cat
print(cat.make_sound())    # Meow!

# Advanced Inheritance Example
class Shape:
    def __init__(self, color):
        self.color = color

    def area(self):
        raise NotImplementedError("Subclass must implement area()")

    def describe(self):
        return f"A {self.color} {self.__class__.__name__} with area {self.area()}"

class Rectangle(Shape):
    def __init__(self, color, width, height):
        super().__init__(color)
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

class Circle(Shape):
    def __init__(self, color, radius):
        super().__init__(color)
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

rect = Rectangle("blue", 5, 10)
circle = Circle("red", 7)

print(rect.describe())    # A blue Rectangle with area 50
print(circle.describe())  # A red Circle with area 153.93804`
    },
    {
      name: 'Multiple Inheritance & MRO',
      icon: '🌳',
      explanation: `Multiple inheritance allows a class to inherit from multiple parent classes:

• **Multiple Inheritance**:
  - Inherit from multiple parents
  - Access methods from all parents
  - Can lead to complexity (Diamond Problem)

• **Method Resolution Order (MRO)**:
  - C3 Linearization algorithm
  - Determines method lookup order
  - Left-to-right, depth-first
  - View with __mro__ or mro()

• **Diamond Problem**:
  - Multiple paths to same parent
  - MRO ensures each parent visited once`,
      codeExample: `# Multiple Inheritance
class Flyer:
    def __init__(self):
        self.can_fly = True

    def fly(self):
        return "Flying through the air!"

class Swimmer:
    def __init__(self):
        self.can_swim = True

    def swim(self):
        return "Swimming in the water!"

class Duck(Flyer, Swimmer):
    """Duck inherits from both Flyer and Swimmer"""
    def __init__(self, name):
        self.name = name
        # Call both parent constructors
        Flyer.__init__(self)
        Swimmer.__init__(self)

    def quack(self):
        return "Quack quack!"

duck = Duck("Donald")
print(duck.fly())     # Flying through the air!
print(duck.swim())    # Swimming in the water!
print(duck.quack())   # Quack quack!
print(duck.can_fly)   # True
print(duck.can_swim)  # True

# Method Resolution Order (MRO)
print(Duck.__mro__)
# (<class 'Duck'>, <class 'Flyer'>, <class 'Swimmer'>, <class 'object'>)

# Diamond Problem Example
class A:
    def method(self):
        return "A's method"

class B(A):
    def method(self):
        return "B's method"

class C(A):
    def method(self):
        return "C's method"

class D(B, C):
    """Inherits from both B and C, which both inherit from A"""
    pass

d = D()
print(d.method())  # B's method (follows MRO: D -> B -> C -> A)
print(D.__mro__)
# (<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)

# Practical Multiple Inheritance: Mixins
class JSONMixin:
    """Mixin to add JSON serialization"""
    def to_json(self):
        import json
        return json.dumps(self.__dict__)

class LoggerMixin:
    """Mixin to add logging capability"""
    def log(self, message):
        print(f"[{self.__class__.__name__}] {message}")

class User(JSONMixin, LoggerMixin):
    def __init__(self, username, email):
        self.username = username
        self.email = email

    def save(self):
        self.log(f"Saving user {self.username}")
        json_data = self.to_json()
        return json_data

user = User("alice", "alice@example.com")
user.save()  # [User] Saving user alice
print(user.to_json())  # {"username": "alice", "email": "alice@example.com"}`
    },
    {
      name: 'Encapsulation & Properties',
      icon: '🔒',
      explanation: `Encapsulation controls access to class internals:

• **Name Mangling**:
  - Single underscore (_): Protected (convention)
  - Double underscore (__): Private (name mangling)
  - No real private in Python (by design)

• **Properties (@property)**:
  - Getters and setters as attributes
  - Validation and computed values
  - Maintain backward compatibility

• **@property**: Read-only or computed attribute
• **@attr.setter**: Validation when setting
• **@attr.deleter**: Custom deletion behavior`,
      codeExample: `# Encapsulation with Properties
class BankAccount:
    def __init__(self, owner, initial_balance=0):
        self.owner = owner
        self.__balance = initial_balance  # Private attribute
        self.__transactions = []          # Private list

    @property
    def balance(self):
        """Getter - access like an attribute"""
        return self.__balance

    @balance.setter
    def balance(self, value):
        """Setter with validation"""
        if value < 0:
            raise ValueError("Balance cannot be negative")
        self.__balance = value

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            self.__transactions.append(f"+\${amount}")
            return f"Deposited \${amount}"
        return "Invalid amount"

    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            self.__transactions.append(f"-\${amount}")
            return f"Withdrew \${amount}"
        return "Insufficient funds"

    @property
    def transaction_history(self):
        """Read-only computed property"""
        return self.__transactions.copy()

account = BankAccount("Alice", 1000)
print(account.balance)  # 1000 (using getter)

account.deposit(500)
account.withdraw(200)
print(account.balance)  # 1300

# Can't directly access private attributes (name mangling)
# print(account.__balance)  # AttributeError

# But can access through mangled name (not recommended)
print(account._BankAccount__balance)  # 1300

print(account.transaction_history)  # ['+$500', '-$200']

# Property with Computed Value
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value <= 0:
            raise ValueError("Radius must be positive")
        self._radius = value

    @property
    def diameter(self):
        """Computed property"""
        return self._radius * 2

    @diameter.setter
    def diameter(self, value):
        """Setting diameter updates radius"""
        self._radius = value / 2

    @property
    def area(self):
        """Read-only computed property"""
        return 3.14159 * self._radius ** 2

    @property
    def circumference(self):
        return 2 * 3.14159 * self._radius

circle = Circle(5)
print(circle.radius)        # 5
print(circle.diameter)      # 10
print(circle.area)          # 78.53975

circle.diameter = 20        # Setting diameter updates radius
print(circle.radius)        # 10.0
print(circle.area)          # 314.159

# Temperature Converter with Properties
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9

    @property
    def kelvin(self):
        return self._celsius + 273.15

temp = Temperature(25)
print(temp.celsius)     # 25
print(temp.fahrenheit)  # 77.0
print(temp.kelvin)      # 298.15

temp.fahrenheit = 32    # Setting Fahrenheit
print(temp.celsius)     # 0.0`
    },
    {
      name: 'Magic/Dunder Methods',
      icon: '✨',
      explanation: `Special methods (double underscore) customize object behavior:

• **Object Representation**:
  - __str__: User-friendly string (str())
  - __repr__: Developer-friendly string (repr())

• **Comparison Operators**:
  - __eq__, __ne__, __lt__, __le__, __gt__, __ge__

• **Arithmetic Operators**:
  - __add__, __sub__, __mul__, __truediv__, __mod__

• **Container Methods**:
  - __len__, __getitem__, __setitem__, __delitem__
  - __contains__, __iter__

• **Context Managers**:
  - __enter__, __exit__

• **Callable Objects**:
  - __call__: Make objects callable like functions`,
      codeExample: `# Magic Methods for Custom Behavior
class Vector:
    """2D Vector with operator overloading"""

    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        """User-friendly string: str(vector)"""
        return f"Vector({self.x}, {self.y})"

    def __repr__(self):
        """Developer string: repr(vector)"""
        return f"Vector(x={self.x}, y={self.y})"

    def __add__(self, other):
        """Addition: v1 + v2"""
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        """Subtraction: v1 - v2"""
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):
        """Scalar multiplication: v * 3"""
        return Vector(self.x * scalar, self.y * scalar)

    def __eq__(self, other):
        """Equality: v1 == v2"""
        return self.x == other.x and self.y == other.y

    def __abs__(self):
        """Magnitude: abs(v)"""
        return (self.x ** 2 + self.y ** 2) ** 0.5

    def __len__(self):
        """Length (dimension): len(v)"""
        return 2

v1 = Vector(3, 4)
v2 = Vector(1, 2)

print(v1)              # Vector(3, 4)
print(v1 + v2)         # Vector(4, 6)
print(v1 - v2)         # Vector(2, 2)
print(v1 * 3)          # Vector(9, 12)
print(v1 == v2)        # False
print(abs(v1))         # 5.0
print(len(v1))         # 2

# Container Methods
class Playlist:
    """Custom list-like class"""

    def __init__(self, name):
        self.name = name
        self.songs = []

    def __len__(self):
        """len(playlist)"""
        return len(self.songs)

    def __getitem__(self, index):
        """playlist[0] or playlist[1:3]"""
        return self.songs[index]

    def __setitem__(self, index, song):
        """playlist[0] = "New Song" """
        self.songs[index] = song

    def __delitem__(self, index):
        """del playlist[0]"""
        del self.songs[index]

    def __contains__(self, song):
        """'song' in playlist"""
        return song in self.songs

    def __iter__(self):
        """for song in playlist"""
        return iter(self.songs)

    def add_song(self, song):
        self.songs.append(song)

playlist = Playlist("My Favorites")
playlist.add_song("Song A")
playlist.add_song("Song B")
playlist.add_song("Song C")

print(len(playlist))           # 3
print(playlist[0])             # Song A
print("Song B" in playlist)    # True

for song in playlist:
    print(song)                # Iterate over songs

# Callable Object
class Multiplier:
    """Object that acts like a function"""

    def __init__(self, factor):
        self.factor = factor

    def __call__(self, number):
        """Make instance callable"""
        return number * self.factor

double = Multiplier(2)
triple = Multiplier(3)

print(double(5))      # 10
print(triple(5))      # 15
print(double(10))     # 20

# Context Manager
class FileManager:
    """Custom context manager"""

    def __init__(self, filename, mode):
        self.filename = filename
        self.mode = mode
        self.file = None

    def __enter__(self):
        """Called when entering 'with' block"""
        self.file = open(self.filename, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        """Called when exiting 'with' block"""
        if self.file:
            self.file.close()
        return False  # Don't suppress exceptions

# Using context manager
with FileManager("test.txt", "w") as f:
    f.write("Hello, World!")
# File automatically closed after block`
    },
    {
      name: 'Class Methods & Static Methods',
      icon: '⚙️',
      explanation: `Different types of methods in classes:

• **Instance Methods** (default):
  - Take self as first parameter
  - Operate on instance data
  - Can access instance and class attributes

• **Class Methods (@classmethod)**:
  - Take cls as first parameter
  - Operate on class level
  - Alternative constructors
  - Factory methods

• **Static Methods (@staticmethod)**:
  - No self or cls parameter
  - Utility functions
  - Namespaced under class
  - Don't access instance or class data`,
      codeExample: `# Instance, Class, and Static Methods
class Date:
    """Date class demonstrating all method types"""

    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    # Instance method (default)
    def format(self):
        """Format date as string"""
        return f"{self.year}-{self.month:02d}-{self.day:02d}"

    # Class method - alternative constructor
    @classmethod
    def from_string(cls, date_string):
        """Create Date from string: '2024-12-25'"""
        year, month, day = map(int, date_string.split('-'))
        return cls(year, month, day)  # Returns new instance

    @classmethod
    def today(cls):
        """Create Date for today"""
        import datetime
        today = datetime.date.today()
        return cls(today.year, today.month, today.day)

    # Static method - utility function
    @staticmethod
    def is_leap_year(year):
        """Check if year is a leap year"""
        return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

    @staticmethod
    def days_in_month(year, month):
        """Get number of days in month"""
        if month in [1, 3, 5, 7, 8, 10, 12]:
            return 31
        elif month in [4, 6, 9, 11]:
            return 30
        else:
            return 29 if Date.is_leap_year(year) else 28

# Using instance method
date1 = Date(2024, 12, 25)
print(date1.format())  # 2024-12-25

# Using class method as alternative constructor
date2 = Date.from_string("2024-01-15")
print(date2.format())  # 2024-01-15

date3 = Date.today()
print(date3.format())  # Current date

# Using static methods (can call without instance)
print(Date.is_leap_year(2024))      # True
print(Date.days_in_month(2024, 2))  # 29
print(Date.days_in_month(2023, 2))  # 28

# Employee Management Example
class Employee:
    company = "TechCorp"
    raise_percent = 1.05  # 5% raise

    def __init__(self, first, last, pay):
        self.first = first
        self.last = last
        self.pay = pay

    @property
    def email(self):
        """Instance method/property"""
        return f"{self.first.lower()}.{self.last.lower()}@{self.company.lower()}.com"

    @property
    def fullname(self):
        return f"{self.first} {self.last}"

    def apply_raise(self):
        """Instance method - uses instance data"""
        self.pay = int(self.pay * self.raise_percent)

    @classmethod
    def set_raise_percent(cls, percent):
        """Class method - modifies class attribute"""
        cls.raise_percent = percent

    @classmethod
    def from_string(cls, emp_str):
        """Alternative constructor from string"""
        first, last, pay = emp_str.split('-')
        return cls(first, last, int(pay))

    @staticmethod
    def is_workday(day):
        """Static method - utility function"""
        # Monday = 0, Sunday = 6
        return day not in [5, 6]  # Not Saturday or Sunday

emp1 = Employee("John", "Doe", 50000)
emp2 = Employee("Jane", "Smith", 60000)

print(emp1.email)      # john.doe@techcorp.com
print(emp1.fullname)   # John Doe

# Using class method to change class attribute
Employee.set_raise_percent(1.10)  # 10% raise for all
emp1.apply_raise()
print(emp1.pay)        # 55000

# Alternative constructor
emp3 = Employee.from_string("Alice-Johnson-70000")
print(emp3.fullname)   # Alice Johnson

# Static method
import datetime
today = datetime.date.today()
print(Employee.is_workday(today.weekday()))  # True/False

# Pizza Order System
class Pizza:
    """Pizza with different creation patterns"""

    def __init__(self, size, *toppings):
        self.size = size
        self.toppings = toppings

    def __repr__(self):
        return f"Pizza(size={self.size}, toppings={self.toppings})"

    @classmethod
    def margherita(cls, size):
        """Factory method for margherita pizza"""
        return cls(size, "mozzarella", "tomato sauce", "basil")

    @classmethod
    def pepperoni(cls, size):
        """Factory method for pepperoni pizza"""
        return cls(size, "mozzarella", "pepperoni")

    @staticmethod
    def calculate_price(size, num_toppings):
        """Calculate pizza price"""
        base_prices = {"small": 8, "medium": 10, "large": 12}
        return base_prices.get(size, 10) + (num_toppings * 1.5)

# Custom pizza
pizza1 = Pizza("large", "pepperoni", "mushrooms", "olives")

# Factory methods
pizza2 = Pizza.margherita("medium")
pizza3 = Pizza.pepperoni("large")

print(pizza1)  # Pizza(size=large, toppings=('pepperoni', 'mushrooms', 'olives'))
print(pizza2)  # Pizza(size=medium, toppings=('mozzarella', 'tomato sauce', 'basil'))

# Static method
price = Pizza.calculate_price("large", 3)
print(f"Price: \${price}")  # Price: $16.5`
    },
    {
      name: 'Abstract Classes & Interfaces',
      icon: '🎭',
      explanation: `Abstract Base Classes (ABC) define interfaces and enforce method implementation:

• **ABC Module**:
  - Create abstract base classes
  - Define abstract methods
  - Cannot instantiate abstract classes

• **@abstractmethod**:
  - Must be implemented by subclasses
  - Raises TypeError if not implemented
  - Can have default implementation

• **Use Cases**:
  - Define interfaces/contracts
  - Template Method pattern
  - Plugin architectures
  - Framework design`,
      codeExample: `from abc import ABC, abstractmethod

# Abstract Base Class
class Shape(ABC):
    """Abstract base class for shapes"""

    def __init__(self, color):
        self.color = color

    @abstractmethod
    def area(self):
        """Must be implemented by subclasses"""
        pass

    @abstractmethod
    def perimeter(self):
        """Must be implemented by subclasses"""
        pass

    def describe(self):
        """Concrete method - shared by all shapes"""
        return f"{self.color} {self.__class__.__name__}"

# Cannot instantiate abstract class
# shape = Shape("red")  # TypeError

# Concrete implementations
class Rectangle(Shape):
    def __init__(self, color, width, height):
        super().__init__(color)
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

class Circle(Shape):
    def __init__(self, color, radius):
        super().__init__(color)
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2

    def perimeter(self):
        return 2 * 3.14159 * self.radius

# Using concrete classes
rect = Rectangle("blue", 5, 10)
circle = Circle("red", 7)

print(rect.describe())    # blue Rectangle
print(rect.area())        # 50
print(rect.perimeter())   # 30

print(circle.describe())  # red Circle
print(circle.area())      # 153.93804

# Payment Processing System
class PaymentProcessor(ABC):
    """Abstract payment processor interface"""

    @abstractmethod
    def process_payment(self, amount):
        """Process payment"""
        pass

    @abstractmethod
    def refund(self, transaction_id, amount):
        """Process refund"""
        pass

    def validate_amount(self, amount):
        """Shared validation logic"""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        return True

class CreditCardProcessor(PaymentProcessor):
    def __init__(self, api_key):
        self.api_key = api_key

    def process_payment(self, amount):
        self.validate_amount(amount)
        return f"Processing \${amount} via credit card"

    def refund(self, transaction_id, amount):
        return f"Refunding \${amount} for transaction {transaction_id}"

class PayPalProcessor(PaymentProcessor):
    def __init__(self, email):
        self.email = email

    def process_payment(self, amount):
        self.validate_amount(amount)
        return f"Processing \${amount} via PayPal ({self.email})"

    def refund(self, transaction_id, amount):
        return f"Refunding \${amount} via PayPal"

# Using payment processors
cc_processor = CreditCardProcessor("sk_test_123")
paypal_processor = PayPalProcessor("user@example.com")

print(cc_processor.process_payment(100))
print(paypal_processor.process_payment(50))

# Database Connection Interface
class DatabaseConnection(ABC):
    """Abstract database connection"""

    @abstractmethod
    def connect(self):
        pass

    @abstractmethod
    def disconnect(self):
        pass

    @abstractmethod
    def execute(self, query):
        pass

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.disconnect()

class PostgreSQLConnection(DatabaseConnection):
    def __init__(self, host, database):
        self.host = host
        self.database = database
        self.connected = False

    def connect(self):
        self.connected = True
        return f"Connected to PostgreSQL: {self.database}@{self.host}"

    def disconnect(self):
        self.connected = False
        return "Disconnected from PostgreSQL"

    def execute(self, query):
        if not self.connected:
            raise Exception("Not connected")
        return f"Executing: {query}"

class MongoDBConnection(DatabaseConnection):
    def __init__(self, host, database):
        self.host = host
        self.database = database
        self.connected = False

    def connect(self):
        self.connected = True
        return f"Connected to MongoDB: {self.database}@{self.host}"

    def disconnect(self):
        self.connected = False
        return "Disconnected from MongoDB"

    def execute(self, query):
        if not self.connected:
            raise Exception("Not connected")
        return f"Executing: {query}"

# Using with context manager
with PostgreSQLConnection("localhost", "mydb") as db:
    print(db.execute("SELECT * FROM users"))

# Template Method Pattern
class DataParser(ABC):
    """Template for data parsing"""

    def parse(self, data):
        """Template method - defines algorithm structure"""
        self.validate(data)
        parsed = self.extract_data(data)
        transformed = self.transform_data(parsed)
        return self.format_output(transformed)

    @abstractmethod
    def extract_data(self, data):
        """Subclasses must implement"""
        pass

    @abstractmethod
    def transform_data(self, data):
        """Subclasses must implement"""
        pass

    def validate(self, data):
        """Default implementation"""
        if not data:
            raise ValueError("Empty data")

    def format_output(self, data):
        """Default implementation"""
        return data

class JSONParser(DataParser):
    def extract_data(self, data):
        import json
        return json.loads(data)

    def transform_data(self, data):
        # Transform JSON data
        return {k.upper(): v for k, v in data.items()}

class CSVParser(DataParser):
    def extract_data(self, data):
        lines = data.strip().split('\\n')
        return [line.split(',') for line in lines]

    def transform_data(self, data):
        # Transform CSV data to dict
        headers = data[0]
        return [dict(zip(headers, row)) for row in data[1:]]

json_parser = JSONParser()
result = json_parser.parse('{"name": "Alice", "age": 30}')
print(result)  # {'NAME': 'Alice', 'AGE': 30}`
    },
    {
      name: 'Composition vs Inheritance',
      icon: '🧩',
      explanation: `Composition: "has-a" relationship vs Inheritance: "is-a" relationship

• **Composition**:
  - Objects contain other objects
  - More flexible than inheritance
  - Easier to change and test
  - Prefer composition over inheritance

• **When to Use Composition**:
  - Reuse code from multiple sources
  - Need flexibility to change behavior
  - Objects have shared functionality but aren't related

• **When to Use Inheritance**:
  - Clear "is-a" relationship
  - Polymorphic behavior needed
  - Shared interface required`,
      codeExample: `# Inheritance Example (Is-A relationship)
class Vehicle:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    def start(self):
        return f"{self.brand} {self.model} starting..."

class Car(Vehicle):
    """Car IS-A Vehicle"""
    def __init__(self, brand, model, num_doors):
        super().__init__(brand, model)
        self.num_doors = num_doors

    def honk(self):
        return "Beep beep!"

# Composition Example (Has-A relationship)
class Engine:
    """Engine component"""
    def __init__(self, horsepower, fuel_type):
        self.horsepower = horsepower
        self.fuel_type = fuel_type

    def start(self):
        return f"Engine starting: {self.horsepower}hp {self.fuel_type}"

    def stop(self):
        return "Engine stopping"

class Transmission:
    """Transmission component"""
    def __init__(self, transmission_type):
        self.type = transmission_type

    def shift(self, gear):
        return f"Shifting to gear {gear}"

class Car2:
    """Car HAS-A Engine and Transmission"""
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model
        # Composition - car contains engine and transmission
        self.engine = Engine(200, "gasoline")
        self.transmission = Transmission("automatic")

    def start(self):
        return self.engine.start()

    def drive(self, gear):
        return f"{self.brand} driving: {self.transmission.shift(gear)}"

car = Car2("Toyota", "Camry")
print(car.start())       # Engine starting: 200hp gasoline
print(car.drive(3))      # Toyota driving: Shifting to gear 3

# Complex Composition Example: Computer
class CPU:
    def __init__(self, model, cores):
        self.model = model
        self.cores = cores

    def process(self):
        return f"{self.model} processing with {self.cores} cores"

class RAM:
    def __init__(self, size_gb):
        self.size_gb = size_gb

    def load(self):
        return f"Loading into {self.size_gb}GB RAM"

class Storage:
    def __init__(self, size_gb, storage_type):
        self.size_gb = size_gb
        self.type = storage_type

    def read(self):
        return f"Reading from {self.size_gb}GB {self.type}"

class Computer:
    """Computer is composed of CPU, RAM, and Storage"""
    def __init__(self, brand):
        self.brand = brand
        self.cpu = CPU("Intel i7", 8)
        self.ram = RAM(16)
        self.storage = Storage(512, "SSD")
        self.is_on = False

    def power_on(self):
        self.is_on = True
        return f"{self.brand} computer powering on..."

    def run_program(self):
        if not self.is_on:
            return "Computer is off"

        return f"""
        {self.cpu.process()}
        {self.ram.load()}
        {self.storage.read()}
        """

computer = Computer("Dell")
print(computer.power_on())
print(computer.run_program())

# Flexible Composition with Strategy Pattern
class PaymentStrategy:
    """Base payment strategy"""
    def pay(self, amount):
        raise NotImplementedError

class CreditCardPayment(PaymentStrategy):
    def __init__(self, card_number):
        self.card_number = card_number

    def pay(self, amount):
        return f"Paid \${amount} with credit card {self.card_number}"

class PayPalPayment(PaymentStrategy):
    def __init__(self, email):
        self.email = email

    def pay(self, amount):
        return f"Paid \${amount} with PayPal {self.email}"

class BitcoinPayment(PaymentStrategy):
    def __init__(self, wallet):
        self.wallet = wallet

    def pay(self, amount):
        return f"Paid \${amount} with Bitcoin wallet {self.wallet}"

class ShoppingCart:
    """Cart uses composition for flexible payment"""
    def __init__(self):
        self.items = []
        self.payment_strategy = None

    def add_item(self, item, price):
        self.items.append((item, price))

    def set_payment_strategy(self, strategy):
        """Dynamically change payment method"""
        self.payment_strategy = strategy

    def checkout(self):
        total = sum(price for _, price in self.items)
        if not self.payment_strategy:
            return "Please select a payment method"
        return self.payment_strategy.pay(total)

# Using composition with different strategies
cart = ShoppingCart()
cart.add_item("Laptop", 1200)
cart.add_item("Mouse", 50)

# Can dynamically switch payment methods
cart.set_payment_strategy(CreditCardPayment("1234-5678-9012"))
print(cart.checkout())  # Paid $1250 with credit card

cart.set_payment_strategy(PayPalPayment("user@example.com"))
print(cart.checkout())  # Paid $1250 with PayPal

cart.set_payment_strategy(BitcoinPayment("1A2b3C4d"))
print(cart.checkout())  # Paid $1250 with Bitcoin`
    },
    {
      name: 'Dataclasses',
      icon: '📦',
      explanation: `Dataclasses provide automatic generation of special methods:

• **@dataclass Decorator**:
  - Auto-generates __init__, __repr__, __eq__
  - Less boilerplate code
  - Type hints for clarity
  - Immutability with frozen=True

• **Features**:
  - Default values and factories
  - Field customization
  - Post-init processing
  - Comparison and ordering

• **Benefits**:
  - Clean, readable code
  - Automatic special methods
  - Type safety with hints
  - Less error-prone`,
      codeExample: `from dataclasses import dataclass, field
from typing import List
from datetime import datetime

# Basic Dataclass
@dataclass
class Person:
    """Simple dataclass with auto-generated methods"""
    name: str
    age: int
    city: str = "Unknown"  # Default value

    # Auto-generated:
    # - __init__
    # - __repr__
    # - __eq__

person1 = Person("Alice", 30, "NYC")
person2 = Person("Bob", 25)

print(person1)  # Person(name='Alice', age=30, city='NYC')
print(person2)  # Person(name='Bob', age=25, city='Unknown')
print(person1 == person2)  # False

# Dataclass with Field Customization
@dataclass
class Product:
    name: str
    price: float
    quantity: int = 0
    tags: List[str] = field(default_factory=list)  # Mutable default
    _id: int = field(default=0, init=False, repr=False)  # Not in __init__ or __repr__

    def __post_init__(self):
        """Called after __init__"""
        self._id = hash(self.name)
        if self.price < 0:
            raise ValueError("Price cannot be negative")

product1 = Product("Laptop", 1200, 5, ["electronics", "computers"])
product2 = Product("Mouse", 25.99)

print(product1)
# Product(name='Laptop', price=1200, quantity=5, tags=['electronics', 'computers'])

# Each instance gets its own list (not shared)
product2.tags.append("accessories")
print(product1.tags)  # ['electronics', 'computers']
print(product2.tags)  # ['accessories']

# Frozen Dataclass (Immutable)
@dataclass(frozen=True)
class Point:
    """Immutable point"""
    x: float
    y: float

    def distance_from_origin(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

point = Point(3, 4)
print(point.distance_from_origin())  # 5.0
# point.x = 10  # FrozenInstanceError - cannot modify

# Ordered Dataclass
@dataclass(order=True)
class Student:
    """Comparable by GPA"""
    sort_index: float = field(init=False, repr=False)
    name: str
    gpa: float

    def __post_init__(self):
        self.sort_index = self.gpa

students = [
    Student("Alice", 3.8),
    Student("Bob", 3.5),
    Student("Charlie", 3.9)
]

students.sort()  # Sorts by GPA
for student in students:
    print(student)
# Student(name='Bob', gpa=3.5)
# Student(name='Alice', gpa=3.8)
# Student(name='Charlie', gpa=3.9)

# Complex Example: Task Management
@dataclass
class Task:
    title: str
    description: str = ""
    completed: bool = False
    created_at: datetime = field(default_factory=datetime.now)
    tags: List[str] = field(default_factory=list)
    priority: int = 0

    def mark_complete(self):
        """Not auto-generated - custom method"""
        self.completed = True

    def add_tag(self, tag: str):
        if tag not in self.tags:
            self.tags.append(tag)

    def __str__(self):
        """Custom string representation"""
        status = "✓" if self.completed else "○"
        return f"{status} {self.title} (Priority: {self.priority})"

@dataclass
class Project:
    name: str
    tasks: List[Task] = field(default_factory=list)

    def add_task(self, task: Task):
        self.tasks.append(task)

    def get_pending_tasks(self):
        return [t for t in self.tasks if not t.completed]

    def get_completed_tasks(self):
        return [t for t in self.tasks if t.completed]

    @property
    def completion_rate(self):
        if not self.tasks:
            return 0
        completed = len(self.get_completed_tasks())
        return (completed / len(self.tasks)) * 100

# Using dataclasses
project = Project("Website Redesign")

task1 = Task("Design mockups", priority=3)
task1.add_tag("design")
task1.add_tag("urgent")

task2 = Task("Implement frontend", priority=2)
task2.add_tag("development")

task3 = Task("Write tests", priority=1)
task3.add_tag("testing")

project.add_task(task1)
project.add_task(task2)
project.add_task(task3)

task1.mark_complete()
task2.mark_complete()

print(f"Project: {project.name}")
print(f"Completion: {project.completion_rate:.1f}%")
print("\\nPending tasks:")
for task in project.get_pending_tasks():
    print(f"  {task}")

# E-commerce Example
@dataclass
class Money:
    amount: float
    currency: str = "USD"

    def __add__(self, other):
        if self.currency != other.currency:
            raise ValueError("Cannot add different currencies")
        return Money(self.amount + other.amount, self.currency)

    def __str__(self):
        return f"{self.currency} {self.amount:.2f}"

@dataclass
class CartItem:
    product_name: str
    price: Money
    quantity: int = 1

    @property
    def total(self):
        return Money(self.price.amount * self.quantity, self.price.currency)

@dataclass
class ShoppingCart:
    items: List[CartItem] = field(default_factory=list)
    discount: float = 0.0

    def add_item(self, product_name: str, price: Money, quantity: int = 1):
        self.items.append(CartItem(product_name, price, quantity))

    @property
    def subtotal(self):
        total = Money(0)
        for item in self.items:
            total = total + item.total
        return total

    @property
    def discount_amount(self):
        return Money(self.subtotal.amount * self.discount)

    @property
    def total(self):
        return Money(self.subtotal.amount - self.discount_amount.amount)

cart = ShoppingCart(discount=0.10)  # 10% discount
cart.add_item("Laptop", Money(1200.00), 1)
cart.add_item("Mouse", Money(25.99), 2)

print(f"Subtotal: {cart.subtotal}")
print(f"Discount: {cart.discount_amount}")
print(f"Total: {cart.total}")`
    },
    {
      name: 'Bank Example with Unit Tests',
      icon: '🏦',
      explanation: `Complete banking system demonstrating OOP principles and unit testing:

• **Abstract Base Classes**:
  - ABC module for defining abstract methods
  - Transaction as abstract base class
  - Enforces implementation in subclasses

• **Concrete Implementations**:
  - Withdraw: Deducts from account balance
  - Deposit: Adds to account balance
  - Validation in execute methods

• **Account Management**:
  - Track balance and transaction count
  - Encapsulation with getter methods
  - Immutable operations via transactions

• **Bank System**:
  - Manage multiple accounts
  - Transfer funds between accounts
  - Track account with most transactions

• **Unit Testing**:
  - unittest module for test cases
  - setUp method for test fixtures
  - Test various scenarios and edge cases
  - Assertions for validation`,
      codeExample: `import unittest
from abc import ABC, abstractmethod

class Transaction:
    def __init__(self, account, amount):
        amount = float(amount)
        if amount <= 0:
            raise ValueError("Amount must be greater than 0")
        self.amount = amount
        self.account = account
    @abstractmethod
    def execute(self):
        pass


class Withdraw(Transaction):
    def execute(self):
        if self.amount > self.account.balance:
            return False
        self.account.balance -= self.amount
        self.account.transactions += 1
        return 1


class Deposit(Transaction):
    def execute(self):
        self.account.balance += self.amount
        self.account.transactions += 1
        return 1


class Account:
    def __init__(self, name, balance=0.0):
        self.name = name
        self.balance = balance
        self.transactions = 0

    def getBalance(self):
        return self.balance

    def getTransactions(self):
        return self.transactions

    def getName(self):
        return self.name


class Bank:
    def __init__(self):
        self.accounts = {}
        self.top_account = None

    def create_account(self, name, amount):
        if name in self.accounts:
            return -1
        acc = Account(name, amount)
        self.accounts[name] = acc

    def deposit(self, name, amount):
        if name not in self.accounts:
            return -1
        acc = self.accounts[name]
        if Deposit(acc, amount).execute():
            self.update_max(acc)
            return 1
        return -1

    def withdraw(self, name, amount):
        if name not in self.accounts:
            return -1
        acc = self.accounts[name]
        if Withdraw(acc, amount).execute():
            self.update_max(acc)
            return 1
        return -1

    def transfer(self, name, to, amount):
        if name not in self.accounts or to not in self.accounts:
            return -1
        name = self.accounts[name]
        to = self.accounts[to]
        if Withdraw(name, amount).execute():
            if Deposit(to, amount).execute():
                self.update_max(name)
                self.update_max(to)
                return 1
        return 0

    def update_max(self, acc):
        if self.top_account is None or acc.getTransactions() > self.top_account.getTransactions():
            self.top_account = acc

    def getAccountMostTransactions(self):
        return self.top_account


# -------------------------------
# ✅ UNIT TESTS
# -------------------------------
class TestBankSystem(unittest.TestCase):
    def setUp(self):
        self.bank = Bank()
        self.bank.create_account("John", 1000)
        self.bank.create_account("Alice", 500)

    def test_account_creation(self):
        self.assertIn("John", self.bank.accounts)
        self.assertEqual(self.bank.accounts["John"].getBalance(), 1000)
        self.assertEqual(self.bank.create_account("John", 200), -1)  # duplicate

    def test_deposit(self):
        result = self.bank.deposit("John", 200)
        self.assertTrue(result)
        self.assertEqual(self.bank.accounts["John"].getBalance(), 1200)

    def test_withdrawal_success(self):
        result = self.bank.withdraw("Alice", 100)
        self.assertTrue(result)
        self.assertEqual(self.bank.accounts["Alice"].getBalance(), 400)

    def test_withdrawal_insufficient_funds(self):
        result = self.bank.withdraw("Alice", 1000)
        self.assertEqual(result, -1)
        self.assertEqual(self.bank.accounts["Alice"].getBalance(), 500)

    def test_transfer_success(self):
        result = self.bank.transfer("John", "Alice", 300)
        self.assertTrue(result)
        self.assertEqual(self.bank.accounts["John"].getBalance(), 700)
        self.assertEqual(self.bank.accounts["Alice"].getBalance(), 800)

    def test_transfer_failure_no_account(self):
        result = self.bank.transfer("John", "Bob", 100)
        self.assertEqual(result, -1)

    def test_most_transactions(self):
        # John performs 2 transactions, Alice performs 1
        self.bank.deposit("John", 100)
        self.bank.withdraw("John", 50)
        self.bank.deposit("Alice", 200)
        top = self.bank.getAccountMostTransactions()
        self.assertEqual(top.getName(), "John")

    def test_no_account_found(self):
        self.assertEqual(self.bank.deposit("Bob", 100), -1)
        self.assertEqual(self.bank.withdraw("Bob", 100), -1)


if __name__ == "__main__":
    unittest.main()`
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
              ← Back to Python
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🐍 Python OOP
            </h1>
          </div>
        </div>

        <Breadcrumb breadcrumb={activeBreadcrumb} />

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
                Click to explore OOP concepts in Python
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
                        <div
                          style={{
                            width: '100%',
                            background: '#2563eb',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            marginBottom: '0.5rem'
                          }}
                        >
                          Code Block {idx + 1}
                        </div>
                        <SyntaxHighlighter
                          language="python"
                          style={vscDarkPlus}
                          customStyle={{
                            padding: '1.5rem',
                            borderRadius: '0.5rem',
                            fontSize: '0.9rem',
                            border: '1px solid #3b82f6',
                            margin: 0
                          }}
                        >
                          {section.code}
                        </SyntaxHighlighter>
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

export default PythonOOP
