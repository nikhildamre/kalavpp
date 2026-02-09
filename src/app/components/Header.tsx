import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import logo from '../../assets/logo.png';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { navigationMenu } from '../data/mockData';
import { toast } from 'sonner';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { user, cartCount, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', value: 'home', hasDropdown: false },
    { label: 'E-Commerce', value: 'ecommerce', hasDropdown: true },
    { label: 'Creative Services', value: 'services', hasDropdown: true },
    { label: 'About', value: 'about', hasDropdown: false },
    { label: 'Contact', value: 'contact', hasDropdown: false },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('shop');
      console.log('Searching for:', searchQuery);
    }
  };

  const handleMouseEnter = (value: string, hasDropdown: boolean) => {
    if (hasDropdown) {
      setActiveDropdown(value);
    }
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <motion.header
      className={`sticky top-0 z-50 bg-white border-b border-gray-200 transition-shadow ${scrolled ? 'shadow-md' : ''
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top bar with logo, search, and actions */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.button
            onClick={() => onNavigate('home')}
            className="flex-shrink-0 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={logo} alt="Kalavpp Logo" className="h-10 w-auto" />
          </motion.button>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-8">
            <motion.div
              className="relative w-full"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="search"
                placeholder="Search for art, artists, products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-full focus:ring-2 focus:ring-[#D4AF37] transition-all rounded-none"
              />
            </motion.div>
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                  >
                    <User className="w-5 h-5" />
                    <span>{user.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      if (user.role === 'vendor') onNavigate('vendor-dashboard');
                      else if (user.role === 'admin') onNavigate('admin-dashboard');
                      else onNavigate('settings');
                    }}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onNavigate('settings')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      onNavigate('home');
                      toast.success('Logged out successfully!');
                    }}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('login')}
                  className="gap-2"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </Button>
              </motion.div>
            )}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('cart')}
                className="relative gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Badge
                        variant="default"
                        className="h-5 w-5 flex items-center justify-center p-0 text-xs bg-[#8B4049] hover:bg-[#8B4049]"
                      >
                        {cartCount}
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 w-full rounded-none"
            />
          </div>
        </form>
      </div>

      {/* Desktop Navigation with Mega Menu */}
      <nav className="hidden md:block border-t border-gray-100 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-8 h-14">
            {navItems.map((item) => (
              <div
                key={item.value}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.value, item.hasDropdown)}
                onMouseLeave={handleMouseLeave}
              >
                <motion.button
                  onClick={() => {
                    if (!item.hasDropdown) {
                      onNavigate(item.value);
                    } else if (item.value === 'ecommerce') {
                      onNavigate('shop');
                    } else if (item.value === 'services') {
                      onNavigate('services');
                    }
                  }}
                  className={`text-sm font-medium transition-colors relative flex items-center gap-1 tracking-wide ${currentPage === item.value ||
                    (item.value === 'ecommerce' && currentPage === 'shop') ||
                    (item.value === 'services' && (currentPage === 'services' || currentPage === 'workshops'))
                    ? 'text-[#D4AF37]'
                    : 'text-gray-700 hover:text-[#D4AF37]'
                    }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                  {(currentPage === item.value ||
                    (item.value === 'ecommerce' && currentPage === 'shop') ||
                    (item.value === 'services' && currentPage === 'services')) && (
                      <motion.div
                        className="absolute -bottom-4 left-0 right-0 h-0.5 bg-[#D4AF37]"
                        layoutId="navbar-indicator"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                </motion.button>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {activeDropdown === item.value && item.hasDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 pt-2 w-screen max-w-4xl"
                    >
                      <div className="bg-white border border-gray-200 shadow-2xl p-8">
                        <div className="grid grid-cols-3 gap-8">
                          {item.value === 'ecommerce' && navigationMenu.ecommerce.sections.map((section, idx) => (
                            <div key={idx}>
                              <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide uppercase">
                                {section.name}
                              </h3>
                              <ul className="space-y-3">
                                {section.items.map((subItem, subIdx) => (
                                  <li key={subIdx}>
                                    <button
                                      onClick={() => {
                                        onNavigate('shop');
                                        setActiveDropdown(null);
                                      }}
                                      className="text-sm text-gray-600 hover:text-[#D4AF37] transition-colors font-light"
                                    >
                                      {subItem.name}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          {item.value === 'services' && navigationMenu.services.sections.map((section, idx) => (
                            <div key={idx}>
                              <h3 className="text-sm font-semibold text-gray-900 mb-4 tracking-wide uppercase">
                                {section.name}
                              </h3>
                              <ul className="space-y-3">
                                {section.items.map((subItem, subIdx) => (
                                  <li key={subIdx}>
                                    <button
                                      onClick={() => {
                                        onNavigate('services');
                                        setActiveDropdown(null);
                                      }}
                                      className="text-sm text-gray-600 hover:text-[#D4AF37] transition-colors font-light"
                                    >
                                      {subItem.name}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-gray-200 bg-white overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.value}
                  onClick={() => {
                    if (item.value === 'ecommerce') {
                      onNavigate('shop');
                    } else if (item.value === 'services') {
                      onNavigate('services');
                    } else {
                      onNavigate(item.value);
                    }
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === item.value ||
                    (item.value === 'ecommerce' && currentPage === 'shop') ||
                    (item.value === 'services' && currentPage === 'services')
                    ? 'bg-[#D4AF37] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.div
                className="pt-4 border-t border-gray-200 flex gap-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.05 }}
              >
                {user ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (user.role === 'vendor') onNavigate('vendor-dashboard');
                        else if (user.role === 'admin') onNavigate('admin-dashboard');
                        else onNavigate('settings');
                        setMobileMenuOpen(false);
                      }}
                      className="flex-1 gap-2"
                    >
                      <User className="w-4 h-4" />
                      {user.name}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast.success('Logged out successfully!');
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onNavigate('login');
                      setMobileMenuOpen(false);
                    }}
                    className="flex-1 gap-2"
                  >
                    <User className="w-4 h-4" />
                    Login
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    onNavigate('cart');
                    setMobileMenuOpen(false);
                  }}
                  className="relative gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                  {cartCount > 0 && (
                    <Badge
                      variant="default"
                      className="ml-1 bg-[#8B4049] hover:bg-[#8B4049]"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}