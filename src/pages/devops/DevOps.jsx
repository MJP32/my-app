import { useState, useEffect, useRef } from 'react'

const ModernDiagram = ({ components, onComponentClick, title, width = 1400, height = 800, containerWidth = 1800, focusedIndex }) => {
  const [hoveredComponent, setHoveredComponent] = useState(null)

  return (
    <div style={{
      width: '100%',
      maxWidth: `${containerWidth}px`,
      margin: '0 auto',
      backgroundColor: '#f8fafc',
      borderRadius: '16px',
      padding: '2rem',
      boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
      border: '2px solid #e2e8f0'
    }}>
      <h3 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontSize: '1.75rem',
        fontWeight: '800',
        color: '#1e293b',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        {title}
      </h3>

      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#059669" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eab308" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#ca8a04" stopOpacity="0.9"/>
          </linearGradient>

          {/* Arrow markers for different connection types */}
          <marker id="arrowSolid" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#1e293b" />
          </marker>
          <marker id="arrowDashed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Architectural layer backgrounds */}
        <g opacity="0.1">
          <rect x="50" y="180" width="420" height="380" rx="16" fill="#3b82f6" />
          <text x="260" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af" opacity="0.6">
            Build Layer
          </text>

          <rect x="550" y="80" width="420" height="480" rx="16" fill="#10b981" />
          <text x="760" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669" opacity="0.6">
            Container Layer
          </text>

          <rect x="1050" y="180" width="420" height="480" rx="16" fill="#ef4444" />
          <text x="1260" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#dc2626" opacity="0.6">
            Orchestration Layer
          </text>

          <rect x="150" y="580" width="980" height="200" rx="16" fill="#f97316" />
          <text x="640" y="610" textAnchor="middle" fontSize="14" fontWeight="700" fill="#ea580c" opacity="0.6">
            Monitoring & Observability Layer
          </text>
        </g>

        {/* Connecting lines with arrows and labels */}
        <g fill="none">
          {/* Solid lines for strong dependencies */}
          <line x1="430" y1="300" x2="580" y2="200" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="240" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            builds
          </text>

          <line x1="430" y1="300" x2="580" y2="400" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="360" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            creates
          </text>

          {/* Dashed lines for loose coupling */}
          <line x1="930" y1="200" x2="1080" y2="300" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="240" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            deploys to
          </text>

          <line x1="930" y1="400" x2="1080" y2="300" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="360" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            manages
          </text>

          <line x1="1260" y1="400" x2="1260" y2="520" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1290" y="460" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="start">
            validates
          </text>
        </g>

        {/* Component rectangles */}
        {components.map((component, index) => {
          const isFocused = focusedIndex === index
          const isHovered = hoveredComponent === component.id
          const isHighlighted = isFocused || isHovered

          return (
          <g key={component.id}>
            {/* Focused ring indicator */}
            {isFocused && (
              <rect
                x={component.x - 6}
                y={component.y - 6}
                width={component.width + 12}
                height={component.height + 12}
                rx="16"
                ry="16"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="4"
                style={{
                  opacity: 0.9,
                  filter: 'drop-shadow(0 0 12px rgba(251, 191, 36, 0.6))'
                }}
              />
            )}
            <rect
              x={component.x}
              y={component.y}
              width={component.width}
              height={component.height}
              rx="12"
              ry="12"
              fill={`url(#${component.color}Gradient)`}
              stroke={isHighlighted ? '#1e293b' : '#64748b'}
              strokeWidth={isHighlighted ? '4' : '2'}
              style={{
                cursor: 'pointer',
                filter: isHighlighted ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                transform: isHighlighted ? 'scale(1.05)' : 'scale(1)',
                transformOrigin: `${component.x + component.width/2}px ${component.y + component.height/2}px`,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={() => setHoveredComponent(component.id)}
              onMouseLeave={() => setHoveredComponent(null)}
              onClick={() => onComponentClick && onComponentClick(component)}
            />

            {/* Icon */}
            <text
              x={component.x + component.width/2}
              y={component.y + 50}
              textAnchor="middle"
              fontSize="40"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.icon}
            </text>

            {/* Title */}
            <text
              x={component.x + component.width/2}
              y={component.y + 100}
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="white"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.title}
            </text>

            {/* Subtitle */}
            <text
              x={component.x + component.width/2}
              y={component.y + 125}
              textAnchor="middle"
              fontSize="12"
              fontWeight="500"
              fill="rgba(255,255,255,0.8)"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.summary}
            </text>
          </g>
        )})}
      </svg>
    </div>
  )
}

