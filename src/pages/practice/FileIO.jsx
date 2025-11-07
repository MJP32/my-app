import { useState } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox'

function FileIO({ onBack }) {
  const [selectedProblem, setSelectedProblem] = useState(null)
  const [code, setCode] = useState('')
  const [output, setOutput] = useState('')
  const [language, setLanguage] = useState('java')

  const problems = [
    {
      id: 1,
      title: 'Read File Line by Line',
      difficulty: 'Easy',
      description: 'Write a Java method that reads a text file line by line and returns a list of all lines.',
      example: `Input: file contains:
Hello World
Java File IO
Practice

Output: ["Hello World", "Java File IO", "Practice"]`,
      code: {
        java: {
          starterCode: `import java.io.*;
import java.util.*;

public class FileReader {
    /**
     * Read a file line by line and return all lines as a list
     *
     * @param filePath Path to the file to read
     * @return List of all lines in the file
     * @throws IOException if file reading fails
     */
    public static List<String> readFileLines(String filePath) throws IOException {
        // TODO: Implement this method
        return null;
    }

    public static void main(String[] args) throws IOException {
        List<String> lines = readFileLines("sample.txt");
        lines.forEach(System.out::println);
    }
}`,
          solution: `import java.io.*;
import java.nio.file.*;
import java.util.*;

public class FileReader {

    // Approach 1: Using BufferedReader (Traditional, memory efficient)
    public static List<String> readFileLines(String filePath) throws IOException {
        List<String> lines = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new java.io.FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                lines.add(line);
            }
        }
        return lines;
    }

    // Approach 2: Using Files.readAllLines (Java 7+, simple but loads entire file)
    public static List<String> readFileLinesNIO(String filePath) throws IOException {
        return Files.readAllLines(Paths.get(filePath));
    }

    // Approach 3: Using Files.lines with Stream (Java 8+, memory efficient)
    public static List<String> readFileLinesStream(String filePath) throws IOException {
        try (var stream = Files.lines(Paths.get(filePath))) {
            return stream.toList();
        }
    }

    // Approach 4: Scanner (useful for parsing)
    public static List<String> readFileLinesScanner(String filePath) throws IOException {
        List<String> lines = new ArrayList<>();
        try (Scanner scanner = new Scanner(new File(filePath))) {
            while (scanner.hasNextLine()) {
                lines.add(scanner.nextLine());
            }
        }
        return lines;
    }

    public static void main(String[] args) throws IOException {
        List<String> lines = readFileLines("sample.txt");
        lines.forEach(System.out::println);
    }
}

/*
Time Complexity: O(n) where n is file size
Space Complexity: O(n) to store all lines

Best Practices:
- Always use try-with-resources to ensure proper file closing
- Handle IOException appropriately
- Consider memory constraints for large files
- Use buffered readers for better performance
*/`
        }
      },
      hints: `Use BufferedReader with try-with-resources for automatic resource management. Consider Files.readAllLines() for simpler code.`
    },
    {
      id: 2,
      title: 'Write Lines to File',
      difficulty: 'Easy',
      description: 'Write a Java method that writes a list of strings to a file, with each string on a new line.',
      example: `Input: lines = ["Line 1", "Line 2", "Line 3"], filePath = "output.txt"
Output: File contains:
Line 1
Line 2
Line 3`,
      code: {
        java: {
          starterCode: `import java.io.*;
import java.util.*;

public class FileWriter {
    /**
     * Write lines to a file
     *
     * @param lines List of strings to write
     * @param filePath Path to the output file
     * @throws IOException if file writing fails
     */
    public static void writeLines(List<String> lines, String filePath) throws IOException {
        // TODO: Implement this method
    }

    public static void main(String[] args) throws IOException {
        List<String> lines = Arrays.asList("Hello", "World", "Java");
        writeLines(lines, "output.txt");
    }
}`,
          solution: `import java.io.*;
import java.nio.file.*;
import java.util.*;

public class FileWriter {

    // Approach 1: Using BufferedWriter (Traditional, efficient)
    public static void writeLines(List<String> lines, String filePath) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new java.io.FileWriter(filePath))) {
            for (String line : lines) {
                writer.write(line);
                writer.newLine();
            }
        }
    }

    // Approach 2: Using Files.write (Java 7+, simple)
    public static void writeLinesNIO(List<String> lines, String filePath) throws IOException {
        Files.write(Paths.get(filePath), lines);
    }

    // Approach 3: Using PrintWriter (convenient, with auto-flush)
    public static void writeLinesPrintWriter(List<String> lines, String filePath) throws IOException {
        try (PrintWriter writer = new PrintWriter(new java.io.FileWriter(filePath))) {
            lines.forEach(writer::println);
        }
    }

    // Approach 4: Append to existing file
    public static void appendLines(List<String> lines, String filePath) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(
                new java.io.FileWriter(filePath, true))) { // true = append mode
            for (String line : lines) {
                writer.write(line);
                writer.newLine();
            }
        }
    }

    public static void main(String[] args) throws IOException {
        List<String> lines = Arrays.asList("Hello", "World", "Java");
        writeLines(lines, "output.txt");
        System.out.println("File written successfully!");
    }
}

/*
Time Complexity: O(n) where n is number of lines
Space Complexity: O(1) excluding input

Best Practices:
- Use try-with-resources to ensure file is closed
- Use BufferedWriter for better performance
- Consider using Files.write() for simpler code
- Handle exceptions appropriately
- Use append mode carefully to avoid data loss
*/`
        }
      },
      hints: `Use BufferedWriter with try-with-resources. Remember to add newLine() after each line. Files.write() is simpler for basic cases.`
    },
    {
      id: 3,
      title: 'Copy File',
      difficulty: 'Easy',
      description: 'Write a Java method that copies the contents of one file to another file.',
      example: `Input: source = "input.txt", destination = "output.txt"
Output: Contents of input.txt are copied to output.txt`,
      code: {
        java: {
          starterCode: `import java.io.*;
import java.nio.file.*;

public class FileCopy {
    /**
     * Copy file from source to destination
     *
     * @param sourcePath Source file path
     * @param destPath Destination file path
     * @throws IOException if copy fails
     */
    public static void copyFile(String sourcePath, String destPath) throws IOException {
        // TODO: Implement this method
    }

    public static void main(String[] args) throws IOException {
        copyFile("source.txt", "destination.txt");
        System.out.println("File copied successfully!");
    }
}`,
          solution: `import java.io.*;
import java.nio.file.*;

public class FileCopy {

    // Approach 1: Using Files.copy (Java 7+, most efficient)
    public static void copyFile(String sourcePath, String destPath) throws IOException {
        Files.copy(
            Paths.get(sourcePath),
            Paths.get(destPath),
            StandardCopyOption.REPLACE_EXISTING
        );
    }

    // Approach 2: Using BufferedStreams (Traditional, manual control)
    public static void copyFileBuffered(String sourcePath, String destPath) throws IOException {
        try (BufferedInputStream in = new BufferedInputStream(new FileInputStream(sourcePath));
             BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(destPath))) {
            byte[] buffer = new byte[8192];
            int bytesRead;
            while ((bytesRead = in.read(buffer)) != -1) {
                out.write(buffer, 0, bytesRead);
            }
        }
    }

    // Approach 3: Using FileChannel (Fastest for large files)
    public static void copyFileChannel(String sourcePath, String destPath) throws IOException {
        try (FileInputStream in = new FileInputStream(sourcePath);
             FileOutputStream out = new FileOutputStream(destPath);
             var inChannel = in.getChannel();
             var outChannel = out.getChannel()) {
            inChannel.transferTo(0, inChannel.size(), outChannel);
        }
    }

    // Approach 4: Copy with metadata preservation
    public static void copyWithAttributes(String sourcePath, String destPath) throws IOException {
        Files.copy(
            Paths.get(sourcePath),
            Paths.get(destPath),
            StandardCopyOption.REPLACE_EXISTING,
            StandardCopyOption.COPY_ATTRIBUTES
        );
    }

    public static void main(String[] args) throws IOException {
        copyFile("source.txt", "destination.txt");
        System.out.println("File copied successfully!");
    }
}

/*
Time Complexity: O(n) where n is file size
Space Complexity: O(1) for streaming approaches

Best Practices:
- Use Files.copy() for simplicity
- Use FileChannel for large files (> 10MB)
- Always handle IOException
- Consider REPLACE_EXISTING vs failing on existing file
- Use COPY_ATTRIBUTES to preserve file metadata
*/`
        }
      },
      hints: `Files.copy() is the simplest approach. Use StandardCopyOption.REPLACE_EXISTING to overwrite existing files.`
    },
    {
      id: 4,
      title: 'Count Words in File',
      difficulty: 'Medium',
      description: 'Write a Java method that reads a file and returns the total word count.',
      example: `Input: file contains "Hello world! This is a test file."
Output: 7`,
      code: {
        java: {
          starterCode: `import java.io.*;
import java.nio.file.*;

public class WordCounter {
    /**
     * Count total words in a file
     *
     * @param filePath Path to the file
     * @return Total word count
     * @throws IOException if file reading fails
     */
    public static int countWords(String filePath) throws IOException {
        // TODO: Implement this method
        return 0;
    }

    public static void main(String[] args) throws IOException {
        int count = countWords("sample.txt");
        System.out.println("Word count: " + count);
    }
}`,
          solution: `import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.stream.*;

public class WordCounter {

    // Approach 1: Using BufferedReader with split
    public static int countWords(String filePath) throws IOException {
        int count = 0;
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] words = line.trim().split("\\s+");
                if (!line.trim().isEmpty()) {
                    count += words.length;
                }
            }
        }
        return count;
    }

    // Approach 2: Using Files.lines with Stream (Java 8+)
    public static int countWordsStream(String filePath) throws IOException {
        try (Stream<String> lines = Files.lines(Paths.get(filePath))) {
            return (int) lines
                .flatMap(line -> Arrays.stream(line.trim().split("\\s+")))
                .filter(word -> !word.isEmpty())
                .count();
        }
    }

    // Approach 3: Using Scanner (word-by-word)
    public static int countWordsScanner(String filePath) throws IOException {
        int count = 0;
        try (Scanner scanner = new Scanner(new File(filePath))) {
            while (scanner.hasNext()) {
                scanner.next();
                count++;
            }
        }
        return count;
    }

    // Approach 4: Count words with specific pattern (alphanumeric only)
    public static int countWordsPattern(String filePath) throws IOException {
        int count = 0;
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // Match sequences of alphanumeric characters
                String[] words = line.split("[^a-zA-Z0-9]+");
                for (String word : words) {
                    if (!word.isEmpty()) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    public static void main(String[] args) throws IOException {
        int count = countWords("sample.txt");
        System.out.println("Word count: " + count);
    }
}

/*
Time Complexity: O(n) where n is file size
Space Complexity: O(1) for line-by-line approach, O(w) for stream approach where w is words per line

Best Practices:
- Handle empty lines and whitespace correctly
- Define what constitutes a "word" (whitespace-separated vs alphanumeric)
- Use appropriate splitting regex
- Consider memory for large files (stream vs readAllLines)
*/`
        }
      },
      hints: `Read line by line and split on whitespace. Don't forget to handle empty lines and multiple spaces.`
    },
    {
      id: 5,
      title: 'File Exists and Properties',
      difficulty: 'Easy',
      description: 'Write Java methods to check if a file exists, get its size, and check if it is readable/writable.',
      example: `Input: filePath = "test.txt"
Output:
Exists: true
Size: 1024 bytes
Readable: true
Writable: true`,
      code: {
        java: {
          starterCode: `import java.io.*;
import java.nio.file.*;

public class FileProperties {
    /**
     * Check file properties
     *
     * @param filePath Path to the file
     * @return String with file properties
     * @throws IOException if file operations fail
     */
    public static String getFileProperties(String filePath) throws IOException {
        // TODO: Implement this method
        return "";
    }

    public static void main(String[] args) throws IOException {
        System.out.println(getFileProperties("test.txt"));
    }
}`,
          solution: `import java.io.*;
import java.nio.file.*;
import java.nio.file.attribute.*;

public class FileProperties {

    // Approach 1: Using Files class (Java 7+, recommended)
    public static String getFileProperties(String filePath) throws IOException {
        Path path = Paths.get(filePath);

        StringBuilder sb = new StringBuilder();
        sb.append("Exists: ").append(Files.exists(path)).append("\\n");

        if (Files.exists(path)) {
            sb.append("Size: ").append(Files.size(path)).append(" bytes\\n");
            sb.append("Readable: ").append(Files.isReadable(path)).append("\\n");
            sb.append("Writable: ").append(Files.isWritable(path)).append("\\n");
            sb.append("Regular File: ").append(Files.isRegularFile(path)).append("\\n");
            sb.append("Directory: ").append(Files.isDirectory(path)).append("\\n");
            sb.append("Hidden: ").append(Files.isHidden(path)).append("\\n");
        }

        return sb.toString();
    }

    // Approach 2: Using File class (Traditional)
    public static String getFilePropertiesLegacy(String filePath) {
        File file = new File(filePath);

        StringBuilder sb = new StringBuilder();
        sb.append("Exists: ").append(file.exists()).append("\\n");

        if (file.exists()) {
            sb.append("Size: ").append(file.length()).append(" bytes\\n");
            sb.append("Readable: ").append(file.canRead()).append("\\n");
            sb.append("Writable: ").append(file.canWrite()).append("\\n");
            sb.append("Executable: ").append(file.canExecute()).append("\\n");
            sb.append("Regular File: ").append(file.isFile()).append("\\n");
            sb.append("Directory: ").append(file.isDirectory()).append("\\n");
            sb.append("Hidden: ").append(file.isHidden()).append("\\n");
            sb.append("Absolute Path: ").append(file.getAbsolutePath()).append("\\n");
        }

        return sb.toString();
    }

    // Approach 3: Detailed file attributes
    public static String getDetailedAttributes(String filePath) throws IOException {
        Path path = Paths.get(filePath);

        if (!Files.exists(path)) {
            return "File does not exist";
        }

        BasicFileAttributes attrs = Files.readAttributes(path, BasicFileAttributes.class);

        StringBuilder sb = new StringBuilder();
        sb.append("Creation Time: ").append(attrs.creationTime()).append("\\n");
        sb.append("Last Modified: ").append(attrs.lastModifiedTime()).append("\\n");
        sb.append("Last Access: ").append(attrs.lastAccessTime()).append("\\n");
        sb.append("Size: ").append(attrs.size()).append(" bytes\\n");
        sb.append("Is Directory: ").append(attrs.isDirectory()).append("\\n");
        sb.append("Is Regular File: ").append(attrs.isRegularFile()).append("\\n");
        sb.append("Is Symbolic Link: ").append(attrs.isSymbolicLink()).append("\\n");

        return sb.toString();
    }

    // Utility: Check if file exists and is not empty
    public static boolean isValidFile(String filePath) throws IOException {
        Path path = Paths.get(filePath);
        return Files.exists(path) &&
               Files.isRegularFile(path) &&
               Files.size(path) > 0;
    }

    public static void main(String[] args) throws IOException {
        System.out.println(getFileProperties("test.txt"));
        System.out.println("\\n--- Detailed Attributes ---");
        System.out.println(getDetailedAttributes("test.txt"));
    }
}

/*
Best Practices:
- Use Files class (NIO.2) over File class for modern code
- Always check Files.exists() before accessing properties
- Use appropriate exception handling
- Consider performance when checking many files
- Use BasicFileAttributes for detailed metadata
*/`
        }
      },
      hints: `Use Files.exists(), Files.size(), Files.isReadable(), and Files.isWritable() from java.nio.file.Files.`
    },
    {
      id: 6,
      title: 'Read and Parse CSV File',
      difficulty: 'Medium',
      description: 'Write a Java method that reads a CSV file and returns the data as a list of string arrays.',
      example: `Input: CSV file contains:
Name,Age,City
John,25,NYC
Jane,30,LA

Output: [["Name","Age","City"], ["John","25","NYC"], ["Jane","30","LA"]]`,
      code: {
        java: {
          starterCode: `import java.io.*;
import java.util.*;

public class CSVReader {
    /**
     * Read CSV file and return as list of string arrays
     *
     * @param filePath Path to CSV file
     * @return List of string arrays, each representing a row
     * @throws IOException if file reading fails
     */
    public static List<String[]> readCSV(String filePath) throws IOException {
        // TODO: Implement this method
        return null;
    }

    public static void main(String[] args) throws IOException {
        List<String[]> data = readCSV("data.csv");
        data.forEach(row -> System.out.println(Arrays.toString(row)));
    }
}`,
          solution: `import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.stream.*;

public class CSVReader {

    // Approach 1: Simple CSV reader (handles basic cases)
    public static List<String[]> readCSV(String filePath) throws IOException {
        List<String[]> records = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                String[] values = line.split(",");
                // Trim whitespace from each value
                for (int i = 0; i < values.length; i++) {
                    values[i] = values[i].trim();
                }
                records.add(values);
            }
        }

        return records;
    }

    // Approach 2: Using Files.lines with Stream
    public static List<String[]> readCSVStream(String filePath) throws IOException {
        try (Stream<String> lines = Files.lines(Paths.get(filePath))) {
            return lines
                .map(line -> line.split(","))
                .map(arr -> Arrays.stream(arr)
                    .map(String::trim)
                    .toArray(String[]::new))
                .toList();
        }
    }

    // Approach 3: CSV reader with quoted field support
    public static List<String[]> readCSVWithQuotes(String filePath) throws IOException {
        List<String[]> records = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                List<String> values = parseCSVLine(line);
                records.add(values.toArray(new String[0]));
            }
        }

        return records;
    }

    // Helper: Parse CSV line handling quoted fields
    private static List<String> parseCSVLine(String line) {
        List<String> values = new ArrayList<>();
        boolean inQuotes = false;
        StringBuilder currentValue = new StringBuilder();

        for (int i = 0; i < line.length(); i++) {
            char ch = line.charAt(i);

            if (ch == '"') {
                inQuotes = !inQuotes;
            } else if (ch == ',' && !inQuotes) {
                values.add(currentValue.toString().trim());
                currentValue.setLength(0);
            } else {
                currentValue.append(ch);
            }
        }

        values.add(currentValue.toString().trim());
        return values;
    }

    // Approach 4: Convert to Map for named access
    public static List<Map<String, String>> readCSVAsMap(String filePath) throws IOException {
        List<String[]> records = readCSV(filePath);
        if (records.isEmpty()) {
            return Collections.emptyList();
        }

        String[] headers = records.get(0);
        List<Map<String, String>> result = new ArrayList<>();

        for (int i = 1; i < records.size(); i++) {
            Map<String, String> row = new HashMap<>();
            String[] values = records.get(i);

            for (int j = 0; j < headers.length && j < values.length; j++) {
                row.put(headers[j], values[j]);
            }

            result.add(row);
        }

        return result;
    }

    public static void main(String[] args) throws IOException {
        // Example 1: Read as array
        List<String[]> data = readCSV("data.csv");
        System.out.println("Array format:");
        data.forEach(row -> System.out.println(Arrays.toString(row)));

        // Example 2: Read as map
        System.out.println("\\nMap format:");
        List<Map<String, String>> mapData = readCSVAsMap("data.csv");
        mapData.forEach(System.out::println);
    }
}

/*
Time Complexity: O(n*m) where n is rows, m is columns
Space Complexity: O(n*m) to store all data

Best Practices:
- Handle quoted fields that contain commas
- Trim whitespace from values
- Consider using a library (OpenCSV, Apache Commons CSV) for production
- Handle malformed CSV gracefully
- Consider memory constraints for large files (stream processing)

Note: For production use, consider libraries like:
- OpenCSV
- Apache Commons CSV
- Jackson CSV
These handle edge cases like quoted fields, escaped quotes, etc.
*/`
        }
      },
      hints: `Split each line by comma. For production, consider using a library like OpenCSV to handle quoted fields and edge cases.`
    }
  ]

  const selectProblem = (problem) => {
    setSelectedProblem(problem)
    setCode(problem.code[language]?.starterCode || '')
    setOutput('')
  }

  const showSolution = () => {
    if (selectedProblem && selectedProblem.code[language]) {
      setCode(selectedProblem.code[language].solution)
      setOutput('Solution loaded. Study the code and different approaches!')
    }
  }

  const resetCode = () => {
    if (selectedProblem && selectedProblem.code[language]) {
      setCode(selectedProblem.code[language].starterCode)
      setOutput('Code reset to starter template')
    }
  }

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f0f9ff', minHeight: '100vh' }}>
      {!selectedProblem ? (
        <>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <button
              onClick={onBack}
              style={{
                marginBottom: '2rem',
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              ← Back
            </button>

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h1 style={{ fontSize: '2.5rem', color: '#1f2937', marginBottom: '1rem' }}>
                📁 File I/O Practice
              </h1>
              <p style={{ fontSize: '1.2rem', color: '#4b5563' }}>
                Master Java file operations - reading, writing, and manipulating files
              </p>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' }}>
              {problems.map((problem) => (
                <div
                  key={problem.id}
                  style={{
                    backgroundColor: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onClick={() => selectProblem(problem)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)'
                    e.currentTarget.style.borderColor = '#6366f1'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.borderColor = '#e5e7eb'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.25rem', color: '#1f2937', margin: 0 }}>
                      {problem.id}. {problem.title}
                    </h3>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: problem.difficulty === 'Easy' ? '#dcfce7' : problem.difficulty === 'Medium' ? '#fef3c7' : '#fee2e2',
                      color: problem.difficulty === 'Easy' ? '#166534' : problem.difficulty === 'Medium' ? '#92400e' : '#991b1b'
                    }}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.6', margin: '0.75rem 0' }}>
                    {problem.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <CompletionCheckbox problemId={`File I/O-${problem.id}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <button onClick={() => setSelectedProblem(null)} style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              ← Back to Problems
            </button>
            <button onClick={showSolution} style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              💡 Show Solution
            </button>
            <button onClick={resetCode} style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              🔄 Reset Code
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.75rem', color: '#1f2937', margin: 0 }}>
                  {selectedProblem.title}
                </h2>
                <span style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  backgroundColor: selectedProblem.difficulty === 'Easy' ? '#dcfce7' : selectedProblem.difficulty === 'Medium' ? '#fef3c7' : '#fee2e2',
                  color: selectedProblem.difficulty === 'Easy' ? '#166534' : selectedProblem.difficulty === 'Medium' ? '#92400e' : '#991b1b'
                }}>
                  {selectedProblem.difficulty}
                </span>
              </div>

              <CompletionCheckbox problemId={`File I/O-${selectedProblem.id}`} />

              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>Description</h3>
                <p style={{ fontSize: '1rem', color: '#6b7280', lineHeight: '1.6' }}>
                  {selectedProblem.description}
                </p>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>Example</h3>
                <pre style={{
                  backgroundColor: '#f9fafb',
                  padding: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  overflow: 'auto',
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  {selectedProblem.example}
                </pre>
              </div>

              {selectedProblem.hints && (
                <div style={{ marginTop: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>💡 Hints</h3>
                  <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.6', fontStyle: 'italic' }}>
                    {selectedProblem.hints}
                  </p>
                </div>
              )}
            </div>

            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', border: '2px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '1rem' }}>Code Editor</h3>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{
                  width: '100%',
                  height: '500px',
                  padding: '1rem',
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  resize: 'vertical',
                  lineHeight: '1.5'
                }}
                spellCheck={false}
              />

              {output && (
                <div style={{ marginTop: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.75rem' }}>Output</h3>
                  <pre style={{
                    backgroundColor: '#f9fafb',
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    overflow: 'auto',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    color: '#059669'
                  }}>
                    {output}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FileIO
