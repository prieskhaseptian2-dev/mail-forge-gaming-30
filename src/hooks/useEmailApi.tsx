import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';

interface Email {
  id: string;
  sender: {
    name: string;
    email: string;
    avatar?: string;
  };
  subject: string;
  preview: string;
  content: {
    text: string;
    html: string;
  };
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  hasAttachments: boolean;
  labels?: string[];
  attachments?: Array<{
    id: string;
    filename: string;
    contentType: string;
    size: number;
  }>;
  // Add OTP support
  otpCodes?: string[];
  size?: number;
}

interface EmailStats {
  total: number;
  unread: number;
  starred: number;
}

export const useEmailApi = () => {
  const { isAuthenticated } = useAuth();
  const [emails, setEmails] = useState<Email[]>([]);
  const [stats, setStats] = useState<EmailStats>({ total: 0, unread: 0, starred: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchEmails = useCallback(async (force = false) => {
    if (!isAuthenticated) return;

    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 useEmailApi: Fetching emails...', force ? '(forced)' : '(auto)');
      
      // Always use working endpoint
      const response = await api.getMessages();
      
      if (response.success && response.messages) {
        console.log('📧 Raw API response:', response);
        
        // Transform API response to match Email interface with OTP parsing
        const transformedEmails: Email[] = response.messages.map((msg: any) => {
          // Extract OTP codes from subject (6-digit numbers)
          const otpRegex = /\b\d{6}\b/g;
          const otpCodes = msg.subject?.match(otpRegex) || [];
          
          return {
            id: msg.id,
            sender: {
              name: msg.from?.name || msg.from?.address?.split('@')[0] || 'Unknown',
              email: msg.from?.address || 'unknown@example.com',
              avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(msg.from?.address || 'unknown')}`
            },
            subject: msg.subject || 'No Subject',
            preview: msg.intro || '',
            timestamp: new Date(msg.createdAt || Date.now()),
            isRead: msg.seen || false,
            isStarred: false, // API doesn't provide starred status
            hasAttachments: msg.hasAttachments || false,
            content: {
              text: msg.text || msg.intro || '',
              html: msg.html || `<p>${msg.intro || ''}</p>`
            },
            attachments: msg.attachments || [],
            labels: ['inbox'],
            // Add OTP data
            otpCodes: otpCodes,
            size: msg.size || 0
          };
        });

        console.log('✅ Transformed emails:', transformedEmails.length, 'emails');
        console.log('🔢 OTP codes found:', transformedEmails.flatMap(e => e.otpCodes || []).length, 'codes');

        setEmails(transformedEmails);
        setStats({
          total: transformedEmails.length,
          unread: transformedEmails.filter(email => !email.isRead).length,
          starred: transformedEmails.filter(email => email.isStarred).length
        });
        
        setLastRefresh(new Date());
      } else {
        console.warn('⚠️ API response missing messages:', response);
        setError('No messages data received from server');
      }
    } catch (error) {
      console.error('❌ Failed to fetch emails:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch emails');
      
      // Handle session expired
      if (error instanceof Error && error.message.includes('Session expired')) {
        console.log('🔄 Session expired, auth will handle logout');
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Auto-refresh emails every 30 seconds when authenticated
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isAuthenticated) {
      console.log('🔄 Setting up auto-refresh every 30 seconds');
      interval = setInterval(() => {
        console.log('🔄 Auto-refreshing emails...');
        fetchEmails(false); // Use non-forced refresh for auto-refresh
      }, 30000);
    }
    
    return () => {
      if (interval) {
        console.log('🛑 Clearing auto-refresh interval');
        clearInterval(interval);
      }
    };
  }, [isAuthenticated, fetchEmails]);

  const markAsRead = useCallback(async (emailId: string) => {
    try {
      // Optimistic update
      setEmails(prev => prev.map(email => 
        email.id === emailId ? { ...email, isRead: true } : email
      ));
      setStats(prev => ({ ...prev, unread: Math.max(0, prev.unread - 1) }));

      // Note: The new API doesn't have a mark as read endpoint yet
      // This will be handled when viewing the message
    } catch (error) {
      console.error('Failed to mark email as read:', error);
    }
  }, []);

  const toggleStar = useCallback(async (emailId: string) => {
    try {
      // Optimistic update
      const email = emails.find(e => e.id === emailId);
      if (!email) return;

      const newStarredState = !email.isStarred;
      
      setEmails(prev => prev.map(email => 
        email.id === emailId ? { ...email, isStarred: newStarredState } : email
      ));
      
      setStats(prev => ({ 
        ...prev, 
        starred: newStarredState ? prev.starred + 1 : Math.max(0, prev.starred - 1)
      }));

      // Note: The new API doesn't have a star endpoint yet
      // This is currently client-side only
    } catch (error) {
      console.error('Failed to toggle star:', error);
    }
  }, [emails]);

  // Initial fetch on authentication
  useEffect(() => {
    if (isAuthenticated) {
      console.log('🔐 User authenticated, fetching emails...');
      fetchEmails(true); // Force refresh on initial load
    } else {
      console.log('❌ User not authenticated, clearing emails...');
      setEmails([]);
      setStats({ total: 0, unread: 0, starred: 0 });
      setError(null);
    }
  }, [isAuthenticated]);

  const extractOTP = useCallback(async (emailId: string) => {
    try {
      const result = await api.extractOTP(emailId);
      return result;
    } catch (error) {
      console.error('Failed to extract OTP:', error);
      return { otp: { found: false, codes: [] } };
    }
  }, []);

  return {
    emails,
    stats,
    loading,
    error,
    lastRefresh,
    fetchEmails: () => fetchEmails(true), // Always force refresh when called manually
    markAsRead,
    toggleStar,
    extractOTP,
  };
};