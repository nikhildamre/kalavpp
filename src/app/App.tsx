import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { ProductCategoryPage } from './components/pages/ProductCategoryPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ServiceDetailPage } from './components/pages/ServiceDetailPage';
import { WorkshopDetailPage } from './components/pages/WorkshopDetailPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { CartPage } from './components/pages/CartPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { EnhancedVendorDashboard } from './components/pages/EnhancedVendorDashboard';
import { EnhancedAdminDashboard } from './components/pages/EnhancedAdminDashboard';
import { SettingsPage } from './components/pages/SettingsPage';
import { OrderHistoryPage } from './components/pages/OrderHistoryPage';
import { WishlistPage } from './components/pages/WishlistPage';
import { HelpPage } from './components/pages/HelpPage';
import { TermsPage } from './components/pages/TermsPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { ReturnsRefundsPage } from './components/pages/ReturnsRefundsPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { OrderConfirmationPage } from './components/pages/OrderConfirmationPage';
import { PageTransition } from './components/PageTransition';
import { BackToTop } from './components/BackToTop';
import { Toaster } from './components/ui/sonner';
import { AnimatePresence } from 'motion/react';

export type Page =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'services'
  | 'service-detail'
  | 'workshop-detail'
  | 'about'
  | 'contact'
  | 'cart'
  | 'checkout'
  | 'login'
  | 'register'
  | 'vendor-dashboard'
  | 'admin-dashboard'
  | 'profile'
  | 'settings'
  | 'orders'
  | 'wishlist'
  | 'help'
  | 'terms'
  | 'privacy'
  | 'returns-refunds'
  | 'order-confirmation'
  | '404';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string | null>(null);

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page as Page);
    if (id) {
      if (page === 'product-detail') {
        setSelectedProductId(id);
      } else if (page === 'service-detail') {
        setSelectedServiceId(id);
      } else if (page === 'workshop-detail') {
        setSelectedWorkshopId(id);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'shop':
        return <ProductCategoryPage onNavigate={handleNavigate} />;
      case 'product-detail':
        return <ProductDetailPage productId={selectedProductId} onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'service-detail':
        return <ServiceDetailPage serviceId={selectedServiceId} onNavigate={handleNavigate} />;
      case 'workshop-detail':
        return <WorkshopDetailPage workshopId={selectedWorkshopId} onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'checkout':
        return <CheckoutPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;
      case 'vendor-dashboard':
        return <EnhancedVendorDashboard onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return <EnhancedAdminDashboard onNavigate={handleNavigate} />;
      case 'profile':
        return <SettingsPage onNavigate={handleNavigate} />;
      case 'settings':
        return <SettingsPage onNavigate={handleNavigate} />;
      case 'orders':
        return <OrderHistoryPage onNavigate={handleNavigate} />;
      case 'wishlist':
        return <WishlistPage onNavigate={handleNavigate} />;
      case 'help':
        return <HelpPage onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsPage onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyPage onNavigate={handleNavigate} />;
      case 'returns-refunds':
        return <ReturnsRefundsPage onNavigate={handleNavigate} />;
      case 'order-confirmation':
        return <OrderConfirmationPage onNavigate={handleNavigate} />;
      case '404':
        return <NotFoundPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
        <Header onNavigate={handleNavigate} currentPage={currentPage} />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <PageTransition key={currentPage}>
              {renderPage()}
            </PageTransition>
          </AnimatePresence>
        </main>
        <Footer />
        <BackToTop />
        <Toaster />
      </div>
    </AppProvider>
  );
}