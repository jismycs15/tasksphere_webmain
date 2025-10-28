import NavBar from './components/Navbar';
import SideBar from './components/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="flex flex-col h-screen overflow-hidden w-full bg-blue-500">
    {/* Top Navbar */}
    {/* <NavBar />   */}

    {/* Body Section: Sidebar + Main */}
    <div className="flex flex-1 overflow-hidden w-screen">
      <div className=" bg-rose-800 text-white w-60">
        <SideBar />
      </div>

      <main className="flex-1  p-4 bg-gray-50 ">
        <Outlet />
      </main>
    </div>
  </div>
);

export default Layout;


