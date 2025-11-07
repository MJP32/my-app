import { useState } from 'react'

// Simple syntax highlighter for configuration files and build scripts
const SyntaxHighlighter = ({ code }) => {
  const highlightCode = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    // Protect comments
    highlighted = highlighted.replace(/(#.*$|\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    // Protect strings
    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    // Apply syntax highlighting
    highlighted = highlighted
      .replace(/\b(id|name|type|vcs|runner|param|step|trigger|requirement|feature|option|value|key|buildType|template|project|settings|checkout|build|test|deploy|clean|artifact|dependency|snapshot|configuration)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(maven|gradle|docker|kotlin|groovy|xml|yaml|shell|powershell|python|node|npm|dotnet|java|git|svn)\b/gi, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/(--[\w-]+)/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')

    protectedContent.forEach(({ id, replacement }) => {
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

function TeamCity({ onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  const topics = [
    {
      id: 1,
      name: 'TeamCity Fundamentals',
      icon: '🏗️',
      color: '#3b82f6',
      description: 'Core concepts, architecture, and setup',
      content: {
        explanation: 'TeamCity is a powerful CI/CD server by JetBrains that automates build, test, and deployment processes. It supports various build runners, VCS integrations, and provides comprehensive build management with intelligent dependency handling, parallel builds, and detailed reporting.',
        keyPoints: [
          'Build Configuration: Defines what, how, and when to build',
          'Build Agents: Machines that execute build configurations',
          'Build Server: Central hub managing agents and configurations',
          'VCS Roots: Version control system connections (Git, SVN, etc.)',
          'Build Triggers: Automatic build initiation (VCS changes, schedule, dependencies)',
          'Artifacts: Build outputs stored and shared between builds',
          'Build Chains: Dependencies between multiple build configurations',
          'Templates: Reusable build configuration patterns'
        ],
        codeExample: `# TeamCity Architecture and Setup
# Build Server Installation
wget https://download.jetbrains.com/teamcity/TeamCity-2024.03.tar.gz
tar -xzf TeamCity-2024.03.tar.gz
cd TeamCity/bin
./teamcity-server.sh start

# Access: http://localhost:8111

# Build Agent Setup
cd buildAgent/bin
./agent.sh start configure --server-url=http://localhost:8111

# Basic Build Configuration (Kotlin DSL)
import jetbrains.buildServer.configs.kotlin.v2019_2.*
import jetbrains.buildServer.configs.kotlin.v2019_2.buildSteps.*

object MyBuild : BuildType({
    id("MyProject_Build")
    name = "Build and Test"

    vcs {
        root(GitVcsRoot {
            url = "https://github.com/myorg/myproject.git"
            branch = "refs/heads/main"
            authMethod = password {
                userName = "git"
                password = "credentialsJSON:token"
            }
        })
    }

    steps {
        maven {
            goals = "clean package"
            mavenVersion = bundled_3_6()
        }

        script {
            scriptContent = """
                echo "Running tests..."
                mvn test
            """.trimIndent()
        }
    }

    triggers {
        vcs {
            branchFilter = "+:*"
        }
    }

    features {
        perfmon { }
    }
})

# XML Configuration Alternative
<build-type>
  <name>Build and Test</name>
  <description>Main build configuration</description>

  <settings>
    <parameters>
      <param name="maven.goals" value="clean package" />
    </parameters>
  </settings>

  <vcs-settings>
    <vcs-entry-ref root-id="GitRoot" />
  </vcs-settings>

  <build-runners>
    <runner type="Maven2">
      <parameters>
        <param name="goals" value="%maven.goals%" />
        <param name="maven.path" value="%teamcity.tool.maven%" />
      </parameters>
    </runner>
  </build-runners>

  <build-triggers>
    <build-trigger type="vcsTrigger">
      <parameters>
        <param name="enableQueueOptimization" value="true" />
      </parameters>
    </build-trigger>
  </build-triggers>
</build-type>`
      }
    },
    {
      id: 2,
      name: 'Build Pipelines',
      icon: '🔄',
      color: '#10b981',
      description: 'Creating complex CI/CD pipelines',
      content: {
        explanation: 'TeamCity build pipelines orchestrate multiple build configurations with dependencies, parallel execution, and conditional flows. Build chains enable complex workflows where artifacts and results flow between stages, supporting sophisticated deployment strategies.',
        keyPoints: [
          'Build Steps: Sequential tasks within a build (compile, test, deploy)',
          'Build Dependencies: Artifact and snapshot dependencies between builds',
          'Parallel Builds: Execute multiple builds simultaneously',
          'Composite Builds: Aggregate multiple build results',
          'Build Parameters: Variables passed between builds',
          'Conditional Steps: Execute based on conditions',
          'Failure Actions: Handle failures (continue, stop, mark as failed)',
          'Meta-Runners: Custom reusable build steps'
        ],
        codeExample: `# Multi-Stage Pipeline Configuration
# Stage 1: Build and Unit Test
object BuildStage : BuildType({
    id("Pipeline_Build")
    name = "1. Build"

    vcs {
        root(GitVcsRoot)
    }

    steps {
        gradle {
            tasks = "clean build"
            buildFile = "build.gradle"
        }
    }

    artifactRules = """
        build/libs/*.jar => artifacts/
        build/reports/tests/** => test-reports/
    """.trimIndent()
})

# Stage 2: Integration Tests
object IntegrationTestStage : BuildType({
    id("Pipeline_IntegrationTest")
    name = "2. Integration Tests"

    dependencies {
        // Artifact dependency on build stage
        artifacts(BuildStage) {
            buildRule = lastSuccessful()
            artifactRules = "artifacts/*.jar => lib/"
        }

        // Snapshot dependency ensures build stage completes first
        snapshot(BuildStage) {
            onDependencyFailure = FailureAction.FAIL_TO_START
        }
    }

    steps {
        script {
            name = "Run Integration Tests"
            scriptContent = """
                java -jar lib/app.jar &
                sleep 10
                ./run-integration-tests.sh
            """.trimIndent()
        }
    }
})

# Stage 3: Deploy to Staging
object DeployStaging : BuildType({
    id("Pipeline_DeployStaging")
    name = "3. Deploy to Staging"

    dependencies {
        snapshot(IntegrationTestStage) {
            onDependencyFailure = FailureAction.FAIL_TO_START
        }
        artifacts(BuildStage) {
            buildRule = lastSuccessful()
            artifactRules = "artifacts/*.jar"
        }
    }

    params {
        param("env.DEPLOY_ENV", "staging")
        param("env.SERVER_URL", "https://staging.example.com")
    }

    steps {
        script {
            name = "Deploy Application"
            scriptContent = """
                echo "Deploying to %env.DEPLOY_ENV%"
                scp *.jar deploy@%env.SERVER_URL%:/opt/app/
                ssh deploy@%env.SERVER_URL% "systemctl restart app"
            """.trimIndent()
        }
    }

    triggers {
        finishBuildTrigger {
            buildType = IntegrationTestStage.id.toString()
            successfulOnly = true
        }
    }
})

# Stage 4: Production Deployment (Manual)
object DeployProduction : BuildType({
    id("Pipeline_DeployProduction")
    name = "4. Deploy to Production"

    type = BuildTypeSettings.Type.DEPLOYMENT

    dependencies {
        snapshot(DeployStaging)
        artifacts(BuildStage) {
            buildRule = lastSuccessful()
            artifactRules = "artifacts/*.jar"
        }
    }

    params {
        param("env.DEPLOY_ENV", "production")
    }

    // No automatic triggers - manual only

    requirements {
        equals("env.PRODUCTION_APPROVED", "true")
    }
})

# Composite Build (Pipeline View)
object Pipeline : Project({
    id("MyApplication_Pipeline")
    name = "Application Pipeline"

    buildType(BuildStage)
    buildType(IntegrationTestStage)
    buildType(DeployStaging)
    buildType(DeployProduction)

    buildTypesOrder = arrayListOf(
        BuildStage,
        IntegrationTestStage,
        DeployStaging,
        DeployProduction
    )
})`
      }
    },
    {
      id: 3,
      name: 'Docker Integration',
      icon: '🐳',
      color: '#06b6d4',
      description: 'Building and deploying Docker containers',
      content: {
        explanation: 'TeamCity provides native Docker support for building images, running builds in containers, and deploying to container registries. Docker integration enables consistent build environments, faster agent provisioning, and seamless container-based deployments.',
        keyPoints: [
          'Docker Build Step: Build images from Dockerfiles',
          'Docker Compose Runner: Orchestrate multi-container builds',
          'Docker Registry: Push/pull images from registries',
          'Docker Wrapper: Run build steps inside containers',
          'Docker Agent: Build agents running in Docker containers',
          'Build on Docker Cloud: Dynamic agent provisioning',
          'Multi-stage Docker Builds: Optimize image sizes',
          'Docker Security Scanning: Vulnerability detection'
        ],
        codeExample: `# Docker Build Configuration
object DockerBuild : BuildType({
    id("Docker_Build")
    name = "Docker Build and Push"

    params {
        param("docker.registry", "myregistry.azurecr.io")
        param("docker.image.name", "myapp")
        param("docker.image.tag", "%build.number%")
    }

    steps {
        // Build Docker image
        dockerCommand {
            name = "Build Docker Image"
            commandType = build {
                source = path {
                    path = "Dockerfile"
                }
                namesAndTags = """
                    %docker.registry%/%docker.image.name%:%docker.image.tag%
                    %docker.registry%/%docker.image.name%:latest
                """.trimIndent()
                commandArgs = "--build-arg VERSION=%build.number%"
            }
        }

        // Run tests in container
        dockerCommand {
            name = "Run Tests"
            commandType = other {
                subCommand = "run"
                commandArgs = """
                    --rm
                    %docker.registry%/%docker.image.name%:%docker.image.tag%
                    npm test
                """.trimIndent()
            }
        }

        // Security scan
        script {
            name = "Security Scan"
            scriptContent = """
                trivy image %docker.registry%/%docker.image.name%:%docker.image.tag%
            """.trimIndent()
        }

        // Push to registry
        dockerCommand {
            name = "Push to Registry"
            commandType = push {
                namesAndTags = """
                    %docker.registry%/%docker.image.name%:%docker.image.tag%
                    %docker.registry%/%docker.image.name%:latest
                """.trimIndent()
            }
        }
    }

    features {
        dockerSupport {
            loginToRegistry = on {
                dockerRegistryId = "PROJECT_EXT_2"
            }
        }
    }
})

# Docker Compose Multi-Container Build
object DockerCompose : BuildType({
    id("Docker_Compose")
    name = "Docker Compose Build"

    steps {
        dockerCompose {
            file = "docker-compose.yml"
            commandType = build {
                commandArgs = "--build-arg BUILD_NUMBER=%build.number%"
            }
        }

        dockerCompose {
            file = "docker-compose.yml"
            commandType = up {
                commandArgs = "-d"
            }
        }

        script {
            name = "Run Integration Tests"
            scriptContent = """
                sleep 10
                docker-compose exec -T web npm run test:integration
                docker-compose down
            """.trimIndent()
        }
    }
})

# Build Agent in Docker Container
# teamcity-agent Dockerfile
FROM jetbrains/teamcity-agent:latest

# Install additional tools
RUN apt-get update && \\
    apt-get install -y maven gradle docker.io && \\
    apt-get clean

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \\
    apt-get install -y nodejs

# Docker Compose for agent
version: '3'
services:
  teamcity-agent:
    image: jetbrains/teamcity-agent:latest
    environment:
      - SERVER_URL=http://teamcity-server:8111
      - AGENT_NAME=docker-agent-1
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - agent-data:/data/teamcity_agent
    depends_on:
      - teamcity-server

volumes:
  agent-data:

# Kubernetes Deployment
object K8sDeployment : BuildType({
    id("Docker_K8sDeploy")
    name = "Deploy to Kubernetes"

    dependencies {
        artifacts(DockerBuild) {
            buildRule = lastSuccessful()
            artifactRules = "deployment.yaml"
        }
    }

    params {
        param("k8s.namespace", "production")
        param("k8s.replicas", "3")
    }

    steps {
        script {
            name = "Deploy to K8s"
            scriptContent = """
                kubectl set image deployment/myapp \\
                    myapp=%docker.registry%/%docker.image.name%:%docker.image.tag% \\
                    -n %k8s.namespace%

                kubectl rollout status deployment/myapp -n %k8s.namespace%
            """.trimIndent()
        }
    }
})`
      }
    },
    {
      id: 4,
      name: 'Testing & Reporting',
      icon: '📊',
      color: '#f59e0b',
      description: 'Test execution and result reporting',
      content: {
        explanation: 'TeamCity provides comprehensive testing support with automatic test detection, real-time reporting, historical tracking, and intelligent test management. It supports various test frameworks (JUnit, TestNG, NUnit, pytest) and provides detailed test analytics including flaky test detection.',
        keyPoints: [
          'Test Reporting: Automatic detection and parsing of test results',
          'Test History: Track test performance over time',
          'Flaky Tests: Identify unreliable tests automatically',
          'Test Re-run: Run only failed tests',
          'Code Coverage: Integrated coverage reporting (JaCoCo, Istanbul)',
          'Test Parallelization: Distribute tests across agents',
          'Muted Tests: Temporarily disable failing tests',
          'Test Metadata: Custom test categorization and filtering'
        ],
        codeExample: `# JUnit/TestNG Configuration
object UnitTests : BuildType({
    id("Tests_Unit")
    name = "Unit Tests"

    steps {
        maven {
            name = "Run Unit Tests"
            goals = "clean test"
            runnerArgs = """
                -Dmaven.test.failure.ignore=true
                -DforkCount=4
                -DreuseForks=true
            """.trimIndent()
        }
    }

    features {
        // Automatic JUnit XML detection
        feature {
            type = "xml-report-plugin"
            param("xmlReportParsing.reportType", "junit")
            param("xmlReportParsing.reportDirs", "+:**/target/surefire-reports/*.xml")
        }

        // Code coverage with JaCoCo
        feature {
            type = "JaCoCo"
            param("jacoco.coverage.jar", "%teamcity.tool.jacoco%")
            param("jacoco.coverage.includes", "com.myapp.*")
            param("jacoco.coverage.excludes", "*.test.*")
        }
    }

    failureConditions {
        // Fail build if tests fail
        testFailure = true

        // Fail if coverage drops below threshold
        failOnMetricChange {
            metric = BuildFailureOnMetric.MetricType.CODE_COVERAGE_LINE_PERCENTAGE
            threshold = 80
            units = BuildFailureOnMetric.MetricUnit.DEFAULT_UNIT
            comparison = BuildFailureOnMetric.MetricComparison.LESS
            compareTo = build {
                buildRule = lastSuccessful()
            }
        }
    }
})

# Integration Tests with Parallel Execution
object IntegrationTests : BuildType({
    id("Tests_Integration")
    name = "Integration Tests"

    params {
        param("test.parallel.threads", "4")
    }

    steps {
        gradle {
            name = "Run Integration Tests"
            tasks = "integrationTest"
            gradleParams = """
                --parallel
                --max-workers=%test.parallel.threads%
                --tests=com.myapp.integration.*
            """.trimIndent()
        }
    }

    features {
        feature {
            type = "xml-report-plugin"
            param("xmlReportParsing.reportType", "junit")
            param("xmlReportParsing.reportDirs", "+:**/build/test-results/**/*.xml")
        }

        // Detect flaky tests
        commitStatusPublisher {
            vcsRootExtId = "GitRoot"
            publisher = github {
                githubUrl = "https://api.github.com"
                authType = personalToken {
                    token = "credentialsJSON:github_token"
                }
            }
        }
    }
})

# Python Tests with pytest
object PythonTests : BuildType({
    id("Tests_Python")
    name = "Python Unit Tests"

    steps {
        python {
            name = "Install Dependencies"
            command = script {
                content = """
                    pip install -r requirements.txt
                    pip install pytest pytest-cov pytest-xdist
                """.trimIndent()
            }
        }

        python {
            name = "Run Tests with Coverage"
            command = script {
                content = """
                    pytest tests/ \\
                        --junitxml=reports/junit.xml \\
                        --cov=src \\
                        --cov-report=xml:reports/coverage.xml \\
                        --cov-report=html:reports/htmlcov \\
                        -n auto
                """.trimIndent()
            }
        }
    }

    features {
        feature {
            type = "xml-report-plugin"
            param("xmlReportParsing.reportType", "junit")
            param("xmlReportParsing.reportDirs", "reports/junit.xml")
        }
    }

    artifactRules = """
        reports/** => test-reports.zip
    """.trimIndent()
})

# Test Reporting and Analytics
# Build script to handle flaky tests
script {
    name = "Analyze Flaky Tests"
    scriptContent = """
        #!/bin/bash

        # Get flaky tests from TeamCity API
        curl -u username:password \\
             "http://teamcity:8111/app/rest/testOccurrences?locator=currentlyMuted:false,status:FAILURE" \\
             -H "Accept: application/json" \\
             > flaky-tests.json

        # Process and report
        python analyze_flaky_tests.py flaky-tests.json
    """.trimIndent()
}

# Custom Test Metadata
<build-type>
  <settings>
    <parameters>
      <param name="system.test.categories" value="unit,integration" />
    </parameters>
  </settings>

  <build-runners>
    <runner type="Maven2">
      <parameters>
        <param name="goals" value="test" />
        <param name="runnerArgs" value="-Dgroups=%system.test.categories%" />
      </parameters>
    </runner>
  </build-runners>
</build-type>

# Mute Failing Tests Automatically
object MuteFailingTests : BuildType({
    steps {
        script {
            scriptContent = """
                # Mute tests that have failed 3+ times
                curl -X POST \\
                     -u admin:password \\
                     -H "Content-Type: application/xml" \\
                     -d '<mute><test name="TestClass.failingTest"/></mute>' \\
                     http://teamcity:8111/app/rest/mutes
            """.trimIndent()
        }
    }
})`
      }
    }
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', backgroundColor: '#f5f3ff', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
        >
          ← Back to DevOps
        </button>

        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: '1rem 0 0.5rem 0'
        }}>
          🏗️ TeamCity
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#6b7280', margin: 0 }}>
          Continuous Integration and Deployment with TeamCity by JetBrains
        </p>
      </div>

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
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '12px',
                border: `3px solid ${topic.color}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = `0 0 0 4px ${topic.color}40, 0 12px 24px rgba(0,0,0,0.2)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{topic.icon}</div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                {topic.name}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.6' }}>
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
            ← Back to Topics
          </button>

          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            border: `3px solid ${selectedTopic.color}`,
            marginBottom: '2rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3rem' }}>{selectedTopic.icon}</div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1f2937', margin: 0 }}>
                {selectedTopic.name}
              </h2>
            </div>

            <div style={{ fontSize: '1.05rem', color: '#4b5563', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              {selectedTopic.content.explanation}
            </div>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
              Key Points:
            </h3>
            <ul style={{ color: '#4b5563', lineHeight: '1.8', marginBottom: '2rem' }}>
              {selectedTopic.content.keyPoints.map((point, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>{point}</li>
              ))}
            </ul>

            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
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

export default TeamCity
