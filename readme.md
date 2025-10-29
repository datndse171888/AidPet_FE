# 📁 AidPet Frontend - Source Code Documentation

Complete documentation for the `src` folder structure and special files usage.

## 🌳 Source Code Tree Structure

```
src/
├── 📄 index.css                        # Global styles & Tailwind CSS imports
├── 🚀 main.tsx                         # React application entry point
├── 🛤️ Router.tsx                      # Application routing configuration
├── 📝 vite-env.d.ts                    # Vite environment type definitions
│
├── 📁 components/                       # Reusable UI components
│   ├── 📁 common/                      # Shared common components (header, footer, layout, sidebar, ...)
│   │
│   └── 📁 ui/                          # UI component library (button, input, modal, ...)
│
├── 📁 data/                            # Static data
│
├── 📁 hooks/                           # Custom React hooks & utilities
│   └── 🔐 AuthorizationRoute.tsx       # 🌟 Route protection & role-based access
│
├── 📁 pages/                           # Application pages/screens
│   ├── 📁 admin/                       # Admin panel pages
│   │
│   ├── 📁 auth/                        # Authentication pages
│   │
│   ├── 📁 error/                       # Error handling pages
│   │
│   ├── 📁 profile/                     # User profile management (profile tabs)
│   │
│   ├── 📁 public/                      # Public accessible pages
│   │
│   └── 📁 shelter/                     # Shelter management pages
│
├── 📁 services/                        # External services & API calls
│   └── 📁 api/                         # API service layer
│
├── 📁 types/                           # TypeScript type definitions
│
└── 📁 utils/                           # Utility functions & configurations
    ├── ⚙️ Axios.tsx                    # 🌟 HTTP client configuration
    ├── 🧭 NavigationProvider.tsx       # React Router navigation provider
    └── 🧭 NavigationService.tsx        # 🌟 Centralized navigation service
```

## 🌟 Special Files Documentation

### 🔐 AuthorizationRoute.tsx - Route Protection System

#### **Purpose**
Provides role-based access control and authentication protection for React routes.

#### **Key Features**
- ✅ Authentication verification
- ✅ Role-based access control  
- ✅ Automatic redirects
- ✅ State preservation

#### **Usage Examples**

**1. Basic Authentication Protection:**
```tsx
// Protect route - requires login
<Route path="/profile" element={
  <AuthorizationRoute requireAuth={true}>
    <Profile />
  </AuthorizationRoute>
} />
```

**2. Role-Based Protection:**
```tsx
// Admin only route
<Route path="/admin" element={
  <AuthorizationRoute 
    requireAuth={true} 
    requiredRoles={['ADMIN']}
  >
    <AdminDashboard />
  </AuthorizationRoute>
} />

// Multiple roles allowed
<Route path="/shelter-management" element={
  <AuthorizationRoute 
    requireAuth={true} 
    requiredRoles={['SHELTER', 'ADMIN']}
  >
    <ShelterManagement />
  </AuthorizationRoute>
} />
```

**3. Custom Redirect:**
```tsx
// Custom redirect destination
<AuthorizationRoute 
  requireAuth={true}
  redirectTo="/custom-login"
  requiredRoles={['USER']}
>
  <UserDashboard />
</AuthorizationRoute>
```

**4. Using the Hook:**
```tsx
import { useAuth } from '../hooks/AuthorizationRoute';

const MyComponent: React.FC = () => {
  const user = useAuth();
  
  if (!user?.isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      {user.role === 'ADMIN' && (
        <AdminPanel />
      )}
    </div>
  );
};
```

**5. Higher Order Component:**
```tsx
// Wrap component with authorization
const ProtectedComponent = withAuthorization(
  MyComponent, 
  ['ADMIN', 'SHELTER'], 
  true
);
```

#### **Supported Roles**
- `USER` - Regular users
- `ADMIN` - System administrators
- `SHELTER` - Shelter managers
- `STAFF` - Staff members
- `SPONSOR` - Sponsors/donors

---

### ⚙️ Axios.tsx - HTTP Client Configuration

