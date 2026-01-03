
import { CloudDownload, Check, Settings, FileDown, Trash2 } from 'lucide-react';

interface DownloadedProgram {
    id: string;
    title: string;
    size: string;
    downloadDate: string;
    category: string;
}

interface OfflineAccessProps {
    downloadedPrograms: DownloadedProgram[];
    onManageDownloads: () => void;
}

export default function OfflineAccess({
    downloadedPrograms,
    onManageDownloads,
}: OfflineAccessProps) {
    const totalSize = downloadedPrograms.reduce((acc, program) => {
        const size = parseFloat(program.size);
        return acc + size;
    }, 0);

    return (
        <section className="bg-background py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-cyan-500/5 to-amber-500/5 border border-border rounded-2xl p-8 lg:p-12">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-6">
                                <CloudDownload size={20} className="text-cyan-600 dark:text-cyan-400" />
                                <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Offline Access Available</span>
                            </div>

                            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                                Practice Anywhere, Anytime
                            </h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Download your favorite programs and access them offline. No internet? No problem. Your wellness journey continues uninterrupted.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start space-x-3">
                                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex-shrink-0">
                                        <Check size={18} className="text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-foreground mb-1">
                                            High-Quality Downloads
                                        </h4>
                                        <p className="text-xs text-muted-foreground">
                                            Crystal clear video and audio for the best offline experience
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex-shrink-0">
                                        <Check size={18} className="text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-foreground mb-1">
                                            Smart Storage Management
                                        </h4>
                                        <p className="text-xs text-muted-foreground">
                                            Automatically optimize storage and remove old downloads
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex-shrink-0">
                                        <Check size={18} className="text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-foreground mb-1">
                                            Sync Progress Automatically
                                        </h4>
                                        <p className="text-xs text-muted-foreground">
                                            Your progress syncs when you're back online
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={onManageDownloads}
                                className="flex items-center space-x-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold"
                            >
                                <Settings size={20} />
                                <span>Manage Downloads</span>
                            </button>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-foreground">
                                    Downloaded Programs
                                </h3>
                                <div className="text-sm text-muted-foreground">
                                    {totalSize.toFixed(1)} MB total
                                </div>
                            </div>

                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {downloadedPrograms.map((program) => (
                                    <div
                                        key={program.id}
                                        className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                                    >
                                        <div className="flex items-center space-x-3 flex-1">
                                            <div className="flex items-center justify-center w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex-shrink-0">
                                                <FileDown size={20} className="text-cyan-600 dark:text-cyan-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-foreground truncate">
                                                    {program.title}
                                                </h4>
                                                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                                    <span>{program.category}</span>
                                                    <span>•</span>
                                                    <span>{program.size}</span>
                                                    <span>•</span>
                                                    <span>{program.downloadDate}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                                            aria-label="Delete download"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            {downloadedPrograms.length === 0 && (
                                <div className="text-center py-12">
                                    <CloudDownload size={48} className="text-muted-foreground mx-auto mb-4" />
                                    <p className="text-sm text-muted-foreground">
                                        No downloaded programs yet. Start downloading to access content offline!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
