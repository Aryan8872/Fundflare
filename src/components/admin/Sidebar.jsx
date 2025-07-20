import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/campaigns', label: 'Campaigns' },
  { to: '/admin/payouts', label: 'Payouts' },
];

const Sidebar = () => (
  <aside className="w-64 min-h-screen bg-gradient-to-b from-blue-700 to-blue-900 text-white flex flex-col py-8 px-4">
    <div className="text-2xl font-bold mb-8">Admin Panel</div>
    <nav className="flex flex-col gap-2">
      {links.map(link => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `px-4 py-2 rounded transition font-medium ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-800 text-blue-100'}`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar; 