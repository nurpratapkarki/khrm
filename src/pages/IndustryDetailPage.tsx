import { Link, useParams } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { industryApi, companyApi, type Industry, type Job, type Client, type Office } from '@/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Briefcase, Building2, Users, MapPin, ExternalLink, Target, MessageCircle, BookOpen } from 'lucide-react';

export default function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: industry, loading } = useApi<Industry>(() => industryApi.getIndustry(slug!), [slug]);
  const { data: jobs } = useApi<Job[]>(() => industryApi.getIndustryJobs(slug!), [slug]);
  const { data: clients } = useApi<Client[]>(() => industryApi.getIndustryClients(slug!), [slug]);
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

  if (loading || !industry) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  const jobList = jobs ?? [];
  const clientList = clients ?? [];

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-600/5 via-background to-secondary-600/5">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-secondary-600 to-[#1d4ed8] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent-gold/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <Button
            variant="ghost"
            asChild
            className="mb-6 text-white hover:text-white hover:bg-white/10"
          >
            <Link to="/industries" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              All Industries
            </Link>
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 max-w-full">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 whitespace-normal text-left h-auto py-1">
                <Building2 className="h-3 w-3 mr-1 shrink-0 inline" />
                <span className="inline">Industry Sector</span>
              </Badge>

              <div className="flex items-center gap-4">
                <div className="text-6xl p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shrink-0">
                  {industry.icon}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold break-words hyphens-auto">{industry.name}</h1>
              </div>

              <p className="text-lg md:text-xl text-white/90 leading-relaxed break-words">
                {industry.description}
              </p>

              <div className="flex flex-wrap gap-4">
                {industry.job_count != null && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 max-w-full">
                    <Briefcase className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-medium break-words whitespace-normal">{industry.job_count} open roles</span>
                  </div>
                )}
                {industry.client_count != null && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-gold/20 backdrop-blur-sm border border-accent-gold/30 max-w-full">
                    <Users className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-medium break-words whitespace-normal">{industry.client_count} active clients</span>
                  </div>
                )}
              </div>
            </div>

            {industry.image && (
              <div className="relative mt-8 lg:mt-0 w-full">
                <div className="relative rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 max-w-[90vw] mx-auto lg:max-w-full">
                  <img
                    src={industry.image}
                    alt={industry.name}
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
          {/* Left Column - Overview & Jobs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="border-2 hover:border-secondary-600/20 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-linear-to-br from-secondary-600/10 to-[#1d4ed8]/5 rounded-xl">
                    <Target className="h-6 w-6 text-secondary-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Industry Overview</h2>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-secondary-600 to-accent-gold rounded-full" />
                  <div className="pl-6">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {industry.overview || industry.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {!industry.overview && !industry.description && (
              <Card className="border-2 border-accent-gold/20 bg-linear-to-br from-accent-gold/5 to-transparent">
                <CardContent className="pt-8 pb-8">
                  <div className="text-center space-y-4">
                    <div className="inline-flex p-4 bg-white rounded-full shadow-sm mb-2">
                      <BookOpen className="h-8 w-8 text-accent-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Details Available on Request</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Detailed industry information will be shared upon request.
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

            {/* Open Jobs */}
            {jobList.length > 0 && (
              <Card className="border-2 hover:border-primary-600/20 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-linear-to-br from-primary-600/10 to-primary-700/5 rounded-xl">
                      <Briefcase className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Open Jobs in This Industry</CardTitle>
                      <CardDescription>
                        Browse current vacancies and apply online
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {jobList.map((job) => (
                    <div
                      key={job.id}
                      className="border-2 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-primary-600/30 hover:bg-primary-600/5 transition-all"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-secondary-600" />
                            <span>{job.location}, {job.country}</span>
                          </div>
                          {job.status_display && (
                            <Badge variant="outline" className="text-xs">
                              {job.status_display}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button
                        asChild
                        className="bg-linear-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-[#991b1b]"
                      >
                        <Link to={`/jobs/${job.slug}`}>View Job</Link>
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Clients */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {clientList.length > 0 && (
                <Card className="border-2 border-accent-gold/20 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-linear-to-br from-accent-gold/10 to-[#d97706]/5 rounded-xl">
                        <Building2 className="h-6 w-6 text-accent-gold" />
                      </div>
                      <div>
                        <CardTitle>Key Clients</CardTitle>
                        <CardDescription className="text-xs">
                          Selected employers we support
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {clientList.map((client) => (
                      <div
                        key={client.id}
                        className="flex items-center justify-between gap-3 p-3 rounded-lg border hover:border-accent-gold/30 hover:bg-accent-gold/5 transition-colors"
                      >
                        <span className="font-medium text-sm">{client.name}</span>
                        {client.website && (
                          <Button
                            size="sm"
                            variant="ghost"
                            asChild
                            className="h-8 px-2"
                          >
                            <a
                              href={client.website}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}