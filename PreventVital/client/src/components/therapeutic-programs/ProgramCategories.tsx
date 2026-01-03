
import { Grid, User, Sparkles, Heart, Zap } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    icon: string;
    description: string;
    sessionCount: number;
    color: string;
}

interface ProgramCategoriesProps {
    categories: Category[];
    selectedCategory: string;
    onCategorySelect: (categoryId: string) => void;
}

const getIcon = (iconName: string) => {
    switch (iconName) {
        case 'Squares2X2Icon': return Grid;
        case 'UserIcon': return User;
        case 'SparklesIcon': return Sparkles;
        case 'HeartIcon': return Heart;
        case 'BoltIcon': return Zap;
        default: return Grid;
    }
};

const getColorClasses = (color: string, isSelected: boolean) => {
    // Map abstract color names to Tailwind colors
    const colorMap: Record<string, string> = {
        primary: 'blue',
        secondary: 'purple',
        trust: 'cyan',
        accent: 'amber',
        warning: 'orange',
        success: 'green'
    };

    const twColor = colorMap[color] || 'blue';

    if (isSelected) {
        return `border-${twColor}-500 bg-${twColor}-50 dark:bg-${twColor}-900/20`;
    }
    return 'border-border bg-card hover:border-muted';
};

const getIconColorClasses = (color: string, isSelected: boolean) => {
    const colorMap: Record<string, string> = {
        primary: 'blue',
        secondary: 'purple',
        trust: 'cyan',
        accent: 'amber',
        warning: 'orange',
        success: 'green'
    };

    const twColor = colorMap[color] || 'blue';

    if (isSelected) {
        return `bg-${twColor}-500 text-white`;
    }
    return `bg-${twColor}-100 text-${twColor}-600 dark:bg-${twColor}-900/30 dark:text-${twColor}-400 group-hover:bg-${twColor}-200 dark:group-hover:bg-${twColor}-900/50`;
};


export default function ProgramCategories({
    categories,
    selectedCategory,
    onCategorySelect,
}: ProgramCategoriesProps) {
    return (
        <section className="bg-muted/30 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                        Explore Therapeutic Programs
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Choose from our comprehensive collection of wellness programs designed for every health goal
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {categories.map((category) => {
                        const IconComponent = getIcon(category.icon);
                        const isSelected = selectedCategory === category.id;

                        return (
                            <button
                                key={category.id}
                                onClick={() => onCategorySelect(category.id)}
                                className={`group relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${getColorClasses(category.color, isSelected)}`}
                            >
                                <div className="flex flex-col items-center space-y-3">
                                    <div
                                        className={`flex items-center justify-center w-14 h-14 rounded-xl transition-all ${getIconColorClasses(category.color, isSelected)}`}
                                    >
                                        <IconComponent size={28} />
                                    </div>

                                    <div className="text-center">
                                        <h3 className="text-sm font-semibold text-foreground mb-1">
                                            {category.name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground mb-2">
                                            {category.description}
                                        </p>
                                        <span className="inline-flex items-center px-2 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">
                                            {category.sessionCount} sessions
                                        </span>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
