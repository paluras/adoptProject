import React, { useState, } from 'react';
import { useSpring, animated } from '@react-spring/web';

const images = [
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
    '/grass.svg',
];

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

    return (
        <section
            className="flex gap-4 flex-col w-full h-[85dvh] items-center justify-center relative"
            onMouseMove={handleMouseMove}
        >


            <div className="custom-font z-20 text-8xl main text-wrap text-center">adopt a friend</div>
            <p className="text-2xl z-20 w-4/12 text-center">
                if you’re considering getting a pet, remember to choose adoption and save a life!
            </p>

            <animated.img className="absolute z-10 left-[10%] top-[20%] overflow-hidden opacity-50" loading="lazy" src={images[0]} width={100} alt="cloud" style={cloudStyle} />
            <animated.img className="absolute z-10 right-10 top-[10%] overflow-hidden opacity-50" loading="lazy" src={images[1]} width={200} alt="cloud2" style={cloud2Style} />
            <animated.img className="absolute z-10 right-3/4 overflow-hidden" src={images[2]} loading="lazy" width={200} alt="cat1" style={cat1Style} />
            <animated.img className="absolute z-10 top-1/4 right-[20%] overflow-hidden" loading="lazy" src={images[3]} width={200} alt="cat2" style={cat2Style} />
            <animated.img className="absolute z-10 bottom-1/4 right-[15%] overflow-hidden" loading="lazy" src={images[4]} width={200} alt="dog1" style={dog1Style} />
            <animated.img className="absolute z-10 bottom-3/4 right-3/2 overflow-hidden" loading="lazy" src={images[5]} width={250} alt="clubmenu" style={clubMenuStyle} />
            <animated.img className="absolute z-10 bottom-[10%] left-[24%] overflow-hidden" loading="lazy" src={images[6]} width={150} alt="asset" style={ballStyle} />
            <animated.img className="absolute z-10 bottom-[10%] left-[45%] overflow-hidden" loading="lazy" src={images[7]} width={50} alt="ball" style={ballStyle} />
            <animated.img className="absolute z-0 bottom-20 -left-20 overflow-hidden" loading="lazy" src={images[8]} alt="asset11" style={grassStyle} />
            <animated.img className="absolute z-0 bottom-0 left-0 overflow-hidden opacity-25" loading="lazy" src={images[9]} alt="noise" />
            <animated.img className="absolute z-0 bottom-10 left-10 overflow-hidden opacity-50" loading="lazy" src={images[10]} width={75} alt="grass" style={grassStyle} />
            <animated.img className="absolute z-0 top-[20%] left-[20%] overflow-hidden opacity-50" loading="lazy" src={images[10]} width={75} alt="grass" style={grassStyle} />


        </section>
    );
};

export default LandingParallax;
