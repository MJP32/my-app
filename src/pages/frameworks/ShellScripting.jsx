import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

function ShellScripting({ onBack, breadcrumb }) {
  const [activeSection, setActiveSection] = useState('basics')

  const codeStyle = {
    backgroundColor: '#1e1e1e',
    padding: '1.25rem',
    borderRadius: '8px',
    border: '1px solid #374151',
    marginBottom: '1.5rem'
  }

  const cardStyle = {
    background: 'linear-gradient(to bottom right, #1f2937, #111827)',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #374151',
    marginBottom: '1.5rem'
  }

  const h2Style = { fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }
  const h3Style = { fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '1rem' }
  const pStyle = { fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }
  const tipStyle = {
    backgroundColor: '#064e3b',
    padding: '1rem',
    borderRadius: '8px',
    borderLeft: '4px solid #10b981',
    marginBottom: '1rem'
  }
  const tipText = { fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #064e3b, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            background: 'rgba(16, 185, 129, 0.2)',
            color: '#6ee7b7',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(16, 185, 129, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(16, 185, 129, 0.2)'
          }}
        >
          Back
        </button>
      </div>

      {breadcrumb && (
        <Breadcrumb
          breadcrumbStack={[
            breadcrumb.section && { name: breadcrumb.section.name, icon: breadcrumb.section.icon, onClick: breadcrumb.section.onClick },
            breadcrumb.category && { name: breadcrumb.category.name, onClick: breadcrumb.category.onClick },
            breadcrumb.topic && { name: breadcrumb.topic }
          ].filter(Boolean)}
          colors={breadcrumb.colors}
          onMainMenu={breadcrumb.onMainMenu}
        />
      )}

      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '0.5rem',
        background: 'linear-gradient(to right, #6ee7b7, #34d399)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Unix / Shell Scripting
      </h1>
      <p style={{ color: '#d1d5db', textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem' }}>
        Comprehensive reference for Bash scripting, text processing, and system administration
      </p>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '0.25rem',
        marginBottom: '2rem',
        borderBottom: '2px solid #374151',
        overflowX: 'auto',
        flexWrap: 'nowrap'
      }}>
        {[
          { id: 'basics', label: 'Shell Basics' },
          { id: 'control-flow', label: 'Control Flow' },
          { id: 'functions', label: 'Functions' },
          { id: 'text-processing', label: 'Text Processing' },
          { id: 'files-dirs', label: 'Files & Dirs' },
          { id: 'pipes-redirection', label: 'Pipes & Redirection' },
          { id: 'process-mgmt', label: 'Processes' },
          { id: 'networking', label: 'Networking' },
          { id: 'scripting-patterns', label: 'Patterns' },
          { id: 'one-liners', label: 'One-Liners' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            style={{
              padding: '0.75rem 1.25rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              backgroundColor: activeSection === tab.id ? '#10b981' : 'transparent',
              color: activeSection === tab.id ? 'white' : '#9ca3af',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (activeSection !== tab.id) {
                e.target.style.backgroundColor = '#374151'
                e.target.style.color = '#d1d5db'
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== tab.id) {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#9ca3af'
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ==================== BASICS ==================== */}
      {activeSection === 'basics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cardStyle}>
            <h2 style={h2Style}>Shebang, Running Scripts &amp; Permissions</h2>
            <p style={pStyle}>
              Every shell script should start with a shebang line that tells the OS which interpreter to use.
              Make scripts executable with <code style={{ color: '#6ee7b7' }}>chmod +x</code>, then run them directly.
            </p>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`#!/bin/bash
# Preferred shebang - uses bash explicitly

#!/usr/bin/env bash
# Portable shebang - finds bash via env PATH lookup

# Make script executable and run it
chmod +x myscript.sh
./myscript.sh

# Or run with explicit interpreter (no chmod needed)
bash myscript.sh

# Check which shell you are using
echo $SHELL        # Login shell
echo $0            # Current shell
cat /etc/shells    # All available shells`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Variables</h2>
            <p style={pStyle}>
              Shell variables are untyped (treated as strings by default). No spaces around the <code style={{ color: '#6ee7b7' }}>=</code> sign.
            </p>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Assignment - NO spaces around =
NAME="Alice"
AGE=30
FILE_PATH="/var/log/syslog"

# Read-only variables (constants)
readonly PI=3.14159
readonly APP_NAME="MyApp"

# Local variables (inside functions only)
my_func() {
    local result="local value"
    echo "$result"
}

# Environment variables - available to child processes
export DATABASE_URL="postgres://localhost/mydb"
export PATH="$HOME/bin:$PATH"

# Unsetting variables
unset NAME

# Default values
echo "\${EDITOR:-vim}"        # Use vim if EDITOR is unset
echo "\${EDITOR:=vim}"        # Set EDITOR to vim if unset
echo "\${EDITOR:?'not set'}"  # Error if EDITOR is unset
echo "\${EDITOR:+found}"      # "found" if EDITOR is set`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Quoting &amp; Command Substitution</h2>
            <p style={pStyle}>
              Quoting controls how the shell interprets special characters. Double quotes allow variable expansion; single quotes are literal.
            </p>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`NAME="World"

# Double quotes - variables and commands are expanded
echo "Hello $NAME"          # Hello World
echo "Home is $HOME"        # Home is /home/user
echo "Date: $(date)"        # Date: Mon Apr 19 ...

# Single quotes - everything is literal
echo 'Hello $NAME'          # Hello $NAME
echo 'No $(expansion)'      # No $(expansion)

# Command substitution (preferred modern syntax)
TODAY=$(date +%Y-%m-%d)
FILE_COUNT=$(ls -1 | wc -l)
GIT_BRANCH=$(git branch --show-current)

# Backtick syntax (legacy, avoid in new scripts)
TODAY=\`date +%Y-%m-%d\`

# Nesting command substitution (only works with $())
KERNEL=$(uname -r | cut -d. -f1-2)
echo "Kernel major.minor: $KERNEL"`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Special Variables</h2>
            <p style={pStyle}>
              Bash provides built-in special variables for script arguments, process IDs, and exit statuses.
            </p>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`#!/bin/bash
# Run: ./script.sh arg1 arg2 arg3

echo "Script name:       $0"      # ./script.sh
echo "First argument:    $1"      # arg1
echo "Second argument:   $2"      # arg2
echo "All args (single): $*"      # arg1 arg2 arg3
echo "All args (array):  $@"      # arg1 arg2 arg3
echo "Number of args:    $#"      # 3
echo "Last exit code:    $?"      # 0 (success)
echo "Current PID:       $$"      # e.g., 12345
echo "Last background PID: $!"    # PID of last & process

# Difference between $* and $@
# In double quotes:
#   "$*" = "arg1 arg2 arg3"  (single string)
#   "$@" = "arg1" "arg2" "arg3"  (separate strings)

# Iterating arguments safely
for arg in "$@"; do
    echo "Argument: $arg"
done

# Shift arguments (removes $1, shifts others down)
shift       # Now $1 is old $2
shift 2     # Shift by 2 positions`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Arithmetic</h2>
            <p style={pStyle}>
              Bash natively handles integer arithmetic. For floating-point math, use <code style={{ color: '#6ee7b7' }}>bc</code> or <code style={{ color: '#6ee7b7' }}>awk</code>.
            </p>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# $(( )) - arithmetic expansion (preferred)
A=10; B=3
echo $(( A + B ))      # 13
echo $(( A - B ))      # 7
echo $(( A * B ))      # 30
echo $(( A / B ))      # 3  (integer division)
echo $(( A % B ))      # 1  (modulo)
echo $(( A ** 2 ))     # 100 (exponentiation)

# Increment / decrement
(( A++ ))              # A is now 11
(( A-- ))              # A is back to 10
(( A += 5 ))           # A is now 15

# let command
let "X = 5 + 3"
let "X += 10"

# expr (legacy, external command)
RESULT=$(expr 5 + 3)

# Floating point with bc
echo "scale=2; 10 / 3" | bc        # 3.33
echo "scale=4; sqrt(2)" | bc -l    # 1.4142

# Floating point with awk
awk "BEGIN { printf \"%.2f\", 10/3 }"  # 3.33`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Exit Codes</h2>
            <p style={pStyle}>
              Every command returns an exit code: 0 means success, non-zero means failure. Use this for error handling.
            </p>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Check exit code of last command
ls /tmp
echo $?    # 0 (success)

ls /nonexistent
echo $?    # 2 (no such file)

# Exit script with a code
exit 0     # Success
exit 1     # General error
exit 2     # Misuse of shell command

# Use exit code in conditionals
if grep -q "error" logfile.txt; then
    echo "Errors found!"
fi

# Logical operators with exit codes
command1 && command2    # Run command2 only if command1 succeeds
command1 || command2    # Run command2 only if command1 fails

# Common pattern: do or die
cd /app || { echo "Failed to cd"; exit 1; }

# Custom exit codes in functions
check_disk() {
    local usage=$(df / | awk 'NR==2 {print $5}' | tr -d '%')
    if (( usage > 90 )); then
        return 1   # Failure
    fi
    return 0       # Success
}`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}

      {/* ==================== CONTROL FLOW ==================== */}
      {activeSection === 'control-flow' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cardStyle}>
            <h2 style={h2Style}>If / Elif / Else</h2>
            <p style={pStyle}>
              Use <code style={{ color: '#6ee7b7' }}>[ ]</code> (test) or <code style={{ color: '#6ee7b7' }}>[[ ]]</code> (extended test) for conditionals.
              The <code style={{ color: '#6ee7b7' }}>[[ ]]</code> form supports regex and glob matching.
            </p>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Basic if/elif/else
if [[ "$USER" == "root" ]]; then
    echo "Running as root"
elif [[ "$USER" == "admin" ]]; then
    echo "Running as admin"
else
    echo "Running as $USER"
fi

# File test operators
if [[ -f "$FILE" ]]; then echo "Regular file exists"; fi
if [[ -d "$DIR" ]]; then echo "Directory exists"; fi
if [[ -e "$PATH" ]]; then echo "Path exists (file or dir)"; fi
if [[ -r "$FILE" ]]; then echo "File is readable"; fi
if [[ -w "$FILE" ]]; then echo "File is writable"; fi
if [[ -x "$FILE" ]]; then echo "File is executable"; fi
if [[ -s "$FILE" ]]; then echo "File is non-empty"; fi
if [[ -L "$FILE" ]]; then echo "File is a symlink"; fi

# String tests
if [[ -z "$VAR" ]]; then echo "String is empty"; fi
if [[ -n "$VAR" ]]; then echo "String is non-empty"; fi
if [[ "$A" == "$B" ]]; then echo "Strings equal"; fi
if [[ "$A" != "$B" ]]; then echo "Strings not equal"; fi
if [[ "$A" < "$B" ]]; then echo "A sorts before B"; fi
if [[ "$A" =~ ^[0-9]+$ ]]; then echo "A is numeric (regex)"; fi

# Numeric comparisons
if [[ "$X" -eq "$Y" ]]; then echo "Equal"; fi
if [[ "$X" -ne "$Y" ]]; then echo "Not equal"; fi
if [[ "$X" -lt "$Y" ]]; then echo "Less than"; fi
if [[ "$X" -gt "$Y" ]]; then echo "Greater than"; fi
if [[ "$X" -le "$Y" ]]; then echo "Less or equal"; fi
if [[ "$X" -ge "$Y" ]]; then echo "Greater or equal"; fi

# Compound conditions
if [[ "$AGE" -ge 18 && "$AGE" -le 65 ]]; then
    echo "Working age"
fi
if [[ "$STATUS" == "active" || "$STATUS" == "pending" ]]; then
    echo "Not inactive"
fi`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>For Loops</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Iterate over a list
for fruit in apple banana cherry; do
    echo "Fruit: $fruit"
done

# C-style for loop
for (( i=0; i<10; i++ )); do
    echo "Index: $i"
done

# Range with brace expansion
for i in {1..5}; do echo "$i"; done       # 1 2 3 4 5
for i in {0..20..5}; do echo "$i"; done   # 0 5 10 15 20
for letter in {a..z}; do echo "$letter"; done

# Iterate over command output
for file in $(ls *.txt); do
    echo "Processing: $file"
done

# Iterate over glob patterns (safer than ls)
for file in /var/log/*.log; do
    [[ -f "$file" ]] && echo "Log: $file"
done

# Iterate over array elements
SERVERS=("web01" "web02" "db01")
for server in "\${SERVERS[@]}"; do
    echo "Pinging $server"
    ping -c 1 "$server" &>/dev/null && echo "UP" || echo "DOWN"
done

# Iterate over arguments
for arg in "$@"; do
    echo "Arg: $arg"
done`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>While, Until &amp; Reading Lines</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# While loop
COUNT=0
while [[ $COUNT -lt 5 ]]; do
    echo "Count: $COUNT"
    (( COUNT++ ))
done

# Until loop (runs until condition is true)
until [[ -f /tmp/ready.flag ]]; do
    echo "Waiting for ready flag..."
    sleep 2
done

# Read file line by line (best practice)
while IFS= read -r line; do
    echo "Line: $line"
done < /etc/hosts

# Read with custom delimiter
while IFS=: read -r user _ uid gid _ home shell; do
    echo "$user (UID=$uid) -> $shell"
done < /etc/passwd

# Infinite loop with break
while true; do
    read -p "Enter command (quit to exit): " cmd
    [[ "$cmd" == "quit" ]] && break
    echo "You typed: $cmd"
done

# Process command output line by line
ps aux | while read -r line; do
    echo "$line"
done`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Case Statements</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Basic case statement
case "$1" in
    start)
        echo "Starting service..."
        ;;
    stop)
        echo "Stopping service..."
        ;;
    restart)
        echo "Restarting service..."
        ;;
    status)
        echo "Service status: running"
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status}"
        exit 1
        ;;
esac

# Pattern matching in case
case "$filename" in
    *.tar.gz|*.tgz)  tar xzf "$filename" ;;
    *.tar.bz2)       tar xjf "$filename" ;;
    *.zip)           unzip "$filename" ;;
    *.gz)            gunzip "$filename" ;;
    *)               echo "Unknown format: $filename" ;;
esac

# Case with character classes
read -p "Continue? [y/n] " answer
case "$answer" in
    [Yy]|[Yy][Ee][Ss]) echo "Proceeding..." ;;
    [Nn]|[Nn][Oo])     echo "Aborting."; exit 0 ;;
    *)                  echo "Invalid input." ;;
esac`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Select Menus, Break &amp; Continue</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Select - interactive menu
echo "Choose your environment:"
select ENV in development staging production quit; do
    case "$ENV" in
        development) echo "Using dev config"; break ;;
        staging)     echo "Using staging config"; break ;;
        production)  echo "Using prod config"; break ;;
        quit)        exit 0 ;;
        *)           echo "Invalid option. Try again." ;;
    esac
done

# Break - exit loop early
for i in {1..100}; do
    if [[ $i -eq 10 ]]; then
        echo "Breaking at $i"
        break
    fi
    echo "$i"
done

# Continue - skip current iteration
for file in *.log; do
    # Skip empty files
    [[ ! -s "$file" ]] && continue
    echo "Processing non-empty: $file"
    wc -l "$file"
done

# Break from nested loops (break N)
for i in {1..3}; do
    for j in {1..3}; do
        [[ $j -eq 2 ]] && break 2  # Breaks both loops
        echo "$i-$j"
    done
done`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}

      {/* ==================== FUNCTIONS ==================== */}
      {activeSection === 'functions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cardStyle}>
            <h2 style={h2Style}>Function Declaration</h2>
            <p style={pStyle}>
              Functions can be declared with or without the <code style={{ color: '#6ee7b7' }}>function</code> keyword. They must be defined before they are called.
            </p>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Method 1: function keyword
function greet() {
    echo "Hello, $1!"
}

# Method 2: shorthand (POSIX compatible)
greet() {
    echo "Hello, $1!"
}

# Calling a function
greet "Alice"       # Hello, Alice!
greet "Bob"         # Hello, Bob!

# Function with multiple arguments
create_user() {
    local username="$1"
    local email="$2"
    local role="\${3:-user}"   # Default to "user"
    echo "Creating $username ($email) with role: $role"
}
create_user "alice" "alice@example.com" "admin"
create_user "bob" "bob@example.com"`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Arguments &amp; Return Values</h2>
            <p style={pStyle}>
              Functions access arguments via <code style={{ color: '#6ee7b7' }}>$1, $2, ...</code> just like scripts.
              Use <code style={{ color: '#6ee7b7' }}>return</code> for exit codes (0-255) and <code style={{ color: '#6ee7b7' }}>echo</code> for output capture.
            </p>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Function arguments
show_args() {
    echo "Function name:  \${FUNCNAME[0]}"
    echo "Arg count:      $#"
    echo "All args:       $@"
    echo "First arg:      $1"
}

# Return values (exit codes 0-255)
is_even() {
    if (( $1 % 2 == 0 )); then
        return 0   # true/success
    else
        return 1   # false/failure
    fi
}
if is_even 42; then echo "42 is even"; fi

# Capture output with command substitution
get_timestamp() {
    echo "$(date +%Y%m%d_%H%M%S)"
}
TIMESTAMP=$(get_timestamp)
echo "Timestamp: $TIMESTAMP"

# Return complex data via echo
get_system_info() {
    local hostname=$(hostname)
    local kernel=$(uname -r)
    local uptime=$(uptime -p 2>/dev/null || uptime)
    echo "$hostname|$kernel|$uptime"
}
IFS='|' read -r HOST KERN UP <<< "$(get_system_info)"
echo "Host=$HOST Kernel=$KERN"`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Local Variables &amp; Scope</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Without local: variables leak to global scope
bad_func() {
    LEAKED="I am global now"
    echo "Inside: $LEAKED"
}
bad_func
echo "Outside: $LEAKED"   # "I am global now" - BAD!

# With local: variables are scoped to the function
good_func() {
    local contained="I stay inside"
    echo "Inside: $contained"
}
good_func
echo "Outside: $contained"  # empty - GOOD!

# Local with command substitution
process_file() {
    local filename="$1"
    local content
    content=$(cat "$filename" 2>/dev/null) || {
        echo "Error: Cannot read $filename" >&2
        return 1
    }
    local line_count=$(echo "$content" | wc -l)
    echo "File $filename has $line_count lines"
}`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Recursive Functions</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Factorial (recursive)
factorial() {
    local n=$1
    if (( n <= 1 )); then
        echo 1
    else
        local prev=$(factorial $(( n - 1 )))
        echo $(( n * prev ))
    fi
}
echo "5! = $(factorial 5)"   # 120

# Recursive directory tree listing
tree_list() {
    local dir="$1"
    local indent="\${2:-}"
    local item
    for item in "$dir"/*; do
        [[ -e "$item" ]] || continue
        echo "\${indent}$(basename "$item")"
        if [[ -d "$item" ]]; then
            tree_list "$item" "  $indent"
        fi
    done
}
tree_list /etc/nginx`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Library Sourcing</h2>
            <p style={pStyle}>
              Use <code style={{ color: '#6ee7b7' }}>source</code> (or the dot operator <code style={{ color: '#6ee7b7' }}>.</code>) to include functions from external files.
            </p>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# lib/logging.sh - reusable logging library
#!/bin/bash
RED='\\033[0;31m'; GREEN='\\033[0;32m'; YELLOW='\\033[1;33m'; NC='\\033[0m'

log_info()  { echo -e "\${GREEN}[INFO]\${NC}  $(date '+%H:%M:%S') $*"; }
log_warn()  { echo -e "\${YELLOW}[WARN]\${NC}  $(date '+%H:%M:%S') $*"; }
log_error() { echo -e "\${RED}[ERROR]\${NC} $(date '+%H:%M:%S') $*" >&2; }

# main.sh - using the library
#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"

# Source with dot operator (POSIX)
. "$SCRIPT_DIR/lib/logging.sh"

# Or use source keyword (Bash)
source "$SCRIPT_DIR/lib/logging.sh"

log_info "Application starting"
log_warn "Config file not found, using defaults"
log_error "Connection failed"

# Guard against double-sourcing
[[ -n "\${_LOGGING_LOADED:-}" ]] && return 0
_LOGGING_LOADED=1`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TEXT PROCESSING ==================== */}
      {activeSection === 'text-processing' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cardStyle}>
            <h2 style={h2Style}>grep - Pattern Searching</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Basic grep
grep "error" /var/log/syslog

# Case-insensitive
grep -i "warning" app.log

# Extended regex (-E or egrep)
grep -E "error|warning|fatal" app.log

# Recursive search in directory
grep -r "TODO" src/
grep -rn "TODO" src/        # With line numbers

# Context: lines before (-B), after (-A), or both (-C)
grep -B 3 -A 3 "Exception" app.log
grep -C 5 "panic" app.log

# Invert match (lines that do NOT match)
grep -v "^#" config.conf    # Skip comment lines
grep -v "^$" file.txt       # Skip empty lines

# Count matches
grep -c "error" app.log

# Only filenames with matches
grep -rl "password" /etc/

# Match whole words only
grep -w "log" file.txt      # Matches "log" but not "logging"

# Regex patterns
grep "^Start" file.txt      # Lines starting with "Start"
grep "end$" file.txt        # Lines ending with "end"
grep "[0-9]\\{3\\}-[0-9]\\{4\\}" file.txt  # Phone pattern`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>sed - Stream Editor</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Substitution: s/pattern/replacement/flags
sed 's/foo/bar/' file.txt          # First occurrence per line
sed 's/foo/bar/g' file.txt         # All occurrences (global)
sed 's/foo/bar/gi' file.txt        # Global + case-insensitive

# In-place editing (modifies original file)
sed -i 's/old/new/g' file.txt           # Linux
sed -i '' 's/old/new/g' file.txt        # macOS (BSD sed)
sed -i.bak 's/old/new/g' file.txt       # Create backup

# Delete lines
sed '/^#/d' config.conf        # Delete comment lines
sed '/^$/d' file.txt           # Delete empty lines
sed '5d' file.txt              # Delete line 5
sed '3,7d' file.txt            # Delete lines 3-7

# Address ranges
sed '10,20s/foo/bar/g' file.txt       # Lines 10-20 only
sed '/START/,/END/d' file.txt         # Delete between patterns

# Insert and append
sed '3i\\New line before 3' file.txt   # Insert before line 3
sed '3a\\New line after 3' file.txt    # Append after line 3

# Multiple operations
sed -e 's/foo/bar/g' -e 's/baz/qux/g' file.txt

# Print specific lines
sed -n '5p' file.txt           # Print only line 5
sed -n '10,20p' file.txt      # Print lines 10-20
sed -n '/pattern/p' file.txt  # Print matching lines`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>awk - Pattern Processing</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Basic field extraction (default delimiter: whitespace)
awk '{print $1}' file.txt              # First field
awk '{print $1, $3}' file.txt          # First and third fields
awk '{print $NF}' file.txt             # Last field
awk '{print $(NF-1)}' file.txt         # Second-to-last field

# Custom field separator
awk -F: '{print $1, $3}' /etc/passwd   # Colon-delimited
awk -F',' '{print $2}' data.csv        # Comma-delimited

# Built-in variables
# NR = current record (line) number
# NF = number of fields in current record
# FS = field separator
# RS = record separator
awk '{print NR, NF, $0}' file.txt

# Pattern matching
awk '/error/' app.log                  # Lines matching "error"
awk '$3 > 100' data.txt               # Third field > 100
awk 'NR >= 5 && NR <= 10' file.txt    # Lines 5-10

# BEGIN and END blocks
awk 'BEGIN {print "Name|Size"} {print $9, $5} END {print "Done"}' <<< "$(ls -l)"

# Summing a column
awk '{sum += $2} END {print "Total:", sum}' sales.txt

# Printf for formatting
awk '{printf "%-20s %10.2f\\n", $1, $2}' data.txt

# Associative arrays
awk '{count[$1]++} END {for (k in count) print k, count[k]}' access.log`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>cut, sort, uniq, tr, wc</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# cut - extract fields/columns
cut -d: -f1 /etc/passwd          # Field 1, colon-delimited
cut -d',' -f2,4 data.csv         # Fields 2 and 4
cut -c1-10 file.txt              # Characters 1-10

# sort
sort file.txt                     # Alphabetical
sort -n file.txt                  # Numeric sort
sort -r file.txt                  # Reverse
sort -t: -k3 -n /etc/passwd      # Sort by 3rd field (numeric)
sort -u file.txt                  # Sort and remove duplicates
sort -h sizes.txt                 # Human-readable (1K, 2M, 3G)

# uniq (requires sorted input)
sort file.txt | uniq              # Remove duplicates
sort file.txt | uniq -c           # Count occurrences
sort file.txt | uniq -d           # Only duplicates
sort file.txt | uniq -u           # Only unique lines

# tr - translate/delete characters
echo "Hello" | tr 'a-z' 'A-Z'            # HELLO
echo "Hello" | tr -d 'l'                  # Heo
echo "  extra   spaces  " | tr -s ' '    # Squeeze spaces
cat file.txt | tr '\\n' ','               # Newlines to commas
echo "abc123" | tr -cd '0-9'             # Keep only digits

# wc - word/line/char count
wc -l file.txt                    # Line count
wc -w file.txt                    # Word count
wc -c file.txt                    # Byte count
wc -m file.txt                    # Character count
find . -name "*.py" | wc -l      # Count Python files`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>head, tail &amp; xargs</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# head - first N lines
head file.txt                     # First 10 lines (default)
head -n 5 file.txt                # First 5 lines
head -n -3 file.txt               # All except last 3 lines
head -c 100 file.txt              # First 100 bytes

# tail - last N lines
tail file.txt                     # Last 10 lines (default)
tail -n 20 file.txt               # Last 20 lines
tail -n +5 file.txt               # From line 5 onward

# tail -f: follow log files in real-time
tail -f /var/log/syslog
tail -f app.log | grep --line-buffered "ERROR"
tail -F app.log                   # Follow even after rotation

# xargs - build commands from stdin
find . -name "*.tmp" | xargs rm
find . -name "*.txt" | xargs grep "pattern"

# xargs with placeholder
find . -name "*.sh" | xargs -I {} chmod +x {}
cat urls.txt | xargs -I {} curl -sL {}

# Parallel execution with xargs
find . -name "*.png" | xargs -P 4 -I {} convert {} -resize 50% {}

# Handle filenames with spaces
find . -name "*.log" -print0 | xargs -0 rm
ls | xargs -d '\\n' -I {} echo "File: {}"`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}

      {/* ==================== FILES & DIRS ==================== */}
      {activeSection === 'files-dirs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cardStyle}>
            <h2 style={h2Style}>find - Searching for Files</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Find by name
find /var/log -name "*.log"
find . -iname "readme*"           # Case-insensitive

# Find by type
find . -type f                    # Files only
find . -type d                    # Directories only
find . -type l                    # Symlinks only

# Find by size
find . -size +100M                # Larger than 100MB
find . -size -1k                  # Smaller than 1KB
find . -size 0                    # Empty files

# Find by time (days)
find . -mtime -7                  # Modified in last 7 days
find . -atime +30                 # Accessed more than 30 days ago
find . -newer reference.txt       # Newer than reference file

# Find by permissions
find . -perm 755                  # Exactly 755
find . -perm -u+x                # User execute bit set

# Execute command on results
find . -name "*.log" -exec gzip {} \\;
find . -name "*.tmp" -exec rm -f {} +
find . -type f -exec chmod 644 {} +

# Combine conditions
find . -type f -name "*.py" -size +1k -mtime -7
find . \\( -name "*.jpg" -o -name "*.png" \\) -type f

# Exclude directories
find . -path "./node_modules" -prune -o -name "*.js" -print
find . -not -path "*/.git/*" -name "*.java"`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>File Operations</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Copy
cp source.txt dest.txt
cp -r src_dir/ dest_dir/          # Recursive copy
cp -p file.txt backup.txt         # Preserve permissions/timestamps
cp -a src/ dest/                  # Archive mode (preserve everything)

# Move / Rename
mv old_name.txt new_name.txt
mv file.txt /new/location/
mv *.log /var/archive/

# Remove
rm file.txt
rm -f file.txt                    # Force (no prompt)
rm -r directory/                  # Recursive
rm -rf directory/                 # Force recursive (use carefully!)
rm -i *.txt                       # Interactive (prompt each)

# Directories
mkdir newdir
mkdir -p parent/child/grandchild  # Create parents as needed
rmdir empty_dir                   # Only removes empty dirs

# Symbolic and Hard links
ln -s /path/to/target link_name   # Symbolic (soft) link
ln /path/to/target hard_link      # Hard link
readlink -f symlink               # Resolve symlink to absolute path

# Touch - create or update timestamps
touch newfile.txt
touch -t 202601011200 file.txt    # Set specific timestamp`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Permissions: chmod, chown, umask</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# chmod - numeric mode (Owner/Group/Others)
# 4=read(r)  2=write(w)  1=execute(x)
chmod 755 script.sh       # rwxr-xr-x
chmod 644 file.txt        # rw-r--r--
chmod 600 secrets.env     # rw-------
chmod 700 private_dir/    # rwx------

# chmod - symbolic mode
chmod u+x script.sh       # Add execute for user
chmod g-w file.txt         # Remove write for group
chmod o-rwx file.txt       # Remove all for others
chmod a+r file.txt         # Add read for all
chmod u=rwx,g=rx,o= dir/  # Set exact permissions

# Recursive
chmod -R 755 directory/
chmod -R u+rw,go-w directory/

# chown - change owner
chown alice file.txt
chown alice:developers file.txt   # Owner and group
chown -R www-data:www-data /var/www/

# chgrp - change group
chgrp developers project/

# umask - default permission mask
umask                      # Show current mask
umask 022                  # New files: 644, dirs: 755
umask 077                  # New files: 600, dirs: 700

# View permissions
ls -la file.txt
stat file.txt`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>File Testing in Scripts</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`#!/bin/bash
FILE="/var/log/app.log"

# Existence and type tests
[[ -e "$FILE" ]] && echo "Exists"
[[ -f "$FILE" ]] && echo "Is a regular file"
[[ -d "$FILE" ]] && echo "Is a directory"
[[ -L "$FILE" ]] && echo "Is a symbolic link"
[[ -p "$FILE" ]] && echo "Is a named pipe"
[[ -S "$FILE" ]] && echo "Is a socket"

# Permission tests
[[ -r "$FILE" ]] && echo "Is readable"
[[ -w "$FILE" ]] && echo "Is writable"
[[ -x "$FILE" ]] && echo "Is executable"

# Size tests
[[ -s "$FILE" ]] && echo "Is non-empty (size > 0)"

# Comparison tests
[[ "$FILE1" -nt "$FILE2" ]] && echo "FILE1 is newer than FILE2"
[[ "$FILE1" -ot "$FILE2" ]] && echo "FILE1 is older than FILE2"
[[ "$FILE1" -ef "$FILE2" ]] && echo "Same inode (hard link)"

# Practical guard pattern
safe_process() {
    local file="$1"
    [[ -f "$file" ]] || { echo "Not a file: $file" >&2; return 1; }
    [[ -r "$file" ]] || { echo "Not readable: $file" >&2; return 1; }
    [[ -s "$file" ]] || { echo "File is empty: $file" >&2; return 1; }
    echo "Processing $file..."
}`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Disk Usage &amp; Archiving</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# du - disk usage
du -sh /var/log             # Summary, human-readable
du -sh *                    # Each item in current dir
du -sh * | sort -rh         # Sort by size descending
du -h --max-depth=1 /home   # One level deep

# df - disk free space
df -h                        # All filesystems, human-readable
df -h /                      # Specific mount point
df -i                        # Inode usage

# tar - archive
tar czf archive.tar.gz dir/           # Create gzipped tar
tar cjf archive.tar.bz2 dir/          # Create bzip2 tar
tar xzf archive.tar.gz                # Extract gzipped tar
tar xzf archive.tar.gz -C /dest/      # Extract to directory
tar tzf archive.tar.gz                # List contents
tar xzf archive.tar.gz file.txt       # Extract single file

# gzip / gunzip
gzip file.txt               # Compress (replaces original)
gzip -k file.txt            # Keep original
gunzip file.txt.gz          # Decompress
zcat file.txt.gz            # View without decompressing

# zip / unzip
zip -r archive.zip directory/
zip archive.zip file1.txt file2.txt
unzip archive.zip
unzip archive.zip -d /destination/
unzip -l archive.zip        # List contents`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}

      {/* ==================== PIPES & REDIRECTION ==================== */}
      {activeSection === 'pipes-redirection' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cardStyle}>
            <h2 style={h2Style}>Standard Streams &amp; Output Redirection</h2>
            <p style={pStyle}>
              Unix has three standard streams: stdin (0), stdout (1), and stderr (2). Redirection controls where these streams go.
            </p>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Standard streams
# 0 = stdin  (input)
# 1 = stdout (normal output)
# 2 = stderr (error output)

# Output redirection
echo "hello" > file.txt          # Overwrite file (stdout)
echo "hello" >> file.txt         # Append to file (stdout)

# Error redirection
ls /nonexistent 2> errors.log    # Redirect stderr to file
ls /nonexistent 2>> errors.log   # Append stderr to file

# Redirect both stdout and stderr
command > output.log 2>&1        # Traditional: stderr to stdout
command &> output.log            # Bash shorthand: both to file
command &>> output.log           # Append both to file

# Discard output
command > /dev/null              # Discard stdout
command 2> /dev/null             # Discard stderr
command &> /dev/null             # Discard both

# Separate stdout and stderr
command > stdout.log 2> stderr.log

# Redirect stderr to stdout (for piping errors)
command 2>&1 | grep "error"`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Input Redirection &amp; Heredocs</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Input redirection
sort < unsorted.txt
wc -l < file.txt

# Heredoc - multi-line input (<<DELIMITER)
cat <<EOF
Hello, $USER!
Today is $(date).
Your home is $HOME.
EOF

# Heredoc with no variable expansion (quote the delimiter)
cat <<'EOF'
This is literal: $USER $(date)
No expansion happens here.
EOF

# Heredoc to a file
cat > config.yaml <<EOF
server:
  port: 8080
  host: localhost
database:
  url: jdbc:postgres://localhost/mydb
EOF

# Heredoc with indentation stripping (<<-)
if true; then
    cat <<-EOF
	This ignores leading tabs
	But not spaces
	EOF
fi

# Herestring (<<<) - single-line input
grep "error" <<< "This has an error in it"
read -r first last <<< "John Doe"
bc <<< "scale=2; 22/7"`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Pipes &amp; tee</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Pipes connect stdout of one command to stdin of next
ls -la | grep ".txt"
cat access.log | sort | uniq -c | sort -rn | head -10

# Multi-step pipeline
ps aux | awk '{print $11}' | sort | uniq -c | sort -rn | head

# tee - write to file AND stdout
echo "log message" | tee output.log
echo "log message" | tee -a output.log   # Append mode

# tee in a pipeline (inspect intermediate data)
cat data.csv | tee raw_data.log | sort | tee sorted_data.log | head

# Write to multiple files
echo "broadcast" | tee file1.txt file2.txt file3.txt

# tee with sudo (writing to protected files)
echo "new config" | sudo tee /etc/myconfig.conf > /dev/null

# PIPESTATUS - check exit codes of each pipe stage
false | true | false
echo "\${PIPESTATUS[@]}"     # 1 0 1

# set -o pipefail - fail if any pipe stage fails
set -o pipefail
false | true   # Now $? is 1 (not 0)`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Process Substitution &amp; Named Pipes</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Process substitution: <() and >()
# Treat command output as a file

# Compare two command outputs with diff
diff <(ls dir1/) <(ls dir2/)
diff <(sort file1.txt) <(sort file2.txt)

# Feed multiple inputs to a command
paste <(cut -f1 file.txt) <(cut -f3 file.txt)

# While loop without subshell (avoids variable scoping issue)
count=0
while IFS= read -r line; do
    (( count++ ))
done < <(grep "error" app.log)
echo "Found $count errors"    # Variable persists!

# Named pipes (FIFO) - inter-process communication
mkfifo /tmp/mypipe

# Terminal 1: writer
echo "Hello from writer" > /tmp/mypipe

# Terminal 2: reader
cat < /tmp/mypipe    # Receives: Hello from writer

# Cleanup
rm /tmp/mypipe

# Practical: producer/consumer with named pipe
mkfifo /tmp/logpipe
tail -f /var/log/syslog > /tmp/logpipe &
grep --line-buffered "error" < /tmp/logpipe`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}

      {/* ==================== PROCESS MANAGEMENT ==================== */}
      {activeSection === 'process-mgmt' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cardStyle}>
            <h2 style={h2Style}>Viewing &amp; Killing Processes</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# ps - process status
ps aux                            # All processes (BSD style)
ps -ef                            # All processes (System V style)
ps aux | grep nginx               # Find specific process
ps -u alice                       # Processes by user
ps -p 1234                        # Specific PID
ps --forest                       # Process tree

# top / htop
top                               # Interactive process viewer
top -b -n 1                       # Batch mode (single snapshot)
htop                              # Enhanced interactive viewer

# kill - send signal to process
kill 1234                         # SIGTERM (graceful shutdown)
kill -9 1234                      # SIGKILL (force kill)
kill -15 1234                     # SIGTERM (explicit)
kill -HUP 1234                    # SIGHUP (reload config)

# killall - kill by name
killall nginx
killall -9 python3

# pkill - kill by pattern
pkill -f "python app.py"          # Match full command line
pkill -u alice                    # All processes by user

# pgrep - find PIDs by pattern
pgrep nginx                       # PIDs of nginx processes
pgrep -la python                  # PIDs and command lines`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Background Processes &amp; Job Control</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Run command in background
long_running_task &
echo "Task PID: $!"

# jobs - list background jobs
jobs                              # List all jobs
jobs -l                           # With PIDs

# fg / bg - foreground / background
fg %1                             # Bring job 1 to foreground
bg %1                             # Resume job 1 in background

# Ctrl+Z - suspend current process, then bg to continue

# nohup - survive terminal close
nohup ./server.sh &
nohup ./server.sh > /dev/null 2>&1 &

# disown - detach job from shell
./long_task.sh &
disown %1                         # Won't be killed on shell exit
disown -a                         # Disown all jobs

# wait - wait for background processes
PID1=$!
./task2.sh &
PID2=$!
wait $PID1 $PID2                  # Wait for both
echo "Both tasks complete"

# Wait for all background jobs
for i in {1..5}; do
    process_item "$i" &
done
wait
echo "All items processed"`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Signals &amp; trap</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Common signals
# SIGTERM (15) - Graceful termination (default for kill)
# SIGINT  (2)  - Interrupt (Ctrl+C)
# SIGHUP  (1)  - Terminal hangup / reload config
# SIGKILL (9)  - Force kill (cannot be caught!)
# SIGUSR1 (10) - User-defined signal 1
# SIGUSR2 (12) - User-defined signal 2
# SIGSTOP       - Pause process (cannot be caught!)
# SIGCONT       - Resume paused process

# trap - catch signals and run cleanup
cleanup() {
    echo "Cleaning up temp files..."
    rm -f /tmp/myapp_*.tmp
    exit 0
}
trap cleanup EXIT SIGINT SIGTERM

# trap for temporary files (common pattern)
TMPFILE=$(mktemp)
trap 'rm -f "$TMPFILE"' EXIT
echo "data" > "$TMPFILE"
# TMPFILE is auto-deleted when script exits

# Ignore a signal
trap '' SIGINT    # Ctrl+C is now ignored

# Reset trap to default
trap - SIGINT

# Trap for debugging
trap 'echo "Line $LINENO: \$?=$?"' DEBUG

# Trap ERR (any command failure)
trap 'echo "Error on line $LINENO" >&2' ERR

# List all traps
trap -p`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Cron &amp; systemctl</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Crontab syntax:
# MIN  HOUR  DOM  MON  DOW  COMMAND
# 0-59 0-23  1-31 1-12 0-7
#                            (0 and 7 = Sunday)

# Edit crontab
crontab -e
crontab -l                   # List current crontab

# Examples
# Every day at 2:30 AM
30 2 * * * /home/user/backup.sh

# Every 15 minutes
*/15 * * * * /usr/local/bin/healthcheck.sh

# Every Monday at 9 AM
0 9 * * 1 /home/user/weekly_report.sh

# First day of every month at midnight
0 0 1 * * /home/user/monthly_cleanup.sh

# Every weekday at 8 PM
0 20 * * 1-5 /home/user/weekday_task.sh

# Redirect cron output
0 2 * * * /home/user/backup.sh >> /var/log/backup.log 2>&1

# systemctl basics
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
sudo systemctl reload nginx        # Reload config without restart
sudo systemctl status nginx
sudo systemctl enable nginx        # Start on boot
sudo systemctl disable nginx       # Don't start on boot
sudo systemctl is-active nginx
systemctl list-units --type=service`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}

      {/* ==================== NETWORKING ==================== */}
      {activeSection === 'networking' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cardStyle}>
            <h2 style={h2Style}>curl - HTTP Requests</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# GET request
curl https://api.example.com/users
curl -s https://api.example.com/users           # Silent (no progress)
curl -sL https://example.com                    # Follow redirects

# GET with headers
curl -H "Authorization: Bearer TOKEN" \\
     -H "Accept: application/json" \\
     https://api.example.com/users

# POST with JSON body
curl -X POST https://api.example.com/users \\
     -H "Content-Type: application/json" \\
     -d '{"name": "Alice", "email": "alice@example.com"}'

# POST form data
curl -X POST https://example.com/login \\
     -d "username=alice&password=secret"

# PUT and DELETE
curl -X PUT https://api.example.com/users/1 \\
     -H "Content-Type: application/json" \\
     -d '{"name": "Alice Updated"}'
curl -X DELETE https://api.example.com/users/1

# Download file
curl -o output.zip https://example.com/file.zip
curl -O https://example.com/file.zip       # Keep original name

# Show response headers
curl -I https://example.com                # Headers only
curl -i https://example.com                # Headers + body

# Basic auth
curl -u user:password https://api.example.com/protected

# Verbose output (debugging)
curl -v https://example.com

# Timeout
curl --connect-timeout 5 --max-time 30 https://api.example.com`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>wget, ssh, scp &amp; rsync</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# wget - download files
wget https://example.com/file.tar.gz
wget -O custom_name.tar.gz https://example.com/file.tar.gz
wget -q https://example.com/file.tar.gz     # Quiet mode
wget -c https://example.com/large.iso        # Resume download
wget --mirror --convert-links https://example.com  # Mirror site

# ssh - secure shell
ssh user@hostname
ssh -p 2222 user@hostname                    # Custom port
ssh -i ~/.ssh/mykey.pem user@hostname        # Private key
ssh user@host "ls -la /var/log"              # Run remote command
ssh -L 8080:localhost:3000 user@host         # Local port forward
ssh -R 9090:localhost:8080 user@host         # Remote port forward

# scp - secure copy
scp file.txt user@host:/remote/path/
scp user@host:/remote/file.txt ./local/
scp -r local_dir/ user@host:/remote/dir/     # Recursive
scp -P 2222 file.txt user@host:/path/        # Custom port

# rsync - efficient file sync
rsync -avz src/ user@host:/dest/             # Archive, verbose, compress
rsync -avz --delete src/ dest/               # Mirror (delete extras)
rsync -avz --exclude='*.log' src/ dest/      # Exclude patterns
rsync -avz --dry-run src/ dest/              # Preview changes
rsync -avzP large_file user@host:/dest/      # Progress + partial`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Port Checking &amp; DNS</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# ss - socket statistics (modern replacement for netstat)
ss -tlnp                         # TCP listening, numeric, processes
ss -ulnp                         # UDP listening
ss -s                            # Summary statistics
ss -t state established          # Established TCP connections

# netstat (legacy but still common)
netstat -tlnp                    # TCP listening, numeric, processes
netstat -an | grep :8080         # Check specific port

# lsof - list open files / ports
lsof -i :8080                    # What's using port 8080
lsof -i TCP                      # All TCP connections
lsof -u alice                    # Files opened by user

# ping
ping -c 4 google.com             # 4 pings then stop
ping -c 1 -W 3 server.local     # Timeout after 3s

# traceroute
traceroute google.com

# DNS lookup
dig example.com                  # Full DNS query
dig +short example.com           # Just the IP
dig MX example.com               # Mail server records
dig @8.8.8.8 example.com        # Use specific DNS server

nslookup example.com             # Interactive DNS lookup

# nc (netcat) - network swiss army knife
nc -zv hostname 80               # Check if port 80 is open
nc -zv hostname 20-30            # Scan port range
nc -l 8080                       # Listen on port (simple server)
echo "hello" | nc hostname 8080  # Send data to port`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SCRIPTING PATTERNS ==================== */}
      {activeSection === 'scripting-patterns' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cardStyle}>
            <h2 style={h2Style}>Script Template with Error Handling</h2>
            <p style={pStyle}>
              Start every production script with <code style={{ color: '#6ee7b7' }}>set -euo pipefail</code> for robust error handling.
            </p>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`#!/bin/bash
set -euo pipefail
# -e: Exit on any command failure
# -u: Treat unset variables as errors
# -o pipefail: Pipe fails if any command in pipe fails

# Constants
readonly SCRIPT_NAME="$(basename "$0")"
readonly SCRIPT_DIR="$(cd "$(dirname "\${BASH_SOURCE[0]}")" && pwd)"
readonly LOG_FILE="/var/log/\${SCRIPT_NAME%.sh}.log"

# Logging functions
log()   { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"; }
info()  { log "INFO  $*"; }
warn()  { log "WARN  $*" >&2; }
error() { log "ERROR $*" >&2; }
die()   { error "$*"; exit 1; }

# Cleanup on exit
cleanup() {
    local exit_code=$?
    rm -f "\${TMPFILES[@]:-}"
    if (( exit_code != 0 )); then
        error "Script failed with exit code $exit_code"
    fi
    exit $exit_code
}
trap cleanup EXIT

# Temp file management
TMPFILES=()
make_temp() {
    local tmp
    tmp=$(mktemp)
    TMPFILES+=("$tmp")
    echo "$tmp"
}

# Main function
main() {
    info "Starting $SCRIPT_NAME"
    local tmpfile
    tmpfile=$(make_temp)
    # ... your logic here ...
    info "Completed successfully"
}

main "$@"`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Argument Parsing with getopts</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`#!/bin/bash
set -euo pipefail

usage() {
    cat <<EOF
Usage: $0 [OPTIONS] <input_file>

Options:
    -o FILE    Output file (default: stdout)
    -n NUM     Number of lines (default: 10)
    -v         Verbose mode
    -d         Dry run
    -h         Show this help

Example:
    $0 -v -n 20 -o output.txt input.txt
EOF
    exit 1
}

# Defaults
OUTPUT="/dev/stdout"
NUM_LINES=10
VERBOSE=false
DRY_RUN=false

# Parse options
while getopts ":o:n:vdh" opt; do
    case "$opt" in
        o) OUTPUT="$OPTARG" ;;
        n) NUM_LINES="$OPTARG" ;;
        v) VERBOSE=true ;;
        d) DRY_RUN=true ;;
        h) usage ;;
        :) echo "Error: -$OPTARG requires an argument" >&2; usage ;;
        ?) echo "Error: Unknown option -$OPTARG" >&2; usage ;;
    esac
done
shift $((OPTIND - 1))

# Remaining positional arguments
INPUT_FILE="\${1:?'Error: input file required'}"

$VERBOSE && echo "Processing $INPUT_FILE -> $OUTPUT ($NUM_LINES lines)"

if $DRY_RUN; then
    echo "[DRY RUN] Would process $INPUT_FILE"
else
    head -n "$NUM_LINES" "$INPUT_FILE" > "$OUTPUT"
fi`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Logging Functions with Colors</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`#!/bin/bash
# Color codes
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
BLUE='\\033[0;34m'
CYAN='\\033[0;36m'
NC='\\033[0m'  # No Color
BOLD='\\033[1m'

# Detect if stdout is a terminal (skip colors for file output)
if [[ -t 1 ]]; then
    USE_COLOR=true
else
    USE_COLOR=false
    RED=''; GREEN=''; YELLOW=''; BLUE=''; CYAN=''; NC=''; BOLD=''
fi

timestamp() { date '+%Y-%m-%d %H:%M:%S'; }

log_info()  { echo -e "\${GREEN}[INFO ]\${NC} $(timestamp) $*"; }
log_warn()  { echo -e "\${YELLOW}[WARN ]\${NC} $(timestamp) $*" >&2; }
log_error() { echo -e "\${RED}[ERROR]\${NC} $(timestamp) $*" >&2; }
log_debug() { $VERBOSE && echo -e "\${CYAN}[DEBUG]\${NC} $(timestamp) $*"; }

# Formatted section headers
log_section() {
    echo ""
    echo -e "\${BOLD}\${BLUE}=== $* ===\${NC}"
    echo ""
}

# Usage
log_section "Deployment Starting"
log_info "Deploying version 1.2.3"
log_debug "Connecting to server..."
log_warn "Disk usage is at 85%"
log_error "Failed to connect to database"`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Config File Parsing</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`#!/bin/bash
# Parse a key=value config file

CONFIG_FILE="\${1:-config.env}"

# Simple parser (key=value, skip comments and blanks)
load_config() {
    local file="$1"
    [[ -f "$file" ]] || { echo "Config not found: $file" >&2; return 1; }

    while IFS='=' read -r key value; do
        # Skip empty lines and comments
        [[ -z "$key" || "$key" =~ ^[[:space:]]*# ]] && continue
        # Trim whitespace
        key=$(echo "$key" | xargs)
        value=$(echo "$value" | xargs)
        # Remove surrounding quotes from value
        value="\${value%\\"}" ; value="\${value#\\"}"
        value="\${value%\\'}" ; value="\${value#\\'}"
        # Export as environment variable
        export "$key=$value"
    done < "$file"
}

load_config "$CONFIG_FILE"
echo "DB_HOST=$DB_HOST DB_PORT=$DB_PORT"

# INI-style config parser (with sections)
parse_ini() {
    local file="$1" section=""
    while IFS='=' read -r key value; do
        key=$(echo "$key" | xargs)
        [[ -z "$key" || "$key" =~ ^[;#] ]] && continue
        if [[ "$key" =~ ^\\[(.+)\\]$ ]]; then
            section="\${BASH_REMATCH[1]}_"
        else
            value=$(echo "$value" | xargs)
            export "\${section}\${key}=$value"
        fi
    done < "$file"
}
# config.ini:  [database] \\n host=localhost  => database_host=localhost`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Lock Files &amp; Temp File Handling</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`#!/bin/bash
set -euo pipefail

# ============ Lock File (prevent concurrent execution) ============
LOCK_FILE="/tmp/myscript.lock"

acquire_lock() {
    if ! mkdir "$LOCK_FILE" 2>/dev/null; then
        local pid
        pid=$(cat "$LOCK_FILE/pid" 2>/dev/null || echo "unknown")
        echo "Script already running (PID: $pid)" >&2
        exit 1
    fi
    echo $$ > "$LOCK_FILE/pid"
    trap 'rm -rf "$LOCK_FILE"' EXIT
}

acquire_lock
echo "Running with lock (PID: $$)"

# Alternative: flock (advisory locking)
# exec 200>/tmp/myscript.flock
# flock -n 200 || { echo "Already running"; exit 1; }

# ============ Safe Temp Files ============
# Create temp file (auto-cleaned on exit)
TMPDIR=$(mktemp -d)
trap 'rm -rf "$TMPDIR"' EXIT

TMPFILE="$TMPDIR/data.tmp"
echo "temporary data" > "$TMPFILE"

# Or use mktemp directly
SINGLE_TMP=$(mktemp /tmp/myscript.XXXXXX)
trap 'rm -f "$SINGLE_TMP"' EXIT

# Named temp file with specific extension
TMPJSON=$(mktemp --suffix=.json)
echo '{"status": "ok"}' > "$TMPJSON"`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Progress Bars &amp; Spinners</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`#!/bin/bash

# Simple progress bar
progress_bar() {
    local current=$1 total=$2 width=50
    local percent=$(( current * 100 / total ))
    local filled=$(( current * width / total ))
    local empty=$(( width - filled ))

    printf "\\r["
    printf "%\${filled}s" '' | tr ' ' '#'
    printf "%\${empty}s" '' | tr ' ' '-'
    printf "] %3d%% (%d/%d)" "$percent" "$current" "$total"
}

# Usage
TOTAL=100
for i in $(seq 1 $TOTAL); do
    progress_bar "$i" "$TOTAL"
    sleep 0.05
done
echo ""

# Spinner for indeterminate tasks
spinner() {
    local pid=$1
    local chars='|/-\\'
    local i=0
    while kill -0 "$pid" 2>/dev/null; do
        printf "\\r  %s Working..." "\${chars:i++%4:1}"
        sleep 0.1
    done
    printf "\\r  Done!          \\n"
}

# Usage
long_running_command &
spinner $!

# Countdown timer
countdown() {
    local secs=$1
    while (( secs > 0 )); do
        printf "\\rStarting in %d seconds..." "$secs"
        sleep 1
        (( secs-- ))
    done
    printf "\\rStarting now!            \\n"
}
countdown 5`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}

      {/* ==================== ONE-LINERS ==================== */}
      {activeSection === 'one-liners' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={cardStyle}>
            <h2 style={h2Style}>Find &amp; Replace in Multiple Files</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Find and replace string across files
find . -name "*.py" -exec sed -i 's/old_func/new_func/g' {} +
grep -rl "old_text" src/ | xargs sed -i 's/old_text/new_text/g'

# Find largest files
du -ah . | sort -rh | head -20
find . -type f -exec du -h {} + | sort -rh | head -20
find / -type f -size +100M -exec ls -lh {} \\; 2>/dev/null

# Find recently modified files
find . -type f -mmin -60                    # Modified in last hour
find . -type f -mtime -1 -name "*.log"     # Modified today

# Count lines of code (excluding blanks/comments)
find . -name "*.java" | xargs cat | grep -v "^$" | grep -v "^//" | wc -l
find . -name "*.py" -exec cat {} + | wc -l`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Log Monitoring &amp; Process Management</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Monitor log file for pattern (real-time)
tail -f /var/log/syslog | grep --line-buffered "ERROR"
tail -f app.log | awk '/ERROR/ {print "\\033[31m"$0"\\033[0m"; next} {print}'

# Kill process by port
kill $(lsof -t -i:8080)
fuser -k 8080/tcp

# Find what process is using a port
lsof -i :3000
ss -tlnp | grep :3000

# Watch command output repeatedly
watch -n 2 "df -h"                 # Every 2 seconds
watch -d "ps aux | head -20"       # Highlight differences

# Memory usage of a specific process
ps -o pid,rss,vsz,comm -p $(pgrep nginx)

# Top 10 memory-consuming processes
ps aux --sort=-%mem | head -11`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Batch File Operations</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Batch rename files
# Rename *.txt to *.md
for f in *.txt; do mv "$f" "\${f%.txt}.md"; done

# Add prefix to all files
for f in *.jpg; do mv "$f" "photo_$f"; done

# Replace spaces with underscores
for f in *\\ *; do mv "$f" "\${f// /_}"; done

# Rename with rename command (Perl-based)
rename 's/\\.jpeg$/.jpg/' *.jpeg
rename 'y/A-Z/a-z/' *               # Lowercase all filenames

# Bulk convert images (requires ImageMagick)
for f in *.png; do convert "$f" "\${f%.png}.jpg"; done

# Create numbered backups
for f in *.conf; do cp "$f" "$f.$(date +%Y%m%d).bak"; done

# Remove files older than 30 days
find /tmp -type f -mtime +30 -delete
find /var/log -name "*.log.gz" -mtime +90 -delete`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>CSV &amp; JSON Processing</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# CSV processing
# Print second column
awk -F',' '{print $2}' data.csv

# Filter rows where column 3 > 100
awk -F',' '$3 > 100' data.csv

# Sum a CSV column
awk -F',' '{sum += $3} END {print sum}' data.csv

# Convert CSV to TSV
sed 's/,/\\t/g' data.csv

# Skip header row
tail -n +2 data.csv | awk -F',' '{print $1, $2}'

# JSON processing with jq
# Pretty print
echo '{"name":"Alice","age":30}' | jq '.'

# Extract field
curl -s https://api.example.com/users | jq '.data[].name'
cat data.json | jq '.users[] | {name: .name, email: .email}'

# Filter array
jq '.items[] | select(.price > 10)' products.json

# Transform data
jq '[.users[] | {id: .id, upper_name: (.name | ascii_upcase)}]' data.json

# Count items
jq '.items | length' data.json

# Create JSON from shell variables
jq -n --arg name "$USER" --arg host "$(hostname)" \\
  '{user: $name, host: $host, time: now | todate}'`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>Git &amp; Docker Shortcuts</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# Git: find large files in history
git rev-list --objects --all | \\
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \\
  awk '/^blob/ {print $3, $4}' | sort -rn | head -20

# Git: delete merged branches
git branch --merged main | grep -v "main" | xargs git branch -d

# Git: find commits by message pattern
git log --oneline --all --grep="fix"

# Git: show files changed in last N commits
git diff --name-only HEAD~5

# Git: undo last commit (keep changes)
git reset --soft HEAD~1

# Git: interactive search through commit diffs
git log -p -S "function_name" -- "*.py"

# Docker: remove all stopped containers
docker container prune -f

# Docker: remove dangling images
docker image prune -f

# Docker: remove all unused resources
docker system prune -af --volumes

# Docker: show disk usage
docker system df

# Docker: follow container logs
docker logs -f --tail 100 container_name

# Docker: exec into running container
docker exec -it container_name /bin/bash

# Docker: list containers with custom format
docker ps --format "table {{.Names}}\\t{{.Status}}\\t{{.Ports}}"`}
              </SyntaxHighlighter>
            </div>
          </div>

          <div style={cardStyle}>
            <h2 style={h2Style}>System Info Gathering</h2>
            <div style={codeStyle}>
              <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ margin: 0, padding: 0, background: 'transparent' }}>
{`# System overview
uname -a                          # Kernel info
hostname                          # Hostname
uptime                            # Uptime and load averages
cat /etc/os-release               # OS distribution info

# CPU info
nproc                             # Number of processors
lscpu                             # Detailed CPU info
cat /proc/cpuinfo | grep "model name" | head -1

# Memory info
free -h                           # Human-readable memory
cat /proc/meminfo | head -5

# Disk info
lsblk                             # Block devices
fdisk -l                          # Partition table
df -hT                            # Filesystem types and usage

# Network info
ip addr show                      # IP addresses
ip route show                     # Routing table
cat /etc/resolv.conf              # DNS servers

# Quick system report one-liner
echo "=== $(hostname) ===" && \\
echo "OS: $(cat /etc/os-release | grep PRETTY_NAME | cut -d= -f2)" && \\
echo "Kernel: $(uname -r)" && \\
echo "CPU: $(nproc) cores" && \\
echo "RAM: $(free -h | awk '/Mem:/ {print $2}')" && \\
echo "Disk: $(df -h / | awk 'NR==2 {print $3 "/" $2 " (" $5 " used)"}')" && \\
echo "Uptime: $(uptime -p 2>/dev/null || uptime)" && \\
echo "Load: $(cat /proc/loadavg | awk '{print $1, $2, $3}')" && \\
echo "IPs: $(hostname -I 2>/dev/null || ip -4 addr show | grep inet | awk '{print $2}')"`}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  )
}

export default ShellScripting
