import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useApi } from '@/hooks/useApi';
import { employerApi, industryApi, type EmployerInquiry, type Industry } from '@/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Globe, Upload } from 'lucide-react';

 type EmployerInquiryFormValues = {
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  country: string;
  industryId: string;
  required_positions: string;
  number_of_workers: string;
  job_description: string;
  expected_start_date: string;
  contract_duration: string;
  demand_letter: File | null;
  additional_documents: File | null;
};

const emptyForm: EmployerInquiryFormValues = {
  company_name: '',
  contact_person: '',
  email: '',
  phone: '',
  country: '',
  industryId: '',
  required_positions: '',
  number_of_workers: '',
  job_description: '',
  expected_start_date: '',
  contract_duration: '',
  demand_letter: null,
  additional_documents: null,
};

export default function EmployerInquiryPage() {
  const { data: industries } = useApi<Industry[]>(
    () =>
      industryApi.getIndustries().then((res: any) =>
        Array.isArray(res) ? res : res?.results ?? []
      ),
    []
  );

  const [formValues, setFormValues] = useState<EmployerInquiryFormValues>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    field: keyof EmployerInquiryFormValues,
    value: string | File | null,
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formValues.company_name || !formValues.contact_person || !formValues.email || !formValues.phone) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const payload: EmployerInquiry = {
      company_name: formValues.company_name,
      contact_person: formValues.contact_person,
      email: formValues.email,
      phone: formValues.phone,
      country: formValues.country,
      industry: formValues.industryId ? Number(formValues.industryId) : undefined,
      required_positions: formValues.required_positions,
      number_of_workers: Number(formValues.number_of_workers || '0'),
      job_description: formValues.job_description || undefined,
      expected_start_date: formValues.expected_start_date || undefined,
      contract_duration: formValues.contract_duration || undefined,
      demand_letter: formValues.demand_letter || undefined,
      additional_documents: formValues.additional_documents || undefined,
    };

    try {
      await employerApi.submitInquiry(payload);
      setSuccessMessage('Your manpower request has been submitted successfully. Our team will contact you shortly.');
      setFormValues(emptyForm);
    } catch (err) {
      console.error('Error submitting employer inquiry:', err);
      setErrorMessage('Something went wrong while submitting your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col">
      <section className="relative bg-linear-to-br from-primary/10 via-background to-primary/5 border-b">
        <div className="container mx-auto px-4 py-24 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] items-start">
          <div>
            <Badge variant="secondary" className="mb-4 flex items-center gap-2 w-fit">
              <Building2 className="h-4 w-4" />
              For Employers
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Request Manpower from Nepal</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Share your manpower requirements and our recruitment specialists will prepare a tailored
              proposal, shortlist suitable candidates and guide you through the deployment process.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-primary" />
                  Skilled & semi-skilled
                </p>
                <p className="text-muted-foreground">Hospitality, construction, security, retail and more.</p>
              </div>
              <div>
                <p className="font-semibold flex items-center gap-2 mb-1">
                  <Globe className="h-4 w-4 text-primary" />
                  Middle East focus
                </p>
                <p className="text-muted-foreground">Strong experience with GCC countries and employers.</p>
              </div>
              <div>
                <p className="font-semibold flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-primary" />
                  End-to-end support
                </p>
                <p className="text-muted-foreground">From sourcing to medical, documentation and deployment.</p>
              </div>
            </div>
          </div>

          <Card className="shadow-xl border-primary/10">
            <CardHeader>
              <CardTitle>Share your manpower requirements</CardTitle>
              <CardDescription>
                Fill in the details below and we will get back to you with a proposal and next steps.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="company_name">Company name</Label>
                    <Input
                      id="company_name"
                      value={formValues.company_name}
                      onChange={(e) => handleChange('company_name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="contact_person">Contact person</Label>
                    <Input
                      id="contact_person"
                      value={formValues.contact_person}
                      onChange={(e) => handleChange('contact_person', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formValues.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone">Phone (with country code)</Label>
                    <Input
                      id="phone"
                      value={formValues.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="country">Destination country</Label>
                    <Input
                      id="country"
                      value={formValues.country}
                      onChange={(e) => handleChange('country', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="industry">Industry / sector</Label>
                    <select
                      id="industry"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formValues.industryId}
                      onChange={(e) => handleChange('industryId', e.target.value)}
                    >
                      <option value="">Select industry (optional)</option>
                      {industries?.map((industry) => (
                        <option key={industry.id} value={industry.id}>
                          {industry.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="required_positions">Positions required</Label>
	                    <textarea
	                      id="required_positions"
	                      className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
	                      value={formValues.required_positions}
	                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
	                        handleChange('required_positions', e.target.value)
	                      }
	                      placeholder="E.g. 20 x Security Guard, 10 x Housekeeping, 5 x Supervisor"
	                      required
	                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="number_of_workers">Total number of workers</Label>
	                    <Input
                      id="number_of_workers"
                      type="number"
                      min={1}
                      value={formValues.number_of_workers}
                      onChange={(e) => handleChange('number_of_workers', e.target.value)}
                      required
                    />
	                    <Label htmlFor="job_description" className="mt-3 block">
	                      Job description (optional)
	                    </Label>
	                    <textarea
	                      id="job_description"
	                      className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
	                      value={formValues.job_description}
	                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
	                        handleChange('job_description', e.target.value)
	                      }
	                      placeholder="Share any specific job requirements or candidate profile."
	                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="expected_start_date">Expected start date (optional)</Label>
                    <Input
                      id="expected_start_date"
                      type="date"
                      value={formValues.expected_start_date}
                      onChange={(e) => handleChange('expected_start_date', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="contract_duration">Contract duration (optional)</Label>
                    <Input
                      id="contract_duration"
                      value={formValues.contract_duration}
                      onChange={(e) => handleChange('contract_duration', e.target.value)}
                      placeholder="E.g. 2 years, renewable"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="demand_letter">Demand letter (optional)</Label>
                    <Input
                      id="demand_letter"
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleChange('demand_letter', e.target.files?.[0] ?? null)}
                    />
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Upload className="h-3 w-3" /> Attach if already prepared.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="additional_documents">Additional documents (optional)</Label>
                    <Input
                      id="additional_documents"
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                      onChange={(e) => handleChange('additional_documents', e.target.files?.[0] ?? null)}
                    />
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-sm text-destructive">{errorMessage}</p>
                )}
                {successMessage && (
                  <p className="text-sm text-emerald-600">{successMessage}</p>
                )}

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit manpower request'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

