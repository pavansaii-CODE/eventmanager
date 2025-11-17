// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/privaterouting';
import Navbar from './components/layout/navbar';
import Home from './pages/homepage';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import EventList from './pages/events/eventlist';
import VendorList from './pages/vendor/vendorlist';
import Profile from './pages/user/profile';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/events" element={
            <PrivateRoute>
              <EventList />
            </PrivateRoute>
          } />
          <Route path="/vendors" element={
            <PrivateRoute>
              <VendorList />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;