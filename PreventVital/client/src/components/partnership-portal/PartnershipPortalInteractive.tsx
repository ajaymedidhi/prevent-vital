
import { Helmet } from 'react-helmet-async';
import PartnershipHero from '@/components/partnership-portal/PartnershipHero';
import PartnershipTypes from '@/components/partnership-portal/PartnershipTypes';
import WhyPartner from '@/components/partnership-portal/WhyPartner';
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
                <WhyPartner />
                <PartnerCTA />
            </div>
        </>
    );
};

export default PartnershipPortalInteractive;
