
import { Check, ShieldCheck, FileCheck, Building2, ClipboardCheck } from 'lucide-react';

interface Credential {
    icon: string;
    title: string;
    description: string;
}

interface Partnership {
    name: string;
    logo: string;
    alt: string;
}

const ClinicalCredibility = () => {
    const credentials: Credential[] = [
        {
            icon: 'ClipboardCheckIcon',
            title: 'ISO 27001 Certified',
            description: 'International standard for information security management'
        },
        {
            icon: 'ShieldCheckIcon',
            title: 'HIPAA Compliant',
            description: 'Ensuring the highest level of patient data protection'
        },
        {
            icon: 'FileCheckIcon',
            title: '15+ Research Publications',
            description: 'Peer-reviewed studies validating our AI algorithms'
        },
        {
            icon: 'BuildingOffice2Icon',
            title: '50+ Hospital Partnerships',
            description: 'Collaborating with leading healthcare institutions'
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

    const IconMap: Record<string, any> = {
        ClipboardCheckIcon: ClipboardCheck,
        ShieldCheckIcon: ShieldCheck,
        FileCheckIcon: FileCheck,
        BuildingOffice2Icon: Building2,
    };

    return (
        <section className="py-16 lg:py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-4 dark:bg-blue-900/30 dark:border-blue-800">
                        <ShieldCheck size={16} className="text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Clinical Excellence</span>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        Trusted by Medical Professionals
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Our platform is built on rigorous scientific research and validated by leading healthcare institutions
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {credentials.map((credential, index) => {
                        const IconComponent = IconMap[credential.icon];
                        return (
                            <div
                                key={index}
                                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                                    <IconComponent size={24} className="text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2">
                                    {credential.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {credential.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-muted/30 rounded-2xl p-8 lg:p-12 border border-border">
                    <h3 className="text-2xl font-bold text-foreground text-center mb-8">
                        Hospital & Research Partnerships
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {partnerships.map((partner, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center justify-center p-4 bg-card rounded-lg border border-border hover:shadow-md transition-all"
                            >
                                <div className="w-20 h-20 mb-3 rounded-lg overflow-hidden flex items-center justify-center bg-white">
                                    <img
                                        src={partner.logo}
                                        alt={partner.alt}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <span className="text-sm font-semibold text-foreground text-center">
                                    {partner.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClinicalCredibility;
