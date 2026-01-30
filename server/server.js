import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Anthropic from '@anthropic-ai/sdk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Temporary directory for code execution
const TEMP_DIR = path.join(__dirname, 'temp');

// Ensure temp directory exists
await fs.mkdir(TEMP_DIR, { recursive: true });

// Detect Java commands (WSL or Windows)
const JAVAC_CMD = process.platform === 'linux' ?
  '/mnt/c/Program Files/Java/jdk-21/bin/javac.exe' : 'javac';
const JAVA_CMD = process.platform === 'linux' ?
  '/mnt/c/Program Files/Java/jdk-21/bin/java.exe' : 'java';
const IS_WSL_USING_WINDOWS_JAVA = process.platform === 'linux';

// Detect Python command (python on Windows, python3 on Linux/Mac)
const PYTHON_CMD = process.platform === 'win32' ? 'python' : 'python3';

// Convert WSL path to Windows path for Windows executables
function toWindowsPath(wslPath) {
  if (!IS_WSL_USING_WINDOWS_JAVA) return wslPath;

  // Convert /mnt/c/... to C:\...
  let winPath = wslPath.replace(/^\/mnt\/([a-z])\//i, (match, drive) => {
    return `${drive.toUpperCase()}:\\`;
  });

  // Replace forward slashes with backslashes
  winPath = winPath.replace(/\//g, '\\');

  return winPath;
}

// Java code execution endpoint
app.post('/api/execute-java', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  // Extract class name from code
  const classNameMatch = code.match(/public\s+class\s+(\w+)/);
  if (!classNameMatch) {
    return res.status(400).json({ error: 'No public class found in code' });
  }

  const className = classNameMatch[1];
  const timestamp = Date.now();
  const dirName = `exec_${timestamp}`;
  const execDir = path.join(TEMP_DIR, dirName);
  const javaFilePath = path.join(execDir, `${className}.java`);

  try {
    // Create execution directory
    await fs.mkdir(execDir, { recursive: true });

    // Write Java code to file
    await fs.writeFile(javaFilePath, code);

    // Compile Java code
    const windowsJavaFilePath = toWindowsPath(javaFilePath);

    const compileResult = await new Promise((resolve) => {
      exec(`"${JAVAC_CMD}" "${windowsJavaFilePath}"`, { cwd: execDir, timeout: 10000 }, (error, stdout, stderr) => {
        if (error) {
          resolve({ success: false, error: stderr || error.message });
        } else {
          resolve({ success: true });
        }
      });
    });

    if (!compileResult.success) {
      return res.json({
        success: false,
        output: '',
        error: compileResult.error,
        stage: 'compilation'
      });
    }

    // Run Java code
    const runResult = await new Promise((resolve) => {
      exec(`"${JAVA_CMD}" "${className}"`, { cwd: execDir, timeout: 10000 }, (error, stdout, stderr) => {
        if (error && !stdout) {
          resolve({ success: false, error: stderr || error.message });
        } else {
          resolve({ success: true, output: stdout, stderr });
        }
      });
    });

    // Clean up
    await fs.rm(execDir, { recursive: true, force: true });

    if (!runResult.success) {
      return res.json({
        success: false,
        output: runResult.output || '',
        error: runResult.error,
        stage: 'execution'
      });
    }

    res.json({
      success: true,
      output: runResult.output,
      error: runResult.stderr || '',
      stage: 'complete'
    });

  } catch (error) {
    // Clean up on error
    try {
      await fs.rm(execDir, { recursive: true, force: true });
    } catch {
      // Ignore cleanup errors
    }

    res.status(500).json({
      success: false,
      error: error.message,
      stage: 'system'
    });
  }
});

