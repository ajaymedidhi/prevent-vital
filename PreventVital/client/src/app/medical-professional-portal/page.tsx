
import MedicalPortalInteractive from "@/components/medical-professional-portal/MedicalPortalInteractive";
import { Helmet } from "react-helmet-async";

const MedicalProfessionalPortalPage = () => {
    return (
        <>
            <Helmet>
                <title>Medical Professional Portal - PreventVital</title>
                <meta
                    name="description"
                    content="Empower your practice with AI-driven patient care, predictive analytics, and seamless telemedicine integration."
                />
            </Helmet>

            <MedicalPortalInteractive />
        </>
    );
};

export default MedicalProfessionalPortalPage;
