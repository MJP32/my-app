import { useState, useEffect, useRef } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

// Simple syntax highlighter for YAML and kubectl commands
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

    // YAML/Kubernetes keywords
    highlighted = highlighted
      .replace(/\b(apiVersion|kind|metadata|spec|status|name|namespace|labels|annotations|selector|replicas|template|containers|image|ports|containerPort|env|volumeMounts|volumes|resources|limits|requests|strategy|type|matchLabels|data|stringData|rules|subjects|roleRef|verbs|apiGroups)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(kubectl|get|create|apply|delete|describe|logs|exec|port-forward|rollout|scale|expose|run|top|drain|cordon|uncordon|taint)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(Pod|Deployment|Service|ConfigMap|Secret|Ingress|PersistentVolume|PersistentVolumeClaim|StatefulSet|DaemonSet|Job|CronJob|Namespace|Node|ReplicaSet|HorizontalPodAutoscaler|NetworkPolicy|Role|ClusterRole|RoleBinding|ClusterRoleBinding|ServiceAccount)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/(\$\w+|\$\{[^}]+\})/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/(--[\w-]+)/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/^(\s*-\s)/gm, '<span style="color: #569cd6;">$1</span>')

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

function Kubernetes({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // Parse code into sections
  const parseCodeSections = (code) => {
    const sections = []
    const lines = code.split('\n')
    let currentSection = null
    let currentCode = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      // Check for section headers (lines with ═ and ✦)
      if (line.includes('═══════') && lines[i + 1]?.includes('✦')) {
        // Save previous section
        if (currentSection) {
          sections.push({
            title: currentSection,
            code: currentCode.join('\n')
          })
        }
        // Start new section
        const titleLine = lines[i + 1]
        currentSection = titleLine.replace(/#\s*✦\s*/g, '').trim()
        currentCode = []
        continue
      }

      // Skip separator lines
      if (line.includes('═══════')) {
        continue
      }

      // Add code to current section
      if (currentSection) {
        currentCode.push(line)
      }
    }

    // Add last section
    if (currentSection && currentCode.length > 0) {
      sections.push({
        title: currentSection,
        code: currentCode.join('\n')
      })
    }

    return sections
  }

  const kubernetesTopics = [
    {
      id: 1,
      name: 'Kubernetes Basics',
      icon: '⚙️',
      color: '#3b82f6',
      description: 'Fundamental Kubernetes architecture and concepts',
      content: {
        explanation: 'Kubernetes is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications. It provides a declarative approach where you define the desired state, and Kubernetes continuously works to maintain that state across a cluster of machines.',
        keyPoints: [
          'Control Plane - Master components that manage cluster state (API Server, Scheduler, Controller Manager, etcd)',
          'Nodes - Worker machines running containerized applications with kubelet and container runtime',
          'Pods - Smallest deployable units containing one or more containers sharing network and storage',
          'Namespaces - Virtual clusters for resource isolation and multi-tenancy',
          'Declarative Configuration - Define desired state using YAML manifests',
          'kubectl - Command-line tool for interacting with Kubernetes clusters',
          'etcd - Distributed key-value store for cluster configuration and state',
          'Controllers - Control loops that continuously reconcile actual state with desired state'
        ],
        codeExample: `# ═══════════════════════════════════════════════════════════
# ✦ Kubernetes Architecture Overview
# ═══════════════════════════════════════════════════════════
# Kubernetes Architecture Components:
# Control Plane:
#   - kube-apiserver: REST API for cluster management
#   - etcd: Cluster state storage
#   - kube-scheduler: Assigns Pods to Nodes
#   - kube-controller-manager: Runs controller processes
#   - cloud-controller-manager: Cloud provider integrations
#
# Node Components:
#   - kubelet: Agent ensuring containers run in Pods
#   - kube-proxy: Network proxy for Service abstraction
#   - Container Runtime: Docker, containerd, CRI-O

# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client

# Configure kubectl context
kubectl config view
kubectl config current-context
kubectl config use-context my-cluster
kubectl config set-context --current --namespace=my-namespace

# ═══════════════════════════════════════════════════════════
# ✦ Cluster Information and Resource Discovery
# ═══════════════════════════════════════════════════════════
# Basic cluster information
kubectl cluster-info
kubectl get nodes
kubectl get nodes -o wide
kubectl describe node node-name

# Component status
kubectl get componentstatuses
kubectl get all --all-namespaces

# Common kubectl commands
kubectl get pods                           # List pods in current namespace
kubectl get pods -n kube-system           # List pods in specific namespace
kubectl get pods --all-namespaces         # List all pods
kubectl get pods -o wide                  # Show more details
kubectl get pods -w                       # Watch for changes
kubectl get pods --show-labels            # Show labels

# ═══════════════════════════════════════════════════════════
# ✦ Resource Management and Operations
# ═══════════════════════════════════════════════════════════
# Describe resources (detailed info)
kubectl describe pod pod-name
kubectl describe node node-name
kubectl describe service service-name

# Create resources
kubectl create namespace dev
kubectl create deployment nginx --image=nginx:latest
kubectl create service clusterip my-svc --tcp=80:80

# Apply configurations (declarative)
kubectl apply -f deployment.yaml
kubectl apply -f ./configs/
kubectl apply -k ./kustomize-dir

# Delete resources
kubectl delete pod pod-name
kubectl delete deployment deployment-name
kubectl delete -f deployment.yaml
kubectl delete namespace dev

# ═══════════════════════════════════════════════════════════
# ✦ Debugging and Troubleshooting
# ═══════════════════════════════════════════════════════════
# Logs and debugging
kubectl logs pod-name
kubectl logs pod-name -c container-name   # Multi-container pod
kubectl logs -f pod-name                  # Follow logs
kubectl logs --tail=100 pod-name          # Last 100 lines
kubectl logs --since=1h pod-name          # Last hour

# Execute commands in containers
kubectl exec pod-name -- ls /app
kubectl exec -it pod-name -- bash
kubectl exec -it pod-name -c container-name -- sh

# Port forwarding (access pod locally)
kubectl port-forward pod/pod-name 8080:80
kubectl port-forward service/my-service 8080:80

# Copy files
kubectl cp pod-name:/path/to/file ./local-file
kubectl cp ./local-file pod-name:/path/to/file

# Resource usage
kubectl top nodes
kubectl top pods
kubectl top pods --containers

# ═══════════════════════════════════════════════════════════
# ✦ Labels, Namespaces, and Output Formats
# ═══════════════════════════════════════════════════════════
# Labels and selectors
kubectl get pods -l app=nginx
kubectl get pods -l 'environment in (prod,staging)'
kubectl label pods pod-name tier=backend
kubectl label pods pod-name env-              # Remove label

# Namespaces
kubectl get namespaces
kubectl create namespace production
kubectl delete namespace staging

# Working with multiple resources
kubectl get pods,services,deployments
kubectl get all
kubectl delete all --all -n namespace-name

# Output formats
kubectl get pods -o json
kubectl get pods -o yaml
kubectl get pods -o wide
kubectl get pods -o jsonpath='{.items[*].metadata.name}'

# Quick reference
kubectl api-resources                      # List all resource types
kubectl explain pod                        # Documentation for resource
kubectl explain pod.spec.containers        # Nested field docs`
      }
    },
    {
      id: 2,
      name: 'Pods & Deployments',
      icon: '📦',
      color: '#10b981',
      description: 'Pod lifecycle and Deployment strategies',
      content: {
        explanation: 'Pods are the fundamental unit in Kubernetes, encapsulating one or more containers with shared networking and storage. Deployments provide declarative updates for Pods and ReplicaSets, enabling rolling updates, rollbacks, and scaling with zero-downtime deployments.',
        keyPoints: [
          'Pod Lifecycle - Pending, Running, Succeeded, Failed, Unknown phases with init containers',
          'ReplicaSets - Ensure specified number of pod replicas are running at all times',
          'Deployments - Declarative updates for Pods with rolling update strategies',
          'Rolling Updates - Gradually replace old pods with new ones for zero downtime',
          'Rollbacks - Revert to previous deployment versions when issues occur',
          'Labels and Selectors - Key-value pairs for grouping and selecting resources',
          'Pod Templates - Specifications defining how pods should be created',
          'Deployment Strategies - RollingUpdate (default) and Recreate strategies'
        ],
        codeExample: `# ═══════════════════════════════════════════════════════════
# ✦ Pod Definitions and Configurations
# ═══════════════════════════════════════════════════════════
# Simple Pod manifest
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  namespace: default
  labels:
    app: nginx
    tier: frontend
  annotations:
    description: "Simple nginx web server"
spec:
  containers:
  - name: nginx
    image: nginx:1.25-alpine
    ports:
    - containerPort: 80
      name: http
      protocol: TCP
    env:
    - name: ENVIRONMENT
      value: "production"
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
    livenessProbe:
      httpGet:
        path: /
        port: 80
      initialDelaySeconds: 30
      periodSeconds: 10
    readinessProbe:
      httpGet:
        path: /
        port: 80
      initialDelaySeconds: 5
      periodSeconds: 5

# Pod with multiple containers (sidecar pattern)
apiVersion: v1
kind: Pod
metadata:
  name: app-with-sidecar
spec:
  containers:
  - name: app
    image: my-app:1.0.0
    ports:
    - containerPort: 8080
    volumeMounts:
    - name: shared-logs
      mountPath: /var/log/app
  - name: log-shipper
    image: fluentd:latest
    volumeMounts:
    - name: shared-logs
      mountPath: /var/log/app
      readOnly: true
  volumes:
  - name: shared-logs
    emptyDir: {}

# ═══════════════════════════════════════════════════════════
# ✦ Deployment Manifests and Strategies
# ═══════════════════════════════════════════════════════════
# Deployment manifest - Production ready
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: production
  labels:
    app: web-app
    version: v1.0.0
spec:
  # Number of pod replicas
  replicas: 3

  # Selector for pods managed by this deployment
  selector:
    matchLabels:
      app: web-app

  # Rolling update strategy
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # Max pods above desired count
      maxUnavailable: 0  # Max pods unavailable during update

  # Minimum time for pod to be ready
  minReadySeconds: 10

  # Number of old ReplicaSets to retain
  revisionHistoryLimit: 10

  # Pod template
  template:
    metadata:
      labels:
        app: web-app
        version: v1.0.0
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "8080"
    spec:
      # Service account for RBAC
      serviceAccountName: web-app-sa

      # Init container - runs before main containers
      initContainers:
      - name: init-db
        image: busybox:1.36
        command: ['sh', '-c']
        args:
        - |
          until nc -z postgres 5432; do
            echo "Waiting for database..."
            sleep 2
          done

      containers:
      - name: web-app
        image: myregistry.io/web-app:1.0.0
        imagePullPolicy: IfNotPresent

        ports:
        - name: http
          containerPort: 8080
          protocol: TCP

        env:
        - name: SPRING_PROFILES_ACTIVE
          value: "production"
        - name: DB_HOST
          value: "postgres.database.svc.cluster.local"
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: password

        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"

        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
          initialDelaySeconds: 60
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3

        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 3

        volumeMounts:
        - name: config
          mountPath: /app/config
          readOnly: true
        - name: logs
          mountPath: /app/logs

      volumes:
      - name: config
        configMap:
          name: app-config
      - name: logs
        emptyDir: {}

      # Node affinity - prefer specific nodes
      affinity:
        nodeAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            preference:
              matchExpressions:
              - key: node-type
                operator: In
                values:
                - application

      # Tolerations for taints
      tolerations:
      - key: "dedicated"
        operator: "Equal"
        value: "application"
        effect: "NoSchedule"

# ═══════════════════════════════════════════════════════════
# ✦ Deployment Management Commands
# ═══════════════════════════════════════════════════════════
# Create deployment
kubectl create deployment nginx --image=nginx:1.25

# Apply manifest
kubectl apply -f deployment.yaml

# Scale deployment
kubectl scale deployment web-app --replicas=5
kubectl autoscale deployment web-app --min=3 --max=10 --cpu-percent=80

# Update image (rolling update)
kubectl set image deployment/web-app web-app=myregistry.io/web-app:1.1.0
kubectl set image deployment/web-app web-app=myregistry.io/web-app:1.1.0 --record

# Rollout status
kubectl rollout status deployment/web-app
kubectl rollout history deployment/web-app
kubectl rollout history deployment/web-app --revision=2

# Rollback deployment
kubectl rollout undo deployment/web-app
kubectl rollout undo deployment/web-app --to-revision=2

# Pause/Resume rollout
kubectl rollout pause deployment/web-app
kubectl rollout resume deployment/web-app

# Restart deployment (recreate all pods)
kubectl rollout restart deployment/web-app

# ReplicaSet (managed by Deployment)
kubectl get replicasets
kubectl describe replicaset web-app-6b4d5f7c8d

# Delete deployment
kubectl delete deployment web-app

# Recreate strategy (downtime acceptable)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: maintenance-app
spec:
  replicas: 3
  strategy:
    type: Recreate  # All old pods terminated before new ones created
  selector:
    matchLabels:
      app: maintenance-app
  template:
    metadata:
      labels:
        app: maintenance-app
    spec:
      containers:
      - name: app
        image: maintenance-app:1.0.0

# Blue-Green Deployment (using labels)
# Deploy green version
kubectl apply -f green-deployment.yaml
# Test green version
kubectl port-forward deployment/app-green 8080:8080
# Switch service to green
kubectl patch service app-service -p '{"spec":{"selector":{"version":"green"}}}'
# Remove blue version
kubectl delete deployment app-blue`
      }
    },
    {
      id: 3,
      name: 'Services & Networking',
      icon: '🌐',
      color: '#f59e0b',
      description: 'Service discovery and networking patterns',
      content: {
        explanation: 'Kubernetes Services provide stable networking endpoints for accessing Pods. Services abstract pod IP addresses and provide load balancing, service discovery via DNS, and various access patterns through different service types. Network Policies control traffic flow between pods for enhanced security.',
        keyPoints: [
          'ClusterIP - Internal-only service accessible within cluster (default)',
          'NodePort - Exposes service on each node at a static port (30000-32767)',
          'LoadBalancer - Cloud provider load balancer for external access',
          'ExternalName - Maps service to external DNS name (CNAME)',
          'Service Discovery - Automatic DNS records for service-to-service communication',
          'Endpoints - Track IP addresses of pods backing a service',
          'Ingress - HTTP/HTTPS routing to services with SSL termination',
          'Network Policies - Firewall rules controlling pod-to-pod traffic'
        ],
        codeExample: `# ═══════════════════════════════════════════════════════════
# ✦ Service Types and Configurations
# ═══════════════════════════════════════════════════════════
# ClusterIP Service (internal only)
apiVersion: v1
kind: Service
metadata:
  name: backend-service
  namespace: production
  labels:
    app: backend
spec:
  type: ClusterIP
  selector:
    app: backend
    tier: api
  ports:
  - name: http
    protocol: TCP
    port: 8080        # Service port
    targetPort: 8080  # Container port
  - name: metrics
    protocol: TCP
    port: 9090
    targetPort: 9090
  sessionAffinity: ClientIP
  sessionAffinityConfig:
    clientIP:
      timeoutSeconds: 10800

# NodePort Service (external access via node IPs)
apiVersion: v1
kind: Service
metadata:
  name: frontend-nodeport
  namespace: production
spec:
  type: NodePort
  selector:
    app: frontend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
    nodePort: 30080  # Optional: specify port (30000-32767)

# LoadBalancer Service (cloud provider LB)
apiVersion: v1
kind: Service
metadata:
  name: web-loadbalancer
  namespace: production
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: nlb
    service.beta.kubernetes.io/aws-load-balancer-internal: "false"
spec:
  type: LoadBalancer
  selector:
    app: web
  ports:
  - name: http
    protocol: TCP
    port: 80
    targetPort: 8080
  - name: https
    protocol: TCP
    port: 443
    targetPort: 8443
  loadBalancerSourceRanges:
  - 10.0.0.0/8
  - 192.168.0.0/16

# ExternalName Service (DNS CNAME)
apiVersion: v1
kind: Service
metadata:
  name: external-database
  namespace: production
spec:
  type: ExternalName
  externalName: my-database.rds.amazonaws.com

# Headless Service (no ClusterIP, direct pod IPs)
apiVersion: v1
kind: Service
metadata:
  name: stateful-headless
spec:
  clusterIP: None
  selector:
    app: stateful-app
  ports:
  - protocol: TCP
    port: 3306
    targetPort: 3306

# Service with multiple selectors
apiVersion: v1
kind: Service
metadata:
  name: multi-version-service
spec:
  selector:
    app: my-app
    # Routes to pods with both labels
  ports:
  - port: 80
    targetPort: 8080

# ═══════════════════════════════════════════════════════════
# ✦ Ingress and HTTP Routing
# ═══════════════════════════════════════════════════════════
# Ingress - HTTP/HTTPS routing
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  namespace: production
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/rate-limit: "100"
spec:
  tls:
  - hosts:
    - app.example.com
    - api.example.com
    secretName: app-tls-cert
  rules:
  - host: app.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
  - host: api.example.com
    http:
      paths:
      - path: /api/v1
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 8080
      - path: /api/v2
        pathType: Prefix
        backend:
          service:
            name: backend-v2-service
            port:
              number: 8080

# ═══════════════════════════════════════════════════════════
# ✦ Network Policies and Security
# ═══════════════════════════════════════════════════════════
# Network Policy - Default deny all ingress
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-ingress
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress

# Network Policy - Allow specific ingress
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-allow-frontend
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  - Egress
  ingress:
  # Allow from frontend pods
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080
  # Allow from ingress controller
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 8080
  egress:
  # Allow to database
  - to:
    - podSelector:
        matchLabels:
          app: postgres
    ports:
    - protocol: TCP
      port: 5432
  # Allow DNS
  - to:
    - namespaceSelector: {}
      podSelector:
        matchLabels:
          k8s-app: kube-dns
    ports:
    - protocol: UDP
      port: 53

# ═══════════════════════════════════════════════════════════
# ✦ Service Management Commands
# ═══════════════════════════════════════════════════════════
# Create service
kubectl create service clusterip my-service --tcp=80:8080
kubectl expose deployment nginx --port=80 --target-port=8080

# Get services
kubectl get services
kubectl get svc -o wide
kubectl describe service my-service

# Service endpoints
kubectl get endpoints my-service
kubectl describe endpoints my-service

# DNS testing
kubectl run -it --rm debug --image=busybox --restart=Never -- nslookup my-service
kubectl run -it --rm debug --image=curlimages/curl --restart=Never -- curl http://my-service:80

# Service DNS format
# <service-name>.<namespace>.svc.cluster.local
# Example: backend-service.production.svc.cluster.local

# Port forwarding
kubectl port-forward service/my-service 8080:80

# Ingress commands
kubectl get ingress
kubectl describe ingress app-ingress

# Network policy commands
kubectl get networkpolicies
kubectl describe networkpolicy backend-allow-frontend

# Test network connectivity
kubectl run test-pod --rm -it --image=busybox -- sh
# Inside pod:
# wget -O- http://service-name:port
# nc -zv service-name port

# Service topology (prefer local endpoints)
apiVersion: v1
kind: Service
metadata:
  name: local-preferred
spec:
  topologyKeys:
  - "kubernetes.io/hostname"
  - "topology.kubernetes.io/zone"
  - "*"
  selector:
    app: my-app
  ports:
  - port: 80`
      }
    },
    {
      id: 4,
      name: 'ConfigMaps & Secrets',
      icon: '🔐',
      color: '#8b5cf6',
      description: 'Configuration and secrets management',
      content: {
        explanation: 'ConfigMaps store non-confidential configuration data as key-value pairs, while Secrets store sensitive information like passwords and tokens. Both can be consumed as environment variables, command-line arguments, or mounted as files in containers, enabling separation of configuration from application code.',
        keyPoints: [
          'ConfigMaps - Store configuration data separately from container images',
          'Secrets - Base64-encoded storage for sensitive data (not encryption)',
          'Environment Variables - Inject config/secrets as container environment variables',
          'Volume Mounts - Mount config/secrets as files in container filesystem',
          'Secret Types - Opaque (default), TLS, Docker registry credentials, service accounts',
          'Immutable ConfigMaps/Secrets - Cannot be changed, preventing accidental updates',
          'External Secrets - Integrate with external secret managers (Vault, AWS Secrets Manager)',
          'Best Practices - Encrypt at rest, use RBAC, rotate secrets regularly'
        ],
        codeExample: `# ═══════════════════════════════════════════════════════════
# ✦ ConfigMap Definitions and Usage
# ═══════════════════════════════════════════════════════════
# ConfigMap - Literal values
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: production
data:
  # Simple key-value pairs
  database.host: "postgres.database.svc.cluster.local"
  database.port: "5432"
  log.level: "info"
  feature.enabled: "true"

  # Multi-line configuration file
  application.properties: |
    server.port=8080
    spring.datasource.url=jdbc:postgresql://postgres:5432/mydb
    spring.jpa.hibernate.ddl-auto=validate
    logging.level.root=INFO
    logging.level.com.myapp=DEBUG

  # JSON configuration
  app.json: |
    {
      "server": {
        "port": 8080,
        "host": "0.0.0.0"
      },
      "database": {
        "max_connections": 100,
        "timeout": 30
      }
    }

# ConfigMap from file
# kubectl create configmap nginx-config --from-file=nginx.conf

# ConfigMap from directory
# kubectl create configmap app-config --from-file=./config/

# ConfigMap from literal
# kubectl create configmap app-config --from-literal=key1=value1 --from-literal=key2=value2

# Immutable ConfigMap (cannot be modified)
apiVersion: v1
kind: ConfigMap
metadata:
  name: static-config
immutable: true
data:
  config.yaml: |
    version: 1.0.0
    feature: enabled

# ═══════════════════════════════════════════════════════════
# ✦ Secret Definitions and Types
# ═══════════════════════════════════════════════════════════
# Secret - Opaque (generic)
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
  namespace: production
type: Opaque
data:
  # Base64 encoded values
  username: YWRtaW4=              # "admin"
  password: c3VwZXJzZWNyZXQxMjM=  # "supersecret123"

# Create secret from literal
# kubectl create secret generic db-credentials \\
#   --from-literal=username=admin \\
#   --from-literal=password=supersecret123

# Create secret from file
# kubectl create secret generic ssl-cert \\
#   --from-file=tls.crt=./cert.crt \\
#   --from-file=tls.key=./cert.key

# TLS Secret
apiVersion: v1
kind: Secret
metadata:
  name: tls-secret
  namespace: production
type: kubernetes.io/tls
data:
  tls.crt: LS0tLS1CRUdJTi...  # Base64 encoded certificate
  tls.key: LS0tLS1CRUdJTi...  # Base64 encoded private key

# Docker registry secret
apiVersion: v1
kind: Secret
metadata:
  name: docker-registry-secret
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: eyJhdXRocyI6eyJteXJlZ2lzdHJ5LmNvbSI6eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJzZWNyZXQiLCJhdXRoIjoiWVdSdGFXNDZjMlZqY21WMCJ9fX0=

# Create docker registry secret
# kubectl create secret docker-registry docker-registry-secret \\
#   --docker-server=myregistry.com \\
#   --docker-username=admin \\
#   --docker-password=secret \\
#   --docker-email=admin@example.com

# ═══════════════════════════════════════════════════════════
# ✦ Using ConfigMaps and Secrets in Pods
# ═══════════════════════════════════════════════════════════
# Using ConfigMap and Secret in Pod - Environment variables
apiVersion: v1
kind: Pod
metadata:
  name: app-pod
spec:
  containers:
  - name: app
    image: my-app:1.0.0
    env:
    # Single value from ConfigMap
    - name: DATABASE_HOST
      valueFrom:
        configMapKeyRef:
          name: app-config
          key: database.host

    # Single value from Secret
    - name: DATABASE_PASSWORD
      valueFrom:
        secretKeyRef:
          name: db-credentials
          key: password

    # All keys from ConfigMap as env vars
    envFrom:
    - configMapRef:
        name: app-config

    # All keys from Secret as env vars
    - secretRef:
        name: db-credentials

# Using ConfigMap and Secret - Volume mounts
apiVersion: v1
kind: Pod
metadata:
  name: app-with-volumes
spec:
  containers:
  - name: app
    image: my-app:1.0.0
    volumeMounts:
    # Mount entire ConfigMap as files
    - name: config-volume
      mountPath: /etc/config
      readOnly: true

    # Mount specific ConfigMap key as file
    - name: app-properties
      mountPath: /app/config/application.properties
      subPath: application.properties
      readOnly: true

    # Mount Secret as files
    - name: secret-volume
      mountPath: /etc/secrets
      readOnly: true

  volumes:
  # ConfigMap volume
  - name: config-volume
    configMap:
      name: app-config

  # ConfigMap with specific items
  - name: app-properties
    configMap:
      name: app-config
      items:
      - key: application.properties
        path: application.properties

  # Secret volume
  - name: secret-volume
    secret:
      secretName: db-credentials
      defaultMode: 0400

# Deployment with ConfigMap and Secret
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      # Use docker registry secret for private images
      imagePullSecrets:
      - name: docker-registry-secret

      containers:
      - name: web-app
        image: myregistry.com/web-app:1.0.0
        env:
        - name: DB_HOST
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: database.host
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: password
        volumeMounts:
        - name: config
          mountPath: /app/config
        - name: tls
          mountPath: /app/certs

      volumes:
      - name: config
        configMap:
          name: app-config
      - name: tls
        secret:
          secretName: tls-secret

# ═══════════════════════════════════════════════════════════
# ✦ External Secrets and Management
# ═══════════════════════════════════════════════════════════
# External Secrets Operator (ESO) - AWS Secrets Manager
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: aws-secrets-manager
  namespace: production
spec:
  provider:
    aws:
      service: SecretsManager
      region: us-east-1
      auth:
        jwt:
          serviceAccountRef:
            name: external-secrets-sa

apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: database-credentials
  namespace: production
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets-manager
    kind: SecretStore
  target:
    name: db-credentials
    creationPolicy: Owner
  data:
  - secretKey: password
    remoteRef:
      key: production/database/password

# HashiCorp Vault integration
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: vault-backend
spec:
  provider:
    vault:
      server: "https://vault.example.com"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes"
          role: "my-app"

# ═══════════════════════════════════════════════════════════
# ✦ ConfigMap and Secret Commands
# ═══════════════════════════════════════════════════════════
# View ConfigMaps
kubectl get configmaps
kubectl describe configmap app-config
kubectl get configmap app-config -o yaml

# View Secrets (values are hidden by default)
kubectl get secrets
kubectl describe secret db-credentials
kubectl get secret db-credentials -o yaml

# Decode secret value
kubectl get secret db-credentials -o jsonpath='{.data.password}' | base64 -d

# Edit ConfigMap/Secret
kubectl edit configmap app-config
kubectl edit secret db-credentials

# Delete ConfigMap/Secret
kubectl delete configmap app-config
kubectl delete secret db-credentials

# Best practices:
# 1. Never commit secrets to version control
# 2. Use external secret managers for production
# 3. Enable encryption at rest for etcd
# 4. Use RBAC to restrict secret access
# 5. Rotate secrets regularly
# 6. Use immutable ConfigMaps for critical config
# 7. Prefer volume mounts over env vars for secrets
# 8. Use separate secrets per environment`
      }
    },
    {
      id: 5,
      name: 'Persistent Storage',
      icon: '💾',
      color: '#ec4899',
      description: 'Volumes and persistent data management',
      content: {
        explanation: 'Kubernetes provides various storage options for persisting data beyond pod lifecycles. PersistentVolumes (PV) represent cluster storage resources, while PersistentVolumeClaims (PVC) are requests for storage. StatefulSets manage stateful applications with stable network identities and persistent storage.',
        keyPoints: [
          'PersistentVolume (PV) - Cluster-level storage resource independent of pods',
          'PersistentVolumeClaim (PVC) - Request for storage by a pod or deployment',
          'StorageClass - Dynamic provisioning of PVs with different performance characteristics',
          'Volume Access Modes - ReadWriteOnce (RWO), ReadOnlyMany (ROX), ReadWriteMany (RWX)',
          'StatefulSets - Ordered deployment and scaling with stable identities',
          'Dynamic Provisioning - Automatic PV creation on PVC creation',
          'Volume Types - HostPath, NFS, AWS EBS, Azure Disk, GCE PD, Ceph, etc.',
          'Volume Reclaim Policy - Retain, Delete, or Recycle when PVC deleted'
        ],
        codeExample: `# ═══════════════════════════════════════════════════════════
# ✦ PersistentVolume Definitions
# ═══════════════════════════════════════════════════════════
# PersistentVolume - Manual provisioning
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-nfs
  labels:
    type: nfs
spec:
  capacity:
    storage: 10Gi
  volumeMode: Filesystem
  accessModes:
  - ReadWriteMany      # Multiple pods can mount read-write
  persistentVolumeReclaimPolicy: Retain
  storageClassName: nfs
  mountOptions:
  - hard
  - nfsvers=4.1
  nfs:
    server: nfs-server.example.com
    path: /exported/path

# PersistentVolume - AWS EBS
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-aws-ebs
spec:
  capacity:
    storage: 20Gi
  volumeMode: Filesystem
  accessModes:
  - ReadWriteOnce      # Single pod mount
  persistentVolumeReclaimPolicy: Delete
  storageClassName: gp3
  awsElasticBlockStore:
    volumeID: vol-0123456789abcdef
    fsType: ext4

# PersistentVolumeClaim - Request storage
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-pvc
  namespace: production
spec:
  accessModes:
  - ReadWriteOnce
  volumeMode: Filesystem
  resources:
    requests:
      storage: 5Gi
  storageClassName: fast-ssd
  selector:
    matchLabels:
      type: ssd

# ═══════════════════════════════════════════════════════════
# ✦ StorageClass and Dynamic Provisioning
# ═══════════════════════════════════════════════════════════
# StorageClass - Dynamic provisioning (AWS EBS)
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd
  annotations:
    storageclass.kubernetes.io/is-default-class: "false"
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
  iops: "3000"
  throughput: "125"
  encrypted: "true"
  kmsKeyId: arn:aws:kms:us-east-1:123456789:key/abc-123
volumeBindingMode: WaitForFirstConsumer  # Delay binding until pod scheduled
allowVolumeExpansion: true
reclaimPolicy: Delete

# StorageClass - Azure Disk
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: azure-disk-premium
provisioner: kubernetes.io/azure-disk
parameters:
  storageaccounttype: Premium_LRS
  kind: Managed
allowVolumeExpansion: true
reclaimPolicy: Delete

# StorageClass - GCE Persistent Disk
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: gce-pd-ssd
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-ssd
  replication-type: regional-pd
allowVolumeExpansion: true
reclaimPolicy: Delete

# Pod using PVC
apiVersion: v1
kind: Pod
metadata:
  name: app-with-storage
spec:
  containers:
  - name: app
    image: nginx:latest
    volumeMounts:
    - name: data
      mountPath: /usr/share/nginx/html
  volumes:
  - name: data
    persistentVolumeClaim:
      claimName: data-pvc

# Deployment with PVC
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web
        image: web-app:1.0.0
        volumeMounts:
        - name: uploads
          mountPath: /app/uploads
      volumes:
      - name: uploads
        persistentVolumeClaim:
          claimName: shared-uploads-pvc

# ═══════════════════════════════════════════════════════════
# ✦ StatefulSet and Persistent Storage
# ═══════════════════════════════════════════════════════════
# StatefulSet - For stateful applications
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
  namespace: database
spec:
  serviceName: postgres-headless
  replicas: 3
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15-alpine
        ports:
        - containerPort: 5432
          name: postgres
        env:
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgres-credentials
              key: password
        - name: PGDATA
          value: /var/lib/postgresql/data/pgdata
        volumeMounts:
        - name: data
          mountPath: /var/lib/postgresql/data
        resources:
          requests:
            memory: 1Gi
            cpu: 500m
          limits:
            memory: 2Gi
            cpu: 1000m

  # VolumeClaimTemplates - Creates PVC for each replica
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes:
      - ReadWriteOnce
      storageClassName: fast-ssd
      resources:
        requests:
          storage: 50Gi

# Headless Service for StatefulSet
apiVersion: v1
kind: Service
metadata:
  name: postgres-headless
  namespace: database
spec:
  clusterIP: None
  selector:
    app: postgres
  ports:
  - port: 5432
    targetPort: 5432

# StatefulSet - Redis Cluster
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: redis
spec:
  serviceName: redis-headless
  replicas: 6
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        command:
        - redis-server
        - --cluster-enabled
        - "yes"
        - --cluster-config-file
        - /data/nodes.conf
        - --cluster-node-timeout
        - "5000"
        - --appendonly
        - "yes"
        ports:
        - containerPort: 6379
          name: client
        - containerPort: 16379
          name: gossip
        volumeMounts:
        - name: data
          mountPath: /data
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes:
      - ReadWriteOnce
      resources:
        requests:
          storage: 10Gi

# Volume types - EmptyDir (temporary)
apiVersion: v1
kind: Pod
metadata:
  name: pod-with-emptydir
spec:
  containers:
  - name: app
    image: nginx
    volumeMounts:
    - name: cache
      mountPath: /cache
  volumes:
  - name: cache
    emptyDir:
      sizeLimit: 1Gi
      medium: Memory  # Use RAM

# Volume types - HostPath (node local storage)
apiVersion: v1
kind: Pod
metadata:
  name: pod-with-hostpath
spec:
  containers:
  - name: app
    image: nginx
    volumeMounts:
    - name: host-data
      mountPath: /data
  volumes:
  - name: host-data
    hostPath:
      path: /mnt/data
      type: DirectoryOrCreate

# Volume types - NFS
apiVersion: v1
kind: Pod
metadata:
  name: pod-with-nfs
spec:
  containers:
  - name: app
    image: nginx
    volumeMounts:
    - name: nfs-storage
      mountPath: /shared
  volumes:
  - name: nfs-storage
    nfs:
      server: nfs-server.example.com
      path: /exports/shared

# ═══════════════════════════════════════════════════════════
# ✦ Storage Management Commands
# ═══════════════════════════════════════════════════════════
# Get PersistentVolumes
kubectl get pv
kubectl describe pv pv-name

# Get PersistentVolumeClaims
kubectl get pvc
kubectl describe pvc data-pvc

# Get StorageClasses
kubectl get storageclass
kubectl describe storageclass fast-ssd

# StatefulSet commands
kubectl get statefulsets
kubectl describe statefulset postgres
kubectl scale statefulset postgres --replicas=5
kubectl rollout status statefulset postgres

# Delete StatefulSet (keep PVCs)
kubectl delete statefulset postgres --cascade=orphan

# Volume expansion
kubectl edit pvc data-pvc
# Increase storage size in spec.resources.requests.storage
# Note: Requires StorageClass with allowVolumeExpansion: true

# Volume snapshot (requires CSI driver)
apiVersion: snapshot.storage.k8s.io/v1
kind: VolumeSnapshot
metadata:
  name: data-snapshot
spec:
  volumeSnapshotClassName: csi-snapclass
  source:
    persistentVolumeClaimName: data-pvc

# Restore from snapshot
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: restored-pvc
spec:
  dataSource:
    name: data-snapshot
    kind: VolumeSnapshot
    apiGroup: snapshot.storage.k8s.io
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi

# Backup PVC data
kubectl run backup --rm -i --tty --image=busybox \\
  --overrides='{"spec":{"containers":[{"name":"backup","image":"busybox","stdin":true,"tty":true,"volumeMounts":[{"name":"data","mountPath":"/data"}]}],"volumes":[{"name":"data","persistentVolumeClaim":{"claimName":"data-pvc"}}]}}' \\
  -- tar czf - /data > backup.tar.gz

# Restore PVC data
kubectl run restore --rm -i --image=busybox \\
  --overrides='{"spec":{"containers":[{"name":"restore","image":"busybox","stdin":true,"volumeMounts":[{"name":"data","mountPath":"/data"}]}],"volumes":[{"name":"data","persistentVolumeClaim":{"claimName":"data-pvc"}}]}}' \\
  < backup.tar.gz -- tar xzf - -C /

# Access modes:
# ReadWriteOnce (RWO) - Single node mount read-write
# ReadOnlyMany (ROX) - Many nodes mount read-only
# ReadWriteMany (RWX) - Many nodes mount read-write`
      }
    },
    {
      id: 6,
      name: 'Auto-Scaling & Resources',
      icon: '📊',
      color: '#06b6d4',
      description: 'Scaling and resource management',
      content: {
        explanation: 'Kubernetes provides multiple auto-scaling mechanisms to handle varying workloads. HPA scales pod replicas based on metrics, VPA adjusts container resource requests/limits, and Cluster Autoscaler adds/removes nodes. Resource requests and limits ensure QoS and prevent resource contention.',
        keyPoints: [
          'Horizontal Pod Autoscaler (HPA) - Automatically scales pod replicas based on CPU, memory, or custom metrics',
          'Vertical Pod Autoscaler (VPA) - Adjusts CPU and memory requests/limits for containers',
          'Cluster Autoscaler - Adds or removes cluster nodes based on resource demand',
          'Resource Requests - Minimum resources guaranteed for container scheduling',
          'Resource Limits - Maximum resources container can consume',
          'Quality of Service (QoS) - Guaranteed, Burstable, BestEffort classes',
          'Metrics Server - Collects resource metrics from kubelets',
          'Custom Metrics - Scale based on application-specific metrics (queue depth, RPS)'
        ],
        codeExample: `# ═══════════════════════════════════════════════════════════
# ✦ Metrics Server and Resource Monitoring
# ═══════════════════════════════════════════════════════════
# Install Metrics Server (required for HPA)
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# Verify Metrics Server
kubectl get deployment metrics-server -n kube-system
kubectl top nodes
kubectl top pods --all-namespaces

# Deployment with resource requests and limits
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web
        image: web-app:1.0.0
        resources:
          requests:
            memory: "256Mi"   # Minimum guaranteed
            cpu: "250m"       # 0.25 CPU cores
          limits:
            memory: "512Mi"   # Maximum allowed
            cpu: "500m"       # 0.5 CPU cores
        ports:
        - containerPort: 8080

# ═══════════════════════════════════════════════════════════
# ✦ Horizontal Pod Autoscaler Configuration
# ═══════════════════════════════════════════════════════════
# HorizontalPodAutoscaler - CPU based
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 3
  maxReplicas: 10
  metrics:
  # Scale based on CPU utilization
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70  # Target 70% CPU
  # Scale based on memory utilization
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80  # Target 80% memory
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300  # Wait 5 min before scaling down
      policies:
      - type: Percent
        value: 50          # Scale down max 50% of current replicas
        periodSeconds: 60  # Per minute
      - type: Pods
        value: 2           # Or max 2 pods per minute
        periodSeconds: 60
      selectPolicy: Min    # Use slower policy
    scaleUp:
      stabilizationWindowSeconds: 0  # Scale up immediately
      policies:
      - type: Percent
        value: 100         # Double replicas
        periodSeconds: 15  # Every 15 seconds
      - type: Pods
        value: 4           # Or add 4 pods
        periodSeconds: 15
      selectPolicy: Max    # Use faster policy

# HPA with custom metrics (using Prometheus)
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: custom-metrics-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-server
  minReplicas: 2
  maxReplicas: 20
  metrics:
  # CPU utilization
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 60
  # Custom metric - requests per second
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: "1000"
  # Custom metric - queue depth
  - type: Object
    object:
      metric:
        name: queue_depth
      describedObject:
        apiVersion: v1
        kind: Service
        name: message-queue
      target:
        type: Value
        value: "30"

# Create HPA using kubectl
kubectl autoscale deployment web-app --cpu-percent=70 --min=3 --max=10

# HPA commands
kubectl get hpa
kubectl describe hpa web-app-hpa
kubectl delete hpa web-app-hpa

# Watch HPA in real-time
kubectl get hpa -w

# VerticalPodAutoscaler (VPA)
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: web-app-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  updatePolicy:
    updateMode: "Auto"  # Auto, Recreate, Initial, Off
  resourcePolicy:
    containerPolicies:
    - containerName: web
      minAllowed:
        cpu: 100m
        memory: 128Mi
      maxAllowed:
        cpu: 2
        memory: 2Gi
      controlledResources:
      - cpu
      - memory

# VPA modes:
# - "Off": Only recommendations, no auto-updates
# - "Initial": Set resources on pod creation only
# - "Recreate": Update running pods (requires restart)
# - "Auto": Recreate + update new pods

# VPA commands
kubectl get vpa
kubectl describe vpa web-app-vpa

# ═══════════════════════════════════════════════════════════
# ✦ Quality of Service and Resource Quotas
# ═══════════════════════════════════════════════════════════
# Quality of Service (QoS) Classes

# 1. Guaranteed - Highest priority
# Requests == Limits for all containers
apiVersion: v1
kind: Pod
metadata:
  name: guaranteed-pod
spec:
  containers:
  - name: app
    image: nginx
    resources:
      requests:
        memory: "256Mi"
        cpu: "500m"
      limits:
        memory: "256Mi"
        cpu: "500m"

# 2. Burstable - Medium priority
# Requests < Limits, or only requests set
apiVersion: v1
kind: Pod
metadata:
  name: burstable-pod
spec:
  containers:
  - name: app
    image: nginx
    resources:
      requests:
        memory: "128Mi"
        cpu: "250m"
      limits:
        memory: "512Mi"
        cpu: "1000m"

# 3. BestEffort - Lowest priority
# No requests or limits set
apiVersion: v1
kind: Pod
metadata:
  name: besteffort-pod
spec:
  containers:
  - name: app
    image: nginx
    # No resources specified

# LimitRange - Set default limits per namespace
apiVersion: v1
kind: LimitRange
metadata:
  name: resource-limits
  namespace: production
spec:
  limits:
  # Container limits
  - type: Container
    max:
      cpu: "2"
      memory: "2Gi"
    min:
      cpu: "100m"
      memory: "64Mi"
    default:
      cpu: "500m"
      memory: "512Mi"
    defaultRequest:
      cpu: "250m"
      memory: "256Mi"
  # Pod limits
  - type: Pod
    max:
      cpu: "4"
      memory: "4Gi"
  # PVC limits
  - type: PersistentVolumeClaim
    max:
      storage: "100Gi"
    min:
      storage: "1Gi"

# ResourceQuota - Limit total resources per namespace
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: development
spec:
  hard:
    requests.cpu: "10"         # Total CPU requests
    requests.memory: "20Gi"    # Total memory requests
    limits.cpu: "20"           # Total CPU limits
    limits.memory: "40Gi"      # Total memory limits
    pods: "50"                 # Max pods
    services: "10"             # Max services
    persistentvolumeclaims: "10"  # Max PVCs
    requests.storage: "100Gi"  # Total storage

# ResourceQuota - Object count limits
apiVersion: v1
kind: ResourceQuota
metadata:
  name: object-quota
  namespace: development
spec:
  hard:
    configmaps: "20"
    secrets: "20"
    services.loadbalancers: "2"
    services.nodeports: "5"

# PriorityClass - Pod scheduling priority
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000000
globalDefault: false
description: "High priority for critical applications"

# Use PriorityClass in Pod
apiVersion: v1
kind: Pod
metadata:
  name: critical-app
spec:
  priorityClassName: high-priority
  containers:
  - name: app
    image: critical-app:1.0.0

# Cluster Autoscaler (cloud provider specific)
# AWS example - uses node groups
# Configure via cloud provider settings
# Nodes scaled based on pending pods

# Check resource usage
kubectl top nodes
kubectl top pods -n production
kubectl top pods --containers -n production

# Describe node to see allocatable resources
kubectl describe node node-name

# View pod resource usage
kubectl describe pod pod-name

# Stress test for HPA
kubectl run -it load-generator --rm --image=busybox --restart=Never -- /bin/sh -c "while sleep 0.01; do wget -q -O- http://web-app; done"

# Monitor HPA behavior
watch kubectl get hpa

# PodDisruptionBudget - Ensure availability during disruptions
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: web-app-pdb
spec:
  minAvailable: 2  # At least 2 pods must be available
  # OR
  # maxUnavailable: 1  # At most 1 pod can be unavailable
  selector:
    matchLabels:
      app: web-app

# Resource best practices:
# 1. Always set requests for scheduling
# 2. Set limits to prevent resource hogging
# 3. Use HPA for stateless apps
# 4. Use VPA for right-sizing resources
# 5. Monitor actual usage and adjust
# 6. Use PodDisruptionBudgets for HA
# 7. Set ResourceQuotas per namespace
# 8. Use appropriate QoS classes`
      }
    },
    {
      id: 7,
      name: 'Health Checks & Probes',
      icon: '🏥',
      color: '#84cc16',
      description: 'Application health monitoring',
      content: {
        explanation: 'Kubernetes uses probes to monitor container health and readiness. Liveness probes detect and restart unhealthy containers, readiness probes control traffic routing, and startup probes handle slow-starting containers. Proper probe configuration is critical for application reliability and zero-downtime deployments.',
        keyPoints: [
          'Liveness Probe - Detects when container is unhealthy and needs restart',
          'Readiness Probe - Determines when container is ready to accept traffic',
          'Startup Probe - Delays liveness/readiness checks for slow-starting apps',
          'HTTP Probes - Check HTTP endpoints for status codes (200-399 = success)',
          'TCP Probes - Test if TCP port is accepting connections',
          'Exec Probes - Run command inside container, exit code 0 = success',
          'Graceful Shutdown - PreStop hooks and termination grace period',
          'Probe Configuration - initialDelaySeconds, periodSeconds, timeoutSeconds, failureThreshold'
        ],
        codeExample: `# ═══════════════════════════════════════════════════════════
# ✦ Probe Types and Lifecycle Management
# ═══════════════════════════════════════════════════════════
# Comprehensive Deployment with all probe types
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web
        image: web-app:1.0.0
        ports:
        - name: http
          containerPort: 8080

        # Liveness Probe - HTTP GET
        # Kubelet restarts container if this fails
        livenessProbe:
          httpGet:
            path: /actuator/health/liveness
            port: 8080
            httpHeaders:
            - name: X-Health-Check
              value: liveness
          initialDelaySeconds: 60    # Wait 60s after start
          periodSeconds: 10          # Check every 10s
          timeoutSeconds: 5          # Timeout after 5s
          failureThreshold: 3        # Restart after 3 failures
          successThreshold: 1        # Consider healthy after 1 success

        # Readiness Probe - HTTP GET
        # Removes from Service endpoints if fails
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 30    # Wait 30s after start
          periodSeconds: 5           # Check every 5s
          timeoutSeconds: 3          # Timeout after 3s
          failureThreshold: 3        # Remove after 3 failures
          successThreshold: 1        # Add back after 1 success

        # Startup Probe - HTTP GET
        # Delays liveness/readiness until app starts
        # Useful for slow-starting applications
        startupProbe:
          httpGet:
            path: /actuator/health/startup
            port: 8080
          initialDelaySeconds: 0
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 30       # 30 * 10s = 5 min max startup time
          successThreshold: 1

        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"

        # Lifecycle hooks
        lifecycle:
          # PostStart - runs after container starts
          postStart:
            exec:
              command:
              - /bin/sh
              - -c
              - echo "Container started at $(date)" > /tmp/startup.log

          # PreStop - runs before container stops
          # Allows graceful shutdown
          preStop:
            exec:
              command:
              - /bin/sh
              - -c
              - |
                # Graceful shutdown script
                echo "Shutting down gracefully..."
                # Stop accepting new requests
                touch /tmp/shutdown
                # Wait for existing requests to complete
                sleep 15
                # Cleanup
                rm -f /tmp/*.tmp

      # Termination grace period (default: 30s)
      terminationGracePeriodSeconds: 60

# ═══════════════════════════════════════════════════════════
# ✦ Alternative Probe Methods
# ═══════════════════════════════════════════════════════════
# Liveness Probe - TCP Socket
apiVersion: v1
kind: Pod
metadata:
  name: tcp-liveness
spec:
  containers:
  - name: redis
    image: redis:7-alpine
    ports:
    - containerPort: 6379
    livenessProbe:
      tcpSocket:
        port: 6379
      initialDelaySeconds: 15
      periodSeconds: 20
      timeoutSeconds: 5
      failureThreshold: 3

# Liveness Probe - Exec Command
apiVersion: v1
kind: Pod
metadata:
  name: exec-liveness
spec:
  containers:
  - name: postgres
    image: postgres:15-alpine
    env:
    - name: POSTGRES_PASSWORD
      value: secret
    livenessProbe:
      exec:
        command:
        - /bin/sh
        - -c
        - pg_isready -U postgres
      initialDelaySeconds: 30
      periodSeconds: 10
      timeoutSeconds: 5
      failureThreshold: 3
    readinessProbe:
      exec:
        command:
        - /bin/sh
        - -c
        - psql -U postgres -c "SELECT 1"
      initialDelaySeconds: 10
      periodSeconds: 5

# Readiness Probe - gRPC
apiVersion: v1
kind: Pod
metadata:
  name: grpc-readiness
spec:
  containers:
  - name: grpc-app
    image: grpc-app:1.0.0
    ports:
    - containerPort: 50051
    readinessProbe:
      grpc:
        port: 50051
        service: health  # gRPC health service
      initialDelaySeconds: 10
      periodSeconds: 5

# Spring Boot Actuator health endpoints
# application.properties:
# management.endpoint.health.probes.enabled=true
# management.health.livenessState.enabled=true
# management.health.readinessState.enabled=true

# Custom health check endpoint (Node.js example)
/*
const express = require('express');
const app = express();

let isReady = false;
let isHealthy = true;

// Startup logic
setTimeout(() => {
  isReady = true;
  console.log('Application ready');
}, 30000);

// Liveness endpoint
app.get('/health/liveness', (req, res) => {
  if (isHealthy) {
    res.status(200).send('OK');
  } else {
    res.status(503).send('Unhealthy');
  }
});

// Readiness endpoint
app.get('/health/readiness', (req, res) => {
  if (isReady) {
    res.status(200).send('Ready');
  } else {
    res.status(503).send('Not Ready');
  }
});

// Startup endpoint
app.get('/health/startup', (req, res) => {
  if (isReady) {
    res.status(200).send('Started');
  } else {
    res.status(503).send('Starting...');
  }
});

app.listen(8080);
*/

# Database with readiness probe
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
spec:
  serviceName: mysql
  replicas: 1
  selector:
    matchLabels:
      app: mysql
  template:
    metadata:
      labels:
        app: mysql
    spec:
      containers:
      - name: mysql
        image: mysql:8.0
        env:
        - name: MYSQL_ROOT_PASSWORD
          value: rootpass
        ports:
        - containerPort: 3306
        livenessProbe:
          exec:
            command:
            - mysqladmin
            - ping
            - -h
            - localhost
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
        readinessProbe:
          exec:
            command:
            - mysql
            - -h
            - 127.0.0.1
            - -e
            - "SELECT 1"
          initialDelaySeconds: 10
          periodSeconds: 5
        volumeMounts:
        - name: data
          mountPath: /var/lib/mysql
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes:
      - ReadWriteOnce
      resources:
        requests:
          storage: 10Gi

# Nginx with custom health check
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:alpine
        ports:
        - containerPort: 80
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 10
          periodSeconds: 5
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 3
        lifecycle:
          preStop:
            exec:
              command:
              - /bin/sh
              - -c
              - nginx -s quit; while killall -0 nginx; do sleep 1; done

# ═══════════════════════════════════════════════════════════
# ✦ Health Check Best Practices
# ═══════════════════════════════════════════════════════════
# Debugging failed probes
# View pod events
kubectl describe pod pod-name

# Check probe configuration
kubectl get pod pod-name -o yaml | grep -A 10 "livenessProbe\\|readinessProbe"

# View container logs
kubectl logs pod-name
kubectl logs pod-name --previous  # Previous crashed container

# Test health endpoint manually
kubectl exec -it pod-name -- curl http://localhost:8080/health

# Port-forward and test locally
kubectl port-forward pod/pod-name 8080:8080
curl http://localhost:8080/health

# Common probe issues:
# 1. initialDelaySeconds too short
# 2. timeoutSeconds too short
# 3. failureThreshold too low
# 4. Probe endpoint too slow
# 5. No graceful shutdown handling

# Probe timing recommendations:
# Fast-starting apps:
#   - Liveness: initialDelaySeconds=30, periodSeconds=10
#   - Readiness: initialDelaySeconds=10, periodSeconds=5

# Slow-starting apps:
#   - Use startupProbe with high failureThreshold
#   - Liveness: initialDelaySeconds=120, periodSeconds=10
#   - Readiness: initialDelaySeconds=60, periodSeconds=5

# Databases:
#   - Liveness: initialDelaySeconds=60, periodSeconds=10
#   - Readiness: initialDelaySeconds=30, periodSeconds=5

# Best practices:
# 1. Always implement readiness probes
# 2. Use liveness probes carefully (avoid restart loops)
# 3. Use startup probes for slow apps
# 4. Keep probe endpoints lightweight
# 5. Don't check dependencies in liveness probes
# 6. Implement graceful shutdown with preStop hooks
# 7. Set appropriate terminationGracePeriodSeconds
# 8. Monitor probe failures in production

# Graceful shutdown example (Go)
/*
func main() {
    srv := &http.Server{Addr: ":8080"}

    go func() {
        if err := srv.ListenAndServe(); err != nil {
            log.Fatal(err)
        }
    }()

    // Wait for interrupt signal
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGTERM, syscall.SIGINT)
    <-quit

    // Graceful shutdown
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()
    if err := srv.Shutdown(ctx); err != nil {
        log.Fatal(err)
    }
}
*/`
      }
    },
    {
      id: 8,
      name: 'Production Best Practices',
      icon: '🚀',
      color: '#ef4444',
      description: 'Security, monitoring, and operational excellence',
      content: {
        explanation: 'Production Kubernetes requires robust security with RBAC, network policies, and Pod Security Standards. Monitoring with Prometheus and Grafana provides observability, while centralized logging with ELK stack enables troubleshooting. GitOps practices ensure reproducible deployments, and proper high availability design prevents outages.',
        keyPoints: [
          'RBAC - Role-Based Access Control for fine-grained permissions',
          'Network Policies - Micro-segmentation and pod-to-pod firewall rules',
          'Pod Security Standards - Enforce security best practices (Privileged, Baseline, Restricted)',
          'Resource Quotas - Prevent resource exhaustion per namespace',
          'Monitoring - Prometheus and Grafana for metrics and alerting',
          'Logging - Centralized logging with ELK/EFK stack or cloud solutions',
          'GitOps - Infrastructure as Code with ArgoCD or Flux',
          'High Availability - Multi-zone deployments, PodDisruptionBudgets, backup strategies'
        ],
        codeExample: `# ═══════════════════════════════════════════════════════════
# ✦ RBAC Configuration
# ═══════════════════════════════════════════════════════════
# RBAC - ServiceAccount
apiVersion: v1
kind: ServiceAccount
metadata:
  name: app-service-account
  namespace: production

# RBAC - Role (namespace-scoped)
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: pod-reader
  namespace: production
rules:
- apiGroups: [""]
  resources: ["pods", "pods/log"]
  verbs: ["get", "list", "watch"]
- apiGroups: [""]
  resources: ["configmaps"]
  verbs: ["get", "list"]

# RBAC - RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: read-pods
  namespace: production
subjects:
- kind: ServiceAccount
  name: app-service-account
  namespace: production
roleRef:
  kind: Role
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io

# RBAC - ClusterRole (cluster-wide)
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: cluster-admin-custom
rules:
- apiGroups: [""]
  resources: ["*"]
  verbs: ["*"]
- apiGroups: ["apps"]
  resources: ["deployments", "statefulsets", "daemonsets"]
  verbs: ["*"]
- apiGroups: ["batch"]
  resources: ["jobs", "cronjobs"]
  verbs: ["*"]

# RBAC - ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-binding
subjects:
- kind: User
  name: admin@example.com
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: cluster-admin-custom
  apiGroup: rbac.authorization.k8s.io

# RBAC - Developer role (limited permissions)
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: developer
  namespace: development
rules:
- apiGroups: ["", "apps", "batch"]
  resources: ["pods", "pods/log", "deployments", "services", "configmaps", "jobs"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
- apiGroups: [""]
  resources: ["pods/exec", "pods/port-forward"]
  verbs: ["create"]

# Use ServiceAccount in Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      serviceAccountName: app-service-account
      automountServiceAccountToken: true
      containers:
      - name: app
        image: app:1.0.0

# ═══════════════════════════════════════════════════════════
# ✦ Security Policies and Network Controls
# ═══════════════════════════════════════════════════════════
# Pod Security Standards - Restricted (most secure)
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted

# NetworkPolicy - Default deny all
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress

# NetworkPolicy - Allow specific traffic
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: app-network-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: web-app
  policyTypes:
  - Ingress
  - Egress
  ingress:
  # Allow from ingress controller
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 8080
  # Allow from same namespace
  - from:
    - podSelector:
        matchLabels:
          tier: frontend
    ports:
    - protocol: TCP
      port: 8080
  egress:
  # Allow to database
  - to:
    - podSelector:
        matchLabels:
          app: postgres
    ports:
    - protocol: TCP
      port: 5432
  # Allow DNS
  - to:
    - namespaceSelector:
        matchLabels:
          name: kube-system
    ports:
    - protocol: UDP
      port: 53
  # Allow external HTTPS
  - to:
    - namespaceSelector: {}
    ports:
    - protocol: TCP
      port: 443

# ResourceQuota - Namespace limits
apiVersion: v1
kind: ResourceQuota
metadata:
  name: production-quota
  namespace: production
spec:
  hard:
    requests.cpu: "100"
    requests.memory: "200Gi"
    limits.cpu: "200"
    limits.memory: "400Gi"
    pods: "100"
    services: "50"
    services.loadbalancers: "5"
    persistentvolumeclaims: "50"
    requests.storage: "500Gi"

# LimitRange - Default resource constraints
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: production
spec:
  limits:
  - default:
      cpu: "500m"
      memory: "512Mi"
    defaultRequest:
      cpu: "250m"
      memory: "256Mi"
    max:
      cpu: "2"
      memory: "2Gi"
    min:
      cpu: "100m"
      memory: "64Mi"
    type: Container

# PodDisruptionBudget - Ensure availability
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: app-pdb
  namespace: production
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: web-app

# ═══════════════════════════════════════════════════════════
# ✦ Monitoring and Alerting
# ═══════════════════════════════════════════════════════════
# Prometheus ServiceMonitor (with Prometheus Operator)
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: app-metrics
  namespace: production
spec:
  selector:
    matchLabels:
      app: web-app
  endpoints:
  - port: metrics
    interval: 30s
    path: /actuator/prometheus

# Prometheus rules - Alerting
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: app-alerts
  namespace: production
spec:
  groups:
  - name: app
    interval: 30s
    rules:
    - alert: HighErrorRate
      expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
      for: 5m
      labels:
        severity: critical
      annotations:
        summary: "High error rate detected"
        description: "Error rate is {{ $value }} errors/sec"

    - alert: PodCrashLooping
      expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: "Pod is crash looping"
        description: "Pod {{ $labels.pod }} is restarting"

# Fluentd DaemonSet - Log collection
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd
  namespace: kube-system
spec:
  selector:
    matchLabels:
      app: fluentd
  template:
    metadata:
      labels:
        app: fluentd
    spec:
      serviceAccountName: fluentd
      containers:
      - name: fluentd
        image: fluent/fluentd-kubernetes-daemonset:v1-debian-elasticsearch
        env:
        - name: FLUENT_ELASTICSEARCH_HOST
          value: "elasticsearch.logging.svc.cluster.local"
        - name: FLUENT_ELASTICSEARCH_PORT
          value: "9200"
        volumeMounts:
        - name: varlog
          mountPath: /var/log
        - name: varlibdockercontainers
          mountPath: /var/lib/docker/containers
          readOnly: true
      volumes:
      - name: varlog
        hostPath:
          path: /var/log
      - name: varlibdockercontainers
        hostPath:
          path: /var/lib/docker/containers

# ═══════════════════════════════════════════════════════════
# ✦ High Availability and Backup Strategies
# ═══════════════════════════════════════════════════════════
# Backup - Velero CronJob
apiVersion: velero.io/v1
kind: Schedule
metadata:
  name: daily-backup
  namespace: velero
spec:
  schedule: "0 2 * * *"  # 2 AM daily
  template:
    includedNamespaces:
    - production
    - staging
    excludedResources:
    - events
    - events.events.k8s.io
    storageLocation: default
    ttl: 720h  # 30 days

# Multi-zone Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ha-app
spec:
  replicas: 6
  selector:
    matchLabels:
      app: ha-app
  template:
    metadata:
      labels:
        app: ha-app
    spec:
      affinity:
        # Spread pods across zones
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchLabels:
                  app: ha-app
              topologyKey: topology.kubernetes.io/zone
        # Spread pods across nodes
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 50
            podAffinityTerm:
              labelSelector:
                matchLabels:
                  app: ha-app
              topologyKey: kubernetes.io/hostname
      containers:
      - name: app
        image: ha-app:1.0.0
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi"
            cpu: "1000m"

# GitOps - ArgoCD Application
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: production-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/myorg/k8s-manifests
    targetRevision: main
    path: production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true

# ═══════════════════════════════════════════════════════════
# ✦ Production Operations and Checklist
# ═══════════════════════════════════════════════════════════
# Check RBAC
kubectl auth can-i create pods --as=system:serviceaccount:production:app-sa

# Audit security
kubectl get psp  # Pod Security Policies
kubectl get networkpolicies --all-namespaces

# Check resource usage
kubectl top nodes
kubectl top pods --all-namespaces --sort-by=memory

# View resource quotas
kubectl get resourcequota --all-namespaces
kubectl describe quota production-quota -n production

# Check pod distribution
kubectl get pods -o wide --all-namespaces | grep Running

# View events
kubectl get events --all-namespaces --sort-by='.lastTimestamp'

# Best practices summary:
# 1. Use namespaces for isolation
# 2. Implement RBAC with least privilege
# 3. Enable Pod Security Standards
# 4. Apply NetworkPolicies for micro-segmentation
# 5. Set ResourceQuotas and LimitRanges
# 6. Configure PodDisruptionBudgets
# 7. Implement monitoring and alerting
# 8. Centralize logging
# 9. Use GitOps for deployments
# 10. Regular backups with Velero
# 11. Multi-zone deployment for HA
# 12. Implement proper health checks
# 13. Use secrets management (Vault/AWS Secrets)
# 14. Enable audit logging
# 15. Regular security scanning
# 16. Implement CI/CD pipelines
# 17. Document runbooks
# 18. Practice disaster recovery`
      }
    }
  ]

  // Use ref to access current state in event handler
  const selectedTopicRef = useRef(selectedTopic)
  useEffect(() => {
    selectedTopicRef.current = selectedTopic
  }, [selectedTopic])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedTopicRef.current) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setSelectedTopic(null)
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '95%',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(59, 130, 246, 0.4)'
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
              ☸️ Kubernetes
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

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{
        backgroundColor: 'rgba(59, 130, 246, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(59, 130, 246, 0.3)',
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
          Comprehensive Kubernetes guide covering architecture fundamentals, deployments, services, configuration management,
          persistent storage, auto-scaling, health checks, and production best practices for container orchestration.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedTopic ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedTopic ? (
          // Topic Grid View
          kubernetesTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              style={{
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                padding: '2rem',
                borderRadius: '12px',
                border: '2px solid rgba(59, 130, 246, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'
                e.currentTarget.style.borderColor = topic.color
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 8px 16px ${topic.color}33`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div>
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem'
                }}>
                  {topic.icon}
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: topic.color,
                  margin: '0 0 0.5rem 0'
                }}>
                  {topic.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {topic.description}
                </p>
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                color: topic.color,
                marginTop: '1rem'
              }}>
                Click to explore →
              </div>
            </div>
          ))
        ) : (
          <>
            {/* Topic List */}
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1.5rem'
              }}>
                Kubernetes Topics
              </h3>
              <div style={{
                display: 'grid',
                gap: '1rem'
              }}>
                {kubernetesTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    style={{
                      backgroundColor: selectedTopic?.id === topic.id
                        ? `${topic.color}15`
                        : 'rgba(59, 130, 246, 0.05)',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: selectedTopic?.id === topic.id
                        ? `3px solid ${topic.color}`
                        : '2px solid rgba(59, 130, 246, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedTopic?.id !== topic.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTopic?.id !== topic.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.05)'
                        e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)'
                      }
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>{topic.icon}</span>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '700',
                        color: selectedTopic?.id === topic.id ? topic.color : '#1f2937'
                      }}>
                        {topic.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Topic Content */}
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: selectedTopic.color,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '2rem' }}>{selectedTopic.icon}</span>
                {selectedTopic.name}
              </h3>

              {/* Explanation */}
              <div style={{
                backgroundColor: `${selectedTopic.color}08`,
                padding: '1.5rem',
                borderRadius: '12px',
                border: `2px solid ${selectedTopic.color}33`,
                marginBottom: '1.5rem'
              }}>
                <p style={{
                  fontSize: '1rem',
                  color: '#374151',
                  fontWeight: '500',
                  margin: 0,
                  lineHeight: '1.7',
                  textAlign: 'justify'
                }}>
                  {selectedTopic.content.explanation}
                </p>
              </div>

              {/* Key Points */}
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                border: `2px solid ${selectedTopic.color}33`,
                marginBottom: '1.5rem'
              }}>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: selectedTopic.color,
                  margin: '0 0 1rem 0'
                }}>
                  📌 Key Points
                </h4>
                <div style={{
                  display: 'grid',
                  gap: '0.75rem'
                }}>
                  {selectedTopic.content.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        padding: '0.75rem',
                        backgroundColor: `${selectedTopic.color}08`,
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        color: '#374151',
                        lineHeight: '1.6'
                      }}
                    >
                      <span style={{
                        color: selectedTopic.color,
                        fontWeight: '700',
                        fontSize: '1.2rem',
                        lineHeight: '1'
                      }}>
                        •
                      </span>
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Examples with Dropdowns */}
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                color: selectedTopic.color,
                margin: '0 0 1.5rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: selectedTopic.color
                }} />
                Implementation Details
              </h3>

              {parseCodeSections(selectedTopic.content.codeExample).map((section, index) => {
                const sectionId = `section-${index}`
                const isExpanded = expandedSections[sectionId]

                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      marginBottom: '1rem',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSection(sectionId)}
                      style={{
                        width: '100%',
                        padding: '1rem 1.5rem',
                        backgroundColor: isExpanded ? `${selectedTopic.color}10` : 'white',
                        border: 'none',
                        borderBottom: isExpanded ? '1px solid #e5e7eb' : 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${selectedTopic.color}15`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isExpanded ? `${selectedTopic.color}10` : 'white'
                      }}
                    >
                      <span style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: selectedTopic.color,
                        textAlign: 'left'
                      }}>
                        {section.title}
                      </span>
                      <span style={{
                        fontSize: '1.2rem',
                        color: selectedTopic.color,
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease'
                      }}>
                        ▼
                      </span>
                    </button>

                    {/* Section Content */}
                    {isExpanded && (
                      <div style={{
                        backgroundColor: '#1e293b',
                        padding: '1.5rem',
                        maxHeight: '600px',
                        overflowY: 'auto'
                      }}>
                        <SyntaxHighlighter code={section.code} />
                      </div>
                    )}
                  </div>
                )
              })}

              {/* Expand/Collapse all button */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
                marginTop: '1.5rem'
              }}>
                <button
                  onClick={() => {
                    const allExpanded = {}
                    parseCodeSections(selectedTopic.content.codeExample).forEach((_, index) => {
                      allExpanded[`section-${index}`] = true
                    })
                    setExpandedSections(allExpanded)
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    backgroundColor: selectedTopic.color,
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Expand All
                </button>
                <button
                  onClick={() => setExpandedSections({})}
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.9'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  Collapse All
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Kubernetes
