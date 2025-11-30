import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { industryApi, type Industry } from '@/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Building2, Briefcase, Users, ArrowRight } from 'lucide-react';

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIndustries = async () => {
      setLoading(true);
      try {
        const data = await industryApi.getIndustries();
        const list = Array.isArray(data) ? data : (data as any)?.results ?? [];
        setIndustries(list);
      } catch (error) {
        console.error('Error loading industries', error);
      } finally {
        setLoading(false);
      }
    };
    fetchIndustries();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-600/5 via-background to-secondary-600/5">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 border-b overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-secondary-600/10 via-muted/30 to-accent-gold/10" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-secondary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-primary-600 via-accent-gold to-secondary-600 bg-clip-text text-transparent">
              Industries We Serve
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore the key sectors where KHRM provides skilled and semi-skilled manpower to
              employers across the Gulf and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-12 w-12 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry) => (
                <Link key={industry.id} to={`/industries/${industry.slug}`}>
                  <Card className="h-full border-2 hover:border-primary-600/30 hover:shadow-xl transition-all duration-300 group cursor-pointer bg-background/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-5xl p-3 bg-linear-to-br from-primary-600/10 to-accent-gold/5 rounded-2xl group-hover:scale-110 transition-transform">
                          {industry.icon}
                        </div>
                        <div className="flex flex-col gap-2 items-end text-xs text-muted-foreground">
                          {industry.job_count != null && (
                            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary-600/10 border border-secondary-600/20">
                              <Briefcase className="h-3 w-3 text-secondary-600" />
                              <span className="font-medium">{industry.job_count} jobs</span>
                            </div>
                          )}
                          {industry.client_count != null && (
                            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent-gold/10 border border-accent-gold/20">
                              <Users className="h-3 w-3 text-accent-gold" />
                              <span className="font-medium">{industry.client_count} clients</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2 mb-2">
                        <Building2 className="h-5 w-5 text-primary-600 mt-0.5 shrink-0" />
                        <CardTitle className="group-hover:text-primary-600 transition-colors">
                          {industry.name}
                        </CardTitle>
                      </div>
                      
                      <CardDescription className="line-clamp-3 leading-relaxed">
                        {industry.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between text-sm font-medium text-primary-600 group-hover:text-primary-700">
                        <span>View details</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}