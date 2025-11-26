import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { industryApi, type Industry } from '@/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Briefcase, Users } from 'lucide-react';


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
    <div className="bg-background min-h-screen">
      <section className="py-16 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Industries We Serve</h1>
          <p className="text-muted-foreground max-w-2xl">
            Explore the key sectors where KHRM provides skilled and semi-skilled manpower to
            employers across the Gulf and beyond.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry) => (
                <Link key={industry.id} to={`/industries/${industry.slug}`}>
                  <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all group cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-4xl">
                          {industry.icon}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          {industry.job_count != null && (
                            <span className="inline-flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {industry.job_count} jobs
                            </span>
                          )}
                          {industry.client_count != null && (
                            <span className="inline-flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {industry.client_count} clients
                            </span>
                          )}
                        </div>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        {industry.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-3 mt-2">
                        {industry.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full justify-between">
                        View details
                        <span aria-hidden>→</span>
                      </Button>
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

