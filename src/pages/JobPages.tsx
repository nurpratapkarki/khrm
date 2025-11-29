// ==================== src/pages/JobsPage.tsx ====================
import { useState, useEffect, useCallback, useMemo } from 'react';
import { jobApi, industryApi, type JobFilters, type Job, type Industry } from '@/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Briefcase, Clock, DollarSign, Users, Search, Filter, X, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

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
  const prefersReducedMotion = useReducedMotion();

  const fetchIndustries = useCallback(async () => {
    try {
      const data = await industryApi.getIndustries();
      const list = Array.isArray(data)
        ? data
        : (data as any)?.results ?? [];
      setIndustries(list);
    } catch (error) {
      console.error('Error fetching industries:', error);
    }
  }, []);

  const fetchCountries = useCallback(async () => {
    try {
      const data = await jobApi.getJobCountries();
      const uniqueCountries = Array.isArray(data)
        ? Array.from(new Set(data))
        : [];
      setCountries(uniqueCountries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  }, []);

  const fetchJobs = useCallback(async () => {
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
  }, [filters]);

  const handleFilterChange = useCallback((key: keyof JobFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ keyword: '', country: '', industry: undefined, page: 1 });
  }, []);

  const hasActiveFilters = useMemo(() => {
    return filters.keyword !== '' || filters.country !== '' || filters.industry !== undefined;
  }, [filters]);

  useEffect(() => {
    fetchIndustries();
    fetchCountries();
  }, [fetchIndustries, fetchCountries]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const totalPages = useMemo(() => Math.ceil(totalCount / 12), [totalCount]);

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-primary-600/5 via-background to-secondary-600/5">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary-600 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent-gold/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Dream Job Abroad
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Explore {totalCount} exciting opportunities in UAE, Kuwait, and beyond
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-20 border-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="h-5 w-5 text-primary-600" />
                    Filters
                  </div>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="h-8 px-2 text-xs"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search Keywords</label>
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

                {/* Active Filters Display */}
                {hasActiveFilters && (
                  <div className="pt-4 border-t">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Active Filters:</p>
                    <div className="flex flex-wrap gap-2">
                      {filters.keyword && (
                        <Badge variant="secondary" className="text-xs">
                          "{filters.keyword}"
                          <button
                            onClick={() => handleFilterChange('keyword', '')}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                      {filters.country && (
                        <Badge variant="secondary" className="text-xs">
                          {filters.country}
                          <button
                            onClick={() => handleFilterChange('country', '')}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                      {filters.industry && (
                        <Badge variant="secondary" className="text-xs">
                          {industries.find(i => i.id === filters.industry)?.name}
                          <button
                            onClick={() => handleFilterChange('industry', undefined)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6 p-4 rounded-lg bg-linear-to-r from-primary-600/5 to-secondary-600/5 border">
              <div>
                <h2 className="text-2xl font-bold">
                  {loading ? 'Loading...' : `${totalCount} Jobs Found`}
                </h2>
                {totalPages > 1 && (
                  <p className="text-sm text-muted-foreground">
                    Page {filters.page} of {totalPages}
                  </p>
                )}
              </div>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="hidden md:flex"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All Filters
                </Button>
              )}
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
              <Card className="border-2">
                <CardContent className="py-16 text-center">
                  <div className="inline-flex p-4 bg-linear-to-br from-primary-600/10 to-secondary-600/5 rounded-2xl mb-4">
                    <Briefcase className="h-12 w-12 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Jobs Found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search criteria
                  </p>
                  {hasActiveFilters && (
                    <Button onClick={clearFilters}>
                      Clear All Filters
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.35, ease: 'easeOut', delay: prefersReducedMotion ? 0 : index * 0.03 }}
                    >
                      <Link to={`/jobs/${job.slug}`}>
                        <Card className="h-full border-2 hover:border-primary-600/30 hover:shadow-xl transition-all cursor-pointer group">
                          <CardHeader>
                            <div className="flex items-start justify-between mb-2 gap-2">
                              <Badge variant="secondary" className="shrink-0">
                                {job.category_name}
                              </Badge>
                              {job.is_featured && (
                                <Badge className="bg-linear-to-r from-accent-gold to-[#d97706]">
                                  <Star className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="group-hover:text-primary-600 transition-colors line-clamp-2">
                              {job.title}
                            </CardTitle>
                            <CardDescription className="space-y-1.5">
                              <div className="flex items-center gap-2 text-sm">
                                <Building2 className="h-4 w-4 text-secondary-600" />
                                {job.industry_name}
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-primary-600" />
                                {job.location}, {job.country}
                              </div>
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {job.salary_range && (
                              <div className="flex items-center gap-2 text-sm">
                                <DollarSign className="h-4 w-4 text-accent-gold" />
                                <span className="font-medium text-primary-600">{job.salary_range}</span>
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
                              <Button 
                                size="sm" 
                                className="bg-linear-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-[#991b1b]"
                              >
                                Apply Now
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
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
                          className={filters.page === pageNum ? 'bg-linear-to-r from-primary-600 to-primary-700' : ''}
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