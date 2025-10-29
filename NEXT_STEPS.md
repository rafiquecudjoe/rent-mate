# 🚀 RentMate - Multi-Tenant SaaS Implementation Guide

## Current Status ✅

Your RentMate application is now configured as a **B2B SaaS platform** with:
- ✅ Landlord-only registration
- ✅ Tenant invitation system messaging
- ✅ Business-focused landing page
- ✅ Clean authentication flow

## Architecture Overview

```
www.rentmate.com              → Marketing & Registration
[company].rentmate.com        → Property Owner's Portal
  ├─ Landlord Dashboard       → Property Management
  └─ /tenant/*                → Tenant Portal (for their tenants)
```

---

## 📋 Implementation Roadmap

### **Phase 1: Backend Foundation** (Week 1-2)

#### 1.1 Database Schema Updates

**Add Multi-Tenant Support:**

```sql
-- Add tenant/organization table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subdomain VARCHAR(63) UNIQUE NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  owner_email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  plan_type VARCHAR(50) DEFAULT 'free', -- free, pro, enterprise
  is_active BOOLEAN DEFAULT true,
  custom_domain VARCHAR(255), -- for future custom domain support
  logo_url TEXT,
  primary_color VARCHAR(7) DEFAULT '#2563eb'
);

-- Add organization_id to all relevant tables
ALTER TABLE users ADD COLUMN organization_id UUID REFERENCES organizations(id);
ALTER TABLE properties ADD COLUMN organization_id UUID REFERENCES organizations(id);
ALTER TABLE tenants ADD COLUMN organization_id UUID REFERENCES organizations(id);
ALTER TABLE leases ADD COLUMN organization_id UUID REFERENCES organizations(id);
ALTER TABLE payments ADD COLUMN organization_id UUID REFERENCES organizations(id);
ALTER TABLE maintenance_requests ADD COLUMN organization_id UUID REFERENCES organizations(id);

-- Add indexes for performance
CREATE INDEX idx_users_org ON users(organization_id);
CREATE INDEX idx_properties_org ON properties(organization_id);
CREATE INDEX idx_tenants_org ON tenants(organization_id);

-- Add invitation tokens table
CREATE TABLE invitation_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) NOT NULL,
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) UNIQUE NOT NULL,
  tenant_id UUID, -- populated after tenant record created
  role VARCHAR(50) DEFAULT 'tenant',
  expires_at TIMESTAMP NOT NULL,
  used_at TIMESTAMP,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 1.2 Supabase Configuration

**Update `supabase/config.toml`:**

```toml
[auth]
site_url = "https://www.rentmate.com"
additional_redirect_urls = ["https://*.rentmate.com"]

[auth.email]
enable_signup = true
double_confirm_changes = true
enable_confirmations = true
```

**Set up Row Level Security (RLS):**

```sql
-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access data from their organization
CREATE POLICY org_isolation_policy ON properties
  FOR ALL USING (
    organization_id = (
      SELECT organization_id FROM users 
      WHERE users.id = auth.uid()
    )
  );

-- Repeat similar policies for all tables
```

---

### **Phase 2: Subdomain Detection & Routing** (Week 2-3)

#### 2.1 Frontend Subdomain Detection

**Create `src/utils/subdomain.ts`:**

```typescript
export const getSubdomain = (): string | null => {
  const hostname = window.location.hostname;
  
  // Local development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    // Use query param for testing: ?subdomain=acmehomes
    const params = new URLSearchParams(window.location.search);
    return params.get('subdomain');
  }
  
  // Production: Extract subdomain from hostname
  const parts = hostname.split('.');
  
  // If it's the main domain (www.rentmate.com or rentmate.com)
  if (parts.length < 3 || parts[0] === 'www') {
    return null;
  }
  
  // Return subdomain (acmehomes.rentmate.com → acmehomes)
  return parts[0];
};

export const isMainDomain = (): boolean => {
  return getSubdomain() === null;
};

export const getOrganizationFromSubdomain = async (subdomain: string) => {
  const { data, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('subdomain', subdomain)
    .eq('is_active', true)
    .single();
  
  if (error) throw error;
  return data;
};
```

#### 2.2 Update App.tsx with Subdomain Logic

**Add to `src/App.tsx`:**

```typescript
import { useEffect, useState } from 'react';
import { getSubdomain, isMainDomain, getOrganizationFromSubdomain } from './utils/subdomain';

function App() {
  const [subdomain, setSubdomain] = useState<string | null>(null);
  const [organization, setOrganization] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      const currentSubdomain = getSubdomain();
      setSubdomain(currentSubdomain);
      
      if (currentSubdomain) {
        try {
          const org = await getOrganizationFromSubdomain(currentSubdomain);
          setOrganization(org);
          
          // Apply custom branding
          document.documentElement.style.setProperty('--primary-color', org.primary_color);
          if (org.logo_url) {
            // Update favicon and logo
          }
        } catch (error) {
          console.error('Organization not found:', error);
          // Redirect to main domain or show 404
          window.location.href = 'https://www.rentmate.com';
        }
      }
      
      setLoading(false);
    };
    
    initializeApp();
  }, []);

  // Show landing page only on main domain
  if (isMainDomain() && currentView === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} onSignIn={handleSignIn} />;
  }
  
  // On subdomain, skip landing and go straight to auth/app
  // ... rest of your existing logic
}
```

---

### **Phase 3: Tenant Invitation System** (Week 3-4)

#### 3.1 Create Invitation API Endpoint

**Create `src/api/invitations.ts`:**

```typescript
import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

