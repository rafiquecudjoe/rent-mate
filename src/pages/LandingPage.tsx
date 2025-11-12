import { Building2, Home, User, CreditCard, FileText, Shield, Bell, MessageSquare, TrendingUp, CheckCircle, Star, Mail, Phone, Facebook, Twitter, Linkedin, Instagram, ArrowRight, Zap, BarChart3, Users, Sparkles, Clock, Lock, Award, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LandingPageProps {
  onGetStarted: (role: 'landlord' | 'tenant') => void;
  onSignIn: () => void;
}

function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center transition-colors duration-300 ${scrollY > 50 ? 'bg-[#5a6fd8]' : 'bg-white/20 backdrop-blur-sm'}`}>
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className={`text-[20px] md:text-[22px] font-bold transition-colors duration-300 ${scrollY > 50 ? 'text-[#11142d]' : 'text-white'}`}>RentMate</span>
            </div>
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <a href="#features" className={`text-[13px] md:text-[14px] font-medium transition-colors duration-300 hover:text-[#5a6fd8] ${scrollY > 50 ? 'text-[#808191]' : 'text-white/90'}`}>Features</a>
              <a href="#how-it-works" className={`text-[13px] md:text-[14px] font-medium transition-colors duration-300 hover:text-[#5a6fd8] ${scrollY > 50 ? 'text-[#808191]' : 'text-white/90'}`}>How It Works</a>
              <a href="#pricing" className={`text-[13px] md:text-[14px] font-medium transition-colors duration-300 hover:text-[#5a6fd8] ${scrollY > 50 ? 'text-[#808191]' : 'text-white/90'}`}>Pricing</a>
              <button onClick={onSignIn} className={`text-[13px] md:text-[14px] font-medium transition-colors duration-300 ${scrollY > 50 ? 'text-[#5a6fd8] hover:text-[#3d4ec4]' : 'text-white hover:text-white/80'}`}>Sign In</button>
              <button onClick={() => onGetStarted('landlord')} className="px-5 py-2.5 bg-[#7fba7a] hover:bg-[#6fa869] text-white text-[13px] md:text-[14px] font-semibold rounded-[10px] transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Modern Gradient with Dashboard Colors */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#5a6fd8] via-[#5a6ce8] to-[#8b7ae0]">
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
          {/* Animated Shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-[20px] blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#7fba7a]/20 rounded-[30px] blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-[12px] md:text-[13px] font-medium text-white">Trusted by 1,000+ Property Managers</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[68px] font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Property Management
              <br />
              <span className="bg-gradient-to-r from-[#7fba7a] via-[#7fba7a] to-[#9ed49a] bg-clip-text text-transparent">Made Simple</span>
            </h1>
            
            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Streamline your rental business with our all-in-one platform. Manage properties, collect payments, and communicate with tenants—all in one beautiful dashboard.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button onClick={() => onGetStarted('landlord')} className="group px-8 py-4 bg-white text-[#5a6fd8] rounded-[12px] hover:bg-[#fafafa] hover:scale-105 transition-all duration-200 shadow-2xl text-[15px] md:text-[16px] font-semibold flex items-center justify-center gap-3">
                <Building2 className="w-5 h-5" />
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button onClick={onSignIn} className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-[12px] hover:bg-white/20 hover:scale-105 transition-all duration-200 text-[15px] md:text-[16px] font-semibold flex items-center justify-center gap-3">
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[15px] p-6 hover:bg-white/15 transition-all duration-300">
                <div className="text-[32px] md:text-[40px] font-bold text-white mb-1">1,000+</div>
                <div className="text-[13px] md:text-[14px] text-white/80 font-medium">Active Properties</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[15px] p-6 hover:bg-white/15 transition-all duration-300">
                <div className="text-[32px] md:text-[40px] font-bold text-white mb-1">$2.4M+</div>
                <div className="text-[13px] md:text-[14px] text-white/80 font-medium">Monthly Rent Collected</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-[15px] p-6 hover:bg-white/15 transition-all duration-300">
                <div className="text-[32px] md:text-[40px] font-bold text-white mb-1">99.2%</div>
                <div className="text-[13px] md:text-[14px] text-white/80 font-medium">On-Time Payments</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#fafafa]" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}></div>
      </section>

      {/* Features Section - Dashboard Design System */}
      <section id="features" className="py-16 md:py-24 bg-[#fafafa]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5a6fd8]/10 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-[#5a6fd8]" />
              <span className="text-[12px] md:text-[13px] font-semibold text-[#5a6fd8]">Features</span>
            </div>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-[#11142d] mb-4">Everything You Need in One Place</h2>
            <p className="text-[15px] md:text-[16px] text-[#808191] max-w-2xl mx-auto">Powerful tools designed for modern property management</p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* For Landlords Card */}
            <div className="bg-[#fcfcfc] rounded-[15px] md:rounded-[20px] p-6 md:p-8 border border-[#e4e8ef] hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#5a6fd8]/10 rounded-[12px] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-6 h-6 md:w-7 md:h-7 text-[#5a6fd8]" />
                </div>
                <h3 className="text-[22px] md:text-[26px] font-bold text-[#11142d]">For Landlords</h3>
              </div>
              <p className="text-[16px] md:text-[18px] text-[#5a6fd8] font-semibold mb-8">Effortless Property Management</p>

              <div className="space-y-5">
                <div className="flex items-start gap-4 group/item">
                  <div className="w-10 h-10 bg-[#5a6fd8]/10 rounded-[10px] flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#5a6fd8] transition-colors duration-300">
                    <Home className="w-5 h-5 text-[#5a6fd8] group-hover/item:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] md:text-[15px] font-semibold text-[#11142d] mb-1">Portfolio Management</h4>
                    <p className="text-[13px] md:text-[14px] text-[#808191] leading-relaxed">Manage all properties, units, and leases from one intuitive dashboard</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group/item">
                  <div className="w-10 h-10 bg-[#7fba7a]/10 rounded-[10px] flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#7fba7a] transition-colors duration-300">
                    <CreditCard className="w-5 h-5 text-[#7fba7a] group-hover/item:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] md:text-[15px] font-semibold text-[#11142d] mb-1">Automated Rent Collection</h4>
                    <p className="text-[13px] md:text-[14px] text-[#808191] leading-relaxed">Set up automatic payments and track rent collection in real-time</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group/item">
                  <div className="w-10 h-10 bg-[#8b7ae0]/10 rounded-[10px] flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#8b7ae0] transition-colors duration-300">
                    <FileText className="w-5 h-5 text-[#8b7ae0] group-hover/item:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] md:text-[15px] font-semibold text-[#11142d] mb-1">Digital Lease Management</h4>
                    <p className="text-[13px] md:text-[14px] text-[#808191] leading-relaxed">Create, sign, and store leases electronically with full compliance</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group/item">
                  <div className="w-10 h-10 bg-[#f5a962]/10 rounded-[10px] flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#f5a962] transition-colors duration-300">
                    <BarChart3 className="w-5 h-5 text-[#f5a962] group-hover/item:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] md:text-[15px] font-semibold text-[#11142d] mb-1">Financial Analytics</h4>
                    <p className="text-[13px] md:text-[14px] text-[#808191] leading-relaxed">Track income, expenses, and generate comprehensive reports</p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Tenants Card */}
            <div className="bg-[#fcfcfc] rounded-[15px] md:rounded-[20px] p-6 md:p-8 border border-[#e4e8ef] hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#7fba7a]/10 rounded-[12px] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <User className="w-6 h-6 md:w-7 md:h-7 text-[#7fba7a]" />
                </div>
                <h3 className="text-[22px] md:text-[26px] font-bold text-[#11142d]">For Tenants</h3>
              </div>
              <p className="text-[16px] md:text-[18px] text-[#7fba7a] font-semibold mb-8">Streamlined Rental Experience</p>

              <div className="space-y-5">
                <div className="flex items-start gap-4 group/item">
                  <div className="w-10 h-10 bg-[#7fba7a]/10 rounded-[10px] flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#7fba7a] transition-colors duration-300">
                    <CreditCard className="w-5 h-5 text-[#7fba7a] group-hover/item:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] md:text-[15px] font-semibold text-[#11142d] mb-1">Easy Online Payments</h4>
                    <p className="text-[13px] md:text-[14px] text-[#808191] leading-relaxed">Pay rent securely online with automatic reminders and history</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group/item">
                  <div className="w-10 h-10 bg-[#f5a962]/10 rounded-[10px] flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#f5a962] transition-colors duration-300">
                    <Bell className="w-5 h-5 text-[#f5a962] group-hover/item:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] md:text-[15px] font-semibold text-[#11142d] mb-1">Maintenance Requests</h4>
                    <p className="text-[13px] md:text-[14px] text-[#808191] leading-relaxed">Submit and track maintenance issues with real-time updates</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group/item">
                  <div className="w-10 h-10 bg-[#5a6fd8]/10 rounded-[10px] flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#5a6fd8] transition-colors duration-300">
                    <MessageSquare className="w-5 h-5 text-[#5a6fd8] group-hover/item:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] md:text-[15px] font-semibold text-[#11142d] mb-1">Direct Communication</h4>
                    <p className="text-[13px] md:text-[14px] text-[#808191] leading-relaxed">Message your landlord and get quick responses instantly</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group/item">
                  <div className="w-10 h-10 bg-[#8b7ae0]/10 rounded-[10px] flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#8b7ae0] transition-colors duration-300">
                    <FileText className="w-5 h-5 text-[#8b7ae0] group-hover/item:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[14px] md:text-[15px] font-semibold text-[#11142d] mb-1">Document Access</h4>
                    <p className="text-[13px] md:text-[14px] text-[#808191] leading-relaxed">Access lease, receipts, and important documents anytime</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7fba7a]/10 rounded-full mb-4">
              <Clock className="w-4 h-4 text-[#7fba7a]" />
              <span className="text-[12px] md:text-[13px] font-semibold text-[#7fba7a]">Quick Setup</span>
            </div>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-[#11142d] mb-4">How It Works</h2>
            <p className="text-[15px] md:text-[16px] text-[#808191] max-w-2xl mx-auto">Get started in minutes with our simple process</p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="bg-[#fcfcfc] rounded-[15px] md:rounded-[20px] p-6 md:p-8 border border-[#e4e8ef] hover:shadow-xl transition-all duration-300 text-center">
                {/* Number Badge */}
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#5a6fd8] to-[#6c7ce8] text-white rounded-[12px] text-[24px] md:text-[28px] font-bold mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-[#11142d] mb-3">Sign Up</h3>
                <p className="text-[13px] md:text-[14px] text-[#808191] leading-relaxed">Create your account as a landlord or tenant in under 2 minutes</p>
              </div>
              {/* Connection Line */}
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#e4e8ef]"></div>
            </div>

            {/* Step 2 */}
            <div className="relative group">
              <div className="bg-[#fcfcfc] rounded-[15px] md:rounded-[20px] p-6 md:p-8 border border-[#e4e8ef] hover:shadow-xl transition-all duration-300 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#7fba7a] to-[#9ed49a] text-white rounded-[12px] text-[24px] md:text-[28px] font-bold mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-[#11142d] mb-3">Set Up Profile</h3>
                <p className="text-[13px] md:text-[14px] text-[#808191] leading-relaxed">Add properties or connect with your landlord to access your rental</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-[#e4e8ef]"></div>
            </div>

            {/* Step 3 */}
            <div className="group">
              <div className="bg-[#fcfcfc] rounded-[15px] md:rounded-[20px] p-6 md:p-8 border border-[#e4e8ef] hover:shadow-xl transition-all duration-300 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#8b7ae0] to-[#9b7dff] text-white rounded-[12px] text-[24px] md:text-[28px] font-bold mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <h3 className="text-[18px] md:text-[20px] font-bold text-[#11142d] mb-3">Manage with Ease</h3>
                <p className="text-[13px] md:text-[14px] text-[#808191] leading-relaxed">Handle payments, maintenance, and communication in one place</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-[#fafafa]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#5a6fd8]/10 rounded-full mb-4">
              <Award className="w-4 h-4 text-[#5a6fd8]" />
              <span className="text-[12px] md:text-[13px] font-semibold text-[#5a6fd8]">Why Choose Us</span>
            </div>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-[#11142d] mb-4">Why Choose RentMate?</h2>
            <p className="text-[15px] md:text-[16px] text-[#808191] max-w-3xl mx-auto">Built with modern technology for today's rental market</p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Benefit 1 - Security */}
            <div className="bg-[#fcfcfc] rounded-[15px] md:rounded-[20px] p-6 md:p-8 border border-[#e4e8ef] hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#5a6fd8]/10 rounded-[12px] mb-6 group-hover:bg-[#5a6fd8] transition-colors duration-300">
                <Shield className="w-6 h-6 md:w-7 md:h-7 text-[#5a6fd8] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] mb-3">Bank-Level Security</h3>
              <p className="text-[13px] md:text-[14px] text-[#808191] leading-relaxed">Your data is encrypted and protected with industry-leading security</p>
            </div>

            {/* Benefit 2 - Speed */}
            <div className="bg-[#fcfcfc] rounded-[15px] md:rounded-[20px] p-6 md:p-8 border border-[#e4e8ef] hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#7fba7a]/10 rounded-[12px] mb-6 group-hover:bg-[#7fba7a] transition-colors duration-300">
                <Zap className="w-6 h-6 md:w-7 md:h-7 text-[#7fba7a] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] mb-3">Lightning Fast</h3>
              <p className="text-[13px] md:text-[14px] text-[#808191] leading-relaxed">Optimized performance ensures quick loading and smooth operations</p>
            </div>

            {/* Benefit 3 - Support */}
            <div className="bg-[#fcfcfc] rounded-[15px] md:rounded-[20px] p-6 md:p-8 border border-[#e4e8ef] hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#8b7ae0]/10 rounded-[12px] mb-6 group-hover:bg-[#8b7ae0] transition-colors duration-300">
                <Users className="w-6 h-6 md:w-7 md:h-7 text-[#8b7ae0] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] mb-3">24/7 Support</h3>
              <p className="text-[13px] md:text-[14px] text-[#808191] leading-relaxed">Our dedicated support team is always here to help you succeed</p>
            </div>

            {/* Benefit 4 - Growth */}
            <div className="bg-[#fcfcfc] rounded-[15px] md:rounded-[20px] p-6 md:p-8 border border-[#e4e8ef] hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-[#f5a962]/10 rounded-[12px] mb-6 group-hover:bg-[#f5a962] transition-colors duration-300">
                <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-[#f5a962] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] mb-3">Always Improving</h3>
              <p className="text-[13px] md:text-[14px] text-[#808191] leading-relaxed">Regular updates with new features based on user feedback</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f5a962]/10 rounded-full mb-4">
              <Star className="w-4 h-4 text-[#f5a962]" />
              <span className="text-[12px] md:text-[13px] font-semibold text-[#f5a962]">Testimonials</span>
            </div>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-[#11142d] mb-4">What Our Users Say</h2>
            <p className="text-[15px] md:text-[16px] text-[#808191] max-w-2xl mx-auto">Join thousands of satisfied landlords and tenants</p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Testimonial 1 */}
            <div className="bg-[#fcfcfc] rounded-[15px] md:rounded-[20px] p-6 md:p-8 border border-[#e4e8ef] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-[#f5a962] fill-current" />
                ))}
              </div>
              <p className="text-[13px] md:text-[14px] text-[#808191] mb-6 leading-relaxed">"This platform has transformed how I manage my properties. The automated rent collection alone has saved me countless hours!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#5a6fd8] to-[#6c7ce8] rounded-full flex items-center justify-center text-white text-[13px] md:text-[14px] font-bold">JD</div>
                <div>
                  <div className="text-[14px] md:text-[15px] font-semibold text-[#11142d]">John Doe</div>
                  <div className="text-[12px] md:text-[13px] text-[#808191]">Property Owner</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#fcfcfc] rounded-[15px] md:rounded-[20px] p-6 md:p-8 border border-[#e4e8ef] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-[#f5a962] fill-current" />
                ))}
              </div>
              <p className="text-[13px] md:text-[14px] text-[#808191] mb-6 leading-relaxed">"As a tenant, I love being able to pay rent and submit maintenance requests so easily. Communication with my landlord has never been better."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#7fba7a] to-[#9ed49a] rounded-full flex items-center justify-center text-white text-[13px] md:text-[14px] font-bold">SS</div>
                <div>
                  <div className="text-[14px] md:text-[15px] font-semibold text-[#11142d]">Sarah Smith</div>
                  <div className="text-[12px] md:text-[13px] text-[#808191]">Tenant</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#fcfcfc] rounded-[15px] md:rounded-[20px] p-6 md:p-8 border border-[#e4e8ef] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-[#f5a962] fill-current" />
                ))}
              </div>
              <p className="text-[13px] md:text-[14px] text-[#808191] mb-6 leading-relaxed">"The financial reporting features give me clear insights into my rental income. It's made tax season so much easier!"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#8b7ae0] to-[#9b7dff] rounded-full flex items-center justify-center text-white text-[13px] md:text-[14px] font-bold">MJ</div>
                <div>
                  <div className="text-[14px] md:text-[15px] font-semibold text-[#11142d]">Mike Johnson</div>
                  <div className="text-[12px] md:text-[13px] text-[#808191]">Portfolio Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-[#fafafa]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#7fba7a]/10 rounded-full mb-4">
              <DollarSign className="w-4 h-4 text-[#7fba7a]" />
              <span className="text-[12px] md:text-[13px] font-semibold text-[#7fba7a]">Pricing Plans</span>
            </div>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-bold text-[#11142d] mb-4">Simple, Transparent Pricing</h2>
            <p className="text-[15px] md:text-[16px] text-[#808191] max-w-2xl mx-auto">Choose the plan that works best for you</p>
          </div>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-[1200px] mx-auto">
            {/* Starter Plan */}
            <div className="bg-[#fcfcfc] rounded-[15px] md:rounded-[20px] p-6 md:p-8 border border-[#e4e8ef] hover:shadow-xl transition-all duration-300">
              <h3 className="text-[20px] md:text-[22px] font-bold text-[#11142d] mb-2">Starter</h3>
              <div className="text-[42px] md:text-[48px] font-bold text-[#11142d] mb-1">
                Free
              </div>
              <p className="text-[13px] md:text-[14px] text-[#808191] mb-6 md:mb-8">Perfect for getting started</p>
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#7fba7a] flex-shrink-0" />
                  <span className="text-[13px] md:text-[14px] text-[#808191]">Up to 3 properties</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#7fba7a] flex-shrink-0" />
                  <span className="text-[13px] md:text-[14px] text-[#808191]">Basic rent collection</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#7fba7a] flex-shrink-0" />
                  <span className="text-[13px] md:text-[14px] text-[#808191]">Tenant portal</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#7fba7a] flex-shrink-0" />
                  <span className="text-[13px] md:text-[14px] text-[#808191]">Email support</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-[#fafafa] text-[#11142d] rounded-[10px] hover:bg-[#e4e8ef] transition-colors duration-200 text-[13px] md:text-[14px] font-semibold">
                Get Started Free
              </button>
            </div>

            {/* Professional Plan */}
            <div className="bg-gradient-to-br from-[#5a6fd8] to-[#5a6ce8] rounded-[15px] md:rounded-[20px] p-6 md:p-8 shadow-2xl transform scale-100 md:scale-105 relative border border-[#5a6fd8]">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#7fba7a] text-white px-4 py-1 rounded-full text-[11px] md:text-[12px] font-semibold shadow-lg">
                Most Popular
              </div>
              <h3 className="text-[20px] md:text-[22px] font-bold text-white mb-2">Professional</h3>
              <div className="text-[42px] md:text-[48px] font-bold text-white mb-1">
                $49
                <span className="text-[18px] md:text-[20px] font-normal">/mo</span>
              </div>
              <p className="text-[13px] md:text-[14px] text-white/80 mb-6 md:mb-8">For growing portfolios</p>
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#7fba7a] flex-shrink-0" />
                  <span className="text-[13px] md:text-[14px] text-white">Unlimited properties</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#7fba7a] flex-shrink-0" />
                  <span className="text-[13px] md:text-[14px] text-white">Automated rent collection</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#7fba7a] flex-shrink-0" />
                  <span className="text-[13px] md:text-[14px] text-white">Advanced analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#7fba7a] flex-shrink-0" />
                  <span className="text-[13px] md:text-[14px] text-white">Priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#7fba7a] flex-shrink-0" />
                  <span className="text-[13px] md:text-[14px] text-white">Maintenance tracking</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-white text-[#5a6fd8] rounded-[10px] hover:bg-white/90 transition-colors duration-200 text-[13px] md:text-[14px] font-semibold shadow-lg">
                Start Free Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-[#fcfcfc] rounded-[15px] md:rounded-[20px] p-6 md:p-8 border border-[#e4e8ef] hover:shadow-xl transition-all duration-300">
              <h3 className="text-[20px] md:text-[22px] font-bold text-[#11142d] mb-2">Enterprise</h3>
              <div className="text-[42px] md:text-[48px] font-bold text-[#11142d] mb-1">
                Custom
              </div>
              <p className="text-[13px] md:text-[14px] text-[#808191] mb-6 md:mb-8">For large property managers</p>
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#7fba7a] flex-shrink-0" />
                  <span className="text-[13px] md:text-[14px] text-[#808191]">Everything in Pro</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#7fba7a] flex-shrink-0" />
                  <span className="text-[13px] md:text-[14px] text-[#808191]">Team collaboration</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#7fba7a] flex-shrink-0" />
                  <span className="text-[13px] md:text-[14px] text-[#808191]">Custom integrations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-[#7fba7a] flex-shrink-0" />
                  <span className="text-[13px] md:text-[14px] text-[#808191]">Dedicated account manager</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-[#11142d] text-white rounded-[10px] hover:bg-[#11142d]/90 transition-colors duration-200 text-[13px] md:text-[14px] font-semibold">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#5a6fd8] via-[#5a6ce8] to-[#8b7ae0] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
        {/* Animated Shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#7fba7a]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-bold text-white mb-4 md:mb-6">Ready to Get Started?</h2>
          <p className="text-[16px] md:text-[18px] lg:text-[20px] text-white/90 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of landlords and tenants who are already using RentMate to simplify their rental experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onGetStarted('landlord')} className="group px-6 md:px-8 py-3 md:py-4 bg-white text-[#5a6fd8] rounded-[12px] hover:bg-white/95 hover:scale-105 transition-all duration-200 shadow-2xl text-[14px] md:text-[16px] font-semibold flex items-center justify-center gap-2">
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button onClick={onSignIn} className="px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-[12px] hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-200 text-[14px] md:text-[16px] font-semibold">
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#11142d] text-white py-12 md:py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-12">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 bg-[#5a6fd8] rounded-[8px]">
                  <Building2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <span className="text-[18px] md:text-[20px] font-bold text-white">RentMate</span>
              </div>
              <p className="text-[13px] md:text-[14px] text-[#92939e] mb-4 leading-relaxed">Simplifying property management for landlords and tenants.</p>
              <div className="flex gap-3">
                <a href="#" className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#1a1d1f] text-[#92939e] hover:bg-[#5a6fd8] hover:text-white transition-all duration-200">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#1a1d1f] text-[#92939e] hover:bg-[#5a6fd8] hover:text-white transition-all duration-200">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#1a1d1f] text-[#92939e] hover:bg-[#5a6fd8] hover:text-white transition-all duration-200">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="flex items-center justify-center w-9 h-9 rounded-[8px] bg-[#1a1d1f] text-[#92939e] hover:bg-[#5a6fd8] hover:text-white transition-all duration-200">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="text-[15px] md:text-[16px] font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2.5">
                <li><a href="#features" className="text-[13px] md:text-[14px] text-[#92939e] hover:text-[#5a6fd8] transition-colors duration-200">Features</a></li>
                <li><a href="#pricing" className="text-[13px] md:text-[14px] text-[#92939e] hover:text-[#5a6fd8] transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="text-[13px] md:text-[14px] text-[#92939e] hover:text-[#5a6fd8] transition-colors duration-200">Security</a></li>
                <li><a href="#" className="text-[13px] md:text-[14px] text-[#92939e] hover:text-[#5a6fd8] transition-colors duration-200">Updates</a></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="text-[15px] md:text-[16px] font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="text-[13px] md:text-[14px] text-[#92939e] hover:text-[#5a6fd8] transition-colors duration-200">About</a></li>
                <li><a href="#" className="text-[13px] md:text-[14px] text-[#92939e] hover:text-[#5a6fd8] transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="text-[13px] md:text-[14px] text-[#92939e] hover:text-[#5a6fd8] transition-colors duration-200">Careers</a></li>
                <li><a href="#" className="text-[13px] md:text-[14px] text-[#92939e] hover:text-[#5a6fd8] transition-colors duration-200">Contact</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-[15px] md:text-[16px] font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2.5">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#5a6fd8] flex-shrink-0" />
                  <a href="mailto:hello@rentmate.com" className="text-[13px] md:text-[14px] text-[#92939e] hover:text-[#5a6fd8] transition-colors duration-200">hello@rentmate.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#5a6fd8] flex-shrink-0" />
                  <a href="tel:+1234567890" className="text-[13px] md:text-[14px] text-[#92939e] hover:text-[#5a6fd8] transition-colors duration-200">+1 (234) 567-890</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-[#272b30] pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[12px] md:text-[13px] text-[#92939e]">© 2025 RentMate. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="text-[12px] md:text-[13px] text-[#92939e] hover:text-[#5a6fd8] transition-colors duration-200">Privacy Policy</a>
                <a href="#" className="text-[12px] md:text-[13px] text-[#92939e] hover:text-[#5a6fd8] transition-colors duration-200">Terms of Service</a>
                <a href="#" className="text-[12px] md:text-[13px] text-[#92939e] hover:text-[#5a6fd8] transition-colors duration-200">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
