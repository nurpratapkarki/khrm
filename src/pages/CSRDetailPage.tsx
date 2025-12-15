import { useParams, Link } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { csrApi, companyApi, type CSRProject, type Office } from '@/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, Heart, Target, Sparkles, MessageCircle, BookOpen } from 'lucide-react';

export default function CSRDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, loading, error } = useApi<CSRProject | null>(
    () => (slug ? csrApi.getProject(slug) : Promise.resolve(null)),
    [slug],
  );

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
          <h1 className="text-2xl font-bold mb-2">Unable to load story</h1>
          <p className="text-muted-foreground text-sm">{error.message}</p>
          <Button asChild className="mt-4">
            <Link to="/csr">Back to CSR stories</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Story not found</h1>
          <Button asChild className="mt-4">
            <Link to="/csr">Back to CSR stories</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-600/5 via-background to-secondary-600/5">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-accent-gold to-[#d97706] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <Button
            variant="ghost"
            asChild
            className="mb-6 text-white hover:text-white hover:bg-white/10"
          >
            <Link to="/csr" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to CSR Stories
            </Link>
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 max-w-full">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 whitespace-normal text-left h-auto py-1">
                <Heart className="h-3 w-3 mr-1 shrink-0 inline" />
                <span className="inline">CSR & Impact</span>
              </Badge>

              <h1 className="text-3xl md:text-5xl font-bold break-words hyphens-auto">{project.title}</h1>

              <div className="flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 shrink-0" />
                  <span>{new Date(project.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 shrink-0" />
                  <span className="break-words">{project.location}</span>
                </div>
              </div>
            </div>

            {project.featured_image && (
              <div className="relative mt-8 lg:mt-0 w-full">
                <div className="relative rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 max-w-[90vw] mx-auto lg:max-w-full">
                  <img
                    src={project.featured_image}
                    alt={project.title}
                    className="w-full h-auto object-cover aspect-video"
                  />
                </div>
                <div className="absolute -inset-4 bg-white/5 rounded-3xl -z-10 rotate-6 blur-sm max-w-[90vw] mx-auto lg:max-w-full" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Story Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Impact Statement */}
            <Card className="border-2 hover:border-accent-gold/20 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-linear-to-br from-accent-gold/10 to-[#d97706]/5 rounded-xl">
                    <Sparkles className="h-6 w-6 text-accent-gold" />
                  </div>
                  <h2 className="text-2xl font-bold">Impact in Brief</h2>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-accent-gold to-primary-600 rounded-full" />
                  <div className="pl-6">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {project.impact_statement}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Details */}
            <Card className="border-2 hover:border-secondary-600/20 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-linear-to-br from-secondary-600/10 to-[#1d4ed8]/5 rounded-xl">
                    <Target className="h-6 w-6 text-secondary-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Project Details</h2>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-secondary-600 to-accent-gold rounded-full" />
                  <div className="pl-6">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {project.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {!project.impact_statement && !project.description && (
              <Card className="border-2 border-accent-gold/20 bg-linear-to-br from-accent-gold/5 to-transparent">
                <CardContent className="pt-8 pb-8">
                  <div className="text-center space-y-4">
                    <div className="inline-flex p-4 bg-white rounded-full shadow-sm mb-2">
                      <BookOpen className="h-8 w-8 text-accent-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Details Available on Request</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Detailed project information will be shared upon request.
                      </p>
                    </div>
                    {whatsappLink ? (
                      <Button
                        asChild
                        className="mt-4 bg-[#25D366] hover:bg-[#128C7E] text-white border-none"
                      >
                        <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp Us
                        </a>
                      </Button>
                    ) : (
                      <Button
                        asChild
                        variant="outline"
                        className="mt-4 border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-white"
                      >
                        <Link to="/contact">
                          Contact Us
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Info Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Project Info Card */}
              <Card className="border-2 border-accent-gold/20 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-4 bg-linear-to-br from-accent-gold/10 to-[#d97706]/5 rounded-2xl mb-4">
                      <Heart className="h-10 w-10 text-accent-gold" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Project Impact</h3>
                    <p className="text-sm text-muted-foreground">
                      Making a difference in communities
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-linear-to-br from-accent-gold/5 to-[#d97706]/5 border border-accent-gold/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="h-5 w-5 text-accent-gold" />
                        <span className="font-semibold text-sm">Date</span>
                      </div>
                      <p className="text-muted-foreground text-sm pl-8">
                        {new Date(project.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-linear-to-br from-secondary-600/5 to-[#1d4ed8]/5 border border-secondary-600/10">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="h-5 w-5 text-secondary-600" />
                        <span className="font-semibold text-sm">Location</span>
                      </div>
                      <p className="text-muted-foreground text-sm pl-8">{project.location}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <Button
                      asChild
                      className="w-full bg-linear-to-r from-accent-gold to-[#d97706] hover:from-[#d97706] hover:to-[#b45309]"
                    >
                      <Link to="/csr">
                        View More Stories
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Our Commitment Card */}
              <Card className="bg-linear-to-br from-primary-600/5 to-accent-gold/5 border-primary-600/20">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-3">Our CSR Commitment</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Heart className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                      <span>Community development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                      <span>Environmental sustainability</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                      <span>Education & empowerment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="h-4 w-4 text-primary-600 mt-0.5 shrink-0" />
                      <span>Worker welfare initiatives</span>
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