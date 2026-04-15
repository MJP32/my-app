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

    highlighted = highlighted.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, (match) => {
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
      .replace(/\b(import|export|from|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|const|let|var|function|async|await|yield|of|in|typeof|instanceof|void|default|static|get|set|constructor|super|this|null|undefined|readonly|abstract|declare|public|private|protected|as|type|enum|namespace|module)\b/g, '<span style="color: #c586c0;">$1</span>')
      .replace(/\b(true|false|number|string|boolean|any|never|unknown|object|void|null|undefined)\b/g, '<span style="color: #569cd6;">$1</span>')
      .replace(/\b(Component|NgModule|Injectable|Input|Output|EventEmitter|OnInit|OnDestroy|OnChanges|AfterViewInit|ViewChild|ContentChild|HostListener|Pipe|Directive|NgIf|NgFor|NgSwitch|NgClass|NgStyle|FormGroup|FormControl|FormBuilder|Validators|FormArray|HttpClient|HttpHeaders|HttpInterceptor|HttpRequest|HttpHandler|HttpEvent|ActivatedRoute|Router|RouterModule|Routes|CanActivate|CanDeactivate|Resolve|Observable|Subject|BehaviorSubject|ReplaySubject|Subscription|Store|Action|Reducer|Effect|TemplateRef|ElementRef|ChangeDetectorRef|Renderer2|NgZone|Inject|InjectionToken|SimpleChanges|PipeTransform)\b/g, '<span style="color: #4ec9b0;">$1</span>')
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

function Angular({ onBack, breadcrumb }) {
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
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
        >
          Back to Frameworks
        </button>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '800',
          background: 'linear-gradient(to right, #dd0031, #f06292)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          margin: 0
        }}>
          Angular Framework
        </h1>
        <div style={{ width: '150px' }}></div>
      </div>

      <Breadcrumb breadcrumb={breadcrumb} onMainMenu={breadcrumb?.onMainMenu || onBack} />

      <p style={{
        fontSize: '1.1rem',
        color: '#d1d5db',
        marginBottom: '2rem',
        lineHeight: '1.6'
      }}>
        Full-featured TypeScript framework for building scalable single-page applications
      </p>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        borderBottom: '2px solid #374151',
        overflowX: 'auto'
      }}>
        {['overview', 'components', 'services & DI', 'routing', 'state & forms', 'backend integration'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSection(tab)}
            style={{
              padding: '1rem 1.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              backgroundColor: activeSection === tab ? '#10b981' : 'transparent',
              color: activeSection === tab ? 'white' : '#9ca3af',
              border: 'none',
              borderRadius: '8px 8px 0 0',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textTransform: 'capitalize',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (activeSection !== tab) {
                e.target.style.backgroundColor = '#374151'
                e.target.style.color = '#d1d5db'
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== tab) {
                e.target.style.backgroundColor = 'transparent'
                e.target.style.color = '#9ca3af'
              }
            }}
          >
            {tab}
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
              What is Angular?
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Angular is a platform and framework for building single-page client applications using HTML and TypeScript.
              It implements core and optional functionality as a set of TypeScript libraries that you import into your applications.
              Angular is maintained by Google and provides a complete solution including routing, forms, HTTP client, and testing utilities.
            </p>
            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>Key Benefit:</strong> Opinionated full-featured framework with TypeScript-first development, dependency injection, and a powerful CLI for scaffolding and building applications
              </p>
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#d1d5db', marginTop: '1.5rem', marginBottom: '0.75rem' }}>
              Angular CLI Setup
            </h3>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// Install Angular CLI globally
// npm install -g @angular/cli

// Create a new project
// ng new my-app --routing --style=scss

// Generate components, services, etc.
// ng generate component header
// ng generate service data
// ng generate pipe format
// ng generate guard auth
// ng generate module shared

// Development server
// ng serve --open

// Production build
// ng build --configuration production`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Angular Architecture
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Angular applications are built using modules, components, services, and directives. The architecture follows a hierarchical component tree with unidirectional data flow.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// app.module.ts - Root Module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Standalone Components (Angular 14+)
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Angular 14 introduced standalone components, eliminating the need for NgModules. This is now the recommended approach in modern Angular.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// main.ts - Bootstrapping with standalone component
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
});

