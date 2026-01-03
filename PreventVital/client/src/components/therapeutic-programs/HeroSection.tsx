
import { Sparkles, Users, Clock } from 'lucide-react';

interface HeroSectionProps {
    className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
    return (
        <section className={`relative bg-gradient-to-br from-purple-500/10 via-background to-blue-500/10 overflow-hidden ${className}`}>
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                            <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Ancient Wisdom Meets AI Innovation</span>
                        </div>

                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                            Transform Your Health with{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                                Holistic Wellness
                            </span>
                        </h1>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Experience personalized therapeutic programs combining yoga, meditation, breathwork, and physiotherapy—all enhanced by AI-powered insights and real-time biometric monitoring.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center justify-center w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                    <span className="text-xl font-bold text-purple-600 dark:text-purple-400">500+</span>
                                </div>
                                <span className="text-sm text-muted-foreground">Guided Sessions</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">50+</span>
                                </div>
                                <span className="text-sm text-muted-foreground">Expert Instructors</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center justify-center w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                    <span className="text-xl font-bold text-amber-600 dark:text-amber-400">24/7</span>
                                </div>
                                <span className="text-sm text-muted-foreground">Access Anywhere</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative animate-fade-in-up delay-100">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1666478042162-e3d894a0253e"
                                alt="Woman in white yoga outfit performing tree pose on purple yoga mat in bright studio with plants"
                                className="w-full h-[400px] lg:h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                        </div>

                        <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl shadow-lg p-4 max-w-xs">
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                    <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">12,500+ Lives Transformed</p>
                                    <p className="text-xs text-muted-foreground">Join our wellness community</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
