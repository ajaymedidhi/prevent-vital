import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Globe, MapPin } from 'lucide-react';

interface RegionBadgeProps {
    allowedRegions: string[];
    userRegion: string;
}

const RegionBadge: React.FC<RegionBadgeProps> = ({ allowedRegions, userRegion }) => {
    const isGlobal = allowedRegions.length === 0;
    const isAllowed = isGlobal || allowedRegions.includes(userRegion);

    if (isGlobal) {
        return (
            <Badge variant="secondary" className="flex items-center gap-1">
                <Globe size={14} />
                Global
            </Badge>
        );
    }

    return (
        <Badge variant={isAllowed ? "outline" : "destructive"} className="flex items-center gap-1">
            <MapPin size={14} />
            {isAllowed ? `Available in ${userRegion}` : 'Not Available in your region'}
        </Badge>
    );
};

export default RegionBadge;
