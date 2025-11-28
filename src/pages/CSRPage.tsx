import { Link } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { csrApi, type CSRProject, type PaginatedResponse } from '@/api';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
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
    <div className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <p className="text-sm uppercase tracking-wide text-primary mb-2">CSR &amp; Impact</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Our Community Impact Stories</h1>
          <p className="text-muted-foreground">
            Discover how KHRM contributes to communities in Nepal through responsible recruitment,
            training, and social initiatives.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-muted-foreground">No CSR projects have been published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="flex flex-col hover:shadow-md transition-shadow">
                {project.featured_image && (
                  <div className="h-40 w-full overflow-hidden rounded-t-lg">
                    <img
                      src={project.featured_image}
                      alt={project.title}
                      className="h-full w-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <CardHeader>
                  <p className="text-xs text-muted-foreground mb-1">
                    {new Date(project.date).toLocaleDateString()} | {project.location}
                  </p>
                  <CardTitle className="text-lg mb-1">
                    <Link to={`/csr/${project.slug}`} className="hover:text-primary">
                      {project.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {project.impact_statement}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Link to={`/csr/${project.slug}`} className="text-sm font-medium text-primary">
                    Read full story &rarr;
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

