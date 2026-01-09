import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';

export default function SQLvsNoSQL({ onBack, breadcrumb }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-lime-950 to-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-gray-800 border-2 border-lime-700 hover:border-lime-600 text-lime-300 hover:text-white font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              🗃️ SQL vs NoSQL
            </h1>
            <span className="px-3 py-1 bg-lime-900/50 text-lime-300 rounded-lg text-xs font-bold uppercase tracking-wide border border-lime-700">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-300 mb-6 font-light">
            Choose the right database type for your use case: relational SQL or flexible NoSQL
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-lime-900/30 text-lime-300 rounded-lg text-sm font-medium border border-lime-700">Relational</span>
            <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-lg text-sm font-medium border border-blue-700">Document</span>
            <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-lg text-sm font-medium border border-green-700">Key-Value</span>
            <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-lg text-sm font-medium border border-purple-700">Wide-Column</span>
          </div>
        </div>

        <Breadcrumb breadcrumb={breadcrumb} />

        <div className="flex gap-2 mb-8 border-b-2 border-gray-700 overflow-x-auto pb-0">
          {['overview', 'comparison', 'types', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-lime-400 bg-lime-900/30 border-b-2 border-lime-600 -mb-0.5'
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'comparison' && 'SQL vs NoSQL'}
              {tab === 'types' && 'NoSQL Types'}
              {tab === 'examples' && 'Examples'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-lime-900/30 to-green-900/30 rounded-2xl p-8 border-2 border-lime-700">
              <h2 className="text-3xl font-bold text-white mb-6">Database Paradigms</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                SQL (Structured Query Language) databases are relational, using predefined schemas and tables with relationships.
                NoSQL (Not Only SQL) databases are non-relational, offering flexible schemas and various data models.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Neither is universally better—each excels in different scenarios. Understanding their strengths and trade-offs
                is crucial for making the right choice for your application.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border-2 border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6">High-Level Comparison</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-500/20 border-2 border-blue-500/40 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">🗂️ SQL (Relational)</h3>
                  <ul className="space-y-2 text-gray-200">
                    <li>• Structured, predefined schema</li>
                    <li>• Tables with rows and columns</li>
                    <li>• ACID transactions</li>
                    <li>• Vertical scaling traditionally</li>
                    <li>• Complex queries with JOINs</li>
                  </ul>
                </div>
                <div className="bg-green-500/20 border-2 border-green-500/40 rounded-xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">📦 NoSQL (Non-Relational)</h3>
                  <ul className="space-y-2 text-gray-200">
                    <li>• Flexible, dynamic schema</li>
                    <li>• Various data models (document, key-value, etc.)</li>
                    <li>• Eventual consistency (often)</li>
                    <li>• Horizontal scaling built-in</li>
                    <li>• Simpler queries, denormalized data</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">When to Use Each</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-blue-400 mb-3">Use SQL When:</h3>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Data structure is well-defined and stable</li>
                    <li>• Complex relationships between entities</li>
                    <li>• ACID compliance required (financial transactions)</li>
                    <li>• Complex queries with multiple JOINs</li>
                    <li>• Data integrity is critical</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-lg font-bold text-green-400 mb-3">Use NoSQL When:</h3>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Rapid development with changing requirements</li>
                    <li>• Massive scale (billions of records)</li>
                    <li>• Horizontal scaling needed</li>
                    <li>• Unstructured or semi-structured data</li>
                    <li>• High write throughput required</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">Detailed Comparison</h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-gray-800 rounded-xl overflow-hidden border border-purple-700">
                  <thead className="bg-purple-900/50">
                    <tr>
                      <th className="p-4 text-left font-bold text-purple-300">Feature</th>
                      <th className="p-4 text-left font-bold text-blue-300">SQL</th>
                      <th className="p-4 text-left font-bold text-green-300">NoSQL</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-t border-purple-700">
                      <td className="p-4 font-semibold">Schema</td>
                      <td className="p-4">Fixed, predefined</td>
                      <td className="p-4">Dynamic, flexible</td>
                    </tr>
                    <tr className="border-t border-purple-700">
                      <td className="p-4 font-semibold">Scalability</td>
                      <td className="p-4">Vertical (traditionally)</td>
                      <td className="p-4">Horizontal (built-in)</td>
                    </tr>
                    <tr className="border-t border-purple-700">
                      <td className="p-4 font-semibold">Consistency</td>
                      <td className="p-4">Strong (ACID)</td>
                      <td className="p-4">Eventual (BASE)</td>
                    </tr>
                    <tr className="border-t border-purple-700">
                      <td className="p-4 font-semibold">Joins</td>
                      <td className="p-4">Powerful JOIN support</td>
                      <td className="p-4">Limited or none</td>
                    </tr>
                    <tr className="border-t border-purple-700">
                      <td className="p-4 font-semibold">Query Language</td>
                      <td className="p-4">SQL (standardized)</td>
                      <td className="p-4">Varies by database</td>
                    </tr>
                    <tr className="border-t border-purple-700">
                      <td className="p-4 font-semibold">Maturity</td>
                      <td className="p-4">Decades old, proven</td>
                      <td className="p-4">Newer, evolving</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">ACID vs BASE</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 shadow-sm">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">ACID (SQL)</h3>
                  <ul className="space-y-3">
                    <li>
                      <strong className="text-blue-400">Atomicity:</strong>
                      <p className="text-gray-300 text-sm">All or nothing - transaction succeeds completely or fails completely</p>
                    </li>
                    <li>
                      <strong className="text-blue-400">Consistency:</strong>
                      <p className="text-gray-300 text-sm">Database moves from one valid state to another</p>
                    </li>
                    <li>
                      <strong className="text-blue-400">Isolation:</strong>
                      <p className="text-gray-300 text-sm">Concurrent transactions don't interfere with each other</p>
                    </li>
                    <li>
                      <strong className="text-blue-400">Durability:</strong>
                      <p className="text-gray-300 text-sm">Committed data persists even after system failure</p>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700 shadow-sm">
                  <h3 className="text-xl font-bold text-green-400 mb-4">BASE (NoSQL)</h3>
                  <ul className="space-y-3">
                    <li>
                      <strong className="text-green-400">Basically Available:</strong>
                      <p className="text-gray-300 text-sm">System appears to work most of the time</p>
                    </li>
                    <li>
                      <strong className="text-green-400">Soft State:</strong>
                      <p className="text-gray-300 text-sm">State may change over time, even without input</p>
                    </li>
                    <li>
                      <strong className="text-green-400">Eventually Consistent:</strong>
                      <p className="text-gray-300 text-sm">System will become consistent over time</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Normalization vs Denormalization</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-3">SQL: Normalized</h3>
                  <p className="text-gray-300 mb-3">Minimize data redundancy through normalization. Data split across tables.</p>
                  <div className="bg-green-900/30 p-3 rounded-lg text-sm border border-green-700">
                    <div className="font-mono text-gray-300 space-y-1">
                      <div>Users table: id, name, email</div>
                      <div>Orders table: id, user_id, amount</div>
                      <div>JOIN to get user + orders</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-green-700">
                  <h3 className="font-bold text-green-400 mb-3">NoSQL: Denormalized</h3>
                  <p className="text-gray-300 mb-3">Embed related data together. Accept redundancy for query performance.</p>
                  <div className="bg-green-900/30 p-3 rounded-lg text-sm border border-green-700">
                    <div className="font-mono text-gray-300 space-y-1">
                      <div>Order document:</div>
                      <div>{`{`}</div>
                      <div className="ml-3">id, amount,</div>
                      <div className="ml-3">user: {`{`}name, email{`}`}</div>
                      <div>{`}`}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'types' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">📄 Document Databases</h2>
              <p className="text-gray-300 text-lg mb-4">Store data as JSON-like documents with flexible schemas.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-blue-700 mb-4">
                <h3 className="font-bold text-blue-400 mb-3">Characteristics:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Self-contained documents (JSON, BSON)</li>
                  <li>• Each document can have different fields</li>
                  <li>• Nested and hierarchical data supported</li>
                  <li>• Query by any field in document</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h4 className="font-bold text-blue-400 mb-2">Examples:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• MongoDB</li>
                    <li>• CouchDB</li>
                    <li>• Amazon DocumentDB</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-blue-700">
                  <h4 className="font-bold text-blue-400 mb-2">Use Cases:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Content management</li>
                    <li>• User profiles</li>
                    <li>• Product catalogs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">🔑 Key-Value Stores</h2>
              <p className="text-gray-300 text-lg mb-4">Simple data model: unique key maps to a value. Extremely fast.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-green-700 mb-4">
                <h3 className="font-bold text-green-400 mb-3">Characteristics:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Simplest NoSQL model</li>
                  <li>• O(1) lookups by key</li>
                  <li>• Values are opaque (can't query inside them)</li>
                  <li>• In-memory or persistent</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h4 className="font-bold text-green-400 mb-2">Examples:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Redis</li>
                    <li>• Memcached</li>
                    <li>• DynamoDB (also document)</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                  <h4 className="font-bold text-green-400 mb-2">Use Cases:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Caching</li>
                    <li>• Session storage</li>
                    <li>• Real-time analytics</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">📊 Wide-Column Stores</h2>
              <p className="text-gray-300 text-lg mb-4">Store data in column families. Optimized for queries over large datasets.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-purple-700 mb-4">
                <h3 className="font-bold text-purple-400 mb-3">Characteristics:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Data organized by column families</li>
                  <li>• Each row can have different columns</li>
                  <li>• Excellent for analytical queries</li>
                  <li>• Distributed and highly scalable</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h4 className="font-bold text-purple-400 mb-2">Examples:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Apache Cassandra</li>
                    <li>• HBase</li>
                    <li>• Google Bigtable</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-purple-700">
                  <h4 className="font-bold text-purple-400 mb-2">Use Cases:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Time-series data</li>
                    <li>• IoT data</li>
                    <li>• Messaging apps</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-2xl p-8 border-2 border-orange-700">
              <h2 className="text-3xl font-bold text-white mb-6">🔗 Graph Databases</h2>
              <p className="text-gray-300 text-lg mb-4">Store data as nodes and relationships (edges). Excellent for connected data.</p>
              <div className="bg-gray-800 p-6 rounded-xl border border-orange-700 mb-4">
                <h3 className="font-bold text-orange-400 mb-3">Characteristics:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Nodes (entities) and edges (relationships)</li>
                  <li>• Properties on both nodes and edges</li>
                  <li>• Fast traversal of relationships</li>
                  <li>• Query languages like Cypher, Gremlin</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h4 className="font-bold text-orange-400 mb-2">Examples:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Neo4j</li>
                    <li>• Amazon Neptune</li>
                    <li>• ArangoDB</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-4 rounded-xl border border-orange-700">
                  <h4 className="font-bold text-orange-400 mb-2">Use Cases:</h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Social networks</li>
                    <li>• Recommendation engines</li>
                    <li>• Fraud detection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-2xl p-8 border-2 border-green-700">
              <h2 className="text-3xl font-bold text-white mb-6">Popular Databases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-blue-400">SQL Databases</h3>
                  <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                    <h4 className="font-bold text-white mb-1">PostgreSQL</h4>
                    <p className="text-sm text-gray-400">Advanced open-source, JSONB support, extensions</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                    <h4 className="font-bold text-white mb-1">MySQL</h4>
                    <p className="text-sm text-gray-400">Popular open-source, widely supported</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                    <h4 className="font-bold text-white mb-1">Oracle</h4>
                    <p className="text-sm text-gray-400">Enterprise-grade, feature-rich</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                    <h4 className="font-bold text-white mb-1">SQL Server</h4>
                    <p className="text-sm text-gray-400">Microsoft, great Windows integration</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-green-400">NoSQL Databases</h3>
                  <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                    <h4 className="font-bold text-white mb-1">MongoDB</h4>
                    <p className="text-sm text-gray-400">Document store, most popular NoSQL</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                    <h4 className="font-bold text-white mb-1">Redis</h4>
                    <p className="text-sm text-gray-400">In-memory key-value, caching, pub/sub</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                    <h4 className="font-bold text-white mb-1">Cassandra</h4>
                    <p className="text-sm text-gray-400">Wide-column, distributed, high availability</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-xl border border-green-700">
                    <h4 className="font-bold text-white mb-1">DynamoDB</h4>
                    <p className="text-sm text-gray-400">AWS managed, key-value and document</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border-2 border-blue-700">
              <h2 className="text-3xl font-bold text-white mb-6">Choosing the Right Database</h2>
              <div className="space-y-4">
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🏦 Banking Application → PostgreSQL</h3>
                  <p className="text-gray-300 text-sm">ACID compliance critical, complex transactions, strong consistency</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">📱 Social Media Feed → MongoDB</h3>
                  <p className="text-gray-300 text-sm">Flexible schema, high write throughput, eventual consistency acceptable</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🛒 E-Commerce → PostgreSQL + Redis</h3>
                  <p className="text-gray-300 text-sm">PostgreSQL for orders (ACID), Redis for caching and sessions</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">💬 Chat Application → Cassandra</h3>
                  <p className="text-gray-300 text-sm">Massive scale, high write throughput, time-series data</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-xl border border-blue-700">
                  <h3 className="font-bold text-blue-400 mb-2">🔗 LinkedIn → Neo4j</h3>
                  <p className="text-gray-300 text-sm">Social graph, connections, recommendations</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border-2 border-purple-700">
              <h2 className="text-3xl font-bold text-white mb-6">Polyglot Persistence</h2>
              <p className="text-gray-300 text-lg mb-4">
                Use multiple database types in the same application, each optimized for specific use cases.
              </p>
              <div className="bg-gray-800 p-6 rounded-xl border border-purple-700">
                <h3 className="font-bold text-purple-400 mb-3">Example Architecture:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• PostgreSQL: User accounts, orders, transactions (ACID required)</li>
                  <li>• MongoDB: Product catalog, reviews (flexible schema)</li>
                  <li>• Redis: Session storage, caching (fast key-value lookups)</li>
                  <li>• Elasticsearch: Full-text search (search-optimized)</li>
                  <li>• Neo4j: Product recommendations (graph relationships)</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
