import { useApi } from '@/hooks/useApi';
import { policyApi, type TermsOfService } from '@/api';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Calendar } from 'lucide-react';

function isTerms(value: unknown): value is TermsOfService {
  return Boolean(value && typeof value === 'object' && 'content' in (value as any));
}

export default function TermsOfServicePage() {
  const { data, loading } = useApi<TermsOfService | Record<string, never>>(
    () => policyApi.getTermsOfService(),
    []
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  const terms = isTerms(data) ? data : null;
  const updatedLabel = terms?.last_updated
    ? new Date(terms.last_updated).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : undefined;

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-primary-600/5 via-background to-secondary-600/5">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary-600 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent-gold/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-16 md:py-20 max-w-4xl relative z-10">
          <Badge variant="secondary" className="mb-4 flex items-center gap-2 w-fit bg-white/20 text-white border-white/30">
            <FileText className="h-4 w-4" />
            Terms & Conditions
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {terms?.title ?? 'Terms of Service'}
          </h1>
          <p className="text-xl text-white/90 leading-relaxed mb-4">
            These terms govern how you may use our recruitment services, website and related offerings as
            a candidate or an employer.
          </p>
          {updatedLabel && (
            <div className="flex items-center gap-2 text-white/80">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Last updated: {updatedLabel}</span>
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-2 shadow-xl">
            <CardContent className="prose prose-lg max-w-none dark:prose-invert py-8 px-6 md:px-10">
              {terms?.content ? (
                <div 
                  className="terms-content"
                  dangerouslySetInnerHTML={{ __html: terms.content }}
                  style={{
                    lineHeight: '1.8',
                  }}
                />
              ) : (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <div className="inline-flex p-4 bg-linear-to-br from-primary-600/10 to-primary-700/5 rounded-2xl mb-4">
                      <FileText className="h-12 w-12 text-primary-600" />
                    </div>
                    <p className="text-muted-foreground">
                      Terms of service content will be available soon.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}