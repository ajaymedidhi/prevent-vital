import { Check, ShieldCheck, FileCheck, Building2, ClipboardCheck, Lock } from 'lucide-react';

interface Credential {
    icon: string;
    title: string;
    description: string;
    stat?: string;
}

interface Partnership {
    name: string;
    logo: string;
    alt: string;
}

const ClinicalCredibility = () => {
    const credentials: Credential[] = [
        {
            icon: 'SecurityIcon', // Custom composite icon
            title: 'Enterprise Security',
            description: 'ISO 27001 Certified & HIPAA Compliant for maximum data protection.',
            stat: '100%'
        },
        {
            icon: 'FileCheckIcon',
            title: 'Research Validation',
            description: 'Peer-reviewed studies validating our AI algorithms.',
            stat: '15+'
        },
        {
            icon: 'BuildingOffice2Icon',
            title: 'Hospital Partners',
            description: 'Trust by leading healthcare institutions globally.',
            stat: '50+'
        }
    ];

    const partnerships: Partnership[] = [
        {
            name: 'AIIMS Delhi',
            logo: "https://img.rocket.new/generatedImages/rocket_gen_img_10bf31906-1764694999295.png",
            alt: 'AIIMS Delhi medical institution logo with red cross symbol on white background'
        },
        {
            name: 'Apollo Hospitals',
            logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1caca0fd5-1765188828860.png",
            alt: 'Apollo Hospitals healthcare network logo with medical caduceus symbol'
        },
        {
            name: 'Fortis Healthcare',
            logo: "https://img.rocket.new/generatedImages/rocket_gen_img_11f99d653-1765188827488.png",
            alt: 'Fortis Healthcare group logo with blue medical cross and modern typography'
        },
        {
            name: 'Max Healthcare',
            logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c3d41836-1765188827986.png",
            alt: 'Max Healthcare hospital chain logo with green heart symbol and professional design'
        }
    ];

    return (
        <section className="pt-24 pb-12 bg-background relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#64748b 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full mb-5 backdrop-blur-sm">
                        <ShieldCheck size={16} className="text-primary" />
                        <span className="text-sm font-bold text-primary uppercase tracking-widest">Clinical Excellence</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 tracking-tight">
                        Built on <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600">Trust & Science</span>
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
                        Clinically validated by top institutions and secured by world-class standards.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 max-w-5xl mx-auto">
                    {/* Card 1: Security (Large) */}
                    <div className="md:col-span-1 row-span-1 h-full">
                        <div className="relative h-full bg-card rounded-[2rem] p-8 border border-white/10 shadow-xl overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                            {/* Gradient Border Overlay */}
                            <div className="absolute inset-0 rounded-[2rem] p-[1px] bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20 -z-10" />

                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <div className="w-14 h-14 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-purple-100">
                                        <Lock size={28} className="text-purple-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">Enterprise Security</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        ISO 27001 Certified & HIPAA Compliant.
                                    </p>
                                </div>
                                <div className="mt-8">
                                    <div className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                                        100%
                                    </div>
                                    <div className="text-sm font-medium text-muted-foreground mt-1 uppercase tracking-wider">Data Protection</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Research */}
                    <div className="md:col-span-1 row-span-1 h-full">
                        <div className="relative h-full bg-card rounded-[2rem] p-8 border border-white/10 shadow-xl overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                            {/* Gradient Border Overlay */}
                            <div className="absolute inset-0 rounded-[2rem] p-[1px] bg-gradient-to-br from-purple-500/20 via-indigo-500/20 to-blue-500/20 -z-10" />

                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <div className="w-14 h-14 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-indigo-100">
                                        <FileCheck size={28} className="text-indigo-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">Research Backed</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Peer-reviewed studies validating AI algorithms.
                                    </p>
                                </div>
                                <div className="mt-8">
                                    <div className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                                        15+
                                    </div>
                                    <div className="text-sm font-medium text-muted-foreground mt-1 uppercase tracking-wider">Publications</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Partnerships */}
                    <div className="md:col-span-1 row-span-1 h-full">
                        <div className="relative h-full bg-card rounded-[2rem] p-8 border border-white/10 shadow-xl overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                            {/* Gradient Border Overlay */}
                            <div className="absolute inset-0 rounded-[2rem] p-[1px] bg-gradient-to-br from-indigo-500/20 via-blue-500/20 to-teal-500/20 -z-10" />

                            <div className="flex flex-col h-full justify-between">
                                <div>
                                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-blue-100">
                                        <Building2 size={28} className="text-blue-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">Medical Partners</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Collaborating with top hospitals.
                                    </p>
                                </div>
                                <div className="mt-8">
                                    <div className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                                        50+
                                    </div>
                                    <div className="text-sm font-medium text-muted-foreground mt-1 uppercase tracking-wider">Hospitals</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Seamless Partner Ticker */}
                <div className="relative w-full max-w-6xl mx-auto px-4">
                    <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12">
                        <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent to-purple-200" />
                        <h3 className="text-center text-sm md:text-lg lg:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 uppercase tracking-[0.15em] md:tracking-[0.2em] whitespace-nowrap">
                            Trusted by Industry Leaders
                        </h3>
                        <div className="h-px w-8 md:w-12 bg-gradient-to-l from-transparent to-purple-200" />
                    </div>

                    <div className="relative w-full overflow-hidden">
                        <div className="flex w-max animate-scroll">
                            {/* Original List */}
                            <div className="flex gap-20 items-center pr-20">
                                {partnerships.map((partner, index) => (
                                    <div
                                        key={`original-${index}`}
                                        className="relative w-36 lg:w-48 transition-all duration-300 hover:scale-105 cursor-pointer opacity-80 hover:opacity-100"
                                    >
                                        <img
                                            src={partner.logo}
                                            alt={partner.alt}
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Duplicated List for Seamless Loop */}
                            <div className="flex gap-20 items-center pr-20">
                                {partnerships.map((partner, index) => (
                                    <div
                                        key={`duplicate-${index}`}
                                        className="relative w-36 lg:w-48 transition-all duration-300 hover:scale-105 cursor-pointer opacity-80 hover:opacity-100"
                                    >
                                        <img
                                            src={partner.logo}
                                            alt={partner.alt}
                                            className="w-full h-auto object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Side Fades */}
                        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
                        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClinicalCredibility;
