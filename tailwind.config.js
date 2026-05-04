/** @type {import('tailwindcss').Config} */

// Default Tailwind class regex (broad — picks up anything class-like)
const CLASS_PATTERN = /[^<>"'`\s]*[^<>"'`\s:]/g

// Reject matches that are arbitrary-value-only (e.g. "[-4:-1]", "[a:1]")
// with no utility prefix — these come from code samples in JSX strings
// (Python slicing, YAML keys) and produce invalid CSS like `-4: -1;`
const filterBogusArbitrary = (raw) => {
  const matches = raw.match(CLASS_PATTERN) || []
  return matches.filter(c => !/^\[.*\]$/.test(c))
}

export default {
  content: {
    files: ['./index.html', './src/**/*.{js,jsx}'],
    extract: {
      js: filterBogusArbitrary,
      jsx: filterBogusArbitrary,
      html: filterBogusArbitrary,
    },
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
