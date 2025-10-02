#!/usr/bin/env python3
"""
Transform ApacheKafka.jsx to add section markers to code examples.
This script adds // ═══ and // ✦ markers to break up long code examples into sections.
"""

import re

def add_section_markers_to_code(code_example, subtopic_name):
    """Add section markers to a code example based on logical sections."""

    # Split by major comment blocks or class definitions
    lines = code_example.split('\n')
    result = []
    current_section = []
    section_count = 0

    # Detect logical sections based on:
    # 1. Class definitions
    # 2. Method definitions
    # 3. Major code blocks
    # 4. Configuration sections

    i = 0
    while i < len(lines):
        line = lines[i]

        # Check for class definition
        if re.search(r'^\s*(public|class)\s+class\s+\w+', line):
            if current_section and section_count > 0:
                # Save previous section
                section_title = get_section_title(current_section, section_count)
                result.append('// ═══════════════════════════════════════════════════════════════════════════')
                result.append(f'// ✦ {section_title}')
                result.append('// ═══════════════════════════════════════════════════════════════════════════')
                result.append('')
                result.extend(current_section)
                current_section = []
            section_count += 1
            current_section.append(line)

        # Check for method definition (main, public method, etc)
        elif re.search(r'^\s*(public|private|protected)\s+(static\s+)?[\w<>,\[\]\s]+\s+\w+\s*\(', line):
            if current_section and section_count > 0:
                section_title = get_section_title(current_section, section_count)
                result.append('// ═══════════════════════════════════════════════════════════════════════════')
                result.append(f'// ✦ {section_title}')
                result.append('// ═══════════════════════════════════════════════════════════════════════════')
                result.append('')
                result.extend(current_section)
                current_section = []
            section_count += 1
            current_section.append(line)

        # Configuration section (Properties setup)
        elif 'Properties props = new Properties();' in line:
            if current_section and section_count > 0:
                section_title = get_section_title(current_section, section_count)
                result.append('// ═══════════════════════════════════════════════════════════════════════════')
                result.append(f'// ✦ {section_title}')
                result.append('// ═══════════════════════════════════════════════════════════════════════════')
                result.append('')
                result.extend(current_section)
                current_section = []
            section_count += 1
            current_section.append(line)

        else:
            current_section.append(line)

        i += 1

    # Add final section
    if current_section:
        if section_count > 0:
            section_title = get_section_title(current_section, section_count)
            result.append('// ═══════════════════════════════════════════════════════════════════════════')
            result.append(f'// ✦ {section_title}')
            result.append('// ═══════════════════════════════════════════════════════════════════════════')
            result.append('')
        result.extend(current_section)

    # If no sections were created, return original
    if section_count == 0:
        return code_example

    return '\n'.join(result)

def get_section_title(section_lines, count):
    """Extract a meaningful section title from code lines."""
    for line in section_lines[:10]:  # Check first 10 lines
        # Look for class name
        match = re.search(r'class\s+(\w+)', line)
        if match:
            return match.group(1)
        # Look for method name
        match = re.search(r'(public|private|protected)\s+(static\s+)?[\w<>,\[\]\s]+\s+(\w+)\s*\(', line)
        if match:
            method_name = match.group(3)
            if method_name != 'main':
                return method_name

    # Default titles based on count
    titles = {
        1: 'Configuration Setup',
        2: 'Producer/Consumer Creation',
        3: 'Message Processing',
        4: 'Error Handling'
    }
    return titles.get(count, f'Section {count}')

# For now, return empty - we'll do a simpler manual approach
print("Script ready but we'll use a simpler approach")
