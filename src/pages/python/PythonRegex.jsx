import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function PythonRegex({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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

  useKeyboardNavigation({
    onBack,
    onPrevious,
    onNext,
    onPreviousSubcategory,
    onNextSubcategory,
    isQuestionView: !!selectedQuestion,
    setSelectedQuestion
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
      title: 'Basic Pattern Matching',
      difficulty: 'Easy',
      description: 'Use re.search() to find if a pattern exists in a string.',
      examples: [
        { input: 'text = "Hello World", pattern = "World"', output: 'Match found at position 6' },
        { input: 'text = "Python 3.9", pattern = r"\\d+"', output: 'Match found: 3' }
      ],
      code: {
        python: {
          starterCode: `import re

def find_pattern(text, pattern):
    """
    Search for a pattern in text using re.search().

    Args:
        text: String to search in
        pattern: Regex pattern to find

    Returns:
        Match object if found, None otherwise

    Examples:
        >>> match = find_pattern("Hello World", "World")
        >>> match.group() if match else None
        'World'
        >>> match = find_pattern("Python 3.9", r"\\d+")
        >>> match.group() if match else None
        '3'
    """
    pass`,
          solution: `import re

def find_pattern(text, pattern):
    """
    Search for a pattern in text using re.search().

    re.search() scans through string looking for the first location
    where the pattern produces a match.
    """
    match = re.search(pattern, text)
    return match

# Test cases
print(find_pattern("Hello World", "World"))  # Match at index 6
print(find_pattern("Python 3.9", r"\\d+"))    # Finds '3'
print(find_pattern("No numbers", r"\\d+"))    # None`
        }
      },
      explanation: 're.search() finds the first match anywhere in the string. Use raw strings (r"") for regex patterns.',
      timeComplexity: 'O(n*m) where n is text length, m is pattern length',
      spaceComplexity: 'O(1)'
    },
    {
      id: 2,
      title: 'Find All Matches',
      difficulty: 'Easy',
      description: 'Use re.findall() to find all occurrences of a pattern in a string.',
      examples: [
        { input: 'text = "Contact: 123-456-7890 or 098-765-4321"', output: "['123-456-7890', '098-765-4321']" },
        { input: 'text = "Prices: $10.99, $25.50, $5.00"', output: "['10.99', '25.50', '5.00']" }
      ],
      code: {
        python: {
          starterCode: `import re

def find_all_numbers(text):
    """
    Find all numbers (including decimals) in the text.

    Args:
        text: String to search

    Returns:
        List of all numbers found

    Examples:
        >>> find_all_numbers("Prices: $10.99, $25.50")
        ['10.99', '25.50']
        >>> find_all_numbers("Ages: 25, 30, 45")
        ['25', '30', '45']
    """
    pass`,
          solution: `import re

def find_all_numbers(text):
    """
    Find all numbers (including decimals) in the text.

    Pattern explanation:
    \\d+ matches one or more digits
    (?:\\.\\d+)? optionally matches a decimal point and digits
    """
    # Pattern for integers and decimals
    pattern = r'\\d+(?:\\.\\d+)?'
    return re.findall(pattern, text)

# Test cases
print(find_all_numbers("Prices: $10.99, $25.50"))  # ['10.99', '25.50']
print(find_all_numbers("Ages: 25, 30, 45"))        # ['25', '30', '45']
print(find_all_numbers("PI is 3.14159"))           # ['3.14159']`
        }
      },
      explanation: 're.findall() returns a list of all non-overlapping matches. Use (?:...) for non-capturing groups.',
      timeComplexity: 'O(n*m)',
      spaceComplexity: 'O(k) where k is number of matches'
    },
    {
      id: 3,
      title: 'Email Validation',
      difficulty: 'Medium',
      description: 'Validate email addresses using regex pattern.',
      examples: [
        { input: '"user@example.com"', output: 'True' },
        { input: '"invalid.email"', output: 'False' },
        { input: '"user.name+tag@example.co.uk"', output: 'True' }
      ],
      code: {
        python: {
          starterCode: `import re

def is_valid_email(email):
    """
    Validate email address format.

    Args:
        email: String to validate

    Returns:
        True if valid email, False otherwise

    Examples:
        >>> is_valid_email("user@example.com")
        True
        >>> is_valid_email("invalid.email")
        False
        >>> is_valid_email("user.name+tag@example.co.uk")
        True
    """
    pass`,
          solution: `import re

def is_valid_email(email):
    """
    Validate email address format.

    Pattern breakdown:
    ^[a-zA-Z0-9._%+-]+ - username part (letters, numbers, special chars)
    @ - required @ symbol
    [a-zA-Z0-9.-]+ - domain name
    \\. - required dot
    [a-zA-Z]{2,}$ - TLD (at least 2 letters)
    """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

# Test cases
print(is_valid_email("user@example.com"))           # True
print(is_valid_email("invalid.email"))              # False
print(is_valid_email("user.name+tag@example.co.uk"))  # True
print(is_valid_email("@example.com"))               # False`
        }
      },
      explanation: 'Use re.match() to match from start of string. ^ and $ anchor to start/end.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 4,
      title: 'Phone Number Extraction',
      difficulty: 'Medium',
      description: 'Extract phone numbers in various formats from text.',
      examples: [
        { input: '"Call 123-456-7890 or (098) 765-4321"', output: "['123-456-7890', '(098) 765-4321']" },
        { input: '"Phone: 555.123.4567"', output: "['555.123.4567']" }
      ],
      code: {
        python: {
          starterCode: `import re

def extract_phone_numbers(text):
    """
    Extract phone numbers in formats: 123-456-7890, (123) 456-7890, 123.456.7890

    Args:
        text: String containing phone numbers

    Returns:
        List of phone numbers found

    Examples:
        >>> extract_phone_numbers("Call 123-456-7890")
        ['123-456-7890']
        >>> extract_phone_numbers("Phone: (098) 765-4321")
        ['(098) 765-4321']
    """
    pass`,
          solution: `import re

def extract_phone_numbers(text):
    """
    Extract phone numbers in multiple formats.

    Pattern explanation:
    (?:\\(\\d{3}\\)|\\d{3}) - area code with or without parentheses
    [-.]? - optional separator
    \\d{3}[-.]?\\d{4} - remaining digits with optional separators
    """
    pattern = r'(?:\\(\\d{3}\\)|\\d{3})[-.]?\\d{3}[-.]?\\d{4}'
    return re.findall(pattern, text)

# Test cases
print(extract_phone_numbers("Call 123-456-7890"))         # ['123-456-7890']
print(extract_phone_numbers("Phone: (098) 765-4321"))     # ['(098) 765-4321']
print(extract_phone_numbers("Contact: 555.123.4567"))     # ['555.123.4567']
print(extract_phone_numbers("Multiple: 111-222-3333 and 444-555-6666"))  # Both`
        }
      },
      explanation: 'Use (?:...) for non-capturing groups. [-.]? makes separator optional.',
      timeComplexity: 'O(n*m)',
      spaceComplexity: 'O(k) for k matches'
    },
    {
      id: 5,
      title: 'String Substitution',
      difficulty: 'Easy',
      description: 'Use re.sub() to replace patterns in a string.',
      examples: [
        { input: '"Hello World", replace spaces with underscores', output: '"Hello_World"' },
        { input: '"Price: $100", remove dollar signs', output: '"Price: 100"' }
      ],
      code: {
        python: {
          starterCode: `import re

def replace_pattern(text, pattern, replacement):
    """
    Replace all occurrences of pattern with replacement.

    Args:
        text: String to modify
        pattern: Regex pattern to find
        replacement: String to replace with

    Returns:
        Modified string

    Examples:
        >>> replace_pattern("Hello World", r"\\s", "_")
        'Hello_World'
        >>> replace_pattern("Price: $100", r"\\$", "")
        'Price: 100'
    """
    pass`,
          solution: `import re

def replace_pattern(text, pattern, replacement):
    """
    Replace all occurrences of pattern with replacement.

    re.sub() replaces all non-overlapping occurrences.
    """
    return re.sub(pattern, replacement, text)

# Test cases
print(replace_pattern("Hello World", r"\\s", "_"))    # Hello_World
print(replace_pattern("Price: $100", r"\\$", ""))    # Price: 100
print(replace_pattern("a1b2c3", r"\\d", "X"))        # aXbXcX
print(replace_pattern("test@email.com", r"\\w+@", "user@"))  # user@email.com`
        }
      },
      explanation: 're.sub(pattern, replacement, string) replaces all matches. Use r"" for raw strings.',
      timeComplexity: 'O(n*m)',
      spaceComplexity: 'O(n) for result string'
    },
    {
      id: 6,
      title: 'Capture Groups',
      difficulty: 'Medium',
      description: 'Use capture groups to extract specific parts of a match.',
      examples: [
        { input: '"John Doe, Age: 30"', output: "name='John Doe', age='30'" },
        { input: '"2024-10-30"', output: "year='2024', month='10', day='30'" }
      ],
      code: {
        python: {
          starterCode: `import re

def extract_date_parts(date_string):
    """
    Extract year, month, day from date string in format YYYY-MM-DD.

    Args:
        date_string: Date in YYYY-MM-DD format

    Returns:
        Tuple of (year, month, day) or None if invalid

    Examples:
        >>> extract_date_parts("2024-10-30")
        ('2024', '10', '30')
        >>> extract_date_parts("2024/10/30")
        None
    """
    pass`,
          solution: `import re

def extract_date_parts(date_string):
    """
    Extract year, month, day using capture groups.

    Pattern explanation:
    (\\d{4}) - captures 4 digits for year
    - - literal hyphen
    (\\d{2}) - captures 2 digits for month
    - - literal hyphen
    (\\d{2}) - captures 2 digits for day
    """
    pattern = r'(\\d{4})-(\\d{2})-(\\d{2})'
    match = re.search(pattern, date_string)

    if match:
        return match.groups()  # Returns tuple of captured groups
    return None

# Test cases
print(extract_date_parts("2024-10-30"))    # ('2024', '10', '30')
print(extract_date_parts("Date: 2023-12-25"))  # ('2023', '12', '25')
print(extract_date_parts("invalid"))       # None`
        }
      },
      explanation: 'Use (pattern) to capture groups. Access with match.groups() or match.group(1), match.group(2), etc.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 7,
      title: 'URL Parsing',
      difficulty: 'Medium',
      description: 'Extract protocol, domain, and path from URLs.',
      examples: [
        { input: '"https://www.example.com/path/page"', output: "protocol='https', domain='www.example.com', path='/path/page'" },
        { input: '"http://site.org"', output: "protocol='http', domain='site.org', path=''" }
      ],
      code: {
        python: {
          starterCode: `import re

def parse_url(url):
    """
    Parse URL into protocol, domain, and path.

    Args:
        url: URL string

    Returns:
        Dict with 'protocol', 'domain', 'path' keys

    Examples:
        >>> parse_url("https://www.example.com/path")
        {'protocol': 'https', 'domain': 'www.example.com', 'path': '/path'}
    """
    pass`,
          solution: `import re

def parse_url(url):
    """
    Parse URL into protocol, domain, and path.

    Pattern explanation:
    (https?://) - captures http:// or https://
    ([^/]+) - captures domain (anything except /)
    (.*) - captures remaining path (optional)
    """
    pattern = r'(https?://)([^/]+)(.*)'
    match = re.match(pattern, url)

    if match:
        return {
            'protocol': match.group(1).rstrip('://'),
            'domain': match.group(2),
            'path': match.group(3)
        }
    return None

# Test cases
print(parse_url("https://www.example.com/path/page"))
print(parse_url("http://site.org"))
print(parse_url("https://api.github.com/users/repos"))`
        }
      },
      explanation: 'Use [^x] to match anything except x. .* matches any character zero or more times.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 8,
      title: 'Password Validation',
      difficulty: 'Hard',
      description: 'Validate password: 8+ chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char.',
      examples: [
        { input: '"Pass123!"', output: 'True' },
        { input: '"password"', output: 'False (no uppercase, digit, special)' },
        { input: '"Short1!"', output: 'False (too short)' }
      ],
      code: {
        python: {
          starterCode: `import re

def is_valid_password(password):
    """
    Validate password strength using regex.

    Requirements:
    - At least 8 characters
    - At least 1 uppercase letter
    - At least 1 lowercase letter
    - At least 1 digit
    - At least 1 special character (!@#$%^&*)

    Args:
        password: Password string

    Returns:
        True if valid, False otherwise

    Examples:
        >>> is_valid_password("Pass123!")
        True
        >>> is_valid_password("password")
        False
    """
    pass`,
          solution: `import re

def is_valid_password(password):
    """
    Validate password using positive lookaheads.

    Pattern explanation:
    ^ - start of string
    (?=.*[a-z]) - positive lookahead for lowercase
    (?=.*[A-Z]) - positive lookahead for uppercase
    (?=.*\\d) - positive lookahead for digit
    (?=.*[!@#$%^&*]) - positive lookahead for special char
    .{8,} - at least 8 characters
    $ - end of string
    """
    pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{8,}$'
    return bool(re.match(pattern, password))

# Test cases
print(is_valid_password("Pass123!"))      # True
print(is_valid_password("password"))      # False (no upper, digit, special)
print(is_valid_password("Short1!"))       # False (too short)
print(is_valid_password("NOLOWER1!"))     # False (no lowercase)
print(is_valid_password("Valid@Pass123")) # True`
        }
      },
      explanation: 'Lookaheads (?=...) assert pattern exists without consuming characters. Useful for complex validation.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 9,
      title: 'Split with Regex',
      difficulty: 'Easy',
      description: 'Use re.split() to split strings by complex patterns.',
      examples: [
        { input: '"one,two;three:four", split by [,:;]', output: "['one', 'two', 'three', 'four']" },
        { input: '"a1b2c3", split by digits', output: "['a', 'b', 'c', '']" }
      ],
      code: {
        python: {
          starterCode: `import re

def split_by_pattern(text, pattern):
    """
    Split string by regex pattern.

    Args:
        text: String to split
        pattern: Regex pattern to split by

    Returns:
        List of split parts

    Examples:
        >>> split_by_pattern("one,two;three", r"[,;]")
        ['one', 'two', 'three']
        >>> split_by_pattern("a1b2c3", r"\\d")
        ['a', 'b', 'c', '']
    """
    pass`,
          solution: `import re

def split_by_pattern(text, pattern):
    """
    Split string by regex pattern.

    re.split() splits at each match of the pattern.
    """
    return re.split(pattern, text)

# Test cases
print(split_by_pattern("one,two;three:four", r"[,:;]"))  # Multiple delimiters
print(split_by_pattern("a1b2c3", r"\\d"))                # Split by digits
print(split_by_pattern("word1  word2   word3", r"\\s+")) # Split by whitespace
print(split_by_pattern("apple-banana_cherry", r"[-_]")) # Split by - or _`
        }
      },
      explanation: 're.split(pattern, string) splits by pattern. Use [abc] for character class, \\s+ for one or more whitespace.',
      timeComplexity: 'O(n*m)',
      spaceComplexity: 'O(k) for k parts'
    },
    {
      id: 10,
      title: 'Named Groups',
      difficulty: 'Medium',
      description: 'Use named capture groups for better readability.',
      examples: [
        { input: '"John Doe (30 years old)"', output: "name='John Doe', age='30'" },
        { input: '"Error: File not found (code: 404)"', output: "message='File not found', code='404'" }
      ],
      code: {
        python: {
          starterCode: `import re

def extract_person_info(text):
    """
    Extract name and age from text using named groups.

    Args:
        text: String in format "Name (age years old)"

    Returns:
        Dict with 'name' and 'age' keys

    Examples:
        >>> extract_person_info("John Doe (30 years old)")
        {'name': 'John Doe', 'age': '30'}
    """
    pass`,
          solution: `import re

def extract_person_info(text):
    """
    Extract name and age using named groups.

    Pattern explanation:
    (?P<name>[A-Za-z ]+) - named group 'name'
    \\( - literal opening paren
    (?P<age>\\d+) - named group 'age'
    """
    pattern = r'(?P<name>[A-Za-z ]+)\\s*\\((?P<age>\\d+)\\s*years'
    match = re.search(pattern, text)

    if match:
        return match.groupdict()  # Returns dict of named groups
    return None

# Test cases
print(extract_person_info("John Doe (30 years old)"))
print(extract_person_info("Alice Smith (25 years old)"))
print(extract_person_info("Bob (invalid)"))  # None

# Alternative: Access by name
# match.group('name'), match.group('age')`
        }
      },
      explanation: 'Use (?P<name>pattern) for named groups. Access with match.groupdict() or match.group("name").',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    }
  ]

  useEffect(() => {
    if (selectedQuestion) {
      const questionCode = selectedQuestion.code[language]
      if (questionCode) {
        setUserCode(questionCode.starterCode)
      }
    }
  }, [selectedQuestion, language])

  const groupedQuestions = {
    Easy: questions.filter(q => q.difficulty === 'Easy'),
    Medium: questions.filter(q => q.difficulty === 'Medium'),
    Hard: questions.filter(q => q.difficulty === 'Hard')
  }

  const handleBack = () => {
    if (selectedQuestion) {
      setSelectedQuestion(null)
      setShowSolution(false)
      setShowExplanation(false)
      setUserCode('')
      setOutput('')
    } else {
      onBack()
    }
  }

  const handleShowDrawing = (question) => {
    setCurrentDrawing(question)
    setShowDrawing(true)
  }

  if (showDrawing && currentDrawing) {
    return (
      <DrawingCanvas
        title={currentDrawing.title}
        onBack={() => {
          setShowDrawing(false)
          setCurrentDrawing(null)
        }}
        problemId={`PythonRegex-${currentDrawing.id}`}
      />
    )
  }

  if (!selectedQuestion) {
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
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
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
            </div>
            <div className="flex gap-2">
              {onPreviousSubcategory && (
                <button
                  onClick={onPreviousSubcategory}
                  style={{
                    background: '#2563eb',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
                >
                  ← {previousSubcategory}
                </button>
              )}
              {onNextSubcategory && (
                <button
                  onClick={onNextSubcategory}
                  style={{
                    background: '#2563eb',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
                >
                  {nextSubcategory} →
                </button>
              )}
            </div>
          </div>

          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Python Regular Expressions (Regex)
          </h1>
          <p style={{
            fontSize: '1.125rem',
            color: '#d1d5db',
            marginBottom: '1.5rem'
          }}>
            Master Python's powerful regex module (re) for pattern matching, validation, and text processing.
          </p>

          <Breadcrumb breadcrumb={breadcrumb} />

          {/* Regex Guide Section */}
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            border: '2px solid #3b82f6',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#93c5fd',
              marginBottom: '1rem'
            }}>
              📚 Regular Expressions Quick Guide
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* What is Regex */}
              <div style={{
                background: '#1f2937',
                borderRadius: '0.5rem',
                padding: '1rem',
                border: '1px solid #3b82f6'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#93c5fd',
                  marginBottom: '0.5rem'
                }}>
                  What is Regex?
                </h3>
                <p style={{ color: '#d1d5db', marginBottom: '0.5rem' }}>
                  Regular expressions are sequences of characters that define search patterns. They're used for:
                </p>
                <ul style={{
                  listStyleType: 'disc',
                  listStylePosition: 'inside',
                  color: '#d1d5db',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  marginLeft: '1rem'
                }}>
                  <li>Pattern matching and searching in text</li>
                  <li>Validating input (emails, phone numbers, etc.)</li>
                  <li>Extracting data from strings</li>
                  <li>Find and replace operations</li>
                </ul>
              </div>

              {/* Common Metacharacters */}
              <div style={{
                background: '#1f2937',
                borderRadius: '0.5rem',
                padding: '1rem',
                border: '1px solid #3b82f6'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#93c5fd',
                  marginBottom: '0.75rem'
                }}>
                  Common Metacharacters
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '0.75rem'
                }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>.</span> - Any character (except newline)
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>^</span> - Start of string
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>$</span> - End of string
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>*</span> - 0 or more repetitions
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>+</span> - 1 or more repetitions
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>?</span> - 0 or 1 repetition (optional)
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>\d</span> - Any digit (0-9)
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>\w</span> - Word character (a-z, A-Z, 0-9, _)
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>\s</span> - Whitespace (space, tab, newline)
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>|</span> - OR operator
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>[abc]</span> - Any character in set
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>[^abc]</span> - Any character NOT in set
                  </div>
                </div>
              </div>

              {/* Quantifiers */}
              <div style={{
                background: '#1f2937',
                borderRadius: '0.5rem',
                padding: '1rem',
                border: '1px solid #3b82f6'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#93c5fd',
                  marginBottom: '0.75rem'
                }}>
                  Quantifiers
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '0.75rem'
                }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>{`{n}`}</span> - Exactly n repetitions
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>{`{n,}`}</span> - n or more repetitions
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>{`{n,m}`}</span> - Between n and m repetitions
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>*?</span> - Non-greedy 0 or more
                  </div>
                </div>
              </div>

              {/* Groups and Capturing */}
              <div style={{
                background: '#1f2937',
                borderRadius: '0.5rem',
                padding: '1rem',
                border: '1px solid #3b82f6'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#93c5fd',
                  marginBottom: '0.75rem'
                }}>
                  Groups and Capturing
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>(pattern)</span> - Capturing group
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>(?:pattern)</span> - Non-capturing group
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>(?P&lt;name&gt;pattern)</span> - Named capturing group
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#d1d5db' }}>
                    <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>(?=pattern)</span> - Positive lookahead
                  </div>
                </div>
              </div>

              {/* Python re Module Functions */}
              <div style={{
                background: '#1f2937',
                borderRadius: '0.5rem',
                padding: '1rem',
                border: '1px solid #3b82f6'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#93c5fd',
                  marginBottom: '0.75rem'
                }}>
                  Python re Module Functions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ color: '#d1d5db' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#60a5fa' }}>re.search(pattern, string)</span>
                    <span> - Find first match anywhere</span>
                  </div>
                  <div style={{ color: '#d1d5db' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#60a5fa' }}>re.match(pattern, string)</span>
                    <span> - Match at start of string</span>
                  </div>
                  <div style={{ color: '#d1d5db' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#60a5fa' }}>re.findall(pattern, string)</span>
                    <span> - Find all non-overlapping matches</span>
                  </div>
                  <div style={{ color: '#d1d5db' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#60a5fa' }}>re.sub(pattern, repl, string)</span>
                    <span> - Replace all matches</span>
                  </div>
                  <div style={{ color: '#d1d5db' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#60a5fa' }}>re.split(pattern, string)</span>
                    <span> - Split string by pattern</span>
                  </div>
                </div>
              </div>

              {/* Common Patterns */}
              <div style={{
                background: '#1f2937',
                borderRadius: '0.5rem',
                padding: '1rem',
                border: '1px solid #3b82f6'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#93c5fd',
                  marginBottom: '0.75rem'
                }}>
                  Common Patterns
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <div style={{ color: '#d1d5db' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#60a5fa' }}>r'\d{3}-\d{3}-\d{4}'</span>
                    <span> - Phone number (123-456-7890)</span>
                  </div>
                  <div style={{ color: '#d1d5db' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#60a5fa' }}>r'^\w+@\w+\.\w+$'</span>
                    <span> - Simple email validation</span>
                  </div>
                  <div style={{ color: '#d1d5db' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#60a5fa' }}>r'\d{'{'}{2,4}{'}'}-\d{'{'}{2}{'}'}-\d{'{'}{2}{'}'}' </span>
                    <span> - Date (YYYY-MM-DD or YY-MM-DD)</span>
                  </div>
                  <div style={{ color: '#d1d5db' }}>
                    <span style={{ fontFamily: 'monospace', fontWeight: 'bold', color: '#60a5fa' }}>r'https?://\S+'</span>
                    <span> - URL (http or https)</span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div style={{
                background: '#1f2937',
                border: '2px solid #fbbf24',
                borderRadius: '0.5rem',
                padding: '1rem'
              }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#fbbf24',
                  marginBottom: '0.5rem'
                }}>
                  💡 Tips
                </h3>
                <ul style={{
                  listStyleType: 'disc',
                  listStylePosition: 'inside',
                  color: '#d1d5db',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  marginLeft: '0.5rem'
                }}>
                  <li>Always use raw strings (r"...") for regex patterns in Python</li>
                  <li>Test your regex patterns with online tools like regex101.com</li>
                  <li>Use parentheses () to capture groups you want to extract</li>
                  <li>Escape special characters with backslash: \. \* \+ \?</li>
                  <li>Use non-capturing groups (?:...) when you don't need to extract</li>
                </ul>
              </div>
            </div>
          </div>

          {Object.entries(groupedQuestions).map(([difficulty, questions]) => (
            questions.length > 0 && (
              <div key={difficulty} style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                    borderRadius: '0.75rem',
                    marginBottom: '0.75rem',
                    border: '2px solid #3b82f6'
                  }}
                >
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#93c5fd'
                  }}>
                    {difficulty} Problems ({questions.length})
                  </h2>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1rem'
                }}>
                  {questions.map((question) => (
                    <div
                      key={question.id}
                      onClick={() => setSelectedQuestion(question)}
                      style={{
                        padding: '1.5rem',
                        border: '2px solid #3b82f6',
                        borderRadius: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                        position: 'relative',
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
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        display: 'flex',
                        gap: '0.5rem'
                      }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleShowDrawing(question)
                          }}
                          style={{
                            padding: '0.5rem',
                            background: '#1f2937',
                            border: '1px solid #60a5fa',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#2563eb'}
                          onMouseLeave={(e) => e.currentTarget.style.background = '#1f2937'}
                          title="Open drawing canvas"
                        >
                          <svg style={{ width: '1.25rem', height: '1.25rem', color: '#60a5fa' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <CompletionCheckbox
                          problemId={`PythonRegex-${question.id}`}
                          scale="0.85"
                        />
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem'
                      }}>
                        <h3 style={{
                          fontSize: '1.25rem',
                          fontWeight: '600',
                          color: '#93c5fd',
                          paddingRight: '5rem'
                        }}>
                          {question.title}
                        </h3>
                      </div>
                      <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        marginBottom: '0.75rem',
                        background: difficulty === 'Easy' ? '#065f46' :
                                   difficulty === 'Medium' ? '#92400e' : '#7f1d1d',
                        color: difficulty === 'Easy' ? '#6ee7b7' :
                               difficulty === 'Medium' ? '#fcd34d' : '#fca5a5'
                      }}>
                        {difficulty}
                      </span>
                      <p style={{
                        color: '#d1d5db',
                        marginBottom: '1rem'
                      }}>
                        {question.description}
                      </p>
                      {question.examples && (
                        <div style={{ marginTop: '0.5rem' }}>
                          <p style={{
                            fontWeight: '600',
                            color: '#93c5fd',
                            marginBottom: '0.5rem',
                            fontSize: '0.875rem'
                          }}>
                            Example:
                          </p>
                          <div style={{
                            background: '#1f2937',
                            border: '1px solid #3b82f6',
                            padding: '0.75rem',
                            borderRadius: '0.5rem'
                          }}>
                            <p style={{
                              fontFamily: 'monospace',
                              fontSize: '0.875rem',
                              color: '#d1d5db',
                              marginBottom: '0.25rem'
                            }}>
                              <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>Input:</span> {question.examples[0].input}
                            </p>
                            <p style={{
                              fontFamily: 'monospace',
                              fontSize: '0.875rem',
                              color: '#d1d5db'
                            }}>
                              <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>Output:</span> {question.examples[0].output}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    )
  }

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
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={handleBack}
            style={{
              background: '#2563eb',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
          >
            ← Back to Python
          </button>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <CompletionCheckbox problemId={`PythonRegex-${selectedQuestion.id}`} />
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(to bottom right, #1f2937, #111827)',
          borderRadius: '0.75rem',
          border: '2px solid #3b82f6',
          padding: '2rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem'
          }}>
            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: '#93c5fd'
            }}>
              {selectedQuestion.title}
            </h1>
            <span style={{
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '500',
              background: selectedQuestion.difficulty === 'Easy' ? '#065f46' :
                         selectedQuestion.difficulty === 'Medium' ? '#92400e' : '#7f1d1d',
              color: selectedQuestion.difficulty === 'Easy' ? '#6ee7b7' :
                     selectedQuestion.difficulty === 'Medium' ? '#fcd34d' : '#fca5a5'
            }}>
              {selectedQuestion.difficulty}
            </span>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{
              fontSize: '1.125rem',
              color: '#d1d5db'
            }}>
              {selectedQuestion.description}
            </p>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#93c5fd',
                  marginBottom: '0.75rem'
                }}>
                  Examples:
                </h3>
                {selectedQuestion.examples.map((example, index) => (
                  <div key={index} style={{
                    background: '#1f2937',
                    border: '2px solid #3b82f6',
                    padding: '1.25rem',
                    borderRadius: '0.5rem',
                    marginBottom: '0.75rem'
                  }}>
                    <p style={{
                      fontFamily: 'monospace',
                      fontSize: '1rem',
                      color: '#d1d5db',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>Input:</span> {example.input}
                    </p>
                    <p style={{
                      fontFamily: 'monospace',
                      fontSize: '1rem',
                      color: '#d1d5db'
                    }}>
                      <span style={{ fontWeight: 'bold', color: '#60a5fa' }}>Output:</span> {example.output}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <button
                onClick={() => {
                  setShowSolution(!showSolution)
                  if (!showSolution && selectedQuestion.code[language]) {
                    setUserCode(selectedQuestion.code[language].solution)
                  } else if (selectedQuestion.code[language]) {
                    setUserCode(selectedQuestion.code[language].starterCode)
                  }
                }}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#2563eb',
                  color: 'white',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
              >
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#7c3aed',
                  color: 'white',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#6d28d9'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#7c3aed'}
              >
                {showExplanation ? 'Hide' : 'Show'} Explanation
              </button>
            </div>

            {showExplanation && (
              <div style={{
                background: '#1f2937',
                borderLeft: '4px solid #3b82f6',
                padding: '1rem',
                marginBottom: '1rem',
                borderRadius: '0.25rem'
              }}>
                <p style={{ color: '#d1d5db' }}>{selectedQuestion.explanation}</p>
                {selectedQuestion.timeComplexity && (
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#9ca3af',
                    marginTop: '0.5rem'
                  }}>
                    <span style={{ fontWeight: '600' }}>Time Complexity:</span> {selectedQuestion.timeComplexity}
                  </p>
                )}
                {selectedQuestion.spaceComplexity && (
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#9ca3af'
                  }}>
                    <span style={{ fontWeight: '600' }}>Space Complexity:</span> {selectedQuestion.spaceComplexity}
                  </p>
                )}
              </div>
            )}
          </div>

          <div style={{
            background: '#111827',
            borderRadius: '0.5rem',
            padding: '1rem',
            border: '1px solid #3b82f6'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                color: '#9ca3af',
                fontSize: '0.875rem',
                fontFamily: 'monospace'
              }}>
                Python
              </span>
            </div>
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              style={{
                width: '100%',
                height: '24rem',
                background: '#1f2937',
                color: '#d1d5db',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid #374151',
                outline: 'none',
                resize: 'vertical'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.currentTarget.style.borderColor = '#374151'}
              spellCheck="false"
            />
          </div>

          {output && (
            <div style={{
              marginTop: '1rem',
              background: '#1f2937',
              borderRadius: '0.5rem',
              padding: '1rem',
              border: '1px solid #3b82f6'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#93c5fd',
                marginBottom: '0.5rem'
              }}>
                Output:
              </h3>
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
                {output}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PythonRegex
