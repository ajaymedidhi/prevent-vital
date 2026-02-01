
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
          <Link to="/homepage" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-xl overflow-hidden">
              <AppImage
                src="/images/logo-new.png"
                alt="PreventVital.ai logo featuring letter G with anatomical heart and circuit elements"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
            <span className="hidden md:block text-2xl font-bold text-foreground tracking-tight">
              PreventVital
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/homepage"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-all duration-300"
            >
              Home
            </Link>

            {/* Programs Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-all duration-300">
                <span>Programs</span>
                <Icon name="ChevronDownIcon" size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute left-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Link to="/disease-prevention-programs" className="block px-4 py-3 text-sm text-popover-foreground hover:bg-muted hover:text-primary transition-colors">
                  <span className="font-semibold block">Prevention Programs</span>
                  <span className="text-xs text-muted-foreground">Proactive health management</span>
                </Link>
                <Link to="/therapeutic-programs-center" className="block px-4 py-3 text-sm text-popover-foreground hover:bg-muted hover:text-primary transition-colors border-t border-border/50">
                  <span className="font-semibold block">Therapeutic Programs</span>
                  <span className="text-xs text-muted-foreground">Advanced care solutions</span>
                </Link>
              </div>
            </div>

            <Link
              to="/ai-health-assessment"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-all duration-300"
            >
              AI Assessment
            </Link>

            <Link
              to="/shop"
              className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-all duration-300"
            >
              Shop
            </Link>

            {/* Business Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-all duration-300">
                <span>Business</span>
                <Icon name="ChevronDownIcon" size={14} className="group-hover:rotate-180 transition-transform duration-300" />
              </button>
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Link to="/medical-professional-portal" className="block px-4 py-3 text-sm font-medium text-popover-foreground hover:bg-muted hover:text-primary transition-colors">
                  Medical Portal
                </Link>
                <Link to="/partnership-portal" className="block px-4 py-3 text-sm font-medium text-popover-foreground hover:bg-muted hover:text-primary transition-colors">
                  Partnership Portal
                </Link>
                <Link to="/team" className="block px-4 py-3 text-sm font-medium text-popover-foreground hover:bg-muted hover:text-primary transition-colors">
                  Our Team
                </Link>
                <Link to="/contact" className="block px-4 py-3 text-sm font-medium text-popover-foreground hover:bg-muted hover:text-primary transition-colors border-t border-border/50">
                  Contact Us
                </Link>
              </div>
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
                  className="px-4 py-2 text-sm font-semibold text-primary border border-primary/20 hover:bg-primary/5 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Sign Up
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

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-md animate-in slide-in-from-top-5 duration-300 h-screen overflow-y-auto pb-20">
            <nav className="px-4 py-6 space-y-6">

              {/* Home */}
              <div>
                <Link
                  to="/homepage"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-semibold text-foreground block mb-2"
                >
                  Home
                </Link>
              </div>

              {/* Programs Section */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Programs</h3>
                <div className="space-y-3 pl-2 border-l-2 border-border">
                  <Link
                    to="/disease-prevention-programs"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-medium text-foreground hover:text-primary"
                  >
                    Prevention Programs
                  </Link>
                  <Link
                    to="/therapeutic-programs-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-medium text-foreground hover:text-primary"
                  >
                    Therapeutic Programs
                  </Link>
                  <Link
                    to="/ai-health-assessment"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-medium text-accent hover:text-accent/80"
                  >
                    AI Health Assessment
                  </Link>
                </div>
              </div>

              {/* Business Section */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Business</h3>
                <div className="space-y-3 pl-2 border-l-2 border-border">
                  <Link
                    to="/medical-professional-portal"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-medium text-foreground hover:text-primary"
                  >
                    Medical Portal
                  </Link>
                  <Link
                    to="/partnership-portal"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-medium text-foreground hover:text-primary"
                  >
                    Partnership Portal
                  </Link>
                  <Link
                    to="/team"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-medium text-foreground hover:text-primary"
                  >
                    Our Team
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-medium text-foreground hover:text-primary"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* User Actions */}
              <div className="pt-6 border-t border-border space-y-3">
                <Link
                  to="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-muted transition-all"
                >
                  <Icon name="ShoppingCartIcon" size={18} className="mr-2" /> Shop / Cart ({cartCount})
                </Link>

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
                    className="px-4 py-3 text-center text-sm font-semibold text-primary border border-primary/20 bg-primary/5 hover:bg-primary/10 rounded-lg transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header >
  );
};

export { Header };
