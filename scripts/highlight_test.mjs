// Quick test harness for highlightCode logic
// Run with: node scripts/highlight_test.mjs

const highlightCode = (code) => {
  // Clean input: remove legacy inline HTML markup from code strings (e.g., <span>, <font>, style/color attributes)
  code = code
    .replace(/<\s*(?:span|font)[^>]*>/gi, '')
    .replace(/<\s*\/\s*(?:span|font)\s*>/gi, '')
    .replace(/\s*(?:style|color|bgcolor)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');

  let highlighted = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const placeholders = [];
  const store = (html) => {
    placeholders.push(html);
    return `___P${placeholders.length - 1}___`;
  };

  // Multiline comments and single-line comments
  highlighted = highlighted.replace(/\/\*[\s\S]*?\*\//g, (m) => store(`<span class="token comment">${m}</span>`));
  highlighted = highlighted.replace(/\/\/.*$/gm, (m) => store(`<span class="token comment">${m}</span>`));

  // Strings and chars
  highlighted = highlighted.replace(/"(?:\\.|[^"\\])*"/g, (m) => store(`<span class="token string">${m}</span>`));
  highlighted = highlighted.replace(/'(?:\\.|[^'\\])+'/g, (m) => store(`<span class="token char">${m}</span>`));

  // Annotations
  highlighted = highlighted.replace(/@\w+/g, (m) => store(`<span class="token annotation">${m}</span>`));

  // Numbers
  highlighted = highlighted.replace(/\b\d+(?:\.\d+)?\b/g, (m) => store(`<span class="token number">${m}</span>`));

  // Booleans & null
  highlighted = highlighted.replace(/\b(true|false|null)\b/g, (m) => store(`<span class="token boolean">${m}</span>`));

  // Keywords (basic set)
  const keywords = '\n    abstract assert boolean break byte case catch char class const continue default do double else enum export extends final finally float for goto if implements import instanceof int interface long native new package private protected public return short static strictfp super switch synchronized this throw throws transient try var void volatile while';
  const kwRegex = new RegExp('\\\b(' + keywords.trim().split(/\\s+/).join('|') + ')\\\b', 'g');
  highlighted = highlighted.replace(kwRegex, (m) => store(`<span class="token keyword">${m}</span>`));

  // Class names heuristic
  highlighted = highlighted.replace(/\b([A-Z][A-Za-z0-9_]*)\b/g, (m) => store(`<span class="token class-name">${m}</span>`));

  // Function names (identifier before '(')
  highlighted = highlighted.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, (m) => store(`<span class="token function">${m}</span>`));

  // Punctuation/operators
  highlighted = highlighted.replace(/([{}()[\];,.<>+\-*/=%!:|&^~?]+)/g, (m) => `<span class="token punctuation">${m}</span>`);

  // Restore placeholders
  highlighted = highlighted.replace(/___P(\d+)___/g, (_, n) => placeholders[Number(n)]);

  // Sanitize leftover attributes/tags
  highlighted = highlighted.replace(/\s*(?:style|color|bgcolor)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');
  highlighted = highlighted.replace(/<\s*font[^>]*>/gi, '');
  highlighted = highlighted.replace(/<\s*\/\s*font\s*>/gi, '');

  return highlighted;
};

const sample = `@Component\npublic class Foo {\n  // sample comment\n  public void run() {\n    String s = "hello";\n    int n = 42;\n    if (n > 0) { System.out.println(s); }\n  }\n}`;

const result = highlightCode(sample);
console.log(result);

// Quick checks
console.log('\nContains keyword span:', result.includes('class="token keyword"'));
console.log('Contains string span:', result.includes('class="token string"'));
console.log('Contains comment span:', result.includes('class="token comment"'));
console.log('Contains number span:', result.includes('class="token number"'));
