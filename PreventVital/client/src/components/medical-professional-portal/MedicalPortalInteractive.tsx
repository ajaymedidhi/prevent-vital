
import { useState, useEffect } from 'react';
import StatsCard from './StatsCard';
import PatientCard from './PatientCard';
import AppointmentCard from './AppointmentCard';
import FeatureCard from './FeatureCard';
import ResearchCard from './ResearchCard';
import TestimonialCard from './TestimonialCard';
import {
    ShieldCheck,
    Home,
    Users,
    Calendar,
    GraduationCap,
    Video,
    UserPlus,
    FileBarChart,
    FileText
} from 'lucide-react';

interface Patient {
    id: number;
    name: string;
    age: number;
    condition: string;
    riskLevel: 'low' | 'medium' | 'high';
    lastVisit: string;
    nextAppointment: string;
    image: string;
    alt: string;
}

interface Appointment {
    id: number;
    patientName: string;
    time: string;
    type: string;
    status: 'scheduled' | 'in-progress' | 'completed';
}

interface Feature {
    icon: string;
    title: string;
    description: string;
    color: string;
}

interface Research {
    id: number;
    title: string;
    journal: string;
    date: string;
    category: string;
}

interface Testimonial {
    id: number;
    name: string;
    role: string;
    hospital: string;
    quote: string;
    image: string;
    alt: string;
}

