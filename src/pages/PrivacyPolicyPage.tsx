import { useApi } from '@/hooks/useApi';
import { policyApi, type PrivacyPolicy } from '@/api';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

function isPrivacyPolicy(value: unknown): value is PrivacyPolicy {
  return Boolean(value && typeof value === 'object' && 'content' in (value as any));
}

export default function PrivacyPolicyPage() {
  const { data } = useApi<PrivacyPolicy | Record<string, never>>(
    () => policyApi.getPrivacyPolicy(),
    []
  );

  const policy = isPrivacyPolicy(data) ? data : null;
  const updatedLabel = policy?.last_updated
    ? new Date(policy.last_updated).toLocaleDateString()
    : undefined;

  const contentParagraphs = policy?.content
    ? policy.content.split(/\n\n+/).filter(Boolean)
    : [];

  return (
    <div className="flex flex-col">
      <section className="relative bg-linear-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="container mx-auto px-4 py-24 max-w-4xl">
          <Badge variant="secondary" className="mb-4 flex items-center gap-2 w-fit">
            <ShieldCheck className="h-4 w-4" />
            Privacy & Data Protection
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {policy?.title ?? 'Privacy Policy'}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-2">
            We are committed to protecting the privacy and personal data of our candidates, clients
            and partners. This page explains what data we collect, how we use it and the rights you have.
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
                  <CardTitle>Information we collect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    When you apply for jobs, submit your CV or contact us, we collect personal information such as
                    your name, contact details, work experience, education history and documents required for
                    overseas employment processing.
                  </p>
                  <p>
                    For employers, we collect company details, contact information and information about your
                    manpower requirements.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How we use your information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <ul className="list-disc pl-6 space-y-1">
                    <li>To match candidates with suitable job opportunities in Nepal and abroad.</li>
                    <li>To process documentation, medical and travel arrangements required by law.</li>
                    <li>To communicate with you about your application, recruitment status or services.</li>
                    <li>To comply with legal and regulatory requirements in Nepal and destination countries.</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your rights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    You can contact us at any time to request access to your personal data, ask for corrections or
                    request deletion where applicable. We will respond in line with applicable data protection
                    regulations.
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

