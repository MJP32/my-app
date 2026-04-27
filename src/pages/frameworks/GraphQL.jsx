import { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb'

const SyntaxHighlighter = ({ code }) => {
  const highlightCode = (code) => {
    let highlighted = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    const protectedContent = []
    let placeholder = 0

    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$)/gm, (match) => {
      const id = `___COMMENT_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #6a9955; font-style: italic;">${match}</span>` })
      return id
    })

    highlighted = highlighted.replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, (match) => {
      const id = `___STRING_${placeholder++}___`
      protectedContent.push({ id, replacement: `<span style="color: #ce9178;">${match}</span>` })
      return id
    })

    highlighted = highlighted
      .replace(/\b(import|export|from|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|const|let|var|function|async|await|yield|of|in|typeof|instanceof|void|default|static|get|set|constructor|super|this|null|undefined|readonly|abstract|declare|public|private|protected|as|type|enum|namespace|module|input|schema|query|mutation|subscription|fragment|on)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|number|string|boolean|any|never|unknown|object|void|null|undefined|Int|Float|String|Boolean|ID)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(Component|NgModule|Injectable|Input|Output|EventEmitter|OnInit|OnDestroy|Observable|Subject|BehaviorSubject|Subscription|HttpClient|HttpHeaders|Apollo|Query|Mutation|Resolver|Args|Context|Field|ObjectType|InputType|ArgsType|ResolveField|Parent|GraphQLModule|ApolloServer|ApolloClient|InMemoryCache|HttpLink|ApolloModule|SchemaMapping|QueryMapping|MutationMapping|Controller|Service|Autowired|Repository|Entity|Table|Column|GeneratedValue|ManyToOne|OneToMany|JoinColumn|DataFetchingEnvironment|GraphQLSchema|RuntimeWiring|TypeDefinitionRegistry)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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
      <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
    </pre>
  )
}

