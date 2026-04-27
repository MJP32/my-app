import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

const SyntaxHighlighter = ({ code }) => {
  const highlightJava = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    highlighted = highlighted
      .replace(/\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|abstract|synchronized|volatile|transient|native|super|this|null|default)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|int|double|float|long|short|byte|char|boolean|var)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(String|List|ArrayList|Map|HashMap|Optional|Exception|Override|Integer|Long|Component|Bean|Configuration|Autowired|Health|HealthIndicator|MeterRegistry|Counter|Timer|Gauge|Endpoint|ReadOperation|WriteOperation|SecurityFilterChain|HttpSecurity|CacheManager|CacheManagerBuilder|CacheConfigurationBuilder|Cache|ResourcePoolsBuilder|ExpiryPolicyBuilder|JCacheCacheManager|CacheEventListener|Ehcache|CacheConcurrencyStrategy)\b/g, '<span style="color: #4ec9b0;">$1</span>')
      .replace(/(@\w+)/g, '<span style="color: #dcdcaa;">$1</span>')
      .replace(/\b(\d+\.?\d*[fLdD]?)\b/g, '<span style="color: #b5cea8;">$1</span>')
      .replace(/\b([a-z_]\w*)\s*\(/g, '<span style="color: #dcdcaa;">$1</span>(')

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
      <code dangerouslySetInnerHTML={{ __html: highlightJava(code) }} />
    </pre>
  )
}

