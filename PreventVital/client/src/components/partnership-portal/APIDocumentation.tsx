
import { useState } from 'react';
import {
    FileText,
    Check,
    Clipboard,
    Code2,
    Play,
    Key
} from 'lucide-react';

interface APIEndpoint {
    id: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    endpoint: string;
    description: string;
    category: string;
}

const apiEndpoints: APIEndpoint[] = [
    {
        id: 'get-patient',
        method: 'GET',
        endpoint: '/api/v1/patients/{patientId}',
        description: 'Retrieve detailed patient information including health metrics and monitoring data',
        category: 'Patient Management'
    },
    {
        id: 'create-patient',
        method: 'POST',
        endpoint: '/api/v1/patients',
        description: 'Create a new patient profile with initial health assessment data',
        category: 'Patient Management'
    },
    {
        id: 'update-vitals',
        method: 'PUT',
        endpoint: '/api/v1/patients/{patientId}/vitals',
        description: 'Update patient vital signs from connected devices or manual entry',
        category: 'Health Data'
    },
    {
        id: 'get-predictions',
        method: 'GET',
        endpoint: '/api/v1/predictions/{patientId}',
        description: 'Retrieve AI-generated health predictions and risk assessments',
        category: 'AI Analytics'
    },
    {
        id: 'sync-device',
        method: 'POST',
        endpoint: '/api/v1/devices/sync',
        description: 'Synchronize data from wearable devices and health monitoring equipment',
        category: 'Device Integration'
    },
    {
        id: 'get-alerts',
        method: 'GET',
        endpoint: '/api/v1/alerts/{patientId}',
        description: 'Fetch active health alerts and notifications for a patient',
        category: 'Monitoring'
    }
];

interface APIDocumentationProps {
    className?: string;
}

const APIDocumentation = ({ className = '' }: APIDocumentationProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

    const categories = ['all', ...Array.from(new Set(apiEndpoints.map(e => e.category)))];

    const filteredEndpoints = selectedCategory === 'all'
        ? apiEndpoints
        : apiEndpoints.filter(e => e.category === selectedCategory);

    const handleCopy = (endpoint: string) => {
        navigator.clipboard.writeText(endpoint);
        setCopiedEndpoint(endpoint);
        setTimeout(() => setCopiedEndpoint(null), 2000);
    };

    const getMethodColor = (method: string) => {
        switch (method) {
            case 'GET': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'POST': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'PUT': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            case 'DELETE': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-muted text-muted-foreground';
        }
    };

    return (
        <section className={`py-16 lg:py-24 bg-background ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        API Documentation
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Comprehensive REST API documentation for seamless integration with PreventVital platform
                    </p>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-card rounded-xl p-6 shadow-sm border border-border sticky top-24">
                            <h3 className="text-lg font-bold text-foreground mb-4">Categories</h3>
                            <div className="space-y-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-300 ${selectedCategory === category
                                                ? 'bg-primary text-primary-foreground'
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                            }`}
                                    >
                                        {category === 'all' ? 'All Endpoints' : category}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t border-border">
                                <button className="w-full px-4 py-3 bg-primary/10 text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 flex items-center justify-center space-x-2">
                                    <FileText size={18} />
                                    <span>Full Documentation</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-4">
                        {filteredEndpoints.map((endpoint) => (
                            <div
                                key={endpoint.id}
                                className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
                                    <div className="flex items-center space-x-3">
                                        <span className={`px-3 py-1 rounded-md font-bold text-sm ${getMethodColor(endpoint.method)}`}>
                                            {endpoint.method}
                                        </span>
                                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                                            {endpoint.category}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleCopy(endpoint.endpoint)}
                                        className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
                                    >
                                        {copiedEndpoint === endpoint.endpoint ? <Check size={18} /> : <Clipboard size={18} />}
                                        <span className="text-sm font-medium">
                                            {copiedEndpoint === endpoint.endpoint ? 'Copied!' : 'Copy'}
                                        </span>
                                    </button>
                                </div>

                                <div className="bg-muted rounded-lg p-4 mb-4 font-mono text-sm text-foreground overflow-x-auto">
                                    {endpoint.endpoint}
                                </div>

                                <p className="text-muted-foreground leading-relaxed">
                                    {endpoint.description}
                                </p>

                                <div className="mt-4 flex items-center space-x-4">
                                    <button className="text-primary hover:text-primary/80 font-medium text-sm flex items-center space-x-1 transition-colors">
                                        <Code2 size={16} />
                                        <span>View Example</span>
                                    </button>
                                    <button className="text-primary hover:text-primary/80 font-medium text-sm flex items-center space-x-1 transition-colors">
                                        <Play size={16} />
                                        <span>Try it Out</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-12 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl p-8 border border-primary/20">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Key size={24} className="text-primary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-1">
                                    Need API Access?
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    Get your API credentials and start integrating with PreventVital platform today
                                </p>
                            </div>
                        </div>
                        <button className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 flex items-center space-x-2 whitespace-nowrap">
                            <Key size={18} />
                            <span>Get API Keys</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default APIDocumentation;
