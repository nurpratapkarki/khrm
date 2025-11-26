import { Link, useParams } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { trainingApi, type TrainingCourse } from '@/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, CheckCircle2, ListChecks } from 'lucide-react';


export default function TrainingCourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: course, loading } = useApi<TrainingCourse>(
    () => trainingApi.getCourse(slug!),
    [slug],
  );

  if (loading || !course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <section className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/training">
              <ArrowLeft className="h-4 w-4 mr-1" />
              All courses
            </Link>
          </Button>
          <div className="text-right max-w-xl">
            <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Training course</p>
            <h1 className="text-2xl md:text-3xl font-bold line-clamp-2">{course.name}</h1>
            <p className="text-xs text-muted-foreground mt-1">
              {course.course_type_display}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <CardTitle>Course overview</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {course.duration}
                  </span>
                  {course.certification_provided && (
                    <Badge variant="outline" className="text-[11px] font-medium">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Certificate provided
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 text-sm leading-relaxed">
              {course.prerequisites && (
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ListChecks className="h-4 w-4 text-primary" />
                    <h2 className="font-semibold">Prerequisites</h2>
                  </div>
                  <p className="whitespace-pre-line text-muted-foreground">{course.prerequisites}</p>
                </div>
              )}

              {course.syllabus && (
                <div>
                  <h2 className="font-semibold mb-1">Syllabus / key topics</h2>
                  <p className="whitespace-pre-line text-muted-foreground">{course.syllabus}</p>
                </div>
              )}

              {!course.prerequisites && !course.syllabus && (
                <p className="text-muted-foreground">Detailed course content will be shared during counselling or enrolment.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