function Ehcache({ onBack, breadcrumb }) {
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #111827, #064e3b, #111827)',
      color: 'white',
      padding: '1.5rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
            background: 'rgba(16, 185, 129, 0.2)',
            color: '#6ee7b7',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(16, 185, 129, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(16, 185, 129, 0.2)'
          }}
        >
          Back
        </button>
      </div>

      {breadcrumb && (
        <Breadcrumb
          breadcrumbStack={[
            breadcrumb.section && { name: breadcrumb.section.name, icon: breadcrumb.section.icon, onClick: breadcrumb.section.onClick },
            breadcrumb.category && { name: breadcrumb.category.name, onClick: breadcrumb.category.onClick },
            breadcrumb.topic && { name: breadcrumb.topic }
          ].filter(Boolean)}
          colors={breadcrumb.colors}
          onMainMenu={breadcrumb.onMainMenu}
        />
      )}

      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '0.5rem',
        background: 'linear-gradient(to right, #6ee7b7, #34d399)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Ehcache
      </h1>
      <p style={{ color: '#d1d5db', textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem' }}>
        A robust, standards-based Java caching library with tiered storage, Spring and Hibernate integration
      </p>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '0.25rem',
        marginBottom: '2rem',
        borderBottom: '2px solid #374151',
        overflowX: 'auto',
        flexWrap: 'nowrap'
      }}>
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'configuration', label: 'Configuration' },
          { id: 'spring-cache', label: 'Spring Cache' },
          { id: 'hibernate-l2', label: 'Hibernate L2 Cache' },
          { id: 'tiering', label: 'Tiered Storage' },
          { id: 'expiry-eviction', label: 'Expiry & Eviction' },
          { id: 'clustering', label: 'Clustering' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            style={{
              padding: '0.75rem 1.25rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              backgroundColor: activeSection === tab.id ? '#10b981' : 'transparent',
              color: activeSection === tab.id ? 'white' : '#9ca3af',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (activeSection !== tab.id) {
                e.target.style.backgroundColor = '#374151'
                e.target.style.color = '#d1d5db'
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== tab.id) {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#9ca3af'
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              What is Ehcache?
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Ehcache is a widely-used, open-source Java caching library originally created by Greg Luck.
              It provides fast, lightweight in-process caching that scales from a single JVM to distributed
              environments via Terracotta Server. Ehcache 3.x is fully compliant with the JSR-107 (JCache)
              specification, making it a portable, standards-based choice for any Java application.
            </p>
            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>Key Benefit:</strong> Tiered storage (heap + off-heap + disk) lets you cache terabytes of data
                without overwhelming the garbage collector, all behind a single, simple API.
              </p>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
              Getting Started - Maven Dependency
            </h3>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// build.gradle
dependencies {
    implementation "org.ehcache:ehcache:3.10.8"
    implementation "javax.cache:cache-api:1.1.1"
}

// Or Maven pom.xml
// <dependency>
//     <groupId>org.ehcache</groupId>
//     <artifactId>ehcache</artifactId>
//     <version>3.10.8</version>
// </dependency>
// <dependency>
//     <groupId>javax.cache</groupId>
//     <artifactId>cache-api</artifactId>
//     <version>1.1.1</version>
// </dependency>`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Key Features
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {[
                { icon: '\u2705', title: 'JSR-107 JCache Compliant', desc: 'Fully implements the javax.cache API so you can swap providers without code changes' },
                { icon: '\uD83D\uDDC3\uFE0F', title: 'Tiered Storage', desc: 'Heap, off-heap, and disk tiers let you trade speed for capacity transparently' },
                { icon: '\uD83C\uDF31', title: 'Spring Integration', desc: 'First-class support for Spring Cache abstraction with @Cacheable, @CacheEvict, and more' },
                { icon: '\uD83D\uDC3B', title: 'Hibernate L2 Cache', desc: 'Drop-in second-level cache provider for Hibernate ORM to reduce database round-trips' },
                { icon: '\uD83D\uDEE0\uFE0F', title: 'XML & Programmatic Config', desc: 'Configure caches declaratively in ehcache.xml or programmatically with builders' },
                { icon: '\uD83C\uDF10', title: 'Distributed Caching', desc: 'Scale beyond a single JVM with Terracotta Server for clustered, fault-tolerant caches' }
              ].map((feature, index) => (
                <div key={index} style={{
                  backgroundColor: '#1f2937',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #374151'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{feature.icon}</div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#d1d5db', marginBottom: '0.5rem' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0 }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              When to Use Ehcache vs Redis vs Caffeine
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { name: 'Ehcache', best: 'Best for in-process caching with tiered storage, Hibernate L2 cache, and when you need off-heap or disk persistence without a separate server', color: '#10b981' },
                { name: 'Redis', best: 'Best when you need a shared, distributed cache across multiple services, or require rich data structures (lists, sets, sorted sets, streams)', color: '#ef4444' },
                { name: 'Caffeine', best: 'Best for pure in-memory, single-JVM caching where maximum throughput and minimal latency matter most (no off-heap or disk)', color: '#f59e0b' }
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1rem',
                  backgroundColor: '#1f2937',
                  borderRadius: '8px',
                  border: '1px solid #374151',
                  borderLeft: `4px solid ${item.color}`
                }}>
                  <div style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: item.color,
                    color: 'white',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.name}
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#9ca3af', margin: 0, lineHeight: '1.6' }}>
                    {item.best}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Quick Start Example
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              A minimal example creating a cache, putting and getting values, then closing the manager:
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import org.ehcache.Cache;
import org.ehcache.CacheManager;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.CacheManagerBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;

public class EhcacheQuickStart {

    public static void main(String[] args) {
        // Build a CacheManager with a single cache named "userCache"
        CacheManager cacheManager = CacheManagerBuilder.newCacheManagerBuilder()
            .withCache("userCache",
                CacheConfigurationBuilder.newCacheConfigurationBuilder(
                    Long.class, String.class,
                    ResourcePoolsBuilder.heap(100))  // max 100 entries on heap
            )
            .build(true);  // initialize immediately

        // Retrieve the cache by name and key/value types
        Cache<Long, String> userCache = cacheManager.getCache(
            "userCache", Long.class, String.class);

        // Put and get values
        userCache.put(1L, "Alice");
        userCache.put(2L, "Bob");

        String user = userCache.get(1L);  // returns "Alice"
        System.out.println("User 1: " + user);

        // Check if a key exists
        boolean exists = userCache.containsKey(3L);  // false
        System.out.println("User 3 exists: " + exists);

        // Remove a specific entry
        userCache.remove(2L);

        // Always close the CacheManager when done
        cacheManager.close();
    }
}`} />
            </div>
          </div>
        </div>
      )}

      {/* Configuration Section */}
      {activeSection === 'configuration' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              XML Configuration (ehcache.xml)
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Ehcache supports declarative configuration via an XML file placed on the classpath.
              This is the preferred approach for production systems because cache tuning does not require code changes.
            </p>
            <div style={{
              backgroundColor: '#1f2937',
              color: '#e5e7eb',
              padding: '1.5rem',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              overflowX: 'auto',
              border: '1px solid #374151'
            }}>
              <pre style={{ margin: 0 }}>{`<!-- src/main/resources/ehcache.xml -->
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns="http://www.ehcache.org/v3"
        xsi:schemaLocation="http://www.ehcache.org/v3
            http://www.ehcache.org/schema/ehcache-core-3.0.xsd">

  <!-- Shared resource pool template -->
  <cache-template name="default-template">
    <expiry>
      <ttl unit="minutes">30</ttl>
    </expiry>
    <resources>
      <heap unit="entries">1000</heap>
      <offheap unit="MB">100</offheap>
    </resources>
  </cache-template>

  <!-- Cache using the template -->
  <cache alias="userCache" uses-template="default-template">
    <key-type>java.lang.Long</key-type>
    <value-type>com.example.User</value-type>
  </cache>

  <!-- Cache with custom tiered resources -->
  <cache alias="productCache">
    <key-type>java.lang.String</key-type>
    <value-type>com.example.Product</value-type>
    <expiry>
      <ttl unit="hours">1</ttl>
    </expiry>
    <resources>
      <heap unit="entries">500</heap>
      <offheap unit="MB">50</offheap>
      <disk unit="GB" persistent="true">1</disk>
    </resources>
  </cache>

  <!-- Cache with heap only -->
  <cache alias="sessionCache">
    <key-type>java.lang.String</key-type>
    <value-type>java.io.Serializable</value-type>
    <expiry>
      <tti unit="minutes">15</tti>
    </expiry>
    <resources>
      <heap unit="entries">2000</heap>
    </resources>
  </cache>

</config>`}</pre>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
              Loading XML Configuration in Java
            </h3>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import org.ehcache.CacheManager;
import org.ehcache.config.Configuration;
import org.ehcache.xml.XmlConfiguration;

public class XmlConfigLoader {

    public static CacheManager createFromXml() {
        // Load ehcache.xml from the classpath
        Configuration xmlConfig = new XmlConfiguration(
            XmlConfigLoader.class.getResource("/ehcache.xml"));

        CacheManager cacheManager = CacheManagerBuilder
            .newCacheManager(xmlConfig);
        cacheManager.init();

        return cacheManager;
    }
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Programmatic Java Configuration
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Use the builder API for full programmatic control. This approach is ideal for dynamic
              cache creation, testing, and when cache configuration depends on runtime values.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151',
              marginBottom: '1.5rem'
            }}>
              <SyntaxHighlighter code={`import org.ehcache.Cache;
import org.ehcache.CacheManager;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.CacheManagerBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.config.builders.ExpiryPolicyBuilder;
import org.ehcache.config.units.MemoryUnit;
import org.ehcache.config.units.EntryUnit;

import java.time.Duration;

public class ProgrammaticConfig {

    public CacheManager buildCacheManager() {
        // Define resource pools: heap -> off-heap -> disk
        ResourcePoolsBuilder resourcePools = ResourcePoolsBuilder.newResourcePoolsBuilder()
            .heap(1000, EntryUnit.ENTRIES)      // 1000 entries on heap
            .offheap(100, MemoryUnit.MB)         // 100 MB off-heap
            .disk(1, MemoryUnit.GB, true);       // 1 GB persistent disk

        // Build cache configuration with expiry
        CacheConfigurationBuilder<String, String> cacheConfig =
            CacheConfigurationBuilder.newCacheConfigurationBuilder(
                String.class, String.class, resourcePools)
            .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(
                Duration.ofMinutes(30)))
            .withExpiry(ExpiryPolicyBuilder.timeToIdleExpiration(
                Duration.ofMinutes(10)));

        // Build the CacheManager with multiple caches
        CacheManager cacheManager = CacheManagerBuilder.newCacheManagerBuilder()
            .with(CacheManagerBuilder.persistence("/tmp/ehcache-data"))
            .withCache("primaryCache", cacheConfig)
            .withCache("secondaryCache",
                CacheConfigurationBuilder.newCacheConfigurationBuilder(
                    Long.class, String.class,
                    ResourcePoolsBuilder.heap(500))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(
                    Duration.ofHours(1))))
            .build(true);

        return cacheManager;
    }

    public void addCacheAtRuntime(CacheManager cacheManager) {
        // Create a new cache dynamically after initialization
        cacheManager.createCache("dynamicCache",
            CacheConfigurationBuilder.newCacheConfigurationBuilder(
                String.class, byte[].class,
                ResourcePoolsBuilder.newResourcePoolsBuilder()
                    .heap(200, EntryUnit.ENTRIES)
                    .offheap(50, MemoryUnit.MB))
            .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(
                Duration.ofMinutes(5))));

        Cache<String, byte[]> dynamicCache =
            cacheManager.getCache("dynamicCache", String.class, byte[].class);

        dynamicCache.put("key1", "value1".getBytes());
    }
}`} />
            </div>

            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>Tip:</strong> For off-heap and disk tiers, cached objects must be serializable.
                Ehcache uses Java serialization by default but supports custom serializers for better performance.
              </p>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              JCache (JSR-107) Configuration
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Use the standard JCache API with Ehcache as the underlying provider for maximum portability:
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import javax.cache.Cache;
import javax.cache.CacheManager;
import javax.cache.Caching;
import javax.cache.configuration.MutableConfiguration;
import javax.cache.expiry.CreatedExpiryPolicy;
import javax.cache.expiry.Duration;
import javax.cache.spi.CachingProvider;

import java.util.concurrent.TimeUnit;

public class JCacheExample {

    public void useJCacheApi() {
        // Obtain the Ehcache JCache provider
        CachingProvider provider = Caching.getCachingProvider(
            "org.ehcache.jsr107.EhcacheCachingProvider");

        CacheManager cacheManager = provider.getCacheManager();

        // Create a JCache-compliant configuration
        MutableConfiguration<String, String> config =
            new MutableConfiguration<String, String>()
                .setTypes(String.class, String.class)
                .setStoreByValue(false)
                .setExpiryPolicyFactory(
                    CreatedExpiryPolicy.factoryOf(
                        new Duration(TimeUnit.MINUTES, 30)));

        // Create and use the cache via standard JCache API
        Cache<String, String> cache = cacheManager.createCache(
            "jcacheExample", config);

        cache.put("greeting", "Hello from JCache!");
        String value = cache.get("greeting");
        System.out.println(value);

        // Close the provider to release all resources
        provider.close();
    }
}`} />
            </div>
          </div>
        </div>
      )}

      {/* Spring Cache Section */}
      {activeSection === 'spring-cache' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Spring Cache Abstraction with Ehcache
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Spring provides a cache abstraction that decouples caching logic from business code.
              Ehcache integrates via the JCache (JSR-107) bridge, so you configure Ehcache caches
              and Spring transparently manages them through annotations.
            </p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
              Maven Dependencies
            </h3>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// build.gradle
dependencies {
    implementation "org.springframework.boot:spring-boot-starter-cache"
    implementation "org.ehcache:ehcache:3.10.8"
    implementation "javax.cache:cache-api:1.1.1"
}`} />
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
              Spring Boot application.properties
            </h3>
            <div style={{
              backgroundColor: '#1f2937',
              color: '#e5e7eb',
              padding: '1.5rem',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              overflowX: 'auto',
              border: '1px solid #374151'
            }}>
              <pre style={{ margin: 0 }}>{`# application.properties
spring.cache.type=jcache
spring.cache.jcache.config=classpath:ehcache.xml
spring.cache.jcache.provider=org.ehcache.jsr107.EhcacheCachingProvider`}</pre>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              CacheManager Bean Configuration
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Configure the JCacheCacheManager bean to bridge Spring Cache with Ehcache:
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.jcache.JCacheCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.cache.Caching;
import javax.cache.spi.CachingProvider;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        // Use Ehcache as the JCache provider
        CachingProvider provider = Caching.getCachingProvider(
            "org.ehcache.jsr107.EhcacheCachingProvider");

        javax.cache.CacheManager jCacheManager =
            provider.getCacheManager(
                getClass().getResource("/ehcache.xml").toURI(),
                getClass().getClassLoader());

        return new JCacheCacheManager(jCacheManager);
    }
}

// Alternative: Programmatic Ehcache configuration with Spring
@Configuration
@EnableCaching
public class ProgrammaticCacheConfig {

    @Bean
    public CacheManager cacheManager() {
        org.ehcache.CacheManager ehcacheManager =
            CacheManagerBuilder.newCacheManagerBuilder()
                .withCache("users",
                    CacheConfigurationBuilder.newCacheConfigurationBuilder(
                        Long.class, Object.class,
                        ResourcePoolsBuilder.heap(1000))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(
                        Duration.ofMinutes(30))))
                .withCache("products",
                    CacheConfigurationBuilder.newCacheConfigurationBuilder(
                        String.class, Object.class,
                        ResourcePoolsBuilder.newResourcePoolsBuilder()
                            .heap(500)
                            .offheap(50, MemoryUnit.MB))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(
                        Duration.ofHours(1))))
                .build(true);

        // Wrap in a JCache manager for Spring compatibility
        javax.cache.CacheManager jsr107Manager =
            new org.ehcache.jsr107.Eh107CacheManager(ehcacheManager);

        return new JCacheCacheManager(jsr107Manager);
    }
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Spring Cache Annotations
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Use Spring annotations to transparently cache method return values, evict stale entries,
              and update cache contents:
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // @Cacheable - Caches the result; subsequent calls with
    // the same key return the cached value without executing the method
    @Cacheable(value = "users", key = "#id")
    public User findById(Long id) {
        // This database call is only made on cache miss
        return userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
    }

    // @Cacheable with condition - Only cache non-null results
    @Cacheable(value = "users", key = "#email",
               condition = "#email != null",
               unless = "#result == null")
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    // @CachePut - Always executes the method and updates the cache
    // Use for create/update operations
    @CachePut(value = "users", key = "#user.id")
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    // @CacheEvict - Removes entries from the cache
    @CacheEvict(value = "users", key = "#id")
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // @CacheEvict - Clear all entries from the cache
    @CacheEvict(value = "users", allEntries = true)
    public void clearUserCache() {
        // Cache is cleared; no other logic needed
    }

    // @Caching - Combine multiple cache operations
    @Caching(
        put = {
            @CachePut(value = "users", key = "#result.id"),
            @CachePut(value = "users", key = "#result.email")
        },
        evict = {
            @CacheEvict(value = "userList", allEntries = true)
        }
    )
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // @Cacheable with custom key generator using SpEL
    @Cacheable(value = "userSearch",
               key = "T(java.util.Objects).hash(#name, #department, #page)")
    public List<User> searchUsers(String name, String department, int page) {
        return userRepository.search(name, department, page);
    }
}`} />
            </div>

            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981',
              marginTop: '1rem'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>Important:</strong> Spring cache annotations use proxy-based AOP. Calling a @Cacheable method
                from within the same class bypasses the proxy and the cache. Always call cached methods from a
                different bean.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hibernate L2 Cache Section */}
      {activeSection === 'hibernate-l2' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Hibernate Second-Level Cache with Ehcache
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Hibernate&#39;s first-level cache (Session cache) only lives for the duration of a single session.
              The second-level (L2) cache is shared across sessions and can dramatically reduce database queries
              for frequently-read, rarely-changed entities. Ehcache is one of the most popular L2 cache providers.
            </p>

            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
              Maven Dependencies
            </h3>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// build.gradle
dependencies {
    implementation "org.hibernate.orm:hibernate-jcache:6.4.0"
    implementation "org.ehcache:ehcache:3.10.8"
    implementation "javax.cache:cache-api:1.1.1"
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Hibernate Properties Configuration
            </h2>
            <div style={{
              backgroundColor: '#1f2937',
              color: '#e5e7eb',
              padding: '1.5rem',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              overflowX: 'auto',
              border: '1px solid #374151',
              marginBottom: '1.5rem'
            }}>
              <pre style={{ margin: 0 }}>{`# application.properties for Spring Boot + Hibernate + Ehcache L2
spring.jpa.properties.hibernate.cache.use_second_level_cache=true
spring.jpa.properties.hibernate.cache.use_query_cache=true
spring.jpa.properties.hibernate.cache.region.factory_class=org.hibernate.cache.jcache.JCacheRegionFactory
spring.jpa.properties.hibernate.javax.cache.provider=org.ehcache.jsr107.EhcacheCachingProvider
spring.jpa.properties.hibernate.javax.cache.uri=classpath:ehcache.xml
spring.jpa.properties.hibernate.generate_statistics=true`}</pre>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '1rem' }}>
              Entity Caching Annotations
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Annotate entities with @Cacheable and @Cache to opt them into the second-level cache:
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import jakarta.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

