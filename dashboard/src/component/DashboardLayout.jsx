import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiDollarSign, 
  FiTrendingUp, 
  FiSearch, 
  FiBell, 
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronDown,
  FiUser
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../Redux/Reducer/adminReducer';

const Layout = ({ children, activePage, setActivePage }) => {
  const { userInfo } = useSelector((state) => state.admin);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigationItems = [
    { id: 'home', label: 'Dashboard', icon: <FiHome size={20} />, link: '/' },
    { id: 'members', label: 'Members', icon: <FiUsers size={20} />, link: '/members' },
    { id: 'withdraw', label: 'Withdrawals', icon: <FiDollarSign size={20} />, link: '/withdraw' },
    { id: 'deposit', label: 'Deposits', icon: <FiTrendingUp size={20} />, link: '/deposit' },
  ];

  useEffect(() => {
    dispatch(getUser());
  },[dispatch])

  const handleLogout = () => {
    // Handle logout logic
    navigate('/login');
    setProfileDropdownOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed md:relative z-30 md:z-auto md:flex flex-col w-64 bg-[#08c18a] transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="flex items-center justify-between h-16 px-4 bg-[#08c18a] border-b border-[#42d8ab]">
          <span className="text-white font-bold text-xl text-center">Admin Dashboard</span>
          <button 
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4">
            {navigationItems.map((item) => (
              <Link
                to={item.link}
                key={item.id}
                className={`flex items-center px-4 py-3 mt-2 rounded-lg transition-colors duration-200 w-full text-left ${activePage === item.id ? 'bg-[#00865e] text-white' : ' hover:bg-[#00865e] text-white'}`}
                onClick={() => {
                  setActivePage(item.id);
                  setSidebarOpen(false);
                }}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-[#08c18a]">
          <Link to={`/settings`} className="flex items-center px-4 py-3 text-gray-300">
            <FiSettings size={18} className="mr-3" />
            <span className="font-medium">Settings</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center">
            <button 
              className="md:hidden text-gray-500 hover:text-gray-700 mr-2"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu size={24} />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            
            <div className="relative">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-[#08c18a] flex items-center justify-center text-white font-medium">
                  <FiUser size={18} />
                </div>
                <span className="ml-2 text-gray-700 hidden md:block">Admin</span>
                <FiChevronDown size={16} className="ml-1 text-gray-500" />
              </button>
              
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm text-gray-700">Signed in as</p>
                    <p className="text-sm font-medium text-gray-900">{userInfo?.email}</p>
                  </div>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Layout;