import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import axios from "axios";

const schema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    subject: z.string().min(2, "Subject is required"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data: z.infer<typeof schema>) => {
        try {
            await axios.post('/api/contact', data);
            toast.success("Message sent!", { description: "We'll get back to you soon." });
            reset();
        } catch (error: any) {
            console.error("Failed to send message:", error);
            toast.error("Error sending message", {
                description: error.response?.data?.message || "Please try again later.",
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Contact Us | Prevent Vital</title>
                <meta name="description" content="Get in touch with Prevent Vital. We are here to help you with your preventive health journey." />
            </Helmet>

            <div className="min-h-screen bg-white">
                {/* Minimal Hero */}
                <div className="bg-[#020817] text-white pt-32 pb-20 px-4">
                    <div className="container mx-auto max-w-4xl text-center">
                        <span className="text-indigo-400 font-bold tracking-wider uppercase text-xs mb-4 block">Get Support</span>
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                            How can we <span className="text-indigo-500">help you?</span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Whether you have questions about our products, need technical assistance, or want to discuss a partnership, we're here to listen.
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 -mt-10 pb-20">
                    <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

                        {/* LEFT: Contact Info */}
                        <div className="lg:col-span-1 space-y-4">
                            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex items-start gap-4 hover:shadow-lg transition-all">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Email Support</h3>
                                    <p className="text-sm text-gray-500 mb-2">Typically replies in 2 hours</p>
                                    <a href="mailto:support@preventvital.com" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group">
                                        support@preventvital.com <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex items-start gap-4 hover:shadow-lg transition-all">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                                    <p className="text-sm text-gray-500 mb-2">Mon-Fri from 9am to 6pm IST</p>
                                    <a href="tel:+919581271590" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group">
                                        +91 958 127 1590 <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex items-start gap-4 hover:shadow-lg transition-all">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Office</h3>
                                    <p className="text-sm text-gray-500">
                                        Hyderabad, Telangana<br />
                                        India
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 md:p-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                                            <Input
                                                id="name"
                                                placeholder="John Doe"
                                                {...register("name")}
                                                className="h-11 rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all bg-gray-50/50"
                                            />
                                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message as string}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                                            <Input
                                                id="email"
                                                placeholder="john@example.com"
                                                {...register("email")}
                                                className="h-11 rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all bg-gray-50/50"
                                            />
                                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message as string}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                                        <Input
                                            id="subject"
                                            placeholder="What is this regarding?"
                                            {...register("subject")}
                                            className="h-11 rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all bg-gray-50/50"
                                        />
                                        {errors.subject && <p className="text-red-500 text-xs">{errors.subject.message as string}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                                        <Textarea
                                            id="message"
                                            placeholder="Type your message here..."
                                            rows={6}
                                            {...register("message")}
                                            className="rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all bg-gray-50/50 resize-y min-h-[120px]"
                                        />
                                        {errors.message && <p className="text-red-500 text-xs">{errors.message.message as string}</p>}
                                    </div>

                                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 rounded-xl transition-all hover:translate-y-[-1px]">
                                        {isSubmitting ? "Sending..." : "Send Message"} <Send className="w-4 h-4 ml-2" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
