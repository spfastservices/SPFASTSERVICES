/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Globe,
  CreditCard,
  Image as ImageIcon,
  Heart,
  Mail,
  FileCheck2,
  FileText,
  Calculator,
  IdCard,
  FileSpreadsheet,
  Printer,
  Wand2,
  PenTool,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  Headphones,
  Award,
  Infinity as InfinityIcon,
  Search,
  CheckCircle,
  Copy,
  ChevronRight,
  X,
  Sparkles,
  MapPin,
  Send,
  Eye,
  Instagram,
  Facebook,
  Youtube,
  RotateCw,
  HelpCircle,
  ChevronDown,
  Star,
  Check,
  Zap,
  ArrowRight
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  hindi?: string;
  category: 'web' | 'print' | 'gov' | 'wedding';
  gradient: string;
  borderColor: string;
  accentColor: string;
  iconBg: string;
  icon: React.ReactNode;
  turnaround: string;
  highlights: string[];
  defaultMessage: string;
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeServiceModal, setActiveServiceModal] = useState<ServiceItem | null>(null);
  const [showCardModal, setShowCardModal] = useState<boolean>(false);
  const [cardFlipSide, setCardFlipSide] = useState<'front' | 'back'>('front');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isChatWidgetOpen, setIsChatWidgetOpen] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Form states
  const [customName, setCustomName] = useState('');
  const [customPhone, setCustomPhone] = useState('');
  const [customService, setCustomService] = useState('Website Designing & Development');
  const [customNotes, setCustomNotes] = useState('');
  const [formSent, setFormSent] = useState(false);

  const phoneNumber = '7089900654';
  const whatsappNumber = '917089900654';
  const emailAddress = 'spfastservices@gmail.com';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const services: ServiceItem[] = [
    {
      id: 'website-design',
      title: 'Website Designing & Development',
      subtitle: 'Business | Personal | E-Commerce',
      category: 'web',
      gradient: 'from-[#0091ff] via-[#006bd6] to-[#004fcf]',
      borderColor: 'border-blue-400/50',
      accentColor: '#0091ff',
      iconBg: 'bg-white/20',
      icon: <Globe className="w-8 h-8 text-white" />,
      turnaround: '2-4 Days Delivery',
      highlights: ['Responsive Mobile & Tablet Design', 'High Speed & SEO Optimized', 'Free Domain & Hosting Setup Guidance', 'Payment Gateway & WhatsApp Order Integration'],
      defaultMessage: 'Hello SP Fast Services, I want to inquire about Website Designing & Development (Business/Personal/E-Commerce).'
    },
    {
      id: 'visiting-cards',
      title: 'Visiting Cards',
      subtitle: 'Premium Design & Printing',
      category: 'print',
      gradient: 'from-[#8b5cf6] via-[#7c3aed] to-[#581c87]',
      borderColor: 'border-purple-400/50',
      accentColor: '#8b5cf6',
      iconBg: 'bg-white/20',
      icon: <CreditCard className="w-8 h-8 text-white" />,
      turnaround: '24-48 Hours + Courier',
      highlights: ['Matte, Gloss, Velvet, Texture Options', 'Spot UV & Gold / Silver Foil Stamping', 'Unique Custom Corporate Layouts', 'Doorstep Pan-India Courier Delivery'],
      defaultMessage: 'Hello SP Fast Services, I want to inquire about Visiting Cards (Premium Design & Printing).'
    },
    {
      id: 'banner-designing',
      title: 'Banner Designing',
      subtitle: 'Social Media | Flex Hoarding | Prints',
      category: 'print',
      gradient: 'from-[#ec4899] via-[#db2777] to-[#9d174d]',
      borderColor: 'border-pink-400/50',
      accentColor: '#ec4899',
      iconBg: 'bg-white/20',
      icon: <ImageIcon className="w-8 h-8 text-white" />,
      turnaround: 'Same Day / 24 Hours',
      highlights: ['High-Resolution Flex & Hoarding Print Files', 'Shopfront, Rollup & Standee Displays', 'Festival & Promotional Social Media Creatives', 'Ready-to-print vector formats'],
      defaultMessage: 'Hello SP Fast Services, I want to inquire about Banner Designing (Social Media | Flex Hoarding | Prints).'
    },
    {
      id: 'wedding-links',
      title: 'Wedding Links',
      subtitle: 'Create & Share Your Wedding Link',
      category: 'wedding',
      gradient: 'from-[#f97316] via-[#ea580c] to-[#c2410c]',
      borderColor: 'border-orange-400/50',
      accentColor: '#f97316',
      iconBg: 'bg-white/20',
      icon: <Heart className="w-8 h-8 text-white" />,
      turnaround: 'Same Day Delivery',
      highlights: ['Interactive Couple Website / Link', 'Google Maps Venue Navigation & RSVP', 'Full Event Schedule with Music', 'Easy WhatsApp & Instagram 1-Click Sharing'],
      defaultMessage: 'Hello SP Fast Services, I want to inquire about Wedding Links (Create & Share Your Wedding Link).'
    },
    {
      id: 'wedding-invitation-links',
      title: 'Wedding Invitation Links',
      subtitle: 'Digital | Beautiful | Unique',
      category: 'wedding',
      gradient: 'from-[#06b6d4] via-[#0891b2] to-[#0e7490]',
      borderColor: 'border-cyan-400/50',
      accentColor: '#06b6d4',
      iconBg: 'bg-white/20',
      icon: <Mail className="w-8 h-8 text-white" />,
      turnaround: '12-24 Hours',
      highlights: ['Animated Digital Video / PDF Invitations', 'Custom Background Music & Traditional Shlokas', 'Countdown Timer to Muhurat', 'Eco-friendly, Modern & Memorable'],
      defaultMessage: 'Hello SP Fast Services, I want to inquire about Wedding Invitation Links (Digital | Beautiful | Unique).'
    },
    {
      id: 'gst-registration',
      title: 'GST Registration',
      subtitle: 'New Filing & Compliances',
      hindi: 'जी.एस.टी. रजिस्ट्रेशन',
      category: 'gov',
      gradient: 'from-[#16a34a] via-[#15803d] to-[#14532d]',
      borderColor: 'border-emerald-400/50',
      accentColor: '#16a34a',
      iconBg: 'bg-white/20',
      icon: <FileCheck2 className="w-8 h-8 text-white" />,
      turnaround: '2-3 Working Days',
      highlights: ['Complete New GST Application & ARN Tracking', 'Proper Business Verification Assistance', 'Monthly / Quarterly Return Guidance', 'PAN India Support for Proprietors & Companies'],
      defaultMessage: 'Hello SP Fast Services, I want to inquire about GST Registration (जी.एस.टी. रजिस्ट्रेशन).'
    },
    {
      id: 'tin-registration',
      title: 'TIN Registration',
      subtitle: 'Tax Identification Number',
      hindi: 'टिन रजिस्ट्रेशन',
      category: 'gov',
      gradient: 'from-[#dc2626] via-[#b91c1c] to-[#7f1d1d]',
      borderColor: 'border-red-400/50',
      accentColor: '#dc2626',
      iconBg: 'bg-white/20',
      icon: <FileText className="w-8 h-8 text-white" />,
      turnaround: '1-2 Working Days',
      highlights: ['Tax Identification Number Process', 'Fast Govt Portal Verification', 'Document Checking & Zero-Error Submission', 'Official Certificate Delivery'],
      defaultMessage: 'Hello SP Fast Services, I want to inquire about TIN Registration (टिन रजिस्ट्रेशन).'
    },
    {
      id: 'tds-filing',
      title: 'TDS Filing',
      subtitle: 'Quarterly | Annual Filing',
      category: 'gov',
      gradient: 'from-[#0284c7] via-[#0369a1] to-[#075985]',
      borderColor: 'border-sky-400/50',
      accentColor: '#0284c7',
      iconBg: 'bg-white/20',
      icon: <Calculator className="w-8 h-8 text-white" />,
      turnaround: 'Fast Accurate Filing',
      highlights: ['24Q, 26Q & 27Q Quarterly Compliance', 'Form 16 & Form 16A Generation', 'Challan Matching & Interest Calculation', 'Penalty & Notice Prevention Support'],
      defaultMessage: 'Hello SP Fast Services, I want to inquire about TDS Filing (Quarterly | Annual Filing).'
    },
    {
      id: 'pan-card-services',
      title: 'Pan Card Services',
      subtitle: 'New | Correction | Reprint',
      category: 'gov',
      gradient: 'from-[#6366f1] via-[#4f46e5] to-[#3730a3]',
      borderColor: 'border-indigo-400/50',
      accentColor: '#6366f1',
      iconBg: 'bg-white/20',
      icon: <IdCard className="w-8 h-8 text-white" />,
      turnaround: 'e-PAN in 24-48 Hours',
      highlights: ['Instant e-PAN via Aadhaar OTP', 'Name, Father Name & DOB Correction', 'Physical PVC Card Sent to Postal Address', 'Minor to Major PAN Upgradation'],
      defaultMessage: 'Hello SP Fast Services, I want to inquire about Pan Card Services (New | Correction | Reprint).'
    },
    {
      id: 'document-services',
      title: 'Document Services',
      subtitle: 'All Types of Documents & Attestation',
      category: 'gov',
      gradient: 'from-[#f59e0b] via-[#d97706] to-[#92400e]',
      borderColor: 'border-amber-400/50',
      accentColor: '#f59e0b',
      iconBg: 'bg-white/20',
      icon: <FileSpreadsheet className="w-8 h-8 text-white" />,
      turnaround: 'Same Day / Next Day',
      highlights: ['Affidavit & Notary Draft Preparation', 'Name Correction & Gazette Notification', 'Certificate Attestation Assistance', 'Govt Schemes & Citizen Forms Filling'],
      defaultMessage: 'Hello SP Fast Services, I want to inquire about Document Services (All Types of Documents & Attestation).'
    },
    {
      id: 'printing-scanning',
      title: 'Printing & Scanning',
      subtitle: 'Color | B/W | Digital Printouts',
      category: 'print',
      gradient: 'from-[#0ea5e9] via-[#0284c7] to-[#0369a1]',
      borderColor: 'border-cyan-400/50',
      accentColor: '#0ea5e9',
      iconBg: 'bg-white/20',
      icon: <Printer className="w-8 h-8 text-white" />,
      turnaround: 'Instant / Same Day',
      highlights: ['Ultra-Sharp Laser Color & B/W Prints', 'High Resolution Document & Photo Scanning', 'Spiral, Wiro & Hard Book Binding', 'Project Reports, Brochures & Catalogs'],
      defaultMessage: 'Hello SP Fast Services, I want to inquire about Printing & Scanning (Color | B/W | Digital Printouts).'
    },
    {
      id: 'photo-editing',
      title: 'Photo Editing',
      subtitle: 'Enhance | Retouch Designs',
      category: 'print',
      gradient: 'from-[#f43f5e] via-[#e11d48] to-[#9f1239]',
      borderColor: 'border-rose-400/50',
      accentColor: '#f43f5e',
      iconBg: 'bg-white/20',
      icon: <Wand2 className="w-8 h-8 text-white" />,
      turnaround: 'Within 2-6 Hours',
      highlights: ['Background Removal & White Canvas', 'Old Damaged Photo Colorization & Restoration', 'Portrait Beauty Retouching & Color Grading', 'Amazon / Flipkart Product Photoshoot Editing'],
      defaultMessage: 'Hello SP Fast Services, I want to inquire about Photo Editing (Enhance | Retouch Designs).'
    },
    {
      id: 'logo-designing',
      title: 'Logo Designing',
      subtitle: 'Business | Brand | Social Media',
      category: 'web',
      gradient: 'from-[#8b5cf6] via-[#7c3aed] to-[#4c1d95]',
      borderColor: 'border-purple-400/50',
      accentColor: '#8b5cf6',
      iconBg: 'bg-white/20',
      icon: <PenTool className="w-8 h-8 text-white" />,
      turnaround: '24-48 Hours',
      highlights: ['100% Original Vector Master Files (AI/EPS/PNG/SVG)', 'Multiple Creative Concepts to Choose From', 'Full Commercial Ownership & Copyright', 'Social Media DP & Watermark Formats Included'],
      defaultMessage: 'Hello SP Fast Services, I want to inquire about Logo Designing (Business | Brand | Social Media).'
    },
    {
      id: 'social-media-designs',
      title: 'Social Media Designs',
      subtitle: 'Post | Banner | Reel Cover & More',
      category: 'web',
      gradient: 'from-[#0d9488] via-[#0f766e] to-[#134e4a]',
      borderColor: 'border-teal-400/50',
      accentColor: '#0d9488',
      iconBg: 'bg-white/20',
      icon: (
        <div className="flex items-center gap-1.5">
          <Instagram className="w-4 h-4 text-pink-300" />
          <Facebook className="w-4 h-4 text-blue-300" />
          <Youtube className="w-4 h-4 text-red-400" />
        </div>
      ),
      turnaround: 'Fast Same-Day Delivery',
      highlights: ['Instagram Carousels & High-Converting Posts', 'Eye-Catching YouTube Video Thumbnails', 'Facebook Ad Banners & Business Page Covers', 'Festival Greeting Creatives with Your Brand Logo'],
      defaultMessage: 'Hello SP Fast Services, I want to inquire about Social Media Designs (Post | Banner | Reel Cover & More).'
    }
  ];

  const filteredServices = services.filter((srv) => {
    const matchesCat = selectedCategory === 'all' || srv.category === selectedCategory;
    const matchesSearch =
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (srv.hindi && srv.hindi.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleOpenWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`✓ Copied ${label} to clipboard!`);
  };

  const handleCustomFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullMsg = `Hello SP Fast Services,\n\nI have a new service inquiry:\n• Name: ${customName || 'Customer'}\n• Phone: ${customPhone || 'Not provided'}\n• Service: ${customService}\n• Details: ${customNotes || 'Looking for pricing and process details'}`;
    handleOpenWhatsApp(fullMsg);
    setFormSent(true);
    showToast('🚀 Opening WhatsApp with your message...');
    setTimeout(() => setFormSent(false), 5000);
  };

  const faqs = [
    {
      q: 'How fast do you deliver digital services (Pan Card, GST, Website, Wedding Links)?',
      a: 'Most digital documents and invitations (PAN correction, Wedding links, social media graphics) are completed within 24 to 48 hours. Websites are typically delivered in 2 to 4 days with full revisions.'
    },
    {
      q: 'Do you deliver physical visiting cards and prints across India?',
      a: 'Yes! We print premium visiting cards (Matte, Gloss, Velvet, Gold Foil) and ship them securely via tracked courier to any pin code across all 28 states and 8 union territories in India.'
    },
    {
      q: 'What documents are required for GST Registration or PAN Card?',
      a: 'For GST: PAN card, Aadhaar card, business address proof (electricity bill/rent agreement), and bank statement. For PAN: Aadhaar card with active mobile number for instant verification. Send us a quick WhatsApp and we guide you step-by-step!'
    },
    {
      q: 'How does payment work for online services?',
      a: 'We accept all secure online payment modes including UPI (Google Pay, PhonePe, Paytm), Net Banking, and Bank Transfer. We provide transparent upfront quotes with zero hidden charges.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050b18] text-slate-100 font-body relative overflow-x-hidden selection:bg-amber-400 selection:text-slate-950">
      
      {/* Background Luxury Ambient Lighting */}
      <div className="fixed top-0 left-1/4 w-[750px] h-[750px] bg-blue-600/10 rounded-full blur-[170px] pointer-events-none -z-10" />
      <div className="fixed top-1/2 right-0 w-[650px] h-[650px] bg-amber-500/10 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* TOP HEADER / APP BAR */}
      <header className="sticky top-0 z-40 bg-[#060c1d]/90 backdrop-blur-xl border-b border-blue-900/60 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-4">
          
          {/* Brand Logo Lockup */}
          <a href="#" className="flex items-center gap-3 sm:gap-4 group shrink-0">
            {/* 3D SP Crown Badge */}
            <div className="relative flex items-center justify-center">
              {/* Crown Icon */}
              <div className="absolute -top-4 -left-1 sm:-top-4 sm:left-1 text-amber-400 drop-shadow-[0_2px_12px_rgba(251,191,36,0.9)] animate-pulse">
                <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                </svg>
              </div>

              {/* 3D SP Monogram */}
              <div className="flex items-baseline font-black font-display text-3xl sm:text-4xl tracking-tighter leading-none pt-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-200 via-sky-400 to-blue-700 drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]">
                  S
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)] -ml-1">
                  P
                </span>
              </div>
            </div>

            {/* Title & Slogan */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-lg sm:text-2xl tracking-tight text-white uppercase drop-shadow-md">
                  FAST SERVICES
                </span>
              </div>
              <span className="text-[9px] sm:text-[11px] tracking-widest text-amber-400 font-extrabold uppercase font-display border-t border-amber-400/60 pt-0.5">
                YOUR WORK OUR PRIORITY
              </span>
            </div>
          </a>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* View Original Card Button */}
            <button
              onClick={() => setShowCardModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-blue-950/80 hover:bg-blue-900 border border-blue-700/60 text-xs font-semibold text-cyan-200 transition-all hover:scale-103 shadow-md"
              title="View Original Visiting Card & Banner Assets"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Visiting Card Asset</span>
              <span className="sm:hidden">Card</span>
            </button>

            {/* Direct Phone Call */}
            <a
              href={`tel:+91${phoneNumber}`}
              className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-blue-900/60 hover:bg-blue-800 border border-blue-500/50 text-xs sm:text-sm font-bold text-white transition-all shadow-md group"
            >
              <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                <Phone className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="hidden lg:inline font-mono tracking-wide">7089900654</span>
              <span className="lg:hidden">Call</span>
            </a>

            {/* Primary WhatsApp Action */}
            <button
              onClick={() => handleOpenWhatsApp('Hello SP Fast Services, I want to inquire about your online services.')}
              className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/30 transition-all hover:scale-104 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current text-white" />
              <span className="text-white">WhatsApp</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-8 pb-14 sm:pt-14 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-blue-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Value Proposition & Taglines */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Handwritten Brush Motto */}
              <div className="inline-block transform -rotate-1 hover:rotate-0 transition-transform">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <span className="font-brush text-3xl sm:text-4xl lg:text-5xl text-amber-400 drop-shadow-[0_2px_12px_rgba(251,191,36,0.6)] font-bold tracking-wide">
                    Your Work Our Priority!
                  </span>
                  <Sparkles className="w-5 h-5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
                  All Online Services <br />
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-[0_4px_20px_rgba(234,179,8,0.4)]">
                    Under One Roof
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-3.5 text-amber-400 opacity-90"
                      viewBox="0 0 260 20"
                      fill="none"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M3 14C55 4 160 18 257 6"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                  Fast, trusted & confidential government documentation, creative digital branding, 
                  GST & PAN compliance, premium printing, and modern website development across all states of India.
                </p>
              </div>

              {/* Pan India Badge & Features */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
                <div className="brush-badge-blue px-6 py-2.5 rounded-xl shadow-xl border border-sky-400/60 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shadow-md">
                    <MapPin className="w-4 h-4 fill-current text-slate-950" />
                  </div>
                  <div>
                    <div className="font-display font-extrabold text-sm sm:text-base text-white tracking-wide">
                      Pan India Service
                    </div>
                    <div className="text-xs font-brush text-amber-300 text-sm">
                      Fast · Reliable · Secure
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-blue-950/70 border border-blue-800/80 rounded-xl px-4 py-2.5 backdrop-blur-md">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Speed Guarantee</div>
                    <div className="text-xs sm:text-sm font-bold text-white">24-48 Hours Turnaround</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-blue-950/70 border border-blue-800/80 rounded-xl px-4 py-2.5 backdrop-blur-md">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Client Trust</div>
                    <div className="text-xs sm:text-sm font-bold text-white">4.9/5 Rated Service</div>
                  </div>
                </div>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('services-grid');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-display font-extrabold text-sm sm:text-base tracking-wide shadow-xl shadow-amber-500/25 transition-all hover:scale-103 flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Browse All 14 Services</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleOpenWhatsApp('Hello SP Fast Services, I want to talk to an expert about my requirements.')}
                  className="px-6 py-3.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 border border-emerald-400/50 text-white font-bold text-sm sm:text-base transition-all hover:scale-103 flex items-center gap-2 shadow-xl shadow-emerald-700/30 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current text-white" />
                  <span>Chat on WhatsApp Directly</span>
                </button>
              </div>

              {/* Fast Contact Chips */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 bg-[#0c1630] border border-blue-800/70 rounded-full px-4 py-2 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Direct Call & WhatsApp:</span>
                  <button
                    onClick={() => handleCopy(phoneNumber, 'phone number')}
                    className="font-mono font-bold text-white hover:text-amber-400 transition-colors flex items-center gap-1.5"
                    title="Click to copy phone number"
                  >
                    <span>7089900654</span>
                    <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
                  </button>
                </div>

                <div className="flex items-center gap-2 bg-[#0c1630] border border-blue-800/70 rounded-full px-4 py-2 text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <button
                    onClick={() => handleCopy(emailAddress, 'email address')}
                    className="font-mono text-white hover:text-amber-400 transition-colors flex items-center gap-1.5"
                    title="Click to copy email address"
                  >
                    <span>spfastservices@gmail.com</span>
                    <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-white" />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive 3D Visiting Card Flip Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow Backdrop */}
                <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-blue-600 via-amber-400 to-emerald-500 opacity-30 blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />

                <div className="relative bg-[#0b142c] border-2 border-blue-700/70 rounded-3xl p-4 sm:p-5 shadow-2xl space-y-3">
                  
                  {/* Card Header with Flip Toggle */}
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400">
                        {cardFlipSide === 'front' ? 'Official Card Front' : 'Official Card Back'}
                      </span>
                    </div>

                    <button
                      onClick={() => setCardFlipSide(cardFlipSide === 'front' ? 'back' : 'front')}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/70 hover:bg-blue-800 border border-blue-600/50 text-xs font-bold text-white transition-all hover:scale-105 cursor-pointer shadow-sm"
                    >
                      <RotateCw className="w-3 h-3 text-amber-400" />
                      <span>Flip Card (Front / Back)</span>
                    </button>
                  </div>

                  {/* 3D Card Display */}
                  <div
                    onClick={() => setShowCardModal(true)}
                    className="relative cursor-pointer aspect-[16/10] rounded-2xl overflow-hidden border-2 border-blue-600/60 shadow-inner group bg-slate-950"
                  >
                    <img
                      src={
                        cardFlipSide === 'front'
                          ? '/public/assets/aistudio/IMG_20261029_112533_c48df79d.png'
                          : '/public/assets/aistudio/IMG_20261029_112446_a0c78af5.png'
                      }
                      alt={cardFlipSide === 'front' ? 'SP Fast Services Front' : 'SP Fast Services Back'}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay & Zoom Hint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4">
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                            {cardFlipSide === 'front' ? 'Banner & Contacts' : '14 Services Directory'}
                          </div>
                          <div className="text-sm font-bold text-white flex items-center gap-1">
                            <span>Click to Zoom & View High-Res</span>
                            <Eye className="w-3.5 h-3.5 text-amber-300" />
                          </div>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-blue-600/80 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                          <Eye className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trust Micro-Badges */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-blue-950/80 border border-blue-800/60">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="text-slate-200 font-medium">Pan India Delivery</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-blue-950/80 border border-blue-800/60">
                      <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="text-slate-200 font-medium">100% Trusted Guarantee</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* YELLOW TRUST BADGES RIBBON (Exact recreation from card with luxury icons) */}
      <section className="bg-gradient-to-r from-[#eab308] via-[#facc15] to-[#eab308] text-slate-950 py-4 px-4 sm:px-6 shadow-2xl relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-900/25">
            
            {/* Badge 1: Fast Service */}
            <div className="flex items-center justify-center gap-3 py-2 px-2">
              <div className="w-10 h-10 rounded-full border-2 border-slate-950 flex items-center justify-center shrink-0 bg-white/20 shadow-sm">
                <Clock className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div className="text-left">
                <div className="font-display font-black text-sm sm:text-base uppercase leading-tight tracking-tight">
                  Fast Service
                </div>
                <div className="text-[11px] font-bold text-slate-900/80">On-Time Execution</div>
              </div>
            </div>

            {/* Badge 2: 100% Trusted */}
            <div className="flex items-center justify-center gap-3 py-2 px-2">
              <div className="w-10 h-10 rounded-full border-2 border-slate-950 flex items-center justify-center shrink-0 bg-white/20 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div className="text-left">
                <div className="font-display font-black text-sm sm:text-base uppercase leading-tight tracking-tight">
                  100% Trusted
                </div>
                <div className="text-[11px] font-bold text-slate-900/80">Safe & Confidential</div>
              </div>
            </div>

            {/* Badge 3: Customer Support */}
            <div className="flex items-center justify-center gap-3 py-2 px-2">
              <div className="w-10 h-10 rounded-full border-2 border-slate-950 flex items-center justify-center shrink-0 bg-white/20 shadow-sm">
                <Headphones className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div className="text-left">
                <div className="font-display font-black text-sm sm:text-base uppercase leading-tight tracking-tight">
                  Customer Support
                </div>
                <div className="text-[11px] font-bold text-slate-900/80">Call & WhatsApp</div>
              </div>
            </div>

            {/* Badge 4: Quality Work */}
            <div className="flex items-center justify-center gap-3 py-2 px-2">
              <div className="w-10 h-10 rounded-full border-2 border-slate-950 flex items-center justify-center shrink-0 bg-white/20 shadow-sm">
                <Award className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div className="text-left">
                <div className="font-display font-black text-sm sm:text-base uppercase leading-tight tracking-tight">
                  Quality Work
                </div>
                <div className="text-[11px] font-bold text-slate-900/80">Professional Grade</div>
              </div>
            </div>

            {/* Badge 5: Many More Services */}
            <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-3 py-2 px-2">
              <div className="w-10 h-10 rounded-full border-2 border-slate-950 flex items-center justify-center shrink-0 bg-white/20 shadow-sm">
                <InfinityIcon className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <div className="text-left">
                <div className="font-display font-black text-sm sm:text-base uppercase leading-tight tracking-tight">
                  Many More...
                </div>
                <div className="text-[11px] font-bold text-slate-900/80">Custom Solutions</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SERVICES DIRECTORY & INTERACTIVE GRID */}
      <section id="services-grid" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Section Header */}
          <div className="text-center space-y-4">
            
            <div className="inline-block relative">
              {/* Yellow Brush "Our Services" */}
              <div className="brush-badge-yellow px-8 py-2.5 rounded-sm transform -rotate-1 shadow-2xl inline-flex items-center gap-3">
                <span className="font-brush text-3xl sm:text-4xl text-slate-950 font-black tracking-wider">
                  Our Services
                </span>
              </div>
              {/* Sunburst Rays Decoration */}
              <div className="hidden sm:block absolute -top-4 -right-12 text-amber-400">
                <svg className="w-10 h-10 animate-spin" style={{ animationDuration: '24s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
              14 Online Services Under One Roof
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Click any glossy card below to view service details or start an instant WhatsApp inquiry with our specialists.
            </p>

            {/* Filter Tabs & Search Bar */}
            <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#0b142c] border border-blue-900/70 rounded-2xl shadow-lg">
                {[
                  { id: 'all', label: 'All Services (14)' },
                  { id: 'web', label: 'Web & Tech' },
                  { id: 'print', label: 'Printing & Design' },
                  { id: 'gov', label: 'Government & Tax' },
                  { id: 'wedding', label: 'Wedding & Events' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                      selectedCategory === tab.id
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow-md scale-102'
                        : 'text-slate-300 hover:text-white hover:bg-blue-900/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search GST, Pan Card, Wedding, Print..."
                  className="w-full pl-10 pr-9 py-2.5 bg-[#0c1630] border border-blue-800/90 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>

          </div>

          {/* THE 14 GLOSSY SERVICE CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={() => setActiveServiceModal(service)}
                className={`glossy-card group cursor-pointer rounded-3xl p-5 bg-gradient-to-br ${service.gradient} border-2 ${service.borderColor} shadow-2xl flex flex-col justify-between min-h-[195px]`}
              >
                {/* Upper Area: Icon & Title */}
                <div>
                  <div className="flex items-start gap-3.5">
                    {/* Glossy Icon Container */}
                    <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                      {service.icon}
                    </div>

                    <div className="space-y-0.5 flex-1 min-w-0">
                      <h3 className="font-display font-black text-lg sm:text-xl text-white tracking-tight leading-tight drop-shadow-sm">
                        {service.title}
                      </h3>
                      {service.hindi && (
                        <span className="inline-block text-xs font-bold text-amber-200/95 font-display bg-black/25 px-2 py-0.5 rounded-md mt-0.5">
                          {service.hindi}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subtitle / Details */}
                  <div className="mt-3.5 pt-2.5 border-t border-white/20">
                    <p className="text-xs sm:text-sm font-semibold text-white/95 leading-snug drop-shadow-xs">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bottom WhatsApp Trigger Affordance */}
                <div className="mt-4 pt-2 flex items-center justify-between text-xs font-bold text-white group-hover:text-amber-200 transition-colors">
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 fill-current text-white" />
                    <span>Inquire on WhatsApp</span>
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-white group-hover:text-slate-950 text-white flex items-center justify-center transition-all group-hover:translate-x-1">
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-14 bg-blue-950/40 rounded-3xl border border-blue-900/60 p-8 space-y-4">
              <Search className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-xl font-bold text-white">No services found for "{searchQuery}"</h3>
              <p className="text-sm text-slate-400">
                Try searching for 'GST', 'Pan', 'Wedding', 'Visiting', or 'Banner'.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-5 py-2.5 bg-blue-800 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all"
              >
                Reset Search Filters
              </button>
            </div>
          )}

          {/* "GROW YOUR BUSINESS WITH US" BRUSH BANNER (Extracted directly from Visiting Card) */}
          <div className="relative mt-12 pt-6">
            <div className="bg-gradient-to-r from-blue-950 via-[#0d1c40] to-blue-950 border-2 border-amber-400/60 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
              
              <div className="space-y-3 text-center md:text-left">
                {/* Yellow Brush Badge */}
                <div className="inline-block brush-badge-yellow px-6 py-2 transform -rotate-1 rounded shadow-lg">
                  <span className="font-brush text-2xl sm:text-3xl text-slate-950 font-black">
                    Grow Your Business With Us
                  </span>
                </div>

                <div className="font-brush text-2xl sm:text-4xl text-amber-300 font-bold">
                  Thank You ♥ - for Choosing Us
                </div>

                <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                  Fast execution for startup registrations, visiting cards, digital wedding invitation links, 
                  GST compliances, and modern websites across India.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
                <button
                  onClick={() => handleOpenWhatsApp('Hello SP Fast Services, I want to discuss how you can help me grow my business.')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-current text-white" />
                  <span className="text-white">Chat on WhatsApp</span>
                </button>

                <a
                  href={`tel:+91${phoneNumber}`}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>Call 7089900654</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3-STEP SERVICE PROCESS SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#040816] border-y border-blue-950">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
              Simple & Hassle-Free
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
              How SP Fast Services Works
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Get your work done smoothly in 3 simple steps without standing in long queues or dealing with complex portals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-3xl bg-[#081126] border border-blue-800/60 shadow-xl space-y-4 text-center sm:text-left relative">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-display font-black text-xl shadow-lg">
                1
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                Select Service & Connect
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Click any service card or WhatsApp button (7089900654) and tell us your requirement or send basic details.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-3xl bg-[#081126] border border-blue-800/60 shadow-xl space-y-4 text-center sm:text-left relative">
              <div className="w-12 h-12 rounded-2xl bg-sky-400 text-slate-950 flex items-center justify-center font-display font-black text-xl shadow-lg">
                2
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                Instant Verification & Draft
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our experts review your documents or design draft, verifying 100% compliance before processing.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-3xl bg-[#081126] border border-blue-800/60 shadow-xl space-y-4 text-center sm:text-left relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-400 text-slate-950 flex items-center justify-center font-display font-black text-xl shadow-lg">
                3
              </div>
              <h3 className="text-lg font-bold font-display text-white">
                Fast Online & Courier Delivery
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Receive your digital certificate, website, or wedding link online, or get printed cards shipped right to your address.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK INQUIRY FORM & DIRECT CONTACT */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#050b18]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
                  Priority Communication Desk
                </span>
                <h2 className="text-3xl font-black font-display text-white">
                  Connect Directly
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Call or WhatsApp directly on our official business helpline for inquiries, quotations, and quick orders.
                </p>
              </div>

              {/* Info Cards */}
              <div className="space-y-3.5">
                
                {/* Phone & WhatsApp Card */}
                <div className="p-4 rounded-2xl bg-[#0b142c] border border-blue-800/70 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Phone className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-semibold">Call & WhatsApp</div>
                      <div className="font-mono text-base font-bold text-white">7089900654</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(phoneNumber, 'phone number')}
                      className="p-2 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Copy Phone Number"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <a
                      href={`tel:+91${phoneNumber}`}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors"
                    >
                      Call
                    </a>
                  </div>
                </div>

                {/* Email Card */}
                <div className="p-4 rounded-2xl bg-[#0b142c] border border-blue-800/70 flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-semibold">Official Email</div>
                      <div className="font-mono text-xs sm:text-sm font-bold text-white break-all">spfastservices@gmail.com</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(emailAddress, 'email address')}
                    className="p-2 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-slate-300 hover:text-white transition-colors shrink-0 cursor-pointer"
                    title="Copy Email"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                {/* Pan India Coverage */}
                <div className="p-4 rounded-2xl bg-[#0b142c] border border-blue-800/70 flex items-center gap-3.5 shadow-md">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">Service Coverage</div>
                    <div className="text-sm font-bold text-white">All 28 States & UTs (Pan-India)</div>
                    <div className="text-xs text-slate-400">Digital certificates sent instantly via WhatsApp/Email</div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right: Quick Quotation Form */}
            <div className="lg:col-span-7 bg-[#0b142c] border-2 border-blue-800/70 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">
                    Send Instant WhatsApp Service Request
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Fill the form to format your inquiry and send it directly to WhatsApp for fast quotation.
                  </p>
                </div>

                <form onSubmit={handleCustomFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        required
                        className="w-full px-4 py-2.5 bg-[#070e20] border border-blue-900 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Your WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        value={customPhone}
                        onChange={(e) => setCustomPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        required
                        className="w-full px-4 py-2.5 bg-[#070e20] border border-blue-900 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Required Online Service
                    </label>
                    <select
                      value={customService}
                      onChange={(e) => setCustomService(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#070e20] border border-blue-900 rounded-xl text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      {services.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title} {s.hindi ? `(${s.hindi})` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Specific Instructions or Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={customNotes}
                      onChange={(e) => setCustomNotes(e.target.value)}
                      placeholder="e.g. Need GST registration for new proprietorship firm, or need 1000 visiting cards with velvet finish..."
                      className="w-full px-4 py-2.5 bg-[#070e20] border border-blue-900 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-400 text-slate-950 font-display font-black text-sm sm:text-base shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send via WhatsApp to 7089900654</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQS SECTION */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-[#040816] border-t border-blue-950">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
              Clear & Transparent
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#091124] border border-blue-900/60 overflow-hidden transition-all shadow-md"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      openFaqIndex === idx ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>

                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-blue-950">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#02050e] border-t border-blue-950 py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-blue-950">
            {/* Brand */}
            <div className="flex items-center gap-3 text-center md:text-left">
              <div className="flex items-baseline font-black font-display text-3xl">
                <span className="text-cyan-400">S</span>
                <span className="text-amber-400">P</span>
              </div>
              <div>
                <div className="font-display font-extrabold text-white text-base uppercase">
                  FAST SERVICES
                </div>
                <div className="text-[10px] text-amber-400 font-bold tracking-widest">
                  YOUR WORK OUR PRIORITY · PAN INDIA
                </div>
              </div>
            </div>

            {/* Helpline Contacts */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300">
              <a href={`tel:+91${phoneNumber}`} className="hover:text-amber-400 transition-colors flex items-center gap-2 font-mono text-sm font-bold">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>7089900654</span>
              </a>
              <span className="text-slate-700">|</span>
              <a href={`mailto:${emailAddress}`} className="hover:text-amber-400 transition-colors flex items-center gap-2 font-mono text-xs sm:text-sm">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>spfastservices@gmail.com</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <div>
              © {new Date().getFullYear()} SP Fast Services. All Rights Reserved. Pan-India Online Services.
            </div>
            <div>
              Built with precision for Fast, Reliable & Secure Government and Digital Work.
            </div>
          </div>

        </div>
      </footer>

      {/* FLOATING WHATSAPP CHAT LAUNCHER WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Expanded Quick Launcher Bubble */}
        {isChatWidgetOpen && (
          <div className="mb-3 w-72 sm:w-80 bg-[#0c1630] border-2 border-emerald-500/70 rounded-3xl p-4 shadow-2xl space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-blue-900 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                  <MessageCircle className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">SP Fast Services</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">● Online for instant help</div>
                </div>
              </div>
              <button
                onClick={() => setIsChatWidgetOpen(false)}
                className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              👋 Namaste! How can we assist you today? Pick a service below to chat on WhatsApp:
            </p>

            <div className="space-y-1.5">
              {[
                'Website Development',
                'Visiting Cards Printing',
                'GST Registration',
                'Pan Card Services',
                'Wedding Invitation Link'
              ].map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    handleOpenWhatsApp(`Hello SP Fast Services, I want to inquire about ${s}.`);
                    setIsChatWidgetOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-xs text-slate-200 hover:text-white flex items-center justify-between border border-blue-800/60 transition-colors"
                >
                  <span>{s}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                handleOpenWhatsApp('Hello SP Fast Services, I have a question about your services.');
                setIsChatWidgetOpen(false);
              }}
              className="w-full py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-slate-950 font-bold text-xs rounded-xl shadow-md text-center block"
            >
              Start General WhatsApp Chat
            </button>
          </div>
        )}

        {/* Floating Button */}
        <div className="flex items-center gap-2">
          {!isChatWidgetOpen && (
            <span className="hidden sm:inline-block bg-[#091124] text-white text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-500/50 shadow-xl">
              Chat on WhatsApp
            </span>
          )}

          <button
            onClick={() => setIsChatWidgetOpen(!isChatWidgetOpen)}
            aria-label="Toggle WhatsApp Consultation"
            className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/50 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            {/* Ping effect */}
            <span className="absolute -inset-1 rounded-full bg-green-500 opacity-40 animate-ping pointer-events-none" />
            <MessageCircle className="w-7 h-7 fill-current relative z-10" />
          </button>
        </div>
      </div>

      {/* SERVICE DETAILS VIP MODAL */}
      {activeServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-lg bg-[#0b142c] border-2 border-blue-600/80 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Accent Gradient Bar */}
            <div className={`absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r ${activeServiceModal.gradient}`} />

            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pt-1">
              <div className="flex items-center gap-3.5">
                <div className="p-3.5 rounded-2xl bg-white/20 border border-white/25 text-white shadow-inner">
                  {activeServiceModal.icon}
                </div>
                <div>
                  <h3 className="font-display font-black text-xl text-white leading-tight">
                    {activeServiceModal.title}
                  </h3>
                  {activeServiceModal.hindi && (
                    <span className="text-xs font-bold text-amber-300">
                      {activeServiceModal.hindi}
                    </span>
                  )}
                  <p className="text-xs text-slate-300 mt-0.5">
                    {activeServiceModal.subtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveServiceModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Speed & Turnaround Pill */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-950/90 border border-blue-800/80 text-xs">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-slate-300 font-medium">Estimated Delivery:</span>
              <span className="text-amber-400 font-bold">{activeServiceModal.turnaround}</span>
            </div>

            {/* Highlights List */}
            <div className="space-y-2.5 bg-[#070e20] p-4 rounded-2xl border border-blue-900/70">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                What's Included & Deliverables
              </div>
              <ul className="space-y-2">
                {activeServiceModal.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="space-y-3 pt-1">
              <button
                onClick={() => {
                  handleOpenWhatsApp(activeServiceModal.defaultMessage);
                  setActiveServiceModal(null);
                }}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-display font-black text-sm sm:text-base shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current text-white" />
                <span className="text-white">Inquire on WhatsApp (Instant Quote)</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:+91${phoneNumber}`}
                  className="py-2.5 px-4 rounded-xl bg-blue-900/70 hover:bg-blue-800 border border-blue-600/40 text-center text-xs font-bold text-white flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  <span>Call 7089900654</span>
                </a>

                <button
                  onClick={() => {
                    handleCopy(activeServiceModal.defaultMessage, 'inquiry text');
                  }}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-center text-xs font-bold text-slate-300 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Message</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ORIGINAL VISITING CARD & BANNER PREVIEW MODAL */}
      {showCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-4xl bg-[#081024] border-2 border-amber-400/70 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-blue-900 pb-4">
              <div>
                <h3 className="text-xl font-bold font-display text-white">
                  Original Visiting Card & Banner Assets
                </h3>
                <p className="text-xs text-slate-400">
                  Front and Back official designs of SP FAST SERVICES
                </p>
              </div>
              <button
                onClick={() => setShowCardModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Back: Services Grid */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                  <span>Back Side: Services Grid</span>
                  <span className="text-slate-400 text-[11px]">14 Core Online Services</span>
                </div>
                <div className="rounded-2xl overflow-hidden border border-blue-700/60 shadow-xl bg-black">
                  <img
                    src="/public/assets/aistudio/IMG_20261029_112446_a0c78af5.png"
                    alt="SP Fast Services Card Back - Services Grid"
                    className="w-full h-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Front: Logo & Contacts */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                  <span>Front Side: Brand & Contacts</span>
                  <span className="text-slate-400 text-[11px]">7089900654 · Pan India</span>
                </div>
                <div className="rounded-2xl overflow-hidden border border-blue-700/60 shadow-xl bg-black">
                  <img
                    src="/public/assets/aistudio/IMG_20261029_112533_c48df79d.png"
                    alt="SP Fast Services Card Front - Banner & Contacts"
                    className="w-full h-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowCardModal(false)}
                className="px-6 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
