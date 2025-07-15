import NavBar from './components/Navbar';
import SideBar from './components/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="flex flex-col h-screen overflow-hidden">
    {/* Top Navbar */}
    <NavBar />

    {/* Body Section: Sidebar + Main */}
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar takes fixed width */}
      <div className="w-64 bg-rose-800 text-white overflow-y-auto">
        <SideBar />
      </div>

      {/* Main content fills remaining space */}
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <Outlet />
      </main>
    </div>
  </div>
);

export default Layout;


