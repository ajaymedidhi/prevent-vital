
import {
    ShieldCheck,
    Lock,
    Globe,
    FileCheck,
    ClipboardCheck,
    BadgeCheck,
    Calendar,
    FileText,
    Download
} from 'lucide-react';

interface Certification {
    id: string;
    name: string;
    description: string;
    icon: any;
    status: 'certified' | 'in-progress';
    validUntil?: string;
}

const certifications: Certification[] = [
    {
        id: 'hipaa',
        name: 'HIPAA Compliant',
        description: 'Full compliance with Health Insurance Portability and Accountability Act standards for patient data protection',
        icon: ShieldCheck,
        status: 'certified',
        validUntil: '31/12/2025'
    },
    {
        id: 'iso27001',
        name: 'ISO 27001',
        description: 'International standard for information security management systems ensuring data confidentiality and integrity',
        icon: Lock,
        status: 'certified',
        validUntil: '15/06/2026'
    },
    {
        id: 'gdpr',
        name: 'GDPR Ready',
        description: 'General Data Protection Regulation compliance for handling European patient data with privacy-first approach',
        icon: Globe,
        status: 'certified',
        validUntil: '01/01/2026'
    },
    {
        id: 'soc2',
        name: 'SOC 2 Type II',
        description: 'Service Organization Control certification demonstrating security, availability, and confidentiality controls',
        icon: FileCheck,
        status: 'certified',
        validUntil: '30/09/2025'
    },
    {
        id: 'fda',
        name: 'FDA Registration',
        description: 'U.S. Food and Drug Administration registration for medical device software classification',
        icon: ClipboardCheck,
        status: 'in-progress',
        validUntil: undefined
    },
    {
        id: 'ce',
        name: 'CE Marking',
        description: 'European Conformity marking for medical devices ensuring compliance with EU health and safety standards',
        icon: BadgeCheck,
        status: 'in-progress',
        validUntil: undefined
    }
];

interface ComplianceCertificationsProps {
    className?: string;
}

const ComplianceCertifications = ({ className = '' }: ComplianceCertificationsProps) => {
    return (
        <section className={`py-16 lg:py-24 bg-muted/30 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Compliance & Certifications
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Industry-leading security standards and regulatory compliance ensuring safe, secure healthcare data management
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {certifications.map((cert) => (
                        <div
                            key={cert.id}
                            className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${cert.status === 'certified' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30'
                                    }`}>
                                    <cert.icon
                                        size={24}
                                        className={cert.status === 'certified' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}
                                    />
                                </div>
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${cert.status === 'certified'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                    }`}>
                                    {cert.status === 'certified' ? 'Certified' : 'In Progress'}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-foreground mb-2">{cert.name}</h3>
                            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                                {cert.description}
                            </p>

                            {cert.validUntil && (
                                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                    <Calendar size={14} />
                                    <span>Valid until: {cert.validUntil}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-primary/5 rounded-xl p-8 border border-primary/20">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FileText size={24} className="text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-1">
                                    Need Compliance Documentation?
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    Download our comprehensive compliance reports and certification documents
                                </p>
                            </div>
                        </div>
                        <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center space-x-2 whitespace-nowrap">
                            <Download size={18} />
                            <span>Download Reports</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComplianceCertifications;
