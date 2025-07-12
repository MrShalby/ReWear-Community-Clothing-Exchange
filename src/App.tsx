import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
<<<<<<< HEAD
=======
import { FirebaseProvider } from './contexts/FirebaseContext';
>>>>>>> 999bc2e (Add Firebase authentication and database integration)
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddItem from './pages/AddItem';
import ItemDetail from './pages/ItemDetail';
import BrowseItems from './pages/BrowseItems';
import AdminPanel from './pages/AdminPanel';
import Profile from './pages/Profile';

function App() {
  return (
<<<<<<< HEAD
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
=======
    <FirebaseProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
            <Navbar />
            <Routes>
                          <Route path="/" element={<Landing />} />
>>>>>>> 999bc2e (Add Firebase authentication and database integration)
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/browse" element={<BrowseItems />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/profile" element={<Profile />} />
<<<<<<< HEAD
          </Routes>
        </div>
      </Router>
    </AuthProvider>
=======
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </FirebaseProvider>
>>>>>>> 999bc2e (Add Firebase authentication and database integration)
  );
}

export default App;