// app.component.ts - Standalone root component
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: \`
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
  \`
})
export class AppComponent {
  title = 'my-app';
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
              Angular Signals (Angular 16+)
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Signals provide a new reactive primitive for managing state with fine-grained reactivity and improved change detection performance.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  template: \`
    <h2>Count: {{ count() }}</h2>
    <h3>Double: {{ doubleCount() }}</h3>
    <button (click)="increment()">Increment</button>
    <button (click)="reset()">Reset</button>
  \`
})
export class CounterComponent {
  // Writable signal
  count = signal(0);

  // Computed signal - automatically updates when dependencies change
  doubleCount = computed(() => this.count() * 2);

  constructor() {
    // Effect - runs when signal values change
    effect(() => {
      console.log('Count changed to:', this.count());
    });
  }

  increment() {
    this.count.update(c => c + 1);
  }

  reset() {
    this.count.set(0);
  }
}`} />
            </div>
          </div>
        </div>
      )}

      {/* Components Section */}
      {activeSection === 'components' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Component Basics
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Components are the fundamental building blocks of Angular applications. Each component consists of a TypeScript class, an HTML template, and optional styles.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  template: \`
    <div class="card" [class.active]="isActive">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <span class="role">{{ user.role | uppercase }}</span>
      <button (click)="onSelect()">Select</button>
    </div>
  \`,
  styles: [\`
    .card { padding: 1rem; border: 1px solid #ccc; border-radius: 8px; }
    .card.active { border-color: #dd0031; background: #fff5f5; }
    .role { color: #666; font-size: 0.85rem; }
  \`]
})
export class UserCardComponent {
  // Input property - receives data from parent
  @Input() user!: { name: string; email: string; role: string };
  @Input() isActive = false;

  // Output event - emits events to parent
  @Output() selected = new EventEmitter<string>();

  onSelect() {
    this.selected.emit(this.user.email);
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
              Component Lifecycle Hooks
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Angular provides lifecycle hooks that give visibility into key moments in a component&apos;s life, from creation to destruction.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import {
  Component, OnInit, OnDestroy, OnChanges,
  AfterViewInit, Input, SimpleChanges, ViewChild, ElementRef
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: \`
    <div #container>
      <h2>{{ title }}</h2>
      <div *ngFor="let item of items">{{ item }}</div>
    </div>
  \`
})
export class DashboardComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input() title = 'Dashboard';
  @ViewChild('container') containerRef!: ElementRef;
  items: string[] = [];
  private subscription!: Subscription;

  // Called when input properties change
  ngOnChanges(changes: SimpleChanges) {
    if (changes['title']) {
      console.log('Title changed from',
        changes['title'].previousValue,
        'to', changes['title'].currentValue);
    }
  }

  // Called once after first ngOnChanges
  ngOnInit() {
    console.log('Component initialized');
    this.items = ['Item 1', 'Item 2', 'Item 3'];
  }

  // Called after the view is initialized
  ngAfterViewInit() {
    console.log('View height:', this.containerRef.nativeElement.offsetHeight);
  }

  // Called just before the component is destroyed
  ngOnDestroy() {
    console.log('Component destroyed - cleaning up');
    if (this.subscription) {
      this.subscription.unsubscribe();
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
              Template Syntax &amp; Data Binding
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Angular provides four forms of data binding: interpolation, property binding, event binding, and two-way binding.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`@Component({
  selector: 'app-binding-demo',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, NgClass, NgStyle],
  template: \`
    <!-- Interpolation -->
    <h1>{{ title }}</h1>
    <p>{{ getFullName() }}</p>

    <!-- Property binding -->
    <img [src]="imageUrl" [alt]="imageAlt">
    <button [disabled]="isLoading">Submit</button>

    <!-- Event binding -->
    <button (click)="handleClick($event)">Click Me</button>
    <input (keyup.enter)="onSearch(searchTerm)">

    <!-- Two-way binding (requires FormsModule) -->
    <input [(ngModel)]="username" placeholder="Username">
    <p>Hello, {{ username }}!</p>

    <!-- Structural directives -->
    <div *ngIf="isLoggedIn; else loginTemplate">
      Welcome back, {{ username }}!
    </div>
    <ng-template #loginTemplate>
      <p>Please log in.</p>
    </ng-template>

    <ul>
      <li *ngFor="let item of items; let i = index; trackBy: trackById">
        {{ i + 1 }}. {{ item.name }}
      </li>
    </ul>

    <!-- Attribute directives -->
    <div [ngClass]="{ 'active': isActive, 'disabled': isDisabled }">
      Styled element
    </div>
    <div [ngStyle]="{ 'color': textColor, 'font-size': fontSize + 'px' }">
      Dynamic styles
    </div>
  \`
})
export class BindingDemoComponent {
  title = 'Angular Binding Demo';
  imageUrl = '/assets/logo.png';
  imageAlt = 'Logo';
  isLoading = false;
  isLoggedIn = true;
  isActive = true;
  isDisabled = false;
  username = '';
  textColor = '#333';
  fontSize = 16;
  items = [
    { id: 1, name: 'First' },
    { id: 2, name: 'Second' }
  ];

  getFullName() { return 'John Doe'; }
  handleClick(event: Event) { console.log('Clicked', event); }
  onSearch(term: string) { console.log('Search:', term); }
  trackById(index: number, item: any) { return item.id; }
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
              Custom Directives &amp; Pipes
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Create reusable directives for DOM manipulation and pipes for data transformation in templates.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// Custom Attribute Directive
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow';
  @Input() defaultColor = '';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight || this.defaultColor || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}

// Custom Pipe
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 50, trail = '...'): string {
    if (!value) return '';
    return value.length > limit
      ? value.substring(0, limit) + trail
      : value;
  }
}

// Usage in template:
// <p [appHighlight]="'lightblue'">Hover to highlight</p>
// <p>{{ longText | truncate:100:'...' }}</p>`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Content Projection
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Content projection allows you to insert content into a component from the outside, similar to React&apos;s children pattern.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// card.component.ts - Multi-slot content projection
@Component({
  selector: 'app-card',
  standalone: true,
  template: \`
    <div class="card">
      <div class="card-header">
        <ng-content select="[card-header]"></ng-content>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <div class="card-footer">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  \`
})
export class CardComponent {}

// Usage:
// <app-card>
//   <h3 card-header>Card Title</h3>
//   <p>This is the main content of the card.</p>
//   <button card-footer>Action</button>
// </app-card>`} />
            </div>
          </div>
        </div>
      )}

      {/* Services & DI Section */}
      {activeSection === 'services & DI' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Services &amp; Dependency Injection
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Services are classes that handle business logic, data access, and shared state. Angular&apos;s DI system manages service instantiation and injection.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, map, tap } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'  // Singleton - available application-wide
})
export class UserService {
  private apiUrl = '/api/users';
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap(users => this.usersSubject.next(users)),
      catchError(this.handleError)
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(\`\${this.apiUrl}/\${id}\`);
  }

  createUser(user: Omit<User, 'id'>): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(this.apiUrl, user, { headers }).pipe(
      tap(newUser => {
        const current = this.usersSubject.getValue();
        this.usersSubject.next([...current, newUser]);
      })
    );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(\`\${this.apiUrl}/\${id}\`).pipe(
      tap(() => {
        const current = this.usersSubject.getValue();
        this.usersSubject.next(current.filter(u => u.id !== id));
      })
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    throw error;
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
              HTTP Interceptors
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Interceptors allow you to intercept and modify HTTP requests and responses globally, useful for authentication tokens, logging, and error handling.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler,
  HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    // Clone request and add auth header
    const authReq = token
      ? req.clone({
          setHeaders: { Authorization: \`Bearer \${token}\` }
        })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Try to refresh token
          return this.authService.refreshToken().pipe(
            switchMap(newToken => {
              const retryReq = req.clone({
                setHeaders: { Authorization: \`Bearer \${newToken}\` }
              });
              return next.handle(retryReq);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}

// Functional interceptor (Angular 15+)
import { HttpInterceptorFn } from '@angular/common/http';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = Date.now();
  return next(req).pipe(
    tap(event => {
      if (event.type !== 0) {
        const elapsed = Date.now() - started;
        console.log(\`\${req.method} \${req.url} - \${elapsed}ms\`);
      }
    })
  );
};

// Register in app config:
// provideHttpClient(withInterceptors([loggingInterceptor]))`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Injection Tokens &amp; Providers
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Use InjectionTokens for non-class dependencies and configure providers for flexible service instantiation.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import { InjectionToken, Injectable, Inject } from '@angular/core';

// Define an injection token for configuration
export interface AppConfig {
  apiUrl: string;
  production: boolean;
  maxRetries: number;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// Provide the config value
// In app.module.ts or bootstrapApplication:
// providers: [
//   {
//     provide: APP_CONFIG,
//     useValue: {
//       apiUrl: 'https://api.example.com',
//       production: true,
//       maxRetries: 3
//     }
//   }
// ]

// Inject it in a service
@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(@Inject(APP_CONFIG) private config: AppConfig) {}

  getBaseUrl(): string {
    return this.config.apiUrl;
  }
}

// Factory providers
// providers: [
//   {
//     provide: LoggerService,
//     useFactory: (config: AppConfig) => {
//       return config.production
//         ? new ProductionLogger()
//         : new DebugLogger();
//     },
//     deps: [APP_CONFIG]
//   }
// ]`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              RxJS Essentials for Angular
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Angular relies heavily on RxJS for handling asynchronous operations, events, and data streams.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import {
  Observable, Subject, BehaviorSubject, ReplaySubject,
  combineLatest, forkJoin, merge
} from 'rxjs';
import {
  map, filter, switchMap, mergeMap, concatMap,
  debounceTime, distinctUntilChanged, takeUntil,
  catchError, retry, shareReplay
} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private searchTerms = new Subject<string>();
  private destroy$ = new Subject<void>();

  // Debounced search with switchMap (cancels previous requests)
  searchResults$ = this.searchTerms.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => this.http.get<any[]>(\`/api/search?q=\${term}\`)),
    shareReplay(1),  // Cache last result
    takeUntil(this.destroy$)
  );

  constructor(private http: HttpClient) {}

  search(term: string) {
    this.searchTerms.next(term);
  }

  // Combine multiple streams
  getDashboardData(): Observable<any> {
    return combineLatest([
      this.http.get('/api/users'),
      this.http.get('/api/stats'),
      this.http.get('/api/notifications')
    ]).pipe(
      map(([users, stats, notifications]) => ({
        users, stats, notifications
      }))
    );
  }

  // Execute requests in parallel and wait for all
  loadInitialData(): Observable<any> {
    return forkJoin({
      config: this.http.get('/api/config'),
      profile: this.http.get('/api/profile'),
      permissions: this.http.get('/api/permissions')
    });
  }

  cleanup() {
    this.destroy$.next();
    this.destroy$.complete();
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
              Connecting to a REST Backend
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Angular&apos;s HttpClient provides a complete solution for communicating with REST APIs, including typed responses, error handling, and CORS proxy configuration for development.
            </p>
            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981',
              marginBottom: '1rem'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>Dev Proxy:</strong> During development, Angular CLI can proxy API calls to your backend server (e.g. Spring Boot on port 8080) to avoid CORS issues
              </p>
            </div>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// === STEP 1: Configure the dev proxy ===
// proxy.conf.json (project root)
// {
//   "/api": {
//     "target": "http://localhost:8080",
//     "secure": false,
//     "changeOrigin": true
//   }
// }
// angular.json -> serve -> options -> "proxyConfig": "proxy.conf.json"
// Now: ng serve -> /api/users -> proxied to http://localhost:8080/api/users

// === STEP 2: Provide HttpClient in app config ===
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
});`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              REST Service &amp; CRUD Operations
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Create a typed service layer that maps to your backend REST endpoints with full CRUD support, error handling, and loading state.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// models/product.model.ts
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;  // current page
}

// services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Product, PageResponse } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = '/api/products';  // proxied to Spring Boot

  constructor(private http: HttpClient) {}

  // GET /api/products?page=0&size=10&sort=name,asc
  getProducts(page = 0, size = 10, sort = 'name,asc'): Observable<PageResponse<Product>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sort', sort);
    return this.http.get<PageResponse<Product>>(this.baseUrl, { params }).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // GET /api/products/42
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(\`\${this.baseUrl}/\${id}\`).pipe(
      catchError(this.handleError)
    );
  }

  // POST /api/products  (body: JSON)
  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      catchError(this.handleError)
    );
  }

  // PUT /api/products/42
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(\`\${this.baseUrl}/\${id}\`, product).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE /api/products/42
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(\`\${this.baseUrl}/\${id}\`).pipe(
      catchError(this.handleError)
    );
  }

  // GET /api/products/search?q=laptop&category=electronics
  searchProducts(query: string, category?: string): Observable<Product[]> {
    let params = new HttpParams().set('q', query);
    if (category) params = params.set('category', category);
    return this.http.get<Product[]>(\`\${this.baseUrl}/search\`, { params });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'An error occurred';
    if (error.status === 0) {
      message = 'Cannot reach the server. Check if backend is running.';
    } else if (error.status === 404) {
      message = 'Resource not found';
    } else if (error.status === 422) {
      message = 'Validation failed: ' + JSON.stringify(error.error);
    } else if (error.status >= 500) {
      message = 'Server error. Please try again later.';
    }
    console.error(\`Backend returned \${error.status}: \${message}\`);
    return throwError(() => new Error(message));
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
              Component Consuming the REST Service
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Wire the service into a component with loading states, error display, and user actions that trigger backend calls.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import { Component, OnInit, signal } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  template: \`
    <!-- Loading state -->
    <div *ngIf="loading()" class="spinner">Loading products...</div>

    <!-- Error state -->
    <div *ngIf="error()" class="error">
      {{ error() }}
      <button (click)="loadProducts()">Retry</button>
    </div>

    <!-- Data state -->
    <table *ngIf="!loading() && !error()">
      <thead>
        <tr>
          <th>Name</th><th>Price</th><th>Category</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let product of products()">
          <td>{{ product.name }}</td>
          <td>{{ product.price | currency }}</td>
          <td>{{ product.category }}</td>
          <td>
            <button (click)="editProduct(product)">Edit</button>
            <button (click)="deleteProduct(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="pagination">
      <button [disabled]="currentPage() === 0" (click)="changePage(-1)">Previous</button>
      <span>Page {{ currentPage() + 1 }} of {{ totalPages() }}</span>
      <button [disabled]="currentPage() >= totalPages() - 1" (click)="changePage(1)">Next</button>
    </div>
  \`
})
export class ProductListComponent implements OnInit {
  products = signal<Product[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  currentPage = signal(0);
  totalPages = signal(0);

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);
    this.error.set(null);
    this.productService.getProducts(this.currentPage()).subscribe({
      next: (response) => {
        this.products.set(response.content);
        this.totalPages.set(response.totalPages);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  deleteProduct(id: number) {
    if (!confirm('Delete this product?')) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),  // refresh list
      error: (err) => this.error.set(err.message)
    });
  }

  changePage(delta: number) {
    this.currentPage.update(p => p + delta);
    this.loadProducts();
  }

  editProduct(product: Product) { /* navigate to edit form */ }
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
              Environment Configuration &amp; Production URLs
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Use Angular&apos;s environment files to switch between dev proxy and production API URLs automatically at build time.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// environments/environment.ts (development)
export const environment = {
  production: false,
  apiUrl: '/api'  // goes through dev proxy to localhost:8080
};

// environments/environment.prod.ts (production)
export const environment = {
  production: true,
  apiUrl: 'https://api.myapp.com/api'  // direct backend URL
};

// Use in service:
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = environment.apiUrl + '/products';
  // Dev:  /api/products          -> proxy -> localhost:8080/api/products
  // Prod: https://api.myapp.com/api/products  (direct)
}

// CORS configuration on Spring Boot backend (production):
// @Configuration
// public class CorsConfig implements WebMvcConfigurer {
//   @Override
//   public void addCorsMappings(CorsRegistry registry) {
//     registry.addMapping("/api/**")
//       .allowedOrigins("https://myapp.com")
//       .allowedMethods("GET", "POST", "PUT", "DELETE")
//       .allowedHeaders("*")
//       .allowCredentials(true);
//   }
// }

// Build for production:
// ng build --configuration production
// This replaces environment.ts with environment.prod.ts automatically`} />
            </div>
          </div>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              GraphQL with Angular
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              GraphQL lets the client request exactly the data it needs in a single query, eliminating over-fetching and under-fetching common with REST. Apollo Angular is the standard GraphQL client for Angular applications.
            </p>
            <div style={{
              backgroundColor: '#064e3b',
              padding: '1rem',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981',
              marginBottom: '1rem'
            }}>
              <p style={{ fontSize: '0.95rem', color: '#6ee7b7', margin: 0 }}>
                <strong>REST vs GraphQL:</strong> REST uses multiple endpoints (GET /users, GET /users/1/orders). GraphQL uses a single endpoint where the client specifies the exact shape of data needed in one request.
              </p>
            </div>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// === SETUP ===
// npm install apollo-angular @apollo/client graphql

// graphql.module.ts - Apollo client configuration
import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloClientOptions } from '@apollo/client/core';

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink): ApolloClientOptions<any> => ({
        link: httpLink.create({ uri: '/graphql' }),  // proxied in dev
        cache: new InMemoryCache(),
        defaultOptions: {
          query: { fetchPolicy: 'cache-first' },
          watchQuery: { fetchPolicy: 'cache-and-network' }
        }
      }),
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}

