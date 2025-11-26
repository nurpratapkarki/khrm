import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search, Users, FileCheck2, PlaneTakeoff } from 'lucide-react';

const employerSteps = [
  {
    icon: Search,
    title: 'Share your requirements',
    description:
      'Tell us about the roles you need to fill, required numbers, salary range and any specific skills.',
  },
  {
    icon: Users,
    title: 'Shortlisting & interviews',
    description:
      'We source and screen candidates, then coordinate interviews online or in person as required.',
  },
  {
    icon: FileCheck2,
    title: 'Documentation & approvals',
    description:
      'We support demand letter attestation, contracts, medicals, visas and all required formalities.',
  },
  {
    icon: PlaneTakeoff,
    title: 'Deployment & follow-up',
    description:
      'Workers travel to the destination country and we stay in touch for post-deployment support.',
  },
];

const candidateSteps = [
  'Apply for a suitable job through our website or registered partner offices.',
  'Attend screening, interviews and trade tests (where applicable).',
  'Complete required medical tests and provide necessary documents.',
  'Sign employment contract and attend pre-departure orientation.',
  'Travel to the destination country and start work with ongoing support from our team.',
];

export default function RecruitmentProcessPage() {
  return (
    <div className="flex flex-col">
      <section className="relative bg-linear-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="container mx-auto px-4 py-24 max-w-4xl">
          <Badge variant="secondary" className="mb-4 flex items-center gap-2 w-fit">
            <ArrowRight className="h-4 w-4" />
            How We Work
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Recruitment Process</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our recruitment process is designed to be transparent and compliant with regulations in
            Nepal and destination countries, providing a smooth experience for both employers and
            candidates.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl space-y-12">
          <Card>
            <CardHeader>
              <CardTitle>For employers</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-4">
              {employerSteps.map((step) => (
                <div key={step.title} className="space-y-3">
                  <div className="p-3 rounded-full bg-primary/10 w-fit">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base">{step.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>For candidates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <ol className="list-decimal pl-5 space-y-2">
                {candidateSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

