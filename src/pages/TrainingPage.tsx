import { useApi } from '@/hooks/useApi';
import { trainingApi, type TrainingCourse, type TrainingFacility } from '@/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GraduationCap, Building2, Clock, Award, Users } from 'lucide-react';

export default function TrainingPage() {
  const { data: coursesByType, loading } = useApi<Record<string, TrainingCourse[]>>(
    () => trainingApi.getCoursesByType(),
    [],
  );
  const { data: facilities } = useApi<TrainingFacility[]>(
    () => trainingApi.getFacilities(),
    [],
  );

  const groups = coursesByType || {};
  const facilityData = Array.isArray(facilities)
    ? facilities
    : (facilities as any)?.results ?? [];

  const hasCourses = Object.keys(groups).length > 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-600/5 via-background to-secondary-600/5">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 border-b overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-secondary-600/10 via-muted/30 to-accent-gold/10" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-secondary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-secondary-600/10 to-accent-gold/10 border border-secondary-600/20 mb-4">
              <GraduationCap className="h-5 w-5 text-secondary-600" />
              <span className="text-sm font-semibold">Skills Development</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-secondary-600 via-[#1d4ed8] to-accent-gold bg-clip-text text-transparent">
              Training & Skills Development
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Language, technical and vocational courses designed to prepare candidates for
              overseas employment and upskilling.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 space-y-12">
          {/* Courses by type */}
          <div className="space-y-10">
            {loading && (
              <div className="flex items-center justify-center py-16">
                <div className="h-12 w-12 rounded-full border-2 border-secondary-600 border-t-transparent animate-spin" />
              </div>
            )}

            {!loading && hasCourses &&
              Object.entries(groups).map(([type, courses]) => (
                <div key={type} className="space-y-6">
                  <div className="flex items-center gap-4 pb-4 border-b-2 border-linear-to-r from-secondary-600 to-accent-gold">
                    <div className="p-3 bg-linear-to-br from-secondary-600/10 to-[#1d4ed8]/5 rounded-xl">
                      <Award className="h-6 w-6 text-secondary-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold">
                        {courses[0]?.course_type_display || type}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {courses.length} active course{courses.length === 1 ? '' : 's'} available
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <Card 
                        key={course.id} 
                        className="h-full flex flex-col border-2 hover:border-secondary-600/30 hover:shadow-xl transition-all group"
                      >
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div className="p-2 bg-linear-to-br from-secondary-600/10 to-[#1d4ed8]/5 rounded-lg group-hover:scale-110 transition-transform">
                              <GraduationCap className="h-5 w-5 text-secondary-600" />
                            </div>
                            {course.certification_provided && (
                              <Badge className="bg-linear-to-r from-accent-gold to-[#d97706] text-xs">
                                <Award className="h-3 w-3 mr-1" />
                                Certificate
                              </Badge>
                            )}
                          </div>
                          
                          <CardTitle className="text-lg group-hover:text-secondary-600 transition-colors line-clamp-2">
                            {course.name}
                          </CardTitle>
                          
                          <CardDescription className="line-clamp-3 leading-relaxed">
                            {course.description}
                          </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="mt-auto space-y-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground px-3 py-2 bg-muted/50 rounded-lg">
                            <Clock className="h-4 w-4 text-secondary-600" />
                            <span className="font-medium">{course.duration}</span>
                          </div>
                          
                          <Button 
                            asChild 
                            className="w-full bg-linear-to-r from-secondary-600 to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-secondary-800"
                          >
                            <Link to={`/training/${course.slug}`}>View Details</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}

            {!loading && !hasCourses && (
              <Card className="border-2">
                <CardContent className="py-16 text-center">
                  <div className="inline-flex p-4 bg-linear-to-br from-secondary-600/10 to-[#1d4ed8]/5 rounded-2xl mb-4">
                    <GraduationCap className="h-12 w-12 text-secondary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Training courses will be published soon
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Facilities */}
          {facilityData.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b-2 border-linear-to-r from-accent-gold to-primary-600">
                <div className="p-3 bg-linear-to-br from-accent-gold/10 to-[#d97706]/5 rounded-xl">
                  <Building2 className="h-6 w-6 text-accent-gold" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">Training Facilities</h2>
                  <p className="text-sm text-muted-foreground">
                    State-of-the-art infrastructure for quality training
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilityData.map((facility: TrainingFacility) => (
                  <Card 
                    key={facility.id}
                    className="border-2 hover:border-accent-gold/30 hover:shadow-xl transition-all group"
                  >
                    <CardHeader>
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-2 bg-linear-to-br from-accent-gold/10 to-[#d97706]/5 rounded-lg group-hover:scale-110 transition-transform">
                          <Building2 className="h-5 w-5 text-accent-gold" />
                        </div>
                        <CardTitle className="text-lg group-hover:text-accent-gold transition-colors">
                          {facility.name}
                        </CardTitle>
                      </div>
                      
                      <CardDescription className="line-clamp-3 leading-relaxed">
                        {facility.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground px-3 py-2 bg-muted/50 rounded-lg">
                        <Users className="h-4 w-4 text-accent-gold" />
                        <span className="font-medium">Capacity: {facility.capacity} trainees</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}