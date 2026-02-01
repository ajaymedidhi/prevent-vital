
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
            <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Skeleton matching the layout */}
                    <div className="animate-pulse space-y-8">
                        <div className="h-12 bg-slate-200 rounded-lg w-2/3"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const TabIcon = ({ icon, className }: { icon: string, className?: string }) => {
        switch (icon) {
            case 'HomeIcon': return <Home size={18} className={className} />;
            case 'UserGroupIcon': return <Users size={18} className={className} />;
            case 'CalendarIcon': return <Calendar size={18} className={className} />;
            case 'AcademicCapIcon': return <GraduationCap size={18} className={className} />;
            default: return null;
        }
    }

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Hero Section */}
            <section className="pt-28 pb-12 px-4 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 animate-fade-in-up">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 rounded-full mb-6 border border-blue-100/50">
                            <ShieldCheck size={16} className="text-blue-600" />
                            <span className="text-xs font-bold text-blue-700 tracking-wider uppercase">Medical Professional Portal</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                            Empower Your Practice with<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600">AI-Driven Patient Care</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
                            Comprehensive patient management tools, clinical decision support, and telemedicine integration designed for modern healthcare professionals.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        {stats.map((stat, index) => (
                            <StatsCard key={index} {...stat} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Navigation Tabs - Sticky & Glassmorphic */}
            <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex space-x-1 overflow-x-auto py-3 no-scrollbar">
                        {[
                            { id: 'dashboard', label: 'Dashboard', icon: 'HomeIcon' },
                            { id: 'patients', label: 'Patient Management', icon: 'UserGroupIcon' },
                            { id: 'appointments', label: 'Appointments', icon: 'CalendarIcon' },
                            { id: 'research', label: 'Research & Education', icon: 'AcademicCapIcon' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-300 ${activeTab === tab.id
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10 scale-[1.02]'
                                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                                    }`}
                            >
                                <TabIcon icon={tab.icon} className={activeTab === tab.id ? "text-blue-400" : ""} />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Area */}
            <main className="py-12 px-4 max-w-7xl mx-auto min-h-[600px]">
                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <div className="animate-fade-in-up">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column: Schedule & Key Info */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Today's Schedule Panel */}
                                <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                                    <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                        <h2 className="text-lg font-bold text-slate-900 flex items-center">
                                            <Calendar className="mr-2 text-blue-600" size={20} />
                                            Today's Schedule
                                        </h2>
                                        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                                            View Calendar
                                        </button>
                                    </div>
                                    <div className="divide-y divide-slate-100">
                                        {appointments.slice(0, 3).map((appointment) => (
                                            <div key={appointment.id} className="group hover:bg-slate-50/80 transition-colors p-4 flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs ring-2 ring-white shadow-sm">
                                                        {appointment.time}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-900">{appointment.patientName}</h3>
                                                        <p className="text-sm text-slate-500">{appointment.type} • <span className={`capitalize ${appointment.status === 'in-progress' ? 'text-emerald-600 font-medium' : ''}`}>{appointment.status}</span></p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleManageAppointment(appointment.id)}
                                                    className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-50 hover:border-slate-300 shadow-sm"
                                                >
                                                    Manage
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                                        <button className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">View all 18 appointments</button>
                                    </div>
                                </div>

                                {/* Platform Capabilities (Moved here for better flow) */}
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 mb-6">Platform Capabilities</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {features.map((feature, index) => (
                                            <FeatureCard key={index} feature={feature} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Quick Actions & Alerts */}
                            <div className="space-y-8">
                                <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
                                    <h2 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button className="col-span-1 p-4 bg-blue-50 border border-blue-100 rounded-xl text-left hover:bg-blue-100/80 transition-all group">
                                            <Video className="text-blue-600 mb-3 group-hover:scale-110 transition-transform" size={24} />
                                            <span className="block text-sm font-bold text-slate-900">Start Telemedicine</span>
                                        </button>
                                        <button className="col-span-1 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-left hover:bg-emerald-100/80 transition-all group">
                                            <UserPlus className="text-emerald-600 mb-3 group-hover:scale-110 transition-transform" size={24} />
                                            <span className="block text-sm font-bold text-slate-900">Add Patient</span>
                                        </button>
                                        <button className="col-span-1 p-4 bg-amber-50 border border-amber-100 rounded-xl text-left hover:bg-amber-100/80 transition-all group">
                                            <FileBarChart className="text-amber-600 mb-3 group-hover:scale-110 transition-transform" size={24} />
                                            <span className="block text-sm font-bold text-slate-900">Reports</span>
                                        </button>
                                        <button className="col-span-1 p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-left hover:bg-indigo-100/80 transition-all group">
                                            <FileText className="text-indigo-600 mb-3 group-hover:scale-110 transition-transform" size={24} />
                                            <span className="block text-sm font-bold text-slate-900">Access EHR</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Recent Alerts / Updates (Mock) */}
                                <div className="bg-slate-900 rounded-2xl text-white p-6 shadow-xl shadow-slate-900/10">
                                    <h2 className="text-lg font-bold mb-4 flex items-center">
                                        <span className="relative flex h-3 w-3 mr-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                        </span>
                                        Critical Alerts
                                    </h2>
                                    <div className="space-y-4">
                                        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                                            <p className="text-sm font-medium text-red-200 mb-1">High Risk Detected</p>
                                            <p className="text-xs text-slate-300">Patient <span className="text-white font-bold">Amit Patel</span> approaching critical cardiac threshold.</p>
                                        </div>
                                        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                                            <p className="text-sm font-medium text-amber-200 mb-1">Missed Check-in</p>
                                            <p className="text-xs text-slate-300">Patient <span className="text-white font-bold">Sneha Reddy</span> missed daily vitals log.</p>
                                        </div>
                                    </div>
                                    <button className="w-full mt-4 py-2 text-xs font-bold text-slate-400 hover:text-white transition-colors border-t border-white/10 uppercase tracking-wider">
                                        View All Alerts
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Patients Tab */}
                {activeTab === 'patients' && (
                    <section className="animate-fade-in-up">
                        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                            <h2 className="text-2xl font-bold text-slate-900">Patient Management</h2>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="text"
                                    placeholder="Search patients..."
                                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white w-full md:w-64"
                                />
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
                                    Add New Patient
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
                    </section>
                )}

                {/* Appointments Tab */}
                {activeTab === 'appointments' && (
                    <section className="animate-fade-in-up">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold text-slate-900">Appointment Management</h2>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all shadow-md">
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
                    </section>
                )}

                {/* Research Tab */}
                {activeTab === 'research' && (
                    <section className="animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-200 pb-4">Research & Continuing Education</h2>

                        {/* Research Publications */}
                        <div className="mb-16">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                                <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
                                Latest Publications
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {research.map((item) => (
                                    <ResearchCard key={item.id} research={item} />
                                ))}
                            </div>
                        </div>

                        {/* Professional Testimonials */}
                        <div>
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                                <span className="w-1 h-6 bg-emerald-500 rounded-full mr-3"></span>
                                Peer Reviews
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {testimonials.map((testimonial) => (
                                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                        Ready to Transform Your Practice?
                    </h2>
                    <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
                        Join thousands of healthcare professionals using PreventVital to deliver superior patient outcomes through AI-powered preventive care.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button className="px-8 py-4 bg-blue-600 text-white rounded-lg text-base font-bold hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/50 hover:scale-105">
                            Request Demo
                        </button>
                        <button className="px-8 py-4 bg-transparent border-2 border-slate-700 text-white rounded-lg text-base font-bold hover:bg-slate-800 transition-all">
                            Schedule Consultation
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