// Java code execution with test cases endpoint
app.post('/api/execute-java-tests', async (req, res) => {
  const { code, testCases } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  if (!testCases || !Array.isArray(testCases) || testCases.length === 0) {
    return res.status(400).json({ error: 'No test cases provided' });
  }

  // Extract class name from code
  const classNameMatch = code.match(/public\s+class\s+(\w+)/);
  if (!classNameMatch) {
    return res.status(400).json({ error: 'No public class found in code' });
  }

  const className = classNameMatch[1];
  const timestamp = Date.now();
  const dirName = `exec_${timestamp}`;
  const execDir = path.join(TEMP_DIR, dirName);
  const javaFilePath = path.join(execDir, `${className}.java`);

  try {
    await fs.mkdir(execDir, { recursive: true });
    await fs.writeFile(javaFilePath, code);

    const windowsJavaFilePath = toWindowsPath(javaFilePath);

    // Compile Java code
    const compileResult = await new Promise((resolve) => {
      exec(`"${JAVAC_CMD}" "${windowsJavaFilePath}"`, { cwd: execDir, timeout: 10000 }, (error, stdout, stderr) => {
        if (error) {
          resolve({ success: false, error: stderr || error.message });
        } else {
          resolve({ success: true });
        }
      });
    });

    if (!compileResult.success) {
      await fs.rm(execDir, { recursive: true, force: true });
      return res.json({
        success: false,
        error: compileResult.error,
        stage: 'compilation',
        testResults: []
      });
    }

    // Run test cases
    const testResults = [];
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const input = testCase.input || '';
      const expectedOutput = testCase.expectedOutput || '';

      const runResult = await new Promise((resolve) => {
        const child = exec(`"${JAVA_CMD}" "${className}"`, {
          cwd: execDir,
          timeout: 5000
        }, (error, stdout, stderr) => {
          resolve({ stdout: stdout || '', stderr: stderr || '', error: error?.message });
        });

        // Send input to stdin
        if (input) {
          child.stdin.write(input);
          child.stdin.end();
        }
      });

      const actualOutput = runResult.stdout.trim();
      const expected = expectedOutput.trim();
      const passed = actualOutput === expected;

      testResults.push({
        testNumber: i + 1,
        input: input,
        expectedOutput: expected,
        actualOutput: actualOutput,
        passed: passed,
        error: runResult.error || runResult.stderr
      });
    }

    await fs.rm(execDir, { recursive: true, force: true });

    const allPassed = testResults.every(t => t.passed);
    res.json({
      success: true,
      stage: 'complete',
      allPassed: allPassed,
      passedCount: testResults.filter(t => t.passed).length,
      totalCount: testResults.length,
      testResults: testResults
    });

  } catch (error) {
    try {
      await fs.rm(execDir, { recursive: true, force: true });
    } catch { /* ignore */ }

    res.status(500).json({
      success: false,
      error: error.message,
      stage: 'system',
      testResults: []
    });
  }
});

// Python code execution endpoint
app.post('/api/execute-python', async (req, res) => {
  const { code, input } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  const timestamp = Date.now();
  const pythonFilePath = path.join(TEMP_DIR, `script_${timestamp}.py`);

  try {
    await fs.writeFile(pythonFilePath, code);

    const runResult = await new Promise((resolve) => {
      const child = exec(`${PYTHON_CMD} "${pythonFilePath}"`, {
        timeout: 10000
      }, (error, stdout, stderr) => {
        if (error && !stdout) {
          resolve({ success: false, output: '', error: stderr || error.message });
        } else {
          resolve({ success: true, output: stdout, stderr: stderr });
        }
      });

      if (input) {
        child.stdin.write(input);
        child.stdin.end();
      }
    });

    await fs.unlink(pythonFilePath);

    res.json({
      success: runResult.success,
      output: runResult.output || '',
      error: runResult.error || runResult.stderr || '',
      stage: runResult.success ? 'complete' : 'execution'
    });

  } catch (error) {
    try {
      await fs.unlink(pythonFilePath);
    } catch { /* ignore */ }

    res.status(500).json({
      success: false,
      error: error.message,
      stage: 'system'
    });
  }
});

