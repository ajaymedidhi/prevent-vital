
import React, { useState } from 'react';

interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    priority?: boolean;
    fill?: boolean;
    sizes?: string;
    fallbackSrc?: string;
}

function AppImage({
    src,
    alt,
    width,
    height,
    className = '',
    priority = false, // Not used in standard img but kept for API compatibility
    fill = false,
    sizes,
    fallbackSrc = '/assets/images/placeholder.png', // Default placeholder
    style,
    ...props
}: AppImageProps) {
    const [imageSrc, setImageSrc] = useState(src);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError && imageSrc !== fallbackSrc) {
            setImageSrc(fallbackSrc);
            setHasError(true);
        }
        setIsLoading(false);
    };

    const handleLoad = () => {
        setIsLoading(false);
        setHasError(false);
    };

    const commonClassName = `${className} ${isLoading ? 'animate-pulse bg-muted' : ''} transition-opacity duration-300`;

    // Handle "fill" prop behavior using standard CSS
    const combinedStyle: React.CSSProperties = {
        ...style,
    };

    if (fill) {
        return (
            <div className={`relative ${className}`} style={{ width: width || '100%', height: height || '100%', ...style }}>
                <img
                    src={imageSrc}
                    alt={alt}
                    className={`absolute inset-0 w-full h-full object-cover ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                    onError={handleError}
                    onLoad={handleLoad}
                    {...props}
                />
                {isLoading && (
                    <div className="absolute inset-0 bg-muted animate-pulse" />
                )}
            </div>
        );
    }

    return (
        <img
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            className={commonClassName}
            onError={handleError}
            onLoad={handleLoad}
            style={combinedStyle}
            {...props}
        />
    );
}

export default AppImage;
