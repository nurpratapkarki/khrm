// ==================== src/pages/JobsPage.tsx ====================
import { useState, useEffect } from 'react';
import { jobApi, industryApi, type JobFilters, type Job, type Industry, } from '@/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Briefcase, Clock, DollarSign, Users, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function JobsPage() {
  const [filters, setFilters] = useState<JobFilters>({
    keyword: '',
    country: '',
    industry: undefined,
    page: 1,
  });
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    fetchIndustries();
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const fetchIndustries = async () => {
    try {
	      const data = await industryApi.getIndustries();
	      const list = Array.isArray(data)
	        ? data
	        : (data as any)?.results ?? [];
	      setIndustries(list);
    } catch (error) {
      console.error('Error fetching industries:', error);
    }
  };

  const fetchCountries = async () => {
    try {
	      const data = await jobApi.getJobCountries();
	      const uniqueCountries = Array.isArray(data)
	        ? Array.from(new Set(data))
	        : [];
	      setCountries(uniqueCountries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await jobApi.getJobs(filters);
      setJobs(response.results);
      setTotalCount(response.count);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof JobFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalCount / 12);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Dream Job Abroad
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Explore {totalCount} exciting opportunities in UAE, Kuwait, and beyond
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Job title, keyword..."
                      value={filters.keyword}
                      onChange={(e) => handleFilterChange('keyword', e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Country</label>
                  <Select
	                    value={filters.country || 'all'}
	                    onValueChange={(value) =>
	                      handleFilterChange('country', value === 'all' ? '' : value)
	                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Countries" />
                    </SelectTrigger>
                    <SelectContent>
	                      <SelectItem value="all">All Countries</SelectItem>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Industry */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Industry</label>
                  <Select
	                    value={filters.industry?.toString() ?? 'all'}
	                    onValueChange={(value: string) =>
	                      handleFilterChange(
	                        'industry',
	                        value === 'all' ? undefined : parseInt(value, 10)
	                      )
	                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Industries" />
                    </SelectTrigger>
                    <SelectContent>
	                      <SelectItem value="all">All Industries</SelectItem>
                      {industries.map((industry) => (
                        <SelectItem key={industry.id} value={industry.id.toString()}>
                          {industry.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setFilters({ keyword: '', country: '', industry: undefined, page: 1 })}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {loading ? 'Loading...' : `${totalCount} Jobs Found`}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Page {filters.page} of {totalPages}
                </p>
              </div>
            </div>

            {/* Job Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
                      <div className="h-6 bg-muted rounded w-2/3"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-5/6"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Jobs Found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search criteria
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobs.map((job) => (
                    <Link key={job.id} to={`/jobs/${job.slug}`}>
                      <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group">
                        <CardHeader>
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant="secondary">{job.category_name}</Badge>
                            {job.is_featured && (
                              <Badge variant="default">Featured</Badge>
                            )}
                          </div>
                          <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                            {job.title}
                          </CardTitle>
                          <CardDescription className="space-y-1.5">
                            <div className="flex items-center gap-2 text-sm">
                              <Building2 className="h-4 w-4" />
                              {job.industry_name}
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4" />
                              {job.location}, {job.country}
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {job.salary_range && (
                            <div className="flex items-center gap-2 text-sm">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium text-primary">{job.salary_range}</span>
                            </div>
                          )}
                          {job.contract_duration && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              {job.contract_duration}
                            </div>
                          )}
                          <div className="flex items-center justify-between pt-2 border-t">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Users className="h-4 w-4" />
                              {job.vacancies} {job.vacancies === 1 ? 'vacancy' : 'vacancies'}
                            </div>
                            <Button size="sm" className="group-hover:bg-primary">
                              Apply Now
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(filters.page! - 1)}
                      disabled={filters.page === 1}
                    >
                      Previous
                    </Button>
                    {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <Button
                          key={pageNum}
                          variant={filters.page === pageNum ? 'default' : 'outline'}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(filters.page! + 1)}
                      disabled={filters.page === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}