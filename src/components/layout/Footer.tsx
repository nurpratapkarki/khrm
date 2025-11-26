import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
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
    <footer className="bg-muted border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">KHRM</h3>
            <p className="text-sm text-muted-foreground">
              {companyInfo?.hero_subtext ?? 'Trusted international recruitment partner from Nepal.'}
            </p>
            <div className="flex gap-2">
              <Button size="icon" variant="outline">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link to="/industries" className="text-muted-foreground hover:text-primary">Industries</Link></li>
              <li><Link to="/training" className="text-muted-foreground hover:text-primary">Training</Link></li>
              <li><Link to="/gallery" className="text-muted-foreground hover:text-primary">Gallery</Link></li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="font-semibold mb-4">For Employers</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/employer-inquiry" className="text-muted-foreground hover:text-primary">Request Manpower</Link></li>
              <li><Link to="/recruitment-process" className="text-muted-foreground hover:text-primary">Recruitment Process</Link></li>
              <li><Link to="/documents" className="text-muted-foreground hover:text-primary">Downloads</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {headquarters
                    ? `${headquarters.address}, ${headquarters.city}`
                    : 'Kathmandu, Nepal'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {headquarters?.phone ?? '+977-XXX-XXXX'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {headquarters?.email ?? 'info@khrm.com.np'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 KHRM. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}