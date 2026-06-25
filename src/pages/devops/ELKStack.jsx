import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Breadcrumb from '../../components/Breadcrumb'
import CollapsibleSidebar from '../../components/CollapsibleSidebar'

// =============================================================================
// COLORS CONFIGURATION
// =============================================================================

const ELK_COLORS = {
  primary: '#00bfb3',
  primaryHover: '#1cd6c8',
  bg: 'rgba(0, 191, 179, 0.1)',
  border: 'rgba(0, 191, 179, 0.3)',
  arrow: '#00bfb3',
  hoverBg: 'rgba(0, 191, 179, 0.2)',
  topicBg: 'rgba(0, 191, 179, 0.2)'
}

const SUBTOPIC_COLORS = [
  { bg: 'rgba(59, 130, 246, 0.15)', border: 'rgba(59, 130, 246, 0.3)' },
  { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)' },
  { bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.3)' },
  { bg: 'rgba(139, 92, 246, 0.15)', border: 'rgba(139, 92, 246, 0.3)' },
  { bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.3)' },
  { bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.3)' },
]

// =============================================================================
// DIAGRAM COMPONENTS
// =============================================================================

// ELK Stack End-to-End Pipeline Diagram
const ELKPipelineDiagram = () => (
  <svg viewBox="0 0 800 180" style={{ width: '100%', maxWidth: '800px', height: 'auto', margin: '1rem 0' }}>
    <defs>
      <marker id="arrowELK" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#00bfb3" />
      </marker>
    </defs>

    <text x="400" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">ELK Stack End-to-End Pipeline</text>

    {/* Beats / Apps */}
    <rect x="20" y="60" width="120" height="65" rx="6" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="2"/>
    <text x="80" y="85" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Beats / Apps</text>
    <text x="80" y="103" textAnchor="middle" fill="#fcd34d" fontSize="8">Filebeat, logs,</text>
    <text x="80" y="116" textAnchor="middle" fill="#fcd34d" fontSize="8">metrics</text>

    {/* Logstash */}
    <rect x="190" y="60" width="120" height="65" rx="6" fill="rgba(139, 92, 246, 0.25)" stroke="#8b5cf6" strokeWidth="2"/>
    <text x="250" y="85" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">Logstash</text>
    <text x="250" y="103" textAnchor="middle" fill="#c4b5fd" fontSize="8">input → filter</text>
    <text x="250" y="116" textAnchor="middle" fill="#c4b5fd" fontSize="8">→ output</text>

    {/* Elasticsearch */}
    <rect x="360" y="60" width="120" height="65" rx="6" fill="rgba(0, 191, 179, 0.25)" stroke="#00bfb3" strokeWidth="2"/>
    <text x="420" y="85" textAnchor="middle" fill="#00bfb3" fontSize="11" fontWeight="bold">Elasticsearch</text>
    <text x="420" y="103" textAnchor="middle" fill="#5eead4" fontSize="8">index + store</text>
    <text x="420" y="116" textAnchor="middle" fill="#5eead4" fontSize="8">search engine</text>

    {/* Kibana */}
    <rect x="530" y="60" width="120" height="65" rx="6" fill="rgba(236, 72, 153, 0.25)" stroke="#ec4899" strokeWidth="2"/>
    <text x="590" y="85" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="bold">Kibana</text>
    <text x="590" y="103" textAnchor="middle" fill="#f9a8d4" fontSize="8">visualize +</text>
    <text x="590" y="116" textAnchor="middle" fill="#f9a8d4" fontSize="8">dashboards</text>

    {/* Users */}
    <rect x="680" y="65" width="100" height="55" rx="6" fill="rgba(34, 197, 94, 0.25)" stroke="#22c55e" strokeWidth="2"/>
    <text x="730" y="90" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Users</text>
    <text x="730" y="107" textAnchor="middle" fill="#86efac" fontSize="8">Explore data</text>

    {/* Arrows */}
    <line x1="140" y1="92" x2="186" y2="92" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowELK)"/>
    <line x1="310" y1="92" x2="356" y2="92" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowELK)"/>
    <line x1="480" y1="92" x2="526" y2="92" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowELK)"/>
    <line x1="650" y1="92" x2="676" y2="92" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowELK)"/>
  </svg>
)

