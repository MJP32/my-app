#!/bin/bash

# Script to add draw button functionality to algorithm components
# Usage: ./add_draw_button.sh ComponentName

COMPONENT_NAME=$1
FILE_PATH="src/pages/algorithms/${COMPONENT_NAME}.jsx"

if [ ! -f "$FILE_PATH" ]; then
    echo "Error: File $FILE_PATH does not exist"
    exit 1
fi

echo "Adding draw button to $COMPONENT_NAME..."

# Backup original file
cp "$FILE_PATH" "$FILE_PATH.backup"

# 1. Add DrawingCanvas import (after LanguageToggle import)
sed -i "/import LanguageToggle/a import DrawingCanvas from '../../components/DrawingCanvas.jsx'" "$FILE_PATH"

# 2. Add state variables (after language state)
sed -i "/const \[language, setLanguage\] = useState(getPreferredLanguage())/a \ \ const [showDrawing, setShowDrawing] = useState(false)\n  const [currentDrawing, setCurrentDrawing] = useState(null)" "$FILE_PATH"

echo "Step 1 & 2 complete: Added imports and state variables"
echo "Manual steps still needed:"
echo "  3. Add openDrawingModal and closeDrawingModal functions"
echo "  4. Update selectQuestion to load drawings"
echo "  5. Add draw button to UI (next to Reset button)"
echo "  6. Add drawing preview section"
echo "  7. Add DrawingCanvas component before closing div"

