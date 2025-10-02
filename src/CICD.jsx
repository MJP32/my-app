import { useState } from 'react'

export default function CICD({ onBack }) {
  const [selectedPipeline, setSelectedPipeline] = useState(null)

  const pipelines = [
    {
      name: 'Jenkins Pipeline',
      icon: '🔧',
      color: '#d24939',
      description: 'Declarative and Scripted pipeline examples with multi-stage builds, parallel execution, and deployment automation',
      example: `// Jenkinsfile - Declarative Pipeline
pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'registry.example.com'
        APP_NAME = 'my-app'
        SONAR_HOST = 'https://sonarqube.example.com'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/company/repo.git',
                    credentialsId: 'github-credentials'
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Test') {
            parallel {
                stage('Unit Tests') {
                    steps {
                        sh 'mvn test'
                    }
                    post {
                        always {
                            junit '**/target/surefire-reports/*.xml'
                        }
                    }
                }
                stage('Integration Tests') {
                    steps {
                        sh 'mvn verify -P integration-tests'
                    }
                }
            }
        }

        stage('Code Quality') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'mvn sonar:sonar'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 10, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build("\${DOCKER_REGISTRY}/\${APP_NAME}:\${BUILD_NUMBER}")
                    dockerImage.push()
                    dockerImage.push('latest')
                }
            }
        }

        stage('Deploy to Staging') {
            steps {
                script {
                    sh """
                        kubectl set image deployment/\${APP_NAME} \\
                        \${APP_NAME}=\${DOCKER_REGISTRY}/\${APP_NAME}:\${BUILD_NUMBER} \\
                        -n staging
                    """
                }
            }
        }

        stage('Smoke Tests') {
            steps {
                sh './scripts/smoke-tests.sh staging'
            }
        }

        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                input message: 'Deploy to Production?', ok: 'Deploy'
                script {
                    sh """
                        kubectl set image deployment/\${APP_NAME} \\
                        \${APP_NAME}=\${DOCKER_REGISTRY}/\${APP_NAME}:\${BUILD_NUMBER} \\
                        -n production
                    """
                }
            }
        }
    }

    post {
        success {
            slackSend channel: '#deployments',
                color: 'good',
                message: "Pipeline \${env.JOB_NAME} #\${env.BUILD_NUMBER} succeeded"
        }
        failure {
            slackSend channel: '#deployments',
                color: 'danger',
                message: "Pipeline \${env.JOB_NAME} #\${env.BUILD_NUMBER} failed"
        }
    }
}`
    },
    {
      name: 'GitLab CI/CD',
      icon: '🦊',
      color: '#fc6d26',
      description: 'GitLab CI/CD pipeline with stages, jobs, artifacts, and deployment strategies',
      example: `# .gitlab-ci.yml
variables:
  DOCKER_REGISTRY: registry.gitlab.com
  APP_NAME: my-app
  MAVEN_OPTS: "-Dmaven.repo.local=.m2/repository"

stages:
  - build
  - test
  - quality
  - package
  - deploy

cache:
  paths:
    - .m2/repository/
    - target/

build:
  stage: build
  image: maven:3.8-openjdk-17
  script:
    - mvn clean compile
  artifacts:
    paths:
      - target/
    expire_in: 1 hour

unit-test:
  stage: test
  image: maven:3.8-openjdk-17
  script:
    - mvn test
  coverage: '/Total.*?([0-9]{1,3})%/'
  artifacts:
    reports:
      junit:
        - target/surefire-reports/TEST-*.xml
      coverage_report:
        coverage_format: cobertura
        path: target/site/cobertura/coverage.xml

integration-test:
  stage: test
  image: maven:3.8-openjdk-17
  services:
    - postgres:14
    - redis:6
  variables:
    POSTGRES_DB: testdb
    POSTGRES_USER: testuser
    POSTGRES_PASSWORD: testpass
  script:
    - mvn verify -P integration-tests

code-quality:
  stage: quality
  image: sonarsource/sonar-scanner-cli
  script:
    - sonar-scanner
      -Dsonar.projectKey=$CI_PROJECT_NAME
      -Dsonar.sources=src/main
      -Dsonar.host.url=$SONAR_HOST_URL
      -Dsonar.login=$SONAR_TOKEN
  only:
    - main
    - merge_requests

security-scan:
  stage: quality
  image: aquasec/trivy
  script:
    - trivy fs --exit-code 1 --severity HIGH,CRITICAL .

build-docker:
  stage: package
  image: docker:latest
  services:
    - docker:dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker tag $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA $CI_REGISTRY_IMAGE:latest
    - docker push $CI_REGISTRY_IMAGE:latest

deploy-staging:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl config use-context staging
    - kubectl set image deployment/$APP_NAME
      $APP_NAME=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA -n staging
    - kubectl rollout status deployment/$APP_NAME -n staging
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - main

deploy-production:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl config use-context production
    - kubectl set image deployment/$APP_NAME
      $APP_NAME=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA -n production
    - kubectl rollout status deployment/$APP_NAME -n production
  environment:
    name: production
    url: https://example.com
  when: manual
  only:
    - main`
    },
    {
      name: 'GitHub Actions',
      icon: '🐙',
      color: '#2088ff',
      description: 'GitHub Actions workflow with matrix builds, reusable workflows, and deployment automation',
      example: `# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  workflow_dispatch:

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        java: [17, 21]

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up JDK \${{ matrix.java }}
        uses: actions/setup-java@v4
        with:
          java-version: \${{ matrix.java }}
          distribution: 'temurin'
          cache: 'maven'

      - name: Build with Maven
        run: mvn clean package -DskipTests

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: jar-files-\${{ matrix.java }}
          path: target/*.jar

  test:
    runs-on: ubuntu-latest
    needs: build

    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: testpass
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up JDK
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
          cache: 'maven'

      - name: Run tests
        run: mvn test

      - name: Run integration tests
        run: mvn verify -P integration-tests
        env:
          DATABASE_URL: postgresql://postgres:testpass@localhost:5432/testdb

      - name: Generate coverage report
        run: mvn jacoco:report

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          file: ./target/site/jacoco/jacoco.xml

  code-quality:
    runs-on: ubuntu-latest
    needs: test

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}

      - name: Security scan
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          severity: 'HIGH,CRITICAL'

  build-push-image:
    runs-on: ubuntu-latest
    needs: [test, code-quality]
    permissions:
      contents: read
      packages: write

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Log in to Container Registry
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}
          tags: |
            type=sha
            type=ref,event=branch
            type=semver,pattern={{version}}

      - name: Build and push Docker image
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: \${{ steps.meta.outputs.tags }}
          labels: \${{ steps.meta.outputs.labels }}

  deploy-staging:
    runs-on: ubuntu-latest
    needs: build-push-image
    if: github.ref == 'refs/heads/main'
    environment:
      name: staging
      url: https://staging.example.com

    steps:
      - name: Deploy to Kubernetes
        uses: azure/k8s-deploy@v4
        with:
          namespace: staging
          manifests: |
            k8s/deployment.yml
            k8s/service.yml
          images: |
            \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ github.sha }}

  deploy-production:
    runs-on: ubuntu-latest
    needs: deploy-staging
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://example.com

    steps:
      - name: Deploy to Production
        uses: azure/k8s-deploy@v4
        with:
          namespace: production
          manifests: |
            k8s/deployment.yml
            k8s/service.yml
          images: |
            \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ github.sha }}`
    },
    {
      name: 'ArgoCD GitOps',
      icon: '🐙',
      color: '#ef7b4d',
      description: 'GitOps deployment with ArgoCD for declarative continuous delivery',
      example: `# argocd-application.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default

  source:
    repoURL: https://github.com/company/k8s-manifests.git
    targetRevision: main
    path: apps/my-app

    # Helm configuration
    helm:
      valueFiles:
        - values.yaml
        - values-production.yaml
      parameters:
        - name: image.tag
          value: v1.2.3
        - name: replicaCount
          value: "3"

  destination:
    server: https://kubernetes.default.svc
    namespace: production

  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
      - CreateNamespace=true
      - PrunePropagationPolicy=foreground
      - PruneLast=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m

---
# Application with multiple sources
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-app-multi-source
  namespace: argocd
spec:
  project: default

  sources:
    - repoURL: https://github.com/company/app-config.git
      targetRevision: main
      path: base

    - repoURL: https://github.com/company/app-config.git
      targetRevision: main
      path: overlays/production

  destination:
    server: https://kubernetes.default.svc
    namespace: production

  syncPolicy:
    automated:
      prune: true
      selfHeal: true

---
# ArgoCD ApplicationSet for multi-cluster
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: my-app-set
  namespace: argocd
spec:
  generators:
    - list:
        elements:
          - cluster: staging
            url: https://staging.k8s.example.com
            namespace: staging
          - cluster: production
            url: https://production.k8s.example.com
            namespace: production

  template:
    metadata:
      name: 'my-app-{{cluster}}'
    spec:
      project: default
      source:
        repoURL: https://github.com/company/k8s-manifests.git
        targetRevision: main
        path: 'apps/my-app/{{cluster}}'
      destination:
        server: '{{url}}'
        namespace: '{{namespace}}'
      syncPolicy:
        automated:
          prune: true
          selfHeal: true

---
# Progressive Delivery with Argo Rollouts
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: my-app
  namespace: production
spec:
  replicas: 5
  strategy:
    canary:
      steps:
        - setWeight: 20
        - pause: {duration: 5m}
        - setWeight: 40
        - pause: {duration: 5m}
        - setWeight: 60
        - pause: {duration: 5m}
        - setWeight: 80
        - pause: {duration: 5m}
      analysis:
        templates:
          - templateName: success-rate
        startingStep: 2
        args:
          - name: service-name
            value: my-app

  selector:
    matchLabels:
      app: my-app

  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: my-app
          image: registry.example.com/my-app:v1.2.3
          ports:
            - containerPort: 8080`
    }
  ]

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={onBack}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#4f46e5'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#6366f1'}
        >
          ← Back
        </button>
      </div>

      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        🔄 CI/CD Pipelines
      </h1>

      <div style={{
        backgroundColor: '#f0f9ff',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        marginBottom: '2rem',
        borderLeft: '4px solid #0ea5e9'
      }}>
        <p style={{ color: '#075985', lineHeight: '1.6' }}>
          Comprehensive CI/CD pipeline implementations covering Jenkins, GitLab CI/CD, GitHub Actions, and ArgoCD GitOps.
          Includes automated testing, code quality checks, security scanning, and deployment automation to multiple environments.
        </p>
      </div>

      {/* CI/CD Diagram */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          CI/CD Pipeline Architecture
        </h2>
        <svg viewBox="0 0 1000 500" style={{ width: '100%', maxWidth: '1000px', height: 'auto', margin: '1rem auto', display: 'block', border: '1px solid #e5e7eb', borderRadius: '0.5rem', backgroundColor: 'white' }}>
          <defs>
            <linearGradient id="cicdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
            </linearGradient>
            <marker id="arrowCICD" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
            </marker>
          </defs>

          {/* Source Control */}
          <rect x="50" y="200" width="120" height="80" fill="url(#cicdGrad)" stroke="#2563eb" strokeWidth="2" rx="5" />
          <text x="110" y="235" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Git Commit</text>
          <text x="110" y="255" fontSize="12" fill="white" textAnchor="middle">Source Control</text>

          {/* Build Stage */}
          <rect x="220" y="200" width="120" height="80" fill="url(#cicdGrad)" stroke="#2563eb" strokeWidth="2" rx="5" />
          <text x="280" y="230" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Build</text>
          <text x="280" y="250" fontSize="11" fill="white" textAnchor="middle">Compile</text>
          <text x="280" y="265" fontSize="11" fill="white" textAnchor="middle">Dependencies</text>

          {/* Test Stage */}
          <rect x="390" y="200" width="120" height="80" fill="url(#cicdGrad)" stroke="#2563eb" strokeWidth="2" rx="5" />
          <text x="450" y="230" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Test</text>
          <text x="450" y="250" fontSize="11" fill="white" textAnchor="middle">Unit Tests</text>
          <text x="450" y="265" fontSize="11" fill="white" textAnchor="middle">Integration</text>

          {/* Quality Gate */}
          <rect x="560" y="200" width="120" height="80" fill="url(#cicdGrad)" stroke="#2563eb" strokeWidth="2" rx="5" />
          <text x="620" y="230" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Quality</text>
          <text x="620" y="250" fontSize="11" fill="white" textAnchor="middle">SonarQube</text>
          <text x="620" y="265" fontSize="11" fill="white" textAnchor="middle">Security Scan</text>

          {/* Package */}
          <rect x="730" y="200" width="120" height="80" fill="url(#cicdGrad)" stroke="#2563eb" strokeWidth="2" rx="5" />
          <text x="790" y="230" fontSize="16" fontWeight="bold" fill="white" textAnchor="middle">Package</text>
          <text x="790" y="250" fontSize="11" fill="white" textAnchor="middle">Docker Build</text>
          <text x="790" y="265" fontSize="11" fill="white" textAnchor="middle">Push Registry</text>

          {/* Deploy Staging */}
          <rect x="390" y="350" width="120" height="80" fill="#10b981" stroke="#059669" strokeWidth="2" rx="5" />
          <text x="450" y="380" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Deploy</text>
          <text x="450" y="400" fontSize="12" fill="white" textAnchor="middle">Staging</text>
          <text x="450" y="415" fontSize="10" fill="white" textAnchor="middle">Auto</text>

          {/* Deploy Production */}
          <rect x="560" y="350" width="120" height="80" fill="#f59e0b" stroke="#d97706" strokeWidth="2" rx="5" />
          <text x="620" y="380" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Deploy</text>
          <text x="620" y="400" fontSize="12" fill="white" textAnchor="middle">Production</text>
          <text x="620" y="415" fontSize="10" fill="white" textAnchor="middle">Manual Approval</text>

          {/* Arrows */}
          <path d="M 170 240 L 220 240" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowCICD)" />
          <path d="M 340 240 L 390 240" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowCICD)" />
          <path d="M 510 240 L 560 240" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowCICD)" />
          <path d="M 680 240 L 730 240" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrowCICD)" />
          <path d="M 790 280 L 450 350" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrowCICD)" />
          <path d="M 510 390 L 560 390" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrowCICD)" />

          {/* Labels */}
          <text x="50" y="50" fontSize="18" fontWeight="bold" fill="#1f2937">Continuous Integration</text>
          <text x="50" y="75" fontSize="14" fill="#6b7280">Automated build, test, and quality checks</text>

          <text x="390" y="470" fontSize="18" fontWeight="bold" fill="#1f2937">Continuous Deployment</text>
          <text x="390" y="490" fontSize="14" fill="#6b7280">Automated deployment to environments</text>

          {/* Monitoring feedback loop */}
          <path d="M 680 390 Q 900 300 850 150 Q 800 50 200 100" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" fill="none" />
          <text x="850" y="130" fontSize="12" fill="#8b5cf6" fontWeight="bold">Monitoring & Feedback</text>
        </svg>
      </div>

      {/* Pipeline Cards */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          Pipeline Examples
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {pipelines.map((pipeline, index) => (
            <button
              key={index}
              onClick={() => setSelectedPipeline(selectedPipeline?.name === pipeline.name ? null : pipeline)}
              style={{
                padding: '1.5rem',
                backgroundColor: selectedPipeline?.name === pipeline.name ? pipeline.color : 'white',
                border: `2px solid ${pipeline.color}`,
                borderRadius: '0.75rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
              onMouseOver={(e) => {
                if (selectedPipeline?.name !== pipeline.name) {
                  e.currentTarget.style.backgroundColor = `${pipeline.color}15`
                }
              }}
              onMouseOut={(e) => {
                if (selectedPipeline?.name !== pipeline.name) {
                  e.currentTarget.style.backgroundColor = 'white'
                }
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{pipeline.icon}</div>
              <div style={{
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: selectedPipeline?.name === pipeline.name ? 'white' : '#1f2937',
                marginBottom: '0.5rem'
              }}>
                {pipeline.name}
              </div>
              <div style={{
                fontSize: '0.875rem',
                color: selectedPipeline?.name === pipeline.name ? 'white' : '#6b7280',
                lineHeight: '1.4'
              }}>
                {pipeline.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Pipeline Code */}
      {selectedPipeline && (
        <div style={{
          backgroundColor: '#1f2937',
          padding: '1.5rem',
          borderRadius: '0.75rem',
          marginBottom: '2rem',
          border: `3px solid ${selectedPipeline.color}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
              {selectedPipeline.icon} {selectedPipeline.name}
            </h3>
            <button
              onClick={() => setSelectedPipeline(null)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: selectedPipeline.color,
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '600'
              }}
            >
              Close
            </button>
          </div>
          <pre style={{
            backgroundColor: '#111827',
            padding: '1rem',
            borderRadius: '0.5rem',
            overflowX: 'auto',
            color: '#e5e7eb',
            fontSize: '0.875rem',
            lineHeight: '1.6',
            margin: 0
          }}>
            <code>{selectedPipeline.example}</code>
          </pre>
        </div>
      )}

      {/* Best Practices */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          CI/CD Best Practices
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{
            backgroundColor: '#dbeafe',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            borderLeft: '4px solid #3b82f6'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1e3a8a' }}>
              🔒 Security
            </h3>
            <ul style={{ color: '#1e40af', lineHeight: '1.8', marginLeft: '1.5rem' }}>
              <li>Scan dependencies for vulnerabilities</li>
              <li>Implement secrets management (Vault, AWS Secrets)</li>
              <li>Use signed commits and verified images</li>
              <li>Regular security audits and pen testing</li>
              <li>Least privilege access controls</li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#dcfce7',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            borderLeft: '4px solid #10b981'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#065f46' }}>
              ⚡ Performance
            </h3>
            <ul style={{ color: '#047857', lineHeight: '1.8', marginLeft: '1.5rem' }}>
              <li>Parallel job execution</li>
              <li>Cache dependencies and build artifacts</li>
              <li>Incremental builds when possible</li>
              <li>Optimize Docker layer caching</li>
              <li>Use build matrices efficiently</li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#fef3c7',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            borderLeft: '4px solid #f59e0b'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#92400e' }}>
              📊 Quality
            </h3>
            <ul style={{ color: '#78350f', lineHeight: '1.8', marginLeft: '1.5rem' }}>
              <li>Enforce code coverage thresholds</li>
              <li>Automated code quality gates</li>
              <li>Linting and formatting checks</li>
              <li>Integration and E2E testing</li>
              <li>Performance and load testing</li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#f3e8ff',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            borderLeft: '4px solid #a855f7'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem', color: '#6b21a8' }}>
              🚀 Deployment
            </h3>
            <ul style={{ color: '#7e22ce', lineHeight: '1.8', marginLeft: '1.5rem' }}>
              <li>Blue-green deployments</li>
              <li>Canary releases with monitoring</li>
              <li>Automated rollback on failures</li>
              <li>Feature flags for gradual rollout</li>
              <li>Zero-downtime deployments</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tools & Technologies */}
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
          Tools & Technologies
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {[
            'Jenkins', 'GitLab CI', 'GitHub Actions', 'CircleCI', 'ArgoCD',
            'Docker', 'Kubernetes', 'Helm', 'Terraform', 'Ansible',
            'SonarQube', 'Trivy', 'Snyk', 'JUnit', 'Selenium',
            'Prometheus', 'Grafana', 'ELK Stack', 'Vault', 'Artifactory'
          ].map((tool, index) => (
            <span
              key={index}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151'
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
