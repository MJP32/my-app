import React, { useState } from 'react';

export default function BlobStorage({ onBack }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-8 px-5 py-2.5 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 font-medium rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow-md"
          >
            ← Back to Projects
          </button>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              📦 Blob Storage
            </h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold uppercase tracking-wide">
              Core Concept
            </span>
          </div>
          <p className="text-xl text-gray-600 mb-6 font-light">
            Store and serve large unstructured data objects like images, videos, and documents at scale
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100">Object Storage</span>
            <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">S3</span>
            <span className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-100">CDN</span>
            <span className="px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium border border-orange-100">Scalability</span>
          </div>
        </div>

        <div className="flex gap-2 mb-8 border-b-2 border-gray-100 overflow-x-auto pb-0">
          {['overview', 'architecture', 'operations', 'examples'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap rounded-t-lg ${
                activeTab === tab
                  ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600 -mb-0.5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab === 'overview' && 'Overview'}
              {tab === 'architecture' && 'Architecture'}
              {tab === 'operations' && 'Operations'}
              {tab === 'examples' && 'Examples'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Blob Storage?</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Blob (Binary Large Object) storage is a type of object storage optimized for storing massive amounts of unstructured data
                like images, videos, backups, logs, and documents. Unlike traditional file systems or databases, blob storage uses a flat
                namespace and scales horizontally to petabytes.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Popular blob storage services include Amazon S3, Azure Blob Storage, and Google Cloud Storage.
                They provide durability (99.999999999%), availability, and cost-effective storage for any data type.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits of Blob Storage</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">📈 Infinite Scalability</h3>
                  <p className="text-gray-700">Store unlimited data without capacity planning or infrastructure management</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">💰 Cost-Effective</h3>
                  <p className="text-gray-700">Pay only for what you use with tiered pricing based on access frequency</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">🛡️ High Durability</h3>
                  <p className="text-gray-700">11 nines (99.999999999%) durability through replication across multiple data centers</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm">
                  <h3 className="text-lg font-bold text-green-700 mb-3">🌍 Global Access</h3>
                  <p className="text-gray-700">Access data from anywhere via HTTP/HTTPS with CDN integration for low latency</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Blob Storage vs Traditional Storage</h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-xl border border-purple-200">
                  <thead className="bg-purple-100">
                    <tr>
                      <th className="p-4 text-left font-bold text-gray-900">Aspect</th>
                      <th className="p-4 text-left font-bold text-purple-700">Blob/Object Storage</th>
                      <th className="p-4 text-left font-bold text-blue-700">File Storage</th>
                      <th className="p-4 text-left font-bold text-green-700">Block Storage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-200">
                    <tr>
                      <td className="p-4 font-semibold">Use Case</td>
                      <td className="p-4 text-gray-700">Unstructured data at scale</td>
                      <td className="p-4 text-gray-700">Shared file access</td>
                      <td className="p-4 text-gray-700">Databases, VMs</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="p-4 font-semibold">Access Method</td>
                      <td className="p-4 text-gray-700">HTTP/REST API</td>
                      <td className="p-4 text-gray-700">NFS, SMB protocols</td>
                      <td className="p-4 text-gray-700">Direct block access</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Structure</td>
                      <td className="p-4 text-gray-700">Flat namespace</td>
                      <td className="p-4 text-gray-700">Hierarchical folders</td>
                      <td className="p-4 text-gray-700">Raw blocks</td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="p-4 font-semibold">Scalability</td>
                      <td className="p-4 text-green-600 font-bold">Virtually Unlimited</td>
                      <td className="p-4 text-yellow-600">Limited</td>
                      <td className="p-4 text-yellow-600">Limited</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Performance</td>
                      <td className="p-4 text-gray-700">High throughput</td>
                      <td className="p-4 text-gray-700">Good for sequential</td>
                      <td className="p-4 text-green-600 font-bold">Lowest latency</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'architecture' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Storage Tiers</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border-l-4 border-blue-500">
                  <h3 className="font-bold text-blue-700 text-lg mb-2">🔥 Hot Tier (Frequent Access)</h3>
                  <p className="text-gray-700 mb-2">Optimized for data that is accessed frequently</p>
                  <div className="text-sm text-gray-600">
                    <strong>Cost:</strong> Higher storage, lower access | <strong>Latency:</strong> Milliseconds | <strong>Use:</strong> Active data, CDN origin
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border-l-4 border-green-500">
                  <h3 className="font-bold text-green-700 text-lg mb-2">🌡️ Cool Tier (Infrequent Access)</h3>
                  <p className="text-gray-700 mb-2">Data accessed less than once per month</p>
                  <div className="text-sm text-gray-600">
                    <strong>Cost:</strong> Lower storage, higher access | <strong>Retention:</strong> Min 30 days | <strong>Use:</strong> Backups, disaster recovery
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border-l-4 border-purple-500">
                  <h3 className="font-bold text-purple-700 text-lg mb-2">❄️ Archive Tier (Rarely Accessed)</h3>
                  <p className="text-gray-700 mb-2">Long-term storage for compliance and archives</p>
                  <div className="text-sm text-gray-600">
                    <strong>Cost:</strong> Lowest storage, highest access | <strong>Retrieval:</strong> Hours | <strong>Use:</strong> Legal holds, compliance archives
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Components</h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-3">🪣 Buckets/Containers</h3>
                  <p className="text-gray-700">Top-level organizational units that hold blobs. Each bucket has globally unique name, region, and access policies.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-3">📄 Blobs/Objects</h3>
                  <p className="text-gray-700">Individual files stored in buckets. Each has unique key (path), metadata, content type, and storage class.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-3">🏷️ Metadata</h3>
                  <p className="text-gray-700">Key-value pairs attached to blobs for custom headers, caching, content disposition, and searchability.</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-3">🔐 Access Control</h3>
                  <p className="text-gray-700">IAM policies, bucket policies, ACLs, presigned URLs for fine-grained permissions and temporary access.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border-2 border-orange-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Durability & Replication</h2>
              <div className="bg-white p-6 rounded-xl border border-orange-100">
                <h3 className="font-bold text-orange-700 mb-4">Replication Strategies:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <div>
                      <strong>LRS (Locally Redundant):</strong> 3 copies within single data center (11 nines durability)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <div>
                      <strong>ZRS (Zone Redundant):</strong> Replicate across 3 availability zones in a region
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <div>
                      <strong>GRS (Geo-Redundant):</strong> Replicate to secondary region for disaster recovery
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 font-bold">•</span>
                    <div>
                      <strong>Cross-Region Replication:</strong> Automatic async replication across geographic regions
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'operations' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Operations</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">Upload (PUT)</h3>
                  <div className="bg-gray-900 p-4 rounded-lg text-white font-mono text-sm">
                    <div>PUT /bucket/photo.jpg HTTP/1.1</div>
                    <div>Content-Type: image/jpeg</div>
                    <div>x-amz-storage-class: STANDARD</div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">Download (GET)</h3>
                  <div className="bg-gray-900 p-4 rounded-lg text-white font-mono text-sm">
                    <div>GET /bucket/photo.jpg HTTP/1.1</div>
                    <div>Range: bytes=0-1023 {'//'} Optional: partial download</div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">List Objects</h3>
                  <div className="bg-gray-900 p-4 rounded-lg text-white font-mono text-sm">
                    <div>GET /bucket?prefix=photos/&max-keys=100</div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">Delete</h3>
                  <div className="bg-gray-900 p-4 rounded-lg text-white font-mono text-sm">
                    <div>DELETE /bucket/photo.jpg HTTP/1.1</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Advanced Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-2">🔄 Lifecycle Policies</h3>
                  <p className="text-gray-700">Automatically transition objects between storage tiers or delete after expiration</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-2">📝 Versioning</h3>
                  <p className="text-gray-700">Keep multiple versions of objects to protect against accidental deletion</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-2">🔐 Encryption</h3>
                  <p className="text-gray-700">Server-side encryption (SSE-S3, SSE-KMS) and client-side encryption at rest</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-2">⏰ Presigned URLs</h3>
                  <p className="text-gray-700">Generate temporary authenticated URLs for secure time-limited access</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-2">🔔 Event Notifications</h3>
                  <p className="text-gray-700">Trigger Lambda functions or send messages on object create/delete events</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-2">🌐 Static Website Hosting</h3>
                  <p className="text-gray-700">Host static websites directly from blob storage with custom domains</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Popular Blob Storage Services</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 text-xl mb-2">Amazon S3</h3>
                  <p className="text-gray-700 mb-2">Industry-leading object storage with 99.999999999% durability and unlimited scalability</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">S3 Standard</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">S3 Glacier</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Intelligent-Tiering</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 text-xl mb-2">Azure Blob Storage</h3>
                  <p className="text-gray-700 mb-2">Microsoft's massively scalable object storage for cloud-native workloads</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Hot/Cool/Archive</span>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Block/Append/Page Blobs</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-purple-100">
                  <h3 className="font-bold text-purple-700 text-xl mb-2">Google Cloud Storage</h3>
                  <p className="text-gray-700 mb-2">Unified object storage with automatic data classification and lifecycle management</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Standard/Nearline/Coldline/Archive</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Use Cases</h2>
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">📸 Netflix - Video Streaming</h3>
                  <p className="text-gray-700">Stores petabytes of video content in S3, serving globally via CloudFront CDN with adaptive bitrate streaming</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">📱 Spotify - Music Storage</h3>
                  <p className="text-gray-700">Uses Google Cloud Storage for audio file storage with global distribution and high availability</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">📷 Instagram - Photo Uploads</h3>
                  <p className="text-gray-700">Stores billions of photos and videos in blob storage with image processing pipelines and CDN delivery</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">💾 Dropbox - File Sync</h3>
                  <p className="text-gray-700">Built custom storage infrastructure on top of S3 for storing user files with deduplication</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-green-100">
                  <h3 className="font-bold text-green-700 mb-2">📊 Data Lakes</h3>
                  <p className="text-gray-700">Store raw data (logs, clickstreams, IoT) in S3 for analytics with tools like Athena, Spark, Presto</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Cost Optimization Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-2">✅ Use Appropriate Tier</h3>
                  <p className="text-gray-700 text-sm">Move infrequently accessed data to Cool/Archive tiers</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-2">✅ Set Lifecycle Policies</h3>
                  <p className="text-gray-700 text-sm">Automatically transition or delete old objects</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-2">✅ Enable Compression</h3>
                  <p className="text-gray-700 text-sm">Compress files before upload to reduce storage costs</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-blue-100">
                  <h3 className="font-bold text-blue-700 mb-2">✅ Use CDN</h3>
                  <p className="text-gray-700 text-sm">Reduce data transfer costs with edge caching</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
