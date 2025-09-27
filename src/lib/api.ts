// JWT Token-based API client for cross-domain authentication
// Uses Authorization: Bearer <token> header instead of cookies

export const API_BASE = 'https://api.gaminghub.my.id/api';

const TOKEN_KEY = 'webmail_token';

interface RequestOptions extends RequestInit {
  json?: any;
}

function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function setToken(token?: string | null) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  } catch {}
}

async function request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { json, headers, ...rest } = options;
  const token = getToken();

  const config: RequestInit = {
    method: rest.method || 'GET',
    // Remove credentials: 'include' - use pure JWT
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
    ...(json !== undefined ? { body: JSON.stringify(json) } : {}),
    ...rest,
  };

  console.log(`🔄 JWT API Request: ${endpoint}`, token ? 'with token' : 'no token');

  const res = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await res.json().catch(() => ({}));

  if (res.status === 401) {
    // Token invalid or expired, clear it
    console.log('🚫 401 - Token invalid, clearing localStorage');
    setToken(null);
    
    // Only redirect to login if not already on login page
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }

  if (!res.ok) {
    const message = (data && (data.message || data.error)) || `${res.status} ${res.statusText}`;
    throw new Error(message);
  }
  return data as T;
}

// Auth API
export const api = {
  login: async (address: string, password: string) => {
    const result = await request<{ 
      success: boolean; 
      token?: string; 
      user?: { id: string; address: string; token?: string }; 
      message?: string;
    }>('/login', { method: 'POST', json: { address, password } });
    
    // Extract and store JWT token from response
    const token = result.token || result.user?.token;
    if (token && result.success) {
      console.log('✅ Login successful, storing JWT token');
      setToken(token);
    }
    
    return result;
  },

  // Remove /me endpoint - not available in the API specification
  
  logout: async () => {
    try {
      await request('/logout', { method: 'POST' });
    } catch (error) {
      console.warn('Logout request failed:', error);
    } finally {
      console.log('🚪 Logging out - clearing token');
      setToken(null);
    }
  },

  // Messages
  getMessages: () => request<{ success: boolean; messages: any[] }>('/messages-working'),
  getMessage: (id: string) => request(`/messages/${id}`),
  extractOTP: (messageId: string) => request(`/otp?messageId=${encodeURIComponent(messageId)}`),

  // Token helpers
  getToken,
  setToken,
  isAuthenticated: () => !!getToken(),
};

export default api;
