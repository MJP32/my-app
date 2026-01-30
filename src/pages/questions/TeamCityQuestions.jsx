import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'

function TeamCityQuestions({ onBack, breadcrumb }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null)

  const renderFormattedAnswer = (text) => {
    const lines = text.split('\n')
    const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
    let colorIndex = 0
    const result = []
    let inCodeBlock = false
    let codeLines = []
    let codeLanguage = 'kotlin'

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex]

      // Check for code block start/end
      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          // Start of code block
          inCodeBlock = true
          codeLanguage = line.trim().substring(3) || 'kotlin'
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

      // Bold section headers
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

      // Numbered section headers
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
      question: 'What is TeamCity and explain its architecture and core concepts',
      answer: `**TeamCity:**
JetBrains' continuous integration and continuous deployment server with professional-grade features and excellent user experience

**Key Features:**
- User-friendly web interface
- Powerful build chains and dependencies
- Excellent test reporting and code coverage
- Built-in Docker support
- Cloud integration (AWS, Azure, GCP, Kubernetes)
- First-class IDE integration
- Real-time build progress
- Pre-tested commits
- Parallel builds across multiple agents

**Architecture Components:**

**1. TeamCity Server:**
\`\`\`
Responsibilities:
- Web UI and REST API
- Build configuration management
- Build queue management
- VCS monitoring and triggering
- Build history and statistics
- User authentication and authorization
- License management

Database:
- PostgreSQL (recommended for production)
- MySQL
- Microsoft SQL Server
- Internal database (for evaluation)

Port: 8111 (default)
\`\`\`

**2. Build Agent:**
\`\`\`
Responsibilities:
- Execute build configurations
- Report build progress
- Send build artifacts to server
- Clean up workspace

Types:
- Default agent (local to server)
- Additional agents (remote machines)
- Cloud agents (auto-scaled)
- Docker agents (containerized)

Agent Pool:
- Group agents by capability
- Assign projects to specific pools
- Control resource allocation
\`\`\`

**3. Project Structure:**
\`\`\`
Root Project
├── Project A
│   ├── Build Configuration 1
│   │   ├── VCS Roots
│   │   ├── Build Steps
│   │   ├── Triggers
│   │   └── Dependencies
│   └── Build Configuration 2
├── Project B
│   └── Build Configuration 3
└── _Root
    └── Global Settings
\`\`\`

**4. Build Configuration:**
\`\`\`kotlin
// Kotlin DSL
import jetbrains.buildServer.configs.kotlin.*
import jetbrains.buildServer.configs.kotlin.buildSteps.maven
import jetbrains.buildServer.configs.kotlin.triggers.vcs

object MyBuild : BuildType({
    name = "My Application Build"

    vcs {
        root(MyVcsRoot)
        cleanCheckout = true
    }

    steps {
        maven {
            goals = "clean package"
            runnerArgs = "-DskipTests=false"
            jdkHome = "%env.JDK_11%"
        }
    }

    triggers {
        vcs {
            branchFilter = "+:refs/heads/main"
        }
    }

    features {
        dockerSupport {
            loginToRegistry = on {
                dockerRegistryId = "PROJECT_EXT_1"
            }
        }
    }
})
\`\`\`

**5. VCS Roots:**
\`\`\`kotlin
object MyVcsRoot : GitVcsRoot({
    name = "My Repository"
    url = "https://github.com/company/repo.git"
    branch = "refs/heads/main"
    branchSpec = """
        +:refs/heads/*
        +:refs/tags/*
    """.trimIndent()
    authMethod = password {
        userName = "user"
        password = "credentialsJSON:token"
    }
    checkoutPolicy = GitVcsRoot.AgentCheckoutPolicy.USE_MIRRORS
})
\`\`\`

**6. Build Steps:**
\`\`\`kotlin
steps {
    // Maven
    maven {
        goals = "clean install"
        pomLocation = "pom.xml"
        runnerArgs = "-Dmaven.test.failure.ignore=true"
        jdkHome = "%env.JDK_11%"
        mavenVersion = bundled_3_6()
    }

    // Gradle
    gradle {
        tasks = "clean build"
        gradleWrapperPath = "gradlew"
        jdkHome = "%env.JDK_17%"
    }

    // Command Line
    script {
        name = "Run Tests"
        scriptContent = """
            npm install
            npm run test
            npm run build
        """.trimIndent()
    }

    // Docker
    dockerCommand {
        name = "Build Docker Image"
        commandType = build {
            source = file {
                path = "Dockerfile"
            }
            namesAndTags = "myapp:%build.number%"
            commandArgs = "--pull"
        }
    }
}
\`\`\`

**7. Triggers:**
\`\`\`kotlin
triggers {
    // VCS trigger
    vcs {
        branchFilter = """
            +:refs/heads/main
            +:refs/heads/develop
            -:refs/heads/feature/*
        """.trimIndent()
        quietPeriodMode = VcsTrigger.QuietPeriodMode.USE_DEFAULT
    }

    // Schedule trigger
    schedule {
        schedulingPolicy = daily {
            hour = 2
            minute = 0
            timezone = "America/New_York"
        }
        branchFilter = "+:refs/heads/main"
        triggerBuild = always()
    }

    // Finish build trigger
    finishBuildTrigger {
        buildType = "OtherBuildConfig"
        successfulOnly = true
        branchFilter = "+:*"
    }
}
\`\`\`

**8. Dependencies:**
\`\`\`kotlin
dependencies {
    // Snapshot dependency
    snapshot(AnotherBuildConfig) {
        onDependencyFailure = FailureAction.FAIL_TO_START
        onDependencyCancel = FailureAction.CANCEL
    }

    // Artifact dependency
    artifacts(AnotherBuildConfig) {
        buildRule = lastSuccessful()
        artifactRules = """
            target/*.jar => libs/
            config/* => config/
        """.trimIndent()
    }
}
\`\`\`

**9. Parameters:**
\`\`\`kotlin
params {
    param("env.JAVA_HOME", "/usr/lib/jvm/java-11")
    param("system.deployment.env", "production")
    password("secure.api.key", "credentialsJSON:apikey")

    // Configuration parameters
    text("git.branch", "main", label = "Branch", allowEmpty = false)
    select("deployment.target", "dev", label = "Deploy To",
        options = listOf("dev", "staging", "production"))
    checkbox("skip.tests", "false", label = "Skip Tests")
}
\`\`\`

**10. Agent Requirements:**
\`\`\`kotlin
requirements {
    exists("docker")
    contains("teamcity.agent.jvm.os.name", "Linux")
    matches("teamcity.agent.jvm.version", "11.*")
    doesNotContain("teamcity.agent.name", "slow")
}
\`\`\``
    },
    {
      id: 2,
      category: 'Build Configurations',
      difficulty: 'Medium',
      question: 'How do you create and manage build configurations in TeamCity?',
      answer: `**Build Configurations:**

**1. Build Configuration DSL:**
\`\`\`kotlin
import jetbrains.buildServer.configs.kotlin.*
import jetbrains.buildServer.configs.kotlin.buildSteps.*
import jetbrains.buildServer.configs.kotlin.triggers.*

object MavenBuild : BuildType({
    id("Maven_Build")
    name = "Maven Build"
    description = "Build and test Maven project"

    artifactRules = """
        target/*.jar => artifacts/
        target/site/** => docs/
    """.trimIndent()

    vcs {
        root(GitRoot)
        branchFilter = """
            +:refs/heads/main
            +:refs/heads/develop
            +:refs/pull/*/head
        """.trimIndent()
    }

    steps {
        maven {
            name = "Clean Package"
            goals = "clean package"
            pomLocation = "pom.xml"
            runnerArgs = """
                -DskipTests=false
                -Dmaven.test.failure.ignore=false
                -B
            """.trimIndent()
            jdkHome = "%env.JDK_11_HOME%"
            mavenVersion = bundled_3_6()
            localRepoScope = BuildStep.localRepoScope.BUILD_CONFIGURATION
        }

        maven {
            name = "Run Tests"
            goals = "test"
            runnerArgs = "-Dtest.timeout=600"
            executionMode = BuildStep.ExecutionMode.RUN_ON_SUCCESS
        }

        script {
            name = "Code Coverage Report"
            scriptContent = """
                mvn jacoco:report
                echo "##teamcity[publishArtifacts 'target/site/jacoco/**']"
            """.trimIndent()
        }
    }

    triggers {
        vcs {
            branchFilter = "+:*"
            quietPeriodMode = VcsTrigger.QuietPeriodMode.USE_DEFAULT
        }
    }

    features {
        feature {
            type = "xml-report-plugin"
            param("xmlReportParsing.reportType", "junit")
            param("xmlReportParsing.reportDirs", "+:target/surefire-reports/**/*.xml")
        }

        feature {
            type = "commit-status-publisher"
            param("github_authentication_type", "token")
            param("github_host", "https://api.github.com")
            param("secure:github_access_token", "credentialsJSON:github-token")
        }
    }

    failureConditions {
        errorMessage = true
        nonZeroExitCode = true
        testFailure = false  // Continue even if tests fail
        javaCrash = true
    }
})
\`\`\`

**2. Docker Build Configuration:**
\`\`\`kotlin
object DockerBuild : BuildType({
    name = "Docker Build and Push"

    params {
        param("docker.registry", "docker.io")
        param("docker.image.name", "mycompany/myapp")
        param("docker.image.tag", "%build.number%")
    }

    vcs {
        root(GitRoot)
    }

    steps {
        gradle {
            name = "Build JAR"
            tasks = "bootJar"
            gradleWrapperPath = "gradlew"
        }

        dockerCommand {
            name = "Build Image"
            commandType = build {
                source = file {
                    path = "Dockerfile"
                }
                namesAndTags = """
                    %docker.registry%/%docker.image.name%:%docker.image.tag%
                    %docker.registry%/%docker.image.name%:latest
                """.trimIndent()
                commandArgs = "--build-arg JAR_FILE=build/libs/*.jar"
            }
        }

        dockerCommand {
            name = "Push Image"
            commandType = push {
                namesAndTags = """
                    %docker.registry%/%docker.image.name%:%docker.image.tag%
                    %docker.registry%/%docker.image.name%:latest
                """.trimIndent()
            }
        }

        script {
            name = "Security Scan"
            scriptContent = """
                docker scan %docker.registry%/%docker.image.name%:%docker.image.tag%
            """.trimIndent()
            executionMode = BuildStep.ExecutionMode.RUN_ALWAYS
        }
    }

    features {
        dockerSupport {
            loginToRegistry = on {
                dockerRegistryId = "PROJECT_EXT_DOCKER_HUB"
            }
            cleanupPushedImages = true
        }
    }
})
\`\`\`

**3. Multi-Stage Build:**
\`\`\`kotlin
object BuildPipeline : BuildType({
    name = "Complete Build Pipeline"

    vcs {
        root(GitRoot)
    }

    steps {
        // Stage 1: Compile
        maven {
            name = "Compile"
            goals = "compile"
            pomLocation = "pom.xml"
        }

        // Stage 2: Unit Tests
        maven {
            name = "Unit Tests"
            goals = "test"
            executionMode = BuildStep.ExecutionMode.RUN_ON_SUCCESS
        }

        // Stage 3: Integration Tests
        maven {
            name = "Integration Tests"
            goals = "verify"
            runnerArgs = "-Pintegration-tests"
            executionMode = BuildStep.ExecutionMode.RUN_ON_SUCCESS
        }

        // Stage 4: Package
        maven {
            name = "Package"
            goals = "package -DskipTests"
            executionMode = BuildStep.ExecutionMode.RUN_ON_SUCCESS
        }

        // Stage 5: Docker Build
        dockerCommand {
            name = "Build Docker Image"
            commandType = build {
                source = file { path = "Dockerfile" }
                namesAndTags = "myapp:%build.number%"
            }
            executionMode = BuildStep.ExecutionMode.RUN_ON_SUCCESS
        }
    }

    features {
        pullRequests {
            vcsRootExtId = "\${GitRoot.id}"
            provider = github {
                authType = token {
                    token = "credentialsJSON:github-token"
                }
                filterAuthorRole = PullRequests.GitHubRoleFilter.MEMBER
            }
        }
    }
})
\`\`\`

**4. Parallel Builds:**
\`\`\`kotlin
object ParallelTests : BuildType({
    name = "Parallel Test Execution"

    vcs {
        root(GitRoot)
    }

    steps {
        maven {
            name = "Build"
            goals = "clean package -DskipTests"
        }

        script {
            name = "Run Parallel Tests"
            scriptContent = """
                # Split tests into parallel groups
                mvn test -Dparallel=classes -DthreadCount=4
            """.trimIndent()
        }
    }

    // Configure parallel execution
    params {
        param("teamcity.build.parallel", "true")
    }
})

// Build Chain with parallel stages
object BuildChain : Project({
    buildType(CompileBuild)

    buildTypesOrder = arrayListOf(
        CompileBuild,
        UnitTests,
        IntegrationTests,
        DeployBuild
    )
})

object UnitTests : BuildType({
    name = "Unit Tests"
    dependencies {
        snapshot(CompileBuild) {}
    }
})

object IntegrationTests : BuildType({
    name = "Integration Tests"
    dependencies {
        snapshot(CompileBuild) {}
    }
})
\`\`\`

**5. Deployment Configuration:**
\`\`\`kotlin
object DeployToKubernetes : BuildType({
    name = "Deploy to Kubernetes"

    params {
        param("k8s.namespace", "production")
        param("k8s.deployment", "myapp")
        password("k8s.token", "credentialsJSON:k8s-token")
    }

    vcs {
        root(GitRoot)
    }

    steps {
        script {
            name = "Deploy"
            scriptContent = """
                kubectl --token=%k8s.token% \
                    --namespace=%k8s.namespace% \
                    set image deployment/%k8s.deployment% \
                    app=myapp:%build.number%

                kubectl --token=%k8s.token% \
                    --namespace=%k8s.namespace% \
                    rollout status deployment/%k8s.deployment% \
                    --timeout=5m
            """.trimIndent()
        }

        script {
            name = "Verify Deployment"
            scriptContent = """
                kubectl --token=%k8s.token% \
                    --namespace=%k8s.namespace% \
                    get pods -l app=myapp
            """.trimIndent()
            executionMode = BuildStep.ExecutionMode.RUN_ALWAYS
        }
    }

    dependencies {
        artifacts(DockerBuild) {
            buildRule = lastSuccessful()
            cleanDestination = true
        }
    }
})
\`\`\`

**6. Build Templates:**
\`\`\`kotlin
object MavenTemplate : Template({
    name = "Maven Build Template"

    vcs {
        root(DslContext.settingsRoot)
    }

    steps {
        maven {
            goals = "clean package"
            pomLocation = "pom.xml"
            jdkHome = "%env.JDK_11_HOME%"
        }
    }

    triggers {
        vcs {}
    }

    features {
        commitStatusPublisher {
            vcsRootExtId = "\${DslContext.settingsRoot.id}"
            publisher = github {
                githubUrl = "https://api.github.com"
                authType = personalToken {
                    token = "credentialsJSON:github-token"
                }
            }
        }
    }
})

// Use template
object MyProject : BuildType({
    templates(MavenTemplate)
    name = "My Project Build"
})
\`\`\``
    },
    {
      id: 3,
      category: 'Build Chains',
      difficulty: 'Hard',
      question: 'Explain TeamCity build chains and dependency management',
      answer: `**Build Chains and Dependencies:**

**1. Snapshot Dependencies:**
\`\`\`kotlin
// Build A must complete before Build B starts
object BuildA : BuildType({
    name = "Build Application"

    steps {
        maven {
            goals = "clean package"
        }
    }
})

object BuildB : BuildType({
    name = "Run Tests"

    dependencies {
        snapshot(BuildA) {
            onDependencyFailure = FailureAction.FAIL_TO_START
            onDependencyCancel = FailureAction.CANCEL
            synchronizeRevisions = true
        }
    }

    steps {
        script {
            scriptContent = "mvn test"
        }
    }
})

object BuildC : BuildType({
    name = "Deploy"

    dependencies {
        snapshot(BuildB) {
            onDependencyFailure = FailureAction.FAIL_TO_START
            reuseBuilds = ReuseBuilds.SUCCESSFUL
        }
    }
})
\`\`\`

**2. Artifact Dependencies:**
\`\`\`kotlin
object CompileBuild : BuildType({
    name = "Compile"

    artifactRules = """
        target/*.jar => artifacts/
        target/classes/** => classes/
    """.trimIndent()

    steps {
        maven {
            goals = "clean compile package"
        }
    }
})

object TestBuild : BuildType({
    name = "Test"

    dependencies {
        // Get artifacts from CompileBuild
        artifacts(CompileBuild) {
            buildRule = lastSuccessful()
            artifactRules = """
                artifacts/*.jar => lib/
                classes/** => target/classes/
            """.trimIndent()
            cleanDestination = true
        }
    }

    steps {
        maven {
            goals = "test"
        }
    }
})

object DeployBuild : BuildType({
    name = "Deploy"

    dependencies {
        artifacts(CompileBuild) {
            buildRule = sameChainOrLastFinished()
            artifactRules = "artifacts/*.jar => deploy/"
        }
    }

    steps {
        script {
            scriptContent = """
                scp deploy/*.jar user@server:/opt/app/
            """.trimIndent()
        }
    }
})
\`\`\`

**3. Complex Build Chain:**
\`\`\`kotlin
object CompleteChain : Project({
    name = "Complete CI/CD Chain"

    // Build order visualization
    buildTypesOrder = arrayListOf(
        CheckoutBuild,
        CompileBuild,
        UnitTestBuild,
        IntegrationTestBuild,
        SecurityScanBuild,
        DockerBuildType,
        DeployDevBuild,
        SmokeTestBuild,
        DeployProdBuild
    )

    // Parallel execution groups
    sequential {
        parallel {
            buildType(UnitTestBuild)
            buildType(IntegrationTestBuild)
            buildType(SecurityScanBuild)
        }
        buildType(DockerBuildType)
        buildType(DeployDevBuild)
    }
})

object CheckoutBuild : BuildType({
    name = "Checkout and Validate"
    steps {
        script {
            scriptContent = "git status && mvn validate"
        }
    }
})

object CompileBuild : BuildType({
    name = "Compile"
    dependencies {
        snapshot(CheckoutBuild) {}
    }
    steps {
        maven { goals = "compile" }
    }
})

object UnitTestBuild : BuildType({
    name = "Unit Tests"
    dependencies {
        snapshot(CompileBuild) {}
        artifacts(CompileBuild) {
            artifactRules = "target/classes/** => target/classes/"
        }
    }
    steps {
        maven { goals = "test" }
    }
})

object IntegrationTestBuild : BuildType({
    name = "Integration Tests"
    dependencies {
        snapshot(CompileBuild) {}
        artifacts(CompileBuild) {
            artifactRules = "target/classes/** => target/classes/"
        }
    }
    steps {
        maven { goals = "verify -Pintegration" }
    }
})

object SecurityScanBuild : BuildType({
    name = "Security Scan"
    dependencies {
        snapshot(CompileBuild) {}
    }
    steps {
        script {
            scriptContent = "dependency-check.sh --project myapp"
        }
    }
})

object DockerBuildType : BuildType({
    name = "Docker Build"
    dependencies {
        snapshot(UnitTestBuild) {}
        snapshot(IntegrationTestBuild) {}
        snapshot(SecurityScanBuild) {}
        artifacts(CompileBuild) {
            artifactRules = "target/*.jar => ."
        }
    }
    steps {
        dockerCommand {
            commandType = build {
                source = file { path = "Dockerfile" }
                namesAndTags = "myapp:%build.number%"
            }
        }
    }
})
\`\`\`

**4. Conditional Dependencies:**
\`\`\`kotlin
object DeployBuild : BuildType({
    name = "Deploy to Production"

    dependencies {
        snapshot(TestBuild) {
            onDependencyFailure = FailureAction.FAIL_TO_START
            // Only run if on main branch
            onDependencyCancel = FailureAction.CANCEL
        }

        artifacts(BuildImage) {
            // Use last successful build from same chain
            buildRule = sameChainOrLastFinished()
            artifactRules = "docker-image.tar => ."
        }
    }

    // Only deploy from main branch
    vcs {
        branchFilter = "+:refs/heads/main"
    }

    steps {
        script {
            name = "Deploy"
            scriptContent = """
                if [ "%teamcity.build.branch%" = "main" ]; then
                    ./deploy.sh production
                else
                    echo "Skipping production deployment for non-main branch"
                fi
            """.trimIndent()
        }
    }
})
\`\`\`

**5. Build Chain Triggers:**
\`\`\`kotlin
object ChainTrigger : BuildType({
    name = "Trigger Build Chain"

    triggers {
        vcs {
            branchFilter = "+:refs/heads/*"
        }
    }

    // This build triggers the entire chain
    dependencies {
        snapshot(CompileBuild) {}
    }
})

object ScheduledChain : BuildType({
    name = "Nightly Build Chain"

    triggers {
        schedule {
            schedulingPolicy = daily {
                hour = 2
                minute = 0
            }
            branchFilter = "+:refs/heads/main"
            triggerBuild = always()
            withPendingChangesOnly = false
        }
    }

    dependencies {
        snapshot(CompileBuild) {}
    }
})
\`\`\`

**6. Build Chain Templates:**
\`\`\`kotlin
fun createMicroservicePipeline(serviceName: String): BuildType {
    return BuildType({
        id("\${serviceName}_Pipeline")
        name = "\$serviceName Pipeline"

        vcs {
            root(DslContext.settingsRoot)
        }

        steps {
            maven {
                goals = "clean package"
                pomLocation = "\$serviceName/pom.xml"
            }
        }
    })
}

object MicroservicesChain : Project({
    val services = listOf("user-service", "order-service", "payment-service")

    services.forEach { service ->
        buildType(createMicroservicePipeline(service))
    }
})
\`\`\`

**7. Composite Build:**
\`\`\`kotlin
object CompositeBuild : BuildType({
    name = "Composite Build"
    type = BuildTypeSettings.Type.COMPOSITE

    dependencies {
        snapshot(BuildA) {}
        snapshot(BuildB) {}
        snapshot(BuildC) {}
    }

    // Composite builds don't have steps
    // They succeed when all dependencies succeed
})
\`\`\`

**8. Build Promotion:**
\`\`\`kotlin
object PromoteBuild : BuildType({
    name = "Promote to Production"

    params {
        param("promoted.build.id", "")
    }

    steps {
        script {
            scriptContent = """
                # Tag the promoted build
                git tag -a v%build.number% -m "Production release"
                git push origin v%build.number%

                # Deploy using artifacts from promoted build
                ./deploy.sh production %promoted.build.id%
            """.trimIndent()
        }
    }

    dependencies {
        artifacts(TestBuild) {
            // Get artifacts from specific build
            buildRule = BuildRule.tag("qa-approved")
            artifactRules = "dist/** => ."
        }
    }
})
\`\`\``
    },
    {
      id: 4,
      category: 'Comparison',
      difficulty: 'Medium',
      question: 'Compare TeamCity with Jenkins - features, pros, cons, and use cases',
      answer: `**TeamCity vs Jenkins:**

**1. Architecture Comparison:**

**TeamCity:**
\`\`\`
Pros:
✓ Built-in database support (no external DB needed initially)
✓ Superior web UI out of the box
✓ Excellent build chain visualization
✓ First-class Kotlin DSL for configuration
✓ Professional-grade from the start
✓ Better IDE integration (JetBrains)
✓ Superior build agent management
✓ Built-in build history and statistics

Cons:
✗ Licensing costs (free for 3 agents, 100 builds)
✗ Smaller community than Jenkins
✗ Fewer third-party plugins
✗ Resource intensive (requires more memory)
✗ Steeper learning curve for DSL
\`\`\`

**Jenkins:**
\`\`\`
Pros:
✓ Completely free and open source
✓ Massive plugin ecosystem (1800+)
✓ Large community and resources
✓ Flexible and highly customizable
✓ Groovy-based pipeline DSL
✓ Works on minimal resources
✓ Easy to get started

Cons:
✗ UI/UX not as polished
✗ Requires more plugins for basic features
✗ Manual plugin management overhead
✗ Less intuitive build chains
✗ Configuration can be complex
✗ No built-in test reporting (needs plugins)
\`\`\`

**2. Configuration as Code:**

**TeamCity Kotlin DSL:**
\`\`\`kotlin
import jetbrains.buildServer.configs.kotlin.*
import jetbrains.buildServer.configs.kotlin.buildSteps.maven

object MyBuild : BuildType({
    name = "Maven Build"

    vcs {
        root(GitRoot)
    }

    steps {
        maven {
            goals = "clean package"
            jdkHome = "%env.JDK_11%"
        }
    }

    triggers {
        vcs {
            branchFilter = "+:*"
        }
    }

    dependencies {
        snapshot(OtherBuild) {}
        artifacts(OtherBuild) {
            artifactRules = "target/*.jar => lib/"
        }
    }

    features {
        commitStatusPublisher {
            publisher = github {
                githubUrl = "https://api.github.com"
                authType = personalToken {
                    token = "credentialsJSON:token"
                }
            }
        }
    }
})
\`\`\`

**Jenkins Groovy Pipeline:**
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

    triggers {
        pollSCM('H/5 * * * *')
    }

    post {
        success {
            archiveArtifacts artifacts: 'target/*.jar'
            junit 'target/surefire-reports/*.xml'
        }
    }
}
\`\`\`

**3. Build Chains vs Pipeline:**

**TeamCity Build Chain:**
\`\`\`kotlin
// Visual, declarative dependencies
object CompileBuild : BuildType({
    name = "Compile"
    steps {
        maven { goals = "compile" }
    }
})

object TestBuild : BuildType({
    name = "Test"
    dependencies {
        snapshot(CompileBuild) {
            onDependencyFailure = FailureAction.FAIL_TO_START
        }
        artifacts(CompileBuild) {
            artifactRules = "target/classes/** => ."
        }
    }
    steps {
        maven { goals = "test" }
    }
})

object DeployBuild : BuildType({
    name = "Deploy"
    dependencies {
        snapshot(TestBuild) {}
    }
    steps {
        script { scriptContent = "./deploy.sh" }
    }
})

// TeamCity shows visual chain:
// [Compile] → [Test] → [Deploy]
\`\`\`

**Jenkins Pipeline:**
\`\`\`groovy
// Sequential stages in single pipeline
pipeline {
    agent any

    stages {
        stage('Compile') {
            steps {
                sh 'mvn compile'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }
        stage('Deploy') {
            steps {
                sh './deploy.sh'
            }
        }
    }
}

// Or use upstream/downstream jobs
// But less visual than TeamCity
\`\`\`

**4. Agent/Slave Management:**

**TeamCity:**
\`\`\`kotlin
// Better agent management
- Agent pools with authorization
- Agent compatibility matrix
- Real-time agent status
- Cloud profiles (AWS, Azure, K8s)
- Agent requirements matching

agent {
    requirement {
        exists("docker")
        contains("system.os.name", "Linux")
    }
}

// Agent pools
agentPoolId = "Production_Pool"
\`\`\`

**Jenkins:**
\`\`\`groovy
// Node/agent labeling
pipeline {
    agent {
        label 'linux && docker'
    }
}

// Or Kubernetes plugin
agent {
    kubernetes {
        yaml '''
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: maven
    image: maven:3.8-jdk-11
'''
    }
}
\`\`\`

**5. Test Reporting:**

**TeamCity:**
\`\`\`
Built-in:
- Automatic JUnit/TestNG detection
- Code coverage (JaCoCo, Emma, IDEA)
- Test history tracking
- Flaky test detection
- Test reordering (run failed tests first)
- Investigation assignment
- Mute failing tests

features {
    feature {
        type = "xml-report-plugin"
        param("xmlReportParsing.reportType", "junit")
    }
}
\`\`\`

**Jenkins:**
\`\`\`groovy
// Requires plugins
post {
    always {
        junit 'target/surefire-reports/*.xml'
        jacoco(
            execPattern: 'target/*.exec',
            classPattern: 'target/classes',
            sourcePattern: 'src/main/java'
        )
    }
}
\`\`\`

**6. Cost Comparison:**

**TeamCity:**
\`\`\`
Professional License:
- $299/year per build agent (first year)
- $239/year per build agent (renewal)

Enterprise License:
- $1,999/year for 10 build agents
- $6,999/year for 100 build agents

Free Tier:
- 3 build agents
- 100 build configurations
- Unlimited users
- Full features
\`\`\`

**Jenkins:**
\`\`\`
Completely Free:
- Unlimited agents
- Unlimited builds
- All features
- Open source

Hidden Costs:
- Infrastructure (servers, storage)
- Maintenance time
- Plugin management
- Training
\`\`\`

**7. Use Case Recommendations:**

**Choose TeamCity If:**
\`\`\`
✓ You need enterprise-grade CI/CD out of box
✓ Budget allows for licensing costs
✓ Want superior UI/UX experience
✓ Need excellent build chain visualization
✓ Using JetBrains IDEs (IDEA, WebStorm, etc.)
✓ Require professional support
✓ Want built-in test reporting and analytics
✓ Need .NET/C++ development support
✓ Team prefers Kotlin DSL
✓ Want easier configuration management
\`\`\`

**Choose Jenkins If:**
\`\`\`
✓ Need completely free solution
✓ Require maximum flexibility
✓ Have specific plugin requirements
✓ Large community support is priority
✓ Want Groovy-based pipelines
✓ Already invested in Jenkins
✓ Need quick setup with minimal resources
✓ Prefer open-source solutions
✓ Have DevOps expertise in team
✓ Need extensive third-party integrations
\`\`\`

**8. Integration Ecosystem:**

**TeamCity:**
\`\`\`
Strong integrations:
- JetBrains tools (IDEA, YouTrack, Space)
- Docker/Kubernetes
- Cloud providers (AWS, Azure, GCP)
- VCS (Git, SVN, Perforce)
- Issue trackers (JIRA, GitHub)
- Quality gates (SonarQube)
\`\`\`

**Jenkins:**
\`\`\`
Extensive integrations:
- 1800+ plugins
- Every major tool/service
- Custom plugin development
- REST API for everything
- Community-contributed integrations
- Legacy system support
\`\`\``
    }
  ]

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id)
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Fundamentals': '#ef4444',
      'Build Configurations': '#3b82f6',
      'Build Chains': '#7c3aed',
      'Comparison': '#10b981'
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
          TeamCity Interview Questions
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu} />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        textAlign: 'left',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Comprehensive TeamCity questions covering build configurations, agents, build chains, and comparison with Jenkins.
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
                ? '0 8px 16px rgba(0,0,0,0.3)'
                : '0 2px 8px rgba(0,0,0,0.2)'
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
          TeamCity Best Practices
        </h3>
        <ul style={{ color: '#d1d5db', lineHeight: '1.8', margin: '0.5rem 0' }}>
          <li>Use Kotlin DSL for version-controlled configuration</li>
          <li>Leverage build chains for complex pipelines</li>
          <li>Configure agent pools for better resource management</li>
          <li>Use build templates for consistent configuration</li>
          <li>Implement proper artifact dependencies</li>
          <li>Enable build history cleanup policies</li>
          <li>Use composite builds for parallel execution</li>
          <li>Configure proper failure conditions and notifications</li>
        </ul>
      </div>
    </div>
  )
}

export default TeamCityQuestions
