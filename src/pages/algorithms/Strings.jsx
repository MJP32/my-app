import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function Strings({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
      description: 'Given a string s, find the length of the longest substring without repeating characters.',
      explanation: `**Problem:** Find the longest substring with all unique characters (no repeating characters).

**Key Insight: Sliding Window + HashSet**
Use a dynamic window that expands/contracts to maintain the "no repeats" constraint.

**Why Sliding Window?**
- Need to check ALL substrings → brute force O(n³)
- Sliding window allows us to efficiently explore substrings → O(n)
- Window expands when adding unique characters
- Window contracts when duplicate found

**Algorithm:**
1. Use two pointers: left and right (window boundaries)
2. Use HashSet to track characters in current window
3. Expand right pointer, add characters to set
4. If duplicate found:
   - Shrink window from left until duplicate removed
   - Remove characters from set as left moves
5. Track maximum window size seen

**Example: "abcabcbb"**

Step 1: window = "a", set = {a}, max = 1
Step 2: window = "ab", set = {a,b}, max = 2
Step 3: window = "abc", set = {a,b,c}, max = 3
Step 4: 'a' duplicate! Shrink: remove 'a'
  window = "bca", set = {b,c,a}, max = 3
Step 5: 'b' duplicate! Shrink: remove 'b'
  window = "cab", set = {c,a,b}, max = 3

**Complexity:**
- Time: O(n) - each character visited at most twice (once by right, once by left)
- Space: O(min(n, m)) - m is charset size (at most 26 for lowercase letters)

**Optimization: HashMap Instead of HashSet**
Store character → index mapping to skip directly to position after duplicate:
- Instead of incrementing left one by one
- Jump left to (lastIndex + 1)
- Fewer iterations → same O(n) but faster in practice`,
      pseudocode: `Approach 1: Sliding Window + HashSet
-----------------------
lengthOfLongestSubstring(s):
    set = new HashSet()
    left = 0
    maxLength = 0

    for right from 0 to n-1:
        // Shrink window until no duplicate
        while s[right] in set:
            set.remove(s[left])
            left++

        // Add current character
        set.add(s[right])

        // Update max length
        maxLength = max(maxLength, right - left + 1)

    return maxLength

Example Walkthrough: "abcabcbb"
-----------------------
Initial: left=0, maxLength=0, set={}

right=0, s[0]='a':
  'a' not in set
  set.add('a') → set={a}
  maxLength = max(0, 0-0+1) = 1

right=1, s[1]='b':
  'b' not in set
  set.add('b') → set={a,b}
  maxLength = max(1, 1-0+1) = 2

right=2, s[2]='c':
  'c' not in set
  set.add('c') → set={a,b,c}
  maxLength = max(2, 2-0+1) = 3

right=3, s[3]='a':
  'a' in set! Shrink window:
    Remove s[0]='a', left=1 → set={b,c}
  'a' not in set now
  set.add('a') → set={b,c,a}
  maxLength = max(3, 3-1+1) = 3

right=4, s[4]='b':
  'b' in set! Shrink window:
    Remove s[1]='b', left=2 → set={c,a}
  'b' not in set now
  set.add('b') → set={c,a,b}
  maxLength = max(3, 4-2+1) = 3

Result: 3 (substring "abc")

Approach 2: Optimized with HashMap
-----------------------
lengthOfLongestSubstring(s):
    map = new HashMap()  // char → last index
    left = 0
    maxLength = 0

    for right from 0 to n-1:
        char c = s[right]

        if c in map:
            // Jump left to position after last occurrence
            left = max(left, map[c] + 1)

        // Update character's position
        map[c] = right

        // Update max length
        maxLength = max(maxLength, right - left + 1)

    return maxLength

Why Optimized?
-----------------------
HashSet approach: Remove one by one until duplicate gone
  "abcdefga" → when second 'a' found, remove a,b,c,d,e,f,g one by one

HashMap approach: Jump directly to position after first 'a'
  "abcdefga" → when second 'a' found, jump left to index 1
  Skips 6 removals!`,
      code: {
        java: {
          starterCode: `public int lengthOfLongestSubstring(String s) {
    // Write your code here

}`,
          solution: `// Approach: Sliding Window + HashSet - O(n) time, O(min(n,m)) space
public int lengthOfLongestSubstring(String s) {
    Set<Character> set = new HashSet<>();
    int left = 0, maxLength = 0;

    for (int right = 0; right < s.length(); right++) {
        while (set.contains(s.charAt(right))) {
            set.remove(s.charAt(left));
            left++;
        }
        set.add(s.charAt(right));
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}

// Approach 2: Sliding Window + HashMap (optimized)
public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> map = new HashMap<>();
    int left = 0, maxLength = 0;

    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (map.containsKey(c)) {
            left = Math.max(left, map.get(c) + 1);
        }
        map.put(c, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
}`
        },
        python: {
          starterCode: `def lengthOfLongestSubstring(self, s: str) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: Sliding Window + Set - O(n) time, O(min(n,m)) space
def lengthOfLongestSubstring(self, s: str) -> int:
    char_set = set()
    left = 0
    max_length = 0

    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)

    return max_length

# Approach 2: Sliding Window + Dictionary (optimized)
def lengthOfLongestSubstring(self, s: str) -> int:
    char_index = {}
    left = 0
    max_length = 0

    for right, char in enumerate(s):
        if char in char_index:
            left = max(left, char_index[char] + 1)
        char_index[char] = right
        max_length = max(max_length, right - left + 1)

    return max_length`
        }
      },
      testCases: [
        { s: 'abcabcbb', expected: 3 },
        { s: 'bbbbb', expected: 1 },
        { s: 'pwwkew', expected: 3 }
      ],
      examples: [
        { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
        { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
        { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with the length of 3.' }
      ]
    },
    {
      id: 2,
      title: 'Valid Palindrome',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/',
      description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome, or false otherwise.',
      explanation: `**Problem:** Check if string is a palindrome after normalizing (lowercase + only alphanumeric).

**Key Insight: Two Pointers**
Compare characters from both ends moving inward.

**Algorithm:**
1. Two pointers: left (start), right (end)
2. Move left forward, right backward
3. Skip non-alphanumeric characters
4. Compare characters (case-insensitive)
5. If mismatch → false
6. If pointers meet → true

**Why This Works:**
- Palindrome: symmetric around center
- Only need to check first half vs second half
- No need to create new string (space efficient)

**Complexity:**
- Time: O(n) - single pass
- Space: O(1) - no extra space`,
      pseudocode: `Algorithm:
-----------------------
isPalindrome(s):
    left = 0
    right = s.length - 1

    while left < right:
        // Skip non-alphanumeric from left
        while left < right AND not isAlphanumeric(s[left]):
            left++

        // Skip non-alphanumeric from right
        while left < right AND not isAlphanumeric(s[right]):
            right--

        // Compare (case-insensitive)
        if toLowerCase(s[left]) != toLowerCase(s[right]):
            return false

        left++
        right--

    return true

Example: "A man, a plan, a canal: Panama"
-----------------------
Normalize: "amanaplanacanalpanama"
left=0 'a', right=20 'a' ✓
left=1 'm', right=19 'm' ✓
...continues...
All match → true`,
      code: {
        java: {
          starterCode: `public boolean isPalindrome(String s) {
    // Write your code here

}`,
          solution: `// Approach: Two Pointers - O(n) time, O(1) space
public boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;

    while (left < right) {
        while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
            left++;
        }
        while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
            right--;
        }

        if (Character.toLowerCase(s.charAt(left)) !=
            Character.toLowerCase(s.charAt(right))) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}`
        },
        python: {
          starterCode: `def isPalindrome(self, s: str) -> bool:
    # Write your code here
    pass`,
          solution: `# Approach: Two Pointers - O(n) time, O(1) space
def isPalindrome(self, s: str) -> bool:
    left, right = 0, len(s) - 1

    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1

        if s[left].lower() != s[right].lower():
            return False

        left += 1
        right -= 1

    return True`
        }
      },
      testCases: [
        { s: 'A man, a plan, a canal: Panama', expected: true },
        { s: 'race a car', expected: false },
        { s: ' ', expected: true }
      ],
      examples: [
        { input: 's = "A man, a plan, a canal: Panama"', output: 'true' },
        { input: 's = "race a car"', output: 'false' },
        { input: 's = " "', output: 'true' }
      ]
    },
    {
      id: 3,
      title: 'Decode String',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/decode-string/',
      description: 'Given an encoded string, return its decoded string. The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times.',
      explanation: `**Problem:** Decode string with pattern k[string] where string repeats k times. Can be nested!

**Key Insight: Stack for Nested Patterns**
Use stack to handle nested brackets like "3[a2[c]]" → "accaccacc"

**Why Stack?**
- Nested structure → need to remember previous context
- When see '[': save current state, start new
- When see ']': pop previous state, apply repetition

**Algorithm:**
1. Use two stacks: countStack (numbers), stringStack (strings)
2. Track current number and current string
3. Process each character:
   - Digit: build number (could be multi-digit like 10)
   - '[': push current number/string, reset for inner
   - ']': pop, repeat current string, append to previous
   - Letter: add to current string

**Example: "3[a2[c]]"**
Read '3': k=3
Read '[': push 3, push "", reset
Read 'a': current="a"
Read '2': k=2
Read '[': push 2, push "a", reset
Read 'c': current="c"
Read ']': pop count=2, pop prev="a"
  decoded = "a" + "cc" = "acc"
Read ']': pop count=3, pop prev=""
  decoded = "" + "accaccacc" = "accaccacc"

**Complexity:**
- Time: O(maxK * n) - maxK is largest repetition count
- Space: O(n) - stack space`,
      pseudocode: `Algorithm:
-----------------------
decodeString(s):
    countStack = empty stack
    stringStack = empty stack
    current = ""
    k = 0

    for each char in s:
        if char is digit:
            k = k * 10 + digit  // Handle multi-digit

        else if char == '[':
            countStack.push(k)
            stringStack.push(current)
            current = ""
            k = 0

        else if char == ']':
            prevString = stringStack.pop()
            repeatCount = countStack.pop()
            current = prevString + (current * repeatCount)

        else:  // letter
            current += char

    return current

Example: "3[a]2[bc]"
-----------------------
char='3': k=3
char='[': push 3, push "", current=""
char='a': current="a"
char=']': pop ""+"a"*3="aaa"
char='2': k=2
char='[': push 2, push "aaa", current=""
char='b': current="b"
char='c': current="bc"
char=']': pop "aaa"+"bc"*2="aaabcbc"

Result: "aaabcbc"

Example: "3[a2[c]]"
-----------------------
'3': k=3
'[': stacks=[3],[""], curr=""
'a': curr="a"
'2': k=2
'[': stacks=[3,2],["","a"], curr=""
'c': curr="c"
']': prev="a", cnt=2, curr="a"+"cc"="acc"
']': prev="", cnt=3, curr=""+"accaccacc"
Result: "accaccacc"`,
      code: {
        java: {
          starterCode: `public String decodeString(String s) {
    // Write your code here

}`,
          solution: `// Approach: Stack - O(n) time, O(n) space
public String decodeString(String s) {
    Stack<Integer> countStack = new Stack<>();
    Stack<StringBuilder> stringStack = new Stack<>();
    StringBuilder current = new StringBuilder();
    int k = 0;

    for (char c : s.toCharArray()) {
        if (Character.isDigit(c)) {
            k = k * 10 + (c - '0');
        } else if (c == '[') {
            countStack.push(k);
            stringStack.push(current);
            current = new StringBuilder();
            k = 0;
        } else if (c == ']') {
            StringBuilder decoded = stringStack.pop();
            int repeat = countStack.pop();
            for (int i = 0; i < repeat; i++) {
                decoded.append(current);
            }
            current = decoded;
        } else {
            current.append(c);
        }
    }

    return current.toString();
}`
        },
        python: {
          starterCode: `def decodeString(self, s: str) -> str:
    # Write your code here
    pass`,
          solution: `# Approach: Stack - O(n) time, O(n) space
def decodeString(self, s: str) -> str:
    count_stack = []
    string_stack = []
    current = []
    k = 0

    for char in s:
        if char.isdigit():
            k = k * 10 + int(char)
        elif char == '[':
            count_stack.append(k)
            string_stack.append(current)
            current = []
            k = 0
        elif char == ']':
            decoded = string_stack.pop()
            repeat = count_stack.pop()
            decoded.extend(current * repeat)
            current = decoded
        else:
            current.append(char)

    return ''.join(current)`
        }
      },
      testCases: [
        { s: '3[a]2[bc]', expected: 'aaabcbc' },
        { s: '3[a2[c]]', expected: 'accaccacc' },
        { s: '2[abc]3[cd]ef', expected: 'abcabccdcdcdef' }
      ],
      examples: [
        { input: 's = "3[a]2[bc]"', output: '"aaabcbc"' },
        { input: 's = "3[a2[c]]"', output: '"accaccacc"' },
        { input: 's = "2[abc]3[cd]ef"', output: '"abcabccdcdcdef"' }
      ]
    },
    {
      id: 4,
      title: 'Roman to Integer',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/roman-to-integer/',
      description: 'Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M. Given a roman numeral, convert it to an integer.',
      explanation: `**Problem:** Convert roman numeral string to integer value.

**Key Insight: Subtraction Rule**
Roman numerals are additive except for special cases:
- If smaller symbol before larger: subtract (e.g., IV = 4, IX = 9)
- Otherwise: add (e.g., VI = 6, XI = 11)

**Roman Numeral Values:**
I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000

**Subtraction Cases:**
- I before V or X: IV=4, IX=9
- X before L or C: XL=40, XC=90
- C before D or M: CD=400, CM=900

**Algorithm:**
1. Create map of symbol → value
2. Iterate through string
3. If current < next: subtract current (it's a subtraction case)
4. Otherwise: add current
5. Always add last character (no next to compare)

**Example: "MCMXCIV" = 1994**
M=1000, C<M so CM=900, X<C so XC=90, I<V so IV=4
1000 + 900 + 90 + 4 = 1994

**Complexity:**
- Time: O(n) - single pass
- Space: O(1) - fixed map size`,
      pseudocode: `Algorithm:
-----------------------
romanToInt(s):
    map = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000}
    result = 0

    for i from 0 to n-1:
        if i < n-1 AND map[s[i]] < map[s[i+1]]:
            result -= map[s[i]]  // Subtraction case
        else:
            result += map[s[i]]  // Normal addition

    return result

Example: "MCMXCIV"
-----------------------
i=0: M=1000, 1000 > 100 → result = 1000
i=1: C=100, 100 < 1000 → result = 1000 - 100 = 900
i=2: M=1000, 1000 > 90 → result = 900 + 1000 = 1900
i=3: X=10, 10 < 100 → result = 1900 - 10 = 1890
i=4: C=100, 100 > 4 → result = 1890 + 100 = 1990
i=5: I=1, 1 < 5 → result = 1990 - 1 = 1989
i=6: V=5, last char → result = 1989 + 5 = 1994

Example: "III"
-----------------------
i=0: I=1 → result = 1
i=1: I=1 → result = 2
i=2: I=1 → result = 3

Example: "LVIII" = 58
-----------------------
L=50, V=5, I=1, I=1, I=1
50 + 5 + 1 + 1 + 1 = 58`,
      code: {
        java: {
          starterCode: `public int romanToInt(String s) {
    // Write your code here

}`,
          solution: `// Approach: Hash Map + Subtraction Rule - O(n) time, O(1) space
public int romanToInt(String s) {
    Map<Character, Integer> map = new HashMap<>();
    map.put('I', 1);
    map.put('V', 5);
    map.put('X', 10);
    map.put('L', 50);
    map.put('C', 100);
    map.put('D', 500);
    map.put('M', 1000);

    int result = 0;

    for (int i = 0; i < s.length(); i++) {
        int current = map.get(s.charAt(i));

        // If current < next, subtract (subtraction case)
        if (i < s.length() - 1 && current < map.get(s.charAt(i + 1))) {
            result -= current;
        } else {
            result += current;
        }
    }

    return result;
}`
        },
        python: {
          starterCode: `def romanToInt(self, s: str) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: Dictionary + Subtraction Rule - O(n) time, O(1) space
def romanToInt(self, s: str) -> int:
    roman_map = {
        'I': 1, 'V': 5, 'X': 10, 'L': 50,
        'C': 100, 'D': 500, 'M': 1000
    }

    result = 0

    for i in range(len(s)):
        current = roman_map[s[i]]

        # If current < next, subtract (subtraction case)
        if i < len(s) - 1 and current < roman_map[s[i + 1]]:
            result -= current
        else:
            result += current

    return result`
        }
      },
      testCases: [
        { s: 'III', expected: 3 },
        { s: 'LVIII', expected: 58 },
        { s: 'MCMXCIV', expected: 1994 }
      ],
      examples: [
        { input: 's = "III"', output: '3', explanation: 'III = 3' },
        { input: 's = "LVIII"', output: '58', explanation: 'L = 50, V = 5, III = 3, total = 58' },
        { input: 's = "MCMXCIV"', output: '1994', explanation: 'M = 1000, CM = 900, XC = 90, IV = 4, total = 1994' }
      ]
    },
    {
      id: 5,
      title: 'Integer to Roman',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/integer-to-roman/',
      description: 'Given an integer, convert it to a roman numeral.',
      explanation: `**Problem:** Convert integer to roman numeral string.

**Key Insight: Greedy from Largest**
Use largest value first, then next largest, etc.

**All Roman Values (including subtraction cases):**
1000=M, 900=CM, 500=D, 400=CD, 100=C, 90=XC,
50=L, 40=XL, 10=X, 9=IX, 5=V, 4=IV, 1=I

**Algorithm:**
1. Create list of values and symbols in descending order
2. For each value:
   - While number >= value, append symbol and subtract value
   - Move to next smaller value
3. Continue until number becomes 0

**Example: 1994**
1994 >= 1000: append "M", 994 left
994 >= 900: append "CM", 94 left
94 >= 90: append "XC", 4 left
4 >= 4: append "IV", 0 left
Result: "MCMXCIV"

**Why Greedy Works:**
Roman numerals are unique for each number. Using largest values first guarantees correct representation.

**Complexity:**
- Time: O(1) - fixed number of symbols (13)
- Space: O(1) - result string, but bounded`,
      pseudocode: `Algorithm:
-----------------------
intToRoman(num):
    values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
    result = ""

    for i from 0 to 12:
        while num >= values[i]:
            result += symbols[i]
            num -= values[i]

    return result

Example: 1994
-----------------------
num=1994
values[0]=1000: 1994>=1000
  result="M", num=994
values[1]=900: 994>=900
  result="MCM", num=94
values[5]=90: 94>=90
  result="MCMXC", num=4
values[11]=4: 4>=4
  result="MCMXCIV", num=0

Example: 58
-----------------------
num=58
values[6]=50: 58>=50
  result="L", num=8
values[10]=5: 8>=5
  result="LV", num=3
values[12]=1: 3>=1
  result="LVI", num=2
  result="LVII", num=1
  result="LVIII", num=0`,
      code: {
        java: {
          starterCode: `public String intToRoman(int num) {
    // Write your code here

}`,
          solution: `// Approach: Greedy - O(1) time, O(1) space
public String intToRoman(int num) {
    int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
    String[] symbols = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};

    StringBuilder result = new StringBuilder();

    for (int i = 0; i < values.length; i++) {
        while (num >= values[i]) {
            result.append(symbols[i]);
            num -= values[i];
        }
    }

    return result.toString();
}`
        },
        python: {
          starterCode: `def intToRoman(self, num: int) -> str:
    # Write your code here
    pass`,
          solution: `# Approach: Greedy - O(1) time, O(1) space
def intToRoman(self, num: int) -> str:
    values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]

    result = []

    for i in range(len(values)):
        while num >= values[i]:
            result.append(symbols[i])
            num -= values[i]

    return ''.join(result)`
        }
      },
      testCases: [
        { num: 3, expected: 'III' },
        { num: 58, expected: 'LVIII' },
        { num: 1994, expected: 'MCMXCIV' }
      ],
      examples: [
        { input: 'num = 3', output: '"III"', explanation: '3 is represented as III' },
        { input: 'num = 58', output: '"LVIII"', explanation: 'L = 50, V = 5, III = 3' },
        { input: 'num = 1994', output: '"MCMXCIV"', explanation: 'M = 1000, CM = 900, XC = 90, IV = 4' }
      ]
    },
    {
      id: 6,
      title: 'Length of Last Word',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/length-of-last-word/',
      description: 'Given a string s consisting of words and spaces, return the length of the last word in the string. A word is a maximal substring consisting of non-space characters only.',
      explanation: `**Problem:** Find length of last word in string (words separated by spaces).

**Key Insight: Traverse from End**
Start from end, skip trailing spaces, then count until next space.

**Algorithm:**
1. Start from end of string
2. Skip trailing spaces
3. Count characters until space or beginning
4. Return count

**Example: "Hello World"**
Start at end: 'd' → not space, count=1
'l' → not space, count=2
'r' → not space, count=3
'o' → not space, count=4
'W' → not space, count=5
' ' → space, stop
Return 5

**Example: "   fly me   to   the moon  "**
Skip trailing spaces: "...moon"
Count: "moon" = 4

**Complexity:**
- Time: O(n) - worst case scan entire string
- Space: O(1) - only counter`,
      pseudocode: `Algorithm:
-----------------------
lengthOfLastWord(s):
    n = s.length
    i = n - 1

    // Skip trailing spaces
    while i >= 0 AND s[i] == ' ':
        i--

    // Count last word
    length = 0
    while i >= 0 AND s[i] != ' ':
        length++
        i--

    return length

Example: "Hello World"
-----------------------
i=10 (end)
s[10]='d' != ' ' → length=1, i=9
s[9]='l' != ' ' → length=2, i=8
s[8]='r' != ' ' → length=3, i=7
s[7]='o' != ' ' → length=4, i=6
s[6]='W' != ' ' → length=5, i=5
s[5]=' ' → stop
Return 5

Example: "   fly me   to   the moon  "
-----------------------
Skip trailing spaces: i moves from 26 to 21
s[21]='n' → length=1
s[20]='o' → length=2
s[19]='o' → length=3
s[18]='m' → length=4
s[17]=' ' → stop
Return 4`,
      code: {
        java: {
          starterCode: `public int lengthOfLastWord(String s) {
    // Write your code here

}`,
          solution: `// Approach: Traverse from End - O(n) time, O(1) space
public int lengthOfLastWord(String s) {
    int i = s.length() - 1;

    // Skip trailing spaces
    while (i >= 0 && s.charAt(i) == ' ') {
        i--;
    }

    // Count last word
    int length = 0;
    while (i >= 0 && s.charAt(i) != ' ') {
        length++;
        i--;
    }

    return length;
}`
        },
        python: {
          starterCode: `def lengthOfLastWord(self, s: str) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: Traverse from End - O(n) time, O(1) space
def lengthOfLastWord(self, s: str) -> int:
    i = len(s) - 1

    # Skip trailing spaces
    while i >= 0 and s[i] == ' ':
        i -= 1

    # Count last word
    length = 0
    while i >= 0 and s[i] != ' ':
        length += 1
        i -= 1

    return length`
        }
      },
      testCases: [
        { s: 'Hello World', expected: 5 },
        { s: '   fly me   to   the moon  ', expected: 4 },
        { s: 'luffy is still joyboy', expected: 6 }
      ],
      examples: [
        { input: 's = "Hello World"', output: '5', explanation: 'The last word is "World" with length 5' },
        { input: 's = "   fly me   to   the moon  "', output: '4', explanation: 'The last word is "moon" with length 4' },
        { input: 's = "luffy is still joyboy"', output: '6', explanation: 'The last word is "joyboy" with length 6' }
      ]
    },
    {
      id: 7,
      title: 'Longest Common Prefix',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/longest-common-prefix/',
      description: 'Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".',
      explanation: `**Problem:** Find longest prefix common to all strings in array.

**Key Insight: Compare Character by Character**
Compare character at each position across all strings.

**Approach 1: Horizontal Scanning**
Compare prefix between first and second string, then result with third, etc.

**Approach 2: Vertical Scanning (Optimal)**
Compare same position across all strings, column by column.

**Algorithm (Vertical):**
1. Take first string as reference
2. For each character position i:
   - Check if all strings have character at position i
   - Check if all characters at position i are same
   - If not, return prefix up to i-1
3. Return entire first string if all match

**Example: ["flower","flow","flight"]**
Position 0: f,f,f → all 'f' ✓
Position 1: l,l,l → all 'l' ✓
Position 2: o,o,i → mismatch! ✗
Return "fl"

**Complexity:**
- Time: O(S) where S is sum of all characters
- Space: O(1)`,
      pseudocode: `Approach: Vertical Scanning
-----------------------
longestCommonPrefix(strs):
    if strs is empty:
        return ""

    for i from 0 to length(strs[0])-1:
        char c = strs[0][i]

        for j from 1 to n-1:
            // If string too short or char mismatch
            if i >= length(strs[j]) OR strs[j][i] != c:
                return strs[0][0...i-1]

    return strs[0]

Example: ["flower","flow","flight"]
-----------------------
i=0, c='f':
  strs[1][0]='f' ✓
  strs[2][0]='f' ✓
i=1, c='l':
  strs[1][1]='l' ✓
  strs[2][1]='l' ✓
i=2, c='o':
  strs[1][2]='o' ✓
  strs[2][2]='i' ✗ mismatch!
Return "fl"

Example: ["dog","racecar","car"]
-----------------------
i=0, c='d':
  strs[1][0]='r' ✗ mismatch!
Return ""

Approach: Horizontal Scanning
-----------------------
longestCommonPrefix(strs):
    if strs is empty:
        return ""

    prefix = strs[0]
    for i from 1 to n-1:
        while strs[i].indexOf(prefix) != 0:
            prefix = prefix[0...length-1]
            if prefix is empty:
                return ""

    return prefix`,
      code: {
        java: {
          starterCode: `public String longestCommonPrefix(String[] strs) {
    // Write your code here

}`,
          solution: `// Approach: Vertical Scanning - O(S) time, O(1) space
public String longestCommonPrefix(String[] strs) {
    if (strs == null || strs.length == 0) return "";

    for (int i = 0; i < strs[0].length(); i++) {
        char c = strs[0].charAt(i);

        for (int j = 1; j < strs.length; j++) {
            if (i >= strs[j].length() || strs[j].charAt(i) != c) {
                return strs[0].substring(0, i);
            }
        }
    }

    return strs[0];
}

// Approach 2: Horizontal Scanning
public String longestCommonPrefix(String[] strs) {
    if (strs == null || strs.length == 0) return "";

    String prefix = strs[0];
    for (int i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) != 0) {
            prefix = prefix.substring(0, prefix.length() - 1);
            if (prefix.isEmpty()) return "";
        }
    }

    return prefix;
}`
        },
        python: {
          starterCode: `def longestCommonPrefix(self, strs: List[str]) -> str:
    # Write your code here
    pass`,
          solution: `# Approach: Vertical Scanning - O(S) time, O(1) space
def longestCommonPrefix(self, strs: List[str]) -> str:
    if not strs:
        return ""

    for i in range(len(strs[0])):
        c = strs[0][i]

        for j in range(1, len(strs)):
            if i >= len(strs[j]) or strs[j][i] != c:
                return strs[0][:i]

    return strs[0]

# Approach 2: Horizontal Scanning
def longestCommonPrefix(self, strs: List[str]) -> str:
    if not strs:
        return ""

    prefix = strs[0]
    for i in range(1, len(strs)):
        while not strs[i].startswith(prefix):
            prefix = prefix[:-1]
            if not prefix:
                return ""

    return prefix`
        }
      },
      testCases: [
        { strs: ['flower','flow','flight'], expected: 'fl' },
        { strs: ['dog','racecar','car'], expected: '' }
      ],
      examples: [
        { input: 'strs = ["flower","flow","flight"]', output: '"fl"', explanation: 'The longest common prefix is "fl"' },
        { input: 'strs = ["dog","racecar","car"]', output: '""', explanation: 'There is no common prefix among the input strings' }
      ]
    },
    {
      id: 8,
      title: 'Reverse Words in a String',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/reverse-words-in-a-string/',
      description: 'Given an input string s, reverse the order of the words. A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space. Return a string of the words in reverse order concatenated by a single space.',
      explanation: `**Problem:** Reverse order of words in string, handle multiple spaces.

**Key Insight: Split, Reverse, Join**
Split into words (handles multiple spaces), reverse array, join with single space.

**Algorithm:**
1. Split string by whitespace (removes extra spaces)
2. Reverse the array of words
3. Join with single space

**Example: "the sky is blue"**
Split: ["the", "sky", "is", "blue"]
Reverse: ["blue", "is", "sky", "the"]
Join: "blue is sky the"

**Example: "  hello world  "**
Split: ["hello", "world"]
Reverse: ["world", "hello"]
Join: "world hello"

**Edge Cases:**
- Multiple spaces → handled by split
- Leading/trailing spaces → removed by split
- Single word → returns same word

**Complexity:**
- Time: O(n) - split, reverse, join all O(n)
- Space: O(n) - store words array`,
      pseudocode: `Algorithm:
-----------------------
reverseWords(s):
    // Split by whitespace, filter empty strings
    words = s.split(/\s+/).filter(not empty)

    // Reverse array
    reverse(words)

    // Join with single space
    return words.join(' ')

Example: "the sky is blue"
-----------------------
Split: ["the", "sky", "is", "blue"]
Reverse: ["blue", "is", "sky", "the"]
Join: "blue is sky the"

Example: "  hello world  "
-----------------------
Trim and split: ["hello", "world"]
Reverse: ["world", "hello"]
Join: "world hello"

Two-Pointer In-Place (O(1) space if allowed to modify):
-----------------------
reverseWords(s):
    // Reverse entire string
    reverse(s, 0, n-1)

    // Reverse each word
    start = 0
    for i from 0 to n:
        if s[i] == ' ' OR i == n:
            reverse(s, start, i-1)
            start = i + 1

Example: "the sky is blue"
-----------------------
Reverse all: "eulb si yks eht"
Reverse each word:
  "eulb" → "blue"
  "si" → "is"
  "yks" → "sky"
  "eht" → "the"
Result: "blue is sky the"`,
      code: {
        java: {
          starterCode: `public String reverseWords(String s) {
    // Write your code here

}`,
          solution: `// Approach: Split, Reverse, Join - O(n) time, O(n) space
public String reverseWords(String s) {
    // Split by whitespace and filter empty strings
    String[] words = s.trim().split("\\s+");

    // Reverse array
    int left = 0, right = words.length - 1;
    while (left < right) {
        String temp = words[left];
        words[left] = words[right];
        words[right] = temp;
        left++;
        right--;
    }

    // Join with single space
    return String.join(" ", words);
}

// Approach 2: Using Collections
public String reverseWords(String s) {
    String[] words = s.trim().split("\\s+");
    Collections.reverse(Arrays.asList(words));
    return String.join(" ", words);
}`
        },
        python: {
          starterCode: `def reverseWords(self, s: str) -> str:
    # Write your code here
    pass`,
          solution: `# Approach: Split, Reverse, Join - O(n) time, O(n) space
def reverseWords(self, s: str) -> str:
    # Split by whitespace (handles multiple spaces)
    words = s.split()

    # Reverse and join
    return ' '.join(reversed(words))

# One-liner
def reverseWords(self, s: str) -> str:
    return ' '.join(s.split()[::-1])`
        }
      },
      testCases: [
        { s: 'the sky is blue', expected: 'blue is sky the' },
        { s: '  hello world  ', expected: 'world hello' },
        { s: 'a good   example', expected: 'example good a' }
      ],
      examples: [
        { input: 's = "the sky is blue"', output: '"blue is sky the"' },
        { input: 's = "  hello world  "', output: '"world hello"', explanation: 'Leading and trailing spaces are removed' },
        { input: 's = "a good   example"', output: '"example good a"', explanation: 'Multiple spaces reduced to single space' }
      ]
    },
    {
      id: 9,
      title: 'Zigzag Conversion',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/zigzag-conversion/',
      description: 'The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility). And then read line by line: "PAHNAPLSIIGYIR". Write the code that will take a string and make this conversion given a number of rows.',
      explanation: `**Problem:** Arrange string in zigzag pattern, read row by row.

**Key Insight: Track Row and Direction**
Characters fill rows in zigzag: down, then up-diagonal, repeat.

**Zigzag Pattern (numRows=3):**
P   A   H   N
A P L S I I G
Y   I   R

Read row by row: "PAHNAPLSIIGYIR"

**Algorithm:**
1. Create array of strings, one per row
2. Track current row and direction (going down/up)
3. For each character:
   - Add to current row
   - Update row and direction
4. Concatenate all rows

**Direction Logic:**
- Start going down (row++)
- When reach bottom (row == numRows-1): go up (row--)
- When reach top (row == 0): go down (row++)

**Example: s="PAYPALISHIRING", numRows=3**
Row 0: P, A, H, N
Row 1: A, P, L, S, I, I, G
Row 2: Y, I, R
Result: "PAHNAPLSIIGYIR"

**Edge Cases:**
- numRows=1: return original string
- numRows >= len(s): return original string

**Complexity:**
- Time: O(n) - visit each character once
- Space: O(n) - store all characters in rows`,
      pseudocode: `Algorithm:
-----------------------
convert(s, numRows):
    if numRows == 1 OR numRows >= len(s):
        return s

    rows = array of numRows empty strings
    currentRow = 0
    goingDown = false

    for each char in s:
        rows[currentRow] += char

        // Change direction at top or bottom
        if currentRow == 0 OR currentRow == numRows - 1:
            goingDown = !goingDown

        // Move to next row
        currentRow += 1 if goingDown else -1

    return concatenate all rows

Example: s="PAYPALISHIRING", numRows=3
-----------------------
Initial: rows=["","",""], currentRow=0, goingDown=false

char='P': rows[0]="P", at top so goingDown=true, currentRow=1
char='A': rows[1]="A", currentRow=2
char='Y': rows[2]="Y", at bottom so goingDown=false, currentRow=1
char='P': rows[1]="AP", currentRow=0
char='A': rows[0]="PA", at top so goingDown=true, currentRow=1
char='L': rows[1]="APL", currentRow=2
char='I': rows[2]="YI", at bottom so goingDown=false, currentRow=1
... continues ...

Final rows:
Row 0: "PAHN"
Row 1: "APLSIIG"
Row 2: "YIR"
Result: "PAHNAPLSIIGYIR"

Pattern for numRows=4:
-----------------------
P     I    N
A   L S  I G
Y A   H R
P     I`,
      code: {
        java: {
          starterCode: `public String convert(String s, int numRows) {
    // Write your code here

}`,
          solution: `// Approach: Simulate Zigzag - O(n) time, O(n) space
public String convert(String s, int numRows) {
    if (numRows == 1 || numRows >= s.length()) {
        return s;
    }

    StringBuilder[] rows = new StringBuilder[numRows];
    for (int i = 0; i < numRows; i++) {
        rows[i] = new StringBuilder();
    }

    int currentRow = 0;
    boolean goingDown = false;

    for (char c : s.toCharArray()) {
        rows[currentRow].append(c);

        // Change direction at top or bottom
        if (currentRow == 0 || currentRow == numRows - 1) {
            goingDown = !goingDown;
        }

        currentRow += goingDown ? 1 : -1;
    }

    StringBuilder result = new StringBuilder();
    for (StringBuilder row : rows) {
        result.append(row);
    }

    return result.toString();
}`
        },
        python: {
          starterCode: `def convert(self, s: str, numRows: int) -> str:
    # Write your code here
    pass`,
          solution: `# Approach: Simulate Zigzag - O(n) time, O(n) space
def convert(self, s: str, numRows: int) -> str:
    if numRows == 1 or numRows >= len(s):
        return s

    rows = [''] * numRows
    current_row = 0
    going_down = False

    for char in s:
        rows[current_row] += char

        # Change direction at top or bottom
        if current_row == 0 or current_row == numRows - 1:
            going_down = not going_down

        current_row += 1 if going_down else -1

    return ''.join(rows)`
        }
      },
      testCases: [
        { s: 'PAYPALISHIRING', numRows: 3, expected: 'PAHNAPLSIIGYIR' },
        { s: 'PAYPALISHIRING', numRows: 4, expected: 'PINALSIGYAHRPI' },
        { s: 'A', numRows: 1, expected: 'A' }
      ],
      examples: [
        { input: 's = "PAYPALISHIRING", numRows = 3', output: '"PAHNAPLSIIGYIR"' },
        { input: 's = "PAYPALISHIRING", numRows = 4', output: '"PINALSIGYAHRPI"' },
        { input: 's = "A", numRows = 1', output: '"A"' }
      ]
    },
    {
      id: 10,
      title: 'Find the Index of the First Occurrence in a String',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/',
      description: 'Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.',
      explanation: `**Problem:** Find first occurrence of substring (needle) in string (haystack).

**Key Insight: Sliding Window Pattern Matching**
Check each position in haystack as potential start of needle.

**Approach 1: Brute Force**
For each position in haystack, check if needle matches starting there.

**Algorithm:**
1. For each position i in haystack (0 to n-m):
   - Check if haystack[i:i+m] equals needle
   - If match, return i
2. If no match found, return -1

**Example: haystack="hello", needle="ll"**
i=0: "he" != "ll"
i=1: "el" != "ll"
i=2: "ll" == "ll" ✓ return 2

**Optimization: KMP Algorithm**
Advanced: O(n+m) using pattern preprocessing.
Brute force is O(n*m) but simpler and sufficient for most cases.

**Complexity:**
- Time: O(n*m) brute force, O(n+m) KMP
- Space: O(1) brute force, O(m) KMP`,
      pseudocode: `Approach: Brute Force
-----------------------
strStr(haystack, needle):
    if needle is empty:
        return 0

    n = length(haystack)
    m = length(needle)

    for i from 0 to n-m:
        // Check if needle matches at position i
        if haystack[i:i+m] == needle:
            return i

    return -1

Example: haystack="hello", needle="ll"
-----------------------
n=5, m=2
i=0: "he" != "ll"
i=1: "el" != "ll"
i=2: "ll" == "ll" → return 2

Example: haystack="aaaaa", needle="bba"
-----------------------
n=5, m=3
i=0: "aaa" != "bba"
i=1: "aaa" != "bba"
i=2: "aaa" != "bba"
Return -1

Character-by-Character Check:
-----------------------
strStr(haystack, needle):
    for i from 0 to n-m:
        match = true
        for j from 0 to m-1:
            if haystack[i+j] != needle[j]:
                match = false
                break
        if match:
            return i
    return -1`,
      code: {
        java: {
          starterCode: `public int strStr(String haystack, String needle) {
    // Write your code here

}`,
          solution: `// Approach: Brute Force - O(n*m) time, O(1) space
public int strStr(String haystack, String needle) {
    if (needle.isEmpty()) return 0;

    int n = haystack.length();
    int m = needle.length();

    for (int i = 0; i <= n - m; i++) {
        if (haystack.substring(i, i + m).equals(needle)) {
            return i;
        }
    }

    return -1;
}

// Approach 2: Character-by-Character
public int strStr(String haystack, String needle) {
    if (needle.isEmpty()) return 0;

    int n = haystack.length();
    int m = needle.length();

    for (int i = 0; i <= n - m; i++) {
        int j;
        for (j = 0; j < m; j++) {
            if (haystack.charAt(i + j) != needle.charAt(j)) {
                break;
            }
        }
        if (j == m) return i;
    }

    return -1;
}`
        },
        python: {
          starterCode: `def strStr(self, haystack: str, needle: str) -> int:
    # Write your code here
    pass`,
          solution: `# Approach: Brute Force - O(n*m) time, O(1) space
def strStr(self, haystack: str, needle: str) -> int:
    if not needle:
        return 0

    n, m = len(haystack), len(needle)

    for i in range(n - m + 1):
        if haystack[i:i+m] == needle:
            return i

    return -1

# Python built-in
def strStr(self, haystack: str, needle: str) -> int:
    return haystack.find(needle)`
        }
      },
      testCases: [
        { haystack: 'sadbutsad', needle: 'sad', expected: 0 },
        { haystack: 'leetcode', needle: 'leeto', expected: -1 }
      ],
      examples: [
        { input: 'haystack = "sadbutsad", needle = "sad"', output: '0', explanation: '"sad" occurs at index 0 and 6. First occurrence is at index 0.' },
        { input: 'haystack = "leetcode", needle = "leeto"', output: '-1', explanation: '"leeto" did not occur in "leetcode"' }
      ]
    },
    {
      id: 11,
      title: 'Text Justification',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/text-justification/',
      description: 'Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified. You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces when necessary so that each line has exactly maxWidth characters.',
      explanation: `**Problem:** Format text with full justification (left and right aligned).

**Key Insight: Greedy Line Packing + Space Distribution**
Pack max words per line, distribute spaces evenly.

**Rules:**
1. Pack as many words as possible per line
2. Distribute extra spaces as evenly as possible
3. Extra spaces go left to right if can't distribute evenly
4. Last line: left-justified only (spaces on right)

**Algorithm:**
1. Group words into lines (greedy - fit max words)
2. For each line except last:
   - Calculate spaces needed
   - Distribute evenly between words
   - Extra spaces go to leftmost gaps
3. Last line: one space between words, rest on right

**Example: words=["This","is","an","example"], maxWidth=16**
Line 1: "This    is    an" (7 chars + 9 spaces)
  - 3 words, 7 chars, need 9 spaces
  - 2 gaps: 9/2=4 spaces each, 9%2=1 extra
  - First gap gets 5, second gets 4
Line 2: "example         " (last line, left-justified)

**Space Distribution:**
totalSpaces = maxWidth - totalChars
gaps = numWords - 1
spacesPerGap = totalSpaces / gaps
extraSpaces = totalSpaces % gaps
First 'extraSpaces' gaps get one more space

**Complexity:**
- Time: O(n) where n is total characters
- Space: O(maxWidth) for building lines`,
      pseudocode: `Algorithm:
-----------------------
fullJustify(words, maxWidth):
    result = []
    currentLine = []
    numChars = 0

    for word in words:
        // Check if word fits in current line
        // Need: word.length + spaces between words
        if numChars + len(word) + len(currentLine) > maxWidth:
            // Justify and add current line
            result.append(justify(currentLine, numChars, maxWidth, false))
            currentLine = []
            numChars = 0

        currentLine.append(word)
        numChars += len(word)

    // Last line: left-justified
    result.append(justify(currentLine, numChars, maxWidth, true))

    return result

justify(words, numChars, maxWidth, isLastLine):
    if isLastLine OR len(words) == 1:
        // Left-justified
        line = words.join(' ')
        return line + ' ' * (maxWidth - len(line))

    // Full justification
    totalSpaces = maxWidth - numChars
    gaps = len(words) - 1
    spacesPerGap = totalSpaces / gaps
    extraSpaces = totalSpaces % gaps

    line = ""
    for i from 0 to len(words)-1:
        line += words[i]
        if i < gaps:
            // Add base spaces
            line += ' ' * spacesPerGap
            // Add extra space to first 'extraSpaces' gaps
            if i < extraSpaces:
                line += ' '

    return line

Example: ["This","is","an","example"], maxWidth=16
-----------------------
Line 1: ["This","is","an"]
  numChars=7, gaps=2
  totalSpaces=16-7=9
  spacesPerGap=9/2=4
  extraSpaces=9%2=1
  Result: "This" + 5 spaces + "is" + 4 spaces + "an"
         = "This    is    an"

Line 2: ["example"] (last line)
  Left-justified: "example" + 9 spaces
                = "example         "`,
      code: {
        java: {
          starterCode: `public List<String> fullJustify(String[] words, int maxWidth) {
    // Write your code here

}`,
          solution: `// Approach: Greedy + Space Distribution - O(n) time, O(maxWidth) space
public List<String> fullJustify(String[] words, int maxWidth) {
    List<String> result = new ArrayList<>();
    List<String> currentLine = new ArrayList<>();
    int numChars = 0;

    for (String word : words) {
        // Check if adding this word exceeds maxWidth
        if (numChars + word.length() + currentLine.size() > maxWidth) {
            // Justify current line
            result.add(justify(currentLine, numChars, maxWidth, false));
            currentLine.clear();
            numChars = 0;
        }
        currentLine.add(word);
        numChars += word.length();
    }

    // Last line: left-justified
    result.add(justify(currentLine, numChars, maxWidth, true));
    return result;
}

private String justify(List<String> words, int numChars, int maxWidth, boolean isLastLine) {
    StringBuilder line = new StringBuilder();

    if (isLastLine || words.size() == 1) {
        // Left-justified
        for (int i = 0; i < words.size(); i++) {
            line.append(words.get(i));
            if (i < words.size() - 1) line.append(' ');
        }
        while (line.length() < maxWidth) {
            line.append(' ');
        }
        return line.toString();
    }

    // Full justification
    int totalSpaces = maxWidth - numChars;
    int gaps = words.size() - 1;
    int spacesPerGap = totalSpaces / gaps;
    int extraSpaces = totalSpaces % gaps;

    for (int i = 0; i < words.size(); i++) {
        line.append(words.get(i));
        if (i < gaps) {
            for (int j = 0; j < spacesPerGap; j++) {
                line.append(' ');
            }
            if (i < extraSpaces) {
                line.append(' ');
            }
        }
    }

    return line.toString();
}`
        },
        python: {
          starterCode: `def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
    # Write your code here
    pass`,
          solution: `# Approach: Greedy + Space Distribution - O(n) time, O(maxWidth) space
def fullJustify(self, words: List[str], maxWidth: int) -> List[str]:
    result = []
    current_line = []
    num_chars = 0

    for word in words:
        # Check if adding this word exceeds maxWidth
        if num_chars + len(word) + len(current_line) > maxWidth:
            # Justify current line
            result.append(self.justify(current_line, num_chars, maxWidth, False))
            current_line = []
            num_chars = 0

        current_line.append(word)
        num_chars += len(word)

    # Last line: left-justified
    result.append(self.justify(current_line, num_chars, maxWidth, True))
    return result

def justify(self, words, num_chars, max_width, is_last_line):
    if is_last_line or len(words) == 1:
        # Left-justified
        line = ' '.join(words)
        return line + ' ' * (max_width - len(line))

    # Full justification
    total_spaces = max_width - num_chars
    gaps = len(words) - 1
    spaces_per_gap = total_spaces // gaps
    extra_spaces = total_spaces % gaps

    line = []
    for i, word in enumerate(words):
        line.append(word)
        if i < gaps:
            line.append(' ' * spaces_per_gap)
            if i < extra_spaces:
                line.append(' ')

    return ''.join(line)`
        }
      },
      testCases: [
        { words: ['This','is','an','example','of','text','justification.'], maxWidth: 16, expected: ['This    is    an','example  of text','justification.  '] },
        { words: ['What','must','be','acknowledgment','shall','be'], maxWidth: 16, expected: ['What   must   be','acknowledgment  ','shall be        '] }
      ],
      examples: [
        {
          input: 'words = ["This","is","an","example","of","text","justification."], maxWidth = 16',
          output: '["This    is    an","example  of text","justification.  "]'
        },
        {
          input: 'words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16',
          output: '["What   must   be","acknowledgment  ","shall be        "]'
        }
      ]
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Strings-${q.id}`)).length
    return { completed, total: questions.length, percentage: Math.round((completed / questions.length) * 100) }
  }

  const stats = getCompletionStats()

  // Group questions by difficulty
  const groupedQuestions = {
    Easy: questions.filter(q => q.difficulty === 'Easy'),
    Medium: questions.filter(q => q.difficulty === 'Medium'),
    Hard: questions.filter(q => q.difficulty === 'Hard')
  }

  // Flatten visible questions for keyboard navigation
  const visibleQuestions = Object.entries(groupedQuestions)
    .filter(([difficulty]) => expandedSections[difficulty])
    .flatMap(([, qs]) => qs)

  // Keyboard navigation for problem list
  const { focusedIndex, setFocusedIndex, itemRefs } = useKeyboardNavigation({
    items: visibleQuestions,
    onSelect: (question) => selectQuestion(question),
    onEscape: onBack,
    enabled: !selectedQuestion && visibleQuestions.length > 0,
    gridColumns: 2,
    loop: true
  })

  // Get the index of a question in the visible list
  const getVisibleIndex = (question) => {
    return visibleQuestions.findIndex(q => q.id === question.id)
  }

  const selectQuestion = (question) => {
    setSelectedQuestion(question)
    setShowSolution(false)
    setShowExplanation(false)
    setUserCode(question.code[language].starterCode)
    setOutput('')
    setShowDrawing(false)
    // Load existing drawing for this problem
    const savedDrawing = localStorage.getItem(`drawing-Strings-${question.id}`)
    setCurrentDrawing(savedDrawing)
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
    // Create extended breadcrumb with problem title
    const problemBreadcrumb = {
      ...breadcrumb,
      category: { name: 'Strings', onClick: () => setSelectedQuestion(null) },
      topic: selectedQuestion.title
    }

    return (
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            ← Back to Strings
          </button>
          <LanguageToggle />
        </div>

        <Breadcrumb breadcrumb={problemBreadcrumb} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Problem Description */}
          <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#93c5fd', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <CompletionCheckbox problemId={`Strings-${selectedQuestion.id}`} />
              <BookmarkButton
                problemId={`Strings-${selectedQuestion.id}`}
                problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'Strings' }}
              />
            </div>

            {selectedQuestion.leetcodeUrl && (
              <a href={selectedQuestion.leetcodeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
                View on LeetCode ↗
              </a>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#93c5fd', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#93c5fd', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ backgroundColor: '#374151', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #4b5563', color: '#e2e8f0' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#e2e8f0' }}>Input:</strong> <code style={{ color: '#e2e8f0' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: '#e2e8f0' }}>Output:</strong> <code style={{ color: '#e2e8f0' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#93c5fd', marginBottom: '0.75rem' }}>💡 Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#1e3a5a', borderRadius: '8px', border: '1px solid #3b82f6' }}>
                <h3 style={{ fontSize: '1rem', color: '#93c5fd', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#93c5fd' }}>⏱️ Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#93c5fd' }}>💾 Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' , flexWrap: 'wrap' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
              </button>
              <button onClick={() => setShowDrawing(true)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: currentDrawing ? '#8b5cf6' : '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                🎨 {currentDrawing ? 'View' : 'Draw'} Sketch
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5', backgroundColor: '#1e293b', color: '#e2e8f0' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#93c5fd', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#374151', padding: '1rem', borderRadius: '8px', border: '1px solid #4b5563', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px', color: '#e2e8f0' }}>{output}</pre>
              </div>
            )}
          </div>
        </div>
        {/* Drawing Canvas Modal */}
        <DrawingCanvas
          isOpen={showDrawing}
          onClose={() => {
            setShowDrawing(false)
            // Reload drawing in case it was updated
            const savedDrawing = localStorage.getItem(`drawing-Strings-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`Strings-${selectedQuestion.id}`}
          existingDrawing={currentDrawing}
        />
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'} onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}>
          ← Back
        </button>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, #93c5fd, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>🔤 Strings</h1>
        <p style={{ fontSize: '1.2rem', color: '#d1d5db' }}>Master strings problems</p>

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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }} role="list" aria-label={`${difficulty} problems`}>
                {difficultyQuestions.map((question) => {
                  const visibleIndex = getVisibleIndex(question)
                  const isFocused = focusedIndex === visibleIndex
                  return (
                  <div
                    key={question.id}
                    ref={(el) => { if (el) itemRefs.current[visibleIndex] = el }}
                    tabIndex={0}
                    role="button"
                    aria-label={`${question.title}, ${question.difficulty} difficulty`}
                    className={isFocused ? 'problem-card-focused' : ''}
                    onClick={() => selectQuestion(question)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        selectQuestion(question)
                      }
                    }}
                    onFocus={() => setFocusedIndex(visibleIndex)}
                    style={{
                      backgroundColor: '#1f2937',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: isFocused ? '2px solid #60a5fa' : '2px solid #374151',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)'; e.currentTarget.style.borderColor = '#3b82f6' }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = isFocused ? '#60a5fa' : '#374151' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#93c5fd', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#d1d5db', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`Strings-${question.id}`} />
                        </div>
                        <BookmarkButton
                          size="small"
                          problemId={`Strings-${question.id}`}
                          problemData={{ title: question.title, difficulty: question.difficulty, category: 'Strings' }}
                        />
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
                  )
                })}
              </div>
            )}
          </div>
        )
      ))}
    </div>
  )
}

export default Strings