// Python multi-file execution endpoint (for AI Interview)
app.post('/api/execute-python-files', async (req, res) => {
  const { files, entryPoint } = req.body;

  if (!files || typeof files !== 'object') {
    return res.status(400).json({ error: 'No files provided' });
  }

  if (!entryPoint || !files[entryPoint]) {
    return res.status(400).json({ error: 'Invalid entry point' });
  }

  const timestamp = Date.now();
  const execDir = path.join(TEMP_DIR, `exec_${timestamp}`);

  try {
    // Create execution directory
    await fs.mkdir(execDir, { recursive: true });

    // Write all files to the directory
    for (const [filename, content] of Object.entries(files)) {
      const filePath = path.join(execDir, filename);
      await fs.writeFile(filePath, content);
    }

    // Run the entry point file
    const entryFilePath = path.join(execDir, entryPoint);
    const runResult = await new Promise((resolve) => {
      exec(`${PYTHON_CMD} "${entryFilePath}"`, {
        cwd: execDir,
        timeout: 15000
      }, (error, stdout, stderr) => {
        if (error && !stdout) {
          resolve({ success: false, output: '', error: stderr || error.message });
        } else {
          resolve({ success: true, output: stdout, stderr: stderr });
        }
      });
    });

    // Clean up
    await fs.rm(execDir, { recursive: true, force: true });

    res.json({
      success: runResult.success,
      output: runResult.output || '',
      error: runResult.error || runResult.stderr || '',
      stage: runResult.success ? 'complete' : 'execution'
    });

  } catch (error) {
    try {
      await fs.rm(execDir, { recursive: true, force: true });
    } catch { /* ignore */ }

    res.status(500).json({
      success: false,
      error: error.message,
      stage: 'system'
    });
  }
});

// Python code execution with test cases endpoint
app.post('/api/execute-python-tests', async (req, res) => {
  const { code, testCases } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  if (!testCases || !Array.isArray(testCases) || testCases.length === 0) {
    return res.status(400).json({ error: 'No test cases provided' });
  }

  const timestamp = Date.now();
  const pythonFilePath = path.join(TEMP_DIR, `script_${timestamp}.py`);

  try {
    await fs.writeFile(pythonFilePath, code);

    const testResults = [];
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const input = testCase.input || '';
      const expectedOutput = testCase.expectedOutput || '';

      const runResult = await new Promise((resolve) => {
        const child = exec(`${PYTHON_CMD} "${pythonFilePath}"`, {
          timeout: 5000
        }, (error, stdout, stderr) => {
          resolve({ stdout: stdout || '', stderr: stderr || '', error: error?.message });
        });

        if (input) {
          child.stdin.write(input);
          child.stdin.end();
        }
      });

      const actualOutput = runResult.stdout.trim();
      const expected = expectedOutput.trim();
      const passed = actualOutput === expected;

      testResults.push({
        testNumber: i + 1,
        input: input,
        expectedOutput: expected,
        actualOutput: actualOutput,
        passed: passed,
        error: runResult.error || runResult.stderr
      });
    }

    await fs.unlink(pythonFilePath);

    const allPassed = testResults.every(t => t.passed);
    res.json({
      success: true,
      stage: 'complete',
      allPassed: allPassed,
      passedCount: testResults.filter(t => t.passed).length,
      totalCount: testResults.length,
      testResults: testResults
    });

  } catch (error) {
    try {
      await fs.unlink(pythonFilePath);
    } catch { /* ignore */ }

    res.status(500).json({
      success: false,
      error: error.message,
      stage: 'system',
      testResults: []
    });
  }
});

// Initialize Anthropic client (optional - only if API key is set in env)
const defaultAnthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
}) : null;

// Helper to create Anthropic client with provided key or use default
const getAnthropicClient = (apiKey) => {
  if (apiKey) {
    return new Anthropic({ apiKey });
  }
  return defaultAnthropic;
};

