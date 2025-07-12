# Firebase Setup Guide

## 1. Install Firebase Dependencies

```bash
npm install firebase
```

## 2. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable the following services:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage

## 3. Configure Firebase

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select Web
4. Register your app and copy the configuration

## 4. Update Configuration

Replace the placeholder values in `src/config/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

## 5. Environment Variables (Optional)

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

Then update `src/config/firebase.ts` to use environment variables:

```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## 6. Usage Examples

### Authentication
```typescript
import { useFirebaseOperations } from './hooks/useFirebaseOperations';

const { login, register, logout, loading, error } = useFirebaseOperations();

// Login
const handleLogin = async () => {
  const result = await login('user@example.com', 'password');
  if (result.success) {
    console.log('Logged in successfully');
  }
};
```

### Firestore Operations
```typescript
import { useFirebaseOperations } from './hooks/useFirebaseOperations';

const { createDoc, getDoc, updateDoc, deleteDoc, getDocs } = useFirebaseOperations();

// Create document
const createItem = async () => {
  const result = await createDoc('items', {
    name: 'Sample Item',
    price: 29.99,
    category: 'electronics'
  });
};

// Get documents with conditions
const getItems = async () => {
  const result = await getDocs('items', [
    { field: 'category', operator: '==', value: 'electronics' }
  ]);
};
```

### File Upload
```typescript
import { useFirebaseOperations } from './hooks/useFirebaseOperations';

const { upload } = useFirebaseOperations();

const handleFileUpload = async (file: File) => {
  const result = await upload(file, `images/${file.name}`);
  if (result.success) {
    console.log('File uploaded:', result.url);
  }
};
```

## 7. Security Rules

Don't forget to configure Firestore and Storage security rules in the Firebase Console!

### Firestore Rules Example
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Storage Rules Example
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
``` 