@Entity
@Table(name = "products")
@Cacheable                                          // JPA annotation: enable caching
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE) // Hibernate: concurrency strategy
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private double price;

    @Column(length = 2000)
    private String description;

    // Cache the collection association as well
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private List<Review> reviews = new ArrayList<>();

    // Getters and setters omitted for brevity
}

// CacheConcurrencyStrategy options:
//
// READ_ONLY          - For immutable entities (best performance)
// NONSTRICT_READ_WRITE - Eventual consistency, no locking
// READ_WRITE         - Strong consistency with soft locks
// TRANSACTIONAL      - Full JTA transaction support (requires JTA)`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Query Cache
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              The query cache stores query results (lists of entity IDs) keyed by the query string and parameters.
              Combined with the L2 entity cache, this avoids hitting the database entirely for repeated queries.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import org.springframework.stereotype.Repository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@Repository
public class ProductRepository {

    @Autowired
    private EntityManager entityManager;

    // JPA query with caching enabled
    public List<Product> findByCategory(String category) {
        TypedQuery<Product> query = entityManager
            .createQuery(
                "SELECT p FROM Product p WHERE p.category = :category",
                Product.class)
            .setParameter("category", category)
            .setHint("org.hibernate.cacheable", true);  // Enable query cache

        return query.getResultList();
    }

