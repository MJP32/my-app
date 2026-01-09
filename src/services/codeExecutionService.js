// Code Execution Service
// Handles communication with the backend code execution server

const API_BASE_URL = 'http://localhost:3001/api'

/**
 * Execute Java code
 * @param {string} code - Java source code
 * @returns {Promise<{success: boolean, output: string, error: string, stage: string}>}
 */
export async function executeJava(code) {
  try {
    const response = await fetch(`${API_BASE_URL}/execute-java`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
    return await response.json()
  } catch (error) {
    return {
      success: false,
      output: '',
      error: `Network error: ${error.message}`,
      stage: 'network'
    }
  }
}

/**
 * Execute Java code with test cases
 * @param {string} code - Java source code
 * @param {Array<{input: string, expectedOutput: string}>} testCases - Test cases
 * @returns {Promise<{success: boolean, allPassed: boolean, passedCount: number, totalCount: number, testResults: Array}>}
 */
export async function executeJavaWithTests(code, testCases) {
  try {
    const response = await fetch(`${API_BASE_URL}/execute-java-tests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, testCases })
    })
    return await response.json()
  } catch (error) {
    return {
      success: false,
      allPassed: false,
      passedCount: 0,
      totalCount: testCases.length,
      testResults: [],
      error: `Network error: ${error.message}`,
      stage: 'network'
    }
  }
}

/**
 * Execute Python code
 * @param {string} code - Python source code
 * @param {string} input - Optional stdin input
 * @returns {Promise<{success: boolean, output: string, error: string, stage: string}>}
 */
export async function executePython(code, input = '') {
  try {
    const response = await fetch(`${API_BASE_URL}/execute-python`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, input })
    })
    return await response.json()
  } catch (error) {
    return {
      success: false,
      output: '',
      error: `Network error: ${error.message}`,
      stage: 'network'
    }
  }
}

/**
 * Execute Python code with test cases
 * @param {string} code - Python source code
 * @param {Array<{input: string, expectedOutput: string}>} testCases - Test cases
 * @returns {Promise<{success: boolean, allPassed: boolean, passedCount: number, totalCount: number, testResults: Array}>}
 */
export async function executePythonWithTests(code, testCases) {
  try {
    const response = await fetch(`${API_BASE_URL}/execute-python-tests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, testCases })
    })
    return await response.json()
  } catch (error) {
    return {
      success: false,
      allPassed: false,
      passedCount: 0,
      totalCount: testCases.length,
      testResults: [],
      error: `Network error: ${error.message}`,
      stage: 'network'
    }
  }
}

/**
 * Check server health and available languages
 * @returns {Promise<{status: string, java: {installed: boolean, version: string}, python: {installed: boolean, version: string}}>}
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`)
    return await response.json()
  } catch (error) {
    return {
      status: 'error',
      error: `Server not reachable: ${error.message}`,
      java: { installed: false, version: 'unknown' },
      python: { installed: false, version: 'unknown' }
    }
  }
}

/**
 * Execute code based on language
 * @param {string} code - Source code
 * @param {'java' | 'python'} language - Programming language
 * @param {string} input - Optional stdin input
 * @returns {Promise<{success: boolean, output: string, error: string, stage: string}>}
 */
export async function executeCode(code, language, input = '') {
  if (language === 'java') {
    return executeJava(code)
  } else if (language === 'python') {
    return executePython(code, input)
  } else {
    return {
      success: false,
      output: '',
      error: `Unsupported language: ${language}`,
      stage: 'validation'
    }
  }
}

/**
 * Execute code with test cases based on language
 * @param {string} code - Source code
 * @param {'java' | 'python'} language - Programming language
 * @param {Array<{input: string, expectedOutput: string}>} testCases - Test cases
 * @returns {Promise<{success: boolean, allPassed: boolean, passedCount: number, totalCount: number, testResults: Array}>}
 */
export async function executeCodeWithTests(code, language, testCases) {
  if (language === 'java') {
    return executeJavaWithTests(code, testCases)
  } else if (language === 'python') {
    return executePythonWithTests(code, testCases)
  } else {
    return {
      success: false,
      allPassed: false,
      passedCount: 0,
      totalCount: testCases.length,
      testResults: [],
      error: `Unsupported language: ${language}`,
      stage: 'validation'
    }
  }
}

export default {
  executeJava,
  executeJavaWithTests,
  executePython,
  executePythonWithTests,
  checkHealth,
  executeCode,
  executeCodeWithTests
}