// Test API key endpoint
app.post('/api/ai/test-key', async (req, res) => {
  const { provider, apiKey } = req.body;

  if (!apiKey) {
    return res.json({ success: false, error: 'No API key provided' });
  }

  try {
    if (provider === 'anthropic') {
      const client = new Anthropic({ apiKey });
      // Make a minimal API call to test the key
      await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 10,
        messages: [{ role: 'user', content: 'Hi' }]
      });
      return res.json({ success: true });
    } else if (provider === 'gemini') {
      // Test Gemini key with a simple request
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: 'Hi' }] }]
          })
        }
      );
      if (response.ok) {
        return res.json({ success: true });
      } else {
        return res.json({ success: false, error: 'Invalid API key' });
      }
    } else if (provider === 'openai') {
      // Test OpenAI key
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      if (response.ok) {
        return res.json({ success: true });
      } else {
        return res.json({ success: false, error: 'Invalid API key' });
      }
    } else {
      return res.json({ success: false, error: 'Unknown provider' });
    }
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
});

// Helper to build system prompt based on mode and context
function buildSystemPrompt(mode, context) {
  let systemPrompt = '';

  if (mode === 'interviewer') {
    systemPrompt = `You are an experienced technical interviewer at a top tech company conducting an AI-enabled coding interview. Your role is to:
1. Present coding problems clearly and professionally
2. Ask clarifying questions when the candidate's approach is unclear
3. Provide hints when the candidate is stuck (but don't give away the solution)
4. Evaluate their problem-solving approach, code quality, and communication
5. Ask follow-up questions about time/space complexity
6. Be encouraging but maintain professional standards

The candidate is using an AI assistant (you) during this interview, which is the new format at companies like Meta. Evaluate how well they leverage AI assistance - they should review AI suggestions critically, not blindly accept them.

Keep responses concise and interview-appropriate. Ask one question at a time.`;
  } else if (mode === 'code-review') {
    systemPrompt = `You are an expert code reviewer providing feedback on interview code. Analyze the code for:
1. Correctness - Does it solve the problem?
2. Edge cases - Are all edge cases handled?
3. Time complexity - What is the Big O?
4. Space complexity - Is memory usage optimal?
5. Code quality - Is it readable and maintainable?
6. Best practices - Does it follow coding standards?

Provide specific, actionable feedback. Be constructive and educational.`;
  } else if (mode === 'hint') {
    systemPrompt = `You are a helpful coding mentor. When asked for hints:
1. Start with a small conceptual hint
2. If they're still stuck, provide a more specific algorithmic hint
3. Never give the complete solution directly
4. Guide them to discover the answer themselves
5. Ask leading questions that prompt thinking

Be encouraging and patient. The goal is learning, not just getting the answer.`;
  } else {
    systemPrompt = `You are a helpful AI assistant for coding interview preparation. You can help with:
- Explaining algorithms and data structures
- Reviewing code and suggesting improvements
- Providing hints without giving away solutions
- Discussing time and space complexity
- Explaining best practices and patterns

Be concise, helpful, and educational.`;
  }

  // Add context if provided
  if (context) {
    if (context.problemTitle) {
      systemPrompt += `\n\nCurrent Problem: ${context.problemTitle}`;
    }
    if (context.problemDescription) {
      systemPrompt += `\n\nProblem Description:\n${context.problemDescription}`;
    }
    if (context.currentCode) {
      systemPrompt += `\n\nCandidate's Current Code:\n\`\`\`\n${context.currentCode}\n\`\`\``;
    }
    if (context.hints && context.hints.length > 0) {
      systemPrompt += `\n\nAvailable hints (use sparingly): ${context.hints.join('; ')}`;
    }
  }

  return systemPrompt;
}