    // Named query with cache hint
    public List<Product> findTopSelling(int limit) {
        return entityManager
            .createNamedQuery("Product.topSelling", Product.class)
            .setMaxResults(limit)
            .setHint("org.hibernate.cacheable", true)
            .setHint("org.hibernate.cacheRegion", "query.products.topSelling")
            .getResultList();
    }

    // Spring Data JPA - use @QueryHints
    // @QueryHints({
    //     @QueryHint(name = "org.hibernate.cacheable", value = "true"),
    //     @QueryHint(name = "org.hibernate.cacheRegion",
    //                value = "query.products")
    // })
    // List<Product> findByPriceGreaterThan(double price);
}`} />
            </div>

            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981',
              marginTop: '1rem'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>Caution:</strong> The query cache is invalidated whenever any entity in the queried table
                is modified. Use it only for tables that are read far more often than they are written to.
              </p>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Ehcache Region Configuration for Hibernate
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Each @Cache entity maps to a cache region. Configure regions in ehcache.xml with appropriate sizing:
            </p>
            <div style={{
              backgroundColor: '#1f2937',
              color: '#e5e7eb',
              padding: '1.5rem',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              overflowX: 'auto',
              border: '1px solid #374151'
            }}>
              <pre style={{ margin: 0 }}>{`<!-- ehcache.xml - Hibernate L2 cache regions -->
