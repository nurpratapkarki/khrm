import { Link, useParams } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { japanprogramApi, type JapanProgramType } from '@/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, CheckCircle2, BookOpen, Award, Target, Languages } from 'lucide-react';
import { getImageUrl } from '@/lib/utils';

export default function JapanProgramDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { data: program, loading } = useApi<JapanProgramType | null>(
        () => japanprogramApi.getJapanProgram(Number(id)),
        [id],
    );

    if (loading || !program) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="h-10 w-10 rounded-full border-2 border-(--japan-primary) border-t-transparent animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-(--japan-primary-soft)/20 via-background to-(--japan-primary-soft)/10">
            {/* Hero Section */}
            <div className="relative bg-linear-to-br from-(--japan-primary) to-(--japan-accent) text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
                <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
                    <Button
                        variant="ghost"
                        asChild
                        className="mb-6 text-white hover:text-white hover:bg-white/10"
                    >
                        <Link to="/japan" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Japan Programs
                        </Link>
                    </Button>

                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="space-y-6 max-w-full">
                            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 whitespace-normal text-left h-auto py-1">
                                <BookOpen className="h-3 w-3 mr-1 shrink-0 inline" />
                                <span className="inline">{program.program_type_display}</span>
                            </Badge>

                            <h1 className="text-3xl md:text-5xl font-bold break-words hyphens-auto">{program.program_type_display}</h1>

                            <p className="text-lg md:text-xl text-white/90 leading-relaxed break-words">
                                {program.subtitle}
                            </p>

                            {program.training_duration && (
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex items-start gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 max-w-full">
                                        <Clock className="h-4 w-4 mt-1 shrink-0" />
                                        <span className="text-sm font-medium break-words whitespace-normal">{program.training_duration}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {program.image && (
                            <div className="relative mt-8 lg:mt-0 w-full">
                                <div className="relative rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 max-w-[90vw] mx-auto lg:max-w-full">
                                    <img
                                        src={getImageUrl(program.image)}
                                        alt={program.program_type_display}
                                        className="w-full h-auto object-cover aspect-video"
                                    />
                                </div>
                                <div className="absolute -inset-4 bg-white/5 rounded-3xl -z-10 rotate-6 blur-sm max-w-[90vw] mx-auto lg:max-w-full" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 max-w-6xl">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Program Details */}
                    <div className="lg:col-span-2 space-y-8">


                        {/* Overview */}
                        <Card className="border-2 hover:border-(--japan-primary)/20 transition-colors">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-linear-to-br from-(--japan-primary)/10 to-(--japan-primary)/5 rounded-xl">
                                        <BookOpen className="h-6 w-6 text-(--japan-primary)" />
                                    </div>
                                    <h2 className="text-2xl font-bold">Program Overview</h2>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-(--japan-primary) to-(--japan-accent) rounded-full" />
                                    <div className="pl-6">
                                        <p className="text-muted-foreground leading-relaxed">
                                            {program.overview}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Language Training */}
                        {program.language_training_title && (
                            <Card className="border-2 hover:border-(--japan-primary)/20 transition-colors">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-linear-to-br from-(--japan-primary)/10 to-(--japan-accent)/5 rounded-xl">
                                            <Languages className="h-6 w-6 text-(--japan-primary)" />
                                        </div>
                                        <h2 className="text-2xl font-bold">{program.language_training_title}</h2>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-(--japan-primary) to-(--japan-accent) rounded-full" />
                                        <div className="pl-6 space-y-3">
                                            {program.training_points.map((point) => (
                                                <div key={point.id} className="flex items-start gap-3">
                                                    <CheckCircle2 className="h-5 w-5 text-(--japan-primary) mt-0.5 shrink-0" />
                                                    <p className="text-muted-foreground leading-relaxed">{point.point}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Objective */}
                        {program.objective && (
                            <Card className="border-2 hover:border-(--japan-accent)/20 transition-colors">
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-linear-to-br from-(--japan-accent)/10 to-(--japan-accent)/5 rounded-xl">
                                            <Target className="h-6 w-6 text-(--japan-accent)" />
                                        </div>
                                        <h2 className="text-2xl font-bold">Program Objective</h2>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-4 top-0 w-1 h-full bg-linear-to-b from-(--japan-accent) to-(--japan-primary) rounded-full" />
                                        <div className="pl-6">
                                            <p className="text-muted-foreground leading-relaxed">
                                                {program.objective}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right Column - Program Info Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <Card className="border-2 border-(--japan-primary)/20 shadow-lg">
                                <CardContent className="pt-6">
                                    <div className="text-center mb-6">
                                        <div className="inline-flex p-4 bg-linear-to-br from-(--japan-primary)/10 to-(--japan-accent)/5 rounded-2xl mb-4">
                                            <Award className="h-10 w-10 text-(--japan-primary)" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Program Information</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Everything you need to know
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        {program.training_duration && (
                                            <div className="p-4 rounded-lg bg-linear-to-br from-(--japan-primary)/5 to-(--japan-accent)/5 border border-(--japan-primary)/10">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Clock className="h-5 w-5 text-(--japan-primary)" />
                                                    <span className="font-semibold text-sm">Duration</span>
                                                </div>
                                                <p className="text-muted-foreground text-sm pl-8">{program.training_duration}</p>
                                            </div>
                                        )}

                                        {program.target_level && (
                                            <div className="p-4 rounded-lg bg-linear-to-br from-(--japan-accent)/5 to-(--japan-primary)/5 border border-(--japan-accent)/10">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Target className="h-5 w-5 text-(--japan-accent)" />
                                                    <span className="font-semibold text-sm">Target Level</span>
                                                </div>
                                                <p className="text-muted-foreground text-sm pl-8">{program.target_level}</p>
                                            </div>
                                        )}

                                        <div className="p-4 rounded-lg bg-linear-to-br from-(--japan-primary)/5 to-(--japan-accent)/5 border border-(--japan-primary)/10">
                                            <div className="flex items-center gap-3 mb-2">
                                                <BookOpen className="h-5 w-5 text-(--japan-primary)" />
                                                <span className="font-semibold text-sm">Program Type</span>
                                            </div>
                                            <p className="text-muted-foreground text-sm pl-8">{program.program_type_display}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t">
                                        <Button
                                            asChild
                                            className="w-full bg-linear-to-r from-(--japan-primary) to-(--japan-accent) hover:from-(--japan-accent) hover:to-(--japan-primary)"
                                        >
                                            <Link to="/contact">
                                                Apply Now
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Benefits Card */}
                            <Card className="mt-6 bg-linear-to-br from-(--japan-primary)/5 to-(--japan-accent)/5 border-(--japan-primary)/20">
                                <CardContent className="pt-6">
                                    <h4 className="font-semibold mb-3">Why This Program?</h4>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        {program.why_choose_japan_programs && program.why_choose_japan_programs.length > 0 ? (
                                            program.why_choose_japan_programs
                                                .sort((a, b) => a.order - b.order)
                                                .map((item) => (
                                                    <li key={item.id} className="flex items-start gap-2">
                                                        <CheckCircle2 className="h-4 w-4 text-(--japan-primary) mt-0.5 shrink-0" />
                                                        <span>{item.why_choose}</span>
                                                    </li>
                                                ))
                                        ) : (
                                            // Fallback if no data is available
                                            <>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-(--japan-primary) mt-0.5 shrink-0" />
                                                    <span>Comprehensive Japanese language training</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-(--japan-primary) mt-0.5 shrink-0" />
                                                    <span>Cultural orientation and preparation</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-(--japan-primary) mt-0.5 shrink-0" />
                                                    <span>Expert-led training sessions</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-(--japan-primary) mt-0.5 shrink-0" />
                                                    <span>Career advancement in Japan</span>
                                                </li>
                                            </>
                                        )}
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
