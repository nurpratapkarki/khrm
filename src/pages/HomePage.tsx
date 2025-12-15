// src/pages/HomePage.tsx
import { useApi } from "@/hooks/useApi";
import { apiService, japanApi, type HomePageData, type JapanBulletPoint, type JapanLandingPage } from "@/api";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import {
    ArrowRight,
    Users,
    Globe,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

export default function HomePage() {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const { data, loading, error } = useApi<HomePageData>(
        () => apiService.getReq<HomePageData>("/home/"),
        [],
    );
    const { data: japanLandingRaw } = useApi<JapanLandingPage | Record<string, never>>(
        () => japanApi.getJapanLanding(),
        [],
    );

    const heroImages = useMemo(
        () =>
            [
                data?.company_info.hero_image,
                data?.company_info.hero_image1,
                data?.company_info.hero_image2,
                data?.company_info.hero_image3,
            ].filter(Boolean),
        [data?.company_info],
    );

    function renderBullets(points: JapanBulletPoint[], section: JapanBulletPoint['section']) {
        return points
            .filter((p) => p.section === section)
            .sort((a, b) => a.order - b.order)
            .map((point) => (
                <li
                    key={point.id}
                    className="flex gap-3 cursor-pointer hover:bg-(--japan-primary)/5 -mx-2 px-2 py-1 rounded-lg transition-colors"
                    onClick={() => navigate('/japan')}
                >
                    <CheckCircle2 className="h-5 w-5 text-(--japan-primary) mt-0.5 hrink-0" />
                    <div>
                        {point.title && <div className="font-medium mb-0.5">{point.title}</div>}
                        <p className="text-sm text-(--japan-foreground)/80 whitespace-pre-line">
                            {point.description}
                        </p>
                    </div>
                </li>
            ));
    }

    useEffect(() => {
        if (heroImages.length === 0) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [heroImages.length]);

    const handlePrevImage = () => {
        if (!heroImages.length) return;
        setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    };

    const handleNextImage = () => {
        if (!heroImages.length) return;
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    };

    const prefersReducedMotion = useReducedMotion();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-destructive mb-2">
                        Error Loading Data
                    </h2>
                    <p className="text-muted-foreground">{error.message}</p>
                </div>
            </div>
        );
    }

    const japanLanding = japanLandingRaw && (japanLandingRaw as any).id
        ? (japanLandingRaw as JapanLandingPage)
        : null;

    return (
        <div className="flex flex-col">
            {/* Hero Section (global) */}
            <section className="relative bg-linear-to-br from-primary/10 h-[70vh] via-background to-primary/5 border-b">
                {/* Background Image Carousel */}
                <div className="absolute inset-0 z-0">
                    {heroImages.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-50' : 'opacity-0'
                                }`}
                        >
                            <img
                                src={image}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                    {/* Gradient overlay for text readability - lighter to show more image */}
                    <div className="absolute inset-0 bg-linear-to-b from-background/85 via-background/50 to-background/85" />
                    {/* Additional center fade for better image visibility */}
                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-background/30 to-background/70" />
                    {heroImages.length > 1 && (
                        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 md:px-8 z-20 pointer-events-none">
                            <button
                                type="button"
                                onClick={handlePrevImage}
                                className="pointer-events-auto h-11 w-11 rounded-full bg-background/80 border border-border shadow hover:bg-background transition"
                                aria-label="Previous hero image"
                            >
                                <ChevronLeft className="mx-auto h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={handleNextImage}
                                className="pointer-events-auto h-11 w-11 rounded-full bg-background/80 border border-border shadow hover:bg-background transition"
                                aria-label="Next hero image"
                            >
                                <ChevronRight className="mx-auto h-5 w-5" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
                    <motion.div
                        className="max-w-4xl mx-auto text-center"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                        animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                        <Badge variant="secondary" className="mb-6 text-sm px-4 py-1 bg-background/90 backdrop-blur-md shadow-lg">
                            Since {data?.company_info?.establishment_year}
                        </Badge>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground drop-shadow-2xl [text-shadow:_0_2px_10px_rgb(0_0_0_/_40%)]">
                            {data?.company_info?.hero_headline}
                        </h1>
                        <p className="text-xl text-foreground/95 mb-8 max-w-2xl mx-auto drop-shadow-xl [text-shadow:_0_2px_8px_rgb(0_0_0_/_30%)] bg-background/60 backdrop-blur-sm px-6 py-3 rounded-lg">
                            {data?.company_info?.hero_subtext}
                        </p>
                        <Button size="lg" className="text-lg px-8" asChild>
                            <Link to="/jobs">
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Japan-focused Intro section */}
            {japanLanding && (
                <section className="py-20 bg-(--japan-background) border-b">
                    <div className="container mx-auto px-4 grid gap-10 md:grid-cols-2 items-start">
                        <motion.div
                            className="space-y-4"
                            initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.45, ease: 'easeOut' }}
                        >
                            <Badge className="w-fit" variant="outline">
                                Japan Focused
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-bold text-(--japan-foreground)">
                                {japanLanding.intro_title}
                            </h2>
                            <p className="text-(--japan-foreground)/80 whitespace-pre-line">
                                {japanLanding.intro_description}
                            </p>
                            {japanLanding.commitment_intro && (
                                <p className="text-sm text-(--japan-foreground)/70">
                                    {japanLanding.commitment_intro}
                                </p>
                            )}
                            <div className="flex flex-wrap gap-3 pt-2">
                                <Button
                                    size="lg"
                                    className="bg-(--japan-primary) text-white hover:bg-(--japan-accent)"
                                    asChild
                                >
                                    <Link to="/japan">Explore Japan Programme</Link>
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            className="rounded-2xl bg-white shadow-sm border border-(--japan-primary)/20 p-6 space-y-4"
                            initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
                            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
                        >
                            <h3 className="text-xl font-semibold mb-1">{japanLanding.preparation_title}</h3>
                            {japanLanding.preparation_intro && (
                                <p className="text-sm text-muted-foreground whitespace-pre-line">
                                    {japanLanding.preparation_intro}
                                </p>
                            )}
                            <ul className="space-y-2 text-sm">
                                {japanLanding.bullet_points
                                    .filter((p) => p.section === 'preparation')
                                    .sort((a, b) => a.order - b.order)
                                    .slice(0, 4)
                                    .map((point) => (
                                        <li
                                            key={point.id}
                                            className="flex gap-2 cursor-pointer hover:bg-(--japan-primary)/5 -mx-2 px-2 py-1 rounded-lg transition-colors"
                                            onClick={() => navigate('/japan')}
                                        >
                                            <CheckCircle2 className="h-4 w-4 text-(--japan-primary) mt-0.5 shrink-0" />
                                            <div>
                                                {point.title && (
                                                    <div className="font-medium leading-snug">{point.title}</div>
                                                )}
                                                <p className="text-muted-foreground whitespace-pre-line">
                                                    {point.description}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Japan Commitment & Preparation Section */}
            {japanLanding && (
                <section className="py-16 md:py-20 border-b bg-(--japan-background)">
                    <div className="container mx-auto px-4 grid gap-10 md:grid-cols-2 items-start">
                        <motion.div
                            className="space-y-4"
                            initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.45, ease: 'easeOut' }}
                        >
                            {japanLanding.commitment_image && (
                                <div className="mb-4 rounded-2xl overflow-hidden border border-(--japan-primary)/20 bg-white/80">
                                    <img
                                        src={japanLanding.commitment_image}
                                        alt="Commitment section illustration"
                                        className="h-52 w-full object-cover"
                                    />
                                </div>
                            )}
                            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-(--japan-foreground)">
                                {japanLanding.commitment_title}
                            </h2>
                            {japanLanding.commitment_intro && (
                                <p className="text-(--japan-foreground)/80 whitespace-pre-line">
                                    {japanLanding.commitment_intro}
                                </p>
                            )}
                            <ul className="mt-4 space-y-3">
                                {renderBullets(japanLanding.bullet_points, 'commitment')}
                            </ul>
                        </motion.div>

                        <motion.div
                            className="space-y-4"
                            initial={prefersReducedMotion ? false : { opacity: 0, x: 16 }}
                            whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-(--japan-foreground)">
                                {japanLanding.preparation_title}
                            </h2>
                            {japanLanding.preparation_intro && (
                                <p className="text-(--japan-foreground)/80 whitespace-pre-line">
                                    {japanLanding.preparation_intro}
                                </p>
                            )}
                            <ul className="mt-4 space-y-3">
                                {renderBullets(japanLanding.bullet_points, 'preparation')}
                            </ul>
                            {japanLanding.preparation_image && (
                                <div className="mb-4 rounded-2xl overflow-hidden border border-(--japan-primary)/20 bg-white/80">
                                    <img
                                        src={japanLanding.preparation_image}
                                        alt="Preparation section illustration"
                                        className="h-52 w-full object-cover"
                                    />
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Japan Trust & Vision Section */}
            {japanLanding && (
                <section className="py-16 md:py-20 border-b bg-(--japan-primary-soft)/40">
                    <div className="container mx-auto px-4 grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start">
                        <motion.div
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.45, ease: 'easeOut' }}
                        >
                            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-(--japan-foreground)">
                                {japanLanding.trust_title}
                            </h2>
                            {japanLanding.trust_intro && (
                                <p className="text-(--japan-foreground)/80 whitespace-pre-line mb-4">
                                    {japanLanding.trust_intro}
                                </p>
                            )}
                            <ul className="space-y-3">
                                {renderBullets(japanLanding.bullet_points, 'trust')}
                            </ul>
                            {japanLanding.trust_image && (
                                <div className="mt-4 rounded-2xl overflow-hidden border border-(--japan-primary)/25 bg-white/80">
                                    <img
                                        src={japanLanding.trust_image}
                                        alt="Trust section illustration"
                                        className="h-72 w-full object-cover"
                                    />
                                </div>
                            )}
                        </motion.div>

                        <motion.div
                            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
                        >
                            <Card className="bg-white/80 border-(--japan-primary)/20 overflow-hidden">
                                {japanLanding.vision_image && (
                                    <div className="h-40 w-full overflow-hidden border-b border-(--japan-primary)/15">
                                        <img
                                            src={japanLanding.vision_image}
                                            alt="Vision section illustration"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}
                                <CardHeader>
                                    <CardTitle className="text-lg">{japanLanding.vision_title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {japanLanding.vision_intro && (
                                        <p className="text-sm text-muted-foreground mb-3 whitespace-pre-line">
                                            {japanLanding.vision_intro}
                                        </p>
                                    )}
                                    <ul className="space-y-2 text-sm">
                                        {renderBullets(japanLanding.bullet_points, 'vision')}
                                    </ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Floating Stats */}
            <div className="container mx-auto px-4 -mb-16 relative z-10">
                <motion.div
                    className="bg-card border shadow-xl rounded-2xl p-8"
                    initial={
                        prefersReducedMotion ? false : { opacity: 0, y: 24 }
                    }
                    animate={
                        prefersReducedMotion
                            ? undefined
                            : { opacity: 1, y: 0 }
                    }
                    transition={{
                        duration: 0.45,
                        ease: "easeOut",
                        delay: 0.1,
                    }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="space-y-2">
                            <div className="flex justify-center mb-3">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <Users className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-primary">
                                {data?.company_info?.total_deployments.toLocaleString()}
                                +
                            </div>
                            <div className="text-muted-foreground font-medium">
                                Workers Deployed
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-center mb-3">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <CheckCircle2 className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-primary">
                                Licensed
                            </div>
                            <div className="text-muted-foreground font-medium">
                                Government Approved
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-center mb-3">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <Globe className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-primary">
                                {data?.offices.length}
                            </div>
                            <div className="text-muted-foreground font-medium">
                                Global Offices
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Rest of the sections remain the same... */}
            {/* Trusted Clients Section */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="text-center mb-16"
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Trusted By Leading Companies
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            We've successfully placed thousands of workers with top companies across the Middle East
                        </p>
                    </motion.div>

                    {/* Infinite Carousel */}
                    <div className="relative overflow-hidden">
                        <div className="flex animate-scroll">
                            {/* Duplicate the array twice for seamless loop */}
                            {[...(data?.featured_clients || []), ...(data?.featured_clients || [])].map((client, index) => (
                                <div
                                    key={`${client.id}-${index}`}
                                    className="shrink-0 w-40 h-24 mx-4 bg-white rounded-lg border p-4 flex items-center justify-center hover:shadow-lg transition-shadow"
                                >
                                    {client.website ? (
                                        <a
                                            href={client.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full h-full flex items-center justify-center"
                                        >
                                            <img
                                                src={client.logo}
                                                alt={client.name}
                                                className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all"
                                            />
                                        </a>
                                    ) : (
                                        <img
                                            src={client.logo}
                                            alt={client.name}
                                            className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Industries We Serve */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            Industries We Serve
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Expert manpower solutions across multiple sectors
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {data?.industries.map((industry) => (
                            <Link
                                key={industry.id}
                                to={`/industries/${industry.slug}`}
                            >
                                <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer group">
                                    <CardHeader>
                                        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                                            {industry.icon}
                                        </div>
                                        <CardTitle className="group-hover:text-primary transition-colors">
                                            {industry.name}
                                        </CardTitle>
                                        <CardDescription className="line-clamp-2">
                                            {industry.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full group-hover:bg-primary/10"
                                        >
                                            Learn More{" "}
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            What Our Clients Say
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Hear from companies that trust KHRM for their
                            manpower needs
                        </p>
                    </div>

                    <div className="relative">
                        <InfiniteMovingCards
                            items={
                                (data?.testimonials?.length
                                    ? data.testimonials
                                    : []
                                ).map((testimonial) => {
                                    return {
                                        quote: testimonial.testimonial_text,
                                        name: testimonial.person_name,
                                        rating: testimonial.rating,
                                        title: [
                                            testimonial.person_position,
                                            testimonial.company_name,
                                        ]
                                            .filter(Boolean)
                                            .join(" • "),
                                    };
                                })
                            }
                            pauseOnHover
                            speed="slow"
                            direction="right"
                            className="mx-auto [mask-none]"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-linear-to-r from-primary to-primary/80 text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Ready to Build Your Team?
                    </h2>
                    <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                        Connect with skilled professionals from Nepal. Let us
                        help you find the perfect candidates for your
                        organization.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="text-lg px-8"
                            asChild
                        >
                            <Link to="/employer-inquiry">
                                Request Manpower
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-lg px-8 bg-accent-gold border-primary-foreground/20 hover:bg-primary-foreground/10"
                            asChild
                        >
                            <Link to="/contact">Contact Us</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}