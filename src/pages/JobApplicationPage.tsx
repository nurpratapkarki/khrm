import { useState } from 'react';
import type { FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { jobApi, type Job, type JobApplication } from '@/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Upload, FileText, User, Mail, Phone, Calendar, MapPin, Briefcase, Award, CheckCircle2, AlertCircle } from 'lucide-react';

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
      // Scroll to success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-600/5 via-background to-secondary-600/5">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-primary-600 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent-gold/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6 text-white hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Job
          </Button>

          <div className="max-w-4xl">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-4">
              <Briefcase className="h-3 w-3 mr-1" />
              Job Application
            </Badge>

            <h1 className="text-3xl md:text-4xl font-bold mb-3">Apply for {job.title} </h1>
            
            <div className="space-y-2">
             
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="h-4 w-4" />
                <span>{job.location}, {job.country}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Success Message */}
          {successMessage && (
            <Card className="mb-8 border-2 border-success bg-success/5">
              <CardContent className="py-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-success/10 rounded-full">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Application Submitted Successfully!</h3>
                    <p className="text-muted-foreground">{successMessage} Our recruitment team will review your profile and contact you soon.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error Message */}
          {errorMessage && (
            <Card className="mb-8 border-2 border-destructive bg-destructive/5">
              <CardContent className="py-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-destructive/10 rounded-full">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Error</h3>
                    <p className="text-muted-foreground">{errorMessage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Application Form */}
            <div className="lg:col-span-2">
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-linear-to-br from-primary-600/10 to-primary-700/5 rounded-xl">
                      <FileText className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Application Form</CardTitle>
                      <CardDescription>
                        Fill in your details to apply for this position
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <User className="h-5 w-5 text-primary-600" />
                        <h3 className="font-semibold text-lg">Personal Information</h3>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="first_name">First Name *</Label>
                          <Input
                            id="first_name"
                            value={formValues.first_name}
                            onChange={(e) => handleChange('first_name', e.target.value)}
                            required
                            className="border-2"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last_name">Last Name *</Label>
                          <Input
                            id="last_name"
                            value={formValues.last_name}
                            onChange={(e) => handleChange('last_name', e.target.value)}
                            required
                            className="border-2"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-secondary-600" />
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formValues.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            required
                            className="border-2"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-secondary-600" />
                            Phone *
                          </Label>
                          <Input
                            id="phone"
                            value={formValues.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            required
                            className="border-2"
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="date_of_birth" className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-accent-gold" />
                            Date of Birth *
                          </Label>
                          <Input
                            id="date_of_birth"
                            type="date"
                            value={formValues.date_of_birth}
                            onChange={(e) => handleChange('date_of_birth', e.target.value)}
                            required
                            className="border-2"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="nationality">Nationality *</Label>
                          <Input
                            id="nationality"
                            value={formValues.nationality}
                            onChange={(e) => handleChange('nationality', e.target.value)}
                            required
                            className="border-2"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="current_location" className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary-600" />
                            Current Location *
                          </Label>
                          <Input
                            id="current_location"
                            value={formValues.current_location}
                            onChange={(e) => handleChange('current_location', e.target.value)}
                            required
                            className="border-2"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Professional Information Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <Briefcase className="h-5 w-5 text-secondary-600" />
                        <h3 className="font-semibold text-lg">Professional Information</h3>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="years_of_experience">Years of Experience *</Label>
                          <Input
                            id="years_of_experience"
                            type="number"
                            min={0}
                            value={formValues.years_of_experience}
                            onChange={(e) => handleChange('years_of_experience', e.target.value)}
                            required
                            className="border-2"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="previous_experience">Previous Experience</Label>
                          <Input
                            id="previous_experience"
                            value={formValues.previous_experience}
                            onChange={(e) => handleChange('previous_experience', e.target.value)}
                            placeholder="Brief description"
                            className="border-2"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="skills" className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-accent-gold" />
                          Key Skills
                        </Label>
                        <Input
                          id="skills"
                          value={formValues.skills}
                          onChange={(e) => handleChange('skills', e.target.value)}
                          placeholder="E.g. Masonry, scaffolding, English communication"
                          className="border-2"
                        />
                      </div>
                    </div>

                    {/* Documents Section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2 border-b">
                        <Upload className="h-5 w-5 text-accent-gold" />
                        <h3 className="font-semibold text-lg">Documents</h3>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="resume">CV / Resume *</Label>
                          <Input
                            id="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleChange('resume', e.target.files?.[0] || null)}
                            required
                            className="border-2"
                          />
                          <p className="text-xs text-muted-foreground">PDF, DOC, DOCX</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="passport_copy">Passport Copy</Label>
                          <Input
                            id="passport_copy"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleChange('passport_copy', e.target.files?.[0] || null)}
                            className="border-2"
                          />
                          <p className="text-xs text-muted-foreground">Image or PDF</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="photo">Photo</Label>
                          <Input
                            id="photo"
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleChange('photo', e.target.files?.[0] || null)}
                            className="border-2"
                          />
                          <p className="text-xs text-muted-foreground">Image only</p>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-linear-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-[#991b1b]"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <span className="inline-flex items-center gap-2">
                          <Upload className="h-5 w-5 animate-spin" />
                          Submitting Application...
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          <Upload className="h-5 w-5" />
                          Submit Application
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Tips & Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Application Tips */}
                <Card className="border-2 border-secondary-600/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CheckCircle2 className="h-5 w-5 text-secondary-600" />
                      Application Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary-600 shrink-0" />
                      <p>Ensure your CV is up-to-date and clearly formatted</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary-600 shrink-0" />
                      <p>Double-check all contact information</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary-600 shrink-0" />
                      <p>Highlight relevant experience and skills</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-secondary-600 shrink-0" />
                      <p>Keep file sizes under 5MB</p>
                    </div>
                  </CardContent>
                </Card>

                {/* What Happens Next */}
                <Card className="bg-linear-to-br from-accent-gold/5 to-primary-600/5 border-accent-gold/20">
                  <CardHeader>
                    <CardTitle className="text-lg">What Happens Next?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold/20 text-accent-gold font-semibold text-xs shrink-0">1</div>
                      <p>We review your application</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold/20 text-accent-gold font-semibold text-xs shrink-0">2</div>
                      <p>Shortlisted candidates are contacted</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold/20 text-accent-gold font-semibold text-xs shrink-0">3</div>
                      <p>Interview and assessment process</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent-gold/20 text-accent-gold font-semibold text-xs shrink-0">4</div>
                      <p>Job offer and onboarding</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}