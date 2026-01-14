import { useState, useEffect } from 'react'
import CompletionCheckbox from '../../components/CompletionCheckbox.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import DrawingCanvas from '../../components/DrawingCanvas.jsx'
import Breadcrumb from '../../components/Breadcrumb'
import { isProblemCompleted } from '../../services/progressService'
import { getPreferredLanguage } from '../../services/languageService'
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation'

function ObjectOrientedProgramming({ onBack, onPrevious, onNext, previousName, nextName, currentSubcategory, previousSubcategory, nextSubcategory, onPreviousSubcategory, onNextSubcategory, breadcrumb }) {
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [showSolution, setShowSolution] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userCode, setUserCode] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [language, setLanguage] = useState(getPreferredLanguage())
  const [showDrawing, setShowDrawing] = useState(false)
  const [currentDrawing, setCurrentDrawing] = useState(null)
  const [expandedSections, setExpandedSections] = useState({
    Easy: true,
    Medium: true,
    Hard: true
  })

  useEffect(() => {
    const handleProgressUpdate = () => setRefreshKey(prev => prev + 1)
    window.addEventListener('progressUpdate', handleProgressUpdate)
    return () => window.removeEventListener('progressUpdate', handleProgressUpdate)
  }, [])

  useEffect(() => {
    const handleLanguageChange = (e) => {
      setLanguage(e.detail)
      if (selectedQuestion) {
        setUserCode(selectedQuestion.code[e.detail].starterCode)
      }
    }
    window.addEventListener('languageChange', handleLanguageChange)
    return () => window.removeEventListener('languageChange', handleLanguageChange)
  }, [selectedQuestion])

  const questions = [
    {
      id: 1,
      title: 'Implement Parking Lot System',
      difficulty: 'Medium',
      description: 'Complete the parking lot system by implementing the parkVehicle and removeVehicle methods. The system should find an available spot that fits the vehicle type.',
      examples: [
        { input: 'Vehicle car = new Vehicle("ABC123", VehicleType.CAR)', output: 'Parked: true' },
        { input: 'lot.removeVehicle("ABC123")', output: 'Removed: true' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;

enum VehicleType {
    CAR, MOTORCYCLE, BUS
}

enum SpotSize {
    COMPACT, LARGE, HANDICAPPED
}

class Vehicle {
    private String licensePlate;
    private VehicleType type;

    public Vehicle(String licensePlate, VehicleType type) {
        this.licensePlate = licensePlate;
        this.type = type;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public SpotSize getRequiredSpotSize() {
        switch(type) {
            case MOTORCYCLE: return SpotSize.COMPACT;
            case CAR: return SpotSize.LARGE;
            case BUS: return SpotSize.HANDICAPPED;
            default: return SpotSize.LARGE;
        }
    }
}

class ParkingSpot {
    private int id;
    private SpotSize size;
    private Vehicle vehicle;

    public ParkingSpot(int id, SpotSize size) {
        this.id = id;
        this.size = size;
        this.vehicle = null;
    }

    public boolean isAvailable() {
        return vehicle == null;
    }

    public boolean canFitVehicle(Vehicle v) {
        if (!isAvailable()) return false;
        return size.ordinal() >= v.getRequiredSpotSize().ordinal();
    }

    public void parkVehicle(Vehicle v) {
        vehicle = v;
    }

    public void removeVehicle() {
        vehicle = null;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }
}

class ParkingLot {
    private List<ParkingSpot> spots;

    public ParkingLot(List<ParkingSpot> spots) {
        this.spots = spots;
    }

    // TODO: Implement parkVehicle method - find available spot that fits vehicle and park it
    public boolean parkVehicle(Vehicle vehicle) {
        return false;
    }

    // TODO: Implement removeVehicle method - find vehicle by license plate and remove it
    public boolean removeVehicle(String licensePlate) {
        return false;
    }
}

class Main {
    public static void main(String[] args) {
        List<ParkingSpot> spots = Arrays.asList(
            new ParkingSpot(1, SpotSize.COMPACT),
            new ParkingSpot(2, SpotSize.LARGE),
            new ParkingSpot(3, SpotSize.HANDICAPPED)
        );

        ParkingLot lot = new ParkingLot(spots);

        Vehicle car = new Vehicle("ABC123", VehicleType.CAR);
        System.out.println("Parked: " + lot.parkVehicle(car));
        System.out.println("Removed: " + lot.removeVehicle("ABC123"));
    }
}`,
          solution: `import java.util.*;

enum VehicleType {
    CAR, MOTORCYCLE, BUS
}

enum SpotSize {
    COMPACT, LARGE, HANDICAPPED
}

class Vehicle {
    private String licensePlate;
    private VehicleType type;

    public Vehicle(String licensePlate, VehicleType type) {
        this.licensePlate = licensePlate;
        this.type = type;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public SpotSize getRequiredSpotSize() {
        switch(type) {
            case MOTORCYCLE: return SpotSize.COMPACT;
            case CAR: return SpotSize.LARGE;
            case BUS: return SpotSize.HANDICAPPED;
            default: return SpotSize.LARGE;
        }
    }
}

class ParkingSpot {
    private int id;
    private SpotSize size;
    private Vehicle vehicle;

    public ParkingSpot(int id, SpotSize size) {
        this.id = id;
        this.size = size;
        this.vehicle = null;
    }

    public boolean isAvailable() {
        return vehicle == null;
    }

    public boolean canFitVehicle(Vehicle v) {
        if (!isAvailable()) return false;
        return size.ordinal() >= v.getRequiredSpotSize().ordinal();
    }

    public void parkVehicle(Vehicle v) {
        vehicle = v;
    }

    public void removeVehicle() {
        vehicle = null;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }
}

class ParkingLot {
    private List<ParkingSpot> spots;

    public ParkingLot(List<ParkingSpot> spots) {
        this.spots = spots;
    }

    public boolean parkVehicle(Vehicle vehicle) {
        for (ParkingSpot spot : spots) {
            if (spot.canFitVehicle(vehicle)) {
                spot.parkVehicle(vehicle);
                return true;
            }
        }
        return false;
    }

    public boolean removeVehicle(String licensePlate) {
        for (ParkingSpot spot : spots) {
            Vehicle v = spot.getVehicle();
            if (v != null && v.getLicensePlate().equals(licensePlate)) {
                spot.removeVehicle();
                return true;
            }
        }
        return false;
    }
}

class Main {
    public static void main(String[] args) {
        List<ParkingSpot> spots = Arrays.asList(
            new ParkingSpot(1, SpotSize.COMPACT),
            new ParkingSpot(2, SpotSize.LARGE),
            new ParkingSpot(3, SpotSize.HANDICAPPED)
        );

        ParkingLot lot = new ParkingLot(spots);

        Vehicle car = new Vehicle("ABC123", VehicleType.CAR);
        System.out.println("Parked: " + lot.parkVehicle(car));
        System.out.println("Removed: " + lot.removeVehicle("ABC123"));
    }
}`
        },
        python: {
          starterCode: `from enum import Enum

class VehicleType(Enum):
    CAR = 1
    MOTORCYCLE = 2
    BUS = 3

class SpotSize(Enum):
    COMPACT = 1
    LARGE = 2
    HANDICAPPED = 3

class Vehicle:
    def __init__(self, license_plate, vehicle_type):
        self.license_plate = license_plate
        self.vehicle_type = vehicle_type

    def get_required_spot_size(self):
        # TODO: Return required spot size based on vehicle type
        pass

class ParkingSpot:
    def __init__(self, spot_id, size):
        self.spot_id = spot_id
        self.size = size
        self.vehicle = None

    def is_available(self):
        return self.vehicle is None

    def can_fit_vehicle(self, vehicle):
        # TODO: Check if vehicle can fit
        pass

    def park_vehicle(self, vehicle):
        self.vehicle = vehicle

    def remove_vehicle(self):
        self.vehicle = None

class ParkingLot:
    def __init__(self, spots):
        self.spots = spots

    def park_vehicle(self, vehicle):
        # TODO: Find available spot and park vehicle
        pass

    def remove_vehicle(self, license_plate):
        # TODO: Find and remove vehicle
        pass

# Test
spots = [
    ParkingSpot(1, SpotSize.COMPACT),
    ParkingSpot(2, SpotSize.LARGE),
    ParkingSpot(3, SpotSize.HANDICAPPED)
]

lot = ParkingLot(spots)
car = Vehicle("ABC123", VehicleType.CAR)
print(f"Parked: {lot.park_vehicle(car)}")
print(f"Removed: {lot.remove_vehicle('ABC123')}")`,
          solution: `from enum import Enum

class VehicleType(Enum):
    CAR = 1
    MOTORCYCLE = 2
    BUS = 3

class SpotSize(Enum):
    COMPACT = 1
    LARGE = 2
    HANDICAPPED = 3

class Vehicle:
    def __init__(self, license_plate, vehicle_type):
        self.license_plate = license_plate
        self.vehicle_type = vehicle_type

    def get_required_spot_size(self):
        if self.vehicle_type == VehicleType.MOTORCYCLE:
            return SpotSize.COMPACT
        elif self.vehicle_type == VehicleType.CAR:
            return SpotSize.LARGE
        else:  # BUS
            return SpotSize.HANDICAPPED

class ParkingSpot:
    def __init__(self, spot_id, size):
        self.spot_id = spot_id
        self.size = size
        self.vehicle = None

    def is_available(self):
        return self.vehicle is None

    def can_fit_vehicle(self, vehicle):
        if not self.is_available():
            return False
        return self.size.value >= vehicle.get_required_spot_size().value

    def park_vehicle(self, vehicle):
        self.vehicle = vehicle

    def remove_vehicle(self):
        self.vehicle = None

    def get_vehicle(self):
        return self.vehicle

class ParkingLot:
    def __init__(self, spots):
        self.spots = spots

    def park_vehicle(self, vehicle):
        for spot in self.spots:
            if spot.can_fit_vehicle(vehicle):
                spot.park_vehicle(vehicle)
                return True
        return False

    def remove_vehicle(self, license_plate):
        for spot in self.spots:
            vehicle = spot.get_vehicle()
            if vehicle and vehicle.license_plate == license_plate:
                spot.remove_vehicle()
                return True
        return False

# Test
spots = [
    ParkingSpot(1, SpotSize.COMPACT),
    ParkingSpot(2, SpotSize.LARGE),
    ParkingSpot(3, SpotSize.HANDICAPPED)
]

lot = ParkingLot(spots)
car = Vehicle("ABC123", VehicleType.CAR)
print(f"Parked: {lot.park_vehicle(car)}")
print(f"Removed: {lot.remove_vehicle('ABC123')}")`
        }
      },
      explanation: 'Iterate through spots to find one that can fit the vehicle. For removal, iterate and match by license plate.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 2,
      title: 'Thread-Safe Singleton',
      difficulty: 'Medium',
      description: 'Implement the thread-safe singleton pattern using double-checked locking. The getInstance method should lazily create the instance and be safe in multi-threaded environments.',
      examples: [
        { input: 'DatabaseConnection.getInstance()', output: 'Creates single instance' },
        { input: 'db1 == db2', output: 'true' }
      ],
      code: {
        java: {
          starterCode: `public class DatabaseConnection {
    // TODO: Add volatile static instance field and implement thread-safe getInstance() with double-checked locking

    private DatabaseConnection() {
        System.out.println("Creating database connection...");
    }

    public void connect() {
        System.out.println("Connected to database");
    }
}

class Main {
    public static void main(String[] args) {
        DatabaseConnection db1 = DatabaseConnection.getInstance();
        DatabaseConnection db2 = DatabaseConnection.getInstance();

        System.out.println("Same instance: " + (db1 == db2));
        db1.connect();
    }
}`,
          solution: `public class DatabaseConnection {
    private static volatile DatabaseConnection instance;

    private DatabaseConnection() {
        System.out.println("Creating database connection...");
    }

    public static DatabaseConnection getInstance() {
        if (instance == null) {
            synchronized (DatabaseConnection.class) {
                if (instance == null) {
                    instance = new DatabaseConnection();
                }
            }
        }
        return instance;
    }

    public void connect() {
        System.out.println("Connected to database");
    }
}

class Main {
    public static void main(String[] args) {
        DatabaseConnection db1 = DatabaseConnection.getInstance();
        DatabaseConnection db2 = DatabaseConnection.getInstance();

        System.out.println("Same instance: " + (db1 == db2));
        db1.connect();
    }
}`
        },
        python: {
          starterCode: `class DatabaseConnection:
    _instance = None

    def __new__(cls):
        # TODO: Implement singleton pattern
        pass

    def __init__(self):
        if not hasattr(self, 'initialized'):
            print("Creating database connection...")
            self.initialized = True

    def connect(self):
        print("Connected to database")

# Test
db1 = DatabaseConnection()
db2 = DatabaseConnection()
print(f"Same instance: {db1 is db2}")
db1.connect()`,
          solution: `import threading

class DatabaseConnection:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        if not hasattr(self, 'initialized'):
            print("Creating database connection...")
            self.initialized = True

    def connect(self):
        print("Connected to database")

# Test
db1 = DatabaseConnection()
db2 = DatabaseConnection()
print(f"Same instance: {db1 is db2}")
db1.connect()`
        }
      },
      explanation: 'Use double-checked locking: check null, synchronize, check null again. Volatile prevents reordering.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 3,
      title: 'Shape Hierarchy with Polymorphism',
      difficulty: 'Easy',
      description: 'Complete the shape hierarchy by implementing the calculateArea method for Circle, Rectangle, and Triangle. Use polymorphism to calculate areas for different shapes.',
      examples: [
        { input: 'new Circle(5)', output: 'area = 78.54' },
        { input: 'new Rectangle(4, 6)', output: 'area = 24.0' }
      ],
      code: {
        java: {
          starterCode: `abstract class Shape {
    public abstract double calculateArea();
}

class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    // TODO: Implement calculateArea using formula: π * r²
    public double calculateArea() {
        return 0;
    }
}

class Rectangle extends Shape {
    private double width, height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    // TODO: Implement calculateArea using formula: width * height
    public double calculateArea() {
        return 0;
    }
}

class Triangle extends Shape {
    private double base, height;

    public Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }

    // TODO: Implement calculateArea using formula: 0.5 * base * height
    public double calculateArea() {
        return 0;
    }
}

class Main {
    public static void main(String[] args) {
        Shape circle = new Circle(5);
        Shape rectangle = new Rectangle(4, 6);
        Shape triangle = new Triangle(3, 8);

        System.out.println("Circle area: " + circle.calculateArea());
        System.out.println("Rectangle area: " + rectangle.calculateArea());
        System.out.println("Triangle area: " + triangle.calculateArea());
    }
}`,
          solution: `abstract class Shape {
    public abstract double calculateArea();
}

class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}

class Rectangle extends Shape {
    private double width, height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public double calculateArea() {
        return width * height;
    }
}

class Triangle extends Shape {
    private double base, height;

    public Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }

    public double calculateArea() {
        return 0.5 * base * height;
    }
}

class Main {
    public static void main(String[] args) {
        Shape circle = new Circle(5);
        Shape rectangle = new Rectangle(4, 6);
        Shape triangle = new Triangle(3, 8);

        System.out.println("Circle area: " + circle.calculateArea());
        System.out.println("Rectangle area: " + rectangle.calculateArea());
        System.out.println("Triangle area: " + triangle.calculateArea());
    }
}`
        },
        python: {
          starterCode: `from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def calculate_area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def calculate_area(self):
        # TODO: π * r²
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def calculate_area(self):
        # TODO: width * height
        pass

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def calculate_area(self):
        # TODO: 0.5 * base * height
        pass

# Test
circle = Circle(5)
rectangle = Rectangle(4, 6)
triangle = Triangle(3, 8)

print(f"Circle area: {circle.calculate_area()}")
print(f"Rectangle area: {rectangle.calculate_area()}")
print(f"Triangle area: {triangle.calculate_area()}")`,
          solution: `from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def calculate_area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def calculate_area(self):
        return math.pi * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def calculate_area(self):
        return self.width * self.height

class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def calculate_area(self):
        return 0.5 * self.base * self.height

# Test
circle = Circle(5)
rectangle = Rectangle(4, 6)
triangle = Triangle(3, 8)

print(f"Circle area: {circle.calculate_area()}")
print(f"Rectangle area: {rectangle.calculate_area()}")
print(f"Triangle area: {triangle.calculate_area()}")`
        }
      },
      explanation: 'Abstract class defines contract. Each subclass implements calculateArea with specific formula.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)'
    },
    {
      id: 4,
      title: 'Observer Pattern',
      difficulty: 'Medium',
      description: 'Implement the Observer pattern by completing the attach, detach, and notifyObservers methods. When the subject\'s state changes, all attached observers should be notified.',
      examples: [
        { input: 'subject.attach(observer1)', output: 'Observer registered' },
        { input: 'subject.setState(5)', output: 'All observers notified' }
      ],
      code: {
        java: {
          starterCode: `import java.util.*;

interface Observer {
    void update(int state);
}

interface Subject {
    void attach(Observer observer);
    void detach(Observer observer);
    void notifyObservers();
}

class ConcreteSubject implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private int state;

    // TODO: Implement attach - add observer to list if not already present
    public void attach(Observer observer) {
    }

    // TODO: Implement detach - remove observer from list
    public void detach(Observer observer) {
    }

    // TODO: Implement notifyObservers - call update on all observers
    public void notifyObservers() {
    }

    public void setState(int state) {
        this.state = state;
        notifyObservers();
    }
}

class ConcreteObserver implements Observer {
    private String name;

    public ConcreteObserver(String name) {
        this.name = name;
    }

    public void update(int state) {
        System.out.println(name + " received update: " + state);
    }
}

class Main {
    public static void main(String[] args) {
        ConcreteSubject subject = new ConcreteSubject();

        Observer obs1 = new ConcreteObserver("Observer1");
        Observer obs2 = new ConcreteObserver("Observer2");

        subject.attach(obs1);
        subject.attach(obs2);

        subject.setState(5);
        subject.setState(10);

        subject.detach(obs1);
        subject.setState(15);
    }
}`,
          solution: `import java.util.*;

interface Observer {
    void update(int state);
}

interface Subject {
    void attach(Observer observer);
    void detach(Observer observer);
    void notifyObservers();
}

class ConcreteSubject implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private int state;

    public void attach(Observer observer) {
        if (!observers.contains(observer)) {
            observers.add(observer);
        }
    }

    public void detach(Observer observer) {
        observers.remove(observer);
    }

    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(state);
        }
    }

    public void setState(int state) {
        this.state = state;
        notifyObservers();
    }
}

