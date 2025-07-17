import { FaBell, FaCalendarAlt, FaCampground, FaClipboardList, FaCog, FaImages, FaSignOutAlt, FaTachometerAlt, FaTimes, FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const links = [
  { label: 'Dashboard', icon: <FaTachometerAlt />, to: '/admin', tab: 'dashboard' },
  { label: 'Camping Sites', icon: <FaCampground />, to: '/admin?tab=camping-sites', tab: 'camping-sites' },
  { label: 'Bookings', icon: <FaClipboardList />, to: '/admin?tab=bookings', tab: 'bookings' },
  { label: 'Bookings by Day', icon: <FaCalendarAlt />, to: '/admin?tab=bookings-by-day', tab: 'bookings-by-day' },
  { label: 'Users', icon: <FaUsers />, to: '/admin?tab=users', tab: 'users' },
  { label: 'Gallery', icon: <FaImages />, to: '/admin?tab=gallery', tab: 'gallery' },
  { label: 'Notifications', icon: <FaBell />, to: '/admin?tab=notifications', tab: 'notifications' },
  { label: 'Settings', icon: <FaCog />, to: '/admin?tab=settings', tab: 'settings' },
];

const Sidebar = ({ activeTab, setActiveTab, onClose, isOpen }) => {
  const isActive = (link) => {
    if (link.tab === 'dashboard') {
      return activeTab === 'dashboard' || !activeTab;
    }
    return activeTab === link.tab;
  };

  return (
    <aside
      className={`bg-white shadow-2xl h-full w-64 flex flex-col py-4 px-3 border-r border-gray-200 fixed top-0 left-0 z-50 lg:static lg:translate-x-0 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:w-64 w-4/5 max-w-xs
      `}
      style={{ minHeight: '100vh' }}
    >
      {/* Top: Logo and Close Button */}
      <div className="flex items-center justify-between mb-8 px-2">
        <span className="text-2xl font-bold text-primaryGreen tracking-wide">EGATOR</span>
        <div className="flex items-center gap-2">
          <button
            className="lg:hidden p-2 rounded-full text-gray-500 hover:text-primaryGreen focus:outline-none focus:ring-2 focus:ring-primaryGreen"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <FaTimes size={22} />
          </button>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 flex flex-col gap-1">
        {links.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            className={() =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-PoppinsMedium transition-colors duration-200 text-base
              ${isActive(link) ? 'bg-primaryGreen text-white shadow' : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-primaryGreen'}`
            }
            onClick={() => {
              setActiveTab && setActiveTab(link.tab);
              onClose && onClose();
            }}
          >
            <span className="text-lg">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: Logout */}
      <div className="mt-auto px-2 pb-2">
        <button className="flex items-center gap-3 px-4 py-3 rounded-lg font-PoppinsMedium text-red-600 hover:bg-red-50 w-full transition-colors text-base focus:outline-none focus:ring-2 focus:ring-red-400">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar; 