<config xmlns="http://www.ehcache.org/v3">

  <!-- Default template for entity caches -->
  <cache-template name="entity-template">
    <expiry>
      <ttl unit="minutes">60</ttl>
    </expiry>
    <resources>
      <heap unit="entries">1000</heap>
      <offheap unit="MB">50</offheap>
    </resources>
  </cache-template>

  <!-- Region for Product entity (matches fully qualified class name) -->
  <cache alias="com.example.model.Product"
         uses-template="entity-template">
    <resources>
      <heap unit="entries">5000</heap>
      <offheap unit="MB">100</offheap>
    </resources>
  </cache>

  <!-- Region for Product.reviews collection -->
  <cache alias="com.example.model.Product.reviews"
         uses-template="entity-template" />

  <!-- Hibernate query cache region -->
  <cache alias="default-query-results-region">
    <expiry>
      <ttl unit="minutes">5</ttl>
    </expiry>
    <resources>
      <heap unit="entries">500</heap>
    </resources>
  </cache>

  <!-- Hibernate update timestamps region (must not expire) -->
  <cache alias="default-update-timestamps-region">
    <resources>
      <heap unit="entries">5000</heap>
    </resources>
  </cache>

</config>`}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Tiered Storage Section */}
      {activeSection === 'tiering' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Understanding Tiered Storage
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Ehcache&#39;s tiered storage model lets you balance speed, capacity, and cost. Data automatically
              flows between tiers: the hottest entries stay on heap, warm entries move to off-heap, and
              cold entries spill to disk. Each tier has distinct trade-offs.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {[
                {
                  tier: 'Heap Tier',
                  speed: 'Fastest',
                  capacity: 'Limited',
                  color: '#10b981',
                  details: 'Stores objects directly on the JVM heap. No serialization needed. Subject to GC pressure - keep it small for latency-sensitive applications.'
                },
                {
                  tier: 'Off-Heap Tier',
                  speed: 'Fast',
                  capacity: 'Large',
                  color: '#3b82f6',
                  details: 'Uses native memory outside the JVM heap via ByteBuffers. Objects must be serialized. No GC impact - ideal for large datasets.'
                },
                {
                  tier: 'Disk Tier',
                  speed: 'Moderate',
                  capacity: 'Very Large',
                  color: '#8b5cf6',
                  details: 'Persists data to local disk. Survives JVM restarts when configured as persistent. SSD strongly recommended for acceptable read latency.'
                }
              ].map((item, index) => (
                <div key={index} style={{
                  backgroundColor: '#1f2937',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: `2px solid ${item.color}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#d1d5db', margin: 0 }}>
                      {item.tier}
                    </h3>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      backgroundColor: item.color,
                      color: 'white',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {item.speed}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#9ca3af', margin: 0, lineHeight: '1.6' }}>
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Configuring Multi-Tier Caches
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Configure all three tiers together for maximum data capacity with optimal performance:
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import org.ehcache.CacheManager;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.CacheManagerBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.config.units.EntryUnit;
import org.ehcache.config.units.MemoryUnit;

public class TieredCacheConfig {

    public CacheManager createThreeTierCache() {
        return CacheManagerBuilder.newCacheManagerBuilder()
            // Required: set disk persistence directory
            .with(CacheManagerBuilder.persistence("/var/cache/ehcache"))
            .withCache("productCatalog",
                CacheConfigurationBuilder.newCacheConfigurationBuilder(
                    String.class, Product.class,
                    ResourcePoolsBuilder.newResourcePoolsBuilder()
                        // Tier 1: Heap - 1000 most-accessed entries
                        .heap(1000, EntryUnit.ENTRIES)
                        // Tier 2: Off-heap - 256 MB of warm data
                        .offheap(256, MemoryUnit.MB)
                        // Tier 3: Disk - 2 GB persistent storage
                        .disk(2, MemoryUnit.GB, true)))
            .build(true);
    }

    // Heap + Off-heap only (no disk)
    public CacheManager createTwoTierCache() {
        return CacheManagerBuilder.newCacheManagerBuilder()
            .withCache("sessionData",
                CacheConfigurationBuilder.newCacheConfigurationBuilder(
                    String.class, SessionInfo.class,
                    ResourcePoolsBuilder.newResourcePoolsBuilder()
                        .heap(500, EntryUnit.ENTRIES)
                        .offheap(128, MemoryUnit.MB)))
            .build(true);
    }

    // Heap-only cache (simplest, fastest)
    public CacheManager createHeapOnlyCache() {
        return CacheManagerBuilder.newCacheManagerBuilder()
            .withCache("lookupTable",
                CacheConfigurationBuilder.newCacheConfigurationBuilder(
                    String.class, String.class,
                    ResourcePoolsBuilder.heap(10000)))
            .build(true);
    }
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Sizing Strategies
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Proper tier sizing is critical for performance. Use these strategies based on your workload:
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.config.units.EntryUnit;
import org.ehcache.config.units.MemoryUnit;

public class SizingExamples {

    // Strategy 1: Entry-count based (heap only)
    // Best when all entries are roughly the same size
    ResourcePoolsBuilder entryCounted = ResourcePoolsBuilder
        .newResourcePoolsBuilder()
        .heap(5000, EntryUnit.ENTRIES);

    // Strategy 2: Memory-based sizing
    // Best when entry sizes vary; Ehcache tracks actual memory usage
    ResourcePoolsBuilder memorySized = ResourcePoolsBuilder
        .newResourcePoolsBuilder()
        .heap(10, MemoryUnit.MB)       // 10 MB on heap
        .offheap(200, MemoryUnit.MB);  // 200 MB off-heap

    // Strategy 3: Large dataset with persistence
    // For datasets that exceed RAM; disk tier prevents data loss on restart
    ResourcePoolsBuilder largePersistent = ResourcePoolsBuilder
        .newResourcePoolsBuilder()
        .heap(2000, EntryUnit.ENTRIES)     // Hot set on heap
        .offheap(1, MemoryUnit.GB)          // Warm set off-heap
        .disk(10, MemoryUnit.GB, true);     // Cold set on disk (persistent)

