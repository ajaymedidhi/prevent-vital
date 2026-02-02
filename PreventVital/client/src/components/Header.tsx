
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


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300 ${className}`}>
      <div className="w-full">
        <div className="flex items-center justify-between h-16 md:h-20 px-4 lg:px-6">
          {/* Logo */}
          <Link to="/homepage" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-xl overflow-hidden">
              <AppImage
                src="/images/logo-new.png"
                alt="PreventVital.ai logo"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
            <span className="hidden md:block text-2xl font-bold text-foreground tracking-tight">
              PreventVital
            </span>
          </Link>

          {/* Center Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/homepage" className="relative group px-1 py-2 text-base font-medium text-foreground/80 hover:text-primary transition-colors">
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/shop" className="relative group px-1 py-2 text-base font-medium text-foreground/80 hover:text-primary transition-colors">
              <span>Shop</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/medical-professional-portal" className="relative group px-1 py-2 text-base font-medium text-foreground/80 hover:text-primary transition-colors">
              <span>Medical Portal</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/partnership-portal" className="relative group px-1 py-2 text-base font-medium text-foreground/80 hover:text-primary transition-colors">
              <span>Partnership</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/team" className="relative group px-1 py-2 text-base font-medium text-foreground/80 hover:text-primary transition-colors">
              <span>Team</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-6 text-base font-medium border-r border-gray-200 pr-6">
              {/* Consumer Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors font-semibold focus:outline-none py-2">
                  <span className="relative">
                    Consumer
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <Icon name="ChevronDownIcon" size={14} className="group-hover:rotate-180 transition-transform duration-300 stroke-[3px]" />
                </button>
                <div className="absolute top-full right-0 w-60 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="bg-popover border border-border rounded-xl shadow-xl overflow-hidden text-left p-1">
                    <Link to="/disease-prevention-programs" className="block px-4 py-3 text-sm font-medium text-popover-foreground hover:bg-primary/5 hover:text-primary rounded-lg transition-colors">
                      <span className="font-semibold block text-base mb-0.5">Prevention Programs</span>
                      <span className="text-xs text-muted-foreground font-normal">Proactive health management</span>
                    </Link>
                    <Link to="/therapeutic-programs-center" className="block px-4 py-3 text-sm font-medium text-popover-foreground hover:bg-primary/5 hover:text-primary rounded-lg transition-colors">
                      <span className="font-semibold block text-base mb-0.5">Therapeutic Programs</span>
                      <span className="text-xs text-muted-foreground font-normal">Advanced care solutions</span>
                    </Link>
                  </div>
                </div>
              </div>

              <Link to="/contact" className="relative group text-foreground/80 hover:text-primary transition-colors">
                <span>Business</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>

            <Link
              to="/cart"
              className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
              title="Cart"
            >
              <Icon name="ShoppingCartIcon" size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full shadow-sm">
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
                  className="px-5 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-all"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md animate-in slide-in-from-top-5 duration-300 h-screen overflow-y-auto pb-20">
            <nav className="px-4 py-6 space-y-6">
              <div className="space-y-4">
                <Link to="/homepage" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-medium text-foreground">
                  Home
                </Link>
                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-medium text-foreground">
                  Shop
                </Link>

                <div className="pt-2 pb-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 pl-1">Programs</p>
                  <div className="pl-4 space-y-3 border-l-2 border-border/50 ml-1">
                    <Link to="/disease-prevention-programs" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-foreground/90">
                      Prevention Programs
                    </Link>
                    <Link to="/therapeutic-programs-center" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-foreground/90">
                      Therapeutic Programs
                    </Link>
                  </div>
                </div>

                <Link to="/medical-professional-portal" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-medium text-foreground">
                  Medical Portal
                </Link>
                <Link to="/partnership-portal" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-medium text-foreground">
                  Partnership
                </Link>
                <Link to="/team" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-medium text-foreground">
                  Team
                </Link>
              </div>

              <div className="pt-6 border-t border-border space-y-4">
                <div className="flex space-x-4 mb-4">
                  <Link to="/homepage" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 py-2 text-center text-sm font-bold bg-muted rounded-md">Consumer</Link>
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 py-2 text-center text-sm font-medium text-muted-foreground border border-border rounded-md">Business</Link>
                </div>

                <Link
                  to="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-muted transition-all"
                >
                  <Icon name="ShoppingCartIcon" size={18} className="mr-2" /> Cart ({cartCount})
                </Link>

                {!isAuthenticated && (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-3 text-center text-sm font-medium text-muted-foreground border border-border rounded-lg hover:bg-muted transition-all"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-3 text-center text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-lg transition-all"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export { Header };
