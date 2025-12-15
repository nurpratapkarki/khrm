// ==================== src/pages/JobDetailPage.tsx ====================
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { jobApi, type Job } from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building2, MapPin, DollarSign, Clock, Users, Calendar, ArrowLeft, FileText, CheckCircle2, Briefcase, Star } from 'lucide-react';

export default function JobDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: job, loading } = useApi<Job>(() => jobApi.getJob(slug!), [slug]);

  const { data: relatedJobs } = useApi<Job[]>(
    () =>
      jobApi.getJobs({
        category: typeof job?.category === 'object' ? job?.category.id : job?.category,
        country: job?.country,
      }).then(res => res.results),
    [job?.category, job?.country, job?.slug]
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
        <Button onClick={() => navigate('/jobs')}>Back to Jobs</Button>
      </div>
    );
  }

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
            onClick={() => navigate('/jobs')}
            className="mb-6 text-white hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 max-w-full">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 whitespace-normal text-left h-auto py-1">
                  <span className="inline">{job.category_name}</span>
                </Badge>
                <Badge variant="secondary" className={`${job.status === 'open' ? 'bg-accent-gold/30 text-white border-accent-gold/50' : 'bg-white/20 text-white border-white/30'} whitespace-normal text-left h-auto py-1`}>
                  <span className="inline">{job.status_display}</span>
                </Badge>
                {job.is_featured && (
                  <Badge variant="secondary" className="bg-accent-gold/30 text-white border-accent-gold/50 whitespace-normal text-left h-auto py-1">
                    <Star className="h-3 w-3 mr-1 shrink-0 inline" />
                    <span className="inline">Featured</span>
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl font-bold break-words hyphens-auto">{job.title}</h1>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-white/90">
                  <Building2 className="h-5 w-5 shrink-0" />
                  <span className="text-lg break-words">
                    {job.industry_name}
                    {typeof job.client === 'object' && job.client && (
                      <span className="text-white/70"> • {job.client.name}</span>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="h-5 w-5 shrink-0" />
                  <span className="text-lg break-words">{job.location}, {job.country}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {job.salary_range && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 max-w-full">
                    <DollarSign className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-medium break-words whitespace-normal">{job.salary_range}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 max-w-full">
                  <Users className="h-4 w-4 shrink-0" />
                  <span className="text-sm font-medium break-words whitespace-normal">{job.vacancies} {job.vacancies === 1 ? 'position' : 'positions'}</span>
                </div>
                {job.contract_duration && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 max-w-full">
                    <Clock className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-medium break-words whitespace-normal">{job.contract_duration}</span>
                  </div>
                )}
              </div>
            </div>

            {job.image && (
              <div className="relative mt-8 lg:mt-0 w-full">
                <div className="relative rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 max-w-[90vw] mx-auto lg:max-w-full">
                  <img
                    src={job.image}
                    alt={job.title}
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
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <Card className="border-2 hover:border-primary-600/20 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-linear-to-br from-primary-600/10 to-primary-700/5 rounded-xl">
                    <FileText className="h-6 w-6 text-primary-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Job Description</h2>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-primary-600 to-accent-gold rounded-full" />
                  <div className="pl-6">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {job.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="border-2 hover:border-secondary-600/20 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-linear-to-br from-secondary-600/10 to-[#1d4ed8]/5 rounded-xl">
                    <CheckCircle2 className="h-6 w-6 text-secondary-600" />
                  </div>
                  <h2 className="text-2xl font-bold">Requirements</h2>
                </div>
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-secondary-600 to-accent-gold rounded-full" />
                  <div className="pl-6 space-y-3">
                    {job.requirements.split('\n').map((line, idx) =>
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

            {/* Responsibilities */}
            {job.responsibilities && (
              <Card className="border-2 hover:border-accent-gold/20 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-linear-to-br from-accent-gold/10 to-[#d97706]/5 rounded-xl">
                      <Briefcase className="h-6 w-6 text-accent-gold" />
                    </div>
                    <h2 className="text-2xl font-bold">Responsibilities</h2>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-accent-gold to-primary-600 rounded-full" />
                    <div className="pl-6 space-y-3">
                      {job.responsibilities.split('\n').map((line, idx) =>
                        line.trim() && (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="mt-1.5 w-2 h-2 rounded-full bg-accent-gold shrink-0" />
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

          {/* Right Column - Apply & Details Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Apply Card */}


              {/* Job Details */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {job.salary_range && (
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-accent-gold mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Salary</div>
                        <div className="text-sm text-primary-600 font-semibold">
                          {job.salary_range}
                        </div>
                      </div>
                    </div>
                  )}

                  {job.contract_duration && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Contract Duration</div>
                        <div className="text-sm text-muted-foreground">
                          {job.contract_duration}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="text-sm font-medium">Vacancies</div>
                      <div className="text-sm text-muted-foreground">
                        {job.vacancies} {job.vacancies === 1 ? 'position' : 'positions'}
                      </div>
                    </div>
                  </div>

                  {job.application_deadline && (
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Deadline</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(job.application_deadline).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  )}

                  <Separator />

                  <div className="text-xs text-muted-foreground">
                    Posted on {new Date(job.created_at).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>

              {/* Related Jobs */}
              {relatedJobs && relatedJobs.length > 0 && (
                <Card className="bg-linear-to-br from-accent-gold/5 to-primary-600/5 border-accent-gold/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Related Jobs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {relatedJobs.slice(0, 4).map((relatedJob) => (
                      <Link
                        key={relatedJob.id}
                        to={`/jobs/${relatedJob.slug}`}
                        className="block p-3 rounded-lg border bg-background hover:border-primary-600/30 hover:bg-primary-600/5 transition-colors"
                      >
                        <div className="font-medium text-sm line-clamp-2 mb-1">
                          {relatedJob.title}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {relatedJob.location}, {relatedJob.country}
                        </div>
                        {relatedJob.salary_range && (
                          <div className="text-xs text-primary-600 font-medium mt-1 flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {relatedJob.salary_range}
                          </div>
                        )}
                      </Link>
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