export const sendTenantInvitation = async (
  organizationId: string,
  tenantEmail: string,
  landlordId: string,
  tenantData: {
    firstName: string;
    lastName: string;
    propertyId: string;
    unitId?: string;
  }
) => {
  // Generate secure token
  const token = uuidv4();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry
  
  // Insert invitation
  const { data: invitation, error } = await supabase
    .from('invitation_tokens')
    .insert({
      organization_id: organizationId,
      email: tenantEmail,
      token,
      expires_at: expiresAt.toISOString(),
      created_by: landlordId
    })
    .select()
    .single();
  
  if (error) throw error;
  
  // Get organization details
  const { data: org } = await supabase
    .from('organizations')
    .select('subdomain, company_name')
    .eq('id', organizationId)
    .single();
  
  // Send email via your email service (SendGrid, Resend, etc.)
  const invitationLink = `https://${org.subdomain}.rentmate.com/tenant/accept-invitation?token=${token}`;
  
  await sendEmail({
    to: tenantEmail,
    subject: `Invitation to join ${org.company_name} on RentMate`,
    html: `
      <h2>Welcome to ${org.company_name}!</h2>
      <p>You've been invited to access your tenant portal.</p>
      <p><strong>Property:</strong> ${tenantData.propertyId}</p>
      <a href="${invitationLink}">Accept Invitation</a>
      <p>This link expires in 7 days.</p>
    `
  });
  
  return invitation;
};
```

#### 3.2 Create Tenant Onboarding Page

**Create `src/pages/TenantOnboarding.tsx`:**

```typescript
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../api/supabase';

export default function TenantOnboarding() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [invitation, setInvitation] = useState<any>(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        // Show error
        return;
      }
      
      const { data, error } = await supabase
        .from('invitation_tokens')
        .select('*, organizations(*)')
        .eq('token', token)
        .is('used_at', null)
        .gt('expires_at', new Date().toISOString())
        .single();
      
      if (error || !data) {
        // Show expired or invalid token message
        return;
      }
      
      setInvitation(data);
      setLoading(false);
    };
    
    validateToken();
  }, [token]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create user account with Supabase Auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: invitation.email,
      password,
      options: {
        data: {
          role: 'tenant',
          organization_id: invitation.organization_id
        }
      }
    });
    
    if (signUpError) {
      // Handle error
      return;
    }
    
    // Mark invitation as used
    await supabase
      .from('invitation_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('token', token);
    
    // Create tenant record
    await supabase
      .from('tenants')
      .insert({
        user_id: authData.user!.id,
        organization_id: invitation.organization_id,
        email: invitation.email,
        // ... other tenant data
      });
    
    // Redirect to tenant dashboard
    window.location.href = '/tenant/dashboard';
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Complete Your Setup</h2>
        <p className="text-gray-600 mb-6">
          Set a password to access your tenant portal at {invitation?.organizations?.company_name}
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              value={invitation?.email || ''} 
              disabled 
              className="w-full p-3 border rounded-lg bg-gray-50"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Create Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="••••••••"
              required
              minLength={8}
            />
          </div>
          
          <button 
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Complete Setup & Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
```

---

### **Phase 4: Registration Flow Update** (Week 4)

#### 4.1 Update Registration to Create Organization

**Update `src/pages/Register.tsx` handleSubmit:**

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    // 1. Sign up user with Supabase Auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          phone: formData.phone,
          role: 'landlord'
        }
      }
    });
    
    if (signUpError) throw signUpError;
    
    // 2. Generate subdomain from company name
    const subdomain = formData.companyName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 63);
    
    // Check if subdomain is available
    const { data: existing } = await supabase
      .from('organizations')
      .select('subdomain')
      .eq('subdomain', subdomain)
      .single();
    
    if (existing) {
      // Subdomain taken, add random suffix
      subdomain = `${subdomain}-${Math.floor(Math.random() * 1000)}`;
    }
    
    // 3. Create organization
    const { data: org, error: orgError } = await supabase
      .from('organizations')
      .insert({
        subdomain,
        company_name: formData.companyName,
        owner_email: formData.email
      })
      .select()
      .single();
    
    if (orgError) throw orgError;
    
    // 4. Update user with organization_id
    await supabase
      .from('users')
      .update({ organization_id: org.id })
      .eq('id', authData.user!.id);
    
    // 5. Redirect to their subdomain
    window.location.href = `https://${subdomain}.rentmate.com/dashboard?welcome=true`;
    
  } catch (error) {
    console.error('Registration error:', error);
    // Show error message to user
  }
};
```

---

### **Phase 5: Deployment Setup** (Week 5)

#### 5.1 DNS Configuration

**Add Wildcard DNS Record:**

```
Type: A or CNAME
Name: *.rentmate.com
Value: Your server IP or hosting provider
TTL: 3600
```

#### 5.2 SSL Certificate

**For Vercel/Netlify:**
- They handle wildcard SSL automatically
- Just add `*.rentmate.com` to your domains

**For Custom Hosting:**
```bash
# Using Let's Encrypt with Certbot
sudo certbot certonly --manual \
  --preferred-challenges=dns \
  --email your@email.com \
  --agree-tos \
  -d rentmate.com \
  -d *.rentmate.com
