
import { BadgeCheck, Star } from 'lucide-react';

interface Instructor {
    id: string;
    name: string;
    title: string;
    specialization: string;
    image: string;
    alt: string;
    experience: string;
    rating: number;
    students: number;
}

interface FeaturedInstructorsProps {
    instructors: Instructor[];
}

export default function FeaturedInstructors({ instructors }: FeaturedInstructorsProps) {
    return (
        <section className="bg-background py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        Meet Our Expert Instructors
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Learn from certified wellness professionals with decades of combined experience
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {instructors.map((instructor) => (
                        <div
                            key={instructor.id}
                            className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-100 dark:border-purple-900 group-hover:border-purple-200 dark:group-hover:border-purple-800 transition-colors">
                                        <img
                                            src={instructor.image}
                                            alt={instructor.alt}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 flex items-center justify-center w-8 h-8 bg-green-500 rounded-full border-2 border-card">
                                        <BadgeCheck size={20} className="text-white" />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-1">
                                        {instructor.name}
                                    </h3>
                                    <p className="text-sm text-purple-600 dark:text-purple-400 font-medium mb-2">
                                        {instructor.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {instructor.specialization}
                                    </p>
                                </div>

                                <div className="w-full pt-4 border-t border-border space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Experience</span>
                                        <span className="font-medium text-foreground">{instructor.experience}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Rating</span>
                                        <div className="flex items-center space-x-1">
                                            <Star size={14} className="text-amber-500 fill-amber-500" />
                                            <span className="font-medium text-foreground">{instructor.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Students</span>
                                        <span className="font-medium text-foreground">{instructor.students.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
