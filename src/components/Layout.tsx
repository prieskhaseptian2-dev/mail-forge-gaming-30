import { ReactNode } from 'react';
import { Header } from '@/components/Header';
import { MobileNavigation } from '@/components/MobileNavigation';
import { Footer } from '@/components/Footer';

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
  className?: string;
}

export const Layout = ({ children, showFooter = true, className = '' }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Header />
      </div>

      {/* Mobile Top Bar + Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile connection status bar */}
        <div className="md:hidden h-12" />
        
        {/* Main content area */}
        <main className={`flex-1 ${className}`}>
          {children}
        </main>

        {/* Footer - only on certain pages */}
        {showFooter && (
          <div className="hidden md:block">
            <Footer />
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
};