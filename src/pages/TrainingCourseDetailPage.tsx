import { Link, useParams } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { trainingApi, type TrainingCourse } from '@/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, CheckCircle2, ListChecks, BookOpen, Award, GraduationCap } from 'lucide-react';

export default function TrainingCourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: course, loading } = useApi<TrainingCourse>(
    () => trainingApi.getCourse(slug!),
    [slug],
  );

  if (loading || !course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 rounded-full border-2 border-primary-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-600/5 via-background to-secondary-600/5">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-secondary-600 to-[#1d4ed8] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent-gold/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <Button 
            variant="ghost" 
            asChild 
            className="mb-6 text-white hover:text-white hover:bg-white/10"
          >
            <Link to="/training" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              All Courses
            </Link>
          </Button>

          <div className="max-w-4xl">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-4">
              <BookOpen className="h-3 w-3 mr-1" />
              {course.course_type_display}
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.name}</h1>
            
            <p className="text-xl text-white/90 leading-relaxed max-w-3xl mb-6">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">{course.duration}</span>
              </div>
              {course.certification_provided && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-gold/20 backdrop-blur-sm border border-accent-gold/30">
                  <Award className="h-4 w-4" />
                  <span className="text-sm font-medium">Certificate Provided</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 space-y-8">
            {course.prerequisites && (
              <Card className="border-2 hover:border-primary-600/20 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-linear-to-br from-primary-600/10 to-primary-700/5 rounded-xl">
                      <ListChecks className="h-6 w-6 text-primary-600" />
                    </div>
                    <h2 className="text-2xl font-bold">Prerequisites</h2>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-primary-600 to-accent-gold rounded-full" />
                    <div className="pl-6 space-y-3">
                      {course.prerequisites.split('\n').map((line, idx) => 
                        line.trim() && (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="mt-1.5 w-2 h-2 rounded-full bg-primary-600 shrink-0" />
                            <p className="text-muted-foreground leading-relaxed">{line.trim()}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {course.syllabus && (
              <Card className="border-2 hover:border-secondary-600/20 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-linear-to-br from-secondary-600/10 to-[#1d4ed8]/5 rounded-xl">
                      <GraduationCap className="h-6 w-6 text-secondary-600" />
                    </div>
                    <h2 className="text-2xl font-bold">Syllabus & Key Topics</h2>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-secondary-600 to-accent-gold rounded-full" />
                    <div className="pl-6 space-y-3">
                      {course.syllabus.split('\n').map((line, idx) => 
                        line.trim() && (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="mt-1.5 w-2 h-2 rounded-full bg-secondary-600 shrink-0" />
                            <p className="text-muted-foreground leading-relaxed">{line.trim()}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!course.prerequisites && !course.syllabus && (
              <Card className="border-2 border-accent-gold/20">
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <div className="inline-flex p-4 bg-linear-to-br from-accent-gold/10 to-[#d97706]/5 rounded-2xl mb-4">
                      <BookOpen className="h-10 w-10 text-accent-gold" />
                    </div>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Detailed course content will be shared during counselling or enrolment.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Course Info Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-2 border-secondary-600/20 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-4 bg-linear-to-br from-secondary-600/10 to-[#1d4ed8]/5 rounded-2xl mb-4">
                      <GraduationCap className="h-10 w-10 text-secondary-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Course Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Everything you need to know
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-linear-to-br from-secondary-600/5 to-[#1d4ed8]/5 border border-secondary-600/10">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="h-5 w-5 text-secondary-600" />
                        <span className="font-semibold text-sm">Duration</span>
                      </div>
                      <p className="text-muted-foreground text-sm pl-8">{course.duration}</p>
                    </div>

                    <div className="p-4 rounded-lg bg-linear-to-br from-accent-gold/5 to-[#d97706]/5 border border-accent-gold/10">
                      <div className="flex items-center gap-3 mb-2">
                        <BookOpen className="h-5 w-5 text-accent-gold" />
                        <span className="font-semibold text-sm">Course Type</span>
                      </div>
                      <p className="text-muted-foreground text-sm pl-8">{course.course_type_display}</p>
                    </div>

                    {course.certification_provided && (
                      <div className="p-4 rounded-lg bg-linear-to-br from-primary-600/5 to-primary-700/5 border border-primary-600/10">
                        <div className="flex items-center gap-3 mb-2">
                          <Award className="h-5 w-5 text-primary-600" />
                          <span className="font-semibold text-sm">Certification</span>
                        </div>
                        <p className="text-muted-foreground text-sm pl-8">Certificate provided upon completion</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <Button 
                      asChild 
                      className="w-full bg-linear-to-r from-secondary-600 to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-secondary-800"
                    >
                      <Link to="/contact">
                        Enroll Now
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits Card */}
              <Card className="mt-6 bg-linear-to-br from-accent-gold/5 to-primary-600/5 border-accent/20">
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-3">Why This Course?</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent-gold mt-0.5 shrink-0" />
                      <span>Expert-led training sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent-gold mt-0.5 shrink-0" />
                      <span>Practical, hands-on learning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent-gold mt-0.5 shrink-0" />
                      <span>Industry-recognized curriculum</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-accent-gold mt-0.5 shrink-0" />
                      <span>Career advancement support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}