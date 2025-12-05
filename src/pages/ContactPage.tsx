import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { contactApi, companyApi, type ContactMessage, type FAQ, type CompanyInfo, type Office } from '@/api';
import { useApi } from '@/hooks/useApi';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Mail, Phone, MessageCircle, HelpCircle } from 'lucide-react';

// Phone number validation: 10 digits, starts with 97, 98, 96, or 95
function isValidNepaliPhone(phone: string): boolean {
  if (!phone) return true; // allow empty (optional field)
  return /^(97|98|96|95)\d{8}$/.test(phone);
}


type ContactFormValues = Omit<
  ContactMessage,
  'id' | 'inquiry_type_display' | 'is_read' | 'replied' | 'notes' | 'created_at'
>;

const defaultValues: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  company: '',
  inquiry_type: 'general',
  message: '',
};

export default function ContactPage() {
  const form = useForm<ContactFormValues>({ defaultValues });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

	  const { data: faqs } = useApi<FAQ[]>(
    () =>
      contactApi.getFAQs().then((res: any) =>
        Array.isArray(res) ? res : res?.results ?? []
      ),
    []
  );
	  const { data: companyInfo } = useApi<CompanyInfo>(
	    () => companyApi.getCompanyInfo(),
	    []
	  );
	  const { data: headquarters } = useApi<Office>(
	    () => companyApi.getHeadquarters(),
	    []
	  );

  const onSubmit = async (values: ContactFormValues) => {
    setSuccessMessage(null);
    setErrorMessage(null);
    try {
      await contactApi.sendContactMessage(values);
      setSuccessMessage('Thank you for contacting us. We will get back to you soon.');
      form.reset(defaultValues);
    } catch (error) {
      console.error('Error sending contact message:', error);
      setErrorMessage('Something went wrong while sending your message. Please try again.');
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <section className="py-16 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl">
            Have a question about jobs, training, or hiring workers? Send us a message and our team
            will respond as soon as possible.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 grid gap-8 lg:grid-cols-3">
          {/* Contact form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill in the form below and we'll direct your inquiry to the right team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-6"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        rules={{ required: 'Your name is required' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        rules={{ required: 'Email is required' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="phone"
                        rules={{
                          validate: (value) =>
                            !value || isValidNepaliPhone(value) ||
                            'Phone number must be 10 digits and start with 97, 98, 96, or 95.'
                        }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+977-" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company (optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Your company" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="inquiry_type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Inquiry type</FormLabel>
                          <FormControl>
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="general">General inquiry</SelectItem>
                                <SelectItem value="job_seeker">Job seeker</SelectItem>
                                <SelectItem value="employer">Employer / client</SelectItem>
                                <SelectItem value="training">Training</SelectItem>
                                <SelectItem value="complaint">Complaint / feedback</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      rules={{ required: 'Please write a short message' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <textarea
                              className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                              placeholder="How can we help you?"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {successMessage && (
                      <p className="text-sm text-emerald-600 dark:text-emerald-400">
                        {successMessage}
                      </p>
                    )}
                    {errorMessage && (
                      <p className="text-sm text-destructive">{errorMessage}</p>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? 'Sending...' : 'Send message'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Side info & FAQs */}
	          <div className="space-y-6">
	            <Card>
	              <CardHeader>
	                <CardTitle>Contact details</CardTitle>
	                <CardDescription>
	                  Reach out to us by email or phone if you prefer.
	                </CardDescription>
	              </CardHeader>
	              <CardContent className="space-y-3 text-sm">
	                {headquarters && (
	                  <div className="text-xs text-muted-foreground">
	                    <div className="font-medium mb-1">Head Office</div>
	                    <div>
	                      {headquarters.address}, {headquarters.city}
	                    </div>
	                  </div>
	                )}
	                <div className="flex items-center gap-3">
	                  <Mail className="h-4 w-4 text-primary" />
	                  <span>{headquarters?.email ?? 'info@khrm.com.np'}</span>
	                </div>
	                <div className="flex items-center gap-3">
	                  <Phone className="h-4 w-4 text-primary" />
	                  <span>{headquarters?.phone ?? '+977-1-0000000'}</span>
	                </div>
	                <div className="flex items-center gap-3">
	                  <MessageCircle className="h-4 w-4 text-primary" />
	                  <span>
	                    {companyInfo?.establishment_year
	                      ? 'Mon–Fri, 9:00 AM – 5:00 PM (NPT)'
	                      : 'Office hours: Mon–Fri, 9:00 AM – 5:00 PM (NPT)'}
	                  </span>
	                </div>
	              </CardContent>
	            </Card>

            {faqs && faqs.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary" />
                    <CardTitle className="text-base">Frequently asked questions</CardTitle>
                  </div>
                  <CardDescription>
                    Quick answers for job seekers, employers and trainees.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  {faqs.slice(0, 4).map((faq) => (
                    <div key={faq.id}>
                      <div className="font-medium">{faq.question}</div>
                      <p className="text-muted-foreground text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

