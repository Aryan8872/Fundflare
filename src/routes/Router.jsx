import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import MainLayout from '../layout/MainLayout';
import CampaignsAdmin from '../pages/admin/CampaignsAdmin';
import DonationsAdmin from '../pages/admin/DonationsAdmin';
import LogsAdmin from '../pages/admin/LogsAdmin';
import PayoutsAdmin from '../pages/admin/PayoutsAdmin';
import UsersAdmin from '../pages/admin/UsersAdmin';
import AdminDashboard from '../pages/AdminDashboard';
import Browse from '../pages/Browse';
import CampaignDetail from '../pages/CampaignDetail';
import Company from '../pages/Company';
import CreateCampaign from '../pages/CreateCampaign';
import Home from '../pages/Home';
import Invest from '../pages/Invest';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Register from '../pages/Register';
import Resources from '../pages/Resources';
import UserDashboard from '../pages/UserDashboard';

const AdminRoute = ({ children }) => {
    const { user } = useAuthContext();
    if (user === undefined) return <div>Loading...</div>;
    if (!user || user.role !== 'ADMIN') return <Navigate to="/" />;
    return children;
};

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
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><UsersAdmin /></AdminRoute>} />
            <Route path="/admin/campaigns" element={<AdminRoute><CampaignsAdmin /></AdminRoute>} />
            <Route path="/admin/payouts" element={<AdminRoute><PayoutsAdmin /></AdminRoute>} />
            <Route path="/admin/logs" element={<AdminRoute><LogsAdmin /></AdminRoute>} />
            <Route path="/admin/donations" element={<AdminRoute><DonationsAdmin /></AdminRoute>} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Route>
    </Routes>
);

export default Router;
