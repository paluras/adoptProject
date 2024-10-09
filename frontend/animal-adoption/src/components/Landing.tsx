import React, { useState, } from 'react';
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

    const images = [
        { imgSrc: '/cloud.svg', class: 'absolute z-10 left-[10%] top-[20%] overflow-hidden opacity-50', width: 100, alt: 'cloud', style: cloudStyle },
        { imgSrc: '/cloud2.svg', class: 'absolute z-10 right-10 top-[10%] overflow-hidden opacity-50', width: 200, alt: 'cloud2', style: cloud2Style },
        { imgSrc: '/cat1.svg', class: 'absolute z-10 right-3/4 overflow-hidden', width: 200, alt: 'cat1', style: cat1Style },
        { imgSrc: '/cat2.svg', class: 'absolute z-10 top-1/4 right-[20%] overflow-hidden', width: 200, alt: 'cat2', style: cat2Style },
        { imgSrc: '/dog1.svg', class: 'absolute z-10 bottom-1/4 right-[15%] overflow-hidden', width: 200, alt: 'dog1', style: dog1Style },
        { imgSrc: '/clubmenu2.png', class: 'absolute z-10 bottom-3/4 right-3/2 overflow-hidden', width: 250, alt: 'clubmenu', style: clubMenuStyle },
        { imgSrc: '/100Asset-18.png', class: 'absolute z-10 bottom-[10%] left-[24%] overflow-hidden', width: 150, alt: 'asset', style: ballStyle },
        { imgSrc: '/ball.png', class: 'absolute z-10 bottom-[10%] left-[45%] overflow-hidden', width: 50, alt: 'ball', style: ballStyle },
        { imgSrc: '/100Asset-11.png', class: 'absolute z-0 bottom-20 -left-20 overflow-hidden', alt: 'asset11', style: grassStyle },
        { imgSrc: '/noise.png', class: 'absolute z-0 bottom-0 left-0 overflow-hidden opacity-25', alt: 'noise' },
        { imgSrc: '/grass.svg', class: 'absolute z-0 bottom-10 left-10 overflow-hidden opacity-50', width: 75, alt: 'grass', style: grassStyle },
        { imgSrc: '/grass.svg', class: 'absolute z-0 top-[20%] left-[20%] overflow-hidden opacity-50', width: 75, alt: 'grass', style: grassStyle },
    ];
    return (
        <section
            className="flex gap-4 flex-col w-full h-[85dvh] items-center justify-center relative"
            onMouseMove={handleMouseMove}
        >
            <div className="custom-font z-20 text-8xl main text-wrap text-center">adopt a friend</div>
            <p className="text-2xl z-20 w-4/12 text-center">
                if you’re considering getting a pet, remember to choose adoption and save a life!
            </p>
            {images.map((image, index) => (
                <animated.img
                    key={index}
                    className={image.class}
                    loading="lazy"
                    src={image.imgSrc}
                    width={image.width}
                    alt={image.alt}
                    style={image.style}
                />
            ))}

        </section>
    );
};

export default LandingParallax;
