import { useApi } from "@/hooks/useApi";
import { companyApi, type Certification } from "@/api";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building2, FileCheck, ChevronLeft, X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LicenseDetailPage() {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const { data: certifications, loading, error } = useApi<Certification[]>(
        () => companyApi.getCertifications().then((res: any) => res.results || res),
        []
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-2xl font-bold text-destructive mb-2">Error Loading Licenses</h2>
                <p className="text-muted-foreground">{error.message}</p>
            </div>
        );
    }

    // Sort certifications to show Government License first (if available) or by display_order
    const sortedCertifications = [...(certifications || [])].sort((a, b) => {
        if (a.name.toLowerCase().includes("government")) return -1;
        if (b.name.toLowerCase().includes("government")) return 1;
        return a.display_order - b.display_order;
    });

    return (
        <div className="flex flex-col min-h-screen bg-linear-to-br from-primary-600/5 via-background to-secondary-600/5">
            {/* Hero Section */}
            <section className="relative bg-linear-to-br from-secondary-600 to-[#1d4ed8] text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
                <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent-gold/20 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
                    <div className="mb-6">
                        <Button
                            variant="ghost"
                            onClick={() => navigate(-1)}
                            className="text-white hover:bg-white/20 hover:text-white -ml-4"
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back
                        </Button>
                    </div>

                    <div className="max-w-4xl">
                        <Badge variant="secondary" className="mb-4 flex items-center gap-2 w-fit bg-white/20 text-white border-white/30">
                            <ShieldCheck className="h-4 w-4" />
                            Official Accreditations
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Licenses & Certifications
                        </h1>
                        <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                            We are fully licensed and accredited by the Government of Nepal and international bodies, ensuring full compliance and trust.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8">
                        {sortedCertifications.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-2">
                                    <div className="grid md:grid-cols-[2fr_1fr] gap-6">
                                        <div className="p-6 md:p-8 flex flex-col justify-center">
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <Badge variant="outline" className="mb-3">
                                                        {cert.issuing_authority}
                                                    </Badge>
                                                    <CardTitle className="text-2xl md:text-3xl mb-2">
                                                        {cert.name}
                                                    </CardTitle>
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-4 mt-4">
                                                <div className="flex items-center gap-3 text-muted-foreground">
                                                    <FileCheck className="h-5 w-5 text-primary-600" />
                                                    <div>
                                                        <p className="text-xs font-medium uppercase tracking-wider">License Number</p>
                                                        <p className="font-semibold text-foreground">{cert.certificate_number || "N/A"}</p>
                                                    </div>
                                                </div>

                                                {cert.issue_date && (
                                                    <div className="flex items-center gap-3 text-muted-foreground">
                                                        <Calendar className="h-5 w-5 text-primary-600" />
                                                        <div>
                                                            <p className="text-xs font-medium uppercase tracking-wider">Issued Date</p>
                                                            <p className="font-semibold text-foreground">{cert.issue_date}</p>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-3 text-muted-foreground sm:col-span-2">
                                                    <Building2 className="h-5 w-5 text-primary-600" />
                                                    <div>
                                                        <p className="text-xs font-medium uppercase tracking-wider">Issuing Authority</p>
                                                        <p className="font-semibold text-foreground">{cert.issuing_authority}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {cert.certificate_image && (
                                            <div className="relative bg-muted/30 min-h-[250px] md:min-h-full border-t md:border-t-0 md:border-l group cursor-pointer" onClick={() => setSelectedImage(cert.certificate_image)}>
                                                <img
                                                    src={cert.certificate_image}
                                                    alt={cert.name}
                                                    className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
                                                    <span className="opacity-0 group-hover:opacity-100 bg-black/75 text-white px-3 py-1 rounded-full text-sm transition-opacity duration-300">
                                                        Click to Expand
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </motion.div>
                        ))}

                        {sortedCertifications.length === 0 && (
                            <div className="text-center py-12 text-muted-foreground">
                                No certifications found.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl max-h-[90vh] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                            >
                                <X className="h-8 w-8" />
                            </button>
                            <img
                                src={selectedImage || undefined}
                                alt="Certificate Full View"
                                className="w-full h-full object-contain rounded-lg shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
