/**
 * AI-Enabled Technical Interview Tips
 *
 * Comprehensive guide to succeeding in AI-enabled technical interviews
 * Organized into concepts with tabbed details for deep exploration
 */

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

/**
 * Main AI topic colors - purple theme
 */
const AI_COLORS = {
  primary: '#8b5cf6',
  primaryHover: '#a78bfa',
  bg: 'rgba(139, 92, 246, 0.1)',
  border: 'rgba(139, 92, 246, 0.3)',
  arrow: '#8b5cf6',
  hoverBg: 'rgba(139, 92, 246, 0.2)',
  topicBg: 'rgba(139, 92, 246, 0.2)'
}

/**
 * Alternating colors for subtopic detail explanations
 */
const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },    // blue
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },      // green
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },    // amber
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },    // purple
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },    // pink
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },      // cyan
]

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function AIInterviewTips({ onBack, breadcrumb }) {
  // State for modal navigation
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'understanding-ai-interviews',
      name: 'Understanding AI-Enabled Interviews',
      icon: '🎯',
      color: '#8b5cf6',
      description: 'What to expect and how AI tools are integrated in modern technical interviews.',
      details: [
        {
          name: 'Overview',
          explanation: 'AI-enabled technical interviews allow candidates to use AI coding assistants (like GitHub Copilot, Claude, or ChatGPT) during the interview process. This reflects modern development practices where AI tools are part of everyday workflows. The focus shifts from memorization to problem-solving, communication, and effective use of AI as a tool.',
          keyPoints: [
            'AI is a tool, not a replacement for your skills - interviewers evaluate how you USE the tool',
            'You must understand and explain every line of code, whether AI-generated or not',
            'Communication is MORE important - explain your thought process as you work',
            'Debugging AI suggestions demonstrates real engineering skills',
            'Time management matters - know when to use AI vs write code yourself',
            'Companies test your ability to work WITH AI, not just have AI work for you'
          ]
        },
        {
          name: 'Key Points to Remember',
          explanation: 'These fundamental principles will guide your success in AI-enabled interviews. Understanding these concepts is crucial before diving into specific techniques.',
          keyPoints: [
            'Think of AI as a junior developer you\'re mentoring - review everything carefully',
            'Your communication skills become even more critical than in traditional interviews',
            'Testing and validation are non-negotiable, even for AI-generated code',
            'Interviewers want to see your problem-solving process, not just the final solution',
            'Being able to debug and improve AI suggestions shows senior-level thinking',
            'The goal is human-AI collaboration, not AI replacement'
          ]
        },
        {
          name: 'Before the Interview',
          explanation: 'Preparation is key to success. These steps will help you enter the interview with confidence and the right mindset.',
          keyPoints: [
            'Practice with the specific AI tool allowed in your interview',
            'Understand the tool\'s strengths and limitations through hands-on experience',
            'Prepare to explain AI-generated code line by line without hesitation',
            'Time yourself solving problems with AI to develop efficient workflows',
            'Record yourself explaining code to improve your communication',
            'Study common pitfalls and how to avoid them'
          ]
        }
      ]
    },
    {
      id: 'effective-prompting',
      name: 'Effective Prompting Strategies',
      icon: '💬',
      color: '#10b981',
      description: 'How to communicate with AI tools for best results and demonstrate your engineering skills.',
      details: [
        {
          name: 'Prompting Fundamentals',
          explanation: 'The quality of AI assistance depends heavily on how you communicate with it. Effective prompting is a skill that demonstrates your understanding of the problem and your ability to break down complex requirements. Interviewers observe how you formulate requests and iterate on AI responses.',
          keyPoints: [
            'Start with problem context before asking for code',
            'Break complex problems into smaller, focused prompts',
            'Specify constraints: language, time/space complexity, edge cases',
            'Ask for explanations, not just code',
            'Iterate: refine prompts based on initial responses',
            'Use AI to validate your approach before implementation'
          ]
        },
        {
          name: 'Bad vs Good Prompts',
          explanation: 'Learning from examples helps you craft better prompts. Here are real-world comparisons showing the difference between vague and effective prompting.',
          codeExample: `// BAD PROMPT:
"Write a function to solve two sum"

// GOOD PROMPT:
"I need to solve Two Sum: given an array of integers and a target,
return indices of two numbers that add up to target.

Requirements:
- O(n) time complexity
- Use a hash map approach
- Handle edge cases: empty array, no solution, negative numbers
- Language: Python
- Include comments explaining the approach"

Why good: Provides context, constraints, approach hints, and specific
requirements. AI can generate much more accurate and complete code.`
        },
        {
          name: 'Iterative Refinement',
          explanation: 'Rarely will your first prompt give you perfect code. The ability to iterate and refine shows professional development skills.',
          keyPoints: [
            'Start with a high-level prompt to get the structure right',
            'Refine based on what the AI produces - add missing requirements',
            'Ask follow-up questions about specific parts you\'re unsure about',
            'Request optimizations or alternative approaches',
            'Have AI explain its reasoning to verify correctness',
            'Keep a dialogue going rather than accepting the first response'
          ]
        }
      ]
    },
    {
      id: 'code-review',
      name: 'Code Review & Validation',
      icon: '🔍',
      color: '#f59e0b',
      description: 'How to critically evaluate AI-generated code and demonstrate your expertise.',
      details: [
        {
          name: 'Critical Evaluation',
          explanation: 'Never blindly trust AI-generated code. Interviewers specifically watch for candidates who can identify issues, suggest improvements, and explain why code works or doesn\'t. This skill separates junior developers from senior engineers.',
          keyPoints: [
            'Always trace through the code with a test case before running',
            'Check edge cases: empty input, single element, duplicates, negative numbers',
            'Verify time and space complexity matches requirements',
            'Look for potential bugs: off-by-one errors, null checks, integer overflow',
            'Consider readability and maintainability improvements',
            'Ask yourself: "Would I approve this in a code review?"'
          ]
        },
        {
          name: 'Code Review Checklist',
          explanation: 'Use this systematic approach to review any code, AI-generated or otherwise. This demonstrates professional engineering discipline.',
          codeExample: `// CORRECTNESS CHECKLIST
☐ Does it handle the base case?
☐ Does it work for the examples given?
☐ What about edge cases (empty, null, single element)?
☐ Are boundary conditions handled correctly?

// EFFICIENCY CHECKLIST
☐ What's the time complexity? Does it meet requirements?
☐ What's the space complexity? Can it be optimized?
☐ Are there redundant operations?
☐ Could a better data structure improve performance?

// CODE QUALITY CHECKLIST
☐ Are variable names meaningful and descriptive?
☐ Is the logic clear and easy to follow?
☐ Are there unnecessary operations or duplications?
☐ Does it follow language conventions?

// ROBUSTNESS CHECKLIST
☐ Does it handle invalid input gracefully?
☐ Are there potential runtime errors (division by zero, null pointer)?
☐ Is error handling appropriate?
☐ Are there security considerations?`
        },
        {
          name: 'Tracing Through Code',
          explanation: 'Manually tracing execution with test cases is crucial for understanding and validating code. This demonstrates deep understanding.',
          codeExample: `// Example: Trace through Two Sum solution
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Trace with nums = [2, 7, 11, 15], target = 9
# i=0, num=2, complement=7, seen={}, seen[2]=0
# i=1, num=7, complement=2, 2 in seen! return [0, 1] ✓

# Trace with edge case: nums = [], target = 0
# Loop never executes, return [] ✓

# Always trace with:
# 1. The given example
# 2. An edge case
# 3. A case where the algorithm might fail`
        }
      ]
    },
    {
      id: 'debugging-with-ai',
      name: 'Debugging with AI',
      icon: '🐛',
      color: '#ef4444',
      description: 'Using AI to identify and fix issues effectively while demonstrating problem-solving skills.',
      details: [
        {
          name: 'Effective Debugging Approach',
          explanation: 'Debugging is where your engineering skills truly shine. Using AI to help debug shows sophistication - you\'re leveraging all available tools. The key is to provide context, isolate the problem, and understand the fix rather than just applying it.',
          keyPoints: [
            'Describe the expected behavior vs actual behavior clearly',
            'Provide the specific input that causes the issue',
            'Share relevant error messages or stack traces',
            'Explain what you\'ve already tried',
            'Ask for explanation of WHY the bug occurs, not just the fix',
            'Verify the fix doesn\'t introduce new issues'
          ]
        },
        {
          name: 'Six-Step Debugging Process',
          explanation: 'Follow this systematic approach to debugging. This demonstrates professional problem-solving methodology.',
          codeExample: `// STEP 1: REPRODUCE
# Find a specific test case that fails consistently
Input: [1, 2, 3], Expected: [1, 3], Actual: [1, 2]

// STEP 2: ISOLATE
# Narrow down which part causes the issue
# Add debug prints or use debugger

// STEP 3: HYPOTHESIZE
# Form a theory BEFORE asking AI
# "I think the issue is in the filtering logic..."

// STEP 4: QUERY AI
# Share your hypothesis with context
"This function should filter even numbers but it's
filtering odd numbers instead. I think the condition
is inverted. Here's my code: [code]. Can you verify?"

// STEP 5: UNDERSTAND
# Don't just apply the fix - understand WHY
"The condition 'num % 2 == 0' checks for even numbers,
but I want odd numbers, so I need 'num % 2 != 0'"

// STEP 6: VERIFY
# Test the fix with multiple cases
# Check for regression issues`
        },
        {
          name: 'Communicating Debug Process',
          explanation: 'How you communicate during debugging is as important as finding the fix. Verbalize your thought process.',
          keyPoints: [
            'Explain what you observe: "The output is X but I expected Y"',
            'Share your hypothesis: "I think the issue might be..."',
            'Describe your debugging strategy: "Let me add a print statement to check..."',
            'Narrate as you ask AI: "I\'m going to ask the AI to help verify my hypothesis"',
            'Explain the root cause once found: "The bug was caused by..."',
            'Verify the fix: "Let me test this with a few more cases to ensure it\'s correct"'
          ]
        }
      ]
    },
    {
      id: 'communication',
      name: 'Communication During Interview',
      icon: '🗣️',
      color: '#3b82f6',
      description: 'How to narrate your thought process effectively and demonstrate problem-solving abilities.',
      details: [
        {
          name: 'Why Communication Matters',
          explanation: 'In AI-enabled interviews, communication becomes even more critical. Interviewers can\'t see your thought process when you\'re typing prompts, so you must verbalize everything. This demonstrates your problem-solving approach and engineering judgment.',
          keyPoints: [
            'Explain the problem in your own words before starting',
            'Discuss your approach and why you chose it',
            'Verbalize what you\'re asking the AI and why',
            'Explain AI suggestions before accepting or modifying them',
            'Discuss trade-offs and alternative approaches',
            'Ask the interviewer questions - it shows engagement'
          ]
        },
        {
          name: 'Starting a Problem',
          explanation: 'How you begin sets the tone. Show you understand the problem before jumping to code.',
          codeExample: `// WHAT TO SAY:
"Let me make sure I understand the problem correctly. We need to
[restate problem in your own words].

The key constraints are:
- [List constraint 1]
- [List constraint 2]
- [List constraint 3]

I'm thinking of approaching this with [algorithm/data structure]
because [reasoning about why this approach fits].

For example, if the input is [example], we'd expect [output]
because [explanation].

Does that sound right before I start?"

// WHY THIS WORKS:
- Shows you understand the problem
- Demonstrates analytical thinking
- Catches misunderstandings early
- Gets interviewer buy-in before coding`
        },
        {
          name: 'Using AI Assistance',
          explanation: 'Narrate your AI interactions to make your thought process visible.',
          codeExample: `// WHAT TO SAY:
"I'm going to ask the AI to help with [specific task].

I want to use [approach] because [reasoning].

Let me formulate a prompt that includes:
- The problem context
- The constraints we discussed
- The approach I want to take
- Edge cases to handle

[Type and read prompt aloud]

Now let me review what the AI suggested..."

// WHEN REVIEWING AI OUTPUT:
"Let me trace through this code with our example input.

Starting with [input], we first [step through logic].

I notice [observation].

This looks correct/I see a potential issue with [concern]..."

// WHY THIS WORKS:
- Shows strategic thinking
- Demonstrates you're driving, not passenger
- Makes your evaluation process visible`
        },
        {
          name: 'Debugging Communication',
          explanation: 'How to verbalize the debugging process effectively.',
          codeExample: `// WHAT TO SAY WHEN DEBUGGING:
"The test case [input] is failing.

Expected [expected output] but got [actual output].

Let me add some debug output to trace where it goes wrong...

[Add prints and run]

Interesting - I can see that [observation from debug output].

I think the issue might be [hypothesis].

Let me ask the AI to help verify this...

[Formulate debugging prompt]

Ah yes, the AI confirms that [explanation].

The bug was caused by [root cause].

Let me fix this and verify with our test cases..."

// WHY THIS WORKS:
- Shows systematic debugging approach
- Demonstrates hypothesis-driven debugging
- Makes your reasoning transparent
- Shows you understand the fix, not just apply it`
        }
      ]
    },
    {
      id: 'time-management',
      name: 'Time Management',
      icon: '⏱️',
      color: '#06b6d4',
      description: 'When to use AI vs write code yourself, and how to allocate your interview time.',
      details: [
        {
          name: 'Strategic AI Usage',
          explanation: 'AI can save time, but it can also waste time if used incorrectly. Knowing when to use AI assistance versus writing code yourself is a crucial skill. For simple operations, typing may be faster than prompting.',
          keyPoints: [
            'Use AI for: boilerplate code, syntax reminders, complex algorithms you understand conceptually',
            'Write yourself: simple operations, code you can type faster than explain, modifications to existing code',
            'Set time limits: if AI isn\'t helping after 2-3 attempts, try a different approach',
            'Don\'t over-optimize prompts - sometimes it\'s faster to write the code',
            'Use AI for validation: "Does this approach handle [edge case]?"',
            'Budget time for code review - AI code still needs verification'
          ]
        },
        {
          name: 'Time Allocation Guide',
          explanation: 'How to budget your time during a typical 45-60 minute coding interview.',
          codeExample: `// RECOMMENDED TIME ALLOCATION

Phase 1: Problem Understanding (10-15%)
- Read the problem carefully
- Ask clarifying questions
- Restate the problem
- Discuss examples and edge cases
Time: 5-8 minutes

Phase 2: Approach Discussion (10-15%)
- Discuss algorithm options
- Choose data structures
- Explain trade-offs
- Get interviewer agreement
Time: 5-8 minutes

Phase 3: Implementation (40-50%)
- Write code (with or without AI)
- Explain as you go
- Handle syntax and logic
Time: 20-25 minutes

Phase 4: Testing & Debugging (20-25%)
- Run through test cases
- Find and fix bugs
- Verify edge cases
Time: 10-12 minutes

Phase 5: Optimization & Discussion (5-10%)
- Analyze complexity
- Discuss improvements
- Answer follow-ups
Time: 3-5 minutes

IMPORTANT: These are guidelines. Adapt based on problem
complexity and how the interview is progressing.`
        },
        {
          name: 'When AI Slows You Down',
          explanation: 'Recognize these situations where writing code yourself is faster than using AI.',
          keyPoints: [
            'Simple variable declarations or basic loops',
            'Code you\'ve written hundreds of times before',
            'Small modifications to existing code',
            'When the prompt would be longer than the code itself',
            'When you\'re already in the flow of typing',
            'Quick fixes or one-line changes'
          ],
          codeExample: `// FASTER TO WRITE YOURSELF:

// Simple loop
for (int i = 0; i < n; i++) {
    sum += arr[i];
}

// Basic initialization
Map<String, Integer> map = new HashMap<>();

// Simple condition
if (s == null || s.isEmpty()) {
    return "";
}

// GOOD USE OF AI:

// Complex algorithm you understand conceptually
"Implement a trie data structure with insert and
search methods, including prefix matching"

// Boilerplate with specific requirements
"Create a binary tree node class with left, right,
and parent pointers, plus utility methods for
finding depth and checking if balanced"

KEY INSIGHT: If explaining the code to AI takes longer
than typing it, just type it yourself.`
        }
      ]
    },
    {
      id: 'common-pitfalls',
      name: 'Common Pitfalls to Avoid',
      icon: '⚠️',
      color: '#dc2626',
      description: 'Mistakes that hurt your interview performance and how to avoid them.',
      details: [
        {
          name: 'Silent Working',
          explanation: 'Going silent while typing or thinking is one of the biggest mistakes in technical interviews.',
          problem: 'Copy-pasting AI code without understanding it',
          consequence: 'When asked to explain, you\'ll stumble and lose credibility. Interviewers immediately notice when you don\'t understand your own code.',
          solution: 'Trace through every line. Ask AI to explain if needed, but make sure YOU understand before presenting. Be prepared to modify or debug it.',
          codeExample: `// BAD: Silent acceptance
[Paste AI code]
"Okay, I think this works."

// GOOD: Thoughtful review
[Review AI code]
"Let me trace through this. Starting with input [x]...
First, we initialize [y] to handle [case].
Then we iterate and check [condition].
This handles our edge case of [z] by [logic].
The time complexity is O(n) because [reason].
Let me test it with our examples..."`
        },
        {
          name: 'Over-Reliance on AI',
          explanation: 'Using AI for everything, even trivial tasks, signals lack of basic skills.',
          problem: 'Using AI for simple operations like basic loops or conditionals',
          consequence: 'Wastes time and looks like you lack basic skills. Interviewers wonder if you can code without AI.',
          solution: 'Write simple code yourself. Use AI for complex logic or when genuinely stuck. Show you can code independently.',
          codeExample: `// BAD: Asking AI for basics
"Write a for loop that iterates from 0 to n"
[Wait for response]
[Copy code]

// GOOD: Basic coding + Strategic AI use
// Write basic structure yourself
int maxProfit = 0;
for (int i = 0; i < prices.length - 1; i++) {
    // Use AI for complex algorithmic logic
    "Help me implement the optimal strategy for
    stock trading with at most k transactions..."
}

KEY INSIGHT: Demonstrate you CAN code. Use AI as a force
multiplier, not a replacement for fundamental skills.`
        },
        {
          name: 'Not Testing AI Code',
          explanation: 'Assuming AI-generated code is correct without verification.',
          problem: 'Submitting AI code without running through test cases',
          consequence: 'AI code often has subtle bugs. You\'ll be blamed for not catching them. Shows poor engineering discipline.',
          solution: 'Always run through test cases manually before declaring "done". Trace execution. Check edge cases.',
          keyPoints: [
            'Run the given examples step by step',
            'Test edge cases: empty input, single element, maximum size',
            'Look for off-by-one errors in loops and conditionals',
            'Verify null/undefined checks',
            'Check for integer overflow in mathematical operations',
            'Ensure the algorithm handles all specified constraints'
          ]
        },
        {
          name: 'Giving Up When AI Fails',
          explanation: 'Becoming helpless when AI doesn\'t provide the right solution.',
          problem: 'Stopping when AI can\'t solve the problem or gives wrong answers',
          consequence: 'Shows you can only work with AI, not independently. This is a major red flag for interviewers.',
          solution: 'Use AI for hints, but be prepared to solve problems yourself. Treat AI like Stack Overflow - helpful but not infallible.',
          codeExample: `// BAD: Giving up
"The AI isn't giving me the right answer...
I'm not sure what to do."

// GOOD: Independent problem-solving
"The AI suggestion isn't quite right - it's not
handling [specific case].

Let me think through this myself...

[Draw on whiteboard/paper]

The issue is [analysis]. I need to [approach].

Let me modify the AI's code to fix [specific issue]...

Or maybe I should try a different approach entirely.
What if we [alternative idea]?"

MINDSET: AI is a tool, not a crutch. Show you can
think independently and debug/improve AI output.`
        },
        {
          name: 'Skipping Clarifying Questions',
          explanation: 'Diving into code without fully understanding the requirements.',
          problem: 'Not asking clarifying questions before starting to code',
          consequence: 'You might solve the wrong problem or miss important constraints. Time wasted, trust lost.',
          solution: 'Always confirm understanding before coding, with or without AI. Ask about edge cases, constraints, and expected behavior.',
          keyPoints: [
            'Ask about input constraints: size limits, value ranges, data types',
            'Clarify expected output format and edge case behavior',
            'Confirm time/space complexity requirements',
            'Discuss what should happen with invalid inputs',
            'Verify your understanding with example walk-throughs',
            'Better to ask "dumb" questions than solve the wrong problem'
          ]
        }
      ]
    },
    {
      id: 'practice-exercises',
      name: 'Practice Exercises',
      icon: '💪',
      color: '#22c55e',
      description: 'How to prepare for AI-enabled interviews with hands-on practice.',
      details: [
        {
          name: 'Why Practice is Essential',
          explanation: 'Practicing with AI tools before your interview is essential. You need to develop muscle memory for the workflow and understand the tool\'s capabilities and limitations. Just like learning a new IDE, proficiency comes with practice.',
          keyPoints: [
            'Practice with the specific tool allowed in your interview',
            'Time yourself solving LeetCode problems with AI assistance',
            'Record yourself and review your communication',
            'Practice explaining AI-generated code to a friend',
            'Deliberately introduce bugs and practice debugging with AI',
            'Try problems of varying difficulty to understand when AI helps most'
          ]
        },
        {
          name: 'Exercise 1: Prompt Iteration',
          explanation: 'Learn to refine your prompts efficiently through practice.',
          codeExample: `GOAL: Get working code in 3 or fewer prompt iterations

1. Choose a Medium LeetCode problem
2. Start with a vague prompt (intentionally)
3. Iteratively refine based on AI response
4. Track number of iterations needed

Example progression:

ITERATION 1 (Vague):
"Write code to find longest substring"
→ AI gives generic code, missing constraints

ITERATION 2 (Adding constraints):
"Find longest substring without repeating characters.
Input: string. Output: integer length. Handle empty string."
→ Better, but may not be optimal approach

ITERATION 3 (Specifying approach):
"Find longest substring without repeating characters using
sliding window technique. Track characters in HashSet.
Move left pointer when duplicate found. Update max length."
→ Should get correct, optimal solution

LESSON: Learn to front-load context and constraints.
Practice until you can get it right in 1-2 iterations.`
        },
        {
          name: 'Exercise 2: Code Explanation',
          explanation: 'Ensure you can explain every line of AI-generated code.',
          codeExample: `GOAL: Explain AI code so clearly that someone else could
implement it from your explanation alone.

1. Have AI generate a solution to a problem
2. Explain every line out loud (or to a friend)
3. If you can't explain something, that's a red flag

EXPLANATION TEMPLATE:

"This function [purpose].

First, we initialize [variables] to [reason].

Then we [main loop/logic] because [why this works].

In each iteration, we [step] which handles [case].

The key insight is [algorithmic idea].

We return [result] which represents [meaning].

The time complexity is [X] because [reasoning].
The space complexity is [Y] because [reasoning]."

RED FLAGS (indicating you don't understand):
- "I'm not sure why we need this variable"
- "The AI just added this line"
- "I think this handles some edge case?"
- "It works but I'm not sure how"

If you can't explain it, DON'T USE IT.`
        },
        {
          name: 'Exercise 3: Bug Hunt',
          explanation: 'Practice debugging AI code to identify and fix issues.',
          codeExample: `GOAL: Develop systematic debugging skills with AI assistance.

1. Take a working solution (yours or AI-generated)
2. Introduce 3 subtle bugs:
   - Off-by-one error
   - Missing edge case check
   - Logic error in a condition
3. Use AI to help find and fix them
4. Practice your debugging dialogue

EXAMPLE BUGS TO INTRODUCE:

BUG 1: Off-by-one
for (int i = 0; i <= arr.length; i++)  // Should be <

BUG 2: Missing null check
if (s.isEmpty()) return "";  // Should check null first

BUG 3: Wrong condition
if (num % 2 == 0)  // Should be != for odd numbers

DEBUGGING DIALOGUE PRACTICE:
"I'm getting an ArrayIndexOutOfBoundsException.
Let me check the loop bounds... Ah, I see,
I'm using <= when I should use <."

LESSON: Learn to spot common bug patterns and
articulate debugging reasoning clearly.`
        },
        {
          name: 'Exercise 4: Speed Comparison',
          explanation: 'Understand when AI helps and when it adds overhead.',
          codeExample: `GOAL: Develop intuition for when to use AI vs code yourself.

For 5 different problems:
1. Solve it completely yourself (time it)
2. Solve it again with full AI assistance (time it)
3. Compare times and note when AI helped/hurt

PROBLEMS TO TRY:
1. Easy: Two Sum
2. Easy: Reverse String
3. Medium: LRU Cache
4. Medium: Course Schedule
5. Hard: Serialize Binary Tree

TYPICAL FINDINGS:
- AI helps most with:
  * Complex algorithms (LRU Cache, Graph problems)
  * Boilerplate-heavy code
  * Syntax in unfamiliar languages

- AI adds overhead for:
  * Simple problems you know well
  * Quick modifications
  * Basic data structure operations

LESSON: Build intuition for AI's ROI on different
problem types. Use it strategically, not universally.`
        },
        {
          name: 'Exercise 5: Mock Interview',
          explanation: 'Practice the full interview workflow with a partner.',
          codeExample: `GOAL: Simulate real interview conditions with AI tools.

SETUP:
1. Find a partner to act as interviewer
2. Use screen sharing (just like real interviews)
3. Allow AI tool usage
4. Set 45-minute time limit
5. Record the session

INTERVIEW FLOW:
1. Interviewer presents problem (5 min)
2. You ask clarifying questions (3 min)
3. Discuss approach (5 min)
4. Implement with AI assistance (20 min)
5. Test and debug (7 min)
6. Discuss optimizations (5 min)

WHAT TO PRACTICE:
✓ Think-aloud narration
✓ Explaining AI prompts
✓ Reviewing AI code critically
✓ Debugging out loud
✓ Time management

REVIEW TOGETHER:
- Communication clarity
- Problem-solving approach
- AI usage strategy
- Code quality
- Time management

LESSON: This is the most valuable practice. Do 5-10
of these before your real interview.`
        }
      ]
    },
    {
      id: 'resources',
      name: 'Resources & Practice Platforms',
      icon: '🔗',
      color: '#0891b2',
      description: 'Websites, tools, and communities to practice AI-enabled interviews.',
      details: [
        {
          name: 'AI Coding Assistants',
          explanation: 'These are the tools you should practice with. Different companies allow different tools, so familiarize yourself with multiple options.',
          codeExample: `// MOST COMMON TOOLS IN INTERVIEWS:

1. GitHub Copilot
   - Most widely used in industry
   - Inline suggestions as you type
   - Good for boilerplate and common patterns
   - Practice: Install in VS Code, solve 20 LeetCode problems

2. ChatGPT / Claude
   - Excellent for explanations and debugging
   - More conversational, better for complex reasoning
   - Can handle nuanced instructions
   - Practice: Use for code review and debugging help

3. Cursor IDE
   - AI-first editor with built-in assistance
   - Great for learning AI-integrated workflows
   - Practice: Use as your daily driver for a week

4. Amazon CodeWhisperer
   - Free alternative to Copilot
   - Some companies use this specifically
   - Practice: Try if your interview uses AWS tools

LINKS:
- GitHub Copilot: github.com/features/copilot
- Claude: claude.ai
- ChatGPT: chat.openai.com
- Cursor: cursor.sh
- CodeWhisperer: aws.amazon.com/codewhisperer
- Codeium (free): codeium.com`
        },
        {
          name: 'Coding Practice Platforms',
          explanation: 'Where to practice problems while using AI assistants.',
          codeExample: `// TOP PLATFORMS FOR PRACTICE:

LeetCode (leetcode.com)
- Gold standard for interview prep
- 2000+ problems with test cases
- Practice: Solve 100 problems with AI assistance
- Focus: Communication while using AI

HackerRank (hackerrank.com)
- Many companies use for assessments
- Timed challenges
- Practice: Take assessment-style tests with AI

CodeSignal (codesignal.com)
- Used by Google, Meta, others
- GCA (General Coding Assessment) format
- Practice: Simulate real company assessments

AlgoExpert (algoexpert.io)
- Curated problems with video explanations
- Watch explanation → implement with AI → compare
- Practice: Explain AI code like the videos do

NeetCode (neetcode.io)
- Free LeetCode roadmap
- Organized by pattern
- Practice: Follow roadmap, use AI strategically

Exercism (exercism.org)
- Free with mentorship
- Practice explaining code to mentors
- Good for communication skills`
        },
        {
          name: 'Mock Interview Services',
          explanation: 'Practice with real people to simulate interview conditions.',
          codeExample: `// MOCK INTERVIEW PLATFORMS:

Interviewing.io
- Anonymous interviews with real engineers
- Some allow AI tools
- Get feedback on performance
- URL: interviewing.io

Pramp
- Free peer-to-peer mock interviews
- Practice both sides (interviewer/interviewee)
- Great for AI-enabled practice with a partner
- URL: pramp.com

Exponent
- Tech interview coaching
- Mock interviews with professionals
- Can request AI-enabled practice
- URL: tryexponent.com

Prepfully
- Interview with industry professionals
- Realistic feedback
- Ask for AI-enabled format
- URL: prepfully.com

KEY TIP: Do at least 5 mock interviews before
real ones. Practice specifically with AI tools
to develop your workflow and communication style.`
        },
        {
          name: 'Learning Resources',
          explanation: 'Study materials for prompt engineering and AI-assisted development.',
          codeExample: `// PROMPT ENGINEERING COURSES:

1. Prompt Engineering Guide
   promptingguide.ai
   - Comprehensive techniques
   - Coding-specific examples
   - Free resource

2. Learn Prompting
   learnprompting.org
   - Free course format
   - Practical exercises
   - Good for beginners

3. DeepLearning.AI - ChatGPT for Developers
   deeplearning.ai/short-courses
   - Free 1-hour course by Andrew Ng
   - Highly relevant to coding interviews
   - Best practices from OpenAI

4. GitHub Copilot Documentation
   docs.github.com/en/copilot
   - Official tips and tricks
   - Best practices
   - Common patterns

STUDY APPROACH:
Week 1: Take prompt engineering course
Week 2: Practice 20 LeetCode problems with AI
Week 3: Do 3 mock interviews
Week 4: Focus on weak areas

The investment pays off - good prompting skills
make you 3x more effective with AI tools.`
        },
        {
          name: 'Communities & Discussion',
          explanation: 'Join communities to learn from others\' experiences and stay updated.',
          codeExample: `// ACTIVE COMMUNITIES:

Reddit r/cscareerquestions
- Search: "AI interview experience"
- Latest trends and company-specific info
- reddit.com/r/cscareerquestions

Blind (Team Blind App)
- Anonymous professional network
- Company-specific interview experiences
- Search: "[Company] AI interview"
- teamblind.com

Discord: CS Career Hub
- Active interview prep channels
- AI tools discussions
- Mock interview partners
- discord.gg/cscareers

Hacker News
- Tech industry discussions
- Search: "AI interview"
- High-quality threads
- news.ycombinator.com

PARTICIPATION TIPS:
- Share your experiences (anonymously if needed)
- Ask specific questions about AI tool usage
- Look for recent threads (practices evolve quickly)
- Verify advice with multiple sources

WHAT TO SEARCH FOR:
- "[Company] AI-enabled interview experience"
- "Interview with Copilot allowed"
- "AI coding assessment tips"
- "ChatGPT technical interview"`
        },
        {
          name: 'YouTube Channels',
          explanation: 'Video content for learning algorithms and AI tool usage.',
          codeExample: `// RECOMMENDED CHANNELS:

NeetCode
youtube.com/@NeetCode
- Algorithm explanations
- LeetCode solutions
- Watch → Implement with AI → Compare
- Goal: Explain AI code as clearly as his videos

TechLead
youtube.com/@TechLead
- Ex-Google/Facebook engineer
- Interview strategies
- Industry insights

Fireship
youtube.com/@Fireship
- Quick AI tool tutorials
- Latest developments
- Stay current on new tools

ThePrimeagen
youtube.com/@ThePrimeagen
- Netflix engineer
- Opinions on AI coding tools
- When AI helps vs hurts

Clement Mihailescu (AlgoExpert)
youtube.com/@clem
- Interview preparation
- System design
- Problem-solving approaches

VIEWING STRATEGY:
1. Watch explanation of an algorithm
2. Implement it yourself with AI assistance
3. Compare your approach to the video
4. Practice explaining your AI-assisted code
   with the same clarity as the instructor

KEY SKILL: Being able to explain AI-generated
code as confidently as these experts explain
algorithms shows true understanding.`
        }
      ]
    }
  ]

  // =============================================================================
  // NAVIGATION HANDLERS
  // =============================================================================

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  const handlePreviousConcept = () => {
    if (selectedConceptIndex > 0) {
      setSelectedConceptIndex(selectedConceptIndex - 1)
      setSelectedDetailIndex(0)
    }
  }

  const handleNextConcept = () => {
    if (selectedConceptIndex < concepts.length - 1) {
      setSelectedConceptIndex(selectedConceptIndex + 1)
      setSelectedDetailIndex(0)
    }
  }

  // =============================================================================
  // BREADCRUMB CONFIGURATION
  // =============================================================================

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'Projects', icon: '🚀', page: 'Projects' },
      { name: 'AI Interview Tips', icon: '🤖', page: 'AI Interview Tips' }
    ]
    if (selectedConcept) {
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    }
    return stack
  }

  const handleBreadcrumbClick = (index) => {
    if (index === 0) {
      onBack()  // Go back to Projects page
    } else if (index === 1 && selectedConcept) {
      setSelectedConceptIndex(null)  // Close modal, stay on topic page
    }
  }

  // =============================================================================
  // KEYBOARD NAVIGATION
  // =============================================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConcept) {
          setSelectedConceptIndex(null)
        } else {
          onBack()
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault()
        handlePreviousConcept()
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault()
        handleNextConcept()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #4c1d95 50%, #0f172a 100%)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }

  const headerStyle = {
    maxWidth: '1400px',
    margin: '0 auto 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  }

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #c4b5fd, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: AI_COLORS.bg,
    border: `1px solid ${AI_COLORS.border}`,
    borderRadius: '0.5rem',
    color: AI_COLORS.primary,
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  // =============================================================================
  // RENDER HELPERS
  // =============================================================================

  const renderDetailContent = (detail, colorScheme) => {
    return (
      <div>
        <div style={{
          color: '#e2e8f0',
          lineHeight: '1.8',
          marginBottom: '1rem',
          background: colorScheme.bg,
          border: `1px solid ${colorScheme.border}`,
          borderRadius: '0.5rem',
          padding: '1rem',
          textAlign: 'left'
        }}>
          {detail.explanation}
        </div>

        {detail.keyPoints && (
          <div style={{
            marginBottom: '1rem',
            background: 'rgba(15, 23, 42, 0.6)',
            borderRadius: '0.5rem',
            padding: '1rem',
            border: '1px solid #334155'
          }}>
            <h4 style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.75rem', fontWeight: '600' }}>
              Key Points:
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#cbd5e1' }}>
              {detail.keyPoints.map((point, i) => (
                <li key={i} style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        {detail.problem && (
          <div style={{
            marginBottom: '1rem',
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '0.5rem',
            padding: '1rem'
          }}>
            <div style={{ color: '#f87171', fontWeight: '600', marginBottom: '0.5rem' }}>
              Problem: {detail.problem}
            </div>
            <div style={{ color: '#fca5a5', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <strong>Consequence:</strong> {detail.consequence}
            </div>
            <div style={{ color: '#4ade80', fontSize: '0.9rem', background: 'rgba(34, 197, 94, 0.1)', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
              <strong>Solution:</strong> {detail.solution}
            </div>
          </div>
        )}

        {detail.codeExample && (
          <div style={{ marginTop: '1rem' }}>
            <SyntaxHighlighter
              language="javascript"
              style={vscDarkPlus}
              customStyle={{
                padding: '1rem',
                margin: 0,
                borderRadius: '0.5rem',
                fontSize: '0.8rem',
                border: '1px solid #334155',
                background: '#0f172a'
              }}
              codeTagProps={{ style: { background: 'transparent' } }}
            >
              {detail.codeExample}
            </SyntaxHighlighter>
          </div>
        )}
      </div>
    )
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      {/* Header with title and back button */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>🤖 AI-Enabled Technical Interview Tips</h1>
        <button
          style={backButtonStyle}
          onClick={onBack}
          onMouseOver={(e) => {
            e.currentTarget.style.background = AI_COLORS.hoverBg
            e.currentTarget.style.transform = 'translateY(-2px)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = AI_COLORS.bg
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          ← Back to Projects
        </button>
      </div>

      {/* Breadcrumb navigation */}
      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu}
          colors={AI_COLORS}
        />
      </div>

      {/* Intro message */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto 2rem',
        background: 'rgba(15, 23, 42, 0.8)',
        borderRadius: '1rem',
        padding: '1.5rem',
        border: `2px solid ${AI_COLORS.primary}`,
        boxShadow: `0 4px 15px ${AI_COLORS.primary}30`
      }}>
        <p style={{ color: '#cbd5e1', lineHeight: '1.8', margin: 0, fontSize: '1.1rem', textAlign: 'center' }}>
          Modern technical interviews increasingly allow AI coding assistants. Success requires a new skill set:
          <strong style={{ color: '#c4b5fd' }}> effective prompting</strong>,
          <strong style={{ color: '#c4b5fd' }}> critical code review</strong>,
          <strong style={{ color: '#c4b5fd' }}> clear communication</strong>, and
          <strong style={{ color: '#c4b5fd' }}> strategic tool usage</strong>.
          Master these skills to stand out in AI-enabled interviews.
        </p>
      </div>

      {/* Concept Cards Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {concepts.map((concept, index) => (
          <div
            key={concept.id}
            onClick={() => setSelectedConceptIndex(index)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: `1px solid ${concept.color}40`,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 20px 40px ${concept.color}20`
              e.currentTarget.style.borderColor = concept.color
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = `${concept.color}40`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{concept.icon}</span>
              <h3 style={{ color: concept.color, margin: 0, fontSize: '1.25rem' }}>{concept.name}</h3>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{concept.description}</p>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
              {concept.details.length} topics • Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Selected Concept */}
      {selectedConcept && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedConceptIndex(null)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              borderRadius: '1rem',
              padding: '2rem',
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`,
              width: '100%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu}
              colors={AI_COLORS}
            />

            {/* Modal Header with Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #334155'
            }}>
              <h2 style={{
                color: selectedConcept.color,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.25rem'
              }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  onClick={handlePreviousConcept}
                  disabled={selectedConceptIndex === 0}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >←</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>
                  {selectedConceptIndex + 1}/{concepts.length}
                </span>
                <button
                  onClick={handleNextConcept}
                  disabled={selectedConceptIndex === concepts.length - 1}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >→</button>
                <button
                  onClick={() => setSelectedConceptIndex(null)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.375rem',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginLeft: '0.5rem'
                  }}
                >✕</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDetailIndex(i)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)',
                    border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`,
                    borderRadius: '0.5rem',
                    color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: selectedDetailIndex === i ? '600' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {detail.name}
                </button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              return (
                <div>
                  <h3 style={{ color: '#e2e8f0', marginBottom: '1rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>
                  {renderDetailContent(detail, colorScheme)}
                </div>
              )
            })()}

          </div>
        </div>
      )}

      {/* Footer Tips */}
      <div style={{
        maxWidth: '1400px',
        margin: '2rem auto 0',
        padding: '1.5rem',
        background: 'rgba(15, 23, 42, 0.8)',
        borderRadius: '1rem',
        border: `2px dashed ${AI_COLORS.primary}`
      }}>
        <h3 style={{ color: '#c4b5fd', margin: '0 0 1rem 0', fontSize: '1.2rem' }}>🎯 Final Reminders</h3>
        <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ color: AI_COLORS.primary, fontWeight: '600' }}>1.</span>
            <span style={{ color: '#cbd5e1' }}>AI is your tool, not your brain. You must understand everything.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ color: AI_COLORS.primary, fontWeight: '600' }}>2.</span>
            <span style={{ color: '#cbd5e1' }}>Communication is key. Think out loud throughout.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ color: AI_COLORS.primary, fontWeight: '600' }}>3.</span>
            <span style={{ color: '#cbd5e1' }}>Test everything. AI-generated code often has subtle bugs.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ color: AI_COLORS.primary, fontWeight: '600' }}>4.</span>
            <span style={{ color: '#cbd5e1' }}>Practice with the specific AI tool before your interview.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIInterviewTips
