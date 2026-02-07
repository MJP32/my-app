/**
 * Script to add CollapsibleSidebar to algorithm pages
 */

const fs = require('fs');
const path = require('path');

const algorithmsDir = path.join(__dirname, '..', 'src', 'pages', 'algorithms');

function addCollapsibleSidebar(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has CollapsibleSidebar
  if (content.includes('CollapsibleSidebar')) {
    console.log(`Skipping ${path.basename(filePath)} - already has CollapsibleSidebar`);
    return false;
  }

  // Skip if doesn't have questions array
  if (!content.includes('const questions =')) {
    console.log(`Skipping ${path.basename(filePath)} - no questions array`);
    return false;
  }

  // Add import after other imports
  const breadcrumbImport = content.match(/import Breadcrumb from ['"][^'"]+['"]/);
  if (breadcrumbImport) {
    content = content.replace(
      breadcrumbImport[0],
      `${breadcrumbImport[0]}\nimport CollapsibleSidebar from '../../components/CollapsibleSidebar'`
    );
  } else {
    // Add after the last import
    const lastImport = content.match(/import .+ from ['"][^'"]+['"];?\n/g);
    if (lastImport) {
      const lastImportStr = lastImport[lastImport.length - 1];
      content = content.replace(
        lastImportStr,
        `${lastImportStr}import CollapsibleSidebar from '../../components/CollapsibleSidebar'\n`
      );
    }
  }

  // Find the Breadcrumb component and add CollapsibleSidebar after it
  // Pattern: Breadcrumb followed by closing tag and then content
  const breadcrumbPattern = /(<Breadcrumb[\s\S]*?\/>)\s*\n\s*\n\s*(<div style=\{\{ textAlign)/;
  const match = content.match(breadcrumbPattern);

  if (match) {
    const sidebarCode = `
      {/* Collapsible Sidebar for quick problem navigation */}
      <CollapsibleSidebar
        items={questions}
        selectedIndex={selectedQuestion ? questions.findIndex(q => q.id === selectedQuestion.id) : -1}
        onSelect={(index) => setSelectedQuestion(questions[index])}
        title="Problems"
        getItemLabel={(item) => item.title}
        getItemIcon={(item) => {
          const colors = { Easy: '🟢', Medium: '🟡', Hard: '🔴' };
          return colors[item.difficulty] || '⚪';
        }}
        primaryColor="#3b82f6"
      />

      `;
    content = content.replace(breadcrumbPattern, `$1\n\n${sidebarCode}$2`);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${path.basename(filePath)}`);
    return true;
  } else {
    console.log(`Skipping ${path.basename(filePath)} - couldn't find Breadcrumb pattern`);
    return false;
  }
}

// Main execution
const files = fs.readdirSync(algorithmsDir)
  .filter(f => f.endsWith('.jsx'))
  .map(f => path.join(algorithmsDir, f));

console.log(`Found ${files.length} algorithm files to check`);

let updated = 0;
for (const file of files) {
  if (addCollapsibleSidebar(file)) {
    updated++;
  }
}

console.log(`\nUpdated ${updated} files`);