// Or standalone setup (Angular 15+):
// provideApollo(() => ({
//   link: httpLink.create({ uri: '/graphql' }),
//   cache: new InMemoryCache()
// }))`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              GraphQL Queries &amp; Mutations
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Define typed queries and mutations in a service, then consume them in components with loading and error states.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// services/product-gql.service.ts
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

// Define queries as constants
const GET_PRODUCTS = gql\`
  query GetProducts($page: Int, $size: Int, $category: String) {
    products(page: $page, size: $size, category: $category) {
      content {
        id
        name
        price
        category
      }
      totalElements
      totalPages
    }
  }
\`;

const GET_PRODUCT_DETAIL = gql\`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      price
      category
      description
      reviews {
        rating
        comment
        author { name }
      }
    }
  }
\`;

const CREATE_PRODUCT = gql\`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      price
      category
    }
  }
\`;

const DELETE_PRODUCT = gql\`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
\`;

@Injectable({ providedIn: 'root' })
export class ProductGqlService {
  constructor(private apollo: Apollo) {}

  // Query - fetches data
  getProducts(page = 0, size = 10, category?: string): Observable<any> {
    return this.apollo.watchQuery({
      query: GET_PRODUCTS,
      variables: { page, size, category }
    }).valueChanges.pipe(
      map(result => result.data['products'])
    );
  }

  // Query with specific fetch policy (skip cache)
  getProduct(id: number): Observable<Product> {
    return this.apollo.query({
      query: GET_PRODUCT_DETAIL,
      variables: { id },
      fetchPolicy: 'network-only'  // always hit server
    }).pipe(
      map(result => result.data['product'])
    );
  }

  // Mutation - modifies data
  createProduct(input: Omit<Product, 'id'>): Observable<Product> {
    return this.apollo.mutate({
      mutation: CREATE_PRODUCT,
      variables: { input },
      // Update cache after mutation so list reflects changes
      refetchQueries: [{ query: GET_PRODUCTS }]
    }).pipe(
      map(result => result.data['createProduct'])
    );
  }

  // Mutation with manual cache update (faster than refetch)
  deleteProduct(id: number): Observable<any> {
    return this.apollo.mutate({
      mutation: DELETE_PRODUCT,
      variables: { id },
      update: (cache) => {
        cache.evict({ id: cache.identify({ __typename: 'Product', id }) });
        cache.gc();  // garbage collect orphaned references
      }
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
              GraphQL Component &amp; Subscriptions
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Use GraphQL in components with Apollo&apos;s built-in loading/error states, and use subscriptions for real-time updates via WebSocket.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// Component using GraphQL service
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { ProductGqlService } from '../services/product-gql.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  template: \`
    <div *ngIf="loading()">Loading...</div>
    <div *ngIf="error()" class="error">{{ error() }}</div>

    <div *ngFor="let product of products()">
      <h3>{{ product.name }} - {{ product.price | currency }}</h3>
      <button (click)="remove(product.id)">Delete</button>
    </div>
  \`
})
export class ProductListComponent implements OnInit, OnDestroy {
  products = signal<any[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  private sub!: Subscription;

  constructor(private productGql: ProductGqlService) {}

  ngOnInit() {
    this.sub = this.productGql.getProducts().subscribe({
      next: (data) => {
        this.products.set(data.content);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  remove(id: number) {
    this.productGql.deleteProduct(id).subscribe();
    // Cache update in service handles UI refresh automatically
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}

// === SUBSCRIPTIONS (real-time updates via WebSocket) ===
// npm install subscriptions-transport-ws

// Setup WebSocket link alongside HTTP link:
// import { split } from '@apollo/client/core';
// import { WebSocketLink } from '@apollo/client/link/ws';
// import { getMainDefinition } from '@apollo/client/utilities';
//
// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:8080/graphql',
//   options: { reconnect: true }
// });
//
// const link = split(
//   ({ query }) => {
//     const def = getMainDefinition(query);
//     return def.kind === 'OperationDefinition' && def.operation === 'subscription';
//   },
//   wsLink,
//   httpLink.create({ uri: '/graphql' })
// );

// Subscription in service:
// const PRODUCT_ADDED = gql\`
//   subscription OnProductAdded {
//     productAdded { id name price category }
//   }
// \`;
//
// watchNewProducts(): Observable<Product> {
//   return this.apollo.subscribe({
//     query: PRODUCT_ADDED
//   }).pipe(map(result => result.data['productAdded']));
// }`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Spring Boot GraphQL Backend
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              The corresponding Spring Boot backend that serves the GraphQL API consumed by the Angular frontend above.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// build.gradle
// implementation 'org.springframework.boot:spring-boot-starter-graphql'
// implementation 'org.springframework.boot:spring-boot-starter-web'

