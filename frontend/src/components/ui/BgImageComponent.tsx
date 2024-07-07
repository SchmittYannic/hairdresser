import { useRef, useEffect, PropsWithChildren, AnchorHTMLAttributes, useState } from "react";
import "src/components/ui/ImageComponent.scss"

type BgImageComponentPropsType = PropsWithChildren<{
    imageUrl: string;
    className?: string;
    backgroundRepeat?: string;
    backgroundSize?: string;
    backgroundPosition?: string;
}> & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className">

const BgImageComponent = ({
    imageUrl,
    children,
    className,
    backgroundRepeat = "no-repeat",
    backgroundSize = "cover",
    backgroundPosition = "50% 50%",
    ...props
}: BgImageComponentPropsType) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const options = {
            root: null, // viewport
            rootMargin: "0px",
            threshold: 0.1 // 10% of the image should be visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (imageRef.current) {
                        const img = new Image();
                        img.src = imageUrl;
                        img.onload = () => {
                            imageRef.current!.style.backgroundImage = `url(${imageUrl})`;
                            setImageLoaded(true);
                            observer.unobserve(entry.target);
                        };
                        img.onerror = () => {
                            // Handle error if image fails to load
                            console.error(`Failed to load image: ${imageUrl}`);
                            observer.unobserve(entry.target);
                        };
                    }
                }
            });
        }, options);

        if (imageRef.current) {
            observer.observe(imageRef.current);
        }

        return () => {
            if (imageRef.current) {
                observer.unobserve(imageRef.current);
            }
        };
    }, [imageUrl]);

    return (
        <a
            className={`lazy-load-background ${className}`}
            role="img"
            {...props}
        >
            <div
                ref={imageRef}
                className={`lazy-load-background-image ${imageLoaded ? "loaded" : ""}`}
                style={{
                    backgroundRepeat,
                    backgroundSize,
                    backgroundPosition,
                }}
            >
                {children}
            </div>
            {!imageLoaded && <div className="skeleton-img" />}
        </a>
    );
};

export default BgImageComponent;