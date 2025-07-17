import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-defaultbg">
      {!isAdminPage && <Navbar />}
      <main className={`overflow-hidden ${isHomePage || isAdminPage ? '' : 'pt-20 lg:pt-28'} ${isAdminPage ? 'bg-bodyBgColor' : 'bg-[#F5F3E9]'}`}>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  )
}

export default MainLayout
