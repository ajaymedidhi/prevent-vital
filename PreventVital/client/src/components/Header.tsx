
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { useSelector, useDispatch } from 'react-redux';
import { ShopState } from '@/store/shopSlice';
import { RootState, logout } from '@/store';

interface HeaderProps {
  className?: string;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.shop.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const primaryNavItems = [
    { label: 'Home', href: '/homepage' },
    { label: 'Shop', href: '/shop' },
    { label: 'AI Health Assessment', href: '/ai-health-assessment' },
    { label: 'Prevention Programs', href: '/disease-prevention-programs' },
    { label: 'Medical Portal', href: '/medical-professional-portal' },
  ];

  const secondaryNavItems = [
    { label: 'Partnership Portal', href: '/partnership-portal' },
    { label: 'Therapeutic Programs', href: '/therapeutic-programs-center' },
    // Removed specific role dashboards from public nav to avoid confusion
    { label: 'Our Team', href: '/team' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMoreMenuOpen(false);
  };

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-border ${className}`}>
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <Link to="/homepage" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden">
              <AppImage
                src="/images/logo-new.png"
                alt="PreventVital.ai logo featuring letter G with anatomical heart and circuit elements"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">
              PreventVital
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}

            <div className="relative">
              <button
                onClick={toggleMoreMenu}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-all duration-300"
              >
                <span>More</span>
                <Icon
                  name="ChevronDownIcon"
                  size={16}
                  className={`transition-transform duration-300 ${isMoreMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isMoreMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  {secondaryNavItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMoreMenuOpen(false)}
                      className="block px-4 py-3 text-sm font-medium text-popover-foreground hover:bg-muted transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/cart"
              className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
              title="Cart"
            >
              <Icon name="ShoppingCartIcon" size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/account"
                  className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200"
                >
                  My Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-semibold text-primary border border-primary/20 hover:bg-primary/5 rounded-lg transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            )}
            <Link
              to="/ai-health-assessment"
              className="px-4 py-2 text-sm font-semibold text-accent-foreground bg-accent hover:bg-accent/90 rounded-lg transition-all duration-300 hover:scale-105 shadow-sm"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-all"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background animate-in slide-in-from-top-2 duration-300">
            <nav className="px-4 py-4 space-y-1">
              {[...primaryNavItems, ...secondaryNavItems].map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-all"
                >
                  {item.label}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-3 mt-4 px-3">
                <Link
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 text-center text-sm font-medium text-muted-foreground border border-border rounded-lg hover:bg-muted transition-all flex items-center justify-center gap-2"
                >
                  <Icon name="ShoppingCartIcon" size={16} />
                  Cart ({cartCount})
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 text-center text-sm font-medium text-muted-foreground border border-border rounded-lg hover:bg-muted transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-2 text-center text-sm font-semibold text-primary border border-primary/20 bg-primary/5 hover:bg-primary/10 rounded-lg transition-all"
                >
                  Sign Up
                </Link>
              </div>
              <Link
                to="/ai-health-assessment"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block mx-3 mt-2 px-4 py-3 text-center text-sm font-semibold text-accent-foreground bg-accent hover:bg-accent/90 rounded-lg transition-all"
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header >
  );
};

export { Header };
