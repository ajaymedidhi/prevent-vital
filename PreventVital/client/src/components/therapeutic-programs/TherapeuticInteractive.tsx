
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from './HeroSection';
import ProgramCategories from './ProgramCategories';
import ProgramCard from './ProgramCard';
import FeaturedInstructors from './FeaturedInstructors';
import ProgressTracker from './ProgressTracker';
import WearableIntegration from './WearableIntegration';
import CommunityFeatures from './CommunityFeatures';
import OfflineAccess from './OfflineAccess';
import CTASection from './CTASection';

interface Category {
    id: string;
    name: string;
    icon: string;
    description: string;
    sessionCount: number;
    color: string;
}

interface Program {
    id: string;
    title: string;
    instructor: string;
    duration: string;
    level: string;
    image: string;
    alt: string;
    rating: number;
    participants: number;
    category: string;
    description: string;
}

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

interface ProgressMetric {
    id: string;
    label: string;
    value: number;
    target: number;
    unit: string;
    icon: string;
    color: string;
}

interface WearableDevice {
    id: string;
    name: string;
    brand: string;
    image: string;
    alt: string;
    connected: boolean;
    lastSync: string;
}

interface CommunityPost {
    id: string;
    author: string;
    authorImage: string;
    authorAlt: string;
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
    category: string;
}

interface DownloadedProgram {
    id: string;
    title: string;
    size: string;
    downloadDate: string;
    category: string;
}

