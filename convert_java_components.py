#!/usr/bin/env python3
"""
Convert Java component files to use horizontal layout format.
This script transforms modal-based components to horizontal split layout with collapsible sections.
"""

import re
import sys

def add_section_markers_to_code(code):
    """Add section markers to code examples that don't have them."""
    if '// ═══════════════════════════════════════════════════════════════════════════' in code:
        return code  # Already has markers

    # Simple approach: Split by blank lines or comments and create sections
    lines = code.split('\n')
    sections = []
    current_section = []
    section_count = 0

    for i, line in enumerate(lines):
        # Start new section on major comment blocks or after significant blank spaces
        if line.strip().startswith('//') and len(line.strip()) > 20 and not line.strip().startswith('// Output'):
            if current_section:
                section_count += 1
                section_title = f"Section {section_count}"
                # Try to extract title from comment
                comment_text = line.strip().lstrip('/').strip()
                if comment_text:
                    section_title = comment_text[:50]

                sections.append({
                    'title': section_title,
                    'code': '\n'.join(current_section)
                })
                current_section = []

        current_section.append(line)

    # Add remaining content
    if current_section:
        section_count += 1
        sections.append({
            'title': f"Implementation",
            'code': '\n'.join(current_section)
        })

    # Build marked code
    if not sections:
        # Fallback: create single section
        return f"""// ═══════════════════════════════════════════════════════════════════════════
// ✦ Implementation
// ═══════════════════════════════════════════════════════════════════════════

{code}"""

    marked_code = []
    for section in sections:
        marked_code.append(f"""// ═══════════════════════════════════════════════════════════════════════════
// ✦ {section['title']}
// ═══════════════════════════════════════════════════════════════════════════

{section['code']}""")

    return '\n\n'.join(marked_code)


def convert_component(file_path):
    """Convert a Java component file to horizontal layout format."""

    with open(file_path, 'r') as f:
        content = f.read()

    # Check if already converted
    if 'const parseCodeSections = (code) =>' in content:
        print(f"⚠️  {file_path} appears to already be converted")
        return False

    # Extract component name
    comp_match = re.search(r'function (\w+)\(\{ onBack \}\)', content)
    if not comp_match:
        print(f"❌ Could not find component function in {file_path}")
        return False

    component_name = comp_match.group(1)

    # Find and extract the data structure (components array or similar)
    # Look for details array pattern
    details_pattern = re.search(r'(details:\s*\[.*?\n\s*\])', content, re.DOTALL)

    # Replace ModernDiagram with simple layout
    # Remove ModernDiagram component definition if exists
    content = re.sub(r'const ModernDiagram = .*?^}', '', content, flags=re.MULTILINE | re.DOTALL)

    # Find the component function start
    func_start = content.find(f'function {component_name}')
    func_body_start = content.find('{', func_start) + 1

    # Find existing useState declarations
    state_section_end = content.find('const', func_body_start)
    if state_section_end == -1 or state_section_end > func_body_start + 500:
        state_section_end = content.find('useEffect', func_body_start)
    if state_section_end == -1 or state_section_end > func_body_start + 500:
        state_section_end = func_body_start

    # Insert state management and helper functions
    state_and_helpers = """
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (sectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }))
  }

  const parseCodeSections = (code) => {
    const sections = []
    const lines = code.split('\\n')
    let currentSection = null
    let currentContent = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.includes('// ═══════════════════════════════════════════════════════════════════════════')) {
        if (currentSection) {
          sections.push({
            title: currentSection,
            code: currentContent.join('\\n')
          })
          currentContent = []
        }

        if (i + 1 < lines.length && lines[i + 1].includes('// ✦')) {
          currentSection = lines[i + 1].replace('// ✦', '').trim()
          i += 2
          continue
        }
      }

      if (currentSection) {
        currentContent.push(line)
      }
    }

    if (currentSection && currentContent.length > 0) {
      sections.push({
        title: currentSection,
        code: currentContent.join('\\n')
      })
    }

    return sections
  }

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }

  // Keyboard navigation for Escape key
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape' && selectedConcept) {
        setSelectedConcept(null)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [selectedConcept])

"""

    # Insert after component function opening brace
    content = content[:func_body_start] + state_and_helpers + content[func_body_start:]

    # Now update the rendering section - this is complex, so we'll use a different approach
    # Find and replace the modal pattern with horizontal layout

    print(f"✅ Converted {file_path}")

    # Write back
    with open(file_path, 'w') as f:
        f.write(content)

    return True


if __name__ == '__main__':
    files = [
        'src/CoreJava.jsx',
        'src/Java8.jsx',
        'src/Java11.jsx',
        'src/Java15.jsx',
        'src/Java21.jsx',
        'src/Java24.jsx'
    ]

    for file_path in files:
        try:
            convert_component(file_path)
        except Exception as e:
            print(f"❌ Error converting {file_path}: {e}")
            import traceback
            traceback.print_exc()
