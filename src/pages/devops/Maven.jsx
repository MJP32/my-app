import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

const MAVEN_COLORS = {
  primary: '#f97316',
  primaryHover: '#fb923c',
  bg: 'rgba(249, 115, 22, 0.1)',
  border: 'rgba(249, 115, 22, 0.3)',
  arrow: '#f97316',
  hoverBg: 'rgba(249, 115, 22, 0.2)',
  topicBg: 'rgba(249, 115, 22, 0.2)'
}

// Maven Build Lifecycle Diagram
const MavenLifecycleDiagram = () => (
  <svg viewBox="0 0 800 200" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="mavenArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
      </marker>
    </defs>
    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Maven Default Build Lifecycle</text>

    <rect x="10" y="50" width="85" height="50" rx="6" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="2"/>
    <text x="52" y="72" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">validate</text>
    <text x="52" y="86" textAnchor="middle" fill="#93c5fd" fontSize="7">check POM</text>

    <rect x="115" y="50" width="85" height="50" rx="6" fill="rgba(34, 197, 94, 0.3)" stroke="#22c55e" strokeWidth="2"/>
    <text x="157" y="72" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">compile</text>
    <text x="157" y="86" textAnchor="middle" fill="#86efac" fontSize="7">src &rarr; .class</text>

    <rect x="220" y="50" width="85" height="50" rx="6" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="262" y="72" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">test</text>
    <text x="262" y="86" textAnchor="middle" fill="#fcd34d" fontSize="7">unit tests</text>

    <rect x="325" y="50" width="85" height="50" rx="6" fill="rgba(249, 115, 22, 0.3)" stroke="#f97316" strokeWidth="2"/>
    <text x="367" y="72" textAnchor="middle" fill="#fb923c" fontSize="9" fontWeight="bold">package</text>
    <text x="367" y="86" textAnchor="middle" fill="#fdba74" fontSize="7">JAR / WAR</text>

    <rect x="430" y="50" width="85" height="50" rx="6" fill="rgba(139, 92, 246, 0.3)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="472" y="72" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">verify</text>
    <text x="472" y="86" textAnchor="middle" fill="#c4b5fd" fontSize="7">integration</text>

    <rect x="535" y="50" width="85" height="50" rx="6" fill="rgba(236, 72, 153, 0.3)" stroke="#ec4899" strokeWidth="2"/>
    <text x="577" y="72" textAnchor="middle" fill="#f472b6" fontSize="9" fontWeight="bold">install</text>
    <text x="577" y="86" textAnchor="middle" fill="#fbcfe8" fontSize="7">local repo</text>

    <rect x="640" y="50" width="85" height="50" rx="6" fill="rgba(6, 182, 212, 0.3)" stroke="#06b6d4" strokeWidth="2"/>
    <text x="682" y="72" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">deploy</text>
    <text x="682" y="86" textAnchor="middle" fill="#a5f3fc" fontSize="7">remote repo</text>

    <line x1="95" y1="75" x2="112" y2="75" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#mavenArrow)"/>
    <line x1="200" y1="75" x2="217" y2="75" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#mavenArrow)"/>
    <line x1="305" y1="75" x2="322" y2="75" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#mavenArrow)"/>
    <line x1="410" y1="75" x2="427" y2="75" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#mavenArrow)"/>
    <line x1="515" y1="75" x2="532" y2="75" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#mavenArrow)"/>
    <line x1="620" y1="75" x2="637" y2="75" stroke="#f97316" strokeWidth="1.5" markerEnd="url(#mavenArrow)"/>

    <rect x="60" y="120" width="280" height="65" rx="6" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b" strokeWidth="1"/>
    <text x="200" y="140" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Clean Lifecycle</text>
    <text x="130" y="158" textAnchor="middle" fill="#60a5fa" fontSize="8">pre-clean</text>
    <text x="200" y="158" textAnchor="middle" fill="#4ade80" fontSize="8">clean</text>
    <text x="270" y="158" textAnchor="middle" fill="#fbbf24" fontSize="8">post-clean</text>
    <text x="200" y="175" textAnchor="middle" fill="#64748b" fontSize="8">mvn clean - removes target/</text>

    <rect x="400" y="120" width="340" height="65" rx="6" fill="rgba(100, 116, 139, 0.1)" stroke="#64748b" strokeWidth="1"/>
    <text x="570" y="140" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Site Lifecycle</text>
    <text x="470" y="158" textAnchor="middle" fill="#a78bfa" fontSize="8">pre-site</text>
    <text x="535" y="158" textAnchor="middle" fill="#f472b6" fontSize="8">site</text>
    <text x="600" y="158" textAnchor="middle" fill="#22d3ee" fontSize="8">post-site</text>
    <text x="670" y="158" textAnchor="middle" fill="#fb923c" fontSize="8">site-deploy</text>
    <text x="570" y="175" textAnchor="middle" fill="#64748b" fontSize="8">mvn site - generates project docs</text>
  </svg>
)

