// src/pages/HomePage.tsx
import { useApi } from '@/hooks/useApi';
import { homeApi, japanApi, type HomePageData, type JapanLandingPage } from '@/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Building2, Users, Globe, Star, Briefcase, CheckCircle2, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { data, loading, error } = useApi<HomePageData>(() => homeApi.getHomePageData(), []);
  const { data: japanLandingRaw } = useApi<JapanLandingPage | Record<string, never>>(
    () => japanApi.getJapanLanding(),
    [],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Data</h2>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  const japanLanding = japanLandingRaw && (japanLandingRaw as any).id
    ? (japanLandingRaw as JapanLandingPage)
    : null;

  return (
    <div className="flex flex-col">
      {/* Hero Section (global) */}
      <section className="relative bg-linear-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-1">
              Since {data?.company_info?.establishment_year}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {data?.company_info?.hero_headline}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {data?.company_info?.hero_subtext}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/employer-inquiry">
                  Hire From Nepal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link to="/jobs">
                  View Job Openings
                  <Briefcase className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="container mx-auto px-4 -mb-16 relative z-10">
          <div className="bg-card border shadow-xl rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-primary">
                  {data?.company_info?.total_deployments.toLocaleString()}+
                </div>
                <div className="text-muted-foreground font-medium">Workers Deployed</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-primary">Licensed</div>
                <div className="text-muted-foreground font-medium">Government Approved</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-primary">{data?.offices.length}</div>
                <div className="text-muted-foreground font-medium">Global Offices</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Japan-focused section (highlights Japan as key destination) */}
      {japanLanding && (
        <section className="py-20 bg-[color:var(--japan-background)] border-b">
          <div className="container mx-auto px-4 grid gap-10 md:grid-cols-2 items-start">
            <div className="space-y-4">
              <Badge className="w-fit" variant="outline">
                Japan Focused
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[color:var(--japan-foreground)]">
                {japanLanding.intro_title}
              </h2>
              <p className="text-[color:var(--japan-foreground)]/80 whitespace-pre-line">
                {japanLanding.intro_description}
              </p>
              {japanLanding.commitment_intro && (
                <p className="text-sm text-[color:var(--japan-foreground)]/70">
                  {japanLanding.commitment_intro}
                </p>
              )}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  size="lg"
                  className="bg-[color:var(--japan-primary)] text-white hover:bg-[color:var(--japan-accent)]"
                  asChild
                >
                  <Link to="/japan">Explore Japan Programme</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/employer-inquiry">Request Japan manpower</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl bg-white shadow-sm border border-[color:var(--japan-primary)]/20 p-6 space-y-4">
              <h3 className="text-xl font-semibold mb-1">{japanLanding.preparation_title}</h3>
              {japanLanding.preparation_intro && (
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {japanLanding.preparation_intro}
                </p>
              )}
              <ul className="space-y-2 text-sm">
                {japanLanding.bullet_points
                  .filter((p) => p.section === 'preparation')
                  .sort((a, b) => a.order - b.order)
                  .slice(0, 4)
                  .map((point) => (
                    <li key={point.id} className="flex gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[color:var(--japan-primary)] mt-0.5" />
                      <div>
                        {point.title && (
                          <div className="font-medium leading-snug">{point.title}</div>
                        )}
                        <p className="text-muted-foreground whitespace-pre-line">
                          {point.description}
                        </p>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Trusted Clients Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted By Leading Companies
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We've successfully placed thousands of workers with top companies across the Middle East
            </p>
          </div>

          {/* Client Logos Carousel */}
          <div className="relative overflow-hidden">
            <div className="flex gap-8 items-center justify-center flex-wrap">
              {data?.featured_clients.map((client) => (
                <div
                  key={client.id}
                  className="shrink-0 w-32 h-20 md:w-40 md:h-24 bg-white rounded-lg border p-4 flex items-center justify-center hover:shadow-lg transition-shadow"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Industries We Serve
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Expert manpower solutions across multiple sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.industries.map((industry) => (
              <Link key={industry.id} to={`/industries/${industry.slug}`}>
                <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                      {industry.icon}
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {industry.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {industry.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary/10">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose KHRM */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose KHRM?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
              Your trusted partner for international recruitment since {data?.company_info?.establishment_year}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-8 border border-primary-foreground/20">
              <div className="mb-4">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Licensed & Compliant</h3>
              <p className="text-primary-foreground/80">
                Fully licensed by the Government of Nepal and compliant with international labor standards
              </p>
            </div>

            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-8 border border-primary-foreground/20">
              <div className="mb-4">
                <TrendingUp className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Proven Track Record</h3>
              <p className="text-primary-foreground/80">
                Over {data?.company_info?.total_deployments.toLocaleString()} successful deployments across multiple industries
              </p>
            </div>

            <div className="bg-primary-foreground/10 backdrop-blur rounded-xl p-8 border border-primary-foreground/20">
              <div className="mb-4">
                <Globe className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Global Presence</h3>
              <p className="text-primary-foreground/80">
                Offices in Nepal, UAE, and Kuwait ensuring seamless service and support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Featured Job Opportunities
              </h2>
              <p className="text-muted-foreground text-lg">
                Explore exciting career opportunities abroad
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/jobs">
                View All Jobs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.featured_jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{job.category_name}</Badge>
                    <Badge variant="outline">{job.status_display}</Badge>
                  </div>
                  <CardTitle className="text-xl hover:text-primary transition-colors">
                    <Link to={`/jobs/${job.slug}`}>{job.title}</Link>
                  </CardTitle>
                  <CardDescription className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4" />
                      {job.industry_name}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4" />
                      {job.location}, {job.country}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      {job.salary_range && (
                        <div className="text-sm font-semibold text-primary">
                          {job.salary_range}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground">
                        {job.vacancies} {job.vacancies === 1 ? 'vacancy' : 'vacancies'}
                      </div>
                    </div>
                    <Button size="sm" asChild>
                      <Link to={`/jobs/${job.slug}`}>Apply Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hear from companies that trust KHRM for their manpower needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data?.testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="relative">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">
                    "{testimonial.testimonial_text}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    {testimonial.person_photo && (
                      <img
                        src={testimonial.person_photo}
                        alt={testimonial.person_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="font-semibold">{testimonial.person_name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.person_position}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.company_name}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-linear-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Build Your Team?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Connect with skilled professionals from Nepal. Let us help you find the perfect candidates for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <Link to="/employer-inquiry">
                Request Manpower
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-primary-foreground/20 hover:bg-primary-foreground/10" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}