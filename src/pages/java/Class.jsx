import { useState, useEffect, useRef } from 'react'
import { useModalFocus } from '../../hooks/useModalFocus'
import Breadcrumb from '../../components/Breadcrumb'

function Class({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, breadcrumb }) {
  const [selectedConcept, setSelectedConcept] = useState(null)
  // Comprehensive modal focus management
  const { modalRef, firstFocusableRef } = useModalFocus(onBack)

  const concepts = [
    {
      id: 'solid',
      name: 'SOLID Principles',
      icon: '🎯',
      color: '#ef4444',
      description: 'Five fundamental principles of object-oriented design ensuring maintainable, flexible, and robust class structures.',
      details: [
        { name: 'Single Responsibility', explanation: 'Each class should have one and only one reason to change. Class does one thing well. Cohesion: related functionality together. Easier to understand, test, maintain. Changes isolated to single class. High cohesion, low coupling.' },
        { name: 'Open-Closed Principle', explanation: 'Open for extension, closed for modification. Add new functionality without changing existing code. Use abstraction and polymorphism. Inheritance, composition, interfaces. Protect existing code from bugs. Strategy pattern exemplifies this.' },
        { name: 'Liskov Substitution', explanation: 'Subtypes must be substitutable for their base types. Derived class can replace parent without breaking code. Contract preservation. Pre/post conditions. Behavioral subtyping. Inheritance hierarchies must make semantic sense.' },
        { name: 'Interface Segregation', explanation: 'Clients shouldn\'t depend on interfaces they don\'t use. Many specific interfaces better than one general. No fat interfaces. Role-based interfaces. Prevents interface pollution. Reduces coupling and impact of changes.' },
        { name: 'Dependency Inversion', explanation: 'Depend on abstractions, not concretions. High-level modules don\'t depend on low-level modules. Both depend on abstractions. Interfaces as contracts. Dependency injection. Testability through mocking. Flexibility to swap implementations.' },
        { name: 'Benefits of SOLID', explanation: 'Maintainable code. Testable classes. Flexible design. Reduced coupling. Better abstraction. Easier refactoring. Code reusability. Team collaboration. Long-term sustainability. Industry best practices.' }
      ]
    },
    {
      id: 'inheritance',
      name: 'Inheritance',
      icon: '🌳',
      color: '#a855f7',
      description: 'Mechanism for creating class hierarchies where child classes inherit properties and behaviors from parent classes.',
      details: [
        { name: 'IS-A Relationship', explanation: 'Models "is-a" relationship between classes. Dog is-a Animal. Subclass inherits properties and methods from superclass. Specialization of parent class. Type hierarchy. Polymorphic behavior. Code reuse through inheritance.' },
        { name: 'Method Overriding', explanation: 'Subclass provides specific implementation of parent method. @Override annotation. Runtime polymorphism. Dynamic dispatch. Preserves method signature. Can call super.method(). Virtual method invocation. Behavioral specialization.' },
        { name: 'Abstract Classes', explanation: 'Cannot be instantiated. Contains abstract methods (no implementation). Subclasses must implement abstract methods. Mix of abstract and concrete methods. Common base for related classes. Partial implementation. Template Method pattern.' },
        { name: 'Protected Access', explanation: 'Protected members accessible to subclasses and same package. Encapsulation relaxed for inheritance. Provide extension points. Hook methods for customization. Balance between private and public. Design for inheritance.' },
        { name: 'Constructor Chaining', explanation: 'Subclass constructor calls parent constructor with super(). Initialization order: parent first, then child. Explicit or implicit super() call. Must be first statement. Ensures proper object construction. State initialization hierarchy.' },
        { name: 'Inheritance Trade-offs', explanation: 'Benefits: code reuse, polymorphism, natural hierarchy. Drawbacks: tight coupling, fragile base class, deep hierarchies hard to understand. Favor composition over inheritance. Use inheritance judiciously. Prefer interfaces for contracts.' }
      ]
    },
    {
      id: 'composition',
      name: 'Composition',
      icon: '🔧',
      color: '#7c3aed',
      description: 'Design approach where classes contain instances of other classes to achieve code reuse and flexibility.',
      details: [
        { name: 'HAS-A Relationship', explanation: 'Models "has-a" relationship. Car has-a Engine. Objects contain other objects. Aggregate behavior from components. More flexible than inheritance. Runtime composition. Easier to change behavior. Loosely coupled.' },
        { name: 'Favor Composition Over Inheritance', explanation: 'Composition more flexible than inheritance. Avoid rigid class hierarchies. Change behavior at runtime. Multiple behaviors through multiple components. No diamond problem. Easier to test. Strategy pattern uses composition.' },
        { name: 'Delegation', explanation: 'Forward method calls to contained object. Wrapper delegates to delegate. Decorator pattern. Proxy pattern. Compose complex behavior from simple parts. Separation of concerns. Each component has single responsibility.' },
        { name: 'Aggregation vs Composition', explanation: 'Aggregation: loose relationship, parts exist independently. Composition: strong relationship, part lifecycle tied to whole. Composition: part cannot exist without whole. Aggregation: parts can exist independently. Different ownership semantics.' },
        { name: 'Dependency Injection', explanation: 'Pass dependencies to class rather than creating internally. Constructor injection. Setter injection. Interface injection. Inversion of control. Testability through mocking. Loose coupling. Spring Framework pattern.' },
        { name: 'Design Benefits', explanation: 'Runtime flexibility. Better encapsulation. Loose coupling. Easier testing. Clearer intent. Single responsibility. Multiple behaviors easily combined. Avoids inheritance complexity. Modular design.' }
      ]
    },
    {
      id: 'encapsulation',
      name: 'Encapsulation',
      icon: '🔒',
      color: '#8b5cf6',
      description: 'Bundling data and methods together while hiding internal state to protect object integrity.',
      details: [
        { name: 'Data Hiding', explanation: 'Private fields hide internal state. Controlled access through public methods. Implementation details hidden. Black box principle. Protect invariants. Prevent invalid state. Internal representation can change without affecting clients.' },
        { name: 'Access Modifiers', explanation: 'private: class only. protected: subclasses and package. default (package-private): package only. public: everywhere. Least privilege principle. Expose minimal interface. Information hiding. Control visibility carefully.' },
        { name: 'Getters and Setters', explanation: 'Accessor methods for controlled field access. Validation in setters. Computed values in getters. Can add logic without breaking clients. JavaBeans convention. Lombok can generate. Balance between encapsulation and boilerplate.' },
        { name: 'Immutability', explanation: 'Final fields. No setters. Objects unchangeable after construction. Thread-safe by default. Simpler reasoning. Defensive copies. Value objects. String is immutable. Records in Java 14+ for immutable data carriers.' },
        { name: 'Tell Don\'t Ask', explanation: 'Tell objects what to do, don\'t ask for data. Keep behavior with data. Rich domain objects. Avoid anemic domain model. Methods do work instead of exposing state. Better encapsulation. Object-oriented vs procedural.' },
        { name: 'Benefits', explanation: 'Maintainability: change implementation without affecting clients. Flexibility: swap internal structures. Validation: ensure valid states. Security: control access. Modularity: clear boundaries. Debugging: controlled access points.' }
      ]
    },
    {
      id: 'abstraction',
      name: 'Abstraction',
      icon: '🎨',
      color: '#f59e0b',
      description: 'Hiding complex implementation details and showing only essential features through interfaces and abstract classes.',
      details: [
        { name: 'Essential vs Accidental', explanation: 'Show essential features, hide accidental complexity. Simplify complex reality. High-level view. Focus on what, not how. Abstract away details. List interface abstracts ArrayList/LinkedList. User doesn\'t need implementation knowledge.' },
        { name: 'Interfaces', explanation: 'Pure abstraction in Java. Contract without implementation. Multiple interface inheritance. Segregate concerns. Define capabilities. Type hierarchy without implementation coupling. Default methods since Java 8. Behavioral contracts.' },
        { name: 'Abstract Classes', explanation: 'Partial abstraction. Mix of abstract and concrete methods. Template method pattern. Common base implementation. "is-a" relationship. State can be maintained. Single inheritance limitation. Shared code among subclasses.' },
        { name: 'Programming to Interfaces', explanation: 'Depend on abstractions, not concrete classes. List<String> instead of ArrayList<String>. Flexibility to change implementation. Dependency inversion principle. Mock in tests. Loose coupling. Strategy pattern fundamental.' },
        { name: 'Levels of Abstraction', explanation: 'Different abstraction levels in system. High-level: business logic. Mid-level: services. Low-level: data access. Layered architecture. Each layer abstracts layer below. Clean separation. Easier to understand and modify.' },
        { name: 'Abstraction Benefits', explanation: 'Simplifies complexity. Promotes code reuse. Enables polymorphism. Facilitates maintenance. Improves testability. Allows focus on relevant details. Supports change. Foundation of good design.' }
      ]
    },
    {
      id: 'polymorphism',
      name: 'Polymorphism',
      icon: '🦎',
      color: '#ec4899',
      description: 'Ability of objects to take many forms, enabling single interface to represent different underlying implementations.',
      details: [
        { name: 'Runtime Polymorphism', explanation: 'Method resolution at runtime. Overriding methods in subclasses. Virtual method dispatch. Dynamic binding. Base class reference, subclass object. Behavior determined by actual object type. Core OOP feature. Strategy pattern foundation.' },
        { name: 'Compile-time Polymorphism', explanation: 'Method overloading. Same method name, different parameters. Resolved at compile time. Static binding. Different signatures. Convenience for callers. Constructor overloading. Operator overloading (not in Java). Early binding.' },
        { name: 'Interface Polymorphism', explanation: 'Multiple classes implement same interface. Treated uniformly through interface reference. Collection framework heavily uses this. List interface, ArrayList/LinkedList implementations. Plug-in architecture. Dependency injection. Testability through mocking.' },
        { name: 'Polymorphic Collections', explanation: 'Collections of interface or superclass type. Heterogeneous collections possible. List<Animal> with Dog, Cat objects. Process uniformly. Visitor pattern. Common processing logic. Type-safe with generics. Downcasting when needed.' },
        { name: 'Method Dispatch', explanation: 'JVM determines which method to invoke. vtable lookup. Based on actual object type, not reference type. Overridden methods. Cannot override static/final/private methods. Performance consideration (minimal). Core to OOP flexibility.' },
        { name: 'Benefits', explanation: 'Code reusability. Flexibility. Extensibility without modification. Open-closed principle. Cleaner code. Single interface, multiple implementations. Runtime behavior selection. Foundation of design patterns.' }
      ]
    },
    {
      id: 'design-patterns',
      name: 'Design Patterns',
      icon: '⚙️',
      color: '#14b8a6',
      description: 'Reusable solutions to common software design problems providing templates for writing maintainable code.',
      details: [
        { name: 'Creational Patterns', explanation: 'Object creation mechanisms. Singleton: single instance. Factory: object creation abstraction. Abstract Factory: families of objects. Builder: complex object construction. Prototype: clone objects. Control instantiation. Flexibility in object creation.' },
        { name: 'Structural Patterns', explanation: 'Class and object composition. Adapter: interface compatibility. Decorator: add behavior dynamically. Proxy: placeholder/surrogate. Composite: tree structures. Facade: simplified interface. Bridge: separate abstraction from implementation. Organize code structure.' },
        { name: 'Behavioral Patterns', explanation: 'Object interaction and responsibility. Strategy: encapsulate algorithms. Observer: event notification. Command: encapsulate requests. Template Method: skeleton algorithm. Iterator: sequential access. State: behavior based on state. Communication patterns.' },
        { name: 'Gang of Four', explanation: '23 classic patterns from Design Patterns book. Common vocabulary for developers. Proven solutions. Not language-specific. Catalog of best practices. Must understand problem before applying. Not silver bullets. Context matters.' },
        { name: 'When to Use', explanation: 'Recognize pattern-appropriate scenarios. Don\'t force patterns. Understand problem first. Patterns emerge from refactoring. YAGNI principle. Balance between pattern use and simplicity. Experience teaches pattern selection. Code smells indicate needs.' },
        { name: 'Anti-patterns', explanation: 'Common mistakes to avoid. God object. Anemic domain model. Singleton overuse. Premature optimization. Cargo cult programming. Big ball of mud. Golden hammer. Learn what not to do. Recognize and refactor.' }
      ]
    },
    {
      id: 'class-design',
      name: 'Class Design Best Practices',
      icon: '📐',
      color: '#6366f1',
      description: 'Best practices for designing robust, maintainable classes including cohesion, coupling, and naming conventions.',
      details: [
        { name: 'Cohesion', explanation: 'Related responsibilities together. Single purpose per class. High cohesion goal. Methods work on same data. Focused classes. Easy to name. Easy to understand. Low coupling naturally follows. Single Responsibility Principle application.' },
        { name: 'Coupling', explanation: 'Dependency between classes. Aim for loose coupling. Changes don\'t ripple. Interfaces reduce coupling. Dependency injection. Law of Demeter. Don\'t talk to strangers. Minimize dependencies. Independent testing and deployment.' },
        { name: 'DRY Principle', explanation: 'Don\'t Repeat Yourself. Extract common code. Single source of truth. Reduce duplication. Easier maintenance. Bugs fixed once. Inheritance and composition. Shared utilities. Balance with premature abstraction. Rule of Three.' },
        { name: 'YAGNI', explanation: 'You Aren\'t Gonna Need It. Don\'t add functionality until needed. Avoid speculation. Simpler code. Easier to change. Less code to maintain. Refactor when needed. Agile principle. Deliver value now.' },
        { name: 'Naming Conventions', explanation: 'Clear, descriptive names. Classes: nouns (User, Order). Methods: verbs (calculate, send). Intention revealing. Consistent naming. No abbreviations unless standard. searchable names. Pronounceable names. Domain language.' }
      ]
    }
  ]

  const handleConceptClick = (concept) => {
    setSelectedConcept(concept)
  }


  // Use ref to access current selectedConcept in event handler
  const selectedConceptRef = useRef(selectedConcept)
  useEffect(() => {
    selectedConceptRef.current = selectedConcept
  }, [selectedConcept])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const currentSelectedConcept = selectedConceptRef.current

      // Handle Escape to go back
      if (e.key === 'Escape') {
        if (currentSelectedConcept) {
          e.preventDefault()
          e.stopImmediatePropagation()
          setSelectedConcept(null)
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div ref={modalRef} style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto' }}>
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
            ref={firstFocusableRef}
            onClick={onBack}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(147, 51, 234, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7e22ce'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
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
              🏗️ Object-Oriented Design
            </h1>
            {currentSubcategory && (
              <span style={{
                padding: '0.25rem 0.75rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                backgroundColor: '#f3e8ff',
                color: '#7e22ce',
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
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8b5cf6'}
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
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(139, 92, 246, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8b5cf6'}
            >
              {nextName} →
            </button>
          )}
        </div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <p style={{
        fontSize: '1.2rem',
        color: '#4b5563',
        textAlign: 'center',
        marginBottom: '3rem',
        lineHeight: '1.8'
      }}>
        Object-Oriented Design: SOLID principles for maintainable code, inheritance for class hierarchies,
        composition for flexible design, encapsulation for data hiding, abstraction for simplification,
        polymorphism for flexibility, design patterns, and class design best practices.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedConcept ? '350px 1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {!selectedConcept ? (
          concepts.map((concept, idx) => (
            <div
              key={idx}
              onClick={() => handleConceptClick(concept)}
              style={{
                backgroundColor: `${concept.color}0D`,
                padding: '2rem',
                borderRadius: '12px',
                border: `2px solid ${concept.color}33`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${concept.color}1A`
                e.currentTarget.style.borderColor = concept.color
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = `0 8px 16px ${concept.color}33`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${concept.color}0D`
                e.currentTarget.style.borderColor = `${concept.color}33`
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{concept.icon}</div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: concept.color,
                  margin: '0 0 0.5rem 0'
                }}>
                  {concept.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#6b7280',
                  margin: 0,
                  lineHeight: '1.5'
                }}>
                  {concept.description.substring(0, 100)}...
                </p>
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontWeight: '600',
                color: concept.color,
                marginTop: '1rem'
              }}>
                Click to explore →
              </div>
            </div>
          ))
        ) : (
          <>
            <div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '1.5rem'
              }}>
                OOP Concepts
              </h3>
              <div style={{ display: 'grid', gap: '1rem' }}>
                {concepts.map((concept, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleConceptClick(concept)}
                    style={{
                      backgroundColor: selectedConcept?.name === concept.name
                        ? `${concept.color}26`
                        : `${concept.color}0D`,
                      padding: '1rem',
                      borderRadius: '8px',
                      border: selectedConcept?.name === concept.name
                        ? `3px solid ${concept.color}`
                        : `2px solid ${concept.color}33`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedConcept?.name !== concept.name) {
                        e.currentTarget.style.backgroundColor = `${concept.color}1A`
                        e.currentTarget.style.borderColor = concept.color
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedConcept?.name !== concept.name) {
                        e.currentTarget.style.backgroundColor = `${concept.color}0D`
                        e.currentTarget.style.borderColor = `${concept.color}33`
                      }
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{concept.icon}</div>
                    <div style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: selectedConcept?.name === concept.name ? concept.color : '#1f2937',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {concept.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <button
                onClick={() => setSelectedConcept(null)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  backgroundColor: selectedConcept.color,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginBottom: '1.5rem',
                  transition: 'all 0.2s ease'
                }}
              >
                ← Back to All Concepts
              </button>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <span style={{ fontSize: '3rem' }}>{selectedConcept.icon}</span>
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: selectedConcept.color,
                  margin: 0
                }}>
                  {selectedConcept.name}
                </h3>
              </div>

              <p style={{
                fontSize: '1.1rem',
                color: '#6b7280',
                lineHeight: '1.8',
                marginBottom: '2rem'
              }}>
                {selectedConcept.description}
              </p>

              {selectedConcept.details.map((detail, idx) => (
                <div key={idx} style={{
                  backgroundColor: '#f9fafb',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: `2px solid ${selectedConcept.color}33`,
                  marginBottom: '1rem'
                }}>
                  <h4 style={{
                    fontSize: '1.2rem',
                    fontWeight: '700',
                    color: selectedConcept.color,
                    marginBottom: '0.75rem'
                  }}>
                    {detail.name}
                  </h4>
                  <p style={{
                    fontSize: '1rem',
                    color: '#374151',
                    lineHeight: '1.7',
                    margin: 0
                  }}>
                    {detail.explanation}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Class
