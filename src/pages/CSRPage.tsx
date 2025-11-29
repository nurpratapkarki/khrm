import { Link } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { csrApi, type CSRProject, type PaginatedResponse } from '@/api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Heart, Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';

export default function CSRPage() {
  const { data, loading, error } = useApi<CSRProject[] | PaginatedResponse<CSRProject>>(
    () => csrApi.getProjects(),
    [],
  );

  const projects: CSRProject[] = data
    ? Array.isArray(data)
      ? data
      : (data as PaginatedResponse<CSRProject>).results ?? []
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-gold" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Unable to load impact stories</h1>
          <p className="text-muted-foreground text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-accent-gold/5 via-background to-primary-600/5">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 border-b overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-accent-gold/10 via-muted/30 to-primary-600/10" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-accent-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-accent-gold/10 to-primary-600/10 border border-accent-gold/20 mb-4">
              <Heart className="h-5 w-5 text-accent-gold" />
              <span className="text-sm font-semibold">CSR & Impact</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-accent-gold via-[#d97706] to-primary-600 bg-clip-text text-transparent">
              Our Community Impact Stories
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover how KHRM contributes to communities in Nepal through responsible recruitment,
              training, and social initiatives.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {projects.length === 0 ? (
            <Card className="max-w-2xl mx-auto border-2">
              <CardContent className="py-16 text-center">
                <div className="inline-flex p-4 bg-linear-to-br from-accent-gold/10 to-primary-600/5 rounded-2xl mb-4">
                  <Sparkles className="h-12 w-12 text-accent-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">
                  No CSR projects have been published yet. Check back soon!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link key={project.id} to={`/csr/${project.slug}`}>
                  <Card className="h-full flex flex-col border-2 hover:border-accent-gold/30 hover:shadow-xl transition-all group overflow-hidden">
                    {project.featured_image && (
                      <div className="relative h-48 w-full overflow-hidden bg-muted">
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent z-10" />
                        <img
                          src={project.featured_image}
                          alt={project.title}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 z-20">
                          <div className="p-2 bg-white/90 backdrop-blur-sm rounded-full">
                            <Heart className="h-4 w-4 text-primary-600" />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2 flex-wrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-accent-gold" />
                          <span>{new Date(project.date).toLocaleDateString()}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-primary-600" />
                          <span>{project.location}</span>
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl group-hover:text-accent-gold transition-colors line-clamp-2">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="mt-auto space-y-4">
                      <CardDescription className="line-clamp-3 leading-relaxed">
                        {project.impact_statement}
                      </CardDescription>
                      
                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-sm font-medium text-accent-gold">Read Full Story</span>
                        <ArrowRight className="h-4 w-4 text-accent-gold group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats/Impact Section */}
      {projects.length > 0 && (
        <section className="py-12 bg-linear-to-r from-accent-gold to-[#d97706] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Making a Difference Together
              </h2>
              <p className="text-white/90 mb-8">
                Our commitment to corporate social responsibility goes beyond business. We believe in creating
                lasting positive impact in the communities we serve.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-3xl font-bold mb-2">{projects.length}+</div>
                  <div className="text-white/80">Impact Stories</div>
                </div>
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-3xl font-bold mb-2">100%</div>
                  <div className="text-white/80">Community Focused</div>
                </div>
                <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <div className="text-3xl font-bold mb-2">∞</div>
                  <div className="text-white/80">Lasting Impact</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}