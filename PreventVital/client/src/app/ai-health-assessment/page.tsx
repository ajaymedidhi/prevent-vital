
import AssessmentInteractive from "@/components/ai-health-assessment/AssessmentInteractive";
import { Helmet } from "react-helmet-async";

const AiHealthAssessmentPage = () => {
    return (
        <>
            <Helmet>
                <title>AI Health Assessment - PreventVital</title>
                <meta
                    name="description"
                    content="Take our comprehensive AI-driven health assessment to understand your cardiovascular, metabolic, and mental wellness profile."
                />
            </Helmet>

            <div className="bg-background min-h-screen">
                <section className="bg-gradient-to-r from-primary/5 to-accent/5 py-12 lg:py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-3xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-pink-500 pb-2">
                            VITAL SCORE ASSESSMENT
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Discover your personal health score and receive tailored recommendations through our advanced predictive analytics engine.
                        </p>
                    </div>
                </section>

                <section className="container mx-auto px-4 py-8 lg:py-12">
                    <AssessmentInteractive />
                </section>
            </div>
        </>
    );
};

export default AiHealthAssessmentPage;
