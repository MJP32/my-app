import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function FileIO({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showSolution, setShowSolution] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userCode, setUserCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [language, setLanguage] = useState(getPreferredLanguage())
  const [showDrawing, setShowDrawing] = useState(false)
  const [currentDrawing, setCurrentDrawing] = useState(null)
  const [expandedSections, setExpandedSections] = useState({
    Easy: true,
    Medium: true,
    Hard: true
  })

  useEffect(() => {
    const handleProgressUpdate = () => setRefreshKey(prev => prev + 1)
    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  useEffect(() => {
    const handleLanguageChange = (e) => {
      setLanguage(e.detail)
      if (selectedQuestion) {
        setUserCode(selectedQuestion.code[e.detail].starterCode)
      }
    }
    window.addEventListener('languageChange', handleLanguageChange)
    return () => window.removeEventListener('languageChange', handleLanguageChange)
  }, [selectedQuestion])

  const questions = [
    {
      id: 1,
      title: 'BufferedReader for Efficient File Reading',
      difficulty: 'Easy',
      description: 'Read a file line by line using BufferedReader with try-with-resources. BufferedReader wraps FileReader to provide buffering, reducing I/O operations and improving performance.',
      examples: [
        { input: 'File with 3 lines', output: 'Read: Line 1, Read: Line 2, Read: Line 3, Total: 3 lines' },
        { input: 'Empty file', output: 'Total: 0 lines' }
      ],
      code: {
        java: {
          starterCode: `import java.io.*;

class FileReaderExample {
    // TODO: Implement readFile using BufferedReader in try-with-resources
    public static int readFile(String filename) throws IOException {
        int lineCount = 0;
        // Open BufferedReader, read line by line, count lines

        return lineCount;
    }

    public static void main(String[] args) {
        try {
            // Create a test file first
            BufferedWriter writer = new BufferedWriter(new FileWriter("test.txt"));
            writer.write("Line 1\\n");
            writer.write("Line 2\\n");
            writer.write("Line 3\\n");
            writer.close();

            int lines = readFile("test.txt");
            System.out.println("Read " + lines + " lines");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          solution: `import java.io.*;

class FileReaderExample {
    public static int readFile(String filename) throws IOException {
        int lineCount = 0;

        // Try-with-resources: automatically closes BufferedReader
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            while ((line = reader.readLine()) != null) {
                lineCount++;
                System.out.println("Read: " + line);
            }
        }

        return lineCount;
    }

    public static void main(String[] args) {
        try {
            // Create a test file first
            BufferedWriter writer = new BufferedWriter(new FileWriter("test.txt"));
            writer.write("Line 1\\n");
            writer.write("Line 2\\n");
            writer.write("Line 3\\n");
            writer.close();

            int lines = readFile("test.txt");
            System.out.println("Read " + lines + " lines");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`
        },
        python: {
          starterCode: `# File reading in Python
def read_file(filename):
    line_count = 0
    # TODO: Open file with 'with' statement, read lines

    return line_count

# Test
with open("test.txt", "w") as f:
    f.write("Line 1\\n")
    f.write("Line 2\\n")
    f.write("Line 3\\n")

lines = read_file("test.txt")
print(f"Read {lines} lines")`,
          solution: `# File reading in Python
def read_file(filename):
    line_count = 0

    # 'with' statement automatically closes file
    with open(filename, 'r') as f:
        for line in f:
            line = line.strip()
            line_count += 1
            print(f"Read: {line}")

    return line_count

# Test
with open("test.txt", "w") as f:
    f.write("Line 1\\n")
    f.write("Line 2\\n")
    f.write("Line 3\\n")

lines = read_file("test.txt")
print(f"Read {lines} lines")`
        }
      },
      explanation: 'BufferedReader wraps FileReader to provide buffering (default 8KB). Use readLine() to read line by line. Returns null at end of file. Always use try-with-resources to ensure file is closed. BufferedReader is much faster than FileReader for line-by-line reading.',
      timeComplexity: 'O(n) where n is file size',
      spaceComplexity: 'O(1) for BufferedReader, O(m) for line where m is line length'
    },
    {
      id: 2,
      title: 'BufferedWriter for File Writing',
      difficulty: 'Easy',
      description: 'Write multiple lines to a file using BufferedWriter in try-with-resources. BufferedWriter provides buffering to minimize write operations to disk.',
      examples: [
        { input: 'List of 3 strings', output: 'Wrote 3 lines to file' },
        { input: 'Large list of strings', output: 'Buffering improves performance' }
      ],
      code: {
        java: {
          starterCode: `import java.io.*;
import java.util.*;

class FileWriterExample {
    // TODO: Implement writeLines using BufferedWriter in try-with-resources
    public static void writeLines(String filename, List<String> lines) throws IOException {
        // Open BufferedWriter, write each line with newLine()

    }

    public static void main(String[] args) {
        try {
            List<String> lines = Arrays.asList("First line", "Second line", "Third line");
            writeLines("output.txt", lines);
            System.out.println("Wrote " + lines.size() + " lines");

            // Read back to verify
            BufferedReader reader = new BufferedReader(new FileReader("output.txt"));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("Verified: " + line);
            }
            reader.close();
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          solution: `import java.io.*;
import java.util.*;

class FileWriterExample {
    public static void writeLines(String filename, List<String> lines) throws IOException {
        // Try-with-resources: automatically closes and flushes BufferedWriter
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filename))) {
            for (String line : lines) {
                writer.write(line);
                writer.newLine();  // Platform-independent newline
            }
            // writer.flush() called automatically on close
        }
    }

    public static void main(String[] args) {
        try {
            List<String> lines = Arrays.asList("First line", "Second line", "Third line");
            writeLines("output.txt", lines);
            System.out.println("Wrote " + lines.size() + " lines");

            // Read back to verify
            BufferedReader reader = new BufferedReader(new FileReader("output.txt"));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("Verified: " + line);
            }
            reader.close();
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`
        },
        python: {
          starterCode: `# File writing in Python
def write_lines(filename, lines):
    # TODO: Open file for writing, write each line
    pass

# Test
lines = ["First line", "Second line", "Third line"]
write_lines("output.txt", lines)
print(f"Wrote {len(lines)} lines")

# Read back to verify
with open("output.txt", "r") as f:
    for line in f:
        print(f"Verified: {line.strip()}")`,
          solution: `# File writing in Python
def write_lines(filename, lines):
    # 'with' statement automatically closes file
    with open(filename, 'w') as f:
        for line in lines:
            f.write(line + '\\n')

# Test
lines = ["First line", "Second line", "Third line"]
write_lines("output.txt", lines)
print(f"Wrote {len(lines)} lines")

# Read back to verify
with open("output.txt", "r") as f:
    for line in f:
        print(f"Verified: {line.strip()}")`
        }
      },
      explanation: 'BufferedWriter wraps FileWriter to buffer writes (default 8KB). Use write() for text and newLine() for platform-independent line breaks. Always use try-with-resources to ensure flush() and close() are called. Buffering significantly improves performance for many small writes.',
      timeComplexity: 'O(n) where n is total characters',
      spaceComplexity: 'O(1) for BufferedWriter'
    },
    {
      id: 3,
      title: 'NIO Files API for Modern File Operations',
      difficulty: 'Medium',
      description: 'Use java.nio.file.Files API (Java 7+) for modern, efficient file operations. The Files class provides static methods for common operations like copy, move, delete, and reading/writing entire files.',
      examples: [
        { input: 'Files.copy(source, dest)', output: 'Atomic file copy with options' },
        { input: 'Files.readAllLines(path)', output: 'Read entire file as List<String>' }
      ],
      code: {
        java: {
          starterCode: `import java.nio.file.*;
import java.io.*;
import java.util.*;

class FilesExample {
    // TODO: Implement copyFile using Files.copy() with REPLACE_EXISTING option
    public static void copyFile(String source, String target) throws IOException {

    }

    // TODO: Implement readAllLines using Files.readAllLines()
    public static List<String> readAllLines(String filename) throws IOException {
        return null;
    }

    // TODO: Implement writeAllLines using Files.write()
    public static void writeAllLines(String filename, List<String> lines) throws IOException {

    }

    public static void main(String[] args) {
        try {
            // Create source file
            List<String> content = Arrays.asList("Line 1", "Line 2", "Line 3");
            writeAllLines("source.txt", content);

            // Copy file
            copyFile("source.txt", "destination.txt");
            System.out.println("File copied successfully");

            // Read and verify
            List<String> read = readAllLines("destination.txt");
            System.out.println("Content: " + read);
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          solution: `import java.nio.file.*;
import java.io.*;
import java.util.*;

class FilesExample {
    public static void copyFile(String source, String target) throws IOException {
        Path srcPath = Paths.get(source);
        Path destPath = Paths.get(target);

        // Copy with options: replace if exists, copy attributes
        Files.copy(srcPath, destPath,
            StandardCopyOption.REPLACE_EXISTING,
            StandardCopyOption.COPY_ATTRIBUTES);
    }

    public static List<String> readAllLines(String filename) throws IOException {
        Path path = Paths.get(filename);
        // Reads entire file as List<String> (UTF-8 by default)
        return Files.readAllLines(path);
    }

    public static void writeAllLines(String filename, List<String> lines) throws IOException {
        Path path = Paths.get(filename);
        // Writes all lines to file (creates file if doesn't exist)
        Files.write(path, lines);
    }

    public static void main(String[] args) {
        try {
            // Create source file
            List<String> content = Arrays.asList("Line 1", "Line 2", "Line 3");
            writeAllLines("source.txt", content);

            // Copy file
            copyFile("source.txt", "destination.txt");
            System.out.println("File copied successfully");

            // Read and verify
            List<String> read = readAllLines("destination.txt");
            System.out.println("Content: " + read);

            // Other useful Files methods:
            // Files.exists(path) - check if file exists
            // Files.delete(path) - delete file
            // Files.move(source, target) - move/rename file
            // Files.size(path) - get file size
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`
        },
        python: {
          starterCode: `import shutil
from pathlib import Path

def copy_file(source, target):
    # TODO: Use shutil.copy2() to copy file
    pass

def read_all_lines(filename):
    # TODO: Read all lines into a list
    pass

def write_all_lines(filename, lines):
    # TODO: Write all lines to file
    pass

# Test
content = ["Line 1", "Line 2", "Line 3"]
write_all_lines("source.txt", content)
copy_file("source.txt", "destination.txt")
print("File copied successfully")

read = read_all_lines("destination.txt")
print(f"Content: {read}")`,
          solution: `import shutil
from pathlib import Path

def copy_file(source, target):
    # shutil.copy2 preserves metadata
    shutil.copy2(source, target)

def read_all_lines(filename):
    # Read all lines, strip newlines
    with open(filename, 'r') as f:
        return [line.strip() for line in f]

def write_all_lines(filename, lines):
    with open(filename, 'w') as f:
        for line in lines:
            f.write(line + '\\n')

# Test
content = ["Line 1", "Line 2", "Line 3"]
write_all_lines("source.txt", content)
copy_file("source.txt", "destination.txt")
print("File copied successfully")

read = read_all_lines("destination.txt")
print(f"Content: {read}")

# Other useful Path methods:
path = Path("source.txt")
print(f"Exists: {path.exists()}")
print(f"Size: {path.stat().st_size}")
# path.unlink() - delete file
# path.rename(new_name) - rename file`
        }
      },
      explanation: 'NIO Files API provides modern, efficient file operations. Files.copy() supports atomic operations with StandardCopyOption. Files.readAllLines() reads entire file into List<String>. Files.write() writes all lines at once. Paths.get() creates Path objects. Always more efficient and safer than old File API.',
      timeComplexity: 'O(n) where n is file size',
      spaceComplexity: 'O(n) for readAllLines (entire file in memory)'
    },
    {
      id: 4,
      title: 'Serialization with transient Fields',
      difficulty: 'Medium',
      description: 'Serialize objects to files using ObjectOutputStream and deserialize with ObjectInputStream. Use transient keyword to exclude sensitive fields like passwords from serialization.',
      examples: [
        { input: 'User with password field', output: 'Serialized without password, password is null after deserialization' },
        { input: 'Object with transient cache', output: 'Cache not serialized, must be rebuilt' }
      ],
      code: {
        java: {
          starterCode: `import java.io.*;

class User implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private String email;
    // TODO: Make password transient so it's not serialized
    private String password;

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{name='" + name + "', email='" + email + "', password='" + password + "'}";
    }
}

class SerializationExample {
    public static void main(String[] args) {
        try {
            // Serialize
            User user = new User("John", "john@example.com", "secret123");
            System.out.println("Original: " + user);

            // TODO: Serialize user to "user.ser" using ObjectOutputStream

            // TODO: Deserialize from "user.ser" using ObjectInputStream

            System.out.println("Deserialized: " + loaded);
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          solution: `import java.io.*;

class User implements Serializable {
    private static final long serialVersionUID = 1L;

    private String name;
    private String email;
    private transient String password;  // Not serialized

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    @Override
    public String toString() {
        return "User{name='" + name + "', email='" + email + "', password='" + password + "'}";
    }
}

class SerializationExample {
    public static void main(String[] args) {
        try {
            // Serialize
            User user = new User("John", "john@example.com", "secret123");
            System.out.println("Original: " + user);

            // Write object to file
            try (ObjectOutputStream out = new ObjectOutputStream(
                    new FileOutputStream("user.ser"))) {
                out.writeObject(user);
            }

            // Deserialize
            User loaded;
            try (ObjectInputStream in = new ObjectInputStream(
                    new FileInputStream("user.ser"))) {
                loaded = (User) in.readObject();
            }

            System.out.println("Deserialized: " + loaded);
            // Note: password is null because it was transient

            // serialVersionUID ensures version compatibility
            // Change class structure = change serialVersionUID
        } catch (Exception e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`
        },
        python: {
          starterCode: `import pickle

class User:
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

    def __str__(self):
        return f"User{{name='{self.name}', email='{self.email}', password='{self.password}'}}"

# TODO: Serialize and deserialize User object
# Note: Python doesn't have transient, use __getstate__ and __setstate__`,
          solution: `import pickle

class User:
    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

    def __getstate__(self):
        # Exclude password from serialization
        state = self.__dict__.copy()
        state['password'] = None
        return state

    def __setstate__(self, state):
        # Restore object from serialized state
        self.__dict__.update(state)

    def __str__(self):
        return f"User{{name='{self.name}', email='{self.email}', password='{self.password}'}}"

# Serialize
user = User("John", "john@example.com", "secret123")
print(f"Original: {user}")

with open("user.pkl", "wb") as f:
    pickle.dump(user, f)

# Deserialize
with open("user.pkl", "rb") as f:
    loaded = pickle.load(f)

print(f"Deserialized: {loaded}")
# Note: password is None because __getstate__ excluded it`
        }
      },
      explanation: 'Use ObjectOutputStream.writeObject() to serialize and ObjectInputStream.readObject() to deserialize. Transient fields are not serialized (reset to null/0/false). serialVersionUID ensures version compatibility. Classes must implement Serializable. Always use try-with-resources for streams.',
      timeComplexity: 'O(n) where n is object graph size',
      spaceComplexity: 'O(n) for serialized data'
    },
    {
      id: 5,
      title: 'Files.walk() for Directory Traversal',
      difficulty: 'Hard',
      description: 'Use Files.walk() to recursively traverse directory trees with Java Streams API. Process files matching patterns, calculate total sizes, or perform batch operations efficiently.',
      examples: [
        { input: 'Directory tree with .java files', output: 'Stream of all .java file paths' },
        { input: 'Calculate total size', output: 'Sum of all file sizes in directory tree' }
      ],
      code: {
        java: {
          starterCode: `import java.nio.file.*;
import java.io.*;
import java.util.*;
import java.util.stream.*;

class DirectoryTraversal {
    // TODO: Find all files with given extension in directory tree
    public static List<Path> findFilesByExtension(String directory, String extension) throws IOException {
        // Use Files.walk() to create stream of paths
        // Filter by extension
        // Collect to list
        return null;
    }

    // TODO: Calculate total size of all files in directory
    public static long calculateTotalSize(String directory) throws IOException {
        // Use Files.walk() and map to file size
        // Sum all sizes
        return 0;
    }

    public static void main(String[] args) {
        try {
            // Create test directory structure
            Files.createDirectories(Paths.get("test/subdir"));
            Files.write(Paths.get("test/file1.txt"), "content1".getBytes());
            Files.write(Paths.get("test/file2.java"), "content2".getBytes());
            Files.write(Paths.get("test/subdir/file3.txt"), "content3".getBytes());

            List<Path> txtFiles = findFilesByExtension("test", ".txt");
            System.out.println("Text files: " + txtFiles);

            long totalSize = calculateTotalSize("test");
            System.out.println("Total size: " + totalSize + " bytes");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`,
          solution: `import java.nio.file.*;
import java.io.*;
import java.util.*;
import java.util.stream.*;

class DirectoryTraversal {
    public static List<Path> findFilesByExtension(String directory, String extension) throws IOException {
        try (Stream<Path> paths = Files.walk(Paths.get(directory))) {
            return paths
                .filter(Files::isRegularFile)
                .filter(p -> p.toString().endsWith(extension))
                .collect(Collectors.toList());
        }
    }

    public static long calculateTotalSize(String directory) throws IOException {
        try (Stream<Path> paths = Files.walk(Paths.get(directory))) {
            return paths
                .filter(Files::isRegularFile)
                .mapToLong(p -> {
                    try {
                        return Files.size(p);
                    } catch (IOException e) {
                        return 0;
                    }
                })
                .sum();
        }
    }

    // Delete directory and all contents
    public static void deleteDirectory(String directory) throws IOException {
        Path path = Paths.get(directory);
        if (Files.exists(path)) {
            try (Stream<Path> paths = Files.walk(path)) {
                paths
                    .sorted(Comparator.reverseOrder())  // Delete files before directories
                    .forEach(p -> {
                        try {
                            Files.delete(p);
                        } catch (IOException e) {
                            System.err.println("Failed to delete: " + p);
                        }
                    });
            }
        }
    }

    public static void main(String[] args) {
        try {
            // Create test directory structure
            Files.createDirectories(Paths.get("test/subdir"));
            Files.write(Paths.get("test/file1.txt"), "content1".getBytes());
            Files.write(Paths.get("test/file2.java"), "content2".getBytes());
            Files.write(Paths.get("test/subdir/file3.txt"), "content3".getBytes());

            List<Path> txtFiles = findFilesByExtension("test", ".txt");
            System.out.println("Text files: " + txtFiles);

            long totalSize = calculateTotalSize("test");
            System.out.println("Total size: " + totalSize + " bytes");

            // Important: Files.walk() returns Stream that must be closed
            // Always use try-with-resources
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}`
        },
        python: {
          starterCode: `from pathlib import Path

def find_files_by_extension(directory, extension):
    # TODO: Use Path.rglob() to find all files with extension
    pass

def calculate_total_size(directory):
    # TODO: Sum sizes of all files in directory tree
    pass

# Create test directory structure
Path("test/subdir").mkdir(parents=True, exist_ok=True)
Path("test/file1.txt").write_text("content1")
Path("test/file2.py").write_text("content2")
Path("test/subdir/file3.txt").write_text("content3")

txt_files = find_files_by_extension("test", ".txt")
print(f"Text files: {txt_files}")

total_size = calculate_total_size("test")
print(f"Total size: {total_size} bytes")`,
          solution: `from pathlib import Path

def find_files_by_extension(directory, extension):
    # Path.rglob() recursively finds matching files
    return list(Path(directory).rglob(f"*{extension}"))

def calculate_total_size(directory):
    # Sum sizes of all regular files
    return sum(
        f.stat().st_size
        for f in Path(directory).rglob("*")
        if f.is_file()
    )

# Create test directory structure
Path("test/subdir").mkdir(parents=True, exist_ok=True)
Path("test/file1.txt").write_text("content1")
Path("test/file2.py").write_text("content2")
Path("test/subdir/file3.txt").write_text("content3")

txt_files = find_files_by_extension("test", ".txt")
print(f"Text files: {txt_files}")

total_size = calculate_total_size("test")
print(f"Total size: {total_size} bytes")

# Other useful Path methods:
# Path.iterdir() - iterate direct children only
# Path.glob() - non-recursive glob
# Path.rglob() - recursive glob
# Path.walk() - Python 3.12+ (like os.walk)`
        }
      },
      explanation: 'Files.walk(path) returns Stream<Path> of all paths in directory tree. Must use try-with-resources to close stream. Filter with Files::isRegularFile for files only. Use maxDepth parameter to limit depth. Sort in reverse order when deleting to delete files before directories. Combine with Streams API for powerful file operations.',
      timeComplexity: 'O(n) where n is total files/directories',
      spaceComplexity: 'O(d) where d is directory depth'
    }
  ]

  // Calculate completion status
  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`FileIO-${q.id}`)).length
    return { completed, total: questions.length, percentage: Math.round((completed / questions.length) * 100) }
  }

  const stats = getCompletionStats()

  // Group questions by difficulty
  const groupedQuestions = {
    Easy: questions.filter(q => q.difficulty === 'Easy'),
    Medium: questions.filter(q => q.difficulty === 'Medium'),
    Hard: questions.filter(q => q.difficulty === 'Hard')
  }

  const selectQuestion = (question) => {
    setSelectedQuestion(question)
    setShowSolution(false)
    setShowExplanation(false)
    setUserCode(question.code[language].starterCode)
    setOutput('')
    setShowDrawing(false)
  }

  const toggleSection = (difficulty) => {
    setExpandedSections(prev => ({ ...prev, [difficulty]: !prev[difficulty] }))
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  if (selectedQuestion) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #111827, #78350f, #111827)', color: 'white', padding: '1.5rem' }}>
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}>
            ← Back to Problems
          </button>
          <LanguageToggle />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Problem Description */}
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#fbbf24', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`FileIO-${selectedQuestion.id}`} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #374151', color: '#d1d5db' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#fbbf24' }}>Input:</strong> <code style={{ color: '#d1d5db' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: '#fbbf24' }}>Output:</strong> <code style={{ color: '#d1d5db' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>💡 Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #dbeafe' }}>
                <h3 style={{ fontSize: '1rem', color: '#1e40af', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#1e40af' }}>⏱️ Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#1e40af' }}>💾 Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #e5e7eb', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #e5e7eb', borderRadius: '8px', resize: 'none', lineHeight: '1.5' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#374151', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px' }}>{output}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1f2937', marginBottom: '0.5rem' }}>📁 File I/O</h1>
        <p style={{ fontSize: '1.2rem', color: '#6b7280' }}>Master Java file operations, streams, and modern NIO file handling</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', backgroundColor: 'white', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#3b82f6' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', backgroundColor: 'white', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: 'white', border: '2px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
                <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>({difficultyQuestions.length} problems)</span>
              </div>
              <span style={{ fontSize: '1.25rem', color: '#6b7280' }}>{expandedSections[difficulty] ? '▼' : '▶'}</span>
            </button>

            {expandedSections[difficulty] && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
                {difficultyQuestions.map((question) => (
                  <div key={question.id} onClick={() => selectQuestion(question)} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', border: '2px solid #e5e7eb', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1f2937', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`FileIO-${question.id}`} />
                        </div>
                        {question.leetcodeUrl && (
                          <a
                            href={question.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ padding: '0.25rem 0.75rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.75rem', fontWeight: '600', display: 'inline-block' }}
                          >
                            LeetCode ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      ))}
    </div>
  )
}

export default FileIO
