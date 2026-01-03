
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/homepage/HeroSection';
import TrustIndicators from '@/components/homepage/TrustIndicators';
import ConditionCards from '@/components/homepage/ConditionCards';
import PlatformDemo from '@/components/homepage/PlatformDemo';
import ClinicalCredibility from '@/components/homepage/ClinicalCredibility';
import TestimonialSection from '@/components/homepage/TestimonialSection';
import CTASection from '@/components/homepage/CTASection';

const Index = () => {
    return (
        <>
            <Helmet>
                <title>PreventVital - AI-Powered Preventive Healthcare</title>
                <meta
                    name="description"
                    content="Empowering you with AI-driven health predictions and personalized wellness plans. Join the future of preventive healthcare."
                />
            </Helmet>

            <main className="min-h-screen bg-background text-foreground">
                <HeroSection />
                <TrustIndicators />
                <PlatformDemo />
                <ConditionCards />
                <ClinicalCredibility />
                <TestimonialSection />
                <CTASection />
            </main>
        </>
    );
};

export default Index;
