import { useState, useEffect, CSSProperties } from "react";

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
            {!loaded && (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        backgroundColor: "#e0e0e0",
                        background: "linear-gradient(100deg,rgba(232,232,232,1) 20%,rgba(250,250,250,1) 50%,rgba(232,232,232,1) 60%)",
                        backgroundSize: "1000px 1000px",
                        animation: "placeholderShimmer 1.5s linear infinite forwards",
                    }}
                />
            )}
        </div>
    );
};

export default ImageComponent;