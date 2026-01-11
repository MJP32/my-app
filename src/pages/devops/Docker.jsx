import { useState, useEffect, useRef } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

// Simple syntax highlighter for Dockerfile and commands
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

    // Dockerfile keywords
    highlighted = highlighted
      .replace(/\b(FROM|RUN|CMD|LABEL|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|ONBUILD|STOPSIGNAL|HEALTHCHECK|SHELL|AS)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(docker|compose|build|run|exec|ps|images|pull|push|tag|rm|rmi|logs|inspect|network|volume|system|prune)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/(\$\w+|\$\{[^}]+\})/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/(--[\w-]+)/g, '<span style="color: #dcdcaa;">$1</span>')

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

function Docker({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
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

  const dockerTopics = [
    {
      id: 1,
      name: 'Docker Basics',
      icon: '📦',
      color: '#3b82f6',
      description: 'Fundamental Docker concepts and commands',
      content: {
        explanation: 'Docker is a platform for developing, shipping, and running applications in containers. Containers package application code with dependencies, ensuring consistency across environments. Lightweight compared to VMs, containers share the host OS kernel while maintaining isolation.',
        keyPoints: [
          'Containers vs Virtual Machines - Containers share OS kernel, VMs include full OS',
          'Docker Images - Read-only templates containing application and dependencies',
          'Docker Containers - Running instances of Docker images',
          'Docker Registry - Repository for storing and distributing images (Docker Hub, ECR, GCR)',
          'Dockerfile - Text file with instructions to build Docker images',
          'Layers - Images built in layers, each instruction creates a new layer'
        ],
        codeExample: `# ═══════════════════════════════════════════════════════════
# ✦ Docker Installation and Verification
# ═══════════════════════════════════════════════════════════
# Install Docker (Ubuntu/Debian)
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Verify installation
docker --version
docker run hello-world

# ═══════════════════════════════════════════════════════════
# ✦ Basic Docker Commands
# ═══════════════════════════════════════════════════════════
# Image management
docker pull nginx:latest              # Download image
docker images                         # List local images
docker rmi nginx:latest              # Remove image

# Container management
docker run -d -p 8080:80 nginx       # Run container in background
docker ps                            # List running containers
docker ps -a                         # List all containers
docker logs <container-id>           # View container logs
docker exec -it <container-id> bash  # Access container shell
docker stop <container-id>           # Stop container
docker rm <container-id>             # Remove container

# ═══════════════════════════════════════════════════════════
# ✦ Container Lifecycle Management
# ═══════════════════════════════════════════════════════════
docker create --name my-nginx nginx  # Create container (not started)
docker start my-nginx                # Start container
docker restart my-nginx              # Restart container
docker pause my-nginx                # Pause container
docker unpause my-nginx              # Unpause container
docker kill my-nginx                 # Force stop container

# Inspect container details
docker inspect my-nginx              # Full container details (JSON)
docker stats my-nginx                # Live resource usage
docker top my-nginx                  # Running processes in container

# ═══════════════════════════════════════════════════════════
# ✦ Advanced Container Operations
# ═══════════════════════════════════════════════════════════
# Copy files between host and container
docker cp /host/file.txt my-nginx:/container/path/
docker cp my-nginx:/container/file.txt /host/path/

# Run container with options
docker run -d \\
  --name my-app \\
  -p 8080:8080 \\                    # Port mapping
  -e SPRING_PROFILES_ACTIVE=prod \\  # Environment variable
  -v /host/data:/app/data \\         # Volume mount
  --memory=512m \\                   # Memory limit
  --cpus=1 \\                        # CPU limit
  --restart=unless-stopped \\        # Restart policy
  my-app:latest

# Cleanup operations
docker container prune               # Remove stopped containers
docker image prune -a                # Remove unused images
docker system prune -a --volumes     # Remove all unused resources`
      }
    },
    {
      id: 2,
      name: 'Dockerfile Best Practices',
      icon: '📝',
      color: '#10b981',
      description: 'Creating optimized and secure Dockerfiles',
      content: {
        explanation: 'A Dockerfile is a script containing instructions to build a Docker image. Following best practices ensures small, secure, and efficient images. Multi-stage builds, layer caching, and proper ordering of instructions significantly impact build time and image size.',
        keyPoints: [
          'Use official base images from trusted sources',
          'Minimize layers by combining RUN commands',
          'Order instructions from least to most frequently changed',
          'Use .dockerignore to exclude unnecessary files',
          'Multi-stage builds to reduce final image size',
          'Run as non-root user for security',
          'Use specific version tags, avoid :latest',
          'Clean up package manager cache in same layer'
        ],
        codeExample: `# ═══════════════════════════════════════════════════════════
# ✦ Bad vs Good Dockerfile Comparison
# ═══════════════════════════════════════════════════════════
# Bad Dockerfile - Multiple issues
FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y openjdk-17-jdk
RUN apt-get install -y maven
COPY . /app
WORKDIR /app
RUN mvn clean package
EXPOSE 8080
CMD ["java", "-jar", "target/app.jar"]

# Good Dockerfile - Multi-stage build with best practices
# Stage 1: Build
FROM maven:3.9.5-eclipse-temurin-17-alpine AS builder
WORKDIR /app

# Copy only pom.xml first for dependency caching
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source code and build
COPY src ./src
RUN mvn clean package -DskipTests && \\
    mv target/*.jar app.jar

# ═══════════════════════════════════════════════════════════
# ✦ Production Runtime Configuration
# ═══════════════════════════════════════════════════════════
# Stage 2: Runtime
FROM eclipse-temurin:17-jre-alpine

# Create non-root user
RUN addgroup -g 1001 appgroup && \\
    adduser -D -u 1001 -G appgroup appuser

WORKDIR /app

# Copy only the built artifact from builder stage
COPY --from=builder --chown=appuser:appgroup /app/app.jar app.jar

# Install curl for healthcheck, clean cache in same layer
RUN apk add --no-cache curl && \\
    rm -rf /var/cache/apk/*

# Switch to non-root user
USER appuser

# Environment variables
ENV JAVA_OPTS="-Xmx512m -Xms256m" \\
    SPRING_PROFILES_ACTIVE=prod

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \\
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Expose port
EXPOSE 8080

# Use exec form for proper signal handling
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

# ═══════════════════════════════════════════════════════════
# ✦ Dockerignore and Build Configuration
# ═══════════════════════════════════════════════════════════
# .dockerignore file
/*
target/
.git/
.gitignore
*.md
.mvn/
.idea/
*.iml
.DS_Store
Dockerfile
docker-compose.yml
!target/*.jar
*/

# Build and tag image
docker build -t my-app:1.0.0 .
docker build -t my-app:1.0.0 -t my-app:latest .

# Build with build arguments
docker build --build-arg VERSION=1.0.0 -t my-app:1.0.0 .

# ═══════════════════════════════════════════════════════════
# ✦ Multi-Platform Builds and Security Scanning
# ═══════════════════════════════════════════════════════════
# Dockerfile with ARG
/*
ARG VERSION=1.0.0
FROM eclipse-temurin:17-jre-alpine
LABEL version="\${VERSION}"
*/

# Multi-platform build (ARM and AMD64)
docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm64 \\
  -t myregistry.com/my-app:1.0.0 --push .

# Scan image for vulnerabilities
docker scan my-app:1.0.0
trivy image my-app:1.0.0`
      }
    },
    {
      id: 3,
      name: 'Docker Compose',
      icon: '🎼',
      color: '#f59e0b',
      description: 'Multi-container application orchestration',
      content: {
        explanation: 'Docker Compose is a tool for defining and running multi-container Docker applications. Using a YAML file, you can configure application services, networks, and volumes. Single command starts all services with proper networking and dependencies.',
        keyPoints: [
          'Define multi-container applications in docker-compose.yml',
          'Automatic network creation between services',
          'Service dependencies with depends_on',
          'Environment variable management',
          'Volume management for data persistence',
          'Scale services with replicas',
          'Override configurations with multiple compose files',
          'Development and production configurations'
        ],
        codeExample: `# ═══════════════════════════════════════════════════════════
# ✦ Docker Compose Service Configuration
# ═══════════════════════════════════════════════════════════
# docker-compose.yml - Full-stack application
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: my-app-db
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: \${DB_PASSWORD:-secret}
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init-db.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app-network

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: my-app-redis
    command: redis-server --requirepass \${REDIS_PASSWORD:-redis123}
    volumes:
      - redis-data:/data
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 3s
      retries: 5
    networks:
      - app-network

  # ═══════════════════════════════════════════════════════════
# ✦ Application Services Configuration
# ═══════════════════════════════════════════════════════════
  # Application Backend
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
      args:
        VERSION: \${APP_VERSION:-1.0.0}
    container_name: my-app-backend
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    environment:
      SPRING_PROFILES_ACTIVE: prod
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/myapp
      SPRING_DATASOURCE_USERNAME: admin
      SPRING_DATASOURCE_PASSWORD: \${DB_PASSWORD:-secret}
      SPRING_REDIS_HOST: redis
      SPRING_REDIS_PASSWORD: \${REDIS_PASSWORD:-redis123}
      JAVA_OPTS: -Xmx512m -Xms256m
    volumes:
      - ./logs:/app/logs
      - ./uploads:/app/uploads
    ports:
      - "8080:8080"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    restart: unless-stopped
    networks:
      - app-network
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # Frontend (React/Angular)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: my-app-frontend
    depends_on:
      - backend
    environment:
      REACT_APP_API_URL: http://backend:8080
    ports:
      - "3000:80"
    networks:
      - app-network
    restart: unless-stopped

  # Nginx Reverse Proxy
  nginx:
    image: nginx:alpine
    container_name: my-app-nginx
    depends_on:
      - frontend
      - backend
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./ssl:/etc/nginx/ssl:ro
    ports:
      - "80:80"
      - "443:443"
    networks:
      - app-network
    restart: unless-stopped

volumes:
  postgres-data:
    driver: local
  redis-data:
    driver: local

networks:
  app-network:
    driver: bridge

# ═══════════════════════════════════════════════════════════
# ✦ Docker Compose Commands
# ═══════════════════════════════════════════════════════════
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend
docker-compose logs -f --tail=100

# Scale service
docker-compose up -d --scale backend=3

# Stop all services
docker-compose stop

# Stop and remove containers, networks
docker-compose down

# Remove volumes as well
docker-compose down -v

# Rebuild and restart
docker-compose up -d --build

# Execute command in service
docker-compose exec backend bash
docker-compose exec postgres psql -U admin -d myapp

# View service status
docker-compose ps

# Validate compose file
docker-compose config

# ═══════════════════════════════════════════════════════════
# ✦ Development Configuration and Environment
# ═══════════════════════════════════════════════════════════
# docker-compose.override.yml (local development)
/*
version: '3.8'
services:
  backend:
    build:
      target: development
    volumes:
      - ./backend/src:/app/src
    environment:
      SPRING_PROFILES_ACTIVE: dev
      SPRING_DEVTOOLS_RESTART_ENABLED: "true"
    ports:
      - "5005:5005"  # Debug port
    command: mvn spring-boot:run -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"

  postgres:
    ports:
      - "5433:5432"  # Different host port for dev
*/

# .env file for environment variables
/*
APP_VERSION=1.0.0
DB_PASSWORD=secure_password_123
REDIS_PASSWORD=redis_secure_123
*/`
      }
    },
    {
      id: 4,
      name: 'Docker Networking',
      icon: '🌐',
      color: '#8b5cf6',
      description: 'Container networking and communication',
      content: {
        explanation: 'Docker networking enables communication between containers and external systems. Different network drivers provide various capabilities: bridge for single-host networking, overlay for multi-host, host for direct host network access, and none for isolation.',
        keyPoints: [
          'Bridge network - Default, isolated network on single host',
          'Host network - Container shares host network stack',
          'Overlay network - Multi-host networking for swarm',
          'Macvlan network - Assign MAC address to container',
          'None network - Completely isolated, no networking',
          'Custom networks for service isolation',
          'DNS resolution between containers using service names',
          'Port publishing for external access'
        ],
        codeExample: `# ═══════════════════════════════════════════════════════════
# ✦ Network Creation and Management
# ═══════════════════════════════════════════════════════════
# List networks
docker network ls

# Inspect network
docker network inspect bridge

# Create custom bridge network
docker network create my-network
docker network create --driver bridge --subnet 172.25.0.0/16 my-custom-network

# Create network with custom DNS
docker network create --driver bridge \\
  --subnet 172.26.0.0/16 \\
  --gateway 172.26.0.1 \\
  --dns 8.8.8.8 \\
  --dns 8.8.4.4 \\
  app-network

# ═══════════════════════════════════════════════════════════
# ✦ Container Communication and DNS
# ═══════════════════════════════════════════════════════════
# Run containers on custom network
docker run -d --name app1 --network my-network nginx
docker run -d --name app2 --network my-network alpine sleep 3600

# Containers can communicate using container names
docker exec app2 ping app1
docker exec app2 wget -O- http://app1:80

# Connect running container to network
docker network connect my-network my-container

# Disconnect from network
docker network disconnect my-network my-container

# ═══════════════════════════════════════════════════════════
# ✦ Port Mapping and Network Drivers
# ═══════════════════════════════════════════════════════════
# Port mapping examples
docker run -d -p 8080:80 nginx              # Map host 8080 to container 80
docker run -d -p 127.0.0.1:8080:80 nginx   # Bind to specific interface
docker run -d -p 8080-8090:8080-8090 app   # Range mapping
docker run -d -P nginx                      # Map all EXPOSE ports randomly

# Host network (container uses host's network directly)
docker run -d --network host nginx
# Access nginx at http://localhost:80 (no port mapping needed)

# None network (isolated, no networking)
docker run -d --network none alpine sleep 3600

# Overlay network for Docker Swarm (multi-host)
docker network create --driver overlay --attachable my-overlay-network

# Create encrypted overlay network
docker network create --driver overlay --opt encrypted my-secure-network

# ═══════════════════════════════════════════════════════════
# ✦ Multi-Container Networking and Troubleshooting
# ═══════════════════════════════════════════════════════════
# Multi-container application networking
# Database container
docker run -d \\
  --name postgres-db \\
  --network app-network \\
  -e POSTGRES_PASSWORD=secret \\
  postgres:15

# Application container connecting to database
docker run -d \\
  --name my-app \\
  --network app-network \\
  -e DB_HOST=postgres-db \\
  -e DB_PORT=5432 \\
  -p 8080:8080 \\
  my-app:latest

# Inspect container network settings
docker inspect my-app | jq '.[0].NetworkSettings'

# View container IP address
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' my-app

# Network troubleshooting
# Run temporary container with networking tools
docker run -it --network my-network nicolaka/netshoot

# Inside netshoot container:
# nslookup app1
# ping app2
# curl http://app1:80
# netstat -tulpn
# tcpdump -i eth0

# Remove network
docker network rm my-network

# Remove all unused networks
docker network prune`
      }
    },
    {
      id: 5,
      name: 'Docker Volumes',
      icon: '💾',
      color: '#ec4899',
      description: 'Data persistence and volume management',
      content: {
        explanation: 'Docker volumes provide persistent storage for containers. Unlike bind mounts that map host directories, volumes are managed by Docker and stored in Docker-managed locations. Volumes persist data across container restarts and can be shared between containers.',
        keyPoints: [
          'Named volumes - Docker-managed storage with friendly names',
          'Bind mounts - Direct mapping to host filesystem paths',
          'Tmpfs mounts - Temporary filesystem in memory',
          'Volume drivers for cloud storage (AWS EBS, Azure Disk)',
          'Data persistence across container lifecycles',
          'Backup and restore volume data',
          'Share volumes between containers',
          'Read-only mounts for security'
        ],
        codeExample: `# ═══════════════════════════════════════════════════════════
# ✦ Volume Creation and Types
# ═══════════════════════════════════════════════════════════
# Create named volume
docker volume create my-data

# List volumes
docker volume ls

# Inspect volume
docker volume inspect my-data

# Use volume in container
docker run -d -v my-data:/app/data nginx
docker run -d --mount source=my-data,target=/app/data nginx

# Anonymous volume (auto-generated name)
docker run -d -v /app/data nginx

# Bind mount (host directory to container)
docker run -d -v /host/path:/container/path nginx
docker run -d -v $(pwd):/app nginx  # Current directory

# Read-only volume
docker run -d -v my-data:/app/data:ro nginx
docker run -d -v /host/path:/container/path:ro nginx

# Tmpfs mount (in-memory, temporary)
docker run -d --tmpfs /app/temp nginx
docker run -d --mount type=tmpfs,destination=/app/temp nginx

# Volume with specific driver
docker volume create --driver local \\
  --opt type=nfs \\
  --opt o=addr=192.168.1.100,rw \\
  --opt device=:/path/to/share \\
  nfs-volume

# ═══════════════════════════════════════════════════════════
# ✦ Volume Sharing and Data Transfer
# ═══════════════════════════════════════════════════════════
# Populate volume with container data
docker run -d -v my-data:/app/data my-app:latest
# First time run, container initializes volume with data

# Share volume between containers
docker run -d --name app1 -v shared-data:/data alpine sleep 3600
docker run -d --name app2 -v shared-data:/data alpine sleep 3600

# Write from app1
docker exec app1 sh -c "echo 'Hello from app1' > /data/message.txt"

# Read from app2
docker exec app2 cat /data/message.txt
# Output: Hello from app1

# Copy data from container to host
docker cp my-container:/app/data ./local-data

# Copy data from host to container
docker cp ./local-data my-container:/app/data

# ═══════════════════════════════════════════════════════════
# ✦ Volume Backup and Restore
# ═══════════════════════════════════════════════════════════
# Backup volume data
docker run --rm -v my-data:/data -v $(pwd):/backup alpine \\
  tar czf /backup/my-data-backup.tar.gz -C /data .

# Restore volume data
docker run --rm -v my-data:/data -v $(pwd):/backup alpine \\
  tar xzf /backup/my-data-backup.tar.gz -C /data

# Volume in docker-compose.yml
/*
services:
  app:
    image: my-app
    volumes:
      - app-data:/app/data          # Named volume
      - ./config:/app/config:ro     # Bind mount (read-only)
      - /var/run/docker.sock:/var/run/docker.sock  # Docker socket
    tmpfs:
      - /app/temp

volumes:
  app-data:
    driver: local
    driver_opts:
      type: none
      o: bind
      device: /mnt/external-storage
*/

# ═══════════════════════════════════════════════════════════
# ✦ Database Persistence and Volume Management
# ═══════════════════════════════════════════════════════════
# Volume for database persistence
docker run -d \\
  --name postgres \\
  -v postgres-data:/var/lib/postgresql/data \\
  -e POSTGRES_PASSWORD=secret \\
  postgres:15

# Database remains intact after container removal
docker rm -f postgres
docker run -d \\
  --name postgres-new \\
  -v postgres-data:/var/lib/postgresql/data \\
  postgres:15
# Previous data still available

# Inspect volume location on host
docker volume inspect my-data | jq '.[0].Mountpoint'
# Usually: /var/lib/docker/volumes/my-data/_data

# Access volume data (as root)
sudo ls -la /var/lib/docker/volumes/my-data/_data

# Remove volume
docker volume rm my-data

# Remove all unused volumes
docker volume prune

# Remove volume even if in use (force)
docker volume rm -f my-data`
      }
    },
    {
      id: 6,
      name: 'Security Best Practices',
      icon: '🔒',
      color: '#ef4444',
      description: 'Container security and hardening',
      content: {
        explanation: 'Container security involves multiple layers: secure base images, minimal privileges, scanning for vulnerabilities, secrets management, and runtime security. Following security best practices prevents common attack vectors and reduces the attack surface.',
        keyPoints: [
          'Use minimal base images (alpine, distroless)',
          'Run containers as non-root user',
          'Scan images for vulnerabilities regularly',
          'Keep base images and dependencies updated',
          'Use Docker Content Trust for image verification',
          'Implement resource limits to prevent DoS',
          'Never store secrets in images or environment variables',
          'Enable read-only root filesystem when possible'
        ],
        codeExample: `# ═══════════════════════════════════════════════════════════
# ✦ Secure Dockerfile Configuration
# ═══════════════════════════════════════════════════════════
# Security-hardened Dockerfile
FROM node:18-alpine AS builder

# Create non-root user
RUN addgroup -g 1001 nodegroup && \\
    adduser -D -u 1001 -G nodegroup nodeuser

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production && \\
    npm cache clean --force

# Copy application code
COPY --chown=nodeuser:nodegroup . .

# Production image
FROM gcr.io/distroless/nodejs18-debian11

# Copy from builder
COPY --from=builder --chown=1001:1001 /app /app

WORKDIR /app

# Use non-root user (numeric for distroless)
USER 1001

# Run as read-only filesystem
# Add writable volume for logs
VOLUME /app/logs

# No shell in distroless - more secure
CMD ["index.js"]

# ═══════════════════════════════════════════════════════════
# ✦ Vulnerability Scanning and Image Signing
# ═══════════════════════════════════════════════════════════
# Scan image for vulnerabilities
docker scan my-app:latest
trivy image my-app:latest
snyk container test my-app:latest

# Docker Content Trust (image signing)
export DOCKER_CONTENT_TRUST=1
docker pull nginx:latest  # Only pulls signed images
docker push myregistry.com/my-app:1.0.0  # Automatically signs

# Security scanning in CI/CD
#!/bin/bash
# Build image
docker build -t my-app:latest .

# Scan for vulnerabilities
trivy image --exit-code 1 --severity HIGH,CRITICAL my-app:latest

if [ $? -eq 0 ]; then
  echo "✅ Security scan passed"
  docker push myregistry.com/my-app:latest
else
  echo "❌ Security vulnerabilities found"
  exit 1
fi

# ═══════════════════════════════════════════════════════════
# ✦ Runtime Security and Resource Limits
# ═══════════════════════════════════════════════════════════
# Run with security options
docker run -d \\
  --name secure-app \\
  --user 1001:1001 \\              # Non-root user
  --read-only \\                   # Read-only root filesystem
  --tmpfs /tmp \\                  # Writable temp directory
  --cap-drop=ALL \\                # Drop all capabilities
  --cap-add=NET_BIND_SERVICE \\   # Add only needed capabilities
  --security-opt=no-new-privileges \\ # Prevent privilege escalation
  --memory=512m \\                 # Memory limit
  --cpus=1 \\                      # CPU limit
  --pids-limit=100 \\              # Process limit
  my-app:latest

# Resource limits to prevent DoS
docker run -d \\
  --memory="512m" \\
  --memory-swap="512m" \\
  --cpus="1" \\
  --pids-limit=100 \\
  --ulimit nofile=1024:1024 \\
  my-app:latest

# Runtime security with AppArmor
docker run --security-opt apparmor=docker-default my-app

# Runtime security with SELinux
docker run --security-opt label=type:svirt_apache_t my-app

# ═══════════════════════════════════════════════════════════
# ✦ Secrets Management and Security Monitoring
# ═══════════════════════════════════════════════════════════
# Secrets management - DO NOT DO THIS
# ❌ docker run -e DB_PASSWORD=secret123 my-app
# ❌ ENV DB_PASSWORD=secret123 in Dockerfile

# ✅ Use Docker Secrets (Swarm)
echo "secret_password" | docker secret create db_password -
docker service create --secret db_password my-app

# ✅ Use external secret management
docker run -d \\
  --name my-app \\
  -e AWS_SECRETS_MANAGER_SECRET_ID=prod/db/password \\
  my-app:latest

# Disable inter-container communication
docker network create --driver bridge --internal isolated-network
docker run -d --network isolated-network my-app

# Docker Bench Security - automated security audit
docker run -it --net host --pid host --userns host --cap-add audit_control \\
  -e DOCKER_CONTENT_TRUST=$DOCKER_CONTENT_TRUST \\
  -v /var/lib:/var/lib \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  -v /etc:/etc --label docker_bench_security \\
  docker/docker-bench-security

# Monitor container activity
docker events --filter 'type=container'
docker logs my-app | grep -i "error\\|warning\\|security"`
      }
    },
    {
      id: 7,
      name: 'Image Optimization',
      icon: '⚡',
      color: '#06b6d4',
      description: 'Reducing image size and build time',
      content: {
        explanation: 'Optimized Docker images reduce storage costs, network transfer time, and deployment speed. Techniques include multi-stage builds, minimal base images, layer caching optimization, and removing unnecessary files. Smaller images also reduce attack surface.',
        keyPoints: [
          'Multi-stage builds to separate build and runtime dependencies',
          'Use Alpine or distroless base images',
          'Combine RUN commands to reduce layers',
          'Order Dockerfile instructions for better caching',
          'Use .dockerignore to exclude unnecessary files',
          'Remove package manager cache in same layer',
          'Copy only necessary files to final stage',
          'Use COPY instead of ADD when not extracting archives'
        ],
        codeExample: `# ═══════════════════════════════════════════════════════════
# ✦ Multi-Stage Build Optimization
# ═══════════════════════════════════════════════════════════
# Unoptimized Dockerfile (1.2 GB)
FROM ubuntu:22.04
RUN apt-get update
RUN apt-get install -y openjdk-17-jdk
RUN apt-get install -y maven
COPY . /app
WORKDIR /app
RUN mvn clean package
EXPOSE 8080
CMD ["java", "-jar", "target/app.jar"]

# Optimized Dockerfile (180 MB)
# Multi-stage build
FROM maven:3.9-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Leverage layer caching - copy pom.xml first
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source and build
COPY src ./src
RUN mvn package -DskipTests && \\
    java -Djarmode=layertools -jar target/*.jar extract

# Runtime stage with minimal base image
FROM eclipse-temurin:17-jre-alpine
RUN apk add --no-cache curl && \\
    rm -rf /var/cache/apk/*

WORKDIR /app

# Copy only necessary layers (Spring Boot layered JAR)
COPY --from=build /app/dependencies/ ./
COPY --from=build /app/spring-boot-loader/ ./
COPY --from=build /app/snapshot-dependencies/ ./
COPY --from=build /app/application/ ./

EXPOSE 8080
ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher"]

# ═══════════════════════════════════════════════════════════
# ✦ Layer Caching and Dockerignore Optimization
# ═══════════════════════════════════════════════════════════
# .dockerignore file (critical for build performance)
.git/
.gitignore
.github/
*.md
README.md
LICENSE
Dockerfile*
docker-compose*.yml
.dockerignore
target/
*.log
.idea/
.vscode/
*.iml
.DS_Store
node_modules/
coverage/
.env*
!.env.production

# Optimize layer caching order
# Bad order (changes frequently early)
COPY . /app
RUN npm install

# Good order (changes least frequently first)
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Combine RUN commands to reduce layers
# Bad (creates 3 layers)
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get clean

# Good (creates 1 layer)
RUN apt-get update && \\
    apt-get install -y --no-install-recommends curl && \\
    apt-get clean && \\
    rm -rf /var/lib/apt/lists/*

# ═══════════════════════════════════════════════════════════
# ✦ Framework-Specific Optimizations
# ═══════════════════════════════════════════════════════════
# Node.js optimization
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && \\
    npm cache clean --force
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json ./
USER node
CMD ["node", "dist/main.js"]

# Static site optimization (Nginx)
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# ═══════════════════════════════════════════════════════════
# ✦ BuildKit and Advanced Caching
# ═══════════════════════════════════════════════════════════
# Analyze image layers
docker history my-app:latest
docker history --no-trunc my-app:latest

# Image size comparison
docker images | grep my-app

# Use dive tool to analyze image
docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock \\
  wagoodman/dive:latest my-app:latest

# BuildKit for better caching (enable)
export DOCKER_BUILDKIT=1
docker build -t my-app:latest .

# Cache mount for dependencies
# syntax=docker/dockerfile:1
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
RUN --mount=type=cache,target=/root/.m2 \\
    mvn dependency:go-offline
COPY src ./src
RUN --mount=type=cache,target=/root/.m2 \\
    mvn package -DskipTests

# Build-time optimization tips:
# 1. Use BuildKit: DOCKER_BUILDKIT=1
# 2. Use --cache-from for CI/CD caching
docker build --cache-from myregistry.com/my-app:latest -t my-app:latest .

# 3. Parallel multi-stage builds
# BuildKit automatically parallelizes independent stages

# 4. Use inline cache for registry
docker build --build-arg BUILDKIT_INLINE_CACHE=1 -t my-app:latest .
docker push my-app:latest

# Size comparison example:
# ubuntu:22.04 - 77 MB
# alpine:3.18 - 7 MB
# distroless/java17 - 180 MB
# eclipse-temurin:17-jre-alpine - 180 MB

# Final optimized image size:
# Before optimization: 1.2 GB
# After multi-stage: 400 MB
# After Alpine base: 180 MB
# After distroless: 120 MB
# Reduction: 90%`
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
              🐳 Docker
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
          Comprehensive Docker guide covering containerization fundamentals, Dockerfile best practices,
          Docker Compose orchestration, networking, volumes, security hardening, and image optimization techniques.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedTopic ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedTopic ? (
          // Topic Grid View
          dockerTopics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              style={{
                backgroundColor: 'rgba(14, 165, 233, 0.05)',
                padding: '2rem',
                borderRadius: '12px',
                border: '2px solid rgba(14, 165, 233, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.1)'
                e.currentTarget.style.borderColor = topic.color
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 8px 16px ${topic.color}33`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.2)'
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
                Docker Topics
              </h3>
              <div style={{
                display: 'grid',
                gap: '1rem'
              }}>
                {dockerTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    style={{
                      backgroundColor: selectedTopic?.id === topic.id
                        ? `${topic.color}15`
                        : 'rgba(14, 165, 233, 0.05)',
                      padding: '1rem',
                      borderRadius: '8px',
                      border: selectedTopic?.id === topic.id
                        ? `3px solid ${topic.color}`
                        : '2px solid rgba(14, 165, 233, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedTopic?.id !== topic.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.1)'
                        e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.4)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTopic?.id !== topic.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(14, 165, 233, 0.05)'
                        e.currentTarget.style.borderColor = 'rgba(14, 165, 233, 0.2)'
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
                    backgroundColor: '#2563eb',
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

export default Docker