// AI Interview Chat endpoint
app.post('/api/ai/chat', async (req, res) => {
  const { message, messages, context, mode, apiKey, provider = 'anthropic' } = req.body;

  // Try to get API key from request, then fall back to env
  const effectiveApiKey = apiKey || process.env.ANTHROPIC_API_KEY;

  // Handle Gemini provider
  if (provider === 'gemini' && apiKey) {
    try {
      const systemPrompt = buildSystemPrompt(mode, context);
      const userMessage = message || (messages && messages.length > 0 ? messages[messages.length - 1].content : '');

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: systemPrompt + '\n\nUser: ' + userMessage }] }
            ],
            generationConfig: {
              maxOutputTokens: 1024,
              temperature: 0.7
            }
          })
        }
      );

      const data = await response.json();
      if (data.candidates && data.candidates[0]) {
        return res.json({
          response: data.candidates[0].content.parts[0].text,
          provider: 'gemini'
        });
      } else if (data.error) {
        // Pass through Gemini error message
        return res.status(response.status || 500).json({
          error: data.error.message || 'Gemini API error',
          code: data.error.code
        });
      } else {
        return res.status(500).json({ error: 'Failed to get Gemini response' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Handle Anthropic (default)
  const anthropic = getAnthropicClient(effectiveApiKey);

  if (!anthropic) {
    return res.status(503).json({
      error: 'AI service not configured. Add your API key in Settings or set ANTHROPIC_API_KEY environment variable.',
      configured: false
    });
  }

  // Support both single message and messages array
  const userMessage = message || (messages && messages.length > 0 ? messages[messages.length - 1].content : null);

  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const systemPrompt = buildSystemPrompt(mode, context);

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }]
    });

    res.json({
      response: response.content[0].text,
      provider: 'anthropic',
      usage: response.usage
    });

  } catch (error) {
    console.error('AI Chat error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to get AI response'
    });
  }
});

