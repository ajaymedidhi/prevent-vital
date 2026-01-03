
import DiseaseProgramsInteractive from "@/components/disease-prevention-programs/DiseaseProgramsInteractive";
import { Helmet } from "react-helmet-async";

const DiseasePreventionProgramsPage = () => {
    return (
        <>
            <Helmet>
                <title>Disease Prevention Programs - PreventVital</title>
                <meta name="description" content="Explore our AI-powered disease prevention programs aimed at diabetes, hypertension, cardiac health, and more." />
            </Helmet>
            <DiseaseProgramsInteractive />
        </>
    );
};

export default DiseasePreventionProgramsPage;