// src/main/resources/graphql/schema.graphqls
// type Query {
//   products(page: Int, size: Int, category: String): ProductPage!
//   product(id: ID!): Product
// }
//
// type Mutation {
//   createProduct(input: ProductInput!): Product!
//   deleteProduct(id: ID!): Boolean!
// }
//
// type Product {
//   id: ID!
//   name: String!
//   price: Float!
//   category: String!
//   description: String
//   reviews: [Review!]
// }
//
// type ProductPage {
//   content: [Product!]!
//   totalElements: Int!
//   totalPages: Int!
// }
//
// input ProductInput {
//   name: String!
//   price: Float!
//   category: String!
// }

// ProductController.java
@Controller
public class ProductController {

  @Autowired
  private ProductRepository productRepository;

  @QueryMapping
  public ProductPage products(@Argument int page,
                              @Argument int size,
                              @Argument String category) {
    Pageable pageable = PageRequest.of(page, size);
    Page<Product> result = (category != null)
      ? productRepository.findByCategory(category, pageable)
      : productRepository.findAll(pageable);
    return new ProductPage(result);
  }

  @QueryMapping
  public Product product(@Argument Long id) {
    return productRepository.findById(id).orElseThrow();
  }

  @MutationMapping
  public Product createProduct(@Argument ProductInput input) {
    Product product = new Product(input.name(), input.price(), input.category());
    return productRepository.save(product);
  }

