import { useParams, Link } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { careersApi, type Career } from '@/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function CareerDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: career, loading, error } = useApi<Career | null>(
    () => (slug ? careersApi.getCareer(slug) : Promise.resolve(null)),
    [slug],
  );

  if (!slug) {
    return null;
  }

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
          <h1 className="text-2xl font-bold mb-2">Unable to load career</h1>
          <p className="text-muted-foreground text-sm">{error.message}</p>
          <Button asChild className="mt-4">
            <Link to="/careers">Back to careers</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Career not found</h1>
          <Button asChild className="mt-4">
            <Link to="/careers">Back to careers</Link>
          </Button>
        </div>
      </div>
    );
  }

  const canApplyByEmail = !!career.application_email;
  const canApplyByUrl = !!career.apply_url;

  return (
    <div className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6 text-sm text-muted-foreground flex items-center gap-2">
          <Link to="/careers" className="hover:text-primary">
            Careers
          </Link>
          <span>/</span>
          <span>{career.title}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{career.title}</h1>
            <p className="text-muted-foreground mb-2">{career.location}</p>
            <div className="flex flex-wrap gap-2">
              {career.department && <Badge variant="outline">{career.department}</Badge>}
              {career.employment_type && <Badge>{career.employment_type}</Badge>}
            </div>
          </div>
          <div className="flex flex-col gap-2 min-w-[200px]">
            {canApplyByEmail && (
              <Button asChild>
                <a href={`mailto:${career.application_email}?subject=${encodeURIComponent(career.title)}`}>
                  Apply via Email
                </a>
              </Button>
            )}
            {canApplyByUrl && (
              <Button variant={canApplyByEmail ? 'outline' : 'default'} asChild>
                <a href={career.apply_url!} target="_blank" rel="noopener noreferrer">
                  Apply Online
                </a>
              </Button>
            )}
          </div>
        </div>

        {career.summary && (
          <p className="text-lg text-muted-foreground mb-6">{career.summary}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {career.responsibilities && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Key Responsibilities</h2>
              <p className="whitespace-pre-line text-muted-foreground">{career.responsibilities}</p>
            </div>
          )}
          {career.requirements && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Requirements</h2>
              <p className="whitespace-pre-line text-muted-foreground">{career.requirements}</p>
            </div>
          )}
        </div>

        <div className="mt-10">
          <Button variant="outline" asChild>
            <Link to="/careers">Back to all careers</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

