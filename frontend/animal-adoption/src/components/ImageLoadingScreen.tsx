import React from 'react';

interface ImageLoadingScreenProps {
    progress: number;
}

export const ImageLoadingScreen: React.FC<ImageLoadingScreenProps> = ({ progress }) => {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="text-center">
                <div className="text-2xl mb-4">Loading...</div>
                <div className="w-64 h-2 bg-gray-200 rounded-full">
                    <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                <div className="mt-2">{Math.round(progress)}%</div>
            </div>
        </div>
    );
};