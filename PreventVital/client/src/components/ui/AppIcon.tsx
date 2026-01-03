
import { icons } from 'lucide-react';
import { LucideProps } from 'lucide-react';
import React from 'react';

// Map HeroIcon names (used in snippet) to Lucide names
const ICON_MAPPING: Record<string, string> = {
    'Bars3Icon': 'Menu',
    'XMarkIcon': 'X',
    'ChevronDownIcon': 'ChevronDown',
    // Common mappings just in case
    'CheckCircleIcon': 'CheckCircle2',
    'PlayIcon': 'Play',
    'UserIcon': 'User',
};

interface IconProps extends Omit<LucideProps, 'ref'> {
    name: string;
    variant?: 'outline' | 'solid'; // Kept for compatibility but Lucide doesn't really have variants in the same way
}

const AppIcon = ({ name, size = 24, className, ...props }: IconProps) => {
    // 1. Check explicit mapping
    let iconName = ICON_MAPPING[name] || name;

    // 2. Try stripping 'Icon' suffix if it exists and exact match not found
    // e.g. "HomeIcon" -> "Home"
    if (!icons[iconName as keyof typeof icons] && iconName.endsWith('Icon')) {
        iconName = iconName.replace(/Icon$/, '');
    }

    const IconComponent = icons[iconName as keyof typeof icons];

    if (!IconComponent) {
        console.warn(`Icon "${name}" (mapped to "${iconName}") not found in lucide-react`);
        const Fallback = icons.CircleHelp;
        return <Fallback size={size} className={`text-muted-foreground ${className}`} {...props} />;
    }

    return <IconComponent size={size} className={className} {...props} />;
};

export default AppIcon;