// Elasticsearch Shards & Replicas Diagram
const ShardsDiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: '100%', maxWidth: '700px', height: 'auto', margin: '1rem 0' }}>
    <text x="350" y="20" textAnchor="middle" fill="#94a3b8" fontSize="14" fontWeight="bold">Index: Shards &amp; Replicas Across Nodes</text>

    {/* Node 1 */}
    <rect x="40" y="50" width="180" height="130" rx="8" fill="rgba(15, 23, 42, 0.8)" stroke="#475569" strokeWidth="1.5"/>
    <text x="130" y="72" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Node 1</text>
    <rect x="60" y="85" width="60" height="40" rx="4" fill="rgba(0, 191, 179, 0.3)" stroke="#00bfb3" strokeWidth="1.5"/>
    <text x="90" y="109" textAnchor="middle" fill="#00bfb3" fontSize="9">P0</text>
    <rect x="140" y="135" width="60" height="40" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3"/>
    <text x="170" y="159" textAnchor="middle" fill="#60a5fa" fontSize="9">R1</text>

    {/* Node 2 */}
    <rect x="260" y="50" width="180" height="130" rx="8" fill="rgba(15, 23, 42, 0.8)" stroke="#475569" strokeWidth="1.5"/>
    <text x="350" y="72" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Node 2</text>
    <rect x="280" y="85" width="60" height="40" rx="4" fill="rgba(0, 191, 179, 0.3)" stroke="#00bfb3" strokeWidth="1.5"/>
    <text x="310" y="109" textAnchor="middle" fill="#00bfb3" fontSize="9">P1</text>
    <rect x="360" y="135" width="60" height="40" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3"/>
    <text x="390" y="159" textAnchor="middle" fill="#60a5fa" fontSize="9">R2</text>

    {/* Node 3 */}
    <rect x="480" y="50" width="180" height="130" rx="8" fill="rgba(15, 23, 42, 0.8)" stroke="#475569" strokeWidth="1.5"/>
    <text x="570" y="72" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">Node 3</text>
    <rect x="500" y="85" width="60" height="40" rx="4" fill="rgba(0, 191, 179, 0.3)" stroke="#00bfb3" strokeWidth="1.5"/>
    <text x="530" y="109" textAnchor="middle" fill="#00bfb3" fontSize="9">P2</text>
    <rect x="580" y="135" width="60" height="40" rx="4" fill="rgba(59, 130, 246, 0.2)" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3"/>
    <text x="610" y="159" textAnchor="middle" fill="#60a5fa" fontSize="9">R0</text>

    <text x="350" y="195" textAnchor="middle" fill="#64748b" fontSize="9">P = Primary shard (solid)   R = Replica shard (dashed) — replicas live on different nodes for HA</text>
  </svg>
)

// =============================================================================
// MAIN COMPONENT
// =============================================================================

