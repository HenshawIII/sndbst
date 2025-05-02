import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { usePrivy } from '@privy-io/react-auth';
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { authenticated, user, logout } = usePrivy();
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setIsDropdownOpen(false);
    setIsSidebarOpen(false);
  };

  const handleLogoutConfirm = async () => {
    await logout();
    window.location.href = "/";
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  // Format wallet address for display
  const formatAddress = (address: string | null | undefined) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-6 right-4 z-[1001] text-white p-2"
      >
        <Icon icon="solar:hamburger-menu-bold" width={24} height={24} />
      </button>

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-64 bg-[#20242D] transform transition-transform duration-300 ease-in-out z-[1000] md:hidden ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Navigation Links */}
          <div className="flex-1 pt-20 px-4">
            <nav className="flex flex-col gap-4">
              <Link 
                href="/" 
                onClick={() => setIsSidebarOpen(false)}
                className={`text-sm font-medium transition-colors p-2 rounded-lg ${
                  isActive('/') 
                    ? 'text-white bg-[rgba(255,255,255,0.1)]' 
                    : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/chat" 
                onClick={() => setIsSidebarOpen(false)}
                className={`text-sm font-medium transition-colors p-2 rounded-lg ${
                  isActive('/chat') 
                    ? 'text-white bg-[rgba(255,255,255,0.1)]' 
                    : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                }`}
              >
                Chat with AI
              </Link>

              {/* Wallet and Logout Section */}
              {authenticated && (
                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.1)]">
                  {user?.wallet && (
                    <div className="flex items-center gap-2 p-2 text-gray-400">
                      <Icon icon="solar:wallet-bold" className="text-white" width={20} height={20} />
                      <span className="text-sm">
                        {formatAddress(user.wallet.address)}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                  >
                    <Icon icon="solar:logout-3-bold" className="text-red-400" width={20} height={20} />
                    Logout
                  </button>
                </div>
              )}
            </nav>
          </div>

          {/* Logo at bottom */}
          <div className="p-4 border-t border-[rgba(255,255,255,0.1)]">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsSidebarOpen(false)}>
              <Image
                src="/sendai.jpg"
                width={32}
                height={32}
                alt="Sendai Logo"
                className="rounded-lg"
              />
              <span className="text-white font-semibold">Solana Agent Kit</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex fixed top-0 left-0 w-full z-[1000] bg-transparent backdrop-blur-sm items-center justify-between h-24 px-12">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-2xl flex items-center justify-center">
              <Image
                src="/sendai.jpg"
                width={40}
                height={40}
                alt="Sendai Logo"
                className="rounded-xl"
              />
            </div>
            {/* <span className="text-white font-bold text-lg"></span> */}
          </Link>

          <nav className="flex items-center gap-6">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/chat" 
              className={`text-sm font-medium transition-colors ${
                isActive('/chat') 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Chat with AI
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {/* {authenticated && user?.wallet && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.15)] px-4 py-2 rounded-lg transition-colors"
              >
                <Icon icon="solar:wallet-bold" className="text-white" width={20} height={20} />
                <span className="text-white">
                  {formatAddress(user.wallet.address)}
                </span>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#20242D] rounded-lg shadow-lg border border-[rgba(255,255,255,0.1)] overflow-hidden">
                  <button
                    onClick={handleLogoutClick}
                    className="w-full text-left px-4 py-2 text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors flex items-center gap-2"
                  >
                    <Icon icon="solar:logout-3-bold" className="text-white" width={16} height={16} />
                    Disconnect Wallet
                  </button>
                </div>
              )}
            </div>
          )} */}
          {authenticated && (
            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Icon icon="solar:logout-3-bold" className="text-white" width={20} height={20} />
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
          <div className="bg-[#20242D] rounded-lg p-6 max-w-sm w-full mx-4 border border-[rgba(255,255,255,0.1)]">
            <h3 className="text-white text-xl font-semibold mb-4">Confirm Logout</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to logout? You will need to reconnect your wallet to continue using the application.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleLogoutCancel}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
