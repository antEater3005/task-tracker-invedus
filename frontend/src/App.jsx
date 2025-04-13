import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Form from './components/Form';
import ProtectedRoute from './components/ProtectedRoutes';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/' element={<ProtectedRoute element={<Dashboard />} />} />
        <Route
          path='/task-form'
          element={<ProtectedRoute element={<Form />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