#### **Purpose**
Centralized HTTP client with interceptors, error handling, and authentication.

#### **Key Features**
- 🔧 Request/response interceptors
- 🔐 Automatic token management
- 🚨 Global error handling
- 📝 Development logging
- 🔄 Retry mechanisms

#### **Usage Examples**

**1. Basic API Calls:**
```tsx
import { api } from '../utils/Axios';

// GET request
const getAnimals = async () => {
  try {
    const response = await api.get<AnimalResponse[]>('/animals');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch animals:', error);
  }
};

// POST request
const createAnimal = async (animalData: AnimalRequest) => {
  try {
    const response = await api.post<AnimalResponse>('/animals', animalData);
    return response.data;
  } catch (error) {
    console.error('Failed to create animal:', error);
  }
};
```

**2. File Upload:**
```tsx
// Upload animal photo
const uploadAnimalPhoto = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  
  try {
    const response = await api.upload<{url: string}>('/upload/image', formData);
    return response.data.url;
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

**3. Request with Custom Headers:**
```tsx
// API call with custom config
const getProtectedData = async () => {
  try {
    const response = await api.get('/protected-data', {
      headers: {
        'X-Custom-Header': 'value'
      },
      timeout: 5000
    });
    return response.data;
  } catch (error) {
    console.error('Request failed:', error);
  }
};
```

**4. Error Handling:**
```tsx
// The interceptor automatically handles:
// - 401: Redirects to login
// - 403: Access forbidden
// - 404: Resource not found
// - 422: Validation errors
// - 500: Server errors

// Manual error handling
const handleApiCall = async () => {
  try {
    const data = await api.get('/some-endpoint');
    return data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.log('Resource not found');
    } else if (error.response?.status === 422) {
      console.log('Validation errors:', error.response.data);
    }
    throw error;
  }
};
```

#### **Environment Configuration**
```bash
# .env file
VITE_BASE_API_URL=http://localhost:8082/api
```

---

### 🧭 NavigationService.tsx - Centralized Navigation

#### **Purpose**
Provides programmatic navigation throughout the application with fallback support.

#### **Key Features**
- 🎯 Programmatic navigation
- 🔄 Fallback mechanisms
- 📱 State management
- 🔙 History management

#### **Usage Examples**

**1. Basic Navigation:**
```tsx
import { navigationService } from '../utils/NavigationService';

// Navigate to different pages
const handleButtonClick = () => {
  navigationService.goTo('/animals');
};

// Navigate with state
const handleViewAnimal = (animalId: string) => {
  navigationService.goTo('/animal-detail', {
    state: { animalId }
  });
};
```

**2. Navigation with Options:**
```tsx
// Replace current history entry
const handleLogin = () => {
  navigationService.replace('/dashboard');
};

// Navigate with replace option
const handleRedirect = () => {
  navigationService.goTo('/home', { replace: true });
};

// Go back in history
const handleBack = () => {
  navigationService.goBack();
};
```

**3. Component Integration:**
```tsx
const AnimalCard: React.FC<{animal: Animal}> = ({ animal }) => {
  const handleViewDetail = () => {
    navigationService.goTo(`/animals/${animal.id}`);
  };

  const handleAdopt = () => {
    navigationService.goTo('/adopt-animal', {
      state: { animalData: animal }
    });
  };

  return (
    <div>
      <h3>{animal.name}</h3>
      <button onClick={handleViewDetail}>View Details</button>
      <button onClick={handleAdopt}>Adopt</button>
    </div>
  );
};
```

**4. Navigation Provider Setup:**
```tsx
// App.tsx or Router.tsx
import { NavigationProvider } from '../utils/NavigationProvider';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavigationProvider>
        {/* Your app routes */}
        <Routes>
          {/* Routes here */}
        </Routes>
      </NavigationProvider>
    </BrowserRouter>
  );
};
```

**5. Service Integration in API:**
```tsx
// In API service files
import { navigationService } from '../utils/NavigationService';

