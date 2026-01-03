import { Star, MessageSquare } from "lucide-react";

export const Testimonials = () => {
    return (
        <section className="section-padding bg-section-alt overflow-hidden">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-6">
                        <Star className="w-4 h-4 fill-emerald-800" />
                        <span>Patient Success Stories</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Real Results, Real People
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Discover how PreventVital has transformed lives through preventive healthcare
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Featured Testimonial Card */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-border/40 relative">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">

                            {/* User Profile */}
                            <div className="md:col-span-4 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-border/60 pb-8 md:pb-0 md:pr-8">
                                <div className="relative mb-6">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                        <img
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                                            alt="Rajesh Kumar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1.5 rounded-full border-2 border-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-foreground">Rajesh Kumar</h3>
                                <p className="text-sm text-muted-foreground mb-4">Age 52</p>
                                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                                    Type 2 Diabetes Prevention
                                </span>
                            </div>

                            {/* Quote Content */}
                            <div className="md:col-span-8">
                                <MessageSquare className="w-10 h-10 text-primary/20 mb-6" />
                                <blockquote className="text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-6">
                                    "PreventVital helped me prevent diabetes through personalized lifestyle changes. The AI predictions were accurate, and the yoga therapy programs transformed my health. My HbA1c dropped from 6.2 to 5.4 in just 6 months."
                                </blockquote>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
