import { Link } from 'react-router-dom';
import { Facebook, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApi } from '@/hooks/useApi';
import { companyApi, type CompanyInfo, type Office } from '@/api';

export default function Footer() {
  const { data: companyInfo } = useApi<CompanyInfo>(
    () => companyApi.getCompanyInfo(),
    []
  );
  const { data: headquarters } = useApi<Office>(
    () => companyApi.getHeadquarters(),
    []
  );

  return (
    <footer className="bg-neutral-900 text-neutral-300 border-t mt-auto">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-white mb-4">KHRM</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {companyInfo?.hero_subtext ?? 'Trusted international recruitment partner from Nepal.'}
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed mt-4">
              KHRM (Kanchan Human Resource Management) has been a leading recruitment agency since 2003
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-primary-600 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-1 transition-transform">About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/industries" className="text-neutral-400 hover:text-primary-600 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-1 transition-transform">Industries</span>
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-neutral-400 hover:text-primary-600 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-1 transition-transform">Job Openings</span>
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-neutral-400 hover:text-primary-600 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-1 transition-transform">Careers at KHRM</span>
                </Link>
              </li>
              <li>
                <Link to="/csr" className="text-neutral-400 hover:text-primary-600 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-1 transition-transform">CSR & Impact</span>
                </Link>
              </li>
              <li>
                <Link to="/training" className="text-neutral-400 hover:text-primary-600 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-1 transition-transform">Training</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-neutral-400 hover:text-primary-600 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-1 transition-transform">Gallery</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-semibold mb-4 text-white">For Employers</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/employer-inquiry" className="text-neutral-400 hover:text-primary-600 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-1 transition-transform">Request Manpower</span>
                </Link>
              </li>
              <li>
                <Link to="/recruitment-process" className="text-neutral-400 hover:text-primary-600 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-1 transition-transform">Recruitment Process</span>
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-neutral-400 hover:text-primary-600 transition-colors flex items-center gap-1 group">
                  <span className="group-hover:translate-x-1 transition-transform">Downloads</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary-600 shrink-0" />
                <span className="text-neutral-400">
                  {headquarters
                    ? `${headquarters.address}, ${headquarters.city}`
                    : 'Kathmandu, Nepal'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-secondary-600 shrink-0" />
                <a
                  href={`tel:${headquarters?.phone ?? ''}`}
                  className="text-neutral-400 hover:text-secondary-600 transition-colors"
                >
                  {headquarters?.phone ?? '+977-XXX-XXXX'}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent-gold shrink-0" />
                <a
                  href={`mailto:${headquarters?.email ?? 'info@khrm.com.np'}`}
                  className="text-neutral-400 hover:text-accent-gold transition-colors"
                >
                  {headquarters?.email ?? 'info@khrm.com.np'}
                </a>
              </li>
            </ul>

            {/* Follow Us */}
            <div className="mt-6">
              <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
              <div className="flex gap-2">
                {headquarters?.facebook && (
                  <a
                    href={headquarters.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="icon"
                      variant="outline"
                      className="bg-[#1877F2] border-[#1877F2] text-white hover:bg-[#1877F2]/90 hover:border-[#1877F2]/90 transition-colors"
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-neutral-400">
              ©{' '}
              <a
                href="https://sankalptharu.com.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-600 transition-colors"
              >
                {new Date().getFullYear()}
              </a>{' '}
              <a
                href="https://nurpratapkarki.com.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-600 transition-colors"
              >
                KHRM. All rights reserved.
              </a>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
              <div className="flex gap-4">
                <Link to="/privacy" className="text-neutral-400 hover:text-primary-600 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-neutral-400 hover:text-primary-600 transition-colors">
                  Terms of Service
                </Link>
              </div>

              <span className="hidden md:block text-neutral-600">|</span>

              <a
                href="https://eimagineinfotech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-primary-600 transition-colors flex items-center gap-1.5 group"
              >
                <span>Designed & Developed by</span>
                <span className="font-semibold text-white">Imagine Infotech</span>
                <ExternalLink className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}