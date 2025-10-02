import { useState, useEffect, useRef } from 'react'

// Simple syntax highlighter for code
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

    // Keywords
    highlighted = highlighted
      .replace(/\b(docker|kubectl|mvn|npm|git|aws|gcloud|terraform|helm|FROM|RUN|COPY|EXPOSE|CMD|ENTRYPOINT|ENV|WORKDIR|if|then|else|fi|for|do|done|while|case|esac|function|return|exit|sudo|cd|echo|export)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(build|deploy|test|run|install|clean|package|apply|create|delete|get|describe|logs|exec|push|pull|commit|clone|status|diff|add)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/(\$\w+|\$\{[^}]+\})/g, '<span style="color: #4ec9b0;">$1</span>')

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

function Deployment({ onBack }) {
  const [selectedPhase, setSelectedPhase] = useState(null)
  const [expandedStep, setExpandedStep] = useState(null)

  const deploymentPhases = [
    {
      id: 1,
      name: 'Pre-Deployment',
      icon: '📋',
      color: '#3b82f6',
      description: 'Preparation and validation before deployment',
      steps: [
        {
          title: 'Code Review & Quality Gates',
          description: 'Ensure code quality and security standards are met before deployment',
          checklist: [
            'All code reviews approved by at least 2 reviewers',
            'Static code analysis (SonarQube) passes with no critical issues',
            'Security scan (SAST/DAST) completed with no high-severity vulnerabilities',
            'Unit test coverage meets minimum threshold (80%+)',
            'Integration tests pass successfully',
            'Performance tests show no regression'
          ],
          commands: `# Run SonarQube analysis
mvn sonar:sonar \\
  -Dsonar.projectKey=my-project \\
  -Dsonar.host.url=http://sonarqube:9000

# Run security scan
mvn dependency-check:check

# Check test coverage
mvn clean test jacoco:report
# Coverage report: target/site/jacoco/index.html`
        },
        {
          title: 'Environment Configuration',
          description: 'Configure environment-specific settings and secrets',
          checklist: [
            'Environment variables defined in CI/CD pipeline',
            'Secrets stored in vault (AWS Secrets Manager, HashiCorp Vault)',
            'Database migration scripts reviewed and tested',
            'Feature flags configured for gradual rollout',
            'SSL certificates validated and up-to-date',
            'DNS records verified'
          ],
          commands: `# Example: AWS Secrets Manager
aws secretsmanager create-secret \\
  --name prod/my-app/db-password \\
  --secret-string "secure-password"

# Retrieve secret in application
aws secretsmanager get-secret-value \\
  --secret-id prod/my-app/db-password \\
  --query SecretString --output text

# Environment-specific config (application-prod.yml)
/*
spring:
  datasource:
    url: jdbc:postgresql://prod-db:5432/myapp
    username: \${DB_USERNAME}
    password: \${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: validate
logging:
  level:
    root: WARN
*/`
        },
        {
          title: 'Build Artifacts',
          description: 'Create production-ready build artifacts with proper versioning',
          checklist: [
            'Version number incremented (semantic versioning)',
            'Build succeeds with production profile',
            'Artifact size optimized (remove dev dependencies)',
            'Docker image built and scanned',
            'Artifacts stored in artifact repository (Nexus, Artifactory)',
            'Build reproducibility verified'
          ],
          commands: `# Maven build for production
mvn clean package -Pprod -DskipTests=false

# Build Docker image
docker build -t my-app:1.2.3 .
docker tag my-app:1.2.3 registry.company.com/my-app:1.2.3
docker tag my-app:1.2.3 registry.company.com/my-app:latest

# Scan Docker image for vulnerabilities
docker scan my-app:1.2.3

# Push to registry
docker push registry.company.com/my-app:1.2.3
docker push registry.company.com/my-app:latest

# Example Dockerfile for production
/*
FROM openjdk:17-jdk-slim AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-jre-slim
WORKDIR /app
COPY --from=builder /app/target/my-app.jar app.jar
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD curl -f http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
*/`
        }
      ]
    },
    {
      id: 2,
      name: 'Deployment Strategy',
      icon: '🎯',
      color: '#10b981',
      description: 'Choose and execute deployment strategy',
      steps: [
        {
          title: 'Blue-Green Deployment',
          description: 'Run two identical production environments, switching traffic between them',
          checklist: [
            'Green environment provisioned with new version',
            'Health checks passing on green environment',
            'Smoke tests executed on green environment',
            'Load balancer ready to switch traffic',
            'Rollback plan documented',
            'Blue environment kept running for quick rollback'
          ],
          commands: `# Kubernetes Blue-Green Deployment

# Deploy green version
kubectl apply -f deployment-green.yaml

# deployment-green.yaml example:
/*
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-green
  labels:
    app: my-app
    version: green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
      version: green
  template:
    metadata:
      labels:
        app: my-app
        version: green
    spec:
      containers:
      - name: my-app
        image: registry.company.com/my-app:1.2.3
        ports:
        - containerPort: 8080
        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "prod"
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          initialDelaySeconds: 30
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 10
*/

# Wait for green to be ready
kubectl wait --for=condition=ready pod -l app=my-app,version=green --timeout=300s

# Run smoke tests on green
curl http://green-my-app.internal/actuator/health

# Switch service to green
kubectl patch service my-app -p '{"spec":{"selector":{"version":"green"}}}'

# Monitor metrics for 15 minutes
# If successful, scale down blue
kubectl scale deployment my-app-blue --replicas=0

# If issues, rollback to blue
kubectl patch service my-app -p '{"spec":{"selector":{"version":"blue"}}}'`
        },
        {
          title: 'Canary Deployment',
          description: 'Gradually roll out to a small percentage of users before full deployment',
          checklist: [
            'Canary deployment created with 10% traffic',
            'Metrics monitored (error rate, latency, throughput)',
            'Canary analysis shows no degradation',
            'Gradually increase traffic (10% → 25% → 50% → 100%)',
            'Automated rollback configured if metrics fail',
            'User feedback monitored'
          ],
          commands: `# Canary deployment with Istio

# Virtual Service for canary routing
/*
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: my-app
spec:
  hosts:
  - my-app
  http:
  - match:
    - headers:
        canary:
          exact: "true"
    route:
    - destination:
        host: my-app
        subset: canary
  - route:
    - destination:
        host: my-app
        subset: stable
      weight: 90
    - destination:
        host: my-app
        subset: canary
      weight: 10
*/

# Deploy canary version
kubectl apply -f deployment-canary.yaml

# Monitor canary metrics
kubectl exec -it prometheus-pod -- promtool query instant \\
  'http_requests_total{app="my-app",version="canary"}[5m]'

# Gradually increase canary traffic
# 10% -> 25%
kubectl patch virtualservice my-app --type merge -p \\
  '{"spec":{"http":[{"route":[{"destination":{"subset":"stable"},"weight":75},
  {"destination":{"subset":"canary"},"weight":25}]}]}}'

# If metrics look good, promote to 100%
kubectl patch virtualservice my-app --type merge -p \\
  '{"spec":{"http":[{"route":[{"destination":{"subset":"canary"},"weight":100}]}]}}'

# Update stable to new version
kubectl set image deployment/my-app-stable my-app=registry.company.com/my-app:1.2.3`
        },
        {
          title: 'Rolling Deployment',
          description: 'Gradually replace instances with new version',
          checklist: [
            'MaxUnavailable and MaxSurge configured',
            'Rolling update strategy defined',
            'Health checks configured properly',
            'Zero downtime verified during rollout',
            'Rollout status monitored',
            'Automatic pause on failure configured'
          ],
          commands: `# Kubernetes Rolling Update

# Update deployment
kubectl set image deployment/my-app my-app=registry.company.com/my-app:1.2.3

# Or apply updated manifest
kubectl apply -f deployment.yaml

# deployment.yaml with rolling update strategy:
/*
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
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
        image: registry.company.com/my-app:1.2.3
*/

# Watch rollout status
kubectl rollout status deployment/my-app

# Pause rollout if issues detected
kubectl rollout pause deployment/my-app

# Resume rollout
kubectl rollout resume deployment/my-app

# Check rollout history
kubectl rollout history deployment/my-app`
        }
      ]
    },
    {
      id: 3,
      name: 'Database Migration',
      icon: '🗄️',
      color: '#f59e0b',
      description: 'Safely migrate database schema and data',
      steps: [
        {
          title: 'Backup & Validation',
          description: 'Create backups and validate migration scripts',
          checklist: [
            'Full database backup completed',
            'Backup verified and restorable',
            'Migration scripts tested in staging',
            'Rollback scripts prepared',
            'Migration time estimated',
            'Downtime window scheduled (if needed)'
          ],
          commands: `# PostgreSQL backup
pg_dump -h prod-db.company.com -U admin -d myapp -F c -f myapp_backup_$(date +%Y%m%d_%H%M%S).dump

# Verify backup
pg_restore --list myapp_backup_20250930_120000.dump

# MySQL backup
mysqldump -h prod-db.company.com -u admin -p myapp > myapp_backup_$(date +%Y%m%d_%H%M%S).sql

# Test restore on staging
psql -h staging-db.company.com -U admin -d myapp_test < test_restore.sql

# Flyway migration validation
mvn flyway:validate -Dflyway.url=jdbc:postgresql://staging-db:5432/myapp

# Example migration script (V1.2.3__add_user_roles.sql)
/*
-- Add new columns
ALTER TABLE users ADD COLUMN role VARCHAR(50);
ALTER TABLE users ADD COLUMN last_login TIMESTAMP;

-- Create index
CREATE INDEX idx_users_role ON users(role);

-- Update existing data
UPDATE users SET role = 'USER' WHERE role IS NULL;

-- Add constraint
ALTER TABLE users ALTER COLUMN role SET NOT NULL;
*/`
        },
        {
          title: 'Execute Migration',
          description: 'Run database migrations with monitoring',
          checklist: [
            'Application in maintenance mode (if needed)',
            'Migration executed with transaction',
            'Migration logs monitored',
            'Data integrity verified',
            'Application compatibility tested',
            'Performance impact assessed'
          ],
          commands: `# Flyway migration
mvn flyway:migrate -Dflyway.url=jdbc:postgresql://prod-db:5432/myapp

# Liquibase migration
mvn liquibase:update -Dliquibase.url=jdbc:postgresql://prod-db:5432/myapp

# Manual migration with transaction
psql -h prod-db.company.com -U admin -d myapp <<EOF
BEGIN;

-- Run migration script
\\i V1.2.3__add_user_roles.sql

-- Verify changes
SELECT COUNT(*) FROM users WHERE role IS NULL;

-- If verification passes, commit
COMMIT;

-- If issues, rollback
-- ROLLBACK;
EOF

# Monitor migration progress
SELECT pid, usename, application_name, state, query_start, query
FROM pg_stat_activity
WHERE datname = 'myapp' AND state != 'idle';

# Verify migration
SELECT version, description, installed_on, success
FROM flyway_schema_history
ORDER BY installed_rank DESC
LIMIT 5;`
        },
        {
          title: 'Zero-Downtime Migration',
          description: 'Migrate database without application downtime',
          checklist: [
            'Backward-compatible schema changes deployed first',
            'Application supports both old and new schema',
            'Data migration runs in background',
            'Old columns/tables kept temporarily',
            'Monitoring for dual-write consistency',
            'Cleanup scheduled for later'
          ],
          commands: `# Phase 1: Add new columns (backward compatible)
/*
-- V1.2.3__add_new_columns.sql
ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN email_verified_at TIMESTAMP;
*/

# Deploy application version that writes to both old and new columns
# (Application v1.2.3 supports dual-write)

# Phase 2: Backfill data
/*
-- V1.2.4__backfill_email_verified.sql
UPDATE users
SET email_verified = TRUE,
    email_verified_at = NOW()
WHERE email_confirmed_at IS NOT NULL
  AND email_verified IS NULL;
*/

# Phase 3: Deploy application using only new columns
# (Application v1.2.4 uses new schema)

# Phase 4: Remove old columns (after validation period)
/*
-- V1.2.5__remove_old_columns.sql
ALTER TABLE users DROP COLUMN email_confirmed_at;
*/

# Monitor dual-write consistency
SELECT
  COUNT(*) as total,
  COUNT(CASE WHEN email_verified IS NULL THEN 1 END) as null_count
FROM users;`
        }
      ]
    },
    {
      id: 4,
      name: 'Monitoring & Validation',
      icon: '📊',
      color: '#8b5cf6',
      description: 'Monitor deployment and validate success',
      steps: [
        {
          title: 'Health Checks',
          description: 'Verify application health after deployment',
          checklist: [
            'Liveness probe succeeding',
            'Readiness probe succeeding',
            'All pods/instances healthy',
            'Load balancer health checks passing',
            'Startup time within acceptable range',
            'No crash loops detected'
          ],
          commands: `# Kubernetes health checks
kubectl get pods -l app=my-app
kubectl describe pod my-app-xxx

# Check pod logs for errors
kubectl logs -l app=my-app --tail=100 --timestamps

# Test health endpoints directly
curl http://my-app:8080/actuator/health
curl http://my-app:8080/actuator/health/liveness
curl http://my-app:8080/actuator/health/readiness

# Example health endpoint response
/*
{
  "status": "UP",
  "components": {
    "db": {
      "status": "UP",
      "details": {
        "database": "PostgreSQL",
        "validationQuery": "isValid()"
      }
    },
    "diskSpace": {
      "status": "UP",
      "details": {
        "total": 250685575168,
        "free": 100685575168
      }
    },
    "ping": {
      "status": "UP"
    }
  }
}
*/

# Check all endpoints
kubectl exec -it my-app-xxx -- curl localhost:8080/actuator/health/liveness
kubectl exec -it my-app-xxx -- curl localhost:8080/actuator/health/readiness`
        },
        {
          title: 'Metrics & Logging',
          description: 'Monitor application metrics and logs',
          checklist: [
            'Application metrics flowing to monitoring system',
            'Error rate within acceptable threshold',
            'Response time under SLA limits',
            'Memory and CPU usage normal',
            'Log aggregation working',
            'No critical errors in logs'
          ],
          commands: `# Prometheus metrics
curl http://my-app:8080/actuator/prometheus

# Key metrics to monitor:
# - http_server_requests_seconds_count (request count)
# - http_server_requests_seconds_sum (total time)
# - jvm_memory_used_bytes (memory usage)
# - jvm_threads_live (thread count)

# Grafana dashboard queries
/*
# Request rate
rate(http_server_requests_seconds_count[5m])

# Average response time
rate(http_server_requests_seconds_sum[5m]) /
rate(http_server_requests_seconds_count[5m])

# Error rate (4xx and 5xx)
sum(rate(http_server_requests_seconds_count{status=~"[45].."}[5m])) /
sum(rate(http_server_requests_seconds_count[5m]))

# Memory usage
jvm_memory_used_bytes{area="heap"} / jvm_memory_max_bytes{area="heap"} * 100
*/

# View logs in real-time
kubectl logs -f -l app=my-app

# Search logs for errors
kubectl logs -l app=my-app --tail=1000 | grep -i error

# ELK/Splunk query examples
# index=prod app=my-app level=ERROR | stats count by message`
        },
        {
          title: 'Smoke Tests',
          description: 'Run critical path tests in production',
          checklist: [
            'API endpoints responding correctly',
            'Database connectivity verified',
            'External integrations working',
            'Authentication/authorization functional',
            'Critical user flows tested',
            'No regression in key features'
          ],
          commands: `# Automated smoke tests script
#!/bin/bash

BASE_URL="https://api.production.com"
EXPECTED_VERSION="1.2.3"

# Test health endpoint
echo "Testing health endpoint..."
HEALTH=$(curl -s $BASE_URL/actuator/health | jq -r '.status')
if [ "$HEALTH" != "UP" ]; then
  echo "ERROR: Health check failed"
  exit 1
fi

# Test version endpoint
echo "Testing version..."
VERSION=$(curl -s $BASE_URL/actuator/info | jq -r '.build.version')
if [ "$VERSION" != "$EXPECTED_VERSION" ]; then
  echo "ERROR: Version mismatch. Expected $EXPECTED_VERSION, got $VERSION"
  exit 1
fi

# Test critical API endpoints
echo "Testing user API..."
curl -s -f -X GET "$BASE_URL/api/users/1" || {
  echo "ERROR: User API failed"
  exit 1
}

echo "Testing authentication..."
TOKEN=$(curl -s -X POST "$BASE_URL/api/auth/login" \\
  -H "Content-Type: application/json" \\
  -d '{"username":"test","password":"test"}' | jq -r '.token')

if [ -z "$TOKEN" ]; then
  echo "ERROR: Authentication failed"
  exit 1
fi

echo "Testing authenticated endpoint..."
curl -s -f -H "Authorization: Bearer $TOKEN" \\
  "$BASE_URL/api/profile" || {
  echo "ERROR: Authenticated endpoint failed"
  exit 1
}

echo "✅ All smoke tests passed!"

# Run with timeout
timeout 5m ./smoke-tests.sh`
        }
      ]
    },
    {
      id: 5,
      name: 'Rollback Strategy',
      icon: '⏮️',
      color: '#ef4444',
      description: 'Plan and execute rollback if needed',
      steps: [
        {
          title: 'Rollback Triggers',
          description: 'Define when to rollback deployment',
          checklist: [
            'Error rate exceeds 5% threshold',
            'Response time degrades by >50%',
            'Critical functionality broken',
            'Database corruption detected',
            'Security vulnerability discovered',
            'Manual rollback decision made'
          ],
          commands: `# Automated rollback based on metrics
# Example Prometheus alert rule
/*
groups:
- name: deployment_alerts
  interval: 30s
  rules:
  - alert: HighErrorRate
    expr: |
      sum(rate(http_server_requests_seconds_count{status=~"5.."}[5m])) /
      sum(rate(http_server_requests_seconds_count[5m])) > 0.05
    for: 2m
    labels:
      severity: critical
    annotations:
      summary: "High error rate detected"
      description: "Error rate is {{ $value }}%"

  - alert: HighResponseTime
    expr: |
      histogram_quantile(0.95,
        rate(http_server_requests_seconds_bucket[5m])
      ) > 2
    for: 5m
    labels:
      severity: warning
    annotations:
      summary: "High response time"
      description: "95th percentile is {{ $value }}s"
*/

# Webhook to trigger rollback
curl -X POST https://cicd.company.com/rollback \\
  -H "Authorization: Bearer $ROLLBACK_TOKEN" \\
  -d '{"deployment_id": "my-app-1.2.3", "reason": "High error rate"}'`
        },
        {
          title: 'Kubernetes Rollback',
          description: 'Rollback Kubernetes deployment',
          checklist: [
            'Previous revision identified',
            'Rollback command executed',
            'Rollback progress monitored',
            'Application health verified',
            'Incident documented',
            'Root cause analysis scheduled'
          ],
          commands: `# Check rollout history
kubectl rollout history deployment/my-app

# View specific revision
kubectl rollout history deployment/my-app --revision=2

# Rollback to previous version
kubectl rollout undo deployment/my-app

# Rollback to specific revision
kubectl rollout undo deployment/my-app --to-revision=2

# Monitor rollback
kubectl rollout status deployment/my-app

# Verify rollback
kubectl get pods -l app=my-app
kubectl describe deployment my-app

# Check image version
kubectl get deployment my-app -o jsonpath='{.spec.template.spec.containers[0].image}'

# If using Helm
helm rollback my-app 1  # Rollback to revision 1
helm history my-app     # View release history`
        },
        {
          title: 'Database Rollback',
          description: 'Rollback database changes safely',
          checklist: [
            'Rollback script tested',
            'Application compatible with rolled-back schema',
            'Data loss assessed and acceptable',
            'Backup restoration plan ready',
            'Rollback executed in transaction',
            'Data integrity verified after rollback'
          ],
          commands: `# Flyway rollback (requires Flyway Teams/Pro)
mvn flyway:undo -Dflyway.url=jdbc:postgresql://prod-db:5432/myapp

# Manual rollback script
psql -h prod-db.company.com -U admin -d myapp <<EOF
BEGIN;

-- Rollback script for V1.2.3__add_user_roles.sql
ALTER TABLE users DROP COLUMN role;
ALTER TABLE users DROP COLUMN last_login;
DROP INDEX IF EXISTS idx_users_role;

-- Verify rollback
SELECT column_name FROM information_schema.columns
WHERE table_name = 'users';

COMMIT;
EOF

# Restore from backup (last resort)
# 1. Stop application
kubectl scale deployment my-app --replicas=0

# 2. Restore database
pg_restore -h prod-db.company.com -U admin -d myapp -c \\
  myapp_backup_20250930_120000.dump

# 3. Verify restoration
psql -h prod-db.company.com -U admin -d myapp -c \\
  "SELECT version FROM flyway_schema_history ORDER BY installed_rank DESC LIMIT 1;"

# 4. Restart application with previous version
kubectl set image deployment/my-app my-app=registry.company.com/my-app:1.2.2
kubectl scale deployment my-app --replicas=3

# Point-in-Time Recovery (PostgreSQL)
pg_basebackup -h prod-db -U replication -D /backup/base
# Then configure recovery.conf for PITR`
        }
      ]
    },
    {
      id: 6,
      name: 'Post-Deployment',
      icon: '✅',
      color: '#06b6d4',
      description: 'Finalize deployment and document',
      steps: [
        {
          title: 'Performance Validation',
          description: 'Validate production performance',
          checklist: [
            'Response time meets SLA',
            'Throughput matches expected load',
            'Memory usage stable',
            'CPU usage within limits',
            'Database query performance acceptable',
            'No memory leaks detected'
          ],
          commands: `# Load testing with k6
/*
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 },  // Ramp up
    { duration: '5m', target: 100 },  // Stay at 100 users
    { duration: '2m', target: 200 },  // Ramp to 200
    { duration: '5m', target: 200 },  // Stay at 200
    { duration: '2m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests under 500ms
    http_req_failed: ['rate<0.01'],   // Error rate under 1%
  },
};

export default function () {
  let response = http.get('https://api.production.com/api/users');
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}
*/

k6 run --vus 100 --duration 30s load-test.js

# JMeter test
jmeter -n -t load-test.jmx -l results.jtl -e -o dashboard/

# Monitor during load test
watch -n 1 'kubectl top pods -l app=my-app'`
        },
        {
          title: 'Documentation',
          description: 'Document deployment and update runbooks',
          checklist: [
            'Deployment summary documented',
            'Changes logged in release notes',
            'Known issues documented',
            'Rollback procedure updated',
            'Runbook updated with new procedures',
            'Team notified of deployment'
          ],
          commands: `# Generate deployment report
cat > deployment-report-1.2.3.md <<EOF
# Deployment Report: v1.2.3

## Date: 2025-09-30
## Deployed by: DevOps Team
## Duration: 45 minutes

## Changes
- Added user role management feature
- Improved database query performance
- Fixed memory leak in cache service
- Updated dependencies (Spring Boot 3.2.0)

## Deployment Strategy
- Blue-Green deployment
- Zero downtime achieved
- Database migration: V1.2.3__add_user_roles.sql

## Metrics
- Error rate: 0.02% (baseline: 0.05%)
- Response time (p95): 245ms (baseline: 300ms)
- Memory usage: 512MB/1GB (baseline: 480MB/1GB)
- CPU usage: 35% (baseline: 40%)

## Issues Encountered
- Initial health check failures (resolved by increasing timeout)
- Canary showed slight increase in memory (monitored, stable)

## Rollback
- Not required
- Rollback tested in staging: successful

## Next Steps
- Monitor for 24 hours
- Schedule cleanup of blue environment (2025-10-01)
- Update documentation with new API endpoints
EOF

# Slack notification
curl -X POST https://hooks.slack.com/services/YOUR/WEBHOOK/URL \\
  -H 'Content-Type: application/json' \\
  -d '{
    "text": "✅ Production Deployment Successful",
    "attachments": [{
      "color": "good",
      "fields": [
        {"title": "Version", "value": "1.2.3", "short": true},
        {"title": "Duration", "value": "45 min", "short": true},
        {"title": "Status", "value": "Healthy", "short": true}
      ]
    }]
  }'`
        },
        {
          title: 'Cleanup',
          description: 'Clean up deployment artifacts and old resources',
          checklist: [
            'Old deployment scaled down or deleted',
            'Unused Docker images removed',
            'Old database backups archived',
            'CI/CD pipeline artifacts cleaned',
            'Monitoring alerts updated',
            'Feature flags updated'
          ],
          commands: `# Remove old Kubernetes resources
kubectl delete deployment my-app-blue
kubectl delete pods -l app=my-app,version=old --force --grace-period=0

# Clean old Docker images
docker image prune -a --filter "until=168h"  # 7 days

# Clean registry (keep last 5 versions)
curl -X DELETE https://registry.company.com/v2/my-app/manifests/1.2.0
curl -X DELETE https://registry.company.com/v2/my-app/manifests/1.2.1

# Archive old backups to S3
aws s3 cp myapp_backup_old.dump \\
  s3://company-backups/archive/2025/09/ \\
  --storage-class GLACIER

# Remove local backups older than 30 days
find /backups -name "*.dump" -mtime +30 -delete

# Update feature flags
curl -X POST https://launchdarkly.com/api/v2/flags/my-project/new-feature \\
  -H "Authorization: $LD_API_TOKEN" \\
  -d '{"variations": [{"value": true}]}'

# Clean CI/CD artifacts
# Jenkins
curl -X POST http://jenkins.company.com/job/my-app/doDelete?token=TOKEN

# GitLab
curl -X DELETE https://gitlab.com/api/v4/projects/123/pipelines/456 \\
  -H "PRIVATE-TOKEN: $GITLAB_TOKEN"`
        }
      ]
    }
  ]

  // Use ref to access current state in event handler
  const selectedPhaseRef = useRef(selectedPhase)
  useEffect(() => {
    selectedPhaseRef.current = selectedPhase
  }, [selectedPhase])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Handle Escape to go back
      if (e.key === 'Escape') {
        if (expandedStep !== null) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setExpandedStep(null)
          return
        }
        if (selectedPhaseRef.current) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setSelectedPhase(null)
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [expandedStep])

  const handlePhaseClick = (phase) => {
    setSelectedPhase(phase)
    setExpandedStep(null)
  }

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
        marginBottom: '2rem'
      }}>
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
        >
          ← Back to Menu
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          color: '#1f2937',
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          🚀 Production Deployment
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={{
        backgroundColor: 'rgba(14, 165, 233, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(14, 165, 233, 0.3)',
        marginBottom: '2rem'
      }}>
        <p style={{
          fontSize: '1.3rem',
          color: '#374151',
          fontWeight: '500',
          margin: 0,
          lineHeight: '1.8',
          textAlign: 'center'
        }}>
          Comprehensive step-by-step guide to deploying applications to production safely and reliably.
          Covers pre-deployment validation, deployment strategies, database migration, monitoring, rollback procedures, and post-deployment tasks.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedPhase ? '350px 1fr' : '1fr',
        gap: '2rem'
      }}>
        {/* Deployment Phases */}
        <div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1.5rem'
          }}>
            Deployment Phases
          </h3>
          <div style={{
            display: 'grid',
            gap: '1rem'
          }}>
            {deploymentPhases.map((phase) => (
              <div
                key={phase.id}
                onClick={() => handlePhaseClick(phase)}
                style={{
                  backgroundColor: selectedPhase?.id === phase.id
                    ? `${phase.color}15`
                    : 'rgba(14, 165, 233, 0.05)',
                  padding: '1.25rem',
                  borderRadius: '12px',
                  border: selectedPhase?.id === phase.id
                    ? `3px solid ${phase.color}`
                    : '2px solid rgba(14, 165, 233, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  transform: selectedPhase?.id === phase.id ? 'scale(1.02)' : 'scale(1)'
                }}
                onMouseEnter={(e) => {
                  if (selectedPhase?.id !== phase.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.1)'
                    e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.4)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPhase?.id !== phase.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.05)'
                    e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.2)'
                  }
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{ fontSize: '2rem' }}>{phase.icon}</span>
                  <div>
                    <div style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: selectedPhase?.id === phase.id ? phase.color : '#1f2937'
                    }}>
                      {phase.id}. {phase.name}
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  lineHeight: '1.5'
                }}>
                  {phase.description}
                </div>
                {selectedPhase?.id === phase.id && (
                  <div style={{
                    marginTop: '0.75rem',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: phase.color
                  }}>
                    {phase.steps.length} steps →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Phase Details */}
        {selectedPhase && (
          <div>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: selectedPhase.color,
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <span style={{ fontSize: '2rem' }}>{selectedPhase.icon}</span>
              {selectedPhase.name} Steps
            </h3>

            <div style={{
              display: 'grid',
              gap: '1.5rem'
            }}>
              {selectedPhase.steps.map((step, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    border: `2px solid ${selectedPhase.color}33`,
                    overflow: 'hidden'
                  }}
                >
                  <div
                    onClick={() => setExpandedStep(expandedStep === idx ? null : idx)}
                    style={{
                      padding: '1.25rem',
                      backgroundColor: expandedStep === idx ? `${selectedPhase.color}08` : 'white',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: selectedPhase.color,
                        margin: '0 0 0.5rem 0'
                      }}>
                        Step {idx + 1}: {step.title}
                      </h4>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#6b7280',
                        margin: 0
                      }}>
                        {step.description}
                      </p>
                    </div>
                    <span style={{
                      fontSize: '1.5rem',
                      color: selectedPhase.color,
                      transition: 'transform 0.2s',
                      transform: expandedStep === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      display: 'inline-block'
                    }}>
                      ▼
                    </span>
                  </div>

                  {expandedStep === idx && (
                    <div style={{
                      padding: '1.5rem',
                      borderTop: `1px solid ${selectedPhase.color}33`
                    }}>
                      {/* Checklist */}
                      <div style={{
                        marginBottom: '1.5rem'
                      }}>
                        <h5 style={{
                          fontSize: '1rem',
                          fontWeight: '700',
                          color: '#1f2937',
                          marginBottom: '0.75rem'
                        }}>
                          ✓ Checklist
                        </h5>
                        <div style={{
                          display: 'grid',
                          gap: '0.5rem'
                        }}>
                          {step.checklist.map((item, checkIdx) => (
                            <div
                              key={checkIdx}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '0.5rem',
                                padding: '0.5rem',
                                backgroundColor: `${selectedPhase.color}08`,
                                borderRadius: '6px',
                                fontSize: '0.9rem',
                                color: '#374151'
                              }}
                            >
                              <span style={{ color: selectedPhase.color, fontWeight: '700' }}>□</span>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Commands */}
                      <div>
                        <h5 style={{
                          fontSize: '1rem',
                          fontWeight: '700',
                          color: '#1f2937',
                          marginBottom: '0.75rem'
                        }}>
                          💻 Commands & Examples
                        </h5>
                        <div style={{
                          backgroundColor: '#1e293b',
                          padding: '1.5rem',
                          borderRadius: '8px',
                          border: '2px solid #334155'
                        }}>
                          <SyntaxHighlighter code={step.commands} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Deployment