export default function MedicalPortalInteractive() {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'patients' | 'appointments' | 'research'>('dashboard');
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, []);

    const stats = [
        { icon: 'users', label: 'Active Patients', value: '247', trend: '+12%', trendDirection: 'up' as const },
        { icon: 'chart', label: 'Success Rate', value: '94.8%', trend: '+3.2%', trendDirection: 'up' as const },
        { icon: 'calendar', label: 'Today\'s Appointments', value: '18', trend: '-2', trendDirection: 'down' as const },
        { icon: 'medical', label: 'Avg. Risk Reduction', value: '38%', trend: '+5%', trendDirection: 'up' as const }
    ];

    const patients: Patient[] = [
        {
            id: 1,
            name: 'Rajesh Kumar',
            age: 52,
            condition: 'Type 2 Diabetes',
            riskLevel: 'medium',
            lastVisit: '15 Dec 2025',
            nextAppointment: '22 Dec 2025',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_120b5a424-1764871012824.png",
            alt: 'Middle-aged Indian man with gray hair wearing blue shirt smiling at camera'
        },
        {
            id: 2,
            name: 'Priya Sharma',
            age: 45,
            condition: 'Hypertension',
            riskLevel: 'low',
            lastVisit: '18 Dec 2025',
            nextAppointment: '25 Dec 2025',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a6cc7b76-1763300209811.png",
            alt: 'Indian woman in her forties with long black hair wearing white coat in medical setting'
        },
        {
            id: 3,
            name: 'Amit Patel',
            age: 58,
            condition: 'Cardiac Risk',
            riskLevel: 'high',
            lastVisit: '19 Dec 2025',
            nextAppointment: '20 Dec 2025',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_18160d972-1763296688320.png",
            alt: 'Senior Indian man with glasses and gray beard wearing formal attire'
        },
        {
            id: 4,
            name: 'Sneha Reddy',
            age: 38,
            condition: 'Weight Management',
            riskLevel: 'low',
            lastVisit: '17 Dec 2025',
            nextAppointment: '24 Dec 2025',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_14e479cba-1763300676390.png",
            alt: 'Young Indian woman with shoulder-length hair smiling in casual attire'
        }
    ];

    const appointments: Appointment[] = [
        { id: 1, patientName: 'Rajesh Kumar', time: '09:00 AM', type: 'Follow-up', status: 'scheduled' },
        { id: 2, patientName: 'Priya Sharma', time: '10:30 AM', type: 'Consultation', status: 'in-progress' },
        { id: 3, patientName: 'Amit Patel', time: '11:45 AM', type: 'Emergency', status: 'scheduled' },
        { id: 4, patientName: 'Sneha Reddy', time: '02:00 PM', type: 'Routine Check', status: 'scheduled' },
        { id: 5, patientName: 'Vikram Singh', time: '03:30 PM', type: 'Telemedicine', status: 'scheduled' }
    ];

    const features: Feature[] = [
        {
            icon: 'ChartBarIcon',
            title: 'AI-Powered Risk Assessment',
            description: 'Advanced predictive analytics identify patient risks before symptoms appear, enabling proactive intervention strategies.',
            color: 'primary'
        },
        {
            icon: 'DevicePhoneMobileIcon',
            title: 'Real-Time Monitoring',
            description: 'Continuous health data from wearables provides instant alerts for critical changes in patient vitals.',
            color: 'success'
        },
        {
            icon: 'DocumentTextIcon',
            title: 'EHR Integration',
            description: 'Seamless connectivity with existing electronic health records ensures comprehensive patient history access.',
            color: 'accent'
        },
        {
            icon: 'VideoCameraIcon',
            title: 'Telemedicine Suite',
            description: 'Secure video consultations with integrated prescription management and follow-up scheduling.',
            color: 'trust'
        }
    ];

    const research: Research[] = [
        {
            id: 1,
            title: 'AI-Driven Diabetes Prevention: A 5-Year Longitudinal Study',
            journal: 'Indian Journal of Medical Research',
            date: 'Nov 2025',
            category: 'Diabetes'
        },
        {
            id: 2,
            title: 'Predictive Analytics in Cardiac Risk Assessment: Clinical Validation',
            journal: 'Journal of Preventive Cardiology',
            date: 'Oct 2025',
            category: 'Cardiology'
        },
        {
            id: 3,
            title: 'Integration of Yoga Therapy with Digital Health Monitoring',
            journal: 'Complementary Medicine Research',
            date: 'Sep 2025',
            category: 'Holistic Care'
        }
    ];

    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: 'Dr. Anil Mehta',
            role: 'Chief Cardiologist',
            hospital: 'Apollo Hospitals, Mumbai',
            quote: 'PreventVital has transformed how I manage high-risk cardiac patients. The predictive alerts have prevented multiple emergency situations.',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1fe03ce7b-1763294977207.png",
            alt: 'Senior Indian male doctor with gray hair wearing white coat and stethoscope'
        },
        {
            id: 2,
            name: 'Dr. Kavita Desai',
            role: 'Endocrinologist',
            hospital: 'Fortis Healthcare, Delhi',
            quote: 'The AI-powered insights help me personalize diabetes management plans with unprecedented precision. Patient outcomes have improved dramatically.',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_100d9dcb9-1764892974318.png",
            alt: 'Indian female doctor with long black hair in white medical coat holding tablet'
        }
    ];

    const handleViewPatientDetails = (id: number) => {
        alert(`Opening detailed records for Patient ID: ${id}`);
    };

    const handleManageAppointment = (id: number) => {
        alert(`Managing appointment ID: ${id}`);
    };

    if (!isReady) {
        return (
            <div className="min-h-screen bg-background pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Skeleton matching the layout */}
                    <div className="animate-pulse space-y-8">
                        <div className="h-12 bg-muted rounded-lg w-2/3"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-32 bg-muted rounded-xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const TabIcon = ({ icon, className }: { icon: string, className?: string }) => {
        switch (icon) {
            case 'HomeIcon': return <Home size={20} className={className} />;
            case 'UserGroupIcon': return <Users size={20} className={className} />;
            case 'CalendarIcon': return <Calendar size={20} className={className} />;
            case 'AcademicCapIcon': return <GraduationCap size={20} className={className} />;
            default: return null;
        }
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-primary/5 via-background to-blue-500/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 animate-fade-up">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full mb-6 border border-primary/20">
                            <ShieldCheck size={20} className="text-primary" />
                            <span className="text-sm font-semibold text-primary">Medical Professional Portal</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                            Empower Your Practice with<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-indigo-600">AI-Driven Patient Care</span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Comprehensive patient management tools, clinical decision support, and telemedicine integration designed for modern healthcare professionals.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in delay-100">
                        {stats.map((stat, index) => (
                            <StatsCard key={index} {...stat} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Navigation Tabs */}
            <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border pl-4">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex space-x-2 overflow-x-auto py-4 no-scrollbar">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: 'HomeIcon' },
                            { id: 'patients', label: 'Patient Management', icon: 'UserGroupIcon' },
                            { id: 'appointments', label: 'Appointments', icon: 'CalendarIcon' },
                            { id: 'research', label: 'Research & Education', icon: 'AcademicCapIcon' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-300 ${activeTab === tab.id
                                        ? 'bg-primary text-primary-foreground shadow-md'
                                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                            >
                                <TabIcon icon={tab.icon} />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
                <section className="py-12 px-4 animate-fade-in">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Today's Appointments */}
                            <div className="lg:col-span-2">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-foreground">Today's Schedule</h2>
                                    <button className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm font-semibold hover:bg-primary/20 transition-all">
                                        View Calendar
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {appointments.slice(0, 3).map((appointment) => (
                                        <AppointmentCard
                                            key={appointment.id}
                                            appointment={appointment}
                                            onManage={handleManageAppointment}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
                                <div className="space-y-3">
                                    <button className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all flex items-center justify-between shadow-sm">
                                        <span>Start Telemedicine</span>
                                        <Video size={20} />
                                    </button>
                                    <button className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-all flex items-center justify-between shadow-sm">
                                        <span>Add New Patient</span>
                                        <UserPlus size={20} />
                                    </button>
                                    <button className="w-full px-4 py-3 bg-amber-500 text-white rounded-lg text-sm font-semibold hover:bg-amber-600 transition-all flex items-center justify-between shadow-sm">
                                        <span>Generate Report</span>
                                        <FileBarChart size={20} />
                                    </button>
                                    <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all flex items-center justify-between shadow-sm">
                                        <span>Access EHR</span>
                                        <FileText size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Platform Features */}
                        <div className="mt-16">
                            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Platform Capabilities</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {features.map((feature, index) => (
                                    <FeatureCard key={index} feature={feature} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Patients Tab */}
            {activeTab === 'patients' && (
                <section className="py-12 px-4 animate-fade-in">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                            <h2 className="text-3xl font-bold text-foreground">Patient Management</h2>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="text"
                                    placeholder="Search patients..."
                                    className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background w-full md:w-auto"
                                />
                                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all whitespace-nowrap">
                                    Add Patient
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {patients.map((patient) => (
                                <PatientCard
                                    key={patient.id}
                                    patient={patient}
                                    onViewDetails={handleViewPatientDetails}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
                <section className="py-12 px-4 animate-fade-in">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-foreground">Appointment Management</h2>
                            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all">
                                Schedule New
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {appointments.map((appointment) => (
                                <AppointmentCard
                                    key={appointment.id}
                                    appointment={appointment}
                                    onManage={handleManageAppointment}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Research Tab */}
            {activeTab === 'research' && (
                <section className="py-12 px-4 animate-fade-in">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-foreground mb-8">Research & Continuing Education</h2>

                        {/* Research Publications */}
                        <div className="mb-16">
                            <h3 className="text-2xl font-bold text-foreground mb-6">Latest Publications</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {research.map((item) => (
                                    <ResearchCard key={item.id} research={item} />
                                ))}
                            </div>
                        </div>

                        {/* Professional Testimonials */}
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-6">What Healthcare Professionals Say</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {testimonials.map((testimonial) => (
                                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-16 px-4 bg-gradient-to-br from-primary/10 via-background to-blue-500/10">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                        Ready to Transform Your Practice?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join thousands of healthcare professionals using PreventVital to deliver superior patient outcomes through AI-powered preventive care.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button className="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-base font-semibold hover:bg-primary/90 transition-all shadow-lg hover:scale-105">
                            Request Demo
                        </button>
                        <button className="px-8 py-4 bg-card border-2 border-primary text-primary rounded-lg text-base font-semibold hover:bg-primary/5 transition-all">
                            Schedule Consultation
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
