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
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="indigoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#db2777" stopOpacity="0.9"/>
          </linearGradient>

          {/* Arrow markers */}
          <marker id="arrowSolid" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#1e293b" />
          </marker>
          <marker id="arrowDashed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Architectural layer backgrounds */}
        <g opacity="0.1">
          <rect x="50" y="180" width="420" height="200" rx="16" fill="#3b82f6" />
          <text x="260" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af" opacity="0.6">
            Layer 1
          </text>

          <rect x="550" y="80" width="420" height="560" rx="16" fill="#10b981" />
          <text x="760" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="#059669" opacity="0.6">
            Layer 2
          </text>

          <rect x="1050" y="180" width="420" height="520" rx="16" fill="#8b5cf6" />
          <text x="1260" y="210" textAnchor="middle" fontSize="14" fontWeight="700" fill="#7c3aed" opacity="0.6">
            Layer 3
          </text>
        </g>

        {/* Connecting lines with arrows and labels */}
        <g fill="none">
          <line x1="430" y1="300" x2="580" y2="200" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="240" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            interacts
          </text>

          <line x1="430" y1="300" x2="580" y2="400" stroke="#1e293b" strokeWidth="3" strokeOpacity="0.8" markerEnd="url(#arrowSolid)"/>
          <text x="505" y="360" fontSize="11" fontWeight="600" fill="#1e293b" textAnchor="middle">
            uses
          </text>

          <line x1="930" y1="200" x2="1080" y2="300" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="240" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            depends
          </text>

          <line x1="930" y1="400" x2="1080" y2="500" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="1005" y="460" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            provides
          </text>

          <line x1="430" y1="500" x2="580" y2="600" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="505" y="560" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            extends
          </text>

          <line x1="930" y1="500" x2="760" y2="600" stroke="#64748b" strokeWidth="3" strokeDasharray="8,4" strokeOpacity="0.7" markerEnd="url(#arrowDashed)"/>
          <text x="845" y="560" fontSize="11" fontWeight="600" fill="#64748b" textAnchor="middle">
            integrates
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
              y={component.y + 35}
              textAnchor="middle"
              fontSize="48"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.icon}
            </text>

            {/* Title */}
            <text
              x={component.x + component.width/2}
              y={component.y + 75}
              textAnchor="middle"
              fontSize="18"
              fontWeight="700"
              fill="white"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {component.title}
            </text>

            {/* Details */}
            {component.details && component.details.slice(0, 3).map((detail, idx) => (
              <text
                key={idx}
                x={component.x + component.width/2}
                y={component.y + 100 + (idx * 15)}
                textAnchor="middle"
                fontSize="10"
                fontWeight="500"
                fill="rgba(255,255,255,0.9)"
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              >
                {detail.name.length > 18 ? detail.name.substring(0, 15) + '...' : detail.name}
              </text>
            ))}
            {component.details && component.details.length > 3 && (
              <text
                x={component.x + component.width/2}
                y={component.y + 145}
                textAnchor="middle"
                fontSize="10"
                fontWeight="500"
                fill="rgba(255,255,255,0.7)"
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              >
                +{component.details.length - 3} more features...
              </text>
            )}
          </g>
        )})}
      </svg>
    </div>
  )
}

