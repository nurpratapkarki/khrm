import { useParams, Link } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { careersApi, type Career } from '@/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Briefcase, Building2, Mail, ExternalLink, CheckCircle2, GraduationCap, ArrowLeft } from 'lucide-react';

export default function CareerDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: career, loading, error } = useApi<Career | null>(
    () => (slug ? careersApi.getCareer(slug) : Promise.resolve(null)),
    [slug],
  );

  if (!slug) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Unable to load career</h1>
          <p className="text-muted-foreground text-sm">{error.message}</p>
          <Button asChild className="mt-4">
            <Link to="/careers">Back to careers</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Career not found</h1>
          <Button asChild className="mt-4">
            <Link to="/careers">Back to careers</Link>
          </Button>
        </div>
      </div>
    );
  }

  const canApplyByEmail = !!career.application_email;
  const canApplyByUrl = !!career.apply_url;

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-600/5 via-background to-secondary-600/5">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-primary-600 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent-gold/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <Button 
            variant="ghost" 
            asChild 
            className="mb-6 text-white hover:text-white hover:bg-white/10"
          >
            <Link to="/careers" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Careers
            </Link>
          </Button>

          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {career.department && (
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Building2 className="h-3 w-3 mr-1" />
                  {career.department}
                </Badge>
              )}
              {career.employment_type && (
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Briefcase className="h-3 w-3 mr-1" />
                  {career.employment_type}
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{career.title}</h1>
            
            <div className="flex items-center gap-2 text-white/90 mb-6">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{career.location}</span>
            </div>

            {career.summary && (
              <p className="text-xl text-white/90 leading-relaxed max-w-3xl">
                {career.summary}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {career.responsibilities && (
              <Card className="border-2 hover:border-primary-600/20 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-linear-to-br from-primary-600/10 to-primary-700/5 rounded-xl">
                      <CheckCircle2 className="h-6 w-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold">Key Responsibilities</h2>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-primary-600 to-accent-gold rounded-full" />
                    <div className="pl-6 space-y-3">
                      {career.responsibilities.split('\n').map((line, idx) => 
                        line.trim() && (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="mt-1.5 w-2 h-2 rounded-full bg-primary-600 shrink-0" />
                            <p className="text-muted-foreground leading-relaxed">{line.trim()}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {career.requirements && (
              <Card className="border-2 hover:border-secondary-600/20 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-linear-to-br from-secondary-600/10 to-[#1d4ed8]/5 rounded-xl">
                      <GraduationCap className="h-6 w-6 text-secondary-600" />
                    </div>
                    <h2 className="text-2xl font-bold">Requirements</h2>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-secondary-600 to-accent-gold rounded-full" />
                    <div className="pl-6 space-y-3">
                      {career.requirements.split('\n').map((line, idx) => 
                        line.trim() && (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="mt-1.5 w-2 h-2 rounded-full bg-secondary-600 shrink-0" />
                            <p className="text-muted-foreground leading-relaxed">{line.trim()}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Apply Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-2 border-primary-600/20 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-4 bg-linear-to-br from-primary-600/10 to-primary-700/5 rounded-2xl mb-4">
                      <Briefcase className="h-10 w-10 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Ready to Apply?</h3>
                    <p className="text-sm text-muted-foreground">
                      Join our team and make an impact
                    </p>
                  </div>

                  <div className="space-y-3">
                    {canApplyByEmail && (
                      <Button 
                        asChild 
                        className="w-full bg-linear-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-[#991b1b]"
                      >
                        <a href={`mailto:${career.application_email}?subject=${encodeURIComponent(career.title)}`}>
                          <Mail className="h-4 w-4 mr-2" />
                          Apply via Email
                        </a>
                      </Button>
                    )}
                    {canApplyByUrl && (
                      <Button 
                        variant={canApplyByEmail ? 'outline' : 'default'}
                        asChild 
                        className={canApplyByEmail 
                          ? 'w-full border-2 border-primary-600/20 hover:bg-primary-600/5' 
                          : 'w-full bg-linear-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-[#991b1b]'
                        }
                      >
                        <a href={career.apply_url!} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Apply Online
                        </a>
                      </Button>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{career.location}</span>
                    </div>
                    {career.department && (
                      <div className="flex items-center gap-3 text-sm">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{career.department}</span>
                      </div>
                    )}
                    {career.employment_type && (
                      <div className="flex items-center gap-3 text-sm">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{career.employment_type}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Info Card */}
              <Card className="mt-6 bg-linear-to-br from-accent-gold/5 to-primary-600/5 border-accent-gold/20">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-3">Why Join KHRM?</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent-gold mt-0.5 shrink-0" />
                      <span>Competitive salary & benefits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent-gold mt-0.5 shrink-0" />
                      <span>Professional growth opportunities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent-gold mt-0.5 shrink-0" />
                      <span>Global work environment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent-gold mt-0.5 shrink-0" />
                      <span>Supportive team culture</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}