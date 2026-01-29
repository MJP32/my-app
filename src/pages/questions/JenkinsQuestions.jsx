import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

function JenkinsQuestions({ onBack, breadcrumb }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
    let colorIndex = 0
    const result = []
    let inCodeBlock = false
    let codeLines = []
    let codeLanguage = 'groovy'

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex]

      // Check for code block start/end
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true
          codeLanguage = line.trim().substring(3) || 'groovy'
          codeLines = []
        } else {
          // End of code block
          inCodeBlock = false
          const codeString = codeLines.join('\n')
          result.push(
            <div key={`code-${lineIndex}`} style={{ margin: '1.5rem 0', textAlign: 'left' }}>
              <SyntaxHighlighter
                language={codeLanguage}
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: '0.5rem',
                  fontSize: '0.9rem',
                  padding: '1rem',
                  textAlign: 'left',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  backgroundColor: '#000000'
                }}
              >
                {codeString}
              </SyntaxHighlighter>
            </div>
          )
          codeLines = []
        }
        continue
      }

      if (inCodeBlock) {
        codeLines.push(line)
        continue
      }

      // Empty lines for spacing
      if (line.trim() === '') {
        result.push(<div key={lineIndex} style={{ height: '0.5rem' }}></div>)
        continue
      }

      // Bullet points (lines starting with -)
      const bulletMatch = line.match(/^(\s*)-\s+(.+)$/)
      if (bulletMatch) {
        const indentLevel = bulletMatch[1].length
        const bulletContent = bulletMatch[2]
        result.push(
          <div
            key={lineIndex}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginLeft: `${indentLevel * 0.5 + 1}rem`,
              marginTop: '0.5rem',
              textAlign: 'left',
              lineHeight: '1.6'
            }}
          >
            <span style={{
              color: '#3b82f6',
              marginRight: '0.5rem',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              lineHeight: '1.4'
            }}>
              •
            </span>
            <span style={{ flex: 1 }}>{bulletContent}</span>
          </div>
        )
        continue
      }

      // Bold section headers (e.g., **Jenkins:**)
      const boldMatch = line.match(/^\*\*(.+?):\*\*/)
      if (boldMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
          <div
            key={lineIndex}
            style={{
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              textAlign: 'left',
              paddingBottom: '0.25rem',
              borderBottom: `2px solid ${color}33`
            }}
          >
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.1rem',
              letterSpacing: '0.02em'
            }}>
              {boldMatch[1]}:
            </span>
            {line.substring(boldMatch[0].length)}
          </div>
        )
        continue
      }

      // Numbered section headers (e.g., **1. Jenkins Master:**)
      const numberedMatch = line.match(/^\*\*(\d+\.\s+.+?):\*\*/)
      if (numberedMatch) {
        const color = colors[colorIndex % colors.length]
        colorIndex++
        result.push(
          <div
            key={lineIndex}
            style={{
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              textAlign: 'left',
              paddingBottom: '0.25rem',
              borderBottom: `2px solid ${color}33`
            }}
          >
            <span style={{
              fontWeight: '700',
              color: color,
              fontSize: '1.1rem',
              letterSpacing: '0.02em'
            }}>
              {numberedMatch[1]}:
            </span>
            {line.substring(numberedMatch[0].length)}
          </div>
        )
        continue
      }

      // Regular text
      result.push(
        <div key={lineIndex} style={{ marginTop: '0.5rem', textAlign: 'left' }}>
          {line}
        </div>
      )
    }

    return result
  }

  const questions = [
    {
      id: 1,
      category: 'Fundamentals',
      difficulty: 'Medium',
      question: 'What is Jenkins and explain its architecture and core components',
      answer: `**Jenkins:**
Open-source automation server for implementing CI/CD pipelines, automating build, test, and deployment processes

**Key Features:**
- Distributed build system
- Extensive plugin ecosystem (1800+ plugins)
- Pipeline as Code (Jenkinsfile)
- Easy installation and configuration
- Master-agent architecture
- Integration with version control systems
- Build scheduling and triggering
- Notification systems

**Architecture Components:**

**1. Jenkins Master:**
\`\`\`
Responsibilities:
- Schedule build jobs
- Dispatch builds to agents
- Monitor agents
- Record and present build results
- Execute build jobs directly (not recommended for production)

Configuration:
- Runs on port 8080 by default
- Stores configuration in JENKINS_HOME
- Manages plugins and system settings
\`\`\`

**2. Jenkins Agent (Slave):**
\`\`\`
Responsibilities:
- Execute build jobs assigned by master
- Run on different operating systems/platforms
- Provide isolated build environments
- Can have specific labels/tags

Types:
- Permanent agents (always available)
- Cloud agents (dynamically provisioned)
- Docker agents (containerized builds)
\`\`\`

**3. Job Types:**

**Freestyle Project:**
\`\`\`groovy
// Simple job configuration via UI
// Build steps:
// - Execute shell
// - Execute Windows batch
// - Invoke Ant/Maven/Gradle
// - Run scripts
\`\`\`

**Pipeline (Jenkinsfile):**
\`\`\`groovy
// Declarative Pipeline
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'mvn clean package'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'mvn test'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh './deploy.sh'
            }
        }
    }
}
\`\`\`

**Multi-branch Pipeline:**
\`\`\`groovy
// Automatically creates pipelines for each branch
// Scans repository for Jenkinsfile
// Creates jobs dynamically
\`\`\`

**4. Directory Structure:**
\`\`\`
JENKINS_HOME/
├── config.xml              # Main configuration
├── jobs/                   # Job configurations
│   └── my-project/
│       ├── config.xml
│       └── builds/
├── nodes/                  # Agent configurations
├── plugins/                # Installed plugins
├── users/                  # User accounts
├── workspace/              # Job workspaces
├── logs/                   # System logs
└── secrets/                # Credentials and secrets
\`\`\`

**5. Build Triggers:**
\`\`\`groovy
// 1. Poll SCM
triggers {
    pollSCM('H/5 * * * *')  // Check every 5 minutes
}

// 2. Webhook (Git push)
triggers {
    githubPush()
}

// 3. Scheduled (Cron)
triggers {
    cron('H 2 * * *')  // Run at 2 AM daily
}

// 4. Upstream/Downstream
triggers {
    upstream(upstreamProjects: 'job1,job2', threshold: hudson.model.Result.SUCCESS)
}

// 5. Manual trigger
// Triggered by user through UI
\`\`\`

**6. Build Environment:**
\`\`\`groovy
pipeline {
    agent any

    environment {
        JAVA_HOME = '/usr/lib/jvm/java-11'
        MAVEN_HOME = '/usr/share/maven'
        PATH = "$MAVEN_HOME/bin:$PATH"
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 1, unit: 'HOURS')
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Build') {
            steps {
                echo "Java Home: $JAVA_HOME"
                sh 'mvn --version'
            }
        }
    }
}
\`\`\`

**7. Plugin Categories:**

**Essential Plugins:**
\`\`\`
- Git Plugin
- Pipeline Plugin
- Docker Plugin
- Credentials Plugin
- Email Extension Plugin
- Blue Ocean (modern UI)
- Role-based Authorization Strategy
- Configuration as Code Plugin
\`\`\`

**Build Tools:**
\`\`\`
- Maven Integration
- Gradle Plugin
- NodeJS Plugin
- Ant Plugin
\`\`\`

**Cloud Integrations:**
\`\`\`
- Kubernetes Plugin
- AWS Steps
- Azure Plugins
- Google Cloud Build
\`\`\`

**8. Credentials Management:**
\`\`\`groovy
pipeline {
    agent any

    stages {
        stage('Deploy') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'github-credentials',
                        usernameVariable: 'GIT_USERNAME',
                        passwordVariable: 'GIT_PASSWORD'
                    )
                ]) {
                    sh 'git push https://$GIT_USERNAME:$GIT_PASSWORD@github.com/repo.git'
                }

                withCredentials([
                    string(credentialsId: 'api-key', variable: 'API_KEY')
                ]) {
                    sh 'curl -H "Authorization: Bearer $API_KEY" https://api.example.com'
                }
            }
        }
    }
}
\`\`\`

**9. Distributed Builds:**
\`\`\`groovy
// Agent with specific label
pipeline {
    agent {
        label 'linux && docker'
    }
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t myapp .'
            }
        }
    }
}

// Multiple agents
pipeline {
    agent none
    stages {
        stage('Build on Linux') {
            agent { label 'linux' }
            steps {
                sh 'mvn clean package'
            }
        }
        stage('Test on Windows') {
            agent { label 'windows' }
            steps {
                bat 'mvn test'
            }
        }
    }
}
\`\`\``
    },
    {
      id: 2,
      category: 'Setup & Installation',
      difficulty: 'Medium',
      question: 'How do you set up and install Jenkins from scratch?',
      answer: `**Jenkins Installation & Setup Guide:**

**1. Installation Methods:**

**Docker (Recommended for Quick Start):**
\`\`\`bash
# Pull official Jenkins image
docker pull jenkins/jenkins:lts

# Run Jenkins container
docker run -d \\
  --name jenkins \\
  -p 8080:8080 \\
  -p 50000:50000 \\
  -v jenkins_home:/var/jenkins_home \\
  jenkins/jenkins:lts

# Get initial admin password
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
\`\`\`

**Docker Compose:**
\`\`\`yaml
# docker-compose.yml
version: '3.8'

services:
  jenkins:
    image: jenkins/jenkins:lts
    container_name: jenkins
    privileged: true
    user: root
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker
    environment:
      - JENKINS_OPTS=--prefix=/jenkins
    restart: unless-stopped

volumes:
  jenkins_home:
    driver: local

# Start Jenkins
# docker-compose up -d
\`\`\`

**Ubuntu/Debian Installation:**
\`\`\`bash
# Add Jenkins repository key
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | \\
  sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null

# Add Jenkins repository
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \\
  https://pkg.jenkins.io/debian-stable binary/ | \\
  sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install Java (required)
sudo apt update
sudo apt install -y openjdk-11-jdk

# Install Jenkins
sudo apt update
sudo apt install -y jenkins

# Start Jenkins service
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Check status
sudo systemctl status jenkins

# Get initial admin password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
\`\`\`

**CentOS/RHEL Installation:**
\`\`\`bash
# Add Jenkins repository
sudo wget -O /etc/yum.repos.d/jenkins.repo \\
  https://pkg.jenkins.io/redhat-stable/jenkins.repo

sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key

# Install Java
sudo yum install -y java-11-openjdk

# Install Jenkins
sudo yum install -y jenkins

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Get initial password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
\`\`\`

**WAR File (Standalone):**
\`\`\`bash
# Download Jenkins WAR
wget https://get.jenkins.io/war-stable/latest/jenkins.war

# Run Jenkins
java -jar jenkins.war --httpPort=8080

# Or with custom settings
java -Xmx2g -Xms512m \\
  -Djenkins.install.runSetupWizard=false \\
  -jar jenkins.war \\
  --httpPort=8080 \\
  --prefix=/jenkins
\`\`\`

**Kubernetes (Helm):**
\`\`\`bash
# Add Jenkins Helm repository
helm repo add jenkins https://charts.jenkins.io
helm repo update

# Create values.yaml
cat <<EOF > jenkins-values.yaml
controller:
  servicePort: 8080
  serviceType: LoadBalancer
  installPlugins:
    - kubernetes:latest
    - workflow-aggregator:latest
    - git:latest
    - configuration-as-code:latest

  JCasC:
    defaultConfig: true
    configScripts:
      welcome-message: |
        jenkins:
          systemMessage: "Jenkins configured automatically by JCasC"

  resources:
    requests:
      cpu: "500m"
      memory: "1Gi"
    limits:
      cpu: "2000m"
      memory: "4Gi"

persistence:
  enabled: true
  size: "20Gi"
  storageClass: "standard"

agent:
  enabled: true
  resources:
    requests:
      cpu: "500m"
      memory: "512Mi"
    limits:
      cpu: "1000m"
      memory: "1Gi"
EOF

# Install Jenkins
helm install jenkins jenkins/jenkins -f jenkins-values.yaml

# Get admin password
kubectl exec --namespace default -it svc/jenkins -c jenkins -- \\
  /bin/cat /run/secrets/additional/chart-admin-password
\`\`\`

**2. Initial Setup Wizard:**

**Step-by-Step Configuration:**
\`\`\`
1. Access Jenkins:
   http://localhost:8080

2. Unlock Jenkins:
   - Enter initial admin password
   - Location: /var/jenkins_home/secrets/initialAdminPassword

3. Customize Jenkins:
   Option A: Install suggested plugins (recommended)
   - Git
   - Pipeline
   - Docker
   - Credentials
   - SSH Build Agents
   - Email Extension

   Option B: Select plugins manually

4. Create First Admin User:
   - Username: admin
   - Password: [secure-password]
   - Full name: Jenkins Admin
   - Email: admin@example.com

5. Instance Configuration:
   - Jenkins URL: http://jenkins.example.com:8080
   - System Admin Email: admin@example.com

6. Start Using Jenkins!
\`\`\`

**3. Post-Installation Configuration:**

**Configure System Settings:**
\`\`\`groovy
// Via Configuration as Code (JCasC)
// jenkins.yaml

jenkins:
  systemMessage: "Production Jenkins Server"
  numExecutors: 0  # Don't run builds on master
  mode: EXCLUSIVE
  scmCheckoutRetryCount: 2

  securityRealm:
    local:
      allowsSignup: false
      users:
        - id: "admin"
          password: "\${ADMIN_PASSWORD}"

  authorizationStrategy:
    roleBased:
      roles:
        global:
          - name: "admin"
            permissions:
              - "Overall/Administer"
            assignments:
              - "admin"
          - name: "developer"
            permissions:
              - "Overall/Read"
              - "Job/Build"
              - "Job/Configure"
              - "Job/Read"
            assignments:
              - "developers"

unclassified:
  location:
    url: "https://jenkins.example.com/"
    adminAddress: "admin@example.com"

  globalLibraries:
    libraries:
      - name: "shared-library"
        defaultVersion: "main"
        retriever:
          modernSCM:
            scm:
              git:
                remote: "https://github.com/company/jenkins-shared-library.git"

credentials:
  system:
    domainCredentials:
      - credentials:
          - usernamePassword:
              scope: GLOBAL
              id: "github-credentials"
              username: "jenkins-bot"
              password: "\${GITHUB_TOKEN}"
          - string:
              scope: GLOBAL
              id: "api-key"
              secret: "\${API_KEY}"

tool:
  git:
    installations:
      - name: "Default"
        home: "git"

  maven:
    installations:
      - name: "Maven-3.8.1"
        properties:
          - installSource:
              installers:
                - maven:
                    id: "3.8.1"

  jdk:
    installations:
      - name: "JDK-11"
        home: "/usr/lib/jvm/java-11-openjdk"
      - name: "JDK-17"
        home: "/usr/lib/jvm/java-17-openjdk"
\`\`\`

**4. Setting Up Build Agents:**

**SSH Agent Setup:**
\`\`\`bash
# On agent machine
# 1. Install Java
sudo apt install -y openjdk-11-jdk

# 2. Create jenkins user
sudo useradd -m -s /bin/bash jenkins
sudo mkdir -p /home/jenkins/.ssh
sudo chown -R jenkins:jenkins /home/jenkins

# 3. Copy master's SSH key
sudo -u jenkins ssh-keygen -t rsa -N "" -f /home/jenkins/.ssh/id_rsa
# Copy public key to master

# On Jenkins Master:
# Manage Jenkins → Nodes → New Node
\`\`\`

**Agent Configuration (JCasC):**
\`\`\`groovy
jenkins:
  nodes:
    - permanent:
        name: "linux-agent-1"
        remoteFS: "/home/jenkins"
        launcher:
          ssh:
            host: "10.0.1.100"
            port: 22
            credentialsId: "agent-ssh-key"
            sshHostKeyVerificationStrategy:
              manuallyTrustedKeyVerificationStrategy:
                requireInitialManualTrust: false
        numExecutors: 4
        labelString: "linux docker maven"
        nodeProperties:
          - envVars:
              env:
                - key: "JAVA_HOME"
                  value: "/usr/lib/jvm/java-11-openjdk"

    - permanent:
        name: "windows-agent-1"
        remoteFS: "C:\\Jenkins"
        launcher:
          jnlp:
            workDirSettings:
              disabled: false
              failIfWorkDirIsMissing: false
              internalDir: "remoting"
        numExecutors: 2
        labelString: "windows dotnet"
\`\`\`

**Docker Agent (Dynamic):**
\`\`\`groovy
// Configure Docker Cloud
unclassified:
  dockerCloud:
    clouds:
      - docker:
          name: "docker-cloud"
          dockerApi:
            dockerHost:
              uri: "unix:///var/run/docker.sock"
          templates:
            - labelString: "docker-maven"
              dockerTemplateBase:
                image: "maven:3.8.1-jdk-11"
                pullCredentialsId: "docker-credentials"
              remoteFs: "/home/jenkins"
              connector:
                attach:
                  user: "jenkins"
              instanceCapStr: "10"
              retentionStrategy:
                idleMinutes: 5
\`\`\`

**5. Creating Your First Job:**

**Freestyle Job:**
\`\`\`
1. Dashboard → New Item
2. Name: "my-first-job"
3. Type: Freestyle project
4. Source Code Management:
   - Git
   - Repository URL: https://github.com/user/repo.git
   - Credentials: github-credentials
   - Branch: */main

5. Build Triggers:
   - Poll SCM: H/5 * * * *
   - GitHub hook trigger

6. Build Steps:
   - Execute shell:
     #!/bin/bash
     mvn clean package
     echo "Build completed!"

7. Post-build Actions:
   - Archive artifacts: target/*.jar
   - Email notification

8. Save and Build Now
\`\`\`

**Pipeline Job (Recommended):**
\`\`\`groovy
// Create Jenkinsfile in repository root
pipeline {
    agent any

    tools {
        maven 'Maven-3.8.1'
        jdk 'JDK-11'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying application...'
                sh './deploy.sh'
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
            emailext (
                subject: "FAILED: \${env.JOB_NAME}",
                body: "Build failed: \${env.BUILD_URL}",
                to: "team@example.com"
            )
        }
    }
}

// In Jenkins:
// 1. New Item → Pipeline
// 2. Pipeline Definition: Pipeline script from SCM
// 3. SCM: Git
// 4. Repository URL: https://github.com/user/repo.git
// 5. Script Path: Jenkinsfile
// 6. Save
\`\`\`

**6. Essential Plugins to Install:**

\`\`\`bash
# Via CLI
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:password install-plugin \\
  git \\
  pipeline-stage-view \\
  docker-workflow \\
  kubernetes \\
  blueocean \\
  credentials-binding \\
  email-ext \\
  slack \\
  ansicolor \\
  timestamper \\
  build-timeout \\
  ws-cleanup \\
  ssh-agent \\
  github-branch-source \\
  configuration-as-code

# Restart Jenkins
java -jar jenkins-cli.jar -s http://localhost:8080/ \\
  -auth admin:password safe-restart
\`\`\`

**7. Security Hardening:**

\`\`\`bash
# Enable CSRF protection
# Enable agent-to-master security
# Disable CLI over remoting
# Enable markup formatter (Safe HTML)

# Configure firewall
sudo ufw allow 8080/tcp
sudo ufw allow 50000/tcp
sudo ufw enable

# SSL/TLS setup with nginx reverse proxy
sudo apt install -y nginx

# /etc/nginx/sites-available/jenkins
server {
    listen 80;
    server_name jenkins.example.com;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name jenkins.example.com;

    ssl_certificate /etc/ssl/certs/jenkins.crt;
    ssl_certificate_key /etc/ssl/private/jenkins.key;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
\`\`\`

**8. Backup Strategy:**

\`\`\`bash
#!/bin/bash
# backup-jenkins.sh

JENKINS_HOME=/var/lib/jenkins
BACKUP_DIR=/backup/jenkins
DATE=\$(date +%Y%m%d_%H%M%S)

# Stop Jenkins
sudo systemctl stop jenkins

# Create backup
tar -czf \$BACKUP_DIR/jenkins-backup-\$DATE.tar.gz \\
    \$JENKINS_HOME/config.xml \\
    \$JENKINS_HOME/jobs/ \\
    \$JENKINS_HOME/users/ \\
    \$JENKINS_HOME/plugins/ \\
    \$JENKINS_HOME/secrets/ \\
    \$JENKINS_HOME/credentials.xml

# Start Jenkins
sudo systemctl start jenkins

# Upload to S3
aws s3 cp \$BACKUP_DIR/jenkins-backup-\$DATE.tar.gz \\
    s3://jenkins-backups/

# Keep only last 7 days
find \$BACKUP_DIR -name "jenkins-backup-*.tar.gz" -mtime +7 -delete

# Schedule: crontab -e
# 0 2 * * * /usr/local/bin/backup-jenkins.sh
\`\`\`

**9. Monitoring & Maintenance:**

\`\`\`bash
# Check disk space
df -h /var/lib/jenkins

# Monitor logs
sudo journalctl -u jenkins -f

# Clean workspace
# Manage Jenkins → Manage Old Data

# Update plugins
# Dashboard → Manage Jenkins → Plugin Manager → Updates

# Health check endpoint
curl http://localhost:8080/login

# Prometheus metrics (if plugin installed)
curl http://localhost:8080/prometheus/
\`\`\`

**10. Troubleshooting Common Issues:**

\`\`\`
Issue: Jenkins won't start
Solution:
- Check Java version: java -version
- Check logs: sudo journalctl -u jenkins -n 100
- Verify port not in use: sudo lsof -i :8080
- Check disk space: df -h

Issue: Out of memory
Solution:
- Increase JVM heap:
  JAVA_OPTS="-Xmx4g -Xms1g"

Issue: Slow performance
Solution:
- Don't run builds on master
- Add more agents
- Clean old builds
- Increase executors on agents

Issue: Plugin conflicts
Solution:
- Update all plugins
- Check plugin compatibility
- Disable conflicting plugins
- Use Plugin Manager to resolve

Issue: Agent offline
Solution:
- Check network connectivity
- Verify SSH credentials
- Check agent logs
- Restart agent service
\`\`\``
    },
    {
      id: 3,
      category: 'Pipeline Syntax',
      difficulty: 'Hard',
      question: 'Explain Jenkins Pipeline syntax with declarative and scripted pipelines',
      answer: `**Jenkins Pipeline Syntax:**

**1. Declarative Pipeline:**

**Basic Structure:**
\`\`\`groovy
pipeline {
    agent any

    environment {
        APP_NAME = 'my-application'
        VERSION = '1.0.0'
    }

    parameters {
        string(name: 'BRANCH', defaultValue: 'main', description: 'Branch to build')
        choice(name: 'ENVIRONMENT', choices: ['dev', 'staging', 'prod'], description: 'Deployment environment')
        booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Run tests?')
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        timeout(time: 1, unit: 'HOURS')
        disableConcurrentBuilds()
        skipDefaultCheckout()
    }

    triggers {
        cron('H 2 * * 1-5')  // Weekdays at 2 AM
        pollSCM('H/15 * * * *')  // Every 15 minutes
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo "Building $APP_NAME version $VERSION"
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('Test') {
            when {
                expression { params.RUN_TESTS == true }
            }
            steps {
                sh 'mvn test'
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo "Deploying to $params.ENVIRONMENT"
                sh "./deploy.sh $params.ENVIRONMENT"
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
            emailext(
                subject: "SUCCESS: Job '\${env.JOB_NAME} [\${env.BUILD_NUMBER}]'",
                body: "Build succeeded!",
                to: 'team@example.com'
            )
        }
        failure {
            echo 'Pipeline failed!'
            emailext(
                subject: "FAILURE: Job '\${env.JOB_NAME} [\${env.BUILD_NUMBER}]'",
                body: "Build failed. Check console output.",
                to: 'team@example.com'
            )
        }
        always {
            cleanWs()
        }
    }
}
\`\`\`

**2. Agent Configurations:**
\`\`\`groovy
// Any available agent
agent any

// No agent at pipeline level
agent none

// Specific label
agent {
    label 'linux && docker'
}

// Docker agent
agent {
    docker {
        image 'maven:3.8.1-jdk-11'
        args '-v $HOME/.m2:/root/.m2'
    }
}

// Kubernetes agent
agent {
    kubernetes {
        yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: maven
    image: maven:3.8.1-jdk-11
    command: ['cat']
    tty: true
'''
    }
}

// Node agent
agent {
    node {
        label 'my-agent'
        customWorkspace '/custom/workspace'
    }
}
\`\`\`

**3. Advanced Stage Features:**
\`\`\`groovy
pipeline {
    agent any

    stages {
        // Parallel stages
        stage('Parallel Tests') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'mvn test'
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'mvn verify -Pintegration'
                    }
                }
                stage('Security Scan') {
                    steps {
                        sh 'dependency-check.sh'
                    }
                }
            }
        }

        // Sequential stages with when conditions
        stage('Deploy to Dev') {
            when {
                branch 'develop'
            }
            steps {
                sh './deploy.sh dev'
            }
        }

        stage('Deploy to Staging') {
            when {
                allOf {
                    branch 'main'
                    environment name: 'DEPLOY_STAGING', value: 'true'
                }
            }
            steps {
                input message: 'Deploy to staging?', ok: 'Deploy'
                sh './deploy.sh staging'
            }
        }

        stage('Deploy to Production') {
            when {
                allOf {
                    branch 'main'
                    tag pattern: "v\\d+\\.\\d+\\.\\d+", comparator: "REGEXP"
                }
            }
            steps {
                input message: 'Deploy to production?', ok: 'Deploy', submitter: 'admin'
                milestone(1)
                lock(resource: 'production-deployment') {
                    sh './deploy.sh production'
                }
            }
        }
    }
}
\`\`\`

**4. Scripted Pipeline:**
\`\`\`groovy
node('linux') {
    def mvnHome = tool 'Maven-3.8.1'
    def gitCommit

    try {
        stage('Checkout') {
            checkout scm
            gitCommit = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
        }

        stage('Build') {
            withEnv(["PATH+MAVEN=\${mvnHome}/bin"]) {
                sh 'mvn clean package -DskipTests'
            }
        }

        stage('Test') {
            parallel(
                'Unit Tests': {
                    sh 'mvn test'
                },
                'Integration Tests': {
                    sh 'mvn verify -Pintegration'
                }
            )
        }

        stage('Archive') {
            archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
        }

        stage('Deploy') {
            if (env.BRANCH_NAME == 'main') {
                timeout(time: 5, unit: 'MINUTES') {
                    input message: 'Deploy to production?', ok: 'Deploy'
                }
                sh "./deploy.sh production"
            }
        }

        currentBuild.result = 'SUCCESS'

    } catch (Exception e) {
        currentBuild.result = 'FAILURE'
        throw e
    } finally {
        stage('Cleanup') {
            cleanWs()
        }

        // Send notifications
        def status = currentBuild.result ?: 'SUCCESS'
        emailext(
            subject: "\${status}: \${env.JOB_NAME} [\${env.BUILD_NUMBER}]",
            body: "Commit: \${gitCommit}\\nStatus: \${status}",
            to: 'team@example.com'
        )
    }
}
\`\`\`

**5. Shared Libraries:**
\`\`\`groovy
// vars/buildMaven.groovy
def call(Map config = [:]) {
    pipeline {
        agent any
        stages {
            stage('Build') {
                steps {
                    sh "mvn clean package \${config.skipTests ? '-DskipTests' : ''}"
                }
            }
        }
    }
}

// Jenkinsfile
@Library('my-shared-library') _
buildMaven(skipTests: false)
\`\`\`

**6. Docker Integration:**
\`\`\`groovy
pipeline {
    agent {
        docker {
            image 'maven:3.8.1-jdk-11'
            args '-v /root/.m2:/root/.m2'
        }
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    def app = docker.build("myapp:\${env.BUILD_ID}")
                    app.push()
                    app.push('latest')
                }
            }
        }

        stage('Run Tests in Container') {
            steps {
                script {
                    docker.image("myapp:\${env.BUILD_ID}").inside {
                        sh 'mvn test'
                    }
                }
            }
        }
    }
}
\`\`\`

**7. Matrix/Combination Builds:**
\`\`\`groovy
pipeline {
    agent none
    stages {
        stage('Test') {
            matrix {
                agent any
                axes {
                    axis {
                        name 'PLATFORM'
                        values 'linux', 'windows', 'mac'
                    }
                    axis {
                        name 'JAVA_VERSION'
                        values '11', '17', '21'
                    }
                }
                stages {
                    stage('Build and Test') {
                        steps {
                            echo "Building on \${PLATFORM} with Java \${JAVA_VERSION}"
                            sh "mvn clean test -Djava.version=\${JAVA_VERSION}"
                        }
                    }
                }
            }
        }
    }
}
\`\`\``
    },
    {
      id: 4,
      category: 'Integration',
      difficulty: 'Medium',
      question: 'How do you integrate Jenkins with Git, Docker, and deployment platforms?',
      answer: `**Jenkins Integrations:**

**1. Git Integration:**

**Jenkinsfile with Git:**
\`\`\`groovy
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout from SCM
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/user/repo.git',
                        credentialsId: 'github-credentials'
                    ]]
                ])

                // Or simply
                checkout scm

                // Get commit info
                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: "git rev-parse --short HEAD",
                        returnStdout: true
                    ).trim()
                    env.GIT_AUTHOR = sh(
                        script: "git log -1 --pretty=%an",
                        returnStdout: true
                    ).trim()
                }
            }
        }

        stage('Build') {
            steps {
                echo "Building commit: \${env.GIT_COMMIT_SHORT}"
                echo "Author: \${env.GIT_AUTHOR}"
            }
        }
    }
}
\`\`\`

**GitHub Webhook Configuration:**
\`\`\`groovy
// 1. Install GitHub Plugin
// 2. Configure webhook in GitHub:
//    Payload URL: http://jenkins.example.com/github-webhook/
//    Content type: application/json
//    Events: Push events, Pull requests

pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
    }

    post {
        success {
            // Update commit status
            githubNotify(
                status: 'SUCCESS',
                description: 'Build succeeded',
                context: 'continuous-integration/jenkins'
            )
        }
        failure {
            githubNotify(
                status: 'FAILURE',
                description: 'Build failed',
                context: 'continuous-integration/jenkins'
            )
        }
    }
}
\`\`\`

**Pull Request Builder:**
\`\`\`groovy
pipeline {
    agent any

    stages {
        stage('PR Validation') {
            when {
                changeRequest()
            }
            steps {
                echo "Validating PR #\${env.CHANGE_ID}"
                echo "Target branch: \${env.CHANGE_TARGET}"
                echo "Source branch: \${env.CHANGE_BRANCH}"

                sh 'mvn clean verify'
            }
        }
    }

    post {
        always {
            script {
                if (env.CHANGE_ID) {
                    pullRequest.comment("Build #\${env.BUILD_NUMBER} completed")
                }
            }
        }
    }
}
\`\`\`

**2. Docker Integration:**

**Build and Push Docker Image:**
\`\`\`groovy
pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_IMAGE = 'mycompany/myapp'
        DOCKER_CREDENTIALS = credentials('docker-hub-credentials')
    }

    stages {
        stage('Build Application') {
            agent {
                docker {
                    image 'maven:3.8.1-jdk-11'
                    args '-v $HOME/.m2:/root/.m2'
                }
            }
            steps {
                sh 'mvn clean package -DskipTests'
                stash includes: 'target/*.jar', name: 'app'
            }
        }

        stage('Build Docker Image') {
            steps {
                unstash 'app'
                script {
                    def app = docker.build(
                        "\${DOCKER_IMAGE}:\${env.BUILD_NUMBER}",
                        "--build-arg JAR_FILE=target/*.jar ."
                    )

                    docker.withRegistry("https://\${DOCKER_REGISTRY}", 'docker-hub-credentials') {
                        app.push("\${env.BUILD_NUMBER}")
                        app.push('latest')
                    }
                }
            }
        }

        stage('Run Tests in Container') {
            steps {
                script {
                    docker.image("\${DOCKER_IMAGE}:\${env.BUILD_NUMBER}").inside {
                        sh './run-tests.sh'
                    }
                }
            }
        }

        stage('Security Scan') {
            steps {
                script {
                    sh "docker scan \${DOCKER_IMAGE}:\${env.BUILD_NUMBER}"
                }
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f'
        }
    }
}
\`\`\`

**Docker Compose Integration:**
\`\`\`groovy
pipeline {
    agent any

    stages {
        stage('Start Services') {
            steps {
                sh 'docker-compose up -d'
                sh 'docker-compose ps'
            }
        }

        stage('Integration Tests') {
            steps {
                sh 'docker-compose exec -T app mvn verify'
            }
        }
    }

    post {
        always {
            sh 'docker-compose logs'
            sh 'docker-compose down -v'
        }
    }
}
\`\`\`

**3. Kubernetes Deployment:**
\`\`\`groovy
pipeline {
    agent any

    environment {
        KUBECONFIG = credentials('kubernetes-config')
        NAMESPACE = 'production'
        APP_NAME = 'my-application'
    }

    stages {
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh """
                        kubectl --kubeconfig=\${KUBECONFIG} \
                            set image deployment/\${APP_NAME} \
                            \${APP_NAME}=\${DOCKER_IMAGE}:\${env.BUILD_NUMBER} \
                            -n \${NAMESPACE}
                    """

                    sh """
                        kubectl --kubeconfig=\${KUBECONFIG} \
                            rollout status deployment/\${APP_NAME} \
                            -n \${NAMESPACE} \
                            --timeout=300s
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                sh """
                    kubectl --kubeconfig=\${KUBECONFIG} \
                        get pods -n \${NAMESPACE} \
                        -l app=\${APP_NAME}
                """
            }
        }
    }

    post {
        failure {
            sh """
                kubectl --kubeconfig=\${KUBECONFIG} \
                    rollout undo deployment/\${APP_NAME} \
                    -n \${NAMESPACE}
            """
        }
    }
}
\`\`\`

**4. AWS Deployment:**
\`\`\`groovy
pipeline {
    agent any

    environment {
        AWS_CREDENTIALS = credentials('aws-credentials')
        AWS_REGION = 'us-east-1'
        ECR_REGISTRY = '123456789.dkr.ecr.us-east-1.amazonaws.com'
    }

    stages {
        stage('Push to ECR') {
            steps {
                script {
                    sh """
                        aws ecr get-login-password --region \${AWS_REGION} | \
                        docker login --username AWS --password-stdin \${ECR_REGISTRY}
                    """

                    sh """
                        docker tag \${DOCKER_IMAGE}:\${env.BUILD_NUMBER} \
                            \${ECR_REGISTRY}/myapp:\${env.BUILD_NUMBER}
                    """

                    sh "docker push \${ECR_REGISTRY}/myapp:\${env.BUILD_NUMBER}"
                }
            }
        }

        stage('Deploy to ECS') {
            steps {
                sh """
                    aws ecs update-service \
                        --cluster my-cluster \
                        --service my-service \
                        --force-new-deployment \
                        --region \${AWS_REGION}
                """
            }
        }

        stage('Deploy to Elastic Beanstalk') {
            steps {
                sh """
                    aws elasticbeanstalk create-application-version \
                        --application-name myapp \
                        --version-label \${env.BUILD_NUMBER} \
                        --source-bundle S3Bucket=mybucket,S3Key=app.zip

                    aws elasticbeanstalk update-environment \
                        --application-name myapp \
                        --environment-name production \
                        --version-label \${env.BUILD_NUMBER}
                """
            }
        }
    }
}
\`\`\`

**5. Notification Integration:**
\`\`\`groovy
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
    }

    post {
        success {
            // Slack notification
            slackSend(
                color: 'good',
                message: "Build #\${env.BUILD_NUMBER} succeeded",
                channel: '#ci-cd',
                tokenCredentialId: 'slack-token'
            )

            // Email notification
            emailext(
                subject: "SUCCESS: \${env.JOB_NAME} #\${env.BUILD_NUMBER}",
                body: """
                    Build succeeded!

                    Job: \${env.JOB_NAME}
                    Build: \${env.BUILD_NUMBER}
                    URL: \${env.BUILD_URL}
                """,
                to: 'team@example.com',
                attachLog: true
            )

            // Teams notification
            office365ConnectorSend(
                webhookUrl: 'https://outlook.office.com/webhook/...',
                status: 'Success',
                message: "Build #\${env.BUILD_NUMBER} succeeded"
            )
        }

        failure {
            slackSend(
                color: 'danger',
                message: "Build #\${env.BUILD_NUMBER} failed",
                channel: '#ci-cd'
            )
        }
    }
}
\`\`\``
    },
    {
      id: 5,
      category: 'Best Practices',
      difficulty: 'Medium',
      question: 'What are Jenkins best practices for security, performance, and maintenance?',
      answer: `**Jenkins Best Practices:**

**1. Security Best Practices:**

**Enable Security:**
\`\`\`groovy
// Configuration as Code (JCasC)
jenkins:
  securityRealm:
    local:
      allowsSignup: false
      users:
        - id: admin
          password: \${ADMIN_PASSWORD}
  authorizationStrategy:
    roleBased:
      roles:
        global:
          - name: "admin"
            permissions:
              - "Overall/Administer"
            assignments:
              - "admin"
          - name: "developer"
            permissions:
              - "Overall/Read"
              - "Job/Build"
              - "Job/Read"
            assignments:
              - "developers"
\`\`\`

**Credentials Management:**
\`\`\`groovy
credentials:
  system:
    domainCredentials:
      - credentials:
          - usernamePassword:
              scope: GLOBAL
              id: "github-credentials"
              username: "user"
              password: "\${GITHUB_TOKEN}"
          - string:
              scope: GLOBAL
              id: "api-key"
              secret: "\${API_KEY}"
          - file:
              scope: GLOBAL
              id: "kubeconfig"
              fileName: "kubeconfig"
              secretBytes: "\${base64:\${KUBECONFIG}}"

// Use in pipeline
pipeline {
    agent any
    stages {
        stage('Deploy') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'github-credentials',
                        usernameVariable: 'USER',
                        passwordVariable: 'PASS'
                    )
                ]) {
                    sh 'git push https://$USER:$PASS@github.com/repo.git'
                }
            }
        }
    }
}
\`\`\`

**CSRF Protection:**
\`\`\`groovy
security:
  globalJobDslSecurityConfiguration:
    useScriptSecurity: true
  sSHD:
    port: -1
  csrf:
    defaultCrumbIssuer:
      enabled: true
      proxyCompatability: true
\`\`\`

**2. Performance Optimization:**

**Master-Agent Architecture:**
\`\`\`groovy
// Don't run builds on master
pipeline {
    agent {
        label 'build-agent'  // Use specific agents
    }
    stages {
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
    }
}

// Configure agents efficiently
jenkins:
  nodes:
    - permanent:
        name: "linux-agent-1"
        remoteFS: "/home/jenkins"
        launcher:
          ssh:
            host: "agent1.example.com"
            credentialsId: "ssh-key"
        numExecutors: 4
        labelString: "linux docker maven"
\`\`\`

**Build Optimization:**
\`\`\`groovy
pipeline {
    agent any

    options {
        // Discard old builds
        buildDiscarder(logRotator(
            numToKeepStr: '10',
            artifactNumToKeepStr: '5'
        ))

        // Disable concurrent builds
        disableConcurrentBuilds()

        // Timeout
        timeout(time: 1, unit: 'HOURS')

        // Skip default checkout
        skipDefaultCheckout()
    }

    stages {
        stage('Checkout') {
            steps {
                // Shallow clone
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    extensions: [
                        [$class: 'CloneOption', depth: 1, shallow: true]
                    ],
                    userRemoteConfigs: [[url: 'https://github.com/user/repo.git']]
                ])
            }
        }

        stage('Build') {
            steps {
                // Use build cache
                sh 'mvn clean package -Dmaven.repo.local=$WORKSPACE/.m2'
            }
        }
    }
}
\`\`\`

**Parallel Execution:**
\`\`\`groovy
pipeline {
    agent none

    stages {
        stage('Parallel Tests') {
            parallel {
                stage('Unit Tests') {
                    agent { label 'test-agent-1' }
                    steps {
                        sh 'mvn test'
                    }
                }
                stage('Integration Tests') {
                    agent { label 'test-agent-2' }
                    steps {
                        sh 'mvn verify -Pintegration'
                    }
                }
                stage('Security Scan') {
                    agent { label 'test-agent-3' }
                    steps {
                        sh 'dependency-check.sh'
                    }
                }
            }
        }
    }
}
\`\`\`

**3. Pipeline Best Practices:**

**Modular Pipeline:**
\`\`\`groovy
// vars/standardPipeline.groovy
def call(Map config) {
    pipeline {
        agent any

        stages {
            stage('Checkout') {
                steps {
                    checkout scm
                }
            }

            stage('Build') {
                steps {
                    script {
                        if (config.buildTool == 'maven') {
                            sh 'mvn clean package'
                        } else if (config.buildTool == 'gradle') {
                            sh './gradlew build'
                        }
                    }
                }
            }

            stage('Test') {
                when {
                    expression { config.runTests }
                }
                steps {
                    sh 'mvn test'
                }
            }

            stage('Deploy') {
                when {
                    branch 'main'
                }
                steps {
                    sh "./deploy.sh \${config.environment}"
                }
            }
        }
    }
}

// Jenkinsfile
@Library('shared-library') _
standardPipeline(
    buildTool: 'maven',
    runTests: true,
    environment: 'production'
)
\`\`\`

**Error Handling:**
\`\`\`groovy
pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    try {
                        sh 'mvn clean package'
                    } catch (Exception e) {
                        currentBuild.result = 'FAILURE'
                        error("Build failed: \${e.message}")
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                retry(3) {
                    sh './deploy.sh'
                }
            }
        }
    }

    post {
        failure {
            script {
                def logContent = currentBuild.rawBuild.getLog(100).join('\\n')
                emailext(
                    subject: "Build Failed: \${env.JOB_NAME}",
                    body: "Logs:\\n\${logContent}",
                    to: 'team@example.com'
                )
            }
        }
    }
}
\`\`\`

**4. Maintenance:**

**Backup Configuration:**
\`\`\`bash
#!/bin/bash
# Backup Jenkins home
JENKINS_HOME=/var/lib/jenkins
BACKUP_DIR=/backup/jenkins/$(date +%Y%m%d)

mkdir -p $BACKUP_DIR

# Backup configurations
tar -czf $BACKUP_DIR/config.tar.gz \
    $JENKINS_HOME/*.xml \
    $JENKINS_HOME/jobs \
    $JENKINS_HOME/users \
    $JENKINS_HOME/plugins/*.jpi \
    $JENKINS_HOME/secrets

# Backup to S3
aws s3 cp $BACKUP_DIR/config.tar.gz s3://jenkins-backups/
\`\`\`

**Plugin Management:**
\`\`\`groovy
// plugins.txt
git:4.11.0
pipeline-stage-view:2.24
docker-workflow:1.28
kubernetes:3600.v144b_cd192ca_a_
blueocean:1.25.3

// Install via CLI
java -jar jenkins-cli.jar -s http://jenkins:8080/ \
    install-plugin $(cat plugins.txt | cut -d: -f1)

// Configuration as Code
jenkins:
  systemMessage: "Jenkins configured automatically"

unclassified:
  location:
    url: https://jenkins.example.com/
    adminAddress: admin@example.com
\`\`\`

**Monitoring:**
\`\`\`groovy
// Prometheus metrics
prometheus:
  path: /prometheus

// Health checks
pipeline {
    agent any
    triggers {
        cron('H/15 * * * *')
    }
    stages {
        stage('Health Check') {
            steps {
                sh 'curl -f http://localhost:8080/login || exit 1'
            }
        }
    }
}
\`\`\`

**5. Comparison with TeamCity:**
\`\`\`
Jenkins:
✓ Open source and free
✓ Huge plugin ecosystem
✓ Flexible pipeline as code
✓ Large community
✗ Requires more configuration
✗ UI can be dated
✗ Manual plugin management

TeamCity:
✓ Better UI/UX out of box
✓ Excellent build chain features
✓ Built-in test reporting
✓ Professional support
✗ Costly for large teams
✗ Less flexible than Jenkins
✗ Smaller plugin ecosystem
\`\`\``
    }
  ]

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Fundamentals': '#ef4444',
      'Pipeline Syntax': '#3b82f6',
      'Integration': '#7c3aed',
      'Best Practices': '#10b981'
    }
    return colors[category] || '#6b7280'
  }

  const getDifficultyColor = (difficulty) => {
    return difficulty === 'Medium' ? '#f59e0b' : '#dc2626'
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
          textAlign: 'left',
            fontWeight: '600',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          ← Back to Questions
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#93c5fd',
          margin: 0
        }}>
          Jenkins Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Comprehensive Jenkins questions covering CI/CD, pipelines, integrations, and best practices.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {questions.map((q) => (
          <div
            key={q.id}
            style={{
              background: 'linear-gradient(to bottom right, #1f2937, #111827)',
              borderRadius: '12px',
              border: `3px solid ${expandedQuestion === q.id ? getCategoryColor(q.category) : '#374151'}`,
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: expandedQuestion === q.id
                ? '0 8px 16px rgba(0,0,0,0.1)'
                : '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >
            <button
              onClick={() => toggleQuestion(q.id)}
              style={{
                width: '100%',
                padding: '1.5rem',
                backgroundColor: expandedQuestion === q.id
                  ? `${getCategoryColor(q.category)}15`
                  : 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = '#374151'
                }
              }}
              onMouseLeave={(e) => {
                if (expandedQuestion !== q.id) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', textAlign: 'left' }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: getCategoryColor(q.category),
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {q.category}
                  </div>
                  <div style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    backgroundColor: getDifficultyColor(q.difficulty),
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {q.difficulty}
                  </div>
                </div>
                <h3 style={{
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  color: '#e2e8f0',
                  margin: 0
                }}>
                  Q{q.id}. {q.question}
                </h3>
              </div>
              <div style={{
                fontSize: '1.5rem',
                color: getCategoryColor(q.category),
                fontWeight: 'bold',
                marginLeft: '1rem',
                transform: expandedQuestion === q.id ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}>
                ▼
              </div>
            </button>

            {expandedQuestion === q.id && (
              <div style={{
                padding: '1.5rem',
                backgroundColor: '#1e293b',
                borderTop: `2px solid ${getCategoryColor(q.category)}40`
              }}>
                <div style={{
                  fontSize: '1rem',
          textAlign: 'left',
                  lineHeight: '1.8',
                  color: '#d1d5db',
                  fontFamily: 'system-ui, -apple-system, sans-serif',

                }}>
                  {renderFormattedAnswer(q.answer)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        borderRadius: '12px',
        border: '2px solid #6366f1'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#a5b4fc', marginBottom: '0.5rem', textAlign: 'left' }}>
          Jenkins Best Practices
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Use Pipeline as Code (Jenkinsfile) for all projects</li>
          <li>Don't run builds on Jenkins master - use dedicated agents</li>
          <li>Implement proper credential management and security</li>
          <li>Use shared libraries for common pipeline logic</li>
          <li>Set up distributed builds with labeled agents</li>
          <li>Regularly backup Jenkins configuration and jobs</li>
          <li>Monitor Jenkins performance and clean up old builds</li>
          <li>Use declarative pipelines for better readability</li>
        </ul>
      </div>
    </div>
  )
}

export default JenkinsQuestions
