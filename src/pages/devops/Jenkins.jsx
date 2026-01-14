import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

const SyntaxHighlighter = ({ code }) => {
  const highlightCode = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(#.*$|\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    highlighted = highlighted
      .replace(/\b(pipeline|agent|stages|stage|steps|post|when|environment|parameters|triggers|options|tools|script|sh|bat|powershell|checkout|scm|git|branch|credentials|docker|kubernetes)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(always|success|failure|unstable|changed|fixed|regression|aborted|cleanup|node|label|any|none)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>')

    protectedContent.forEach(({ id, replacement}) => {
      highlighted = highlighted.replace(id, replacement)
    })

    return highlighted
  }

  return (
    <pre style={{
      margin: 0,
      fontFamily: '"Consolas", "Monaco", "Courier New", monospace',
      fontSize: '0.85rem',
      lineHeight: '1.6',
      color: '#d4d4d4',
      whiteSpace: 'pre',
      overflowX: 'auto',
      textAlign: 'left',
      padding: 0
    }}>
      <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
    </pre>
  )
}

function Jenkins({ onBack, breadcrumb }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const topics = [
    {
      id: 1,
      name: 'Jenkins Pipeline as Code',
      icon: '📜',
      color: '#d62728',
      description: 'Declarative and Scripted pipelines',
      content: {
        explanation: 'Jenkins Pipeline as Code enables defining CI/CD workflows in Jenkinsfiles stored in version control. Declarative Pipeline provides structured, opinionated syntax while Scripted Pipeline offers full Groovy flexibility. Both approaches enable version-controlled, reproducible builds.',
        keyPoints: [
          'Declarative Pipeline: Simplified, structured syntax with predefined sections',
          'Scripted Pipeline: Full Groovy scripting power for complex workflows',
          'Jenkinsfile: Pipeline definition stored in source control',
          'Stages: Logical divisions of pipeline (build, test, deploy)',
          'Steps: Individual tasks within stages',
          'Agents: Define where pipeline executes (node, docker, kubernetes)',
          'Post Actions: Cleanup and notifications after pipeline execution',
          'Shared Libraries: Reusable pipeline code across projects'
        ],
        codeExample: `// Declarative Pipeline
pipeline {
    agent any

    environment {
        MAVEN_HOME = tool 'Maven3'
        JAVA_HOME = tool 'JDK11'
        APP_VERSION = "${env.BUILD_NUMBER}"
    }

    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'staging', 'prod'], description: 'Deployment environment')
        booleanParam(name: 'RUN_TESTS', defaultValue: true, description: 'Run test suite')
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 1, unit: 'HOURS')
        timestamps()
        skipDefaultCheckout()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh 'git log -1'
            }
        }

        stage('Build') {
            steps {
                sh '''
                    mvn clean package -DskipTests
                    echo "Build version: ${APP_VERSION}"
                '''
            }
        }

        stage('Test') {
            when {
                expression { params.RUN_TESTS == true }
            }
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'mvn test'
                    }
                    post {
                        always {
                            junit 'target/surefire-reports/**/*.xml'
                        }
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'mvn verify -DskipUnitTests'
                    }
                }
            }
        }

        stage('Code Quality') {
            steps {
                script {
                    withSonarQubeEnv('SonarQube') {
                        sh 'mvn sonar:sonar'
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                script {
                    if (params.ENVIRONMENT == 'prod') {
                        input message: 'Deploy to production?', ok: 'Deploy'
                    }

                    sh """
                        echo "Deploying to ${params.ENVIRONMENT}"
                        ./deploy.sh ${params.ENVIRONMENT} ${APP_VERSION}
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            emailext(
                subject: "SUCCESS: ${env.JOB_NAME} [${env.BUILD_NUMBER}]",
                body: "Build succeeded: ${env.BUILD_URL}",
                to: "team@example.com"
            )
        }
        failure {
            emailext(
                subject: "FAILURE: ${env.JOB_NAME} [${env.BUILD_NUMBER}]",
                body: "Build failed: ${env.BUILD_URL}",
                to: "team@example.com"
            )
        }
    }
}

// Scripted Pipeline
node('linux') {
    def mvnHome = tool 'Maven3'
    def buildNumber = env.BUILD_NUMBER

    try {
        stage('Checkout') {
            checkout scm
        }

        stage('Build') {
            sh "${mvnHome}/bin/mvn clean package"
        }

        stage('Deploy') {
            if (env.BRANCH_NAME == 'main') {
                sh "./deploy.sh production"
            }
        }

        currentBuild.result = 'SUCCESS'
    } catch (Exception e) {
        currentBuild.result = 'FAILURE'
        throw e
    } finally {
        cleanWs()
    }
}`
      }
    },
    {
      id: 2,
      name: 'Docker & Kubernetes Integration',
      icon: '🚢',
      color: '#1f77b4',
      description: 'Container-based builds and deployments',
      content: {
        explanation: 'Jenkins integrates deeply with Docker and Kubernetes for containerized builds and deployments. Docker agents provide consistent build environments, while Kubernetes plugin enables dynamic agent provisioning with pod templates. This approach ensures scalability and resource efficiency.',
        keyPoints: [
          'Docker Agent: Run pipeline steps in Docker containers',
          'Docker Pipeline Plugin: Build, push, and run Docker images',
          'Kubernetes Plugin: Dynamic Jenkins agents in K8s pods',
          'Pod Templates: Define container specifications for agents',
          'Docker-in-Docker: Build Docker images inside containers',
          'Multi-Container Agents: Sidecar containers for services',
          'Image Caching: Optimize build performance',
          'Registry Integration: Push to Docker Hub, ECR, GCR, ACR'
        ],
        codeExample: `// Docker Agent Pipeline
pipeline {
    agent {
        docker {
            image 'maven:3.8-openjdk-11'
            args '-v /root/.m2:/root/.m2'
        }
    }

    stages {
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
    }
}

// Multi-Container Docker Agent
pipeline {
    agent {
        docker {
            image 'maven:3.8-openjdk-11'
            args '''
                -v /var/run/docker.sock:/var/run/docker.sock
                --network=host
            '''
        }
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("myapp:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Push Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.example.com', 'docker-credentials') {
                        docker.image("myapp:${env.BUILD_NUMBER}").push()
                        docker.image("myapp:${env.BUILD_NUMBER}").push('latest')
                    }
                }
            }
        }
    }
}

// Kubernetes Pod Template
pipeline {
    agent {
        kubernetes {
            yaml '''
apiVersion: v1
kind: Pod
metadata:
  labels:
    jenkins: agent
spec:
  containers:
  - name: maven
    image: maven:3.8-openjdk-11
    command:
    - sleep
    args:
    - 99999
    volumeMounts:
    - name: maven-cache
      mountPath: /root/.m2

  - name: docker
    image: docker:latest
    command:
    - sleep
    args:
    - 99999
    volumeMounts:
    - name: docker-sock
      mountPath: /var/run/docker.sock

  - name: kubectl
    image: bitnami/kubectl:latest
    command:
    - sleep
    args:
    - 99999

  volumes:
  - name: maven-cache
    emptyDir: {}
  - name: docker-sock
    hostPath:
      path: /var/run/docker.sock
'''
        }
    }

    stages {
        stage('Build') {
            steps {
                container('maven') {
                    sh 'mvn clean package'
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                container('docker') {
                    sh '''
                        docker build -t myapp:${BUILD_NUMBER} .
                        docker push myapp:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Deploy to K8s') {
            steps {
                container('kubectl') {
                    sh '''
                        kubectl set image deployment/myapp \\
                            myapp=myapp:${BUILD_NUMBER} \\
                            -n production

                        kubectl rollout status deployment/myapp -n production
                    '''
                }
            }
        }
    }
}

// Dockerfile Multi-Stage with Jenkins
FROM jenkins/jenkins:lts

USER root

# Install Docker CLI
RUN apt-get update && \\
    apt-get install -y docker.io && \\
    usermod -aG docker jenkins

# Install kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \\
    install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

USER jenkins

# Install plugins
RUN jenkins-plugin-cli --plugins \\
    docker-workflow \\
    kubernetes \\
    git \\
    workflow-aggregator`
      }
    },
    {
      id: 3,
      name: 'Plugins & Integrations',
      icon: '🔌',
      color: '#2ca02c',
      description: 'Essential Jenkins plugins and tools',
      content: {
        explanation: 'Jenkins extensibility comes from its rich plugin ecosystem. Key plugins enable Git integration, Docker support, cloud deployments, test reporting, code quality analysis, and notifications. Proper plugin selection and configuration are crucial for an effective CI/CD pipeline.',
        keyPoints: [
          'Git Plugin: Source control integration with GitHub, GitLab, Bitbucket',
          'Pipeline Plugins: Workflow and pipeline-as-code support',
          'Docker Plugin: Docker integration and dynamic agents',
          'Kubernetes Plugin: K8s-based dynamic agent provisioning',
          'SonarQube Scanner: Code quality and security analysis',
          'Blue Ocean: Modern UI for pipelines',
          'Credentials Binding: Secure secrets management',
          'Email Extension: Advanced notification capabilities'
        ],
        codeExample: `// Git Integration with Branch Discovery
pipeline {
    agent any

    options {
        // Scan for branches and pull requests
        githubProject('https://github.com/myorg/myrepo')
    }

    triggers {
        // Poll SCM every 5 minutes
        pollSCM('H/5 * * * *')

        // GitHub webhook trigger
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/myorg/myrepo.git',
                        credentialsId: 'github-credentials'
                    ]]
                ])
            }
        }
    }
}

// SonarQube Integration
pipeline {
    agent any

    environment {
        SONAR_HOST_URL = 'https://sonarqube.example.com'
    }

    stages {
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'mvn sonar:sonar -Dsonar.projectKey=myapp'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}

// Credentials and Secrets Management
pipeline {
    agent any

    environment {
        // Username/Password credentials
        DB_CREDS = credentials('database-credentials')

        // Secret text
        API_KEY = credentials('api-key')

        // SSH key
        SSH_KEY = credentials('deploy-ssh-key')
    }

    stages {
        stage('Deploy') {
            steps {
                // Access credentials
                sh '''
                    echo "Username: $DB_CREDS_USR"
                    echo "Using API key: ${API_KEY}"
                '''

                // Use SSH key
                sshagent(['deploy-ssh-key']) {
                    sh '''
                        ssh user@server "deploy.sh"
                    '''
                }

                // Use credentials in script
                withCredentials([
                    usernamePassword(
                        credentialsId: 'aws-credentials',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )
                ]) {
                    sh 'aws s3 sync ./build s3://mybucket'
                }
            }
        }
    }
}

// Slack/Email Notifications
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
                message: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
            )

            // Email
            emailext(
                subject: "Build ${env.JOB_NAME} #${env.BUILD_NUMBER} succeeded",
                body: """
                    Build: ${env.BUILD_URL}
                    Branch: ${env.GIT_BRANCH}
                    Commit: ${env.GIT_COMMIT}
                """,
                to: "team@example.com"
            )
        }

        failure {
            slackSend(
                color: 'danger',
                message: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)"
            )
        }
    }
}

// Blue Ocean Compatible Pipeline
pipeline {
    agent any

    stages {
        stage('Parallel Tests') {
            parallel {
                stage('Unit') {
                    steps {
                        sh 'npm run test:unit'
                    }
                }
                stage('Integration') {
                    steps {
                        sh 'npm run test:integration'
                    }
                }
                stage('E2E') {
                    steps {
                        sh 'npm run test:e2e'
                    }
                }
            }
        }
    }
}`
      }
    },
    {
      id: 4,
      name: 'Shared Libraries',
      icon: '📚',
      color: '#ff7f0e',
      description: 'Reusable pipeline code and DRY principles',
      content: {
        explanation: 'Shared Libraries allow teams to create reusable pipeline code that can be shared across multiple projects. Libraries provide custom steps, utilities, and templates that promote DRY (Don\'t Repeat Yourself) principles and standardize CI/CD patterns across an organization.',
        keyPoints: [
          'Global Libraries: Available to all pipelines',
          'Folder Libraries: Scoped to specific folders',
          'Custom Steps: Reusable functions callable from pipelines',
          'Variables: Shared pipeline logic and DSL extensions',
          'Resources: Non-Groovy files (scripts, config)',
          'Version Control: Libraries stored in Git',
          'Dynamic Loading: Load specific library versions',
          'Testing: Unit test shared library code'
        ],
        codeExample: `// Shared Library Structure
// vars/buildMaven.groovy
def call(Map config = [:]) {
    pipeline {
        agent any

        stages {
            stage('Build') {
                steps {
                    sh "mvn clean \${config.goals ?: 'package'}"
                }
            }

            stage('Test') {
                when {
                    expression { config.runTests != false }
                }
                steps {
                    sh 'mvn test'
                    junit 'target/surefire-reports/**/*.xml'
                }
            }

            stage('Deploy') {
                when {
                    branch 'main'
                }
                steps {
                    script {
                        deployToEnvironment(config.environment ?: 'staging')
                    }
                }
            }
        }

        post {
            always {
                sendNotification(currentBuild.result)
            }
        }
    }
}

// vars/deployToEnvironment.groovy
def call(String environment) {
    echo "Deploying to ${environment}"

    withCredentials([usernamePassword(
        credentialsId: "${environment}-credentials",
        usernameVariable: 'USER',
        passwordVariable: 'PASS'
    )]) {
        sh """
            ./deploy.sh --env ${environment} \\
                       --user \$USER \\
                       --pass \$PASS
        """
    }
}

// vars/sendNotification.groovy
def call(String buildStatus = 'STARTED') {
    def color = buildStatus == 'SUCCESS' ? 'good' : 'danger'
    def message = "${env.JOB_NAME} #${env.BUILD_NUMBER}: ${buildStatus}"

    slackSend(color: color, message: message)

    emailext(
        subject: message,
        body: "Build: ${env.BUILD_URL}",
        to: "team@example.com"
    )
}

// src/com/mycompany/Docker.groovy
package com.mycompany

class Docker implements Serializable {
    def script

    Docker(script) {
        this.script = script
    }

    def buildAndPush(String imageName, String version) {
        script.sh """
            docker build -t ${imageName}:${version} .
            docker push ${imageName}:${version}
        """
    }

    def scanImage(String imageName) {
        script.sh "trivy image ${imageName}"
    }
}

// Using Shared Library in Jenkinsfile
@Library('my-shared-library@main') _

// Simple usage
buildMaven()

// With configuration
buildMaven(
    goals: 'clean install',
    runTests: true,
    environment: 'production'
)

// Using custom class
@Library('my-shared-library') import com.mycompany.Docker

pipeline {
    agent any

    stages {
        stage('Build Docker') {
            steps {
                script {
                    def docker = new Docker(this)
                    docker.buildAndPush('myapp', env.BUILD_NUMBER)
                    docker.scanImage("myapp:${env.BUILD_NUMBER}")
                }
            }
        }
    }
}

// Dynamic library loading
library identifier: 'my-lib@1.0.0', retriever: modernSCM([
    $class: 'GitSCMSource',
    remote: 'https://github.com/myorg/jenkins-shared-library.git'
])

// resources/scripts/deploy.sh
#!/bin/bash
# Shared shell script
echo "Deploying application..."
kubectl apply -f deployment.yaml

// Using resource in pipeline
def deployScript = libraryResource 'scripts/deploy.sh'
writeFile file: 'deploy.sh', text: deployScript
sh 'chmod +x deploy.sh && ./deploy.sh'`
      }
    }
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
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
          ← Back to DevOps
        </button>

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: 'white',
          margin: '1rem 0 0.5rem 0'
        }}>
          🔧 Jenkins
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#9ca3af', margin: 0 }}>
          Open-source automation server for CI/CD pipelines
        </p>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      {!selectedTopic ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              style={{
                background: 'linear-gradient(to bottom right, #1f2937, #111827)',
                padding: '2rem',
                borderRadius: '12px',
                border: `3px solid ${topic.color}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = `0 0 0 4px ${topic.color}40, 0 12px 24px rgba(0,0,0,0.4)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{topic.icon}</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'white', marginBottom: '0.5rem' }}>
                {topic.name}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#9ca3af', lineHeight: '1.6' }}>
                {topic.description}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedTopic(null)}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              fontWeight: '600',
              backgroundColor: selectedTopic.color,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            ← Back to Categories
          </button>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: `3px solid ${selectedTopic.color}`,
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem' }}>{selectedTopic.icon}</div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'white', margin: 0 }}>
                {selectedTopic.name}
              </h2>
            </div>

            <div style={{ fontSize: '1.05rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {selectedTopic.content.explanation}
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>
              Key Points:
            </h3>
            <ul style={{ color: '#9ca3af', lineHeight: '1.8', marginBottom: '2rem' }}>
              {selectedTopic.content.keyPoints.map((point, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>{point}</li>
              ))}
            </ul>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'white', marginBottom: '1rem' }}>
              Code Example:
            </h3>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.5rem',
              borderRadius: '8px',
              overflow: 'auto'
            }}>
              <SyntaxHighlighter code={selectedTopic.content.codeExample} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Jenkins
