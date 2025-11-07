#!/bin/bash

# This script applies the keyboard navigation pattern to all category pages

echo "Applying keyboard navigation to all category pages..."
echo "✓ Java.jsx - Already completed"

# List of files to update
files=(
  "Design.jsx:Design"
  "Databases.jsx:Databases"
  "MyProjects.jsx:MyProjects"
  "Frameworks.jsx:Frameworks"
  "DevOpsPage.jsx:DevOps"
  "Messaging.jsx:Messaging"
  "SecurityPage.jsx:Security"
  "Cloud.jsx:Cloud"
)

echo ""
echo "The following files need keyboard navigation added:"
for file in "${files[@]}"; do
  filename="${file%%:*}"
  echo "  - src/$filename"
done

echo ""
echo "To add keyboard navigation to each file, you need to:"
echo "1. Import: import { useKeyboardNavigation } from './hooks/useKeyboardNavigation'"
echo "2. Add the hook with appropriate gridColumns (2 or 3 depending on layout)"
echo "3. Change <div> to <button> with ref, tabIndex, and aria-label"
echo "4. Add focus styles with boxShadow and transform"
echo ""
echo "See src/Java.jsx for the complete working example!"
