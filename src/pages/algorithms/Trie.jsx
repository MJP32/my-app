import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function Trie({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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
      title: 'Implement Trie (Prefix Tree)',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
      description: 'Implement a Trie with insert, search, and startsWith methods. A trie is a tree data structure used for efficient string searching.',
      example: `Operations:
insert("apple")
search("apple") → true
search("app") → false
startsWith("app") → true
insert("app")
search("app") → true`,
      explanation: `**Problem:** Implement a Trie (prefix tree) with insert, search, and startsWith operations.

**What is a Trie?**
A Trie is a tree data structure where each node represents a character. Words are stored by following a path from root to a node marked as "end of word".

**Key Insight:** Use a TrieNode with:
1. **children**: Array (size 26 for lowercase letters) or HashMap for flexible character set
2. **isEndOfWord**: Boolean flag to mark complete words

**Why Trie?**
- Fast prefix-based operations (autocomplete, spell check)
- Time: O(m) for all operations (m = word length) vs O(n*m) for naive array search
- Better than HashSet for prefix queries

**Implementation Approach:**

**1. TrieNode Structure:**
- Array approach: children = new TrieNode[26] (faster, fixed alphabet)
- HashMap approach: children = new HashMap<>() (flexible, any characters)

**2. Insert Operation:**
- Start at root, iterate through word characters
- For each character: if child doesn't exist, create new node
- Move to child node
- Mark last node as isEndOfWord = true

**3. Search Operation:**
- Traverse trie following the word's characters
- If any character not found → return false
- If reach end → return node.isEndOfWord (exact word match)

**4. StartsWith Operation:**
- Similar to search, but don't check isEndOfWord
- Just verify the prefix path exists

**Complexity:**
- Time: O(m) for insert/search/startsWith where m = word length
- Space: O(ALPHABET_SIZE * N * M) where N = number of words, M = average length`,
      pseudocode: `TrieNode Structure:
-----------------------
class TrieNode:
    children = new TrieNode[26]  // or HashMap
    isEndOfWord = false

Insert(word):
-----------------------
node = root
for each char in word:
    index = char - 'a'
    if node.children[index] is null:
        node.children[index] = new TrieNode()
    node = node.children[index]
node.isEndOfWord = true

Search(word):
-----------------------
node = searchNode(word)
return node != null AND node.isEndOfWord

StartsWith(prefix):
-----------------------
return searchNode(prefix) != null

SearchNode(str):  // Helper function
-----------------------
node = root
for each char in str:
    index = char - 'a'
    if node.children[index] is null:
        return null
    node = node.children[index]
return node

Example: Insert "apple", Search "app"
-----------------------
After insert("apple"):
root → a → p → p → l → e (isEndOfWord=true)

search("app"):
- Traverse: root → a → p → p
- Reached end of "app", but isEndOfWord=false at last 'p' node
- Return false (not a complete word)

startsWith("app"):
- Traverse: root → a → p → p
- Path exists, return true

After insert("app"):
root → a → p → p (isEndOfWord=true) → l → e (isEndOfWord=true)

search("app"):
- Now returns true because 'p' node has isEndOfWord=true`,
      code: {
        java: {
          starterCode: `class Trie {
    // TODO: Define TrieNode class

    public Trie() {
        // TODO: Initialize root

    }

    public void insert(String word) {
        // TODO: Insert word into trie

    }

    public boolean search(String word) {
        // TODO: Search for exact word

        return false;
    }

    public boolean startsWith(String prefix) {
        // TODO: Check if any word starts with prefix

        return false;
    }
}`,
          solution: `class Trie {
    class TrieNode {
        TrieNode[] children;
        boolean isEndOfWord;

        public TrieNode() {
            children = new TrieNode[26]; // 26 lowercase letters
            isEndOfWord = false;
        }
    }

    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode node = root;

        for (char c : word.toCharArray()) {
            int index = c - 'a';

            if (node.children[index] == null) {
                node.children[index] = new TrieNode();
            }

            node = node.children[index];
        }

        node.isEndOfWord = true;
    }

    public boolean search(String word) {
        TrieNode node = searchNode(word);
        return node != null && node.isEndOfWord;
    }

    public boolean startsWith(String prefix) {
        return searchNode(prefix) != null;
    }

    private TrieNode searchNode(String str) {
        TrieNode node = root;

        for (char c : str.toCharArray()) {
            int index = c - 'a';

            if (node.children[index] == null) {
                return null;
            }

            node = node.children[index];
        }

        return node;
    }
}

// Alternative: With HashMap for more flexible character set
class TrieWithMap {
    class TrieNode {
        Map<Character, TrieNode> children;
        boolean isEndOfWord;

        public TrieNode() {
            children = new HashMap<>();
            isEndOfWord = false;
        }
    }

    private TrieNode root;

    public TrieWithMap() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode node = root;

        for (char c : word.toCharArray()) {
            node.children.putIfAbsent(c, new TrieNode());
            node = node.children.get(c);
        }

        node.isEndOfWord = true;
    }

    public boolean search(String word) {
        TrieNode node = searchNode(word);
        return node != null && node.isEndOfWord;
    }

    public boolean startsWith(String prefix) {
        return searchNode(prefix) != null;
    }

    private TrieNode searchNode(String str) {
        TrieNode node = root;

        for (char c : str.toCharArray()) {
            if (!node.children.containsKey(c)) {
                return null;
            }
            node = node.children.get(c);
        }

        return node;
    }
}`
        },
        python: {
          starterCode: `class Trie:
    def __init__(self):
        # TODO: Initialize trie
        pass

    def insert(self, word: str) -> None:
        # TODO: Insert word into trie
        pass

    def search(self, word: str) -> bool:
        # TODO: Search for exact word
        pass

    def startsWith(self, prefix: str) -> bool:
        # TODO: Check if any word starts with prefix
        pass`,
          solution: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root

        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]

        node.is_end_of_word = True

    def search(self, word: str) -> bool:
        node = self._search_node(word)
        return node is not None and node.is_end_of_word

    def startsWith(self, prefix: str) -> bool:
        return self._search_node(prefix) is not None

    def _search_node(self, s: str) -> TrieNode:
        node = self.root

        for char in s:
            if char not in node.children:
                return None
            node = node.children[char]

        return node


# Alternative: Using defaultdict
from collections import defaultdict

class TrieWithDefaultDict:
    def __init__(self):
        self.root = lambda: defaultdict(self.root)
        self.root = self.root()
        self.end_key = '#'

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            node = node[char]
        node[self.end_key] = True

    def search(self, word: str) -> bool:
        node = self.root
        for char in word:
            if char not in node:
                return False
            node = node[char]
        return self.end_key in node

    def startsWith(self, prefix: str) -> bool:
        node = self.root
        for char in prefix:
            if char not in node:
                return False
            node = node[char]
        return True`
        }
      },
      testCases: [
        { input: 'insert("apple"), search("apple")', output: 'true' },
        { input: 'search("app")', output: 'false' },
        { input: 'startsWith("app")', output: 'true' }
      ]
    },
    {
      id: 2,
      title: 'Word Search II',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/',
      description: 'Find all words from a dictionary that exist in a 2D board. Each word must be constructed from letters of sequentially adjacent cells (horizontally or vertically).',
      example: `Input: board = [
  ['o','a','a','n'],
  ['e','t','a','e'],
  ['i','h','k','r'],
  ['i','f','l','v']
], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]`,
      explanation: `**Problem:** Find all dictionary words that can be formed on a 2D board where each word uses adjacent cells (horizontal/vertical).

**Key Insight:** This is a classic Trie + DFS combination problem!

**Why Trie?**
Without Trie, we'd do DFS for each word separately → O(words * M * N * 4^L)
With Trie, we do DFS once and find all words simultaneously → O(M * N * 4^L)

The Trie allows us to:
1. **Prune early**: If current path doesn't match any word prefix, stop exploring
2. **Find multiple words**: Discover all matching words in a single DFS pass
3. **Avoid duplicates**: Mark found words as null to prevent re-adding

**Approach:**

**Step 1: Build Trie from Dictionary**
- Insert all words into trie
- Store the complete word at the end node (for easy retrieval)

**Step 2: DFS from Each Cell**
- Start DFS from every cell on the board
- At each cell, check if current character exists in current trie node's children
- If it doesn't → prune this path (no word has this prefix)
- If it does → continue DFS to adjacent cells

**Step 3: Word Detection**
- When we reach a node with word != null → found a complete word!
- Add to result and set word = null (avoid duplicates)

**Step 4: Backtracking**
- Mark cell as visited during exploration (use '#' or boolean array)
- Explore 4 neighbors (up, down, left, right)
- Restore cell value after exploration (backtrack)

**Optimization: Trie Pruning**
- Add a "refs" counter to each TrieNode tracking how many words use it
- When a word is found, decrement refs along its path
- If refs reaches 0 → no more words use this branch, prune it

**Why This Works:**
- Trie structure naturally matches prefix exploration
- DFS naturally matches adjacent cell traversal
- Together they eliminate redundant path exploration

**Complexity:**
- Time: O(M * N * 4^L) where M,N = board dimensions, L = max word length
  - Build trie: O(sum of all word lengths)
  - DFS: From each cell, explore up to 4^L paths
- Space: O(total characters in all words) for trie`,
      pseudocode: `Build Trie:
-----------------------
root = new TrieNode()
for each word in words:
    node = root
    for each char in word:
        if char not in node.children:
            node.children[char] = new TrieNode()
        node = node.children[char]
    node.word = word  // Store complete word

DFS Search:
-----------------------
function dfs(i, j, node, result):
    char = board[i][j]

    // Early termination
    if char == '#' or char not in node.children:
        return

    node = node.children[char]

    // Found a word!
    if node.word != null:
        result.add(node.word)
        node.word = null  // Prevent duplicates

    // Mark as visited
    board[i][j] = '#'

    // Explore 4 neighbors
    for each direction (up, down, left, right):
        ni, nj = neighbor coordinates
        if valid(ni, nj):
            dfs(ni, nj, node, result)

    // Backtrack (restore cell)
    board[i][j] = char

Main:
-----------------------
for i in 0 to rows:
    for j in 0 to cols:
        dfs(i, j, root, result)
return result

Example Walkthrough:
-----------------------
board = [['o','a'], ['e','t']]
words = ["oat", "eat"]

After building trie:
root → o → a → t (word="oat")
     → e → a → t (word="eat")

DFS from (0,0) 'o':
- 'o' in root.children → continue
- Explore neighbors: (0,1) 'a', (1,0) 'e'
- Path o→a: 'a' in node.children → continue
  - Explore (1,1) 't': o→a→t found! Add "oat"

DFS from (1,0) 'e':
- 'e' in root.children → continue
- Explore (0,0) 'o', (1,1) 't'
- Path e→(0,0)→(0,1): marks as e→'#'→'#', but 'o' path already explored
- Better: e→a→t from different starting point

With Pruning (refs counter):
-----------------------
class TrieNode:
    children, word, refs = 0

When building trie:
    node.refs++  // Count words using this node

When word found:
    node.refs--  // Decrement count
    if node.refs <= 0: return  // Prune branch`,
      code: {
        java: {
          starterCode: `public List<String> findWords(char[][] board, String[] words) {
    // TODO: Use Trie for efficient word search

    return new ArrayList<>();
}`,
          solution: `class Solution {
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        String word = null;
    }

    private TrieNode root = new TrieNode();

    public List<String> findWords(char[][] board, String[] words) {
        // Build trie from words
        for (String word : words) {
            TrieNode node = root;
            for (char c : word.toCharArray()) {
                int index = c - 'a';
                if (node.children[index] == null) {
                    node.children[index] = new TrieNode();
                }
                node = node.children[index];
            }
            node.word = word;
        }

        List<String> result = new ArrayList<>();

        // DFS from each cell
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                dfs(board, i, j, root, result);
            }
        }

        return result;
    }

    private void dfs(char[][] board, int i, int j, TrieNode node, List<String> result) {
        char c = board[i][j];

        if (c == '#' || node.children[c - 'a'] == null) {
            return;
        }

        node = node.children[c - 'a'];

        // Found a word
        if (node.word != null) {
            result.add(node.word);
            node.word = null; // Avoid duplicates
        }

        // Mark visited
        board[i][j] = '#';

        // Explore neighbors
        if (i > 0) dfs(board, i - 1, j, node, result);
        if (i < board.length - 1) dfs(board, i + 1, j, node, result);
        if (j > 0) dfs(board, i, j - 1, node, result);
        if (j < board[0].length - 1) dfs(board, i, j + 1, node, result);

        // Restore cell
        board[i][j] = c;
    }
}

// Optimized version with trie pruning
class SolutionOptimized {
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        String word = null;
        int refs = 0; // Count of words using this node
    }

    private TrieNode root = new TrieNode();

    public List<String> findWords(char[][] board, String[] words) {
        for (String word : words) {
            TrieNode node = root;
            for (char c : word.toCharArray()) {
                int index = c - 'a';
                if (node.children[index] == null) {
                    node.children[index] = new TrieNode();
                }
                node = node.children[index];
                node.refs++;
            }
            node.word = word;
        }

        List<String> result = new ArrayList<>();

        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                dfs(board, i, j, root, result);
            }
        }

        return result;
    }

    private void dfs(char[][] board, int i, int j, TrieNode node, List<String> result) {
        char c = board[i][j];

        if (c == '#' || node.children[c - 'a'] == null) {
            return;
        }

        node = node.children[c - 'a'];

        if (node.word != null) {
            result.add(node.word);
            node.word = null;
            node.refs--;
        }

        if (node.refs <= 0) {
            return; // Prune branch
        }

        board[i][j] = '#';

        if (i > 0) dfs(board, i - 1, j, node, result);
        if (i < board.length - 1) dfs(board, i + 1, j, node, result);
        if (j > 0) dfs(board, i, j - 1, node, result);
        if (j < board[0].length - 1) dfs(board, i, j + 1, node, result);

        board[i][j] = c;
    }
}`
        },
        python: {
          starterCode: `def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
    # TODO: Use Trie for efficient word search
    pass`,
          solution: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.word = None


class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        # Build trie
        root = TrieNode()
        for word in words:
            node = root
            for char in word:
                if char not in node.children:
                    node.children[char] = TrieNode()
                node = node.children[char]
            node.word = word

        result = []
        rows, cols = len(board), len(board[0])

        def dfs(i, j, node):
            char = board[i][j]

            if char == '#' or char not in node.children:
                return

            node = node.children[char]

            # Found a word
            if node.word:
                result.append(node.word)
                node.word = None  # Avoid duplicates

            # Mark visited
            board[i][j] = '#'

            # Explore neighbors
            for di, dj in [(-1,0), (1,0), (0,-1), (0,1)]:
                ni, nj = i + di, j + dj
                if 0 <= ni < rows and 0 <= nj < cols:
                    dfs(ni, nj, node)

            # Restore cell
            board[i][j] = char

        # DFS from each cell
        for i in range(rows):
            for j in range(cols):
                dfs(i, j, root)

        return result


# Optimized with trie pruning
class SolutionOptimized:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        class TrieNode:
            def __init__(self):
                self.children = {}
                self.word = None
                self.refs = 0

        root = TrieNode()

        for word in words:
            node = root
            for char in word:
                if char not in node.children:
                    node.children[char] = TrieNode()
                node = node.children[char]
                node.refs += 1
            node.word = word

        result = []
        rows, cols = len(board), len(board[0])

        def dfs(i, j, node):
            char = board[i][j]

            if char == '#' or char not in node.children:
                return

            node = node.children[char]

            if node.word:
                result.append(node.word)
                node.word = None
                node.refs -= 1

            if node.refs <= 0:
                return  # Prune branch

            board[i][j] = '#'

            for di, dj in [(-1,0), (1,0), (0,-1), (0,1)]:
                ni, nj = i + di, j + dj
                if 0 <= ni < rows and 0 <= nj < cols:
                    dfs(ni, nj, node)

            board[i][j] = char

        for i in range(rows):
            for j in range(cols):
                dfs(i, j, root)

        return result`
        }
      },
      testCases: [
        { input: 'board = [["o","a","a","n"]], words = ["oath","pea"]', output: '["oath"]' },
        { input: 'board = [["a","a"]], words = ["aaa"]', output: '[]' }
      ]
    },
    {
      id: 3,
      title: 'Design Add and Search Words Data Structure',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/',
      description: 'Design a data structure that supports adding words and searching with wildcard \'.\' that can match any letter.',
      example: `Operations:
addWord("bad")
addWord("dad")
addWord("mad")
search("pad") → false
search("bad") → true
search(".ad") → true
search("b..") → true`,
      explanation: `**Problem:** Design a dictionary that supports adding words and searching with wildcard '.' that matches any single letter.

**Key Insight:** Use a Trie with recursive search to handle wildcards!

**Why Trie?**
- Normal insert operation works exactly like basic Trie
- Search needs special handling for '.' wildcard
- Wildcard means "match any character" → try all possible children

**Approach:**

**1. Add Word (Standard Trie Insert):**
- Traverse character by character
- Create new nodes as needed
- Mark last node as isEndOfWord = true
- Time: O(m) where m = word length

**2. Search with Wildcard (Recursive DFS):**
- Base case: if reached end of word, return node.isEndOfWord
- For regular character (a-z):
  - Check if child exists for that character
  - If yes → recursively search from that child
  - If no → return false
- For wildcard '.':
  - Must try ALL possible children (0-25 for array, or all keys in HashMap)
  - Recursively search from each child
  - If ANY path returns true → found a match!

**Why Recursive?**
When we encounter '.', we don't know which path to take. We need to explore all possibilities:
- search("b.d") with trie containing "bad", "bed", "bid"
- At '.', we try children[0-25]
- Paths: b→a→d (match!), b→e→d (match!), b→i→d (match!)

**Key Difference from Basic Trie:**
- Basic Trie: Iterative search works (deterministic path)
- With wildcard: Need recursion/backtracking (multiple possible paths)

**Edge Cases:**
- Empty word: return true only if at root with isEndOfWord = true
- All wildcards "...": match any 3-letter word
- Wildcard at end "ba.": match "bad", "bat", "bag", etc.

**Optimization:**
- For words without '.', use iterative search (faster)
- Only use recursive search when '.' is present

**Complexity:**
- addWord: O(m) where m = word length
- search without wildcards: O(m)
- search with wildcards: O(26^k) where k = number of wildcards
  - Worst case: all wildcards "..." → must try all paths`,
      pseudocode: `AddWord(word):
-----------------------
node = root
for each char in word:
    if char not in node.children:
        node.children[char] = new TrieNode()
    node = node.children[char]
node.isEndOfWord = true

Search(word):
-----------------------
return searchHelper(word, 0, root)

SearchHelper(word, index, node):
-----------------------
// Base case: reached end of word
if index == word.length:
    return node.isEndOfWord

char = word[index]

if char == '.':
    // Wildcard: try all children
    for each child in node.children:
        if child != null:
            if searchHelper(word, index + 1, child):
                return true  // Found match in one path
    return false  // No path matched

else:
    // Regular character
    if char not in node.children:
        return false
    return searchHelper(word, index + 1, node.children[char])

Example: search(".ad")
-----------------------
Trie contains: "bad", "dad", "mad"

root → b → a → d (isEndOfWord)
     → d → a → d (isEndOfWord)
     → m → a → d (isEndOfWord)

searchHelper(".ad", 0, root):
- char = '.' → try all children
  - Try 'b': searchHelper(".ad", 1, node_b)
    - char = 'a' → follow 'a' child
      - searchHelper(".ad", 2, node_a)
        - char = 'd' → follow 'd' child
          - searchHelper(".ad", 3, node_d)
            - index == 3 → return node_d.isEndOfWord = true ✓
  - Found match! Return true

Example: search("pad")
-----------------------
searchHelper("pad", 0, root):
- char = 'p' → check root.children['p']
  - null! (no words start with 'p')
  - return false

Example: search("b..")
-----------------------
- Start at root, char = 'b' → go to node_b
- index = 1, char = '.' → try all children of node_b
  - Only child is 'a' → go to node_a
- index = 2, char = '.' → try all children of node_a
  - Only child is 'd' → go to node_d
  - Check isEndOfWord = true ✓`,
      code: {
        java: {
          starterCode: `class WordDictionary {
    // TODO: Define TrieNode

    public WordDictionary() {
        // TODO: Initialize

    }

    public void addWord(String word) {
        // TODO: Add word

    }

    public boolean search(String word) {
        // TODO: Search with wildcard support

        return false;
    }
}`,
          solution: `class WordDictionary {
    class TrieNode {
        TrieNode[] children;
        boolean isEndOfWord;

        public TrieNode() {
            children = new TrieNode[26];
            isEndOfWord = false;
        }
    }

    private TrieNode root;

    public WordDictionary() {
        root = new TrieNode();
    }

    public void addWord(String word) {
        TrieNode node = root;

        for (char c : word.toCharArray()) {
            int index = c - 'a';
            if (node.children[index] == null) {
                node.children[index] = new TrieNode();
            }
            node = node.children[index];
        }

        node.isEndOfWord = true;
    }

    public boolean search(String word) {
        return searchHelper(word, 0, root);
    }

    private boolean searchHelper(String word, int index, TrieNode node) {
        if (index == word.length()) {
            return node.isEndOfWord;
        }

        char c = word.charAt(index);

        if (c == '.') {
            // Wildcard: try all children
            for (TrieNode child : node.children) {
                if (child != null && searchHelper(word, index + 1, child)) {
                    return true;
                }
            }
            return false;
        } else {
            // Regular character
            int i = c - 'a';
            if (node.children[i] == null) {
                return false;
            }
            return searchHelper(word, index + 1, node.children[i]);
        }
    }
}

// Alternative: Iterative search for non-wildcard
class WordDictionaryOptimized {
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean isEndOfWord = false;
    }

    private TrieNode root = new TrieNode();

    public void addWord(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int i = c - 'a';
            if (node.children[i] == null) {
                node.children[i] = new TrieNode();
            }
            node = node.children[i];
        }
        node.isEndOfWord = true;
    }

    public boolean search(String word) {
        return dfs(word, 0, root);
    }

    private boolean dfs(String word, int idx, TrieNode node) {
        if (idx == word.length()) {
            return node.isEndOfWord;
        }

        char c = word.charAt(idx);

        if (c == '.') {
            for (int i = 0; i < 26; i++) {
                if (node.children[i] != null && dfs(word, idx + 1, node.children[i])) {
                    return true;
                }
            }
            return false;
        }

        int i = c - 'a';
        return node.children[i] != null && dfs(word, idx + 1, node.children[i]);
    }
}`
        },
        python: {
          starterCode: `class WordDictionary:
    def __init__(self):
        # TODO: Initialize
        pass

    def addWord(self, word: str) -> None:
        # TODO: Add word
        pass

    def search(self, word: str) -> bool:
        # TODO: Search with wildcard support
        pass`,
          solution: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False


class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word: str) -> None:
        node = self.root

        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]

        node.is_end_of_word = True

    def search(self, word: str) -> bool:
        return self._search_helper(word, 0, self.root)

    def _search_helper(self, word: str, index: int, node: TrieNode) -> bool:
        if index == len(word):
            return node.is_end_of_word

        char = word[index]

        if char == '.':
            # Wildcard: try all children
            for child in node.children.values():
                if self._search_helper(word, index + 1, child):
                    return True
            return False
        else:
            # Regular character
            if char not in node.children:
                return False
            return self._search_helper(word, index + 1, node.children[char])


# Alternative: More Pythonic with DFS
class WordDictionaryDFS:
    def __init__(self):
        self.root = {}

    def addWord(self, word: str) -> None:
        node = self.root
        for char in word:
            node = node.setdefault(char, {})
        node['#'] = True

    def search(self, word: str) -> bool:
        def dfs(idx, node):
            if idx == len(word):
                return '#' in node

            char = word[idx]

            if char == '.':
                return any(dfs(idx + 1, node[c]) for c in node if c != '#')

            if char not in node:
                return False

            return dfs(idx + 1, node[char])

        return dfs(0, self.root)`
        }
      },
      testCases: [
        { input: 'addWord("bad"), search("bad")', output: 'true' },
        { input: 'search(".ad")', output: 'true' },
        { input: 'search("b..")', output: 'true' }
      ]
    },
    {
      id: 4,
      title: 'Longest Word in Dictionary',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/longest-word-in-dictionary/',
      description: 'Find the longest word that can be built one character at a time by other words in the array. If multiple answers, return the lexicographically smallest.',
      example: `Input: words = ["w","wo","wor","worl","world"]
Output: "world"

Input: words = ["a","banana","app","appl","ap","apply","apple"]
Output: "apple"`,
      explanation: `**Problem:** Find the longest word that can be built one character at a time from other words in the array.

**Key Constraint:** A word is "buildable" only if all its prefixes exist as complete words in the array.
- "world" is buildable if "w", "wo", "wor", "worl" all exist
- "apple" is buildable if "a", "ap", "app", "appl" all exist
- "banana" is NOT buildable if "b" doesn't exist (even though "banana" exists)

**Key Insight:** Use Trie with DFS, but only explore paths where EVERY node along the way is marked as isEndOfWord!

**Why Trie?**
- Natural structure for prefix relationships
- Can store all words and their prefixes efficiently
- DFS from root explores only valid buildable words

**Approach 1: Trie + DFS**

**Step 1: Build Trie**
- Insert all words into trie
- Store complete word at each end node (for easy retrieval)

**Step 2: DFS with Constraint**
- Start DFS from root
- Key rule: Only recurse to child if child.word != null (i.e., that prefix is a complete word)
- This ensures we only explore buildable words

**Step 3: Track Longest**
- Keep track of longest word found
- If tie in length → choose lexicographically smaller (can use compareTo)

**Why This Works:**
- "world" requires "w", "wo", "wor", "worl" to exist
- DFS won't go beyond 'w' unless 'w' node has isEndOfWord = true
- DFS won't go beyond "wo" unless "wo" node has isEndOfWord = true
- And so on...

**Approach 2: Sorting + HashSet (Alternative)**

**Step 1: Sort words** (lexicographically)
- This ensures we process shorter words first
- Also ensures lexicographically smaller words come first

**Step 2: Use HashSet to track buildable words**
- Add empty string "" to set (base case)
- For each word:
  - Check if word[0:len-1] (prefix without last char) is in set
  - If yes → this word is buildable, add to set
  - If word is longer than current result → update result

**Why Sorting Works:**
- Process words in order ensures all prefixes are checked before longer words
- Lexicographic order naturally handles tie-breaking

**Comparison:**
- Trie approach: Better for large dictionaries with many shared prefixes
- Sorting approach: Simpler to implement, good for smaller datasets

**Complexity:**
- Trie:
  - Build: O(sum of all word lengths)
  - DFS: O(total nodes in valid paths)
  - Space: O(total characters in all words)
- Sorting:
  - Sort: O(n log n) where n = number of words
  - Check: O(n * m) where m = average word length
  - Space: O(n) for HashSet`,
      pseudocode: `Approach 1: Trie + DFS
-----------------------
Build Trie:
root = new TrieNode()
for each word in words:
    node = root
    for each char in word:
        if char not in node.children:
            node.children[char] = new TrieNode()
        node = node.children[char]
    node.word = word  // Store complete word

DFS:
result = ""

function dfs(node):
    if node.word != null:
        if len(node.word) > len(result):
            result = node.word
        elif len(node.word) == len(result) and node.word < result:
            result = node.word  // Lexicographically smaller

    // Only explore children that are complete words
    for each char in node.children:
        child = node.children[char]
        if child.word != null:  // Key constraint!
            dfs(child)

dfs(root)
return result

Approach 2: Sorting + HashSet
-----------------------
sort(words)  // Lexicographic order
buildable = {""}  // Empty string is base case
result = ""

for each word in words:
    prefix = word[0:len(word)-1]  // All but last character
    if prefix in buildable:
        buildable.add(word)  // This word is now buildable
        if len(word) > len(result):
            result = word

return result

Example 1: ["w","wo","wor","worl","world"]
-----------------------
After building trie:
root → w (word="w") → o (word="wo") → r (word="wor") → l (word="worl") → d (word="world")

DFS traversal:
- Start at root
- Check 'w' child: word="w" exists ✓
  - Update result = "w"
  - Check 'o' child: word="wo" exists ✓
    - Update result = "wo"
    - Check 'r' child: word="wor" exists ✓
      - Update result = "wor"
      - Check 'l' child: word="worl" exists ✓
        - Update result = "worl"
        - Check 'd' child: word="world" exists ✓
          - Update result = "world" (longest!)

Example 2: ["a","banana","app","appl","ap","apply","apple"]
-----------------------
After sorting: ["a","ap","app","appl","apple","apply","banana"]

buildable = {""}
result = ""

Process "a": prefix="" in buildable ✓
  - buildable = {"", "a"}
  - result = "a"

Process "ap": prefix="a" in buildable ✓
  - buildable = {"", "a", "ap"}
  - result = "ap"

Process "app": prefix="ap" in buildable ✓
  - buildable = {"", "a", "ap", "app"}
  - result = "app"

Process "appl": prefix="app" in buildable ✓
  - buildable = {"", "a", "ap", "app", "appl"}
  - result = "appl"

Process "apple": prefix="appl" in buildable ✓
  - buildable = {"", "a", "ap", "app", "appl", "apple"}
  - result = "apple" (length 5)

Process "apply": prefix="appl" in buildable ✓
  - buildable = {"", "a", "ap", "app", "appl", "apple", "apply"}
  - len("apply") = 5 == len("apple"), but "apply" > "apple" lexicographically
  - Keep result = "apple"

Process "banana": prefix="banan" NOT in buildable ✗
  - Skip (not buildable)

Return "apple"`,
      code: {
        java: {
          starterCode: `public String longestWord(String[] words) {
    // TODO: Use Trie to find longest buildable word

    return "";
}`,
          solution: `class Solution {
    class TrieNode {
        TrieNode[] children = new TrieNode[26];
        String word;
    }

    public String longestWord(String[] words) {
        TrieNode root = new TrieNode();

        // Build trie
        for (String word : words) {
            TrieNode node = root;
            for (char c : word.toCharArray()) {
                int index = c - 'a';
                if (node.children[index] == null) {
                    node.children[index] = new TrieNode();
                }
                node = node.children[index];
            }
            node.word = word;
        }

        // DFS to find longest buildable word
        String[] result = {""};
        dfs(root, result);
        return result[0];
    }

    private void dfs(TrieNode node, String[] result) {
        if (node.word != null) {
            if (node.word.length() > result[0].length() ||
                (node.word.length() == result[0].length() &&
                 node.word.compareTo(result[0]) < 0)) {
                result[0] = node.word;
            }
        }

        for (int i = 0; i < 26; i++) {
            if (node.children[i] != null && node.children[i].word != null) {
                dfs(node.children[i], result);
            }
        }
    }
}

// Alternative: Sorting approach
class SolutionSort {
    public String longestWord(String[] words) {
        Arrays.sort(words);
        Set<String> built = new HashSet<>();
        built.add("");
        String result = "";

        for (String word : words) {
            if (built.contains(word.substring(0, word.length() - 1))) {
                built.add(word);
                if (word.length() > result.length()) {
                    result = word;
                }
            }
        }

        return result;
    }
}`
        },
        python: {
          starterCode: `def longestWord(self, words: List[str]) -> str:
    # TODO: Use Trie to find longest buildable word
    pass`,
          solution: `class Solution:
    def longestWord(self, words: List[str]) -> str:
        class TrieNode:
            def __init__(self):
                self.children = {}
                self.word = None

        root = TrieNode()

        # Build trie
        for word in words:
            node = root
            for char in word:
                if char not in node.children:
                    node.children[char] = TrieNode()
                node = node.children[char]
            node.word = word

        result = [""]

        def dfs(node):
            if node.word:
                if (len(node.word) > len(result[0]) or
                    (len(node.word) == len(result[0]) and node.word < result[0])):
                    result[0] = node.word

            for char in node.children:
                child = node.children[char]
                if child.word:  # Can only continue if buildable
                    dfs(child)

        dfs(root)
        return result[0]


# Alternative: Sorting approach
class SolutionSort:
    def longestWord(self, words: List[str]) -> str:
        words.sort()
        built = {""}
        result = ""

        for word in words:
            if word[:-1] in built:
                built.add(word)
                if len(word) > len(result):
                    result = word

        return result`
        }
      },
      testCases: [
        { input: 'words = ["w","wo","wor","worl","world"]', output: '"world"' },
        { input: 'words = ["a","banana","app","appl","ap","apply","apple"]', output: '"apple"' }
      ]
    },
    {
      id: 5,
      title: 'Concatenated Words',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/concatenated-words/',
      description: 'Given an array of strings words (without duplicates), return all the concatenated words in the given list of words. A concatenated word is defined as a string that is comprised entirely of at least two shorter words in the given array.',
      explanation: `**Problem:** Find all words that can be formed by concatenating other words in the array.

**Key Insight:** Use Trie + DFS or DP (Word Break pattern). For each word, check if it can be formed by concatenating other words from the dictionary.

**Approach 1: Trie + DFS**
1. Build a Trie from all words
2. For each word, use DFS to check if it can be formed:
   - At each position, try to match a word in Trie
   - If match found, recursively check remaining substring
   - Must use at least 2 words (not the word itself)

**Approach 2: Dynamic Programming (Word Break)**
1. Sort words by length (process shorter words first)
2. Use HashSet for fast lookup
3. For each word, use DP to check if it's concatenated:
   - dp[i] = true if substring [0:i] can be formed
   - Check all possible splits

**Complexity:**
- Trie: O(N * L²) time, O(N * L) space (N=words, L=avg length)
- DP: O(N * L²) time, O(N) space`,
      pseudocode: `ALGORITHM ConcatenatedWords:

APPROACH 1: Trie + DFS
-----------------------
BUILD_TRIE(words):
    root = TrieNode()
    FOR each word in words:
        INSERT word into Trie

CHECK_CONCATENATED(word, trie, wordSet):
    FUNCTION canForm(index, count):
        IF index == length(word):
            RETURN count >= 2  // Must use at least 2 words

        node = root
        FOR i FROM index TO length(word):
            char = word[i]
            IF char NOT in node.children:
                RETURN false

            node = node.children[char]
            IF node.isEndOfWord:
                // Found a word, recursively check rest
                IF canForm(i + 1, count + 1):
                    RETURN true

        RETURN false

    RETURN canForm(0, 0)

MAIN(words):
    trie = BUILD_TRIE(words)
    result = []
    FOR each word in words:
        IF CHECK_CONCATENATED(word, trie, words):
            result.add(word)
    RETURN result


APPROACH 2: DP (Word Break)
-----------------------------
MAIN(words):
    wordSet = HashSet(words)
    result = []

    SORT words by length  // Process shorter first

    FOR each word in words:
        IF canForm(word, wordSet):
            result.add(word)
        wordSet.add(word)  // Add for future words

    RETURN result

FUNCTION canForm(word, dict):
    n = length(word)
    dp = array[n+1] filled with false
    dp[0] = true

    FOR i FROM 1 TO n:
        FOR j FROM 0 TO i-1:
            IF dp[j] AND word[j:i] in dict:
                dp[i] = true
                BREAK

    RETURN dp[n]`,
      code: {
        java: {
          starterCode: `public List<String> findAllConcatenatedWordsInADict(String[] words) {
    // TODO: Find all concatenated words

}`,
          solution: `// Approach 1: Trie + DFS - O(N * L²) time, O(N * L) space
import java.util.*;

class Solution {
    class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        boolean isWord = false;
    }

    private TrieNode root;

    public List<String> findAllConcatenatedWordsInADict(String[] words) {
        List<String> result = new ArrayList<>();
        root = new TrieNode();

        // Build Trie
        for (String word : words) {
            if (!word.isEmpty()) {
                insert(word);
            }
        }

        // Check each word
        for (String word : words) {
            if (!word.isEmpty() && canForm(word, 0, 0)) {
                result.add(word);
            }
        }

        return result;
    }

    private void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node.children.putIfAbsent(c, new TrieNode());
            node = node.children.get(c);
        }
        node.isWord = true;
    }

    private boolean canForm(String word, int index, int count) {
        // Base case: reached end of word
        if (index == word.length()) {
            return count >= 2;  // Must use at least 2 words
        }

        TrieNode node = root;
        for (int i = index; i < word.length(); i++) {
            char c = word.charAt(i);
            if (!node.children.containsKey(c)) {
                return false;
            }

            node = node.children.get(c);
            if (node.isWord) {
                // Found a word, check if rest can be formed
                if (canForm(word, i + 1, count + 1)) {
                    return true;
                }
            }
        }

        return false;
    }
}


// Approach 2: DP (Word Break) - O(N * L²) time, O(N) space
class SolutionDP {
    public List<String> findAllConcatenatedWordsInADict(String[] words) {
        List<String> result = new ArrayList<>();
        Set<String> wordSet = new HashSet<>();

        // Sort by length - process shorter words first
        Arrays.sort(words, (a, b) -> a.length() - b.length());

        for (String word : words) {
            if (word.isEmpty()) continue;

            if (canForm(word, wordSet)) {
                result.add(word);
            }
            wordSet.add(word);  // Add for future longer words
        }

        return result;
    }

    private boolean canForm(String word, Set<String> dict) {
        if (dict.isEmpty()) return false;

        int n = word.length();
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;

        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && dict.contains(word.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }

        return dp[n];
    }
}


// Approach 3: DFS with Memoization (Optimized)
class SolutionMemo {
    private Set<String> wordSet;
    private Map<String, Boolean> memo;

    public List<String> findAllConcatenatedWordsInADict(String[] words) {
        List<String> result = new ArrayList<>();
        wordSet = new HashSet<>(Arrays.asList(words));

        for (String word : words) {
            memo = new HashMap<>();
            if (canForm(word, true)) {
                result.add(word);
            }
        }

        return result;
    }

    private boolean canForm(String word, boolean isOriginal) {
        if (!isOriginal && wordSet.contains(word)) {
            return true;
        }

        if (memo.containsKey(word)) {
            return memo.get(word);
        }

        for (int i = 1; i < word.length(); i++) {
            String prefix = word.substring(0, i);
            String suffix = word.substring(i);

            if (wordSet.contains(prefix) && canForm(suffix, false)) {
                memo.put(word, true);
                return true;
            }
        }

        memo.put(word, false);
        return false;
    }
}`
        },
        python: {
          starterCode: `def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:
    # TODO: Find all concatenated words
    pass`,
          solution: `# Approach 1: Trie + DFS - O(N * L²) time, O(N * L) space
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False

class Solution:
    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:
        # Build Trie
        self.root = TrieNode()
        for word in words:
            if word:
                self.insert(word)

        # Check each word
        result = []
        for word in words:
            if word and self.can_form(word, 0, 0):
                result.append(word)

        return result

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_word = True

    def can_form(self, word: str, index: int, count: int) -> bool:
        # Base case: reached end of word
        if index == len(word):
            return count >= 2  # Must use at least 2 words

        node = self.root
        for i in range(index, len(word)):
            char = word[i]
            if char not in node.children:
                return False

            node = node.children[char]
            if node.is_word:
                # Found a word, check if rest can be formed
                if self.can_form(word, i + 1, count + 1):
                    return True

        return False


# Approach 2: DP (Word Break) - O(N * L²) time, O(N) space
class SolutionDP:
    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:
        word_set = set()
        result = []

        # Sort by length - process shorter words first
        words.sort(key=len)

        for word in words:
            if not word:
                continue

            if self.can_form(word, word_set):
                result.append(word)
            word_set.add(word)  # Add for future longer words

        return result

    def can_form(self, word: str, word_dict: set) -> bool:
        if not word_dict:
            return False

        n = len(word)
        dp = [False] * (n + 1)
        dp[0] = True

        for i in range(1, n + 1):
            for j in range(i):
                if dp[j] and word[j:i] in word_dict:
                    dp[i] = True
                    break

        return dp[n]


# Approach 3: DFS with Memoization (Clean)
class SolutionMemo:
    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:
        self.word_set = set(words)
        result = []

        for word in words:
            self.memo = {}
            if self.can_form(word, True):
                result.append(word)

        return result

    def can_form(self, word: str, is_original: bool) -> bool:
        # If not original word and found in set, it's valid
        if not is_original and word in self.word_set:
            return True

        if word in self.memo:
            return self.memo[word]

        # Try all possible splits
        for i in range(1, len(word)):
            prefix = word[:i]
            suffix = word[i:]

            if prefix in self.word_set and self.can_form(suffix, False):
                self.memo[word] = True
                return True

        self.memo[word] = False
        return False


# Approach 4: Optimized with early termination
class SolutionOptimized:
    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:
        word_set = set(words)
        result = []

        for word in words:
            if self.is_concatenated(word, word_set):
                result.append(word)

        return result

    def is_concatenated(self, word: str, word_set: set) -> bool:
        n = len(word)
        dp = [False] * (n + 1)
        dp[0] = True

        for i in range(1, n + 1):
            for j in range(i):
                # Skip if this would be the entire word
                if j == 0 and i == n:
                    continue

                if dp[j] and word[j:i] in word_set:
                    dp[i] = True
                    break

        return dp[n]`
        }
      },
      testCases: [
        { input: 'words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]', output: '["catsdogcats","dogcatsdog","ratcatdogcat"]' },
        { input: 'words = ["cat","dog","catdog"]', output: '["catdog"]' }
      ],
      examples: [
        { input: 'words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]', output: '["catsdogcats","dogcatsdog","ratcatdogcat"]' },
        { input: 'words = ["cat","dog","catdog"]', output: '["catdog"]' }
      ]
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Trie-${q.id}`)).length
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
    // Load existing drawing for this problem
    const savedDrawing = localStorage.getItem(`drawing-Trie-${question.id}`)
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`Trie-${selectedQuestion.id}`} />
              <BookmarkButton problemId={`Trie-${selectedQuestion.id}`} problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'Trie' }} />
            </div>

            {selectedQuestion.leetcodeUrl && (
              <a href={selectedQuestion.leetcodeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
                View on LeetCode ↗
              </a>
            )}

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

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #e5e7eb', borderRadius: '8px', resize: 'none', lineHeight: '1.5' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#374151', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px' }}>{output}</pre>
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
            const savedDrawing = localStorage.getItem(`drawing-Trie-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`Trie-${selectedQuestion.id}`}
          existingDrawing={currentDrawing}
        />
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s ease' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'} onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}>
          ← Back
        </button>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>🔠 Trie</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Master trie problems</p>

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
                          <CompletionCheckbox problemId={`Trie-${question.id}`} />
                        </div>
                        <BookmarkButton size="small" problemId={`Trie-${question.id}`} problemData={{ title: question.title, difficulty: question.difficulty, category: 'Trie' }} />
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

export default Trie