export default function TherapeuticInteractive() {
    const [isHydrated, setIsHydrated] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const categories: Category[] = [
        {
            id: 'all',
            name: 'All Programs',
            icon: 'Squares2X2Icon',
            description: 'Browse all',
            sessionCount: 500,
            color: 'primary'
        },
        {
            id: 'yoga',
            name: 'Yoga',
            icon: 'UserIcon',
            description: 'Mind-body',
            sessionCount: 150,
            color: 'secondary'
        },
        {
            id: 'meditation',
            name: 'Meditation',
            icon: 'SparklesIcon',
            description: 'Mindfulness',
            sessionCount: 120,
            color: 'trust'
        },
        {
            id: 'breathwork',
            name: 'Breathwork',
            icon: 'HeartIcon',
            description: 'Pranayama',
            sessionCount: 80,
            color: 'accent'
        },
        {
            id: 'physiotherapy',
            name: 'Physiotherapy',
            icon: 'BoltIcon',
            description: 'Recovery',
            sessionCount: 100,
            color: 'warning'
        }
    ];

    const programs: Program[] = [
        {
            id: '1',
            title: 'Morning Energizing Yoga Flow for Beginners',
            instructor: 'Dr. Priya Sharma',
            duration: '30 min',
            level: 'Beginner',
            image: "https://images.unsplash.com/photo-1701826510707-fbaf4675bc32",
            alt: 'Woman in white tank top performing downward dog yoga pose on purple mat in bright studio',
            rating: 4.9,
            participants: 2450,
            category: 'yoga',
            description: 'Start your day with gentle stretches and energizing poses designed to awaken your body and mind.'
        },
        {
            id: '2',
            title: 'Guided Mindfulness Meditation for Stress Relief',
            instructor: 'Rajesh Kumar',
            duration: '20 min',
            level: 'Beginner',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_14df5b519-1765260901013.png",
            alt: 'Man in gray shirt sitting cross-legged in meditation pose with eyes closed in peaceful room',
            rating: 4.8,
            participants: 3200,
            category: 'meditation',
            description: 'Reduce stress and anxiety through guided meditation techniques backed by neuroscience research.'
        },
        {
            id: '3',
            title: 'Advanced Pranayama Breathing Techniques',
            instructor: 'Swami Anand',
            duration: '25 min',
            level: 'Advanced',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_11b83cbcc-1764755888108.png",
            alt: 'Woman in lotus position with hands in prayer mudra practicing breathing exercises outdoors',
            rating: 4.9,
            participants: 1800,
            category: 'breathwork',
            description: 'Master advanced breathing patterns to enhance lung capacity and promote deep relaxation.'
        },
        {
            id: '4',
            title: 'Post-Injury Recovery Physiotherapy Program',
            instructor: 'Dr. Amit Patel',
            duration: '45 min',
            level: 'Intermediate',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1510bed8a-1764673562941.png",
            alt: 'Physical therapist in blue scrubs assisting patient with leg stretching exercises on treatment table',
            rating: 4.7,
            participants: 1500,
            category: 'physiotherapy',
            description: 'Scientifically designed exercises to accelerate recovery and restore full range of motion.'
        },
        {
            id: '5',
            title: 'Evening Relaxation Yoga for Better Sleep',
            instructor: 'Meera Desai',
            duration: '35 min',
            level: 'Beginner',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_197ae198f-1764668383057.png",
            alt: 'Woman in comfortable clothing performing child pose on yoga mat in dimly lit bedroom',
            rating: 4.8,
            participants: 2100,
            category: 'yoga',
            description: 'Wind down with gentle poses and breathing exercises to prepare your body for restful sleep.'
        },
        {
            id: '6',
            title: 'Deep Meditation for Emotional Healing',
            instructor: 'Guru Sanjay',
            duration: '40 min',
            level: 'Intermediate',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1284000c2-1765260904532.png",
            alt: 'Group of people sitting in meditation circle with candles in serene temple setting',
            rating: 4.9,
            participants: 2800,
            category: 'meditation',
            description: 'Journey inward to process emotions and cultivate inner peace through guided visualization.'
        }
    ];

    const instructors: Instructor[] = [
        {
            id: '1',
            name: 'Dr. Priya Sharma',
            title: 'Certified Yoga Therapist',
            specialization: 'Hatha & Vinyasa Yoga',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_111e29bbe-1763294966477.png",
            alt: 'Professional headshot of Indian woman with long black hair in traditional yoga attire smiling warmly',
            experience: '15 years',
            rating: 4.9,
            students: 5200
        },
        {
            id: '2',
            name: 'Rajesh Kumar',
            title: 'Mindfulness Expert',
            specialization: 'Vipassana & MBSR',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_125b68624-1763295869657.png",
            alt: 'Middle-aged Indian man with short gray hair in white kurta with peaceful expression',
            experience: '20 years',
            rating: 4.8,
            students: 6800
        },
        {
            id: '3',
            name: 'Swami Anand',
            title: 'Pranayama Master',
            specialization: 'Traditional Breathwork',
            image: "https://images.unsplash.com/photo-1551716353-9bda9fd14c67",
            alt: 'Elderly Indian spiritual teacher with white beard in orange robes with serene demeanor',
            experience: '30 years',
            rating: 5.0,
            students: 4500
        },
        {
            id: '4',
            name: 'Dr. Amit Patel',
            title: 'Clinical Physiotherapist',
            specialization: 'Sports & Rehabilitation',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_14ed39e6a-1765122859411.png",
            alt: 'Young Indian male doctor in white coat with stethoscope smiling confidently in clinic',
            experience: '12 years',
            rating: 4.7,
            students: 3200
        }
    ];

    const progressMetrics: ProgressMetric[] = [
        {
            id: '1',
            label: 'Yoga Sessions',
            value: 8,
            target: 12,
            unit: 'sessions',
            icon: 'FireIcon',
            color: 'secondary'
        },
        {
            id: '2',
            label: 'Meditation Minutes',
            value: 140,
            target: 200,
            unit: 'mins',
            icon: 'ClockIcon',
            color: 'trust'
        },
        {
            id: '3',
            label: 'Breathwork Practice',
            value: 5,
            target: 7,
            unit: 'days',
            icon: 'HeartIcon',
            color: 'accent'
        },
        {
            id: '4',
            label: 'Wellness Score',
            value: 78,
            target: 100,
            unit: 'points',
            icon: 'ChartBarIcon',
            color: 'success'
        }
    ];

    const wearableDevices: WearableDevice[] = [
        {
            id: '1',
            name: 'Watch Series 8',
            brand: 'Apple',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d26f8cdb-1765113715116.png",
            alt: 'Black Apple Watch displaying health metrics on wrist',
            connected: true,
            lastSync: '2 mins ago'
        },
        {
            id: '2',
            name: 'Charge 5',
            brand: 'Fitbit',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ab7eab3c-1765955320109.png",
            alt: 'Blue Fitbit fitness tracker showing heart rate on display',
            connected: true,
            lastSync: '15 mins ago'
        },
        {
            id: '3',
            name: 'Galaxy Watch',
            brand: 'Samsung',
            image: "https://images.unsplash.com/photo-1597923709001-5a061c88418d",
            alt: 'Silver Samsung smartwatch with circular display showing fitness data',
            connected: false,
            lastSync: 'Not connected'
        },
        {
            id: '4',
            name: 'Mi Band 7',
            brand: 'Xiaomi',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1889135d6-1764680248899.png",
            alt: 'Black Xiaomi fitness band with OLED display on wrist',
            connected: false,
            lastSync: 'Not connected'
        }
    ];

    const communityPosts: CommunityPost[] = [
        {
            id: '1',
            author: 'Ananya Reddy',
            authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_14e479cba-1763300676390.png",
            authorAlt: 'Young Indian woman with long dark hair smiling in casual attire',
            content: 'Just completed my 30-day yoga challenge! The AI recommendations helped me progress from beginner to intermediate level. My flexibility has improved dramatically and I feel more energized throughout the day. Thank you PreventVital community for the constant support!',
            timestamp: '2 hours ago',
            likes: 124,
            comments: 18,
            category: 'Yoga Journey'
        },
        {
            id: '2',
            author: 'Vikram Singh',
            authorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_15fd8f0f7-1763295595860.png",
            authorAlt: 'Middle-aged Indian man with short black hair in business casual attire',
            content: 'The breathwork sessions have been life-changing for managing my work stress. My heart rate variability has improved by 40% according to my wearable data. Highly recommend the Advanced Pranayama program!',
            timestamp: '5 hours ago',
            likes: 89,
            comments: 12,
            category: 'Breathwork'
        },
        {
            id: '3',
            author: 'Kavita Menon',
            authorImage: "https://images.unsplash.com/photo-1617593461584-4d51cc5cff4c",
            authorAlt: 'Senior Indian woman with gray hair in traditional saree with warm smile',
            content: 'At 62, I never thought I could practice yoga regularly. The physiotherapy-integrated programs helped me recover from knee surgery faster than expected. Now I practice daily and feel 20 years younger!',
            timestamp: '1 day ago',
            likes: 256,
            comments: 34,
            category: 'Success Story'
        }
    ];

    const downloadedPrograms: DownloadedProgram[] = [
        {
            id: '1',
            title: 'Morning Energizing Yoga Flow',
            size: '245 MB',
            downloadDate: '18 Dec 2025',
            category: 'Yoga'
        },
        {
            id: '2',
            title: 'Guided Mindfulness Meditation',
            size: '180 MB',
            downloadDate: '17 Dec 2025',
            category: 'Meditation'
        },
        {
            id: '3',
            title: 'Advanced Pranayama Techniques',
            size: '210 MB',
            downloadDate: '15 Dec 2025',
            category: 'Breathwork'
        }
    ];

    const filteredPrograms = selectedCategory === 'all'
        ? programs
        : programs.filter((program) => program.category === selectedCategory);

    const handleCategorySelect = (categoryId: string) => {
        if (!isHydrated) return;
        setSelectedCategory(categoryId);
    };

    const handleStartSession = (programId: string) => {
        if (!isHydrated) return;
        console.log('Starting session:', programId);
    };

    const handleDownload = (programId: string) => {
        if (!isHydrated) return;
        console.log('Downloading program:', programId);
    };

    const handleSetGoal = () => {
        if (!isHydrated) return;
        console.log('Setting new goal');
    };

    const handleConnectDevice = (deviceId: string) => {
        if (!isHydrated) return;
        console.log('Connecting device:', deviceId);
    };

    const handleSyncDevice = (deviceId: string) => {
        if (!isHydrated) return;
        console.log('Syncing device:', deviceId);
    };

    const handleShare = () => {
        if (!isHydrated) return;
        console.log('Sharing referral link');
    };

    const handleJoinCommunity = () => {
        if (!isHydrated) return;
        console.log('Joining community');
    };

    const handleManageDownloads = () => {
        if (!isHydrated) return;
        console.log('Managing downloads');
    };

    const handleStartAssessment = () => {
        if (!isHydrated) return;
        window.location.href = '/ai-health-assessment';
    };

    if (!isHydrated) {
        return (
            <div className="min-h-screen bg-background">
                <div className="animate-pulse">
                    <div className="h-96 bg-muted"></div>
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <div className="grid md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-64 bg-muted rounded-xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Therapeutic Programs | PreventVital</title>
                <meta name="description" content="Discover AI-enhanced therapeutic programs for holistic wellness. Yoga, meditation, breathwork, and physiotherapy customized for you." />
            </Helmet>

            <div className="min-h-screen bg-background">
                <HeroSection />

                <ProgramCategories
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategorySelect={handleCategorySelect}
                />

                <section className="bg-background py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPrograms.map((program) => (
                                <ProgramCard
                                    key={program.id}
                                    program={program}
                                    onStartSession={handleStartSession}
                                    onDownload={handleDownload}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <FeaturedInstructors instructors={instructors} />

                <ProgressTracker metrics={progressMetrics} onSetGoal={handleSetGoal} />

                <WearableIntegration
                    devices={wearableDevices}
                    onConnect={handleConnectDevice}
                    onSync={handleSyncDevice}
                />

                <CommunityFeatures
                    posts={communityPosts}
                    onShare={handleShare}
                    onJoinCommunity={handleJoinCommunity}
                />

                <OfflineAccess
                    downloadedPrograms={downloadedPrograms}
                    onManageDownloads={handleManageDownloads}
                />

                <CTASection onStartAssessment={handleStartAssessment} />
            </div>
        </>
    );
}
