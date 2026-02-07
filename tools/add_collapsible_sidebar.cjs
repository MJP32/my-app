/**
 * Script to add CollapsibleSidebar to all pages with selectedConceptIndex
 */

const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'src', 'pages');

// Get all files that use selectedConceptIndex
function findFiles(dir) {
  const results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      results.push(...findFiles(fullPath));
    } else if (item.name.endsWith('.jsx') && item.name !== 'RecursionPatterns.jsx') {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('selectedConceptIndex') && !content.includes('CollapsibleSidebar')) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

function getColorsConstName(content) {
  // Find the COLORS constant name (e.g., COREJAVA_COLORS, DESIGN_COLORS, etc.)
  const match = content.match(/const\s+(\w+_COLORS)\s*=/);
  return match ? match[1] : null;
}

function addCollapsibleSidebar(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has CollapsibleSidebar
  if (content.includes('CollapsibleSidebar')) {
    console.log(`Skipping ${filePath} - already has CollapsibleSidebar`);
    return false;
  }

  // Get the colors constant name
  const colorsConst = getColorsConstName(content);
  if (!colorsConst) {
    console.log(`Skipping ${filePath} - no colors constant found`);
    return false;
  }

  // Calculate relative path for import
  const relativePath = path.relative(path.dirname(filePath), path.join(__dirname, '..', 'src', 'components'));
  const importPath = relativePath.replace(/\\/g, '/');

  // Add import
  const breadcrumbImport = content.match(/import Breadcrumb from ['"]([^'"]+)['"]/);
  if (breadcrumbImport) {
    const importStatement = `import CollapsibleSidebar from '${importPath}/CollapsibleSidebar'`;
    content = content.replace(
      breadcrumbImport[0],
      `${breadcrumbImport[0]}\n${importStatement}`
    );
  } else {
    console.log(`Skipping ${filePath} - no Breadcrumb import found`);
    return false;
  }

  // Find the Breadcrumb component and add CollapsibleSidebar after it
  const breadcrumbPattern = /(<Breadcrumb[\s\S]*?\/>[\s\S]*?<\/div>)(\s*\n\s*\n\s*\{\/\*)/;
  const match = content.match(breadcrumbPattern);

  if (match) {
    const sidebarCode = `

      {/* Collapsible Sidebar for quick concept navigation */}
      <CollapsibleSidebar
        items={concepts}
        selectedIndex={selectedConceptIndex ?? -1}
        onSelect={(index) => {
          setSelectedConceptIndex(index)
          setSelectedDetailIndex(0)
        }}
        title="Concepts"
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        primaryColor={${colorsConst}.primary}
      />
`;
    content = content.replace(breadcrumbPattern, `$1${sidebarCode}$2`);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
    return true;
  } else {
    console.log(`Skipping ${filePath} - couldn't find Breadcrumb pattern`);
    return false;
  }
}

// Main execution
const files = findFiles(pagesDir);
console.log(`Found ${files.length} files to update`);

let updated = 0;
for (const file of files) {
  if (addCollapsibleSidebar(file)) {
    updated++;
  }
}

console.log(`\nUpdated ${updated} files`);