class ConcreteObserver implements Observer {
    private String name;

    public ConcreteObserver(String name) {
        this.name = name;
    }

    public void update(int state) {
        System.out.println(name + " received update: " + state);
    }
}

class Main {
    public static void main(String[] args) {
        ConcreteSubject subject = new ConcreteSubject();

        Observer obs1 = new ConcreteObserver("Observer1");
        Observer obs2 = new ConcreteObserver("Observer2");

        subject.attach(obs1);
        subject.attach(obs2);

        subject.setState(5);
        subject.setState(10);

        subject.detach(obs1);
        subject.setState(15);
    }
}`
        },
        python: {
          starterCode: `class Observer:
    def update(self, state):
        pass

class Subject:
    def attach(self, observer):
        pass

    def detach(self, observer):
        pass

    def notify_observers(self):
        pass

class ConcreteSubject(Subject):
    def __init__(self):
        self._observers = []
        self._state = 0

    def attach(self, observer):
        # TODO: Add observer
        pass

    def detach(self, observer):
        # TODO: Remove observer
        pass

    def notify_observers(self):
        # TODO: Notify all observers
        pass

    def set_state(self, state):
        self._state = state
        self.notify_observers()

class ConcreteObserver(Observer):
    def __init__(self, name):
        self.name = name

    def update(self, state):
        print(f"{self.name} received update: {state}")