    // IMPORTANT sizing rules:
    // 1. Each tier must be larger than the one above it
    //    (off-heap > heap, disk > off-heap)
    // 2. Heap entry-count cannot exceed off-heap capacity
    // 3. Memory-sized heap requires a SizeOfEngine (slower puts)
    // 4. Off-heap and disk require objects to be Serializable
}`} />
            </div>

            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981',
              marginTop: '1rem'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>Rule of Thumb:</strong> Keep the heap tier at 10-20% of your working set for best GC behavior.
                Put 60-70% in off-heap and the remainder on disk. Monitor hit rates per tier and adjust accordingly.
              </p>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Custom Serializer for Off-Heap and Disk
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Off-heap and disk tiers require serialization. Replace the default Java serializer
              for better performance:
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import org.ehcache.spi.serialization.Serializer;
import org.ehcache.spi.serialization.SerializerException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.nio.ByteBuffer;

public class JacksonSerializer<T> implements Serializer<T> {

    private final ObjectMapper mapper = new ObjectMapper();
    private final Class<T> type;

    public JacksonSerializer(Class<T> type) {
        this.type = type;
    }

    @Override
    public ByteBuffer serialize(T object) throws SerializerException {
        try {
            byte[] bytes = mapper.writeValueAsBytes(object);
            return ByteBuffer.wrap(bytes);
        } catch (Exception e) {
            throw new SerializerException(e);
        }
    }

    @Override
    public T read(ByteBuffer binary) throws SerializerException {
        try {
            byte[] bytes = new byte[binary.remaining()];
            binary.get(bytes);
            return mapper.readValue(bytes, type);
        } catch (Exception e) {
            throw new SerializerException(e);
        }
    }

    @Override
    public boolean equals(T object, ByteBuffer binary)
            throws SerializerException {
        return object.equals(read(binary));
    }
}

// Register the custom serializer with the cache
// CacheConfigurationBuilder.newCacheConfigurationBuilder(
//     String.class, Product.class, resourcePools)
//     .withValueSerializer(new JacksonSerializer<>(Product.class))`} />
            </div>
          </div>
        </div>
      )}

      {/* Expiry & Eviction Section */}
      {activeSection === 'expiry-eviction' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Expiry Policies
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Expiry determines when cached entries become stale and eligible for removal.
              Ehcache supports Time-to-Live (TTL), Time-to-Idle (TTI), and fully custom expiry policies.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ExpiryPolicyBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;

import java.time.Duration;

public class ExpiryConfig {

    // Time-to-Live (TTL): entry expires a fixed time after CREATION
    // Regardless of how often it is accessed
    CacheConfigurationBuilder<String, String> ttlCache =
        CacheConfigurationBuilder.newCacheConfigurationBuilder(
            String.class, String.class,
            ResourcePoolsBuilder.heap(1000))
        .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(
            Duration.ofMinutes(30)));

    // Time-to-Idle (TTI): entry expires after a period of NO ACCESS
    // Each read or write resets the idle timer
    CacheConfigurationBuilder<String, String> ttiCache =
        CacheConfigurationBuilder.newCacheConfigurationBuilder(
            String.class, String.class,
            ResourcePoolsBuilder.heap(1000))
        .withExpiry(ExpiryPolicyBuilder.timeToIdleExpiration(
            Duration.ofMinutes(10)));

    // No expiry: entries live until evicted or explicitly removed
    CacheConfigurationBuilder<String, String> noExpiryCache =
        CacheConfigurationBuilder.newCacheConfigurationBuilder(
            String.class, String.class,
            ResourcePoolsBuilder.heap(1000))
        .withExpiry(ExpiryPolicyBuilder.noExpiration());
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Custom ExpiryPolicy
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Implement a custom ExpiryPolicy for per-entry, business-rule-driven expiration:
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import org.ehcache.expiry.ExpiryPolicy;

import java.time.Duration;
import java.util.function.Supplier;

public class PriorityBasedExpiry implements ExpiryPolicy<String, CachedItem> {

    @Override
    public Duration getExpiryForCreation(String key,
            CachedItem value) {
        // High-priority items live longer
        switch (value.getPriority()) {
            case HIGH:   return Duration.ofHours(24);
            case MEDIUM: return Duration.ofHours(4);
            case LOW:    return Duration.ofMinutes(30);
            default:     return Duration.ofHours(1);
        }
    }

    @Override
    public Duration getExpiryForAccess(String key,
            Supplier<? extends CachedItem> value) {
        // Reset TTI on each access based on priority
        CachedItem item = value.get();
        if (item.getPriority() == Priority.HIGH) {
            return Duration.ofHours(24);  // Extend TTL on access
        }
        return null;  // null = keep current expiry unchanged
    }

    @Override
    public Duration getExpiryForUpdate(String key,
            Supplier<? extends CachedItem> oldValue,
            CachedItem newValue) {
        // On update, recalculate based on new value
        return getExpiryForCreation(key, newValue);
    }
}

// Register:
// .withExpiry(new PriorityBasedExpiry())`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Eviction Policies
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Eviction occurs when a tier reaches capacity and needs to make room for new entries.
              Ehcache uses different eviction algorithms depending on the tier:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { policy: 'LRU (Least Recently Used)', desc: 'Default for heap tier. Evicts the entry that has not been accessed for the longest time. Works well for most workloads.', color: '#10b981' },
                { policy: 'LFU (Least Frequently Used)', desc: 'Available for heap tier. Evicts the entry with the fewest accesses. Better when some entries are consistently popular.', color: '#3b82f6' },
                { policy: 'FIFO (First In, First Out)', desc: 'Evicts the oldest entry regardless of access patterns. Useful for time-series or append-only data.', color: '#8b5cf6' }
              ].map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1rem',
                  backgroundColor: '#1f2937',
                  borderRadius: '8px',
                  border: '1px solid #374151',
                  borderLeft: `4px solid ${item.color}`
                }}>
                  <div style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: item.color,
                    color: 'white',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.policy}
                  </div>
                  <p style={{ fontSize: '0.95rem', color: '#9ca3af', margin: 0, lineHeight: '1.6' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>Note:</strong> Off-heap and disk tiers always use an internal algorithm optimized for their
                storage medium. You cannot configure the eviction policy for non-heap tiers.
              </p>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Cache Event Listeners
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Register listeners to react to cache events such as creation, update, removal, eviction, and expiry:
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import org.ehcache.event.CacheEvent;
import org.ehcache.event.CacheEventListener;
import org.ehcache.event.EventType;
import org.ehcache.config.builders.CacheEventListenerConfigurationBuilder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class CacheLogger implements CacheEventListener<Object, Object> {

    private static final Logger log = LoggerFactory.getLogger(CacheLogger.class);

    @Override
    public void onEvent(CacheEvent<?, ?> event) {
        switch (event.getType()) {
            case CREATED:
                log.info("Cache CREATED - key={}", event.getKey());
                break;
            case UPDATED:
                log.info("Cache UPDATED - key={}, old={}, new={}",
                    event.getKey(), event.getOldValue(), event.getNewValue());
                break;
            case REMOVED:
                log.info("Cache REMOVED - key={}", event.getKey());
                break;
            case EXPIRED:
                log.warn("Cache EXPIRED - key={}", event.getKey());
                break;
            case EVICTED:
                log.warn("Cache EVICTED - key={} (capacity reached)",
                    event.getKey());
                break;
        }
    }
}

// Register the listener on a cache
// CacheConfigurationBuilder.newCacheConfigurationBuilder(
//     String.class, String.class, ResourcePoolsBuilder.heap(100))
//     .withService(CacheEventListenerConfigurationBuilder
//         .newEventListenerConfiguration(new CacheLogger(),
//             EventType.CREATED, EventType.UPDATED,
//             EventType.REMOVED, EventType.EXPIRED,
//             EventType.EVICTED)
//         .unordered()          // Events delivered without ordering guarantees
//         .asynchronous())      // Non-blocking event delivery`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Cache-Through (Loader/Writer) Pattern
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Ehcache supports read-through and write-through patterns using CacheLoaderWriter,
              automatically loading from and writing to the backend data source:
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import org.ehcache.spi.loaderwriter.CacheLoaderWriter;

public class DatabaseCacheLoaderWriter
        implements CacheLoaderWriter<Long, User> {

    private final UserRepository repository;

    public DatabaseCacheLoaderWriter(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public User load(Long key) throws Exception {
        // Called on cache miss - load from database
        return repository.findById(key).orElse(null);
    }

    @Override
    public void write(Long key, User value) throws Exception {
        // Called on cache put - write to database
        repository.save(value);
    }

    @Override
    public void delete(Long key) throws Exception {
        // Called on cache remove - delete from database
        repository.deleteById(key);
    }
}

// Configure cache-through:
// CacheConfigurationBuilder.newCacheConfigurationBuilder(
//     Long.class, User.class, ResourcePoolsBuilder.heap(1000))
//     .withLoaderWriter(new DatabaseCacheLoaderWriter(userRepo))
//     .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(
//         Duration.ofMinutes(15)))`} />
            </div>
          </div>
        </div>
      )}

      {/* Clustering Section */}
      {activeSection === 'clustering' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Distributed Caching with Terracotta Server
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Ehcache can scale beyond a single JVM using the Terracotta Server Array as a distributed
              cache backend. The Terracotta server acts as a central cache store that multiple Ehcache
              clients connect to, providing shared state across your application cluster.
            </p>
            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981',
              marginBottom: '1rem'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>Architecture:</strong> Each application JVM runs an Ehcache client that communicates with
                the Terracotta server. Local heap and off-heap tiers act as near-caches for low-latency reads,
                while the server tier provides the shared, durable cache layer.
              </p>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
              Maven Dependency for Clustering
            </h3>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// build.gradle - add the clustering module
dependencies {
    implementation "org.ehcache:ehcache:3.10.8"
    implementation "org.ehcache:ehcache-clustered:3.10.8"
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Clustered Cache Configuration
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Configure Ehcache to connect to a Terracotta server and create clustered caches:
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import org.ehcache.CacheManager;
import org.ehcache.clustered.client.config.builders.ClusteredResourcePoolBuilder;
import org.ehcache.clustered.client.config.builders.ClusteringServiceConfigurationBuilder;
import org.ehcache.clustered.common.Consistency;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.CacheManagerBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.config.units.EntryUnit;
import org.ehcache.config.units.MemoryUnit;

import java.net.URI;

public class ClusteredCacheConfig {

    public CacheManager createClusteredCacheManager() {
        // Connect to Terracotta server
        CacheManager cacheManager = CacheManagerBuilder
            .newCacheManagerBuilder()
            .with(ClusteringServiceConfigurationBuilder
                .cluster(URI.create(
                    "terracotta://terracotta-host:9410/my-cache-manager"))
                .autoCreateOnReconnect()
                .defaultServerResource("primary-server-resource")
                .resourcePool("shared-pool-a", 128, MemoryUnit.MB,
                    "primary-server-resource")
                .resourcePool("shared-pool-b", 64, MemoryUnit.MB))
            .withCache("clusteredCache",
                CacheConfigurationBuilder.newCacheConfigurationBuilder(
                    String.class, String.class,
                    ResourcePoolsBuilder.newResourcePoolsBuilder()
                        // Local heap tier for near-cache
                        .heap(1000, EntryUnit.ENTRIES)
                        // Clustered tier on Terracotta server
                        .with(ClusteredResourcePoolBuilder
                            .clusteredShared("shared-pool-a"))))
            .build(true);

        return cacheManager;
    }

    // Dedicated clustered resource (not shared)
    public CacheManager createDedicatedClusteredCache() {
        return CacheManagerBuilder.newCacheManagerBuilder()
            .with(ClusteringServiceConfigurationBuilder
                .cluster(URI.create(
                    "terracotta://terracotta-host:9410/dedicated-mgr"))
                .autoCreateOnReconnect()
                .defaultServerResource("primary-server-resource"))
            .withCache("dedicatedCache",
                CacheConfigurationBuilder.newCacheConfigurationBuilder(
                    Long.class, String.class,
                    ResourcePoolsBuilder.newResourcePoolsBuilder()
                        .heap(500, EntryUnit.ENTRIES)
                        .with(ClusteredResourcePoolBuilder
                            .clusteredDedicated(
                                "primary-server-resource",
                                256, MemoryUnit.MB))))
            .build(true);
    }
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Consistency Modes
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Choose between strong and eventual consistency based on your application requirements:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                {
                  mode: 'Strong Consistency',
                  desc: 'All clients see the same value at the same time. Writes are synchronous to the server. Higher latency but guarantees no stale reads.',
                  use: 'Financial data, inventory counts, user sessions',
                  color: '#10b981'
                },
                {
                  mode: 'Eventual Consistency',
                  desc: 'Clients may temporarily see stale data after a write. Writes are asynchronous, providing lower latency and higher throughput.',
                  use: 'Product catalogs, content caches, recommendations',
                  color: '#f59e0b'
                }
              ].map((item, index) => (
                <div key={index} style={{
                  backgroundColor: '#1f2937',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: `2px solid ${item.color}`
                }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#d1d5db', marginBottom: '0.5rem' }}>
                    {item.mode}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#9ca3af', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                    {item.desc}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#6ee7b7', margin: 0 }}>
                    <strong>Use cases:</strong> {item.use}
                  </p>
                </div>
              ))}
            </div>

            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import org.ehcache.clustered.common.Consistency;
import org.ehcache.clustered.client.config.builders.ClusteredStoreConfigurationBuilder;

// Strong consistency - all nodes see the latest write
CacheConfigurationBuilder<String, String> strongConfig =
    CacheConfigurationBuilder.newCacheConfigurationBuilder(
        String.class, String.class,
        ResourcePoolsBuilder.newResourcePoolsBuilder()
            .heap(500, EntryUnit.ENTRIES)
            .with(ClusteredResourcePoolBuilder
                .clusteredShared("shared-pool-a")))
    .withService(ClusteredStoreConfigurationBuilder
        .withConsistency(Consistency.STRONG));

// Eventual consistency - higher throughput, async replication
CacheConfigurationBuilder<String, String> eventualConfig =
    CacheConfigurationBuilder.newCacheConfigurationBuilder(
        String.class, String.class,
        ResourcePoolsBuilder.newResourcePoolsBuilder()
            .heap(500, EntryUnit.ENTRIES)
            .with(ClusteredResourcePoolBuilder
                .clusteredShared("shared-pool-b")))
    .withService(ClusteredStoreConfigurationBuilder
        .withConsistency(Consistency.EVENTUAL));`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1.5rem' }}>
              Active-Passive Failover
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Terracotta Server supports active-passive mode for high availability. If the active server
              fails, the passive server takes over automatically with zero data loss.
            </p>
            <div style={{
              backgroundColor: '#1f2937',
              color: '#e5e7eb',
              padding: '1.5rem',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              overflowX: 'auto',
              border: '1px solid #374151',
              marginBottom: '1.5rem'
            }}>
              <pre style={{ margin: 0 }}>{`<!-- tc-config.xml - Terracotta Server configuration -->
<tc-config xmlns="http://www.terracotta.org/config">
  <plugins>
    <config>
      <ohr:offheap-resources
          xmlns:ohr="http://www.terracotta.org/config/offheap-resource">
        <ohr:resource name="primary-server-resource"
                      unit="MB">512</ohr:resource>
      </ohr:offheap-resources>
    </config>
  </plugins>

  <servers>
    <!-- Active server -->
    <server host="tc-server-1" name="active">
      <logs>/var/log/terracotta/active</logs>
      <tsa-port>9410</tsa-port>
      <tsa-group-port>9430</tsa-group-port>
    </server>

    <!-- Passive server (standby) -->
    <server host="tc-server-2" name="passive">
      <logs>/var/log/terracotta/passive</logs>
      <tsa-port>9410</tsa-port>
      <tsa-group-port>9430</tsa-group-port>
    </server>

    <!-- Reconnect window after failover -->
    <client-reconnect-window>120</client-reconnect-window>
  </servers>
</tc-config>`}</pre>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '1rem' }}>
              Client Reconnection Handling
            </h3>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import org.ehcache.CacheManager;
import org.ehcache.clustered.client.config.builders.ClusteringServiceConfigurationBuilder;
import org.ehcache.clustered.client.config.builders.TimeoutsBuilder;
import org.ehcache.config.builders.CacheManagerBuilder;

import java.net.URI;
import java.time.Duration;

public class FailoverConfig {

    public CacheManager createResilientClusteredCache() {
        return CacheManagerBuilder.newCacheManagerBuilder()
            .with(ClusteringServiceConfigurationBuilder
                .cluster(URI.create(
                    // Specify both active and passive servers
                    "terracotta://tc-server-1:9410,tc-server-2:9410"
                    + "/resilient-cache-manager"))
                .autoCreateOnReconnect()
                .timeouts(TimeoutsBuilder.timeouts()
                    // Max time to wait for read from server
                    .read(Duration.ofSeconds(5))
                    // Max time to wait for write to server
                    .write(Duration.ofSeconds(10))
                    // Max time to wait for initial connection
                    .connection(Duration.ofSeconds(30)))
                .defaultServerResource("primary-server-resource")
                .resourcePool("ha-pool", 256, MemoryUnit.MB))
            .build(true);

        // When the active server fails:
        // 1. Passive detects failure and promotes itself to active
        // 2. Clients automatically reconnect to the new active
        // 3. No data is lost (passive has full replica)
        // 4. Operations resume after reconnection
    }
}`} />
            </div>

            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981',
              marginTop: '1rem'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>Production Tip:</strong> Place active and passive Terracotta servers in different
                availability zones or racks. Monitor server health with Terracotta Management Console (TMC)
                and set up alerts for failover events.
              </p>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  )
}

export default Ehcache