  @MutationMapping
  public boolean deleteProduct(@Argument Long id) {
    productRepository.deleteById(id);
    return true;
  }

  // Nested resolver - fetches reviews only when requested
  @SchemaMapping(typeName = "Product", field = "reviews")
  public List<Review> reviews(Product product) {
    return reviewRepository.findByProductId(product.getId());
  }
}

// application.yml
// spring:
//   graphql:
//     graphiql:
//       enabled: true     # GraphiQL UI at /graphiql
//     path: /graphql
//     cors:
//       allowed-origins: "http://localhost:4200"`} />
            </div>
          </div>
        </div>
      )}

      {/* Routing Section */}
      {activeSection === 'routing' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Angular Router
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              The Angular Router enables navigation between views, supports lazy loading of feature modules, and provides guards for access control.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:id', component: UserDetailComponent },

  // Lazy-loaded routes
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [AuthGuard]
  },

  // Lazy-loaded module
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.routes').then(m => m.PRODUCT_ROUTES)
  },

  // Nested routes with child routes
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileSettingsComponent },
      { path: 'security', component: SecuritySettingsComponent },
      { path: 'notifications', component: NotificationSettingsComponent }
    ]
  },

  // Wildcard route - must be last
  { path: '**', component: NotFoundComponent }
];`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Route Guards
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Guards control access to routes based on conditions like authentication status or user permissions.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// Class-based guard
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      // Check for required role
      const requiredRole = route.data['role'];
      if (requiredRole && !this.authService.hasRole(requiredRole)) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: route.url.join('/') }
    });
    return false;
  }
}

// Functional guard (Angular 15+)
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }
  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};

// Usage in routes:
// { path: 'admin', component: AdminComponent, canActivate: [authGuard] }
// { path: 'admin', component: AdminComponent, data: { role: 'ADMIN' } }`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Route Resolvers &amp; Navigation
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Resolvers pre-fetch data before a route is activated. Use ActivatedRoute to access route parameters and data.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// Functional resolver (Angular 15+)
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

export const userResolver: ResolveFn<User> = (route) => {
  const userService = inject(UserService);
  const id = Number(route.paramMap.get('id'));
  return userService.getUserById(id);
};

// Route config:
// { path: 'users/:id', component: UserDetailComponent, resolve: { user: userResolver } }

