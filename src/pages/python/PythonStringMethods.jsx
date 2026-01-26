import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CompletionCheckbox from '../../components/CompletionCheckbox'
import Breadcrumb from '../../components/Breadcrumb'

function PythonStringMethods({ onBack, breadcrumb }) {
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [showSolution, setShowSolution] = useState(false)

  const parseCodeSections = (codeString) => {
    const sections = codeString.split('\n\n')
    return sections.map((section, index) => ({
      id: index,
      code: section.trim()
    }))
  }

  const problems = [
    {
      id: 1,
      title: 'Case Conversion Methods',
      difficulty: 'Easy',
      description: 'Master string case conversion: upper(), lower(), capitalize(), title(), swapcase().',
      example: `text = "hello WORLD"

# Convert to uppercase
print(text.upper())           # "HELLO WORLD"

# Convert to lowercase
print(text.lower())           # "hello world"

# Capitalize first character only
print(text.capitalize())      # "Hello world"

# Title case (capitalize each word)
print(text.title())           # "Hello World"

# Swap case of each character
print(text.swapcase())        # "HELLO world"

# Case-insensitive comparison
s1 = "Python"
s2 = "python"
print(s1.lower() == s2.lower())  # True

# Common use: normalize user input
user_input = "  JoHn DoE  "
normalized = user_input.strip().title()
print(normalized)  # "John Doe"`,
      testCases: [
        { input: '"hello".upper()', expected: '"HELLO"' },
        { input: '"WORLD".lower()', expected: '"world"' },
        { input: '"hello world".title()', expected: '"Hello World"' }
      ],
      hints: [
        'upper() and lower() convert entire string',
        'capitalize() only affects first character',
        'title() capitalizes first letter of each word',
        'Use lower() or upper() for case-insensitive comparisons'
      ],
      solution: `def case_conversion_examples():
    text = "hello WORLD python"

    # Upper case
    uppercase = text.upper()
    # "HELLO WORLD PYTHON"

    # Lower case
    lowercase = text.lower()
    # "hello world python"

    # Capitalize (first char only)
    capitalized = text.capitalize()
    # "Hello world python"

    # Title case (each word)
    title_case = text.title()
    # "Hello World Python"

    # Swap case
    swapped = text.swapcase()
    # "HELLO world PYTHON"

    # Case-insensitive comparison
    def case_insensitive_equal(s1, s2):
        return s1.lower() == s2.lower()

    # Normalize names
    names = ["john DOE", "JANE smith", "bob JONES"]
    normalized = [name.title() for name in names]
    # ['John Doe', 'Jane Smith', 'Bob Jones']

    # Check if string is uppercase/lowercase
    text2 = "HELLO"
    is_upper = text2.isupper()  # True
    is_lower = text2.islower()  # False

    # Validate password requirements
    password = "MyPassword123"
    has_upper = any(c.isupper() for c in password)  # True
    has_lower = any(c.islower() for c in password)  # True
    has_digit = any(c.isdigit() for c in password)  # True

    return uppercase, normalized, has_upper

# Time: O(n) where n is string length
# Space: O(n) for creating new string (strings are immutable)`,
      complexity: {
        time: 'O(n) where n is the length of the string',
        space: 'O(n) - creates new string (strings are immutable in Python)'
      }
    },
    {
      id: 2,
      title: 'Strip, Trim, and Whitespace Methods',
      difficulty: 'Easy',
      description: 'Remove whitespace and characters using strip(), lstrip(), rstrip().',
      example: `text = "   hello world   "

# Remove whitespace from both ends
print(text.strip())       # "hello world"

# Remove from left (leading)
print(text.lstrip())      # "hello world   "

# Remove from right (trailing)
print(text.rstrip())      # "   hello world"

# Remove specific characters
text2 = "***hello***"
print(text2.strip('*'))   # "hello"

# Remove multiple characters
text3 = "---abc123---"
print(text3.strip('-'))   # "abc123"

# Common use: clean user input
user_input = "  user@example.com  "
cleaned = user_input.strip()
print(cleaned)  # "user@example.com"

# Remove newlines and tabs
text4 = "\\nhello\\tworld\\n"
print(text4.strip())      # "hello\\tworld"

# Strip doesn't affect middle whitespace
text5 = "  hello   world  "
print(text5.strip())      # "hello   world"`,
      testCases: [
        { input: '"  hello  ".strip()', expected: '"hello"' },
        { input: '"***test***".strip("*")', expected: '"test"' },
        { input: '"  left".lstrip()', expected: '"left"' }
      ],
      hints: [
        'strip() removes from both ends, not middle',
        'Can pass characters to strip: strip("*")',
        'lstrip() = left, rstrip() = right',
        'Whitespace includes spaces, tabs, newlines'
      ],
      solution: `def strip_methods():
    # Basic stripping
    text = "   hello world   "
    stripped = text.strip()          # "hello world"
    left_stripped = text.lstrip()    # "hello world   "
    right_stripped = text.rstrip()   # "   hello world"

    # Strip specific characters
    text2 = "***hello***"
    cleaned = text2.strip('*')       # "hello"

    # Strip multiple character types
    text3 = "---###hello###---"
    cleaned2 = text3.strip('-#')     # "hello"

    # Common pattern: clean CSV data
    csv_row = "  John Doe  ,  30  ,  Engineer  "
    fields = [field.strip() for field in csv_row.split(',')]
    # ['John Doe', '30', 'Engineer']

    # Remove URL protocol
    url = "https://example.com"
    domain = url.lstrip("https://")  # "example.com"

    # Remove file extension
    filename = "document.txt"
    name = filename.rstrip(".txt")   # "document"

    # Clean lines from file
    lines = ["  line 1\\n", "  line 2\\n", "  line 3\\n"]
    cleaned_lines = [line.strip() for line in lines]
    # ['line 1', 'line 2', 'line 3']

    # Validate non-empty after stripping
    def is_empty_or_whitespace(s):
        return len(s.strip()) == 0

    print(is_empty_or_whitespace("   "))    # True
    print(is_empty_or_whitespace(" abc "))  # False

    # Remove punctuation from ends
    text4 = "...hello world!!!"
    cleaned3 = text4.strip('.!')     # "hello world"

    return stripped, fields, cleaned_lines

# Time: O(n) - scans from both ends
# Space: O(n) - creates new string`,
      complexity: {
        time: 'O(n) worst case (if entire string is whitespace)',
        space: 'O(n) for new string'
      }
    },
    {
      id: 3,
      title: 'Search Methods: find(), index(), count()',
      difficulty: 'Easy',
      description: 'Search for substrings using find(), index(), count(), startswith(), endswith().',
      example: `text = "hello world, hello python"

# find() - returns index or -1 if not found
print(text.find('hello'))      # 0 (first occurrence)
print(text.find('world'))      # 6
print(text.find('java'))       # -1 (not found)

# find() with start position
print(text.find('hello', 5))   # 13 (second occurrence)

# index() - like find() but raises ValueError if not found
print(text.index('world'))     # 6
# print(text.index('java'))    # ValueError!

# count() - count occurrences
print(text.count('hello'))     # 2
print(text.count('o'))         # 4

# startswith() and endswith()
print(text.startswith('hello'))    # True
print(text.endswith('python'))     # True
print(text.startswith('world'))    # False

# Check multiple prefixes
url = "https://example.com"
is_web = url.startswith(('http://', 'https://'))
print(is_web)  # True

# Find all occurrences
def find_all(s, substring):
    positions = []
    start = 0
    while True:
        pos = s.find(substring, start)
        if pos == -1:
            break
        positions.append(pos)
        start = pos + 1
    return positions

print(find_all(text, 'o'))  # [4, 7, 16, 23]`,
      testCases: [
        { input: '"hello".find("l")', expected: '2' },
        { input: '"hello".count("l")', expected: '2' },
        { input: '"test.py".endswith(".py")', expected: 'True' }
      ],
      hints: [
        'find() returns -1 if not found (safe)',
        'index() raises ValueError if not found',
        'Use "in" for simple existence check',
        'startswith/endswith accept tuple of options'
      ],
      solution: `def search_methods():
    text = "python programming in python"

    # find() - safe, returns -1 if not found
    first_python = text.find('python')       # 0
    second_python = text.find('python', 1)   # 22
    not_found = text.find('java')            # -1

    # index() - raises ValueError if not found
    world_pos = text.index('programming')    # 7
    # error_pos = text.index('java')         # ValueError!

    # count() - count occurrences
    python_count = text.count('python')      # 2
    n_count = text.count('n')                # 4

    # Safe index pattern
    substring = 'python'
    pos = text.index(substring) if substring in text else -1

    # startswith() / endswith()
    filename = "script.py"
    is_python = filename.endswith('.py')     # True
    is_test = filename.startswith('test_')   # False

    # Multiple extensions
    image_file = "photo.jpg"
    is_image = image_file.endswith(('.jpg', '.png', '.gif'))  # True

    # Find all occurrences
    def find_all_indices(string, substring):
        indices = []
        index = 0
        while index < len(string):
            index = string.find(substring, index)
            if index == -1:
                break
            indices.append(index)
            index += len(substring)  # Move past this occurrence
        return indices

    all_python = find_all_indices(text, 'python')
    # [0, 22]

    # Case-insensitive search
    def case_insensitive_find(string, substring):
        return string.lower().find(substring.lower())

    # Check if string contains any of multiple substrings
    def contains_any(string, substrings):
        return any(sub in string for sub in substrings)

    keywords = ['python', 'java', 'javascript']
    has_keyword = contains_any(text, keywords)  # True

    return first_python, python_count, all_python

# find() / index() - Time: O(n*m), Space: O(1)
# count() - Time: O(n*m), Space: O(1)
# where n = string length, m = substring length`,
      complexity: {
        time: 'O(n*m) where n is string length, m is substring length',
        space: 'O(1) - no extra space needed'
      }
    },
    {
      id: 4,
      title: 'Validation Methods: is* Methods',
      difficulty: 'Easy',
      description: 'Validate string content using isalpha(), isdigit(), isalnum(), isspace(), etc.',
      example: `# isalpha() - only letters
print("hello".isalpha())       # True
print("hello123".isalpha())    # False

# isdigit() - only digits
print("12345".isdigit())       # True
print("123.45".isdigit())      # False

# isalnum() - letters or digits
print("hello123".isalnum())    # True
print("hello-123".isalnum())   # False (hyphen)

# isspace() - only whitespace
print("   ".isspace())         # True
print("  a  ".isspace())       # False

# isupper() / islower()
print("HELLO".isupper())       # True
print("hello".islower())       # True
print("Hello".isupper())       # False

# isdecimal(), isnumeric()
print("123".isdecimal())       # True
print("½".isnumeric())         # True
print("½".isdecimal())         # False

# Validation examples
username = "user123"
is_valid_username = username.isalnum()  # True

# Validate password
password = "Pass123!"
has_digit = any(c.isdigit() for c in password)
has_upper = any(c.isupper() for c in password)
has_lower = any(c.islower() for c in password)
print(f"Valid password: {has_digit and has_upper and has_lower}")`,
      testCases: [
        { input: '"abc".isalpha()', expected: 'True' },
        { input: '"123".isdigit()', expected: 'True' },
        { input: '"abc123".isalnum()', expected: 'True' }
      ],
      hints: [
        'isalpha() checks for letters only (a-z, A-Z)',
        'isdigit() checks for numeric digits (0-9)',
        'isalnum() allows letters OR digits',
        'All return False for empty string'
      ],
      solution: `def validation_methods():
    # isalpha() - alphabetic characters only
    alpha1 = "hello".isalpha()          # True
    alpha2 = "hello world".isalpha()    # False (space)
    alpha3 = "hello123".isalpha()       # False (digits)

    # isdigit() - numeric digits only
    digit1 = "12345".isdigit()          # True
    digit2 = "123.45".isdigit()         # False (period)
    digit3 = "-123".isdigit()           # False (minus)

    # isalnum() - alphanumeric (letters or digits)
    alnum1 = "hello123".isalnum()       # True
    alnum2 = "hello_123".isalnum()      # False (underscore)

    # isspace() - whitespace only
    space1 = "   ".isspace()            # True
    space2 = " \\t\\n ".isspace()        # True
    space3 = " a ".isspace()            # False

    # isupper() / islower()
    upper1 = "HELLO".isupper()          # True
    upper2 = "HELLO123".isupper()       # True (digits ignored)
    lower1 = "hello".islower()          # True

    # Validate username (only letters, digits, underscore)
    def is_valid_username(username):
        if not username:
            return False
        # Allow alphanumeric and underscore
        return all(c.isalnum() or c == '_' for c in username)

    # Validate email format (basic)
    def is_basic_email(email):
        if '@' not in email:
            return False
        parts = email.split('@')
        if len(parts) != 2:
            return False
        local, domain = parts
        return len(local) > 0 and len(domain) > 0 and '.' in domain

    # Validate phone number (digits only)
    def is_phone_number(phone):
        # Remove common separators
        cleaned = phone.replace('-', '').replace(' ', '').replace('(', '').replace(')', '')
        return cleaned.isdigit() and len(cleaned) >= 10

    # Check if string is numeric (including decimals)
    def is_numeric(s):
        try:
            float(s)
            return True
        except ValueError:
            return False

    # Validate password strength
    def validate_password(password):
        if len(password) < 8:
            return False, "Too short"
        has_upper = any(c.isupper() for c in password)
        has_lower = any(c.islower() for c in password)
        has_digit = any(c.isdigit() for c in password)
        has_special = any(not c.isalnum() for c in password)

        if not (has_upper and has_lower and has_digit and has_special):
            return False, "Missing required character types"
        return True, "Valid"

    # Test validations
    print(is_valid_username("user_123"))      # True
    print(is_valid_username("user-123"))      # False
    print(is_phone_number("123-456-7890"))    # True
    print(validate_password("Pass123!"))      # (True, 'Valid')

    return alpha1, digit1, alnum1

# Time: O(n) for each method - must check each character
# Space: O(1) - no extra space`,
      complexity: {
        time: 'O(n) where n is string length',
        space: 'O(1) - constant space'
      }
    },
    {
      id: 5,
      title: 'split() and join() Methods',
      difficulty: 'Medium',
      description: 'Split strings into lists and join lists into strings using split() and join().',
      example: `# split() - string to list
text = "hello world python"
words = text.split()  # Default: split on whitespace
print(words)  # ['hello', 'world', 'python']

# split() with delimiter
csv = "John,Doe,30,Engineer"
fields = csv.split(',')
print(fields)  # ['John', 'Doe', '30', 'Engineer']

# split() with maxsplit
text2 = "a:b:c:d:e"
parts = text2.split(':', 2)  # Split only first 2
print(parts)  # ['a', 'b', 'c:d:e']

# splitlines() - split on newlines
multiline = "line1\\nline2\\nline3"
lines = multiline.splitlines()
print(lines)  # ['line1', 'line2', 'line3']

# join() - list to string
words = ['hello', 'world', 'python']
sentence = ' '.join(words)
print(sentence)  # "hello world python"

# join() with different separators
csv_line = ','.join(['John', 'Doe', '30'])
print(csv_line)  # "John,Doe,30"

path = '/'.join(['usr', 'local', 'bin'])
print(path)  # "usr/local/bin"

# Common pattern: clean and reconstruct
text3 = "  hello    world   "
cleaned = ' '.join(text3.split())
print(cleaned)  # "hello world"`,
      testCases: [
        { input: '"a b c".split()', expected: "['a', 'b', 'c']" },
        { input: '" ".join(["a","b"])', expected: '"a b"' },
        { input: '"a,b,c".split(",")', expected: "['a', 'b', 'c']" }
      ],
      hints: [
        'split() with no args splits on any whitespace',
        'split(delim) splits on specific delimiter',
        'join() is called on the separator string',
        'join() only works on list of strings'
      ],
      solution: `def split_join_methods():
    # Basic split - whitespace
    text = "hello world python programming"
    words = text.split()
    # ['hello', 'world', 'python', 'programming']

    # Split with delimiter
    csv = "Alice,30,Engineer,NYC"
    fields = csv.split(',')
    # ['Alice', '30', 'Engineer', 'NYC']

    # Split with maxsplit
    url = "https://www.example.com/path/to/page"
    protocol, rest = url.split('://', 1)
    # protocol = 'https', rest = 'www.example.com/path/to/page'

    # splitlines() - split on line breaks
    text_block = """Line 1
Line 2
Line 3"""
    lines = text_block.splitlines()
    # ['Line 1', 'Line 2', 'Line 3']

    # rsplit() - split from right
    path = "/usr/local/bin/python"
    parts = path.rsplit('/', 1)  # Split from right, once
    # ['/usr/local/bin', 'python']

    # join() - combine list into string
    words = ['Python', 'is', 'awesome']
    sentence = ' '.join(words)
    # 'Python is awesome'

    # join() with different separators
    csv_row = ','.join(['John', 'Doe', '30', 'Engineer'])
    # 'John,Doe,30,Engineer'

    file_path = '/'.join(['home', 'user', 'documents', 'file.txt'])
    # 'home/user/documents/file.txt'

    # Common pattern: normalize whitespace
    messy = "  hello    world   python  "
    normalized = ' '.join(messy.split())
    # 'hello world python'

    # Parse CSV line
    def parse_csv_line(line):
        return [field.strip() for field in line.split(',')]

    # Create CSV line
    def create_csv_line(fields):
        return ','.join(str(f) for f in fields)

    # Split into sentences (basic)
    paragraph = "Hello world. How are you? I am fine."
    sentences = paragraph.split('. ')
    # ['Hello world', 'How are you? I am fine.']

    # Better sentence split
    import re
    sentences2 = [s.strip() for s in re.split('[.!?]', paragraph) if s.strip()]
    # ['Hello world', 'How are you', 'I am fine']

    # Reverse words in string
    text2 = "hello world python"
    reversed_words = ' '.join(text2.split()[::-1])
    # 'python world hello'

    # Convert camelCase to snake_case
    def camel_to_snake(name):
        import re
        return re.sub('([A-Z])', r'_\\1', name).lower().lstrip('_')

    return words, normalized, reversed_words

# split() - Time: O(n), Space: O(n)
# join() - Time: O(n), Space: O(n)`,
      complexity: {
        time: 'O(n) where n is string length',
        space: 'O(n) for creating list/string'
      }
    },
    {
      id: 6,
      title: 'replace() and translate() Methods',
      difficulty: 'Medium',
      description: 'Replace and transform characters using replace(), translate(), and maketrans().',
      example: `# replace() - replace substring
text = "hello world, hello python"
new_text = text.replace('hello', 'hi')
print(new_text)  # "hi world, hi python"

# replace() with count (max replacements)
text2 = "aaa bbb aaa ccc aaa"
result = text2.replace('aaa', 'xxx', 2)  # Replace first 2
print(result)  # "xxx bbb xxx ccc aaa"

# Chain multiple replacements
text3 = "hello world"
result = text3.replace('hello', 'hi').replace('world', 'python')
print(result)  # "hi python"

# translate() - character-level replacement
# More efficient than multiple replace() calls
translation_table = str.maketrans('aeiou', '12345')
text4 = "hello world"
translated = text4.translate(translation_table)
print(translated)  # "h2ll4 w4rld"

# Remove characters with translate
remove_vowels = str.maketrans('', '', 'aeiou')
text5 = "hello world"
no_vowels = text5.translate(remove_vowels)
print(no_vowels)  # "hll wrld"

# Remove punctuation
import string
remove_punct = str.maketrans('', '', string.punctuation)
text6 = "Hello, world! How are you?"
clean = text6.translate(remove_punct)
print(clean)  # "Hello world How are you"`,
      testCases: [
        { input: '"hello".replace("l", "L")', expected: '"heLLo"' },
        { input: '"test".replace("t", "T", 1)', expected: '"Test"' }
      ],
      hints: [
        'replace() creates new string (immutable)',
        'replace(old, new, count) limits replacements',
        'translate() is faster for multiple char replacements',
        'maketrans() creates translation table'
      ],
      solution: `def replace_translate_methods():
    # Basic replace
    text = "Python is great. Python is powerful."
    updated = text.replace('Python', 'JavaScript')
    # "JavaScript is great. JavaScript is powerful."

    # Replace with count limit
    text2 = "one one one two two"
    limited = text2.replace('one', 'ONE', 2)
    # "ONE ONE one two two"

    # Remove substring (replace with empty)
    text3 = "hello-world-python"
    no_hyphens = text3.replace('-', '')
    # "helloworldpython"

    # Multiple replacements (chained)
    text4 = "I love cats and dogs"
    swapped = text4.replace('cats', 'TEMP').replace('dogs', 'cats').replace('TEMP', 'dogs')
    # "I love dogs and cats"

    # Better: use dictionary for multiple replacements
    def multiple_replace(text, replacements):
        for old, new in replacements.items():
            text = text.replace(old, new)
        return text

    replacements = {'hello': 'hi', 'world': 'python', 'foo': 'bar'}
    result = multiple_replace("hello world foo", replacements)
    # "hi python bar"

    # translate() - character mapping
    # Map vowels to numbers
    trans_table = str.maketrans('aeiouAEIOU', '1234512345')
    text5 = "Hello World"
    encoded = text5.translate(trans_table)
    # "H2ll4 W4rld"

    # Remove vowels
    remove_vowels = str.maketrans('', '', 'aeiouAEIOU')
    text6 = "Remove all vowels from this"
    no_vowels = text6.translate(remove_vowels)
    # "Rmv ll vwls frm ths"

    # Remove punctuation
    import string
    remove_punct = str.maketrans('', '', string.punctuation)
    text7 = "Hello, world! How are you?"
    clean_text = text7.translate(remove_punct)
    # "Hello world How are you"

    # ROT13 encoding (simple cipher)
    def rot13(text):
        from_chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        to_chars = 'nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM'
        trans = str.maketrans(from_chars, to_chars)
        return text.translate(trans)

    encrypted = rot13("hello")  # "uryyb"
    decrypted = rot13(encrypted)  # "hello"

    # Remove digits
    remove_digits = str.maketrans('', '', '0123456789')
    text8 = "Order 123 items"
    no_digits = text8.translate(remove_digits)
    # "Order  items"

    # Normalize whitespace (replace tabs/newlines with space)
    def normalize_whitespace(text):
        trans = str.maketrans('\\t\\n\\r', '   ')
        return ' '.join(text.translate(trans).split())

    return updated, no_vowels, clean_text

# replace() - Time: O(n*m), Space: O(n)
# translate() - Time: O(n), Space: O(n)
# translate() is faster for multiple character replacements`,
      complexity: {
        time: 'replace(): O(n*m), translate(): O(n)',
        space: 'O(n) for new string'
      }
    },
    {
      id: 7,
      title: 'String Formatting: format(), f-strings',
      difficulty: 'Medium',
      description: 'Format strings using format(), f-strings, and % formatting.',
      example: `# f-strings (Python 3.6+) - RECOMMENDED
name = "Alice"
age = 30
print(f"My name is {name} and I am {age} years old")
# "My name is Alice and I am 30 years old"

# f-strings with expressions
x = 10
y = 20
print(f"The sum of {x} and {y} is {x + y}")
# "The sum of 10 and 20 is 30"

# format() method
text = "My name is {} and I am {} years old".format(name, age)
print(text)

# format() with positional arguments
text2 = "My name is {0} and I am {1} years old. {0} is my name.".format(name, age)

# format() with named arguments
text3 = "My name is {name} and I am {age} years old".format(name="Bob", age=25)

# Number formatting
pi = 3.14159265359
print(f"Pi: {pi:.2f}")        # "Pi: 3.14" (2 decimal places)
print(f"Pi: {pi:.4f}")        # "Pi: 3.1416"

# Alignment and padding
print(f"{'left':<10}|")       # "left      |"
print(f"{'right':>10}|")      # "     right|"
print(f"{'center':^10}|")     # "  center  |"

# Zero padding
num = 42
print(f"{num:05d}")           # "00042"`,
      testCases: [
        { input: 'f"{10 + 20}"', expected: '"30"' },
        { input: 'f"{3.14159:.2f}"', expected: '"3.14"' },
        { input: '"{:.3f}".format(2.71828)', expected: '"2.718"' }
      ],
      hints: [
        'f-strings are fastest and most readable',
        'Use :.2f for 2 decimal places',
        'Use :05d for zero-padding',
        '<, >, ^ for left, right, center alignment'
      ],
      solution: `def formatting_examples():
    # f-strings (modern, recommended)
    name = "Alice"
    age = 30
    city = "NYC"

    # Basic f-string
    message = f"Name: {name}, Age: {age}, City: {city}"
    # "Name: Alice, Age: 30, City: NYC"

    # f-string with expressions
    x, y = 10, 20
    result = f"{x} + {y} = {x + y}"
    # "10 + 20 = 30"

    # Number formatting
    pi = 3.14159265359
    formatted_pi = f"Pi to 2 decimals: {pi:.2f}"
    # "Pi to 2 decimals: 3.14"

    # Percentage
    ratio = 0.85
    percentage = f"Success rate: {ratio:.1%}"
    # "Success rate: 85.0%"

    # Large numbers with separators
    big_num = 1000000
    formatted_num = f"Population: {big_num:,}"
    # "Population: 1,000,000"

    # Alignment and padding
    items = ["Apple", "Banana", "Cherry"]
    for item in items:
        print(f"{item:<10} | {len(item):>3}")
    # "Apple      |   5"
    # "Banana     |   6"
    # "Cherry     |   7"

    # Zero padding
    order_num = 42
    padded = f"Order #{order_num:05d}"
    # "Order #00042"

    # format() method (older but still useful)
    template = "Hello, {name}! You are {age} years old."
    text = template.format(name="Bob", age=25)
    # "Hello, Bob! You are 25 years old."

    # format() with positional args
    text2 = "{0} {1} {0}".format("hello", "world")
    # "hello world hello"

    # % formatting (old style, avoid in new code)
    old_style = "Name: %s, Age: %d" % ("Charlie", 35)
    # "Name: Charlie, Age: 35"

    # Date formatting
    from datetime import datetime
    now = datetime.now()
    date_str = f"Date: {now:%Y-%m-%d %H:%M:%S}"
    # "Date: 2024-01-15 14:30:45"

    # Debugging with f-strings (Python 3.8+)
    value = 42
    debug = f"{value=}"  # "value=42"

    # Multiline f-strings
    report = f"""
    Name: {name}
    Age: {age}
    City: {city}
    """

    # Custom format for classes
    class Person:
        def __init__(self, name, age):
            self.name = name
            self.age = age

        def __format__(self, format_spec):
            if format_spec == 'full':
                return f"{self.name} ({self.age} years old)"
            return f"{self.name}"

    person = Person("David", 40)
    print(f"{person:full}")  # "David (40 years old)"

    return message, formatted_pi, padded

# Time: O(n) where n is total string length
# Space: O(n) for result string`,
      complexity: {
        time: 'O(n) where n is result string length',
        space: 'O(n) for formatted string'
      }
    },
    {
      id: 8,
      title: 'partition() and rpartition() Methods',
      difficulty: 'Medium',
      description: 'Split strings into 3-tuples using partition() and rpartition().',
      example: `# partition() - split into 3 parts (before, sep, after)
url = "https://example.com/path"
protocol, sep, rest = url.partition('://')
print(protocol)  # "https"
print(sep)       # "://"
print(rest)      # "example.com/path"

# rpartition() - same but from right
path = "/usr/local/bin/python"
directory, sep, filename = path.rpartition('/')
print(directory)  # "/usr/local/bin"
print(sep)        # "/"
print(filename)   # "python"

# If separator not found, partition returns (string, '', '')
text = "hello world"
before, sep, after = text.partition('xyz')
print(before)  # "hello world"
print(sep)     # ""
print(after)   # ""

# Common use: parse key-value pairs
config_line = "name=John Doe"
key, sep, value = config_line.partition('=')
print(key)    # "name"
print(value)  # "John Doe"

# Parse email
email = "user@example.com"
local, sep, domain = email.partition('@')
print(local)   # "user"
print(domain)  # "example.com"`,
      testCases: [
        { input: '"a:b:c".partition(":")', expected: '("a", ":", "b:c")' },
        { input: '"a:b:c".rpartition(":")', expected: '("a:b", ":", "c")' },
        { input: '"abc".partition("x")', expected: '("abc", "", "")' }
      ],
      hints: [
        'partition() splits on FIRST occurrence',
        'rpartition() splits on LAST occurrence',
        'Always returns 3-tuple',
        'If separator not found: (string, "", "")'
      ],
      solution: `def partition_methods():
    # partition() - split on first occurrence
    url = "https://www.example.com/path/to/page"

    # Split protocol
    protocol, sep, rest = url.partition('://')
    # protocol='https', sep='://', rest='www.example.com/path/to/page'

    # rpartition() - split on last occurrence
    path = "/home/user/documents/file.txt"
    directory, sep, filename = path.rpartition('/')
    # directory='/home/user/documents', sep='/', filename='file.txt'

    # Get file extension
    filename2 = "document.backup.txt"
    name, sep, ext = filename2.rpartition('.')
    # name='document.backup', sep='.', ext='txt'

    # Parse key-value pairs
    config = "database=postgresql"
    key, sep, value = config.partition('=')
    # key='database', value='postgresql'

    # Parse email
    email = "john.doe@company.com"
    local_part, sep, domain = email.partition('@')
    # local_part='john.doe', domain='company.com'

    # If separator not found
    text = "no separator here"
    before, sep, after = text.partition('|')
    # before='no separator here', sep='', after=''

    # Partition vs split comparison
    text2 = "a:b:c:d"

    # partition - first occurrence only
    p1, sep, p2 = text2.partition(':')
    # p1='a', sep=':', p2='b:c:d'

    # split - all occurrences
    parts = text2.split(':')
    # ['a', 'b', 'c', 'd']

    # Practical example: parse HTTP headers
    header = "Content-Type: application/json"
    header_name, sep, header_value = header.partition(':')
    header_name = header_name.strip()
    header_value = header_value.strip()
    # header_name='Content-Type', header_value='application/json'

    # Get domain from URL
    url2 = "https://api.example.com/v1/users"
    _, _, after_protocol = url2.partition('://')
    domain, _, path = after_protocol.partition('/')
    # domain='api.example.com', path='v1/users'

    # Parse log timestamp
    log_line = "[2024-01-15 14:30:45] INFO: User logged in"
    timestamp_part, sep, message = log_line.partition(']')
    timestamp = timestamp_part.lstrip('[')
    # timestamp='2024-01-15 14:30:45'

    # Extract username and domain from email
    def parse_email(email):
        local, at, domain = email.partition('@')
        if not at:
            return None, None  # Invalid email
        return local, domain

    return protocol, directory, key

# Time: O(n) - must scan string to find separator
# Space: O(n) - creates 3 new strings`,
      complexity: {
        time: 'O(n) where n is string length',
        space: 'O(n) for creating 3 string parts'
      }
    },
    {
      id: 9,
      title: 'zfill() and String Alignment',
      difficulty: 'Easy',
      description: 'Pad strings with zeros and align text using zfill(), center(), ljust(), rjust().',
      example: `# zfill() - pad with zeros on left
num = "42"
print(num.zfill(5))           # "00042"

# Works with negative numbers
num2 = "-42"
print(num2.zfill(5))          # "-0042"

# ljust() - left justify (pad right)
text = "hello"
print(text.ljust(10))         # "hello     "
print(text.ljust(10, '*'))    # "hello*****"

# rjust() - right justify (pad left)
print(text.rjust(10))         # "     hello"
print(text.rjust(10, '*'))    # "*****hello"

# center() - center text
print(text.center(10))        # "  hello   "
print(text.center(11, '-'))   # "---hello---"

# Format table
names = ["Alice", "Bob", "Charlie"]
ages = [30, 25, 35]
print("Name".ljust(10) + "Age".rjust(5))
for name, age in zip(names, ages):
    print(name.ljust(10) + str(age).rjust(5))
# Name           Age
# Alice           30
# Bob             25
# Charlie         35

# Zero-pad invoice numbers
invoice = "1234"
padded = invoice.zfill(8)
print(padded)  # "00001234"`,
      testCases: [
        { input: '"42".zfill(5)', expected: '"00042"' },
        { input: '"hi".ljust(5)', expected: '"hi   "' },
        { input: '"hi".center(5)', expected: '" hi  "' }
      ],
      hints: [
        'zfill() is specifically for numbers',
        'ljust() pads on right (text stays left)',
        'rjust() pads on left (text stays right)',
        'All accept optional fill character'
      ],
      solution: `def padding_alignment():
    # zfill() - zero padding
    numbers = ["1", "42", "123"]
    padded_numbers = [n.zfill(5) for n in numbers]
    # ['00001', '00042', '00123']

    # zfill with negative numbers
    neg = "-42"
    padded_neg = neg.zfill(6)
    # '-00042'

    # ljust() - left justify (pad on right)
    names = ["Alice", "Bob", "Charlotte"]
    left_aligned = [name.ljust(12) for name in names]
    # ['Alice       ', 'Bob         ', 'Charlotte   ']

    # rjust() - right justify (pad on left)
    prices = ["10.99", "5.50", "123.45"]
    right_aligned = [price.rjust(8) for price in prices]
    # ['   10.99', '    5.50', '  123.45']

    # center() - center text
    title = "Report"
    centered = title.center(20, '=')
    # '=======Report======='

    # Custom padding character
    text = "SALE"
    banner = text.center(20, '*')
    # '********SALE********'

    # Create formatted table
    def print_table(headers, rows):
        # Calculate column widths
        col_widths = [len(h) for h in headers]
        for row in rows:
            for i, cell in enumerate(row):
                col_widths[i] = max(col_widths[i], len(str(cell)))

        # Print header
        header_row = ' | '.join(h.ljust(col_widths[i]) for i, h in enumerate(headers))
        print(header_row)
        print('-' * len(header_row))

        # Print rows
        for row in rows:
            row_str = ' | '.join(str(cell).ljust(col_widths[i]) for i, cell in enumerate(row))
            print(row_str)

    headers = ['Name', 'Age', 'City']
    data = [
        ['Alice', 30, 'NYC'],
        ['Bob', 25, 'LA'],
        ['Charlie', 35, 'Chicago']
    ]
    print_table(headers, data)
    # Name    | Age | City
    # -------------------------
    # Alice   | 30  | NYC
    # Bob     | 25  | LA
    # Charlie | 35  | Chicago

    # Format invoice number
    invoice_num = 1234
    formatted_invoice = f"INV-{str(invoice_num).zfill(6)}"
    # 'INV-001234'

    # Right-align numbers for readability
    values = [10, 255, 3000, 42]
    max_width = max(len(str(v)) for v in values)
    for val in values:
        print(str(val).rjust(max_width))
    #   10
    #  255
    # 3000
    #   42

    # Create progress bar
    def progress_bar(percent, width=50):
        filled = int(width * percent / 100)
        bar = '█' * filled + '░' * (width - filled)
        return f"|{bar}| {str(percent).rjust(3)}%"

    print(progress_bar(75, 30))
    # |██████████████████████░░░░░░░░|  75%

    return padded_numbers, centered, formatted_invoice

# Time: O(n) where n is final string length
# Space: O(n) for padded string`,
      complexity: {
        time: 'O(n) where n is padded length',
        space: 'O(n) for new string'
      }
    },
    {
      id: 10,
      title: 'expandtabs() and String Encoding',
      difficulty: 'Medium',
      description: 'Handle tabs and encoding with expandtabs(), encode(), decode().',
      example: `# expandtabs() - convert tabs to spaces
text = "Name\\tAge\\tCity"
expanded = text.expandtabs(8)  # 8 spaces per tab
print(expanded)  # "Name    Age     City"

# Different tab sizes
text2 = "1\\t12\\t123"
print(text2.expandtabs(4))   # "1   12  123"
print(text2.expandtabs(8))   # "1       12      123"

# encode() - string to bytes
text = "hello"
encoded = text.encode('utf-8')
print(encoded)  # b'hello'
print(type(encoded))  # <class 'bytes'>

# Different encodings
text2 = "hello world"
utf8 = text2.encode('utf-8')
ascii_bytes = text2.encode('ascii')

# Unicode characters
text3 = "Hello 世界"
utf8_bytes = text3.encode('utf-8')
print(utf8_bytes)  # b'Hello \\xe4\\xb8\\x96\\xe7\\x95\\x8c'

# decode() - bytes to string
bytes_data = b'hello world'
decoded = bytes_data.decode('utf-8')
print(decoded)  # "hello world"

# Handle encoding errors
def safe_encode(text, encoding='utf-8'):
    try:
        return text.encode(encoding)
    except UnicodeEncodeError:
        return text.encode(encoding, errors='ignore')`,
      testCases: [
        { input: '"a\\tb".expandtabs(4)', expected: '"a   b"' },
        { input: '"hi".encode("utf-8")', expected: 'b\'hi\'' },
        { input: 'b"hi".decode("utf-8")', expected: '"hi"' }
      ],
      hints: [
        'expandtabs() converts \\t to spaces',
        'encode() converts string to bytes',
        'decode() converts bytes to string',
        'Always specify encoding (utf-8 is common)'
      ],
      solution: `def expandtabs_encoding():
    # expandtabs() - convert tabs to spaces
    tsv_line = "Name\\tAge\\tCity\\tCountry"

    # Default tab size (8 spaces)
    default_tabs = tsv_line.expandtabs()
    # "Name    Age     City    Country"

    # Custom tab size
    expanded_4 = tsv_line.expandtabs(4)
    # "Name    Age City    Country"

    # Align columns with tabs
    data = "ID\\tName\\tScore"
    rows = [
        "1\\tAlice\\t95",
        "2\\tBob\\t87",
        "3\\tCharlie\\t92"
    ]

    print(data.expandtabs(15))
    for row in rows:
        print(row.expandtabs(15))
    # ID             Name           Score
    # 1              Alice          95
    # 2              Bob            87
    # 3              Charlie        92

    # encode() - string to bytes
    text = "Hello World"

    # UTF-8 encoding (most common)
    utf8_bytes = text.encode('utf-8')
    # b'Hello World'

    # ASCII encoding
    ascii_bytes = text.encode('ascii')
    # b'Hello World'

    # Unicode text
    unicode_text = "Hello 世界 🌍"
    unicode_bytes = unicode_text.encode('utf-8')
    # b'Hello \\xe4\\xb8\\x96\\xe7\\x95\\x8c \\xf0\\x9f\\x8c\\x8d'

    # decode() - bytes to string
    bytes_data = b'Python Programming'
    decoded_text = bytes_data.decode('utf-8')
    # "Python Programming"

    # Handle encoding errors
    # errors='ignore' - skip unencodable characters
    # errors='replace' - replace with ?
    # errors='xmlcharrefreplace' - use XML character references

    problematic = "Special char: \\x00"
    safe_ascii = problematic.encode('ascii', errors='ignore')
    # b'Special char: '

    # Base64 encoding (for binary data as text)
    import base64
    text_to_encode = "Secret Message"
    b64_bytes = base64.b64encode(text_to_encode.encode('utf-8'))
    b64_string = b64_bytes.decode('ascii')
    # 'U2VjcmV0IE1lc3NhZ2U='

    # Decode base64
    decoded_bytes = base64.b64decode(b64_string)
    original = decoded_bytes.decode('utf-8')
    # "Secret Message"

    # Check if string is ASCII
    def is_ascii(s):
        try:
            s.encode('ascii')
            return True
        except UnicodeEncodeError:
            return False

    print(is_ascii("hello"))      # True
    print(is_ascii("hello 世界"))  # False

    # Get byte length
    def byte_length(s, encoding='utf-8'):
        return len(s.encode(encoding))

    print(byte_length("hello"))    # 5
    print(byte_length("hello 世界")) # 12 (UTF-8)

    # Convert between encodings
    def convert_encoding(text, from_enc, to_enc):
        return text.encode(from_enc).decode(to_enc)

    return expanded_4, utf8_bytes, decoded_text

# expandtabs() - Time: O(n), Space: O(n)
# encode() - Time: O(n), Space: O(n)
# decode() - Time: O(n), Space: O(n)`,
      complexity: {
        time: 'O(n) where n is string/bytes length',
        space: 'O(n) for result'
      }
    }
  ]

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#22c55e'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  if (selectedProblem) {
    const problem = problems.find(p => p.id === selectedProblem)

    return (
      <div style={{
        padding: '2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
        minHeight: '100vh'
      }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={() => {
              setSelectedProblem(null)
              setShowSolution(false)
            }}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            ← Back to Python
          </button>
          <button
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            ← Back to Python
          </button>
        </div>

        <div style={{
          background: 'linear-gradient(to bottom right, #1f2937, #111827)',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          marginBottom: '2rem',
          border: '2px solid #3b82f6'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: '0 0 1rem 0'
              }}>
                {problem.title}
              </h2>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: getDifficultyColor(problem.difficulty),
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  borderRadius: '6px'
                }}>
                  {problem.difficulty}
                </span>
                <div style={{ marginLeft: 'auto' }}>
                  <CompletionCheckbox problemId={`python-string-methods-${problem.id}`} />
                </div>
              </div>
            </div>
          </div>

          <p style={{ fontSize: '1.1rem', color: '#d1d5db', lineHeight: '1.8', marginBottom: '2rem' }}>
            {problem.description}
          </p>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#93c5fd', marginBottom: '1rem' }}>
              Example:
            </h3>
            {parseCodeSections(problem.example).map((section, idx) => (
              <div key={section.id} style={{ marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '100%',
                    background: '#2563eb',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '0.5rem',
                    textAlign: 'left',
                    fontWeight: '500',
                    fontSize: '1rem'
                  }}
                >
                  Code Block {idx + 1}
                </div>
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
            ))}
          </div>

          {problem.testCases && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#93c5fd', marginBottom: '1rem' }}>
                Test Cases:
              </h3>
              {problem.testCases.map((tc, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#1e293b',
                  padding: '1rem',
                  borderRadius: '6px',
                  marginBottom: '0.75rem',
                  border: '1px solid #3b82f6'
                }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#93c5fd' }}>Input:</strong>
                    <code style={{ marginLeft: '0.5rem', color: '#22d3ee' }}>{tc.input}</code>
                  </div>
                  <div>
                    <strong style={{ color: '#93c5fd' }}>Expected:</strong>
                    <code style={{ marginLeft: '0.5rem', color: '#22d3ee' }}>{tc.expected}</code>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#93c5fd', marginBottom: '1rem' }}>
              Hints:
            </h3>
            <ul style={{ paddingLeft: '1.5rem', color: '#d1d5db', lineHeight: '1.8' }}>
              {problem.hints.map((hint, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>{hint}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setShowSolution(!showSolution)}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.1rem',
              backgroundColor: showSolution ? '#ef4444' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              marginBottom: '2rem'
            }}
          >
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>

          {showSolution && (
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', color: '#93c5fd', marginBottom: '1rem' }}>
                Solution:
              </h3>
              {parseCodeSections(problem.solution).map((section, idx) => (
                <div key={section.id} style={{ marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '100%',
                      background: '#2563eb',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      marginBottom: '0.5rem',
                      textAlign: 'left',
                      fontWeight: '500',
                      fontSize: '1rem'
                    }}
                  >
                    Code Block {idx + 1}
                  </div>
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
              ))}

              <div style={{
                backgroundColor: '#1e293b',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '2px solid #3b82f6'
              }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#93c5fd', marginBottom: '0.75rem' }}>
                  Complexity Analysis:
                </h4>
                <div style={{ color: '#d1d5db', lineHeight: '1.8' }}>
                  <div><strong>Time Complexity:</strong> {problem.complexity.time}</div>
                  <div><strong>Space Complexity:</strong> {problem.complexity.space}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      background: 'linear-gradient(to bottom right, #111827, #1e3a8a, #111827)',
      minHeight: '100vh'
    }}>
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
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
        >
          ← Back to Python
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0
        }}>
          📝 Python String Methods
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <p style={{
        fontSize: '1.2rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '3rem',
        lineHeight: '1.8'
      }}>
        Master Python string methods: case conversion, stripping, searching, validation, splitting, replacing, formatting, and encoding.
        Everything you need to manipulate strings effectively.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        {problems.map((problem) => (
          <div
            key={problem.id}
            onClick={() => setSelectedProblem(problem.id)}
            style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid #3b82f6',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-0.5rem)'
              e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(59, 130, 246, 0.5)'
              e.currentTarget.style.borderColor = '#60a5fa'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              e.currentTarget.style.borderColor = '#3b82f6'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#93c5fd',
                margin: 0,
                flex: 1
              }}>
                {problem.id}. {problem.title}
              </h3>
              <span style={{
                padding: '0.25rem 0.75rem',
                backgroundColor: getDifficultyColor(problem.difficulty),
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: '600',
                borderRadius: '4px',
                marginLeft: '0.5rem',
                whiteSpace: 'nowrap'
              }}>
                {problem.difficulty}
              </span>
            </div>

            <p style={{
              fontSize: '0.95rem',
              color: '#d1d5db',
              lineHeight: '1.6',
              margin: 0
            }}>
              {problem.description}
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid #3b82f6'
            }}>
              <CompletionCheckbox problemId={`python-string-methods-${problem.id}`} />
              <span style={{
                color: '#60a5fa',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>
                Learn →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PythonStringMethods
