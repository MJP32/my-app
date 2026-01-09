import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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
    const windowsExecDir = toWindowsPath(execDir);

    const compileResult = await new Promise((resolve, reject) => {
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
    const runResult = await new Promise((resolve, reject) => {
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
    } catch (e) {
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
    } catch (e) { /* ignore */ }

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
      const child = exec(`python3 "${pythonFilePath}"`, {
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
    } catch (e) { /* ignore */ }

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
        const child = exec(`python3 "${pythonFilePath}"`, {
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
    } catch (e) { /* ignore */ }

    res.status(500).json({
      success: false,
      error: error.message,
      stage: 'system',
      testResults: []
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
