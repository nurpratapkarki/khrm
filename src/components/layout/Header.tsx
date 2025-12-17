import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { companyApi } from '@/api';
import type { CompanyInfo, Office } from '@/api';

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: companyInfo } = useApi<CompanyInfo>(() => companyApi.getCompanyInfo(), []);
  const { data: offices } = useApi<Office[] | { results: Office[] }>(() => companyApi.getOffices(), []);

  const officeList = Array.isArray(offices)
    ? offices
    : Array.isArray((offices as { results?: Office[] })?.results)
      ? (offices as { results: Office[] }).results
      : [];

  const whatsappNumber = officeList.find((office) => office.is_active && office.phone)?.phone;
  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`
    : undefined;

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Industries', href: '/industries' },
    { name: 'Jobs', href: '/jobs' },
    { name: 'Training', href: '/training' },
    { name: 'Careers', href: '/careers' },
    { name: 'CSR', href: '/csr' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 shadow-sm backdrop-blur supports-backdrop-filter:bg-white/80">
      <nav className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center  space-x-2">
            {companyInfo?.logo ? (
              <div className='flex '>
                <img
                  src={companyInfo.logo}
                  alt="KHRM logo"
                  className="h-12 w-auto object-contain"
                />
                <p className="pr-2 font-bold text-3xl bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  KHRM
                </p>

              </div>

            ) : (
              <p className="pr-2 font-bold text-3xl bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                KHRM
              </p>

            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-1",
                  location.pathname === item.href
                    ? "text-primary after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/jobs">Get Started</Link>
            </Button>
            <Button size="sm" asChild>
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                Whatsapp Us
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary py-2",
                    location.pathname === item.href ? "text-primary font-semibold" : "text-muted-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/employer-inquiry">Get Started</Link>
                </Button>
                <Button size="sm" asChild>
                  <a href={whatsappLink} target="_blank" rel="noreferrer">
                    Whatsapp Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}