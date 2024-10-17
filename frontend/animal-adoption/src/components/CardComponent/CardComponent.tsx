import React from 'react';

interface CardProps {
    id: number,
    title: string;
    description: string;
    imageUrl?: string;
    onButtonClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, imageUrl, onButtonClick }) => {
    return (
        <div onClick={onButtonClick}

            className="
            border-forth
            border-x-2
             border-t-2
            cursor-pointer
           w-[calc(90%_-_1rem)]
           sm:w-[calc(50%_-_1rem)]
           md:w-[calc(33.333%_-_1rem)]
           lg:w-[calc(25%_-_1rem)]
           xl:w-[calc(20%_-_1rem)]
           relative rounded overflow-hidden shadow-lg
            bg-primary hover:scale-105
            transition-all">
            <img width={300}
                height={300}
                className="w-full h-80 object-cover"
                src={imageUrl}
                alt={title} />
            <div className='flex z-0 left-1/2 top-72 transform -translate-x-1/2 absolute w-72 h-72 rounded-full bg-primary border-third border-2'></div>
            <div className="flex z-10  justify-center px-6 py-4  bg-forth ">
                <div className="font-bold z-10 text-2xl mb-2">{title}</div>
            </div>
        </div>
    );
};

export default Card;