// Accessing route data in component
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [RouterLink],
  template: \`
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>

    <!-- Router link navigation -->
    <a [routerLink]="['/users']">Back to Users</a>
    <a [routerLink]="['/users', nextUserId]"
       [queryParams]="{ tab: 'profile' }"
       [fragment]="'details'">
      Next User
    </a>

    <button (click)="goToEdit()">Edit</button>
  \`
})
export class UserDetailComponent implements OnInit {
  user!: User;
  nextUserId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Get resolved data
    this.user = this.route.snapshot.data['user'];

    // Reactive params (for same-component navigation)
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.nextUserId = id + 1;
    });

    // Query params
    this.route.queryParams.subscribe(params => {
      console.log('Tab:', params['tab']);
    });
  }

  goToEdit() {
    this.router.navigate(['/users', this.user.id, 'edit']);
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
              Lazy Loading &amp; Preloading Strategies
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Lazy loading improves initial load time by loading feature modules on demand. Preloading strategies control when lazy modules are loaded in the background.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// products.routes.ts - Feature routes for lazy loading
import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: ':id',
    component: ProductDetailComponent
  },
  {
    path: ':id/edit',
    component: ProductEditComponent,
    canDeactivate: [unsavedChangesGuard]
  }
];

// Custom preloading strategy
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data?.['preload']) {
      // Delay preload by 2 seconds after app loads
      return timer(2000).pipe(mergeMap(() => load()));
    }
    return of(null);
  }
}

// App config:
// provideRouter(routes, withPreloading(SelectivePreloadingStrategy))

// Route with preload flag:
// { path: 'dashboard', loadComponent: () => ..., data: { preload: true } }`} />
            </div>
          </div>
        </div>
      )}

      {/* State & Forms Section */}
      {activeSection === 'state & forms' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Reactive Forms
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Reactive forms provide a model-driven approach to handling form inputs with immutable data, synchronous access, and powerful validation.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]="registrationForm" (ngSubmit)="onSubmit()">
      <div>
        <label>Name</label>
        <input formControlName="name" placeholder="Full name">
        <div *ngIf="f['name'].touched && f['name'].errors">
          <span *ngIf="f['name'].errors?.['required']">Name is required</span>
          <span *ngIf="f['name'].errors?.['minlength']">
            Min {{ f['name'].errors?.['minlength'].requiredLength }} characters
          </span>
        </div>
      </div>

      <div>
        <label>Email</label>
        <input formControlName="email" type="email">
      </div>

      <div formGroupName="address">
        <label>Street</label>
        <input formControlName="street">
        <label>City</label>
        <input formControlName="city">
        <label>Zip</label>
        <input formControlName="zip">
      </div>

      <div formArrayName="skills">
        <h4>Skills</h4>
        <div *ngFor="let skill of skills.controls; let i = index">
          <input [formControlName]="i" [placeholder]="'Skill ' + (i+1)">
          <button type="button" (click)="removeSkill(i)">Remove</button>
        </div>
        <button type="button" (click)="addSkill()">Add Skill</button>
      </div>

      <button type="submit" [disabled]="registrationForm.invalid">
        Register
      </button>
    </form>
  \`
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: [''],
        city: ['', Validators.required],
        zip: ['', Validators.pattern(/^\\d{5}$/)]
      }),
      skills: this.fb.array([''])
    });
  }

  get f() { return this.registrationForm.controls; }
  get skills() { return this.registrationForm.get('skills') as FormArray; }

  addSkill() { this.skills.push(this.fb.control('')); }
  removeSkill(index: number) { this.skills.removeAt(index); }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form data:', this.registrationForm.value);
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
              Custom Validators
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Create synchronous and asynchronous custom validators for complex validation logic.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of, map, debounceTime, switchMap } from 'rxjs';

// Synchronous validator
export function passwordStrength(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) return null;

  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\\d/.test(value);
  const hasSpecial = /[!@#$%^&*]/.test(value);
  const isLongEnough = value.length >= 8;

  const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecial && isLongEnough;
  return valid ? null : {
    passwordStrength: {
      hasUpperCase, hasLowerCase, hasNumber, hasSpecial, isLongEnough
    }
  };
}

// Cross-field validator (applied to FormGroup)
export function passwordMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirm = control.get('confirmPassword');
  if (password?.value !== confirm?.value) {
    confirm?.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  }
  return null;
}

// Async validator - checks server
export function uniqueEmail(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      debounceTime(300),
      switchMap(email => userService.checkEmailAvailable(email)),
      map(isAvailable => isAvailable ? null : { emailTaken: true })
    );
  };
}

// Usage:
// this.fb.group({
//   password: ['', [Validators.required, passwordStrength]],
//   confirmPassword: ['', Validators.required]
// }, { validators: passwordMatch })
//
// email: ['', [Validators.required], [uniqueEmail(this.userService)]]`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Template-Driven Forms
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Template-driven forms use directives to create and manage forms directly in the template, suitable for simpler form scenarios.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: \`
    <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">
      <div>
        <label>Name</label>
        <input name="name" [(ngModel)]="model.name"
               required minlength="2" #name="ngModel">
        <div *ngIf="name.invalid && name.touched">
          <span *ngIf="name.errors?.['required']">Name is required</span>
        </div>
      </div>

      <div>
        <label>Email</label>
        <input name="email" [(ngModel)]="model.email"
               required email #email="ngModel" type="email">
      </div>

      <div>
        <label>Message</label>
        <textarea name="message" [(ngModel)]="model.message"
                  required></textarea>
      </div>

      <div>
        <label>Priority</label>
        <select name="priority" [(ngModel)]="model.priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button type="submit" [disabled]="contactForm.invalid">
        Send
      </button>

      <p>Form valid: {{ contactForm.valid }}</p>
      <p>Form value: {{ contactForm.value | json }}</p>
    </form>
  \`
})
export class ContactComponent {
  model = {
    name: '',
    email: '',
    message: '',
    priority: 'medium'
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form submitted:', this.model);
      form.resetForm();
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
              NgRx State Management
            </h3>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              NgRx provides reactive state management for Angular apps using the Redux pattern with RxJS observables.
            </p>
            <div style={{
              backgroundColor: '#1e1e1e',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid #374151'
            }}>
              <SyntaxHighlighter code={`// actions - user.actions.ts
import { createAction, props } from '@ngrx/store';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
);
export const addUser = createAction(
  '[User] Add User',
  props<{ user: User }>()
);

