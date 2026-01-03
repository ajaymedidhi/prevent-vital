
import { Link } from 'react-router-dom';
import { Share, MessageSquare, Briefcase, Camera, ShieldCheck, Lock } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: 'AI Health Assessment', href: '/ai-health-assessment' },
      { label: 'Prevention Programs', href: '/disease-prevention-programs' },
      { label: 'Therapeutic Programs', href: '/therapeutic-programs-center' }, // Corrected path stub probably
      { label: 'Medical Portal', href: '/medical-professional-portal' }
    ],
    company: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Our Team', href: '/team' },
      { label: 'Partnership Portal', href: '/partnership-portal' },
      // { label: 'Research & Publications', href: '/' }, // Commented out until page exists or replaced
      // { label: 'Careers', href: '/' } // Commented out until page exists
    ],
    resources: [
      { label: 'Health Library', href: '/' },
      { label: 'Success Stories', href: '/' },
      { label: 'Blog', href: '/' },
      { label: 'FAQs', href: '/' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/' },
      { label: 'Terms of Service', href: '/' },
      { label: 'HIPAA Compliance', href: '/' },
      { label: 'Cookie Policy', href: '/' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Share, href: '#' },
    { name: 'Twitter', icon: MessageSquare, href: '#' },
    { name: 'LinkedIn', icon: Briefcase, href: '#' },
    { name: 'Instagram', icon: Camera, href: '#' }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-blue-600">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">PreventVital</span>
            </Link>
            <p className="text-sm text-white/70 mb-4 max-w-xs">
              Pioneering AI-powered preventive healthcare, combining cutting-edge technology with ancient wellness wisdom.
            </p>
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
                  aria-label={social.name}
                >
                  <social.icon size={20} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-white">Platform</h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/60">
              © {currentYear} PreventVital. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span className="text-xs text-white/60">ISO 27001 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock size={16} className="text-emerald-500" />
                <span className="text-xs text-white/60">HIPAA Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


