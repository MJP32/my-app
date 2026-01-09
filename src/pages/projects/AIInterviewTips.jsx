import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

function AIInterviewTips({ onBack, breadcrumb }) {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const topics = [
    {
      id: 1,
      name: 'Understanding AI-Enabled Interviews',
      icon: '🎯',
      color: '#8b5cf6',
      description: 'What to expect and how AI tools are integrated',
      content: {
        explanation: 'AI-enabled technical interviews allow candidates to use AI coding assistants (like GitHub Copilot, Claude, or ChatGPT) during the interview process. This reflects modern development practices where AI tools are part of everyday workflows. The focus shifts from memorization to problem-solving, communication, and effective use of AI as a tool.',
        keyPoints: [
          'AI is a tool, not a replacement for your skills - interviewers evaluate how you USE the tool',
          'You must understand and explain every line of code, whether AI-generated or not',
          'Communication is MORE important - explain your thought process as you work',
          'Debugging AI suggestions demonstrates real engineering skills',
          'Time management matters - know when to use AI vs write code yourself',
          'Companies test your ability to work WITH AI, not just have AI work for you'
        ],
        tips: [
          { title: 'Before the Interview', items: ['Practice with the specific AI tool allowed', 'Understand the tool\'s strengths and limitations', 'Prepare to explain AI-generated code line by line'] },
          { title: 'During the Interview', items: ['Think out loud - narrate your problem-solving approach', 'Don\'t blindly accept AI suggestions - review critically', 'Ask clarifying questions before diving into code'] }
        ]
      }
    },
    {
      id: 2,
      name: 'Effective Prompting Strategies',
      icon: '💬',
      color: '#10b981',
      description: 'How to communicate with AI tools for best results',
      content: {
        explanation: 'The quality of AI assistance depends heavily on how you communicate with it. Effective prompting is a skill that demonstrates your understanding of the problem and your ability to break down complex requirements. Interviewers observe how you formulate requests and iterate on AI responses.',
        keyPoints: [
          'Start with problem context before asking for code',
          'Break complex problems into smaller, focused prompts',
          'Specify constraints: language, time/space complexity, edge cases',
          'Ask for explanations, not just code',
          'Iterate: refine prompts based on initial responses',
          'Use AI to validate your approach before implementation'
        ],
        examples: [
          {
            bad: 'Write a function to solve two sum',
            good: 'I need to solve Two Sum: given an array of integers and a target, return indices of two numbers that add up to target. Requirements: O(n) time complexity, use a hash map approach, handle edge cases like empty array or no solution. Language: Python.',
            why: 'The good prompt provides context, constraints, approach hints, and specific requirements'
          },
          {
            bad: 'Fix this bug',
            good: 'This function should return the longest palindromic substring, but it\'s returning incorrect results for input "babad". Expected: "bab" or "aba". Current output: "b". Here\'s my code: [code]. Can you identify the issue and explain the fix?',
            why: 'The good prompt includes expected vs actual behavior, specific test case, and asks for explanation'
          }
        ]
      }
    },
    {
      id: 3,
      name: 'Code Review & Validation',
      icon: '🔍',
      color: '#f59e0b',
      description: 'How to critically evaluate AI-generated code',
      content: {
        explanation: 'Never blindly trust AI-generated code. Interviewers specifically watch for candidates who can identify issues, suggest improvements, and explain why code works or doesn\'t. This skill separates junior developers from senior engineers.',
        keyPoints: [
          'Always trace through the code with a test case before running',
          'Check edge cases: empty input, single element, duplicates, negative numbers',
          'Verify time and space complexity matches requirements',
          'Look for potential bugs: off-by-one errors, null checks, integer overflow',
          'Consider readability and maintainability improvements',
          'Ask yourself: "Would I approve this in a code review?"'
        ],
        checklist: [
          { category: 'Correctness', items: ['Does it handle the base case?', 'Does it work for the examples given?', 'What about edge cases?'] },
          { category: 'Efficiency', items: ['What\'s the time complexity?', 'What\'s the space complexity?', 'Can it be optimized?'] },
          { category: 'Code Quality', items: ['Are variable names meaningful?', 'Is the logic clear?', 'Are there unnecessary operations?'] },
          { category: 'Robustness', items: ['Does it handle invalid input?', 'Are there potential runtime errors?', 'Is error handling appropriate?'] }
        ]
      }
    },
    {
      id: 4,
      name: 'Debugging with AI',
      icon: '🐛',
      color: '#ef4444',
      description: 'Using AI to identify and fix issues effectively',
      content: {
        explanation: 'Debugging is where your engineering skills truly shine. Using AI to help debug shows sophistication - you\'re leveraging all available tools. The key is to provide context, isolate the problem, and understand the fix rather than just applying it.',
        keyPoints: [
          'Describe the expected behavior vs actual behavior clearly',
          'Provide the specific input that causes the issue',
          'Share relevant error messages or stack traces',
          'Explain what you\'ve already tried',
          'Ask for explanation of WHY the bug occurs, not just the fix',
          'Verify the fix doesn\'t introduce new issues'
        ],
        approach: [
          { step: 1, title: 'Reproduce', description: 'Identify a specific test case that fails consistently' },
          { step: 2, title: 'Isolate', description: 'Narrow down which part of the code causes the issue' },
          { step: 3, title: 'Hypothesize', description: 'Form a theory about what\'s wrong before asking AI' },
          { step: 4, title: 'Query AI', description: 'Share your hypothesis and ask for validation or alternatives' },
          { step: 5, title: 'Understand', description: 'Make sure you understand the root cause, not just the fix' },
          { step: 6, title: 'Verify', description: 'Test the fix and check for regression issues' }
        ]
      }
    },
    {
      id: 5,
      name: 'Communication During Interview',
      icon: '🗣️',
      color: '#3b82f6',
      description: 'How to narrate your thought process effectively',
      content: {
        explanation: 'In AI-enabled interviews, communication becomes even more critical. Interviewers can\'t see your thought process when you\'re typing prompts, so you must verbalize everything. This demonstrates your problem-solving approach and engineering judgment.',
        keyPoints: [
          'Explain the problem in your own words before starting',
          'Discuss your approach and why you chose it',
          'Verbalize what you\'re asking the AI and why',
          'Explain AI suggestions before accepting or modifying them',
          'Discuss trade-offs and alternative approaches',
          'Ask the interviewer questions - it shows engagement'
        ],
        scripts: [
          {
            situation: 'Starting a problem',
            say: '"Let me make sure I understand the problem correctly. We need to [restate problem]. The key constraints are [list constraints]. I\'m thinking of approaching this with [algorithm/data structure] because [reasoning]. Does that sound right before I start?"'
          },
          {
            situation: 'Using AI assistance',
            say: '"I\'m going to ask the AI to help with [specific task]. I want to use [approach] because [reasoning]. Let me formulate a prompt that includes [constraints/requirements]..."'
          },
          {
            situation: 'Reviewing AI output',
            say: '"Let me trace through this code with our example input. Starting with [input], we first [step through logic]. I notice [observation]. This looks correct/I see a potential issue with [concern]..."'
          },
          {
            situation: 'Debugging',
            say: '"The test case [input] is failing. Expected [expected] but got [actual]. Let me add some debug output to trace where it goes wrong... I think the issue might be [hypothesis]. Let me ask the AI to help verify this..."'
          }
        ]
      }
    },
    {
      id: 6,
      name: 'Time Management',
      icon: '⏱️',
      color: '#06b6d4',
      description: 'When to use AI vs write code yourself',
      content: {
        explanation: 'AI can save time, but it can also waste time if used incorrectly. Knowing when to use AI assistance versus writing code yourself is a crucial skill. For simple operations, typing may be faster than prompting.',
        keyPoints: [
          'Use AI for: boilerplate code, syntax reminders, complex algorithms you understand conceptually',
          'Write yourself: simple operations, code you can type faster than explain, modifications to existing code',
          'Set time limits: if AI isn\'t helping after 2-3 attempts, try a different approach',
          'Don\'t over-optimize prompts - sometimes it\'s faster to write the code',
          'Use AI for validation: "Does this approach handle [edge case]?"',
          'Budget time for code review - AI code still needs verification'
        ],
        timeAllocation: [
          { phase: 'Problem Understanding', time: '10-15%', description: 'Read, ask questions, restate the problem' },
          { phase: 'Approach Discussion', time: '10-15%', description: 'Discuss algorithm, data structures, trade-offs' },
          { phase: 'Implementation', time: '40-50%', description: 'Writing code with or without AI assistance' },
          { phase: 'Testing & Debugging', time: '20-25%', description: 'Verify correctness, handle edge cases' },
          { phase: 'Optimization & Discussion', time: '5-10%', description: 'Discuss improvements, complexity analysis' }
        ]
      }
    },
    {
      id: 7,
      name: 'Common Pitfalls to Avoid',
      icon: '⚠️',
      color: '#dc2626',
      description: 'Mistakes that hurt your interview performance',
      content: {
        explanation: 'Understanding common mistakes helps you avoid them. These pitfalls are especially noticeable in AI-enabled interviews and can significantly impact your evaluation.',
        keyPoints: [
          'Don\'t be silent while working - always communicate',
          'Don\'t accept AI code without understanding it',
          'Don\'t skip testing because "AI wrote it"',
          'Don\'t argue with the AI - iterate or try a different approach',
          'Don\'t forget to handle edge cases',
          'Don\'t panic if AI gives wrong answers - debugging is part of the test'
        ],
        pitfalls: [
          {
            mistake: 'Copy-pasting without understanding',
            consequence: 'When asked to explain, you\'ll stumble and lose credibility',
            solution: 'Trace through every line. Ask AI to explain if needed, but make sure YOU understand before presenting'
          },
          {
            mistake: 'Over-relying on AI for simple tasks',
            consequence: 'Wastes time and looks like you lack basic skills',
            solution: 'Write simple code yourself. Use AI for complex logic or when genuinely stuck'
          },
          {
            mistake: 'Not testing AI-generated code',
            consequence: 'AI code often has subtle bugs that you\'ll be blamed for',
            solution: 'Always run through test cases manually before declaring "done"'
          },
          {
            mistake: 'Giving up when AI can\'t solve it',
            consequence: 'Shows you can only work with AI, not independently',
            solution: 'Use AI for hints, but be prepared to solve problems yourself'
          },
          {
            mistake: 'Not asking clarifying questions',
            consequence: 'You might solve the wrong problem or miss important constraints',
            solution: 'Always confirm understanding before coding, with or without AI'
          }
        ]
      }
    },
    {
      id: 8,
      name: 'Practice Exercises',
      icon: '💪',
      color: '#22c55e',
      description: 'How to prepare for AI-enabled interviews',
      content: {
        explanation: 'Practicing with AI tools before your interview is essential. You need to develop muscle memory for the workflow and understand the tool\'s capabilities and limitations.',
        keyPoints: [
          'Practice with the specific tool allowed in your interview',
          'Time yourself solving LeetCode problems with AI assistance',
          'Record yourself and review your communication',
          'Practice explaining AI-generated code to a friend',
          'Deliberately introduce bugs and practice debugging with AI',
          'Try problems of varying difficulty to understand when AI helps most'
        ],
        exercises: [
          {
            title: 'Exercise 1: Prompt Iteration',
            description: 'Take a medium LeetCode problem. Start with a vague prompt, then iteratively refine it. Track how many iterations it takes to get working code. Goal: 3 or fewer iterations.'
          },
          {
            title: 'Exercise 2: Code Explanation',
            description: 'Have AI generate a solution, then explain every line to a rubber duck or friend. If you can\'t explain something, that\'s a red flag.'
          },
          {
            title: 'Exercise 3: Bug Hunt',
            description: 'Take a working solution, introduce 3 subtle bugs, then use AI to help find and fix them. Practice your debugging dialogue.'
          },
          {
            title: 'Exercise 4: Speed Comparison',
            description: 'Solve the same problem with and without AI. Understand when AI saves time vs when it\'s overhead.'
          },
          {
            title: 'Exercise 5: Mock Interview',
            description: 'Have a friend give you a problem while screen-sharing. Practice the full flow: clarification, approach, implementation with AI, testing, and discussion.'
          }
        ]
      }
    },
    {
      id: 9,
      name: 'Resources & Practice Platforms',
      icon: '🔗',
      color: '#0891b2',
      description: 'Websites and tools to practice AI-enabled interviews',
      content: {
        explanation: 'Practice is essential for mastering AI-enabled interviews. These platforms and resources will help you develop your skills with AI coding assistants, practice technical problems, and prepare for the unique challenges of modern technical interviews.',
        keyPoints: [
          'Practice with the same AI tools you\'ll use in interviews',
          'Use coding platforms that allow AI assistance to simulate real conditions',
          'Study how others effectively use AI for coding tasks',
          'Stay updated on AI coding assistant features and best practices',
          'Join communities discussing AI-assisted development',
          'Record yourself practicing to review your communication style'
        ],
        resources: [
          {
            category: 'AI Coding Assistants to Practice With',
            icon: '🤖',
            items: [
              { name: 'GitHub Copilot', url: 'https://github.com/features/copilot', description: 'Most widely used AI pair programmer. Integrates with VS Code, JetBrains, and more. Free for students and open source maintainers.' },
              { name: 'Claude (Anthropic)', url: 'https://claude.ai', description: 'Excellent for explaining code, debugging, and complex problem-solving. Great at following nuanced instructions.' },
              { name: 'ChatGPT', url: 'https://chat.openai.com', description: 'Versatile AI assistant for coding. GPT-4 excels at code generation and explanation.' },
              { name: 'Cursor IDE', url: 'https://cursor.sh', description: 'AI-first code editor with built-in AI assistance. Great for practicing AI-integrated development workflows.' },
              { name: 'Amazon CodeWhisperer', url: 'https://aws.amazon.com/codewhisperer', description: 'Free AI coding companion from AWS. Good for practicing with an alternative to Copilot.' },
              { name: 'Codeium', url: 'https://codeium.com', description: 'Free AI code completion tool. Supports 70+ languages and integrates with popular IDEs.' }
            ]
          },
          {
            category: 'Coding Practice Platforms',
            icon: '💻',
            items: [
              { name: 'LeetCode', url: 'https://leetcode.com', description: 'Gold standard for technical interview prep. Practice problems while using AI assistance to simulate interview conditions.' },
              { name: 'HackerRank', url: 'https://hackerrank.com', description: 'Coding challenges and interview prep. Some companies use HackerRank for AI-enabled assessments.' },
              { name: 'CodeSignal', url: 'https://codesignal.com', description: 'Technical assessment platform used by many companies. Practice their format with AI tools.' },
              { name: 'AlgoExpert', url: 'https://algoexpert.io', description: 'Curated coding interview questions with video explanations. Practice explaining AI-generated solutions.' },
              { name: 'NeetCode', url: 'https://neetcode.io', description: 'Organized roadmap of LeetCode problems. Free video explanations help you understand solutions.' },
              { name: 'Exercism', url: 'https://exercism.org', description: 'Free coding practice with mentorship. Great for learning to explain code - practice with AI then explain to mentors.' }
            ]
          },
          {
            category: 'AI-Specific Interview Prep',
            icon: '🎯',
            items: [
              { name: 'Interviewing.io', url: 'https://interviewing.io', description: 'Anonymous mock interviews with engineers from top companies. Some allow AI tools - great realistic practice.' },
              { name: 'Pramp', url: 'https://pramp.com', description: 'Free peer-to-peer mock interviews. Practice using AI while explaining to another person.' },
              { name: 'Coderbyte', url: 'https://coderbyte.com', description: 'Interview prep with AI assistance features. Good for practicing timed challenges with AI.' },
              { name: 'Interview Cake', url: 'https://interviewcake.com', description: 'Step-by-step interview prep. Use alongside AI to compare your approach with optimal solutions.' }
            ]
          },
          {
            category: 'Learning Resources',
            icon: '📚',
            items: [
              { name: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai', description: 'Comprehensive guide to prompting techniques. Essential for effective AI communication.' },
              { name: 'Learn Prompting', url: 'https://learnprompting.org', description: 'Free course on prompt engineering. Includes coding-specific prompting strategies.' },
              { name: 'GitHub Copilot Docs', url: 'https://docs.github.com/en/copilot', description: 'Official documentation with tips for getting the best results from Copilot.' },
              { name: 'DeepLearning.AI Short Courses', url: 'https://www.deeplearning.ai/short-courses', description: 'Free courses including "ChatGPT Prompt Engineering for Developers" - highly relevant.' }
            ]
          },
          {
            category: 'Communities & Discussion',
            icon: '👥',
            items: [
              { name: 'r/cscareerquestions', url: 'https://reddit.com/r/cscareerquestions', description: 'Active discussions about interviews including AI-enabled formats. Search for recent experiences.' },
              { name: 'Blind', url: 'https://teamblind.com', description: 'Anonymous professional network. Search for company-specific AI interview experiences.' },
              { name: 'Discord: CS Career Hub', url: 'https://discord.gg/cscareers', description: 'Active community for interview prep. Channels dedicated to AI tools in interviews.' },
              { name: 'Hacker News', url: 'https://news.ycombinator.com', description: 'Tech community discussions. Search for "AI interview" for relevant threads and experiences.' }
            ]
          },
          {
            category: 'YouTube Channels',
            icon: '🎥',
            items: [
              { name: 'NeetCode', url: 'https://youtube.com/@NeetCode', description: 'Excellent algorithm explanations. Watch to understand optimal approaches, then practice implementing with AI.' },
              { name: 'TechLead', url: 'https://youtube.com/@TechLead', description: 'Ex-Google/Facebook engineer. Videos on interview strategies and industry insights.' },
              { name: 'Fireship', url: 'https://youtube.com/@Fireship', description: 'Quick, informative videos on AI tools and coding. Great for staying current on AI developments.' },
              { name: 'ThePrimeagen', url: 'https://youtube.com/@ThePrimeagen', description: 'Netflix engineer with opinions on AI coding tools. Good perspective on when AI helps vs hurts.' }
            ]
          },
          {
            category: 'Mock Interview Services',
            icon: '🎤',
            items: [
              { name: 'Exponent', url: 'https://tryexponent.com', description: 'PM and engineering interview prep. Mock interviews with feedback - ask about AI-enabled practice.' },
              { name: 'Prepfully', url: 'https://prepfully.com', description: 'Mock interviews with professionals. Can request AI-enabled interview practice.' },
              { name: 'IGotAnOffer', url: 'https://igotanoffer.com', description: 'Tech interview coaching. Ask coaches about AI-enabled interview strategies.' }
            ]
          }
        ]
      }
    }
  ]

  const renderTopicContent = (topic) => {
    const content = topic.content
    return (
      <div style={{ padding: '1.5rem', background: 'rgba(17, 24, 39, 0.5)' }}>
        {/* Explanation */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ color: '#c4b5fd', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Overview</h4>
          <p style={{ color: '#d1d5db', lineHeight: '1.7', fontSize: '0.95rem' }}>{content.explanation}</p>
        </div>

        {/* Key Points */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ color: '#c4b5fd', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Key Points</h4>
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            {content.keyPoints.map((point, idx) => (
              <li key={idx} style={{ color: '#d1d5db', marginBottom: '0.5rem', lineHeight: '1.6' }}>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Tips (if present) */}
        {content.tips && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#c4b5fd', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Practical Tips</h4>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              {content.tips.map((tip, idx) => (
                <div key={idx} style={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', padding: '1rem', borderRadius: '8px', border: `1px solid ${topic.color}40` }}>
                  <h5 style={{ color: topic.color, margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>{tip.title}</h5>
                  <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.9rem' }}>
                    {tip.items.map((item, i) => (
                      <li key={i} style={{ color: '#d1d5db', marginBottom: '0.25rem' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Examples (if present) */}
        {content.examples && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#c4b5fd', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Prompt Examples</h4>
            {content.examples.map((example, idx) => (
              <div key={idx} style={{ marginBottom: '1rem', backgroundColor: 'rgba(31, 41, 55, 0.8)', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ marginBottom: '0.75rem' }}>
                  <span style={{ color: '#f87171', fontWeight: '600', fontSize: '0.85rem' }}>❌ Bad: </span>
                  <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>"{example.bad}"</span>
                </div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <span style={{ color: '#4ade80', fontWeight: '600', fontSize: '0.85rem' }}>✅ Good: </span>
                  <span style={{ color: '#e5e7eb' }}>"{example.good}"</span>
                </div>
                <div style={{ color: '#9ca3af', fontSize: '0.85rem', fontStyle: 'italic' }}>
                  💡 Why: {example.why}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Checklist (if present) */}
        {content.checklist && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#c4b5fd', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Code Review Checklist</h4>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              {content.checklist.map((category, idx) => (
                <div key={idx} style={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', padding: '1rem', borderRadius: '8px' }}>
                  <h5 style={{ color: topic.color, margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>{category.category}</h5>
                  <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.85rem' }}>
                    {category.items.map((item, i) => (
                      <li key={i} style={{ color: '#d1d5db', marginBottom: '0.25rem' }}>☐ {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approach Steps (if present) */}
        {content.approach && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#c4b5fd', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Debugging Approach</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {content.approach.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    backgroundColor: topic.color,
                    color: 'white',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    flexShrink: 0
                  }}>
                    {step.step}
                  </div>
                  <div>
                    <span style={{ fontWeight: '600', color: '#e5e7eb' }}>{step.title}: </span>
                    <span style={{ color: '#d1d5db' }}>{step.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scripts (if present) */}
        {content.scripts && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#c4b5fd', marginBottom: '0.75rem', fontSize: '1.1rem' }}>What to Say</h4>
            {content.scripts.map((script, idx) => (
              <div key={idx} style={{ marginBottom: '1rem', backgroundColor: 'rgba(31, 41, 55, 0.8)', padding: '1rem', borderRadius: '8px', borderLeft: `4px solid ${topic.color}` }}>
                <div style={{ fontWeight: '600', color: '#e5e7eb', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  📢 {script.situation}
                </div>
                <div style={{ color: '#d1d5db', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {script.say}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Time Allocation (if present) */}
        {content.timeAllocation && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#c4b5fd', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Time Allocation Guide</h4>
            <div style={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', borderRadius: '8px', overflow: 'hidden' }}>
              {content.timeAllocation.map((phase, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  borderBottom: idx < content.timeAllocation.length - 1 ? '1px solid #374151' : 'none'
                }}>
                  <div style={{ width: '140px', fontWeight: '600', color: '#e5e7eb', fontSize: '0.9rem' }}>{phase.phase}</div>
                  <div style={{
                    width: '80px',
                    backgroundColor: topic.color,
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    textAlign: 'center',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {phase.time}
                  </div>
                  <div style={{ flex: 1, marginLeft: '1rem', color: '#9ca3af', fontSize: '0.85rem' }}>{phase.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pitfalls (if present) */}
        {content.pitfalls && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#c4b5fd', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Common Pitfalls</h4>
            {content.pitfalls.map((pitfall, idx) => (
              <div key={idx} style={{ marginBottom: '1rem', backgroundColor: 'rgba(127, 29, 29, 0.3)', padding: '1rem', borderRadius: '8px', border: '1px solid #ef444480' }}>
                <div style={{ fontWeight: '600', color: '#f87171', marginBottom: '0.5rem' }}>❌ {pitfall.mistake}</div>
                <div style={{ color: '#fca5a5', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                  <strong>Consequence:</strong> {pitfall.consequence}
                </div>
                <div style={{ color: '#4ade80', fontSize: '0.9rem', backgroundColor: 'rgba(22, 101, 52, 0.3)', padding: '0.5rem', borderRadius: '4px' }}>
                  <strong>✅ Solution:</strong> {pitfall.solution}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Exercises (if present) */}
        {content.exercises && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#c4b5fd', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Practice Exercises</h4>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {content.exercises.map((exercise, idx) => (
                <div key={idx} style={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', padding: '1rem', borderRadius: '8px', border: `1px solid ${topic.color}40` }}>
                  <h5 style={{ color: topic.color, margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>{exercise.title}</h5>
                  <p style={{ color: '#d1d5db', margin: 0, fontSize: '0.9rem', lineHeight: '1.6' }}>{exercise.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources (if present) */}
        {content.resources && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#c4b5fd', marginBottom: '1rem', fontSize: '1.1rem' }}>Resources & Links</h4>
            {content.resources.map((category, catIdx) => (
              <div key={catIdx} style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                  padding: '0.5rem 0.75rem',
                  backgroundColor: 'rgba(31, 41, 55, 0.8)',
                  borderRadius: '6px',
                  borderLeft: `4px solid ${topic.color}`
                }}>
                  <span style={{ fontSize: '1.25rem' }}>{category.icon}</span>
                  <h5 style={{ color: '#e5e7eb', margin: 0, fontSize: '1rem', fontWeight: '600' }}>{category.category}</h5>
                </div>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {category.items.map((item, itemIdx) => (
                    <a
                      key={itemIdx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'block',
                        backgroundColor: 'rgba(31, 41, 55, 0.6)',
                        padding: '1rem',
                        borderRadius: '8px',
                        border: '1px solid #374151',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = topic.color
                        e.currentTarget.style.boxShadow = `0 4px 12px ${topic.color}30`
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#374151'
                        e.currentTarget.style.boxShadow = 'none'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            color: topic.color,
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            marginBottom: '0.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}>
                            {item.name}
                            <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>↗</span>
                          </div>
                          <p style={{
                            color: '#9ca3af',
                            margin: 0,
                            fontSize: '0.85rem',
                            lineHeight: '1.5'
                          }}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #4c1d95, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onBack}
              style={{
                background: '#8b5cf6',
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
                e.currentTarget.style.background = '#7c3aed'
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#8b5cf6'
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              ← Back to Projects
            </button>
            <h1 style={{
              fontSize: '2.25rem',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #c4b5fd, #a78bfa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              🤖 AI-Enabled Technical Interview Tips
            </h1>
          </div>
        </div>

        {/* Breadcrumb */}
        <Breadcrumb breadcrumb={breadcrumb} />

        {/* Intro */}
        <div style={{
          background: 'linear-gradient(to bottom right, #1f2937, #111827)',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          marginBottom: '2rem',
          border: '2px solid #8b5cf6',
          boxShadow: '0 4px 15px rgba(139, 92, 246, 0.2)'
        }}>
          <p style={{ color: '#d1d5db', lineHeight: '1.8', margin: 0, fontSize: '1.1rem', textAlign: 'center' }}>
            Modern technical interviews increasingly allow AI coding assistants. Success requires a new skill set:
            <strong style={{ color: '#c4b5fd' }}> effective prompting</strong>,
            <strong style={{ color: '#c4b5fd' }}> critical code review</strong>,
            <strong style={{ color: '#c4b5fd' }}> clear communication</strong>, and
            <strong style={{ color: '#c4b5fd' }}> strategic tool usage</strong>.
            Master these skills to stand out in AI-enabled interviews.
          </p>
        </div>

      {/* Topics Grid */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {topics.map((topic) => (
          <div
            key={topic.id}
            style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              borderRadius: '0.75rem',
              border: `2px solid ${expandedSections[topic.id] ? topic.color : '#374151'}`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: expandedSections[topic.id] ? `0 4px 15px ${topic.color}30` : '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Topic Header */}
            <button
              onClick={() => toggleSection(topic.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                background: expandedSections[topic.id] ? `linear-gradient(to right, ${topic.color}15, ${topic.color}05)` : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!expandedSections[topic.id]) {
                  e.currentTarget.style.background = 'rgba(55, 65, 81, 0.5)'
                }
              }}
              onMouseLeave={(e) => {
                if (!expandedSections[topic.id]) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.75rem' }}>{topic.icon}</span>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: '700', color: '#c4b5fd' }}>
                    {topic.name}
                  </h3>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.9rem', color: '#9ca3af' }}>
                    {topic.description}
                  </p>
                </div>
              </div>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: topic.color,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '1.25rem',
                transform: expandedSections[topic.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>
                ↓
              </div>
            </button>

            {/* Topic Content */}
            {expandedSections[topic.id] && (
              <div style={{ borderTop: `1px solid ${topic.color}30` }}>
                {renderTopicContent(topic)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Tips */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: 'linear-gradient(to bottom right, #1f2937, #111827)',
        borderRadius: '0.75rem',
        border: '2px dashed #8b5cf6'
      }}>
        <h3 style={{ color: '#c4b5fd', margin: '0 0 1rem 0', fontSize: '1.2rem' }}>🎯 Final Reminders</h3>
        <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ color: '#a78bfa', fontWeight: '600' }}>1.</span>
            <span style={{ color: '#d1d5db' }}>AI is your tool, not your brain. You must understand everything.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ color: '#a78bfa', fontWeight: '600' }}>2.</span>
            <span style={{ color: '#d1d5db' }}>Communication is key. Think out loud throughout.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ color: '#a78bfa', fontWeight: '600' }}>3.</span>
            <span style={{ color: '#d1d5db' }}>Test everything. AI-generated code often has subtle bugs.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ color: '#a78bfa', fontWeight: '600' }}>4.</span>
            <span style={{ color: '#d1d5db' }}>Practice with the specific AI tool before your interview.</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default AIInterviewTips
