import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useEmailApi } from '@/hooks/useEmailApi';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, Search, RefreshCw, Paperclip, Reply,
  ReplyAll, Forward, Clock, Gift, ShoppingBag, X
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';

export const Mailbox = () => {
  const { user, logout, isOnline } = useAuth();
  const { emails, stats, loading, error, lastRefresh, fetchEmails, markAsRead, extractOTP } = useEmailApi();
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  const handleSignOut = () => {
    logout();
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of MailHub.",
    });
  };

  const handleEmailClick = (emailId: string) => {
    setSelectedEmail(emailId);
    markAsRead(emailId);
  };

  const handleRefresh = () => {
    fetchEmails();
    toast({
      title: "Refreshing inbox...",
      description: "Checking for new emails",
    });
  };

  const handleCloseBanner = () => {
    setShowPromoBanner(false);
  };

  const handleExtractOTP = async (emailId: string) => {
    try {
      const result = await extractOTP(emailId);
      if (result.otp?.found && result.otp?.bestCode) {
        const code = result.otp.bestCode.value;
        navigator.clipboard.writeText(code);
        toast({
          title: "OTP Extracted!",
          description: `Code ${code} copied to clipboard`,
        });
      } else {
        toast({
          title: "No OTP Found",
          description: "No OTP codes detected in this email",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to extract OTP from email",
        variant: "destructive",
      });
    }
  };

  const filteredEmails = emails.filter(email =>
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.sender.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedEmailData = selectedEmail ? emails.find(e => e.id === selectedEmail) : null;

  return (
    <Layout showFooter={false} className="flex-1">
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/95 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-primary animate-glow" />
                <h1 className="text-lg sm:text-2xl font-bold text-primary">MailHub</h1>
                <div className="hidden sm:flex items-center space-x-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`}></div>
                  <span className={`text-xs ${isOnline ? 'text-primary' : 'text-muted-foreground'}`}>
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={loading}
                  className="hover-glow"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline sm:ml-2">Refresh</span>
                </Button>
                
                <div className="hidden sm:flex items-center space-x-2">
                  {user?.profile?.avatar ? (
                    <img
                      src={user.profile.avatar}
                      alt="Profile"
                      className="w-6 h-6 rounded-full border border-border"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-semibold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground">{user?.name}</span>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="btn-gaming-outline text-xs sm:text-sm"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="space-y-4 sm:space-y-6">
        {/* Welcome Promo Banner */}
        {showPromoBanner && (
          <div className="bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 border border-primary/30 rounded-xl p-4 sm:p-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/30 rounded-xl">
                  <Gift className="w-6 h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    Welcome to MailHub 🎉
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Nikmati inbox cepat & cek promo spesial di store kami!
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Link to="/store">
                  <Button variant="default" className="bg-primary hover:bg-primary/80">
                    <span className="hidden sm:inline">Kunjungi Store</span>
                    <span className="sm:hidden">Store</span>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseBanner}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

            {/* Email Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Simplified Sidebar - Desktop Only */}
              <div className="hidden lg:block lg:col-span-1">
                <Card className="card-gaming h-fit">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-5 h-5 text-primary" />
                        <span>Inbox</span>
                      </div>
                      {stats.unread > 0 && (
                        <Badge className="badge-unread animate-pulse">
                          {stats.unread}
                        </Badge>
                      )}
                    </CardTitle>
                    {lastRefresh && (
                      <p className="text-xs text-muted-foreground">
                        Last updated: {lastRefresh.toLocaleTimeString()}
                      </p>
                    )}
                  </CardHeader>
                </Card>
              </div>

              {/* Email List */}
              <div className="flex-1 lg:col-span-3">
                <Card className="card-gaming h-[calc(100vh-140px)] sm:h-[calc(100vh-200px)] lg:h-[calc(100vh-220px)] flex flex-col">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                      <CardTitle className="flex items-center space-x-3 text-xl">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-6 h-6 text-primary lg:hidden" />
                          <span>Inbox</span>
                        </div>
                        <Badge variant="secondary" className="text-xs animate-pulse">
                          {stats.total} emails
                        </Badge>
                      </CardTitle>
                      
                      {/* Search Bar */}
                      <div className="flex items-center space-x-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:flex-none">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="Search emails..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-gaming pl-10 w-full sm:w-64"
                          />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                
                <CardContent className="flex-1 overflow-hidden">
                  {error && (
                    <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  )}
                  
                  {selectedEmailData ? (
                    // Email View
                    <div className="h-full flex flex-col">
                      <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-4 pb-4 border-b border-border">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedEmail(null)}
                          className="self-start"
                        >
                          ← Back to inbox
                        </Button>
                        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto">
                          <Button size="sm" variant="outline" className="flex-shrink-0">
                            <Reply className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Reply</span>
                          </Button>
                          <Button size="sm" variant="outline" className="flex-shrink-0">
                            <ReplyAll className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Reply All</span>
                          </Button>
                          <Button size="sm" variant="outline" className="flex-shrink-0">
                            <Forward className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">Forward</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleExtractOTP(selectedEmailData.id)}
                            className="flex-shrink-0 btn-gaming-outline"
                          >
                            <span className="text-xs">Extract OTP</span>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto space-y-4">
                         <div className="space-y-3">
                           <h2 className="text-lg sm:text-xl font-semibold leading-tight">{selectedEmailData.subject}</h2>
                           
                           {/* Display OTP codes prominently if found */}
                           {selectedEmailData.otpCodes && selectedEmailData.otpCodes.length > 0 && (
                             <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                               <h3 className="text-sm font-medium text-primary mb-2">🔢 OTP Codes Detected</h3>
                               <div className="flex flex-wrap gap-2">
                                 {selectedEmailData.otpCodes.map((otp, index) => (
                                   <Badge 
                                     key={index} 
                                     variant="default"
                                     className="text-lg font-mono px-4 py-2 cursor-pointer hover:bg-primary/80"
                                     onClick={() => {
                                       navigator.clipboard.writeText(otp);
                                       toast({
                                         title: "OTP Copied!",
                                         description: `Code ${otp} copied to clipboard`,
                                       });
                                     }}
                                   >
                                     {otp}
                                   </Badge>
                                 ))}
                               </div>
                               <p className="text-xs text-muted-foreground mt-2">Click any code to copy to clipboard</p>
                             </div>
                           )}
                           
                           <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              {selectedEmailData.sender.avatar && (
                                <img
                                  src={selectedEmailData.sender.avatar}
                                  alt="Sender"
                                  className="w-6 h-6 rounded-full flex-shrink-0"
                                />
                              )}
                              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 min-w-0">
                                <span className="font-medium truncate">{selectedEmailData.sender.name}</span>
                                <span className="text-xs sm:text-sm truncate">&lt;{selectedEmailData.sender.email}&gt;</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 flex-shrink-0">
                              <Clock className="w-4 h-4" />
                              <span className="text-xs sm:text-sm">{new Date(selectedEmailData.timestamp).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        
                         <div 
                           className="prose prose-sm max-w-none"
                           dangerouslySetInnerHTML={{ __html: selectedEmailData.content.html || `<p>${selectedEmailData.content.text}</p>` }}
                         />
                        
                        {selectedEmailData.attachments && selectedEmailData.attachments.length > 0 && (
                          <div className="border border-border rounded-lg p-4">
                            <h4 className="font-medium mb-2 flex items-center">
                              <Paperclip className="w-4 h-4 mr-2" />
                              Attachments ({selectedEmailData.attachments.length})
                            </h4>
                            <div className="space-y-2">
                              {selectedEmailData.attachments.map((attachment, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                                  <div className="flex items-center space-x-2">
                                    <Paperclip className="w-4 h-4" />
                                    <span className="text-sm font-medium">{attachment.filename}</span>
                                    <span className="text-xs text-muted-foreground">
                                      ({(attachment.size / 1024).toFixed(1)} KB)
                                    </span>
                                  </div>
                                  <Button size="sm" variant="outline">
                                    Download
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    // Email List
                    <div className="h-full overflow-y-auto space-y-2">
                      {loading && filteredEmails.length === 0 ? (
                        <div className="flex items-center justify-center h-32">
                          <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
                        </div>
                      ) : filteredEmails.length === 0 ? (
                        <div className="flex items-center justify-center h-32 text-muted-foreground">
                          {searchQuery ? 'No emails match your search' : 'No emails found'}
                        </div>
                      ) : (
                        filteredEmails.map((email) => (
                            <div
                            key={email.id}
                            onClick={() => handleEmailClick(email.id)}
                            className={`p-3 sm:p-4 rounded-xl border transition-all duration-200 hover:bg-muted cursor-pointer ${
                              !email.isRead 
                                ? 'border-primary bg-primary/5 hover:bg-primary/10' 
                                : 'border-border bg-transparent'
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              {/* Avatar */}
                              <div className="flex-shrink-0">
                                {email.sender.avatar ? (
                                  <img
                                    src={email.sender.avatar}
                                    alt="Sender"
                                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border"
                                  />
                                ) : (
                                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-xs sm:text-sm font-semibold">
                                    {email.sender.name.charAt(0)}
                                  </div>
                                )}
                              </div>

                              {/* Email Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <span className={`text-sm sm:text-base font-medium truncate ${!email.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                        {email.sender.name}
                                      </span>
                                       {!email.isRead && (
                                         <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 animate-pulse"></div>
                                       )}
                                       {email.attachments && email.attachments.length > 0 && (
                                         <Paperclip className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                                       )}
                                    </div>
                                    <p className={`text-sm sm:text-base truncate mb-1 ${!email.isRead ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                                      {email.subject}
                                    </p>
                                    <p className="text-xs sm:text-sm text-muted-foreground truncate mb-2 sm:mb-0">
                                      {email.preview}
                                    </p>
                                  </div>

                                  {/* Actions */}
                                  <div className="flex flex-col items-end space-y-1 ml-2">
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                      {new Date(email.timestamp).toLocaleDateString('id-ID', { 
                                        month: 'short', 
                                        day: 'numeric',
                                        ...(new Date(email.timestamp).getFullYear() !== new Date().getFullYear() && { year: 'numeric' })
                                      })}
                                    </span>
                                     <div className="flex items-center">
                                       {email.otpCodes && email.otpCodes.length > 0 && (
                                         <Badge className="badge-unread text-xs mr-2">
                                           OTP
                                         </Badge>
                                       )}
                                     </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};