# Test
subject = ConcreteSubject()
obs1 = ConcreteObserver("Observer1")
obs2 = ConcreteObserver("Observer2")

subject.attach(obs1)
subject.attach(obs2)

subject.set_state(5)
subject.set_state(10)

subject.detach(obs1)
subject.set_state(15)`,
          solution: `class Observer:
    def update(self, state):
        pass

class Subject:
    def attach(self, observer):
        pass

    def detach(self, observer):
        pass

    def notify_observers(self):
        pass

class ConcreteSubject(Subject):
    def __init__(self):
        self._observers = []
        self._state = 0

    def attach(self, observer):
        if observer not in self._observers:
            self._observers.append(observer)

    def detach(self, observer):
        if observer in self._observers:
            self._observers.remove(observer)

    def notify_observers(self):
        for observer in self._observers:
            observer.update(self._state)

    def set_state(self, state):
        self._state = state
        self.notify_observers()

class ConcreteObserver(Observer):
    def __init__(self, name):
        self.name = name

    def update(self, state):
        print(f"{self.name} received update: {state}")

# Test
subject = ConcreteSubject()
obs1 = ConcreteObserver("Observer1")
obs2 = ConcreteObserver("Observer2")

subject.attach(obs1)
subject.attach(obs2)

subject.set_state(5)
subject.set_state(10)

