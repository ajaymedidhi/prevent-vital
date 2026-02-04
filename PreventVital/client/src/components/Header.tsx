
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, logout } from '@/store';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [view, setView] = useState<'consumer' | 'business'>('consumer');
  const cartItems = useSelector((state: RootState) => state.shop.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Sync view state with current route for better UX on refresh
  useEffect(() => {
    const path = location.pathname;
    if (['/medical-professional-portal', '/partnership-portal', '/team'].some(p => path.includes(p))) {
      setView('business');
    } else if (['/homepage', '/disease-prevention-programs', '/ai-health-assessment', '/shop'].some(p => path.includes(p))) {
      setView('consumer');
    }
  }, [location.pathname]);


  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-cyan-50 text-cyan-700' : 'text-gray-600 hover:text-cyan-600';
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-300 ${className}`}>

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 px-4 text-center text-xs sm:text-sm font-medium relative z-50">
        <div className="container mx-auto">
          <span>Transform your health with AI-powered prevention. </span>
          <Link to="/ai-health-assessment" className="underline hover:text-blue-100 ml-1 inline-flex items-center">
            Start Free Assessment <span className="ml-1">→</span>
          </Link>
        </div>
      </div>

      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="w-full">
          <div className="flex items-center justify-between h-16 md:h-20 px-4 lg:px-8">

            {/* Logo */}
            <Link to="/homepage" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14">
                <AppImage
                  src="/images/logo-new.png"
                  alt="PreventVital.ai logo"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                PreventVital
              </span>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center space-x-2">
              {view === 'consumer' ? (
                <>
                  <Link to="/homepage" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/homepage')}`}>
                    Home
                  </Link>
                  <Link to="/disease-prevention-programs" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/disease-prevention-programs')}`}>
                    Programs
                  </Link>
                  <Link to="/ai-health-assessment" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/ai-health-assessment')}`}>
                    AI Assessment
                  </Link>
                  <Link to="/shop" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/shop')}`}>
                    Shop
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/medical-professional-portal" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/medical-professional-portal')}`}>
                    Mentorship
                  </Link>
                  <Link to="/partnership-portal" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/partnership-portal')}`}>
                    Partnership
                  </Link>
                  <Link to="/team" className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isActive('/team')}`}>
                    Team
                  </Link>
                </>
              )}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center space-x-6">

              {/* Context Toggle */}
              <div className="flex items-center bg-gray-100 p-1 rounded-full border border-gray-200">
                <button
                  onClick={() => { setView('consumer'); navigate('/homepage'); }}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${view === 'consumer' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'
                    }`}
                >
                  Consumer
                </button>
                <button
                  onClick={() => { setView('business'); navigate('/partnership-portal'); }}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${view === 'business' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-900'
                    }`}
                >
                  Business
                </button>
              </div>

              <Link
                to="/cart"
                className="relative p-2 text-gray-500 hover:text-primary transition-colors"
                title="Cart"
              >
                <Icon name="ShoppingCartIcon" size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors border border-primary/20"
                  >
                    My Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-sm font-semibold text-cyan-600 bg-white border border-cyan-200 hover:bg-cyan-50 rounded-lg transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-90 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-md transition-all"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 bg-white animate-in slide-in-from-top-5 duration-300 h-[calc(100vh-80px)] overflow-y-auto pb-20">
              <nav className="px-4 py-6 space-y-6">

                {/* Mobile View Toggle */}
                <div className="flex items-center bg-gray-100 p-1 rounded-xl mb-6">
                  <button
                    onClick={() => { setView('consumer'); navigate('/homepage'); }}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${view === 'consumer' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                      }`}
                  >
                    Consumer
                  </button>
                  <button
                    onClick={() => { setView('business'); navigate('/partnership-portal'); }}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${view === 'business' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'
                      }`}
                  >
                    Business
                  </button>
                </div>

                <div className="space-y-2">
                  {view === 'consumer' ? (
                    <>
                      <Link to="/homepage" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 rounded-lg text-base font-medium ${isActive('/homepage') === 'bg-cyan-50 text-cyan-700' ? 'bg-cyan-50 text-cyan-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                        Home
                      </Link>
                      <Link to="/disease-prevention-programs" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 rounded-lg text-base font-medium ${isActive('/disease-prevention-programs') === 'bg-cyan-50 text-cyan-700' ? 'bg-cyan-50 text-cyan-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                        Programs
                      </Link>
                      <Link to="/ai-health-assessment" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 rounded-lg text-base font-medium ${isActive('/ai-health-assessment') === 'bg-cyan-50 text-cyan-700' ? 'bg-cyan-50 text-cyan-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                        AI Assessment
                      </Link>
                      <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 rounded-lg text-base font-medium ${isActive('/shop') === 'bg-cyan-50 text-cyan-700' ? 'bg-cyan-50 text-cyan-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                        Shop
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/medical-professional-portal" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 rounded-lg text-base font-medium ${isActive('/medical-professional-portal') === 'bg-cyan-50 text-cyan-700' ? 'bg-cyan-50 text-cyan-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                        Mentorship
                      </Link>
                      <Link to="/partnership-portal" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 rounded-lg text-base font-medium ${isActive('/partnership-portal') === 'bg-cyan-50 text-cyan-700' ? 'bg-cyan-50 text-cyan-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                        Partnership
                      </Link>
                      <Link to="/team" onClick={() => setIsMobileMenuOpen(false)} className={`block px-4 py-3 rounded-lg text-base font-medium ${isActive('/team') === 'bg-cyan-50 text-cyan-700' ? 'bg-cyan-50 text-cyan-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                        Team
                      </Link>
                    </>
                  )}
                </div>

                <div className="pt-6 border-t border-gray-100 space-y-4">
                  <Link
                    to="/cart"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <Icon name="ShoppingCartIcon" size={18} className="mr-2" /> Cart ({cartCount})
                  </Link>

                  {!isAuthenticated && (
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-4 py-3 text-center text-sm font-semibold text-cyan-600 border border-cyan-200 rounded-lg hover:bg-cyan-50 transition-all"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-4 py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-90 rounded-lg transition-all"
                      >
                        Get Started
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export { Header };
