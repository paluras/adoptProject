import { useImageLoader } from "../hooks/useImageLoader";
import { ImageLoadingScreen } from "./ImageLoadingScreen";

interface WithImageLoadingProps {
    children: React.ReactNode;
    minLoadingTime?: number;
}

export const WithImageLoading: React.FC<WithImageLoadingProps> = ({
    children,
    minLoadingTime
}) => {
    const { imagesLoaded, loadingProgress } = useImageLoader({ minLoadingTime });

    if (!imagesLoaded) {
        return <ImageLoadingScreen progress={loadingProgress} />;
    }

    return <>{children}</>;
};