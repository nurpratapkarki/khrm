import { Link, useParams } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { industryApi, type Industry, type Job, type Client } from '@/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Briefcase, Building2, Globe, Users } from 'lucide-react';


export default function IndustryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: industry, loading } = useApi<Industry>(() => industryApi.getIndustry(slug!), [slug]);
  const { data: jobs } = useApi<Job[]>(() => industryApi.getIndustryJobs(slug!), [slug]);
  const { data: clients } = useApi<Client[]>(() => industryApi.getIndustryClients(slug!), [slug]);

  if (loading || !industry) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  const jobList = jobs ?? [];
  const clientList = clients ?? [];

  return (
    <div className="bg-background min-h-screen">
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/industries">
              <ArrowLeft className="h-4 w-4 mr-1" />
              All industries
            </Link>
          </Button>
          <div className="text-right max-w-xl">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Industry</p>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-end gap-2">
              <span className="text-4xl hidden md:inline">{industry.icon}</span>
              {industry.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {industry.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  Key information about manpower demand and opportunities in this sector.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-relaxed">
                {industry.overview ? (
                  <p className="whitespace-pre-line">{industry.overview}</p>
                ) : (
                  <p>{industry.description}</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {industry.job_count != null && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>{industry.job_count} open roles</span>
                    </div>
                  )}
                  {industry.client_count != null && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{industry.client_count} active clients</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {jobList.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Open jobs in this industry</CardTitle>
                  <CardDescription>
                    Browse current vacancies and apply online.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {jobList.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <h3 className="font-semibold mb-1">{job.title}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-2">
                          <Globe className="h-3 w-3" />
                          {job.location}, {job.country}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {job.status_display && (
                          <Badge variant="outline" className="text-xs uppercase tracking-wide">
                            {job.status_display}
                          </Badge>
                        )}
                        <Button asChild size="sm">
                          <Link to={`/jobs/${job.slug}`}>View job</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {clientList.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Key clients
                  </CardTitle>
                  <CardDescription>
                    Selected employers we support in this sector.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {clientList.map((client) => (
                    <div key={client.id} className="flex items-center justify-between gap-3">
                      <span>{client.name}</span>
                      {client.website && (
                        <a
                          href={client.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-primary hover:underline"
                        >
                          Visit site
                        </a>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

