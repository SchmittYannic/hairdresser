import { useState, useEffect, CSSProperties, ImgHTMLAttributes } from "react";
import "src/components/ui/ImageComponent.scss"

type ImageComponentPropsType = {
    src: string;
    width?: number | string;
    height?: number | string;
    className?: string;
    id?: string;
    style?: CSSProperties;
    loading?: "lazy" | "eager";
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "id" | "className" | "style" | "loading" | "onLoad" | "width" | "height">

const ImageComponent = ({
    src,
    width,
    height,
    className,
    id,
    style,
    loading = "lazy",
    ...props
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
                width={width}
                height={height}
                style={{
                    display: "block"
                    //display: loaded ? "block" : "none",
                }}
                loading={loading}
                onLoad={() => setLoaded(true)}
                {...props}
            />
            {!loaded && <div className="skeleton-img" />}
        </div>
    );
};

export default ImageComponent;