// reducer - user.reducer.ts
import { createReducer, on } from '@ngrx/store';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, state => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state, users, loading: false, error: null
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),
  on(addUser, (state, { user }) => ({
    ...state, users: [...state.users, user]
  }))
);

// selectors - user.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectUserState = createFeatureSelector<UserState>('users');
export const selectAllUsers = createSelector(selectUserState, s => s.users);
export const selectLoading = createSelector(selectUserState, s => s.loading);
export const selectAdmins = createSelector(
  selectAllUsers,
  users => users.filter(u => u.role === 'admin')
);

// effects - user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map(users => loadUsersSuccess({ users })),
          catchError(error => of(loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}

// component usage
@Component({
  template: \`
    <div *ngIf="loading$ | async">Loading...</div>
    <div *ngFor="let user of users$ | async">{{ user.name }}</div>
  \`
})
export class UserListComponent implements OnInit {
  users$ = this.store.select(selectAllUsers);
  loading$ = this.store.select(selectLoading);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadUsers());
  }
}`} />
            </div>
          </div>
        </div>
      )}

      {activeSection === 'backend integration' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              HttpClient & REST APIs
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Angular&apos;s HttpClient module provides a typed, Observable-based API for making HTTP requests. Import HttpClientModule in your app module, then inject HttpClient into services.
            </p>
            <div style={{
              backgroundColor: '#0d1117',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #1e3a5f',
              overflowX: 'auto'
            }}>
              <SyntaxHighlighter code={`// app.module.ts — import HttpClientModule
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

// order.service.ts — typed HTTP service
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';

export interface Order {
  id: number;
  symbol: string;
  quantity: number;
  price: number;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = \`\${environment.apiUrl}/api/orders\`;

  constructor(private http: HttpClient) {}

  // GET all orders
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // GET single order
  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(\`\${this.apiUrl}/\${id}\`);
  }

  // POST create order
  createOrder(order: Partial<Order>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  // PUT update order
  updateOrder(id: number, order: Partial<Order>): Observable<Order> {
    return this.http.put<Order>(\`\${this.apiUrl}/\${id}\`, order);
  }

  // DELETE order
  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(\`\${this.apiUrl}/\${id}\`);
  }

  // GET with query params
  searchOrders(symbol: string, status: string): Observable<Order[]> {
    const params = new HttpParams()
      .set('symbol', symbol)
      .set('status', status);
    return this.http.get<Order[]>(this.apiUrl, { params });
  }

  private handleError(error: any) {
    console.error('API error:', error);
    return throwError(() => new Error(error.message));
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
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              HTTP Interceptors
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Interceptors sit between the app and the backend to modify requests/responses globally. Use them for attaching JWT tokens, logging, error handling, and retry logic.
            </p>
            <div style={{
              backgroundColor: '#0d1117',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #1e3a5f',
              overflowX: 'auto'
            }}>
              <SyntaxHighlighter code={`// auth.interceptor.ts — attach JWT to every request
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler,
  HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler)
      : Observable<HttpEvent<any>> {

    // Clone request and add Authorization header
    const token = this.auth.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: \`Bearer \${token}\`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.auth.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}

// logging.interceptor.ts — log request/response times
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler)
      : Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          console.log(\`\${req.method} \${req.url} — \${elapsed}ms\`);
        }
      })
    );
  }
}

// Register interceptors in app.module.ts
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor, multi: true },
  ]
})
export class AppModule {}`} />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(to bottom right, #1f2937, #111827)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #374151'
          }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Component Data Binding
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Components subscribe to service Observables using the async pipe or manual subscriptions. The async pipe automatically subscribes and unsubscribes, preventing memory leaks.
            </p>
            <div style={{
              backgroundColor: '#0d1117',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #1e3a5f',
              overflowX: 'auto'
            }}>
              <SyntaxHighlighter code={`// order-list.component.ts — consuming the service
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService, Order } from './order.service';

@Component({
  selector: 'app-order-list',
  template: \`
    <!-- Async pipe: auto subscribe/unsubscribe -->
    <div *ngIf="loading">Loading orders...</div>
    <div *ngIf="error" class="error">
      {{ error }} <button (click)="loadOrders()">Retry</button>
    </div>

    <table *ngIf="orders$ | async as orders">
      <thead>
        <tr>
          <th>Symbol</th><th>Qty</th>
          <th>Price</th><th>Status</th><th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let order of orders">
          <td>{{ order.symbol }}</td>
          <td>{{ order.quantity }}</td>
          <td>{{ order.price | currency }}</td>
          <td>{{ order.status }}</td>
          <td>
            <button (click)="cancel(order.id)">Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Create order form -->
    <form (ngSubmit)="submitOrder()">
      <input [(ngModel)]="newOrder.symbol" placeholder="Symbol" />
      <input [(ngModel)]="newOrder.quantity" type="number" />
      <input [(ngModel)]="newOrder.price" type="number" />
      <button type="submit" [disabled]="submitting">
        {{ submitting ? 'Placing...' : 'Place Order' }}
      </button>
    </form>
  \`
})
export class OrderListComponent implements OnInit {
  orders$!: Observable<Order[]>;
  loading = false;
  error = '';
  submitting = false;
  newOrder = { symbol: '', quantity: 0, price: 0 };

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.error = '';
    this.orders$ = this.orderService.getOrders().pipe(
      tap(() => this.loading = false),
      catchError(err => {
        this.loading = false;
        this.error = err.message;
        return of([]);
      })
    );
  }

  submitOrder() {
    this.submitting = true;
    this.orderService.createOrder(this.newOrder).subscribe({
      next: () => {
        this.loadOrders();  // Refresh list
        this.newOrder = { symbol: '', quantity: 0, price: 0 };
      },
      error: (err) => this.error = err.message,
      complete: () => this.submitting = false
    });
  }

  cancel(id: number) {
    this.orderService.deleteOrder(id).subscribe({
      next: () => this.loadOrders()
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
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              Spring Boot CORS &amp; Proxy Config
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              During development, Angular runs on port 4200 and Spring Boot on 8080. You need either CORS configuration on the backend or an Angular proxy to avoid cross-origin issues.
            </p>
            <div style={{
              backgroundColor: '#0d1117',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #1e3a5f',
              overflowX: 'auto'
            }}>
              <SyntaxHighlighter code={`// ===== Option 1: Angular proxy (dev only) =====
// proxy.conf.json — place in project root
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
}
// angular.json — add proxy config
// "serve": { "options": { "proxyConfig": "proxy.conf.json" } }
// ng serve now proxies /api/* to Spring Boot

// ===== Option 2: Spring Boot CORS =====
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:4200")
            .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}

