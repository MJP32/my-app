# Java Code Execution Server

This server provides a REST API for compiling and executing Java code from the frontend application.

## Prerequisites

You need to have **Java JDK** installed on your system to run this server.

### Installing Java JDK

#### Windows (WSL/Ubuntu)
```bash
# Update package list
sudo apt update

# Install OpenJDK 17 (recommended)
sudo apt install openjdk-17-jdk -y

# Verify installation
java -version
javac -version
```

#### Windows (Native)
1. Download OpenJDK from: https://adoptium.net/
2. Install the JDK
3. Add Java to PATH (usually done automatically by the installer)
4. Verify in Command Prompt: `java -version`

#### macOS
```bash
# Using Homebrew
brew install openjdk@17

# Add to PATH
echo 'export PATH="/usr/local/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# Verify
java -version
```

#### Linux (Debian/Ubuntu)
```bash
sudo apt update
sudo apt install openjdk-17-jdk -y
java -version
```

## Running the Server

1. **Start the server:**
   ```bash
   npm run server
   ```

2. The server will start on `http://localhost:3001`

3. **Keep the server running** while using the Java code execution features in the app

## API Endpoints

### Execute Java Code
- **POST** `/api/execute-java`
- **Body:** `{ "code": "Java code string" }`
- **Response:**
  ```json
  {
    "success": true,
    "output": "Program output",
    "error": "",
    "stage": "complete"
  }
  ```

### Health Check
- **GET** `/api/health`
- **Response:**
  ```json
  {
    "status": "ok",
    "javaVersion": "openjdk version...",
    "javaInstalled": true
  }
  ```

## Security Features

- 10-second timeout for compilation and execution
- Temporary file cleanup after execution
- CORS enabled for frontend communication
- Limited to localhost access

## Troubleshooting

### Server won't start
- Make sure port 3001 is not in use
- Check that Express is installed: `npm install`

### Java errors
- Verify Java is installed: `java -version` and `javac -version`
- Make sure both `java` and `javac` are in your PATH
- On WSL, you may need to restart your terminal after installing Java

### Connection errors in app
- Make sure the server is running (`npm run server`)
- Check that the server is accessible at `http://localhost:3001`
- Verify CORS is enabled in server.js

## Development

To run both the frontend and backend:

```bash
# Terminal 1: Start the backend server
npm run server

# Terminal 2: Start the frontend development server
npm run dev
```

Then navigate to Practice → Java Features → Streams and try running some code!
