
import { useEffect, useState } from "react";

const useWindowSize = (): {
    width: number;
    height: number;
} => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = (): void => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);
        return (): void => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowSize;
};

export default useWindowSize;
