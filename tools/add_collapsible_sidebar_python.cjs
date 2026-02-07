/**
 * Script to add CollapsibleSidebar to Python pages with selectedConcept pattern
 */

const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '..', 'src', 'pages', 'python');

function getColorsConstName(content) {
  const match = content.match(/const\s+(\w+_COLORS)\s*=/);
  return match ? match[1] : null;
}

// Default Python color
const PYTHON_DEFAULT_COLOR = '#3b82f6';

function addCollapsibleSidebar(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has CollapsibleSidebar
  if (content.includes('CollapsibleSidebar')) {
    console.log(`Skipping ${filePath} - already has CollapsibleSidebar`);
    return false;
  }

  // Check if it uses selectedConcept pattern
  if (!content.includes('selectedConcept') || !content.includes('const concepts =')) {
    console.log(`Skipping ${filePath} - doesn't use concept pattern`);
    return false;
  }

  // Get the colors constant name (or use default)
  const colorsConst = getColorsConstName(content);
  const primaryColor = colorsConst ? `${colorsConst}.primary` : `'${PYTHON_DEFAULT_COLOR}'`;

  // Calculate relative path for import
  const importPath = '../../components';

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

  // Check if the pattern uses index or direct concept selection
  const usesIndex = content.includes('selectedConceptIndex');

  // Find the Breadcrumb component and add CollapsibleSidebar after it
  const breadcrumbPattern = /(<Breadcrumb[\s\S]*?\/>[\s\S]*?<\/div>)(\s*\n\s*\n?\s*\{\/\*|\s*\n\s*\n?\s*<)/;
  const match = content.match(breadcrumbPattern);

  if (match) {
    let sidebarCode;
    if (usesIndex) {
      sidebarCode = `

      {/* Collapsible Sidebar for quick concept navigation */}
      <CollapsibleSidebar
        items={concepts}
        selectedIndex={selectedConceptIndex ?? -1}
        onSelect={(index) => {
          setSelectedConceptIndex(index)
          if (setSelectedDetailIndex) setSelectedDetailIndex(0)
        }}
        title="Concepts"
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        primaryColor={${primaryColor}}
      />
`;
    } else {
      sidebarCode = `

      {/* Collapsible Sidebar for quick concept navigation */}
      <CollapsibleSidebar
        items={concepts}
        selectedIndex={selectedConcept ? concepts.findIndex(c => c.id === selectedConcept.id) : -1}
        onSelect={(index) => setSelectedConcept(concepts[index])}
        title="Concepts"
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        primaryColor={${primaryColor}}
      />
`;
    }
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
const files = fs.readdirSync(pagesDir)
  .filter(f => f.endsWith('.jsx'))
  .map(f => path.join(pagesDir, f));

console.log(`Found ${files.length} Python files to check`);

let updated = 0;
for (const file of files) {
  if (addCollapsibleSidebar(file)) {
    updated++;
  }
}

console.log(`\nUpdated ${updated} files`);