// ===== Environment files =====
// environment.ts (dev)
export const environment = {
  production: false,
  apiUrl: ''  // empty = use proxy
};

// environment.prod.ts (production)
export const environment = {
  production: true,
  apiUrl: 'https://api.myapp.com'
};

// ===== Production: serve Angular from Spring Boot =====
// 1. ng build --configuration production
// 2. Copy dist/ to src/main/resources/static/
// 3. Spring Boot serves both API and SPA

// Spring Boot catch-all for SPA routing
@Controller
public class SpaController {
    @RequestMapping(value = {
        "/{path:[^\\\\.]*}",
        "/{path:[^\\\\.]*}/{subpath:[^\\\\.]*}"
    })
    public String forward() {
        return "forward:/index.html";
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
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              WebSocket Real-Time Data
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              Use RxJS WebSocketSubject for real-time bidirectional communication, or STOMP over SockJS for Spring Boot WebSocket integration.
            </p>
            <div style={{
              backgroundColor: '#0d1117',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #1e3a5f',
              overflowX: 'auto'
            }}>
              <SyntaxHighlighter code={`// price-feed.service.ts — RxJS WebSocket
import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, retry, delay } from 'rxjs';

export interface PriceUpdate {
  symbol: string;
  bid: number;
  ask: number;
  timestamp: string;
}

@Injectable({ providedIn: 'root' })
export class PriceFeedService {
  private socket$!: WebSocketSubject<PriceUpdate>;

  connect(): Observable<PriceUpdate> {
    this.socket$ = webSocket('ws://localhost:8080/ws/prices');

    return this.socket$.pipe(
      retry({ count: 5, delay: 3000 })  // auto-reconnect
    );
  }

  subscribe(symbol: string) {
    this.socket$.next({ action: 'subscribe', symbol } as any);
  }

  disconnect() {
    this.socket$.complete();
  }
}

// live-prices.component.ts
@Component({
  selector: 'app-live-prices',
  template: \`
    <span [class]="connected ? 'live' : 'offline'">
      {{ connected ? 'LIVE' : 'OFFLINE' }}
    </span>
    <table>
      <tr *ngFor="let price of prices | keyvalue">
        <td>{{ price.key }}</td>
        <td>{{ price.value.bid | number:'1.2-2' }}</td>
        <td>{{ price.value.ask | number:'1.2-2' }}</td>
      </tr>
    </table>
  \`
})
export class LivePricesComponent implements OnInit, OnDestroy {
  prices: Map<string, PriceUpdate> = new Map();
  connected = false;
  private subscription!: Subscription;

  constructor(private priceFeed: PriceFeedService) {}

  ngOnInit() {
    this.subscription = this.priceFeed.connect().subscribe({
      next: (update) => {
        this.connected = true;
        this.prices.set(update.symbol, update);
      },
      error: () => this.connected = false
    });

    // Subscribe to symbols
    this.priceFeed.subscribe('AAPL');
    this.priceFeed.subscribe('GOOGL');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.priceFeed.disconnect();
  }
}

// ===== STOMP + SockJS (for Spring Boot) =====
// npm install @stomp/rx-stomp sockjs-client
import { RxStomp } from '@stomp/rx-stomp';

@Injectable({ providedIn: 'root' })
export class StompService {
  private rxStomp = new RxStomp();

  constructor() {
    this.rxStomp.configure({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000
    });
    this.rxStomp.activate();
  }

  watch(topic: string): Observable<any> {
    return this.rxStomp.watch(topic).pipe(
      map(msg => JSON.parse(msg.body))
    );
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
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#d1d5db', marginBottom: '1rem' }}>
              JWT Authentication Flow
            </h2>
            <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: '1.8', marginBottom: '1rem' }}>
              A complete JWT auth flow with Angular: AuthService handles login/logout, AuthGuard protects routes, and the interceptor attaches tokens.
            </p>
            <div style={{
              backgroundColor: '#0d1117',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #1e3a5f',
              overflowX: 'auto'
            }}>
              <SyntaxHighlighter code={`// auth.service.ts
@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwt_token';
  private currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    // Check token on startup
    const token = this.getToken();
    if (token) this.loadUser();
  }

  login(email: string, password: string): Observable<void> {
    return this.http.post<{ token: string; user: User }>(
      '/api/auth/login', { email, password }
    ).pipe(
      tap(res => {
        localStorage.setItem(this.tokenKey, res.token);
        this.currentUser$.next(res.user);
      }),
      map(() => void 0)
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.currentUser$.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    // Check expiry
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  }

  getUser(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  private loadUser() {
    this.http.get<User>('/api/auth/me').subscribe({
      next: user => this.currentUser$.next(user),
      error: () => this.logout()
    });
  }
}

// auth.guard.ts — protect routes
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}

// app-routing.module.ts
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,
    canActivate: [AuthGuard] },
  { path: 'orders', component: OrderListComponent,
    canActivate: [AuthGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

// login.component.ts
@Component({
  selector: 'app-login',
  template: \`
    <form (ngSubmit)="onLogin()">
      <input [(ngModel)]="email" name="email" type="email" />
      <input [(ngModel)]="password" name="password" type="password" />
      <div *ngIf="error" class="error">{{ error }}</div>
      <button type="submit" [disabled]="loading">
        {{ loading ? 'Signing in...' : 'Sign In' }}
      </button>
    </form>
  \`
})
export class LoginComponent {
  email = ''; password = '';
  loading = false; error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.loading = true;
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.error = 'Invalid credentials';
        this.loading = false;
      }
    });
  }
}`} />
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  )
}

export default Angular