export default function Maven({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: '📋 Overview', icon: '📋' },
    { id: 'lifecycle', label: '🔄 Build Lifecycle', icon: '🔄' },
    { id: 'pom', label: '📦 POM & Dependencies', icon: '📦' },
    { id: 'plugins', label: '🔌 Plugins & Profiles', icon: '🔌' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-orange-950 to-gray-900 text-white p-6">
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={onBack}
              className="mb-6 px-6 py-3 bg-gray-800 border border-orange-700 text-orange-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold flex items-center gap-2"
            >
              <span>&larr;</span>
              <span>Back to DevOps</span>
            </button>

            <div className="bg-gradient-to-r from-orange-900/30 to-amber-900/30 rounded-2xl shadow-2xl p-8 text-white border border-orange-700">
              <h1 className="text-4xl font-bold mb-3" style={{
                background: 'linear-gradient(to right, #fdba74, #f97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>📦 Apache Maven</h1>
              <p className="text-xl text-gray-300">Build Automation &amp; Dependency Management Tool</p>
            </div>
          </div>

          <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

          {/* Tabs */}
          <div className="bg-gray-800 rounded-xl shadow-md p-2 mb-8">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-fit px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label.split(' ').slice(1).join(' ')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-8">

            {/* ===== OVERVIEW TAB ===== */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Lifecycle Diagram */}
                <div className="bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-orange-600">
                  <MavenLifecycleDiagram />
                </div>

                {/* What is Maven */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-orange-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">💡</span>
                    What is Apache Maven?
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    Apache Maven is a build automation and project management tool primarily used for Java projects.
                    It uses a Project Object Model (POM) file to describe the project structure, dependencies, build plugins,
                    and goals. Maven follows the principle of <strong className="text-orange-400">convention over configuration</strong>,
                    providing sensible defaults so developers can focus on writing code rather than configuring build scripts.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Convention over configuration approach',
                      'Declarative POM-based project model',
                      'Powerful dependency management with transitive resolution',
                      'Standard directory layout (src/main/java, src/test/java)',
                      'Extensible plugin architecture',
                      'Central repository ecosystem (Maven Central)'
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-orange-900/30 rounded-lg">
                        <span className="text-orange-400 font-bold text-sm mt-0.5">{idx + 1}</span>
                        <span className="text-gray-300 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Convention Over Configuration */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">📐</span>
                    Convention Over Configuration
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Maven defines a standard project structure. If you follow these conventions, Maven automatically
                    knows where your source code, tests, and resources are without explicit configuration.
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-6">
                    <pre className="text-green-400 text-sm">{`my-project/
├── pom.xml                          # Project Object Model
├── src/
│   ├── main/
│   │   ├── java/                    # Application source code
│   │   │   └── com/example/App.java
│   │   └── resources/               # Application resources
│   │       └── application.properties
│   └── test/
│       ├── java/                    # Test source code
│       │   └── com/example/AppTest.java
│       └── resources/               # Test resources
└── target/                          # Build output (generated)
    ├── classes/                      # Compiled classes
    ├── test-classes/                 # Compiled test classes
    └── my-project-1.0.0.jar         # Packaged artifact`}</pre>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-700">
                      <h4 className="text-blue-400 font-bold mb-2">Source Directories</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li><code className="text-green-400">src/main/java</code> - Application Java sources</li>
                        <li><code className="text-green-400">src/main/resources</code> - Application resources</li>
                        <li><code className="text-green-400">src/main/webapp</code> - Web application files</li>
                      </ul>
                    </div>
                    <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-700">
                      <h4 className="text-purple-400 font-bold mb-2">Test Directories</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li><code className="text-green-400">src/test/java</code> - Test Java sources</li>
                        <li><code className="text-green-400">src/test/resources</code> - Test resources</li>
                        <li><code className="text-green-400">target/</code> - All build output</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Maven vs Gradle vs Ant */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-green-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">⚖️</span>
                    Maven vs Gradle vs Ant
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="px-4 py-3 text-orange-400">Feature</th>
                          <th className="px-4 py-3 text-blue-400">Maven</th>
                          <th className="px-4 py-3 text-green-400">Gradle</th>
                          <th className="px-4 py-3 text-yellow-400">Ant</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr className="border-b border-gray-700/50">
                          <td className="px-4 py-3 font-medium">Configuration</td>
                          <td className="px-4 py-3">XML (pom.xml)</td>
                          <td className="px-4 py-3">Groovy/Kotlin DSL</td>
                          <td className="px-4 py-3">XML (build.xml)</td>
                        </tr>
                        <tr className="border-b border-gray-700/50">
                          <td className="px-4 py-3 font-medium">Approach</td>
                          <td className="px-4 py-3">Convention over config</td>
                          <td className="px-4 py-3">Convention + flexibility</td>
                          <td className="px-4 py-3">Fully imperative</td>
                        </tr>
                        <tr className="border-b border-gray-700/50">
                          <td className="px-4 py-3 font-medium">Dependency Mgmt</td>
                          <td className="px-4 py-3">Built-in (Maven Central)</td>
                          <td className="px-4 py-3">Built-in (any repo)</td>
                          <td className="px-4 py-3">Manual (Ivy optional)</td>
                        </tr>
                        <tr className="border-b border-gray-700/50">
                          <td className="px-4 py-3 font-medium">Build Speed</td>
                          <td className="px-4 py-3">Moderate</td>
                          <td className="px-4 py-3">Fast (incremental + cache)</td>
                          <td className="px-4 py-3">Fast (no overhead)</td>
                        </tr>
                        <tr className="border-b border-gray-700/50">
                          <td className="px-4 py-3 font-medium">Multi-module</td>
                          <td className="px-4 py-3">Reactor build</td>
                          <td className="px-4 py-3">Composite builds</td>
                          <td className="px-4 py-3">Manual subprojects</td>
                        </tr>
                        <tr className="border-b border-gray-700/50">
                          <td className="px-4 py-3 font-medium">Learning Curve</td>
                          <td className="px-4 py-3">Moderate</td>
                          <td className="px-4 py-3">Steeper</td>
                          <td className="px-4 py-3">Low</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium">Ecosystem</td>
                          <td className="px-4 py-3">Largest plugin ecosystem</td>
                          <td className="px-4 py-3">Growing (Android default)</td>
                          <td className="px-4 py-3">Legacy, minimal</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Key Maven Commands */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-purple-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">⌨️</span>
                    Essential Maven Commands
                  </h3>

                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-green-400 text-sm">{`# Clean and build
mvn clean install

# Skip tests during build
mvn clean install -DskipTests

# Run only unit tests
mvn test

# Run integration tests
mvn verify

# Generate project from archetype
mvn archetype:generate -DgroupId=com.example \\
    -DartifactId=my-app -DarchetypeArtifactId=maven-archetype-quickstart

# Display dependency tree
mvn dependency:tree

# Check for dependency updates
mvn versions:display-dependency-updates

# Run a specific plugin goal
mvn compiler:compile

# Build with a specific profile
mvn clean install -Pprod

# Debug output
mvn clean install -X

# Parallel builds (4 threads)
mvn clean install -T 4

# Offline mode (no network)
mvn clean install -o`}</pre>
                  </div>
                </div>
              </div>
            )}

            {/* ===== BUILD LIFECYCLE TAB ===== */}
            {activeTab === 'lifecycle' && (
              <div className="space-y-8">
                {/* Lifecycle Diagram */}
                <div className="bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-orange-600">
                  <MavenLifecycleDiagram />
                </div>

                {/* Default Lifecycle */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-orange-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🔄</span>
                    Default Lifecycle Phases
                  </h3>
                  <p className="text-gray-300 mb-6">
                    The default lifecycle handles project build and deployment. When you invoke a phase, all preceding phases
                    execute first. For example, <code className="text-orange-400">mvn package</code> runs validate, compile,
                    test, then package.
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        phase: 'validate',
                        description: 'Validates the project is correct and all necessary information is available. Checks the POM structure, required properties, and project configuration.',
                        plugin: 'N/A (built-in)',
                        color: 'blue'
                      },
                      {
                        phase: 'compile',
                        description: 'Compiles the source code of the project. Java files in src/main/java are compiled to target/classes.',
                        plugin: 'maven-compiler-plugin:compile',
                        color: 'green'
                      },
                      {
                        phase: 'test',
                        description: 'Runs unit tests using a suitable testing framework (JUnit, TestNG). Tests in src/test/java are compiled and executed. Build fails if any test fails.',
                        plugin: 'maven-surefire-plugin:test',
                        color: 'yellow'
                      },
                      {
                        phase: 'package',
                        description: 'Packages the compiled code into a distributable format such as JAR, WAR, or EAR. The packaging type is defined in the POM.',
                        plugin: 'maven-jar-plugin:jar / maven-war-plugin:war',
                        color: 'orange'
                      },
                      {
                        phase: 'verify',
                        description: 'Runs integration tests and any checks on the package to verify quality criteria are met. Integration tests run via the failsafe plugin.',
                        plugin: 'maven-failsafe-plugin:verify',
                        color: 'purple'
                      },
                      {
                        phase: 'install',
                        description: 'Installs the package into the local Maven repository (~/.m2/repository), making it available as a dependency for other local projects.',
                        plugin: 'maven-install-plugin:install',
                        color: 'pink'
                      },
                      {
                        phase: 'deploy',
                        description: 'Copies the final package to a remote repository (Nexus, Artifactory) for sharing with other developers and projects.',
                        plugin: 'maven-deploy-plugin:deploy',
                        color: 'cyan'
                      }
                    ].map((item, idx) => {
                      const colorMap = {
                        blue: { bg: 'bg-blue-900/30', border: 'border-blue-700', text: 'text-blue-400' },
                        green: { bg: 'bg-green-900/30', border: 'border-green-700', text: 'text-green-400' },
                        yellow: { bg: 'bg-yellow-900/30', border: 'border-yellow-700', text: 'text-yellow-400' },
                        orange: { bg: 'bg-orange-900/30', border: 'border-orange-700', text: 'text-orange-400' },
                        purple: { bg: 'bg-purple-900/30', border: 'border-purple-700', text: 'text-purple-400' },
                        pink: { bg: 'bg-pink-900/30', border: 'border-pink-700', text: 'text-pink-400' },
                        cyan: { bg: 'bg-cyan-900/30', border: 'border-cyan-700', text: 'text-cyan-400' }
                      }
                      const c = colorMap[item.color]
                      return (
                        <div key={idx} className={`${c.bg} p-5 rounded-xl border ${c.border}`}>
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`${c.text} font-bold text-lg`}>{idx + 1}.</span>
                            <h4 className={`${c.text} font-bold text-lg`}>{item.phase}</h4>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{item.description}</p>
                          <div className="text-xs text-gray-400 bg-gray-900 p-2 rounded">
                            <strong>Default Plugin:</strong> <code className="text-green-400">{item.plugin}</code>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Clean Lifecycle */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-red-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🧹</span>
                    Clean Lifecycle
                  </h3>
                  <p className="text-gray-300 mb-4">
                    The clean lifecycle handles project cleaning. It removes files generated during the build process,
                    primarily the <code className="text-orange-400">target/</code> directory.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {[
                      { phase: 'pre-clean', desc: 'Execute processes needed before actual cleaning' },
                      { phase: 'clean', desc: 'Remove all files generated by the previous build (target/)' },
                      { phase: 'post-clean', desc: 'Execute processes needed after cleaning is complete' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-red-900/20 p-4 rounded-lg border border-red-700/50">
                        <h4 className="text-red-400 font-bold mb-2">{item.phase}</h4>
                        <p className="text-gray-300 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-green-400 text-sm">{`# Clean only
mvn clean

# Clean and compile (most common usage)
mvn clean compile

# Clean, build, and install
mvn clean install

# Configure clean plugin to delete additional directories
<plugin>
    <artifactId>maven-clean-plugin</artifactId>
    <version>3.3.2</version>
    <configuration>
        <filesets>
            <fileset>
                <directory>logs</directory>
                <includes>
                    <include>**/*.log</include>
                </includes>
            </fileset>
        </filesets>
    </configuration>
</plugin>`}</pre>
                  </div>
                </div>

                {/* Site Lifecycle */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-cyan-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🌐</span>
                    Site Lifecycle
                  </h3>
                  <p className="text-gray-300 mb-4">
                    The site lifecycle handles creation of project documentation and reports. It generates
                    an HTML website from project information, Javadocs, test reports, and custom documentation.
                  </p>

                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    {[
                      { phase: 'pre-site', desc: 'Execute processes before site generation' },
                      { phase: 'site', desc: 'Generate project documentation site' },
                      { phase: 'post-site', desc: 'Execute processes after site generation' },
                      { phase: 'site-deploy', desc: 'Deploy generated site to a web server' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-cyan-900/20 p-4 rounded-lg border border-cyan-700/50">
                        <h4 className="text-cyan-400 font-bold mb-2 text-sm">{item.phase}</h4>
                        <p className="text-gray-300 text-xs">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-green-400 text-sm">{`# Generate project site
mvn site

# Generate and deploy site
mvn site site:deploy

# Site plugin configuration in pom.xml
<reporting>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-javadoc-plugin</artifactId>
            <version>3.6.3</version>
        </plugin>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-report-plugin</artifactId>
            <version>3.2.5</version>
        </plugin>
        <plugin>
            <groupId>org.jacoco</groupId>
            <artifactId>jacoco-maven-plugin</artifactId>
            <version>0.8.11</version>
        </plugin>
    </plugins>
</reporting>`}</pre>
                  </div>
                </div>

                {/* Plugin Goals Bound to Phases */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-green-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🔗</span>
                    Plugin Goals Bound to Phases
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Each lifecycle phase has default plugin goals bound to it. You can also bind additional goals
                    to any phase via plugin configuration. A goal is a specific task within a plugin.
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-green-400 text-sm">{`# Phase → Default Plugin Goal (for jar packaging)
# ───────────────────────────────────────────────
# process-resources  → maven-resources-plugin:resources
# compile            → maven-compiler-plugin:compile
# process-test-resources → maven-resources-plugin:testResources
# test-compile       → maven-compiler-plugin:testCompile
# test               → maven-surefire-plugin:test
# package            → maven-jar-plugin:jar
# install            → maven-install-plugin:install
# deploy             → maven-deploy-plugin:deploy

# Bind a custom goal to a phase
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-antrun-plugin</artifactId>
    <version>3.1.0</version>
    <executions>
        <execution>
            <id>generate-sources</id>
            <phase>generate-sources</phase>   <!-- bind to this phase -->
            <goals>
                <goal>run</goal>              <!-- execute this goal -->
            </goals>
            <configuration>
                <target>
                    <echo message="Generating sources..." />
                </target>
            </configuration>
        </execution>
    </executions>
</plugin>`}</pre>
                  </div>
                </div>
              </div>
            )}

            {/* ===== POM & DEPENDENCIES TAB ===== */}
            {activeTab === 'pom' && (
              <div className="space-y-8">
                {/* Full POM Example */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-orange-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">📄</span>
                    POM Structure (pom.xml)
                  </h3>
                  <p className="text-gray-300 mb-4">
                    The Project Object Model (POM) is the fundamental unit of work in Maven. It is an XML file
                    that contains information about the project and configuration details used by Maven to build the project.
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-green-400 text-sm">{`<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <modelVersion>4.0.0</modelVersion>

    <!-- ===== GAV Coordinates ===== -->
    <groupId>com.example</groupId>         <!-- Organization/group -->
    <artifactId>my-application</artifactId> <!-- Project name -->
    <version>1.0.0-SNAPSHOT</version>       <!-- Version -->
    <packaging>jar</packaging>              <!-- jar, war, ear, pom -->

    <!-- ===== Project Info ===== -->
    <name>My Application</name>
    <description>A sample Maven project</description>
    <url>https://github.com/example/my-app</url>

    <!-- ===== Properties ===== -->
    <properties>
        <java.version>17</java.version>
        <maven.compiler.source>\${java.version}</maven.compiler.source>
        <maven.compiler.target>\${java.version}</maven.compiler.target>
        <spring-boot.version>3.2.4</spring-boot.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <!-- ===== Parent POM (optional) ===== -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.4</version>
        <relativePath/> <!-- lookup from repository -->
    </parent>

    <!-- ===== Dependencies ===== -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <!-- ===== Build Configuration ===== -->
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

    <!-- ===== Repositories (if not using Maven Central) ===== -->
    <repositories>
        <repository>
            <id>spring-milestones</id>
            <url>https://repo.spring.io/milestone</url>
        </repository>
    </repositories>
</project>`}</pre>
                  </div>
                </div>

                {/* GAV Coordinates */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-blue-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🎯</span>
                    GAV Coordinates
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Every Maven artifact is uniquely identified by its GAV coordinates: <strong className="text-orange-400">GroupId</strong>,{' '}
                    <strong className="text-orange-400">ArtifactId</strong>, and <strong className="text-orange-400">Version</strong>.
                    These form the unique address for any library or project in the Maven ecosystem.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-900/30 p-5 rounded-xl border border-blue-700">
                      <h4 className="text-blue-400 font-bold mb-2">groupId</h4>
                      <p className="text-gray-300 text-sm mb-2">Organization or project group, typically reverse domain name.</p>
                      <code className="text-green-400 text-xs bg-gray-900 p-1 rounded">com.example.myapp</code>
                    </div>
                    <div className="bg-green-900/30 p-5 rounded-xl border border-green-700">
                      <h4 className="text-green-400 font-bold mb-2">artifactId</h4>
                      <p className="text-gray-300 text-sm mb-2">The name of the specific project or module.</p>
                      <code className="text-green-400 text-xs bg-gray-900 p-1 rounded">user-service</code>
                    </div>
                    <div className="bg-purple-900/30 p-5 rounded-xl border border-purple-700">
                      <h4 className="text-purple-400 font-bold mb-2">version</h4>
                      <p className="text-gray-300 text-sm mb-2">Release version. SNAPSHOT for in-development builds.</p>
                      <code className="text-green-400 text-xs bg-gray-900 p-1 rounded">2.1.0-SNAPSHOT</code>
                    </div>
                  </div>
                </div>

                {/* Dependency Scopes */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-green-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🔍</span>
                    Dependency Scopes
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Scopes control when a dependency is available on the classpath and whether it is included in
                    the final packaged artifact. Choosing the right scope reduces artifact size and avoids conflicts.
                  </p>

                  <div className="space-y-4">
                    {[
                      {
                        scope: 'compile',
                        desc: 'Default scope. Available in all classpaths (compile, test, runtime). Included in the final package. Used for core libraries your code directly depends on.',
                        example: 'spring-boot-starter-web, jackson-databind',
                        color: 'blue'
                      },
                      {
                        scope: 'provided',
                        desc: 'Available at compile and test time, but NOT included in the final package. The runtime environment (e.g., application server) provides the dependency.',
                        example: 'javax.servlet-api, lombok',
                        color: 'green'
                      },
                      {
                        scope: 'runtime',
                        desc: 'NOT needed for compilation, but required at runtime and for tests. Included in the final package. Typically for implementation-specific libraries.',
                        example: 'mysql-connector-java, h2 (database drivers)',
                        color: 'orange'
                      },
                      {
                        scope: 'test',
                        desc: 'Only available during test compilation and execution. NOT included in the final package. Used for testing frameworks and utilities.',
                        example: 'junit-jupiter, mockito-core, spring-boot-starter-test',
                        color: 'purple'
                      },
                      {
                        scope: 'system',
                        desc: 'Similar to provided, but you must specify the JAR path explicitly via systemPath. Strongly discouraged - use a local repository instead.',
                        example: 'Legacy JARs not in any Maven repository',
                        color: 'red'
                      },
                      {
                        scope: 'import',
                        desc: 'Used only in <dependencyManagement> with type pom. Imports dependency definitions from another POM (BOM). Does not add actual dependencies.',
                        example: 'spring-boot-dependencies, spring-cloud-dependencies',
                        color: 'cyan'
                      }
                    ].map((item, idx) => {
                      const colorMap = {
                        blue: { bg: 'bg-blue-900/30', border: 'border-blue-700', text: 'text-blue-400' },
                        green: { bg: 'bg-green-900/30', border: 'border-green-700', text: 'text-green-400' },
                        orange: { bg: 'bg-orange-900/30', border: 'border-orange-700', text: 'text-orange-400' },
                        purple: { bg: 'bg-purple-900/30', border: 'border-purple-700', text: 'text-purple-400' },
                        red: { bg: 'bg-red-900/30', border: 'border-red-700', text: 'text-red-400' },
                        cyan: { bg: 'bg-cyan-900/30', border: 'border-cyan-700', text: 'text-cyan-400' }
                      }
                      const c = colorMap[item.color]
                      return (
                        <div key={idx} className={`${c.bg} p-5 rounded-xl border ${c.border}`}>
                          <h4 className={`${c.text} font-bold text-lg mb-2`}>{item.scope}</h4>
                          <p className="text-gray-300 text-sm mb-2">{item.desc}</p>
                          <div className="text-xs text-gray-400 bg-gray-900 p-2 rounded">
                            <strong>Examples:</strong> {item.example}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Dependency Management & BOM */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-purple-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">📋</span>
                    dependencyManagement &amp; BOM
                  </h3>
                  <p className="text-gray-300 mb-4">
                    The <code className="text-orange-400">{`<dependencyManagement>`}</code> section centralizes version
                    definitions without actually adding dependencies. Child modules or dependencies can then omit version numbers.
                    A Bill of Materials (BOM) is a POM that exports a curated set of dependency versions.
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-6">
                    <pre className="text-green-400 text-sm">{`<!-- Parent POM or project POM -->
<dependencyManagement>
    <dependencies>
        <!-- Import a BOM (Bill of Materials) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>3.2.4</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>

        <!-- Import Spring Cloud BOM -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2023.0.1</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>

        <!-- Define versions for other dependencies -->
        <dependency>
            <groupId>com.google.guava</groupId>
            <artifactId>guava</artifactId>
            <version>33.0.0-jre</version>
        </dependency>
    </dependencies>
</dependencyManagement>

<!-- In child module or dependencies section -->
<!-- No version needed - inherited from dependencyManagement -->
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <!-- version inherited from BOM -->
    </dependency>
    <dependency>
        <groupId>com.google.guava</groupId>
        <artifactId>guava</artifactId>
        <!-- version inherited from dependencyManagement -->
    </dependency>
</dependencies>`}</pre>
                  </div>
                </div>

                {/* Transitive Dependencies & Exclusions */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-red-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🌲</span>
                    Transitive Dependencies &amp; Exclusions
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Maven automatically resolves transitive dependencies (dependencies of your dependencies). This is
                    powerful but can cause version conflicts. Use exclusions and the dependency tree to manage conflicts.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-red-900/20 p-5 rounded-xl border border-red-700/50">
                      <h4 className="text-red-400 font-bold mb-2">Dependency Mediation</h4>
                      <p className="text-gray-300 text-sm">
                        When multiple versions of the same artifact are found, Maven uses the <strong className="text-orange-400">nearest definition</strong> strategy -
                        the version closest to your project in the dependency tree wins.
                      </p>
                    </div>
                    <div className="bg-yellow-900/20 p-5 rounded-xl border border-yellow-700/50">
                      <h4 className="text-yellow-400 font-bold mb-2">Version Ranges</h4>
                      <p className="text-gray-300 text-sm">
                        Maven supports version ranges: <code className="text-green-400">[1.0,2.0)</code> means &gt;= 1.0 and &lt; 2.0.
                        Use with caution as builds may become non-reproducible.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-green-400 text-sm">{`<!-- Excluding a transitive dependency -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <!-- Exclude Tomcat, use Undertow instead -->
        <exclusion>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-undertow</artifactId>
</dependency>

<!-- Exclude a specific transitive dependency -->
<dependency>
    <groupId>org.apache.hadoop</groupId>
    <artifactId>hadoop-common</artifactId>
    <version>3.3.6</version>
    <exclusions>
        <exclusion>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
        </exclusion>
        <exclusion>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- Version ranges (use sparingly)
    [1.0]       - exactly 1.0
    [1.0,2.0]   - between 1.0 and 2.0 inclusive
    [1.0,2.0)   - >= 1.0 and < 2.0
    (,1.0]      - <= 1.0
-->

# Useful commands for managing dependencies:
# mvn dependency:tree              - Show full dependency tree
# mvn dependency:tree -Dincludes=org.slf4j  - Filter tree
# mvn dependency:analyze           - Find unused/undeclared deps
# mvn enforcer:enforce             - Enforce dependency rules`}</pre>
                  </div>
                </div>
              </div>
            )}

            {/* ===== PLUGINS & PROFILES TAB ===== */}
            {activeTab === 'plugins' && (
              <div className="space-y-8">
                {/* Common Plugins */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-orange-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🔌</span>
                    Essential Maven Plugins
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Maven plugins provide goals that perform the actual work during the build process. Each plugin
                    can have multiple goals, and goals are bound to specific lifecycle phases.
                  </p>

                  {/* maven-compiler-plugin */}
                  <div className="mb-6">
                    <h4 className="text-blue-400 font-bold text-lg mb-3 flex items-center gap-2">
                      <span>1.</span> maven-compiler-plugin
                    </h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Compiles Java source code. Controls Java version, compiler arguments, annotation processing,
                      and incremental compilation. Bound to the <code className="text-orange-400">compile</code> and{' '}
                      <code className="text-orange-400">test-compile</code> phases.
                    </p>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">{`<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.12.1</version>
    <configuration>
        <source>17</source>
        <target>17</target>
        <!-- Or use release for cross-compilation safety -->
        <release>17</release>
        <compilerArgs>
            <arg>-Xlint:all</arg>
            <arg>-parameters</arg>  <!-- Preserve parameter names -->
        </compilerArgs>
        <annotationProcessorPaths>
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>1.18.30</version>
            </path>
            <path>
                <groupId>org.mapstruct</groupId>
                <artifactId>mapstruct-processor</artifactId>
                <version>1.5.5.Final</version>
            </path>
        </annotationProcessorPaths>
    </configuration>
</plugin>`}</pre>
                    </div>
                  </div>

                  {/* maven-surefire-plugin */}
                  <div className="mb-6">
                    <h4 className="text-green-400 font-bold text-lg mb-3 flex items-center gap-2">
                      <span>2.</span> maven-surefire-plugin
                    </h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Runs unit tests during the <code className="text-orange-400">test</code> phase.
                      Supports JUnit 4/5 and TestNG. By default, includes classes matching{' '}
                      <code className="text-green-400">**/Test*.java</code>,{' '}
                      <code className="text-green-400">**/*Test.java</code>,{' '}
                      <code className="text-green-400">**/*Tests.java</code>.
                    </p>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">{`<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>3.2.5</version>
    <configuration>
        <!-- Skip tests -->
        <!-- <skipTests>true</skipTests> -->

        <!-- Include/exclude specific tests -->
        <includes>
            <include>**/*Test.java</include>
            <include>**/*Tests.java</include>
        </includes>
        <excludes>
            <exclude>**/*IntegrationTest.java</exclude>
        </excludes>

        <!-- JVM arguments for tests -->
        <argLine>-Xmx1024m -XX:MaxMetaspaceSize=256m</argLine>

        <!-- Parallel test execution -->
        <parallel>methods</parallel>
        <threadCount>4</threadCount>

        <!-- System properties -->
        <systemPropertyVariables>
            <spring.profiles.active>test</spring.profiles.active>
        </systemPropertyVariables>
    </configuration>
</plugin>`}</pre>
                    </div>
                  </div>

                  {/* maven-failsafe-plugin */}
                  <div className="mb-6">
                    <h4 className="text-purple-400 font-bold text-lg mb-3 flex items-center gap-2">
                      <span>3.</span> maven-failsafe-plugin
                    </h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Runs integration tests during the <code className="text-orange-400">verify</code> phase.
                      By default includes <code className="text-green-400">**/IT*.java</code>,{' '}
                      <code className="text-green-400">**/*IT.java</code>,{' '}
                      <code className="text-green-400">**/*ITCase.java</code>.
                      Ensures post-integration-test cleanup runs even if tests fail.
                    </p>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">{`<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-failsafe-plugin</artifactId>
    <version>3.2.5</version>
    <executions>
        <execution>
            <goals>
                <goal>integration-test</goal>
                <goal>verify</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <includes>
            <include>**/*IT.java</include>
            <include>**/*IntegrationTest.java</include>
        </includes>
        <argLine>-Xmx2048m</argLine>
        <systemPropertyVariables>
            <spring.profiles.active>integration</spring.profiles.active>
        </systemPropertyVariables>
    </configuration>
</plugin>

<!-- Typical usage: mvn verify
     This runs: compile → test (surefire) → package →
                integration-test (failsafe) → verify -->`}</pre>
                    </div>
                  </div>

                  {/* maven-shade-plugin */}
                  <div className="mb-6">
                    <h4 className="text-yellow-400 font-bold text-lg mb-3 flex items-center gap-2">
                      <span>4.</span> maven-shade-plugin
                    </h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Creates an uber-JAR (fat JAR) that includes all dependencies. Useful for creating self-contained
                      executable JARs. Supports class relocation to avoid classpath conflicts.
                    </p>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">{`<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <version>3.5.2</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
            <configuration>
                <transformers>
                    <!-- Set main class -->
                    <transformer implementation=
                        "org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                        <mainClass>com.example.Main</mainClass>
                    </transformer>
                    <!-- Merge META-INF/services files -->
                    <transformer implementation=
                        "org.apache.maven.plugins.shade.resource.ServicesResourceTransformer"/>
                </transformers>
                <relocations>
                    <!-- Relocate Guava to avoid conflicts -->
                    <relocation>
                        <pattern>com.google.common</pattern>
                        <shadedPattern>com.example.shaded.guava</shadedPattern>
                    </relocation>
                </relocations>
                <filters>
                    <filter>
                        <artifact>*:*</artifact>
                        <excludes>
                            <exclude>META-INF/*.SF</exclude>
                            <exclude>META-INF/*.DSA</exclude>
                            <exclude>META-INF/*.RSA</exclude>
                        </excludes>
                    </filter>
                </filters>
            </configuration>
        </execution>
    </executions>
</plugin>`}</pre>
                    </div>
                  </div>

                  {/* maven-assembly-plugin */}
                  <div className="mb-6">
                    <h4 className="text-cyan-400 font-bold text-lg mb-3 flex items-center gap-2">
                      <span>5.</span> maven-assembly-plugin
                    </h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Creates distributable archives (ZIP, TAR.GZ) with custom layouts. Useful for bundling
                      the application with scripts, configuration files, and documentation.
                    </p>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">{`<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-assembly-plugin</artifactId>
    <version>3.7.0</version>
    <configuration>
        <descriptorRefs>
            <!-- Predefined: jar-with-dependencies, src, bin -->
            <descriptorRef>jar-with-dependencies</descriptorRef>
        </descriptorRefs>
        <archive>
            <manifest>
                <mainClass>com.example.Main</mainClass>
            </manifest>
        </archive>
        <!-- Or use a custom descriptor file -->
        <!-- <descriptors>
            <descriptor>src/assembly/distribution.xml</descriptor>
        </descriptors> -->
    </configuration>
    <executions>
        <execution>
            <id>make-assembly</id>
            <phase>package</phase>
            <goals>
                <goal>single</goal>
            </goals>
        </execution>
    </executions>
</plugin>`}</pre>
                    </div>
                  </div>

                  {/* spring-boot-maven-plugin */}
                  <div className="mb-6">
                    <h4 className="text-pink-400 font-bold text-lg mb-3 flex items-center gap-2">
                      <span>6.</span> spring-boot-maven-plugin
                    </h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Spring Boot's official Maven plugin. Packages the application as an executable JAR/WAR with embedded
                      server. Provides goals for running, building, and creating Docker images.
                    </p>
                    <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-green-400 text-sm">{`<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <version>3.2.4</version>
    <configuration>
        <mainClass>com.example.Application</mainClass>
        <!-- Exclude dev-only dependencies from package -->
        <excludes>
            <exclude>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
            </exclude>
        </excludes>
        <!-- Build OCI image (Docker) -->
        <image>
            <name>registry.example.com/\${project.artifactId}:\${project.version}</name>
            <builder>paketobuildpacks/builder-jammy-base:latest</builder>
            <env>
                <BP_JVM_VERSION>17</BP_JVM_VERSION>
            </env>
        </image>
        <!-- Layers for efficient Docker caching -->
        <layers>
            <enabled>true</enabled>
        </layers>
    </configuration>
    <executions>
        <execution>
            <goals>
                <goal>repackage</goal>  <!-- Create executable JAR -->
                <goal>build-info</goal> <!-- Generate build-info.properties -->
            </goals>
        </execution>
    </executions>
</plugin>

<!-- Usage:
  mvn spring-boot:run          - Run the application
  mvn spring-boot:build-image  - Build Docker image
  mvn package                  - Create executable JAR
-->`}</pre>
                    </div>
                  </div>
                </div>

                {/* Build Profiles */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-green-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🎭</span>
                    Build Profiles
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Profiles allow customizing the build for different environments (dev, staging, prod).
                    They can modify dependencies, plugins, properties, and build configuration. Profiles can
                    be activated via command line, JDK version, OS, or property values.
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-6">
                    <pre className="text-green-400 text-sm">{`<profiles>
    <!-- Development Profile (default) -->
    <profile>
        <id>dev</id>
        <activation>
            <activeByDefault>true</activeByDefault>
        </activation>
        <properties>
            <spring.profiles.active>dev</spring.profiles.active>
            <log.level>DEBUG</log.level>
        </properties>
        <dependencies>
            <dependency>
                <groupId>com.h2database</groupId>
                <artifactId>h2</artifactId>
                <scope>runtime</scope>
            </dependency>
        </dependencies>
    </profile>

    <!-- Production Profile -->
    <profile>
        <id>prod</id>
        <activation>
            <property>
                <name>env</name>
                <value>production</value>
            </property>
        </activation>
        <properties>
            <spring.profiles.active>prod</spring.profiles.active>
            <log.level>WARN</log.level>
        </properties>
        <dependencies>
            <dependency>
                <groupId>org.postgresql</groupId>
                <artifactId>postgresql</artifactId>
                <scope>runtime</scope>
            </dependency>
        </dependencies>
        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-enforcer-plugin</artifactId>
                    <version>3.4.1</version>
                    <executions>
                        <execution>
                            <id>enforce-no-snapshots</id>
                            <goals><goal>enforce</goal></goals>
                            <configuration>
                                <rules>
                                    <requireReleaseDeps>
                                        <message>No SNAPSHOT deps in production!</message>
                                    </requireReleaseDeps>
                                </rules>
                            </configuration>
                        </execution>
                    </executions>
                </plugin>
            </plugins>
        </build>
    </profile>

    <!-- JDK-specific Profile -->
    <profile>
        <id>jdk-17</id>
        <activation>
            <jdk>17</jdk>
        </activation>
        <properties>
            <maven.compiler.release>17</maven.compiler.release>
        </properties>
    </profile>
</profiles>

<!-- Activate profiles:
  mvn clean install -Pprod          # By name
  mvn clean install -Denv=production # By property
  mvn help:active-profiles          # Show active profiles
-->`}</pre>
                  </div>
                </div>

                {/* Multi-Module Projects */}
                <div className="bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-purple-600">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🏗️</span>
                    Multi-Module Projects
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Maven's reactor build system handles multi-module projects. A parent POM with{' '}
                    <code className="text-orange-400">{`<packaging>pom</packaging>`}</code> aggregates child
                    modules. The reactor determines the correct build order based on inter-module dependencies.
                  </p>

                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-6">
                    <pre className="text-green-400 text-sm">{`<!-- Parent POM (my-platform/pom.xml) -->
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>my-platform</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <packaging>pom</packaging>  <!-- Must be pom for parent -->

    <!-- Module declaration (build order resolved by reactor) -->
    <modules>
        <module>common</module>
        <module>domain</module>
        <module>api</module>
        <module>service</module>
        <module>web</module>
    </modules>

    <!-- Shared properties for all modules -->
    <properties>
        <java.version>17</java.version>
        <spring-boot.version>3.2.4</spring-boot.version>
    </properties>

    <!-- Centralize dependency versions -->
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>\${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <!-- Internal module versions -->
            <dependency>
                <groupId>com.example</groupId>
                <artifactId>common</artifactId>
                <version>\${project.version}</version>
            </dependency>
            <dependency>
                <groupId>com.example</groupId>
                <artifactId>domain</artifactId>
                <version>\${project.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <!-- Shared plugin configuration -->
    <build>
        <pluginManagement>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <version>3.12.1</version>
                    <configuration>
                        <release>\${java.version}</release>
                    </configuration>
                </plugin>
            </plugins>
        </pluginManagement>
    </build>
</project>`}</pre>
                  </div>

                  <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-6">
                    <pre className="text-green-400 text-sm">{`<!-- Child Module POM (my-platform/service/pom.xml) -->
<project>
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example</groupId>
        <artifactId>my-platform</artifactId>
        <version>1.0.0-SNAPSHOT</version>
    </parent>

    <artifactId>service</artifactId>
    <!-- version inherited from parent -->

    <dependencies>
        <!-- Internal dependency (version from dependencyManagement) -->
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>domain</artifactId>
        </dependency>
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>common</artifactId>
        </dependency>
        <!-- External dependency (version from BOM) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
</project>`}</pre>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-700">
                      <h4 className="text-purple-400 font-bold mb-2">Reactor Build Commands</h4>
                      <div className="bg-gray-900 p-3 rounded text-sm">
                        <pre className="text-green-400">{`# Build all modules
mvn clean install

# Build specific module + deps
mvn clean install -pl service -am

# Build from a specific module
mvn clean install -rf :service

# Build only specific modules
mvn clean install -pl common,domain

# Resume from failure point
mvn clean install -rf :failed-module`}</pre>
                      </div>
                    </div>
                    <div className="bg-cyan-900/30 p-4 rounded-lg border border-cyan-700">
                      <h4 className="text-cyan-400 font-bold mb-2">Reactor Options</h4>
                      <ul className="text-gray-300 text-sm space-y-2">
                        <li><code className="text-green-400">-pl</code> - Build specific projects (comma-separated)</li>
                        <li><code className="text-green-400">-am</code> - Also make dependencies of listed projects</li>
                        <li><code className="text-green-400">-amd</code> - Also make dependents (reverse deps)</li>
                        <li><code className="text-green-400">-rf</code> - Resume reactor from specified project</li>
                        <li><code className="text-green-400">-T 4</code> - Build with 4 threads in parallel</li>
                        <li><code className="text-green-400">-T 1C</code> - 1 thread per CPU core</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  )
}
