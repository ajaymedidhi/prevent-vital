
import { Helmet } from 'react-helmet-async';
import PartnershipHero from '@/components/partnership-portal/PartnershipHero';
import PartnershipTypes from '@/components/partnership-portal/PartnershipTypes';
import PartnerSuccessMetrics from '@/components/partnership-portal/PartnerSuccessMetrics';
import IntegrationShowcase from '@/components/partnership-portal/IntegrationShowcase';
import APIDocumentation from '@/components/partnership-portal/APIDocumentation';
import ComplianceCertifications from '@/components/partnership-portal/ComplianceCertifications';
import OnboardingWorkflow from '@/components/partnership-portal/OnboardingWorkflow';
import PricingTiers from '@/components/partnership-portal/PricingTiers';
import PartnerCTA from '@/components/partnership-portal/PartnerCTA';

const PartnershipPortalInteractive = () => {
    return (
        <>
            <Helmet>
                <title>Partnership Portal | PreventVital</title>
                <meta name="description" content="Partner with PreventVital to transform healthcare. Explore our ecosystem for hospitals, device manufacturers, and technology providers." />
            </Helmet>

            <div className="min-h-screen bg-background text-foreground">
                <PartnershipHero />
                <PartnershipTypes />
                <PartnerSuccessMetrics />
                <IntegrationShowcase />
                <OnboardingWorkflow />
                <APIDocumentation />
                <ComplianceCertifications />
                <PricingTiers />
                <PartnerCTA />
            </div>
        </>
    );
};

export default PartnershipPortalInteractive;
