import { useState } from 'react'

// Normalize indentation by removing common leading whitespace
const normalizeIndentation = (code) => {
  if (!code) return ''
  const lines = code.split('\n')
  const nonEmptyLines = lines.filter(line => line.trim().length > 0)
  if (nonEmptyLines.length === 0) return code

  const minIndent = Math.min(
    ...nonEmptyLines.map(line => {
      const match = line.match(/^(\s*)/)
      return match ? match[1].length : 0
    })
  )

  return lines.map(line => {
    if (line.trim().length === 0) return ''
    return line.substring(minIndent)
  }).join('\n').trim()
}

// Syntax highlighting for Java
const highlightJava = (code) => {
  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  const protectedContent = []
  let placeholder = 0

  // Protect comments
  highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
    const id = `___COMMENT_${placeholder++}___`
    protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
    return id
  })

  // Protect strings
  highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
    const id = `___STRING_${placeholder++}___`
    protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
    return id
  })

  highlighted = highlighted
    .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|strictfp|super|this|null|sealed|permits|non-sealed|record|instanceof|var|default)\b/g, '<span style="color: #c586c0;">$1</span>')
    .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean)\b/g, '<span style="color: #569cd6;">$1</span>')
    .replace(/\b(String|List|ArrayList|LinkedList|HashMap|TreeMap|HashSet|TreeSet|Map|Set|Queue|Deque|Collection|Arrays|Collections|Thread|Runnable|Executor|ExecutorService|CompletableFuture|Stream|Optional|Path|Files|Pattern|Matcher|StringBuilder|StringBuffer|Integer|Double|Float|Long|Short|Byte|Character|Boolean|Object|System|Math|Scanner|BufferedReader|FileReader|FileWriter|PrintWriter|InputStream|OutputStream|Exception|RuntimeException|IOException|SQLException)\b/g, '<span style="color: #4ec9b0;">$1</span>')
    .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')
    .replace(/\b(\d+\.?\d*[fLdD]?)\b/g, '<span style="color: #b5cea8;">$1</span>')
    .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

  protectedContent.forEach(({ id, replacement }) => {
    highlighted = highlighted.replace(id, replacement)
  })

  return highlighted
}

// Syntax highlighting for Python
const highlightPython = (code) => {
  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  const protectedContent = []
  let placeholder = 0

  // Protect comments
  highlighted = highlighted.replace(/(#.*$)/gm, (match) => {
    const id = `___COMMENT_${placeholder++}___`
    protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
    return id
  })

  // Protect strings (single, double, triple quotes)
  highlighted = highlighted.replace(/("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, (match) => {
    const id = `___STRING_${placeholder++}___`
    protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
    return id
  })

  highlighted = highlighted
    .replace(/\b(def|class|if|elif|else|for|while|try|except|finally|with|as|import|from|return|yield|raise|pass|break|continue|and|or|not|in|is|lambda|global|nonlocal|assert|async|await)\b/g, '<span style="color: #c586c0;">$1</span>')
    .replace(/\b(True|False|None)\b/g, '<span style="color: #569cd6;">$1</span>')
    .replace(/\b(int|float|str|list|dict|set|tuple|bool|bytes|type|object|range|enumerate|zip|map|filter|sorted|len|print|input|open|super|self|cls)\b/g, '<span style="color: #4ec9b0;">$1</span>')
    .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')
    .replace(/\b(\d+\.?\d*[jJ]?)\b/g, '<span style="color: #b5cea8;">$1</span>')
    .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

  protectedContent.forEach(({ id, replacement }) => {
    highlighted = highlighted.replace(id, replacement)
  })

  return highlighted
}

function CodeBlock({
  code,
  language = 'java',
  title,
  showCopy = true,
  showLineNumbers = true,
  maxHeight = '400px',
  theme = 'dark'
}) {
  const [copied, setCopied] = useState(false)

  const normalizedCode = normalizeIndentation(code)
  const highlightedCode = language === 'python'
    ? highlightPython(normalizedCode)
    : highlightJava(normalizedCode)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(normalizedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const lines = highlightedCode.split('\n')

  const isDark = theme === 'dark'
  const bgColor = isDark ? '#1e1e1e' : '#f8f9fa'
  const textColor = isDark ? '#d4d4d4' : '#1f2937'
  const lineNumColor = isDark ? '#858585' : '#9ca3af'
  const borderColor = isDark ? '#3c3c3c' : '#e5e7eb'
  const headerBg = isDark ? '#2d2d2d' : '#f3f4f6'

  return (
    <div style={{
      borderRadius: '8px',
      overflow: 'hidden',
      border: `1px solid ${borderColor}`,
      fontFamily: 'Consolas, Monaco, "Courier New", monospace'
    }}>
      {/* Header */}
      {(title || showCopy) && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 1rem',
          backgroundColor: headerBg,
          borderBottom: `1px solid ${borderColor}`
        }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: '600',
            color: textColor,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {title || language}
          </span>
          {showCopy && (
            <button
              onClick={handleCopy}
              style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.75rem',
                backgroundColor: copied ? '#10b981' : (isDark ? '#3c3c3c' : '#e5e7eb'),
                color: copied ? 'white' : textColor,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      )}

      {/* Code */}
      <div style={{
        backgroundColor: bgColor,
        padding: '1rem',
        overflowX: 'auto',
        maxHeight,
        overflowY: 'auto'
      }}>
        <pre style={{ margin: 0, lineHeight: '1.5' }}>
          {lines.map((line, i) => (
            <div key={i} style={{ display: 'flex' }}>
              {showLineNumbers && (
                <span style={{
                  color: lineNumColor,
                  userSelect: 'none',
                  textAlign: 'right',
                  paddingRight: '1rem',
                  minWidth: '2.5rem',
                  fontSize: '0.85rem'
                }}>
                  {i + 1}
                </span>
              )}
              <code
                style={{ color: textColor, fontSize: '0.9rem', flex: 1 }}
                dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }}
              />
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}

export default CodeBlock
