import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const LandingParallax: React.FC = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event: React.MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        setMousePosition({
            x: (event.clientX - innerWidth / 2) / 50,
            y: (event.clientY - innerHeight / 2) / 50,
        });
    };

    const createParallaxSpring = (xOffset: number, yOffset: number) => {
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

    const images = [
        { imgSrc: '/cloud.svg', class: 'absolute z-10 left-1 sm:top-[20%] lg:left-[10%]  overflow-hidden opacity-50 w-[20vw] max-w-[150px]', alt: 'cloud', style: cloudStyle },
        { imgSrc: '/cloud2.svg', class: 'absolute z-10 right-10 top-[10%] overflow-hidden opacity-50 w-[30vw] max-w-[300px]', alt: 'cloud2', style: cloud2Style },
        { imgSrc: '/cat1.svg', class: 'absolute z-10 hidden sm:bottom-[25%]  md:block lg:left-[1%] md:left-[5%] overflow-hidden w-[25vw] max-w-[300px]', alt: 'cat1', style: cat1Style },
        { imgSrc: '/cat2.svg', class: 'absolute z-10 right-[3%]  lg:right-[5%] md:right-[5%] md:block top-1/4 overflow-hidden w-[30vw] max-w-[250px]', alt: 'cat2', style: cat2Style },
        { imgSrc: '/dog1.svg', class: 'absolute z-10 overflow-hidden bottom-[20%] sm:block  right-[10%] w-[30vw] max-w-[300px]', alt: 'dog1', style: dog1Style },
        { imgSrc: '/clubmenu2.png', class: 'absolute z-10 bottom-3/4 right-3/2 overflow-hidden w-[50vw] max-w-[400px]', alt: 'clubmenu', style: clubMenuStyle },
        { imgSrc: '/100Asset-18.png', class: 'absolute z-10 bottom-1 lg:bottom-[10%] left-1 sm:left-[24%] overflow-hidden w-[25vw] max-w-[170px]', alt: 'asset', style: ballStyle },
        { imgSrc: '/ball.png', class: 'absolute z-10 bottom-[10%] left-[45%] overflow-hidden w-[8vw] max-w-[80px]', alt: 'ball', style: ballStyle },
        { imgSrc: '/100Asset-11.png', class: 'absolute z-0 bottom-20 -left-20 overflow-hidden w-[60vw] max-w-[800px]', alt: 'asset11', style: grassStyle },
        { imgSrc: '/noise.png', class: 'absolute z-0 bottom-0 left-0 overflow-hidden opacity-25 w-full h-full', alt: 'noise' },
        { imgSrc: '/grass.svg', class: 'absolute z-0 bottom-10 left-10 overflow-hidden opacity-50 w-[15vw] max-w-[150px]', alt: 'grass', style: grassStyle },
        { imgSrc: '/grass.svg', class: 'absolute z-0 top-[20%] left-[20%] overflow-hidden opacity-50 w-[15vw] max-w-[150px]', alt: 'grass', style: grassStyle },
    ];

    return (
        <section
            className="flex gap-4 flex-col w-full h-screen items-center justify-center relative overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            <h1 className="custom-font z-20 text-5xl sm:text-7xl md:text-9xl main text-wrap text-center px-4">
                adopt a friend
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl z-20 w-11/12 sm:w-9/12 md:w-7/12 lg:w-5/12 text-center px-4">
                if you're considering getting a pet, remember to choose adoption and save a life!
            </p>
            {images.map((image, index) => (
                <animated.img
                    key={index}
                    className={image.class}
                    loading="lazy"
                    src={image.imgSrc}
                    alt={image.alt}
                    style={image.style}
                />
            ))}
        </section>
    );
};

export default LandingParallax;