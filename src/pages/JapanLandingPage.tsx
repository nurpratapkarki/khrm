import { Link } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { japanApi, japanprogramApi, type JapanLandingPage, type JapanBulletPoint, type JapanProgramType } from '@/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { getImageUrl } from '@/lib/utils';

function renderBullets(points: JapanBulletPoint[], section: JapanBulletPoint['section']) {
  return points
    .filter((p) => p.section === section)
    .sort((a, b) => a.order - b.order)
    .map((point) => (
      <li key={point.id} className="flex gap-3">
        <CheckCircle2 className="h-5 w-5 text-(--japan-primary) mt-0.5" />
        <div>
          {point.title && <div className="font-medium mb-0.5">{point.title}</div>}
          <p className="text-sm text-(--japan-foreground)/80 whitespace-pre-line">
            {point.description}
          </p>
        </div>
      </li>
    ));
}

function TeamMemberCard({ member }: { member: any }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const bioLength = member.bio?.length || 0;
  const shouldTruncate = bioLength > 150;

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      {/* Photo Section */}
      {member.photo && (
        <div className="relative h-56 w-full overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
          <img
            src={getImageUrl(member.photo)}
            alt={member.name}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
        </div>
      )}

      {/* Content Section */}
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg font-bold text-(--japan-foreground)">
          {member.name}
        </CardTitle>
        {member.role && (
          <div className="flex items-center gap-2">
            <div className="h-1 w-8 bg-(--japan-primary) rounded-full" />
            <p className="text-sm font-medium text-(--japan-primary)">
              {member.role}
            </p>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {member.bio && (
          <div className="space-y-3">
            <p
              className={`text-sm text-muted-foreground whitespace-pre-line leading-relaxed ${!isExpanded && shouldTruncate ? 'line-clamp-3' : ''
                }`}
            >
              {member.bio}
            </p>

            {shouldTruncate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full text-xs text-(--japan-primary) hover:text-(--japan-accent) hover:bg-(--japan-primary)/5 -mx-2"
              >
                {isExpanded ? (
                  <>
                    Show Less <ChevronUp className="ml-1 h-3 w-3" />
                  </>
                ) : (
                  <>
                    Read More <ChevronDown className="ml-1 h-3 w-3" />
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ProgramCard({ program }: { program: JapanProgramType }) {
  const overviewLength = program.overview?.length || 0;
  const truncatedOverview = overviewLength > 200
    ? program.overview.substring(0, 200) + '...'
    : program.overview;

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-2 hover:border-(--japan-primary)/30">
      {/* Image Section */}
      {program.image && (
        <div className="relative h-48 w-full overflow-hidden bg-linear-to-br from-(--japan-primary-soft)/20 to-(--japan-primary-soft)/10">
          <img
            src={getImageUrl(program.image)}
            alt={program.program_type_display}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          <Badge className="absolute top-4 left-4 bg-(--japan-primary) text-white border-none">
            {program.program_type_display}
          </Badge>
        </div>
      )}

      {/* Content Section */}
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl font-bold text-(--japan-foreground)">
          {program.program_type_display}
        </CardTitle>
        {program.subtitle && (
          <p className="text-sm font-medium text-(--japan-primary)">
            {program.subtitle}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
          {truncatedOverview}
        </p>

        <Button
          asChild
          className="w-full bg-(--japan-primary) hover:bg-(--japan-accent) text-white"
        >
          <Link to={`/japan/programs/${program.id}`} className="flex items-center justify-center gap-2">
            Read More <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}


export default function JapanPage() {
  const { data, loading, error } = useApi<JapanLandingPage | Record<string, never>>(
    () => japanApi.getJapanLanding(),
    [],
  );

  const { data: programs, loading: programsLoading } = useApi<JapanProgramType[]>(
    () => japanprogramApi.getJapanPrograms(),
    [],
  );

  const hasData = data && (data as any).id;
  const prefersReducedMotion = useReducedMotion();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--japan-primary)" />
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
    <div className="bg-(--japan-background) text-(--japan-foreground)">
      {/* Intro / Hero */}
      <section className="border-b bg-linear-to-br from-(--japan-primary-soft)/40 to-(--japan-background)">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <Badge className="mb-4" variant="outline">
              Japan Focused Recruitment
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-(--japan-foreground)">
              {landing.intro_title}
            </h1>
            <p className="text-lg md:text-xl text-(--japan-foreground)/80 mb-8">
              {landing.intro_description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Commitment & Preparation */}
      <section className="py-16 md:py-20 border-b">
        <div className="container mx-auto px-4 grid gap-10 md:grid-cols-2 items-start">
          <motion.div
            className="space-y-4"
            initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            {landing.commitment_image && (
              <div className="mb-4 rounded-2xl overflow-hidden border border-(--japan-primary)/20 bg-white/80">
                <img
                  src={getImageUrl(landing.commitment_image)}
                  alt="Commitment section illustration"
                  className="h-52 w-full object-cover"
                />
              </div>
            )}
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{landing.commitment_title}</h2>
            {landing.commitment_intro && (
              <p className="text-(--japan-foreground)/80 whitespace-pre-line">
                {landing.commitment_intro}
              </p>
            )}
            <ul className="mt-4 space-y-3">
              {renderBullets(landing.bullet_points, 'commitment')}
            </ul>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{landing.preparation_title}</h2>
            {landing.preparation_intro && (
              <p className="text-(--japan-foreground)/80 whitespace-pre-line">
                {landing.preparation_intro}
              </p>
            )}
            <ul className="mt-4 space-y-3">
              {renderBullets(landing.bullet_points, 'preparation')}
            </ul>
            {landing.preparation_image && (
              <div className="mb-4 rounded-2xl overflow-hidden border border-(--japan-primary)/20 bg-white/80">
                <img
                  src={getImageUrl(landing.preparation_image)}
                  alt="Preparation section illustration"
                  className="h-52 w-full object-cover"
                />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Trust & Vision */}
      <section className="py-16 md:py-20 border-b bg-(--japan-primary-soft)/40">
        <div className="container mx-auto px-4 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{landing.trust_title}</h2>
            {landing.trust_intro && (
              <p className="text-(--japan-foreground)/80 whitespace-pre-line mb-4">
                {landing.trust_intro}
              </p>
            )}
            <ul className="space-y-3">
              {renderBullets(landing.bullet_points, 'trust')}
            </ul>
            {landing.trust_image && (
              <div className="mt-4 rounded-2xl overflow-hidden border border-(--japan-primary)/25 bg-white/80">
                <img
                  src={getImageUrl(landing.trust_image)}
                  alt="Trust section illustration"
                  className="h-72 w-full object-cover"
                />
              </div>
            )}
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
          >
            <Card className="bg-white/80 border-(--japan-primary)/20 overflow-hidden">
              {landing.vision_image && (
                <div className="h-40 w-full overflow-hidden border-b border-(--japan-primary)/15">
                  <img
                    src={getImageUrl(landing.vision_image)}
                    alt="Vision section illustration"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
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
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      {Array.isArray(programs) && programs.length > 0 && (
        <section className="py-16 md:py-20 border-b bg-white">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="max-w-3xl mb-12 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--japan-primary)/10 border border-(--japan-primary)/20">
                <div className="h-2 w-2 rounded-full bg-(--japan-primary) animate-pulse" />
                <span className="text-xs font-medium text-(--japan-primary)">Our Programs</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-(--japan-foreground)">
                Japan Employment Programs
              </h2>
              <p className="text-lg text-(--japan-foreground)/70 leading-relaxed">
                Explore our comprehensive programs designed to prepare you for successful employment in Japan.
              </p>
            </div>

            {/* Programs Grid */}
            {programsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--japan-primary)" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Team Section */}
      <section className="py-16 md:py-20 bg-linear-to-b from-(--japan-background) to-white">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--japan-primary)/10 border border-(--japan-primary)/20">
              <div className="h-2 w-2 rounded-full bg-(--japan-primary) animate-pulse" />
              <span className="text-xs font-medium text-(--japan-primary)">Our Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-(--japan-foreground)">
              People Behind Japan Recruitment
            </h2>
            <p className="text-lg text-(--japan-foreground)/70 leading-relaxed">
              Meet the dedicated team that leads our Japan-focused recruitment, training, and partner support.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landing.team_members.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>

          {/* Optional: Add a CTA after team section */}
          {landing.team_members.length > 0 && (
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Want to work with our expert team?
              </p>
              <Button
                size="lg"
                className="bg-(--japan-primary) hover:bg-(--japan-accent) text-white"
                asChild
              >
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}