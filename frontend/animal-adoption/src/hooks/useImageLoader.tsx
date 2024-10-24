import { useState, useEffect } from 'react';

interface UseImageLoaderOptions {
    minLoadingTime?: number;
}

export const useImageLoader = (options: UseImageLoaderOptions = {}): { imagesLoaded: boolean; loadingProgress: number } => {
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const minLoadingTime = options.minLoadingTime || 500;

    useEffect(() => {
        const startTime = Date.now();
        let imageElements: HTMLImageElement[] = [];

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    const images = document.getElementsByTagName('img');
                    imageElements = Array.from(images);
                    checkImagesLoaded();
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        function checkImagesLoaded(): void {
            const totalImages = imageElements.length;
            if (totalImages === 0) return;

            let loadedImages = 0;
            imageElements.forEach(img => {
                if (img.complete) loadedImages++;
            });

            setLoadingProgress((loadedImages / totalImages) * 100);

            if (loadedImages === totalImages) {
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

                setTimeout(() => {
                    setImagesLoaded(true);
                    observer.disconnect();
                }, remainingTime);
            }
        }

        const existingImages = document.getElementsByTagName('img');
        imageElements = Array.from(existingImages);
        checkImagesLoaded();

        return (): void => observer.disconnect();
    }, [minLoadingTime]);

    return { imagesLoaded, loadingProgress };
};