subject.detach(obs1)
subject.set_state(15)`
        }
      },
      explanation: 'Maintain list of observers. On state change, iterate and call update() on each observer.',
      timeComplexity: 'O(n) for notification',
      spaceComplexity: 'O(n) for observer list'
    }
  ]

  const getCompletionStats = () => {
    const completed = questions.filter(q => isProblemCompleted(`ObjectOrientedProgramming-${q.id}`)).length
    return { completed, total: questions.length, percentage: Math.round((completed / questions.length) * 100) }
  }

  const stats = getCompletionStats()

  const groupedQuestions = {
    Easy: questions.filter(q => q.difficulty === 'Easy'),
    Medium: questions.filter(q => q.difficulty === 'Medium'),
    Hard: questions.filter(q => q.difficulty === 'Hard')
  }

  const selectQuestion = (question) => {
    setSelectedQuestion(question)
    setShowSolution(false)
    setShowExplanation(false)
    setUserCode(question.code[language].starterCode)
    setOutput('')
    setShowDrawing(false)
  }

  const toggleSection = (difficulty) => {
    setExpandedSections(prev => ({ ...prev, [difficulty]: !prev[difficulty] }))
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return '#10b981'
      case 'Medium': return '#f59e0b'
      case 'Hard': return '#ef4444'
      default: return '#6b7280'
    }
  }

  if (selectedQuestion) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', color: 'white', padding: '1.5rem' }}>
      <div style={{ padding: '2rem', maxWidth: '1800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={() => setSelectedQuestion(null)} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d97706'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59e0b'}>
            ← Back to Java
          </button>
          <LanguageToggle />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.75rem', color: '#fbbf24', margin: 0 }}>{selectedQuestion.title}</h2>
              <span style={{ padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '600', backgroundColor: getDifficultyColor(selectedQuestion.difficulty) + '20', color: getDifficultyColor(selectedQuestion.difficulty) }}>
                {selectedQuestion.difficulty}
              </span>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <CompletionCheckbox problemId={`ObjectOrientedProgramming-${selectedQuestion.id}`} />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Description</h3>
              <p style={{ fontSize: '1rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.description}</p>
            </div>

            {selectedQuestion.examples && selectedQuestion.examples.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Examples</h3>
                {selectedQuestion.examples.map((example, idx) => (
                  <div key={idx} style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '1rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid #374151', color: '#d1d5db' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#fbbf24' }}>Input:</strong> <code style={{ color: '#d1d5db' }}>{example.input}</code>
                    </div>
                    <div>
                      <strong style={{ color: '#fbbf24' }}>Output:</strong> <code style={{ color: '#d1d5db' }}>{example.output}</code>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {selectedQuestion.explanation && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', marginBottom: '0.75rem' }}>Explanation</h3>
                <p style={{ fontSize: '0.95rem', color: '#d1d5db', lineHeight: '1.6' }}>{selectedQuestion.explanation}</p>
              </div>
            )}

            {(selectedQuestion.timeComplexity || selectedQuestion.spaceComplexity) && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '8px', border: '1px solid #374151' }}>
                <h3 style={{ fontSize: '1rem', color: '#fbbf24', marginBottom: '0.5rem' }}>Complexity</h3>
                {selectedQuestion.timeComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Time: {selectedQuestion.timeComplexity}</div>}
                {selectedQuestion.spaceComplexity && <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Space: {selectedQuestion.spaceComplexity}</div>}
              </div>
            )}
          </div>

          <div style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '2rem', borderRadius: '12px', border: '2px solid #374151', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <button onClick={() => { setShowSolution(!showSolution); if (!showSolution) setUserCode(selectedQuestion.code[language].solution) }} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {showSolution ? 'Hide' : 'Show'} Solution
              </button>
              <button onClick={() => setUserCode(selectedQuestion.code[language].starterCode)} style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Reset Code
              </button>
            </div>

            <textarea value={userCode} onChange={(e) => setUserCode(e.target.value)} style={{ flex: 1, width: '100%', padding: '1rem', fontFamily: 'monospace', fontSize: '0.9rem', border: '2px solid #374151', borderRadius: '8px', resize: 'none', lineHeight: '1.5', backgroundColor: '#111827', color: '#d1d5db' }} spellCheck={false} />

            {output && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1rem', color: '#fbbf24', marginBottom: '0.5rem' }}>Output</h3>
                <pre style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '1rem', borderRadius: '8px', border: '1px solid #374151', overflow: 'auto', fontSize: '0.875rem', maxHeight: '150px', color: '#d1d5db' }}>{output}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', background: 'linear-gradient(to bottom right, #111827, #1e3a5f, #111827)', minHeight: '100vh' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', fontSize: '1rem', fontWeight: '600', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          ← Back
        </button>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} />

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#f3f4f6', marginBottom: '0.5rem' }}>Object-Oriented Programming</h1>
        <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>Master OOP principles, design patterns, and best practices</p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <div style={{ padding: '1rem 2rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: '2px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#60a5fa' }}>{stats.completed}/{stats.total}</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Completed</div>
          </div>
          <div style={{ padding: '1rem 2rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', borderRadius: '12px', border: '2px solid #374151' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#34d399' }}>{stats.percentage}%</div>
            <div style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>Progress</div>
          </div>
        </div>
      </div>

      {Object.entries(groupedQuestions).map(([difficulty, difficultyQuestions]) => (
        difficultyQuestions.length > 0 && (
          <div key={difficulty} style={{ marginBottom: '2rem' }}>
            <button onClick={() => toggleSection(difficulty)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', background: 'linear-gradient(to bottom right, #1f2937, #111827)', border: '2px solid #374151', borderRadius: '12px', cursor: 'pointer', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: getDifficultyColor(difficulty) }}>{difficulty}</span>
                <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>({difficultyQuestions.length} problems)</span>
              </div>
              <span style={{ fontSize: '1.25rem', color: '#9ca3af' }}>{expandedSections[difficulty] ? '▼' : '▶'}</span>
            </button>

            {expandedSections[difficulty] && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
                {difficultyQuestions.map((question) => (
                  <div key={question.id} onClick={() => selectQuestion(question)} style={{ background: 'linear-gradient(to bottom right, #1f2937, #111827)', padding: '1.5rem', borderRadius: '12px', border: '2px solid #374151', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.3)' }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#f3f4f6', margin: 0, flex: 1 }}>{question.id}. {question.title}</h3>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.5', marginBottom: '1rem' }}>{question.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: getDifficultyColor(question.difficulty) + '20', color: getDifficultyColor(question.difficulty) }}>{question.difficulty}</span>
                      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ transform: 'scale(0.85)' }}>
                          <CompletionCheckbox problemId={`ObjectOrientedProgramming-${question.id}`} />
                        </div>
                        {question.leetcodeUrl && (
                          <a
                            href={question.leetcodeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ padding: '0.25rem 0.75rem', backgroundColor: '#FFA116', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.75rem', fontWeight: '600', display: 'inline-block' }}
                          >
                            LeetCode ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      ))}
    </div>
  )
}

export default ObjectOrientedProgramming
