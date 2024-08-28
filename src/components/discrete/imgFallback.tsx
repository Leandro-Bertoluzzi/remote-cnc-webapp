import { ReactEventHandler } from "react";

export interface ImgFallbackProps {
    imgSrc: string;
}

export default function ImgFallback(props: ImgFallbackProps) {
    const { imgSrc } = props;

    // Event handlers
    const errorHandler: ReactEventHandler<HTMLImageElement> = (event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src =
            "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg";
    };

    return (
        <picture>
            <img width="100px" src={imgSrc} alt="" onError={errorHandler} />
        </picture>
    );
}
