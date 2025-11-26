
// ==================== src/pages/JobDetailPage.tsx ====================
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { jobApi, type Job } from '@/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building2, MapPin, DollarSign, Clock, Users, Calendar, ArrowLeft } from 'lucide-react';

export default function JobDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: job, loading } = useApi<Job>(() => jobApi.getJob(slug!), [slug]);
// There is no getRelatedJobs method in jobApi, so use getJobs with filters to fetch related jobs
const { data: relatedJobs } = useApi<Job[]>(
    () =>
        jobApi.getJobs({
            category: typeof job?.category === 'object' ? job?.category.id : job?.category, // ensure category is a number
            country: job?.country,   // assuming job.country is the filter key
        }).then(res => res.results),
    [job?.category, job?.country, job?.slug]
);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
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
    <div className="flex flex-col">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" onClick={() => navigate('/jobs')} className="mb-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-2">
                    <Badge variant="secondary">{job.category_name}</Badge>
                    <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
                      {job.status_display}
                    </Badge>
                    {job.is_featured && <Badge>Featured</Badge>}
                  </div>
                </div>
                <CardTitle className="text-3xl mb-2">{job.title}</CardTitle>
                <CardDescription className="space-y-2 text-base">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    <span>{job.industry_name}</span>
                    {typeof job.client === 'object' && job.client && (
                      <span className="text-muted-foreground">• {job.client.name}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span>{job.location}, {job.country}</span>
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                    {job.requirements}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            {job.responsibilities && (
              <Card>
                <CardHeader>
                  <CardTitle>Responsibilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                      {job.responsibilities}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Apply Card */}
              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle>Interested in this role?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" size="lg" asChild>
                    <Link to={`/jobs/${job.slug}/apply`}>
                      Apply Now
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    By applying, you agree to our terms and conditions
                  </p>
                </CardContent>
              </Card>

              {/* Job Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {job.salary_range && (
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="text-sm font-medium">Salary</div>
                        <div className="text-sm text-primary font-semibold">
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
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Related Jobs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {relatedJobs.map((relatedJob) => (
                      <Link
                        key={relatedJob.id}
                        to={`/jobs/${relatedJob.slug}`}
                        className="block p-3 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors"
                      >
                        <div className="font-medium text-sm line-clamp-2 mb-1">
                          {relatedJob.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {relatedJob.location}, {relatedJob.country}
                        </div>
                        {relatedJob.salary_range && (
                          <div className="text-xs text-primary font-medium mt-1">
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
