import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import About from '../pages/About'
import AdminDashboard from '../pages/AdminDashboard'
import Browse from '../pages/Browse'
import CampaignDetail from '../pages/CampaignDetail'
import Company from '../pages/Company'
import Contact from '../pages/Contact'
import GetFunded from '../pages/GetFunded'
import Home from '../pages/Home'
import Invest from '../pages/Invest'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Resources from '../pages/Resources'

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
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/invest' element={<Invest />} />
                    <Route path='/get-funded' element={<GetFunded />} />
                    <Route path='/browse' element={<Browse />} />
                    <Route path='/resources' element={<Resources />} />
                    <Route path='/company' element={<Company />} />
                    <Route path='/campaign/:id' element={<CampaignDetail />} />
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
