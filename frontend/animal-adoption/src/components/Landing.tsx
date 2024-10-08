import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

const LandingParallax: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    const MINIMUM_LOADING_TIME: number = 500;

    const imageUrls = [
        '/cloud.svg',
        '/cloud2.svg',
        '/cat1.svg',
        '/cat2.svg',
        '/dog1.svg',
        '/clubmenu2.png',
        '/100Asset-18.png',
        '/ball.png',
        '/100Asset-11.png',
        '/noise.png',
        '/grass.svg'
    ];

    useEffect(() => {
        let loadedImages = 0;
        const totalImages = imageUrls.length;
        const startTime = Date.now();

        const loadImage = (url: string) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    loadedImages++;
                    setLoadingProgress((loadedImages / totalImages) * 100);
                    resolve(url);
                };
                img.onerror = reject;
                img.src = url;
            });
        };

        Promise.all(imageUrls.map(loadImage))
            .then(() => {
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - elapsedTime);

                setTimeout(() => {
                    setImagesLoaded(true);
                }, remainingTime);
            })
            .catch(err => {
                console.error('Failed to load some images:', err);
                setTimeout(() => {
                    setImagesLoaded(true);
                }, MINIMUM_LOADING_TIME);
            });
    }, []);


    const handleMouseMove = (event: React.MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        setMousePosition({
            x: (event.clientX - innerWidth / 2) / 50,
            y: (event.clientY - innerHeight / 2) / 50,
        });
    };

    const createParallaxSpring = (xOffset: number, yOffset: number) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useSpring({
            to: {
                transform: `translate3d(${mousePosition.x * xOffset}px, ${mousePosition.y * yOffset}px, 0)`,
            },
            config: { mass: 1, tension: 120, friction: 14 },
        });
    };


    const cloudStyle = createParallaxSpring(0.8, 0.8);
    const cloud2Style = createParallaxSpring(1, 1);
    const cat1Style = createParallaxSpring(0.6, 0.6);
    const cat2Style = createParallaxSpring(1.2, 1.2);
    const dog1Style = createParallaxSpring(1.4, 1.4);
    const clubMenuStyle = createParallaxSpring(1.6, 1.6);
    const ballStyle = createParallaxSpring(1.5, 1.5);
    const grassStyle = createParallaxSpring(0.4, 0.4);

    if (!imagesLoaded) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <div className="text-center">
                    <div className="text-2xl mb-4">Loading...</div>
                    <div className="w-64 h-2 bg-gray-200 rounded-full">
                        <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-300"
                            style={{ width: `${loadingProgress}%` }}
                        ></div>
                    </div>
                    <div className="mt-2">{Math.round(loadingProgress)}%</div>
                </div>
            </div>
        );
    }

    return (
        <section
            className="flex gap-4 flex-col w-full h-[85dvh] items-center justify-center relative"
            onMouseMove={handleMouseMove}
        >
            <div className="custom-font z-20 text-8xl main text-wrap text-center">adopt a friend</div>
            <p className="text-2xl z-20 w-4/12 text-center">
                if you’re considering getting a pet, remember to choose adoption and save a life!
            </p>


            <animated.img
                className="absolute z-10 left-[10%] top-[20%] overflow-hidden opacity-50"
                src={imageUrls[0]}
                width={100}
                height={100}
                alt="cloud"
                style={cloudStyle}

            />
            <animated.img
                className="absolute z-10 right-10 top-[10%] overflow-hidden opacity-50"
                src="/cloud2.svg"
                width={200}
                height={300}
                alt="cloud2"
                style={cloud2Style}
            />
            <animated.img
                className="absolute z-10 right-3/4 overflow-hidden"
                src="/cat1.svg"
                width={200}
                height={200}
                alt="cat1"
                style={cat1Style}
            />
            <animated.img
                className="absolute z-10 top-1/4 right-[20%] overflow-hidden"
                src="/cat2.svg"
                width={200}
                height={200}
                alt="cat2"
                style={cat2Style}
            />
            <animated.img
                className="absolute z-10 bottom-1/4 right-[15%] overflow-hidden"
                src="/dog1.svg"
                width={200}
                height={200}
                alt="dog1"
                style={dog1Style}
            />
            <animated.img
                className="absolute z-10 bottom-3/4 right-3/2 overflow-hidden"
                src="/clubmenu2.png"
                width={250}
                height={250}
                alt="clubmenu"
                style={clubMenuStyle}
            />
            <animated.img
                className="absolute z-10 bottom-[10%] left-[24%] overflow-hidden"
                src="/100Asset-18.png"
                width={150}
                height={200}
                alt="asset"
                style={ballStyle}
            />
            <animated.img
                className="absolute z-10 bottom-[10%] left-[45%] overflow-hidden"
                src="/ball.png"
                width={50}
                height={200}
                alt="ball"
                style={ballStyle}
            />
            <animated.img
                className="absolute z-0 bottom-20 -left-20 overflow-hidden"
                src="/100Asset-11.png"
                alt="asset11"
                style={grassStyle}
            />
            <animated.img
                className="absolute z-0 bottom-0 left-0 overflow-hidden opacity-25"
                src="/noise.png"
                alt="noise"
            />
            <animated.img
                className="absolute z-0 bottom-10 left-10 overflow-hidden opacity-50"
                src="/grass.svg"
                width={75}
                height={200}
                alt="grass"
                style={grassStyle}
            />
            <animated.img
                className="absolute z-0 top-[20%] left-[20%] overflow-hidden opacity-50"
                src="/grass.svg"
                width={75}
                height={200}
                alt="grass"
                style={grassStyle}
            />
        </section>
    );
};

export default LandingParallax;
