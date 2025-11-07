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

// Health check endpoint
app.get('/api/health', (req, res) => {
  exec(`"${JAVAC_CMD}" -version`, (error, stdout, stderr) => {
    if (error) {
      res.json({
        status: 'error',
        message: 'Java compiler not found. Please install JDK.',
        javaInstalled: false
      });
    } else {
      res.json({
        status: 'ok',
        javaVersion: stderr || stdout,
        javaInstalled: true
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Java Code Execution Server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoints:`);
  console.log(`   POST /api/execute-java - Execute Java code`);
  console.log(`   GET  /api/health - Check server and Java status\n`);
});
