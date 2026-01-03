
import { Heart, MessageSquare, Share2, Users, CheckCircle, Gift } from 'lucide-react';

interface CommunityPost {
    id: string;
    author: string;
    authorImage: string;
    authorAlt: string;
    content: string;
    timestamp: string;
    likes: number;
    comments: number;
    category: string;
}

interface CommunityFeaturesProps {
    posts: CommunityPost[];
    onShare: () => void;
    onJoinCommunity: () => void;
}

export default function CommunityFeatures({
    posts,
    onShare,
    onJoinCommunity,
}: CommunityFeaturesProps) {
    return (
        <section className="bg-muted/30 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        Join Our Wellness Community
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Connect with fellow wellness enthusiasts, share experiences, and support each other on your health journeys
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2 space-y-6">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                        <img
                                            src={post.authorImage}
                                            alt={post.authorAlt}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <h3 className="text-sm font-semibold text-foreground">
                                                    {post.author}
                                                </h3>
                                                <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                                            </div>
                                            <span className="inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-medium">
                                                {post.category}
                                            </span>
                                        </div>

                                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                            {post.content}
                                        </p>

                                        <div className="flex items-center space-x-6">
                                            <button className="flex items-center space-x-2 text-muted-foreground hover:text-red-500 transition-colors">
                                                <Heart size={18} />
                                                <span className="text-sm font-medium">{post.likes}</span>
                                            </button>
                                            <button className="flex items-center space-x-2 text-muted-foreground hover:text-cyan-600 transition-colors">
                                                <MessageSquare size={18} />
                                                <span className="text-sm font-medium">{post.comments}</span>
                                            </button>
                                            <button className="flex items-center space-x-2 text-muted-foreground hover:text-amber-500 transition-colors">
                                                <Share2 size={18} />
                                                <span className="text-sm font-medium">Share</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6">
                        <div className="bg-gradient-to-br from-amber-500/10 to-cyan-500/10 border border-border rounded-xl p-6">
                            <div className="flex items-center justify-center w-14 h-14 bg-amber-500/20 rounded-xl mb-4">
                                <Users size={28} className="text-amber-600 dark:text-amber-400" />
                            </div>

                            <h3 className="text-xl font-bold text-foreground mb-3">
                                12,500+ Active Members
                            </h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                Join thousands of wellness enthusiasts sharing their transformation stories and supporting each other daily.
                            </p>

                            <button
                                onClick={onJoinCommunity}
                                className="w-full px-4 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold"
                            >
                                Join Community
                            </button>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-foreground mb-4">
                                Community Guidelines
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-muted-foreground">
                                        Share authentic experiences and support others
                                    </p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-muted-foreground">
                                        Respect privacy and maintain confidentiality
                                    </p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-muted-foreground">
                                        Provide constructive feedback and encouragement
                                    </p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-muted-foreground">
                                        Celebrate milestones and progress together
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-foreground mb-4">
                                Referral Program
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Invite friends and earn rewards for every successful referral. Help others discover their wellness journey!
                            </p>

                            <button
                                onClick={onShare}
                                className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
                            >
                                <Gift size={18} />
                                <span>Share & Earn</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
