import { ReactNode } from 'react';
import { ConsistentHeader } from '@/components/ConsistentHeader';
import { MobileNavigation } from '@/components/MobileNavigation';
import { Footer } from '@/components/Footer';

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
  showBackToMailbox?: boolean;
  pageTitle?: string;
  className?: string;
}

export const Layout = ({ 
  children, 
  showFooter = true, 
  showBackToMailbox = true,
  pageTitle,
  className = ""
}: LayoutProps) => {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <ConsistentHeader showBackToMailbox={showBackToMailbox} pageTitle={pageTitle} />
      
      <main className="flex-1">
        {children}
      </main>
      
      {showFooter && <Footer />}
      <MobileNavigation />
    </div>
  );
};