export const authApi = {
  login: async (credentials: LoginData) => {
    try {
      const response = await api.post('/login', credentials);
      // Auto-navigate after successful login
      navigationService.goTo('/dashboard');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
```

---

## 🏗️ Folder Structure Explained

### 📁 **components/common**
**Purpose**: Shared components used across multiple pages
- **Container.tsx**: Main wrapper for page content
- **Footer.tsx**: Application footer with links and info
- **Sidebar.tsx**: Admin navigation with collapsible design
- **header/**: Different headers for different contexts
- **layout/**: Layout wrappers for different user roles

### 📁 **components/ui**
**Purpose**: Reusable UI component library
- **Button.tsx**: Styled button with variants
- **card/**: Different card types for displaying data
- **input/**: Form input components with validation
- **modal/**: Dialog components for overlays

### 📁 **pages**
**Purpose**: Application screens organized by user role
- **admin/**: Admin-only pages with management features
- **auth/**: Authentication and account management
- **error/**: Error handling pages (404, 403, etc.)
- **profile/**: User profile and account settings
- **public/**: Publicly accessible pages
- **shelter/**: Shelter-specific management pages

### 📁 **services/api**
**Purpose**: API service layer for backend communication
```tsx
// Example API service structure
export const animalApi = {
  getAll: () => api.get<Animal[]>('/animals'),
  getById: (id: string) => api.get<Animal>(`/animals/${id}`),
  create: (data: AnimalRequest) => api.post<Animal>('/animals', data),
  update: (id: string, data: AnimalRequest) => api.put<Animal>(`/animals/${id}`, data),
  delete: (id: string) => api.delete(`/animals/${id}`)
};
```

### 📁 **types**
**Purpose**: TypeScript type definitions for type safety
```tsx
// Example type definition
export interface Animal {
  id: string;
  name: string;
  breed: string;
  age: number;
  status: 'AVAILABLE' | 'ADOPTED' | 'PENDING';
}
```

---

## 🚀 Getting Started with Special Files

### 1. **Setting up Authorization**
```tsx
// 1. Wrap your routes with AuthorizationRoute
<Route path="/admin/*" element={
  <AuthorizationRoute requiredRoles={['ADMIN']}>
    <AdminLayout />
  </AuthorizationRoute>
} />

// 2. Use the hook in components
const MyComponent = () => {
  const user = useAuth();
  
  return user?.role === 'ADMIN' ? <AdminPanel /> : <UserPanel />;
};
```

### 2. **Making API Calls**
```tsx
// 1. Import the api client
import { api } from '../utils/Axios';

// 2. Create service functions
const fetchUserData = async (userId: string) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// 3. Handle in components
const UserProfile = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUserData('123').then(setUser);
  }, []);
  
  return <div>{user?.name}</div>;
};
```

### 3. **Navigation Integration**
```tsx
// 1. Use in event handlers
const handleSubmit = async (formData: any) => {
  try {
    await api.post('/animals', formData);
    navigationService.goTo('/animals'); // Redirect on success
  } catch (error) {
    console.error('Failed to create animal');
  }
};

// 2. Use with state
const handleViewAnimal = (animal: Animal) => {
  navigationService.goTo(`/animals/${animal.id}`, {
    state: { from: 'animal-list' }
  });
};
```

---

## 💡 Best Practices

### **Authentication & Authorization**
- Always wrap protected routes with `AuthorizationRoute`
- Use `useAuth()` hook to check user state in components
- Store sensitive data in localStorage with proper encryption

### **API Integration** 
- Use TypeScript generics for type-safe API calls
- Handle errors at the service level when possible
- Implement loading states in components

### **Navigation**
- Use `navigationService` instead of direct router navigation
- Pass state when navigating between related pages
- Handle navigation errors gracefully

### **Code Organization**
- Keep components small and focused
- Use proper TypeScript types for all data
- Follow the established folder structure
- Document complex logic with comments

---

<div align="center">
  <p>📚 This documentation covers the core architecture of AidPet Frontend</p>
  <p>🔧 For specific component usage, check individual component files</p>
  <p>🌟 Made with TypeScript + React + Tailwind CSS</p>
</div>