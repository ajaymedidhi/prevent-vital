import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { programService } from '../programService';
import { Loader2, AlertTriangle, CheckCircle2, Lock, Play, Clock, BarChart, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ProgramDetailPage() {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['program', id],
        queryFn: () => programService.getProgram(id!),
        enabled: !!id
    });

    const program = data?.data.program;

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
    if (isError || !program) return <div className="min-h-screen flex items-center justify-center">Program not found</div>;

    return (
        <>
            <Helmet>
                <title>{program.title} - PreventVital</title>
                <meta name="description" content={program.description.slice(0, 160)} />
            </Helmet>

            <div className="min-h-screen bg-background pb-20">
                {/* Hero Header */}
                <div className="relative h-[60vh] md:h-[500px] w-full overflow-hidden">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                        <div className="container mx-auto">
                            <div className="flex gap-2 mb-4">
                                <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/20 hover:bg-primary/30">
                                    {program.category}
                                </Badge>
                                <Badge variant="outline" className="bg-background/50 backdrop-blur-md text-foreground border-white/20">
                                    {program.difficulty}
                                </Badge>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-foreground/90 max-w-3xl leading-tight">
                                {program.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-muted-foreground/90 font-medium">
                                <div className="flex items-center gap-2">
                                    <Clock size={20} />
                                    {program.durationWeeks} Weeks
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={20} />
                                    {program.totalSessions} Sessions
                                </div>
                                <div className="flex items-center gap-2 text-amber-500">
                                    <BarChart size={20} />
                                    {program.averageRating} ({program.reviewCount} Reviews)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-10">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Program Overview</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {program.description}
                            </p>
                        </section>

                        <section className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-6">
                            <div className="flex gap-3">
                                <AlertTriangle className="text-amber-500 shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Medical Disclaimer</h3>
                                    <p className="text-sm text-muted-foreground">
                                        This program is designed for preventive care and wellness enhancement. It is not a substitute for professional medical advice, diagnosis, or treatment.
                                        <strong> Always consult with your doctor</strong> before starting any new health program, especially if you have pre-existing conditions.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-6">Session Curriculum</h2>
                            <div className="space-y-3">
                                {program.modules?.length === 0 ? (
                                    <div className="p-8 text-center border border-dashed rounded-xl text-muted-foreground">
                                        Curriculum details coming soon.
                                    </div>
                                ) : (
                                    program.modules?.map((module, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-4 bg-card border rounded-lg hover:border-primary/50 transition-colors group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <h4 className="font-medium group-hover:text-primary transition-colors">
                                                        {module.title}
                                                    </h4>
                                                    <p className="text-xs text-muted-foreground">{module.duration} mins • Video Session</p>
                                                </div>
                                            </div>
                                            {idx === 0 ? (
                                                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10">
                                                    <Play size={16} className="mr-2 fill-current" /> Preview
                                                </Button>
                                            ) : (
                                                <Lock size={16} className="text-muted-foreground/50 mr-4" />
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar CTA */}
                    <aside className="lg:col-span-1 space-y-6">
                        <div className="bg-card border rounded-2xl p-6 shadow-sm sticky top-24">
                            <div className="mb-6">
                                <span className="text-muted-foreground text-sm uppercase tracking-wide font-semibold">Access Type</span>
                                <div className="flex items-baseline gap-1 mt-1">
                                    <span className="text-3xl font-bold text-primary capitalize">{program.pricingType}</span>
                                    {program.pricingType === 'subscription' && <span className="text-muted-foreground">with Plan</span>}
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                    <span>Full access to all {program.totalSessions} sessions</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                    <span>Personalized progress tracking</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-foreground">
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                    <span>Mobile app access</span>
                                </div>
                            </div>

                            <Button size="lg" className="w-full mb-3" asChild>
                                <Link to="/login?redirect=app-download">
                                    Enroll in Mobile App
                                </Link>
                            </Button>

                            <p className="text-xs text-center text-muted-foreground">
                                Use the PreventVital App to enroll, track vitals, and execute daily sessions.
                            </p>
                        </div>

                        {/* Creator Bio */}
                        <div className="bg-muted/30 rounded-xl p-6 flex items-start gap-4">
                            <img
                                src={program.creator.photo || "https://github.com/shadcn.png"}
                                alt={program.creator.name}
                                className="w-16 h-16 rounded-full object-cover border-2 border-background"
                            />
                            <div>
                                <h4 className="font-semibold text-foreground">{program.creator.name}</h4>
                                <p className="text-xs text-muted-foreground mb-2">{program.creator.qualification || 'Certified Expert'}</p>
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {program.creator.bio || 'Expert in preventive healthcare and wellness with over 10 years of experience.'}
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    );
}
