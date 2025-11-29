// ==================== src/pages/AboutPage.tsx ====================
import { useApi } from '@/hooks/useApi';
import { companyApi, type CompanyInfo, type Leadership, type Certification, type Office } from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Award, Target, Eye, Heart, MapPin, Phone, Mail, Linkedin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function AboutPage() {
  const { data: companyInfo } = useApi<CompanyInfo>(
    () => companyApi.getCompanyInfo(),
    []
  );
  const { data: leadership } = useApi<Leadership[]>(
    () =>
      companyApi.getLeadership().then((res: any) =>
        Array.isArray(res) ? res : res?.results ?? []
      ),
    []
  );
  const { data: certifications } = useApi<Certification[]>(
    () =>
      companyApi.getCertifications().then((res: any) =>
        Array.isArray(res) ? res : res?.results ?? []
      ),
    []
  );
  const { data: offices } = useApi<Office[]>(
    () =>
      companyApi.getOffices().then((res: any) =>
        Array.isArray(res) ? res : res?.results ?? []
      ),
    []
  );

  const prefersReducedMotion = useReducedMotion();
  const aboutHeroImage =
    companyInfo?.about_background_image || companyInfo?.about_image || companyInfo?.hero_image;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated linear backgrounds */}
        <div className="absolute inset-0 bg-linear-to-br from-primary-600/5 via-background to-secondary-600/5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        
        {/* Floating cutout shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border-4 border-primary-600/20 rounded-3xl rotate-12 animate-float" />
        <div className="absolute bottom-40 left-40 w-24 h-24 border-4 border-secondary-600/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/3 w-20 h-20 border-4 border-accent-gold/20 rounded-2xl -rotate-12 animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <motion.div
              className="space-y-6"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary-600/10 to-secondary-600/10 border border-primary-600/20">
                <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
                <span className="text-sm font-semibold text-foreground">
                  Established {companyInfo?.establishment_year}
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-linear-to-br from-primary-600 via-primary-700 to-secondary-600 bg-clip-text text-transparent">
                About KHRM
              </h1>
              
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-primary-600 via-accent-gold to-secondary-600 rounded-full" />
                <p className="text-xl text-muted-foreground leading-relaxed whitespace-pre-line pl-6">
                  {companyInfo?.about_text}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600/5 border border-primary-600/20">
                  <div className="w-3 h-3 rounded-full bg-primary-600" />
                  <span className="text-sm font-medium">Trusted Globally</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary-600/5 border border-secondary-600/20">
                  <div className="w-3 h-3 rounded-full bg-secondary-600" />
                  <span className="text-sm font-medium">ISO Certified</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-gold/5 border border-accent-gold/20">
                  <div className="w-3 h-3 rounded-full bg-accent-gold" />
                  <span className="text-sm font-medium">Award Winning</span>
                </div>
              </div>
            </motion.div>

            {aboutHeroImage && (
              <motion.div
                className="relative"
                initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              >
                {/* linear background layers */}
                <div className="absolute -inset-8 bg-linear-to-br from-primary-600/20 via-accent-gold/10 to-secondary-600/20 rounded-3xl blur-2xl" aria-hidden="true" />
                <div className="absolute -inset-4 bg-linear-to-tl from-secondary-600/10 to-primary-600/10 rounded-3xl blur-xl" aria-hidden="true" />
                
                {/* Image container with linear border */}
                <div className="relative rounded-3xl overflow-hidden border-2 border-transparent bg-linear-to-br from-primary-600 via-accent-gold to-secondary-600 p-0.5 shadow-2xl">
                  <div className="rounded-3xl overflow-hidden bg-background">
                    <img
                      src={aboutHeroImage}
                      alt="About KHRM"
                      className="h-96 lg:h-[500px] w-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Floating accent elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-linear-to-br from-primary-600 to-primary-700 rounded-2xl opacity-20 rotate-12 blur-sm" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-linear-to-br from-secondary-600 to-[#1d4ed8] rounded-full opacity-20 blur-sm" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-primary-600/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-linear-to-b from-primary-600 to-secondary-600 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Mission Section - Full Viewport */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* linear background */}
        <div className="absolute inset-0 bg-linear-to-br from-primary-600/5 via-background to-secondary-600/5" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
        
        {/* Decorative cutout shapes */}
        <div className="absolute top-10 right-10 w-40 h-40 border-8 border-primary-600/10 rounded-[3rem] rotate-12" />
        <div className="absolute bottom-20 left-10 w-32 h-32 border-8 border-accent-gold/10 rounded-full" />
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              className="space-y-6 order-2 lg:order-1"
              initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-linear-to-br from-primary-600/10 to-primary-700/5 rounded-2xl border-2 border-primary-600/20 shadow-lg">
                  <Target className="h-10 w-10 text-primary-600" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                  Our Mission
                </h2>
              </div>
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-primary-600 to-accent-gold rounded-full" />
                <p className="text-xl text-muted-foreground leading-relaxed pl-6">
                  {companyInfo?.mission}
                </p>
              </div>
            </motion.div>

            {companyInfo?.mission_image && (
              <motion.div
                className="relative order-1 lg:order-2"
                initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="absolute -inset-8 bg-linear-to-br from-primary-600/20 to-accent-gold/10 rounded-3xl blur-2xl" aria-hidden="true" />
                <div className="relative rounded-3xl overflow-hidden border-2 border-transparent bg-linear-to-br from-primary-600 to-accent-gold p-0.5 shadow-2xl">
                  <div className="rounded-3xl overflow-hidden bg-background">
                    <img
                      src={companyInfo.mission_image}
                      alt="Our Mission"
                      className="h-96 lg:h-[500px] w-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-linear-to-br from-primary-600 to-primary-700 rounded-2xl opacity-20 rotate-12 blur-sm" />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Vision Section - Full Viewport (Reversed Layout) */}
      <section className="relative min-h-screen flex items-center bg-muted/30 overflow-hidden">
        {/* linear background */}
        <div className="absolute inset-0 bg-linear-to-bl from-secondary-600/5 via-muted/30 to-accent-gold/5" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-600/10 rounded-full blur-3xl" />
        
        {/* Decorative cutout shapes */}
        <div className="absolute top-20 right-20 w-40 h-40 border-8 border-secondary-600/10 rounded-[3rem] -rotate-12" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border-8 border-accent-gold/10 rounded-full" />
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {companyInfo?.vision_image && (
              <motion.div
                className="relative"
                initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute -inset-8 bg-linear-to-br from-secondary-600/20 to-[#1d4ed8]/10 rounded-3xl blur-2xl" aria-hidden="true" />
                <div className="relative rounded-3xl overflow-hidden border-2 border-transparent bg-linear-to-br from-secondary-600 to-[#1d4ed8] p-0.5 shadow-2xl">
                  <div className="rounded-3xl overflow-hidden bg-background">
                    <img
                      src={companyInfo.vision_image}
                      alt="Our Vision"
                      className="h-96 lg:h-[500px] w-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-linear-to-br from-secondary-600 to-[#1d4ed8] rounded-full opacity-20 blur-sm" />
              </motion.div>
            )}

            <motion.div
              className="space-y-6"
              initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-linear-to-br from-secondary-600/10 to-[#1d4ed8]/5 rounded-2xl border-2 border-secondary-600/20 shadow-lg">
                  <Eye className="h-10 w-10 text-secondary-600" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-secondary-600 to-[#1d4ed8] bg-clip-text text-transparent">
                  Our Vision
                </h2>
              </div>
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-secondary-600 to-accent-gold rounded-full" />
                <p className="text-xl text-muted-foreground leading-relaxed pl-6">
                  {companyInfo?.vision}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section - Full Viewport */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* linear background */}
        <div className="absolute inset-0 bg-linear-to-tr from-accent-gold/5 via-background to-primary-600/5" />
        <div className="absolute top-40 right-40 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl" />
        
        {/* Decorative cutout shapes */}
        <div className="absolute top-20 left-20 w-40 h-40 border-8 border-accent-gold/10 rounded-[3rem] rotate-45" />
        <div className="absolute bottom-10 right-10 w-32 h-32 border-8 border-primary-600/10 rounded-full" />
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              className="space-y-6 order-2 lg:order-1"
              initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-linear-to-br from-accent-gold/10 to-[#d97706]/5 rounded-2xl border-2 border-accent-gold/20 shadow-lg">
                  <Heart className="h-10 w-10 text-accent-gold" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-accent-gold to-[#d97706] bg-clip-text text-transparent">
                  Our Values
                </h2>
              </div>
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-accent-gold to-primary-600 rounded-full" />
                <p className="text-xl text-muted-foreground leading-relaxed pl-6">
                  {companyInfo?.values}
                </p>
              </div>
            </motion.div>

            {companyInfo?.values_image && (
              <motion.div
                className="relative order-1 lg:order-2"
                initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="absolute -inset-8 bg-linear-to-br from-accent-gold/20 to-[#d97706]/10 rounded-3xl blur-2xl" aria-hidden="true" />
                <div className="relative rounded-3xl overflow-hidden border-2 border-transparent bg-linear-to-br from-accent-gold to-[#d97706] p-0.5 shadow-2xl">
                  <div className="rounded-3xl overflow-hidden bg-background">
                    <img
                      src={companyInfo.values_image}
                      alt="Our Values"
                      className="h-96 lg:h-[500px] w-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-linear-to-br from-accent-gold to-[#d97706] rounded-2xl opacity-20 -rotate-12 blur-sm" />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary-600 via-primary-700 to-[#991b1b]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        
        {/* Floating shapes */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent-gold/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-sm" />
              <div className="relative p-6">
                <div className="text-5xl lg:text-6xl font-bold mb-2 bg-linear-to-br from-white to-white/80 bg-clip-text text-transparent">
                  {companyInfo?.total_deployments.toLocaleString()}+
                </div>
                <div className="text-white/80 text-lg">Workers Deployed</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-sm" />
              <div className="relative p-6">
                <div className="text-5xl lg:text-6xl font-bold mb-2 bg-linear-to-br from-white to-white/80 bg-clip-text text-transparent">
                  {new Date().getFullYear() - (companyInfo?.establishment_year || 2003)}+
                </div>
                <div className="text-white/80 text-lg">Years of Experience</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-sm" />
              <div className="relative p-6">
                <div className="text-5xl lg:text-6xl font-bold mb-2 bg-linear-to-br from-white to-white/80 bg-clip-text text-transparent">
                  {offices?.length || 0}
                </div>
                <div className="text-white/80 text-lg">Global Offices</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-white/5 rounded-2xl backdrop-blur-sm" />
              <div className="relative p-6">
                <div className="text-5xl lg:text-6xl font-bold mb-2 bg-linear-to-br from-white to-white/80 bg-clip-text text-transparent">
                  100%
                </div>
                <div className="text-white/80 text-lg">Client Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Leadership Team
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Meet the experienced professionals leading KHRM to new heights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership?.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary/10"
                    />
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.position}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {member.bio}
                    </p>
                    <div className="flex gap-2 justify-center">
                      {member.email && (
                        <Button size="icon" variant="outline">
                          <Mail className="h-4 w-4" />
                        </Button>
                      )}
                      {member.linkedin && (
                        <Button size="icon" variant="outline" asChild>
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Global Presence
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              We operate from strategic locations to serve you better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices?.map((office) => (
              <Card key={office.id} className={office.is_headquarters ? 'border-2 border-primary' : ''}>
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Building2 className="h-6 w-6 text-primary" />
                    </div>
                    {office.is_headquarters && (
                      <Badge variant="default">Headquarters</Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl">{office.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">
                      {office.address}, {office.city}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{office.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{office.email}</span>
                  </div>
                  {office.office_image && (
                    <img
                      src={office.office_image}
                      alt={office.name}
                      className="w-full h-48 object-cover rounded-lg mt-4"
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Certifications & Compliance
            </h2>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
              Fully licensed and certified to operate internationally
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications?.map((cert) => (
              <Card key={cert.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-full shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {cert.issuing_authority}
                      </p>
                      {cert.certificate_number && (
                        <p className="text-xs text-muted-foreground">
                          Certificate No: {cert.certificate_number}
                        </p>
                      )}
                      {cert.certificate_image && (
                        <img
                          src={cert.certificate_image}
                          alt={cert.name}
                          className="w-full h-32 object-cover rounded-lg mt-3"
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}