// AI Code Analysis endpoint
app.post('/api/ai/analyze-code', async (req, res) => {
  if (!defaultAnthropic) {
    return res.status(503).json({
      error: 'AI service not configured',
      configured: false
    });
  }

  const { code, language, problemDescription } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  try {
    const response = await defaultAnthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: `You are an expert code reviewer for coding interviews. Analyze the provided code and return a JSON response with the following structure:
{
  "correctness": { "score": 1-10, "feedback": "..." },
  "efficiency": { "timeComplexity": "O(...)", "spaceComplexity": "O(...)", "feedback": "..." },
  "codeQuality": { "score": 1-10, "feedback": "..." },
  "edgeCases": { "handled": ["..."], "missing": ["..."] },
  "suggestions": ["..."],
  "overallScore": 1-10,
  "summary": "..."
}
Only respond with valid JSON, no other text.`,
      messages: [{
        role: 'user',
        content: `Problem: ${problemDescription || 'Not specified'}\n\nLanguage: ${language || 'Unknown'}\n\nCode:\n\`\`\`\n${code}\n\`\`\``
      }]
    });

    const analysisText = response.content[0].text;
    let analysis;

    try {
      analysis = JSON.parse(analysisText);
    } catch {
      // If JSON parsing fails, return the raw text
      analysis = { summary: analysisText, parseError: true };
    }

    res.json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error('Code analysis error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// AI Interview Question Generator
app.post('/api/ai/generate-question', async (req, res) => {
  if (!defaultAnthropic) {
    return res.status(503).json({
      error: 'AI service not configured',
      configured: false
    });
  }

  const { difficulty, topic, previousQuestions } = req.body;

  try {
    const response = await defaultAnthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: `You are an interview question generator. Generate a coding interview question suitable for a ${difficulty || 'medium'} difficulty level${topic ? ` focused on ${topic}` : ''}.

Return a JSON object with:
{
  "title": "Problem title",
  "difficulty": "Easy/Medium/Hard",
  "description": "Full problem description",
  "examples": [{"input": "...", "output": "...", "explanation": "..."}],
  "constraints": ["..."],
  "hints": ["hint1", "hint2", "hint3"],
  "topics": ["topic1", "topic2"]
}

Only respond with valid JSON.`,
      messages: [{
        role: 'user',
        content: previousQuestions
          ? `Generate a new question. Avoid these topics already covered: ${previousQuestions.join(', ')}`
          : 'Generate an interview coding question.'
      }]
    });

    const questionText = response.content[0].text;
    let question;

    try {
      question = JSON.parse(questionText);
    } catch {
      question = { description: questionText, parseError: true };
    }

    res.json({
      success: true,
      question
    });

  } catch (error) {
    console.error('Question generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Check AI service status
app.get('/api/ai/status', (req, res) => {
  res.json({
    configured: !!defaultAnthropic,
    model: defaultAnthropic ? 'claude-sonnet-4-20250514' : null
  });
});

// AI Evaluate Code Output - Evaluates execution results against expected output
app.post('/api/ai/evaluate-output', async (req, res) => {
  if (!defaultAnthropic) {
    return res.status(503).json({
      error: 'AI service not configured',
      configured: false
    });
  }

  const { code, output, expectedOutput, problemDescription, testCases } = req.body;

  if (!code || output === undefined) {
    return res.status(400).json({ error: 'Code and output are required' });
  }

  try {
    const response = await defaultAnthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: `You are an expert code evaluator for coding interviews. Analyze the code execution output and determine if the solution is correct.

Return a JSON object with:
{
  "passed": true/false,
  "score": 0-100,
  "testResults": [{"input": "...", "expected": "...", "actual": "...", "passed": true/false}],
  "feedback": "Detailed feedback about what's working and what's not",
  "issues": ["List of specific issues found"],
  "suggestions": ["Specific suggestions to fix the issues"]
}

Be thorough but encouraging. If the output is close but not exact, explain what's different.
Only respond with valid JSON.`,
      messages: [{
        role: 'user',
        content: `Problem: ${problemDescription || 'Not specified'}

Test Cases:
${testCases ? testCases.map(tc => `Input: ${tc.input} → Expected: ${tc.expected}`).join('\n') : 'Not provided'}

Code:
\`\`\`python
${code}
\`\`\`

Actual Output:
\`\`\`
${output}
\`\`\`

${expectedOutput ? `Expected Output:\n\`\`\`\n${expectedOutput}\n\`\`\`` : ''}`
      }]
    });

    const evalText = response.content[0].text;
    let evaluation;

    try {
      evaluation = JSON.parse(evalText);
    } catch {
      evaluation = { feedback: evalText, parseError: true, passed: false };
    }

    res.json({
      success: true,
      evaluation
    });

  } catch (error) {
    console.error('Output evaluation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// AI Follow-up Questions - Generate follow-up questions after solving a problem
app.post('/api/ai/follow-up-questions', async (req, res) => {
  if (!defaultAnthropic) {
    return res.status(503).json({
      error: 'AI service not configured',
      configured: false
    });
  }

  const { problemTitle, problemDescription, code, complexity } = req.body;

  if (!problemTitle || !code) {
    return res.status(400).json({ error: 'Problem title and code are required' });
  }

  try {
    const response = await defaultAnthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1200,
      system: `You are an experienced technical interviewer. After a candidate solves a coding problem, you ask follow-up questions to:
1. Test their understanding of the solution
2. Explore edge cases they might have missed
3. Discuss potential optimizations
4. Test their knowledge of related concepts
5. See how they'd adapt the solution to new requirements

Return a JSON object with:
{
  "questions": [
    {
      "question": "The follow-up question",
      "category": "optimization|edge-cases|complexity|scalability|variations|concepts",
      "difficulty": "easy|medium|hard",
      "expectedAnswer": "Brief expected answer or key points"
    }
  ],
  "overallAssessment": "Brief assessment of the solution quality"
}

Generate 4-6 relevant follow-up questions. Make them specific to their code.
Only respond with valid JSON.`,
      messages: [{
        role: 'user',
        content: `Problem: ${problemTitle}

Description: ${problemDescription || 'Not provided'}

Candidate's Solution:
\`\`\`python
${code}
\`\`\`

${complexity ? `Stated Complexity: Time: ${complexity.time}, Space: ${complexity.space}` : ''}`
      }]
    });

    const questionsText = response.content[0].text;
    let followUp;

    try {
      followUp = JSON.parse(questionsText);
    } catch {
      followUp = { questions: [{ question: questionsText, category: 'general' }], parseError: true };
    }

    res.json({
      success: true,
      followUp
    });

  } catch (error) {
    console.error('Follow-up questions error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// AI Optimization Suggestions - Get specific optimization recommendations
app.post('/api/ai/optimize', async (req, res) => {
  if (!defaultAnthropic) {
    return res.status(503).json({
      error: 'AI service not configured',
      configured: false
    });
  }

  const { code, language, problemDescription, currentComplexity } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  try {
    const response = await defaultAnthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: `You are an expert algorithm optimizer. Analyze the code and provide specific optimization suggestions focused on improving time and space complexity.

Return a JSON object with:
{
  "currentAnalysis": {
    "timeComplexity": "O(...)",
    "spaceComplexity": "O(...)",
    "bottlenecks": ["List of performance bottlenecks in the code"]
  },
  "optimizations": [
    {
      "title": "Optimization name",
      "description": "What this optimization does",
      "impact": "How it improves complexity (e.g., 'O(n²) → O(n log n)')",
      "tradeoffs": "Any tradeoffs (memory vs speed, readability, etc.)",
      "codeHint": "Brief code hint or pseudocode showing the approach"
    }
  ],
  "optimalApproach": {
    "timeComplexity": "O(...)",
    "spaceComplexity": "O(...)",
    "description": "Brief description of the optimal approach"
  },
  "alternativeApproaches": [
    {
      "name": "Approach name",
      "complexity": "O(...)",
      "description": "Brief description",
      "whenToUse": "When this approach is preferred"
    }
  ]
}

Be specific about WHERE in the code to make changes. Mention line-level improvements when possible.
Only respond with valid JSON.`,
      messages: [{
        role: 'user',
        content: `Problem: ${problemDescription || 'Not specified'}

Language: ${language || 'Python'}

Current Code:
\`\`\`${language || 'python'}
${code}
\`\`\`

${currentComplexity ? `Candidate's stated complexity: Time: ${currentComplexity.time}, Space: ${currentComplexity.space}` : ''}`
      }]
    });

    const optimizeText = response.content[0].text;
    let optimization;

    try {
      optimization = JSON.parse(optimizeText);
    } catch {
      optimization = {
        currentAnalysis: { timeComplexity: 'Unknown', spaceComplexity: 'Unknown', bottlenecks: [] },
        optimizations: [{ title: 'Analysis', description: optimizeText }],
        parseError: true
      };
    }

    res.json({
      success: true,
      optimization
    });

  } catch (error) {
    console.error('Optimization analysis error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  const javaCheck = await new Promise((resolve) => {
    exec(`"${JAVAC_CMD}" -version`, (error, stdout, stderr) => {
      resolve({
        installed: !error,
        version: stderr || stdout || 'unknown'
      });
    });
  });

  const pythonCheck = await new Promise((resolve) => {
    exec('python3 --version', (error, stdout, stderr) => {
      resolve({
        installed: !error,
        version: stdout || stderr || 'unknown'
      });
    });
  });

  res.json({
    status: javaCheck.installed || pythonCheck.installed ? 'ok' : 'error',
    java: javaCheck,
    python: pythonCheck
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Code Execution Server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoints:`);
  console.log(`   POST /api/execute-java       - Execute Java code`);
  console.log(`   POST /api/execute-java-tests - Execute Java code with test cases`);
  console.log(`   POST /api/execute-python     - Execute Python code`);
  console.log(`   POST /api/execute-python-tests - Execute Python code with test cases`);
  console.log(`   GET  /api/health             - Check server and language status\n`);
});
