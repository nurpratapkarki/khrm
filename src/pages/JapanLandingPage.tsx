import { Link } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { japanApi, type JapanLandingPage, type JapanBulletPoint } from '@/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

function renderBullets(points: JapanBulletPoint[], section: JapanBulletPoint['section']) {
  return points
    .filter((p) => p.section === section)
    .sort((a, b) => a.order - b.order)
    .map((point) => (
      <li key={point.id} className="flex gap-3">
        <CheckCircle2 className="h-5 w-5 text-[color:var(--japan-primary)] mt-0.5" />
        <div>
          {point.title && <div className="font-medium mb-0.5">{point.title}</div>}
          <p className="text-sm text-[color:var(--japan-foreground)]/80 whitespace-pre-line">
            {point.description}
          </p>
        </div>
      </li>
    ));
}

export default function JapanLandingPage() {
  const { data, loading, error } = useApi<JapanLandingPage | Record<string, never>>(
    () => japanApi.getJapanLanding(),
    [],
  );

  const hasData = data && (data as any).id;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--japan-primary)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Unable to load Japan landing content</h1>
          <p className="text-muted-foreground text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center max-w-xl">
          <h1 className="text-2xl font-bold mb-3">Japan-focused content coming soon</h1>
          <p className="text-muted-foreground mb-4">
            Once the Japan landing page is configured in the backend, this section will showcase why Japanese
            employers trust KHRM Nepal and how we prepare talent for Japan.
          </p>
          <Button asChild>
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const landing = data as JapanLandingPage;

  return (
    <div className="bg-[color:var(--japan-background)] text-[color:var(--japan-foreground)]">
      {/* Intro / Hero */}
      <section className="border-b bg-linear-to-br from-[color:var(--japan-primary-soft)]/40 to-[color:var(--japan-background)]">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4" variant="outline">
              Japan Focused Recruitment
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[color:var(--japan-foreground)]">
              {landing.intro_title}
            </h1>
            <p className="text-lg md:text-xl text-[color:var(--japan-foreground)]/80 mb-8">
              {landing.intro_description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[color:var(--japan-primary)] text-white hover:bg-[color:var(--japan-accent)]" asChild>
                <Link to="/employer-inquiry">Hire from Nepal for Japan</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/training">Explore Japan-focused training</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment & Preparation */}
      <section className="py-16 md:py-20 border-b">
        <div className="container mx-auto px-4 grid gap-10 md:grid-cols-2 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{landing.commitment_title}</h2>
            {landing.commitment_intro && (
              <p className="text-[color:var(--japan-foreground)]/80 whitespace-pre-line">
                {landing.commitment_intro}
              </p>
            )}
            <ul className="mt-4 space-y-3">
              {renderBullets(landing.bullet_points, 'commitment')}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{landing.preparation_title}</h2>
            {landing.preparation_intro && (
              <p className="text-[color:var(--japan-foreground)]/80 whitespace-pre-line">
                {landing.preparation_intro}
              </p>
            )}
            <ul className="mt-4 space-y-3">
              {renderBullets(landing.bullet_points, 'preparation')}
            </ul>
          </div>
        </div>
      </section>

      {/* Trust & Vision */}
      <section className="py-16 md:py-20 border-b bg-[color:var(--japan-primary-soft)]/40">
        <div className="container mx-auto px-4 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{landing.trust_title}</h2>
            {landing.trust_intro && (
              <p className="text-[color:var(--japan-foreground)]/80 whitespace-pre-line mb-4">
                {landing.trust_intro}
              </p>
            )}
            <ul className="space-y-3">
              {renderBullets(landing.bullet_points, 'trust')}
            </ul>
          </div>

          <div>
            <Card className="bg-white/80 border-[color:var(--japan-primary)]/20">
              <CardHeader>
                <CardTitle className="text-lg">{landing.vision_title}</CardTitle>
              </CardHeader>
              <CardContent>
                {landing.vision_intro && (
                  <p className="text-sm text-muted-foreground mb-3 whitespace-pre-line">
                    {landing.vision_intro}
                  </p>
                )}
                <ul className="space-y-2 text-sm">
                  {renderBullets(landing.bullet_points, 'vision')}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">People behind Japan recruitment</h2>
            <p className="text-[color:var(--japan-foreground)]/80">
              Meet the dedicated team that leads our Japan-focused recruitment, training, and partner support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {landing.team_members.map((member) => (
              <Card key={member.id} className="h-full flex flex-col overflow-hidden">
                {member.photo && (
                  <div className="h-40 w-full overflow-hidden">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-base">{member.name}</CardTitle>
                  {member.role && (
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  )}
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {member.bio && <p className="whitespace-pre-line">{member.bio}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