```

#### 5.3 Environment Variables

**Add to `.env.production`:**

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_MAIN_DOMAIN=rentmate.com
VITE_API_URL=https://api.rentmate.com
VITE_EMAIL_SERVICE_KEY=your_email_service_key
```

#### 5.4 Deployment Platforms

**Option A: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Add domains in Vercel dashboard:
# - www.rentmate.com
# - *.rentmate.com
```

**Option B: Netlify**
```bash
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### **Phase 6: Testing & QA** (Week 6)

#### 6.1 Test Scenarios

- [ ] Main domain landing page loads correctly
- [ ] Landlord registration creates organization and subdomain
- [ ] Subdomain redirects to correct organization
- [ ] Tenant invitation email sent successfully
- [ ] Tenant can accept invitation and set password
- [ ] Tenant can only see their organization's data
- [ ] Landlord can only see their organization's data
- [ ] Custom branding applies per subdomain
- [ ] Invalid subdomains redirect to main domain
- [ ] Expired invitation tokens show error

#### 6.2 Local Testing with Subdomains

**Update `/etc/hosts` (macOS/Linux):**
```
127.0.0.1 acmehomes.localhost
127.0.0.1 testcompany.localhost
```

**Or use query parameters:**
```
http://localhost:5174?subdomain=acmehomes
```

---

## 📊 Success Metrics

Track these KPIs after launch:
- Number of organizations registered
- Tenant invitation acceptance rate
- Average time to onboard first tenant
- Subdomain creation success rate
- User retention per organization

---

## 🔒 Security Checklist

- [ ] All database tables have RLS policies
- [ ] API endpoints validate organization_id
- [ ] Invitation tokens expire after 7 days
- [ ] Password reset scoped to organization
- [ ] File uploads scoped to organization
- [ ] Audit logs track cross-tenant access attempts
- [ ] Rate limiting on invitation emails
- [ ] CAPTCHA on registration

---

## 📚 Additional Features to Consider

### Phase 7+ (Future Enhancements)

1. **Custom Domains**
   - Allow `properties.acmehomes.com` instead of `acmehomes.rentmate.com`

2. **White Labeling**
   - Custom logos, colors, email templates per org

3. **Team Management**
   - Multiple landlord users per organization
   - Role-based permissions (admin, manager, viewer)

4. **Billing Integration**
   - Stripe for subscription management
   - Usage-based pricing (per property or tenant)

5. **Mobile Apps**
   - React Native apps with same subdomain logic

6. **Analytics Dashboard**
   - Org-level metrics and insights
   - Tenant engagement tracking

---

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Test with subdomain simulation
npm run dev -- --host

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm run test

# Database migrations
npx supabase db push

# Generate TypeScript types from Supabase
npx supabase gen types typescript --project-id your-project-id > src/types/database.ts
```

---

## 📞 Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Multi-tenant Guide**: https://supabase.com/docs/guides/auth/multi-tenant
- **Wildcard SSL**: https://letsencrypt.org/docs/
- **Subdomain Routing**: Your hosting provider's docs

---

## ✅ Completion Checklist

- [ ] Phase 1: Database schema updated
- [ ] Phase 2: Subdomain detection working
- [ ] Phase 3: Tenant invitation system implemented
- [ ] Phase 4: Registration creates organizations
- [ ] Phase 5: Production deployment configured
- [ ] Phase 6: All tests passing
- [ ] Documentation updated
- [ ] Team trained on new architecture

---

**Created**: October 28, 2025  
**Last Updated**: October 28, 2025  
**Version**: 1.0

Good luck with your implementation! 🚀
