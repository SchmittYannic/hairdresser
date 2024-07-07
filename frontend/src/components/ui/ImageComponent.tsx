import { useState, useEffect, CSSProperties } from "react";
import "src/components/ui/ImageComponent.scss"

type ImageComponentPropsType = {
    src: string;
    alt: string;
    width?: number | string;
    height?: number | string;
    className?: string;
    id?: string;
    style?: CSSProperties;
    loading?: "lazy" | "eager";
};

const ImageComponent = ({
    src,
    alt,
    width,
    height,
    className,
    id,
    style,
    loading = "lazy",
}: ImageComponentPropsType) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setLoaded(true);
    }, [src]);

    return (
        <div
            style={{
                width,
                height,
                ...style,
                position: "relative",
                //display: "inline-block",
                backgroundColor: loaded ? "transparent" : "#e0e0e0",
            }}
            id={id}
            className={className}
        >
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                style={{
                    display: "block"
                    //display: loaded ? "block" : "none",
                }}
                loading={loading}
                onLoad={() => setLoaded(true)}
            />
            {!loaded && <div className="skeleton-img" />}
        </div>
    );
};

export default ImageComponent;