function ELKStack({ onBack, onPrevious, onNext, previousName, nextName, breadcrumb }) {
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(null)
  const [selectedDetailIndex, setSelectedDetailIndex] = useState(0)

  // =============================================================================
  // CONCEPTS DATA
  // =============================================================================

  const concepts = [
    {
      id: 'elasticsearch',
      name: 'Elasticsearch',
      icon: '🔍',
      color: '#00bfb3',
      description: 'Distributed search & analytics engine built on Lucene. Inverted index, documents/indices, shards & replicas, REST API, Query DSL (match/term/bool), and aggregations.',
      diagram: ShardsDiagram,
      details: [
        {
          name: 'Documents, Indices & Inverted Index',
          diagram: ShardsDiagram,
          explanation: 'Elasticsearch is a distributed, RESTful search and analytics engine built on Apache Lucene. Data is stored as JSON documents, grouped into indices. Each index is split into shards (primary + replica) distributed across nodes for horizontal scaling and high availability. The core data structure is the inverted index, which maps each unique term to the list of documents containing it — this is what makes full-text search fast. A mapping defines how fields are indexed: text fields are analyzed (tokenized, lowercased) for full-text search, while keyword fields are stored exactly for filtering, sorting, and aggregations.',
          codeExample: `# Create an index with explicit mapping, shards & replicas
PUT /logs-app
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 1
  },
  "mappings": {
    "properties": {
      "@timestamp": { "type": "date" },
      "level":      { "type": "keyword" },
      "service":    { "type": "keyword" },
      "message":    { "type": "text" },
      "status":     { "type": "integer" },
      "client_ip":  { "type": "ip" }
    }
  }
}

# Index (create) a single document
POST /logs-app/_doc
{
  "@timestamp": "2024-01-15T10:30:00Z",
  "level": "ERROR",
  "service": "checkout",
  "message": "Payment gateway timeout",
  "status": 504,
  "client_ip": "203.0.113.42"
}

# Get a document by id, and check cluster/index health
GET /logs-app/_doc/AbC123
GET /_cat/indices/logs-app?v
GET /_cluster/health?pretty`
        },
        {
          name: 'Query DSL: match, term & bool',
          explanation: 'The Query DSL is a JSON-based language for expressing searches. A match query is a full-text query that analyzes the input and is used on text fields. A term query looks for an exact, non-analyzed value and should target keyword, numeric, or date fields. The bool query combines clauses: must (AND, contributes to score), should (OR, boosts score), filter (AND but cached, no scoring — ideal for exact matches and ranges), and must_not (NOT). Using filter clauses for non-scoring conditions is faster because results are cached and relevance scoring is skipped.',
          codeExample: `# Full-text match query (analyzed) on a text field
GET /logs-app/_search
{
  "query": {
    "match": { "message": "payment timeout" }
  }
}

# Exact term query on a keyword field
GET /logs-app/_search
{
  "query": {
    "term": { "level": "ERROR" }
  }
}

# Compound bool query: must + filter + must_not
GET /logs-app/_search
{
  "query": {
    "bool": {
      "must":   [ { "match": { "message": "timeout" } } ],
      "filter": [
        { "term":  { "service": "checkout" } },
        { "range": { "@timestamp": { "gte": "now-1h" } } }
      ],
      "must_not": [ { "term": { "status": 200 } } ],
      "should":   [ { "term": { "level": "ERROR" } } ]
    }
  },
  "size": 20,
  "sort": [ { "@timestamp": "desc" } ]
}`
        },
        {
          name: 'Aggregations & Analytics',
          explanation: 'Aggregations turn Elasticsearch into a real-time analytics engine. Bucket aggregations group documents (e.g. terms buckets by a field, date_histogram buckets over time, range buckets). Metric aggregations compute values over documents (avg, sum, min, max, cardinality for unique counts, percentiles for latency). Aggregations can be nested — a sub-aggregation runs within each bucket of its parent — enabling queries like "for each service, the error rate per hour". Set "size": 0 to skip returning hits and only compute aggregation results efficiently.',
          codeExample: `# Errors over time per service (nested aggregations)
GET /logs-app/_search
{
  "size": 0,
  "query": {
    "range": { "@timestamp": { "gte": "now-24h" } }
  },
  "aggs": {
    "by_service": {
      "terms": { "field": "service", "size": 10 },
      "aggs": {
        "errors_over_time": {
          "date_histogram": {
            "field": "@timestamp",
            "fixed_interval": "1h"
          },
          "aggs": {
            "avg_status": { "avg": { "field": "status" } },
            "p95_status": {
              "percentiles": { "field": "status", "percents": [95] }
            }
          }
        },
        "unique_clients": {
          "cardinality": { "field": "client_ip" }
        }
      }
    }
  }
}`
        }
      ]
    },
    {
      id: 'logstash',
      name: 'Logstash',
      icon: '🔀',
      color: '#8b5cf6',
      description: 'Server-side data processing pipeline. Ingest from many sources (input), transform and enrich (filter with grok, mutate, date), then ship to destinations (output).',
      details: [
        {
          name: 'Pipeline: input → filter → output',
          explanation: 'Logstash is a server-side data processing pipeline that ingests data from many sources, transforms it, and sends it to a destination (a "stash" such as Elasticsearch). Every pipeline has three stages. Inputs consume events from sources like Beats, files, Kafka, syslog, or TCP/HTTP. Filters parse and transform events in flight (parse unstructured text, enrich, drop, mutate). Outputs route processed events to one or more destinations. Inputs and outputs support codecs (e.g. json, multiline) to encode/decode data. Multiple pipelines can be defined in pipelines.yml for isolation and independent scaling.',
          codeExample: `# logstash.conf — full pipeline
input {
  # Receive events from Beats (Filebeat/Metricbeat)
  beats {
    port => 5044
  }
}

filter {
  # filters go here (see grok / mutate / date examples)
}

output {
  elasticsearch {
    hosts => ["http://elasticsearch:9200"]
    index => "logs-%{[service]}-%{+YYYY.MM.dd}"
    user  => "elastic"
    password => "\${ES_PASSWORD}"
  }
  # Send failed events to a dead-letter file for debugging
  if "_grokparsefailure" in [tags] {
    file { path => "/var/log/logstash/failed-%{+YYYY.MM.dd}.log" }
  }
}`
        },
        {
          name: 'Grok Parsing',
          explanation: 'Grok is the most powerful Logstash filter for turning unstructured log lines into structured fields. It works by matching text against named regex patterns of the form %{SYNTAX:field}, where SYNTAX is a predefined pattern (e.g. IP, NUMBER, WORD, TIMESTAMP_ISO8601, GREEDYDATA) and field is the name to assign the captured value to. Logstash ships with ~120 built-in patterns, and you can define custom ones. When a grok pattern fails to match, Logstash tags the event with _grokparsefailure so you can route and inspect malformed events. The Grok Debugger in Kibana Dev Tools helps build patterns interactively.',
          codeExample: `filter {
  # Parse an Apache-style access log line into fields
  grok {
    match => {
      "message" => "%{IPORHOST:client_ip} %{USER:ident} %{USER:auth} \\\\[%{HTTPDATE:timestamp}\\\\] \\"%{WORD:verb} %{DATA:request} HTTP/%{NUMBER:httpversion}\\" %{NUMBER:response:int} %{NUMBER:bytes:int}"
    }
  }

  # Parse a custom app log: "2024-01-15 ERROR [checkout] message text"
  grok {
    match => {
      "message" => "%{TIMESTAMP_ISO8601:logtime} %{LOGLEVEL:level} \\\\[%{WORD:service}\\\\] %{GREEDYDATA:msg}"
    }
    tag_on_failure => ["_app_grok_failure"]
  }
}`
        },
        {
          name: 'mutate & date Filters',
          explanation: 'After grok extracts fields, mutate cleans them up: rename, remove, convert types (e.g. string to integer), lowercase/uppercase, gsub for regex replacement, and add/remove tags or fields. The date filter parses a textual timestamp field and assigns it to @timestamp, the canonical event time Elasticsearch and Kibana use for time-based queries — without it, events default to ingest time. Other common filters include geoip (enrich an IP with location), useragent (parse browser strings), and json (parse a JSON-encoded field). Filters run top to bottom, so order matters.',
          codeExample: `filter {
  # Convert types and tidy fields produced by grok
  mutate {
    convert => {
      "response" => "integer"
      "bytes"    => "integer"
    }
    lowercase    => [ "level" ]
    remove_field => [ "message", "ident", "auth" ]
    add_field    => { "pipeline" => "access-logs" }
  }

  # Set @timestamp from the parsed log time (so Kibana uses event time)
  date {
    match  => [ "logtime", "ISO8601", "yyyy-MM-dd HH:mm:ss" ]
    target => "@timestamp"
    timezone => "UTC"
  }

  # Enrich the client IP with geographic data
  geoip {
    source => "client_ip"
  }
}`
        }
      ]
    },
    {
      id: 'kibana',
      name: 'Kibana',
      icon: '📊',
      color: '#ec4899',
      description: 'Visualization & exploration UI for Elasticsearch. Discover with KQL, visualizations & dashboards, data views (index patterns), and the Dev Tools console.',
      details: [
        {
          name: 'Discover, Data Views & KQL',
          explanation: 'Kibana is the visualization and management front end for the Elastic Stack. Before exploring data you create a data view (formerly "index pattern"), e.g. logs-* , which tells Kibana which indices to query and which field is the time field. Discover lets you interactively search and filter raw documents over a time range, inspect fields, and save searches. The default query language is KQL (Kibana Query Language) — a simple syntax supporting field:value matches, free-text search, wildcards, ranges, and boolean operators (and / or / not). KQL is easier than the raw Query DSL but compiles down to it.',
          codeExample: `// KQL query examples (typed in the Discover search bar)

// Exact field match
level: "ERROR"

// Boolean combination with grouping
service: "checkout" and (level: "ERROR" or status >= 500)

// Free-text search across analyzed fields
message: "payment timeout"

// Wildcards and existence checks
client_ip: 203.0.113.* and not status: 200
response_time: > 1000        // numeric range
service: *                   // field exists

// Nested field and multiple values
user.role: ("admin" or "operator")`
        },
        {
          name: 'Visualizations & Dashboards',
          explanation: 'Kibana turns aggregations into visuals. Lens is the drag-and-drop builder for charts (line, area, bar, pie, metric, data table, heat map) that auto-suggests the best chart type. TSVB and the Vega editor handle advanced time-series and fully custom visualizations. Maps visualize geo data. Individual visualizations and saved searches are arranged into Dashboards — interactive, filterable boards that share a global time picker and can be filtered by clicking elements (drill-down). Dashboards support controls (dropdown filters) and can be shared via link, embedded as an iframe, or exported. Saved objects (data views, visualizations, dashboards) can be exported/imported as NDJSON for version control.',
          codeExample: `// Dashboard composition (conceptual)
Dashboard: "Application Health"
  ├─ Lens: Error count over time      (date_histogram + count)
  ├─ Lens: Requests by service        (terms agg on service)
  ├─ Metric: P95 latency (last 15m)   (percentiles agg)
  ├─ Data table: Top 10 slow endpoints
  └─ Controls: [ service ▾ ] [ environment ▾ ]
  Global time range: Last 24 hours  •  Auto-refresh: 30s

// Export saved objects for version control (NDJSON)
POST /api/saved_objects/_export
{
  "type": ["dashboard", "visualization", "index-pattern"],
  "includeReferencesDeep": true
}

// Import them into another Kibana instance
POST /api/saved_objects/_import?overwrite=true
// (multipart upload of the exported .ndjson file)`
        },
        {
          name: 'Dev Tools Console',
          explanation: 'The Dev Tools Console is an interactive REST client built into Kibana for talking directly to Elasticsearch. It provides autocomplete for endpoints and request bodies, lets you run queries against the cluster without curl, and can copy any request as a curl command. It is the fastest way to test mappings, run Query DSL searches, inspect cluster state, and debug aggregations. Dev Tools also includes a Grok Debugger (to build and test Logstash grok patterns), a Painless Lab (for testing Painless scripts), and a Search Profiler (to analyze query performance and find slow query components).',
          codeExample: `# Dev Tools Console snippets (run directly against the cluster)

# Cluster & node overview
GET /_cluster/health
GET /_cat/nodes?v&h=name,node.role,heap.percent,cpu

# Inspect an index mapping and run a quick search
GET /logs-app/_mapping
GET /logs-app/_search
{
  "query": { "term": { "level": "ERROR" } },
  "size": 5
}

# Analyze how text is tokenized by an analyzer
POST /logs-app/_analyze
{
  "field": "message",
  "text": "Payment gateway TIMEOUT 504"
}

# Profile a query to find slow components
GET /logs-app/_search
{
  "profile": true,
  "query": { "match": { "message": "timeout" } }
}`
        }
      ]
    },
    {
      id: 'beats',
      name: 'Beats',
      icon: '📡',
      color: '#f59e0b',
      description: 'Lightweight, single-purpose data shippers installed on edge hosts. Filebeat (logs), Metricbeat (metrics), Packetbeat (network), and more — shipping to Logstash or Elasticsearch.',
      details: [
        {
          name: 'Filebeat — Log Shipping',
          explanation: 'Beats are lightweight, single-purpose data shippers written in Go that you install as agents on your servers. Filebeat is the most common: it tails log files and forwards lines to Logstash or directly to Elasticsearch. It is resource-friendly and reliable — it tracks its read position in a registry file so it resumes after restarts without losing or duplicating data, and it applies backpressure if the downstream is slow. Inputs define which files to harvest; multiline settings stitch together stack traces; and processors can drop or enrich events at the edge before shipping.',
          codeExample: `# filebeat.yml — ship app logs to Logstash
filebeat.inputs:
  - type: filestream
    id: app-logs
    enabled: true
    paths:
      - /var/log/app/*.log
    # Combine multi-line Java stack traces into one event
    parsers:
      - multiline:
          pattern: '^[[:space:]]'
          negate: false
          match: after
    fields:
      service: checkout
      env: production
    fields_under_root: true

# Drop noisy debug lines at the edge
processors:
  - drop_event:
      when:
        contains:
          message: "DEBUG"

# Send to Logstash (use either output.logstash OR output.elasticsearch)
output.logstash:
  hosts: ["logstash:5044"]`
        },
        {
          name: 'Metricbeat, Packetbeat & the Beats family',
          explanation: 'Beyond Filebeat there is a family of Beats. Metricbeat collects system and service metrics (CPU, memory, disk, network) and has modules for many systems (Docker, Kubernetes, Nginx, MySQL, Redis). Packetbeat sniffs network traffic and decodes application protocols (HTTP, DNS, MySQL) for latency and transaction analysis. Heartbeat does uptime/availability monitoring via active probes. Auditbeat tracks audit framework and file-integrity data. Winlogbeat ships Windows event logs. Functionbeat runs serverless. In modern deployments, the Elastic Agent (managed by Fleet) unifies many of these into a single agent with integrations.',
          codeExample: `# metricbeat.yml — collect system + docker metrics
metricbeat.modules:
  - module: system
    metricsets: [ "cpu", "memory", "network", "filesystem" ]
    period: 10s
    processes: [".*"]

  - module: docker
    metricsets: [ "container", "cpu", "memory", "network" ]
    hosts: ["unix:///var/run/docker.sock"]
    period: 10s

# Ship metrics directly to Elasticsearch
output.elasticsearch:
  hosts: ["http://elasticsearch:9200"]
  username: "elastic"
  password: "\${ES_PASSWORD}"

setup.kibana:
  host: "kibana:5601"`
        },
        {
          name: 'Modules & the Beats → ELK Flow',
          explanation: 'Beats ship with modules — prebuilt configurations for common data sources (nginx, apache, system, mysql, kafka, aws). Enabling a module (e.g. filebeat modules enable nginx) automatically configures the correct file paths, ingest pipelines for parsing, and ready-made Kibana dashboards, so you get structured data and visualizations out of the box. For the data flow, Beats can ship directly to Elasticsearch (simplest, using Elasticsearch ingest pipelines for any parsing) or to Logstash first (when you need heavier transformation, buffering, or fan-out to multiple destinations). Choose direct-to-ES for light parsing, and route through Logstash when transformations are complex.',
          codeExample: `# Enable a prebuilt module (auto-config + dashboards)
filebeat modules enable nginx system

# modules.d/nginx.yml — point a module at its logs
- module: nginx
  access:
    enabled: true
    var.paths: ["/var/log/nginx/access.log*"]
  error:
    enabled: true
    var.paths: ["/var/log/nginx/error.log*"]

# Load index template + Kibana dashboards once
filebeat setup --dashboards

# Decision: ship directly to ES (light parsing via ingest pipeline)...
output.elasticsearch:
  hosts: ["http://elasticsearch:9200"]
  pipeline: "nginx-access"

# ...or to Logstash when transformations are heavy:
# output.logstash:
#   hosts: ["logstash:5044"]`
        }
      ]
    },
    {
      id: 'architecture',
      name: 'Architecture & Pipeline',
      icon: '🏗️',
      color: '#22c55e',
      description: 'End-to-end flow, Logstash vs ingest pipelines, ELK vs EFK, scaling clusters with master/data/ingest node roles, hot-warm-cold tiers, and Index Lifecycle Management (ILM).',
      diagram: ELKPipelineDiagram,
      details: [
        {
          name: 'End-to-End Flow & Logstash vs Ingest Pipelines',
          diagram: ELKPipelineDiagram,
          explanation: 'The canonical flow is: Beats/applications collect data → (optional) Logstash transforms and buffers it → Elasticsearch indexes and stores it → Kibana visualizes and explores it. A key design choice is where to do parsing. Elasticsearch Ingest Pipelines run lightweight transformations (grok, set, rename, geoip processors) inside Elasticsearch ingest nodes, letting Beats ship directly to ES with no Logstash hop — simpler and cheaper for moderate parsing. Logstash is preferred when you need heavy/complex transformation, persistent queues for buffering during outages, aggregation across events, enrichment from external sources, or fan-out to multiple outputs (e.g. ES + S3 + Kafka). Many teams use both: Beats → Logstash for complex sources, Beats → Ingest Pipeline for simple ones. A common alternative is EFK, which swaps Logstash/Beats for Fluentd or Fluent Bit — popular in Kubernetes where Fluent Bit runs as a tiny per-node DaemonSet.',
          codeExample: `# Elasticsearch Ingest Pipeline (parsing inside ES, no Logstash)
PUT /_ingest/pipeline/app-logs
{
  "description": "Parse app log lines",
  "processors": [
    { "grok": {
        "field": "message",
        "patterns": ["%{TIMESTAMP_ISO8601:logtime} %{LOGLEVEL:level} \\\\[%{WORD:service}\\\\] %{GREEDYDATA:msg}"]
    }},
    { "date":   { "field": "logtime", "formats": ["ISO8601"], "target_field": "@timestamp" } },
    { "lowercase": { "field": "level" } },
    { "remove": { "field": ["message", "logtime"] } }
  ]
}

# Tell Beats / an index to run docs through that pipeline
PUT /logs-app/_settings
{ "index.default_pipeline": "app-logs" }

# ELK vs EFK
# ELK  = Elasticsearch + Logstash + Kibana (+ Beats shippers)
# EFK  = Elasticsearch + Fluentd/Fluent Bit + Kibana (common on Kubernetes)`
        },
        {
          name: 'Scaling Clusters: Node Roles & Hot-Warm-Cold',
          explanation: 'Elasticsearch scales horizontally by adding nodes and assigning roles. Master-eligible nodes manage cluster state (creating indices, allocating shards) — run a dedicated, odd number (typically 3) to avoid split-brain and ensure a stable quorum. Data nodes hold shards and handle indexing/search; they do the heavy lifting and need CPU, RAM, and fast disk. Ingest nodes run ingest pipelines. Coordinating nodes route requests and gather results. For time-series data, the hot-warm-cold-frozen architecture uses tiered data nodes: hot tier on fast SSDs handles active indexing and recent queries; warm tier on cheaper disks holds older, read-only indices; cold/frozen tiers store rarely-accessed data even more cheaply (frozen can be backed by object storage). Shard allocation awareness and node attributes steer indices to the right tier.',
          codeExample: `# elasticsearch.yml — a dedicated data node on the "hot" tier
cluster.name: prod-logging
node.name: es-data-hot-1
node.roles: [ data_hot, data_content ]
node.attr.data: hot
network.host: 0.0.0.0

# A dedicated master-eligible node (run 3 of these)
# node.roles: [ master ]

# Bootstrap the cluster's initial masters & discovery
discovery.seed_hosts: [ "es-master-1", "es-master-2", "es-master-3" ]
cluster.initial_master_nodes: [ "es-master-1", "es-master-2", "es-master-3" ]

# Tiers available: data_hot, data_warm, data_cold, data_frozen
# Roles: master, data, ingest, ml, transform, remote_cluster_client`
        },
        {
          name: 'Index Lifecycle Management (ILM) & Deployment',
          explanation: 'Index Lifecycle Management (ILM) automates the life of time-series indices through four phases: hot (actively written and queried — rollover to a new index when it reaches a size/age/doc count), warm (move to warm nodes, force-merge segments, shrink/reduce replicas), cold (move to cheap storage, possibly searchable snapshots), and delete (remove after a retention period). ILM works with rollover and index aliases plus index templates so new indices inherit settings automatically. This caps index size, controls cost, and enforces retention without manual intervention. The whole stack is commonly deployed via Docker Compose for development or Kubernetes (ECK — the Elastic Cloud on Kubernetes operator, or Helm charts) for production, with security (TLS + authentication) enabled.',
          codeExample: `# ILM policy: roll over daily/50GB, warm at 7d, delete at 30d
PUT /_ilm/policy/logs-policy
{
  "policy": {
    "phases": {
      "hot": {
        "actions": {
          "rollover": { "max_size": "50gb", "max_age": "1d" }
        }
      },
      "warm": {
        "min_age": "7d",
        "actions": {
          "forcemerge": { "max_num_segments": 1 },
          "set_priority": { "priority": 50 },
          "allocate": { "require": { "data": "warm" } }
        }
      },
      "delete": {
        "min_age": "30d",
        "actions": { "delete": {} }
      }
    }
  }
}

# docker-compose.yml — minimal single-node ELK stack
version: "3.8"
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.13.0
    environment:
      - discovery.type=single-node
      - ES_JAVA_OPTS=-Xms1g -Xmx1g
      - ELASTIC_PASSWORD=\${ES_PASSWORD}
    ports: [ "9200:9200" ]
    volumes: [ "esdata:/usr/share/elasticsearch/data" ]

  logstash:
    image: docker.elastic.co/logstash/logstash:8.13.0
    ports: [ "5044:5044" ]
    volumes: [ "./pipeline:/usr/share/logstash/pipeline" ]
    depends_on: [ elasticsearch ]

  kibana:
    image: docker.elastic.co/kibana/kibana:8.13.0
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    ports: [ "5601:5601" ]
    depends_on: [ elasticsearch ]

volumes:
  esdata:`
        }
      ]
    }
  ]

  // =============================================================================
  // NAVIGATION HANDLERS
  // =============================================================================

  const selectedConcept = selectedConceptIndex !== null ? concepts[selectedConceptIndex] : null

  const handlePreviousConcept = () => {
    if (selectedConceptIndex > 0) {
      setSelectedConceptIndex(selectedConceptIndex - 1)
      setSelectedDetailIndex(0)
    }
  }

  const handleNextConcept = () => {
    if (selectedConceptIndex < concepts.length - 1) {
      setSelectedConceptIndex(selectedConceptIndex + 1)
      setSelectedDetailIndex(0)
    }
  }

  // =============================================================================
  // BREADCRUMB CONFIGURATION
  // =============================================================================

  const buildBreadcrumbStack = () => {
    const stack = [
      { name: 'DevOps', icon: '🛠️', onClick: onBack }
    ]

    if (selectedConcept) {
      stack.push({ name: 'ELK Stack', icon: '🔍', onClick: () => { setSelectedConceptIndex(null); setSelectedDetailIndex(0) } })
      stack.push({ name: selectedConcept.name, icon: selectedConcept.icon })
    } else {
      stack.push({ name: 'ELK Stack', icon: '🔍' })
    }

    return stack
  }

  const handleBreadcrumbClick = (index) => {
    const stack = buildBreadcrumbStack()
    if (stack[index].onClick) {
      stack[index].onClick()
    }
  }

  // =============================================================================
  // KEYBOARD NAVIGATION
  // =============================================================================

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        if (selectedConceptIndex !== null) {
          setSelectedConceptIndex(null)
          setSelectedDetailIndex(0)
        } else {
          onBack()
        }
      } else if (e.key === 'ArrowLeft' && selectedConceptIndex !== null) {
        e.preventDefault()
        handlePreviousConcept()
      } else if (e.key === 'ArrowRight' && selectedConceptIndex !== null) {
        e.preventDefault()
        handleNextConcept()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedConceptIndex, onBack])

  // =============================================================================
  // STYLES
  // =============================================================================

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #064e4a 50%, #0f172a 100%)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }

  const headerStyle = {
    maxWidth: '1400px',
    margin: '0 auto 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  }

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #1cd6c8, #00bfb3)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  }

  const backButtonStyle = {
    padding: '0.75rem 1.5rem',
    background: 'rgba(0, 191, 179, 0.2)',
    border: '1px solid rgba(0, 191, 179, 0.3)',
    borderRadius: '0.5rem',
    color: '#00bfb3',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.2s'
  }

  const navButtonStyle = {
    padding: '0.75rem 1.25rem',
    background: 'rgba(16, 185, 129, 0.2)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
    borderRadius: '0.5rem',
    color: '#4ade80',
    cursor: 'pointer',
    fontSize: '0.95rem',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  }

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            style={backButtonStyle}
            onClick={onBack}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(0, 191, 179, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(0, 191, 179, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            ← Back to DevOps
          </button>
          <h1 style={titleStyle}>ELK Stack</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {onPrevious && (
            <button
              style={navButtonStyle}
              onClick={onPrevious}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              ← {previousName}
            </button>
          )}
          {onNext && (
            <button
              style={navButtonStyle}
              onClick={onNext}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto 2rem' }}>
        <Breadcrumb
          breadcrumbStack={buildBreadcrumbStack()}
          onBreadcrumbClick={handleBreadcrumbClick}
          onMainMenu={breadcrumb?.onMainMenu || onBack}
          colors={ELK_COLORS}
        />
      </div>

      {/* Collapsible Sidebar for quick concept navigation */}
      <CollapsibleSidebar
        items={concepts}
        selectedIndex={selectedConceptIndex ?? -1}
        onSelect={(index) => {
          setSelectedConceptIndex(index)
          setSelectedDetailIndex(0)
        }}
        title="Concepts"
        getItemLabel={(item) => item.name}
        getItemIcon={(item) => item.icon}
        primaryColor={ELK_COLORS.primary}
      />


      {/* Concept Cards Grid */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '1.5rem'
      }}>
        {concepts.map((concept, index) => (
          <div
            key={concept.id}
            onClick={() => setSelectedConceptIndex(index)}
            style={{
              background: 'rgba(15, 23, 42, 0.8)',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: `1px solid ${concept.color}40`,
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 20px 40px ${concept.color}20`
              e.currentTarget.style.borderColor = concept.color
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = `${concept.color}40`
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{concept.icon}</span>
              <h3 style={{ color: concept.color, margin: 0, fontSize: '1.25rem' }}>{concept.name}</h3>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{concept.description}</p>
            <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
              {concept.details.length} topics • Click to explore
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Selected Concept */}
      {selectedConcept && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '2rem'
          }}
          onClick={() => setSelectedConceptIndex(null)}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #1e293b, #0f172a)',
              borderRadius: '1rem',
              padding: '2rem',
              width: '95vw', maxWidth: '1400px', height: '90vh',
              overflow: 'auto',
              border: `1px solid ${selectedConcept.color}40`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Breadcrumb */}
            <Breadcrumb
              breadcrumbStack={buildBreadcrumbStack()}
              onBreadcrumbClick={handleBreadcrumbClick}
              onMainMenu={breadcrumb?.onMainMenu || onBack}
              colors={ELK_COLORS}
            />

            {/* Modal Header with Navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #334155'
            }}>
              <h2 style={{
                color: selectedConcept.color,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1.25rem'
              }}>
                <span>{selectedConcept.icon}</span>
                {selectedConcept.name}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button
                  onClick={handlePreviousConcept}
                  disabled={selectedConceptIndex === 0}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === 0 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === 0 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >←</button>
                <span style={{ color: '#64748b', fontSize: '0.75rem', padding: '0 0.5rem' }}>
                  {selectedConceptIndex + 1}/{concepts.length}
                </span>
                <button
                  onClick={handleNextConcept}
                  disabled={selectedConceptIndex === concepts.length - 1}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(100, 116, 139, 0.2)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '0.375rem',
                    color: selectedConceptIndex === concepts.length - 1 ? '#475569' : '#94a3b8',
                    cursor: selectedConceptIndex === concepts.length - 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.8rem'
                  }}
                >→</button>
                <button
                  onClick={() => setSelectedConceptIndex(null)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '0.375rem',
                    color: '#f87171',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    marginLeft: '0.5rem'
                  }}
                >✕</button>
              </div>
            </div>

            {/* Subtopic Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {selectedConcept.details.map((detail, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDetailIndex(i)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: selectedDetailIndex === i ? `${selectedConcept.color}30` : 'rgba(100, 116, 139, 0.2)',
                    border: `1px solid ${selectedDetailIndex === i ? selectedConcept.color : 'rgba(100, 116, 139, 0.3)'}`,
                    borderRadius: '0.5rem',
                    color: selectedDetailIndex === i ? selectedConcept.color : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: selectedDetailIndex === i ? '600' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {detail.name}
                </button>
              ))}
            </div>

            {/* Selected Subtopic Content */}
            {(() => {
              const detail = selectedConcept.details[selectedDetailIndex]
              const colorScheme = SUBTOPIC_COLORS[selectedDetailIndex % SUBTOPIC_COLORS.length]
              const DiagramComponent = detail.diagram || selectedConcept.diagram
              return (
                <div>
                  {/* Diagram */}
                  {DiagramComponent && (
                    <div style={{
                      background: 'rgba(15, 23, 42, 0.6)',
                      borderRadius: '0.75rem',
                      padding: '1rem',
                      marginBottom: '1.5rem',
                      border: '1px solid #334155'
                    }}>
                      <DiagramComponent />
                    </div>
                  )}

                  {/* Detail Name */}
                  <h3 style={{ color: '#e2e8f0', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                    {detail.name}
                  </h3>

                  {/* Explanation */}
                  <p style={{
                    color: '#e2e8f0',
                    lineHeight: '1.8',
                    marginBottom: '1rem',
                    background: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    textAlign: 'left'
                  }}>
                    {detail.explanation}
                  </p>

                  {/* Code Example */}
                  {detail.codeExample && (
                    <SyntaxHighlighter
                      language="yaml"
                      style={vscDarkPlus}
                      customStyle={{
                        padding: '1rem',
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.8rem',
                        border: '1px solid #334155',
                        background: '#0f172a'
                      }}
                      codeTagProps={{ style: { background: 'transparent' } }}
                    >
                      {detail.codeExample}
                    </SyntaxHighlighter>
                  )}
                </div>
              )
            })()}

          </div>
        </div>
      )}
    </div>
  )
}

export default ELKStack