function Class({ onBack }) {
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [focusedComponentIndex, setFocusedComponentIndex] = useState(0)

  const components = [
    {
      id: 'solid', x: 80, y: 240, width: 350, height: 160,
      icon: '🎯', title: 'SOLID Principles', color: 'red',
      details: [
        { name: 'Single Responsibility', explanation: 'Each class should have one and only one reason to change. Class does one thing well. Cohesion: related functionality together. Easier to understand, test, maintain. Changes isolated to single class. High cohesion, low coupling.' },
        { name: 'Open-Closed Principle', explanation: 'Open for extension, closed for modification. Add new functionality without changing existing code. Use abstraction and polymorphism. Inheritance, composition, interfaces. Protect existing code from bugs. Strategy pattern exemplifies this.' },
        { name: 'Liskov Substitution', explanation: 'Subtypes must be substitutable for their base types. Derived class can replace parent without breaking code. Contract preservation. Pre/post conditions. Behavioral subtyping. Inheritance hierarchies must make semantic sense.' },
        { name: 'Interface Segregation', explanation: 'Clients shouldn\'t depend on interfaces they don\'t use. Many specific interfaces better than one general. No fat interfaces. Role-based interfaces. Prevents interface pollution. Reduces coupling and impact of changes.' },
        { name: 'Dependency Inversion', explanation: 'Depend on abstractions, not concretions. High-level modules don\'t depend on low-level modules. Both depend on abstractions. Interfaces as contracts. Dependency injection. Testability through mocking. Flexibility to swap implementations.' },
        { name: 'Benefits of SOLID', explanation: 'Maintainable code. Testable classes. Flexible design. Reduced coupling. Better abstraction. Easier refactoring. Code reusability. Team collaboration. Long-term sustainability. Industry best practices.' }
      ],
      description: 'Five fundamental principles of object-oriented design ensuring maintainable, flexible, and robust class structures.'
    },
    {
      id: 'inheritance', x: 580, y: 140, width: 350, height: 160,
      icon: '🌳', title: 'Inheritance', color: 'red',
      details: [
        { name: 'IS-A Relationship', explanation: 'Models "is-a" relationship between classes. Dog is-a Animal. Subclass inherits properties and methods from superclass. Specialization of parent class. Type hierarchy. Polymorphic behavior. Code reuse through inheritance.' },
        { name: 'Method Overriding', explanation: 'Subclass provides specific implementation of parent method. @Override annotation. Runtime polymorphism. Dynamic dispatch. Preserves method signature. Can call super.method(). Virtual method invocation. Behavioral specialization.' },
        { name: 'Abstract Classes', explanation: 'Cannot be instantiated. Contains abstract methods (no implementation). Subclasses must implement abstract methods. Mix of abstract and concrete methods. Common base for related classes. Partial implementation. Template Method pattern.' },
        { name: 'Protected Access', explanation: 'Protected members accessible to subclasses and same package. Encapsulation relaxed for inheritance. Provide extension points. Hook methods for customization. Balance between private and public. Design for inheritance.' },
        { name: 'Constructor Chaining', explanation: 'Subclass constructor calls parent constructor with super(). Initialization order: parent first, then child. Explicit or implicit super() call. Must be first statement. Ensures proper object construction. State initialization hierarchy.' },
        { name: 'Inheritance Trade-offs', explanation: 'Benefits: code reuse, polymorphism, natural hierarchy. Drawbacks: tight coupling, fragile base class, deep hierarchies hard to understand. Favor composition over inheritance. Use inheritance judiciously. Prefer interfaces for contracts.' }
      ],
      description: 'Mechanism for creating class hierarchies where child classes inherit properties and behaviors from parent classes.'
    },
    {
      id: 'composition', x: 580, y: 340, width: 350, height: 160,
      icon: '🔧', title: 'Composition', color: 'red',
      details: [
        { name: 'HAS-A Relationship', explanation: 'Models "has-a" relationship. Car has-a Engine. Objects contain other objects. Aggregate behavior from components. More flexible than inheritance. Runtime composition. Easier to change behavior. Loosely coupled.' },
        { name: 'Favor Composition Over Inheritance', explanation: 'Composition more flexible than inheritance. Avoid rigid class hierarchies. Change behavior at runtime. Multiple behaviors through multiple components. No diamond problem. Easier to test. Strategy pattern uses composition.' },
        { name: 'Delegation', explanation: 'Forward method calls to contained object. Wrapper delegates to delegate. Decorator pattern. Proxy pattern. Compose complex behavior from simple parts. Separation of concerns. Each component has single responsibility.' },
        { name: 'Aggregation vs Composition', explanation: 'Aggregation: loose relationship, parts exist independently. Composition: strong relationship, part lifecycle tied to whole. Composition: part cannot exist without whole. Aggregation: parts can exist independently. Different ownership semantics.' },
        { name: 'Dependency Injection', explanation: 'Pass dependencies to class rather than creating internally. Constructor injection. Setter injection. Interface injection. Inversion of control. Testability through mocking. Loose coupling. Spring Framework pattern.' },
        { name: 'Design Benefits', explanation: 'Runtime flexibility. Better encapsulation. Loose coupling. Easier testing. Clearer intent. Single responsibility. Multiple behaviors easily combined. Avoids inheritance complexity. Modular design.' }
      ],
      description: 'Design approach where classes contain instances of other classes to achieve code reuse and flexibility.'
    },
    {
      id: 'encapsulation', x: 80, y: 440, width: 350, height: 160,
      icon: '🔒', title: 'Encapsulation', color: 'red',
      details: [
        { name: 'Data Hiding', explanation: 'Private fields hide internal state. Controlled access through public methods. Implementation details hidden. Black box principle. Protect invariants. Prevent invalid state. Internal representation can change without affecting clients.' },
        { name: 'Access Modifiers', explanation: 'private: class only. protected: subclasses and package. default (package-private): package only. public: everywhere. Least privilege principle. Expose minimal interface. Information hiding. Control visibility carefully.' },
        { name: 'Getters and Setters', explanation: 'Accessor methods for controlled field access. Validation in setters. Computed values in getters. Can add logic without breaking clients. JavaBeans convention. Lombok can generate. Balance between encapsulation and boilerplate.' },
        { name: 'Immutability', explanation: 'Final fields. No setters. Objects unchangeable after construction. Thread-safe by default. Simpler reasoning. Defensive copies. Value objects. String is immutable. Records in Java 14+ for immutable data carriers.' },
        { name: 'Tell Don\'t Ask', explanation: 'Tell objects what to do, don\'t ask for data. Keep behavior with data. Rich domain objects. Avoid anemic domain model. Methods do work instead of exposing state. Better encapsulation. Object-oriented vs procedural.' },
        { name: 'Benefits', explanation: 'Maintainability: change implementation without affecting clients. Flexibility: swap internal structures. Validation: ensure valid states. Security: control access. Modularity: clear boundaries. Debugging: controlled access points.' }
      ],
      description: 'Bundling data and methods together while hiding internal state to protect object integrity.'
    },
    {
      id: 'abstraction', x: 580, y: 540, width: 350, height: 160,
      icon: '🎨', title: 'Abstraction', color: 'red',
      details: [
        { name: 'Essential vs Accidental', explanation: 'Show essential features, hide accidental complexity. Simplify complex reality. High-level view. Focus on what, not how. Abstract away details. List interface abstracts ArrayList/LinkedList. User doesn\'t need implementation knowledge.' },
        { name: 'Interfaces', explanation: 'Pure abstraction in Java. Contract without implementation. Multiple interface inheritance. Segregate concerns. Define capabilities. Type hierarchy without implementation coupling. Default methods since Java 8. Behavioral contracts.' },
        { name: 'Abstract Classes', explanation: 'Partial abstraction. Mix of abstract and concrete methods. Template method pattern. Common base implementation. "is-a" relationship. State can be maintained. Single inheritance limitation. Shared code among subclasses.' },
        { name: 'Programming to Interfaces', explanation: 'Depend on abstractions, not concrete classes. List<String> instead of ArrayList<String>. Flexibility to change implementation. Dependency inversion principle. Mock in tests. Loose coupling. Strategy pattern fundamental.' },
        { name: 'Levels of Abstraction', explanation: 'Different abstraction levels in system. High-level: business logic. Mid-level: services. Low-level: data access. Layered architecture. Each layer abstracts layer below. Clean separation. Easier to understand and modify.' },
        { name: 'Abstraction Benefits', explanation: 'Simplifies complexity. Promotes code reuse. Enables polymorphism. Facilitates maintenance. Improves testability. Allows focus on relevant details. Supports change. Foundation of good design.' }
      ],
      description: 'Hiding complex implementation details and showing only essential features through interfaces and abstract classes.'
    },
    {
      id: 'polymorphism', x: 1080, y: 240, width: 350, height: 160,
      icon: '🦎', title: 'Polymorphism', color: 'red',
      details: [
        { name: 'Runtime Polymorphism', explanation: 'Method resolution at runtime. Overriding methods in subclasses. Virtual method dispatch. Dynamic binding. Base class reference, subclass object. Behavior determined by actual object type. Core OOP feature. Strategy pattern foundation.' },
        { name: 'Compile-time Polymorphism', explanation: 'Method overloading. Same method name, different parameters. Resolved at compile time. Static binding. Different signatures. Convenience for callers. Constructor overloading. Operator overloading (not in Java). Early binding.' },
        { name: 'Interface Polymorphism', explanation: 'Multiple classes implement same interface. Treated uniformly through interface reference. Collection framework heavily uses this. List interface, ArrayList/LinkedList implementations. Plug-in architecture. Dependency injection. Testability through mocking.' },
        { name: 'Polymorphic Collections', explanation: 'Collections of interface or superclass type. Heterogeneous collections possible. List<Animal> with Dog, Cat objects. Process uniformly. Visitor pattern. Common processing logic. Type-safe with generics. Downcasting when needed.' },
        { name: 'Method Dispatch', explanation: 'JVM determines which method to invoke. vtable lookup. Based on actual object type, not reference type. Overridden methods. Cannot override static/final/private methods. Performance consideration (minimal). Core to OOP flexibility.' },
        { name: 'Benefits', explanation: 'Code reusability. Flexibility. Extensibility without modification. Open-closed principle. Cleaner code. Single interface, multiple implementations. Runtime behavior selection. Foundation of design patterns.' }
      ],
      description: 'Ability of objects to take many forms, enabling single interface to represent different underlying implementations.'
    },
    {
      id: 'design-patterns', x: 1080, y: 440, width: 350, height: 160,
      icon: '⚙️', title: 'Design Patterns', color: 'red',
      details: [
        { name: 'Creational Patterns', explanation: 'Object creation mechanisms. Singleton: single instance. Factory: object creation abstraction. Abstract Factory: families of objects. Builder: complex object construction. Prototype: clone objects. Control instantiation. Flexibility in object creation.' },
        { name: 'Structural Patterns', explanation: 'Class and object composition. Adapter: interface compatibility. Decorator: add behavior dynamically. Proxy: placeholder/surrogate. Composite: tree structures. Facade: simplified interface. Bridge: separate abstraction from implementation. Organize code structure.' },
        { name: 'Behavioral Patterns', explanation: 'Object interaction and responsibility. Strategy: encapsulate algorithms. Observer: event notification. Command: encapsulate requests. Template Method: skeleton algorithm. Iterator: sequential access. State: behavior based on state. Communication patterns.' },
        { name: 'Gang of Four', explanation: '23 classic patterns from Design Patterns book. Common vocabulary for developers. Proven solutions. Not language-specific. Catalog of best practices. Must understand problem before applying. Not silver bullets. Context matters.' },
        { name: 'When to Use', explanation: 'Recognize pattern-appropriate scenarios. Don\'t force patterns. Understand problem first. Patterns emerge from refactoring. YAGNI principle. Balance between pattern use and simplicity. Experience teaches pattern selection. Code smells indicate needs.' },
        { name: 'Anti-patterns', explanation: 'Common mistakes to avoid. God object. Anemic domain model. Singleton overuse. Premature optimization. Cargo cult programming. Big ball of mud. Golden hammer. Learn what not to do. Recognize and refactor.' }
      ],
      description: 'Reusable solutions to common software design problems providing templates for writing maintainable code.'
    },
    {
      id: 'class-design', x: 1080, y: 640, width: 350, height: 140,
      icon: '📐', title: 'Class Design Best Practices', color: 'red',
      details: [
        { name: 'Cohesion', explanation: 'Related responsibilities together. Single purpose per class. High cohesion goal. Methods work on same data. Focused classes. Easy to name. Easy to understand. Low coupling naturally follows. Single Responsibility Principle application.' },
        { name: 'Coupling', explanation: 'Dependency between classes. Aim for loose coupling. Changes don\'t ripple. Interfaces reduce coupling. Dependency injection. Law of Demeter. Don\'t talk to strangers. Minimize dependencies. Independent testing and deployment.' },
        { name: 'DRY Principle', explanation: 'Don\'t Repeat Yourself. Extract common code. Single source of truth. Reduce duplication. Easier maintenance. Bugs fixed once. Inheritance and composition. Shared utilities. Balance with premature abstraction. Rule of Three.' },
        { name: 'YAGNI', explanation: 'You Aren\'t Gonna Need It. Don\'t add functionality until needed. Avoid speculation. Simpler code. Easier to change. Less code to maintain. Refactor when needed. Agile principle. Deliver value now.' },
        { name: 'Naming Conventions', explanation: 'Clear, descriptive names. Classes: nouns (User, Order). Methods: verbs (calculate, send). Intention revealing. Consistent naming. No abbreviations unless standard. searchable names. Pronounceable names. Domain language.' }
      ],
      description: 'Best practices for designing robust, maintainable classes including cohesion, coupling, and naming conventions.'
    }
  ]

  const handleComponentClick = (component) => {
    setSelectedComponent(component)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedComponent(null)
    setSelectedConcept(null)
  }

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }

  // Use refs to access current modal state in event handler
  const isModalOpenRef = useRef(isModalOpen)
  useEffect(() => {
    isModalOpenRef.current = isModalOpen
  }, [isModalOpen])

  // Set focus to first component on mount
  useEffect(() => {
    // Small delay to ensure component is fully rendered
    setTimeout(() => {
      setFocusedComponentIndex(0)
    }, 100)
  }, [])

  // Keyboard navigation for diagram components
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
        console.log('Enter pressed! Opening component:', components[focusedComponentIndex])
        handleComponentClick(components[focusedComponentIndex])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [focusedComponentIndex])

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '95%',
      margin: '120px auto 0',
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
      border: '3px solid rgba(239, 68, 68, 0.4)'
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
          Object-Oriented Design
        </h1>
        <div style={{ width: '120px' }}></div>
      </div>

      <div style={{
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
        padding: '2.5rem 10rem',
        borderRadius: '16px',
        border: '3px solid rgba(239, 68, 68, 0.3)',
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
          Object-Oriented Design: SOLID principles for maintainable code, inheritance for class hierarchies,
          composition for flexible design, encapsulation for data hiding, abstraction for simplification,
          polymorphism for flexibility, design patterns, and class design best practices.
        </p>
      </div>

      <ModernDiagram
        components={components}
        onComponentClick={handleComponentClick}
        title="Object-Oriented Design Principles"
        width={1400}
        height={800}
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
          zIndex: 99999
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            maxWidth: '1400px',
            width: '95%',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            border: '3px solid rgba(239, 68, 68, 0.4)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: '#1f2937',
                margin: 0,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                {selectedComponent.icon} {selectedComponent.title}
              </h2>
              <button
                onClick={closeModal}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '1.25rem',
                  fontWeight: '600',
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

            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.05)',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid rgba(239, 68, 68, 0.2)',
              marginBottom: '2rem'
            }}>
              <p style={{
                fontSize: '1.1rem',
                color: '#374151',
                fontWeight: '500',
                margin: 0,
                lineHeight: '1.6'
              }}>
                {selectedComponent.description}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: selectedConcept ? '1fr 1fr' : '1fr',
              gap: '2rem'
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '1rem'
                }}>
                  Key Features
                </h3>
                <div style={{
                  display: 'grid',
                  gap: '0.75rem'
                }}>
                  {selectedComponent.details.map((detail, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleConceptClick(detail)}
                      style={{
                        backgroundColor: selectedConcept?.name === detail.name
                          ? 'rgba(239, 68, 68, 0.15)'
                          : 'rgba(239, 68, 68, 0.1)',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: selectedConcept?.name === detail.name
                          ? '2px solid rgba(239, 68, 68, 0.4)'
                          : '2px solid rgba(239, 68, 68, 0.2)',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        color: selectedConcept?.name === detail.name
                          ? '#dc2626'
                          : '#991b1b',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        transform: 'scale(1)'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedConcept?.name !== detail.name) {
                          e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.15)'
                          e.target.style.transform = 'scale(1.02)'
                          e.target.style.borderColor = 'rgba(239, 68, 68, 0.4)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedConcept?.name !== detail.name) {
                          e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'
                          e.target.style.transform = 'scale(1)'
                          e.target.style.borderColor = 'rgba(239, 68, 68, 0.2)'
                        }
                      }}
                    >
                      • {detail.name}
                      {selectedConcept?.name === detail.name && (
                        <span style={{
                          fontSize: '0.8rem',
                          opacity: 0.8,
                          marginLeft: '0.5rem',
                          fontWeight: '600'
                        }}>
                          ← Selected
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedConcept && (
                <div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '1rem'
                  }}>
                    {selectedConcept.name}
                  </h3>

                  <div style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.05)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(239, 68, 68, 0.2)',
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
                      {selectedConcept.explanation}
                    </p>
                  </div>

                  <div style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.05)',
                    padding: '1.25rem',
                    borderRadius: '12px',
                    border: '2px solid rgba(59, 130, 246, 0.2)'
                  }}>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      color: '#1e40af',
                      margin: '0 0 0.75rem 0'
                    }}>
                      💡 Key Takeaway
                    </h4>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#1e40af',
                      fontWeight: '500',
                      margin: 0,
                      lineHeight: '1.5',
                      fontStyle: 'italic'
                    }}>
                      {selectedConcept.name} is a fundamental object-oriented design principle that enables robust, maintainable, and flexible software systems.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Class