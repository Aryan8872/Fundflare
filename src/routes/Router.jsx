import React from 'react';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import AdminDashboard from '../pages/AdminDashboard';
import Browse from '../pages/Browse';
import CampaignDetail from '../pages/CampaignDetail';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import UserDashboard from '../pages/UserDashboard';
import CampaignsAdmin from '../pages/admin/CampaignsAdmin';
import PayoutsAdmin from '../pages/admin/PayoutsAdmin';
import UsersAdmin from '../pages/admin/UsersAdmin';
import MainLayout from '../layout/MainLayout';
import Invest from '../pages/Invest';
import Resources from '../pages/Resources';
import Company from '../pages/Company';
import CreateCampaign from '../pages/CreateCampaign';
import Sidebar from '../components/admin/Sidebar';

const AdminRoute = ({ children }) => {
    const { user } = useAuthContext();
    if (!user || user.role !== 'ADMIN') return <Navigate to="/" />;
    return children;
};

const AdminLayout = () => (
    <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1">
            <Outlet />
        </div>
    </div>
);

const Router = () => (
    <Routes>
        <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/company" element={<Company />} />
            <Route path="/campaigns/:id" element={<CampaignDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UsersAdmin />} />
                <Route path="campaigns" element={<CampaignsAdmin />} />
                <Route path="payouts" element={<PayoutsAdmin />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Route>
    </Routes>
);

export default Router;
