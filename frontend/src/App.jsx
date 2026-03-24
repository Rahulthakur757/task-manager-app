import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from "./components/NavBar";

function App() {
  return (
    <AuthProvider>
      
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login/page" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <NavBar/>
              <Dashboard />
            </PrivateRoute>
          } 
        />

      </Routes>
    </AuthProvider>
  );
}

export default App;