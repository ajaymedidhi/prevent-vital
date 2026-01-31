import { Helmet } from "react-helmet-async";
import { Award, ShieldCheck, Users, Building2, MapPin, IndianRupee, Activity, ArrowRight } from "lucide-react";

const stats = [
    { label: "Patients", value: "10,000+", icon: Users },
    { label: "Therapy Sessions", value: "500,000+", icon: Activity },
    { label: "Hospital Partners", value: "50+", icon: Building2 },
    { label: "States Present", value: "15", icon: MapPin },
    { label: "Healthcare Costs Saved", value: "₹450 Cr", icon: IndianRupee },
    { label: "Patient Satisfaction", value: "4.8/5", icon: Award },
];

const badges = [
    "ABDM Compliant",
    "ISO 27001 Certified",
    "ISO 13485 Certified",
    "HIPAA-Equivalent Security",
    "Startup India Recognized"
];

const Team = () => {
    return (
        <>
            <Helmet>
                <title>Our Team | Prevent Vital</title>
                <meta name="description" content="Meet the medical visionaries and technology experts behind Prevent Vital AI." />
            </Helmet>

            <div className="min-h-screen bg-gray-50/50">
                {/* Hero Section */}
                <div className="bg-[#020817] text-white pt-32 pb-24 px-4 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    <div className="container mx-auto max-w-4xl text-center relative z-10">
                        <span className="text-indigo-400 font-bold tracking-wider uppercase text-xs mb-4 block">Leadership</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                            Visionaries driving <span className="text-indigo-500">future health.</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Prevent Vital AI is led by clinician-entrepreneurs committed to bridging the gap between advanced technology and human-centric care.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 -mt-16 pb-20 relative z-20 space-y-12">

                    {/* Founder 1: Dr. Sindhura */}
                    <div className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col md:flex-row transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="md:w-2/5 relative bg-indigo-50 min-h-[320px]">
                            <img
                                src="/images/sindhura.webp"
                                alt="Dr. Sindhura Nalluru"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/10"></div>
                            <div className="absolute bottom-4 left-4 text-white md:hidden">
                                <h3 className="text-2xl font-bold">Dr. Sindhura Nalluru</h3>
                                <p className="opacity-90">Founder & Managing Director</p>
                            </div>
                        </div>
                        <div className="md:w-3/5 p-8 md:p-12">
                            <div className="hidden md:block mb-6">
                                <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
                                    Founder & Managing Director
                                </span>
                                <h3 className="text-3xl font-bold text-gray-900">Dr. Sindhura Nalluru</h3>
                                <p className="text-gray-500 font-medium">MBBS, MD</p>
                            </div>

                            <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                                <p>
                                    Dr. Sindhura Nalluru is the driving force behind the vision to build an AI‑first preventive health ecosystem from India. With a strong clinical background and hands-on experience in managing complex patients, she brings a deep understanding of real-world healthcare gaps.
                                </p>
                                <p>
                                    As a clinician–entrepreneur, she leads strategy across AI-based medical device R&D, preventive health platforms, and AI‑enabled wearables. Her leadership emphasizes evidence-based medicine, ethical AI, and regulatory readiness.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Founder 2: Dr. Rakesh */}
                    <div className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col md:flex-row-reverse transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="md:w-2/5 relative bg-indigo-50 min-h-[320px]">
                            <img
                                src="/images/rakesh.webp"
                                alt="Dr. Rakesh Kumar"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-l md:from-transparent md:to-black/10"></div>
                            <div className="absolute bottom-4 left-4 text-white md:hidden">
                                <h3 className="text-2xl font-bold">Dr. Rakesh Kumar</h3>
                                <p className="opacity-90">Founder Chairman</p>
                            </div>
                        </div>
                        <div className="md:w-3/5 p-8 md:p-12">
                            <div className="hidden md:block mb-6">
                                <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
                                    Founder Chairman
                                </span>
                                <h3 className="text-3xl font-bold text-gray-900">Dr. Rakesh Kumar</h3>
                                <p className="text-gray-500 font-medium">MBBS, MD, DNB (Cardiology)</p>
                            </div>

                            <div className="space-y-4 text-gray-600 leading-relaxed text-sm md:text-base">
                                <p>
                                    Dr. Rakesh Kumar is a senior interventional cardiologist with a deep commitment to preventive and precision cardiovascular care. He brings extensive experience in managing complex coronary, structural, and heart failure patients.
                                </p>
                                <p>
                                    He provides strategic direction for AI‑based medical device R&D and preventive cardiology programs. His leadership ensures that every product is grounded in evidence-based medicine, ethical practice, and measurable patient outcomes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Impact Stats */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Impact</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto">Making a measurable difference in India's healthcare landscape through technology and care.</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl mx-auto">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group">
                                    <div className="w-12 h-12 mx-auto bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Advisory Board (Simplified) */}
                <section className="py-20 bg-gray-50 border-t border-gray-200">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-8 text-gray-900">Advisory Board</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                            Our work is guided by leading medical experts in cardiology, endocrinology, pulmonology, mental health, yoga therapy, and AI ethics.
                        </p>
                        <div className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700 cursor-pointer">
                            View all advisors <ArrowRight className="ml-2 w-4 h-4" />
                        </div>
                    </div>
                </section>

                {/* Compliance */}
                <section className="py-16 bg-white border-t border-gray-200">
                    <div className="container mx-auto px-4 text-center">
                        <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest mb-8">Trusted & Compliant</p>
                        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                            {badges.map((badge, index) => (
                                <div key={index} className="flex items-center gap-2 px-6 py-3 bg-gray-50 rounded-full text-gray-600 font-medium border border-gray-100 shadow-sm">
                                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                                    {badge}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Team;
