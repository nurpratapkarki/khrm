import { useState } from 'react';
import type { FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { jobApi, type Job, type JobApplication } from '@/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Upload } from 'lucide-react';


type JobApplicationFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  nationality: string;
  current_location: string;
  years_of_experience: string;
  previous_experience: string;
  skills: string;
  resume: File | null;
  passport_copy: File | null;
  photo: File | null;
};

const emptyForm: JobApplicationFormValues = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  date_of_birth: '',
  nationality: '',
  current_location: '',
  years_of_experience: '',
  previous_experience: '',
  skills: '',
  resume: null,
  passport_copy: null,
  photo: null,
};

export default function JobApplicationPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: job, loading } = useApi<Job>(() => jobApi.getJob(slug!), [slug]);

  const [formValues, setFormValues] = useState<JobApplicationFormValues>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    field: keyof JobApplicationFormValues,
    value: string | File | null,
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!job) return;

    if (!formValues.resume) {
      setErrorMessage('Please upload your CV / resume.');
      return;
    }

    setSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const payload: JobApplication = {
      job: job.id,
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      email: formValues.email,
      phone: formValues.phone,
      date_of_birth: formValues.date_of_birth,
      nationality: formValues.nationality,
      current_location: formValues.current_location,
      resume: formValues.resume,
      passport_copy: formValues.passport_copy || undefined,
      photo: formValues.photo || undefined,
      years_of_experience: Number(formValues.years_of_experience || '0'),
      previous_experience: formValues.previous_experience || '',
      skills: formValues.skills || '',
    };

    try {
      await jobApi.applyForJob(payload);
      setSuccessMessage('Your application has been submitted successfully.');
      setFormValues(emptyForm);
    } catch (error) {
      console.error('Error submitting job application:', error);
      setErrorMessage('Something went wrong while submitting your application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !job) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to job
          </Button>
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Applying for</p>
            <p className="font-semibold text-sm line-clamp-1">{job.title}</p>
            <p className="text-xs text-muted-foreground">{job.location}, {job.country}</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Job application form</CardTitle>
              <CardDescription>
                Share your details and upload your CV. Our recruitment team will review your profile
                and contact you for the next steps.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="first_name">First name</Label>
                    <Input
                      id="first_name"
                      value={formValues.first_name}
                      onChange={(e) => handleChange('first_name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="last_name">Last name</Label>
                    <Input
                      id="last_name"
                      value={formValues.last_name}
                      onChange={(e) => handleChange('last_name', e.target.value)}
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
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formValues.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1">
                    <Label htmlFor="date_of_birth">Date of birth</Label>
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={formValues.date_of_birth}
                      onChange={(e) => handleChange('date_of_birth', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      value={formValues.nationality}
                      onChange={(e) => handleChange('nationality', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="current_location">Current location</Label>
                    <Input
                      id="current_location"
                      value={formValues.current_location}
                      onChange={(e) => handleChange('current_location', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="years_of_experience">Years of experience</Label>
                    <Input
                      id="years_of_experience"
                      type="number"
                      min={0}
                      value={formValues.years_of_experience}
                      onChange={(e) => handleChange('years_of_experience', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="previous_experience">Previous experience (optional)</Label>
                    <Input
                      id="previous_experience"
                      value={formValues.previous_experience}
                      onChange={(e) => handleChange('previous_experience', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="skills">Key skills (optional)</Label>
                  <Input
                    id="skills"
                    value={formValues.skills}
                    onChange={(e) => handleChange('skills', e.target.value)}
                    placeholder="E.g. Masonry, scaffolding, English communication"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1">
                    <Label htmlFor="resume">CV / Resume (PDF, DOC)</Label>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleChange('resume', e.target.files?.[0] || null)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="passport_copy">Passport copy (optional)</Label>
                    <Input
                      id="passport_copy"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleChange('passport_copy', e.target.files?.[0] || null)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="photo">Photo (optional)</Label>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleChange('photo', e.target.files?.[0] || null)}
                    />
                  </div>
                </div>

                {successMessage && (
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">{successMessage}</p>
                )}
                {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto"
                  disabled={submitting}
                >
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Upload className="h-4 w-4 animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    'Submit application'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

