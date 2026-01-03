
import { Mail, MapPin, Phone, Send, Users, Building2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-grow pt-20">
                <section className="bg-gradient-to-b from-secondary/20 to-background py-20 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="max-w-3xl mx-auto text-center mb-16">
                            <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
                            <p className="text-lg text-muted-foreground text-balance">
                                Have questions about our platform or want to partner with us? We'd love to hear from you.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                            {/* Contact Info */}
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <Mail className="w-5 h-5 text-accent mt-1" />
                                            <div>
                                                <p className="font-medium">General Inquiries</p>
                                                <a href="mailto:hello@PreventVital.ai" className="text-muted-foreground hover:text-primary">hello@PreventVital.ai</a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Phone className="w-5 h-5 text-accent mt-1" />
                                            <div>
                                                <p className="font-medium">Support (24/7)</p>
                                                <a href="mailto:support@PreventVital.ai" className="text-muted-foreground hover:text-primary">support@PreventVital.ai</a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Users className="w-5 h-5 text-accent mt-1" />
                                            <div>
                                                <p className="font-medium">Partnerships</p>
                                                <a href="mailto:partnerships@PreventVital.ai" className="text-muted-foreground hover:text-primary">partnerships@PreventVital.ai</a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Building2 className="w-5 h-5 text-accent mt-1" />
                                            <div>
                                                <p className="font-medium">Corporate Wellness</p>
                                                <a href="mailto:corporate@PreventVital.ai" className="text-muted-foreground hover:text-primary">corporate@PreventVital.ai</a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Briefcase className="w-5 h-5 text-accent mt-1" />
                                            <div>
                                                <p className="font-medium">Careers</p>
                                                <a href="mailto:careers@PreventVital.ai" className="text-muted-foreground hover:text-primary">careers@PreventVital.ai</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Location</h3>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-accent mt-1" />
                                        <div>
                                            <p className="font-medium">Headquarters</p>
                                            <p className="text-muted-foreground">Hyderabad, Telangana, India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
                                <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="first-name" className="text-sm font-medium">First name</label>
                                            <Input id="first-name" placeholder="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="last-name" className="text-sm font-medium">Last name</label>
                                            <Input id="last-name" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                                        <Input id="email" type="email" placeholder="john@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                        <Input id="subject" placeholder="How can we help?" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">Message</label>
                                        <Textarea id="message" placeholder="Tell us more about your inquiry..." className="min-h-[120px]" />
                                    </div>
                                    <Button type="submit" className="w-full gap-2">
                                        Send Message
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Contact;
