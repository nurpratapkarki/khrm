import { useApi } from '@/hooks/useApi';
import { trainingApi, type TrainingCourse, type TrainingFacility } from '@/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GraduationCap, Building2, Clock, CheckCircle2 } from 'lucide-react';


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
    <div className="bg-background min-h-screen">
      <section className="py-16 border-b bg-muted/30">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center gap-2">
              <GraduationCap className="h-7 w-7 text-primary" />
              Training & Skills Development
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Language, technical and vocational courses designed to prepare candidates for
              overseas employment and upskilling.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 space-y-10">
          {/* Courses by type */}
          <div className="space-y-6">
            {loading && (
              <div className="flex items-center justify-center py-16">
                <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              </div>
            )}

            {!loading && hasCourses &&
              Object.entries(groups).map(([type, courses]) => (
                <div key={type} className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <h2 className="text-2xl font-semibold">
                        {courses[0]?.course_type_display || type}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {courses.length} active course{courses.length === 1 ? '' : 's'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <Card key={course.id} className="h-full flex flex-col">
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-primary" />
                            {course.name}
                          </CardTitle>
                          <CardDescription className="line-clamp-3 mt-1">
                            {course.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="mt-auto space-y-3 text-sm">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {course.duration}
                            </span>
                            {course.certification_provided && (
                              <Badge variant="outline" className="text-[10px] font-medium">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Certificate
                              </Badge>
                            )}
                          </div>
                          <Button asChild variant="outline" size="sm" className="w-full">
                            <Link to={`/training/${course.slug}`}>View details</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}

            {!loading && !hasCourses && (
              <p className="text-sm text-muted-foreground">Training courses will be published soon.</p>
            )}
          </div>

          {/* Facilities */}
          {facilityData.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold">Training facilities</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilityData.map((facility: TrainingFacility) => (
                  <Card key={facility.id}>
                    <CardHeader>
                      <CardTitle className="text-base">{facility.name}</CardTitle>
                      <CardDescription className="line-clamp-3">
                        {facility.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground flex items-center gap-2">
                      Capacity: {facility.capacity} trainees
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

