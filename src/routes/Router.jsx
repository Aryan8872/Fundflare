import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import About from '../pages/About'
import AdminDashboard from '../pages/AdminDashboard'
import Contact from '../pages/Contact'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = ['user', 'admin'] }) => {
    const { user, isAuthenticated, initialized } = useSelector((state) => state.auth);

    if (!initialized) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const Router = () => {
    return (
        <div>
            <Routes>
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Main Layout Routes */}
                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                    {/* Add FundFlare-specific routes here, e.g., campaigns, donations, etc. */}
                    <Route path='/admin' element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } />
                </Route>
            </Routes>
        </div>
    )
}

export default Router
