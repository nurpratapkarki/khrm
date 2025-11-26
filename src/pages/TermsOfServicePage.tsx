import { useApi } from '@/hooks/useApi';
import { policyApi, type TermsOfService } from '@/api';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

function isTerms(value: unknown): value is TermsOfService {
  return Boolean(value && typeof value === 'object' && 'content' in (value as any));
}

export default function TermsOfServicePage() {
  const { data } = useApi<TermsOfService | Record<string, never>>(
    () => policyApi.getTermsOfService(),
    []
  );

  const terms = isTerms(data) ? data : null;
  const updatedLabel = terms?.last_updated
    ? new Date(terms.last_updated).toLocaleDateString()
    : undefined;

  const contentParagraphs = terms?.content
    ? terms.content.split(/\n\n+/).filter(Boolean)
    : [];

  return (
    <div className="flex flex-col">
      <section className="relative bg-linear-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="container mx-auto px-4 py-24 max-w-4xl">
          <Badge variant="secondary" className="mb-4 flex items-center gap-2 w-fit">
            <FileText className="h-4 w-4" />
            Terms & Conditions
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {terms?.title ?? 'Terms of Service'}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-2">
            These terms govern how you may use our recruitment services, website and related offerings as
            a candidate or an employer.
          </p>
          {updatedLabel && (
            <p className="text-xs text-muted-foreground">Last updated: {updatedLabel}</p>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          {contentParagraphs.length > 0 ? (
            <Card>
              <CardContent className="prose max-w-none dark:prose-invert py-6">
                {contentParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Use of our services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Information you provide must be accurate, complete and not misleading.</li>
                    <li>You agree not to pay any unauthorised fees to third parties claiming to represent us.</li>
                    <li>
                      We may update or withdraw job postings, requirements or processes based on client needs or
                      regulatory changes.
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Responsibilities of candidates and employers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    Candidates are responsible for providing truthful information, attending interviews and
                    complying with medical, documentation and travel requirements. Employers are responsible
                    for providing valid demand letters, contracts and working conditions that comply with
                    applicable labour laws.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Limitation of liability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    While we take reasonable care in matching candidates and employers, we cannot guarantee
                    specific outcomes such as visa approvals or employment durations. Our liability is
                    limited to the extent permitted by applicable law.
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