function DevOps({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory }) {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [focusedComponentIndex, setFocusedComponentIndex] = useState(0)

  const components = [
    {
      id: 'teamcity', x: 80, y: 240, width: 350, height: 160,
      icon: '🏗️', title: 'TeamCity', color: 'blue',
      summary: 'CI/CD Automation',
      details: [
        { name: 'Concepts', explanation: 'Build configurations, templates, VCS roots, agents, and Kotlin DSL for pipelines. Parallel builds and build chains for complex delivery flows.' },
        { name: 'Best Practices', explanation: 'Use Kotlin DSL in repo, parameterize build configurations, enable build cache and artifacts dependencies, enforce quality gates.' },
        { name: 'Common Commands', explanation: 'teamcity-server start/stop - Start/stop server • teamcity-agent start/stop - Start/stop agent • REST API: curl -u user:pass http://localhost:8111/app/rest/builds - List builds • curl -u user:pass -X POST http://localhost:8111/app/rest/buildQueue -d @build.xml - Trigger build' }
      ],
      codeExample: `// .teamcity/settings.kts
import jetbrains.buildServer.configs.kotlin.*
import jetbrains.buildServer.configs.kotlin.vcs.GitVcsRoot
import jetbrains.buildServer.configs.kotlin.buildSteps.script

version = "2024.03"

project {
    params { param("env.NODE_ENV", "ci") }

    val vcs = GitVcsRoot({
        name = "app"
        url = "https://github.com/org/app.git"
        branch = "refs/heads/main"
    })

    buildType(object : BuildType({
        name = "Build"
        vcs { root(vcs) }
        steps {
            script { scriptContent = "npm ci && npm run build" }
        }
        artifactRules = "dist => dist"
    }){})
}`
    },
    {
      id: 'jenkins', x: 580, y: 140, width: 350, height: 160,
      icon: '🧰', title: 'Jenkins', color: 'green',
      summary: 'CI/CD Server',
      details: [
        { name: 'Concepts', explanation: 'Declarative and scripted pipelines, shared libraries, credentials management, Blue Ocean visualization, multi-branch pipelines.' },
        { name: 'Best Practices', explanation: 'Use Jenkinsfile in repo, lock down executors, use folders/roles, run controllers agents separately, cache dependencies, scan PRs.' },
        { name: 'Common Commands', explanation: 'jenkins-cli -s http://localhost:8080 build JOB - Trigger job • jenkins-cli list-jobs - List all jobs • jenkins-cli console JOB - Show build logs • jenkins-cli reload-configuration - Reload config • REST API: curl http://localhost:8080/api/json - System info • curl -X POST http://localhost:8080/job/JOB/build - Trigger build' }
      ],
      codeExample: `// Jenkinsfile (declarative)
pipeline {
  agent any
  options { timestamps() }
  environment { NODE_ENV = 'ci' }
  stages {
    stage('Checkout') { steps { checkout scm } }
    stage('Install')  { steps { sh 'npm ci' } }
    stage('Test')     { steps { sh 'npm test -- --ci' } }
    stage('Build')    { steps { sh 'npm run build' } }
  }
  post {
    always { archiveArtifacts artifacts: 'dist/**' }
  }
}`
    },
    {
      id: 'docker', x: 580, y: 340, width: 350, height: 160,
      icon: '🐳', title: 'Docker', color: 'purple',
      summary: 'Containerization',
      details: [
        { name: 'Concepts', explanation: 'Images, layers, multi-stage builds, healthchecks, registries, and Compose for local orchestration.' },
        { name: 'Best Practices', explanation: 'Use slim base images, multi-stage for smaller artifacts, non-root user, .dockerignore, pinned versions, read-only FS where possible.' },
        { name: 'Common Commands', explanation: 'docker build -t image:tag . - Build image • docker run -d -p 8080:80 image - Run container • docker ps - List containers • docker logs <container> - View logs • docker exec -it <container> sh - Shell access • docker images - List images • docker system prune - Cleanup • docker compose up - Start stack • docker inspect <container> - View details' }
      ],
      codeExample: `# Dockerfile (Node + Vite)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK CMD wget -qO- http://localhost/ || exit 1`
    },
    {
      id: 'kubernetes', x: 1080, y: 240, width: 350, height: 160,
      icon: '☸️', title: 'Kubernetes', color: 'red',
      summary: 'Container Orchestration',
      details: [
        { name: 'Concepts', explanation: 'Deployments, Services, Ingress, ConfigMaps/Secrets, Requests/Limits, HPA, liveness/readiness probes.' },
        { name: 'Best Practices', explanation: 'Set resource requests/limits, use probes, declarative GitOps flows, separate namespaces, RBAC, network policies, and sealed secrets.' },
        { name: 'Common Commands', explanation: 'kubectl apply -f manifest.yaml - Apply config • kubectl get pods - List pods • kubectl logs <pod> - View logs • kubectl exec -it <pod> -- sh - Shell access • kubectl describe pod <pod> - Pod details • kubectl get svc - List services • kubectl rollout status deployment/<name> - Check rollout • kubectl scale deployment/<name> --replicas=3 - Scale • kubectl port-forward <pod> 8080:80 - Forward port' }
      ],
      codeExample: `# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels: { app: my-app }
  template:
    metadata:
      labels: { app: my-app }
    spec:
      containers:
        - name: web
          image: ghcr.io/org/my-app:1.0.0
          ports: [{ containerPort: 80 }]
          resources:
            requests: { cpu: "100m", memory: "128Mi" }
            limits:   { cpu: "500m", memory: "256Mi" }
          readinessProbe:
            httpGet: { path: '/', port: 80 }
            initialDelaySeconds: 5`
    },
    {
      id: 'prometheus', x: 250, y: 600, width: 350, height: 160,
      icon: '📊', title: 'Prometheus', color: 'orange',
      summary: 'Metrics & Monitoring',
      details: [
        { name: 'Concepts', explanation: 'Time-series database for metrics. Pull-based scraping model, PromQL query language, service discovery, alerting with Alertmanager.' },
        { name: 'Best Practices', explanation: 'Label metrics properly, use histograms for latencies, set appropriate scrape intervals, use recording rules for complex queries, configure retention.' },
        { name: 'Common Commands', explanation: 'promtool check config prometheus.yml - Validate config • promtool query instant http://localhost:9090 \'up\' - Query metrics • curl http://localhost:9090/api/v1/query?query=up - Query via API • curl http://localhost:9090/api/v1/targets - View targets • curl http://localhost:9090/api/v1/alerts - View alerts • promtool check rules rules.yml - Validate alerting rules' }
      ],
      codeExample: `# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'my-app'
    static_configs:
      - targets: ['localhost:8080']
    metrics_path: '/actuator/prometheus'

alerting:
  alertmanagers:
    - static_configs:
        - targets: ['localhost:9093']

rule_files:
  - 'alerts.yml'

# alerts.yml
groups:
  - name: example
    interval: 10s
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status="500"}[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value }} errors/sec"

      - alert: HighMemoryUsage
        expr: (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) < 0.1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Low memory available"

# Sample PromQL queries:
# CPU usage: rate(process_cpu_seconds_total[5m])
# Memory usage: process_resident_memory_bytes
# HTTP request rate: rate(http_requests_total[5m])
# 95th percentile latency: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
# Error rate: rate(http_requests_total{status=~"5.."}[5m])`
    },
    {
      id: 'grafana', x: 680, y: 600, width: 350, height: 160,
      icon: '📈', title: 'Grafana', color: 'yellow',
      summary: 'Visualization & Dashboards',
      details: [
        { name: 'Concepts', explanation: 'Dashboard and visualization platform. Supports multiple data sources (Prometheus, Elasticsearch, etc.), templating, alerts, and annotations.' },
        { name: 'Best Practices', explanation: 'Organize dashboards in folders, use variables for dynamic dashboards, set appropriate refresh rates, use alert notifications, export dashboards as JSON.' },
        { name: 'Common Commands', explanation: 'grafana-cli plugins list - List plugins • grafana-cli plugins install <plugin> - Install plugin • curl -X POST http://admin:admin@localhost:3000/api/dashboards/db -d @dashboard.json - Import dashboard • curl http://admin:admin@localhost:3000/api/dashboards/home - Get home dashboard • curl http://admin:admin@localhost:3000/api/datasources - List datasources • grafana-cli admin reset-admin-password - Reset admin password' }
      ],
      codeExample: `# Docker Compose with Prometheus + Grafana
version: '3'
services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus-data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana-data:/var/lib/grafana
    depends_on:
      - prometheus

volumes:
  prometheus-data:
  grafana-data:

# Grafana Dashboard JSON (simplified)
{
  "dashboard": {
    "title": "App Metrics",
    "panels": [
      {
        "title": "Request Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])"
          }
        ],
        "type": "graph"
      },
      {
        "title": "Error Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~\\"5..\\"}[5m])"
          }
        ],
        "type": "graph"
      }
    ]
  }
}

# Provisioning datasource (datasources.yml)
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
    editable: false`
    },
    {
      id: 'testing', x: 1080, y: 440, width: 350, height: 160,
      icon: '✅', title: 'Testing', color: 'teal',
      summary: 'Automated Testing',
      details: [
        { name: 'Unit Testing', explanation: 'Tests individual functions/methods in isolation. Fast, deterministic. Tools: Jest, JUnit, pytest, Mocha. Mock external dependencies.' },
        { name: 'Integration Testing', explanation: 'Tests multiple components working together. Database connections, API endpoints, service interactions. Tools: Supertest, TestContainers.' },
        { name: 'E2E Testing', explanation: 'Tests full user workflows through UI. Browser automation. Tools: Playwright, Cypress, Selenium. Slower but validates complete flows.' },
        { name: 'Contract Testing', explanation: 'Tests API contracts between services. Provider/consumer verification. Tools: Pact, Spring Cloud Contract. Prevents breaking changes.' },
        { name: 'Performance Testing', explanation: 'Load testing, stress testing, spike testing. Tools: k6, JMeter, Gatling. Validates scalability and response times.' },
        { name: 'Security Testing', explanation: 'SAST (static analysis), DAST (dynamic), dependency scanning, penetration testing. Tools: SonarQube, OWASP ZAP, Snyk.' },
        { name: 'Smoke Testing', explanation: 'Quick sanity checks after deployment. Critical path validation. Runs before full test suites.' },
        { name: 'Regression Testing', explanation: 'Re-run existing tests after code changes. Ensures new code doesn\'t break existing functionality. Automated in CI/CD.' },
        { name: 'Common Commands', explanation: 'npm test - Run all tests • npm test -- --coverage - Run with coverage • npm test -- --watch - Watch mode • jest <file> - Run specific test • jest --updateSnapshot - Update snapshots • npm run test:e2e - Run e2e tests • npm run test:unit - Run unit tests • npm run test:integration - Run integration tests • jest --listTests - List all test files' }
      ],
      codeExample: `// Example Jest test
import { sum } from './sum'

describe('sum', () => {
  it('adds numbers', () => {
    expect(sum(2, 3)).toBe(5)
  })

  it('handles edge cases', () => {
    expect(sum(0, 0)).toBe(0)
    expect(sum(-1, 1)).toBe(0)
  })
})`
    }
  ]

  // Set focus to first component on mount
  useEffect(() => {
    setTimeout(() => {
      setFocusedComponentIndex(0)
    }, 100)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentIsModalOpen = isModalOpenRef.current
      console.log(' KeyDown:', e.key, 'isModalOpen:', currentIsModalOpen)

      // Handle Escape to close modal or go back to menu
      if (e.key === 'Escape') {
        if (currentIsModalOpen) {
          e.preventDefault()
          e.stopImmediatePropagation()
          closeModal()
          return
        }
        return
      }

      // Don't handle other keys if modal is open
      if (currentIsModalOpen) return

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        setFocusedComponentIndex((prev) => (prev + 1) % components.length)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        setFocusedComponentIndex((prev) => (prev - 1 + components.length) % components.length)
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleComponentClick(components[focusedComponentIndex])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isModalOpen, focusedComponentIndex, components, onBack])

  const handleComponentClick = (component) => {
    setSelectedComponent(component)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedComponent(null)
  }

  // Use refs to access current modal state in event handler
  const isModalOpenRef = useRef(isModalOpen)
  useEffect(() => {
    isModalOpenRef.current = isModalOpen
  }, [isModalOpen])


  return (
    <div style={{
      padding: '2rem',
      maxWidth: '95%',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(14, 165, 233, 0.4)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            ← Back to Menu
          </button>
          <div>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#1f2937',
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
              🛠️ DevOps
            </h1>
            {currentSubcategory && (
              <span style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                borderRadius: '6px',
                marginTop: '0.25rem',
                display: 'inline-block'
              }}>
                {currentSubcategory}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {onPrevious && (
            <button
              onClick={onPrevious}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              style={{
                padding: '0.75rem 1.25rem',
                fontSize: '1rem',
                fontWeight: '600',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <p style={{
        textAlign: 'center',
        fontSize: '1.1rem',
        color: '#4b5563',
        marginBottom: '2rem',
        maxWidth: '900px',
        margin: '0 auto 2rem'
      }}>
        End-to-end CI/CD automation, containerization, orchestration, and testing practices for modern cloud-native development
      </p>

      <ModernDiagram
        components={components}
        onComponentClick={handleComponentClick}
        title="DevOps Tools & Practices"
        width={1400}
        height={850}
        containerWidth={1800}
        focusedIndex={focusedComponentIndex}
      />

      {/* Modal */}
      {isModalOpen && selectedComponent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 99999,
          padding: '2rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '900px',
            width: '100%',
            maxHeight: '85vh',
            overflow: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '3px solid rgba(14, 165, 233, 0.4)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '2rem',
                fontWeight: '800',
                color: '#1f2937'
              }}>
                {selectedComponent.icon} {selectedComponent.title}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              {selectedComponent.details.map((detail, index) => (
                <div key={index} style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '0.5rem'
                  }}>
                    {detail.name}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    color: '#4b5563',
                    lineHeight: '1.7',
                    margin: 0
                  }}>
                    {detail.explanation}
                  </p>
                </div>
              ))}
            </div>

            {selectedComponent.codeExample && (
              <div style={{
                backgroundColor: '#1e293b',
                borderRadius: '12px',
                padding: '1.5rem',
                border: '2px solid #334155'
              }}>
                <h4 style={{
                  fontSize: '1rem',
                  fontWeight: '700',
                  color: '#60a5fa',
                  margin: '0 0 1rem 0'
                }}>
                  💻 Code Example
                </h4>
                <pre style={{
                  color: '#e2e8f0',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  margin: 0,
                  overflow: 'auto',
                  fontFamily: 'Consolas, Monaco, "Courier New", monospace'
                }}>
                  {selectedComponent.codeExample}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default DevOps