function GraphQL({ onBack, breadcrumb }) {
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
            background: 'rgba(229, 53, 171, 0.2)',
            color: '#f9a8d4',
            border: '1px solid rgba(229, 53, 171, 0.4)',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(229, 53, 171, 0.4)'
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(229, 53, 171, 0.2)'
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
        background: 'linear-gradient(to right, #e535ab, #f06292)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        GraphQL
      </h1>
      <p style={{ color: '#d1d5db', textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem' }}>
        A query language for APIs that gives clients the power to ask for exactly what they need
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
          { id: 'schema & types', label: 'Schema & Types' },
          { id: 'queries & mutations', label: 'Queries & Mutations' },
          { id: 'spring boot backend', label: 'Spring Boot Backend' },
          { id: 'frontend clients', label: 'Frontend Clients' },
          { id: 'advanced', label: 'Advanced' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            style={{
              padding: '0.75rem 1.25rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              backgroundColor: activeSection === tab.id ? '#e535ab' : 'transparent',
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
              What is GraphQL?
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              GraphQL is a query language and runtime for APIs developed by Facebook. Unlike REST, where the server decides the response shape, GraphQL lets the client specify exactly which fields it needs. This solves over-fetching (getting more data than needed) and under-fetching (needing multiple requests to assemble data).
            </p>
            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981',
              marginBottom: '1rem'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>Key Idea:</strong> One endpoint, one request. The client sends a query describing the exact data shape, and the server responds with exactly that &mdash; nothing more, nothing less.
              </p>
            </div>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// REST approach: multiple requests, over-fetching
// GET /api/users/1           -> { id, name, email, address, phone, ... }
// GET /api/users/1/orders    -> [{ id, total, items, shipping, ... }]
// GET /api/users/1/reviews   -> [{ id, rating, comment, product, ... }]
// Problem: 3 round trips, lots of unused fields

// GraphQL approach: one request, exact data
// POST /graphql
{
  user(id: 1) {
    name
    email
    orders(last: 5) {
      total
      items { name price }
    }
    reviews {
      rating
      comment
    }
  }
}
// Result: exactly the fields requested, single round trip`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              REST vs GraphQL Comparison
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                backgroundColor: '#1e293b',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #475569'
              }}>
                <h4 style={{ color: '#60a5fa', marginBottom: '0.75rem', fontSize: '1.1rem' }}>REST</h4>
                <ul style={{ color: '#9ca3af', lineHeight: '1.8', paddingLeft: '1.25rem', margin: 0 }}>
                  <li>Multiple endpoints (GET /users, /orders)</li>
                  <li>Server decides response shape</li>
                  <li>Versioning needed (v1, v2)</li>
                  <li>HTTP caching built-in (GET)</li>
                  <li>Simple to understand and debug</li>
                  <li>File uploads straightforward</li>
                  <li>Well-suited for CRUD operations</li>
                </ul>
              </div>
              <div style={{
                backgroundColor: '#1e293b',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #475569'
              }}>
                <h4 style={{ color: '#e535ab', marginBottom: '0.75rem', fontSize: '1.1rem' }}>GraphQL</h4>
                <ul style={{ color: '#9ca3af', lineHeight: '1.8', paddingLeft: '1.25rem', margin: 0 }}>
                  <li>Single endpoint (POST /graphql)</li>
                  <li>Client decides response shape</li>
                  <li>Schema evolves without versioning</li>
                  <li>Requires custom caching strategy</li>
                  <li>Self-documenting via introspection</li>
                  <li>Real-time via subscriptions</li>
                  <li>Ideal for complex, nested data</li>
                </ul>
              </div>
            </div>
            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>When to choose GraphQL:</strong> Mobile apps with bandwidth constraints, dashboards combining data from multiple sources, rapidly evolving frontends, microservice aggregation layers (BFF pattern). Stick with REST for simple CRUD APIs, file-heavy services, or when HTTP caching is critical.
              </p>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Core Concepts
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              GraphQL has three operation types: queries (read), mutations (write), and subscriptions (real-time). All operations go through a single endpoint and are validated against a strongly-typed schema.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// QUERY - read data (like GET)
query {
  products(category: "electronics", limit: 10) {
    id
    name
    price
    reviews { rating }
  }
}

// MUTATION - write data (like POST/PUT/DELETE)
mutation {
  createProduct(input: { name: "Laptop", price: 999.99, category: "electronics" }) {
    id
    name
  }
}

// SUBSCRIPTION - real-time updates (WebSocket)
subscription {
  orderStatusChanged(orderId: "123") {
    status
    updatedAt
  }
}

// FRAGMENT - reusable field sets
fragment ProductFields on Product {
  id
  name
  price
  category
}

query {
  featured: products(featured: true) { ...ProductFields }
  newArrivals: products(sort: NEWEST) { ...ProductFields reviews { rating } }
}`} />
            </div>
          </div>
        </div>
      )}

      {/* Schema & Types Section */}
      {activeSection === 'schema & types' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Schema Definition Language (SDL)
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              The schema is the contract between client and server. It defines all types, fields, and operations available in the API. GraphQL uses a strong type system &mdash; every field has a defined type and the server validates all queries against the schema before execution.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`# schema.graphqls

# Scalar types: Int, Float, String, Boolean, ID
# ! means non-nullable, [] means list

# Object types - define the shape of data
type Product {
  id: ID!
  name: String!
  price: Float!
  category: Category!
  description: String
  inStock: Boolean!
  reviews: [Review!]!        # non-null list of non-null Reviews
  createdAt: String!
}

type Review {
  id: ID!
  rating: Int!               # 1-5
  comment: String
  author: User!
  product: Product!
}

type User {
  id: ID!
  name: String!
  email: String!
  orders: [Order!]!
}

type Order {
  id: ID!
  items: [OrderItem!]!
  total: Float!
  status: OrderStatus!
  createdAt: String!
}

type OrderItem {
  product: Product!
  quantity: Int!
  price: Float!
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Enums, Inputs &amp; Custom Scalars
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Enums restrict values to a defined set. Input types are used for mutation arguments. Custom scalars handle special data types like dates and JSON.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`# Enums - fixed set of values
enum Category {
  ELECTRONICS
  CLOTHING
  BOOKS
  FOOD
}

enum OrderStatus {
  PENDING
  CONFIRMED
  SHIPPED
  DELIVERED
  CANCELLED
}

enum SortOrder {
  PRICE_ASC
  PRICE_DESC
  NEWEST
  RATING
}

# Input types - used for mutation arguments
input CreateProductInput {
  name: String!
  price: Float!
  category: Category!
  description: String
}

input UpdateProductInput {
  name: String
  price: Float
  category: Category
  description: String
}

input ProductFilter {
  category: Category
  minPrice: Float
  maxPrice: Float
  inStock: Boolean
  search: String
}

# Custom scalar for dates
scalar DateTime
scalar JSON

# Pagination wrapper - reusable pattern
type ProductPage {
  content: [Product!]!
  totalElements: Int!
  totalPages: Int!
  currentPage: Int!
  hasNext: Boolean!
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Root Operations &amp; Interfaces
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              The Query and Mutation types are the entry points to the API. Interfaces and union types enable polymorphism in the schema.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`# Root Query - all read operations
type Query {
  # Single item lookups
  product(id: ID!): Product
  user(id: ID!): User
  order(id: ID!): Order

  # Lists with filtering and pagination
  products(
    filter: ProductFilter
    sort: SortOrder = NEWEST
    page: Int = 0
    size: Int = 10
  ): ProductPage!

  # Search across types
  search(query: String!): [SearchResult!]!
}

# Root Mutation - all write operations
type Mutation {
  createProduct(input: CreateProductInput!): Product!
  updateProduct(id: ID!, input: UpdateProductInput!): Product!
  deleteProduct(id: ID!): Boolean!

  createOrder(items: [OrderItemInput!]!): Order!
  cancelOrder(id: ID!): Order!

  addReview(productId: ID!, rating: Int!, comment: String): Review!
}

# Subscription - real-time events
type Subscription {
  orderStatusChanged(orderId: ID!): Order!
  productPriceDropped(category: Category): Product!
}

# Interface - shared fields across types
interface Node {
  id: ID!
  createdAt: DateTime!
}

# Union type - search returns different types
union SearchResult = Product | User | Order

# Implementing interfaces
type Product implements Node {
  id: ID!
  createdAt: DateTime!
  name: String!
  price: Float!
}`} />
            </div>
          </div>
        </div>
      )}

      {/* Queries & Mutations Section */}
      {activeSection === 'queries & mutations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Query Operations
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Queries fetch data from the server. They support variables for dynamic values, aliases for renaming fields, and can request nested data in a single round trip.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// Simple query
query {
  product(id: "42") {
    name
    price
  }
}

// Query with variables (parameterized, reusable)
query GetProduct($id: ID!) {
  product(id: $id) {
    name
    price
    category
    reviews {
      rating
      comment
      author { name }
    }
  }
}
// Variables: { "id": "42" }

// Query with aliases - rename fields in response
query CompareProducts {
  laptop: product(id: "1") { name price }
  phone: product(id: "2") { name price }
}
// Returns: { "laptop": { ... }, "phone": { ... } }

// Paginated query with filtering
query SearchProducts($filter: ProductFilter, $page: Int) {
  products(filter: $filter, sort: PRICE_ASC, page: $page, size: 20) {
    content {
      id
      name
      price
      reviews { rating }
    }
    totalPages
    hasNext
  }
}
// Variables: { "filter": { "category": "ELECTRONICS", "maxPrice": 500 }, "page": 0 }

// Multiple queries in one request
query Dashboard {
  featuredProducts: products(filter: { inStock: true }, sort: RATING, size: 5) {
    content { id name price }
  }
  recentOrders: orders(last: 10) {
    id total status createdAt
  }
  stats {
    totalUsers
    totalRevenue
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
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Mutation Operations
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Mutations modify server-side data and return the updated result. They execute sequentially (unlike queries which can execute in parallel), ensuring predictable side effects.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// Create
mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    id
    name
    price
  }
}
// Variables: { "input": { "name": "Wireless Mouse", "price": 29.99, "category": "ELECTRONICS" } }

// Update
mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
  updateProduct(id: $id, input: $input) {
    id
    name
    price
  }
}
// Variables: { "id": "42", "input": { "price": 24.99 } }

// Delete
mutation DeleteProduct($id: ID!) {
  deleteProduct(id: $id)
}

// Multiple mutations (execute sequentially)
mutation PlaceOrder {
  order: createOrder(items: [
    { productId: "1", quantity: 2 },
    { productId: "5", quantity: 1 }
  ]) {
    id
    total
    status
    items {
      product { name }
      quantity
      price
    }
  }
}

// Mutation with error handling pattern
mutation AddReview($productId: ID!, $rating: Int!, $comment: String) {
  addReview(productId: $productId, rating: $rating, comment: $comment) {
    id
    rating
    comment
    product {
      reviews { rating }  # get updated review list back
    }
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
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Error Handling
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              GraphQL always returns HTTP 200, even on errors. Errors are reported in a separate &quot;errors&quot; array alongside partial data. This allows parts of a query to succeed even if other parts fail.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// GraphQL error response (HTTP 200)
{
  "data": {
    "product": {
      "name": "Laptop",
      "price": 999.99
    },
    "reviews": null         // this field failed
  },
  "errors": [
    {
      "message": "Not authorized to view reviews",
      "locations": [{ "line": 5, "column": 3 }],
      "path": ["reviews"],
      "extensions": {
        "code": "FORBIDDEN",
        "classification": "AUTHORIZATION"
      }
    }
  ]
}

// Spring Boot - custom error handling
@Controller
public class ProductController {

  @QueryMapping
  public Product product(@Argument Long id) {
    return productRepository.findById(id)
      .orElseThrow(() -> new GraphQLException("Product not found"));
  }
}

// Custom exception with error classification
public class GraphQLException extends RuntimeException {
  private final ErrorType errorType;

  public GraphQLException(String message) {
    super(message);
    this.errorType = ErrorType.NOT_FOUND;
  }
}

// DataFetcherExceptionResolver for global error handling
@Component
public class CustomExceptionResolver extends DataFetcherExceptionResolverAdapter {
  @Override
  protected GraphQLError resolveToSingleError(Throwable ex, DataFetchingEnvironment env) {
    if (ex instanceof GraphQLException) {
      return GraphqlErrorBuilder.newError(env)
        .message(ex.getMessage())
        .errorType(ErrorType.NOT_FOUND)
        .build();
    }
    return GraphqlErrorBuilder.newError(env)
      .message("Internal server error")
      .errorType(ErrorType.INTERNAL_ERROR)
      .build();
  }
}`} />
            </div>
          </div>
        </div>
      )}

      {/* Spring Boot Backend Section */}
      {activeSection === 'spring boot backend' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Spring for GraphQL Setup
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Spring Boot has first-class GraphQL support via the <code style={{ color: '#e535ab' }}>spring-boot-starter-graphql</code> dependency. Define your schema in <code style={{ color: '#e535ab' }}>.graphqls</code> files and implement resolvers as annotated controller methods.
            </p>
            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981',
              marginBottom: '1rem'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>Schema-first:</strong> Spring for GraphQL follows a schema-first approach. You write the schema in SDL, then implement Java resolvers that map to each field. The framework validates that every schema field has a resolver.
              </p>
            </div>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// build.gradle
// dependencies {
//   implementation 'org.springframework.boot:spring-boot-starter-graphql'
//   implementation 'org.springframework.boot:spring-boot-starter-web'
//   implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
//   testImplementation 'org.springframework.graphql:spring-graphql-test'
// }

// application.yml
// spring:
//   graphql:
//     graphiql:
//       enabled: true          # GraphiQL IDE at /graphiql
//     schema:
//       printer:
//         enabled: true        # Schema endpoint at /graphql/schema
//     path: /graphql
//     cors:
//       allowed-origins: "http://localhost:4200, http://localhost:3000"

// Entity
@Entity
@Table(name = "products")
public class Product {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private double price;

  @Enumerated(EnumType.STRING)
  private Category category;

  private String description;
  private boolean inStock = true;

  @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
  private List<Review> reviews;

  // constructors, getters, setters
}

// Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
  Page<Product> findByCategory(Category category, Pageable pageable);
  List<Product> findByNameContainingIgnoreCase(String name);
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Query &amp; Mutation Resolvers
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Use <code style={{ color: '#e535ab' }}>@QueryMapping</code> and <code style={{ color: '#e535ab' }}>@MutationMapping</code> to wire Java methods to schema operations. Method names must match the schema field names.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@Controller
public class ProductController {

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private ReviewRepository reviewRepository;

  // Maps to: Query.product(id: ID!): Product
  @QueryMapping
  public Product product(@Argument Long id) {
    return productRepository.findById(id)
      .orElseThrow(() -> new RuntimeException("Product not found: " + id));
  }

  // Maps to: Query.products(filter, sort, page, size): ProductPage
  @QueryMapping
  public ProductPage products(
      @Argument ProductFilter filter,
      @Argument SortOrder sort,
      @Argument int page,
      @Argument int size) {

    Pageable pageable = PageRequest.of(page, size, toSort(sort));
    Page<Product> result;

    if (filter != null && filter.getCategory() != null) {
      result = productRepository.findByCategory(filter.getCategory(), pageable);
    } else {
      result = productRepository.findAll(pageable);
    }
    return new ProductPage(result);
  }

  // Maps to: Mutation.createProduct(input): Product!
  @MutationMapping
  public Product createProduct(@Argument CreateProductInput input) {
    Product product = new Product();
    product.setName(input.getName());
    product.setPrice(input.getPrice());
    product.setCategory(input.getCategory());
    product.setDescription(input.getDescription());
    return productRepository.save(product);
  }

  // Maps to: Mutation.updateProduct(id, input): Product!
  @MutationMapping
  public Product updateProduct(@Argument Long id, @Argument UpdateProductInput input) {
    Product product = productRepository.findById(id).orElseThrow();
    if (input.getName() != null) product.setName(input.getName());
    if (input.getPrice() != null) product.setPrice(input.getPrice());
    if (input.getCategory() != null) product.setCategory(input.getCategory());
    return productRepository.save(product);
  }

  // Maps to: Mutation.deleteProduct(id): Boolean!
  @MutationMapping
  public boolean deleteProduct(@Argument Long id) {
    productRepository.deleteById(id);
    return true;
  }

  // Nested resolver - only called when client requests "reviews" field
  @SchemaMapping(typeName = "Product", field = "reviews")
  public List<Review> reviews(Product product) {
    return reviewRepository.findByProductId(product.getId());
  }

  private Sort toSort(SortOrder sortOrder) {
    return switch (sortOrder) {
      case PRICE_ASC  -> Sort.by("price").ascending();
      case PRICE_DESC -> Sort.by("price").descending();
      case RATING     -> Sort.by("averageRating").descending();
      default         -> Sort.by("createdAt").descending();
    };
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
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              N+1 Problem &amp; DataLoader
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              The N+1 problem occurs when fetching a list of items and then individually loading related data for each item. DataLoader batches these individual loads into a single query.
            </p>
            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981',
              marginBottom: '1rem'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>N+1 example:</strong> Querying 50 products with reviews runs 1 query for products + 50 queries for reviews = 51 queries. DataLoader batches it into 1 + 1 = 2 queries.
              </p>
            </div>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// Without DataLoader: N+1 problem
// Query: { products { name reviews { rating } } }
// SQL: SELECT * FROM products                    -- 1 query
//      SELECT * FROM reviews WHERE product_id=1  -- N queries
//      SELECT * FROM reviews WHERE product_id=2
//      ... (one per product)

// With BatchMapping: Spring batches automatically
@Controller
public class ProductController {

  @Autowired
  private ReviewRepository reviewRepository;

  // @BatchMapping replaces @SchemaMapping for lists
  // Spring collects all Product parents, calls this ONCE
  @BatchMapping
  public Map<Product, List<Review>> reviews(List<Product> products) {
    List<Long> productIds = products.stream()
      .map(Product::getId)
      .toList();

    // Single query: SELECT * FROM reviews WHERE product_id IN (1,2,3,...)
    List<Review> allReviews = reviewRepository.findByProductIdIn(productIds);

    // Group reviews by product
    Map<Long, List<Review>> reviewsByProductId = allReviews.stream()
      .collect(Collectors.groupingBy(r -> r.getProduct().getId()));

    // Return map keyed by Product objects (same order as input)
    return products.stream()
      .collect(Collectors.toMap(
        p -> p,
        p -> reviewsByProductId.getOrDefault(p.getId(), List.of())
      ));
  }
}

// For more control: register a DataLoader manually
@Configuration
public class DataLoaderConfig {

  @Bean
  public BatchLoaderRegistry batchLoaderRegistry(ReviewRepository repo) {
    return (registry) -> {
      registry.forTypePair(Long.class, List.class)
        .registerMappedBatchLoader((productIds, env) -> {
          Map<Long, List<Review>> map = repo.findByProductIdIn(productIds)
            .stream()
            .collect(Collectors.groupingBy(r -> r.getProduct().getId()));
          return Mono.just(map);
        });
    };
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
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Security &amp; Authorization
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Secure GraphQL endpoints with Spring Security. Apply authorization at the resolver level since all operations hit a single endpoint.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@Configuration
@EnableMethodSecurity
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
      .csrf(c -> c.disable())
      .authorizeHttpRequests(auth -> auth
        .requestMatchers("/graphiql/**").permitAll()  // allow GraphiQL in dev
        .requestMatchers("/graphql").authenticated()
        .anyRequest().authenticated()
      )
      .oauth2ResourceServer(o -> o.jwt(Customizer.withDefaults()))
      .build();
  }
}

// Field-level authorization in resolvers
@Controller
public class OrderController {

  // Only authenticated users
  @QueryMapping
  @PreAuthorize("isAuthenticated()")
  public List<Order> myOrders() {
    String userId = SecurityContextHolder.getContext()
      .getAuthentication().getName();
    return orderRepository.findByUserId(userId);
  }

  // Admin only
  @MutationMapping
  @PreAuthorize("hasRole('ADMIN')")
  public boolean deleteProduct(@Argument Long id) {
    productRepository.deleteById(id);
    return true;
  }

  // Access current user via @AuthenticationPrincipal
  @QueryMapping
  public User me(@AuthenticationPrincipal Jwt jwt) {
    return userRepository.findByEmail(jwt.getClaim("email"))
      .orElseThrow();
  }
}`} />
            </div>
          </div>
        </div>
      )}

      {/* Frontend Clients Section */}
      {activeSection === 'frontend clients' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Apollo Client (React)
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Apollo Client is the most popular GraphQL client for React. It provides caching, query hooks, and automatic UI updates when data changes.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// npm install @apollo/client graphql

// Apollo Provider setup
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' }
  }
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ProductList />
    </ApolloProvider>
  );
}

// Component with useQuery hook
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_PRODUCTS = gql\`
  query GetProducts($page: Int, $category: Category) {
    products(filter: { category: $category }, page: $page, size: 10) {
      content { id name price category }
      totalPages
      hasNext
    }
  }
\`;

const DELETE_PRODUCT = gql\`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
\`;

function ProductList() {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: { page: 0 }
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    refetchQueries: [{ query: GET_PRODUCTS }],  // refresh list after delete
    onCompleted: () => console.log('Deleted'),
    onError: (err) => console.error(err.message)
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.products.content.map(product => (
        <div key={product.id}>
          <span>{product.name} - \${product.price}</span>
          <button onClick={() => deleteProduct({ variables: { id: product.id } })}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Apollo Angular
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Apollo Angular integrates GraphQL into Angular using RxJS Observables, fitting naturally into Angular&apos;s reactive patterns.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// npm install apollo-angular @apollo/client graphql

// Apollo setup
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

// providers: [{
//   provide: APOLLO_OPTIONS,
//   useFactory: (httpLink: HttpLink) => ({
//     link: httpLink.create({ uri: '/graphql' }),
//     cache: new InMemoryCache()
//   }),
//   deps: [HttpLink]
// }]

// Service
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

const GET_PRODUCTS = gql\`
  query GetProducts($page: Int) {
    products(page: $page, size: 10) {
      content { id name price category }
      totalPages
    }
  }
\`;

const CREATE_PRODUCT = gql\`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) { id name price }
  }
\`;

@Injectable({ providedIn: 'root' })
export class ProductGqlService {
  constructor(private apollo: Apollo) {}

  getProducts(page = 0) {
    return this.apollo.watchQuery({
      query: GET_PRODUCTS,
      variables: { page }
    }).valueChanges.pipe(
      map(result => result.data['products'])
    );
  }

  createProduct(input: any) {
    return this.apollo.mutate({
      mutation: CREATE_PRODUCT,
      variables: { input },
      refetchQueries: [{ query: GET_PRODUCTS }]
    });
  }
}

// Component
@Component({
  template: \`
    <div *ngIf="loading">Loading...</div>
    <div *ngFor="let p of products">{{ p.name }} - {{ p.price | currency }}</div>
  \`
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  loading = true;

  constructor(private productGql: ProductGqlService) {}

  ngOnInit() {
    this.productGql.getProducts().subscribe(data => {
      this.products = data.content;
      this.loading = false;
    });
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
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Plain Fetch (No Library)
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              GraphQL is just HTTP. You can use plain fetch without any library &mdash; useful for simple use cases or server-side scripts.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// GraphQL over plain fetch - no library needed
async function graphqlRequest(query, variables = {}) {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken()
    },
    body: JSON.stringify({ query, variables })
  });

  const { data, errors } = await response.json();
  if (errors) {
    throw new Error(errors.map(e => e.message).join(', '));
  }
  return data;
}

// Usage
const data = await graphqlRequest(\`
  query GetProducts($category: Category) {
    products(filter: { category: $category }) {
      content { id name price }
    }
  }
\`, { category: 'ELECTRONICS' });

console.log(data.products.content);

// Mutation
const newProduct = await graphqlRequest(\`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) { id name }
  }
\`, { input: { name: 'Keyboard', price: 79.99, category: 'ELECTRONICS' } });`} />
            </div>
          </div>
        </div>
      )}

      {/* Advanced Section */}
      {activeSection === 'advanced' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Subscriptions (Real-Time)
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Subscriptions enable real-time communication via WebSocket. The server pushes data to the client when events occur.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// Schema
// type Subscription {
//   orderStatusChanged(orderId: ID!): Order!
//   newProduct: Product!
// }

// Spring Boot - WebSocket subscription
// build.gradle: implementation 'org.springframework.boot:spring-boot-starter-websocket'

@Controller
public class SubscriptionController {

  @Autowired
  private OrderEventPublisher orderEventPublisher;

  @SubscriptionMapping
  public Flux<Order> orderStatusChanged(@Argument String orderId) {
    return orderEventPublisher.getOrderEvents()
      .filter(order -> order.getId().equals(orderId));
  }

  @SubscriptionMapping
  public Flux<Product> newProduct() {
    return productEventPublisher.getProductEvents();
  }
}

// Event publisher service
@Service
public class OrderEventPublisher {
  private final Sinks.Many<Order> sink = Sinks.many().multicast().onBackpressureBuffer();

  public Flux<Order> getOrderEvents() {
    return sink.asFlux();
  }

  public void publishOrderUpdate(Order order) {
    sink.tryEmitNext(order);
  }
}

// Trigger from mutation or business logic
@MutationMapping
public Order updateOrderStatus(@Argument Long id, @Argument OrderStatus status) {
  Order order = orderRepository.findById(id).orElseThrow();
  order.setStatus(status);
  Order saved = orderRepository.save(order);
  orderEventPublisher.publishOrderUpdate(saved);  // triggers subscription
  return saved;
}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Pagination Patterns
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              GraphQL supports two pagination patterns: offset-based (page/size) for traditional paging and cursor-based (Relay-style) for infinite scroll and real-time feeds.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`# Offset-based pagination (simple, works with Spring Data)
type Query {
  products(page: Int = 0, size: Int = 10): ProductPage!
}

type ProductPage {
  content: [Product!]!
  totalElements: Int!
  totalPages: Int!
  currentPage: Int!
}

# Cursor-based pagination (Relay spec - better for real-time)
type Query {
  products(first: Int, after: String, last: Int, before: String): ProductConnection!
}

type ProductConnection {
  edges: [ProductEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type ProductEdge {
  node: Product!
  cursor: String!             # opaque cursor (usually base64 encoded ID)
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

# Usage:
# First page:  { products(first: 10) { edges { node { name } cursor } pageInfo { endCursor hasNextPage } } }
# Next page:   { products(first: 10, after: "cursor_xyz") { ... } }`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Testing GraphQL APIs
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Spring provides <code style={{ color: '#e535ab' }}>GraphQlTester</code> for integration testing GraphQL resolvers with a fluent API.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@SpringBootTest
@AutoConfigureGraphQlTester
class ProductControllerTest {

  @Autowired
  private GraphQlTester graphQlTester;

  @Test
  void shouldGetProduct() {
    graphQlTester.document("""
        query {
          product(id: 1) {
            name
            price
            category
          }
        }
      """)
      .execute()
      .path("product.name").entity(String.class).isEqualTo("Laptop")
      .path("product.price").entity(Double.class).isEqualTo(999.99);
  }

  @Test
  void shouldCreateProduct() {
    graphQlTester.document("""
        mutation CreateProduct($input: CreateProductInput!) {
          createProduct(input: $input) {
            id
            name
            price
          }
        }
      """)
      .variable("input", Map.of(
        "name", "Wireless Mouse",
        "price", 29.99,
        "category", "ELECTRONICS"
      ))
      .execute()
      .path("createProduct.name").entity(String.class).isEqualTo("Wireless Mouse")
      .path("createProduct.id").entity(String.class).satisfies(id -> {
        assertThat(id).isNotNull();
      });
  }

  @Test
  void shouldReturnErrorForMissingProduct() {
    graphQlTester.document("""
        query {
          product(id: 9999) { name }
        }
      """)
      .execute()
      .errors()
      .satisfy(errors -> {
        assertThat(errors).hasSize(1);
        assertThat(errors.get(0).getMessage()).contains("not found");
      });
  }
}

// HttpGraphQlTester for full HTTP integration tests
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class ProductIntegrationTest {
  @Autowired
  private HttpGraphQlTester httpTester;

  @Test
  void shouldRequireAuth() {
    httpTester.mutate()
      .header("Authorization", "Bearer invalid-token")
      .build()
      .document("{ products { content { name } } }")
      .execute()
      .errors()
      .satisfy(errors -> assertThat(errors).isNotEmpty());
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
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Best Practices &amp; Common Pitfalls
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem'
            }}>
              <div style={{
                backgroundColor: '#064e3b',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #10b981'
              }}>
                <h4 style={{ color: '#6ee7b7', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Best Practices</h4>
                <ul style={{ color: '#9ca3af', lineHeight: '2', paddingLeft: '1.25rem', margin: 0 }}>
                  <li>Use @BatchMapping to solve N+1 queries</li>
                  <li>Limit query depth and complexity to prevent abuse</li>
                  <li>Use input types for mutation arguments</li>
                  <li>Return the mutated object from mutations</li>
                  <li>Use enums for fixed value sets</li>
                  <li>Version schema with deprecation, not new endpoints</li>
                  <li>Enable GraphiQL in dev only</li>
                  <li>Apply authorization at resolver level, not schema</li>
                </ul>
              </div>
              <div style={{
                backgroundColor: '#1e293b',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid #475569'
              }}>
                <h4 style={{ color: '#f87171', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Common Pitfalls</h4>
                <ul style={{ color: '#9ca3af', lineHeight: '2', paddingLeft: '1.25rem', margin: 0 }}>
                  <li>Ignoring N+1 &mdash; lazy loading without DataLoader</li>
                  <li>No query depth limit &mdash; allows malicious deep queries</li>
                  <li>Over-exposing the data model in the schema</li>
                  <li>Not handling partial errors (data + errors response)</li>
                  <li>Skipping input validation on mutations</li>
                  <li>Circular references without pagination causing infinite data</li>
                  <li>Forgetting CORS config for frontend origins</li>
                  <li>Using GraphQL for file uploads (use REST instead)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  )
}

export default GraphQL
