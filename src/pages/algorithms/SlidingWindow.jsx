import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function SlidingWindow({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory }) {
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
      title: 'Contains Duplicate II',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate-ii/',
      description: 'Given an integer array nums and an integer k, return true if there are two distinct indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.',
      examples: [
        { input: 'nums = [1,2,3,1], k = 3', output: 'true' },
        { input: 'nums = [1,0,1,1], k = 1', output: 'true' },
        { input: 'nums = [1,2,3,1,2,3], k = 2', output: 'false' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        // Your code here

    }
}`,
          solution: `class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        // Use HashMap to store value -> index
        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            if (map.containsKey(nums[i])) {
                if (i - map.get(nums[i]) <= k) {
                    return true;
                }
            }
            map.put(nums[i], i);
        }

        return false;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        # Your code here
        pass`,
          solution: `class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        # Use dictionary to store value -> index
        seen = {}

        for i, num in enumerate(nums):
            if num in seen and i - seen[num] <= k:
                return True
            seen[num] = i

        return False`
        }
      },
      explanation: 'Use a hashmap to track the most recent index of each number. Check if current index minus previous index is within k.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(min(n,k))'
    },
    {
      id: 2,
      title: 'Best Time to Buy and Sell Stock',
      difficulty: 'Easy',
      leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
      description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction.',
      examples: [
        { input: 'prices = [7,1,5,3,6,4]', output: '5' },
        { input: 'prices = [7,6,4,3,1]', output: '0' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public int maxProfit(int[] prices) {
        // Your code here

    }
}`,
          solution: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;

        for (int price : prices) {
            minPrice = Math.min(minPrice, price);
            maxProfit = Math.max(maxProfit, price - minPrice);
        }

        return maxProfit;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        # Your code here
        pass`,
          solution: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float('inf')
        max_profit = 0

        for price in prices:
            min_price = min(min_price, price)
            max_profit = max(max_profit, price - min_price)

        return max_profit`
        }
      },
      explanation: 'Track the minimum price seen so far and calculate profit at each step.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 3,
      title: 'Longest Substring Without Repeating Characters',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
      description: 'Given a string s, find the length of the longest substring without repeating characters.',
      examples: [
        { input: 's = "abcabcbb"', output: '3' },
        { input: 's = "bbbbb"', output: '1' },
        { input: 's = "pwwkew"', output: '3' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Your code here

    }
}`,
          solution: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int maxLen = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);

            if (map.containsKey(c)) {
                left = Math.max(left, map.get(c) + 1);
            }

            map.put(c, right);
            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Your code here
        pass`,
          solution: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_map = {}
        max_len = 0
        left = 0

        for right, char in enumerate(s):
            if char in char_map:
                left = max(left, char_map[char] + 1)

            char_map[char] = right
            max_len = max(max_len, right - left + 1)

        return max_len`
        }
      },
      explanation: 'Use sliding window with HashMap. When duplicate found, move left pointer past the previous occurrence.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(min(m,n)) where m is charset size'
    },
    {
      id: 4,
      title: 'Longest Repeating Character Replacement',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/',
      description: 'You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times. Return the length of the longest substring containing the same letter you can get after performing the above operations.',
      examples: [
        { input: 's = "ABAB", k = 2', output: '4' },
        { input: 's = "AABABBA", k = 1', output: '4' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public int characterReplacement(String s, int k) {
        // Your code here

    }
}`,
          solution: `class Solution {
    public int characterReplacement(String s, int k) {
        int[] count = new int[26];
        int maxCount = 0;
        int maxLen = 0;
        int left = 0;

        for (int right = 0; right < s.length(); right++) {
            count[s.charAt(right) - 'A']++;
            maxCount = Math.max(maxCount, count[s.charAt(right) - 'A']);

            // If window size - max frequency > k, shrink window
            while (right - left + 1 - maxCount > k) {
                count[s.charAt(left) - 'A']--;
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        # Your code here
        pass`,
          solution: `class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        count = {}
        max_count = 0
        max_len = 0
        left = 0

        for right in range(len(s)):
            count[s[right]] = count.get(s[right], 0) + 1
            max_count = max(max_count, count[s[right]])

            # If replacements needed > k, shrink window
            while (right - left + 1) - max_count > k:
                count[s[left]] -= 1
                left += 1

            max_len = max(max_len, right - left + 1)

        return max_len`
        }
      },
      explanation: 'Track the most frequent character in the current window. If (window_size - max_frequency) > k, shrink the window.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1) - only 26 letters'
    },
    {
      id: 5,
      title: 'Permutation in String',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/permutation-in-string/',
      description: 'Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise. In other words, return true if one of s1\'s permutations is the substring of s2.',
      examples: [
        { input: 's1 = "ab", s2 = "eidbaooo"', output: 'true' },
        { input: 's1 = "ab", s2 = "eidboaoo"', output: 'false' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public boolean checkInclusion(String s1, String s2) {
        // Your code here

    }
}`,
          solution: `class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) return false;

        int[] s1Count = new int[26];
        int[] s2Count = new int[26];

        // Initialize frequency arrays
        for (int i = 0; i < s1.length(); i++) {
            s1Count[s1.charAt(i) - 'a']++;
            s2Count[s2.charAt(i) - 'a']++;
        }

        // Check if initial window matches
        if (Arrays.equals(s1Count, s2Count)) return true;

        // Slide the window
        for (int i = s1.length(); i < s2.length(); i++) {
            s2Count[s2.charAt(i) - 'a']++;
            s2Count[s2.charAt(i - s1.length()) - 'a']--;

            if (Arrays.equals(s1Count, s2Count)) return true;
        }

        return false;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        # Your code here
        pass`,
          solution: `class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        if len(s1) > len(s2):
            return False

        s1_count = [0] * 26
        s2_count = [0] * 26

        # Initialize frequency arrays
        for i in range(len(s1)):
            s1_count[ord(s1[i]) - ord('a')] += 1
            s2_count[ord(s2[i]) - ord('a')] += 1

        # Check if initial window matches
        if s1_count == s2_count:
            return True

        # Slide the window
        for i in range(len(s1), len(s2)):
            s2_count[ord(s2[i]) - ord('a')] += 1
            s2_count[ord(s2[i - len(s1)]) - ord('a')] -= 1

            if s1_count == s2_count:
                return True

        return False`
        }
      },
      explanation: 'Use fixed-size sliding window equal to s1 length. Compare character frequencies.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 6,
      title: 'Minimum Size Subarray Sum',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/minimum-size-subarray-sum/',
      description: 'Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.',
      examples: [
        { input: 'target = 7, nums = [2,3,1,2,4,3]', output: '2' },
        { input: 'target = 4, nums = [1,4,4]', output: '1' },
        { input: 'target = 11, nums = [1,1,1,1,1,1,1,1]', output: '0' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        // Your code here

    }
}`,
          solution: `class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int left = 0;
        int sum = 0;
        int minLen = Integer.MAX_VALUE;

        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];

            while (sum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                sum -= nums[left];
                left++;
            }
        }

        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        # Your code here
        pass`,
          solution: `class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        left = 0
        current_sum = 0
        min_len = float('inf')

        for right in range(len(nums)):
            current_sum += nums[right]

            while current_sum >= target:
                min_len = min(min_len, right - left + 1)
                current_sum -= nums[left]
                left += 1

        return min_len if min_len != float('inf') else 0`
        }
      },
      explanation: 'Use variable-size sliding window. Expand until sum >= target, then contract to find minimum.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 7,
      title: 'Find K Closest Elements',
      difficulty: 'Medium',
      leetcodeUrl: 'https://leetcode.com/problems/find-k-closest-elements/',
      description: 'Given a sorted integer array arr, two integers k and x, return the k closest integers to x in the array. The result should also be sorted in ascending order.',
      examples: [
        { input: 'arr = [1,2,3,4,5], k = 4, x = 3', output: '[1,2,3,4]' },
        { input: 'arr = [1,2,3,4,5], k = 4, x = -1', output: '[1,2,3,4]' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        // Your code here

    }
}`,
          solution: `class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        int left = 0;
        int right = arr.length - k;

        while (left < right) {
            int mid = left + (right - left) / 2;

            // Compare distances
            if (x - arr[mid] > arr[mid + k] - x) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        List<Integer> result = new ArrayList<>();
        for (int i = left; i < left + k; i++) {
            result.add(arr[i]);
        }

        return result;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        # Your code here
        pass`,
          solution: `class Solution:
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        left = 0
        right = len(arr) - k

        while left < right:
            mid = (left + right) // 2

            # Compare distances
            if x - arr[mid] > arr[mid + k] - x:
                left = mid + 1
            else:
                right = mid

        return arr[left:left + k]`
        }
      },
      explanation: 'Binary search to find the start of k-element window. Compare distances from edges.',
      timeComplexity: 'O(log(n-k) + k)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 8,
      title: 'Minimum Window Substring',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/',
      description: 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".',
      examples: [
        { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"' },
        { input: 's = "a", t = "a"', output: '"a"' },
        { input: 's = "a", t = "aa"', output: '""' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public String minWindow(String s, String t) {
        // Your code here

    }
}`,
          solution: `class Solution {
    public String minWindow(String s, String t) {
        if (s.length() < t.length()) return "";

        Map<Character, Integer> tCount = new HashMap<>();
        Map<Character, Integer> window = new HashMap<>();

        for (char c : t.toCharArray()) {
            tCount.put(c, tCount.getOrDefault(c, 0) + 1);
        }

        int left = 0, minLen = Integer.MAX_VALUE, minStart = 0;
        int required = tCount.size();
        int formed = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            window.put(c, window.getOrDefault(c, 0) + 1);

            if (tCount.containsKey(c) && window.get(c).intValue() == tCount.get(c).intValue()) {
                formed++;
            }

            while (formed == required && left <= right) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minStart = left;
                }

                char leftChar = s.charAt(left);
                window.put(leftChar, window.get(leftChar) - 1);
                if (tCount.containsKey(leftChar) && window.get(leftChar) < tCount.get(leftChar)) {
                    formed--;
                }
                left++;
            }
        }

        return minLen == Integer.MAX_VALUE ? "" : s.substring(minStart, minStart + minLen);
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def minWindow(self, s: str, t: str) -> str:
        # Your code here
        pass`,
          solution: `class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if len(s) < len(t):
            return ""

        t_count = {}
        window = {}

        for c in t:
            t_count[c] = t_count.get(c, 0) + 1

        left = 0
        min_len = float('inf')
        min_start = 0
        required = len(t_count)
        formed = 0

        for right in range(len(s)):
            c = s[right]
            window[c] = window.get(c, 0) + 1

            if c in t_count and window[c] == t_count[c]:
                formed += 1

            while formed == required and left <= right:
                if right - left + 1 < min_len:
                    min_len = right - left + 1
                    min_start = left

                left_char = s[left]
                window[left_char] -= 1
                if left_char in t_count and window[left_char] < t_count[left_char]:
                    formed -= 1
                left += 1

        return s[min_start:min_start + min_len] if min_len != float('inf') else ""`
        }
      },
      explanation: 'Use two HashMaps to track characters. Expand window until all chars found, then contract to find minimum.',
      timeComplexity: 'O(m + n)',
      spaceComplexity: 'O(m + n)'
    },
    {
      id: 9,
      title: 'Sliding Window Maximum',
      difficulty: 'Hard',
      leetcodeUrl: 'https://leetcode.com/problems/sliding-window-maximum/',
      description: 'You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.',
      examples: [
        { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]' },
        { input: 'nums = [1], k = 1', output: '[1]' }
      ],
      code: {
        java: {
          starterCode: `class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        // Your code here

    }
}`,
          solution: `class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || k <= 0) return new int[0];

        int n = nums.length;
        int[] result = new int[n - k + 1];
        Deque<Integer> deque = new LinkedList<>();

        for (int i = 0; i < n; i++) {
            // Remove indices outside window
            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
                deque.pollFirst();
            }

            // Remove smaller elements as they're not useful
            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }

            deque.offerLast(i);

            // Add to result once window is formed
            if (i >= k - 1) {
                result[i - k + 1] = nums[deque.peekFirst()];
            }
        }

        return result;
    }
}`
        },
        python: {
          starterCode: `class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        # Your code here
        pass`,
          solution: `class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        from collections import deque

        if not nums or k <= 0:
            return []

        result = []
        dq = deque()

        for i in range(len(nums)):
            # Remove indices outside window
            while dq and dq[0] < i - k + 1:
                dq.popleft()

            # Remove smaller elements
            while dq and nums[dq[-1]] < nums[i]:
                dq.pop()

            dq.append(i)

            # Add to result once window is formed
            if i >= k - 1:
                result.append(nums[dq[0]])

        return result`
        }
      },
      explanation: 'Use deque to maintain indices of useful elements (potential maximums) in decreasing order.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(k)'
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`Sliding Window-${q.id}`)).length
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

            <div style={{ marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`Sliding Window-${selectedQuestion.id}`} />
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
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
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
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>🪟 Sliding Window</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Master the sliding window technique for substring and subarray problems</p>

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
                          <CompletionCheckbox problemId={`Sliding Window-${question.id}`} />
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

export default SlidingWindow
