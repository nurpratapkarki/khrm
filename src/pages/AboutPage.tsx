// ==================== src/pages/AboutPage.tsx ====================
import { useApi } from '@/hooks/useApi';
import { companyApi, type CompanyInfo, type Leadership, type Certification, type Office } from '@/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building2, Award, Target, Eye, Heart, MapPin, Phone, Mail, Linkedin } from 'lucide-react';

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

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Established {companyInfo?.establishment_year}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About KHRM
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {companyInfo?.about_text}
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="mb-4">
                  <div className="p-3 bg-primary/10 rounded-full w-fit">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {companyInfo?.mission}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="mb-4">
                  <div className="p-3 bg-primary/10 rounded-full w-fit">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {companyInfo?.vision}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="mb-4">
                  <div className="p-3 bg-primary/10 rounded-full w-fit">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-2xl">Our Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {companyInfo?.values}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Leadership Team
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Global Presence
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Certifications & Compliance
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
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

      {/* Stats Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">
                {companyInfo?.total_deployments.toLocaleString()}+
              </div>
              <div className="text-primary-foreground/80">Workers Deployed</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">
                {new Date().getFullYear() - (companyInfo?.establishment_year || 2003)}+
              </div>
              <div className="text-primary-foreground/80">Years of Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">{offices?.length || 0}</div>
              <div className="text-primary-foreground/80">Global Offices</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-primary-foreground/80">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
