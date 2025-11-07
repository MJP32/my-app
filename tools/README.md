# Development Tools

This directory contains various scripts and utilities for maintaining and building the application.

## Directory Structure

### `builders/`
Scripts for building and generating application content:
- `build_system_design.py` - Build system design content
- `build_system_design_v2.py` - Updated version of system design builder
- `generate_neetcode_categories.py` - Generate NeetCode category content

### `converters/`
Scripts for converting and transforming content formats:
- `convert_java_components.py` - Convert Java components
- `convert_system_design.py` - Convert system design format
- `convert_to_dual_language.py` - Convert to dual-language format
- `convert_to_sliding_window_format.py` - Convert to sliding window format

### `fixers/`
Scripts for fixing and updating existing code:
- `fix_all_drawing_canvas.sh` - Fix drawing canvas across files
- `fix_drawing_canvas.py` - Fix drawing canvas implementation
- `fix_drawing_final.py` - Final drawing canvas fixes
- `fix_duplicates.py` - Remove duplicate content
- `fix_onclick.py` - Fix onClick handlers
- `fix_template_strings.py` - Fix template string syntax
- `standardize_completion_checkbox.py` - Standardize checkbox implementation
- `transform_kafka.py` - Transform Kafka content
- `update_algorithm_files.py` - Update algorithm files
- `update_algorithm_files.sh` - Shell script for algorithm updates
- `update_all_cards.py` - Update all card components
- `update_card_interface.py` - Update card interfaces
- `update_collapsible_batch.py` - Update collapsible components
- `update_leetcode_links.sh` - Update LeetCode links

### `shell/`
Shell scripts and automation tools:
- `add_draw_button.sh` - Add draw button functionality
- `add_keyboard_nav.py` - Add keyboard navigation
- `apply-keyboard-nav.sh` - Apply keyboard navigation changes
- `apply_collapsible.py` - Apply collapsible functionality

### `utilities/`
Utility scripts for analysis and verification:
- `count_problems.py` - Count problems in the dataset
- `count_questions.py` - Count questions
- `extract_problem_ids.py` - Extract problem IDs
- `verify_leetcode_links.py` - Verify LeetCode links
- `remove_duplicates.py` - Remove duplicate entries
- `sum_algorithm_problems.py` - Sum algorithm problems
- `verify_counts.js` - Verify problem counts (JavaScript)
- `verify_mappings.js` - Verify mappings (JavaScript)
- `verify_mappings.py` - Verify mappings (Python)
- `REMAINING_PATTERNS.txt` - Tracking file for patterns

## Usage

Run scripts from the project root directory. Most Python scripts can be executed directly:

```bash
python tools/utilities/count_problems.py
python tools/builders/generate_neetcode_categories.py
```

Shell scripts should be run from the project root as well:

```bash
bash tools/shell/apply-keyboard-nav.sh
```
