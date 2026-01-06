import React from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Smartphone } from 'lucide-react';

const OrderSuccessPage = () => {
    const { orderId } = useParams();
    const [searchParams] = useSearchParams();
    const invoiceUrl = searchParams.get('invoice');

    return (
        <div className="container mx-auto py-20 px-4 text-center max-w-2xl bg-black">
            <div className="flex justify-center mb-6">
                <CheckCircle className="text-green-500 w-20 h-20" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-white">Order Confirmed!</h1>
            <p className="text-xl text-muted-foreground mb-8">
                Thank you for your purchase. Your order ID is <span className="font-mono text-primary">{orderId}</span>.
                Your device is on its way.
            </p>

            <div className="bg-muted/20 p-8 rounded-2xl border mb-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Start Your Health Program</h2>
                <p className="mb-6 text-white">Download the PreventVital App now to pair your device and track your vitals.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="gap-2">
                        <Smartphone size={20} />
                        Download for iOS
                    </Button>
                    <Button size="lg" variant="outline" className="gap-2">
                        <Smartphone size={20} />
                        Download for Android
                    </Button>
                </div>
            </div>

            {invoiceUrl && (
                <div className="mt-8">
                    <Button asChild variant="link" className="text-primary text-white">
                        <a href={`${invoiceUrl}`} target="_blank" rel="noopener noreferrer" className="gap-2 flex items-center justify-center">
                            <Download size={16} />
                            Download Tax Invoice
                        </a>
                    </Button>
                </div>
            )}

            <div className="mt-8">
                <Button asChild variant="ghost" className='text-white'>
                    <Link to="/products">Continue Shopping</Link>
                </Button>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
