import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import BookmarkButton from '../../components/BookmarkButton.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function BitManipulation({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
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
      title: 'Single Number',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/single-number/',
      description: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with linear runtime complexity and use only constant extra space.',
      code: {
        java: {
          starterCode: `class Solution {
    public int singleNumber(int[] nums) {
        // TODO: Implement using XOR bit manipulation
        // Hint: XOR of a number with itself is 0, XOR of a number with 0 is the number itself

    }
}`,
          solution: `class Solution {
    public int singleNumber(int[] nums) {
        // XOR all numbers together
        // Duplicate numbers will cancel out (a ^ a = 0)
        // The single number remains (0 ^ a = a)
        int result = 0;
        for (int num : nums) {
            result ^= num;
        }
        return result;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        # TODO: Implement using XOR bit manipulation
        # Hint: XOR of a number with itself is 0, XOR of a number with 0 is the number itself
        pass`,
          solution: `class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        # XOR all numbers together
        # Duplicate numbers will cancel out (a ^ a = 0)
        # The single number remains (0 ^ a = a)
        result = 0
        for num in nums:
            result ^= num
        return result

        # Alternative one-liner using reduce:
        # from functools import reduce
        # return reduce(lambda x, y: x ^ y, nums)`
        }
      },
      testCases: [],
      examples: [
        { input: 'nums = [2,2,1]', output: '1' },
        { input: 'nums = [4,1,2,1,2]', output: '4' },
        { input: 'nums = [1]', output: '1' }
      ],
      explanation: 'This problem leverages the XOR (^) bit manipulation operator. XOR has two key properties: (1) a ^ a = 0 (any number XORed with itself equals 0), and (2) a ^ 0 = a (any number XORed with 0 equals itself). When we XOR all numbers in the array, every duplicate pair cancels out to 0, leaving only the single unique number. This gives us O(n) time complexity and O(1) space complexity.',
      pseudocode: `1. Initialize result = 0
2. For each number in the array:
   - result = result XOR number
3. Return result (the single number that appears once)

Key XOR Properties:
- a ^ a = 0 (self-cancellation)
- a ^ 0 = a (identity)
- a ^ b ^ a = b (order doesn't matter, associative)`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 2,
      title: 'Number of 1 Bits',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/number-of-1-bits/',
      description: 'Write a function that takes the binary representation of an unsigned integer and returns the number of \'1\' bits it has (also known as the Hamming weight).',
      code: {
        java: {
          starterCode: `public class Solution {
    // you need to treat n as an unsigned value
    public int hammingWeight(int n) {
        // TODO: Count the number of 1 bits in n
        // Hint: Use n & (n-1) to remove the rightmost 1 bit

    }
}`,
          solution: `public class Solution {
    // you need to treat n as an unsigned value
    public int hammingWeight(int n) {
        int count = 0;
        // n & (n-1) removes the rightmost 1 bit
        // We count how many times we can do this until n becomes 0
        while (n != 0) {
            count++;
            n &= (n - 1);  // Remove the rightmost 1 bit
        }
        return count;
    }

    // Alternative approach using right shift
    // public int hammingWeight(int n) {
    //     int count = 0;
    //     while (n != 0) {
    //         count += (n & 1);  // Check if last bit is 1
    //         n >>>= 1;          // Unsigned right shift
    //     }
    //     return count;
    // }
}`
        },
        python: {
          starterCode: `class Solution:
    def hammingWeight(self, n: int) -> int:
        # TODO: Count the number of 1 bits in n
        # Hint: Use n & (n-1) to remove the rightmost 1 bit
        pass`,
          solution: `class Solution:
    def hammingWeight(self, n: int) -> int:
        count = 0
        # n & (n-1) removes the rightmost 1 bit
        # We count how many times we can do this until n becomes 0
        while n:
            count += 1
            n &= (n - 1)  # Remove the rightmost 1 bit
        return count

        # Alternative: Use built-in function
        # return bin(n).count('1')`
        }
      },
      testCases: [],
      examples: [
        { input: 'n = 11 (binary: 1011)', output: '3' },
        { input: 'n = 128 (binary: 10000000)', output: '1' },
        { input: 'n = 2147483645 (binary: 1111111111111111111111111111101)', output: '30' }
      ],
      explanation: 'The key insight is that n & (n-1) removes the rightmost 1 bit from n. For example, if n = 12 (1100), then n-1 = 11 (1011), and n & (n-1) = 8 (1000). We count how many times we can perform this operation until n becomes 0. This is more efficient than checking each of the 32 bits because we only iterate as many times as there are 1 bits.',
      pseudocode: `1. Initialize count = 0
2. While n is not 0:
   a. Increment count
   b. n = n AND (n - 1)  // This removes the rightmost 1 bit
3. Return count

Why n & (n-1) works:
- Subtracting 1 flips all bits from rightmost 1 to the end
- Example: 1100 - 1 = 1011
- AND operation: 1100 & 1011 = 1000 (rightmost 1 removed)`,
      timeComplexity: 'O(k) where k is the number of 1 bits',
      spaceComplexity: 'O(1)'
    },
    {
      id: 3,
      title: 'Counting Bits',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/counting-bits/',
      description: 'Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1\'s in the binary representation of i.',
      code: {
        java: {
          starterCode: `class Solution {
    public int[] countBits(int n) {
        // TODO: Return array where ans[i] = number of 1 bits in i
        // Hint: Use dynamic programming with the relation ans[i] = ans[i >> 1] + (i & 1)

    }
}`,
          solution: `class Solution {
    public int[] countBits(int n) {
        int[] ans = new int[n + 1];

        // Dynamic programming approach
        // For any number i:
        // - i >> 1 is i divided by 2 (removes last bit)
        // - i & 1 checks if last bit is 1
        // So ans[i] = ans[i >> 1] + (i & 1)
        for (int i = 1; i <= n; i++) {
            ans[i] = ans[i >> 1] + (i & 1);
        }

        return ans;
    }

    // Alternative approach using n & (n-1)
    // public int[] countBits(int n) {
    //     int[] ans = new int[n + 1];
    //     for (int i = 1; i <= n; i++) {
    //         ans[i] = ans[i & (i - 1)] + 1;
    //     }
    //     return ans;
    // }
}`
        },
        python: {
          starterCode: `class Solution:
    def countBits(self, n: int) -> List[int]:
        # TODO: Return array where ans[i] = number of 1 bits in i
        # Hint: Use dynamic programming with the relation ans[i] = ans[i >> 1] + (i & 1)
        pass`,
          solution: `class Solution:
    def countBits(self, n: int) -> List[int]:
        ans = [0] * (n + 1)

        # Dynamic programming approach
        # For any number i:
        # - i >> 1 is i divided by 2 (removes last bit)
        # - i & 1 checks if last bit is 1
        # So ans[i] = ans[i >> 1] + (i & 1)
        for i in range(1, n + 1):
            ans[i] = ans[i >> 1] + (i & 1)

        return ans

        # Alternative approach using n & (n-1)
        # for i in range(1, n + 1):
        #     ans[i] = ans[i & (i - 1)] + 1
        # return ans`
        }
      },
      testCases: [],
      examples: [
        { input: 'n = 2', output: '[0, 1, 1]' },
        { input: 'n = 5', output: '[0, 1, 1, 2, 1, 2]' },
        { input: 'n = 0', output: '[0]' }
      ],
      explanation: 'We use dynamic programming based on the insight that ans[i] = ans[i >> 1] + (i & 1). This works because i >> 1 is i divided by 2 (right shift removes the last bit), and we already computed ans[i >> 1]. We just need to add 1 if the last bit of i is 1 (checked by i & 1). Another approach uses ans[i] = ans[i & (i-1)] + 1, since i & (i-1) removes the rightmost 1 bit.',
      pseudocode: `Method 1: Using right shift
1. Initialize ans array of size n + 1 with all zeros
2. For i from 1 to n:
   - ans[i] = ans[i >> 1] + (i & 1)
   - i >> 1 gives us the number of 1s in i without the last bit
   - (i & 1) adds 1 if the last bit is 1
3. Return ans

Method 2: Using n & (n-1)
1. Initialize ans array of size n + 1 with all zeros
2. For i from 1 to n:
   - ans[i] = ans[i & (i-1)] + 1
   - i & (i-1) removes rightmost 1, so we add 1 to that count
3. Return ans`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n) for the output array'
    },
    {
      id: 4,
      title: 'Reverse Bits',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/reverse-bits/',
      description: 'Reverse bits of a given 32 bits unsigned integer.',
      code: {
        java: {
          starterCode: `public class Solution {
    // you need treat n as an unsigned value
    public int reverseBits(int n) {
        // TODO: Reverse all 32 bits of the input integer
        // Hint: Build result bit by bit, shifting and using OR

    }
}`,
          solution: `public class Solution {
    // you need treat n as an unsigned value
    public int reverseBits(int n) {
        int result = 0;

        // Process all 32 bits
        for (int i = 0; i < 32; i++) {
            // Shift result left to make room for next bit
            result <<= 1;
            // Add the last bit of n to result
            result |= (n & 1);
            // Shift n right to process next bit
            n >>>= 1;  // Use unsigned right shift
        }

        return result;
    }

    // Alternative: Divide and conquer approach
    // public int reverseBits(int n) {
    //     n = (n >>> 16) | (n << 16);                           // Swap 16-bit halves
    //     n = ((n & 0xff00ff00) >>> 8) | ((n & 0x00ff00ff) << 8); // Swap 8-bit pairs
    //     n = ((n & 0xf0f0f0f0) >>> 4) | ((n & 0x0f0f0f0f) << 4); // Swap 4-bit pairs
    //     n = ((n & 0xcccccccc) >>> 2) | ((n & 0x33333333) << 2); // Swap 2-bit pairs
    //     n = ((n & 0xaaaaaaaa) >>> 1) | ((n & 0x55555555) << 1); // Swap adjacent bits
    //     return n;
    // }
}`
        },
        python: {
          starterCode: `class Solution:
    def reverseBits(self, n: int) -> int:
        # TODO: Reverse all 32 bits of the input integer
        # Hint: Build result bit by bit, shifting and using OR
        pass`,
          solution: `class Solution:
    def reverseBits(self, n: int) -> int:
        result = 0

        # Process all 32 bits
        for i in range(32):
            # Shift result left to make room for next bit
            result <<= 1
            # Add the last bit of n to result
            result |= (n & 1)
            # Shift n right to process next bit
            n >>= 1

        return result

        # Alternative one-liner:
        # return int(bin(n)[2:].zfill(32)[::-1], 2)`
        }
      },
      testCases: [],
      examples: [
        { input: 'n = 43261596 (00000010100101000001111010011100)', output: '964176192 (00111001011110000010100101000000)' },
        { input: 'n = 4294967293 (11111111111111111111111111111101)', output: '3221225471 (10111111111111111111111111111111)' }
      ],
      explanation: 'We build the reversed number bit by bit. For each of the 32 bits: (1) shift the result left by 1 to make room, (2) extract the last bit of n using (n & 1), (3) add it to result using OR, and (4) shift n right by 1 to process the next bit. After processing all 32 bits, result contains the reversed bits.',
      pseudocode: `1. Initialize result = 0
2. For i from 0 to 31 (process all 32 bits):
   a. result = result << 1     // Shift left to make room
   b. result = result | (n & 1) // Add last bit of n to result
   c. n = n >> 1               // Move to next bit of n
3. Return result

Visual example:
n = 1011 (11 in decimal), we want 1101 (13 in decimal)
- i=0: result=0, n&1=1, result=1, n=101
- i=1: result=10, n&1=1, result=11, n=10
- i=2: result=110, n&1=0, result=110, n=1
- i=3: result=1100, n&1=1, result=1101, n=0`,
      timeComplexity: 'O(1) - always 32 iterations',
      spaceComplexity: 'O(1)'
    },
    {
      id: 5,
      title: 'Missing Number',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/missing-number/',
      description: 'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.',
      code: {
        java: {
          starterCode: `class Solution {
    public int missingNumber(int[] nums) {
        // TODO: Find the missing number using XOR
        // Hint: XOR all indices (0 to n) with all array elements

    }
}`,
          solution: `class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        int result = n;  // Start with n since indices go from 0 to n-1

        // XOR each index with its corresponding element
        // The missing number won't have a pair and will remain
        for (int i = 0; i < n; i++) {
            result ^= i ^ nums[i];
        }

        return result;
    }

    // Alternative: Math approach (sum formula)
    // public int missingNumber(int[] nums) {
    //     int n = nums.length;
    //     int expectedSum = n * (n + 1) / 2;
    //     int actualSum = 0;
    //     for (int num : nums) actualSum += num;
    //     return expectedSum - actualSum;
    // }
}`
        },
        python: {
          starterCode: `class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        # TODO: Find the missing number using XOR
        # Hint: XOR all indices (0 to n) with all array elements
        pass`,
          solution: `class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        n = len(nums)
        result = n  # Start with n since indices go from 0 to n-1

        # XOR each index with its corresponding element
        # The missing number won't have a pair and will remain
        for i in range(n):
            result ^= i ^ nums[i]

        return result

        # Alternative: Math approach (sum formula)
        # return len(nums) * (len(nums) + 1) // 2 - sum(nums)`
        }
      },
      testCases: [],
      examples: [
        { input: 'nums = [3, 0, 1]', output: '2' },
        { input: 'nums = [0, 1]', output: '2' },
        { input: 'nums = [9,6,4,2,3,5,7,0,1]', output: '8' }
      ],
      explanation: 'We XOR all numbers from 0 to n with all numbers in the array. Since XOR of a number with itself is 0, all numbers that appear in both the range and the array will cancel out. The only number that doesn\'t have a pair (the missing number) will remain. We initialize result with n because the loop indices only go from 0 to n-1.',
      pseudocode: `XOR Approach:
1. Initialize result = n (length of array)
2. For each index i from 0 to n-1:
   - result = result XOR i XOR nums[i]
3. Return result

Why it works:
- We XOR indices: 0 ^ 1 ^ 2 ^ ... ^ n
- We XOR elements: nums[0] ^ nums[1] ^ ... ^ nums[n-1]
- Every number appears twice EXCEPT the missing one
- Duplicates cancel: a ^ a = 0
- Missing number remains

Example: nums = [3, 0, 1], n = 3
result = 3 ^ (0 ^ 3) ^ (1 ^ 0) ^ (2 ^ 1)
       = 3 ^ 0 ^ 1 ^ 2 ^ 3 ^ 0 ^ 1
       = (0 ^ 0) ^ (1 ^ 1) ^ (3 ^ 3) ^ 2
       = 0 ^ 0 ^ 0 ^ 2 = 2`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 6,
      title: 'Sum of Two Integers',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/sum-of-two-integers/',
      description: 'Given two integers a and b, return the sum of the two integers without using the operators + and -.',
      code: {
        java: {
          starterCode: `class Solution {
    public int getSum(int a, int b) {
        // TODO: Add two integers without using + or -
        // Hint: XOR gives sum without carry, AND with left shift gives the carry

    }
}`,
          solution: `class Solution {
    public int getSum(int a, int b) {
        // Keep adding until there's no carry
        while (b != 0) {
            // carry contains common set bits of a and b
            // shifted left by 1 to add to next position
            int carry = (a & b) << 1;

            // Sum without considering carry
            // XOR gives us sum where at least one bit is not set
            a = a ^ b;

            // carry needs to be added to a
            b = carry;
        }

        return a;
    }

    // Recursive version:
    // public int getSum(int a, int b) {
    //     if (b == 0) return a;
    //     return getSum(a ^ b, (a & b) << 1);
    // }
}`
        },
        python: {
          starterCode: `class Solution:
    def getSum(self, a: int, b: int) -> int:
        # TODO: Add two integers without using + or -
        # Hint: XOR gives sum without carry, AND with left shift gives the carry
        pass`,
          solution: `class Solution:
    def getSum(self, a: int, b: int) -> int:
        # Python integers can be arbitrarily large, so we need to mask to 32 bits
        MASK = 0xFFFFFFFF  # 32-bit mask
        MAX_INT = 0x7FFFFFFF  # Max positive 32-bit integer

        # Keep adding until there's no carry
        while b != 0:
            # Sum without considering carry (mask to 32 bits)
            sum_without_carry = (a ^ b) & MASK

            # Carry (mask to 32 bits)
            carry = ((a & b) << 1) & MASK

            a = sum_without_carry
            b = carry

        # If a is negative in 32-bit representation, convert to Python negative
        if a > MAX_INT:
            a = ~(a ^ MASK)

        return a`
        }
      },
      testCases: [],
      examples: [
        { input: 'a = 1, b = 2', output: '3' },
        { input: 'a = 2, b = 3', output: '5' },
        { input: 'a = -1, b = 1', output: '0' }
      ],
      explanation: 'We simulate binary addition using bit manipulation. XOR (^) gives us the sum without considering the carry (1+1=0 with carry, 1+0=1, 0+0=0). AND (&) gives us the positions where both bits are 1 (where carry occurs). We left shift the carry by 1 (since carry affects the next bit position) and repeat until there\'s no carry left. The Java solution works directly, but Python requires masking to 32 bits due to arbitrary-precision integers.',
      pseudocode: `1. While b (carry) is not 0:
   a. Calculate carry = (a AND b) << 1
      - AND finds positions where both bits are 1
      - Left shift moves carry to correct position
   b. Calculate sum without carry = a XOR b
      - XOR adds bits without considering carry
   c. Set a = sum without carry
   d. Set b = carry
2. Return a

Binary addition example: a=5 (101), b=3 (011)
Iteration 1:
  carry = (101 & 011) << 1 = (001) << 1 = 010
  a = 101 ^ 011 = 110
  b = 010
Iteration 2:
  carry = (110 & 010) << 1 = (010) << 1 = 100
  a = 110 ^ 010 = 100
  b = 100
Iteration 3:
  carry = (100 & 100) << 1 = (100) << 1 = 1000
  a = 100 ^ 100 = 000
  b = 1000
Iteration 4:
  carry = (000 & 1000) << 1 = 0
  a = 000 ^ 1000 = 1000 (8)
  b = 0 -> done!`,
      timeComplexity: 'O(1) - at most 32 iterations for 32-bit integers',
      spaceComplexity: 'O(1)'
    },
    {
      id: 7,
      title: 'Reverse Integer',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/reverse-integer/',
      description: 'Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.',
      code: {
        java: {
          starterCode: `class Solution {
    public int reverse(int x) {
        // TODO: Reverse the digits of x
        // Hint: Pop digits using modulo, push to result, check for overflow

    }
}`,
          solution: `class Solution {
    public int reverse(int x) {
        int result = 0;

        while (x != 0) {
            // Pop the last digit
            int digit = x % 10;
            x /= 10;

            // Check for overflow BEFORE adding the digit
            // If result > MAX_VALUE/10, multiplying by 10 will overflow
            // If result == MAX_VALUE/10 and digit > 7, it will overflow
            if (result > Integer.MAX_VALUE / 10 ||
                (result == Integer.MAX_VALUE / 10 && digit > 7)) {
                return 0;
            }
            // Check for underflow
            if (result < Integer.MIN_VALUE / 10 ||
                (result == Integer.MIN_VALUE / 10 && digit < -8)) {
                return 0;
            }

            // Push the digit to result
            result = result * 10 + digit;
        }

        return result;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def reverse(self, x: int) -> int:
        # TODO: Reverse the digits of x
        # Hint: Pop digits using modulo, push to result, check for overflow
        pass`,
          solution: `class Solution:
    def reverse(self, x: int) -> int:
        INT_MIN, INT_MAX = -2**31, 2**31 - 1

        # Handle sign separately
        sign = 1 if x >= 0 else -1
        x = abs(x)

        result = 0
        while x != 0:
            # Pop the last digit
            digit = x % 10
            x //= 10

            # Push the digit to result
            result = result * 10 + digit

        result *= sign

        # Check for overflow
        if result < INT_MIN or result > INT_MAX:
            return 0

        return result

        # Alternative one-liner (but still need overflow check):
        # sign = 1 if x >= 0 else -1
        # result = sign * int(str(abs(x))[::-1])
        # return result if INT_MIN <= result <= INT_MAX else 0`
        }
      },
      testCases: [],
      examples: [
        { input: 'x = 123', output: '321' },
        { input: 'x = -123', output: '-321' },
        { input: 'x = 120', output: '21' },
        { input: 'x = 1534236469', output: '0 (overflow)' }
      ],
      explanation: 'We reverse the integer by repeatedly extracting the last digit (x % 10) and building the result (result * 10 + digit). The key challenge is overflow detection. Before multiplying result by 10, we check if it would exceed Integer.MAX_VALUE (2147483647). In Java, we check if result > MAX_VALUE/10 or if result equals MAX_VALUE/10 and the digit is greater than 7 (the last digit of MAX_VALUE). Similar checks apply for negative numbers.',
      pseudocode: `1. Initialize result = 0
2. While x is not 0:
   a. Extract last digit: digit = x % 10
   b. Remove last digit from x: x = x / 10
   c. Check for overflow before pushing:
      - If result > MAX_VALUE/10, return 0
      - If result == MAX_VALUE/10 and digit > 7, return 0
   d. Check for underflow:
      - If result < MIN_VALUE/10, return 0
      - If result == MIN_VALUE/10 and digit < -8, return 0
   e. Push digit to result: result = result * 10 + digit
3. Return result

Why check before pushing:
- MAX_VALUE = 2147483647
- MAX_VALUE / 10 = 214748364
- If result > 214748364 and we multiply by 10, it overflows
- If result = 214748364 and digit > 7, adding it overflows`,
      timeComplexity: 'O(log(x)) - number of digits in x',
      spaceComplexity: 'O(1)'
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Bit Manipulation-${q.id}`)).length
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
    const savedDrawing = localStorage.getItem(`drawing-BitManipulation-${question.id}`)
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
      category: { name: 'Bit Manipulation', onClick: () => setSelectedQuestion(null) },
      topic: selectedQuestion.title
    }

    return (
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            ← Back to Bit Manipulation
          </button>
          <LanguageToggle />
        </div>

        <Breadcrumb breadcrumb={problemBreadcrumb} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Problem Description */}
          <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', border: '2px solid #3b82f6', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#93c5fd', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <CompletionCheckbox problemId={`Bit Manipulation-${selectedQuestion.id}`} />
              <BookmarkButton problemId={`BitManipulation-${selectedQuestion.id}`} problemData={{ title: selectedQuestion.title, difficulty: selectedQuestion.difficulty, category: 'BitManipulation' }} />
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
                  <div key={idx} style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #374151', color: '#d1d5db' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#93c5fd' }}>Input:</strong> <code style={{ color: '#d1d5db' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: '#93c5fd' }}>Output:</strong> <code style={{ color: '#d1d5db' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#93c5fd', marginBottom: '0.75rem' }}>Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#1e3a5f', borderRadius: '8px', border: '1px solid #3b82f6' }}>
                <h3 style={{ fontSize: '1rem', color: '#93c5fd', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '12px', border: '2px solid #3b82f6', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
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

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5', backgroundColor: '#111827', color: '#d1d5db' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#93c5fd', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#111827', padding: '1rem', borderRadius: '8px', border: '1px solid #374151', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px', color: '#d1d5db' }}>{output}</pre>
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
            const savedDrawing = localStorage.getItem(`drawing-BitManipulation-${selectedQuestion.id}`)
            setCurrentDrawing(savedDrawing)
          }}
          problemId={`BitManipulation-${selectedQuestion.id}`}
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
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, #93c5fd, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>Bit Manipulation</h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>Master bit manipulation problems</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '2px solid #3b82f6' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', backgroundColor: '#1f2937', borderRadius: '12px', border: '2px solid #10b981' }}>
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
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`Bit Manipulation-${question.id}`} />
                        </div>
                        <BookmarkButton size="small" problemId={`BitManipulation-${question.id}`} problemData={{ title: question.title, difficulty: question.difficulty, category: 'BitManipulation' }} />
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

export default BitManipulation
