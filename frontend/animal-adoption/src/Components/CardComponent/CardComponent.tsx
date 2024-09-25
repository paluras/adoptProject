import React from 'react';

interface CardProps {
    id: number,
    title: string;
    description: string;
    imageUrl: string[];
    buttonText?: string;
    onButtonClick?: () => void;
}

const Card: React.FC<CardProps> = ({ id, title, imageUrl, onButtonClick }) => {
    return (
        <div key={id} onClick={onButtonClick}
            className="cursor-pointer
           w-[calc(90%_-_1rem)]
           sm:w-[calc(50%_-_1rem)]
           md:w-[calc(33.333%_-_1rem)]
           lg:w-[calc(25%_-_1rem)]
           xl:w-[calc(20%_-_1rem)]
           relative rounded overflow-hidden shadow-lg
            bg-white hover:scale-105
            transition-all">
            <img width={300}
                height={300}
                className="w-full h-80 object-cover"
                src={imageUrl[0]}
                alt={title} />
            <div className='flex z-0 left-1/2 top-72 transform -translate-x-1/2 absolute w-72 h-72 rounded-full bg-white border-rose-500 border-2'></div>
            <div className="flex z-10  justify-center px-6 py-4  bg-rose-400 ">
                <div className="font-bold z-10 text-xl mb-2">{title}</div>
            </div>
        </div>
    );
};

export default Card;
