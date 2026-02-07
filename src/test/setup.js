import '@testing-library/jest-dom'

// Mock localStorage with working in-memory storage
// Uses vi.fn() wrappers so tests can still spy on calls
let store = {}

const localStorageMock = {
  getItem: vi.fn((key) => {
    return store[key] !== undefined ? store[key] : null
  }),
  setItem: vi.fn((key, value) => {
    store[key] = String(value)
  }),
  removeItem: vi.fn((key) => {
    delete store[key]
  }),
  clear: vi.fn(() => {
    store = {}
  })
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Reset store between tests
afterEach(() => {
  store = {}
})

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

// Mock CustomEvent
window.CustomEvent = class CustomEvent extends Event {
  constructor(type, params = {}) {
    super(type, params)
    this.detail = params.detail
  }
}
