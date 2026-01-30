import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function MathGeometry({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb, breadcrumbStack, onBreadcrumbClick, pushBreadcrumb, breadcrumbColors }) {
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
      title: 'Happy Number',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/happy-number/',
      description: 'Write an algorithm to determine if a number n is happy. A happy number is defined by repeatedly replacing it with the sum of the squares of its digits until it equals 1 or loops endlessly.',
      examples: [
        { input: 'n = 19', output: 'true' },
        { input: 'n = 2', output: 'false' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public boolean isHappy(int n) {

    }
}`,
          solution: `class Solution {
    public boolean isHappy(int n) {
        Set<Integer> seen = new HashSet<>();

        while (n != 1 && !seen.contains(n)) {
            seen.add(n);
            n = getSumOfSquares(n);
        }

        return n == 1;
    }

    private int getSumOfSquares(int n) {
        int sum = 0;
        while (n > 0) {
            int digit = n % 10;
            sum += digit * digit;
            n /= 10;
        }
        return sum;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def isHappy(self, n: int) -> bool:
        pass`,
          solution: `class Solution:
    def isHappy(self, n: int) -> bool:
        seen = set()

        while n != 1 and n not in seen:
            seen.add(n)
            n = self.get_sum_of_squares(n)

        return n == 1

    def get_sum_of_squares(self, n: int) -> int:
        total = 0
        while n > 0:
            digit = n % 10
            total += digit * digit
            n //= 10
        return total`
        }
      },
      explanation: 'Use Floyd\'s Cycle Detection (slow and fast pointer) or HashSet to detect cycles. When a cycle is found, if n is 1, it\'s happy.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(log n)'
    },
    {
      id: 2,
      title: 'Plus One',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/plus-one/',
      description: 'You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. Increment the large integer by one and return the resulting array of digits.',
      examples: [
        { input: 'digits = [1,2,3]', output: '[1,2,4]' },
        { input: 'digits = [9,9,9]', output: '[1,0,0,0]' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public int[] plusOne(int[] digits) {

    }
}`,
          solution: `class Solution {
    public int[] plusOne(int[] digits) {
        for (int i = digits.length - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }

        // All digits were 9, need new array
        int[] result = new int[digits.length + 1];
        result[0] = 1;
        return result;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        pass`,
          solution: `class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        for i in range(len(digits) - 1, -1, -1):
            if digits[i] < 9:
                digits[i] += 1
                return digits
            digits[i] = 0

        # All digits were 9
        return [1] + digits`
        }
      },
      explanation: 'Iterate from right to left. If digit is less than 9, increment and return. Otherwise set to 0 and continue. If all digits were 9, create new array with 1 at start.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1) or O(n) if new array needed'
    },
    {
      id: 3,
      title: 'Pow(x, n)',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/powx-n/',
      description: 'Implement pow(x, n), which calculates x raised to the power n.',
      examples: [
        { input: 'x = 2.00000, n = 10', output: '1024.00000' },
        { input: 'x = 2.00000, n = -2', output: '0.25000' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public double myPow(double x, int n) {

    }
}`,
          solution: `class Solution {
    public double myPow(double x, int n) {
        if (n == 0) return 1.0;

        long N = n;
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }

        return fastPow(x, N);
    }

    private double fastPow(double x, long n) {
        if (n == 0) return 1.0;

        double half = fastPow(x, n / 2);

        if (n % 2 == 0) {
            return half * half;
        } else {
            return half * half * x;
        }
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def myPow(self, x: float, n: int) -> float:
        pass`,
          solution: `class Solution:
    def myPow(self, x: float, n: int) -> float:
        if n == 0:
            return 1.0

        if n < 0:
            x = 1 / x
            n = -n

        def fast_pow(base, exp):
            if exp == 0:
                return 1.0

            half = fast_pow(base, exp // 2)

            if exp % 2 == 0:
                return half * half
            else:
                return half * half * base

        return fast_pow(x, n)`
        }
      },
      explanation: 'Use fast exponentiation (binary exponentiation). Recursively compute x^(n/2) and square it. If n is odd, multiply by x once more.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(log n)'
    },
    {
      id: 4,
      title: 'Multiply Strings',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/multiply-strings/',
      description: 'Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.',
      examples: [
        { input: 'num1 = "2", num2 = "3"', output: '"6"' },
        { input: 'num1 = "123", num2 = "456"', output: '"56088"' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public String multiply(String num1, String num2) {

    }
}`,
          solution: `class Solution {
    public String multiply(String num1, String num2) {
        if (num1.equals("0") || num2.equals("0")) return "0";

        int m = num1.length();
        int n = num2.length();
        int[] result = new int[m + n];

        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
                int p1 = i + j;
                int p2 = i + j + 1;
                int sum = mul + result[p2];

                result[p2] = sum % 10;
                result[p1] += sum / 10;
            }
        }

        StringBuilder sb = new StringBuilder();
        for (int num : result) {
            if (!(sb.length() == 0 && num == 0)) {
                sb.append(num);
            }
        }

        return sb.length() == 0 ? "0" : sb.toString();
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        pass`,
          solution: `class Solution:
    def multiply(self, num1: str, num2: str) -> str:
        if num1 == "0" or num2 == "0":
            return "0"

        m, n = len(num1), len(num2)
        result = [0] * (m + n)

        for i in range(m - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                mul = int(num1[i]) * int(num2[j])
                p1 = i + j
                p2 = i + j + 1
                total = mul + result[p2]

                result[p2] = total % 10
                result[p1] += total // 10

        # Convert to string, skip leading zeros
        result_str = ''.join(map(str, result))
        return result_str.lstrip('0') or '0'`
        }
      },
      explanation: 'Simulate grade school multiplication. Product of digits at positions i and j goes to positions (i+j) and (i+j+1) in result array.',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m + n)'
    },
    {
      id: 5,
      title: 'Rotate Image',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/rotate-image/',
      description: 'You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise). You have to rotate the image in-place.',
      examples: [
        { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public void rotate(int[][] matrix) {

    }
}`,
          solution: `class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;

        // Transpose the matrix
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }

        // Reverse each row
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][n - 1 - j];
                matrix[i][n - 1 - j] = temp;
            }
        }
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        pass`,
          solution: `class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        n = len(matrix)

        # Transpose
        for i in range(n):
            for j in range(i, n):
                matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

        # Reverse each row
        for i in range(n):
            matrix[i].reverse()`
        }
      },
      explanation: 'To rotate 90 degrees clockwise: first transpose the matrix (swap matrix[i][j] with matrix[j][i]), then reverse each row.',
      timeComplexity: 'O(n^2)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 6,
      title: 'Spiral Matrix',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/spiral-matrix/',
      description: 'Given an m x n matrix, return all elements of the matrix in spiral order.',
      examples: [
        { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {

    }
}`,
          solution: `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        if (matrix == null || matrix.length == 0) return result;

        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;

        while (top <= bottom && left <= right) {
            // Traverse right
            for (int i = left; i <= right; i++) {
                result.add(matrix[top][i]);
            }
            top++;

            // Traverse down
            for (int i = top; i <= bottom; i++) {
                result.add(matrix[i][right]);
            }
            right--;

            // Traverse left
            if (top <= bottom) {
                for (int i = right; i >= left; i--) {
                    result.add(matrix[bottom][i]);
                }
                bottom--;
            }

            // Traverse up
            if (left <= right) {
                for (int i = bottom; i >= top; i--) {
                    result.add(matrix[i][left]);
                }
                left++;
            }
        }

        return result;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        pass`,
          solution: `class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        if not matrix:
            return []

        result = []
        top, bottom = 0, len(matrix) - 1
        left, right = 0, len(matrix[0]) - 1

        while top <= bottom and left <= right:
            # Traverse right
            for i in range(left, right + 1):
                result.append(matrix[top][i])
            top += 1

            # Traverse down
            for i in range(top, bottom + 1):
                result.append(matrix[i][right])
            right -= 1

            # Traverse left
            if top <= bottom:
                for i in range(right, left - 1, -1):
                    result.append(matrix[bottom][i])
                bottom -= 1

            # Traverse up
            if left <= right:
                for i in range(bottom, top - 1, -1):
                    result.append(matrix[i][left])
                left += 1

        return result`
        }
      },
      explanation: 'Use four pointers (top, bottom, left, right) to traverse the matrix layer by layer: right, down, left, up. Shrink boundaries after each direction.',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 7,
      title: 'Set Matrix Zeroes',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/set-matrix-zeroes/',
      description: 'Given an m x n integer matrix, if an element is 0, set its entire row and column to 0\'s.',
      examples: [
        { input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public void setZeroes(int[][] matrix) {

    }
}`,
          solution: `class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length;
        int n = matrix[0].length;
        boolean firstRowZero = false;
        boolean firstColZero = false;

        // Check if first row has zero
        for (int j = 0; j < n; j++) {
            if (matrix[0][j] == 0) {
                firstRowZero = true;
                break;
            }
        }

        // Check if first column has zero
        for (int i = 0; i < m; i++) {
            if (matrix[i][0] == 0) {
                firstColZero = true;
                break;
            }
        }

        // Use first row and column as markers
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }

        // Set zeroes based on markers
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }

        // Handle first row
        if (firstRowZero) {
            for (int j = 0; j < n; j++) {
                matrix[0][j] = 0;
            }
        }

        // Handle first column
        if (firstColZero) {
            for (int i = 0; i < m; i++) {
                matrix[i][0] = 0;
            }
        }
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        pass`,
          solution: `class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        m, n = len(matrix), len(matrix[0])
        first_row_zero = any(matrix[0][j] == 0 for j in range(n))
        first_col_zero = any(matrix[i][0] == 0 for i in range(m))

        # Use first row and column as markers
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][j] == 0:
                    matrix[i][0] = 0
                    matrix[0][j] = 0

        # Set zeroes based on markers
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][0] == 0 or matrix[0][j] == 0:
                    matrix[i][j] = 0

        # Handle first row
        if first_row_zero:
            for j in range(n):
                matrix[0][j] = 0

        # Handle first column
        if first_col_zero:
            for i in range(m):
                matrix[i][0] = 0`
        }
      },
      explanation: 'Use first row and column as markers to track which rows/columns should be zeroed. Handle first row/column separately to avoid losing marker data.',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 8,
      title: 'Roman to Integer',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/roman-to-integer/',
      description: 'Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M. Given a roman numeral, convert it to an integer.',
      examples: [
        { input: 's = "III"', output: '3' },
        { input: 's = "LVIII"', output: '58' },
        { input: 's = "MCMXCIV"', output: '1994' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public int romanToInt(String s) {

    }
}`,
          solution: `class Solution {
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
        int n = s.length();

        for (int i = 0; i < n; i++) {
            int current = map.get(s.charAt(i));

            if (i < n - 1 && current < map.get(s.charAt(i + 1))) {
                result -= current;
            } else {
                result += current;
            }
        }

        return result;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def romanToInt(self, s: str) -> int:
        pass`,
          solution: `class Solution:
    def romanToInt(self, s: str) -> int:
        roman = {
            'I': 1, 'V': 5, 'X': 10, 'L': 50,
            'C': 100, 'D': 500, 'M': 1000
        }

        result = 0
        n = len(s)

        for i in range(n):
            current = roman[s[i]]

            if i < n - 1 and current < roman[s[i + 1]]:
                result -= current
            else:
                result += current

        return result`
        }
      },
      explanation: 'Use a HashMap to store roman symbols and their values. If current value is less than next value, subtract it (like IV=4). Otherwise add it.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 9,
      title: 'Transpose Matrix',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/transpose-matrix/',
      description: 'Given a 2D integer array matrix, return the transpose of matrix. The transpose of a matrix is the matrix flipped over its main diagonal.',
      examples: [
        { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[1,4,7],[2,5,8],[3,6,9]]' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public int[][] transpose(int[][] matrix) {

    }
}`,
          solution: `class Solution {
    public int[][] transpose(int[][] matrix) {
        int m = matrix.length;
        int n = matrix[0].length;
        int[][] result = new int[n][m];

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                result[j][i] = matrix[i][j];
            }
        }

        return result;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def transpose(self, matrix: List[List[int]]) -> List[List[int]]:
        pass`,
          solution: `class Solution:
    def transpose(self, matrix: List[List[int]]) -> List[List[int]]:
        m, n = len(matrix), len(matrix[0])
        result = [[0] * m for _ in range(n)]

        for i in range(m):
            for j in range(n):
                result[j][i] = matrix[i][j]

        return result

        # Or one-liner:
        # return list(zip(*matrix))`
        }
      },
      explanation: 'Create a new matrix with dimensions swapped. Element at position (i,j) in original matrix goes to position (j,i) in transposed matrix.',
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n)'
    }
  ]

  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Math & Geometry-${q.id}`)).length
    return { completed, total: questions.length, percentage: Math.round((completed / questions.length) * 100) }
  }

  const stats = getCompletionStats()

  const groupedQuestions = {
    Easy: questions.filter(q => q.difficulty === 'Easy'),
    Medium: questions.filter(q => q.difficulty === 'Medium'),
    Hard: questions.filter(q => q.difficulty === 'Hard')
  }

  // Build list of visible questions based on expanded sections
  const visibleQuestions = Object.entries(groupedQuestions)
    .filter(([difficulty]) => expandedSections[difficulty])
    .flatMap(([, qs]) => qs)

  const { focusedIndex, setFocusedIndex, itemRefs } = useKeyboardNavigation({
    items: visibleQuestions,
    onSelect: selectQuestion,
    onBack: onBack,
    enabled: !selectedQuestion,
    gridColumns: 2,
    loop: true
  })

  // Helper to get visible index for a question
  const getVisibleIndex = (question) => {
    return visibleQuestions.findIndex(q => q.id === question.id)
  }

  const selectQuestion = (question) => {
    setSelectedQuestion(question)
    setShowSolution(false)
    setUserCode(question.code[language].starterCode)
    setOutput('')
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
    // Create extended breadcrumb stack with problem title
    const problemBreadcrumbStack = breadcrumbStack
      ? [...breadcrumbStack.slice(0, -1), { name: 'Math & Geometry', page: null }, { name: selectedQuestion.title, page: null }]
      : null

    // Fallback to legacy format
    const problemBreadcrumb = {
      ...breadcrumb,
      category: { name: 'Math & Geometry', onClick: () => setSelectedQuestion(null) },
      topic: selectedQuestion.title
    }

    // Handle breadcrumb click for problem view
    const handleProblemBreadcrumbClick = (index, item) => {
      if (problemBreadcrumbStack && index === problemBreadcrumbStack.length - 2) {
        setSelectedQuestion(null)
      } else if (onBreadcrumbClick) {
        onBreadcrumbClick(index, item)
      }
    }

    return (
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            ← Back to Math & Geometry
          </button>
          <LanguageToggle />
        </div>

        <Breadcrumb
          breadcrumb={problemBreadcrumb}
          breadcrumbStack={problemBreadcrumbStack}
          onBreadcrumbClick={handleProblemBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={breadcrumbColors}
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #3b82f6', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: 'white', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <CompletionCheckbox problemId={`Math & Geometry-${selectedQuestion.id}`} />
              <BookmarkButton problemId={`MathGeometry-${selectedQuestion.id}`} problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'MathGeometry' }} />
            </div>

            {selectedQuestion.leetcodeUrl && (
              <a href={selectedQuestion.leetcodeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.5rem 1rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
                View on LeetCode ↗
              </a>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ backgroundColor: '#374151', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #4b5563', color: '#d1d5db' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: 'white' }}>Input:</strong> <code style={{ color: '#d1d5db' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: 'white' }}>Output:</strong> <code style={{ color: '#d1d5db' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '0.75rem' }}>Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#1e3a5a', borderRadius: '8px', border: '1px solid #3b82f6' }}>
                <h3 style={{ fontSize: '1rem', color: 'white', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#60a5fa' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#60a5fa' }}>Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #3b82f6', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' , flexWrap: 'wrap' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
              </button>
              <button onClick={() => setShowDrawing(true)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: currentDrawing ? '#8b5cf6' : '#6366f1', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {currentDrawing ? 'View' : 'Draw'} Sketch
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5', backgroundColor: '#1e293b', color: '#e2e8f0' }} spellCheck={false} />
          </div>
        </div>
        {/* Drawing Canvas Modal */}
        <DrawingCanvas
          isOpen={showDrawing}
          onClose={() => {
            setShowDrawing(false)
            // Reload drawing in case it was updated
            const savedDrawing = localStorage.getItem(`drawing-MathGeometry-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`MathGeometry-${selectedQuestion.id}`}
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

      <Breadcrumb
        breadcrumb={breadcrumb}
        breadcrumbStack={breadcrumbStack}
        onBreadcrumbClick={onBreadcrumbClick}
        onMainMenu={breadcrumb?.onMainMenu}
        colors={breadcrumbColors}
      />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, #93c5fd, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>📐 Math & Geometry</h1>
        <p style={{ fontSize: '1.2rem', color: '#d1d5db' }}>Master mathematical and geometric problem-solving techniques</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: '2px solid #3b82f6' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#d1d5db', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: '2px solid #10b981' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#d1d5db', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', border: '2px solid #374151', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
                <span style={{ fontSize: '0.875rem', color: '#d1d5db' }}>({difficultyQuestions.length} problems)</span>
              </div>
              <span style={{ fontSize: '1.25rem', color: '#d1d5db' }}>{expandedSections[difficulty] ? '▼' : '▶'}</span>
            </button>

            {expandedSections[difficulty] && (
              <div role="list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
                {difficultyQuestions.map((question) => {
                  const visibleIdx = getVisibleIndex(question)
                  return (
                    <div
                      key={question.id}
                      ref={el => itemRefs.current[visibleIdx] = el}
                      tabIndex={visibleIdx === focusedIndex ? 0 : -1}
                      role="listitem"
                      aria-label={`${question.title}, ${question.difficulty}`}
                      onClick={() => selectQuestion(question)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          selectQuestion(question)
                        }
                      }}
                      onFocus={() => setFocusedIndex(visibleIdx)}
                      style={{
                        background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        border: visibleIdx === focusedIndex ? '2px solid #3b82f6' : '2px solid #374151',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        outline: 'none'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'white', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#d1d5db', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                        <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ transform: 'scale(0.85)' }}>
                            <CompletionCheckbox problemId={`Math & Geometry-${question.id}`} />
                          </div>
                          <BookmarkButton size="small" problemId={`MathGeometry-${question.id}`} problemData={{ title: question.title, difficulty: question.difficulty, category: 'MathGeometry' }} />
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

export default MathGeometry
