import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

interface SwipperProps {
    img: string[]
}
const SwiperComponent: React.FC<SwipperProps> = ({ img }) => {

    if (!img) return (<div>.....</div>)
    return (
        <>
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={4}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    img.map((item: string | undefined, index) => (
                        <SwiperSlide key={index}> <img width={300}
                            height={300}
                            className='object-cover aspect-[3/2] '
                            src={`https://adoptproject.onrender.com/uploads/${item}`}
                            alt={item} /></SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    );
}

export default SwiperComponent